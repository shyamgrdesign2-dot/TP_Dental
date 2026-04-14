"use client"

import React from "react"
import { DocumentUpload } from "iconsax-reactjs"
import { cn } from "@/lib/utils"
import { CardShell } from "../CardShell"

export interface MedicalRecordsUploadCtaCardData {
  patientLabel: string
}

interface MedicalRecordsUploadCtaCardProps {
  data: MedicalRecordsUploadCtaCardData
  onAddRecords: () => void
}

export function MedicalRecordsUploadCtaCard({ data, onAddRecords }: MedicalRecordsUploadCtaCardProps) {
  return (
    <CardShell
      icon={
        <DocumentUpload size={15} variant="Bulk" className="text-[var(--tp-blue-500,#4B4AD5)]" aria-hidden />
      }
      title="Medical records"
      collapsible={false}
    >
      <button
        type="button"
        onClick={onAddRecords}
        aria-label={`Open medical records for ${data.patientLabel}`}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-[10px] px-2 py-2.5 text-left transition-colors",
          "text-[14px] font-semibold text-tp-slate-800 hover:bg-tp-slate-50/90",
        )}
      >
        <DocumentUpload size={20} variant="Linear" color="var(--tp-blue-600, #4B4AD5)" aria-hidden />
        Medical records
      </button>
    </CardShell>
  )
}
