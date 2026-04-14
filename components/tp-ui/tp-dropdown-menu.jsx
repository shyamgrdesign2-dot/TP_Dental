"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
/**
 * TPDropdownMenu — TP-branded dropdown menu (wraps shadcn DropdownMenu).
 * Tokens: radius 12px, border tp-slate-200, hover tp-blue-50, shadow md.
 */
const TPDropdownMenu = DropdownMenu;
const TPDropdownMenuTrigger = DropdownMenuTrigger;
const TPDropdownMenuGroup = DropdownMenuGroup;
const TPDropdownMenuSub = DropdownMenuSub;
const TPDropdownMenuRadioGroup = DropdownMenuRadioGroup;
function TPDropdownMenuContent({ className, sideOffset = 6, ...props }) {
    return (_jsx(DropdownMenuContent, { sideOffset: sideOffset, className: cn("rounded-xl border-tp-slate-200 bg-white p-1.5 shadow-md", className), ...props }));
}
function TPDropdownMenuItem({ className, ...props }) {
    return (_jsx(DropdownMenuItem, { className: cn("rounded-lg px-3 py-2 text-[13px] font-medium text-tp-slate-700 focus:bg-tp-blue-50 focus:text-tp-blue-700", className), ...props }));
}
function TPDropdownMenuCheckboxItem({ className, ...props }) {
    return (_jsx(DropdownMenuCheckboxItem, { className: cn("rounded-lg px-3 py-2 text-[13px] font-medium text-tp-slate-700 focus:bg-tp-blue-50 focus:text-tp-blue-700", className), ...props }));
}
function TPDropdownMenuRadioItem({ className, ...props }) {
    return (_jsx(DropdownMenuRadioItem, { className: cn("rounded-lg px-3 py-2 text-[13px] font-medium text-tp-slate-700 focus:bg-tp-blue-50 focus:text-tp-blue-700", className), ...props }));
}
function TPDropdownMenuLabel({ className, ...props }) {
    return (_jsx(DropdownMenuLabel, { className: cn("px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-tp-slate-400", className), ...props }));
}
function TPDropdownMenuSeparator({ className, ...props }) {
    return (_jsx(DropdownMenuSeparator, { className: cn("my-1 bg-tp-slate-100", className), ...props }));
}
function TPDropdownMenuSubTrigger({ className, ...props }) {
    return (_jsx(DropdownMenuSubTrigger, { className: cn("rounded-lg px-3 py-2 text-[13px] font-medium text-tp-slate-700 focus:bg-tp-blue-50", className), ...props }));
}
function TPDropdownMenuSubContent({ className, ...props }) {
    return (_jsx(DropdownMenuSubContent, { className: cn("rounded-xl border-tp-slate-200 bg-white p-1.5 shadow-md", className), ...props }));
}
const TPDropdownMenuShortcut = DropdownMenuShortcut;
export { TPDropdownMenu, TPDropdownMenuTrigger, TPDropdownMenuContent, TPDropdownMenuGroup, TPDropdownMenuItem, TPDropdownMenuCheckboxItem, TPDropdownMenuRadioGroup, TPDropdownMenuRadioItem, TPDropdownMenuLabel, TPDropdownMenuSeparator, TPDropdownMenuShortcut, TPDropdownMenuSub, TPDropdownMenuSubTrigger, TPDropdownMenuSubContent, };
