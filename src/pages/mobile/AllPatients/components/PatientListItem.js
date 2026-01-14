import React, { useState } from 'react';
import './PatientListItem.scss';
import KebabIcon from '../../../../assets/mobile/more-vertical.svg';
import PatientOptionsModal from './PatientOptionsModal';
import { trackEvent } from '../../../../utils/utils';
import moment from 'moment';

function PatientListItem({ 
  patient, 
  onClick, 
  onEdit, 
  onCreatePrescription, 
  onBookAppointment,
  onWalkInConsultation,
  doctorDetails 
}) {
  const [showOptions, setShowOptions] = useState(false);

  // Generate initials from patient name (first character of first name + first character of last name)
  const getInitials = (name) => {
    if (!name) return 'P';
    const parts = name.trim().split(' ').filter(part => part.length > 0);
    if (parts.length >= 2) {
      // First character of first name + first character of last name
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length === 1) {
      // If only one name, take first two characters
      return parts[0].substring(0, 2).toUpperCase();
    }
    return 'P';
  };

  // Avatar colors (constants)
  const AVATAR_BG_COLOR = '#F6EFFB';
  const AVATAR_TEXT_COLOR = '#A461D8';

  const handleKebabClick = (e) => {
    e.stopPropagation();
    setShowOptions(true);
    
    // Track kebab menu click
    if (doctorDetails) {
      trackEvent("TP_AllPatients_Actionitemkebabmenu", {
        ...doctorDetails,
        patient_id: patient?.pm_pid,
        patient_name: patient?.pm_fullname || patient?.pm_name,
        patient_number: patient?.pm_contact_no || patient?.pm_mobile,
      });
    }
  };

  const handleCloseOptions = () => {
    setShowOptions(false);
  };

  const handlePatientClick = () => {
    onClick(patient);
  };

  // Format patient details (matching desktop format)
  const formatPatientInfo = () => {
    const parts = [];
    
    // Gender
    if (patient.pm_gender) {
      parts.push(patient.pm_gender.charAt(0).toUpperCase());
    }
    
    // Age
    if (patient.pm_age || patient.pm_dob) {
      const age = patient.pm_age || calculateAge(patient.pm_dob);
      parts.push(`${age}y`);
    }
    
    // Mobile/Contact
    const contact = patient.pm_contact_no || patient.pm_mobile;
    if (contact) {
      parts.push(contact);
    }
    
    // Patient ID
    const patientId = patient.tpml_refrence_id || patient.pm_pid || patient.pm_patient_id;
    if (patientId) {
      parts.push(patientId);
    }
    
    if (parts.length === 0) return 'N/A';
    
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <span className="separator"> | </span>}
      </React.Fragment>
    ));
  };

  // Format last visit date
  const formatLastVisit = () => {
    if (patient.lastVisitDate) {
      return moment(patient.lastVisitDate).format("DD-MM-YYYY");
    }
    return null;
  };

  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const patientName = patient.pm_fullname || patient.pm_name;

  return (
    <>
      <div className="patient-list-item" onClick={handlePatientClick}>
        <div className="patient-content">
          <div className="patient-avatar-section">
            <div 
              className="patient-avatar"
              style={{ 
                backgroundColor: AVATAR_BG_COLOR,
                color: AVATAR_TEXT_COLOR 
              }}
            >
              {getInitials(patientName)}
            </div>
            <div className="patient-info">
              <div className="patient-header">
                <div className="patient-name">
                  {patientName || 'Unknown'}
                </div>
                <button 
                  className="kebab-button"
                  onClick={handleKebabClick}
                  type="button"
                >
                  <img src={KebabIcon} alt="Options" className="kebab-icon" />
                </button>
              </div>
              <div className="patient-details">
                <p className="details-text">
                  {formatPatientInfo()}
                </p>
                {formatLastVisit() && (
                  <p className="last-visit">
                    Last visit: {formatLastVisit()}
                  </p>
                )}
                {patient.category && (
                  <p className="patient-category">
                    Category: {patient.category}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showOptions && (
        <PatientOptionsModal
          patient={patient}
          onClose={handleCloseOptions}
          onViewDetails={onClick}
          onEdit={onEdit}
          onCreatePrescription={onCreatePrescription}
          onBookAppointment={onBookAppointment}
          onWalkInConsultation={onWalkInConsultation}
          doctorDetails={doctorDetails}
        />
      )}
    </>
  );
}

export default PatientListItem;
