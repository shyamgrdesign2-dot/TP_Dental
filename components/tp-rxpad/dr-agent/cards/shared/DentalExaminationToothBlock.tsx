"use client"

import React, { useMemo, useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { ArrowDown2 } from "iconsax-reactjs"
import { CopyIcon } from "../CopyIcon"
import { ActionableTooltip } from "../ActionableTooltip"
import { SectionSummaryBar } from "../SectionSummaryBar"
import type { DentalScanFinding, DentalScanHistoryRow, DentalScanProcedure, DentalScanToothRow } from "../../types"
import { cn } from "@/lib/utils"
import { ALL_ZONES, QUADRANT_LABELS, TEETH, type Finding, type ZoneId } from "@/components/dental/examination/types"
import { MiniToothCanvas } from "@/components/dental/examination/MiniToothCanvas"
import { TPMedicalIcon } from "@/components/tp-ui/medical-icons"

export const DENTAL_EXAMINATION = "Dental Examination"

export function toothDiagnosisSet(t: DentalScanToothRow): Set<string> {
  const s = new Set(t.diagnoses ?? [])
  if (t.implant) s.add("Implant")
  return s
}

/** True when this scan row should render a Dr Agent tooth card (has at least one structured subsection). */
export function dentalScanToothHasAgentCardContent(t: DentalScanToothRow): boolean {
  const histRows: DentalScanHistoryRow[] = t.treatmentHistoryRows?.length
    ? t.treatmentHistoryRows
    : (t.treatmentHistory || []).map((line) => ({ name: line }))
  const hasHistory = histRows.length > 0
  const hasFindings = (t.findings?.length ?? 0) > 0
  const hasProcedures = (t.procedures?.length ?? 0) > 0
  const hasNote = !!t.scannerNotes?.trim()
  const rawDx = [...toothDiagnosisSet(t)]
  const dxArr = scanImplantRedundantWithNarrative(t, histRows) ? rawDx.filter((d) => d !== "Implant") : rawDx
  return hasHistory || hasFindings || hasProcedures || hasNote || dxArr.length > 0
}

function textMentionsImplant(s: string | undefined): boolean {
  return Boolean(s?.trim() && /implant/i.test(s))
}

/** True when implant is already described by history/procedures — skip duplicate "Implant" preview chip. */
function scanImplantRedundantWithNarrative(t: DentalScanToothRow, histRows: DentalScanHistoryRow[]): boolean {
  if (!t.implant) return false
  if (histRows.some((r) => textMentionsImplant(r.name) || textMentionsImplant(r.notes))) return true
  return (t.procedures ?? []).some((p) => textMentionsImplant(p.name) || textMentionsImplant(p.notes))
}

export function dentalScanToCanvasFindings(findings?: DentalScanToothRow["findings"]): Finding[] {
  return (findings ?? []).map((f, i) => {
    const z = (f.zoneId || "whole") as ZoneId
    const zoneId = ALL_ZONES.includes(z) ? z : "whole"
    return {
      id: `dental-block-${i}`,
      zoneId,
      type: f.type,
      notes: f.notes?.trim() ?? "",
    }
  })
}

export function toothDisplayName(fdi: string): string | null {
  const tooth = TEETH.find((x) => x.fdi === fdi)
  if (!tooth) return null
  return `${QUADRANT_LABELS[tooth.quadrant]} ${tooth.name}`
}

export function formatHistoryLineParts(r: DentalScanHistoryRow): {
  primary: string
  bracket: string
  tail?: string
  copyText: string
} {
  const primary = r.name?.trim() || "—"
  const bracket = r.surface?.trim() || "Whole tooth"
  const tailBits: string[] = []
  if (r.since?.trim()) tailBits.push(`Since ${r.since.trim()}`)
  if (r.notes?.trim()) tailBits.push(r.notes.trim())
  const tail = tailBits.length ? tailBits.join(", ") : undefined
  const base = `${primary} (${bracket})`
  const copyText = tail ? `${base} · ${tail}` : base
  return { primary, bracket, tail, copyText }
}

export function findingParts(f: NonNullable<DentalScanToothRow["findings"]>[number]): { primary: string; detail?: string } {
  const detail = [f.zoneId, f.since, f.notes?.trim()].filter(Boolean).join(", ")
  return { primary: f.type, detail: detail || undefined }
}

export function procedureParts(p: DentalScanProcedure): { primary: string; detail?: string } {
  const detail = [
    p.surface && p.surface !== "—" ? p.surface : null,
    p.date,
    p.status,
    p.notes?.trim(),
  ]
    .filter(Boolean)
    .join(", ")
  return { primary: p.name, detail: detail || undefined }
}

export function formatPrimaryDetail(parts: { primary: string; detail?: string }): string {
  return parts.detail ? `${parts.primary} (${parts.detail})` : parts.primary
}

/** Single-line summary for RxPad examinations row (radiology + voice dental). */
export function buildDentalExaminationLine(t: DentalScanToothRow): string {
  const parts: string[] = []
  if (t.implant) parts.push("Implant")
  if (t.procedures?.length) {
    parts.push(
      ...t.procedures.map((p) => {
        const bits = [p.surface && p.surface !== "—" ? `surface ${p.surface}` : null, p.date, p.status, p.notes].filter(Boolean)
        return bits.length ? `${p.name} (${bits.join(", ")})` : p.name
      }),
    )
  }
  if (t.treatmentHistoryRows?.length) {
    parts.push(...t.treatmentHistoryRows.map((r) => formatHistoryLineParts(r).copyText))
  }
  if (t.treatmentHistory?.length) parts.push(...t.treatmentHistory)
  if (t.diagnoses?.length) parts.push(...t.diagnoses.map((d) => `Dx: ${d}`))
  if (t.findings?.length) {
    parts.push(...t.findings.map((f) => formatPrimaryDetail(findingParts(f))))
  }
  if (t.scannerNotes?.trim()) parts.push(t.scannerNotes.trim())
  const body = parts.length ? parts.join(", ") : "No significant findings (verify)"
  return `T${t.fdi} — ${body}`
}

/** Compact preview chips — same violet family as dentition tooth-record tags in examination. */
function DrPreviewTag({ icon, label }: { icon: string; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full min-w-0 items-start gap-1.5 rounded-[6px] px-2 py-1",
        "bg-[var(--tp-violet-50)] text-[12px] font-semibold leading-snug text-[var(--tp-violet-800)]",
      )}
    >
      <TPMedicalIcon name={icon} variant="bulk" size={14} color="var(--tp-violet-600)" className="mt-0.5 shrink-0" />
      <span className="min-w-0 whitespace-normal break-words">{label}</span>
    </span>
  )
}

function RxBulletLine({
  primary,
  bracket,
  tail,
  copyText,
  onCopyLine,
  isTouch,
}: {
  primary: string
  bracket?: string
  tail?: string
  copyText: string
  onCopyLine: () => void
  isTouch: boolean
}) {
  return (
    <li className="group/line flex items-start gap-2 text-[12px] leading-[1.55]">
      <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-tp-slate-400" aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="font-semibold text-tp-slate-800">{primary}</span>
        {bracket ? <span className="font-normal text-tp-slate-400"> ({bracket})</span> : null}
        {tail ? <span className="font-normal text-tp-slate-400"> · {tail}</span> : null}
      </span>
      <ActionableTooltip label={`Copy: ${copyText}`} onAction={onCopyLine}>
        <CopyIcon
          size={14}
          className={cn(
            "!mt-0.5 !flex !h-7 !w-7 !shrink-0 !items-center !justify-center !rounded-md !text-[var(--tp-blue-600,#4B4AD5)] transition-opacity hover:!bg-[var(--tp-blue-50)]",
            isTouch ? "opacity-80" : "opacity-0 group-hover/line:opacity-100 focus-within:opacity-100",
          )}
        />
      </ActionableTooltip>
    </li>
  )
}

function ChatStructuredSection({
  label,
  icon,
  copyTooltip,
  onCopySection,
  isTouch,
  children,
}: {
  label: string
  icon: string
  copyTooltip: string
  onCopySection: () => void
  isTouch: boolean
  children: React.ReactNode
}) {
  return (
    <div className="group/dental-section space-y-2">
      <SectionSummaryBar
        label={label}
        icon={icon}
        marginBottom={false}
        compact
        trailing={(
          <div
            className={cn(
              "transition-opacity",
              isTouch ? "opacity-80" : "opacity-0 group-hover/dental-section:opacity-100 group-hover/section-header:opacity-100 focus-within:opacity-100",
            )}
          >
            <ActionableTooltip label={copyTooltip} onAction={onCopySection}>
              <CopyIcon
                size={14}
                className="!flex !h-7 !w-7 !items-center !justify-center !rounded-md !text-[var(--tp-blue-600,#4B4AD5)] hover:!bg-[var(--tp-blue-50)]"
              />
            </ActionableTooltip>
          </div>
        )}
      />
      {children}
    </div>
  )
}

export interface DentalExaminationToothBlockProps {
  tooth: DentalScanToothRow
  copiedKey: string | null
  onCopyClipboard: (text: string, key: string) => void
  onCopySectionLines: (lines: string[], key: string) => void
  onApplyToothToRxPad: (t: DentalScanToothRow) => void
  isTouch: boolean
  /**
   * `standalone` — full tooth card (header, border) for inline lists.
   * `stacked` — used inside Dr Agent tooth cards; use with `stackedPart` for preview vs details.
   */
  variant?: "standalone" | "stacked"
  /** When `variant="stacked"`, render only preview chips (`preview`) or only structured body (`details`). */
  stackedPart?: "preview" | "details"
  collapsible?: boolean
  defaultCollapsed?: boolean
  noteSectionLabel?: string
  emptyBodyHint?: string
  /** Merges this finding into the 3D dental chart when the user copies a finding line (Dr Agent → Dental Examination). */
  onMergeFindingToDental?: (fdi: string, finding: DentalScanFinding) => void
}

export function DentalExaminationToothBlock({
  tooth: t,
  copiedKey: _copiedKey,
  onCopyClipboard,
  onCopySectionLines,
  onApplyToothToRxPad,
  isTouch,
  variant = "standalone",
  stackedPart,
  collapsible = false,
  defaultCollapsed = false,
  noteSectionLabel = "Notes",
  emptyBodyHint = "No additional lines — correlate with the full imaging report.",
  onMergeFindingToDental,
}: DentalExaminationToothBlockProps) {
  const [open, setOpen] = useState(!defaultCollapsed)
  const stacked = variant === "stacked"
  const toothDef = TEETH.find((x) => x.fdi === t.fdi)
  const labelName = toothDisplayName(t.fdi)
  const histRows: DentalScanHistoryRow[] = t.treatmentHistoryRows?.length
    ? t.treatmentHistoryRows
    : (t.treatmentHistory || []).map((line) => ({ name: line }))
  const hasHistory = histRows.length > 0
  const hasFindings = (t.findings?.length ?? 0) > 0
  const hasProcedures = (t.procedures?.length ?? 0) > 0
  const hasNote = !!t.scannerNotes?.trim()
  const dxArrPreview = useMemo(() => {
    const raw = [...toothDiagnosisSet(t)]
    if (scanImplantRedundantWithNarrative(t, histRows)) {
      return raw.filter((d) => d !== "Implant")
    }
    return raw
  }, [t, histRows])
  const hasDx = dxArrPreview.length > 0
  const hasBody = hasHistory || hasFindings || hasProcedures || hasNote || hasDx
  const canvasFindings = dentalScanToCanvasFindings(t.findings)

  const historyLines = histRows.map((r) => formatHistoryLineParts(r).copyText)
  const findingLines = (t.findings ?? []).map((f) => formatPrimaryDetail(findingParts(f)))
  const procedureLines = (t.procedures ?? []).map((p) => formatPrimaryDetail(procedureParts(p)))
  const dxLines = useMemo(() => dxArrPreview.map((d) => `Dx: ${d}`), [dxArrPreview])
  const toothTitle = labelName ?? `Tooth ${t.fdi}`

  const previewTags = (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1",
        stacked ? "py-0.5" : "px-3 pb-2.5 pl-[62px] pt-1",
      )}
    >
      {dxArrPreview.map((d) => (
        <DrPreviewTag key={`dx-${d}`} icon="diagnosis" label={d} />
      ))}
      {histRows.map((r, i) => {
        const hp = formatHistoryLineParts(r)
        return <DrPreviewTag key={`h-${i}-${hp.primary}`} icon="clipboard-activity" label={hp.primary} />
      })}
      {(t.findings ?? []).map((f, i) => (
        <DrPreviewTag key={`f-${i}-${f.type}`} icon="diagnosis" label={f.type} />
      ))}
      {(t.procedures ?? []).map((p, i) => (
        <DrPreviewTag
          key={`p-${i}-${p.name ?? i}`}
          icon="surgical-scissors-02"
          label={p.name?.trim() || "Procedure"}
        />
      ))}
      {hasNote ? <DrPreviewTag icon="note-2" label="Notes" /> : null}
    </div>
  )

  const showPreviewRow =
    dxArrPreview.length > 0 ||
    histRows.length > 0 ||
    (t.findings?.length ?? 0) > 0 ||
    (t.procedures?.length ?? 0) > 0 ||
    hasNote

  const structuredDetails = hasBody ? (
    <div className={cn("space-y-4", stacked ? "py-0" : "px-3 py-2.5")}>
      {hasDx ? (
        <ChatStructuredSection
          label="Diagnoses"
          icon="diagnosis"
          copyTooltip={`Copy diagnoses for ${DENTAL_EXAMINATION}`}
          onCopySection={() => onCopySectionLines(dxLines, `dx-${t.fdi}`)}
          isTouch={isTouch}
        >
          <ul className="flex flex-col gap-2 pl-0.5">
            {dxArrPreview.map((d, i) => (
              <RxBulletLine
                key={i}
                primary={d}
                copyText={d}
                onCopyLine={() => onCopyClipboard(d, `th-${t.fdi}-dx-${i}`)}
                isTouch={isTouch}
              />
            ))}
          </ul>
        </ChatStructuredSection>
      ) : null}

      {hasHistory ? (
        <ChatStructuredSection
          label="Treatment history"
          icon="clipboard-activity"
          copyTooltip={`Copy treatment history for ${DENTAL_EXAMINATION}`}
          onCopySection={() => onCopySectionLines(historyLines, `th-${t.fdi}`)}
          isTouch={isTouch}
        >
          <ul className="flex flex-col gap-2 pl-0.5">
            {histRows.map((r, i) => {
              const p = formatHistoryLineParts(r)
              return (
                <RxBulletLine
                  key={i}
                  primary={p.primary}
                  bracket={p.bracket}
                  tail={p.tail}
                  copyText={p.copyText}
                  onCopyLine={() => onCopyClipboard(p.copyText, `th-${t.fdi}-hist-${i}`)}
                  isTouch={isTouch}
                />
              )
            })}
          </ul>
        </ChatStructuredSection>
      ) : null}

      {hasFindings ? (
        <ChatStructuredSection
          label="Findings"
          icon="diagnosis"
          copyTooltip={`Copy all findings for ${DENTAL_EXAMINATION}`}
          onCopySection={() => onCopySectionLines(findingLines, `fg-${t.fdi}`)}
          isTouch={isTouch}
        >
          <ul className="flex flex-col gap-2 pl-0.5">
            {(t.findings ?? []).map((f, i) => {
              const p = findingParts(f)
              const line = formatPrimaryDetail(p)
              return (
                <RxBulletLine
                  key={i}
                  primary={p.primary}
                  bracket={p.detail}
                  copyText={line}
                  onCopyLine={() => {
                    onCopyClipboard(line, `th-${t.fdi}-find-${i}`)
                    onMergeFindingToDental?.(t.fdi, f)
                  }}
                  isTouch={isTouch}
                />
              )
            })}
          </ul>
        </ChatStructuredSection>
      ) : null}

      {hasProcedures ? (
        <ChatStructuredSection
          label="Procedures"
          icon="surgical-scissors-02"
          copyTooltip={`Copy procedures for ${DENTAL_EXAMINATION}`}
          onCopySection={() => onCopySectionLines(procedureLines, `pr-${t.fdi}`)}
          isTouch={isTouch}
        >
          <ul className="flex flex-col gap-2 pl-0.5">
            {(t.procedures ?? []).map((pRow, i) => {
              const p = procedureParts(pRow)
              const line = formatPrimaryDetail(p)
              return (
                <RxBulletLine
                  key={i}
                  primary={p.primary}
                  bracket={p.detail}
                  copyText={line}
                  onCopyLine={() => onCopyClipboard(line, `th-${t.fdi}-proc-${i}`)}
                  isTouch={isTouch}
                />
              )
            })}
          </ul>
        </ChatStructuredSection>
      ) : null}

      {hasNote ? (
        <ChatStructuredSection
          label={noteSectionLabel}
          icon="note-2"
          copyTooltip={`Copy note for ${DENTAL_EXAMINATION}`}
          onCopySection={() => onCopyClipboard(t.scannerNotes!.trim(), `note-${t.fdi}`)}
          isTouch={isTouch}
        >
          <div className="group/note flex items-start gap-1 pl-3">
            <p className="min-w-0 flex-1 text-[12px] font-normal leading-[1.55] text-tp-slate-700">{t.scannerNotes!.trim()}</p>
            <ActionableTooltip label="Copy note text" onAction={() => onCopyClipboard(t.scannerNotes!.trim(), `note-${t.fdi}-line`)}>
              <CopyIcon
                size={14}
                className={cn(
                  "!mt-0.5 !flex !h-7 !w-7 !shrink-0 !items-center !justify-center !rounded-md !text-[var(--tp-blue-600,#4B4AD5)] transition-opacity hover:!bg-[var(--tp-blue-50)]",
                  isTouch ? "opacity-80" : "opacity-0 group-hover/dental-section:opacity-100 group-hover/note:opacity-100 focus-within:opacity-100",
                )}
              />
            </ActionableTooltip>
          </div>
        </ChatStructuredSection>
      ) : null}
    </div>
  ) : (
    <p className={cn("py-2 text-[12px] text-tp-slate-500", !stacked && "px-3")}>{emptyBodyHint}</p>
  )

  /** Stacked: split preview / details for CardShell pinned body */
  if (stacked && stackedPart === "preview") {
    return showPreviewRow ? previewTags : <div className="py-0.5 text-[12px] text-tp-slate-400">No quick tags for this tooth.</div>
  }
  if (stacked && stackedPart === "details") {
    return structuredDetails
  }

  /** Legacy stacked one-column (should not be used) */
  if (stacked) {
    return (
      <div className="flex flex-col gap-2">
        {showPreviewRow ? previewTags : null}
        {structuredDetails}
      </div>
    )
  }

  const headerBar = (
    <div
      className="border-b border-[var(--tp-slate-100,#F1F5F9)]"
      style={{
        background: "linear-gradient(180deg, rgba(75,74,213,0.06) 0%, rgba(255,255,255,0.92) 100%)",
      }}
    >
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <div className="shrink-0 rounded-[10px] bg-white/80 p-0.5 ring-1 ring-tp-slate-100">
          {toothDef ? (
            <MiniToothCanvas
              tooth={toothDef}
              size={48}
              diagnoses={toothDiagnosisSet(t)}
              isImplant={!!t.implant}
              findings={canvasFindings}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center text-[10px] text-tp-slate-400">—</div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span
              className="min-w-0 truncate text-[14px] font-semibold leading-tight text-tp-slate-900"
              title={toothTitle}
            >
              {toothTitle}
            </span>
            <span className="inline-flex h-[22px] w-fit min-w-[2.25rem] items-center justify-center rounded-[4px] bg-tp-slate-100 px-2 font-mono text-[11px] font-bold tabular-nums leading-none text-tp-slate-600">
              T{t.fdi}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <ActionableTooltip label={`Apply tooth T${t.fdi} to ${DENTAL_EXAMINATION}`} onAction={() => onApplyToothToRxPad(t)}>
            <CopyIcon
              size={18}
              className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg hover:bg-white/90"
            />
          </ActionableTooltip>
          {collapsible ? (
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-tp-slate-600 outline-none transition-colors hover:bg-white/90 hover:text-tp-slate-900 focus-visible:ring-2 focus-visible:ring-[var(--tp-blue-500,#4B4AD5)] focus-visible:ring-offset-1"
                aria-expanded={open}
                aria-label={open ? "Collapse tooth details" : "Expand tooth details"}
              >
                <ArrowDown2
                  size={18}
                  variant="Linear"
                  color="currentColor"
                  className={cn("transition-transform duration-200", open ? "rotate-180" : "rotate-0")}
                />
              </button>
            </CollapsibleTrigger>
          ) : null}
        </div>
      </div>
      {showPreviewRow ? previewTags : null}
    </div>
  )

  const shell = (
    <div className="overflow-hidden rounded-[12px] border border-tp-slate-100 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      {headerBar}
      {collapsible ? (
        <CollapsibleContent className="overflow-hidden">
          {structuredDetails}
        </CollapsibleContent>
      ) : (
        structuredDetails
      )}
    </div>
  )

  if (!collapsible) return shell

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {shell}
    </Collapsible>
  )
}
