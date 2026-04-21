"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * ExaminationTab — side-by-side layout:
 *   Left: 3D dental canvas (SSR-safe dynamic import)
 *   Right: Context-aware panel —
 *     • Dentition view → Dental Score card + per-tooth examination summary
 *     • Single-tooth view → Tooth header (with Back arrow) + primary diagnosis
 *       section + surface examination section + general chip sections + Save footer
 *
 * Typography: 14px / 12px baseline; 10px only for tiny meta.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { InfoCircle, Trash, Grid5, Ram, Eraser, Add, Calendar, SearchNormal1 } from "iconsax-reactjs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { ExpandIcon } from "./ui-icons";
import { DentalCanvas } from "./DentalCanvas";
import { DIAGNOSES, TOOTH_DIAGNOSES, ZONE_INFO, ALL_ZONES, getZoneLabel, TEETH, PROCEDURE_CATALOG, QUADRANT_LABELS, getDefaultTreatmentSurfaces } from "./types";
import { MiniToothCanvas } from "./MiniToothCanvas";
import { MiniScopeCanvas } from "./MiniScopeCanvas";
import { TPMedicalIcon } from "@/components/tp-ui/medical-icons";
import { saveDentalPreviewSnapshot } from "@/components/tp-rxpad/rx-preview-store";
import clsx from "clsx";
import ex from "./ExaminationTab.module.scss";
import ui from "./ExaminationTab.ui.module.scss";
import { useBillingCatalog } from "@/lib/billing-catalog-context";
import { getUniqueDentalBillItems, sortStringsForTypeahead } from "@/lib/billing-catalog";
import { AddDentalBillItemDrawer } from "@/components/dental/AddDentalBillItemDrawer";
import { useRxPadChrome } from "@/components/tp-rxpad/rxpad-chrome-context";
// Score weights per diagnosis/finding severity (out of 100).
const DIAG_WEIGHT = {
    Missing: 8, Implant: 2, RCT: 4, Crown: 2, Bridge: 3, Denture: 3,
};
/** Accent colors per tooth-level diagnosis — makes each chip visually distinct */
const PRIMARY_DIAG_COLOR = {
    Implant: "#0891b2", // cyan
    Missing: "#dc2626", // red
    RCT: "#ea580c", // orange
    Crown: "#d4af37", // gold
    Bridge: "#a16207", // amber-brown
    Denture: "#ec4899", // pink
    Extraction: "#b91c1c", // dark red (similar to missing)
    "Composite Filling": "#f5f5f4", // off-white (filling material)
    Scaling: "#059669", // emerald
    Polishing: "#10b981", // green
    Veneer: "#e2e8f0", // light porcelain
    "Pulp Cap": "#f97316", // orange
    "Root Planing": "#0d9488", // teal
    "Fluoride Treatment": "#06b6d4", // cyan-light
};
const FINDING_WEIGHT = {
    "Cavity/Caries": 3, "Crack": 2, "Fracture": 4, "Erosion": 2, "Abrasion": 1,
    "Attrition": 1, "Staining": 0.5, "Plaque": 0.5, "Calculus": 1, "Restoration Defect": 2,
    "NCCL": 1, "Sensitivity": 1, "Resorption": 3, "Recession": 2, "Normal": 0,
};
function computeDentalScore(state) {
    if (!state)
        return { score: 100, rating: "Excellent", totalDeduction: 0, affectedTeeth: 0, breakdown: { diag: 0, findings: 0 } };
    let diag = 0, findings = 0;
    const affected = new Set();
    for (const [fdi, diagSet] of Object.entries(state.toothDiagnoses)) {
        diagSet.forEach((d) => { diag += DIAG_WEIGHT[d] ?? 0; affected.add(fdi); });
    }
    state.implantTeeth.forEach((fdi) => { diag += DIAG_WEIGHT.Implant; affected.add(fdi); });
    for (const [fdi, findingsList] of Object.entries(state.findingsByTooth)) {
        findingsList.forEach((f) => { findings += FINDING_WEIGHT[f.type] ?? 0; affected.add(fdi); });
    }
    const totalDeduction = Math.min(100, Math.round(diag + findings));
    const score = Math.max(0, 100 - totalDeduction);
    const rating = score >= 90 ? "Excellent" :
        score >= 75 ? "Good" :
            score >= 60 ? "Fair" :
                score >= 40 ? "Needs attention" : "Poor";
    return { score, rating, totalDeduction, affectedTeeth: affected.size, breakdown: { diag: Math.round(diag), findings: Math.round(findings) } };
}
function toPreviewLine(title, metaParts) {
    return {
        title: title.trim(),
        metaParts: metaParts.map((part) => (part ?? "").trim()).filter(Boolean),
    };
}
function surfaceList(surfaces) {
    if (!surfaces.length)
        return "";
    return surfaces.map((surface) => ZONE_INFO[surface]?.label ?? surface).join(", ");
}
function toDentalPreviewSections(state) {
    const byTooth = new Map();
    const ensureTooth = (fdi) => {
        const existing = byTooth.get(fdi);
        if (existing)
            return existing;
        const tooth = TEETH.find((item) => item.fdi === fdi);
        const toothLabel = tooth
            ? `${QUADRANT_LABELS[tooth.quadrant]} ${tooth.name} (T${fdi})`
            : `Tooth (T${fdi})`;
        const next = {
            toothLabel,
            treatmentHistory: [],
            findings: [],
            procedures: [],
        };
        byTooth.set(fdi, next);
        return next;
    };
    Object.entries(state.toothDiagnoses).forEach(([fdi, diagnoses]) => {
        if (!diagnoses.size)
            return;
        const block = ensureTooth(fdi);
        diagnoses.forEach((diagnosis) => {
            block.treatmentHistory.push(toPreviewLine(diagnosis, []));
        });
    });
    state.implantTeeth.forEach((fdi) => {
        const block = ensureTooth(fdi);
        const exists = block.treatmentHistory.some((row) => row.title.toLowerCase() === "implant");
        if (!exists) {
            block.treatmentHistory.push(toPreviewLine("Implant", []));
        }
    });
    Object.entries(state.findingsByTooth).forEach(([fdi, findings]) => {
        if (!findings.length)
            return;
        const block = ensureTooth(fdi);
        findings.forEach((finding) => {
            block.findings.push(toPreviewLine(finding.type, [ZONE_INFO[finding.zoneId]?.label, finding.notes]));
        });
    });
    state.allEntries.forEach((entry) => {
        const block = ensureTooth(entry.toothFdi);
        const meta = [surfaceList(entry.surfaces), entry.since, entry.plannedDate, entry.status, entry.notes];
        if (entry.kind === "finding") {
            block.findings.push(toPreviewLine(entry.name, meta));
            return;
        }
        if (entry.kind === "procedure" || entry.kind === "planned") {
            block.procedures.push(toPreviewLine(entry.name, meta));
            return;
        }
        block.treatmentHistory.push(toPreviewLine(entry.name, meta));
    });
    return Array.from(byTooth.values()).filter((section) => section.treatmentHistory.length > 0 ||
        section.findings.length > 0 ||
        section.procedures.length > 0 ||
        Boolean(section.overallToothNote?.trim()));
}
export function ExaminationTab({ patientId, patientAge = 30 }) {
    const { drAgentOpen } = useRxPadChrome();
    const [canvasState, setCanvasState] = useState(null);
    const isSingle = canvasState?.viewMode === "single-tooth";
    const containerRef = useRef(null);
    // Separate persisted widths for dentition vs single-tooth. Both draggable 40-60.
    // Defer localStorage read to useEffect so SSR + first client render match.
    // Default: dentition 35% (canvas takes 65%); single-tooth 65% content / 35% canvas.
    const [dentitionAsidePct, setDentitionAsidePct] = useState(35);
    const [singleAsidePct, setSingleAsidePct] = useState(65);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const defaultSingle = 65;
        setSingleAsidePct(defaultSingle);
        const d = parseFloat(window.localStorage.getItem("dental.aside.pct.dentition") ?? "");
        if (Number.isFinite(d) && d >= 30 && d <= 40)
            setDentitionAsidePct(d);
        const s = parseFloat(window.localStorage.getItem("dental.aside.pct.single") ?? "");
        if (Number.isFinite(s) && s >= 50 && s <= 70)
            setSingleAsidePct(s);
    }, []);
    const [dragging, setDragging] = useState(false);
    useEffect(() => {
        if (!dragging)
            return;
        const onMove = (e) => {
            e.preventDefault();
            const el = containerRef.current;
            if (!el)
                return;
            const x = e.clientX;
            const r = el.getBoundingClientRect();
            const [min, max] = isSingle ? [50, 70] : [30, 40];
            // Panel is on the RIGHT now → measure from right edge.
            const pct = Math.min(max, Math.max(min, ((r.right - x) / r.width) * 100));
            if (isSingle)
                setSingleAsidePct(pct);
            else
                setDentitionAsidePct(pct);
        };
        const onUp = () => setDragging(false);
        window.addEventListener("pointermove", onMove, { passive: false });
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointercancel", onUp);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };
    }, [dragging, isSingle]);
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("dental.aside.pct.dentition", String(dentitionAsidePct));
        }
    }, [dentitionAsidePct]);
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("dental.aside.pct.single", String(singleAsidePct));
        }
    }, [singleAsidePct]);
    const asidePct = isSingle ? singleAsidePct : dentitionAsidePct;
    const canvasPct = 100 - asidePct;
    const isGetStarted = !isSingle && !!canvasState &&
        Object.values(canvasState.toothDiagnoses).every((s) => s.size === 0) &&
        canvasState.implantTeeth.size === 0 &&
        Object.values(canvasState.findingsByTooth).every((a) => a.length === 0) &&
        canvasState.allEntries.length === 0 &&
        !Object.values(canvasState.treatmentHistoryDetailsByTooth ?? {}).some((d) => d && Object.keys(d).length > 0) &&
        !Object.values(canvasState.toothNotes ?? {}).some((n) => String(n ?? "").trim().length > 0);
    useEffect(() => {
        if (!canvasState)
            return;
        saveDentalPreviewSnapshot(patientId, {
            patientId,
            updatedAt: new Date().toISOString(),
            sections: toDentalPreviewSections(canvasState),
        });
    }, [canvasState, patientId]);
    const hideGetStarted = isGetStarted && drAgentOpen;

    return (_jsxs("div", { ref: containerRef, className: clsx(ex.root, isGetStarted && !hideGetStarted && ex.rootGap), children: [_jsxs("div", { className: ex.canvasShell, style: {
                    width: isGetStarted && !hideGetStarted ? undefined : (hideGetStarted ? "100%" : `${canvasPct}%`),
                    minWidth: "320px",
                    flex: isGetStarted ? "1" : "1 1 auto",
                    transition: dragging ? "none" : "width 350ms ease-out, flex-basis 350ms ease-out",
                }, children: [_jsx("div", { className: ex.gridOverlay, style: {
                            backgroundImage: "linear-gradient(to right, rgba(15,23,42,0.025) 1px, transparent 1px)," +
                                "linear-gradient(to bottom, rgba(15,23,42,0.025) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        } }), _jsx("div", { className: ex.dotOverlay, style: {
                            backgroundImage: "radial-gradient(circle, rgba(15,23,42,0.04) 0.6px, transparent 0.9px)",
                            backgroundSize: "16px 16px",
                        } }), _jsx("div", { className: ex.radialOverlay, style: {
                            background: "radial-gradient(ellipse 55% 42% at 50% 38%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 55%, transparent 78%)",
                        } }), _jsx("div", { className: ex.canvasInner, children: _jsx(DentalCanvas, { patientId: patientId, patientAge: patientAge, onStateChange: setCanvasState }) })] }), !isGetStarted && !hideGetStarted && (_jsxs("button", { type: "button", role: "separator", "aria-label": "Resize panel", "aria-orientation": "vertical", onPointerDown: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setDragging(true);
                }, className: ex.resizeHandle, children: [_jsx("span", { className: ex.resizeHit }), _jsx("img", { src: "/icons/ui/drag-handle.svg", alt: "", draggable: false, className: ex.resizeIcon, style: { display: "block", width: "22px", height: "32px", maxWidth: "none", left: "-11px" } })] })), !hideGetStarted && (_jsxs("aside", { className: clsx(ex.aside, isGetStarted ? ex.asideStarted : ex.asideSplit), style: {
                    width: isGetStarted ? "auto" : `${asidePct}%`,
                    minWidth: isGetStarted ? undefined : (isSingle ? "360px" : "320px"),
                    flex: isGetStarted ? "none" : "1 1 auto",
                    transition: dragging ? "none" : "width 350ms ease-out, flex-basis 350ms ease-out"
                }, children: [_jsx("div", { className: ex.asideInner, style: {
                            animation: isSingle
                                ? "dentalCardExpand 380ms cubic-bezier(0.34, 1.2, 0.64, 1)"
                                : "dentalCardCollapse 320ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                            transformOrigin: "center top",
                        }, children: isSingle && canvasState ? (_jsx("div", { className: ex.singleCol, children: _jsx("div", { className: ex.singleCard, children: _jsx(SingleToothPanel, { state: canvasState }) }) })) : (_jsx("div", { className: isGetStarted ? ex.scrollStarted : ex.scrollSplit, children: _jsx(DentitionPanel, { state: canvasState }) })) }, isSingle ? `single-${canvasState?.selectedTooth?.fdi}` : "dentition"), _jsx("style", { dangerouslySetInnerHTML: {
                    __html: `
          @keyframes dentalCardExpand {
            0%   { opacity: 0; transform: scale(0.72) translateY(40px); }
            60%  { opacity: 1; }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes dentalCardCollapse {
            from { opacity: 0; transform: scale(1.04) translateY(-6px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `,
                } })] })) ] }));
}
/** Truncate one chip segment; join with commas for tooth-record pills (Dr Agent + chart). */
const CHIP_SEGMENT_MAX = 22;
const CHIP_JOIN_MAX = 96;
function truncateChipSegment(s, max = CHIP_SEGMENT_MAX) {
    const t = String(s ?? "").trim();
    if (!t)
        return "";
    if (t.length <= max)
        return t;
    return `${t.slice(0, Math.max(0, max - 1))}…`;
}
function joinChipLabels(parts, maxTotal = CHIP_JOIN_MAX) {
    const seen = new Set();
    const out = [];
    for (const p of parts) {
        const seg = truncateChipSegment(p);
        if (!seg || seen.has(seg.toLowerCase()))
            continue;
        seen.add(seg.toLowerCase());
        out.push(seg);
    }
    let s = out.join(", ");
    if (s.length > maxTotal)
        s = `${s.slice(0, maxTotal - 1)}…`;
    return s;
}
/** Dedupe + trim part labels for dentition summary pills (full strings; truncation is CSS per segment). */
function uniquePartList(raw) {
    const seen = new Set();
    const out = [];
    for (const x of raw) {
        const t = String(x ?? "").trim();
        if (!t)
            continue;
        const k = t.toLowerCase();
        if (seen.has(k))
            continue;
        seen.add(k);
        out.push(t);
    }
    return out;
}
// ──────────────────────────────────────────────────────────────
// Dentition panel: Patient Dental Score + per-tooth summary
// Clicking any summary row → opens that tooth's single view.
// ──────────────────────────────────────────────────────────────
function DentitionPanel({ state }) {
    const scoreData = useMemo(() => computeDentalScore(state), [state]);
    const [showFormula, setShowFormula] = useState(false);
    const infoBtnRef = useRef(null);
    const summary = useMemo(() => {
        if (!state)
            return [];
        const map = new Map();
        const seed = (fdi) => {
            const ex = map.get(fdi);
            if (ex)
                return ex;
            const next = {
                fdi,
                diagnoses: [],
                findingsFullParts: [],
                procedureFullParts: [],
            };
            map.set(fdi, next);
            return next;
        };
        for (const [fdi, diagSet] of Object.entries(state.toothDiagnoses)) {
            if (diagSet.size > 0)
                seed(fdi).diagnoses = [...diagSet];
        }
        state.implantTeeth.forEach((fdi) => {
            const e = seed(fdi);
            if (!e.diagnoses.includes("Implant"))
                e.diagnoses.push("Implant");
        });
        const findingsByTooth = state.findingsByTooth ?? {};
        for (const [fdi, list] of Object.entries(findingsByTooth)) {
            if (!list?.length)
                continue;
            const row = seed(fdi);
            for (const f of list) {
                const t = f.type?.trim();
                if (t)
                    row.findingsFullParts.push(t);
            }
        }
        for (const e of state.allEntries) {
            const row = seed(e.toothFdi);
            if (e.kind === "finding") {
                const name = e.name?.trim();
                if (name)
                    row.findingsFullParts.push(name);
            }
            else if (e.kind === "procedure" || e.kind === "planned") {
                const name = e.name?.trim();
                if (name)
                    row.procedureFullParts.push(name);
            }
        }
        const notesByFdi = state.toothNotes ?? {};
        return Array.from(map.values())
            .map((e) => {
                const diagnosisParts = uniquePartList(e.diagnoses).sort((a, b) => a.localeCompare(b));
                const findingParts = uniquePartList(e.findingsFullParts);
                const procedureParts = uniquePartList(e.procedureFullParts);
                return {
                    ...e,
                    diagnosisParts,
                    findingParts,
                    procedureParts,
                    findingsTitle: findingParts.length ? findingParts.join(", ") : undefined,
                    procedureTitle: procedureParts.length ? procedureParts.join(", ") : undefined,
                    historyTitle: diagnosisParts.length ? diagnosisParts.join(", ") : undefined,
                };
            })
            .filter(
                (e) =>
                    e.diagnosisParts.length > 0 ||
                    e.findingParts.length > 0 ||
                    e.procedureParts.length > 0 ||
                    Boolean(notesByFdi[e.fdi]?.trim()),
            )
            .sort((a, b) => a.fdi.localeCompare(b.fdi));
    }, [state]);
    const prevSummaryFdiRef = useRef(null);
    const isFirstSummaryRef = useRef(true);
    const [enterFdis, setEnterFdis] = useState(() => new Set());
    useEffect(() => {
        const curr = new Set(summary.map((s) => s.fdi));
        if (isFirstSummaryRef.current && curr.size > 0) {
            prevSummaryFdiRef.current = curr;
            isFirstSummaryRef.current = false;
            return;
        }
        const prev = prevSummaryFdiRef.current || new Set();
        const appeared = [...curr].filter((fdi) => !prev.has(fdi));
        prevSummaryFdiRef.current = curr;
        if (appeared.length === 0)
            return;
        setEnterFdis(new Set(appeared));
        const t = window.setTimeout(() => setEnterFdis(new Set()), 620);
        return () => window.clearTimeout(t);
    }, [summary]);
    const openTooth = (fdi) => {
        if (!state)
            return;
        const tooth = TEETH.find((t) => t.fdi === fdi);
        if (tooth)
            state.onSelectTooth(tooth);
    };
    return (_jsx(_Fragment, { children: summary.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(ScoreCard, { data: scoreData, infoBtnRef: infoBtnRef, showFormula: showFormula, setShowFormula: setShowFormula }), _jsxs("div", { className: ui.recordsHeader, children: [_jsx("h3", { className: ui.recordsTitle, children: "Tooth records" }), _jsx("span", { className: ui.recordsBadge, children: summary.length })] }), _jsx("div", { className: ui.recordsList, children: summary.map((entry) => {
                        const tooth = TEETH.find((t) => t.fdi === entry.fdi);
                        const toothName = tooth ? `${QUADRANT_LABELS[tooth.quadrant]} ${tooth.name}` : "";
                        // Determine thumbnail color by most-severe diagnosis
                        let crownColor = "#E8DDD5", rootColor = "#C4AD97";
                        if (entry.diagnoses.includes("Missing")) {
                            crownColor = "#d1d5db";
                            rootColor = "#d1d5db";
                        }
                        else if (entry.diagnoses.includes("Crown") || entry.diagnoses.includes("Bridge")) {
                            crownColor = "#d1d5db";
                            rootColor = "#C4AD97";
                        }
                        else if (entry.diagnoses.includes("RCT")) {
                            crownColor = "#f87171";
                            rootColor = "#C4AD97";
                        }
                        else if (entry.diagnoses.includes("Implant")) {
                            crownColor = "#9ca3af";
                            rootColor = "#6B7280";
                        }
                        return (_jsxs("button", { type: "button", onClick: () => openTooth(entry.fdi), onMouseEnter: () => state?.onSetHoveredTooth(entry.fdi), onMouseLeave: () => state?.onSetHoveredTooth(null), className: clsx(ui.toothRow, enterFdis.has(entry.fdi) && ui.toothRowEnter, state?.agentApplyPulseFdis?.has(String(entry.fdi)) && ui.toothRowAgentPulse, state?.hoveredToothFdi === entry.fdi && ui.toothRowActive), children: [_jsxs("div", { className: ui.toothRowHeader, children: [_jsx("div", { className: ui.toothThumb, children: tooth && (_jsx(MiniToothCanvas, { tooth: tooth, size: 52, diagnoses: new Set(entry.diagnoses), isImplant: entry.diagnoses.includes("Implant"), findings: (state?.findingsByTooth?.[entry.fdi] ?? []) })) }), _jsxs("div", { className: ui.toothHeaderText, children: [_jsx("span", { className: ui.toothName, children: toothName }), _jsxs("span", { className: ui.toothFdiBelow, children: ["T", entry.fdi] })] }), _jsx("span", { className: ui.toothChevron, "aria-hidden": true, children: _jsx(ExpandIcon, { size: 17 }) })] }), _jsx("div", { className: ui.toothRowDivider, "aria-hidden": true }), _jsxs("div", { className: ui.toothChips, children: [entry.diagnosisParts.length > 0 && (_jsx(SummaryPillSegmented, { icon: "clipboard-activity", parts: entry.diagnosisParts, title: entry.historyTitle, tone: "violet" })), entry.findingParts.length > 0 && (_jsx(SummaryPillSegmented, { icon: "diagnosis", parts: entry.findingParts, title: entry.findingsTitle, tone: "violet" })), entry.procedureParts.length > 0 && (_jsx(SummaryPillSegmented, { icon: "surgical-scissors-02", parts: entry.procedureParts, title: entry.procedureTitle, tone: "violet" })), Boolean((state?.toothNotes ?? {})[entry.fdi]?.trim()) && (_jsx(SummaryPill, { icon: "note-2", label: "Notes", title: (state?.toothNotes ?? {})[entry.fdi]?.trim(), tone: "violet" }))] })] }, entry.fdi));
                    }) })] })) : (
        /* First-time user onboarding — polished educational panel */
        _jsx("div", { className: ui.onboardCol, children: _jsxs("div", { className: ui.onboardCard, children: [_jsxs("div", { className: ui.onboardHead, children: [_jsx("div", { className: ui.onboardIcon, children: _jsx(TPMedicalIcon, { name: "health care", variant: "bulk", size: 18, color: "#ffffff" }) }), _jsxs("div", { children: [_jsx("h3", { className: ui.onboardTitle, children: "Getting Started" }), _jsx("p", { className: ui.onboardSub, children: "4 simple steps to examine" })] })] }), _jsx("div", { className: ui.stepList, children: [
                            { step: "1", title: "Select a tooth", desc: "Click any tooth on the 3D model to open its detail view", icon: "tooth" },
                            { step: "2", title: "Record findings", desc: "Add treatment history, surface findings, and diagnoses", icon: "diagnosis" },
                            { step: "3", title: "Plan procedures", desc: "Create treatment plans and add clinical notes", icon: "surgical-scissors-02" },
                            { step: "4", title: "View dental score", desc: "Return to full view to see your score and tooth records", icon: "tooth" },
                        ].map((item, idx, arr) => (_jsxs("div", { className: ui.stepRow, children: [_jsx("div", { className: ui.stepCol, children: _jsx("div", { className: ui.stepCircle, children: _jsx(TPMedicalIcon, { name: item.icon, variant: "bulk", size: 16, color: "#8b5cf6" }) }) }), _jsx("div", { className: ui.stepCard, children: _jsxs("div", { className: ui.stepCardInner, children: [_jsx("p", { className: ui.stepCardTitle, children: item.title }), _jsx("p", { className: ui.stepCardDesc, children: item.desc })] }) }), idx < arr.length - 1 && (_jsx("div", { className: ui.stepConnector, style: {
                                        left: 17,
                                        top: "calc(50% + 17px)",
                                        height: "calc(100% - 10px)",
                                        width: 0,
                                        borderLeft: "1.5px dashed #c4b5fd",
                                    } }))] }, item.step))) }), _jsxs("div", { className: ui.tutorialWrap, children: [_jsx("img", { src: "/assets/tutorial-dental-preview.png", alt: "How Dental Works? \u2014 Watch tutorial", className: ui.tutorialImg }), _jsx("div", { className: ui.tutorialOverlay })] })] }) })) }));
}
// ──────────────────────────────────────────────────────────────
// SummaryPill — compact chip with a TP medical icon + label
// ──────────────────────────────────────────────────────────────
function SummaryPill({ icon, label, tone, title }) {
    const tones = {
        violet: { pillTone: ui.pillViolet, colour: "var(--tp-violet-600)" },
        amber: { pillTone: ui.pillAmber, colour: "var(--tp-violet-700)" },
        blue: { pillTone: ui.pillBlue, colour: "var(--tp-blue-600)" },
        slate: { pillTone: ui.pillSlate, colour: "var(--tp-slate-600)" },
    };
    const t = tones[tone];
    const tip = title ?? label;
    return (_jsxs("span", { className: clsx(ui.pill, t.pillTone), title: tip, children: [_jsx(TPMedicalIcon, { name: icon, variant: "bulk", size: 16, color: t.colour }), _jsx("span", { className: ui.pillLabelPlain, children: label })] }));
}
/** Tooth record chip: icon + each value truncated individually, separated by | (matches section icons). */
function SummaryPillSegmented({ icon, parts, tone, title }) {
    const tones = {
        violet: { pillTone: ui.pillViolet, colour: "var(--tp-violet-600)" },
        amber: { pillTone: ui.pillAmber, colour: "var(--tp-violet-700)" },
        blue: { pillTone: ui.pillBlue, colour: "var(--tp-blue-600)" },
        slate: { pillTone: ui.pillSlate, colour: "var(--tp-slate-600)" },
    };
    const t = tones[tone];
    const tip = title ?? parts.join(", ");
    if (!parts.length)
        return null;
    return (_jsxs("span", { className: clsx(ui.pill, ui.pillSegmented, t.pillTone), title: tip, children: [_jsx(TPMedicalIcon, { name: icon, variant: "bulk", size: 16, color: t.colour, className: ui.pillIcon }), _jsx("span", { className: ui.pillSegments, children: parts.map((p, i) => (_jsxs(React.Fragment, { children: [i > 0 && _jsx("span", { className: ui.pillSegmentSep, "aria-hidden": true, children: "|" }), _jsx("span", { className: ui.pillSegment, title: p, children: p })] }, `seg-${i}-${p}`))) })] }));
}
// ──────────────────────────────────────────────────────────────
// ScoreCard — full-circle gauge w/ interior gradient disc + animated score
// ──────────────────────────────────────────────────────────────
function ScoreCard({ data, infoBtnRef, showFormula, setShowFormula, }) {
    const { score, rating, affectedTeeth } = data;
    const zoneIdx = score >= 90 ? 4 : score >= 75 ? 3 : score >= 60 ? 2 : score >= 40 ? 1 : 0;
    // Original TP palette — red → orange → amber → violet → emerald.
    const colour = [
        { accent: "#EF4444", accentDark: "#B91C1C", tint: "#FFE4E6" }, // Off Track — red
        { accent: "#F97316", accentDark: "#C2410C", tint: "#FFEDD5" }, // Improving — orange
        { accent: "#F59E0B", accentDark: "#B45309", tint: "#FEF3C7" }, // Good — amber
        { accent: "#8B5CF6", accentDark: "#6D28D9", tint: "#EDDFF7" }, // Great — violet
        { accent: "#10B981", accentDark: "#047857", tint: "#D1FAE5" }, // Superb — emerald
    ][zoneIdx];
    // Animate score from 0 → target on mount.
    const [displayScore, setDisplayScore] = useState(0);
    useEffect(() => {
        let raf = 0;
        const start = performance.now();
        const duration = 900;
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplayScore(Math.round(score * eased));
            if (t < 1)
                raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [score]);
    // Larger ring circumference for breathing space.
    const size = 220;
    const cx = size / 2;
    const cy = size / 2;
    const r = 90;
    const gapDeg = 28;
    const startA = 90 + gapDeg / 2;
    const sweepTotal = 360 - gapDeg;
    const progress = Math.max(0, Math.min(1, displayScore / 100));
    const endA = startA + sweepTotal * progress;
    const polar = (a, radius = r) => ({
        x: cx + radius * Math.cos((a * Math.PI) / 180),
        y: cy + radius * Math.sin((a * Math.PI) / 180),
    });
    const p0 = polar(startA);
    const pFull = polar(startA + sweepTotal);
    const pProg = polar(endA);
    const bgArc = `M ${p0.x} ${p0.y} A ${r} ${r} 0 1 1 ${pFull.x} ${pFull.y}`;
    const fgArc = `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${sweepTotal * progress > 180 ? 1 : 0} 1 ${pProg.x} ${pProg.y}`;
    const gid = `gauge-ring-${zoneIdx}`;
    const infoIconRef = useRef(null);
    const [iconAnchor, setIconAnchor] = useState(null);
    const openTooltip = () => {
        const r = infoIconRef.current?.getBoundingClientRect();
        if (!r)
            return;
        setIconAnchor({ x: r.left + r.width / 2, y: r.bottom });
        setShowFormula(true);
    };
    const closeTooltip = () => { setShowFormula(false); setIconAnchor(null); };
    return (_jsxs("div", { ref: infoBtnRef, className: ui.scoreCard, style: {
            background: `linear-gradient(140deg, ${colour.tint} 0%, ${colour.accent}2b 60%, ${colour.accent}4d 100%)`,
        }, children: [_jsx("span", { className: ui.scoreRibbon, style: {
                    background: "rgba(255,255,255,0.98)",
                    color: colour.accentDark,
                    borderBottomRightRadius: "14px",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                }, children: "Dental score" }), showFormula && iconAnchor && _jsx(ScoreTooltip, { anchor: iconAnchor, data: data }), _jsxs("div", { className: ui.scoreSvgWrap, children: [_jsxs("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: gid, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: colour.accent, stopOpacity: "0.85" }), _jsx("stop", { offset: "100%", stopColor: colour.accentDark, stopOpacity: "1" })] }) }), _jsx("path", { d: bgArc, stroke: colour.tint, strokeWidth: 14, strokeLinecap: "round", fill: "none" }), progress > 0 && (_jsx("path", { d: fgArc, stroke: `url(#${gid})`, strokeWidth: 14, strokeLinecap: "round", fill: "none" }))] }), _jsxs("div", { className: ui.scoreCenter, style: { gap: 4 }, children: [_jsx("span", { className: ui.scoreHuge, style: {
                                    fontSize: 42,
                                    lineHeight: 1,
                                    color: colour.accentDark,
                                }, children: displayScore }), _jsx("span", { className: ui.scoreSub, children: "out of 100" }), _jsxs("span", { ref: infoIconRef, onMouseEnter: openTooltip, onMouseLeave: closeTooltip, onClick: openTooltip, className: ui.scoreRatingBtn, style: {
                                    background: `linear-gradient(135deg, ${colour.tint} 0%, ${colour.accent}22 100%)`,
                                    color: colour.accentDark,
                                    border: `1px solid ${colour.accent}33`,
                                    letterSpacing: "0.6px",
                                }, children: [rating.toUpperCase(), _jsx(InfoCircle, { size: 14, color: "currentColor", variant: "Linear" })] })] })] })] }));
}
function ScoreTooltip({ anchor, data }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted)
        return null;
    // Compact black tooltip, anchored below the info icon, arrow points up to icon.
    const TOOLTIP_W = 220;
    const TOOLTIP_H_ESTIMATE = 110;
    const pad = 12;
    const ARROW = 6;
    let placeBelow = true;
    let left = anchor.x - TOOLTIP_W / 2;
    let top = anchor.y + ARROW + 4;
    if (typeof window !== "undefined") {
        if (top + TOOLTIP_H_ESTIMATE + pad > window.innerHeight) {
            placeBelow = false;
            top = anchor.y - TOOLTIP_H_ESTIMATE - ARROW - 4;
        }
        if (left + TOOLTIP_W + pad > window.innerWidth)
            left = window.innerWidth - TOOLTIP_W - pad;
        if (left < pad)
            left = pad;
    }
    const arrowX = Math.max(12, Math.min(TOOLTIP_W - 12, anchor.x - left)) - ARROW;
    return createPortal(_jsxs("div", { className: ui.tooltipRoot, style: { top, left }, children: [placeBelow && (_jsx("div", { style: {
                    position: "absolute",
                    top: -ARROW,
                    left: arrowX,
                    width: 0,
                    height: 0,
                    borderLeft: `${ARROW}px solid transparent`,
                    borderRight: `${ARROW}px solid transparent`,
                    borderBottom: `${ARROW}px solid #0f172a`,
                } })), _jsxs("div", { className: ui.tooltipPanel, style: { background: "#0f172a", color: "#ffffff" }, children: [_jsx("p", { className: ui.tooltipTitle, children: "How this is calculated" }), _jsx("p", { className: ui.tooltipLead, children: "Starts at 100, decreases with diagnoses & findings." }), _jsxs("div", { className: ui.tooltipStack, children: [_jsx(TooltipRow, { label: "Diagnoses", value: data.breakdown.diag }), _jsx(TooltipRow, { label: "Findings", value: data.breakdown.findings })] }), _jsxs("div", { className: ui.tooltipFooter, children: [_jsx("span", { className: ui.tooltipFooterMuted, children: "Total deducted" }), _jsxs("span", { className: ui.tooltipFooterVal, children: ["\u2212", data.totalDeduction] })] })] }), !placeBelow && (_jsx("div", { style: {
                    position: "absolute",
                    bottom: -ARROW,
                    left: arrowX,
                    width: 0,
                    height: 0,
                    borderLeft: `${ARROW}px solid transparent`,
                    borderRight: `${ARROW}px solid transparent`,
                    borderTop: `${ARROW}px solid #0f172a`,
                } }))] }), document.body);
}
function TooltipRow({ label, value }) {
    return (_jsxs("div", { className: ui.tooltipRow, children: [_jsx("span", { className: ui.tooltipRowLabel, children: label }), _jsxs("span", { className: ui.tooltipRowVal, children: ["\u2212", value] })] }));
}
const ARCH_SCOPE_BADGE = {
    RIGHT_ARCH: "R arch",
    LEFT_ARCH: "L arch",
    UPPER_ARCH: "Maxillary",
    LOWER_ARCH: "Mandibular",
};
function SingleToothPanel({ state }) {
    const isGroupedScope = state.selectionScopeType === "quadrant" || state.selectionScopeType === "full-mouth" || state.selectionScopeType === "arch";
    const entityLabel = isGroupedScope
        ? (state.selectionScopeLabel || "Selected Scope")
        : `${QUADRANT_LABELS[state.selectedTooth.quadrant]} ${state.selectedTooth.name}`;
    const entityBadge = isGroupedScope
        ? (state.selectionScopeType === "full-mouth"
            ? "FULL"
            : state.selectionScopeType === "arch"
                ? (ARCH_SCOPE_BADGE[state.selectionScopeId] ?? state.selectionScopeId)
                : (state.selectionScopeId || "Q"))
        : `T${state.selectedTooth.fdi}`;
    const [activeSection, setActiveSection] = useState("procedures");
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const tryBack = () => state.onBackToDentition();
    const sectionRefs = useRef({
        procedures: null, findings: null, planned: null, notes: null,
    });
    const clearAllToothData = () => {
        // Clear all diagnoses
        state.currentToothDiagnoses.forEach((d) => state.onToggleToothDiagnosis(d));
        // Clear implant
        if (state.isImplant)
            state.onToggleImplant();
        // Clear treatment-history table rows (incl. Dr Agent / voice merges)
        state.onClearTreatmentHistoryDetails?.();
        // Clear all entries (findings, procedures, planned)
        state.currentToothEntries.forEach((e) => state.onRemoveEntry(e.id));
        // Clear notes
        state.onUpdateToothNotes("");
        setShowClearConfirm(false);
    };
    const treatmentDetailCount = Object.keys(state.currentTreatmentHistoryDetails ?? {}).length;
    const hasAnyData = state.currentToothDiagnoses.size > 0 || state.isImplant || state.currentToothEntries.length > 0 || state.currentToothNotes.trim().length > 0 || treatmentDetailCount > 0;
    const findingCount = state.currentToothEntries.filter((e) => e.kind === "finding").length;
    const procedureCount = state.currentToothEntries.filter((e) => e.kind === "procedure").length;
    const plannedCount = state.currentToothEntries.filter((e) => e.kind === "planned").length;
    const diagnosisCount = state.currentToothDiagnoses.size + (state.isImplant ? 1 : 0);
    // Dental charting sections — standard clinical workflow order
    const sections = [
        { id: "procedures", label: "Treatment History", icon: "clipboard-activity", count: diagnosisCount + procedureCount },
        { id: "findings", label: "Findings", icon: "diagnosis", count: findingCount },
        { id: "planned", label: "Procedures", icon: "surgical-scissors-02", count: plannedCount },
        { id: "notes", label: isGroupedScope ? "Overall Group Notes" : "Overall Tooth Notes", icon: "note-2" },
    ];
    const jumpTo = (id) => {
        // Toggle: collapse if already active, otherwise expand
        if (activeSection === id) {
            setActiveSection(null);
            return;
        }
        setActiveSection(id);
        // Delay scroll until the accordion has expanded so we scroll to the expanded height.
        requestAnimationFrame(() => {
            sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    };
    return (_jsxs("div", { className: ui.panelRoot, children: [_jsx("header", { className: ui.panelHeader, children: _jsxs("div", { className: ui.panelHeaderRow, children: [_jsxs("div", { className: ui.panelHeaderLeft, children: [_jsx("div", { className: ui.panelThumb, children: isGroupedScope ? (_jsx(MiniScopeCanvas, { patientType: state.patientType ?? "adult", scopeType: state.selectionScopeType === "full-mouth" ? "full-mouth" : state.selectionScopeType === "arch" ? "arch" : "quadrant", fdis: state.selectionScopeFdis ?? [], toothDiagnoses: state.toothDiagnoses, findingsByTooth: state.findingsByTooth, implantTeeth: state.implantTeeth, size: 40 })) : (_jsx(MiniToothCanvas, { tooth: state.selectedTooth, size: 40, diagnoses: state.currentToothDiagnoses, isImplant: state.isImplant, findings: state.findings })) }), _jsx("div", { className: ui.panelTitleBlock, children: _jsxs("div", { className: ui.panelTitleRow, children: [_jsx("h3", { className: ui.panelTitle, children: entityLabel }), _jsx("span", { className: ui.panelBadge, children: entityBadge })] }) })] }), _jsxs("div", { className: ui.panelHeaderActions, children: [_jsx("button", { type: "button", className: ui.panelIconBtn, title: "Template", children: _jsx(Grid5, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("button", { type: "button", className: ui.panelIconBtn, title: "Save", children: _jsx(Ram, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsxs(AlertDialog, { open: showClearConfirm, onOpenChange: setShowClearConfirm, children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx("button", { type: "button", title: "Clear all data for this tooth", disabled: !hasAnyData, className: ui.panelIconBtnDanger, children: _jsx(Eraser, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }) }), _jsxs(AlertDialogContent, { className: ui.clearDialogContent, children: [_jsxs(AlertDialogHeader, { children: [_jsxs("div", { className: ui.clearDialogTitleRow, children: [_jsx("div", { className: ui.clearDialogIcon, children: _jsx(Trash, { color: "#ef4444", size: 18, variant: "Bulk" }) }), _jsx(AlertDialogTitle, { className: ui.clearDialogTitle, children: "Clear all data?" })] }), _jsxs(AlertDialogDescription, { className: ui.clearDialogDesc, children: ["This will remove all treatment history, findings, procedures, and notes for", " ", _jsxs("span", { className: ui.clearDialogStrong, children: [entityLabel, " (", entityBadge, ")"] }), ". This action cannot be undone."] })] }), _jsxs(AlertDialogFooter, { className: ui.clearDialogFooter, children: [_jsx(AlertDialogCancel, { className: ui.clearDialogCancel, children: "Cancel" }), _jsx(AlertDialogAction, { onClick: clearAllToothData, className: ui.clearDialogAction, children: "Clear all" })] })] })] }), _jsx("div", { className: ui.panelDivider }), _jsx("button", { type: "button", onClick: tryBack, className: ui.panelCloseBtn, title: "Close panel", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 256 256", children: [_jsx("rect", { width: "256", height: "256", fill: "none" }), _jsx("polyline", { points: "192 104 152 104 152 64", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "208", y1: "48", x2: "152", y2: "104", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("polyline", { points: "64 152 104 152 104 192", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "48", y1: "208", x2: "104", y2: "152", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("polyline", { points: "152 192 152 152 192 152", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "208", y1: "208", x2: "152", y2: "152", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("polyline", { points: "104 64 104 104 64 104", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "48", y1: "48", x2: "104", y2: "104", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" })] }) })] })] }) }), _jsxs("div", { className: ui.panelBody, children: [_jsx("div", { ref: (el) => { sectionRefs.current.procedures = el; }, children: _jsx(AccordionWrap, { open: activeSection === "procedures", onExpand: () => jumpTo("procedures"), header: _jsx(SectionHeader, { title: "Treatment History", count: diagnosisCount + procedureCount, medicalIcon: "clipboard-activity", onTemplate: activeSection === "procedures" ? () => { } : undefined, onSave: activeSection === "procedures" ? () => { } : undefined, onClear: activeSection === "procedures" ? () => {
                                    state.currentToothDiagnoses.forEach((d) => state.onToggleToothDiagnosis(d));
                                    if (state.isImplant)
                                        state.onToggleImplant();
                                    state.currentToothEntries.filter((e) => e.kind === "procedure").forEach((e) => state.onRemoveEntry(e.id));
                                    state.onClearTreatmentHistoryDetails?.();
                                } : undefined, clearDisabled: diagnosisCount === 0 && procedureCount === 0 && treatmentDetailCount === 0, chevron: activeSection === "procedures" ? "up" : "down", onClick: () => jumpTo("procedures"), onChevronClick: () => jumpTo("procedures") }), children: _jsx(PrimaryDiagnosisBody, { state: state }) }) }), _jsx("div", { ref: (el) => { sectionRefs.current.findings = el; }, children: _jsx(AccordionWrap, { open: activeSection === "findings", onExpand: () => jumpTo("findings"), header: _jsx(SectionHeader, { title: "Findings", count: findingCount, medicalIcon: "diagnosis", onTemplate: activeSection === "findings" ? () => { } : undefined, onSave: activeSection === "findings" ? () => { } : undefined, onClear: activeSection === "findings" ? () => {
                                    state.currentToothEntries.filter((e) => e.kind === "finding").forEach((e) => state.onRemoveEntry(e.id));
                                } : undefined, clearDisabled: findingCount === 0, chevron: activeSection === "findings" ? "up" : "down", onClick: () => jumpTo("findings"), onChevronClick: () => jumpTo("findings") }), children: _jsx(EntryTab, { state: state, kind: "finding" }) }) }), _jsx("div", { ref: (el) => { sectionRefs.current.planned = el; }, children: _jsx(AccordionWrap, { open: activeSection === "planned", onExpand: () => jumpTo("planned"), header: _jsx(SectionHeader, { title: "Procedures", count: plannedCount, medicalIcon: "surgical-scissors-02", onTemplate: activeSection === "planned" ? () => { } : undefined, onSave: activeSection === "planned" ? () => { } : undefined, onClear: activeSection === "planned" ? () => {
                                    state.currentToothEntries.filter((e) => e.kind === "planned").forEach((e) => state.onRemoveEntry(e.id));
                                } : undefined, clearDisabled: plannedCount === 0, chevron: activeSection === "planned" ? "up" : "down", onClick: () => jumpTo("planned"), onChevronClick: () => jumpTo("planned") }), children: _jsx(EntryTab, { state: state, kind: "planned" }) }) }), _jsx("div", { ref: (el) => { sectionRefs.current.notes = el; }, children: _jsx(AccordionWrap, { open: activeSection === "notes", onExpand: () => jumpTo("notes"), header: _jsx(SectionHeader, { title: isGroupedScope ? "Overall Group Notes" : "Overall Tooth Notes", medicalIcon: "note-2", onTemplate: activeSection === "notes" ? () => { } : undefined, onSave: activeSection === "notes" ? () => { } : undefined, onClear: activeSection === "notes" ? () => state.onUpdateToothNotes("") : undefined, chevron: activeSection === "notes" ? "up" : "down", onClick: () => jumpTo("notes"), onChevronClick: () => jumpTo("notes") }), children: _jsx("div", { className: ui.notesPad, children: _jsx("textarea", { value: state.currentToothNotes, onChange: (e) => state.onUpdateToothNotes(e.target.value), placeholder: isGroupedScope ? "General notes for this selected group…" : "General notes for this tooth…", className: ui.notesArea }) }) }) })] })] }));
}
// ──────────────────────────────────────────────────────────────
// AccordionWrap — rounded card with animated expand/collapse.
// Uses a measured height transition so content visibly slides open/shut.
// ──────────────────────────────────────────────────────────────
function AccordionWrap({ open, header, children, onExpand, }) {
    return (_jsxs("div", { className: clsx(ui.accordion, open ? ui.accordionOpen : ui.accordionClosed), onClick: open ? undefined : onExpand, children: [_jsx("div", { className: ui.accordionHeaderSlot, children: header }), _jsx("div", { className: ui.accordionGrid, style: {
                    gridTemplateRows: open ? '1fr' : '0fr',
                    opacity: open ? 1 : 0,
                    flex: open ? '1 1 0%' : '0 0 0px'
                }, children: _jsx("div", { className: ui.accordionGridInner, children: children }) })] }));
}
// ──────────────────────────────────────────────────────────────
// SectionHeader — TP medical icon + title + count + Template/Save/Clear
// Matches RxPad section header styling.
// ──────────────────────────────────────────────────────────────
function SectionHeader({ title, count, medicalIcon, onTemplate, onSave, onClear, clearDisabled, onClick, chevron, onChevronClick, }) {
    const stop = (e) => e.stopPropagation();
    const titleWithCount = typeof count === "number" ? `${title} (${count})` : title;
    return (_jsxs("header", { onClick: onClick, className: clsx(ui.secHead, onClick && ui.secHeadClick), children: [medicalIcon && (_jsx("span", { className: ui.secIcon, children: _jsx(TPMedicalIcon, { name: medicalIcon, variant: "bulk", size: 22, color: "var(--tp-violet-500)" }) })), _jsx("h4", { className: ui.secTitle, children: titleWithCount }), _jsx("div", { className: ui.secGrow }), _jsxs("div", { className: ui.secActions, onClick: stop, children: [onTemplate && (_jsx("button", { type: "button", title: "Templates", onClick: onTemplate, className: ui.secToolBtn, children: _jsx(Grid5, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) })), onSave && (_jsx("button", { type: "button", title: "Save as template", onClick: onSave, className: ui.secToolBtn, children: _jsx(Ram, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) })), onClear && (_jsx("button", { type: "button", title: "Clear", onClick: onClear, disabled: clearDisabled, className: ui.secToolBtn, children: _jsx(Eraser, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) })), chevron && (_jsx("button", { type: "button", onClick: (e) => { e.stopPropagation(); onChevronClick?.() ?? onClick?.(); }, className: ui.secChevronBtn, children: chevron === "up" ? (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", children: _jsx("path", { d: "M19.92 15.05L13.4 8.53c-.77-.77-2.03-.77-2.8 0l-6.52 6.52", stroke: "#334155", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }) })) : (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", children: _jsx("path", { d: "M19.92 8.95L13.4 15.47c-.77.77-2.03.77-2.8 0L4.08 8.95", stroke: "#64748b", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }) })) }))] })] }));
}
// ──────────────────────────────────────────────────────────────
// EntryTab — shared builder + table for Findings and Procedures
// ──────────────────────────────────────────────────────────────
function EntryTab({ state, kind }) {
    const [activeCell, setActiveCell] = useState(null);
    const [query, setQuery] = useState("");
    const { items: billingItems } = useBillingCatalog();
    const [plannedCustomOpen, setPlannedCustomOpen] = useState(false);
    const [plannedCustomInitial, setPlannedCustomInitial] = useState("");
    // Portal Dropdown Search States
    const [searchOpen, setSearchOpen] = useState(false);
    const [pos, setPos] = useState(null);
    const searchInputRef = useRef(null);
    const searchPopoverRef = useRef(null);
    useEffect(() => {
        if (!searchOpen) {
            setPos(null);
            return;
        }
        const reposition = () => {
            const el = searchInputRef.current;
            if (!el)
                return;
            const r = el.getBoundingClientRect();
            setPos({ top: r.bottom + 4, left: r.left, width: r.width });
        };
        reposition();
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
        return () => {
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [searchOpen, query]);
    useEffect(() => {
        const onDocClick = (e) => {
            if (searchInputRef.current && !searchInputRef.current.contains(e.target) &&
                searchPopoverRef.current && !searchPopoverRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);
    const isMissing = state.currentToothDiagnoses.has("Missing") || state.currentToothDiagnoses.has("Extraction");
    const isGroupedScope = state.selectionScopeType === "quadrant" || state.selectionScopeType === "full-mouth" || state.selectionScopeType === "arch";
    const groupedFindingCatalog = [
        "Generalized plaque accumulation",
        "Generalized gingival inflammation",
        "Quadrant-level calculus",
        "Generalized recession",
        "Generalized bleeding on probing",
        "Widespread sensitivity",
    ];
    const groupedProcedureCatalog = [
        "Quadrant scaling and root planing",
        "Full-arch scaling and root planing",
        "Full-mouth scaling and polishing",
        "Oral prophylaxis",
        "Fluoride varnish (full arch)",
        "Desensitization therapy (quadrant)",
        "Periodontal maintenance",
    ];
    const dentalProcedureNames = useMemo(() => {
        const unique = getUniqueDentalBillItems(billingItems);
        return sortStringsForTypeahead(unique.map((i) => i.name), "");
    }, [billingItems]);
    const catalog = kind === "finding"
        ? (isGroupedScope ? groupedFindingCatalog : DIAGNOSES)
        : kind === "symptom"
            ? DENTAL_SYMPTOM_CATALOG
            : kind === "planned"
                ? dentalProcedureNames
                : kind === "procedure"
                    ? (isGroupedScope ? groupedProcedureCatalog : PROCEDURE_CATALOG)
                    : PROCEDURE_CATALOG;
    const entries = state.currentToothEntries.filter((e) => e.kind === kind);
    const activeSurfaceRowId = activeCell?.colKey === "surfaces" ? activeCell.rowId : null;
    const activeRow = entries.find((e) => e.id === activeSurfaceRowId) ?? null;
    const setCellActive = useCallback((rowId, colKey) => {
        setActiveCell({ rowId, colKey });
    }, []);
    const clearCellActive = useCallback((rowId, colKey) => {
        window.setTimeout(() => {
            setActiveCell((current) => current && current.rowId === rowId && current.colKey === colKey ? null : current);
        }, 80);
    }, []);
    const isCellActive = useCallback((rowId, colKey) => activeCell?.rowId === rowId && activeCell?.colKey === colKey, [activeCell]);
    // Push multiSelectZones → active row.
    useEffect(() => {
        if (!activeRow)
            return;
        const zonesFromCanvas = Array.from(state.multiSelectZones);
        const same = zonesFromCanvas.length === activeRow.surfaces.length && zonesFromCanvas.every((z) => activeRow.surfaces.includes(z));
        if (!same)
            state.onUpdateEntry(activeRow.id, { surfaces: zonesFromCanvas });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.multiSelectZones, activeSurfaceRowId]);
    // Seed multiSelectZones when active row changes + toggle multi-select mode.
    useEffect(() => {
        if (!activeRow) {
            state.onClearMultiSelect();
            state.onSetMultiSelectActive(false);
            return;
        }
        state.onSetMultiSelectZones(activeRow.surfaces);
        state.onSetMultiSelectActive(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSurfaceRowId]);
    // Deactivate multi-select mode on unmount (switching tabs away).
    useEffect(() => () => { state.onSetMultiSelectActive(false); }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const filteredCatalog = useMemo(() => {
        const q = query.toLowerCase().trim();
        const selected = new Set(entries.map((e) => e.name.toLowerCase()));
        const pool = q ? catalog.filter((c) => c.toLowerCase().includes(q)) : catalog;
        const filtered = pool.filter((c) => !selected.has(c.toLowerCase()));
        const sorted = sortStringsForTypeahead(filtered, query);
        return sorted.slice(0, 12);
    }, [query, catalog, entries]);
    const queryTrim = query.trim();
    const catalogHasExactName =
        queryTrim.length > 0 && catalog.some((c) => c.toLowerCase() === queryTrim.toLowerCase());
    const quickSelectChips = useMemo(() => {
        const defaults = kind === "finding"
            ? (isGroupedScope
                ? ["Generalized plaque accumulation", "Generalized gingival inflammation", "Quadrant-level calculus", "Widespread sensitivity"]
                : ["Cavity/Caries", "Crack", "Fracture", "Sensitivity", "Plaque", "Calculus"])
            : kind === "planned"
                ? dentalProcedureNames.slice(0, 8)
                : (isGroupedScope
                    ? ["Quadrant scaling and root planing", "Full-mouth scaling and polishing", "Oral prophylaxis", "Periodontal maintenance"]
                    : ["RCT", "Restoration", "Extraction", "Scaling", "Polishing", "Crown Prep", "Implant Placement", "Veneer"]);
        const selected = new Set(entries.map((e) => e.name.toLowerCase()));
        return defaults.filter((name) => catalog.includes(name) && !selected.has(name.toLowerCase()));
    }, [catalog, entries, isGroupedScope, kind, dentalProcedureNames]);
    const pendingActivateRef = useRef(false);
    const prevCountRef = useRef(entries.length);
    useEffect(() => {
        if (pendingActivateRef.current && entries.length > prevCountRef.current) {
            const latest = entries[entries.length - 1];
            if (latest)
                setActiveCell({ rowId: latest.id, colKey: "surfaces" });
            pendingActivateRef.current = false;
        }
        prevCountRef.current = entries.length;
    }, [entries.length, entries]);
    const addEntryFromName = (name) => {
        state.onClearMultiSelect();
        const surfaces = getDefaultTreatmentSurfaces(name);
        pendingActivateRef.current = true;
        state.onAddEntry({
            kind,
            name,
            surfaces,
            since: undefined,
            plannedDate: undefined,
            status: (kind === "procedure" || kind === "planned") ? "planned" : undefined,
            notes: undefined,
        });
        setQuery("");
    };
    if (isMissing) {
        return (_jsx("div", { className: ui.missingWrap, children: _jsxs("p", { className: ui.missingText, children: ["Tooth marked as Missing \u2014 no surfaces to ", kind === "finding" ? "examine" : "treat", "."] }) }));
    }
    const hasStatus = kind === "procedure" || kind === "planned";
    return (_jsxs(_Fragment, { children: [_jsxs("div", { "data-rx-module-root": true, className: ui.entryRoot, children: [entries.length > 0 && (_jsx("div", { className: ui.tableWrap, children: _jsxs("table", { className: ui.table, children: [_jsxs("colgroup", { children: [_jsx("col", { style: { width: 36, minWidth: 36 } }), _jsx("col", { style: { minWidth: 150 } }), _jsx("col", { style: { width: 140, minWidth: 120 } }), _jsx("col", { style: { width: 120, minWidth: 110 } }), hasStatus && _jsx("col", { style: { width: 120, minWidth: 110 } }), _jsx("col", { style: { minWidth: 120 } }), _jsx("col", { style: { width: 44, minWidth: 44, maxWidth: 44 } })] }), _jsx("thead", { children: _jsxs("tr", { className: ui.theadRow, children: [_jsx("th", { className: ui.thCenter }), _jsx("th", { className: ui.th, children: "NAME" }), _jsx("th", { className: ui.th, children: "SURFACES" }), _jsx("th", { className: ui.th, children: kind === "finding" ? "SINCE" : "DATE" }), hasStatus && _jsx("th", { className: ui.th, children: "STATUS" }), _jsx("th", { className: ui.th, children: "NOTE" }), _jsx("th", { className: ui.thSticky })] }) }), _jsx("tbody", { children: entries.map((e) => {
                                const isSurfaceActive = isCellActive(e.id, "surfaces");
                                const isDateActive = isCellActive(e.id, kind === "finding" || kind === "symptom" ? "since" : "date");
                                const isStatusActive = isCellActive(e.id, "status");
                                const isNoteActive = isCellActive(e.id, "note");
                                const activateSurfaceCell = () => {
                                    setCellActive(e.id, "surfaces");
                                    state.onSetMultiSelectZones(e.surfaces);
                                    state.onSetMultiSelectActive(true);
                                };
                                return (_jsxs("tr", { onMouseEnter: () => { if (!isSurfaceActive)
                                        state.onSetHighlightZones(e.surfaces); }, onMouseLeave: () => { if (!isSurfaceActive)
                                        state.onSetHighlightZones([]); }, className: ui.tbodyRow, children: [_jsx("td", { className: clsx(ui.td, ui.tdGrip), children: _jsx("span", { className: ui.gripIcon, children: _jsxs("svg", { width: "8", height: "16", viewBox: "0 0 8 16", fill: "currentColor", children: [_jsx("circle", { cx: "2", cy: "3", r: "1.2" }), _jsx("circle", { cx: "2", cy: "8", r: "1.2" }), _jsx("circle", { cx: "2", cy: "13", r: "1.2" }), _jsx("circle", { cx: "6", cy: "3", r: "1.2" }), _jsx("circle", { cx: "6", cy: "8", r: "1.2" }), _jsx("circle", { cx: "6", cy: "13", r: "1.2" })] }) }) }), _jsx("td", { className: clsx(ui.td, ui.tdHover), onClick: (ev) => ev.stopPropagation(), children: _jsx(EditableNameCell, { value: e.name, catalog: catalog, onCommit: (v) => { if (v.trim())
                                                    state.onUpdateEntry(e.id, { name: v.trim() }); }, onFocusActivate: () => setCellActive(e.id, "name") }) }), _jsxs("td", { className: clsx(ui.td, ui.tdRel, isSurfaceActive ? ui.tdActive : ui.tdHover), onClick: (ev) => ev.stopPropagation(), children: [isSurfaceActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsx(SurfaceCellDropdown, { entry: e, arch: state.selectedTooth.arch, toothPosition: state.selectedTooth.position, mode: kind === "finding" ? "finding" : kind === "symptom" ? "symptom" : "treatment", isActive: isSurfaceActive, onActivate: activateSurfaceCell, onDeactivate: () => {
                                                        if (state.selectedZone === "whole")
                                                            state.onClearSelectedZone();
                                                        clearCellActive(e.id, "surfaces");
                                                    }, onToggleZone: state.onToggleZoneMultiSelect, onHover: state.onSetHighlightZones, multiSelectZones: state.multiSelectZones })] }), _jsxs("td", { className: clsx(ui.td, ui.tdRel, isDateActive ? ui.tdActive : ui.tdHover), onClick: (ev) => ev.stopPropagation(), children: [isDateActive ? _jsx("span", { className: ui.cellFocusRing }) : null, kind === "finding" || kind === "symptom" ? (_jsx(SinceDropdown, { value: e.since ?? "", onChange: (v) => state.onUpdateEntry(e.id, { since: v || undefined }), onFocusActivate: () => setCellActive(e.id, "since"), onBlurDeactivate: () => clearCellActive(e.id, "since") })) : (_jsxs("div", { className: ui.dateCellInner, children: [!e.plannedDate && (_jsxs("div", { className: ui.datePlaceholderRow, children: [_jsx("span", { className: ui.datePlaceholderText, children: "DD/MM/YYYY" }), _jsx(Calendar, { size: 14, color: "#94a3b8", variant: "Linear" })] })), _jsx("input", { type: "date", value: e.plannedDate ?? "", onChange: (ev) => state.onUpdateEntry(e.id, { plannedDate: ev.target.value || undefined }), onFocus: () => setCellActive(e.id, "date"), onBlur: () => clearCellActive(e.id, "date"), className: clsx(ui.dateInput, e.plannedDate ? ui.dateInputFilled : ui.dateInputEmpty) })] }))] }), hasStatus && (_jsxs("td", { className: clsx(ui.td, ui.tdRel, isStatusActive && ui.tdActive), onClick: (ev) => ev.stopPropagation(), children: [isStatusActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsxs("select", { value: e.status ?? "planned", onChange: (ev) => state.onUpdateEntry(e.id, { status: ev.target.value }), onFocus: () => setCellActive(e.id, "status"), onBlur: () => clearCellActive(e.id, "status"), className: ui.selectNative, children: [_jsx("option", { value: "planned", children: "Planned" }), _jsx("option", { value: "in-progress", children: "In progress" }), _jsx("option", { value: "completed", children: "Completed" })] })] })), _jsxs("td", { className: clsx(ui.td, ui.tdRel, isNoteActive ? ui.tdActive : ui.tdHover), onClick: (ev) => ev.stopPropagation(), children: [isNoteActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsx("input", { type: "text", value: e.notes ?? "", onChange: (ev) => state.onUpdateEntry(e.id, { notes: ev.target.value }), onFocus: () => setCellActive(e.id, "note"), onBlur: () => clearCellActive(e.id, "note"), placeholder: "e.g. Monitor at next visit", className: ui.noteInput })] }), _jsx("td", { className: ui.tdStickyAct, onClick: (ev) => ev.stopPropagation(), children: _jsx("button", { type: "button", onClick: () => { if (activeSurfaceRowId === e.id)
                                                    setActiveCell(null); state.onRemoveEntry(e.id); }, title: "Remove", className: ui.removeRowBtn, children: _jsx(Trash, { size: 14, color: "currentColor", variant: "Linear" }) }) })] }, e.id));
                            }) })] }) })), _jsxs("div", { className: clsx(entries.length > 0 ? ui.searchBlock : ui.searchBlockFirst), children: [_jsxs("div", { className: ui.searchRel, children: [_jsx("span", { className: ui.searchIconAbs, children: _jsx(SearchNormal1, { size: 14, color: "currentColor", variant: "Linear" }) }), _jsx("input", { ref: searchInputRef, type: "text", value: query, onChange: (e) => { setQuery(e.target.value); setSearchOpen(true); }, onFocus: () => setSearchOpen(true), onKeyDown: (e) => {
                                    if (e.key === "Enter" && queryTrim) {
                                        const match = catalog.find((c) => c.toLowerCase() === queryTrim.toLowerCase());
                                        if (match) {
                                            addEntryFromName(match);
                                            setSearchOpen(false);
                                        }
                                        else if (kind === "planned") {
                                            setPlannedCustomInitial(queryTrim);
                                            setPlannedCustomOpen(true);
                                            setSearchOpen(false);
                                        }
                                        else if (kind === "finding" && !catalogHasExactName) {
                                            addEntryFromName(queryTrim);
                                            setSearchOpen(false);
                                        }
                                    }
                                }, placeholder: kind === "finding"
                                    ? (isGroupedScope ? "Search & Add Group Finding" : "Search & Add Examination")
                                    : kind === "symptom"
                                        ? "Search & Add Symptom"
                                        : kind === "planned"
                                            ? (isGroupedScope ? "Search & Add Group Planned Procedure" : "Search & Add Planned Procedure")
                                            : (isGroupedScope ? "Search & Add Group Procedure" : "Search & Add Procedure"), className: ui.searchInput }), searchOpen && pos && typeof document !== "undefined" && (filteredCatalog.length > 0 || query.trim()) && createPortal(_jsxs("div", { ref: searchPopoverRef, className: ui.popover, style: { top: pos.top, left: pos.left, width: pos.width }, children: [(kind === "planned" || kind === "procedure") && (filteredCatalog.length > 0 || query.trim()) && (_jsx("div", { className: ui.popoverSectionHeader, children: _jsx("p", { className: ui.popoverSectionTitle, children: kind === "planned" ? "Dental service" : "Procedure" }) })), filteredCatalog.map((c) => (_jsx("button", { type: "button", onClick: () => addEntryFromName(c), className: ui.popoverItem, children: c }, c))), queryTrim && !catalogHasExactName && (_jsx("button", { className: ui.popoverAdd, onClick: () => {
                                            if (kind === "planned") {
                                                setPlannedCustomInitial(query.trim());
                                                setPlannedCustomOpen(true);
                                                setSearchOpen(false);
                                            }
                                            else {
                                                addEntryFromName(query.trim());
                                            }
                                        }, children: kind === "planned" ? _jsxs("span", { className: ui.popoverAddInner, children: [_jsx(Add, { size: 16, color: "var(--tp-blue-600)", variant: "Bold" }), _jsxs("span", { children: ["Add \"", query.trim(), "\" as custom dental service"] })] }) : _jsxs("span", { className: ui.popoverAddInner, children: [_jsx(Add, { size: 14, color: "currentColor", variant: "Linear" }), " Add \"", query.trim(), "\""] }) }))] }), document.body)] }), query.length === 0 && quickSelectChips.length > 0 && (_jsx("div", { className: ui.chipRow, children: quickSelectChips.map((chip) => (_jsx("button", { type: "button", onClick: () => addEntryFromName(chip), className: ui.chipBtn, children: chip }, chip))) }))] })] }), kind === "planned" && _jsx(AddDentalBillItemDrawer, { open: plannedCustomOpen, onOpenChange: setPlannedCustomOpen, initialName: plannedCustomInitial, onSaved: (item) => { addEntryFromName(item.name); } })] }));
}
// ──────────────────────────────────────────────────────────────
// SurfaceCellDropdown — in-cell dropdown with highlighted hint row
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// EditableNameCell — click to turn a name cell into an input + catalog dropdown
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// DiagnosisNameCell — editable diagnosis name w/ swap dropdown
// ──────────────────────────────────────────────────────────────
function DiagnosisNameCell({ name, color, activeRows, onSwap, }) {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);
    const [pos, setPos] = useState(null);
    useEffect(() => {
        if (!open) {
            setPos(null);
            return;
        }
        const onDoc = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target))
                setOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, [open]);
    useEffect(() => {
        if (!open) {
            setPos(null);
            return;
        }
        const reposition = () => {
            const el = wrapRef.current;
            if (!el)
                return;
            const r = el.getBoundingClientRect();
            setPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 200) });
        };
        reposition();
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
        return () => {
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [open]);
    // Available diagnoses to swap to (exclude currently-active ones except self).
    const options = TOOTH_DIAGNOSES.filter((d) => d === name || !activeRows.includes(d));
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(name);
    const [highlightIdx, setHighlightIdx] = useState(0);
    const inputRef = useRef(null);
    useEffect(() => { if (!editing)
        setDraft(name); }, [name, editing]);
    useEffect(() => { setHighlightIdx(0); }, [draft]);
    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
            setTimeout(() => {
                if (inputRef.current)
                    inputRef.current.setSelectionRange(draft.length, draft.length);
            }, 0);
        }
    }, [editing, draft.length]);
    const filtered = useMemo(() => {
        const q = draft.toLowerCase().trim();
        if (!q)
            return options;
        return options.filter((c) => c.toLowerCase().includes(q));
    }, [draft, options]);
    const commit = (next) => {
        setEditing(false);
        setOpen(false);
        const trimmed = next.trim();
        if (trimmed && trimmed !== name)
            onSwap(trimmed);
        else
            setDraft(name);
    };
    // Suppress unused variable warning (color no longer rendered)
    void color;
    return (_jsxs("div", { ref: wrapRef, className: ui.rel, children: [!editing ? (_jsx("button", { type: "button", onClick: () => { setEditing(true); setOpen(true); setDraft(name); }, className: clsx(ui.diagToggleBtn, open && ui.diagToggleOpen), children: _jsx("span", { className: ui.diagToggleLabel, children: name }) })) : (_jsx("input", { ref: inputRef, type: "text", value: draft, onChange: (e) => { setDraft(e.target.value); setOpen(true); }, onKeyDown: (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        const pick = filtered[highlightIdx];
                        commit(pick ?? (draft.trim() || name));
                    }
                    else if (e.key === "Escape") {
                        setEditing(false);
                        setOpen(false);
                        setDraft(name);
                    }
                    else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        const totalItems = filtered.length + ((draft.trim().length > 0 && !options.some((o) => o.toLowerCase() === draft.trim().toLowerCase())) ? 1 : 0);
                        setHighlightIdx((i) => Math.min(totalItems - 1, i + 1));
                    }
                    else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setHighlightIdx((i) => Math.max(0, i - 1));
                    }
                }, onBlur: () => { }, placeholder: "Search & Add Diagnosis...", className: ui.nameComboInput })), open && pos && typeof document !== "undefined" && createPortal(_jsxs("ul", { className: ui.portalList, style: { top: pos.top, left: pos.left, width: pos.width }, children: [filtered.map((d, i) => {
                        const isCurrent = d === name;
                        const highlighted = i === highlightIdx;
                        return (_jsx("li", { children: _jsxs("button", { type: "button", onMouseEnter: () => setHighlightIdx(i), onMouseDown: (e) => { e.preventDefault(); commit(d); }, className: clsx(ui.menuRowBtn, highlighted && ui.menuRowBtnHi, isCurrent && ui.menuRowStrong), children: [_jsx("span", { className: ui.menuRowGrow, children: d }), isCurrent && _jsx("span", { className: ui.menuCurrentHint, children: "current" })] }) }, d));
                    }), draft.trim().length > 0 && !options.some((o) => o.toLowerCase() === draft.trim().toLowerCase()) && (_jsx("div", { className: ui.customAddMargin, children: _jsxs("button", { type: "button", onMouseDown: (e) => { e.preventDefault(); commit(draft.trim()); }, onMouseEnter: () => setHighlightIdx(filtered.length), className: clsx(ui.customAddBtn, highlightIdx === filtered.length && ui.customAddBtnHi), children: [_jsx(Add, { size: 12, color: "currentColor", variant: "Linear" }), "Add custom: \"", draft.trim(), "\""] }) }))] }), document.body)] }));
}
function EditableNameCell({ value, catalog, onCommit, onFocusActivate, }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);
    const [highlightIdx, setHighlightIdx] = useState(0);
    const inputRef = useRef(null);
    const wrapRef = useRef(null);
    const listRef = useRef(null);
    const [pos, setPos] = useState(null);
    useEffect(() => { if (!editing)
        setDraft(value); }, [value, editing]);
    useEffect(() => { setHighlightIdx(0); }, [draft]);
    const filtered = useMemo(() => {
        const q = draft.toLowerCase().trim();
        if (!q)
            return catalog.slice(0, 8);
        return catalog.filter((c) => c.toLowerCase().includes(q) && c !== value).slice(0, 8);
    }, [draft, catalog, value]);
    const hasExactMatch = useMemo(() => filtered.some((c) => c.toLowerCase() === draft.trim().toLowerCase()) || catalog.some((c) => c.toLowerCase() === draft.trim().toLowerCase()), [filtered, catalog, draft]);
    const showCustom = draft.trim().length > 0 && !hasExactMatch;
    const totalItems = filtered.length + (showCustom ? 1 : 0);
    const commit = useCallback((next) => {
        setEditing(false);
        setPos(null);
        const trimmed = next.trim();
        if (trimmed && trimmed !== value)
            onCommit(trimmed);
    }, [value, onCommit]);
    useEffect(() => {
        if (!editing)
            return;
        const onDoc = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target) && listRef.current && !listRef.current.contains(e.target)) {
                commit(draft);
            }
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, [editing, draft, commit]);
    useEffect(() => {
        if (!editing) {
            setPos(null);
            return;
        }
        const reposition = () => {
            const el = wrapRef.current;
            if (!el)
                return;
            const r = el.getBoundingClientRect();
            setPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 200) });
        };
        reposition();
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
        return () => {
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [editing]);
    const onKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIdx((i) => Math.min(totalItems - 1, i + 1));
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIdx((i) => Math.max(0, i - 1));
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            if (totalItems === 0 && !draft.trim())
                return;
            if (totalItems === 0 && draft.trim())
                commit(draft.trim());
            else if (highlightIdx < filtered.length)
                commit(filtered[highlightIdx]);
            else
                commit(draft.trim()); // custom row
        }
        else if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
            setPos(null);
        }
    };
    if (!editing) {
        return (_jsx("button", { type: "button", onClick: () => { setEditing(true); setDraft(value); onFocusActivate?.(); setTimeout(() => inputRef.current?.focus(), 0); }, className: ui.editIdleBtn, children: _jsx("span", { className: ui.editIdleLabel, children: value }) }));
    }
    return (_jsxs("div", { ref: wrapRef, className: ui.rel, children: [_jsx("input", { ref: inputRef, type: "text", value: draft, onChange: (e) => setDraft(e.target.value), onKeyDown: onKeyDown, placeholder: "Search...", className: ui.nameComboInput }), (filtered.length > 0 || showCustom) && typeof document !== "undefined" && pos && createPortal(_jsxs("div", { ref: listRef, className: ui.portalListWide, style: { top: pos.top, left: pos.left, width: pos.width }, children: [_jsx("ul", { children: filtered.map((c, i) => {
                            const highlighted = i === highlightIdx;
                            return (_jsx("li", { children: _jsx("button", { type: "button", onMouseDown: (e) => { e.preventDefault(); commit(c); }, onMouseEnter: () => setHighlightIdx(i), className: clsx(ui.menuRowBtn, highlighted && ui.menuRowBtnHi), children: c }) }, c));
                        }) }), showCustom && (_jsx("div", { className: ui.customAddMargin, children: _jsxs("button", { type: "button", onMouseDown: (e) => { e.preventDefault(); commit(draft.trim()); }, onMouseEnter: () => setHighlightIdx(filtered.length), className: clsx(ui.customAddBtn, highlightIdx === filtered.length && ui.customAddBtnHi), children: [_jsx(Add, { size: 12, color: "currentColor", variant: "Linear" }), "Add custom: \"", draft.trim(), "\""] }) }))] }), document.body)] }));
}
function SurfaceCellDropdown({ entry, arch, toothPosition, isActive, mode, onActivate, onDeactivate, onToggleZone, onHover, multiSelectZones, }) {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState(null);
    const anchorRef = useRef(null);
    const popoverRef = useRef(null);
    const wasActiveRef = useRef(false);
    // Auto-open when this row becomes active (user just clicked a search chip).
    useEffect(() => {
        if (isActive && !wasActiveRef.current)
            setOpen(true);
        if (!isActive)
            setOpen(false);
        wasActiveRef.current = isActive;
    }, [isActive]);
    // Compute portal position when opened / on scroll / resize.
    useEffect(() => {
        if (!open) {
            setPos(null);
            return;
        }
        const reposition = () => {
            const el = anchorRef.current;
            if (!el)
                return;
            const r = el.getBoundingClientRect();
            setPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 240) });
        };
        reposition();
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
        return () => {
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [open]);
    useEffect(() => {
        if (!open)
            return;
        const onDoc = (e) => {
            const a = anchorRef.current, p = popoverRef.current;
            const t = e.target;
            if (t?.tagName === "CANVAS" ||
                t?.closest("[data-dental-annotation-ui='true']") ||
                t?.closest("[data-surface-selector-ui='true']"))
                return;
            if (a && !a.contains(t) && p && !p.contains(t)) {
                setOpen(false);
                onDeactivate?.();
            }
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, [open, onDeactivate]);
    // When the dropdown is open AND this is the active row, what the user sees
    // mirrors multiSelectZones. When NOT active, show the entry's saved surfaces.
    const shown = isActive ? Array.from(multiSelectZones) : entry.surfaces;
    // Whole tooth = array containing 'whole'
    const isWholeTooth = shown.includes("whole");
    const toggle = (z) => {
        if (!isActive) {
            onActivate();
            return;
        }
        onToggleZone(z);
    };
    const clickWholeTooth = () => {
        if (!isActive)
            onActivate();
        onToggleZone("whole");
    };
    return (_jsxs(_Fragment, { children: [_jsxs("button", { ref: anchorRef, type: "button", onClick: () => {
                    if (open) {
                        setOpen(false);
                        onDeactivate?.();
                        return;
                    }
                    onActivate();
                    setOpen(true);
                }, className: ui.surfaceTriggerBtn, children: [_jsx("span", { className: ui.surfaceTriggerText, children: shown.length === 0 ? (_jsx("span", { className: ui.surfacePlaceholder, children: "Select surface" })) : isWholeTooth ? (_jsxs("span", { className: ui.surfaceInlineRow, children: [_jsx("span", { className: ui.surfaceDot8, style: { background: ZONE_INFO.whole.color } }), "Whole tooth"] })) : (_jsx(SurfaceDots, { surfaces: shown, arch: arch, toothPosition: toothPosition })) }), _jsx("svg", { width: "10", height: "6", viewBox: "0 0 10 6", fill: "none", style: { transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }, children: _jsx("path", { d: "M1 1L5 5L9 1", stroke: "#94a3b8", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })] }), open && pos && typeof document !== "undefined" && createPortal(_jsxs("div", { ref: popoverRef, className: ui.surfacePopover, style: { top: pos.top, left: pos.left, width: pos.width }, children: [_jsx("div", { className: ui.surfacePopoverPad, children: _jsxs("div", { className: ui.surfaceHint, children: [_jsx(InfoCircle, { size: 13, color: "var(--tp-amber-700)", variant: "Bold" }), _jsxs("span", { className: ui.surfaceHintText, children: ["Tap the ", _jsx("span", { className: ui.surfaceHintBold, children: "3D tooth" }), " to select surfaces, or pick from the list below"] })] }) }), _jsxs("ul", { className: ui.surfaceZoneList, children: [_jsx("li", { children: _jsxs("button", { type: "button", onClick: clickWholeTooth, className: ui.surfaceZoneBtn, children: [_jsx("span", { className: clsx(ui.surfaceCheck, isWholeTooth && ui.surfaceCheckOn), children: isWholeTooth && (_jsx("svg", { width: "9", height: "9", viewBox: "0 0 10 10", fill: "none", children: _jsx("path", { d: "M2 5L4 7L8 3", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) })) }), _jsx("span", { className: ui.surfaceDot8, style: { background: ZONE_INFO.whole.color } }), _jsx("span", { className: clsx(ui.surfaceMenuLabel, ui.surfaceMenuStrong), children: "Whole tooth" })] }) }), _jsx("li", { className: ui.surfaceListRule }), ALL_ZONES.map((z) => {
                                const checked = shown.includes(z);
                                const label = getZoneLabel(z, arch, toothPosition);
                                return (_jsx("li", { children: _jsxs("button", { type: "button", onClick: () => toggle(z), onMouseEnter: () => onHover([z]), onMouseLeave: () => onHover(shown), className: ui.surfaceZoneBtn, children: [_jsx("span", { className: clsx(ui.surfaceCheck, checked && ui.surfaceCheckOn), children: checked && (_jsx("svg", { width: "9", height: "9", viewBox: "0 0 10 10", fill: "none", children: _jsx("path", { d: "M2 5L4 7L8 3", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) })) }), _jsx("span", { className: ui.surfaceDot8, style: { background: ZONE_INFO[z].color } }), _jsx("span", { className: ui.surfaceMenuLabel, children: label })] }) }, z));
                            })] })] }), document.body)] }));
}
function getDynamicSinceOptions(query) {
    const match = query.match(/\d+/);
    const n = match ? parseInt(match[0], 10) : 1;
    const plural = n > 1 ? "s" : "";
    return [
        `${n} hour${plural}`,
        `${n} day${plural}`,
        `${n} month${plural}`,
        `${n} year${plural}`,
    ];
}
function SinceDropdown({ value, onChange, autoOpen, onFocusActivate, onBlurDeactivate }) {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(value);
    const [pos, setPos] = useState(null);
    const anchorRef = useRef(null);
    const popoverRef = useRef(null);
    useEffect(() => {
        if (autoOpen && !value)
            setOpen(true);
    }, [autoOpen, value]);
    useEffect(() => { setInternalValue(value); }, [value]);
    const options = useMemo(() => {
        return internalValue && internalValue.match(/\d+/) ? getDynamicSinceOptions(internalValue) : [
            "1 hour", "1 day", "1 week", "1 year"
        ];
    }, [internalValue]);
    useEffect(() => {
        if (!open) {
            setPos(null);
            return;
        }
        const reposition = () => {
            const el = anchorRef.current;
            if (!el)
                return;
            const r = el.getBoundingClientRect();
            setPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 200) });
        };
        reposition();
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
        return () => {
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [open]);
    useEffect(() => {
        if (!open)
            return;
        const onDoc = (e) => {
            const a = anchorRef.current, p = popoverRef.current;
            const t = e.target;
            if (a && !a.contains(t) && p && !p.contains(t)) {
                setOpen(false);
                onBlurDeactivate?.();
            }
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, [open, onBlurDeactivate]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: ui.sinceAnchor, ref: anchorRef, children: [_jsx("input", { type: "text", value: internalValue, onFocus: () => { onFocusActivate?.(); setOpen(true); }, onChange: (e) => {
                            setInternalValue(e.target.value);
                            setOpen(true);
                        }, onKeyDown: (e) => {
                            if (e.key === "Enter") {
                                onChange(internalValue);
                                setOpen(false);
                            }
                        }, placeholder: "e.g. 5 days", className: ui.sinceInput }), _jsx("svg", { className: ui.sinceChevronAbs, width: "10", height: "6", viewBox: "0 0 10 6", fill: "none", style: { transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s", flexShrink: 0 }, children: _jsx("path", { d: "M1 1L5 5L9 1", stroke: "#94a3b8", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })] }), open && pos && createPortal(_jsx("div", { ref: popoverRef, className: ui.sinceMenu, style: { top: pos.top, left: pos.left, width: pos.width }, children: options.map((opt) => (_jsx("button", { type: "button", className: ui.popoverItem, onClick: () => {
                        onChange(opt);
                        setOpen(false);
                    }, children: opt }, opt))) }), document.body)] }));
}
function SurfaceMultiSelect({ selected, arch, toothPosition, onToggle, onHover, }) {
    return (_jsx("div", { className: ui.zoneChipsRow, children: ALL_ZONES.map((z) => {
            const isActive = selected.includes(z);
            const label = getZoneLabel(z, arch, toothPosition);
            const color = ZONE_INFO[z].color;
            return (_jsxs("button", { type: "button", onClick: () => onToggle(z), onMouseEnter: () => onHover([z]), onMouseLeave: () => onHover(selected), className: clsx(ui.zoneChip, isActive ? ui.zoneChipOn : ui.zoneChipOff), children: [_jsx("span", { className: ui.surfaceDot8, style: { background: color } }), label] }, z));
        }) }));
}
function SurfaceDots({ surfaces, arch, toothPosition, }) {
    if (surfaces.length === 0) {
        return (_jsx("span", { className: ui.dotsWholePill, children: "Whole tooth" }));
    }
    const abbr = (z) => {
        const label = getZoneLabel(z, arch, toothPosition);
        return label[0];
    };
    const shown = surfaces.slice(0, 4);
    const overflow = surfaces.length - shown.length;
    const overflowTitle = overflow > 0
        ? surfaces.slice(4).map((z) => getZoneLabel(z, arch, toothPosition)).join(", ")
        : undefined;
    return (_jsxs("div", { className: ui.dotsRow, children: [shown.map((z) => (_jsx("span", { title: getZoneLabel(z, arch, toothPosition), className: ui.dotsAbbr, style: { background: ZONE_INFO[z].color }, children: abbr(z) }, z))), overflow > 0 && (_jsxs("span", { title: overflowTitle, className: ui.dotsMore, children: ["+", overflow] }))] }));
}
const DENTAL_SYMPTOM_CATALOG = [
    "Tooth pain", "Sensitivity to cold", "Sensitivity to hot", "Sensitivity to sweet",
    "Throbbing pain", "Pain on biting", "Swelling", "Bleeding gums",
    "Bad breath", "Loose tooth", "Discolouration", "Difficulty chewing",
    "Jaw pain", "Clicking sound", "Food impaction", "Spontaneous pain",
];
let _symId = 0;
const getSymId = () => `sym-${++_symId}`;
function SymptomSurfacePicker({ surfaces, arch, toothPosition, mode = "symptom", onChange }) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const popoverRef = useRef(null);
    const [pos, setPos] = useState(null);
    const selected = new Set(surfaces);
    useEffect(() => {
        if (!open) {
            setPos(null);
            return;
        }
        const el = anchorRef.current;
        if (!el)
            return;
        const r = el.getBoundingClientRect();
        setPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 200) });
    }, [open]);
    useEffect(() => {
        if (!open)
            return;
        const onDoc = (e) => {
            const a = anchorRef.current, p = popoverRef.current, t = e.target;
            if (a && !a.contains(t) && p && !p.contains(t))
                setOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, [open]);
    const toggle = (z) => {
        if (z === "whole") {
            onChange(selected.has(z) ? [] : ["whole"]);
            return;
        }
        if (selected.has("whole")) {
            onChange([z]);
            return;
        }
        onChange(selected.has(z) ? surfaces.filter((s) => s !== z) : [...surfaces, z]);
    };
    const optionsList = mode === "symptom" ? ALL_ZONES : ["whole", ...ALL_ZONES];
    return (_jsxs(_Fragment, { children: [_jsxs("button", { ref: anchorRef, type: "button", onClick: () => setOpen((o) => !o), className: clsx(ui.symTrigger, open && ui.symTriggerOpen), children: [_jsx("span", { className: ui.surfaceTriggerText, children: surfaces.length === 0 ? (_jsx("span", { className: ui.symMuted, children: "Select surface" })) : surfaces.includes("whole") ? (_jsxs("span", { className: ui.surfaceInlineRow, children: [_jsx("span", { className: ui.surfaceDot8, style: { background: "#94a3b8" } }), "Whole tooth"] })) : (_jsx(SurfaceDots, { surfaces: surfaces.filter(z => z !== "whole"), arch: arch, toothPosition: toothPosition })) }), _jsx("svg", { width: "10", height: "6", viewBox: "0 0 10 6", fill: "none", style: { transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }, children: _jsx("path", { d: "M1 1l4 4 4-4", stroke: "#94a3b8", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })] }), open && pos && typeof document !== "undefined" && createPortal(_jsx("div", { ref: popoverRef, className: ui.surfacePopover, style: { top: pos.top, left: pos.left, width: pos.width }, children: _jsx("ul", { className: ui.surfaceZoneList, children: optionsList.map((z) => {
                        let checked = selected.has(z);
                        let label = getZoneLabel(z, arch, toothPosition);
                        let color = ZONE_INFO[z]?.color || "#888";
                        if (z === "whole") {
                            label = "Whole Tooth";
                            color = "#64748b";
                            if (mode !== "treatment") {
                                checked = ALL_ZONES.every(az => selected.has(az));
                            }
                        }
                        return (_jsx("li", { children: _jsxs("button", { type: "button", onMouseDown: (e) => { e.preventDefault(); toggle(z); }, className: ui.surfaceZoneBtn, children: [_jsx("span", { className: clsx(ui.surfaceCheck, checked && ui.surfaceCheckOn), children: checked && _jsx("svg", { width: "8", height: "8", viewBox: "0 0 24 24", fill: "none", children: _jsx("path", { d: "M6 12l4.5 4.5L18 7.5", stroke: "#fff", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsx("span", { className: ui.surfaceDot8, style: { background: color } }), _jsx("span", { className: ui.surfaceMenuLabel, children: label })] }) }, z));
                    }) }) }), document.body)] }));
}
function DentalSymptomsBody({ rows, onUpdateRows, state }) {
    const [query, setQuery] = useState("");
    const [activeRowId, setActiveRowId] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const searchInputRef = useRef(null);
    const searchPopoverRef = useRef(null);
    useEffect(() => {
        if (!searchOpen)
            return;
        const onDoc = (e) => {
            const el = e.target;
            if (searchInputRef.current && !searchInputRef.current.contains(el) && searchPopoverRef.current && !searchPopoverRef.current.contains(el)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, [searchOpen]);
    const selectedNames = new Set(rows.map((r) => r.name.toLowerCase()));
    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        const pool = q ? DENTAL_SYMPTOM_CATALOG.filter((s) => s.toLowerCase().includes(q)) : DENTAL_SYMPTOM_CATALOG;
        return pool.filter((s) => !selectedNames.has(s.toLowerCase())).slice(0, 12);
    }, [query, selectedNames]);
    const symptomQueryTrim = query.trim();
    const symptomCatalogExact = symptomQueryTrim.length > 0 &&
        DENTAL_SYMPTOM_CATALOG.some((s) => s.toLowerCase() === symptomQueryTrim.toLowerCase());
    const symptomAlreadyAdded = symptomQueryTrim.length > 0 && selectedNames.has(symptomQueryTrim.toLowerCase());
    const addSymptom = (name) => {
        onUpdateRows([...rows, { id: getSymId(), name, surfaces: [], since: "", severity: "", note: "" }]);
        setQuery("");
        setSearchOpen(false);
    };
    const updateRow = (id, patch) => {
        onUpdateRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    };
    const removeRow = (id) => onUpdateRows(rows.filter((r) => r.id !== id));
    return (_jsxs("div", { "data-rx-module-root": true, className: ui.entryRoot, children: [rows.length > 0 && (_jsx("div", { className: ui.tableWrap, children: _jsxs("table", { className: ui.table, children: [_jsxs("colgroup", { children: [_jsx("col", { style: { minWidth: 140 } }), _jsx("col", { style: { width: 140, minWidth: 120 } }), _jsx("col", { style: { width: 100, minWidth: 90 } }), _jsx("col", { style: { width: 140, minWidth: 140 } }), _jsx("col", { style: { minWidth: 110 } }), _jsx("col", { style: { width: 44, minWidth: 44, maxWidth: 44 } })] }), _jsx("thead", { children: _jsxs("tr", { className: ui.theadRow, children: [_jsx("th", { className: ui.thUpper, children: "NAME" }), _jsx("th", { className: ui.thUpper, children: "SURFACES" }), _jsx("th", { className: ui.thUpper, children: "SINCE" }), _jsx("th", { className: ui.thUpper, children: "SEVERITY" }), _jsx("th", { className: ui.thUpper, children: "NOTE" }), _jsx("th", { className: ui.thSticky })] }) }), _jsx("tbody", { children: rows.map((r) => {
                                const isRowActive = activeRowId === r.id;
                                return (_jsxs("tr", { className: ui.tbodyRowInteractive, onClick: () => setActiveRowId(isRowActive ? null : r.id), children: [_jsx("td", { className: ui.tdPlain, children: _jsx("span", { className: ui.symptomName, children: r.name }) }), _jsx("td", { className: ui.tdPlain, onClick: (ev) => ev.stopPropagation(), children: _jsx(SymptomSurfacePicker, { surfaces: r.surfaces, arch: state.selectedTooth.arch, toothPosition: state.selectedTooth.position, onChange: (next) => updateRow(r.id, { surfaces: next }) }, r.id) }), _jsx("td", { className: ui.tdPlain, children: _jsx("input", { type: "text", value: r.since, onChange: (e) => updateRow(r.id, { since: e.target.value }), placeholder: "e.g. 5 days", className: ui.symptomField }) }), _jsx("td", { className: ui.tdPlain, children: _jsxs("select", { value: r.severity, onChange: (e) => updateRow(r.id, { severity: e.target.value }), className: clsx(ui.symptomSelect, r.severity ? ui.symptomSelectFilled : ui.symptomSelectEmpty), children: [_jsx("option", { value: "", className: ui.optionMuted, children: "e.g. Moderate" }), _jsx("option", { value: "Mild", children: "Mild" }), _jsx("option", { value: "Moderate", children: "Moderate" }), _jsx("option", { value: "Severe", children: "Severe" })] }) }), _jsx("td", { className: ui.tdPlain, children: _jsx("input", { type: "text", value: r.note, onChange: (e) => updateRow(r.id, { note: e.target.value }), placeholder: "e.g. Worsens at night", className: ui.symptomField }) }), _jsx("td", { className: ui.tdStickyAct, children: _jsx("button", { type: "button", onClick: (ev) => { ev.stopPropagation(); removeRow(r.id); }, title: "Remove", className: ui.removeRowBtn, children: _jsx(Trash, { size: 14, color: "currentColor", variant: "Linear" }) }) })] }, r.id));
                            }) })] }) })), _jsx("div", { className: ui.searchBlockTop, children: _jsxs("div", { className: ui.searchRel, children: [_jsx("span", { className: ui.searchIconAbs, children: _jsx(SearchNormal1, { size: 14, color: "currentColor", variant: "Linear" }) }), _jsx("input", { ref: searchInputRef, type: "text", value: query, onChange: (e) => {
                                setQuery(e.target.value);
                                setSearchOpen(true);
                            }, onFocus: () => setSearchOpen(true), onKeyDown: (e) => {
                                if (e.key === "Enter" && symptomQueryTrim && !symptomAlreadyAdded)
                                    addSymptom(symptomQueryTrim);
                            }, placeholder: "Search & Add Dental Symptom", className: ui.searchInput14 }), searchOpen && (filtered.length > 0 || symptomQueryTrim) && (_jsxs("div", { ref: searchPopoverRef, className: ui.popoverBelow, children: [
                                filtered.map((s) => (_jsx("button", { type: "button", onClick: () => addSymptom(s), className: ui.popoverItem, children: s }, s))),
                                symptomQueryTrim && !symptomCatalogExact && !symptomAlreadyAdded && (_jsx("button", { type: "button", className: ui.popoverAdd, onMouseDown: (e) => e.preventDefault(), onClick: () => addSymptom(symptomQueryTrim), children: _jsxs("span", { className: ui.popoverAddInner, children: [_jsx(Add, { size: 14, color: "currentColor", variant: "Linear" }), " Add \"", symptomQueryTrim, "\""] }) })),
                            ] }))] }) })] }));
}
function PrimaryDiagnosisBody({ state }) {
    const [activeCell, setActiveCell] = useState(null);
    const [query, setQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const searchInputRef = useRef(null);
    const searchPopoverRef = useRef(null);
    const [pos, setPos] = useState(null);
    // Auto-close search popover on outside click
    useEffect(() => {
        if (!searchOpen) {
            setPos(null);
            return;
        }
        const onDoc = (e) => {
            const el = e.target;
            if (searchInputRef.current && !searchInputRef.current.contains(el) && searchPopoverRef.current && !searchPopoverRef.current.contains(el)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, [searchOpen]);
    // Active diagnoses as "rows"
    const activeRows = useMemo(() => {
        const list = [];
        state.currentToothDiagnoses.forEach((d) => list.push(d));
        if (state.isImplant && !list.includes("Implant"))
            list.push("Implant");
        return list;
    }, [state.currentToothDiagnoses, state.isImplant]);
    const displayRows = useMemo(() => {
        const detailMap = state.currentTreatmentHistoryDetails ?? {};
        const keys = Object.keys(detailMap);
        const orphans = keys.filter((k) => !activeRows.includes(k)).sort((a, b) => a.localeCompare(b));
        return [...activeRows, ...orphans];
    }, [activeRows, state.currentTreatmentHistoryDetails]);
    const filteredCatalog = useMemo(() => {
        const q = query.toLowerCase().trim();
        const activeSet = new Set(activeRows.map((r) => r.toLowerCase()));
        const pool = q ? TOOTH_DIAGNOSES.filter((c) => c.toLowerCase().includes(q)) : TOOTH_DIAGNOSES;
        return pool.filter((c) => !activeSet.has(c.toLowerCase())).slice(0, 12);
    }, [query, activeRows]);
    const queryTrim = query.trim();
    const catalogHasExactName = queryTrim.length > 0 &&
        TOOTH_DIAGNOSES.some((d) => d.toLowerCase() === queryTrim.toLowerCase());
    const alreadyHasTypedTreatmentLabel = queryTrim.length > 0 &&
        displayRows.some((r) => r.toLowerCase() === queryTrim.toLowerCase());
    useEffect(() => {
        if (!searchOpen)
            return;
        const el = searchInputRef.current;
        if (!el)
            return;
        const r = el.getBoundingClientRect();
        setPos({ top: r.bottom + 4, left: r.left, width: r.width });
    }, [searchOpen, filteredCatalog, query]);
    // Track most recently added diagnosis so we can auto-open its Since dropdown.
    const [lastAddedName, setLastAddedName] = useState(null);
    const addDiagnosis = (name) => {
        if (name === "Implant")
            state.onToggleImplant();
        else
            state.onToggleToothDiagnosis(name);
        const existing = state.currentTreatmentHistoryDetails[name];
        state.onUpdateTreatmentHistoryDetail(name, {
            surfaces: existing?.surfaces?.length ? existing.surfaces : getDefaultTreatmentSurfaces(name),
            since: existing?.since,
            note: existing?.note,
        });
        setActiveCell({ rowId: name, colKey: "surfaces" });
        setLastAddedName(name);
        setQuery("");
        setSearchOpen(false);
    };
    const removeRow = (name) => {
        const isDiagnosisRow = activeRows.includes(name);
        state.onRemoveTreatmentHistoryDetail?.(name);
        if (isDiagnosisRow) {
            if (name === "Implant")
                state.onToggleImplant();
            else
                state.onToggleToothDiagnosis(name);
        }
        if (activeCell?.rowId === name)
            setActiveCell(null);
    };
    useEffect(() => {
        if (activeCell?.rowId && !displayRows.includes(activeCell.rowId))
            setActiveCell(null);
    }, [activeCell, displayRows]);
    const activeRowName = activeCell?.colKey === "surfaces" && activeCell.rowId && displayRows.includes(activeCell.rowId) ? activeCell.rowId : null;
    const activeRowSurfaces = activeRowName ? (state.currentTreatmentHistoryDetails[activeRowName]?.surfaces ?? []) : [];
    const clearCellActive = useCallback((rowId, colKey) => {
        window.setTimeout(() => {
            setActiveCell((current) => current && current.rowId === rowId && current.colKey === colKey ? null : current);
        }, 80);
    }, []);
    const isCellActive = useCallback((rowId, colKey) => activeCell?.rowId === rowId && activeCell?.colKey === colKey, [activeCell]);
    useEffect(() => {
        if (!activeRowName) {
            state.onClearMultiSelect();
            state.onSetMultiSelectActive(false);
            return;
        }
        state.onSetMultiSelectZones(activeRowSurfaces);
        state.onSetMultiSelectActive(true);
    }, [activeRowName]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!activeRowName)
            return;
        const zonesFromCanvas = Array.from(state.multiSelectZones);
        const same = zonesFromCanvas.length === activeRowSurfaces.length
            && zonesFromCanvas.every((zone) => activeRowSurfaces.includes(zone));
        if (!same) {
            state.onUpdateTreatmentHistoryDetail(activeRowName, { surfaces: zonesFromCanvas });
        }
    }, [activeRowName, activeRowSurfaces, state.multiSelectZones]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => () => { state.onSetMultiSelectActive(false); }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (_jsxs("div", { "data-rx-module-root": true, className: ui.entryRoot, children: [displayRows.length > 0 && (_jsx("div", { className: ui.tableWrap, children: _jsxs("table", { className: ui.table, children: [_jsxs("colgroup", { children: [_jsx("col", { style: { width: 36, minWidth: 36 } }), _jsx("col", { style: { minWidth: 120 } }), _jsx("col", { style: { width: 140, minWidth: 120 } }), _jsx("col", { style: { width: 140, minWidth: 120 } }), _jsx("col", { style: { minWidth: 140 } }), _jsx("col", { style: { width: 44, minWidth: 44, maxWidth: 44 } })] }), _jsx("thead", { children: _jsxs("tr", { className: ui.theadRow, children: [_jsx("th", { className: ui.thCenter }), _jsx("th", { className: ui.th, children: "NAME" }), _jsx("th", { className: ui.th, children: "SURFACES" }), _jsx("th", { className: ui.th, children: "SINCE" }), _jsx("th", { className: ui.th, children: "NOTE" }), _jsx("th", { className: ui.thSticky })] }) }), _jsx("tbody", { children: displayRows.map((name) => { const isOrphanHistoryRow = !activeRows.includes(name);
                                const color = PRIMARY_DIAG_COLOR[name] ?? "#4b4ad5";
                                const d = state.currentTreatmentHistoryDetails[name] ?? { since: "", note: "", surfaces: [] };
                                const isSurfaceActive = isCellActive(name, "surfaces");
                                const isSinceActive = isCellActive(name, "since");
                                const isNoteActive = isCellActive(name, "note");
                                const activateSurfaceCell = () => {
                                    setActiveCell({ rowId: name, colKey: "surfaces" });
                                    state.onSetMultiSelectZones(d.surfaces ?? []);
                                    state.onSetMultiSelectActive(true);
                                };
                                return (_jsxs("tr", { onMouseEnter: () => { if (!isSurfaceActive)
                                        state.onSetHighlightZones(d.surfaces ?? []); }, onMouseLeave: () => { if (!isSurfaceActive)
                                        state.onSetHighlightZones([]); }, className: ui.tbodyRow, children: [isOrphanHistoryRow ? _jsx("td", { className: clsx(ui.td, ui.tdGrip), "aria-hidden": true }) : _jsx("td", { className: clsx(ui.td, ui.tdGrip), children: _jsx("span", { className: ui.gripIcon, children: _jsxs("svg", { width: "8", height: "16", viewBox: "0 0 8 16", fill: "currentColor", children: [_jsx("circle", { cx: "2", cy: "3", r: "1.2" }), _jsx("circle", { cx: "2", cy: "8", r: "1.2" }), _jsx("circle", { cx: "2", cy: "13", r: "1.2" }), _jsx("circle", { cx: "6", cy: "3", r: "1.2" }), _jsx("circle", { cx: "6", cy: "8", r: "1.2" }), _jsx("circle", { cx: "6", cy: "13", r: "1.2" })] }) }) }), isOrphanHistoryRow ? _jsx("td", { className: ui.tdPlain, children: _jsx("span", { className: ui.symptomName, children: name }) }) : _jsx("td", { className: ui.tdPlain, children: _jsx(DiagnosisNameCell, { name: name, color: color, activeRows: activeRows, onSwap: (next) => {
                                                    if (next === name)
                                                        return;
                                                    const currentDetails = state.currentTreatmentHistoryDetails[name];
                                                    const nextDetails = state.currentTreatmentHistoryDetails[next];
                                                    // Remove current, add next
                                                    if (name === "Implant")
                                                        state.onToggleImplant();
                                                    else
                                                        state.onToggleToothDiagnosis(name);
                                                    if (next === "Implant")
                                                        state.onToggleImplant();
                                                    else
                                                        state.onToggleToothDiagnosis(next);
                                                    state.onUpdateTreatmentHistoryDetail(next, {
                                                        surfaces: nextDetails?.surfaces?.length ? nextDetails.surfaces : (currentDetails?.surfaces ?? getDefaultTreatmentSurfaces(next)),
                                                        since: nextDetails?.since ?? currentDetails?.since,
                                                        note: nextDetails?.note ?? currentDetails?.note,
                                                    });
                                                    if (activeCell?.rowId === name)
                                                        setActiveCell({ rowId: next, colKey: activeCell.colKey });
                                                } }) }), _jsxs("td", { className: clsx(ui.td, ui.tdRel, isSurfaceActive && ui.tdActive), onClick: (ev) => ev.stopPropagation(), children: [isSurfaceActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsx(SurfaceCellDropdown, { entry: { id: name, toothFdi: state.selectedTooth.fdi, kind: "procedure", name, surfaces: d.surfaces ?? [] }, arch: state.selectedTooth.arch, toothPosition: state.selectedTooth.position, mode: "treatment", isActive: isSurfaceActive, onActivate: activateSurfaceCell, onDeactivate: () => {
                                                        if (state.selectedZone === "whole")
                                                            state.onClearSelectedZone();
                                                        clearCellActive(name, "surfaces");
                                                    }, onToggleZone: state.onToggleZoneMultiSelect, onHover: state.onSetHighlightZones, multiSelectZones: state.multiSelectZones })] }), _jsxs("td", { className: clsx(ui.td, ui.tdRel, isSinceActive && ui.tdActive), children: [isSinceActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsx(SinceDropdown, { value: d.since ?? "", onChange: (v) => state.onUpdateTreatmentHistoryDetail(name, { since: v }), autoOpen: lastAddedName === name, onFocusActivate: () => setActiveCell({ rowId: name, colKey: "since" }), onBlurDeactivate: () => clearCellActive(name, "since") })] }), _jsxs("td", { className: clsx(ui.td, ui.tdRel, isNoteActive ? ui.tdActive : ui.tdHover), children: [isNoteActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsx("input", { type: "text", value: d.note ?? "", onChange: (e) => state.onUpdateTreatmentHistoryDetail(name, { note: e.target.value }), onFocus: () => setActiveCell({ rowId: name, colKey: "note" }), onBlur: () => clearCellActive(name, "note"), placeholder: "e.g. Monitor at next visit", className: ui.primaryNoteInput })] }), _jsx("td", { className: ui.tdStickyAct, children: _jsx("button", { type: "button", onClick: () => removeRow(name), title: "Remove", className: ui.removeRowBtn, children: _jsx(Trash, { size: 14, color: "currentColor", variant: "Linear" }) }) })] }, name));
                            }) })] }) })), _jsxs("div", { className: ui.searchBlockTop, children: [_jsxs("div", { className: ui.searchRel, children: [_jsx("span", { className: ui.searchIconAbs, children: _jsx(SearchNormal1, { size: 14, color: "currentColor", variant: "Linear" }) }), _jsx("input", { ref: searchInputRef, type: "text", value: query, onChange: (e) => {
                                    setQuery(e.target.value);
                                    setSearchOpen(true);
                                }, onFocus: () => setSearchOpen(true), onKeyDown: (e) => {
                                    if (e.key !== "Enter" || !queryTrim)
                                        return;
                                    const match = TOOTH_DIAGNOSES.find((d) => d.toLowerCase() === queryTrim.toLowerCase());
                                    if (match) {
                                        addDiagnosis(match);
                                        return;
                                    }
                                    if (!alreadyHasTypedTreatmentLabel)
                                        addDiagnosis(queryTrim);
                                }, placeholder: "Search & Add Treatment History", className: ui.searchInput }), searchOpen && pos && (filteredCatalog.length > 0 || queryTrim) && typeof document !== "undefined" && createPortal(_jsxs("div", { ref: searchPopoverRef, className: ui.portalListPlain, style: { top: pos.top, left: pos.left, width: pos.width }, children: [
                                    filteredCatalog.map((c) => (_jsx("button", { type: "button", onClick: () => addDiagnosis(c), className: ui.popoverItem, children: c }, c))),
                                    queryTrim && !catalogHasExactName && !alreadyHasTypedTreatmentLabel && (_jsx("button", { type: "button", className: ui.popoverAdd, onMouseDown: (e) => e.preventDefault(), onClick: () => addDiagnosis(queryTrim), children: _jsxs("span", { className: ui.popoverAddInner, children: [_jsx(Add, { size: 14, color: "currentColor", variant: "Linear" }), " Add \"", queryTrim, "\""] }) })),
                                ] }), document.body)] }), query.length === 0 && (_jsx("div", { className: ui.diagQuickChips, children: ["Implant", "RCT", "Missing", "Crown", "Bridge", "Denture", "Extraction"].map(chip => {
                            if (activeRows.includes(chip))
                                return null;
                            return (_jsx("button", { type: "button", onClick: () => addDiagnosis(chip), className: ui.chipBtn, children: chip }, chip));
                        }) }))] })] }));
}
