"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getButtonTokens, BUTTON_SIZE_TOKENS, } from "@/lib/button-system/tokens";
import { TPButtonIcon } from "./TPButtonIcon";
/**
 * Split CTA — Material UI-style divider between primary action and dropdown.
 * Menu is rendered in a portal so it is never clipped by table/scroll containers.
 */
export const TPSplitButton = forwardRef(function TPSplitButton({ primaryAction, secondaryActions, variant = "solid", theme = "primary", size = "md", disabled = false, loading = false, surface = "light", open: controlledOpen, onOpenChange, className = "", trackClassName = "", }, ref) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, minWidth: 0 });
    const containerRef = useRef(null);
    const menuRef = useRef(null);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const setOpen = (value) => {
        if (!isControlled)
            setInternalOpen(value);
        onOpenChange?.(value);
    };
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        function handleClickOutside(event) {
            const target = event.target;
            if (containerRef.current?.contains(target))
                return;
            if (menuRef.current?.contains(target))
                return;
            setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        if (!open)
            return;
        const updateMenuPosition = () => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect)
                return;
            setMenuPosition({
                top: rect.bottom + 6,
                left: rect.left,
                minWidth: rect.width,
            });
        };
        updateMenuPosition();
        window.addEventListener("resize", updateMenuPosition);
        window.addEventListener("scroll", updateMenuPosition, true);
        return () => {
            window.removeEventListener("resize", updateMenuPosition);
            window.removeEventListener("scroll", updateMenuPosition, true);
        };
    }, [open]);
    const tokens = getButtonTokens(theme, surface);
    const dims = BUTTON_SIZE_TOKENS[size];
    const isDisabled = disabled || loading;
    const bg = isDisabled ? tokens.disabledBg : tokens.bg;
    const textColor = isDisabled ? tokens.disabledText : tokens.text;
    const borderColor = isDisabled ? tokens.disabledBorder : tokens.border;
    const separatorColor = variant === "solid" && surface === "light"
        ? "rgba(255,255,255,0.35)"
        : variant === "solid" && surface === "dark"
            ? "rgba(0,0,0,0.15)"
            : variant === "tonal" && surface === "light"
                ? borderColor
                : variant === "outline" || variant === "ghost"
                    ? theme === "neutral"
                        ? "#A2A2A8"
                        : borderColor
                    : "currentColor";
    const separatorOpacity = variant === "solid" ? 0.5 : theme === "neutral" && variant === "outline" ? 0.65 : 0.5;
    const buttonBg = variant === "solid"
        ? bg
        : variant === "tonal"
            ? theme === "primary"
                ? "#EEEEFF"
                : theme === "error"
                    ? "#FFF1F2"
                    : "#F1F1F5"
            : "transparent";
    const buttonText = variant === "ghost" && theme === "neutral"
        ? "#454551"
        : variant === "ghost"
            ? tokens.border
            : variant === "tonal" && theme === "neutral"
                ? "#454551"
                : variant === "tonal"
                    ? tokens.border
                    : variant === "outline" && theme === "neutral"
                        ? "#454551"
                        : variant === "outline"
                            ? tokens.border
                            : textColor;
    const baseButtonStyle = {
        height: dims.height,
        fontSize: dims.fontSize,
        fontWeight: 600,
        fontFamily: "Inter, sans-serif",
        cursor: isDisabled ? "not-allowed" : "pointer",
        transition: "all 150ms ease",
        opacity: isDisabled ? 0.7 : 1,
        color: buttonText,
        backgroundColor: buttonBg,
        border: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: dims.iconTextGap,
    };
    const dropdownTriggerColor = loading && variant === "solid"
        ? "#FFFFFF"
        : loading && variant === "outline"
            ? "#454551"
            : buttonText;
    return (_jsxs("div", { ref: (node) => {
            ;
            containerRef.current = node;
            if (typeof ref === "function")
                ref(node);
            else if (ref)
                ref.current = node;
        }, className: `relative inline-flex ${className}`, children: [_jsxs("div", { className: `inline-flex overflow-hidden rounded-[10px] transition-shadow hover:shadow-md ${trackClassName}`.trim(), style: {
                    border: variant === "outline"
                        ? `1.5px solid ${borderColor}`
                        : variant === "ghost" || variant === "tonal"
                            ? "none"
                            : "none",
                    backgroundColor: variant === "solid" || variant === "tonal" ? buttonBg : "transparent",
                    boxShadow: variant === "solid"
                        ? "0 1px 3px rgba(23,23,37,0.08)"
                        : variant === "tonal"
                            ? "0 1px 2px rgba(23,23,37,0.06)"
                            : "none",
                }, children: [_jsx("button", { type: "button", disabled: isDisabled, onClick: primaryAction.onClick, className: "inline-flex flex-1 items-center justify-center border-0 pl-4 pr-2 transition-all hover:brightness-[1.12] hover:saturate-[1.1] active:scale-[0.97] disabled:cursor-not-allowed", style: {
                            ...baseButtonStyle,
                            borderRadius: 0,
                            borderRight: "none",
                            minWidth: 0,
                        }, children: loading ? (_jsx(TPButtonIcon, { size: dims.iconSize, children: _jsx("span", { className: "animate-spin rounded-full", style: {
                                    width: dims.iconSize,
                                    height: dims.iconSize,
                                    border: `2px solid ${variant === "solid" ? "#FFFFFF" : "#454551"}`,
                                    borderTopColor: "transparent",
                                }, "aria-hidden": true }) })) : (_jsxs(_Fragment, { children: [primaryAction.icon && (_jsx(TPButtonIcon, { size: dims.iconSize, children: primaryAction.icon })), _jsx("span", { className: "truncate", children: primaryAction.label })] })) }), _jsx("div", { className: "flex-shrink-0", style: {
                            width: 1,
                            minWidth: 1,
                            margin: `${Math.round(dims.height * 0.2)}px 1px`,
                            height: Math.round(dims.height * 0.6),
                            alignSelf: "center",
                            backgroundColor: separatorColor,
                            opacity: separatorOpacity,
                        }, "aria-hidden": true }), _jsx("button", { type: "button", disabled: isDisabled, onClick: () => setOpen(!open), "aria-haspopup": "menu", "aria-expanded": open, "aria-label": "More actions", className: "inline-flex flex-shrink-0 items-center justify-center px-2 transition-all hover:brightness-[1.12] hover:saturate-[1.1] active:scale-[0.97] disabled:cursor-not-allowed", style: {
                            ...baseButtonStyle,
                            color: dropdownTriggerColor,
                            borderRadius: 0,
                            width: dims.height,
                            minWidth: dims.height,
                            borderLeft: "none",
                        }, children: _jsx(TPButtonIcon, { size: dims.iconSize, children: _jsx(ChevronDown, { size: dims.iconSize, strokeWidth: 1.5, className: "transition-transform duration-200 ease-out", style: { transform: open ? "rotate(180deg)" : "rotate(0deg)" } }) }) })] }), open &&
                mounted &&
                createPortal(_jsx("div", { ref: menuRef, className: "overflow-hidden", style: {
                        position: "fixed",
                        top: menuPosition.top,
                        left: menuPosition.left,
                        minWidth: menuPosition.minWidth,
                        borderRadius: 10,
                        zIndex: 2100,
                        boxShadow: "0 12px 24px -4px rgba(23,23,37,0.08), 0 4px 8px -4px rgba(23,23,37,0.04)",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E2E2EA",
                    }, children: secondaryActions.map((action) => {
                        if (action.separator) {
                            return _jsx("div", { className: "h-px bg-tp-slate-200/90 mx-2 my-1.5" }, action.id);
                        }
                        return (_jsxs("button", { type: "button", disabled: action.disabled, onClick: () => {
                                action.onClick?.();
                                setOpen(false);
                            }, className: "flex w-full items-center gap-2 px-4 py-2.5 text-left font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-700 transition-colors hover:bg-tp-slate-50 disabled:cursor-not-allowed disabled:opacity-50", children: [action.icon && _jsx(TPButtonIcon, { size: 16, children: action.icon }), _jsx("span", { className: "flex-1", children: action.label }), action.shortcut ? (_jsx("span", { className: "font-mono text-[11px] text-tp-slate-400", children: action.shortcut })) : (_jsx(ChevronRight, { size: 14, strokeWidth: 1.5, className: "text-tp-slate-400" }))] }, action.id));
                    }) }), document.body)] }));
});
