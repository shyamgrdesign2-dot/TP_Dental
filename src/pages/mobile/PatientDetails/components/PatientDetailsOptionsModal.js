import React from 'react';
import { Drawer } from 'antd';
import closeIcon from '../../../../assets/mobile/close 2.svg';
import loginIcon from '../../../../assets/mobile/login.svg';
import calendarIcon from '../../../../assets/mobile/calendar-2.svg';
import userEditIcon from '../../../../assets/mobile/user-edit.svg';
import './PatientDetailsOptionsModal.scss';

function PatientDetailsOptionsModal({
  visible,
  onClose,
  onStartWalkInClick,
  onEditPatientClick,
  onBookAppointmentClick,
}) {
  const handleAction = (action) => {
    onClose();
    switch (action) {
      case 'start-walk-in':
        onStartWalkInClick && onStartWalkInClick();
        break;
      case 'edit-patient':
        onEditPatientClick && onEditPatientClick();
        break;
      case 'book-appointment':
        onBookAppointmentClick && onBookAppointmentClick();
        break;
      default:
        break;
    }
  };

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      open={visible}
      height="auto"
      className="patient-details-options-modal"
      closable={false}
      maskClosable={true}
    >
      <div className="patient-details-options-modal-content">
        {/* Header */}
        <div className="patient-details-options-modal-header">
          <h3 className="patient-details-options-modal-title">More Options</h3>
          <button className="patient-details-options-modal-close" onClick={onClose} type="button">
            <img src={closeIcon} alt="Close" className="patient-details-options-close-icon" />
          </button>
        </div>

        {/* Options List */}
        <div className="patient-details-options-list">
          {/* Option 1: Start Walk-in Consultation */}
          <div className="patient-details-option-item" onClick={() => handleAction('start-walk-in')}>
            <div className="patient-details-option-content">
              <div className="patient-details-option-icon-wrapper">
                <img src={loginIcon} alt="Start Walk-in Consultation" className="patient-details-option-icon" />
              </div>
              <div className="patient-details-option-text">
                <span>Start Walk-in Consultation</span>
              </div>
            </div>
            <div className="patient-details-option-divider" />
          </div>

          {/* Option 2: Edit Patient Details */}
          <div className="patient-details-option-item" onClick={() => handleAction('edit-patient')}>
            <div className="patient-details-option-content">
              <div className="patient-details-option-icon-wrapper">
                <img src={userEditIcon} alt="Edit Patient Details" className="patient-details-option-icon" />
              </div>
              <div className="patient-details-option-text">
                <span>Edit Patient Details</span>
              </div>
            </div>
            <div className="patient-details-option-divider" />
          </div>

          {/* Option 3: Book Appointment - Temporarily commented out - will be implemented in next phase */}
          {/* <div className="patient-details-option-item" onClick={() => handleAction('book-appointment')}>
            <div className="patient-details-option-content">
              <div className="patient-details-option-icon-wrapper">
                <img src={calendarIcon} alt="Book Appointment" className="patient-details-option-icon" />
              </div>
              <div className="patient-details-option-text">
                <span>Book Appointment</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Drawer>
  );
}

export default PatientDetailsOptionsModal;

