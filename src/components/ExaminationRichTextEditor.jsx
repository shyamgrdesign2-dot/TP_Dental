import React, { useCallback, useMemo, useRef } from 'react';
import RichTextEditor from './richTextEditor/RichTextEditor';
import { arrayToSlateBulletList, slateBulletListToArray } from '../utils/slateHelpers';
import './ExaminationRichTextEditor.scss';
import examinationIcon from '../assets/images/Examination.svg';

/**
 * ExaminationRichTextEditor - Rich text editor specifically for Examination section
 * Converts between array format [{lineItem: "examination text"}] and Slate.js format
 */
const ExaminationRichTextEditor = ({
  examinations = [],
  onUpdate,
  isProcessing = false,
  className = '',
}) => {
  const previousCountRef = useRef(null);
  const keyVersionRef = useRef(0);

  const nonEmptyCount = useMemo(() => {
    if (!Array.isArray(examinations) || examinations.length === 0) {
      return 0;
    }

    return examinations.filter((examination = {}) => {
      const baseText = examination.name || examination.lineItem || '';
      return baseText && baseText.trim() !== '';
    }).length;
  }, [examinations]);

  const editorKey = useMemo(() => {
    if (previousCountRef.current === null) {
      previousCountRef.current = nonEmptyCount;
      return 'examinations-0';
    }

    if (nonEmptyCount < previousCountRef.current) {
      keyVersionRef.current += 1;
    }

    previousCountRef.current = nonEmptyCount;
    return `examinations-${keyVersionRef.current}`;
  }, [nonEmptyCount]);

  const initialSlateValue = useMemo(() => {
    if (!examinations || examinations.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    const formattedExaminations = examinations.map(examination => {
      const name = examination.name || '';
      const parts = [];
      
      if (examination.notes) parts.push(examination.notes);
      
      if (parts.length > 0) {
        return `${name} (${parts.join(', ')})`;
      }
      
      return name || examination.lineItem || '';
    }).filter(text => text.trim() !== '');
    
    if (formattedExaminations.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    return arrayToSlateBulletList(formattedExaminations);
  }, [examinations]);

  const handleChange = useCallback((value) => {
    const items = slateBulletListToArray(value);
    const examinationsArray = items.map(text => ({ lineItem: text }));
    
    if (onUpdate) {
      onUpdate(examinationsArray);
    }
  }, [onUpdate]);

  if (isProcessing) {
    return (
      <div className={`examination-rich-text-editor ${className}`}>
        <div className="examination-header">
        <div className="examination-icon">
          <img src={examinationIcon} alt="Examination" />
        </div>
          <span className="examination-title">Examination</span>
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
    <div className={`examination-rich-text-editor ${className}`}>
      <div className="examination-header">
        <div className="examination-icon">
          <img src={examinationIcon} alt="Examination" />
        </div>
        <span className="examination-title">Examination</span>
      </div>
      <div className="editor-container">
        <RichTextEditor
          key={editorKey}
          initialValue={initialSlateValue}
          onChange={handleChange}
          placeholder="Add examination findings..."
          spellCheck={true}
          autoFocus={false}
          showToolbar={false}
        />
      </div>
    </div>
  );
};

export default ExaminationRichTextEditor;

