import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer, message } from 'antd';
import ProfilePopover from '../common/ProfilePopover';
import GenRxKnowMore from '../components/GenRxKnowMore';
import tutorial from '../assets/images/tutorial.svg';
import VoiceWaveVisualizer from '../components/WaveVisualizer';
import vitalsIcons from '../assets/images/vitals-icons.svg';
import stopIcon from '../assets/images/stop-icon.svg';
import muteIcon from '../assets/images/microphone-2.svg';
import mutedMicrophoneIcon from '../assets/images/muted-microphone-icon.svg';
import dictateActiveIcon from '../assets/images/dictate-active.svg';
import ambientActiveIcon from '../assets/images/ambient-mode-active.svg';
import styles from './VoiceRecordingPage.module.scss';
import { getClinic, getSupportedMimeType } from '../utils/utils';
import { S_AMBIENT_VOICE_RX, S_VOICE_RX } from '../utils/constants';
import CommonModal from '../common/CommonModal';
import alertIcon from '../assets/images/alertIcon.svg';
import { useSelector } from 'react-redux';

const VoiceRecordingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, userId } = useSelector(
    (state) => state.doctors
  );

  const [popOverVideo, setPopOverVideo] = useState(false);
  const [selectedMode, setSelectedMode] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showQuitRecordingModal, setShowQuitRecordingModal] = useState(false);

  const patient_data = location.state?.patient_data || {};
  const mode = location.state?.mode || '';
  const isFromTabView = location.state?.isFromTabView || false;
  const consent = location.state?.consent || null;

  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const hasAutoStartedRef = useRef(false);

  const cleanupRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.error('Error stopping recorder:', err);
      }
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }

    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
  }, []);

  useEffect(() => {
    if (mode) {
      setSelectedMode(mode);
    }
  }, [mode]);

  useEffect(() => {
    if (isRecording && !isPaused) {
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording, isPaused]);

  const showHideVideoListPopover = () => {
    setPopOverVideo(!popOverVideo);
  };

  const handleBack = () => {
    console.log('Back button clicked - navigating to Voice Rx Consult page');
    console.log('Patient data:', patient_data);
    // Always navigate to Voice Rx Consult page
    navigate('/voice-rx-consult', { 
      state: { patient_data }
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartRecording = async () => {
    setRecordingTime(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const mimeType = getSupportedMimeType();
      mediaRecorderRef.current = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const recorder = mediaRecorderRef.current;
        const mimeType = recorder?.mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        console.log("Recording blob:", blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      message.error("Unable to access microphone");
    }
  };

  const handleCancelRecordingClick = () => {
    cleanupRecording();
    setShowQuitRecordingModal(true);
  };

  const handleQuitRecording = () => {
    setShowQuitRecordingModal(false);
    navigate('/voice-rx-consult', {
      state: { patient_data },
    });
  };

  const handleStayRecording = () => {
    setShowQuitRecordingModal(false);
    setTimeout(() => {
      hasAutoStartedRef.current = true;
      handleStartRecording();
    }, 200);
  };

  const handlePauseResume = () => {
    if (isPaused) {
      mediaRecorderRef.current?.resume();
      setIsPaused(false);
    } else {
      mediaRecorderRef.current?.pause();
      setIsPaused(true);
    }
  };

  const handleSend = async () => {
    try {
      const clinic = getClinic(profile?.hospital_data);
      window.Moengage.track_event("TP_AV_Submit", {
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
        mode: selectedMode || mode,
      });
      // Stop recording and ensure chunks are finalized
      let blob;
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        blob = await new Promise((resolve) => {
          const finalize = () => {
            const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
            const createdBlob = new Blob(audioChunksRef.current, { type: mimeType });
            resolve(createdBlob);
          };
          const originalOnStop = mediaRecorderRef.current.onstop;
          mediaRecorderRef.current.onstop = () => {
            if (typeof originalOnStop === 'function') originalOnStop();
            finalize();
          };
          mediaRecorderRef.current.stop();
        });
      } else {
        const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
        blob = new Blob(audioChunksRef.current, { type: mimeType });
      }

      // Stop audio stream
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsRecording(false);
      setIsPaused(false);
      setRecordingTime(0);

      if (!blob || blob.size === 0) {
        message.error('No audio captured. Please try again.');
        return;
      }

      // Determine mode and set active service
      const activeMode = selectedMode || mode || 'dictation';
      const activeService = activeMode === 'ambient' ? S_AMBIENT_VOICE_RX : S_VOICE_RX;
      window.TATVA_ACTIVE_VOICE_SERVICE = activeService;

      // Prepare additional helpers (optional)
      const audioUrl = URL.createObjectURL(blob);
      const arrayBuffer = await blob.arrayBuffer();

      // Navigate to prescription page with recording data
        navigate('/prescription', {
          state: {
            patient_data,
            fromVoiceRecording: true,
            audioBlob: blob,
            audioBlobUrl: audioUrl,
            consent: consent,
            audioBlobArrayBuffer: arrayBuffer,
            mode: activeMode
          }
        });
    } catch (err) {
      console.error('Error sending recording:', err);
      message.error('Failed to send recording');
    }
  };

  // Auto-start recording when mode is selected
  useEffect(() => {
    if (mode && !hasAutoStartedRef.current) {
      hasAutoStartedRef.current = true;
      // Small delay to ensure component is mounted
      setTimeout(() => {
        handleStartRecording();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <div className={styles.voiceRecordingPage}>
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
            locationPath="/voice-recording"
            patient_data={patient_data}
            isPrescriptionPage={true}
          />
          {/* Active Mode Indicator */}
          <div className={styles.modeIndicator}>
            {selectedMode === 'dictation' ? (
              <>
                <img src={dictateActiveIcon} alt="Dictate mode" className={styles.modeIcon} />
                <span className={styles.modeText}>Dictate Mode</span>
              </>
            ) : (
              <>
                <img src={ambientActiveIcon} alt="Ambient mode" className={styles.modeIcon} />
                <span className={styles.modeText}>Ambient Mode</span>
              </>
            )}
          </div>
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

      {/* Left Side Section */}
      <div className={styles.leftSideSection}>
        {/* Content for left side section */}
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.welcomeSection}>
          <div className={styles.greeting}>
            <span className={styles.greetingText}>Hi, Doctor</span> 👋
          </div>
          <div className={styles.title}>
            Start Your Consultation!
          </div>
          <div className={styles.description}>
            Simply by <strong>dictating the Rx</strong> or by <strong>capturing your conversation with the patient</strong>. I'll transcribe & structure the <strong>Rx automatically!</strong>
          </div>
        </div>

      </div>

      {/* Bottom Center Recorder */}
      {isRecording && (
      <div className={styles.bottomCenterBar}>
        <div className={styles.recBar}>
          {/* Delete Button */}
          <button className={styles.deleteButton} onClick={handleCancelRecordingClick}>
            <img src={stopIcon} alt="stop" className={styles.stopIcon} />
          </button>
          
          {/* Pause/Resume Button */}
          <button 
            className={styles.pauseButton} 
            onClick={handlePauseResume}
            data-muted={isPaused}
          >
            {isPaused ? (
              <img src={mutedMicrophoneIcon} alt="muted" className={styles.muteIcon} />
            ) : (
              <img src={muteIcon} alt="unmuted" className={styles.muteIcon} />
            )}
          </button>
          
          {/* Duration */}
          <div className={styles.timeLabel}>{formatTime(recordingTime)}</div>
          
          {/* Wave Visualizer */}
          <div className={styles.waveArea}>
            <VoiceWaveVisualizer isRecording={isRecording} isPaused={isPaused} />
          </div>
          
          {/* Submit Button */}
          <button className={styles.sendCta} onClick={handleSend}>
            <img src={vitalsIcons} alt="Submit" className={styles.vitalsIcon} />
          </button>
        </div>
        
        {/* Listening Indicator with Gradient Ellipse */}
        <div className={styles.listeningSection}>
          <div className={styles.gradientEllipse}></div>
          <div className={styles.listeningText}>
            {isPaused ? "Unmute to Continue Recording" : "I'm Listening..."}
          </div>
        </div>
      </div>
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

      <CommonModal
        isModalOpen={showQuitRecordingModal}
        onCancel={handleStayRecording}
        modalWidth={480}
        title={'Are you sure you want to quit?'}
        modalBody={
          <>
            <div className="alert-warning rounded-10px p-3 d-flex align-items-center mb-4">
              <img src={alertIcon} alt="Warning" className="me-3" />
              <span>
                If you quit, all progress in this session will be lost and you'll need to start over.
              </span>
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <button
                type="button"
                className={`btn btn-link text-decoration-underline ms-4 ${styles.quitButton}`}
                onClick={handleQuitRecording}
              >
                Yes, Quit
              </button>
              <button
                type="button"
                className={`btn btn-primary3 btn-41 px-4 ${styles.stayButton}`}
                onClick={handleStayRecording}
              >
                No, Stay
              </button>
            </div>
          </>
        }
      />
    </div>
  );
};

export default VoiceRecordingPage;

