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
import dynamic from "next/dynamic"
import { InfoCircle, TickCircle, ArrowLeft2, Eye, Trash, ArrowRight2, Grid5, Ram, Eraser, More, Add, Edit2, Calendar, SearchNormal1 } from "iconsax-reactjs"
import { ExpandIcon, MinimizeIcon } from "./ui-icons"
import type { DentalCanvasState } from "./DentalCanvas"
import { DIAGNOSES, TOOTH_DIAGNOSES, ZONE_INFO, ALL_ZONES, getZoneLabel, TEETH, PROCEDURE_CATALOG } from "./types"
import type { ZoneId, ToothEntry } from "./types"
import { MiniToothCanvas } from "./MiniToothCanvas"
import { TPMedicalIcon } from "@/components/tp-ui/medical-icons"

const DentalCanvas = dynamic(() => import("./DentalCanvas").then((m) => m.DentalCanvas), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-tp-slate-100">
      <div className="flex flex-col items-center gap-[12px]">
        <div className="h-[32px] w-[32px] animate-spin rounded-full border-[3px] border-tp-slate-200 border-t-tp-blue-500" />
        <p className="font-sans text-[12px] text-tp-slate-500">Loading 3D dental canvas…</p>
      </div>
    </div>
  ),
})

interface ExaminationTabProps {
  patientId: string
}

// Score weights per diagnosis/finding severity (out of 100).
const DIAG_WEIGHT: Record<string, number> = {
  Missing: 8, Implant: 2, RCT: 4, Crown: 2, Bridge: 3, Denture: 3,
}

/** Accent colors per tooth-level diagnosis — makes each chip visually distinct */
const PRIMARY_DIAG_COLOR: Record<string, string> = {
  Implant: "#0891b2",   // cyan
  Missing: "#dc2626",   // red
  RCT:     "#ea580c",   // orange
  Crown:   "#d4af37",   // gold
  Bridge:  "#a16207",   // amber-brown
  Denture: "#ec4899",   // pink
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

export function ExaminationTab({ patientId }: ExaminationTabProps) {
  const [canvasState, setCanvasState] = useState<DentalCanvasState | null>(null)
  const isSingle = canvasState?.viewMode === "single-tooth"
  const containerRef = useRef<HTMLDivElement>(null)
  // Separate persisted widths for dentition vs single-tooth. Both draggable 40-60.
  // Defer localStorage read to useEffect so SSR + first client render match.
  // Default: dentition 30% (canvas takes 70%); single-tooth 65% content / 35% canvas.
  const [dentitionAsidePct, setDentitionAsidePct] = useState<number>(30)
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
    const getClientX = (e: MouseEvent | TouchEvent): number | null => {
      if ("touches" in e) return e.touches[0]?.clientX ?? null
      return (e as MouseEvent).clientX
    }
    const onMove = (e: MouseEvent | TouchEvent) => {
      const el = containerRef.current
      if (!el) return
      const x = getClientX(e)
      if (x == null) return
      const r = el.getBoundingClientRect()
      const [min, max] = isSingle ? [50, 70] : [30, 40]
      // Panel is on the RIGHT now → measure from right edge.
      const pct = Math.min(max, Math.max(min, ((r.right - x) / r.width) * 100))
      if (isSingle) setSingleAsidePct(pct)
      else setDentitionAsidePct(pct)
    }
    const onUp = () => setDragging(false)
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseup", onUp)
    document.addEventListener("touchmove", onMove, { passive: false })
    document.addEventListener("touchend", onUp)
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"
    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseup", onUp)
      document.removeEventListener("touchmove", onMove)
      document.removeEventListener("touchend", onUp)
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

  return (
    <div ref={containerRef} className="relative flex h-full w-full overflow-hidden bg-tp-slate-100">
      {/* Left: 3D canvas — plain white with subtle grid + minimal dots */}
      <div
        className="relative min-w-0 my-[12px] ml-[12px] rounded-[20px] overflow-hidden bg-white"
        style={{
          width: `calc(${canvasPct}% - 12px)`,
          transition: dragging ? "none" : "width 900ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
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
          <DentalCanvas patientId={patientId} compact onStateChange={setCanvasState} />
        </div>
      </div>

      {/* Invisible drag handle (no visible divider) */}
      <div
        role="separator"
        aria-label="Resize panel"
        aria-orientation="vertical"
        onMouseDown={(e) => { e.preventDefault(); setDragging(true) }}
        onTouchStart={(e) => { e.preventDefault(); setDragging(true) }}
        className="relative w-0 shrink-0 cursor-col-resize touch-none z-40"
      >
        <span className="absolute inset-y-0 -left-[20px] -right-[20px] touch-none" />
        <img
          src="/icons/ui/drag-handle.svg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
          style={{ display: "block", width: "22px", height: "32px", maxWidth: "none" }}
        />
      </div>

      {/* Right: Context-aware panel */}
      <aside
        className="flex shrink-0 flex-col overflow-hidden bg-tp-slate-100"
        style={{ width: `${asidePct}%`, transition: dragging ? "none" : "width 900ms cubic-bezier(0.4, 0, 0.2, 1) 100ms" }}
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
            <div className="flex h-full w-full flex-col p-[12px]">
              {/* Expanding card wrapping the whole single-tooth view */}
              <div className="flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-white border-[2px] border-white">
                <SingleToothPanel state={canvasState} />
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-[16px]">
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
  const infoBtnRef = useRef<HTMLButtonElement>(null)

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
      <ScoreCard data={scoreData} infoBtnRef={infoBtnRef} showFormula={showFormula} setShowFormula={setShowFormula} />

      {/* Tooth records */}
      <div className="mt-[20px] mb-[10px] flex items-center gap-[8px] px-[2px]">
        <h3 className="font-sans text-[14px] font-semibold text-tp-slate-800">
          Tooth records
        </h3>
        {summary.length > 0 && (
          <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-tp-slate-200 font-sans text-[10px] font-bold text-tp-slate-600 tabular-nums">
            {summary.length}
          </span>
        )}
      </div>

      {summary.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-[10px] rounded-[16px] border border-dashed border-tp-slate-200 bg-white py-[40px] px-[20px]">
          <Eye size={32} color="#cbd5e1" variant="Linear" />
          <p className="font-sans text-[14px] font-semibold text-tp-slate-600">No findings yet</p>
          <p className="max-w-[260px] text-center font-sans text-[12px] text-tp-slate-400">
            Click any tooth on the 3D view to add diagnoses or zone findings.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-[8px]">
          {summary.map((entry) => {
            const tooth = TEETH.find((t) => t.fdi === entry.fdi)
            const toothName = tooth?.name ?? ""
            const isMax = tooth?.arch === "maxillary"
            // Determine thumbnail color by most-severe diagnosis
            let crownColor = "#E8DDD5", rootColor = "#C4AD97"
            if (entry.diagnoses.includes("Missing")) { crownColor = "#d1d5db"; rootColor = "#d1d5db" }
            else if (entry.diagnoses.includes("Crown") || entry.diagnoses.includes("Bridge")) { crownColor = "#D4AF37"; rootColor = "#C4AD97" }
            else if (entry.diagnoses.includes("RCT")) { crownColor = "#f87171"; rootColor = "#C4AD97" }
            else if (entry.diagnoses.includes("Implant")) { crownColor = "#9ca3af"; rootColor = "#6B7280" }
            return (
              <button
                key={entry.fdi}
                type="button"
                onClick={() => openTooth(entry.fdi)}
                onMouseEnter={() => state?.onSetHoveredTooth(entry.fdi)}
                onMouseLeave={() => state?.onSetHoveredTooth(null)}
                className={`group flex items-center gap-[12px] rounded-[14px] p-[12px] text-left transition-all ring-1 ${
                  state?.hoveredToothFdi === entry.fdi
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
                    <span className="inline-flex h-[20px] items-center rounded-[5px] bg-tp-slate-100 px-[6px] font-sans text-[11px] font-semibold text-tp-slate-600 tabular-nums group-hover:bg-tp-blue-50 group-hover:text-tp-blue-700">
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
                      <span key={f} className="inline-flex items-center rounded-[4px] bg-amber-50 px-[6px] py-[2px] font-sans text-[12px] font-medium text-amber-700">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expand (zoom-in) icon — blue on card hover / external hover */}
                <span className={`flex-shrink-0 transition-colors group-hover:text-tp-blue-500 ${
                  state?.hoveredToothFdi === entry.fdi ? "text-tp-blue-500" : "text-tp-slate-400"
                }`}>
                  <ExpandIcon size={16} />
                </span>
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

// ──────────────────────────────────────────────────────────────
// SummaryPill — compact chip with a TP medical icon + label
// ──────────────────────────────────────────────────────────────
function SummaryPill({ icon, label, tone }: { icon: string; label: string; tone: "violet" | "amber" | "blue" }) {
  const tones = {
    violet: { bg: "bg-tp-violet-50",  text: "text-tp-violet-700", colour: "var(--tp-violet-600)" },
    amber:  { bg: "bg-amber-50",      text: "text-amber-700",      colour: "#b45309" },
    blue:   { bg: "bg-tp-blue-50",    text: "text-tp-blue-700",    colour: "var(--tp-blue-600)" },
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
  infoBtnRef: React.RefObject<HTMLButtonElement | null>
  showFormula: boolean
  setShowFormula: (v: boolean | ((p: boolean) => boolean)) => void
}) {
  const { score, rating, affectedTeeth } = data
  const zoneIdx = score >= 90 ? 4 : score >= 75 ? 3 : score >= 60 ? 2 : score >= 40 ? 1 : 0
  // Original TP palette — red → orange → amber → violet → emerald.
  // Hex values required so alpha-suffix (e.g. `${accent}40`) works in gradients.
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
  const did = `gauge-disc-${zoneIdx}`
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
            className="pointer-events-auto inline-flex items-center gap-[5px] rounded-full px-[12px] py-[3px] font-sans text-[11px] font-bold whitespace-nowrap backdrop-blur-[6px] cursor-pointer mt-[2px]"
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
        <p className="font-sans text-[11px] font-semibold text-white/95">How this is calculated</p>
        <p className="mt-[2px] font-sans text-[10px] leading-[14px] text-white/55">
          Starts at 100, decreases with diagnoses &amp; findings.
        </p>
        <div className="mt-[8px] flex flex-col gap-[4px]">
          <TooltipRow label="Diagnoses" value={data.breakdown.diag} />
          <TooltipRow label="Findings" value={data.breakdown.findings} />
        </div>
        <div className="mt-[7px] flex items-center justify-between border-t border-white/15 pt-[6px]">
          <span className="font-sans text-[10px] font-medium text-white/60">Total deducted</span>
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
      <span className="font-sans text-[11px] font-medium text-white/80">{label}</span>
      <span className="font-sans text-[11px] font-semibold tabular-nums text-white">−{value}</span>
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
type SectionId = "procedures" | "findings" | "symptoms" | "planned" | "notes"

function SingleToothPanel({ state }: { state: DentalCanvasState }) {
  const [activeSection, setActiveSection] = useState<SectionId | null>("procedures")
  const tryBack = () => state.onBackToDentition()
  const sectionRefs = useRef<Record<SectionId, HTMLDivElement | null>>({
    procedures: null, findings: null, symptoms: null, planned: null, notes: null,
  })

  const findingCount = state.currentToothEntries.filter((e) => e.kind === "finding").length
  const symptomCount = state.currentToothEntries.filter((e) => e.kind === "symptom").length
  const procedureCount = state.currentToothEntries.filter((e) => e.kind === "procedure").length
  const plannedCount = state.currentToothEntries.filter((e) => e.kind === "planned").length
  const diagnosisCount = state.currentToothDiagnoses.size + (state.isImplant ? 1 : 0)
  const notesFilled = state.currentToothNotes.trim().length > 0

  // Dental charting sections — standard clinical workflow order
  const sections: { id: SectionId; label: string; icon: string; count: number }[] = [
    { id: "procedures", label: "Dental History",         icon: "medical-file-03",      count: diagnosisCount + procedureCount },
    { id: "findings",   label: "Clinical Examination",   icon: "medical service",      count: findingCount },
    { id: "symptoms",   label: "Chief Complaint",        icon: "Virus",                count: symptomCount },
    { id: "planned",    label: "Treatment Plan",         icon: "clipboard-activity",   count: plannedCount },
    { id: "notes",      label: "Notes",                  icon: "Notepad",              count: notesFilled ? 1 : 0 },
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
      {/* Tooth identity header — pure white */}
      <header className="shrink-0 bg-white">
        <div className="flex items-center gap-[10px] px-[14px] py-[10px]">
          <div className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-tp-slate-50">
            <MiniToothCanvas
              tooth={state.selectedTooth}
              size={36}
              diagnoses={state.currentToothDiagnoses}
              isImplant={state.isImplant}
              findings={state.findings}
            />
          </div>
          <h2 className="font-sans text-[16px] font-semibold text-tp-slate-900 truncate">
            {state.selectedTooth.name}
          </h2>
          <span className="inline-flex h-[22px] items-center rounded-[5px] bg-tp-slate-100 px-[8px] font-sans text-[12px] font-semibold text-tp-slate-600 tabular-nums">
            T{state.selectedTooth.fdi}
          </span>
          <div className="flex-1" />
          <button
            type="button"
            onClick={tryBack}
            aria-label="Back to all teeth"
            title="Back to all teeth"
            className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-900 hover:text-white"
          >
            <MinimizeIcon size={14} />
          </button>
        </div>
        {/* Jump-nav removed — users click directly on section accordions */}
      </header>

      {/* SCROLLABLE BODY — neutral #F2F2F2 so white section cards stack visibly without borders */}
      <div
        className="flex-1 min-h-0 overflow-y-auto px-[14px] py-[14px] flex flex-col gap-[10px]"
        style={{ background: "#F2F2F2" }}
      >
        {/* Treatment History — tooth-level status chips (Crown/RCT/Implant) + past procedure entries */}
        <div ref={(el) => { sectionRefs.current.procedures = el }}>
          <AccordionWrap open={activeSection === "procedures"} onExpand={() => jumpTo("procedures")}
            header={<SectionHeader title="Dental History" medicalIcon="medical-file-03"
              onTemplate={activeSection === "procedures" ? () => {} : undefined}
              onSave={activeSection === "procedures" ? () => {} : undefined}
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
            header={<SectionHeader title="Clinical Examination" medicalIcon="medical service"
              onTemplate={activeSection === "findings" ? () => {} : undefined}
              onSave={activeSection === "findings" ? () => {} : undefined}
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

        <div ref={(el) => { sectionRefs.current.symptoms = el }}>
          <AccordionWrap open={activeSection === "symptoms"} onExpand={() => jumpTo("symptoms")}
            header={<SectionHeader title="Chief Complaint" medicalIcon="Virus"
              onTemplate={activeSection === "symptoms" ? () => {} : undefined}
              onSave={activeSection === "symptoms" ? () => {} : undefined}
              onClear={activeSection === "symptoms" ? () => {
                state.currentToothEntries.filter((e) => e.kind === "symptom").forEach((e) => state.onRemoveEntry(e.id))
              } : undefined}
              clearDisabled={symptomCount === 0}
              chevron={activeSection === "symptoms" ? "up" : "down"}
              onClick={() => jumpTo("symptoms")}
              onChevronClick={() => jumpTo("symptoms")}
            />}>
            <EntryTab state={state} kind="symptom" />
          </AccordionWrap>
        </div>

        <div ref={(el) => { sectionRefs.current.planned = el }}>
          <AccordionWrap open={activeSection === "planned"} onExpand={() => jumpTo("planned")}
            header={<SectionHeader title="Treatment Plan" medicalIcon="clipboard-activity"
              onTemplate={activeSection === "planned" ? () => {} : undefined}
              onSave={activeSection === "planned" ? () => {} : undefined}
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
            header={<SectionHeader title="Notes" medicalIcon="Notepad"
              onTemplate={activeSection === "notes" ? () => {} : undefined}
              onSave={activeSection === "notes" ? () => {} : undefined}
              onClear={activeSection === "notes" ? () => state.onUpdateToothNotes("") : undefined}
              chevron={activeSection === "notes" ? "up" : "down"}
              onClick={() => jumpTo("notes")}
              onChevronClick={() => jumpTo("notes")}
            />}>
            <div className="p-[14px]">
              <textarea
                value={state.currentToothNotes}
                onChange={(e) => state.onUpdateToothNotes(e.target.value)}
                placeholder="General notes for this tooth…"
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
// AccordionWrap — simple rounded card that collapses its body.
// ──────────────────────────────────────────────────────────────
function AccordionWrap({
  open, header, children, onExpand,
}: { open: boolean; header: React.ReactNode; children: React.ReactNode; onExpand: () => void }) {
  return (
    <div
      className={`rounded-[14px] bg-white overflow-hidden transition-all ${
        open ? "shadow-[0_2px_10px_-2px_rgba(15,23,42,0.10)]" : ""
      }`}
      onClick={open ? undefined : onExpand}
    >
      {header}
      {open && <div>{children}</div>}
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
      className={`flex items-center gap-[8px] px-[14px] pt-[10px] pb-[6px] ${onClick ? "cursor-pointer hover:bg-tp-slate-100/60" : ""}`}
    >
      {medicalIcon && (
        <span className="inline-flex h-[32px] w-[32px] items-center justify-center text-tp-violet-500 flex-shrink-0">
          <TPMedicalIcon name={medicalIcon} variant="bulk" size={22} color="var(--tp-violet-500)" />
        </span>
      )}
      <h4 className="font-sans text-[14px] font-semibold text-tp-slate-800">{title}</h4>
      {typeof count === "number" && count > 0 && (
        <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-tp-slate-100 px-[5px] font-sans text-[10px] font-bold text-tp-slate-600 tabular-nums">
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
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  const isMissing = state.currentToothDiagnoses.has("Missing")
  const catalog = kind === "finding" ? (DIAGNOSES as readonly string[]) : kind === "symptom" ? (DENTAL_SYMPTOM_CATALOG as readonly string[]) : (kind === "planned" || kind === "procedure") ? (PROCEDURE_CATALOG as readonly string[]) : (PROCEDURE_CATALOG as readonly string[])
  const entries = state.currentToothEntries.filter((e) => e.kind === kind)
  const activeRow = entries.find((e) => e.id === activeRowId) ?? null

  // Push multiSelectZones → active row.
  useEffect(() => {
    if (!activeRow) return
    const zonesFromCanvas = Array.from(state.multiSelectZones)
    const same = zonesFromCanvas.length === activeRow.surfaces.length && zonesFromCanvas.every((z) => activeRow.surfaces.includes(z))
    if (!same) state.onUpdateEntry(activeRow.id, { surfaces: zonesFromCanvas })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.multiSelectZones, activeRowId])

  // Seed multiSelectZones when active row changes + toggle multi-select mode.
  useEffect(() => {
    if (!activeRow) {
      state.onClearMultiSelect()
      state.onSetMultiSelectActive(false)
      return
    }
    state.onClearMultiSelect()
    activeRow.surfaces.forEach((z) => state.onToggleZoneMultiSelect(z))
    state.onSetMultiSelectActive(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRowId])

  // Deactivate multi-select mode on unmount (switching tabs away).
  useEffect(() => () => { state.onSetMultiSelectActive(false) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const filteredCatalog = useMemo(() => {
    const q = query.toLowerCase().trim()
    const selected = new Set(entries.map((e) => e.name.toLowerCase()))
    const pool = q ? catalog.filter((c) => c.toLowerCase().includes(q)) : catalog
    return pool.filter((c) => !selected.has(c.toLowerCase())).slice(0, 12)
  }, [query, catalog, entries])

  const pendingActivateRef = useRef(false)
  const prevCountRef = useRef(entries.length)
  useEffect(() => {
    if (pendingActivateRef.current && entries.length > prevCountRef.current) {
      const latest = entries[entries.length - 1]
      if (latest) setActiveRowId(latest.id)
      pendingActivateRef.current = false
    }
    prevCountRef.current = entries.length
  }, [entries.length, entries])

  // Procedures that apply to the whole tooth (no surface selection needed)
  const WHOLE_TOOTH_PROCEDURES = new Set([
    "RCT", "Root Canal Treatment", "Crown", "Crown Prep", "Implant", "Implant Placement",
    "Extraction", "Bridge", "Bridge Prep", "Denture", "Veneer", "Pulp Cap",
  ])

  const addEntryFromName = (name: string) => {
    // Auto-select all surfaces for whole-tooth procedures
    const isWholeTooth = WHOLE_TOOTH_PROCEDURES.has(name)
    state.onClearMultiSelect()
    if (isWholeTooth) {
      ALL_ZONES.forEach((z) => state.onToggleZoneMultiSelect(z))
    }
    pendingActivateRef.current = true
    state.onAddEntry({
      kind,
      name,
      surfaces: isWholeTooth ? [...ALL_ZONES] : [],
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
              <tr className="h-[34px] bg-tp-slate-100 text-left font-['Inter',sans-serif] text-[10px] text-tp-slate-500">
                <th className="border-r border-tp-slate-100 px-0 py-2 text-center font-semibold" />
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]">{primaryLabel}</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]">SURFACES</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]">{kind === "finding" ? "SINCE" : "DATE"}</th>
                {hasStatus && <th className="border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]">STATUS</th>}
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]">NOTE</th>
                <th className="sticky right-0 z-40 border-l border-tp-slate-200/80 bg-tp-slate-100 px-0 py-2 text-center font-semibold shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]" />
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => {
                const isActive = activeRowId === e.id
                return (
                  <tr
                    key={e.id}
                    onClick={() => setActiveRowId(isActive ? null : e.id)}
                    onMouseEnter={() => { if (!isActive) state.onSetHighlightZones(e.surfaces) }}
                    onMouseLeave={() => { if (!isActive) state.onSetHighlightZones([]) }}
                    className="border-t border-tp-slate-100 cursor-pointer"
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
                        onFocusActivate={() => setActiveRowId(e.id)}
                      />
                    </td>
                    {/* Surfaces dropdown — whole cell is the trigger */}
                    <td className="border-r border-tp-slate-100 p-0 align-middle transition-colors hover:bg-tp-slate-100/60" onClick={(ev) => ev.stopPropagation()}>
                      <SurfaceCellDropdown
                        entry={e}
                        arch={state.selectedTooth.arch}
                        toothPosition={state.selectedTooth.position}
                        isActive={isActive}
                        onActivate={() => setActiveRowId(e.id)}
                        onToggleZone={state.onToggleZoneMultiSelect}
                        onClearZones={state.onClearMultiSelect}
                        onHover={state.onSetHighlightZones}
                        multiSelectZones={state.multiSelectZones}
                      />
                    </td>
                    {/* Since / Date — whole cell */}
                    <td className="border-r border-tp-slate-100 p-0 align-middle transition-colors hover:bg-tp-slate-100/60" onClick={(ev) => ev.stopPropagation()}>
                      {kind === "finding" ? (
                        <SinceDropdown value={e.since ?? ""} onChange={(v) => state.onUpdateEntry(e.id, { since: v || undefined })} />
                      ) : (
                        <input
                          type="date"
                          value={e.plannedDate ?? ""}
                          onChange={(ev) => state.onUpdateEntry(e.id, { plannedDate: ev.target.value || undefined })}
                          className="h-[42px] w-full rounded-none border-0 bg-white px-[10px] font-sans text-[14px] text-tp-slate-700 focus:outline-none focus:ring-[1.5px] focus:ring-inset focus:ring-tp-blue-400 focus:rounded-[4px] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                        />
                      )}
                    </td>
                    {/* Status (procedures only) — matches cell design system */}
                    {hasStatus && (
                      <td className="border-r border-tp-slate-100 p-0 align-middle" onClick={(ev) => ev.stopPropagation()}>
                        <select
                          value={e.status ?? "planned"}
                          onChange={(ev) => state.onUpdateEntry(e.id, { status: ev.target.value as ToothEntry["status"] })}
                          className="h-[42px] w-full rounded-none border-0 bg-white px-[10px] font-sans text-[14px] text-tp-slate-700 focus:outline-none focus:ring-[1.5px] focus:ring-inset focus:ring-tp-blue-400 focus:rounded-[4px] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                        >
                          <option value="planned">Planned</option>
                          <option value="in-progress">In progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    )}
                    {/* Note — whole cell */}
                    <td className="border-r border-tp-slate-100 p-0 align-middle transition-colors hover:bg-tp-slate-100/60" onClick={(ev) => ev.stopPropagation()}>
                      <input
                        type="text"
                        value={e.notes ?? ""}
                        onChange={(ev) => state.onUpdateEntry(e.id, { notes: ev.target.value })}
                        placeholder="e.g. Monitor at next visit"
                        className="h-[42px] w-full rounded-none border-0 bg-white px-[10px] font-sans text-[14px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:outline-none focus:ring-[1.5px] focus:ring-inset focus:ring-tp-blue-400 focus:rounded-[4px] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                      />
                    </td>
                    {/* Sticky delete */}
                    <td
                      className="sticky right-0 z-30 border-l border-tp-slate-200/80 bg-white px-0 py-2 text-center align-middle shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)] transition-colors hover:bg-tp-slate-100/60"
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => { if (activeRowId === e.id) setActiveRowId(null); state.onRemoveEntry(e.id) }}
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
      <div className="mt-[16px]">
        <div className="relative">
          <span className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-tp-slate-400">
            <SearchNormal1 size={14} color="currentColor" variant="Linear" />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && query.trim()) addEntryFromName(query.trim()) }}
            placeholder={kind === "finding" ? "Search & Add Examination" : kind === "symptom" ? "Search & Add Symptom" : kind === "planned" ? "Search & Add Planned Procedure" : "Search & Add Procedure"}
            className="h-[36px] w-full rounded-[8px] border border-tp-slate-200 bg-white pl-[32px] pr-[12px] font-sans text-[12px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:outline-none"
          />
        </div>
        {filteredCatalog.length > 0 && (
          <div className="mt-[8px] flex flex-wrap gap-[6px]">
            {filteredCatalog.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => addEntryFromName(c)}
                className="inline-flex h-[30px] items-center rounded-[10px] bg-tp-slate-100 px-[12px] font-sans text-[12px] font-medium text-tp-slate-600 transition-colors hover:bg-tp-slate-200 hover:text-tp-slate-700"
              >
                {c}
              </button>
            ))}
            {query.trim() && !filteredCatalog.some((c) => c.toLowerCase() === query.toLowerCase().trim()) && (
              <button
                type="button"
                onClick={() => addEntryFromName(query.trim())}
                className="inline-flex h-[30px] items-center gap-[4px] rounded-[10px] border border-dashed border-tp-blue-300 bg-tp-blue-50 px-[12px] font-sans text-[12px] font-medium text-tp-blue-700 transition-colors hover:bg-tp-blue-100"
              >
                <Add size={12} color="currentColor" variant="Linear" />
                Add "{query.trim()}"
              </button>
            )}
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

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open])

  // Available diagnoses to swap to (exclude currently-active ones except self).
  const options = TOOTH_DIAGNOSES.filter((d) => d === name || !activeRows.includes(d))
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(name)
  const [highlightIdx, setHighlightIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (!editing) setDraft(name) }, [name, editing])
  useEffect(() => { setHighlightIdx(0) }, [draft])
  useEffect(() => { if (editing) inputRef.current?.focus() }, [editing])

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
          onClick={() => { setEditing(true); setOpen(true); setDraft("") }}
          className={`flex h-[42px] w-full items-center px-[10px] font-sans text-[14px] transition-colors ${
            open ? "bg-tp-slate-100" : "hover:bg-tp-slate-50/60"
          }`}
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
              commit(pick ?? draft)
            } else if (e.key === "Escape") {
              setEditing(false); setOpen(false); setDraft(name)
            } else if (e.key === "ArrowDown") {
              e.preventDefault()
              setHighlightIdx((i) => Math.min(filtered.length - 1, i + 1))
            } else if (e.key === "ArrowUp") {
              e.preventDefault()
              setHighlightIdx((i) => Math.max(0, i - 1))
            }
          }}
          onBlur={() => { /* close handled by outside click */ }}
          placeholder={name}
          className="h-[42px] w-full rounded-none border-0 bg-white px-[10px] font-sans text-[14px] font-semibold text-tp-slate-800 placeholder:text-tp-slate-400 placeholder:font-semibold focus:outline-none focus:ring-[1.5px] focus:ring-inset focus:ring-tp-blue-400 focus:rounded-[4px] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
        />
      )}
      {open && (
        <ul className="absolute left-0 top-[calc(100%+2px)] z-[9999] w-full min-w-[160px] max-h-[220px] overflow-y-auto rounded-[8px] border border-tp-slate-200 bg-white py-[2px] shadow-[0_6px_20px_-6px_rgba(15,23,42,0.18)] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-tp-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
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
                  {isCurrent && <span className="text-tp-slate-400 text-[10px]">current</span>}
                </button>
              </li>
            )
          })}
          {filtered.length === 0 && (
            <li>
              <div className="px-[10px] py-[8px] font-sans text-[11px] text-tp-slate-400">No match</div>
            </li>
          )}
        </ul>
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
    const trimmed = next.trim()
    if (trimmed && trimmed !== value) onCommit(trimmed)
  }, [value, onCommit])

  useEffect(() => {
    if (!editing) return
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        commit(draft)
      }
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [editing, draft, commit])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlightIdx((i) => Math.min(totalItems - 1, i + 1)) }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlightIdx((i) => Math.max(0, i - 1)) }
    else if (e.key === "Enter") {
      e.preventDefault()
      if (totalItems === 0) return
      if (highlightIdx < filtered.length) commit(filtered[highlightIdx])
      else commit(draft.trim())  // custom row
    }
    else if (e.key === "Escape") { setDraft(value); setEditing(false) }
  }

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => { setEditing(true); setDraft(value); onFocusActivate?.(); setTimeout(() => inputRef.current?.focus(), 0) }}
        className="flex h-[40px] w-full items-center px-[10px] text-left transition-colors hover:bg-tp-slate-100/60"
      >
        <span className="font-sans text-[12px] font-semibold text-tp-slate-800 truncate">{value}</span>
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
        className="h-[42px] w-full rounded-none border-0 bg-white px-[10px] font-sans text-[14px] font-semibold text-tp-slate-800 focus:outline-none focus:ring-[1.5px] focus:ring-inset focus:ring-tp-blue-400 focus:rounded-[4px] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
      />
      {(filtered.length > 0 || showCustom) && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-[9999] w-full min-w-[200px] max-h-[240px] overflow-y-auto rounded-[8px] border border-tp-slate-200 bg-white py-[2px] shadow-[0_6px_20px_-6px_rgba(15,23,42,0.18)] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-tp-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-tp-slate-100">
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
                className={`flex w-full items-center gap-[6px] rounded-[6px] border border-dashed border-tp-blue-300 px-[8px] py-[6px] font-sans text-[11px] font-medium text-tp-blue-700 transition-colors ${highlightIdx === filtered.length ? "bg-tp-blue-50" : "hover:bg-tp-blue-50"}`}
              >
                <Add size={12} color="currentColor" variant="Linear" />
                Add custom: "{draft.trim()}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function SurfaceCellDropdown({
  entry, arch, toothPosition, isActive, onActivate, onToggleZone, onClearZones, onHover, multiSelectZones,
}: {
  entry: ToothEntry
  arch: "maxillary" | "mandibular"
  toothPosition: number
  isActive: boolean
  onActivate: () => void
  onToggleZone: (z: ZoneId) => void
  onClearZones: () => void
  onHover: (zones: ZoneId[]) => void
  multiSelectZones: Set<ZoneId>
}) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Auto-open when this row becomes active (user just clicked a search chip).
  useEffect(() => {
    if (isActive) setOpen(true)
    else setOpen(false)
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
      const t = e.target as Node
      if (a && !a.contains(t) && p && !p.contains(t)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open])

  // When the dropdown is open AND this is the active row, what the user sees
  // mirrors multiSelectZones. When NOT active, show the entry's saved surfaces.
  const shown = isActive ? Array.from(multiSelectZones) : entry.surfaces
  // Whole tooth = ALL 7 surfaces selected (so empty array = no selection yet).
  const isWholeTooth = shown.length === ALL_ZONES.length

  const toggle = (z: ZoneId) => {
    if (!isActive) { onActivate(); return }
    onToggleZone(z)
  }
  const clickWholeTooth = () => {
    if (!isActive) onActivate()
    if (isWholeTooth) {
      onClearZones()
    } else {
      // Select all 7 surfaces (to differentiate from empty "no selection").
      onClearZones()
      ALL_ZONES.forEach((z) => onToggleZone(z))
    }
  }

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        onClick={() => { onActivate(); setOpen((o) => !o) }}
        className={`flex h-[42px] w-full min-w-0 items-center justify-between gap-[6px] rounded-none px-[10px] font-sans text-[12px] transition-colors ${
          open ? "bg-white ring-[1.5px] ring-inset ring-tp-blue-400 rounded-[4px] shadow-[0_0_0_3px_rgba(59,130,246,0.12)]" : isActive ? "bg-white ring-[1.5px] ring-inset ring-tp-blue-400 rounded-[4px] shadow-[0_0_0_3px_rgba(59,130,246,0.12)]" : "bg-white"
        }`}
      >
        <span className="flex-1 min-w-0 text-left whitespace-nowrap overflow-hidden text-ellipsis">
          {shown.length === 0 ? (
            <span className="font-normal text-tp-slate-400">Select surface</span>
          ) : shown.length === ALL_ZONES.length ? (
            <span className="inline-flex items-center gap-[4px] font-medium text-tp-slate-700">
              <span className="h-[8px] w-[8px] rounded-full bg-tp-slate-400" />
              Whole tooth
            </span>
          ) : (
            <SurfaceDots surfaces={shown} arch={arch} toothPosition={toothPosition} />
          )}
        </span>
        {/* Chevron: down when collapsed, up when open */}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>
          <path d="M1 1L5 5L9 1" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && pos && typeof document !== "undefined" && createPortal(
        <div
          ref={popoverRef}
          className="fixed z-[9999] rounded-[8px] border border-tp-slate-200 bg-white shadow-[0_6px_20px_-6px_rgba(15,23,42,0.18)]"
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          {/* Informative hint — amber warning tone, tight icon-text gap, highlighted keywords */}
          <div className="p-[8px]">
            <div className="flex items-center gap-[6px] rounded-[6px] bg-tp-amber-50 px-[10px] py-[7px]">
              <InfoCircle size={13} color="var(--tp-amber-700)" variant="Bold" />
              <span className="font-sans text-[10px] font-normal text-tp-amber-800 leading-[1.35]">
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
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </span>
                <span className="h-[8px] w-[8px] rounded-full bg-tp-slate-400 flex-shrink-0" />
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
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
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

// ──────────────────────────────────────────────────────────────
// SurfaceMultiSelect — 7 chips, anatomy-aware labels
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// SinceDropdown — calendar icon + preset spans ("1 year ago", etc.) + custom date
// ──────────────────────────────────────────────────────────────
function SinceDropdown({ value, onChange, autoOpen }: { value: string; onChange: (v: string) => void; autoOpen?: boolean }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Open automatically when autoOpen is true and no value is selected.
  useEffect(() => {
    if (autoOpen && !value) setOpen(true)
  }, [autoOpen, value])

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
      if (a && !a.contains(t) && p && !p.contains(t)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open])

  const presets = [
    { label: "1 week ago",   value: "1 week" },
    { label: "2 weeks ago",  value: "2 weeks" },
    { label: "1 month ago",  value: "1 month" },
    { label: "3 months ago", value: "3 months" },
    { label: "6 months ago", value: "6 months" },
    { label: "1 year ago",   value: "1 year" },
    { label: "2 years ago",  value: "2 years" },
    { label: "3 years ago",  value: "3 years" },
    { label: "5 years ago",  value: "5 years" },
  ]

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-[42px] w-full min-w-0 items-center justify-between gap-[6px] rounded-none px-[10px] font-sans text-[14px] transition-colors ${
          open ? "bg-white ring-[1.5px] ring-inset ring-tp-blue-400 rounded-[4px] shadow-[0_0_0_3px_rgba(59,130,246,0.12)]" : "bg-white"
        }`}
      >
        <span className={`flex-1 text-left truncate ${value ? "text-tp-slate-700" : "text-tp-slate-400"}`}>{value || "e.g. 2 weeks ago"}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s", flexShrink: 0 }}>
          <path d="M1 1L5 5L9 1" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && pos && typeof document !== "undefined" && createPortal(
        <div
          ref={popoverRef}
          className="fixed z-[9999] rounded-[8px] border border-tp-slate-200 bg-white shadow-[0_6px_20px_-6px_rgba(15,23,42,0.18)]"
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          <ul className="max-h-[200px] overflow-y-auto py-[2px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-tp-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-tp-slate-100 [mask-image:linear-gradient(to_bottom,transparent_0px,black_6px,black_calc(100%-6px),transparent_100%)]">
            {presets.map((p) => (
              <li key={p.value}>
                <button
                  type="button"
                  onClick={() => { onChange(p.value); setOpen(false) }}
                  className="flex w-full items-center px-[10px] py-[6px] font-sans text-[12px] text-tp-slate-700 transition-colors hover:bg-tp-slate-100"
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-tp-slate-100 p-[6px]">
            <label className="mb-[3px] block font-sans text-[9px] font-semibold uppercase tracking-[0.4px] text-tp-slate-400 px-[4px]">
              Custom date
            </label>
            <input
              type="date"
              onChange={(e) => { if (e.target.value) { onChange(e.target.value); setOpen(false) } }}
              className="h-[32px] w-full rounded-[6px] border border-tp-slate-200 bg-white px-[8px] font-sans text-[12px] text-tp-slate-700 focus:border-tp-blue-500 focus:outline-none"
            />
          </div>
        </div>,
        document.body,
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
            className={`inline-flex h-[32px] items-center gap-[6px] rounded-[10px] border px-[12px] font-sans text-[12px] font-medium transition-all ${
              isActive
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
      <span className="inline-flex items-center rounded-[5px] bg-tp-slate-100 px-[6px] py-[2px] font-sans text-[10px] font-semibold text-tp-slate-600">
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
          className="inline-flex h-[18px] items-center gap-[3px] rounded-[4px] px-[5px] font-sans text-[10px] font-bold text-white tabular-nums"
          style={{ background: ZONE_INFO[z].color }}
        >
          {abbr(z)}
        </span>
      ))}
      {overflow > 0 && (
        <span className="inline-flex h-[18px] items-center rounded-[4px] bg-tp-slate-100 px-[5px] font-sans text-[10px] font-semibold text-tp-slate-600">
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

function SymptomSurfacePicker({ surfaces, arch, toothPosition, onChange }: {
  surfaces: ZoneId[]
  arch: "maxillary" | "mandibular"
  toothPosition: number
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
    onChange(selected.has(z) ? surfaces.filter((s) => s !== z) : [...surfaces, z])
  }

  return (
    <>
      <button ref={anchorRef} type="button" onClick={() => setOpen((o) => !o)}
        className={`flex h-[42px] w-full min-w-0 items-center justify-between gap-[6px] rounded-none px-[10px] font-sans text-[14px] transition-colors ${
          open ? "bg-white ring-[1.5px] ring-inset ring-tp-blue-400 rounded-[4px] shadow-[0_0_0_3px_rgba(59,130,246,0.12)]" : "bg-white"
        }`}
      >
        <span className="flex-1 min-w-0 text-left truncate">
          {surfaces.length === 0 ? (
            <span className="text-tp-slate-400">Select surface</span>
          ) : (
            <span className="text-tp-slate-700 font-medium">{surfaces.map((z) => getZoneLabel(z, arch, toothPosition)).join(", ")}</span>
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
            {ALL_ZONES.map((z) => {
              const checked = selected.has(z)
              const label = getZoneLabel(z, arch, toothPosition)
              const color = ZONE_INFO[z]?.color || "#888"
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
  const selectedNames = new Set(rows.map((r) => r.name.toLowerCase()))

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    const pool = q ? DENTAL_SYMPTOM_CATALOG.filter((s) => s.toLowerCase().includes(q)) : DENTAL_SYMPTOM_CATALOG
    return pool.filter((s) => !selectedNames.has(s.toLowerCase())).slice(0, 12)
  }, [query, selectedNames])

  const addSymptom = (name: string) => {
    onUpdateRows([...rows, { id: getSymId(), name, surfaces: [], since: "", severity: "", note: "" }])
    setQuery("")
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
              <tr className="h-[34px] bg-tp-slate-100 text-left font-['Inter',sans-serif] text-[10px] text-tp-slate-500">
                <th className="border-r border-tp-slate-100 px-3 py-2 font-semibold uppercase tracking-[0.5px]">SYMPTOM</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 font-semibold uppercase tracking-[0.5px]">SURFACES</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 font-semibold uppercase tracking-[0.5px]">SINCE</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 font-semibold uppercase tracking-[0.5px]">SEVERITY</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 font-semibold uppercase tracking-[0.5px]">NOTE</th>
                <th className="sticky right-0 z-40 border-l border-tp-slate-200/80 bg-tp-slate-100 px-0 py-2 text-center font-semibold shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]" />
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
      <div className="mt-[16px]">
        <div className="relative">
          <span className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-tp-slate-400">
            <SearchNormal1 size={14} color="currentColor" variant="Linear" />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && query.trim()) addSymptom(query.trim()) }}
            placeholder="Search & Add Dental Symptom"
            className="h-[36px] w-full rounded-[8px] border border-tp-slate-200 bg-white pl-[32px] pr-[12px] font-sans text-[14px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:outline-none"
          />
        </div>
        {filtered.length > 0 && (
          <div className="mt-[8px] flex flex-wrap gap-[6px]">
            {filtered.map((s) => (
              <button key={s} type="button" onClick={() => addSymptom(s)}
                className="inline-flex h-[30px] items-center rounded-[10px] bg-tp-slate-100 px-[12px] font-sans text-[12px] font-medium text-tp-slate-600 transition-colors hover:bg-tp-slate-200 hover:text-tp-slate-700"
              >{s}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PrimaryDiagnosisBody({ state }: { state: DentalCanvasState }) {
  // Local per-diagnosis since/note — demo-only store.
  const [details, setDetails] = useState<Record<string, { since: string; note: string }>>({})
  const [query, setQuery] = useState("")

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

  // Track most recently added diagnosis so we can auto-open its Since dropdown.
  const [lastAddedName, setLastAddedName] = useState<string | null>(null)
  const addDiagnosis = (name: string) => {
    if (name === "Implant") state.onToggleImplant()
    else state.onToggleToothDiagnosis(name)
    setLastAddedName(name)
    setQuery("")
  }

  const removeDiagnosis = (name: string) => {
    if (name === "Implant") state.onToggleImplant()
    else state.onToggleToothDiagnosis(name)
  }

  const updateDetail = (name: string, patch: Partial<{ since: string; note: string }>) => {
    setDetails((prev) => ({ ...prev, [name]: { since: "", note: "", ...(prev[name] ?? {}), ...patch } }))
  }

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
              <col style={{ minWidth: 140 }} />
              <col style={{ width: 44, minWidth: 44, maxWidth: 44 }} />
            </colgroup>
            <thead>
              <tr className="h-[34px] bg-tp-slate-100 text-left font-['Inter',sans-serif] text-[10px] text-tp-slate-500">
                <th className="border-r border-tp-slate-100 px-0 py-2 text-center font-semibold" />
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]">DIAGNOSIS</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]">SINCE</th>
                <th className="border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]">NOTE</th>
                <th className="sticky right-0 z-40 border-l border-tp-slate-200/80 bg-tp-slate-100 px-0 py-2 text-center font-semibold shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]" />
              </tr>
            </thead>
            <tbody>
              {activeRows.map((name) => {
                const color = PRIMARY_DIAG_COLOR[name] ?? "#4b4ad5"
                const d = details[name] ?? { since: "", note: "" }
                return (
                  <tr key={name} className="border-t border-tp-slate-100">
                    <td className="border-r border-tp-slate-100 p-0 text-center align-middle transition-colors hover:bg-tp-slate-100/60">
                      <span className="inline-flex h-[42px] w-full items-center justify-center text-tp-slate-300">
                        <svg width="8" height="16" viewBox="0 0 8 16" fill="currentColor">
                          <circle cx="2" cy="3" r="1.2" /><circle cx="2" cy="8" r="1.2" /><circle cx="2" cy="13" r="1.2" />
                          <circle cx="6" cy="3" r="1.2" /><circle cx="6" cy="8" r="1.2" /><circle cx="6" cy="13" r="1.2" />
                        </svg>
                      </span>
                    </td>
                    <td className="border-r border-tp-slate-100 p-0 align-middle transition-colors hover:bg-tp-slate-100/60">
                      <DiagnosisNameCell
                        name={name}
                        color={color}
                        activeRows={activeRows}
                        onSwap={(next) => {
                          if (next === name) return
                          // Remove current, add next
                          if (name === "Implant") state.onToggleImplant()
                          else state.onToggleToothDiagnosis(name)
                          if (next === "Implant") state.onToggleImplant()
                          else state.onToggleToothDiagnosis(next)
                        }}
                      />
                    </td>
                    <td className="border-r border-tp-slate-100 p-0 align-middle transition-colors hover:bg-tp-slate-100/60">
                      <SinceDropdown
                        value={d.since}
                        onChange={(v) => updateDetail(name, { since: v })}
                        autoOpen={lastAddedName === name}
                      />
                    </td>
                    <td className="border-r border-tp-slate-100 p-0 align-middle transition-colors hover:bg-tp-slate-100/60">
                      <input
                        type="text"
                        value={d.note}
                        onChange={(e) => updateDetail(name, { note: e.target.value })}
                        placeholder="e.g. Monitor at next visit"
                        className="h-[42px] w-full rounded-none border-0 bg-white px-[10px] font-sans text-[14px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:outline-none focus:ring-[1.5px] focus:ring-inset focus:ring-tp-blue-400 focus:rounded-[4px] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
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
      <div className="mt-[16px]">
        <div className="relative">
          <span className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-tp-slate-400">
            <SearchNormal1 size={14} color="currentColor" variant="Linear" />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && query.trim()) { const match = TOOTH_DIAGNOSES.find((d) => d.toLowerCase() === query.toLowerCase().trim()); if (match) addDiagnosis(match) } }}
            placeholder="Search & Add Diagnosis"
            className="h-[36px] w-full rounded-[8px] border border-tp-slate-200 bg-white pl-[32px] pr-[12px] font-sans text-[12px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:outline-none"
          />
        </div>
        {filteredCatalog.length > 0 && (
          <div className="mt-[8px] flex flex-wrap gap-[6px]">
            {filteredCatalog.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => addDiagnosis(c)}
                className="inline-flex h-[30px] items-center rounded-[10px] bg-tp-slate-100 px-[12px] font-sans text-[12px] font-medium text-tp-slate-600 transition-colors hover:bg-tp-slate-200 hover:text-tp-slate-700"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


