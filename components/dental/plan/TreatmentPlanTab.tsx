"use client"

/**
 * TreatmentPlanTab — TP-native design, 3 tabs:
 *   • Plan Estimates   (active plans)
 *   • In Progress      (visit-level tracking)
 *   • Completed        (final billing)
 *
 * Structure matches TP RxPad section pattern: header row with title + count chip
 * + "Add" split-button, scrollable table-card body.
 */

import React, { useMemo, useState } from "react"
import { Add, Clipboard, Clock, ClipboardTick, Trash, TickCircle, CloseCircle, More, Printer, Copy, Play } from "iconsax-reactjs"
import { ToothPicker } from "./ToothPicker"
import { TREATMENT_NAMES, getRate } from "./treatments"
import { TREATMENT_PLANS, type TreatmentPlanRow } from "../mock-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

type SubTabId = "estimates" | "progress" | "completed"

interface TreatmentPlanTabProps {
  patientId: string
}

interface PlanEstimate {
  id: string
  name: string
  createdAt: string
  status: "draft" | "active"
  rows: TreatmentPlanRow[]
}

interface InProgressEntry {
  id: string
  planId: string       // back-link to parent plan
  service: string      // from plan row's treatment
  tooth: string        // a single tooth FDI (or "full-mouth")
  sittings: number
  lastVisit: string
  doctor: string
  remarks: string
  amount: number       // billed amount per tooth
}

interface CompletedEntry {
  id: string
  planId: string
  service: string
  teeth: string
  amount: number
  completedOn: string
}

const TODAY = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

export function TreatmentPlanTab({ patientId }: TreatmentPlanTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>("estimates")
  const [drawerOpen, setDrawerOpen] = useState(false)

  const initialRows = TREATMENT_PLANS[patientId] ?? []
  const [plans, setPlans] = useState<PlanEstimate[]>(
    initialRows.length > 0
      ? [{ id: "plan-seed", name: "Primary Care Plan", createdAt: "5 Apr 2026", status: "draft", rows: initialRows }]
      : []
  )

  const [inProgress, setInProgress] = useState<InProgressEntry[]>([])
  const [completed, setCompleted] = useState<CompletedEntry[]>([])

  // Start treatment: activate a draft plan + auto-seed In Progress entries
  const startTreatment = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)
    if (!plan || plan.status === "active") return
    // Seed one entry per (treatment × tooth) pair
    const entries: InProgressEntry[] = []
    for (const row of plan.rows) {
      const teeth = row.teeth.includes("full-mouth") ? ["full-mouth"] : row.teeth
      for (const tooth of teeth) {
        entries.push({
          id: `prog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          planId: plan.id,
          service: row.treatment,
          tooth: tooth === "full-mouth" ? "Full mouth" : tooth,
          sittings: 0,
          lastVisit: "—",
          doctor: "Dr. Shyam GR",
          remarks: "",
          amount: row.rate,
        })
      }
    }
    setPlans(plans.map((p) => (p.id === planId ? { ...p, status: "active" } : p)))
    setInProgress([...inProgress, ...entries])
    setActiveSubTab("progress")  // switch to In Progress tab so user sees result
  }

  const addSitting = (id: string) => {
    setInProgress(inProgress.map((e) => e.id === id
      ? { ...e, sittings: e.sittings + 1, lastVisit: TODAY }
      : e))
  }

  const markEntryCompleted = (id: string) => {
    const entry = inProgress.find((e) => e.id === id)
    if (!entry) return
    setCompleted([...completed, {
      id: `done-${Date.now()}`,
      planId: entry.planId,
      service: entry.service,
      teeth: entry.tooth,
      amount: entry.amount,
      completedOn: TODAY,
    }])
    setInProgress(inProgress.filter((e) => e.id !== id))
  }

  const removeInProgressEntry = (id: string) => {
    setInProgress(inProgress.filter((e) => e.id !== id))
  }

  const markPlanCompleted = (planId: string) => {
    // Move all remaining in-progress entries for this plan to completed
    const planEntries = inProgress.filter((e) => e.planId === planId)
    if (planEntries.length === 0) return
    setCompleted([...completed, ...planEntries.map((e) => ({
      id: `done-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      planId: e.planId,
      service: e.service,
      teeth: e.tooth,
      amount: e.amount,
      completedOn: TODAY,
    }))])
    setInProgress(inProgress.filter((e) => e.planId !== planId))
  }

  const duplicatePlan = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)
    if (!plan) return
    setPlans([...plans, {
      ...plan,
      id: `plan-${Date.now()}`,
      name: plan.name + " (copy)",
      createdAt: TODAY,
      status: "draft",
      rows: plan.rows.map((r) => ({ ...r, id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` })),
    }])
  }

  const printPlan = (planId: string) => {
    // Demo: open print dialog with just this plan.
    const plan = plans.find((p) => p.id === planId)
    if (!plan) return
    // eslint-disable-next-line no-console
    console.log("Print plan:", plan)
    window.print()
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-tp-slate-50">
      {/* Tab strip */}
      <nav className="flex shrink-0 items-center border-b border-tp-slate-200 bg-white px-[20px]">
        <TabPill active={activeSubTab === "estimates"} onClick={() => setActiveSubTab("estimates")} icon={<Clipboard size={13} color="currentColor" variant={activeSubTab === "estimates" ? "Bulk" : "Linear"} />} label="Plan Estimates" count={plans.length} />
        <TabPill active={activeSubTab === "progress"} onClick={() => setActiveSubTab("progress")} icon={<Clock size={13} color="currentColor" variant={activeSubTab === "progress" ? "Bulk" : "Linear"} />} label="In Progress" count={inProgress.length} />
        <TabPill active={activeSubTab === "completed"} onClick={() => setActiveSubTab("completed")} icon={<ClipboardTick size={13} color="currentColor" variant={activeSubTab === "completed" ? "Bulk" : "Linear"} />} label="Completed" count={completed.length} />
      </nav>

      {/* Content */}
      <div className="flex-1 overflow-auto p-[20px]">
        {activeSubTab === "estimates" && (
          <PlanEstimatesTab
            plans={plans}
            onAddClick={() => setDrawerOpen(true)}
            onDeletePlan={(id) => setPlans(plans.filter((p) => p.id !== id))}
            onStartTreatment={startTreatment}
            onDuplicatePlan={duplicatePlan}
            onPrintPlan={printPlan}
            onMarkPlanCompleted={markPlanCompleted}
          />
        )}
        {activeSubTab === "progress" && (
          <InProgressTabContent
            entries={inProgress}
            onAddSitting={addSitting}
            onMarkCompleted={markEntryCompleted}
            onRemove={removeInProgressEntry}
          />
        )}
        {activeSubTab === "completed" && <CompletedTabContent entries={completed} />}
      </div>

      {drawerOpen && (
        <AddPlanDrawer
          onClose={() => setDrawerOpen(false)}
          onSave={(plan) => { setPlans([...plans, plan]); setDrawerOpen(false) }}
        />
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// Tab pill
// ──────────────────────────────────────────────────────────────
function TabPill({
  active, onClick, icon, label, count,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  count: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-[7px] border-b-2 px-[16px] py-[14px] font-sans text-[13px] font-semibold transition-colors ${
        active ? "border-tp-blue-500 text-tp-blue-700" : "border-transparent text-tp-slate-500 hover:text-tp-slate-700"
      }`}
    >
      {icon}
      {label}
      {count > 0 && (
        <span className={`inline-flex h-[16px] min-w-[16px] items-center justify-center rounded-full px-[4px] font-sans text-[9px] font-semibold tabular-nums ${active ? "bg-tp-blue-100 text-tp-blue-700" : "bg-tp-slate-100 text-tp-slate-500"}`}>
          {count}
        </span>
      )}
    </button>
  )
}

// ──────────────────────────────────────────────────────────────
// Section frame (shared card shell)
// ──────────────────────────────────────────────────────────────
function SectionFrame({
  title, count, action, children,
}: {
  title: string
  count: number
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[12px] border border-tp-slate-200 bg-white overflow-hidden">
      <header className="flex items-center justify-between border-b border-tp-slate-100 px-[16px] py-[12px]">
        <div className="flex items-center gap-[8px]">
          <h3 className="font-sans text-[13px] font-semibold text-tp-slate-800">{title}</h3>
          {count > 0 && (
            <span className="inline-flex h-[18px] min-w-[22px] items-center justify-center rounded-full bg-tp-slate-100 px-[6px] font-sans text-[10px] font-semibold text-tp-slate-600 tabular-nums">
              {count}
            </span>
          )}
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// Plan Estimates
// ──────────────────────────────────────────────────────────────
function PlanEstimatesTab({
  plans, onAddClick, onDeletePlan, onStartTreatment, onDuplicatePlan, onPrintPlan, onMarkPlanCompleted,
}: {
  plans: PlanEstimate[]
  onAddClick: () => void
  onDeletePlan: (id: string) => void
  onStartTreatment: (id: string) => void
  onDuplicatePlan: (id: string) => void
  onPrintPlan: (id: string) => void
  onMarkPlanCompleted: (id: string) => void
}) {
  const addButton = (
    <button type="button" onClick={onAddClick} className="inline-flex h-[30px] items-center gap-[5px] rounded-[6px] bg-tp-blue-500 px-[12px] font-sans text-[11px] font-semibold text-white transition-colors hover:bg-tp-blue-600">
      <Add size={14} color="#FFFFFF" variant="Linear" /> Add plan
    </button>
  )

  if (plans.length === 0) {
    return (
      <SectionFrame title="Plan Estimates" count={0} action={addButton}>
        <EmptyState
          title="No estimates added"
          subtitle="Create a treatment plan with cost estimation, tooth-level mapping, and billing integration."
          ctaLabel="Add your first plan"
          onCta={onAddClick}
        />
      </SectionFrame>
    )
  }

  return (
    <SectionFrame title="Plan Estimates" count={plans.length} action={addButton}>
      <div className="flex flex-col">
        {plans.map((plan, planIdx) => {
          const total = plan.rows.reduce((sum, r) => sum + r.rate * (r.teeth.includes("full-mouth") ? 1 : r.teeth.length), 0)
          return (
            <div key={plan.id} className={`${planIdx > 0 ? "border-t border-tp-slate-100" : ""}`}>
              {/* Plan header */}
              <div className="flex items-center justify-between px-[16px] py-[10px] bg-tp-slate-50">
                <div className="flex items-center gap-[10px] min-w-0">
                  <span className="font-sans text-[12px] font-semibold text-tp-slate-800 truncate">{plan.name}</span>
                  <span className="font-sans text-[10px] text-tp-slate-400 whitespace-nowrap">· Created {plan.createdAt}</span>
                  <span className={`inline-flex items-center rounded-[4px] px-[6px] py-[1px] font-sans text-[9px] font-semibold uppercase tracking-[0.3px] ${plan.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {plan.status}
                  </span>
                </div>
                <div className="flex items-center gap-[6px]">
                  {plan.status === "draft" ? (
                    <button
                      type="button"
                      onClick={() => onStartTreatment(plan.id)}
                      className="inline-flex h-[28px] items-center gap-[5px] rounded-[6px] bg-emerald-600 px-[10px] font-sans text-[11px] font-semibold text-white transition-colors hover:bg-emerald-700"
                    >
                      <Play size={12} color="#FFFFFF" variant="Bulk" /> Start treatment
                    </button>
                  ) : (
                    <span className="inline-flex h-[26px] items-center gap-[4px] rounded-[6px] bg-emerald-100 px-[8px] font-sans text-[10px] font-semibold text-emerald-700">
                      <TickCircle size={11} color="#059669" variant="Bulk" /> Active
                    </span>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-[5px] text-tp-slate-500 hover:bg-tp-slate-200 hover:text-tp-slate-800"
                        aria-label="More actions"
                      >
                        <More size={14} color="currentColor" variant="Bulk" style={{ transform: "rotate(90deg)" }} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[180px]">
                      <DropdownMenuItem onClick={() => onPrintPlan(plan.id)} className="text-[12px]">
                        <Printer size={13} color="currentColor" variant="Linear" className="mr-[4px]" />
                        Print plan
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicatePlan(plan.id)} className="text-[12px]">
                        <Copy size={13} color="currentColor" variant="Linear" className="mr-[4px]" />
                        Duplicate
                      </DropdownMenuItem>
                      {plan.status === "active" && (
                        <DropdownMenuItem onClick={() => onMarkPlanCompleted(plan.id)} className="text-[12px] text-emerald-700 focus:text-emerald-800">
                          <TickCircle size={13} color="currentColor" variant="Bulk" className="mr-[4px]" />
                          Mark plan completed
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDeletePlan(plan.id)} className="text-[12px] text-red-600 focus:text-red-700">
                        <Trash size={13} color="currentColor" variant="Linear" className="mr-[4px]" />
                        Delete plan
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Rows */}
              <div className="grid grid-cols-[minmax(160px,2fr)_minmax(120px,1fr)_80px_100px_110px] gap-[12px] px-[16px] py-[9px] bg-white border-b border-tp-slate-100">
                <TH>Service</TH>
                <TH>Teeth</TH>
                <TH className="text-center">Qty</TH>
                <TH className="text-right">Rate</TH>
                <TH className="text-right">Amount</TH>
              </div>
              {plan.rows.map((row) => {
                const count = row.teeth.includes("full-mouth") ? 1 : row.teeth.length
                return (
                  <div key={row.id} className="grid grid-cols-[minmax(160px,2fr)_minmax(120px,1fr)_80px_100px_110px] items-center gap-[12px] border-b border-tp-slate-100 px-[16px] py-[10px] hover:bg-tp-slate-50">
                    <span className="font-sans text-[12px] font-medium text-tp-slate-800">{row.treatment}</span>
                    <span className="font-sans text-[11px] text-tp-slate-600 truncate">{row.teeth.includes("full-mouth") ? "Full mouth" : row.teeth.join(", ")}</span>
                    <span className="font-sans text-[11px] text-tp-slate-600 text-center tabular-nums">{count}</span>
                    <span className="font-sans text-[11px] text-tp-slate-600 text-right tabular-nums">₹{row.rate.toLocaleString("en-IN")}</span>
                    <span className="font-sans text-[12px] font-semibold text-tp-slate-900 text-right tabular-nums">₹{(row.rate * count).toLocaleString("en-IN")}</span>
                  </div>
                )
              })}

              {/* Plan total */}
              <div className="grid grid-cols-[1fr_110px] items-center gap-[12px] bg-tp-blue-50/40 border-t border-tp-slate-100 px-[16px] py-[10px]">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.5px] text-tp-slate-500 text-right">Plan Total</span>
                <span className="font-sans text-[13px] font-bold text-tp-blue-700 text-right tabular-nums">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          )
        })}
      </div>
    </SectionFrame>
  )
}

// ──────────────────────────────────────────────────────────────
// In Progress
// ──────────────────────────────────────────────────────────────
function InProgressTabContent({
  entries, onAddSitting, onMarkCompleted, onRemove,
}: {
  entries: InProgressEntry[]
  onAddSitting: (id: string) => void
  onMarkCompleted: (id: string) => void
  onRemove: (id: string) => void
}) {
  if (entries.length === 0) {
    return (
      <SectionFrame title="In Progress" count={0}>
        <EmptyState
          title="No ongoing procedures"
          subtitle="Procedures from an active plan will appear here as visits are logged."
        />
      </SectionFrame>
    )
  }
  return (
    <SectionFrame title="In Progress" count={entries.length}>
      <div className="grid grid-cols-[minmax(180px,2fr)_80px_80px_110px_120px_110px_44px] gap-[12px] border-b border-tp-slate-100 px-[16px] py-[9px]">
        <TH>Service</TH>
        <TH>Tooth</TH>
        <TH className="text-center">Sittings</TH>
        <TH>Last visit</TH>
        <TH>Doctor</TH>
        <TH className="text-right">Amount</TH>
        <TH />
      </div>
      {entries.map((e) => (
        <div key={e.id} className="grid grid-cols-[minmax(180px,2fr)_80px_80px_110px_120px_110px_44px] items-center gap-[12px] border-b border-tp-slate-100 px-[16px] py-[10px] last:border-b-0 hover:bg-tp-slate-50">
          <span className="font-sans text-[12px] font-medium text-tp-slate-800">{e.service}</span>
          <span className="font-sans text-[12px] text-tp-slate-600 tabular-nums">{e.tooth}</span>
          <span className="font-sans text-[12px] text-tp-slate-600 text-center tabular-nums">{e.sittings}</span>
          <span className="font-sans text-[12px] text-tp-slate-600">{e.lastVisit}</span>
          <span className="font-sans text-[12px] text-tp-slate-600 truncate">{e.doctor}</span>
          <span className="font-sans text-[12px] font-semibold text-tp-slate-900 text-right tabular-nums">₹{e.amount.toLocaleString("en-IN")}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-[5px] text-tp-slate-500 hover:bg-tp-slate-200 hover:text-tp-slate-800"
                aria-label="Actions"
              >
                <More size={14} color="currentColor" variant="Bulk" style={{ transform: "rotate(90deg)" }} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              <DropdownMenuItem onClick={() => onAddSitting(e.id)} className="text-[12px]">
                <Add size={13} color="currentColor" variant="Linear" className="mr-[4px]" />
                Add sitting
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onMarkCompleted(e.id)} className="text-[12px] text-emerald-700 focus:text-emerald-800">
                <TickCircle size={13} color="currentColor" variant="Bulk" className="mr-[4px]" />
                Mark completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onRemove(e.id)} className="text-[12px] text-red-600 focus:text-red-700">
                <Trash size={13} color="currentColor" variant="Linear" className="mr-[4px]" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </SectionFrame>
  )
}

// ──────────────────────────────────────────────────────────────
// Completed
// ──────────────────────────────────────────────────────────────
function CompletedTabContent({ entries }: { entries: CompletedEntry[] }) {
  if (entries.length === 0) {
    return (
      <SectionFrame title="Completed Treatments" count={0}>
        <EmptyState
          title="Nothing completed yet"
          subtitle="Treatments marked complete will appear here with their billing details."
        />
      </SectionFrame>
    )
  }
  const total = entries.reduce((s, e) => s + e.amount, 0)
  return (
    <SectionFrame title="Completed Treatments" count={entries.length}>
      <div className="grid grid-cols-[minmax(180px,2fr)_minmax(120px,1fr)_120px_120px] gap-[12px] border-b border-tp-slate-100 px-[16px] py-[9px]">
        <TH>Service</TH>
        <TH>Teeth</TH>
        <TH>Completed on</TH>
        <TH className="text-right">Amount</TH>
      </div>
      {entries.map((e) => (
        <div key={e.id} className="grid grid-cols-[minmax(180px,2fr)_minmax(120px,1fr)_120px_120px] items-center gap-[12px] border-b border-tp-slate-100 px-[16px] py-[10px] last:border-b-0 hover:bg-tp-slate-50">
          <span className="font-sans text-[12px] font-medium text-tp-slate-800">{e.service}</span>
          <span className="font-sans text-[11px] text-tp-slate-600">{e.teeth}</span>
          <span className="font-sans text-[11px] text-tp-slate-500">{e.completedOn}</span>
          <span className="font-sans text-[12px] font-semibold text-tp-slate-900 text-right tabular-nums">₹{e.amount.toLocaleString("en-IN")}</span>
        </div>
      ))}
      <div className="grid grid-cols-[1fr_120px] items-center gap-[12px] bg-emerald-50/50 border-t border-tp-slate-100 px-[16px] py-[10px]">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.5px] text-tp-slate-500 text-right">Total Billed</span>
        <span className="font-sans text-[13px] font-bold text-emerald-700 text-right tabular-nums">₹{total.toLocaleString("en-IN")}</span>
      </div>
    </SectionFrame>
  )
}

// ──────────────────────────────────────────────────────────────
// Shared helpers
// ──────────────────────────────────────────────────────────────
function TH({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-sans text-[9px] font-semibold uppercase tracking-[0.6px] text-tp-slate-500 ${className}`}>
      {children}
    </span>
  )
}

function EmptyState({
  title, subtitle, ctaLabel, onCta,
}: {
  title: string
  subtitle?: string
  ctaLabel?: string
  onCta?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-[10px] py-[56px] px-[24px]">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <circle cx="28" cy="28" r="26" fill="#F1F5F9" />
        <rect x="18" y="16" width="20" height="26" rx="3" fill="#E2E8F0" />
        <path d="M23 22h10M23 27h8M23 32h6" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="font-sans text-[13px] font-semibold text-tp-slate-700">{title}</p>
      {subtitle && <p className="max-w-[300px] text-center font-sans text-[11px] text-tp-slate-500 leading-[16px]">{subtitle}</p>}
      {ctaLabel && onCta && (
        <button type="button" onClick={onCta} className="mt-[4px] inline-flex h-[30px] items-center gap-[5px] rounded-[6px] bg-tp-blue-500 px-[14px] font-sans text-[11px] font-semibold text-white hover:bg-tp-blue-600">
          <Add size={13} color="#FFFFFF" variant="Linear" /> {ctaLabel}
        </button>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// Add Plan Drawer
// ──────────────────────────────────────────────────────────────
function AddPlanDrawer({
  onClose, onSave,
}: {
  onClose: () => void
  onSave: (plan: PlanEstimate) => void
}) {
  const [planName, setPlanName] = useState("")
  const [rows, setRows] = useState<TreatmentPlanRow[]>([
    { id: `r-${Date.now()}`, treatment: "", teeth: [], rate: 0 },
  ])

  const total = useMemo(() => rows.reduce((s, r) => s + r.rate * (r.teeth.includes("full-mouth") ? 1 : r.teeth.length), 0), [rows])
  const addRow = () => setRows([...rows, { id: `r-${Date.now()}`, treatment: "", teeth: [], rate: 0 }])
  const updateRow = (id: string, patch: Partial<TreatmentPlanRow>) => setRows(rows.map((r) => r.id === id ? { ...r, ...patch } : r))
  const deleteRow = (id: string) => setRows(rows.filter((r) => r.id !== id))
  const canSave = planName.trim().length > 0 && rows.some((r) => r.treatment && r.teeth.length > 0)

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 animate-in fade-in" onClick={onClose} role="presentation" />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-[680px] max-w-[100vw] flex-col overflow-hidden bg-white shadow-2xl animate-in slide-in-from-right">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-tp-slate-200 px-[20px] py-[14px]">
          <div>
            <h3 className="font-sans text-[14px] font-semibold text-tp-slate-900">New Plan Estimate</h3>
            <p className="font-sans text-[11px] text-tp-slate-500">Add services and teeth to calculate treatment cost.</p>
          </div>
          <button type="button" onClick={onClose} className="text-tp-slate-400 hover:text-tp-slate-700" aria-label="Close">
            <CloseCircle size={20} color="currentColor" variant="Linear" />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-auto px-[20px] py-[16px]">
          <label className="mb-[6px] block font-sans text-[11px] font-semibold uppercase tracking-[0.5px] text-tp-slate-500">
            Plan name
          </label>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="e.g. RCT + Crown (Tooth 36)"
            className="mb-[16px] h-[38px] w-full rounded-[8px] border border-tp-slate-200 bg-white px-[12px] font-sans text-[13px] text-tp-slate-800 focus:border-tp-blue-500 focus:outline-none"
          />

          <div className="rounded-[8px] border border-tp-slate-200 overflow-hidden">
            <div className="grid grid-cols-[28px_minmax(140px,1.4fr)_140px_56px_84px_80px_32px] gap-[8px] border-b border-tp-slate-200 bg-tp-slate-50 px-[12px] py-[8px]">
              <TH>#</TH>
              <TH>Service</TH>
              <TH>Teeth</TH>
              <TH className="text-center">Qty</TH>
              <TH className="text-right">Rate</TH>
              <TH className="text-right">Amount</TH>
              <TH />
            </div>
            {rows.map((row, i) => {
              const count = row.teeth.includes("full-mouth") ? 1 : row.teeth.length
              return (
                <div key={row.id} className="grid grid-cols-[28px_minmax(140px,1.4fr)_140px_56px_84px_80px_32px] items-center gap-[8px] border-b border-tp-slate-100 px-[12px] py-[8px] last:border-b-0">
                  <span className="font-sans text-[11px] text-tp-slate-500">{i + 1}</span>
                  <select
                    value={row.treatment}
                    onChange={(e) => updateRow(row.id, { treatment: e.target.value, rate: getRate(e.target.value) })}
                    className="h-[30px] rounded-[5px] border border-tp-slate-200 bg-white px-[8px] font-sans text-[11px] text-tp-slate-700 focus:border-tp-blue-500 focus:outline-none"
                  >
                    <option value="">Select…</option>
                    {TREATMENT_NAMES.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  <ToothPicker value={row.teeth} onChange={(teeth) => updateRow(row.id, { teeth })} />
                  <span className="font-sans text-[11px] text-tp-slate-700 text-center tabular-nums">{count}</span>
                  <input
                    type="number"
                    value={row.rate || ""}
                    onChange={(e) => updateRow(row.id, { rate: Number(e.target.value) || 0 })}
                    placeholder="0"
                    className="h-[30px] rounded-[5px] border border-tp-slate-200 bg-white px-[8px] text-right font-sans text-[11px] text-tp-slate-700 focus:border-tp-blue-500 focus:outline-none"
                  />
                  <span className="font-sans text-[11px] font-semibold text-tp-slate-900 text-right tabular-nums">
                    ₹{(row.rate * count).toLocaleString("en-IN")}
                  </span>
                  <button type="button" onClick={() => deleteRow(row.id)} className="inline-flex h-[24px] w-[24px] items-center justify-center rounded-[4px] text-tp-slate-400 hover:bg-red-50 hover:text-red-500" aria-label="Delete row">
                    <Trash size={12} color="currentColor" variant="Linear" />
                  </button>
                </div>
              )
            })}
          </div>

          <button type="button" onClick={addRow} className="mt-[10px] inline-flex items-center gap-[4px] font-sans text-[11px] font-semibold text-tp-blue-600 hover:underline">
            <Add size={12} color="currentColor" variant="Linear" /> Add service row
          </button>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-tp-slate-200 bg-tp-slate-50 px-[20px] py-[12px]">
          <div className="flex items-baseline gap-[8px]">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.5px] text-tp-slate-500">Plan total</span>
            <span className="font-sans text-[18px] font-bold text-tp-blue-700 tabular-nums">₹{total.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <button type="button" onClick={onClose} className="inline-flex h-[34px] items-center rounded-[6px] border border-tp-slate-200 bg-white px-[14px] font-sans text-[12px] font-semibold text-tp-slate-700 hover:bg-tp-slate-50">
              Cancel
            </button>
            <button
              type="button"
              disabled={!canSave}
              onClick={() => onSave({
                id: `plan-${Date.now()}`,
                name: planName.trim(),
                createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                status: "draft",
                rows: rows.filter((r) => r.treatment && r.teeth.length > 0),
              })}
              className="inline-flex h-[34px] items-center gap-[5px] rounded-[6px] bg-tp-blue-500 px-[14px] font-sans text-[12px] font-semibold text-white hover:bg-tp-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <TickCircle size={14} color="#FFFFFF" variant="Linear" />
              Save plan
            </button>
          </div>
        </footer>
      </aside>
    </>
  )
}
