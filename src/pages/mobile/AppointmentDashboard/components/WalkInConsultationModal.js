import React, { useCallback } from 'react';
import { Drawer } from 'antd';
import closeIcon from '../../../../assets/mobile/close 2.svg';
import './WalkInConsultationModal.scss';

function WalkInConsultationModal({
  visible,
  onClose,
  onWalkInClick,
  onAddAppointmentClick,
}) {
  const handleWalkInClick = useCallback(() => {
    if (onWalkInClick) {
      onWalkInClick();
    }
  }, [onWalkInClick]);

  const handleAddAppointmentClick = useCallback(() => {
    if (onAddAppointmentClick) {
      onAddAppointmentClick();
    }
  }, [onAddAppointmentClick]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <Drawer
      placement="bottom"
      onClose={handleClose}
      open={visible}
      height="auto"
      className="walk-in-modal"
      closable={false}
      maskClosable={true}
      destroyOnClose={true}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Select Options</h3>
          <button 
            className="close-btn" 
            onClick={handleClose} 
            type="button"
            aria-label="Close modal"
          >
            <img src={closeIcon} alt="Close" className="close-icon" />
          </button>
        </div>

        <div className="modal-actions">
          <button
            className="btn-outline btn-add-appointment"
            onClick={handleAddAppointmentClick}
            type="button"
            aria-label="Add an Appointment"
          >
            <i className="icon-Add" aria-hidden="true" />
            Add an Appointment
          </button>
          <button
            className="btn-primary btn-walk-in"
            onClick={handleWalkInClick}
            type="button"
            aria-label="Start Walk-in Consultation"
          >
            Walk-in Consultation
          </button>
        </div>
      </div>
    </Drawer>
  );
}

export default React.memo(WalkInConsultationModal);

