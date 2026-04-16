"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Danger } from "iconsax-reactjs";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * TPConfirmDialog — canonical confirmation / alert shell for the TP design system.
 *
 * Layout:
 *   ┌───────────────────────────────────────┐
 *   │  <title>                         [×]  │  header row
 *   ├───────────────────────────────────────┤  divider
 *   │  ⚠  <warning copy on amber chip>       │  optional warning callout
 *   │  <children — extra body content>       │
 *   ├───────────────────────────────────────┤  divider
 *   │                <secondary>  <primary>  │  footer
 *   └───────────────────────────────────────┘
 *
 * Props
 *   open, onOpenChange        — standard Radix controlled-state props
 *   title                     — short dialog title
 *   warning                   — optional body copy rendered inside the amber callout
 *   description               — optional plain-body copy rendered below the callout
 *   children                  — optional extra JSX (reason textarea, chip list, etc.)
 *   secondaryLabel            — left button label (defaults to "Cancel")
 *   onSecondary               — left-button handler (defaults to closing)
 *   secondaryTone             — "link" (default — blue underlined) | "muted"
 *   primaryLabel              — right button label
 *   onPrimary                 — right-button handler
 *   primaryTone               — "primary" | "destructive" | "success" | "warning"
 *   primaryDisabled           — disables the right button
 */
const PRIMARY_TONE_CLASS = {
    primary: "bg-tp-blue-600 text-white hover:bg-tp-blue-700",
    destructive: "bg-tp-error-600 text-white hover:bg-tp-error-700",
    success: "bg-tp-success-600 text-white hover:bg-tp-success-700",
    warning: "bg-tp-warning-600 text-white hover:bg-tp-warning-700",
};

export function TPConfirmDialog({
    open,
    onOpenChange,
    title,
    warning,
    description,
    children,
    secondaryLabel = "Cancel",
    onSecondary,
    secondaryTone = "link",
    primaryLabel,
    onPrimary,
    primaryTone = "primary",
    primaryDisabled = false,
}) {
    const handleSecondary = (e) => {
        if (onSecondary) {
            e?.preventDefault?.();
            onSecondary();
        }
    };
    const handlePrimary = (e) => {
        if (onPrimary) {
            e?.preventDefault?.();
            onPrimary();
        }
    };
    const primaryBtnClass = cn(
        "inline-flex h-[40px] items-center justify-center rounded-[10px] px-[16px] font-['Inter',sans-serif] text-[14px] font-semibold transition-colors",
        PRIMARY_TONE_CLASS[primaryTone] || PRIMARY_TONE_CLASS.primary,
        primaryDisabled && "opacity-50 cursor-not-allowed",
    );
    const secondaryBtnClass = secondaryTone === "muted"
        ? "inline-flex h-[40px] items-center justify-center rounded-[10px] border border-tp-slate-200 bg-white px-[16px] font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-700 hover:bg-tp-slate-50 transition-colors"
        : "inline-flex h-[40px] items-center justify-center rounded-[10px] bg-transparent px-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-tp-blue-600 underline underline-offset-[4px] decoration-2 hover:text-tp-blue-700";
    return _jsx(AlertDialogPrimitive.Root, {
        open: open,
        onOpenChange: onOpenChange,
        children: _jsxs(AlertDialogPrimitive.Portal, {
            children: [
                _jsx(AlertDialogPrimitive.Overlay, {
                    className: "fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
                }),
                _jsxs(AlertDialogPrimitive.Content, {
                    className: "fixed left-1/2 top-1/2 z-50 w-[480px] max-w-[94vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[14px] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.15)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                    children: [
                        _jsxs("div", {
                            className: "flex items-center justify-between gap-[12px] px-[20px] py-[16px]",
                            children: [
                                _jsx(AlertDialogPrimitive.Title, {
                                    className: "font-['Inter',sans-serif] text-[16px] font-semibold text-tp-slate-900",
                                    children: title,
                                }),
                                _jsx(AlertDialogPrimitive.Cancel, {
                                    asChild: true,
                                    children: _jsx("button", {
                                        type: "button",
                                        "aria-label": "Close",
                                        className: "inline-flex h-[28px] w-[28px] items-center justify-center rounded-[6px] bg-tp-slate-900 text-white transition-colors hover:bg-tp-slate-700",
                                        children: _jsx(X, { size: 16, strokeWidth: 2.5 }),
                                    }),
                                }),
                            ],
                        }),
                        _jsx("div", { className: "h-px bg-tp-slate-100", "aria-hidden": true }),
                        (warning || description || children) && _jsxs("div", {
                            className: "flex flex-col gap-[14px] px-[20px] py-[16px]",
                            children: [
                                warning && _jsxs("div", {
                                    className: "flex items-start gap-[12px] rounded-[10px] bg-tp-warning-50 px-[16px] py-[14px]",
                                    children: [
                                        _jsx(Danger, {
                                            size: 20,
                                            variant: "Linear",
                                            className: "mt-[2px] shrink-0 text-tp-warning-500",
                                        }),
                                        _jsx("p", {
                                            className: "font-['Inter',sans-serif] text-[14px] leading-[1.45] text-tp-slate-700",
                                            children: warning,
                                        }),
                                    ],
                                }),
                                description && _jsx(AlertDialogPrimitive.Description, {
                                    className: "font-['Inter',sans-serif] text-[14px] leading-[1.5] text-tp-slate-600",
                                    children: description,
                                }),
                                children,
                            ],
                        }),
                        _jsxs("div", {
                            className: "flex items-center justify-end gap-[14px] border-t border-tp-slate-100 px-[20px] py-[14px]",
                            children: [
                                _jsx(AlertDialogPrimitive.Cancel, {
                                    asChild: true,
                                    children: _jsx("button", {
                                        type: "button",
                                        onClick: handleSecondary,
                                        className: secondaryBtnClass,
                                        children: secondaryLabel,
                                    }),
                                }),
                                _jsx(AlertDialogPrimitive.Action, {
                                    asChild: true,
                                    children: _jsx("button", {
                                        type: "button",
                                        onClick: handlePrimary,
                                        disabled: primaryDisabled,
                                        className: primaryBtnClass,
                                        children: primaryLabel,
                                    }),
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
    });
}
