"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer";
import { Calendar2 } from "iconsax-reactjs";
import { usePlanContext } from "./plan-context";
import { DrawerHeader } from "./plan-shared";
import { genId } from "./plan-types";
import {
    saveBookedAppointment,
    updateBookedAppointment,
} from "@/components/tp-appointment-screen/booked-appointments-store";

const DOCTORS = ["Dr. Sheela B R", "Dr. Shyam GR", "Dr. Riya Kapoor"];
const PATIENT_CATEGORIES = [
    { value: "new", label: "New Patient" },
    { value: "returning", label: "Returning Patient" },
    { value: "follow-up", label: "Follow-up" },
    { value: "referral", label: "Referral" },
];
const CASE_TYPES = [
    { value: "consultation", label: "Consultation" },
    { value: "procedure", label: "Procedure" },
    { value: "review", label: "Review / Check-up" },
    { value: "emergency", label: "Emergency" },
    { value: "follow-up", label: "Follow-up" },
];

const INPUT_CLASS = "w-full h-[42px] rounded-[10px] border border-tp-slate-200 bg-white px-[14px] font-sans text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors";
const LABEL_CLASS = "block font-sans text-[12px] font-semibold text-tp-slate-600 mb-[6px]";

export function BookAppointmentDrawer() {
    const { state, closeDrawer, findService, findPlanForService, dispatch, patientId } = usePlanContext();
    const drawer = state.drawer;
    const isOpen = drawer.type === "book-appointment";
    const serviceId = isOpen ? drawer.serviceId : undefined;
    const appointmentId = isOpen ? drawer.appointmentId : undefined;
    const service = serviceId ? findService(serviceId) : undefined;
    const editingAppointment = appointmentId
        ? service?.appointments?.find((a) => a.id === appointmentId)
        : undefined;
    const [patientCategory, setPatientCategory] = useState("returning");
    const [caseType, setCaseType] = useState("consultation");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [doctor, setDoctor] = useState("");
    const [notes, setNotes] = useState("");

    const resetForm = () => {
        setPatientCategory("returning");
        setCaseType("consultation");
        setDate("");
        setTime("");
        setDoctor("");
        setNotes("");
    };

    useEffect(() => {
        if (!isOpen) return;
        if (editingAppointment) {
            setDate(editingAppointment.date);
            setTime(editingAppointment.time);
            setDoctor(editingAppointment.doctor);
            setNotes(editingAppointment.notes ?? "");
            setPatientCategory(editingAppointment.patientCategory ?? "returning");
            setCaseType(editingAppointment.caseType ?? "consultation");
            return;
        }
        resetForm();
    }, [isOpen, editingAppointment]);

    const handleBook = () => {
        if (!serviceId) return;
        const plan = findPlanForService(serviceId);
        const resolvedPatientId = plan?.patientId ?? patientId;
        if (editingAppointment) {
            dispatch({
                type: "UPDATE_APPOINTMENT",
                serviceId,
                appointmentId: editingAppointment.id,
                patch: {
                    date,
                    time,
                    doctor,
                    notes: notes.trim() || undefined,
                    patientCategory,
                    caseType,
                    status: "scheduled",
                    cancellationReason: undefined,
                },
            });
            updateBookedAppointment(editingAppointment.id, {
                date,
                time,
                doctor,
                notes: notes.trim() || undefined,
            });
        } else {
            const newId = genId("appt");
            dispatch({
                type: "ADD_APPOINTMENT",
                serviceId,
                appointment: {
                    id: newId,
                    date,
                    time,
                    doctor,
                    notes: notes.trim() || undefined,
                    patientCategory,
                    caseType,
                    status: "scheduled",
                },
            });
            if (resolvedPatientId) {
                saveBookedAppointment({
                    id: newId,
                    patientId: resolvedPatientId,
                    serviceId,
                    serviceName: service?.treatment,
                    toothLabel: service?.toothFdi === "full-mouth"
                        ? "Full Mouth"
                        : service ? `T${service.toothFdi} — ${service.toothLabel}` : undefined,
                    date,
                    time,
                    doctor,
                    notes: notes.trim() || undefined,
                    createdAt: new Date().toISOString(),
                });
            }
        }
        closeDrawer();
        resetForm();
    };

    const timeSlots = ["10:00 AM", "10:30 AM", "11:15 AM", "12:00 PM", "02:30 PM", "03:45 PM", "05:00 PM", "06:15 PM"];

    return _jsx(TPDrawer, {
        open: isOpen,
        onOpenChange: (open) => !open && closeDrawer(),
        children: _jsxs(TPDrawerContent, {
            side: "right",
            size: "md",
            className: "!rounded-none",
            style: { background: "#F4F5F7" },
            children: [
                _jsx(DrawerHeader, {
                    title: editingAppointment ? "Reschedule Appointment" : "Book Appointment",
                    onClose: closeDrawer,
                    action: _jsxs("button", {
                        type: "button",
                        onClick: handleBook,
                        disabled: !doctor || !date || !time,
                        className: "inline-flex h-[42px] min-w-[120px] items-center justify-center gap-[6px] rounded-[10px] px-[20px] font-sans text-[14px] font-semibold leading-none text-white bg-tp-blue-600 hover:bg-tp-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm",
                        children: [
                            _jsx(Calendar2, { size: 16, variant: "Linear", className: "shrink-0" }),
                            _jsx("span", { className: "leading-none", children: editingAppointment ? "Save" : "Book" }),
                        ],
                    }),
                }),
                _jsxs("div", {
                    className: "flex-1 overflow-y-auto px-[24px] py-[16px] space-y-[14px]",
                    style: { background: "#F4F5F7" },
                    children: [
                        service && _jsxs("div", {
                            className: "rounded-[10px] bg-tp-blue-50 px-[12px] py-[10px]",
                            children: [
                                _jsx("p", { className: "font-sans text-[14px] font-semibold text-tp-blue-700", children: service.treatment }),
                                _jsx("p", {
                                    className: "font-sans text-[12px] text-tp-blue-500",
                                    children: service.toothFdi === "full-mouth"
                                        ? "Full Mouth"
                                        : `T${service.toothFdi} — ${service.toothLabel}`,
                                }),
                            ],
                        }),
                        !service && _jsx("div", {
                            className: "rounded-[10px] bg-tp-slate-50 px-[12px] py-[10px]",
                            children: _jsx("p", {
                                className: "font-sans text-[14px] text-tp-slate-500 italic",
                                children: "Open appointment booking module to schedule visits for this patient.",
                            }),
                        }),
                        _jsxs("div", {
                            className: "grid grid-cols-2 gap-[12px]",
                            children: [
                                _jsxs("div", {
                                    children: [
                                        _jsxs("label", { className: LABEL_CLASS, children: ["Patient Category ", _jsx("span", { className: "text-tp-error-500", children: "*" })] }),
                                        _jsx("select", {
                                            value: patientCategory,
                                            onChange: (e) => setPatientCategory(e.target.value),
                                            className: INPUT_CLASS,
                                            children: PATIENT_CATEGORIES.map((c) => _jsx("option", { value: c.value, children: c.label }, c.value)),
                                        }),
                                    ],
                                }),
                                _jsxs("div", {
                                    children: [
                                        _jsxs("label", { className: LABEL_CLASS, children: ["Case Type ", _jsx("span", { className: "text-tp-error-500", children: "*" })] }),
                                        _jsx("select", {
                                            value: caseType,
                                            onChange: (e) => setCaseType(e.target.value),
                                            className: INPUT_CLASS,
                                            children: CASE_TYPES.map((c) => _jsx("option", { value: c.value, children: c.label }, c.value)),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            children: [
                                _jsxs("label", { className: LABEL_CLASS, children: ["Doctor ", _jsx("span", { className: "text-tp-error-500", children: "*" })] }),
                                _jsxs("select", {
                                    value: doctor,
                                    onChange: (e) => { setDoctor(e.target.value); setTime(""); },
                                    className: INPUT_CLASS,
                                    children: [
                                        _jsx("option", { value: "", disabled: true, children: "Select doctor" }),
                                        ...DOCTORS.map((d) => _jsx("option", { value: d, children: d }, d)),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            children: [
                                _jsxs("label", { className: LABEL_CLASS, children: ["Date ", _jsx("span", { className: "text-tp-error-500", children: "*" })] }),
                                _jsx("input", {
                                    type: "date",
                                    value: date,
                                    onChange: (e) => { setDate(e.target.value); setTime(""); },
                                    disabled: !doctor,
                                    className: INPUT_CLASS,
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            children: [
                                _jsxs("label", { className: LABEL_CLASS, children: ["Available Time Slots ", _jsx("span", { className: "text-tp-error-500", children: "*" })] }),
                                !doctor || !date
                                    ? _jsx("div", {
                                        className: "flex h-[80px] w-full items-center justify-center rounded-[10px] border border-dashed border-tp-slate-200 bg-white",
                                        children: _jsx("p", {
                                            className: "font-sans text-[12px] text-tp-slate-400",
                                            children: "Select doctor and date to view available time slots.",
                                        }),
                                    })
                                    : _jsx("div", {
                                        className: "grid grid-cols-3 gap-[8px]",
                                        children: timeSlots.map((slot) => _jsx("button", {
                                            type: "button",
                                            onClick: () => setTime(slot),
                                            className: `h-[38px] rounded-[10px] font-sans text-[13px] font-medium transition-colors ${time === slot
                                                ? "bg-tp-blue-600 text-white border-transparent"
                                                : "bg-white text-tp-slate-600 border border-tp-slate-200 hover:border-tp-blue-400 hover:text-tp-blue-600"}`,
                                            children: slot,
                                        }, slot)),
                                    }),
                            ],
                        }),
                        _jsxs("div", {
                            children: [
                                _jsx("label", { className: LABEL_CLASS, children: "Notes" }),
                                _jsx("textarea", {
                                    value: notes,
                                    onChange: (e) => setNotes(e.target.value),
                                    placeholder: "Additional notes...",
                                    rows: 3,
                                    className: "w-full rounded-[10px] border border-tp-slate-200 bg-white px-[14px] py-[10px] font-sans text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors resize-none",
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
    });
}
