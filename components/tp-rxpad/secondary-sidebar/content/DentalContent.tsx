/**
 * Dental History content panel — secondary sidebar.
 * Shows either an empty state with "Open Dental Module" CTA, or the
 * patient's existing dental history entries.
 */
"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight } from "iconsax-reactjs"
import { DENTAL_HISTORY, type DentalHistoryEntry } from "@/components/dental/mock-data"

export function DentalContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams?.get("patientId") ?? "PAT-001"
  const entries: DentalHistoryEntry[] = DENTAL_HISTORY[patientId] ?? []

  const openDentalModule = () => {
    router.push(`/dental?patientId=${patientId}`)
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center size-full gap-[14px] px-[20px] py-[32px]">
        {/* Tooth illustration */}
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

        {/* Message */}
        <div className="flex flex-col items-center gap-[4px]">
          <p className="font-sans font-semibold text-[13px] text-tp-slate-700 text-center leading-[20px]">
            No Dental History
          </p>
          <p className="font-sans text-[12px] text-tp-slate-400 text-center leading-[18px] max-w-[200px]">
            No dental records yet. Open the dental module to examine, mark findings, and plan treatments.
          </p>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={openDentalModule}
          className="inline-flex items-center gap-[8px] px-[14px] py-[8px] bg-tp-blue-500 text-white text-[12px] font-sans font-semibold leading-[18px] cursor-pointer border-0 rounded-[6px] hover:bg-tp-blue-600 transition-colors"
        >
          Open Dental Module
          <ArrowRight size={14} variant="Linear" color="#FFFFFF" />
        </button>
      </div>
    )
  }

  // History list
  return (
    <div className="flex flex-col size-full overflow-y-auto">
      <div className="flex flex-col gap-[8px] px-[16px] py-[12px]">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex flex-col gap-[4px] rounded-[8px] border border-tp-slate-200 bg-white p-[12px] hover:border-tp-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between gap-[8px]">
              <span className="font-sans font-semibold text-[12px] text-tp-slate-800">
                {entry.condition}
              </span>
              <span className="font-sans text-[10px] text-tp-slate-400">
                {entry.since}
              </span>
            </div>
            <div className="flex items-center gap-[6px]">
              <span
                className={`inline-flex items-center rounded-[4px] px-[6px] py-[1px] text-[10px] font-sans font-medium ${
                  entry.status === "Active"
                    ? "bg-[#fef2f2] text-[#dc2626]"
                    : entry.status === "Resolved"
                    ? "bg-[#f0fdf4] text-[#16a34a]"
                    : "bg-tp-slate-100 text-tp-slate-600"
                }`}
              >
                {entry.status}
              </span>
              {entry.medication && (
                <span className="inline-flex items-center rounded-[4px] bg-[#eff6ff] px-[6px] py-[1px] text-[10px] font-sans font-medium text-[#2563eb]">
                  On Medication
                </span>
              )}
            </div>
            {entry.notes && (
              <p className="font-sans text-[11px] text-tp-slate-500 leading-[16px] mt-[2px]">
                {entry.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto flex justify-center px-[16px] py-[12px] border-t border-tp-slate-100">
        <button
          type="button"
          onClick={openDentalModule}
          className="inline-flex items-center gap-[8px] px-[14px] py-[8px] bg-tp-blue-500 text-white text-[12px] font-sans font-semibold leading-[18px] cursor-pointer border-0 rounded-[6px] hover:bg-tp-blue-600 transition-colors w-full justify-center"
        >
          Open Dental Module
          <ArrowRight size={14} variant="Linear" color="#FFFFFF" />
        </button>
      </div>
    </div>
  )
}
