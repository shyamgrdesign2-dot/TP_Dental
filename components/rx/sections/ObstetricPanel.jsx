"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users } from "lucide-react";
import { CopyButton } from "../CopyButton";
import { PanelSubSection, PanelEmptyState } from "../ExpandedPanel";
/**
 * Obstetric History Panel
 * ───────────────────────
 * Displays obstetric formula, previous pregnancies, and current pregnancy data.
 *
 * Display rules:
 *   - Obstetric formula (G_P_A_L_) prominently displayed at top
 *   - Current pregnancy: highlighted card with EDD, gestational age, antenatal visits
 *   - Previous pregnancies: timeline cards with outcome badges
 *   - Outcome colors: Live Birth (green), Stillbirth (red), Miscarriage (amber), Ectopic (red)
 *   - Antenatal visits: compact table with key metrics
 */
function formatDate(d) {
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
const outcomeStyles = {
    "Live Birth": "bg-tp-success-50 text-tp-success-600",
    "Stillbirth": "bg-tp-error-50 text-tp-error-600",
    "Miscarriage": "bg-tp-warning-50 text-tp-warning-600",
    "Abortion": "bg-tp-slate-100 text-tp-slate-600",
    "Ectopic": "bg-tp-error-50 text-tp-error-600",
};
const deliveryStyles = {
    "NVD": "bg-tp-success-50 text-tp-success-600",
    "LSCS": "bg-tp-blue-50 text-tp-blue-600",
    "Assisted": "bg-tp-warning-50 text-tp-warning-600",
    "N/A": "bg-tp-slate-100 text-tp-slate-500",
};
export function ObstetricPanel({ history, onCopyToRxPad, }) {
    if (!history) {
        return (_jsx(PanelEmptyState, { icon: _jsx(Users, { size: 32 }), message: "No obstetric history", description: "Obstetric records will appear here" }));
    }
    const source = "Obstetric History";
    return (_jsxs("div", { className: "space-y-1", children: [history.obstetricFormula && (_jsxs("div", { className: "group/item mb-3 flex items-center gap-3 rounded-lg border border-tp-blue-200 bg-tp-blue-50/50 px-3 py-2.5", children: [_jsxs("div", { className: "flex-1", children: [_jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-tp-blue-500", children: "Obstetric Formula" }), _jsx("p", { className: "text-lg font-bold text-tp-blue-700 mt-0.5", style: { fontFamily: "var(--font-heading)" }, children: history.obstetricFormula })] }), _jsx(CopyButton, { onCopy: () => onCopyToRxPad?.({ target: "notes", items: [`Obstetric Formula: ${history.obstetricFormula}`], source }), showOnHover: false, size: 14 })] })), history.currentPregnancy && (_jsx(PanelSubSection, { title: "Current Pregnancy", defaultOpen: true, children: _jsxs("div", { className: "rounded-lg border border-tp-violet-200 bg-tp-violet-50/30 p-3 space-y-2", children: [_jsxs("div", { className: "grid grid-cols-2 gap-2", children: [history.currentPregnancy.edd && (_jsxs("div", { children: [_jsx("span", { className: "text-[10px] text-tp-slate-500", children: "EDD" }), _jsx("p", { className: "text-xs font-semibold text-tp-violet-700", children: formatDate(history.currentPregnancy.edd) })] })), history.currentPregnancy.gestationalAge && (_jsxs("div", { children: [_jsx("span", { className: "text-[10px] text-tp-slate-500", children: "Gestational Age" }), _jsx("p", { className: "text-xs font-semibold text-tp-slate-800", children: history.currentPregnancy.gestationalAge })] })), history.currentPregnancy.lmp && (_jsxs("div", { children: [_jsx("span", { className: "text-[10px] text-tp-slate-500", children: "LMP" }), _jsx("p", { className: "text-xs font-medium text-tp-slate-700", children: formatDate(history.currentPregnancy.lmp) })] }))] }), history.currentPregnancy.antenatalVisits && history.currentPregnancy.antenatalVisits.length > 0 && (_jsxs("div", { className: "mt-2", children: [_jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-tp-slate-500 mb-1.5 block", children: "Antenatal Visits" }), _jsx("div", { className: "overflow-hidden rounded-lg border border-tp-slate-200", children: _jsxs("table", { className: "w-full text-[11px]", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-tp-slate-50", children: [_jsx("th", { className: "px-2 py-1.5 text-left font-medium text-tp-slate-500", children: "Date" }), _jsx("th", { className: "px-2 py-1.5 text-center font-medium text-tp-slate-500", children: "GA" }), _jsx("th", { className: "px-2 py-1.5 text-center font-medium text-tp-slate-500", children: "BP" }), _jsx("th", { className: "px-2 py-1.5 text-center font-medium text-tp-slate-500", children: "FHR" })] }) }), _jsx("tbody", { children: history.currentPregnancy.antenatalVisits.map((v) => (_jsxs("tr", { className: "border-t border-tp-slate-100", children: [_jsx("td", { className: "px-2 py-1.5 text-tp-slate-700", children: formatDate(v.date) }), _jsx("td", { className: "px-2 py-1.5 text-center text-tp-slate-800", children: v.gestationalAge }), _jsx("td", { className: "px-2 py-1.5 text-center text-tp-slate-800", children: v.bp || "—" }), _jsx("td", { className: "px-2 py-1.5 text-center text-tp-slate-800", children: v.fetalHeartRate || "—" })] }, v.id))) })] }) })] }))] }) })), _jsx(PanelSubSection, { title: "Previous Pregnancies", count: history.previousPregnancies.length, children: history.previousPregnancies.map((preg) => (_jsxs("div", { className: "group/item mb-2 rounded-lg border border-tp-slate-200 bg-white px-3 py-2 last:mb-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "text-xs font-semibold text-tp-slate-800", children: preg.year }), _jsx("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-medium ${outcomeStyles[preg.outcome]}`, children: preg.outcome }), preg.modeOfDelivery && preg.modeOfDelivery !== "N/A" && (_jsx("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-medium ${deliveryStyles[preg.modeOfDelivery]}`, children: preg.modeOfDelivery })), _jsx(CopyButton, { onCopy: () => onCopyToRxPad?.({
                                        target: "notes",
                                        items: [`${preg.year}: ${preg.outcome} (${preg.modeOfDelivery || "—"})${preg.birthWeight ? `, ${preg.birthWeight}` : ""}`],
                                        source,
                                    }), size: 12, className: "ml-auto" })] }), _jsxs("div", { className: "flex gap-4 text-[11px] text-tp-slate-500", children: [preg.birthWeight && _jsxs("span", { children: ["Weight: ", preg.birthWeight] }), preg.gender && _jsxs("span", { children: ["Gender: ", preg.gender] })] }), preg.complications && preg.complications.length > 0 && (_jsxs("p", { className: "mt-1 text-[11px] text-tp-warning-600", children: ["Complications: ", preg.complications.join(", ")] }))] }, preg.id))) })] }));
}
