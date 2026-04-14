"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";
function ListPanel({ title, items, checked, onToggle, onToggleAll, searchable, }) {
    const [search, setSearch] = useState("");
    const filtered = useMemo(() => search
        ? items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
        : items, [items, search]);
    const allChecked = filtered.length > 0 && filtered.every((i) => checked.has(i.id));
    return (_jsxs("div", { className: "flex w-full flex-col rounded-xl border border-tp-slate-200 bg-white", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-tp-slate-100 px-3 py-2", children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: allChecked, onChange: onToggleAll, className: "h-4 w-4 rounded border-tp-slate-300 text-tp-blue-500 focus:ring-tp-blue-500/20" }), _jsx("span", { className: "text-xs font-semibold text-tp-slate-700", children: title })] }), _jsxs("span", { className: "text-xs text-tp-slate-400", children: [checked.size, "/", items.length] })] }), searchable !== false && items.length > 5 && (_jsx("div", { className: "border-b border-tp-slate-100 px-2 py-1.5", children: _jsxs("div", { className: "flex items-center gap-1.5 rounded-lg bg-tp-slate-50 px-2", children: [_jsx(Search, { size: 14, style: { flexShrink: 0 }, className: "text-tp-slate-400" }), _jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search...", className: "h-7 w-full bg-transparent text-xs text-tp-slate-900 outline-none placeholder:text-tp-slate-400" })] }) })), _jsx("div", { className: "max-h-52 overflow-y-auto p-1", children: filtered.length === 0 ? (_jsx("p", { className: "py-4 text-center text-xs text-tp-slate-400", children: "No items" })) : (filtered.map((item) => (_jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-tp-slate-700 hover:bg-tp-slate-50", children: [_jsx("input", { type: "checkbox", checked: checked.has(item.id), onChange: () => onToggle(item.id), className: "h-4 w-4 rounded border-tp-slate-300 text-tp-blue-500 focus:ring-tp-blue-500/20" }), _jsx("span", { className: "truncate", children: item.label })] }, item.id)))) })] }));
}
export function TPTransferList({ available, selected, onTransfer, availableTitle = "Available", selectedTitle = "Selected", className, }) {
    const [leftChecked, setLeftChecked] = useState(new Set());
    const [rightChecked, setRightChecked] = useState(new Set());
    const toggleLeft = (id) => {
        setLeftChecked((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };
    const toggleRight = (id) => {
        setRightChecked((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };
    const toggleAllLeft = () => {
        if (available.every((i) => leftChecked.has(i.id))) {
            setLeftChecked(new Set());
        }
        else {
            setLeftChecked(new Set(available.map((i) => i.id)));
        }
    };
    const toggleAllRight = () => {
        if (selected.every((i) => rightChecked.has(i.id))) {
            setRightChecked(new Set());
        }
        else {
            setRightChecked(new Set(selected.map((i) => i.id)));
        }
    };
    const moveRight = () => {
        const toMove = available.filter((i) => leftChecked.has(i.id));
        const newAvailable = available.filter((i) => !leftChecked.has(i.id));
        const newSelected = [...selected, ...toMove];
        onTransfer(newAvailable, newSelected);
        setLeftChecked(new Set());
    };
    const moveLeft = () => {
        const toMove = selected.filter((i) => rightChecked.has(i.id));
        const newSelected = selected.filter((i) => !rightChecked.has(i.id));
        const newAvailable = [...available, ...toMove];
        onTransfer(newAvailable, newSelected);
        setRightChecked(new Set());
    };
    return (_jsxs("div", { className: cn("flex items-center gap-3", className), children: [_jsx(ListPanel, { title: availableTitle, items: available, checked: leftChecked, onToggle: toggleLeft, onToggleAll: toggleAllLeft }), _jsxs("div", { className: "flex shrink-0 flex-col gap-2", children: [_jsx("button", { type: "button", onClick: moveRight, disabled: leftChecked.size === 0, className: "flex h-8 w-8 items-center justify-center rounded-lg border border-tp-slate-200 bg-white text-tp-slate-500 hover:bg-tp-blue-50 hover:text-tp-blue-600 disabled:opacity-40 transition-colors", "aria-label": "Move right", children: _jsx(ChevronRight, { size: 16, style: { flexShrink: 0 } }) }), _jsx("button", { type: "button", onClick: moveLeft, disabled: rightChecked.size === 0, className: "flex h-8 w-8 items-center justify-center rounded-lg border border-tp-slate-200 bg-white text-tp-slate-500 hover:bg-tp-blue-50 hover:text-tp-blue-600 disabled:opacity-40 transition-colors", "aria-label": "Move left", children: _jsx(ChevronLeft, { size: 16, style: { flexShrink: 0 } }) })] }), _jsx(ListPanel, { title: selectedTitle, items: selected, checked: rightChecked, onToggle: toggleRight, onToggleAll: toggleAllRight })] }));
}
