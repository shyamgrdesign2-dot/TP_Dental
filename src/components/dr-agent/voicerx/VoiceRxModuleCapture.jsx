import React, { useCallback, useEffect, useRef, useState } from "react";
import { VoiceRecorderCore } from "./VoiceRecorderCore";
import {
  CaptionCarousel,
  ConversationTranscript,
  DictationTranscript,
  hasDiarizedTranscript,
  hasTranscriptContent,
} from "./VoiceTranscriptProcessingCard";
import { ShineBorder } from "./ShineBorder";
import { VoiceRxIcon } from "./voice-consult-icons";
import { ConfirmDialog as TPConfirmDialog } from "../molecules/ConfirmDialog";
import { toast } from "./toast";
import styles from "./VoiceRxModuleCapture.module.scss";

const ENABLE_REAL_MODULE_DIGITISE_API = false;
const MODULE_DIGITISE_ENDPOINT = "/transcribe-and-digitise";
const BUTTON_PROCESSING_MS = 5000;
const SHINER_PROCESSING_MS = 5000;

export const VOICE_MODULE_DUMMY_DIGITISED_DATA = {
  symptoms: [
    {
      symptom_name: "Heart Burn",
      since: "2 Day(s)",
      severity: "Moderate",
      note: "asdf",
      objectID: "6920fb30-8e91-4d3f-9825-6339498efd7b-1734948424706",
      pms_default: 0,
    },
    {
      symptom_name: "test",
      since: "",
      severity: "",
      note: "etegfgsdgs",
      objectID: "a39f021e-acdf-4087-8476-e68980d3326a-1762237955113",
      pms_default: 0,
    },
    {
      symptom_name: "Heart Burn",
      since: "2 Day(s)",
      severity: "Moderate",
      note: "asdf",
      objectID: "6920fb30-8e91-4d3f-9825-6339498efd7b-1734948424706",
      pms_default: 0,
    },
    {
      symptom_name: "test",
      since: "",
      severity: "",
      note: "etegfgsdgs",
      objectID: "a39f021e-acdf-4087-8476-e68980d3326a-1762237955113",
      pms_default: 0,
    },
  ],
  examination: [
    {
      examination_name: "At vero eos et accusamus et iusto odio dignissimos ducimus",
      note: "sdfsfd",
      objectID: "",
      pms_default: 1,
    },
    {
      examination_name: "CC Sub Title 5-2",
      note: "",
      objectID: "",
      pms_default: 1,
    },
    {
      examination_name: "ED Subtitle 3-4",
      note: "sdf",
      objectID: "",
      pms_default: 1,
    },
  ],
  surgeries: [
    {
      masterId: "673d8dc4f503c1fb9aa90682",
      name: "Abdominal Cervical Encirclage",
      notes: "test notes",
    },
  ],
  diagnosis: [
    {
      objectID: "2d149aa9-3d73-497c-8494-6648235b0e10",
      tds_id: 20761,
      pms_default: 0,
      icd_code: "",
      tds_name: "typhy",
      unique_id: "107a1288-1231-4d11-946f-68889ab9fd6c",
      since: "",
      status: "",
      note: "",
    },
    {
      pms_default: 1,
      tds_name: "Syphilis of bone and joint",
      tdtd_id: 245,
      tdt_id: 80,
      tds_id: 20881,
      since: "",
      status: "",
      note: "",
      objectID: "d521a970-e566-4681-b358-1fc7f7530cdd",
      icd_code: "A52.77",
    },
    {
      pms_default: 1,
      tds_name: "Symptomatic late syphilis of other respiratory organs",
      tdtd_id: 246,
      tdt_id: 80,
      tds_id: 20878,
      since: "",
      status: "",
      note: "",
      objectID: "fa8527d3-c9f5-4fa6-acfa-1c970468f6f9",
      icd_code: "A52.73",
    },
    {
      pms_default: 0,
      tds_name: "hello",
      tdtd_id: 247,
      tdt_id: 80,
      tds_id: 20799,
      since: "",
      status: "",
      note: "",
      objectID: "285033a2-3f6d-4cb9-8adc-245e47674aff",
      icd_code: "",
    },
  ],
  medicine: [
    {
      tmm_id: 241832,
      tcm_tmr_type: "M",
      tmm_medicine_name: "PANTOPRAZOLINE SYRUP",
      tmm_generic: "PANTOP",
      tmm_company: "",
      tmm_type: 0,
      tmm_days: 10,
      tmm_duration_type: "Day(s)",
      tmm_dosage: "0",
      tmm_unit: 0,
      tcm_tmm_freq_morning: 1,
      tcm_tmm_freq_afternoon: 0,
      tcm_tmm_freq_evening: 0,
      tcm_tmm_freq_night: 0,
      tmm_time: 5,
      tmm_freq_type: 0,
      tmf_block: 0,
      tmu_id: 0,
      tmm_remarks: "",
      pms_default: 0,
      tmm_unit_name: "",
      tmm_freq_type_name: "1 - 0 -0",
      tmf_block_val: "",
      tmm_time_name: "Before Breakfast",
      tmm_dosage_unit_name: "0 ",
      tmm_days_duration_type: "10 Day(s)",
      unique_id: "234a7c2d-13cb-42d1-954e-8c692fee3d5b",
    },
    {
      tmm_id: 234204,
      tcm_tmr_type: "M",
      tmm_medicine_name: "DOLO 650MG TABLET",
      tmm_generic: "PARACETAMOL-650MG",
      tmm_company: "",
      tmm_type: 0,
      tmm_days: 10,
      tmm_duration_type: "Day(s)",
      tmm_dosage: "0",
      tmm_unit: 0,
      tcm_tmm_freq_morning: 1,
      tcm_tmm_freq_afternoon: 1,
      tcm_tmm_freq_evening: 0,
      tcm_tmm_freq_night: 1,
      tmm_time: 2,
      tmm_freq_type: 0,
      tmf_block: 0,
      tmu_id: 0,
      tmm_remarks: "",
      pms_default: 0,
      tmm_unit_name: "",
      tmm_freq_type_name: "1 - 1 - 1",
      tmf_block_val: "",
      tmm_time_name: "After Food",
      tmm_dosage_unit_name: "0 ",
      tmm_days_duration_type: "10 Day(s)",
      unique_id: "5098be13-f8d8-44dc-a952-7a3efae7e24d",
    },
    {
      tmm_id: 239907,
      tcm_tmr_type: "M",
      tmm_medicine_name: "AUGMENTIN DUO 30ML SYRUP",
      tmm_generic: "AMOXYCILLIN-200MG + CLAVULANIC ACID-28.5MG",
      tmm_company: "",
      tmm_type: 0,
      tmm_days: 7,
      tmm_duration_type: "Day(s)",
      tmm_dosage: "0",
      tmm_unit: 0,
      tcm_tmm_freq_morning: 1,
      tcm_tmm_freq_afternoon: 0,
      tcm_tmm_freq_evening: 0,
      tcm_tmm_freq_night: 1,
      tmm_time: 0,
      tmm_freq_type: 0,
      tmf_block: 0,
      tmu_id: 0,
      tmm_remarks: "",
      pms_default: 0,
      tmm_unit_name: "",
      tmm_freq_type_name: "1 - 0 -1",
      tmf_block_val: "",
      tmm_time_name: "",
      tmm_dosage_unit_name: "0 ",
      tmm_days_duration_type: "7 Day(s)",
      unique_id: "a94d4110-9bac-49a3-a7fb-2821970cd074",
    },
    {
      tmm_id: 234366,
      tcm_tmr_type: "M",
      tmm_medicine_name: "ALERID D TABLET",
      tmm_generic: "CETIRIZINE-5MG + PHENYLEPHRINE-10MG",
      tmm_company: "",
      tmm_type: 0,
      tmm_days: 7,
      tmm_duration_type: "Day(s)",
      tmm_dosage: "0",
      tmm_unit: 0,
      tcm_tmm_freq_morning: 1,
      tcm_tmm_freq_afternoon: 0,
      tcm_tmm_freq_evening: 0,
      tcm_tmm_freq_night: 1,
      tmm_time: 0,
      tmm_freq_type: 0,
      tmf_block: 0,
      tmu_id: 0,
      tmm_remarks: "",
      pms_default: 0,
      tmm_unit_name: "",
      tmm_freq_type_name: "1 - 0 -1",
      tmf_block_val: "",
      tmm_time_name: "",
      tmm_dosage_unit_name: "0 ",
      tmm_days_duration_type: "7 Day(s)",
      unique_id: "ffb6f1c0-1161-44cd-b5f8-74a190928175",
    },
  ],
  advice: [
    {
      unique_id: "a257c5c4-475b-4757-8544-d2ba8de204e7",
      change: 1,
      pms_default: 0,
      advice_name: "Start Symptoms voice input",
    },
  ],
  investigation: [
    {
      id: "50192",
      objectID: "a6425c65-1450-42f8-b5ab-b115b0c2462c",
      pms_default: 1,
      investigation_name: "BONE MARROW NEW TEST BY HITESH",
      hm_type: 1,
      um_id: 0,
      service_code: "",
      unique_id: "04caa6bf-dadf-4b01-aad0-7e6980526c5c",
      note: "",
    },
    {
      investigation_name: "COMPLEX KNEE SURGERY",
      note: "new 6",
      pms_default: 1,
      typesenseId: "0",
      unique_id: "82883a57-3ae1-4416-9b7c-6172ffb9b912",
    },
    {
      investigation_name: "ARTHROSCOPIC SURGERY ( OTHER THAN ACL) / MENISECTOMY",
      note: "new2",
      pms_default: 1,
      typesenseId: "0",
      unique_id: "01a0d675-c0ff-4d88-8fb3-67d7052d2cce",
    },
    {
      investigation_name: "# Scaphoid CRIF - II",
      note: "",
      pms_default: 1,
      typesenseId: "0",
      unique_id: "9c422d72-360e-4ec6-a17c-008b3728b805",
    },
    {
      investigation_name: "BONE GRAFTING FOR NON UNION OF SMALL BONES",
      note: "hohoho",
      pms_default: 1,
      typesenseId: "0",
      unique_id: "73531943-0651-4efc-a1a6-f78e65bb22a6",
    },
    {
      investigation_name: "COMPLEX KNEE SURGERY",
      note: "",
      pms_default: 1,
      typesenseId: "0",
      unique_id: "2e31851c-d9f6-4c4a-bd73-44d97a4b1548",
    },
  ],
};

async function requestTranscribeAndDigitise({ audioBlob, transcript, moduleName, durationMs }) {
  const formData = new FormData();
  if (audioBlob) {
    formData.append("audio", audioBlob, `${moduleName || "module"}-voice.webm`);
  }
  formData.append("module_name", moduleName || "");
  formData.append("transcript", transcript || "");
  formData.append("duration_ms", String(durationMs || 0));

  const response = await fetch(MODULE_DIGITISE_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Module voice digitise failed with ${response.status}`);
  }

  return response.json();
}

export function VoiceRxModuleButton({ active = false, onClick, label = "Start voice input" }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={[styles.voiceButton, active ? styles.voiceButtonActive : ""].filter(Boolean).join(" ")}>
      <VoiceRxIcon size={36} color="#673AAC" />
    </button>
  );
}

export function useVoiceRxModuleCapture({ moduleName, onApply, successMessage }) {
  const [voiceCaptureOpen, setVoiceCaptureOpen] = useState(false);
  const [voiceUpdated, setVoiceUpdated] = useState(false);
  const voiceUpdatedTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (voiceUpdatedTimerRef.current) {
        window.clearTimeout(voiceUpdatedTimerRef.current);
      }
    };
  }, []);

  const handleVoiceCaptureComplete = useCallback((digitisedData) => {
    const nextItems = Array.isArray(digitisedData)
      ? digitisedData.map((item) => ({ ...item }))
      : [];
    if (nextItems.length > 0) {
      onApply?.(nextItems);
    }
    setVoiceCaptureOpen(false);
    setVoiceUpdated(true);
    toast.success(successMessage || `${moduleName} filled from voice dictation`);
    if (voiceUpdatedTimerRef.current) {
      window.clearTimeout(voiceUpdatedTimerRef.current);
    }
    voiceUpdatedTimerRef.current = window.setTimeout(() => setVoiceUpdated(false), 2400);
  }, [moduleName, onApply, successMessage]);

  return {
    voiceCaptureOpen,
    setVoiceCaptureOpen,
    voiceUpdated,
    handleVoiceCaptureComplete,
  };
}

export function VoiceRxModuleCapture({
  moduleName,
  dummyDigitisedData = [],
  onCancel,
  onComplete,
}) {
  const [phase, setPhase] = useState("recording");
  const [capturedTranscript, setCapturedTranscript] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mountedRef = useRef(true);
  const buttonTimerRef = useRef(null);
  const completionTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (buttonTimerRef.current) {
        window.clearTimeout(buttonTimerRef.current);
      }
      if (completionTimerRef.current) {
        window.clearTimeout(completionTimerRef.current);
      }
    };
  }, []);

  const completeWithDigitisedData = useCallback(async ({ audioBlob, transcript, durationMs }) => {
    const digitisedData = ENABLE_REAL_MODULE_DIGITISE_API
      ? await requestTranscribeAndDigitise({ audioBlob, transcript, moduleName, durationMs })
      : dummyDigitisedData;

    onComplete?.(digitisedData, { audioBlob, transcript, durationMs, moduleName });
  }, [dummyDigitisedData, moduleName, onComplete]);

  const handleSubmit = useCallback(({ audioBlob, transcript, durationMs }) => {
    const nextTranscript = transcript?.trim() || "Captured voice input.";
    setCapturedTranscript(nextTranscript);

    return new Promise((resolve) => {
      buttonTimerRef.current = window.setTimeout(() => {
        if (!mountedRef.current) {
          resolve();
          return;
        }
        setPhase("structuring");
        resolve();
        completionTimerRef.current = window.setTimeout(() => {
          if (!mountedRef.current) return;
          completeWithDigitisedData({ audioBlob, transcript: nextTranscript, durationMs })
            .catch((error) => {
              console.error("Module voice digitise failed", error);
            });
        }, SHINER_PROCESSING_MS);
      }, BUTTON_PROCESSING_MS);
    });
  }, [completeWithDigitisedData]);

  const hasTranscript = hasTranscriptContent(capturedTranscript);
  const isDiarized = hasDiarizedTranscript(capturedTranscript);

  return (
    <div className={styles.captureRoot}>
      {phase === "structuring" ? (
        <div className={styles.processingShell}>
          <div className={styles.processingCard}>
            <ShineBorder
              variant="rotate"
              borderWidth={1.5}
              duration={2.2}
              shineColor={["#D565EA", "#673AAC", "#1A1994"]}
              baseColor="rgba(226,226,234,0.95)" />
            <div className={styles.processingTranscript}>
              {hasTranscript ? (
                isDiarized ? (
                  <ConversationTranscript raw={capturedTranscript} />
                ) : (
                  <DictationTranscript raw={capturedTranscript} animate />
                )
              ) : (
                <p className={styles.processingPlaceholder}>Capturing your consultation…</p>
              )}
            </div>
          </div>
          <CaptionCarousel />
          <span className={styles.progressTrack} aria-hidden>
            <span className={styles.progressBar} />
          </span>
        </div>
      ) : (
        <div className={styles.recorderShell} data-dr-agent="true">
          <VoiceRecorderCore
            layout="overlay"
            variant="row"
            sectionLabel={moduleName}
            showSectionInStatus
            radiusClassName=""
            onCancel={onCancel}
            onCancelRequest={() => setConfirmOpen(true)}
            onSubmit={handleSubmit} />
        </div>
      )}

      {confirmOpen ? (
        <div className={styles.confirmLayer} data-dr-agent="true">
          <TPConfirmDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title="Close this voice consultation?"
            warning="Are you sure you want to close this voice Rx? If you close it, no data will be stored."
            primaryLabel="Keep recording"
            onPrimary={() => setConfirmOpen(false)}
            secondaryLabel="Close and discard"
            secondaryTone="destructive"
            onSecondary={() => {
              setConfirmOpen(false);
              onCancel?.();
            }} />
        </div>
      ) : null}
    </div>
  );
}
