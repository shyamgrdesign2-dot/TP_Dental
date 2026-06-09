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
// AlertDialog primitives removed — all destructive confirms in this module now
// use the shared `TPConfirmDialog` molecule (imported from tp-ui below).
import { ExpandIcon } from "./ui-icons";
import { DentalCanvas } from "./DentalCanvas";
import { DIAGNOSES, TOOTH_DIAGNOSES, ZONE_INFO, ALL_ZONES, getZoneLabel, TEETH, PEDIATRIC_TEETH, PROCEDURE_CATALOG, QUADRANT_LABELS, getDefaultTreatmentSurfaces, ORAL_FINDINGS, ORAL_PROCEDURES, ORAL_POSITION_GROUPS, ORAL_POSITION_LABEL, oralPositionShort, reconcileOralPositions } from "./types";
import { getDisabledDiagnoses, isTerminalDiagnosis } from "./DiagnosisMatrix";
import { MiniToothCanvas } from "./MiniToothCanvas";
import { MiniScopeCanvas } from "./MiniScopeCanvas";
import { TPMedicalIcon } from "@/components/tp-ui/medical-icons";
import { TPConfirmDialog, TPTooltip } from "@/components/tp-ui";
import { saveDentalPreviewSnapshot } from "@/components/tp-rxpad/rx-preview-store";
import clsx from "clsx";
import ex from "./ExaminationTab.module.scss";
import ui from "./ExaminationTab.ui.module.scss";
import { useBillingCatalog } from "@/lib/billing-catalog-context";
import { getUniqueDentalBillItems, sortStringsForTypeahead } from "@/lib/billing-catalog";
import { AddDentalBillItemDrawer } from "@/components/dental/AddDentalBillItemDrawer";
import { useRxPadChrome } from "@/components/tp-rxpad/rxpad-chrome-context";
// Stable empties so the "happy teeth" oral-records thumbnail always renders the
// pristine full-mouth (all 32 teeth, no diagnoses/findings) without re-creating
// identities each render.
const EMPTY_OBJ = {};
const EMPTY_SET = new Set();
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
function toPreviewLine(title, metaParts, cols) {
    const line = {
        title: title.trim(),
        metaParts: metaParts.map((part) => (part ?? "").trim()).filter(Boolean),
    };
    // Structured columns (Surfaces / Since / Notes) for the table print view. Only
    // non-empty fields are kept; list/inline/tooltip views keep using metaParts.
    if (cols) {
        const clean = {};
        for (const k of Object.keys(cols)) {
            const v = (cols[k] ?? "").toString().trim();
            if (v) clean[k] = v;
        }
        if (Object.keys(clean).length) line.cols = clean;
    }
    return line;
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
    // surface / since / note recorded for a whole-tooth diagnosis (Past Procedures).
    const diagMeta = (fdi, name) => {
        const d = state.treatmentHistoryDetailsByTooth?.[fdi]?.[name];
        if (!d) return [];
        return [surfaceList(d.surfaces || []), d.since, d.note];
    };
    const diagCols = (fdi, name) => {
        const d = state.treatmentHistoryDetailsByTooth?.[fdi]?.[name];
        if (!d) return null;
        return { surfaces: surfaceList(d.surfaces || []), since: d.since, note: d.note };
    };
    Object.entries(state.toothDiagnoses).forEach(([fdi, diagnoses]) => {
        if (!diagnoses.size)
            return;
        const block = ensureTooth(fdi);
        diagnoses.forEach((diagnosis) => {
            block.treatmentHistory.push(toPreviewLine(diagnosis, diagMeta(fdi, diagnosis), diagCols(fdi, diagnosis)));
        });
    });
    state.implantTeeth.forEach((fdi) => {
        const block = ensureTooth(fdi);
        const exists = block.treatmentHistory.some((row) => row.title.toLowerCase() === "implant");
        if (!exists) {
            block.treatmentHistory.push(toPreviewLine("Implant", diagMeta(fdi, "Implant"), diagCols(fdi, "Implant")));
        }
    });
    // The Past Procedures TABLE is driven by treatmentHistoryDetailsByTooth (the
    // authoritative, additive store). Include EVERY recorded item — not just the
    // toothDiagnoses set — so all procedures (RCT + Bridge + Denture …) appear.
    Object.entries(state.treatmentHistoryDetailsByTooth || {}).forEach(([fdi, map]) => {
        const names = Object.keys(map || {});
        if (!names.length) return;
        const block = ensureTooth(fdi);
        names.forEach((name) => {
            if (block.treatmentHistory.some((row) => row.title.toLowerCase() === name.toLowerCase())) return;
            block.treatmentHistory.push(toPreviewLine(name, diagMeta(fdi, name), diagCols(fdi, name)));
        });
    });
    Object.entries(state.findingsByTooth).forEach(([fdi, findings]) => {
        if (!findings.length)
            return;
        const block = ensureTooth(fdi);
        findings.forEach((finding) => {
            const surfaces = ZONE_INFO[finding.zoneId]?.label;
            block.findings.push(toPreviewLine(finding.type, [surfaces, finding.notes], { surfaces, note: finding.notes }));
        });
    });
    state.allEntries.forEach((entry) => {
        const block = ensureTooth(entry.toothFdi);
        const meta = [surfaceList(entry.surfaces), entry.since, entry.plannedDate, entry.status, entry.notes];
        const cols = {
            surfaces: surfaceList(entry.surfaces),
            since: entry.since,
            note: [entry.status, entry.plannedDate, entry.notes].map((v) => (v ?? "").toString().trim()).filter(Boolean).join(" · "),
        };
        if (entry.kind === "finding") {
            block.findings.push(toPreviewLine(entry.name, meta, cols));
            return;
        }
        if (entry.kind === "procedure" || entry.kind === "planned") {
            block.procedures.push(toPreviewLine(entry.name, meta, cols));
            return;
        }
        block.treatmentHistory.push(toPreviewLine(entry.name, meta, cols));
    });
    // Overall per-tooth notes (were never carried into the preview/print).
    Object.entries(state.toothNotes || {}).forEach(([fdi, note]) => {
        const text = String(note ?? "").trim();
        if (!text) return;
        ensureTooth(fdi).overallToothNote = text;
    });
    // Stamp every produced section with the current ISO timestamp. The mental
    // model: editing ANY field on a tooth in the current visit promotes that
    // tooth's "last updated" to now. A future multi-visit backend will read
    // per-tooth update times from a real audit log; for now we apply a single
    // session-level stamp since all edits happen within the live visit.
    const stamp = new Date().toISOString();
    return Array.from(byTooth.values())
        .filter((section) => section.treatmentHistory.length > 0 ||
            section.findings.length > 0 ||
            section.procedures.length > 0 ||
            Boolean(section.overallToothNote?.trim()))
        .map((section) => ({ ...section, toothUpdatedAt: stamp }));
}
export function ExaminationTab({ patientId, patientAge = 30 }) {
    const { drAgentOpen } = useRxPadChrome();
    const [canvasState, setCanvasState] = useState(null);
    const isSingle = canvasState?.viewMode === "single-tooth";
    const isOral = canvasState?.viewMode === "oral";
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
    const asidePct = isOral ? 72 : isSingle ? singleAsidePct : dentitionAsidePct;
    const canvasPct = 100 - asidePct;
    const isGetStarted = !isSingle && !isOral && !!canvasState &&
        Object.values(canvasState.toothDiagnoses).every((s) => s.size === 0) &&
        canvasState.implantTeeth.size === 0 &&
        Object.values(canvasState.findingsByTooth).every((a) => a.length === 0) &&
        canvasState.allEntries.length === 0 &&
        !Object.values(canvasState.treatmentHistoryDetailsByTooth ?? {}).some((d) => d && Object.keys(d).length > 0) &&
        !Object.values(canvasState.toothNotes ?? {}).some((n) => String(n ?? "").trim().length > 0) &&
        !(Array.isArray(canvasState.oralEntries) && canvasState.oralEntries.length > 0);
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
                        }, children: isOral && canvasState ? (_jsx("div", { className: ex.singleCol, children: _jsx("div", { className: ex.singleCard, children: _jsx(OralExamPanel, { state: canvasState }) }) })) : isSingle && canvasState ? (_jsx("div", { className: ex.singleCol, children: _jsx("div", { className: ex.singleCard, children: _jsx(SingleToothPanel, { state: canvasState }) }) })) : (_jsx("div", { className: isGetStarted ? ex.scrollStarted : ex.scrollSplit, children: _jsx(DentitionPanel, { state: canvasState }) })) }, isOral ? `oral-${canvasState?.selectionScopeId}` : isSingle ? `single-${canvasState?.selectedTooth?.fdi}` : "dentition"), _jsx("style", { dangerouslySetInnerHTML: {
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
// Map a set of FDIs to a named scope (Maxillary / quadrant / arch / Full) when
// they exactly fill that zone, with the scope id used to re-open it. Returns
// null when the teeth don't line up with a recognizable zone.
function scopeForFdis(fdis, patientType) {
    const list = patientType === "pediatric" ? PEDIATRIC_TEETH : (patientType === "mixed" ? [...TEETH, ...PEDIATRIC_TEETH] : TEETH);
    const byQ = { "upper-right": [], "upper-left": [], "lower-left": [], "lower-right": [] };
    list.forEach((t) => { if (byQ[t.quadrant]) byQ[t.quadrant].push(t.fdi); });
    const set = new Set(fdis);
    const eq = (arr) => arr.length > 1 && arr.length === set.size && arr.every((f) => set.has(f));
    const cand = [
        ["Full mouth", "FULL", [...byQ["upper-right"], ...byQ["upper-left"], ...byQ["lower-left"], ...byQ["lower-right"]]],
        ["Maxillary", "UPPER_ARCH", [...byQ["upper-right"], ...byQ["upper-left"]]],
        ["Mandibular", "LOWER_ARCH", [...byQ["lower-left"], ...byQ["lower-right"]]],
        ["Right arch", "RIGHT_ARCH", [...byQ["upper-right"], ...byQ["lower-right"]]],
        ["Left arch", "LEFT_ARCH", [...byQ["upper-left"], ...byQ["lower-left"]]],
        ["Upper Right", "UR", byQ["upper-right"]],
        ["Upper Left", "UL", byQ["upper-left"]],
        ["Lower Left", "LL", byQ["lower-left"]],
        ["Lower Right", "LR", byQ["lower-right"]],
    ];
    const hit = cand.find(([, , arr]) => eq(arr));
    return hit ? { label: hit[0], scopeId: hit[1] } : null;
}
// Collect grouped records (a diagnosis/finding/procedure applied to several
// teeth at once shares a groupId). Returns one descriptor per group plus the
// set of FDIs that belong to ANY group (used to bracket-tag individual rows).
function collectGroups(state) {
    // Final cards keyed by resolved scope (so explicit groupId groups and
    // implicit "diagnosis fills a whole scope" groups merge into one card).
    const byKey = new Map();
    const ensure = (key, label, scopeId) => {
        let g = byKey.get(key);
        if (!g) { g = { key, label, scopeId, fdis: new Set(), diagnoses: new Set(), findings: new Set(), procedures: new Set() }; byKey.set(key, g); }
        return g;
    };
    // 1) Explicit groupId sources (findings / procedures / treatment-history).
    const raw = new Map();
    const rawGet = (gid) => { let g = raw.get(gid); if (!g) { g = { fdis: new Set(), diagnoses: new Set(), findings: new Set(), procedures: new Set() }; raw.set(gid, g); } return g; };
    (state.allEntries || []).forEach((e) => {
        if (!e.groupId || !e.toothFdi) return;
        const g = rawGet(e.groupId);
        g.fdis.add(e.toothFdi);
        if (e.name) (e.kind === "finding" ? g.findings : g.procedures).add(e.name.trim());
    });
    Object.entries(state.findingsByTooth || {}).forEach(([fdi, list]) => {
        (list || []).forEach((f) => { if (f.groupId) { const g = rawGet(f.groupId); g.fdis.add(fdi); if (f.type) g.findings.add(f.type.trim()); } });
    });
    Object.entries(state.treatmentHistoryDetailsByTooth || {}).forEach(([fdi, map]) => {
        Object.entries(map || {}).forEach(([name, d]) => { if (d?.groupId) { const g = rawGet(d.groupId); g.fdis.add(fdi); g.diagnoses.add(name); } });
    });
    raw.forEach((g, gid) => {
        if (g.fdis.size < 2) return;
        const scope = scopeForFdis([...g.fdis], state.patientType);
        const key = scope ? `s:${scope.scopeId}` : `g:${gid}`;
        const card = ensure(key, scope?.label ?? `${g.fdis.size} teeth`, scope?.scopeId ?? null);
        g.fdis.forEach((f) => card.fdis.add(f));
        g.diagnoses.forEach((d) => card.diagnoses.add(d));
        g.findings.forEach((d) => card.findings.add(d));
        g.procedures.forEach((d) => card.procedures.add(d));
    });
    // 2) Implicit scope-groups: a tooth diagnosis (e.g. Missing) that exactly
    // fills a recognizable scope is shown as that scope (covers chip-added
    // diagnoses, which live only in toothDiagnoses with no groupId).
    const diagToFdis = new Map();
    Object.entries(state.toothDiagnoses || {}).forEach(([fdi, set]) => {
        (set instanceof Set ? [...set] : (set || [])).forEach((d) => { if (!diagToFdis.has(d)) diagToFdis.set(d, new Set()); diagToFdis.get(d).add(fdi); });
    });
    const implant = state.implantTeeth instanceof Set ? state.implantTeeth : new Set(state.implantTeeth || []);
    if (implant.size) { if (!diagToFdis.has("Implant")) diagToFdis.set("Implant", new Set()); implant.forEach((f) => diagToFdis.get("Implant").add(f)); }
    diagToFdis.forEach((fdis, diag) => {
        if (fdis.size < 2) return;
        const scope = scopeForFdis([...fdis], state.patientType);
        if (!scope) return;
        const card = ensure(`s:${scope.scopeId}`, scope.label, scope.scopeId);
        fdis.forEach((f) => card.fdis.add(f));
        card.diagnoses.add(diag);
    });
    const groupedFdis = new Set();
    const labelByFdi = new Map();
    const cards = [];
    byKey.forEach((g) => {
        const fdiArr = [...g.fdis];
        fdiArr.forEach((f) => { groupedFdis.add(f); if (!labelByFdi.has(f)) labelByFdi.set(f, g.label); });
        cards.push({ groupId: g.key, label: g.label, scopeId: g.scopeId, fdis: fdiArr, diagnosisParts: [...g.diagnoses], findingParts: [...g.findings], procedureParts: [...g.procedures] });
    });
    return { cards, groupedFdis, labelByFdi };
}
function DentitionPanel({ state }) {
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
    // Scope-level group records (e.g. "Maxillary") + per-tooth bracket labels.
    const groupInfo = useMemo(() => collectGroups(state || {}), [state]);
    // Teeth whose records are entirely represented by a scope group card are
    // NOT listed individually (avoids 16-32 duplicate cards — and, critically,
    // 16-32 extra WebGL mini-canvases that would exhaust the browser's GL
    // context budget and blank out the main 3D dentition). Their detail shows
    // on the group card and on hover.
    const individualSummary = useMemo(() => summary.filter((e) => !groupInfo.groupedFdis.has(e.fdi)), [summary, groupInfo]);
    const recordCount = groupInfo.cards.length + individualSummary.length;
    const hasOral = useMemo(() => Array.isArray(state?.oralEntries) && state.oralEntries.length > 0, [state]);
    const openScope = (card) => {
        if (card.scopeId && state?.onSelectScope)
            state.onSelectScope(card.scopeId);
        else if (card.fdis?.length)
            openTooth(card.fdis[0]);
    };
    return (_jsx(_Fragment, { children: (summary.length > 0 || hasOral) ? (_jsxs(_Fragment, { children: [_jsx(OralRecordsList, { state: state }), _jsxs("div", { className: ui.recordsHeader, children: [_jsx("h3", { className: ui.recordsTitle, children: "Tooth Records" }), _jsx("span", { className: ui.recordsBadge, children: recordCount })] }), _jsxs("div", { className: ui.recordsList, children: [recordCount === 0 ? _jsxs("div", { className: ui.toothRow, style: { cursor: "default", flexDirection: "column", alignItems: "center", gap: 10, padding: "24px 16px", borderStyle: "dashed", borderColor: "#cbd5e1", background: "#f8fafc", textAlign: "center" }, children: [_jsx(TPMedicalIcon, { name: "tooth", variant: "bulk", size: 56, color: "var(--tp-slate-300)" }), _jsx("p", { style: { margin: 0, fontSize: 14, fontWeight: 600, color: "#334155" }, children: "No tooth records yet" }), _jsx("p", { style: { margin: 0, fontSize: 12, color: "#64748b", lineHeight: 1.4, maxWidth: 240 }, children: "Click any tooth in the 3D canvas to add findings, procedures and notes." })] }, "empty-tooth-records") : null, ...groupInfo.cards.map((card) =>(_jsxs("button", { type: "button", onClick: () => openScope(card), className: clsx(ui.toothRow), style: { borderColor: "rgba(79,70,229,0.4)", background: "rgba(99,102,241,0.05)" }, children: [_jsxs("div", { className: ui.toothRowHeader, children: [_jsx("div", { className: ui.toothThumb, style: { display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(99,102,241,0.12)" }, children: _jsx("span", { style: { fontSize: 16, fontWeight: 800, color: "#4f46e5" }, children: card.fdis.length }) }), _jsxs("div", { className: ui.toothHeaderText, children: [_jsx("span", { className: ui.toothName, children: card.label }), _jsxs("span", { className: ui.toothFdiBelow, children: [card.fdis.length, " teeth"] })] }), _jsx("span", { className: ui.toothChevron, "aria-hidden": true, children: _jsx(ExpandIcon, { size: 17 }) })] }), _jsx("div", { className: ui.toothRowDivider, "aria-hidden": true }), _jsxs("div", { className: ui.toothChips, children: [card.diagnosisParts.length > 0 && (_jsx(SummaryPillSegmented, { icon: "clipboard-activity", parts: card.diagnosisParts, title: card.diagnosisParts.join(", "), tone: "violet" })), card.findingParts.length > 0 && (_jsx(SummaryPillSegmented, { icon: "diagnosis", parts: card.findingParts, title: card.findingParts.join(", "), tone: "violet" })), card.procedureParts.length > 0 && (_jsx(SummaryPillSegmented, { icon: "surgical-scissors-02", parts: card.procedureParts, title: card.procedureParts.join(", "), tone: "violet" }))] })] }, `grp-${card.groupId}`))), ...individualSummary.map((entry) => {
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
                        return (_jsxs("button", { type: "button", onClick: () => openTooth(entry.fdi), onMouseEnter: () => state?.onSetHoveredTooth(entry.fdi), onMouseLeave: () => state?.onSetHoveredTooth(null), className: clsx(ui.toothRow, enterFdis.has(entry.fdi) && ui.toothRowEnter, state?.agentApplyPulseFdis?.has(String(entry.fdi)) && ui.toothRowAgentPulse, state?.hoveredToothFdi === entry.fdi && ui.toothRowActive), children: [_jsxs("div", { className: ui.toothRowHeader, children: [_jsx("div", { className: ui.toothThumb, children: tooth && (_jsx(MiniToothCanvas, { tooth: tooth, size: 52, diagnoses: new Set(entry.diagnoses), isImplant: entry.diagnoses.includes("Implant"), findings: (state?.findingsByTooth?.[entry.fdi] ?? []) })) }), _jsxs("div", { className: ui.toothHeaderText, children: [_jsxs("span", { className: ui.toothName, children: [toothName, groupInfo.labelByFdi.get(entry.fdi) && _jsxs("span", { style: { marginLeft: 6, fontSize: 12, fontWeight: 700, color: "#6366f1" }, children: ["(", groupInfo.labelByFdi.get(entry.fdi), ")"] })] }), _jsxs("span", { className: ui.toothFdiBelow, children: ["T", entry.fdi] })] }), _jsx("span", { className: ui.toothChevron, "aria-hidden": true, children: _jsx(ExpandIcon, { size: 17 }) })] }), _jsx("div", { className: ui.toothRowDivider, "aria-hidden": true }), _jsxs("div", { className: ui.toothChips, children: [entry.diagnosisParts.length > 0 && (_jsx(SummaryPillSegmented, { icon: "clipboard-activity", parts: entry.diagnosisParts, title: entry.historyTitle, tone: "violet" })), entry.findingParts.length > 0 && (_jsx(SummaryPillSegmented, { icon: "diagnosis", parts: entry.findingParts, title: entry.findingsTitle, tone: "violet" })), entry.procedureParts.length > 0 && (_jsx(SummaryPillSegmented, { icon: "surgical-scissors-02", parts: entry.procedureParts, title: entry.procedureTitle, tone: "violet" })), Boolean((state?.toothNotes ?? {})[entry.fdi]?.trim()) && (_jsx(SummaryPill, { icon: "note-2", label: "Notes", title: (state?.toothNotes ?? {})[entry.fdi]?.trim(), tone: "violet" }))] })] }, entry.fdi));
                    })] })] })) : (
        /* First-time user onboarding — polished educational panel */
        _jsx("div", { className: ui.onboardCol, children: _jsxs("div", { className: ui.onboardCard, children: [_jsxs("div", { className: ui.onboardHead, children: [_jsx("div", { className: ui.onboardIcon, children: _jsx(TPMedicalIcon, { name: "health care", variant: "bulk", size: 18, color: "#ffffff" }) }), _jsxs("div", { children: [_jsx("h3", { className: ui.onboardTitle, children: "Getting Started" }), _jsx("p", { className: ui.onboardSub, children: "4 quick steps — watch the video for details" })] })] }), _jsx("div", { className: ui.stepList, children: [
                            { step: "1", title: "Select tooth or Oral Exam", desc: "Tap any tooth on the 3D model, or use the + Oral Examination CTA to start.", icon: "tooth" },
                            { step: "2", title: "Record findings", desc: "Add past procedures, surface findings & planned procedures.", icon: "diagnosis" },
                            { step: "3", title: "Add notes", desc: "Per-tooth notes or overall oral exam notes.", icon: "surgical-scissors-02" },
                            { step: "4", title: "Review & print", desc: "Open Preview Rx or End Visit to print the chart.", icon: "health-file-03" },
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
const ARCH_SCOPE_BADGE = {
    RIGHT_ARCH: "R arch",
    LEFT_ARCH: "L arch",
    UPPER_ARCH: "Maxillary",
    LOWER_ARCH: "Mandibular",
};
// OralPositionCell — multi-select dropdown of regions + surfaces + overall.
// Opening or toggling previews the region highlight on the 3D model.
function OralPositionCell({ value = [], onChange, onHoverPreview }) {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState(null);
    const [query, setQuery] = useState("");
    const btnRef = useRef(null);
    const popRef = useRef(null);
    const searchRef = useRef(null);
    // ── Custom always-visible scroll indicator ──────────────────────────
    // macOS Chromium honors the system "show scrollbars when scrolling"
    // pref and renders ::-webkit-scrollbar styles as OVERLAY (taking 0px
    // and disappearing when idle). We paint our own track + thumb on the
    // right edge — pointer-events: none so it never blocks chip clicks,
    // metrics derived from scrollTop/scrollHeight/clientHeight.
    const scrollRef = useRef(null);
    const [scrollMetrics, setScrollMetrics] = useState({ thumbTop: 0, thumbH: 0, visible: false });
    const updateScrollMetrics = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const { scrollTop, scrollHeight, clientHeight } = el;
        if (scrollHeight <= clientHeight + 1) {
            setScrollMetrics((m) => (m.visible ? { thumbTop: 0, thumbH: 0, visible: false } : m));
            return;
        }
        const trackPad = 8;
        const trackH = clientHeight - trackPad * 2;
        const thumbH = Math.max(28, (clientHeight / scrollHeight) * trackH);
        const maxThumbTop = trackH - thumbH;
        const thumbTop = trackPad + ((scrollTop / Math.max(1, scrollHeight - clientHeight)) * maxThumbTop);
        setScrollMetrics({ thumbTop, thumbH, visible: true });
    }, []);
    useEffect(() => {
        if (!open) return;
        // Defer one tick so the popover paints + measures before we read metrics.
        const t = setTimeout(updateScrollMetrics, 60);
        return () => clearTimeout(t);
    }, [open, query, updateScrollMetrics]);
    const place = useCallback(() => {
        const el = btnRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        // Wider panel so all four groups read in a 2-column layout (single view).
        const w = Math.min(440, Math.max(r.width, 360));
        // Clamp so the panel never spills past the right viewport edge.
        const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
        const left = Math.max(8, Math.min(r.left, vw - w - 8));
        setPos({ top: r.bottom + 4, left, width: w });
    }, []);
    useEffect(() => {
        if (!open) { setQuery(""); return; }
        place();
        // Focus the search field so the user can filter immediately.
        const t = setTimeout(() => searchRef.current?.focus(), 30);
        const onDoc = (e) => {
            if (btnRef.current && btnRef.current.contains(e.target)) return;
            if (popRef.current && popRef.current.contains(e.target)) return;
            setOpen(false);
        };
        const reposition = () => place();
        document.addEventListener("mousedown", onDoc);
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
        return () => {
            clearTimeout(t);
            document.removeEventListener("mousedown", onDoc);
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [open, place]);
    const sel = new Set(value);
    // Clinical reconcile: "Whole mouth" is exclusive, distribution is radio-style,
    // "Full mouth" vs quadrants is either/or — see reconcileOralPositions().
    const toggle = (id) => {
        const arr = reconcileOralPositions(value, id);
        onChange(arr);
        onHoverPreview?.(arr);
    };
    // Compact pills wrap up to ~3 lines (≈9 tags). Beyond that we collapse the
    // tail into a "+N" chip (tooltip lists the rest) so the row never grows past
    // 3 lines — keeps the table readable on iPad widths too.
    // Show EVERY selected site as its own pill — wrap to as many lines as needed
    // so the doctor never loses visibility of what they entered. The row grows
    // to fit. Font size stays on the even scale (12px). Tooltip on the trigger
    // (see below) still renders the full label list for screen readers / hover.
    const shownPills = value;
    const pillStyle = { fontSize: 12, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(164,97,216,0.14)", color: "#703A9E", whiteSpace: "nowrap", flexShrink: 0 };
    // Reuses the dental surface picker's exact UI classes (borderless trigger,
    // popover, checkbox list) so the SITE cell matches the tooth SURFACES cell.
    // The cell can collapse pills into "+N" when crowded — wrap the trigger in a
    // TP tooltip listing every site (full label) so the doctor never loses info.
    const tooltipTitle = value.length === 0 ? "" : value.map((v) => ORAL_POSITION_LABEL[v] || v).join(", ");
    return (_jsxs(_Fragment, { children: [
        _jsx(TPTooltip, { title: tooltipTitle, arrow: true, placement: "top", enterDelay: 250, children: _jsxs("button", { ref: btnRef, type: "button", onClick: () => { const n = !open; setOpen(n); if (n) onHoverPreview?.(value); }, className: clsx(ui.surfaceTriggerBtn, open && ui.surfaceTriggerActive), children: [
            _jsx("span", { className: ui.surfaceTriggerText, style: { minWidth: 0, flex: 1 }, children: value.length === 0 ? (_jsx("span", { className: ui.surfacePlaceholder, children: "Select area" })) : (_jsx("span", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4, rowGap: 4, minWidth: 0 }, children: shownPills.map((v) => (_jsx("span", { style: pillStyle, children: oralPositionShort(v) }, v))) })) }),
            _jsx("svg", { width: "10", height: "6", viewBox: "0 0 10 6", fill: "none", style: { transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s", flexShrink: 0 }, children: _jsx("path", { d: "M1 1L5 5L9 1", stroke: "#94a3b8", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
        ] }) }),
        open && pos && typeof document !== "undefined" && createPortal((() => {
            const q = query.trim().toLowerCase();
            const checkSvg = _jsx("svg", { width: "9", height: "9", viewBox: "0 0 10 10", fill: "none", children: _jsx("path", { d: "M2 5L4 7L8 3", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
            // Bigger, more readable rows: 14px label, 12px caption (when searching),
            // generous padding for tap targets. Group headings stay at 12px and ALL CAPS.
            const renderRow = (it, caption) => { const on = sel.has(it.id); return (_jsx("li", { children: _jsxs("button", { type: "button", onClick: () => toggle(it.id), onMouseEnter: () => onHoverPreview?.([...value.filter((v) => v !== it.id), ...(sel.has(it.id) ? [] : [it.id])]), className: ui.surfaceZoneBtn, style: { padding: "8px 12px", gap: 10 }, children: [
                _jsx("span", { className: clsx(ui.surfaceCheck, on && ui.surfaceCheckOn), children: on && checkSvg }),
                _jsxs("span", { style: { display: "flex", flexDirection: "column", minWidth: 0, lineHeight: 1.3, gap: 2 }, children: [
                    _jsx("span", { className: ui.surfaceMenuLabel, style: { fontSize: 14, color: "#1e293b" }, children: it.label }),
                    caption ? _jsx("span", { style: { fontSize: 12, color: "#94a3b8" }, children: caption }) : null,
                ] }),
            ] }) }, it.id)); };
            const groupHead = (label) => _jsx("div", { style: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b", padding: "8px 12px 4px" }, children: label });
            const filtered = ORAL_POSITION_GROUPS.map((g) => ({ group: g.group, items: g.items.filter((it) => !q || it.label.toLowerCase().includes(q)) })).filter((g) => g.items.length);
            return _jsxs("div", { ref: popRef, className: ui.surfacePopover, style: { top: pos.top, left: pos.left, width: pos.width, display: "flex", flexDirection: "column", overflow: "hidden", position: "fixed" }, children: [
                // Sticky search
                _jsx("div", { style: { padding: "12px 12px 8px", borderBottom: "1px solid #f1f5f9", background: "#fff" }, children: _jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 10px", background: "#f8fafc" }, children: [
                    _jsx(SearchNormal1, { size: 16, color: "#94a3b8", variant: "Linear" }),
                    _jsx("input", { ref: searchRef, value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search sites, regions, surfaces…", style: { flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontSize: 14, color: "#334155" } }),
                    query ? _jsx("button", { type: "button", "aria-label": "Clear search", onClick: () => { setQuery(""); searchRef.current?.focus(); }, style: { border: "none", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }, children: "×" }) : null,
                ] }) }),
                // Body wrapped in a relative box so the custom always-visible
                // scroll indicator (track + thumb) can sit on the right edge.
                _jsxs("div", { style: { position: "relative" }, children: [
                _jsx("div", { ref: scrollRef, onScroll: updateScrollMetrics, className: ui.surfacePopoverScroll, style: { padding: "10px 4px", maxHeight: "min(460px, 60vh)" }, children: filtered.length === 0
                    ? _jsx("div", { style: { padding: "20px 12px", textAlign: "center", color: "#94a3b8", fontSize: 12 }, children: "No matching areas" })
                    : q
                        ? _jsx("ul", { className: ui.surfaceZoneList, style: { maxHeight: "none", overflow: "visible" }, children: filtered.flatMap((g) => g.items.map((it) => renderRow(it, g.group))) })
                        : _jsx("div", { style: { columnCount: 2, columnGap: 8 }, children: filtered.map((g) => (_jsxs("div", { style: { breakInside: "avoid", display: "block", marginBottom: 10, paddingInline: 8 }, children: [
                            groupHead(g.group),
                            _jsx("ul", { className: ui.surfaceZoneList, style: { maxHeight: "none", overflow: "visible" }, children: g.items.map((it) => renderRow(it)) }),
                        ] }, `grp-${g.group}`))) }),
                }),
                // Custom scroll indicator — track + thumb. Pointer-events: none
                // so it never blocks chip clicks. Track is always rendered when
                // content overflows; thumb size/position derived from scroll state.
                scrollMetrics.visible && _jsx("div", { "aria-hidden": true, style: { position: "absolute", top: 8, bottom: 8, right: 4, width: 6, background: "var(--tp-slate-100, #f1f5f9)", borderRadius: 999, pointerEvents: "none" } }),
                scrollMetrics.visible && _jsx("div", { "aria-hidden": true, style: { position: "absolute", top: scrollMetrics.thumbTop, height: scrollMetrics.thumbH, right: 4, width: 6, background: "var(--tp-slate-500, #64748b)", borderRadius: 999, pointerEvents: "none", transition: "top 60ms linear" } }),
                ] }),
            ] });
        })(), document.body),
    ] }));
}
// Shows the sticky action-column edge gradient/shadow ONLY while the table is
// scrolled horizontally (content tucked under the delete column) — mirrors the
// Chief Complaints table behaviour. Returns a ref for the .tableWrap + the flag.
function useStickyActionEdge(depKey) {
    const wrapRef = useRef(null);
    const [showEdge, setShowEdge] = useState(false);
    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) { setShowEdge(false); return; }
        const update = () => {
            const maxScroll = Math.max(0, wrap.scrollWidth - wrap.clientWidth);
            const hasOverflow = wrap.scrollWidth > wrap.clientWidth + 1;
            // Show the edge whenever there is still content hidden to the right
            // (tucked behind the sticky action column) — i.e. not scrolled fully
            // to the far end. This includes the initial at-rest state.
            setShowEdge(hasOverflow && wrap.scrollLeft < maxScroll - 0.5);
        };
        update();
        wrap.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        let ro = null;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(update);
            ro.observe(wrap);
            const t = wrap.querySelector("table");
            if (t) ro.observe(t);
        }
        return () => {
            wrap.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
            ro?.disconnect();
        };
    }, [depKey]);
    return { wrapRef, showEdge };
}
// OralTable — a dental-findings-style table (Name / Position / Since / Note) for
// one kind (finding|procedure), plus a catalog of chips to add rows.
function OralTable({ state, title, kind, catalog, list }) {
    const { wrapRef, showEdge } = useStickyActionEdge(list.length);
    const [query, setQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [pos, setPos] = useState(null);
    // Custom dental-service drawer state — only used for procedures + past
    // procedures (findings just get added as a plain custom name).
    const [customDrawerOpen, setCustomDrawerOpen] = useState(false);
    const [customDrawerInitial, setCustomDrawerInitial] = useState("");
    const inputRef = useRef(null);
    const popRef = useRef(null);
    const has = (name) => list.some((e) => e.name === name);
    const q = query.trim().toLowerCase();
    const available = catalog.filter((c) => !has(c));
    const quickChips = available.slice(0, 8); // ~2 lines of quick picks
    const matches = q ? available.filter((c) => c.toLowerCase().includes(q)).slice(0, 30) : [];
    const queryTrim = query.trim();
    // Exact match across the FULL catalog (not just `available`) so we don't
    // offer "Add" when the typed text is already on the chart as another row.
    const catalogExact = !!queryTrim && catalog.some((c) => c.toLowerCase() === q);
    const alreadyAdded = !!queryTrim && list.some((e) => e.name.toLowerCase() === q);
    const showAddCustom = !!queryTrim && !catalogExact && !alreadyAdded;
    // Matches the single-tooth EntryTab pattern exactly: ONLY the planned
    // "Procedures" section routes the custom name through the dental bill-item
    // drawer (it's the only chargeable, forward-looking service that benefits
    // from price/code/notes metadata). Past Procedures + Findings just add the
    // typed text directly — past work isn't entered fresh into the bill, and
    // findings aren't billable at all.
    const usesBillItemDrawer = kind === "procedure";
    const placeholder = kind === "finding" ? "Search & add oral finding" : kind === "past" ? "Search & add past procedure" : "Search & add oral procedure";
    const addAndClear = (name) => { if (name) state.onAddOralEntry(kind, name); setQuery(""); setSearchOpen(false); };
    const onAddCustom = () => {
        if (!queryTrim) return;
        setSearchOpen(false);
        if (usesBillItemDrawer) {
            setCustomDrawerInitial(queryTrim);
            setCustomDrawerOpen(true);
        } else {
            addAndClear(queryTrim);
        }
    };
    const place = useCallback(() => {
        const el = inputRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setPos({ top: r.bottom + 4, left: r.left, width: r.width });
    }, []);
    useEffect(() => {
        if (!searchOpen) return;
        place();
        const onDoc = (e) => {
            if (inputRef.current && inputRef.current.contains(e.target)) return;
            if (popRef.current && popRef.current.contains(e.target)) return;
            setSearchOpen(false);
        };
        const rp = () => place();
        document.addEventListener("mousedown", onDoc);
        window.addEventListener("scroll", rp, true);
        window.addEventListener("resize", rp);
        return () => { document.removeEventListener("mousedown", onDoc); window.removeEventListener("scroll", rp, true); window.removeEventListener("resize", rp); };
    }, [searchOpen, place]);
    const showDropdown = searchOpen && q.length > 0;
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8, padding: "4px 14px 12px" }, children: [
        list.length > 0 && (_jsx("div", { ref: wrapRef, className: clsx(ui.tableWrap, showEdge && ui.scrolledEdge), children: _jsxs("table", { className: ui.table, children: [
            _jsxs("colgroup", { children: [_jsx("col", { style: { minWidth: 150 } }), _jsx("col", { style: { width: 220, minWidth: 200 } }), _jsx("col", { style: { width: 120, minWidth: 110 } }), _jsx("col", { style: { minWidth: 130 } }), _jsx("col", { style: { width: 44, minWidth: 44, maxWidth: 44 } })] }),
            _jsx("thead", { children: _jsxs("tr", { className: ui.theadRow, children: [_jsx("th", { className: ui.th, children: "NAME" }), _jsx("th", { className: ui.th, children: "AREA" }), _jsx("th", { className: ui.th, children: kind === "past" ? "WHEN" : kind === "finding" ? "SINCE" : "" }), _jsx("th", { className: ui.th, children: "NOTE" }), _jsx("th", { className: ui.thSticky })] }) }),
            _jsx("tbody", { children: list.map((e) => (_jsxs("tr", { className: ui.tbodyRow, children: [
                _jsx("td", { className: ui.tdPlain, children: _jsx("span", { className: ui.symptomName, children: e.name }) }),
                _jsx("td", { className: ui.tdPlain, children: _jsx(OralPositionCell, { value: e.surfaces || [], onChange: (arr) => state.onUpdateOralEntry(e.id, { surfaces: arr }), onHoverPreview: (arr) => state.onSetOralHighlight?.(arr) }) }),
                _jsx("td", { className: ui.tdPlain, children: kind === "procedure" ? null : _jsx(SinceDropdown, { value: e.since || "", onChange: (v) => state.onUpdateOralEntry(e.id, { since: v }), kind: kind }) }),
                _jsx("td", { className: ui.tdPlain, children: _jsx("input", { type: "text", value: e.note || "", onChange: (ev) => state.onUpdateOralEntry(e.id, { note: ev.target.value }), placeholder: "Add note…", className: ui.symptomField }) }),
                _jsx("td", { className: ui.tdStickyAct, children: _jsx("button", { type: "button", onClick: () => state.onRemoveOralEntry(e.id), title: "Remove", className: ui.removeRowBtn, children: _jsx(Trash, { size: 20, color: "currentColor", strokeWidth: 1.5, variant: "Linear" }) }) }),
            ] }, e.id))) }),
        ] }) })),
        _jsxs("div", { className: ui.searchRel, children: [
            _jsx("span", { className: ui.searchIconAbs, children: _jsx(SearchNormal1, { size: 14, color: "currentColor", variant: "Linear" }) }),
            _jsx("input", { ref: inputRef, type: "text", value: query, onChange: (ev) => { setQuery(ev.target.value); setSearchOpen(true); }, onFocus: () => setSearchOpen(true), onKeyDown: (ev) => { if (ev.key === "Enter" && q) { const exact = catalog.find((c) => c.toLowerCase() === q); addAndClear(exact || query.trim()); } else if (ev.key === "Escape") { setSearchOpen(false); } }, placeholder: placeholder, className: ui.searchInput }),
        ] }),
        showDropdown && pos && typeof document !== "undefined" && createPortal(_jsxs("div", { ref: popRef, style: { position: "fixed", top: pos.top, left: pos.left, width: pos.width, zIndex: 9999, maxHeight: 260, overflowY: "auto", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, boxShadow: "0 10px 30px rgba(2,6,23,0.22)", padding: 6 }, children: [
            matches.length > 0
                ? matches.map((name) => (_jsx("button", { type: "button", onClick: () => addAndClear(name), style: { display: "block", width: "100%", textAlign: "left", fontSize: 12.5, padding: "7px 10px", borderRadius: 6, border: "none", background: "transparent", color: "#334155", cursor: "pointer", fontFamily: "Inter, sans-serif" }, onMouseEnter: (e) => { e.currentTarget.style.background = "rgba(99,102,241,0.08)"; }, onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; }, children: name }, name)))
                : (!showAddCustom && _jsx("div", { style: { fontSize: 12, color: "#94a3b8", padding: "8px 10px", fontFamily: "Inter, sans-serif" }, children: "No matches" })),
            // Add Custom row — appears below `matches` whenever the typed
            // text isn't already in the catalog and isn't already added to
            // this row's list. Mirrors the per-tooth EntryTab affordance so
            // doctors get the same workflow on both surfaces.
            showAddCustom && _jsx("button", { type: "button", className: ui.popoverAdd, onMouseDown: (e) => e.preventDefault(), onClick: onAddCustom, children: usesBillItemDrawer
                ? _jsxs("span", { className: ui.popoverAddInner, children: [_jsx(Add, { size: 16, color: "var(--tp-blue-600)", variant: "Bold" }), _jsxs("span", { children: ["Add \"", queryTrim, "\" as custom dental service"] })] })
                : _jsxs("span", { className: ui.popoverAddInner, children: [_jsx(Add, { size: 14, color: "currentColor", variant: "Linear" }), " Add \"", queryTrim, "\""] }) }),
        ] }), document.body),
        !showDropdown && quickChips.length > 0 && (_jsx("div", { className: ui.chipRow, children: quickChips.map((name) => (_jsx("button", { type: "button", onClick: () => addAndClear(name), className: ui.chipBtn, children: name }, name))) })),
        // Drawer for entering full custom dental-service metadata (price,
        // code, notes). Only mounted when `usesBillItemDrawer` is true.
        usesBillItemDrawer && _jsx(AddDentalBillItemDrawer, { open: customDrawerOpen, onOpenChange: setCustomDrawerOpen, initialName: customDrawerInitial, onSaved: (item) => { addAndClear(item.name); } }),
    ] }));
}
function OralExamPanel({ state }) {
    const entries = Array.isArray(state.oralEntries) ? state.oralEntries : [];
    const pastProcedures = entries.filter((e) => e.kind === "past");
    const findings = entries.filter((e) => e.kind === "finding");
    const procedures = entries.filter((e) => e.kind === "procedure");
    const notes = state.oralNotes || "";
    const [activeSection, setActiveSection] = useState("past");
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const hasAnyData = entries.length > 0 || notes.trim().length > 0;
    useEffect(() => () => { state.onSetOralHighlight?.([]); }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // NB: read the stale `activeSection` (not a functional updater) so that the
    // header's onClick and the accordion's bubbled onClick both resolve to the
    // same target — otherwise they compose and cancel out (section won't open).
    const jumpTo = (id) => { if (activeSection === id) setActiveSection(null); else setActiveSection(id); };
    const clearAll = () => { entries.forEach((e) => state.onRemoveOralEntry(e.id)); state.onUpdateOralNotes?.(""); setShowClearConfirm(false); };
    return (_jsxs("div", { className: ui.panelRoot, children: [
        _jsx("header", { className: ui.panelHeader, children: _jsxs("div", { className: ui.panelHeaderRow, children: [
            _jsxs("div", { className: ui.panelHeaderLeft, style: { minWidth: 0, flex: 1 }, children: [
                _jsx("div", { className: ui.panelThumb, style: { flexShrink: 0 }, children: _jsx(MiniScopeCanvas, { patientType: state.patientType ?? "adult", scopeType: "full-mouth", fdis: state.selectionScopeFdis ?? [], toothDiagnoses: state.toothDiagnoses, findingsByTooth: state.findingsByTooth, implantTeeth: state.implantTeeth, size: 40 }) }),
                _jsx("div", { className: ui.panelTitleBlock, style: { minWidth: 0 }, children: _jsxs("div", { className: ui.panelTitleRow, children: [_jsx("h3", { className: ui.panelTitle, style: { overflow: "visible", maxWidth: "none" }, children: "Oral Examination" }), _jsx("span", { className: ui.panelBadge, children: "FULL" })] }) }),
            ] }),
            _jsxs("div", { className: ui.panelHeaderActions, children: [
                _jsx("button", { type: "button", className: ui.panelIconBtn, title: "Template", children: _jsx(Grid5, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }),
                _jsx("button", { type: "button", className: ui.panelIconBtn, title: "Save", children: _jsx(Ram, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }),
                _jsx("button", { type: "button", title: "Clear all oral examination data", disabled: !hasAnyData, onClick: () => setShowClearConfirm(true), className: ui.panelIconBtnDanger, children: _jsx(Eraser, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }),
                _jsx(TPConfirmDialog, { open: showClearConfirm, onOpenChange: setShowClearConfirm, title: "Are you sure you want to clear oral examination?", warning: "This will remove all oral findings, procedures, and notes from this visit. This action cannot be undone.", secondaryLabel: "Yes, Clear All", secondaryTone: "destructive", onSecondary: clearAll, primaryLabel: "No, Keep It" }),
                _jsx("div", { className: ui.panelDivider }),
                _jsx("button", { type: "button", onClick: () => state.onBackToDentition(), className: ui.panelCloseBtn, title: "Close panel", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 256 256", children: [_jsx("rect", { width: "256", height: "256", fill: "none" }), _jsx("polyline", { points: "192 104 152 104 152 64", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "208", y1: "48", x2: "152", y2: "104", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("polyline", { points: "64 152 104 152 104 192", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "48", y1: "208", x2: "104", y2: "152", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("polyline", { points: "152 192 152 152 192 152", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "208", y1: "208", x2: "152", y2: "152", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("polyline", { points: "104 64 104 104 64 104", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "48", y1: "48", x2: "104", y2: "104", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" })] }) }),
            ] }),
        ] }) }),
        _jsxs("div", { className: ui.panelBody, children: [
            _jsx(AccordionWrap, { open: activeSection === "past", fitContent: true, onExpand: () => jumpTo("past"), header: _jsx(SectionHeader, { title: "Past Procedures", count: pastProcedures.length, medicalIcon: "clipboard-activity", onTemplate: activeSection === "past" ? () => { } : undefined, onSave: activeSection === "past" ? () => { } : undefined, onClear: activeSection === "past" ? () => { pastProcedures.forEach((e) => state.onRemoveOralEntry(e.id)); } : undefined, clearDisabled: pastProcedures.length === 0, chevron: activeSection === "past" ? "up" : "down", onClick: () => jumpTo("past"), onChevronClick: () => jumpTo("past") }), children: _jsx(OralTable, { state: state, kind: "past", catalog: ORAL_PROCEDURES, list: pastProcedures }) }),
            _jsx(AccordionWrap, { open: activeSection === "findings", fitContent: true, onExpand: () => jumpTo("findings"), header: _jsx(SectionHeader, { title: "Findings", count: findings.length, medicalIcon: "diagnosis", onTemplate: activeSection === "findings" ? () => { } : undefined, onSave: activeSection === "findings" ? () => { } : undefined, onClear: activeSection === "findings" ? () => { findings.forEach((e) => state.onRemoveOralEntry(e.id)); } : undefined, clearDisabled: findings.length === 0, chevron: activeSection === "findings" ? "up" : "down", onClick: () => jumpTo("findings"), onChevronClick: () => jumpTo("findings") }), children: _jsx(OralTable, { state: state, kind: "finding", catalog: ORAL_FINDINGS, list: findings }) }),
            _jsx(AccordionWrap, { open: activeSection === "procedures", fitContent: true, onExpand: () => jumpTo("procedures"), header: _jsx(SectionHeader, { title: "Procedures", count: procedures.length, medicalIcon: "surgical-scissors-02", onTemplate: activeSection === "procedures" ? () => { } : undefined, onSave: activeSection === "procedures" ? () => { } : undefined, onClear: activeSection === "procedures" ? () => { procedures.forEach((e) => state.onRemoveOralEntry(e.id)); } : undefined, clearDisabled: procedures.length === 0, chevron: activeSection === "procedures" ? "up" : "down", onClick: () => jumpTo("procedures"), onChevronClick: () => jumpTo("procedures") }), children: _jsx(OralTable, { state: state, kind: "procedure", catalog: ORAL_PROCEDURES, list: procedures }) }),
            _jsx(AccordionWrap, { open: activeSection === "notes", fitContent: true, onExpand: () => jumpTo("notes"), header: _jsx(SectionHeader, { title: "Overall Notes", medicalIcon: "note-2", onTemplate: activeSection === "notes" ? () => { } : undefined, onSave: activeSection === "notes" ? () => { } : undefined, onClear: activeSection === "notes" ? () => state.onUpdateOralNotes?.("") : undefined, chevron: activeSection === "notes" ? "up" : "down", onClick: () => jumpTo("notes"), onChevronClick: () => jumpTo("notes") }), children: _jsx("div", { className: ui.notesPad, children: _jsx("textarea", { value: notes, onChange: (e) => state.onUpdateOralNotes?.(e.target.value), placeholder: "General notes for the oral examination…", className: ui.notesArea }) }) }),
        ] }),
    ] }));
}
function OralRecordsList({ state }) {
    const entries = Array.isArray(state?.oralEntries) ? state.oralEntries : [];
    if (entries.length === 0) return null;
    const pastProcs = entries.filter((e) => e.kind === "past").map((e) => e.name);
    const findings = entries.filter((e) => e.kind === "finding").map((e) => e.name);
    const procs = entries.filter((e) => e.kind === "procedure").map((e) => e.name);
    const overallNotes = (state?.oralNotes || "").trim();
    // One labeled section row — icon + section name + count chip + the actual
    // items listed cleanly underneath. Far easier to scan than a flat pill row.
    // One labeled section row — icon + section name (with count in brackets) +
    // the items rendered as flat-style tag chips matching the dental tag chips
    // on the left (no stroke, plain light violet bg, 6px corner radius).
    const itemTagStyle = { display: "inline-flex", alignItems: "center", fontSize: 12, fontWeight: 600, color: "#703A9E", background: "rgba(164,97,216,0.16)", padding: "3px 8px", borderRadius: 6, lineHeight: 1.4, whiteSpace: "nowrap", cursor: "default" };
    // Hover broadcast — DentitionView listens to `oral-tags-filter` and shows
    // only matching tooltips on the canvas. Simplified 2-level model:
    //   null               → hide everything (card leave)
    //   { all: true }      → show every tag (any hover inside the card —
    //                        card itself, a section, OR between chips)
    //   { kind, name }     → show just that one entry (individual chip hover)
    // The previous per-section "show only this kind" filter was removed —
    // doctors found it noisy. Only chip-level narrowing remains useful.
    const fire = (detail) => { if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("oral-tags-filter", { detail })); };
    const onCardEnter = () => fire({ all: true });
    const onCardLeave = () => { fire(null); state?.onSetOralHighlight?.([]); };
    const onCardClick = () => { fire(null); state?.onSetOralHighlight?.([]); state.onEnterOralExam?.(); };
    const onItemEnter = (kind, name) => {
        const e = entries.find((x) => x.kind === kind && x.name === name);
        if (e) state?.onSetOralHighlight?.(e.surfaces || []);
        fire({ kind, name });
    };
    // Chip leave restores the card-level "show all" view — we know the
    // cursor is still inside the card (mouseleave on chip ≠ leaving card).
    const onItemLeave = () => { state?.onSetOralHighlight?.([]); fire({ all: true }); };
    const sectionRow = (icon, label, items, key, kind) => items.length === 0 ? null : (
        _jsxs("div", { style: { display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", borderRadius: 10, background: "#f8fafc", border: "1px solid #eef2f7" }, children: [
            _jsx("span", { style: { display: "inline-flex", height: 32, width: 32, alignItems: "center", justifyContent: "center", borderRadius: 8, background: "rgba(164,97,216,0.12)", flexShrink: 0 }, children: _jsx(TPMedicalIcon, { name: icon, variant: "bulk", size: 16, color: "var(--tp-violet-600)" }) }),
            _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8, minWidth: 0, flex: 1, textAlign: "left" }, children: [
                _jsxs("span", { style: { fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: "0.1px" }, children: [label, " ", _jsxs("span", { style: { fontWeight: 500, color: "#94a3b8" }, children: ["(", items.length, ")"] })] }),
                _jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: items.map((it, i) => _jsx("span", { style: itemTagStyle, title: it, onMouseEnter: (ev) => { ev.stopPropagation(); onItemEnter(kind, it); }, onMouseLeave: (ev) => { ev.stopPropagation(); onItemLeave(); }, children: it }, `${key}-${i}`)) }),
            ] }),
        ] }, key)
    );
    const notesRow = !overallNotes ? null : (
        _jsxs("div", { style: { display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", borderRadius: 10, background: "#f8fafc", border: "1px solid #eef2f7" }, children: [
            _jsx("span", { style: { display: "inline-flex", height: 32, width: 32, alignItems: "center", justifyContent: "center", borderRadius: 8, background: "rgba(164,97,216,0.12)", flexShrink: 0 }, children: _jsx(TPMedicalIcon, { name: "note-2", variant: "bulk", size: 16, color: "var(--tp-violet-600)" }) }),
            _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0, flex: 1, textAlign: "left" }, children: [
                _jsx("span", { style: { fontSize: 14, fontWeight: 700, color: "#0f172a" }, children: "Oral Notes" }),
                _jsx("p", { style: { margin: 0, fontSize: 12, color: "#475569", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }, title: overallNotes, children: overallNotes }),
            ] }),
        ] }, "notes")
    );
    // No outer "Oral Records" header — the card title carries an inline count
    // chip so a single Oral Examination card represents the whole section.
    return (_jsx("div", { className: ui.recordsList, style: { marginTop: 4 }, children: _jsxs("button", { type: "button", onMouseEnter: onCardEnter, onMouseLeave: onCardLeave, onClick: onCardClick, className: clsx(ui.toothRow), children: [
            _jsxs("div", { className: ui.toothRowHeader, children: [
                _jsx("div", { className: ui.toothThumb, children: _jsx(MiniScopeCanvas, { patientType: "adult", scopeType: "full-mouth", fdis: undefined, toothDiagnoses: EMPTY_OBJ, findingsByTooth: EMPTY_OBJ, implantTeeth: EMPTY_SET, size: 52 }) }),
                _jsx("div", { className: ui.toothHeaderText, children: _jsxs("span", { className: ui.toothName, style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: ["Oral Examination", _jsx("span", { style: { fontSize: 12, fontWeight: 700, color: "#475569", background: "rgba(100,116,139,0.16)", padding: "1px 8px", borderRadius: 999, lineHeight: 1.4 }, children: entries.length })] }) }),
                _jsx("span", { className: ui.toothChevron, "aria-hidden": true, children: _jsx(ExpandIcon, { size: 17 }) }),
            ] }),
            _jsx("div", { className: ui.toothRowDivider, "aria-hidden": true }),
            _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
                sectionRow("clipboard-activity", "Past Procedures", pastProcs, "past", "past"),
                sectionRow("diagnosis", "Findings", findings, "fnd", "finding"),
                sectionRow("surgical-scissors-02", "Procedures", procs, "proc", "procedure"),
                notesRow,
            ] }),
        ] }) }));
}
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
        { id: "procedures", label: "Past Procedures", icon: "clipboard-activity", count: diagnosisCount + procedureCount },
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
    return (_jsxs("div", { className: ui.panelRoot, children: [_jsx("header", { className: ui.panelHeader, children: _jsxs("div", { className: ui.panelHeaderRow, children: [_jsxs("div", { className: ui.panelHeaderLeft, children: [_jsx("div", { className: ui.panelThumb, children: isGroupedScope ? (_jsx(MiniScopeCanvas, { patientType: state.patientType ?? "adult", scopeType: state.selectionScopeType === "full-mouth" ? "full-mouth" : state.selectionScopeType === "arch" ? "arch" : "quadrant", fdis: state.selectionScopeFdis ?? [], toothDiagnoses: state.toothDiagnoses, findingsByTooth: state.findingsByTooth, implantTeeth: state.implantTeeth, size: 40 })) : (_jsx(MiniToothCanvas, { tooth: state.selectedTooth, size: 40, diagnoses: state.currentToothDiagnoses, isImplant: state.isImplant, findings: state.findings })) }), _jsx("div", { className: ui.panelTitleBlock, children: _jsxs("div", { className: ui.panelTitleRow, children: [_jsx("h3", { className: ui.panelTitle, children: entityLabel }), _jsx("span", { className: ui.panelBadge, children: entityBadge })] }) })] }), _jsxs("div", { className: ui.panelHeaderActions, children: [_jsx("button", { type: "button", className: ui.panelIconBtn, title: "Template", children: _jsx(Grid5, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("button", { type: "button", className: ui.panelIconBtn, title: "Save", children: _jsx(Ram, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx(_Fragment, { children: [
    _jsx("button", { type: "button", title: "Clear all data for this tooth", disabled: !hasAnyData, onClick: () => setShowClearConfirm(true), className: ui.panelIconBtnDanger, children: _jsx(Eraser, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }, "trigger"),
    _jsx(TPConfirmDialog, { open: showClearConfirm, onOpenChange: setShowClearConfirm, title: `Are you sure you want to clear all data for ${entityLabel}?`, warning: `This will remove all treatment history, findings, procedures, and notes for ${entityLabel} (${entityBadge}). This action cannot be undone.`, secondaryLabel: "Yes, Clear All", secondaryTone: "destructive", onSecondary: clearAllToothData, primaryLabel: "No, Keep It" }, "dialog"),
] }), _jsx("div", { className: ui.panelDivider }), _jsx("button", { type: "button", onClick: tryBack, className: ui.panelCloseBtn, title: "Close panel", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 256 256", children: [_jsx("rect", { width: "256", height: "256", fill: "none" }), _jsx("polyline", { points: "192 104 152 104 152 64", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "208", y1: "48", x2: "152", y2: "104", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("polyline", { points: "64 152 104 152 104 192", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "48", y1: "208", x2: "104", y2: "152", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("polyline", { points: "152 192 152 152 192 152", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "208", y1: "208", x2: "152", y2: "152", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("polyline", { points: "104 64 104 104 64 104", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }), _jsx("line", { x1: "48", y1: "48", x2: "104", y2: "104", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" })] }) })] })] }) }), _jsxs("div", { className: ui.panelBody, children: [_jsx("div", { ref: (el) => { sectionRefs.current.procedures = el; }, children: _jsx(AccordionWrap, { open: activeSection === "procedures", onExpand: () => jumpTo("procedures"), header: _jsx(SectionHeader, { title: "Past Procedures", count: diagnosisCount + procedureCount, medicalIcon: "clipboard-activity", onTemplate: activeSection === "procedures" ? () => { } : undefined, onSave: activeSection === "procedures" ? () => { } : undefined, onClear: activeSection === "procedures" ? () => {
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
function AccordionWrap({ open, header, children, onExpand, fitContent = false, }) {
    return (_jsxs("div", { className: clsx(ui.accordion, open ? ui.accordionOpen : ui.accordionClosed), style: open && fitContent ? { flex: '0 0 auto' } : undefined, onClick: open ? undefined : onExpand, children: [_jsx("div", { className: ui.accordionHeaderSlot, children: header }), _jsx("div", { className: ui.accordionGrid, style: {
                    gridTemplateRows: open ? '1fr' : '0fr',
                    opacity: open ? 1 : 0,
                    // fitContent: size to the content (used by the lighter oral
                    // sections) instead of stretching to fill the panel body.
                    flex: open ? (fitContent ? '0 0 auto' : '1 1 0%') : '0 0 0px'
                }, children: _jsx("div", { className: ui.accordionGridInner, children: children }) })] }));
}
// ──────────────────────────────────────────────────────────────
// SectionHeader — TP medical icon + title + count + Template/Save/Clear
// Matches RxPad section header styling.
// ──────────────────────────────────────────────────────────────
function SectionHeader({ title, count, medicalIcon, onTemplate, onSave, onClear, clearDisabled, onClick, chevron, onChevronClick, }) {
    const stop = (e) => e.stopPropagation();
    const titleWithCount = typeof count === "number" ? `${title} (${count})` : title;
    // Clear is intercepted with a confirmation prompt — never call onClear directly.
    const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
    const requestClear = (e) => { e.stopPropagation(); setClearConfirmOpen(true); };
    const confirmClear = () => { setClearConfirmOpen(false); onClear?.(); };
    return (_jsxs(_Fragment, { children: [_jsxs("header", { onClick: onClick, className: clsx(ui.secHead, onClick && ui.secHeadClick), children: [medicalIcon && (_jsx("span", { className: ui.secIcon, children: _jsx(TPMedicalIcon, { name: medicalIcon, variant: "bulk", size: 22, color: "var(--tp-violet-500)" }) })), _jsx("h4", { className: ui.secTitle, children: titleWithCount }), _jsx("div", { className: ui.secGrow }), _jsxs("div", { className: ui.secActions, onClick: stop, children: [onTemplate && (_jsx("button", { type: "button", title: "Templates", onClick: onTemplate, className: ui.secToolBtn, children: _jsx(Grid5, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) })), onSave && (_jsx("button", { type: "button", title: "Save as template", onClick: onSave, className: ui.secToolBtn, children: _jsx(Ram, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) })), onClear && (_jsx("button", { type: "button", title: "Clear", onClick: requestClear, disabled: clearDisabled, className: ui.secToolBtn, children: _jsx(Eraser, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) })), chevron && (_jsx("button", { type: "button", onClick: (e) => { e.stopPropagation(); onChevronClick?.() ?? onClick?.(); }, className: ui.secChevronBtn, children: chevron === "up" ? (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", children: _jsx("path", { d: "M19.92 15.05L13.4 8.53c-.77-.77-2.03-.77-2.8 0l-6.52 6.52", stroke: "#334155", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }) })) : (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", children: _jsx("path", { d: "M19.92 8.95L13.4 15.47c-.77.77-2.03.77-2.8 0L4.08 8.95", stroke: "#64748b", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }) })) }))] })] }), _jsx(TPConfirmDialog, { open: clearConfirmOpen, onOpenChange: setClearConfirmOpen, title: `Are you sure you want to clear ${title.toLowerCase()}?`, warning: `Clearing this section will remove all ${title.toLowerCase()} data from this visit. This action cannot be undone.`, secondaryLabel: `Yes, Clear ${title}`, secondaryTone: "destructive", onSecondary: confirmClear, primaryLabel: "No, Keep It" })] }));
}
// ──────────────────────────────────────────────────────────────
// EntryTab — shared builder + table for Findings and Procedures
// ──────────────────────────────────────────────────────────────
function EntryTab({ state, kind }) {
    const { wrapRef, showEdge } = useStickyActionEdge(0);
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
    // Findings/symptoms record a "SINCE" date; procedures drop the date column
    // and record who performed them ("Doctor") instead — status + doctor + note
    // are sufficient for procedures in v0.
    const hasDate = kind === "finding" || kind === "symptom";
    const hasDoneBy = false; // Doctor column removed from procedures per request
    const PROC_DOCTORS = ["Dr. Sheela B R", "Dr. Shyam GR", "Dr. Riya Kapoor"];
    return (_jsxs(_Fragment, { children: [_jsxs("div", { "data-rx-module-root": true, className: ui.entryRoot, children: [entries.length > 0 && (_jsx("div", { ref: wrapRef, className: clsx(ui.tableWrap, showEdge && ui.scrolledEdge), children: _jsxs("table", { className: ui.table, children: [_jsxs("colgroup", { children: [_jsx("col", { style: { width: 36, minWidth: 36 } }), _jsx("col", { style: { minWidth: 150 } }), _jsx("col", { style: { width: 140, minWidth: 120 } }), hasDate && _jsx("col", { style: { width: 120, minWidth: 110 } }), hasStatus && _jsx("col", { style: { width: 120, minWidth: 110 } }), hasDoneBy && _jsx("col", { style: { width: 140, minWidth: 120 } }), _jsx("col", { style: { minWidth: 120 } }), _jsx("col", { style: { width: 44, minWidth: 44, maxWidth: 44 } })] }), _jsx("thead", { children: _jsxs("tr", { className: ui.theadRow, children: [_jsx("th", { className: ui.thCenter }), _jsx("th", { className: ui.th, children: "NAME" }), _jsx("th", { className: ui.th, children: "SURFACES" }), hasDate && _jsx("th", { className: ui.th, children: "SINCE" }), hasStatus && _jsx("th", { className: ui.th, children: "STATUS" }), hasDoneBy && _jsx("th", { className: ui.th, children: "Doctor" }), _jsx("th", { className: ui.th, children: "NOTE" }), _jsx("th", { className: ui.thSticky })] }) }), _jsx("tbody", { children: entries.map((e) => {
                                const isSurfaceActive = isCellActive(e.id, "surfaces");
                                const isDateActive = isCellActive(e.id, kind === "finding" || kind === "symptom" ? "since" : "date");
                                const isStatusActive = isCellActive(e.id, "status");
                                const isDoneByActive = isCellActive(e.id, "doneBy");
                                const isNoteActive = isCellActive(e.id, "note");
                                // Entries added across a scope (shared groupId) are read-only in
                                // the single-tooth view and badged with the scope — editing one
                                // tooth would desync the group. Editable from the scope view.
                                const groupScope = (!isGroupedScope && e.groupId)
                                    ? (scopeForFdis([...new Set((state.allEntries || []).filter((x) => x.groupId === e.groupId).map((x) => x.toothFdi).filter(Boolean))], state.patientType)?.label ?? null)
                                    : null;
                                const lockStyle = groupScope ? { pointerEvents: "none", opacity: 0.6 } : undefined;
                                const activateSurfaceCell = () => {
                                    setCellActive(e.id, "surfaces");
                                    state.onSetMultiSelectZones(e.surfaces);
                                    state.onSetMultiSelectActive(true);
                                };
                                return (_jsxs("tr", { onMouseEnter: () => { if (!isSurfaceActive)
                                        state.onSetHighlightZones(e.surfaces); }, onMouseLeave: () => { if (!isSurfaceActive)
                                        state.onSetHighlightZones([]); }, className: ui.tbodyRow, children: [_jsx("td", { className: clsx(ui.td, ui.tdGrip), children: _jsx("span", { className: ui.gripIcon, children: _jsxs("svg", { width: "8", height: "16", viewBox: "0 0 8 16", fill: "currentColor", children: [_jsx("circle", { cx: "2", cy: "3", r: "1.2" }), _jsx("circle", { cx: "2", cy: "8", r: "1.2" }), _jsx("circle", { cx: "2", cy: "13", r: "1.2" }), _jsx("circle", { cx: "6", cy: "3", r: "1.2" }), _jsx("circle", { cx: "6", cy: "8", r: "1.2" }), _jsx("circle", { cx: "6", cy: "13", r: "1.2" })] }) }) }), _jsx("td", { className: clsx(ui.td, ui.tdHover), onClick: (ev) => ev.stopPropagation(), children: _jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }, children: [_jsx(EditableNameCell, { value: e.name, catalog: catalog, onCommit: (v) => { if (v.trim())
                                                    state.onUpdateEntry(e.id, { name: v.trim() }); }, onFocusActivate: () => setCellActive(e.id, "name") }), groupScope && _jsxs("span", { title: `Added via ${groupScope} — manage it from the ${groupScope} scope view`, style: { fontSize: 10.5, fontWeight: 700, color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 5, padding: "1px 6px", whiteSpace: "nowrap", cursor: "help" }, children: ["· ", groupScope] })] }) }), _jsxs("td", { className: clsx(ui.td, ui.tdRel, isSurfaceActive ? ui.tdActive : ui.tdHover), style: lockStyle, onClick: (ev) => ev.stopPropagation(), children: [isSurfaceActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsx(SurfaceCellDropdown, { entry: e, arch: state.selectedTooth.arch, toothPosition: state.selectedTooth.position, mode: kind === "finding" ? "finding" : kind === "symptom" ? "symptom" : "treatment", isActive: isSurfaceActive, onActivate: activateSurfaceCell, onDeactivate: () => {
                                                        if (state.selectedZone === "whole")
                                                            state.onClearSelectedZone();
                                                        clearCellActive(e.id, "surfaces");
                                                    }, onToggleZone: state.onToggleZoneMultiSelect, onHover: state.onSetHighlightZones, multiSelectZones: state.multiSelectZones })] }), hasDate && (_jsxs("td", { className: clsx(ui.td, ui.tdRel, isDateActive ? ui.tdActive : ui.tdHover), style: lockStyle, onClick: (ev) => ev.stopPropagation(), children: [isDateActive ? _jsx("span", { className: ui.cellFocusRing }) : null, kind === "finding" || kind === "symptom" ? (_jsx(SinceDropdown, { value: e.since ?? "", onChange: (v) => state.onUpdateEntry(e.id, { since: v || undefined }), onFocusActivate: () => setCellActive(e.id, "since"), onBlurDeactivate: () => clearCellActive(e.id, "since") })) : (_jsxs("div", { className: ui.dateCellInner, children: [!e.plannedDate && (_jsxs("div", { className: ui.datePlaceholderRow, children: [_jsx("span", { className: ui.datePlaceholderText, children: "DD/MM/YYYY" }), _jsx(Calendar, { size: 14, color: "#94a3b8", variant: "Linear" })] })), _jsx("input", { type: "date", value: e.plannedDate ?? "", onChange: (ev) => state.onUpdateEntry(e.id, { plannedDate: ev.target.value || undefined }), onFocus: () => setCellActive(e.id, "date"), onBlur: () => clearCellActive(e.id, "date"), className: clsx(ui.dateInput, e.plannedDate ? ui.dateInputFilled : ui.dateInputEmpty) })] }))] })), hasStatus && (_jsxs("td", { className: clsx(ui.td, ui.tdRel, isStatusActive && ui.tdActive), style: lockStyle, onClick: (ev) => ev.stopPropagation(), children: [isStatusActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsxs("select", { value: e.status ?? "planned", onChange: (ev) => state.onUpdateEntry(e.id, { status: ev.target.value }), onFocus: () => setCellActive(e.id, "status"), onBlur: () => clearCellActive(e.id, "status"), className: ui.selectNative, children: [_jsx("option", { value: "planned", children: "Planned" }), _jsx("option", { value: "in-progress", children: "In progress" }), _jsx("option", { value: "completed", children: "Completed" })] })] })), hasDoneBy && (_jsxs("td", { className: clsx(ui.td, ui.tdRel, isDoneByActive && ui.tdActive), style: lockStyle, onClick: (ev) => ev.stopPropagation(), children: [isDoneByActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsx("select", { value: e.doneBy ?? PROC_DOCTORS[0], onChange: (ev) => state.onUpdateEntry(e.id, { doneBy: ev.target.value }), onFocus: () => setCellActive(e.id, "doneBy"), onBlur: () => clearCellActive(e.id, "doneBy"), className: ui.selectNative, children: PROC_DOCTORS.map((d) => _jsx("option", { value: d, children: d }, d)) })] })), _jsxs("td", { className: clsx(ui.td, ui.tdRel, isNoteActive ? ui.tdActive : ui.tdHover), style: lockStyle, onClick: (ev) => ev.stopPropagation(), children: [isNoteActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsx("input", { type: "text", value: e.notes ?? "", onChange: (ev) => state.onUpdateEntry(e.id, { notes: ev.target.value }), onFocus: () => setCellActive(e.id, "note"), onBlur: () => clearCellActive(e.id, "note"), placeholder: "e.g. Monitor at next visit", className: ui.noteInput })] }), _jsx("td", { className: ui.tdStickyAct, onClick: (ev) => ev.stopPropagation(), children: _jsx("button", { type: "button", onClick: () => { if (groupScope) return; if (activeSurfaceRowId === e.id)
                                                    setActiveCell(null); state.onRemoveEntry(e.id); }, disabled: Boolean(groupScope), title: groupScope ? `Managed via ${groupScope}` : "Remove", className: ui.removeRowBtn, style: groupScope ? { opacity: 0.35, cursor: "not-allowed" } : undefined, children: _jsx(Trash, { size: 20, color: "currentColor", strokeWidth: 1.5, variant: "Linear" }) }) })] }, e.id));
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
    const surfTooltipTitle = shown.length === 0 ? "" : (isWholeTooth ? "Whole tooth" : shown.map((z) => getZoneLabel(z, arch, toothPosition)).join(", "));
    return (_jsxs(_Fragment, { children: [_jsx(TPTooltip, { title: surfTooltipTitle, arrow: true, placement: "top", enterDelay: 250, children: _jsxs("button", { ref: anchorRef, type: "button", onClick: () => {
                    if (open) {
                        setOpen(false);
                        onDeactivate?.();
                        return;
                    }
                    onActivate();
                    setOpen(true);
                }, className: ui.surfaceTriggerBtn, children: [_jsx("span", { className: ui.surfaceTriggerText, children: shown.length === 0 ? (_jsx("span", { className: ui.surfacePlaceholder, children: "Select surface" })) : isWholeTooth ? (_jsxs("span", { className: ui.surfaceInlineRow, children: [_jsx("span", { className: ui.surfaceDot8, style: { background: ZONE_INFO.whole.color } }), "Whole tooth"] })) : (_jsx(SurfaceDots, { surfaces: shown, arch: arch, toothPosition: toothPosition })) }), _jsx("svg", { width: "10", height: "6", viewBox: "0 0 10 6", fill: "none", style: { transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }, children: _jsx("path", { d: "M1 1L5 5L9 1", stroke: "#94a3b8", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })] }) }), open && pos && typeof document !== "undefined" && createPortal(_jsxs("div", { ref: popoverRef, className: ui.surfacePopover, style: { top: pos.top, left: pos.left, width: pos.width }, children: [_jsx("div", { className: ui.surfacePopoverPad, children: _jsxs("div", { className: ui.surfaceHint, children: [_jsx(InfoCircle, { size: 13, color: "var(--tp-amber-700)", variant: "Bold" }), _jsxs("span", { className: ui.surfaceHintText, children: ["Tap the ", _jsx("span", { className: ui.surfaceHintBold, children: "3D tooth" }), " to select surfaces, or pick from the list below"] })] }) }), _jsxs("ul", { className: ui.surfaceZoneList, children: [_jsx("li", { children: _jsxs("button", { type: "button", onClick: clickWholeTooth, className: ui.surfaceZoneBtn, children: [_jsx("span", { className: clsx(ui.surfaceCheck, isWholeTooth && ui.surfaceCheckOn), children: isWholeTooth && (_jsx("svg", { width: "9", height: "9", viewBox: "0 0 10 10", fill: "none", children: _jsx("path", { d: "M2 5L4 7L8 3", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) })) }), _jsx("span", { className: ui.surfaceDot8, style: { background: ZONE_INFO.whole.color } }), _jsx("span", { className: clsx(ui.surfaceMenuLabel, ui.surfaceMenuStrong), children: "Whole tooth" })] }) }), _jsx("li", { className: ui.surfaceListRule }), ALL_ZONES.map((z) => {
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
// Hybrid input — typed natural-language ("3 weeks") + quick-chip suggestions
// on focus, OR a calendar icon that swaps to a native date picker. Selecting
// a date writes back a human-readable "DD MMM YYYY" string so the printed
// Rx still reads naturally regardless of which path the doctor used.
function SinceDropdown({ value, onChange, autoOpen, onFocusActivate, onBlurDeactivate, kind = "finding" }) {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(value);
    const [pos, setPos] = useState(null);
    const anchorRef = useRef(null);
    const popoverRef = useRef(null);
    const dateInputRef = useRef(null);
    useEffect(() => {
        if (autoOpen && !value) { setOpen(true); }
    }, [autoOpen, value]);
    useEffect(() => { setInternalValue(value); }, [value]);
    // Always a fixed 4-option list — no dynamic "3 weeks 3 days" expansions.
    // Doctors get a predictable set + "Select custom date" footer that hands
    // off to the OS picker for anything outside the canonical range.
    const options = useMemo(() => ["1 day", "1 week", "1 month", "1 year"], []);
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
    const fmtDate = (iso) => {
        try { const d = new Date(iso); if (Number.isNaN(d.getTime())) return iso; return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); } catch { return iso; }
    };
    // True when the stored value looks like a date string the picker produced
    // ("12 Jan 2026"). When true, the input is treated as locked-to-date —
    // focus on the input opens the OS calendar directly (so the doctor can
    // change the date), suggestion popover stays hidden. Clearing the input
    // to empty (backspace / select-all + delete) brings the suggestions back.
    const isDateValue = !!internalValue && /^\d{1,2}\s+[A-Za-z]{3}\s+\d{4}$/.test(internalValue.trim());
    const openNativePicker = () => {
        try { dateInputRef.current?.showPicker?.(); }
        catch { try { dateInputRef.current?.focus?.(); dateInputRef.current?.click?.(); } catch {} }
    };
    const onCalendarClick = (e) => {
        e.stopPropagation();
        setOpen(false);
        openNativePicker();
    };
    return (_jsxs(_Fragment, { children: [
        _jsxs("div", { className: ui.sinceAnchor, ref: anchorRef, children: [
            _jsx("input", { type: "text", value: internalValue, onFocus: () => { onFocusActivate?.(); if (isDateValue) { setOpen(false); openNativePicker(); } else { setOpen(true); } }, onChange: (e) => { setInternalValue(e.target.value); setOpen(true); }, onKeyDown: (e) => { if (e.key === "Enter") { onChange(internalValue); setOpen(false); } }, placeholder: "e.g. 5 days", className: ui.sinceInput }),
            // Hidden native date input — `showPicker()` opens the OS calendar
            // directly without rendering any in-app card.
            _jsx("input", { ref: dateInputRef, type: "date", onChange: (e) => { const v = e.target.value; if (v) { const formatted = fmtDate(v); setInternalValue(formatted); onChange(formatted); setOpen(false); } }, style: { position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 26, height: 26, opacity: 0, pointerEvents: "none", border: 0, padding: 0, margin: 0 }, "aria-hidden": true, tabIndex: -1 }),
            // Calendar icon — always rendered, never swapped for a clear-× button.
            // Clearing is via backspace inside the input itself.
            _jsx("button", { type: "button", onClick: onCalendarClick, "aria-label": "Pick exact date", title: "Pick exact date", style: { position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 26, height: 26, borderRadius: 6, border: "none", background: "transparent", color: "#94a3b8", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", zIndex: 21 }, children: _jsx(Calendar, { size: 14, color: "currentColor", variant: "Linear" }) }),
        ] }),
        open && pos && !isDateValue && createPortal(
            _jsxs("div", { ref: popoverRef, className: ui.sinceMenu, style: { top: pos.top, left: pos.left, width: pos.width },
                children: [
                    _jsx("div", { style: { display: "flex", flexDirection: "column" }, children: options.map((opt, i) => (_jsx("button", { type: "button", className: ui.popoverItem, onClick: () => { setInternalValue(opt); onChange(opt); setOpen(false); }, children: opt }, `${opt}-${i}`))) }),
                    // Footer — "Select custom date" hands off to the OS native picker.
                    _jsx("div", { style: { borderTop: "1px solid #e2e8f0", marginTop: 4 } }),
                    _jsxs("button", { type: "button", onClick: (e) => { e.stopPropagation(); setOpen(false); openNativePicker(); }, style: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", border: "none", background: "transparent", color: "var(--tp-blue-500)", fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 600, cursor: "pointer", textAlign: "left" }, children: [_jsx(Calendar, { size: 14, color: "currentColor", variant: "Linear" }), _jsx("span", { children: "Select custom date" })] }),
                ] }),
            document.body
        )
    ] }));
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
    // Show EVERY surface — wrap to as many rows as needed. The trigger button's
    // TPTooltip carries the full labels for the doctor.
    return (_jsx("div", { className: ui.dotsRow, style: { flexWrap: "wrap", rowGap: 4 }, children: surfaces.map((z) => (_jsx("span", { className: ui.dotsAbbr, style: { background: ZONE_INFO[z].color, flexShrink: 0 }, children: abbr(z) }, z))) }));
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
    const { wrapRef, showEdge } = useStickyActionEdge(rows.length);
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
    return (_jsxs("div", { "data-rx-module-root": true, className: ui.entryRoot, children: [rows.length > 0 && (_jsx("div", { ref: wrapRef, className: clsx(ui.tableWrap, showEdge && ui.scrolledEdge), children: _jsxs("table", { className: ui.table, children: [_jsxs("colgroup", { children: [_jsx("col", { style: { minWidth: 140 } }), _jsx("col", { style: { width: 140, minWidth: 120 } }), _jsx("col", { style: { width: 100, minWidth: 90 } }), _jsx("col", { style: { width: 140, minWidth: 140 } }), _jsx("col", { style: { minWidth: 110 } }), _jsx("col", { style: { width: 44, minWidth: 44, maxWidth: 44 } })] }), _jsx("thead", { children: _jsxs("tr", { className: ui.theadRow, children: [_jsx("th", { className: ui.thUpper, children: "NAME" }), _jsx("th", { className: ui.thUpper, children: "SURFACES" }), _jsx("th", { className: ui.thUpper, children: "SINCE" }), _jsx("th", { className: ui.thUpper, children: "SEVERITY" }), _jsx("th", { className: ui.thUpper, children: "NOTE" }), _jsx("th", { className: ui.thSticky })] }) }), _jsx("tbody", { children: rows.map((r) => {
                                const isRowActive = activeRowId === r.id;
                                return (_jsxs("tr", { className: ui.tbodyRowInteractive, onClick: () => setActiveRowId(isRowActive ? null : r.id), children: [_jsx("td", { className: ui.tdPlain, children: _jsx("span", { className: ui.symptomName, children: r.name }) }), _jsx("td", { className: ui.tdPlain, onClick: (ev) => ev.stopPropagation(), children: _jsx(SymptomSurfacePicker, { surfaces: r.surfaces, arch: state.selectedTooth.arch, toothPosition: state.selectedTooth.position, onChange: (next) => updateRow(r.id, { surfaces: next }) }, r.id) }), _jsx("td", { className: ui.tdPlain, children: _jsx("input", { type: "text", value: r.since, onChange: (e) => updateRow(r.id, { since: e.target.value }), placeholder: "e.g. 5 days", className: ui.symptomField }) }), _jsx("td", { className: ui.tdPlain, children: _jsxs("select", { value: r.severity, onChange: (e) => updateRow(r.id, { severity: e.target.value }), className: clsx(ui.symptomSelect, r.severity ? ui.symptomSelectFilled : ui.symptomSelectEmpty), children: [_jsx("option", { value: "", className: ui.optionMuted, children: "e.g. Moderate" }), _jsx("option", { value: "Mild", children: "Mild" }), _jsx("option", { value: "Moderate", children: "Moderate" }), _jsx("option", { value: "Severe", children: "Severe" })] }) }), _jsx("td", { className: ui.tdPlain, children: _jsx("input", { type: "text", value: r.note, onChange: (e) => updateRow(r.id, { note: e.target.value }), placeholder: "e.g. Worsens at night", className: ui.symptomField }) }), _jsx("td", { className: ui.tdStickyAct, children: _jsx("button", { type: "button", onClick: (ev) => { ev.stopPropagation(); removeRow(r.id); }, title: "Remove", className: ui.removeRowBtn, children: _jsx(Trash, { size: 20, color: "currentColor", strokeWidth: 1.5, variant: "Linear" }) }) })] }, r.id));
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
    const { wrapRef, showEdge } = useStickyActionEdge(0);
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
    // Diagnoses on THIS tooth that were applied across a whole scope (e.g. RCT
    // on all of Mandibular). Such rows are read-only here and badged with the
    // scope, because editing one tooth would desync the group.
    const isGroupedScopeView = state.selectionScopeType === "quadrant" || state.selectionScopeType === "full-mouth" || state.selectionScopeType === "arch";
    // Diagnosis chips that can't apply to the current tooth (e.g. RCT/Crown on a
    // Missing/Extracted tooth) are disabled rather than silently reclassifying.
    const disabledDiags = getDisabledDiagnoses(state.currentToothDiagnoses instanceof Set ? state.currentToothDiagnoses : new Set(state.currentToothDiagnoses || []));
    const groupedDiag = useMemo(() => {
        const map = new Map();
        // In the scope view itself the doctor SHOULD edit the group, so only
        // lock+badge grouped diagnoses when drilled into a single tooth.
        if (isGroupedScopeView) return map;
        const curFdi = state.selectedTooth?.fdi;
        const byName = {};
        Object.entries(state.toothDiagnoses || {}).forEach(([fdi, set]) => {
            const arr = set instanceof Set ? [...set] : (set || []);
            arr.forEach((d) => { (byName[d] = byName[d] || []).push(fdi); });
        });
        const implant = state.implantTeeth instanceof Set ? state.implantTeeth : new Set(state.implantTeeth || []);
        implant.forEach((f) => { (byName["Implant"] = byName["Implant"] || []).push(f); });
        Object.entries(byName).forEach(([name, fdis]) => {
            const uniq = [...new Set(fdis)];
            if (uniq.length < 2 || !uniq.includes(curFdi)) return;
            const scope = scopeForFdis(uniq, state.patientType);
            if (scope) map.set(name, scope.label);
        });
        return map;
    }, [isGroupedScopeView, state.toothDiagnoses, state.implantTeeth, state.selectedTooth, state.patientType]);
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
    // Conflict guard: a "terminal" diagnosis (Missing / Extraction) means the
    // tooth is gone, so applying it wipes every other record. If the tooth
    // already carries data we hold the action behind a confirm dialog.
    const [pendingTerminal, setPendingTerminal] = useState(null);
    const curDiagSet = state.currentToothDiagnoses instanceof Set ? state.currentToothDiagnoses : new Set(state.currentToothDiagnoses || []);
    const conflictToothLabel = state.selectedTooth
        ? `${QUADRANT_LABELS[state.selectedTooth.quadrant] ?? ""} ${state.selectedTooth.name} (T${state.selectedTooth.fdi})`.trim()
        : "This tooth";
    // Human-readable list of what applying `name` would discard.
    const describeExistingData = (name) => {
        const parts = [];
        [...curDiagSet].filter((d) => d !== name).forEach((d) => parts.push(d));
        if (state.isImplant && name !== "Implant") parts.push("Implant");
        const findingCount = Array.isArray(state.findings) ? state.findings.length : 0;
        if (findingCount > 0) parts.push(`${findingCount} surface finding${findingCount > 1 ? "s" : ""}`);
        const procCount = Array.isArray(state.currentToothEntries) ? state.currentToothEntries.length : 0;
        if (procCount > 0) parts.push(`${procCount} procedure${procCount > 1 ? "s" : ""}`);
        if ((state.currentToothNotes || "").trim()) parts.push("notes");
        return parts;
    };
    const performAddDiagnosis = (name) => {
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
    // Wipe every record on the tooth, then set only the terminal diagnosis, so a
    // "Missing"/"Extraction" tooth is left clean (no orphan treatment-history
    // rows, findings, procedures or notes).
    const applyTerminalCleanly = (name) => {
        state.onClearTreatmentHistoryDetails?.();
        (state.currentToothEntries || []).forEach((e) => state.onRemoveEntry?.(e.id));
        state.onUpdateToothNotes?.("");
        performAddDiagnosis(name);
    };
    const addDiagnosis = (name) => {
        // Terminal diagnosis on a tooth that already has data → confirm first,
        // since applying it removes all of that existing data.
        if (isTerminalDiagnosis(name) && !curDiagSet.has(name)) {
            const existing = describeExistingData(name);
            if (existing.length > 0) {
                setPendingTerminal({ name, existing });
                setQuery("");
                setSearchOpen(false);
                return;
            }
        }
        performAddDiagnosis(name);
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
    return (_jsxs("div", { "data-rx-module-root": true, className: ui.entryRoot, children: [_jsx(TPConfirmDialog, { open: !!pendingTerminal, onOpenChange: (o) => { if (!o) setPendingTerminal(null); }, title: `Are you sure you want to mark as ${pendingTerminal?.name}?`, warning: `${conflictToothLabel} already has ${(pendingTerminal?.existing ?? []).join(", ")}. Marking it as ${pendingTerminal?.name} will remove all existing data for this tooth. This action cannot be undone.`, secondaryLabel: `Yes, Mark as ${pendingTerminal?.name}`, secondaryTone: "destructive", onSecondary: () => { const n = pendingTerminal?.name; setPendingTerminal(null); if (n) applyTerminalCleanly(n); }, primaryLabel: "No, Keep It" }), displayRows.length > 0 && (_jsx("div", { ref: wrapRef, className: clsx(ui.tableWrap, showEdge && ui.scrolledEdge), children: _jsxs("table", { className: ui.table, children: [_jsxs("colgroup", { children: [_jsx("col", { style: { width: 36, minWidth: 36 } }), _jsx("col", { style: { minWidth: 120 } }), _jsx("col", { style: { width: 140, minWidth: 120 } }), _jsx("col", { style: { width: 140, minWidth: 120 } }), _jsx("col", { style: { minWidth: 140 } }), _jsx("col", { style: { width: 44, minWidth: 44, maxWidth: 44 } })] }), _jsx("thead", { children: _jsxs("tr", { className: ui.theadRow, children: [_jsx("th", { className: ui.thCenter }), _jsx("th", { className: ui.th, children: "NAME" }), _jsx("th", { className: ui.th, children: "SURFACES" }), _jsx("th", { className: ui.th, children: "SINCE" }), _jsx("th", { className: ui.th, children: "NOTE" }), _jsx("th", { className: ui.thSticky })] }) }), _jsx("tbody", { children: displayRows.map((name) => { const isOrphanHistoryRow = !activeRows.includes(name);
                                const color = PRIMARY_DIAG_COLOR[name] ?? "#4b4ad5";
                                const d = state.currentTreatmentHistoryDetails[name] ?? { since: "", note: "", surfaces: [] };
                                const groupScope = groupedDiag.get(name);
                                const lockStyle = groupScope ? { pointerEvents: "none", opacity: 0.6 } : undefined;
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
                                        state.onSetHighlightZones([]); }, className: ui.tbodyRow, children: [isOrphanHistoryRow ? _jsx("td", { className: clsx(ui.td, ui.tdGrip), "aria-hidden": true }) : _jsx("td", { className: clsx(ui.td, ui.tdGrip), children: _jsx("span", { className: ui.gripIcon, children: _jsxs("svg", { width: "8", height: "16", viewBox: "0 0 8 16", fill: "currentColor", children: [_jsx("circle", { cx: "2", cy: "3", r: "1.2" }), _jsx("circle", { cx: "2", cy: "8", r: "1.2" }), _jsx("circle", { cx: "2", cy: "13", r: "1.2" }), _jsx("circle", { cx: "6", cy: "3", r: "1.2" }), _jsx("circle", { cx: "6", cy: "8", r: "1.2" }), _jsx("circle", { cx: "6", cy: "13", r: "1.2" })] }) }) }), isOrphanHistoryRow ? _jsx("td", { className: ui.tdPlain, children: _jsx("span", { className: ui.symptomName, children: name }) }) : _jsx("td", { className: ui.tdPlain, children: _jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }, children: [_jsx(DiagnosisNameCell, { name: name, color: color, activeRows: activeRows, onSwap: (next) => {
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
                                                } }), groupScope && _jsxs("span", { title: `Added via ${groupScope} — manage it from the ${groupScope} scope view`, style: { fontSize: 10.5, fontWeight: 700, color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 5, padding: "1px 6px", whiteSpace: "nowrap", cursor: "help" }, children: ["· ", groupScope] })] }) }), _jsxs("td", { className: clsx(ui.td, ui.tdRel, isSurfaceActive && ui.tdActive), style: lockStyle, onClick: (ev) => ev.stopPropagation(), children: [isSurfaceActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsx(SurfaceCellDropdown, { entry: { id: name, toothFdi: state.selectedTooth.fdi, kind: "procedure", name, surfaces: d.surfaces ?? [] }, arch: state.selectedTooth.arch, toothPosition: state.selectedTooth.position, mode: "treatment", isActive: isSurfaceActive, onActivate: activateSurfaceCell, onDeactivate: () => {
                                                        if (state.selectedZone === "whole")
                                                            state.onClearSelectedZone();
                                                        clearCellActive(name, "surfaces");
                                                    }, onToggleZone: state.onToggleZoneMultiSelect, onHover: state.onSetHighlightZones, multiSelectZones: state.multiSelectZones })] }), _jsxs("td", { className: clsx(ui.td, ui.tdRel, isSinceActive && ui.tdActive), style: lockStyle, children: [isSinceActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsx(SinceDropdown, { value: d.since ?? "", onChange: (v) => state.onUpdateTreatmentHistoryDetail(name, { since: v }), autoOpen: lastAddedName === name, onFocusActivate: () => setActiveCell({ rowId: name, colKey: "since" }), onBlurDeactivate: () => clearCellActive(name, "since") })] }), _jsxs("td", { className: clsx(ui.td, ui.tdRel, isNoteActive ? ui.tdActive : ui.tdHover), style: lockStyle, children: [isNoteActive ? _jsx("span", { className: ui.cellFocusRing }) : null, _jsx("input", { type: "text", value: d.note ?? "", onChange: (e) => state.onUpdateTreatmentHistoryDetail(name, { note: e.target.value }), onFocus: () => setActiveCell({ rowId: name, colKey: "note" }), onBlur: () => clearCellActive(name, "note"), placeholder: "e.g. Monitor at next visit", className: ui.primaryNoteInput })] }), _jsx("td", { className: ui.tdStickyAct, children: _jsx("button", { type: "button", onClick: () => { if (!groupScope) removeRow(name); }, disabled: Boolean(groupScope), title: groupScope ? `Managed via ${groupScope}` : "Remove", className: ui.removeRowBtn, style: groupScope ? { opacity: 0.35, cursor: "not-allowed" } : undefined, children: _jsx(Trash, { size: 20, color: "currentColor", strokeWidth: 1.5, variant: "Linear" }) }) })] }, name));
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
                            const chipDisabled = disabledDiags.has(chip);
                            return (_jsx("button", { type: "button", disabled: chipDisabled, onClick: () => { if (!chipDisabled) addDiagnosis(chip); }, title: chipDisabled ? "Not applicable — tooth is marked Missing/Extraction. Remove that first." : undefined, className: ui.chipBtn, style: chipDisabled ? { opacity: 0.4, cursor: "not-allowed" } : undefined, children: chip }, chip));
                        }) }))] })] }));
}
