"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";
const sizeStyles = {
    sm: { container: "h-8 p-0.5", item: "px-3 text-xs" },
    md: { container: "h-9 p-0.5", item: "px-4 text-sm" },
    lg: { container: "h-10 p-1", item: "px-5 text-sm" },
};
export function TPSegmentedControl({ value, onValueChange, items, size = "md", className, }) {
    const s = sizeStyles[size];
    return (_jsx(ToggleGroupPrimitive.Root, { type: "single", value: value, onValueChange: (v) => { if (v)
            onValueChange(v); }, className: cn("inline-flex items-center rounded-lg bg-tp-slate-100", s.container, className), children: items.map((item) => {
            const isActive = value === item.value;
            return (_jsx(ToggleGroupPrimitive.Item, { value: item.value, disabled: item.disabled, className: cn("relative z-10 inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-blue-500/30 disabled:pointer-events-none disabled:opacity-50", s.item, isActive
                    ? "bg-white text-tp-blue-700 shadow-sm"
                    : "text-tp-slate-600 hover:text-tp-slate-900 hover:bg-white/60"), children: item.label }, item.value));
        }) }));
}
