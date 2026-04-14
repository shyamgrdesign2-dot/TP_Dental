import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Vaccination content panel — expandable section cards.
 */
import React, { useState } from "react";
import { ActionButton, SectionCard, SectionScrollArea, Grey, Sep, Red, } from "../detail-shared";
import layout from "./sidebarContentLayout.module.scss";
function VaccineItemRow({ week, name, status, statusColor = "normal", givenDate = "14 Jan'26", }) {
    const statusEl = statusColor === "overdue" ? _jsx(Red, { children: status }) :
        statusColor === "due" ? _jsx("span", { className: layout.warningText, children: status }) :
            _jsx("span", { children: status });
    return (_jsxs("div", { className: layout.blockPad, children: [_jsx("p", { className: layout.blockTitle, children: week }), _jsxs("p", { className: layout.vaccineMeta, children: [_jsx("span", { className: layout.vaccineMedium, children: name }), _jsx("span", { children: " (" }), _jsx(Grey, { children: "Status: " }), statusEl, _jsx("span", { className: layout.detailPipe, children: " | " }), _jsx(Grey, { children: "Given date: " }), _jsxs("span", { children: [givenDate, " )"] })] })] }));
}
function GivenVaccineItem({ name, givenDate = "14 Jan'25", dueDate = "14 Jan'26", }) {
    return (_jsxs("li", { className: layout.givenLi, children: [_jsx("span", { className: layout.vaccineMedium, children: name }), _jsx("span", { children: " (" }), _jsx(Grey, { children: "Given date: " }), _jsxs("span", { children: [givenDate, " "] }), _jsx(Sep, {}), _jsx(Grey, { children: "Brand: " }), _jsx("span", { children: "Pneumovax 23 Vaccine " }), _jsx(Sep, {}), _jsx(Grey, { children: "Due date: " }), _jsxs("span", { children: [dueDate, ")"] })] }));
}
function GivenVaccineGroup({ week, vaccines }) {
    return (_jsxs("div", { className: layout.blockPad, children: [_jsx("p", { className: layout.blockTitle, children: week }), _jsx("ul", { className: layout.givenList, children: vaccines.map((v, i) => (_jsx(GivenVaccineItem, { name: v }, `${week}-${v}-${i}`))) })] }));
}
export function VaccineContent() {
    const [expandedState, setExpandedState] = useState({
        pending: true,
        upcoming: true,
        given: true,
    });
    return (_jsxs("div", { className: layout.pageRoot, children: [_jsx(ActionButton, { label: "Add/Edit Details", icon: "plus" }), _jsxs(SectionScrollArea, { children: [_jsxs(SectionCard, { title: "Pending Vaccine (4)", expanded: expandedState.pending, onToggle: () => setExpandedState((prev) => ({ ...prev, pending: !prev.pending })), children: [_jsx(VaccineItemRow, { week: "12-18 Weeks", name: "HPV 1", status: "Due", statusColor: "due" }), _jsx("div", { className: layout.divider }), _jsx(VaccineItemRow, { week: "18 Weeks", name: "Tdap Booster", status: "Due", statusColor: "due" })] }), _jsxs(SectionCard, { title: "Upcoming Vaccine (2)", expanded: expandedState.upcoming, onToggle: () => setExpandedState((prev) => ({ ...prev, upcoming: !prev.upcoming })), children: [_jsx(VaccineItemRow, { week: "13 Weeks", name: "PPSV23", status: "Overdue", statusColor: "overdue" }), _jsx("div", { className: layout.divider }), _jsx(VaccineItemRow, { week: "20 Weeks", name: "Influenza", status: "Due in 2 weeks" })] }), _jsxs(SectionCard, { title: "Given Vaccine (20)", expanded: expandedState.given, onToggle: () => setExpandedState((prev) => ({ ...prev, given: !prev.given })), children: [_jsx(GivenVaccineGroup, { week: "Birth", vaccines: ["IPV B-1"] }), _jsx("div", { className: layout.divider }), _jsx(GivenVaccineGroup, { week: "6 Weeks", vaccines: ["DTP B1", "Hib B1"] }), _jsx("div", { className: layout.divider }), _jsx(GivenVaccineGroup, { week: "10 Weeks", vaccines: ["HEP A-2", "PPSV 23", "PPSV 23 (2)"] }), _jsx("div", { className: layout.divider }), _jsx(GivenVaccineGroup, { week: "2-3 years", vaccines: ["PPSV 23"] })] })] })] }));
}
