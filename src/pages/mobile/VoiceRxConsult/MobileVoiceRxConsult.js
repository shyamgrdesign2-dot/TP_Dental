import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer } from 'antd';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { getClinic, getClinicName, getDeviceSdkData, getTokenData, isVoiceRxFree } from '../../../utils/utils';
import { FAILED_VERIFICATION, FREE, S_VOICE_RX } from '../../../utils/constants';
import ExpiredSubModal from '../../monetization/components/ExpiredSubModal';
import arrowLeftIcon from '../../../assets/mobile/arrow-left.svg';
import userGrayIcon from '../../../assets/mobile/user_gray.svg';
import imageBackground from '../../../assets/mobile/Image Background.svg';
import ddxIcon from '../../../assets/mobile/ddx.svg';
import startVoiceIcon from '../../../assets/mobile/start_voice.svg';
import checkIcon from '../../../assets/images/check.svg';
import closeIcon from '../../../assets/images/close.svg';
import voiceModeDictation from '../../../assets/images/voice-mode-dictation.svg';
import voiceMode2 from '../../../assets/images/voice-mode-2.svg';
import './MobileVoiceRxConsult.scss';

function MobileVoiceRxConsult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, userId, servicesList } = useSelector((state) => state.doctors);
  
  const { patient_data, isFromTabView } = location.state || {};
  
  const [isModeDrawerOpen, setIsModeDrawerOpen] = useState(false);
  const [consentChecked, setConsentChecked] = useState(true);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [showPatientSummary, setShowPatientSummary] = useState(false);

  const VOICE_RX_planDetails = servicesList?.find(
    (service) => service.service_name === S_VOICE_RX
  );
  const isFreeVoiceRxUser = isVoiceRxFree();
  const tokenData = getTokenData();
  const clinic = getClinic(profile?.hospital_data);

  const isVoiceRxCreditExpired =
    !isFreeVoiceRxUser &&
    (VOICE_RX_planDetails?.plan_tier === FAILED_VERIFICATION ||
      (VOICE_RX_planDetails?.plan_tier === FREE &&
        VOICE_RX_planDetails?.credit_balance <= 0));

  useEffect(() => {
    if (
      VOICE_RX_planDetails !== undefined &&
      (VOICE_RX_planDetails?.plan_tier === FREE ||
        VOICE_RX_planDetails?.plan_tier === FAILED_VERIFICATION)
    ) {
      const timer = setTimeout(() => {
        setIsSubModalOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [VOICE_RX_planDetails]);

  const showHideSubModal = useCallback(() => {
    setIsSubModalOpen((prev) => !prev);
    const clinic_name = getClinicName(profile?.hospital_data);
    const deviceSdkData = getDeviceSdkData();
    window.Moengage.track_event('TP_voiceRx_FreeTrailInfo', {
      doctor_name: profile?.um_name,
      doctor_number: profile?.um_contact,
      doctor_unique_id: profile?.doctor_unique_id,
      doctor_specialty: profile?.dp_name,
      clinic_id: tokenData?.clinic_id,
      um_id: tokenData?.user_id,
      clinic_Name: clinic_name,
      ...deviceSdkData,
    });
  }, [profile, tokenData]);

  const handleBack = () => {
    if (isFromTabView) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleStartConsultation = () => {
    if (isVoiceRxCreditExpired) {
      showHideSubModal();
      return;
    }
    setIsModeDrawerOpen(true);
  };

  const handleCloseModeDrawer = () => {
    setIsModeDrawerOpen(false);
  };

  const handleDictationMode = () => {
    window.Moengage.track_event('TP_AV_StartDictate', {
      patient_id: patient_data?.patient_unique_id || '',
      patient_name: patient_data?.pm_fullname || '',
      patient_mobile_number: patient_data?.pm_contact_no || '',
      doctor_id: profile?.doctor_unique_id,
      user_id: userId,
      doctor_name: profile?.um_name,
      doctor_specialty: profile?.dp_name,
      doctor_mobile_number: profile?.um_contact,
      hm_id: clinic?.hm_id,
      clinic_name: clinic?.hm_name,
    });
    navigate('/voice-recording', {
      state: {
        patient_data,
        mode: 'dictation',
        isFromTabView: isFromTabView || false,
      },
    });
    setIsModeDrawerOpen(false);
  };

  const handleAmbientMode = async () => {
    if (!consentChecked) {
      alert('Please confirm patient consent before proceeding');
      return;
    }
    window.Moengage.track_event('TP_AV_StartConversation', {
      patient_id: patient_data?.patient_unique_id || '',
      patient_name: patient_data?.pm_fullname || '',
      patient_mobile_number: patient_data?.pm_contact_no || '',
      doctor_id: profile?.doctor_unique_id,
      user_id: userId,
      doctor_name: profile?.um_name,
      doctor_specialty: profile?.dp_name,
      doctor_mobile_number: profile?.um_contact,
      hm_id: clinic?.hm_id,
      clinic_name: clinic?.hm_name,
    });

    let userIp = '';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      userIp = ipData.ip || '';
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }

    const consentData = {
      timestamp: Date.now(),
      ip: userIp,
      given: true,
    };

    navigate('/voice-recording', {
      state: {
        patient_data,
        mode: 'ambient',
        isFromTabView: isFromTabView || false,
        consent: consentData,
      },
    });
    setIsModeDrawerOpen(false);
  };

  const togglePatientSummary = () => {
    setShowPatientSummary(!showPatientSummary);
  };

  const getPatientAge = () => {
    if (!patient_data) return '';
    const parts = [];
    if (patient_data?.ageYears) parts.push(`${patient_data.ageYears}y`);
    return parts.join(' ');
  };

  const getPatientGender = () => {
    if (!patient_data?.pm_gender) return '';
    const gender = patient_data.pm_gender.toLowerCase();
    if (gender === 'm' || gender === 'male') return 'M';
    if (gender === 'f' || gender === 'female') return 'F';
    return patient_data.pm_gender;
  };

  return (
    <div className="mobile-voice-rx-consult">
      <div className="mobile-voice-rx-header">
        <button className="back-button" onClick={handleBack} type="button">
          <img src={arrowLeftIcon} alt="Back" />
        </button>
        <h1 className="header-title">Consultation</h1>
      </div>

      <div className="mobile-voice-rx-content">
        {patient_data && (
          <div className="patient-info-badge">
            <img src={userGrayIcon} alt="User" className="user-icon" />
            <div className="patient-info-text">
              <span className="patient-name">
                {patient_data?.pm_fullname || 'Patient'}
              </span>
              <span className="patient-details">
                ({getPatientGender()}, {getPatientAge()})
              </span>
            </div>
          </div>
        )}

        <div className="welcome-message-card">
          <div className="ai-icon-wrapper">
            {/* <i className="icon-ddx" /> */}
            <img src={imageBackground} alt="AI" className="ai-icon" />
          </div>
          <p className="welcome-text">
            Hi Doctor! Start your consultation by <strong>dictating the Rx</strong> or{' '}
            <strong>by capturing your conversation with the patient</strong>. I'll{' '}
            <strong>transcribe</strong> & <strong>structure</strong> it into the{' '}
            <strong>Rx Pad</strong> automatically!
          </p>
        </div>

        <div className="patient-summary-card">
          <div className="summary-header">
            <div className="summary-title-section">
              <img src={ddxIcon} alt="DDx" className="summary-icon" />
              <p className="summary-title">Patient's Summary</p>
            </div>
          </div>
          <div className="summary-divider" />
          <div className={`summary-content ${showPatientSummary ? 'expanded' : ''}`}>
            <p className="summary-text">
              <strong>26-year-old male with diabetes and hypertension</strong>, presented
              for follow-up. Known case of diabetes and hypertension for <strong>2 years</strong>,
              on regular medication. <strong>Last visit (24/12/2025)</strong> summary noted{' '}
              <strong>viral fever with mild dehydration</strong>; the patient was prescribed{' '}
              <strong>Paracetamol 650 mg</strong> SOS
            </p>
          </div>
          <button className="view-summary-button" onClick={togglePatientSummary} type="button">
            <span>View Detailed Summary</span>
            <i className={`icon-right ${showPatientSummary ? 'rotated' : ''}`} />
          </button>
        </div>
      </div>

      <div className="mobile-voice-rx-footer">
        <button
          className="start-consultation-button"
          onClick={handleStartConsultation}
          type="button"
          disabled={isVoiceRxCreditExpired}
          style={{
            opacity: isVoiceRxCreditExpired ? 0.6 : 1,
            cursor: isVoiceRxCreditExpired ? 'not-allowed' : 'pointer',
          }}
        >
          <img src={startVoiceIcon} alt="Start Voice" className="start-voice-icon" />
          <span>Start Consultation</span>
        </button>
        <div className="home-indicator" />
      </div>

      <Drawer
        placement="bottom"
        open={isModeDrawerOpen}
        onClose={handleCloseModeDrawer}
        closable={false}
        height="auto"
        className="mode-selection-drawer"
      >
        <div className="mode-drawer-content">
          <div className="drawer-header">
            <h3 className="drawer-title">Choose the Voice Rx mode</h3>
            <button className="drawer-close-button" onClick={handleCloseModeDrawer} type="button">
              <img src={closeIcon} alt="Close" />
            </button>
          </div>

          <div className="mode-cards">
            <div className="mode-card">
              <div className="mode-card-content">
                <div className="mode-icon">
                  <img src={voiceModeDictation} alt="Dictation" width={60} height={60} />
                </div>
                <div className="mode-text-content">
                  <h4 className="mode-title">Dictation Mode</h4>
                  <p className="mode-description">
                    Dictate your prescription or Clinical notes directly here.
                  </p>
                </div>
              </div>
              <div className="mode-divider" />
              <button className="mode-button" onClick={handleDictationMode} type="button">
                Start Dictation
              </button>
            </div>

            <div className="mode-or-separator">(or)</div>

            <div className="mode-card">
              <div className="mode-card-content">
                <div className="mode-icon">
                  <img src={voiceMode2} alt="Ambient" width={60} height={60} />
                </div>
                <div className="mode-text-content">
                  <h4 className="mode-title">Ambient Mode</h4>
                  <p className="mode-description">
                    Capture your <strong>live conversation</strong> with the patient. I'll listen in
                    the background.
                  </p>
                </div>
              </div>
              <div className="mode-divider" />
              <div className="consent-container">
                <div className="consent-checkbox">
                  <span
                    className={`checkbox ${consentChecked ? 'checked' : ''}`}
                    onClick={() => {
                      setConsentChecked(!consentChecked);
                      window.Moengage.track_event('TP_AV_StartDictate', {
                        patient_id: patient_data?.patient_unique_id || '',
                        patient_name: patient_data?.pm_fullname || '',
                        patient_mobile_number: patient_data?.pm_contact_no || '',
                        doctor_id: profile?.doctor_unique_id,
                        user_id: userId,
                        doctor_name: profile?.um_name,
                        doctor_specialty: profile?.dp_name,
                        doctor_mobile_number: profile?.um_contact,
                        hm_id: clinic?.hm_id,
                        clinic_name: clinic?.hm_name,
                        status: consentChecked ? 'enabled' : 'disabled',
                      });
                    }}
                    role="checkbox"
                    aria-checked={consentChecked}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setConsentChecked(!consentChecked);
                      }
                    }}
                  >
                    {consentChecked && <img src={checkIcon} alt="Checked" width={18} height={18} />}
                  </span>
                  <span className="consent-text" onClick={() => setConsentChecked(!consentChecked)}>
                    I confirm that I've taken the <strong>patient's consent</strong> before recording.
                  </span>
                </div>
              </div>
              <button
                className="mode-button"
                onClick={handleAmbientMode}
                disabled={!consentChecked}
                type="button"
              >
                Start Conversation
              </button>
            </div>
          </div>
          <div className="drawer-home-indicator" />
        </div>
      </Drawer>

      {!isFreeVoiceRxUser && (
        <ExpiredSubModal
          title={S_VOICE_RX}
          styles={{
            mask: {
              marginLeft: 0,
              marginTop: 0,
              background: 'rgba(0, 0, 0, 0.28)',
              backdropFilter: 'blur(2px)',
            },
            wrapper: {
              marginLeft: 0,
              marginTop: 0,
              background: 'rgba(0, 0, 0, 0.28)',
            },
          }}
          isSubModalOpen={isSubModalOpen}
          showHideSubModal={showHideSubModal}
        />
      )}
    </div>
  );
}

export default MobileVoiceRxConsult;

