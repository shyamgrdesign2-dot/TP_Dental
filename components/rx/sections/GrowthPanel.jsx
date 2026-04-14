"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Ruler, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { CopyButton } from "../CopyButton";
import { PanelEmptyState } from "../ExpandedPanel";
/**
 * Growth Panel
 * ────────────
 * Displays growth records with weight/height/BMI tracking over time.
 *
 * Display rules:
 *   - Most recent record first
 *   - BMI color coding: <18.5 (blue/underweight), 18.5-24.9 (green/normal),
 *     25-29.9 (amber/overweight), ≥30 (red/obese)
 *   - Weight trend indicators (↑↓) compared to previous measurement
 *   - For pediatric patients: percentile charts (placeholder for graph)
 *   - Grid layout for metrics
 */
function formatDate(d) {
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function getBmiCategory(bmi) {
    if (bmi < 18.5)
        return { label: "Underweight", style: "text-tp-blue-600 bg-tp-blue-50" };
    if (bmi < 25)
        return { label: "Normal", style: "text-tp-success-600 bg-tp-success-50" };
    if (bmi < 30)
        return { label: "Overweight", style: "text-tp-warning-600 bg-tp-warning-50" };
    return { label: "Obese", style: "text-tp-error-600 bg-tp-error-50" };
}
function GrowthCard({ record, prevRecord, isLatest, onCopyToRxPad, }) {
    const source = `Growth — ${formatDate(record.date)}`;
    const weightDiff = prevRecord ? record.weight - prevRecord.weight : null;
    const bmiCat = record.bmi ? getBmiCategory(record.bmi) : null;
    return (_jsxs("div", { className: `mb-3 rounded-lg border bg-white p-3 last:mb-0 ${isLatest ? "border-tp-blue-200" : "border-tp-slate-200"}`, children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Calendar, { size: 14, className: "text-tp-blue-500" }), _jsx("span", { className: "flex-1 text-[13px] font-semibold text-tp-slate-900", children: formatDate(record.date) }), isLatest && (_jsx("span", { className: "rounded-full bg-tp-success-50 px-2 py-0.5 text-[10px] font-semibold text-tp-success-600", children: "Latest" })), _jsx(CopyButton, { onCopy: () => onCopyToRxPad?.({
                            target: "vitals",
                            items: [`Weight: ${record.weight}kg, Height: ${record.height}cm${record.bmi ? `, BMI: ${record.bmi}` : ""}`],
                            source,
                        }), showOnHover: false, size: 14 })] }), _jsxs("div", { className: "grid grid-cols-3 gap-2", children: [_jsxs("div", { className: "rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2", children: [_jsx("span", { className: "text-[10px] text-tp-slate-500", children: "Weight" }), _jsxs("div", { className: "flex items-baseline gap-1", children: [_jsx("span", { className: "text-sm font-bold text-tp-slate-800", children: record.weight }), _jsx("span", { className: "text-[10px] text-tp-slate-400", children: "kg" }), weightDiff !== null && weightDiff !== 0 && (_jsxs("span", { className: `flex items-center text-[10px] font-medium ${weightDiff > 0 ? "text-tp-warning-600" : "text-tp-success-600"}`, children: [weightDiff > 0 ? _jsx(TrendingUp, { size: 10 }) : _jsx(TrendingDown, { size: 10 }), Math.abs(weightDiff).toFixed(1)] }))] })] }), _jsxs("div", { className: "rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2", children: [_jsx("span", { className: "text-[10px] text-tp-slate-500", children: "Height" }), _jsxs("div", { className: "flex items-baseline gap-1", children: [_jsx("span", { className: "text-sm font-bold text-tp-slate-800", children: record.height }), _jsx("span", { className: "text-[10px] text-tp-slate-400", children: "cm" })] })] }), record.bmi && bmiCat && (_jsxs("div", { className: `rounded-lg border px-2.5 py-2 ${bmiCat.style.includes("bg-") ? "" : "border-tp-slate-200 bg-tp-slate-50"}`, style: bmiCat.style.includes("bg-") ? {} : undefined, children: [_jsx("span", { className: "text-[10px] text-tp-slate-500", children: "BMI" }), _jsx("div", { className: "flex items-baseline gap-1", children: _jsx("span", { className: `text-sm font-bold ${bmiCat.style.split(" ").find(s => s.startsWith("text-"))}`, children: record.bmi }) }), _jsx("span", { className: `text-[10px] font-medium ${bmiCat.style.split(" ").find(s => s.startsWith("text-"))}`, children: bmiCat.label })] })), record.headCircumference && (_jsxs("div", { className: "rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2", children: [_jsx("span", { className: "text-[10px] text-tp-slate-500", children: "Head Circ." }), _jsxs("div", { className: "flex items-baseline gap-1", children: [_jsx("span", { className: "text-sm font-bold text-tp-slate-800", children: record.headCircumference }), _jsx("span", { className: "text-[10px] text-tp-slate-400", children: "cm" })] })] }))] }), record.notes && (_jsx("p", { className: "mt-2 text-[11px] italic text-tp-slate-500 border-t border-tp-slate-100 pt-2", children: record.notes }))] }));
}
export function GrowthPanel({ records, onCopyToRxPad, }) {
    if (!records.length) {
        return (_jsx(PanelEmptyState, { icon: _jsx(Ruler, { size: 32 }), message: "No growth records", description: "Growth measurements will appear here" }));
    }
    return (_jsx("div", { children: records.map((record, idx) => (_jsx(GrowthCard, { record: record, prevRecord: records[idx + 1], isLatest: idx === 0, onCopyToRxPad: onCopyToRxPad }, record.id))) }));
}
