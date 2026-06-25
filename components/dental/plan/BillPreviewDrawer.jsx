"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * BillPreviewDrawer — Right-side drawer showing itemized bill.
 * Supports plan-level (all services), single-service view, or combined multi-plan view.
 */
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer";
import { Building2 } from "lucide-react";
import { Printer, DocumentDownload } from "iconsax-reactjs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getAppointmentPatient } from "@/lib/appointment-patients";
import { usePlanContext } from "./plan-context";
import { formatINR, DrawerHeader, PLAN_DRAWER_PANEL_CLASS } from "./plan-shared";

const BILL_ACTION_ICON_CLASS =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-200";

function downloadBillAsText(plan, services, subtotal, serviceDiscount, additionalDiscount, total) {
    const lines = [];
    lines.push("Estimate Preview");
    lines.push("");
    lines.push(`Plan: ${plan.name}`);
    lines.push(`Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`);
    lines.push("");
    lines.push("Service".padEnd(40) + "Amount");
    lines.push("-".repeat(52));
    services.forEach((svc) => {
        const toothLabel = svc.toothFdi === "full-mouth" ? "Full Mouth" : `T${svc.toothFdi}`;
        lines.push(`${svc.treatment} (${toothLabel})`);
        lines.push(`  ${formatINR(svc.rate)}${svc.discount > 0 ? `  (-${formatINR(svc.discount)})` : ""}`);
    });
    lines.push("-".repeat(52));
    lines.push(`Subtotal: ${formatINR(subtotal)}`);
    if (serviceDiscount > 0) lines.push(`Service Discount: -${formatINR(serviceDiscount)}`);
    if (additionalDiscount > 0) lines.push(`Additional Discount: -${formatINR(additionalDiscount)}`);
    lines.push(`Total:    ${formatINR(total)}`);
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `estimate-${plan.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function downloadCombinedBillAsText(plans, planGroups, grandTotal) {
    const lines = [];
    lines.push("Combined Estimates Preview");
    lines.push("");
    lines.push(`Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`);
    lines.push("");
    planGroups.forEach((g) => {
        lines.push(`── ${g.plan.name} ──`);
        lines.push("Service".padEnd(40) + "Amount");
        lines.push("-".repeat(52));
        g.services.forEach((svc) => {
            const toothLabel = svc.toothFdi === "full-mouth" ? "Full Mouth" : `T${svc.toothFdi}`;
            lines.push(`${svc.treatment} (${toothLabel})`);
            lines.push(`  ${formatINR(svc.rate)}${svc.discount > 0 ? `  (-${formatINR(svc.discount)})` : ""}`);
        });
        lines.push(`  Subtotal: ${formatINR(g.subtotal)}`);
        if (g.additionalDiscount > 0) lines.push(`  Additional Discount: -${formatINR(g.additionalDiscount)}`);
        if (g.additionalDiscount > 0 || g.serviceDiscount > 0) lines.push(`  Plan Total: ${formatINR(g.planTotal)}`);
        lines.push("");
    });
    lines.push("=".repeat(52));
    lines.push(`Grand Total: ${formatINR(grandTotal)}`);
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "combined-estimates.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function ServiceRow(svc, idx) {
    const toothDesc = svc.toothFdi === "full-mouth" ? "Full Mouth" : svc.toothFdis?.length > 1 ? svc.toothFdis.map(t => `T${t}`).join(", ") : `T${svc.toothFdi}`;
    return _jsxs("tr", {
        children: [
            _jsx("td", { className: "border border-tp-slate-200 px-[8px] py-[7px] text-center text-tp-slate-500", children: idx + 1 }),
            _jsxs("td", {
                className: "border border-tp-slate-200 px-[10px] py-[7px]",
                children: [
                    _jsx("span", { className: "font-medium text-tp-slate-800", children: svc.treatment }),
                    _jsx("br", {}),
                    _jsx("span", { className: "text-[11px] text-tp-slate-400", children: toothDesc }),
                ],
            }),
            _jsx("td", { className: "border border-tp-slate-200 px-[8px] py-[7px] text-right text-tp-slate-700 tabular-nums", children: formatINR(svc.rate) }),
            _jsx("td", { className: "border border-tp-slate-200 px-[8px] py-[7px] text-right tabular-nums " + (svc.discount > 0 ? "text-tp-error-500" : "text-tp-slate-400"), children: svc.discount > 0 ? formatINR(svc.discount) : "—" }),
            _jsx("td", { className: "border border-tp-slate-200 px-[8px] py-[7px] text-right font-medium text-tp-slate-800 tabular-nums", children: formatINR(svc.amount) }),
        ],
    }, svc.id);
}

function Letterhead() {
    return [
        _jsxs("div", {
            key: "lh",
            className: "flex items-start gap-[12px] px-[16px] py-[14px]",
            children: [
                _jsx("div", {
                    className: "flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] bg-tp-blue-50 text-tp-blue-500",
                    children: _jsx(Building2, { size: 26, strokeWidth: 1.6 }),
                }),
                _jsxs("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        _jsx("p", { className: "text-[14px] font-bold text-tp-slate-900", children: "TP Dental Care" }),
                        _jsx("p", { className: "text-[12px] font-medium text-tp-slate-600", children: "Dr. Umesh Aggarwal, BDS, MDS" }),
                        _jsx("p", { className: "text-[10px] text-tp-slate-500", children: "Reg. ID: DCI-2342342 | +91 78945 61230" }),
                        _jsx("p", { className: "text-[10px] text-tp-slate-500", children: "K9 Sardar Bungalow, Prahladnagar, Ahmedabad" }),
                    ],
                }),
            ],
        }),
        _jsx("div", { key: "lh-sep", className: "h-px bg-tp-slate-100", "aria-hidden": true }),
    ];
}

function PatientInfo(patient, plan, today) {
    return _jsxs("div", {
        className: "grid grid-cols-2 gap-x-[16px] gap-y-[6px] bg-tp-slate-50/70 px-[16px] py-[12px] text-[12px] text-tp-slate-600",
        children: [
            _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Patient Name:" }), " ", patient.name] }),
            _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Patient ID:" }), " ", patient.patientCode] }),
            _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Age / Sex:" }), " ", patient.age, " Y, ", patient.genderLabel] }),
            _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Mobile:" }), " ", patient.mobile.replace(/^\+91-/, "")] }),
            plan && _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Plan:" }), " ", plan.name] }),
            _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Date:" }), " ", today] }),
        ],
    });
}

function TableHeader() {
    return _jsx("thead", {
        children: _jsxs("tr", {
            className: "bg-tp-slate-100",
            children: [
                _jsx("th", { className: "border border-tp-slate-200 px-[8px] py-[7px] text-center font-semibold text-tp-slate-600 w-[32px]", children: "#" }),
                _jsx("th", { className: "border border-tp-slate-200 px-[10px] py-[7px] text-left font-semibold text-tp-slate-600", children: "Description" }),
                _jsx("th", { className: "border border-tp-slate-200 px-[8px] py-[7px] text-right font-semibold text-tp-slate-600 w-[72px]", children: "Rate" }),
                _jsx("th", { className: "border border-tp-slate-200 px-[8px] py-[7px] text-right font-semibold text-tp-slate-600 w-[60px]", children: "Disc." }),
                _jsx("th", { className: "border border-tp-slate-200 px-[8px] py-[7px] text-right font-semibold text-tp-slate-600 w-[76px]", children: "Amount" }),
            ],
        }),
    });
}

function PlanHeadingRow(planName) {
    return _jsx("tr", {
        children: _jsx("td", {
            colSpan: 5,
            className: "border border-tp-slate-200 bg-tp-slate-50 px-[10px] py-[8px] text-[12px] font-bold text-tp-slate-800",
            children: planName,
        }),
    });
}

function PlanSubtotalRows(g) {
    const rows = [];
    rows.push(_jsxs("tr", {
        className: "bg-tp-slate-50/50",
        children: [
            _jsxs("td", { colSpan: 4, className: "border border-tp-slate-200 px-[10px] py-[6px] text-right text-[12px] text-tp-slate-500", children: [g.plan.name, " Subtotal"] }),
            _jsx("td", { className: "border border-tp-slate-200 px-[8px] py-[6px] text-right text-[12px] font-medium text-tp-slate-700 tabular-nums", children: formatINR(g.subtotal) }),
        ],
    }, `${g.plan.id}-subtotal`));
    if (g.additionalDiscount > 0) {
        rows.push(_jsxs("tr", {
            className: "bg-tp-slate-50/50",
            children: [
                _jsx("td", { colSpan: 4, className: "border border-tp-slate-200 px-[10px] py-[6px] text-right text-[12px] text-tp-slate-500", children: "Additional Discount" }),
                _jsx("td", { className: "border border-tp-slate-200 px-[8px] py-[6px] text-right text-[12px] font-medium text-tp-error-500 tabular-nums", children: `−${formatINR(g.additionalDiscount)}` }),
            ],
        }, `${g.plan.id}-adddisc`));
    }
    if (g.additionalDiscount > 0 || g.serviceDiscount > 0) {
        rows.push(_jsxs("tr", {
            className: "bg-tp-slate-50/50",
            children: [
                _jsxs("td", { colSpan: 4, className: "border border-tp-slate-200 px-[10px] py-[6px] text-right text-[12px] font-semibold text-tp-slate-700", children: [g.plan.name, " Total"] }),
                _jsx("td", { className: "border border-tp-slate-200 px-[8px] py-[6px] text-right text-[12px] font-semibold text-tp-slate-800 tabular-nums", children: formatINR(g.planTotal) }),
            ],
        }, `${g.plan.id}-total`));
    }
    return rows;
}

export function BillPreviewDrawer() {
    const { state, closeDrawer } = usePlanContext();
    const drawer = state.drawer;
    const isOpen = drawer.type === "bill-preview";
    const rawPlanId = isOpen ? drawer.planId : null;
    const planIds = isOpen ? drawer.planIds : null;
    const serviceId = isOpen ? drawer.serviceId : undefined;
    const isCombined = !!(planIds && planIds.length > 1);
    const planId = rawPlanId || (planIds?.length === 1 ? planIds[0] : null);

    const plan = planId ? state.plans.find((p) => p.id === planId) : null;

    const combinedPlans = isCombined
        ? planIds.map(id => state.plans.find(p => p.id === id)).filter(Boolean)
        : plan ? [plan] : [];

    const services = plan
        ? serviceId
            ? plan.services.filter((s) => s.id === serviceId)
            : plan.services
        : [];
    const subtotal = services.reduce((sum, s) => sum + s.rate, 0);
    const serviceDiscount = services.reduce((sum, s) => sum + s.discount, 0);
    const additionalDiscount = plan ? (plan.additionalDiscount ?? 0) : 0;
    const effectiveAdditionalDiscount = serviceId ? 0 : additionalDiscount;
    const afterServiceDiscount = services.reduce((sum, s) => sum + s.amount, 0);
    const total = Math.max(0, afterServiceDiscount - effectiveAdditionalDiscount);

    const planGroups = isCombined ? combinedPlans.map(p => {
        const svcs = p.services;
        const planSubtotal = svcs.reduce((sum, s) => sum + s.rate, 0);
        const planSvcDisc = svcs.reduce((sum, s) => sum + s.discount, 0);
        const planAddDisc = p.additionalDiscount ?? 0;
        const planAfterSvc = svcs.reduce((sum, s) => sum + s.amount, 0);
        const planTotal = Math.max(0, planAfterSvc - planAddDisc);
        return { plan: p, services: svcs, subtotal: planSubtotal, serviceDiscount: planSvcDisc, additionalDiscount: planAddDisc, planTotal };
    }) : [];
    const grandTotal = planGroups.reduce((sum, g) => sum + g.planTotal, 0);

    const firstPlan = isCombined ? combinedPlans[0] : plan;

    const action = _jsxs("div", {
        className: "flex items-center gap-[8px]",
        children: [
            _jsxs(Tooltip, {
                delayDuration: 200,
                children: [
                    _jsx(TooltipTrigger, {
                        asChild: true,
                        children: _jsx("button", {
                            type: "button",
                            onClick: () => {
                                if (isCombined) {
                                    downloadCombinedBillAsText(combinedPlans, planGroups, grandTotal);
                                } else if (plan) {
                                    downloadBillAsText(plan, services, subtotal, serviceDiscount, effectiveAdditionalDiscount, total);
                                }
                            },
                            className: BILL_ACTION_ICON_CLASS,
                            "aria-label": "Download estimate",
                            children: _jsx(DocumentDownload, { size: 18, variant: "Linear" }),
                        }),
                    }),
                    _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Download estimate" }),
                ],
            }),
            _jsxs(Tooltip, {
                delayDuration: 200,
                children: [
                    _jsx(TooltipTrigger, {
                        asChild: true,
                        children: _jsx("button", {
                            type: "button",
                            onClick: () => window.print(),
                            className: BILL_ACTION_ICON_CLASS,
                            "aria-label": "Print estimate",
                            children: _jsx(Printer, { size: 18, variant: "Linear" }),
                        }),
                    }),
                    _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Print estimate" }),
                ],
            }),
        ],
    });

    const drawerTitle = isCombined ? "Combined Estimates" : "Estimate Preview";

    return (_jsx(TPDrawer, {
        open: isOpen,
        onOpenChange: (open) => !open && closeDrawer(),
        children: _jsxs(TPDrawerContent, {
            side: "right",
            size: "lg",
            className: `${PLAN_DRAWER_PANEL_CLASS} flex flex-col`,
            children: [
                _jsx(DrawerHeader, { title: drawerTitle, onClose: closeDrawer, action: action }),
                _jsx("div", {
                    className: "flex-1 overflow-y-auto px-[24px] py-[16px]",
                    children: isCombined ? (() => {
                        const patient = getAppointmentPatient(firstPlan.patientId || "apt-1");
                        const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
                        let globalIdx = 0;
                        return _jsxs("div", {
                            className: "overflow-hidden rounded-[12px] border border-tp-slate-200 bg-white font-['Inter',sans-serif]",
                            children: [
                                ...Letterhead(),
                                PatientInfo(patient, null, today),
                                _jsx("div", {
                                    className: "px-[16px] py-[14px]",
                                    children: _jsxs("table", {
                                        className: "w-full border-collapse font-['Inter',sans-serif] text-[12px]",
                                        style: { border: "1px solid #cbd5e1", borderRadius: "10px", overflow: "hidden" },
                                        children: [
                                            TableHeader(),
                                            _jsx("tbody", {
                                                children: planGroups.flatMap((g) => {
                                                    const rows = [];
                                                    rows.push(PlanHeadingRow(g.plan.name));
                                                    g.services.forEach((svc) => {
                                                        rows.push(ServiceRow(svc, globalIdx));
                                                        globalIdx++;
                                                    });
                                                    rows.push(...PlanSubtotalRows(g));
                                                    return rows;
                                                }),
                                            }),
                                            _jsxs("tfoot", {
                                                children: [
                                                    _jsxs("tr", {
                                                        className: "bg-tp-slate-50",
                                                        children: [
                                                            _jsx("td", { colSpan: 4, className: "border border-tp-slate-200 px-[10px] py-[8px] text-right font-bold text-tp-slate-800", children: "Grand Total" }),
                                                            _jsx("td", { className: "border border-tp-slate-200 px-[8px] py-[8px] text-right font-bold text-tp-blue-700 tabular-nums", children: formatINR(grandTotal) }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                            ],
                        });
                    })() : plan && (() => {
                        const patient = getAppointmentPatient(plan.patientId || "apt-1");
                        const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
                        return _jsxs("div", {
                            className: "space-y-[10px]",
                            children: [
                                serviceId && _jsxs("div", {
                                    className: "flex items-center gap-[8px] rounded-[10px] bg-tp-slate-100 px-[12px] py-[8px]",
                                    children: [
                                        _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", className: "shrink-0 text-tp-slate-400", children: _jsxs("g", { children: [_jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5" }), _jsx("path", { d: "M12 8v5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }), _jsx("circle", { cx: "12", cy: "16", r: "0.75", fill: "currentColor" })] }) }),
                                        _jsx("p", { className: "font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-600", children: "Showing estimate for a single service from this plan" }),
                                    ],
                                }),
                                _jsxs("div", {
                                    className: "overflow-hidden rounded-[12px] border border-tp-slate-200 bg-white font-['Inter',sans-serif]",
                                    children: [
                                        ...Letterhead(),
                                        PatientInfo(patient, plan, today),
                                        _jsx("div", {
                                            className: "px-[16px] py-[14px]",
                                            children: _jsxs("table", {
                                                className: "w-full border-collapse font-['Inter',sans-serif] text-[12px]",
                                                style: { border: "1px solid #cbd5e1", borderRadius: "10px", overflow: "hidden" },
                                                children: [
                                                    TableHeader(),
                                                    _jsx("tbody", {
                                                        children: services.map((svc, idx) => ServiceRow(svc, idx)),
                                                    }),
                                                    _jsxs("tfoot", {
                                                        children: [
                                                            _jsxs("tr", {
                                                                children: [
                                                                    _jsx("td", { colSpan: 4, className: "border border-tp-slate-200 px-[10px] py-[6px] text-right text-tp-slate-500", children: "Subtotal" }),
                                                                    _jsx("td", { className: "border border-tp-slate-200 px-[8px] py-[6px] text-right text-tp-slate-700 tabular-nums", children: formatINR(subtotal) }),
                                                                ],
                                                            }),
                                                            serviceDiscount > 0 && _jsxs("tr", {
                                                                children: [
                                                                    _jsx("td", { colSpan: 4, className: "border border-tp-slate-200 px-[10px] py-[6px] text-right text-tp-slate-500", children: "Service Discount" }),
                                                                    _jsxs("td", { className: "border border-tp-slate-200 px-[8px] py-[6px] text-right text-tp-error-500 tabular-nums", children: ["−", formatINR(serviceDiscount)] }),
                                                                ],
                                                            }),
                                                            effectiveAdditionalDiscount > 0 && _jsxs("tr", {
                                                                children: [
                                                                    _jsx("td", { colSpan: 4, className: "border border-tp-slate-200 px-[10px] py-[6px] text-right text-tp-slate-500", children: "Additional Discount" }),
                                                                    _jsxs("td", { className: "border border-tp-slate-200 px-[8px] py-[6px] text-right text-tp-success-600 tabular-nums", children: ["−", formatINR(effectiveAdditionalDiscount)] }),
                                                                ],
                                                            }),
                                                            _jsxs("tr", {
                                                                className: "bg-tp-slate-50",
                                                                children: [
                                                                    _jsx("td", { colSpan: 4, className: "border border-tp-slate-200 px-[10px] py-[8px] text-right font-bold text-tp-slate-800", children: "Total" }),
                                                                    _jsx("td", { className: "border border-tp-slate-200 px-[8px] py-[8px] text-right font-bold text-tp-blue-700 tabular-nums", children: formatINR(total) }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        }),
                                    ],
                                }),
                            ],
                        });
                    })(),
                }),
            ],
        }),
    }));
}
