import React, { useCallback, useMemo, useState, useContext, useEffect, useRef } from 'react';
import { Drawer } from 'antd';
import RichTextEditor from './richTextEditor/RichTextEditor';
import { arrayToSlateBulletList } from '../utils/slateHelpers';
import './LabResultsRichTextEditor.scss';
import labResultsIcon from '../assets/images/Lab.svg';
import addEditIcon from '../assets/images/Icon.svg';
import LabParams from './LabParams';
import CashManagerContext from '../context/CashManagerContext';
import styles from './ConsultationDrawer.module.css';
import { getTodayLabResults, matchLabResultsWithApi } from '../utils/labResultsUtils';

const extractUnitsFromValue = (valueStr = '') => {
  if (!valueStr) return '';
  const str = String(valueStr).trim();
  const match = str.match(/^\d+(?:\.\d+)?\s+(.+)$/);
  if (match) return match[1].trim();
  const percentMatch = str.match(/^\d+(?:\.\d+)?(%|percent)$/i);
  if (percentMatch) return percentMatch[1];
  return '';
};

const extractNumericValue = (valueStr = '') => {
  if (!valueStr) return '';
  const str = String(valueStr).trim();
  const match = str.match(/^(\d+(?:\.\d+)?)/);
  return match ? match[1] : str;
};

/**
 * LabResultsRichTextEditor - Rich text editor for Lab Results section
 * - When snap/smart/voice/ambient returns: fetches today's lab results from backend;
 *   if API lab results empty → display only backend; if API has lab results → match with lab
 *   search API (testName + reportName), merge with today's backend (update value if exists else add), display merged.
 * - "Add/Edit Lab Results" opens the full Add Lab Results sidebar (LabParams).
 */
const LabResultsRichTextEditor = ({
  labResults = [],
  onUpdate,
  isProcessing = false,
  className = '',
  onLabResultsSaved,
}) => {
  const [labResultsDrawer, setLabResultsDrawer] = useState(false);
  const [drawerInstanceKey, setDrawerInstanceKey] = useState(0);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const { patient_data } = useContext(CashManagerContext);
  const lastProcessedResultsRef = useRef(null);
  const lastSentSignatureRef = useRef(null);
  const prevPatientIdRef = useRef(null);

  useEffect(() => {
    const mergeWithTodayResults = async () => {
      if (!patient_data?.patient_unique_id || !onUpdate) return;

      const incomingResults = Array.isArray(labResults) ? labResults : [];
      if (incomingResults.length === 0) {
        return;
      }

      // Reset refs when patient changes so we don't carry state from previous patient
      if (prevPatientIdRef.current !== patient_data?.patient_unique_id) {
        prevPatientIdRef.current = patient_data?.patient_unique_id;
        lastSentSignatureRef.current = null;
        lastProcessedResultsRef.current = null;
      }

      const incomingSignature = JSON.stringify(
        incomingResults.map((r) => ({
          testname: (r.testName || r.testname || r.name || '').trim(),
          value: (r.value || '').trim(),
        }))
      );
      if (lastSentSignatureRef.current !== null && incomingSignature === lastSentSignatureRef.current) {
        return;
      }

      // 2) Lab search API: get testName + reportName for incoming (voice/snap/smart/ambient) results
      let matchedIncoming = [];
      try {
        matchedIncoming = await matchLabResultsWithApi(incomingResults);
      } catch (error) {
        matchedIncoming = incomingResults;
      }

      // 3) Lab result API: fetch today's lab results only when we have incoming lab data
      let todayLabResults = [];
      try {
        const todayResults = await getTodayLabResults(patient_data);
        if (todayResults && Array.isArray(todayResults) && todayResults.length > 0) {
          try {
            todayLabResults = await matchLabResultsWithApi(todayResults);
          } catch (error) {
            todayLabResults = todayResults;
          }
        }
      } catch (error) {
        // If today fetch fails, still merge incoming only
      }

      // 4) Merge: today's as base; if testName+reportName from incoming exists in today's → update value; else add new
      const mergedMap = new Map();

      todayLabResults.forEach((result) => {
        const testName = (result.testName || result.testname || result.name || '').trim();
        const reportName = (result.reportName || '').trim();
        if (testName && reportName) {
          mergedMap.set(testName, { ...result, testName, testname: testName, name: testName });
        }
      });

      matchedIncoming.forEach((result) => {
        const testName = (result.testName || result.testname || result.name || '').trim();
        const reportName = (result.reportName || '').trim();
        if (!testName || !reportName) return;

        const existing = mergedMap.get(testName);
        if (existing) {
          const existingUnits = extractUnitsFromValue(existing.value || '');
          const incomingValue = (result.value || '').trim();
          const numericValue = extractNumericValue(incomingValue);
          const incomingUnits = extractUnitsFromValue(incomingValue);

          mergedMap.set(testName, {
            ...existing,
            testName,
            testname: testName,
            name: testName,
            reportName,
            units: result.units || existing.units || '',
            value: incomingUnits
              ? `${numericValue} ${incomingUnits}`
              : existingUnits
                ? `${numericValue} ${existingUnits}`
                : numericValue,
          });
        } else {
          mergedMap.set(testName, { ...result, testName, testname: testName, name: testName });
        }
      });

      const finalResults = Array.from(mergedMap.values());
      const signature = JSON.stringify(
        finalResults.map((r) => ({
          testname: (r.testName || r.testname || r.name || '').trim(),
          value: (r.value || '').trim(),
        }))
      );
      if (signature !== lastProcessedResultsRef.current) {
        lastProcessedResultsRef.current = signature;
        lastSentSignatureRef.current = signature;
        onUpdate(finalResults);
      }
    };

    mergeWithTodayResults();
  }, [labResults, patient_data?.patient_unique_id]); // eslint-disable-line react-hooks/exhaustive-deps -- omit onUpdate to prevent infinite loop (inline callback from parent)

  const editorSignature = useMemo(() => {
    if (!Array.isArray(labResults)) {
      return 'empty';
    }
    return JSON.stringify(
      labResults.map((result = {}) => ({
        testname: (result.testName || result.testname || result.name || '').trim(),
        value: (result.value || '').trim(),
      }))
    );
  }, [labResults]);

  const editorKey = useMemo(() => `labresults-${editorSignature}`, [editorSignature]);

  const initialSlateValue = useMemo(() => {
    if (!labResults || labResults.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }
    const formattedResults = labResults.map(result => {
      const testName = (result.testName || result.testname || result.name || '').trim();
      const value = result.value || '';
      if (testName && value) {
        return `${testName} (${value})`;
      } else if (value) {
        return value;
      } else if (testName) {
        return testName;
      }
      return '';
    }).filter(text => text.trim() !== '');
    
    if (formattedResults.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    return arrayToSlateBulletList(formattedResults);
  }, [labResults]);

  const handleLabParamsUpdate = useCallback(() => {
    setLabResultsDrawer(false);
    if (typeof onLabResultsSaved === 'function') {
      onLabResultsSaved();
    }
  }, [onLabResultsSaved]);

  const handleSidebarResultsSync = useCallback(
    async (syncedLabResults = []) => {
      if (!onUpdate || !patient_data?.patient_unique_id) return;

      const newResults = Array.isArray(syncedLabResults) ? syncedLabResults : [];

      let matchedNewResults = newResults;
      if (newResults.length > 0) {
        try {
          matchedNewResults = await matchLabResultsWithApi(newResults);
        } catch (error) {
          // use raw newResults on match failure
        }
      }

      let todayLabResults = [];
      try {
        const todayResults = await getTodayLabResults(patient_data);
        if (todayResults && Array.isArray(todayResults) && todayResults.length > 0) {
          try {
            todayLabResults = await matchLabResultsWithApi(todayResults);
          } catch (error) {
            todayLabResults = todayResults;
          }
        }
      } catch (error) {
        onUpdate(matchedNewResults);
        return;
      }

      const mergedMap = new Map();

      todayLabResults.forEach((result) => {
        const testName = (result.testName || result.testname || result.name || '').trim();
        const reportName = (result.reportName || '').trim();
        if (testName && reportName) {
          mergedMap.set(testName, { ...result, testName, testname: testName, name: testName });
        }
      });

      matchedNewResults.forEach((result) => {
        const testName = (result.testName || result.testname || result.name || '').trim();
        const reportName = (result.reportName || '').trim();
        if (!testName || !reportName) return;

        const existing = mergedMap.get(testName);
        if (existing) {
          const existingUnits = extractUnitsFromValue(existing.value || '');
          const newValue = (result.value || '').trim();
          const numericValue = extractNumericValue(newValue);
          const newUnits = extractUnitsFromValue(newValue);

          mergedMap.set(testName, {
            ...existing,
            testName,
            testname: testName,
            name: testName,
            reportName,
            units: result.units || existing.units || '',
            value: newUnits
              ? `${numericValue} ${newUnits}`
              : existingUnits
                ? `${numericValue} ${existingUnits}`
                : numericValue,
          });
        } else {
          mergedMap.set(testName, { ...result, testName, testname: testName, name: testName });
        }
      });

      const sidebarFinal = Array.from(mergedMap.values());
      onUpdate(sidebarFinal);
    },
    [onUpdate, patient_data]
  );

  const handleOpenLabResultsDrawer = useCallback(() => {
    setDrawerInstanceKey(prev => prev + 1);
    setLabResultsDrawer(true);
  }, []);

  const showHideBackModal = useCallback(() => {
    setIsBackModalOpen(prev => !prev);
  }, []);

  const drawerPrefillResults = useMemo(
    () => (Array.isArray(labResults) ? labResults : []),
    [labResults]
  );

  if (isProcessing) {
    return (
      <div className={`labresults-rich-text-editor ${className}`}>
        <div className={`${styles['lab-results-header']} ${styles['vitals-header']}`}>
          <div className={styles['medical-history-header-left']}>
            <div className={styles['lab-results-icon']}>
              <img src={labResultsIcon} alt="Lab Results" />
            </div>
            <span className={styles['lab-results-title']}>Lab Results</span>
          </div>
        </div>
        <div className="editor-container">
          <div className="shimmer-container">
            <div className="shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`labresults-rich-text-editor ${className}`}>
        <div className={`${styles['lab-results-header']} ${styles['vitals-header']}`}>
          <div className={styles['medical-history-header-left']}>
            <div className={styles['lab-results-icon']}>
              <img src={labResultsIcon} alt="Lab Results" />
            </div>
            <span className={styles['lab-results-title']}>Lab Results</span>
          </div>
          <button
            type="button"
            className={styles['medical-history-action-button']}
            onClick={handleOpenLabResultsDrawer}
          >
            <img
              src={addEditIcon}
              alt="Add/Edit"
              className={styles['medical-history-action-icon']}
            />
            <span>Add/Edit Lab Results</span>
          </button>
        </div>
        <div className="editor-container lab-results-readonly">
          <RichTextEditor
            key={editorKey}
            initialValue={initialSlateValue}
            placeholder="Add lab results (e.g., Hemoglobin: 13.5 g/dL)..."
            spellCheck={true}
            autoFocus={false}
            showToolbar={false}
            readOnly={true}
          />
        </div>
      </div>

      <Drawer
        className="scroll-y-hidden"
        closeIcon={false}
        placement="right"
        onClose={() => setLabResultsDrawer(false)}
        open={labResultsDrawer}
        width={880}
      >
        <LabParams
          key={drawerInstanceKey}
          handleAddLabParamsDrawer={() => setLabResultsDrawer(false)}
          patient_unique_id={patient_data?.patient_unique_id}
          onSave={handleLabParamsUpdate}
          isBackModalOpen={isBackModalOpen}
          showHideBackModal={showHideBackModal}
          patientGender={patient_data?.pm_gender}
          prefillLabResults={drawerPrefillResults}
          onResultsChange={handleSidebarResultsSync}
        />
      </Drawer>
    </>
  );
};

export default LabResultsRichTextEditor;
