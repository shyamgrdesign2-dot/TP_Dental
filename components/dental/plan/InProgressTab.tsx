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
import { TickCircle, ArrowRotateLeft, Printer, Receipt1, Add, Timer1, Edit2, Trash, Calendar2, DocumentText } from "iconsax-reactjs"
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
  formatINR,
  computePlanTotal,
  getPlanCompletionStatus,
  getServiceWorkflowStatus,
} from "./plan-shared"
import type { PlanService, SurfaceId, TreatmentPlan } from "./plan-types"

const dropdownContentClass = "w-[220px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1"
const dropdownItemClass = "rounded-[8px] focus:bg-tp-slate-100 focus:text-tp-slate-700 data-[highlighted]:bg-tp-slate-100 data-[highlighted]:text-tp-slate-700"

function renderStatusChip(
  status: "not-started" | "in-progress" | "completed" | "no-show" | "not-interested",
  size: "sm" | "md" = "sm",
) {
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
          : "Get Started"
  return (
    <span
      className={`inline-flex items-center rounded-[6px] px-[8px] py-[2px] font-sans font-semibold ${size === "md" ? "text-[12px]" : "text-[11px]"} ${cls}`}
    >
      {label}
    </span>
  )
}

function getStatusSelectClasses(status: "not-started" | "in-progress" | "completed" | "no-show" | "not-interested"): string {
  if (status === "completed") return "bg-tp-success-50 text-tp-success-700"
  if (status === "in-progress") return "bg-tp-warning-50 text-tp-warning-700"
  if (status === "no-show") return "bg-tp-violet-50 text-tp-violet-700"
  if (status === "not-interested") return "bg-tp-error-50 text-tp-error-700"
  return "bg-tp-slate-100 text-tp-slate-600"
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
  return (
    <span className={`inline-flex items-center rounded-[6px] px-[8px] py-[2px] font-sans text-[12px] font-semibold ${cls}`}>
      {label}
    </span>
  )
}

function formatSurfaceLabel(surface: SurfaceId): string {
  return surface.charAt(0).toUpperCase() + surface.slice(1)
}

function buildServiceDescription(service: PlanService): string {
  const toothLabel = service.toothFdi === "full-mouth" ? "the full mouth" : service.toothLabel
  if (service.surfaces.length === 0) {
    return `Planned for ${toothLabel}.`
  }
  const surfaceText = service.surfaces.map((surface) => formatSurfaceLabel(surface)).join(", ")
  return `Planned for ${toothLabel} on ${surfaceText} surface${service.surfaces.length > 1 ? "s" : ""}.`
}

// ─── Service Sub-Card ──────────────────────────────────────

function ServiceSubCard({ service, plan, index }: { service: PlanService; plan: TreatmentPlan; index: number }) {
  const { dispatch, openDrawer } = usePlanContext()
  const [markDoneOpen, setMarkDoneOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleMarkDone = () => {
    dispatch({ type: "MARK_SERVICE_COMPLETED", serviceId: service.id })
    setMarkDoneOpen(false)
  }

  const appointmentItems = service.appointments ?? []
  const toothText = service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi}`
  const serviceDescription = buildServiceDescription(service)
  const workflowStatus = getServiceWorkflowStatus(service)
  const statusSelectClasses = getStatusSelectClasses(workflowStatus)
  const isManualStatus = service.status === "no-show" || service.status === "not-interested"
  const hasActivity = appointmentItems.length > 0 || service.sittings.length > 0 || service.procedures.length > 0
  const autoLabel =
    workflowStatus === "completed"
      ? "Completed"
      : workflowStatus === "in-progress"
        ? "In Progress"
        : "Get Started"

  const handleServiceStatusChange = (next: "auto" | "no-show" | "not-interested") => {
    const mappedStatus =
      next === "auto"
        ? service.status === "completed"
          ? "completed"
          : hasActivity
            ? "in-progress"
            : "planned"
        : next
    dispatch({
      type: "UPDATE_SERVICE",
      serviceId: service.id,
      patch: {
        status: mappedStatus,
        completedAt: mappedStatus === "completed" ? service.completedAt ?? new Date().toISOString().slice(0, 10) : undefined,
      },
    })
  }

  return (
    <div className="overflow-hidden rounded-[16px] border border-tp-slate-100/70 bg-white shadow-[0_12px_24px_-18px_rgba(15,23,42,0.2)]">
      {/* Service header */}
      <div className="flex items-center gap-[10px] border-b border-tp-slate-100/70 bg-[linear-gradient(180deg,rgba(245,158,11,0.05),rgba(245,158,11,0))] px-[14px] py-[12px]">
        {/* Number counting badge */}
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-tp-warning-100 shrink-0">
          <span className="font-sans text-[16px] font-bold text-tp-warning-700">{index + 1}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-[8px]">
            <p className="font-sans text-[16px] font-bold text-tp-slate-900">
              {service.treatment}
            </p>
            <span className="font-sans text-[14px] font-medium text-tp-slate-500">
              ({toothText})
            </span>
          </div>
          <div className="mt-[4px] flex flex-wrap items-center gap-[6px]">
            <span className="inline-flex h-[24px] items-center rounded-[6px] bg-tp-slate-100 px-[8px] font-sans text-[12px] font-medium leading-none text-tp-slate-500">
              {formatINR(service.amount)}
            </span>
            <select
              value={isManualStatus ? service.status : "auto"}
              onChange={(e) => handleServiceStatusChange(e.target.value as "auto" | "no-show" | "not-interested")}
              className={`mt-[4px] h-[24px] rounded-[6px] border-0 px-0 font-sans text-[11px] font-semibold leading-none focus:outline-none focus:ring-1 focus:ring-tp-blue-500/30 ${statusSelectClasses}`}
            >
              <option value="auto">Auto ({autoLabel})</option>
              <option value="no-show">Patient No Show</option>
              <option value="not-interested">Not Interested</option>
            </select>
          </div>
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
            <DropdownMenuContent align="end" className={dropdownContentClass}>
              <DropdownMenuItem onClick={() => openDrawer({ type: "bill-preview", planId: plan.id, serviceId: service.id })} className={dropdownItemClass}>
                <Receipt1 size={16} variant="Linear" className="mr-2" />
                View Bill Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.print()} className={dropdownItemClass}>
                <Printer size={16} variant="Linear" className="mr-2" />
                Print Service Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setMarkDoneOpen(true)} className="rounded-[8px] focus:bg-tp-success-50 data-[highlighted]:bg-tp-success-50">
                <TickCircle size={16} variant="Linear" className="mr-2 text-tp-success-600" />
                <span className="text-tp-success-600 font-semibold">Mark as Done</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteOpen(true)} className="rounded-[8px] focus:bg-red-50 data-[highlighted]:bg-red-50">
                <Trash size={16} variant="Linear" className="mr-2 text-tp-error-600" />
                <span className="text-tp-error-600">Delete Service</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="px-[14px] py-[10px] space-y-[8px]">
        <div className="px-[2px]">
          <p className="font-sans text-[14px] text-tp-slate-600">{serviceDescription}</p>
        </div>

        <div className="rounded-[10px] bg-tp-slate-50 overflow-hidden">
          <div className="sticky top-0 z-[1] flex items-center justify-between bg-tp-slate-100 px-[10px] py-[8px]">
            <div className="inline-flex items-center gap-[6px]">
              <Calendar2 size={14} variant="Bulk" className="text-tp-slate-500" />
              <p className="font-sans text-[13px] font-semibold text-tp-slate-700">
                Appointments ({appointmentItems.length})
              </p>
            </div>
            <button
              type="button"
              onClick={() => openDrawer({ type: "book-appointment", planId: plan.id, serviceId: service.id })}
              className="inline-flex items-center gap-[4px] font-sans text-[11px] font-semibold text-tp-blue-600 hover:text-tp-blue-700 transition-colors"
            >
              <Add size={14} variant="Linear" />
              Add Appointment
            </button>
          </div>
          <div className="px-[10px] py-[10px]">
          {appointmentItems.length > 0 ? (
            <div className="space-y-[12px]">
              {appointmentItems.map((appt, idx) => (
                <div key={appt.id} className="relative pl-[18px]">
                  {idx !== appointmentItems.length - 1 && (
                    <span className="absolute left-[3px] top-[13px] h-[calc(100%-2px)] border-l border-dashed border-tp-slate-300/60" />
                  )}
                  <span className="absolute left-0 top-[5px] h-[8px] w-[8px] rounded-full bg-tp-slate-400" />
                  <div className="flex items-start justify-between gap-[8px]">
                    <div className="min-w-0">
                      <p className="font-sans text-[12px] font-semibold text-tp-slate-700 leading-[16px]">{appt.doctor}</p>
                      <p className="mt-[2px] font-sans text-[12px] text-tp-slate-500">
                        ({appt.date} | {appt.time}{appt.notes ? ` | ${appt.notes}` : ""})
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-[3px] shrink-0">
                      <button
                        type="button"
                        onClick={() => openDrawer({ type: "book-appointment", planId: plan.id, serviceId: service.id, appointmentId: appt.id })}
                        className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700"
                      >
                        <Edit2 size={13} variant="Linear" />
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "REMOVE_APPOINTMENT", serviceId: service.id, appointmentId: appt.id })}
                        className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-red-50 hover:text-tp-error-600"
                      >
                        <Trash size={13} variant="Linear" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-sans text-[12px] text-tp-slate-400 italic">No appointments booked yet</p>
          )}
          </div>
        </div>

        <div className="rounded-[10px] bg-tp-slate-50 overflow-hidden">
          <div className="sticky top-0 z-[1] flex items-center justify-between bg-tp-slate-100 px-[10px] py-[8px]">
            <div className="inline-flex items-center gap-[6px]">
              <Timer1 size={14} variant="Bulk" className="text-tp-slate-500" />
              <p className="font-sans text-[13px] font-semibold text-tp-slate-700">
                Sittings ({service.sittings.length})
              </p>
            </div>
            <button
              type="button"
              onClick={() => openDrawer({ type: "add-sitting", serviceId: service.id })}
              className="inline-flex items-center gap-[4px] font-sans text-[11px] font-semibold text-tp-blue-600 hover:text-tp-blue-700 transition-colors"
            >
              <Add size={14} variant="Linear" />
              Add Sitting
            </button>
          </div>
          <div className="px-[10px] py-[10px]">
          {service.sittings.length > 0 ? (
            <div className="space-y-[12px]">
              {service.sittings.map((s, idx) => (
                <div key={s.id} className="relative pl-[18px]">
                  {idx !== service.sittings.length - 1 && (
                    <span className="absolute left-[3px] top-[13px] h-[calc(100%-2px)] border-l border-dashed border-tp-slate-300/60" />
                  )}
                  <span className="absolute left-0 top-[5px] h-[8px] w-[8px] rounded-full bg-tp-slate-400" />
                  <div className="flex items-start justify-between gap-[8px]">
                    <div className="min-w-0">
                      <p className="font-sans text-[12px] font-semibold text-tp-slate-700 leading-[16px]">{s.doctor}</p>
                      <p className="mt-[2px] font-sans text-[12px] text-tp-slate-500">
                        ({s.date}{s.notes ? ` | ${s.notes}` : ""})
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-[3px] shrink-0">
                      <button
                        type="button"
                        onClick={() => openDrawer({ type: "edit-sitting", serviceId: service.id, sittingId: s.id })}
                        className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700"
                      >
                        <Edit2 size={13} variant="Linear" />
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "REMOVE_SITTING", serviceId: service.id, sittingId: s.id })}
                        className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-red-50 hover:text-tp-error-600"
                      >
                        <Trash size={13} variant="Linear" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-sans text-[12px] text-tp-slate-400 italic">No sittings recorded yet</p>
          )}
          </div>
        </div>

        <div className="rounded-[10px] bg-tp-slate-50 overflow-hidden">
          <div className="sticky top-0 z-[1] flex items-center justify-between bg-tp-slate-100 px-[10px] py-[8px]">
            <div className="inline-flex items-center gap-[6px]">
              <DocumentText size={14} variant="Bulk" className="text-tp-slate-500" />
              <p className="font-sans text-[13px] font-semibold text-tp-slate-700">
                Procedures ({service.procedures.length})
              </p>
            </div>
            <button
              type="button"
              onClick={() => openDrawer({ type: "add-procedure", serviceId: service.id })}
              className="inline-flex items-center gap-[4px] font-sans text-[11px] font-semibold text-tp-blue-600 hover:text-tp-blue-700 transition-colors"
            >
              <Add size={14} variant="Linear" />
              Add Procedure
            </button>
          </div>
          <div className="px-[10px] py-[10px]">
          {service.procedures.length > 0 ? (
            <div className="space-y-[12px]">
              {service.procedures.map((p, idx) => (
                <div key={p.id} className="relative pl-[18px]">
                  {idx !== service.procedures.length - 1 && (
                    <span className="absolute left-[3px] top-[13px] h-[calc(100%-2px)] border-l border-dashed border-tp-slate-300/60" />
                  )}
                  <span className="absolute left-0 top-[5px] h-[8px] w-[8px] rounded-full bg-tp-slate-400" />
                  <div className="flex items-start justify-between gap-[8px]">
                    <div className="min-w-0">
                      <div className="flex items-center gap-[6px]">
                        <p className="font-sans text-[12px] font-semibold text-tp-slate-700 leading-[16px]">{p.name}</p>
                        {renderStatusChip(p.status ?? workflowStatus)}
                      </div>
                      <p className="mt-[2px] font-sans text-[12px] text-tp-slate-500">
                        ({p.doctor} | {p.date}{p.notes ? ` | ${p.notes}` : ""})
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-[3px] shrink-0">
                      <button
                        type="button"
                        onClick={() => openDrawer({ type: "edit-procedure", serviceId: service.id, procedureId: p.id })}
                        className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700"
                      >
                        <Edit2 size={13} variant="Linear" />
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "REMOVE_SUB_PROCEDURE", serviceId: service.id, procedureId: p.id })}
                        className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-red-50 hover:text-tp-error-600"
                      >
                        <Trash size={13} variant="Linear" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-sans text-[12px] text-tp-slate-400 italic">No procedures recorded yet</p>
          )}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <AlertDialog open={markDoneOpen} onOpenChange={setMarkDoneOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Completed</AlertDialogTitle>
            <AlertDialogDescription>
              Mark <strong>{service.treatment}</strong> ({service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi}`}) as completed?
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

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Delete <strong>{service.treatment}</strong> from this plan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                dispatch({ type: "REMOVE_SERVICE", serviceId: service.id })
                setDeleteOpen(false)
              }}
              className="bg-tp-error-600 text-white hover:bg-tp-error-700"
            >
              Delete
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

  const services = plan.services
  const total = computePlanTotal(plan.services)
  return (
    <div className="rounded-[18px] overflow-hidden bg-white h-full min-h-0 flex flex-col" style={{ border: "1.5px solid #FFFFFF", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}>
      {/* Cluster header — orange/warning icon */}
      <div className="sticky top-0 z-[3] shrink-0 flex items-center justify-between px-[16px] py-[14px] border-b border-tp-slate-100/70 bg-white">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-tp-warning-100">
            <Timer1 size={22} variant="Bulk" className="text-tp-warning-600" />
          </div>
          <div>
            <h4 className="font-sans text-[18px] font-bold text-tp-slate-900">{plan.name}</h4>
            <div className="mt-[2px] flex items-center gap-[6px]">
              <span className="inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-sans text-[12px] font-medium text-tp-slate-500">
                {formatINR(total)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[6px]">
          {/* Mark All Done — green primary CTA at plan level */}
          <button
            type="button"
            onClick={() => setMarkAllOpen(true)}
            className="inline-flex items-center justify-center gap-[6px] rounded-[12px] px-[16px] h-[36px] min-w-[120px] font-sans text-[14px] font-semibold text-white bg-tp-success-600 hover:bg-tp-success-700 transition-colors shadow-sm"
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
            <DropdownMenuContent align="end" className={dropdownContentClass}>
              <DropdownMenuItem onClick={() => openDrawer({ type: "bill-preview", planId: plan.id })} className={dropdownItemClass}>
                <Receipt1 size={16} variant="Linear" className="mr-2" />
                View Plan Bill
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.print()} className={dropdownItemClass}>
                <Printer size={16} variant="Linear" className="mr-2" />
                Print All Services
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRevertAllOpen(true)} className="rounded-[8px] focus:bg-tp-warning-50 data-[highlighted]:bg-tp-warning-50">
                <ArrowRotateLeft size={16} variant="Linear" className="mr-2 text-tp-warning-600" />
                <span className="text-tp-warning-600">Revert All to Plan</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Service sub-cards inside cluster */}
      <div className="flex-1 min-h-0 overflow-y-auto p-[12px] space-y-[8px] rounded-b-[16px]" style={{ background: "#E7E8EE" }}>
        {services.map((svc, idx) => (
          <ServiceSubCard key={svc.id} service={svc} plan={plan} index={idx} />
        ))}
      </div>

      {/* Dialogs */}
      <AlertDialog open={markAllOpen} onOpenChange={setMarkAllOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark All Services as Completed</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark all {services.length} services in <strong>{plan.name}</strong> as completed and move this plan to Completed Plans.
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
  const activePlan = inProgressPlans[0]

  if (inProgressPlans.length === 0) {
    return (
      <SectionFrame>
        <div className="rounded-[16px] bg-white" style={{ border: "1.5px solid #FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          {/* Cluster header — orange/warning icon */}
          <div className="flex items-center justify-between px-[16px] py-[14px] border-b border-tp-slate-100/70">
            <div className="flex items-center gap-[12px]">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-warning-50">
                <Timer1 size={24} variant="Bulk" className="text-tp-warning-600" />
              </div>
              <h3 className="font-sans text-[18px] font-bold text-tp-slate-900">Active Plans</h3>
            </div>
          </div>
          {/* Empty state inside cluster */}
          <div className="p-[12px] rounded-b-[16px]" style={{ background: "#E7E8EE" }}>
            <EmptyState
              icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
              title="No active plans yet"
              description="Activate a plan from Plan Estimates to see services here."
            />
          </div>
        </div>
      </SectionFrame>
    )
  }

  return (
    <SectionFrame>
      <div className="h-full min-h-0">
        {activePlan && <PlanClusterCard key={activePlan.id} plan={activePlan} />}
      </div>
    </SectionFrame>
  )
}
