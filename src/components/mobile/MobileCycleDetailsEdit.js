import React, { useState, useEffect } from 'react';
import { Drawer, Button, Input } from 'antd';
import closeIcon from '../../assets/mobile/close 2.svg';
import './MobileGynecDetailsEdit.scss';

const { TextArea } = Input;

/**
 * Mobile bottom sheet for editing Cycle details
 * Matches web version's Cycle panel
 */
function MobileCycleDetailsEdit({
  visible,
  onClose,
  intervalOfCycle = '',
  cycleNotes = '',
  onSave
}) {
  const [selectedInterval, setSelectedInterval] = useState('');
  const [customInterval, setCustomInterval] = useState('');
  const [notes, setNotes] = useState('');

  // Interval options: 22-32 + Custom
  const intervalOptions = Array.from({ length: 11 }, (_, i) => ({
    value: String(22 + i),
    label: String(22 + i)
  }));
  intervalOptions.push({ value: 'custom', label: 'Custom' });

  useEffect(() => {
    if (visible) {
      const interval = intervalOfCycle ? String(intervalOfCycle) : '';
      if (interval && !intervalOptions.slice(0, -1).some(opt => opt.value === interval)) {
        // Custom value
        setCustomInterval(interval);
        setSelectedInterval('custom');
      } else {
        setSelectedInterval(interval);
        setCustomInterval('');
      }
      setNotes(cycleNotes || '');
    }
  }, [visible, intervalOfCycle, cycleNotes]);

  const handleSave = async () => {
    let finalInterval = '';
    if (selectedInterval === 'custom' && customInterval) {
      finalInterval = customInterval;
    } else if (selectedInterval && selectedInterval !== 'custom') {
      finalInterval = selectedInterval;
    }

    await onSave?.({
      intervalOfCycle: finalInterval ? parseInt(finalInterval) : null,
      cycleNotes: notes.trim()
    });
    // Don't close here - let parent handle closing after save
  };

  if (!visible) return null;

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      open={visible}
      height="auto"
      className="mobile-gynec-details-edit"
      closable={false}
      maskClosable={true}
      zIndex={1001}
    >
      <div className="mobile-gynec-details-content">
        <div className="mobile-gynec-details-header">
          <h3 className="mobile-gynec-details-title">Cycle</h3>
          <button
            type="button"
            className="mobile-gynec-details-close"
            onClick={onClose}
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <div className="mobile-gynec-details-body">
          <div className="form-section">
            <label className="section-label">Interval of cycle (in days)</label>
            <div className="button-grid interval-grid">
              {intervalOptions.map((option) => {
                const isSelected = selectedInterval === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`option-button ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (option.value === 'custom') {
                        setSelectedInterval('custom');
                        setCustomInterval('');
                      } else {
                        setSelectedInterval(option.value);
                        setCustomInterval('');
                      }
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            {selectedInterval === 'custom' && (
              <Input
                type="number"
                placeholder="Enter days"
                value={customInterval}
                onChange={(e) => setCustomInterval(e.target.value)}
                className="custom-input"
              />
            )}
          </div>

          <div className="form-section">
            <label className="section-label">Note</label>
            <TextArea
              placeholder="Enter any specific cycle notes here"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              maxLength={500}
              className="notes-textarea"
            />
          </div>
        </div>

        <div className="mobile-gynec-details-footer">
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

export default MobileCycleDetailsEdit;
