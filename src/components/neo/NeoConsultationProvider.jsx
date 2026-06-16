import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useNeoSapein from "../../hooks/useNeoSapein";
import { getTokenData } from "../../utils/utils";
import {
  formatEncounterConsultationText,
  getNeoVoiceSessionId,
  isNeoDeviceConnected,
  NEO_WS_PHASE,
} from "../../utils/neoConsultationUtils";
import config from "../../config";
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from "../../utils/constants";
import NeoPairingModal from "./NeoPairingModal";
import NeoReadyToast from "./NeoReadyToast";

const isNeoEnabled = () =>
  process.env.REACT_APP_NEO_ENABLED === "true" ||
  process.env.REACT_APP_NEO_USE_LOCAL_PROXY === "true";

const readAuthToken = () => {
  try {
    return localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN) || "";
  } catch {
    return "";
  }
};

const NeoConsultationContext = createContext(null);

export const useNeoConsultationContext = () => useContext(NeoConsultationContext);

function NeoConsultationProvider({ children, forceEnabled = false, encounterType }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentsData } = useSelector((state) => state.records);
  const [readyToastOpen, setReadyToastOpen] = useState(false);
  const [readyToastDesc, setReadyToastDesc] = useState(
    "Your transcription is processed. Review clinical notes and copy to Rx."
  );

  // Memoize all primitives passed to useNeoSapein so their identity is
  // stable across re-renders — prevents cascading useCallback invalidations
  // that cause the WebSocket to tear down and reconnect on every render.
  const tokenDataRef = useRef(null);
  if (!tokenDataRef.current) tokenDataRef.current = getTokenData();
  const tokenData = tokenDataRef.current;

  const umId = useMemo(
    () => String(tokenData?.user_id || tokenData?.clinic_id || ""),
    [tokenData]
  );
  const voiceSessionId = useMemo(() => getNeoVoiceSessionId(), []);
  const authToken = useMemo(() => readAuthToken(), []);
  const portalBaseUrl = useMemo(() => config?.snap_rx_api_url || "", []);

  const [isPairingOpen, setIsPairingOpen] = useState(false);

  const handleApplyToPatient = useCallback(
    (patientRecord, encounter, extras = {}) => {
      const copiedText =
        extras?.copiedText || formatEncounterConsultationText(encounter);
      // extras.caseManagerData is pre-mapped by NeoConsultationPanel so the
      // prescription page can hydrate symptoms, diagnosis, vitals, etc. via its
      // existing caseManagerData useEffect.
      navigate("/prescription", {
        state: {
          patient_data: patientRecord,
          caseManagerData: extras?.caseManagerData || null,
          neoConsultation: {
            encounter,
            copiedText,
            digitizeData: encounter,
          },
        },
      });
    },
    [navigate]
  );

  const neoActive = forceEnabled || isNeoEnabled();

  const neo = useNeoSapein({
    enabled: neoActive,
    umId,
    voiceSessionId,
    authToken,
    portalBaseUrl,
    encounterType: encounterType || (forceEnabled ? "ipd" : "opd"),
  });

  const {
    phase,
    isSpeaking,
    isConnected,
    deviceAddress,
    deviceStatus,
    errorMessage,
    rms,
    consultationResult,
    setConsultationResult,
    setIsModalOpen,
    pairedDevice,
    isScanning,
    scanResults,
    isPairing,
    pairingError,
    scanForDevices,
    forgetDevice,
    connectDevice,
    disconnectBleOnly,
    isRecording,
    isTranscribingChunk,
    recordingStartedAt,
    recordingTranscript,
    recordingConversation,
    todayCapturedExtraSeconds,
    clearTodayCapturedExtra,
    deviceTelemetry,
    batteryPct,
    isCharging,
    startRecording,
    stopRecording,
  } = neo;

  // Clear consultation explicitly — hides the inline panel and frees state.
  const dismissConsultation = useCallback(() => {
    setConsultationResult(null);
    setIsModalOpen(false);
  }, [setConsultationResult, setIsModalOpen]);

  // Track which recordId has already been shown so we don't re-fire the
  // notification on every render or when the user navigates around.
  const notifiedRecordIdRef = useRef(null);

  useEffect(() => {
    if (!consultationResult) return;
    const recordKey =
      consultationResult.recordId || consultationResult.processedAt;
    if (notifiedRecordIdRef.current === recordKey) return;
    notifiedRecordIdRef.current = recordKey;

    // If the doctor is already on the Neo Consult page, the panel is in
    // view — no popup needed. Otherwise raise the branded ready toast.
    if (location.pathname === "/neo-consult") return;

    const encounters = consultationResult.patientEncounters || [];
    const detected = encounters
      .map((e) => e?.patientDetails?.name || e?.patientLabel || "")
      .filter(Boolean)
      .slice(0, 2)
      .join(", ");

    setReadyToastDesc(
      encounters.length
        ? `${encounters.length} patient ${
            encounters.length === 1 ? "encounter" : "encounters"
          } detected${detected ? ` · ${detected}` : ""}. Open Neo Consult to review and copy to Rx.`
        : "Your transcription is processed. Review clinical notes and copy to Rx."
    );
    setReadyToastOpen(true);
  }, [consultationResult, location.pathname]);

  const handleToastOpen = useCallback(() => {
    setReadyToastOpen(false);
    navigate("/neo-consult");
  }, [navigate]);

  const handleToastDismiss = useCallback(() => {
    setReadyToastOpen(false);
  }, []);

  // Auto-close the toast the moment the doctor lands on /neo-consult.
  useEffect(() => {
    if (location.pathname === "/neo-consult" && readyToastOpen) {
      setReadyToastOpen(false);
    }
  }, [location.pathname, readyToastOpen]);

  const liveConnected =
    isConnected ||
    isNeoDeviceConnected(phase) ||
    phase === NEO_WS_PHASE.PAIRED;

  const handleOpenPairing = useCallback(() => {
    setIsPairingOpen(true);
    if (!isScanning) {
      scanForDevices();
    }
  }, [isScanning, scanForDevices]);

  const handleClosePairing = useCallback(() => {
    if (isPairing) return;
    setIsPairingOpen(false);
  }, [isPairing]);

  // Modal toggle: BLE link only.
  // - ON  : pair if not paired, otherwise reconnect to the saved address.
  // - OFF : drop the BLE link (any active recording is abandoned).
  const handleToggleDevice = useCallback(
    (device, nextOn) => {
      if (nextOn) {
        connectDevice(device);
      } else {
        disconnectBleOnly();
      }
    },
    [connectDevice, disconnectBleOnly]
  );

  // Card toggle: recording only (assumes the device is already connected).
  // - ON  : start_recording → bridge buffers audio in manual mode.
  // - OFF : stop_recording → bridge emits recording_finished → upload + digitize.
  const handleToggleRecording = useCallback(
    (nextOn) => {
      if (nextOn) startRecording();
      else stopRecording();
    },
    [startRecording, stopRecording]
  );

  const handleForget = useCallback(() => {
    forgetDevice();
  }, [forgetDevice]);

  const bridgeReachable =
    phase !== NEO_WS_PHASE.ERROR && phase !== NEO_WS_PHASE.IDLE;

  const bridgeUnreachable =
    phase === NEO_WS_PHASE.ERROR || phase === NEO_WS_PHASE.IDLE;

  const isProcessing = phase === NEO_WS_PHASE.PROCESSING;

  // Panel visibility is driven solely by whether we have a parsed result —
  // simpler and more reliable than the old isModalOpen + result gate.
  const consultationVisible = !!consultationResult;

  const contextValue = useMemo(
    () => ({
      enabled: neoActive,
      phase,
      deviceStatus,
      errorMessage,
      rms,
      isConnected: liveConnected,
      isSpeaking,
      isRecording,
      isProcessing,
      isTranscribingChunk,
      recordingStartedAt,
      recordingTranscript,
      recordingConversation,
      todayCapturedExtraSeconds,
      clearTodayCapturedExtra,
      deviceTelemetry,
      batteryPct,
      isCharging,
      pairedDevice,
      bridgeReachable,
      bridgeUnreachable,
      openPairing: handleOpenPairing,
      toggleRecording: handleToggleRecording,
      consultationResult,
      consultationVisible,
      dismissConsultation,
      applyToPatient: handleApplyToPatient,
      appointmentsData,
    }),
    [
      neoActive,
      phase,
      deviceStatus,
      errorMessage,
      rms,
      liveConnected,
      isSpeaking,
      isRecording,
      isProcessing,
      isTranscribingChunk,
      recordingStartedAt,
      recordingTranscript,
      recordingConversation,
      todayCapturedExtraSeconds,
      clearTodayCapturedExtra,
      deviceTelemetry,
      batteryPct,
      isCharging,
      pairedDevice,
      bridgeReachable,
      bridgeUnreachable,
      handleOpenPairing,
      handleToggleRecording,
      consultationResult,
      consultationVisible,
      dismissConsultation,
      handleApplyToPatient,
      appointmentsData,
    ]
  );

  if (!neoActive) {
    return (
      <NeoConsultationContext.Provider value={contextValue}>
        {children}
      </NeoConsultationContext.Provider>
    );
  }

  return (
    <NeoConsultationContext.Provider value={contextValue}>
      {children}
      <NeoPairingModal
        open={isPairingOpen}
        onClose={handleClosePairing}
        pairedDevice={pairedDevice}
        deviceAddress={deviceAddress}
        scanResults={scanResults}
        isScanning={isScanning}
        isPairing={isPairing}
        pairingError={pairingError}
        serverReachable={bridgeReachable}
        isConnected={liveConnected}
        isSpeaking={isSpeaking}
        onScan={scanForDevices}
        onToggleDevice={handleToggleDevice}
        onForget={handleForget}
      />
      <NeoReadyToast
        open={readyToastOpen}
        onOpen={handleToastOpen}
        onDismiss={handleToastDismiss}
        description={readyToastDesc}
      />
    </NeoConsultationContext.Provider>
  );
}

export default NeoConsultationProvider;
