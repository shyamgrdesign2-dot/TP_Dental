"use client"

import React, { useState } from "react"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { CopyIcon } from "./CopyIcon"
import { ActionableTooltip } from "./ActionableTooltip"
import { TPMedicalIcon } from "@/components/tp-ui"
import { Copy, ArrowDown2, ArrowUp2, InfoCircle } from "iconsax-reactjs"

/** Small info icon with hover tooltip showing data sources */
export function SourceInfoIcon({ sources }: { sources: string[] }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative ml-[4px] flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((v) => !v)}
    >
      <button
        type="button"
        className="flex h-[20px] w-[20px] items-center justify-center rounded-full text-tp-violet-400 transition-colors hover:text-tp-violet-600 hover:bg-tp-violet-50"
        aria-label="Data sources"
      >
        <InfoCircle size={14} variant="Bold" />
      </button>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute right-0 top-full z-[100] mt-[4px] min-w-[160px] max-w-[220px] rounded-[8px] border border-tp-slate-100/80 bg-white/95 px-[10px] py-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <p className="mb-[4px] text-[12px] font-semibold tracking-wider text-tp-slate-400">Sources</p>
          <div className="flex flex-col gap-[3px]">
            {sources.map((src, i) => (
              <div key={i} className="flex items-center gap-[5px]">
                <div className="h-[5px] w-[5px] flex-shrink-0 rounded-full bg-tp-violet-400" />
                <span className="text-[14px] leading-[1.4] text-tp-slate-600">{src}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface CardShellProps {
  icon: React.ReactNode
  iconBg?: string               // Deprecated: always uses TP blue-50
  title: string
  date?: string
  tpIconName?: string
  badge?: { label: string; color: string; bg: string }
  copyAll?: () => void
  copyAllTooltip?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
  actions?: React.ReactNode
  sidebarLink?: React.ReactNode
  /** Extra content rendered between badge and collapse chevron (e.g. donut icon) */
  headerExtra?: React.ReactNode
  /** Collapse control in header — chevron (default) or eye icon for expand/collapse */
  collapseIcon?: "chevron" | "eye"
  /** Slightly larger collapse hit target (e.g. dental tooth cards) */
  largeCollapseControl?: boolean
  /** Data source label(s) for provenance tooltip — shown as info icon when no donut chart */
  dataSources?: string[]
  /**
   * Replaces the default 26×26 TP icon box (e.g. MiniToothCanvas). When set, `icon` / `tpIconName` are ignored.
   */
  leadingVisual?: React.ReactNode
  /**
   * Shown below the header when `collapsible` and collapsed; hidden while expanded (instant toggle).
   */
  pinnedBody?: React.ReactNode
  /** When set with `badge`, renders the badge under the title (e.g. T##) instead of on the right. */
  badgeBelowTitle?: boolean
  children: React.ReactNode
}

export function CardShell({
  icon,
  title,
  date,
  tpIconName,
  badge,
  copyAll,
  copyAllTooltip,
  collapsible = true,
  defaultCollapsed = false,
  actions,
  sidebarLink,
  headerExtra,
  collapseIcon = "chevron",
  largeCollapseControl = false,
  dataSources,
  leadingVisual,
  pinnedBody,
  badgeBelowTitle = false,
  children,
}: CardShellProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [copyHovered, setCopyHovered] = useState(false)
  const [copyInlineAck, setCopyInlineAck] = useState(false)

  const runCopyAll = () => {
    copyAll?.()
    if (!copyAll) return
    setCopyInlineAck(true)
    window.setTimeout(() => setCopyInlineAck(false), 1800)
  }

  return (
    <div
      className="w-full overflow-hidden rounded-[14px] bg-white"
      style={{
        border: "1px solid transparent",
        backgroundImage: "linear-gradient(white, white), linear-gradient(180deg, rgba(75,74,213,0.18) 0%, rgba(75,74,213,0.04) 25%, rgba(23,23,37,0.02) 50%, rgba(75,74,213,0.04) 75%, rgba(75,74,213,0.18) 100%)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      {/* Header */}
      <div
        className={cn(
          "flex gap-[7px] px-3 py-[11px]",
          leadingVisual || badgeBelowTitle || (date && !leadingVisual) ? "items-start" : "items-center",
        )}
        style={{
          background: "linear-gradient(180deg, rgba(75,74,213,0.05) 0%, #FFFFFF 100%)",
          borderBottom: "1px solid var(--tp-slate-50, #F8FAFC)",
        }}
      >
        {/* Icon — TP medical icon, or custom leading visual (e.g. 3D tooth) */}
        {leadingVisual ? (
          <div className="flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white ring-1 ring-tp-slate-100">
            {leadingVisual}
          </div>
        ) : (
          <div
            className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-[8px]"
            style={{ background: "var(--tp-blue-50, rgba(75, 74, 213, 0.08))" }}
          >
            {tpIconName ? (
              <TPMedicalIcon name={tpIconName} variant="bulk" size={15} color="var(--tp-blue-500, #4B4AD5)" />
            ) : (
              <span style={{ color: "var(--tp-blue-500, #4B4AD5)", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</span>
            )}
          </div>
        )}

        {/* Title + Date */}
        <div className="flex min-w-0 flex-col text-tp-slate-800">
          <span
            className="group/title relative max-w-[min(100%,min(90vw,200px))] truncate text-[13px] font-semibold leading-[1.4]"
            title={title}
          >
            {title}
            <span className="pointer-events-none absolute bottom-full left-0 z-50 mb-1 hidden max-w-[min(90vw,320px)] whitespace-normal rounded-[4px] bg-tp-slate-800 px-2 py-1 text-[10px] font-normal leading-snug text-white shadow-md group-hover/title:block group-focus-within/title:block">
              {title}
            </span>
          </span>
          {badge && badgeBelowTitle ? (
            <span
              className="mt-0.5 inline-flex h-[22px] w-fit max-w-full items-center truncate rounded-[4px] px-2 font-mono text-[11px] font-bold tabular-nums leading-none"
              style={{ background: badge.bg, color: badge.color }}
              title={badge.label}
            >
              {badge.label}
            </span>
          ) : null}
          {date && (
            <span
              className="mt-[1px] max-w-[min(100%,min(90vw,400px))] break-words text-[11px] font-normal leading-[1.4] text-tp-slate-400"
              title={date}
            >
              {date}
            </span>
          )}
        </div>

        {/* Spacer — pushes badge and trailing controls to the right */}
        <span className="flex-1" />

        {/* Badge — truncated with tooltip if too long */}
        {badge && !badgeBelowTitle ? (
          <span
            className="group/badge relative max-w-[100px] truncate rounded-[4px] px-[6px] py-[3px] text-[12px] font-semibold leading-[1.2]"
            style={{ background: badge.bg, color: badge.color }}
            title={badge.label}
          >
            {badge.label}
            <span className="pointer-events-none absolute bottom-full right-0 z-50 mb-1 hidden max-w-[240px] whitespace-normal rounded-[4px] bg-tp-slate-800 px-2 py-1 text-[10px] font-normal leading-snug text-white shadow-md group-hover/badge:block">
              {badge.label}
            </span>
          </span>
        ) : null}

        {/* Header Extra (e.g. data completeness donut) — gap-[6px] from badge */}
        {headerExtra && <div className="ml-[4px] flex-shrink-0">{headerExtra}</div>}

        {/* Copy + collapse grouped (e.g. RxPad dental card) */}
        {(copyAll || collapsible) && (
          <div className="ml-2 flex flex-shrink-0 items-center gap-4">
            {copyAll && (
              <div className="flex max-w-[min(160px,42vw)] flex-shrink-0 items-center justify-end gap-1.5">
                {copyInlineAck ? (
                  <span className="truncate text-[11px] font-semibold leading-tight text-emerald-600" title="Copied to RxPad">
                    Copied to RxPad
                  </span>
                ) : copyAllTooltip ? (
                  <ActionableTooltip label={copyAllTooltip} onAction={runCopyAll}>
                    <span
                      className={cn(
                        "flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[6px] transition-colors",
                        copyHovered ? "text-tp-blue-600 bg-tp-blue-50/80" : "text-tp-blue-500",
                      )}
                      onMouseEnter={() => setCopyHovered(true)}
                      onMouseLeave={() => setCopyHovered(false)}
                    >
                      <Copy size={17} variant={copyHovered ? "Bulk" : "Linear"} />
                    </span>
                  </ActionableTooltip>
                ) : (
                  <CopyIcon size={17} onClick={runCopyAll} />
                )}
              </div>
            )}
            {collapsible && (
              <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className={cn(
                  "flex flex-shrink-0 items-center justify-center rounded-[6px] text-tp-slate-600 transition-colors",
                  largeCollapseControl ? "h-[26px] w-[26px]" : "h-[22px] w-[22px]",
                  collapseIcon === "eye"
                    ? "bg-transparent hover:bg-tp-slate-100"
                    : "bg-tp-slate-100 hover:bg-tp-slate-200",
                )}
                aria-expanded={!collapsed}
                aria-label={collapsed ? "Expand card" : "Collapse card"}
              >
                {collapseIcon === "eye" ? (
                  <Eye className={largeCollapseControl ? "h-[18px] w-[18px]" : "h-4 w-4"} strokeWidth={2} />
                ) : collapsed ? (
                  <ArrowDown2 size={largeCollapseControl ? 14 : 12} variant="Linear" />
                ) : (
                  <ArrowUp2 size={largeCollapseControl ? 14 : 12} variant="Linear" />
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pinned preview — shown only while collapsed; no transition (instant toggle) */}
      {pinnedBody && collapsible && collapsed && (
        <div
          className="border-t border-tp-slate-50 px-3 py-[8px]"
          style={{ borderTop: "1px solid var(--tp-slate-50, #F8FAFC)" }}
        >
          {pinnedBody}
        </div>
      )}
      {pinnedBody && !collapsible && (
        <div
          className="border-t border-tp-slate-50 px-3 py-[8px]"
          style={{ borderTop: "1px solid var(--tp-slate-50, #F8FAFC)" }}
        >
          {pinnedBody}
        </div>
      )}
      {(!collapsible || !collapsed) && (
        <>
          <div className="px-3 py-[10px]">
            {children}
          </div>

          {/* Actions row — single-line horizontal scroll */}
          {actions && (
            <div className="overflow-x-auto px-3 pt-[2px] pb-[10px]">
              <div className="flex gap-1 whitespace-nowrap">
                {actions}
              </div>
            </div>
          )}

          {/* Sidebar link (below actions, with bottom gradient) */}
          {sidebarLink && (
            <div
              className="px-3 py-[8px]"
              style={{
                borderTop: "0.5px solid var(--tp-slate-50, #F8FAFC)",
                background: "linear-gradient(180deg, #FFFFFF 0%, rgba(75,74,213,0.04) 100%)",
              }}
            >
              {sidebarLink}
            </div>
          )}
        </>
      )}
    </div>
  )
}
