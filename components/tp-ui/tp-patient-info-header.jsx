"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ChevronLeft, Eye, FileText, LogIn, MoreVertical, ChevronDown, User, Settings, Save, LayoutTemplate, StickyNote, BookOpen, } from "lucide-react";
import { cn } from "@/lib/utils";
/* ── Divider ── */
function HeaderDivider() {
    return (_jsx("div", { className: "shrink-0 opacity-80", style: {
            width: "1.05px",
            height: 42,
            background: "linear-gradient(to bottom, rgba(208,213,221,0.2) 0%, #d0d5dd 50%, rgba(208,213,221,0.2) 100%)",
        } }));
}
/* ── Toolbar icon button ── */
function HeaderIconButton({ children, label, onClick, badge, }) {
    return (_jsxs("button", { type: "button", onClick: onClick, className: "relative flex shrink-0 items-center justify-center bg-[#f1f1f5] rounded-[10.5px]", style: { width: 42, height: 42, padding: "8.4px" }, "aria-label": label, children: [children, badge != null && badge > 0 && (_jsx("span", { className: "absolute flex items-center justify-center", style: {
                    width: 10.5,
                    height: 10.5,
                    top: -1.4,
                    right: -1.4,
                    borderRadius: "50%",
                    backgroundColor: "#E11D48",
                    border: "1.05px solid white",
                } }))] }));
}
export function TPPatientInfoHeader({ patient, visitInfo, onBack, onPreview, onDraft, onEnd, actions, className, }) {
    const genderShort = patient.gender === "Male" ? "M" : patient.gender === "Female" ? "F" : patient.gender.charAt(0);
    return (_jsxs("header", { className: cn("relative flex shrink-0 items-center bg-white", className), style: { height: 62 }, "data-name": "Rxpad_Header", children: [_jsxs("div", { className: "flex items-center gap-[16px] pr-[16px] py-[10px] size-full", children: [_jsxs("button", { type: "button", onClick: onBack, className: "relative flex shrink-0 items-center justify-center bg-white", style: {
                            width: 80,
                            height: 60,
                            padding: "20px 15px",
                            borderBottom: "0.5px solid #f1f1f5",
                        }, "aria-label": "Go back", children: [_jsx("div", { "aria-hidden": "true", className: "absolute border-[#f1f1f5] border-r-[0.5px] border-solid inset-[0_-0.25px_0_0] pointer-events-none" }), _jsx(ChevronLeft, { size: 24, color: "#454551", strokeWidth: 2, style: { opacity: 0.7 } })] }), _jsx("div", { className: "flex flex-1 items-center min-h-px min-w-[280px]", children: _jsxs("div", { className: "flex items-center gap-[6px] shrink-0", children: [_jsx("div", { className: "relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-tp-slate-200", children: patient.avatarUrl ? (_jsx("img", { src: patient.avatarUrl, alt: patient.name, className: "h-full w-full object-cover" })) : (_jsx(User, { size: 22, className: "text-tp-slate-500" })) }), _jsxs("div", { className: "flex shrink-0 flex-col items-start", style: { width: 108 }, children: [_jsxs("div", { className: "flex w-full items-center gap-[2px]", children: [_jsx("p", { className: "shrink-0 truncate font-sans text-[14px] font-semibold leading-normal text-tp-slate-900", style: {
                                                        maxWidth: 150,
                                                    }, children: patient.name }), _jsx(ChevronDown, { size: 16, className: "shrink-0 text-tp-slate-700" })] }), _jsxs("div", { className: "flex w-full items-center font-sans text-[12px] font-medium leading-[18px] tracking-[0.1px]", children: [_jsx("span", { className: "shrink-0 text-tp-slate-500", children: genderShort }), _jsx("span", { className: "w-[14px] shrink-0 text-center text-tp-slate-300", "aria-hidden": "true", children: "\u00b7" }), _jsx("span", { className: "shrink-0 text-tp-slate-500", children: `${patient.age}Y` })] })] })] }) }), _jsxs("div", { className: "flex items-center gap-[14px] shrink-0", children: [_jsx("div", { className: "shrink-0 flex items-center justify-center", style: { width: 42, height: 42 }, children: _jsx(BookOpen, { size: 25, color: "#8A4DBB", className: "opacity-80" }) }), _jsx(HeaderDivider, {}), _jsx(HeaderIconButton, { label: "Template", children: _jsx(LayoutTemplate, { size: 20, color: "#454551" }) }), _jsx(HeaderIconButton, { label: "Save", children: _jsx(Save, { size: 20, color: "#454551" }) }), _jsx(HeaderIconButton, { label: "Customisation", children: _jsx(Settings, { size: 20, color: "#454551" }) }), _jsx(HeaderIconButton, { label: "Custom Canvas", badge: 1, children: _jsx(StickyNote, { size: 20, color: "#454551" }) }), _jsx(HeaderDivider, {}), _jsxs("button", { type: "button", onClick: onPreview, className: "flex shrink-0 items-center justify-center gap-[6.3px] bg-[#f1f1f5] rounded-[10.5px]", style: { height: 42, padding: "8px 16px" }, children: [_jsx(Eye, { size: 20, color: "#454551" }), _jsx("span", { className: "shrink-0 text-center text-[#454551]", style: {
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14.7px",
                                            lineHeight: "normal",
                                        }, children: "Preview" })] }), _jsxs("button", { type: "button", onClick: onDraft, className: "relative flex shrink-0 items-center justify-center gap-[6.3px] rounded-[10.5px]", style: {
                                    height: 42,
                                    padding: "8px 16px",
                                    border: "1.05px solid #4b4ad5",
                                    borderRadius: "11.025px",
                                }, children: [_jsx(FileText, { size: 20, color: "#4B4AD5" }), _jsx("span", { className: "shrink-0 text-center text-[#4b4ad5]", style: {
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14.7px",
                                            lineHeight: "normal",
                                        }, children: "Draft" })] }), _jsxs("button", { type: "button", onClick: onEnd, className: "flex shrink-0 items-center justify-center gap-[6.3px] bg-[#4b4ad5] rounded-[10.5px]", style: { height: 42, padding: "8px 16px" }, children: [_jsx(LogIn, { size: 20, color: "white" }), _jsx("span", { className: "shrink-0 text-center text-white", style: {
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14.7px",
                                            lineHeight: "normal",
                                        }, children: "End" })] }), _jsx("div", { className: "flex shrink-0 items-center justify-center", style: { width: 25.2, height: 25.2 }, children: _jsx(MoreVertical, { size: 20, color: "#454551" }) }), actions] })] }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 pointer-events-none", style: { height: "0.5px", backgroundColor: "#f1f1f5" } })] }));
}
