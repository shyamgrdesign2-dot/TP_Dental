"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

export interface RxPadMedicationSeed {
  medicine: string
  unitPerDose: string
  frequency: string
  when: string
  duration: string
  note: string
}

export interface DentalScanApplyPayload {
  patientId: string
  teeth: unknown[]
  focusFdi?: string
  /** When true (default), RxPad examination returns to full dentition + full-mouth scope after apply */
  openFullDentition?: boolean
  /** FDI strings to pulse-highlight on the arch after apply */
  highlightFdis?: string[]
  /** Align Adult / Pediatric / Mixed tab with chart patient */
  patientTypeHint?: "adult" | "pediatric" | "mixed"
}

export interface RxPadCopyPayload {
  sourceDateLabel: string
  targetSection?:
    | "rxpad"
    | "vitals"
    | "history"
    | "ophthal"
    | "gynec"
    | "obstetric"
    | "vaccine"
    | "growth"
    | "labResults"
    | "medicalRecords"
    | "followUp"
  symptoms?: string[]
  examinations?: string[]
  diagnoses?: string[]
  medications?: RxPadMedicationSeed[]
  advice?: string
  followUp?: string
  followUpDate?: string
  followUpNotes?: string
  labInvestigations?: string[]
  additionalNotes?: string
  /** Dr. Agent — merge structured dental scan into 3D examination (handled in DrAgentPanel, ignored by RxPad rows) */
  dentalScanApply?: DentalScanApplyPayload
}

export interface RxPadCopyRequest {
  id: number
  payload: RxPadCopyPayload
}

export interface RxPadSignal {
  id: number
  type:
    | "symptoms_changed"
    | "medications_changed"
    | "diagnosis_changed"
    | "examination_changed"
    | "advice_changed"
    | "lab_investigation_changed"
    | "section_focus"
    | "sidebar_pill_tap"
    | "ai_trigger"
  label?: string
  count?: number
  sectionId?: string
  contextPayload?: string
}

interface RxPadSyncContextValue {
  lastCopyRequest: RxPadCopyRequest | null
  lastSignal: RxPadSignal | null
  requestCopyToRxPad: (payload: RxPadCopyPayload) => void
  publishSignal: (signal: Omit<RxPadSignal, "id">) => void
  patientAllergies: string[]
  setPatientAllergies: (allergies: string[]) => void
}

const RxPadSyncContext = createContext<RxPadSyncContextValue>({
  lastCopyRequest: null,
  lastSignal: null,
  requestCopyToRxPad: () => {},
  publishSignal: () => {},
  patientAllergies: [],
  setPatientAllergies: () => {},
})

export function RxPadSyncProvider({ children }: { children: ReactNode }) {
  const [lastCopyRequest, setLastCopyRequest] = useState<RxPadCopyRequest | null>(null)
  const [lastSignal, setLastSignal] = useState<RxPadSignal | null>(null)
  const [copySequence, setCopySequence] = useState(0)
  const [signalSequence, setSignalSequence] = useState(0)
  const [patientAllergies, setPatientAllergies] = useState<string[]>([])

  const requestCopyToRxPad = useCallback((payload: RxPadCopyPayload) => {
    setCopySequence((prev) => {
      const next = prev + 1
      setLastCopyRequest({ id: next, payload })
      return next
    })
  }, [])

  const publishSignal = useCallback((signal: Omit<RxPadSignal, "id">) => {
    setSignalSequence((prev) => {
      const next = prev + 1
      setLastSignal({ id: next, ...signal })
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      lastCopyRequest,
      lastSignal,
      requestCopyToRxPad,
      publishSignal,
      patientAllergies,
      setPatientAllergies,
    }),
    [lastCopyRequest, lastSignal, requestCopyToRxPad, publishSignal, patientAllergies],
  )

  return <RxPadSyncContext.Provider value={value}>{children}</RxPadSyncContext.Provider>
}

export function useRxPadSync() {
  return useContext(RxPadSyncContext)
}
