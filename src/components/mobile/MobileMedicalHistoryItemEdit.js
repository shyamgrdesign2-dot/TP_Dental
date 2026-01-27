import React, { useState, useEffect } from 'react';
import { Drawer, Input, Button, Radio } from 'antd';
import closeIcon from '../../assets/mobile/close 2.svg';
import './MobileMedicalHistoryItemEdit.scss';

function MobileMedicalHistoryItemEdit({ 
  visible, 
  onClose, 
  item, 
  sectionType,
  onSave 
}) {
  const [title, setTitle] = useState('');
  const [enable, setEnable] = useState('Y'); // 'Y' or 'N'
  const [sinceNumber, setSinceNumber] = useState('');
  const [sinceUnit, setSinceUnit] = useState('1W'); // 1H, 1D, 1W, 1M, 1Y, Custom
  const [customUnit, setCustomUnit] = useState('');
  const [status, setStatus] = useState('Active');
  const [medication, setMedication] = useState('');
  const [note, setNote] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (!visible || !item) return;
    
    setTitle(item.title || '');
    setEnable(item.enable || 'Y');
    setNote(item.note || '');
    setStatus(item.status || 'Active');
    setMedication(item.medication || '');
    setTitleError('');

    const sinceStr = item.since || '';
    if (sinceStr) {
      const match = sinceStr.match(/^(\d+)\s*(.*)$/);
      if (match) {
        setSinceNumber(match[1]);
        const unit = match[2].toLowerCase();
        if (unit.includes('day')) setSinceUnit('1D');
        else if (unit.includes('week')) setSinceUnit('1W');
        else if (unit.includes('month')) setSinceUnit('1M');
        else if (unit.includes('year')) setSinceUnit('1Y');
        else {
          setSinceUnit('Custom');
          setCustomUnit(match[2]);
        }
      }
    } else {
      setSinceNumber('');
      setSinceUnit('1W');
      setCustomUnit('');
    }
  }, [visible, item]);

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    setTitleError('');

    let sinceValue = '';
    if (sinceNumber) {
      if (sinceUnit === 'Custom' && customUnit) {
        sinceValue = `${sinceNumber} ${customUnit}`;
      } else {
        const unitMap = {
          '1D': 'Day',
          '1W': 'Week',
          '1M': 'Month',
          '1Y': 'Year'
        };
        const unitText = unitMap[sinceUnit] || 'Week';
        const plural = parseInt(sinceNumber) > 1 ? `${unitText}(s)` : unitText;
        sinceValue = `${sinceNumber} ${plural}`;
      }
    }

    const updatedItem = {
      ...item,
      title: title.trim(),
      since: sinceValue,
      status: status,
      medication: medication,
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
      className="mobile-medical-history-item-edit"
      closable={false}
      maskClosable={true}
    >
      <div className="mobile-item-edit-content">
        <div className="mobile-item-edit-header">
          <h3 className="mobile-item-edit-title">{title || 'Edit Item'}</h3>
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

          {/* Show fields only if enable='Y' */}
          {enable === 'Y' && (
            <>
          {/* Since Section */}
          <div className="form-section">
            <label className="form-label">Since</label>
            
            {/* Number selector */}
            <div className="number-selector">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  type="button"
                  className={`number-btn ${sinceNumber === String(num) ? 'active' : ''}`}
                  onClick={() => setSinceNumber(String(num))}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className={`number-btn custom ${sinceNumber && !['1','2','3','4','5'].includes(sinceNumber) ? 'active' : ''}`}
                onClick={() => {
                  const custom = prompt('Enter number:');
                  if (custom && !isNaN(custom)) {
                    setSinceNumber(custom);
                  }
                }}
              >
                Custom
              </button>
            </div>

            {/* Unit selector */}
            <div className="unit-selector">
              {['1H', '1D', '1W', '1M', '1Y'].map(unit => (
                <button
                  key={unit}
                  type="button"
                  className={`unit-btn ${sinceUnit === unit ? 'active' : ''}`}
                  onClick={() => setSinceUnit(unit)}
                >
                  {unit}
                </button>
              ))}
              <button
                type="button"
                className={`unit-btn custom ${sinceUnit === 'Custom' ? 'active' : ''}`}
                onClick={() => setSinceUnit('Custom')}
              >
                Custom
              </button>
            </div>

            {sinceUnit === 'Custom' && (
              <Input
                placeholder="Enter custom unit (e.g., Hours, Months)"
                value={customUnit}
                onChange={(e) => setCustomUnit(e.target.value)}
                className="custom-unit-input"
              />
            )}
          </div>

          {/* Status Section */}
          <div className="form-section">
            <label className="form-label">Status</label>
            <Radio.Group
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="status-radio-group"
              buttonStyle="solid"
            >
              <Radio.Button value="Active">Active</Radio.Button>
              <Radio.Button value="Inactive">Inactive</Radio.Button>
            </Radio.Group>
          </div>

          {/* Medication Section (only for Medical Condition when Active) */}
          {sectionType === 2 && status === 'Active' && (
            <div className="form-section">
              <label className="form-label">Medication</label>
              <Radio.Group
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                className="status-radio-group"
                buttonStyle="solid"
              >
                <Radio.Button value="Yes">Yes</Radio.Button>
                <Radio.Button value="No">No</Radio.Button>
              </Radio.Group>
            </div>
          )}

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

export default MobileMedicalHistoryItemEdit;
