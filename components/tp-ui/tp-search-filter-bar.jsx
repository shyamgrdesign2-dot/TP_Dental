"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, XCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
export function TPSearchFilterBar({ searchPlaceholder = "Search...", searchValue = "", onSearchChange, filters = [], onFilterChange, actions, className, }) {
    return (_jsxs("div", { className: cn("flex flex-wrap items-center gap-2", className), children: [_jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [_jsx(Search, { size: 18, className: "absolute left-[13px] top-1/2 -translate-y-1/2 text-[#a2a2a8] pointer-events-none" }), _jsx("input", { type: "text", value: searchValue, onChange: (e) => onSearchChange?.(e.target.value), placeholder: searchPlaceholder, className: cn("w-full bg-white border border-[#e2e2ea] rounded-[10px] text-[#454551]", "pl-[38px] pr-9", "placeholder:text-[#a2a2a8]", "focus:border-[#4b4ad5] focus:outline-none focus:ring-2 focus:ring-[#4b4ad5]/20", "transition-colors"), style: {
                            height: 38,
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 14,
                            padding: "6px 13px 6px 38px",
                        } }), searchValue && (_jsx("button", { type: "button", onClick: () => onSearchChange?.(""), className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a2a2a8] hover:text-[#454551] transition-colors", "aria-label": "Clear search", children: _jsx(XCircle, { size: 16 }) }))] }), filters.map((filter) => (_jsx(FilterDropdown, { filter: filter, onFilterChange: onFilterChange }, filter.id))), actions && _jsx("div", { className: "ml-auto shrink-0", children: actions })] }));
}
// ─── Filter Dropdown ────────────────────────────────────────
function FilterDropdown({ filter, onFilterChange, }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    // Close on outside click
    useEffect(() => {
        if (!open)
            return;
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);
    const selectedOption = filter.options.find((o) => o.value === filter.selectedValue);
    const displayLabel = selectedOption?.value && selectedOption.value !== "all"
        ? selectedOption.label
        : filter.label;
    const hasActiveFilter = filter.selectedValue && filter.selectedValue !== "all";
    return (_jsxs("div", { ref: ref, className: "relative", children: [_jsxs("button", { type: "button", onClick: () => setOpen(!open), className: cn("inline-flex items-center gap-[6px] rounded-[10px] border transition-colors", hasActiveFilter
                    ? "text-[#4b4ad5] border-[#4b4ad5]/30 bg-[#eef]"
                    : "text-[#454551] border-[#e2e2ea] bg-white hover:border-[#a2a2a8] hover:bg-[#f1f1f5]"), style: {
                    height: 38,
                    padding: "6px 12px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                }, children: [_jsx("span", { className: "truncate max-w-[120px]", children: displayLabel }), _jsx(ChevronDown, { size: 14, className: cn("shrink-0 transition-transform", hasActiveFilter ? "text-[#4b4ad5]" : "text-[#a2a2a8]", open && "rotate-180") })] }), open && (_jsx("div", { className: "absolute left-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-[10px] border border-[#e2e2ea] bg-white py-1 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150", children: filter.options.map((option) => (_jsxs("button", { type: "button", onClick: () => {
                        onFilterChange?.(filter.id, option.value);
                        setOpen(false);
                    }, className: cn("flex w-full items-center px-3 py-2 text-xs transition-colors", filter.selectedValue === option.value
                        ? "bg-[#eef] text-[#4b4ad5] font-semibold"
                        : "text-[#454551] hover:bg-[#f1f1f5]"), style: { fontFamily: "'Inter', sans-serif" }, children: [_jsx("span", { className: "flex-1 text-left", children: option.label }), filter.selectedValue === option.value && (_jsx(Check, { size: 14, className: "text-[#4b4ad5]" }))] }, option.value))) }))] }));
}
