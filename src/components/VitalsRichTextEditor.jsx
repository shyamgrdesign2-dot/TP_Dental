import React, { useCallback, useMemo, useRef } from 'react';
import RichTextEditor from './richTextEditor/RichTextEditor';
import { arrayToSlateBulletList, slateBulletListToArray } from '../utils/slateHelpers';
import styles from './ConsultationDrawer.module.css';
import vitalsIcon from '../assets/images/Vitals.svg';

const VitalsRichTextEditor = ({
  vitalsAndBodyComposition = {},
  onUpdate,
  isProcessing = false,
  className = '',
}) => {
  const previousVitalsRef = useRef(vitalsAndBodyComposition);
  const editorKeysRef = useRef(new Set());

  const initialSlateValue = useMemo(() => {
    const currentVitals = vitalsAndBodyComposition || {};
    
    if (Object.keys(currentVitals).length === 0 && editorKeysRef.current.size === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    const allKeys = new Set([...Object.keys(currentVitals), ...Array.from(editorKeysRef.current)]);
    const vitalPairs = Array.from(allKeys)
      .map((key) => {
        const value = currentVitals[key];
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase())
          .replace(/\b(bp|rr|spo2|rbs)\b/gi, (match) => match.toUpperCase())
          .trim();
        
        const valueStr = value ? value.toString() : '';
        return `${formattedKey}: ${valueStr}`;
      })
      .filter(pair => {
        const colonIndex = pair.indexOf(':');
        if (colonIndex === -1) return false;
        const keyPart = pair.substring(0, colonIndex).trim();
        return keyPart.length > 0;
      });

    if (vitalPairs.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    previousVitalsRef.current = currentVitals;
    return arrayToSlateBulletList(vitalPairs);
  }, [vitalsAndBodyComposition]);

  const vitalKeysSignature = useMemo(() => {
    if (!vitalsAndBodyComposition || typeof vitalsAndBodyComposition !== 'object') {
      return 'empty';
    }
    const keys = Object.entries(vitalsAndBodyComposition)
      .filter(([, value]) => value && value.toString().trim() !== '')
      .map(([key]) => key);
    return keys.length ? keys.sort().join('|') : 'empty';
  }, [vitalsAndBodyComposition]);

  const handleChange = useCallback((value) => {
    const items = slateBulletListToArray(value);
    
    const vitalsObject = {};
    const currentKeys = new Set();
    
    items.forEach(item => {
      const colonIndex = item.indexOf(':');
      if (colonIndex > -1) {
        const key = item.substring(0, colonIndex).trim();
        const value = item.substring(colonIndex + 1).trim();
        
        const normalizedKey = key
          .toLowerCase()
          .replace(/\s+/g, '')
          .replace(/^(pulse|bp|temperature|spo2|rr|weight|height|generalrbs)$/, (match) => {
            const keyMap = {
              'pulse': 'pulse',
              'bp': 'bp',
              'temperature': 'temperature',
              'spo2': 'spo2',
              'rr': 'rr',
              'weight': 'weight',
              'height': 'height',
              'generalrbs': 'generalRbs'
            };
            return keyMap[match] || match;
          });
        
        if (normalizedKey) {
          vitalsObject[normalizedKey] = value || '';
          currentKeys.add(normalizedKey);
        }
      }
    });

    editorKeysRef.current = currentKeys;
    previousVitalsRef.current = vitalsObject;
    
    if (onUpdate) {
      onUpdate(vitalsObject);
    }
  }, [onUpdate]);

  if (!isProcessing && (!vitalsAndBodyComposition || 
      !Object.values(vitalsAndBodyComposition).some(value => 
        value !== undefined && value !== null && value !== ''
      ))) {
    return null;
  }

  if (isProcessing) {
    return (
      <div className={`${styles['vitals-rich-text-editor']} ${className}`}>
        <div className={styles['vitals-content-box']}>
          <div className={styles['vitals-header']}>
            <div className={styles['vitals-icon']}>
              <img src={vitalsIcon} alt="Vitals" />
            </div>
            <span className={styles['vitals-title']}>Vitals</span>
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
    <div className={`${styles['vitals-rich-text-editor']} ${className}`}>
      <div className={styles['vitals-content-box']}>
        <div className={styles['vitals-header']}>
          <div className={styles['vitals-icon']}>
          <img src={vitalsIcon} alt="Vitals" />
          </div>
          <span className={styles['vitals-title']}>Vitals</span>
        </div>
        <div className={styles['vitals-editor-container']}>
        <RichTextEditor
          key={`vitals-${vitalKeysSignature}`}
          initialValue={initialSlateValue}
          onChange={handleChange}
          placeholder="Add vitals (e.g., Pulse: 78T | BP: 130/80 | Temperature: 98.6Frh)..."
          spellCheck={true}
          autoFocus={false}
          showToolbar={false}
        />
        </div>
      </div>
    </div>
  );
};

export default VitalsRichTextEditor;

