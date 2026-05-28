"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, Search, X, Check, Hospital, Video, Pencil, Plus, Calendar as CalendarIcon } from "lucide-react";
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer";
import { APPOINTMENT_PATIENTS } from "@/lib/appointment-patients";
import { saveBookedAppointment } from "@/components/tp-appointment-screen/booked-appointments-store";

const DOCTORS = ["Dr. Sheela B R", "Dr. Shyam GR", "Dr. Riya Kapoor"];
const CASE_TYPES = ["Consultation", "Procedure", "Review / Check-up", "Emergency", "Follow-up"];
const CATEGORIES = ["General", "Insurance", "Corporate", "Camp"];

const SLOT_SECTIONS = [
    { key: "morning", label: "Morning", times: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"] },
    { key: "afternoon", label: "Afternoon", times: ["12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:45 PM"] },
    { key: "evening", label: "Evening", times: ["05:00 PM", "05:30 PM", "06:00 PM", "06:15 PM", "07:00 PM", "07:30 PM"] },
];

const INPUT = "w-full h-[42px] rounded-[10px] border border-tp-slate-200 bg-white px-[14px] font-['Inter',sans-serif] text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors";
const SELECT = `${INPUT} appearance-none pr-[40px] cursor-pointer`;
const LABEL = "block font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-600 mb-[6px]";

function toISO(d) {
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${day}`;
}
function buildDateChips(count) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: count }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        return d;
    });
}
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Standalone appointment-booking sidebar — a TP-design replica of the
 * production AddAppointment flow (slot selection → confirm with patient,
 * case type, receptionist remarks). Persists to the booked-appointments
 * store so the booking appears immediately on the appointments listing.
 *
 * Props:
 *  - open, onClose
 *  - context (optional, when launched from the dental plan):
 *      { patientId, serviceId, serviceName, toothLabel, doctor, onBooked }
 */
export function AddAppointmentDrawer({ open, onClose, context }) {
    const fromPlan = Boolean(context?.serviceId);
    const dateChips = useMemo(() => buildDateChips(14), []);
    const [step, setStep] = useState("slot");
    const [mode, setMode] = useState("in_clinic");
    const [doctor, setDoctor] = useState(context?.doctor || DOCTORS[0]);
    const [selectedDate, setSelectedDate] = useState(() => toISO(new Date()));
    const [slot, setSlot] = useState(null);
    const [query, setQuery] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);
    const [patientId, setPatientId] = useState(context?.patientId || null);
    const [caseType, setCaseType] = useState(fromPlan ? "Procedure" : CASE_TYPES[0]);
    const [category, setCategory] = useState("");
    const [remarks, setRemarks] = useState("");

    useEffect(() => {
        if (!open) return;
        setStep("slot");
        setMode("in_clinic");
        setDoctor(context?.doctor || DOCTORS[0]);
        setSelectedDate(toISO(new Date()));
        setSlot(null);
        setQuery("");
        setSearchFocused(false);
        setPatientId(context?.patientId || null);
        setCaseType(context?.serviceId ? "Procedure" : CASE_TYPES[0]);
        setCategory("");
        setRemarks("");
    }, [open, context?.patientId, context?.serviceId, context?.doctor]);

    const patientMatches = useMemo(() => {
        const q = query.trim().toLowerCase();
        const all = Object.entries(APPOINTMENT_PATIENTS).map(([id, p]) => ({ id, ...p }));
        if (!q) return all.slice(0, 6);
        return all.filter((p) => p.name.toLowerCase().includes(q) || p.mobile.includes(q) || p.patientCode.toLowerCase().includes(q)).slice(0, 6);
    }, [query]);

    const selectedPatient = patientId ? APPOINTMENT_PATIENTS[patientId] : null;
    const dateObj = useMemo(() => { const [y, m, d] = selectedDate.split("-").map(Number); return new Date(y, m - 1, d); }, [selectedDate]);
    const prettyDate = `${dateObj.getDate()} ${MONTHS[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    const todayISO = toISO(new Date());
    const tomorrowISO = (() => { const t = new Date(); t.setDate(t.getDate() + 1); return toISO(t); })();
    const dayHint = selectedDate === todayISO ? " (Today)" : selectedDate === tomorrowISO ? " (Tomorrow)" : "";

    const canConfirm = Boolean(slot);
    const canBook = Boolean(slot && patientId && caseType);

    const handleBook = () => {
        if (!canBook) return;
        const p = selectedPatient;
        const id = `appt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        saveBookedAppointment({
            id,
            patientId: patientId,
            serviceId: context?.serviceId ?? "standalone",
            serviceName: context?.serviceName,
            toothLabel: context?.toothLabel,
            date: selectedDate,
            time: slot,
            doctor,
            notes: remarks.trim() || undefined,
            patientName: p?.name,
            patientContact: p?.mobile,
            caseType,
            createdAt: new Date().toISOString(),
        });
        context?.onBooked?.({ id, patientId, date: selectedDate, time: slot, doctor, caseType, notes: remarks.trim() || undefined });
        setStep("done");
    };

    const modeBtn = (active) => ({
        flex: 1, height: 40, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600,
        background: active ? "#fff" : "transparent", color: active ? "#4B4AD5" : "#64748b",
        boxShadow: active ? "0 1px 3px rgba(2,6,23,0.12)" : "none",
    });

    const SLOT_W = "!gap-0 !rounded-none !min-h-0 !w-[80vw] !max-w-[80vw] sm:!w-[80vw] sm:!max-w-[80vw]";
    const CONFIRM_W = "!gap-0 !rounded-none !min-h-0 !w-[46vw] !max-w-[46vw] sm:!w-[46vw] sm:!max-w-[46vw]";
    const confirmOpen = open && (step === "confirm" || step === "done");

    return _jsxs(_Fragment, { children: [
        // ── Slot-selection sidebar (≈80% of the page) ──
        _jsx(TPDrawer, {
            open: open,
            onOpenChange: (o) => { if (!o) onClose?.(); },
            children: _jsxs(TPDrawerContent, {
                side: "right", size: "lg",
                className: `${SLOT_W} flex flex-col bg-white`,
                children: [
                    _jsxs("header", { className: "flex items-center gap-[12px] border-b border-tp-slate-200 px-[24px] py-[14px] shrink-0", children: [
                        _jsx("button", { type: "button", onClick: () => onClose?.(), "aria-label": "Close", className: "inline-flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-tp-slate-100 text-tp-slate-600 hover:bg-tp-slate-200 transition-colors", children: _jsx(X, { size: 18 }) }),
                        _jsx("h2", { className: "flex-1 font-['Inter',sans-serif] text-[16px] font-semibold text-tp-slate-900", children: "Select an Appointment Slot" }),
                    ] }),
                    _jsx("div", { className: "flex-1 overflow-y-auto bg-[#F4F5F7] px-[24px] py-[18px]", children: _jsxs("div", { className: "mx-auto w-full max-w-[820px] space-y-[16px]", children: [
                        // mode toggle
                        _jsxs("div", { style: { display: "flex", gap: 8, padding: 4, background: "#e9e9ef", borderRadius: 10, maxWidth: 420 }, children: [
                            _jsxs("button", { type: "button", onClick: () => setMode("in_clinic"), style: modeBtn(mode === "in_clinic"), children: [_jsx(Hospital, { size: 16 }), "In-clinic"] }),
                            _jsxs("button", { type: "button", onClick: () => setMode("teleconsult"), style: modeBtn(mode === "teleconsult"), children: [_jsx(Video, { size: 16 }), "Tele-Consultation"] }),
                        ] }),
                        // date chips
                        _jsxs("div", { children: [
                            _jsxs("div", { className: "mb-[8px] flex items-center gap-[6px] font-['Inter',sans-serif] text-[13px] font-semibold text-tp-slate-700", children: [_jsx(CalendarIcon, { size: 14 }), `${MONTHS[dateObj.getMonth()]}, ${dateObj.getFullYear()}`] }),
                            _jsx("div", { className: "flex gap-[8px] overflow-x-auto pb-[4px]", children: dateChips.map((d) => {
                                const iso = toISO(d); const active = iso === selectedDate;
                                return _jsxs("button", { type: "button", onClick: () => { setSelectedDate(iso); setSlot(null); }, style: {
                                    flex: "0 0 auto", width: 52, height: 60, borderRadius: 10, border: active ? "1.5px solid #4B4AD5" : "1px solid #e2e8f0",
                                    background: active ? "#EEEEFF" : "#fff", color: active ? "#4B4AD5" : "#475569", cursor: "pointer",
                                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, fontFamily: "Inter, sans-serif",
                                }, children: [_jsx("span", { style: { fontSize: 16, fontWeight: 700 }, children: d.getDate() }), _jsx("span", { style: { fontSize: 11 }, children: WEEKDAYS[d.getDay()] })] }, iso);
                            }) }),
                        ] }),
                        // doctor
                        _jsxs("div", { children: [_jsx("label", { className: LABEL, children: "Doctor" }), _jsxs("div", { className: "relative", children: [
                            _jsx("select", { value: doctor, onChange: (e) => setDoctor(e.target.value), className: SELECT, children: DOCTORS.map((d) => _jsx("option", { value: d, children: d }, d)) }),
                            _jsx("span", { className: "pointer-events-none absolute inset-y-0 right-[12px] inline-flex items-center text-tp-slate-500", children: _jsx(ChevronDown, { size: 16 }) }),
                        ] })] }),
                        // slots
                        _jsx("div", { className: "space-y-[14px]", children: SLOT_SECTIONS.map((sec) => _jsxs("div", { children: [
                            _jsx("p", { className: "mb-[8px] font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.4px] text-tp-slate-500", children: sec.label }),
                            _jsx("div", { className: "grid grid-cols-4 gap-[8px]", children: sec.times.map((t) => {
                                const active = slot === t;
                                return _jsx("button", { type: "button", onClick: () => setSlot(t), className: "h-[42px] rounded-[10px] border font-['Inter',sans-serif] text-[13px] font-medium transition-colors " + (active ? "border-tp-blue-500 bg-tp-blue-50 text-tp-blue-700" : "border-tp-slate-200 bg-white text-tp-slate-600 hover:border-tp-slate-300"), children: t }, t);
                            }) }),
                        ] }, sec.key)) }),
                    ] }) }),
                    _jsx("div", { className: "shrink-0 border-t border-tp-slate-200 bg-white px-[24px] py-[14px]", children: _jsx("div", { className: "mx-auto w-full max-w-[820px]", children:
                        _jsx("button", { type: "button", disabled: !canConfirm, onClick: () => setStep("confirm"), className: "h-[44px] w-full rounded-[10px] bg-tp-blue-600 font-['Inter',sans-serif] text-[14px] font-semibold text-white hover:bg-tp-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors", children: "Continue" }) }) }),
                ],
            }),
        }),
        // ── Confirm sidebar (≈46%) stacked on top ──
        _jsx(TPDrawer, {
            open: confirmOpen,
            onOpenChange: (o) => { if (!o) setStep("slot"); },
            children: _jsxs(TPDrawerContent, {
                side: "right", size: "lg",
                className: `${CONFIRM_W} flex flex-col bg-white`,
                children: step === "done" ? [
                    _jsxs("div", { className: "flex flex-1 flex-col items-center justify-center gap-[14px] px-[24px] text-center", children: [
                        _jsx("div", { className: "inline-flex h-[56px] w-[56px] items-center justify-center rounded-full bg-tp-success-50 text-tp-success-600", children: _jsx(Check, { size: 28 }) }),
                        _jsxs("p", { className: "font-['Inter',sans-serif] text-[16px] font-semibold text-tp-slate-900", children: [selectedPatient?.name || "Patient", "’s appointment booked successfully!"] }),
                        _jsxs("p", { className: "font-['Inter',sans-serif] text-[13px] text-tp-slate-500", children: [slot, " · ", prettyDate, " · ", doctor] }),
                        _jsx("button", { type: "button", onClick: () => onClose?.(), className: "mt-[8px] h-[42px] min-w-[140px] rounded-[10px] bg-tp-blue-600 px-[20px] font-['Inter',sans-serif] text-[14px] font-semibold text-white hover:bg-tp-blue-700 transition-colors", children: "Done" }),
                    ] }),
                ] : [
                    _jsxs("header", { className: "flex items-center gap-[12px] border-b border-tp-slate-200 px-[20px] py-[14px] shrink-0", children: [
                        _jsx("button", { type: "button", onClick: () => setStep("slot"), "aria-label": "Back", className: "inline-flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-tp-slate-100 text-tp-slate-600 hover:bg-tp-slate-200 transition-colors", children: _jsx(ChevronLeft, { size: 18 }) }),
                        _jsx("h2", { className: "flex-1 font-['Inter',sans-serif] text-[16px] font-semibold text-tp-slate-900", children: "Confirm Appointment" }),
                    ] }),
                    _jsxs("div", { className: "flex-1 overflow-y-auto bg-[#F4F5F7] px-[20px] py-[16px] space-y-[16px]", children: [
                        // doctor summary
                        _jsxs("div", { className: "flex items-center gap-[10px] rounded-[10px] bg-white border border-tp-slate-200 px-[12px] py-[10px]", children: [
                            _jsx("span", { className: "inline-flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-tp-violet-50 text-tp-violet-500", children: _jsx(Hospital, { size: 16 }) }),
                            _jsx("span", { className: "flex-1 font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-800 truncate", children: doctor }),
                            _jsx("button", { type: "button", onClick: () => setStep("slot"), "aria-label": "Edit doctor", className: "text-tp-blue-600 hover:text-tp-blue-700", children: _jsx(Pencil, { size: 16 }) }),
                        ] }),
                        // slot summary
                        _jsxs("div", { className: "flex items-center gap-[10px] rounded-[10px] bg-white border border-tp-slate-200 px-[12px] py-[10px]", children: [
                            _jsx("span", { className: "inline-flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-tp-violet-50 text-tp-violet-500", children: _jsx(CalendarIcon, { size: 16 }) }),
                            _jsxs("span", { className: "flex-1 font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-800", children: [slot, dayHint, _jsxs("span", { className: "font-normal text-tp-slate-500", children: [" | ", prettyDate, mode === "teleconsult" ? " | Tele-Consultation" : ""] })] }),
                            _jsx("button", { type: "button", onClick: () => setStep("slot"), "aria-label": "Edit time", className: "text-tp-blue-600 hover:text-tp-blue-700", children: _jsx(Pencil, { size: 16 }) }),
                        ] }),
                        // patient
                        _jsxs("div", { children: [
                            _jsxs("label", { className: LABEL, children: ["Patient Name, Mobile no & ID ", _jsx("span", { className: "text-tp-error-500", children: "*" })] }),
                            selectedPatient ? _jsxs("div", { className: "flex items-center justify-between rounded-[10px] border border-tp-slate-200 bg-white px-[12px] py-[10px]", children: [
                                _jsxs("div", { className: "min-w-0", children: [
                                    _jsx("p", { className: "font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-800 truncate", children: selectedPatient.name }),
                                    _jsxs("p", { className: "font-['Inter',sans-serif] text-[12px] text-tp-slate-500 truncate", children: [selectedPatient.mobile, " · ", selectedPatient.patientCode] }),
                                ] }),
                                !fromPlan && _jsx("button", { type: "button", onClick: () => { setPatientId(null); setQuery(""); }, "aria-label": "Change patient", className: "text-tp-slate-400 hover:text-tp-error-500", children: _jsx(X, { size: 16 }) }),
                            ] }) : _jsxs("div", { className: "relative", children: [
                                _jsx(Search, { size: 16, className: "pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-tp-slate-400 z-[1]" }),
                                _jsx("input", { type: "text", value: query, onChange: (e) => setQuery(e.target.value), onFocus: () => setSearchFocused(true), onBlur: () => window.setTimeout(() => setSearchFocused(false), 150), placeholder: "Search by Patient's Name, Phone number or Id", className: `${INPUT} pl-[36px]` }),
                                // Suggestions appear only on focus (matches the antd AutoComplete).
                                searchFocused && _jsxs("div", { className: "absolute left-0 right-0 top-[46px] z-[60] max-h-[260px] overflow-y-auto rounded-[10px] border border-tp-slate-200 bg-white py-[4px] shadow-[0_10px_28px_rgba(2,6,23,0.16)]", children: [
                                    patientMatches.length === 0 && _jsx("p", { className: "px-[12px] py-[8px] font-['Inter',sans-serif] text-[12px] text-tp-slate-400", children: "No patients found." }),
                                    ...patientMatches.map((p) => _jsxs("button", { type: "button", onMouseDown: (e) => { e.preventDefault(); setPatientId(p.id); }, className: "flex w-full items-center justify-between px-[12px] py-[8px] text-left hover:bg-tp-slate-50 transition-colors", children: [
                                        _jsxs("span", { className: "font-['Inter',sans-serif] text-[13px] font-medium text-tp-slate-700", children: [p.name, " ", _jsxs("span", { className: "text-tp-slate-400", children: ["(", p.genderShort, ", ", p.age, "y)"] })] }),
                                        _jsx("span", { className: "font-['Inter',sans-serif] text-[12px] text-tp-slate-400", children: p.mobile }),
                                    ] }, p.id)),
                                    _jsxs("button", { type: "button", onMouseDown: (e) => e.preventDefault(), className: "flex w-full items-center gap-[6px] border-t border-tp-slate-100 px-[12px] py-[9px] text-left font-['Inter',sans-serif] text-[13px] font-semibold text-tp-blue-600 hover:bg-tp-blue-50/60 transition-colors", children: [_jsx(Plus, { size: 15, strokeWidth: 2 }), "Add New Patient"] }),
                                ] }),
                            ] }),
                        ] }),
                        // case type + category
                        _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                            _jsxs("div", { children: [_jsxs("label", { className: LABEL, children: ["Case Type ", _jsx("span", { className: "text-tp-error-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [
                                _jsx("select", { value: caseType, onChange: (e) => setCaseType(e.target.value), className: SELECT, children: CASE_TYPES.map((c) => _jsx("option", { value: c, children: c }, c)) }),
                                _jsx("span", { className: "pointer-events-none absolute inset-y-0 right-[12px] inline-flex items-center text-tp-slate-500", children: _jsx(ChevronDown, { size: 16 }) }),
                            ] })] }),
                            _jsxs("div", { children: [_jsx("label", { className: LABEL, children: "Category" }), _jsxs("div", { className: "relative", children: [
                                _jsxs("select", { value: category, onChange: (e) => setCategory(e.target.value), className: SELECT, children: [_jsx("option", { value: "", children: "Select Category" }), ...CATEGORIES.map((c) => _jsx("option", { value: c, children: c }, c))] }),
                                _jsx("span", { className: "pointer-events-none absolute inset-y-0 right-[12px] inline-flex items-center text-tp-slate-500", children: _jsx(ChevronDown, { size: 16 }) }),
                            ] })] }),
                        ] }),
                        // remarks
                        _jsxs("div", { children: [_jsx("label", { className: LABEL, children: "Remarks for Receptionist" }), _jsx("textarea", { value: remarks, onChange: (e) => setRemarks(e.target.value), placeholder: "Write your remarks", rows: 3, className: "w-full rounded-[10px] border border-tp-slate-200 bg-white px-[14px] py-[12px] font-['Inter',sans-serif] text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors resize-none" })] }),
                    ] }),
                    _jsx("div", { className: "shrink-0 border-t border-tp-slate-200 bg-white px-[20px] py-[14px]", children:
                        _jsx("button", { type: "button", disabled: !canBook, onClick: handleBook, className: "h-[44px] w-full rounded-[10px] bg-tp-blue-600 font-['Inter',sans-serif] text-[14px] font-semibold text-white hover:bg-tp-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors", children: "Book Appointment" }) }),
                ],
            }),
        }),
    ] });
}
