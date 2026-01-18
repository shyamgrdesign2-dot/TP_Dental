import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import VitalsBodyComposition from '../../../../components/VitalsBodyComposition';
import MedicalHistory from '../../../../components/MedicalHistory';
import VisitVaccination from '../../../vaccination/components/visitVaccination/VisitVaccination';
import VisitGrowthChart from '../../../growthChart/components/visitGrowthChart/VisitGrowthChart';
import VisitObstetric from '../../../obstetric/components/visitObstetric/VisitObstetric';
import VisitLabParameters from '../../../../components/VisitLabParameters';
import CarePlanBox from '../../../../components/CarePlanBox';
import medicalHistoryIcon from '../../../../assets/mobile/Medical History.svg';
import vitalsIcon from '../../../../assets/mobile/Vitals.svg';
import vaccinationIcon from '../../../../assets/mobile/Vaccination.svg';
import growthChartIcon from '../../../../assets/mobile/Growth Chart.svg';
import labIcon from '../../../../assets/mobile/Lab.svg';
import notesIcon from '../../../../assets/mobile/notes.svg';
import healthCareIcon from '../../../../assets/mobile/health care.svg';
import './PatientHistoryTab.scss';

function PatientHistoryTab({
  patient_data,
  viewCaseManagerData,
  loading,
  tcmData,
  isVaccinationAccessable,
  isGrowthChartAccessable,
  userId,
  onSectionClick,
}) {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    if (!sectionId || loading) return;
    
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
    
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
  };

  // MOBILE OPTIMIZATION: Memoize historySections array to prevent recreation on every render
  // This prevents unnecessary re-renders of child components (MedicalHistory, VitalsBodyComposition, etc.)
  const historySections = useMemo(() => [
    {
      id: 'medical-history',
      label: 'Medical History',
      icon: medicalHistoryIcon,
      visible: true,
      // Match web version: Always render, component handles internal checks
      component: (
        <MedicalHistory
          loading={loading}
          medicalHistoryData={viewCaseManagerData?.medical_history}
          doctorId={viewCaseManagerData?.doctor_data?.um_id}
        />
      ),
    },
    {
      id: 'vitals',
      label: 'Vitals',
      icon: vitalsIcon,
      // Match web version: Only show if vitals exist or birth weight exists
      visible: viewCaseManagerData && (viewCaseManagerData?.vitals?.length > 0 || viewCaseManagerData?.patient_birth_weight),
      component: viewCaseManagerData &&
        (viewCaseManagerData?.vitals?.length > 0 ||
          viewCaseManagerData?.patient_birth_weight) ? (
          <VitalsBodyComposition
            loading={loading}
            passVitals={
              viewCaseManagerData
                ? [...viewCaseManagerData.vitals].slice(0, 2)
                : viewCaseManagerData
            }
            patientBirthWeight={viewCaseManagerData?.patient_birth_weight}
          />
        ) : null,
    },
    {
      id: 'vaccination',
      label: 'Vaccination',
      icon: vaccinationIcon,
      // Match web version: Only show if vaccination is accessible
      visible: isVaccinationAccessable,
      component: isVaccinationAccessable ? <VisitVaccination /> : null,
    },
    {
      id: 'growth',
      label: 'Growth',
      icon: growthChartIcon,
      // Match web version: Only show if growth chart is accessible
      visible: isGrowthChartAccessable,
      component: isGrowthChartAccessable ? <VisitGrowthChart /> : null,
    },
    {
      id: 'lab-results',
      label: 'Lab Results',
      icon: labIcon,
      visible: true,
      // Match web version: Always render, component handles internal checks
      component: (
        <VisitLabParameters
          patient_unique_id={patient_data?.patient_unique_id}
          doc_id={userId}
        />
      ),
    },
    {
      id: 'gynec-history',
      label: 'Gynec History',
      icon: notesIcon,
      visible: false,
      component: null,
    },
    {
      id: 'obstetric-history',
      label: 'Obstetric History',
      icon: notesIcon,
      visible: true,
      // Match web version: Always render, component handles internal checks
      component: (
        <VisitObstetric doctorId={viewCaseManagerData?.doctor_data?.um_id} />
      ),
    },
    {
      id: 'care-plans',
      label: 'Assigned Care Plans',
      icon: healthCareIcon,
      visible: true,
      // Match web version: Always render, component handles internal checks
      component: (
        <CarePlanBox
          patientId={patient_data?.patient_unique_id}
          selectedTcmId={tcmData?.tcm_id}
          readOnly={true}
        />
      ),
    },
  ].filter(section => section.visible), [
    loading,
    viewCaseManagerData?.medical_history,
    viewCaseManagerData?.doctor_data?.um_id,
    viewCaseManagerData?.vitals,
    viewCaseManagerData?.patient_birth_weight,
    isVaccinationAccessable,
    isGrowthChartAccessable,
    patient_data?.patient_unique_id,
    userId,
    tcmData?.tcm_id,
  ]);

  if (!historySections || historySections.length === 0) {
    return (
      <div className="patient-history-tab">
        <div className="history-accordions">
          <div className="empty-state">No history sections available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-history-tab">
      <div className="history-accordions">
        {historySections.map((section, index) => {
          if (!section || !section.id) return null;
          
          const isExpanded = expandedSections[section.id];
          return (
            <div key={section.id} className="history-accordion-item">
              <button
                id={`accordion-header-${section.id}`}
                className="accordion-header"
                onClick={() => toggleSection(section.id)}
                type="button"
                disabled={loading}
                aria-expanded={isExpanded}
                aria-controls={`accordion-content-${section.id}`}
              >
                <div className="accordion-header-content">
                  <div className="icon-wrapper">
                    {section.icon && (
                      <img 
                        src={section.icon} 
                        alt="" 
                        className="section-icon"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <span className="section-label">{section.label || ''}</span>
                </div>
                <div className={`chevron-icon ${isExpanded ? 'expanded' : ''}`} aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#454551" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              {isExpanded && section.component && (
                <div 
                  id={`accordion-content-${section.id}`}
                  className="accordion-content"
                  role="region"
                  aria-labelledby={`accordion-header-${section.id}`}
                >
                  {section.component}
                </div>
              )}
              {index < historySections.length - 1 && <div className="section-divider" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

PatientHistoryTab.propTypes = {
  patient_data: PropTypes.object,
  viewCaseManagerData: PropTypes.object,
  loading: PropTypes.bool,
  tcmData: PropTypes.object,
  isVaccinationAccessable: PropTypes.bool,
  isGrowthChartAccessable: PropTypes.bool,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSectionClick: PropTypes.func,
};

PatientHistoryTab.defaultProps = {
  patient_data: null,
  viewCaseManagerData: null,
  loading: false,
  tcmData: null,
  isVaccinationAccessable: false,
  isGrowthChartAccessable: false,
  userId: null,
  onSectionClick: null,
};

export default PatientHistoryTab;
