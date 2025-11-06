import React, { useCallback, useMemo } from 'react';
import RichTextEditor from './richTextEditor/RichTextEditor';
import { arrayToSlateBulletList, slateBulletListToArray } from '../utils/slateHelpers';
import styles from './ConsultationDrawer.module.css';
import vaccinationIcon from '../assets/images/Vaccination.svg';

const VaccinationsRichTextEditor = ({
  vaccinations = [],
  onUpdate,
  isProcessing = false,
  className = '',
}) => {
  const initialSlateValue = useMemo(() => {
    if (!vaccinations || vaccinations.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    const formattedVaccinations = vaccinations.map(vaccination => {
      const name = vaccination.name || '';
      const parts = [];
      
      if (vaccination.severity) parts.push(vaccination.severity);
      if (vaccination.duration) parts.push(vaccination.duration);
      if (vaccination.notes) parts.push(vaccination.notes);
      if (vaccination.type) parts.push(vaccination.type);
      
      if (parts.length > 0) {
        return `${name} (${parts.join(', ')})`;
      }
      
      return name || vaccination.lineItem || '';
    }).filter(text => text.trim() !== '');
    
    if (formattedVaccinations.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    return arrayToSlateBulletList(formattedVaccinations);
  }, [vaccinations]);

  const handleChange = useCallback((value) => {
    const items = slateBulletListToArray(value);
    const vaccinationsArray = items.map(text => ({ lineItem: text }));
    
    if (onUpdate) {
      onUpdate(vaccinationsArray);
    }
  }, [onUpdate]);

  if (isProcessing) {
    return (
      <div className={`${styles['symptoms-rich-text-editor']} ${className}`}>
        <div className={styles['symptoms-content-box']}>
          <div className={styles['symptoms-header']}>
            <div className={styles['symptoms-icon']}>
              <img src={vaccinationIcon} alt="Vaccination" />
            </div>
            <span className={styles['symptoms-title']}>Vaccination</span>
          </div>
          <div className={styles['symptoms-editor-container']}>
            <div className={styles['symptoms-shimmer-container']}>
              <div className={styles['symptoms-shimmer']}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles['symptoms-rich-text-editor']} ${className}`}>
      <div className={styles['symptoms-content-box']}>
        <div className={styles['symptoms-header']}>
          <div className={styles['symptoms-icon']}>
            <img src={vaccinationIcon} alt="Vaccination" />
          </div>
          <span className={styles['symptoms-title']}>Vaccination</span>
        </div>
        <div className={styles['symptoms-editor-container']}>
          <RichTextEditor
            initialValue={initialSlateValue}
            onChange={handleChange}
            placeholder="Add vaccinations..."
            spellCheck={true}
            autoFocus={false}
            showToolbar={false}
          />
        </div>
      </div>
    </div>
  );
};

export default VaccinationsRichTextEditor;

