"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * CompletedTab — Cluster card layout for completed plans.
 * Each plan is an accordion — first open by default, one at a time.
 */
import { useState } from "react";
import { ArrowRotateLeft, Receipt1, Printer, DocumentText } from "iconsax-reactjs";
import { ChevronDown, MoreVertical } from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TPConfirmDialog } from "@/components/ui/tp-confirm-dialog";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlanContext } from "./plan-context";
import {
    SectionFrame, EmptyState, PlanEmptyIcon, ClipboardTickIcon, formatINR, computePlanTotal,
    getPlanCompletionStatus, getServiceWorkflowStatus,
} from "./plan-shared";
import dui from "../dental-ui.module.scss";

const dropdownContentClass = "w-[220px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1";
const dropdownItemClass = "rounded-[8px] focus:bg-tp-slate-100 focus:text-tp-slate-700 data-[highlighted]:bg-tp-slate-100 data-[highlighted]:text-tp-slate-700";

function renderStatusChip(status) {
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
        className: `inline-flex items-center rounded-[6px] px-[8px] py-[2px] font-['Inter',sans-serif] text-[10px] font-semibold ${cls}`,
        children: label,
    });
}

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
        className: `inline-flex items-center rounded-[6px] px-[8px] py-[2px] font-['Inter',sans-serif] text-[12px] font-semibold ${cls}`,
        children: label,
    });
}

function formatSurfaceLabel(surface) {
    return surface.charAt(0).toUpperCase() + surface.slice(1);
}

function buildServiceDescription(service) {
    const toothLabel = service.toothFdi === "full-mouth" ? "the full mouth" : service.toothLabel;
    if (service.surfaces.length === 0) {
        return `Completed for ${toothLabel}.`;
    }
    const surfaceText = service.surfaces.map((surface) => formatSurfaceLabel(surface)).join(", ");
    return `Completed for ${toothLabel} on ${surfaceText} surface${service.surfaces.length > 1 ? "s" : ""}.`;
}

// ─── Service row ───────────────────────────────────────────
function CompletedServiceRow({ service, plan, index }) {
    const { openDrawer } = usePlanContext();
    const serviceDescription = buildServiceDescription(service);
    const workflowStatus = getServiceWorkflowStatus(service);
    return _jsxs("tr", {
        className: "border-t border-tp-slate-100/70 hover:bg-tp-slate-50/50 transition-colors",
        children: [
            _jsx("td", { className: "px-[14px] py-[9px] font-['Inter',sans-serif] text-[12px] text-tp-slate-400", children: index + 1 }),
            _jsx("td", {
                className: "px-[8px] py-[9px]",
                children: _jsxs("div", {
                    className: "space-y-[2px]",
                    children: [
                        _jsx("p", { className: "font-['Inter',sans-serif] text-[14px] font-medium text-tp-slate-800", children: service.treatment }),
                        _jsx("p", { className: "font-['Inter',sans-serif] text-[10px] text-tp-slate-400", children: serviceDescription }),
                    ],
                }),
            }),
            _jsx("td", {
                className: "px-[8px] py-[9px]",
                children: _jsx("span", {
                    className: "inline-flex items-center rounded-[4px] bg-tp-slate-100 px-[5px] py-[1px] font-['Inter',sans-serif] text-[12px] font-bold text-tp-slate-600",
                    children: service.toothFdi === "full-mouth" ? "Full" : `T${service.toothFdi}`,
                }),
            }),
            _jsx("td", { className: "px-[8px] py-[9px] font-['Inter',sans-serif] text-[12px] text-tp-slate-500", children: service.completedAt ?? "—" }),
            _jsx("td", { className: "px-[8px] py-[9px]", children: renderStatusChip(workflowStatus) }),
            _jsx("td", { className: "px-[14px] py-[9px] text-right font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-800", children: formatINR(service.amount) }),
            _jsx("td", {
                className: "px-[8px] py-[9px] text-right",
                children: _jsxs(DropdownMenu, {
                    children: [
                        _jsx(DropdownMenuTrigger, {
                            asChild: true,
                            children: _jsx("button", {
                                type: "button",
                                className: "flex h-[24px] w-[24px] items-center justify-center rounded-[6px] hover:bg-tp-slate-100 transition-colors",
                                children: _jsx(MoreVertical, { size: 20, color: "var(--tp-slate-500)", strokeWidth: 2 }),
                            }),
                        }),
                        _jsxs(DropdownMenuContent, {
                            align: "end",
                            className: "w-[200px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1",
                            children: [
                                _jsxs(DropdownMenuItem, {
                                    onClick: () => openDrawer({ type: "rx-preview", planId: plan.id, serviceId: service.id }),
                                    className: dropdownItemClass,
                                    children: [_jsx(DocumentText, { size: 16, variant: "Linear" }), "View Rx"],
                                }),
                                _jsxs(DropdownMenuItem, {
                                    onClick: () => openDrawer({ type: "bill-preview", planId: plan.id, serviceId: service.id }),
                                    className: dropdownItemClass,
                                    children: [_jsx(Receipt1, { size: 16, variant: "Linear" }), "View Plan Bill"],
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
function CompletedPlanCluster({ plan, index, isOpen, onToggle }) {
    const { dispatch, openDrawer } = usePlanContext();
    const [revertPlanOpen, setRevertPlanOpen] = useState(false);
    const total = computePlanTotal(plan.services);
    const additionalDiscount = plan.additionalDiscount ?? 0;
    const finalTotal = Math.max(0, total - additionalDiscount);
    const planStatus = getPlanCompletionStatus(plan.services);
    return _jsxs("div", {
        className: "overflow-hidden rounded-[14px] border border-tp-slate-100/70 bg-white",
        children: [
            _jsxs("div", {
                className: "sticky top-0 z-[2] shrink-0 flex items-center justify-between px-[14px] py-[10px] bg-[linear-gradient(180deg,rgba(34,197,94,0.05),rgba(34,197,94,0))] cursor-pointer",
                onClick: () => onToggle?.(),
                children: [
                    _jsxs("div", {
                        className: "flex items-center gap-[12px]",
                        children: [
                            _jsx("div", {
                                className: "flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-tp-success-50 shrink-0",
                                children: _jsx("span", {
                                    className: "font-['Inter',sans-serif] text-[16px] font-bold text-tp-success-700",
                                    children: index + 1,
                                }),
                            }),
                            _jsx("div", {
                                className: "flex-1 min-w-0 flex flex-wrap items-center gap-[12px]",
                                children: _jsxs("div", {
                                    children: [
                                        _jsx("h4", { className: "font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-900 shrink-0", children: plan.name }),
                                        _jsxs("div", {
                                            className: "mt-[2px] flex items-center gap-[6px] flex-wrap",
                                            children: [
                                                additionalDiscount > 0 && _jsx("span", {
                                                    className: "inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-400 line-through tabular-nums",
                                                    children: formatINR(total),
                                                }),
                                                additionalDiscount > 0 && _jsxs("span", {
                                                    className: "inline-flex items-center rounded-[6px] bg-tp-success-50 px-[8px] py-[2px] font-['Inter',sans-serif] text-[12px] font-semibold text-tp-success-700 tabular-nums",
                                                    children: ["\u2212 ", formatINR(additionalDiscount)],
                                                }),
                                                _jsx("span", {
                                                    className: "inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-700 tabular-nums",
                                                    children: formatINR(finalTotal),
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                        ],
                    }),
                    _jsxs("div", {
                        className: "flex items-center gap-[6px]",
                        children: [
                            _jsxs(DropdownMenu, {
                                children: [
                                    _jsx(DropdownMenuTrigger, {
                                        asChild: true,
                                        children: _jsx("button", {
                                            type: "button",
                                            onClick: (e) => e.stopPropagation(),
                                            className: "flex h-[26px] w-[26px] items-center justify-center rounded-[6px] hover:bg-tp-slate-100 transition-colors",
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
                                                children: [_jsx(Receipt1, { size: 16, variant: "Linear" }), "View Plan Bill"],
                                            }),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => setRevertPlanOpen(true),
                                                className: "rounded-[8px] !gap-[6px] focus:bg-tp-warning-50 data-[highlighted]:bg-tp-warning-50",
                                                children: [
                                                    _jsx(ArrowRotateLeft, { size: 16, variant: "Linear", className: "text-tp-warning-600" }),
                                                    _jsx("span", { className: "text-tp-warning-600", children: "Move to Active Plans" }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            _jsx("button", {
                                type: "button",
                                onClick: (e) => { e.stopPropagation(); onToggle?.(); },
                                "aria-label": isOpen ? "Collapse plan" : "Expand plan",
                                className: "flex h-[26px] w-[26px] items-center justify-center rounded-[6px] hover:bg-tp-slate-100 transition-colors",
                                children: _jsx("span", {
                                    className: `inline-flex transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
                                    children: _jsx(ChevronDown, { size: 18, color: "var(--tp-slate-700)", strokeWidth: 2.5 }),
                                }),
                            }),
                        ],
                    }),
                ],
            }),
            isOpen && _jsx("div", {
                className: "px-[10px] pb-[10px] pt-[8px]",
                children: _jsx("div", {
                    className: "rounded-[8px] border border-tp-slate-100/80 overflow-hidden",
                    children: _jsxs("table", {
                        className: "w-full",
                        children: [
                            _jsx("thead", {
                                children: _jsxs("tr", {
                                    className: "bg-tp-slate-50/60",
                                    children: [
                                        _jsx("th", { className: "px-[14px] py-[7px] text-left font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[36px]", children: "#" }),
                                        _jsx("th", { className: "px-[8px] py-[7px] text-left font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400", children: "Service" }),
                                        _jsx("th", { className: "px-[8px] py-[7px] text-left font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[70px]", children: "Tooth" }),
                                        _jsx("th", { className: "px-[8px] py-[7px] text-left font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[90px]", children: "Completed" }),
                                        _jsx("th", { className: "px-[8px] py-[7px] text-left font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[110px]", children: "Status" }),
                                        _jsx("th", { className: "px-[14px] py-[7px] text-right font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[80px]", children: "Amount" }),
                                        _jsx("th", { className: "px-[8px] py-[7px] w-[40px]" }),
                                    ],
                                }),
                            }),
                            _jsx("tbody", {
                                children: plan.services.map((svc, idx) => _jsx(CompletedServiceRow, {
                                    service: svc,
                                    plan: plan,
                                    index: idx,
                                }, svc.id)),
                            }),
                        ],
                    }),
                }),
            }),
            _jsx(TPConfirmDialog, {
                open: revertPlanOpen,
                onOpenChange: setRevertPlanOpen,
                title: "Move Plan to Active Plans",
                warning: `This moves ${plan.name} and all its services back to active status. Appointments and visits become editable again.`,
                secondaryLabel: "Cancel",
                primaryLabel: "Move to Active",
                primaryTone: "warning",
                onPrimary: () => {
                    dispatch({ type: "REVERT_PLAN_TO_PROGRESS", planId: plan.id });
                    setRevertPlanOpen(false);
                },
            }),
        ],
    });
}

// ─── Tab Content ────────────────────────────────────────────
export function CompletedTab() {
    const { completedPlans } = usePlanContext();
    const [openIndex, setOpenIndex] = useState(0);
    if (completedPlans.length === 0) {
        return _jsx(SectionFrame, {
            children: _jsxs("div", {
                className: `flex h-full min-h-0 flex-col overflow-hidden ${dui.planClusterShell}`,
                children: [
                    _jsx("div", {
                        className: `flex items-center justify-between px-[16px] py-[14px] ${dui.planClusterHeaderCompleted}`,
                        children: _jsxs("div", {
                            className: "flex items-center gap-[12px]",
                            children: [
                                _jsx("div", {
                                    className: "flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-success-50",
                                    children: _jsx(ClipboardTickIcon, { size: 24, className: "text-tp-success-600" }),
                                }),
                                _jsx("h3", { className: "font-['Inter',sans-serif] text-[16px] font-semibold text-tp-slate-900", children: "Completed Plans" }),
                            ],
                        }),
                    }),
                    _jsx("div", {
                        className: `flex flex-1 flex-col rounded-b-[16px] p-[12px] ${dui.planClusterInnerSurface}`,
                        children: _jsx(EmptyState, {
                            icon: _jsx(PlanEmptyIcon, { size: 120 }),
                            title: "No completed treatments",
                            description: "Treatments will appear here once they are marked as completed.",
                        }),
                    }),
                ],
            }),
        });
    }
    const grandTotal = completedPlans.reduce((sum, p) => sum + Math.max(0, computePlanTotal(p.services) - (p.additionalDiscount ?? 0)), 0);
    return _jsx(SectionFrame, {
        children: _jsxs("div", {
            className: `flex h-full min-h-0 flex-col overflow-hidden ${dui.planClusterShell}`,
            children: [
                _jsxs("div", {
                    className: `sticky top-0 z-[3] shrink-0 flex items-center justify-between px-[16px] py-[14px] ${dui.planClusterHeaderCompleted}`,
                    children: [
                        _jsxs("div", {
                            className: "flex items-center gap-[12px]",
                            children: [
                                _jsx("div", {
                                    className: "flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-success-50",
                                    children: _jsx(ClipboardTickIcon, { size: 24, className: "text-tp-success-600" }),
                                }),
                                _jsxs("div", {
                                    children: [
                                        _jsx("h3", { className: "font-['Inter',sans-serif] text-[16px] font-semibold text-tp-slate-900", children: "Completed Plans" }),
                                        _jsx("div", {
                                            className: "mt-[2px] inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-500",
                                            children: formatINR(grandTotal),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs(DropdownMenu, {
                            children: [
                                _jsx(DropdownMenuTrigger, {
                                    asChild: true,
                                    children: _jsx("button", {
                                        type: "button",
                                        className: "flex h-[32px] w-[32px] items-center justify-center rounded-[8px] hover:bg-tp-slate-100 transition-colors",
                                        children: _jsx(MoreVertical, { size: 20, color: "var(--tp-slate-500)", strokeWidth: 2 }),
                                    }),
                                }),
                                _jsxs(DropdownMenuContent, {
                                    align: "end",
                                    className: dropdownContentClass,
                                    children: [
                                        _jsxs(DropdownMenuItem, {
                                            onClick: () => window.print(),
                                            className: dropdownItemClass,
                                            children: [_jsx(Printer, { size: 16, variant: "Linear", className: "mr-2" }), "Print All Completed"],
                                        }),
                                        _jsxs(DropdownMenuItem, {
                                            className: dropdownItemClass,
                                            children: [_jsx(Receipt1, { size: 16, variant: "Linear", className: "mr-2" }), "Export Billing Summary"],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                _jsx("div", {
                    className: `flex min-h-0 flex-1 flex-col space-y-[8px] overflow-y-auto rounded-b-[16px] p-[12px] ${dui.planClusterInnerSurface}`,
                    children: completedPlans.map((plan, idx) => _jsx(CompletedPlanCluster, {
                        plan: plan,
                        index: idx,
                        isOpen: openIndex === idx,
                        onToggle: () => setOpenIndex((current) => current === idx ? -1 : idx),
                    }, plan.id)),
                }),
            ],
        }),
    });
}
