"use client"

/**
 * InProgressTab — Cluster card layout for in-progress plans.
 * Outer shell: rounded-[16px], bg-white, NO stroke.
 * Inner sub-cards: 0.5px neutral stroke.
 * Mark as Done = in three-dot dropdown only (per service).
 * Mark All Done = green primary CTA at plan cluster level.
 * Orange/warning icon for in-progress state.
 * Number counting badges on inner cards.
 * Three-dot: plain icon, no grey bg.
 * Font sizes: 14px base, 12px min.
 */

import { useState } from "react"
import { TickCircle, ArrowRotateLeft, Calendar2, Printer, Receipt1, DocumentText, Add, Timer1 } from "iconsax-reactjs"
import { MoreVertical } from "lucide-react"
import { TPTimeline } from "@/components/tp-ui/tp-timeline"
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
import type { PlanService, SurfaceId, TreatmentPlan } from "./plan-types"

// ─── Service Sub-Card ──────────────────────────────────────

function ServiceSubCard({ service, plan, index }: { service: PlanService; plan: TreatmentPlan; index: number }) {
  const { dispatch, openDrawer } = usePlanContext()
  const [markDoneOpen, setMarkDoneOpen] = useState(false)
  const [revertOpen, setRevertOpen] = useState(false)

  const handleMarkDone = () => {
    dispatch({ type: "MARK_SERVICE_COMPLETED", serviceId: service.id })
    setMarkDoneOpen(false)
  }

  const handleRevert = () => {
    dispatch({ type: "REVERT_SERVICE_TO_PROGRESS", serviceId: service.id })
    setRevertOpen(false)
  }

  const sittingItems = service.sittings.map((s) => ({
    title: `${s.doctor}`,
    description: s.notes,
    timestamp: s.date,
    color: "blue" as const,
  }))

  const procedureItems = service.procedures.map((p) => ({
    title: p.name,
    description: `${p.doctor}`,
    timestamp: p.date,
    color: "violet" as const,
  }))

  return (
    <div className="overflow-hidden rounded-[16px] border border-tp-slate-100 bg-white shadow-[0_12px_24px_-18px_rgba(15,23,42,0.2)]">
      {/* Service header */}
      <div className="flex items-center gap-[10px] border-b border-tp-slate-100 bg-[linear-gradient(180deg,rgba(245,158,11,0.08),rgba(245,158,11,0))] px-[14px] py-[12px]">
        {/* Number counting badge */}
        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-tp-warning-50 shrink-0">
          <span className="font-sans text-[14px] font-bold text-tp-warning-600">{index + 1}</span>
        </div>

        <div className="flex-1 min-w-0 flex flex-wrap items-center gap-[12px]">
          <p className="font-sans text-[16px] font-bold text-tp-slate-900 shrink-0">
            {service.treatment}
          </p>
          <div className="flex flex-wrap items-center gap-[6px] font-sans text-[13px] font-medium text-tp-slate-500">
            {service.toothFdi !== "full-mouth" && (
              <span className="font-bold text-tp-slate-600">T{service.toothFdi}</span>
            )}
            {service.toothFdi !== "full-mouth" && <span className="text-tp-slate-300 mx-1">•</span>}
            <span className="text-tp-warning-600 font-semibold">{formatINR(service.amount)}</span>
            {service.startedAt && (
              <>
                <span className="text-tp-slate-300 mx-1">•</span>
                <span>Started {service.startedAt}</span>
              </>
            )}
          </div>
          {service.surfaces.length > 0 && (
             <div className="flex flex-wrap items-center gap-[4px] ml-2">
               {service.surfaces.map((surface) => (
                 <span
                   key={surface}
                   className="inline-flex h-[18px] items-center rounded-[4px] px-[5px] font-sans text-[11px] font-bold text-white"
                   style={{ background: SURFACE_COLORS[surface as SurfaceId] }}
                 >
                   {SURFACE_ABBR[surface as SurfaceId]}
                 </span>
               ))}
             </div>
          )}
        </div>

        <div className="flex items-center gap-[5px] shrink-0">
          {/* Three-dot — Mark as Done is inside dropdown only */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] hover:bg-tp-slate-100 transition-colors"
              >
                <MoreVertical size={20} color="var(--tp-slate-500)" strokeWidth={2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px]">
              <DropdownMenuItem onClick={() => openDrawer({ type: "add-sitting", serviceId: service.id })}>
                <Add size={16} variant="Linear" className="mr-2" />
                Add Sitting
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDrawer({ type: "add-procedure", serviceId: service.id })}>
                <DocumentText size={16} variant="Linear" className="mr-2" />
                Add Sub-procedure
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDrawer({ type: "book-appointment", planId: plan.id, serviceId: service.id })}>
                <Calendar2 size={16} variant="Linear" className="mr-2" />
                Book Appointment
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDrawer({ type: "bill-preview", planId: plan.id, serviceId: service.id })}>
                <Receipt1 size={16} variant="Linear" className="mr-2" />
                View Bill Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.print()}>
                <Printer size={16} variant="Linear" className="mr-2" />
                Print Service Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setMarkDoneOpen(true)}>
                <TickCircle size={16} variant="Linear" className="mr-2 text-tp-success-600" />
                <span className="text-tp-success-600 font-semibold">Mark as Done</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRevertOpen(true)}>
                <ArrowRotateLeft size={16} variant="Linear" className="mr-2 text-tp-warning-600" />
                <span className="text-tp-warning-600">Revert to Plan</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Sittings */}
      <div className="border-t border-tp-slate-100 px-[14px] py-[12px]">
        <p className="font-sans text-[12px] font-semibold text-tp-slate-400 mb-[6px]">
          Sittings: {service.sittings.length}
        </p>
        {service.sittings.length > 0 ? (
          <TPTimeline items={sittingItems} />
        ) : (
          <p className="font-sans text-[12px] text-tp-slate-400 italic">No sittings recorded yet</p>
        )}
      </div>

      {/* Sub-procedures */}
      {service.procedures.length > 0 && (
        <div className="border-t border-tp-slate-100 px-[14px] py-[12px]">
          <p className="font-sans text-[12px] font-semibold text-tp-slate-400 mb-[6px]">
            Procedures
          </p>
          <TPTimeline items={procedureItems} />
        </div>
      )}

      {/* Dialogs */}
      <AlertDialog open={markDoneOpen} onOpenChange={setMarkDoneOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Completed</AlertDialogTitle>
            <AlertDialogDescription>
              Mark <strong>{service.treatment}</strong> ({service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi}`}) as completed?
              {plan.services.filter((s) => s.status === "in-progress").length === 1 && (
                <> This is the last in-progress service — the plan will also be marked as completed.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleMarkDone} className="bg-tp-success-600 text-white hover:bg-tp-success-700">
              Mark Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={revertOpen} onOpenChange={setRevertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revert to Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Revert <strong>{service.treatment}</strong> back to planned status? Sittings and procedures will be cleared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevert} className="bg-tp-warning-600 text-white hover:bg-tp-warning-700">
              Revert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// ─── Plan Cluster Card ─────────────────────────────────────

function PlanClusterCard({ plan }: { plan: TreatmentPlan }) {
  const { dispatch, openDrawer } = usePlanContext()
  const [markAllOpen, setMarkAllOpen] = useState(false)
  const [revertAllOpen, setRevertAllOpen] = useState(false)

  const inProgressServices = plan.services.filter((s) => s.status === "in-progress")
  const total = computePlanTotal(plan.services)

  return (
    <div className="rounded-[18px] bg-white" style={{ border: "1.5px solid #FFFFFF", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}>
      {/* Cluster header — orange/warning icon */}
      <div className="flex items-center justify-between px-[16px] py-[14px] border-b border-tp-slate-100 bg-[linear-gradient(180deg,rgba(245,158,11,0.08),rgba(245,158,11,0))]">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-tp-warning-50">
            <Timer1 size={22} variant="Bulk" className="text-tp-warning-600" />
          </div>
          <div>
            <h4 className="font-sans text-[18px] font-bold text-tp-slate-900">{plan.name}</h4>
            <div className="flex flex-wrap items-center gap-[6px] font-sans text-[13px] font-medium text-tp-slate-500 mt-[2px]">
              <span className="text-tp-warning-600 font-semibold">{inProgressServices.length} in progress</span>
              <span className="text-tp-slate-300">•</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[6px]">
          {/* Mark All Done — green primary CTA at plan level */}
          <button
            type="button"
            onClick={() => setMarkAllOpen(true)}
            className="inline-flex items-center justify-center gap-[6px] rounded-[12px] px-[16px] h-[42px] min-w-[120px] font-sans text-[14px] font-semibold text-white bg-tp-success-600 hover:bg-tp-success-700 transition-colors shadow-sm"
          >
            <TickCircle size={20} variant="Linear" />
            Mark All Done
          </button>

          {/* Three-dot — plain, no bg */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] hover:bg-tp-slate-100 transition-colors"
              >
                <MoreVertical size={20} color="var(--tp-slate-500)" strokeWidth={2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px]">
              <DropdownMenuItem onClick={() => openDrawer({ type: "bill-preview", planId: plan.id })}>
                <Receipt1 size={16} variant="Linear" className="mr-2" />
                View Plan Bill
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDrawer({ type: "book-appointment", planId: plan.id })}>
                <Calendar2 size={16} variant="Linear" className="mr-2" />
                Book Appointment
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.print()}>
                <Printer size={16} variant="Linear" className="mr-2" />
                Print All Services
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRevertAllOpen(true)}>
                <ArrowRotateLeft size={16} variant="Linear" className="mr-2 text-tp-warning-600" />
                <span className="text-tp-warning-600">Revert All to Plan</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Service sub-cards inside cluster */}
      <div className="p-[12px] space-y-[8px] rounded-b-[16px]" style={{ background: "#F3F4F8" }}>
        {inProgressServices.map((svc, idx) => (
          <ServiceSubCard key={svc.id} service={svc} plan={plan} index={idx} />
        ))}
      </div>

      {/* Dialogs */}
      <AlertDialog open={markAllOpen} onOpenChange={setMarkAllOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark All Services as Completed</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark all {inProgressServices.length} in-progress services in <strong>{plan.name}</strong> as completed. The plan will also be marked as completed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                dispatch({ type: "MARK_PLAN_COMPLETED", planId: plan.id })
                setMarkAllOpen(false)
              }}
              className="bg-tp-success-600 text-white hover:bg-tp-success-700"
            >
              Mark All Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={revertAllOpen} onOpenChange={setRevertAllOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revert Plan to Estimates</AlertDialogTitle>
            <AlertDialogDescription>
              This will revert <strong>{plan.name}</strong> back to estimates. All sittings and procedures will be cleared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                dispatch({ type: "REVERT_PLAN_TO_ESTIMATES", planId: plan.id })
                setRevertAllOpen(false)
              }}
              className="bg-tp-warning-600 text-white hover:bg-tp-warning-700"
            >
              Revert to Estimates
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// ─── Tab Content ────────────────────────────────────────────

export function InProgressTab() {
  const { inProgressPlans } = usePlanContext()

  if (inProgressPlans.length === 0) {
    return (
      <SectionFrame>
        <div className="rounded-[16px] bg-white" style={{ border: "1.5px solid #FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          {/* Cluster header — orange/warning icon */}
          <div className="flex items-center justify-between px-[16px] py-[14px] border-b border-tp-slate-100">
            <div className="flex items-center gap-[12px]">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-warning-50">
                <Timer1 size={24} variant="Bulk" className="text-tp-warning-600" />
              </div>
              <h3 className="font-sans text-[18px] font-bold text-tp-slate-900">In Progress</h3>
            </div>
          </div>
          {/* Empty state inside cluster */}
          <div className="p-[12px] rounded-b-[16px]" style={{ background: "#F3F4F8" }}>
            <EmptyState
              icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
              title="No treatments in progress"
              description="Start treatment from Plan Estimates to see services here."
            />
          </div>
        </div>
      </SectionFrame>
    )
  }

  return (
    <SectionFrame>
      <div className="space-y-[12px]">
        {inProgressPlans.map((plan) => (
          <PlanClusterCard key={plan.id} plan={plan} />
        ))}
      </div>
    </SectionFrame>
  )
}
