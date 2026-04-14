"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FolderOpen, FileText, Image, File } from "lucide-react";
import { CopyButton } from "../CopyButton";
import { PanelEmptyState } from "../ExpandedPanel";
/**
 * Medical Records Panel
 * ─────────────────────
 * Displays uploaded medical documents organized by type and date.
 *
 * Display rules:
 *   - Grouped by document type
 *   - Most recent documents first within each group
 *   - File type icons: PDF (red), Image (blue), Doc (violet)
 *   - Each document shows: title, date, uploader, file size
 *   - Tags displayed as small chips below the title
 *   - Click opens document preview (placeholder behavior)
 */
function formatDate(d) {
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
const fileTypeIcons = {
    pdf: { icon: FileText, color: "text-tp-error-500", bg: "bg-tp-error-50" },
    image: { icon: Image, color: "text-tp-blue-500", bg: "bg-tp-blue-50" },
    doc: { icon: File, color: "text-tp-violet-500", bg: "bg-tp-violet-50" },
};
const docTypeBg = {
    "Prescription": "bg-tp-blue-50 text-tp-blue-600",
    "Lab Report": "bg-tp-success-50 text-tp-success-600",
    "Radiology": "bg-tp-violet-50 text-tp-violet-600",
    "Discharge Summary": "bg-tp-warning-50 text-tp-warning-600",
    "Referral Letter": "bg-tp-slate-100 text-tp-slate-600",
    "Insurance": "bg-tp-amber-50 text-tp-slate-600",
    "Consent Form": "bg-tp-slate-100 text-tp-slate-600",
    "Other": "bg-tp-slate-100 text-tp-slate-500",
};
function DocumentCard({ doc, onCopy }) {
    const ft = fileTypeIcons[doc.fileType];
    const Icon = ft.icon;
    return (_jsxs("div", { className: "group/item flex items-start gap-3 rounded-lg border border-tp-slate-200 bg-white px-3 py-2.5 mb-2 last:mb-0 hover:border-tp-blue-200 hover:shadow-sm transition-all cursor-pointer", children: [_jsx("div", { className: `flex items-center justify-center rounded-lg w-9 h-9 shrink-0 ${ft.bg}`, children: _jsx(Icon, { size: 18, className: ft.color }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-xs font-medium text-tp-slate-800 truncate", children: doc.title }), _jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [_jsx("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-medium ${docTypeBg[doc.type] || docTypeBg["Other"]}`, children: doc.type }), _jsx("span", { className: "text-[10px] text-tp-slate-400", children: formatDate(doc.date) }), doc.fileSize && (_jsx("span", { className: "text-[10px] text-tp-slate-400", children: doc.fileSize }))] }), doc.tags && doc.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: doc.tags.map((tag, i) => (_jsx("span", { className: "rounded bg-tp-slate-100 px-1.5 py-0.5 text-[10px] text-tp-slate-500", children: tag }, i))) })), doc.notes && (_jsx("p", { className: "text-[10px] italic text-tp-slate-400 mt-1", children: doc.notes }))] }), _jsx(CopyButton, { onCopy: onCopy, size: 12 })] }));
}
export function MedicalRecordsPanel({ documents, onCopyToRxPad, }) {
    if (!documents.length) {
        return (_jsx(PanelEmptyState, { icon: _jsx(FolderOpen, { size: 32 }), message: "No medical records", description: "Uploaded documents will appear here" }));
    }
    const source = "Medical Records";
    return (_jsx("div", { children: documents.map((doc) => (_jsx(DocumentCard, { doc: doc, onCopy: () => onCopyToRxPad?.({
                target: "notes",
                items: [`[${doc.type}] ${doc.title} (${formatDate(doc.date)})`],
                source,
            }) }, doc.id))) }));
}
