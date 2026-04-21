"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * BillPreviewDrawer — Right-side drawer showing itemized bill.
 * Supports plan-level (all services) or single-service view.
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
    lines.push("Bill Preview");
    lines.push("");
    lines.push(`Plan: ${plan.name}`);
    lines.push(`Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`);
    lines.push("");
    lines.push("Service".padEnd(40) + "Amount");
    lines.push("-".repeat(52));
    services.forEach((svc) => {
        const toothLabel = svc.toothFdi === "full-mouth" ? "Full Mouth" : `T${svc.toothFdi} — ${svc.toothLabel}`;
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
    a.download = `bill-${plan.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

export function BillPreviewDrawer() {
    const { state, closeDrawer } = usePlanContext();
    const drawer = state.drawer;
    const isOpen = drawer.type === "bill-preview";
    const planId = isOpen ? drawer.planId : null;
    const serviceId = isOpen ? drawer.serviceId : undefined;
    const plan = planId ? state.plans.find((p) => p.id === planId) : null;
    const services = plan
        ? serviceId
            ? plan.services.filter((s) => s.id === serviceId)
            : plan.services
        : [];
    const subtotal = services.reduce((sum, s) => sum + s.rate, 0);
    const serviceDiscount = services.reduce((sum, s) => sum + s.discount, 0);
    const additionalDiscount = plan ? (plan.additionalDiscount ?? 0) : 0;
    // Only apply plan-level discount when showing all services (not single-service view)
    const effectiveAdditionalDiscount = serviceId ? 0 : additionalDiscount;
    const afterServiceDiscount = services.reduce((sum, s) => sum + s.amount, 0);
    const total = Math.max(0, afterServiceDiscount - effectiveAdditionalDiscount);

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
                            onClick: () => plan && downloadBillAsText(plan, services, subtotal, serviceDiscount, effectiveAdditionalDiscount, total),
                            className: BILL_ACTION_ICON_CLASS,
                            "aria-label": "Download bill",
                            children: _jsx(DocumentDownload, { size: 18, variant: "Linear" }),
                        }),
                    }),
                    _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Download bill" }),
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
                            "aria-label": "Print bill",
                            children: _jsx(Printer, { size: 18, variant: "Linear" }),
                        }),
                    }),
                    _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Print bill" }),
                ],
            }),
        ],
    });

    return (_jsx(TPDrawer, {
        open: isOpen,
        onOpenChange: (open) => !open && closeDrawer(),
        children: _jsxs(TPDrawerContent, {
            side: "right",
            size: "lg",
            className: `${PLAN_DRAWER_PANEL_CLASS} flex flex-col`,
            children: [
                _jsx(DrawerHeader, { title: "Bill Preview", onClose: closeDrawer, action: action }),
                _jsx("div", {
                    className: "flex-1 overflow-y-auto px-[24px] py-[16px]",
                    children: plan && (() => {
                        const patient = getAppointmentPatient(plan.patientId || "apt-1");
                        const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
                        return _jsxs("div", {
                            className: "overflow-hidden rounded-[12px] border border-tp-slate-200 bg-white font-['Inter',sans-serif]",
                            children: [
                                _jsxs("div", {
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
                                _jsx("div", { className: "h-px bg-tp-slate-100", "aria-hidden": true }),
                                _jsxs("div", {
                                    className: "grid grid-cols-2 gap-x-[16px] gap-y-[6px] bg-tp-slate-50/70 px-[16px] py-[12px] text-[12px] text-tp-slate-600",
                                    children: [
                                        _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Patient Name:" }), " ", patient.name] }),
                                        _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Patient ID:" }), " ", patient.patientCode] }),
                                        _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Age / Sex:" }), " ", patient.age, " Y, ", patient.genderLabel] }),
                                        _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Mobile:" }), " ", patient.mobile.replace(/^\+91-/, "")] }),
                                        _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Plan:" }), " ", plan.name] }),
                                        _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Date:" }), " ", today] }),
                                    ],
                                }),
                                serviceId && (_jsx("p", {
                                    className: "border-t border-tp-slate-100 px-[16px] py-[8px] font-['Inter',sans-serif] text-[12px] font-medium text-tp-blue-600",
                                    children: "Showing single service bill",
                                })),
                                _jsxs("div", {
                                    className: "border-t border-tp-slate-100 overflow-hidden",
                                    children: [
                                        _jsxs("table", {
                                            className: "w-full",
                                            children: [
                                                _jsx("thead", {
                                                    children: _jsxs("tr", {
                                                        className: "bg-tp-slate-50",
                                                        children: [
                                                            _jsx("th", { className: "px-[12px] py-[8px] text-left font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400", children: "Service" }),
                                                            _jsx("th", { className: "px-[12px] py-[8px] text-right font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[90px]", children: "Amount" }),
                                                        ],
                                                    }),
                                                }),
                                                _jsx("tbody", {
                                                    children: services.map((svc) => (_jsxs("tr", {
                                                        className: "border-t border-tp-slate-100",
                                                        children: [
                                                            _jsxs("td", {
                                                                className: "px-[12px] py-[10px]",
                                                                children: [
                                                                    _jsx("p", { className: "font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-800", children: svc.treatment }),
                                                                    _jsx("p", { className: "font-['Inter',sans-serif] text-[12px] text-tp-slate-400", children: svc.toothFdi === "full-mouth" ? "Full Mouth" : `T${svc.toothFdi} — ${svc.toothLabel}` }),
                                                                ],
                                                            }),
                                                            _jsxs("td", {
                                                                className: "px-[12px] py-[10px] text-right font-['Inter',sans-serif] text-[12px] text-tp-slate-700",
                                                                children: [
                                                                    formatINR(svc.rate),
                                                                    svc.discount > 0 && (_jsxs("p", {
                                                                        className: "font-['Inter',sans-serif] text-[12px] text-tp-error-500",
                                                                        children: ["-", formatINR(svc.discount)],
                                                                    })),
                                                                ],
                                                            }),
                                                        ],
                                                    }, svc.id))),
                                                }),
                                            ],
                                        }),
                                        _jsxs("div", {
                                            className: "border-t border-tp-slate-200 bg-tp-slate-50/50 px-[12px] py-[10px] space-y-[4px]",
                                            children: [
                                                _jsxs("div", {
                                                    className: "flex justify-between font-['Inter',sans-serif] text-[12px]",
                                                    children: [
                                                        _jsx("span", { className: "text-tp-slate-500", children: "Subtotal" }),
                                                        _jsx("span", { className: "text-tp-slate-700", children: formatINR(subtotal) }),
                                                    ],
                                                }),
                                                serviceDiscount > 0 && (_jsxs("div", {
                                                    className: "flex justify-between font-['Inter',sans-serif] text-[12px]",
                                                    children: [
                                                        _jsx("span", { className: "text-tp-slate-500", children: "Service Discount" }),
                                                        _jsxs("span", { className: "text-tp-error-500", children: ["-", formatINR(serviceDiscount)] }),
                                                    ],
                                                })),
                                                effectiveAdditionalDiscount > 0 && (_jsxs("div", {
                                                    className: "flex justify-between font-['Inter',sans-serif] text-[12px]",
                                                    children: [
                                                        _jsx("span", { className: "text-tp-slate-500", children: "Additional Discount" }),
                                                        _jsxs("span", { className: "text-tp-success-600", children: ["-", formatINR(effectiveAdditionalDiscount)] }),
                                                    ],
                                                })),
                                                _jsxs("div", {
                                                    className: "flex justify-between font-['Inter',sans-serif] text-[12px] font-bold pt-[4px] border-t border-tp-slate-200",
                                                    children: [
                                                        _jsx("span", { className: "text-tp-slate-800", children: "Total" }),
                                                        _jsx("span", { className: "text-tp-blue-700", children: formatINR(total) }),
                                                    ],
                                                }),
                                            ],
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
