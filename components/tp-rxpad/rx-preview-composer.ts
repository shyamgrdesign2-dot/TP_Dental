"use client"

import {
  loadDentalPreviewSnapshot,
  loadRxPreviewSnapshot,
  type RxPreviewComposedSnapshot,
  type RxPreviewSnapshot,
} from "@/components/tp-rxpad/rx-preview-store"

export function getComposedRxPreviewSnapshot(patientId: string): RxPreviewComposedSnapshot | null {
  const base = loadRxPreviewSnapshot(patientId)
  const dental = loadDentalPreviewSnapshot(patientId)

  if (!base && !dental) {
    return null
  }

  const fallback: RxPreviewSnapshot = {
    patientId,
    updatedAt: new Date().toISOString(),
    symptoms: [],
    examinations: [],
    diagnoses: [],
    labInvestigations: [],
    medications: [],
    advice: [],
  }

  const snapshot = base ?? fallback
  return {
    ...snapshot,
    vitals: [],
    labResults: [],
    dentalUpdatedAt: dental?.updatedAt,
    dentalExamination: dental?.sections ?? [],
  }
}

