"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer";
import { ChevronDown, Plus, Trash2, LayoutGrid, Save, Stethoscope, CalendarClock, NotebookPen } from "lucide-react";
import { usePlanContext } from "./plan-context";
import { DrawerHeader, PLAN_DRAWER_XWIDE_PANEL_CLASS } from "./plan-shared";
import { genId } from "./plan-types";
import { TREATMENT_NAMES } from "./treatments";
import { useDirtyDrawerGuard } from "./use-dirty-drawer-guard";
import { TPConfirmDialog } from "@/components/ui/tp-confirm-dialog";

const DOCTORS = ["Dr. Sheela B R", "Dr. Shyam GR", "Dr. Riya Kapoor"];
const VISIT_TYPES = ["Follow-up", "Procedure", "Emergency", "Review"];
function formatVisitDateTimeLabel(d) {
    const datePart = d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    const timePart = d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
    return `${datePart}, ${timePart}`;
}
function toDateInputValue(d) {
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${day}`;
}
function toTimeInputValue(d) {
    const hh = `${d.getHours()}`.padStart(2, "0");
    const mm = `${d.getMinutes()}`.padStart(2, "0");
    return `${hh}:${mm}`;
}
function formatDateOnly(v) {
    if (!v) return "";
    const [y, m, d] = String(v).split("-").map((n) => Number(n));
    const dt = new Date(y, (m || 1) - 1, d || 1);
    return Number.isFinite(dt.getTime())
        ? dt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
        : v;
}
function parseSittingDateToInputParts(sitting) {
    const fromCreatedAt = sitting?.createdAt ? new Date(sitting.createdAt) : null;
    if (fromCreatedAt && Number.isFinite(fromCreatedAt.getTime())) {
        return { date: toDateInputValue(fromCreatedAt), time: toTimeInputValue(fromCreatedAt) };
    }
    const m = /^(\d{1,2})\s+(\w{3})\s+(\d{4}),\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(String(sitting?.date ?? "").trim());
    if (!m)
        return null;
    const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const month = monthMap[m[2]] ?? 0;
    const dd = Number(m[1]);
    const yy = Number(m[3]);
    const mins = Number(m[5]);
    let hh = Number(m[4]);
    const ampm = m[6].toUpperCase();
    if (ampm === "PM" && hh !== 12)
        hh += 12;
    if (ampm === "AM" && hh === 12)
        hh = 0;
    const d = new Date(yy, month, dd, hh, mins);
    return Number.isFinite(d.getTime()) ? { date: toDateInputValue(d), time: toTimeInputValue(d) } : null;
}
function composeVisitDateTime(visitDate, visitTime) {
    if (!visitDate || !visitTime)
        return null;
    const [y, m, d] = visitDate.split("-").map((n) => Number(n));
    const [hh, mm] = visitTime.split(":").map((n) => Number(n));
    const dt = new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0);
    if (!Number.isFinite(dt.getTime()))
        return null;
    return dt;
}

const INPUT_CLASS =
    "w-full h-[42px] rounded-[10px] border border-tp-slate-200 bg-white pl-[14px] pr-[14px] font-['Inter',sans-serif] text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors";
const SELECT_CLASS = `${INPUT_CLASS} appearance-none pr-[44px] cursor-pointer`;
const LABEL_CLASS = "block font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-600 mb-[6px]";
// Cluster card styling — mirrors the Dental Examination section clusters and the
// RTP design system (white card, violet section icon, tool buttons).
const CLUSTER = "rounded-[16px] border border-tp-slate-100 bg-white overflow-hidden";
const CLUSTER_HEAD = "flex items-center gap-[10px] px-[16px] py-[12px] border-b border-tp-slate-100";
const CLUSTER_BODY = "px-[16px] py-[14px] space-y-[14px]";
const CLUSTER_ICON = "inline-flex h-[26px] w-[26px] items-center justify-center rounded-[8px] bg-tp-violet-50 text-tp-violet-500";
const CLUSTER_TITLE = "font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-800";
const CLUSTER_TOOL_BTN = "inline-flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-tp-slate-100 text-tp-slate-600 hover:bg-tp-slate-200 transition-colors";
const FOLLOWUP_OPTIONS = ["1 week", "2 weeks", "1 month", "3 months", "6 months"];

function formatSurfaceLabel(surface) {
    return String(surface ?? "")
        .trim()
        .charAt(0)
        .toUpperCase()
        .concat(String(surface ?? "").trim().slice(1));
}

export function AddSittingDrawer() {
    const { state, dispatch, closeDrawer, findService, showSnackbar } = usePlanContext();
    const drawer = state.drawer;
    const isAdd = drawer.type === "add-sitting";
    const isEdit = drawer.type === "edit-sitting";
    const isOpen = isAdd || isEdit;
    const serviceId = isOpen ? drawer.serviceId : undefined;
    const sittingId = isEdit ? drawer.sittingId : undefined;
    const service = serviceId ? findService(serviceId) : undefined;
    const editingSitting = sittingId ? service?.sittings.find((s) => s.id === sittingId) : undefined;
    const now = new Date();
    const [visitDate, setVisitDate] = useState(toDateInputValue(now));
    const [visitTime, setVisitTime] = useState(toTimeInputValue(now));
    const [doctor, setDoctor] = useState(DOCTORS[0]);
    const [visitType, setVisitType] = useState(VISIT_TYPES[0]);
    const [notes, setNotes] = useState("");
    const [followUp, setFollowUp] = useState("");
    // Procedures performed during this visit — { id, name, notes, status, doneBy, date }.
    const [procedures, setProcedures] = useState([]);
    const [procQuery, setProcQuery] = useState("");
    const addProcedure = (name) => {
        const n = String(name ?? "").trim();
        if (!n) return;
        setProcedures((prev) => prev.some((p) => p.name.toLowerCase() === n.toLowerCase())
            ? prev
            : [...prev, { id: genId("proc"), name: n, notes: "", status: "completed", doneBy: doctor, date: visitDate }]);
        setProcQuery("");
    };
    const updateProcedure = (id, patch) => {
        setProcedures((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    };
    const removeProcedure = (id) => {
        setProcedures((prev) => prev.filter((p) => p.id !== id));
    };
    const procedureSuggestions = useMemo(() => {
        const q = procQuery.trim().toLowerCase();
        const chosen = new Set(procedures.map((p) => p.name.toLowerCase()));
        const pool = q ? TREATMENT_NAMES.filter((n) => n.toLowerCase().includes(q)) : TREATMENT_NAMES;
        return pool.filter((n) => !chosen.has(n.toLowerCase())).slice(0, 8);
    }, [procQuery, procedures]);
    const surfaceSummary = service?.surfaces?.length
        ? service.surfaces.map(formatSurfaceLabel).join(", ")
        : "All surfaces";
    const toothSummary = service?.toothFdi === "full-mouth"
        ? "Full Mouth"
        : service
            ? `T${service.toothFdi} — ${service.toothLabel}`
            : "—";
    const notesPreview = String(notes ?? "").trim()
        ? String(notes ?? "").trim().split("\n")[0].trim()
        : "—";
    const resetForm = () => {
        const current = new Date();
        setVisitDate(toDateInputValue(current));
        setVisitTime(toTimeInputValue(current));
        setDoctor(DOCTORS[0]);
        setVisitType(VISIT_TYPES[0]);
        setNotes("");
        setFollowUp("");
        setProcedures([]);
        setProcQuery("");
    };
    useEffect(() => {
        if (!isOpen) return;
        if (isEdit && editingSitting) {
            const parsed = parseSittingDateToInputParts(editingSitting);
            if (parsed) {
                setVisitDate(parsed.date);
                setVisitTime(parsed.time);
            }
            setDoctor(editingSitting.doctor);
            setVisitType(editingSitting.visitType ?? VISIT_TYPES[0]);
            setNotes(editingSitting.notes ?? "");
            setFollowUp(editingSitting.followUp ?? "");
            setProcedures((editingSitting.procedures ?? []).map((p) => ({ id: p.id, name: p.name, notes: p.notes ?? "", status: p.status ?? "completed", doneBy: p.doctor ?? editingSitting.doctor, date: visitDate })));
            setProcQuery("");
            return;
        }
        resetForm();
    }, [isOpen, isEdit, editingSitting]);
    const isDirty = (() => {
        if (!isOpen) return false;
        if (isEdit && editingSitting) {
            const parsed = parseSittingDateToInputParts(editingSitting);
            const origDate = parsed?.date ?? toDateInputValue(new Date());
            const origTime = parsed?.time ?? toTimeInputValue(new Date());
            const origProcKey = (editingSitting.procedures ?? []).map((p) => `${p.name}::${p.notes ?? ""}`).join("|");
            const curProcKey = procedures.map((p) => `${p.name}::${p.notes ?? ""}`).join("|");
            return (
                visitDate !== origDate ||
                visitTime !== origTime ||
                doctor !== editingSitting.doctor ||
                visitType !== (editingSitting.visitType ?? VISIT_TYPES[0]) ||
                String(notes ?? "").trim() !== String(editingSitting.notes ?? "").trim() ||
                String(followUp ?? "").trim() !== String(editingSitting.followUp ?? "").trim() ||
                curProcKey !== origProcKey
            );
        }
        return Boolean(String(notes ?? "").trim()) || Boolean(String(followUp ?? "").trim()) || procedures.length > 0 || doctor !== DOCTORS[0] || visitType !== VISIT_TYPES[0];
    })();
    const guard = useDirtyDrawerGuard({ isDirty, onClose: () => closeDrawer() });
    const handleAdd = () => {
        if (!serviceId) return;
        const chosen = composeVisitDateTime(visitDate, visitTime) ?? new Date();
        const visitLabel = formatVisitDateTimeLabel(chosen);
        const chosenIso = chosen.toISOString();
        const subProcedures = procedures
            .filter((p) => p.name.trim())
            .map((p) => ({
                id: p.id || genId("proc"),
                name: p.name.trim(),
                date: p.date ? formatDateOnly(p.date) : visitLabel,
                doctor: p.doneBy || doctor,
                notes: p.notes?.trim() || undefined,
                status: p.status || "completed",
            }));
        if (isEdit && sittingId) {
            dispatch({
                type: "UPDATE_SITTING",
                serviceId,
                sittingId,
                patch: { date: visitLabel, doctor, visitType, createdAt: chosenIso, notes: notes.trim() || undefined, followUp: followUp.trim() || undefined, procedures: subProcedures.length ? subProcedures : undefined },
            });
        } else {
            dispatch({
                type: "ADD_SITTING",
                serviceId,
                sitting: {
                    id: genId("sit"),
                    date: visitLabel,
                    doctor,
                    visitType,
                    createdAt: chosenIso,
                    notes: notes.trim() || undefined,
                    followUp: followUp.trim() || undefined,
                    procedures: subProcedures.length ? subProcedures : undefined,
                },
                // Mirror onto the service's procedure history (story stays connected).
                procedures: subProcedures,
            });
        }
        closeDrawer();
        resetForm();
        showSnackbar?.(isEdit ? "Quick visit record updated successfully." : "Quick visit record added successfully.");
    };
    return _jsxs(_Fragment, {
        children: [
            _jsx(TPDrawer, {
                open: isOpen,
                onOpenChange: (open) => { if (!open) guard.attemptClose(); },
                children: _jsxs(TPDrawerContent, {
            side: "right",
            size: "lg",
            className: `${PLAN_DRAWER_XWIDE_PANEL_CLASS} flex flex-col bg-white`,
            children: [
                _jsx(DrawerHeader, {
                    title: isEdit ? "Edit visit" : "Record visit",
                    onClose: () => guard.attemptClose(),
                    action: _jsx("button", {
                        type: "button",
                        onClick: handleAdd,
                        className: "h-[42px] min-w-[120px] rounded-[10px] px-[20px] font-['Inter',sans-serif] text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 transition-colors",
                        children: isEdit ? "Save visit" : "Add visit",
                    }),
                }),
                _jsxs("div", {
                    className: "flex-1 overflow-y-auto bg-[#F4F5F7] px-[24px] py-[16px] space-y-[14px]",
                    children: [
                        service && _jsxs("div", {
                            className: "rounded-[12px] border border-tp-slate-200 bg-white px-[14px] py-[12px] shadow-none",
                            children: [
                                _jsx("p", { className: "font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-900", children: service.treatment }),
                                _jsxs("div", { className: "mt-[6px] space-y-[7px]", children: [
                                    _jsxs("p", { className: "font-['Inter',sans-serif] text-[12px] leading-[1.4]", children: [
                                        _jsx("span", { className: "font-semibold text-tp-slate-700", children: "Tooth:" }),
                                        _jsx("span", { className: "ml-[6px] font-medium text-tp-slate-600 break-words", children: toothSummary }),
                                    ] }),
                                    _jsxs("p", { className: "font-['Inter',sans-serif] text-[12px] leading-[1.4]", children: [
                                        _jsx("span", { className: "font-semibold text-tp-slate-700", children: "Surface:" }),
                                        _jsx("span", { className: "ml-[6px] font-medium text-tp-slate-600 break-words", children: surfaceSummary }),
                                    ] }),
                                    _jsxs("p", { className: "font-['Inter',sans-serif] text-[12px] leading-[1.4]", children: [
                                        _jsx("span", { className: "font-semibold text-tp-slate-700", children: "Notes:" }),
                                        _jsx("span", { className: "ml-[6px] text-tp-slate-500 break-words", children: notesPreview }),
                                    ] }),
                                ] }),
                            ],
                        }),
                        _jsxs("div", {
                            className: CLUSTER,
                            children: [
                                _jsxs("header", { className: CLUSTER_HEAD, children: [
                                    _jsx("span", { className: CLUSTER_ICON, children: _jsx(CalendarClock, { size: 16 }) }),
                                    _jsx("h4", { className: CLUSTER_TITLE, children: "Visit details" }),
                                ] }),
                                _jsxs("div", { className: CLUSTER_BODY, children: [
                                    _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                                        _jsxs("div", { children: [
                                            _jsx("label", { className: LABEL_CLASS, children: "Visit date" }),
                                            _jsx("input", { type: "date", value: visitDate, onChange: (e) => setVisitDate(e.target.value), className: INPUT_CLASS }),
                                        ] }),
                                        _jsxs("div", { children: [
                                            _jsx("label", { className: LABEL_CLASS, children: "Visit time" }),
                                            _jsx("input", { type: "time", value: visitTime, onChange: (e) => setVisitTime(e.target.value), className: INPUT_CLASS }),
                                        ] }),
                                    ] }),
                                    _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                                        _jsxs("div", { children: [
                                            _jsx("label", { className: LABEL_CLASS, children: "Doctor" }),
                                            _jsxs("div", { className: "relative", children: [
                                                _jsx("select", { value: doctor, onChange: (e) => setDoctor(e.target.value), className: SELECT_CLASS, children: DOCTORS.map((d) => _jsx("option", { value: d, children: d }, d)) }),
                                                _jsx("span", { className: "pointer-events-none absolute inset-y-0 right-[12px] inline-flex items-center text-tp-slate-500", children: _jsx(ChevronDown, { size: 16, strokeWidth: 2 }) }),
                                            ] }),
                                        ] }),
                                        _jsxs("div", { children: [
                                            _jsx("label", { className: LABEL_CLASS, children: "Visit type" }),
                                            _jsxs("div", { className: "relative", children: [
                                                _jsx("select", { value: visitType, onChange: (e) => setVisitType(e.target.value), className: SELECT_CLASS, children: VISIT_TYPES.map((type) => _jsx("option", { value: type, children: type }, type)) }),
                                                _jsx("span", { className: "pointer-events-none absolute inset-y-0 right-[12px] inline-flex items-center text-tp-slate-500", children: _jsx(ChevronDown, { size: 16, strokeWidth: 2 }) }),
                                            ] }),
                                        ] }),
                                    ] }),
                                    _jsxs("div", { children: [
                                        _jsx("label", { className: LABEL_CLASS, children: "Follow-up after" }),
                                        _jsx("input", { type: "text", value: followUp, onChange: (e) => setFollowUp(e.target.value), placeholder: "e.g. 2 weeks", className: INPUT_CLASS }),
                                        _jsx("div", { className: "mt-[8px] flex flex-wrap gap-[6px]", children: FOLLOWUP_OPTIONS.map((opt) => _jsx("button", { type: "button", onClick: () => setFollowUp(opt), className: "inline-flex h-[28px] items-center rounded-[8px] px-[10px] font-['Inter',sans-serif] text-[12px] font-medium transition-colors " + (followUp === opt ? "bg-tp-blue-50 text-tp-blue-700 ring-1 ring-tp-blue-200" : "bg-tp-slate-100 text-tp-slate-600 hover:bg-tp-slate-200"), children: opt }, opt)) }),
                                    ] }),
                                ] }),
                            ],
                        }),
                        _jsxs("div", {
                            className: CLUSTER,
                            children: [
                                _jsxs("header", {
                                    className: CLUSTER_HEAD,
                                    children: [
                                        _jsx("span", { className: CLUSTER_ICON, children: _jsx(Stethoscope, { size: 16 }) }),
                                        _jsx("h4", { className: CLUSTER_TITLE, children: "Procedures" }),
                                        procedures.length > 0 && _jsx("span", { className: "inline-flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-tp-slate-100 px-[6px] font-['Inter',sans-serif] text-[11px] font-bold text-tp-slate-600 tabular-nums", children: procedures.length }),
                                        _jsx("div", { className: "flex-1" }),
                                        _jsx("button", { type: "button", title: "Templates", className: CLUSTER_TOOL_BTN, children: _jsx(LayoutGrid, { size: 16 }) }),
                                        _jsx("button", { type: "button", title: "Save as template", className: CLUSTER_TOOL_BTN, children: _jsx(Save, { size: 16 }) }),
                                    ],
                                }),
                                _jsxs("div", { className: CLUSTER_BODY, children: [
                                procedures.length > 0 && _jsx("div", {
                                    className: "overflow-x-auto rounded-[12px] border border-tp-slate-200",
                                    children: _jsxs("table", {
                                        className: "w-full min-w-[760px] table-fixed font-['Inter',sans-serif] text-[14px]",
                                        children: [
                                            _jsxs("colgroup", { children: [
                                                _jsx("col", { style: { width: 36, minWidth: 36 } }),
                                                _jsx("col", { style: { minWidth: 160 } }),
                                                _jsx("col", { style: { width: 160, minWidth: 140 } }),
                                                _jsx("col", { style: { width: 130, minWidth: 120 } }),
                                                _jsx("col", { style: { width: 150, minWidth: 130 } }),
                                                _jsx("col", { style: { minWidth: 150 } }),
                                                _jsx("col", { style: { width: 44, minWidth: 44, maxWidth: 44 } }),
                                            ] }),
                                            _jsx("thead", { children: _jsxs("tr", {
                                                className: "h-[38px] bg-tp-slate-50 text-left font-['Inter',sans-serif] text-[12px] text-tp-slate-500",
                                                children: [
                                                    _jsx("th", { className: "border-r border-tp-slate-100 px-0 py-2 text-center font-semibold" }),
                                                    _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Procedure" }),
                                                    _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Doctor" }),
                                                    _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Status" }),
                                                    _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Date" }),
                                                    _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Note" }),
                                                    _jsx("th", { className: "px-0 py-2 text-center font-semibold" }),
                                                ],
                                            }) }),
                                            _jsx("tbody", { children: procedures.map((p) => _jsxs("tr", {
                                                className: "border-t border-tp-slate-100 bg-white align-middle",
                                                children: [
                                                    _jsx("td", { className: "border-r border-tp-slate-100 p-0 text-center align-middle text-tp-slate-300", children: _jsx("span", { className: "inline-flex h-[52px] w-full items-center justify-center", children: _jsxs("svg", { width: "8", height: "16", viewBox: "0 0 8 16", fill: "currentColor", children: [_jsx("circle", { cx: "2", cy: "3", r: "1.2" }), _jsx("circle", { cx: "2", cy: "8", r: "1.2" }), _jsx("circle", { cx: "2", cy: "13", r: "1.2" }), _jsx("circle", { cx: "6", cy: "3", r: "1.2" }), _jsx("circle", { cx: "6", cy: "8", r: "1.2" }), _jsx("circle", { cx: "6", cy: "13", r: "1.2" })] }) }) }),
                                                    _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx("div", { className: "flex h-[52px] items-center px-[12px]", children: _jsx("p", { className: "font-['Inter',sans-serif] text-[14px] font-medium text-[#454551] truncate", children: p.name }) }) }),
                                                    _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx("select", { value: p.doneBy, onChange: (e) => updateProcedure(p.id, { doneBy: e.target.value }), className: "h-[52px] w-full border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[13px] leading-[20px] text-[#454551] focus:outline-none focus:ring-0 rounded-none", children: DOCTORS.map((d) => _jsx("option", { value: d, children: d }, d)) }) }),
                                                    _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsxs("select", { value: p.status, onChange: (e) => updateProcedure(p.id, { status: e.target.value }), className: "h-[52px] w-full border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[13px] leading-[20px] text-[#454551] focus:outline-none focus:ring-0 rounded-none", children: [_jsx("option", { value: "completed", children: "Completed" }), _jsx("option", { value: "in-progress", children: "In Progress" }), _jsx("option", { value: "not-started", children: "Not Started" })] }) }),
                                                    _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx("input", { type: "date", value: p.date, onChange: (e) => updateProcedure(p.id, { date: e.target.value }), className: "h-[52px] w-full border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] focus:outline-none focus:ring-0 rounded-none cursor-pointer" }) }),
                                                    _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx("input", { type: "text", value: p.notes, onChange: (e) => updateProcedure(p.id, { notes: e.target.value }), placeholder: "e.g. Used RVG before obturation", className: "h-[52px] w-full border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] placeholder:text-[#a2a2a8] focus:outline-none focus:ring-0 rounded-none" }) }),
                                                    _jsx("td", { className: "p-0", children: _jsx("div", { className: "flex h-[52px] items-center justify-center", children: _jsx("button", { type: "button", onClick: () => removeProcedure(p.id), "aria-label": "Remove procedure", className: "flex h-[28px] w-[28px] items-center justify-center rounded-[6px] text-tp-slate-400 hover:text-tp-error-500 hover:bg-tp-error-50 transition-colors", children: _jsx(Trash2, { size: 18 }) }) }) }),
                                                ],
                                            }, p.id)) }),
                                        ],
                                    }),
                                }),
                                _jsx("input", { type: "text", value: procQuery, onChange: (e) => setProcQuery(e.target.value), onKeyDown: (e) => { if (e.key === "Enter") { e.preventDefault(); addProcedure(procQuery); } }, placeholder: "Search & add a procedure performed…", className: INPUT_CLASS }),
                                procedureSuggestions.length > 0 && _jsx("div", { className: "flex flex-wrap gap-[6px]", children: procedureSuggestions.map((n) => _jsxs("button", { type: "button", onClick: () => addProcedure(n), className: "inline-flex items-center gap-[4px] h-[30px] rounded-[10px] bg-tp-slate-100 px-[10px] font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-600 hover:bg-tp-slate-200 transition-colors", children: [_jsx(Plus, { size: 13, strokeWidth: 2 }), n] }, n)) }),
                                procQuery.trim() && !TREATMENT_NAMES.some((n) => n.toLowerCase() === procQuery.trim().toLowerCase()) && _jsxs("button", { type: "button", onClick: () => addProcedure(procQuery), className: "inline-flex items-center gap-[6px] font-['Inter',sans-serif] text-[12px] font-semibold text-tp-blue-600 hover:text-tp-blue-700", children: [_jsx(Plus, { size: 14, strokeWidth: 2 }), `Add "${procQuery.trim()}"`] }),
                                ] }),
                            ],
                        }),
                        _jsxs("div", {
                            className: CLUSTER,
                            children: [
                                _jsxs("header", { className: CLUSTER_HEAD, children: [
                                    _jsx("span", { className: CLUSTER_ICON, children: _jsx(NotebookPen, { size: 16 }) }),
                                    _jsx("h4", { className: CLUSTER_TITLE, children: "Additional Notes" }),
                                ] }),
                                _jsx("div", { className: CLUSTER_BODY, children:
                                _jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Chairside findings, follow-up, anything else for this visit…", rows: 5, className: "w-full rounded-[10px] border border-tp-slate-200 bg-white px-[14px] py-[12px] font-['Inter',sans-serif] text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors resize-none" })
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
            }),
            _jsx(TPConfirmDialog, {
                open: guard.confirmOpen,
                onOpenChange: (open) => { if (!open) guard.cancelDiscard(); },
                title: "Are you sure you want to go back?",
                warning: "If you go back now, your changes will not be saved.",
                secondaryLabel: "Yes, Go Back",
                onSecondary: guard.confirmDiscard,
                primaryLabel: "No, Stay",
                primaryTone: "primary",
                onPrimary: guard.cancelDiscard,
            }),
        ],
    });
}
