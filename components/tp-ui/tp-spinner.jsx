"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
};
export function TPSpinner({ size = "md", className, color }) {
    return (_jsx(RefreshCw, { size: sizeMap[size], role: "status", "aria-label": "Loading", className: cn("animate-spin text-tp-blue-500", className), style: color ? { color } : undefined }));
}
