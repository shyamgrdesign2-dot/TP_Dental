"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
const dotColors = {
    blue: "bg-tp-blue-500",
    success: "bg-tp-success-500",
    error: "bg-tp-error-500",
    warning: "bg-tp-warning-500",
    slate: "bg-tp-slate-400",
    violet: "bg-tp-violet-500",
};
export function TPTimeline({ items, className }) {
    return (_jsx("div", { className: cn("flex flex-col", className), children: items.map((item, idx) => {
            const color = item.color || "blue";
            const isLast = idx === items.length - 1;
            return (_jsxs("div", { className: "flex gap-3", children: [_jsxs("div", { className: "flex flex-col items-center", children: [item.icon ? (_jsx("div", { className: cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", dotColors[color], "text-white"), children: item.icon })) : (_jsx("div", { className: cn("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", dotColors[color]) })), !isLast && (_jsx("div", { className: "mt-1 w-px flex-1 bg-tp-slate-200", style: { minHeight: 20 } }))] }), _jsxs("div", { className: cn("min-w-0 pb-6", isLast && "pb-0"), children: [_jsxs("div", { className: "flex items-baseline gap-2", children: [_jsx("p", { className: "text-sm font-medium text-tp-slate-900", children: item.title }), item.timestamp && (_jsx("span", { className: "shrink-0 text-xs text-tp-slate-400", children: item.timestamp }))] }), item.description && (_jsx("p", { className: "mt-0.5 text-sm text-tp-slate-500", children: item.description }))] })] }, idx));
        }) }));
}
