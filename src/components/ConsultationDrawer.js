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
  Spin,
  Tooltip,
  Divider,
} from "antd";
import styles from "./ConsultationDrawer.module.css";
import deleteIcon from "../assets/images/delete-gen-rx.svg";
import micIcon from "../assets/images/mic-gen-rx.svg";
import pauseIcon from "../assets/images/pause.svg";
import voiceRxButton from "../assets/images/voice-rx-button.svg";
import voiceRxSendButton from "../assets/images/voice-rx-send-button.svg";
import vitalsIcons from "../assets/images/vitals-icons.svg";
import stopIcon from "../assets/images/stop-icon.svg";
import muteIcon from "../assets/images/microphone-2.svg";
import mutedMicrophoneIcon from "../assets/images/muted-microphone-icon-new.svg";
import ellipse895 from "../assets/images/ellipse-895.svg";

import {
  editGenRxDetails,
  editAmbientRxDetails,
  getGenRx,
  getAmbientRx,
  setAddToRx,
  generateRx,
  updateGenRx,
  generateAmbientRx,
  updateAmbientRx,
} from "../api/services/ApiGenRx";
import tutorialIcon from "../assets/images/tutorial-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { getDecodedToken } from "../utils/localStorage";
import { v4 as uuidv4 } from "uuid";
import CashManagerContext from "../context/CashManagerContext";
import {
  addCaseManager,
  editCaseManager,
  getInvestigationAndMedicine,
  viewCaseManager,
} from "../redux/caseManagerSlice";
import { placeIctOrder } from "../redux/appointmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage, getClinicName, trackEvent, getTokenData, getDeviceSdkData, isVoiceRxFree, getSupportedMimeType, getHmTypeIndicator, getClinic } from "../utils/utils";
import { enrichVitalsWithCalculations } from "../utils/vitalsCalculations";
import alertIcon from "../assets/images/alertIcon.svg";
import CommonModal from "../common/CommonModal";
import ProfilePopover from "../common/ProfilePopover";
import BubbleSkeleton from "./BubbleSkeleton";
import VoiceWaveVisualizer from "./WaveVisualizer";
import genRxSendCta from "../assets/images/genRxSendCta.svg";
import zydusDataEngineIcon from "../assets/images/intersect.svg";
import doctorAvatar from "../assets/images/doctor-avatar.png";
import arrowBoxDown from "../assets/images/arrow-box-down.svg";
import dictateActiveIcon from "../assets/images/dictate-active.svg";
import ambientActiveIcon from "../assets/images/ambient-mode-active.svg";
import DigitisedPrescription from "./DigitisedPrescription";
import {
  FAILED_VERIFICATION,
  FREE,
  GB_APOLLO_DISABLE_FEATURE,
  GB_ZYDUS_USER,
  MESSAGE_KEY,
  S_DDX,
  S_VOICE_RX,
  S_AMBIENT_VOICE_RX,
} from "../utils/constants";
import visitEnd from "../assets/images/end-visit.svg";
import imgCloseVisit from "../assets/images/close-visit.svg";
import { checkCredits, updateCredits } from "../redux/monetizationSlice";
import ExpiredSubModal from "../pages/monetization/components/ExpiredSubModal";
import FreeTrialButton from "../pages/monetization/components/FreeTrialButton";
import { services } from "../redux/doctorsSlice";
import SCBanner from "./SCBanner";
import GenRxKnowMore from "./GenRxKnowMore";
import { setSelectAutofill } from "../redux/ddxSlice";
import growIcon from "../assets/images/grow.svg";
import accuracyIcon from "../assets/images/accuracy.svg";
import healthIcon from "../assets/images/health-care.svg";
import VideoModal from "../common/VideoModal";
import tagNew from "../assets/images/new-gif.gif";
import ApiMedication from "../api/services/ApiMedication";
import ApiInvestigation from "../api/services/ApiInvestigation";
import ApiVitals from "../api/services/ApiVitals";
import { addPatientLabReports } from "../api/services/ApiLabParams";
import { env } from "../EnvironmentConfig";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import config from "../config";
import moment from "moment";
import { isMobile } from "react-device-detect";
import { useGrounding } from "../hooks/useGrounding";
import GenRXLoaders from "./GenRxLoaders";
import genRxBg from "../assets/images/gen-rx-bg.gif";


const ConsultationDrawer = ({
  visible,
  onClose,
  labReportID,
  digitizedData,
  typedInputText,
  mode,
}) => {
  const { servicesList } = useSelector((state) => state.doctors);
  const VOICE_RX_planDetails = servicesList?.find(
    (e) => e.service_name === S_VOICE_RX
  );

  const { useVoiceRx, setUseVoiceRx, useDDX, medicalHistoryData } = useContext(CashManagerContext);

  const { state } = useLocation();
  const { patient_data, caseManagerData, fromVoiceRecording, audioBlob: audioBlobFromLocation, consent, noStayClickCount, crossButtonClickCount, mutePauseButtonClickCount } = state || {};
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
  // Initialise with empty object to avoid null deref, but treat "empty" via helper below.
  const [prescriptionData, setPrescriptionData] = useState({});
  const isAutoFocusShownRef = useRef(false);
  const hasAutoSubmittedRef = useRef(false);
  const [symptomsCollectorData, setSymptomsCollectorData] = useState(null);
  const [localModules, setLocalModules] = useState([]);
  const [genRxDetails, setGenRxDetails] = useState(null);
  const [fullTranscript, setFullTranscript] = useState("");
  const [conversations, setConversations] = useState([]);
  const [showPrescription, setShowPrescription] = useState(
    caseManagerData?.smart_prescription_filename || false
  );
  const [inputText, setInputText] = useState("");
  const hasTypedInput = inputText.trim().length > 0;
  const [isEditing, setIsEditing] = useState(false);
  const [isTranscriptExpanded, setIsTranscriptExpanded] = useState(true);
  const [expandedTranscripts, setExpandedTranscripts] = useState(new Set([0])); // Track which transcript cards are expanded
  const [audioDuration, setAudioDuration] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [editableText, setEditableText] = useState("");
  const [editableQuery, setEditableQuery] = useState("");
  const [genRxKnowMoreDrawer, setGenRxKnowMoreDrawer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [editableLineItem, setEditableLineItem] = useState("");
  const [editableName, setEditableName] = useState("");
  const [searchParentQuery, setSearchParentQuery] = useState("");
  const [parentSearchOptions, setParentSearchOptions] = useState([]);
  // const [isAddMedicineOpen, setIsAddMedicineOpen] = useState(false);
  const [editableKey, setEditableKey] = useState("");
  const [queries, setQueries] = useState([]); // Array of { text, isAudio, duration }
  const [isRxEdited, setIsRxEdited] = useState(false);
  // Track which sections were initially populated from API - these should remain visible even if content is deleted
  const initiallyPopulatedSectionsRef = useRef(new Set());
  // Track which medical history types were initially populated
  const initiallyPopulatedMedicalHistoryTypesRef = useRef(new Set());

  const submitCountRef = useRef(fromVoiceRecording ? 1 : 0);
  const initialMedicationsRef = useRef(null);
  const typedMessagesCountRef = useRef(0);
  const crossButtonClickCountRef = useRef(crossButtonClickCount || 0);
  const mutePauseButtonClickCountRef = useRef(mutePauseButtonClickCount || 0);
  const digitizationPadEditCountRef = useRef(0);
  const [isAmbientMode, setIsAmbientMode] = useState(() => {
    const activeService = window.TATVA_ACTIVE_VOICE_SERVICE;
    return activeService === S_AMBIENT_VOICE_RX;
  });
  const [pendingSelection, setPendingSelection] = useState(null);
  const decodedToken = getDecodedToken();
  const doctorId = decodedToken?.result?.user_id;
  const [audioBlob, setAudioBlob] = useState(audioBlobFromLocation || null);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const [showSCBanner, setShowSCBanner] = useState(false);
  const [labResultsSavedFromSidebar, setLabResultsSavedFromSidebar] = useState(false);
  const [isEndingVisit, setIsEndingVisit] = useState(false);
  const { profile, siteId, storeCode, userId } = useSelector((state) => state.doctors);
  const clinic = getClinic(profile?.hospital_data);
  const { parentOptionsList: medicationParentOptionsList } = useSelector(
    (state) => state.medication
  );
  const { parentOptionsList: investigationParentOptionsList } = useSelector(
    (state) => state.investigation
  );
  const { symptomCollector, isAutofillSelected, selectedSymptomsCollector } =
    useSelector((state) => state.ddx);
  const { TextArea } = Input;

  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const isFreeVoiceRxUser = isVoiceRxFree();
  const [shouldShowVideo, setShowVideo] = useState(false);
  const isApolloHosBusinessIdAccessableFromGB = useFeatureIsOn(
    GB_APOLLO_DISABLE_FEATURE
  );
  const isZydusUserAccessableFromGB = useFeatureIsOn(GB_ZYDUS_USER);
  const tokenData = getTokenData();
  const isGroundingAccessableForZydus =
    tokenData?.hospital_business_id == env.zydus_business_id &&
    isZydusUserAccessableFromGB;
  const isGroundingAccessable = useGrounding();
  const videoLink = {
    link: "https://www.youtube.com/embed/mAZ7Sa86PnQ",
    thumbnail: "https://i.ytimg.com/vi/mAZ7Sa86PnQ/hqdefault.jpg",
    title: "Voice Rx Tutorial"
  };
  const persistLabResultsToApi = useCallback(
    async (labResultsDataForApi = []) => {
      if (
        !Array.isArray(labResultsDataForApi) ||
        labResultsDataForApi.length === 0 ||
        !patient_data?.patient_unique_id
      ) {
        return;
      }

      try {
        const payload = {
          patientId: patient_data.patient_unique_id,
          doctorId: profile?.doctor_unique_id || doctorId,
          results: labResultsDataForApi,
        };
        await addPatientLabReports(payload);
      } catch (err) {
        console.error("Error saving lab results to API:", err);
      }
    },
    [patient_data?.patient_unique_id, profile?.doctor_unique_id, doctorId]
  );
  const isPrescriptionDataEmpty = useCallback((data) => {
    if (!data || typeof data !== "object") return true;
    const {
      symptoms,
      medications,
      vitalsAndBodyComposition,
      advice,
      diagnosis,
      examinations,
      followUp,
      labInvestigation,
      medicalHistory,
      vaccinations,
      others,
      labResults,
      dynamicFields,
    } = data;

    const hasArrayContent = (arr) => Array.isArray(arr) && arr.length > 0;
    const hasObjectContent =
      vitalsAndBodyComposition &&
      typeof vitalsAndBodyComposition === "object" &&
      Object.keys(vitalsAndBodyComposition).length > 0;
    const hasFollowUp = typeof followUp === "string" && followUp.trim().length > 0;
    const hasDynamicFields =
      dynamicFields &&
      typeof dynamicFields === "object" &&
      Object.values(dynamicFields).some((v) => Array.isArray(v) ? v.length > 0 : !!v);

    return !(
      hasArrayContent(symptoms) ||
      hasArrayContent(medications) ||
      hasArrayContent(advice) ||
      hasArrayContent(diagnosis) ||
      hasArrayContent(examinations) ||
      hasArrayContent(labInvestigation) ||
      hasArrayContent(medicalHistory) ||
      hasArrayContent(vaccinations) ||
      hasArrayContent(others) ||
      hasArrayContent(labResults) ||
      hasObjectContent ||
      hasFollowUp ||
      hasDynamicFields
    );
  }, []);
  const isSymptomCollectorJSON = useCallback((text) => {
    if (typeof text !== "string") return false;
    const trimmed = text.trim();
    if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) return false;
    try {
      const parsed = JSON.parse(trimmed);
      if (!parsed || typeof parsed !== "object") return false;
      return (
        Array.isArray(parsed.symptoms) ||
        Array.isArray(parsed.medicalHistory) ||
        typeof parsed.notes === "string" ||
        typeof parsed.others === "string"
      );
    } catch (error) {
      return false;
    }
  }, []);

  const formatLabResultsForApi = useCallback((labResults = []) => {
    if (!Array.isArray(labResults) || labResults.length === 0) return [];
    const today = moment().format("YYYY-MM-DD");
    const groupedByDate = {};
    labResults.forEach((result = {}) => {
      const dateKey = result.date || today;
      const testname = result.testname || result.testName || result.name || "Result";
      const value = result.value || "";
      const units = result.units || "";
      if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
      // Extract value and units from display format (e.g., "23 mg/dl" -> value: "23", units: "mg/dl")
      let cleanValue = value;
      let cleanUnits = units;
      if (value && !units) {
        const parts = String(value).trim().split(/\s+/);
        if (parts.length > 1) {
          cleanValue = parts.slice(0, -1).join(" ");
          cleanUnits = parts[parts.length - 1];
        }
      }
      // Extract only numeric value (remove units from value field)
      const numericMatch = String(cleanValue).trim().match(/^(\d+(?:\.\d+)?)/);
      cleanValue = numericMatch ? numericMatch[1] : cleanValue;
      groupedByDate[dateKey].push({
        reportName: result.reportName || "",
        testName: testname,
        value: cleanValue,
        units: cleanUnits,
        refRange: result.refRange || "",
        arrowDirection: result.arrowDirection || "",
      });
    });
    return Object.entries(groupedByDate).map(([date, inputs]) => ({
      date,
      inputs: inputs.filter(input => input.value && input.value.trim() !== ""),
    })).filter(result => result.inputs.length > 0);
  }, []);
  const isFirstTranscriptJSON = useMemo(() => {
    if (Array.isArray(queries) && queries.length > 0) {
      const firstQuery = queries[0];
      const firstText = typeof firstQuery === 'string' 
        ? firstQuery 
        : (firstQuery?.text || '');
      return isSymptomCollectorJSON(firstText);
    }
    if (fullTranscript) {
      return isSymptomCollectorJSON(fullTranscript);
    }
    if (genRxDetails?.source) {
      return isSymptomCollectorJSON(genRxDetails.source);
    }
    if (typedInputText) {
      return isSymptomCollectorJSON(typedInputText);
    }
    return false;
  }, [queries, fullTranscript, genRxDetails?.source, typedInputText, isSymptomCollectorJSON]);


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
    if (!visible) {
      initiallyPopulatedSectionsRef.current.clear();
      initiallyPopulatedMedicalHistoryTypesRef.current.clear();
    }
  }, [visible]);

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
    }
  }, [audioBlob, fromVoiceRecording]);

  // Set audio duration from genRxDetails when editing a prescription
  useEffect(() => {
    if (!audioBlob && !fromVoiceRecording) {
      if (genRxDetails?.source_duration !== undefined && genRxDetails?.source_duration !== null) {
        const duration = genRxDetails.source_duration;
        // Handle duration as seconds (even if it's 0)
        if (typeof duration === 'number' && duration >= 0) {
          const minutes = Math.floor(duration / 60);
          const seconds = Math.floor(duration % 60);
          const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
          setAudioDuration(formattedDuration);
        }
      }
    }
  }, [genRxDetails?.source_duration, audioBlob, fromVoiceRecording, genRxDetails]);

  useEffect(() => {
    if (!visible) {
      hasAutoSubmittedRef.current = false;
    }
  }, [visible]);

  useEffect(() => {
    if (hasAutoSubmittedRef.current) return;
    
    const shouldAutoSubmit = visible && fromVoiceRecording && audioBlob && !isProcessing && isPrescriptionDataEmpty(prescriptionData);
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
    
    const shouldSubmitTyped =
      visible && !fromVoiceRecording && typedInputText && !isProcessing && isPrescriptionDataEmpty(prescriptionData);
    if (!shouldSubmitTyped) return;

    hasAutoSubmittedRef.current = true;
    // Increment typed messages count for auto-submit
    typedMessagesCountRef.current += 1;

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
    const namesSignature = meds.map((m) => {
      const nameToUse = (m?.groundingMedicineName || "").trim() || (m?.name || "").trim();
      return nameToUse;
    }).join("|");
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
    
    // Skip fuzzy search if any test is a custom investigation (change === 1)
    const hasCustomInvestigation = tests.some(
      (t) => t?.metadata?.change === 1 || t?.change === 1
    );
    if (hasCustomInvestigation) {
      // Update the signature to prevent re-triggering, but don't call fuzzy search
      const namesSignature = tests.map((t) => (t?.name || "").trim()).join("|");
      lastFuzzyTestsRef.current = namesSignature;
      return;
    }
    
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
          const nameToUse = (med?.groundingMedicineName || "").trim() || (med?.name || "").trim();
          if (!nameToUse)
            return { correctedName: nameToUse, fullData: null };
          try {
            const searchName = (med?.groundingMedicineName || "").trim() || (med?.name || "").trim();
            const result = await ApiMedication.getFuzzySearch(searchName);
            const corrected = result?.[0]?.tmm_medicine_name?.trim();
            return {
              correctedName: corrected || nameToUse,
              fullData: {...result?.[0]} || null,
            };
          } catch (e) {
            return { correctedName: nameToUse, fullData: null };
          }
        })
      );

      const anyChanged = meds.some(
        (m, i) => {
          const currentDisplayName = (m?.groundingMedicineName || "").trim() || (m?.name || "").trim();
          return currentDisplayName !== correctedResults[i].correctedName;
        }
      );
      if (!anyChanged) return;

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
          metadata: {
            ...m.metadata,
            fuzzyCorrectedName: correctedResults[idx].correctedName,
            originalName: (m?.groundingMedicineName || "").trim() || m.name,
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
              fullData: {...result?.[0]} || null,
            };
          } catch (e) {
            return { correctedName: currentName, fullData: null };
          }
        })
      );

      const anyChanged = tests.some(
        (m, i) => (m?.name || "").trim() !== correctedResults[i].correctedName
      );
      // if (!anyChanged) return;

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
    // iPad mini (1024x768)
    if (screenWidth >= 768 && screenWidth <= 1024) {
      return 30;
    }
    // iPad Air (1180x820)
    if (screenWidth > 1024 && screenWidth <= 1180) {
      return 32;
    }
    // iPad Pro (1366x1024)
    if (screenWidth > 1180 && screenWidth <= 1366) {
      return 33;
    }
    if (screenWidth >= 1920) return 25;
    if (screenWidth >= 1440) return 33;
    return 33;
  };
  
  const [leftWidthPercent, setLeftWidthPercent] = useState(getInitialWidthPercent());

  const onMouseMoveResizer = useCallback((e) => {
    if (!isResizingRefSplit.current || !splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const totalWidth = rect.width;
    const screenWidth = window.innerWidth;
    
    // Device-aware min/max widths
    let minLeftWidthPx, minRxPadWidthPx;
    if (screenWidth >= 768 && screenWidth <= 1024) {
      // iPad mini
      minLeftWidthPx = 280;
      minRxPadWidthPx = 600;
    } else if (screenWidth > 1024 && screenWidth <= 1180) {
      // iPad Air
      minLeftWidthPx = 320;
      minRxPadWidthPx = 700;
    } else if (screenWidth > 1180 && screenWidth <= 1366) {
      // iPad Pro
      minLeftWidthPx = 360;
      minRxPadWidthPx = 800;
    } else {
      // Desktop
      minLeftWidthPx = 480;
      minRxPadWidthPx = 960;
    }
    
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
      const screenWidth = window.innerWidth;
      
      // Device-aware min/max widths
      let minLeftWidthPx, minRxPadWidthPx;
      if (screenWidth >= 768 && screenWidth <= 1024) {
        // iPad mini
        minLeftWidthPx = 280;
        minRxPadWidthPx = 600;
      } else if (screenWidth > 1024 && screenWidth <= 1180) {
        // iPad Air
        minLeftWidthPx = 320;
        minRxPadWidthPx = 700;
      } else if (screenWidth > 1180 && screenWidth <= 1366) {
        // iPad Pro
        minLeftWidthPx = 360;
        minRxPadWidthPx = 800;
      } else {
        // Desktop
        minLeftWidthPx = 480;
        minRxPadWidthPx = 960;
      }
      
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
      const screenWidth = window.innerWidth;
      
      // Device-aware sizing
      let desiredLeftPx, minLeftPx, minRightPx;
      if (screenWidth >= 768 && screenWidth <= 1024) {
        // iPad mini
        desiredLeftPx = 300;
        minLeftPx = 280;
        minRightPx = 600;
      } else if (screenWidth > 1024 && screenWidth <= 1180) {
        // iPad Air
        desiredLeftPx = 360;
        minLeftPx = 320;
        minRightPx = 700;
      } else if (screenWidth > 1180 && screenWidth <= 1366) {
        // iPad Pro
        desiredLeftPx = 400;
        minLeftPx = 360;
        minRightPx = 800;
      } else {
        // Desktop
        desiredLeftPx = 480;
        minLeftPx = 480;
        minRightPx = 960;
      }
      
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
    if (isPrescriptionDataEmpty(prescriptionData) || activeIndex !== null || activeType !== null)
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
      typedInputText ||
      !isAutofillSelected ||
      !selectedSymptomsCollector ||
      Object.keys(selectedSymptomsCollector)?.length === 0
    ) {
      return;
    }
      const formattedSymptomsCollectorData = getFormattedSymptomsCollectorData(
        selectedSymptomsCollector
      );
      setSymptomsCollectorData(formattedSymptomsCollectorData);
      setPrescriptionData(formattedSymptomsCollectorData);
      setShowPrescription(true);

      if (!caseManagerData?.smart_prescription_filename) {
        handleVoiceDigitize(null, null, true);
      }
  }, [selectedSymptomsCollector, isAutofillSelected, typedInputText]);

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
      // First, call getGenRx to check the conversation field
      const initialResponse = await getGenRx(caseManagerData?.smart_prescription_filename);

      if (initialResponse.success && initialResponse.data) {
        // Check if conversation exists and has data in the history
        const conversation = initialResponse.data?.history?.[0]?.conversation;
        const hasConversation = conversation && Array.isArray(conversation) && conversation.length > 0;
        
        // Set ambient mode based on conversation field
        if (hasConversation) {
          setIsAmbientMode(true);
          window.TATVA_ACTIVE_VOICE_SERVICE = S_AMBIENT_VOICE_RX;
        } else {
          setIsAmbientMode(false);
          if (window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX) {
            window.TATVA_ACTIVE_VOICE_SERVICE = S_VOICE_RX;
          }
        }
        
        let response = initialResponse;
        
        // If conversation has doctor and patient conversation, call ambient API
        if (hasConversation) {
          const ambientResponse = await getAmbientRx(caseManagerData?.smart_prescription_filename);
          if (ambientResponse.success) {
            response = ambientResponse;
          }
        }
        // If conversation is null or empty, use the dictate mode response (initialResponse)

        if (response.success && response.data) {
       
        const hasAmbientType = response.data?.rxDigitizationHistory?.some(h => h.category === "ambient-rx") || hasConversation;
        
        if (hasAmbientType) {
          let prescriptionData = null;
          
          if (response.data.editedData) {
            prescriptionData = response.data.editedData;
          } else if (response.data.digitizeData) {
            prescriptionData = response.data.digitizeData;
          } else if (response.data.digitize) {
            const digitizeObj = response.data.digitize;
            if (digitizeObj && typeof digitizeObj === 'object' && !Array.isArray(digitizeObj)) {
              const numericKeys = Object.keys(digitizeObj).filter(key => /^\d+$/.test(key));
              if (numericKeys.length > 0) {
                prescriptionData = digitizeObj[numericKeys[0]];
              } else if (digitizeObj.symptoms || digitizeObj.medications || digitizeObj.vitalsAndBodyComposition) {
                prescriptionData = digitizeObj;
              } else {
                prescriptionData = digitizeObj;
              }
            } else {
              prescriptionData = digitizeObj;
            }
          } else {
            const ambientEntries = response.data.rxDigitizationHistory?.filter(h => h.category === "ambient-rx") || [];
            const latestAmbientEntry = ambientEntries[ambientEntries.length - 1];
            prescriptionData = latestAmbientEntry?.response || latestAmbientEntry?.payload?.response || latestAmbientEntry?.payload;
          }
          
          if (prescriptionData && prescriptionData.vitalsAndBodyComposition) {
            const vitals = prescriptionData.vitalsAndBodyComposition;
            const actualVitals = vitals._doc || vitals;
            const cleanedVitals = {};
            
            Object.keys(actualVitals).forEach(key => {
              if (actualVitals[key] !== undefined && actualVitals[key] !== null) {
                cleanedVitals[key] = actualVitals[key];
              }
            });
            
            prescriptionData.vitalsAndBodyComposition = cleanedVitals;
          }
          
          if (prescriptionData) {
            if (prescriptionData.symptoms && Array.isArray(prescriptionData.symptoms) && prescriptionData.symptoms.length > 0) {
              initiallyPopulatedSectionsRef.current.add('symptoms');
            }
            if (prescriptionData.vaccinations && Array.isArray(prescriptionData.vaccinations) && prescriptionData.vaccinations.length > 0) {
              initiallyPopulatedSectionsRef.current.add('vaccinations');
            }
            if (prescriptionData?.medicalHistory && Array.isArray(prescriptionData.medicalHistory) && prescriptionData.medicalHistory.length > 0) {
              initiallyPopulatedSectionsRef.current.add('medicalHistory');
              prescriptionData.medicalHistory.forEach(item => {
                const type = item.type?.toLowerCase().replace(/\s+/g, '_') || 'others';
                initiallyPopulatedMedicalHistoryTypesRef.current.add(type);
              });
            }
            if (prescriptionData.examinations && Array.isArray(prescriptionData.examinations) && prescriptionData.examinations.length > 0) {
              initiallyPopulatedSectionsRef.current.add('examinations');
            }
            if (prescriptionData.diagnosis && Array.isArray(prescriptionData.diagnosis) && prescriptionData.diagnosis.length > 0) {
              initiallyPopulatedSectionsRef.current.add('diagnosis');
            }
            if (prescriptionData.advice && ((typeof prescriptionData.advice === 'string' && prescriptionData.advice.trim()) || (Array.isArray(prescriptionData.advice) && prescriptionData.advice.length > 0))) {
              initiallyPopulatedSectionsRef.current.add('advice');
            }
            if (prescriptionData.others && Array.isArray(prescriptionData.others) && prescriptionData.others.length > 0) {
              initiallyPopulatedSectionsRef.current.add('others');
            }
            if (prescriptionData.followUp && prescriptionData.followUp.trim()) {
              initiallyPopulatedSectionsRef.current.add('followUp');
            }
            if (prescriptionData.vitalsAndBodyComposition && Object.keys(prescriptionData.vitalsAndBodyComposition).length > 0) {
              initiallyPopulatedSectionsRef.current.add('vitalsAndBodyComposition');
            }
            if (prescriptionData.labResults && Array.isArray(prescriptionData.labResults) && prescriptionData.labResults.length > 0) {
              initiallyPopulatedSectionsRef.current.add('labResults');
            }
            if (prescriptionData.medications && Array.isArray(prescriptionData.medications) && prescriptionData.medications.length > 0) {
              initiallyPopulatedSectionsRef.current.add('medications');
            }
            if (prescriptionData.labInvestigation && Array.isArray(prescriptionData.labInvestigation) && prescriptionData.labInvestigation.length > 0) {
              initiallyPopulatedSectionsRef.current.add('labInvestigation');
            }
            if (prescriptionData.dynamicFields && typeof prescriptionData.dynamicFields === 'object') {
              Object.entries(prescriptionData.dynamicFields).forEach(([moduleName, moduleData]) => {
                if (Array.isArray(moduleData) && moduleData.length > 0) {
                  initiallyPopulatedSectionsRef.current.add(`dynamicFields.${moduleName}`);
                }
              });
            }
          }
          
          const validatedPrescriptionData = validatePrescriptionData(prescriptionData);
          if (validatedPrescriptionData) {
            setPrescriptionData(validatedPrescriptionData);
      
            
          }
          
          // For ambient mode, use conversations from history if available (when coming from patient detail)
          // Otherwise use rxDigitizationHistory
          const historyWithConversations = response.data?.history?.filter(h => 
            h.conversation && Array.isArray(h.conversation) && h.conversation.length > 0
          ) || [];
          
          const ambientEntries = response.data.rxDigitizationHistory?.filter(h => h.category === "ambient-rx") || [];
          const latestAmbientEntry = ambientEntries.length > 0 ? ambientEntries[ambientEntries.length - 1] : null;
          
          // Initialize queries array from history conversations (for patient detail) or ambient entries
          if (historyWithConversations.length > 0) {
            // Coming from patient detail - use conversations from history
            const ambientQueries = historyWithConversations.map((historyItem, idx) => {
              const entryConversations = historyItem.conversation || [];
              const transcription = historyItem.transcription || '';
              const sourceDuration = historyItem.sourceDurationInSeconds || historyItem.source_duration || null;
              
              return {
                conversations: entryConversations,
                isAudio: true,
                duration: sourceDuration,
                text: transcription
              };
            }).filter(query => query.conversations.length > 0 || query.text);
            
            if (ambientQueries.length > 0) {
              setQueries(ambientQueries);
              // Set first conversation for backward compatibility
              const allConversations = historyWithConversations.flatMap(h => h.conversation || []);
              setConversations(allConversations);
              // Expand first transcript box
              setIsTranscriptExpanded(true);
              setExpandedTranscripts(new Set());
            }
          } else if (ambientEntries.length > 0) {
            // Use rxDigitizationHistory if history doesn't have conversations
            let previousConversations = [];
            const ambientQueries = ambientEntries.map((entry, idx) => {
              const entryConversations = entry?.payload?.conversation || [];
              
              // Extract only conversations that are NEW for this specific entry
              const newConversations = entryConversations.filter(conv => {
                const convText = conv?.message || conv?.text || conv?.content || '';
                const convSpeaker = (conv?.speaker || '').toLowerCase();
                
                return !previousConversations.some(prevConv => {
                  const prevText = prevConv?.message || prevConv?.text || prevConv?.content || '';
                  const prevSpeaker = (prevConv?.speaker || '').toLowerCase();
                  return prevText === convText && prevSpeaker === convSpeaker;
                });
              });
              
              previousConversations = [...previousConversations, ...entryConversations];
              
              const transcription = entry?.payload?.transcription || entry?.transcription || '';
              const conversationsToStore = newConversations.length > 0 ? newConversations : (
                transcription ? [{
                  speaker: 'doctor',
                  text: transcription,
                  message: transcription,
                  content: transcription
                }] : []
              );
              
              return {
                conversations: conversationsToStore,
                isAudio: true,
                duration: entry?.payload?.source_duration || entry?.source_duration || null,
                text: transcription
              };
            }).filter(query => query.conversations.length > 0 || query.text);
            
            if (ambientQueries.length > 0) {
              setQueries(ambientQueries);
              if (latestAmbientEntry?.payload?.conversation) {
                setConversations(latestAmbientEntry.payload.conversation);
              } else {
                setConversations(ambientQueries[0].conversations);
              }
              setIsTranscriptExpanded(true);
              setExpandedTranscripts(new Set());
            } else if (latestAmbientEntry?.payload?.conversation) {
              setConversations(latestAmbientEntry.payload.conversation);
            } else if (response.data.source) {
              const initialConversation = {
                speaker: "doctor",
                text: response.data.source,
                timestamp: new Date().toISOString()
              };
              setConversations([initialConversation]);
            }
          } else if (response.data?.history?.[0]?.conversation && Array.isArray(response.data.history[0].conversation) && response.data.history[0].conversation.length > 0) {
            // Fallback: use first history item's conversation
            setConversations(response.data.history[0].conversation);
            setQueries([{
              conversations: response.data.history[0].conversation,
              isAudio: true,
              duration: response.data.history[0].sourceDurationInSeconds || null,
              text: response.data.history[0].transcription || ''
            }]);
            setIsTranscriptExpanded(true);
          } else if (response.data.source) {
            const initialConversation = {
              speaker: "doctor",
              text: response.data.source,
              timestamp: new Date().toISOString()
            };
            setConversations([initialConversation]);
          }
          
          setGenRxDetails({
            source: response.data.source,
            source_duration: response.data.source_duration,
            timeRequiredInMs: response.data.timeRequiredInMs,
            type: "ambient",
            _id: response.data._id,
          });
          
          if (response.data.source) {
            setFullTranscript(response.data.source);
          }
        } else {
          
          if (response.data) {
            const prescriptionDataFromResponse = response.data.editedData || response.data.digitizeData;
            
            if (prescriptionDataFromResponse) {
              if (prescriptionDataFromResponse.symptoms && Array.isArray(prescriptionDataFromResponse.symptoms) && prescriptionDataFromResponse.symptoms.length > 0) {
                initiallyPopulatedSectionsRef.current.add('symptoms');
              }
              if (prescriptionDataFromResponse.vaccinations && Array.isArray(prescriptionDataFromResponse.vaccinations) && prescriptionDataFromResponse.vaccinations.length > 0) {
                initiallyPopulatedSectionsRef.current.add('vaccinations');
              }
              if (prescriptionDataFromResponse?.medicalHistory && Array.isArray(prescriptionDataFromResponse.medicalHistory) && prescriptionDataFromResponse.medicalHistory.length > 0) {
                initiallyPopulatedSectionsRef.current.add('medicalHistory');
                prescriptionDataFromResponse.medicalHistory.forEach(item => {
                  const type = item.type?.toLowerCase().replace(/\s+/g, '_') || 'others';
                  initiallyPopulatedMedicalHistoryTypesRef.current.add(type);
                });
              }
              if (prescriptionDataFromResponse.examinations && Array.isArray(prescriptionDataFromResponse.examinations) && prescriptionDataFromResponse.examinations.length > 0) {
                initiallyPopulatedSectionsRef.current.add('examinations');
              }
              if (prescriptionDataFromResponse.diagnosis && Array.isArray(prescriptionDataFromResponse.diagnosis) && prescriptionDataFromResponse.diagnosis.length > 0) {
                initiallyPopulatedSectionsRef.current.add('diagnosis');
              }
              if (prescriptionDataFromResponse.advice && ((typeof prescriptionDataFromResponse.advice === 'string' && prescriptionDataFromResponse.advice.trim()) || (Array.isArray(prescriptionDataFromResponse.advice) && prescriptionDataFromResponse.advice.length > 0))) {
                initiallyPopulatedSectionsRef.current.add('advice');
              }
              if (prescriptionDataFromResponse.others && Array.isArray(prescriptionDataFromResponse.others) && prescriptionDataFromResponse.others.length > 0) {
                initiallyPopulatedSectionsRef.current.add('others');
              }
              if (prescriptionDataFromResponse.followUp && prescriptionDataFromResponse.followUp.trim()) {
                initiallyPopulatedSectionsRef.current.add('followUp');
              }
              if (prescriptionDataFromResponse.vitalsAndBodyComposition && Object.keys(prescriptionDataFromResponse.vitalsAndBodyComposition).length > 0) {
                initiallyPopulatedSectionsRef.current.add('vitalsAndBodyComposition');
              }
              if (prescriptionDataFromResponse.labResults && Array.isArray(prescriptionDataFromResponse.labResults) && prescriptionDataFromResponse.labResults.length > 0) {
                initiallyPopulatedSectionsRef.current.add('labResults');
              }
              if (prescriptionDataFromResponse.medications && Array.isArray(prescriptionDataFromResponse.medications) && prescriptionDataFromResponse.medications.length > 0) {
                initiallyPopulatedSectionsRef.current.add('medications');
              }
              if (prescriptionDataFromResponse.labInvestigation && Array.isArray(prescriptionDataFromResponse.labInvestigation) && prescriptionDataFromResponse.labInvestigation.length > 0) {
                initiallyPopulatedSectionsRef.current.add('labInvestigation');
              }
              if (prescriptionDataFromResponse.dynamicFields && typeof prescriptionDataFromResponse.dynamicFields === 'object') {
                Object.entries(prescriptionDataFromResponse.dynamicFields).forEach(([moduleName, moduleData]) => {
                  if (Array.isArray(moduleData) && moduleData.length > 0) {
                    initiallyPopulatedSectionsRef.current.add(`dynamicFields.${moduleName}`);
                  }
                });
              }
            }
            
            const validatedPrescriptionDataFromResponse = validatePrescriptionData(prescriptionDataFromResponse);
            if (validatedPrescriptionDataFromResponse) {
              setPrescriptionData(validatedPrescriptionDataFromResponse);
              
            }

            let transcriptSource = response.data.source;
            if (!transcriptSource && response.data?.history?.length > 0) {
              const validTranscriptions = response.data.history
                .map(({ transcription }) => transcription)
                .filter((text) => text && text !== "null" && text);
              
              if (validTranscriptions.length > 0) {
                transcriptSource = validTranscriptions.join(' ');
              }
            }
            
            setGenRxDetails({
              source: transcriptSource || response.data.source || '',
              source_duration: response.data.source_duration,
              timeRequiredInMs: response.data.timeRequiredInMs,
              type: response.data.type,
              _id: response.data._id,
            });

            // For dictate mode, populate queries from history transcriptions
            if (response.data?.history?.length > 0) {
              const validTranscriptions = response.data.history
                .map(({ transcription, sourceDurationInSeconds, source_duration }) => ({
                  text: transcription,
                  isAudio: !!(sourceDurationInSeconds || source_duration),
                  duration: sourceDurationInSeconds || source_duration || null
                }))
                .filter((query) => query.text && query.text !== "null" && query.text);
              
              if (validTranscriptions.length > 0) {
                setQueries(validTranscriptions);
                // Expand first transcript box
                setIsTranscriptExpanded(true);
                setExpandedTranscripts(new Set());
              }
            }
            
            if (transcriptSource && !caseManagerData?.smart_prescription_filename) {
              setFullTranscript(transcriptSource);
            }
          }
        }
        }
      } else {
        throw new Error(initialResponse.error || "Failed to get Rx");
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
    if (isRecording || isPaused) {
      crossButtonClickCountRef.current += 1;
    }
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
    window.Moengage.track_event("TP_AV_TypeTranscript", {
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
            submitCountRef.current += 1;
            // Increment typed messages count if it's a typed message (not recording)
            if (!isRecording && (inputText || editableQuery)) {
              typedMessagesCountRef.current += 1;
            }
            if (isEditing && editableQuery) {
              digitizationPadEditCountRef.current += 1;
            }
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
              message.error(error?.message || "Failed to process prescription");
              setIsProcessing(false);
            }
          }
        } else {
          typeof action?.payload?.data?.error === "object"
            ? errorMessage(action?.payload?.data?.error?.description)
            : errorMessage(action?.payload?.data?.message);
        }
      } else {
        errorMessage(action?.payload?.message || action?.error || "An error occurred");
      }
    }
  };

  const preparePayloadForApi = () => {
    const cleanedData = removeScItems(prescriptionData || {});
    const { dynamicFields = {} } = cleanedData;
    // Merge any in-progress edits from the UI (input focused but not blurred yet)
    let dynamicFieldsWithPending = dynamicFields;
    if (
      activeType &&
      activeIndex !== null &&
      typeof activeType === "string" &&
      // Only treat as dynamic module if it exists in dynamicFields or was created locally
      (Object.prototype.hasOwnProperty.call(dynamicFields, activeType) ||
        (Array.isArray(localModules) && localModules.includes(activeType)))
    ) {
      const currentModuleArray = Array.isArray(dynamicFields[activeType])
        ? [...dynamicFields[activeType]]
        : [];
      const pendingText = typeof editableText === "string" ? editableText.trim() : "";
      if (pendingText) {
        const nextArray = [...currentModuleArray];
        nextArray[activeIndex] = pendingText;
        dynamicFieldsWithPending = {
          ...dynamicFields,
          [activeType]: nextArray,
        };
      }
    }
    // Also capture pending edit when editing an existing item (module-lineItem)
    if (
      activeType &&
      activeIndex !== null &&
      typeof activeType === "string" &&
      activeType.endsWith("-lineItem")
    ) {
      const moduleName = activeType.replace(/-lineItem$/, "");
      // Only merge for true dynamic modules
      if (
        Object.prototype.hasOwnProperty.call(dynamicFields, moduleName) ||
        (Array.isArray(localModules) && localModules.includes(moduleName))
      ) {
      const currentModuleArray = Array.isArray(dynamicFields[moduleName])
        ? [...dynamicFields[moduleName]]
        : [];
      const pendingLineItem = typeof editableLineItem === "string" ? editableLineItem.trim() : "";
      if (pendingLineItem) {
        const nextArray = [...currentModuleArray];
        nextArray[activeIndex] = pendingLineItem;
        dynamicFieldsWithPending = {
          ...dynamicFieldsWithPending,
          [moduleName]: nextArray,
        };
      }
      }
    }
    // Include ALL dynamic fields (including local modules) so custom module edits are preserved.
    // Optionally prune strictly empty arrays to keep payload lean.
    const filteredDynamicFields = Object.entries(dynamicFieldsWithPending).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        // Remove purely empty/whitespace items
        const trimmed = value
          .map((v) => (typeof v === "string" ? v.trim() : v))
          .filter((v) => (typeof v === "string" ? v.length > 0 : v !== null && v !== undefined));
        acc[key] = trimmed;
      } else if (value && typeof value === 'object') {
        acc[key] = value;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    return {
      ...cleanedData,
      dynamicFields: filteredDynamicFields,
    };
  };

  const removeScItems = (data = {}) => {
    const safeSymptoms = Array.isArray(data.symptoms)
      ? data.symptoms.filter((symptom) => !symptom?.SC)
      : [];
    const safeMedicalHistory = Array.isArray(data.medicalHistory)
      ? data.medicalHistory.filter((history) => !history?.SC)
      : [];

    return {
      ...data,
      symptoms: safeSymptoms,
      medicalHistory: safeMedicalHistory,
    };
  };

  const validatePrescriptionData = (data = {}) => {
    if (!data || typeof data !== 'object') {
      return false;
    }
    
    
    const deepClean = (obj) => {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }
      
     
      if (Array.isArray(obj)) {
        return obj.map(item => deepClean(item));
      }
      
     
      if (obj.vitalsAndBodyComposition && typeof obj.vitalsAndBodyComposition === 'object') {
        const vitals = obj.vitalsAndBodyComposition;
       
        const actualVitals = vitals._doc || vitals;
        const cleanedVitals = {};
        

        Object.keys(actualVitals).forEach(key => {
          if (actualVitals[key] !== undefined && actualVitals[key] !== null) {
            cleanedVitals[key] = actualVitals[key];
          }
        });
        
        obj.vitalsAndBodyComposition = cleanedVitals;
      }
      
      // Handle objects - remove Mongoose internal properties
      const cleaned = {};
      for (const [key, value] of Object.entries(obj)) {
        // Skip Mongoose internal properties
        if (key.startsWith('$') || 
            key.startsWith('_') || 
            key === 'strictMode' || 
            key === 'selected' || 
            key === 'getters' || 
            key === 'wasPopulated' || 
            key === 'activePaths' || 
            key === 'pathsToScopes' || 
            key === 'cachedRequired' || 
            key === 'session' || 
            key === '$setCalled' || 
            key === 'ownerDocument' || 
            key === 'emitter' || 
            key === '$options' ||
            key === '$__parent' ||
            key === '$__' ||
            key === '$isSingleNested' ||
            key === '$locals' ||
            key === '$op' ||
            key === '_doc' ||
            key === '$init') {
          continue;
        }
        
        cleaned[key] = deepClean(value);
      }
      
      return cleaned;
    };
    
    // Clean the data first
    const cleanedData = deepClean(data || {});
    
    const mappedLabInvestigation = Array.isArray(cleanedData.labInvestigation)
      ? cleanedData.labInvestigation.map(item => {
          const { instruction, ...restItem } = item;
          const mappedItem = {
            ...restItem,
            notes: item.notes || item.instruction || ''
          };
          // Preserve hm_type and um_id at top level for API compatibility
          // Check both top level and metadata
          if (item.hm_type !== undefined) {
            mappedItem.hm_type = item.hm_type;
          } else if (item.metadata?.hm_type !== undefined) {
            mappedItem.hm_type = item.metadata.hm_type;
          }
          if (item.um_id !== undefined) {
            mappedItem.um_id = item.um_id;
          } else if (item.metadata?.um_id !== undefined) {
            mappedItem.um_id = item.metadata.um_id;
          }
          return mappedItem;
        })
      : [];
    
    // Ensure all required fields exist with proper defaults
    const validatedData = {
      symptoms: Array.isArray(cleanedData.symptoms) ? cleanedData.symptoms : [],
      medications: Array.isArray(cleanedData.medications) ? cleanedData.medications : [],
      vitalsAndBodyComposition: cleanedData.vitalsAndBodyComposition || {},
      advice: Array.isArray(cleanedData.advice) ? cleanedData.advice : [],
      diagnosis: Array.isArray(cleanedData.diagnosis) ? cleanedData.diagnosis : [],
      examinations: Array.isArray(cleanedData.examinations) ? cleanedData.examinations : [],
      followUp: typeof cleanedData.followUp === 'string' ? cleanedData.followUp : "",
      labInvestigation: mappedLabInvestigation,
      labResults: Array.isArray(cleanedData.labResults) ? cleanedData.labResults : [],
      medicalHistory: Array.isArray(cleanedData.medicalHistory) ? cleanedData.medicalHistory : [],
      vaccinations: Array.isArray(cleanedData.vaccinations) ? cleanedData.vaccinations : [],
      others: Array.isArray(cleanedData.others) ? cleanedData.others : [],
      ...cleanedData
    };
    
    validatedData.labInvestigation = mappedLabInvestigation;
    let processedDynamicFields = {};
    if (Array.isArray(cleanedData.dynamicFields)) {
      cleanedData.dynamicFields.forEach((module) => {
        if (module?.name && Array.isArray(module?.fields) && module.fields.length > 0) {
          const hasNonEmptyFields = module.fields.some(
            (field) => (field?.title || '').trim() || (field?.notes || '').trim()
          );
          if (hasNonEmptyFields) {
            processedDynamicFields[module.name] = module.fields;
          }
        }
      });
    } else if (cleanedData.dynamicFields && typeof cleanedData.dynamicFields === 'object') {
      Object.entries(cleanedData.dynamicFields).forEach(([moduleName, moduleData]) => {
        if (Array.isArray(moduleData) && moduleData.length > 0) {
          const hasNonEmptyItems = moduleData.some((item) => {
            if (typeof item === 'string') {
              return item.trim().length > 0;
            } else if (item && typeof item === 'object') {
              return (item?.title || '').trim() || (item?.notes || '').trim() || (item?.lineItem || '').trim();
            }
            return false;
          });
          if (hasNonEmptyItems) {
            processedDynamicFields[moduleName] = moduleData;
          }
        }
      });
    }
    validatedData.dynamicFields = processedDynamicFields;
    
    if (validatedData.vitalsAndBodyComposition && Object.keys(validatedData.vitalsAndBodyComposition).length > 0) {
      const patientInfo = patient_data ? {
        age: patient_data.ageYears || patient_data.age || patient_data.pm_age,
        gender: patient_data.pm_gender || patient_data.gender
      } : {};
      validatedData.vitalsAndBodyComposition = enrichVitalsWithCalculations(
        validatedData.vitalsAndBodyComposition,
        patientInfo
      );
    }
    
    return validatedData;
  };

  const handleVoiceDigitize = async (
    audioBlobParam,
    transcribedText,
    isFromSC = false
  ) => {
    try {
      let response;

      if (isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX || genRxDetails?.type === 'ambient') {
      const formData = new FormData();
      
      // Store duration for this specific interaction (will be used for query duration)
      let currentRecordingDuration = null;
      
      if (audioBlobParam) {
        const audioFile = new File([audioBlobParam], `ambient-voice-rx-recording-${new Date().toISOString().replace(/[:.]/g, '-')}.webm`, {
          type: audioBlobParam.type || 'audio/webm'
        });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const arrayBuffer = await audioBlobParam.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const duration = audioBuffer.duration;
        
        // Store duration for this specific interaction
        currentRecordingDuration = duration;
        
        // Append audio file with proper key for API
        formData.append("file", audioFile);
        formData.append("source_duration", duration.toString());
      } else if (transcribedText) {
        // Append transcript text with proper key for API
        formData.append("voice_prescription_text", transcribedText);
        // When data is in JSON format (text-only, no audio), source_duration should be 0
        formData.append("source_duration", "0");
        }
        
        const patientId = patient_data?.patient_unique_id || "";
        const admissionId = caseManagerData?.admission_id || null;
        
        formData.append("doctorId", doctorId);
        formData.append("patientId", patientId);
        formData.append("schemaKey", "default");
        formData.append("getConversation", "true");
        
        if (consent && typeof consent === 'object') {
          formData.append("consent", JSON.stringify(consent));
        }
        
        if (genRxDetails?._id) {
          // Keep local running transcript for UI if needed, but send only the newly added text to API
          const updatedTranscript = [fullTranscript, transcribedText].filter(Boolean).join(" ");
          setFullTranscript(updatedTranscript);
          
          if (transcribedText) {
            const newFormData = new FormData();
            newFormData.append("voice_prescription_text", (transcribedText || "").trim());
            
            Array.from(formData.entries()).forEach(([key, value]) => {
              if (key !== '' && key !== 'voice_prescription_text' && key !== 'voice_prescription_previous_context') {
                newFormData.append(key, value);
              }
            });
            
            // Ensure voice_prescription_previous_context is included with latest data
            const data = preparePayloadForApi();
            const previousContextPayload = {
              digitize: data
            };
            newFormData.append(
              "voice_prescription_previous_context",
              JSON.stringify(previousContextPayload)
            );
            
            // Ensure all required fields are in FormData
            if (!newFormData.has("doctorId")) {
              newFormData.append("doctorId", doctorId);
            }
            if (!newFormData.has("patientId")) {
              newFormData.append("patientId", patientId);
            }
            if (!newFormData.has("schemaKey")) {
              newFormData.append("schemaKey", "default");
            }
            if (!newFormData.has("getConversation")) {
              newFormData.append("getConversation", "true");
            }
            
            if (consent && typeof consent === 'object' && !newFormData.has("consent")) {
              newFormData.append("consent", JSON.stringify(consent));
            }
            
            response = await updateAmbientRx(
              newFormData,
              genRxDetails?._id,
              patientId,
              admissionId
            );
          } else {
            // Ensure voice_prescription_previous_context is included with latest data
            const data = preparePayloadForApi();
            const previousContextPayload = {
              digitize: data
            };
            formData.append(
              "voice_prescription_previous_context",
              JSON.stringify(previousContextPayload)
            );
            
            // Ensure all required fields are in FormData
            if (!formData.has("doctorId")) {
              formData.append("doctorId", doctorId);
            }
            if (!formData.has("patientId")) {
              formData.append("patientId", patientId);
            }
            if (!formData.has("schemaKey")) {
              formData.append("schemaKey", "default");
            }
            if (!formData.has("getConversation")) {
              formData.append("getConversation", "true");
            }
            
            if (consent && typeof consent === 'object' && !formData.has("consent")) {
              formData.append("consent", JSON.stringify(consent));
            }
            
            response = await updateAmbientRx(
              formData,
              genRxDetails?._id,
              patientId,
              admissionId
            );
          }
        } else {
          // Ensure all required fields are in FormData
          if (!formData.has("doctorId")) {
            formData.append("doctorId", doctorId);
          }
          if (!formData.has("patientId")) {
            formData.append("patientId", patientId);
          }
          if (!formData.has("schemaKey")) {
            formData.append("schemaKey", "default");
          }
          if (!formData.has("getConversation")) {
            formData.append("getConversation", "true");
          }
          
          if (consent && typeof consent === 'object' && !formData.has("consent")) {
            formData.append("consent", JSON.stringify(consent));
          }
          
          response = await generateAmbientRx(
            formData,
            patientId,
            admissionId
          );
          
          if (transcribedText) {
            setFullTranscript(transcribedText);
          }
        }
                        // Handle response structure for ambient API
        // Note: axiosService interceptor returns response.data, so response structure might be nested
        const responseData = response?.data || response;
        
        // For ambient API, the actual data might be in responseData.data (double nesting)
        const actualData = responseData?.data || responseData;
        
        // Check for success - ambient API might return data directly or wrapped
        const isSuccess = (response?.success !== false || responseData?.success !== false || actualData?.success !== false) && (actualData || responseData) && (
          actualData?.digitize || 
          responseData?.digitize ||
          actualData?.rx || 
          responseData?.rx ||
          actualData?.symptoms || 
          responseData?.symptoms ||
          actualData?.conversation ||
          responseData?.conversation ||
          actualData?.rxDigitizationHistory ||
          responseData?.rxDigitizationHistory ||
          actualData?._id || // Ambient API returns _id on success
          responseData?._id ||
          actualData?.source || // Ambient API might return source directly
          responseData?.source ||
          (actualData?.rxDigitizationHistory && Array.isArray(actualData.rxDigitizationHistory) && actualData.rxDigitizationHistory.length > 0) ||
          (responseData?.rxDigitizationHistory && Array.isArray(responseData.rxDigitizationHistory) && responseData.rxDigitizationHistory.length > 0)            
        );
        
        if (isSuccess) {
          const finalResponseData = actualData || responseData;
          
          if (!finalResponseData) {
            console.error('❌ Response data is null or undefined');
            throw new Error('No data received from API');
          }
          
          if (!isFromSC) {
            let prescriptionData = null;
            let conversationData = null;
            
            // Handle ambient API response structure
            if (isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX || genRxDetails?.type === 'ambient') {
              // Priority 1: Check for editedData (contains user edits including dosage)
              if (finalResponseData.editedData || actualData?.editedData || responseData?.editedData) {
                prescriptionData = finalResponseData.editedData || actualData?.editedData || responseData.editedData;
              }
              // Priority 2: Check for digitizeData (aggregated data)
              else if (finalResponseData.digitizeData || actualData?.digitizeData || responseData?.digitizeData) {
                prescriptionData = finalResponseData.digitizeData || actualData?.digitizeData || responseData.digitizeData;
              }
              // Priority 3: Check for digitize object (single digitization)
              else if (finalResponseData.digitize || actualData?.digitize || responseData?.digitize) {
                // Extract prescription data from digitize object
                const digitizeObj = finalResponseData.digitize || actualData?.digitize || responseData?.digitize;
                if (digitizeObj && typeof digitizeObj === 'object' && !Array.isArray(digitizeObj)) {
                  const numericKeys = Object.keys(digitizeObj).filter(key => /^\d+$/.test(key));
                  if (numericKeys.length > 0) {
                    prescriptionData = digitizeObj[numericKeys[0]];
                  } else if (digitizeObj.symptoms || digitizeObj.medications || digitizeObj.vitalsAndBodyComposition) {
                    prescriptionData = digitizeObj;
                  } else {
                    prescriptionData = digitizeObj;
                  }
                } else {
                  prescriptionData = digitizeObj;
                }
              } else if (finalResponseData.rxDigitizationHistory && Array.isArray(finalResponseData.rxDigitizationHistory) && finalResponseData.rxDigitizationHistory.length > 0) {
                // Find the latest ambient entry (for get/edit operations)
                const ambientEntries = responseData.rxDigitizationHistory.filter(h => h.category === "ambient-rx");
                const latestAmbientEntry = ambientEntries[ambientEntries.length - 1];
                
                if (latestAmbientEntry) {
                  prescriptionData = latestAmbientEntry.payload?.response || 
                                   latestAmbientEntry.response || 
                                   latestAmbientEntry.payload;
                  
                  if (latestAmbientEntry.payload?.conversation) {
                    conversationData = latestAmbientEntry.payload.conversation;
                  }
                }
              } else if (responseData.symptoms || responseData.medications || responseData.vitalsAndBodyComposition) {
                // Direct prescription data in response (fallback)
              prescriptionData = responseData;
            }
              
              // Handle conversation data for ambient mode (if not already set)
              if (!conversationData) {
                if (responseData.conversation) {
                  conversationData = responseData.conversation;
                } else if (responseData.rxDigitizationHistory?.[0]?.payload?.conversation) {
                  conversationData = responseData.rxDigitizationHistory[0].payload.conversation;
                }
              }
            } else {
              // Handle dictate mode response structure (existing logic)
              // Priority 1: Check for editedData (contains user edits including dosage)
              if (actualData?.editedData) {
                prescriptionData = actualData.editedData;
              }
              else if (responseData?.editedData) {
                prescriptionData = responseData.editedData;
              }
              // Priority 2: Check for digitizeData (aggregated data)
              else if (actualData?.digitizeData) {
                prescriptionData = actualData.digitizeData;
              }
              else if (responseData?.digitizeData) {
                prescriptionData = responseData.digitizeData;
              }
              // Priority 3: Check for direct prescription data
              else if (actualData?.symptoms || actualData?.medications || actualData?.vitalsAndBodyComposition) {                                                   
                prescriptionData = actualData;
              }
              else if (responseData?.symptoms || responseData?.medications || responseData?.vitalsAndBodyComposition) {                                                   
                prescriptionData = responseData;
              }
              else if (actualData?.rxDigitizationHistory?.[0]?.payload?.response) {                                                                              
                prescriptionData = actualData.rxDigitizationHistory[0].payload.response;                                                                        
              }
              else if (responseData?.rxDigitizationHistory?.[0]?.payload?.response) {                                                                              
              prescriptionData = responseData.rxDigitizationHistory[0].payload.response;
            }
              else if (actualData?.rxDigitizationHistory?.[0]?.response) {
                prescriptionData = actualData.rxDigitizationHistory[0].response;
              }
              else if (responseData?.rxDigitizationHistory?.[0]?.response) {
              prescriptionData = responseData.rxDigitizationHistory[0].response;
            }
              else if (actualData?.rxDigitizationHistory?.[0]?.payload?.symptoms || actualData?.rxDigitizationHistory?.[0]?.payload?.medications) {                                                                              
                prescriptionData = actualData.rxDigitizationHistory[0].payload;
              }
              else if (responseData?.rxDigitizationHistory?.[0]?.payload?.symptoms ||                                                                              
                       responseData?.rxDigitizationHistory?.[0]?.payload?.medications) {                                                                           
              prescriptionData = responseData.rxDigitizationHistory[0].payload;
            }
              else if (actualData?.digitize || responseData?.digitize) {
                const digitizeObj = actualData?.digitize || responseData?.digitize;
                if (digitizeObj && typeof digitizeObj === 'object' && !Array.isArray(digitizeObj)) {
                  const numericKeys = Object.keys(digitizeObj).filter(key => /^\d+$/.test(key));
                  if (numericKeys.length > 0) {
                    prescriptionData = digitizeObj[numericKeys[0]];
                  } else if (digitizeObj.symptoms || digitizeObj.medications || digitizeObj.vitalsAndBodyComposition) {
                    prescriptionData = digitizeObj;
                  } else {
                    prescriptionData = digitizeObj;
                  }
                } else {
                  prescriptionData = digitizeObj;
                }
              }
              else if (actualData?.prescription) {
                prescriptionData = actualData.prescription;
              }
              else if (responseData?.prescription) {
              prescriptionData = responseData.prescription;
            }
              else if (actualData?.rx) {
                prescriptionData = actualData.rx;
              }
              else if (responseData?.rx) {
              prescriptionData = responseData.rx;
            }
            }
            
            if (prescriptionData && prescriptionData.vitalsAndBodyComposition) {
              const vitals = prescriptionData.vitalsAndBodyComposition;
              const actualVitals = vitals._doc || vitals;
              const cleanedVitals = {};
              
              Object.keys(actualVitals).forEach(key => {
                if (actualVitals[key] !== undefined && actualVitals[key] !== null) {
                  cleanedVitals[key] = actualVitals[key];
                }
              });
              
              prescriptionData.vitalsAndBodyComposition = cleanedVitals;
            }
            
                        // Handle conversation data for both modes
            if (!conversationData) {
                          // Handle conversation data for dictate mode (if not already set)
            if (!conversationData) {
              if (actualData?.rxDigitizationHistory?.[0]?.payload?.conversation) {                                                                               
                conversationData = actualData.rxDigitizationHistory[0].payload.conversation;                                                                    
              } else if (responseData?.rxDigitizationHistory?.[0]?.payload?.conversation) {                                                                               
              conversationData = responseData.rxDigitizationHistory[0].payload.conversation;
              } else if (actualData?.conversation) {
                conversationData = actualData.conversation;
              } else if (responseData?.conversation) {
              conversationData = responseData.conversation;
              } else if (actualData?.digitize?.conversation) {
                conversationData = actualData.digitize.conversation;
              } else if (responseData?.digitize?.conversation) {
              conversationData = responseData.digitize.conversation;
              } else if (actualData?.rx?.conversation) {
                conversationData = actualData.rx.conversation;
              } else if (responseData?.rx?.conversation) {
              conversationData = responseData.rx.conversation;
            } else if (prescriptionData?.conversation) {
              conversationData = prescriptionData.conversation;
            }
            }
            }
            
            // For ambient mode, we need to track conversations separately for each transcript box
            // Similar to how dictate mode uses queries array - each box should only contain its own conversations
            if (conversationData && (isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX)) {
              const isAudioInput = !!audioBlobParam;
              
              // For text inputs, always use only the typed text to avoid cumulative conversation issues
              // For audio inputs, try to extract only new conversations from API response
              let conversationsToStore = [];
              
              if (!isAudioInput && transcribedText) {
                // Text input: Use only the text that was just typed
                conversationsToStore = [{
                  speaker: 'doctor',
                  text: transcribedText,
                  message: transcribedText,
                  content: transcribedText
                }];
              } else if (isAudioInput && conversationData) {
                // Audio input: Extract only NEW conversations that weren't in previous queries
                // Get all previous conversations from existing queries
                const previousConversations = queries.flatMap(q => {
                  if (q.conversations && Array.isArray(q.conversations)) {
                    return q.conversations;
                  }
                  return [];
                });
                
                // Extract only new conversations that weren't in previous queries
                // Compare by text content and speaker to identify new ones
                const newConversations = conversationData.filter(newConv => {
                  const newText = newConv?.message || newConv?.text || newConv?.content || '';
                  const newSpeaker = (newConv?.speaker || '').toLowerCase();
                  
                  // Check if this conversation already exists in previous queries
                  return !previousConversations.some(prevConv => {
                    const prevText = prevConv?.message || prevConv?.text || prevConv?.content || '';
                    const prevSpeaker = (prevConv?.speaker || '').toLowerCase();
                    return prevText === newText && prevSpeaker === newSpeaker;
                  });
                });
                
                // Use new conversations if found, otherwise fallback to transcription text
                conversationsToStore = newConversations.length > 0 ? newConversations : (
                  transcribedText ? [{
                    speaker: 'doctor',
                    text: transcribedText,
                    message: transcribedText,
                    content: transcribedText
                  }] : []
                );
              }
              
              // Calculate duration for this specific interaction (same as dictate mode)
              // Use duration from the audio blob that was just recorded (already calculated before API call)
              // Use the duration that was calculated before the API call (stored in currentRecordingDuration)
              // This ensures each box shows the duration of that specific recording, not cumulative
              const queryDuration = isAudioInput ? currentRecordingDuration : null;
              
              // Create a new ambient query entry with ONLY the new conversations for this interaction
              const newAmbientQuery = {
                conversations: conversationsToStore,
                isAudio: isAudioInput,
                duration: queryDuration,
                text: transcribedText || ''
              };
              
              // Determine if this is editing existing or adding new
              const newQueryIndex = isEditing ? queries.length - 1 : queries.length;
              const updatedQueries = isEditing
                ? [
                    ...queries.slice(0, queries.length - 1),
                    newAmbientQuery,
                  ]
                : [...queries, newAmbientQuery];
              
              setQueries(updatedQueries);
              
              // Auto-collapse previous boxes and expand only the new one (but only if this is not the first transcript)
              if (!isEditing && queries.length > 0) {
                // Collapse the first transcript box (only if we're adding a second or subsequent transcript)
                setIsTranscriptExpanded(false);
                
                const newCardIndex = newQueryIndex;
                
                // Collapse all previous transcript boxes and only expand the new one
                setExpandedTranscripts(new Set([newCardIndex]));
              } else if (!isEditing && queries.length === 0) {
                // This is the first transcript - keep it expanded
                setIsTranscriptExpanded(true);
                setExpandedTranscripts(new Set());
              }
              
              // Also set conversations for backward compatibility (first box) - use cumulative for global state
              setConversations(conversationData);
            } else if (conversationData) {
              setConversations(conversationData);
            }
            
            if (prescriptionData) {
              if (prescriptionData?.labResults && Array.isArray(prescriptionData.labResults) && prescriptionData.labResults.length > 0) {
                try {
                  const { matchLabResultsWithApi } = await import('../utils/matchLabResultsWithApi');
                  prescriptionData.labResults = await matchLabResultsWithApi(prescriptionData.labResults, patient_data);
                } catch (error) {
                  console.error('Error matching lab results with API:', error);
                }
              }
              
              const validatedPrescriptionData = validatePrescriptionData(prescriptionData);
              
              // Track which sections were initially populated from API BEFORE setting state
              if (validatedPrescriptionData.symptoms && Array.isArray(validatedPrescriptionData.symptoms) && validatedPrescriptionData.symptoms.length > 0) {
                initiallyPopulatedSectionsRef.current.add('symptoms');
              }
              if (validatedPrescriptionData.vaccinations && Array.isArray(validatedPrescriptionData.vaccinations) && validatedPrescriptionData.vaccinations.length > 0) {
                initiallyPopulatedSectionsRef.current.add('vaccinations');
              }
              if (validatedPrescriptionData?.medicalHistory && Array.isArray(validatedPrescriptionData.medicalHistory) && validatedPrescriptionData.medicalHistory.length > 0) {
                initiallyPopulatedSectionsRef.current.add('medicalHistory');
                validatedPrescriptionData.medicalHistory.forEach(item => {
                  const type = item.type?.toLowerCase().replace(/\s+/g, '_') || 'others';
                  initiallyPopulatedMedicalHistoryTypesRef.current.add(type);
                });
              }
              if (validatedPrescriptionData.examinations && Array.isArray(validatedPrescriptionData.examinations) && validatedPrescriptionData.examinations.length > 0) {
                initiallyPopulatedSectionsRef.current.add('examinations');
              }
              if (validatedPrescriptionData.diagnosis && Array.isArray(validatedPrescriptionData.diagnosis) && validatedPrescriptionData.diagnosis.length > 0) {
                initiallyPopulatedSectionsRef.current.add('diagnosis');
              }
              if (validatedPrescriptionData.advice && ((typeof validatedPrescriptionData.advice === 'string' && validatedPrescriptionData.advice.trim()) || (Array.isArray(validatedPrescriptionData.advice) && validatedPrescriptionData.advice.length > 0))) {
                initiallyPopulatedSectionsRef.current.add('advice');
              }
              if (validatedPrescriptionData.others && Array.isArray(validatedPrescriptionData.others) && validatedPrescriptionData.others.length > 0) {
                initiallyPopulatedSectionsRef.current.add('others');
              }
              if (validatedPrescriptionData.followUp && validatedPrescriptionData.followUp.trim()) {
                initiallyPopulatedSectionsRef.current.add('followUp');
              }
              if (validatedPrescriptionData.vitalsAndBodyComposition && Object.keys(validatedPrescriptionData.vitalsAndBodyComposition).length > 0) {
                initiallyPopulatedSectionsRef.current.add('vitalsAndBodyComposition');
              }
              if (validatedPrescriptionData.labResults && Array.isArray(validatedPrescriptionData.labResults) && validatedPrescriptionData.labResults.length > 0) {
                initiallyPopulatedSectionsRef.current.add('labResults');
              }
              if (validatedPrescriptionData.medications && Array.isArray(validatedPrescriptionData.medications) && validatedPrescriptionData.medications.length > 0) {
                initiallyPopulatedSectionsRef.current.add('medications');
              }
              if (validatedPrescriptionData.labInvestigation && Array.isArray(validatedPrescriptionData.labInvestigation) && validatedPrescriptionData.labInvestigation.length > 0) {
                initiallyPopulatedSectionsRef.current.add('labInvestigation');
              }
              if (validatedPrescriptionData.dynamicFields && typeof validatedPrescriptionData.dynamicFields === 'object') {
                Object.entries(validatedPrescriptionData.dynamicFields).forEach(([moduleName, moduleData]) => {
                  if (Array.isArray(moduleData) && moduleData.length > 0) {
                    initiallyPopulatedSectionsRef.current.add(`dynamicFields.${moduleName}`);
                  }
                });
              }
              
              // Process medications to ensure dosage/unitPerDose is properly mapped
              if (validatedPrescriptionData?.medications && Array.isArray(validatedPrescriptionData.medications)) {
                validatedPrescriptionData.medications = validatedPrescriptionData.medications.map(med => {
                  // Map unitPerDose to dosage if dosage is not present but unitPerDose is
                  if (!med.dosage && med.unitPerDose) {
                    med.dosage = med.unitPerDose;
                  }
                  // If dosage is still not present, try to extract from lineItem or other fields
                  if (!med.dosage) {
                    // Check if there's a dosage field with different casing
                    if (med.Dosage) {
                      med.dosage = med.Dosage;
                    } else if (med.unit_per_dose) {
                      med.dosage = med.unit_per_dose;
                    }
                  }
                  return med;
                });
              }
              
              
              setPrescriptionData((prevData) => {
                const apiDynamicFields = validatedPrescriptionData?.dynamicFields || {};
                const prevDynamicFields = prevData?.dynamicFields || {};
                const mergedDynamicFields = {
                  ...prevDynamicFields,
                  ...apiDynamicFields,
                };
                localModules.forEach(moduleName => {
                  if (!mergedDynamicFields[moduleName]) {
                    mergedDynamicFields[moduleName] = [];
                  }
                });

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

                    // Preserve existing vitals and lab results if they exist and API doesn't provide them
                    const existingVitals = prevData?.vitalsAndBodyComposition || {};
                    const existingLabResults = prevData?.labResults || [];
                    const apiVitals = validatedPrescriptionData?.vitalsAndBodyComposition || {};
                    const apiLabResults = validatedPrescriptionData?.labResults || [];
                    
                    const hasExistingVitals = Object.keys(existingVitals).length > 0 && 
                      Object.values(existingVitals).some(v => {
                        const strValue = String(v || '').trim();
                        return strValue !== '' && strValue !== 'undefined' && strValue !== 'null';
                      });
                    const hasApiVitals = Object.keys(apiVitals).length > 0 && 
                      Object.values(apiVitals).some(v => {
                        const strValue = String(v || '').trim();
                        return strValue !== '' && strValue !== 'undefined' && strValue !== 'null';
                      });
                    
                    const hasExistingLabResults = Array.isArray(existingLabResults) && existingLabResults.length > 0 && 
                      existingLabResults.some(r => {
                        const testname = (r.testname || r.name || '').trim();
                        const value = (r.value || '').trim();
                        return testname !== '' && value !== '' && value !== 'undefined' && value !== 'null';
                      });
                    const hasApiLabResults = Array.isArray(apiLabResults) && apiLabResults.length > 0 && 
                      apiLabResults.some(r => {
                        const testname = (r.testname || r.name || '').trim();
                        const value = (r.value || '').trim();
                        return testname !== '' && value !== '' && value !== 'undefined' && value !== 'null';
                      });
                    
                    const finalVitals = hasApiVitals ? apiVitals : (hasExistingVitals ? existingVitals : {});
                    
                    return {
                      ...finalPrescriptionData,
                      vitalsAndBodyComposition: finalVitals,
                      labResults: hasApiLabResults ? apiLabResults : (hasExistingLabResults ? existingLabResults : []),
                      medicalHistory: validatedPrescriptionData.medicalHistory || [],
                      dynamicFields: mergedDynamicFields,
                    };
              });
            } else {
              setPrescriptionData(prev => {
                // Preserve existing vitals and lab results if they exist
                const existingVitals = prev?.vitalsAndBodyComposition || {};
                const existingLabResults = prev?.labResults || [];
                const hasVitals = Object.keys(existingVitals).length > 0 && 
                  Object.values(existingVitals).some(v => String(v || '').trim() !== '' && String(v).trim() !== 'undefined' && String(v).trim() !== 'null');
                const hasLabResults = Array.isArray(existingLabResults) && existingLabResults.length > 0 && 
                  existingLabResults.some(r => {
                    const testname = (r.testname || r.name || '').trim();
                    const value = (r.value || '').trim();
                    return testname !== '' && value !== '' && value !== 'undefined' && value !== 'null';
                  });
                
                return {
                  symptoms: [],
                  medications: [],
                  vitalsAndBodyComposition: hasVitals ? existingVitals : {},
                  labResults: hasLabResults ? existingLabResults : [],
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
                };
              });
            }

            // Only update conversations this way if not in ambient mode (ambient mode uses queries array above)
            if (!isAmbientMode && mode !== 'ambient' && window.TATVA_ACTIVE_VOICE_SERVICE !== S_AMBIENT_VOICE_RX) {
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
          }

          // Update genRxDetails - check both actualData and responseData
          const sourceFromResponse = actualData?.source || responseData?.data?.source || responseData?.source;
          const sourceDurationFromResponse = actualData?.source_duration || responseData?.data?.source_duration || responseData?.source_duration;
          const timeRequiredFromResponse = actualData?.timeRequiredInMs || responseData?.data?.timeRequiredInMs || responseData?.timeRequiredInMs;
          const idFromResponse = actualData?._id || responseData?.data?._id || responseData?._id;

          setGenRxDetails({
            source: sourceFromResponse || genRxDetails?.source || '',
            source_duration: sourceDurationFromResponse || genRxDetails?.source_duration,
            timeRequiredInMs: timeRequiredFromResponse || genRxDetails?.timeRequiredInMs,
            type: "ambient",
            _id: idFromResponse || genRxDetails?._id,
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
        const formData = new FormData();
        if (audioBlobParam) {
          const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          const arrayBuffer = await audioBlobParam.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          const duration = audioBuffer.duration;
          formData.append("file", audioBlobParam);
          formData.append("voice_prescription_filename", `${uuidv4()}.webm`);
          formData.append("source_duration", duration.toString());
        } else {
          formData.append("voice_prescription_text", transcribedText);
          // When data is in JSON format (text-only, no audio), source_duration should be 0
          formData.append("source_duration", "0");
        }
        if (genRxDetails?._id) {
          const data = preparePayloadForApi();
          formData.append(
            "voice_prescription_previous_context",
            JSON.stringify(data)
          );
        }
        formData.append("doctorId", doctorId);
        formData.append("patientId", patient_data?.patient_unique_id);

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
          
          // Initialize transcript variables outside the conditional block
          let updatedTranscript = null;
          let updatedQueries = queries;
          
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
              // Always fetch today's vitals and merge with response vitals (similar to lab results)
              const hasResponseVitals = prescriptionData?.vitalsAndBodyComposition && 
                Object.keys(prescriptionData.vitalsAndBodyComposition).length > 0 &&
                Object.values(prescriptionData.vitalsAndBodyComposition).some(v => {
                  const strValue = String(v || '').trim();
                  return strValue !== '' && strValue !== 'undefined' && strValue !== 'null';
                });
              
              // Always fetch today's vitals to merge with response vitals
              if (patient_data?.patient_unique_id) {
                try {
                  const { getTodayVitals } = await import('../utils/getTodayVitals');
                  const todayVitals = await getTodayVitals(patient_data);
                  
                  if (todayVitals) {
                    if (hasResponseVitals) {
                      const mergedVitals = { ...todayVitals };
                      Object.entries(prescriptionData.vitalsAndBodyComposition || {}).forEach(([key, value]) => {
                        if (key === 'date') return;
                        const strValue = String(value || '').trim();
                        if (strValue !== '' && strValue !== 'undefined' && strValue !== 'null') {
                          mergedVitals[key] = strValue;
                        }
                      });
                      prescriptionData.vitalsAndBodyComposition = mergedVitals;
                    } else {
                      prescriptionData.vitalsAndBodyComposition = todayVitals;
                    }
                  }
                } catch (error) {
                  console.error('Error loading vitals from listVitals API:', error);
                }
              }
              
              
              if (prescriptionData?.labResults && Array.isArray(prescriptionData.labResults) && prescriptionData.labResults.length > 0) {
                try {
                  const { matchLabResultsWithApi } = await import('../utils/matchLabResultsWithApi');
                  prescriptionData.labResults = await matchLabResultsWithApi(prescriptionData.labResults, patient_data);
                } catch (error) {
                  console.error('Error matching lab results with API:', error);
                }
              }
              if (prescriptionData.symptoms && Array.isArray(prescriptionData.symptoms) && prescriptionData.symptoms.length > 0) {
                initiallyPopulatedSectionsRef.current.add('symptoms');
              }
              if (prescriptionData.vaccinations && Array.isArray(prescriptionData.vaccinations) && prescriptionData.vaccinations.length > 0) {
                initiallyPopulatedSectionsRef.current.add('vaccinations');
              }
              if (prescriptionData?.medicalHistory && Array.isArray(prescriptionData.medicalHistory) && prescriptionData.medicalHistory.length > 0) {
                initiallyPopulatedSectionsRef.current.add('medicalHistory');
                // Track which medical history types were initially populated
                prescriptionData.medicalHistory.forEach(item => {
                  const type = item.type?.toLowerCase().replace(/\s+/g, '_') || 'others';
                  initiallyPopulatedMedicalHistoryTypesRef.current.add(type);
                });
              }
              if (prescriptionData.examinations && Array.isArray(prescriptionData.examinations) && prescriptionData.examinations.length > 0) {
                initiallyPopulatedSectionsRef.current.add('examinations');
              }
              if (prescriptionData.diagnosis && Array.isArray(prescriptionData.diagnosis) && prescriptionData.diagnosis.length > 0) {
                initiallyPopulatedSectionsRef.current.add('diagnosis');
              }
              if (prescriptionData.advice && ((typeof prescriptionData.advice === 'string' && prescriptionData.advice.trim()) || (Array.isArray(prescriptionData.advice) && prescriptionData.advice.length > 0))) {
                initiallyPopulatedSectionsRef.current.add('advice');
              }
              if (prescriptionData.others && Array.isArray(prescriptionData.others) && prescriptionData.others.length > 0) {
                initiallyPopulatedSectionsRef.current.add('others');
              }
              if (prescriptionData.followUp && prescriptionData.followUp.trim()) {
                initiallyPopulatedSectionsRef.current.add('followUp');
              }
              if (prescriptionData.vitalsAndBodyComposition && Object.keys(prescriptionData.vitalsAndBodyComposition).length > 0) {
                initiallyPopulatedSectionsRef.current.add('vitalsAndBodyComposition');
              }
              if (prescriptionData.labResults && Array.isArray(prescriptionData.labResults) && prescriptionData.labResults.length > 0) {
                initiallyPopulatedSectionsRef.current.add('labResults');
              }
              if (prescriptionData.medications && Array.isArray(prescriptionData.medications) && prescriptionData.medications.length > 0) {
                initiallyPopulatedSectionsRef.current.add('medications');
              }
              if (prescriptionData.labInvestigation && Array.isArray(prescriptionData.labInvestigation) && prescriptionData.labInvestigation.length > 0) {
                initiallyPopulatedSectionsRef.current.add('labInvestigation');
              }
              // Track dynamicFields modules
              if (prescriptionData.dynamicFields && typeof prescriptionData.dynamicFields === 'object') {
                Object.entries(prescriptionData.dynamicFields).forEach(([moduleName, moduleData]) => {
                  if (Array.isArray(moduleData) && moduleData.length > 0) {
                    initiallyPopulatedSectionsRef.current.add(`dynamicFields.${moduleName}`);
                  }
                });
              }
              
              const validatedPrescriptionDataForDictate = validatePrescriptionData(prescriptionData);
              if (validatedPrescriptionDataForDictate) {
                // Use validated payload as-is for dictate response (keeps vitals intact).
                setPrescriptionData(validatedPrescriptionDataForDictate);
                
                
              }
            }
            
            if (conversationData) {
              setConversations(conversationData);
            }
            
                                    // Update transcript for dictate mode
            // Check both responseData.data and responseData for transcription
            const transcription = responseData?.data?.transcription || responseData?.transcription;
            
            if (transcription) {
              // Determine if this is audio or text input
              const isAudioInput = !!audioBlobParam;
              // Get duration from response or calculate from audio blob
              let queryDuration = null;
              if (isAudioInput && audioBlobParam) {
                                                                 // Use source_duration from response if available (check both levels)                                                                           
                queryDuration = responseData?.data?.source_duration || responseData?.source_duration || null;
                // If not available, try to calculate from blob
                if (!queryDuration) {
                  try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const arrayBuffer = await audioBlobParam.arrayBuffer();
                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                    queryDuration = audioBuffer.duration;
                  } catch (e) {
                    console.warn('Could not calculate audio duration:', e);
                  }
                }
              }
              
              // Create query object with metadata
              const newQuery = {
                text: transcription,
                isAudio: isAudioInput,
                duration: queryDuration
              };
              
              // Add new transcription to queries
              const newQueryIndex = isEditing ? queries.length - 1 : queries.length;
              updatedQueries = isEditing
                ? [
                    ...queries.slice(0, queries.length - 1),
                    newQuery,
                  ]
                : [...queries, newQuery];
              
                            setQueries(updatedQueries);
              
                            // Auto-collapse previous boxes and expand only the new one (but only if this is not the first transcript)
              if (!isEditing && queries.length > 0) {
                // Collapse the first transcript box (only if we're adding a second or subsequent transcript)
                setIsTranscriptExpanded(false);
                
                const newCardIndex = newQueryIndex;
                
                // Collapse all previous transcript boxes and only expand the new one                                                                           
                setExpandedTranscripts(new Set([newCardIndex]));
              } else if (!isEditing && queries.length === 0) {
                // This is the first transcript - keep it expanded
                setIsTranscriptExpanded(true);
                setExpandedTranscripts(new Set());
              }
              
              const existingTranscript = fullTranscript || genRxDetails?.source || '';
              updatedTranscript = existingTranscript 
                ? (existingTranscript + ' ' + transcription).trim()
                : transcription;
              setFullTranscript(updatedTranscript);
                                                   } else if ((responseData?.data?.history && Array.isArray(responseData.data.history) && responseData.data.history.length > 0) ||
                         (responseData?.history && Array.isArray(responseData.history) && responseData.history.length > 0)) {
                 // If history exists, use it to build the full transcript
                 const history = responseData?.data?.history || responseData.history;
              const validTranscriptions = history
                .map(({ transcription, source_duration }) => ({
                  text: transcription,
                  isAudio: !!source_duration,
                  duration: source_duration || null
                }))
                .filter((query) => query.text && query.text !== "null" && query.text);
              
              if (validTranscriptions.length > 0) {
                updatedTranscript = validTranscriptions.map(q => q.text).join(' ');
                updatedQueries = validTranscriptions;
                setQueries(updatedQueries);
                setFullTranscript(updatedTranscript);
              }
                                                                                                   } else if (responseData?.data?.source || responseData?.source) {
                 // If source exists but no transcription, use source
                 const source = responseData?.data?.source || responseData.source;
              if (genRxDetails?._id) {
                const existingTranscript = fullTranscript || genRxDetails?.source || '';                                                                        
                updatedTranscript = (existingTranscript + ' ' + source).trim();                                                                    
              } else {
                updatedTranscript = source;
              }
              setFullTranscript(updatedTranscript);
            }
          }

                    // Determine the correct type based on mode - for dictate mode, always keep as 'dictate'                                                              
          const correctType = (isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX || genRxDetails?.type === 'ambient')                                                                             
            ? 'ambient' 
            : 'dictate';

          // Calculate the updated source transcript - use source from response if available, otherwise use updatedTranscript                                    
          // For updates, append new transcription to existing source
          // Check responseData.data first (for nested structure), then responseData directly
          const sourceFromResponse = responseData?.data?.source || responseData?.source;
          const transcriptionFromResponse = responseData?.data?.transcription || responseData?.transcription;
          const sourceDurationFromResponse = responseData?.data?.source_duration || responseData?.source_duration;
          const timeRequiredFromResponse = responseData?.data?.timeRequiredInMs || responseData?.timeRequiredInMs;
          const idFromResponse = responseData?.data?._id || responseData?._id;
          
          let updatedSource = '';
          
          if (isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX || genRxDetails?.type === 'ambient') {
            // For ambient mode, use source from response or keep existing
            if (sourceFromResponse) {
              updatedSource = sourceFromResponse;
            } else if (genRxDetails?._id && transcriptionFromResponse) {
              // When updating, append the new transcription to existing source
              const existingSource = genRxDetails?.source || fullTranscript || '';
              updatedSource = (existingSource + ' ' + transcriptionFromResponse).trim();
            } else {
              updatedSource = genRxDetails?.source || fullTranscript || '';
            }
          } else {
            // For dictate mode
            if (genRxDetails?._id && transcriptionFromResponse) {
              // When updating, append the new transcription to existing source
              const existingSource = genRxDetails?.source || fullTranscript || '';
              updatedSource = (existingSource + ' ' + transcriptionFromResponse).trim();                                                                         
            } else {
              // For new prescriptions or when source is provided directly
              updatedSource = sourceFromResponse || updatedTranscript || fullTranscript || genRxDetails?.source || '';                                           
            }
          }

          setGenRxDetails({
            source: updatedSource || genRxDetails?.source || '',
            source_duration: sourceDurationFromResponse || genRxDetails?.source_duration,                                                                     
            timeRequiredInMs: timeRequiredFromResponse || genRxDetails?.timeRequiredInMs,                                                                  
            type: correctType,
            _id: idFromResponse || genRxDetails?._id,
          });
          setInputText("");
          setIsEditing(false);
          setUseVoiceRx(true);
          setShowPrescription(true);
          
        } else {
          if (response.success === false && response.data === null) {
            throw new Error(response.error || "Server error - API returned failure with null data");
          } else {
            throw new Error(response.error || "Failed to process prescription");
          }
        }
      }
    } catch (error) {
      console.error("❌ Error in voice digitization:", error);
      console.error("❌ Error details:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status
      });
      
      // Handle specific error cases
      if (error?.message?.includes("Cannot set properties of null")) {
        message.error("Data processing error - please try again");
      } else if (error?.response?.status === 401) {
        message.error("Authorization error - please check your login");
      } else if (error?.response?.status === 500) {
        message.error("Server error - please try again later");
      } else if (error?.message?.includes("Network Error") || error?.code === 'NETWORK_ERROR') {                                                                  
        message.error("Network connection error - please check your internet connection");
      } else if (error?.message?.includes("timeout") || error?.code === 'ECONNABORTED') {                                                                         
        message.error("Request timeout - the server is taking too long to respond");
      } else if (error?.response?.status === 404) {
        message.error("Service not found - please contact support");
      } else if (error?.response?.status === 403) {
        message.error("Access denied - insufficient permissions");
      } else if (error?.message?.includes("failed to load")) {
        message.error("Failed to load prescription data - please refresh and try again");
      } else {
        message.error(error?.message || "Failed to process prescription");
      }
    } finally {
      setIsProcessing(false);
      setIsRecording(false);
    }
  };

  const handleUpdateGenRX = async (
    quantityActionMedicine,
    sanitizedMedications
  ) => {
    try {
      let response;
      const updatedPrescriptionData = {
        ...prescriptionData,
        medications: sanitizedMedications.map((item, index) => {
          const quantityValue =
            quantityActionMedicine?.medicines?.[index]?.quantity;
          let quantity = 0;

          if (
            typeof quantityValue === "number" &&
            Number.isFinite(quantityValue)
          ) {
            quantity = quantityValue;
          } else if (quantityValue !== undefined && quantityValue !== null) {
            const parsedQuantity = Number(quantityValue);
            quantity = Number.isFinite(parsedQuantity) ? parsedQuantity : 0;
          }

          return {
            ...item,
            quantity,
          };
        }),
      };
      
      if (isAmbientMode && genRxDetails?.type === "ambient") {
        response = await editAmbientRxDetails(
        { editedData: updatedPrescriptionData },
        genRxDetails?._id
      );
      } else {
        response = await editGenRxDetails(
          { editedData: updatedPrescriptionData },
          genRxDetails?._id
        );
      }
      
      if (response.status === 204 || response.success) {
        setGenRxDetails({
          source: response.data?.source || genRxDetails.source,
          source_duration: response.data?.source_duration || genRxDetails.source_duration,
          timeRequiredInMs: response.data?.timeRequiredInMs || genRxDetails.timeRequiredInMs,
          type: response.data?.type || genRxDetails.type,
          _id: response.data?._id || genRxDetails._id,
        });
        
      } else {
        throw new Error(response.error || "Failed to update Rx");
      }
    } catch (error) {
      console.error("Error in voice digitization:", error);
      message.error(error?.message || "Failed to process prescription");
    }
  };

  const mergeData = (data1 = {}, data2 = {}) => {
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
      symptoms: Array.isArray(data2?.symptoms)
        ? data2.symptoms.map((symptom) => ({
        ...symptom,
        SC: true,
        }))
        : [],
      medicalHistory: Array.isArray(data2?.medicalHistory)
        ? data2.medicalHistory.map((history) => ({
        ...history,
        SC: true,
        }))
        : [],
    };

    // Merge symptoms arrays while removing duplicates
    const mergedSymptoms = Array.isArray(data1?.symptoms) ? [...data1.symptoms] : [];
    data2WithSC?.symptoms?.forEach((symptom2) => {
      if (!mergedSymptoms.some((symptom1) => isDuplicate(symptom1, symptom2))) {
        mergedSymptoms.push(symptom2);
      }
    });

    const apiMedicalHistory = Array.isArray(data2WithSC?.medicalHistory) ? data2WithSC.medicalHistory : [];

    // Return merged object
    return {
      ...data1,
      ...data2,
      symptoms: mergedSymptoms,
      medicalHistory: apiMedicalHistory,
      dynamicFields: data1?.dynamicFields || data2?.dynamicFields || {},
    };
  };

  const handlePauseResume = () => {

    if (isRecording || isPaused) {
      mutePauseButtonClickCountRef.current += 1;
    }
    
    if (!mediaRecorderRef.current) return;
    
    try {
      if (isPaused) {
        if (mediaRecorderRef.current.state === 'paused') {
          mediaRecorderRef.current.resume();
        }
        setIsPaused(false);
      } else {
        if (mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.pause();
        }
        setIsPaused(true);
      }
    } catch (error) {
      console.error('Error pausing/resuming recording:', error);
    }
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
        // Determine which text to use based on the active type
        let trimmedText = "";
        if (
          activeType === "labResults" ||
          (type === "labResults" && !isExisting)
        ) {
          trimmedText = editableText?.trim();
        } else if (
          activeType === "labResults-lineItem" ||
          (type === "labResults" && isExisting)
        ) {
          trimmedText = editableLineItem?.trim();
        } else if (isCustom) {
          trimmedText = editableText?.trim();
        } else if (isExisting) {
          trimmedText = editableLineItem?.trim();
        } else {
          trimmedText = editableText?.trim() || "";
        }

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
        } else if (type === "labResults" && activeType === "labResults") {
          updatedData[type][index].testname = trimmedText;
        } else if (
          type === "labResults" &&
          activeType === "labResults-lineItem"
        ) {
          updatedData[type][index].value = trimmedText;
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
    } else if (type === "labResults") {
      setEditableText(prescriptionData[type][index].testname);
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
    } else if (type === "labResults") {
      setEditableLineItem(prescriptionData[type][index]?.value);
    }
    setActiveIndex(index);
    setActiveType(`${type}-lineItem`);
  };

  const handleAdviceUpdate = useCallback((adviceArray) => {
    setPrescriptionData((prevData) => {
      const updatedData = {
      ...prevData,
      };

      if (initiallyPopulatedSectionsRef.current.has('advice')) {
        updatedData.advice = Array.isArray(adviceArray) ? adviceArray : [];
      } else {
        updatedData.advice = adviceArray || [];
      }
      return updatedData;
    });
    setIsRxEdited(true);
  }, []);

  const saveVitalsToApi = useCallback(async (vitalsData) => {
    if (!vitalsData || !patient_data?.patient_unique_id || Object.keys(vitalsData).length === 0) return;
    
    try {
      const sanitizeVitalsValue = (key, value) => {
        if (value === undefined || value === null) return "";
        const str = String(value).trim();
        if (key === 'bloodPressure' || key === 'blood_press') {
          return str.replace(/[^0-9/.-]/g, '').replace(/\/+/g, '/');
        }
        return str.replace(/[^0-9.\-]/g, '');
      };
      const cleanVitals = Object.fromEntries(
        Object.entries(vitalsData || {}).map(([k, v]) => [k, sanitizeVitalsValue(k, v)])
      );

      let systolic = cleanVitals.Systolic || cleanVitals.systolic || '';
      let diastolic = cleanVitals.Diastolic || cleanVitals.diastolic || '';
      let blood_press = cleanVitals.bloodPressure || cleanVitals.blood_press || '';
      
      if (blood_press && !systolic && !diastolic) {
        const bpParts = String(blood_press).split('/');
        if (bpParts.length === 2) {
          systolic = bpParts[0].trim();
          diastolic = bpParts[1].trim();
        }
      } else if (!blood_press && systolic && diastolic) {
        blood_press = `${systolic}/${diastolic}`;
      }
      if (!systolic || !diastolic) {
        blood_press = '';
      }
      
    const vitalsArray = [{
      // Always record against today's date; API will upsert current date entry
      date: moment().format('YYYY-MM-DD'),
        temp: String(cleanVitals.temperature || '').trim(),
        pres: String(cleanVitals.pulse || '').trim(),
        resp_rate: String(cleanVitals.respRate || '').trim(),
        systolic: String(systolic).trim(),
        diastolic: String(diastolic).trim(),
        ...(systolic && diastolic ? { blood_press: String(blood_press).trim() } : {}),
        spo2: String(cleanVitals.spo2 || '').trim(),
        height: String(cleanVitals.height || '').trim(),
        weight: String(cleanVitals.weight || '').trim(),
        ofc: String(cleanVitals.ofc || cleanVitals.OFC || '').trim(),
        sugar: String(cleanVitals.sugar || '').trim(),
        general_rbs: String(cleanVitals['General RBS'] || cleanVitals.general_rbs || '').trim(),
        fib4: String(cleanVitals.FIB4 || cleanVitals.fib4 || '').trim(),
        waist_circumference: String(cleanVitals['Waist Circumference'] || cleanVitals.waist_circumference || '').trim(),
        bmi: String(cleanVitals.BMI || cleanVitals.bmi || '').trim(),
        bmr: String(cleanVitals.BMR || cleanVitals.bmr || '').trim(),
        bsa: String(cleanVitals.BSA || cleanVitals.bsa || '').trim()
      }];
      
      const sendData = {
        patient_unique_id: patient_data.patient_unique_id,
        pm_pid: patient_data.pm_pid || 0,
        pm_id: patient_data.pm_id || 0,
        pam_id: patient_data.pam_id || 0,
        patient_birth_weight: null,
        data: vitalsArray
      };
      
      await ApiVitals.addUpdateVitals(sendData);
    } catch (error) {
      console.error('Error saving vitals to API:', error);
    }
  }, [patient_data]);

  const handleFollowUpUpdate = useCallback((followUpText) => {
    setPrescriptionData((prevData) => {
      const updatedData = {
      ...prevData,
      };

      if (initiallyPopulatedSectionsRef.current.has('followUp')) {
        updatedData.followUp = typeof followUpText === 'string' ? followUpText : '';
      } else {
        updatedData.followUp = followUpText || '';
      }
      return updatedData;
    });
    setIsRxEdited(true);
  }, []);

  const handleAdditionalNotesUpdate = useCallback((othersArray) => {
    setPrescriptionData((prevData) => {
      const updatedData = {
      ...prevData,
      };

      if (initiallyPopulatedSectionsRef.current.has('others')) {
        updatedData.others = Array.isArray(othersArray) ? othersArray : [];
      } else {
        updatedData.others = othersArray || [];
      }
      return updatedData;
    });
    setIsRxEdited(true);
  }, []);

  async function onEndVisitClick() {
    if (isEndingVisit) return;
    setIsEndingVisit(true);
    try {
      const isAmbientRx = isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX || genRxDetails?.type === 'ambient';
      const rxType = isAmbientRx ? "ambient" : "voice_rx";  
    const totalAudioDuration = queries
      .filter(query => query.isAudio && query.duration)
      .reduce((total, query) => {
        const duration = typeof query.duration === 'number' ? query.duration : parseFloat(query.duration) || 0;
        return total + duration;
      }, 0);
    
    window.Moengage.track_event("TP_AV_SaveRx", {
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
      rx_type: rxType,
      no_of_submits_count: submitCountRef.current,
      no_of_typed_messages: typedMessagesCountRef.current,
      no_of_times_user_clicked_no_stay: noStayClickCount || 0,
      no_of_times_user_clicked_cross_button: crossButtonClickCountRef.current,
      no_of_times_user_clicked_mute_pause_button: mutePauseButtonClickCountRef.current,
      total_audio_duration_seconds: totalAudioDuration || 0,
      no_of_edits_in_digitization_pad: digitizationPadEditCountRef.current,
    });
    const sanitizedMedications =
      prescriptionData?.medications?.map((item) => {
        const quantityValue = item?.quantity;
        let quantity = 0;

        if (typeof quantityValue === "number" && Number.isFinite(quantityValue)) {
          quantity = quantityValue;
        } else if (quantityValue !== undefined && quantityValue !== null) {
          const parsedQuantity = Number(quantityValue);
          quantity = Number.isFinite(parsedQuantity) ? parsedQuantity : 0;
        }

        return {
          ...item,
          quantity,
        };
      }) || [];

    const quantityActionMedicine = await ApiMedication.getQuantity({
      medicines: sanitizedMedications,
    });
    handleUpdateGenRX(quantityActionMedicine, sanitizedMedications);
    
    // Format medical history data for API if it exists
    let formattedMedicalHistory = [];
    if (medicalHistoryData && Array.isArray(medicalHistoryData) && medicalHistoryData.length > 0) {
      formattedMedicalHistory = medicalHistoryData.map((section) => {
        return {
          title: section?.title || section?.section_name || "",
          tmmhs_id: section?.tmmhs_id || 0,
          no_know_history: section?.no_know_history !== undefined ? section?.no_know_history : false,
          tags: !section?.no_know_history && Array.isArray(section?.tags) 
            ? section.tags.filter(tag => tag?.enable === 'Y' || tag?.enable === 'N').map(tag => ({
                tmmhst_id: tag?.tmmhst_id || 0,
                title: tag?.title || "",
                pms_default: tag?.pms_default || 0,
                since: tag?.since || "",
                status: tag?.status || "",
                medication: tag?.medication || "",
                note: tag?.note || "",
                enable: tag?.enable || "Y",
                relationship: tag?.relationship || ""
              }))
            : []
        };
      });
    }
    
    let vitalsForCase = [];
    try {
      const vitalsResp = await ApiVitals.getVitals({
        patient_unique_id: patient_data?.patient_unique_id || 0,
        pam_id: patient_data?.pam_id || 0,
        mode: "ADD",
        pm_pid: patient_data?.pm_pid || 0,
        pm_id: patient_data?.pm_id || 0,
      });
      const patientInfo = patient_data ? {
        age: patient_data.ageYears || patient_data.age || patient_data.pm_age,
        gender: patient_data.pm_gender || patient_data.gender
      } : {};
      
      if (vitalsResp?.status && Array.isArray(vitalsResp.data) && vitalsResp.data.length > 0) {
        const today = moment().format('YYYY-MM-DD');
        // Only use vitals that are for today's date (check createdAt or date)
        const todayVitals = vitalsResp.data.filter(v => {
          const vitalDate = v.createdAt || v.created_at || v.createdDate || v.date;
          if (!vitalDate) return false;
          return moment(vitalDate).format('YYYY-MM-DD') === today;
        });
        
        if (todayVitals.length > 0) {
          const latestTodayVital = todayVitals.reduce((latest, current) => {
            const latestId = Math.max(Number(latest.tcv_id || 0), Number(latest.tcbc_id || 0));
            const currentId = Math.max(Number(current.tcv_id || 0), Number(current.tcbc_id || 0));
            return currentId > latestId ? current : latest;
          });
          vitalsForCase = [enrichVitalsWithCalculations(latestTodayVital, patientInfo)];
        } else {
          vitalsForCase = [];
        }
      }
      
      // Merge Rx pad vitals with fetched vitals (which include sidebar edits)
      // Process if either Rx pad vitals exist OR we have vitals from sidebar/API
      const hasRxPadVitals = prescriptionData?.vitalsAndBodyComposition && Object.keys(prescriptionData.vitalsAndBodyComposition).length > 0;
      if (hasRxPadVitals || vitalsForCase.length > 0) {
        const sanitizeVitalsValue = (key, value) => {
          if (value === undefined || value === null) return "";
          const str = String(value).trim();
          if (key === 'bloodPressure' || key === 'blood_press') {
            return str.replace(/[^0-9/.-]/g, '').replace(/\/+/g, '/');
          }
          if (key === 'general_rbs' || key === 'General RBS' || key === 'ofc' || key === 'OFC' || key === 'fib4' || key === 'FIB4') {
            return str;
          }
          return str.replace(/[^0-9.\-]/g, '');
        };
        const cleanVitals = hasRxPadVitals ? Object.fromEntries(
          Object.entries(prescriptionData.vitalsAndBodyComposition || {}).map(([k, v]) => [k, sanitizeVitalsValue(k, v)])
        ) : {};

        let systolic = String(cleanVitals.Systolic || cleanVitals.systolic || '').trim();
        let diastolic = String(cleanVitals.Diastolic || cleanVitals.diastolic || '').trim();
        let blood_press = cleanVitals.bloodPressure || cleanVitals.blood_press || '';
        
        if (blood_press && !systolic && !diastolic) {
          const bpParts = String(blood_press).split('/');
          if (bpParts.length === 2) {
            systolic = bpParts[0].trim();
            diastolic = bpParts[1].trim();
          }
        }
        
        if (!systolic || !diastolic) {
          blood_press = '';
        } else if (!blood_press) {
          blood_press = `${systolic}/${diastolic}`;
        }
        
        const today = moment().format('YYYY-MM-DD');
        
        const rxPadVital = {
          date: today,
          temp: String(cleanVitals.temperature || cleanVitals.temp || '').trim(),
          pres: String(cleanVitals.pulse || cleanVitals.pres || '').trim(),
          resp_rate: String(cleanVitals.respRate || cleanVitals.resp_rate || '').trim(),
          systolic: systolic,
          diastolic: diastolic,
          spo2: String(cleanVitals.spo2 || cleanVitals.SPO2 || '').trim(),
          height: String(cleanVitals.height || cleanVitals.Height || '').trim(),
          weight: String(cleanVitals.weight || cleanVitals.Weight || '').trim(),
          ofc: String(cleanVitals.ofc || cleanVitals.OFC || cleanVitals.Ofc || '').trim(),
          sugar: String(cleanVitals.sugar || cleanVitals.Sugar || '').trim(),
          general_rbs: String(cleanVitals['General RBS'] || cleanVitals.general_rbs || cleanVitals.GeneralRBS || '').trim(),
          fib4: String(cleanVitals.FIB4 || cleanVitals.fib4 || cleanVitals.Fib4 || '').trim(),
          waist_circumference: String(cleanVitals['Waist Circumference'] || cleanVitals.waist_circumference || cleanVitals.WaistCircumference || '').trim(),
          bmi: String(cleanVitals.BMI || cleanVitals.bmi || '').trim(),
          bmr: String(cleanVitals.BMR || cleanVitals.bmr || '').trim(),
          bsa: String(cleanVitals.BSA || cleanVitals.bsa || '').trim()
        };
        if (systolic && diastolic) {
          rxPadVital.blood_press = blood_press;
        }
        
        const enrichedRxPadVital = enrichVitalsWithCalculations(rxPadVital, patientInfo);
        const existingTodayIndex = vitalsForCase.findIndex(v => (v.date || moment().format("YYYY-MM-DD")) === today);
        
        if (existingTodayIndex >= 0) {
          const existing = vitalsForCase[existingTodayIndex];
          const merged = { ...enrichedRxPadVital };
          Object.keys(existing).forEach(key => {
            if (key !== 'date' && key !== 'tcv_id' && key !== 'tcbc_id' && key !== 'dev_unique_id' && key !== 'pam_id') {
              const rxValue = enrichedRxPadVital[key];
              const existingValue = existing[key];
              if (key === 'general_rbs' || key === 'ofc' || key === 'fib4') {
                merged[key] = rxValue !== undefined && rxValue !== null && String(rxValue).trim() !== '' 
                  ? rxValue 
                  : (existingValue !== undefined && existingValue !== null && String(existingValue).trim() !== '' ? existingValue : '');
              } else {
                if (rxValue === undefined || rxValue === null || String(rxValue).trim() === '') {
                  if (existingValue !== undefined && existingValue !== null && String(existingValue).trim() !== '') {
                    merged[key] = existingValue;
                  }
                }
              }
            } else {
              merged[key] = existing[key];
            }
          });
          const mergedSystolic = String(merged.systolic || '').trim();
          const mergedDiastolic = String(merged.diastolic || '').trim();
          if (!mergedSystolic || !mergedDiastolic) {
            merged.blood_press = '';
          }
          vitalsForCase[existingTodayIndex] = merged;
        } else {
          vitalsForCase.push(enrichedRxPadVital);
        }
        
        // Save merged vitals to API
        if (patient_data?.patient_unique_id) {
          const mergedVitalsArray = hasRxPadVitals 
            ? (existingTodayIndex >= 0 ? [vitalsForCase[existingTodayIndex]] : [enrichedRxPadVital])
            : vitalsForCase.filter(v => v.date === moment().format('YYYY-MM-DD'));
          if (mergedVitalsArray.length > 0) {
            mergedVitalsArray.forEach(v => {
              const systolic = String(v.systolic || '').trim();
              const diastolic = String(v.diastolic || '').trim();
              if (!systolic || !diastolic) {
                v.blood_press = '';
              }
              v.general_rbs = v.general_rbs !== undefined ? String(v.general_rbs).trim() : '';
              v.ofc = v.ofc !== undefined ? String(v.ofc).trim() : '';
              v.fib4 = v.fib4 !== undefined ? String(v.fib4).trim() : '';
            });
            const saveResult = await ApiVitals.addUpdateVitals({
              patient_unique_id: patient_data.patient_unique_id,
              pm_pid: patient_data.pm_pid || 0,
              pm_id: patient_data.pm_id || 0,
              pam_id: patient_data.pam_id || 0,
              patient_birth_weight: null,
              data: mergedVitalsArray
            });
            // Update vitalsForCase with saved data (with IDs) from API response for case manager payload
            if (saveResult?.status && Array.isArray(saveResult.data) && saveResult.data.length > 0) {
              const savedVital = saveResult.data[0];
              const enrichedSavedVital = enrichVitalsWithCalculations(savedVital, patientInfo);
              if (existingTodayIndex >= 0) {
                // Replace existing entry with saved data
                vitalsForCase[existingTodayIndex] = enrichedSavedVital;
              } else {
                // Replace the entry we just pushed (last item) with saved data
                const today = moment().format('YYYY-MM-DD');
                const todayIndex = vitalsForCase.findIndex(v => (v.date || moment().format("YYYY-MM-DD")) === today);
                if (todayIndex >= 0) {
                  vitalsForCase[todayIndex] = enrichedSavedVital;
                } else {
                  vitalsForCase.push(enrichedSavedVital);
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.error("Error fetching vitals for case manager payload:", err);
    }

    const labResultsDataForApi = formatLabResultsForApi(prescriptionData?.labResults || []);
    if (!labResultsSavedFromSidebar) {
      await persistLabResultsToApi(labResultsDataForApi);
    }

    const cleanedVitalsForCase = vitalsForCase.map(v => {
      const cleaned = { ...v };
      const systolic = String(cleaned.systolic || '').trim();
      const diastolic = String(cleaned.diastolic || '').trim();
      if (!systolic || !diastolic) {
        cleaned.blood_press = '';
      }
      return cleaned;
    });

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
      ...(cleanedVitalsForCase.length > 0 && { vitals: cleanedVitalsForCase }),
      ...(formattedMedicalHistory.length > 0 && { medical_history: formattedMedicalHistory }),
      ...(labResultsDataForApi.length > 0 && { labParamsData: labResultsDataForApi }),
    };

    const action =
      tcmId == 0
        ? await dispatch(addCaseManager(sendData))
        : await dispatch(editCaseManager(sendData));

    if (action.meta.requestStatus === "fulfilled") {
      await dispatch(
        viewCaseManager({
          patient_unique_id: patient_data?.patient_unique_id,
          tcm_id: action?.payload?.tcm_id || tcmId,
        })
      );

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

      if (isGroundingAccessableForZydus && patient_data?.departmentId) {
        let sendInvestigationAndMedicine = {
          patient_unique_id:
            patient_data !== undefined ? patient_data.patient_unique_id : 0,
          tcm_id: action?.payload?.tcm_id,
        };
        const actionIM = await dispatch(
          getInvestigationAndMedicine(sendInvestigationAndMedicine)
        );
        if (actionIM.meta.requestStatus === "fulfilled") {
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
              sanitizedMedications.map(({ name, notes }, index) => {
                const quantityValue =
                  quantityActionMedicine?.medicines?.[index]?.quantity;
                let quantity = 0;

                if (typeof quantityValue === "number" && Number.isFinite(quantityValue)) {
                  quantity = quantityValue;
                } else if (quantityValue !== undefined && quantityValue !== null) {
                  const parsedQuantity = Number(quantityValue);
                  quantity = Number.isFinite(parsedQuantity) ? parsedQuantity : 0;
                }

                return {
                  name,
                  quantity,
                  instruction: notes,
                };
              }) || [],
            pillupSwitch: 0,
          };
          await dispatch(placeIctOrder(zydusSendData));
        }
      }

      // Navigate to print view for both ambient and dictate modes
      navigate("/gen-rx-print", {
        replace: true,
        state: {
          ...action.payload,
          patient_data: patient_data,
          page: "prescription",
          rxId: genRxDetails?._id,
          isAmbientRx: isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX,
        },
      });
    } else {
      errorMessage(action.error);
      setIsEndingVisit(false);
    }
    } catch (error) {
      console.error('Error ending visit:', error);
      setIsEndingVisit(false);
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
    medicationParentOptionsList?.map((e) => {
      return data.push({
        key: JSON.stringify({ ...e, unique_id: uuidv4() }),
        value: e.tmm_medicine_name,
        label: (
          <div>
            <span className="fw-medium">{e.tmm_medicine_name}</span>,{" "}
            <span>{e.tmm_generic}</span>{" "}
            {(e?.tmm_hm_type == 1 || e?.tmm_hm_type == 2) && e?.um_id === 0 && (
              <span
                className="align-items-center small fs-12-1 d-inline-flex justify-content-center rounded-circle text-white"
                style={{ width: 18, height: 18, background: "#c44ea2" }}
              >
                {getHmTypeIndicator(e)}
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
  }, [medicationParentOptionsList]);

    useEffect(() => {
      const data = [];
      investigationParentOptionsList.map((e) => {
        return data.push({
          key: JSON.stringify({ ...e, unique_id: uuidv4() }),
          value: e.investigation_name,
          label: (
            <div>
              {e.investigation_name}{" "}
              {(e?.hm_type === 1 || e?.hm_type === 2) && e?.um_id === 0 && (
                <span
                  className="align-items-center small fs-12-1 d-inline-flex justify-content-center rounded-circle text-white"
                  style={{ width: 18, height: 18, background: "#c44ea2" }}
                >
                  {getHmTypeIndicator(e)}
                </span>
              )}
            </div>
          ),
        });
      });
      if (searchParentQuery.length === 0) {
        data.unshift({
          key: -1,
          label: (
            <>
              <div>FREQUENTLY USED</div>
            </>
          ),
        });
      } else {
        searchParentQuery &&
          investigationParentOptionsList.findIndex(
            (e) =>
              e.investigation_name?.toLowerCase()?.trim() ==
              searchParentQuery?.toLowerCase()?.trim()
          ) === -1 &&
          tokenData?.hospital_business_id != env.zydus_business_id &&
          !isZydusUserAccessableFromGB &&
          !isApolloHosBusinessIdAccessableFromGB &&
          data.push({
            key: JSON.stringify({
              unique_id: uuidv4(),
              change: 1,
              investigation_name: searchParentQuery,
            }),
            value: searchParentQuery,
            label: (
              <>
                <div>
                  {searchParentQuery}
                  <i className="icon-Add mx-1 text-primary fs-6"></i>{" "}
                  <a className="fw-medium text-decoration-underline text-primary">
                    {" "}
                    Add Custom
                  </a>
                </div>
              </>
            ),
          });
      }
      setParentSearchOptions(data);
    }, [investigationParentOptionsList]);


  
  const handleAmbientItemClick = (type, index, item) => {
    if (activeIndex !== null && activeType !== null) {
      handleInputBlur(activeType, activeIndex);
    }

   
    const formatItemDisplay = (item) => {
      if (typeof item === 'string') {
        return item;
      }
      
      let displayText = item.name || item.testname || item;
      if (item.duration) displayText += ` (duration: ${item.duration})`;
      if (item.severity) displayText += ` (severity: ${item.severity})`;
      if (item.notes) displayText += ` (note: ${item.notes})`;
      if (item.type) displayText += ` (type: ${item.type})`;
      if (item.relation) displayText += ` (relation: ${item.relation})`;
      if (item.dosage) displayText += ` (dosage: ${item.dosage})`;
      if (item.frequency) displayText += ` (frequency: ${item.frequency})`;
      if (item.schedule) displayText += ` (schedule: ${item.schedule})`;
      
      return displayText;
    };

    if (type === "vitalsAndBodyComposition") {
      setEditableText(prescriptionData.vitalsAndBodyComposition[index]);
    } else if (type === "followUp") {
      setEditableText(prescriptionData?.followUp);
    } else {
     
      setEditableText(formatItemDisplay(item));
    }

    setActiveIndex(index);
    setActiveType(type);
  };

  const handleAmbientInputBlur = (type, index) => {
    if (activeIndex !== null && activeType !== null) {
      setPrescriptionData((prevData) => {
        const updatedData = { ...prevData };
        const trimmedText = editableText?.trim() || "";

        if (!trimmedText) {
          
          if (type === "vitalsAndBodyComposition") {
            updatedData.vitalsAndBodyComposition[index] = "";
          } else if (type === "followUp") {
            updatedData.followUp = "";
          } else {
            updatedData[type] = updatedData?.[type]?.filter((_, i) => i !== index);
          }
          return updatedData;
        }

        if (type === "vitalsAndBodyComposition") {
          updatedData.vitalsAndBodyComposition[index] = trimmedText;
        } else if (type === "followUp") {
          updatedData.followUp = trimmedText;
        } else {
         
          const parseFormattedText = (text) => {
           
            const mainNameMatch = text.match(/^([^(]+?)(?:\s*\(|$)/);
            const mainName = mainNameMatch ? mainNameMatch[1].trim() : text;

          
            const params = {};
            const paramRegex = /\(([^:]+):\s*([^)]+)\)/g;
            let match;
            
            while ((match = paramRegex.exec(text)) !== null) {
              const paramName = match[1].trim().toLowerCase();
              const paramValue = match[2].trim();
              
            
              if (paramName === 'note' || paramName === 'notes') {
                params.notes = paramValue;
              } else if (paramName === 'type') {
                params.type = paramValue;
              } else if (paramName === 'duration') {
                params.duration = paramValue;
              } else if (paramName === 'severity') {
                params.severity = paramValue;
              } else if (paramName === 'relation') {
                params.relation = paramValue;
              } else if (paramName === 'dosage') {
                params.dosage = paramValue;
              } else if (paramName === 'frequency') {
                params.frequency = paramValue;
              } else if (paramName === 'schedule') {
                params.schedule = paramValue;
              }
            }

            return {
              name: mainName,
              ...params
            };
          };

          const parsedData = parseFormattedText(trimmedText);
        
          if (updatedData[type] && updatedData[type][index]) {
            updatedData[type][index] = {
              ...updatedData[type][index],
              ...parsedData
            };
          }
        }

        setIsRxEdited(true);
        return updatedData;
      });

      setActiveIndex(null);
      setActiveType(null);
      setEditableText("");
    }
  };

 
  const handleAmbientKeyDown = (e, type, index) => {
    if (e.key === "Enter") {
      e.preventDefault(); 

      const trimmedText = editableText.trim();
      if (trimmedText) {
        setPrescriptionData((prevData) => {
          const updatedData = { ...prevData };
          const parseFormattedText = (text) => {
            const mainNameMatch = text.match(/^([^(]+?)(?:\s*\(|$)/);
            const mainName = mainNameMatch ? mainNameMatch[1].trim() : text;

           
            const params = {};
            const paramRegex = /\(([^:]+):\s*([^)]+)\)/g;
            let match;
            
            while ((match = paramRegex.exec(text)) !== null) {
              const paramName = match[1].trim().toLowerCase();
              const paramValue = match[2].trim();
              
             
              if (paramName === 'note' || paramName === 'notes') {
                params.notes = paramValue;
              } else if (paramName === 'type') {
                params.type = paramValue;
              } else if (paramName === 'duration') {
                params.duration = paramValue;
              } else if (paramName === 'severity') {
                params.severity = paramValue;
              } else if (paramName === 'relation') {
                params.relation = paramValue;
              } else if (paramName === 'dosage') {
                params.dosage = paramValue;
              } else if (paramName === 'frequency') {
                params.frequency = paramValue;
              } else if (paramName === 'schedule') {
                params.schedule = paramValue;
              }
            }

            return {
              name: mainName,
              ...params
            };
          };

          const parsedData = parseFormattedText(trimmedText);
          
       
          if (type === "vitalsAndBodyComposition") {
            updatedData.vitalsAndBodyComposition[index] = trimmedText;
          } else if (type === "followUp") {
            updatedData.followUp = trimmedText;
          } else {
            
            if (updatedData[type] && updatedData[type][index]) {
              updatedData[type][index] = {
                ...updatedData[type][index],
                ...parsedData
              };
            }

            if (!updatedData[type]) {
              updatedData[type] = [];
            }
            
            const newItem = {
              name: "",
              duration: "",
              severity: "",
              notes: "",
              type: "",
              relation: "",
              dosage: "",
              frequency: "",
              schedule: ""
            };
            
            updatedData[type].splice(index + 1, 0, newItem);
          }

          setIsRxEdited(true);
          return updatedData;
        });

       
        setActiveIndex(index + 1);
        setActiveType(type);
        setEditableText("");
      }
    }
  };

  
  const renderAmbientItems = (type) => {

    if (type === "followUp") {
    
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
          <div className="medicine-item">
            {activeType === "followUp" ? (
              <input
                type="text"
                value={editableText}
                className="editable-digitised-item"
                onChange={handleInputChange}
                onKeyDown={(e) => handleAmbientKeyDown(e, "followUp", 0)}
                onBlur={() => handleAmbientInputBlur("followUp", 0)}
                autoFocus
                style={{ width: `clamp(12px, ${textWidth + 10}px, 100%)` }}
              />
            ) : (
              <span
                onClick={() => handleAmbientItemClick("followUp", 0, prescriptionData?.followUp)}
                className="digitised-item"
              >
                {prescriptionData?.followUp}
              </span>
            )}
          </div>
        </div>
      );
    }

    if (type === "vitalsAndBodyComposition") {
      return (
        <div className="digitised-section">
          <ul>
            {Object.entries(prescriptionData.vitalsAndBodyComposition || {})
              .filter(([key, value]) => value)
              .map(([key, value]) => {
                
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
                          value={editableText}
                          className="editable-digitised-item"
                          onChange={(e) => setEditableText(e.target.value)}
                          onKeyDown={(e) => handleAmbientKeyDown(e, type, key)}
                          onBlur={() => handleAmbientInputBlur(type, key)}
                          autoFocus
                          style={{
                            width: `clamp(12px, ${textWidth + 10}px, 100%)`,
                          }}
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
        </div>
      );
    }

   
    return (
      <div className="digitised-section">
        <ul>
          {Array.isArray(prescriptionData[type]) &&
            prescriptionData[type].length > 0 &&
            prescriptionData[type].map((item, index) => {
              
              let textWidth = 0;
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

      
              const formatItemDisplay = (item) => {
                if (typeof item === 'string') {
                  return item;
                }
                
                let displayText = item.name || item.testname || item || "";
                
               
                if (!displayText && !item.duration && !item.severity && !item.notes && 
                    !item.type && !item.relation && !item.dosage && !item.frequency && !item.schedule) {
                  return "";
                }
                
              
                if (item.duration) displayText += ` (duration: ${item.duration})`;
                if (item.severity) displayText += ` (severity: ${item.severity})`;
                if (item.notes) displayText += ` (note: ${item.notes})`;
                if (item.type) displayText += ` (type: ${item.type})`;
                if (item.relation) displayText += ` (relation: ${item.relation})`;
                if (item.dosage) displayText += ` (dosage: ${item.dosage})`;
                if (item.frequency) displayText += ` (frequency: ${item.frequency})`;
                if (item.schedule) displayText += ` (schedule: ${item.schedule})`;
                
                return displayText;
              };

              return (
                <li key={index}>
                  <div className="medicine-item">
                    {activeIndex === index && activeType === type ? (
                      <input
                        type="text"
                        value={editableText}
                        className="editable-digitised-item"
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleAmbientKeyDown(e, type, index)}
                        onBlur={() => handleAmbientInputBlur(type, index)}
                        autoFocus
                        style={{
                          width: `clamp(12px, ${textWidth + 10}px, 100%)`,
                        }}
                      />
                    ) : (
                      <span
                        onClick={() => handleAmbientItemClick(type, index, item)}
                        className="digitised-item"
                        style={{ 
                          minHeight: "20px",
                          display: "inline-block",
                          minWidth: "100px",
                          cursor: "pointer"
                        }}
                      >
                        {formatItemDisplay(item) || "Click to add..."}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  };

  const renderItems = (type) => {

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
                      {/* {(type === "medications" ||
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
                                  getPopupContainer={(trigger) =>
                                    trigger.parentNode
                                  }
                                  defaultActiveFirstOption={true}
                                  autoFocus={true}
                                  popupMatchSelectWidth={false}
                                  dropdownStyle={{ width: 420 }}
                                  open={
                                    activeIndex === index &&
                                    activeType === `${type}-name` &&
                                    parentSearchOptions.length > 0
                                  }
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
                        ))} */}

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

                      {/* Editable input for labResults (testname and value) */}
                      {type === "labResults" && item?.testname && (
                        <>
                          {activeIndex === index && activeType === type ? (
                            <input
                              type="text"
                              value={editableText}
                              className="editable-digitised-item"
                              onChange={handleInputChange}
                              onBlur={() => handleInputBlur(type, index)}
                              onKeyDown={(e) =>
                                handleKeyDown(e, type, index, true)
                              }
                              autoFocus
                              style={{
                                width: `clamp(12px, ${textWidth + 10}px, 100%)`,
                              }}
                            />
                          ) : (
                            <span
                              onClick={() => handleItemClick(type, index)}
                              className="digitised-item"
                            >
                              {item.testname}
                            </span>
                          )}
                          <span className="digitised-item mx-1">:</span>
                          {activeIndex === index &&
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
                              {item.value}
                            </span>
                          )}
                        </>
                      )}
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


  const checkDataFillOrNot = () => {
    // Track cross button click while recording (back button)
    if (isRecording || isPaused) {
      crossButtonClickCountRef.current += 1;
    }
    if (prescriptionData) {
      showHideBackModal();
    } else {
      // If no prescription data, navigate directly based on mode
      if (isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX) {
        // Navigate to Voice Rx Consult page (mode selection) in ambient mode
        navigate("/voice-rx-consult", {
          replace: true,
          state: {
            patient_data,
          },
        });
        onClose();
    } else {
      onClose();
      }
    }
  };

  const handleBack = () => {
    // Check if we're in ambient mode
    if (isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX) {
      // Navigate to Voice Rx Consult page (mode selection)
      navigate("/voice-rx-consult", {
        replace: true,
        state: {
          patient_data,
        },
      });
    } else {
      // For non-ambient mode, just close the drawer
    onClose();
    navigate("/voice-rx-consult", {
        replace: true,
      state: {
        patient_data,
      },
    });
    }
  };


  return (
    <Drawer
      placement="right"
      onClose={onClose}
      open={visible}
      className={`${styles.consultationDrawer} bg-body`}
      closeIcon={false}
      width={showPrescription ? "100%" : (isMobile ? "100%" : "750px")}
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
                {(mode || isAmbientMode !== undefined) && (
                  <div className={styles.modeIndicator}>
                    {isAmbientMode ? (
                      <>
                        <img src={ambientActiveIcon} alt="Conversation mode" className={styles.modeIcon} />
                        <span className={styles.modeText}>Coversation Mode</span>
                      </>
                    ) : (
                      <>
                        <img src={dictateActiveIcon} alt="Dictate mode" className={styles.modeIcon} />
                        <span className={styles.modeText}>Dictate Mode</span>
                      </>
                    )}
                  </div>
                )}
            </div>
            <div className="d-flex align-items-center gap-2">
              {isGroundingAccessableForZydus && (
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
                  {!isMobile &&
                  <> <img
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
                  </div></>}
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
                            {" "}With a curated list of{" "}
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

                          {/* <div
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
                          </div> */}
                        </div>
                      </div>
                    }
                  >
                    {isMobile ? <img
                    src={zydusDataEngineIcon}
                    alt="zydus-data-engine"
                    width={28}
                    height={28}
                    style={{ marginRight: 8 }}
                  /> : <i className="icon-info fs-21" />}
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
                  loading={isEndingVisit}
                  disabled={isEndingVisit || isPrescriptionDataEmpty(prescriptionData)}
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
          <div className={styles.container}>
            {showPrescription ? (
                  <div
                    className={`${styles.splitView} w-100`}
                    ref={splitRef}
                     style={{
                       padding: "0 0 24px 0",
                       "--divider-left": `${leftWidthPercent}%`,
                     }}
                  >
                  <div
                    className={styles.inputSection}
                    style={{ width: `${leftWidthPercent}%` }}
                  >
                      <div className={styles.chatSection}>
                        {/* Introductory Text */}
                        <div className={styles.introTextContainer}>
                          <img src={doctorAvatar} alt="Doctor Assistant" className={styles.doctorAvatarIcon} />
                          <div className={styles.introText}>
                            Hi Doctor! Start your consultation by <strong>dictating the Rx</strong> or by <strong>capturing your conversation with the patient.</strong>
                            I'll <strong>transcribe</strong> & <strong>structure</strong> it into the <strong>Rx Pad</strong> automatically!
                          </div>
                        </div>
                        
                                                {/* Transcript Cards */}
                        {/* First transcript card - show initial transcript */}
                        {!isFirstTranscriptJSON && ((Array.isArray(queries) && queries.length > 0) || fullTranscript || genRxDetails?.source || (isAmbientMode && conversations?.length > 0)) && (() => {
                          const firstQuery = Array.isArray(queries) && queries.length > 0 ? queries[0] : null;
                          const isFirstAudio = firstQuery && typeof firstQuery === 'object' && firstQuery.isAudio;
                          // Check if it's text-only: not audio, and either a string or object without audio/conversations
                          // For ambient mode, text inputs may have conversations array with single doctor message matching text
                          const isTextOnly = !isFirstAudio && (
                            typeof firstQuery === 'string' || 
                            (firstQuery && typeof firstQuery === 'object' && !firstQuery.isAudio && (
                              !firstQuery.conversations ||
                              // Ambient mode text input: single doctor conversation matching text
                              (firstQuery.conversations && firstQuery.conversations.length === 1 && 
                               firstQuery.text &&
                               (firstQuery.conversations[0]?.speaker?.toLowerCase() === 'doctor' || firstQuery.conversations[0]?.speaker?.toLowerCase() === 'dr') &&
                               (firstQuery.conversations[0]?.text === firstQuery.text || 
                                firstQuery.conversations[0]?.message === firstQuery.text ||
                                firstQuery.conversations[0]?.content === firstQuery.text))
                            )) ||
                            (!firstQuery && (fullTranscript || genRxDetails?.source))
                          );
                          const firstText = isTextOnly 
                            ? (typeof firstQuery === 'string' ? firstQuery : (firstQuery?.text || fullTranscript || genRxDetails?.source || ''))
                            : null;
                          
                          // For text-only input, render simple curved box without header
                          if (isTextOnly && firstText && firstText.trim()) {
                            return (
                              <div className={styles.textOnlyBox}>
                                <div className={styles.textOnlyBoxContent}>
                                  {firstText}
                                </div>
                              </div>
                            );
                          }
                          
                          // For audio input, render the full transcript card with header
                          return (
                            <div className={styles.transcriptCard}>
                              <div 
                                className={styles.transcriptHeader}
                                onClick={() => setIsTranscriptExpanded(!isTranscriptExpanded)}
                              >
                                <div className={styles.transcriptTitle}>
                                  <div className={styles.transcriptTitleContent}>
                                    <span>{isAmbientMode ? "Ambient Rx Transcript" : "Dictate Rx Transcript"}</span>
                                    <div className={styles.transcriptRightGroup}>
                                      {(() => {
                                        // Show timer only for audio inputs
                                        const firstDuration = firstQuery && typeof firstQuery === 'object' ? firstQuery.duration : null;
                                        
                                        // For both ambient and dictate mode, use duration from firstQuery
                                        if (isFirstAudio && firstDuration) {
                                          return (
                                    <div className={styles.transcriptDuration}>
                                      <i className="icon-time"></i>
                                              <span>{formatTime(Math.floor(firstDuration))}</span>
                                            </div>
                                          );
                                        }
                                        
                                        return null;
                                      })()}
                                      <img src={arrowBoxDown} alt="Expand" className={styles.arrowIcon} />
                                    </div>
                                  </div>
                                </div>
                                <div className={`${styles.transcriptToggle} ${isTranscriptExpanded ? styles.transcriptToggleOpen : ''}`}>
                                  <i className="icon-down"></i>
                                </div>
                              </div>
                              {isTranscriptExpanded && (
                                <div className={styles.transcriptContent}>
                                    {isAmbientMode ? (
                                    <div>
                                      {/* Use conversations from queries[0] instead of global conversations state */}
                                      {(() => {
                                        const firstConversations = firstQuery && typeof firstQuery === 'object' && firstQuery.conversations 
                                          ? firstQuery.conversations 
                                          : (Array.isArray(conversations) && conversations.length > 0 ? conversations : []);
                                        
                                        return firstConversations.length > 0 ? (
                                          firstConversations.map((conv, idx) => {
                                          const text = conv?.message || conv?.text || conv?.content || '';
                                          const speaker = (conv?.speaker || '').toLowerCase();
                                          const isDoctor = speaker === 'doctor';
                                          return (
                                            <div key={idx} className={`${styles.conversationBubbleWrapper} ${isDoctor ? styles.doctorMessage : styles.patientMessage}`}>
                                          <div className={styles.conversationBubble}>
                                                <span className={styles.speakerLabel}>{isDoctor ? 'Doctor' : 'Patient'}:</span>
                                                <div className={styles.messageText}>{text}</div>
                                            </div>
                                            </div>
                                          );
                                        })
                                        ) : null;
                                      })()}
                                          </div>
                                  ) : (
                                    <div className={styles.transcriptText}>
                                      {(Array.isArray(queries) && queries.length > 0)
                                         ? (typeof queries[0] === 'string' ? queries[0] : queries[0]?.text || '')
                                         : (fullTranscript || genRxDetails?.source || '')}                                                                         
                                  </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })()}

                                                {/* Show "Your Rx is ready!" message after first transcript */}
                        {!isFirstTranscriptJSON && !isProcessing && ((Array.isArray(queries) && queries.length > 0) || !!fullTranscript || !!genRxDetails?.source || (isAmbientMode && conversations?.length > 0)) && (
                            <div className="d-flex align-items-start gap-2 mt-3" style={{ padding: '0 5px' }}>
                              <img src={doctorAvatar} alt="doctor" width={36} height={36} style={{ borderRadius: 18 }} />
                              <div className={styles.prescriptionReadyMessage}>
                                Your <strong>Rx is ready</strong>! You can review it in the <strong>Rx Pad</strong>. You can also make changes using <strong>VoiceRx</strong> or by simply <strong>typing below</strong>!
                              </div>
                            </div>
                          )}

                        {/* Additional transcript cards for new transcripts (both dictate and ambient mode) */}                                                                 
                        {Array.isArray(queries) && queries.length > 1 && queries.slice(1).map((query, idx) => {                               
                          const cardIndex = idx + 1;
                          const isCardExpanded = expandedTranscripts.has(cardIndex);
                          const isAudio = query && typeof query === 'object' && query.isAudio;
                          // Check if it's text-only: not audio, and either a string or object without audio/conversations
                          // For ambient mode, text inputs may have conversations array with single doctor message matching text
                          const isTextOnly = !isAudio && (
                            typeof query === 'string' || 
                            (query && typeof query === 'object' && !query.isAudio && (
                              !query.conversations ||
                              // Ambient mode text input: single doctor conversation matching text
                              (query.conversations && query.conversations.length === 1 && 
                               query.text &&
                               (query.conversations[0]?.speaker?.toLowerCase() === 'doctor' || query.conversations[0]?.speaker?.toLowerCase() === 'dr') &&
                               (query.conversations[0]?.text === query.text || 
                                query.conversations[0]?.message === query.text ||
                                query.conversations[0]?.content === query.text))
                            ))
                          );
                          const queryText = isTextOnly 
                            ? (typeof query === 'string' ? query : (query?.text || ''))
                            : null;
                          
                          // For text-only input, render simple curved box without header
                          if (isTextOnly && queryText) {
                            return (
                              <React.Fragment key={cardIndex}>
                                <div className={styles.textOnlyBox} style={{ marginTop: '16px' }}>
                                  <div className={styles.textOnlyBoxContent}>
                                    {queryText}
                                  </div>
                                </div>
                                {/* Show "Your Rx is ready!" message after each additional transcript - only when not processing */}
                                {!isProcessing && (
                                  <div className="d-flex align-items-start gap-2 mt-3" style={{ padding: '0 5px' }}>
                                    <img src={doctorAvatar} alt="doctor" width={36} height={36} style={{ borderRadius: 18 }} />
                                    <div className={styles.prescriptionReadyMessage}>
                                      Your <strong>Rx is ready</strong>! You can review it in the <strong>Rx Pad</strong>. You can also make changes using <strong>VoiceRx</strong> or by simply <strong>typing below</strong>!
                                    </div>
                                  </div>
                                )}
                              </React.Fragment>
                            );
                          }
                          
                          // For audio input, render the full transcript card with header
                          return (
                            <React.Fragment key={cardIndex}>
                              <div className={styles.transcriptCard} style={{ marginTop: '16px' }}>                                                             
                                <div 
                                  className={styles.transcriptHeader}
                                  onClick={() => {
                                    const newExpanded = new Set(expandedTranscripts);                                                                           
                                    if (isCardExpanded) {
                                      newExpanded.delete(cardIndex);
                                    } else {
                                      newExpanded.add(cardIndex);
                                    }
                                    setExpandedTranscripts(newExpanded);
                                  }}
                                >
                                  <div className={styles.transcriptTitle}>
                                    <div className={styles.transcriptTitleContent}>                                                                             
                                      <span>{isAmbientMode ? "Ambient Rx Transcript" : "Dictate Rx Transcript"}</span>
                                      <div className={styles.transcriptRightGroup}>                                                                             
                                        {(() => {
                                          // Show timer only for audio inputs
                                          const queryDuration = query && typeof query === 'object' ? query.duration : null;                         
                                          
                                          if (isAudio && queryDuration) {
                                            return (
                                              <div className={styles.transcriptDuration}>                                                                       
                                                <i className="icon-time"></i>
                                                <span>{formatTime(Math.floor(queryDuration))}</span>                                                            
                                              </div>
                                            );
                                          }
                                          return null;
                                        })()}
                                        <img src={arrowBoxDown} alt="Expand" className={styles.arrowIcon} />                                                    
                                      </div>
                                    </div>
                                  </div>
                                  <div className={`${styles.transcriptToggle} ${isCardExpanded ? styles.transcriptToggleOpen : ''}`}>                           
                                    <i className="icon-down"></i>
                                  </div>
                                </div>
                                {isCardExpanded && (
                                  <div className={styles.transcriptContent}>
                                    {isAmbientMode && query?.conversations ? (
                                      // Render conversations for ambient mode
                                      <div>
                                        {Array.isArray(query.conversations) && query.conversations.length > 0 ? (
                                          query.conversations.map((conv, convIdx) => {
                                            const text = conv?.message || conv?.text || conv?.content || '';
                                            const speaker = (conv?.speaker || '').toLowerCase();
                                            const isDoctor = speaker === 'doctor';
                                            return (
                                              <div key={convIdx} className={`${styles.conversationBubbleWrapper} ${isDoctor ? styles.doctorMessage : styles.patientMessage}`}>
                                                <div className={styles.conversationBubble}>
                                                  <span className={styles.speakerLabel}>{isDoctor ? 'Doctor' : 'Patient'}:</span>
                                                  <div className={styles.messageText}>{text}</div>
                                                </div>
                                              </div>
                                            );
                                          })
                                        ) : null}
                                      </div>
                                    ) : (
                                      // Render text for dictate mode
                                      <div className={styles.transcriptText}>
                                        {typeof query === 'string' ? query : (query?.text || '')}                                                                 
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              {/* Show "Your Rx is ready!" message after each additional transcript - only when not processing */}
                              {!isProcessing && (
                            <div className="d-flex align-items-start gap-2 mt-3" style={{ padding: '0 5px' }}>
                              <img src={doctorAvatar} alt="doctor" width={36} height={36} style={{ borderRadius: 18 }} />
                              <div className={styles.prescriptionReadyMessage}>
                                Your <strong>Rx is ready</strong>! You can review it in the <strong>Rx Pad</strong>. You can also make changes using <strong>VoiceRx</strong> or by simply <strong>typing below</strong>!
                                      </div>
                                    </div>
                                  )}
                            </React.Fragment>
                          );
                        })}

                                            {isProcessing ? (
                        <BubbleSkeleton />
                      ) : (
                        <>
                          <div className={styles.inputContainer}>
                            <div className={styles.inputQueries}>
                              {null}
                            </div>
                          </div>
                          {isRecording ? (
                            <div className={styles.bottomCenterBar}>
                              <div className={`${styles.recBar} ${isPaused ? styles.recBarMuted : ""}`}>
                                {/* Delete Button */}
                                <button className={styles.deleteButton} onClick={handleStopRecording}>
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
                                <img src={ellipse895} alt="Gradient" className={styles.gradientEllipse} />
                                <div className={styles.listeningText}>
                                  {isPaused ? "Unmute to Continue Recording" : "I'm Listening..."}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className={styles.curvedInputContainer}>
                              <div className={`${styles.curvedInputWrapper} ${hasTypedInput ? styles.hasTextInput : ''}`}>
                                <TextArea
                                  ref={textAreaRef}
                                  value={inputText}
                                  onChange={(e) => setInputText(e.target.value)}
                                  onKeyDown={handleKeyPress}
                                  onClick={() => setIsTyping(true)}
                                  onBlur={() => setIsTyping(false)}
                                  placeholder={"Start Typing Rx..."}
                                  className={`${styles.curvedTextInput} ${hasTypedInput ? styles.hasText : ''}`}
                                  autoSize={{ minRows: 1, maxRows: 6 }}
                                />
                                <img
                                  src={hasTypedInput ? voiceRxSendButton : voiceRxButton}
                                  alt={hasTypedInput ? "Send Rx" : "Voice Rx"}
                                  onClick={hasTypedInput ? handleSend : handleStartRecording}
                                  className={hasTypedInput ? styles.curvedSendButton : styles.curvedVoiceButton}
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
                    <DigitisedPrescription
                      data={prescriptionData || {}}
                      setData={setPrescriptionData}
                      loading={false}
                          isProcessing={isProcessing}
                          showAbsHeaderInsideLoader={false}
                      initiallyPopulatedSectionsRef={initiallyPopulatedSectionsRef}
                      initialMedicalHistoryTypes={Array.from(
                        initiallyPopulatedMedicalHistoryTypesRef.current
                      )}
                      localModules={localModules}
                      setLocalModules={setLocalModules}
                      onAdviceUpdate={handleAdviceUpdate}
                      onFollowUpUpdate={handleFollowUpUpdate}
                      onOthersUpdate={handleAdditionalNotesUpdate}
                      onLabResultsSaved={() => setLabResultsSavedFromSidebar(true)}
                      onRxEdited={setIsRxEdited}
                              />
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
                          onClick={() => {
                            // Check if we're in ambient mode
                            if (isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX) {
                              // Navigate to Voice Rx Consult page (mode selection) when leaving in ambient mode
                              navigate("/voice-rx-consult", {
                                replace: true,
                                state: {
                                  patient_data,
                                },
                              });
                            } else {
                              // For non-ambient mode, use the regular back handler
                              handleBack();
                            }
                            showHideBackModal();
                          }}
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
        </>
      </Suspense>

      {!isFreeVoiceRxUser && visible && (
        <ExpiredSubModal
          title={S_VOICE_RX}
          styles={{
            mask: {
              marginLeft: showPrescription ? 0 : window.innerWidth - 750,
              marginTop: 60,
              background: "rgba(0, 0, 0, 0.28)",
              backdropFilter: "blur(2px)",
            },
            wrapper: {
              marginLeft: showPrescription ? 0 : window.innerWidth - 750,
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

      {/* {showAddMedicinePopup && (
        <CustomMedicinePopup
          isOpen={showAddMedicinePopup}
          onCancel={() => setShowAddMedicinePopup(false)}
          initialData={{ tmm_medicine_name: searchParentQuery }}
        />
      )} */}
      
      {/* Tutorial Drawer */}
      <Drawer
        placement="right"
        width={window.innerWidth ? Math.min(window.innerWidth * 0.8, 1200) : 1200}
        closeIcon={null}
        destroyOnClose
        maskClosable
        open={genRxKnowMoreDrawer}
        onClose={() => setGenRxKnowMoreDrawer(false)}
        bodyStyle={{ padding: 0, height: '100%', overflow: 'hidden' }}
      >
        <div style={{ height: '100%', overflow: 'hidden' }}>
          <GenRxKnowMore handleGenRxKnowMore={() => setGenRxKnowMoreDrawer(false)} />
        </div>
      </Drawer>
    </Drawer>
  );
};

export default ConsultationDrawer;