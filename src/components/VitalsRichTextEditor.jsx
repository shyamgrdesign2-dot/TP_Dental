import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Drawer, Button } from 'antd';
import RichTextEditor from './richTextEditor/RichTextEditor';
import { arrayToSlateBulletList, slateBulletListToArray } from '../utils/slateHelpers';
import styles from './ConsultationDrawer.module.css';
import vitalsIcon from '../assets/images/Vitals.svg';
import addEditIcon from '../assets/images/Icon.svg';
import VitalsBox from './VitalsBox';
import { isMobile, isTablet } from 'react-device-detect';
import { useSelector } from 'react-redux';
import './mobile/MobileVitalsEditSheet.scss';

const VitalsRichTextEditor = ({
  vitalsAndBodyComposition = {},
  onUpdate,
  isProcessing = false,
  className = '',
  mergedVitals: mergedVitalsProp,
  apiVitals,
}) => {
  const mergedVitals = mergedVitalsProp ?? vitalsAndBodyComposition;
  const [vitalsDrawer, setVitalsDrawer] = useState(false);
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

  const handleVitalsSave = useCallback((vitalsObject) => {
    if (onUpdate) {
      onUpdate(vitalsObject);
    }
  }, [onUpdate]);

  const isMobileDevice = isMobile && !isTablet;
  const vitalsLoading = useSelector((state) => state.vitals?.loading ?? false);
  const vitalsBoxRef = useRef(null);
  const [hasVitalsData, setHasVitalsData] = useState(false);

  const handleVitalsDataChange = useCallback((hasData) => {
    setHasVitalsData(hasData);
  }, []);

  const handleMobileDone = useCallback(() => {
    if (vitalsBoxRef.current?.onAddUpdateClicked) {
      vitalsBoxRef.current.onAddUpdateClicked();
    }
  }, []);

  const hasVitalsToDisplay = !isProcessing && mergedVitals && 
    Object.values(mergedVitals).some(value => {
      const strValue = String(value || '').trim();
      return strValue !== '' && strValue !== 'undefined' && strValue !== 'null';
    });
  const hasApiVitals = !isProcessing && apiVitals &&
    Object.values(apiVitals).some(value => {
      const strValue = String(value ?? '').trim();
      return strValue !== '' && strValue !== 'undefined' && strValue !== 'null';
    });
  const hasProductionVitals = !isProcessing && vitalsAndBodyComposition &&
    Object.values(vitalsAndBodyComposition).some(value =>
      value !== undefined && value !== null && value !== ''
    );

  if (!isProcessing && !hasVitalsToDisplay && !hasApiVitals && !hasProductionVitals) {
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
    <>
      <div className={`${styles['vitals-rich-text-editor']} ${className}`}>
        <div className={styles['vitals-content-box']}>
          <div className={styles['vitals-header']}>
            <div className={styles['vitals-icon']}>
              <img src={vitalsIcon} alt="Vitals" />
            </div>
            <span className={styles['vitals-title']}>Vitals</span>
            <button
              type="button"
              className={styles['add-medical-history-button']}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              onClick={() => setVitalsDrawer(true)}
              aria-label="Add / Edit Vitals"
            >
              <img src={addEditIcon} alt="Add/Edit" style={{ width: 20, height: 20 }} />
            </button>
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

      {isMobileDevice ? (
        <Drawer
          placement="bottom"
          onClose={() => setVitalsDrawer(false)}
          open={vitalsDrawer}
          height="90vh"
          className="mobile-vitals-bottom-sheet"
          closable={false}
          maskClosable
        >
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <VitalsBox
                ref={vitalsBoxRef}
                key={`vitals-mobile-${vitalsDrawer}`}
                handleDrawerVital={() => setVitalsDrawer(false)}
                handleCollapsed={(flag) => {
                  if (flag === 1) {
                    setVitalsDrawer(false);
                  }
                }}
                initialVitals={mergedVitals}
                onVitalsUpdate={onUpdate}
                onVitalsSave={handleVitalsSave}
                hideHeaderButton={false}
                hideHeaderElements={false}
                onVitalsDataChange={handleVitalsDataChange}
              />
            </div>
            {/* Mobile bottom footer Done commented out; header Done in VitalsBox is used for save/close.
                Structure and props kept so footer can be re-enabled later without breaking callers. */}
            {/* <div style={{
              padding: '16px',
              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              background: '#fff',
              position: 'sticky',
              bottom: 0,
              zIndex: 10
            }}>
              <Button
                type="primary"
                onClick={handleMobileDone}
                loading={vitalsLoading}
                disabled={!hasVitalsData}
                style={{
                  width: '100%',
                  height: '44px',
                  fontWeight: 600,
                  borderRadius: '8px'
                }}
              >
                Done
              </Button>
            </div> */}
          </div>
        </Drawer>
      ) : (
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
            handleCollapsed={(flag) => {
              if (flag === 1) {
                setVitalsDrawer(false);
              }
            }}
            initialVitals={mergedVitals}
            onVitalsUpdate={onUpdate}
            onVitalsSave={handleVitalsSave}
          />
        </Drawer>
      )}
    </>
  );
};

export default VitalsRichTextEditor;

