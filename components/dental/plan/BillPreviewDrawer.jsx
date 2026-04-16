"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * BillPreviewDrawer — Right-side drawer showing itemized bill.
 * Supports plan-level (all services) or single-service view.
 */
import { TPDrawer, TPDrawerContent, } from "@/components/tp-ui/tp-drawer";
import { Printer } from "iconsax-reactjs";
import { usePlanContext } from "./plan-context";
import { formatINR, DrawerHeader } from "./plan-shared";
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
    const discount = services.reduce((sum, s) => sum + s.discount, 0);
    const total = services.reduce((sum, s) => sum + s.amount, 0);
    return (_jsx(TPDrawer, { open: isOpen, onOpenChange: (open) => !open && closeDrawer(), children: _jsxs(TPDrawerContent, { side: "right", size: "md", className: "!rounded-none", children: [_jsx(DrawerHeader, { title: "Bill Preview", onClose: closeDrawer, action: _jsxs("button", { type: "button", onClick: () => window.print(), className: "inline-flex items-center gap-[6px] h-[42px] min-w-[120px] rounded-[10px] px-[20px] font-['Inter',sans-serif] text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 transition-colors", children: [_jsx(Printer, { size: 16, variant: "Linear" }), "Print Bill"] }) }), _jsx("div", { className: "flex-1 overflow-y-auto px-[24px] py-[16px]", children: plan && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-[16px] space-y-[4px]", children: [_jsxs("p", { className: "font-['Inter',sans-serif] text-[12px] text-tp-slate-500", children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Plan:" }), " ", plan.name] }), _jsxs("p", { className: "font-['Inter',sans-serif] text-[12px] text-tp-slate-500", children: [_jsx("span", { className: "font-semibold text-tp-slate-700", children: "Date:" }), " ", new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })] }), serviceId && (_jsx("p", { className: "font-['Inter',sans-serif] text-[12px] text-tp-blue-600 font-medium", children: "Showing single service bill" }))] }), _jsxs("div", { className: "rounded-[10px] border border-tp-slate-200 overflow-hidden", children: [_jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-tp-slate-50", children: [_jsx("th", { className: "px-[12px] py-[8px] text-left font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400", children: "Service" }), _jsx("th", { className: "px-[12px] py-[8px] text-right font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[90px]", children: "Amount" })] }) }), _jsx("tbody", { children: services.map((svc) => (_jsxs("tr", { className: "border-t border-tp-slate-100", children: [_jsxs("td", { className: "px-[12px] py-[10px]", children: [_jsx("p", { className: "font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-800", children: svc.treatment }), _jsx("p", { className: "font-['Inter',sans-serif] text-[12px] text-tp-slate-400", children: svc.toothFdi === "full-mouth" ? "Full Mouth" : `T${svc.toothFdi} — ${svc.toothLabel}` })] }), _jsxs("td", { className: "px-[12px] py-[10px] text-right font-['Inter',sans-serif] text-[12px] text-tp-slate-700", children: [formatINR(svc.rate), svc.discount > 0 && (_jsxs("p", { className: "font-['Inter',sans-serif] text-[12px] text-tp-error-500", children: ["-", formatINR(svc.discount)] }))] })] }, svc.id))) })] }), _jsxs("div", { className: "border-t border-tp-slate-200 bg-tp-slate-50/50 px-[12px] py-[10px] space-y-[4px]", children: [_jsxs("div", { className: "flex justify-between font-['Inter',sans-serif] text-[12px]", children: [_jsx("span", { className: "text-tp-slate-500", children: "Subtotal" }), _jsx("span", { className: "text-tp-slate-700", children: formatINR(subtotal) })] }), discount > 0 && (_jsxs("div", { className: "flex justify-between font-['Inter',sans-serif] text-[12px]", children: [_jsx("span", { className: "text-tp-slate-500", children: "Discount" }), _jsxs("span", { className: "text-tp-error-500", children: ["-", formatINR(discount)] })] })), _jsxs("div", { className: "flex justify-between font-['Inter',sans-serif] text-[13px] font-bold pt-[4px] border-t border-tp-slate-200", children: [_jsx("span", { className: "text-tp-slate-800", children: "Total" }), _jsx("span", { className: "text-tp-blue-700", children: formatINR(total) })] })] })] })] })) })] }) }));
}
