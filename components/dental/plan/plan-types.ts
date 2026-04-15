/**
 * plan-types.ts — Type definitions for the Treatment Plan module.
 *
 * Hierarchy: TreatmentPlan → PlanService → SittingRecord / SubProcedure
 * Lifecycle:  Draft → Active (1 at a time) → In Progress → Completed
 */

// ─── Core Entities ──────────────────────────────────────────

export type PlanStatus = "draft" | "active" | "in-progress" | "completed"
export type ServiceStatus = "planned" | "in-progress" | "completed" | "no-show" | "not-interested" | "cancelled"

export interface SittingRecord {
  id: string
  date: string
  doctor: string
  notes?: string
}

export interface AppointmentRecord {
  id: string
  date: string
  time: string
  doctor: string
  notes?: string
  /** "scheduled" by default; "cancelled" marks a cancelled appointment and keeps the reason for history */
  status?: "scheduled" | "cancelled"
  cancellationReason?: string
  patientCategory?: string
  caseType?: string
}

/** Saved when a visit is ended from RxPad with plan + treatment context in the URL. */
export type ConsultationSource = "appointment" | "treatment-row"

export interface ConsultationRecord {
  id: string
  endedAt: string
  source: ConsultationSource
  appointmentId?: string
  summaryText: string
}

export interface SubProcedure {
  id: string
  name: string
  date: string
  doctor: string
  notes?: string
  status?: ProcedureStatus
}

export type ProcedureStatus = "not-started" | "in-progress" | "completed" | "no-show" | "not-interested"

export type SurfaceId = "whole" | "occlusal" | "buccal" | "lingual" | "mesial" | "distal" | "cervical" | "root"

export const SURFACE_OPTIONS: { id: SurfaceId; label: string; abbr: string }[] = [
  { id: "whole", label: "Whole Tooth", abbr: "WT" },
  { id: "occlusal", label: "Occlusal", abbr: "O" },
  { id: "buccal", label: "Buccal", abbr: "B" },
  { id: "lingual", label: "Lingual", abbr: "L" },
  { id: "mesial", label: "Mesial", abbr: "M" },
  { id: "distal", label: "Distal", abbr: "D" },
  { id: "cervical", label: "Cervical", abbr: "C" },
  { id: "root", label: "Root", abbr: "R" },
]

export const SURFACE_COLORS: Record<SurfaceId, string> = {
  whole: "#34d399",
  occlusal: "#14b8a6",
  buccal: "#f97316",
  lingual: "#8b5cf6",
  mesial: "#eab308",
  distal: "#2563eb",
  cervical: "#ec4899",
  root: "#65a30d",
}

export const SURFACE_ABBR: Record<SurfaceId, string> = Object.fromEntries(
  SURFACE_OPTIONS.map((option) => [option.id, option.abbr]),
) as Record<SurfaceId, string>

export function getPlanSurfaceLabel(surfaceId: SurfaceId | string): string {
  const opt = SURFACE_OPTIONS.find((o) => o.id === surfaceId)
  if (opt)
    return opt.label
  if (typeof surfaceId === "string" && surfaceId.length > 0)
    return surfaceId.charAt(0).toUpperCase() + surfaceId.slice(1)
  return String(surfaceId)
}

const WHOLE_TOOTH_TREATMENTS = new Set([
  "Root Canal Treatment",
  "Pulp Capping",
  "Crown (PFM)",
  "Crown (Zirconia)",
  "Crown (All-Ceramic)",
  "Bridge (per unit)",
  "Complete Denture",
  "Partial Denture",
  "Veneers",
  "Extraction",
  "Surgical Extraction",
  "Wisdom Tooth Removal",
  "Implant (Single)",
  "Implant Crown",
  "Bone Grafting",
  "Apicoectomy",
  "Fluoride Application",
])

export function getDefaultPlanSurfaces(treatmentName: string): SurfaceId[] {
  return WHOLE_TOOTH_TREATMENTS.has(treatmentName) ? ["whole"] : []
}

export interface PlanService {
  id: string
  planId: string
  treatment: string         // from TREATMENT_CATALOG
  toothFdi: string          // single FDI number or "full-mouth"
  toothLabel: string        // e.g. "Upper Right Third Molar"
  surfaces: SurfaceId[]     // affected surfaces
  rate: number
  discount: number          // flat ₹ discount
  amount: number            // rate − discount
  status: ServiceStatus
  sittings: SittingRecord[]
  procedures: SubProcedure[]
  appointments?: AppointmentRecord[]
  /** Consultation / Rx summaries linked from this treatment (or from an appointment under it). */
  consultations?: ConsultationRecord[]
  /** Planned surgery / procedure date for this line (from plan builder) */
  procedureDate?: string
  startedAt?: string
  completedAt?: string
  notes?: string
}

export interface TreatmentPlan {
  id: string
  name: string
  patientId: string
  createdAt: string
  updatedAt: string
  status: PlanStatus
  services: PlanService[]
  notes?: string
}

// ─── Drawer State ───────────────────────────────────────────

export type DrawerState =
  | { type: "closed" }
  | { type: "add-plan" }
  | { type: "edit-plan"; planId: string }
  | { type: "bill-preview"; planId: string; serviceId?: string }
  | { type: "rx-preview"; planId: string; serviceId?: string }
  | { type: "book-appointment"; planId: string; serviceId?: string; appointmentId?: string }
  | { type: "add-sitting"; serviceId: string }
  | { type: "edit-sitting"; serviceId: string; sittingId: string }
  | { type: "add-procedure"; serviceId: string }
  | { type: "edit-procedure"; serviceId: string; procedureId: string }

// ─── Reducer Actions ────────────────────────────────────────

export type PlanAction =
  | { type: "ADD_PLAN"; plan: TreatmentPlan }
  | { type: "UPDATE_PLAN"; planId: string; patch: Partial<TreatmentPlan> }
  | { type: "DELETE_PLAN"; planId: string }
  | { type: "DUPLICATE_PLAN"; planId: string }
  | { type: "ACTIVATE_PLAN"; planId: string }
  | { type: "START_TREATMENT"; planId: string }
  | { type: "REVERT_PLAN_TO_ESTIMATES"; planId: string }
  | { type: "MARK_PLAN_COMPLETED"; planId: string }
  | { type: "REVERT_PLAN_TO_PROGRESS"; planId: string }
  | { type: "ADD_SERVICE"; planId: string; service: PlanService }
  | { type: "UPDATE_SERVICE"; serviceId: string; patch: Partial<PlanService> }
  | { type: "APPEND_SERVICE_CONSULTATION"; serviceId: string; consultation: ConsultationRecord }
  | { type: "REMOVE_SERVICE"; serviceId: string }
  | { type: "MARK_SERVICE_COMPLETED"; serviceId: string }
  | { type: "REVERT_SERVICE_TO_PROGRESS"; serviceId: string }
  | { type: "ADD_SITTING"; serviceId: string; sitting: SittingRecord }
  | { type: "UPDATE_SITTING"; serviceId: string; sittingId: string; patch: Partial<SittingRecord> }
  | { type: "REMOVE_SITTING"; serviceId: string; sittingId: string }
  | { type: "ADD_SUB_PROCEDURE"; serviceId: string; procedure: SubProcedure }
  | { type: "UPDATE_SUB_PROCEDURE"; serviceId: string; procedureId: string; patch: Partial<SubProcedure> }
  | { type: "REMOVE_SUB_PROCEDURE"; serviceId: string; procedureId: string }
  | { type: "ADD_APPOINTMENT"; serviceId: string; appointment: AppointmentRecord }
  | { type: "UPDATE_APPOINTMENT"; serviceId: string; appointmentId: string; patch: Partial<AppointmentRecord> }
  | { type: "REMOVE_APPOINTMENT"; serviceId: string; appointmentId: string }
  | { type: "SET_DRAWER"; drawer: DrawerState }

// ─── Tab IDs ────────────────────────────────────────────────

export type PlanTabId = "estimates" | "progress" | "completed"

// ─── Plan State (for context) ───────────────────────────────

export interface PlanState {
  plans: TreatmentPlan[]
  drawer: DrawerState
}

// ─── Helper: generate unique ID ─────────────────────────────

let _counter = 0
export function genId(prefix = "id"): string {
  _counter += 1
  return `${prefix}-${Date.now()}-${_counter}`
}
