import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Gynec History content panel — always-open section cards.
 */
import React from "react";
import { ActionButton, SectionCard, ContentRow, SectionScrollArea, Grey, Sep, } from "../detail-shared";
import layout from "./sidebarContentLayout.module.scss";
const GYNEC_SECTIONS = [
    {
        id: "menarche",
        title: "Menarche",
        content: (_jsxs("p", { className: layout.bodyPara, children: [_jsx(Grey, { children: "Age at: " }), _jsx("span", { children: "12 years " }), _jsx(Sep, {}), _jsx(Grey, { children: "Notes: " }), _jsx("span", { children: "Menarche reported at expected age with no early-cycle complications" })] })),
    },
    {
        id: "cycle",
        title: "Cycle",
        content: (_jsxs("p", { className: layout.bodyPara, children: [_jsx(Grey, { children: "Type: " }), _jsx("span", { children: "Regular " }), _jsx(Sep, {}), _jsx(Grey, { children: "Cycle Interval: " }), _jsx("span", { children: "28 days " }), _jsx(Sep, {}), _jsx(Grey, { children: "Notes: " }), _jsx("span", { children: "Last three cycles regular, no missed cycle in past 6 months" })] })),
    },
    {
        id: "flow",
        title: "Flow",
        content: (_jsxs("p", { className: layout.bodyPara, children: [_jsx(Grey, { children: "Volume: " }), _jsx("span", { children: "Moderate " }), _jsx(Sep, {}), _jsx(Grey, { children: "No of pads per day: " }), _jsx("span", { children: "3 " }), _jsx(Sep, {}), _jsx(Grey, { children: "Notes: " }), _jsx("span", { children: "No passage of clots reported in recent cycles" })] })),
    },
    {
        id: "pain",
        title: "Pain",
        content: (_jsxs("p", { className: layout.bodyPara, children: [_jsx(Grey, { children: "Level: " }), _jsx("span", { children: "Mild dysmenorrhea " }), _jsx(Sep, {}), _jsx(Grey, { children: "Status: " }), _jsx("span", { children: "Intermittent " }), _jsx(Sep, {}), _jsx(Grey, { children: "Notes: " }), _jsx("span", { children: "Improves with hydration and over-the-counter analgesics" })] })),
    },
    {
        id: "lifecycle",
        title: "Lifecycle Hormonal Changes",
        content: (_jsxs("p", { className: layout.bodyPara, children: [_jsx(Grey, { children: "LA at: " }), _jsx("span", { children: "Not attained " }), _jsx(Sep, {}), _jsx(Grey, { children: "LA type: " }), _jsx("span", { children: "NA " }), _jsx(Sep, {}), _jsx(Grey, { children: "LA Notes: " }), _jsx("span", { children: "No menopausal symptoms currently reported" })] })),
    },
    {
        id: "notes",
        title: "Notes",
        content: (_jsx("p", { className: layout.bodyPara, children: "Patient reports good medication adherence and tracks cycles on mobile app. No intermenstrual bleeding or post-coital bleeding reported in recent visits." })),
    },
];
export function GynecHistoryContent() {
    return (_jsxs("div", { className: layout.pageRoot, children: [_jsx(ActionButton, { label: "Add/Edit Details", icon: "plus" }), _jsx(SectionScrollArea, { children: GYNEC_SECTIONS.map((section) => (_jsx(SectionCard, { title: section.title, hideChevron: true, children: _jsx(ContentRow, { children: section.content }) }, section.id))) })] }));
}
