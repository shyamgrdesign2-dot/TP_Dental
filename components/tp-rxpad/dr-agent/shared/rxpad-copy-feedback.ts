import type { DentalScanApplyPayload, RxPadCopyPayload } from "@/components/tp-rxpad/rxpad-sync-context"

/** User-facing snackbar line after a Dr Agent “copy to RxPad” action. */
export function buildRxPadCopySnackbarMessage(
  p: RxPadCopyPayload & { dentalScanApply?: DentalScanApplyPayload },
): string {
  if (p.dentalScanApply) {
    const teeth = p.dentalScanApply.teeth
    const n = Array.isArray(teeth) ? teeth.length : 0
    const hasClinical =
      (Array.isArray(p.symptoms) && p.symptoms.length > 0)
      || (Array.isArray(p.medications) && p.medications.length > 0)
      || (Array.isArray(p.labInvestigations) && p.labInvestigations.length > 0)
    if (hasClinical && p.sourceDateLabel?.toLowerCase().includes("voice")) {
      return n > 1
        ? `Voice capture copied — RxPad plus ${n} teeth`
        : "Voice capture copied — RxPad plus dental examination"
    }
    return n > 1 ? `Dental examination · ${n} teeth copied to RxPad` : "Dental examination copied to RxPad"
  }

  const hasSymptoms = Array.isArray(p.symptoms) && p.symptoms.length > 0
  const hasMeds = Array.isArray(p.medications) && p.medications.length > 0
  const hasLabs = Array.isArray(p.labInvestigations) && p.labInvestigations.length > 0
  const hasExam = Array.isArray(p.examinations) && p.examinations.length > 0
  const hasDx = Array.isArray(p.diagnoses) && p.diagnoses.length > 0
  const hasAdvice = Boolean(p.advice?.trim())
  const hasFu = Boolean(p.followUp?.trim())
  const hasNotes = Boolean(p.additionalNotes?.trim())

  const voiceStyleBlocks = [hasSymptoms, hasMeds, hasLabs].filter(Boolean).length
  if (voiceStyleBlocks >= 2 || (hasSymptoms && hasMeds && hasLabs)) {
    return p.sourceDateLabel?.toLowerCase().includes("voice")
      ? "Voice capture copied to RxPad"
      : "Clinical capture copied to RxPad"
  }

  if (hasSymptoms && !hasMeds && !hasLabs && !hasExam && !hasDx && !hasAdvice && !hasFu) {
    return "Symptoms copied to RxPad"
  }
  if (hasMeds && !hasSymptoms && !hasLabs && !hasExam && !hasDx && !hasAdvice && !hasFu) {
    return "Medications copied to RxPad"
  }
  if (hasLabs && !hasSymptoms && !hasMeds && !hasExam && !hasDx && !hasAdvice && !hasFu) {
    return "Lab investigations copied to RxPad"
  }
  if (hasExam && !hasSymptoms && !hasMeds && !hasLabs && !hasDx) {
    return "Examination copied to RxPad"
  }
  if (hasDx && !hasSymptoms && !hasMeds && !hasLabs && !hasExam) {
    return "Diagnosis copied to RxPad"
  }
  if (hasAdvice && !hasSymptoms && !hasMeds && !hasLabs) {
    return "Advice copied to RxPad"
  }
  if (hasFu && !hasSymptoms && !hasMeds && !hasLabs) {
    return "Follow-up copied to RxPad"
  }
  if (hasNotes && voiceStyleBlocks === 0 && !hasExam && !hasDx) {
    return "Clinical notes copied to RxPad"
  }

  const labels: string[] = []
  if (hasSymptoms) labels.push("Symptoms")
  if (hasMeds) labels.push("Medications")
  if (hasLabs) labels.push("Labs")
  if (hasExam) labels.push("Examination")
  if (hasDx) labels.push("Diagnosis")
  if (hasAdvice) labels.push("Advice")
  if (hasFu) labels.push("Follow-up")
  if (hasNotes) labels.push("Notes")

  if (labels.length === 1) return `${labels[0]} copied to RxPad`
  if (labels.length > 1) return `${labels.join(" · ")} copied to RxPad`
  return "Copied to RxPad"
}
