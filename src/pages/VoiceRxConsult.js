import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Drawer } from "antd";
import GenRxKnowMore from "../components/GenRxKnowMore";
import ProfilePopover from "../common/ProfilePopover";
import tutorial from '../assets/images/tutorial.svg';
import checkIcon from "../assets/images/check.svg";
import closeIcon from "../assets/images/close.svg";
import voiceModeDictation from "../assets/images/voice-mode-dictation.svg";
import voiceMode2 from "../assets/images/voice-mode-2.svg";
import styles from "./VoiceRxConsult.module.scss";
import startConsultImg from "../assets/images/text-box.svg";
import { getClinic, getClinicName, getDeviceSdkData, getTokenData, isVoiceRxFree } from "../utils/utils";
import { useSelector } from "react-redux";
import { FAILED_VERIFICATION, FREE, S_VOICE_RX } from "../utils/constants";
import FreeTrialButton from "../pages/monetization/components/FreeTrialButton";
import ExpiredSubModal from "../pages/monetization/components/ExpiredSubModal";

const VoiceRxConsult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, userId, servicesList } = useSelector((state) => state.doctors);
  
  const { patient_data, isFromTabView } = location.state || {};
  
  const [popOverVideo, setPopOverVideo] = useState(false);
  const [isVoiceRxModalOpen, setIsVoiceRxModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [consentChecked, setConsentChecked] = useState(true);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

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
    window.Moengage.track_event("TP_voiceRx_FreeTrailInfo", {
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
  //Tutorial PopOver function
  const showHideVideoListPopover = () => {
    setPopOverVideo(!popOverVideo);
  };

  const handleBack = () => {
    // Go back to appointments list explicitly
    navigate('/', { replace: true });
  };

  const handleStartConsultation = () => {
    if (isVoiceRxCreditExpired) {
      showHideSubModal();
      return;
    }
    setIsVoiceRxModalOpen(true);
  };

  const handleModalClose = () => {
    setIsVoiceRxModalOpen(false);
    setShowWelcome(true);
  };

  const handleDictationMode = () => {
    
    window.Moengage.track_event("TP_AV_StartDictate", {
      patient_id: patient_data?.patient_unique_id || "",
      patient_name: patient_data?.pm_fullname || "",
      patient_mobile_number: patient_data?.pm_contact_no || "",
      doctor_id: profile?.doctor_unique_id,
      user_id: userId,
      doctor_name: profile?.um_name,
      doctor_specialty: profile?.dp_name,
      doctor_mobile_number: profile?.um_contact,
      hm_id: clinic?.hm_id,
      clinic_name: clinic?.hm_name,
    });
    // Navigate to voice recording page with dictation mode
    navigate('/voice-recording', {
      state: {
        patient_data,
        mode: 'dictation',
        isFromTabView: isFromTabView || false
      }
    });
    setIsVoiceRxModalOpen(false);
    setShowWelcome(false);
  };

  const handleAmbientMode = async () => {
    if (!consentChecked) {
      alert("Please confirm patient consent before proceeding");
      return;
    }
    window.Moengage.track_event("TP_AV_StartConversation", {
      patient_id: patient_data?.patient_unique_id || "",
      patient_name: patient_data?.pm_fullname || "",
      patient_mobile_number: patient_data?.pm_contact_no || "",
      doctor_id: profile?.doctor_unique_id,
      user_id: userId,
      doctor_name: profile?.um_name,
      doctor_specialty: profile?.dp_name,
      doctor_mobile_number: profile?.um_contact,
      hm_id: clinic?.hm_id,
      clinic_name: clinic?.hm_name,
    });
    // Navigate to voice recording page with ambient mode
    
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
      given: true
    };
    
    navigate('/voice-recording', {
      state: {
        patient_data,
        mode: 'ambient',
        isFromTabView: isFromTabView || false,
        consent: consentData
      }
    });
    setIsVoiceRxModalOpen(false);
    setShowWelcome(false);
  };



  return (
    <div className={styles.voiceRxConsultPage}>
      {/* Header */}
          <div className={styles.header}>
        <div className={styles.leftSection}>
          <div className={styles.backButtonContainer}>
            <div
              onClick={handleBack}
              className="btn-headerback align-items-center d-flex h-100 justify-content-center cursor-pointer"
            >
              <i className="icon-right"></i>
            </div>
          </div>
          <ProfilePopover 
            locationPath="/voice-rx-consult"
            patient_data={patient_data}
            isPrescriptionPage={true}
          />
        </div>
        
        <div className={styles.rightSection}>
          {!isFreeVoiceRxUser && (
            <FreeTrialButton
              title={S_VOICE_RX}
              showHideSubModal={showHideSubModal}
            />
          )}
          <button className={styles.tutorialButton} onClick={showHideVideoListPopover}>
              <span className={styles.tutorialButtonContent}>
                <img height={42} src={tutorial} alt="Tutorial" />
                Tutorial
              </span>
            </button>
        </div>
      </div>

      {/* Main Content Area - Welcome UI shown when modal is dismissed */}
      <div className={styles.mainContent}>
        {showWelcome && (
          <>
            <div className={styles.welcomeSection}>
              <div className={styles.greeting}>
                <span className={styles.greetingText}>Hi, Doctor</span>
                <span className={styles.greetingEmoji}>&nbsp;👋</span>
              </div>
              <div className={styles.title}>Start Your Consultation!</div>
              <div className={styles.description}>
                Simply by <strong>dictating the Rx</strong> or by <strong>capturing your conversation with the
                patient</strong>. I'll transcribe & structure the <strong>Rx automatically!</strong>
              </div>
            </div>
            <div className={styles.inputSection}>
              <div className={styles.inputContainer}>
                <img
                  src={startConsultImg}
                  alt="Start Consultation"
                  style={{
                    cursor: isVoiceRxCreditExpired ? 'not-allowed' : 'pointer',
                    opacity: isVoiceRxCreditExpired ? 0.6 : 1
                  }}
                  onClick={handleStartConsultation}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Voice Rx Mode Selection Modal */}
      <Modal
        open={isVoiceRxModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={775}
        centered
        className={styles.voiceRxModal}
        title={<span className={styles.modalTitleText}>Choose the Voice Rx mode</span>}
        closeIcon={<img src={closeIcon} alt="Close" className={styles.closeIconImg} />}
      >
        <div className={styles.modalContent}>
          <div className={styles.modeCards}>
            {/* Dictation Mode Card */}
            <div className={styles.modeCard}>
              <div className={styles.cardIcon}>
                <div className={styles.iconBackground}>
                  <img src={voiceModeDictation} alt="Dictation icon" width={72} height={72} />
                </div>
              </div>
              <h3 className={styles.cardTitle}>Dictation Mode</h3>
              <p className={styles.cardDescription}>
                Dictate your prescription or Clinical notes directly here. I'll transcribe & structur it into the Rx Pad automatically!
              </p>
              <button className={styles.modeButton} onClick={handleDictationMode}>
                  <i className="icon-mic"></i>
                Start Dictation
              </button>
            </div>

            {/* Ambient Mode Card */}
            <div className={styles.modeCard}>
              <div className={styles.cardIcon}>
                <div className={styles.iconBackground}>
                  <img src={voiceMode2} alt="Ambient icon" width={72} height={72} />
                </div>
              </div>
              <h3 className={styles.cardTitle}>Ambient Mode</h3>
              <p className={styles.cardDescription}>
                Capture your <strong>live conversation</strong> with the patient. I'll listen in the background and <strong>transcribe & structure</strong> it into the <strong>Rx Pad</strong> automatically!
              </p>
              <div className={styles.consentContainer}>
                <div className={styles.consentCheckbox}>
                  <span
                    className={`${styles.checkBox} ${consentChecked ? styles.checked : ''}`}
                    onClick={() => {
                      setConsentChecked(!consentChecked);
                       window.Moengage.track_event("TP_AV_StartDictate", {
                         patient_id: patient_data?.patient_unique_id || "",
                         patient_name: patient_data?.pm_fullname || "",
                         patient_mobile_number:
                           patient_data?.pm_contact_no || "",
                         doctor_id: profile?.doctor_unique_id,
                         user_id: userId,
                         doctor_name: profile?.um_name,
                         doctor_specialty: profile?.dp_name,
                         doctor_mobile_number: profile?.um_contact,
                         hm_id: clinic?.hm_id,
                         clinic_name: clinic?.hm_name,
                         status: consentChecked ? "enabled" : "disabled",
                       });
                    }}
                    role="checkbox"
                    aria-checked={consentChecked}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setConsentChecked(!consentChecked); }}
                  >
                    {consentChecked && (
                      <img src={checkIcon} alt="Checked" width={18} height={18} />
                    )}
                  </span>
                  <span className={styles.consentText} onClick={() => setConsentChecked(!consentChecked)}>
                    <span className={styles.confirmText}>I confirm</span> that I've taken the <strong>patient's consent</strong> before recording.
                  </span>
                </div>
              </div>
              <button 
                className={styles.modeButton} 
                onClick={handleAmbientMode}
                disabled={!consentChecked}
              >
                  <i className="icon-mic"></i>
                Start Conversation
              </button>
            </div>
          </div>
          <div className={styles.disclaimerText}>*These conversations help us improve accuracy and your overall experience.</div>
        </div>
      </Modal>

      {!isFreeVoiceRxUser && (
        <ExpiredSubModal
          title={S_VOICE_RX}
          styles={{
            mask: {
              marginLeft: 0,
              marginTop: 60,
              background: "rgba(0, 0, 0, 0.28)",
              backdropFilter: "blur(2px)",
            },
            wrapper: {
              marginLeft: 0,
              marginTop: 60,
              background: "rgba(0, 0, 0, 0.28)",
            },
          }}
          isSubModalOpen={isSubModalOpen}
          showHideSubModal={showHideSubModal}
        />
      )}

      {/* Tutorial Drawer on right side */}
      <Drawer
        placement="right"
        width={window.innerWidth ? Math.min(window.innerWidth * 0.8, 1200) : 1200}
        closeIcon={null}
        destroyOnClose
        maskClosable
        open={popOverVideo}
        onClose={showHideVideoListPopover}
        bodyStyle={{ padding: 0, height: '100%', overflow: 'hidden' }}
      >
        <div style={{ height: '100%', overflow: 'hidden' }}>
          <GenRxKnowMore handleGenRxKnowMore={showHideVideoListPopover} />
        </div>
      </Drawer>
  </div>
);
};

export default VoiceRxConsult;
