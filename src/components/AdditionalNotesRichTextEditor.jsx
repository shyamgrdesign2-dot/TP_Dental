import React, { useCallback, useMemo } from 'react';
import RichTextEditor from './richTextEditor/RichTextEditor';
import { arrayToSlateBulletList, slateBulletListToArray } from '../utils/slateHelpers';
import './AdditionalNotesRichTextEditor.scss';
import additionalNotesIcon from '../assets/images/notes.svg';

/**
 * AdditionalNotesRichTextEditor - Rich text editor specifically for Additional Notes section (previously "Others")
 * Converts between array format and Slate.js format
 */
const AdditionalNotesRichTextEditor = ({
  others = [],
  onUpdate,
  isProcessing = false,
  className = '',
}) => {
  const initialSlateValue = useMemo(() => {
    if (!others || others.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    const noteTexts = others.map(note => {
      if (typeof note === 'string') {
        return note;
      } else if (note && note.value) {
        return note.value;
      }
      return '';
    }).filter(text => text.trim() !== '');
    
    if (noteTexts.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    return arrayToSlateBulletList(noteTexts);
  }, []);

  const handleChange = useCallback((value) => {
    const items = slateBulletListToArray(value);
    const othersArray = items.map(text => ({ value: text }));
    
    if (onUpdate) {
      onUpdate(othersArray);
    }
  }, [onUpdate]);

  if (isProcessing) {
    return (
      <div className={`additionalnotes-rich-text-editor ${className}`}>
        <div className="additionalnotes-header">
          <div className="additionalnotes-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <span className="additionalnotes-title">Additional Notes</span>
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
    <div className={`additionalnotes-rich-text-editor ${className}`}>
      <div className="additionalnotes-header">
        <div className="additionalnotes-icon">
          <img src={additionalNotesIcon} alt="Additional Notes" />
        </div>
        <span className="additionalnotes-title">Additional Notes</span>
      </div>
      <div className="editor-container">
        <RichTextEditor
          initialValue={initialSlateValue}
          onChange={handleChange}
          placeholder="Add any additional notes or observations..."
          spellCheck={true}
          autoFocus={false}
          showToolbar={true}
          toolbarButtons={[
            { type: 'mark', format: 'bold', icon: 'format_bold' },
            { type: 'block', format: 'bulleted-list', icon: 'format_list_bulleted' },
            { type: 'block', format: 'numbered-list', icon: 'format_list_numbered' },
          ]}
        />
      </div>
    </div>
  );
};

export default AdditionalNotesRichTextEditor;

