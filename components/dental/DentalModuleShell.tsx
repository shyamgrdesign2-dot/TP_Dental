"use client"

/**
 * DentalModuleShell — full-screen dental module with top nav + 2-tab secondary sidebar.
 * Tabs:
 *   1. Examination / Findings → 3D dental canvas (ported from 3D_Dental_R3F)
 *   2. Treatment Plan → PRD-spec table with auto-calculation
 */

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Health, ClipboardText } from "iconsax-reactjs"
import { ExaminationTab } from "./examination/ExaminationTab"
import { TreatmentPlanTab } from "./plan/TreatmentPlanTab"

type DentalTabId = "examination" | "plan"

const PATIENT_NAMES: Record<string, string> = {
  "apt-1": "Shyam GR, 35M",
  "apt-2": "Sita Menon, 30F",
  "apt-3": "Vikram Singh, 42M",
  "apt-4": "Nisha Rao, 28F",
  "apt-5": "Rahul Verma, 15M",
  "apt-6": "Anjali Patel, 28F",
  // Legacy PAT-* IDs retained for direct testing
  "PAT-001": "Aarav Mehta, 34M",
  "PAT-002": "Priya Sharma, 28F",
  "PAT-003": "Rahul Verma, 15M",
  "PAT-004": "Sneha Reddy, 42F",
}

export function DentalModuleShell() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams?.get("patientId") ?? "PAT-001"
  void PATIENT_NAMES
  const [activeTab, setActiveTab] = useState<DentalTabId>("examination")

  const handleBack = () => {
    router.push(`/rxpad?patientId=${patientId}`)
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-tp-slate-50">
      {/* Top nav — RxPad-style fixed header with 80px back button + Done CTA */}
      <header className="relative flex h-[62px] w-full shrink-0 items-center bg-white">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go back"
          className="relative flex h-[62px] w-[80px] shrink-0 items-center justify-center px-[15px] py-[20px] bg-white transition-colors hover:bg-tp-slate-50"
        >
          <div aria-hidden="true" className="absolute inset-[0_-0.25px_0_0] border-r-[0.5px] border-solid border-[#f1f1f5] pointer-events-none" />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#454551" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.7 }}>
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="flex flex-col gap-[2px] pl-[20px]">
          <h1 className="font-sans text-[14px] font-semibold leading-[20px] text-tp-slate-900">
            Dental Module
          </h1>
          <p className="font-sans text-[11px] leading-[14px] text-tp-slate-500">
            Tooth-wise examination &amp; treatment planning
          </p>
        </div>

        <div className="ml-auto pr-[20px]">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex h-[36px] items-center rounded-[8px] bg-tp-blue-500 px-[18px] font-sans text-[13px] font-semibold text-white transition-colors hover:bg-tp-blue-600"
          >
            Done
          </button>
        </div>
      </header>

      {/* Body: 2-tab sidebar + tab content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left rail: 2 tabs */}
        <nav
          aria-label="Dental module tabs"
          className="flex w-[80px] shrink-0 flex-col items-center gap-[6px] py-[16px]"
          style={{
            backgroundImage:
              "radial-gradient(120% 120% at 20% 0%, rgb(75,74,213) 0%, rgb(49,48,151) 50%, rgb(22,21,88) 100%)",
          }}
        >
          <TabButton
            icon={<Health size={20} variant={activeTab === "examination" ? "Bulk" : "Linear"} color={activeTab === "examination" ? "var(--tp-blue-500)" : "#FFFFFF"} strokeWidth={1.5} />}
            label="Exam"
            active={activeTab === "examination"}
            onClick={() => setActiveTab("examination")}
          />
          <TabButton
            icon={<ClipboardText size={20} variant={activeTab === "plan" ? "Bulk" : "Linear"} color={activeTab === "plan" ? "var(--tp-blue-500)" : "#FFFFFF"} strokeWidth={1.5} />}
            label="Plan"
            active={activeTab === "plan"}
            onClick={() => setActiveTab("plan")}
          />
        </nav>

        {/* Tab content */}
        <main className="flex-1 min-h-0 min-w-0 overflow-hidden">
          {activeTab === "examination" ? (
            <ExaminationTab patientId={patientId} />
          ) : (
            <TreatmentPlanTab patientId={patientId} />
          )}
        </main>
      </div>
    </div>
  )
}

function TabButton({
  icon, label, active, onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="relative flex w-full flex-col items-center gap-[4px] px-[8px] py-[10px] transition-colors"
    >
      <div
        className={`flex h-[32px] w-[32px] items-center justify-center rounded-[10px] transition-colors ${
          active ? "bg-white" : "bg-white/10"
        }`}
      >
        {icon}
      </div>
      <span className={`font-sans text-[10px] font-medium leading-[14px] ${active ? "text-white" : "text-white/75"}`}>
        {label}
      </span>
      {active && (
        <span className="pointer-events-none absolute right-[-2px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[8px] border-y-transparent border-r-[8px] border-r-tp-slate-50" />
      )}
    </button>
  )
}
