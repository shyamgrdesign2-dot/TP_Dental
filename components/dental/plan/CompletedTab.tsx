"use client"

/**
 * CompletedTab — Cluster card layout for completed plans.
 * Outer shell: NO stroke (clean white card).
 * Inner sub-cards: 0.5px neutral stroke.
 * Number counting badges on inner cards.
 * Tables NOT edge-to-edge: padding, corner radius, stroke.
 * Clipboard-tick icon for completed state (green).
 * Three-dot: plain icon, no grey bg.
 * Font sizes: 14px base, 12px min.
 */

import { useState } from "react"
import { ArrowRotateLeft, Receipt1, Printer, DocumentText } from "iconsax-reactjs"
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
import {
  SectionFrame,
  EmptyState,
  ClipboardTickIcon,
  formatINR,
  computePlanTotal,
  getPlanCompletionStatus,
  getServiceWorkflowStatus,
} from "./plan-shared"
import type { TreatmentPlan, PlanService, SurfaceId } from "./plan-types"

const dropdownContentClass = "w-[220px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1"
const dropdownItemClass = "rounded-[8px] focus:bg-tp-slate-100 focus:text-tp-slate-700 data-[highlighted]:bg-tp-slate-100 data-[highlighted]:text-tp-slate-700"

function renderStatusChip(status: "not-started" | "in-progress" | "completed" | "no-show" | "not-interested") {
  const cls =
    status === "completed"
      ? "bg-tp-success-50 text-tp-success-700"
      : status === "in-progress"
        ? "bg-tp-warning-50 text-tp-warning-700"
        : status === "no-show"
          ? "bg-tp-violet-50 text-tp-violet-700"
          : status === "not-interested"
            ? "bg-tp-error-50 text-tp-error-700"
        : "bg-tp-slate-100 text-tp-slate-500"
  const label =
    status === "completed"
      ? "Completed"
      : status === "in-progress"
        ? "In Progress"
        : status === "no-show"
          ? "No Show"
          : status === "not-interested"
            ? "Not Interested"
          : "Not Started"
  return <span className={`inline-flex items-center rounded-[6px] px-[8px] py-[2px] font-sans text-[11px] font-semibold ${cls}`}>{label}</span>
}

function renderPlanCompletionChip(status: "not-completed" | "partially-completed" | "completed") {
  const cls =
    status === "completed"
      ? "bg-tp-success-50 text-tp-success-700"
      : status === "partially-completed"
        ? "bg-tp-warning-50 text-tp-warning-700"
        : "bg-tp-slate-100 text-tp-slate-500"
  const label =
    status === "completed"
      ? "Completed"
      : status === "partially-completed"
        ? "Partially Completed"
        : "Not Completed"
  return <span className={`inline-flex items-center rounded-[6px] px-[8px] py-[2px] font-sans text-[12px] font-semibold ${cls}`}>{label}</span>
}

function formatSurfaceLabel(surface: SurfaceId): string {
  return surface.charAt(0).toUpperCase() + surface.slice(1)
}

function buildServiceDescription(service: PlanService): string {
  const toothLabel = service.toothFdi === "full-mouth" ? "the full mouth" : service.toothLabel
  if (service.surfaces.length === 0) {
    return `Completed for ${toothLabel}.`
  }
  const surfaceText = service.surfaces.map((surface) => formatSurfaceLabel(surface)).join(", ")
  return `Completed for ${toothLabel} on ${surfaceText} surface${service.surfaces.length > 1 ? "s" : ""}.`
}

// ─── Service row ───────────────────────────────────────────

function CompletedServiceRow({ service, plan, index }: { service: PlanService; plan: TreatmentPlan; index: number }) {
  const { openDrawer } = usePlanContext()

  const serviceDescription = buildServiceDescription(service)
  const workflowStatus = getServiceWorkflowStatus(service)

  return (
    <>
      <tr className="border-t border-tp-slate-100/70 hover:bg-tp-slate-50/50 transition-colors">
        <td className="px-[14px] py-[9px] font-sans text-[12px] text-tp-slate-400">{index + 1}</td>
        <td className="px-[8px] py-[9px]">
          <div className="space-y-[2px]">
            <p className="font-sans text-[14px] font-medium text-tp-slate-800">{service.treatment}</p>
            <p className="font-sans text-[11px] text-tp-slate-400">{serviceDescription}</p>
          </div>
        </td>
        <td className="px-[8px] py-[9px]">
          <span className="inline-flex items-center rounded-[4px] bg-tp-slate-100 px-[5px] py-[1px] font-sans text-[12px] font-bold text-tp-slate-600">
            {service.toothFdi === "full-mouth" ? "Full" : `T${service.toothFdi}`}
          </span>
        </td>
        <td className="px-[8px] py-[9px] font-sans text-[12px] text-tp-slate-500">
          {service.completedAt ?? "—"}
        </td>
        <td className="px-[8px] py-[9px]">
          {renderStatusChip(workflowStatus)}
        </td>
        <td className="px-[14px] py-[9px] text-right font-sans text-[14px] font-semibold text-tp-slate-800">
          {formatINR(service.amount)}
        </td>
        <td className="px-[8px] py-[9px] text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] hover:bg-tp-slate-100 transition-colors"
              >
                <MoreVertical size={20} color="var(--tp-slate-500)" strokeWidth={2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1">
              <DropdownMenuItem onClick={() => openDrawer({ type: "bill-preview", planId: plan.id, serviceId: service.id })} className={dropdownItemClass}>
                <Receipt1 size={16} variant="Linear" className="mr-2" />
                View Bill Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDrawer({ type: "rx-preview", planId: plan.id, serviceId: service.id })} className={dropdownItemClass}>
                <DocumentText size={16} variant="Linear" className="mr-2" />
                View / Print RX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </tr>
    </>
  )
}

// ─── Plan Cluster Card ─────────────────────────────────────

function CompletedPlanCluster({ plan, index }: { plan: TreatmentPlan; index: number }) {
  const { dispatch, openDrawer } = usePlanContext()
  const [revertPlanOpen, setRevertPlanOpen] = useState(false)

  const total = computePlanTotal(plan.services)
  const planStatus = getPlanCompletionStatus(plan.services)
  return (
    <div className="rounded-[14px] bg-white overflow-hidden">
      {/* Plan sub-card header — number badge instead of icon */}
      <div className="sticky top-0 z-[2] shrink-0 flex items-center justify-between px-[14px] py-[10px] bg-[linear-gradient(180deg,rgba(34,197,94,0.05),rgba(34,197,94,0))]">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-tp-success-50 shrink-0">
            <span className="font-sans text-[16px] font-bold text-tp-success-700">{index + 1}</span>
          </div>
          <div className="flex-1 min-w-0 flex flex-wrap items-center gap-[12px]">
            <div>
              <h4 className="font-sans text-[16px] font-bold text-tp-slate-900 shrink-0">{plan.name}</h4>
              <div className="mt-[2px] flex items-center gap-[6px]">
                <span className="inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-sans text-[12px] font-medium text-tp-slate-500">
                  {formatINR(total)}
                </span>
                {renderPlanCompletionChip(planStatus)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[8px]">
          {/* Three-dot — plain, no bg */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] hover:bg-tp-slate-100 transition-colors"
              >
                <MoreVertical size={20} color="var(--tp-slate-500)" strokeWidth={2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={dropdownContentClass}>
              <DropdownMenuItem onClick={() => openDrawer({ type: "bill-preview", planId: plan.id })} className={dropdownItemClass}>
                <Receipt1 size={16} variant="Linear" className="mr-2" />
                View Plan Bill
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDrawer({ type: "rx-preview", planId: plan.id })} className={dropdownItemClass}>
                <Printer size={16} variant="Linear" className="mr-2" />
                Print Plan RX
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRevertPlanOpen(true)} className="rounded-[8px] focus:bg-tp-warning-50 data-[highlighted]:bg-tp-warning-50">
                <ArrowRotateLeft size={16} variant="Linear" className="mr-2 text-tp-warning-600" />
                <span className="text-tp-warning-600">Move to Active Plans</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Services table — padded, rounded, with stroke */}
      <div className="px-[10px] pb-[10px] pt-[8px]">
        <div className="rounded-[8px] border border-tp-slate-100/80 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-tp-slate-50/60">
                <th className="px-[14px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[36px]">#</th>
                <th className="px-[8px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400">Service</th>
                <th className="px-[8px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[70px]">Tooth</th>
                <th className="px-[8px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[90px]">Completed</th>
                <th className="px-[8px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[110px]">Status</th>
                <th className="px-[14px] py-[7px] text-right font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[80px]">Amount</th>
                <th className="px-[8px] py-[7px] w-[40px]" />
              </tr>
            </thead>
            <tbody>
              {plan.services.map((svc, idx) => (
                <CompletedServiceRow key={svc.id} service={svc} plan={plan} index={idx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revert plan confirmation */}
      <AlertDialog open={revertPlanOpen} onOpenChange={setRevertPlanOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Move Plan to Active Plans</AlertDialogTitle>
            <AlertDialogDescription>
              This will move <strong>{plan.name}</strong> and all its services back to active status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                dispatch({ type: "REVERT_PLAN_TO_PROGRESS", planId: plan.id })
                setRevertPlanOpen(false)
              }}
              className="bg-tp-warning-600 text-white hover:bg-tp-warning-700"
            >
              Revert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// ─── Tab Content ────────────────────────────────────────────

export function CompletedTab() {
  const { completedPlans } = usePlanContext()

  if (completedPlans.length === 0) {
    return (
      <SectionFrame>
        <div className="rounded-[16px] bg-white" style={{ border: "1.5px solid #FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          {/* Cluster header — clipboard-tick icon, green */}
          <div className="flex items-center justify-between px-[16px] py-[14px] border-b border-tp-slate-100/70">
            <div className="flex items-center gap-[12px]">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-success-50">
                <ClipboardTickIcon size={24} className="text-tp-success-600" />
              </div>
              <h3 className="font-sans text-[18px] font-bold text-tp-slate-900">Completed Plans</h3>
            </div>
          </div>
          {/* Empty state inside cluster */}
          <div className="p-[12px] rounded-b-[16px]" style={{ background: "#E7E8EE" }}>
            <EmptyState
              icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
              title="No completed treatments"
              description="Treatments will appear here once they are marked as completed."
            />
          </div>
        </div>
      </SectionFrame>
    )
  }

  const grandTotal = completedPlans.reduce((sum, p) => sum + computePlanTotal(p.services), 0)

  return (
    <SectionFrame>
      {/* ── Outer Shell Card — white stroke ──────────── */}
      <div className="rounded-[16px] overflow-hidden bg-white h-full min-h-0 flex flex-col" style={{ border: "1.5px solid #FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* Cluster header — clipboard-tick icon, green */}
        <div className="sticky top-0 z-[3] shrink-0 flex items-center justify-between px-[16px] py-[14px] border-b border-tp-slate-100/70 bg-white">
          <div className="flex items-center gap-[12px]">
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-success-50">
              <ClipboardTickIcon size={24} className="text-tp-success-600" />
            </div>
            <div>
              <h3 className="font-sans text-[18px] font-bold text-tp-slate-900">
                Completed Plans
              </h3>
              <div className="mt-[2px] inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-sans text-[12px] font-medium text-tp-slate-500">
                {formatINR(grandTotal)}
              </div>
            </div>
          </div>

          {/* Three-dot — plain, no bg */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] hover:bg-tp-slate-100 transition-colors"
              >
                <MoreVertical size={20} color="var(--tp-slate-500)" strokeWidth={2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={dropdownContentClass}>
              <DropdownMenuItem onClick={() => window.print()} className={dropdownItemClass}>
                <Printer size={16} variant="Linear" className="mr-2" />
                Print All Completed
              </DropdownMenuItem>
              <DropdownMenuItem className={dropdownItemClass}>
                <Receipt1 size={16} variant="Linear" className="mr-2" />
                Export Billing Summary
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Plan sub-cards */}
        <div className="flex-1 min-h-0 overflow-y-auto p-[12px] space-y-[8px] rounded-b-[16px]" style={{ background: "#E7E8EE" }}>
          {completedPlans.map((plan, idx) => (
            <CompletedPlanCluster key={plan.id} plan={plan} index={idx} />
          ))}
        </div>
      </div>
    </SectionFrame>
  )
}
