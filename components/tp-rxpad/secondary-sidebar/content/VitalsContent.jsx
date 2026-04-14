import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Vitals content panel with per-date accordion.
 * Each date can expand/collapse and provides mock values.
 */
import React, { useState } from "react";
import clsx from "clsx";
import { ArrowSquareDown, ArrowSquareUp } from "iconsax-reactjs";
import { ActionButton, useStickyHeaderState } from "../detail-shared";
import { tpSectionCardStyle } from "../tokens";
import { VITALS_PRIMARY_DATE_LABEL, VITALS_PRIMARY_ROWS } from "./today-data";
import layout from "./sidebarContentLayout.module.scss";
const VITALS_BY_DATE = [
    {
        id: "today-27",
        dateLabel: VITALS_PRIMARY_DATE_LABEL,
        rows: VITALS_PRIMARY_ROWS,
    },
    {
        id: "d-26",
        dateLabel: "26 Jan'26",
        rows: [
            { label: "Temperature", unit: "Frh", value: "99.2" },
            { label: "Pulse", unit: "/min", value: "84" },
            { label: "Resp. Rate", unit: "/min", value: "20" },
            { label: "Systolic", unit: "mmhg", value: "124" },
            { label: "Diastolic", unit: "mmhg", value: "78" },
            { label: "SpO2", unit: "%", value: "97" },
            { label: "Weight", unit: "kgs", value: "68.4" },
            { label: "BMI", unit: "kg/m²", value: "23.1" },
        ],
    },
    {
        id: "d-24",
        dateLabel: "24 Jan'26",
        rows: [
            { label: "Temperature", unit: "Frh", value: "98.6" },
            { label: "Pulse", unit: "/min", value: "79" },
            { label: "Resp. Rate", unit: "/min", value: "18" },
            { label: "Systolic", unit: "mmhg", value: "118" },
            { label: "Diastolic", unit: "mmhg", value: "74" },
            { label: "SpO2", unit: "%", value: "99" },
            { label: "Weight", unit: "kgs", value: "68.0" },
            { label: "BMI", unit: "kg/m²", value: "22.9" },
        ],
    },
    {
        id: "d-22",
        dateLabel: "22 Jan'26",
        rows: [
            { label: "Temperature", unit: "Frh", value: "98.4" },
            { label: "Pulse", unit: "/min", value: "76" },
            { label: "Resp. Rate", unit: "/min", value: "17" },
            { label: "Systolic", unit: "mmhg", value: "116" },
            { label: "Diastolic", unit: "mmhg", value: "72" },
            { label: "SpO2", unit: "%", value: "99" },
            { label: "Weight", unit: "kgs", value: "67.8" },
            { label: "BMI", unit: "kg/m²", value: "22.8" },
        ],
    },
    {
        id: "d-20",
        dateLabel: "20 Jan'26",
        rows: [
            { label: "Temperature", unit: "Frh", value: "98.5" },
            { label: "Pulse", unit: "/min", value: "80" },
            { label: "Resp. Rate", unit: "/min", value: "18" },
            { label: "Systolic", unit: "mmhg", value: "119" },
            { label: "Diastolic", unit: "mmhg", value: "75" },
            { label: "SpO2", unit: "%", value: "98" },
            { label: "Weight", unit: "kgs", value: "68.2" },
            { label: "BMI", unit: "kg/m²", value: "23.0" },
        ],
    },
];
function VitalsDateCard({ block, expanded, onToggle, }) {
    const { headerRef, isStuck } = useStickyHeaderState();
    return (_jsxs("div", { className: layout.accCard, style: tpSectionCardStyle, children: [_jsx("button", { type: "button", ref: headerRef, onClick: onToggle, className: clsx(layout.accHeader, expanded
                    ? isStuck
                        ? layout.accHeaderStuck
                        : layout.accHeaderRoundedOpen
                    : layout.accHeaderCollapsed), children: _jsxs("div", { className: layout.accHeaderInner, children: [_jsx("p", { className: layout.accTitle, children: block.dateLabel }), _jsx("div", { className: layout.accChevron, children: expanded ? (_jsx(ArrowSquareUp, { color: "var(--tp-slate-500)", size: 18, strokeWidth: 1.5, variant: "Linear" })) : (_jsx(ArrowSquareDown, { color: "var(--tp-slate-500)", size: 18, strokeWidth: 1.5, variant: "Linear" })) })] }) }), expanded
                ? block.rows.map((row) => (_jsxs("div", { className: layout.vitalsRow, children: [_jsxs("span", { className: layout.vitalsLabel, children: [row.label, " ", _jsxs("span", { className: layout.vitalsUnit, children: ["(", row.unit, ")"] })] }), _jsx("span", { className: layout.vitalsValue, children: row.value })] }, `${block.id}-${row.label}`)))
                : null] }));
}
export function VitalsContent() {
    const [expandedByDate, setExpandedByDate] = useState({
        "today-27": true,
        "d-26": false,
        "d-24": false,
        "d-22": false,
        "d-20": false,
    });
    return (_jsxs("div", { className: layout.pageRoot, children: [_jsx(ActionButton, { label: "Add/Edit Details", icon: "plus" }), _jsx("div", { className: layout.scrollFlex, "data-sticky-scroll-root": "true", children: _jsx("div", { className: layout.innerStack, children: VITALS_BY_DATE.map((block) => (_jsx(VitalsDateCard, { block: block, expanded: Boolean(expandedByDate[block.id]), onToggle: () => setExpandedByDate((prev) => ({
                            ...prev,
                            [block.id]: !prev[block.id],
                        })) }, block.id))) }) })] }));
}
