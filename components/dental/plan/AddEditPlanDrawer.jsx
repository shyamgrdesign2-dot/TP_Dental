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
import { Search, Trash2, Plus } from "lucide-react";
import { Grid5, Ram, Eraser, ArrowDown2 } from "iconsax-reactjs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { createPortal } from "react-dom";
import { TPDrawer, TPDrawerContent, } from "@/components/tp-ui/tp-drawer";
import { TPMedicalIcon } from "@/components/tp-ui/medical-icons/TPMedicalIcon";
import { usePlanContext } from "./plan-context";
import { DrawerHeader, formatINR, PlanSurfaceAbbrTags, PLAN_DRAWER_WIDE_PANEL_CLASS } from "./plan-shared";
import { genId } from "./plan-types";
import { SURFACE_OPTIONS, SURFACE_COLORS, SURFACE_ABBR, getDefaultPlanSurfaces } from "./plan-types";
import { getRate } from "./treatments";
import { ToothPicker } from "./ToothPicker";
import { fdiToLabel } from "./exam-suggestions";
import { findDentalBillItemByName, getUniqueDentalBillItems, sortDentalBillItemsForSearch } from "@/lib/billing-catalog";
import { useBillingCatalog } from "@/lib/billing-catalog-context";
import { AddDentalBillItemDrawer } from "@/components/dental/AddDentalBillItemDrawer";
import { useDirtyDrawerGuard } from "./use-dirty-drawer-guard";
import { TPConfirmDialog } from "@/components/ui/tp-confirm-dialog";
function createRow(treatment, teeth = [], surfaces = [], billingItems, billItemFromCatalog = null) {
    const billItem = billItemFromCatalog ?? findDentalBillItemByName(billingItems, treatment);
    const rate = billItem ? billItem.price : getRate(treatment);
    let discount = 0;
    if (billItem && billItem.discount > 0) {
        if (billItem.discountUnit === "percent")
            discount = Math.min(rate, Math.round(rate * billItem.discount / 100));
        else
            discount = Math.min(rate, billItem.discount);
    }
    return {
        id: genId("row"),
        treatment,
        teeth,
        surfaces: surfaces.length > 0 ? surfaces : getDefaultPlanSurfaces(treatment),
        rate,
        discount,
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
    const dropdown = open ? (_jsxs("div", { ref: dropdownRef, style: dropdownStyle, className: "rounded-[12px] border border-tp-slate-200 bg-white py-[6px]", children: [_jsx("div", { className: "px-[10px] pb-[6px]", children: _jsxs("div", { className: "flex items-center gap-[6px] rounded-[8px] bg-tp-amber-50 px-[10px] py-[7px]", children: [_jsx("span", { className: "h-[8px] w-[8px] rounded-full bg-tp-amber-500" }), _jsx("span", { className: "font-['Inter',sans-serif] text-[12px] text-tp-amber-800", children: "Select whole tooth or mix individual surfaces" })] }) }), SURFACE_OPTIONS.map((opt, index) => {
                const selected = value.includes(opt.id);
                return (_jsxs("button", { type: "button", onClick: () => toggle(opt.id), className: `mx-auto flex items-center gap-[10px] rounded-[8px] px-[12px] py-[8px] text-left font-['Inter',sans-serif] text-[12px] transition-colors ${selected ? "bg-tp-blue-50 text-tp-slate-800" : "text-tp-slate-600 hover:bg-tp-slate-50"} ${index === 1 ? "mt-[2px] border-t border-tp-slate-100 pt-[10px]" : ""}`, style: { width: "calc(100% - 4px)" }, children: [_jsx("span", { className: `inline-flex h-[16px] w-[16px] items-center justify-center rounded-[4px] border ${selected ? "border-tp-blue-500 bg-tp-blue-500" : "border-tp-slate-300 bg-white"}`, children: selected ? (_jsx("svg", { width: "9", height: "9", viewBox: "0 0 10 10", fill: "none", children: _jsx("path", { d: "M2 5L4 7L8 3", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) })) : null }), _jsx("span", { className: "h-[10px] w-[10px] rounded-full flex-shrink-0", style: { background: SURFACE_COLORS[opt.id] } }), _jsx("span", { className: "flex-1", children: opt.label }), _jsx("span", { className: "font-['Inter',sans-serif] text-[10px] font-semibold text-tp-slate-400", children: opt.abbr })] }, opt.id));
            })] })) : null;
    return (_jsxs(_Fragment, { children: [_jsxs("button", { ref: triggerRef, type: "button", onClick: (e) => { e.stopPropagation(); open ? setOpen(false) : openDropdown(); }, className: "flex min-h-[46px] w-full items-center justify-between gap-[8px] bg-transparent px-[12px] py-[6px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] transition-colors focus:outline-none", children: [_jsx("span", { className: "min-w-0 flex-1 text-left", children: value.length > 0 ? _jsx(PlanSurfaceAbbrTags, { surfaces: value, gapClass: "gap-[4px]" }) : _jsx("span", { className: "text-[12px] text-[#a2a2a8]", children: "Select surface" }) }), _jsx(ArrowDown2, { size: 14, color: "currentColor", variant: "Linear" })] }), mounted && typeof document !== "undefined" && dropdown
                ? createPortal(dropdown, document.body)
                : null] }));
}
// ─── Component ──────────────────────────────────────────────
export function AddEditPlanDrawer() {
    const { items: billingItems } = useBillingCatalog();
    const dentalBillItems = useMemo(() => getUniqueDentalBillItems(billingItems), [billingItems]);
    const [catalogDentalDrawerOpen, setCatalogDentalDrawerOpen] = useState(false);
    const [catalogDentalInitialName, setCatalogDentalInitialName] = useState("");
    const { state, dispatch, closeDrawer, patientId: planPatientId, showSnackbar } = usePlanContext();
    const drawer = state.drawer;
    const isOpen = drawer.type === "add-plan" || drawer.type === "edit-plan";
    const isEdit = drawer.type === "edit-plan";
    const editPlanId = isEdit ? drawer.planId : null;
    const editPlan = editPlanId ? state.plans.find((p) => p.id === editPlanId) : null;
    const [planName, setPlanName] = useState("");
    const [rows, setRows] = useState([]);
    // Plan-level additional discount (flat ₹, applied over the sum of
    // service-level amounts). Stored as a string in the input so empty = 0.
    const [additionalDiscount, setAdditionalDiscount] = useState("");
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
    const [confirmDeleteRow, setConfirmDeleteRow] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const patientId = planPatientId ?? state.plans[0]?.patientId ?? "apt-1";
    // Populate form when editing
    useEffect(() => {
        if (isEdit && editPlan) {
            setPlanName(editPlan.name);
            setAdditionalDiscount(editPlan.additionalDiscount ? String(editPlan.additionalDiscount) : "");
            const grouped = new Map();
            for (const svc of editPlan.services) {
                // Grouped services already carry every tooth in toothFdis; fall
                // back to the legacy single toothFdi for older data.
                const svcTeeth = svc.toothFdis?.length ? svc.toothFdis : [svc.toothFdi];
                // svc.discount is the whole-line discount (per-tooth × count); the
                // row editor works in per-tooth terms, so divide it back out.
                const perToothDiscount = svcTeeth.length > 0 ? Math.round((svc.discount || 0) / svcTeeth.length) : (svc.discount || 0);
                const existing = grouped.get(svc.treatment);
                if (existing) {
                    for (const fdi of svcTeeth) {
                        if (!existing.teeth.includes(fdi))
                            existing.teeth.push(fdi);
                    }
                    for (const s of svc.surfaces) {
                        if (!existing.surfaces.includes(s))
                            existing.surfaces.push(s);
                    }
                }
                else {
                    const unit = svc.discountUnit === "percent" ? "percent" : "flat";
                    grouped.set(svc.treatment, {
                        id: genId("row"),
                        treatment: svc.treatment,
                        teeth: [...svcTeeth],
                        surfaces: [...svc.surfaces],
                        rate: svc.rate,
                        discount: unit === "percent" ? (svc.discountInput ?? perToothDiscount) : perToothDiscount,
                        discountType: unit,
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
            setAdditionalDiscount("");
        }
        setSearchQuery("");
        setSearchOpen(false);
    }, [isOpen, isEdit, editPlan]);
    const filteredTreatments = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        let pool = dentalBillItems.filter((t) => !q || t.name.toLowerCase().includes(q));
        pool = sortDentalBillItemsForSearch(pool, searchQuery.trim());
        return pool.slice(0, 25);
    }, [searchQuery, dentalBillItems]);
    const searchTrim = searchQuery.trim();
    const catalogHasExactName = searchTrim.length > 0 &&
        dentalBillItems.some((t) => t.name.toLowerCase() === searchTrim.toLowerCase());
    const showAddCustomDental = searchTrim.length > 0 && !catalogHasExactName;
    // Remaining catalog chips (not yet added)
    const remainingCatalogChips = useMemo(() => {
        return dentalBillItems.filter((t) => !rows.some((r) => r.treatment === t.name)).slice(0, 8);
    }, [rows, dentalBillItems]);
    useEffect(() => {
        if (!searchOpen || !searchRef.current)
            return;
        const rect = searchRef.current.getBoundingClientRect();
        setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }, [searchOpen, searchQuery]);
    // Hide this drawer's dropdown whenever the nested "Add dental service" drawer
    // opens so it doesn't paint above the child sidebar via its portal.
    useEffect(() => {
        if (catalogDentalDrawerOpen) setSearchOpen(false);
    }, [catalogDentalDrawerOpen]);
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
    const serviceHasData = useCallback((treatmentName) => {
        if (!editPlan) return false;
        return editPlan.services.some(
            (s) => s.treatment === treatmentName && ((s.sittings ?? []).length > 0 || (s.procedures ?? []).length > 0)
        );
    }, [editPlan]);

    const addTreatmentRow = (treatmentName, teeth = [], surfaces = [], billItemFromCatalog = null) => {
        const nextSurfaces = surfaces.length > 0 ? surfaces : getDefaultPlanSurfaces(treatmentName);
        const exists = rows.find((r) => r.treatment === treatmentName);
        if (!exists) {
            setRows((prev) => [...prev, createRow(treatmentName, teeth, nextSurfaces, billingItems, billItemFromCatalog)]);
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
        const row = rows.find((r) => r.id === id);
        if (isEdit && row) {
            setConfirmDeleteRow(row);
            return;
        }
        setRows((prev) => prev.filter((r) => r.id !== id));
    };
    const confirmRemoveRow = () => {
        if (confirmDeleteRow) {
            setRows((prev) => prev.filter((r) => r.id !== confirmDeleteRow.id));
            setConfirmDeleteRow(null);
        }
    };
    const clearAllRows = () => {
        setRows([]);
    };
    const handleSearchKeyDown = (e) => {
        const q = searchQuery.trim();
        const showCatalog = q.length > 0;
        const catCount = showCatalog ? filteredTreatments.length : 0;
        const customRowCount = showCatalog && showAddCustomDental ? 1 : 0;
        const totalItems = catCount + customRowCount;
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
            if (highlightedIndex < catCount) {
                const pick = filteredTreatments[highlightedIndex];
                if (pick)
                    addTreatmentRow(pick.name, [], [], pick);
            }
            else if (customRowCount === 1 && highlightedIndex === catCount) {
                setCatalogDentalInitialName(q);
                setCatalogDentalDrawerOpen(true);
                setSearchOpen(false);
            }
        }
        else if (e.key === "Escape") {
            setSearchOpen(false);
        }
    };
    useEffect(() => {
        if (!searchOpen)
            return;
        const q = searchQuery.trim();
        const showCat = q.length > 0;
        const catCount = showCat ? filteredTreatments.length : 0;
        const customRowCount = showCat && showAddCustomDental ? 1 : 0;
        const total = catCount + customRowCount;
        if (total <= 0)
            return;
        setHighlightedIndex((i) => Math.min(i, total - 1));
    }, [searchOpen, searchQuery, filteredTreatments.length, showAddCustomDental]);
    const computeDiscount = (row) => {
        const raw = Number(row.discount);
        const d = Number.isFinite(raw) && raw > 0 ? raw : 0;
        if (row.discountType === "percent") {
            return Math.min(row.rate, Math.round(row.rate * Math.min(d, 100) / 100));
        }
        return Math.min(row.rate, d);
    };
    // Build ONE service per row. When a procedure spans several teeth (e.g. a
    // veneer across 11/21/22) it stays a single grouped line item carrying every
    // tooth — NOT one service per tooth. Billing is per-tooth rate × tooth count.
    const buildServices = () => {
        const services = [];
        const planId = editPlanId ?? genId("plan");
        for (const row of rows) {
            if (!row.treatment)
                continue;
            const teeth = row.teeth.length > 0 ? row.teeth : ["full-mouth"];
            const count = teeth.length;
            const discPerTooth = computeDiscount(row);
            const lineDiscount = discPerTooth * count;
            const lineAmount = Math.max(0, (row.rate - discPerTooth) * count);
            services.push({
                id: genId("svc"),
                planId,
                treatment: row.treatment,
                toothFdi: teeth[0],
                toothFdis: [...teeth],
                toothLabel: count === 1 ? fdiToLabel(teeth[0]) : `${count} teeth`,
                surfaces: [...row.surfaces],
                rate: row.rate,
                discount: lineDiscount,
                discountUnit: row.discountType === "percent" ? "percent" : "flat",
                discountInput: Number(row.discount) || 0,
                amount: lineAmount,
                status: "planned",
                sittings: [],
                procedures: [],
                procedureDate: row.procedureDate?.trim() || undefined,
                notes: row.notes?.trim() || undefined,
            });
        }
        return services;
    };
    const additionalDiscountAmount = Math.max(0, parseInt(additionalDiscount || "0", 10) || 0);
    const handleSave = () => {
        if (!planName.trim() || rows.length === 0)
            return;
        const services = buildServices();
        if (isEdit && editPlanId) {
            dispatch({
                type: "UPDATE_PLAN",
                planId: editPlanId,
                patch: { name: planName.trim(), services, additionalDiscount: additionalDiscountAmount || undefined },
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
                additionalDiscount: additionalDiscountAmount || undefined,
            };
            newPlan.services = services.map((s) => ({ ...s, planId: newPlan.id }));
            dispatch({ type: "ADD_PLAN", plan: newPlan });
        }
        closeDrawer();
        showSnackbar?.(isEdit ? "Plan updated successfully." : "Plan created successfully.");
    };
    const totalAmount = rows.reduce((sum, r) => {
        const teeth = r.teeth.length || 1;
        const discAmt = computeDiscount(r);
        return sum + Math.max(0, r.rate - discAmt) * teeth;
    }, 0);
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
    // Snapshot form state at drawer-open time so the dirty-check compares
    // against the true initial values (important in edit mode).
    const initialSnapshotRef = useRef(null);
    useEffect(() => {
        if (isOpen && initialSnapshotRef.current == null) {
            initialSnapshotRef.current = JSON.stringify({ planName, rows, additionalDiscount });
        }
        if (!isOpen) initialSnapshotRef.current = null;
    }, [isOpen]);
    const isDirty = isOpen && initialSnapshotRef.current != null
        && JSON.stringify({ planName, rows, additionalDiscount }) !== initialSnapshotRef.current;
    const guard = useDirtyDrawerGuard({
        isDirty,
        onClose: () => { closeDrawer(); setShowNameError(false); },
    });
    // Clear error when user types
    const handleNameChange = (e) => {
        setPlanName(e.target.value);
        if (showNameError && e.target.value.trim())
            setShowNameError(false);
    };
    // Icon button class — same as RxPad SectionHeader
    const iconBtnClass = "inline-flex h-[32px] w-[32px] items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-200 disabled:cursor-not-allowed disabled:opacity-40";
    const showCatalogInDropdown = searchQuery.trim().length > 0;
    const showDentalServiceDropdownSection = showCatalogInDropdown;
    const showSearchEmptyHint = searchQuery.trim() === "";
    const blockPlanSheetDismissFromPortals = (e) => {
        if (catalogDentalDrawerOpen) {
            e.preventDefault();
            return;
        }
        if (searchOpen && dropdownRef.current && e.target instanceof Node && dropdownRef.current.contains(e.target))
            e.preventDefault();
    };
    return (_jsxs(_Fragment, { children: [_jsxs(TPDrawer, { open: isOpen, onOpenChange: (open) => { if (!open) guard.attemptClose(); }, children: [_jsxs(TPDrawerContent, { side: "right", size: "lg", className: `${PLAN_DRAWER_WIDE_PANEL_CLASS} flex flex-col`, onPointerDownOutside: blockPlanSheetDismissFromPortals, onInteractOutside: blockPlanSheetDismissFromPortals, onFocusOutside: (e) => { if (catalogDentalDrawerOpen)
                e.preventDefault(); }, style: { background: "#F4F5F7" }, children: [_jsx(DrawerHeader, { title: isEdit ? "Edit Plan" : "Create Treatment Plan", onClose: () => guard.attemptClose(), action: _jsxs("div", { className: "flex items-center gap-[10px]", children: [_jsx("button", { type: "button", title: "Templates", className: iconBtnClass, children: _jsx(Grid5, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("button", { type: "button", title: "Save as template", className: iconBtnClass, children: _jsx(Ram, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("button", { type: "button", title: "Erase", onClick: clearAllRows, disabled: rows.length === 0, className: iconBtnClass, children: _jsx(Eraser, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("div", { className: "w-px self-stretch bg-[linear-gradient(180deg,rgba(226,226,234,0.1)_0%,rgba(226,226,234,1)_50%,rgba(226,226,234,0.1)_100%)] mx-[2px]" }), _jsx("button", { type: "button", onClick: handleSaveWithValidation, className: "h-[42px] min-w-[120px] rounded-[12px] px-[20px] font-['Inter',sans-serif] text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm", children: isEdit ? "Save Changes" : "Create Plan" })] }) }), _jsxs("div", { className: "flex-1 overflow-y-auto px-[24px] pt-[20px] pb-[24px] space-y-[20px]", style: { background: "#F4F5F7" }, children: [_jsxs("div", { children: [_jsxs("label", { className: "block font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-600 mb-[6px]", children: ["Plan Name ", _jsx("span", { className: "text-tp-error-500", children: "*" })] }), _jsx("input", { ref: nameInputRef, type: "text", value: planName, onChange: handleNameChange, placeholder: "e.g., Wisdom Tooth Removal", className: `w-full h-[42px] rounded-[10px] border bg-white px-[14px] font-['Inter',sans-serif] text-[14px] text-tp-slate-800 placeholder:text-tp-slate-300 focus:outline-none focus:ring-2 transition-colors ${showNameError
                                            ? "border-tp-error-400 focus:ring-tp-error-500/30 focus:border-tp-error-400"
        : "border-tp-slate-200 focus:ring-tp-blue-500/30 focus:border-tp-blue-400"}` }), showNameError && (_jsxs("p", { className: "mt-[6px] font-['Inter',sans-serif] text-[12px] text-tp-error-500 flex items-center gap-[5px]", children: [_jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5" }), _jsx("path", { d: "M12 8v5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }), _jsx("circle", { cx: "12", cy: "16", r: "0.75", fill: "currentColor" })] }), "Please enter a plan name to create a plan."] }))] }), _jsxs("div", { className: "rounded-[16px] bg-white overflow-hidden", children: [_jsxs("header", { className: "flex items-center gap-[10px] px-[16px] py-[14px]", children: [_jsx(TPMedicalIcon, { name: "first-aid", variant: "bulk", size: 22, color: "var(--tp-violet-500)" }), _jsx("h3", { className: "font-['Inter',sans-serif] text-[16px] font-semibold text-tp-slate-900", children: "Services" }), rows.length > 0 && (_jsx("span", { className: "inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-tp-slate-100 px-[6px] font-['Inter',sans-serif] text-[12px] font-bold text-tp-slate-600 tabular-nums", children: rows.length })), _jsxs("div", { className: "ml-auto flex items-center gap-[8px]", children: [_jsx("button", { type: "button", title: "Templates", className: iconBtnClass, children: _jsx(Grid5, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("button", { type: "button", title: "Save as template", className: iconBtnClass, children: _jsx(Ram, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) }), _jsx("button", { type: "button", title: "Clear all", onClick: clearAllRows, disabled: rows.length === 0, className: iconBtnClass, children: _jsx(Eraser, { color: "currentColor", size: 16, strokeWidth: 1.5, variant: "Linear" }) })] })] }), rows.length > 0 && (_jsx("div", { className: "px-[14px] py-[12px]", children: _jsx("div", { className: "rounded-[10px] border border-tp-slate-200 overflow-hidden w-full overflow-x-auto min-w-0", children: _jsxs("table", { className: "w-full min-w-[880px] max-w-full table-fixed font-['Inter',sans-serif] text-[14px]", children: [_jsxs("colgroup", { children: [_jsx("col", { style: { width: 40, minWidth: 36 } }), _jsx("col", { style: { minWidth: 132, maxWidth: 200 } }), _jsx("col", { style: { width: 120, minWidth: 110 } }), _jsx("col", { style: { width: 120, minWidth: 110 } }), _jsx("col", { style: { width: 118, minWidth: 108 } }), _jsx("col", { style: { minWidth: 200, maxWidth: 280 } }), _jsx("col", { style: { width: 96, minWidth: 84 } }), _jsx("col", { style: { width: 110, minWidth: 100 } }), _jsx("col", { style: { width: 84, minWidth: 72 } }), _jsx("col", { style: { width: 44, minWidth: 44, maxWidth: 44 } })] }), _jsx("thead", { children: _jsxs("tr", { className: "h-[38px] bg-tp-slate-50 text-left font-['Inter',sans-serif] text-[12px] text-tp-slate-500", children: [_jsx("th", { className: "border-r border-tp-slate-100 px-0 py-2 text-center font-semibold" }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Service" }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Teeth" }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Surfaces" }), _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Surgery date" }), _jsx("th", { className: "border-r border-tp-slate-100 px-3 py-2 text-left font-semibold uppercase tracking-[0.5px]", children: "Notes" }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-right font-semibold uppercase tracking-[0.5px]", children: "Rate/Tooth" }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-right font-semibold uppercase tracking-[0.5px]", children: "Discount" }), _jsx("th", { className: "border-r border-tp-slate-100 px-4 py-2 text-right font-semibold uppercase tracking-[0.5px]", children: "Amount" }), _jsx("th", { className: "sticky right-0 z-40 border-l border-tp-slate-200/80 bg-tp-slate-50 px-0 py-2 text-center font-semibold shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]" })] }) }), _jsx("tbody", { children: rows.map((row, idx) => {
                                                            const teethCount = Math.max(1, row.teeth.length);
                                                            const discAmt = computeDiscount(row);
                                                            const rowAmount = Math.max(0, row.rate - discAmt) * teethCount;
                                                            const isDateActive = isCellActive(row.id, "date");
                                                            const isNoteActive = isCellActive(row.id, "note");
                                                            const isRateActive = isCellActive(row.id, "rate");
                                                            const isDiscActive = isCellActive(row.id, "disc");
                                                            return (_jsxs("tr", { className: "min-h-[46px] border-t border-tp-slate-100 bg-white align-middle transition-colors duration-150", children: [_jsx("td", { className: "px-4 text-center font-['Inter',sans-serif] text-[12px] text-tp-slate-400 border-r border-tp-slate-100", children: idx + 1 }), _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx("div", { className: "h-[46px] w-full flex items-center px-4", children: _jsx("p", { className: "font-['Inter',sans-serif] text-[14px] font-medium text-tp-slate-800 truncate", children: row.treatment }) }) }), _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx(ToothPicker, { value: row.teeth, onChange: (teeth) => updateRow(row.id, { teeth }), variant: "inline" }) }), _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx(SurfacePicker, { value: row.surfaces, onChange: (surfaces) => updateRow(row.id, { surfaces }) }) }), _jsxs("td", { className: `relative border-r border-tp-slate-100 p-0 ${isDateActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`, children: [isDateActive ? _jsx("span", { className: "pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" }) : null, _jsxs("div", { className: "relative h-[46px] w-full", children: [!row.procedureDate && (_jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center px-[12px]", children: _jsx("span", { className: "font-['Inter',sans-serif] text-[12px] text-[#a2a2a8]", children: "DD/MM/YYYY" }) })), _jsx("input", { type: "date", value: row.procedureDate || "", onChange: (e) => updateRow(row.id, { procedureDate: e.target.value }), onFocus: () => setCellActive(row.id, "date"), onBlur: () => clearCellActive(row.id, "date"), className: `relative z-20 h-[46px] w-full border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] ${row.procedureDate ? "text-tp-slate-800" : "text-transparent"} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer focus:outline-none focus:ring-0 rounded-none cursor-pointer` })] })] }), _jsxs("td", { className: `relative border-r border-tp-slate-100 p-0 ${isNoteActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`, children: [isNoteActive ? _jsx("span", { className: "pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" }) : null, _jsx("input", { type: "text", value: row.notes ?? "", onChange: (e) => updateRow(row.id, { notes: e.target.value }), onFocus: () => setCellActive(row.id, "note"), onBlur: () => clearCellActive(row.id, "note"), placeholder: "Add notes\u2026", className: "relative z-20 h-[46px] w-full min-w-0 border-0 bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-tp-slate-800 placeholder:text-[#a2a2a8] focus:outline-none focus:ring-0 rounded-none" })] }), _jsxs("td", { className: `relative border-r border-tp-slate-100 p-0 ${isRateActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`, children: [isRateActive ? _jsx("span", { className: "pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" }) : null, _jsxs("div", { className: "relative z-20 h-[46px] flex items-center px-[12px] gap-0", children: [_jsx("span", { className: "font-['Inter',sans-serif] text-[14px] text-tp-slate-400 shrink-0 mr-[2px]", children: "\u20B9" }), _jsx("input", { type: "text", inputMode: "numeric", pattern: "[0-9]*", autoComplete: "off", value: row.rate ? String(row.rate) : "", onChange: (e) => { const v = e.target.value.replace(/\D/g, ""); updateRow(row.id, { rate: v === "" ? 0 : Math.min(parseInt(v, 10) || 0, 999999999) }); }, onFocus: () => setCellActive(row.id, "rate"), onBlur: () => clearCellActive(row.id, "rate"), className: "h-[46px] w-full min-w-0 border-0 bg-transparent py-0 font-['Inter',sans-serif] text-[14px] leading-[20px] text-tp-slate-800 text-right focus:outline-none focus:ring-0 rounded-none [appearance:textfield]" })] })] }), _jsxs("td", { className: `relative border-r border-tp-slate-100 p-0 ${isDiscActive ? "bg-tp-blue-50/20" : "hover:bg-tp-slate-100/60"}`, children: [isDiscActive ? _jsx("span", { className: "pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" }) : null, _jsxs("div", { className: "relative z-20 h-[46px] flex items-center", children: [_jsx("button", { type: "button", title: row.discountType === "percent" ? "Switch to ₹" : "Switch to %", onClick: () => updateRow(row.id, { discountType: row.discountType === "percent" ? "flat" : "percent" }), className: "flex h-[28px] w-[34px] shrink-0 items-center justify-center ml-[6px] rounded-[6px] border-0 bg-tp-slate-100 font-['Inter',sans-serif] text-[12px] font-bold text-tp-slate-600 cursor-pointer transition-colors hover:bg-tp-slate-200 tabular-nums", children: _jsxs("span", { className: "flex items-center gap-[2px]", children: [row.discountType === "percent" ? "%" : "₹", _jsxs("span", { className: "flex flex-col items-center leading-none text-tp-slate-400", children: [_jsx("svg", { width: "8", height: "8", viewBox: "0 0 24 24", fill: "none", children: _jsx("path", { fill: "currentColor", d: "M18.68 13.978l-3.21-3.21-1.96-1.97a2.13 2.13 0 00-3.01 0l-5.18 5.18c-.68.68-.19 1.84.76 1.84h11.84c.96 0 1.44-1.16.76-1.84z" }) }), _jsx("svg", { width: "8", height: "8", viewBox: "0 0 24 24", fill: "none", children: _jsx("path", { fill: "currentColor", d: "M17.919 8.18H6.079c-.96 0-1.44 1.16-.76 1.84l5.18 5.18c.83.83 2.18.83 3.01 0l1.97-1.97 3.21-3.21c.67-.68.19-1.84-.77-1.84z" }) })] })] }) }), _jsx("input", { type: "text", inputMode: "numeric", pattern: "[0-9]*", autoComplete: "off", value: row.discount ? String(row.discount) : "", onChange: (e) => { const v = e.target.value.replace(/\D/g, ""); const max = row.discountType === "percent" ? 100 : 999999999; updateRow(row.id, { discount: v === "" ? 0 : Math.min(parseInt(v, 10) || 0, max) }); }, onFocus: () => setCellActive(row.id, "disc"), onBlur: () => clearCellActive(row.id, "disc"), placeholder: "0", className: "h-[46px] w-full min-w-0 border-0 bg-transparent py-0 pr-[10px] pl-[4px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-tp-slate-800 text-right placeholder:text-[#a2a2a8] focus:outline-none focus:ring-0 rounded-none [appearance:textfield]" })] })] }), _jsx("td", { className: "border-r border-tp-slate-100 p-0", children: _jsx("div", { className: "h-[46px] flex items-center justify-end px-4 font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-800", children: formatINR(rowAmount) }) }), _jsx("td", { className: "sticky right-0 z-40 border-l border-tp-slate-200/80 bg-white p-0 shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]", children: _jsx("div", { className: "h-[46px] flex items-center justify-center", children: _jsx("button", { type: "button", onClick: () => removeRow(row.id), className: "flex h-[30px] w-[30px] items-center justify-center rounded-[8px] text-tp-slate-400 hover:text-tp-error-500 hover:bg-tp-error-50 transition-colors", children: _jsx(Trash2, { size: 18 }) }) }) })] }, row.id));
                                                        }) })] }) }) })), _jsx("div", { "data-rx-module-root": "true", className: "px-[16px] pb-[16px] pt-[4px]", children: _jsxs("div", { children: [_jsxs("div", { className: "relative", children: [_jsx("span", { className: "pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-tp-slate-400", children: _jsx(Search, { size: 16, strokeWidth: 1.5 }) }), _jsx("input", { ref: searchRef, type: "text", value: searchQuery, onChange: (e) => {
                                                                setSearchQuery(e.target.value);
                                                                setSearchOpen(true);
                                                                setHighlightedIndex(0);
                                                            }, onFocus: () => setSearchOpen(true), onKeyDown: handleSearchKeyDown, placeholder: "Search & Add Service", className: "h-[42px] w-full rounded-[10px] border border-tp-slate-200 bg-white pl-[36px] pr-[14px] font-['Inter',sans-serif] text-[14px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:outline-none" })] }), _jsxs("div", { className: "space-y-[14px] mt-[14px]", children: [remainingCatalogChips.length > 0 && (_jsxs("div", { children: [_jsx("p", { className: "font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-500 mb-[8px]", children: "Dental service" }), _jsx("div", { className: "flex flex-wrap gap-[6px]", children: remainingCatalogChips.map((t) => (_jsx("button", { type: "button", onClick: () => addTreatmentRow(t.name, [], [], t), className: "inline-flex h-[30px] items-center rounded-[10px] bg-tp-slate-100 px-[12px] font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-600 hover:bg-tp-slate-200 transition-colors", children: t.name }, t.id))) })] }))] })] }) })] })] }), rows.length > 0 && (_jsx("div", { className: "shrink-0 border-t border-tp-slate-200 bg-white px-[24px] py-[14px]", children: _jsxs("div", { className: "flex items-center justify-between gap-[16px]", children: [
    _jsxs("label", { className: "flex items-center gap-[10px]", children: [
        _jsx("span", { className: "font-['Inter',sans-serif] text-[13px] font-semibold text-tp-slate-600", children: "Additional discount" }),
        _jsxs("div", { className: "relative", children: [
            _jsx("span", { className: "pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 font-['Inter',sans-serif] text-[14px] text-tp-slate-400", children: "\u20B9" }),
            _jsx("input", {
                type: "text",
                inputMode: "numeric",
                pattern: "[0-9]*",
                autoComplete: "off",
                value: additionalDiscount,
                onChange: (e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    setAdditionalDiscount(v);
                },
                placeholder: "0",
                className: "h-[38px] w-[140px] rounded-[10px] border border-tp-slate-200 bg-white pl-[28px] pr-[12px] font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-800 placeholder:text-tp-slate-300 focus:border-tp-blue-400 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20 [appearance:textfield]",
            }),
        ] }),
    ] }),
    _jsxs("div", { className: "flex items-center gap-[14px]", children: [
        additionalDiscountAmount > 0 && _jsxs(_Fragment, { children: [
            _jsx("span", { className: "font-['Inter',sans-serif] text-[13px] text-tp-slate-500 line-through tabular-nums", children: formatINR(totalAmount) }),
            _jsxs("span", { className: "inline-flex h-[24px] items-center rounded-[8px] bg-tp-success-50 px-[8px] font-['Inter',sans-serif] text-[12px] font-semibold text-tp-success-700 tabular-nums", children: ["\u2212 ", formatINR(additionalDiscountAmount)] }),
        ] }),
        _jsx("p", { className: "font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-600", children: additionalDiscountAmount > 0 ? "Final Total" : "Estimated Total" }),
        _jsx("p", { className: "font-['Inter',sans-serif] text-[22px] font-bold text-tp-blue-700 tabular-nums", children: formatINR(Math.max(0, totalAmount - additionalDiscountAmount)) }),
    ] }),
] }) }))] }), searchOpen && mounted && !catalogDentalDrawerOpen && (showDentalServiceDropdownSection || showSearchEmptyHint) && createPortal(_jsxs("div", { ref: dropdownRef, style: {
                    position: "fixed",
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: Math.max(dropdownPos.width, 400),
                    zIndex: 9999,
                    pointerEvents: "auto",
                }, className: "rounded-[12px] border border-tp-slate-200/90 bg-white overflow-hidden", children: [showDentalServiceDropdownSection && (_jsxs(_Fragment, { children: [_jsx("div", { className: "border-b border-tp-slate-100 bg-tp-slate-50/80 px-[12px] py-[7px]", children: _jsx("p", { className: "font-['Inter',sans-serif] text-[10px] font-semibold uppercase tracking-[0.4px] text-tp-slate-500", children: "Dental service" }) }), _jsx("div", { className: "max-h-[260px] overflow-y-auto py-[4px]", children: _jsxs(_Fragment, { children: [filteredTreatments.map((t, i) => {
                            const alreadyAdded = rows.some((r) => r.treatment === t.name);
                            return (_jsxs("button", { type: "button", disabled: alreadyAdded, onClick: () => addTreatmentRow(t.name, [], [], t), className: `w-full flex items-center gap-[12px] px-[12px] py-[9px] text-left transition-colors ${i === highlightedIndex ? "bg-tp-blue-50/70" : "hover:bg-tp-slate-50"} ${alreadyAdded ? "opacity-40 cursor-not-allowed" : ""}`, children: [_jsx("div", { className: "min-w-0 flex-1", children: _jsx("p", { className: "truncate font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-800", children: t.name }) }), _jsx("span", { className: "shrink-0 font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-700 tabular-nums", children: formatINR(t.price) })] }, t.id));
                        }), showAddCustomDental && (_jsxs("button", { type: "button", onClick: () => { setCatalogDentalInitialName(searchQuery.trim()); setCatalogDentalDrawerOpen(true); setSearchOpen(false); }, className: `w-full flex items-center gap-[10px] px-[12px] py-[10px] text-left font-['Inter',sans-serif] text-[12px] font-semibold transition-colors ${highlightedIndex === filteredTreatments.length ? "bg-tp-blue-50" : "hover:bg-tp-blue-50/60"} text-tp-blue-600`, children: [_jsx(Plus, { size: 18, strokeWidth: 2, className: "shrink-0 text-tp-blue-600" }), _jsxs("span", { className: "min-w-0", children: ["Add \"", searchQuery.trim(), "\" as custom dental service"] })] }))] }) })] })), showSearchEmptyHint && (_jsx("div", { className: "px-[14px] py-[12px]", children: _jsx("p", { className: "font-['Inter',sans-serif] text-[12px] leading-relaxed text-tp-slate-500", children: "Type above to search dental services." }) }))] }), document.body) ] }), mounted && typeof document !== "undefined"
        ? createPortal(_jsx(AddDentalBillItemDrawer, { open: catalogDentalDrawerOpen, onOpenChange: setCatalogDentalDrawerOpen, initialName: catalogDentalInitialName, onSaved: (item) => { addTreatmentRow(item.name, [], [], item); showSnackbar?.(`"${item.name}" has been added successfully.`); } }), document.body)
        : null,
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
        _jsx(TPConfirmDialog, {
            open: !!confirmDeleteRow,
            onOpenChange: (open) => { if (!open) setConfirmDeleteRow(null); },
            title: "Remove service?",
            warning: confirmDeleteRow
                ? `Are you sure you want to remove "${confirmDeleteRow.treatment}"?${serviceHasData(confirmDeleteRow.treatment) ? " This will permanently delete all associated visits, notes, and progress." : " This action cannot be undone."}`
                : "",
            secondaryLabel: "Yes, Remove",
            onSecondary: confirmRemoveRow,
            primaryLabel: "Cancel",
            primaryTone: "primary",
            onPrimary: () => setConfirmDeleteRow(null),
        }),
    ] }));
}
