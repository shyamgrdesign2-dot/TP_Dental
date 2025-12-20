import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Drawer, Button } from 'antd';
import moment from 'moment';

import { useDeviceType } from '../../../utils/deviceDetection';
import { viewCaseManager } from '../../../redux/caseManagerSlice';
import { setAllUploadedDocs, setPatientUploadedDocs } from '../../../redux/uploadDocSlice';
import { fetchAllPatientDocs, fetchDocsUploadedByPatient } from '../../medicalRecords/service';
import { mergeDocuments } from '../../medicalRecords/utils/helper';
import { fetchPrintSetting } from '../../opdBilling/service';
import { setBillPrintSettings } from '../../../redux/billingSlice';
import { getClinicName, getClinic, errorMessage, sendMessageToParent } from '../../../utils/utils';
import { PATIENT_DETAILS_SIDEBAR_KEYS, GB_SNAP_RX, GB_ISCRIBE, S_AMBIENT_VOICE_RX, S_VOICE_RX } from '../../../utils/constants';
import { EVENTS } from '../../../utils/events';
import { useAccess } from '../../vaccination/useAccess';
import { useOpdBilling } from '../../opdBilling/useOpdBilling';
import { isChrome, isSafari } from 'react-device-detect';
import { useFeatureIsOn } from '@growthbook/growthbook-react';

// Components
import DetailsHeader from './components/DetailsHeader';
import PatientTabs from './components/PatientTabs';
import PatientProfileSection from './components/PatientProfileSection';
import VisitDateSelector from './components/VisitDateSelector';
import VisitSummaryTab from './components/VisitSummaryTab';
import PatientHistoryTab from './components/PatientHistoryTab';
import CertificateTab from './components/CertificateTab';
import MedicalRecordsTab from './components/MedicalRecordsTab';
import BillingTab from './components/BillingTab';
import PatientDetailsOptionsModal from './components/PatientDetailsOptionsModal';
import EmptyState from '../AppointmentDashboard/components/EmptyState';

// Shared components
import VitalsBodyComposition from '../../../components/VitalsBodyComposition';
import MedicalHistory from '../../../components/MedicalHistory';
import VisitVaccination from '../../vaccination/components/visitVaccination/VisitVaccination';
import VisitGrowthChart from '../../growthChart/components/visitGrowthChart/VisitGrowthChart';
import VisitObstetric from '../../obstetric/components/visitObstetric/VisitObstetric';
import VisitLabParameters from '../../../components/VisitLabParameters';
import CarePlanBox from '../../../components/CarePlanBox';
import Cardiology from '../../../components/Cardiology';
import CertificateDetails from '../../../components/medical_certificate/CertificateDetails';
import VisitMedicalRecords from '../../medicalRecords/components/visitMedicalRecords/VisitMedicalRecords';
import BillingDashboard from '../../opdBilling/components/billingDashboard/BillingDashboard';
import UploadDocPopup from '../../medicalRecords/components/uploadDocPopup/UploadDocPopup';
import CommonModal from '../../../common/CommonModal';
import UploadDocument from '../../medicalRecords/UploadDocument';
import alertIcon from '../../../assets/images/alertIcon.svg';

import './PatientDetails.scss';

function PatientDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isMobile, isPWA } = useDeviceType();
  const scrollContainerRef = useRef(null);
  const cardiologyPrintHandlerRef = useRef(null);

  const { state } = useLocation();
  const { patient_data, sidebarKey: initialSidebarKey } = state || {};

  const { profile, userId } = useSelector((state) => state.doctors);
  const { isLoading } = useSelector((state) => state.uploadDoc);
  const {
    viewCaseManagerData,
    loading,
  } = useSelector((state) => state.caseManager);
  const { allUploadedDocs } = useSelector((state) => state.uploadDoc);
  const { billPrintSettings } = useSelector((state) => state.billing);
  const { isOpdBillingAccessable } = useOpdBilling();
  const { isVaccinationAccessable, isGrowthChartAccessable } = useAccess(
    patient_data?.ageYears
  );

  // Determine Rx type for Edit handler
  const smartPrescriptionFilename = viewCaseManagerData?.smart_prescription_filename;
  const isSnapRx = smartPrescriptionFilename?.includes('snap_rx');
  const isSnapRxAccessableFromGB = useFeatureIsOn(GB_SNAP_RX);
  const isSmartRxFile = smartPrescriptionFilename?.includes('.jpeg');

  const [selectedTab, setSelectedTab] = useState(
    initialSidebarKey || PATIENT_DETAILS_SIDEBAR_KEYS.VISIT_SUMMARY
  );
  const [tcmData, setTcmData] = useState({ tcm_id: 0, page: 1 });
  const [filesData, setFilesData] = useState([]);
  const [shouldShowUploadDocPopup, setShowUploadDocPopup] = useState(false);
  const [isFileSizeError, setIsFileSizeError] = useState(false);
  const [isFileLimitError, setIsFileLimitError] = useState(false);
  const [isFileTypeError, setIsFileTypeError] = useState(null);
  const [uploadDocDrawer, setUploadDocDrawer] = useState(false);
  const [shouldShowDeletePopup, setShowDeletePopup] = useState(false);
  const [isEditDocument, setIsEditDocument] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const lastScrollYRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const scrollIgnoreRef = useRef(false);

  // Fetch case manager data
  useEffect(() => {
    if (!patient_data?.patient_unique_id) return;

    const clinic_name = getClinicName(profile?.hospital_data);
    window.Moengage?.track_event('TP_Patient_detail_landing', {
      clinic_name,
      patient_number: patient_data?.pm_contact_no,
      patient_id: patient_data?.patient_unique_id,
    });

    const sendData = {
      patient_unique_id: patient_data.patient_unique_id,
      tcm_id: tcmData.tcm_id,
    };
    dispatch(viewCaseManager(sendData));
  }, [tcmData, patient_data, dispatch, profile]);

  // Fetch patient documents
  useEffect(() => {
    if (patient_data?.patient_unique_id && allUploadedDocs.length === 0) {
      getAllPatientDocs();
    }
  }, [patient_data]);

  // Fetch billing print settings
  useEffect(() => {
    if (billPrintSettings && Object.keys(billPrintSettings).length === 0) {
      getBillPrintSettings();
    }
  }, []);

  // Scroll handler for profile visibility
  useEffect(() => {
    let rafId = null;
    
    const handleScroll = () => {
      // Ignore scroll during transitions or if already processing
      if (isTransitioningRef.current || scrollIgnoreRef.current) {
        return;
      }

      // Cancel any pending animation frame
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Use requestAnimationFrame for smooth handling
      rafId = requestAnimationFrame(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const currentScrollY = container.scrollTop || 0;
        const lastScrollY = lastScrollYRef.current;
        const scrollDifference = currentScrollY - lastScrollY;
        
        // Always show profile when near top (regardless of content height)
        if (currentScrollY <= 50) {
          if (!showProfile) {
            isTransitioningRef.current = true;
            scrollIgnoreRef.current = true;
            setShowProfile(true);
            
            setTimeout(() => {
              isTransitioningRef.current = false;
              scrollIgnoreRef.current = false;
              lastScrollYRef.current = container.scrollTop || 0;
            }, 350);
          }
          lastScrollYRef.current = currentScrollY;
          rafId = null;
          return;
        }
        
        // Only process if scroll difference is significant (prevents flickering from small movements)
        if (Math.abs(scrollDifference) > 15) {
          // Check if we have enough content to scroll
          const scrollHeight = container.scrollHeight;
          const clientHeight = container.clientHeight;
          const hasEnoughContent = scrollHeight > clientHeight + 30;
          
          // Process scroll if we have enough content OR if scrolling up significantly
          if (hasEnoughContent || scrollDifference < -20) {
            if (scrollDifference > 0 && currentScrollY > 80) {
              // Scrolling down - hide profile
              if (showProfile) {
                isTransitioningRef.current = true;
                scrollIgnoreRef.current = true;
                setShowProfile(false);
                
                // Re-enable scroll handling after transition
                setTimeout(() => {
                  isTransitioningRef.current = false;
                  scrollIgnoreRef.current = false;
                  lastScrollYRef.current = container.scrollTop || 0;
                }, 350);
              }
            } else if (scrollDifference < -10) {
              // Scrolling up - show profile (need significant upward scroll)
              if (!showProfile) {
                isTransitioningRef.current = true;
                scrollIgnoreRef.current = true;
                setShowProfile(true);
                
                // Re-enable scroll handling after transition
                setTimeout(() => {
                  isTransitioningRef.current = false;
                  scrollIgnoreRef.current = false;
                  lastScrollYRef.current = container.scrollTop || 0;
                }, 350);
              }
            }
          }
          
          // Update last scroll position only if we processed the scroll
          if (Math.abs(scrollDifference) > 15) {
            lastScrollYRef.current = currentScrollY;
          }
        }
        
        rafId = null;
      });
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    }
  }, [showProfile]);

  const getBillPrintSettings = async () => {
    const printSettingsResponse = await fetchPrintSetting();
    if (printSettingsResponse) {
      dispatch(setBillPrintSettings(printSettingsResponse));
    }
  };

  const getAllPatientDocs = async () => {
    const doctorUploadedDocs = await fetchAllPatientDocs(patient_data.patient_unique_id);
    const patientUploadedDocs = await fetchDocsUploadedByPatient(
      patient_data.patient_unique_id
    );
    dispatch(setPatientUploadedDocs(patientUploadedDocs));
    dispatch(
      setAllUploadedDocs(
        mergeDocuments(doctorUploadedDocs, patientUploadedDocs)
      )
    );
  };

  const nextPress = () => {
    window.Moengage?.track_event('patient_detail_prev', {
      doctor_id: profile?.doctor_unique_id,
      patient_id: patient_data?.patient_unique_id || 0,
    });
    setTcmData({ tcm_id: viewCaseManagerData?.next_tcm_id, page: tcmData.page - 1 });
  };

  const prevPress = () => {
    window.Moengage?.track_event('patient_detail_next', {
      doctor_id: profile?.doctor_unique_id,
      patient_id: patient_data?.patient_unique_id || 0,
    });
    setTcmData({ tcm_id: viewCaseManagerData?.prev_tcm_id, page: tcmData.page + 1 });
  };

  const handleTabChange = useCallback((tabKey) => {
    setSelectedTab(tabKey);
  }, []);

  const handleUploadDocPopup = () => {
    setShowUploadDocPopup((prev) => !prev);
  };

  const handleRetryBtn = () => {
    setFilesData([]);
    setIsFileSizeError(false);
    setIsFileLimitError(false);
    setIsFileTypeError(null);
  };

  const handleDeletePopup = () => {
    setShowDeletePopup(true);
  };

  const handleDrawerUploadDoc = () => {
    setUploadDocDrawer(!uploadDocDrawer);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditProfile = () => {
    navigate('/edit_patient', {
      replace: true,
      state: { patient_data: patient_data },
    });
  };

  const handleOpenOptionsModal = () => {
    setShowOptionsModal(true);
  };

  const handleCloseOptionsModal = () => {
    setShowOptionsModal(false);
  };

  const handleStartWalkInConsultation = () => {
    // Navigate to walk-in consultation page
    navigate('/walk_in_consultation', {
      state: { patient_data: patient_data },
    });
  };

  const handleEditPatient = () => {
    navigate('/edit_patient', {
      replace: true,
      state: { patient_data: patient_data },
    });
  };

  const handleBookAppointment = () => {
    navigate('/add_appointment', {
      state: { 
        patient_data: patient_data,
        from: '/patient_details'
      },
    });
  };

  const handleVoiceRxClick = useCallback(() => {
    if (profile && window.Moengage) {
      const clinic = getClinic(profile?.hospital_data);
      window.Moengage.track_event("TP_AV_Entry", {
        patient_id: patient_data?.patient_unique_id || patient_data?.pm_pid || "",
        patient_name: patient_data?.pm_fullname || "",
        patient_mobile_number: patient_data?.pm_contact_no || "",
        doctor_id: profile?.doctor_unique_id,
        doctor_name: profile?.um_name,
        doctor_specialty: profile?.dp_name,
        doctor_mobile_number: profile?.um_contact,
        hm_id: clinic?.hm_id,
        clinic_name: clinic?.hm_name,
        source: "Patient Details",
      });
    }
    navigate('/voice-rx-consult', {
      state: { 
        patient_data: patient_data,
        isFromTabView: true
      },
    });
  }, [navigate, profile, patient_data]);

  // Handle Edit Prescription
  const handleEditRx = async () => {
    if (!viewCaseManagerData?.tcm_id) return;
    
    window.Moengage?.track_event('edit_rx_click', {
      doctor_id: profile?.doctor_unique_id,
      patient_id: patient_data?.patient_unique_id || 0,
      rx_date: viewCaseManagerData?.consultation_date,
    });

    if (isSnapRx && isSnapRxAccessableFromGB) {
      return navigate('/snap-rx', {
        state: {
          patient_data: patient_data,
          caseManagerData: viewCaseManagerData,
        },
      });
    }
    
    if (isSmartRxFile) {
      navigate('/smart-prescription', {
        state: {
          patient_data: patient_data,
          caseManagerData: viewCaseManagerData,
          smartRxFilesData: [],
        },
      });
      return;
    }
    
    // Set default voice service - prescription page will determine correct mode (ambient vs dictate) when loading
    window.TATVA_ACTIVE_VOICE_SERVICE = S_VOICE_RX;
    
    navigate('/prescription', {
      state: {
        patient_data: patient_data,
        send_path: 'patient_details',
        caseManagerData: viewCaseManagerData,
      },
    });
  };

  // Handle Download Prescription
  const handleDownloadRx = () => {
      if (cardiologyPrintHandlerRef.current?.downloadContent) {
        cardiologyPrintHandlerRef.current.downloadContent();
      } else {
      if (!viewCaseManagerData?.print_rx_url) return;
      try {
        if (!isChrome && !isSafari) {
          sendMessageToParent(EVENTS.DOWNLOAD, { url: viewCaseManagerData.print_rx_url });
        } else {
          const link = document.createElement('a');
          link.href = viewCaseManagerData.print_rx_url;
          link.download = `prescription_${moment(viewCaseManagerData.consultation_date).format('YYYY-MM-DD')}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        errorMessage('Failed to download prescription');
      }
    }
  };

  const handleCardiologyPrintHandlersReady = useCallback((handlers) => {
    cardiologyPrintHandlerRef.current = handlers;
  }, []);

  // Handle Print Prescription
  const handlePrintRx = () => {
      if (cardiologyPrintHandlerRef.current?.printContent) {
        cardiologyPrintHandlerRef.current.printContent();
      } else {
      if (!viewCaseManagerData?.print_rx_url) return;
      if (!isChrome && !isSafari) {
        sendMessageToParent(EVENTS.PRINT, { url: viewCaseManagerData.print_rx_url });
      } else {
        window.open(viewCaseManagerData.print_rx_url, '_blank');
      }
    }
  };

  // Handle Print Medicines Only
  const handlePrintMedicinesOnly = () => {
      if (cardiologyPrintHandlerRef.current?.printRxContent) {
        cardiologyPrintHandlerRef.current.printRxContent();
      } else {
      if (!viewCaseManagerData?.print_rx_url) return;
      if (!isChrome && !isSafari) {
        sendMessageToParent(EVENTS.PRINT, { url: viewCaseManagerData.print_rx_url });
      } else {
        window.open(viewCaseManagerData.print_rx_url, '_blank');
      }
    }
  };

  // Handle Repeat Rx
  const handleRepeatRx = () => {
    if (!viewCaseManagerData) return;

    window.Moengage?.track_event('repeat_rx_click', {
      doctor_id: profile?.doctor_unique_id,
      patient_id: patient_data?.patient_unique_id || 0,
      rx_date: viewCaseManagerData?.consultation_date,
    });

    navigate('/prescription', {
      state: {
        patient_data: patient_data,
        send_path: 'patient_details',
        caseManagerData: {
          ...viewCaseManagerData,
          tcm_id: 0,
          consultation_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
      },
    });
  };

  if (!patient_data) {
    return (
      <div className="mobile-patient-details">
        <DetailsHeader onBack={handleBack} title="Patient Details" />
        <div className="patient-content">
          <EmptyState message="Patient data not found" />
        </div>
      </div>
    );
  }

  const tabs = [
    {
      key: PATIENT_DETAILS_SIDEBAR_KEYS.VISIT_SUMMARY,
      label: 'Past Visits',
      icon: 'icon-Visit-Summary-Fill',
    },
    {
      key: PATIENT_DETAILS_SIDEBAR_KEYS.PATIENT_HISTORY,
      label: 'Patient History',
      icon: 'icon-Heart',
    },
    {
      key: PATIENT_DETAILS_SIDEBAR_KEYS.MEDICAL_CERTIFICATE,
      label: 'Certificate',
      icon: 'icon-Medical-Certificate',
    },
    {
      key: PATIENT_DETAILS_SIDEBAR_KEYS.MEDICAL_RECORDS,
      label: `Medical Records${allUploadedDocs?.length > 0 ? ` (${allUploadedDocs.length})` : ''}`,
      icon: 'icon-Report',
    },
    ...(isOpdBillingAccessable
      ? [
          {
            key: PATIENT_DETAILS_SIDEBAR_KEYS.BILL_PAYMENT,
            label: 'Add Bill',
            icon: 'icon-Visit-Summary-Fill',
          },
        ]
      : []),
  ];

  return (
    <div className="mobile-patient-details">
      {/* Header Wrapper with Background, Header, Profile Section and Tabs */}
      <div className="patient-header-wrapper">
        <DetailsHeader
          onBack={handleBack}
          title={showProfile ? null : patient_data?.pm_fullname || "Patient Details"}
          onEdit={handleOpenOptionsModal}
          profileSection={
            showProfile ? <PatientProfileSection patient_data={patient_data} /> : null
          }
          patient_data={patient_data}
          onVoiceRxClick={handleVoiceRxClick}
        />

        <PatientTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
          showProfile={showProfile}
        />
      </div>

      {/* Visit Date Selector - Outside mobile-patient-details, styled like DateBanner */}
      {selectedTab === PATIENT_DETAILS_SIDEBAR_KEYS.VISIT_SUMMARY && viewCaseManagerData && (
        <VisitDateSelector
          consultationDate={viewCaseManagerData?.consultation_date}
          onPrevious={nextPress}
          onNext={prevPress}
          hasPrevious={!!viewCaseManagerData?.next_tcm_id}
          hasNext={!!viewCaseManagerData?.prev_tcm_id}
        />
      )}

      <div className="patient-content" ref={scrollContainerRef}>
        {loading && (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        )}

        {selectedTab === PATIENT_DETAILS_SIDEBAR_KEYS.VISIT_SUMMARY && (
          <VisitSummaryTab
            patient_data={patient_data}
            viewCaseManagerData={viewCaseManagerData}
            loading={loading}
            tcmData={tcmData}
            nextPress={nextPress}
            prevPress={prevPress}
            isVaccinationAccessable={isVaccinationAccessable}
            isGrowthChartAccessable={isGrowthChartAccessable}
            userId={userId}
            onEditRx={handleEditRx}
            onDownloadRx={handleDownloadRx}
            onPrintRx={handlePrintRx}
            onRepeatRx={handleRepeatRx}
            onPrintMedicinesOnly={handlePrintMedicinesOnly}
            onCardiologyPrintHandlersReady={handleCardiologyPrintHandlersReady}
          />
        )}

        {selectedTab === PATIENT_DETAILS_SIDEBAR_KEYS.PATIENT_HISTORY && (
          <PatientHistoryTab
            patient_data={patient_data}
            viewCaseManagerData={viewCaseManagerData}
            loading={loading}
            tcmData={tcmData}
            isVaccinationAccessable={isVaccinationAccessable}
            isGrowthChartAccessable={isGrowthChartAccessable}
            userId={userId}
            onSectionClick={(sectionId) => {
              // Section click is handled internally by PatientHistoryTab accordion
              // This callback can be used for analytics or future navigation if needed
            }}
          />
        )}

        {selectedTab === PATIENT_DETAILS_SIDEBAR_KEYS.MEDICAL_CERTIFICATE && (
          <CertificateTab patient_data={patient_data} />
        )}

        {selectedTab === PATIENT_DETAILS_SIDEBAR_KEYS.MEDICAL_RECORDS && (
          <MedicalRecordsTab
            filesData={filesData}
            setUploadDocDrawer={setUploadDocDrawer}
            setFilesData={setFilesData}
            handleUploadDocPopup={handleUploadDocPopup}
            setIsEditDocument={setIsEditDocument}
            handleDrawerUploadDoc={handleDrawerUploadDoc}
          />
        )}

        {selectedTab === PATIENT_DETAILS_SIDEBAR_KEYS.BILL_PAYMENT && (
          <BillingTab patientData={patient_data} fromPath="patientDetails" />
        )}
      </div>

      {/* Upload Document Drawer */}
      {uploadDocDrawer && (
        <Drawer
          closeIcon={false}
          placement="right"
          bodyStyle={{ backgroundColor: 'white' }}
          onClose={handleDeletePopup}
          open={uploadDocDrawer}
          className="modalWidth-700"
          width="auto"
          push={false}
        >
          <UploadDocument
            onClose={handleDeletePopup}
            handleDrawerUploadDoc={handleDrawerUploadDoc}
            shouldShowDeletePopup={shouldShowDeletePopup}
            setShowDeletePopup={setShowDeletePopup}
            filesData={filesData}
            setFilesData={setFilesData}
            isEditDocument={isEditDocument}
            setIsEditDocument={setIsEditDocument}
            handleUploadDocPopup={handleUploadDocPopup}
          />
        </Drawer>
      )}

      {/* Upload Document Popup */}
      {shouldShowUploadDocPopup && (
        <UploadDocPopup
          shouldShowUploadDocPopup={shouldShowUploadDocPopup}
          onCancel={handleUploadDocPopup}
          setFilesData={setFilesData}
          filesData={filesData}
          setUploadDocDrawer={setUploadDocDrawer}
          setIsFileSizeError={setIsFileSizeError}
          setIsFileLimitError={setIsFileLimitError}
          setIsFileTypeError={setIsFileTypeError}
        />
      )}

      {/* File Error Modal */}
      {(isFileSizeError || isFileLimitError || isFileTypeError) && (
        <CommonModal
          isModalOpen={isFileSizeError || isFileLimitError || isFileTypeError}
          onCancel={handleRetryBtn}
          modalWidth={500}
          title={
            isFileSizeError
              ? 'Exceeded File Size'
              : isFileLimitError
              ? 'Exceeded File Upload Limit'
              : isFileTypeError
              ? 'File format not supported'
              : 'You may lose your data'
          }
          modalBody={
            <>
              <div className="alert-warning rounded-10px p-2 patient-details">
                <div className="d-flex align-items-center">
                  <img className="me-3" src={alertIcon} alt="Warning" />
                  <span>
                    {isFileSizeError ? (
                      <>
                        The file size exceeded{' '}
                        <span style={{ fontWeight: 700 }}>15MB.</span> Please
                        upload a file smaller than 15MB
                      </>
                    ) : isFileLimitError ? (
                      <>
                        You can only upload up to
                        <span style={{ fontWeight: 700 }}> 5 files.</span>{' '}
                        Please reduce the number of files and try again.
                      </>
                    ) : isFileTypeError ? (
                      <>
                        You can't upload
                        <span style={{ fontWeight: 700 }}>
                          {' '}
                          {isFileTypeError}
                        </span>{' '}
                        file. Only PDF, JPG, JPEG, and PNG formats are accepted.
                      </>
                    ) : (
                      'Are you sure you want to leave ?'
                    )}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={handleRetryBtn}
                  className="w-100 btn btn-primary3 btn-41 px-4"
                >
                  Retry
                </Button>
              </div>
            </>
          }
        />
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="loading-overlay">
          <Spin
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              zIndex: '9999',
            }}
            size="large"
          />
        </div>
      )}

      {/* Patient Details Options Modal */}
      <PatientDetailsOptionsModal
        visible={showOptionsModal}
        onClose={handleCloseOptionsModal}
        onStartWalkInClick={handleStartWalkInConsultation}
        onEditPatientClick={handleEditPatient}
        onBookAppointmentClick={handleBookAppointment}
      />
    </div>
  );
}

export default PatientDetails;
