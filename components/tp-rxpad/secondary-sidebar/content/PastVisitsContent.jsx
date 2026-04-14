import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Past Visits content panel
 * - Supports per-date digital/written modes.
 * - Written Rx opens in a right sidebar PDF viewer.
 * - Copy affordances on date / section / item provide UX-level copy feedback.
 */
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { ArrowSquareDown, ArrowSquareUp, Calendar2, Copy as CopyIcon, Eye, Import, Printer, } from "iconsax-reactjs";
import { MoreVertical } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { TPDrawer, TPDrawerContent, TPDrawerDescription, TPDrawerHeader, TPDrawerTitle, } from "@/components/tp-ui/tp-drawer";
import { TPMedicalIcon, TPSnackbar } from "@/components/tp-ui";
import { ToothIcon } from "@/components/dental/ToothIcon";
import { tpSectionCardStyle } from "../tokens";
import { useStickyHeaderState } from "../detail-shared";
import pv from "./PastVisitsContent.module.scss";
function normalizePointerText(value) {
    return value
        .replace(/\s*[•·]\s*/g, " • ")
        .replace(/\s*\|\s*/g, " | ")
        .replace(/\s+/g, " ")
        .replace(/\(\s+/g, "(")
        .replace(/\s+\)/g, ")")
        .trim();
}
function formatMedicationDetail(item) {
    const row = item.row;
    const details = [
        row.unitPerDose,
        row.frequency,
        row.when,
        row.duration,
        row.note,
    ].map((value) => normalizePointerText(value)).filter(Boolean);
    return details.join(" | ");
}
function formatBracketParts(parts) {
    const clean = parts.map((part) => normalizePointerText(part ?? "")).filter(Boolean);
    return clean.length > 0 ? clean.join(" | ") : "";
}
function splitMetaParts(value) {
    return normalizePointerText(value)
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean);
}
function renderMetaInBrackets(parts) {
    if (parts.length === 0)
        return null;
    return (_jsxs("span", { className: pv.metaMuted, children: [" (", parts.map((part, index) => (_jsxs(React.Fragment, { children: [index > 0 ? _jsx("span", { className: pv.metaSep, children: " | " }) : null, part] }, `${part}-${index}`))), ")"] }));
}
const WRITTEN_RX_PDF_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
const WRITTEN_RX_PREVIEW = "/assets/afc7c9e55f8624dd8cba9c2017f7a975fba9d2d2.png";
const PAST_VISITS = [
    {
        id: "visit-27-jan",
        dateLabel: "27 Jan'26",
        digitalRx: {
            symptoms: [
                { label: "Tooth pain", detail: "Since: 5 days | Status: Active | Trigger: Night-time throbbing" },
                { label: "Cold sensitivity", detail: "Since: 2 weeks | Status: Active | Trigger: Sweet and cold drinks" },
            ],
            examinations: [
                { label: "General oral exam", detail: "Deep cavity in 36, tenderness on percussion, oral hygiene fair" },
            ],
            diagnoses: [
                { label: "Irreversible pulpitis", detail: "Since: 5 days | Status: Confirmed | Related to tooth 36" },
                { label: "Dental caries", detail: "Since: 2 weeks | Status: Confirmed | Affected teeth: 16, 36" },
            ],
            dentalExamination: [
                {
                    toothLabel: "Lower Left First Molar (T36)",
                    treatmentHistory: [
                        {
                            name: "Root Canal Treatment",
                            surface: "Occlusal, Root",
                            since: "12 Feb'25",
                            notes: "Access opening completed",
                        },
                        {
                            name: "Composite Restoration",
                            surface: "Mesio-occlusal",
                            since: "20 Nov'24",
                            notes: "Secondary caries suspected near margin",
                        },
                    ],
                    findings: [
                        {
                            name: "Deep caries with percussion tenderness",
                            surface: "Occlusal",
                            since: "27 Jan'26",
                            notes: "Night pain present",
                        },
                        {
                            name: "Localized gingival inflammation",
                            surface: "Lingual",
                            since: "27 Jan'26",
                            notes: "Mild bleeding on probing",
                        },
                    ],
                    procedures: [
                        {
                            name: "RCT Sitting 1",
                            surface: "Mesial and distal canals",
                            date: "28 Jan'26",
                            status: "Planned",
                            notes: "Working length confirmation pending",
                        },
                        {
                            name: "Pain management protocol",
                            date: "27 Jan'26",
                            status: "Completed",
                            notes: "Ibuprofen SOS prescribed",
                        },
                    ],
                    overallToothNote: "Severe throbbing pain for 5 days; crown planned post-obturation.",
                },
                {
                    toothLabel: "Upper Right First Molar (T16)",
                    treatmentHistory: [],
                    findings: [
                        {
                            name: "Early caries with staining",
                            surface: "Buccal, Occlusal",
                            since: "27 Jan'26",
                            notes: "Cold and sweet sensitivity",
                        },
                        {
                            name: "Food impaction tendency",
                            surface: "Distal marginal ridge",
                            since: "27 Jan'26",
                        },
                    ],
                    procedures: [
                        {
                            name: "Composite Restoration",
                            surface: "Buccal, Occlusal",
                            date: "30 Jan'26",
                            status: "Planned",
                        },
                        {
                            name: "Topical fluoride application",
                            date: "27 Jan'26",
                            status: "Completed",
                            notes: "Post-sensitivity management",
                        },
                    ],
                    overallToothNote: "No previous restorative work for this tooth.",
                },
                {
                    toothLabel: "Lower Right Central Incisor (T41)",
                    treatmentHistory: [],
                    findings: [
                        {
                            name: "Supragingival calculus",
                            surface: "Lingual",
                            since: "27 Jan'26",
                        },
                    ],
                    procedures: [
                        {
                            name: "Scaling and Polishing",
                            surface: "Lingual",
                            date: "31 Jan'26",
                            status: "Planned",
                        },
                    ],
                    overallToothNote: "Include with full-mouth periodontal therapy.",
                },
            ],
            medications: [
                {
                    label: "Amoxicillin 500mg",
                    detail: "1 capsule | 1-0-1 | After Food | 5 days",
                    row: {
                        medicine: "Amoxicillin 500mg",
                        unitPerDose: "1 Capsule",
                        frequency: "1 - 0 - 1",
                        when: "After Food",
                        duration: "5 Days",
                        note: "Pre-RCT antibiotic cover",
                    },
                },
                {
                    label: "Ibuprofen 400mg",
                    detail: "1 tablet | SOS | After Food | 3 days",
                    row: {
                        medicine: "Ibuprofen 400mg",
                        unitPerDose: "1 Tablet",
                        frequency: "SOS",
                        when: "After Food",
                        duration: "3 Days",
                        note: "For pain management",
                    },
                },
            ],
            advice: "Avoid chewing on left side. Warm salt water rinse 3×/day. Soft diet recommended. RCT sitting 1 scheduled for 28 Jan.",
            followUp: "After 3 days (RCT sitting 1)",
            labInvestigations: ["IOPA X-ray — 36", "OPG (Full mouth)"],
            vitals: {
                bpSystolic: "122",
                bpDiastolic: "78",
                temperature: "98.6",
                heartRate: "76",
                respiratoryRate: "16",
                weight: "68",
            },
            additionalNotes: "Treatment plan: RCT on 36, composite restoration on 16, full-mouth scaling. Crown (PFM) on 26 post-RCT.",
        },
        writtenRx: [
            {
                id: "wrx-27-a",
                title: "Written Rx",
                description: "Scanned OPD sheet (27 Jan'26)",
                pdfUrl: WRITTEN_RX_PDF_URL,
                previewImage: WRITTEN_RX_PREVIEW,
            },
        ],
    },
    {
        id: "visit-26-jan",
        dateLabel: "26 Jan'26",
        digitalRx: {
            symptoms: [
                { label: "Facial swelling", detail: "Since: 3 days | Status: Active | Site: Left buccal vestibule" },
            ],
            examinations: [
                { label: "Oral exam", detail: "Mild facial swelling, large carious lesion on 26, tenderness positive" },
            ],
            diagnoses: [
                { label: "Periapical abscess", detail: "Since: 3 days | Status: Confirmed | Associated with tooth 26" },
            ],
            dentalExamination: [
                {
                    toothLabel: "Upper Left First Molar (T26)",
                    treatmentHistory: [
                        {
                            name: "Acute periapical abscess",
                            surface: "Buccal vestibule",
                            since: "26 Jan'26",
                            notes: "Buccal space involvement",
                        },
                    ],
                    findings: [
                        {
                            name: "Large carious lesion with swelling",
                            surface: "Buccal",
                            since: "26 Jan'26",
                            notes: "Tender on percussion",
                        },
                    ],
                    procedures: [
                        {
                            name: "Incision and Drainage",
                            surface: "Buccal vestibule",
                            date: "26 Jan'26",
                            status: "Completed",
                            notes: "Under LA",
                        },
                    ],
                    overallToothNote: "Review for RCT vs extraction after antibiotic course.",
                },
            ],
            medications: [
                {
                    label: "Augmentin 625mg",
                    detail: "1 tablet | 1-0-1 | After Food | 5 days",
                    row: {
                        medicine: "Augmentin 625mg",
                        unitPerDose: "1 Tablet",
                        frequency: "1 - 0 - 1",
                        when: "After Food",
                        duration: "5 Days",
                        note: "Amoxicillin + Clavulanate for abscess",
                    },
                },
                {
                    label: "Metronidazole 400mg",
                    detail: "1 tablet | 1-1-1 | After Food | 5 days",
                    row: {
                        medicine: "Metronidazole 400mg",
                        unitPerDose: "1 Tablet",
                        frequency: "1 - 1 - 1",
                        when: "After Food",
                        duration: "5 Days",
                        note: "Anaerobic coverage",
                    },
                },
            ],
            advice: "Incision & drainage performed. Warm saline rinse 4×/day. Review after antibiotics for RCT or extraction decision.",
            followUp: "After 5 days",
            labInvestigations: ["IOPA X-ray — 26"],
            vitals: {
                bpSystolic: "118",
                bpDiastolic: "74",
                temperature: "99.1",
                heartRate: "90",
                respiratoryRate: "20",
            },
            additionalNotes: "I&D done under LA. Pus drained. Crown (PFM) planned post-RCT.",
        },
        writtenRx: [],
    },
    {
        id: "visit-24-jan",
        dateLabel: "24 Jan'26",
        digitalRx: {
            symptoms: [
                { label: "Bleeding gums", detail: "Since: 1 month | Status: Active | During brushing" },
                { label: "Bad breath", detail: "Since: 1 month | Status: Active" },
            ],
            examinations: [
                { label: "Periodontal exam", detail: "Generalized 3-4mm pockets, bleeding on probing, moderate calculus" },
            ],
            diagnoses: [
                { label: "Chronic generalized gingivitis", detail: "Since: 1 month | Status: Confirmed | Moderate severity" },
            ],
            dentalExamination: [
                {
                    toothLabel: "Full Mouth (Periodontal)",
                    treatmentHistory: [],
                    findings: [
                        {
                            name: "Generalized periodontal pockets",
                            surface: "All quadrants",
                            since: "24 Jan'26",
                            notes: "3-4mm pockets with bleeding on probing",
                        },
                        {
                            name: "Moderate supragingival calculus",
                            surface: "All quadrants",
                            since: "24 Jan'26",
                        },
                    ],
                    procedures: [
                        {
                            name: "Scaling and Polishing",
                            surface: "Full Mouth",
                            date: "24 Jan'26",
                            status: "Completed",
                            notes: "Single sitting",
                        },
                    ],
                    overallToothNote: "Modified Bass brushing technique demonstrated; 2-week review advised.",
                },
            ],
            medications: [
                {
                    label: "Chlorhexidine 0.2% Mouthwash",
                    detail: "10ml | Twice daily | After brushing | 2 weeks",
                    row: {
                        medicine: "Chlorhexidine 0.2% Mouthwash",
                        unitPerDose: "10 ml",
                        frequency: "1 - 0 - 1",
                        when: "After Brushing",
                        duration: "2 Weeks",
                        note: "Do not rinse after use",
                    },
                },
            ],
            advice: "Full-mouth scaling completed. Use soft-bristle brush. Modified Bass brushing technique demonstrated. Floss daily.",
            followUp: "After 2 weeks (review)",
            labInvestigations: [],
            vitals: {
                bpSystolic: "116",
                bpDiastolic: "72",
                temperature: "98.4",
                heartRate: "82",
            },
            additionalNotes: "Scaling & polishing completed in single sitting. Oral hygiene instructions given. Recall in 6 months.",
        },
        writtenRx: [
            {
                id: "wrx-24-a",
                title: "Written Rx",
                description: "Handwritten prescription (24 Jan'26)",
                pdfUrl: WRITTEN_RX_PDF_URL,
                previewImage: WRITTEN_RX_PREVIEW,
            },
        ],
    },
    {
        id: "visit-22-jan",
        dateLabel: "22 Jan'26",
        writtenRx: [
            {
                id: "wrx-22-a",
                title: "Written Rx",
                description: "Extraction consent + post-op instructions (22 Jan'26)",
                pdfUrl: WRITTEN_RX_PDF_URL,
                previewImage: WRITTEN_RX_PREVIEW,
            },
        ],
    },
    {
        id: "visit-20-jan",
        dateLabel: "20 Jan'26",
        writtenRx: [
            {
                id: "wrx-20-a",
                title: "Written Rx",
                description: "Initial consultation notes (20 Jan'26)",
                pdfUrl: WRITTEN_RX_PDF_URL,
                previewImage: WRITTEN_RX_PREVIEW,
            },
        ],
    },
];
function useIsTouchLike() {
    const [touchLike, setTouchLike] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const query = window.matchMedia("(hover: none), (pointer: coarse)");
        const update = () => {
            setTouchLike(query.matches || window.navigator.maxTouchPoints > 0);
        };
        update();
        query.addEventListener?.("change", update);
        return () => query.removeEventListener?.("change", update);
    }, []);
    return touchLike;
}
function CopyAffordance({ onCopy, showOnHover = true, hideOnTouch = false, copyHint = "Copy to RxPad", copiedLabel = "Copied to RxPad", className, }) {
    const isTouchLike = useIsTouchLike();
    const [copied, setCopied] = useState(false);
    const [hovered, setHovered] = useState(false);
    const runCopy = () => {
        onCopy();
        setCopied(true);
        window.setTimeout(() => {
            setCopied(false);
        }, 1200);
    };
    const visibilityClass = isTouchLike
        ? hideOnTouch
            ? pv.copyTouchHide
            : pv.copyVisible
        : showOnHover
            ? pv.copyPeek
            : pv.copyVisible;
    const button = (_jsx("button", { type: "button", "aria-label": copyHint, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), onClick: (event) => {
            event.stopPropagation();
            runCopy();
        }, className: clsx(pv.copyBtn, copied ? pv.copyBtnSuccess : pv.copyBtnIdle, visibilityClass, className), children: _jsx(CopyIcon, { size: 14, color: copied ? "var(--tp-success-600)" : "var(--tp-blue-500)", variant: copied || hovered ? "Bulk" : "Linear" }) }));
    if (isTouchLike) {
        return _jsx("div", { className: pv.inlineFlexCenter, children: button });
    }
    return (_jsx("div", { className: pv.inlineFlexCenter, children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: button }), _jsx(TooltipContent, { side: "top", sideOffset: 4, className: pv.tooltipDark, children: copied ? copiedLabel : copyHint })] }) }));
}
function TapCopyTooltip({ onCopy, copyHint = "Copy to RxPad", copiedLabel = "Copied to RxPad", className, children, }) {
    const isTouchLike = useIsTouchLike();
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const runCopy = () => {
        onCopy();
        setCopied(true);
        window.setTimeout(() => {
            setCopied(false);
            setOpen(false);
        }, 900);
    };
    if (!isTouchLike) {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsxs(Tooltip, { open: open, onOpenChange: setOpen, children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("button", { "aria-label": copyHint, className: clsx(pv.tapTriggerReset, className), onClick: (event) => {
                        event.stopPropagation();
                        setOpen((prev) => !prev);
                    }, type: "button", children: children }) }), _jsx(TooltipContent, { align: "start", className: pv.tapTooltipPanel, collisionPadding: 10, side: "top", sideOffset: 4, children: _jsxs("div", { className: pv.tapTooltipRow, children: [_jsx("p", { className: pv.tapTooltipText, children: copied ? copiedLabel : copyHint }), _jsxs("button", { className: pv.tapCopyAction, onClick: (event) => {
                                event.stopPropagation();
                                runCopy();
                            }, type: "button", children: [_jsx(CopyIcon, { size: 12, color: copied ? "var(--tp-success-600)" : "var(--tp-blue-500)", variant: copied ? "Bulk" : "Linear" }), _jsx("span", { children: copied ? "Done" : "Copy to RxPad" })] })] }) })] }));
}
function SymptomsIcon() {
    return _jsx(TPMedicalIcon, { name: "Virus", variant: "bulk", size: 16, color: "var(--tp-violet-400)", className: pv.medIcon });
}
function ExamIcon() {
    return _jsx(TPMedicalIcon, { name: "medical service", variant: "bulk", size: 16, color: "var(--tp-violet-400)", className: pv.medIcon });
}
function DiagnosisIcon() {
    return _jsx(TPMedicalIcon, { name: "Diagnosis", variant: "bulk", size: 16, color: "var(--tp-violet-400)", className: pv.medIcon });
}
function PillIcon() {
    return _jsx(TPMedicalIcon, { name: "Tablets", variant: "bulk", size: 16, color: "var(--tp-violet-400)", className: pv.medIcon });
}
function AdviceIcon() {
    return _jsx(TPMedicalIcon, { name: "health care", variant: "bulk", size: 16, color: "var(--tp-violet-400)", className: pv.medIcon });
}
function ClockIcon() {
    return _jsx(Calendar2, { size: 16, color: "var(--tp-violet-400)", variant: "Bulk", className: pv.medIcon });
}
function DateHeader({ dateLabel, expanded, onToggle, onCopyDate, canCopy, }) {
    const { headerRef, isStuck } = useStickyHeaderState();
    return (_jsx("div", { ref: headerRef, role: "button", tabIndex: 0, onClick: onToggle, onKeyDown: (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onToggle();
            }
        }, className: clsx(pv.dateHead, expanded
            ? isStuck
                ? pv.dateHeadStuck
                : pv.dateHeadOpen
            : pv.dateHeadCollapsed), children: _jsxs("div", { className: pv.dateHeadRow, children: [_jsxs("div", { className: clsx(pv.dateHeadLeft, pv.interactiveGroup), children: [_jsx("div", { className: pv.dateHeadTitle, children: dateLabel }), canCopy ? (_jsx(CopyAffordance, { onCopy: onCopyDate, showOnHover: false, copyHint: `Copy all details from ${dateLabel} to RxPad`, copiedLabel: `${dateLabel} copied to RxPad` })) : null] }), _jsx("div", { className: pv.chevronBox, children: expanded ? (_jsx(ArrowSquareUp, { color: "var(--tp-slate-500)", size: 18, strokeWidth: 1.5, variant: "Linear" })) : (_jsx(ArrowSquareDown, { color: "var(--tp-slate-500)", size: 18, strokeWidth: 1.5, variant: "Linear" })) })] }) }));
}
function RxTabStrip({ activeTab, onSwitch, }) {
    return (_jsx("div", { className: pv.tabStripWrap, children: _jsxs("div", { className: pv.tabStripInner, children: [_jsx("button", { type: "button", onClick: () => onSwitch("digital"), className: clsx(pv.tabBtn, pv.tabBtnLeft, activeTab === "digital" ? pv.tabLabelOn : pv.tabLabelOff), style: activeTab === "digital"
                        ? {
                            backgroundImage: "linear-gradient(180deg, #6a69ff 0%, #3a39b2 100%)",
                            border: "0.518px solid var(--tp-blue-400)",
                        }
                        : {
                            backgroundImage: "linear-gradient(180.418deg, rgba(255,255,255,0) 0%, rgb(240,240,255) 100%)",
                            border: "0.518px solid var(--tp-slate-200)",
                            borderRight: "none",
                        }, children: "Digital Rx" }), _jsx("button", { type: "button", onClick: () => onSwitch("written"), className: clsx(pv.tabBtn, pv.tabBtnRight, activeTab === "written" ? pv.tabLabelOn : pv.tabLabelOff), style: activeTab === "written"
                        ? {
                            backgroundImage: "linear-gradient(180deg, #6a69ff 0%, #3a39b2 100%)",
                            border: "0.518px solid var(--tp-blue-400)",
                        }
                        : {
                            backgroundImage: "linear-gradient(180.418deg, rgba(255,255,255,0) 0%, rgb(240,240,255) 100%)",
                            border: "0.518px solid var(--tp-slate-200)",
                            borderLeft: "none",
                        }, children: "Written Rx" })] }) }));
}
function ListSection({ icon, title, items, onCopySection, onCopyItem, }) {
    const sectionDescriptions = {
        Symptoms: "all symptoms",
        Examination: "all examination findings",
        Diagnosis: "all diagnoses",
        "Medication (Rx)": "all medications",
    };
    const itemDescriptions = {
        Symptoms: "this symptom",
        Examination: "this finding",
        Diagnosis: "this diagnosis",
        "Medication (Rx)": "this medication",
    };
    return (_jsxs("div", { className: pv.sectionBlock, children: [_jsxs("div", { className: clsx(pv.sectionHead, pv.interactiveGroup), children: [_jsx("div", { className: pv.iconBox16, children: icon }), _jsx(TapCopyTooltip, { onCopy: onCopySection, copyHint: `Copy ${sectionDescriptions[title] ?? "all items"} to RxPad`, copiedLabel: `${title} copied to RxPad`, children: _jsx("span", { className: pv.sectionTitle, children: title }) }), _jsx(CopyAffordance, { onCopy: onCopySection, className: pv.pushEnd, showOnHover: true, hideOnTouch: true, copyHint: `Copy ${sectionDescriptions[title] ?? "all items"} to RxPad`, copiedLabel: `${title} copied to RxPad` })] }), _jsx("ul", { className: pv.listUl, children: items.map((item) => {
                    const normalizedLabel = normalizePointerText(item.label);
                    const normalizedDetail = normalizePointerText(item.detail);
                    const detailParts = splitMetaParts(normalizedDetail);
                    return (_jsx("li", { className: clsx(pv.listLi, pv.interactiveGroup), children: _jsxs("div", { className: pv.listItemRow, children: [_jsx(TapCopyTooltip, { className: pv.itemTapWrap, copyHint: `Copy ${itemDescriptions[title] ?? "this item"} to RxPad`, copiedLabel: `${item.label} copied to RxPad`, onCopy: () => onCopyItem(item), children: _jsxs("span", { className: pv.itemLabelBlock, children: [_jsx("span", { className: pv.itemLabelStrong, children: normalizedLabel }), detailParts.length > 0 ? (_jsx("span", { className: pv.itemMetaInline, children: renderMetaInBrackets(detailParts) })) : null] }) }), _jsx(CopyAffordance, { onCopy: () => onCopyItem(item), showOnHover: true, hideOnTouch: true, copyHint: `Copy ${itemDescriptions[title] ?? "this item"} to RxPad`, copiedLabel: `${item.label} copied to RxPad` })] }) }, `${title}-${item.label}-${item.detail}`));
                }) })] }));
}
function AdviceSection({ advice, onCopy, }) {
    return (_jsxs("div", { className: pv.sectionBlock, children: [_jsxs("div", { className: clsx(pv.sectionHead, pv.interactiveGroup), children: [_jsx("div", { className: pv.iconBox16, children: _jsx(AdviceIcon, {}) }), _jsx(TapCopyTooltip, { onCopy: onCopy, copyHint: "Copy all advice to RxPad", copiedLabel: "Advice copied to RxPad", children: _jsx("span", { className: pv.sectionTitle, children: "Advice" }) }), _jsx(CopyAffordance, { onCopy: onCopy, className: pv.pushEnd, showOnHover: true, hideOnTouch: true, copiedLabel: "Advice copied to RxPad" })] }), _jsx(TapCopyTooltip, { className: pv.bodyPl, onCopy: onCopy, copyHint: "Copy this advice to RxPad", copiedLabel: "Advice copied to RxPad", children: _jsx("span", { className: pv.bodyTextMuted, children: advice }) })] }));
}
function FollowUpSection({ followUp, onCopy, }) {
    return (_jsxs("div", { className: pv.sectionBlock, children: [_jsxs("div", { className: clsx(pv.sectionHead, pv.interactiveGroup), children: [_jsx("div", { className: pv.iconBox16, children: _jsx(ClockIcon, {}) }), _jsx(TapCopyTooltip, { onCopy: onCopy, copyHint: "Copy all follow-up details to RxPad", copiedLabel: "Follow-up copied to RxPad", children: _jsx("span", { className: pv.sectionTitle, children: "Follow Up" }) }), _jsx(CopyAffordance, { onCopy: onCopy, className: pv.pushEnd, showOnHover: true, hideOnTouch: true, copiedLabel: "Follow-up copied to RxPad" })] }), _jsx(TapCopyTooltip, { className: pv.bodyPl, onCopy: onCopy, copyHint: "Copy this follow-up to RxPad", copiedLabel: "Follow-up copied to RxPad", children: _jsx("span", { className: pv.bodyTextMuted, children: followUp }) })] }));
}
function DentalToothBlock({ block, }) {
    const hasRows = block.treatmentHistory.length > 0 ||
        block.findings.length > 0 ||
        block.procedures.length > 0 ||
        Boolean(block.overallToothNote?.trim());
    if (!hasRows)
        return null;
    const formatStructuredLine = (line) => {
        const meta = formatBracketParts([
            line.surface,
            line.since,
            line.date,
            line.status,
            line.notes,
        ]);
        return {
            title: normalizePointerText(line.name),
            metaParts: meta ? splitMetaParts(meta) : [],
        };
    };
    const sectionRows = [
        { label: "Treatment History", values: block.treatmentHistory.map(formatStructuredLine) },
        { label: "Findings", values: block.findings.map(formatStructuredLine) },
        { label: "Procedures", values: block.procedures.map(formatStructuredLine) },
        {
            label: "Overall Tooth Notes",
            values: block.overallToothNote?.trim()
                ? [{ title: normalizePointerText(block.overallToothNote), metaParts: [] }]
                : [],
        },
    ].filter((row) => row.values.length > 0);
    return (_jsxs("div", { className: pv.sectionBlock, children: [_jsxs("div", { className: pv.sectionHead, children: [_jsx("div", { className: pv.iconBox16, children: _jsx(ToothIcon, { size: 14, color: "var(--tp-violet-400)", variant: "Bulk" }) }), _jsx("span", { className: pv.sectionTitle, children: block.toothLabel })] }), _jsx("ul", { className: pv.dentalUl, children: sectionRows.map((row) => (_jsxs("li", { className: pv.dentalLi, children: [_jsxs("span", { className: pv.dentalLabel, children: [row.label, ":"] }), " ", row.values.map((value, index) => (_jsxs(React.Fragment, { children: [index > 0 ? _jsx("span", { className: pv.dentalComma, children: ", " }) : null, _jsx("span", { className: pv.dentalValue, children: value.title }), renderMetaInBrackets(value.metaParts)] }, `${row.label}-${index}`)))] }, `${block.toothLabel}-${row.label}`))) })] }));
}
function WrittenRxPreviewCard({ document, onOpen, onPreview, onDownload, onPrint, }) {
    return (_jsxs("button", { type: "button", onClick: () => onOpen(document), className: pv.writtenBtn, children: [_jsx("div", { className: pv.writtenThumb, children: _jsx("img", { alt: document.title, src: document.previewImage, className: pv.writtenImg }) }), _jsxs("div", { className: pv.writtenFooter, children: [_jsxs("div", { className: pv.writtenTextCol, children: [_jsx("p", { className: pv.writtenTitle, children: document.title }), _jsx("p", { className: pv.writtenDesc, children: document.description })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx("span", { role: "button", tabIndex: 0, onClick: (event) => event.stopPropagation(), className: pv.menuTriggerIcon, children: _jsx(MoreVertical, { color: "var(--tp-slate-500)", size: 16, strokeWidth: 1.5 }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: pv.menuNarrow, children: [_jsxs(DropdownMenuItem, { onSelect: (event) => {
                                            event.preventDefault();
                                            onPreview(document);
                                        }, children: [_jsx(Eye, { color: "var(--tp-violet-500)", size: 14, variant: "Bulk" }), "Preview"] }), _jsxs(DropdownMenuItem, { onSelect: (event) => {
                                            event.preventDefault();
                                            onDownload(document);
                                        }, children: [_jsx(Import, { color: "var(--tp-violet-500)", size: 14, variant: "Bulk" }), "Download"] }), _jsxs(DropdownMenuItem, { onSelect: (event) => {
                                            event.preventDefault();
                                            onPrint(document);
                                        }, children: [_jsx(Printer, { color: "var(--tp-violet-500)", size: 14, variant: "Bulk" }), "Print"] })] })] })] })] }));
}
export function PastVisitsContent() {
    const [expandedState, setExpandedState] = useState(() => Object.fromEntries(PAST_VISITS.map((entry, index) => [entry.id, index === 0])));
    const [tabState, setTabState] = useState(() => Object.fromEntries(PAST_VISITS.map((entry) => [entry.id, entry.digitalRx ? "digital" : "written"])));
    const [activeDocument, setActiveDocument] = useState(null);
    const [snackbar, setSnackbar] = useState(null);
    const orderedVisits = useMemo(() => PAST_VISITS, []);
    const showCopySnackbar = (message) => {
        setSnackbar({ id: Date.now(), message });
    };
    const openDocument = (dateLabel, document) => {
        setActiveDocument({ dateLabel, document });
    };
    const handleDownload = (doc) => {
        const anchor = window.document.createElement("a");
        anchor.href = doc.pdfUrl;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.download = `${doc.title.toLowerCase().replace(/\\s+/g, "-")}.pdf`;
        anchor.click();
        showCopySnackbar("Written Rx download started");
    };
    const handlePrint = (doc) => {
        const printWindow = window.open(doc.pdfUrl, "_blank", "noopener,noreferrer");
        if (printWindow) {
            printWindow.focus();
            window.setTimeout(() => {
                try {
                    printWindow.print();
                }
                catch {
                    // no-op
                }
            }, 500);
            showCopySnackbar("Opened print view for written Rx");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: pv.scrollFlex, "data-sticky-scroll-root": "true", children: _jsx("div", { className: pv.innerStack, children: orderedVisits.map((entry) => {
                        const expanded = Boolean(expandedState[entry.id]);
                        const hasDigital = Boolean(entry.digitalRx);
                        const hasWritten = entry.writtenRx.length > 0;
                        const activeTab = tabState[entry.id];
                        const showDigital = expanded && hasDigital && activeTab === "digital";
                        const showWritten = expanded && hasWritten && (!hasDigital || activeTab === "written");
                        const diagnosisItems = entry.digitalRx ? entry.digitalRx.diagnoses : [];
                        const medicationItems = entry.digitalRx
                            ? entry.digitalRx.medications.map((item) => ({
                                label: normalizePointerText(item.row.medicine || item.label),
                                detail: formatMedicationDetail(item),
                            }))
                            : [];
                        const dentalToothBlocks = (entry.digitalRx?.dentalExamination ?? []).filter((block) => block.treatmentHistory.length > 0 ||
                            block.findings.length > 0 ||
                            block.procedures.length > 0 ||
                            Boolean(block.overallToothNote?.trim()));
                        const hasClinicalContent = Boolean(entry.digitalRx &&
                            (entry.digitalRx.symptoms.length > 0 ||
                                entry.digitalRx.examinations.length > 0 ||
                                diagnosisItems.length > 0 ||
                                medicationItems.length > 0 ||
                                entry.digitalRx.labInvestigations.length > 0 ||
                                Boolean(entry.digitalRx.advice?.trim()) ||
                                Boolean(entry.digitalRx.followUp?.trim())));
                        const hasDentalContent = dentalToothBlocks.length > 0;
                        return (_jsxs("div", { className: pv.visitCard, style: tpSectionCardStyle, children: [_jsx(DateHeader, { dateLabel: entry.dateLabel, expanded: expanded, canCopy: hasDigital, onToggle: () => {
                                        setExpandedState((prev) => ({
                                            ...prev,
                                            [entry.id]: !prev[entry.id],
                                        }));
                                    }, onCopyDate: () => showCopySnackbar(`${entry.dateLabel} details added successfully to RxPad`) }), expanded ? (_jsxs(_Fragment, { children: [hasDigital && hasWritten ? (_jsx(RxTabStrip, { activeTab: activeTab, onSwitch: (tab) => {
                                                setTabState((prev) => ({ ...prev, [entry.id]: tab }));
                                            } })) : null, showDigital && entry.digitalRx ? (_jsxs(_Fragment, { children: [entry.digitalRx.symptoms.length > 0 ? (_jsx(ListSection, { icon: _jsx(SymptomsIcon, {}), title: "Symptoms", items: entry.digitalRx.symptoms, onCopySection: () => showCopySnackbar("Symptoms added successfully to RxPad"), onCopyItem: (item) => showCopySnackbar(`${item.label} symptom added successfully to RxPad`) })) : null, entry.digitalRx.examinations.length > 0 ? (_jsx(ListSection, { icon: _jsx(ExamIcon, {}), title: "Examination", items: entry.digitalRx.examinations, onCopySection: () => showCopySnackbar("Examination findings added successfully to RxPad"), onCopyItem: (item) => showCopySnackbar(`${item.label} finding added successfully to RxPad`) })) : null, diagnosisItems.length > 0 ? (_jsx(ListSection, { icon: _jsx(DiagnosisIcon, {}), title: "Diagnosis", items: diagnosisItems, onCopySection: () => showCopySnackbar("Diagnoses added successfully to RxPad"), onCopyItem: (item) => showCopySnackbar(`${item.label} diagnosis added successfully to RxPad`) })) : null, entry.digitalRx.labInvestigations.length > 0 ? (_jsx(ListSection, { icon: _jsx(DiagnosisIcon, {}), title: "Lab Investigation", items: entry.digitalRx.labInvestigations.map((item) => ({ label: item, detail: "" })), onCopySection: () => showCopySnackbar("Lab investigations added successfully to RxPad"), onCopyItem: (item) => showCopySnackbar(`${item.label} added successfully to RxPad`) })) : null, medicationItems.length > 0 ? (_jsx(ListSection, { icon: _jsx(PillIcon, {}), title: "Medication (Rx)", items: medicationItems, onCopySection: () => showCopySnackbar("Medications added successfully to RxPad"), onCopyItem: (item) => showCopySnackbar(`${item.label} medication added successfully to RxPad`) })) : null, hasDentalContent ? (_jsx("div", { className: pv.dentalStack, children: dentalToothBlocks.map((block) => (_jsx(DentalToothBlock, { block: block }, `${entry.id}-${block.toothLabel}`))) })) : null, entry.digitalRx.advice.trim() ? (_jsx(AdviceSection, { advice: entry.digitalRx.advice, onCopy: () => showCopySnackbar("Advice added successfully to RxPad") })) : null, entry.digitalRx.followUp.trim() ? (_jsx(FollowUpSection, { followUp: entry.digitalRx.followUp, onCopy: () => showCopySnackbar("Follow-up added successfully to RxPad") })) : null, !hasClinicalContent && !hasDentalContent ? (_jsx("div", { className: pv.emptyClinical, children: _jsx("p", { className: pv.emptyClinicalText, children: "No clinical or dental examination details available for this visit." }) })) : null] })) : null, showWritten ? (_jsx("div", { className: pv.writtenStack, children: entry.writtenRx.map((document) => (_jsx(WrittenRxPreviewCard, { document: document, onOpen: (selectedDocument) => openDocument(entry.dateLabel, selectedDocument), onPreview: (selectedDocument) => {
                                                    openDocument(entry.dateLabel, selectedDocument);
                                                    showCopySnackbar("Opened written Rx preview");
                                                }, onDownload: handleDownload, onPrint: handlePrint }, document.id))) })) : null] })) : null] }, entry.id));
                    }) }) }), _jsx(TPDrawer, { open: Boolean(activeDocument), onOpenChange: (open) => {
                    if (!open)
                        setActiveDocument(null);
                }, children: _jsxs(TPDrawerContent, { side: "right", size: "xl", className: pv.drawerSheet, children: [_jsxs(TPDrawerHeader, { className: pv.drawerHeader, children: [_jsxs("div", { children: [_jsx(TPDrawerTitle, { children: activeDocument?.document.title ?? "Written Rx PDF" }), _jsx(TPDrawerDescription, { children: activeDocument ? `${activeDocument.dateLabel} • ${activeDocument.document.description}` : "" })] }), activeDocument ? (_jsxs("div", { className: pv.drawerActions, children: [_jsxs("button", { type: "button", className: pv.drawerActionBtn, onClick: () => showCopySnackbar("Preview is open"), children: [_jsx(Eye, { color: "currentColor", size: 14, strokeWidth: 1.5, variant: "Linear" }), "Preview"] }), _jsxs("button", { type: "button", className: pv.drawerActionBtn, onClick: () => handleDownload(activeDocument.document), children: [_jsx(Import, { color: "currentColor", size: 14, strokeWidth: 1.5, variant: "Linear" }), "Download"] }), _jsxs("button", { type: "button", className: pv.drawerActionBtn, onClick: () => handlePrint(activeDocument.document), children: [_jsx(Printer, { color: "currentColor", size: 14, strokeWidth: 1.5, variant: "Linear" }), "Print"] })] })) : null] }), _jsx("div", { className: pv.pdfPane, children: _jsx("object", { data: activeDocument?.document.pdfUrl, type: "application/pdf", className: pv.pdfObject, children: _jsxs("div", { className: pv.pdfFallback, children: [activeDocument ? (_jsx("img", { alt: activeDocument.document.title, src: activeDocument.document.previewImage, className: pv.pdfFallbackImg })) : null, _jsx("p", { className: pv.pdfFallbackText, children: "PDF preview unavailable. Use a browser with PDF support." })] }) }) })] }) }), _jsx(TPSnackbar, { open: Boolean(snackbar), message: snackbar?.message ?? "", severity: "success", autoHideDuration: 1800, anchorOrigin: { vertical: "top", horizontal: "center" }, onClose: (_, reason) => {
                    if (reason === "clickaway")
                        return;
                    setSnackbar(null);
                } }, snackbar?.id ?? 0)] }));
}
