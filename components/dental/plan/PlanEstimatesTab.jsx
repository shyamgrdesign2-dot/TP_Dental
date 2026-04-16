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
import { TPConfirmDialog } from "@/components/ui/tp-confirm-dialog";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlanContext } from "./plan-context";
import { SectionFrame, EmptyState, formatINR, computePlanTotal, PlanSurfaceAbbrTags } from "./plan-shared";
import dui from "../dental-ui.module.scss";

const dropdownContentClass = "w-[220px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1";
const dropdownItemClass = "rounded-[8px] !gap-[6px] focus:bg-tp-slate-100 focus:text-tp-slate-700 data-[highlighted]:bg-tp-slate-100 data-[highlighted]:text-tp-slate-700";

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
        className: "overflow-hidden rounded-[16px] border border-tp-slate-200/80 bg-white",
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
                                                onClick: () => openDrawer({ type: "bill-preview", planId: plan.id }),
                                                className: dropdownItemClass,
                                                children: [_jsx(Receipt1, { size: 16, variant: "Linear" }), "View Plan Bill"],
                                            }),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: handleEdit,
                                                className: dropdownItemClass,
                                                children: [_jsx(Edit2, { size: 16, variant: "Linear" }), "Edit Plan"],
                                            }),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: handleDuplicate,
                                                className: dropdownItemClass,
                                                children: [_jsx(Copy, { size: 16, variant: "Linear" }), "Duplicate Plan"],
                                            }),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => setDeleteOpen(true),
                                                className: "text-tp-error-600 !gap-[6px] focus:bg-red-50 focus:text-tp-error-600 data-[highlighted]:bg-red-50 data-[highlighted]:text-tp-error-600 rounded-[8px]",
                                                children: [_jsx(Trash, { size: 20, variant: "Linear", className: "text-tp-error-500" }), "Delete Plan"],
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
                                                    _jsx("p", { className: "font-['Inter',sans-serif] text-[10px] text-tp-slate-400", children: svc.toothLabel }),
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
            _jsx(TPConfirmDialog, {
                open: startOpen,
                onOpenChange: setStartOpen,
                title: "Activate Plan",
                warning: `Activates ${plan.name}. All ${plan.services.length} service${plan.services.length === 1 ? "" : "s"} will move to the active-plans list.`,
                secondaryLabel: "Cancel",
                primaryLabel: "Activate Plan",
                primaryTone: "success",
                onPrimary: handleActivate,
            }),
            _jsx(TPConfirmDialog, {
                open: deleteOpen,
                onOpenChange: setDeleteOpen,
                title: "Delete Plan",
                warning: `Deletes ${plan.name} and all ${plan.services.length} service${plan.services.length === 1 ? "" : "s"}. This action cannot be undone.`,
                secondaryLabel: "Cancel",
                primaryLabel: "Delete",
                primaryTone: "destructive",
                onPrimary: handleDelete,
            }),
        ],
    });
}

// ─── Snackbar helper ───────────────────────────────────────
function showSnackbar(message, variant = "info") {
    const bgColor = variant === "warning" ? "var(--tp-warning-600, #dc6803)" : "var(--tp-slate-800, #1e293b)";
    const el = document.createElement("div");
    el.className = "fixed top-6 left-1/2 -translate-x-1/2 z-[9999] inline-flex items-center gap-3 rounded-[12px] border border-white/25 px-5 py-3 font-['Inter',sans-serif] text-[14px] font-medium text-white transition-all animate-in fade-in slide-in-from-top-4";
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
                            icon: _jsxs("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "96", height: "96", viewBox: "0 0 80 80", fill: "none", "aria-hidden": true,
                                className: "opacity-60",
                                children: [
                                    _jsxs("g", { clipPath: "url(#clip0_913_26868)", children: [
                                            _jsx("path", { d: "M71.9803 14.6484H9.57474C8.73282 14.649 7.92552 14.9836 7.33019 15.579C6.73486 16.1743 6.40018 16.9816 6.39966 17.8235V75.0812C6.40018 75.9231 6.73486 76.7304 7.33019 77.3258C7.92552 77.9211 8.73282 78.2558 9.57474 78.2563H71.9803C72.8223 78.2559 73.6297 77.9212 74.2251 77.3259C74.8205 76.7305 75.1552 75.9232 75.1557 75.0812V17.8235C75.1552 16.9815 74.8205 16.1742 74.2251 15.5789C73.6297 14.9835 72.8223 14.6489 71.9803 14.6484Z", fill: "#C6C6C6" }),
                                            _jsx("path", { d: "M67.8722 58.3622H13.6836C11.9302 58.3622 10.5085 56.9406 10.5085 55.1871V4.59696C10.5085 2.84351 11.9302 1.42188 13.6836 1.42188H67.8722C69.6256 1.42188 71.0472 2.84351 71.0472 4.59696V55.1871C71.0472 56.9406 69.6256 58.3622 67.8722 58.3622Z", fill: "#F9F9F9" }),
                                            _jsx("path", { d: "M11.5138 56.192V5.6022C11.5138 3.84876 12.9354 2.42712 14.6889 2.42712H68.8774C69.4967 2.42712 70.0725 2.60712 70.5607 2.91368C69.9994 2.0186 69.0066 1.42188 67.8722 1.42188H13.6836C11.9302 1.42188 10.5085 2.84351 10.5085 4.59696V55.1871C10.5085 56.3219 11.1053 57.3143 12.0003 57.876C11.6938 57.3874 11.5138 56.8117 11.5138 56.1924V56.192Z", fill: "url(#paint0_linear_913_26868)" }),
                                            _jsx("path", { d: "M61.2048 12.1094H20.3513V14.4376H61.2048V12.1094ZM61.2048 20.9992H20.3513V23.3274H61.2048V20.9992ZM61.2048 29.891H20.3513V32.2192H61.2048V29.891ZM61.2048 38.7808H20.3513V41.1094H61.2048V38.7808Z", fill: "white" }),
                                            _jsx("path", { d: "M25.2197 31.2656L35.4856 41.5319H25.2197V31.2656Z", fill: "url(#paint1_linear_913_26868)" }),
                                            _jsx("path", { d: "M75.1559 42.3779V18.7573L71.0474 14.6484V42.3776H75.1559V42.3779Z", fill: "#C6C6C6" }),
                                            _jsx("path", { d: "M79.9682 44.5123L75.5416 75.8474C75.3203 77.4139 73.9796 78.5782 72.3977 78.5782H9.15767C7.57571 78.5782 6.23505 77.4139 6.01374 75.8474L0.0317719 33.5061C-0.238064 31.5946 1.24521 29.8867 3.17571 29.8867H22.7055C24.2875 29.8867 25.6282 31.051 25.8495 32.6172L26.6334 38.1621C26.8547 39.7287 28.1954 40.8929 29.7773 40.8929H76.8249C78.7547 40.8929 80.2383 42.6008 79.9685 44.5123H79.9682Z", fill: "url(#paint2_linear_913_26868)" }),
                                            _jsx("path", { d: "M64.2844 64.6016H17.2716C17.0139 64.6015 16.7651 64.5074 16.5718 64.337C16.3785 64.1667 16.2539 63.9316 16.2214 63.676L15.6332 59.0189C15.6145 58.87 15.6278 58.7187 15.672 58.5752C15.7162 58.4317 15.7904 58.2993 15.8897 58.1867C15.9891 58.0741 16.1112 57.9839 16.248 57.922C16.3848 57.8602 16.5333 57.8282 16.6834 57.8281H64.8726C65.0227 57.8282 65.1711 57.8602 65.308 57.922C65.4448 57.9839 65.5669 58.0741 65.6662 58.1867C65.7655 58.2993 65.8398 58.4316 65.884 58.5752C65.9282 58.7187 65.9414 58.87 65.9227 59.0189L65.3345 63.676C65.3021 63.9316 65.1775 64.1667 64.9842 64.337C64.7909 64.5074 64.5421 64.6015 64.2844 64.6016Z", fill: "#D5D5D5" })
                                        ] }),
                                    _jsxs("defs", { children: [
                                            _jsx("linearGradient", { id: "paint0_linear_913_26868", x1: "42.6397", y1: "31.7504", x2: "2.4856", y2: "-8.40403", gradientUnits: "userSpaceOnUse", children: _jsx("stop", { stopColor: "white" }) }),
                                            _jsxs("linearGradient", { id: "paint1_linear_913_26868", x1: "32.0024", y1: "43.1791", x2: "19.5935", y2: "30.7705", gradientUnits: "userSpaceOnUse", children: [
                                                    _jsx("stop", { stopColor: "#C2CECE", stopOpacity: "0" }),
                                                    _jsx("stop", { offset: "0.179", stopColor: "#AFBCBC", stopOpacity: "0.179" }),
                                                    _jsx("stop", { offset: "1", stopColor: "#5B6A6A" })
                                                ] }),
                                            _jsxs("linearGradient", { id: "paint2_linear_913_26868", x1: "40", y1: "29.8867", x2: "40", y2: "78.5782", gradientUnits: "userSpaceOnUse", children: [
                                                    _jsx("stop", { stopColor: "#EEF0F4" }),
                                                    _jsx("stop", { offset: "0.927", stopColor: "#E4E4E4" })
                                                ] }),
                                            _jsxs("clipPath", { id: "clip0_913_26868", children: _jsx("rect", { width: "80", height: "80", fill: "white" }) })
                                        ] })
                                ]
                            }),
                            title: "No treatment plans yet",
                            description: "Create a new plan to start estimating treatments for this patient.",
                            action: _jsxs("button", {
                                type: "button",
                                onClick: () => openDrawer({ type: "add-plan" }),
                                className: "inline-flex items-center justify-center gap-[5px] rounded-[12px] bg-tp-blue-600 px-[16px] h-[46px] min-w-[120px] font-['Inter',sans-serif] text-[14px] font-semibold text-white transition-colors hover:bg-tp-blue-700",
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
                                    className: "inline-flex items-center justify-center gap-[5px] rounded-[12px] bg-tp-blue-600 px-[16px] h-[42px] min-w-[120px] font-['Inter',sans-serif] text-[14px] font-semibold text-white transition-colors hover:bg-tp-blue-700",
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
