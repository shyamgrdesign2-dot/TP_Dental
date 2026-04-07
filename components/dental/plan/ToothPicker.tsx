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
import type { CSSProperties } from "react"
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
  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({})
  const [mounted, setMounted] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const quadrants = isPediatric ? PEDIATRIC_QUADRANTS : ADULT_QUADRANTS
  const allTeeth = [...quadrants.UR, ...quadrants.UL, ...quadrants.LR, ...quadrants.LL]

  useEffect(() => { setMounted(true) }, [])

  const toggle = (fdi: string) => {
    if (value.includes("full-mouth")) {
      onChange([fdi])
      return
    }
    if (value.includes(fdi)) onChange(value.filter((v) => v !== fdi))
    else onChange([...value, fdi])
  }

  const selectAll = () => {
    onChange(allTeeth)
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
    const dropdownWidth = Math.min(520, window.innerWidth - 24)
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
      width: dropdownWidth,
    })
    setOpen(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      if (dropdownRef.current?.contains(target)) return
      setOpen(false)
    }
    const reposition = () => openDropdown()
    document.addEventListener("mousedown", handleDocClick)
    window.addEventListener("scroll", reposition, true)
    window.addEventListener("resize", reposition)
    return () => {
      document.removeEventListener("mousedown", handleDocClick)
      window.removeEventListener("scroll", reposition, true)
      window.removeEventListener("resize", reposition)
    }
  }, [open])

  const dropdown = open ? (
    <div
      ref={dropdownRef}
      style={dropdownStyle}
      className="rounded-[16px] border border-tp-slate-200 bg-white p-[16px] shadow-[0_18px_50px_-18px_rgba(15,23,42,0.28)]"
    >
      <div className="mb-[12px] flex items-start justify-between gap-[12px]">
        <div>
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.5px] text-tp-slate-500">
            {isPediatric ? "Pediatric Teeth" : "Select Teeth"}
          </p>
          <p className="mt-[3px] font-sans text-[12px] text-tp-slate-400">
            Choose one, many, or switch to full-mouth mode.
          </p>
        </div>
        <div className="inline-flex h-[24px] min-w-[24px] items-center justify-center rounded-full bg-tp-slate-100 px-[8px] font-sans text-[12px] font-bold text-tp-slate-600">
          {value.includes("full-mouth") ? "FM" : value.length}
        </div>
      </div>

      <div className="mb-[12px] grid grid-cols-1 gap-[10px] sm:grid-cols-2">
        {([
          ["Upper Right", quadrants.UR],
          ["Upper Left", quadrants.UL],
          ["Lower Right", quadrants.LR],
          ["Lower Left", quadrants.LL],
        ] as const).map(([label, teeth]) => (
          <div key={label} className="rounded-[12px] border border-tp-slate-100 bg-tp-slate-50/60 p-[10px]">
            <div className="mb-[8px] flex items-center justify-between">
              <span className="font-sans text-[12px] font-semibold text-tp-slate-500">{label}</span>
              <span className="font-sans text-[11px] text-tp-slate-400">{teeth.length} teeth</span>
            </div>
            <div className="grid grid-cols-4 gap-[6px]">
              {teeth.map((fdi) => (
                <ToothPick key={fdi} fdi={fdi} selected={value.includes(fdi)} onClick={() => toggle(fdi)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-[8px] border-t border-tp-slate-100 pt-[12px]">
        <div className="flex flex-wrap items-center gap-[8px]">
          <button
            type="button"
            onClick={() => onChange(value.includes("full-mouth") ? [] : ["full-mouth"])}
            className={`inline-flex h-[34px] items-center rounded-[10px] px-[12px] font-sans text-[13px] font-semibold transition-colors ${
              value.includes("full-mouth")
                ? "bg-tp-blue-500 text-white"
                : "bg-tp-blue-50 text-tp-blue-700 hover:bg-tp-blue-100"
            }`}
          >
            Whole mouth
          </button>
          <button
            type="button"
            onClick={selectAll}
            className="inline-flex h-[34px] items-center rounded-[10px] bg-tp-slate-100 px-[12px] font-sans text-[13px] font-medium text-tp-slate-700 transition-colors hover:bg-tp-slate-200"
          >
            Select all
          </button>
          <button
            type="button"
            onClick={clear}
            className="inline-flex h-[34px] items-center rounded-[10px] bg-white px-[12px] font-sans text-[13px] font-medium text-tp-slate-500 transition-colors hover:bg-tp-slate-50"
          >
            Clear
          </button>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="inline-flex h-[34px] items-center rounded-[10px] bg-tp-blue-600 px-[14px] font-sans text-[13px] font-semibold text-white transition-colors hover:bg-tp-blue-700"
        >
          Done
        </button>
      </div>
    </div>
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
            ? "flex h-[52px] w-full items-center justify-between gap-[8px] bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] transition-colors focus:outline-none"
            : "inline-flex h-[42px] items-center justify-between gap-[6px] rounded-[10px] border border-tp-slate-200 bg-white px-[10px] font-sans text-[14px] text-tp-slate-700 transition-colors hover:border-tp-blue-300 disabled:opacity-50 min-w-[140px]"
        }
      >
        {value.length > 0 ? (
          <span className="flex min-w-0 flex-1 items-center gap-[4px] flex-wrap">
            {isInline ? (
              value.includes("full-mouth") ? (
                <span className="inline-flex h-[18px] items-center rounded-[4px] bg-tp-blue-50 px-[6px] font-sans text-[12px] font-bold text-tp-blue-700">
                  Full mouth
                </span>
              ) : value.length <= 3 ? (
                value.map((v) => (
                  <span key={v} className="inline-flex h-[18px] items-center rounded-[4px] bg-tp-slate-100 px-[5px] font-sans text-[12px] font-bold text-tp-slate-600">
                    {`T${v}`}
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
              </>
            )}
          </span>
        ) : (
          <span className={`flex items-center gap-[6px] ${isInline ? "flex-1 text-[12px] text-[#a2a2a8]" : "flex-1 text-tp-slate-400"}`}>
            {isInline ? "—" : (
              <>
                <span>Select teeth</span>
              </>
            )}
          </span>
        )}
        <ArrowDown2 size={14} color="currentColor" variant="Linear" />
      </button>

      {mounted && typeof document !== "undefined" && dropdown
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
      className={`flex h-[34px] min-w-0 items-center justify-center rounded-[10px] border font-sans text-[13px] font-semibold transition-colors ${
        selected
          ? "border-tp-blue-500 bg-tp-blue-500 text-white"
          : "border-tp-slate-200 bg-white text-tp-slate-600 hover:border-tp-blue-300 hover:bg-tp-blue-50 hover:text-tp-blue-700"
      }`}
    >
      {fdi}
    </button>
  )
}
