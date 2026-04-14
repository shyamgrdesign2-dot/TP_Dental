"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * AddEditPlanDrawer — Create or edit a treatment plan.
 *
 * Layout:
 *   - Header: [✕ close] | divider (full height) | "Create Treatment Plan" | [Create Plan CTA]
 *   - Plan Name: simple input (flush with header, no gap) — h-[42px]
 *   - Services: cluster card matching EntryTab procedures table
 *     - Table with padding, corner radius, stroke (NOT edge-to-edge)
 *     - ToothPicker styled like SurfacePicker (no inner border)
 *     - SurfacePicker dropdown uses createPortal to avoid clipping
 *     - All row heights h-[42px]
 *   - Sticky bottom: Total estimate
 *   - Background: bg-tp-slate-100
 */
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Search, Trash2 } from "lucide-react";
import { Grid5, Ram, Eraser, ArrowDown2, ArrowUp2, InfoCircle } from "iconsax-reactjs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { createPortal } from "react-dom";
import { TPDrawer, TPDrawerContent, } from "@/components/tp-ui/tp-drawer";
import { TPMedicalIcon } from "@/components/tp-ui/medical-icons/TPMedicalIcon";
import { usePlanContext } from "./plan-context";
import { DrawerHeader, formatINR, PlanSurfaceAbbrTags } from "./plan-shared";
import { genId } from "./plan-types";
import { SURFACE_OPTIONS, SURFACE_COLORS, SURFACE_ABBR, getDefaultPlanSurfaces } from "./plan-types";
import { TREATMENT_CATALOG, getRate } from "./treatments";
import { ToothPicker } from "./ToothPicker";
import { fdiToLabel, buildExamSuggestions } from "./exam-suggestions";
function createRow(treatment, teeth = [], surfaces = []) {
    return {
        id: genId("row"),
        treatment,
        teeth,
        surfaces: surfaces.length > 0 ? surfaces : getDefaultPlanSurfaces(treatment),
        rate: getRate(treatment),
        discount: 0,
        discountType: "flat",
        procedureDate: "",
        notes: "",
    };
}
// ─── Surface picker (portal-based dropdown to avoid clipping) ─
function SurfacePicker({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);
    const [dropdownStyle, setDropdownStyle] = useState({});
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const openDropdown = useCallback(() => {
        if (!triggerRef.current)
            return;
        const rect = triggerRef.current.getBoundingClientRect();
        const dropdownWidth = 260;
        const viewportWidth = window.innerWidth;
        let left = rect.left;
        if (left + dropdownWidth > viewportWidth - 12) {
            left = viewportWidth - dropdownWidth - 12;
        }
        setDropdownStyle({
            position: "fixed",
            top: rect.bottom + 4,
            left,
            zIndex: 9999,
            minWidth: dropdownWidth,
            pointerEvents: "auto",
        });
        setOpen(true);
    }, []);
    useEffect(() => {
        if (!open)
            return;
        const handler = (e) => {
            if (triggerRef.current?.contains(e.target))
                return;
            if (dropdownRef.current?.contains(e.target))
                return;
            setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);
    useEffect(() => {
        if (!open)
            return;
        const reposition = () => openDropdown();
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
        return () => {
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [open, openDropdown]);
    const toggle = (id) => {
        if (id === "whole") {
            onChange(value.includes("whole") ? [] : ["whole"]);
            return;
        }
        const selected = new Set(value);
        if (selected.has("whole"))
            selected.delete("whole");
        if (selected.has(id))
            selected.delete(id);
        else
            selected.add(id);
        onChange(Array.from(selected));
    };
    const dropdown = open ? (_jsxs("div", { ref: dropdownRef, style: dropdownStyle, className: "rounded-[12px] border border-tp-slate-200 bg-white py-[6px] shadow-[0_18px_50px_-18px_rgba(15,23,42,0.28)]", children: [_jsx("div", { className: "px-[10px] pb-[6px]", children: _jsxs("div", { className: "flex items-center gap-[6px] rounded-[8px] bg-tp-amber-50 px-[10px] py-[7px]", children: [_jsx("span", { className: "h-[8px] w-[8px] rounded-full bg-tp-amber-500" }), _jsx("span", { className: "font-sans text-[12px] text-tp-amber-800", children: "Select whole tooth or mix individual surfaces" })] }) }), SURFACE_OPTIONS.map((opt, index) => {
                const selected = value.includes(opt.id);
                return (_jsxs("button", { type: "button", onClick: () => toggle(opt.id), className: `mx-auto flex items-center gap-[10px] rounded-[8px] px-[12px] py-[8px] text-left font-sans text-[13px] transition-colors ${selected ? "bg-tp-blue-50 text-tp-slate-800" : "text-tp-slate-600 hover:bg-tp-slate-50"} ${index === 1 ? "mt-[2px] border-t border-tp-slate-100 pt-[10px]" : ""}`, style: { width: "calc(100% - 4px)" }, children: [_jsx("span", { className: `inline-flex h-[16px] w-[16px] items-center justify-center rounded-[4px] border ${selected ? "border-tp-blue-500 bg-tp-blue-500" : "border-tp-slate-300 bg-white"}`, children: selected ? (_jsx("svg", { width: "9", height: "9", viewBox: "0 0 10 10", fill: "none", children: _jsx("path", { d: "M2 5L4 7L8 3", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) })) : null }), _jsx("span", { className: "h-[10px] w-[10px] rounded-full flex-shrink-0", style: { background: SURFACE_COLORS[opt.id] } }), _jsx("span", { className: "flex-1", children: opt.label }), _jsx("span", { className: "font-sans text-[11px] font-semibold text-tp-slate-400", children: opt.abbr })] }, opt.id));
            })] })) : null;
    return (_jsxs(_Fragment, { children: [_jsxs("button", { ref: triggerRef, type: "button", onClick: (e) => { e.stopPropagation(); open ? setOpen(false) : openDropdown(); }, className: "flex h-[52px] w-full items-center justify-between gap-[8px] bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] transition-colors focus:outline-none", children: [_jsx("span", { className: "min-w-0 flex-1 text-left", children: value.length > 0 ? _jsx(PlanSurfaceAbbrTags, { surfaces: value, gapClass: "gap-[4px]" }) : _jsx("span", { className: "text-[12px] text-[#a2a2a8]", children: "Select surface" }) }), _jsx(ArrowDown2, { size: 14, color: "currentColor", variant: "Linear" })] }), mounted && typeof document !== "undefined" && dropdown
                ? createPortal(dropdown, document.body)
                : null] }));
}
// ─── Component ──────────────────────────────────────────────
export function AddEditPlanDrawer() {
    const { state, dispatch, closeDrawer, patientId: planPatientId } = usePlanContext();
    const drawer = state.drawer;
    const isOpen = drawer.type === "add-plan" || drawer.type === "edit-plan";
    const isEdit = drawer.type === "edit-plan";
    const editPlanId = isEdit ? drawer.planId : null;
    const editPlan = editPlanId ? state.plans.find((p) => p.id === editPlanId) : null;
    const [planName, setPlanName] = useState("");
    const [rows, setRows] = useState([]);
    // Active-cell state — gives each Services-table cell an input-shell
    // focus ring matching the TP design system (see AddProcedureDrawer).
    const [activeCell, setActiveCell] = useState(null);
    const setCellActive = useCallback((rowId, colKey) => {
        setActiveCell({ rowId, colKey });
    }, []);
    const clearCellActive = useCallback((rowId, colKey) => {
        window.setTimeout(() => {
            setActiveCell((current) => current && current.rowId === rowId && current.colKey === colKey ? null : current);
        }, 80);
    }, []);
    const isCellActive = useCallback((rowId, colKey) => activeCell?.rowId === rowId && activeCell?.colKey === colKey, [activeCell]);
    // Search state
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const patientId = planPatientId ?? state.plans[0]?.patientId ?? "apt-1";
    const [examSuggestionTick, setExamSuggestionTick] = useState(0);
    useEffect(() => {
        if (!isOpen || typeof window === "undefined")
            return;
        const id = window.setInterval(() => setExamSuggestionTick((t) => t + 1), 700);
        const onChart = (e) => {
            if (e.detail?.patientId === patientId)
                setExamSuggestionTick((t) => t + 1);
        };
        window.addEventListener("dental-exam-chart-updated", onChart);
        return () => {
            window.clearInterval(id);
            window.removeEventListener("dental-exam-chart-updated", onChart);
        };
    }, [isOpen, patientId]);
    const examSuggestions = useMemo(() => buildExamSuggestions(patientId).map((s) => ({
        ...s,
        surfaces: s.surfaces.length > 0 ? s.surfaces : getDefaultPlanSurfaces(s.treatment),
    })), [patientId, examSuggestionTick]);
    // Populate form when editing
    useEffect(() => {
        if (isEdit && editPlan) {
            setPlanName(editPlan.name);
            const grouped = new Map();
            for (const svc of editPlan.services) {
                const existing = grouped.get(svc.treatment);
                if (existing) {
                    existing.teeth.push(svc.toothFdi);
                    for (const s of svc.surfaces) {
                        if (!existing.surfaces.includes(s))
                            existing.surfaces.push(s);
                    }
                }
                else {
                    grouped.set(svc.treatment, {
                        id: genId("row"),
                        treatment: svc.treatment,
                        teeth: [svc.toothFdi],
                        surfaces: [...svc.surfaces],
                        rate: svc.rate,
                        discount: svc.discount,
                        discountType: "flat",
                        procedureDate: svc.procedureDate ?? "",
                        notes: svc.notes ?? "",
                    });
                }
            }
            setRows(grouped.size > 0 ? Array.from(grouped.values()) : []);
        }
        else if (!isEdit && isOpen) {
            setPlanName("");
            setRows([]);
        }
        setSearchQuery("");
        setSearchOpen(false);
    }, [isOpen, isEdit, editPlan]);
    const filteredTreatments = useMemo(() => {
        return TREATMENT_CATALOG.filter((t) => {
            if (!searchQuery.trim())
                return true;
            return t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.category.toLowerCase().includes(searchQuery.toLowerCase());
        }).slice(0, 10);
    }, [searchQuery]);
    const filteredExamSuggestions = useMemo(() => {
        if (!searchQuery.trim())
            return examSuggestions;
        return examSuggestions.filter((s) => s.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.toothLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.hint.toLowerCase().includes(searchQuery.toLowerCase()) ||
            `T${s.toothFdi}`.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, examSuggestions]);
    // Remaining exam suggestions (not yet added)
    const remainingExamSuggestions = useMemo(() => {
        return examSuggestions.filter((sug) => !rows.some((r) => r.treatment === sug.treatment && r.teeth.includes(sug.toothFdi)));
    }, [examSuggestions, rows]);
    // Remaining catalog chips (not yet added)
    const remainingCatalogChips = useMemo(() => {
        return TREATMENT_CATALOG.filter((t) => !rows.some((r) => r.treatment === t.name)).slice(0, 8);
    }, [rows]);
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
    const addTreatmentRow = (treatmentName, teeth = [], surfaces = []) => {
        const nextSurfaces = surfaces.length > 0 ? surfaces : getDefaultPlanSurfaces(treatmentName);
        const exists = rows.find((r) => r.treatment === treatmentName);
        if (!exists) {
            setRows((prev) => [...prev, createRow(treatmentName, teeth, nextSurfaces)]);
        }
        else if (teeth.length > 0) {
            setRows((prev) => prev.map((r) => {
                if (r.treatment !== treatmentName)
                    return r;
                const mergedTeeth = [...new Set([...r.teeth, ...teeth])];
                const mergedSurfaces = [...new Set([...r.surfaces, ...nextSurfaces])];
                return { ...r, teeth: mergedTeeth, surfaces: mergedSurfaces };
            }));
        }
        setSearchQuery("");
        setSearchOpen(false);
        // Don't focus search input — user asked not to activate input on tag click
    };
    const updateRow = (id, patch) => {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    };
    const removeRow = (id) => {
        setRows((prev) => prev.filter((r) => r.id !== id));
    };
    const clearAllRows = () => {
        setRows([]);
    };
    const handleSearchKeyDown = (e) => {
        const showCatalog = searchQuery.trim().length > 0;
        const examCount = filteredExamSuggestions.length;
        const catCount = showCatalog ? filteredTreatments.length : 0;
        const totalItems = examCount + catCount;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (totalItems > 0)
                setHighlightedIndex((prev) => Math.min(prev + 1, totalItems - 1));
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (totalItems > 0)
                setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex < examCount) {
                const sug = filteredExamSuggestions[highlightedIndex];
                if (sug)
                    addTreatmentRow(sug.treatment, [sug.toothFdi], sug.surfaces);
            }
            else if (showCatalog) {
                const catIdx = highlightedIndex - examCount;
                if (filteredTreatments[catIdx]) {
                    addTreatmentRow(filteredTreatments[catIdx].name);
                }
            }
        }
        else if (e.key === "Escape") {
            setSearchOpen(false);
        }
    };
    const computeDiscount = (row) => {
        if (row.discountType === "percent")
            return Math.round(row.rate * row.discount / 100);
        return row.discount;
    };
    const fanOutServices = () => {
        const services = [];
        const planId = editPlanId ?? genId("plan");
        for (const row of rows) {
            if (!row.treatment)
                continue;
            const teeth = row.teeth.length > 0 ? row.teeth : ["full-mouth"];
            const discAmt = computeDiscount(row);
            for (const fdi of teeth) {
                services.push({
                    id: genId("svc"),
                    planId,
                    treatment: row.treatment,
                    toothFdi: fdi,
                    toothLabel: fdiToLabel(fdi),
                    surfaces: [...row.surfaces],
                    rate: row.rate,
                    discount: discAmt,
                    amount: Math.max(0, row.rate - discAmt),
                    status: "planned",
                    sittings: [],
                    procedures: [],
                    procedureDate: row.procedureDate?.trim() || undefined,
                    notes: row.notes?.trim() || undefined,
                });
            }
        }
        return services;
    };
    const handleSave = () => {
        if (!planName.trim() || rows.length === 0)
            return;
        const services = fanOutServices();
        if (isEdit && editPlanId) {
            dispatch({
                type: "UPDATE_PLAN",
                planId: editPlanId,
                patch: { name: planName.trim(), services },
            });
        }
        else {
            const newPlan = {
                id: genId("plan"),
                name: planName.trim(),
                patientId: patientId,
                createdAt: new Date().toISOString().slice(0, 10),
                updatedAt: new Date().toISOString().slice(0, 10),
                status: "draft",
                services: [],
            };
            newPlan.services = services.map((s) => ({ ...s, planId: newPlan.id }));
            dispatch({ type: "ADD_PLAN", plan: newPlan });
        }
        closeDrawer();
    };
    const totalAmount = rows.reduce((sum, r) => {
        const teeth = r.teeth.length || 1;
        const discAmt = computeDiscount(r);
        return sum + Math.max(0, r.rate - discAmt) * teeth;
    }, 0);
    const totalServices = rows.reduce((sum, r) => sum + Math.max(1, r.teeth.length), 0);
    const canSave = planName.trim().length > 0 && rows.length > 0;
    // Validation state
    const [showNameError, setShowNameError] = useState(false);
    const nameInputRef = useRef(null);
    const handleSaveWithValidation = () => {
        if (!planName.trim()) {
            setShowNameError(true);
            nameInputRef.current?.focus();
            return;
        }
        if (rows.length === 0)
            return;
        handleSave();
    };
    // Clear error when user types
    const handleNameChange = (e) => {
        setPlanName(e.target.value);
        if (showNameError && e.target.value.trim())
            setShowNameError(false);
    };
    // Icon button class — same as RxPad SectionHeader
    const iconBtnClass = "inline-flex h-[32px] w-[32px] items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-200 disabled:cursor-not-allowed disabled:opacity-40";
    const showCatalogInDropdown = searchQuery.trim().length > 0;
    const showChartDropdownSection = filteredExamSuggestions.length > 0;
    const showCatalogDropdownSection = showCatalogInDropdown && filteredTreatments.length > 0;
    const showSearchEmptyHint = searchQuery.trim() === "" && !showChartDropdownSection && !showCatalogDropdownSection;
    const showNoMatchHint = showCatalogInDropdown && !showChartDropdownSection && !showCatalogDropdownSection;
    return (_jsxs(TPDrawer, { open: isOpen, onOpenChange: (open) => { if (!open) {
            closeDrawer();
            setShowNameError(false);
        } }, children: [_jsxs(TPDrawerContent, { side: "right", size: "full", className: "!rounded-none !sm:max-w-[85vw]", style: { background: "#F4F5F7" }, children: [_jsx(DrawerHeader, { title: isEdit ? "Edit Plan" : "Create Treatment Plan", onClose: () => { closeDrawer(); setShowNameError(false); }, action: _jsxs("div", { className: "flex items-center gap-[10px]", children: [_jsx("button", { type: "button", title: "Templates", className: iconBtnClass, children: _jsx(Grid5, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("button", { type: "button", title: "Save as template", className: iconBtnClass, children: _jsx(Ram, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("button", { type: "button", title: "Erase", onClick: clearAllRows, disabled: rows.length === 0, className: iconBtnClass, children: _jsx(Eraser, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("div", { className: "w-px self-stretch bg-[linear-gradient(180deg,rgba(226,226,234,0.1)_0%,rgba(226,226,234,1)_50%,rgba(226,226,234,0.1)_100%)] mx-[2px]" }), _jsx("button", { type: "button", onClick: handleSaveWithValidation, className: "h-[42px] min-w-[120px] rounded-[12px] px-[20px] font-sans text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm", children: isEdit ? "Save Changes" : "Create Plan" })] }) }), _jsxs("div", { className: "flex-1 overflow-y-auto px-[24px] pt-[20px] pb-[24px] space-y-[20px]", style: { background: "#F4F5F7" }, children: [_jsxs("div", { children: [_jsxs("label", { className: "block font-sans text-[13px] font-semibold text-tp-slate-600 mb-[6px]", children: ["Plan Name ", _jsx("span", { className: "text-tp-error-500", children: "*" })] }), _jsx("input", { ref: nameInputRef, type: "text", value: planName, onChange: handleNameChange, placeholder: "e.g., Wisdom Tooth Removal", className: `w-full h-[42px] rounded-[10px] border bg-white px-[14px] font-sans text-[14px] text-tp-slate-800 placeholder:text-tp-slate-300 focus:outline-none focus:ring-2 transition-colors ${showNameError
                                            ? "border-tp-error-400 focus:ring-tp-error-500/30 focus:border-tp-error-400"
                                            : "border-tp-slate-200 focus:ring-tp-blue-500/30 focus:border-tp-blue-400"}` }), showNameError && (_jsxs("p", { className: "mt-[6px] font-sans text-[12px] text-tp-error-500 flex items-center gap-[5px]", children: [_jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5" }), _jsx("path", { d: "M12 8v5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }), _jsx("circle", { cx: "12", cy: "16", r: "0.75", fill: "currentColor" })] }), "Please enter a plan name to create a plan."] }))] }), _jsxs("div", { className: "rounded-[16px] bg-white overflow-hidden", children: [_jsxs("header", { className: "flex items-center gap-[10px] px-[16px] py-[14px]", children: [_jsx(TPMedicalIcon, { name: "first-aid", variant: "bulk", size: 22, color: "var(--tp-violet-500)" }), _jsx("h3", { className: "font-sans text-[16px] font-semibold text-tp-slate-900", children: "Services" }), rows.length > 0 && (_jsx("span", { className: "inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-tp-slate-100 px-[6px] font-sans text-[12px] font-bold text-tp-slate-600 tabular-nums", children: rows.length })), _jsxs("div", { className: "ml-auto flex items-center gap-[8px]", children: [_jsx("button", { type: "button", title: "Templates", className: iconBtnClass, children: _jsx(Grid5, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("button", { type: "button", title: "Save as template", className: iconBtnClass, children: _jsx(Ram, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("button", { type: "button", title: "Clear all", onClick: clearAllRows, disabled: rows.length === 0, className: iconBtnClass, children: _jsx(Eraser, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) })] })] }), rows.length > 0 && (_jsx("div", { className: "px-[14px] py-[12px]", children: _jsx("div", { className: "rounded-[10px] border border-tp-slate-200 overflow-hidden w-full overflow-x-auto min-w-0", children: _jsxs("table", { className: "w-full min-w-[1020px] table-fixed font-['Inter',sans-serif] text-[14px]", children: [_jsxs("colgroup", { children: [_jsx("col", { style: { width: 42, minWidth: 42 } }), _jsx("col", { style: { minWidth: 160 } }), _jsx("col", { style: { width: 128, minWidth: 108 } }), _jsx("col", { style: { width: 128, minWidth: 108 } }), _jsx("col", { style: { width: 132, minWidth: 118 } }), _jsx("col", { style: { minWidth: 140 } }), _jsx("col", { style: { width: 96, minWidth: 84 } }), _jsx("col", { style: { width: 76, minWidth: 68 } }), _jsx("col", { style: { width: 92, minWidth: 80 } }), _jsx("col", { style: { width: 48, minWidth: 48, maxWidth: 48 } })] }), _jsx("thead", { children: _jsxs("tr", { className: "h-[38px] bg-tp-slate-50 text-left font-['Inter',sans-serif] text-[12px] text-tp-slate-500", children: [_jsx("th", { className: "border-r border-tp-slate-100 px-0 py-2 text-center font-semibold" }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Service" }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Teeth" }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Surfaces" }), _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Surgery date" }), _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Notes" }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-right font-semibold uppercase tracking-[0.5px]", children: "Rate" }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-right font-semibold uppercase tracking-[0.5px]", children: "Disc." }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-right font-semibold uppercase tracking-[0.5px]", children: "Amount" }), _jsx("th", { className: "sticky right-0 z-40 border-l border-tp-slate-200/80 bg-tp-slate-50 px-0 py-2 text-center font-semibold shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]" })] }) }), _jsx("tbody", { children: rows.map((row, idx) => {
                                                            const teethCount = Math.max(1, row.teeth.length);
                                                            const discAmt = computeDiscount(row);
                                                            const rowAmount = Math.max(0, row.rate - discAmt) * teethCount;
                                                            const isDateActive = isCellActive(row.id, "date");
                                                            const isNoteActive = isCellActive(row.id, "note");
                                                            const isRateActive = isCellActive(row.id, "rate");
                                                            const isDiscActive = isCellActive(row.id, "disc");
                                                            return (_jsxs("tr", { className: "h-[46px] border-t border-tp-slate-100 bg-white align-middle transition-colors duration-150", children: [_jsx("td", { className: "px-4 text-center font-sans text-[13px] text-tp-slate-400 border-r border-tp-slate-100", children: idx + 1 }), _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx("div", { className: "h-[46px] w-full flex items-center px-4", children: _jsx("p", { className: "font-['Inter',sans-serif] text-[14px] font-medium text-tp-slate-800 truncate", children: row.treatment }) }) }), _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx(ToothPicker, { value: row.teeth, onChange: (teeth) => updateRow(row.id, { teeth }), variant: "inline" }) }), _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx(SurfacePicker, { value: row.surfaces, onChange: (surfaces) => updateRow(row.id, { surfaces }) }) }), _jsxs("td", { className: `relative border-r border-tp-slate-100 p-0 ${isDateActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`, children: [isDateActive ? _jsx("span", { className: "pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" }) : null, _jsxs("div", { className: "relative h-[46px] w-full", children: [!row.procedureDate && (_jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center px-[12px]", children: _jsx("span", { className: "font-['Inter',sans-serif] text-[12px] text-[#a2a2a8]", children: "DD/MM/YYYY" }) })), _jsx("input", { type: "date", value: row.procedureDate || "", onChange: (e) => updateRow(row.id, { procedureDate: e.target.value }), onFocus: () => setCellActive(row.id, "date"), onBlur: () => clearCellActive(row.id, "date"), className: `relative z-20 h-[46px] w-full border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] ${row.procedureDate ? "text-tp-slate-800" : "text-transparent"} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer focus:outline-none focus:ring-0 rounded-none cursor-pointer` })] })] }), _jsxs("td", { className: `relative border-r border-tp-slate-100 p-0 ${isNoteActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`, children: [isNoteActive ? _jsx("span", { className: "pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" }) : null, _jsx("input", { type: "text", value: row.notes ?? "", onChange: (e) => updateRow(row.id, { notes: e.target.value }), onFocus: () => setCellActive(row.id, "note"), onBlur: () => clearCellActive(row.id, "note"), placeholder: "Add notes\u2026", className: "relative z-20 h-[46px] w-full min-w-0 border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-tp-slate-800 placeholder:text-[#a2a2a8] focus:outline-none focus:ring-0 rounded-none" })] }), _jsxs("td", { className: `relative border-r border-tp-slate-100 p-0 ${isRateActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`, children: [isRateActive ? _jsx("span", { className: "pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" }) : null, _jsxs("div", { className: "relative z-20 h-[46px] flex items-center px-[12px] gap-0", children: [_jsx("span", { className: "font-sans text-[14px] text-tp-slate-400 shrink-0 mr-[2px]", children: "\u20B9" }), _jsx("input", { type: "number", value: row.rate || "", onChange: (e) => updateRow(row.id, { rate: parseInt(e.target.value, 10) || 0 }), onFocus: () => setCellActive(row.id, "rate"), onBlur: () => clearCellActive(row.id, "rate"), className: "h-[46px] w-full border-0 bg-transparent py-0 font-['Inter',sans-serif] text-[14px] leading-[20px] text-tp-slate-800 text-right focus:outline-none focus:ring-0 rounded-none" })] })] }), _jsxs("td", { className: `relative border-r border-tp-slate-100 p-0 ${isDiscActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`, children: [isDiscActive ? _jsx("span", { className: "pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" }) : null, _jsxs("div", { className: "relative z-20 h-[46px] flex items-center px-[8px] gap-0", children: [_jsx("input", { type: "number", value: row.discount || "", onChange: (e) => updateRow(row.id, { discount: parseInt(e.target.value, 10) || 0 }), onFocus: () => setCellActive(row.id, "disc"), onBlur: () => clearCellActive(row.id, "disc"), placeholder: "0", className: "h-[46px] w-full border-0 bg-transparent py-0 font-['Inter',sans-serif] text-[14px] leading-[20px] text-tp-slate-800 text-right placeholder:text-[#a2a2a8] focus:outline-none focus:ring-0 rounded-none min-w-0" }), _jsxs("button", { type: "button", onMouseDown: (e) => e.preventDefault(), onClick: () => updateRow(row.id, { discountType: row.discountType === "flat" ? "percent" : "flat" }), className: "shrink-0 ml-[4px] inline-flex h-[26px] items-center gap-[3px] rounded-[6px] bg-tp-slate-100 pl-[7px] pr-[5px] font-sans text-[12px] font-bold text-tp-slate-600 hover:bg-tp-slate-200 transition-colors", title: row.discountType === "flat" ? "Switch to %" : "Switch to ₹", children: [_jsx("span", { children: row.discountType === "flat" ? "₹" : "%" }), _jsxs("span", { className: "flex flex-col items-center leading-none text-tp-slate-400", children: [_jsx(ArrowUp2, { size: 8, color: "currentColor", variant: "Bold" }), _jsx(ArrowDown2, { size: 8, color: "currentColor", variant: "Bold" })] })] })] })] }), _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx("div", { className: "h-[46px] flex items-center justify-end px-4 font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-800", children: formatINR(rowAmount) }) }), _jsx("td", { className: "sticky right-0 z-40 border-l border-tp-slate-200/80 bg-white p-0 shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]", children: _jsx("div", { className: "h-[46px] flex items-center justify-center", children: _jsx("button", { type: "button", onClick: () => removeRow(row.id), className: "flex h-[30px] w-[30px] items-center justify-center rounded-[8px] text-tp-slate-400 hover:text-tp-error-500 hover:bg-tp-error-50 transition-colors", children: _jsx(Trash2, { size: 18 }) }) }) })] }, row.id));
                                                        }) })] }) }) })), _jsx("div", { "data-rx-module-root": "true", className: "px-[16px] pb-[16px] pt-[4px]", children: _jsxs("div", { children: [_jsxs("div", { className: "relative", children: [_jsx("span", { className: "pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-tp-slate-400", children: _jsx(Search, { size: 16, strokeWidth: 1.5 }) }), _jsx("input", { ref: searchRef, type: "text", value: searchQuery, onChange: (e) => {
                                                                setSearchQuery(e.target.value);
                                                                setSearchOpen(true);
                                                                setHighlightedIndex(0);
                                                            }, onFocus: () => setSearchOpen(true), onKeyDown: handleSearchKeyDown, placeholder: "Search & Add Service", className: "h-[42px] w-full rounded-[10px] border border-tp-slate-200 bg-white pl-[36px] pr-[14px] font-sans text-[14px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:outline-none" })] }), _jsxs("div", { className: "space-y-[14px] mt-[14px]", children: [remainingExamSuggestions.length > 0 && (_jsxs("div", { className: "rounded-[14px] bg-tp-blue-50/70 px-[14px] py-[12px]", children: [_jsxs("div", { className: "mb-[10px] flex items-center gap-[6px]", children: [_jsx(TPMedicalIcon, { name: "tooth", variant: "bulk", size: 18, color: "var(--tp-blue-600)" }), _jsx("p", { className: "font-sans text-[13px] font-semibold text-tp-slate-800", children: "From today\u2019s dental examination" }), _jsx(TooltipProvider, { delayDuration: 120, children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("button", { type: "button", "aria-label": "About this section", className: "inline-flex h-[18px] w-[18px] items-center justify-center rounded-full text-tp-slate-400 hover:text-tp-blue-600 transition-colors", children: _jsx(InfoCircle, { size: 14, variant: "Linear", color: "currentColor" }) }) }), _jsx(TooltipContent, { side: "top", align: "start", className: "max-w-[280px] rounded-[8px] bg-tp-slate-900 px-[12px] py-[8px] text-[12px] leading-[1.5] font-medium text-white shadow-[0_12px_30px_-12px_rgba(15,23,42,0.45)]", children: "These are treatments suggested from findings charted in today\u2019s dental examination. Each chip is already linked to the tooth it was recorded on \u2014 tap to add it to this plan in one click." })] }) })] }), _jsx("div", { className: "flex flex-wrap gap-[6px]", children: remainingExamSuggestions.map((sug, i) => (_jsxs("button", { type: "button", title: sug.hint, onClick: () => addTreatmentRow(sug.treatment, [sug.toothFdi], sug.surfaces), className: "inline-flex min-h-[38px] max-w-[min(100%,280px)] items-center gap-[8px] rounded-[10px] bg-white pl-[6px] pr-[12px] py-[4px] text-left transition-colors hover:bg-tp-blue-100/70", children: [_jsxs("span", { className: "inline-flex h-[22px] min-w-[24px] items-center justify-center rounded-[6px] bg-tp-blue-100 px-[5px] font-sans text-[11px] font-bold text-tp-blue-700 tabular-nums", children: ["T", sug.toothFdi] }), _jsxs("span", { className: "flex min-w-0 flex-col leading-tight", children: [_jsx("span", { className: "truncate font-sans text-[12px] font-medium text-tp-slate-700", children: sug.treatment }), sug.surfaces.length > 0 && _jsx("span", { className: "flex items-center gap-[4px]", children: sug.surfaces.map((s, si) => _jsxs("span", { className: "inline-flex items-center gap-[2px]", children: [_jsx("span", { className: "inline-block h-[6px] w-[6px] rounded-full shrink-0", style: { backgroundColor: SURFACE_COLORS[s] || "#94a3b8" } }), _jsx("span", { className: "font-sans text-[10px] font-semibold uppercase tracking-[0.3px] text-tp-slate-500", children: SURFACE_ABBR[s] || s })] }, `sf-${si}`)) })] })] }, `exam-chip-${i}`))) })] })), remainingCatalogChips.length > 0 && (_jsxs("div", { children: [_jsx("p", { className: "font-sans text-[12px] font-medium text-tp-slate-500 mb-[8px]", children: "Browse catalog" }), _jsx("div", { className: "flex flex-wrap gap-[6px]", children: remainingCatalogChips.map((t) => (_jsx("button", { type: "button", onClick: () => addTreatmentRow(t.name), className: "inline-flex h-[30px] items-center rounded-[10px] bg-tp-slate-100 px-[12px] font-sans text-[12px] font-medium text-tp-slate-600 hover:bg-tp-slate-200 transition-colors", children: t.name }, t.name))) })] }))] })] }) })] })] }), rows.length > 0 && (_jsx("div", { className: "shrink-0 border-t border-tp-slate-200 bg-white px-[24px] py-[16px]", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-[8px]", children: [_jsxs("span", { className: "inline-flex h-[26px] items-center gap-[6px] rounded-[8px] bg-tp-slate-100 px-[10px] font-sans text-[12px] text-tp-slate-600", children: [_jsx("span", { className: "font-semibold text-tp-slate-800 tabular-nums", children: totalServices }), totalServices === 1 ? "service" : "services"] }), _jsxs("span", { className: "inline-flex h-[26px] items-center gap-[6px] rounded-[8px] bg-tp-slate-100 px-[10px] font-sans text-[12px] text-tp-slate-600", children: [_jsx("span", { className: "font-semibold text-tp-slate-800 tabular-nums", children: rows.length }), rows.length === 1 ? "treatment" : "treatments"] })] }), _jsxs("div", { className: "flex items-center gap-[14px]", children: [_jsx("p", { className: "font-sans text-[14px] font-semibold text-tp-slate-600", children: "Estimated Total" }), _jsx("p", { className: "font-sans text-[22px] font-bold text-tp-blue-700", children: formatINR(totalAmount) })] })] }) }))] }), searchOpen && mounted && (showChartDropdownSection || showCatalogDropdownSection || showSearchEmptyHint || showNoMatchHint) && createPortal(_jsxs("div", { ref: dropdownRef, style: {
                    position: "fixed",
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: Math.max(dropdownPos.width, 400),
                    zIndex: 9999,
                    pointerEvents: "auto",
                }, className: "rounded-[12px] border border-tp-slate-200/90 bg-white shadow-[0_20px_50px_-18px_rgba(15,23,42,0.25)] overflow-hidden", children: [showChartDropdownSection && (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex items-center gap-[8px] border-b border-tp-slate-100 px-[12px] py-[8px] bg-gradient-to-r from-tp-blue-50/80 to-white", children: _jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-[8px]", children: [_jsx(TPMedicalIcon, { name: "tooth", variant: "bulk", size: 14, color: "var(--tp-blue-600)" }), _jsx("p", { className: "font-sans text-[12px] font-semibold text-tp-slate-800", children: "From today\u2019s examination" }), _jsx("span", { className: "ml-auto shrink-0 rounded-md bg-white/80 px-[6px] py-[1px] font-sans text-[10px] font-semibold uppercase tracking-wide text-tp-blue-600 ring-1 ring-tp-blue-100", children: "Dental tab" })] }) }), _jsx("div", { className: "max-h-[220px] overflow-y-auto py-[4px]", children: filteredExamSuggestions.map((sug, i) => {
                                    const alreadyHasTooth = rows.some((r) => r.treatment === sug.treatment && r.teeth.includes(sug.toothFdi));
                                    return (_jsxs("button", { type: "button", disabled: alreadyHasTooth, title: sug.hint, onClick: () => addTreatmentRow(sug.treatment, [sug.toothFdi], sug.surfaces), className: `w-full flex items-center gap-[10px] px-[12px] py-[8px] text-left transition-colors ${i === highlightedIndex ? "bg-tp-blue-50/60" : "hover:bg-tp-slate-50"} ${alreadyHasTooth ? "opacity-40 cursor-not-allowed" : ""}`, children: [_jsxs("span", { className: "inline-flex h-[26px] min-w-[28px] items-center justify-center rounded-[6px] bg-tp-blue-100 px-[5px] font-sans text-[11px] font-bold text-tp-blue-700 tabular-nums", children: ["T", sug.toothFdi] }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "truncate font-sans text-[14px] font-semibold text-tp-slate-800", children: sug.treatment }), _jsxs("p", { className: "flex items-center gap-[4px] font-sans text-[12px] text-tp-slate-500", children: [_jsx("span", { className: "truncate", children: sug.toothLabel }), sug.surfaces.length > 0 && _jsxs("span", { className: "inline-flex items-center gap-[3px] shrink-0", children: [_jsx("span", { children: "\u00B7" }), ...sug.surfaces.map((s, si) => _jsxs("span", { className: "inline-flex items-center gap-[2px]", children: [_jsx("span", { className: "inline-block h-[5px] w-[5px] rounded-full", style: { backgroundColor: SURFACE_COLORS[s] || "#94a3b8" } }), _jsx("span", { className: "text-[11px] font-medium uppercase", children: SURFACE_ABBR[s] || s })] }, `dd-${si}`))] })] })] }), _jsx("span", { className: "shrink-0 font-sans text-[13px] font-semibold text-tp-slate-600 tabular-nums", children: formatINR(getRate(sug.treatment)) })] }, `exam-${i}`));
                                }) })] })), showCatalogDropdownSection && (_jsxs(_Fragment, { children: [_jsx("div", { className: "border-b border-tp-slate-100 bg-tp-slate-50/80 px-[12px] py-[7px]", children: _jsx("p", { className: "font-sans text-[11px] font-semibold uppercase tracking-[0.4px] text-tp-slate-500", children: "Catalog matches" }) }), _jsx("div", { className: "max-h-[260px] overflow-y-auto py-[4px]", children: filteredTreatments.map((t, i) => {
                            const globalIdx = filteredExamSuggestions.length + i;
                            const alreadyAdded = rows.some((r) => r.treatment === t.name);
                            return (_jsxs("button", { type: "button", disabled: alreadyAdded, onClick: () => addTreatmentRow(t.name), className: `w-full flex items-center gap-[12px] px-[12px] py-[9px] text-left transition-colors ${globalIdx === highlightedIndex ? "bg-tp-blue-50/70" : "hover:bg-tp-slate-50"} ${alreadyAdded ? "opacity-40 cursor-not-allowed" : ""}`, children: [_jsx("span", { className: "flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px] bg-tp-slate-100 font-sans text-[11px] font-bold text-tp-slate-500", children: "\u20B9" }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "truncate font-sans text-[14px] font-semibold text-tp-slate-800", children: t.name }), _jsx("p", { className: "truncate font-sans text-[12px] text-tp-slate-400", children: t.category })] }), _jsx("span", { className: "shrink-0 font-sans text-[13px] font-semibold text-tp-slate-600 tabular-nums", children: formatINR(t.defaultRate) })] }, t.name));
                        }) })] })), showSearchEmptyHint && (_jsx("div", { className: "px-[14px] py-[12px]", children: _jsx("p", { className: "font-sans text-[13px] leading-relaxed text-tp-slate-500", children: "Nothing from today\u2019s dental examination yet. Type above to search the treatment catalog." }) })), showNoMatchHint && (_jsx("div", { className: "px-[14px] py-[12px]", children: _jsx("p", { className: "font-sans text-[13px] leading-relaxed text-tp-slate-500", children: "No treatments match that search. Try a shorter term or browse the catalog chips below." }) }))] }), document.body)] }));
}
