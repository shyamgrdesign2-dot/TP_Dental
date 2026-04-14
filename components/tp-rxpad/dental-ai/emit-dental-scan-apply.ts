import { getAppointmentPatient } from "@/lib/appointment-patients"
import type { DentalScanApplyPayload } from "@/components/tp-rxpad/rxpad-sync-context"
import { DENTAL_AI_SCAN_APPLY_EVENT } from "./dental-ai-events"

/**
 * Opens the dental examination tab and merges AI/Agent tooth rows into the 3D chart.
 * Apply is scheduled on the next macrotask so `tp:open-dental-exam` can switch tabs first
 * (avoids missing the listener if the chart was not yet committed for the active view).
 */
export function emitDentalScanApplyNormalized(raw: DentalScanApplyPayload): void {
  if (typeof window === "undefined") return
  const ap = getAppointmentPatient(raw.patientId)
  const inferredDentition: "adult" | "pediatric" = ap.age < 12 ? "pediatric" : "adult"
  const teethArr = Array.isArray(raw.teeth) ? raw.teeth : []
  const highlightFromTeeth = teethArr
    .map((t) =>
      t && typeof t === "object" && "fdi" in t && (t as { fdi?: string | number }).fdi != null
        ? String((t as { fdi: string | number }).fdi)
        : null,
    )
    .filter((x): x is string => Boolean(x))

  const detail: DentalScanApplyPayload = {
    ...raw,
    openFullDentition: raw.openFullDentition !== false,
    patientTypeHint: raw.patientTypeHint ?? inferredDentition,
    highlightFdis: raw.highlightFdis?.length ? raw.highlightFdis : highlightFromTeeth,
  }

  window.dispatchEvent(new CustomEvent("tp:open-dental-exam"))
  /* Let RxPad switch to the dental carousel panel before the chart listener runs. */
  window.setTimeout(() => {
    window.dispatchEvent(
      new CustomEvent(DENTAL_AI_SCAN_APPLY_EVENT, {
        detail,
      }),
    )
  }, 48)
}
