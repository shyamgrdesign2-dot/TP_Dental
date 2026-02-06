import React, { useCallback, useMemo, useState, useContext, useEffect } from 'react';
import { Drawer } from 'antd';
import RichTextEditor from './richTextEditor/RichTextEditor';
import { arrayToSlateBulletList, slateBulletListToArray } from '../utils/slateHelpers';
import './LabResultsRichTextEditor.scss';
import labResultsIcon from '../assets/images/Lab.svg';
import addEditIcon from '../assets/images/Icon.svg';
import LabParams from './LabParams';
import CashManagerContext from '../context/CashManagerContext';
import styles from './ConsultationDrawer.module.css';
import moment from 'moment';
import { env } from '../EnvironmentConfig';
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from '../utils/constants';

/**
 * LabResultsRichTextEditor - Rich text editor specifically for Lab Results section
 * Converts between array format [{value: "result text", testname: "test"}] and Slate.js format
 */
const LabResultsRichTextEditor = ({
  labResults = [],
  onUpdate,
  isProcessing = false,
  className = '',
  onLabResultsSaved,
}) => {
  const [labResultsDrawer, setLabResultsDrawer] = useState(false);
  const [drawerPrefillResults, setDrawerPrefillResults] = useState([]);
  const [drawerInstanceKey, setDrawerInstanceKey] = useState(0);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const { patient_data } = useContext(CashManagerContext);

  // Auto-fetch and load today's lab results
  useEffect(() => {
    const fetchTodayLabResults = async () => {
      if (!patient_data?.patient_unique_id || !onUpdate || (labResults && labResults.length > 0)) return;
      
      const today = moment().format('YYYY-MM-DD');
      try {
        const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
        const cleanedToken = token ? token.replace(/['"]+/g, '') : '';
        const baseUrl = env.lab_params_api_url;
        
        if (cleanedToken && baseUrl) {
          const response = await fetch(
            `${baseUrl}/api/v1/lab-parameters/results/${patient_data.patient_unique_id}`,
            {
              headers: {
                'Authorization': `Bearer ${cleanedToken}`,
              },
            }
          );
          
          const labData = await response.json();
          const allResults = labData?.data?.results || [];
          
          if (allResults.length > 0) {
            const todayResults = allResults.filter(result => {
              const resultDate = result.createdAt || result.created_at || result.createdDate || result.date;
              if (!resultDate) return false;
              return moment(resultDate).format('YYYY-MM-DD') === today;
            });
            
            if (todayResults.length > 0) {
              const formattedResults = [];
              const seenTests = new Set();
              
              todayResults.forEach(result => {
                (result.inputs || []).forEach(input => {
                  if (!input?.testName || input.testName === "Remarks") return;
                  
                  const testKey = `${input.testName}`.toLowerCase().trim();
                  if (seenTests.has(testKey)) return;
                  
                  const value = input.value !== undefined ? String(input.value).trim() : "";
                  if (!value) return;
                  
                  const units = input.units?.trim();
                  const displayValue = units ? `${value} ${units}`.trim() : value;
                  formattedResults.push({
                    testname: input.testName,
                    value: displayValue,
                  });
                  seenTests.add(testKey);
                });
              });
              
              if (formattedResults.length > 0) {
                onUpdate(formattedResults);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching lab results:', error);
      }
    };
    
    fetchTodayLabResults();
  }, [patient_data?.patient_unique_id, onUpdate, labResults]);

  const editorSignature = useMemo(() => {
    if (!Array.isArray(labResults)) {
      return 'empty';
    }
    return JSON.stringify(
      labResults.map((result = {}) => ({
        testname: (result.testname || result.name || '').trim(),
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
      const testname = result.testname || result.name || '';
      const value = result.value || '';
      
      if (testname && value) {
        return `${testname} (${value})`;
      } else if (value) {
        return value;
      } else if (testname) {
        return testname;
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
    (syncedLabResults = []) => {
      if (onUpdate) {
        onUpdate(Array.isArray(syncedLabResults) ? syncedLabResults : []);
      }
    },
    [onUpdate]
  );

  const handleOpenLabResultsDrawer = useCallback(() => {
    setDrawerPrefillResults(Array.isArray(labResults) ? labResults : []);
    setDrawerInstanceKey((prev) => prev + 1);
    setLabResultsDrawer(true);
  }, [labResults]);

  const showHideBackModal = useCallback(() => {
    setIsBackModalOpen(!isBackModalOpen);
  }, [isBackModalOpen]);

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
            className={styles['medical-history-action-button']}
            onClick={handleOpenLabResultsDrawer}
          >
            <img
              src={addEditIcon}
              alt="Add/Edit"
              className={styles['medical-history-action-icon']}
            />
            <span>Add/Edit Results</span>
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

