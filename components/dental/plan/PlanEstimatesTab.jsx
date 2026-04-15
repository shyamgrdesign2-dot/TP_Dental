"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * PlanEstimatesTab — Cluster card layout.
 * Outer shell: rounded-[16px], bg-white, NO stroke.
 * Plan sub-cards: white bg with rounded-[12px], subtle 0.5px neutral stroke.
 * Each plan card is an accordion — first open by default, one at a time.
 */
import { useState } from "react";
import { Add, Printer, Copy, Trash, Edit2, Receipt1, DocumentText } from "iconsax-reactjs";
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
import { SectionFrame, EmptyState, formatINR, computePlanTotal, PlanSurfaceAbbrTags } from "./plan-shared";
import dui from "../dental-ui.module.scss";

const dropdownContentClass = "w-[220px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1";
const dropdownItemClass = "rounded-[8px] focus:bg-tp-slate-100 focus:text-tp-slate-700 data-[highlighted]:bg-tp-slate-100 data-[highlighted]:text-tp-slate-700";

// ─── Plan Sub-Card ────────────────────────────────────────────
function PlanSubCard({ plan, index, isOpen, onToggle }) {
    const { dispatch, openDrawer, hasInProgressPlan, navigateTab } = usePlanContext();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [startOpen, setStartOpen] = useState(false);
    const total = computePlanTotal(plan.services);
    const handleActivateClick = () => {
        if (hasInProgressPlan) {
            showSnackbar("An active plan already exists. Complete it before activating another.", "warning");
            return;
        }
        setStartOpen(true);
    };
    const handleActivate = () => {
        dispatch({ type: "START_TREATMENT", planId: plan.id });
        openDrawer({ type: "closed" });
        setStartOpen(false);
        showSnackbar(`"${plan.name}" is now active and moved to Active Plans`);
        setTimeout(() => navigateTab?.("progress"), 400);
    };
    const handleDuplicate = () => dispatch({ type: "DUPLICATE_PLAN", planId: plan.id });
    const handleDelete = () => {
        dispatch({ type: "DELETE_PLAN", planId: plan.id });
        setDeleteOpen(false);
    };
    const handleEdit = () => openDrawer({ type: "edit-plan", planId: plan.id });
    return _jsxs("div", {
        className: "overflow-hidden rounded-[16px] border border-tp-slate-100/70 bg-white shadow-[0_10px_24px_-18px_rgba(15,23,42,0.22)]",
        children: [
            _jsxs("div", {
                className: "sticky top-0 z-[2] shrink-0 flex items-center gap-[10px] border-b border-tp-slate-100/70 bg-[linear-gradient(180deg,rgba(75,74,213,0.06),rgba(75,74,213,0))] px-[14px] py-[14px] cursor-pointer",
                onClick: () => onToggle?.(),
                children: [
                    _jsx("div", {
                        className: "flex h-[42px] w-[42px] items-center justify-center rounded-[8px] bg-tp-blue-50 shrink-0",
                        children: _jsx("span", { className: "font-['Inter',sans-serif] text-[14px] font-bold text-tp-blue-600", children: index + 1 }),
                    }),
                    _jsxs("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            _jsx("p", { className: "font-['Inter',sans-serif] text-[16px] font-bold text-tp-slate-900 truncate", children: plan.name }),
                            _jsx("div", {
                                className: "mt-[2px] inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-500",
                                children: formatINR(total),
                            }),
                        ],
                    }),
                    _jsxs("div", {
                        className: "flex items-center gap-[6px] shrink-0",
                        children: [
                            _jsx("button", {
                                type: "button",
                                onClick: (e) => { e.stopPropagation(); handleActivateClick(); },
                                className: "inline-flex items-center justify-center h-[36px] min-w-[120px] rounded-[12px] px-[16px] font-['Inter',sans-serif] text-[14px] font-semibold text-tp-success-700 bg-transparent hover:bg-tp-success-50 transition-colors",
                                style: { border: "1.5px solid var(--tp-success-400)" },
                                children: "Activate Plan",
                            }),
                            _jsxs(DropdownMenu, {
                                children: [
                                    _jsx(DropdownMenuTrigger, {
                                        asChild: true,
                                        children: _jsx("button", {
                                            type: "button",
                                            onClick: (e) => e.stopPropagation(),
                                            className: "flex h-[30px] w-[30px] items-center justify-center rounded-[8px] hover:bg-tp-slate-100 transition-colors",
                                            children: _jsx(MoreVertical, { size: 20, color: "var(--tp-slate-500)", strokeWidth: 2 }),
                                        }),
                                    }),
                                    _jsxs(DropdownMenuContent, {
                                        align: "end",
                                        className: "w-[200px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1",
                                        children: [
                                            _jsxs(DropdownMenuItem, {
                                                onClick: handleEdit,
                                                className: dropdownItemClass,
                                                children: [_jsx(Edit2, { size: 16, variant: "Linear", className: "mr-2" }), "Edit Plan"],
                                            }),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => window.print(),
                                                className: dropdownItemClass,
                                                children: [_jsx(Printer, { size: 16, variant: "Linear", className: "mr-2" }), "Print Estimation"],
                                            }),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: handleDuplicate,
                                                className: dropdownItemClass,
                                                children: [_jsx(Copy, { size: 16, variant: "Linear", className: "mr-2" }), "Duplicate Plan"],
                                            }),
                                            _jsx(DropdownMenuSeparator, {}),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => setDeleteOpen(true),
                                                className: "text-tp-error-600 focus:bg-red-50 focus:text-tp-error-600 data-[highlighted]:bg-red-50 data-[highlighted]:text-tp-error-600 rounded-[8px]",
                                                children: [_jsx(Trash, { size: 20, variant: "Linear", className: "mr-2 text-tp-error-500" }), "Delete Plan"],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            _jsx("button", {
                                type: "button",
                                onClick: (e) => { e.stopPropagation(); onToggle?.(); },
                                "aria-label": isOpen ? "Collapse plan" : "Expand plan",
                                className: "flex h-[30px] w-[30px] items-center justify-center rounded-[8px] hover:bg-tp-slate-100 transition-colors",
                                children: _jsx("span", {
                                    className: `inline-flex transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
                                    children: _jsx(ChevronDown, { size: 18, color: "var(--tp-slate-700)", strokeWidth: 2.5 }),
                                }),
                            }),
                        ],
                    }),
                ],
            }),
            isOpen && plan.services.length > 0 && _jsx("div", {
                className: "px-[10px] pb-[10px] pt-[8px]",
                children: _jsx("div", {
                    className: "rounded-[12px] border border-tp-slate-100/80 overflow-hidden w-full overflow-x-auto min-w-0",
                    children: _jsxs("table", {
                        className: "w-full min-w-[780px]",
                        children: [
                            _jsx("thead", {
                                children: _jsxs("tr", {
                                    className: "bg-tp-slate-50/80",
                                    children: [
                                        _jsx("th", { className: "px-[14px] py-[7px] text-left font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[36px]", children: "#" }),
                                        _jsx("th", { className: "px-[8px] py-[7px] text-left font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400", children: "Service" }),
                                        _jsx("th", { className: "px-[8px] py-[7px] text-left font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[70px]", children: "Tooth" }),
                                        _jsx("th", { className: "px-[8px] py-[7px] text-left font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[70px]", children: "Surface" }),
                                        _jsx("th", { className: "px-[8px] py-[7px] text-right font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[80px]", children: "Rate" }),
                                        _jsx("th", { className: "px-[8px] py-[7px] text-right font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[60px]", children: "Disc." }),
                                        _jsx("th", { className: "px-[14px] py-[7px] text-right font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[80px]", children: "Amount" }),
                                    ],
                                }),
                            }),
                            _jsx("tbody", {
                                children: plan.services.map((svc, idx) => _jsxs("tr", {
                                    className: "border-t border-tp-slate-100/70 bg-white hover:bg-tp-slate-50/70 transition-colors",
                                    children: [
                                        _jsx("td", { className: "px-[14px] py-[9px] font-['Inter',sans-serif] text-[12px] text-tp-slate-400", children: idx + 1 }),
                                        _jsx("td", {
                                            className: "px-[8px] py-[9px]",
                                            children: _jsxs("div", {
                                                className: "space-y-[2px]",
                                                children: [
                                                    _jsx("p", { className: "font-['Inter',sans-serif] text-[14px] font-medium text-tp-slate-800", children: svc.treatment }),
                                                    _jsx("p", { className: "font-['Inter',sans-serif] text-[11px] text-tp-slate-400", children: svc.toothLabel }),
                                                ],
                                            }),
                                        }),
                                        _jsx("td", {
                                            className: "px-[8px] py-[9px]",
                                            children: _jsx("span", {
                                                className: "inline-flex items-center rounded-[4px] bg-tp-slate-100 px-[5px] py-[1px] font-['Inter',sans-serif] text-[12px] font-bold text-tp-slate-600",
                                                children: svc.toothFdi === "full-mouth" ? "Full" : `T${svc.toothFdi}`,
                                            }),
                                        }),
                                        _jsx("td", {
                                            className: "px-[8px] py-[9px]",
                                            children: svc.surfaces && svc.surfaces.length > 0
                                                ? _jsx(PlanSurfaceAbbrTags, { surfaces: svc.surfaces })
                                                : _jsx("span", { className: "font-['Inter',sans-serif] text-[12px] text-tp-slate-300", children: "\u2014" }),
                                        }),
                                        _jsx("td", { className: "px-[8px] py-[9px] text-right font-['Inter',sans-serif] text-[14px] text-tp-slate-600", children: formatINR(svc.rate) }),
                                        _jsx("td", {
                                            className: "px-[8px] py-[9px] text-right font-['Inter',sans-serif] text-[12px] text-tp-slate-400",
                                            children: svc.discount > 0 ? `-${formatINR(svc.discount)}` : "—",
                                        }),
                                        _jsx("td", { className: "px-[14px] py-[9px] text-right font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-800", children: formatINR(svc.amount) }),
                                    ],
                                }, svc.id)),
                            }),
                            _jsx("tfoot", {
                                children: _jsxs("tr", {
                                    className: "border-t border-tp-slate-100/80 bg-tp-slate-50/50",
                                    children: [
                                        _jsx("td", { colSpan: 6, className: "px-[14px] py-[9px] text-right font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-600", children: "Plan Total" }),
                                        _jsx("td", { className: "px-[14px] py-[9px] text-right font-['Inter',sans-serif] text-[14px] font-bold text-tp-slate-700", children: formatINR(total) }),
                                    ],
                                }),
                            }),
                        ],
                    }),
                }),
            }),
            isOpen && plan.services.length === 0 && _jsx("div", {
                className: "px-[14px] py-[16px] text-center",
                children: _jsx("p", { className: "font-['Inter',sans-serif] text-[12px] text-tp-slate-400", children: "No services added yet. Edit this plan to add services." }),
            }),
            _jsx(AlertDialog, {
                open: startOpen,
                onOpenChange: setStartOpen,
                children: _jsxs(AlertDialogContent, {
                    children: [
                        _jsxs(AlertDialogHeader, {
                            children: [
                                _jsx(AlertDialogTitle, { children: "Activate Plan" }),
                                _jsxs(AlertDialogDescription, {
                                    children: [
                                        "Activate ",
                                        _jsx("strong", { children: plan.name }),
                                        "? All ",
                                        plan.services.length,
                                        " service",
                                        plan.services.length !== 1 ? "s" : "",
                                        " will move to active status.",
                                    ],
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { children: "Cancel" }),
                                _jsx(AlertDialogAction, {
                                    onClick: handleActivate,
                                    className: "bg-tp-success-600 text-white hover:bg-tp-success-700",
                                    children: "Activate Plan",
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
                                _jsx(AlertDialogTitle, { children: "Delete Plan" }),
                                _jsxs(AlertDialogDescription, {
                                    children: [
                                        "Are you sure you want to delete ",
                                        _jsx("strong", { children: plan.name }),
                                        "? This will remove all ",
                                        plan.services.length,
                                        " service",
                                        plan.services.length !== 1 ? "s" : "",
                                        " in this plan. This action cannot be undone.",
                                    ],
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { children: "Cancel" }),
                                _jsx(AlertDialogAction, {
                                    onClick: handleDelete,
                                    className: "bg-tp-error-600 text-white hover:bg-tp-error-700",
                                    children: "Delete",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        ],
    });
}

// ─── Snackbar helper ───────────────────────────────────────
function showSnackbar(message, variant = "info") {
    const bgColor = variant === "warning" ? "var(--tp-warning-600, #dc6803)" : "var(--tp-slate-800, #1e293b)";
    const el = document.createElement("div");
    el.className = "fixed top-6 left-1/2 -translate-x-1/2 z-[9999] inline-flex items-center gap-3 rounded-[12px] px-5 py-3 font-['Inter',sans-serif] text-[14px] font-medium text-white shadow-lg transition-all animate-in fade-in slide-in-from-top-4";
    el.style.background = bgColor;
    el.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0"><path d="M12 9v4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16" r="0.75" fill="white"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${message}</span>`;
    document.body.appendChild(el);
    setTimeout(() => {
        el.style.opacity = "0";
        el.style.transform = "translate(-50%, -8px)";
        el.style.transition = "all 300ms ease";
        setTimeout(() => el.remove(), 300);
    }, 3000);
}

// ─── Tab Content ───────────────────────────────────────────
export function PlanEstimatesTab() {
    const { estimatePlans, openDrawer } = usePlanContext();
    // Accordion — first plan open by default, one at a time.
    const [openIndex, setOpenIndex] = useState(0);
    if (estimatePlans.length === 0) {
        return _jsx(SectionFrame, {
            children:             _jsxs("div", {
                className: `flex h-full min-h-0 flex-col overflow-hidden ${dui.planClusterShell}`,
                children: [
                    _jsx("div", {
                        className: `flex items-center px-[16px] py-[14px] ${dui.planClusterHeaderEstimates}`,
                        children: _jsxs("div", {
                            className: "flex items-center gap-[12px]",
                            children: [
                                _jsx("div", {
                                    className: "flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-blue-50",
                                    children: _jsx(DocumentText, { size: 24, variant: "Bulk", className: "text-tp-blue-600" }),
                                }),
                                _jsx("h3", { className: "font-['Inter',sans-serif] text-[18px] font-bold text-tp-slate-900", children: "Plan Estimates" }),
                            ],
                        }),
                    }),
                    _jsx("div", {
                        className: `flex flex-1 flex-col rounded-b-[16px] p-[12px] ${dui.planClusterInnerSurface}`,
                        children: _jsx(EmptyState, {
                            icon: _jsx("svg", {
                                width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true,
                                children: _jsx("path", { d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
                            }),
                            title: "No treatment plans yet",
                            description: "Create a new plan to start estimating treatments for this patient.",
                            action: _jsxs("button", {
                                type: "button",
                                onClick: () => openDrawer({ type: "add-plan" }),
                                className: "inline-flex items-center justify-center gap-[5px] rounded-[12px] bg-tp-blue-600 px-[16px] h-[42px] min-w-[120px] font-['Inter',sans-serif] text-[14px] font-semibold text-white transition-colors hover:bg-tp-blue-700 shadow-sm",
                                children: [_jsx(Add, { size: 20, variant: "Linear" }), "Create Plan"],
                            }),
                        }),
                    }),
                ],
            }),
        });
    }
    const grandTotal = estimatePlans.reduce((sum, p) => sum + computePlanTotal(p.services), 0);
    return _jsx(SectionFrame, {
        children: _jsxs("div", {
            className: `flex h-full min-h-0 flex-col overflow-hidden ${dui.planClusterShell}`,
            children: [
                _jsxs("div", {
                    className: `sticky top-0 z-[3] shrink-0 flex items-center justify-between px-[16px] py-[16px] ${dui.planClusterHeaderEstimates}`,
                    children: [
                        _jsxs("div", {
                            className: "flex items-center gap-[12px]",
                            children: [
                                _jsx("div", {
                                    className: "flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-blue-50",
                                    children: _jsx(DocumentText, { size: 24, variant: "Bulk", className: "text-tp-blue-600" }),
                                }),
                                _jsxs("div", {
                                    children: [
                                        _jsx("h3", { className: "font-['Inter',sans-serif] text-[18px] font-bold text-tp-slate-900", children: "Plan Estimates" }),
                                        _jsx("div", {
                                            className: "mt-[2px] inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-500",
                                            children: formatINR(grandTotal),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            className: "flex items-center gap-[8px]",
                            children: [
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => openDrawer({ type: "add-plan" }),
                                    className: "inline-flex items-center justify-center gap-[5px] rounded-[12px] bg-tp-blue-600 px-[16px] h-[42px] min-w-[120px] font-['Inter',sans-serif] text-[14px] font-semibold text-white transition-colors hover:bg-tp-blue-700 shadow-sm",
                                    children: [_jsx(Add, { size: 20, variant: "Linear" }), "Create Plan"],
                                }),
                                _jsxs(DropdownMenu, {
                                    children: [
                                        _jsx(DropdownMenuTrigger, {
                                            asChild: true,
                                            children: _jsx("button", {
                                                type: "button",
                                                className: "flex h-[32px] w-[32px] items-center justify-center rounded-[10px] hover:bg-tp-slate-100 transition-colors",
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
                                                    children: [_jsx(Printer, { size: 16, variant: "Linear", className: "mr-2" }), "Print All Estimates"],
                                                }),
                                                _jsxs(DropdownMenuItem, {
                                                    onClick: () => openDrawer({ type: "bill-preview", planId: estimatePlans[0]?.id ?? "" }),
                                                    className: dropdownItemClass,
                                                    children: [_jsx(Receipt1, { size: 16, variant: "Linear", className: "mr-2" }), "View Combined Bill"],
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
                    children: estimatePlans.map((plan, idx) => _jsx(PlanSubCard, {
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
