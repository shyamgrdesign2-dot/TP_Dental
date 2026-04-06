/**
 * plan-types.ts — Type definitions for the Treatment Plan module.
 *
 * Hierarchy: TreatmentPlan → PlanService → SittingRecord / SubProcedure
 * Lifecycle:  Draft → Active (1 at a time) → In Progress → Completed
 */

// ─── Core Entities ──────────────────────────────────────────

export type PlanStatus = "draft" | "active" | "in-progress" | "completed"
export type ServiceStatus = "planned" | "in-progress" | "completed"

export interface SittingRecord {
  id: string
  date: string
  doctor: string
  notes?: string
}

export interface SubProcedure {
  id: string
  name: string
  date: string
  doctor: string
  notes?: string
}

export type SurfaceId = "occlusal" | "buccal" | "lingual" | "mesial" | "distal" | "cervical" | "root"

export const SURFACE_OPTIONS: { id: SurfaceId; label: string; abbr: string }[] = [
  { id: "occlusal", label: "Occlusal", abbr: "O" },
  { id: "buccal", label: "Buccal", abbr: "B" },
  { id: "lingual", label: "Lingual", abbr: "L" },
  { id: "mesial", label: "Mesial", abbr: "M" },
  { id: "distal", label: "Distal", abbr: "D" },
  { id: "cervical", label: "Cervical", abbr: "C" },
  { id: "root", label: "Root", abbr: "R" },
]

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
  | { type: "book-appointment"; planId: string; serviceId?: string }
  | { type: "add-sitting"; serviceId: string }
  | { type: "add-procedure"; serviceId: string }

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
  | { type: "REMOVE_SERVICE"; serviceId: string }
  | { type: "MARK_SERVICE_COMPLETED"; serviceId: string }
  | { type: "REVERT_SERVICE_TO_PROGRESS"; serviceId: string }
  | { type: "ADD_SITTING"; serviceId: string; sitting: SittingRecord }
  | { type: "ADD_SUB_PROCEDURE"; serviceId: string; procedure: SubProcedure }
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
