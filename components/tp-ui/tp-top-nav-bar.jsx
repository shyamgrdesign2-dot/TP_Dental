"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Bell, Settings, ArrowLeft, Eye, FileText, LogIn, MoreVertical, ChevronDown, User, Building2, BookOpen, Save, LayoutTemplate, StickyNote, } from "lucide-react";
import { cn } from "@/lib/utils";
/* ── Divider matching Figma exactly ── */
function NavDivider() {
    return (_jsx("div", { className: "shrink-0 opacity-80", style: {
            width: "1.05px",
            height: 42,
            background: "linear-gradient(to bottom, rgba(208,213,221,0.2) 0%, #d0d5dd 50%, rgba(208,213,221,0.2) 100%)",
        } }));
}
/* ── Icon button (42px container) ── */
function ToolbarIconButton({ children, label, onClick, badge, className: extraClass, }) {
    return (_jsxs("button", { type: "button", onClick: onClick, className: cn("relative flex shrink-0 items-center justify-center bg-[#f1f1f5] rounded-[10.5px]", extraClass), style: { width: 42, height: 42, padding: "8.4px" }, "aria-label": label, children: [children, badge != null && badge > 0 && (_jsx("span", { className: "absolute flex items-center justify-center", style: {
                    width: 10.5,
                    height: 10.5,
                    top: -1.14,
                    right: -1.14,
                    borderRadius: "50%",
                    backgroundColor: "#E11D48",
                    border: "1.05px solid white",
                } }))] }));
}
export function TPTopNavBar({ variant = "default", leftContent, title, subtitle, actions = [], profile, patient, clinicName = "Rajeshwar eye clinic", onBack, showSearch = false, onSearchClick, onMenuClick, className, }) {
    // ── Clinical / RxPad variant ──
    if (variant === "clinical") {
        return (_jsxs("header", { className: cn("relative flex shrink-0 items-center bg-white", className), style: { height: 62 }, "data-name": "Rxpad_Header", children: [_jsxs("div", { className: "flex items-center gap-[16px] pr-[16px] py-[10px] size-full", children: [_jsxs("button", { type: "button", onClick: onBack, className: "relative flex shrink-0 items-center justify-center bg-white", style: {
                                width: 80,
                                height: 60,
                                padding: "20px 15px",
                                borderBottom: "0.5px solid #f1f1f5",
                            }, "aria-label": "Go back", children: [_jsx("div", { "aria-hidden": "true", className: "absolute border-[#f1f1f5] border-r-[0.5px] border-solid inset-[0_-0.25px_0_0] pointer-events-none" }), _jsx(ArrowLeft, { size: 24, color: "#454551" })] }), _jsx("div", { className: "flex flex-1 items-center min-h-px min-w-[280px]", children: _jsxs("div", { className: "flex items-center gap-[6px] shrink-0", children: [_jsx("div", { className: "relative flex shrink-0 items-center justify-center bg-[#f1f1f5] rounded-full", style: { width: 40, height: 40 }, children: _jsx(User, { size: 22, color: "#545460" }) }), _jsxs("div", { className: "flex flex-col items-start shrink-0", style: { width: 108 }, children: [_jsxs("div", { className: "flex items-center gap-[2px] w-full", children: [_jsx("p", { className: "shrink-0 text-[#454551]", style: {
                                                            fontFamily: "'Poppins', sans-serif",
                                                            fontWeight: 600,
                                                            fontSize: 14,
                                                            maxWidth: 150,
                                                            lineHeight: "normal",
                                                        }, children: patient?.name || "Patient Name" }), _jsx(ChevronDown, { size: 16, color: "#454551", className: "shrink-0" })] }), _jsxs("div", { className: "flex items-start w-full", style: {
                                                    fontFamily: "'Roboto', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: 12,
                                                    lineHeight: "18px",
                                                    letterSpacing: "0.1px",
                                                }, children: [_jsx("span", { className: "shrink-0 text-[#454551]", children: patient?.gender || "M" }), _jsx("span", { className: "shrink-0 text-[#e2e2ea] text-center w-[8px]", children: "|" }), _jsx("span", { className: "shrink-0 text-[#454551]", children: patient?.age ? `${patient.age}y` : "25y" })] })] })] }) }), _jsxs("div", { className: "flex items-center gap-[14px] shrink-0", children: [_jsx("div", { className: "shrink-0", style: { width: 42, height: 42 }, children: _jsx(BookOpen, { size: 25, color: "#8A4DBB", className: "opacity-80" }) }), _jsx(NavDivider, {}), _jsx(ToolbarIconButton, { label: "Template", children: _jsx(LayoutTemplate, { size: 20, color: "#454551" }) }), _jsx(ToolbarIconButton, { label: "Save", children: _jsx(Save, { size: 20, color: "#454551" }) }), _jsx(ToolbarIconButton, { label: "Customisation", children: _jsx(Settings, { size: 20, color: "#454551" }) }), _jsx(ToolbarIconButton, { label: "Custom Canvas", badge: 1, children: _jsx(StickyNote, { size: 20, color: "#454551" }) }), _jsx(NavDivider, {}), _jsxs("button", { type: "button", className: "flex shrink-0 items-center justify-center gap-[6.3px] bg-[#f1f1f5] rounded-[10.5px]", style: { height: 42, padding: "8px 16px" }, children: [_jsx(Eye, { size: 20, color: "#454551" }), _jsx("span", { className: "shrink-0 text-center text-[#454551]", style: {
                                                fontFamily: "'Inter', sans-serif",
                                                fontWeight: 600,
                                                fontSize: "14.7px",
                                                lineHeight: "normal",
                                            }, children: "Preview" })] }), _jsxs("button", { type: "button", className: "relative flex shrink-0 items-center justify-center gap-[6.3px] rounded-[10.5px]", style: {
                                        height: 42,
                                        padding: "8px 16px",
                                        border: "1.05px solid #4b4ad5",
                                        borderRadius: "11.025px",
                                    }, children: [_jsx(FileText, { size: 20, color: "#4B4AD5" }), _jsx("span", { className: "shrink-0 text-center text-[#4b4ad5]", style: {
                                                fontFamily: "'Inter', sans-serif",
                                                fontWeight: 600,
                                                fontSize: "14.7px",
                                                lineHeight: "normal",
                                            }, children: "Draft" })] }), _jsxs("button", { type: "button", className: "flex shrink-0 items-center justify-center gap-[6.3px] bg-[#4b4ad5] rounded-[10.5px]", style: { height: 42, padding: "8px 16px" }, children: [_jsx(LogIn, { size: 20, color: "white" }), _jsx("span", { className: "shrink-0 text-center text-white", style: {
                                                fontFamily: "'Inter', sans-serif",
                                                fontWeight: 600,
                                                fontSize: "14.7px",
                                                lineHeight: "normal",
                                            }, children: "End" })] }), _jsx("div", { className: "flex shrink-0 items-center justify-center", style: { width: 25.2, height: 25.2 }, children: _jsx(MoreVertical, { size: 20, color: "#454551" }) })] })] }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 pointer-events-none", style: { height: "0.5px", backgroundColor: "#f1f1f5" } })] }));
    }
    // ── Default / Home variant ──
    return (_jsxs("header", { className: cn("relative flex shrink-0 items-center bg-white", className), style: { height: 62 }, "data-name": "Home_Header", children: [_jsxs("div", { className: "flex items-center gap-[16px] px-[18px] py-[10px] size-full", children: [_jsx("div", { className: "flex flex-1 items-center min-h-px min-w-[280px]", children: leftContent ? (leftContent) : (_jsx("div", { className: "relative shrink-0", style: { width: 140, height: 40 }, children: _jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("span", { className: "text-[#454551]", style: {
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 700,
                                        fontSize: 18,
                                    }, children: title || "TatvaPractice" }) }) })) }), _jsxs("div", { className: "flex items-center gap-[14px] shrink-0", children: [_jsx("div", { className: "shrink-0 flex items-center justify-center", style: { width: 42, height: 42 }, children: _jsx(BookOpen, { size: 25, color: "#8A4DBB", className: "opacity-80" }) }), _jsx(NavDivider, {}), _jsx(ToolbarIconButton, { label: "Notifications", badge: 3, children: _jsx(Bell, { size: 20, color: "#454551" }) }), _jsxs("div", { className: "relative shrink-0 overflow-hidden rounded-[11px] bg-white", style: { width: 42, height: 42 }, children: [_jsx("div", { className: "absolute inset-0 opacity-20 bg-gradient-to-br from-purple-400 to-blue-500" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("svg", { width: "22", height: "24", viewBox: "0 0 22 24", fill: "none", children: [_jsx("path", { d: "M11 2L2 7v10l9 5 9-5V7l-9-5z", fill: "#4b4ad5", opacity: "0.8" }), _jsx("path", { d: "M11 12L2 7M11 12l9-5M11 12v10", stroke: "#4b4ad5", strokeWidth: "1.5" })] }) })] }), _jsx(NavDivider, {}), _jsxs("button", { type: "button", className: "flex shrink-0 items-center justify-center gap-[6.3px] bg-[#f1f1f5] rounded-[10.5px]", style: { height: 42, padding: "8px 16px" }, children: [_jsx(Building2, { size: 20, color: "#454551" }), _jsx("div", { className: "flex items-center", style: { width: 138.6 }, children: _jsx("span", { className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[#454551]", style: {
                                                fontFamily: "'Inter', sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14.7px",
                                                lineHeight: "normal",
                                            }, children: clinicName }) }), _jsx(ChevronDown, { size: 20, color: "#454551" })] }), profile && (_jsxs("div", { className: "relative shrink-0", style: { width: 42, height: 42 }, children: [_jsx("div", { className: "absolute inset-0 rounded-full", style: {
                                            background: "linear-gradient(180deg, #FFDE00 0%, #FD5900 100%)",
                                        } }), _jsx("div", { className: "absolute rounded-full overflow-hidden bg-white", style: {
                                            top: "7.89%",
                                            left: "7.89%",
                                            right: "7.89%",
                                            bottom: "7.89%",
                                            border: "0.93px solid white",
                                        }, children: profile.avatarUrl ? (_jsx("img", { src: profile.avatarUrl, alt: profile.name, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100", children: _jsx("span", { className: "text-[#454551]", style: { fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13 }, children: profile.initials || profile.name.split(" ").map(n => n[0]).join("").slice(0, 2) }) })) })] }))] })] }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 pointer-events-none", style: { height: "0.5px", backgroundColor: "#f1f1f5" } })] }));
}
/**
 * Default action configurations for common use cases.
 */
export function defaultNavActions() {
    return [
        {
            icon: _jsx(Bell, { size: 20, color: "#454551" }),
            label: "Notifications",
            badge: 3,
        },
        {
            icon: _jsx(Settings, { size: 20, color: "#454551" }),
            label: "Settings",
        },
    ];
}
