import React, { useCallback, useMemo } from 'react';
import RichTextEditor from './richTextEditor/RichTextEditor';
import { arrayToSlateBulletList, slateBulletListToArray } from '../utils/slateHelpers';
import './DiagnosisRichTextEditor.scss';
import diagnosisIcon from '../assets/images/Diagnosis.svg';

/**
 * DiagnosisRichTextEditor - Rich text editor specifically for Diagnosis section
 * Converts between array format [{lineItem: "diagnosis text"}] and Slate.js format
 */
const DiagnosisRichTextEditor = ({
  diagnosis = [],
  onUpdate,
  isProcessing = false,
  className = '',
}) => {
  const initialSlateValue = useMemo(() => {
    if (!diagnosis || diagnosis.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    const formattedDiagnosis = diagnosis.map(diag => {
      const name = diag.name || '';
      const parts = [];
      
      if (diag.since) parts.push(`since ${diag.since}`);
      if (diag.status) parts.push(diag.status);
      if (diag.notes) parts.push(diag.notes);
      
      if (parts.length > 0) {
        return `${name} (${parts.join(', ')})`;
      }
      
      return name || diag.lineItem || '';
    }).filter(text => text.trim() !== '');
    
    if (formattedDiagnosis.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    return arrayToSlateBulletList(formattedDiagnosis);
  }, [diagnosis]);

  const handleChange = useCallback((value) => {
    const items = slateBulletListToArray(value);
    const diagnosisArray = items.map(text => ({ lineItem: text }));
    
    if (onUpdate) {
      onUpdate(diagnosisArray);
    }
  }, [onUpdate]);

  if (isProcessing) {
    return (
      <div className={`diagnosis-rich-text-editor ${className}`}>
        <div className="diagnosis-header">
        <div className="diagnosis-icon">
          <img src={diagnosisIcon} alt="Diagnosis" />
        </div>
          <span className="diagnosis-title">Diagnosis</span>
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
    <div className={`diagnosis-rich-text-editor ${className}`}>
      <div className="diagnosis-header">
        <div className="diagnosis-icon">
          <img src={diagnosisIcon} alt="Diagnosis" />
        </div>
        <span className="diagnosis-title">Diagnosis</span>
      </div>
      <div className="editor-container">
        <RichTextEditor
          initialValue={initialSlateValue}
          onChange={handleChange}
          placeholder="Add diagnosis..."
          spellCheck={true}
          autoFocus={false}
          showToolbar={false}
        />
      </div>
    </div>
  );
};

export default DiagnosisRichTextEditor;

