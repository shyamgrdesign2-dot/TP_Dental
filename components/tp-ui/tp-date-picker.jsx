"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
export function TPDatePicker({ value, onChange, placeholder = "Select date", disabled = false, className, }) {
    const [open, setOpen] = useState(false);
    const formatted = value
        ? value.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "";
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, disabled: disabled, children: _jsxs("button", { type: "button", className: cn("flex h-[42px] w-full items-center gap-2 rounded-lg border border-tp-slate-300 bg-white px-3 text-left text-sm transition-colors hover:border-tp-slate-400 focus:border-tp-blue-500 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50", !value && "text-tp-slate-400", value && "text-tp-slate-900", className), children: [_jsx(Calendar, { size: 18, style: { flexShrink: 0 }, className: "shrink-0 text-tp-slate-400" }), _jsx("span", { className: "flex-1 truncate", children: formatted || placeholder })] }) }), _jsx(PopoverContent, { className: "w-auto rounded-xl border-tp-slate-200 bg-white p-3 shadow-lg", align: "start", children: _jsx(DayPicker, { mode: "single", selected: value, onSelect: (d) => {
                        onChange?.(d);
                        setOpen(false);
                    }, components: {
                        Chevron: ({ orientation }) => orientation === "left" ? (_jsx(ChevronLeft, { size: 16, style: { flexShrink: 0 } })) : (_jsx(ChevronRight, { size: 16, style: { flexShrink: 0 } })),
                    }, classNames: {
                        months: "flex gap-4",
                        month: "flex flex-col gap-2",
                        month_caption: "flex items-center justify-center h-8",
                        caption_label: "text-sm font-semibold text-tp-slate-900",
                        nav: "flex items-center gap-1",
                        button_previous: "absolute left-1 top-0 h-8 w-8 inline-flex items-center justify-center rounded-lg text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700",
                        button_next: "absolute right-1 top-0 h-8 w-8 inline-flex items-center justify-center rounded-lg text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700",
                        weekdays: "grid grid-cols-7",
                        weekday: "w-9 text-center text-[11px] font-medium text-tp-slate-400",
                        week: "grid grid-cols-7",
                        day: "p-0",
                        day_button: "h-9 w-9 rounded-lg text-sm font-medium text-tp-slate-700 hover:bg-tp-blue-50 hover:text-tp-blue-700 inline-flex items-center justify-center transition-colors",
                        selected: "!bg-tp-blue-500 !text-white hover:!bg-tp-blue-600 rounded-lg",
                        today: "font-bold text-tp-blue-600",
                        outside: "opacity-40",
                        disabled: "opacity-30 cursor-not-allowed",
                    } }) })] }));
}
