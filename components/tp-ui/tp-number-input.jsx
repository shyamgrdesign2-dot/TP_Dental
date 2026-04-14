"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
export function TPNumberInput({ value, onChange, min = 0, max = Infinity, step = 1, disabled = false, label, className, }) {
    const canDecrement = value - step >= min;
    const canIncrement = value + step <= max;
    const handleInputChange = (e) => {
        const raw = e.target.value;
        if (raw === "" || raw === "-")
            return;
        const n = parseFloat(raw);
        if (!isNaN(n)) {
            onChange(Math.min(max, Math.max(min, n)));
        }
    };
    return (_jsxs("div", { className: cn("inline-flex flex-col gap-1.5", className), children: [label && (_jsx("label", { className: "text-sm font-medium text-tp-slate-700", children: label })), _jsxs("div", { className: "inline-flex items-center rounded-lg border border-tp-slate-300 bg-white focus-within:border-tp-blue-500 focus-within:ring-2 focus-within:ring-tp-blue-500/20", children: [_jsx("button", { type: "button", disabled: disabled || !canDecrement, onClick: () => onChange(Math.max(min, value - step)), className: "flex h-[42px] w-10 items-center justify-center rounded-l-lg text-tp-slate-500 hover:bg-tp-slate-50 hover:text-tp-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors", "aria-label": "Decrease", children: _jsx(Minus, { size: 16 }) }), _jsx("input", { type: "text", inputMode: "numeric", value: value, onChange: handleInputChange, disabled: disabled, className: "h-[42px] w-16 border-x border-tp-slate-200 bg-transparent text-center text-sm font-semibold text-tp-slate-900 outline-none disabled:opacity-50" }), _jsx("button", { type: "button", disabled: disabled || !canIncrement, onClick: () => onChange(Math.min(max, value + step)), className: "flex h-[42px] w-10 items-center justify-center rounded-r-lg text-tp-slate-500 hover:bg-tp-slate-50 hover:text-tp-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors", "aria-label": "Increase", children: _jsx(Plus, { size: 16 }) })] })] }));
}
