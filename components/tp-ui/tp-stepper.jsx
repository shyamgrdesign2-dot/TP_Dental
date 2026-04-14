"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
export function TPStepper({ steps, activeStep, orientation = "horizontal", className, }) {
    const isHorizontal = orientation === "horizontal";
    return (_jsx("div", { className: cn("flex", isHorizontal ? "items-start" : "flex-col", className), children: steps.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;
            const isLast = idx === steps.length - 1;
            return (_jsxs("div", { className: cn("flex", isHorizontal ? "flex-1 items-start" : "items-start"), children: [_jsxs("div", { className: cn("flex", isHorizontal ? "flex-col items-center" : "items-start gap-3"), children: [_jsxs("div", { className: "flex items-center", children: [isHorizontal && !isLast && idx > 0 && null, _jsx("div", { className: cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors", isCompleted && "bg-tp-success-500 text-white", isActive && "bg-tp-blue-500 text-white", !isCompleted && !isActive && "border-2 border-tp-slate-300 text-tp-slate-400"), children: isCompleted ? (_jsx(CheckCircle2, { size: 18 })) : (idx + 1) })] }), _jsxs("div", { className: cn(isHorizontal ? "mt-2 text-center" : ""), children: [_jsx("p", { className: cn("text-sm font-medium", isActive && "text-tp-blue-700", isCompleted && "text-tp-slate-900", !isActive && !isCompleted && "text-tp-slate-400"), children: step.label }), step.description && (_jsx("p", { className: "mt-0.5 text-xs text-tp-slate-400", children: step.description }))] })] }), !isLast && (isHorizontal ? (_jsx("div", { className: "mx-2 mt-4 h-0.5 flex-1 rounded-full bg-tp-slate-200", children: _jsx("div", { className: "h-full rounded-full bg-tp-success-500 transition-all", style: { width: isCompleted ? "100%" : "0%" } }) })) : (_jsx("div", { className: "ml-4 mt-1 mb-1 w-0.5 self-stretch rounded-full bg-tp-slate-200", style: { minHeight: 24 }, children: _jsx("div", { className: "w-full rounded-full bg-tp-success-500 transition-all", style: { height: isCompleted ? "100%" : "0%" } }) })))] }, idx));
        }) }));
}
