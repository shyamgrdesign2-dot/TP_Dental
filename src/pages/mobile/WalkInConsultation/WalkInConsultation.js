import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';
import './WalkInConsultation.scss';
import WalkInPatientCard from './components/WalkInPatientCard';
import { clearSearch, searchPatients } from '../../../redux/appointmentsSlice';
import { resetVaccineState } from '../../../redux/vaccineSlice';
import { resetGrowthChartState } from '../../../redux/growthChartSlice';
import { resetObstetricState } from '../../../redux/obstetricSlice';
import { resetUploadDocState } from '../../../redux/uploadDocSlice';
import { resetDDxState } from '../../../redux/ddxSlice';
import { 
  getClinicName,
  isNumeric,
  isAlphabet 
} from '../../../utils/utils';
import { getDecodedToken } from '../../../utils/localStorage';
import arrowLeftIcon from '../../../assets/mobile/arrow-left.svg';

function WalkInConsultation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const decodedToken = getDecodedToken();
  
  const { profile, loading: profileLoading } = useSelector((state) => state.doctors);
  const { patients, loading, error } = useSelector((state) => state.records);
  
  const [searchQuery, setSearchQuery] = useState('');

  // Ensure profile is loaded - dispatch getProfile if missing
  useEffect(() => {
    if (!profile && !profileLoading) {
      dispatch(getProfile());
    }
  }, [dispatch, profile, profileLoading]);

  // Use useMemo to recalculate clinicName when profile changes
  const clinicName = useMemo(() => getClinicName(profile?.hospital_data), [profile?.hospital_data]);

  const doctorDetails = useMemo(() => ({
    clinic_name: clinicName,
    clinic_id: decodedToken?.result?.clinic_id,
    doctor_id: profile?.doctor_unique_id,
    doctor_name: profile?.um_name,
    doctor_mobile_no: profile?.um_contact,
    device_details: "Mobile",
  }), [clinicName, decodedToken?.result?.clinic_id, profile?.doctor_unique_id, profile?.um_name, profile?.um_contact]);

  // Reset all states on mount (same as web version)
  useEffect(() => {
    dispatch(resetVaccineState());
    dispatch(resetGrowthChartState());
    dispatch(resetObstetricState());
    dispatch(resetUploadDocState());
    dispatch(resetDDxState());
  }, [dispatch]);

  // Search with debounce (same as web version - 500ms setTimeout)
  useEffect(() => {
    if (searchQuery) {
      const timeOutId = setTimeout(() => {
        dispatch(searchPatients({ searchQuery: searchQuery, company: "" }));
      }, 500);
      return () => {
        clearTimeout(timeOutId);
      };
    } else {
      dispatch(clearSearch());
    }
  }, [searchQuery, dispatch]);

  const handleSearchChange = useCallback((value) => {
    // Track search event (same as web version)
    if (window.Moengage && profile && clinicName) {
      window.Moengage.track_event("TP_Patient_searched", {
        clinic_name: clinicName,
      });
    }
    setSearchQuery(value);
  }, [profile, clinicName]);

  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handlePatientDetails = useCallback((patient) => {
    navigate('/patient_details', {
      state: { patient_data: patient }
    });
  }, [navigate]);

  const handleVoiceRx = useCallback((patient) => {
    navigate('/voice-rx-consult', {
      state: { 
        patient_data: patient,
        isFromTabView: true
      }
    });
  }, [navigate]);

  const handleAddNewPatient = useCallback(() => {
    // Same logic as web version
    if (window.Moengage && profile) {
      const clinic_name = getClinicName(profile?.hospital_data);
      window.Moengage.track_event("TP_Add_Patient_clicked", {
        clinic_name,
      });
    }
    
    if (searchQuery.length === 10 && isNumeric(searchQuery)) {
      navigate("/add_patient", { 
        state: { patient_data: { pm_fullname: '', pm_contact_no: searchQuery } } 
      });
    } else if (searchQuery.length > 0 && isAlphabet(searchQuery)) {
      navigate("/add_patient", { 
        state: { patient_data: { pm_fullname: searchQuery, pm_contact_no: '' } } 
      });
    } else {
      navigate("/add_patient");
    }
  }, [searchQuery, profile, navigate]);

  return (
    <div className="mobile-walk-in-consultation">
      {/* Header */}
      <div className="header-container">
        <div className="page-header">
          <div className="header-bar">
            <button 
              className="back-button"
              onClick={handleBackClick}
              type="button"
            >
              <img src={arrowLeftIcon} alt="Back" className="back-icon" />
            </button>
            <h1 className="page-title">Walk-in Consultation</h1>
          </div>
          <div className="search-container">
            <Input
              value={searchQuery}
              placeholder="Search by Name/ ID/ Mobile Number"
              prefix={<i className="icon-search" />}
              suffix={
                searchQuery.length > 0 && (
                  <i
                    className="icon-Cross"
                    onClick={handleSearchClear}
                    style={{ cursor: 'pointer' }}
                  />
                )
              }
              onChange={(e) => handleSearchChange(e.target.value)}
              className="search-input"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content-container">
        {loading && searchQuery.length > 0 ? (
          <div className="patients-shimmer">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="patient-shimmer-item">
                <div className="shimmer-avatar-section">
                  <div className="shimmer-avatar"></div>
                  <div className="shimmer-info">
                    <div className="shimmer-header"></div>
                    <div className="shimmer-details">
                      <div className="shimmer-line shimmer-details-text"></div>
                    </div>
                  </div>
                </div>
                <div className="shimmer-divider"></div>
                <div className="shimmer-actions">
                  <div className="shimmer-button"></div>
                  <div className="shimmer-button"></div>
                </div>
              </div>
            ))}
          </div>
        ) : patients && patients.length > 0 ? (
          <div className="patients-list">
            {patients.map((patient, index) => (
              <WalkInPatientCard
                key={patient.pm_pid || patient.pm_patient_id || patient.patient_unique_id || index}
                patient={patient}
                searchQuery={searchQuery}
                onPatientDetails={handlePatientDetails}
                onVoiceRx={handleVoiceRx}
                doctorDetails={doctorDetails}
                profile={profile}
              />
            ))}
          </div>
        ) : searchQuery.length > 0 && patients && patients.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👤</div>
            <p>No patients found</p>
            <p className="empty-subtitle">
              Try adjusting your search criteria
            </p>
            <button 
              className="add-patient-button"
              onClick={handleAddNewPatient}
            >
              Add New Patient
            </button>
          </div>
        ) : !searchQuery ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>Search for a patient</p>
            <p className="empty-subtitle">
              Enter patient's name, phone number, or ID to start
            </p>
            <button 
              className="add-patient-button"
              onClick={handleAddNewPatient}
            >
              Add New Patient
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default React.memo(WalkInConsultation);

