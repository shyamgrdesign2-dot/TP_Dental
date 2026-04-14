"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FlaskConical, ArrowUp, ArrowDown } from "lucide-react";
import { CopyButton, CopySectionButton } from "../CopyButton";
import { PanelEmptyState } from "../ExpandedPanel";
import { LAB_RESULT_RULES } from "../types";
/**
 * Lab Results Panel
 * ─────────────────
 * Displays lab test results grouped by report/category.
 *
 * Display rules:
 *   - Grouped by report date and category (Hematology, Biochemistry, etc.)
 *   - Most recent reports first
 *   - Each test shows: Name, Value, Unit, Reference Range, Status
 *   - Status coloring:
 *     Normal — default text, no highlight
 *     Abnormal — amber text, bold
 *     Critical — red text, bold, red left border
 *     Pending — muted italic
 *   - High/Low flags shown as ↑↓ arrows with color coding
 *   - Abnormal values get a subtle colored background
 *   - Report header shows lab name and ordering doctor
 */
function formatDate(d) {
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function FlagIcon({ flag }) {
    if (!flag)
        return null;
    const isHigh = flag.includes("High");
    return (_jsxs("span", { className: `inline-flex items-center gap-0.5 text-[10px] font-semibold ${isHigh ? "text-tp-error-500" : "text-tp-blue-500"}`, children: [isHigh ? _jsx(ArrowUp, { size: 10 }) : _jsx(ArrowDown, { size: 10 }), flag.includes("Critical") ? "!!" : ""] }));
}
function TestRow({ test, onCopy, }) {
    const rule = LAB_RESULT_RULES[test.status];
    return (_jsxs("div", { className: `
      group/item flex items-center gap-2 border-b border-tp-slate-100 px-2 py-1.5 last:border-0
      ${test.status === "Critical" ? "bg-tp-error-50/50 border-l-2 border-l-tp-error-400" :
            test.status === "Abnormal" ? "bg-tp-warning-50/30" : ""}
    `, children: [_jsx("div", { className: "flex-1 min-w-0", children: _jsx("span", { className: `text-xs ${rule.style}`, children: test.testName }) }), _jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [_jsx("span", { className: `text-xs font-semibold tabular-nums ${rule.style}`, children: test.value }), _jsx(FlagIcon, { flag: test.flag }), _jsx("span", { className: "text-[10px] text-tp-slate-400", children: test.unit })] }), _jsx("span", { className: "text-[10px] text-tp-slate-400 shrink-0 min-w-[60px] text-right", children: test.referenceRange }), _jsx(CopyButton, { onCopy: onCopy, size: 12 })] }));
}
function LabReportCard({ report, onCopyToRxPad, }) {
    const source = `Lab — ${formatDate(report.date)}`;
    const hasAbnormal = report.tests.some(t => t.status === "Abnormal" || t.status === "Critical");
    return (_jsxs("details", { open: true, className: "group/lab mb-3 last:mb-0", children: [_jsxs("summary", { className: `
        flex cursor-pointer items-center gap-2 rounded-lg
        border bg-white px-3 py-2.5
        hover:bg-tp-slate-50 transition-colors
        [&::-webkit-details-marker]:hidden list-none
        group-open/lab:rounded-b-none group-open/lab:border-b-0
        ${hasAbnormal ? "border-tp-warning-200" : "border-tp-slate-200"}
      `, children: [_jsx(FlaskConical, { size: 14, className: hasAbnormal ? "text-tp-warning-500" : "text-tp-blue-500" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[13px] font-semibold text-tp-slate-900", children: report.category }), hasAbnormal && (_jsx("span", { className: "rounded-full bg-tp-warning-50 px-1.5 py-0.5 text-[10px] font-semibold text-tp-warning-600", children: "Abnormal" }))] }), _jsxs("p", { className: "text-[11px] text-tp-slate-500", children: [formatDate(report.date), report.labName ? ` — ${report.labName}` : ""] })] }), _jsx(CopySectionButton, { label: "Copy All", onCopy: () => onCopyToRxPad?.({
                            target: "lab-investigations",
                            items: report.tests.map(t => `${t.testName}: ${t.value} ${t.unit} (Ref: ${t.referenceRange})`),
                            source,
                        }) })] }), _jsxs("div", { className: "rounded-b-lg border border-t-0 border-tp-slate-200 bg-white overflow-hidden", children: [_jsxs("div", { className: "flex items-center gap-2 bg-tp-slate-50 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-tp-slate-500", children: [_jsx("span", { className: "flex-1", children: "Test" }), _jsx("span", { className: "shrink-0", children: "Result" }), _jsx("span", { className: "shrink-0 min-w-[60px] text-right", children: "Ref. Range" }), _jsx("span", { className: "w-6" })] }), report.tests.map((test) => (_jsx(TestRow, { test: test, onCopy: () => onCopyToRxPad?.({
                            target: "lab-investigations",
                            items: [`${test.testName}: ${test.value} ${test.unit}`],
                            source,
                        }) }, test.id)))] })] }));
}
export function LabResultsPanel({ reports, onCopyToRxPad, }) {
    if (!reports.length) {
        return (_jsx(PanelEmptyState, { icon: _jsx(FlaskConical, { size: 32 }), message: "No lab results", description: "Laboratory test results will appear here" }));
    }
    return (_jsx("div", { children: reports.map((report) => (_jsx(LabReportCard, { report: report, onCopyToRxPad: onCopyToRxPad }, report.id))) }));
}
