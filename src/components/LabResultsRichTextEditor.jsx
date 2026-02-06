import React, { useCallback, useMemo, useRef } from 'react';
import RichTextEditor from './richTextEditor/RichTextEditor';
import { arrayToSlateBulletList, slateBulletListToArray } from '../utils/slateHelpers';
import './LabResultsRichTextEditor.scss';
import labResultsIcon from '../assets/images/Lab.svg';

/**
 * LabResultsRichTextEditor - Rich text editor specifically for Lab Results section
 * Converts between array format [{value: "result text", testname: "test"}] and Slate.js format
 */
const LabResultsRichTextEditor = ({
  labResults = [],
  onUpdate,
  isProcessing = false,
  className = '',
}) => {
  const previousCountRef = useRef(null);
  const keyVersionRef = useRef(0);

  const nonEmptyCount = useMemo(() => {
    if (!Array.isArray(labResults) || labResults.length === 0) {
      return 0;
    }

    return labResults.filter((result = {}) => {
      const testname = result.testname || result.name || '';
      const value = result.value || '';
      return (
        (testname && testname.trim() !== '') ||
        (value && value.trim() !== '')
      );
    }).length;
  }, [labResults]);

  const editorKey = useMemo(() => {
    if (previousCountRef.current === null) {
      previousCountRef.current = nonEmptyCount;
      return 'labresults-0';
    }

    if (nonEmptyCount < previousCountRef.current) {
      keyVersionRef.current += 1;
    }

    previousCountRef.current = nonEmptyCount;
    return `labresults-${keyVersionRef.current}`;
  }, [nonEmptyCount]);

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

  const handleChange = useCallback((value) => {
    const items = slateBulletListToArray(value);
    const labResultsArray = items.map(text => {
      const colonIndex = text.indexOf(':');
      if (colonIndex > -1) {
        return {
          testname: text.substring(0, colonIndex).trim(),
          value: text.substring(colonIndex + 1).trim()
        };
      }
      return { value: text, testname: '' };
    });
    
    if (onUpdate) {
      onUpdate(labResultsArray);
    }
  }, [onUpdate]);

  if (isProcessing) {
    return (
      <div className={`labresults-rich-text-editor ${className}`}>
        <div className="labresults-header">
          <div className="labresults-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
          <span className="labresults-title">Lab Results</span>
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
    <div className={`labresults-rich-text-editor ${className}`}>
      <div className="labresults-header">
        <div className="labresults-icon">
          <img src={labResultsIcon} alt="Lab Results" />
        </div>
        <span className="labresults-title">Lab Results</span>
      </div>
      <div className="editor-container">
        <RichTextEditor
          key={editorKey}
          initialValue={initialSlateValue}
          onChange={handleChange}
          placeholder="Add lab results (e.g., Hemoglobin: 13.5 g/dL)..."
          spellCheck={true}
          autoFocus={false}
          showToolbar={false}
        />
      </div>
    </div>
  );
};

export default LabResultsRichTextEditor;

