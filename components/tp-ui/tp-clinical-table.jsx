"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
// ─── Component ──────────────────────────────────────────────
export function TPClinicalTable({ columns, data, selectedRows = [], onRowSelect, onRowClick, rowKey, emptyMessage = "No records found", emptyIcon, loading = false, selectable = false, className, }) {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    // Sorting
    const handleSort = useCallback((colId) => {
        if (sortColumn === colId) {
            if (sortDirection === "asc") {
                setSortDirection("desc");
            }
            else {
                setSortColumn(null);
                setSortDirection("asc");
            }
        }
        else {
            setSortColumn(colId);
            setSortDirection("asc");
        }
    }, [sortColumn, sortDirection]);
    const sortedData = useMemo(() => {
        if (!sortColumn)
            return data;
        const col = columns.find((c) => c.id === sortColumn);
        if (!col?.sortValue)
            return data;
        const sorted = [...data].sort((a, b) => {
            const aVal = col.sortValue(a);
            const bVal = col.sortValue(b);
            if (typeof aVal === "string" && typeof bVal === "string") {
                return aVal.localeCompare(bVal);
            }
            return Number(aVal) - Number(bVal);
        });
        return sortDirection === "desc" ? sorted.reverse() : sorted;
    }, [data, sortColumn, sortDirection, columns]);
    // Selection
    const allSelected = selectable && sortedData.length > 0 && selectedRows.length === sortedData.length;
    const someSelected = selectable && selectedRows.length > 0 && !allSelected;
    const toggleAll = () => {
        if (allSelected) {
            onRowSelect?.([]);
        }
        else {
            onRowSelect?.(sortedData.map(rowKey));
        }
    };
    const toggleRow = (id) => {
        if (selectedRows.includes(id)) {
            onRowSelect?.(selectedRows.filter((r) => r !== id));
        }
        else {
            onRowSelect?.([...selectedRows, id]);
        }
    };
    return (_jsx("div", { className: cn("bg-white", className), children: _jsxs("table", { className: "w-full border-collapse text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "h-[30px] bg-[#f1f1f5]", children: [selectable && (_jsx("th", { className: "h-[30px] w-12 px-3 py-0 align-middle text-center", children: _jsx(Checkbox, { checked: allSelected, indeterminate: someSelected, onChange: toggleAll, "aria-label": "Select all" }) })), columns.map((col) => (_jsx("th", { className: cn("h-[30px] px-3 py-0 align-middle text-left text-[#454551]", col.align === "center" && "text-center", col.align === "right" && "text-right", col.sortable && "cursor-pointer select-none hover:text-[#454551]", col.sticky &&
                                        "sticky right-0 bg-tp-slate-50 shadow-[-10px_0_14px_2px_rgba(23,23,37,0.12)]"), style: {
                                        width: col.width,
                                        minWidth: col.minWidth,
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        fontSize: 12,
                                        lineHeight: "12px",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                    }, onClick: () => col.sortable && handleSort(col.id), children: _jsxs("span", { className: "inline-flex items-center gap-1", children: [col.header, col.sortable && (_jsxs("span", { className: "inline-flex flex-col -space-y-1", children: [_jsx(ArrowUp, { size: 10, className: cn(sortColumn === col.id && sortDirection === "asc"
                                                            ? "text-[#4b4ad5]"
                                                            : "text-[#a2a2a8]") }), _jsx(ArrowDown, { size: 10, className: cn(sortColumn === col.id && sortDirection === "desc"
                                                            ? "text-[#4b4ad5]"
                                                            : "text-[#a2a2a8]") })] }))] }) }, col.id)))] }) }), _jsx("tbody", { children: loading ? (
                        // Loading skeleton
                        Array.from({ length: 5 }).map((_, i) => (_jsxs("tr", { children: [selectable && _jsx("td", { className: "px-3 py-3", children: _jsx("div", { className: "mx-auto h-5 w-5 animate-pulse rounded bg-[#f1f1f5]" }) }), columns.map((col) => (_jsx("td", { className: "px-3 py-3", children: _jsx("div", { className: "h-4 w-3/4 animate-pulse rounded bg-[#f1f1f5]" }) }, col.id)))] }, i)))) : sortedData.length === 0 ? (
                        // Empty state
                        _jsx("tr", { children: _jsxs("td", { colSpan: columns.length + (selectable ? 1 : 0), className: "px-6 py-12 text-center", children: [emptyIcon && _jsx("div", { className: "mb-3 flex justify-center text-[#a2a2a8]", children: emptyIcon }), _jsx("p", { className: "text-sm text-[#a2a2a8]", children: emptyMessage })] }) })) : (sortedData.map((row) => {
                            const id = rowKey(row);
                            const isSelected = selectedRows.includes(id);
                            return (_jsxs("tr", { className: cn("border-t border-[#e2e2ea] transition-colors", isSelected ? "bg-[#eef]" : "hover:bg-[#f1f1f5]/60", onRowClick && "cursor-pointer"), onClick: () => onRowClick?.(row), children: [selectable && (_jsx("td", { className: "w-12 px-3 py-3 text-center", onClick: (e) => e.stopPropagation(), children: _jsx(Checkbox, { checked: isSelected, onChange: () => toggleRow(id), "aria-label": `Select row ${id}` }) })), columns.map((col) => (_jsx("td", { className: cn("px-3 py-3 text-[#454551]", col.align === "center" && "text-center", col.align === "right" && "text-right", col.sticky &&
                                            "sticky right-0 bg-white shadow-[-10px_0_14px_2px_rgba(23,23,37,0.10)]", col.sticky && isSelected && "bg-tp-blue-50"), style: { width: col.width, minWidth: col.minWidth }, children: col.accessor(row) }, col.id)))] }, id));
                        })) })] }) }));
}
// ─── Checkbox sub-component ─────────────────────────────────
function Checkbox({ checked, indeterminate, onChange, ...props }) {
    return (_jsxs("button", { type: "button", role: "checkbox", "aria-checked": indeterminate ? "mixed" : checked, onClick: (e) => {
            e.stopPropagation();
            onChange();
        }, className: cn("inline-flex h-5 w-5 items-center justify-center rounded-[6px] border-[1.5px] transition-all", checked || indeterminate
            ? "border-[#4b4ad5] bg-[#4b4ad5] shadow-[0_1px_2px_rgba(75,74,213,0.2)]"
            : "border-[#a2a2a8] bg-white hover:border-[#454551]"), ...props, children: [checked && (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: _jsx("path", { d: "M2.5 6l2.5 2.5 4.5-5", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })), indeterminate && !checked && (_jsx("div", { className: "h-0.5 w-2.5 rounded-full bg-white" }))] }));
}
