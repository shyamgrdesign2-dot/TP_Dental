"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * plan-shared.tsx — Shared sub-components for the Treatment Plan module.
 */
import clsx from "clsx";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import dui from "../dental-ui.module.scss";
import { usePlanContext } from "./plan-context";
import { SURFACE_ABBR, SURFACE_COLORS, getPlanSurfaceLabel } from "./plan-types";
const PLAN_SURFACE_CHIP_CLASS = "inline-flex h-[18px] cursor-default items-center rounded-[4px] px-[5px] font-['Inter',sans-serif] text-[12px] font-bold text-white tabular-nums outline-none transition-[filter,box-shadow] duration-150 hover:brightness-110 hover:shadow-[0_0_0_2px_rgba(59,130,246,0.45)] focus-visible:shadow-[0_0_0_2px_var(--tp-blue-500,#3b82f6)]";
/** Abbreviated surface pills with hover ring + tooltip (full surface name). */
export function PlanSurfaceAbbrTags({ surfaces, gapClass = "gap-[3px]", wrap = false }) {
    if (!surfaces?.length)
        return null;
    const rowClass = clsx(wrap ? "flex flex-wrap items-center" : "flex items-center", gapClass);
    return (_jsx("div", { className: rowClass, children: surfaces.map((z, i) => {
            const label = getPlanSurfaceLabel(z);
            const abbr = SURFACE_ABBR[z] ?? (typeof z === "string" ? z.charAt(0).toUpperCase() : "?");
            const bg = SURFACE_COLORS[z] ?? "#94a3b8";
            return (_jsxs(Tooltip, { delayDuration: 200, children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("span", { tabIndex: 0, className: PLAN_SURFACE_CHIP_CLASS, style: { background: bg }, children: abbr }) }), _jsx(TooltipContent, { side: "top", sideOffset: 6, children: label })] }, `${String(z)}-${i}`));
        }) }));
}
// ─── Currency formatter ─────────────────────────────────────
export function formatINR(amount) {
    return `₹${amount.toLocaleString("en-IN")}`;
}
export function TabPill({ label, count, active, onClick }) {
    return (_jsxs("button", { type: "button", onClick: onClick, className: clsx(dui.tabPill, active && dui.tabPillActive), children: [label, _jsx("span", { className: clsx(dui.tabPillCount, active && dui.tabPillCountActive), children: count })] }));
}
export function SectionFrame({ children, className }) {
    const { embedInPatientShell } = usePlanContext();
    return (_jsx("div", { className: clsx(dui.sectionFrame, embedInPatientShell && dui.sectionFrameEmbed, className), children: children }));
}
export function EmptyState({ icon, title, description, action }) {
    return (_jsxs("div", { className: dui.emptyState, children: [_jsx("div", { className: dui.emptyIcon, children: icon }), _jsxs("div", { children: [_jsx("p", { className: dui.emptyTitle, children: title }), _jsx("p", { className: dui.emptyDesc, children: description })] }), action && _jsx("div", { className: dui.emptyAction, children: action })] }));
}
// ─── Clipboard-tick icon (for completed state) ─────────────
export function ClipboardTickIcon({ size = 24, className }) {
    return (_jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", className: className, children: [_jsx("path", { opacity: "0.4", d: "M16.24 3.65039H7.76004C5.29004 3.65039 3.29004 5.66039 3.29004 8.12039V17.5304C3.29004 19.9904 5.30004 22.0004 7.76004 22.0004H16.23C18.7 22.0004 20.7 19.9904 20.7 17.5304V8.12039C20.71 5.65039 18.7 3.65039 16.24 3.65039Z" }), _jsx("path", { d: "M14.3498 2H9.64977C8.60977 2 7.75977 2.84 7.75977 3.88V4.82C7.75977 5.86 8.59977 6.7 9.63977 6.7H14.3498C15.3898 6.7 16.2298 5.86 16.2298 4.82V3.88C16.2398 2.84 15.3898 2 14.3498 2Z" }), _jsx("path", { d: "M10.81 16.9506C10.62 16.9506 10.43 16.8806 10.28 16.7306L8.78 15.2306C8.49 14.9406 8.49 14.4606 8.78 14.1706C9.07 13.8806 9.55 13.8806 9.84 14.1706L10.81 15.1406L14.28 11.6706C14.57 11.3806 15.05 11.3806 15.34 11.6706C15.63 11.9606 15.63 12.4406 15.34 12.7306L11.34 16.7306C11.2 16.8806 11 16.9506 10.81 16.9506Z" })] }));
}
// ─── Close square icon (shared across drawers) ─────────────
export function CloseSquareIcon({ size = 24, color = "var(--tp-slate-700)" }) {
    return (_jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: color, xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" }) }));
}
export function DrawerHeader({ title, onClose, action, titleClassName }) {
    return (_jsxs("div", { className: dui.drawerHeader, children: [_jsx("button", { type: "button", onClick: onClose, className: dui.drawerCloseBtn, children: _jsx(CloseSquareIcon, { size: 24, color: "var(--tp-slate-700)" }) }), _jsx("div", { className: dui.drawerDivider }), _jsx("h2", { className: clsx(dui.drawerTitle, titleClassName), children: title }), action && _jsx("div", { className: dui.drawerAction, children: action })] }));
}
export function computePlanTotal(services) {
    return services.reduce((sum, s) => sum + s.amount, 0);
}
export function computePlanDiscount(services) {
    return services.reduce((sum, s) => sum + s.discount, 0);
}
export function getServiceWorkflowStatus(service) {
    if (service.status === "completed")
        return "completed";
    if (service.status === "no-show")
        return "no-show";
    if (service.status === "not-interested")
        return "not-interested";
    if (service.status === "cancelled")
        return "cancelled";
    if (service.status === "in-progress")
        return "in-progress";
    // Booked appointments do NOT count as activity — scheduling a visit is
    // intent, not execution. Consultations (Rx / end visit), sittings, or
    // procedures count as activity for the workflow chip.
    const consultCount = service.consultations?.length ?? 0;
    const hasActivity = consultCount > 0 || service.sittings.length > 0 || service.procedures.length > 0;
    return hasActivity ? "in-progress" : "not-started";
}
export function getPlanCompletionStatus(services) {
    if (services.length === 0)
        return "not-completed";
    const completedCount = services.filter((s) => s.status === "completed").length;
    if (completedCount === 0)
        return "not-completed";
    if (completedCount === services.length)
        return "completed";
    return "partially-completed";
}
