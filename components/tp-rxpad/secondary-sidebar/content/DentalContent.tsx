/**
 * Dental History content panel — tooth-first historical format.
 *
 * Main heading per card = tooth name.
 * Inside each card: Treatment History, Findings, Procedures, Overall Tooth Notes.
 */
"use client"

import React, { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ToothIcon } from "@/components/dental/ToothIcon"
import { DENTAL_TOOTH_HISTORY, type DentalToothHistoryEntry } from "@/components/dental/mock-data"
import { TPMedicalIcon } from "@/components/tp-ui"
import { ActionButton, SectionScrollArea, useStickyHeaderState } from "../detail-shared"
import { tpSectionCardStyle } from "../tokens"

function ToothHistorySection({
  title,
  medicalIcon,
  children,
}: {
  title: string
  medicalIcon: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="group flex items-center gap-[6px]">
        <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">
          <TPMedicalIcon name={medicalIcon} variant="bulk" size={16} color="var(--tp-violet-400)" className="block h-[16px] w-[16px]" />
        </span>
        <p className="font-sans font-semibold text-tp-slate-700 text-[14px] tracking-[0.012px] leading-[20px]">{title}</p>
      </div>
      <div className="mt-[4px] space-y-[4px]">{children}</div>
    </div>
  )
}

function renderMeta(parts: Array<string | undefined>) {
  const cleanParts = parts.filter(Boolean) as string[]
  return (
    <span className="text-tp-slate-400">
      {"("}
      {cleanParts.map((part, idx) => (
        <React.Fragment key={`${part}-${idx}`}>
          {idx > 0 ? <span className="text-tp-slate-300"> | </span> : null}
          {part}
        </React.Fragment>
      ))}
      {")"}
    </span>
  )
}

function formatHistoryDate(value: string): string {
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!isoMatch) return value
  const [, y, m, d] = isoMatch
  const dt = new Date(Number(y), Number(m) - 1, Number(d))
  if (Number.isNaN(dt.getTime())) return value
  const day = dt.getDate().toString().padStart(2, "0")
  const month = dt.toLocaleString("en-IN", { month: "short" })
  const year = dt.getFullYear().toString().slice(-2)
  return `${day} ${month}'${year}`
}

function ToothHistoryCard({ entry }: { entry: DentalToothHistoryEntry }) {
  const { headerRef, isStuck } = useStickyHeaderState()

  return (
    <div className="relative shrink-0 w-full" style={tpSectionCardStyle}>
      <div
        ref={headerRef as React.Ref<HTMLDivElement>}
        className={`group bg-tp-slate-100 shrink-0 w-full sticky top-0 z-[2] ${
          isStuck ? "rounded-tl-none rounded-tr-none" : "rounded-tl-[10px] rounded-tr-[10px]"
        }`}
      >
        <div className="flex items-center justify-between px-[10px] py-[8px] w-full">
          <p className="font-['Inter',sans-serif] font-semibold text-tp-slate-700 text-[14px] tracking-[0.012px] leading-[20px] whitespace-nowrap">
            {entry.toothCode === "full-mouth" ? "Full Mouth" : `${entry.toothLabel} (T${entry.toothCode})`}
          </p>
        </div>
      </div>

      <div className="space-y-[8px] bg-white px-[10px] py-[10px] rounded-bl-[10px] rounded-br-[10px]">
        <ToothHistorySection
          title="Treatment History"
          medicalIcon="clipboard-activity"
        >
          {entry.treatmentHistory.length > 0 ? (
            <ul className="space-y-[6px] pl-[18px]">
              {entry.treatmentHistory.map((item) => (
                <li key={item.id} className="list-disc marker:text-tp-slate-500 font-sans text-[12px] text-tp-slate-500 leading-[18px]">
                  <span className="font-medium text-tp-slate-700">{item.name}</span>
                  {" "}
                  {renderMeta([
                    item.surface,
                    formatHistoryDate(item.since),
                    item.notes,
                  ])}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-sans text-[12px] text-tp-slate-400">No treatment history documented.</p>
          )}
        </ToothHistorySection>

        <ToothHistorySection
          title="Findings"
          medicalIcon="diagnosis"
        >
          {entry.findings.length > 0 ? (
            <ul className="space-y-[4px] pl-[18px]">
              {entry.findings.map((finding) => (
                <li key={finding.id} className="list-disc marker:text-tp-slate-500 font-sans text-[12px] text-tp-slate-500 leading-[18px]">
                  <span className="font-medium text-tp-slate-700">{finding.name}</span>
                  {" "}
                  {renderMeta([
                    finding.surface,
                    formatHistoryDate(finding.since),
                    finding.notes,
                  ])}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-sans text-[12px] text-tp-slate-400">No findings added.</p>
          )}
        </ToothHistorySection>

        <ToothHistorySection
          title="Procedures"
          medicalIcon="surgical-scissors-02"
        >
          {entry.procedures.length > 0 ? (
            <ul className="space-y-[6px] pl-[18px]">
              {entry.procedures.map((procedure) => (
                <li key={procedure.id} className="list-disc marker:text-tp-slate-500 font-sans text-[12px] text-tp-slate-500 leading-[18px]">
                  <span className="font-medium text-tp-slate-700">{procedure.name}</span>
                  {" "}
                  {renderMeta([
                    procedure.surface,
                    formatHistoryDate(procedure.date),
                    procedure.status,
                    procedure.notes,
                  ])}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-sans text-[12px] text-tp-slate-400">No procedures recorded.</p>
          )}
        </ToothHistorySection>

        <ToothHistorySection
          title="Overall Tooth Notes"
          medicalIcon="note-2"
        >
          <ul className="pl-[18px]">
            <li className="list-disc marker:text-tp-slate-500 font-sans text-[12px] text-tp-slate-500 leading-[18px]">
              {entry.overallNotes ?? "No additional notes."}
            </li>
          </ul>
        </ToothHistorySection>
      </div>
    </div>
  )
}

export function DentalContent() {
  const searchParams = useSearchParams()
  const patientId = searchParams?.get("patientId") ?? "apt-1"
  const entries: DentalToothHistoryEntry[] = DENTAL_TOOTH_HISTORY[patientId] ?? []
  const [infoMessage, setInfoMessage] = useState<string>("")

  const openDentalExamination = () => {
    if (typeof window === "undefined") return
    const activeTab = window.localStorage.getItem("rxpad.active-tab")
    if (activeTab === "dental") {
      setInfoMessage("You are already in Dental Examination. Add tooth findings/procedures to build history.")
      return
    }
    window.dispatchEvent(new CustomEvent("tp:open-dental-exam"))
    setInfoMessage("Switched to Dental Examination. Add tooth details to populate Dental History.")
  }

  if (entries.length === 0) {
    return (
      <div className="content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col items-center justify-center size-full gap-[16px] px-[20px] py-[32px]">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-tp-slate-100">
            <ToothIcon size={38} color="var(--tp-blue-500)" variant="Linear" />
          </div>
          <div className="flex flex-col items-center gap-[4px]">
            <p className="font-sans font-semibold text-[13px] text-tp-slate-700 text-center leading-[20px]">
              No dental history yet
            </p>
            <p className="font-sans text-[12px] text-tp-slate-400 text-center leading-[18px] max-w-[220px]">
              Open Dental Examination to add treatment history, findings, procedures, and tooth notes.
            </p>
          </div>
          <button
            type="button"
            onClick={openDentalExamination}
            className="inline-flex items-center gap-[6px] rounded-[8px] border border-tp-blue-500 bg-white px-[14px] py-[8px] font-sans text-[13px] font-medium text-tp-blue-500 transition-colors hover:bg-tp-blue-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 12H18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M12 18V6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
            Open Dental Examination
          </button>
          {infoMessage ? (
            <p className="font-sans text-[12px] text-tp-slate-500 text-center leading-[18px] max-w-[240px]">{infoMessage}</p>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className="content-stretch flex flex-col items-center relative size-full">
      <ActionButton label="Open Dental Examination" icon="plus" onClick={openDentalExamination} />
      {infoMessage ? (
        <div className="w-full px-[12px] pt-[8px]">
          <p className="font-sans text-[12px] text-tp-slate-500">{infoMessage}</p>
        </div>
      ) : null}
      <SectionScrollArea>
        {entries.map((entry) => (
          <ToothHistoryCard key={entry.id} entry={entry} />
        ))}
      </SectionScrollArea>
    </div>
  )
}
