"use client"

import React, { useCallback, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { useTouchDevice } from "@/hooks/use-touch-device"
import { CardShell } from "../CardShell"
import { CopyIcon } from "../CopyIcon"
import { ActionableTooltip } from "../ActionableTooltip"
import { SectionSummaryBar } from "../SectionSummaryBar"
import type { VoiceStructuredRxData, VoiceRxItem, VoiceRxSection, DentalScanFinding, DentalScanToothRow } from "../../types"
import type { RxPadCopyPayload } from "@/components/tp-rxpad/rxpad-sync-context"
import { parseMedString, sortPrimaryVoiceSections, formatVoiceRxItemPublic } from "../../engines/voice-rx-engine"
import { useDrAgentRuntime } from "../../DrAgentRuntimeContext"
import { useChartLinkedPatientId } from "../../shared/use-chart-linked-patient-id"
import { emitDentalScanApplyNormalized } from "@/components/tp-rxpad/dental-ai/emit-dental-scan-apply"
import {
  buildDentalExaminationLine,
  dentalScanToCanvasFindings,
  DentalExaminationToothBlock,
  DENTAL_EXAMINATION,
  dentalScanToothHasAgentCardContent,
  toothDiagnosisSet,
  toothDisplayName,
} from "../shared/DentalExaminationToothBlock"
import { TEETH } from "@/components/dental/examination/types"
import { MiniToothCanvas } from "@/components/dental/examination/MiniToothCanvas"
interface VoiceStructuredRxCardProps {
  data: VoiceStructuredRxData
  onCopy?: (payload: RxPadCopyPayload) => void
}

export function VoiceStructuredRxCard({ data, onCopy }: VoiceStructuredRxCardProps) {
  const { dentalChartPatientId } = useDrAgentRuntime()
  const chartPatientId = useChartLinkedPatientId(dentalChartPatientId)
  const isTouch = useTouchDevice()
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const teeth = data.dentalTeeth ?? []
  const teethForCards = useMemo(() => teeth.filter(dentalScanToothHasAgentCardContent), [teeth])
  const examinationLines = useMemo(() => teethForCards.map((t) => buildDentalExaminationLine(t)), [teethForCards])
  const clinical = data.clinicalExam
  const orderedPrimary = useMemo(() => sortPrimaryVoiceSections(data.sections), [data.sections])

  const handleCopyAllToRxPad = useCallback(() => {
    if (!onCopy) return
    const base = { ...data.copyAllPayload, sourceDateLabel: "Voice capture" as const }
    if (teethForCards.length) {
      onCopy({
        ...base,
        examinations: examinationLines.length ? examinationLines : base.examinations,
        dentalScanApply: {
          patientId: chartPatientId,
          teeth: teethForCards,
        },
      })
    } else {
      onCopy(base)
    }
  }, [data.copyAllPayload, chartPatientId, examinationLines, onCopy, teethForCards])

  const handleCopyOneTooth = useCallback(
    (t: DentalScanToothRow) => {
      onCopy?.({
        sourceDateLabel: `Voice capture · T${t.fdi}`,
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
    navigator.clipboard?.writeText(lines.join("\n"))
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

  const handleCopyItem = (sectionId: string, item: VoiceRxItem, key: string) => {
    const line = formatVoiceRxItemPublic(item)
    if (onCopy) {
      const base: RxPadCopyPayload = { sourceDateLabel: "Voice capture" }
      if (sectionId === "symptoms") onCopy({ ...base, symptoms: [line] })
      else if (sectionId === "medication") onCopy({ ...base, medications: [parseMedString(line)] })
      else if (sectionId === "investigation") onCopy({ ...base, labInvestigations: [line] })
    } else {
      navigator.clipboard?.writeText(line)
    }
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 1400)
  }

  const handleCopySection = (section: VoiceRxSection) => {
    const lines = section.items.map(formatVoiceRxItemPublic)
    if (onCopy) {
      const base: RxPadCopyPayload = { sourceDateLabel: "Voice capture" }
      if (section.sectionId === "symptoms") onCopy({ ...base, symptoms: lines })
      else if (section.sectionId === "medication") onCopy({ ...base, medications: lines.map(parseMedString) })
      else if (section.sectionId === "investigation") onCopy({ ...base, labInvestigations: lines })
    } else {
      navigator.clipboard?.writeText(lines.join("\n"))
    }
    setCopiedKey(`section-${section.sectionId}`)
    setTimeout(() => setCopiedKey(null), 1400)
  }

  const structuredClinical = (
    <div className="flex flex-col gap-[8px]">
        {orderedPrimary.map((section) => (
          <div key={section.sectionId}>
            <SectionSummaryBar
              label={section.title}
              icon={section.tpIconName}
              trailing={(
                <span className={cn("transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/section-header:opacity-100")}>
                  <ActionableTooltip
                    label={`Fill ${section.title.toLowerCase()} to RxPad`}
                    onAction={() => handleCopySection(section)}
                  >
                    {copiedKey === `section-${section.sectionId}` ? (
                      <span className="text-[12px] font-semibold text-emerald-600">In RxPad</span>
                    ) : (
                      <CopyIcon size={14} onClick={() => handleCopySection(section)} />
                    )}
                  </ActionableTooltip>
                </span>
              )}
            />
            <ul className="mt-1 flex flex-col gap-[2px] pl-1">
              {section.items.map((item, idx) => {
                const itemKey = `${section.sectionId}-${idx}`
                return (
                  <li
                    key={idx}
                    className="group/voice-item flex items-start gap-[6px] rounded-[4px] px-1 -mx-1 py-[2px] text-[14px] leading-[1.6] text-tp-slate-700 transition-colors hover:bg-tp-slate-50/80"
                  >
                    <span className="mt-[1px] flex-shrink-0 text-tp-slate-400">•</span>
                    <span className="flex-1 font-normal text-tp-slate-700">
                      {item.name}
                      {item.detail && (
                        <span className="ml-1 text-tp-slate-400">({item.detail})</span>
                      )}
                    </span>
                    <span className={cn("flex-shrink-0 transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/voice-item:opacity-100")}>
                      {copiedKey === itemKey ? (
                        <span className="text-[12px] font-semibold text-emerald-600">In RxPad</span>
                      ) : (
                        <ActionableTooltip label="Fill to RxPad" onAction={() => handleCopyItem(section.sectionId, item, itemKey)}>
                          <CopyIcon size={14} onClick={() => handleCopyItem(section.sectionId, item, itemKey)} />
                        </ActionableTooltip>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
    </div>
  )

  const dentalBlock =
    teethForCards.length > 0 ? (
      <div className="flex w-full min-w-0 flex-col gap-2">
        <SectionSummaryBar label={DENTAL_EXAMINATION} icon="tooth" marginBottom={false} />
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
                emptyBodyHint="No tooth-level lines were parsed from this dictation."
              />
            </CardShell>
          )
          })}
        </div>
      </div>
    ) : null

  return (
    <CardShell
      icon={<span />}
      tpIconName="medical-record"
      title={clinical?.title ?? "Voice recorder"}
      date={clinical?.subtitle}
      collapsible={false}
      copyAll={handleCopyAllToRxPad}
      copyAllTooltip={
        teethForCards.length
          ? `Apply structured Rx and all ${teethForCards.length} teeth to RxPad / ${DENTAL_EXAMINATION}`
          : "Apply voice capture to RxPad"
      }
    >
      <div className="flex flex-col gap-3">
        {structuredClinical}
        {dentalBlock}
      </div>
    </CardShell>
  )
}
