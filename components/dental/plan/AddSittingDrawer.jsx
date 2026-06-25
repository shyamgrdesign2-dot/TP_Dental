"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer";
import { ChevronDown, NotebookPen } from "lucide-react";
import { usePlanContext } from "./plan-context";
import { DrawerHeader, PLAN_DRAWER_XWIDE_PANEL_CLASS } from "./plan-shared";
import { genId } from "./plan-types";
import { useDirtyDrawerGuard } from "./use-dirty-drawer-guard";
import { TPConfirmDialog } from "@/components/ui/tp-confirm-dialog";

const DOCTORS = ["Dr. Sheela B R", "Dr. Shyam GR", "Dr. Riya Kapoor"];
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
    const [notes, setNotes] = useState("");
    const surfaceSummary = service?.surfaces?.length
        ? service.surfaces.map(formatSurfaceLabel).join(", ")
        : "All surfaces";
    const toothSummary = service?.toothFdi === "full-mouth"
        ? "Full Mouth"
        : service
            ? `T${service.toothFdi} ${service.toothLabel}`
            : "—";
    const serviceNotes = String(service?.notes ?? "").trim();
    const notesPreview = serviceNotes
        ? serviceNotes.split("\n")[0].trim()
        : "—";
    const resetForm = () => {
        const current = new Date();
        setVisitDate(toDateInputValue(current));
        setVisitTime(toTimeInputValue(current));
        setDoctor(DOCTORS[0]);
        setNotes("");
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
            setNotes(editingSitting.notes ?? "");
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
            return (
                visitDate !== origDate ||
                visitTime !== origTime ||
                doctor !== editingSitting.doctor ||
                String(notes ?? "").trim() !== String(editingSitting.notes ?? "").trim()
            );
        }
        return Boolean(String(notes ?? "").trim()) || doctor !== DOCTORS[0];
    })();
    const guard = useDirtyDrawerGuard({ isDirty, onClose: () => closeDrawer() });
    const handleAdd = () => {
        if (!serviceId) return;
        const chosen = composeVisitDateTime(visitDate, visitTime) ?? new Date();
        const visitLabel = formatVisitDateTimeLabel(chosen);
        const chosenIso = chosen.toISOString();
        if (isEdit && sittingId) {
            dispatch({
                type: "UPDATE_SITTING",
                serviceId,
                sittingId,
                patch: { date: visitLabel, doctor, createdAt: chosenIso, notes: notes.trim() || undefined },
            });
        } else {
            dispatch({
                type: "ADD_SITTING",
                serviceId,
                sitting: {
                    id: genId("sit"),
                    date: visitLabel,
                    doctor,
                    createdAt: chosenIso,
                    notes: notes.trim() || undefined,
                },
            });
        }
        closeDrawer();
        resetForm();
        showSnackbar?.(isEdit ? "Visit record updated successfully." : "Visit record added successfully.");
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
                                    _jsx("span", { className: CLUSTER_ICON, children: _jsx(NotebookPen, { size: 16 }) }),
                                    _jsx("h4", { className: CLUSTER_TITLE, children: "Visit Record" }),
                                ] }),
                                _jsxs("div", { className: CLUSTER_BODY, children: [
                                    _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                                        _jsxs("div", { children: [
                                            _jsx("label", { className: LABEL_CLASS, children: "Visit date" }),
                                            _jsx("input", { type: "date", value: visitDate, onChange: (e) => setVisitDate(e.target.value), className: INPUT_CLASS }),
                                        ] }),
                                        _jsxs("div", { children: [
                                            _jsx("label", { className: LABEL_CLASS, children: "Visit time" }),
                                            _jsx("input", { type: "time", value: visitTime, onChange: (e) => setVisitTime(e.target.value), className: INPUT_CLASS }),
                                        ] }),
                                        _jsxs("div", { children: [
                                            _jsx("label", { className: LABEL_CLASS, children: "Doctor" }),
                                            _jsxs("div", { className: "relative", children: [
                                                _jsx("select", { value: doctor, onChange: (e) => setDoctor(e.target.value), className: SELECT_CLASS, children: DOCTORS.map((d) => _jsx("option", { value: d, children: d }, d)) }),
                                                _jsx("span", { className: "pointer-events-none absolute inset-y-0 right-[12px] inline-flex items-center text-tp-slate-500", children: _jsx(ChevronDown, { size: 16, strokeWidth: 2 }) }),
                                            ] }),
                                        ] }),
                                    ] }),
                                    _jsxs("div", { children: [
                                        _jsx("label", { className: LABEL_CLASS, children: "Notes" }),
                                        _jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Clinical notes, chairside findings, treatment details…", rows: 5, className: "w-full rounded-[10px] border border-tp-slate-200 bg-white px-[14px] py-[12px] font-['Inter',sans-serif] text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors resize-none" }),
                                    ] }),
                                ] }),
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
