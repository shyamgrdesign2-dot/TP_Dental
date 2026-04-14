"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Heart, Calendar } from "lucide-react";
import { CopyButton } from "../CopyButton";
import { PanelEmptyState } from "../ExpandedPanel";
/**
 * Gynaecological History Panel
 * ────────────────────────────
 * Displays gynaecological records including menstrual history and screenings.
 *
 * Display rules:
 *   - LMP prominently displayed with cycle info
 *   - Pap smear results: Normal (green), Abnormal (red)
 *   - Menstrual regularity indicator
 *   - Complaints and diagnosis with copy support
 */
function formatDate(d) {
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function GynecCard({ entry, onCopyToRxPad }) {
    const source = `Gynec — ${formatDate(entry.date)}`;
    const mh = entry.menstrualHistory;
    return (_jsxs("details", { open: true, className: "group/gyn mb-3 last:mb-0", children: [_jsxs("summary", { className: "flex cursor-pointer items-center gap-2 rounded-lg border border-tp-slate-200 bg-white px-3 py-2.5 hover:bg-tp-slate-50 transition-colors [&::-webkit-details-marker]:hidden list-none group-open/gyn:rounded-b-none group-open/gyn:border-b-0", children: [_jsx(Calendar, { size: 14, className: "shrink-0 text-tp-blue-500" }), _jsx("span", { className: "flex-1 text-[13px] font-semibold text-tp-slate-900", children: formatDate(entry.date) })] }), _jsxs("div", { className: "rounded-b-lg border border-t-0 border-tp-slate-200 bg-white p-3 space-y-3", children: [_jsxs("div", { children: [_jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-tp-slate-500 mb-1.5 block", children: "Menstrual History" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [mh.lmp && (_jsxs("div", { className: "rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2", children: [_jsx("span", { className: "text-[10px] text-tp-slate-500", children: "LMP" }), _jsx("p", { className: "text-xs font-semibold text-tp-slate-800", children: formatDate(mh.lmp) })] })), _jsxs("div", { className: "rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2", children: [_jsx("span", { className: "text-[10px] text-tp-slate-500", children: "Cycle" }), _jsxs("p", { className: "text-xs font-semibold text-tp-slate-800", children: [mh.cycleLength ? `${mh.cycleLength} days` : "—", " / ", mh.duration ? `${mh.duration} days` : "—"] })] }), _jsxs("div", { className: "rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2", children: [_jsx("span", { className: "text-[10px] text-tp-slate-500", children: "Regularity" }), _jsx("p", { className: `text-xs font-semibold ${mh.regularity === "Regular" ? "text-tp-success-600" : "text-tp-warning-600"}`, children: mh.regularity })] }), _jsxs("div", { className: "rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2", children: [_jsx("span", { className: "text-[10px] text-tp-slate-500", children: "Flow" }), _jsx("p", { className: `text-xs font-semibold ${mh.flow === "Heavy" ? "text-tp-warning-600" : "text-tp-slate-800"}`, children: mh.flow })] })] }), mh.dysmenorrhea && (_jsx("p", { className: "mt-1.5 text-[11px] text-tp-warning-600", children: "Dysmenorrhea present" })), mh.notes && (_jsx("p", { className: "mt-1 text-[11px] italic text-tp-slate-400", children: mh.notes }))] }), entry.papSmear && (_jsxs("div", { children: [_jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-tp-slate-500 mb-1 block", children: "Pap Smear" }), _jsx("div", { className: "rounded-lg border border-tp-slate-200 bg-white px-2.5 py-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[11px] text-tp-slate-500", children: formatDate(entry.papSmear.date) }), _jsx("span", { className: `text-xs font-medium ${entry.papSmear.result.toLowerCase().includes("normal") ? "text-tp-success-600" : "text-tp-error-600"}`, children: entry.papSmear.result })] }) })] })), entry.contraception && (_jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx("span", { className: "text-tp-slate-500", children: "Contraception:" }), _jsx("span", { className: "font-medium text-tp-slate-800", children: entry.contraception })] })), entry.diagnosis && entry.diagnosis.length > 0 && (_jsxs("div", { children: [_jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-tp-slate-500 mb-1 block", children: "Diagnosis" }), entry.diagnosis.map((d, i) => (_jsxs("div", { className: "group/item flex items-start gap-2 py-0.5", children: [_jsx("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-tp-slate-400" }), _jsx("span", { className: "flex-1 text-xs text-tp-slate-700", children: d }), _jsx(CopyButton, { onCopy: () => onCopyToRxPad?.({ target: "diagnosis", items: [d], source }), size: 12 })] }, i)))] }))] })] }));
}
export function GynecPanel({ entries, onCopyToRxPad, }) {
    if (!entries.length) {
        return (_jsx(PanelEmptyState, { icon: _jsx(Heart, { size: 32 }), message: "No gynaecological records", description: "Gynaecological history will appear here" }));
    }
    return (_jsx("div", { children: entries.map((entry) => (_jsx(GynecCard, { entry: entry, onCopyToRxPad: onCopyToRxPad }, entry.id))) }));
}
