/**
 * booked-appointments-store — localStorage-backed store for appointments
 * that are booked from the Dental Treatment Plan (BookAppointmentDrawer).
 *
 * The Dr. Agent appointments page (DrAgentPage) reads from this store on
 * mount and listens for the "tp-booked-appointment" window event so that
 * a freshly-booked appointment shows up on its calendar on the chosen date.
 *
 * The plan drawer still dispatches ADD_APPOINTMENT to plan-context for the
 * per-service appointment list. This store is the bridge so both views
 * stay in sync across page navigations.
 */

const STORAGE_KEY = "tp.booked-appointments"
export const BOOKED_APPT_EVENT = "tp-booked-appointment"

export interface BookedAppointment {
  id: string
  patientId: string
  serviceId: string
  serviceName?: string
  toothLabel?: string
  /** ISO yyyy-mm-dd */
  date: string
  /** e.g. "10:00 AM" */
  time: string
  doctor: string
  notes?: string
  createdAt: string
}

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

export function loadBookedAppointments(): BookedAppointment[] {
  if (!canUseStorage()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as BookedAppointment[]) : []
  } catch {
    return []
  }
}

function persist(list: BookedAppointment[]): void {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    /* quota / serialization errors are non-fatal */
  }
}

function notify(detail: { action: "add" | "update" | "remove"; appointment?: BookedAppointment; id?: string }): void {
  if (typeof window === "undefined") return
  try {
    window.dispatchEvent(new CustomEvent(BOOKED_APPT_EVENT, { detail }))
  } catch {
    /* ignore */
  }
}

export function saveBookedAppointment(appt: BookedAppointment): void {
  const current = loadBookedAppointments()
  const next = [...current.filter((a) => a.id !== appt.id), appt]
  persist(next)
  notify({ action: "add", appointment: appt })
}

export function updateBookedAppointment(id: string, patch: Partial<BookedAppointment>): void {
  const current = loadBookedAppointments()
  let updated: BookedAppointment | undefined
  const next = current.map((a) => {
    if (a.id !== id) return a
    updated = { ...a, ...patch }
    return updated
  })
  persist(next)
  if (updated) notify({ action: "update", appointment: updated })
}

export function removeBookedAppointment(id: string): void {
  const current = loadBookedAppointments()
  const next = current.filter((a) => a.id !== id)
  persist(next)
  notify({ action: "remove", id })
}

/**
 * Compute the bucket that DrAgentPage uses to segment date filters.
 * Mirrors the inference logic in DrAgentPage so that filter chips resolve
 * correctly for freshly-booked appointments.
 */
export function computeDateKey(isoDate: string): string {
  if (!isoDate) return "today"
  const parts = isoDate.split("-").map((v) => parseInt(v, 10))
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return "today"
  const target = new Date(parts[0], parts[1] - 1, parts[2])
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000)
  if (diff === 0) return "today"
  if (diff === -1) return "yesterday"
  if (diff > 0) return diff <= 92 ? "next-3-months" : "next-4-months"
  return Math.abs(diff) <= 92 ? "past-3-months" : "past-4-months"
}

/**
 * Format an ISO date as "9th Oct 2024" to match the DrAgentPage row style.
 */
export function formatHumanDate(isoDate: string): string {
  if (!isoDate) return ""
  const parts = isoDate.split("-").map((v) => parseInt(v, 10))
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return isoDate
  const date = new Date(parts[0], parts[1] - 1, parts[2])
  const day = date.getDate()
  const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th"
  const month = date.toLocaleString("en-US", { month: "short" })
  return `${day}${suffix} ${month} ${date.getFullYear()}`
}
