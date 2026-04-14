"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ShieldCheck, Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { CopyButton } from "../CopyButton";
import { PanelSubSection, PanelEmptyState } from "../ExpandedPanel";
import { VACCINE_STATUS_RULES } from "../types";
/**
 * Vaccination Panel
 * ─────────────────
 * Displays vaccination records grouped by category.
 *
 * Display rules:
 *   - Grouped by vaccine category (COVID-19, Influenza, Hepatitis, etc.)
 *   - Each vaccine shows dose number, date, and status
 *   - Status badges: Completed (green), Due (blue), Overdue (red), Scheduled (violet), Missed (muted strikethrough)
 *   - Overdue vaccines are ALWAYS highlighted with a red border
 *   - Timeline-style layout showing progression of doses
 */
function formatDate(d) {
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function StatusIcon({ status }) {
    switch (status) {
        case "Completed":
            return _jsx(CheckCircle, { size: 14, className: "text-tp-success-500" });
        case "Due":
            return _jsx(Clock, { size: 14, className: "text-tp-blue-500" });
        case "Overdue":
            return _jsx(AlertTriangle, { size: 14, className: "text-tp-error-500" });
        case "Scheduled":
            return _jsx(Calendar, { size: 14, className: "text-tp-violet-500" });
        case "Missed":
            return _jsx(AlertTriangle, { size: 14, className: "text-tp-slate-400" });
    }
}
function VaccineRow({ vaccine, onCopy }) {
    const rule = VACCINE_STATUS_RULES[vaccine.status];
    return (_jsxs("div", { className: `
      group/item flex items-start gap-2.5 rounded-lg border px-3 py-2 mb-2 last:mb-0
      ${vaccine.status === "Overdue" ? "border-tp-error-200 bg-tp-error-50/50" : "border-tp-slate-200 bg-white"}
    `, children: [_jsx(StatusIcon, { status: vaccine.status }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: `text-xs font-medium ${vaccine.status === "Missed" ? "text-tp-slate-500 line-through" : "text-tp-slate-800"}`, children: vaccine.dose }), _jsx("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-medium ${rule.style}`, children: vaccine.status })] }), _jsx("p", { className: "text-[11px] text-tp-slate-500 mt-0.5", children: vaccine.dateAdministered
                            ? formatDate(vaccine.dateAdministered)
                            : vaccine.scheduledDate
                                ? `Scheduled: ${formatDate(vaccine.scheduledDate)}`
                                : "No date" }), vaccine.batchNumber && (_jsxs("p", { className: "text-[10px] text-tp-slate-400", children: ["Batch: ", vaccine.batchNumber] })), vaccine.site && (_jsxs("p", { className: "text-[10px] text-tp-slate-400", children: ["Site: ", vaccine.site] }))] }), _jsx(CopyButton, { onCopy: onCopy, size: 12 })] }));
}
export function VaccinePanel({ categories, onCopyToRxPad, }) {
    if (!categories.length) {
        return (_jsx(PanelEmptyState, { icon: _jsx(ShieldCheck, { size: 32 }), message: "No vaccination records", description: "Vaccination history will appear here" }));
    }
    const source = "Vaccination Records";
    return (_jsx("div", { className: "space-y-1", children: categories.map((cat) => {
            const overdueCount = cat.vaccines.filter(v => v.status === "Overdue").length;
            return (_jsx(PanelSubSection, { title: cat.category, count: cat.vaccines.length, actions: overdueCount > 0 ? (_jsxs("span", { className: "rounded-full bg-tp-error-50 px-1.5 py-0.5 text-[10px] font-semibold text-tp-error-600", children: [overdueCount, " Overdue"] })) : undefined, children: cat.vaccines.map((vaccine) => (_jsx(VaccineRow, { vaccine: vaccine, onCopy: () => onCopyToRxPad?.({
                        target: "notes",
                        items: [`${cat.category} — ${vaccine.vaccineName} ${vaccine.dose}: ${vaccine.status}`],
                        source,
                    }) }, vaccine.id))) }, cat.category));
        }) }));
}
