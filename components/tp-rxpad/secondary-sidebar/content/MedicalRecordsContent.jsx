import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Medical Records content panel — matches Figma DetailedSectionView (Medical Records).
 * Shows filter chips and stacked record cards with document thumbnails.
 */
import React, { useState } from "react";
import clsx from "clsx";
import { Eye, EyeSlash, Import, NoteText, Trash } from "iconsax-reactjs";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import mr from "./MedicalRecordsContent.module.scss";
const imgImage = "/assets/254812c5250025b09cfb4d7901db6be9343f3ff7.png";
const imgEka111 = "/assets/afc7c9e55f8624dd8cba9c2017f7a975fba9d2d2.png";
// ─── Add New Records button ───────────────────────────────────────────────────
function AddRecordsButton() {
    return (_jsxs("div", { className: mr.addBar, children: [_jsx("div", { "aria-hidden": "true", className: mr.addBarTopRule }), _jsxs("div", { className: mr.addHit, children: [_jsx("div", { "aria-hidden": "true", className: mr.addOutline }), _jsx("div", { className: mr.addCenter, children: _jsxs("div", { className: mr.addInner, children: [_jsx("div", { className: mr.plusBox, children: _jsxs("svg", { className: mr.plusSvg, fill: "none", viewBox: "0 0 24 24", children: [_jsx("path", { d: "M6 12H18", stroke: "var(--tp-blue-500)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" }), _jsx("path", { d: "M12 18V6", stroke: "var(--tp-blue-500)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" })] }) }), _jsx("p", { className: mr.addLabel, children: "Add New Records" })] }) })] })] }));
}
// ─── Filter chip ──────────────────────────────────────────────────────────────
const FILTERS = ["All", "Pathology", "Radiology", "Prescription", "Other"];
function FilterChip({ label, active, onClick }) {
    return (_jsxs("div", { className: clsx(mr.filterChip, active ? mr.filterChipActive : mr.filterChipInactive), onClick: onClick, children: [_jsx("div", { "aria-hidden": "true", className: clsx(mr.filterChipBorder, active && mr.filterChipBorderActive) }), _jsx("p", { className: mr.filterChipLabel, children: label })] }));
}
// ─── Three-dots icon ─────────────────────────────────────────────────────────
function DotsIcon() {
    return (_jsx("div", { className: mr.dotsWrap, children: _jsx(MoreVertical, { color: "var(--tp-slate-500)", size: 16, strokeWidth: 1.5 }) }));
}
// ─── Report icon ──────────────────────────────────────────────────────────────
function ReportIcon() {
    return (_jsx("div", { className: mr.reportIconWrap, children: _jsx(NoteText, { color: "var(--tp-slate-500)", size: 14, strokeWidth: 1.5, variant: "Linear" }) }));
}
const RECORD_ACTIONS = [
    { id: "view", label: "View", icon: Eye },
    { id: "download", label: "Download", icon: Import },
    { id: "hide", label: "Hide", icon: EyeSlash },
    { id: "delete", label: "Delete", icon: Trash },
];
function RecordActionMenu() {
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx("button", { type: "button", className: mr.menuTrigger, children: _jsx(DotsIcon, {}) }) }), _jsx(DropdownMenuContent, { align: "end", className: mr.dropdownPanel, children: RECORD_ACTIONS.map((action) => {
                    const Icon = action.icon;
                    return (_jsxs(DropdownMenuItem, { className: mr.dropdownItem, children: [_jsx(Icon, { color: "var(--tp-violet-500)", size: 16, variant: "Bulk" }), action.label] }, action.id));
                }) })] }));
}
function RecordCard({ type, label, date, note, }) {
    return (_jsxs("div", { className: mr.recordCard, children: [_jsxs("div", { className: mr.thumbShell, children: [_jsx("div", { "aria-hidden": "true", className: mr.thumbBorder }), type === "pathology-img" && (_jsx("div", { className: mr.thumbFill, children: _jsx("img", { alt: "pathology report", className: clsx(mr.thumbImg, mr.thumbImgBlur), src: imgImage }) })), type === "prescription-img" && (_jsx("div", { className: mr.thumbFill, children: _jsx("img", { alt: "prescription", className: mr.thumbImg, src: imgEka111 }) })), type === "pdf" && (_jsx("div", { className: mr.thumbPdfBg, children: _jsxs("div", { className: mr.pdfPlaceholderCol, children: [_jsxs("svg", { width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", children: [_jsx("rect", { x: "6", y: "4", width: "20", height: "24", rx: "2", fill: "var(--tp-slate-300)" }), _jsx("rect", { x: "9", y: "9", width: "14", height: "2", rx: "1", fill: "white" }), _jsx("rect", { x: "9", y: "13", width: "14", height: "2", rx: "1", fill: "white" }), _jsx("rect", { x: "9", y: "17", width: "8", height: "2", rx: "1", fill: "white" })] }), _jsx("p", { className: mr.pdfName, children: "20240121_190912.pdf" })] }) })), type === "pathology-blank" && (_jsx("div", { className: mr.thumbFill, children: _jsx("img", { alt: "pathology report", className: clsx(mr.thumbImg, mr.thumbImgBlur), src: imgImage }) })), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("button", { type: "button", className: mr.noteBtn, "aria-label": "View upload note", children: _jsx(ReportIcon, {}) }) }), _jsx(TooltipContent, { side: "top", sideOffset: 4, className: mr.tooltipPanel, children: note })] })] }), _jsxs("div", { className: mr.footerBar, children: [_jsx("div", { "aria-hidden": "true", className: mr.footerBorder }), _jsx("div", { className: mr.footerRow, children: _jsxs("div", { className: mr.footerInner, children: [_jsxs("div", { className: mr.footerTextCol, children: [_jsx("p", { className: mr.footerTitle, children: label }), _jsx("p", { className: mr.footerDate, children: date })] }), _jsx("div", { className: mr.menuCell, children: _jsx(RecordActionMenu, {}) })] }) })] })] }));
}
// ─── Public export ────────────────────────────────────────────────────────────
export function MedicalRecordsContent() {
    const [activeFilter, setActiveFilter] = useState("All");
    return (_jsxs("div", { className: mr.pageRoot, children: [_jsx(AddRecordsButton, {}), _jsx("div", { className: mr.filterRow, children: FILTERS.map((f) => (_jsx(FilterChip, { label: f, active: activeFilter === f, onClick: () => setActiveFilter(f) }, f))) }), _jsx("div", { className: mr.scrollFlex, children: _jsx("div", { className: mr.scrollInner, children: _jsxs("div", { className: mr.cardsStack, children: [_jsx(RecordCard, { type: "pathology-img", label: "Pathology", date: "10 Aug'26", note: "Uploaded by Dr. Shyam: pathology panel from last follow-up." }), _jsx(RecordCard, { type: "prescription-img", label: "Prescription", date: "10 Aug'26", note: "Scanned written prescription shared by patient at intake." }), _jsx(RecordCard, { type: "pdf", label: "Prescription", date: "10 Aug'26", note: "Digitized PDF export generated from hospital EMR." }), _jsx(RecordCard, { type: "pathology-blank", label: "Pathology", date: "10 Aug'26", note: "Follow-up pathology receipt uploaded by front desk." }), _jsx(RecordCard, { type: "pathology-img", label: "Pathology", date: "10 Aug'26", note: "Previous lab copy attached for trend comparison." })] }) }) })] }));
}
