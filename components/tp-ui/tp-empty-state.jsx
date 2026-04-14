"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
export function TPEmptyState({ icon, title, description, action, className, }) {
    return (_jsxs("div", { className: cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-tp-slate-200 bg-tp-slate-50/50 px-6 py-12 text-center", className), children: [icon && (_jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tp-blue-50 text-tp-blue-500", children: icon })), _jsx("h3", { className: "text-base font-semibold text-tp-slate-900", children: title }), description && (_jsx("p", { className: "mt-1.5 max-w-sm text-sm leading-relaxed text-tp-slate-500", children: description })), action && _jsx("div", { className: "mt-5", children: action })] }));
}
