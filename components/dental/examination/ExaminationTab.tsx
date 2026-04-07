"use client"

/**
 * ExaminationTab — side-by-side layout:
 *   Left: 3D dental canvas (SSR-safe dynamic import)
 *   Right: Context-aware panel —
 *     • Dentition view → Dental Score card + per-tooth examination summary
 *     • Single-tooth view → Tooth header (with Back arrow) + primary diagnosis
 *       section + surface examination section + general chip sections + Save footer
 *
 * Typography: 14px / 12px baseline; 10px only for tiny meta.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { InfoCircle, TickCircle, ArrowLeft2, Eye, Trash, ArrowRight2, Grid5, Ram, Eraser, More, Add, Edit2, Calendar, SearchNormal1, DocumentText, Mouse, Note1, Chart, Health, ArrowDown2, SidebarRight } from "iconsax-reactjs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ExpandIcon, MinimizeIcon } from "./ui-icons"
import { DentalCanvas } from "./DentalCanvas"
import type { DentalCanvasState } from "./DentalCanvas"
import { DIAGNOSES, TOOTH_DIAGNOSES, ZONE_INFO, ALL_ZONES, getZoneLabel, TEETH, PROCEDURE_CATALOG, QUADRANT_LABELS, getDefaultTreatmentSurfaces } from "./types"
import type { ZoneId, ToothEntry } from "./types"
import { MiniToothCanvas } from "./MiniToothCanvas"
import { MiniScopeCanvas } from "./MiniScopeCanvas"
import { TPMedicalIcon } from "@/components/tp-ui/medical-icons"

interface ExaminationTabProps {
  patientId: string
  patientAge?: number
}

// Score weights per diagnosis/finding severity (out of 100).
const DIAG_WEIGHT: Record<string, number> = {
  Missing: 8, Implant: 2, RCT: 4, Crown: 2, Bridge: 3, Denture: 3,
}

/** Accent colors per tooth-level diagnosis — makes each chip visually distinct */
const PRIMARY_DIAG_COLOR: Record<string, string> = {
  Implant: "#0891b2",   // cyan
  Missing: "#dc2626",   // red
  RCT: "#ea580c",   // orange
  Crown: "#d4af37",   // gold
  Bridge: "#a16207",   // amber-brown
  Denture: "#ec4899",   // pink
  Extraction: "#b91c1c",   // dark red (similar to missing)
  "Composite Filling": "#f5f5f4",   // off-white (filling material)
  Scaling: "#059669",   // emerald
  Polishing: "#10b981",   // green
  Veneer: "#e2e8f0",   // light porcelain
  "Pulp Cap": "#f97316",   // orange
  "Root Planing": "#0d9488",   // teal
  "Fluoride Treatment": "#06b6d4", // cyan-light
}
const FINDING_WEIGHT: Record<string, number> = {
  "Cavity/Caries": 3, "Crack": 2, "Fracture": 4, "Erosion": 2, "Abrasion": 1,
  "Attrition": 1, "Staining": 0.5, "Plaque": 0.5, "Calculus": 1, "Restoration Defect": 2,
  "NCCL": 1, "Sensitivity": 1, "Resorption": 3, "Recession": 2, "Normal": 0,
}

function computeDentalScore(state: DentalCanvasState | null): {
  score: number
  rating: "Excellent" | "Good" | "Fair" | "Needs attention" | "Poor"
  totalDeduction: number
  affectedTeeth: number
  breakdown: { diag: number; findings: number }
} {
  if (!state) return { score: 100, rating: "Excellent", totalDeduction: 0, affectedTeeth: 0, breakdown: { diag: 0, findings: 0 } }
  let diag = 0, findings = 0
  const affected = new Set<string>()
  for (const [fdi, diagSet] of Object.entries(state.toothDiagnoses)) {
    diagSet.forEach((d) => { diag += DIAG_WEIGHT[d] ?? 0; affected.add(fdi) })
  }
  state.implantTeeth.forEach((fdi) => { diag += DIAG_WEIGHT.Implant; affected.add(fdi) })
  for (const [fdi, findingsList] of Object.entries(state.findingsByTooth)) {
    findingsList.forEach((f) => { findings += FINDING_WEIGHT[f.type] ?? 0; affected.add(fdi) })
  }
  const totalDeduction = Math.min(100, Math.round(diag + findings))
  const score = Math.max(0, 100 - totalDeduction)
  const rating =
    score >= 90 ? "Excellent" as const :
      score >= 75 ? "Good" as const :
        score >= 60 ? "Fair" as const :
          score >= 40 ? "Needs attention" as const : "Poor" as const
  return { score, rating, totalDeduction, affectedTeeth: affected.size, breakdown: { diag: Math.round(diag), findings: Math.round(findings) } }
}

export function ExaminationTab({ patientId, patientAge = 30 }: ExaminationTabProps) {
  const [canvasState, setCanvasState] = useState<DentalCanvasState | null>(null)
  const isSingle = canvasState?.viewMode === "single-tooth"
  const containerRef = useRef<HTMLDivElement>(null)
  // Separate persisted widths for dentition vs single-tooth. Both draggable 40-60.
  // Defer localStorage read to useEffect so SSR + first client render match.
  // Default: dentition 35% (canvas takes 65%); single-tooth 65% content / 35% canvas.
  const [dentitionAsidePct, setDentitionAsidePct] = useState<number>(35)
  const [singleAsidePct, setSingleAsidePct] = useState<number>(65)
  useEffect(() => {
    if (typeof window === "undefined") return
    const defaultSingle = 65
    setSingleAsidePct(defaultSingle)
    const d = parseFloat(window.localStorage.getItem("dental.aside.pct.dentition") ?? "")
    if (Number.isFinite(d) && d >= 30 && d <= 40) setDentitionAsidePct(d)
    const s = parseFloat(window.localStorage.getItem("dental.aside.pct.single") ?? "")
    if (Number.isFinite(s) && s >= 50 && s <= 70) setSingleAsidePct(s)
  }, [])
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: PointerEvent) => {
      e.preventDefault()
      const el = containerRef.current
      if (!el) return
      const x = e.clientX
      const r = el.getBoundingClientRect()
      const [min, max] = isSingle ? [50, 70] : [30, 40]
      // Panel is on the RIGHT now → measure from right edge.
      const pct = Math.min(max, Math.max(min, ((r.right - x) / r.width) * 100))
      if (isSingle) setSingleAsidePct(pct)
      else setDentitionAsidePct(pct)
    }
    const onUp = () => setDragging(false)
    window.addEventListener("pointermove", onMove, { passive: false })
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [dragging, isSingle])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dental.aside.pct.dentition", String(dentitionAsidePct))
    }
  }, [dentitionAsidePct])
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dental.aside.pct.single", String(singleAsidePct))
    }
  }, [singleAsidePct])

  const asidePct = isSingle ? singleAsidePct : dentitionAsidePct
  const canvasPct = 100 - asidePct
  
  const isGetStarted = !isSingle && !!canvasState &&
    Object.values(canvasState.toothDiagnoses).every((s) => s.size === 0) &&
    canvasState.implantTeeth.size === 0 &&
    Object.values(canvasState.findingsByTooth).every((a) => a.length === 0) &&
    canvasState.allEntries.length === 0

  return (
    <div ref={containerRef} className={`relative flex h-full w-full overflow-hidden bg-tp-slate-100 p-[18px] ${isGetStarted ? 'gap-[18px]' : ''}`}>
      {/* Left: 3D canvas — plain white with subtle grid + minimal dots */}
      <div
        className="relative min-w-0 rounded-[20px] overflow-hidden bg-white"
        style={{
          width: isGetStarted ? undefined : `${canvasPct}%`,
          flex: isGetStarted ? "1" : "none",
          transition: dragging ? "none" : "width 350ms ease-out",
        }}
      >
        {/* Subtle graph-paper grid — medium squares, very light */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,0.025) 1px, transparent 1px)," +
              "linear-gradient(to bottom, rgba(15,23,42,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Smaller, lighter dot texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(15,23,42,0.04) 0.6px, transparent 0.9px)",
            backgroundSize: "16px 16px",
          }}
        />
        {/* Soft focal spotlight on 3D subject */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 55% 42% at 50% 38%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 55%, transparent 78%)",
          }}
        />
        <div className="relative z-10 h-full w-full">
          <DentalCanvas
            patientId={patientId}
            patientAge={patientAge}
            onStateChange={setCanvasState}
          />
        </div>
      </div>

      {/* Invisible drag handle — icon sticks to canvas right edge */}
      {!isGetStarted && (
        <button
          type="button"
          role="separator"
          aria-label="Resize panel"
          aria-orientation="vertical"
          onPointerDown={(e) => {
            // Prevent pointer events so they don't trigger RxPad's swipe gesture or native swipe logic
            e.preventDefault()
            e.stopPropagation()
            e.currentTarget.setPointerCapture(e.pointerId)
            setDragging(true)
          }}
          className="relative w-0 shrink-0 cursor-col-resize touch-none z-40 focus:outline-none appearance-none bg-transparent border-none p-0"
        >
          <span className="absolute inset-y-0 -left-[20px] -right-[20px] touch-none" />
          <img
            src="/icons/ui/drag-handle.svg"
            alt=""
            draggable={false}
            className="pointer-events-none absolute top-1/2 z-30 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
            style={{ display: "block", width: "22px", height: "32px", maxWidth: "none", left: "-11px" }}
          />
        </button>
      )}

      {/* Right: Context-aware panel */}
      <aside
        className={`flex shrink-0 flex-col overflow-hidden ${isGetStarted ? 'bg-transparent w-auto h-full' : 'bg-tp-slate-100'}`}
        style={{
          width: isGetStarted ? "auto" : `${asidePct}%`,
          transition: dragging ? "none" : "width 350ms ease-out"
        }}
      >
        <div
          key={isSingle ? `single-${canvasState?.selectedTooth?.fdi}` : "dentition"}
          className="flex h-full w-full flex-col"
          style={{
            animation: isSingle
              ? "dentalCardExpand 380ms cubic-bezier(0.34, 1.2, 0.64, 1)"
              : "dentalCardCollapse 320ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            transformOrigin: "center top",
          }}
        >
          {isSingle && canvasState ? (
            <div className="flex h-full w-full flex-col pl-[18px]">
              {/* Expanding card wrapping the whole single-tooth view */}
              <div className="flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-white border-[2px] border-white">
                <SingleToothPanel state={canvasState} />
              </div>
            </div>
          ) : (
            <div className={isGetStarted ? "flex-1 overflow-y-auto w-full min-w-[300px] max-w-[350px] mx-auto" : "flex-1 overflow-y-auto pl-[18px]"}>
              <DentitionPanel state={canvasState} />
            </div>
          )}
        </div>
        <style jsx global>{`
          @keyframes dentalCardExpand {
            0%   { opacity: 0; transform: scale(0.72) translateY(40px); }
            60%  { opacity: 1; }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes dentalCardCollapse {
            from { opacity: 0; transform: scale(1.04) translateY(-6px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
      </aside>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// Dentition panel: Patient Dental Score + per-tooth summary
// Clicking any summary row → opens that tooth's single view.
// ──────────────────────────────────────────────────────────────
function DentitionPanel({ state }: { state: DentalCanvasState | null }) {
  const scoreData = useMemo(() => computeDentalScore(state), [state])
  const [showFormula, setShowFormula] = useState(false)
  const infoBtnRef = useRef<HTMLDivElement>(null)

  const summary = useMemo(() => {
    if (!state) return []
    type SummaryEntry = {
      fdi: string; diagnoses: string[]; findings: string[]
      findingCount: number; procedureCount: number
    }
    const map = new Map<string, SummaryEntry>()
    const seed = (fdi: string): SummaryEntry => {
      const ex = map.get(fdi)
      if (ex) return ex
      const next: SummaryEntry = { fdi, diagnoses: [], findings: [], findingCount: 0, procedureCount: 0 }
      map.set(fdi, next)
      return next
    }
    for (const [fdi, diagSet] of Object.entries(state.toothDiagnoses)) {
      if (diagSet.size > 0) seed(fdi).diagnoses = [...diagSet]
    }
    state.implantTeeth.forEach((fdi) => {
      const e = seed(fdi)
      if (!e.diagnoses.includes("Implant")) e.diagnoses.push("Implant")
    })
    for (const [fdi, findings] of Object.entries(state.findingsByTooth)) {
      if (findings.length > 0) seed(fdi).findings = Array.from(new Set(findings.map((f) => f.type)))
    }
    for (const e of state.allEntries) {
      if (e.kind === "finding") seed(e.toothFdi).findingCount += 1
      else seed(e.toothFdi).procedureCount += 1
    }
    return Array.from(map.values())
      .filter((e) => e.diagnoses.length || e.findings.length || e.findingCount || e.procedureCount)
      .sort((a, b) => a.fdi.localeCompare(b.fdi))
  }, [state])

  const openTooth = (fdi: string) => {
    if (!state) return
    const tooth = TEETH.find((t) => t.fdi === fdi)
    if (tooth) state.onSelectTooth(tooth)
  }

  return (
    <>
      {summary.length > 0 ? (
        <>
          <ScoreCard data={scoreData} infoBtnRef={infoBtnRef} showFormula={showFormula} setShowFormula={setShowFormula} />

          {/* Tooth records */}
          <div className="mt-[20px] mb-[10px] flex items-center gap-[8px] px-[2px]">
            <h3 className="font-sans text-[14px] font-semibold text-tp-slate-800">
              Tooth records
            </h3>
            <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-tp-slate-200 font-sans text-[12px] font-bold text-tp-slate-600 tabular-nums">
              {summary.length}
            </span>
          </div>

          <div className="flex flex-col gap-[8px]">
            {summary.map((entry) => {
              const tooth = TEETH.find((t) => t.fdi === entry.fdi)
              const toothName = tooth ? `${QUADRANT_LABELS[tooth.quadrant]} ${tooth.name}` : ""
              const isMax = tooth?.arch === "maxillary"
              // Determine thumbnail color by most-severe diagnosis
              let crownColor = "#E8DDD5", rootColor = "#C4AD97"
              if (entry.diagnoses.includes("Missing")) { crownColor = "#d1d5db"; rootColor = "#d1d5db" }
              else if (entry.diagnoses.includes("Crown") || entry.diagnoses.includes("Bridge")) { crownColor = "#d1d5db"; rootColor = "#C4AD97" }
              else if (entry.diagnoses.includes("RCT")) { crownColor = "#f87171"; rootColor = "#C4AD97" }
              else if (entry.diagnoses.includes("Implant")) { crownColor = "#9ca3af"; rootColor = "#6B7280" }
              return (
                <button
                  key={entry.fdi}
                  type="button"
                  onClick={() => openTooth(entry.fdi)}
                  onMouseEnter={() => state?.onSetHoveredTooth(entry.fdi)}
                  onMouseLeave={() => state?.onSetHoveredTooth(null)}
                  className={`group flex items-center gap-[12px] rounded-[14px] p-[12px] text-left transition-all ring-1 ${state?.hoveredToothFdi === entry.fdi
                      ? "bg-tp-blue-50/50 ring-tp-blue-400 shadow-[0_2px_12px_-4px_rgba(75,74,213,0.18)] -translate-y-[1px]"
                      : "bg-white ring-transparent hover:bg-tp-blue-50/30 hover:ring-tp-blue-300 hover:shadow-[0_2px_10px_-4px_rgba(75,74,213,0.12)] hover:-translate-y-[1px]"
                    }`}
                >
                  {/* Tooth thumbnail — real 3D GLB model rendered in mini canvas */}
                  <div
                    className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[8px] bg-gradient-to-br from-tp-slate-50 to-tp-slate-100 overflow-hidden"
                  >
                    {tooth && (
                      <MiniToothCanvas
                        tooth={tooth}
                        size={52}
                        diagnoses={new Set(entry.diagnoses)}
                        isImplant={entry.diagnoses.includes("Implant")}
                        findings={(state?.findingsByTooth?.[entry.fdi] ?? [])}
                      />
                    )}
                  </div>

                  {/* Middle: FDI + name + chips */}
                  <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                    <div className="flex items-center gap-[8px]">
                      <span className="font-sans text-[14px] font-semibold text-tp-slate-800 truncate">
                        {toothName}
                      </span>
                      <span className="inline-flex h-[20px] w-[36px] items-center rounded-[5px] bg-tp-slate-100 px-[7px] font-sans text-[12px] font-bold text-tp-slate-700 tabular-nums">
                        T{entry.fdi}
                      </span>
                    </div>
                    {/* Section-level summary pills */}
                    <div className="flex flex-wrap items-center gap-[4px]">
                      {entry.diagnoses.length > 0 && (
                        <SummaryPill icon="diagnosis" label={entry.diagnoses.join(" · ")} tone="violet" />
                      )}
                      {entry.findingCount > 0 && (
                        <SummaryPill icon="virus" label={`${entry.findingCount} finding${entry.findingCount === 1 ? "" : "s"}`} tone="amber" />
                      )}
                      {entry.procedureCount > 0 && (
                        <SummaryPill icon="surgical-scissors-02" label={`${entry.procedureCount} procedure${entry.procedureCount === 1 ? "" : "s"}`} tone="blue" />
                      )}
                      {entry.findings.length > 0 && entry.findingCount === 0 && entry.findings.map((f) => (
                        <span key={f} className="inline-flex items-center rounded-[4px] bg-tp-slate-100 px-[6px] py-[2px] font-sans text-[12px] font-medium text-tp-slate-700">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expand (zoom-in) icon — blue on card hover / external hover */}
                  <span className={`flex-shrink-0 transition-colors group-hover:text-tp-blue-500 ${state?.hoveredToothFdi === entry.fdi ? "text-tp-blue-500" : "text-tp-slate-400"
                    }`}>
                    <ExpandIcon size={16} />
                  </span>
                </button>
              )
            })}
          </div>
        </>
      ) : (
        /* First-time user onboarding — polished educational panel */
        <div className="flex h-full w-full min-w-[300px] max-w-[350px] mx-auto flex-col gap-[14px]">

          {/* Quick-start steps — single visible Dentition panel card */}
          <div className="h-full w-full overflow-y-auto rounded-[16px] bg-white p-[18px] shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-[10px] mb-[18px]">
              <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-gradient-to-br from-violet-500 to-purple-600 shrink-0">
                <TPMedicalIcon name="health care" variant="bulk" size={18} color="#ffffff" />
              </div>
              <div>
                <h3 className="font-sans text-[15px] font-bold text-tp-slate-900">Getting Started</h3>
                <p className="font-sans text-[12px] text-tp-slate-400">4 simple steps to examine</p>
              </div>
            </div>

            {/* Steps with dotted connector lines — icons replace numbers */}
            <div className="relative flex flex-col gap-[12px]">
              {[
                { step: "1", title: "Select a tooth", desc: "Click any tooth on the 3D model to open its detail view", icon: "tooth" },
                { step: "2", title: "Record findings", desc: "Add treatment history, surface findings, and diagnoses", icon: "diagnosis" },
                { step: "3", title: "Plan procedures", desc: "Create treatment plans and add clinical notes", icon: "surgical-scissors-02" },
                { step: "4", title: "View dental score", desc: "Return to full view to see your score and tooth records", icon: "tooth" },
              ].map((item, idx, arr) => (
                <div key={item.step} className="relative flex items-center">
                  {/* Left: icon circle (replacing step numbers) */}
                  <div className="shrink-0 relative flex items-center justify-center" style={{ width: 36 }}>
                    <div
                      className="flex items-center justify-center rounded-full relative z-10"
                      style={{ width: 34, height: 34, background: "#7c3aed14" }}
                    >
                      <TPMedicalIcon name={item.icon} variant="bulk" size={16} color="#7c3aed" />
                    </div>
                  </div>

                  {/* Right: content card */}
                  <div className="flex-1 min-w-0 flex items-center gap-[10px] rounded-[10px] bg-tp-slate-50/80 px-[14px] py-[12px] ml-[10px]">
                    <div className="min-w-0 flex-1">
                      <p className="font-sans text-[14px] font-semibold text-tp-slate-800">{item.title}</p>
                      <p className="font-sans text-[12px] text-tp-slate-400 leading-[1.4]">{item.desc}</p>
                    </div>
                  </div>

                  {/* Dotted connector line between steps */}
                  {idx < arr.length - 1 && (
                    <div
                      className="absolute z-0"
                      style={{
                        left: 17,
                        top: "calc(50% + 17px)",
                        height: "calc(100% - 10px)",
                        width: 0,
                        borderLeft: "1.5px dashed #c4b5fd",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Tutorial video — exact PNG image with hover effect */}
            <div className="mt-[16px] relative rounded-[12px] overflow-hidden cursor-pointer group transition-all hover:shadow-[0_4px_16px_rgba(88,28,135,0.2)] hover:-translate-y-[1px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/tutorial-dental-preview.png"
                alt="How Dental Works? — Watch tutorial"
                className="w-full h-auto object-cover rounded-[12px] transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 rounded-[12px] bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
            </div>

          </div>
        </div>
      )}
    </>
  )
}

// ──────────────────────────────────────────────────────────────
// SummaryPill — compact chip with a TP medical icon + label
// ──────────────────────────────────────────────────────────────
function SummaryPill({ icon, label, tone }: { icon: string; label: string; tone: "violet" | "amber" | "blue" | "slate" }) {
  const tones = {
    violet: { bg: "bg-tp-violet-50", text: "text-tp-violet-700", colour: "var(--tp-violet-600)" },
    amber: { bg: "bg-amber-50", text: "text-amber-700", colour: "#b45309" },
    blue: { bg: "bg-tp-blue-50", text: "text-tp-blue-700", colour: "var(--tp-blue-600)" },
    slate: { bg: "bg-tp-slate-100", text: "text-tp-slate-700", colour: "var(--tp-slate-600)" },
  } as const
  const t = tones[tone]
  return (
    <span className={`inline-flex items-center gap-[4px] rounded-[5px] px-[6px] py-[2px] font-sans text-[12px] font-semibold ${t.bg} ${t.text}`}>
      <TPMedicalIcon name={icon} variant="bulk" size={12} color={t.colour} />
      <span className="truncate max-w-[180px]">{label}</span>
    </span>
  )
}

// ──────────────────────────────────────────────────────────────
// ScoreCard — full-circle gauge w/ interior gradient disc + animated score
// ──────────────────────────────────────────────────────────────
function ScoreCard({
  data, infoBtnRef, showFormula, setShowFormula,
}: {
  data: ReturnType<typeof computeDentalScore>
  infoBtnRef: React.RefObject<HTMLDivElement | null>
  showFormula: boolean
  setShowFormula: (v: boolean | ((p: boolean) => boolean)) => void
}) {
  const { score, rating, affectedTeeth } = data
  const zoneIdx = score >= 90 ? 4 : score >= 75 ? 3 : score >= 60 ? 2 : score >= 40 ? 1 : 0
  // Original TP palette — red → orange → amber → violet → emerald.
  const colour = [
    { accent: "#EF4444", accentDark: "#B91C1C", tint: "#FFE4E6" },  // Off Track — red
    { accent: "#F97316", accentDark: "#C2410C", tint: "#FFEDD5" },  // Improving — orange
    { accent: "#F59E0B", accentDark: "#B45309", tint: "#FEF3C7" },  // Good — amber
    { accent: "#8B5CF6", accentDark: "#6D28D9", tint: "#EDDFF7" },  // Great — violet
    { accent: "#10B981", accentDark: "#047857", tint: "#D1FAE5" },  // Superb — emerald
  ][zoneIdx]

  // Animate score from 0 → target on mount.
  const [displayScore, setDisplayScore] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const duration = 900
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayScore(Math.round(score * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [score])

  // Larger ring circumference for breathing space.
  const size = 220
  const cx = size / 2
  const cy = size / 2
  const r = 90
  const gapDeg = 28
  const startA = 90 + gapDeg / 2
  const sweepTotal = 360 - gapDeg
  const progress = Math.max(0, Math.min(1, displayScore / 100))
  const endA = startA + sweepTotal * progress
  const polar = (a: number, radius = r) => ({
    x: cx + radius * Math.cos((a * Math.PI) / 180),
    y: cy + radius * Math.sin((a * Math.PI) / 180),
  })
  const p0 = polar(startA)
  const pFull = polar(startA + sweepTotal)
  const pProg = polar(endA)
  const bgArc = `M ${p0.x} ${p0.y} A ${r} ${r} 0 1 1 ${pFull.x} ${pFull.y}`
  const fgArc = `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${sweepTotal * progress > 180 ? 1 : 0} 1 ${pProg.x} ${pProg.y}`
  const gid = `gauge-ring-${zoneIdx}`
  const infoIconRef = useRef<HTMLSpanElement>(null)
  const [iconAnchor, setIconAnchor] = useState<{ x: number; y: number } | null>(null)

  const openTooltip = () => {
    const r = infoIconRef.current?.getBoundingClientRect()
    if (!r) return
    setIconAnchor({ x: r.left + r.width / 2, y: r.bottom })
    setShowFormula(true)
  }
  const closeTooltip = () => { setShowFormula(false); setIconAnchor(null) }

  return (
    <div
      ref={infoBtnRef}
      className="mb-[8px] relative overflow-hidden rounded-[20px] px-[16px] pt-[8px] pb-[10px]"
      style={{
        background: `linear-gradient(140deg, ${colour.tint} 0%, ${colour.accent}2b 60%, ${colour.accent}4d 100%)`,
      }}
    >
      {/* Heading — tab stuck to top-left corner, only bottom-right rounded */}
      <span
        className="absolute top-0 left-0 z-20 inline-flex items-center px-[11px] py-[5px] font-sans text-[14px] font-semibold tracking-[0.2px]"
        style={{
          background: "rgba(255,255,255,0.98)",
          color: colour.accentDark,
          borderBottomRightRadius: "14px",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        Dental score
      </span>
      {showFormula && iconAnchor && <ScoreTooltip anchor={iconAnchor} data={data} />}

      {/* Gauge — ring SVG + centered content overlay */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Ring-only SVG — no text inside */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colour.accent} stopOpacity="0.85" />
              <stop offset="100%" stopColor={colour.accentDark} stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Track */}
          <path d={bgArc} stroke={colour.tint} strokeWidth={14} strokeLinecap="round" fill="none" />
          {/* Progress */}
          {progress > 0 && (
            <path d={fgArc} stroke={`url(#${gid})`} strokeWidth={14} strokeLinecap="round" fill="none" />
          )}
        </svg>
        {/* Centered content frame — score + "out of 100" + rating tag */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ gap: 4 }}
        >
          <span
            className="font-sans font-[800] tabular-nums"
            style={{
              fontSize: 42,
              lineHeight: 1,
              color: colour.accentDark,
            }}
          >
            {displayScore}
          </span>
          <span className="font-sans text-[12px] font-medium text-tp-slate-500">
            out of 100
          </span>
          <span
            ref={infoIconRef}
            onMouseEnter={openTooltip}
            onMouseLeave={closeTooltip}
            onClick={openTooltip}
            className="pointer-events-auto inline-flex items-center gap-[5px] rounded-full px-[12px] py-[3px] font-sans text-[12px] font-bold whitespace-nowrap backdrop-blur-[6px] cursor-pointer mt-[2px]"
            style={{
              background: `linear-gradient(135deg, ${colour.tint} 0%, ${colour.accent}22 100%)`,
              color: colour.accentDark,
              border: `1px solid ${colour.accent}33`,
              letterSpacing: "0.6px",
            }}
          >
            {rating.toUpperCase()}
            <InfoCircle size={14} color="currentColor" variant="Linear" />
          </span>
        </div>
      </div>
    </div>
  )
}

function ScoreTooltip({ anchor, data }: {
  anchor: { x: number; y: number }
  data: ReturnType<typeof computeDentalScore>
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  // Compact black tooltip, anchored below the info icon, arrow points up to icon.
  const TOOLTIP_W = 220
  const TOOLTIP_H_ESTIMATE = 110
  const pad = 12
  const ARROW = 6
  let placeBelow = true
  let left = anchor.x - TOOLTIP_W / 2
  let top = anchor.y + ARROW + 4
  if (typeof window !== "undefined") {
    if (top + TOOLTIP_H_ESTIMATE + pad > window.innerHeight) {
      placeBelow = false
      top = anchor.y - TOOLTIP_H_ESTIMATE - ARROW - 4
    }
    if (left + TOOLTIP_W + pad > window.innerWidth) left = window.innerWidth - TOOLTIP_W - pad
    if (left < pad) left = pad
  }
  const arrowX = Math.max(12, Math.min(TOOLTIP_W - 12, anchor.x - left)) - ARROW

  return createPortal(
    <div className="fixed z-[9999] pointer-events-none" style={{ top, left }}>
      {/* Arrow on top (when tooltip is below cursor) */}
      {placeBelow && (
        <div
          className="absolute"
          style={{
            top: -ARROW,
            left: arrowX,
            width: 0,
            height: 0,
            borderLeft: `${ARROW}px solid transparent`,
            borderRight: `${ARROW}px solid transparent`,
            borderBottom: `${ARROW}px solid #0f172a`,
          }}
        />
      )}
      <div
        className="w-[220px] rounded-[8px] px-[12px] py-[10px] shadow-[0_6px_18px_-4px_rgba(15,23,42,0.35)]"
        style={{ background: "#0f172a", color: "#ffffff" }}
      >
        <p className="font-sans text-[12px] font-semibold text-white/95">How this is calculated</p>
        <p className="mt-[2px] font-sans text-[12px] leading-[14px] text-white/55">
          Starts at 100, decreases with diagnoses &amp; findings.
        </p>
        <div className="mt-[8px] flex flex-col gap-[4px]">
          <TooltipRow label="Diagnoses" value={data.breakdown.diag} />
          <TooltipRow label="Findings" value={data.breakdown.findings} />
        </div>
        <div className="mt-[7px] flex items-center justify-between border-t border-white/15 pt-[6px]">
          <span className="font-sans text-[12px] font-medium text-white/60">Total deducted</span>
          <span className="font-sans text-[12px] font-bold tabular-nums text-white">−{data.totalDeduction}</span>
        </div>
      </div>
      {/* Arrow at bottom (when tooltip is above cursor) */}
      {!placeBelow && (
        <div
          className="absolute"
          style={{
            bottom: -ARROW,
            left: arrowX,
            width: 0,
            height: 0,
            borderLeft: `${ARROW}px solid transparent`,
            borderRight: `${ARROW}px solid transparent`,
            borderTop: `${ARROW}px solid #0f172a`,
          }}
        />
      )}
    </div>,
    document.body
  )
}

function TooltipRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-sans text-[12px] font-medium text-white/80">{label}</span>
      <span className="font-sans text-[12px] font-semibold tabular-nums text-white">−{value}</span>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// Single-tooth panel
//  • Tooth header with back arrow (replaces the separate back CTA)
//  • Primary diagnosis (tooth-level chips)
//  • Surface examination (zone chips only if a zone is selected)
//  • Dental examinations / Oral findings / Past procedures (chip sections)
//  • Sticky footer: Save findings
// ──────────────────────────────────────────────────────────────
type SectionId = "procedures" | "findings" | "planned" | "notes"

function SingleToothPanel({ state }: { state: DentalCanvasState }) {
  const isGroupedScope = state.selectionScopeType === "quadrant" || state.selectionScopeType === "full-mouth"
  const entityLabel = isGroupedScope
    ? (state.selectionScopeLabel || "Selected Scope")
    : `${QUADRANT_LABELS[state.selectedTooth.quadrant]} ${state.selectedTooth.name}`
  const entityBadge = isGroupedScope
    ? (state.selectionScopeType === "full-mouth" ? "FULL" : (state.selectionScopeId || "Q"))
    : `T${state.selectedTooth.fdi}`
  const [activeSection, setActiveSection] = useState<SectionId | null>("procedures")
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const tryBack = () => state.onBackToDentition()
  const sectionRefs = useRef<Record<SectionId, HTMLDivElement | null>>({
    procedures: null, findings: null, planned: null, notes: null,
  })

  const clearAllToothData = () => {
    // Clear all diagnoses
    state.currentToothDiagnoses.forEach((d) => state.onToggleToothDiagnosis(d))
    // Clear implant
    if (state.isImplant) state.onToggleImplant()
    // Clear all entries (findings, procedures, planned)
    state.currentToothEntries.forEach((e) => state.onRemoveEntry(e.id))
    // Clear notes
    state.onUpdateToothNotes("")
    setShowClearConfirm(false)
  }

  const hasAnyData = state.currentToothDiagnoses.size > 0 || state.isImplant || state.currentToothEntries.length > 0 || state.currentToothNotes.trim().length > 0

  const findingCount = state.currentToothEntries.filter((e) => e.kind === "finding").length
  const procedureCount = state.currentToothEntries.filter((e) => e.kind === "procedure").length
  const plannedCount = state.currentToothEntries.filter((e) => e.kind === "planned").length
  const diagnosisCount = state.currentToothDiagnoses.size + (state.isImplant ? 1 : 0)
  const notesFilled = state.currentToothNotes.trim().length > 0

  // Dental charting sections — standard clinical workflow order
  const sections: { id: SectionId; label: string; icon: string; count: number }[] = [
    { id: "procedures", label: "Treatment History", icon: "clipboard-activity", count: diagnosisCount + procedureCount },
    { id: "findings", label: "Findings", icon: "diagnosis", count: findingCount },
    { id: "planned", label: "Procedures", icon: "surgical-scissors-02", count: plannedCount },
    { id: "notes", label: isGroupedScope ? "Overall Group Notes" : "Overall Tooth Notes", icon: "note-2", count: notesFilled ? 1 : 0 },
  ]

  const jumpTo = (id: SectionId) => {
    // Toggle: collapse if already active, otherwise expand
    if (activeSection === id) {
      setActiveSection(null)
      return
    }
    setActiveSection(id)
    // Delay scroll until the accordion has expanded so we scroll to the expanded height.
    requestAnimationFrame(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <div className="flex h-full flex-col">
      {/* Tooth identity header — RxPad style */}
      <header className="shrink-0 border-b border-tp-slate-100 bg-white">
        <div className="flex items-center justify-between gap-[60px] px-[18px] py-[18px]">
          <div className="inline-flex flex-1 items-center gap-[12px] min-w-0">
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center relative rounded-[6px] bg-gradient-to-br from-tp-slate-50 to-tp-slate-100 overflow-hidden">
              {isGroupedScope ? (
                <MiniScopeCanvas
                  patientType={state.patientType ?? "adult"}
                  scopeType={state.selectionScopeType === "full-mouth" ? "full-mouth" : "quadrant"}
                  fdis={state.selectionScopeFdis ?? []}
                  toothDiagnoses={state.toothDiagnoses}
                  findingsByTooth={state.findingsByTooth}
                  implantTeeth={state.implantTeeth}
                  size={40}
                />
              ) : (
                <MiniToothCanvas
                  tooth={state.selectedTooth}
                  size={40}
                  diagnoses={state.currentToothDiagnoses}
                  isImplant={state.isImplant}
                  findings={state.findings}
                />
              )}
            </div>
            <div className="flex flex-col min-w-0 justify-center">
              <div className="flex items-center gap-[6px] min-w-0">
                <h3 className="text-[17px] font-semibold leading-[20px] text-tp-slate-800 font-['Inter',sans-serif] tracking-[0.1px] truncate">
                  {entityLabel}
                </h3>
                <span className="inline-flex h-[20px] shrink-0 items-center rounded-[4px] bg-tp-slate-100 px-[6px] font-sans text-[11px] font-bold text-tp-slate-700 tabular-nums">
                  {entityBadge}
                </span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-[10px] shrink-0">
            <button
              type="button"
              className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 hover:bg-tp-slate-200 transition-colors"
              title="Template"
            >
              <Grid5 color="currentColor" size={16} strokeWidth={1.5} variant="Linear" />
            </button>
            <button
              type="button"
              className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 hover:bg-tp-slate-200 transition-colors"
              title="Save"
            >
              <Ram color="currentColor" size={16} strokeWidth={1.5} variant="Linear" />
            </button>
            <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  title="Clear all data for this tooth"
                  disabled={!hasAnyData}
                  className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Eraser color="currentColor" size={16} strokeWidth={1.5} variant="Linear" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-[400px] rounded-[16px] p-[24px]">
                <AlertDialogHeader>
                  <div className="flex items-center gap-[10px] mb-[4px]">
                    <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-red-50 shrink-0">
                      <Trash color="#ef4444" size={18} variant="Bulk" />
                    </div>
                    <AlertDialogTitle className="font-sans text-[16px] font-semibold text-tp-slate-900">
                      Clear all data?
                    </AlertDialogTitle>
                  </div>
                  <AlertDialogDescription className="font-sans text-[13px] text-tp-slate-500 leading-[1.5]">
                    This will remove all treatment history, findings, procedures, and notes for{" "}
                    <span className="font-semibold text-tp-slate-700">
                      {entityLabel} ({entityBadge})
                    </span>
                    . This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-[16px] flex gap-[10px]">
                  <AlertDialogCancel className="flex-1 h-[40px] rounded-[10px] border border-tp-slate-200 bg-white font-sans text-[13px] font-semibold text-tp-slate-700 hover:bg-tp-slate-50">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={clearAllToothData}
                    className="flex-1 h-[40px] rounded-[10px] border-0 bg-red-500 font-sans text-[13px] font-semibold text-white hover:bg-red-600"
                  >
                    Clear all
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="w-[1px] h-[18px] bg-tp-slate-200 mx-[2px]" />
            <button
              type="button"
              onClick={tryBack}
              className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[10px] bg-tp-slate-50 text-tp-slate-600 hover:bg-tp-slate-100 transition-colors"
              title="Close panel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="192 104 152 104 152 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line x1="208" y1="48" x2="152" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><polyline points="64 152 104 152 104 192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line x1="48" y1="208" x2="104" y2="152" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><polyline points="152 192 152 152 192 152" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line x1="208" y1="208" x2="152" y2="152" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><polyline points="104 64 104 104 64 104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line x1="48" y1="48" x2="104" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* SCROLLABLE BODY — neutral tp-slate-50/50 so white section cards stack visibly with shadows */}
      <div
        className="flex-1 min-h-0 px-[14px] py-[14px] flex flex-col gap-[10px] bg-[#F4F6F9]"
      >
        {/* Treatment History — tooth-level status chips (Crown/RCT/Implant) + past procedure entries */}
        <div ref={(el) => { sectionRefs.current.procedures = el }}>
          <AccordionWrap open={activeSection === "procedures"} onExpand={() => jumpTo("procedures")}
            header={<SectionHeader title="Treatment History" medicalIcon="clipboard-activity"
              onTemplate={activeSection === "procedures" ? () => { } : undefined}
              onSave={activeSection === "procedures" ? () => { } : undefined}
              onClear={activeSection === "procedures" ? () => {
                state.currentToothDiagnoses.forEach((d) => state.onToggleToothDiagnosis(d))
                if (state.isImplant) state.onToggleImplant()
                state.currentToothEntries.filter((e) => e.kind === "procedure").forEach((e) => state.onRemoveEntry(e.id))
              } : undefined}
              clearDisabled={diagnosisCount === 0 && procedureCount === 0}
              chevron={activeSection === "procedures" ? "up" : "down"}
              onClick={() => jumpTo("procedures")}
              onChevronClick={() => jumpTo("procedures")}
            />}>
            <PrimaryDiagnosisBody state={state} />
          </AccordionWrap>
        </div>

        <div ref={(el) => { sectionRefs.current.findings = el }}>
          <AccordionWrap open={activeSection === "findings"} onExpand={() => jumpTo("findings")}
            header={<SectionHeader title="Findings" medicalIcon="diagnosis"
              onTemplate={activeSection === "findings" ? () => { } : undefined}
              onSave={activeSection === "findings" ? () => { } : undefined}
              onClear={activeSection === "findings" ? () => {
                state.currentToothEntries.filter((e) => e.kind === "finding").forEach((e) => state.onRemoveEntry(e.id))
              } : undefined}
              clearDisabled={findingCount === 0}
              chevron={activeSection === "findings" ? "up" : "down"}
              onClick={() => jumpTo("findings")}
              onChevronClick={() => jumpTo("findings")}
            />}>
            <EntryTab state={state} kind="finding" />
          </AccordionWrap>
        </div>

        <div ref={(el) => { sectionRefs.current.planned = el }}>
          <AccordionWrap open={activeSection === "planned"} onExpand={() => jumpTo("planned")}
            header={<SectionHeader title="Procedures" medicalIcon="surgical-scissors-02"
              onTemplate={activeSection === "planned" ? () => { } : undefined}
              onSave={activeSection === "planned" ? () => { } : undefined}
              onClear={activeSection === "planned" ? () => {
                state.currentToothEntries.filter((e) => e.kind === "planned").forEach((e) => state.onRemoveEntry(e.id))
              } : undefined}
              clearDisabled={plannedCount === 0}
              chevron={activeSection === "planned" ? "up" : "down"}
              onClick={() => jumpTo("planned")}
              onChevronClick={() => jumpTo("planned")}
            />}>
            <EntryTab state={state} kind="planned" />
          </AccordionWrap>
        </div>

        <div ref={(el) => { sectionRefs.current.notes = el }}>
          <AccordionWrap open={activeSection === "notes"} onExpand={() => jumpTo("notes")}
            header={<SectionHeader title={isGroupedScope ? "Overall Group Notes" : "Overall Tooth Notes"} medicalIcon="note-2"
              onTemplate={activeSection === "notes" ? () => { } : undefined}
              onSave={activeSection === "notes" ? () => { } : undefined}
              onClear={activeSection === "notes" ? () => state.onUpdateToothNotes("") : undefined}
              chevron={activeSection === "notes" ? "up" : "down"}
              onClick={() => jumpTo("notes")}
              onChevronClick={() => jumpTo("notes")}
            />}>
            <div className="p-[14px]">
              <textarea
                value={state.currentToothNotes}
                onChange={(e) => state.onUpdateToothNotes(e.target.value)}
                placeholder={isGroupedScope ? "General notes for this selected group…" : "General notes for this tooth…"}
                className="h-[140px] w-full resize-none rounded-[8px] border border-tp-slate-200 bg-white px-[12px] py-[10px] font-sans text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:outline-none"
              />
            </div>
          </AccordionWrap>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// AccordionWrap — rounded card with animated expand/collapse.
// Uses a measured height transition so content visibly slides open/shut.
// ──────────────────────────────────────────────────────────────
function AccordionWrap({
  open, header, children, onExpand,
}: { open: boolean; header: React.ReactNode; children: React.ReactNode; onExpand: () => void }) {
  return (
    <div
      className={`flex flex-col rounded-[14px] bg-white overflow-hidden transition-[flex-grow,shadow] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${open ? "flex-1 shadow-[0_6px_20px_-4px_rgba(15,23,42,0.12)] cursor-default" : "flex-none shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] cursor-pointer"}`}
      onClick={open ? undefined : onExpand}
    >
      <div className="shrink-0">{header}</div>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          gridTemplateRows: open ? '1fr' : '0fr',
          opacity: open ? 1 : 0,
          flex: open ? '1 1 0%' : '0 0 0px'
        }}
      >
        <div className="overflow-hidden min-h-0 flex flex-col">
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// SectionHeader — TP medical icon + title + count + Template/Save/Clear
// Matches RxPad section header styling.
// ──────────────────────────────────────────────────────────────
function SectionHeader({
  title, count, medicalIcon, onTemplate, onSave, onClear, clearDisabled, onClick, chevron, onChevronClick,
}: {
  title: string
  count?: number
  medicalIcon?: string
  onTemplate?: () => void
  onSave?: () => void
  onClear?: () => void
  clearDisabled?: boolean
  onClick?: () => void
  chevron?: "right" | "down" | "up"
  onChevronClick?: () => void
}) {
  const btnClass = "inline-flex h-[32px] w-[32px] items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
  const stop = (e: React.MouseEvent) => e.stopPropagation()
  return (
    <header
      onClick={onClick}
      className={`flex items-center gap-[8px] px-[14px] pt-[12px] pb-[8px] ${onClick ? "cursor-pointer" : ""}`}
    >
      {medicalIcon && (
        <span className="inline-flex h-[32px] w-[32px] items-center justify-center text-tp-violet-500 flex-shrink-0">
          <TPMedicalIcon name={medicalIcon} variant="bulk" size={22} color="var(--tp-violet-500)" />
        </span>
      )}
      <h4 className="font-sans text-[14px] font-semibold text-tp-slate-800">{title}</h4>
      {typeof count === "number" && count > 0 && (
        <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-tp-slate-100 px-[5px] font-sans text-[12px] font-bold text-tp-slate-600 tabular-nums">
          {count}
        </span>
      )}
      <div className="flex-1" />
      <div className="inline-flex items-center gap-[14px]" onClick={stop}>
        {onTemplate && (
          <button type="button" title="Templates" onClick={onTemplate} className={btnClass}>
            <Grid5 color="currentColor" size={16} strokeWidth={1.5} variant="Linear" />
          </button>
        )}
        {onSave && (
          <button type="button" title="Save as template" onClick={onSave} className={btnClass}>
            <Ram color="currentColor" size={16} strokeWidth={1.5} variant="Linear" />
          </button>
        )}
        {onClear && (
          <button type="button" title="Clear" onClick={onClear} disabled={clearDisabled} className={btnClass}>
            <Eraser color="currentColor" size={16} strokeWidth={1.5} variant="Linear" />
          </button>
        )}
        {chevron && (
          <button type="button" onClick={(e) => { e.stopPropagation(); onChevronClick?.() ?? onClick?.() }} className="inline-flex items-center justify-center rounded-[6px] p-[2px] transition-colors hover:bg-tp-slate-200">
            {chevron === "up" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M19.92 15.05L13.4 8.53c-.77-.77-2.03-.77-2.8 0l-6.52 6.52" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M19.92 8.95L13.4 15.47c-.77.77-2.03.77-2.8 0L4.08 8.95" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
              </svg>
            )}
          </button>
        )}
      </div>
    </header>
  )
}

// ──────────────────────────────────────────────────────────────
// EntryTab — shared builder + table for Findings and Procedures
// ──────────────────────────────────────────────────────────────
function EntryTab({ state, kind }: { state: DentalCanvasState; kind: "finding" | "procedure" | "symptom" | "planned" }) {
  const [activeCell, setActiveCell] = useState<{ rowId: string; colKey: string } | null>(null)
  const [query, setQuery] = useState("")

  // Portal Dropdown Search States
  const [searchOpen, setSearchOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchPopoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!searchOpen) { setPos(null); return }
    const reposition = () => {
      const el = searchInputRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setPos({ top: r.bottom + 4, left: r.left, width: r.width })
    }
    reposition()
    window.addEventListener("scroll", reposition, true)
    window.addEventListener("resize", reposition)
    return () => {
      window.removeEventListener("scroll", reposition, true)
      window.removeEventListener("resize", reposition)
    }
  }, [searchOpen, query])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        searchInputRef.current && !searchInputRef.current.contains(e.target as Node) &&
        searchPopoverRef.current && !searchPopoverRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  const isMissing = state.currentToothDiagnoses.has("Missing") || state.currentToothDiagnoses.has("Extraction")
  const isGroupedScope = state.selectionScopeType === "quadrant" || state.selectionScopeType === "full-mouth"
  const groupedFindingCatalog = [
    "Generalized plaque accumulation",
    "Generalized gingival inflammation",
    "Quadrant-level calculus",
    "Generalized recession",
    "Generalized bleeding on probing",
    "Widespread sensitivity",
  ] as const
  const groupedProcedureCatalog = [
    "Quadrant scaling and root planing",
    "Full-mouth scaling and polishing",
    "Oral prophylaxis",
    "Fluoride varnish (full arch)",
    "Desensitization therapy (quadrant)",
    "Periodontal maintenance",
  ] as const
  const catalog = kind === "finding"
    ? (isGroupedScope ? groupedFindingCatalog : (DIAGNOSES as readonly string[]))
    : kind === "symptom"
      ? (DENTAL_SYMPTOM_CATALOG as readonly string[])
      : (kind === "planned" || kind === "procedure")
        ? (isGroupedScope ? groupedProcedureCatalog : (PROCEDURE_CATALOG as readonly string[]))
        : (PROCEDURE_CATALOG as readonly string[])
  const entries = state.currentToothEntries.filter((e) => e.kind === kind)
  const activeSurfaceRowId = activeCell?.colKey === "surfaces" ? activeCell.rowId : null
  const activeRow = entries.find((e) => e.id === activeSurfaceRowId) ?? null
  const setCellActive = useCallback((rowId: string, colKey: string) => {
    setActiveCell({ rowId, colKey })
  }, [])
  const clearCellActive = useCallback((rowId: string, colKey: string) => {
    window.setTimeout(() => {
      setActiveCell((current) => current && current.rowId === rowId && current.colKey === colKey ? null : current)
    }, 80)
  }, [])
  const isCellActive = useCallback((rowId: string, colKey: string) => activeCell?.rowId === rowId && activeCell?.colKey === colKey, [activeCell])

  // Push multiSelectZones → active row.
  useEffect(() => {
    if (!activeRow) return
    const zonesFromCanvas = Array.from(state.multiSelectZones)
    const same = zonesFromCanvas.length === activeRow.surfaces.length && zonesFromCanvas.every((z) => activeRow.surfaces.includes(z))
    if (!same) state.onUpdateEntry(activeRow.id, { surfaces: zonesFromCanvas })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.multiSelectZones, activeSurfaceRowId])

  // Seed multiSelectZones when active row changes + toggle multi-select mode.
  useEffect(() => {
    if (!activeRow) {
      state.onClearMultiSelect()
      state.onSetMultiSelectActive(false)
      return
    }
    state.onSetMultiSelectZones(activeRow.surfaces)
    state.onSetMultiSelectActive(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSurfaceRowId])

  // Deactivate multi-select mode on unmount (switching tabs away).
  useEffect(() => () => { state.onSetMultiSelectActive(false) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const filteredCatalog = useMemo(() => {
    const q = query.toLowerCase().trim()
    const selected = new Set(entries.map((e) => e.name.toLowerCase()))
    const pool = q ? catalog.filter((c) => c.toLowerCase().includes(q)) : catalog
    return pool.filter((c) => !selected.has(c.toLowerCase())).slice(0, 12)
  }, [query, catalog, entries])

  const quickSelectChips = useMemo(() => {
    const defaults = kind === "finding"
      ? (isGroupedScope
        ? ["Generalized plaque accumulation", "Generalized gingival inflammation", "Quadrant-level calculus", "Widespread sensitivity"]
        : ["Cavity/Caries", "Crack", "Fracture", "Sensitivity", "Plaque", "Calculus"])
      : (isGroupedScope
        ? ["Quadrant scaling and root planing", "Full-mouth scaling and polishing", "Oral prophylaxis", "Periodontal maintenance"]
        : ["RCT", "Restoration", "Extraction", "Scaling", "Polishing", "Crown Prep", "Implant Placement", "Veneer"])
    const selected = new Set(entries.map((e) => e.name.toLowerCase()))
    return defaults.filter((name) => (catalog as readonly string[]).includes(name) && !selected.has(name.toLowerCase()))
  }, [catalog, entries, isGroupedScope, kind])

  const pendingActivateRef = useRef(false)
  const prevCountRef = useRef(entries.length)
  useEffect(() => {
    if (pendingActivateRef.current && entries.length > prevCountRef.current) {
      const latest = entries[entries.length - 1]
      if (latest) setActiveCell({ rowId: latest.id, colKey: "surfaces" })
      pendingActivateRef.current = false
    }
    prevCountRef.current = entries.length
  }, [entries.length, entries])

  const addEntryFromName = (name: string) => {
    state.onClearMultiSelect()
    const surfaces = getDefaultTreatmentSurfaces(name)

    pendingActivateRef.current = true
    state.onAddEntry({
      kind,
      name,
      surfaces,
      since: undefined,
      plannedDate: undefined,
      status: (kind === "procedure" || kind === "planned") ? "planned" : undefined,
      notes: undefined,
    })
    setQuery("")
  }

  if (isMissing) {
    return (
      <div className="px-[14px] py-[22px] text-center">
        <p className="font-sans text-[12px] text-tp-slate-500">
          Tooth marked as Missing — no surfaces to {kind === "finding" ? "examine" : "treat"}.
        </p>
      </div>
    )
  }

  const primaryLabel = kind === "finding" ? "EXAMINATION" : kind === "symptom" ? "SYMPTOM" : kind === "planned" ? "PROCEDURE" : "PROCEDURE"
  const hasStatus = kind === "procedure" || kind === "planned"

  return (
    <div data-rx-module-root className="p-[12px]">
      {/* RxPad-style editable table */}
      {entries.length > 0 && (
        <div className="relative overflow-x-auto rounded-[12px] border border-tp-slate-200">
          <table className="w-full table-fixed font-['Inter',sans-serif] text-[14px]">
            <colgroup>
              <col style={{ width: 36, minWidth: 36 }} />
              <col style={{ minWidth: 150 }} />
              <col style={{ width: 140, minWidth: 120 }} />
              <col style={{ width: 120, minWidth: 110 }} />
              {hasStatus && <col style={{ width: 120, minWidth: 110 }} />}
              <col style={{ minWidth: 120 }} />
              <col style={{ width: 44, minWidth: 44, maxWidth: 44 }} />
            </colgroup>
            <thead>
              <tr className="h-[38px] bg-tp-slate-50 text-left font-['Inter',sans-serif] text-[12px] text-tp-slate-500">
                <th className="border-r border-tp-slate-100 px-0 py-2 text-center font-semibold" />
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left text-[12px] font-semibold">NAME</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left text-[12px] font-semibold">SURFACES</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left text-[12px] font-semibold">{kind === "finding" ? "SINCE" : "DATE"}</th>
                {hasStatus && <th className="border-r border-tp-slate-100 px-3 py-2 text-left text-[12px] font-semibold">STATUS</th>}
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left text-[12px] font-semibold">NOTE</th>
                <th className="sticky right-0 z-40 border-l border-tp-slate-200/80 bg-tp-slate-50 px-0 py-2 text-center font-semibold shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]" />
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => {
                const isSurfaceActive = isCellActive(e.id, "surfaces")
                const isDateActive = isCellActive(e.id, kind === "finding" || kind === "symptom" ? "since" : "date")
                const isStatusActive = isCellActive(e.id, "status")
                const isNoteActive = isCellActive(e.id, "note")
                const activateSurfaceCell = () => {
                  setCellActive(e.id, "surfaces")
                  state.onSetMultiSelectZones(e.surfaces)
                  state.onSetMultiSelectActive(true)
                }
                return (
                  <tr
                    key={e.id}
                    onMouseEnter={() => { if (!isSurfaceActive) state.onSetHighlightZones(e.surfaces) }}
                    onMouseLeave={() => { if (!isSurfaceActive) state.onSetHighlightZones([]) }}
                    className="border-t border-tp-slate-100"
                  >
                    {/* Drag handle cell (display-only for now) */}
                    <td className="border-r border-tp-slate-100 p-0 text-center align-middle transition-colors hover:bg-tp-slate-100/60">
                      <span className="inline-flex h-[42px] w-full items-center justify-center text-tp-slate-300">
                        <svg width="8" height="16" viewBox="0 0 8 16" fill="currentColor">
                          <circle cx="2" cy="3" r="1.2" /><circle cx="2" cy="8" r="1.2" /><circle cx="2" cy="13" r="1.2" />
                          <circle cx="6" cy="3" r="1.2" /><circle cx="6" cy="8" r="1.2" /><circle cx="6" cy="13" r="1.2" />
                        </svg>
                      </span>
                    </td>
                    {/* Primary name — whole cell is the input */}
                    <td className="border-r border-tp-slate-100 p-0 align-middle transition-colors hover:bg-tp-slate-100/60" onClick={(ev) => ev.stopPropagation()}>
                      <EditableNameCell
                        value={e.name}
                        catalog={catalog}
                        onCommit={(v) => { if (v.trim()) state.onUpdateEntry(e.id, { name: v.trim() }) }}
                        onFocusActivate={() => setCellActive(e.id, "name")}
                      />
                    </td>
                    {/* Surfaces dropdown — whole cell is the trigger */}
                    <td className={`relative border-r border-tp-slate-100 p-0 align-middle transition-colors ${isSurfaceActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`} onClick={(ev) => ev.stopPropagation()}>
                      {isSurfaceActive ? <span className="pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" /> : null}
                      <SurfaceCellDropdown
                        entry={e}
                        arch={state.selectedTooth.arch}
                        toothPosition={state.selectedTooth.position}
                        mode={kind === "finding" ? "finding" : kind === "symptom" ? "symptom" : "treatment"}
                        isActive={isSurfaceActive}
                        onActivate={activateSurfaceCell}
                        onDeactivate={() => {
                          if (state.selectedZone === "whole") state.onClearSelectedZone()
                          clearCellActive(e.id, "surfaces")
                        }}
                        onToggleZone={state.onToggleZoneMultiSelect}
                        onHover={state.onSetHighlightZones}
                        multiSelectZones={state.multiSelectZones}
                      />
                    </td>
                    {/* Since / Date — whole cell */}
                    <td className={`relative border-r border-tp-slate-100 p-0 align-middle transition-colors ${isDateActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`} onClick={(ev) => ev.stopPropagation()}>
                      {isDateActive ? <span className="pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" /> : null}
                      {kind === "finding" || kind === "symptom" ? (
                        <SinceDropdown
                          value={e.since ?? ""}
                          onChange={(v) => state.onUpdateEntry(e.id, { since: v || undefined })}
                          onFocusActivate={() => setCellActive(e.id, "since")}
                          onBlurDeactivate={() => clearCellActive(e.id, "since")}
                        />
                      ) : (
                        <div className="relative w-full h-[52px] cursor-pointer group">
                          {!e.plannedDate && (
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-[12px]">
                              <span className="font-['Inter',sans-serif] text-[12px] leading-[18px] text-[#a2a2a8]">DD/MM/YYYY</span>
                              <Calendar size={14} color="#94a3b8" variant="Linear" />
                            </div>
                          )}
                          <input
                            type="date"
                            value={e.plannedDate ?? ""}
                            onChange={(ev) => state.onUpdateEntry(e.id, { plannedDate: ev.target.value || undefined })}
                            onFocus={() => setCellActive(e.id, "date")}
                            onBlur={() => clearCellActive(e.id, "date")}
                            className={`relative z-20 h-[52px] w-full rounded-none border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] ${e.plannedDate ? "text-[#454551]" : "text-transparent"} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer focus:bg-transparent focus:outline-none focus:ring-0 cursor-pointer`}
                          />
                        </div>
                      )}
                    </td>
                    {/* Status (procedures only) — matches cell design system */}
                    {hasStatus && (
                      <td className={`relative border-r border-tp-slate-100 p-0 align-middle ${isStatusActive ? "bg-tp-blue-50/20" : ""}`} onClick={(ev) => ev.stopPropagation()}>
                        {isStatusActive ? <span className="pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" /> : null}
                        <select
                          value={e.status ?? "planned"}
                          onChange={(ev) => state.onUpdateEntry(e.id, { status: ev.target.value as ToothEntry["status"] })}
                          onFocus={() => setCellActive(e.id, "status")}
                          onBlur={() => clearCellActive(e.id, "status")}
                          className="relative z-20 h-[52px] w-full rounded-none border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] focus:bg-transparent focus:outline-none focus:ring-0 transition-all duration-200"
                        >
                          <option value="planned">Planned</option>
                          <option value="in-progress">In progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    )}
                    {/* Note — whole cell */}
                    <td className={`relative border-r border-tp-slate-100 p-0 align-middle transition-colors ${isNoteActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`} onClick={(ev) => ev.stopPropagation()}>
                      {isNoteActive ? <span className="pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" /> : null}
                      <input
                        type="text"
                        value={e.notes ?? ""}
                        onChange={(ev) => state.onUpdateEntry(e.id, { notes: ev.target.value })}
                        onFocus={() => setCellActive(e.id, "note")}
                        onBlur={() => clearCellActive(e.id, "note")}
                        placeholder="e.g. Monitor at next visit"
                        className="relative z-20 h-[52px] w-full rounded-none border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] placeholder:text-[#a2a2a8] focus:bg-transparent focus:outline-none focus:ring-0 transition-all duration-200"
                      />
                    </td>
                    {/* Sticky delete */}
                    <td
                      className="sticky right-0 z-30 border-l border-tp-slate-200/80 bg-white px-0 py-2 text-center align-middle shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)] transition-colors hover:bg-tp-slate-100/60"
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => { if (activeSurfaceRowId === e.id) setActiveCell(null); state.onRemoveEntry(e.id) }}
                        title="Remove"
                        className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-[6px] text-tp-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash size={14} color="currentColor" variant="Linear" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Search & Add input (+ quick-select chips) — always at bottom, RxPad-style */}
      <div className={entries.length > 0 ? "mt-[10px]" : "mt-0"}>
        <div className="relative">
          <span className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-tp-slate-400">
            <SearchNormal1 size={14} color="currentColor" variant="Linear" />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearchOpen(true) }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                const match = catalog.find((c) => c.toLowerCase() === query.toLowerCase().trim())
                if (match) { addEntryFromName(match); setSearchOpen(false) }
              }
            }}
            placeholder={
              kind === "finding"
                ? (isGroupedScope ? "Search & Add Group Finding" : "Search & Add Examination")
                : kind === "symptom"
                  ? "Search & Add Symptom"
                  : kind === "planned"
                    ? (isGroupedScope ? "Search & Add Group Planned Procedure" : "Search & Add Planned Procedure")
                    : (isGroupedScope ? "Search & Add Group Procedure" : "Search & Add Procedure")
            }
            className="h-[36px] w-full rounded-[8px] border border-tp-slate-200 bg-white pl-[32px] pr-[12px] font-sans text-[12px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:outline-none"
          />
          {searchOpen && pos && typeof document !== "undefined" && (filteredCatalog.length > 0 || query.trim()) && createPortal(
            <div
              ref={searchPopoverRef}
              className="fixed z-[9999] flex flex-col rounded-[12px] border border-tp-slate-200 bg-white py-[6px] shadow-[0_8px_20px_-4px_rgba(15,23,42,0.12)] max-h-[260px] overflow-y-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-tp-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-tp-slate-100"
              style={{ top: pos.top, left: pos.left, width: pos.width }}
            >
              {filteredCatalog.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => addEntryFromName(c)}
                  className="px-[14px] py-[10px] text-left font-sans text-[13px] text-tp-slate-700 hover:bg-tp-slate-50 transition-colors"
                >
                  {c}
                </button>
              ))}
              {query.trim() && !filteredCatalog.some((c) => c.toLowerCase() === query.toLowerCase().trim()) && (
                <button
                  className="px-[14px] py-[10px] text-left font-sans text-[13px] font-medium text-tp-blue-600 hover:bg-tp-blue-50 transition-colors"
                  onClick={() => addEntryFromName(query.trim())}
                >
                  <span className="flex items-center gap-[6px]">
                    <Add size={14} color="currentColor" variant="Linear" /> Add "{query.trim()}"
                  </span>
                </button>
              )}
            </div>,
            document.body
          )}
        </div>

        {query.length === 0 && quickSelectChips.length > 0 && (
          <div className="mt-[10px] flex flex-wrap gap-[6px]">
            {quickSelectChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => addEntryFromName(chip)}
                className="inline-flex h-[30px] items-center rounded-[10px] bg-tp-slate-100 px-[12px] font-sans text-[12px] font-medium text-tp-slate-600 transition-colors hover:bg-tp-slate-200 hover:text-tp-slate-700"
              >
                {chip}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// SurfaceCellDropdown — in-cell dropdown with highlighted hint row
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// EditableNameCell — click to turn a name cell into an input + catalog dropdown
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// DiagnosisNameCell — editable diagnosis name w/ swap dropdown
// ──────────────────────────────────────────────────────────────
function DiagnosisNameCell({
  name, color, activeRows, onSwap,
}: {
  name: string
  color: string
  activeRows: string[]
  onSwap: (next: string) => void
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)

  useEffect(() => {
    if (!open) { setPos(null); return }
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open])

  useEffect(() => {
    if (!open) { setPos(null); return }
    const reposition = () => {
      const el = wrapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 200) })
    }
    reposition()
    window.addEventListener("scroll", reposition, true)
    window.addEventListener("resize", reposition)
    return () => {
      window.removeEventListener("scroll", reposition, true)
      window.removeEventListener("resize", reposition)
    }
  }, [open])

  // Available diagnoses to swap to (exclude currently-active ones except self).
  const options = TOOTH_DIAGNOSES.filter((d) => d === name || !activeRows.includes(d))
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(name)
  const [highlightIdx, setHighlightIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (!editing) setDraft(name) }, [name, editing])
  useEffect(() => { setHighlightIdx(0) }, [draft])
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      setTimeout(() => {
        if (inputRef.current) inputRef.current.setSelectionRange(draft.length, draft.length)
      }, 0)
    }
  }, [editing, draft.length])

  const filtered = useMemo(() => {
    const q = draft.toLowerCase().trim()
    if (!q) return options
    return options.filter((c) => c.toLowerCase().includes(q))
  }, [draft, options])

  const commit = (next: string) => {
    setEditing(false)
    setOpen(false)
    const trimmed = next.trim()
    if (trimmed && trimmed !== name) onSwap(trimmed)
    else setDraft(name)
  }

  // Suppress unused variable warning (color no longer rendered)
  void color

  return (
    <div ref={wrapRef} className="relative">
      {!editing ? (
        <button
          type="button"
          onClick={() => { setEditing(true); setOpen(true); setDraft(name) }}
          className={`flex h-[42px] w-full items-center px-[10px] font-sans text-[14px] transition-colors rounded-[8px] ${open ? "bg-tp-slate-100" : "hover:bg-tp-slate-50/60"}`}
        >
          <span className="font-semibold text-tp-slate-800 truncate text-left">{name}</span>
        </button>
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => { setDraft(e.target.value); setOpen(true) }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              const pick = filtered[highlightIdx]
              commit(pick ?? (draft.trim() || name))
            } else if (e.key === "Escape") {
              setEditing(false); setOpen(false); setDraft(name)
            } else if (e.key === "ArrowDown") {
              e.preventDefault()
              const totalItems = filtered.length + ((draft.trim().length > 0 && !options.some((o) => o.toLowerCase() === draft.trim().toLowerCase())) ? 1 : 0)
              setHighlightIdx((i) => Math.min(totalItems - 1, i + 1))
            } else if (e.key === "ArrowUp") {
              e.preventDefault()
              setHighlightIdx((i) => Math.max(0, i - 1))
            }
          }}
          onBlur={() => { /* close handled by outside click */ }}
          placeholder="Search & Add Diagnosis..."
          className="h-[42px] w-full rounded-none border-0 bg-transparent px-[10px] font-sans text-[14px] font-semibold text-tp-slate-800 placeholder:text-tp-slate-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-[1.5px] focus:ring-inset focus:ring-tp-blue-400 focus:rounded-[8px] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] transition-all duration-200"
        />
      )}
      {open && pos && typeof document !== "undefined" && createPortal(
        <ul className="fixed z-[9999] max-h-[220px] overflow-y-auto rounded-[8px] border border-tp-slate-200 bg-white py-[2px] shadow-[0_6px_20px_-6px_rgba(15,23,42,0.18)] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-tp-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full"
            style={{ top: pos.top, left: pos.left, width: pos.width }}>
          {filtered.map((d, i) => {
            const isCurrent = d === name
            const highlighted = i === highlightIdx
            return (
              <li key={d}>
                <button
                  type="button"
                  onMouseEnter={() => setHighlightIdx(i)}
                  onMouseDown={(e) => { e.preventDefault(); commit(d) }}
                  className={`flex w-full items-center px-[10px] py-[6px] font-sans text-[12px] text-tp-slate-700 transition-colors ${highlighted ? "bg-tp-slate-100" : "hover:bg-tp-slate-50"} ${isCurrent ? "font-semibold" : ""}`}
                >
                  <span className="flex-1 text-left">{d}</span>
                  {isCurrent && <span className="text-tp-slate-400 text-[12px]">current</span>}
                </button>
              </li>
            )
          })}
          {draft.trim().length > 0 && !options.some((o) => o.toLowerCase() === draft.trim().toLowerCase()) && (
            <div className="m-[6px]">
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); commit(draft.trim()) }}
                onMouseEnter={() => setHighlightIdx(filtered.length)}
                className={`flex w-full items-center gap-[6px] rounded-[6px] border border-dashed border-tp-blue-300 px-[8px] py-[6px] font-sans text-[12px] font-medium text-tp-blue-700 transition-colors ${highlightIdx === filtered.length ? "bg-tp-blue-50" : "hover:bg-tp-blue-50"}`}
              >
                <Add size={12} color="currentColor" variant="Linear" />
                Add custom: "{draft.trim()}"
              </button>
            </div>
          )}
        </ul>,
        document.body
      )}
    </div>
  )
}

function EditableNameCell({
  value, catalog, onCommit, onFocusActivate,
}: {
  value: string
  catalog: readonly string[]
  onCommit: (next: string) => void
  onFocusActivate?: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const [highlightIdx, setHighlightIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)

  useEffect(() => { if (!editing) setDraft(value) }, [value, editing])
  useEffect(() => { setHighlightIdx(0) }, [draft])

  const filtered = useMemo(() => {
    const q = draft.toLowerCase().trim()
    if (!q) return catalog.slice(0, 8)
    return catalog.filter((c) => c.toLowerCase().includes(q) && c !== value).slice(0, 8)
  }, [draft, catalog, value])

  const hasExactMatch = useMemo(
    () => filtered.some((c) => c.toLowerCase() === draft.trim().toLowerCase()) || catalog.some((c) => c.toLowerCase() === draft.trim().toLowerCase()),
    [filtered, catalog, draft],
  )
  const showCustom = draft.trim().length > 0 && !hasExactMatch
  const totalItems = filtered.length + (showCustom ? 1 : 0)

  const commit = useCallback((next: string) => {
    setEditing(false)
    setPos(null)
    const trimmed = next.trim()
    if (trimmed && trimmed !== value) onCommit(trimmed)
  }, [value, onCommit])

  useEffect(() => {
    if (!editing) return
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node) && listRef.current && !listRef.current.contains(e.target as Node)) {
        commit(draft)
      }
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [editing, draft, commit])

  useEffect(() => {
    if (!editing) { setPos(null); return }
    const reposition = () => {
      const el = wrapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 200) })
    }
    reposition()
    window.addEventListener("scroll", reposition, true)
    window.addEventListener("resize", reposition)
    return () => {
      window.removeEventListener("scroll", reposition, true)
      window.removeEventListener("resize", reposition)
    }
  }, [editing])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlightIdx((i) => Math.min(totalItems - 1, i + 1)) }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlightIdx((i) => Math.max(0, i - 1)) }
    else if (e.key === "Enter") {
      e.preventDefault()
      if (totalItems === 0 && !draft.trim()) return
      if (totalItems === 0 && draft.trim()) commit(draft.trim())
      else if (highlightIdx < filtered.length) commit(filtered[highlightIdx])
      else commit(draft.trim())  // custom row
    }
    else if (e.key === "Escape") { setDraft(value); setEditing(false); setPos(null) }
  }

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => { setEditing(true); setDraft(value); onFocusActivate?.(); setTimeout(() => inputRef.current?.focus(), 0) }}
        className="flex h-[42px] w-full items-center px-[10px] text-left transition-colors rounded-[8px] hover:bg-tp-slate-100/60"
      >
        <span className="font-sans text-[14px] font-semibold text-tp-slate-800 truncate">{value}</span>
      </button>
    )
  }

  return (
    <div ref={wrapRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search..."
        className="h-[42px] w-full rounded-none border-0 bg-transparent px-[10px] font-sans text-[14px] font-semibold text-tp-slate-800 placeholder:text-tp-slate-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-[1.5px] focus:ring-inset focus:ring-tp-blue-400 focus:rounded-[8px] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] transition-all duration-200"
      />
      {(filtered.length > 0 || showCustom) && typeof document !== "undefined" && pos && createPortal(
        <div
          ref={listRef}
          className="fixed z-[9999] flex flex-col w-full min-w-[200px] max-h-[240px] overflow-y-auto rounded-[8px] border border-tp-slate-200 bg-white py-[2px] shadow-[0_6px_20px_-6px_rgba(15,23,42,0.18)] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-tp-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-tp-slate-100"
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          <ul>
            {filtered.map((c, i) => {
              const highlighted = i === highlightIdx
              return (
                <li key={c}>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); commit(c) }}
                    onMouseEnter={() => setHighlightIdx(i)}
                    className={`flex w-full items-center px-[10px] py-[6px] font-sans text-[12px] text-tp-slate-700 transition-colors ${highlighted ? "bg-tp-slate-100" : "hover:bg-tp-slate-100"}`}
                  >
                    {c}
                  </button>
                </li>
              )
            })}
          </ul>
          {showCustom && (
            <div className="m-[6px]">
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); commit(draft.trim()) }}
                onMouseEnter={() => setHighlightIdx(filtered.length)}
                className={`flex w-full items-center gap-[6px] rounded-[6px] border border-dashed border-tp-blue-300 px-[8px] py-[6px] font-sans text-[12px] font-medium text-tp-blue-700 transition-colors ${highlightIdx === filtered.length ? "bg-tp-blue-50" : "hover:bg-tp-blue-50"}`}
              >
                <Add size={12} color="currentColor" variant="Linear" />
                Add custom: "{draft.trim()}"
              </button>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}

function SurfaceCellDropdown({
  entry, arch, toothPosition, isActive, mode, onActivate, onDeactivate, onToggleZone, onHover, multiSelectZones,
}: {
  entry: ToothEntry
  arch: "maxillary" | "mandibular"
  toothPosition: number
  isActive: boolean
  onActivate: () => void
  onDeactivate?: () => void
  onToggleZone: (z: ZoneId) => void
  onHover: (zones: ZoneId[]) => void
  multiSelectZones: Set<ZoneId>
  mode?: "finding" | "treatment" | "symptom"
}) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const wasActiveRef = useRef(false)

  // Auto-open when this row becomes active (user just clicked a search chip).
  useEffect(() => {
    if (isActive && !wasActiveRef.current) setOpen(true)
    if (!isActive) setOpen(false)
    wasActiveRef.current = isActive
  }, [isActive])

  // Compute portal position when opened / on scroll / resize.
  useEffect(() => {
    if (!open) { setPos(null); return }
    const reposition = () => {
      const el = anchorRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 240) })
    }
    reposition()
    window.addEventListener("scroll", reposition, true)
    window.addEventListener("resize", reposition)
    return () => {
      window.removeEventListener("scroll", reposition, true)
      window.removeEventListener("resize", reposition)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      const a = anchorRef.current, p = popoverRef.current
      const t = e.target as HTMLElement | null
      if (t?.tagName === "CANVAS" || t?.closest("[data-dental-annotation-ui='true']")) return
      if (a && !a.contains(t) && p && !p.contains(t)) {
        setOpen(false)
        onDeactivate?.()
      }
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open, onDeactivate])

  // When the dropdown is open AND this is the active row, what the user sees
  // mirrors multiSelectZones. When NOT active, show the entry's saved surfaces.
  const shown = isActive ? Array.from(multiSelectZones) : entry.surfaces
  // Whole tooth = array containing 'whole'
  const isWholeTooth = shown.includes("whole" as ZoneId)

  const toggle = (z: ZoneId) => {
    if (!isActive) { onActivate(); return }
    onToggleZone(z)
  }
  const clickWholeTooth = () => {
    if (!isActive) onActivate()
    onToggleZone("whole" as ZoneId)
  }

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        onClick={() => {
          if (open) {
            setOpen(false)
            onDeactivate?.()
            return
          }
          onActivate()
          setOpen(true)
        }}
        className="relative z-20 flex h-[52px] w-full min-w-0 items-center justify-between gap-[6px] bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] transition-colors focus:outline-none"
      >
        <span className="flex-1 min-w-0 text-left whitespace-nowrap overflow-hidden text-ellipsis">
          {shown.length === 0 ? (
            <span className="font-normal text-[12px] text-[#a2a2a8]">Select surface</span>
          ) : isWholeTooth ? (
            <span className="inline-flex items-center gap-[4px] font-medium text-tp-slate-700">
              <span className="h-[8px] w-[8px] rounded-full" style={{ background: ZONE_INFO.whole.color }} />
              Whole tooth
            </span>
          ) : (
            <SurfaceDots surfaces={shown} arch={arch} toothPosition={toothPosition} />
          )}
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>
          <path d="M1 1L5 5L9 1" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && pos && typeof document !== "undefined" && createPortal(
        <div
          ref={popoverRef}
          className="fixed z-[9999] rounded-[8px] border border-tp-slate-200 bg-white shadow-[0_6px_20px_-6px_rgba(15,23,42,0.18)]"
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          <div className="p-[8px]">
            <div className="flex items-center gap-[6px] rounded-[6px] bg-tp-amber-50 px-[10px] py-[7px]">
              <InfoCircle size={13} color="var(--tp-amber-700)" variant="Bold" />
              <span className="font-sans text-[12px] font-normal text-tp-amber-800 leading-[1.35]">
                Tap the <span className="font-bold text-tp-amber-900">3D tooth</span> to select surfaces, or pick from the list below
              </span>
            </div>
          </div>
          {/* Surface list — Whole tooth first, then individual zones */}
          <ul className="max-h-[200px] overflow-y-auto py-[2px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-tp-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-tp-slate-100">
            <li>
              <button
                type="button"
                onClick={clickWholeTooth}
                className="flex w-full items-center gap-[8px] px-[10px] py-[5px] font-sans text-[12px] text-tp-slate-700 transition-colors hover:bg-tp-slate-100"
              >
                <span className={`inline-flex h-[13px] w-[13px] items-center justify-center rounded-[3px] border ${isWholeTooth ? "border-tp-blue-500 bg-tp-blue-500" : "border-tp-slate-300 bg-white"} flex-shrink-0`}>
                  {isWholeTooth && (
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </span>
                <span className="h-[8px] w-[8px] rounded-full flex-shrink-0" style={{ background: ZONE_INFO.whole.color }} />
                <span className="flex-1 text-left font-medium">Whole tooth</span>
              </button>
            </li>
            <li className="border-t border-tp-slate-100 mt-[2px] pt-[2px]" />
            {ALL_ZONES.map((z) => {
              const checked = shown.includes(z)
              const label = getZoneLabel(z, arch, toothPosition)
              return (
                <li key={z}>
                  <button
                    type="button"
                    onClick={() => toggle(z)}
                    onMouseEnter={() => onHover([z])}
                    onMouseLeave={() => onHover(shown)}
                    className="flex w-full items-center gap-[8px] px-[10px] py-[5px] font-sans text-[12px] text-tp-slate-700 transition-colors hover:bg-tp-slate-100"
                  >
                    <span className={`inline-flex h-[13px] w-[13px] items-center justify-center rounded-[3px] border ${checked ? "border-tp-blue-500 bg-tp-blue-500" : "border-tp-slate-300 bg-white"} flex-shrink-0`}>
                      {checked && (
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                    </span>
                    <span className="h-[8px] w-[8px] rounded-full flex-shrink-0" style={{ background: ZONE_INFO[z].color }} />
                    <span className="flex-1 text-left">{label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>,
        document.body,
      )}
    </>
  )
}

function getDynamicSinceOptions(query: string) {
  const match = query.match(/\d+/)
  const n = match ? parseInt(match[0], 10) : 1
  const plural = n > 1 ? "s" : ""
  return [
    `${n} hour${plural}`,
    `${n} day${plural}`,
    `${n} month${plural}`,
    `${n} year${plural}`,
  ]
}

function SinceDropdown({ value, onChange, autoOpen, onFocusActivate, onBlurDeactivate }: { value: string; onChange: (v: string) => void; autoOpen?: boolean; onFocusActivate?: () => void; onBlurDeactivate?: () => void }) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(value)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (autoOpen && !value) setOpen(true)
  }, [autoOpen, value])

  useEffect(() => { setInternalValue(value) }, [value])

  const options = useMemo(() => {
    return internalValue && internalValue.match(/\d+/) ? getDynamicSinceOptions(internalValue) : [
      "1 hour", "1 day", "1 week", "1 year"
    ]
  }, [internalValue])

  useEffect(() => {
    if (!open) { setPos(null); return }
    const reposition = () => {
      const el = anchorRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 200) })
    }
    reposition()
    window.addEventListener("scroll", reposition, true)
    window.addEventListener("resize", reposition)
    return () => {
      window.removeEventListener("scroll", reposition, true)
      window.removeEventListener("resize", reposition)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      const a = anchorRef.current, p = popoverRef.current
      const t = e.target as Node
      if (a && !a.contains(t) && p && !p.contains(t)) {
        setOpen(false)
        onBlurDeactivate?.()
      }
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open, onBlurDeactivate])

  return (
    <>
      <div className="relative w-full" ref={anchorRef}>
        <input
          type="text"
          value={internalValue}
          onFocus={() => { onFocusActivate?.(); setOpen(true) }}
          onChange={(e) => {
            setInternalValue(e.target.value)
            setOpen(true)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChange(internalValue)
              setOpen(false)
            }
          }}
          placeholder="e.g. 5 days"
          className="relative z-20 h-[52px] w-full min-w-0 rounded-none border-0 bg-transparent px-[12px] pr-[30px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] placeholder:text-[#a2a2a8] focus:outline-none focus:ring-0"
        />
        <svg className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s", flexShrink: 0 }}>
          <path d="M1 1L5 5L9 1" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && pos && createPortal(
        <div
          ref={popoverRef}
          className="fixed z-50 flex flex-col rounded-[12px] bg-white py-[6px] shadow-lg border border-tp-slate-200"
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className="px-[14px] py-[10px] text-left font-sans text-[13px] text-tp-slate-700 hover:bg-tp-slate-50 transition-colors"
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
            >
              {opt}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}

function SurfaceMultiSelect({
  selected, arch, toothPosition, onToggle, onHover,
}: {
  selected: ZoneId[]
  arch: "maxillary" | "mandibular"
  toothPosition: number
  onToggle: (z: ZoneId) => void
  onHover: (zones: ZoneId[]) => void
}) {
  return (
    <div className="flex flex-wrap gap-[6px]">
      {ALL_ZONES.map((z) => {
        const isActive = selected.includes(z)
        const label = getZoneLabel(z, arch, toothPosition)
        const color = ZONE_INFO[z].color
        return (
          <button
            key={z}
            type="button"
            onClick={() => onToggle(z)}
            onMouseEnter={() => onHover([z])}
            onMouseLeave={() => onHover(selected)}
            className={`inline-flex h-[32px] items-center gap-[6px] rounded-[10px] border px-[12px] font-sans text-[12px] font-medium transition-all ${isActive
                ? "border-tp-blue-300 bg-tp-blue-50 text-tp-blue-700"
                : "border-transparent bg-tp-slate-100 text-tp-slate-600 hover:bg-tp-slate-200"
              }`}
          >
            <span className="h-[8px] w-[8px] rounded-full" style={{ background: color }} />
            {label}
          </button>
        )
      })}
    </div>
  )
}

function SurfaceDots({
  surfaces, arch, toothPosition,
}: {
  surfaces: ZoneId[]
  arch: "maxillary" | "mandibular"
  toothPosition: number
}) {
  if (surfaces.length === 0) {
    return (
      <span className="inline-flex items-center rounded-[5px] bg-tp-slate-100 px-[6px] py-[2px] font-sans text-[12px] font-semibold text-tp-slate-600">
        Whole tooth
      </span>
    )
  }
  const abbr = (z: ZoneId) => {
    const label = getZoneLabel(z, arch, toothPosition)
    return label[0]
  }
  const shown = surfaces.slice(0, 4)
  const overflow = surfaces.length - shown.length
  return (
    <div className="flex items-center gap-[4px]">
      {shown.map((z) => (
        <span
          key={z}
          title={getZoneLabel(z, arch, toothPosition)}
          className="inline-flex h-[18px] items-center gap-[3px] rounded-[4px] px-[5px] font-sans text-[12px] font-bold text-white tabular-nums"
          style={{ background: ZONE_INFO[z].color }}
        >
          {abbr(z)}
        </span>
      ))}
      {overflow > 0 && (
        <span className="inline-flex h-[18px] items-center rounded-[4px] bg-tp-slate-100 px-[5px] font-sans text-[12px] font-semibold text-tp-slate-600">
          +{overflow}
        </span>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// Shared TP-style section card
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// PrimaryDiagnosisSection — clickable chips with + icon, search,
// and since/note inputs for the active diagnosis.
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// DentalSymptomsBody — table-based symptom entry (like EntryTab)
// Columns: Symptom | Surfaces | Since | Severity | Note
// ──────────────────────────────────────────────────────────────
interface SymptomRow {
  id: string
  name: string
  surfaces: ZoneId[]
  since: string
  severity: string
  note: string
}

const DENTAL_SYMPTOM_CATALOG = [
  "Tooth pain", "Sensitivity to cold", "Sensitivity to hot", "Sensitivity to sweet",
  "Throbbing pain", "Pain on biting", "Swelling", "Bleeding gums",
  "Bad breath", "Loose tooth", "Discolouration", "Difficulty chewing",
  "Jaw pain", "Clicking sound", "Food impaction", "Spontaneous pain",
] as const

let _symId = 0
const getSymId = () => `sym-${++_symId}`

function SymptomSurfacePicker({ surfaces, arch, toothPosition, mode = "symptom", onChange }: {
  surfaces: ZoneId[]
  arch: "maxillary" | "mandibular"
  toothPosition: number
  mode?: "finding" | "treatment" | "symptom"
  onChange: (next: ZoneId[]) => void
}) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const selected = new Set(surfaces)

  useEffect(() => {
    if (!open) { setPos(null); return }
    const el = anchorRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 200) })
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      const a = anchorRef.current, p = popoverRef.current, t = e.target as Node
      if (a && !a.contains(t) && p && !p.contains(t)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open])

  const toggle = (z: ZoneId) => {
    if (z === "whole") {
      onChange(selected.has(z) ? [] : ["whole"])
      return
    }

    if (selected.has("whole")) {
      onChange([z])
      return
    }

    onChange(selected.has(z) ? surfaces.filter((s) => s !== z) : [...surfaces, z])
  }

  const optionsList = mode === "symptom" ? ALL_ZONES : ["whole" as ZoneId, ...ALL_ZONES]

  return (
    <>
      <button ref={anchorRef} type="button" onClick={() => setOpen((o) => !o)}
        className={`flex h-[42px] w-full min-w-0 items-center justify-between gap-[6px] rounded-[4px] px-[10px] font-sans text-[14px] transition-colors ${open ? "bg-white ring-[1.5px] ring-inset ring-tp-blue-400 shadow-[0_0_0_3px_rgba(59,130,246,0.12)]" : "bg-white"
          }`}
      >
        <span className="flex-1 min-w-0 text-left whitespace-nowrap overflow-hidden text-ellipsis">
          {surfaces.length === 0 ? (
            <span className="text-tp-slate-400">Select surface</span>
          ) : surfaces.includes("whole") ? (
            <span className="inline-flex items-center gap-[4px] font-medium text-tp-slate-700">
              <span className="h-[8px] w-[8px] rounded-full bg-tp-slate-400" />
              Whole tooth
            </span>
          ) : (
            <SurfaceDots surfaces={surfaces.filter(z => z !== "whole")} arch={arch} toothPosition={toothPosition} />
          )}
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>
          <path d="M1 1l4 4 4-4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && pos && typeof document !== "undefined" && createPortal(
        <div ref={popoverRef}
          className="fixed z-[9999] rounded-[8px] border border-tp-slate-200 bg-white shadow-[0_6px_20px_-6px_rgba(15,23,42,0.18)]"
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          <ul className="max-h-[200px] overflow-y-auto py-[2px]">
            {optionsList.map((z) => {
              let checked = selected.has(z)
              let label = getZoneLabel(z, arch, toothPosition)
              let color = ZONE_INFO[z]?.color || "#888"

              if (z === "whole") {
                label = "Whole Tooth"
                color = "#64748b"
                if (mode !== "treatment") {
                  checked = ALL_ZONES.every(az => selected.has(az))
                }
              }

              return (
                <li key={z}>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); toggle(z) }}
                    className="flex w-full items-center gap-[8px] px-[10px] py-[5px] font-sans text-[12px] text-tp-slate-700 transition-colors hover:bg-tp-slate-100"
                  >
                    <span className={`inline-flex h-[13px] w-[13px] items-center justify-center rounded-[3px] border ${checked ? "border-tp-blue-500 bg-tp-blue-500" : "border-tp-slate-300 bg-white"} flex-shrink-0`}>
                      {checked && <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M6 12l4.5 4.5L18 7.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </span>
                    <span className="h-[8px] w-[8px] rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="flex-1 text-left">{label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>,
        document.body
      )}
    </>
  )
}

function DentalSymptomsBody({ rows, onUpdateRows, state }: { rows: SymptomRow[]; onUpdateRows: (v: SymptomRow[]) => void; state: DentalCanvasState }) {
  const [query, setQuery] = useState("")
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchPopoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!searchOpen) return
    const onDoc = (e: MouseEvent) => {
      const el = e.target as Node
      if (searchInputRef.current && !searchInputRef.current.contains(el) && searchPopoverRef.current && !searchPopoverRef.current.contains(el)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [searchOpen])

  const selectedNames = new Set(rows.map((r) => r.name.toLowerCase()))

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    const pool = q ? DENTAL_SYMPTOM_CATALOG.filter((s) => s.toLowerCase().includes(q)) : DENTAL_SYMPTOM_CATALOG
    return pool.filter((s) => !selectedNames.has(s.toLowerCase())).slice(0, 12)
  }, [query, selectedNames])

  const addSymptom = (name: string) => {
    onUpdateRows([...rows, { id: getSymId(), name, surfaces: [], since: "", severity: "", note: "" }])
    setQuery("")
    setSearchOpen(false)
  }

  const updateRow = (id: string, patch: Partial<SymptomRow>) => {
    onUpdateRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const removeRow = (id: string) => onUpdateRows(rows.filter((r) => r.id !== id))

  return (
    <div data-rx-module-root className="p-[12px]">
      {/* Table */}
      {rows.length > 0 && (
        <div className="relative overflow-x-auto rounded-[12px] border border-tp-slate-200">
          <table className="w-full table-fixed font-['Inter',sans-serif] text-[14px]">
            <colgroup>
              <col style={{ minWidth: 140 }} />
              <col style={{ width: 140, minWidth: 120 }} />
              <col style={{ width: 100, minWidth: 90 }} />
              <col style={{ width: 140, minWidth: 140 }} />
              <col style={{ minWidth: 110 }} />
              <col style={{ width: 44, minWidth: 44, maxWidth: 44 }} />
            </colgroup>
            <thead>
              <tr className="h-[38px] bg-tp-slate-50 text-left font-['Inter',sans-serif] text-[12px] text-tp-slate-500">
                <th className="border-r border-tp-slate-100 px-3 py-2 font-semibold uppercase tracking-[0.5px]">NAME</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 font-semibold uppercase tracking-[0.5px]">SURFACES</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 font-semibold uppercase tracking-[0.5px]">SINCE</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 font-semibold uppercase tracking-[0.5px]">SEVERITY</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 font-semibold uppercase tracking-[0.5px]">NOTE</th>
                <th className="sticky right-0 z-40 border-l border-tp-slate-200/80 bg-tp-slate-50 px-0 py-2 text-center font-semibold shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const isRowActive = activeRowId === r.id
                return (
                  <tr key={r.id} className="border-t border-tp-slate-100 transition-colors"
                    onClick={() => setActiveRowId(isRowActive ? null : r.id)}
                  >
                    <td className="border-r border-tp-slate-100 p-0 align-middle">
                      <span className="flex h-[42px] w-full items-center px-[10px] font-sans text-[14px] font-semibold text-tp-slate-800">{r.name}</span>
                    </td>
                    <td className="border-r border-tp-slate-100 p-0 align-middle" onClick={(ev) => ev.stopPropagation()}>
                      <SymptomSurfacePicker
                        key={r.id}
                        surfaces={r.surfaces}
                        arch={state.selectedTooth.arch}
                        toothPosition={state.selectedTooth.position}
                        onChange={(next) => updateRow(r.id, { surfaces: next })}
                      />
                    </td>
                    <td className="border-r border-tp-slate-100 p-0 align-middle">
                      <input type="text" value={r.since} onChange={(e) => updateRow(r.id, { since: e.target.value })} placeholder="e.g. 5 days"
                        className="h-[42px] w-full rounded-none border-0 bg-white px-[10px] font-sans text-[14px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:outline-none focus:ring-[1.5px] focus:ring-inset focus:ring-tp-blue-400 focus:rounded-[4px] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                      />
                    </td>
                    <td className="border-r border-tp-slate-100 p-0 align-middle">
                      <select value={r.severity} onChange={(e) => updateRow(r.id, { severity: e.target.value })}
                        className={`h-[42px] w-full rounded-none border-0 bg-white px-[10px] font-sans text-[14px] focus:outline-none focus:ring-[1.5px] focus:ring-inset focus:ring-tp-blue-400 focus:rounded-[4px] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] ${r.severity ? "text-tp-slate-700" : "text-tp-slate-400"}`}
                      >
                        <option value="" className="text-tp-slate-400">e.g. Moderate</option>
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                      </select>
                    </td>
                    <td className="border-r border-tp-slate-100 p-0 align-middle">
                      <input type="text" value={r.note} onChange={(e) => updateRow(r.id, { note: e.target.value })} placeholder="e.g. Worsens at night"
                        className="h-[42px] w-full rounded-none border-0 bg-white px-[10px] font-sans text-[14px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:outline-none focus:ring-[1.5px] focus:ring-inset focus:ring-tp-blue-400 focus:rounded-[4px] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                      />
                    </td>
                    <td className="sticky right-0 z-30 border-l border-tp-slate-200/80 bg-white px-0 py-2 text-center align-middle shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]">
                      <button type="button" onClick={(ev) => { ev.stopPropagation(); removeRow(r.id) }} title="Remove"
                        className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-[6px] text-tp-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash size={14} color="currentColor" variant="Linear" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Search & Add */}
      <div className="mt-[10px]">
        <div className="relative">
          <span className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-tp-slate-400">
            <SearchNormal1 size={14} color="currentColor" variant="Linear" />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSearchOpen(true)
            }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={(e) => { if (e.key === "Enter" && query.trim()) addSymptom(query.trim()) }}
            placeholder="Search & Add Dental Symptom"
            className="h-[36px] w-full rounded-[8px] border border-tp-slate-200 bg-white pl-[32px] pr-[12px] font-sans text-[14px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:outline-none"
          />

          {searchOpen && filtered.length > 0 && (
            <div
              ref={searchPopoverRef}
              className="absolute left-0 top-full mt-[4px] w-full z-50 flex flex-col rounded-[12px] border border-tp-slate-200 bg-white py-[6px] shadow-[0_8px_20px_-4px_rgba(15,23,42,0.12)] max-h-[260px] overflow-y-auto"
            >
              {filtered.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addSymptom(s)}
                  className="px-[14px] py-[10px] text-left font-sans text-[13px] text-tp-slate-700 hover:bg-tp-slate-50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PrimaryDiagnosisBody({ state }: { state: DentalCanvasState }) {
  const [activeCell, setActiveCell] = useState<{ rowId: string; colKey: string } | null>(null)
  const [query, setQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchPopoverRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)

  // Auto-close search popover on outside click
  useEffect(() => {
    if (!searchOpen) { setPos(null); return }
    const onDoc = (e: MouseEvent) => {
      const el = e.target as Node
      if (searchInputRef.current && !searchInputRef.current.contains(el) && searchPopoverRef.current && !searchPopoverRef.current.contains(el)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [searchOpen])

  // Active diagnoses as "rows"
  const activeRows = useMemo(() => {
    const list: string[] = []
    state.currentToothDiagnoses.forEach((d) => list.push(d))
    if (state.isImplant && !list.includes("Implant")) list.push("Implant")
    return list
  }, [state.currentToothDiagnoses, state.isImplant])

  const filteredCatalog = useMemo(() => {
    const q = query.toLowerCase().trim()
    const activeSet = new Set(activeRows.map((r) => r.toLowerCase()))
    const pool = q ? TOOTH_DIAGNOSES.filter((c) => c.toLowerCase().includes(q)) : TOOTH_DIAGNOSES
    return pool.filter((c) => !activeSet.has(c.toLowerCase())).slice(0, 12)
  }, [query, activeRows])

  useEffect(() => {
    if (!searchOpen) return
    const el = searchInputRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({ top: r.bottom + 4, left: r.left, width: r.width })
  }, [searchOpen, filteredCatalog])

  // Track most recently added diagnosis so we can auto-open its Since dropdown.
  const [lastAddedName, setLastAddedName] = useState<string | null>(null)
  const addDiagnosis = (name: string) => {
    if (name === "Implant") state.onToggleImplant()
    else state.onToggleToothDiagnosis(name)
    const existing = state.currentTreatmentHistoryDetails[name]
    state.onUpdateTreatmentHistoryDetail(name, {
      surfaces: existing?.surfaces?.length ? existing.surfaces : getDefaultTreatmentSurfaces(name),
      since: existing?.since,
      note: existing?.note,
    })
    setActiveCell({ rowId: name, colKey: "surfaces" })
    setLastAddedName(name)
    setQuery("")
    setSearchOpen(false)
  }

  const removeDiagnosis = (name: string) => {
    if (name === "Implant") state.onToggleImplant()
    else state.onToggleToothDiagnosis(name)
    if (activeCell?.rowId === name) setActiveCell(null)
  }

  useEffect(() => {
    if (activeCell?.rowId && !activeRows.includes(activeCell.rowId)) setActiveCell(null)
  }, [activeCell, activeRows])

  const activeRowName = activeCell?.colKey === "surfaces" && activeCell.rowId && activeRows.includes(activeCell.rowId) ? activeCell.rowId : null
  const activeRowSurfaces = activeRowName ? (state.currentTreatmentHistoryDetails[activeRowName]?.surfaces ?? []) : []
  const clearCellActive = useCallback((rowId: string, colKey: string) => {
    window.setTimeout(() => {
      setActiveCell((current) => current && current.rowId === rowId && current.colKey === colKey ? null : current)
    }, 80)
  }, [])
  const isCellActive = useCallback((rowId: string, colKey: string) => activeCell?.rowId === rowId && activeCell?.colKey === colKey, [activeCell])

  useEffect(() => {
    if (!activeRowName) {
      state.onClearMultiSelect()
      state.onSetMultiSelectActive(false)
      return
    }
    state.onSetMultiSelectZones(activeRowSurfaces)
    state.onSetMultiSelectActive(true)
  }, [activeRowName]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!activeRowName) return
    const zonesFromCanvas = Array.from(state.multiSelectZones)
    const same = zonesFromCanvas.length === activeRowSurfaces.length
      && zonesFromCanvas.every((zone) => activeRowSurfaces.includes(zone))
    if (!same) {
      state.onUpdateTreatmentHistoryDetail(activeRowName, { surfaces: zonesFromCanvas })
    }
  }, [activeRowName, activeRowSurfaces, state.multiSelectZones]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => { state.onSetMultiSelectActive(false) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div data-rx-module-root className="p-[12px]">
      {/* Table */}
      {activeRows.length > 0 && (
        <div className="relative overflow-x-auto rounded-[12px] border border-tp-slate-200">
          <table className="w-full table-fixed font-['Inter',sans-serif] text-[14px]">
            <colgroup>
              <col style={{ width: 36, minWidth: 36 }} />
              <col style={{ minWidth: 120 }} />
              <col style={{ width: 140, minWidth: 120 }} />
              <col style={{ width: 140, minWidth: 120 }} />
              <col style={{ minWidth: 140 }} />
              <col style={{ width: 44, minWidth: 44, maxWidth: 44 }} />
            </colgroup>
            <thead>
              <tr className="h-[38px] bg-tp-slate-50 text-left font-['Inter',sans-serif] text-[12px] text-tp-slate-500">
                <th className="border-r border-tp-slate-100 px-0 py-2 text-center font-semibold" />
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left text-[12px] font-semibold">NAME</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left text-[12px] font-semibold">SURFACES</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left text-[12px] font-semibold">SINCE</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left text-[12px] font-semibold">NOTE</th>
                <th className="sticky right-0 z-40 border-l border-tp-slate-200/80 bg-tp-slate-50 px-0 py-2 text-center font-semibold shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]" />
              </tr>
            </thead>
            <tbody>
              {activeRows.map((name) => {
                const color = PRIMARY_DIAG_COLOR[name] ?? "#4b4ad5"
                const d = state.currentTreatmentHistoryDetails[name] ?? { since: "", note: "", surfaces: [] }
                const isSurfaceActive = isCellActive(name, "surfaces")
                const isSinceActive = isCellActive(name, "since")
                const isNoteActive = isCellActive(name, "note")
                const activateSurfaceCell = () => {
                  setActiveCell({ rowId: name, colKey: "surfaces" })
                  state.onSetMultiSelectZones(d.surfaces ?? [])
                  state.onSetMultiSelectActive(true)
                }
                return (
                  <tr
                    key={name}
                    onMouseEnter={() => { if (!isSurfaceActive) state.onSetHighlightZones(d.surfaces ?? []) }}
                    onMouseLeave={() => { if (!isSurfaceActive) state.onSetHighlightZones([]) }}
                    className="border-t border-tp-slate-100"
                  >
                    <td className="border-r border-tp-slate-100 p-0 text-center align-middle transition-colors hover:bg-tp-slate-100/60">
                      <span className="inline-flex h-[42px] w-full items-center justify-center text-tp-slate-300">
                        <svg width="8" height="16" viewBox="0 0 8 16" fill="currentColor">
                          <circle cx="2" cy="3" r="1.2" /><circle cx="2" cy="8" r="1.2" /><circle cx="2" cy="13" r="1.2" />
                          <circle cx="6" cy="3" r="1.2" /><circle cx="6" cy="8" r="1.2" /><circle cx="6" cy="13" r="1.2" />
                        </svg>
                      </span>
                    </td>
                    <td className="border-r border-tp-slate-100 p-0 align-middle transition-colors">
                      <DiagnosisNameCell
                        name={name}
                        color={color}
                        activeRows={activeRows}
                        onSwap={(next) => {
                          if (next === name) return
                          const currentDetails = state.currentTreatmentHistoryDetails[name]
                          const nextDetails = state.currentTreatmentHistoryDetails[next]
                          // Remove current, add next
                          if (name === "Implant") state.onToggleImplant()
                          else state.onToggleToothDiagnosis(name)
                          if (next === "Implant") state.onToggleImplant()
                          else state.onToggleToothDiagnosis(next)
                          state.onUpdateTreatmentHistoryDetail(next, {
                            surfaces: nextDetails?.surfaces?.length ? nextDetails.surfaces : (currentDetails?.surfaces ?? getDefaultTreatmentSurfaces(next)),
                            since: nextDetails?.since ?? currentDetails?.since,
                            note: nextDetails?.note ?? currentDetails?.note,
                          })
                          if (activeCell?.rowId === name) setActiveCell({ rowId: next, colKey: activeCell.colKey })
                        }}
                      />
                    </td>
                    <td className={`relative border-r border-tp-slate-100 p-0 align-middle transition-colors ${isSurfaceActive ? "bg-tp-blue-50/20" : ""}`} onClick={(ev) => ev.stopPropagation()}>
                      {isSurfaceActive ? <span className="pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" /> : null}
                      <SurfaceCellDropdown
                        entry={{ id: name, toothFdi: state.selectedTooth.fdi, kind: "procedure", name, surfaces: d.surfaces ?? [] }}
                        arch={state.selectedTooth.arch}
                        toothPosition={state.selectedTooth.position}
                        mode="treatment"
                        isActive={isSurfaceActive}
                        onActivate={activateSurfaceCell}
                        onDeactivate={() => {
                          if (state.selectedZone === "whole") state.onClearSelectedZone()
                          clearCellActive(name, "surfaces")
                        }}
                        onToggleZone={state.onToggleZoneMultiSelect}
                        onHover={state.onSetHighlightZones}
                        multiSelectZones={state.multiSelectZones}
                      />
                    </td>
                    <td className={`relative border-r border-tp-slate-100 p-0 align-middle transition-colors ${isSinceActive ? "bg-tp-blue-50/20" : ""}`}>
                      {isSinceActive ? <span className="pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" /> : null}
                      <SinceDropdown
                        value={d.since ?? ""}
                        onChange={(v) => state.onUpdateTreatmentHistoryDetail(name, { since: v })}
                        autoOpen={lastAddedName === name}
                        onFocusActivate={() => setActiveCell({ rowId: name, colKey: "since" })}
                        onBlurDeactivate={() => clearCellActive(name, "since")}
                      />
                    </td>
                    <td className={`relative border-r border-tp-slate-100 p-0 align-middle transition-colors ${isNoteActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`}>
                      {isNoteActive ? <span className="pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" /> : null}
                      <input
                        type="text"
                        value={d.note ?? ""}
                        onChange={(e) => state.onUpdateTreatmentHistoryDetail(name, { note: e.target.value })}
                        onFocus={() => setActiveCell({ rowId: name, colKey: "note" })}
                        onBlur={() => clearCellActive(name, "note")}
                        placeholder="e.g. Monitor at next visit"
                        className="relative z-20 h-[52px] w-full rounded-none border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] placeholder:text-[#a2a2a8] focus:outline-none focus:ring-0"
                      />
                    </td>
                    <td className="sticky right-0 z-30 border-l border-tp-slate-200/80 bg-white px-0 py-2 text-center align-middle shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)] transition-colors hover:bg-tp-slate-100/60">
                      <button
                        type="button"
                        onClick={() => removeDiagnosis(name)}
                        title="Remove"
                        className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-[6px] text-tp-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash size={14} color="currentColor" variant="Linear" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Search & Add */}
      <div className="mt-[10px]">
        <div className="relative">
          <span className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-tp-slate-400">
            <SearchNormal1 size={14} color="currentColor" variant="Linear" />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSearchOpen(true)
            }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={(e) => { if (e.key === "Enter" && query.trim()) { const match = TOOTH_DIAGNOSES.find((d) => d.toLowerCase() === query.toLowerCase().trim()); if (match) addDiagnosis(match) } }}
            placeholder="Search & Add Treatment History"
            className="h-[36px] w-full rounded-[8px] border border-tp-slate-200 bg-white pl-[32px] pr-[12px] font-sans text-[12px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:outline-none"
          />

          {searchOpen && pos && filteredCatalog.length > 0 && typeof document !== "undefined" && createPortal(
            <div
              ref={searchPopoverRef}
              className="fixed z-[9999] flex flex-col rounded-[12px] border border-tp-slate-200 bg-white py-[6px] shadow-[0_8px_20px_-4px_rgba(15,23,42,0.12)] max-h-[260px] overflow-y-auto"
              style={{ top: pos.top, left: pos.left, width: pos.width }}
            >
              {filteredCatalog.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => addDiagnosis(c)}
                  className="px-[14px] py-[10px] text-left font-sans text-[13px] text-tp-slate-700 hover:bg-tp-slate-50 transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>,
            document.body
          )}
        </div>
        
        {/* Quick Selective Chips */}
        {query.length === 0 && (
          <div className="mt-3 flex flex-wrap gap-[6px]">
            {["Implant", "RCT", "Missing", "Crown", "Bridge", "Denture", "Extraction"].map(chip => {
              if (activeRows.includes(chip)) return null;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => addDiagnosis(chip)}
                  className="inline-flex h-[30px] items-center rounded-[10px] bg-tp-slate-100 px-[12px] font-sans text-[12px] font-medium text-tp-slate-600 transition-colors hover:bg-tp-slate-200 hover:text-tp-slate-700"
                >
                  {chip}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
