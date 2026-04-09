export interface RxPreviewLine {
  title: string
  metaParts: string[]
}

export interface RxPreviewSnapshot {
  patientId: string
  updatedAt: string
  symptoms: RxPreviewLine[]
  examinations: RxPreviewLine[]
  diagnoses: RxPreviewLine[]
  labInvestigations: RxPreviewLine[]
  medications: RxPreviewLine[]
  advice: RxPreviewLine[]
  followUp?: string
  additionalNotes?: string
}

export interface RxPreviewVitalRow {
  label: string
  unit: string
  value: string
}

export interface RxPreviewLabRow {
  label: string
  unit: string
  value: string
  abnormal?: boolean
}

export interface RxPreviewDentalSection {
  toothLabel: string
  treatmentHistory: RxPreviewLine[]
  findings: RxPreviewLine[]
  procedures: RxPreviewLine[]
  overallToothNote?: string
}

export interface RxPreviewDentalSnapshot {
  patientId: string
  updatedAt: string
  sections: RxPreviewDentalSection[]
}

export interface RxPreviewComposedSnapshot extends RxPreviewSnapshot {
  vitals: RxPreviewVitalRow[]
  labResults: RxPreviewLabRow[]
  dentalUpdatedAt?: string
  dentalExamination: RxPreviewDentalSection[]
}

const STORAGE_PREFIX = "tp-rx-preview:"
const DENTAL_STORAGE_PREFIX = "tp-rx-preview-dental:"

function getStorageKey(patientId: string) {
  return `${STORAGE_PREFIX}${patientId || "apt-1"}`
}

function getDentalStorageKey(patientId: string) {
  return `${DENTAL_STORAGE_PREFIX}${patientId || "apt-1"}`
}

export function saveRxPreviewSnapshot(patientId: string, snapshot: RxPreviewSnapshot) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(getStorageKey(patientId), JSON.stringify(snapshot))
}

export function loadRxPreviewSnapshot(patientId: string): RxPreviewSnapshot | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(getStorageKey(patientId))
  if (!raw) return null
  try {
    return JSON.parse(raw) as RxPreviewSnapshot
  } catch {
    return null
  }
}

export function saveDentalPreviewSnapshot(patientId: string, snapshot: RxPreviewDentalSnapshot) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(getDentalStorageKey(patientId), JSON.stringify(snapshot))
}

export function loadDentalPreviewSnapshot(patientId: string): RxPreviewDentalSnapshot | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(getDentalStorageKey(patientId))
  if (!raw) return null
  try {
    return JSON.parse(raw) as RxPreviewDentalSnapshot
  } catch {
    return null
  }
}

