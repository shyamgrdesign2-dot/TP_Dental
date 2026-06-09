"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Calendar2, Notepad2 } from "iconsax-reactjs";
import { Building2 } from "lucide-react";
import { ToothIcon } from "@/components/dental/ToothIcon";
import { TPMedicalIcon } from "@/components/tp-ui";
import rx from "./RxPreviewDocument.module.scss";
import { getAppointmentPatient } from "@/lib/appointment-patients";
import { FlatDentitionChart, OralExamReport } from "@/components/dental/examination/FlatDentitionChart";
function renderMeta(metaParts) {
    if (metaParts.length === 0)
        return null;
    return (_jsxs("span", { className: rx.metaMuted, children: [" (", metaParts.map((part, index) => (_jsxs("span", { children: [index > 0 ? _jsx("span", { className: rx.metaSep, children: " | " }) : null, part] }, `${part}-${index}`))), ")"] }));
}
// Renders a section's rows in the chosen print variant: "list" (bulleted),
// "inline" (comma-joined on one line), or "table" (Name | Details columns).
function SectionRows({ rows, view, kp }) {
    if (view === "inline") {
        return (_jsx("p", { style: { margin: 0, fontSize: 11.5, color: "#475569", lineHeight: 1.5 }, children: rows.map((row, index) => (_jsxs("span", { children: [index > 0 ? ", " : "", _jsx("span", { style: { fontWeight: 600, color: "#334155" }, children: row.title }), renderMeta(row.metaParts)] }, `${kp}-${index}`))) }));
    }
    if (view === "table") {
        return (_jsx("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 11.5, fontFamily: "Inter, sans-serif" }, children: _jsx("tbody", { children: rows.map((row, index) => (_jsxs("tr", { style: { borderTop: "1px solid #f1f5f9" }, children: [_jsx("td", { style: { padding: "4px 10px 4px 0", fontWeight: 600, color: "#334155", verticalAlign: "top", width: "42%" }, children: row.title }), _jsx("td", { style: { padding: "4px 0", color: "#475569", verticalAlign: "top" }, children: row.metaParts.length ? row.metaParts.join(" | ") : "—" })] }, `${kp}-${index}`))) }) }));
    }
    return (_jsx("ul", { className: rx.list, children: rows.map((row, index) => (_jsxs("li", { className: rx.listLi, children: [_jsx("span", { className: rx.rowTitle, children: row.title }), renderMeta(row.metaParts)] }, `${kp}-${index}`))) }));
}
function SectionList({ title, rows, icon, view = "list" }) {
    if (!rows.length)
        return null;
    return (_jsxs("section", { className: rx.section, children: [_jsxs("div", { className: rx.sectionHead, children: [icon ? _jsx("span", { className: rx.icon14, children: icon }) : null, _jsx("h3", { className: rx.sectionTitle, children: title })] }), _jsx(SectionRows, { rows: rows, view: view, kp: title })] }));
}
function RxMedicalSectionIcon({ name }) {
    return _jsx(TPMedicalIcon, { name: name, variant: "bulk", size: 14, color: "var(--tp-slate-500)", className: rx.medIcon14 });
}
// --- Dental Examination, split into header + per-tooth nodes so the section can
// flow across A4 pages (one tooth per paginatable block) instead of being clipped.
const DENTAL_DL = { margin: 0, fontSize: 11.5, color: "#475569", display: "flex", gap: 5, alignItems: "baseline", lineHeight: 1.4 };
function dentalSub(label, items, kp) {
    return _jsxs("div", { children: [
        _jsxs("p", { style: DENTAL_DL, children: [_jsx("span", { style: { color: "#cbd5e1" }, children: "•" }), _jsx("span", { style: { fontWeight: 600, color: "#334155" }, children: label })] }),
        _jsx("div", { style: { paddingLeft: 14, display: "flex", flexDirection: "column", gap: 1, marginTop: 1 }, children: items.map((item, i) => (_jsxs("p", { style: DENTAL_DL, children: [_jsx("span", { style: { color: "#94a3b8" }, children: "•" }), _jsxs("span", { children: [_jsx("span", { style: { fontWeight: 600, color: "#334155" }, children: item.title }), renderMeta(item.metaParts)] })] }, `${kp}-${i}`))) }),
    ] });
}
// Per-tooth "(date)" annotation removed — the printed Rx and the Dental
// History card now render only the tooth label, regardless of whether
// the entry comes from the current visit or historical data.
function dentalToothListNode(block) {
    const toothLabel = block?.toothLabel || "";
    return _jsxs("div", { children: [
        _jsxs("p", { style: { margin: 0, fontSize: 12, fontWeight: 700, color: "#1e293b", display: "flex", gap: 6, alignItems: "baseline" }, children: [_jsx("span", { style: { color: "#1e293b" }, children: "•" }), toothLabel] }),
        _jsxs("div", { style: { paddingLeft: 14, display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }, children: [
            block.treatmentHistory.length ? dentalSub("Past Procedures", block.treatmentHistory, "th") : null,
            block.findings.length ? dentalSub("Findings", block.findings, "fd") : null,
            block.procedures.length ? dentalSub("Procedures", block.procedures, "pr") : null,
            block.overallToothNote ? (_jsxs("div", { children: [_jsxs("p", { style: DENTAL_DL, children: [_jsx("span", { style: { color: "#cbd5e1" }, children: "•" }), _jsx("span", { style: { fontWeight: 600, color: "#334155" }, children: "Overall Tooth Notes" })] }), _jsx("div", { style: { paddingLeft: 14, marginTop: 1 }, children: _jsxs("p", { style: DENTAL_DL, children: [_jsx("span", { style: { color: "#94a3b8" }, children: "•" }), _jsx("span", { children: block.overallToothNote })] }) })] })) : null,
        ] }),
    ] });
}
function dentalToothInlineNode(block) {
    // Each item: name + optional (metaparts). Item titles stay slate-700 so the
    // doctor's eye lands on the procedure/finding name; metadata is slate-500.
    const fmtItems = (items) => items.map((it) => it.title + (it.metaParts.length ? ` (${it.metaParts.join(" | ")})` : "")).join(", ");
    // Build a list of {label, items} segments, then render each label as a bold
    // slate-900 span (was: plain string joined with "; ", which inherited the
    // paragraph's slate-600 colour and made labels disappear into the body).
    const segs = [
        { label: "Past Procedures", text: block.treatmentHistory.length ? fmtItems(block.treatmentHistory) : null },
        { label: "Findings",        text: block.findings.length          ? fmtItems(block.findings)          : null },
        { label: "Procedures",      text: block.procedures.length        ? fmtItems(block.procedures)        : null },
        { label: "Notes",           text: block.overallToothNote || null },
    ].filter((s) => s.text);
    const toothLabel = block?.toothLabel || "";
    return _jsxs("p", { style: { margin: 0, fontSize: 11.5, color: "#334155", lineHeight: 1.45 }, children: [
        _jsx("span", { style: { fontWeight: 700, color: "#0f172a" }, children: `${toothLabel}:` }),
        " ",
        ...segs.flatMap((s, i) => [
            i > 0 ? _jsx("span", { style: { color: "#94a3b8" }, children: "; " }, `sep-${i}`) : null,
            _jsxs("span", { children: [
                _jsxs("span", { style: { fontWeight: 700, color: "#1e293b" }, children: [s.label, ":"] }),
                " ",
                s.text,
            ] }, `seg-${i}`),
        ].filter(Boolean)),
    ] });
}
// Resolve a preview line into table columns. Prefers structured `cols`; falls
// back to positional metaParts ([surfaces, since, ...note]) for older snapshots.
function lineCols(row) {
    if (row.cols) return { surfaces: row.cols.surfaces || "", since: row.cols.since || "", note: row.cols.note || "" };
    const m = row.metaParts || [];
    return { surfaces: m[0] || "", since: m[1] || "", note: m.slice(2).join(" · ") };
}
// One tooth rendered as a self-contained nested table (TP design system styling):
// a grey tooth header, then a Past Procedures / Findings / Procedures sub-table
// each with Name | Surfaces | Since | Notes columns, then overall notes.
function dentalToothTableNode(block) {
    const wrap = { border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden", fontFamily: "Inter, sans-serif", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" };
    const toothHead = { background: "#eef2f7", padding: "6px 10px", fontSize: 11, fontWeight: 700, color: "#1e293b", borderBottom: "1px solid #e2e8f0" };
    const catSection = { borderTop: "1px solid #dde3ec" };
    const catLabel = { padding: "5px 10px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b", background: "#eef1f5", borderBottom: "1px solid #e2e8f0" };
    const tbl = { width: "100%", borderCollapse: "collapse", tableLayout: "fixed" };
    const th = { textAlign: "left", padding: "3px 8px", fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", color: "#94a3b8", background: "#f7f9fb", borderBottom: "1px solid #e6ebf1" };
    const td = { padding: "4px 8px", fontSize: 10, color: "#475569", verticalAlign: "top", borderTop: "1px solid #e6ebf1", wordBreak: "break-word" };
    const tdName = { ...td, fontWeight: 600, color: "#334155" };
    const colW = ["30%", "22%", "18%", "30%"];
    const catTable = (label, rows) => rows.length ? (_jsxs("div", { style: catSection, children: [
        _jsx("div", { style: catLabel, children: label }),
        _jsxs("table", { style: tbl, children: [
            _jsx("thead", { children: _jsx("tr", { children: ["Name", "Surfaces", "Since", "Notes"].map((t, ci) => _jsx("th", { style: { ...th, width: colW[ci] }, children: t }, t)) }) }),
            _jsx("tbody", { children: rows.map((r, ri) => { const c = lineCols(r); return (_jsxs("tr", { children: [_jsx("td", { style: tdName, children: r.title }), _jsx("td", { style: td, children: c.surfaces || "—" }), _jsx("td", { style: td, children: c.since || "—" }), _jsx("td", { style: td, children: c.note || "—" })] }, ri)); }) }),
        ] }),
    ] })) : null;
    return _jsxs("div", { style: wrap, children: [
        _jsx("div", { style: toothHead, children: block?.toothLabel || "" }),
        catTable("Past Procedures", block.treatmentHistory),
        catTable("Findings", block.findings),
        catTable("Procedures", block.procedures),
        block.overallToothNote ? (_jsxs("div", { style: catSection, children: [_jsx("div", { style: catLabel, children: "Overall Tooth Notes" }), _jsx("div", { style: { padding: "5px 10px", fontSize: 10, color: "#475569" }, children: block.overallToothNote })] })) : null,
    ] });
}
// ──────────────────────────────────────────────────────────────────────
// "By Type" rendering — same dental data pivoted so the heading is the
// CATEGORY (Past Procedures / Findings / Procedures / Overall Teeth
// Notes) and the rows underneath are the teeth that have that kind.
// Mirrors the three views (list / inline / table) so toggling Group By
// stays consistent with whichever Layout is selected.
// ──────────────────────────────────────────────────────────────────────

// Pull the FDI number out of "Upper Right First Molar (T16)" so we can
// sort by-type rows in FDI order (consistent with the chart order).
function extractFdi(label) {
    const m = (label || "").match(/T(\d+)/);
    return m ? parseInt(m[1], 10) : 9999;
}

// Build the four category buckets from the dental blocks, sorted by FDI.
// Each bucket: { key, label, toothRows: [{ tooth, fdi, items }] }
// `items` is an array of { title, metaParts, cols }. For the notes
// bucket we synthesise a single-item array carrying the note text as the
// title so the renderer can stay uniform.
function buildByTypeBuckets(dentalBlocks) {
    const sorted = [...dentalBlocks].sort((a, b) => extractFdi(a.toothLabel) - extractFdi(b.toothLabel));
    const buckets = [
        { key: "past",       label: "Past Procedures",    get: (b) => b.treatmentHistory || [],                                         isNote: false },
        { key: "findings",   label: "Findings",           get: (b) => b.findings || [],                                                 isNote: false },
        { key: "procedures", label: "Procedures",         get: (b) => b.procedures || [],                                               isNote: false },
        { key: "notes",      label: "Overall Teeth Notes", get: (b) => (b.overallToothNote && b.overallToothNote.trim() ? [{ title: b.overallToothNote, metaParts: [], cols: { surfaces: "", since: "", note: "" } }] : []), isNote: true },
    ];
    return buckets.map((bk) => {
        const toothRows = sorted
            .map((block) => {
                const items = bk.get(block);
                if (!items.length) return null;
                return { tooth: block?.toothLabel || "", fdi: extractFdi(block.toothLabel), items };
            })
            .filter(Boolean);
        return { ...bk, toothRows };
    }).filter((bk) => bk.toothRows.length > 0);
}

function byTypeListNode(bucket) {
    return _jsxs("div", { children: [
        _jsxs("p", { style: { margin: 0, fontSize: 12, fontWeight: 700, color: "#1e293b", display: "flex", gap: 6, alignItems: "baseline" }, children: [_jsx("span", { style: { color: "#1e293b" }, children: "•" }), bucket.label] }),
        _jsx("div", { style: { paddingLeft: 14, display: "flex", flexDirection: "column", gap: 3, marginTop: 2 }, children: bucket.toothRows.map((tr, ti) => (_jsxs("div", { children: [
            _jsxs("p", { style: DENTAL_DL, children: [_jsx("span", { style: { color: "#cbd5e1" }, children: "•" }), _jsx("span", { style: { fontWeight: 600, color: "#334155" }, children: `${tr.tooth}:` })] }),
            _jsx("div", { style: { paddingLeft: 14, marginTop: 1, display: "flex", flexDirection: "column", gap: 1 }, children: tr.items.map((it, ii) => (_jsxs("p", { style: DENTAL_DL, children: [
                _jsx("span", { style: { color: "#94a3b8" }, children: "•" }),
                _jsxs("span", { children: [
                    bucket.isNote ? null : _jsx("span", { style: { fontWeight: 600, color: "#334155" }, children: it.title }),
                    bucket.isNote ? _jsx("span", { children: it.title }) : renderMeta(it.metaParts),
                ] }),
            ] }, `${bucket.key}-${ti}-${ii}`))) }),
        ] }, `${bucket.key}-${ti}`))) }),
    ] });
}

function byTypeInlineNode(bucket) {
    const fmtItems = (items) => items.map((it) => bucket.isNote ? it.title : it.title + (it.metaParts.length ? ` (${it.metaParts.join(" | ")})` : "")).join(", ");
    return _jsxs("p", { style: { margin: 0, fontSize: 11.5, color: "#334155", lineHeight: 1.45 }, children: [
        _jsxs("span", { style: { fontWeight: 700, color: "#0f172a" }, children: [bucket.label, ":"] }),
        " ",
        ...bucket.toothRows.flatMap((tr, i) => [
            i > 0 ? _jsx("span", { style: { color: "#94a3b8" }, children: "; " }, `sep-${bucket.key}-${i}`) : null,
            _jsxs("span", { children: [
                _jsxs("span", { style: { fontWeight: 700, color: "#1e293b" }, children: [tr.tooth, ":"] }),
                " ",
                fmtItems(tr.items),
            ] }, `seg-${bucket.key}-${i}`),
        ].filter(Boolean)),
    ] });
}

function byTypeTableNode(bucket) {
    const wrap = { border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden", fontFamily: "Inter, sans-serif", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" };
    const head = { background: "#eef2f7", padding: "6px 10px", fontSize: 11, fontWeight: 700, color: "#1e293b", borderBottom: "1px solid #e2e8f0" };
    const tbl = { width: "100%", borderCollapse: "collapse", tableLayout: "fixed" };
    const th = { textAlign: "left", padding: "3px 8px", fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", color: "#94a3b8", background: "#f7f9fb", borderBottom: "1px solid #e6ebf1" };
    const td = { padding: "4px 8px", fontSize: 10, color: "#475569", verticalAlign: "top", borderTop: "1px solid #e6ebf1", wordBreak: "break-word" };
    const tdName = { ...td, fontWeight: 600, color: "#334155" };
    // Build one row per item, prefixed by tooth label. Notes use a 2-col
    // layout (Tooth | Note); the other buckets keep the same 4-col shape
    // as the by-tooth table so column widths read as familiar.
    if (bucket.isNote) {
        const rows = bucket.toothRows.flatMap((tr) => tr.items.map((it) => ({ tooth: tr.tooth, note: it.title })));
        return _jsxs("div", { style: wrap, children: [
            _jsx("div", { style: head, children: bucket.label }),
            _jsxs("table", { style: tbl, children: [
                _jsx("colgroup", { children: [_jsx("col", { style: { width: "34%" } }, "c0"), _jsx("col", { style: { width: "66%" } }, "c1")] }),
                _jsx("thead", { children: _jsx("tr", { children: ["Tooth", "Note"].map((t) => _jsx("th", { style: th, children: t }, t)) }) }),
                _jsx("tbody", { children: rows.map((r, ri) => (_jsxs("tr", { children: [_jsx("td", { style: tdName, children: r.tooth }), _jsx("td", { style: td, children: r.note || "—" })] }, ri))) }),
            ] }),
        ] });
    }
    const rows = bucket.toothRows.flatMap((tr) => tr.items.map((it) => ({ tooth: tr.tooth, item: it })));
    return _jsxs("div", { style: wrap, children: [
        _jsx("div", { style: head, children: bucket.label }),
        _jsxs("table", { style: tbl, children: [
            _jsx("colgroup", { children: ["28%", "26%", "16%", "12%", "18%"].map((w, i) => _jsx("col", { style: { width: w } }, `c${i}`)) }),
            _jsx("thead", { children: _jsx("tr", { children: ["Tooth", "Name", "Surfaces", "Since", "Notes"].map((t) => _jsx("th", { style: th, children: t }, t)) }) }),
            _jsx("tbody", { children: rows.map((r, ri) => { const c = lineCols(r.item); return (_jsxs("tr", { children: [
                _jsx("td", { style: tdName, children: r.tooth }),
                _jsx("td", { style: tdName, children: r.item.title }),
                _jsx("td", { style: td, children: c.surfaces || "—" }),
                _jsx("td", { style: td, children: c.since || "—" }),
                _jsx("td", { style: td, children: c.note || "—" }),
            ] }, ri)); }) }),
        ] }),
    ] });
}

// "Dental Examination" section heading — date suffix removed; the
// section reads as just the title now. (The snapshot argument is kept
// for API symmetry in case future variants want to append a derived
// label, but is no longer referenced.)
function dentalHeaderNode(_snapshot, titleSuffix) {
    return _jsxs("h3", { style: { fontSize: 12, fontWeight: 700, color: "#334155", margin: "0 0 6px", fontFamily: "Inter, sans-serif" }, children: [
        "Dental Examination",
        titleSuffix ? ` ${titleSuffix}` : "",
    ].filter(Boolean) });
}
// Flows content blocks across as many A4 sheets as needed. Heights are MEASURED
// from a hidden replica sheet (not estimated) so the true body capacity and each
// block's real rendered height are known. Blocks are packed so overflow (e.g. the
// dental chart) moves onto a fresh sheet rather than being clipped by the fixed
// A4 aspect-ratio + overflow:hidden. Every page repeats letterhead, patient & footer.
function packBlocks(heights, capacity, gap) {
    const pages = [];
    let cur = [];
    let h = 0;
    for (let i = 0; i < heights.length; i++) {
        const bh = heights[i];
        const add = (cur.length ? gap : 0) + bh;
        if (cur.length && h + add > capacity) { pages.push(cur); cur = []; h = 0; }
        cur.push(i);
        h += (cur.length > 1 ? gap : 0) + bh;
    }
    if (cur.length) pages.push(cur);
    if (!pages.length) pages.push([]);
    return pages;
}
function PaginatedRx({ blocks, renderHead, renderPatient, renderFoot }) {
    const measureRef = useRef(null);
    const bodyRef = useRef(null);
    const [pages, setPages] = useState(() => [blocks.map((_, i) => i)]);
    // Recompute whenever the set/order of blocks changes.
    const sig = blocks.map((b) => b.key).join("|");
    // Re-seed pages synchronously when blocks change so we never render with
    // stale indices that point past the new blocks array (e.g. toggling
    // showDentalChart off removes the chart block but old pages still ref it).
    // Render-phase setState is safe when conditional — React rebases.
    const lastSigRef = useRef(sig);
    let effectivePages = pages;
    if (lastSigRef.current !== sig) {
        lastSigRef.current = sig;
        effectivePages = [blocks.map((_, i) => i)];
        setPages(effectivePages);
    }
    useLayoutEffect(() => {
        const mc = measureRef.current;
        const body = bodyRef.current;
        if (!mc || !body) return;
        const recompute = () => {
            const cs = getComputedStyle(body);
            const padTop = parseFloat(cs.paddingTop) || 0;
            const padBottom = parseFloat(cs.paddingBottom) || 0;
            const capacity = body.clientHeight - padTop - padBottom;
            if (capacity <= 0) return;
            const heights = Array.from(mc.children).map((el) => el.getBoundingClientRect().height);
            if (!heights.length) return;
            const next = packBlocks(heights, capacity, 10);
            setPages((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
        };
        recompute();
        // Async content (dental chart images, oral report from localStorage) can
        // change height after first paint — re-pack when the measured stack resizes.
        let ro = null;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(recompute);
            ro.observe(mc);
            ro.observe(body);
        }
        window.addEventListener("resize", recompute);
        return () => { ro?.disconnect(); window.removeEventListener("resize", recompute); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sig]);
    return (_jsxs(_Fragment, { children: [
        // Hidden replica sheet — gives true body capacity + per-block heights at the
        // real content width, without ever being visible (position:absolute + hidden).
        _jsx("div", { "aria-hidden": true, style: { position: "absolute", top: 0, left: 0, width: "100%", visibility: "hidden", pointerEvents: "none", zIndex: -1 }, children: _jsxs("article", { className: rx.sheet, children: [renderHead(), renderPatient(), _jsx("div", { ref: bodyRef, className: rx.sheetBody, children: _jsx("div", { ref: measureRef, className: rx.contentStack, children: blocks.map((b) => _jsx("div", { children: b.node }, b.key)) }) }), renderFoot()] }) }),
        ...effectivePages.map((idxs, p) => (_jsxs("article", { className: rx.sheet, children: [renderHead(), renderPatient(), _jsx("div", { className: rx.sheetBody, children: _jsx("div", { className: rx.contentStack, children: idxs.filter((i) => blocks[i]).map((i) => _jsx("div", { children: blocks[i].node }, blocks[i].key)) }) }), renderFoot()] }, `pg-${p}`))),
    ] }));
}
export function RxPreviewDocument({ snapshot, extraNotes, settings, }) {
    const view = settings?.view || "list";
    const showDentalChart = settings?.showDentalChart !== false;
    // Plain mode (used by the dental-chart print button) renders the odontogram
    // with NO recorded data — a blank template. We force an empty chart object
    // through to FlatDentitionChart and skip the oral section entirely.
    const chartOverride = settings?.chartOverride;
    const hideOral = settings?.hideOral === true;
    // When `includeHistorical` is on, the print should merge past-visit dental
    // + oral records with the current consultation. The flag is read here so
    // it propagates through the existing snapshot / chart props; the actual
    // historical-visit merge lives in `rx-preview-composer` (TODO: implement
    // once a past-visits data source is available). The print preview already
    // surfaces the toggle state via the inline "Including historical data"
    // pill rendered by EndVisitPage.
    void settings?.includeHistorical;
    /**
     * When `extraNotes` is passed, fold it into the Additional Notes body so the
     * quick-visit consultation narrative renders inside the Rx itself (instead of
     * as a sibling panel above it). Keeps the preview to a single Rx document.
     */
    const mergedAdditionalNotes = (() => {
        const fromSnapshot = String(snapshot?.additionalNotes ?? "").trim();
        const fromExtra = String(extraNotes ?? "").trim();
        if (fromSnapshot && fromExtra) return `${fromExtra}\n\n${fromSnapshot}`;
        return fromSnapshot || fromExtra || "";
    })();
    const dentalBlocks = snapshot?.dentalExamination ?? [];
    const renderLetterhead = () => (_jsxs(_Fragment, { children: [_jsx("header", { className: rx.letterhead, children: _jsx("div", { className: rx.letterRow, children: _jsxs("div", { className: rx.letterLeft, children: [_jsx("div", { className: rx.logoBox, children: _jsx(Building2, { size: 32, className: rx.buildingIcon, strokeWidth: 1.8 }) }), _jsxs("div", { children: [_jsx("p", { className: rx.clinicName, children: "TP Dental Care" }), _jsx("p", { className: rx.docLine, children: "Dr. Umesh Aggarwal, BDS, MDS" }), _jsx("p", { className: rx.metaLine, children: "Reg. ID: DCI-2342342 | +91 78945 61230" }), _jsx("p", { className: rx.metaLine, children: "K9 Sardar Bungalow, Prahladnagar, Ahmedabad" })] })] }) }) }), _jsx("div", { className: rx.rule })] }));
    const renderPatientDetails = () => {
        const pid = snapshot?.patientId ?? "apt-1";
        const ap = getAppointmentPatient(pid);
        return (_jsxs(_Fragment, { children: [_jsx("section", { className: rx.patientSection, children: _jsxs("div", { className: rx.patientRow, children: [_jsxs("div", { className: rx.patientCol, children: [_jsxs("p", { className: rx.patientLine, children: [_jsx("span", { className: rx.patientStrong, children: "Patient Name:" }), " ", ap.name] }), _jsxs("p", { className: rx.patientLine, children: [_jsx("span", { className: rx.patientStrong, children: "Age/Gender:" }), " ", ap.age, " Years, ", ap.genderLabel] }), _jsxs("p", { className: rx.patientLine, children: [_jsx("span", { className: rx.patientStrong, children: "Height/Weight:" }), " —"] }), _jsxs("p", { className: rx.patientLine, children: [_jsx("span", { className: rx.patientStrong, children: "Address:" }), " Prahladnagar, Ahmedabad"] })] }), _jsxs("div", { className: rx.patientRight, children: [_jsxs("p", { className: rx.patientLine, children: [_jsx("span", { className: rx.patientStrong, children: "Patient ID:" }), " ", ap.patientCode] }), _jsxs("p", { className: rx.patientLine, children: [_jsx("span", { className: rx.patientStrong, children: "Mobile:" }), " ", ap.mobile.replace(/^\+91-/, "")] }), _jsxs("p", { className: rx.patientLine, children: [_jsx("span", { className: rx.patientStrong, children: "Blood Group:" }), " ", ap.bloodGroup] })] })] }) }), _jsx("div", { className: rx.rule })] }));
    };
    const renderFooter = () => (_jsxs(_Fragment, { children: [_jsx("div", { className: rx.rule }), _jsx("footer", { className: rx.footer, children: _jsx("p", { className: rx.footerText, children: "support@tpdentalcare.com | www.tpdentalcare.com" }) })] }));
    const blocks = [];
    const pushBlock = (key, node, h) => { if (node) blocks.push({ key, node, h }); };
    // Rough per-block height estimates (px at full A4 width) for pagination.
    const rowsH = (n) => view === "inline" ? 30 : view === "table" ? (n * 26 + 12) : (n * 22 + 6);
    const secH = (rows) => 30 + rowsH((rows || []).length);
    if (snapshot) {
        pushBlock("symptoms", (snapshot.symptoms && snapshot.symptoms.length) ? _jsx(SectionList, { title: "Chief Complaints", rows: snapshot.symptoms, view: view, icon: _jsx(RxMedicalSectionIcon, { name: "Virus" }) }) : null, secH(snapshot.symptoms));
        pushBlock("examinations", (snapshot.examinations && snapshot.examinations.length) ? _jsx(SectionList, { title: "Examination", rows: snapshot.examinations, view: view, icon: _jsx(RxMedicalSectionIcon, { name: "medical service" }) }) : null, secH(snapshot.examinations));
        pushBlock("diagnoses", (snapshot.diagnoses && snapshot.diagnoses.length) ? _jsx(SectionList, { title: "Diagnosis", rows: snapshot.diagnoses, view: view, icon: _jsx(RxMedicalSectionIcon, { name: "Diagnosis" }) }) : null, secH(snapshot.diagnoses));
        pushBlock("investigations", (snapshot.labInvestigations && snapshot.labInvestigations.length) ? _jsx(SectionList, { title: "Investigations", rows: snapshot.labInvestigations, view: view, icon: _jsx(RxMedicalSectionIcon, { name: "Test Tube" }) }) : null, secH(snapshot.labInvestigations));
        pushBlock("medications", (snapshot.medications && snapshot.medications.length) ? _jsx(SectionList, { title: "Medication (Rx)", rows: snapshot.medications, view: view, icon: _jsx(RxMedicalSectionIcon, { name: "Tablets" }) }) : null, secH(snapshot.medications));
        pushBlock("advice", (snapshot.advice && snapshot.advice.length) ? _jsx(SectionList, { title: "Advice", rows: snapshot.advice, view: view, icon: _jsx(RxMedicalSectionIcon, { name: "health care" }) }) : null, secH(snapshot.advice));
        if (dentalBlocks.length) {
            // Emit the "Dental Examination" section header bundled with the first
            // tooth/bucket, then one block per remaining unit so they paginate
            // across A4 sheets. Each view renders a tooth differently (list
            // bullets / inline / nested table). Per-tooth (date) annotations
            // were removed — the print no longer shows any "(09 Jun 2026)"
            // suffix on tooth labels or section headings.
            const groupBy = settings?.groupBy === "tooth" ? "tooth" : "type";
            if (groupBy === "type") {
                // "By Type" — pivot dentalBlocks so the heading is the category
                // (Past Procedures / Findings / Procedures / Overall Teeth Notes)
                // with the teeth that have that kind listed underneath. One block
                // per non-empty category so each can paginate independently.
                const buckets = buildByTypeBuckets(dentalBlocks);
                const bucketNode = (bk) => view === "table" ? byTypeTableNode(bk) : view === "inline" ? byTypeInlineNode(bk) : byTypeListNode(bk);
                buckets.forEach((bk, i) => {
                    const inner = bucketNode(bk);
                    const node = i === 0
                        ? _jsxs("section", { style: { marginTop: 12, breakInside: "avoid", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }, children: [dentalHeaderNode(snapshot), _jsx("div", { style: { marginTop: 4 }, children: inner })] })
                        : _jsx("section", { style: { breakInside: "avoid", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }, children: inner });
                    pushBlock(`dental-type-${bk.key}`, node, 0);
                });
            } else {
                const toothNode = (b) => view === "table" ? dentalToothTableNode(b) : view === "inline" ? dentalToothInlineNode(b) : dentalToothListNode(b);
                dentalBlocks.forEach((b, i) => {
                    const tooth = toothNode(b);
                    const node = i === 0
                        ? _jsxs("section", { style: { marginTop: 12, breakInside: "avoid", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }, children: [dentalHeaderNode(snapshot), _jsx("div", { style: { marginTop: 4 }, children: tooth })] })
                        : _jsx("section", { style: { breakInside: "avoid", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }, children: tooth });
                    pushBlock(`dental-${i}`, node, 0);
                });
            }
        }
        pushBlock("followUp", snapshot.followUp ? (_jsxs("section", { className: rx.miniSection, children: [_jsxs("h3", { className: rx.dentalTitle, children: [_jsx(Calendar2, { size: 14, color: "var(--tp-slate-500)", variant: "Bulk" }), "Follow Up"] }), _jsx("p", { className: rx.miniBody, children: snapshot.followUp })] })) : null, 56);
        pushBlock("additionalNotes", mergedAdditionalNotes ? (_jsxs("section", { className: rx.miniSection, children: [_jsxs("h3", { className: rx.dentalTitle, children: [_jsx(Notepad2, { size: 14, color: "var(--tp-slate-500)", variant: "Bulk" }), "Additional Notes"] }), _jsx("p", { className: rx.miniBody, children: mergedAdditionalNotes })] })) : null, 72);
        pushBlock("oral", hideOral ? null : _jsx(OralExamReport, { patientId: snapshot.patientId, view: view, chart: chartOverride }), view === "list" ? 200 : 120);
        pushBlock("chart", showDentalChart ? _jsx(FlatDentitionChart, { patientId: snapshot.patientId, chart: chartOverride, alwaysRender: true, patientType: settings?.patientType || "adult" }) : null, 380);
    }
    return (_jsx("div", { className: rx.page, style: { position: "relative" }, children: !snapshot ? (_jsxs("article", { className: rx.sheet, children: [renderLetterhead(), renderPatientDetails(), _jsx("div", { className: rx.sheetBody, children: _jsx("div", { className: rx.emptyPad, children: _jsx("p", { className: rx.emptyText, children: "No Rx data available yet. Add details in Clinical or Dental Examination to preview here." }) }) }), renderFooter()] })) : _jsx(PaginatedRx, { blocks: blocks, renderHead: renderLetterhead, renderPatient: renderPatientDetails, renderFoot: renderFooter }) }));
}
