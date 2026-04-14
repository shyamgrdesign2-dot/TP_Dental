"use client"

import { useSearchParams } from "next/navigation"

/** Aligns Dr Agent dental apply with `ExaminationTab` / `DentalCanvas` (`?patientId=`). */
export function useChartLinkedPatientId(fallback: string): string {
  const sp = useSearchParams()
  return sp.get("patientId")?.trim() || fallback
}
