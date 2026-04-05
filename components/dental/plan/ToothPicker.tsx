"use client"

/**
 * ToothPicker — FDI tooth multi-select popover used inside TreatmentPlanTab.
 * Switches to pediatric notation for patients ≤13 years.
 */
import React, { useState } from "react"
import { ArrowDown2 } from "iconsax-reactjs"

interface ToothPickerProps {
  value: string[]
  onChange: (teeth: string[]) => void
  isPediatric?: boolean
  disabled?: boolean
}

const ADULT_QUADRANTS = {
  UR: ["18", "17", "16", "15", "14", "13", "12", "11"],
  UL: ["21", "22", "23", "24", "25", "26", "27", "28"],
  LR: ["48", "47", "46", "45", "44", "43", "42", "41"],
  LL: ["31", "32", "33", "34", "35", "36", "37", "38"],
}

const PEDIATRIC_QUADRANTS = {
  UR: ["55", "54", "53", "52", "51"],
  UL: ["61", "62", "63", "64", "65"],
  LR: ["85", "84", "83", "82", "81"],
  LL: ["71", "72", "73", "74", "75"],
}

export function ToothPicker({ value, onChange, isPediatric = false, disabled }: ToothPickerProps) {
  const [open, setOpen] = useState(false)
  const quadrants = isPediatric ? PEDIATRIC_QUADRANTS : ADULT_QUADRANTS

  const toggle = (fdi: string) => {
    if (value.includes(fdi)) onChange(value.filter((v) => v !== fdi))
    else onChange([...value, fdi])
  }

  const selectAll = () => {
    const all = [...quadrants.UR, ...quadrants.UL, ...quadrants.LR, ...quadrants.LL]
    onChange(all)
  }

  const clear = () => onChange([])

  const displayValue =
    value.length === 0
      ? "Select teeth"
      : value.includes("full-mouth")
      ? "Full mouth"
      : value.length <= 4
      ? value.join(", ")
      : `${value.slice(0, 3).join(", ")} +${value.length - 3}`

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="inline-flex h-[32px] items-center justify-between gap-[6px] rounded-[6px] border border-tp-slate-200 bg-white px-[10px] font-sans text-[12px] text-tp-slate-700 transition-colors hover:border-tp-blue-300 disabled:opacity-50 min-w-[140px]"
      >
        <span className={value.length === 0 ? "text-tp-slate-400" : ""}>{displayValue}</span>
        <ArrowDown2 size={14} color="currentColor" variant="Linear" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-[36px] z-50 min-w-[340px] rounded-[10px] border border-tp-slate-200 bg-white p-[12px] shadow-lg">
            <div className="mb-[8px] flex items-center justify-between">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.5px] text-tp-slate-500">
                {isPediatric ? "Pediatric Teeth (FDI)" : "Adult Teeth (FDI)"}
              </p>
              <div className="flex items-center gap-[8px] text-[11px]">
                <button
                  type="button"
                  onClick={selectAll}
                  className="font-sans font-medium text-tp-blue-600 hover:underline"
                >
                  Select all
                </button>
                <span className="text-tp-slate-300">·</span>
                <button
                  type="button"
                  onClick={clear}
                  className="font-sans font-medium text-tp-slate-500 hover:underline"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Upper row */}
            <div className="mb-[4px] flex items-center gap-[4px]">
              <span className="w-[20px] font-sans text-[9px] font-semibold text-tp-slate-400">UR</span>
              <div className="flex flex-1 gap-[2px]">
                {quadrants.UR.map((fdi) => (
                  <ToothPick key={fdi} fdi={fdi} selected={value.includes(fdi)} onClick={() => toggle(fdi)} />
                ))}
              </div>
              <div className="mx-[4px] h-[22px] w-[1px] bg-tp-slate-200" />
              <div className="flex flex-1 gap-[2px]">
                {quadrants.UL.map((fdi) => (
                  <ToothPick key={fdi} fdi={fdi} selected={value.includes(fdi)} onClick={() => toggle(fdi)} />
                ))}
              </div>
              <span className="w-[20px] text-right font-sans text-[9px] font-semibold text-tp-slate-400">UL</span>
            </div>

            {/* Divider */}
            <div className="my-[4px] h-[1px] bg-gradient-to-r from-transparent via-tp-slate-200 to-transparent" />

            {/* Lower row */}
            <div className="flex items-center gap-[4px]">
              <span className="w-[20px] font-sans text-[9px] font-semibold text-tp-slate-400">LR</span>
              <div className="flex flex-1 gap-[2px]">
                {quadrants.LR.map((fdi) => (
                  <ToothPick key={fdi} fdi={fdi} selected={value.includes(fdi)} onClick={() => toggle(fdi)} />
                ))}
              </div>
              <div className="mx-[4px] h-[22px] w-[1px] bg-tp-slate-200" />
              <div className="flex flex-1 gap-[2px]">
                {quadrants.LL.map((fdi) => (
                  <ToothPick key={fdi} fdi={fdi} selected={value.includes(fdi)} onClick={() => toggle(fdi)} />
                ))}
              </div>
              <span className="w-[20px] text-right font-sans text-[9px] font-semibold text-tp-slate-400">LL</span>
            </div>

            {/* Full-mouth shortcut */}
            <div className="mt-[10px] flex justify-between border-t border-tp-slate-100 pt-[8px]">
              <button
                type="button"
                onClick={() => {
                  if (value.includes("full-mouth")) onChange([])
                  else onChange(["full-mouth"])
                }}
                className={`inline-flex h-[24px] items-center gap-[4px] rounded-[4px] px-[8px] font-sans text-[11px] font-medium transition-colors ${
                  value.includes("full-mouth")
                    ? "bg-tp-blue-500 text-white"
                    : "bg-tp-slate-100 text-tp-slate-600 hover:bg-tp-slate-200"
                }`}
              >
                Full mouth
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-[24px] items-center rounded-[4px] bg-tp-blue-500 px-[12px] font-sans text-[11px] font-semibold text-white hover:bg-tp-blue-600"
              >
                Done ({value.length})
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function ToothPick({ fdi, selected, onClick }: { fdi: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[22px] flex-1 min-w-0 items-center justify-center rounded-[4px] border font-sans text-[9px] font-semibold transition-colors ${
        selected
          ? "border-tp-blue-500 bg-tp-blue-500 text-white"
          : "border-tp-slate-200 bg-white text-tp-slate-600 hover:border-tp-blue-300 hover:bg-tp-blue-50 hover:text-tp-blue-700"
      }`}
    >
      {fdi}
    </button>
  )
}
