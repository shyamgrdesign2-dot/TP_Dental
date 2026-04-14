"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, HeartPulse, Scissors, Users } from "lucide-react";
import { CopyButton, CopySectionButton } from "../CopyButton";
import { PanelSubSection } from "../ExpandedPanel";
import { ALLERGY_SEVERITY_RULES } from "../types";
/**
 * Medical History Panel
 * ─────────────────────
 * Displays comprehensive medical history organized into sub-sections.
 *
 * Display rules:
 *   - ALLERGIES section ALWAYS appears first and is open by default
 *   - Severe allergies: Red border, red text, bold — NEVER collapse this section
 *   - Drug allergies get a special warning icon
 *   - Chronic conditions: Show status badge (Active/Resolved/In Remission)
 *   - Active conditions are highlighted, Resolved are muted
 *   - Surgical history: Timeline-style with date and procedure
 *   - Family history: Grouped by relation
 *   - Social history: Key-value grid layout
 */
function AllergyCard({ allergy, onCopy }) {
    const rule = ALLERGY_SEVERITY_RULES[allergy.severity];
    return (_jsxs("div", { className: `group/item flex items-start gap-2.5 rounded-lg border px-3 py-2 mb-2 last:mb-0 ${rule.style}`, children: [_jsx(AlertTriangle, { size: 16, className: `shrink-0 mt-0.5 ${allergy.severity === "severe" ? "text-tp-error-500" : "text-tp-warning-500"}` }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xs font-semibold", children: allergy.allergen }), _jsx("span", { className: `
            rounded-full px-1.5 py-0.5 text-[10px] font-medium
            ${allergy.severity === "severe" ? "bg-tp-error-100 text-tp-error-700" :
                                    allergy.severity === "moderate" ? "bg-tp-warning-100 text-tp-warning-700" :
                                        "bg-tp-slate-100 text-tp-slate-600"}
          `, children: allergy.severity }), _jsx("span", { className: "rounded-full bg-white/50 px-1.5 py-0.5 text-[10px] text-tp-slate-500", children: allergy.type })] }), _jsx("p", { className: "mt-0.5 text-[11px] opacity-80", children: allergy.reaction }), allergy.reportedDate && (_jsxs("p", { className: "mt-0.5 text-[10px] opacity-60", children: ["Reported: ", new Date(allergy.reportedDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })] }))] }), _jsx(CopyButton, { onCopy: onCopy, size: 12 })] }));
}
function ChronicConditionCard({ condition, onCopy }) {
    const statusStyles = {
        Active: "bg-tp-success-50 text-tp-success-600",
        Resolved: "bg-tp-slate-100 text-tp-slate-500",
        "In Remission": "bg-tp-blue-50 text-tp-blue-600",
    };
    return (_jsxs("div", { className: "group/item flex items-start gap-2.5 rounded-lg border border-tp-slate-200 bg-white px-3 py-2 mb-2 last:mb-0", children: [_jsx(HeartPulse, { size: 14, className: "shrink-0 mt-0.5 text-tp-slate-400" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xs font-medium text-tp-slate-800", children: condition.condition }), _jsx("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-medium ${statusStyles[condition.status]}`, children: condition.status })] }), _jsxs("p", { className: "text-[11px] text-tp-slate-500 mt-0.5", children: ["Since ", new Date(condition.diagnosedDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })] }), condition.medications && condition.medications.length > 0 && (_jsxs("p", { className: "text-[11px] text-tp-slate-500 mt-0.5", children: ["Rx: ", condition.medications.join(", ")] })), condition.notes && (_jsx("p", { className: "text-[11px] italic text-tp-slate-400 mt-0.5", children: condition.notes }))] }), _jsx(CopyButton, { onCopy: onCopy, size: 12 })] }));
}
function SurgicalCard({ surgery, onCopy }) {
    return (_jsxs("div", { className: "group/item flex items-start gap-2.5 rounded-lg border border-tp-slate-200 bg-white px-3 py-2 mb-2 last:mb-0", children: [_jsx(Scissors, { size: 14, className: "shrink-0 mt-0.5 text-tp-slate-400" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("span", { className: "text-xs font-medium text-tp-slate-800", children: surgery.procedure }), _jsxs("p", { className: "text-[11px] text-tp-slate-500 mt-0.5", children: [new Date(surgery.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }), surgery.hospital ? ` — ${surgery.hospital}` : ""] }), surgery.outcome && (_jsx("p", { className: "text-[11px] text-tp-slate-400 mt-0.5", children: surgery.outcome }))] }), _jsx(CopyButton, { onCopy: onCopy, size: 12 })] }));
}
function FamilyHistoryCard({ entry, onCopy }) {
    return (_jsxs("div", { className: "group/item flex items-start gap-2.5 rounded-lg border border-tp-slate-200 bg-white px-3 py-2 mb-2 last:mb-0", children: [_jsx(Users, { size: 14, className: "shrink-0 mt-0.5 text-tp-slate-400" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xs font-medium text-tp-slate-800", children: entry.condition }), _jsx("span", { className: "rounded-full bg-tp-slate-100 px-1.5 py-0.5 text-[10px] text-tp-slate-500", children: entry.relation })] }), entry.ageOfOnset && (_jsxs("p", { className: "text-[11px] text-tp-slate-500 mt-0.5", children: ["Onset: ", entry.ageOfOnset] })), entry.notes && (_jsx("p", { className: "text-[11px] italic text-tp-slate-400 mt-0.5", children: entry.notes }))] }), _jsx(CopyButton, { onCopy: onCopy, size: 12 })] }));
}
export function HistoryPanel({ history, onCopyToRxPad, }) {
    const source = "Medical History";
    return (_jsxs("div", { className: "space-y-1", children: [_jsx(PanelSubSection, { title: "Allergies", count: history.allergies.length, defaultOpen: true, actions: _jsx(CopySectionButton, { label: "Copy All", onCopy: () => onCopyToRxPad?.({
                        target: "notes",
                        items: history.allergies.map(a => `⚠ ${a.allergen} (${a.type}, ${a.severity}): ${a.reaction}`),
                        source,
                    }) }), children: history.allergies.length === 0 ? (_jsx("p", { className: "py-2 text-[11px] text-tp-success-600", children: "No known allergies (NKA)" })) : (history.allergies.map((a) => (_jsx(AllergyCard, { allergy: a, onCopy: () => onCopyToRxPad?.({
                        target: "notes",
                        items: [`⚠ ${a.allergen} (${a.type}, ${a.severity}): ${a.reaction}`],
                        source,
                    }) }, a.id)))) }), _jsx(PanelSubSection, { title: "Chronic Conditions", count: history.chronicConditions.length, actions: _jsx(CopySectionButton, { label: "Copy All", onCopy: () => onCopyToRxPad?.({
                        target: "diagnosis",
                        items: history.chronicConditions.map(c => c.condition),
                        source,
                    }) }), children: history.chronicConditions.map((c) => (_jsx(ChronicConditionCard, { condition: c, onCopy: () => onCopyToRxPad?.({ target: "diagnosis", items: [c.condition], source }) }, c.id))) }), _jsx(PanelSubSection, { title: "Surgical History", count: history.surgicalHistory.length, children: history.surgicalHistory.map((s) => (_jsx(SurgicalCard, { surgery: s, onCopy: () => onCopyToRxPad?.({
                        target: "notes",
                        items: [`${s.procedure} (${new Date(s.date).getFullYear()})`],
                        source,
                    }) }, s.id))) }), _jsx(PanelSubSection, { title: "Family History", count: history.familyHistory.length, children: history.familyHistory.map((f) => (_jsx(FamilyHistoryCard, { entry: f, onCopy: () => onCopyToRxPad?.({
                        target: "notes",
                        items: [`Family: ${f.relation} — ${f.condition}`],
                        source,
                    }) }, f.id))) }), _jsx(PanelSubSection, { title: "Social History", children: _jsxs("div", { className: "space-y-1.5 rounded-lg border border-tp-slate-200 bg-white p-3", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-tp-slate-500", children: "Smoking" }), _jsx("span", { className: "font-medium text-tp-slate-800", children: history.socialHistory.smoking.status })] }), _jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-tp-slate-500", children: "Alcohol" }), _jsx("span", { className: "font-medium text-tp-slate-800", children: history.socialHistory.alcohol.status })] }), history.socialHistory.occupation && (_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-tp-slate-500", children: "Occupation" }), _jsx("span", { className: "font-medium text-tp-slate-800", children: history.socialHistory.occupation })] })), history.socialHistory.exercise && (_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-tp-slate-500", children: "Exercise" }), _jsx("span", { className: "font-medium text-tp-slate-800", children: history.socialHistory.exercise })] })), history.socialHistory.diet && (_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-tp-slate-500", children: "Diet" }), _jsx("span", { className: "font-medium text-tp-slate-800", children: history.socialHistory.diet })] }))] }) })] }));
}
