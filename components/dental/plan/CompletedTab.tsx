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
import { SectionFrame, EmptyState, ClipboardTickIcon, formatINR, computePlanTotal, computePlanDiscount } from "./plan-shared"
import type { TreatmentPlan, PlanService } from "./plan-types"

// ─── Service row ───────────────────────────────────────────

function CompletedServiceRow({ service, plan, index }: { service: PlanService; plan: TreatmentPlan; index: number }) {
  const { openDrawer } = usePlanContext()
  const [revertOpen, setRevertOpen] = useState(false)
  const { dispatch } = usePlanContext()

  return (
    <>
      <tr className="border-t border-tp-slate-100 hover:bg-tp-slate-50/50 transition-colors">
        <td className="px-[14px] py-[9px] font-sans text-[12px] text-tp-slate-400">{index + 1}</td>
        <td className="px-[8px] py-[9px]">
          <p className="font-sans text-[14px] font-medium text-tp-slate-800">{service.treatment}</p>
        </td>
        <td className="px-[8px] py-[9px]">
          <span className="inline-flex items-center rounded-[4px] bg-tp-slate-100 px-[5px] py-[1px] font-sans text-[12px] font-bold text-tp-slate-600">
            {service.toothFdi === "full-mouth" ? "Full" : `T${service.toothFdi}`}
          </span>
        </td>
        <td className="px-[8px] py-[9px] font-sans text-[12px] text-tp-slate-500">
          {service.completedAt ?? "—"}
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
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => openDrawer({ type: "bill-preview", planId: plan.id, serviceId: service.id })}>
                <Receipt1 size={16} variant="Linear" className="mr-2" />
                View Bill Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDrawer({ type: "rx-preview", planId: plan.id, serviceId: service.id })}>
                <DocumentText size={16} variant="Linear" className="mr-2" />
                View / Print RX
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRevertOpen(true)}>
                <ArrowRotateLeft size={16} variant="Linear" className="mr-2 text-tp-warning-600" />
                <span className="text-tp-warning-600">Revert to In Progress</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </tr>

      <AlertDialog open={revertOpen} onOpenChange={setRevertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revert to In Progress</AlertDialogTitle>
            <AlertDialogDescription>
              Revert <strong>{service.treatment}</strong> ({service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi}`}) back to in-progress status?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                dispatch({ type: "REVERT_SERVICE_TO_PROGRESS", serviceId: service.id })
                setRevertOpen(false)
              }}
              className="bg-tp-warning-600 text-white hover:bg-tp-warning-700"
            >
              Revert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

// ─── Plan Cluster Card ─────────────────────────────────────

function CompletedPlanCluster({ plan, index }: { plan: TreatmentPlan; index: number }) {
  const { dispatch, openDrawer } = usePlanContext()
  const [revertPlanOpen, setRevertPlanOpen] = useState(false)

  const total = computePlanTotal(plan.services)
  const discount = computePlanDiscount(plan.services)

  return (
    <div className="rounded-[14px] bg-white overflow-hidden">
      {/* Plan sub-card header — number badge instead of icon */}
      <div className="flex items-center justify-between px-[14px] py-[10px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-tp-success-50 shrink-0">
            <span className="font-sans text-[14px] font-bold text-tp-success-600">{index + 1}</span>
          </div>
          <div className="flex-1 min-w-0 flex flex-wrap items-center gap-[12px]">
            <h4 className="font-sans text-[16px] font-bold text-tp-slate-900 shrink-0">{plan.name}</h4>
            <div className="flex flex-wrap items-center gap-[6px] font-sans text-[13px] font-medium text-tp-slate-500">
              <span className="text-tp-success-600 font-semibold">{formatINR(total)}</span>
              <span className="text-tp-slate-300">•</span>
              <span>{plan.services.length} service{plan.services.length !== 1 ? "s" : ""}</span>
              {discount > 0 && (
                <>
                  <span className="text-tp-slate-300">•</span>
                  <span>Discount: -{formatINR(discount)}</span>
                </>
              )}
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
            <DropdownMenuContent align="end" className="w-[220px]">
              <DropdownMenuItem onClick={() => openDrawer({ type: "bill-preview", planId: plan.id })}>
                <Receipt1 size={16} variant="Linear" className="mr-2" />
                View Plan Bill
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDrawer({ type: "rx-preview", planId: plan.id })}>
                <Printer size={16} variant="Linear" className="mr-2" />
                Print Plan RX
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRevertPlanOpen(true)}>
                <ArrowRotateLeft size={16} variant="Linear" className="mr-2 text-tp-warning-600" />
                <span className="text-tp-warning-600">Revert to In Progress</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Services table — padded, rounded, with stroke */}
      <div className="px-[10px] pb-[10px]">
        <div className="rounded-[8px] border border-tp-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-tp-slate-50/60">
                <th className="px-[14px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[36px]">#</th>
                <th className="px-[8px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400">Service</th>
                <th className="px-[8px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[70px]">Tooth</th>
                <th className="px-[8px] py-[7px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[90px]">Completed</th>
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
            <AlertDialogTitle>Revert Plan to In Progress</AlertDialogTitle>
            <AlertDialogDescription>
              This will revert <strong>{plan.name}</strong> and all its services back to in-progress status.
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
          <div className="flex items-center justify-between px-[16px] py-[14px] border-b border-tp-slate-100">
            <div className="flex items-center gap-[12px]">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-success-50">
                <ClipboardTickIcon size={24} className="text-tp-success-600" />
              </div>
              <h3 className="font-sans text-[18px] font-bold text-tp-slate-900">Completed</h3>
            </div>
          </div>
          {/* Empty state inside cluster */}
          <div className="p-[12px] rounded-b-[16px]" style={{ background: "#EEEEF6" }}>
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
      <div className="rounded-[16px] bg-white" style={{ border: "1.5px solid #FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* Cluster header — clipboard-tick icon, green */}
        <div className="flex items-center justify-between px-[16px] py-[14px] border-b border-tp-slate-100">
          <div className="flex items-center gap-[12px]">
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-success-50">
              <ClipboardTickIcon size={24} className="text-tp-success-600" />
            </div>
            <div>
              <h3 className="font-sans text-[18px] font-bold text-tp-slate-900">
                Completed
              </h3>
              <p className="font-sans text-[13px] text-tp-slate-500 mt-[2px]">
                {completedPlans.length} plan{completedPlans.length !== 1 ? "s" : ""} · Total <span className="font-semibold text-tp-slate-700">{formatINR(grandTotal)}</span>
              </p>
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
            <DropdownMenuContent align="end" className="w-[220px]">
              <DropdownMenuItem onClick={() => window.print()}>
                <Printer size={16} variant="Linear" className="mr-2" />
                Print All Completed
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Receipt1 size={16} variant="Linear" className="mr-2" />
                Export Billing Summary
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Plan sub-cards */}
        <div className="p-[12px] space-y-[8px] rounded-b-[16px]" style={{ background: "#EEEEF6" }}>
          {completedPlans.map((plan, idx) => (
            <CompletedPlanCluster key={plan.id} plan={plan} index={idx} />
          ))}
        </div>
      </div>
    </SectionFrame>
  )
}
