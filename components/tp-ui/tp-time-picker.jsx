"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
const hours24 = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const hours12 = Array.from({ length: 12 }, (_, i) => ((i === 0 ? 12 : i)).toString().padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
function ScrollColumn({ items, selected, onSelect, }) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            const idx = items.indexOf(selected);
            if (idx >= 0) {
                const el = ref.current.children[idx];
                el?.scrollIntoView({ block: "center", behavior: "smooth" });
            }
        }
    }, [selected, items]);
    return (_jsx("div", { ref: ref, className: "h-48 w-14 overflow-y-auto scrollbar-thin", children: items.map((item) => (_jsx("button", { type: "button", onClick: () => onSelect(item), className: cn("flex h-9 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors", selected === item
                ? "bg-tp-blue-500 text-white"
                : "text-tp-slate-600 hover:bg-tp-blue-50 hover:text-tp-blue-700"), children: item }, item))) }));
}
export function TPTimePicker({ value = "09:00", onChange, placeholder = "Select time", disabled = false, use24h = true, className, }) {
    const [open, setOpen] = useState(false);
    const [h, m] = value.split(":");
    const [period, setPeriod] = useState(() => {
        const hour = parseInt(h || "9", 10);
        return hour >= 12 ? "PM" : "AM";
    });
    const hourItems = use24h ? hours24 : hours12;
    const displayTime = () => {
        if (!value)
            return "";
        if (use24h)
            return value;
        const hour = parseInt(h, 10);
        const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const p = hour >= 12 ? "PM" : "AM";
        return `${h12.toString().padStart(2, "0")}:${m} ${p}`;
    };
    const handleHourChange = (newH) => {
        if (use24h) {
            onChange?.(`${newH}:${m}`);
        }
        else {
            let h24 = parseInt(newH, 10);
            if (period === "PM" && h24 !== 12)
                h24 += 12;
            if (period === "AM" && h24 === 12)
                h24 = 0;
            onChange?.(`${h24.toString().padStart(2, "0")}:${m}`);
        }
    };
    const handleMinuteChange = (newM) => {
        onChange?.(`${h}:${newM}`);
    };
    const handlePeriodChange = (p) => {
        setPeriod(p);
        let hour = parseInt(h, 10);
        if (p === "PM" && hour < 12)
            hour += 12;
        if (p === "AM" && hour >= 12)
            hour -= 12;
        onChange?.(`${hour.toString().padStart(2, "0")}:${m}`);
    };
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, disabled: disabled, children: _jsxs("button", { type: "button", className: cn("flex h-[42px] w-full items-center gap-2 rounded-lg border border-tp-slate-300 bg-white px-3 text-left text-sm transition-colors hover:border-tp-slate-400 focus:border-tp-blue-500 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50", !value && "text-tp-slate-400", value && "text-tp-slate-900", className), children: [_jsx(Clock, { size: 18, className: "shrink-0 text-tp-slate-400" }), _jsx("span", { className: "flex-1 truncate", children: displayTime() || placeholder })] }) }), _jsx(PopoverContent, { className: "w-auto rounded-xl border-tp-slate-200 bg-white p-3 shadow-lg", align: "start", children: _jsxs("div", { className: "flex gap-2", children: [_jsxs("div", { children: [_jsx("p", { className: "mb-1 text-center text-[10px] font-semibold uppercase tracking-wider text-tp-slate-400", children: "Hour" }), _jsx(ScrollColumn, { items: hourItems, selected: use24h ? h : (() => {
                                        const hour = parseInt(h, 10);
                                        const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                                        return h12.toString().padStart(2, "0");
                                    })(), onSelect: handleHourChange })] }), _jsx("div", { className: "flex items-center text-tp-slate-300 font-bold", children: ":" }), _jsxs("div", { children: [_jsx("p", { className: "mb-1 text-center text-[10px] font-semibold uppercase tracking-wider text-tp-slate-400", children: "Min" }), _jsx(ScrollColumn, { items: minutes, selected: m, onSelect: handleMinuteChange })] }), !use24h && (_jsxs("div", { className: "ml-1 flex flex-col items-center", children: [_jsx("p", { className: "mb-1 text-center text-[10px] font-semibold uppercase tracking-wider text-tp-slate-400", children: "\u00A0" }), _jsx("div", { className: "flex h-48 flex-col items-center justify-center", children: _jsxs("button", { type: "button", onClick: () => handlePeriodChange(period === "AM" ? "PM" : "AM"), className: "relative flex h-[68px] w-12 flex-col items-stretch overflow-hidden rounded-lg border border-tp-slate-200 bg-tp-slate-50 transition-colors hover:border-tp-blue-300", children: [_jsx("span", { className: cn("flex h-[34px] items-center justify-center text-xs font-bold transition-all", period === "AM"
                                                    ? "bg-tp-blue-500 text-white"
                                                    : "text-tp-slate-400"), children: "AM" }), _jsx("span", { className: cn("flex h-[34px] items-center justify-center text-xs font-bold transition-all", period === "PM"
                                                    ? "bg-tp-blue-500 text-white"
                                                    : "text-tp-slate-400"), children: "PM" })] }) })] }))] }) })] }));
}
