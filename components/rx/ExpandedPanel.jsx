"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import { ArrowLeft, XCircle } from "lucide-react";
/**
 * Base expanded panel container for sidebar sections.
 *
 * Layout rules:
 *   - Width: 360px on desktop, 320px on tablet, full on mobile
 *   - Background: TP Slate 0 (white)
 *   - Border: 1px TP Slate 200 right edge
 *   - Border radius: 0 (flush with sidebar)
 *   - Shadow: shadow-2 on right edge for depth
 *   - Header: 56px height, sticky top, divider below
 *   - Content: scrollable, padding 16px
 *   - Animation: slide-in from left, 200ms ease-out
 *
 * Design tokens:
 *   - Header bg: TP Slate 0
 *   - Header text: TP Slate 900 (title), TP Slate 500 (count)
 *   - Close button: TP Slate 400 → TP Slate 600 on hover
 *   - Divider: TP Slate 200
 *   - Content bg: TP Slate 50
 */
export function ExpandedPanel({ sectionId, title, icon, isOpen, onClose, count, subtitle, headerActions, children, }) {
    const panelRef = useRef(null);
    // Focus trap — focus panel when opened
    useEffect(() => {
        if (isOpen && panelRef.current) {
            panelRef.current.focus();
        }
    }, [isOpen]);
    if (!isOpen)
        return null;
    return (_jsxs("div", { ref: panelRef, role: "complementary", "aria-label": `${title} panel`, "data-section": sectionId, tabIndex: -1, className: "\n        flex h-full w-[360px] flex-col\n        border-r border-tp-slate-200\n        bg-tp-slate-0\n        shadow-[2px_0_8px_-2px_rgba(23,23,37,0.08)]\n        outline-none\n        animate-in slide-in-from-left-2 duration-200\n        max-lg:w-[320px] max-md:w-full\n      ", children: [_jsxs("div", { className: "flex h-14 shrink-0 items-center gap-3 border-b border-tp-slate-200 px-4", children: [_jsx("button", { type: "button", onClick: onClose, className: "\n            flex items-center justify-center rounded-lg p-1.5\n            text-tp-slate-400 transition-colors\n            hover:bg-tp-slate-100 hover:text-tp-slate-600\n          ", "aria-label": "Close panel", children: _jsx(ArrowLeft, { size: 18 }) }), icon && (_jsx("span", { className: "flex items-center justify-center text-tp-blue-500", children: icon })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h2", { className: "truncate text-sm font-semibold text-tp-slate-900", style: { fontFamily: "var(--font-heading)" }, children: title }), count !== undefined && count > 0 && (_jsx("span", { className: "inline-flex items-center justify-center rounded-full bg-tp-blue-50 px-2 py-0.5 text-[11px] font-semibold text-tp-blue-600", children: count }))] }), subtitle && (_jsx("p", { className: "truncate text-[11px] text-tp-slate-400", children: subtitle }))] }), headerActions && (_jsx("div", { className: "flex items-center gap-1", children: headerActions })), _jsx("button", { type: "button", onClick: onClose, className: "\n            flex items-center justify-center rounded-lg p-1.5\n            text-tp-slate-300 transition-colors\n            hover:bg-tp-slate-100 hover:text-tp-slate-500\n            max-md:hidden\n          ", "aria-label": "Close panel", children: _jsx(XCircle, { size: 18 }) })] }), _jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden bg-tp-slate-50/50", children: _jsx("div", { className: "p-4", children: children }) })] }));
}
/**
 * Sub-section header within an expanded panel.
 * Used for grouping related data (e.g., "Allergies", "Chronic Conditions").
 */
export function PanelSubSection({ title, count, actions, children, defaultOpen = true, }) {
    return (_jsxs("details", { open: defaultOpen, className: "group/section mb-4 last:mb-0", children: [_jsxs("summary", { className: "\n        flex cursor-pointer items-center gap-2 rounded-lg px-1 py-2\n        text-xs font-semibold uppercase tracking-wider text-tp-slate-500\n        hover:text-tp-slate-700\n        [&::-webkit-details-marker]:hidden\n        list-none\n      ", children: [_jsx("svg", { className: "h-3 w-3 shrink-0 transition-transform group-open/section:rotate-90", fill: "none", viewBox: "0 0 12 12", children: _jsx("path", { d: "M4.5 2.5L8 6L4.5 9.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }), _jsx("span", { children: title }), count !== undefined && (_jsx("span", { className: "rounded-full bg-tp-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-tp-slate-600", children: count })), actions && (_jsx("span", { className: "ml-auto flex items-center gap-1", children: actions }))] }), _jsx("div", { className: "mt-1 pl-5", children: children })] }));
}
/**
 * Data row within a panel — single key-value pair or labeled content.
 * Supports copy-on-hover behavior.
 */
export function PanelDataRow({ label, value, highlight, className = "", children, }) {
    const highlightStyles = {
        normal: "",
        warning: "text-tp-warning-600",
        critical: "text-tp-error-600 font-semibold",
        info: "text-tp-blue-600",
    };
    return (_jsxs("div", { className: `group flex items-start gap-2 py-1 text-sm ${className}`, children: [label && (_jsx("span", { className: "shrink-0 text-tp-slate-500 min-w-[100px] text-xs", children: label })), value && (_jsx("span", { className: `flex-1 text-tp-slate-800 text-xs ${highlight ? highlightStyles[highlight] : ""}`, children: value })), children] }));
}
/**
 * Empty state for panels with no data.
 */
export function PanelEmptyState({ icon, message = "No data available", description, }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [icon && (_jsx("div", { className: "mb-3 text-tp-slate-300", children: icon })), _jsx("p", { className: "text-sm font-medium text-tp-slate-500", children: message }), description && (_jsx("p", { className: "mt-1 text-xs text-tp-slate-400", children: description }))] }));
}
