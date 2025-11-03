import React, { useCallback, useMemo } from 'react';
import RichTextEditor from './richTextEditor/RichTextEditor';
import { arrayToSlateBulletList, slateBulletListToArray } from '../utils/slateHelpers';
import './AdviceRichTextEditor.scss';
import adviceIcon from '../assets/images/advice.svg';

/**
 * AdviceRichTextEditor - Rich text editor specifically for Advice section
 * Converts between array format [{lineItem: "advice text"}] and Slate.js format
 */
const AdviceRichTextEditor = ({
  advice = [],
  onUpdate,
  isProcessing = false,
  className = '',
}) => {
  const initialSlateValue = useMemo(() => {
    if (!advice || advice.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    const formattedAdvice = advice.map(adv => {
      const name = adv.name || adv.lineItem || '';
      const notes = adv.notes || '';
      
      if (notes) {
        return `${name} (${notes})`;
      }
      
      return name;
    }).filter(text => text.trim() !== '');
    
    if (formattedAdvice.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    return arrayToSlateBulletList(formattedAdvice);
  }, [advice]);

  const handleChange = useCallback((value) => {
    const items = slateBulletListToArray(value);
    const adviceArray = items.map(text => ({ lineItem: text }));
    
    if (onUpdate) {
      onUpdate(adviceArray);
    }
  }, [onUpdate]);

  if (isProcessing) {
    return (
      <div className={`advice-rich-text-editor ${className}`}>
        <div className="advice-header">
        <div className="advice-icon">
          <img src={adviceIcon} alt="Advice" />
        </div>
          <span className="advice-title">Advice</span>
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
    <div className={`advice-rich-text-editor ${className}`}>
      <div className="advice-header">
        <div className="advice-icon">
          <img src={adviceIcon} alt="Advice" />
        </div>
        <span className="advice-title">Advice</span>
      </div>
      <div className="editor-container">
        <RichTextEditor
          initialValue={initialSlateValue}
          onChange={handleChange}
          placeholder="Add advice..."
          spellCheck={true}
          autoFocus={false}
          showToolbar={false}
        />
      </div>
    </div>
  );
};

export default AdviceRichTextEditor;

