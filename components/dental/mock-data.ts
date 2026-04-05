/**
 * Mock dental history data keyed by patientId.
 * Used by both the RxPad Dental empty-state sidebar panel AND the full
 * Dental Module page to simulate real clinic records for the demo story.
 */

export type DentalHistoryStatus = "Active" | "Resolved" | "Monitoring"

export interface DentalHistoryEntry {
  id: string
  condition: string          // e.g. "RCT - Tooth 36"
  since: string              // e.g. "Mar 2025"
  status: DentalHistoryStatus
  medication: boolean
  notes?: string
}

export interface TreatmentPlanRow {
  id: string
  treatment: string
  teeth: string[]            // FDI codes, e.g. ["16", "26"]
  rate: number
  // count + estimate are derived (count=teeth.length, estimate=rate*count)
}

export interface ToothFinding {
  toothFdi: string
  diagnoses: string[]        // tooth-level (Crown, RCT, Missing, etc.)
  zoneFindings?: Record<string, string[]>  // zoneId -> finding types
}

/**
 * Prefilled tooth-level diagnoses per patient — applied to the 3D canvas when
 * the dental module is first opened for that patient. Demonstrates the full
 * range of primary diagnoses (Crown, RCT, Bridge, Implant, Missing, Denture).
 */
export interface InitialToothState {
  /** FDI → set of tooth-level diagnoses */
  toothDiagnoses?: Record<string, string[]>
  /** Teeth that are implants (ImplantTeeth set) */
  implantTeeth?: string[]
  /** Per-tooth surface findings: FDI → zoneId → finding types */
  findingsByTooth?: Record<string, Array<{ zoneId: string; type: string }>>
}

export const INITIAL_TOOTH_STATE: Record<string, InitialToothState> = {
  "apt-1": {
    // Shyam GR — RCT on 36, Crown on 26, Caries on 16 buccal
    toothDiagnoses: {
      "36": ["RCT"],
      "26": ["Crown"],
    },
    findingsByTooth: {
      "16": [{ zoneId: "buccal", type: "Cavity/Caries" }, { zoneId: "occlusal", type: "Staining" }],
      "36": [{ zoneId: "root", type: "Sensitivity" }],
      "41": [{ zoneId: "lingual", type: "Calculus" }],
    },
  },
  "apt-6": {
    // Anjali — Bridge spanning 24-25-26, implant on 46
    toothDiagnoses: {
      "24": ["Bridge"],
      "25": ["Bridge"],
      "26": ["Bridge"],
    },
    implantTeeth: ["46"],
    findingsByTooth: {
      "11": [{ zoneId: "occlusal", type: "Staining" }],
    },
  },
  "apt-2": {
    // Sita Menon — Missing 18, Denture partial
    toothDiagnoses: {
      "18": ["Missing"],
      "28": ["Missing"],
    },
    findingsByTooth: {
      "22": [{ zoneId: "labial", type: "Crack" }],
    },
  },
}

/** Dental history entries keyed by patientId (apt-* from appointment screen) */
export const DENTAL_HISTORY: Record<string, DentalHistoryEntry[]> = {
  "apt-new": [],   // Riya Kapoor — first-visit patient, empty state demo
  "apt-1": [
    // Shyam GR — historical entries from past visits (matches current tooth state)
    { id: "dh-s01", condition: "RCT — 36 (in progress)", since: "Feb 2025", status: "Active", medication: true, notes: "2 sittings completed, crown pending." },
    { id: "dh-s02", condition: "Crown — 26 (PFM)", since: "Nov 2024", status: "Resolved", medication: false, notes: "Placed after RCT, bite aligned." },
    { id: "dh-s03", condition: "Caries — 16 (Buccal/Occlusal)", since: "Jan 2025", status: "Monitoring", medication: false, notes: "Staining + early cavity, restoration planned." },
    { id: "dh-s04", condition: "Scaling & Polishing", since: "Jul 2024", status: "Resolved", medication: false },
  ],
  "apt-2": [
    // Sita Menon — basic historical data
    { id: "dh-st01", condition: "Extraction — 18, 28 (Wisdom teeth)", since: "Jun 2024", status: "Resolved", medication: true, notes: "Impacted molars, no complications." },
    { id: "dh-st02", condition: "Fluoride Treatment", since: "Mar 2025", status: "Resolved", medication: false },
  ],
  "apt-3": [
    // Vikram Singh — basic historical data
    { id: "dh-v01", condition: "Deep Cleaning (Scaling & Root Planing)", since: "Sep 2024", status: "Resolved", medication: false, notes: "Mild gingivitis, improved at 6-month follow-up." },
  ],
  "apt-4": [],     // Nisha Rao — no history yet
  "apt-5": [],     // Rahul Verma — no history yet
  "apt-6": [
    { id: "dh-101", condition: "Scaling & Polishing", since: "Dec 2024", status: "Resolved", medication: false },
    { id: "dh-102", condition: "Restoration — 26 (Occlusal)", since: "Jan 2025", status: "Active", medication: false, notes: "Composite filling, monitor for sensitivity." },
  ],
  "PAT-001": [],  // first patient has no history → triggers empty state
  "PAT-002": [
    {
      id: "dh-001",
      condition: "Root Canal Treatment — 36",
      since: "Mar 2025",
      status: "Resolved",
      medication: false,
      notes: "Completed over 3 sittings. Follow-up at 6 months.",
    },
    {
      id: "dh-002",
      condition: "Restoration — 16 (Occlusal)",
      since: "Jan 2025",
      status: "Active",
      medication: false,
      notes: "Composite filling, monitor for sensitivity.",
    },
    {
      id: "dh-003",
      condition: "Scaling & Polishing",
      since: "Dec 2024",
      status: "Resolved",
      medication: false,
    },
  ],
  "PAT-003": [
    {
      id: "dh-004",
      condition: "Orthodontic Treatment",
      since: "Sep 2024",
      status: "Active",
      medication: false,
      notes: "Metal braces, planned 18 months. Current month: 7.",
    },
    {
      id: "dh-005",
      condition: "Extraction — 18, 28, 38, 48",
      since: "Aug 2024",
      status: "Resolved",
      medication: true,
      notes: "Wisdom tooth removal prior to ortho treatment.",
    },
  ],
  "PAT-004": [
    {
      id: "dh-006",
      condition: "Implant — 46",
      since: "Nov 2024",
      status: "Monitoring",
      medication: false,
      notes: "Healing phase, crown placement pending.",
    },
  ],
}

/** Prefilled Treatment Plan mock data per patient */
export const TREATMENT_PLANS: Record<string, TreatmentPlanRow[]> = {
  "apt-1": [
    { id: "tp-101", treatment: "Root Canal Treatment", teeth: ["36"], rate: 8000 },
    { id: "tp-102", treatment: "Restoration (Composite Filling)", teeth: ["16", "26"], rate: 2000 },
    { id: "tp-103", treatment: "Scaling & Polishing", teeth: ["full-mouth"], rate: 1500 },
  ],
  "apt-6": [
    { id: "tp-201", treatment: "Crown (PFM)", teeth: ["26"], rate: 6000 },
  ],
  "PAT-001": [
    { id: "tp-001", treatment: "Root Canal Treatment", teeth: ["36"], rate: 8000 },
    { id: "tp-002", treatment: "Restoration (Composite Filling)", teeth: ["16", "26"], rate: 2000 },
    { id: "tp-003", treatment: "Scaling & Polishing", teeth: ["full-mouth"], rate: 1500 },
  ],
  "PAT-002": [
    { id: "tp-004", treatment: "Crown (PFM)", teeth: ["36"], rate: 6000 },
  ],
  "PAT-003": [],
  "PAT-004": [
    { id: "tp-005", treatment: "Implant Crown", teeth: ["46"], rate: 9000 },
  ],
}

/** Prefilled examination findings (for demo — when user opens dental module) */
export const INITIAL_FINDINGS: Record<string, ToothFinding[]> = {
  "PAT-001": [],
  "PAT-002": [
    {
      toothFdi: "36",
      diagnoses: ["RCT"],
      zoneFindings: { root: ["Sensitivity"] },
    },
    {
      toothFdi: "16",
      diagnoses: [],
      zoneFindings: { occlusal: ["Cavity/Caries"] },
    },
  ],
  "PAT-003": [],
  "PAT-004": [
    {
      toothFdi: "46",
      diagnoses: ["Implant"],
    },
  ],
}
