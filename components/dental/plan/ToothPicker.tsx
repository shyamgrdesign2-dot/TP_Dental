"use client"

/**
 * ToothPicker — FDI tooth multi-select popover used inside TreatmentPlanTab.
 * Uses createPortal to render the dropdown at document body level,
 * preventing clipping by overflow-hidden ancestor containers.
 *
 * Two variants:
 *   - "default": standalone button with border (for use outside tables)
 *   - "inline": borderless cell-style button matching SurfacePicker (for table use)
 */
import React, { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowDown2 } from "iconsax-reactjs"

interface ToothPickerProps {
  value: string[]
  onChange: (teeth: string[]) => void
  isPediatric?: boolean
  disabled?: boolean
  /** "inline" = borderless h-[42px] cell style (for tables). "default" = standalone with border. */
  variant?: "default" | "inline"
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

export function ToothPicker({ value, onChange, isPediatric = false, disabled, variant = "default" }: ToothPickerProps) {
  const [open, setOpen] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
  const triggerRef = useRef<HTMLButtonElement>(null)
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
      : value.length <= 3
      ? value.map(v => `T${v}`).join(", ")
      : `${value.slice(0, 2).map(v => `T${v}`).join(", ")} +${value.length - 2}`

  // Compute dropdown position relative to viewport when opening
  const openDropdown = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const dropdownWidth = 460
    const viewportWidth = window.innerWidth

    let left = rect.left
    // Prevent going off right edge
    if (left + dropdownWidth > viewportWidth - 12) {
      left = viewportWidth - dropdownWidth - 12
    }

    setDropdownStyle({
      position: "fixed",
      top: rect.bottom + 4,
      left,
      zIndex: 9999,
      minWidth: dropdownWidth,
    })
    setOpen(true)
  }, [])

  // Close on scroll to avoid stale position
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener("scroll", close, { capture: true, passive: true })
    return () => window.removeEventListener("scroll", close, { capture: true })
  }, [open])

  const dropdown = open ? (
    <>
      <div className="fixed inset-0" style={{ zIndex: 9998 }} onClick={() => setOpen(false)} />
      <div
        style={dropdownStyle}
        className="rounded-[12px] border border-tp-slate-200 bg-white p-[20px] shadow-lg"
      >
        <div className="mb-[14px] flex items-center justify-between">
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.5px] text-tp-slate-500">
            {isPediatric ? "Pediatric Teeth (FDI)" : "Select Teeth (FDI)"}
          </p>
          <div className="flex items-center gap-[12px] text-[13px]">
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
        <div className="mb-[8px] flex items-center gap-[6px]">
          <span className="w-[26px] font-sans text-[12px] font-bold text-tp-slate-400">UR</span>
          <div className="flex flex-1 gap-[4px]">
            {quadrants.UR.map((fdi) => (
              <ToothPick key={fdi} fdi={fdi} selected={value.includes(fdi)} onClick={() => toggle(fdi)} />
            ))}
          </div>
          <div className="mx-[8px] h-[32px] w-[1px] bg-tp-slate-200" />
          <div className="flex flex-1 gap-[4px]">
            {quadrants.UL.map((fdi) => (
              <ToothPick key={fdi} fdi={fdi} selected={value.includes(fdi)} onClick={() => toggle(fdi)} />
            ))}
          </div>
          <span className="w-[26px] text-right font-sans text-[12px] font-bold text-tp-slate-400">UL</span>
        </div>

        {/* Divider */}
        <div className="my-[8px] h-[1px] bg-gradient-to-r from-transparent via-tp-slate-200 to-transparent" />

        {/* Lower row */}
        <div className="flex items-center gap-[6px]">
          <span className="w-[26px] font-sans text-[12px] font-bold text-tp-slate-400">LR</span>
          <div className="flex flex-1 gap-[4px]">
            {quadrants.LR.map((fdi) => (
              <ToothPick key={fdi} fdi={fdi} selected={value.includes(fdi)} onClick={() => toggle(fdi)} />
            ))}
          </div>
          <div className="mx-[8px] h-[32px] w-[1px] bg-tp-slate-200" />
          <div className="flex flex-1 gap-[4px]">
            {quadrants.LL.map((fdi) => (
              <ToothPick key={fdi} fdi={fdi} selected={value.includes(fdi)} onClick={() => toggle(fdi)} />
            ))}
          </div>
          <span className="w-[26px] text-right font-sans text-[12px] font-bold text-tp-slate-400">LL</span>
        </div>

        {/* Full-mouth shortcut + Done */}
        <div className="mt-[14px] flex justify-between border-t border-tp-slate-100 pt-[12px]">
          <button
            type="button"
            onClick={() => {
              if (value.includes("full-mouth")) onChange([])
              else onChange(["full-mouth"])
            }}
            className={`inline-flex h-[32px] items-center gap-[6px] rounded-[8px] px-[12px] font-sans text-[13px] font-medium transition-colors ${
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
            className="inline-flex h-[32px] items-center rounded-[8px] bg-tp-blue-500 px-[16px] font-sans text-[13px] font-semibold text-white hover:bg-tp-blue-600"
          >
            Done ({value.length})
          </button>
        </div>
      </div>
    </>
  ) : null

  const isInline = variant === "inline"

  return (
    <div className={isInline ? "" : "relative"}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={(e) => { e.stopPropagation(); open ? setOpen(false) : openDropdown() }}
        className={
          isInline
            ? "h-[46px] w-full text-left px-4 font-sans text-[14px] text-tp-slate-700 hover:bg-tp-blue-50/30 focus:bg-tp-blue-50/30 focus:outline-none transition-colors truncate"
            : "inline-flex h-[42px] items-center justify-between gap-[6px] rounded-[10px] border border-tp-slate-200 bg-white px-[10px] font-sans text-[14px] text-tp-slate-700 transition-colors hover:border-tp-blue-300 disabled:opacity-50 min-w-[140px]"
        }
      >
        {value.length > 0 ? (
          <span className="flex items-center gap-[4px] flex-wrap">
            {isInline ? (
              // Inline: show tooth pills like surface dots
              value.length <= 3 ? (
                value.map((v) => (
                  <span key={v} className="inline-flex h-[18px] items-center rounded-[4px] bg-tp-slate-100 px-[5px] font-sans text-[12px] font-bold text-tp-slate-600">
                    {v === "full-mouth" ? "Full" : `T${v}`}
                  </span>
                ))
              ) : (
                <>
                  {value.slice(0, 2).map((v) => (
                    <span key={v} className="inline-flex h-[18px] items-center rounded-[4px] bg-tp-slate-100 px-[5px] font-sans text-[12px] font-bold text-tp-slate-600">
                      T{v}
                    </span>
                  ))}
                  <span className="font-sans text-[12px] text-tp-slate-400">+{value.length - 2}</span>
                </>
              )
            ) : (
              <>
                <span>{displayValue}</span>
                <ArrowDown2 size={14} color="currentColor" variant="Linear" />
              </>
            )}
          </span>
        ) : (
          <span className={`text-tp-slate-400 flex items-center gap-[6px] ${isInline ? "" : "flex-1"}`}>
            {isInline ? "—" : (
              <>
                <span>Select teeth</span>
                <ArrowDown2 size={14} color="currentColor" variant="Linear" className="ml-auto" />
              </>
            )}
          </span>
        )}
      </button>

      {typeof document !== "undefined" && dropdown
        ? createPortal(dropdown, document.body)
        : null}
    </div>
  )
}

function ToothPick({ fdi, selected, onClick }: { fdi: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[32px] flex-1 min-w-0 items-center justify-center rounded-[6px] border font-sans text-[13px] font-semibold transition-colors ${
        selected
          ? "border-tp-blue-500 bg-tp-blue-500 text-white"
          : "border-tp-slate-200 bg-white text-tp-slate-600 hover:border-tp-blue-300 hover:bg-tp-blue-50 hover:text-tp-blue-700"
      }`}
    >
      {fdi}
    </button>
  )
}
