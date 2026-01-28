import React, { useState, useEffect, useRef, useContext } from 'react';
import { Drawer, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDecodedToken } from '../../utils/localStorage';
import { S_AMBIENT_VOICE_RX, S_VOICE_RX, MESSAGE_KEY } from '../../utils/constants';
import {
  generateAmbientRx,
  updateAmbientRx,
  generateRx,
  updateGenRx,
  getGenRx,
  getAmbientRx,
  editGenRxDetails,
  editAmbientRxDetails,
} from '../../api/services/ApiGenRx';
import ApiMedication from '../../api/services/ApiMedication';
import { addPatientLabReports } from '../../api/services/ApiLabParams';
import { addCaseManager, editCaseManager, viewCaseManager } from '../../redux/caseManagerSlice';
import { addUpdateVitals } from '../../redux/vitalsSlice';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { errorMessage } from '../../utils/utils';
import CashManagerContext from '../../context/CashManagerContext';
import MobileRxPadProcessing from './MobileRxPadProcessing';
import MobileRxPadSkeleton from './MobileRxPadSkeleton';
import MobileRxPadContent from './MobileRxPadContent';
import MobileEndVisitScreen from './MobileEndVisitScreen';
import documentNormalSvg from '../../assets/mobile/document-normal.svg';
import minimiseIcon from '../../assets/images/minimise.svg';
import infoIcon from '../../assets/mobile/Icon (2).svg';
import visitEndIcon from '../../assets/images/end-visit.svg';
import closeVisitIcon from '../../assets/images/close-visit.svg';
import './MobileRxPad.scss';

function MobileRxPad({ visible, onClose, onDataReady, onQuickEdit, queries = [], existingData = null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.doctors);
  const { medicalHistoryData } = useContext(CashManagerContext) || {};

  const { state } = location;
  const {
    patient_data,
    caseManagerData,
    fromVoiceRecording,
    audioBlob: audioBlobFromLocation,
    inputText: inputTextFromLocation,
    mode,
    consent,
    existingPrescriptionData, // For merging with new data
    existingGenRxDetails, // To check if updating existing Rx
    fromEndVisitEdit, // Edit from End Visit: always re-fetch getGenRx, never use stale existingData
  } = state || {};

  // Check if we're in "review mode" (just viewing existing data, no new input).
  // When fromEndVisitEdit: never use existingData (it can be stale); we will re-fetch via load-on-edit.
  const isReviewMode =
    !audioBlobFromLocation &&
    !inputTextFromLocation &&
    existingData?.prescriptionData &&
    !fromEndVisitEdit;

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showEndVisitScreen, setShowEndVisitScreen] = useState(false);
  const [endVisitCaseManagerData, setEndVisitCaseManagerData] = useState(null); // Store saved caseManagerData with print_url
  const [isEndingVisit, setIsEndingVisit] = useState(false); // Loading state for saving
  // Initialize with existing data if in review mode, otherwise wait for API
  const [prescriptionData, setPrescriptionData] = useState(() => {
    if (isReviewMode) {
      return existingData.prescriptionData;
    }
    return null;
  });
  const [genRxDetails, setGenRxDetails] = useState(() => {
    if (isReviewMode && existingData?.genRxDetails) {
      return existingData.genRxDetails;
    }
    return existingGenRxDetails || null;
  });
  const [fullTranscript, setFullTranscript] = useState(() => {
    if (isReviewMode && existingData?.fullTranscript) {
      return existingData.fullTranscript;
    }
    return '';
  });
  const [conversations, setConversations] = useState(() => {
    if (isReviewMode && existingData?.conversations) {
      return existingData.conversations;
    }
    return [];
  });

  const hasAutoSubmittedRef = useRef(false);
  const lastLocationKeyRef = useRef(location.key); // Track location.key for state changes
  const processedInputRef = useRef(null); // Track which input we've already processed (prevents duplicates)
  const onDataReadyCalledRef = useRef(false); // Track if onDataReady was called for current input
  const hasLoadedForEditRef = useRef(null); // Track loaded smart_prescription_filename for edit to avoid duplicate fetch
  const editContextRef = useRef({ smartPrescriptionFilename: null }); // Persist prescription ID for edit mode
  const decodedToken = getDecodedToken();
  const doctorId = decodedToken?.result?.user_id;

  const [isAmbientMode, setIsAmbientMode] = useState(() => {
    const activeService = window.TATVA_ACTIVE_VOICE_SERVICE;
    return activeService === S_AMBIENT_VOICE_RX;
  });

  useEffect(() => {
    // Improved mode detection - matches web version (checks multiple sources)
    const shouldBeAmbient = 
      mode === 'ambient' || 
      window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX ||
      genRxDetails?.type === 'ambient' ||
      existingGenRxDetails?.type === 'ambient';
    
    if (shouldBeAmbient) {
      setIsAmbientMode(true);
      window.TATVA_ACTIVE_VOICE_SERVICE = S_AMBIENT_VOICE_RX;
    } else if (mode === 'dictation') {
      setIsAmbientMode(false);
      window.TATVA_ACTIVE_VOICE_SERVICE = S_VOICE_RX;
    }
  }, [mode, genRxDetails?.type, existingGenRxDetails?.type]);

  // Track location.key changes to detect state updates with replace: true
  useEffect(() => {
    if (location.key !== lastLocationKeyRef.current) {
      lastLocationKeyRef.current = location.key;
      // Reset auto-submit ref when location state changes (new input detected)
      hasAutoSubmittedRef.current = false;
    }
  }, [location.key, location.state]);

  // Reset auto-submit ref ONLY when drawer closes (not when input values change)
  // This prevents infinite loop - input values stay in location.state even after processing
  useEffect(() => {
    // Only reset when drawer closes (visible becomes false)
    // This allows new input to be processed when drawer opens again
    if (!visible) {
      hasAutoSubmittedRef.current = false;
      processedInputRef.current = null;
      onDataReadyCalledRef.current = false;
      hasLoadedForEditRef.current = null; // Reset so edit-load can run again on next open
      editContextRef.current.smartPrescriptionFilename = null; // Reset edit context
    }
  }, [visible]); // Only depend on visible, not input values

  // Populate editContextRef when entering edit mode (persist prescription ID)
  useEffect(() => {
    const id = caseManagerData?.smart_prescription_filename;
    if (id && typeof id === 'string' && id.trim()) {
      editContextRef.current.smartPrescriptionFilename = id;
    }
  }, [caseManagerData?.smart_prescription_filename]);

  useEffect(() => {
    if (!visible || !patient_data?.patient_unique_id) return;
    const loadTodayData = async () => {
      const todayVitals = await getTodayVitals(patient_data);
      const todayLabResults = await getTodayLabResults(patient_data);
      
      if (todayVitals) {
        setPrescriptionData(prev => ({
          ...prev,
          vitalsAndBodyComposition: todayVitals
        }));
      }
      
      if (todayLabResults && Array.isArray(todayLabResults) && todayLabResults.length > 0) {
        setPrescriptionData(prev => ({
          ...prev,
          labResults: todayLabResults
        }));
      }
    };
    loadTodayData();
  }, [visible, patient_data?.patient_unique_id, patient_data?.pam_id, patient_data?.pm_pid, patient_data?.pm_id]);
  // Load existing Voice RX when opening for Edit or Repeat (caseManagerData.smart_prescription_filename, no new audio/input).
  // Matches web ConsultationDrawer getGenRxDetails: getGenRx -> optionally getAmbientRx -> parse -> setPrescriptionData, genRxDetails.
  // For Repeat (tcm_id 0): web also loads the old Rx; we match that behavior.
  // When fromEndVisitEdit: always re-fetch (do not skip) so we get the latest saved data (e.g. updated symptoms/lab) from getGenRx.
  useEffect(() => {
    if (!visible) return;
    const id = caseManagerData?.smart_prescription_filename;
    if (!id || typeof id !== 'string' || !String(id).trim()) return;
    if (audioBlobFromLocation) return;
    if (inputTextFromLocation && typeof inputTextFromLocation === 'string' && inputTextFromLocation.trim().length > 0) return;
    if (existingData?.prescriptionData && !fromEndVisitEdit) return; // review mode: already have data; fromEndVisitEdit: always re-fetch
    if (hasLoadedForEditRef.current === id && !fromEndVisitEdit) return; // avoid duplicate fetch; fromEndVisitEdit: always re-fetch

    let cancelled = false;
    const run = async () => {
      setIsProcessing(true);
      try {
        const initialResponse = await getGenRx(id);
        if (cancelled) return;
        if (!initialResponse?.success || !initialResponse?.data) {
          throw new Error(initialResponse?.error || initialResponse?.data?.message || 'Failed to load prescription');
        }

        const conversation = initialResponse.data?.history?.[0]?.conversation;
        const hasConversation = conversation && Array.isArray(conversation) && conversation.length > 0;

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
        if (hasConversation) {
          const ambientResponse = await getAmbientRx(id);
          if (cancelled) return;
          if (ambientResponse?.success) {
            response = ambientResponse;
          }
        }

        if (!response?.success || !response?.data) {
          throw new Error(response?.error || 'Failed to load prescription');
        }

        const hasAmbientType =
          (response.data?.rxDigitizationHistory || []).some((h) => h?.category === 'ambient-rx') || hasConversation;

        if (hasAmbientType) {
          let parsed = null;
          if (response.data.editedData) {
            parsed = response.data.editedData;
          } else if (response.data.digitizeData) {
            parsed = response.data.digitizeData;
          } else if (response.data.digitize) {
            const d = response.data.digitize;
            if (d && typeof d === 'object' && !Array.isArray(d)) {
              const numeric = Object.keys(d).filter((k) => /^\d+$/.test(k));
              if (numeric.length > 0) parsed = d[numeric[0]];
              else if (d.symptoms || d.medications || d.vitalsAndBodyComposition) parsed = d;
              else parsed = d;
            } else {
              parsed = d;
            }
          } else {
            const amb = (response.data.rxDigitizationHistory || []).filter((h) => h?.category === 'ambient-rx');
            const last = amb[amb.length - 1];
            parsed = last?.response || last?.payload?.response || last?.payload || null;
          }

          if (parsed?.vitalsAndBodyComposition) {
            const raw = parsed.vitalsAndBodyComposition;
            const actual = raw._doc || raw;
            const cleaned = {};
            Object.keys(actual || {}).forEach((k) => {
              if (actual[k] !== undefined && actual[k] !== null) cleaned[k] = actual[k];
            });
            parsed.vitalsAndBodyComposition = cleaned;
          }

          if (parsed) {
            const validated = validatePrescriptionData(parsed);
            if (cancelled) return;
            const toSet = (validated && typeof validated === 'object') ? validated : (parsed && typeof parsed === 'object' ? parsed : null);
            if (toSet != null) setPrescriptionData(toSet);
          }

          setGenRxDetails({
            _id: response.data._id || id,
            source: response.data.source || '',
            source_duration: response.data.source_duration,
            timeRequiredInMs: response.data.timeRequiredInMs,
            type: 'ambient',
          });
          if (response.data?.source) {
            setFullTranscript(response.data.source);
          }
          const hist = (response.data?.history || []).filter(
            (h) => h?.conversation && Array.isArray(h.conversation) && h.conversation.length > 0
          );
          if (hist.length > 0) {
            const all = hist.flatMap((h) => h.conversation || []);
            setConversations(all);
          }
        } else {
          // Dictate
          const fromResponse = response.data?.editedData || response.data?.digitizeData;
          if (fromResponse) {
            const validated = validatePrescriptionData(fromResponse);
            if (cancelled) return;
            const toSet = (validated && typeof validated === 'object') ? validated : (fromResponse && typeof fromResponse === 'object' ? fromResponse : null);
            if (toSet != null) setPrescriptionData(toSet);
          }
          let transcriptSource = response.data?.source;
          if (!transcriptSource && (response.data?.history || []).length > 0) {
            const t = (response.data.history || [])
              .map((h) => h?.transcription)
              .filter((x) => x && x !== 'null' && String(x).trim());
            if (t.length > 0) transcriptSource = t.join(' ');
          }
          setGenRxDetails({
            _id: response.data._id || id,
            source: transcriptSource || response.data?.source || '',
            source_duration: response.data?.source_duration,
            timeRequiredInMs: response.data?.timeRequiredInMs,
            type: response.data?.type || 'dictate',
          });
          if (transcriptSource) {
            setFullTranscript(transcriptSource);
          }
        }

        hasLoadedForEditRef.current = id;
      } catch (e) {
        if (!cancelled) {
          message.error(e?.message || 'Failed to load prescription');
          hasLoadedForEditRef.current = null;
        }
      } finally {
        if (!cancelled) setIsProcessing(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [
    visible,
    caseManagerData?.smart_prescription_filename,
    audioBlobFromLocation,
    inputTextFromLocation,
    existingData?.prescriptionData,
    fromEndVisitEdit,
  ]);

  // Auto-submit effect - matches web version: allows subsequent inputs (no prescriptionData check)
  useEffect(() => {
    // Skip auto-submit in review mode (just viewing existing data)
    if (isReviewMode) {
      return;
    }

    // Reset if location.key changed (new navigation with replace: true)
    if (location.key !== lastLocationKeyRef.current) {
      hasAutoSubmittedRef.current = false;
    }

    if (hasAutoSubmittedRef.current) {
      return;
    }

    // Check if this input was already processed (prevent duplicate processing)
    const currentInputId = audioBlobFromLocation 
      ? `audio-${audioBlobFromLocation.size || 'unknown'}` 
      : inputTextFromLocation 
        ? `text-${inputTextFromLocation.substring(0, 20)}` 
        : null;
    
    if (currentInputId && processedInputRef.current === currentInputId) {
      return;
    }

    // Remove !prescriptionData check to allow subsequent inputs (matches web handleSend behavior)
    const shouldAutoSubmit = visible && (
      (fromVoiceRecording && audioBlobFromLocation) ||
      (inputTextFromLocation && typeof inputTextFromLocation === 'string' && inputTextFromLocation.trim().length > 0)
    ) && !isProcessing;

    if (!shouldAutoSubmit) return;

    hasAutoSubmittedRef.current = true;
    
    // Mark input as being processed
    if (currentInputId) {
      processedInputRef.current = currentInputId;
    }

    const run = async () => {
      try {
        await new Promise((r) => setTimeout(r, 80));
        setIsProcessing(true);

        // Prioritize text input over audio blob (text input is explicit user action)
        // If both are present, use text input (matches web version behavior)
        if (inputTextFromLocation && typeof inputTextFromLocation === 'string' && inputTextFromLocation.trim().length > 0) {
          await handleVoiceDigitize(null, inputTextFromLocation);
        } else if (audioBlobFromLocation) {
          await handleVoiceDigitize(audioBlobFromLocation, '');
        }
      } catch (e) {
        setIsProcessing(false);
        hasAutoSubmittedRef.current = false;
        // Reset processed input on error to allow retry
        processedInputRef.current = null;
        onDataReadyCalledRef.current = false;
      }
    };
    run();
  }, [visible, fromVoiceRecording, audioBlobFromLocation, inputTextFromLocation, isProcessing, location.key, isReviewMode, prescriptionData]);

  // Remove Smart Capture items (matches web version)
  const removeScItems = (data) => {
    if (!data || typeof data !== 'object') {
      return data;
    }
    return {
      ...data,
      symptoms: Array.isArray(data.symptoms) ? data.symptoms.filter((symptom) => !symptom.SC) : [],
      medicalHistory: Array.isArray(data.medicalHistory) ? data.medicalHistory.filter((history) => !history.SC) : [],
    };
  };

  // Prepare payload for API (matches web version logic, simplified for mobile)
  const preparePayloadForApi = () => {
    // Use current prescriptionData state or existingPrescriptionData from location.state
    const currentData = prescriptionData || existingPrescriptionData;
    if (!currentData) {
      return {};
    }
    
    const cleanedData = removeScItems(currentData);
    const { dynamicFields = {} } = cleanedData;
    
    // Include ALL dynamic fields (including local modules) so custom module edits are preserved.
    // Optionally prune strictly empty arrays to keep payload lean.
    const filteredDynamicFields = Object.entries(dynamicFields).reduce((acc, [key, value]) => {
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

  const validatePrescriptionData = (data) => {
    if (!data || typeof data !== 'object') {
      return false;
    }
    const mappedLabResults = Array.isArray(data.labResults) ? data.labResults : [];
    const cleanedData = {
      symptoms: Array.isArray(data.symptoms) ? data.symptoms : [],
      medications: Array.isArray(data.medications) ? data.medications : [],
      vitalsAndBodyComposition: data.vitalsAndBodyComposition || {},
      advice: Array.isArray(data.advice) ? data.advice : [],
      diagnosis: Array.isArray(data.diagnosis) ? data.diagnosis : [],
      examinations: Array.isArray(data.examinations) ? data.examinations : [],
      followUp: typeof data.followUp === 'string' ? data.followUp : "",
      labInvestigation: Array.isArray(data.labInvestigation) ? data.labInvestigation : [],
      labResults: mappedLabResults,
      medicalHistory: Array.isArray(data.medicalHistory) ? data.medicalHistory : [],
      vaccinations: Array.isArray(data.vaccinations) ? data.vaccinations : [],
      others: Array.isArray(data.others) ? data.others : [],
      dynamicFields: data.dynamicFields || {},
    };
    return cleanedData;
  };

  // Match web ConsultationDrawer: format lab results for case manager API
  const formatLabResultsForApi = (labResults = []) => {
    if (!Array.isArray(labResults) || labResults.length === 0) return [];
    const today = moment().format('YYYY-MM-DD');
    const groupedByDate = {};
    labResults.forEach((result = {}) => {
      const dateKey = result.date || today;
      const testname = result.testname || result.name || 'Result';
      const value = result.value || '';
      const units = result.units || '';
      if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
      let cleanValue = value;
      let cleanUnits = units;
      if (value && !units) {
        const parts = String(value).trim().split(/\s+/);
        if (parts.length > 1) {
          cleanValue = parts.slice(0, -1).join(' ');
          cleanUnits = parts[parts.length - 1];
        }
      }
      groupedByDate[dateKey].push({
        reportName: result.reportName || '',
        testName: testname,
        value: cleanValue,
        units: cleanUnits,
        refRange: result.refRange || '',
        arrowDirection: result.arrowDirection || '',
      });
    });
    return Object.entries(groupedByDate)
      .map(([date, inputs]) => ({ date, inputs: inputs.filter((i) => i.value && String(i.value).trim() !== '') }))
      .filter((r) => r.inputs.length > 0);
  };

  const persistLabResultsToApi = async (labResultsDataForApi = []) => {
    if (!Array.isArray(labResultsDataForApi) || labResultsDataForApi.length === 0 || !patient_data?.patient_unique_id) return;
    const decodedToken = getDecodedToken();
    const fallbackDoctorId = decodedToken?.result?.user_id;
    const doctorId = profile?.doctor_unique_id || fallbackDoctorId;
    if (!doctorId) return; // Avoid API call that would fail; labParamsData still sent to case manager
    try {
      await addPatientLabReports({
        patientId: patient_data.patient_unique_id,
        doctorId,
        results: labResultsDataForApi,
      });
    } catch (err) {
      console.error('Error saving lab results to API:', err);
    }
  };

  const handleVoiceDigitize = async (audioBlobParam, transcribedText) => {
    try {
      let response;
      const patientId = patient_data?.patient_unique_id || '';
      const admissionId = caseManagerData?.admission_id || null;
      
      // Calculate duration for audio input (store for query duration)
      // Check response first, then calculate from blob (matches web version)
      let currentRecordingDuration = null;
      // Note: We'll check response after API call, but calculate here as fallback
      if (audioBlobParam) {
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const arrayBuffer = await audioBlobParam.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          currentRecordingDuration = audioBuffer.duration;
        } catch (e) {
          // Could not calculate audio duration
        }
      }

      // Determine if updating existing prescription or creating new one
      // Use multiple fallbacks to ensure prescription ID is preserved across state updates
      const existingRxId =
        genRxDetails?._id ||
        existingGenRxDetails?._id ||
        caseManagerData?.smart_prescription_filename ||
        editContextRef.current?.smartPrescriptionFilename;
      const isUpdatingRx = !!existingRxId;

      // Improved mode detection - matches web version
      const isAmbient = isAmbientMode || mode === 'ambient' || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX || genRxDetails?.type === 'ambient' || existingGenRxDetails?.type === 'ambient';

      if (isAmbient) {
        const formData = new FormData();

        if (audioBlobParam) {
          const audioFile = new File(
            [audioBlobParam],
            `ambient-voice-rx-recording-${new Date().toISOString().replace(/[:.]/g, '-')}.webm`,
            { type: audioBlobParam.type || 'audio/webm' }
          );
          formData.append('file', audioFile);
          formData.append('source_duration', currentRecordingDuration ? currentRecordingDuration.toString() : '0');
        } else if (transcribedText) {
          formData.append('voice_prescription_text', transcribedText);
        }

        formData.append('doctorId', doctorId);
        formData.append('patientId', patientId);
        formData.append('schemaKey', 'default');
        formData.append('getConversation', 'true');

        if (consent && typeof consent === 'object') {
          formData.append('consent', JSON.stringify(consent));
        }

        // UPDATE vs NEW logic (matches web version)
        if (isUpdatingRx) {
          // Update local transcript for text inputs
          if (transcribedText) {
            const updatedTranscript = [fullTranscript, transcribedText].filter(Boolean).join(" ");
            setFullTranscript(updatedTranscript);
            
            // For text input: Create new FormData with only new text (matches web version)
            const newFormData = new FormData();
            newFormData.append("voice_prescription_text", (transcribedText || "").trim());
            
            // Copy other fields (excluding voice_prescription_text and voice_prescription_previous_context)
            Array.from(formData.entries()).forEach(([key, value]) => {
              if (key !== '' && key !== 'voice_prescription_text' && key !== 'voice_prescription_previous_context') {
                newFormData.append(key, value);
              }
            });
            
            // Ensure voice_prescription_previous_context is included with latest data
            const data = preparePayloadForApi();
            newFormData.append("voice_prescription_previous_context", JSON.stringify(data));
            
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
              existingRxId,
              patientId,
              admissionId
            );
          } else {
            // For audio input: Use existing formData
            const data = preparePayloadForApi();
            formData.append("voice_prescription_previous_context", JSON.stringify(data));
            
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
              existingRxId,
              patientId,
              admissionId
            );
          }
        } else {
          // NEW Rx - Use generateAmbientRx
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
          
          response = await generateAmbientRx(formData, patientId, admissionId);
          
          if (transcribedText) {
            setFullTranscript(transcribedText);
          }
        }
      } else {
        // Dictate Mode - Same UPDATE/NEW logic
        const formData = new FormData();

        if (audioBlobParam) {
          formData.append('file', audioBlobParam); // Web version uses blob directly
          formData.append('voice_prescription_filename', `${uuidv4()}.webm`);
          formData.append('source_duration', currentRecordingDuration || 0);
        } else if (transcribedText) {
          formData.append('voice_prescription_text', transcribedText);
        }

        formData.append('doctorId', doctorId);
        formData.append('patientId', patientId);

        // UPDATE existing Rx for dictate mode
        if (isUpdatingRx) {
          const data = preparePayloadForApi();
          formData.append('voice_prescription_previous_context', JSON.stringify(data));
          
          response = await updateGenRx(formData, existingRxId);
        } else {
        response = await generateRx(formData);
        }
      }

      // Process response (matches web version)
      const responseData = response?.data || response;
      const actualData = responseData?.data || responseData;

      // Improved success check - matches web version (comprehensive)
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
        actualData?._id ||
        responseData?._id ||
        actualData?.source ||
        responseData?.source ||
        (actualData?.rxDigitizationHistory && Array.isArray(actualData.rxDigitizationHistory) && actualData.rxDigitizationHistory.length > 0) ||
        (responseData?.rxDigitizationHistory && Array.isArray(responseData.rxDigitizationHistory) && responseData.rxDigitizationHistory.length > 0)
      );

      if (isSuccess) {
        const finalResponseData = actualData || responseData;
        
        if (!finalResponseData) {
          throw new Error('No data received from API');
        }
        
        let prescriptionData = null;
        let conversationData = null;

        // Improved data extraction - matches web version priority order
        if (isAmbient) {
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
            prescriptionData = finalResponseData.digitize || actualData?.digitize || responseData.digitize;
          }
          // Priority 4: Check for rxDigitizationHistory (latest ambient entry)
          else if (finalResponseData.rxDigitizationHistory && Array.isArray(finalResponseData.rxDigitizationHistory) && finalResponseData.rxDigitizationHistory.length > 0) {
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
          }
          // Priority 5: Direct prescription data in response (fallback)
          else if (responseData.symptoms || responseData.medications || responseData.vitalsAndBodyComposition) {
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
          // Dictate mode - improved extraction
          // Priority 1: Check for editedData
          if (actualData?.editedData) {
            prescriptionData = actualData.editedData;
          }
          else if (responseData?.editedData) {
            prescriptionData = responseData.editedData;
          }
          // Priority 2: Check for digitizeData
          else if (actualData?.digitizeData) {
            prescriptionData = actualData.digitizeData;
          }
          else if (responseData?.digitizeData) {
            prescriptionData = responseData.digitizeData;
          }
          // Priority 3: Check for direct prescription data
          else if (responseData?.symptoms || responseData?.medications || responseData?.vitalsAndBodyComposition) {
            prescriptionData = responseData;
          }
          // Priority 4: Check for rxDigitizationHistory
          else if (responseData?.rxDigitizationHistory?.[0]?.payload?.response) {
            prescriptionData = responseData.rxDigitizationHistory[0].payload.response;
          }
          else if (responseData?.rxDigitizationHistory?.[0]?.response) {
            prescriptionData = responseData.rxDigitizationHistory[0].response;
          }
          // Priority 5: Check for digitize
          else if (responseData?.digitize || actualData?.digitize) {
            prescriptionData = responseData?.digitize || actualData?.digitize;
          }
          
          // Handle conversation data for dictate mode
          if (responseData?.conversation) {
            conversationData = responseData.conversation;
          } else if (responseData?.rxDigitizationHistory?.[0]?.payload?.conversation) {
            conversationData = responseData.rxDigitizationHistory[0].payload.conversation;
          }
        }

        if (prescriptionData) {
          const validated = validatePrescriptionData(prescriptionData);
          const validatedData = (validated && typeof validated === 'object')
            ? validated
            : (prescriptionData && typeof prescriptionData === 'object' ? prescriptionData : {});

          const genRxDetailsData = {
            _id: responseData?._id || actualData?._id,
            source: responseData?.source || actualData?.source || '',
            source_duration: responseData?.source_duration || actualData?.source_duration,
            type: responseData?.type || actualData?.type || mode,
          };

          // Extract transcript text - match web version logic: transcription first, then history, then source
          let transcriptText = '';
          
          // First check for direct transcription field (matches web version line 2376)
          const transcription = responseData?.data?.transcription || responseData?.transcription || actualData?.transcription;
          if (transcription) {
            transcriptText = transcription;
          } 
          // Second check for history array (matches web version line 2437-2454)
          else {
            const history = responseData?.data?.history || responseData?.history || actualData?.history;
            if (history && Array.isArray(history) && history.length > 0) {
              const validTranscriptions = history
                .map(({ transcription, source_duration }) => ({
                  text: transcription,
                  isAudio: !!source_duration,
                  duration: source_duration || null
                }))
                .filter((query) => query.text && query.text !== "null" && query.text);
              
              if (validTranscriptions.length > 0) {
                transcriptText = validTranscriptions.map(q => q.text).join(' ');
              }
            }
            // Third fallback to source (matches web version line 2455-2464)
            // Only use source if it doesn't look like a filename (contains .webm, .mp3, etc.)
            else {
              const source = responseData?.data?.source || responseData?.source || actualData?.source;
              if (source && !source.match(/\.(webm|mp3|wav|m4a|ogg)$/i)) {
                transcriptText = source;
              }
            }

          }

          // Update full transcript
          let updatedFullTranscript = fullTranscript;
          if (transcriptText) {
            if (isUpdatingRx) {
              // Append for updates
              const existingTranscript = fullTranscript || genRxDetails?.source || '';
              updatedFullTranscript = existingTranscript ? 
                (existingTranscript + ' ' + transcriptText).trim() : transcriptText;
            } else {
              // Set for new Rx
              updatedFullTranscript = transcriptText;
            }
            setFullTranscript(updatedFullTranscript);
          }

          setGenRxDetails(genRxDetailsData);
          if (conversationData && Array.isArray(conversationData)) {
            setConversations(conversationData);
          }

          // Create query object (matches web version logic)
          const isAudioInput = !!audioBlobParam;
          
          // Get duration from response first, then use calculated duration (matches web version line 2385)
          let queryDuration = null;
          if (isAudioInput) {
            queryDuration = responseData?.data?.source_duration || responseData?.source_duration || actualData?.source_duration || currentRecordingDuration || genRxDetailsData.source_duration || null;
          }
          
          // For ambient mode, handle conversations like web version
          let conversationsToStore = [];
          if (isAmbient) {
            if (!isAudioInput && transcribedText) {
              // Text input: Use only the text that was just typed (matches web version line 1931-1938)
              conversationsToStore = [{
                speaker: 'doctor',
                text: transcribedText,
                message: transcribedText,
                content: transcribedText
              }];
            } else if (isAudioInput && conversationData) {
              // Audio input: Extract only NEW conversations that weren't in previous queries (matches web version lines 1939-1971)
              // Get all previous conversations from existing queries
              const previousConversations = queries.flatMap(q => {
                if (q && typeof q === 'object' && q.conversations && Array.isArray(q.conversations)) {
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
          }

          // Ensure audio queries ALWAYS have meaningful text content
          let queryText = '';
          if (isAudioInput) {
            // For audio inputs, prioritize transcriptText, then conversation text, then fallback
            if (transcriptText && transcriptText.trim()) {
              queryText = transcriptText.trim();
            } else if (isAmbient && conversationsToStore.length > 0) {
              // For ambient audio, use conversation text
              queryText = conversationsToStore
                .map(conv => conv.text || conv.message || conv.content)
                .filter(Boolean)
                .join(' ')
                .trim();
            }
            // Fallback for audio without transcript
            if (!queryText) {
              queryText = 'Audio recording processed';
            }
          } else {
            // For text inputs, use the transcribed text
            queryText = (transcribedText || transcriptText || '').trim();
          }
          
          const newQuery = isAmbient ? {
            conversations: conversationsToStore,
            isAudio: isAudioInput,
            duration: queryDuration,
            text: queryText // Always has meaningful text
          } : {
            text: queryText, // Always has meaningful text
            isAudio: isAudioInput,
            duration: queryDuration
          };

          setIsProcessing(false);

          const swapDelayMs = 700;
          setTimeout(() => {
            setShowSkeleton(true);
            setTimeout(() => {
              setShowSkeleton(false);
              
              // Use callback pattern to merge data (matches web version setPrescriptionData logic)
              setPrescriptionData((prevData) => {
                const apiDynamicFields = validatedData?.dynamicFields || {};
                const prevDynamicFields = prevData?.dynamicFields || {};
                const mergedDynamicFields = {
                  ...prevDynamicFields,
                  ...apiDynamicFields,
                };

                if (isUpdatingRx && prevData) {
                  const hasMeaningfulData = validatedData.symptoms?.length > 0 || 
                                            validatedData.medications?.length > 0 || 
                                            validatedData.vitalsAndBodyComposition || 
                                            Object.keys(validatedData).length > 2;
                  
                  if (hasMeaningfulData) {
                    return {
                      ...validatedData,
                      medicalHistory: validatedData.medicalHistory || prevData?.medicalHistory || [],
                      dynamicFields: mergedDynamicFields,
                    };
                  } else {
                    // Preserve medical history even when there's no meaningful data (matches web version line 2136-2141)
                    return {
                      ...(prevData || {}),
                      medicalHistory: prevData?.medicalHistory || validatedData?.medicalHistory || [],
                      dynamicFields: mergedDynamicFields,
                    };
                  }
                } else {
                  return {
                    ...validatedData,
                    medicalHistory: validatedData.medicalHistory || prevData?.medicalHistory || [],
                    dynamicFields: mergedDynamicFields,
                  };
                }
              });
              
              // Calculate final prescription data for onDataReady callback (before state update)
              // Use existingPrescriptionData from location.state or current prescriptionData state
              const prevData = existingPrescriptionData || prescriptionData;
              const apiDynamicFields = validatedData?.dynamicFields || {};
              const prevDynamicFields = prevData?.dynamicFields || {};
              const mergedDynamicFields = {
                ...prevDynamicFields,
                ...apiDynamicFields,
              };

              let finalPrescriptionData;
              if (isUpdatingRx && prevData) {
                const hasMeaningfulData = validatedData.symptoms?.length > 0 || 
                                          validatedData.medications?.length > 0 || 
                                          validatedData.vitalsAndBodyComposition || 
                                          Object.keys(validatedData).length > 2;
                
                if (hasMeaningfulData) {
                  finalPrescriptionData = {
                    ...validatedData,
                    medicalHistory: validatedData.medicalHistory || prevData?.medicalHistory || [],
                    dynamicFields: mergedDynamicFields,
                  };
                } else {
                  // Preserve medical history even when there's no meaningful data (matches web version)
                  finalPrescriptionData = {
                    ...(prevData || {}),
                    medicalHistory: prevData?.medicalHistory || validatedData?.medicalHistory || [],
                    dynamicFields: mergedDynamicFields,
                  };
                }
              } else {
                finalPrescriptionData = {
                  ...validatedData,
                  medicalHistory: validatedData.medicalHistory || prevData?.medicalHistory || [],
                  dynamicFields: mergedDynamicFields,
                };
              }

              // Call onDataReady immediately to prevent data loss (not after delay)
              // Prevent duplicate calls using ref
              if (onDataReady && !onDataReadyCalledRef.current) {
                onDataReadyCalledRef.current = true;
                
                // Mark this input as processed
                const currentInputId = audioBlobFromLocation 
                  ? `audio-${audioBlobFromLocation.size || 'unknown'}` 
                  : inputTextFromLocation 
                    ? `text-${inputTextFromLocation.substring(0, 20)}` 
                    : null;
                if (currentInputId) {
                  processedInputRef.current = currentInputId;
                }
                
                // isEditing should be false for new inputs (even if updating Rx)
                // Only true when explicitly editing an existing query, not when adding new input
                // Subsequent inputs to existing Rx should add new queries, not replace
                const isEditing = false; // Always add new queries, never replace (matches web behavior)
                
                onDataReady({
                  prescriptionData: finalPrescriptionData,
                  genRxDetails: genRxDetailsData,
                  fullTranscript: updatedFullTranscript || transcriptText,
                  conversations: conversationData || [],
                  query: newQuery,
                  isEditing: isEditing, // Always false - add new queries, don't replace
                });
                
                // Clear processed input from location.state to prevent reprocessing
                // This prevents duplicate queries when navigating back to Rx Pad
                if (location.state && (audioBlobFromLocation || inputTextFromLocation)) {
                  navigate(location.pathname, {
                    state: {
                      ...location.state,
                      audioBlob: undefined,
                      inputText: undefined,
                      fromVoiceRecording: false,
                    },
                    replace: true,
                  });
                }
              }
            }, 2000);
          }, swapDelayMs);
        } else {
          setIsProcessing(false);
          message.error('No prescription data received');
        }
      } else {
        setIsProcessing(false);
        message.error('Failed to process. Please try again.');
      }
    } catch (error) {
      setIsProcessing(false);
      message.error(error?.message || 'Failed to process. Please try again.');
    }
  };

  // Handle End Visit - matches web version's onEndVisitClick
  const handleEndVisit = async () => {
    if (!prescriptionData) {
      message.error('Prescription data is missing. Please try again.');
      return;
    }

    // Validate prescription ID is available for update
    const rxId = genRxDetails?._id || caseManagerData?.smart_prescription_filename;
    if (!rxId || typeof rxId !== 'string' || !rxId.trim()) {
      message.error('Cannot save prescription: Missing prescription ID. Please try again.');
      setIsEndingVisit(false);
      return;
    }

    setIsEndingVisit(true);
    try {
      // Step 1: Sanitize medications and get quantities (matches web version)
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

      // Step 2: Update GenRx with quantities (matches web version's handleUpdateGenRX)
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

      // Step 2: Update prescription via API
      let updateResponse;
      if (isAmbientMode && genRxDetails?.type === "ambient") {
        updateResponse = await editAmbientRxDetails(
          { editedData: updatedPrescriptionData },
          rxId
        );
      } else {
        updateResponse = await editGenRxDetails(
          { editedData: updatedPrescriptionData },
          rxId
        );
      }

      if (updateResponse.status !== 204 && !updateResponse.success) {
        throw new Error('Failed to update prescription');
      }

      // Update genRxDetails state with the prescription ID to ensure consistency
      if (updateResponse?.data?._id || rxId) {
        setGenRxDetails(prev => ({
          ...prev,
          _id: updateResponse?.data?._id || rxId,
          type: updateResponse?.data?.type || prev?.type || (isAmbientMode ? 'ambient' : 'dictate'),
        }));
      }

      // Step 3: Save case manager data (matches web version)
      // Distinguish between EDIT (came with smart_prescription_filename) vs NEW (created just now)
      const isEditingExistingPrescription = !!caseManagerData?.smart_prescription_filename;
      let tcmId = caseManagerData?.tcm_id;
      
      // Skip case manager update ONLY if editing existing prescription without tcm_id
      // This prevents duplicate entries when editing
      if (isEditingExistingPrescription && (!tcmId || tcmId === 0)) {
        // Prescription is already updated - show success screen to user
        setEndVisitCaseManagerData({
          ...caseManagerData,
          smart_prescription_filename: rxId,
          tcm_id: caseManagerData?.tcm_id,
        });
        setShowEndVisitScreen(true);
        setIsEndingVisit(false);
        message.success('Prescription updated successfully.');
        return;
      }
      
      // Default to 0 for new prescriptions
      tcmId = tcmId || 0;
      const consultationDate = caseManagerData?.consultation_date || moment().format('YYYY-MM-DD HH:mm:ss');
      const pamId = patient_data?.pam_id || 0;
      const labReportID = caseManagerData?.labReportID || null;

      // Convert vitalsAndBodyComposition (object) to vitals (array) - MINIMAL FIX
      let vitalsArray = [];
      const vitals = updatedPrescriptionData?.vitalsAndBodyComposition || {};
      if (vitals && typeof vitals === 'object' && Object.values(vitals).some(v => v && v.toString().trim())) {
        const existingVitals = caseManagerData?.vitals?.[0] || {};
        const cleanValue = (v) => v ? v.toString().trim().replace(/[\s\u00A0]*[℃℉°CF]|[\s\u00A0]*bpm|[\s\u00A0]*\/min|[\s\u00A0]*mmhg|[\s\u00A0]*mg\/dl/gi, '').trim() : '';
        
        // Calculate BMI, BMR, BSA from height and weight (matches web version VitalsBox behavior)
        const calculateBodyComposition = (height, weight) => {
          let bmi = '', bmr = '', bsa = '';
          const h = parseFloat(height);
          const w = parseFloat(weight);
          
          if (h > 0 && w > 0) {
            // BMI = weight (kg) / height (cm) / height (cm) * 10000
            const calBMI = (w / h / h) * 10000;
            bmi = isFinite(calBMI) ? calBMI.toFixed(2) : '';
            
            // BMR calculation (Mifflin-St Jeor Equation)
            const age = patient_data?.ageYears || 0;
            const isMale = patient_data?.pm_gender === 'Male';
            if (age > 0) {
              const calBMR = isMale 
                ? (10 * w) + (6.25 * h) - (5 * age) + 5
                : (10 * w) + (6.25 * h) - (5 * age) - 161;
              bmr = isFinite(calBMR) ? calBMR.toFixed(2) : '';
            }
            
            // BSA = sqrt(height (cm) * weight (kg) / 3600)
            const calBSA = Math.sqrt(h * w / 3600);
            bsa = isFinite(calBSA) ? calBSA.toFixed(2) : '';
          }
          
          return { bmi, bmr, bsa };
        };
        
        // Map all possible key variations from Rich Text Editor to API keys
        const keyMap = { 
          temperature: 'temp', 
          pulse: 'pres', 
          respRate: 'resp_rate', 
          rr: 'resp_rate',  // Rich Text Editor uses 'rr'
          bloodPressure: 'blood_press', 
          bp: 'blood_press',  // Rich Text Editor uses 'bp'
          generalRbs: 'general_rbs',
          generalrbs: 'general_rbs',  // Case variation
          // Body composition fields - support both camelCase and snake_case
          waistCircumference: 'waist_circumference',
          waistcircumference: 'waist_circumference',
        };
        const vitalsItem = {};
        Object.entries(vitals).forEach(([k, v]) => {
          const key = keyMap[k] || k;  // Use mapped key or original if not in map
          if (v && v.toString().trim()) vitalsItem[key] = cleanValue(v);
        });
        
        if (Object.keys(vitalsItem).length > 0) {
          // Match web version exact field order: date, dev_unique_id, tcv_id, patient_birth_weight, temp, pres, resp_rate, blood_press, spo2, general_rbs, tcbc_id, height, weight, bmi, bmr, bsa, pam_id, ofc, fib4, waist_circumference
          vitalsArray = [{
            date: new Date().toISOString().split('T')[0],
            dev_unique_id: existingVitals.dev_unique_id || 0,
            tcv_id: existingVitals.tcv_id || 0,
            patient_birth_weight: existingVitals.patient_birth_weight || caseManagerData?.patient_birth_weight || null,
            temp: vitalsItem.temp || (existingVitals.temp ? cleanValue(existingVitals.temp.toString()) : ''),
            pres: vitalsItem.pres || (existingVitals.pres ? cleanValue(existingVitals.pres.toString()) : ''),
            resp_rate: vitalsItem.resp_rate || (existingVitals.resp_rate ? cleanValue(existingVitals.resp_rate.toString()) : ''),
            // CRITICAL FIX: Filter out corrupted blood_press values like "undefined/u"
            blood_press: vitalsItem.blood_press || (existingVitals.blood_press && 
              existingVitals.blood_press.toString().trim() && 
              !existingVitals.blood_press.toString().includes('undefined') &&
              existingVitals.blood_press.toString() !== 'undefined/u' &&
              existingVitals.blood_press.toString() !== 'undefined/undefined'
              ? cleanValue(existingVitals.blood_press.toString()) 
              : ''),
            spo2: vitalsItem.spo2 || (existingVitals.spo2 ? cleanValue(existingVitals.spo2.toString()) : ''),
            general_rbs: vitalsItem.general_rbs || (existingVitals.general_rbs ? cleanValue(existingVitals.general_rbs.toString()) : ''),
            tcbc_id: existingVitals.tcbc_id || 0,
            height: vitalsItem.height || (existingVitals.height ? cleanValue(existingVitals.height.toString()) : ''),
            weight: vitalsItem.weight || (existingVitals.weight ? cleanValue(existingVitals.weight.toString()) : ''),
            // Body composition fields: calculate from height/weight if both provided, otherwise use vitalsItem if manually entered, otherwise use existing
            // Match web version: bmi, bmr, bsa are auto-calculated from height/weight
            ...(function() {
              const finalHeight = vitalsItem.height || (existingVitals.height ? cleanValue(existingVitals.height.toString()) : '');
              const finalWeight = vitalsItem.weight || (existingVitals.weight ? cleanValue(existingVitals.weight.toString()) : '');
              const calculated = calculateBodyComposition(finalHeight, finalWeight);
              
              return {
                bmi: vitalsItem.bmi !== undefined ? vitalsItem.bmi : (calculated.bmi || (existingVitals.bmi ? cleanValue(existingVitals.bmi.toString()) : '')),
                bmr: vitalsItem.bmr !== undefined ? vitalsItem.bmr : (calculated.bmr || (existingVitals.bmr ? cleanValue(existingVitals.bmr.toString()) : '')),
                bsa: vitalsItem.bsa !== undefined ? vitalsItem.bsa : (calculated.bsa || (existingVitals.bsa ? cleanValue(existingVitals.bsa.toString()) : '')),
              };
            })(),
            pam_id: pamId || 0,
            ofc: vitalsItem.ofc || (existingVitals.ofc ? cleanValue(existingVitals.ofc.toString()) : ''),
            fib4: vitalsItem.fib4 !== undefined ? vitalsItem.fib4 : (existingVitals.fib4 ? cleanValue(existingVitals.fib4.toString()) : ''),
            waist_circumference: vitalsItem.waist_circumference !== undefined ? vitalsItem.waist_circumference : (existingVitals.waist_circumference ? cleanValue(existingVitals.waist_circumference.toString()) : ''),
          }];
        }
      }

      // Call addUpdateVitals to save vitals with proper IDs
      let finalVitalsArray = vitalsArray;
      if (vitalsArray.length > 0) {
        try {
          const vitalsAction = await dispatch(addUpdateVitals({
            patient_unique_id: patient_data?.patient_unique_id || 0,
            pm_pid: patient_data?.pm_pid || 0,
            pm_id: patient_data?.pm_id || 0,
            pam_id: pamId || 0,
            patient_birth_weight: caseManagerData?.patient_birth_weight || null,
            data: vitalsArray,
          }));
          if (vitalsAction.meta.requestStatus === "fulfilled" && vitalsAction.payload) {
            const returnedVitals = Array.isArray(vitalsAction.payload) ? vitalsAction.payload : [vitalsAction.payload];
            // Ensure all required fields are present in returned vitals (matches web version structure)
            // Match web version exact field order and filter corrupted blood_press
            finalVitalsArray = returnedVitals.map(v => ({
              date: v.date || new Date().toISOString().split('T')[0],
              dev_unique_id: v.dev_unique_id || 0,
              tcv_id: v.tcv_id || 0,
              patient_birth_weight: v.patient_birth_weight || caseManagerData?.patient_birth_weight || null,
              temp: v.temp || '',
              pres: v.pres || '',
              resp_rate: v.resp_rate || '',
              // CRITICAL FIX: Filter out corrupted blood_press values from backend response
              blood_press: (v.blood_press && 
                           v.blood_press.toString().trim() && 
                           !v.blood_press.toString().includes('undefined') &&
                           v.blood_press.toString() !== 'undefined/u' &&
                           v.blood_press.toString() !== 'undefined/undefined'
                           ? v.blood_press.toString().trim() 
                           : ''),
              spo2: v.spo2 || '',
              general_rbs: v.general_rbs || '',
              tcbc_id: v.tcbc_id || 0,
              height: v.height || '',
              weight: v.weight || '',
              bmi: v.bmi || '',
              bmr: v.bmr || '',
              bsa: v.bsa || '',
              pam_id: v.pam_id || pamId || 0,
              ofc: v.ofc || '',
              fib4: v.fib4 || '',
              waist_circumference: v.waist_circumference || '',
            }));
          }
        } catch (error) {
          // Error saving vitals
        }
      }

      // Match web: persist lab results to API and include in case manager payload
      const labResultsDataForApi = formatLabResultsForApi(updatedPrescriptionData?.labResults || prescriptionData?.labResults || []);
      await persistLabResultsToApi(labResultsDataForApi);

      // Match web: format medical history from context for case manager
      let formattedMedicalHistory = [];
      if (medicalHistoryData && Array.isArray(medicalHistoryData) && medicalHistoryData.length > 0) {
        const remarks = medicalHistoryData[0]?.medical_history_remarks;
        formattedMedicalHistory = medicalHistoryData.map((section, index) => ({
          title: section?.title || section?.section_name || '',
          tmmhs_id: section?.tmmhs_id || 0,
          no_know_history: section?.no_know_history !== undefined ? section?.no_know_history : false,
          tags: !section?.no_know_history && Array.isArray(section?.tags)
            ? section.tags.filter((t) => t?.enable === 'Y' || t?.enable === 'N').map((t) => {
                const tagData = {
                  tmmhst_id: t?.tmmhst_id || 0,
                  title: t?.title || '',
                  pms_default: t?.pms_default || 0,
                  since: t?.since || '',
                  status: t?.status || '',
                  medication: t?.medication || '',
                  note: t?.note || '',
                  enable: t?.enable || 'Y',
                };
                // Add surgical history specific fields if they exist
                if (section?.tmmhs_id === 5 && t?.date) {
                  tagData.date = t.date;
                  tagData.dateType = t?.dateType || 'onlyYear';
                }
                return tagData;
              })
            : [],
          ...(remarks && index === 0 && { medical_history_remarks: remarks.trim() })
        }));
      }

      const sendData = {
        action: tcmId === 0 ? "add" : "edit",
        tcm_id: tcmId,
        patient_unique_id:
          patient_data !== undefined ? patient_data.patient_unique_id : 0,
        pam_id: pamId,
        consultation_date: consultationDate,
        smart_prescription_filename: genRxDetails?._id || rxId,
        labReportID: labReportID,
        ...(finalVitalsArray.length > 0 && { vitals: finalVitalsArray }),
        ...(formattedMedicalHistory.length > 0 && { medical_history: formattedMedicalHistory }),
        ...(labResultsDataForApi.length > 0 && { labParamsData: labResultsDataForApi }),
      };

      const action =
        tcmId == 0
          ? await dispatch(addCaseManager(sendData))
          : await dispatch(editCaseManager(sendData));

      if (action.meta.requestStatus === "fulfilled") {
        const generatedTcmId = action?.payload?.tcm_id ?? tcmId;
        
        // Show styled success message (matches web version)
        message.open({
          key: MESSAGE_KEY,
          type: "",
          className: "message-appointment",
          content: (
            <div className="d-flex align-items-center">
              <img src={visitEndIcon} className="me-3" alt="Visit End Icon" />
              <div>
                <div className="title-common-digitised text-start fontroboto">
                  {`${patient_data?.pm_first_name || 'Patient'}'s visit ended successfully.`}
                </div>
              </div>
              <img
                src={closeVisitIcon}
                className="ms-3"
                alt="Close Visit Icon"
                onClick={() => message.destroy(MESSAGE_KEY)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ),
          duration: 5,
        });
        
        // Fetch updated case (viewCaseManager) then set endVisitCaseManagerData.
        // Ensure smart_prescription_filename is always set so "Edit prescription" from End Visit
        // can load the correct Gen Rx via getGenRx(id). Backend may not return it in payload.
        setTimeout(async () => {
          try {
            const viewAction = await dispatch(viewCaseManager({
              patient_unique_id: patient_data?.patient_unique_id || 0,
              tcm_id: generatedTcmId,
            }));
            const base = (viewAction.meta.requestStatus === 'fulfilled' && viewAction.payload)
              ? viewAction.payload
              : action.payload;
            setEndVisitCaseManagerData({
              ...base,
              smart_prescription_filename: base?.smart_prescription_filename || genRxDetails?._id,
            });
          } catch (error) {
            setEndVisitCaseManagerData({
              ...(action.payload || {}),
              smart_prescription_filename: action.payload?.smart_prescription_filename || genRxDetails?._id,
            });
          }
          setShowEndVisitScreen(true);
        }, 2000);
      } else {
        throw new Error(action.error || 'Failed to save case manager data');
      }
    } catch (error) {
      message.error(error?.message || 'Failed to end visit. Please try again.');
    } finally {
      setIsEndingVisit(false);
    }
  };

  // Get print URL from endVisitCaseManagerData or caseManagerData
  const getPrintUrl = () => {
    if (endVisitCaseManagerData?.print_url) {
      return endVisitCaseManagerData.print_url;
    }
    if (endVisitCaseManagerData?.print_rx_url) {
      return endVisitCaseManagerData.print_rx_url;
    }
    if (caseManagerData?.print_url) {
      return caseManagerData.print_url;
    }
    if (caseManagerData?.print_rx_url) {
      return caseManagerData.print_rx_url;
    }
    return null;
  };

  // Get tcm_id
  const getTcmId = () => {
    if (endVisitCaseManagerData?.tcm_id) {
      return endVisitCaseManagerData.tcm_id;
    }
    return caseManagerData?.tcm_id || genRxDetails?._id || null;
  };

  return (
    <>
      <Drawer
        placement="bottom"
        onClose={onClose}
        open={visible && !showEndVisitScreen}
        height="100%"
        className="mobile-rx-pad-drawer"
        closable={false}
        maskClosable={false}
        destroyOnClose={false}
      >
      <div className="mobile-rx-pad-container">
        <div className="mobile-rx-pad-header">
          <div className="rx-pad-title-section">
            <img src={documentNormalSvg} alt="Rx Pad" className="rx-pad-icon" />
            <span className="rx-pad-title">Rx Pad</span>
            <img src={infoIcon} alt="Info" className="rx-pad-info-icon" />
          </div>
          <button className="rx-pad-close-button" onClick={onClose} type="button">
            <img src={minimiseIcon} alt="Minimise" className="rx-pad-close-icon" />
          </button>
        </div>

        <div className="mobile-rx-pad-content">
          {isProcessing ? (
            <MobileRxPadProcessing isProcessing={isProcessing} />
          ) : showSkeleton ? (
            <MobileRxPadSkeleton />
          ) : prescriptionData ? (
            <MobileRxPadContent 
              prescriptionData={prescriptionData}
              onUpdate={(updatedData) => {
                setPrescriptionData(updatedData);
              }}
              onEditWithVoice={(section) => {
                if (onQuickEdit) {
                  onQuickEdit({
                    prescriptionData,
                    genRxDetails,
                    fullTranscript,
                    conversations,
                    queries,
                  });
                } else {
                  onClose();
                }
              }}
              onEndVisit={handleEndVisit}
              isProcessing={isProcessing}
              patient_data={patient_data}
              caseManagerData={caseManagerData}
            />
          ) : null}
        </div>
      </div>
    </Drawer>

    {/* End Visit Screen */}
    <MobileEndVisitScreen
      visible={showEndVisitScreen}
      onClose={() => {
        setShowEndVisitScreen(false);
        onClose();
      }}
      prescriptionData={prescriptionData}
      genRxDetails={genRxDetails}
      patient_data={patient_data}
      tcm_id={getTcmId()}
      print_url={getPrintUrl()}
      isAmbientRx={isAmbientMode}
      caseManagerData={endVisitCaseManagerData || caseManagerData}
    />
    </>
  );
}

export default MobileRxPad;


