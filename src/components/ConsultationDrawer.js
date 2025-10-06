import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  Suspense,
  lazy,
} from "react";
import {
  Drawer,
  Button,
  Input,
  message,
  Menu,
  Dropdown,
  Spin,
  Tooltip,
  Divider,
  AutoComplete,
} from "antd";
import styles from "./ConsultationDrawer.module.css";
import deleteIcon from "../assets/images/delete-gen-rx.svg";
import micIcon from "../assets/images/mic-gen-rx.svg";
import pauseIcon from "../assets/images/pause.svg";
import voiceRxButton from "../assets/images/voice-rx-button.svg";
import vitalsIcons from "../assets/images/vitals-icons.svg";
import stopIcon from "../assets/images/stop-icon.svg";
import muteIcon from "../assets/images/mute-icon.svg";
import ellipse895 from "../assets/images/ellipse-895.svg";

import {
  editGenRxDetails,
  getGenRx,
  getAmbientRx,
  setAddToRx,
  generateRx,
  updateGenRx,
  generateAmbientRx,
  updateAmbientRx,
  editAmbientRx,
} from "../api/services/ApiGenRx";
import tutorialIcon from "../assets/images/tutorial-icon.svg";
import genRxBg from "../assets/images/gen-rx-bg.gif";
import genRxRecordIcon from "../assets/images/gen-rx-record.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { getDecodedToken } from "../utils/localStorage";
import { v4 as uuidv4 } from "uuid";
import CashManagerContext from "../context/CashManagerContext";
import {
  addCaseManager,
  editCaseManager,
  getInvestigationAndMedicine,
} from "../redux/caseManagerSlice";
import { placeIctOrder } from "../redux/appointmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  errorMessage,
  getClinicName,
  trackEvent,
  getTokenData,
  getDeviceSdkData,
  isVoiceRxFree,
  getSupportedMimeType,
  removeBeforeWhiteSpace,
} from "../utils/utils";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import deleteModuleIcon from "../assets/images/delete-icon-blue.svg";
import alertIcon from "../assets/images/alertIcon.svg";
import CommonModal from "../common/CommonModal";
import ProfilePopover from "../common/ProfilePopover";
import BubbleSkeleton from "./BubbleSkeleton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import VoiceWaveVisualizer from "./WaveVisualizer";
import GenRXLoaders from "./GenRxLoaders";
import genRxSendCta from "../assets/images/genRxSendCta.svg";
import zydusDataEngineIcon from "../assets/images/intersect.svg";
import tatvaAiChakra from "../assets/lotties/tatvaAiChakra.lottie";
import { FAILED_VERIFICATION, FREE, MESSAGE_KEY, S_DDX, S_VOICE_RX, S_AMBIENT_VOICE_RX, GB_ZYDUS_USER, GB_APOLLO_DISABLE_FEATURE } from "../utils/constants";
import doctorAvatar from "../assets/images/doctor-avatar.png";
import arrowBoxDown from "../assets/images/arrow-box-down.svg";
import dictateActiveIcon from "../assets/images/dictate-active.svg";
import ambientActiveIcon from "../assets/images/ambient-mode-active.svg";
import SymptomsRichTextEditor from "./SymptomsRichTextEditor";
import ExaminationRichTextEditor from "./ExaminationRichTextEditor";
import DiagnosisRichTextEditor from "./DiagnosisRichTextEditor";
import LabInvestigationTable from "./LabInvestigationTable";
import AdviceRichTextEditor from "./AdviceRichTextEditor";
import VitalsRichTextEditor from "./VitalsRichTextEditor";
import MedicalHistoryRichTextEditor from "./MedicalHistoryRichTextEditor";
import FollowUpRichTextEditor from "./FollowUpRichTextEditor";
import LabResultsRichTextEditor from "./LabResultsRichTextEditor";
import AdditionalNotesRichTextEditor from "./AdditionalNotesRichTextEditor";
import MedicationsTable from "./MedicationsTable";
import {
  FAILED_VERIFICATION,
  FREE,
  GB_ZYDUS_USER,
  MESSAGE_KEY,
  S_DDX,
  S_VOICE_RX,
} from "../utils/constants";
import visitEnd from "../assets/images/end-visit.svg";
import imgCloseVisit from "../assets/images/close-visit.svg";
import { checkCredits, updateCredits } from "../redux/monetizationSlice";
import ExpiredSubModal from "../pages/monetization/components/ExpiredSubModal";
import FreeTrialButton from "../pages/monetization/components/FreeTrialButton";
import { services } from "../redux/doctorsSlice";
import { deviceType, osName } from "react-device-detect";
import SCBanner from "./SCBanner";
import GenRxKnowMore from "./GenRxKnowMore";
import { setSelectAutofill } from "../redux/ddxSlice";
import growIcon from "../assets/images/grow.svg";
import accuracyIcon from "../assets/images/accuracy.svg";
import healthIcon from "../assets/images/health-care.svg";
import playIcons from "../assets/images/tube-icon.svg";
import VideoModal from "../common/VideoModal";
import tagNew from "../assets/images/new-gif.gif";
import CustomMedicinePopup from "./CustomMedicinePopup";
import { searchMedication } from "../redux/medicationSlice";
import ApiMedication from "../api/services/ApiMedication";
import ApiInvestigation from "../api/services/ApiInvestigation";
import { env } from "../EnvironmentConfig";
import { useFeatureIsOn } from "@growthbook/growthbook-react";

const GenRxTips = lazy(() => import("./GenRxTips"));

const ConsultationDrawer = ({
  visible,
  onClose,
  labReportID,
  digitizedData,
  typedInputText,
  mode,
  handleGenRxKnowMore,
  labReportID,
}) => {
  const { servicesList } = useSelector((state) => state.doctors);
  const VOICE_RX_planDetails = servicesList?.find(
    (e) => e.service_name === S_VOICE_RX
  );

  const { useVoiceRx, setUseVoiceRx, useDDX } = useContext(CashManagerContext);

  const { state } = useLocation();
  const { patient_data, caseManagerData, fromVoiceRecording, audioBlob: audioBlobFromLocation } = state || {};
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const isFuzzyUpdatingRef = useRef(false);
  const lastFuzzyNamesRef = useRef("");
  const lastFuzzyCallRef = useRef({ sig: "", ts: 0 });
  const isFuzzyUpdatingTestsRef = useRef(false);
  const lastFuzzyTestsRef = useRef("");
  const lastFuzzyTestsCallRef = useRef({ sig: "", ts: 0 });
  const [prescriptionData, setPrescriptionData] = useState(null);
  const isAutoFocusShownRef = useRef(false);
  const hasAutoSubmittedRef = useRef(false);
  const [symptomsCollectorData, setSymptomsCollectorData] = useState(null);
  const [localModules, setLocalModules] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newModuleName, setNewModuleName] = useState("");
  const [updatedModuleName, setUpdatedModuleName] = useState("");
  const [genRxDetails, setGenRxDetails] = useState(null);
  const [fullTranscript, setFullTranscript] = useState("");
  const [conversations, setConversations] = useState([]);
  const [showPrescription, setShowPrescription] = useState(
    caseManagerData?.smart_prescription_filename || false
  );
  const [inputText, setInputText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isTranscriptExpanded, setIsTranscriptExpanded] = useState(true);
  const [audioDuration, setAudioDuration] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [editableText, setEditableText] = useState("");
  const [editableQuery, setEditableQuery] = useState("");
  const [genRxKnowMoreDrawer, setGenRxKnowMoreDrawer] = useState(false);
  const [showInstructionMessage, setShowInstructionMessage] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [editableLineItem, setEditableLineItem] = useState("");
  const [editableName, setEditableName] = useState("");
  const [searchParentQuery, setSearchParentQuery] = useState("");
  const [parentSearchOptions, setParentSearchOptions] = useState([]);
  // const [isAddMedicineOpen, setIsAddMedicineOpen] = useState(false);
  const [editableKey, setEditableKey] = useState("");
  const [queries, setQueries] = useState([]);
  const [isRxEdited, setIsRxEdited] = useState(false);
  const [editingModule, setEditingModule] = useState("");
  const [isAmbientMode, setIsAmbientMode] = useState(false);
  const [isDeleteModuleModalOpen, setIsDeleteModuleModalOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [showAddMedicinePopup, setShowAddMedicinePopup] = useState(false);
  const [showNonZydusWarning, setShowNonZydusWarning] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);
  const [dontShowZydusWarning, setDontShowZydusWarning] = useState(() => {
    return localStorage.getItem("dontShowZydusWarning") === "true";
  });
  const decodedToken = getDecodedToken();
  const doctorId = decodedToken?.result?.user_id;
  const [audioBlob, setAudioBlob] = useState(audioBlobFromLocation || null);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const [showSCBanner, setShowSCBanner] = useState(false);
  const { profile, siteId, storeCode } = useSelector((state) => state.doctors);
  const { parentOptionsList } = useSelector((state) => state.medication);
  const { symptomCollector, isAutofillSelected, selectedSymptomsCollector } =
    useSelector((state) => state.ddx);
  const { TextArea } = Input;

  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const isFreeVoiceRxUser = isVoiceRxFree();
  const [shouldShowVideo, setShowVideo] = useState(false);
  const isZydusUserAccessableFromGB = useFeatureIsOn(GB_ZYDUS_USER);
  const tokenData = getTokenData();
  const isGroundingAccessable =
    tokenData?.hospital_business_id == env.zydus_business_id &&
    isZydusUserAccessableFromGB;
  const videoLink = {
    link: "https://www.youtube.com/embed/mAZ7Sa86PnQ",
    thumbnail: "https://i.ytimg.com/vi/mAZ7Sa86PnQ/hqdefault.jpg",
  };

  useEffect(() => {
    if (mode === 'ambient') {
      setIsAmbientMode(true);
      window.TATVA_ACTIVE_VOICE_SERVICE = S_AMBIENT_VOICE_RX;
    } else if (mode === 'dictation') {
      setIsAmbientMode(false);
      window.TATVA_ACTIVE_VOICE_SERVICE = S_VOICE_RX;
    } else {
      const activeService = window.TATVA_ACTIVE_VOICE_SERVICE;
      setIsAmbientMode(activeService === S_AMBIENT_VOICE_RX);
    }
  }, [visible, mode]);

  useEffect(() => {
    if (audioBlob && audioBlob instanceof Blob) {
      const audio = new Audio();
      const url = URL.createObjectURL(audioBlob);
      audio.src = url;
      
      audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setAudioDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        URL.revokeObjectURL(url);
      });
    } else if (!audioBlob && !fromVoiceRecording) {
      setAudioDuration(null);
    }
  }, [audioBlob, fromVoiceRecording]);

  useEffect(() => {
    if (!visible) {
      hasAutoSubmittedRef.current = false;
    }
  }, [visible]);

  useEffect(() => {
    if (hasAutoSubmittedRef.current) return;
    
    const shouldAutoSubmit = visible && fromVoiceRecording && audioBlob && !isProcessing && !prescriptionData;
    if (!shouldAutoSubmit) return;

    hasAutoSubmittedRef.current = true;

    const run = async () => {
      try {
        await new Promise((r) => setTimeout(r, 80));
        setShowPrescription(true);
        setRecordingTime(0);
        setIsProcessing(true);

        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
          await new Promise((r) => setTimeout(r, 80));
        }
        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach((t) => t.stop());
        }
        setIsRecording(false);
        setIsPaused(false);

        await handleVoiceDigitize(audioBlob, "");
      } catch (e) {
        console.error('Auto submit failed:', e);
        setIsProcessing(false);
        hasAutoSubmittedRef.current = false;
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, fromVoiceRecording, audioBlob]);

  useEffect(() => {
    if (hasAutoSubmittedRef.current) return;
    
    const shouldSubmitTyped = visible && !fromVoiceRecording && typedInputText && !isProcessing && !prescriptionData;
    if (!shouldSubmitTyped) return;

    hasAutoSubmittedRef.current = true;

    const run = async () => {
      try {
        await new Promise((r) => setTimeout(r, 60));
        setShowPrescription(true);
        setIsProcessing(true);
        await handleVoiceDigitize(null, typedInputText);
      } catch (e) {
        console.error('Typed submit failed:', e);
        setIsProcessing(false);
        hasAutoSubmittedRef.current = false;
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, typedInputText]);

  
  useEffect(() => {
    if (prescriptionData && Object.keys(prescriptionData).length > 0) {
      setShowPrescription(true);
    }
  }, [prescriptionData]);

  useEffect(() => {
    if (!isGroundingAccessable) return;
    const meds = prescriptionData?.medications || [];
    if (!meds.length) return;
    if (isFuzzyUpdatingRef.current) return;
    const namesSignature = meds.map((m) => (m?.name || "").trim()).join("|");
    if (!namesSignature || namesSignature === lastFuzzyNamesRef.current) return;

    const now = Date.now();
    if (
      lastFuzzyCallRef.current.sig === namesSignature &&
      now - lastFuzzyCallRef.current.ts < 800
    ) {
      return; // ignore rapid duplicate (e.g., StrictMode double effect)
    }
    lastFuzzyCallRef.current = { sig: namesSignature, ts: now };

    lastFuzzyNamesRef.current = namesSignature;
    getFuzzySearchMedicine(meds);
  }, [prescriptionData?.medications]);

  // Fuzzy-correct lab investigations (tests) names with guards
  useEffect(() => {
    if (!isGroundingAccessable) return;
    const tests = prescriptionData?.labInvestigation || [];
    if (!tests.length) return;
    if (isFuzzyUpdatingTestsRef.current) return;
    const namesSignature = tests.map((t) => (t?.name || "").trim()).join("|");
    if (!namesSignature || namesSignature === lastFuzzyTestsRef.current) return;

    const now = Date.now();
    if (
      lastFuzzyTestsCallRef.current.sig === namesSignature &&
      now - lastFuzzyTestsCallRef.current.ts < 800
    ) {
      return;
    }
    lastFuzzyTestsCallRef.current = { sig: namesSignature, ts: now };
    lastFuzzyTestsRef.current = namesSignature;
    getFuzzySearchLabs(tests);
  }, [prescriptionData?.labInvestigation]);

  const getFuzzySearchMedicine = async (medsSnapshot) => {
    try {
      const meds = medsSnapshot || prescriptionData?.medications || [];
      if (!meds.length) return;
      isFuzzyUpdatingRef.current = true;

      const correctedResults = await Promise.all(
        meds.map(async (med) => {
          const currentName = (med?.name || "").trim();
          if (!currentName)
            return { correctedName: currentName, fullData: null };
          try {
            const result = await ApiMedication.getFuzzySearch(currentName);
            const corrected = result?.[0]?.tmm_medicine_name?.trim();
            return {
              correctedName: corrected || currentName,
              fullData: result?.[0] || null,
            };
          } catch (e) {
            return { correctedName: currentName, fullData: null };
          }
        })
      );

      const anyChanged = meds.some(
        (m, i) => (m?.name || "").trim() !== correctedResults[i].correctedName
      );
      if (!anyChanged) return;

      // Update the signature to the corrected names to avoid an immediate second run
      const correctedSig = correctedResults
        .map((r) => r.correctedName)
        .join("|");
      lastFuzzyNamesRef.current = correctedSig;

      setPrescriptionData((prev) => ({
        ...prev,
        medications: (prev?.medications || []).map((m, idx) => ({
          ...m,
          name: correctedResults[idx].correctedName,
          edited: false,
          // Add metadata for fuzzy search corrected name with full data
          metadata: {
            ...m.metadata,
            fuzzyCorrectedName: correctedResults[idx].correctedName,
            originalName: m.name,
            isFuzzyCorrected: true,
            ...(correctedResults[idx].fullData || {}),
          },
        })),
      }));
    } finally {
      isFuzzyUpdatingRef.current = false;
    }
  };

  const getFuzzySearchLabs = async (testsSnapshot) => {
    try {
      const tests = testsSnapshot || prescriptionData?.labInvestigation || [];
      if (!tests.length) return;
      isFuzzyUpdatingTestsRef.current = true;

      const correctedResults = await Promise.all(
        tests.map(async (it) => {
          const currentName = (it?.name || "").trim();
          if (!currentName)
            return { correctedName: currentName, fullData: null };
          try {
            const result = await ApiInvestigation.getFuzzySearch(currentName);
            const corrected = result?.[0]?.investigation_name?.trim();
            return {
              correctedName: corrected || currentName,
              fullData: result?.[0] || null,
            };
          } catch (e) {
            return { correctedName: currentName, fullData: null };
          }
        })
      );

      const anyChanged = tests.some(
        (m, i) => (m?.name || "").trim() !== correctedResults[i].correctedName
      );
      if (!anyChanged) return;

      const correctedSig = correctedResults
        .map((r) => r.correctedName)
        .join("|");
        (m, i) => (m?.name || "").trim() !== correctedNames[i]
      );
      if (!anyChanged) return;

      // Prevent immediate re-run by updating signature to corrected names
      const correctedSig = correctedResults
        .map((r) => r.correctedName)
        .join("|");
      lastFuzzyTestsRef.current = correctedSig;

      setPrescriptionData((prev) => ({
        ...prev,
        labInvestigation: (prev?.labInvestigation || []).map((m, idx) => ({
          ...m,
          name: correctedResults[idx].correctedName,
          // Add metadata for fuzzy search corrected name with full data
          metadata: {
            ...m.metadata,
            fuzzyCorrectedName: correctedResults[idx].correctedName,
            originalName: m.name,
            isFuzzyCorrected: true,
            ...(correctedResults[idx].fullData || {}),
          },
        })),
      }));
    } finally {
      isFuzzyUpdatingTestsRef.current = false;
    }
  };

  useEffect(() => {
    if (
      VOICE_RX_planDetails !== undefined &&
      (VOICE_RX_planDetails?.plan_tier === FREE ||
        VOICE_RX_planDetails?.plan_tier === FAILED_VERIFICATION)
    ) {
      setTimeout(() => {
        setIsSubModalOpen(true);
      }, 500);
    }
  }, [VOICE_RX_planDetails]);

  const showHideSubModal = useCallback(() => {
    setIsSubModalOpen(!isSubModalOpen);

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
  }, [isSubModalOpen]);

  const showHideBackModal = useCallback(() => {
    setIsBackModalOpen(!isBackModalOpen);
  }, [isBackModalOpen]);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioStreamRef = useRef(null);

  const navigate = useNavigate();

  const { tcmId, consultationDate, pamId } = useContext(CashManagerContext);

  const dispatch = useDispatch();

  const textAreaRef = useRef(null);

  // Split view resizer state
  const splitRef = useRef(null);
  const isResizingRefSplit = useRef(false);
  
  const getInitialWidthPercent = () => {
    if (typeof window === 'undefined') return 33;
    const screenWidth = window.innerWidth;
    if (screenWidth >= 769 && screenWidth <= 1024) {
      return 35;
    }
    if (screenWidth >= 1920) return 25;
    if (screenWidth >= 1440) return 33;
    return 33;
  };
  
  const [leftWidthPercent, setLeftWidthPercent] = useState(getInitialWidthPercent());
  const [leftWidthPercent, setLeftWidthPercent] = useState(45); // default matches previous CSS 45%

  const onMouseMoveResizer = useCallback((e) => {
    if (!isResizingRefSplit.current || !splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const totalWidth = rect.width;
    
    const minLeftWidthPx = 480;
    const minRxPadWidthPx = 960;
    const minLeftPercent = (minLeftWidthPx / totalWidth) * 100;
    const maxLeftPercent = ((totalWidth - minRxPadWidthPx) / totalWidth) * 100;
    
    const pct = (relativeX / totalWidth) * 100;
    
    if (totalWidth >= minLeftWidthPx + minRxPadWidthPx) {
      const clamped = Math.min(maxLeftPercent, Math.max(minLeftPercent, pct));
    setLeftWidthPercent(clamped);
    } else {
      const clamped = Math.min(100, Math.max(0, pct));
      setLeftWidthPercent(clamped);
    }
    const pct = (relativeX / rect.width) * 100;
    // clamp between 25% and 75%
    const clamped = Math.min(75, Math.max(25, pct));
    setLeftWidthPercent(clamped);
  }, []);

  const stopResizing = useCallback(() => {
    if (!isResizingRefSplit.current) return;
    isResizingRefSplit.current = false;
    document.removeEventListener("mousemove", onMouseMoveResizer);
    document.removeEventListener("mouseup", stopResizing);
  }, [onMouseMoveResizer]);

  const startResizing = useCallback(() => {
    isResizingRefSplit.current = true;
    document.addEventListener("mousemove", onMouseMoveResizer);
    document.addEventListener("mouseup", stopResizing);
  }, [onMouseMoveResizer, stopResizing]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (!splitRef.current) return;
      const rect = splitRef.current.getBoundingClientRect();
      const totalWidth = rect.width;
      
      const minLeftWidthPx = 480;
      const minRxPadWidthPx = 960;
      
      if (totalWidth >= minLeftWidthPx + minRxPadWidthPx) {
        const minLeftPercent = (minLeftWidthPx / totalWidth) * 100;
        const maxLeftPercent = ((totalWidth - minRxPadWidthPx) / totalWidth) * 100;
        
        const currentLeftPx = (leftWidthPercent / 100) * totalWidth;
        const currentRxPadPx = totalWidth - currentLeftPx;
        
        if (currentLeftPx < minLeftWidthPx) {
          setLeftWidthPercent(minLeftPercent);
        } else if (currentRxPadPx < minRxPadWidthPx) {
          setLeftWidthPercent(maxLeftPercent);
        }
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [leftWidthPercent]);

  useEffect(() => {
    if (caseManagerData?.smart_prescription_filename) {
      getGenRxDetails();
    }
  }, [caseManagerData?.smart_prescription_filename]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!splitRef.current) return;
      const totalWidth = splitRef.current.getBoundingClientRect().width || window.innerWidth;
      const isTablet = window.innerWidth >= 769 && window.innerWidth <= 1024;
      const desiredLeftPx = isTablet ? 350 : 480;
      const minLeftPx = desiredLeftPx;
      const minRightPx = isTablet ? 674 : 960;
      const minLeftPercent = (minLeftPx / totalWidth) * 100;
      const maxLeftPercent = ((totalWidth - minRightPx) / totalWidth) * 100;
      let pct = (desiredLeftPx / totalWidth) * 100;
      if (!isFinite(pct)) pct = getInitialWidthPercent();
      const clamped = Math.max(minLeftPercent, Math.min(maxLeftPercent, pct));
      setLeftWidthPercent(clamped);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAutoFocusShownRef.current) return;
    if (!prescriptionData || activeIndex !== null || activeType !== null)
      return;

    const fieldsToCheck = [
      { name: "vitalsAndBodyComposition", type: "object" },
      { name: "medicalHistory", type: "array" },
      { name: "symptoms", type: "array" },
      { name: "examinations", type: "array" },
      { name: "diagnosis", type: "array" },
      { name: "medications", type: "array" },
      { name: "labInvestigation", type: "array" },
      { name: "advice", type: "array" },
      { name: "vaccinations", type: "array" },
      { name: "others", type: "array" },
      { name: "dynamicFields", type: "object" },
      { name: "followUp", type: "string" },
    ];

    for (const field of fieldsToCheck) {
      if (
        field.type === "object" &&
        field.name === "vitalsAndBodyComposition"
      ) {
        const keysWithValue = Object.entries(prescriptionData[field.name] || {})
          .filter(([_, value]) => value)
          .map(([key]) => key);
        if (keysWithValue?.length) {
          setTimeout(() => {
            isAutoFocusShownRef.current = true;
            return handleKeyEditClick(keysWithValue[0]);
          }, 0);
          return;
        }
      } else if (field.type === "object" && field.name === "dynamicFields") {
        const modules = Object.keys(prescriptionData[field.name] || {});
        if (
          modules.length &&
          prescriptionData[field.name][modules[0]]?.length
        ) {
          setTimeout(() => {
            isAutoFocusShownRef.current = true;
            return handleItemClick(modules[0], 0, true);
          }, 100);
          return;
        }
      } else if (field.type === "array") {
        if (prescriptionData[field.name]?.length) {
          setTimeout(() => {
            isAutoFocusShownRef.current = true;
            if (["advice", "others"].includes(field.name)) {
              return handleItemClick(field.name, 0);
            }
            return handleLineItemClick(field.name, 0);
          }, 100);
          return;
        }
      } else if (field.type === "string") {
        if (prescriptionData[field.name]) {
          setTimeout(() => {
            isAutoFocusShownRef.current = true;
            return handleItemClick(field.name);
          }, 100);
          return;
        }
      }
    }
  }, [prescriptionData, activeIndex, activeType]);

  useEffect(() => {
    if (symptomCollector && Object.keys(symptomCollector)?.length > 0) {
      setShowSCBanner(true);
    }
  }, [symptomCollector]);

  const getFormattedSymptomsCollectorData = (selectedSymptomsCollector) => {
    return {
      ...(selectedSymptomsCollector?.symptoms?.length && {
        symptoms: selectedSymptomsCollector.symptoms,
      }),
      ...(selectedSymptomsCollector?.medicalHistory?.some(
        (obj) => obj.items?.length
      ) && {
        medicalHistory: selectedSymptomsCollector.medicalHistory.flatMap(
          (obj) => obj.items
        ),
      }),
      ...(selectedSymptomsCollector?.notes && {
        others: [selectedSymptomsCollector.notes],
      }),
    };
  };

  useEffect(() => {
    if (
      isAutofillSelected &&
      selectedSymptomsCollector &&
      Object.keys(selectedSymptomsCollector)?.length > 0
    ) {
      const formattedSymptomsCollectorData = getFormattedSymptomsCollectorData(
        selectedSymptomsCollector
      );
      setSymptomsCollectorData(formattedSymptomsCollectorData);
      setPrescriptionData(formattedSymptomsCollectorData);
      setShowPrescription(true);

      if (!caseManagerData?.smart_prescription_filename) {
        handleVoiceDigitize(null, null, true);
      }
    }
  }, [selectedSymptomsCollector, isAutofillSelected]);

  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const getGenRxDetails = async () => {
    try {
      let response;
      if (isAmbientMode || mode === 'ambient') {
        response = await getAmbientRx(caseManagerData?.smart_prescription_filename);
      } else {
        response = await getGenRx(caseManagerData?.smart_prescription_filename);
      }

      if (response.success) {
        setPrescriptionData(
          response.data.editedData || response.data.digitizeData
        );
        setGenRxDetails({
          source: response.data.source,
          source_duration: response.data.source_duration,
          timeRequiredInMs: response.data.timeRequiredInMs,
          type: response.data.type,
          _id: response.data._id,
        });
        // Check if history exists and has data before mapping
        if (response.data?.history?.length > 0) {
          const validTranscriptions = response.data.history
            .map(({ transcription }) => transcription)
            .filter((text) => text && text !== "null");

          if (validTranscriptions.length > 0) {
            setQueries(validTranscriptions);
          }
        }
      } else {
        throw new Error(response.error || "Failed to get Rx");
      }
    } catch (error) {
      console.error("Error getting Rx details:", error);
    }
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
      // Find the supported MIME type for this browser
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
        // Use the same MIME type that was detected or fall back to audio/webm
        const mimeType = mediaRecorderRef.current.mimeType || "audio/webm";
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    const clinic_name = getClinicName(profile?.hospital_data);
    trackEvent("TP_VoiceRx_Paused", {
      patient_contact: patient_data?.pm_contact_no || "",
      patient_id: patient_data?.patient_unique_id || "",
      doctor_speciality: profile?.dp_name,
      doctor_unique_id: profile?.doctor_unique_id,
      clinic_name,
      rx_id: genRxDetails?._id || "",
    });
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
  };

  const handleSend = async () => {
    if (
      !isFreeVoiceRxUser &&
      VOICE_RX_planDetails?.plan_tier === FREE &&
      VOICE_RX_planDetails?.credit_balance <= 0
    ) {
      showHideSubModal();
    } else if (
      !isFreeVoiceRxUser &&
      VOICE_RX_planDetails?.plan_tier === FAILED_VERIFICATION
    ) {
      showHideSubModal();
    } else {
      let sendData = {
        b2c_id: profile?.b2c,
        service_name: S_VOICE_RX,
      };
      const action = await dispatch(checkCredits(sendData));
      if (action.meta.requestStatus === "fulfilled") {
        if (action?.payload?.hasOwnProperty("service_name")) {
          if (
            !isFreeVoiceRxUser &&
            action?.payload?.plan_tier === FREE &&
            action?.payload?.credit_balance <= 0
          ) {
            if (
              action?.payload?.credit_balance !=
              VOICE_RX_planDetails?.credit_balance
            ) {
              await dispatch(services(sendData?.b2c_id));
            }
            showHideSubModal();
          } else if (
            !isFreeVoiceRxUser &&
            action?.payload?.plan_tier === FAILED_VERIFICATION
          ) {
            showHideSubModal();
          } else {
            if (!isRecording && !(inputText || editableQuery)) return;
            if (genRxDetails?._id) {
              const clinic_name = getClinicName(profile?.hospital_data);
              trackEvent("TP_VoiceRx_editRx", {
                patient_contact: patient_data?.pm_contact_no || "",
                patient_id: patient_data?.patient_unique_id || "",
                doctor_speciality: profile?.dp_name,
                doctor_unique_id: profile?.doctor_unique_id,
                clinic_name,
                rx_id: genRxDetails?._id,
              });
            }
            setShowPrescription(true);
            setRecordingTime(0);
            setIsProcessing(true);

            try {
              if (isRecording) {
                mediaRecorderRef.current?.stop();
                await new Promise((resolve) => setTimeout(resolve, 100)); // Ensure audio is processed

                const mimeType =
                  mediaRecorderRef.current?.mimeType || "audio/webm";
                const audioBlob = new Blob(audioChunksRef.current, {
                  type: mimeType,
                });

                await handleVoiceDigitize(audioBlob, "");
              } else {
                await handleVoiceDigitize(null, inputText || editableQuery);
              }
            } catch (error) {
              console.error("Error processing prescription:", error);
              message.error(error.message || "Failed to process prescription");
              setIsProcessing(false);
            }
          }
        } else {
          typeof action?.payload?.data?.error === "object"
            ? errorMessage(action?.payload?.data?.error?.description)
            : errorMessage(action?.payload?.data?.message);
        }
      } else {
        errorMessage(action.payload.message);
      }
    }
  };

  const preparePayloadForApi = () => {
    const cleanedData = removeScItems(prescriptionData);
    const { dynamicFields = {} } = cleanedData;

    // Exclude local modules based on localModules state
    const filteredDynamicFields = Object.keys(dynamicFields).reduce(
      (acc, key) => {
        if (!localModules.includes(key)) {
          acc[key] = dynamicFields[key]; // Include only non-local modules
        }
        return acc;
      },
      {}
    );

    return {
      ...cleanedData,
      dynamicFields: filteredDynamicFields,
    };
  };

  const removeScItems = (data) => {
    // Create a new object with filtered arrays
    return {
      ...data,
      symptoms: data.symptoms.filter((symptom) => !symptom.SC),
      medicalHistory: data.medicalHistory.filter((history) => !history.SC),
    };
  };

  const handleVoiceDigitize = async (
    audioBlob,
    transcribedText,
    isFromSC = false
  ) => {
    try {
      let response;

      if (isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX || genRxDetails?.type === 'ambient') {
      const formData = new FormData();
      if (audioBlob) {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const duration = audioBuffer.duration;
        
        formData.append("", audioFile);
        formData.append("source_duration", duration.toString());
      } else if (transcribedText) {
        formData.append("", transcribedText);
        }

        if (genRxDetails?._id) {
          const data = preparePayloadForApi();
          formData.append(
            "voice_prescription_previous_context",
            JSON.stringify(data)
          );
        }
        formData.append("doctorId", doctorId);
        formData.append("patientId", patient_data?.patient_unique_id || "");
        formData.append("schemaKey", "default");
        formData.append("getConversation", "true");
        
        if (genRxDetails?._id) {
          const updatedTranscript = fullTranscript + " " + transcribedText;
      setFullTranscript(updatedTranscript);
          
          if (transcribedText) {
            const newFormData = new FormData();
            newFormData.append("", updatedTranscript);
            
            Array.from(formData.entries()).forEach(([key, value]) => {
              if (key !== '' || typeof value !== 'string') {
                newFormData.append(key, value);
              }
            });
            
            response = await updateAmbientRx(
              newFormData,
              genRxDetails?._id
            );
          } else {
            response = await updateAmbientRx(
              formData,
              genRxDetails?._id
            );
          }
        } else {
          response = await generateAmbientRx(
            formData
          );
          
          if (transcribedText) {
            setFullTranscript(transcribedText);
          }
        }
        const responseData = response.data || response;
        const isSuccess = response.success !== false && responseData && (
          responseData.digitize || 
          responseData.rx || 
          responseData.symptoms || 
          responseData.conversation ||
          responseData.rxDigitizationHistory
        );
        
        if (isSuccess) {
          if (!responseData) {
            console.error('❌ Response data is null or undefined');
            throw new Error('No data received from API');
          }
          
          if (!isFromSC) {
            let prescriptionData = null;
            let conversationData = null;
            
            if (responseData.symptoms || responseData.medications || responseData.vitalsAndBodyComposition) {
              prescriptionData = responseData;
            }
            else if (responseData.rxDigitizationHistory?.[0]?.payload?.response) {
              prescriptionData = responseData.rxDigitizationHistory[0].payload.response;
            }
            else if (responseData.rxDigitizationHistory?.[0]?.response) {
              prescriptionData = responseData.rxDigitizationHistory[0].response;
            }
            else if (responseData.rxDigitizationHistory?.[0]?.payload?.symptoms || 
                     responseData.rxDigitizationHistory?.[0]?.payload?.medications) {
              prescriptionData = responseData.rxDigitizationHistory[0].payload;
            }
            else if (responseData.digitize) {
              prescriptionData = responseData.digitize;
            }
            else if (responseData.prescription) {
              prescriptionData = responseData.prescription;
            }
            else if (responseData.rx) {
              prescriptionData = responseData.rx;
            }
            else if (responseData.symptoms || responseData.medications || responseData.vitalsAndBodyComposition) {
              prescriptionData = responseData;
            }
            
            if (prescriptionData && prescriptionData.vitalsAndBodyComposition) {
              const vitals = prescriptionData.vitalsAndBodyComposition;
              const actualVitals = vitals._doc || vitals;
              const cleanedVitals = {};
              
              const vitalKeys = ['temperature', 'pulse', 'respRate', 'bloodPressure', 'spo2', 'ofc', 'height', 'weight'];
              vitalKeys.forEach(key => {
                if (actualVitals[key] !== undefined && actualVitals[key] !== null && actualVitals[key] !== '') {
                  cleanedVitals[key] = actualVitals[key];
                }
              });
              
              prescriptionData.vitalsAndBodyComposition = cleanedVitals;
            }
            
            if (responseData.rxDigitizationHistory?.[0]?.payload?.conversation) {
              conversationData = responseData.rxDigitizationHistory[0].payload.conversation;
            } else if (responseData.conversation) {
              conversationData = responseData.conversation;
            } else if (responseData.digitize?.conversation) {
              conversationData = responseData.digitize.conversation;
            } else if (responseData.rx?.conversation) {
              conversationData = responseData.rx.conversation;
            } else if (prescriptionData?.conversation) {
              conversationData = prescriptionData.conversation;
            }
            
            if (conversationData) {
              setConversations(conversationData);
            }
            
            if (prescriptionData) {
              const validatedPrescriptionData = validatePrescriptionData(prescriptionData);
              
              setPrescriptionData((prevData) => {
                const mergedDynamicFields = {
                  ...(validatedPrescriptionData?.dynamicFields),
                  ...localModules.reduce((acc, moduleName) => {
                    acc[moduleName] = [];
                    return acc;
                  }, {}),
                };

                if (genRxDetails?._id) {
                  const hasMeaningfulData = validatedPrescriptionData.symptoms?.length > 0 || 
                                          validatedPrescriptionData.medications?.length > 0 || 
                                          validatedPrescriptionData.vitalsAndBodyComposition || 
                                          Object.keys(validatedPrescriptionData).length > 2;
                  
                  if (hasMeaningfulData) {
                    const formattedSymptomsCollectorData =
                      getFormattedSymptomsCollectorData(selectedSymptomsCollector);
                    const finalPrescriptionData =
                      formattedSymptomsCollectorData &&
                      Object.keys(formattedSymptomsCollectorData)?.length > 0
                        ? mergeData(
                            validatedPrescriptionData,
                            formattedSymptomsCollectorData
                          )
                        : validatedPrescriptionData;

                    return {
                      ...finalPrescriptionData,
                      dynamicFields: mergedDynamicFields,
                    };
                  } else {
                    return prevData || {};
                  }
                } else {
                  const formattedSymptomsCollectorData =
                    getFormattedSymptomsCollectorData(selectedSymptomsCollector);
                  const finalPrescriptionData =
                    formattedSymptomsCollectorData &&
                    Object.keys(formattedSymptomsCollectorData)?.length > 0
                      ? mergeData(
                          validatedPrescriptionData,
                          formattedSymptomsCollectorData
                        )
                      : validatedPrescriptionData;

                  return {
                    ...finalPrescriptionData,
                    dynamicFields: mergedDynamicFields,
                  };
                }
              });
            } else {
              setPrescriptionData({
                symptoms: [],
                medications: [],
                vitalsAndBodyComposition: {},
                advice: [],
                diagnosis: [],
                examinations: [],
                followUp: "",
                labInvestigation: [],
                medicalHistory: [],
                vaccinations: [],
                others: [],
                dynamicFields: localModules.reduce((acc, moduleName) => {
                  acc[moduleName] = [];
                  return acc;
                }, {}),
              });
            }

            setConversations((prevConversations) => {
              if (conversationData && conversationData.length > 0) {
                if (!genRxDetails?._id || prevConversations.length === 0) {
                  return conversationData;
                } else {
                  return conversationData;
                }
              } else if (genRxDetails?._id) {
                const currentInput = {
                  speaker: "doctor",
                  text: transcribedText,
                  timestamp: new Date().toISOString()
                };
                return [...prevConversations, currentInput];
              } else {
                const initialConversation = {
                  speaker: "doctor",
                  text: transcribedText || "Initial consultation",
                  timestamp: new Date().toISOString()
                };
                return [initialConversation];
              }
            });
          }

          setGenRxDetails({
            source: responseData.source,
            source_duration: responseData.source_duration,
            timeRequiredInMs: responseData.timeRequiredInMs,
            type: "ambient",
            _id: responseData._id,
          });
          setInputText("");
          setIsEditing(false);
          setUseVoiceRx(true);
          setShowPrescription(true);
        } else {
          if (response.success === false && response.data === null) {
            throw new Error(response.error || "Server error - API returned failure with null data");
          } else {
            throw new Error(response.error || "Failed to process ambient prescription - check response structure");
          }
        }
      } else {
        formData.append("voice_prescription_text", transcribedText);
      }
      if (genRxDetails?._id) {
        const data = preparePayloadForApi();
        formData.append(
          "voice_prescription_previous_context",
          JSON.stringify(data)
        );
      }
      formData.append("doctorId", doctorId); // Replace with actual doctor ID
      formData.append("patientId", patient_data?.patient_unique_id); // Replace with actual patient ID

      const response = genRxDetails?._id
        ? await updateGenRx(formData, genRxDetails?._id)
        : await generateRx(formData);

      if (response.success) {
        if (!isFromSC) {
          setPrescriptionData(response.data.digitize);
          setPrescriptionData(() => {
            // Merge localModules into dynamicFields
            const mergedDynamicFields = {
              ...response.data.digitize?.dynamicFields, // Retain API-provided dynamicFields
              ...localModules.reduce((acc, moduleName) => {
                acc[moduleName] = []; // Add local modules with default values
                return acc;
              }, {}),
            };

            const formattedSymptomsCollectorData =
              getFormattedSymptomsCollectorData(selectedSymptomsCollector);
            const mergedData =
              formattedSymptomsCollectorData &&
              Object.keys(formattedSymptomsCollectorData)?.length > 0
                ? mergeData(
                    response.data.digitize,
                    formattedSymptomsCollectorData
                  )
                : response.data.digitize;

            return {
              ...mergedData,
              dynamicFields: mergedDynamicFields, // Updated dynamicFields with localModules
            };
          });

          setQueries(
            isEditing
              ? [
                  ...queries.slice(0, queries.length - 1),
                  response.data.transcription,
                ]
              : [...queries, response.data.transcription]
          );
        }

        response = genRxDetails?._id
          ? await updateGenRx(formData, genRxDetails?._id)
          : await generateRx(formData);

        const responseData = response.data || response;
        const isSuccess = response.success !== false && responseData && (
          responseData.digitize || 
          responseData.rx || 
          responseData.symptoms || 
          responseData.conversation ||
          responseData.rxDigitizationHistory
        );
        
        if (isSuccess) {
          if (!responseData) {
            console.error('❌ Response data is null or undefined');
            throw new Error('No data received from API');
          }
          
          if (!isFromSC) {
            let prescriptionData = null;
            let conversationData = null;
            
            if (responseData.symptoms || responseData.medications || responseData.vitalsAndBodyComposition) {
              prescriptionData = responseData;
            }
            else if (responseData.rxDigitizationHistory?.[0]?.payload?.response) {
              prescriptionData = responseData.rxDigitizationHistory[0].payload.response;
            }
            else if (responseData.rxDigitizationHistory?.[0]?.response) {
              prescriptionData = responseData.rxDigitizationHistory[0].response;
            }
            else if (responseData.digitize) {
              prescriptionData = responseData.digitize;
            }
            
            if (responseData.conversation) {
              conversationData = responseData.conversation;
            }
            else if (responseData.rxDigitizationHistory?.[0]?.payload?.conversation) {
              conversationData = responseData.rxDigitizationHistory[0].payload.conversation;
            }
            
            if (prescriptionData) {
              setPrescriptionData(prescriptionData);
            }
            
            if (conversationData) {
              setConversations(conversationData);
            }
            
            if (responseData.transcription) {
            setQueries(
              isEditing
                ? [
                    ...queries.slice(0, queries.length - 1),
                      responseData.transcription,
                  ]
                  : [...queries, responseData.transcription]
            );
            }
          }

          setGenRxDetails({
            source: responseData.source,
            source_duration: responseData.source_duration,
            timeRequiredInMs: responseData.timeRequiredInMs,
            type: "ambient",
            _id: responseData._id,
          });
          setInputText("");
          setIsEditing(false);
          setUseVoiceRx(true);
        } else {
          if (response.success === false && response.data === null) {
            throw new Error(response.error || "Server error - API returned failure with null data");
          } else {
            throw new Error(response.error || "Failed to process prescription");
          }
        }
      }
    } catch (error) {
      console.error("Error in voice digitization:", error);
      message.error(error.message || "Failed to process prescription");
    } finally {
      setIsProcessing(false);
      setIsRecording(false);
    }
  };

  const handleUpdateGenRX = async () => {
    try {
      let response;
      
      if (isAmbientMode && genRxDetails?.type === "ambient") {
        response = await editAmbientRx(
        { editedData: prescriptionData },
        genRxDetails?._id
      );
      } else {
        response = await editGenRxDetails(
          { editedData: prescriptionData },
          genRxDetails?._id
        );
      }
      
      if (response.status === 204 || response.success) {
        setGenRxDetails({
          source: response.data.source,
          source_duration: response.data.source_duration,
          timeRequiredInMs: response.data.timeRequiredInMs,
          type: response.data.type,
          _id: response.data._id,
        });
      } else {
        throw new Error(response.error || "Failed to update Rx");
      }
    } catch (error) {
      console.error("Error in voice digitization:", error);
      message.error(error.message || "Failed to process prescription");
    }
  };

  const mergeData = (data1, data2) => {
    // Helper function to check if two items are duplicates
    const isDuplicate = (item1, item2) => {
      return (
        item1.name === item2.name &&
        item1.duration === item2.duration &&
        item1.severity === item2.severity &&
        item1.notes === item2.notes
      );
    };

    // Add SC flag to data2 items
    const data2WithSC = {
      ...data2,
      symptoms: data2?.symptoms?.map((symptom) => ({
        ...symptom,
        SC: true,
      })),
      medicalHistory: data2?.medicalHistory?.map((history) => ({
        ...history,
        SC: true,
      })),
    };

    // Merge symptoms arrays while removing duplicates
    const mergedSymptoms = [...data1?.symptoms];
    data2WithSC?.symptoms?.forEach((symptom2) => {
      if (!mergedSymptoms.some((symptom1) => isDuplicate(symptom1, symptom2))) {
        mergedSymptoms.push(symptom2);
      }
    });

    // Merge medicalHistory arrays while removing duplicates
    const mergedMedicalHistory = [...data1.medicalHistory];
    data2WithSC.medicalHistory.forEach((history2) => {
      if (
        !mergedMedicalHistory.some((history1) =>
          isDuplicate(history1, history2)
        )
      ) {
        mergedMedicalHistory.push(history2);
      }
    });

    // Return merged object
    return {
      ...data1,
      ...data2,
      symptoms: mergedSymptoms,
      medicalHistory: mergedMedicalHistory,
    };
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditableQuery(queries[queries.length - 1]);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditableQuery("");
  };

  const handleEditSave = () => {
    setInputText(editableQuery);
    handleSend();
  };

  const handlePauseResume = () => {
    if (isPaused) {
      mediaRecorderRef.current?.resume();
    } else {
      mediaRecorderRef.current?.pause();
    }
    setIsPaused(!isPaused);
  };

  const handleInputChange = (e) => {
    setEditableText(e.target.value);
    setIsRxEdited(true);
  };

  const handlePaste = (e, type) => {
    const pastedData =
      e.clipboardData.getData("text/plain") ||
      e.clipboardData.getData("Text") ||
      e.clipboardData.getData("text");
    const points = pastedData
      .split("\n")
      .map((point) => point.trim())
      .filter(Boolean);

    if (points.length > 0) {
      setPrescriptionData((prevData) => {
        const updatedData = { ...prevData };

        points.forEach((point) => {
          if (!updatedData.dynamicFields[type]) {
            updatedData.dynamicFields[type] = [];
          }
          updatedData.dynamicFields[type].push(point);
        });

        return updatedData;
      });
      setIsRxEdited(true);
    }

    // Clear the editable text
    e.preventDefault();
    setEditableText("");
  };

  const inputRefs = useRef({});
  const inputLineItemRefs = useRef({});

  const handleKeyDown = (e, type, index, isExisting) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent newline in the input field

      const trimmedText = isExisting
        ? editableLineItem?.trim()
        : editableText.trim();
      if (trimmedText) {
        setPrescriptionData((prevData) => {
          const updatedData = { ...prevData };

          if (isExisting) {
            if (!updatedData?.[type]) {
              updatedData[type] = [];
            }
            if (["advice", "others"].includes(type)) {
              updatedData[type][index] = trimmedText;
              updatedData[type].splice(index + 1, 0, "");
            } else {
              updatedData[type][index].lineItem = trimmedText;
              // mark item as user-edited when line item is changed via Enter
              updatedData[type][index].edited = true;
              updatedData[type].splice(index + 1, 0, {
                lineItem: " ",
                name: " ",
              });
            }
            setEditableLineItem(" ");
            setEditableText("");
            return updatedData;
          }
          if (!updatedData.dynamicFields[type]) {
            updatedData.dynamicFields[type] = [];
          }

          // Update the current index with trimmed text
          updatedData.dynamicFields[type][index] = trimmedText;

          // Insert an empty string after the current index
          updatedData.dynamicFields[type].splice(index + 1, 0, "");
          return updatedData;
        });

        // Update active index and clear input
        setActiveIndex(index + 1);
        setIsRxEdited(true);
        if (isExisting && !["advice", "others"].includes(type)) {
          setActiveType(`${type}-lineItem`);
          setEditableLineItem("");
        } else {
          setActiveType(type);
          setEditableText("");
        }

        // Focus on the newly added input
        setTimeout(() => {
          const nextIndex = index + 1;
          if (isExisting) inputLineItemRefs.current[nextIndex]?.focus();
          else inputRefs.current[nextIndex]?.focus();
        }, 0);
      }
    }
  };

  const handleKeyPress = (e) => {
    // If only Enter is pressed (without Shift), call API
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default new line
      handleSend();
    }
    // If Shift + Enter is pressed, let the default behavior happen (new line)
  };

  // Handle lineItem input change for editing
  const handleLineItemChange = (e) => {
    setEditableLineItem(e.target.value);
    setIsRxEdited(true);
  };

  const handleInputBlur = (type, index, isCustom, isExisting) => {
    if (
      (activeIndex !== null && activeType !== null) ||
      isCustom ||
      isExisting
    ) {
      setPrescriptionData((prevData) => {
        const updatedData = { ...prevData };
        const trimmedText = isCustom
          ? editableText.trim()
          : isExisting
          ? editableLineItem?.trim()
          : "";
        if (!trimmedText) {
          // For medications and labInvestigation, lineItem is optional.
          // Do NOT delete the item when editing existing lineItem to empty.
          if (
            isExisting &&
            (type === "medications" || type === "labInvestigation")
          ) {
            if (updatedData?.[type]?.[index]) {
              updatedData[type][index].lineItem = "";
            }
            return updatedData;
          }
          if (type === "vitalsAndBodyComposition") {
            updatedData.vitalsAndBodyComposition[index] = "";
          } else if (isCustom) {
            updatedData.dynamicFields[type] = updatedData.dynamicFields[
              type
            ].filter((_, i) => i !== index);
          } else if (isExisting) {
            updatedData[type] = updatedData[type].filter((_, i) => i !== index);
          } else if (type === "followUp") {
            updatedData.followUp = "";
          } else {
            updatedData[type] = updatedData?.[type]?.filter(
              (_, i) => i !== index
            );
          }
          return updatedData;
        }
        if (
          type === "medications" ||
          type === "labInvestigation" ||
          type === "symptoms" ||
          type === "examinations" ||
          type === "diagnosis" ||
          type === "medicalHistory" ||
          type === "vaccinations"
        ) {
          // When editing existing structured items, only update lineItem here.
          // Name field is handled separately via handleNameBlur
          if (type === "medications" || type === "labInvestigation") {
            // For medications and labInvestigation, only update if lineItem has changed
            const originalLineItem = updatedData[type][index].lineItem || "";
            if (trimmedText !== originalLineItem) {
              updatedData[type][index].lineItem = trimmedText;
              // mark item as user-edited when line item is changed on blur
              updatedData[type][index].edited = true;
            }
          } else {
            updatedData[type][index].name = trimmedText;
            updatedData[type][index].lineItem = trimmedText;
          }
        } else if (type === "advice" || type === "others") {
          updatedData[type][index] = trimmedText;
        } else if (type === "vitalsAndBodyComposition") {
          updatedData.vitalsAndBodyComposition[index] = trimmedText;
        } else if (isCustom) {
          updatedData.dynamicFields[type][index] = trimmedText;
        } else if (type === "followUp") {
          updatedData.followUp = trimmedText;
        }
        return updatedData; // Persist changes
      });
      setIsRxEdited(true);
    }
    // Clear all editing states
    setActiveIndex(null);
    setActiveType(null);
    setEditableText(""); // Clear editable text after blur
    setEditableLineItem(""); // Clear editable lineItem after blur
    setEditableName(""); // Clear editable name after blur
  };

  const handleNameChange = (e) => {
    setEditableName(e.target.value);
    setIsRxEdited(true);
  };

  const handleNameBlur = (type, index) => {
    const trimmed = (editableName || "").trim();
    const originalName = prescriptionData[type][index]?.name || "";

    // Name is mandatory: if empty, do not update or clear the existing value
    if (!trimmed) {
      // Exit edit mode without changes
      setActiveIndex(null);
      setActiveType(null);
      setEditableName("");
      return;
    }

    // Only update if the value has actually changed
    if (trimmed !== originalName) {
      setPrescriptionData((prevData) => {
        const updatedData = { ...prevData };
        if (updatedData?.[type]?.[index]) {
          updatedData[type][index].name = trimmed;
        }
        return updatedData;
      });
      setIsRxEdited(true);
    }
    // Exit edit mode for name explicitly
    setActiveIndex(null);
    setActiveType(null);
    setEditableName("");
  };

  // Handle click on an item (to edit)
  const handleItemClick = (type, index, isCustom) => {
    if (activeIndex !== null && activeType !== null) {
      handleInputBlur(activeType, activeIndex);
    }

    if (
      type === "symptoms" ||
      type === "medications" ||
      type === "labInvestigation" ||
      type === "examinations" ||
      type === "diagnosis" ||
      type === "medicalHistory" ||
      type === "vaccinations"
    ) {
      setEditableText(prescriptionData[type][index].name);
    } else if (type === "advice" || type === "others") {
      setEditableText(prescriptionData[type][index]);
    } else if (type === "vitalsAndBodyComposition") {
      setEditableText(prescriptionData.vitalsAndBodyComposition[index]);
    } else if (isCustom) {
      setEditableText(prescriptionData.dynamicFields[type][index]);
    } else if (type === "followUp") {
      setEditableText(prescriptionData?.followUp);
    }

    setActiveIndex(index);
    setActiveType(type);
  };

  // Handle click on name/details to edit
  const handleNameClick = (type, index) => {
    setEditableName(prescriptionData[type][index]?.name || "");
    setActiveIndex(index);
    setActiveType(`${type}-name`);
  };

  // Handle click on a lineItem (to edit)
  const handleLineItemClick = (type, index) => {
    if (
      type === "medications" ||
      type === "labInvestigation" ||
      type === "vaccinations" ||
      type === "medicalHistory" ||
      type === "symptoms" ||
      type === "examinations" ||
      type === "diagnosis"
    ) {
      setEditableLineItem(prescriptionData[type][index]?.lineItem);
    }
    setActiveIndex(index);
    setActiveType(`${type}-lineItem`);
  };

  const handleSymptomsUpdate = useCallback((symptomsArray) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      symptoms: symptomsArray,
    }));
    setIsRxEdited(true);
  }, []);

  const handleExaminationsUpdate = useCallback((examinationsArray) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      examinations: examinationsArray,
    }));
    setIsRxEdited(true);
  }, []);

  const handleDiagnosisUpdate = useCallback((diagnosisArray) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      diagnosis: diagnosisArray,
    }));
    setIsRxEdited(true);
  }, []);

  const handleInvestigationUpdate = useCallback((investigationArray) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      labInvestigation: investigationArray,
    }));
    setIsRxEdited(true);
  }, []);

  const handleAdviceUpdate = useCallback((adviceArray) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      advice: adviceArray,
    }));
    setIsRxEdited(true);
  }, []);

  const handleVitalsUpdate = useCallback((vitalsObject) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      vitalsAndBodyComposition: vitalsObject,
    }));
    setIsRxEdited(true);
  }, []);

  const handleMedicalHistoryUpdate = useCallback((medicalHistoryArray) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      medicalHistory: medicalHistoryArray,
    }));
    setIsRxEdited(true);
  }, []);

  const handleFollowUpUpdate = useCallback((followUpText) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      followUp: followUpText,
    }));
    setIsRxEdited(true);
  }, []);

  const handleLabResultsUpdate = useCallback((labResultsArray) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      labResults: labResultsArray,
    }));
    setIsRxEdited(true);
  }, []);

  const handleAdditionalNotesUpdate = useCallback((othersArray) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      others: othersArray,
    }));
    setIsRxEdited(true);
  }, []);

  const handleMedicationsUpdate = useCallback((medicationsArray) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      medications: medicationsArray,
    }));
    setIsRxEdited(true);
  }, []);

  async function onEndVisitClick() {
    if (
      isRxEdited ||
      localModules?.length ||
      (symptomsCollectorData && Object.keys(symptomsCollectorData)?.length > 0)
    )
      handleUpdateGenRX();
    const sendData = {
      action: tcmId === 0 ? "add" : "edit",
      tcm_id: tcmId,
      patient_unique_id:
        patient_data !== undefined ? patient_data.patient_unique_id : 0,
      pam_id:
        patient_data !== undefined
          ? patient_data.hasOwnProperty("pam_id")
            ? patient_data.pam_id
            : pamId
          : 0,
      consultation_date: consultationDate,
      smart_prescription_filename: genRxDetails?._id,
      labReportID: labReportID,
    };

    const action =
      tcmId == 0
        ? await dispatch(addCaseManager(sendData))
        : await dispatch(editCaseManager(sendData));

    if (action.meta.requestStatus === "fulfilled") {
      message.open({
        key: MESSAGE_KEY,
        type: "",
        className: "message-appointment",
        content: (
          <div className="d-flex align-items-center">
            <img src={visitEnd} className="me-3" alt="Visit End Icon" />
            <div>
              <div className="title-common-digitised text-start fontroboto">{`${patient_data?.pm_first_name}'s visit ended successfully.`}</div>
              <div className="fontroboto text-start fw-normal mt-1">
                View completed visits in finished tab.
              </div>
            </div>
            <img
              src={imgCloseVisit}
              className="ms-3"
              alt="Close Visit Icon"
              onClick={() => message.destroy()}
            />
          </div>
        ),
        duration: 5,
      });

      const clinic_name = getClinicName(profile?.hospital_data);
      const deviceSdkData = getDeviceSdkData();
      window.Moengage.track_event("TP_Voice_Submit", {
        doctor_name: profile?.um_name,
        doctor_number: profile?.um_contact,
        doctor_unique_id: profile?.doctor_unique_id,
        doctor_specialty: profile?.dp_name,
        clinic_id: tokenData?.clinic_id,
        um_id: tokenData?.user_id,
        clinic_Name: clinic_name,
        patient_name: patient_data?.pm_first_name,
        patient_unique_id: patient_data?.patient_unique_id,
        ...deviceSdkData,
      });

      if (!isFreeVoiceRxUser && useVoiceRx) {
        let sendData = {
          b2c_id: profile?.b2c,
          service_name: S_VOICE_RX,
        };
        dispatch(updateCredits(sendData));
      }
      if (useDDX) {
        let sendData = {
          b2c_id: profile?.b2c,
          service_name: S_DDX,
        };
        dispatch(updateCredits(sendData));
      }

      if (isAutofillSelected) {
        await setAddToRx({
          _id: symptomCollector?._id,
          addToRx: true,
        });
        dispatch(setSelectAutofill(false));
      }

      if (isGroundingAccessable && patient_data?.departmentId) {
        let sendInvestigationAndMedicine = {
          patient_unique_id:
            patient_data !== undefined ? patient_data.patient_unique_id : 0,
          tcm_id: action?.payload?.tcm_id,
        };
        const actionIM = await dispatch(
          getInvestigationAndMedicine(sendInvestigationAndMedicine)
        );
        if (actionIM.meta.requestStatus === "fulfilled") {
          const quantityActionMedicine = await ApiMedication.getQuantity({
            medicines: prescriptionData?.medications,
          });
          let zydusSendData = {
            action: tcmId == 0 ? "add" : "edit",
            tcmId: action?.payload?.tcm_id,
            siteId: siteId,
            departmentId: patient_data?.departmentId,
            visitId: patient_data?.visitId,
            encounterId: patient_data?.encounterId,
            mrno: patient_data?.mrno,
            doctorCode: patient_data?.employeeId,
            storeCode: storeCode,
            duplicateCheck: 1,
            investigationList:
              prescriptionData?.labInvestigation?.map((item) => item.name) ||
              [],
            medicineList:
              prescriptionData?.medications?.map(({ name, notes }, index) => ({
                name: name,
                quantity: quantityActionMedicine?.medicines?.[index]?.quantity,
                instruction: notes,
              })) || [],
            pillupSwitch: 0,
          };
          await dispatch(placeIctOrder(zydusSendData));
        }
      }

      navigate("/gen-rx-print", {
        replace: true,
        state: {
          ...action.payload,
          patient_data: patient_data,
          page: "prescription",
          rxId: genRxDetails?._id,
        },
      });
    } else {
      errorMessage(action.error);
    }
  }

  const handleKeyEditClick = (key) => {
    setActiveIndex(key);
    setActiveType("vitalsAndBodyComposition-key");
    setEditableKey(key);
  };

  const handleKeyEditBlur = (key) => {
    if (editableKey && editableKey !== key) {
      setPrescriptionData((prevData) => {
        const updatedData = { ...prevData };
        const value = updatedData.vitalsAndBodyComposition[key];
        delete updatedData.vitalsAndBodyComposition[key];
        updatedData.vitalsAndBodyComposition[editableKey] = value;
        return updatedData;
      });
      setIsRxEdited(true);
    }
    setActiveIndex(null);
    setActiveType(null);
    setEditableKey("");
  };

  useEffect(() => {
    const data = [];
    parentOptionsList?.map((e) => {
      return data.push({
        key: JSON.stringify({ ...e, unique_id: uuidv4() }),
        value: e.tmm_medicine_name,
        label: (
          <div>
            <span className="fw-medium">{e.tmm_medicine_name}</span>,{" "}
            <span>{e.tmm_generic}</span>{" "}
            {e?.tmm_hm_type === 1 && e?.um_id === 0 && (
              <span
                className="align-items-center small fs-12-1 d-inline-flex justify-content-center rounded-circle text-white"
                style={{ width: 18, height: 18, background: "#c44ea2" }}
              >
                Z
              </span>
            )}
          </div>
        ),
      });
    });

    if (searchParentQuery.length == 0) {
      data.unshift({
        key: -1,
        label: (
          <>
            <div>SUGGESTED</div>
          </>
        ),
      });
    } else {
      searchParentQuery &&
        data.push({
          key: JSON.stringify({
            unique_id: uuidv4(),
            tmm_id: 0,
            tmm_medicine_name: searchParentQuery,
          }),
          value: searchParentQuery,
          label: (
            <>
              <div className="text-primary fontroboto fs-16">
                {" "}
                <i className="icon-Add mx-1 fs-6"></i> Add{" "}
                <span className="fw-medium fontroboto text-primary">
                  "{searchParentQuery}"
                </span>{" "}
                <a className="text-primary fontroboto">as a new medicine</a>
              </div>
            </>
          ),
        });
    }
    setParentSearchOptions(data);
  }, [parentOptionsList]);

  const onSearchParent = useCallback(
    (query) => {
      setSearchParentQuery(removeBeforeWhiteSpace(query));
    },
    [searchParentQuery, editableName]
  );

  useEffect(() => {
    if (editableName) {
      const timeOutId = setTimeout(() => {
        dispatch(
          searchMedication({
            searchQuery: editableName,
            type: "parent",
          })
        );
      }, 500);
      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [editableName]);

  const handleMedicineSelection = (data, item, type) => {
    if (
      item.key &&
      JSON.parse(item.key).tmm_id === 0 &&
      type === "medications"
    ) {
      setShowAddMedicinePopup(true);
    } else {
      // Check if medicine is not from Zydus Data Engine
      const medicineData = item.key ? JSON.parse(item.key) : null;
      const isZydusMedicine =
        medicineData?.tmm_hm_type === 1 && medicineData?.um_id === 0;

      if (!isZydusMedicine && !dontShowZydusWarning && type === "medications") {
        setPendingSelection({
          data,
          item,
          type,
          activeIndex,
          activeType,
        });
        setShowNonZydusWarning(true);
      } else {
        setEditableName(data);
        // Update the prescriptionData with the selected medicine
        if (activeIndex !== null && activeType === `${type}-name`) {
          setPrescriptionData((prevData) => {
            const updatedData = { ...prevData };
            if (updatedData?.[type]?.[activeIndex]) {
              updatedData[type][activeIndex].name = data;
              // Add complete option data as metadata
              if (item.key) {
                const medicineData = JSON.parse(item.key);
                updatedData[type][activeIndex].metadata = {
                  ...medicineData,
                  selectedValue: data,
                };
              }
            }
            return updatedData;
          });
          setIsRxEdited(true);
          // Clear editing states after selection
          setActiveIndex(null);
          setActiveType(null);
          setEditableName("");
        }
      }
    }
  };

  const renderItems = (type) => {
    const onSelectParent = (data, item) => {
      handleMedicineSelection(data, item, type);
    };

    if (type === "followUp") {
      // Dynamically calculate input width
      let textWidth = 0;
      if (activeType === "followUp") {
        const tempSpan = document.createElement("span");
        tempSpan.style.visibility = "hidden";
        tempSpan.style.position = "absolute";
        tempSpan.style.whiteSpace = "nowrap";
        tempSpan.innerText = editableText || "";
        document.body.appendChild(tempSpan);
        textWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);
      }
      return (
        <div className="digitised-section">
          {isProcessing ? (
            <div className="shimmer-container">
              <div className="shimmer"></div>
            </div>
          ) : (
            <div className="medicine-item">
              {activeType === "followUp" ? (
                <input
                  type="text"
                  value={editableText}
                  className="editable-digitised-item"
                  onChange={handleInputChange}
                  onBlur={() => handleInputBlur("followUp")}
                  autoFocus
                  style={{ width: `clamp(12px, ${textWidth + 10}px, 100%)` }}
                />
              ) : (
                <span
                  onClick={() => handleItemClick("followUp")}
                  className="digitised-item"
                >
                  {prescriptionData?.followUp}
                </span>
              )}
            </div>
          )}
        </div>
      );
    }
    if (type === "vitalsAndBodyComposition") {
      return (
        <div className="digitised-section">
          {isProcessing ? (
            <div className="shimmer-container">
              <div className="shimmer"></div>
            </div>
          ) : (
            <ul>
              {Object.entries(prescriptionData.vitalsAndBodyComposition || {})
                .filter(([key, value]) => value)
                .map(([key, value]) => {
                  // Dynamically calculate input width
                  let textWidth = 0;
                  if (
                    activeIndex === key &&
                    activeType === "vitalsAndBodyComposition"
                  ) {
                    const tempSpan = document.createElement("span");
                    tempSpan.style.visibility = "hidden";
                    tempSpan.style.position = "absolute";
                    tempSpan.style.whiteSpace = "nowrap";
                    tempSpan.innerText = editableText || "";
                    document.body.appendChild(tempSpan);
                    textWidth = tempSpan.offsetWidth;
                    document.body.removeChild(tempSpan);
                  }

                  return (
                    <li key={key}>
                      <div className="medicine-item">
                        <span className="digitised-item">
                          {/* Format the key to be human-readable */}
                          {activeIndex === key &&
                          activeType === "vitalsAndBodyComposition-key" ? (
                            <input
                              type="text"
                              value={editableKey || key}
                              className="editable-digitised-item"
                              onChange={(e) => setEditableKey(e.target.value)}
                              onBlur={() => handleKeyEditBlur(key)}
                              autoFocus
                              style={{
                                width: `clamp(12px, ${
                                  (editableKey || key).length * 8 + 20
                                }px, 100%)`,
                              }}
                            />
                          ) : (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                handleKeyEditClick(key);
                              }}
                              className="digitised-item digitised-key-item"
                              style={{ cursor: "pointer", fontWeight: 500 }}
                            >
                              {`${key}: `}
                            </span>
                          )}
                        </span>
                        {activeIndex === key &&
                        activeType === "vitalsAndBodyComposition" ? (
                          <input
                            type="text"
                            value={editableText} // Pre-fill the input with the current value
                            className="editable-digitised-item"
                            onChange={(e) => setEditableText(e.target.value)}
                            onBlur={() => handleInputBlur(type, key)}
                            autoFocus
                            style={{
                              width: `clamp(12px, ${textWidth + 10}px, 100%)`,
                            }} // Add padding for better UX
                          />
                        ) : (
                          <span
                            onClick={() => handleItemClick(type, key)}
                            className="digitised-item"
                          >
                            {value}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      );
    }

    // Handle other types dynamically (like medications, symptoms, etc.)
    return (
      <div className="digitised-section">
        {isProcessing ? (
          <div className="shimmer-container">
            <div className="shimmer"></div>
          </div>
        ) : (
          Array.isArray(prescriptionData[type]) &&
          prescriptionData[type].length > 0 && (
            <ul>
              {prescriptionData[type].map((item, index) => {
                // Measure the width of the editable text
                let textWidth = 0;
                let lineItemWidth = 0;
                let nameWidth = 0;

                // For name or other primary data (editableText)
                if (activeIndex === index && activeType === type) {
                  const tempSpan = document.createElement("span");
                  tempSpan.style.visibility = "hidden";
                  tempSpan.style.position = "absolute";
                  tempSpan.style.whiteSpace = "nowrap";
                  tempSpan.innerText = editableText || "";
                  document.body.appendChild(tempSpan);
                  textWidth = tempSpan.offsetWidth;
                  document.body.removeChild(tempSpan);
                }

                // For lineItem (editableLineItem)
                if (
                  activeIndex === index &&
                  activeType === `${type}-lineItem`
                ) {
                  const tempSpanLineItem = document.createElement("span");
                  tempSpanLineItem.style.visibility = "hidden";
                  tempSpanLineItem.style.position = "absolute";
                  tempSpanLineItem.style.whiteSpace = "nowrap";
                  tempSpanLineItem.innerText = editableLineItem || "";
                  document.body.appendChild(tempSpanLineItem);
                  lineItemWidth = tempSpanLineItem.offsetWidth;
                  document.body.removeChild(tempSpanLineItem);
                }

                // For name width when editing name
                if (activeIndex === index && activeType === `${type}-name`) {
                  const tempSpanName = document.createElement("span");
                  tempSpanName.style.visibility = "hidden";
                  tempSpanName.style.position = "absolute";
                  tempSpanName.style.whiteSpace = "nowrap";
                  tempSpanName.innerText = editableName || item?.name || "";
                  document.body.appendChild(tempSpanName);
                  nameWidth = tempSpanName.offsetWidth;
                  document.body.removeChild(tempSpanName);
                }

                return (
                  <li key={index}>
                    <div className="medicine-item">
                      {activeIndex === index &&
                      activeType === type &&
                      ["advice", "others"].includes(type) ? (
                        <input
                          type="text"
                          value={editableText}
                          className="editable-digitised-item"
                          onChange={handleInputChange}
                          onBlur={() => handleInputBlur(type, index)}
                          onKeyDown={(e) => handleKeyDown(e, type, index, true)}
                          autoFocus
                          style={{
                            width: `clamp(12px, ${textWidth + 10}px, 100%)`,
                          }}
                        />
                      ) : (
                        ["advice", "others"].includes(type) && (
                          <span
                            onClick={() => handleItemClick(type, index)}
                            className="digitised-item"
                          >
                            {item}
                          </span>
                        )
                      )}

                      {/* Special handling for medications and labInvestigation with dual inputs */}
                      {(type === "medications" ||
                        type === "labInvestigation") &&
                        (activeIndex === index &&
                        (activeType === `${type}-lineItem` ||
                          activeType === `${type}-name`) ? (
                          <div className="d-flex gap-2 align-items-center">
                            {activeType === `${type}-name` ? (
                              <>
                                <AutoComplete
                                  value={editableName}
                                  onSearch={onSearchParent}
                                  options={parentSearchOptions}
                                  className="autocomplete-custom grounding-select"
                                  popupClassName="grounding-boxpopup grounding-select"
                                  onSelect={onSelectParent}
                                  defaultActiveFirstOption={true}
                                  autoFocus={true}
                                  popupMatchSelectWidth={false}
                                  dropdownStyle={{ width: 420 }}
                                >
                                  <input
                                    type="text"
                                    value={editableName}
                                    className="editable-digitised-item"
                                    onChange={handleNameChange}
                                    onBlur={() => handleNameBlur(type, index)}
                                    onKeyDown={(e) =>
                                      handleKeyDown(e, type, index, true)
                                    }
                                    autoFocus
                                    style={{
                                      width: `clamp(12px, ${
                                        nameWidth + 10
                                      }px, 100%)`,
                                    }}
                                  />
                                </AutoComplete>
                                <span className="digitised-item">
                                  {item.lineItem}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="digitised-item">{`${item.name}`}</span>
                                <input
                                  type="text"
                                  value={editableLineItem}
                                  className="editable-digitised-item"
                                  onChange={handleLineItemChange}
                                  onBlur={() =>
                                    handleInputBlur(type, index, false, true)
                                  }
                                  onKeyDown={(e) =>
                                    handleKeyDown(e, type, index, true)
                                  }
                                  autoFocus
                                  style={{
                                    width: `clamp(12px, ${
                                      lineItemWidth + 10
                                    }px, 100%)`,
                                  }}
                                />
                              </>
                            )}
                          </div>
                        ) : (
                          <>
                            <span
                              onClick={() => handleNameClick(type, index)}
                              className="digitised-item"
                            >
                              {`${item.name}`}
                            </span>
                            <span
                              onClick={() => handleLineItemClick(type, index)}
                              className="digitised-item"
                            >
                              {item.lineItem !== undefined
                                ? item.lineItem
                                : `(${item.dosage ?? ""} ${
                                    item.duration ?? ""
                                  } ${item.frequency ?? ""} ${
                                    item.schedule ?? ""
                                  } ${item.notes ?? ""})`}
                            </span>
                          </>
                        ))}

                      {/* Editable input for lineItem for other types */}
                      {(type === "symptoms" ||
                        type === "vaccinations" ||
                        type === "medicalHistory" ||
                        type === "examinations" ||
                        type === "diagnosis") &&
                        item?.lineItem &&
                        (activeIndex === index &&
                        activeType === `${type}-lineItem` ? (
                          <input
                            type="text"
                            value={editableLineItem}
                            className="editable-digitised-item"
                            onChange={handleLineItemChange}
                            onBlur={() =>
                              handleInputBlur(type, index, false, true)
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(e, type, index, true)
                            }
                            ref={(el) =>
                              (inputLineItemRefs.current[index] = el)
                            }
                            autoFocus
                            style={{
                              width: `clamp(12px, ${
                                lineItemWidth + 10
                              }px, 100%)`,
                            }}
                          />
                        ) : (
                          <span
                            onClick={() => handleLineItemClick(type, index)}
                            className="digitised-item"
                          >
                            {item.lineItem}
                          </span>
                        ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          )
        )}
      </div>
    );
  };

  const toggleDeleteModuleModal = useCallback(() => {
    setIsDeleteModuleModalOpen(!isDeleteModuleModalOpen);
  }, [isDeleteModuleModalOpen]);

  const DELETE_MODULE_MODAL = useMemo(() => {
    return (
      <CommonModal
        isModalOpen={isDeleteModuleModalOpen}
        onCancel={toggleDeleteModuleModal}
        modalWidth={550}
        title={"Are you sure you want to delete this module?"}
        modalBody={
          <>
            <div className="d-flex align-items-start alert-warning rounded-10px p-3 patient-details">
              <img className="me-3" src={alertIcon} alt="Warning" />
              <span>
                This action will permanently delete the {moduleToDelete} and
                cannot be undone. Please confirm to proceed
              </span>
            </div>
            <div className="mt-4">
              <div className="d-flex align-items-center mt-2 justify-content-end">
                <div
                  onClick={() => {
                    handleDeleteModule();
                    toggleDeleteModuleModal();
                  }}
                  className="me-4 text-decoration-underline btn p-0 text-main"
                >
                  Yes, Delete
                </div>
                <Button
                  onClick={toggleDeleteModuleModal}
                  className="lh-lg btn btn-primary3 btn-41 px-4"
                >
                  <span>No</span>
                </Button>
              </div>
            </div>
          </>
        }
      />
    );
  }, [isDeleteModuleModalOpen]);

  const renderCustomModules = () => {
    return Object.entries(prescriptionData?.dynamicFields || {}).map(
      ([module, data]) => {
        return (
          Array.isArray(data) &&
          data?.every((item) => typeof item === "string") && (
            <>
              {editingModule === module ? (
                <div className="d-flex justify-content-between mb-4">
                  <Input
                    placeholder="Enter custom module name"
                    value={updatedModuleName}
                    onChange={(e) => setUpdatedModuleName(e.target.value)}
                    className="custom-module-input"
                  />
                  <>
                    <CheckOutlined
                      className="input-action-icon tick-icon"
                      onClick={() => handleEditModule(module)}
                    />
                    <CloseOutlined
                      className="input-action-icon cross-icon"
                      onClick={handleCancelEdit}
                    />
                  </>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center title-digitise-section mb-2">
                    {localModules?.includes(module)
                      ? module
                      : module
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                    {localModules?.includes(module) && (
                      <i
                        className={`icon-Edit fs-21 ms-2 cursor-pointer`}
                        onClick={() => {
                          setEditingModule(module);
                          setUpdatedModuleName(module);
                        }}
                      ></i>
                    )}
                  </div>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item
                          key="delete"
                          onClick={() => {
                            setModuleToDelete(module);
                            toggleDeleteModuleModal();
                          }}
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#ff4d4f",
                            padding: "8px 12px",
                          }}
                        >
                          <img
                            src={deleteModuleIcon}
                            width={16}
                            height={16}
                            alt="edit"
                            style={{ margin: "0 8px 3px 0" }}
                          />
                          Delete{" "}
                          {localModules?.includes(module)
                            ? module
                            : module
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}{" "}
                          Module
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <i className={`icon-More fs-21 cursor-pointer`}></i>
                  </Dropdown>
                </div>
              )}
              <div className="digitised-section">
                {isProcessing ? (
                  <div className="shimmer-container">
                    <div className="shimmer"></div>
                  </div>
                ) : data.length > 0 ? (
                  <ul>
                    {data.map((item, index) => {
                      // Measure the width of the editable text
                      let textWidth = 0;
                      let lineItemWidth = 0;

                      // For name or other primary data (editableText)
                      if (activeIndex === index && activeType === module) {
                        const tempSpan = document.createElement("span");
                        tempSpan.style.visibility = "hidden";
                        tempSpan.style.position = "absolute";
                        tempSpan.style.whiteSpace = "nowrap";
                        tempSpan.innerText = editableText || "";
                        document.body.appendChild(tempSpan);
                        textWidth = tempSpan.offsetWidth || 200;
                        document.body.removeChild(tempSpan);
                      }

                      // For lineItem (editableLineItem)
                      if (
                        activeIndex === index &&
                        activeType === `${module}-lineItem`
                      ) {
                        const tempSpanLineItem = document.createElement("span");
                        tempSpanLineItem.style.visibility = "hidden";
                        tempSpanLineItem.style.position = "absolute";
                        tempSpanLineItem.style.whiteSpace = "nowrap";
                        tempSpanLineItem.innerText = editableLineItem || "";
                        document.body.appendChild(tempSpanLineItem);
                        lineItemWidth = tempSpanLineItem.offsetWidth;
                        document.body.removeChild(tempSpanLineItem);
                      }

                      return (
                        <li key={index}>
                          <div className="medicine-item">
                            {activeIndex === index && activeType === module ? (
                              <input
                                type="text"
                                value={editableText}
                                className="editable-digitised-item"
                                onChange={handleInputChange}
                                onBlur={() =>
                                  handleInputBlur(module, index, true)
                                }
                                autoFocus
                                style={{
                                  width: `clamp(12px, ${
                                    textWidth + 10
                                  }px, 100%)`,
                                }}
                                onPaste={(e) => handlePaste(e, module)}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, module, index)
                                }
                                ref={(el) => (inputRefs.current[index] = el)}
                              />
                            ) : (
                              <span
                                onClick={() =>
                                  handleItemClick(module, index, true)
                                }
                                className="digitised-item"
                              >
                                {item}
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <textarea
                    type="text"
                    className="editable-digitised-item w-100"
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur(module, 0, true)}
                    style={{ border: "none" }}
                    rows={3}
                    placeholder={`Enter ${module} details here`}
                    onPaste={(e) => handlePaste(e, module)}
                    onKeyDown={(e) => handleKeyDown(e, module, 0)}
                  />
                )}
              </div>
            </>
          )
        );
      }
    );
  };

  const handleAddModule = () => {
    if (!newModuleName?.trim()) return;
    setPrescriptionData((prevData) => {
      const updatedData = { ...prevData };
      if (!updatedData["dynamicFields"]) {
        updatedData["dynamicFields"] = {};
      }
      // Add the new module to dynamicFields
      updatedData["dynamicFields"][newModuleName] = [];

      return updatedData;
    });

    // Track the new module name
    setLocalModules((prevModules) => [...prevModules, newModuleName]);
    handleCancel();
  };

  const handleEditModule = (module) => {
    if (updatedModuleName?.trim() && updatedModuleName !== module) {
      setPrescriptionData((prevData) => {
        const updatedData = {
          ...prevData,
          dynamicFields: { ...prevData.dynamicFields },
        };

        updatedData.dynamicFields[updatedModuleName] =
          updatedData.dynamicFields[module];

        delete updatedData.dynamicFields[module];

        return updatedData;
      });

      setLocalModules((prevModules) =>
        prevModules.map((mod) => (mod === module ? updatedModuleName : mod))
      );
    }
    handleCancelEdit();
  };

  const handleDeleteModule = () => {
    setPrescriptionData((prevData) => {
      const updatedData = {
        ...prevData,
        dynamicFields: { ...prevData.dynamicFields },
      };

      delete updatedData.dynamicFields[moduleToDelete];

      return updatedData;
    });
    setIsRxEdited(true);
  };

  const handleCancelEdit = () => {
    setEditingModule("");
    setUpdatedModuleName("");
  };

  const handleCancel = () => {
    setShowInput(false);
    setNewModuleName("");
  };

  const checkDataFillOrNot = () => {
    if (prescriptionData) {
      showHideBackModal();
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    onClose();
    // Navigate to Voice Rx Consult page
    navigate("/voice-rx-consult", {
      state: {
        patient_data,
      },
    });
  };

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      open={visible}
      className={`${styles.consultationDrawer} bg-body`}
      closeIcon={false}
      width={showPrescription ? "100%" : "750px"}
      mask={!genRxKnowMoreDrawer}
    >
      <Suspense
        fallback={
          <Spin className="d-flex justify-content-center align-items-center mt-5" />
        }
      >
        <>
          <div className="modalCard-header h-60 align-items-center justify-content-between d-flex position-sticky top-0 z-2">
            <div className="align-items-center d-flex h-100">
              <div className="border-end h-100 text-center me-3">
                <div
                  onClick={checkDataFillOrNot}
                  className="btn-headerback align-items-center d-flex h-100 justify-content-around cursor-pointer"
                >
                  <i className="icon-right"></i>
                </div>
              </div>
                <ProfilePopover patient_data={patient_data} isPrescriptionPage />
                {mode && (
                  <div className={styles.modeIndicator}>
                    {mode === 'dictation' ? (
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
                )}
            </div>
            <div className="d-flex align-items-center gap-2">
              {isGroundingAccessable && (
                <button
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "4px 14px",
                    borderRadius: 16,
                    background: "#F7F1FF",
                    border: "1px solid #E6D8FF",
                    color: "#A461D8",
                    height: "41px",
                  }}
                >
                  <img
                    src={zydusDataEngineIcon}
                    alt="zydus-data-engine"
                    width={28}
                    height={28}
                    style={{ marginRight: 8 }}
                  />
                  <div className="d-flex flex-column">
                    <span
                      className="grouding-color fs-10"
                      style={{ lineHeight: "12px" }}
                    >
                      Powered by
                    </span>
                    <span
                      className="grouding-color fs-16 semi-bold-text"
                      style={{ lineHeight: "20px" }}
                    >
                      Zydus Data Engine
                    </span>
                  </div>
                  <Tooltip
                    placement="bottomRight"
                    overlayClassName="groundingTooltip"
                    title={
                      <div style={{ padding: "12px" }}>
                        <div>
                          <span
                            className="semi-bold-text fs-21"
                            style={{ lineHeight: "18px" }}
                          >
                            Zydus Data Engine
                          </span>
                          <img
                            className="img-fluid"
                            width={39}
                            height={16}
                            style={{ marginLeft: 10, marginBottom: 5 }}
                            src={tagNew}
                            alt={"new-gif"}
                          />
                        </div>
                        <Divider style={{ margin: "15px 0px" }} />
                        <div>
                          <span>What is Zydus Data Engine?</span>
                          <span>
                            With a curated list of{" "}
                            <span className="semi-bold-text">medicines</span>{" "}
                            and{" "}
                            <span className="semi-bold-text">lab tests</span>
                            from the{" "}
                            <span className="semi-bold-text">
                              Zydus Data Engine
                            </span>
                            , our AI adapts to your prescribing style, surfacing
                            the most
                            <span className="semi-bold-text">
                              relevant suggestions
                            </span>{" "}
                            while you prescribe, and helps to
                          </span>
                          <div className="d-flex align-items-center gap-3 mt-3">
                            <div
                              className="d-flex align-items-center gap-1 p-2 rounded-20px fs-12"
                              style={{ background: "rgba(220, 186, 246, 0.4)" }}
                            >
                              <img src={healthIcon} alt="health-icon" />
                              Boosting Patient Fulfilment
                              <img src={growIcon} alt="grow-icon" />
                            </div>
                            <div
                              className="d-flex align-items-center gap-1 p-2 rounded-20px fs-12"
                              style={{ background: "rgba(220, 186, 246, 0.4)" }}
                            >
                              <img src={accuracyIcon} alt="accuracy-icon" />
                              Improve Rx Accuracy by{" "}
                              <span className="semi-bold-text">80%</span>
                            </div>
                          </div>

                          <div
                            style={{
                              width: "503px",
                              height: "239px",
                              marginTop: "12px",
                            }}
                          >
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                background: `url(${videoLink.thumbnail})`,
                                width: "503px",
                                height: "239px",
                                borderRadius: 24,
                                cursor: "pointer",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                              }}
                              onClick={() => setShowVideo(true)}
                            >
                              <img
                                width={55}
                                height={55}
                                src={playIcons}
                                alt="play-icon"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <i className="icon-info fs-21" />
                  </Tooltip>
                </button>
              )}
              <button
                className="btn d-flex align-items-center btn-text me-10 tutorial"
                onClick={() => setGenRxKnowMoreDrawer(true)}
              >
                <span className="text-decoration-none rounded-5 pe-3 bg-white shadow2">
                  <img height={42} src={tutorialIcon} alt="Tutorial" />
                  Tutorial
                </span>
              </button>

              {!isFreeVoiceRxUser && (
                <FreeTrialButton
                  title={S_VOICE_RX}
                  showHideSubModal={showHideSubModal}
                />
              )}

              {showPrescription && (
                <Button
                  type="button"
                  className="btn align-items-center d-flex btn-41 btn-primary3 me-20"
                  onClick={onEndVisitClick}
                  disabled={!prescriptionData}
                >
                  <i className="icon-exit me-2"></i>
                  End Visit
                </Button>
              )}
            </div>
          </div>
          {showSCBanner && !showPrescription && (
            <div style={{ margin: "20px 30px" }}>
              <SCBanner handleBanner={() => setShowSCBanner(false)} />
            </div>
          )}
          <div
            className={!showPrescription ? styles.gradientBorder : ""}
            style={{ background: !showPrescription ? `url(${genRxBg})` : "" }}
          >
            <div className={styles.container}>
              {!showPrescription ? (
                <>
                  <div style={{ padding: 24 }}>
                    <h1 className={styles.title}>
                      Start your consultation with the patient
                    </h1>
                    <div className={styles.subtitle}>
                      Dictate the complete prescription effortlessly
                    </div>
                  </div>
                  {!isTyping && !isRecording && <GenRxTips />}

                  {isRecording ? (
                    <div
                      className={styles.recordingContainer}
                      style={{ marginLeft: 20, marginBottom: 20 }}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <span>{formatTime(recordingTime)}</span>
                        <VoiceWaveVisualizer
                          isRecording={isRecording}
                          isPaused={isPaused}
                        />
                        <div className={styles.controlButtons}>
                          {isPaused ? (
                            <button
                              className={styles.micBtn}
                              onClick={handlePauseResume}
                            >
                              <img src={micIcon} alt="resume" />
                            </button>
                          ) : (
                            <div onClick={handlePauseResume} role="button">
                              <img src={pauseIcon} alt="pause" />
                            </div>
                          )}
                          <div
                            role="button"
                            onClick={handleSend}
                            style={{ width: 32 }}
                          >
                            <img src={genRxSendCta} alt="send" />
                          </div>
                        </div>
                      </div>
                      <div className={styles.controlButtons}>
                        <div
                          role="button"
                          onClick={handleStopRecording}
                          className={styles.deleteButton}
                        >
                          <img src={deleteIcon} alt="delete" />
                        </div>
                        <span className={styles.recordingStatus}>
                          {isPaused
                            ? "Tap on the mic to continue recording!"
                            : "Listening..."}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {!isTyping && (
                        <div className={styles.tapToSpeak}>
                          <div
                            role="button"
                            className={styles.animatedButton}
                            onClick={handleStartRecording}
                          >
                            <DotLottieReact
                              src={tatvaAiChakra}
                              loop
                              autoplay
                              style={{ width: "150px", height: "105px" }}
                            />
                          </div>
                          <p className={styles.tapText}>Tap to Speak</p>
                        </div>
                      )}
                      <div style={{ padding: "24px 15px" }}>
                        <div className={styles.inputContainerChat}>
                          <TextArea
                            ref={textAreaRef}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            onClick={() => setIsTyping(true)}
                            onBlur={() =>
                              setTimeout(() => setIsTyping(false), 200)
                            }
                            placeholder={isTyping ? "" : "Or type here instead"}
                            className={styles.textArea}
                            autoSize={{ minRows: 1, maxRows: 6 }}
                          />
                          {isTyping && (
                            <div className={styles.controls}>
                              <div
                                role="button"
                                onMouseDown={handleStartRecording}
                                onTouchStart={handleStartRecording}
                              >
                                <img src={genRxRecordIcon} alt="MIC" />
                              </div>
                              <div
                                role="button"
                                onMouseDown={handleSend}
                                onTouchStart={handleSend}
                                style={{ width: 32 }}
                              >
                                <img src={genRxSendCta} alt="send" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div
                  className={`${styles.splitView} w-100`}
                  ref={splitRef}
                  style={{
                    padding: 24,
                    "--divider-left": `${leftWidthPercent}%`,
                  }}
                >
                  <div
                    className={styles.inputSection}
                    style={{ width: `${leftWidthPercent}%` }}
                  >
                    <div>
                      <img src={documentIcon} alt="Document" />
                      <span className={styles.heading}>Your input</span>
                    </div>
                    <div className={styles.chatSection}>
                      {isProcessing ? (
                        <BubbleSkeleton />
                      ) : (
                        <>
                          {(isAmbientMode || (!isAmbientMode && ((Array.isArray(queries) && queries.length > 0) || !!fullTranscript))) && (
                            <div className="d-flex align-items-start gap-2 mt-3" style={{ padding: '0 5px' }}>
                              <img src={doctorAvatar} alt="doctor" width={36} height={36} style={{ borderRadius: 18 }} />
                              <div className={styles.prescriptionReadyMessage}>
                                Your <strong>Rx is ready</strong>! You can review it in the <strong>Rx Pad</strong>. You can also make changes using <strong>VoiceRx</strong> or by simply <strong>typing below</strong>!
                                      </div>
                                    </div>
                                  )}
                          <div className={styles.inputContainer}>
                            <div className={styles.inputQueries}>
                              {null}
                            </div>
                          </div>
                          {isRecording ? (
                            <div className={styles.bottomCenterBar}>
                              <div className={styles.recBar}>
                                {/* Delete Button */}
                                <button className={styles.deleteButton} onClick={handleStopRecording}>
                                  <img src={stopIcon} alt="stop" className={styles.stopIcon} />
                                </button>
                                
                                {/* Pause/Resume Button */}
                                <button className={styles.pauseButton} onClick={handlePauseResume}>
                                  <img src={muteIcon} alt={isPaused ? "resume" : "pause"} className={styles.muteIcon} />
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
                                <img src={ellipse895} alt="Gradient" className={styles.gradientEllipse} />
                                <div className={styles.listeningText}>I'm Listening...</div>
                              </div>
                            </div>
                          ) : (
                            <div className={styles.curvedInputContainer}>
                              <div className={styles.curvedInputWrapper}>
                                <TextArea
                                  ref={textAreaRef}
                                  value={inputText}
                                  onChange={(e) => setInputText(e.target.value)}
                                  onKeyDown={handleKeyPress}
                                  onClick={() => setIsTyping(true)}
                                  onBlur={() => setIsTyping(false)}
                                  placeholder={"Start Typing Rx..."}
                                  className={styles.curvedTextInput}
                                  autoSize={{ minRows: 1, maxRows: 6 }}
                                />
                                <img 
                                  src={voiceRxButton}
                                  alt="Voice Rx"
                                  onClick={handleStartRecording}
                                  style={{ cursor: 'pointer', minWidth: '112px', maxWidth: '159.99989318847656px', height: '41px', flexShrink: 0 }}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className={styles.prescriptionSection}
                    style={{ width: `${100 - leftWidthPercent}%` }}
                  >
                    {!isProcessing && (
                      <div>
                        <img src={documentIcon} alt="Document" />
                        <span className={styles.heading}>
                          Generated Digitised Rx
                        </span>
                      </div>
                    )}
                    {isProcessing ? (
                      <GenRXLoaders
                        isProcessing={isProcessing}
                        showAbsHeaderInsideLoader={true}
                      />
                    ) : (
                      <div
                        className={`${styles.rightSection} ${
                          isProcessing ? styles.gradientBorder : ""
                        }`}
                        style={{
                          background: isProcessing ? `url(${genRxBg})` : "",
                        }}
                      >
                        {showInstructionMessage && (
                          <div className={styles.rxPadInstruction}>
                            <div className={styles.instructionIcon}>
                              <img src={require("../assets/images/danger.svg").default} alt="Warning" className={styles.dangerIcon} />
                            </div>
                            <div className={styles.instructionText}>
                              Dictate the Rx or start a conversation with Ambient Rx — I'll auto-magically fill these below Rx details so you can stay focused on the patient.
                            </div>
                            <button 
                              className={styles.closeButton}
                              onClick={() => setShowInstructionMessage(false)}
                              aria-label="Close instruction message"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        )}
                        
                        {prescriptionData?.vitalsAndBodyComposition &&
                          typeof prescriptionData.vitalsAndBodyComposition === 'object' && 
                          prescriptionData.vitalsAndBodyComposition !== null && 
                          Object.values(prescriptionData.vitalsAndBodyComposition).some(value => 
                            value !== undefined && value !== null && value !== ''
                          ) && (
                            <VitalsRichTextEditor
                              vitalsAndBodyComposition={prescriptionData.vitalsAndBodyComposition}
                              onUpdate={handleVitalsUpdate}
                              isProcessing={isProcessing}
                            />
                          )}

                        {prescriptionData?.medicalHistory &&
                          Array.isArray(prescriptionData.medicalHistory) && 
                          prescriptionData.medicalHistory.length > 0 && (
                            <MedicalHistoryRichTextEditor
                              medicalHistory={prescriptionData.medicalHistory}
                              onUpdate={handleMedicalHistoryUpdate}
                              isProcessing={isProcessing}
                            />
                          )}

                        {prescriptionData?.symptoms &&
                          Array.isArray(prescriptionData.symptoms) && 
                          prescriptionData.symptoms.length > 0 && (
                            <SymptomsRichTextEditor
                              symptoms={prescriptionData.symptoms}
                              onUpdate={handleSymptomsUpdate}
                              isProcessing={isProcessing}
                            />
                          )}

                        {prescriptionData?.examinations &&
                          Array.isArray(prescriptionData.examinations) && 
                          prescriptionData.examinations.length > 0 && (
                            <ExaminationRichTextEditor
                              examinations={prescriptionData.examinations}
                              onUpdate={handleExaminationsUpdate}
                              isProcessing={isProcessing}
                            />
                          )}

                        {prescriptionData?.diagnosis &&
                          Array.isArray(prescriptionData.diagnosis) && 
                          prescriptionData.diagnosis.length > 0 && (
                            <DiagnosisRichTextEditor
                              diagnosis={prescriptionData.diagnosis}
                              onUpdate={handleDiagnosisUpdate}
                              isProcessing={isProcessing}
                            />
                          )}

                        {prescriptionData?.medications &&
                          Array.isArray(prescriptionData.medications) && 
                          prescriptionData.medications.length > 0 && (
                            <MedicationsTable
                              medications={prescriptionData.medications}
                              onUpdate={handleMedicationsUpdate}
                              isProcessing={isProcessing}
                            />
                          )}

                        {prescriptionData?.labInvestigation &&
                          Array.isArray(prescriptionData.labInvestigation) && 
                          prescriptionData.labInvestigation.length > 0 && (
                            <LabInvestigationTable
                              labInvestigation={prescriptionData.labInvestigation}
                              onUpdate={handleInvestigationUpdate}
                              isProcessing={isProcessing}
                            />
                          )}

                        {prescriptionData?.labResults &&
                          Array.isArray(prescriptionData.labResults) && 
                          prescriptionData.labResults.length > 0 && (
                            <LabResultsRichTextEditor
                              labResults={prescriptionData.labResults}
                              onUpdate={handleLabResultsUpdate}
                              isProcessing={isProcessing}
                            />
                          )}

                        {prescriptionData?.advice &&
                          typeof prescriptionData.advice === 'string' && 
                          prescriptionData.advice.trim() && (
                            <AdviceRichTextEditor
                              advice={prescriptionData.advice}
                              onUpdate={handleAdviceUpdate}
                              isProcessing={isProcessing}
                            />
                          )}

                        {prescriptionData?.vaccinations &&
                          prescriptionData.vaccinations.length > 0 && (
                            <>
                              <div className="title-digitise-section mb-2">
                                Vaccination
                              </div>
                              {renderItems("vaccinations")}
                            </>
                          )}
                        {prescriptionData?.others &&
                          Array.isArray(prescriptionData.others) && 
                          prescriptionData.others.length > 0 && (
                            <AdditionalNotesRichTextEditor
                              others={prescriptionData.others}
                              onUpdate={handleAdditionalNotesUpdate}
                              isProcessing={isProcessing}
                            />
                          )}
                        {prescriptionData?.followUp &&
                          typeof prescriptionData.followUp === 'string' && 
                          prescriptionData.followUp.trim() && (
                            <FollowUpRichTextEditor
                              followUp={prescriptionData.followUp}
                              onUpdate={handleFollowUpUpdate}
                              isProcessing={isProcessing}
                            />
                          )}
                        {showInput && (
                          <>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <Input
                                placeholder="Enter custom module name"
                                value={newModuleName}
                                onChange={(e) =>
                                  setNewModuleName(e.target.value)
                                }
                                className="custom-module-input"
                              />
                              <>
                                <CheckOutlined
                                  className="input-action-icon tick-icon"
                                  onClick={handleAddModule}
                                />
                                <CloseOutlined
                                  className="input-action-icon cross-icon"
                                  onClick={handleCancel}
                                />
                              </>
                            </div>
                            <div className="genRxCustomModuleBox"></div>
                          </>
                        )}
                        <div
                          className="cta-container mt-4 mb-4"
                          onClick={() => setShowInput(true)}
                        >
                          <Button
                            type="link"
                            icon={<PlusOutlined />}
                            className="add-custom-module-link"
                          >
                            Add Custom Module
                          </Button>
                        </div>
                        <div className={styles.disclaimer}>
                          <span style={{ fontWeight: 500 }}>Disclaimer:</span>{" "}
                          Our AI model aims to be accurate, but sometimes it
                          might make mistakes. Please double-check all details
                          to ensure they are correct and complete.
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={styles.dividerHandle}
                    onMouseDown={startResizing}
                  >
                    <div className={styles.dividerKnob}>
                      <div className={styles.dividerDots} />
                    </div>
                  </div>
                </div>
              )}
              {DELETE_MODULE_MODAL}
              <CommonModal
                isModalOpen={isBackModalOpen}
                onCancel={showHideBackModal}
                modalWidth={500}
                title={"You may lose your data"}
                modalBody={
                  <>
                    <div className="alert-warning rounded-10px p-2 patient-details">
                      <div className="d-flex align-items-center">
                        <img className="me-3" src={alertIcon} alt="Warning" />
                        <span>
                          Are you sure you want to leave? <br />
                          You will permanently lose your data.
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex align-items-center mt-2 justify-content-end">
                        <div
                          onClick={handleBack}
                          className="me-4 text-decoration-underline btn p-0 text-main"
                        >
                          Yes Leave
                        </div>
                        <Button
                          onClick={showHideBackModal}
                          className="lh-lg btn btn-primary3 btn-41 px-4"
                        >
                          <span>No, Stay</span>
                        </Button>
                      </div>
                    </div>
                  </>
                }
              />
            </div>
          </div>
        </>
      </Suspense>

      {!isFreeVoiceRxUser && visible && (
        <ExpiredSubModal
          title={S_VOICE_RX}
          styles={{
            mask: {
              marginLeft: showPrescription ? 0 : window.innerWidth - 640,
              marginTop: 60,
              background: "rgba(0, 0, 0, 0.28)",
              backdropFilter: "blur(2px)",
            },
            wrapper: {
              marginLeft: showPrescription ? 0 : window.innerWidth - 640,
              marginTop: 60,
              background: "rgba(0, 0, 0, 0.28)",
            },
          }}
          isSubModalOpen={isSubModalOpen}
          showHideSubModal={showHideSubModal}
        />
      )}

      {shouldShowVideo && (
        <VideoModal
          videoLink={videoLink}
          onCancel={() => setShowVideo(false)}
        />
      )}

      {showAddMedicinePopup && (
        <CustomMedicinePopup
          isOpen={showAddMedicinePopup}
          onCancel={() => setShowAddMedicinePopup(false)}
          initialData={{ tmm_medicine_name: searchParentQuery }}
        />
      )}

      <CommonModal
        isModalOpen={showNonZydusWarning}
        onCancel={() => {
          setShowNonZydusWarning(false);
          setPendingSelection(null);
        }}
        modalWidth={550}
        title={"Not in Zydus Data Engine"}
        modalBody={
          <>
            <div className="alert-warning rounded-10px p-3">
              <div className="d-flex align-items-start">
                <i
                  className="icon-Warning fs-24 me-3"
                  style={{ color: "#F59E0B" }}
                ></i>
                <div>
                  <span className="semi-bold-text">
                    "{pendingSelection?.data}"
                  </span>{" "}
                  is <span className="semi-bold-text">not </span>in
                  <span className="semi-bold-text"> Zydus Data Engine</span>.
                  Prescribing it may impact{" "}
                  <span className="semi-bold-text">patient fulfilment</span>.
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  id="dontShowAgain"
                  checked={dontShowZydusWarning}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setDontShowZydusWarning(checked);
                    localStorage.setItem(
                      "dontShowZydusWarning",
                      checked.toString()
                    );
                  }}
                  style={{ marginRight: 8, width: 16, height: 16 }}
                />
                <label
                  htmlFor="dontShowAgain"
                  style={{ cursor: "pointer", marginBottom: 0 }}
                >
                  Don't show this again
                </label>
              </div>
            </div>
            <div className="mt-4">
              <div className="d-flex align-items-center mt-2 justify-content-end">
                <div
                  onClick={() => {
                    setShowNonZydusWarning(false);
                    setPendingSelection(null);
                  }}
                  className="me-4 text-decoration-underline btn p-0 text-main"
                >
                  <span>Go Back</span>
                </div>
                <Button
                  onClick={() => {
                    if (pendingSelection) {
                      // Set the active editing state from pending selection
                      setActiveIndex(pendingSelection.activeIndex);
                      setActiveType(pendingSelection.activeType);
                      setEditableName(pendingSelection.data);

                      // Update the prescriptionData with the selected medicine
                      setPrescriptionData((prevData) => {
                        const updatedData = { ...prevData };
                        if (
                          updatedData?.[pendingSelection.type]?.[
                            pendingSelection.activeIndex
                          ]
                        ) {
                          updatedData[pendingSelection.type][
                            pendingSelection.activeIndex
                          ].name = pendingSelection.data;
                          // Add complete option data as metadata
                          if (pendingSelection.item.key) {
                            const medicineData = JSON.parse(
                              pendingSelection.item.key
                            );
                            updatedData[pendingSelection.type][
                              pendingSelection.activeIndex
                            ].metadata = {
                              ...medicineData,
                              selectedValue: pendingSelection.data,
                            };
                          }
                        }
                        return updatedData;
                      });
                      setIsRxEdited(true);

                      // Clear editing states after selection
                      setActiveIndex(null);
                      setActiveType(null);
                      setEditableName("");
                    }
                    setShowNonZydusWarning(false);
                    setPendingSelection(null);
                  }}
                  className="lh-lg btn btn-primary3 btn-41 px-4"
                >
                  <span>Yes, Proceed</span>
                </Button>
              </div>
            </div>
          </>
        }
      />
    </Drawer>
  );
};

export default ConsultationDrawer;
