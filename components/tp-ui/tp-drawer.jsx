"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose, } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
const sizeMap = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    full: "sm:max-w-full",
};
function TPDrawer({ open, onOpenChange, children }) {
    return (_jsx(Sheet, { open: open, onOpenChange: onOpenChange, children: children }));
}
const TPDrawerTrigger = SheetTrigger;
function TPDrawerContent({ className, side = "right", size = "md", title, children, ...props }) {
    const isHorizontal = side === "left" || side === "right";
    // Radix requires a SheetTitle inside every SheetContent for screen-reader a11y.
    // Default to a visually-hidden title (callers can still render their own visible
    // title elsewhere in `children`); pass an explicit `title` prop to label the
    // drawer for assistive tech without rendering it visually.
    return (_jsxs(SheetContent, { side: side, className: cn("border-tp-slate-200 bg-white", isHorizontal && [
            "rounded-l-[20px]",
            sizeMap[size],
        ], !isHorizontal && "rounded-t-[20px]", className), ...props, children: [
            _jsx(SheetTitle, { className: "sr-only", children: title || "Drawer" }),
            children,
        ] }));
}
function TPDrawerHeader({ className, ...props }) {
    return (_jsx(SheetHeader, { className: cn("border-b border-tp-slate-100 px-6 py-4", className), ...props }));
}
function TPDrawerFooter({ className, ...props }) {
    return (_jsx(SheetFooter, { className: cn("border-t border-tp-slate-100 px-6 py-4", className), ...props }));
}
function TPDrawerTitle({ className, ...props }) {
    return (_jsx(SheetTitle, { className: cn("text-base font-semibold text-tp-slate-900", className), ...props }));
}
function TPDrawerDescription({ className, ...props }) {
    return (_jsx(SheetDescription, { className: cn("text-sm text-tp-slate-500", className), ...props }));
}
const TPDrawerClose = SheetClose;
export { TPDrawer, TPDrawerTrigger, TPDrawerContent, TPDrawerHeader, TPDrawerFooter, TPDrawerTitle, TPDrawerDescription, TPDrawerClose, };
