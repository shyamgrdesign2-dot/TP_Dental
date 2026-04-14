"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
const statusConfig = {
    queue: {
        label: "Queue",
        bg: "bg-tp-blue-50",
        text: "text-tp-blue-700",
        dot: "bg-tp-blue-500",
    },
    "in-progress": {
        label: "In Progress",
        bg: "bg-tp-violet-50",
        text: "text-tp-violet-700",
        dot: "bg-tp-violet-500",
    },
    finished: {
        label: "Finished",
        bg: "bg-tp-success-50",
        text: "text-tp-success-700",
        dot: "bg-tp-success-500",
    },
    cancelled: {
        label: "Cancelled",
        bg: "bg-tp-error-50",
        text: "text-tp-error-700",
        dot: "bg-tp-error-500",
    },
    draft: {
        label: "Draft",
        bg: "bg-tp-slate-100",
        text: "text-tp-slate-600",
        dot: "bg-tp-slate-400",
    },
    pending: {
        label: "Pending",
        bg: "bg-tp-warning-50",
        text: "text-tp-warning-700",
        dot: "bg-tp-warning-500",
    },
    active: {
        label: "Active",
        bg: "bg-tp-success-50",
        text: "text-tp-success-700",
        dot: "bg-tp-success-500",
    },
    inactive: {
        label: "Inactive",
        bg: "bg-tp-slate-100",
        text: "text-tp-slate-600",
        dot: "bg-tp-slate-400",
    },
    scheduled: {
        label: "Scheduled",
        bg: "bg-tp-blue-50",
        text: "text-tp-blue-700",
        dot: "bg-tp-blue-500",
    },
    completed: {
        label: "Completed",
        bg: "bg-tp-success-50",
        text: "text-tp-success-700",
        dot: "bg-tp-success-500",
    },
    overdue: {
        label: "Overdue",
        bg: "bg-tp-error-50",
        text: "text-tp-error-700",
        dot: "bg-tp-error-500",
    },
};
export function TPStatusBadge({ status, label, size = "md", showDot = true, className, }) {
    const config = statusConfig[status];
    const displayLabel = label ?? config.label;
    return (_jsxs("span", { className: cn("inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap", config.bg, config.text, size === "sm"
            ? "h-[22px] px-2 text-[10px]"
            : "h-[26px] px-2.5 text-xs", className), children: [showDot && (_jsx("span", { className: cn("shrink-0 rounded-full", config.dot, size === "sm" ? "h-1.5 w-1.5" : "h-[6px] w-[6px]") })), displayLabel] }));
}
