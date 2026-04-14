"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { Info, CheckCircle2, AlertCircle, AlertTriangle, XCircle, } from "lucide-react";
import { cn } from "@/lib/utils";
const statusConfig = {
    info: {
        bg: "bg-tp-blue-50",
        border: "border-tp-blue-200",
        text: "text-tp-blue-800",
        icon: _jsx(Info, { size: 18, style: { color: "var(--tp-blue-500)", flexShrink: 0 }, className: "text-tp-blue-500" }),
    },
    success: {
        bg: "bg-tp-success-50",
        border: "border-tp-success-200",
        text: "text-tp-success-800",
        icon: _jsx(CheckCircle2, { size: 18, style: { color: "var(--tp-success-500)", flexShrink: 0 }, className: "text-tp-success-500" }),
    },
    warning: {
        bg: "bg-tp-warning-50",
        border: "border-tp-warning-200",
        text: "text-tp-warning-800",
        icon: _jsx(AlertTriangle, { size: 18, style: { color: "var(--tp-warning-500)", flexShrink: 0 }, className: "text-tp-warning-500" }),
    },
    error: {
        bg: "bg-tp-error-50",
        border: "border-tp-error-200",
        text: "text-tp-error-800",
        icon: _jsx(AlertCircle, { size: 18, style: { color: "var(--tp-error-500)", flexShrink: 0 }, className: "text-tp-error-500" }),
    },
};
export function TPBanner({ status = "info", title, children, dismissible = false, onDismiss, action, className, }) {
    const [visible, setVisible] = useState(true);
    const config = statusConfig[status];
    if (!visible)
        return null;
    const handleDismiss = () => {
        setVisible(false);
        onDismiss?.();
    };
    return (_jsxs("div", { role: "alert", className: cn("flex items-start gap-3 rounded-xl border px-4 py-3", config.bg, config.border, className), children: [_jsx("span", { className: "mt-0.5 shrink-0", children: config.icon }), _jsxs("div", { className: cn("min-w-0 flex-1 text-sm", config.text), children: [title && _jsx("p", { className: "font-semibold", children: title }), _jsx("div", { className: title ? "mt-0.5" : "", children: children })] }), action && _jsx("div", { className: "shrink-0", children: action }), dismissible && (_jsx("button", { type: "button", onClick: handleDismiss, className: cn("shrink-0 opacity-60 hover:opacity-100 transition-opacity mt-0.5", config.text), "aria-label": "Dismiss", children: _jsx(XCircle, { size: 18, style: { flexShrink: 0 } }) }))] }));
}
