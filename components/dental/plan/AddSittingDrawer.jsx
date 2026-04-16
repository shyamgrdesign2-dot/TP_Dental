"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer";
import { ChevronDown } from "lucide-react";
import { usePlanContext } from "./plan-context";
import { DrawerHeader } from "./plan-shared";
import { genId } from "./plan-types";

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

export function AddSittingDrawer() {
    const { state, dispatch, closeDrawer, findService } = usePlanContext();
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
    const resetForm = () => {
        const current = new Date();
        setVisitDate(toDateInputValue(current));
        setVisitTime(toTimeInputValue(current));
        setDoctor(DOCTORS[0]);
        setVisitType(VISIT_TYPES[0]);
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
            setVisitType(editingSitting.visitType ?? VISIT_TYPES[0]);
            setNotes(editingSitting.notes ?? "");
            return;
        }
        resetForm();
    }, [isOpen, isEdit, editingSitting]);
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
                patch: { date: visitLabel, doctor, visitType, createdAt: chosenIso, notes: notes.trim() || undefined },
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
                },
            });
        }
        closeDrawer();
        resetForm();
    };
    return _jsx(TPDrawer, {
        open: isOpen,
        onOpenChange: (open) => !open && closeDrawer(),
        children: _jsxs(TPDrawerContent, {
            side: "right",
            size: "lg",
            className: "!rounded-none bg-white",
            children: [
                _jsx(DrawerHeader, {
                    title: isEdit ? "Edit visit" : "Record visit",
                    onClose: closeDrawer,
                    action: _jsx("button", {
                        type: "button",
                        onClick: handleAdd,
                        className: "h-[42px] min-w-[120px] rounded-[10px] px-[20px] font-['Inter',sans-serif] text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 transition-colors",
                        children: isEdit ? "Save visit" : "Add visit",
                    }),
                }),
                _jsxs("div", {
                    className: "flex-1 overflow-y-auto bg-white px-[24px] py-[16px] space-y-[14px]",
                    children: [
                        service && _jsxs("div", {
                            className: "rounded-[12px] border border-tp-slate-200 bg-gradient-to-r from-white to-tp-blue-50/35 px-[14px] py-[12px] shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
                            children: [
                                _jsx("p", { className: "font-['Inter',sans-serif] text-[15px] font-semibold text-tp-slate-900", children: service.treatment }),
                                _jsx("p", {
                                    className: "font-['Inter',sans-serif] text-[12px] text-tp-slate-600",
                                    children: service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi} — ${service.toothLabel}`,
                                }),
                                _jsxs("p", {
                                    className: "font-['Inter',sans-serif] text-[12px] text-tp-slate-500 mt-[2px]",
                                    children: ["Recorded visits: ", service.sittings.length],
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            className: "grid grid-cols-2 gap-3",
                            children: [
                                _jsx("div", {
                                    children: [
                                        _jsx("label", { className: LABEL_CLASS, children: "Visit date" }),
                                        _jsx("input", {
                                            type: "date",
                                            value: visitDate,
                                            onChange: (e) => setVisitDate(e.target.value),
                                            className: INPUT_CLASS,
                                        }),
                                    ],
                                }),
                                _jsxs("div", {
                                    children: [
                                        _jsx("label", { className: LABEL_CLASS, children: "Visit time" }),
                                        _jsx("input", {
                                            type: "time",
                                            value: visitTime,
                                            onChange: (e) => setVisitTime(e.target.value),
                                            className: INPUT_CLASS,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            children: [
                                _jsx("label", { className: LABEL_CLASS, children: "Doctor" }),
                                _jsxs("div", {
                                    className: "relative",
                                    children: [
                                        _jsx("select", {
                                            value: doctor,
                                            onChange: (e) => setDoctor(e.target.value),
                                            className: SELECT_CLASS,
                                            children: DOCTORS.map((d) => _jsx("option", { value: d, children: d }, d)),
                                        }),
                                        _jsx("span", {
                                            className: "pointer-events-none absolute inset-y-0 right-[12px] inline-flex items-center text-tp-slate-500",
                                            children: _jsx(ChevronDown, { size: 16, strokeWidth: 2 }),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            children: [
                                _jsx("label", { className: LABEL_CLASS, children: "Visit type" }),
                                _jsxs("div", {
                                    className: "relative",
                                    children: [
                                        _jsx("select", {
                                            value: visitType,
                                            onChange: (e) => setVisitType(e.target.value),
                                            className: SELECT_CLASS,
                                            children: VISIT_TYPES.map((type) => _jsx("option", { value: type, children: type }, type)),
                                        }),
                                        _jsx("span", {
                                            className: "pointer-events-none absolute inset-y-0 right-[12px] inline-flex items-center text-tp-slate-500",
                                            children: _jsx(ChevronDown, { size: 16, strokeWidth: 2 }),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            children: [
                                _jsx("label", { className: LABEL_CLASS, children: "Consultation notes" }),
                                _jsx("textarea", {
                                    value: notes,
                                    onChange: (e) => setNotes(e.target.value),
                                    placeholder: "Chairside findings, procedures done, follow-up for this visit…",
                                    rows: 5,
                                    className: "w-full rounded-[10px] border border-tp-slate-200 bg-white px-[14px] py-[10px] font-['Inter',sans-serif] text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors resize-none",
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
    });
}
