"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
/**
 * TPPopover — TP-branded floating popover (wraps shadcn Popover).
 * Tokens: radius 12px, border tp-slate-200, shadow md.
 */
const TPPopover = Popover;
const TPPopoverTrigger = PopoverTrigger;
const TPPopoverAnchor = PopoverAnchor;
function TPPopoverContent({ className, sideOffset = 6, ...props }) {
    return (_jsx(PopoverContent, { sideOffset: sideOffset, className: cn("w-80 rounded-xl border-tp-slate-200 bg-white p-4 shadow-md", className), ...props }));
}
export { TPPopover, TPPopoverTrigger, TPPopoverContent, TPPopoverAnchor };
