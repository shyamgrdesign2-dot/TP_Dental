/**
 * Dental History content panel — secondary sidebar.
 * Matches the design pattern of VitalsContent / PastVisitsContent:
 * ActionButton at top, expandable section cards for each historical entry.
 */
"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import clsx from "clsx"
import { ArrowSquareDown, ArrowSquareUp } from "iconsax-reactjs"
import { DENTAL_HISTORY, type DentalHistoryEntry } from "@/components/dental/mock-data"
import { ActionButton, useStickyHeaderState } from "../detail-shared"
import { tpSectionCardStyle } from "../tokens"

function DentalHistoryCard({
  entry,
  expanded,
  onToggle,
}: {
  entry: DentalHistoryEntry
  expanded: boolean
  onToggle: () => void
}) {
  const { headerRef, isStuck } = useStickyHeaderState()
  const statusTone =
    entry.status === "Active"
      ? "bg-[#fef2f2] text-[#dc2626]"
      : entry.status === "Resolved"
      ? "bg-[#f0fdf4] text-[#16a34a]"
      : "bg-tp-slate-100 text-tp-slate-600"
  return (
    <div className="relative shrink-0 w-full" style={tpSectionCardStyle}>
      <button
        type="button"
        ref={headerRef as React.Ref<HTMLButtonElement>}
        onClick={onToggle}
        className={clsx(
          "bg-tp-slate-100 sticky top-0 z-[2] shrink-0 w-full text-left",
          expanded
            ? isStuck
              ? "rounded-tl-none rounded-tr-none"
              : "rounded-tl-[10px] rounded-tr-[10px]"
            : "rounded-[10px]",
        )}
      >
        <div className="flex items-center justify-between gap-[8px] px-[10px] py-[8px]">
          <div className="flex min-w-0 flex-1 items-center gap-[8px]">
            <p className="font-['Inter',sans-serif] font-semibold leading-[20px] text-tp-slate-700 text-[14px] tracking-[0.012px] truncate">
              {entry.condition}
            </p>
            <span
              className={clsx(
                "inline-flex shrink-0 items-center rounded-[4px] px-[6px] py-[1px] text-[10px] font-sans font-medium",
                statusTone,
              )}
            >
              {entry.status}
            </span>
          </div>
          <div className="flex items-center gap-[6px]">
            <span className="font-sans text-[11px] text-tp-slate-400 whitespace-nowrap">{entry.since}</span>
            <div className="shrink-0 size-[18px]">
              {expanded ? (
                <ArrowSquareUp color="var(--tp-slate-500)" size={18} strokeWidth={1.5} variant="Linear" />
              ) : (
                <ArrowSquareDown color="var(--tp-slate-500)" size={18} strokeWidth={1.5} variant="Linear" />
              )}
            </div>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="flex flex-col gap-[6px] bg-white px-[12px] py-[10px]">
          {entry.medication && (
            <div className="flex items-center justify-between">
              <span className="font-sans text-[13px] leading-[20px] text-tp-slate-700">Medication</span>
              <span className="inline-flex items-center rounded-[4px] bg-[#eff6ff] px-[6px] py-[1px] text-[10px] font-sans font-medium text-[#2563eb]">
                On medication
              </span>
            </div>
          )}
          {entry.notes && (
            <p className="font-sans text-[13px] leading-[19px] text-tp-slate-600">{entry.notes}</p>
          )}
          {!entry.medication && !entry.notes && (
            <p className="font-sans text-[12px] text-tp-slate-400 italic">No additional notes.</p>
          )}
        </div>
      )}
    </div>
  )
}

export function DentalContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams?.get("patientId") ?? "PAT-001"
  const entries: DentalHistoryEntry[] = DENTAL_HISTORY[patientId] ?? []
  const [expandedById, setExpandedById] = useState<Record<string, boolean>>(() =>
    entries.length > 0 ? { [entries[0].id]: true } : {},
  )

  const openDentalModule = () => {
    router.push(`/dental?patientId=${patientId}`)
  }

  return (
    <div className="content-stretch flex flex-col items-center relative size-full">
      <ActionButton label="Open dental module" icon="plus" onClick={openDentalModule} />
      <div
        className="flex-[1_0_0] min-h-px min-w-px relative w-full overflow-y-auto"
        data-sticky-scroll-root="true"
      >
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center size-full gap-[14px] px-[20px] py-[32px]">
            <div className="flex items-center justify-center w-[72px] h-[72px] rounded-full bg-tp-slate-100">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path
                  d="M20 5c-4 0-6.5 1.5-9 1.5S7 5 5 7c-2 3-1 9 1 14s2 10 4 12c1.5 1.5 3 0 3.5-2s1.5-6 3-8 3-2 3.5-2 2 0 3.5 2 2.5 6 3 8 2 3.5 3.5 2c2-2 2-7 4-12s3-11 1-14c-2-2-4-.5-6-.5S24 5 20 5Z"
                  fill="var(--tp-slate-200)"
                />
                <path
                  d="M20 5c-4 0-6.5 1.5-9 1.5S7 5 5 7c-2 3-1 9 1 14s2 10 4 12c1.5 1.5 3 0 3.5-2s1.5-6 3-8 3-2 3.5-2 2 0 3.5 2 2.5 6 3 8 2 3.5 3.5 2c2-2 2-7 4-12s3-11 1-14c-2-2-4-.5-6-.5S24 5 20 5Z"
                  stroke="var(--tp-blue-400)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-[4px]">
              <p className="font-sans font-semibold text-[13px] text-tp-slate-700 text-center leading-[20px]">
                No dental history yet
              </p>
              <p className="font-sans text-[12px] text-tp-slate-400 text-center leading-[18px] max-w-[220px]">
                Open the dental module to examine, mark findings, and plan treatments for this patient.
              </p>
            </div>
          </div>
        ) : (
          <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] w-full">
            {entries.map((entry) => (
              <DentalHistoryCard
                key={entry.id}
                entry={entry}
                expanded={Boolean(expandedById[entry.id])}
                onToggle={() =>
                  setExpandedById((prev) => ({
                    ...prev,
                    [entry.id]: !prev[entry.id],
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
