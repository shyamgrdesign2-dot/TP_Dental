"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
const sizeMap = {
    sm: 16,
    md: 22,
    lg: 28,
};
export function TPRating({ value, onChange, max = 5, size = "md", readOnly = false, className, }) {
    const [hover, setHover] = useState(0);
    const iconSize = sizeMap[size];
    return (_jsx("div", { className: cn("inline-flex items-center gap-0.5", className), role: "radiogroup", "aria-label": "Rating", children: Array.from({ length: max }, (_, i) => {
            const starValue = i + 1;
            const isFilled = starValue <= (hover || value);
            return (_jsx("button", { type: "button", disabled: readOnly, onClick: () => onChange?.(starValue), onMouseEnter: () => !readOnly && setHover(starValue), onMouseLeave: () => !readOnly && setHover(0), className: cn("transition-transform", !readOnly && "hover:scale-110 cursor-pointer", readOnly && "cursor-default"), role: "radio", "aria-checked": starValue === value, "aria-label": `${starValue} star${starValue > 1 ? "s" : ""}`, children: _jsx(Star, { size: iconSize, className: cn("transition-colors", isFilled ? "text-tp-amber-500" : "text-tp-slate-300") }) }, i));
        }) }));
}
