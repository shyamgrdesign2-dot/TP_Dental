import React, { useState } from "react";
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

const VoiceRxConsult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { patient_data, isFromTabView } = location.state || {};
  
  const [popOverVideo, setPopOverVideo] = useState(false);
  const [isVoiceRxModalOpen, setIsVoiceRxModalOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [consentChecked, setConsentChecked] = useState(true);

  //Tutorial PopOver function
  const showHideVideoListPopover = () => {
    setPopOverVideo(!popOverVideo);
  };

  const handleBack = () => {
    // Go back to appointments list explicitly
    navigate('/', { replace: true });
  };

  const handleModalClose = () => {
    setIsVoiceRxModalOpen(false);
    setShowWelcome(true);
  };

  const handleDictationMode = () => {
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

  const handleAmbientMode = () => {
    if (!consentChecked) {
      alert("Please confirm patient consent before proceeding");
      return;
    }
    // Navigate to voice recording page with ambient mode
    navigate('/voice-recording', {
      state: {
        patient_data,
        mode: 'ambient',
        isFromTabView: isFromTabView || false
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
                patient</strong>. I'll transcribe & structure the <strong>Rx automagically!</strong>
              </div>
            </div>
            <div className={styles.inputSection}>
              <div className={styles.inputContainer}>
                <img
                  src={startConsultImg}
                  alt="Start Consultation"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsVoiceRxModalOpen(true)}
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
                Capture your <strong>live conversation</strong> with the patient. I'll listen in the background and <strong>transcribe & structure</strong> it into the <strong>Rx Pad</strong> automagically!
              </p>
              <div className={styles.consentContainer}>
                <div className={styles.consentCheckbox}>
                  <span
                    className={`${styles.checkBox} ${consentChecked ? styles.checked : ''}`}
                    onClick={() => setConsentChecked(!consentChecked)}
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
        </div>
      </Modal>

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
