import React, { useCallback, useMemo } from 'react';
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
  const initialSlateValue = useMemo(() => {
    if (!vitalsAndBodyComposition || Object.keys(vitalsAndBodyComposition).length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    const vitalPairs = Object.entries(vitalsAndBodyComposition)
      .filter(([key, value]) => value && value.toString().trim() !== '')
      .map(([key, value]) => {
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase())
          .replace(/\b(bp|rr|spo2|rbs)\b/gi, (match) => match.toUpperCase())
          .trim();
        
        return `${formattedKey}: ${value}`;
      });

    if (vitalPairs.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

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
        
        if (value) {
          vitalsObject[normalizedKey] = value;
        }
      }
    });

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

