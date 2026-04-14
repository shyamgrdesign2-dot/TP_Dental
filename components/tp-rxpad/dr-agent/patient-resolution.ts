import { getAppointmentPatient } from "@/lib/appointment-patients"
import { CONTEXT_PATIENT_ID, RX_CONTEXT_OPTIONS } from "./constants"
import type { RxContextOption } from "./types"

/**
 * Map RxPad URL `patientId` (appointments queue) to Dr. Agent mock keys used in
 * SMART_SUMMARY_BY_CONTEXT and PATIENT_DOCUMENTS.
 */
export function mapUrlPatientIdToAgentDataKey(patientId: string): string {
  if (patientId === "apt-1") return CONTEXT_PATIENT_ID
  if (patientId === "apt-6") return "apt-anjali"
  if (patientId === "apt-3") return "apt-vikram"
  if (patientId === "apt-2") return "apt-neha"
  if (patientId === "apt-4") return "apt-priya"
  if (patientId === "apt-5") return "apt-arjun"
  if (patientId === "apt-new") return "apt-zerodata"
  return patientId
}

/** Label + meta for the agent header/chip, including queue IDs not listed in RX_CONTEXT_OPTIONS. */
export function resolveRxContextOption(selectedPatientId: string): RxContextOption {
  const fromList = RX_CONTEXT_OPTIONS.find((p) => p.id === selectedPatientId)
  if (fromList) return fromList
  const ap = getAppointmentPatient(selectedPatientId)
  return {
    id: selectedPatientId,
    label: ap.name,
    meta: `${ap.genderShort}, ${ap.age}y · ${ap.patientCode}`,
    kind: "patient",
    gender: ap.genderShort,
    age: ap.age,
  }
}
