import React, { useCallback, useMemo, useState, useEffect, useContext } from 'react';
import { Drawer } from 'antd';
import moment from 'moment';
import RichTextEditor from './richTextEditor/RichTextEditor';
import styles from './ConsultationDrawer.module.css';
import vitalsIcon from '../assets/images/Vitals.svg';
import addEditIcon from '../assets/images/Icon.svg';
import VitalsBox from './VitalsBox';
import ApiVitals from '../api/services/ApiVitals';
import CashManagerContext from '../context/CashManagerContext';

const formatApiVitals = (apiVitalsData) => {
  if (!apiVitalsData) return null;
  return {
    date: apiVitalsData.date || moment().format('YYYY-MM-DD'),
    temperature: apiVitalsData.temp || '',
    pulse: apiVitalsData.pres || '',
    respRate: apiVitalsData.resp_rate || '',
    Systolic: apiVitalsData.systolic || '',
    Diastolic: apiVitalsData.diastolic || '',
    spo2: apiVitalsData.spo2 || '',
    'General RBS': apiVitalsData.general_rbs || '',
    FIB4: apiVitalsData.fib4 || '',
    'Waist Circumference': apiVitalsData.waist_circumference || '',
    ofc: apiVitalsData.ofc || '',
    height: apiVitalsData.height || '',
    weight: apiVitalsData.weight || '',
    BMI: apiVitalsData.bmi || '',
    BMR: apiVitalsData.bmr || '',
    BSA: apiVitalsData.bsa || '',
    bloodPressure: apiVitalsData.blood_press || ''
  };
};

const VitalsRichTextEditor = ({
  vitalsAndBodyComposition = {},
  onUpdate,
  isProcessing = false,
  className = '',
}) => {
  const [vitalsDrawer, setVitalsDrawer] = useState(false);
  const [apiVitals, setApiVitals] = useState(null);
  const { patient_data } = useContext(CashManagerContext);

  useEffect(() => {
    const fetchApiVitals = async () => {
      if (patient_data?.patient_unique_id) {
        try {
          const sendData = {
            patient_unique_id: patient_data.patient_unique_id,
            pam_id: patient_data.pam_id || 0,
            mode: 'ADD',
            pm_pid: patient_data.pm_pid || '',
            pm_id: patient_data.pm_id || 0
          };
          const response = await ApiVitals.getVitals(sendData);
          if (response?.status && response?.data?.length > 0) {
            const latestVitals = response.data[0];
            setApiVitals(formatApiVitals(latestVitals));
          }
        } catch (error) {
          console.error('Error fetching vitals:', error);
        }
      }
    };
    fetchApiVitals();
  }, [patient_data?.patient_unique_id, patient_data?.pam_id, patient_data?.pm_pid, patient_data?.pm_id]);

  const mergedVitals = useMemo(() => {
    const rxPadVitals = vitalsAndBodyComposition || {};
    const apiVitalsData = apiVitals || {};
    
    const keyMapping = {
      'temp': 'temperature',
      'pres': 'pulse',
      'resp_rate': 'respRate',
      'respRate': 'respRate',
      'systolic': 'Systolic',
      'Systolic': 'Systolic',
      'diastolic': 'Diastolic',
      'Diastolic': 'Diastolic',
      'general_rbs': 'General RBS',
      'General RBS': 'General RBS',
      'fib4': 'FIB4',
      'FIB4': 'FIB4',
      'waist_circumference': 'Waist Circumference',
      'Waist Circumference': 'Waist Circumference',
      'bmi': 'BMI',
      'BMI': 'BMI',
      'bmr': 'BMR',
      'BMR': 'BMR',
      'bsa': 'BSA',
      'BSA': 'BSA'
    };
    
    const normalizeKey = (key) => {
      const lowerKey = key.toLowerCase();
      if (keyMapping[lowerKey]) return keyMapping[lowerKey];
      if (keyMapping[key]) return keyMapping[key];
      return key;
    };
    
    const merged = {};
    const processedFields = new Set();
    
    Object.entries(apiVitalsData).forEach(([key, value]) => {
      if (key === 'date') return;
      const normalizedKey = normalizeKey(key);
      if (!processedFields.has(normalizedKey) && value !== undefined && value !== null && String(value).trim() !== '') {
        merged[normalizedKey] = String(value).trim();
        processedFields.add(normalizedKey);
      }
    });
    
    Object.entries(rxPadVitals).forEach(([key, value]) => {
      if (key === 'date') return;
      const normalizedKey = normalizeKey(key);
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        merged[normalizedKey] = String(value).trim();
        processedFields.add(normalizedKey);
      }
    });
    
    merged.date = moment().format('YYYY-MM-DD');
    
    const sanitizeValue = (key, value) => {
      if (value === undefined || value === null) return '';
      const str = String(value).trim();
      if (key === 'bloodPressure') {
        const cleaned = str.replace(/[^0-9/.-]/g, '').replace(/\/+/g, '/');
        return cleaned;
      }
      // strip all non-numeric/non-dot characters to drop backend units; keep minus for temps
      const cleaned = str.replace(/[^0-9.\-]/g, '');
      return cleaned;
    };

    const cleanedVitals = {};
    Object.entries(merged).forEach(([k, v]) => {
      if (k === 'date') {
        cleanedVitals[k] = v;
      } else {
        cleanedVitals[k] = sanitizeValue(k, v);
      }
    });

    return cleanedVitals;
  }, [vitalsAndBodyComposition, apiVitals]);

  const extractNumericValue = (value, unit) => {
    if (!value) return value;
    const strValue = String(value).trim();
    if (!unit) return strValue;
    const unitLower = unit.toLowerCase().trim();
    const valueLower = strValue.toLowerCase();
    if (valueLower.includes(unitLower)) {
      const escapedUnit = unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return strValue.replace(new RegExp(`\\s*${escapedUnit}\\s*`, 'gi'), '').trim();
    }
    return strValue;
  };

  const shouldAddUnit = (value, unit) => {
    if (!unit || !value) return false;
    const strValue = String(value).trim().toLowerCase();
    const unitLower = unit.toLowerCase().trim();
    const unitVariants = [
      unitLower,
      unitLower.replace(/\s+/g, ''),
      unitLower.replace(/\//g, ''),
      unitLower.replace(/\//g, '/')
    ];
    return !unitVariants.some(variant => strValue.includes(variant));
  };

  const initialSlateValue = useMemo(() => {
    const currentVitals = mergedVitals;
    const date = currentVitals.date || moment().format('YYYY-MM-DD');
    const formattedDate = moment(date, ['YYYY-MM-DD', 'DD MMM YYYY', 'DD MMM, YY']).format('DD MMM YYYY');
    
    const vitalFieldMap = {
      'temp': { label: 'Temperature', unit: 'Frh' },
      'temperature': { label: 'Temperature', unit: 'Frh' },
      'pres': { label: 'Pulse', unit: '/min' },
      'pulse': { label: 'Pulse', unit: '/min' },
      'resp_rate': { label: 'RR', unit: '/min' },
      'respRate': { label: 'RR', unit: '/min' },
      'systolic': { label: 'Systolic', unit: 'mmHg' },
      'Systolic': { label: 'Systolic', unit: 'mmHg' },
      'diastolic': { label: 'Diastolic', unit: 'mmHg' },
      'Diastolic': { label: 'Diastolic', unit: 'mmHg' },
      'spo2': { label: 'SPO2', unit: '%' },
      'general_rbs': { label: 'General RBS', unit: 'mg/dl' },
      'General RBS': { label: 'General RBS', unit: 'mg/dl' },
      'fib4': { label: 'FIB4', unit: '' },
      'FIB4': { label: 'FIB4', unit: '' },
      'waist_circumference': { label: 'Waist Circumference', unit: 'cms' },
      'Waist Circumference': { label: 'Waist Circumference', unit: 'cms' },
      'ofc': { label: 'OFC', unit: 'cms' },
      'height': { label: 'Height', unit: 'cm' },
      'weight': { label: 'Weight', unit: 'kg' },
      'bmi': { label: 'BMI', unit: 'kg/m²' },
      'BMI': { label: 'BMI', unit: 'kg/m²' },
      'bmr': { label: 'BMR', unit: 'kcals' },
      'BMR': { label: 'BMR', unit: 'kcals' },
      'bsa': { label: 'BSA', unit: 'm²' },
      'BSA': { label: 'BSA', unit: 'm²' },
      'bloodPressure': { label: 'BP', unit: '' }
    };
    
    const fieldOrder = [
      'temperature', 'pulse', 'respRate', 'Systolic', 'Diastolic', 'spo2',
      'General RBS', 'FIB4', 'Waist Circumference', 'ofc',
      'height', 'weight', 'BMI', 'BMR', 'BSA'
    ];
    
    const vitalPairs = [];
    const processedKeys = new Set();
    
    fieldOrder.forEach(fieldKey => {
      const value = currentVitals[fieldKey];
      if (value !== undefined && value !== null) {
        const strValue = String(value).trim();
        if (strValue !== '' && strValue !== 'undefined' && strValue !== 'null' && !processedKeys.has(fieldKey)) {
          const fieldInfo = vitalFieldMap[fieldKey];
          if (fieldInfo) {
            const cleanValue = extractNumericValue(strValue, fieldInfo.unit);
            const displayValue = fieldInfo.unit && shouldAddUnit(cleanValue, fieldInfo.unit) 
              ? `${cleanValue} ${fieldInfo.unit}` 
              : cleanValue;
            vitalPairs.push(`${fieldInfo.label}: ${displayValue}`);
            processedKeys.add(fieldKey);
          }
        }
      }
    });
    
    if (currentVitals.bloodPressure && !processedKeys.has('Systolic') && !processedKeys.has('Diastolic')) {
      const bpValue = String(currentVitals.bloodPressure).trim();
      const bpParts = bpValue.split('/');
      if (bpValue && bpParts.length === 2 && bpParts[0].trim() && bpParts[1].trim()) {
        vitalPairs.push(`BP: ${bpValue}`);
        processedKeys.add('bloodPressure');
      }
    }
    
    Object.entries(currentVitals).forEach(([key, value]) => {
      if (key === 'date' || processedKeys.has(key)) return;
      const strValue = String(value || '').trim();
      if (strValue !== '' && strValue !== 'undefined' && strValue !== 'null') {
        const fieldInfo = vitalFieldMap[key];
        if (fieldInfo) {
          const cleanValue = extractNumericValue(strValue, fieldInfo.unit);
          const displayValue = fieldInfo.unit && shouldAddUnit(cleanValue, fieldInfo.unit) 
            ? `${cleanValue} ${fieldInfo.unit}` 
            : cleanValue;
          vitalPairs.push(`${fieldInfo.label}: ${displayValue}`);
        } else {
          const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace(/\b(bp|rr|spo2|rbs|ofc|fib4)\b/gi, match => match.toUpperCase()).replace(/\s+/g, ' ').trim();
          vitalPairs.push(`${formattedKey}: ${strValue}`);
        }
      }
      });

    if (vitalPairs.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    const inlineText = `${formattedDate} (${vitalPairs.join(' | ')})`;
    return [{ type: 'paragraph', children: [{ text: inlineText }] }];
  }, [mergedVitals]);

  const vitalKeysSignature = useMemo(() => {
    if (!mergedVitals || typeof mergedVitals !== 'object') {
      return 'empty';
    }
    const filtered = Object.entries(mergedVitals)
      .filter(([key, value]) => {
        if (key === 'date') return false;
        const strValue = String(value || '').trim();
        return strValue !== '' && strValue !== 'undefined' && strValue !== 'null';
      })
      .map(([key, value]) => `${key}:${String(value).trim()}`)
      .sort();
    return filtered.length ? JSON.stringify(filtered) : 'empty';
  }, [mergedVitals]);

  const handleVitalsUpdate = useCallback((vitalsObject) => {
    if (onUpdate) {
      onUpdate(vitalsObject);
    }
  }, [onUpdate]);

  const handleVitalsSave = useCallback((vitalsObject) => {
    if (onUpdate) {
      onUpdate(vitalsObject);
    }
  }, [onUpdate]);


  if (!isProcessing && (!mergedVitals || 
      !Object.values(mergedVitals).some(value => {
        const strValue = String(value || '').trim();
        return strValue !== '' && strValue !== 'undefined' && strValue !== 'null';
      }))) {
    return null;
  }

  if (isProcessing) {
    return (
      <div className={`${styles['vitals-rich-text-editor']} ${className}`}>
        <div className={styles['vitals-content-box']}>
          <div className={styles['vitals-header']}>
            <div className={styles['medical-history-header-left']}>
            <div className={styles['vitals-icon']}>
              <img src={vitalsIcon} alt="Vitals" />
            </div>
            <span className={styles['vitals-title']}>Vitals</span>
            </div>
          </div>
          <div className={styles['vitals-editor-container']}>
            <div className={styles['vitals-shimmer-container']}>
              <div className={styles['vitals-shimmer']}></div>
        </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className={`${styles['vitals-rich-text-editor']} ${className}`}>
      <div className={styles['vitals-content-box']}>
        <div className={styles['vitals-header']}>
            <div className={styles['medical-history-header-left']}>
          <div className={styles['vitals-icon']}>
          <img src={vitalsIcon} alt="Vitals" />
          </div>
          <span className={styles['vitals-title']}>Vitals</span>
        </div>
            <button
              className={styles['medical-history-action-button']}
              onClick={() => setVitalsDrawer(true)}
            >
              <img
                src={addEditIcon}
                alt="Add/Edit"
                className={styles['medical-history-action-icon']}
              />
              <span>Add/Edit Vitals</span>
            </button>
          </div>
          <div className={styles['vitals-editor-container']} style={{ pointerEvents: 'none', cursor: 'default' }}>
        <RichTextEditor
          key={`vitals-${vitalKeysSignature}`}
          initialValue={initialSlateValue}
              placeholder="Add vitals (e.g., 02 Jun 2024 (Pulse: 78T | BP: 130/80 | Temperature: 98.6Frh))..."
              spellCheck={false}
          autoFocus={false}
          showToolbar={false}
              readOnly={true}
        />
        </div>
      </div>
    </div>
      <Drawer
        className="scroll-y-hidden"
        closeIcon={false}
        placement="right"
        onClose={() => setVitalsDrawer(false)}
        open={vitalsDrawer}
        width={600}
      >
        <VitalsBox
          key={`vitals-drawer-${vitalsDrawer}`}
          handleDrawerVital={() => setVitalsDrawer(false)}
          handleCollapsed={() => {}}
          initialVitals={mergedVitals}
          onVitalsUpdate={handleVitalsUpdate}
          onVitalsSave={handleVitalsSave}
        />
      </Drawer>
    </>
  );
};

export default VitalsRichTextEditor;

