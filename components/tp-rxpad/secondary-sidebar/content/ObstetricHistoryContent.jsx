import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Obstetric History content panel — expandable sections.
 * Patient Info is intentionally non-collapsible (no chevron).
 */
import React, { useState } from "react";
import clsx from "clsx";
import { ActionButton, SectionCard, ContentRow, SectionScrollArea, Grey, Sep, } from "../detail-shared";
import layout from "./sidebarContentLayout.module.scss";
function PatientInfoCard() {
    return (_jsx(SectionCard, { title: "Patient Info", hideChevron: true, children: _jsx(ContentRow, { children: _jsxs("p", { className: layout.bodyPara, children: [_jsx(Grey, { children: "LMP: " }), _jsx("span", { children: "14 Jan'26 " }), _jsx(Sep, {}), _jsx(Grey, { children: "EDD: " }), _jsx("span", { children: "21 Oct'26 " }), _jsx(Sep, {}), _jsx(Grey, { children: "Gestation: " }), _jsx("span", { children: "14 Weeks 2 Days" })] }) }) }));
}
function GPLAECard() {
    return (_jsx(SectionCard, { title: "GPLAE", hideChevron: true, titleAddon: (_jsx("span", { className: layout.badgePrimigravida, children: "Primigravida" })), children: _jsx(ContentRow, { children: _jsxs("p", { className: layout.bodyPara, children: [_jsx("span", { children: "G: 1 " }), _jsx(Sep, {}), _jsx("span", { children: "P: 0 " }), _jsx(Sep, {}), _jsx("span", { children: "L: 0 " }), _jsx(Sep, {}), _jsx("span", { children: "A: 0 " }), _jsx(Sep, {}), _jsx("span", { children: "E: 0" })] }) }) }));
}
function GravidaEntry({ no, hasRemarks, }) {
    return (_jsxs("div", { className: layout.blockPad, children: [_jsxs("p", { className: layout.blockTitle, children: ["Gravida no: ", no] }), _jsxs("p", { className: clsx(layout.blockBody, layout.blockBodyBreak), children: [_jsx(Grey, { children: "LMP: " }), _jsx("span", { children: "14 Jan'25 " }), _jsx(Sep, {}), _jsx(Grey, { children: "EDD: " }), _jsx("span", { children: "21 Oct'25 " }), _jsx(Sep, {}), _jsx(Grey, { children: "Gestation: " }), _jsx("span", { children: "40 Weeks " }), _jsx(Sep, {}), _jsx(Grey, { children: "MOD: " }), _jsx("span", { children: "NVD " }), _jsx(Sep, {}), _jsx(Grey, { children: "Delivery Date: " }), _jsx("span", { children: "14 Nov'25 " }), _jsx(Sep, {}), _jsx(Grey, { children: "Baby Weight: " }), _jsx("span", { children: "2.8 Kgs" }), hasRemarks ? (_jsxs(_Fragment, { children: [_jsx(Sep, {}), _jsx(Grey, { children: "Remarks: " }), _jsx("span", { children: "Postnatal period was uneventful; breastfeeding initiated within first hour." })] })) : null] })] }));
}
function PregnancyHistoryCard({ expanded, onToggle, }) {
    return (_jsxs(SectionCard, { title: "Pregnancy History", expanded: expanded, onToggle: onToggle, children: [_jsx(GravidaEntry, { no: 1 }), _jsx("div", { className: layout.divider }), _jsx(GravidaEntry, { no: 2, hasRemarks: true })] }));
}
function ExaminationCard({ expanded, onToggle, }) {
    return (_jsxs(SectionCard, { title: "Examination", expanded: expanded, onToggle: onToggle, children: [_jsxs("div", { className: layout.blockPad, children: [_jsx("p", { className: layout.blockTitle, children: "17 Jan'26" }), _jsxs("p", { className: layout.vaccineMeta, children: [_jsx(Grey, { children: "Pedal Oedema: " }), _jsx("span", { children: "Mild " }), _jsx(Sep, {}), _jsx(Grey, { children: "BMI: " }), _jsx("span", { children: "23 Kg/m\u00B2 " }), _jsx(Sep, {}), _jsx(Grey, { children: "BP: " }), _jsx("span", { children: "128/82 mmHg" })] })] }), _jsx("div", { className: layout.divider }), _jsxs("div", { className: layout.blockPad, children: [_jsx("p", { className: layout.blockTitle, children: "24 Jan'26" }), _jsxs("p", { className: layout.vaccineMeta, children: [_jsx(Grey, { children: "Pedal Oedema: " }), _jsx("span", { children: "Absent " }), _jsx(Sep, {}), _jsx(Grey, { children: "BMI: " }), _jsx("span", { children: "23.2 Kg/m\u00B2 " }), _jsx(Sep, {}), _jsx(Grey, { children: "BP: " }), _jsx("span", { children: "122/80 mmHg" })] })] })] }));
}
export function ObstetricHistoryContent() {
    const [expandedState, setExpandedState] = useState({
        pregnancy: true,
        examination: true,
    });
    return (_jsxs("div", { className: layout.pageRoot, children: [_jsx(ActionButton, { label: "Add/Edit Details", icon: "plus" }), _jsxs(SectionScrollArea, { children: [_jsx(PatientInfoCard, {}), _jsx(GPLAECard, {}), _jsx(PregnancyHistoryCard, { expanded: expandedState.pregnancy, onToggle: () => setExpandedState((prev) => ({ ...prev, pregnancy: !prev.pregnancy })) }), _jsx(ExaminationCard, { expanded: expandedState.examination, onToggle: () => setExpandedState((prev) => ({ ...prev, examination: !prev.examination })) })] })] }));
}
