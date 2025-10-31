import React, { useCallback, useMemo, useState } from 'react';
import RichTextEditor from './richTextEditor/RichTextEditor';
import { arrayToSlateBulletList, slateBulletListToArray } from '../utils/slateHelpers';
import styles from './ConsultationDrawer.module.css';
import medicalHistoryIcon from '../assets/images/Medical-History.svg';
import arrowBoxUpIcon from '../assets/images/arrow-box-up.svg';
import addEditIcon from '../assets/images/Icon.svg';

/**
 * MedicalHistoryRichTextEditor - Rich text editor for Medical History with type-based sub-boxes
 * Handles medical history array with different types: medical_condition, surgical_history, family_history, lifestyle, others
 */
const MedicalHistoryRichTextEditor = ({
  medicalHistory = [],
  onUpdate,
  isProcessing = false,
  className = '',
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    medical_condition: true,
    surgical_history: true,
    family_history: true,
    lifestyle: true,
    others: true
  });
  const [newHistoryItem, setNewHistoryItem] = useState({
    type: 'medical_condition',
    name: '',
    duration: '',
    relation: '',
    status: '',
    notes: ''
  });

  const groupedHistory = useMemo(() => {
    const groups = {
      medical_condition: [],
      surgical_history: [],
      family_history: [],
      lifestyle: [],
      others: []
    };

    medicalHistory.forEach(item => {
      const type = item.type?.toLowerCase().replace(/\s+/g, '_') || 'others';
      if (groups[type]) {
        groups[type].push(item);
      } else {
        groups.others.push(item);
      }
    });

    return groups;
  }, [medicalHistory]);

  const formatHistoryItem = useCallback((item) => {
    const name = item.name || '';
    const details = [];
    
    if (item.duration) details.push(`Since: ${item.duration}`);
    if (item.relation) details.push(`Relation: ${item.relation}`);
    if (item.status) details.push(`Status: ${item.status}`);
    if (item.notes) details.push(`Notes: ${item.notes}`);
    
    if (details.length > 0) {
      return `${name} (${details.join(' | ')})`;
    }
    
    return name || item.lineItem || '';
  }, []);

  const getSlateValueForType = useCallback((items) => {
    if (!items || items.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    const formattedItems = items.map(formatHistoryItem).filter(text => text.trim() !== '');
    
    if (formattedItems.length === 0) {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    return arrayToSlateBulletList(formattedItems);
  }, [formatHistoryItem]);

  const handleTypeChange = useCallback((type, value) => {
    const items = slateBulletListToArray(value);
    const updatedItems = items.map(text => {
      const item = { type: type };
      
      const bracketMatch = text.match(/^(.+?)\s*\((.+)\)$/);
      if (bracketMatch) {
        const name = bracketMatch[1].trim();
        const details = bracketMatch[2];
        
        item.name = name;
        
        const detailParts = details.split(' | ').map(p => p.trim());
        detailParts.forEach(part => {
          if (part.startsWith('Since: ')) {
            item.duration = part.substring(7);
          } else if (part.startsWith('Relation: ')) {
            item.relation = part.substring(10);
          } else if (part.startsWith('Status: ')) {
            item.status = part.substring(8);
          } else if (part.startsWith('Notes: ')) {
            item.notes = part.substring(7);
        }
        });
      } else {
        item.name = text;
      }
      
      item.lineItem = text;
      return item;
    });

    const updatedHistory = medicalHistory.filter(item => {
      const itemType = item.type?.toLowerCase().replace(/\s+/g, '_') || 'others';
      return itemType !== type;
    }).concat(updatedItems);

    if (onUpdate) {
      onUpdate(updatedHistory);
    }
  }, [medicalHistory, onUpdate]);

  const toggleSection = useCallback((type) => {
    setExpandedSections(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  }, []);

  const handleTextareaChange = useCallback((type, value) => {
    const lines = value.split('\n').filter(line => {
      const trimmed = line.trim();
      return trimmed !== '' && trimmed !== '•';
    });
    
    const updatedItems = lines.map(line => {
      const cleanLine = line.replace(/^•\s*/, '');
      
      if (cleanLine.trim() === '') {
        return null;
      }
      
      const bracketMatch = cleanLine.match(/^(.+?)\s*\((.+)\)$/);
      if (bracketMatch) {
        const name = bracketMatch[1].trim();
        const details = bracketMatch[2];
        
        const item = { type: type, name: name };
        
        const detailParts = details.split(' | ').map(p => p.trim());
        detailParts.forEach(part => {
          if (part.startsWith('Since: ')) {
            item.duration = part.substring(7);
          } else if (part.startsWith('Relation: ')) {
            item.relation = part.substring(10);
          } else if (part.startsWith('Status: ')) {
            item.status = part.substring(8);
          } else if (part.startsWith('Notes: ')) {
            item.notes = part.substring(7);
      }
        });
        
        item.lineItem = cleanLine;
        return item;
      } else {
        // Simple format - just the name
        return {
          type: type,
          name: cleanLine,
          lineItem: cleanLine
        };
      }
    }).filter(item => item !== null); // Remove null items

    // Update the specific type in the full medical history array
    const updatedHistory = medicalHistory.filter(item => {
      const itemType = item.type?.toLowerCase().replace(/\s+/g, '_') || 'others';
      return itemType !== type;
    }).concat(updatedItems);

    if (onUpdate) {
      onUpdate(updatedHistory);
    }
  }, [medicalHistory, onUpdate]);

  const handleKeyDown = useCallback((e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.target;
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPosition);
      const textAfterCursor = textarea.value.substring(cursorPosition);
      
      const newText = textBeforeCursor + '\n• ' + textAfterCursor;
      
      textarea.value = newText;
      
      const newCursorPosition = cursorPosition + 3;
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      
      handleTextareaChange(type, newText);
    } else if (e.key === 'Backspace') {
      const textarea = e.target;
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPosition);
      const textAfterCursor = textarea.value.substring(cursorPosition);
      
      const lines = textBeforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];
      
      if (currentLine.trim() === '•' || currentLine.trim() === '') {
        e.preventDefault();
        
        const newText = lines.slice(0, -1).join('\n') + textAfterCursor;
        textarea.value = newText;
        
        const newCursorPosition = lines.slice(0, -1).join('\n').length;
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        
        handleTextareaChange(type, newText);
      }
    }
  }, [handleTextareaChange]);

  const handleAddHistory = useCallback(() => {
    if (!newHistoryItem.name.trim()) return;

    const newItem = {
      ...newHistoryItem,
      lineItem: [newHistoryItem.name, newHistoryItem.duration, newHistoryItem.relation, newHistoryItem.notes]
        .filter(Boolean)
        .join(' | ')
    };

    const updatedHistory = [...medicalHistory, newItem];
    if (onUpdate) {
      onUpdate(updatedHistory);
    }

    setNewHistoryItem({
      type: 'medical_condition',
      name: '',
      duration: '',
      relation: '',
      status: '',
      notes: ''
    });
    setShowAddModal(false);
  }, [newHistoryItem, medicalHistory, onUpdate]);

  const typeConfig = {
    medical_condition: { title: 'MEDICAL CONDITIONS' },
    surgical_history: { title: 'SURGICAL HISTORY' },
    family_history: { title: 'FAMILY HISTORY' },
    lifestyle: { title: 'LIFESTYLE' },
    others: { title: 'ADDITIONAL NOTES' }
  };

  if (isProcessing) {
    return (
      <div className={`${styles['medical-history-rich-text-editor']} ${className}`}>
        <div className={styles['medical-history-content-box']}>
          <div className={styles['medical-history-header']}>
            <div className={styles['medical-history-icon']}>
              <img src={medicalHistoryIcon} alt="Medical History" />
            </div>
            <span className={styles['medical-history-title']}>Medical History</span>
          </div>
          <div className={styles['medical-history-shimmer-container']}>
            <div className={styles['medical-history-shimmer']}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles['medical-history-rich-text-editor']} ${className}`}>
      <div className={styles['medical-history-content-box']}>
        <div className={styles['medical-history-header']}>
          <div className={styles['medical-history-icon']}>
          <img src={medicalHistoryIcon} alt="Medical History" />
          </div>
          <span className={styles['medical-history-title']}>Medical History</span>
        </div>

        <div className={styles['medical-history-sections']}>
          {Object.entries(typeConfig).map(([type, config]) => {
            const hasContent = groupedHistory[type] && groupedHistory[type].length > 0;
            const slateValue = getSlateValueForType(groupedHistory[type]);
            const hasTextContent = slateValue.some(node => 
              node.children && node.children.some(child => 
                child.text && child.text.trim() !== ''
              )
            );
            const isExpanded = expandedSections[type];
            
            if (!hasContent && !hasTextContent) {
              return null;
            }
            
            return (
              <div key={type} className={styles['medical-history-type-section']}>
                <div 
                  className={styles['medical-history-type-header']}
                  onClick={() => toggleSection(type)}
                >
                  <span className={styles['medical-history-type-title']}>{config.title}</span>
                  <img 
                    src={arrowBoxUpIcon} 
                    alt="Toggle" 
                    className={`${styles['medical-history-type-toggle']} ${!isExpanded ? styles['toggle-rotated'] : ''}`}
                  />
                </div>
                {isExpanded && (
                  <div className={styles['medical-history-type-content']}>
                    <textarea
                      className={styles['medical-history-textarea']}
                      value={groupedHistory[type]?.map(item => `• ${formatHistoryItem(item)}`).join('\n') || ''}
                      onChange={(e) => handleTextareaChange(type, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, type)}
                      placeholder={`• Add ${config.title.toLowerCase()}...`}
                      rows={3}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles['add-medical-history-container']}>
            <button 
              className={styles['add-medical-history-button']}
              onClick={() => setShowAddModal(true)}
            >
              <img 
                src={addEditIcon} 
                alt="Add/Edit" 
                className={styles['add-medical-history-icon']}
              />
              <span>Add/Edit Medical History</span>
            </button>
        </div>
      </div>

      {showAddModal && (
        <div className={styles['medical-history-modal-overlay']}>
          <div className={styles['medical-history-modal']}>
            <div className={styles['medical-history-modal-header']}>
              <h3>Add Medical History</h3>
              <button 
                className={styles['modal-close-button']}
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className={styles['medical-history-modal-content']}>
              <div className={styles['form-group']}>
                <label>Type:</label>
                <select 
                  value={newHistoryItem.type}
                  onChange={(e) => setNewHistoryItem({...newHistoryItem, type: e.target.value})}
                >
                  <option value="medical_condition">Medical Condition</option>
                  <option value="surgical_history">Surgical History</option>
                  <option value="family_history">Family History</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className={styles['form-group']}>
                <label>Name:</label>
                <input 
                  type="text"
                  value={newHistoryItem.name}
                  onChange={(e) => setNewHistoryItem({...newHistoryItem, name: e.target.value})}
                  placeholder="e.g., Diabetes, Heart Disease"
                />
              </div>
              <div className={styles['form-group']}>
                <label>Duration/Since:</label>
                <input 
                  type="text"
                  value={newHistoryItem.duration}
                  onChange={(e) => setNewHistoryItem({...newHistoryItem, duration: e.target.value})}
                  placeholder="e.g., 2 years, since 2020"
                />
              </div>
              <div className={styles['form-group']}>
                <label>Status:</label>
                <select 
                  value={newHistoryItem.status}
                  onChange={(e) => setNewHistoryItem({...newHistoryItem, status: e.target.value})}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Chronic">Chronic</option>
                </select>
              </div>
              {newHistoryItem.type === 'family_history' && (
                <div className={styles['form-group']}>
                  <label>Relation:</label>
                  <input 
                    type="text"
                    value={newHistoryItem.relation}
                    onChange={(e) => setNewHistoryItem({...newHistoryItem, relation: e.target.value})}
                    placeholder="e.g., father, mother, brother"
                  />
                </div>
              )}
              <div className={styles['form-group']}>
                <label>Notes:</label>
                <textarea 
                  value={newHistoryItem.notes}
                  onChange={(e) => setNewHistoryItem({...newHistoryItem, notes: e.target.value})}
                  placeholder="Additional notes..."
                  rows={3}
        />
      </div>
            </div>
            <div className={styles['medical-history-modal-footer']}>
              <button 
                className={styles['modal-cancel-button']}
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className={styles['modal-add-button']}
                onClick={handleAddHistory}
                disabled={!newHistoryItem.name.trim()}
              >
                Add Medical History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalHistoryRichTextEditor;