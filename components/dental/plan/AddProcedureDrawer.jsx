"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * AddProcedureDrawer — Add sub-procedures to a service.
 * Follows the examination procedures pattern: search → select → table with doctor/date/notes.
 */
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Trash2 } from "lucide-react";
import { Calendar } from "iconsax-reactjs";
import { TPDrawer, TPDrawerContent, } from "@/components/tp-ui/tp-drawer";
import { usePlanContext } from "./plan-context";
import { DrawerHeader } from "./plan-shared";
import { genId } from "./plan-types";
import { createPortal } from "react-dom";
const DOCTORS = ["Dr. Sheela B R", "Dr. Shyam GR", "Dr. Riya Kapoor"];
// Common dental procedures for search
const PROCEDURE_CATALOG = [
    "Access Opening",
    "Canal Shaping",
    "Obturation",
    "BMP Placement",
    "Crown Preparation",
    "Impression Taking",
    "Crown Cementation",
    "Temporary Crown",
    "Post & Core",
    "Tooth Preparation",
    "Composite Layering",
    "Etching & Bonding",
    "Suture Placement",
    "Suture Removal",
    "Incision & Drainage",
    "Flap Elevation",
    "Bone Grafting",
    "Socket Preservation",
    "Splinting",
    "Occlusal Adjustment",
];
export function AddProcedureDrawer() {
    const searchParams = useSearchParams();
    const { state, dispatch, closeDrawer, findService } = usePlanContext();
    const drawer = state.drawer;
    const isAdd = drawer.type === "add-procedure";
    const isEdit = drawer.type === "edit-procedure";
    const isOpen = isAdd || isEdit;
    const serviceId = isOpen ? drawer.serviceId : undefined;
    const procedureId = isEdit ? drawer.procedureId : undefined;
    const service = serviceId ? findService(serviceId) : undefined;
    const editingProcedure = procedureId ? service?.procedures.find((p) => p.id === procedureId) : undefined;
    const [rows, setRows] = useState([]);
    const [activeCell, setActiveCell] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const setCellActive = useCallback((rowId, colKey) => {
        setActiveCell({ rowId, colKey });
    }, []);
    const clearCellActive = useCallback((rowId, colKey) => {
        window.setTimeout(() => {
            setActiveCell((current) => current && current.rowId === rowId && current.colKey === colKey ? null : current);
        }, 80);
    }, []);
    const isCellActive = useCallback((rowId, colKey) => activeCell?.rowId === rowId && activeCell?.colKey === colKey, [activeCell]);
    useEffect(() => {
        if (isOpen) {
            if (isEdit && editingProcedure) {
                setRows([
                    {
                        id: editingProcedure.id,
                        name: editingProcedure.name,
                        doctor: editingProcedure.doctor,
                        date: editingProcedure.date,
                        notes: editingProcedure.notes ?? "",
                        status: editingProcedure.status ?? "in-progress",
                    },
                ]);
            }
            else {
                setRows([]);
            }
            setSearchQuery("");
            setSearchOpen(false);
        }
    }, [isOpen, isEdit, editingProcedure]);
    useEffect(() => {
        if (!isOpen)
            return;
        if (searchParams?.get("overlay") !== "procedure-search")
            return;
        setSearchQuery("Cr");
        setHighlightedIndex(0);
        setSearchOpen(true);
        searchRef.current?.focus();
    }, [isOpen, searchParams]);
    const filteredProcedures = useMemo(() => {
        return PROCEDURE_CATALOG.filter((p) => {
            if (!searchQuery.trim())
                return true;
            return p.toLowerCase().includes(searchQuery.toLowerCase());
        }).slice(0, 8);
    }, [searchQuery]);
    useEffect(() => {
        if (!searchOpen || !searchRef.current)
            return;
        const rect = searchRef.current.getBoundingClientRect();
        setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }, [searchOpen, searchQuery]);
    useEffect(() => {
        if (!searchOpen)
            return;
        const handler = (e) => {
            if (searchRef.current?.contains(e.target))
                return;
            if (dropdownRef.current?.contains(e.target))
                return;
            setSearchOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [searchOpen]);
    const addProcedure = (name) => {
        setRows((prev) => [
            ...prev,
            {
                id: genId("proc-row"),
                name,
                doctor: DOCTORS[0],
                date: "",
                notes: "",
                status: "not-started",
            },
        ]);
        setSearchQuery("");
        setSearchOpen(false);
        searchRef.current?.focus();
    };
    const updateRow = (id, patch) => {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    };
    const removeRow = (id) => {
        setRows((prev) => prev.filter((r) => r.id !== id));
    };
    const handleSearchKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => Math.min(prev + 1, filteredProcedures.length - 1));
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            if (searchQuery.trim() && filteredProcedures.length === 0) {
                addProcedure(searchQuery.trim());
            }
            else if (filteredProcedures[highlightedIndex]) {
                addProcedure(filteredProcedures[highlightedIndex]);
            }
        }
        else if (e.key === "Escape") {
            setSearchOpen(false);
        }
    };
    const handleSave = () => {
        if (!serviceId || rows.length === 0)
            return;
        if (isEdit && procedureId) {
            const row = rows[0];
            dispatch({
                type: "UPDATE_SUB_PROCEDURE",
                serviceId,
                procedureId,
                patch: {
                    name: row.name,
                    date: row.date,
                    doctor: row.doctor,
                    notes: row.notes.trim() || undefined,
                    status: row.status,
                },
            });
        }
        else {
            for (const row of rows) {
                dispatch({
                    type: "ADD_SUB_PROCEDURE",
                    serviceId,
                    procedure: {
                        id: genId("proc"),
                        name: row.name,
                        date: row.date,
                        doctor: row.doctor,
                        notes: row.notes.trim() || undefined,
                        status: row.status,
                    },
                });
            }
        }
        closeDrawer();
        setRows([]);
    };
    return (_jsxs(TPDrawer, { open: isOpen, onOpenChange: (open) => !open && closeDrawer(), children: [_jsxs(TPDrawerContent, { side: "right", size: "full", className: "!rounded-none !sm:max-w-[65vw]", style: { background: "#F4F5F7" }, children: [_jsx(DrawerHeader, { title: isEdit ? "Edit Procedure" : "Add Procedures", onClose: closeDrawer, action: _jsx("button", { type: "button", onClick: handleSave, disabled: rows.length === 0, className: "h-[42px] min-w-[120px] rounded-[10px] px-[20px] font-sans text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm", children: isEdit ? "Save Procedure" : "Add Procedures" }) }), _jsxs("div", { className: "flex-1 overflow-y-auto px-[20px] py-[16px] space-y-[14px]", style: { background: "#F4F5F7" }, children: [service && (_jsxs("div", { className: "rounded-[10px] bg-tp-blue-50 px-[12px] py-[10px]", children: [_jsx("p", { className: "font-sans text-[14px] font-semibold text-tp-blue-700", children: service.treatment }), _jsx("p", { className: "font-sans text-[12px] text-tp-blue-500", children: service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi} — ${service.toothLabel}` })] })), _jsxs("div", { className: "rounded-[16px] border border-tp-slate-100 bg-white", children: [rows.length > 0 && (_jsx("div", { className: "px-[14px] py-[12px]", children: _jsx("div", { className: "overflow-x-auto rounded-[12px] border border-tp-slate-200", children: _jsxs("table", { className: "w-full min-w-[760px] table-fixed font-['Inter',sans-serif] text-[14px]", children: [_jsxs("colgroup", { children: [_jsx("col", { style: { width: 36, minWidth: 36 } }), _jsx("col", { style: { minWidth: 180 } }), _jsx("col", { style: { width: 170, minWidth: 150 } }), _jsx("col", { style: { width: 130, minWidth: 120 } }), _jsx("col", { style: { minWidth: 140 } }), _jsx("col", { style: { width: 130, minWidth: 120 } }), _jsx("col", { style: { width: 44, minWidth: 44, maxWidth: 44 } })] }), _jsx("thead", { children: _jsxs("tr", { className: "h-[38px] bg-tp-slate-50 text-left font-['Inter',sans-serif] text-[12px] text-tp-slate-500", children: [_jsx("th", { className: "border-r border-tp-slate-100 px-0 py-2 text-center font-semibold" }), _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Procedure" }), _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Doctor" }), _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Date" }), _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Note" }), _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Status" }), _jsx("th", { className: "sticky right-0 z-40 border-l border-tp-slate-200/80 bg-tp-slate-50 px-0 py-2 text-center font-semibold shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]" })] }) }), _jsx("tbody", { children: rows.map((row) => {
                                                            const isDoctorActive = isCellActive(row.id, "doctor");
                                                            const isDateActive = isCellActive(row.id, "date");
                                                            const isNoteActive = isCellActive(row.id, "note");
                                                            return (_jsxs("tr", { className: "border-t border-tp-slate-100 bg-white align-middle", children: [_jsx("td", { className: "border-r border-tp-slate-100 p-0 text-center align-middle transition-colors hover:bg-tp-slate-100/60", children: _jsx("span", { className: "inline-flex h-[52px] w-full items-center justify-center text-tp-slate-300", children: _jsxs("svg", { width: "8", height: "16", viewBox: "0 0 8 16", fill: "currentColor", children: [_jsx("circle", { cx: "2", cy: "3", r: "1.2" }), _jsx("circle", { cx: "2", cy: "8", r: "1.2" }), _jsx("circle", { cx: "2", cy: "13", r: "1.2" }), _jsx("circle", { cx: "6", cy: "3", r: "1.2" }), _jsx("circle", { cx: "6", cy: "8", r: "1.2" }), _jsx("circle", { cx: "6", cy: "13", r: "1.2" })] }) }) }), _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx("div", { className: "flex h-[52px] items-center px-[12px]", children: _jsx("p", { className: "font-['Inter',sans-serif] text-[14px] font-medium text-[#454551] truncate", children: row.name }) }) }), _jsxs("td", { className: `relative border-r border-tp-slate-100 p-0 ${isDoctorActive ? "bg-tp-blue-50/20" : ""}`, children: [isDoctorActive ? _jsx("span", { className: "pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" }) : null, _jsx("select", { value: row.doctor, onChange: (e) => updateRow(row.id, { doctor: e.target.value }), onFocus: () => setCellActive(row.id, "doctor"), onBlur: () => clearCellActive(row.id, "doctor"), className: "relative z-20 h-[52px] w-full border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] focus:outline-none focus:ring-0 rounded-none", children: DOCTORS.map((d) => (_jsx("option", { value: d, children: d }, d))) })] }), _jsxs("td", { className: `relative border-r border-tp-slate-100 p-0 ${isDateActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`, children: [isDateActive ? _jsx("span", { className: "pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" }) : null, _jsxs("div", { className: "relative h-[52px] w-full", children: [!row.date && (_jsxs("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-between px-[12px]", children: [_jsx("span", { className: "font-['Inter',sans-serif] text-[12px] leading-[18px] text-[#a2a2a8]", children: "DD/MM/YYYY" }), _jsx(Calendar, { size: 14, color: "#94a3b8", variant: "Linear" })] })), _jsx("input", { type: "date", value: row.date, onChange: (e) => updateRow(row.id, { date: e.target.value }), onFocus: () => setCellActive(row.id, "date"), onBlur: () => clearCellActive(row.id, "date"), className: `relative z-20 h-[52px] w-full border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] ${row.date ? "text-[#454551]" : "text-transparent"} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer focus:outline-none focus:ring-0 rounded-none cursor-pointer` })] })] }), _jsxs("td", { className: `relative p-0 ${isNoteActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`, children: [isNoteActive ? _jsx("span", { className: "pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" }) : null, _jsx("input", { type: "text", value: row.notes, onChange: (e) => updateRow(row.id, { notes: e.target.value }), onFocus: () => setCellActive(row.id, "note"), onBlur: () => clearCellActive(row.id, "note"), placeholder: "e.g. Use RVG before obturation", className: "relative z-20 h-[52px] w-full border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] placeholder:text-[#a2a2a8] focus:outline-none focus:ring-0 rounded-none" })] }), _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsxs("select", { value: row.status, onChange: (e) => updateRow(row.id, { status: e.target.value }), className: "h-[52px] w-full border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[13px] leading-[20px] text-[#454551] focus:outline-none focus:ring-0 rounded-none", children: [_jsx("option", { value: "not-started", children: "Not Started" }), _jsx("option", { value: "in-progress", children: "In Progress" }), _jsx("option", { value: "completed", children: "Completed" }), _jsx("option", { value: "no-show", children: "Patient No Show" }), _jsx("option", { value: "not-interested", children: "Patient Not Interested" })] }) }), _jsx("td", { className: "sticky right-0 z-30 border-l border-tp-slate-200/80 bg-white p-0 shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]", children: _jsx("div", { className: "flex h-[52px] items-center justify-center", children: _jsx("button", { type: "button", onClick: () => removeRow(row.id), className: "flex h-[28px] w-[28px] items-center justify-center rounded-[6px] text-tp-slate-400 hover:text-tp-error-500 hover:bg-tp-error-50 transition-colors", children: _jsx(Trash2, { size: 20 }) }) }) })] }, row.id));
                                                        }) })] }) }) })), !isEdit && (_jsxs("div", { className: `px-[14px] py-[12px] ${rows.length > 0 ? "border-t border-tp-slate-100" : ""}`, children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { size: 16, strokeWidth: 1.5, className: "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-tp-slate-400" }), _jsx("input", { ref: searchRef, type: "text", value: searchQuery, onChange: (e) => {
                                                            setSearchQuery(e.target.value);
                                                            setSearchOpen(true);
                                                            setHighlightedIndex(0);
                                                        }, onFocus: () => setSearchOpen(true), onKeyDown: handleSearchKeyDown, placeholder: "Search procedures \u2014 e.g., Obturation, Crown Prep...", className: "w-full h-[42px] rounded-[10px] border border-tp-slate-200 bg-white pl-10 pr-3 text-[14px] font-sans text-tp-slate-700 placeholder:text-tp-slate-300 transition-colors hover:border-tp-slate-300 focus:border-tp-blue-500 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20" })] }), !searchOpen && (_jsx("div", { className: "mt-[10px] flex flex-wrap gap-[6px]", children: PROCEDURE_CATALOG.slice(0, 8).map((p) => (_jsx("button", { type: "button", onClick: () => addProcedure(p), className: "inline-flex h-[30px] items-center rounded-[10px] bg-tp-slate-100 px-[12px] font-sans text-[12px] font-medium text-tp-slate-600 hover:bg-tp-slate-200 transition-colors", children: p }, p))) }))] }))] })] })] }), !isEdit && searchOpen && mounted && filteredProcedures.length > 0 && createPortal(_jsx("div", { ref: dropdownRef, style: {
                    position: "fixed",
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: dropdownPos.width,
                    zIndex: 9999,
                }, className: "rounded-[10px] border border-tp-slate-200 bg-white shadow-lg overflow-hidden", children: _jsx("div", { className: "max-h-[200px] overflow-y-auto", children: filteredProcedures.map((p, i) => (_jsx("button", { type: "button", onClick: () => addProcedure(p), className: `w-full flex items-center px-[12px] py-[8px] text-left transition-colors ${i === highlightedIndex ? "bg-tp-blue-50" : "hover:bg-tp-slate-50"}`, children: _jsx("p", { className: "font-sans text-[12px] font-medium text-tp-slate-800", children: p }) }, p))) }) }), document.body)] }));
}
