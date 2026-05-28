"use client"

/**
 * plan-procedures-store — a thin localStorage bridge that publishes the
 * procedures recorded in the dental treatment plan so other screens (Past
 * Visits, Patient Detail Rx) can surface them. The treatment plan keeps its
 * state in memory; persisting here lets the "story" survive navigation and be
 * read by components that don't share the PlanProvider.
 */

export const PLAN_PROCEDURES_PREFIX = "tp.plan.procedures."
export const PLAN_PROCEDURES_UPDATED_EVENT = "tp-plan-procedures-updated"

export interface PublishedProcedure {
  id: string
  name: string
  doctor?: string
  date?: string
  status?: string
  notes?: string
  toothLabel?: string
  toothFdis?: string[]
  treatment?: string
  planName?: string
}

function key(patientId: string) {
  return `${PLAN_PROCEDURES_PREFIX}${patientId || "apt-1"}`
}

export function getPlanProcedures(patientId: string): PublishedProcedure[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(key(patientId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function savePlanProcedures(patientId: string, list: PublishedProcedure[]) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key(patientId), JSON.stringify(list))
    window.dispatchEvent(new CustomEvent(PLAN_PROCEDURES_UPDATED_EVENT, { detail: { patientId } }))
  } catch {
    // ignore quota / private mode
  }
}
