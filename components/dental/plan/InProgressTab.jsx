"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * InProgressTab — Cluster card layout for in-progress plans.
 * Outer shell: rounded-[16px], bg-white, NO stroke.
 * Inner sub-cards: 0.5px neutral stroke.
 * Each service sub-card is an accordion — first open by default, one at a time.
 * Status dropdown exposes all explicit states (Yet to start, In Progress,
 * Completed, No-Show, Not Interested, Cancelled).
 */
import { useState } from "react";
import {
    TickCircle, ArrowRotateLeft, Printer, Receipt1, Add, Timer1,
    Edit2, Trash, Calendar2, DocumentText, CloseCircle,
} from "iconsax-reactjs";
import { ChevronDown, MoreVertical } from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlanContext } from "./plan-context";
import {
    SectionFrame, EmptyState, formatINR, computePlanTotal, getServiceWorkflowStatus,
} from "./plan-shared";
import dui from "../dental-ui.module.scss";

const dropdownContentClass = "w-[220px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1";
const dropdownItemClass = "rounded-[8px] focus:bg-tp-slate-100 focus:text-tp-slate-700 data-[highlighted]:bg-tp-slate-100 data-[highlighted]:text-tp-slate-700";

function renderStatusChip(status, size = "sm") {
    const cls = status === "completed"
        ? "bg-tp-success-50 text-tp-success-700"
        : status === "in-progress"
            ? "bg-tp-warning-50 text-tp-warning-700"
            : status === "no-show"
                ? "bg-tp-violet-50 text-tp-violet-700"
                : status === "not-interested" || status === "cancelled"
                    ? "bg-tp-error-50 text-tp-error-700"
                    : "bg-tp-slate-100 text-tp-slate-500";
    const label = status === "completed"
        ? "Completed"
        : status === "in-progress"
            ? "In Progress"
            : status === "no-show"
                ? "No Show"
                : status === "not-interested"
                    ? "Not Interested"
                    : status === "cancelled"
                        ? "Cancelled"
                        : "Yet to Start";
    return _jsx("span", {
        className: `inline-flex items-center rounded-[6px] px-[8px] py-[2px] font-sans font-semibold ${size === "md" ? "text-[12px]" : "text-[11px]"} ${cls}`,
        children: label,
    });
}

function getStatusSelectClasses(status) {
    if (status === "completed") return "bg-tp-success-50 text-tp-success-700";
    if (status === "in-progress") return "bg-tp-warning-50 text-tp-warning-700";
    if (status === "no-show") return "bg-tp-violet-50 text-tp-violet-700";
    if (status === "not-interested") return "bg-tp-error-50 text-tp-error-700";
    if (status === "cancelled") return "bg-tp-error-50 text-tp-error-700";
    return "bg-tp-slate-100 text-tp-slate-600";
}

// Explicit status options shown in the treatment status dropdown.
// Order reflects typical flow. No "Auto" option — status is either
// derived from activity (sittings/procedures) or explicitly chosen.
const STATUS_OPTIONS = [
    { value: "not-started", label: "Yet to start" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "no-show", label: "Patient No-Show" },
    { value: "not-interested", label: "Not Interested" },
    { value: "cancelled", label: "Cancelled" },
];

function renderPlanCompletionChip(status) {
    const cls = status === "completed"
        ? "bg-tp-success-50 text-tp-success-700"
        : status === "partially-completed"
            ? "bg-tp-warning-50 text-tp-warning-700"
            : "bg-tp-slate-100 text-tp-slate-500";
    const label = status === "completed"
        ? "Completed"
        : status === "partially-completed"
            ? "Partially Completed"
            : "Not Completed";
    return _jsx("span", {
        className: `inline-flex items-center rounded-[6px] px-[8px] py-[2px] font-sans text-[12px] font-semibold ${cls}`,
        children: label,
    });
}

function formatSurfaceLabel(surface) {
    return surface.charAt(0).toUpperCase() + surface.slice(1);
}

function buildServiceDescription(service) {
    const toothLabel = service.toothFdi === "full-mouth" ? "the full mouth" : service.toothLabel;
    if (service.surfaces.length === 0) {
        return `Planned for ${toothLabel}.`;
    }
    const surfaceText = service.surfaces.map((surface) => formatSurfaceLabel(surface)).join(", ");
    return `Planned for ${toothLabel} on ${surfaceText} surface${service.surfaces.length > 1 ? "s" : ""}.`;
}

// ─── Service Sub-Card ──────────────────────────────────────
function ServiceSubCard({ service, plan, index, isOpen, onToggle }) {
    const { dispatch, openDrawer } = usePlanContext();
    const [markDoneOpen, setMarkDoneOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    // Appointment cancellation dialog state
    const [cancelTarget, setCancelTarget] = useState(null);
    const [cancelReason, setCancelReason] = useState("");
    const openCancelDialog = (appt) => {
        setCancelTarget(appt);
        setCancelReason(appt.cancellationReason ?? "");
    };
    const closeCancelDialog = () => {
        setCancelTarget(null);
        setCancelReason("");
    };
    const confirmCancelAppointment = () => {
        if (!cancelTarget) return;
        dispatch({
            type: "UPDATE_APPOINTMENT",
            serviceId: service.id,
            appointmentId: cancelTarget.id,
            patch: {
                status: "cancelled",
                cancellationReason: cancelReason.trim() || "No reason provided",
            },
        });
        closeCancelDialog();
    };
    const handleMarkDone = () => {
        dispatch({ type: "MARK_SERVICE_COMPLETED", serviceId: service.id });
        setMarkDoneOpen(false);
    };
    const appointmentItems = service.appointments ?? [];
    const toothText = service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi}`;
    const serviceDescription = buildServiceDescription(service);
    const planLineMeta = [
        service.procedureDate ? `Surgery date: ${service.procedureDate}` : null,
        service.notes,
    ].filter(Boolean).join(" \u00B7 ");
    const workflowStatus = getServiceWorkflowStatus(service);
    const statusSelectClasses = getStatusSelectClasses(workflowStatus);
    // Persisted-store status that we use as the dropdown value. If the
    // service has never been explicitly set, fall back to the derived
    // workflow status so the dropdown reflects reality.
    const dropdownValue = service.status === "planned" ? workflowStatus : service.status;
    const handleServiceStatusChange = (next) => {
        // "not-started" is synthetic — it maps back to the reducer's "planned".
        const mappedStatus = next === "not-started" ? "planned" : next;
        dispatch({
            type: "UPDATE_SERVICE",
            serviceId: service.id,
            patch: {
                status: mappedStatus,
                completedAt: mappedStatus === "completed"
                    ? service.completedAt ?? new Date().toISOString().slice(0, 10)
                    : undefined,
            },
        });
    };

    return _jsxs("div", {
        className: "overflow-hidden rounded-[16px] border border-tp-slate-100/70 bg-white shadow-[0_12px_24px_-18px_rgba(15,23,42,0.2)]",
        children: [
            _jsxs("div", {
                className: "flex items-center gap-[10px] border-b border-tp-slate-100/70 bg-[linear-gradient(180deg,rgba(245,158,11,0.05),rgba(245,158,11,0))] px-[14px] py-[12px] cursor-pointer",
                onClick: () => onToggle?.(),
                children: [
                    _jsx("div", {
                        className: "flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-tp-warning-100 shrink-0",
                        children: _jsx("span", {
                            className: "font-sans text-[16px] font-bold text-tp-warning-700",
                            children: index + 1,
                        }),
                    }),
                    _jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            _jsxs("div", {
                                className: "flex flex-wrap items-center gap-[8px]",
                                children: [
                                    _jsx("p", {
                                        className: "font-sans text-[16px] font-bold text-tp-slate-900",
                                        children: service.treatment,
                                    }),
                                    _jsxs("span", {
                                        className: "font-sans text-[14px] font-medium text-tp-slate-500",
                                        children: ["(", toothText, ")"],
                                    }),
                                ],
                            }),
                            _jsxs("div", {
                                className: "mt-[4px] flex flex-wrap items-center gap-[6px]",
                                children: [
                                    _jsx("span", {
                                        className: "inline-flex h-[24px] items-center rounded-[6px] bg-tp-slate-100 px-[8px] font-sans text-[12px] font-medium leading-none text-tp-slate-500",
                                        children: formatINR(service.amount),
                                    }),
                                    _jsx("select", {
                                        value: dropdownValue,
                                        onClick: (e) => e.stopPropagation(),
                                        onChange: (e) => handleServiceStatusChange(e.target.value),
                                        className: `h-[24px] rounded-[6px] border-0 px-[6px] font-sans text-[11px] font-semibold leading-none focus:outline-none focus:ring-1 focus:ring-tp-blue-500/30 ${statusSelectClasses}`,
                                        children: STATUS_OPTIONS.map((opt) => _jsx("option", { value: opt.value, children: opt.label }, opt.value)),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    _jsxs("div", {
                        className: "flex items-center gap-[5px] shrink-0",
                        children: [
                            _jsxs(DropdownMenu, {
                                children: [
                                    _jsx(DropdownMenuTrigger, {
                                        asChild: true,
                                        children: _jsx("button", {
                                            type: "button",
                                            onClick: (e) => e.stopPropagation(),
                                            className: "flex h-[28px] w-[28px] items-center justify-center rounded-[6px] hover:bg-tp-slate-100 transition-colors",
                                            children: _jsx(MoreVertical, { size: 20, color: "var(--tp-slate-500)", strokeWidth: 2 }),
                                        }),
                                    }),
                                    _jsxs(DropdownMenuContent, {
                                        align: "end",
                                        className: dropdownContentClass,
                                        children: [
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => openDrawer({ type: "bill-preview", planId: plan.id, serviceId: service.id }),
                                                className: dropdownItemClass,
                                                children: [_jsx(Receipt1, { size: 16, variant: "Linear", className: "mr-2" }), "View Bill Preview"],
                                            }),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => window.print(),
                                                className: dropdownItemClass,
                                                children: [_jsx(Printer, { size: 16, variant: "Linear", className: "mr-2" }), "Print Service Details"],
                                            }),
                                            _jsx(DropdownMenuSeparator, {}),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => setMarkDoneOpen(true),
                                                className: "rounded-[8px] focus:bg-tp-success-50 data-[highlighted]:bg-tp-success-50",
                                                children: [
                                                    _jsx(TickCircle, { size: 16, variant: "Linear", className: "mr-2 text-tp-success-600" }),
                                                    _jsx("span", { className: "text-tp-success-600 font-semibold", children: "Mark as Done" }),
                                                ],
                                            }),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => setDeleteOpen(true),
                                                className: "rounded-[8px] focus:bg-red-50 data-[highlighted]:bg-red-50",
                                                children: [
                                                    _jsx(Trash, { size: 16, variant: "Linear", className: "mr-2 text-tp-error-600" }),
                                                    _jsx("span", { className: "text-tp-error-600", children: "Delete Service" }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            _jsx("button", {
                                type: "button",
                                onClick: (e) => { e.stopPropagation(); onToggle?.(); },
                                "aria-label": isOpen ? "Collapse service" : "Expand service",
                                className: "flex h-[28px] w-[28px] items-center justify-center rounded-[6px] hover:bg-tp-slate-100 transition-colors",
                                children: _jsx("span", {
                                    className: `inline-flex transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
                                    children: _jsx(ChevronDown, { size: 18, color: "var(--tp-slate-700)", strokeWidth: 2.5 }),
                                }),
                            }),
                        ],
                    }),
                ],
            }),
            isOpen && _jsxs("div", {
                className: "px-[14px] py-[10px] space-y-[8px]",
                children: [
                    _jsxs("div", {
                        className: "px-[2px] space-y-[4px]",
                        children: [
                            _jsx("p", { className: "font-sans text-[14px] text-tp-slate-600", children: serviceDescription }),
                            planLineMeta && _jsx("p", { className: "font-sans text-[12px] text-tp-slate-500", children: planLineMeta }),
                        ],
                    }),
                    // ── Appointments block ─────────────────────
                    _jsxs("div", {
                        className: "rounded-[10px] bg-tp-slate-50 overflow-hidden",
                        children: [
                            _jsxs("div", {
                                className: "sticky top-0 z-[1] flex items-center justify-between bg-tp-slate-100 px-[10px] py-[8px]",
                                children: [
                                    _jsxs("div", {
                                        className: "inline-flex items-center gap-[6px]",
                                        children: [
                                            _jsx(Calendar2, { size: 14, variant: "Bulk", className: "text-tp-slate-500" }),
                                            _jsxs("p", { className: "font-sans text-[13px] font-semibold text-tp-slate-700", children: ["Appointments (", appointmentItems.length, ")"] }),
                                        ],
                                    }),
                                    _jsxs("button", {
                                        type: "button",
                                        onClick: () => openDrawer({ type: "book-appointment", planId: plan.id, serviceId: service.id }),
                                        className: "inline-flex items-center gap-[4px] font-sans text-[11px] font-semibold text-tp-blue-600 hover:text-tp-blue-700 transition-colors",
                                        children: [_jsx(Add, { size: 14, variant: "Linear" }), "Add Appointment"],
                                    }),
                                ],
                            }),
                            _jsx("div", {
                                className: "px-[10px] py-[10px]",
                                children: appointmentItems.length > 0
                                    ? _jsx("div", {
                                        className: "space-y-[12px]",
                                        children: appointmentItems.map((appt, idx) => {
                                            const isCancelled = appt.status === "cancelled";
                                            return _jsxs("div", {
                                                className: "relative pl-[18px]",
                                                children: [
                                                    idx !== appointmentItems.length - 1 && _jsx("span", { className: "absolute left-[3px] top-[13px] h-[calc(100%-2px)] border-l border-dashed border-tp-slate-300/60" }),
                                                    _jsx("span", { className: `absolute left-0 top-[5px] h-[8px] w-[8px] rounded-full ${isCancelled ? "bg-tp-error-400" : "bg-tp-slate-400"}` }),
                                                    _jsxs("div", {
                                                        className: "flex items-start justify-between gap-[8px]",
                                                        children: [
                                                            _jsxs("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    _jsxs("div", {
                                                                        className: "flex items-center gap-[6px] flex-wrap",
                                                                        children: [
                                                                            _jsx("p", {
                                                                                className: `font-sans text-[12px] font-semibold leading-[16px] ${isCancelled ? "text-tp-slate-400 line-through" : "text-tp-slate-700"}`,
                                                                                children: appt.doctor,
                                                                            }),
                                                                            isCancelled && _jsx("span", {
                                                                                className: "inline-flex items-center rounded-[4px] bg-tp-error-50 px-[6px] py-[1px] font-sans text-[10px] font-bold uppercase tracking-[0.3px] text-tp-error-600",
                                                                                children: "Cancelled",
                                                                            }),
                                                                        ],
                                                                    }),
                                                                    _jsxs("p", {
                                                                        className: `mt-[2px] font-sans text-[12px] ${isCancelled ? "text-tp-slate-400 line-through" : "text-tp-slate-500"}`,
                                                                        children: ["(", appt.date, " | ", appt.time, appt.notes ? ` | ${appt.notes}` : "", ")"],
                                                                    }),
                                                                    isCancelled && appt.cancellationReason && _jsxs("p", {
                                                                        className: "mt-[4px] font-sans text-[11px] text-tp-error-600",
                                                                        children: [_jsx("span", { className: "font-semibold", children: "Reason: " }), appt.cancellationReason],
                                                                    }),
                                                                ],
                                                            }),
                                                            _jsxs("div", {
                                                                className: "inline-flex items-center gap-[3px] shrink-0",
                                                                children: [
                                                                    !isCancelled && _jsx("button", {
                                                                        type: "button",
                                                                        title: "Reschedule",
                                                                        onClick: () => openDrawer({ type: "book-appointment", planId: plan.id, serviceId: service.id, appointmentId: appt.id }),
                                                                        className: "inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-tp-blue-50 hover:text-tp-blue-600",
                                                                        children: _jsx(Edit2, { size: 13, variant: "Linear" }),
                                                                    }),
                                                                    !isCancelled && _jsx("button", {
                                                                        type: "button",
                                                                        title: "Cancel appointment",
                                                                        onClick: () => openCancelDialog(appt),
                                                                        className: "inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-tp-warning-50 hover:text-tp-warning-600",
                                                                        children: _jsx(CloseCircle, { size: 13, variant: "Linear" }),
                                                                    }),
                                                                    _jsx("button", {
                                                                        type: "button",
                                                                        title: "Remove from history",
                                                                        onClick: () => dispatch({ type: "REMOVE_APPOINTMENT", serviceId: service.id, appointmentId: appt.id }),
                                                                        className: "inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-red-50 hover:text-tp-error-600",
                                                                        children: _jsx(Trash, { size: 13, variant: "Linear" }),
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }, appt.id);
                                        }),
                                    })
                                    : _jsx("p", { className: "font-sans text-[12px] text-tp-slate-400 italic", children: "No appointments booked yet" }),
                            }),
                        ],
                    }),
                    // ── Sittings block ─────────────────────────
                    _jsxs("div", {
                        className: "rounded-[10px] bg-tp-slate-50 overflow-hidden",
                        children: [
                            _jsxs("div", {
                                className: "sticky top-0 z-[1] flex items-center justify-between bg-tp-slate-100 px-[10px] py-[8px]",
                                children: [
                                    _jsxs("div", {
                                        className: "inline-flex items-center gap-[6px]",
                                        children: [
                                            _jsx(Timer1, { size: 14, variant: "Bulk", className: "text-tp-slate-500" }),
                                            _jsxs("p", { className: "font-sans text-[13px] font-semibold text-tp-slate-700", children: ["Sittings (", service.sittings.length, ")"] }),
                                        ],
                                    }),
                                    _jsxs("button", {
                                        type: "button",
                                        onClick: () => openDrawer({ type: "add-sitting", serviceId: service.id }),
                                        className: "inline-flex items-center gap-[4px] font-sans text-[11px] font-semibold text-tp-blue-600 hover:text-tp-blue-700 transition-colors",
                                        children: [_jsx(Add, { size: 14, variant: "Linear" }), "Add Sitting"],
                                    }),
                                ],
                            }),
                            _jsx("div", {
                                className: "px-[10px] py-[10px]",
                                children: service.sittings.length > 0
                                    ? _jsx("div", {
                                        className: "space-y-[12px]",
                                        children: service.sittings.map((s, idx) => _jsxs("div", {
                                            className: "relative pl-[18px]",
                                            children: [
                                                idx !== service.sittings.length - 1 && _jsx("span", { className: "absolute left-[3px] top-[13px] h-[calc(100%-2px)] border-l border-dashed border-tp-slate-300/60" }),
                                                _jsx("span", { className: "absolute left-0 top-[5px] h-[8px] w-[8px] rounded-full bg-tp-slate-400" }),
                                                _jsxs("div", {
                                                    className: "flex items-start justify-between gap-[8px]",
                                                    children: [
                                                        _jsxs("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                _jsx("p", { className: "font-sans text-[12px] font-semibold text-tp-slate-700 leading-[16px]", children: s.doctor }),
                                                                _jsxs("p", { className: "mt-[2px] font-sans text-[12px] text-tp-slate-500", children: ["(", s.date, s.notes ? ` | ${s.notes}` : "", ")"] }),
                                                            ],
                                                        }),
                                                        _jsxs("div", {
                                                            className: "inline-flex items-center gap-[3px] shrink-0",
                                                            children: [
                                                                _jsx("button", {
                                                                    type: "button",
                                                                    onClick: () => openDrawer({ type: "edit-sitting", serviceId: service.id, sittingId: s.id }),
                                                                    className: "inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700",
                                                                    children: _jsx(Edit2, { size: 13, variant: "Linear" }),
                                                                }),
                                                                _jsx("button", {
                                                                    type: "button",
                                                                    onClick: () => dispatch({ type: "REMOVE_SITTING", serviceId: service.id, sittingId: s.id }),
                                                                    className: "inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-red-50 hover:text-tp-error-600",
                                                                    children: _jsx(Trash, { size: 13, variant: "Linear" }),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }, s.id)),
                                    })
                                    : _jsx("p", { className: "font-sans text-[12px] text-tp-slate-400 italic", children: "No sittings recorded yet" }),
                            }),
                        ],
                    }),
                    // ── Procedures block ───────────────────────
                    _jsxs("div", {
                        className: "rounded-[10px] bg-tp-slate-50 overflow-hidden",
                        children: [
                            _jsxs("div", {
                                className: "sticky top-0 z-[1] flex items-center justify-between bg-tp-slate-100 px-[10px] py-[8px]",
                                children: [
                                    _jsxs("div", {
                                        className: "inline-flex items-center gap-[6px]",
                                        children: [
                                            _jsx(DocumentText, { size: 14, variant: "Bulk", className: "text-tp-slate-500" }),
                                            _jsxs("p", { className: "font-sans text-[13px] font-semibold text-tp-slate-700", children: ["Procedures (", service.procedures.length, ")"] }),
                                        ],
                                    }),
                                    _jsxs("button", {
                                        type: "button",
                                        onClick: () => openDrawer({ type: "add-procedure", serviceId: service.id }),
                                        className: "inline-flex items-center gap-[4px] font-sans text-[11px] font-semibold text-tp-blue-600 hover:text-tp-blue-700 transition-colors",
                                        children: [_jsx(Add, { size: 14, variant: "Linear" }), "Add Procedure"],
                                    }),
                                ],
                            }),
                            _jsx("div", {
                                className: "px-[10px] py-[10px]",
                                children: service.procedures.length > 0
                                    ? _jsx("div", {
                                        className: "space-y-[12px]",
                                        children: service.procedures.map((p, idx) => _jsxs("div", {
                                            className: "relative pl-[18px]",
                                            children: [
                                                idx !== service.procedures.length - 1 && _jsx("span", { className: "absolute left-[3px] top-[13px] h-[calc(100%-2px)] border-l border-dashed border-tp-slate-300/60" }),
                                                _jsx("span", { className: "absolute left-0 top-[5px] h-[8px] w-[8px] rounded-full bg-tp-slate-400" }),
                                                _jsxs("div", {
                                                    className: "flex items-start justify-between gap-[8px]",
                                                    children: [
                                                        _jsxs("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                _jsxs("div", {
                                                                    className: "flex items-center gap-[6px]",
                                                                    children: [
                                                                        _jsx("p", { className: "font-sans text-[12px] font-semibold text-tp-slate-700 leading-[16px]", children: p.name }),
                                                                        renderStatusChip(p.status ?? workflowStatus),
                                                                    ],
                                                                }),
                                                                _jsxs("p", { className: "mt-[2px] font-sans text-[12px] text-tp-slate-500", children: ["(", p.doctor, " | ", p.date, p.notes ? ` | ${p.notes}` : "", ")"] }),
                                                            ],
                                                        }),
                                                        _jsxs("div", {
                                                            className: "inline-flex items-center gap-[3px] shrink-0",
                                                            children: [
                                                                _jsx("button", {
                                                                    type: "button",
                                                                    onClick: () => openDrawer({ type: "edit-procedure", serviceId: service.id, procedureId: p.id }),
                                                                    className: "inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700",
                                                                    children: _jsx(Edit2, { size: 13, variant: "Linear" }),
                                                                }),
                                                                _jsx("button", {
                                                                    type: "button",
                                                                    onClick: () => dispatch({ type: "REMOVE_SUB_PROCEDURE", serviceId: service.id, procedureId: p.id }),
                                                                    className: "inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-tp-slate-500 hover:bg-red-50 hover:text-tp-error-600",
                                                                    children: _jsx(Trash, { size: 13, variant: "Linear" }),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }, p.id)),
                                    })
                                    : _jsx("p", { className: "font-sans text-[12px] text-tp-slate-400 italic", children: "No procedures recorded yet" }),
                            }),
                        ],
                    }),
                ],
            }),
            // ── Dialogs ────────────────────────────────────
            _jsx(AlertDialog, {
                open: markDoneOpen,
                onOpenChange: setMarkDoneOpen,
                children: _jsxs(AlertDialogContent, {
                    children: [
                        _jsxs(AlertDialogHeader, {
                            children: [
                                _jsx(AlertDialogTitle, { children: "Mark as Completed" }),
                                _jsxs(AlertDialogDescription, {
                                    children: [
                                        "Mark ",
                                        _jsx("strong", { children: service.treatment }),
                                        " (",
                                        service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi}`,
                                        ") as completed?",
                                    ],
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { children: "Cancel" }),
                                _jsx(AlertDialogAction, {
                                    onClick: handleMarkDone,
                                    className: "bg-tp-success-600 text-white hover:bg-tp-success-700",
                                    children: "Mark Done",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            _jsx(AlertDialog, {
                open: deleteOpen,
                onOpenChange: setDeleteOpen,
                children: _jsxs(AlertDialogContent, {
                    children: [
                        _jsxs(AlertDialogHeader, {
                            children: [
                                _jsx(AlertDialogTitle, { children: "Delete Service" }),
                                _jsxs(AlertDialogDescription, {
                                    children: ["Delete ", _jsx("strong", { children: service.treatment }), " from this plan?"],
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { children: "Cancel" }),
                                _jsx(AlertDialogAction, {
                                    onClick: () => {
                                        dispatch({ type: "REMOVE_SERVICE", serviceId: service.id });
                                        setDeleteOpen(false);
                                    },
                                    className: "bg-tp-error-600 text-white hover:bg-tp-error-700",
                                    children: "Delete",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            _jsx(AlertDialog, {
                open: !!cancelTarget,
                onOpenChange: (open) => { if (!open) closeCancelDialog(); },
                children: _jsxs(AlertDialogContent, {
                    children: [
                        _jsxs(AlertDialogHeader, {
                            children: [
                                _jsx(AlertDialogTitle, { children: "Cancel Appointment" }),
                                _jsxs(AlertDialogDescription, {
                                    children: [
                                        cancelTarget
                                            ? `Cancelling ${cancelTarget.doctor}'s appointment on ${cancelTarget.date} at ${cancelTarget.time}. Please record a reason for the cancellation so it stays visible in the visit history.`
                                            : "",
                                    ],
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            className: "px-[4px] pb-[4px]",
                            children: [
                                _jsx("label", {
                                    className: "block font-sans text-[12px] font-semibold text-tp-slate-600 mb-[6px]",
                                    children: "Reason for cancellation",
                                }),
                                _jsx("textarea", {
                                    value: cancelReason,
                                    onChange: (e) => setCancelReason(e.target.value),
                                    placeholder: "e.g. Patient requested to reschedule due to travel",
                                    rows: 3,
                                    className: "w-full rounded-[10px] border border-tp-slate-200 bg-white px-[14px] py-[10px] font-sans text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors resize-none",
                                }),
                                _jsxs("div", {
                                    className: "mt-[8px] flex flex-wrap gap-[6px]",
                                    children: ["Patient travel", "Doctor unavailable", "Patient no-show", "Rescheduled"].map((quick) => _jsx("button", {
                                        type: "button",
                                        onClick: () => setCancelReason(quick),
                                        className: "inline-flex h-[26px] items-center rounded-[8px] bg-tp-slate-100 px-[10px] font-sans text-[11px] font-medium text-tp-slate-600 hover:bg-tp-slate-200 transition-colors",
                                        children: quick,
                                    }, quick)),
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { onClick: closeCancelDialog, children: "Keep appointment" }),
                                _jsx(AlertDialogAction, {
                                    onClick: confirmCancelAppointment,
                                    className: "bg-tp-warning-600 text-white hover:bg-tp-warning-700",
                                    children: "Cancel appointment",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        ],
    });
}

// ─── Plan Cluster Card ─────────────────────────────────────
function PlanClusterCard({ plan }) {
    const { dispatch, openDrawer } = usePlanContext();
    const [markAllOpen, setMarkAllOpen] = useState(false);
    const [revertAllOpen, setRevertAllOpen] = useState(false);
    // Accordion — first service open by default, one at a time.
    const [openServiceIndex, setOpenServiceIndex] = useState(0);
    const services = plan.services;
    const total = computePlanTotal(plan.services);
    return _jsxs("div", {
        className: `flex h-full min-h-0 flex-col overflow-hidden ${dui.planClusterShell}`,
        children: [
            _jsxs("div", {
                className: `sticky top-0 z-[3] shrink-0 flex items-center justify-between px-[16px] py-[14px] ${dui.planClusterHeaderActive}`,
                children: [
                    _jsxs("div", {
                        className: "flex items-center gap-[12px]",
                        children: [
                            _jsx("div", {
                                className: "flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-tp-warning-100",
                                children: _jsx(Timer1, { size: 22, variant: "Bulk", className: "text-tp-warning-600" }),
                            }),
                            _jsxs("div", {
                                children: [
                                    _jsx("h4", { className: "font-sans text-[18px] font-bold text-tp-slate-900", children: plan.name }),
                                    _jsx("div", {
                                        className: "mt-[2px] flex items-center gap-[6px]",
                                        children: _jsx("span", {
                                            className: "inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-sans text-[12px] font-medium text-tp-slate-500",
                                            children: formatINR(total),
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    _jsxs("div", {
                        className: "flex items-center gap-[6px]",
                        children: [
                            _jsxs("button", {
                                type: "button",
                                onClick: () => setMarkAllOpen(true),
                                className: "inline-flex items-center justify-center gap-[6px] rounded-[12px] px-[16px] h-[36px] min-w-[120px] font-sans text-[14px] font-semibold text-white bg-tp-success-600 hover:bg-tp-success-700 transition-colors shadow-sm",
                                children: [_jsx(TickCircle, { size: 20, variant: "Linear" }), "Mark All Done"],
                            }),
                            _jsxs(DropdownMenu, {
                                children: [
                                    _jsx(DropdownMenuTrigger, {
                                        asChild: true,
                                        children: _jsx("button", {
                                            type: "button",
                                            className: "flex h-[28px] w-[28px] items-center justify-center rounded-[8px] hover:bg-tp-slate-100 transition-colors",
                                            children: _jsx(MoreVertical, { size: 20, color: "var(--tp-slate-500)", strokeWidth: 2 }),
                                        }),
                                    }),
                                    _jsxs(DropdownMenuContent, {
                                        align: "end",
                                        className: dropdownContentClass,
                                        children: [
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => openDrawer({ type: "bill-preview", planId: plan.id }),
                                                className: dropdownItemClass,
                                                children: [_jsx(Receipt1, { size: 16, variant: "Linear", className: "mr-2" }), "View Plan Bill"],
                                            }),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => window.print(),
                                                className: dropdownItemClass,
                                                children: [_jsx(Printer, { size: 16, variant: "Linear", className: "mr-2" }), "Print All Services"],
                                            }),
                                            _jsx(DropdownMenuSeparator, {}),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => setRevertAllOpen(true),
                                                className: "rounded-[8px] focus:bg-tp-warning-50 data-[highlighted]:bg-tp-warning-50",
                                                children: [
                                                    _jsx(ArrowRotateLeft, { size: 16, variant: "Linear", className: "mr-2 text-tp-warning-600" }),
                                                    _jsx("span", { className: "text-tp-warning-600", children: "Revert All to Plan" }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            _jsx("div", {
                className: `flex min-h-0 flex-1 flex-col space-y-[8px] overflow-y-auto rounded-b-[16px] p-[12px] ${dui.planClusterInnerSurface}`,
                children: services.map((svc, idx) => _jsx(ServiceSubCard, {
                    service: svc,
                    plan: plan,
                    index: idx,
                    isOpen: openServiceIndex === idx,
                    onToggle: () => setOpenServiceIndex((current) => current === idx ? -1 : idx),
                }, svc.id)),
            }),
            _jsx(AlertDialog, {
                open: markAllOpen,
                onOpenChange: setMarkAllOpen,
                children: _jsxs(AlertDialogContent, {
                    children: [
                        _jsxs(AlertDialogHeader, {
                            children: [
                                _jsx(AlertDialogTitle, { children: "Mark All Services as Completed" }),
                                _jsxs(AlertDialogDescription, {
                                    children: [
                                        "This will mark all ",
                                        services.length,
                                        " services in ",
                                        _jsx("strong", { children: plan.name }),
                                        " as completed and move this plan to Completed Plans.",
                                    ],
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { children: "Cancel" }),
                                _jsx(AlertDialogAction, {
                                    onClick: () => {
                                        dispatch({ type: "MARK_PLAN_COMPLETED", planId: plan.id });
                                        setMarkAllOpen(false);
                                    },
                                    className: "bg-tp-success-600 text-white hover:bg-tp-success-700",
                                    children: "Mark All Done",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            _jsx(AlertDialog, {
                open: revertAllOpen,
                onOpenChange: setRevertAllOpen,
                children: _jsxs(AlertDialogContent, {
                    children: [
                        _jsxs(AlertDialogHeader, {
                            children: [
                                _jsx(AlertDialogTitle, { children: "Revert Plan to Estimates" }),
                                _jsxs(AlertDialogDescription, {
                                    children: [
                                        "This will revert ",
                                        _jsx("strong", { children: plan.name }),
                                        " back to estimates. All sittings and procedures will be cleared.",
                                    ],
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { children: "Cancel" }),
                                _jsx(AlertDialogAction, {
                                    onClick: () => {
                                        dispatch({ type: "REVERT_PLAN_TO_ESTIMATES", planId: plan.id });
                                        setRevertAllOpen(false);
                                    },
                                    className: "bg-tp-warning-600 text-white hover:bg-tp-warning-700",
                                    children: "Revert to Estimates",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        ],
    });
}

// ─── Tab Content ────────────────────────────────────────────
export function InProgressTab() {
    const { inProgressPlans } = usePlanContext();
    const activePlan = inProgressPlans[0];
    if (inProgressPlans.length === 0) {
        return _jsx(SectionFrame, {
            children: _jsxs("div", {
                className: `flex h-full min-h-0 flex-col overflow-hidden ${dui.planClusterShell}`,
                children: [
                    _jsx("div", {
                        className: `flex items-center justify-between px-[16px] py-[14px] ${dui.planClusterHeaderActive}`,
                        children: _jsxs("div", {
                            className: "flex items-center gap-[12px]",
                            children: [
                                _jsx("div", {
                                    className: "flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-warning-50",
                                    children: _jsx(Timer1, { size: 24, variant: "Bulk", className: "text-tp-warning-600" }),
                                }),
                                _jsx("h3", { className: "font-sans text-[18px] font-bold text-tp-slate-900", children: "Active Plans" }),
                            ],
                        }),
                    }),
                    _jsx("div", {
                        className: `flex flex-1 flex-col rounded-b-[16px] p-[12px] ${dui.planClusterInnerSurface}`,
                        children: _jsx(EmptyState, {
                            icon: _jsxs("svg", {
                                width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true,
                                children: [
                                    _jsx("path", { d: "M12 8v4l3 3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
                                    _jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.5" }),
                                ],
                            }),
                            title: "No active plans yet",
                            description: "Activate a plan from Plan Estimates to see services here.",
                        }),
                    }),
                ],
            }),
        });
    }
    return _jsx(SectionFrame, {
        children: _jsx("div", {
            className: "h-full min-h-0",
            children: activePlan && _jsx(PlanClusterCard, { plan: activePlan }, activePlan.id),
        }),
    });
}
