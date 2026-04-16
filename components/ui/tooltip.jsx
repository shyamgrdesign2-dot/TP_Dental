'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';
function TooltipProvider({ delayDuration = 0, ...props }) {
    return (_jsx(TooltipPrimitive.Provider, { "data-slot": "tooltip-provider", delayDuration: delayDuration, ...props }));
}
function Tooltip({ ...props }) {
    return (_jsx(TooltipProvider, { children: _jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) }));
}
function TooltipTrigger({ ...props }) {
    return _jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({ className, sideOffset = 4, arrowClassName, children, ...props }) {
    // Default TP tooltip: white surface, no border, soft drop-shadow. The arrow
    // is an absolutely-positioned child, so we apply `filter: drop-shadow()` to the
    // *root* — that way the shadow traces the composite outline of body + arrow
    // without any seam. Consumers override the body via `className` and the arrow
    // tint via `arrowClassName`.
    return (_jsx(TooltipPrimitive.Portal, { children: _jsxs(TooltipPrimitive.Content, { "data-slot": "tooltip-content", sideOffset: sideOffset, style: { filter: "drop-shadow(0 6px 18px rgba(15,23,42,0.14)) drop-shadow(0 1px 2px rgba(15,23,42,0.06))" }, className: cn('bg-white text-tp-slate-800 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-[10px] px-3 py-1.5 text-xs text-balance', className), ...props, children: [children, _jsx(TooltipPrimitive.Arrow, { asChild: true, children: _jsx("svg", { width: 12, height: 7, viewBox: "0 0 12 7", "aria-hidden": true, className: cn("block text-white", arrowClassName), children: _jsx("path", { d: "M0 0H12L7.4 5.8C6.76 6.6 5.64 6.6 5 5.8L0 0Z", fill: "currentColor" }) }) })] }) }));
}
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
