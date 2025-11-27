import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message, Input } from 'antd';
import { debounce } from 'lodash';
import './AllPatients.scss';
import PatientListItem from './components/PatientListItem';
import BottomNavigation from '../AppointmentDashboard/components/BottomNavigation';
import { fetchAllPatients } from '../../allPatients.js/service';
import { resetVaccineState } from '../../../redux/vaccineSlice';
import { resetGrowthChartState } from '../../../redux/growthChartSlice';
import { resetObstetricState } from '../../../redux/obstetricSlice';
import { resetUploadDocState } from '../../../redux/uploadDocSlice';
import { resetDDxState } from '../../../redux/ddxSlice';
import { 
  trackEvent, 
  getClinicName,
  errorMessage 
} from '../../../utils/utils';
import { getDecodedToken } from '../../../utils/localStorage';
import successIcon from '../../../assets/images/end-visit.svg';
import closeIcon from '../../../assets/images/close-visit.svg';
import profileAddIcon from '../../../assets/mobile/profile-add.svg';

function AllPatients() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const decodedToken = getDecodedToken();
  
  const { profile } = useSelector((state) => state.doctors);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPatients, setTotalPatients] = useState(0);
  
  const observer = useRef();
  const MESSAGE_KEY = "patient_update_message";
  
  const doctorDetails = {
    clinic_name: getClinicName(profile?.hospital_data),
    clinic_id: decodedToken?.result?.clinic_id,
    doctor_id: profile?.doctor_unique_id,
    doctor_name: profile?.um_name,
    doctor_mobile_no: profile?.um_contact,
    device_details: "Mobile",
  };

  const loadPatients = useCallback(async (page, search) => {
    try {
      if (page === 1) {
        setLoading(true);
      }
      
      const params = {
        page: page,
        limit: 25,
        search: search,
      };
      
      const response = await fetchAllPatients(params);
      
      if (response?.patients) {
        if (page === 1) {
          setPatients(response.patients);
        } else {
          setPatients(prev => [...prev, ...response.patients]);
        }
        
        setTotalPatients(response.total || 0);
        setHasMore(response.patients.length === 25);
        setPageNo(page);
      }
    } catch (error) {
      console.error('Error loading patients:', error);
      errorMessage('Failed to load patients');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      setPageNo(1);
      setPatients([]);
      await loadPatients(1, query);
    }, 500),
    [loadPatients]
  );

  useEffect(() => {
    loadPatients(1, '');
  }, [loadPatients]);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  // Show success message if redirected from patient form
  useEffect(() => {
    if (location.state?.showMessage) {
      const messageType = location.state.messageType;
      
      // Destroy any existing message first to prevent duplicates
      message.destroy(MESSAGE_KEY);
      
      message.open({
        key: MESSAGE_KEY,
        type: "",
        className: "message-appointment",
        content: (
          <div className="d-flex align-items-center">
            <img src={successIcon} className="me-3" alt="Success" />
            <div>
              <div className="title-common text-start fontroboto">
                {messageType === "updated"
                  ? "Patient details updated successfully"
                  : "Patient added successfully"}
              </div>
            </div>
            <img
              src={closeIcon}
              className="ms-3 cursor-pointer"
              onClick={() => message.destroy(MESSAGE_KEY)}
              alt="Close"
            />
          </div>
        ),
        duration: 5,
      });

      // Clear the message from location state immediately
      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [location.state?.showMessage, navigate, location.pathname]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  const handlePatientClick = (patient) => {
    // Reset all states before navigation (same as desktop)
    dispatch(resetVaccineState());
    dispatch(resetGrowthChartState());
    dispatch(resetObstetricState());
    dispatch(resetUploadDocState());
    dispatch(resetDDxState());
    
    navigate('/patient_details', {
      state: { 
        patient_data: { 
          ...patient, 
          pm_first_name: patient?.pm_fullname || patient?.pm_name 
        },
        from: '/all_patients'
      }
    });
    
    trackEvent("TP_AllPatients_PatientDetailsView", {
      ...doctorDetails,
      patient_id: patient?.pm_pid,
      patient_name: patient?.pm_fullname || patient?.pm_name,
      patient_number: patient?.pm_contact_no || patient?.pm_mobile,
    });
  };

  const handleEditPatient = (patient) => {
    navigate('/edit_patient', {
      state: { 
        patient_data: patient, 
        from: '/all_patients' 
      }
    });
    
    trackEvent("TP_AllPatients_EditPatientDetails", {
      ...doctorDetails,
      patient_id: patient?.pm_pid,
      patient_name: patient?.pm_fullname || patient?.pm_name,
      patient_number: patient?.pm_contact_no || patient?.pm_mobile,
    });
  };

  const handleCreatePrescription = (patient) => {
    // Navigate to prescription creation
    navigate('/prescription', {
      state: { 
        patient_data: patient,
        from: '/all_patients'
      }
    });
    
    trackEvent("TP_AllPatients_CreatePrescription", {
      ...doctorDetails,
      patient_id: patient?.pm_pid,
      patient_name: patient?.pm_fullname || patient?.pm_name,
      patient_number: patient?.pm_contact_no || patient?.pm_mobile,
    });
  };

  const handleBookAppointment = (patient) => {
    // Navigate to appointment booking
    navigate('/add_appointment', {
      state: { 
        patient_data: patient,
        from: '/all_patients'
      }
    });
    
    trackEvent("TP_AllPatients_BookAppointment", {
      ...doctorDetails,
      patient_id: patient?.pm_pid,
      patient_name: patient?.pm_fullname || patient?.pm_name,
      patient_number: patient?.pm_contact_no || patient?.pm_mobile,
    });
  };

  const handleWalkInConsultation = (patient) => {
    // Navigate to walk-in consultation
    navigate('/walk_in_consultation', {
      state: { 
        patient_data: patient,
        from: '/all_patients'
      }
    });
    
    trackEvent("TP_AllPatients_WalkInConsultation", {
      ...doctorDetails,
      patient_id: patient?.pm_pid,
      patient_name: patient?.pm_fullname || patient?.pm_name,
      patient_number: patient?.pm_contact_no || patient?.pm_mobile,
    });
  };

  const handleAddNewPatient = () => {
    navigate('/add_patient', {
      state: { from: '/all_patients' }
    });
    
    trackEvent("TP_AllPatients_AddNewPatient", doctorDetails);
  };

  // Infinite scroll callback
  const lastPatientElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !searchQuery) {
        loadPatients(pageNo + 1, searchQuery);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, pageNo, searchQuery, loadPatients]);

  return (
    <div className="mobile-all-patients">
      {/* Header */}
      <div className="header-container">
        <div className="page-header">
          <div className="title-bar">
            <h1 className="page-title">All Patients</h1>
          </div>
          <div className="search-container">
            <Input
              value={searchQuery}
              placeholder="Search by Name/ID/Mobile Number"
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
        {/* Patient count */}
        {loading && pageNo === 1 ? (
          <div className="patient-count-shimmer">
            <div className="shimmer-count-line"></div>
          </div>
        ) : !loading && patients.length > 0 && (
          <div className="patient-count">
            <p>
              Showing {patients.length} 
              {totalPatients > patients.length && ` of ${totalPatients}`} patients
            </p>
          </div>
        )}

        <div className="patients-list">
          {loading && pageNo === 1 ? (
            <div className="patients-shimmer">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="patient-shimmer-item">
                  <div className="shimmer-avatar-section">
                    <div className="shimmer-avatar"></div>
                    <div className="shimmer-info">
                      <div className="shimmer-header"></div>
                      <div className="shimmer-details">
                        <div className="shimmer-line shimmer-details-text"></div>
                        <div className="shimmer-line shimmer-details-text"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : patients.length > 0 ? (
            <>
              {patients.map((patient, index) => {
                const isLast = patients.length === index + 1;
                return (
                  <div
                    key={patient.pm_pid || patient.pm_patient_id || index}
                    ref={isLast ? lastPatientElementRef : null}
                  >
                    <PatientListItem
                      patient={patient}
                      onClick={() => handlePatientClick(patient)}
                      onEdit={() => handleEditPatient(patient)}
                      onCreatePrescription={() => handleCreatePrescription(patient)}
                      onBookAppointment={() => handleBookAppointment(patient)}
                      onWalkInConsultation={() => handleWalkInConsultation(patient)}
                      doctorDetails={doctorDetails}
                    />
                  </div>
                );
              })}
              
              {/* Loading more indicator */}
              {loading && pageNo > 1 && (
                <div className="loading-more">
                  <div className="loading-spinner small"></div>
                  <p>Loading more patients...</p>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <p>No patients found</p>
              {searchQuery ? (
                <p className="empty-subtitle">
                  Try adjusting your search criteria
                </p>
              ) : (
                <p className="empty-subtitle">
                  Start by adding your first patient
                </p>
              )}
              <button 
                className="add-patient-button"
                onClick={handleAddNewPatient}
              >
                Add New Patient
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <button 
        className="floating-add-button"
        onClick={handleAddNewPatient}
        title="Add New Patient"
      >
        <img src={profileAddIcon} alt="Add Patient" className="floating-add-icon" />
      </button>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="patients" />
    </div>
  );
}

export default AllPatients;
