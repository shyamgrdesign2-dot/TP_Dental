"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * ToothPicker — FDI tooth multi-select popover used inside TreatmentPlanTab.
 * Uses createPortal to render the dropdown at document body level,
 * preventing clipping by overflow-hidden ancestor containers.
 *
 * Two variants:
 *   - "default": standalone button with border (for use outside tables)
 *   - "inline": borderless cell-style button matching SurfacePicker (for table use)
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowDown2 } from "iconsax-reactjs";
const ADULT_QUADRANTS = {
    UR: ["18", "17", "16", "15", "14", "13", "12", "11"],
    UL: ["21", "22", "23", "24", "25", "26", "27", "28"],
    LR: ["48", "47", "46", "45", "44", "43", "42", "41"],
    LL: ["31", "32", "33", "34", "35", "36", "37", "38"],
};
const PEDIATRIC_QUADRANTS = {
    UR: ["55", "54", "53", "52", "51"],
    UL: ["61", "62", "63", "64", "65"],
    LR: ["85", "84", "83", "82", "81"],
    LL: ["71", "72", "73", "74", "75"],
};
const QUICK_SELECT_GROUPS = [
    { label: "UR", getTeeth: (q) => q.UR },
    { label: "UL", getTeeth: (q) => q.UL },
    { label: "LR", getTeeth: (q) => q.LR },
    { label: "LL", getTeeth: (q) => q.LL },
    { label: "Maxillary", getTeeth: (q) => [...q.UR, ...q.UL] },
    { label: "Mandibular", getTeeth: (q) => [...q.LR, ...q.LL] },
    { label: "R Arch", getTeeth: (q) => [...q.UR, ...q.LR] },
    { label: "L Arch", getTeeth: (q) => [...q.UL, ...q.LL] },
    { label: "Full", getTeeth: (q) => [...q.UR, ...q.UL, ...q.LR, ...q.LL] },
];
export function ToothPicker({ value, onChange, isPediatric = false, disabled, variant = "default" }) {
    const [open, setOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState({});
    const [mounted, setMounted] = useState(false);
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);
    const quadrants = isPediatric ? PEDIATRIC_QUADRANTS : ADULT_QUADRANTS;
    const allTeeth = [...quadrants.UR, ...quadrants.UL, ...quadrants.LR, ...quadrants.LL];
    useEffect(() => { setMounted(true); }, []);
    const toggle = (fdi) => {
        if (value.includes("full-mouth")) {
            onChange([fdi]);
            return;
        }
        if (value.includes(fdi))
            onChange(value.filter((v) => v !== fdi));
        else
            onChange([...value, fdi]);
    };
    const selectAll = () => {
        onChange(allTeeth);
    };
    const clear = () => onChange([]);
    const displayValue = value.length === 0
        ? "Select teeth"
        : value.includes("full-mouth")
            ? "Full mouth"
            : value.length <= 3
                ? value.map(v => `T${v}`).join(", ")
                : `${value.slice(0, 2).map(v => `T${v}`).join(", ")} +${value.length - 2}`;
    // Compute dropdown position relative to viewport when opening
    const openDropdown = useCallback(() => {
        if (!triggerRef.current)
            return;
        const rect = triggerRef.current.getBoundingClientRect();
        const dropdownWidth = Math.min(520, window.innerWidth - 24);
        const viewportWidth = window.innerWidth;
        let left = rect.left;
        // Prevent going off right edge
        if (left + dropdownWidth > viewportWidth - 12) {
            left = viewportWidth - dropdownWidth - 12;
        }
        setDropdownStyle({
            position: "fixed",
            top: rect.bottom + 4,
            left,
            zIndex: 9999,
            width: dropdownWidth,
            pointerEvents: "auto",
        });
        setOpen(true);
    }, []);
    useEffect(() => {
        if (!open)
            return;
        const handleDocClick = (e) => {
            const target = e.target;
            if (triggerRef.current?.contains(target))
                return;
            if (dropdownRef.current?.contains(target))
                return;
            setOpen(false);
        };
        const reposition = () => openDropdown();
        document.addEventListener("mousedown", handleDocClick);
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
        return () => {
            document.removeEventListener("mousedown", handleDocClick);
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [open]);
    const dropdown = open ? (_jsxs("div", { ref: dropdownRef, style: dropdownStyle, className: "rounded-[16px] border border-tp-slate-200 bg-white p-[16px] shadow-[0_18px_50px_-18px_rgba(15,23,42,0.28)]", children: [_jsxs("div", { className: "mb-[12px] flex items-start justify-between gap-[12px]", children: [_jsxs("div", { children: [_jsx("p", { className: "font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[0.5px] text-tp-slate-500", children: isPediatric ? "Pediatric Teeth" : "Select Teeth" }), _jsx("p", { className: "mt-[3px] font-['Inter',sans-serif] text-[12px] text-tp-slate-400", children: "Choose one, many, or switch to full-mouth mode." })] }), _jsx("div", { className: "inline-flex h-[24px] min-w-[24px] items-center justify-center rounded-full bg-tp-slate-100 px-[8px] font-['Inter',sans-serif] text-[12px] font-bold text-tp-slate-600", children: value.includes("full-mouth") ? "FM" : value.length })] }), _jsx("div", { className: "mb-[12px] flex flex-wrap items-center gap-[4px]", children: QUICK_SELECT_GROUPS.map((g) => { const teeth = g.getTeeth(quadrants); const active = teeth.length > 0 && teeth.every((t) => value.includes(t)); return _jsx("button", { type: "button", onClick: () => onChange(active ? value.filter((v) => !teeth.includes(v)) : [...new Set([...value.filter((v) => v !== "full-mouth"), ...teeth])]), className: `inline-flex h-[28px] items-center rounded-[8px] px-[8px] font-['Inter',sans-serif] text-[11px] font-semibold transition-colors ${active ? "bg-tp-blue-500 text-white" : "bg-tp-slate-100 text-tp-slate-600 hover:bg-tp-slate-200"}`, children: g.label }, g.label); }) }), _jsx("div", { className: "mb-[12px] flex flex-col gap-[10px]", children: [
                    ["Upper Right", quadrants.UR],
                    ["Upper Left", quadrants.UL],
                    ["Lower Right", quadrants.LR],
                    ["Lower Left", quadrants.LL],
                ].map(([label, teeth]) => (_jsxs("div", { className: "rounded-[12px] border border-tp-slate-100 bg-tp-slate-50/60 p-[10px]", children: [_jsxs("div", { className: "mb-[8px] flex items-center justify-between", children: [_jsx("span", { className: "font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-500", children: label }), _jsxs("span", { className: "font-['Inter',sans-serif] text-[11px] text-tp-slate-400", children: [teeth.length, " teeth"] })] }), _jsx("div", { className: "flex flex-nowrap gap-[6px] overflow-x-auto min-w-0", children: teeth.map((fdi) => (_jsx(ToothPick, { fdi: fdi, selected: value.includes(fdi), onClick: () => toggle(fdi) }, fdi))) })] }, label))) }), _jsxs("div", { className: "flex flex-wrap items-center justify-end gap-[8px] border-t border-tp-slate-100 pt-[12px]", children: [_jsx("button", { type: "button", onClick: clear, className: "inline-flex h-[34px] items-center rounded-[10px] bg-tp-slate-100 px-[14px] font-['Inter',sans-serif] text-[13px] font-medium text-tp-slate-600 transition-colors hover:bg-tp-slate-200", children: "Clear" }), _jsx("button", { type: "button", onClick: () => setOpen(false), className: "inline-flex h-[34px] items-center rounded-[10px] bg-tp-blue-600 px-[14px] font-['Inter',sans-serif] text-[13px] font-semibold text-white transition-colors hover:bg-tp-blue-700", children: "Done" })] })] })) : null;
    const isInline = variant === "inline";
    return (_jsxs("div", { className: isInline ? "" : "relative", children: [_jsxs("button", { ref: triggerRef, type: "button", disabled: disabled, onClick: (e) => { e.stopPropagation(); open ? setOpen(false) : openDropdown(); }, className: isInline
                    ? "flex h-[52px] w-full items-center justify-between gap-[8px] bg-transparent px-[12px] font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551] transition-colors focus:outline-none"
                    : "inline-flex h-[42px] items-center justify-between gap-[6px] rounded-[10px] border border-tp-slate-200 bg-white px-[10px] font-['Inter',sans-serif] text-[14px] text-tp-slate-700 transition-colors hover:border-tp-blue-300 disabled:opacity-50 min-w-[140px]", children: [value.length > 0 ? (_jsx("span", { className: "flex min-w-0 flex-1 items-center gap-[4px] flex-wrap", children: isInline ? (value.includes("full-mouth") ? (_jsx("span", { className: "inline-flex h-[18px] items-center rounded-[4px] bg-tp-blue-50 px-[6px] font-['Inter',sans-serif] text-[12px] font-bold text-tp-blue-700", children: "Full mouth" })) : value.length <= 3 ? (value.map((v) => (_jsx("span", { className: "inline-flex h-[18px] items-center rounded-[4px] bg-tp-slate-100 px-[5px] font-['Inter',sans-serif] text-[12px] font-bold text-tp-slate-600", children: `T${v}` }, v)))) : (_jsxs(_Fragment, { children: [value.slice(0, 2).map((v) => (_jsxs("span", { className: "inline-flex h-[18px] items-center rounded-[4px] bg-tp-slate-100 px-[5px] font-['Inter',sans-serif] text-[12px] font-bold text-tp-slate-600", children: ["T", v] }, v))), _jsxs("span", { className: "font-['Inter',sans-serif] text-[12px] text-tp-slate-400", children: ["+", value.length - 2] })] }))) : (_jsx(_Fragment, { children: _jsx("span", { children: displayValue }) })) })) : (_jsx("span", { className: `flex items-center gap-[6px] ${isInline ? "flex-1 text-[12px] text-[#a2a2a8]" : "flex-1 text-tp-slate-400"}`, children: isInline ? "—" : (_jsx(_Fragment, { children: _jsx("span", { children: "Select teeth" }) })) })), _jsx(ArrowDown2, { size: 14, color: "currentColor", variant: "Linear" })] }), mounted && typeof document !== "undefined" && dropdown
                ? createPortal(dropdown, document.body)
                : null] }));
}
function ToothPick({ fdi, selected, onClick }) {
    return (_jsx("button", { type: "button", onClick: onClick, className: `flex h-[34px] min-w-0 flex-1 basis-0 items-center justify-center rounded-[10px] border font-['Inter',sans-serif] text-[13px] font-semibold transition-colors ${selected
            ? "border-tp-blue-500 bg-tp-blue-500 text-white"
            : "border-tp-slate-200 bg-white text-tp-slate-600 hover:border-tp-blue-300 hover:bg-tp-blue-50 hover:text-tp-blue-700"}`, children: fdi }));
}
