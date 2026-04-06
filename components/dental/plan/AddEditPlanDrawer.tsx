"use client"

/**
 * AddEditPlanDrawer — Create or edit a treatment plan.
 *
 * Layout:
 *   - Header: [✕ close] | divider (full height) | "Create Treatment Plan" | [Create Plan CTA]
 *   - Plan Name: simple input (flush with header, no gap) — h-[42px]
 *   - Services: cluster card matching EntryTab procedures table
 *     - Table with padding, corner radius, stroke (NOT edge-to-edge)
 *     - ToothPicker styled like SurfacePicker (no inner border)
 *     - SurfacePicker dropdown uses createPortal to avoid clipping
 *     - All row heights h-[42px]
 *   - Sticky bottom: Total estimate
 *   - Background: bg-tp-slate-100
 */

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { Search, Trash2 } from "lucide-react"
import { Add, Grid5, Ram, Eraser } from "iconsax-reactjs"
import { createPortal } from "react-dom"
import {
  TPDrawer,
  TPDrawerContent,
} from "@/components/tp-ui/tp-drawer"
import { TPMedicalIcon } from "@/components/tp-ui/medical-icons/TPMedicalIcon"
import { usePlanContext } from "./plan-context"
import { DrawerHeader, formatINR } from "./plan-shared"
import { genId } from "./plan-types"
import type { PlanService, TreatmentPlan, SurfaceId } from "./plan-types"
import { SURFACE_OPTIONS } from "./plan-types"
import { TREATMENT_CATALOG, getRate } from "./treatments"
import { ToothPicker } from "./ToothPicker"
import { INITIAL_TOOTH_STATE } from "../mock-data"

// ─── Surface color map (matching examination ZONE_INFO) ─────

const SURFACE_COLORS: Record<SurfaceId, string> = {
  occlusal: "#14b8a6", // teal
  buccal:   "#f97316", // orange
  lingual:  "#8b5cf6", // violet
  mesial:   "#eab308", // yellow
  distal:   "#2563eb", // blue
  cervical: "#ec4899", // pink
  root:     "#65a30d", // olive-green
}

const SURFACE_ABBR: Record<SurfaceId, string> = {
  occlusal: "O",
  buccal:   "B",
  lingual:  "L",
  mesial:   "M",
  distal:   "D",
  cervical: "C",
  root:     "R",
}

// ─── FDI → tooth label mapping ──────────────────────────────

const QUADRANT_MAP: Record<string, string> = {
  "1": "Upper Right",
  "2": "Upper Left",
  "3": "Lower Left",
  "4": "Lower Right",
}

const TOOTH_NAMES: Record<number, string> = {
  1: "Central Incisor",
  2: "Lateral Incisor",
  3: "Canine",
  4: "First Premolar",
  5: "Second Premolar",
  6: "First Molar",
  7: "Second Molar",
  8: "Third Molar",
}

function fdiToLabel(fdi: string): string {
  if (fdi === "full-mouth") return "Full Mouth"
  const q = fdi[0]
  const pos = parseInt(fdi[1], 10)
  const quadrant = QUADRANT_MAP[q] ?? ""
  const name = TOOTH_NAMES[pos] ?? ""
  return `${quadrant} ${name}`.trim()
}

// ─── Row form state ─────────────────────────────────────────

interface ServiceRow {
  id: string
  treatment: string
  teeth: string[]
  surfaces: SurfaceId[]
  rate: number
  discount: number
  discountType: "flat" | "percent"
}

function createRow(treatment: string, teeth: string[] = [], surfaces: SurfaceId[] = []): ServiceRow {
  return {
    id: genId("row"),
    treatment,
    teeth,
    surfaces,
    rate: getRate(treatment),
    discount: 0,
    discountType: "flat",
  }
}

// ─── Dental examination findings → suggestions ──────────────

interface ExamSuggestion {
  treatment: string
  toothFdi: string
  toothLabel: string
  surfaces: SurfaceId[]
  source: "examination"
}

function getExamSuggestions(patientId: string): ExamSuggestion[] {
  const toothState = INITIAL_TOOTH_STATE[patientId]
  if (!toothState) return []

  const suggestions: ExamSuggestion[] = []

  if (toothState.toothDiagnoses) {
    for (const [fdi, diagnoses] of Object.entries(toothState.toothDiagnoses)) {
      for (const diag of diagnoses) {
        const treatmentName = mapDiagnosisToTreatment(diag)
        if (treatmentName) {
          suggestions.push({
            treatment: treatmentName,
            toothFdi: fdi,
            toothLabel: fdiToLabel(fdi),
            surfaces: [],
            source: "examination",
          })
        }
      }
    }
  }

  if (toothState.findingsByTooth) {
    for (const [fdi, findings] of Object.entries(toothState.findingsByTooth)) {
      for (const finding of findings) {
        const treatmentName = mapFindingToTreatment(finding.type)
        if (treatmentName) {
          suggestions.push({
            treatment: treatmentName,
            toothFdi: fdi,
            toothLabel: fdiToLabel(fdi),
            surfaces: [finding.zoneId as SurfaceId],
            source: "examination",
          })
        }
      }
    }
  }

  return suggestions
}

function mapDiagnosisToTreatment(diagnosis: string): string | null {
  const map: Record<string, string> = {
    "RCT": "Root Canal Treatment",
    "Crown": "Crown (PFM)",
    "Bridge": "Bridge (per unit)",
    "Implant": "Implant (Single)",
    "Missing": "Implant (Single)",
    "Extraction": "Extraction",
    "Composite Filling": "Restoration (Composite Filling)",
    "Scaling": "Scaling & Polishing",
    "Polishing": "Scaling & Polishing",
    "Veneer": "Veneers",
    "Pulp Cap": "Pulp Capping",
    "Root Planing": "Deep Cleaning (per quadrant)",
    "Denture": "Partial Denture",
  }
  return map[diagnosis] ?? null
}

function mapFindingToTreatment(findingType: string): string | null {
  const map: Record<string, string> = {
    "Cavity/Caries": "Restoration (Composite Filling)",
    "Crack": "Crown (PFM)",
    "Fracture": "Crown (PFM)",
    "Sensitivity": "Root Canal Treatment",
    "Erosion": "Restoration (Composite Filling)",
    "NCCL": "Restoration (Composite Filling)",
    "Calculus": "Scaling & Polishing",
    "Plaque": "Scaling & Polishing",
    "Staining": "Teeth Whitening",
    "Recession": "Gingival Grafting",
    "Resorption": "Root Canal Treatment",
  }
  return map[findingType] ?? null
}

// ─── Surface color dots (matching examination SurfaceDots) ───

function SurfaceDots({ surfaces }: { surfaces: SurfaceId[] }) {
  if (surfaces.length === 0) return <span className="text-tp-slate-300 font-sans text-[12px]">—</span>
  return (
    <div className="flex items-center gap-[4px]">
      {surfaces.map((z) => (
        <span
          key={z}
          title={SURFACE_OPTIONS.find((o) => o.id === z)?.label}
          className="inline-flex h-[18px] items-center gap-[3px] rounded-[4px] px-[5px] font-sans text-[12px] font-bold text-white tabular-nums"
          style={{ background: SURFACE_COLORS[z] }}
        >
          {SURFACE_ABBR[z]}
        </span>
      ))}
    </div>
  )
}

// ─── Surface picker (portal-based dropdown to avoid clipping) ─

function SurfacePicker({ value, onChange }: { value: SurfaceId[]; onChange: (v: SurfaceId[]) => void }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const openDropdown = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const dropdownWidth = 220
    const viewportWidth = window.innerWidth

    let left = rect.left
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

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return
      if (dropdownRef.current?.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener("scroll", close, { capture: true, passive: true })
    return () => window.removeEventListener("scroll", close, { capture: true })
  }, [open])

  const toggle = (id: SurfaceId) => {
    onChange(value.includes(id) ? value.filter((s) => s !== id) : [...value, id])
  }

  const allSelected = SURFACE_OPTIONS.every((o) => value.includes(o.id))

  const toggleAll = () => {
    if (allSelected) onChange([])
    else onChange(SURFACE_OPTIONS.map((o) => o.id))
  }

  const dropdown = open ? (
    <>
      <div className="fixed inset-0" style={{ zIndex: 9998 }} onClick={() => setOpen(false)} />
      <div
        ref={dropdownRef}
        style={dropdownStyle}
        className="rounded-[10px] border border-tp-slate-200 bg-white shadow-lg py-[6px]"
      >
        {/* Select All */}
        <button
          type="button"
          onClick={toggleAll}
          className={`w-full flex items-center gap-[10px] px-[12px] py-[8px] text-left font-sans text-[14px] transition-colors border-b border-tp-slate-100 mb-[2px] ${
            allSelected ? "text-tp-blue-700 font-semibold" : "text-tp-slate-700 hover:bg-tp-slate-50"
          }`}
        >
          <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border-[1.5px] shrink-0 ${
            allSelected ? "border-tp-blue-500 bg-tp-blue-500" : "border-tp-slate-300 bg-white"
          }`}>
            {allSelected && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </span>
          <span className="flex-1">Select All</span>
        </button>

        {SURFACE_OPTIONS.map((opt) => {
          const selected = value.includes(opt.id)
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              className={`w-full flex items-center gap-[10px] rounded-[6px] mx-auto px-[12px] py-[8px] text-left font-sans text-[14px] transition-colors ${
                selected ? "text-tp-slate-800 font-medium" : "text-tp-slate-600 hover:bg-tp-slate-50"
              }`}
              style={{ width: "calc(100% - 4px)" }}
            >
              <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border-[1.5px] shrink-0 ${
                selected ? "border-tp-blue-500 bg-tp-blue-500" : "border-tp-slate-300 bg-white"
              }`}>
                {selected && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </span>
              <span className="h-[12px] w-[12px] rounded-full flex-shrink-0" style={{ background: SURFACE_COLORS[opt.id] }} />
              <span className="flex-1">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </>
  ) : null

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => { e.stopPropagation(); open ? setOpen(false) : openDropdown() }}
        className="h-[46px] w-full text-left px-4 font-sans text-[14px] text-tp-slate-700 hover:bg-tp-blue-50/30 focus:bg-tp-blue-50/30 focus:outline-none transition-colors truncate"
      >
        {value.length > 0 ? <SurfaceDots surfaces={value} /> : <span className="text-tp-slate-300">—</span>}
      </button>
      {mounted && typeof document !== "undefined" && dropdown
        ? createPortal(dropdown, document.body)
        : null}
    </>
  )
}

// ─── Component ──────────────────────────────────────────────

export function AddEditPlanDrawer() {
  const { state, dispatch, closeDrawer } = usePlanContext()
  const drawer = state.drawer

  const isOpen = drawer.type === "add-plan" || drawer.type === "edit-plan"
  const isEdit = drawer.type === "edit-plan"
  const editPlanId = isEdit ? (drawer as { planId: string }).planId : null
  const editPlan = editPlanId ? state.plans.find((p) => p.id === editPlanId) : null

  const [planName, setPlanName] = useState("")
  const [rows, setRows] = useState<ServiceRow[]>([])

  // Search state
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const patientId = state.plans[0]?.patientId ?? "apt-1"
  const examSuggestions = useMemo(() => getExamSuggestions(patientId), [patientId])

  // Populate form when editing
  useEffect(() => {
    if (isEdit && editPlan) {
      setPlanName(editPlan.name)
      const grouped = new Map<string, ServiceRow>()
      for (const svc of editPlan.services) {
        const existing = grouped.get(svc.treatment)
        if (existing) {
          existing.teeth.push(svc.toothFdi)
          for (const s of svc.surfaces) {
            if (!existing.surfaces.includes(s)) existing.surfaces.push(s)
          }
        } else {
          grouped.set(svc.treatment, {
            id: genId("row"),
            treatment: svc.treatment,
            teeth: [svc.toothFdi],
            surfaces: [...svc.surfaces],
            rate: svc.rate,
            discount: svc.discount,
            discountType: "flat" as const,
          })
        }
      }
      setRows(grouped.size > 0 ? Array.from(grouped.values()) : [])
    } else if (!isEdit && isOpen) {
      setPlanName("")
      setRows([])
    }
    setSearchQuery("")
    setSearchOpen(false)
  }, [isOpen, isEdit, editPlan])

  const filteredTreatments = useMemo(() => {
    return TREATMENT_CATALOG.filter((t) => {
      if (!searchQuery.trim()) return true
      return t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
    }).slice(0, 10)
  }, [searchQuery])

  const filteredExamSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return examSuggestions
    return examSuggestions.filter((s) =>
      s.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.toothLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `T${s.toothFdi}`.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, examSuggestions])

  // Remaining exam suggestions (not yet added)
  const remainingExamSuggestions = useMemo(() => {
    return examSuggestions.filter(
      (sug) => !rows.some((r) => r.treatment === sug.treatment && r.teeth.includes(sug.toothFdi))
    )
  }, [examSuggestions, rows])

  // Remaining catalog chips (not yet added)
  const remainingCatalogChips = useMemo(() => {
    return TREATMENT_CATALOG.filter((t) => !rows.some((r) => r.treatment === t.name)).slice(0, 8)
  }, [rows])

  useEffect(() => {
    if (!searchOpen || !searchRef.current) return
    const rect = searchRef.current.getBoundingClientRect()
    setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: rect.width })
  }, [searchOpen, searchQuery])

  useEffect(() => {
    if (!searchOpen) return
    const handler = (e: MouseEvent) => {
      if (searchRef.current?.contains(e.target as Node)) return
      if (dropdownRef.current?.contains(e.target as Node)) return
      setSearchOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [searchOpen])

  const addTreatmentRow = (treatmentName: string, teeth: string[] = [], surfaces: SurfaceId[] = []) => {
    const exists = rows.find((r) => r.treatment === treatmentName)
    if (!exists) {
      setRows((prev) => [...prev, createRow(treatmentName, teeth, surfaces)])
    } else if (teeth.length > 0) {
      setRows((prev) =>
        prev.map((r) => {
          if (r.treatment !== treatmentName) return r
          const mergedTeeth = [...new Set([...r.teeth, ...teeth])]
          const mergedSurfaces = [...new Set([...r.surfaces, ...surfaces])]
          return { ...r, teeth: mergedTeeth, surfaces: mergedSurfaces }
        }),
      )
    }
    setSearchQuery("")
    setSearchOpen(false)
    // Don't focus search input — user asked not to activate input on tag click
  }

  const updateRow = (id: string, patch: Partial<ServiceRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  const clearAllRows = () => {
    setRows([])
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = filteredExamSuggestions.length + filteredTreatments.length
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.min(prev + 1, totalItems - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const examCount = filteredExamSuggestions.length
      if (highlightedIndex < examCount) {
        const sug = filteredExamSuggestions[highlightedIndex]
        addTreatmentRow(sug.treatment, [sug.toothFdi], sug.surfaces)
      } else {
        const catIdx = highlightedIndex - examCount
        if (filteredTreatments[catIdx]) {
          addTreatmentRow(filteredTreatments[catIdx].name)
        }
      }
    } else if (e.key === "Escape") {
      setSearchOpen(false)
    }
  }

  const computeDiscount = (row: ServiceRow): number => {
    if (row.discountType === "percent") return Math.round(row.rate * row.discount / 100)
    return row.discount
  }

  const fanOutServices = (): PlanService[] => {
    const services: PlanService[] = []
    const planId = editPlanId ?? genId("plan")

    for (const row of rows) {
      if (!row.treatment) continue
      const teeth = row.teeth.length > 0 ? row.teeth : ["full-mouth"]
      const discAmt = computeDiscount(row)

      for (const fdi of teeth) {
        services.push({
          id: genId("svc"),
          planId,
          treatment: row.treatment,
          toothFdi: fdi,
          toothLabel: fdiToLabel(fdi),
          surfaces: [...row.surfaces],
          rate: row.rate,
          discount: discAmt,
          amount: Math.max(0, row.rate - discAmt),
          status: "planned",
          sittings: [],
          procedures: [],
        })
      }
    }
    return services
  }

  const handleSave = () => {
    if (!planName.trim() || rows.length === 0) return

    const services = fanOutServices()

    if (isEdit && editPlanId) {
      dispatch({
        type: "UPDATE_PLAN",
        planId: editPlanId,
        patch: { name: planName.trim(), services },
      })
    } else {
      const newPlan: TreatmentPlan = {
        id: genId("plan"),
        name: planName.trim(),
        patientId: patientId,
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
        status: "draft",
        services: [],
      }
      newPlan.services = services.map((s) => ({ ...s, planId: newPlan.id }))
      dispatch({ type: "ADD_PLAN", plan: newPlan })
    }

    closeDrawer()
  }

  const totalAmount = rows.reduce((sum, r) => {
    const teeth = r.teeth.length || 1
    const discAmt = computeDiscount(r)
    return sum + Math.max(0, r.rate - discAmt) * teeth
  }, 0)

  const totalServices = rows.reduce((sum, r) => sum + Math.max(1, r.teeth.length), 0)

  const canSave = planName.trim().length > 0 && rows.length > 0

  // Validation state
  const [showNameError, setShowNameError] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const handleSaveWithValidation = () => {
    if (!planName.trim()) {
      setShowNameError(true)
      nameInputRef.current?.focus()
      return
    }
    if (rows.length === 0) return
    handleSave()
  }

  // Clear error when user types
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanName(e.target.value)
    if (showNameError && e.target.value.trim()) setShowNameError(false)
  }

  // Icon button class — same as RxPad SectionHeader
  const iconBtnClass = "inline-flex h-[32px] w-[32px] items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-200 disabled:cursor-not-allowed disabled:opacity-40"

  return (
    <TPDrawer open={isOpen} onOpenChange={(open) => { if (!open) { closeDrawer(); setShowNameError(false) } }}>
      <TPDrawerContent side="right" size="full" className="!rounded-none !sm:max-w-[70vw]" style={{ background: "#F4F5F7" }}>
        {/* Header: [✕] | divider (full height) | title | [Create Plan CTA] */}
        <DrawerHeader
          title={isEdit ? "Edit Plan" : "Create Treatment Plan"}
          onClose={() => { closeDrawer(); setShowNameError(false) }}
          action={
            <button
              type="button"
              onClick={handleSaveWithValidation}
              className="h-[42px] min-w-[120px] rounded-[12px] px-[20px] font-sans text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isEdit ? "Save Changes" : "Create Plan"}
            </button>
          }
        />

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-[24px] pt-[20px] pb-[24px] space-y-[20px]" style={{ background: "#F4F5F7" }}>

          {/* ── Plan Name ────────────────────────────────── */}
          <div>
            <label className="block font-sans text-[13px] font-semibold text-tp-slate-600 mb-[6px]">
              Plan Name <span className="text-tp-error-500">*</span>
            </label>
            <input
              ref={nameInputRef}
              type="text"
              value={planName}
              onChange={handleNameChange}
              placeholder="e.g., Wisdom Tooth Removal"
              className={`w-full h-[42px] rounded-[10px] border bg-white px-[14px] font-sans text-[14px] text-tp-slate-800 placeholder:text-tp-slate-300 focus:outline-none focus:ring-2 transition-colors ${
                showNameError
                  ? "border-tp-error-400 focus:ring-tp-error-500/30 focus:border-tp-error-400"
                  : "border-tp-slate-200 focus:ring-tp-blue-500/30 focus:border-tp-blue-400"
              }`}
            />
            {showNameError && (
              <p className="mt-[6px] font-sans text-[12px] text-tp-error-500 flex items-center gap-[5px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="16" r="0.75" fill="currentColor"/></svg>
                Please enter a plan name to create a plan.
              </p>
            )}
          </div>

          {/* ── Services cluster card ────── */}
          <div className="rounded-[16px] bg-white overflow-hidden">
            {/* Services header */}
            <header className="flex items-center gap-[10px] px-[16px] py-[14px]">
              <TPMedicalIcon name="first-aid" variant="bulk" size={22} color="var(--tp-violet-500)" />
              <h3 className="font-sans text-[16px] font-semibold text-tp-slate-900">Services</h3>
              {rows.length > 0 && (
                <span className="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-tp-slate-100 px-[6px] font-sans text-[12px] font-bold text-tp-slate-600 tabular-nums">
                  {rows.length}
                </span>
              )}

              {/* Action buttons */}
              <div className="ml-auto flex items-center gap-[8px]">
                <button type="button" title="Templates" className={iconBtnClass}>
                  <Grid5 color="currentColor" size={16} strokeWidth={1.5} variant="Linear" />
                </button>
                <button type="button" title="Save as template" className={iconBtnClass}>
                  <Ram color="currentColor" size={16} strokeWidth={1.5} variant="Linear" />
                </button>
                <button
                  type="button"
                  title="Clear all"
                  onClick={clearAllRows}
                  disabled={rows.length === 0}
                  className={iconBtnClass}
                >
                  <Eraser color="currentColor" size={16} strokeWidth={1.5} variant="Linear" />
                </button>
              </div>
            </header>

            {/* Table — padded, rounded, with stroke */}
            {rows.length > 0 && (
              <div className="px-[14px] py-[12px]">
                <div className="rounded-[10px] border border-tp-slate-200 overflow-hidden">
                  <table className="w-full table-fixed font-['Inter',sans-serif] text-[14px]">
                    <colgroup>
                      <col style={{ width: 42, minWidth: 42 }} />
                      <col style={{ minWidth: 180 }} />
                      <col style={{ width: 140, minWidth: 120 }} />
                      <col style={{ width: 150, minWidth: 130 }} />
                      <col style={{ width: 110, minWidth: 90 }} />
                      <col style={{ width: 90, minWidth: 80 }} />
                      <col style={{ width: 100, minWidth: 90 }} />
                      <col style={{ width: 48, minWidth: 48, maxWidth: 48 }} />
                    </colgroup>
                    <thead>
                      <tr className="h-[38px] bg-tp-slate-50 text-left font-['Inter',sans-serif] text-[12px] text-tp-slate-500">
                        <th className="border-r border-tp-slate-100 px-0 py-2 text-center font-semibold" />
                        <th className="border-r border-tp-slate-100 px-4 py-2 text-left font-semibold uppercase tracking-[0.5px]">Service</th>
                        <th className="border-r border-tp-slate-100 px-4 py-2 text-left font-semibold uppercase tracking-[0.5px]">Teeth</th>
                        <th className="border-r border-tp-slate-100 px-4 py-2 text-left font-semibold uppercase tracking-[0.5px]">Surfaces</th>
                        <th className="border-r border-tp-slate-100 px-4 py-2 text-right font-semibold uppercase tracking-[0.5px]">Rate</th>
                        <th className="border-r border-tp-slate-100 px-4 py-2 text-right font-semibold uppercase tracking-[0.5px]">Disc.</th>
                        <th className="border-r border-tp-slate-100 px-4 py-2 text-right font-semibold uppercase tracking-[0.5px]">Amount</th>
                        <th className="sticky right-0 z-40 border-l border-tp-slate-200/80 bg-tp-slate-50 px-0 py-2 text-center font-semibold shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]" />
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, idx) => {
                        const teethCount = Math.max(1, row.teeth.length)
                        const discAmt = computeDiscount(row)
                        const rowAmount = Math.max(0, row.rate - discAmt) * teethCount
                        return (
                          <tr
                            key={row.id}
                            className="h-[46px] border-t border-tp-slate-100 bg-white align-middle transition-colors duration-150"
                          >
                            <td className="px-4 text-center font-sans text-[13px] text-tp-slate-400 border-r border-tp-slate-100">{idx + 1}</td>
                            <td className="border-r border-tp-slate-100 p-0">
                              <div className="h-[46px] w-full flex items-center px-4">
                                <p className="font-['Inter',sans-serif] text-[14px] font-medium text-tp-slate-800 truncate">{row.treatment}</p>
                              </div>
                            </td>
                            <td className="border-r border-tp-slate-100 p-0">
                              <ToothPicker
                                value={row.teeth}
                                onChange={(teeth) => updateRow(row.id, { teeth })}
                                variant="inline"
                              />
                            </td>
                            <td className="border-r border-tp-slate-100 p-0">
                              <SurfacePicker
                                value={row.surfaces}
                                onChange={(surfaces) => updateRow(row.id, { surfaces })}
                              />
                            </td>
                            <td className="border-r border-tp-slate-100 p-0">
                              <div className="h-[46px] flex items-center px-3 gap-0">
                                <span className="font-sans text-[14px] text-tp-slate-400 shrink-0 mr-1">₹</span>
                                <input
                                  type="number"
                                  value={row.rate || ""}
                                  onChange={(e) => updateRow(row.id, { rate: parseInt(e.target.value, 10) || 0 })}
                                  className="h-[46px] w-full border-0 bg-transparent py-0 font-['Inter',sans-serif] text-[14px] leading-[20px] text-tp-slate-800 text-right focus:bg-tp-blue-50/30 focus:outline-none focus:ring-0 rounded-none"
                                />
                              </div>
                            </td>
                            <td className="border-r border-tp-slate-100 p-0">
                              <div className="h-[46px] flex items-center px-2 gap-0">
                                <input
                                  type="number"
                                  value={row.discount || ""}
                                  onChange={(e) => updateRow(row.id, { discount: parseInt(e.target.value, 10) || 0 })}
                                  placeholder="0"
                                  className="h-[46px] w-full border-0 bg-transparent py-0 font-['Inter',sans-serif] text-[14px] leading-[20px] text-tp-slate-800 text-right placeholder:text-tp-slate-300 focus:bg-tp-blue-50/30 focus:outline-none focus:ring-0 rounded-none min-w-0"
                                />
                                <button
                                  type="button"
                                  onClick={() => updateRow(row.id, { discountType: row.discountType === "flat" ? "percent" : "flat" })}
                                  className="shrink-0 ml-1 inline-flex h-[24px] min-w-[24px] items-center justify-center rounded-[6px] bg-tp-slate-100 font-sans text-[12px] font-bold text-tp-slate-500 hover:bg-tp-slate-200 transition-colors"
                                  title={row.discountType === "flat" ? "Switch to %" : "Switch to ₹"}
                                >
                                  {row.discountType === "flat" ? "₹" : "%"}
                                </button>
                              </div>
                            </td>
                            <td className="border-r border-tp-slate-100 p-0">
                              <div className="h-[46px] flex items-center justify-end px-4 font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-800">
                                {formatINR(rowAmount)}
                              </div>
                            </td>
                            <td className="sticky right-0 z-40 border-l border-tp-slate-200/80 bg-white p-0 shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]">
                              <div className="h-[46px] flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => removeRow(row.id)}
                                  className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] text-tp-slate-400 hover:text-tp-error-500 hover:bg-tp-error-50 transition-colors"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Search input BELOW table */}
            <div data-rx-module-root="true" className="px-[16px] pb-[16px] pt-[4px]">
              <div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-tp-slate-400">
                    <Search size={16} strokeWidth={1.5} />
                  </span>
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setSearchOpen(true)
                      setHighlightedIndex(0)
                    }}
                    onFocus={() => setSearchOpen(true)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search & Add Service"
                    className="h-[42px] w-full rounded-[10px] border border-tp-slate-200 bg-white pl-[36px] pr-[14px] font-sans text-[14px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:outline-none"
                  />
                </div>

                {/* Suggestive pill tags — visible when search dropdown is closed */}
                {!searchOpen && (
                  <div className="space-y-[16px] mt-[14px]">
                    {/* Exam-based suggestions */}
                    {remainingExamSuggestions.length > 0 && (
                      <div>
                        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-violet-500 mb-[8px]">
                          From Dental Examination
                        </p>
                        <div className="flex flex-wrap gap-[8px]">
                          {remainingExamSuggestions.map((sug, i) => (
                            <button
                              key={`exam-chip-${i}`}
                              type="button"
                              onClick={() => addTreatmentRow(sug.treatment, [sug.toothFdi], sug.surfaces)}
                              className="inline-flex h-[34px] items-center gap-[6px] rounded-[10px] bg-tp-violet-50 px-[12px] font-sans text-[13px] font-medium text-tp-violet-700 hover:bg-tp-violet-100 transition-colors"
                            >
                              <span className="inline-flex h-[20px] items-center rounded-[4px] bg-tp-violet-200 px-[6px] text-[12px] font-bold text-tp-violet-600">
                                T{sug.toothFdi}
                              </span>
                              {sug.treatment}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Catalog suggestions */}
                    {remainingCatalogChips.length > 0 && (
                      <div>
                        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 mb-[8px]">
                          Suggested Treatments
                        </p>
                        <div className="flex flex-wrap gap-[8px]">
                          {remainingCatalogChips.map((t) => (
                            <button
                              key={t.name}
                              type="button"
                              onClick={() => addTreatmentRow(t.name)}
                              className="inline-flex h-[34px] items-center rounded-[10px] bg-tp-slate-100 px-[14px] font-sans text-[13px] font-medium text-tp-slate-600 transition-colors hover:bg-tp-slate-200 hover:text-tp-slate-700"
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky bottom: Total Estimate ─────────────────── */}
        {rows.length > 0 && (
          <div className="shrink-0 border-t border-tp-slate-200 bg-white px-[24px] py-[16px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-[14px] text-tp-slate-500">
                  {totalServices} service{totalServices !== 1 ? "s" : ""} · {rows.length} treatment{rows.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-[14px]">
                <p className="font-sans text-[14px] font-semibold text-tp-slate-600">Estimated Total</p>
                <p className="font-sans text-[22px] font-bold text-tp-blue-700">{formatINR(totalAmount)}</p>
              </div>
            </div>
          </div>
        )}
      </TPDrawerContent>

      {/* Search dropdown portal */}
      {searchOpen && mounted && (filteredExamSuggestions.length > 0 || filteredTreatments.length > 0) && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: "fixed",
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: Math.max(dropdownPos.width, 400),
            zIndex: 9999,
          }}
          className="rounded-[10px] border border-tp-slate-200 bg-white shadow-lg overflow-hidden"
        >
          {filteredExamSuggestions.length > 0 && (
            <>
              <div className="px-[10px] py-[6px] border-b border-tp-slate-100 bg-tp-violet-50/50">
                <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-violet-500">
                  From Dental Examination
                </p>
              </div>
              <div className="max-h-[180px] overflow-y-auto">
                {filteredExamSuggestions.map((sug, i) => {
                  const alreadyHasTooth = rows.some(
                    (r) => r.treatment === sug.treatment && r.teeth.includes(sug.toothFdi),
                  )
                  return (
                    <button
                      key={`exam-${i}`}
                      type="button"
                      disabled={alreadyHasTooth}
                      onClick={() => addTreatmentRow(sug.treatment, [sug.toothFdi], sug.surfaces)}
                      className={`w-full flex items-center justify-between px-[12px] py-[10px] text-left transition-colors ${
                        i === highlightedIndex ? "bg-tp-slate-100" : "hover:bg-tp-slate-50"
                      } ${alreadyHasTooth ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      <div className="flex items-center gap-[8px]">
                        <span className="inline-flex h-[22px] items-center rounded-[4px] bg-tp-violet-100 px-[8px] font-sans text-[12px] font-bold text-tp-violet-600">
                          T{sug.toothFdi}
                        </span>
                        <div>
                          <p className="font-sans text-[14px] font-medium text-tp-slate-800">{sug.treatment}</p>
                          <p className="font-sans text-[12px] text-tp-slate-400">{sug.toothLabel}{sug.surfaces.length > 0 ? ` · ${sug.surfaces.join(", ")}` : ""}</p>
                        </div>
                      </div>
                      <span className="font-sans text-[14px] font-semibold text-tp-slate-500 shrink-0">
                        {formatINR(getRate(sug.treatment))}
                      </span>
                    </button>
                  )
                })}
              </div>
            </>
          )}

          <div className="px-[10px] py-[6px] border-b border-tp-slate-100 bg-tp-slate-50/50">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400">
              {searchQuery.trim() ? "Treatment Catalog" : "Frequently Used"}
            </p>
          </div>
          <div className="max-h-[240px] overflow-y-auto">
            {filteredTreatments.map((t, i) => {
              const globalIdx = filteredExamSuggestions.length + i
              const alreadyAdded = rows.some((r) => r.treatment === t.name)
              return (
                <button
                  key={t.name}
                  type="button"
                  disabled={alreadyAdded}
                  onClick={() => addTreatmentRow(t.name)}
                  className={`w-full flex items-center justify-between px-[12px] py-[10px] text-left transition-colors ${
                    globalIdx === highlightedIndex ? "bg-tp-slate-100" : "hover:bg-tp-slate-50"
                  } ${alreadyAdded ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  <div>
                    <p className="font-sans text-[14px] font-medium text-tp-slate-800">{t.name}</p>
                    <p className="font-sans text-[12px] text-tp-slate-400">{t.category}</p>
                  </div>
                  <span className="font-sans text-[14px] font-semibold text-tp-slate-500 shrink-0">
                    {formatINR(t.defaultRate)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>,
        document.body,
      )}
    </TPDrawer>
  )
}
