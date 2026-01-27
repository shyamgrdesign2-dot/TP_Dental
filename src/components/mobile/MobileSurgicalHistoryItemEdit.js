import React, { useState, useEffect } from 'react';
import { Drawer, Input, Button, DatePicker, Radio } from 'antd';
import dayjs from 'dayjs';
import closeIcon from '../../assets/mobile/close 2.svg';
import './MobileSurgicalHistoryItemEdit.scss';

function MobileSurgicalHistoryItemEdit({ 
  visible, 
  onClose, 
  item, 
  onSave 
}) {
  const [title, setTitle] = useState('');
  const [enable, setEnable] = useState('Y');
  const [dateType, setDateType] = useState('year'); // 'year' or 'full'
  const [surgeryDate, setSurgeryDate] = useState(null);
  const [note, setNote] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (!visible || !item) return;
    
    setTitle(item.title || '');
    setEnable(item.enable || 'Y');
    setNote(item.note || '');
    setTitleError('');

    const itemDateType = item.dateType || 'onlyYear';
    setDateType(itemDateType === 'onlyYear' ? 'year' : 'full');

    if (item.date) {
      if (itemDateType === 'onlyYear' || !item.date.includes('-')) {
        setSurgeryDate(item.date);
      } else {
        try {
          const parsed = dayjs(item.date, 'DD-MM-YYYY');
          if (parsed.isValid()) {
            setSurgeryDate(parsed);
          } else {
            setSurgeryDate(null);
          }
        } catch (e) {
          setSurgeryDate(null);
        }
      }
    } else {
      setSurgeryDate(null);
    }
  }, [visible, item]);

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    setTitleError('');

    let dateValue = '';
    if (surgeryDate) {
      if (dateType === 'year') {
        dateValue = typeof surgeryDate === 'string' ? surgeryDate : surgeryDate.toString();
      } else {
        dateValue = dayjs.isDayjs(surgeryDate) 
          ? surgeryDate.format('DD-MM-YYYY')
          : surgeryDate;
      }
    }

    const updatedItem = {
      ...item,
      title: title.trim(),
      date: dateValue,
      dateType: dateType === 'year' ? 'onlyYear' : 'fullDate',
      note: note.trim(),
      since: '', // Surgical history doesn't use 'since'
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
      className="mobile-surgical-history-item-edit"
      closable={false}
      maskClosable={true}
    >
      <div className="mobile-item-edit-content">
        <div className="mobile-item-edit-header">
          <h3 className="mobile-item-edit-title">{title || 'Edit Surgical History'}</h3>
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
              placeholder="Enter surgery name"
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
            <label className="form-label">Had Surgery</label>
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
          {/* Date of Surgery Section */}
          <div className="form-section">
            <label className="form-label">Date of Surgery</label>
            
            {/* Date Type Selector */}
            <Radio.Group
              value={dateType}
              onChange={(e) => {
                setDateType(e.target.value);
                setSurgeryDate(null); // Reset date when changing type
              }}
              className="date-type-radio-group"
              buttonStyle="solid"
            >
              <Radio.Button value="year">Only Year</Radio.Button>
              <Radio.Button value="full">Full Date</Radio.Button>
            </Radio.Group>

            {/* Date Input */}
            {dateType === 'year' ? (
              <Input
                placeholder="YYYY"
                value={surgeryDate || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Only digits
                  if (value.length <= 4) {
                    setSurgeryDate(value);
                  }
                }}
                maxLength={4}
                className="year-input"
              />
                    ) : (
                      <DatePicker
                        value={surgeryDate}
                        onChange={(date) => setSurgeryDate(date)}
                        format="DD-MM-YYYY"
                        placeholder="Select date (DD-MM-YYYY)"
                        className="date-picker"
                        suffixIcon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" fill="currentColor"/>
                  </svg>
                }
              />
            )}
          </div>

          {/* Surgical History Remarks */}
          <div className="form-section">
            <label className="form-label">Surgical History Remarks</label>
            <Input.TextArea
              placeholder="Enter Surgical History Remarks"
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

export default MobileSurgicalHistoryItemEdit;
