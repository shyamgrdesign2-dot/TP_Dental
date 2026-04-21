"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react"

import { cn } from "@/lib/utils"
import { useRxPadSync } from "@/components/tp-rxpad/rxpad-sync-context"
import type { DentalScanApplyPayload, RxPadCopyPayload } from "@/components/tp-rxpad/rxpad-sync-context"
import { emitDentalScanApplyNormalized } from "@/components/tp-rxpad/dental-ai/emit-dental-scan-apply"
import { DrAgentRuntimeContext } from "./DrAgentRuntimeContext"

import type {
  CannedPill,
  ChatAttachment,
  ConsultPhase,
  DoctorViewType,
  RxAgentChatMessage,
  RxTabLens,
  SmartSummaryData,
  SpecialtyTabId,
} from "./types"
import { CONTEXT_PATIENT_ID, QUICK_CLINICAL_SNAPSHOT_PROMPT, RX_CONTEXT_OPTIONS, UPLOAD_MEDICAL_RECORDS_MESSAGE } from "./constants"
import { mapUrlPatientIdToAgentDataKey, resolveRxContextOption } from "./patient-resolution"
import {
  buildQuickClinicalSnapshotInlineSuggestions,
  buildQuickClinicalSnapshotText,
  patientHasQuickClinicalSnapshotData,
} from "./shared/buildCoreNarrative"
import {
  isSituationAtGlanceAssistantMessage,
  situationAtGlanceAssistantLeadIn,
  threadAlreadyHasQuickClinicalGlance,
} from "./shared/isSituationAtGlanceMessage"
import { SMART_SUMMARY_BY_CONTEXT } from "./mock-data"
import { generatePills } from "./engines/pill-engine"
import { generateHomepagePills } from "./engines/homepage-pill-engine"
import { inferPhase } from "./engines/phase-engine"
import { classifyIntent, PILL_INTENT_MAP } from "./engines/intent-engine"
import { buildReply, buildDocumentReply, buildPomrCardData } from "./engines/reply-engine"
import { buildHomepageReply } from "./engines/homepage-reply-engine"
import { enrichVoiceStructuredWithPatientContext } from "./engines/voice-rx-engine"
import { buildRxPadCopySnackbarMessage } from "./shared/rxpad-copy-feedback"

import { TickCircle } from "iconsax-reactjs"
import { TPSnackbar } from "@/components/tp-ui"
import { AgentHeader } from "./shell/AgentHeader"
import { PatientSelector } from "./shell/PatientSelector"
import { ChatThread } from "./chat/ChatThread"
import { WelcomeScreen, type PageContext } from "./chat/WelcomeScreen"
import { PillBar } from "./chat/PillBar"
import { ChatInput } from "./chat/ChatInput"
import { AttachPanel } from "./chat/AttachPanel"
import { DocumentBottomSheet } from "./chat/DocumentBottomSheet"
import type { PatientDocument, PatientDocType } from "./types"
import { PATIENT_DOCUMENTS } from "./mock-data"

function formatUploadSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function inferUploadDocType(fileName: string): PatientDocType {
  const n = fileName.toLowerCase().replace(/_/g, " ")
  const dentalWord =
    /\b(dental|dentition|tooth|teeth|oral|opg|orthopantom|panoramic|cbct|periapical|bitewing|maxillofacial|intraoral)\b/i
  if (dentalWord.test(n)) return "dental_radiology"
  if (/\b(dental\s+record|dental\s+report|oral\s+scan)\b/i.test(n)) return "dental_radiology"
  if (/\b(report|summary|records?)\b/i.test(n) && dentalWord.test(n)) return "dental_radiology"
  if (/rx\.|prescription|medicine|medication/.test(n)) return "prescription"
  if (/xray|x-ray|\bct\b|mri|usg|ultrasound/.test(n)) return "radiology"
  return "pathology"
}

/** User-visible prompt when sending attachments; filenames show in the attachment strip. */
function buildAttachmentAnalyzePrompt(attachments: ChatAttachment[]): string {
  if (attachments.length === 0) return "Please analyze the above attached document."
  if (attachments.length === 1) {
    return attachments[0].type === "image"
      ? "Please analyze the above attached image."
      : "Please analyze the above attached document."
  }
  const allImages = attachments.every((a) => a.type === "image")
  const allDocs = attachments.every((a) => a.type === "pdf")
  if (allImages) return "Please analyze the above attached images."
  if (allDocs) return "Please analyze the above attached documents."
  return "Please analyze the above attached files."
}

// ═══════════════ HELPERS ═══════════════

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

/** Map intent category + query keywords to a context-aware typing indicator hint */
function getQueryHint(category: string, query: string): string {
  const q = query.toLowerCase()
  if (q.includes("interaction") || q.includes("drug")) return "Checking drug interactions"
  if (q.includes("lab") || q.includes("vital") || q.includes("trend")) return "Fetching lab results"
  if (q.includes("summary") || q.includes("snapshot") || q.includes("patient")) return "Looking up patient records"
  if (q.includes("intake") || q.includes("pre-visit")) return "Loading intake data"
  if (q.includes("ddx") || q.includes("diagnos")) return "Reviewing clinical guidelines"
  if (q.includes("investigation") || q.includes("test")) return "Reviewing investigation protocols"
  if (q.includes("document") || q.includes("report") || q.includes("upload")) return "Analyzing document"
  switch (category) {
    case "data_retrieval": return "Looking up patient records"
    case "clinical_decision": return "Reviewing clinical guidelines"
    case "clinical_question": return "Reviewing clinical data"
    case "comparison": return "Comparing clinical data"
    case "operational": return "Fetching clinic data"
    case "document_analysis": return "Analyzing document"
    case "action": return "Preparing response"
    default: return "Reviewing clinical data"
  }
}

function detectSpecialties(summary: SmartSummaryData): SpecialtyTabId[] {
  const tabs: SpecialtyTabId[] = ["gp"]
  if (summary.obstetricData) tabs.push("obstetric")
  if (summary.pediatricsData) tabs.push("pediatrics")
  if (summary.gynecData) tabs.push("gynec")
  if (summary.ophthalData) tabs.push("ophthal")
  return tabs
}

function buildIntroMessages(
  summary: SmartSummaryData,
  patient: typeof RX_CONTEXT_OPTIONS[0],
  _doctorViewType?: DoctorViewType,
  intakeMode: "with_intake" | "without_intake" = "with_intake",
  panelMode: "rxpad" | "homepage" = "homepage",
): RxAgentChatMessage[] {
  const hasData = summary.specialtyTags.length > 0
  const messages: RxAgentChatMessage[] = []

  // ── RxPad mode: open directly into quick snapshot when chart data exists (same card as Appointments AI icon)
  if (panelMode === "rxpad") {
    if (!patientHasQuickClinicalSnapshotData(summary)) {
      return messages
    }
    const quote = buildQuickClinicalSnapshotText(summary)
    messages.push({
      id: uid(),
      role: "assistant",
      text: situationAtGlanceAssistantLeadIn(patient.label),
      createdAt: new Date().toISOString(),
      rxOutput: { kind: "text_quote", data: { quote, source: "" } },
      feedbackGiven: null,
      suggestions: buildQuickClinicalSnapshotInlineSuggestions(summary, "full"),
    })
    return messages
  }

  // ── Homepage mode WITH specific patient: situation at a glance (not full SBAR narrative) ──
  if (panelMode === "homepage" && hasData) {
    const quote = buildQuickClinicalSnapshotText(summary)
    messages.push({
      id: uid(),
      role: "assistant",
      text: situationAtGlanceAssistantLeadIn(patient.label),
      createdAt: new Date().toISOString(),
      rxOutput: { kind: "text_quote", data: { quote, source: "" } },
      feedbackGiven: null,
      suggestions: buildQuickClinicalSnapshotInlineSuggestions(summary, "full"),
    })
    return messages
  }

  // ── Homepage mode WITHOUT patient data: no messages, WelcomeScreen handles ──
  if (panelMode === "homepage") {
    return messages
  }

  // ── Homepage / Appointment page intro flow ──
  //
  // With intake:
  //   Single message → Intake card (already includes quick snapshot via patientNarrative)
  //
  // Without intake:
  //   Single message → Quick historical snapshot (patient_narrative)
  //
  // No data:
  //   Single message → New patient text
  //
  const showIntake = intakeMode === "with_intake" && !!summary.symptomCollectorData

  if (showIntake) {
    // Intake card — includes quick snapshot inside via patientNarrative
    messages.push({
      id: uid(),
      role: "assistant",
      text: `${patient.label}'s details reported by patient via Symptom Collector:`,
      createdAt: new Date().toISOString(),
      rxOutput: {
        kind: "symptom_collector",
        data: {
          ...summary.symptomCollectorData!,
          patientNarrative: summary.patientNarrative,
        },
      },
      feedbackGiven: null,
    })
  } else if (hasData) {
    // No intake — show quick historical snapshot
    messages.push({
      id: uid(),
      role: "assistant",
      text: `Quick snapshot for ${patient.label}:`,
      createdAt: new Date().toISOString(),
      rxOutput: { kind: "patient_narrative", data: summary },
      feedbackGiven: null,
    })
  } else {
    messages.push({
      id: uid(),
      role: "assistant",
      text: `${patient.label} — new patient, first visit. No prior records yet.`,
      createdAt: new Date().toISOString(),
      feedbackGiven: null,
    })
  }

  return messages
}

// ═══════════════ STATIC PATIENT INFO STRIP ═══════════════

function StaticPatientStrip({ selectedPatientId }: { selectedPatientId: string }) {
  const selected = resolveRxContextOption(selectedPatientId)

  const genderLabel = selected?.gender === "M" ? "M" : selected?.gender === "F" ? "F" : ""
  const ageLabel = selected?.age ? `${selected.age}y` : ""
  const metaParts = [genderLabel, ageLabel].filter(Boolean).join(", ")

  return (
    <div className="sticky top-0 z-10 flex justify-center pb-1 pt-2">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/55 px-2.5 py-1 text-[14px] font-medium text-tp-slate-600 shadow-[0_8px_20px_-12px_rgba(15,23,42,0.5)] backdrop-blur-md">
        {selected?.label}
        {metaParts && <span className="text-tp-slate-400">· {metaParts}</span>}
      </span>
    </div>
  )
}

// ═══════════════ MAIN COMPONENT ═══════════════

interface DrAgentPanelProps {
  onClose: () => void
  /** Override the default patient — used when embedding in appointment page */
  initialPatientId?: string
  /** "homepage" mode enables operational queries and homepage pills */
  mode?: "rxpad" | "homepage"
  /** Active tab on homepage — used for pill generation */
  activeTab?: string
  /** Active rail item on homepage (e.g. "follow-ups", "pharmacy") */
  activeRailItem?: string
  /** Homepage patient list — mapped from queue appointments */
  homepagePatients?: import("./types").RxContextOption[]
  /** Auto-send a message when the panel opens (e.g. from tooltip CTA). Incremented counter triggers re-send. */
  autoMessage?: string
  /** Counter to re-trigger autoMessage even with same text */
  autoMessageTrigger?: number
  /** Counter to force patient context re-sync from parent */
  patientSwitchTrigger?: number
  /** Fires when an assistant reply is shown for a patient (appointment-row hover unlock) */
  onSnapshotDelivered?: (patientId: string) => void
  /** When set (e.g. Appointments page), chat threads survive panel close — parent owns the map */
  persistedMessagesByPatient?: Record<string, RxAgentChatMessage[]>
  onPersistedMessagesChange?: Dispatch<SetStateAction<Record<string, RxAgentChatMessage[]>>>
  /** Patient id for merging dental AI scan into the 3D chart (usually URL `patientId`, default apt-1) */
  dentalChartPatientId?: string
}

const HOMEPAGE_COMMON_ID = "__homepage_common__"

export function DrAgentPanel({
  onClose,
  initialPatientId,
  mode = "rxpad",
  activeTab,
  activeRailItem,
  homepagePatients,
  autoMessage,
  autoMessageTrigger,
  patientSwitchTrigger,
  onSnapshotDelivered,
  persistedMessagesByPatient,
  onPersistedMessagesChange,
  dentalChartPatientId,
}: DrAgentPanelProps) {
  // ── Patient Context ──
  // In homepage mode with no patient, use a special common ID for operational context
  const effectiveDefaultId = (mode === "homepage" && !initialPatientId) ? HOMEPAGE_COMMON_ID : (initialPatientId ?? CONTEXT_PATIENT_ID)
  const [selectedPatientId, setSelectedPatientId] = useState(effectiveDefaultId)

  // Sync when initialPatientId changes from parent (appointment page)
  useEffect(() => {
    if (mode === "homepage" && !initialPatientId) {
      if (selectedPatientId !== HOMEPAGE_COMMON_ID) {
        setSelectedPatientId(HOMEPAGE_COMMON_ID)
      }
    } else if (initialPatientId) {
      setSelectedPatientId(initialPatientId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPatientId, mode, patientSwitchTrigger])

  // ── Per-Patient State (keyed by patient ID; lifted to parent when onPersistedMessagesChange is set) ──
  const [internalMessagesByPatient, setInternalMessagesByPatient] = useState<Record<string, RxAgentChatMessage[]>>({})
  const isMessagesPersisted = onPersistedMessagesChange != null
  const messagesByPatient = isMessagesPersisted ? (persistedMessagesByPatient ?? {}) : internalMessagesByPatient
  const setMessagesByPatient = useCallback(
    (u: SetStateAction<Record<string, RxAgentChatMessage[]>>) => {
      if (onPersistedMessagesChange) {
        onPersistedMessagesChange(u)
      } else {
        setInternalMessagesByPatient(u)
      }
    },
    [onPersistedMessagesChange],
  )
  const [phaseByPatient, setPhaseByPatient] = useState<Record<string, ConsultPhase>>({})

  // ── UI State ──
  const [activeSpecialty, setActiveSpecialty] = useState<SpecialtyTabId>("gp")
  const [activeTabLens] = useState<RxTabLens>("dr-agent")
  const [doctorViewType, setDoctorViewType] = useState<DoctorViewType>("specialist_first_visit")
  const [intakeMode, setIntakeMode] = useState<"with_intake" | "without_intake">("with_intake")
  const [inputValue, setInputValue] = useState("")
  const [isPrefilled, setIsPrefilled] = useState(false)
  const [isPatientSheetOpen, setIsPatientSheetOpen] = useState(false)
  const [chipShaking, setChipShaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingHint, setTypingHint] = useState("")
  const [showAttachPanel, setShowAttachPanel] = useState(false)
  const [showDocBottomSheet, setShowDocBottomSheet] = useState(false)
  const [rxPadCopySnackbarOpen, setRxPadCopySnackbarOpen] = useState(false)
  const [rxPadCopySnackbarMessage, setRxPadCopySnackbarMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Integration ──
  const { requestCopyToRxPad, lastSignal, publishSignal, setPatientAllergies } = useRxPadSync()
  const lastSignalIdRef = useRef<number>(0)

  // ── Derived State ──
  const patient = useMemo(() => resolveRxContextOption(selectedPatientId), [selectedPatientId])

  const agentDataPatientKey = useMemo(() => mapUrlPatientIdToAgentDataKey(selectedPatientId), [selectedPatientId])

  const summary = useMemo(
    () => SMART_SUMMARY_BY_CONTEXT[agentDataPatientKey] || SMART_SUMMARY_BY_CONTEXT[CONTEXT_PATIENT_ID],
    [agentDataPatientKey],
  )

  const drAgentRuntimeValue = useMemo(
    () => ({ dentalChartPatientId: dentalChartPatientId ?? "apt-1" }),
    [dentalChartPatientId],
  )

  const messages = useMemo(
    () => messagesByPatient[selectedPatientId] || [],
    [messagesByPatient, selectedPatientId],
  )

  /** Glance intro still has inline pills under the bubble — hide context PillBar until cleared */
  const glanceInlinePillsActive = useMemo(
    () => messages.some((m) => isSituationAtGlanceAssistantMessage(m) && !!m.suggestions?.length),
    [messages],
  )

  const phase = useMemo(
    () => phaseByPatient[selectedPatientId] || "empty",
    [phaseByPatient, selectedPatientId],
  )

  const availableSpecialties = useMemo(() => detectSpecialties(summary), [summary])

  const isPatientContext = mode === "homepage" && selectedPatientId !== HOMEPAGE_COMMON_ID

  // Show doctor view selector only for patients with POMR/SBAR data (POC: Ramesh Kumar only)
  const showDoctorViewSelector = selectedPatientId === "apt-ramesh-ckd"

  // ── Pill deduplication: track which card kinds have been shown ──
  const shownCardKinds = useMemo(() => {
    const kinds = new Set<string>()
    for (const msg of messages) {
      if (msg.rxOutput?.kind) kinds.add(msg.rxOutput.kind)
    }
    return kinds
  }, [messages])

  /** Map pill labels to the card kind(s) they produce — used to hide pills for already-shown cards */
  const PILL_TO_CARD_KINDS: Record<string, string[]> = {
    "Patient's detailed summary": ["patient_summary", "sbar_overview"],
    "Patient summary": ["sbar_overview", "patient_summary"],
    "Reported by patient": ["symptom_collector"],
    "Show reported intake": ["symptom_collector"],
    "Last visit": ["last_visit"],
    "Last visit details": ["last_visit"],
    "Past visit summaries": ["last_visit"],
    "Vital trends": ["vitals_trend_bar"],
    "Suggest DDX": ["ddx"],
    "Lab overview": ["lab_panel"],
    "Lab comparison": ["lab_comparison"],
    "Obstetric summary": ["obstetric_summary"],
    "Gynec summary": ["gynec_summary"],
    "Growth & vaccines": ["pediatric_summary"],
    "Vision summary": ["ophthal_summary"],
    "Flagged lab results": ["lab_panel"],
    "Follow-up overview": ["follow_up"],
  }

  const pills = useMemo(() => {
    const rawPills = (mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID)
      ? generateHomepagePills(activeTab, activeRailItem, null)
      : isPatientContext
        ? generateHomepagePills(activeTab, activeRailItem, summary)
        : generatePills(summary, phase, activeTabLens, showDoctorViewSelector ? doctorViewType : undefined)

    // Filter out pills whose card has already been shown in the current conversation
    return rawPills.filter(pill => {
      const cardKinds = PILL_TO_CARD_KINDS[pill.label]
      if (!cardKinds) return true // Unknown mapping — always show
      return !cardKinds.some(kind => shownCardKinds.has(kind))
    })
  }, [mode, activeTab, activeRailItem, isPatientContext, summary, phase, activeTabLens, selectedPatientId, showDoctorViewSelector, doctorViewType, shownCardKinds])

  // ── Sync patient allergies to context (for RxPad medication alerts) ──
  useEffect(() => {
    setPatientAllergies(summary.allergies ?? [])
  }, [summary, setPatientAllergies])

  // ── Initialize patient messages on first visit or after intake mode change ──
  // Note: we track whether messages exist for the current patient using a ref-derived flag
  // to avoid putting messagesByPatient in the dep array (which would cause infinite loops
  // since this effect itself sets messagesByPatient).
  const hasMessagesForPatient = !!messagesByPatient[selectedPatientId]
  useEffect(() => {
    if (!hasMessagesForPatient) {
      let introMessages: RxAgentChatMessage[]
      if (mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID) {
        // Homepage — no intro messages; WelcomeScreen handles the first-time experience
        introMessages = []
      } else if (
        mode === "homepage" &&
        selectedPatientId !== HOMEPAGE_COMMON_ID &&
        autoMessage?.trim() === QUICK_CLINICAL_SNAPSHOT_PROMPT
      ) {
        // Appointment-row AI icon: parent auto-sends quick snapshot — skip intro so we don't duplicate the glance card
        return
      } else {
        introMessages = buildIntroMessages(summary, patient, showDoctorViewSelector ? doctorViewType : undefined, intakeMode, mode)
      }
      setMessagesByPatient((prev) => ({
        ...prev,
        [selectedPatientId]: introMessages,
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatientId, hasMessagesForPatient, summary, patient, mode, initialPatientId, autoMessage])

  // ── Reset specialty when patient changes ──
  useEffect(() => {
    const detected = detectSpecialties(summary)
    if (!detected.includes(activeSpecialty)) {
      setActiveSpecialty("gp")
    }
  }, [summary, activeSpecialty])

  // ── Handle Sidebar Signals ──
  useEffect(() => {
    if (!lastSignal || lastSignal.id === lastSignalIdRef.current) return
    lastSignalIdRef.current = lastSignal.id

    if (lastSignal.type === "sidebar_pill_tap" && lastSignal.label) {
      // Pre-fill input box — doctor decides whether to send
      setInputValue(lastSignal.label)
      setIsPrefilled(true)
    }

    // AI trigger from RxPad section chips or sidebar icons → pre-fill input
    if (lastSignal.type === "ai_trigger" && lastSignal.label) {
      setInputValue(lastSignal.label)
      setIsPrefilled(true)
    }

    // When symptoms are added in RxPad, advance phase to show DDX pills
    if (lastSignal.type === "symptoms_changed") {
      const currentPhase = phaseByPatient[selectedPatientId] || "empty"
      if (currentPhase === "empty") {
        setPhaseByPatient((prev) => ({ ...prev, [selectedPatientId]: "symptoms_entered" }))
      }
    }

    // When diagnosis is added, advance phase
    if (lastSignal.type === "diagnosis_changed") {
      const currentPhase = phaseByPatient[selectedPatientId] || "empty"
      if (currentPhase === "symptoms_entered") {
        setPhaseByPatient((prev) => ({ ...prev, [selectedPatientId]: "dx_accepted" }))
      }
    }

    // When medications are added, advance phase accordingly
    if (lastSignal.type === "medications_changed") {
      const currentPhase = phaseByPatient[selectedPatientId] || "empty"
      if (currentPhase === "dx_accepted") {
        setPhaseByPatient((prev) => ({ ...prev, [selectedPatientId]: "meds_written" }))
      }
    }
  }, [lastSignal])

  // ── Core: Send Message ──
  const handleSend = useCallback((text?: string) => {
    const msg = text || inputValue.trim()
    if (!msg) return

    const msgNorm = msg.trim().toLowerCase()
    const qp = QUICK_CLINICAL_SNAPSHOT_PROMPT.trim().toLowerCase()
    const isQuickSnapshotPrompt = msgNorm === qp || msgNorm.startsWith(qp)

    if (isQuickSnapshotPrompt) {
      const cur = messagesByPatient[selectedPatientId] || []
      if (threadAlreadyHasQuickClinicalGlance(cur, qp)) {
        setInputValue("")
        return
      }
      setMessagesByPatient((prev) => ({
        ...prev,
        [selectedPatientId]: (prev[selectedPatientId] || []).map((m) =>
          m.suggestions ? { ...m, suggestions: undefined } : m,
        ),
      }))
      setInputValue("")
      setTypingHint("Preparing clinical snapshot")
      setIsTyping(true)
      setTimeout(() => {
        const assistantMsg: RxAgentChatMessage = {
          id: uid(),
          role: "assistant",
          text: situationAtGlanceAssistantLeadIn(patient.label),
          createdAt: new Date().toISOString(),
          rxOutput: { kind: "text_quote", data: { quote: buildQuickClinicalSnapshotText(summary), source: "" } },
          feedbackGiven: null,
          suggestions: buildQuickClinicalSnapshotInlineSuggestions(summary, "full"),
        }
        setMessagesByPatient((prev) => ({
          ...prev,
          [selectedPatientId]: [...(prev[selectedPatientId] || []), assistantMsg],
        }))
        setIsTyping(false)
        setTypingHint("")
        onSnapshotDelivered?.(selectedPatientId)
      }, 1800 + Math.random() * 700)
      return
    }

    const uploadNorm = UPLOAD_MEDICAL_RECORDS_MESSAGE.toLowerCase()
    if (msgNorm === uploadNorm && selectedPatientId !== HOMEPAGE_COMMON_ID) {
      setMessagesByPatient((prev) => ({
        ...prev,
        [selectedPatientId]: (prev[selectedPatientId] || []).map((m) =>
          m.suggestions ? { ...m, suggestions: undefined } : m,
        ),
      }))
      setInputValue("")
      setShowDocBottomSheet(true)
      return
    }

    // Clear inline suggestions from all messages (so bottom pill bar reappears)
    setMessagesByPatient((prev) => ({
      ...prev,
      [selectedPatientId]: (prev[selectedPatientId] || []).map(m => m.suggestions ? { ...m, suggestions: undefined } : m),
    }))

    const userMsg: RxAgentChatMessage = {
      id: uid(),
      role: "user",
      text: msg,
      createdAt: new Date().toISOString(),
    }

    setMessagesByPatient((prev) => ({
      ...prev,
      [selectedPatientId]: [...(prev[selectedPatientId] || []), userMsg],
    }))
    setInputValue("")

    // Classify intent — check PILL_INTENT_MAP first (exact pill labels bypass NLU)
    const pillOverride = PILL_INTENT_MAP[msg]
    const intent = pillOverride
      ? { category: pillOverride, format: "card" as const, confidence: 1 }
      : classifyIntent(msg)

    // Set context-aware typing hint before showing indicator
    setTypingHint(getQueryHint(intent.category, msg))
    setIsTyping(true)

    // Build reply after a short delay (simulate thinking)
    setTimeout(() => {
      const currentMessages = [...(messagesByPatient[selectedPatientId] || []), userMsg]
      const currentPhase = phaseByPatient[selectedPatientId] || "empty"

      // Update phase
      const newPhase = inferPhase(currentMessages, currentPhase)
      if (newPhase !== currentPhase) {
        setPhaseByPatient((prev) => ({ ...prev, [selectedPatientId]: newPhase }))
      }

      // ── Guardrails + Routing ──
      const isClinicOverview = mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID
      const isRxPadMode = mode === "rxpad"

      // Patient-specific intents that should NOT render in Clinic Overview
      const PATIENT_SPECIFIC_INTENTS: Set<string> = new Set([
        "data_retrieval", "clinical_decision", "comparison", "document_analysis",
      ])
      // Patient-specific keywords in the message
      const nl = msg.toLowerCase()
      const isPatientSpecificQuery = nl.includes("timeline") || nl.includes("last visit") || nl.includes("patient summary")
        || nl.includes("snapshot") || nl.includes("lab") || nl.includes("vital")
        || nl.includes("medication") || nl.includes("obstetric summary") || nl.includes("gynec summary")
        || nl.includes("growth") || nl.includes("vision") || nl.includes("intake")

      // Operational (clinic-overview) keywords
      const isOperationalQuery = intent.category === "operational"

      let reply: import("./types").ReplyResult

      // Extract patient name from message for search
      const extractPatientQuery = (text: string): string => {
        const patterns = [
          /(?:details?\s+(?:about|of|for)\s+)(.+)/i,
          /(?:search|find|look\s*up|show)\s+(?:patient\s+)?(.+)/i,
          /(?:patient\s+named?\s+)(.+)/i,
          /(?:who\s+is\s+)(.+)/i,
        ]
        for (const p of patterns) {
          const m = text.match(p)
          if (m) return m[1].trim().replace(/[?.!]+$/, "")
        }
        return ""
      }

      // Check if message mentions a patient name (fuzzy match against known patients)
      const allPatients = RX_CONTEXT_OPTIONS.filter(o => o.kind === "patient")
      let nameQuery = extractPatientQuery(msg)
      // If no pattern matched, check if the raw input matches a known patient name
      if (!nameQuery) {
        const directMatch = allPatients.some(
          p => p.label.toLowerCase().includes(nl) || nl.includes(p.label.toLowerCase().split(" ")[0])
        )
        if (directMatch) nameQuery = msg.trim()
      }

      if (isClinicOverview && nameQuery) {
        // ── Patient search → show search card with pre-filled query ──
        const matches = allPatients
          .filter(p => p.label.toLowerCase().includes(nameQuery.toLowerCase()))
          .map(p => ({
            patientId: p.id,
            name: p.label,
            meta: p.meta,
            hasAppointmentToday: !!p.isToday,
          }))
        reply = {
          text: matches.length > 0
            ? `Found ${matches.length} patient${matches.length > 1 ? "s" : ""} matching "${nameQuery}". Select to view details.`
            : `No patients found for "${nameQuery}". Try searching with a different name.`,
          rxOutput: {
            kind: "patient_search",
            data: { query: nameQuery, results: matches },
          },
        }
      } else if (isClinicOverview && (PATIENT_SPECIFIC_INTENTS.has(intent.category) || isPatientSpecificQuery)) {
        // ── GUARDRAIL: Patient-specific query without a name → show search card ──
        reply = {
          text: "Please search for a patient to view their clinical data.",
          rxOutput: {
            kind: "patient_search",
            data: { query: "", results: [] },
          },
        }
      } else if (isRxPadMode && isOperationalQuery) {
        // ── GUARDRAIL: Operational/clinic query inside RxPad → redirect to appointments page ──
        const patientLabel = summary.patientNarrative
          ? "this patient"
          : "the current patient"
        reply = {
          text: `You're currently inside ${patientLabel}'s consultation. Clinic-wide analytics like revenue, KPIs, and scheduling are available on the Appointments page. Switch to the Clinic Overview context to access operational data.`,
          followUpPills: [
            { id: "grd-suggest", label: "Suggest DDX", priority: 10, layer: 3, tone: "primary" as const },
            { id: "grd-labs", label: "Lab overview", priority: 12, layer: 3, tone: "primary" as const },
          ],
        }
      } else if (mode === "homepage" && isOperationalQuery) {
        // ── Normal: Operational query in Clinic Overview ──
        reply = buildHomepageReply(msg, intent)
      } else {
        // ── Normal: Patient-context reply ──
        reply = buildReply(msg, summary, newPhase, intent)
      }

      const uploadNorm = UPLOAD_MEDICAL_RECORDS_MESSAGE.toLowerCase()
      if (msg.trim().toLowerCase() === uploadNorm && selectedPatientId === HOMEPAGE_COMMON_ID) {
        reply = {
          text: "Select a patient using the floating chip at the top, then use Medical records in the composer to open the records list or upload files for analysis.",
        }
      }

      const assistantMsg: RxAgentChatMessage = {
        id: uid(),
        role: "assistant",
        text: reply.text,
        createdAt: new Date().toISOString(),
        rxOutput: reply.rxOutput,
        feedbackGiven: null,
        suggestions: reply.suggestions,
      }

      setMessagesByPatient((prev) => ({
        ...prev,
        [selectedPatientId]: [...(prev[selectedPatientId] || []), assistantMsg],
      }))
      setIsTyping(false)
      setTypingHint("")
      onSnapshotDelivered?.(selectedPatientId)
    // Delay simulates AI thinking — 2-2.5s feels natural for clinical queries
    }, 1800 + Math.random() * 700)
  }, [inputValue, selectedPatientId, summary, patient, messagesByPatient, phaseByPatient, mode, homepagePatients, onSnapshotDelivered])

  // ── Auto-message from parent (e.g. tooltip "View Detailed Summary" CTA) ──
  const handleSendRef = useRef(handleSend)
  handleSendRef.current = handleSend
  useEffect(() => {
    if (!autoMessage || !selectedPatientId) return
    const am = autoMessage.trim().toLowerCase()
    const qp = QUICK_CLINICAL_SNAPSHOT_PROMPT.trim().toLowerCase()
    if (am === qp || am.startsWith(qp)) {
      const existing = messagesByPatient[selectedPatientId] || []
      if (threadAlreadyHasQuickClinicalGlance(existing, am)) {
        return
      }
    }
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        handleSendRef.current(autoMessage)
      })
    })
    return () => cancelAnimationFrame(rafId)
  }, [autoMessage, autoMessageTrigger, selectedPatientId, messagesByPatient])

  // ── Pill Tap ──
  const handlePillTap = useCallback((pill: CannedPill) => {
    handleSend(pill.label)
  }, [handleSend])

  // ── Feedback ──
  const handleFeedback = useCallback((messageId: string, feedback: "up" | "down") => {
    setMessagesByPatient((prev) => {
      const msgs = prev[selectedPatientId] || []
      return {
        ...prev,
        [selectedPatientId]: msgs.map((m) =>
          m.id === messageId ? { ...m, feedbackGiven: feedback } : m,
        ),
      }
    })
  }, [selectedPatientId])

  // ── Patient Search Selection (homepage / patient-detail embeds only — not RxPad) ──
  const handlePatientSelect = useCallback(
    (patientId: string) => {
      if (mode === "rxpad") return
      setSelectedPatientId(patientId)
    },
    [mode],
  )

  // ── Fill to RxPad ──
  const handleCopy = useCallback((payload: unknown) => {
    if (!payload || typeof payload !== "object") return
    const p = payload as RxPadCopyPayload & { dentalScanApply?: DentalScanApplyPayload }
    let didCopy = false
    if (p.dentalScanApply && typeof window !== "undefined") {
      emitDentalScanApplyNormalized(p.dentalScanApply)
      didCopy = true
    }
    if ("sourceDateLabel" in p) {
      requestCopyToRxPad(p)
      try {
        const existing = sessionStorage.getItem("pendingRxPadCopy")
        const arr: unknown[] = existing ? JSON.parse(existing) : []
        arr.push(payload)
        sessionStorage.setItem("pendingRxPadCopy", JSON.stringify(arr))
      } catch { /* ignore storage errors */ }
      didCopy = true
    }
    if (didCopy) {
      setRxPadCopySnackbarMessage(buildRxPadCopySnackbarMessage(p))
      setRxPadCopySnackbarOpen(true)
    }
  }, [requestCopyToRxPad])

  // ── Sidebar Navigation ──
  const handleSidebarNav = useCallback((tab: string) => {
    // Publish signal first so sidebar can process it
    publishSignal({ type: "section_focus", sectionId: tab })
    // Small delay to let sidebar process the signal before closing agent panel
    setTimeout(() => {
      onClose()
    }, 50)
  }, [publishSignal, onClose])

  // ── From pill tap in chat (text-based) ──
  const handleChatPillTap = useCallback((label: string) => {
    handleSend(label)
  }, [handleSend])

  // ── Doctor View Change — directly rebuild intro messages ──
  const handleDoctorViewChange = useCallback((newType: DoctorViewType) => {
    setDoctorViewType(newType)
    // Directly rebuild intro messages instead of delete-then-recreate via useEffect
    // This avoids the intermediate empty state that could cause visual flicker
    const newIntro = buildIntroMessages(summary, patient, showDoctorViewSelector ? newType : undefined, intakeMode, mode)
    setMessagesByPatient((prev) => ({
      ...prev,
      [selectedPatientId]: newIntro,
    }))
    setIsTyping(false)
  }, [selectedPatientId, summary, patient, showDoctorViewSelector, intakeMode])

  // ── Intake Mode Change — directly rebuild intro messages ──
  const handleIntakeModeChange = useCallback((newMode: "with_intake" | "without_intake") => {
    setIntakeMode(newMode)
    // Directly rebuild intro messages instead of delete-then-recreate via useEffect
    const newIntro = buildIntroMessages(summary, patient, showDoctorViewSelector ? doctorViewType : undefined, newMode, mode)
    setMessagesByPatient((prev) => ({
      ...prev,
      [selectedPatientId]: newIntro,
    }))
    setIsTyping(false)
  }, [selectedPatientId, summary, patient, showDoctorViewSelector, doctorViewType])

  // ── Patient Change ──
  const handlePatientChange = useCallback((id: string) => {
    setSelectedPatientId(id)
    setInputValue("")
    setIsTyping(false)
  }, [])

  // ── Chip shake — triggered when locked chip in input is clicked ──
  const handleLockedChipClick = useCallback(() => {
    setChipShaking(true)
    setTimeout(() => setChipShaking(false), 600)
  }, [])

  // ── Edit message — ChatGPT-style: truncate after edited msg, re-send ──
  const handleEditMessage = useCallback((messageId: string, newText: string) => {
    setMessagesByPatient((prev) => {
      const msgs = prev[selectedPatientId] || []
      const idx = msgs.findIndex((m) => m.id === messageId)
      if (idx < 0) return prev
      // Keep messages up to (not including) the edited one
      const kept = msgs.slice(0, idx)
      return { ...prev, [selectedPatientId]: kept }
    })
    // Re-send with new text after state updates
    setTimeout(() => handleSend(newText), 50)
  }, [selectedPatientId, handleSend])

  // ── Handle attach — context-aware ──
  // Homepage (Clinic Overview, no patient) → open native file picker
  // Patient context → show bottom sheet with patient's documents
  const handleAttach = useCallback(() => {
    if (mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID) {
      // No patient context → trigger native file input
      fileInputRef.current?.click()
    } else {
      // Patient context → show document bottom sheet
      setShowDocBottomSheet(true)
    }
  }, [mode, selectedPatientId])

  // ── Handle sending selected documents from bottom sheet ──
  const handleSendDocuments = useCallback((docs: PatientDocument[]) => {
    setShowDocBottomSheet(false)

    const sorted = [...docs].sort((a, b) => {
      const pri = (d: PatientDocument) => (d.docType === "dental_radiology" ? 0 : 1)
      return pri(a) - pri(b)
    })
    const attachments: ChatAttachment[] = sorted.map((d) => ({
      type: /\.(jpe?g|png|webp|gif)$/i.test(d.fileName) ? "image" : "pdf",
      fileName: d.fileName,
      pageCount: d.pageCount,
    }))
    const textPrefix = buildAttachmentAnalyzePrompt(attachments)

    const userMsg: RxAgentChatMessage = {
      id: uid(),
      role: "user",
      text: textPrefix,
      createdAt: new Date().toISOString(),
      attachments,
      attachment: attachments[0],
    }

    setMessagesByPatient((prev) => ({
      ...prev,
      [selectedPatientId]: [...(prev[selectedPatientId] || []), userMsg],
    }))
    setIsTyping(true)

    const primary = sorted[0]
    const docType =
      mode === "rxpad"
        ? "dental_radiology"
        : sorted.some((d) => d.docType === "dental_radiology")
          ? "dental_radiology"
          : primary.docType === "radiology"
            ? "radiology"
            : primary.docType === "prescription"
              ? "prescription"
              : "pathology"

    setTimeout(() => {
      const reply = buildDocumentReply(docType, summary)
      const assistantMsg: RxAgentChatMessage = {
        id: uid(),
        role: "assistant",
        text:
          mode === "rxpad"
            ? reply.text
            : sorted.length === 1
              ? reply.text
              : `I've analyzed ${sorted.length} documents. Here's the structured extraction (prioritizing dental imaging when present):\n\n${reply.text}`,
        createdAt: new Date().toISOString(),
        rxOutput: reply.rxOutput,
        feedbackGiven: null,
      }

      setMessagesByPatient((prev) => ({
        ...prev,
        [selectedPatientId]: [...(prev[selectedPatientId] || []), assistantMsg],
      }))
      setIsTyping(false)
    }, 1200)
  }, [selectedPatientId, summary, mode])

  // ── Handle upload from bottom sheet or file input ──
  const handleUploadNew = useCallback(() => {
    setShowDocBottomSheet(false)
    fileInputRef.current?.click()
  }, [])

  const handleFileInputChange = useCallback(() => {
    const input = fileInputRef.current
    if (!input?.files?.length) return
    const files = Array.from(input.files)
    input.value = ""
    setShowAttachPanel(false)
    const uploadedAt = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    const docs: PatientDocument[] = files.map((file, i) => ({
      id: `local-upload-${Date.now()}-${i}`,
      fileName: file.name,
      docType: mode === "rxpad" ? "dental_radiology" : inferUploadDocType(file.name),
      uploadedAt,
      uploadedBy: "This device",
      pageCount: 1,
      size: formatUploadSize(file.size),
    }))
    handleSendDocuments(docs)
  }, [handleSendDocuments, mode])

  const handleAttachSelect = useCallback((docType: "pathology" | "radiology" | "prescription" | "dental_radiology") => {
    setShowAttachPanel(false)

    const fileNameMap: Record<string, string> = {
      pathology: "Lab_Report_Mar2026.pdf",
      radiology: "X-Ray_Chest_Mar2026.pdf",
      prescription: "Previous_Rx_Mar2026.pdf",
      dental_radiology: "OPG_Panoramic_Scan.pdf",
    }
    const pageMap: Record<string, number> = { pathology: 2, radiology: 1, prescription: 1, dental_radiology: 1 }

    const userMsg: RxAgentChatMessage = {
      id: uid(),
      role: "user",
      text: "",
      createdAt: new Date().toISOString(),
      attachment: {
        type: "pdf",
        fileName: fileNameMap[docType] ?? "Document.pdf",
        pageCount: pageMap[docType] ?? 1,
      },
    }

    setMessagesByPatient((prev) => ({
      ...prev,
      [selectedPatientId]: [...(prev[selectedPatientId] || []), userMsg],
    }))
    setIsTyping(true)

    setTimeout(() => {
      const effectiveDocType = mode === "rxpad" ? "dental_radiology" : docType
      const reply = buildDocumentReply(effectiveDocType, summary)
      const assistantMsg: RxAgentChatMessage = {
        id: uid(),
        role: "assistant",
        text: reply.text,
        createdAt: new Date().toISOString(),
        rxOutput: reply.rxOutput,
        feedbackGiven: null,
        suggestions: reply.suggestions,
      }

      setMessagesByPatient((prev) => ({
        ...prev,
        [selectedPatientId]: [...(prev[selectedPatientId] || []), assistantMsg],
      }))
      setIsTyping(false)
    }, 1200)
  }, [selectedPatientId, summary, mode])

  // ── Voice transcription → structured RX ──
  const handleVoiceTranscription = useCallback((text: string) => {
    const userMsg: RxAgentChatMessage = {
      id: uid(),
      role: "user",
      text: text.trim(),
      createdAt: new Date().toISOString(),
      isVoiceTranscript: true,
    }
    setMessagesByPatient((prev) => ({
      ...prev,
      [selectedPatientId]: [...(prev[selectedPatientId] || []), userMsg],
    }))
    setIsTyping(true)

    setTimeout(() => {
      const structured = enrichVoiceStructuredWithPatientContext(text, summary)
      const assistantMsg: RxAgentChatMessage = {
        id: uid(),
        role: "assistant",
        text: structured.leadInText ?? "",
        createdAt: new Date().toISOString(),
        rxOutput: { kind: "voice_structured_rx", data: structured },
        feedbackGiven: null,
      }

      setMessagesByPatient((prev) => ({
        ...prev,
        [selectedPatientId]: [...(prev[selectedPatientId] || []), assistantMsg],
      }))
      setIsTyping(false)
    }, 800)
  }, [selectedPatientId, summary])

  // ── Chat scroll ref ──
  const chatScrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = chatScrollRef.current
    if (!el) return
    return () => {
    }
  }, [])

  // ── Patient documents for bottom sheet ──
  const patientDocuments = useMemo(
    () => PATIENT_DOCUMENTS[agentDataPatientKey] || [],
    [agentDataPatientKey],
  )

  return (
    <DrAgentRuntimeContext.Provider value={drAgentRuntimeValue}>
    <div id="dr-agent-panel-root" className="relative flex h-full min-h-0 w-full min-w-0 flex-col bg-transparent">
      {/* ── Backdrop layers — animated AI-conic wash behind a white fill.
          Wash sits at z-0, white at z-[1]. The glass header tags use
          backdrop-filter, so the wash visibly bleeds through them only
          where the tags themselves are translucent. ── */}
      <div className="dra-gradient-wash pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-white" aria-hidden />

      {/* Hidden file input for native upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        multiple
        onChange={handleFileInputChange}
      />

      {/* ── Chat area — transparent; sits over the white + wash backdrop. ── */}
      <div
        className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden"
        style={{ background: "transparent" }}
      >
        <div ref={chatScrollRef} className="da-chat-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">

          {/* Sticky liquid-glass header — pinned at the top of the scroll area
              so chat content scrolls behind the tags (content blurs under glass). */}
          <div className="pointer-events-none sticky top-0 z-30">
            <AgentHeader
              availableSpecialties={availableSpecialties}
              activeSpecialty={activeSpecialty}
              onSpecialtyChange={setActiveSpecialty}
              onPatientChange={handlePatientChange}
              selectedPatientId={selectedPatientId}
              onClose={onClose}
              doctorViewType={doctorViewType}
              onDoctorViewChange={handleDoctorViewChange}
              showDoctorViewSelector={showDoctorViewSelector}
              intakeMode={intakeMode}
              onIntakeModeChange={handleIntakeModeChange}
            />
          </div>

          {messages.length === 0 && !isTyping ? (
            <WelcomeScreen
              context={
                mode === "homepage"
                  ? (selectedPatientId === HOMEPAGE_COMMON_ID ? "homepage" : "patient_detail")
                  : "rxpad"
              }
              patientName={selectedPatientId !== HOMEPAGE_COMMON_ID ? patient?.label : undefined}
              hasIntake={!!summary.symptomCollectorData}
              summary={selectedPatientId !== HOMEPAGE_COMMON_ID ? summary : undefined}
              onActionClick={(msg) => handleSend(msg)}
            />
          ) : (
            /* Chat messages */
            <ChatThread
              messages={messages}
              isTyping={isTyping}
              typingHint={typingHint}
              onFeedback={handleFeedback}
              onPillTap={handleChatPillTap}
              onCopy={handleCopy}
              onSidebarNav={handleSidebarNav}
              className="flex-1"
              activeSpecialty={activeSpecialty}
              patientDocuments={patientDocuments}
              onPatientSelect={mode === "rxpad" ? undefined : handlePatientSelect}
              onEditMessage={handleEditMessage}
              onOpenMedicalRecords={() => {
                setShowDocBottomSheet(true)
              }}
            />
          )}
        </div>
      </div>

      {/* ── Sticky footer: context PillBar + input (glance canned pills stay inline under that bubble only) ── */}
      <div className="sticky bottom-0 z-10 shrink-0 border-t border-tp-slate-100/80 bg-white shadow-[0_-4px_16px_rgba(15,23,42,0.04)]">
        {/* Fade-in top edge — fully masks the animated wash behind the input area for legibility */}
        <div
          className="pointer-events-none absolute -top-[16px] left-0 right-0"
          style={{
            height: 16,
            background: "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.55) 42%, transparent)",
          }}
        />
        {/* Hide context PillBar while glance inline pills are still on the thread */}
        {pills.length > 0 && messages.length > 0 && !isTyping && !glanceInlinePillsActive && (
          <div className="px-[4px] pt-[8px] pb-[6px]">
            <PillBar
              pills={pills}
              onTap={handlePillTap}
              disabled={false}
            />
          </div>
        )}
        {showAttachPanel && (
          <AttachPanel
            onSelect={handleAttachSelect}
            onClose={() => setShowAttachPanel(false)}
          />
        )}
        <ChatInput
          value={inputValue}
          onChange={(v) => { setInputValue(v); if (isPrefilled) setIsPrefilled(false) }}
          onSend={() => { setIsPrefilled(false); handleSend() }}
          onAttach={handleAttach}
          onVoiceTranscription={handleVoiceTranscription}
          disabled={isTyping}
          isPrefilled={isPrefilled}
          placeholder={selectedPatientId === HOMEPAGE_COMMON_ID ? "Ask about today's clinic..." : `Ask about ${patient.label}...`}
          patientName={selectedPatientId === HOMEPAGE_COMMON_ID ? "Clinic Overview" : (patient.label || undefined)}
          patientMeta={selectedPatientId === HOMEPAGE_COMMON_ID ? undefined : (patient.gender && patient.age ? `${patient.gender}|${patient.age}y` : undefined)}
          patientLocked={mode === "rxpad" || (mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID)}
          patientLockedMessage={
            mode === "rxpad"
              ? "Patient is fixed for this RxPad visit. Change patient from the RxPad header or Appointments."
              : "Use the floating chip above to switch context"
          }
          onPatientClick={
            mode === "rxpad" || (mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID)
              ? undefined
              : () => setIsPatientSheetOpen(true)
          }
          onLockedChipClick={handleLockedChipClick}
          isClinicContext={selectedPatientId === HOMEPAGE_COMMON_ID}
        />
      </div>

      {/* ── Document Bottom Sheet — overlays entire panel ── */}
      {showDocBottomSheet && (
        <DocumentBottomSheet
          documents={patientDocuments}
          onSendDocuments={handleSendDocuments}
          onUploadNew={handleUploadNew}
          onClose={() => setShowDocBottomSheet(false)}
          patientFirstName={patient?.label?.split(" ")[0]}
          maxSelect={12}
        />
      )}

      {/* Patient/Context selector — RxPad patient comes from the visit URL/header only */}
      {mode === "homepage" && (
        <PatientSelector
          selectedId={selectedPatientId}
          onSelect={handlePatientChange}
          showUniversalOption={mode === "homepage"}
          universalOptionId={HOMEPAGE_COMMON_ID}
          externalPatients={homepagePatients}
          isOpen={isPatientSheetOpen}
          onClose={() => setIsPatientSheetOpen(false)}
        />
      )}

      {/* Floating chip hover/active + shake animation CSS */}
      <style>{`
        .da-floating-chip { cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .da-floating-chip:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 4px 16px rgba(15,23,42,0.12), 0 0 0 1px rgba(255,255,255,0.5) inset !important;
        }
        .da-floating-chip:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 1px 4px rgba(15,23,42,0.06), 0 0 0 1px rgba(255,255,255,0.5) inset !important;
        }
        .da-floating-chip-readonly { cursor: default; }
        @keyframes daChipShake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-4px); }
          30% { transform: translateX(4px); }
          45% { transform: translateX(-3px); }
          60% { transform: translateX(3px); }
          75% { transform: translateX(-1px); }
          90% { transform: translateX(1px); }
        }
        .da-chip-shake { animation: daChipShake 0.5s ease-in-out; }
        .da-chat-scroll::-webkit-scrollbar { width: 3px; }
        .da-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .da-chat-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 3px; }
        .da-chat-scroll { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.12) transparent; }

        /* ── Rotating AI-conic wash — slow, blurred so colours bleed together
           smoothly. Sits behind the white backdrop at ~11% opacity so it only
           shows through the glass header tags. ── */
        @property --dra-wash-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .dra-gradient-wash {
          opacity: 0.11;
          background: conic-gradient(
            from var(--dra-wash-angle) at 50% 50%,
            #E38BBE 0deg,
            #B06CE0 55deg,
            #8B5CF6 115deg,
            #6B5FE0 180deg,
            #4B4AD5 235deg,
            #4FACFE 295deg,
            #E38BBE 360deg
          );
          filter: blur(90px);
          animation: draWashRotate 22s linear infinite;
          will-change: --dra-wash-angle;
        }
        @keyframes draWashRotate {
          from { --dra-wash-angle: 0deg; }
          to   { --dra-wash-angle: 360deg; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dra-gradient-wash { animation: none; }
        }
      `}</style>

      <TPSnackbar
        open={rxPadCopySnackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3200}
        onClose={(_, reason) => {
          if (reason === "clickaway") return
          setRxPadCopySnackbarOpen(false)
        }}
        message={(
          <div
            className="flex max-w-[min(400px,calc(100vw-32px))] items-center gap-2.5 rounded-[12px] px-4 py-3 text-[14px] font-medium leading-snug text-white shadow-lg"
            style={{
              background: "#171725",
              boxShadow: "0 12px 24px rgba(23,23,37,0.15)",
            }}
          >
            <TickCircle size={20} variant="Bold" className="shrink-0 text-emerald-400" aria-hidden />
            <span>{rxPadCopySnackbarMessage}</span>
          </div>
        )}
      />
    </div>
    </DrAgentRuntimeContext.Provider>
  )
}
