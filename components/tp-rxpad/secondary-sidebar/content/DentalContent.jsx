/**
 * Dental History content panel — tooth-first historical format.
 *
 * Main heading per card = tooth name.
 * Inside each card: Treatment History, Findings, Procedures, Overall Tooth Notes.
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { ToothIcon } from "@/components/dental/ToothIcon";
import { DENTAL_TOOTH_HISTORY } from "@/components/dental/mock-data";
import { TPMedicalIcon } from "@/components/tp-ui";
import { ActionButton, SectionScrollArea, useStickyHeaderState } from "../detail-shared";
import { tpSectionCardStyle } from "../tokens";
import d from "./DentalContent.module.scss";
function ToothHistorySection({ title, medicalIcon, children, }) {
    return (_jsxs("div", { children: [_jsxs("div", { className: d.sectionHeadRow, children: [_jsx("span", { className: d.iconWrap, children: _jsx(TPMedicalIcon, { name: medicalIcon, variant: "bulk", size: 16, color: "var(--tp-violet-400)", className: d.medIcon }) }), _jsx("p", { className: d.sectionTitle, children: title })] }), _jsx("div", { className: d.sectionBody, children: children })] }));
}
function renderMeta(parts) {
    const cleanParts = parts.filter(Boolean);
    return (_jsxs("span", { className: d.metaWrap, children: ["(", cleanParts.map((part, idx) => (_jsxs(React.Fragment, { children: [idx > 0 ? _jsx("span", { className: d.metaSep, children: " | " }) : null, part] }, `${part}-${idx}`))), ")"] }));
}
function formatHistoryDate(value) {
    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
    if (!isoMatch)
        return value;
    const [, y, m, d0] = isoMatch;
    const dt = new Date(Number(y), Number(m) - 1, Number(d0));
    if (Number.isNaN(dt.getTime()))
        return value;
    const day = dt.getDate().toString().padStart(2, "0");
    const month = dt.toLocaleString("en-IN", { month: "short" });
    const year = dt.getFullYear().toString().slice(-2);
    return `${day} ${month}'${year}`;
}
function ToothHistoryCard({ entry }) {
    const { headerRef, isStuck } = useStickyHeaderState();
    return (_jsxs("div", { className: d.cardRoot, style: tpSectionCardStyle, children: [_jsx("div", { ref: headerRef, className: clsx(d.stickyHead, isStuck ? d.stickyHeadStuck : d.stickyHeadOpen), children: _jsx("div", { className: d.headRow, children: _jsx("p", { className: d.toothTitle, children: entry.toothCode === "full-mouth" ? "Full Mouth" : `${entry.toothLabel} (T${entry.toothCode})` }) }) }), _jsxs("div", { className: d.bodyPanel, children: [_jsx(ToothHistorySection, { title: "Treatment History", medicalIcon: "clipboard-activity", children: entry.treatmentHistory.length > 0 ? (_jsx("ul", { className: d.listLoose, children: entry.treatmentHistory.map((item) => (_jsxs("li", { className: d.listItem, children: [_jsx("span", { className: d.itemStrong, children: item.name }), " ", renderMeta([
                                        item.surface,
                                        formatHistoryDate(item.since),
                                        item.notes,
                                    ])] }, item.id))) })) : (_jsx("p", { className: d.emptyLine, children: "No treatment history documented." })) }), _jsx(ToothHistorySection, { title: "Findings", medicalIcon: "diagnosis", children: entry.findings.length > 0 ? (_jsx("ul", { className: d.listTight, children: entry.findings.map((finding) => (_jsxs("li", { className: d.listItem, children: [_jsx("span", { className: d.itemStrong, children: finding.name }), " ", renderMeta([
                                        finding.surface,
                                        formatHistoryDate(finding.since),
                                        finding.notes,
                                    ])] }, finding.id))) })) : (_jsx("p", { className: d.emptyLine, children: "No findings added." })) }), _jsx(ToothHistorySection, { title: "Procedures", medicalIcon: "surgical-scissors-02", children: entry.procedures.length > 0 ? (_jsx("ul", { className: d.listLoose, children: entry.procedures.map((procedure) => (_jsxs("li", { className: d.listItem, children: [_jsx("span", { className: d.itemStrong, children: procedure.name }), " ", renderMeta([
                                        procedure.surface,
                                        formatHistoryDate(procedure.date),
                                        procedure.status,
                                        procedure.notes,
                                    ])] }, procedure.id))) })) : (_jsx("p", { className: d.emptyLine, children: "No procedures recorded." })) }), _jsx(ToothHistorySection, { title: "Overall Tooth Notes", medicalIcon: "note-2", children: _jsx("ul", { className: d.listTight, children: _jsx("li", { className: d.listItem, children: entry.overallNotes ?? "No additional notes." }) }) })] })] }));
}
export function DentalContent() {
    const searchParams = useSearchParams();
    const patientId = searchParams?.get("patientId") ?? "apt-1";
    const entries = DENTAL_TOOTH_HISTORY[patientId] ?? [];
    const [infoMessage, setInfoMessage] = useState("");
    const openDentalExamination = () => {
        if (typeof window === "undefined")
            return;
        const activeTab = window.localStorage.getItem("rxpad.active-tab");
        if (activeTab === "dental") {
            setInfoMessage("You are already in Dental Examination. Add tooth findings/procedures to build history.");
            return;
        }
        window.dispatchEvent(new CustomEvent("tp:open-dental-exam"));
        setInfoMessage("Switched to Dental Examination. Add tooth details to populate Dental History.");
    };
    if (entries.length === 0) {
        return (_jsx("div", { className: d.pageRoot, children: _jsxs("div", { className: d.emptyStack, children: [_jsx("div", { className: d.emptyIconCircle, children: _jsx(ToothIcon, { size: 38, color: "var(--tp-blue-500)", variant: "Linear" }) }), _jsxs("div", { className: d.emptyTextCol, children: [_jsx("p", { className: d.emptyTitle, children: "No dental history yet" }), _jsx("p", { className: d.emptySubtitle, children: "Open Dental Examination to add treatment history, findings, procedures, and tooth notes." })] }), _jsxs("button", { type: "button", onClick: openDentalExamination, className: d.openExamBtn, children: [_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [_jsx("path", { d: "M6 12H18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" }), _jsx("path", { d: "M12 18V6", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" })] }), "Open Dental Examination"] }), infoMessage ? (_jsx("p", { className: d.infoMsg, children: infoMessage })) : null] }) }));
    }
    return (_jsxs("div", { className: d.pageRoot, children: [_jsx(ActionButton, { label: "Open Dental Examination", icon: "plus", onClick: openDentalExamination }), infoMessage ? (_jsx("div", { className: d.bannerWrap, children: _jsx("p", { className: d.bannerText, children: infoMessage }) })) : null, _jsx(SectionScrollArea, { children: entries.map((entry) => (_jsx(ToothHistoryCard, { entry: entry }, entry.id))) })] }));
}
