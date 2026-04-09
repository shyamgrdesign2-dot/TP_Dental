"use client"

/**
 * PlanEstimatesTab — Cluster card layout.
 * Outer shell: rounded-[16px], bg-white, NO stroke.
 * Plan sub-cards: white bg with rounded-[12px], subtle 0.5px neutral stroke.
 * Number counting badges on inner cards.
 * Tables NOT edge-to-edge: padding, corner radius, stroke.
 * No accordion — services always visible.
 * Three-dot: plain icon, no grey background.
 */

import { useState } from "react"
import { Add, Printer, Copy, Trash, Edit2, Receipt1, DocumentText } from "iconsax-reactjs"
import { MoreVertical } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePlanContext } from "./plan-context"
import { SectionFrame, EmptyState, formatINR, computePlanTotal } from "./plan-shared"
import { SURFACE_ABBR, SURFACE_COLORS } from "./plan-types"
import type { TreatmentPlan, SurfaceId } from "./plan-types"

const dropdownContentClass = "w-[220px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1"
const dropdownItemClass = "rounded-[8px] focus:bg-tp-slate-100 focus:text-tp-slate-700 data-[highlighted]:bg-tp-slate-100 data-[highlighted]:text-tp-slate-700"

// ─── Plan Sub-Card ────────────────────────────────────────────

function PlanSubCard({ plan, index }: { plan: TreatmentPlan; index: number }) {
  const { dispatch, openDrawer, hasInProgressPlan, navigateTab } = usePlanContext()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [startOpen, setStartOpen] = useState(false)

  const total = computePlanTotal(plan.services)

  const handleActivateClick = () => {
    if (hasInProgressPlan) {
      showSnackbar("An active plan already exists. Complete it before activating another.", "warning")
      return
    }
    setStartOpen(true)
  }

  const handleActivate = () => {
    dispatch({ type: "START_TREATMENT", planId: plan.id })
    openDrawer({ type: "closed" })
    setStartOpen(false)
    showSnackbar(`"${plan.name}" is now active and moved to Active Plans`)
    // Auto-navigate to Active Plans tab after a brief moment
    setTimeout(() => navigateTab?.("progress"), 400)
  }

  const handleDuplicate = () => dispatch({ type: "DUPLICATE_PLAN", planId: plan.id })
  const handleDelete = () => {
    dispatch({ type: "DELETE_PLAN", planId: plan.id })
    setDeleteOpen(false)
  }
  const handleEdit = () => openDrawer({ type: "edit-plan", planId: plan.id })

  return (
    <div className="overflow-hidden rounded-[16px] border border-tp-slate-100/70 bg-white shadow-[0_10px_24px_-18px_rgba(15,23,42,0.22)]">
      {/* Sub-card header */}
      <div className="sticky top-0 z-[2] shrink-0 flex items-center gap-[10px] border-b border-tp-slate-100/70 bg-[linear-gradient(180deg,rgba(75,74,213,0.06),rgba(75,74,213,0))] px-[14px] py-[14px]">
        {/* Number counting badge */}
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[8px] bg-tp-blue-50 shrink-0">
          <span className="font-sans text-[14px] font-bold text-tp-blue-600">{index + 1}</span>
        </div>

        {/* Plan info */}
        <div className="flex-1 min-w-0">
          <p className="font-sans text-[16px] font-bold text-tp-slate-900 truncate">
            {plan.name}
          </p>
          <div className="mt-[2px] inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-sans text-[12px] font-medium text-tp-slate-500">
            {formatINR(total)}
          </div>
        </div>

        <div className="flex items-center gap-[6px] shrink-0">
          {/* Activate Plan — secondary green CTA (stroke, no bg) */}
          <button
            type="button"
            onClick={handleActivateClick}
            className="inline-flex items-center justify-center h-[36px] min-w-[120px] rounded-[12px] px-[16px] font-sans text-[14px] font-semibold text-tp-success-700 bg-transparent hover:bg-tp-success-50 transition-colors"
            style={{ border: "1.5px solid var(--tp-success-400)" }}
          >
            Activate Plan
          </button>

          {/* Three-dot menu — plain, no bg */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] hover:bg-tp-slate-100 transition-colors"
              >
                <MoreVertical size={20} color="var(--tp-slate-500)" strokeWidth={2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1">
              <DropdownMenuItem onClick={handleEdit} className={dropdownItemClass}>
                <Edit2 size={16} variant="Linear" className="mr-2" />
                Edit Plan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.print()} className={dropdownItemClass}>
                <Printer size={16} variant="Linear" className="mr-2" />
                Print Estimation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate} className={dropdownItemClass}>
                <Copy size={16} variant="Linear" className="mr-2" />
                Duplicate Plan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDeleteOpen(true)} className="text-tp-error-600 focus:bg-red-50 focus:text-tp-error-600 data-[highlighted]:bg-red-50 data-[highlighted]:text-tp-error-600 rounded-[8px]">
                <Trash size={20} variant="Linear" className="mr-2 text-tp-error-500" />
                Delete Plan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Services table — padded, rounded, with stroke */}
      {plan.services.length > 0 && (
        <div className="px-[10px] pb-[10px] pt-[8px]">
          <div className="rounded-[12px] border border-tp-slate-100/80 overflow-hidden w-full overflow-x-auto min-w-0">
            <table className="w-full min-w-[780px]">
              <thead>
                <tr className="bg-tp-slate-50/80">
                  <th className="px-[14px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[36px]">#</th>
                  <th className="px-[8px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400">Service</th>
                  <th className="px-[8px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[70px]">Tooth</th>
                  <th className="px-[8px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[70px]">Surface</th>
                  <th className="px-[8px] py-[7px] text-right font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[80px]">Rate</th>
                  <th className="px-[8px] py-[7px] text-right font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[60px]">Disc.</th>
                  <th className="px-[14px] py-[7px] text-right font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[80px]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {plan.services.map((svc, idx) => (
                  <tr key={svc.id} className="border-t border-tp-slate-100/70 bg-white hover:bg-tp-slate-50/70 transition-colors">
                    <td className="px-[14px] py-[9px] font-sans text-[12px] text-tp-slate-400">{idx + 1}</td>
                    <td className="px-[8px] py-[9px]">
                      <div className="space-y-[2px]">
                        <p className="font-sans text-[14px] font-medium text-tp-slate-800">{svc.treatment}</p>
                        <p className="font-sans text-[11px] text-tp-slate-400">{svc.toothLabel}</p>
                      </div>
                    </td>
                    <td className="px-[8px] py-[9px]">
                      <span className="inline-flex items-center rounded-[4px] bg-tp-slate-100 px-[5px] py-[1px] font-sans text-[12px] font-bold text-tp-slate-600">
                        {svc.toothFdi === "full-mouth" ? "Full" : `T${svc.toothFdi}`}
                      </span>
                    </td>
                    <td className="px-[8px] py-[9px]">
                      {svc.surfaces && svc.surfaces.length > 0 ? (
                        <div className="flex items-center gap-[3px]">
                          {svc.surfaces.map((z) => (
                            <span
                              key={z}
                              className="inline-flex h-[18px] items-center rounded-[4px] px-[5px] font-sans text-[12px] font-bold text-white"
                              style={{ background: SURFACE_COLORS[z as SurfaceId] }}
                            >
                              {SURFACE_ABBR[z as SurfaceId] ?? z.charAt(0).toUpperCase()}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="font-sans text-[12px] text-tp-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-[8px] py-[9px] text-right font-sans text-[14px] text-tp-slate-600">{formatINR(svc.rate)}</td>
                    <td className="px-[8px] py-[9px] text-right font-sans text-[12px] text-tp-slate-400">
                      {svc.discount > 0 ? `-${formatINR(svc.discount)}` : "—"}
                    </td>
                    <td className="px-[14px] py-[9px] text-right font-sans text-[14px] font-semibold text-tp-slate-800">{formatINR(svc.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-tp-slate-100/80 bg-tp-slate-50/50">
                  <td colSpan={6} className="px-[14px] py-[9px] text-right font-sans text-[12px] font-semibold text-tp-slate-600">
                    Plan Total
                  </td>
                  <td className="px-[14px] py-[9px] text-right font-sans text-[14px] font-bold text-tp-slate-700">
                    {formatINR(total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {plan.services.length === 0 && (
        <div className="px-[14px] py-[16px] text-center">
          <p className="font-sans text-[12px] text-tp-slate-400">No services added yet. Edit this plan to add services.</p>
        </div>
      )}

      {/* Activate Plan confirmation */}
      <AlertDialog open={startOpen} onOpenChange={setStartOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Activate Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Activate <strong>{plan.name}</strong>? All {plan.services.length} service{plan.services.length !== 1 ? "s" : ""} will move to active status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleActivate} className="bg-tp-success-600 text-white hover:bg-tp-success-700">
              Activate Plan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{plan.name}</strong>? This will remove all {plan.services.length} service{plan.services.length !== 1 ? "s" : ""} in this plan. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-tp-error-600 text-white hover:bg-tp-error-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// ─── Snackbar helper ───────────────────────────────────────

function showSnackbar(message: string, variant: "info" | "warning" = "info") {
  const bgColor = variant === "warning" ? "var(--tp-warning-600, #dc6803)" : "var(--tp-slate-800, #1e293b)"
  const el = document.createElement("div")
  el.className = "fixed top-6 left-1/2 -translate-x-1/2 z-[9999] inline-flex items-center gap-3 rounded-[12px] px-5 py-3 font-sans text-[14px] font-medium text-white shadow-lg transition-all animate-in fade-in slide-in-from-top-4"
  el.style.background = bgColor
  el.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0"><path d="M12 9v4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16" r="0.75" fill="white"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${message}</span>`
  document.body.appendChild(el)
  setTimeout(() => {
    el.style.opacity = "0"
    el.style.transform = "translate(-50%, -8px)"
    el.style.transition = "all 300ms ease"
    setTimeout(() => el.remove(), 300)
  }, 3000)
}

// ─── Tab Content ───────────────────────────────────────────

export function PlanEstimatesTab() {
  const { estimatePlans, openDrawer } = usePlanContext()

  if (estimatePlans.length === 0) {
    return (
      <SectionFrame>
        <div className="rounded-[16px] bg-white" style={{ border: "1.5px solid #FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          {/* Cluster header — no CTA when empty */}
          <div className="flex items-center px-[16px] py-[14px] border-b border-tp-slate-100/70">
            <div className="flex items-center gap-[12px]">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-blue-50">
                <DocumentText size={24} variant="Bulk" className="text-tp-blue-600" />
              </div>
              <h3 className="font-sans text-[18px] font-bold text-tp-slate-900">Plan Estimates</h3>
            </div>
          </div>
          {/* Empty state with CTA below */}
          <div className="p-[12px] rounded-b-[16px]" style={{ background: "#E7E8EE" }}>
            <EmptyState
              icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="No treatment plans yet"
              description="Create a new plan to start estimating treatments for this patient."
              action={
                <button
                  type="button"
                  onClick={() => openDrawer({ type: "add-plan" })}
                  className="inline-flex items-center justify-center gap-[5px] rounded-[12px] bg-tp-blue-600 px-[16px] h-[42px] min-w-[120px] font-sans text-[14px] font-semibold text-white transition-colors hover:bg-tp-blue-700 shadow-sm"
                >
                  <Add size={20} variant="Linear" />
                  Create Plan
                </button>
              }
            />
          </div>
        </div>
      </SectionFrame>
    )
  }

  const grandTotal = estimatePlans.reduce((sum, p) => sum + computePlanTotal(p.services), 0)

  return (
    <SectionFrame>
      {/* ── Outer Shell Card — white stroke ── */}
      <div className="rounded-[16px] overflow-hidden bg-white h-full min-h-0 flex flex-col" style={{ border: "1.5px solid #FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* Cluster header */}
        <div className="sticky top-0 z-[3] shrink-0 flex items-center justify-between px-[16px] py-[16px] border-b border-tp-slate-100/70 bg-white">
          <div className="flex items-center gap-[12px]">
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-blue-50">
              <DocumentText size={24} variant="Bulk" className="text-tp-blue-600" />
            </div>
            <div>
              <h3 className="font-sans text-[18px] font-bold text-tp-slate-900">
                Plan Estimates
              </h3>
              <div className="mt-[2px] inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-sans text-[12px] font-medium text-tp-slate-500">
                {formatINR(grandTotal)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              onClick={() => openDrawer({ type: "add-plan" })}
              className="inline-flex items-center justify-center gap-[5px] rounded-[12px] bg-tp-blue-600 px-[16px] h-[42px] min-w-[120px] font-sans text-[14px] font-semibold text-white transition-colors hover:bg-tp-blue-700 shadow-sm"
            >
              <Add size={20} variant="Linear" />
              Create Plan
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-[10px] hover:bg-tp-slate-100 transition-colors"
                >
                  <MoreVertical size={20} color="var(--tp-slate-500)" strokeWidth={2} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={dropdownContentClass}>
                <DropdownMenuItem onClick={() => window.print()} className={dropdownItemClass}>
                  <Printer size={16} variant="Linear" className="mr-2" />
                  Print All Estimates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openDrawer({ type: "bill-preview", planId: estimatePlans[0]?.id ?? "" })} className={dropdownItemClass}>
                  <Receipt1 size={16} variant="Linear" className="mr-2" />
                  View Combined Bill
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Plan sub-cards — neutral bg for differentiation from white cards */}
        <div className="flex-1 min-h-0 overflow-y-auto p-[12px] space-y-[8px] rounded-b-[16px]" style={{ background: "#E7E8EE" }}>
          {estimatePlans.map((plan, idx) => (
            <PlanSubCard key={plan.id} plan={plan} index={idx} />
          ))}
        </div>
      </div>
    </SectionFrame>
  )
}
