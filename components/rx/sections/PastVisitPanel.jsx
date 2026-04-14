"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, HeartPulse, Award, Pill, ClipboardList, ChevronRight } from "lucide-react";
import { CopyButton, CopySectionButton } from "../CopyButton";
import { PanelEmptyState } from "../ExpandedPanel";
/**
 * Past Visit Panel
 * ─────────────────
 * Displays chronological list of past visits with full clinical details.
 *
 * Display rules:
 *   - Most recent visit is shown first (descending date order)
 *   - Each visit is a collapsible card with date + visit type header
 *   - Sections within a visit: Symptoms, Examination, Diagnosis, Medications, Advices
 *   - Every item has a copy-to-RxPad button (visible on hover, always on touch)
 *   - Section headers have "Copy All" to copy entire section
 *   - Date header has a copy icon that copies the entire visit
 *   - Visit type chips: OPD (blue), IPD (violet), Emergency (red), Teleconsult (amber)
 *
 * Color coding:
 *   - Visit card: white bg, 1px slate-200 border, radius 10px
 *   - Date: TP Slate 900, 13px semibold
 *   - Doctor name: TP Slate 500, 11px medium
 *   - Section titles: TP Slate 500, 11px uppercase tracking
 *   - Items: TP Slate 800, 12px regular
 *   - Dividers: TP Slate 100
 */
const visitTypeStyles = {
    OPD: "bg-tp-blue-50 text-tp-blue-600",
    IPD: "bg-tp-violet-50 text-tp-violet-600",
    Emergency: "bg-tp-error-50 text-tp-error-600",
    Teleconsult: "bg-tp-warning-50 text-tp-warning-600",
};
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}
function VisitItemRow({ text, onCopy, }) {
    return (_jsxs("div", { className: "group/item flex items-start gap-2 py-0.5", children: [_jsx("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-tp-slate-400" }), _jsx("span", { className: "flex-1 text-xs text-tp-slate-700 leading-relaxed", children: text }), _jsx(CopyButton, { onCopy: onCopy, size: 12, tooltip: "Copy to RxPad" })] }));
}
function MedicationRow({ med, onCopy, }) {
    return (_jsxs("div", { className: "group/item flex items-start gap-2 py-1 border-b border-tp-slate-100 last:border-0", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-xs font-medium text-tp-slate-800", children: med.name }), _jsxs("p", { className: "text-[11px] text-tp-slate-500", children: [med.dosage, " \u00B7 ", med.frequency, " \u00B7 ", med.duration] })] }), _jsx(CopyButton, { onCopy: onCopy, size: 12, tooltip: "Copy medication" })] }));
}
function VisitCard({ visit, onCopyToRxPad, }) {
    const sourceLabel = `Past Visit — ${formatDate(visit.date)}`;
    return (_jsxs("details", { open: true, className: "group/visit mb-3 last:mb-0", children: [_jsxs("summary", { className: "\n        flex cursor-pointer items-center gap-2 rounded-t-[10px] bg-white\n        border border-tp-slate-200 px-3 py-2.5\n        hover:bg-tp-slate-50 transition-colors\n        [&::-webkit-details-marker]:hidden list-none\n        group-open/visit:rounded-b-none group-open/visit:border-b-0\n      ", children: [_jsx(Calendar, { size: 16, className: "shrink-0 text-tp-blue-500" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[13px] font-semibold text-tp-slate-900", children: formatDate(visit.date) }), _jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] font-semibold ${visitTypeStyles[visit.visitType]}`, children: visit.visitType })] }), _jsxs("p", { className: "text-[11px] text-tp-slate-500 mt-0.5", children: [visit.doctorName, visit.speciality ? ` — ${visit.speciality}` : ""] })] }), _jsx(CopyButton, { onCopy: () => onCopyToRxPad?.({
                            target: "symptoms",
                            items: [...visit.symptoms, ...visit.examination, ...visit.diagnosis.map(d => d)],
                            source: sourceLabel,
                        }), tooltip: "Copy entire visit to RxPad", showOnHover: false, size: 14 }), _jsx(ChevronRight, { size: 14, className: "shrink-0 text-tp-slate-400 transition-transform group-open/visit:rotate-90" })] }), _jsxs("div", { className: "rounded-b-[10px] border border-t-0 border-tp-slate-200 bg-white px-3 py-2 space-y-3", children: [visit.symptoms.length > 0 && (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(HeartPulse, { size: 13, className: "text-tp-slate-400" }), _jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-tp-slate-500", children: "Symptoms" })] }), _jsx(CopySectionButton, { label: "Copy All", onCopy: () => onCopyToRxPad?.({
                                            target: "symptoms",
                                            items: visit.symptoms,
                                            source: sourceLabel,
                                        }) })] }), visit.symptoms.map((s, i) => (_jsx(VisitItemRow, { text: s, onCopy: () => onCopyToRxPad?.({ target: "symptoms", items: [s], source: sourceLabel }) }, i)))] })), visit.examination.length > 0 && (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Award, { size: 13, className: "text-tp-slate-400" }), _jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-tp-slate-500", children: "Examination" })] }), _jsx(CopySectionButton, { label: "Copy All", onCopy: () => onCopyToRxPad?.({
                                            target: "examinations",
                                            items: visit.examination,
                                            source: sourceLabel,
                                        }) })] }), visit.examination.map((e, i) => (_jsx(VisitItemRow, { text: e, onCopy: () => onCopyToRxPad?.({ target: "examinations", items: [e], source: sourceLabel }) }, i)))] })), visit.diagnosis.length > 0 && (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(ClipboardList, { size: 13, className: "text-tp-slate-400" }), _jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-tp-slate-500", children: "Diagnosis" })] }), _jsx(CopySectionButton, { label: "Copy All", onCopy: () => onCopyToRxPad?.({
                                            target: "diagnosis",
                                            items: visit.diagnosis,
                                            source: sourceLabel,
                                        }) })] }), visit.diagnosis.map((d, i) => (_jsx(VisitItemRow, { text: d, onCopy: () => onCopyToRxPad?.({ target: "diagnosis", items: [d], source: sourceLabel }) }, i)))] })), visit.medications.length > 0 && (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Pill, { size: 13, className: "text-tp-slate-400" }), _jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-tp-slate-500", children: "Medications" })] }), _jsx(CopySectionButton, { label: "Copy All", onCopy: () => onCopyToRxPad?.({
                                            target: "medications",
                                            items: visit.medications.map(m => `${m.name} ${m.dosage} ${m.frequency} ${m.duration}`),
                                            source: sourceLabel,
                                        }) })] }), visit.medications.map((m, i) => (_jsx(MedicationRow, { med: m, onCopy: () => onCopyToRxPad?.({
                                    target: "medications",
                                    items: [`${m.name} ${m.dosage} ${m.frequency} ${m.duration}`],
                                    source: sourceLabel,
                                }) }, i)))] })), visit.advices && visit.advices.length > 0 && (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-tp-slate-500", children: "Advices" }), _jsx(CopySectionButton, { label: "Copy All", onCopy: () => onCopyToRxPad?.({
                                            target: "advices",
                                            items: visit.advices,
                                            source: sourceLabel,
                                        }) })] }), visit.advices.map((a, i) => (_jsx(VisitItemRow, { text: a, onCopy: () => onCopyToRxPad?.({ target: "advices", items: [a], source: sourceLabel }) }, i)))] })), visit.followUp && (_jsxs("div", { className: "flex items-center gap-2 rounded-lg bg-tp-blue-50/60 px-2.5 py-1.5", children: [_jsx(Calendar, { size: 13, className: "text-tp-blue-500" }), _jsxs("span", { className: "text-[11px] font-medium text-tp-blue-600", children: ["Follow-up: ", visit.followUp] })] })), visit.notes && (_jsx("p", { className: "text-[11px] italic text-tp-slate-500 border-t border-tp-slate-100 pt-2", children: visit.notes }))] })] }));
}
export function PastVisitPanel({ visits, onCopyToRxPad, }) {
    if (!visits.length) {
        return (_jsx(PanelEmptyState, { icon: _jsx(Calendar, { size: 32 }), message: "No past visits", description: "Previous consultations will appear here" }));
    }
    return (_jsx("div", { className: "space-y-0", children: visits.map((visit) => (_jsx(VisitCard, { visit: visit, onCopyToRxPad: onCopyToRxPad }, visit.id))) }));
}
