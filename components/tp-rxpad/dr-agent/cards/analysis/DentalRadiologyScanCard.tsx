"use client"

import React, { useCallback, useMemo, useState } from "react"
import { CardShell } from "../CardShell"
import type { DentalScanFinding, DentalScanToothRow } from "../../types"
import type { RxPadCopyPayload } from "@/components/tp-rxpad/rxpad-sync-context"
import { useDrAgentRuntime } from "../../DrAgentRuntimeContext"
import { useChartLinkedPatientId } from "../../shared/use-chart-linked-patient-id"
import { emitDentalScanApplyNormalized } from "@/components/tp-rxpad/dental-ai/emit-dental-scan-apply"
import { useTouchDevice } from "@/hooks/use-touch-device"
import { TEETH } from "@/components/dental/examination/types"
import { MiniToothCanvas } from "@/components/dental/examination/MiniToothCanvas"
import {
  buildDentalExaminationLine,
  DentalExaminationToothBlock,
  DENTAL_EXAMINATION,
  dentalScanToothHasAgentCardContent,
  dentalScanToCanvasFindings,
  toothDiagnosisSet,
  toothDisplayName,
} from "../shared/DentalExaminationToothBlock"
export type DentalRadiologyScanCardData = {
  title: string
  scanSubtitle?: string
  category?: string
  summary?: string
  summaryPoints?: string[]
  fileLabel?: string
  teeth: DentalScanToothRow[]
}

interface DentalRadiologyScanCardProps {
  data: DentalRadiologyScanCardData
  onCopy?: (payload: RxPadCopyPayload) => void
}

export function DentalRadiologyScanCard({ data, onCopy }: DentalRadiologyScanCardProps) {
  const { dentalChartPatientId } = useDrAgentRuntime()
  const chartPatientId = useChartLinkedPatientId(dentalChartPatientId)
  const isTouch = useTouchDevice()
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const teethForCards = useMemo(() => data.teeth.filter(dentalScanToothHasAgentCardContent), [data.teeth])
  const examinationLines = useMemo(() => teethForCards.map((t) => buildDentalExaminationLine(t)), [teethForCards])

  const handleCopyAllToRxPad = useCallback(() => {
    onCopy?.({
      sourceDateLabel: "Dental radiology scan",
      examinations: examinationLines,
      dentalScanApply: {
        patientId: chartPatientId,
        teeth: teethForCards,
      },
    })
  }, [chartPatientId, examinationLines, onCopy, teethForCards])

  const handleCopyOneTooth = useCallback(
    (t: DentalScanToothRow) => {
      onCopy?.({
        sourceDateLabel: `Dental radiology · T${t.fdi}`,
        examinations: [buildDentalExaminationLine(t)],
        dentalScanApply: {
          patientId: chartPatientId,
          teeth: [t],
        },
      })
    },
    [chartPatientId, onCopy],
  )

  const handleCopyClipboard = useCallback((text: string, key: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 1200)
  }, [])

  const handleCopySectionLines = useCallback((lines: string[], key: string) => {
    const text = lines.join("\n")
    navigator.clipboard?.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 1200)
  }, [])

  const handleMergeFindingToDental = useCallback(
    (fdi: string, finding: DentalScanFinding) => {
      if (!chartPatientId) return
      emitDentalScanApplyNormalized({
        patientId: chartPatientId,
        teeth: [{ fdi, findings: [finding] }],
        openFullDentition: false,
        focusFdi: fdi,
        highlightFdis: [fdi],
      })
    },
    [chartPatientId],
  )

  /** Under-title line: count of tooth rows shown (replaces scan date in header). */
  const headerSubtitle = useMemo(() => {
    const n = teethForCards.length
    if (n === 0) return undefined
    return `${n} tooth record${n === 1 ? "" : "s"}`
  }, [teethForCards.length])

  const leadBody = (
    <div className="flex flex-col gap-3">
      {data.summary?.trim() ? (
        <p className="text-[14px] leading-[1.55] text-tp-slate-600">{data.summary.trim()}</p>
      ) : null}
      {data.summaryPoints && data.summaryPoints.length > 0 ? (
        <ul className="list-inside list-disc space-y-1 text-[14px] leading-[1.55] text-tp-slate-700">
          {data.summaryPoints.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )

  if (data.teeth.length === 0) {
    return (
      <CardShell
        icon={<span />}
        tpIconName="medical service"
        title={data.title}
        date={headerSubtitle}
        collapsible={false}
        copyAll={handleCopyAllToRxPad}
        copyAllTooltip={`Apply all teeth to ${DENTAL_EXAMINATION}`}
      >
        {leadBody}
      </CardShell>
    )
  }

  const copyTooltip =
    teethForCards.length > 0
      ? `Apply all ${teethForCards.length} teeth to ${DENTAL_EXAMINATION}`
      : `Apply scan summary to ${DENTAL_EXAMINATION}`

  return (
    <CardShell
      icon={<span />}
      tpIconName="medical service"
      title={data.title}
      date={headerSubtitle}
      collapsible={false}
      copyAll={handleCopyAllToRxPad}
      copyAllTooltip={copyTooltip}
    >
      <div className="flex w-full min-w-0 flex-col gap-3">
        {leadBody}
        {teethForCards.length > 0 ? (
            <div className="flex w-full min-w-0 flex-col gap-2.5">
              {teethForCards.map((t) => {
                const toothDef = TEETH.find((x) => x.fdi === t.fdi)
                return (
                  <CardShell
                    key={t.fdi}
                    icon={<span />}
                    title={toothDisplayName(t.fdi) ?? `Tooth ${t.fdi}`}
                    badgeBelowTitle
                    badge={{
                      label: `T${t.fdi}`,
                      color: "var(--tp-slate-700,#334155)",
                      bg: "var(--tp-slate-100,#F1F5F9)",
                    }}
                    leadingVisual={
                      toothDef ? (
                        <MiniToothCanvas
                          tooth={toothDef}
                          size={40}
                          diagnoses={toothDiagnosisSet(t)}
                          isImplant={!!t.implant}
                          findings={dentalScanToCanvasFindings(t.findings)}
                        />
                      ) : (
                        <span className="text-[10px] text-tp-slate-400">—</span>
                      )
                    }
                    collapsible
                    defaultCollapsed
                    collapseIcon="chevron"
                    largeCollapseControl
                    copyAll={() => handleCopyOneTooth(t)}
                    copyAllTooltip={`Apply T${t.fdi} to ${DENTAL_EXAMINATION}`}
                    pinnedBody={(
                      <DentalExaminationToothBlock
                        variant="stacked"
                        stackedPart="preview"
                        tooth={t}
                        copiedKey={copiedKey}
                        onCopyClipboard={handleCopyClipboard}
                        onCopySectionLines={handleCopySectionLines}
                        onApplyToothToRxPad={handleCopyOneTooth}
                        isTouch={isTouch}
                        onMergeFindingToDental={handleMergeFindingToDental}
                      />
                    )}
                  >
                    <DentalExaminationToothBlock
                      variant="stacked"
                      stackedPart="details"
                      tooth={t}
                      copiedKey={copiedKey}
                      onCopyClipboard={handleCopyClipboard}
                      onCopySectionLines={handleCopySectionLines}
                      onApplyToothToRxPad={handleCopyOneTooth}
                      isTouch={isTouch}
                      onMergeFindingToDental={handleMergeFindingToDental}
                      emptyBodyHint="No tooth-level lines were parsed from this scan."
                    />
                  </CardShell>
                )
              })}
            </div>
        ) : null}
      </div>
    </CardShell>
  )
}
