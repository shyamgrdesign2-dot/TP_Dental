"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
export function TPClinicalTabs({ tabs, activeTab, onTabChange, variant = "underline", size = "md", className, }) {
    const containerRef = useRef(null);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const updateIndicator = useCallback(() => {
        if (variant !== "underline" || !containerRef.current)
            return;
        const activeEl = containerRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
        if (activeEl) {
            setIndicatorStyle({
                left: activeEl.offsetLeft,
                width: activeEl.offsetWidth,
            });
        }
    }, [activeTab, variant]);
    useEffect(() => {
        updateIndicator();
        window.addEventListener("resize", updateIndicator);
        return () => window.removeEventListener("resize", updateIndicator);
    }, [updateIndicator]);
    if (variant === "pill") {
        return (_jsx("div", { className: cn("flex items-center gap-1", className), children: tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (_jsxs("button", { type: "button", onClick: () => onTabChange(tab.id), className: cn("inline-flex items-center gap-[6px] rounded-[10px] px-3 font-semibold transition-all duration-150", size === "sm" ? "h-9 text-xs" : "h-[42px] text-[12px]", isActive
                        ? "bg-[#eef] text-[#4b4ad5]"
                        : "text-[#454551]/60 hover:bg-[#f1f1f5] hover:text-[#454551]"), style: {
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        letterSpacing: "0.1px",
                    }, children: [_jsx("span", { className: cn("shrink-0 flex items-center justify-center rounded-[8px]", isActive ? "bg-[#eef]" : ""), style: { width: 20, height: 20 }, children: isActive ? tab.iconActive : tab.iconInactive }), _jsx("span", { children: tab.label }), tab.count != null && (_jsx("span", { className: cn("ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold", isActive
                                ? "bg-[#4b4ad5]/10 text-[#4b4ad5]"
                                : "bg-[#e2e2ea] text-[#454551]/60"), children: tab.count }))] }, tab.id));
            }) }));
    }
    // Underline variant — matching Figma reference
    return (_jsxs("div", { className: cn("relative", className), children: [_jsx("div", { ref: containerRef, className: "flex items-center gap-0 overflow-x-auto scrollbar-none", role: "tablist", children: tabs.map((tab) => {
                    const isActive = tab.id === activeTab;
                    return (_jsxs("button", { "data-tab-id": tab.id, type: "button", role: "tab", "aria-selected": isActive, onClick: () => onTabChange(tab.id), className: cn("relative inline-flex items-center gap-[6px] whitespace-nowrap px-4 transition-colors duration-150", size === "sm" ? "h-9" : "h-[42px]", isActive
                            ? "text-[#4b4ad5]"
                            : "text-[#454551]/60 hover:text-[#454551]/90 hover:bg-tp-slate-100/70"), style: {
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: 12,
                            letterSpacing: "0.1px",
                        }, children: [_jsx("span", { className: cn("shrink-0 flex items-center justify-center rounded-[8px]", isActive ? "bg-[#eef]" : ""), style: { width: 24, height: 24, padding: 2 }, children: isActive ? tab.iconActive : tab.iconInactive }), _jsx("span", { children: tab.label }), tab.count != null && (_jsx("span", { className: cn("ml-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold", isActive
                                    ? "bg-[#4b4ad5]/10 text-[#4b4ad5]"
                                    : "bg-[#e2e2ea] text-[#454551]/60"), children: tab.count }))] }, tab.id));
                }) }), _jsx("div", { className: "w-full", style: {
                    height: 1,
                    boxShadow: "inset 0px -1px 0px 0px rgba(68,68,79,0.1)",
                } }), _jsx("div", { className: "absolute bottom-0 bg-[#4b4ad5] transition-all duration-200 ease-out", style: {
                    ...indicatorStyle,
                    height: 3,
                    borderRadius: 10,
                } })] }));
}
