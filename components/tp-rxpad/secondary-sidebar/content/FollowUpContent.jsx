import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Follow-up content panel — matches Figma DetailedSectionView (Follow-up).
 * Shows a date input with calendar icon and quick-select buttons.
 */
import React from "react";
import layout from "./sidebarContentLayout.module.scss";
// ─── Quick select chip ────────────────────────────────────────────────────────
function QuickChip({ label }) {
    return (_jsxs("div", { className: layout.quickChip, children: [_jsx("div", { className: layout.quickChipClip, children: _jsx("div", { className: layout.quickChipInner, children: _jsx("p", { className: layout.quickChipLabel, children: label }) }) }), _jsx("div", { "aria-hidden": "true", className: layout.quickChipOutline })] }));
}
// ─── Calendar icon (SVG) ──────────────────────────────────────────────────────
function CalendarIcon() {
    return (_jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", className: layout.svgShrink, children: [_jsx("rect", { x: "2", y: "4", width: "16", height: "14", rx: "2", stroke: "var(--tp-slate-700)", strokeWidth: "1.2" }), _jsx("path", { d: "M2 8h16", stroke: "var(--tp-slate-700)", strokeWidth: "1.2" }), _jsx("path", { d: "M6 2v4M14 2v4", stroke: "var(--tp-slate-700)", strokeWidth: "1.2", strokeLinecap: "round" }), _jsx("rect", { x: "5", y: "11", width: "2", height: "2", rx: "0.5", fill: "var(--tp-slate-700)" }), _jsx("rect", { x: "9", y: "11", width: "2", height: "2", rx: "0.5", fill: "var(--tp-slate-700)" }), _jsx("rect", { x: "13", y: "11", width: "2", height: "2", rx: "0.5", fill: "var(--tp-slate-700)" }), _jsx("rect", { x: "5", y: "14", width: "2", height: "2", rx: "0.5", fill: "var(--tp-slate-700)" }), _jsx("rect", { x: "9", y: "14", width: "2", height: "2", rx: "0.5", fill: "var(--tp-slate-700)" })] }));
}
// ─── Public export ────────────────────────────────────────────────────────────
export function FollowUpContent() {
    return (_jsx("div", { className: layout.followPage, children: _jsxs("div", { className: layout.followStack, children: [_jsx("div", { className: layout.followFieldRow, children: _jsxs("div", { className: layout.followInputShell, children: [_jsx("div", { className: layout.followInputClip, children: _jsxs("div", { className: layout.followInputInner, children: [_jsx("p", { className: layout.followPlaceholder, children: "Enter follow-up date" }), _jsx(CalendarIcon, {})] }) }), _jsx("div", { "aria-hidden": "true", className: layout.followBorder })] }) }), _jsxs("div", { className: layout.chipsRow, children: [_jsx(QuickChip, { label: "2 days" }), _jsx(QuickChip, { label: "2 weeks" }), _jsx(QuickChip, { label: "2 Months" })] })] }) }));
}
