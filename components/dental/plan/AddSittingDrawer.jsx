"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer";
import { usePlanContext } from "./plan-context";
import { DrawerHeader } from "./plan-shared";
import { genId } from "./plan-types";

const DOCTORS = ["Dr. Sheela B R", "Dr. Shyam GR", "Dr. Riya Kapoor"];

const INPUT_CLASS = "w-full h-[42px] rounded-[10px] border border-tp-slate-200 bg-white px-[14px] font-sans text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors";
const LABEL_CLASS = "block font-sans text-[12px] font-semibold text-tp-slate-600 mb-[6px]";

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
    const [date, setDate] = useState(new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }));
    const [doctor, setDoctor] = useState(DOCTORS[0]);
    const [notes, setNotes] = useState("");
    const resetForm = () => {
        setDate(new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }));
        setDoctor(DOCTORS[0]);
        setNotes("");
    };
    useEffect(() => {
        if (!isOpen) return;
        if (isEdit && editingSitting) {
            setDate(editingSitting.date);
            setDoctor(editingSitting.doctor);
            setNotes(editingSitting.notes ?? "");
            return;
        }
        resetForm();
    }, [isOpen, isEdit, editingSitting]);
    const handleAdd = () => {
        if (!serviceId) return;
        if (isEdit && sittingId) {
            dispatch({
                type: "UPDATE_SITTING",
                serviceId,
                sittingId,
                patch: { date, doctor, notes: notes.trim() || undefined },
            });
        } else {
            dispatch({
                type: "ADD_SITTING",
                serviceId,
                sitting: {
                    id: genId("sit"),
                    date: date || new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                    doctor,
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
            size: "md",
            className: "!rounded-none",
            style: { background: "#F4F5F7" },
            children: [
                _jsx(DrawerHeader, {
                    title: isEdit ? "Edit Sitting" : "Add Sitting",
                    onClose: closeDrawer,
                    action: _jsx("button", {
                        type: "button",
                        onClick: handleAdd,
                        className: "h-[42px] min-w-[120px] rounded-[10px] px-[20px] font-sans text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 transition-colors shadow-sm",
                        children: isEdit ? "Save Sitting" : "Add Sitting",
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
                                    children: service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi} — ${service.toothLabel}`,
                                }),
                                _jsxs("p", {
                                    className: "font-sans text-[12px] text-tp-blue-400 mt-[2px]",
                                    children: ["Current sittings: ", service.sittings.length],
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            children: [
                                _jsx("label", { className: LABEL_CLASS, children: "Date" }),
                                _jsx("input", {
                                    type: "text",
                                    value: date,
                                    onChange: (e) => setDate(e.target.value),
                                    placeholder: "e.g. 14 Apr 2026",
                                    className: INPUT_CLASS,
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            children: [
                                _jsx("label", { className: LABEL_CLASS, children: "Doctor" }),
                                _jsx("select", {
                                    value: doctor,
                                    onChange: (e) => setDoctor(e.target.value),
                                    className: INPUT_CLASS,
                                    children: DOCTORS.map((d) => _jsx("option", { value: d, children: d }, d)),
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            children: [
                                _jsx("label", { className: LABEL_CLASS, children: "Notes" }),
                                _jsx("textarea", {
                                    value: notes,
                                    onChange: (e) => setNotes(e.target.value),
                                    placeholder: "What was done in this sitting...",
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
