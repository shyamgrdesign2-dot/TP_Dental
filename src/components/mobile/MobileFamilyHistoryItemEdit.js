import React, { useState, useEffect } from 'react';
import { Drawer, Input, Button, Select, Radio } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import closeIcon from '../../assets/mobile/close 2.svg';
import './MobileFamilyHistoryItemEdit.scss';

function MobileFamilyHistoryItemEdit({ 
  visible, 
  onClose, 
  item, 
  onSave,
  onOpenRelationshipPicker
}) {
  const [title, setTitle] = useState('');
  const [enable, setEnable] = useState('Y');
  const [relationship, setRelationship] = useState('');
  const [note, setNote] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (!visible || !item) return;
    
    setTitle(item.title || '');
    setEnable(item.enable || 'Y');
    setRelationship(item.relationship || '');
    setNote(item.note || '');
    setTitleError('');
  }, [visible, item]);

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    setTitleError('');

    const updatedItem = {
      ...item,
      title: title.trim(),
      relationship: relationship,
      note: note.trim(),
      enable: enable
    };

    onSave?.(updatedItem);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      open={visible}
      height="85vh"
      className="mobile-family-history-item-edit"
      closable={false}
      maskClosable={true}
    >
      <div className="mobile-item-edit-content">
        <div className="mobile-item-edit-header">
          <h3 className="mobile-item-edit-title">{title || 'Edit Family History'}</h3>
          <button
            className="mobile-item-edit-close"
            onClick={onClose}
            type="button"
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <div className="mobile-item-edit-body">
          {/* Title Input */}
          <div className="form-section">
            <label className="form-label">Title *</label>
            <Input
              placeholder="Enter title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError('');
              }}
              className={`title-input ${titleError ? 'input-error' : ''}`}
              status={titleError ? 'error' : ''}
            />
            {titleError && <div className="error-message">{titleError}</div>}
          </div>

          {/* Enable Y/N Toggle */}
          <div className="form-section">
            <label className="form-label">Has Condition</label>
            <Radio.Group
              value={enable}
              onChange={(e) => setEnable(e.target.value)}
              className="status-radio-group"
              buttonStyle="solid"
            >
              <Radio.Button value="Y">Yes</Radio.Button>
              <Radio.Button value="N">No</Radio.Button>
            </Radio.Group>
          </div>

          {enable === 'Y' && (
            <>
          {/* Relationship Section */}
          <div className="form-section">
            <label className="form-label">Relationship</label>
            <div 
              className="relationship-selector"
              onClick={() => onOpenRelationshipPicker?.(relationship)}
            >
              <span className={relationship ? 'relationship-value' : 'relationship-placeholder'}>
                {relationship || 'Select Relationship'}
              </span>
              <DownOutlined />
            </div>
          </div>

          {/* Note Section */}
          <div className="form-section">
            <label className="form-label">Note</label>
            <Input.TextArea
              placeholder="Enter any specific notes here"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="note-textarea"
            />
          </div>
            </>
          )}
        </div>

        <div className="mobile-item-edit-footer">
          <Button
            type="primary"
            size="large"
            block
            onClick={handleSave}
            className="save-btn"
          >
            Save
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default MobileFamilyHistoryItemEdit;
