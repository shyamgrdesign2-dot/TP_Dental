"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { TPMedicalIcon } from "@/components/tp-ui"
import { SECTION_TAG_ICON_MAP } from "./SectionTag"

export interface SectionSummaryBarProps {
  label: string
  /** TPMedicalIcon name; if omitted, resolved from SECTION_TAG_ICON_MAP[label] when possible */
  icon?: string
  /** Use when the icon is not a TPMedicalIcon (e.g. iconsax) */
  iconSlot?: React.ReactNode
  variant?: "default" | "specialty"
  trailing?: React.ReactNode
  className?: string
  /** Bottom margin under the bar (default 4px to match SBAR) */
  marginBottom?: boolean
  /** Slightly smaller bar + label (e.g. dental tooth detail blocks) */
  compact?: boolean
}

/**
 * Full-width section header row — canonical spec:
 * Fixed row height 30px; TPMedicalIcon 18px, vertically centered with label; label 14px semibold.
 * Default fill: TP Slate 100 at 70% opacity (`bg-tp-slate-100/70`); label/icon `text-tp-slate-500`.
 * Specialty: `bg-tp-violet-50` + `text-tp-violet-600`.
 * For inline subsection keys (Chronic:, BP:, Sx:, lab names), use **`SECTION_INLINE_SUBKEY_CLASS`** from `shared/sectionInlineKey.ts` — not on this bar.
 */
export function SectionSummaryBar({
  label,
  icon,
  iconSlot,
  variant = "default",
  trailing,
  className,
  marginBottom = true,
  compact = false,
}: SectionSummaryBarProps) {
  const resolvedName = icon ?? SECTION_TAG_ICON_MAP[label]
  const barBg = variant === "specialty" ? "bg-tp-violet-50" : "bg-tp-slate-100/70"
  const labelColor = variant === "specialty" ? "text-tp-violet-600" : "text-tp-slate-500"
  const iconColor = variant === "specialty"
    ? "var(--tp-violet-600, #7C3AED)"
    : "var(--tp-slate-500, #64748B)"
  const rowH = compact ? "h-[28px]" : "h-[30px]"
  const iconBoxW = compact ? "w-[16px]" : "w-[18px]"
  const iconPx = compact ? 14 : 18
  const labelText = compact ? "text-[12px]" : "text-[14px]"

  return (
    <div
      className={cn(
        "group/section-header flex w-full min-w-0 shrink-0 items-center gap-2 rounded-[4px] px-2",
        rowH,
        marginBottom && "mb-[4px]",
        barBg,
        className,
      )}
    >
      {iconSlot ? (
        <div className={cn("flex shrink-0 items-center justify-center", rowH)}>
          {iconSlot}
        </div>
      ) : resolvedName ? (
        <div className={cn("flex shrink-0 items-center justify-center", rowH, iconBoxW)}>
          <TPMedicalIcon
            name={resolvedName}
            variant="bulk"
            size={iconPx}
            color={iconColor}
            className="shrink-0"
          />
        </div>
      ) : null}
      <div className="flex h-full min-w-0 flex-1 items-center gap-2">
        <span
          className={cn(
            "min-w-0 flex-1 text-left font-semibold leading-[1.2]",
            labelText,
            labelColor,
          )}
        >
          {label}
        </span>
        {trailing ? (
          <div className="flex h-full shrink-0 items-center gap-1">{trailing}</div>
        ) : null}
      </div>
    </div>
  )
}
