import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Empty state content panel — shown when there are no records for a section.
 */
import React from "react";
import layout from "./sidebarContentLayout.module.scss";
export function EmptyStateContent({ sectionLabel }) {
    return (_jsxs("div", { className: layout.emptyRoot, children: [_jsx("div", { className: layout.emptyIconWrap, children: _jsxs("svg", { width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", children: [_jsx("path", { d: "M26.667 12H5.333A2.667 2.667 0 0 0 2.667 14.667v10.666A2.667 2.667 0 0 0 5.333 28h21.334a2.667 2.667 0 0 0 2.666-2.667V14.667A2.667 2.667 0 0 0 26.667 12Z", fill: "var(--tp-slate-200)" }), _jsx("path", { d: "M10.667 12V9.333a5.333 5.333 0 0 1 10.666 0V12", stroke: "var(--tp-blue-300)", strokeWidth: "2", strokeLinecap: "round" }), _jsx("circle", { cx: "16", cy: "20", r: "2", fill: "var(--tp-blue-300)" })] }) }), _jsxs("div", { className: layout.emptyTextStack, children: [_jsxs("p", { className: layout.emptyHeading, children: ["No ", sectionLabel, " Records"] }), _jsxs("p", { className: layout.emptyBody, children: ["No ", sectionLabel.toLowerCase(), " data has been recorded for this patient yet."] })] }), _jsxs("button", { type: "button", className: layout.emptyCta, children: [_jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: _jsx("path", { d: "M6 1v10M1 6h10", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" }) }), "Add ", sectionLabel] })] }));
}
