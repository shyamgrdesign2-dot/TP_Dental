import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Lab Results content panel — date-based expandable cards.
 */
import React, { useState } from "react";
import clsx from "clsx";
import { ArrowSquareDown, ArrowSquareUp } from "iconsax-reactjs";
import { ActionButton, useStickyHeaderState } from "../detail-shared";
import { tpSectionCardStyle } from "../tokens";
import { LAB_PRIMARY_DATE_LABEL, LAB_PRIMARY_ROWS } from "./today-data";
import layout from "./sidebarContentLayout.module.scss";
const BASE_ROWS = LAB_PRIMARY_ROWS;
const LAB_ENTRIES = [
    { id: "l-27", dateLabel: LAB_PRIMARY_DATE_LABEL, rows: BASE_ROWS },
    {
        id: "l-26",
        dateLabel: "26 Jan'26",
        rows: BASE_ROWS.map((row, index) => index % 4 === 0
            ? { ...row, value: (Number.parseFloat(row.value) * 0.98).toFixed(1) }
            : row),
    },
    {
        id: "l-24",
        dateLabel: "24 Jan'26",
        rows: BASE_ROWS.map((row, index) => index % 5 === 0
            ? { ...row, value: (Number.parseFloat(row.value) * 1.02).toFixed(1) }
            : row),
    },
    {
        id: "l-22",
        dateLabel: "22 Jan'26",
        rows: BASE_ROWS.map((row, index) => index % 3 === 0
            ? { ...row, value: (Number.parseFloat(row.value) * 1.01).toFixed(1) }
            : row),
    },
    {
        id: "l-20",
        dateLabel: "20 Jan'26",
        rows: BASE_ROWS.map((row, index) => index % 6 === 0
            ? { ...row, value: (Number.parseFloat(row.value) * 0.97).toFixed(1) }
            : row),
    },
];
function LabRow({ label, unit, value, abnormal = false, }) {
    return (_jsx("div", { className: layout.labRow, children: _jsxs("div", { className: layout.labRowInner, children: [_jsxs("div", { className: layout.labLeft, children: [_jsx("span", { className: layout.labLabel, children: label }), _jsx("span", { className: layout.labUnit, children: unit })] }), _jsx("span", { className: clsx(layout.labValue, abnormal && layout.labValueAbnormal), children: value })] }) }));
}
function LabDateCard({ entry, expanded, onToggle, }) {
    const { headerRef, isStuck } = useStickyHeaderState();
    return (_jsxs("div", { className: layout.accCard, style: tpSectionCardStyle, children: [_jsx("button", { ref: headerRef, type: "button", onClick: onToggle, className: clsx(layout.accHeader, expanded
                    ? isStuck
                        ? layout.accHeaderStuck
                        : layout.accHeaderRoundedOpen
                    : layout.accHeaderCollapsed), children: _jsxs("div", { className: layout.accHeaderInner, children: [_jsx("p", { className: layout.accTitle, children: entry.dateLabel }), _jsx("div", { className: layout.accChevron, children: expanded ? (_jsx(ArrowSquareUp, { color: "var(--tp-slate-500)", size: 18, strokeWidth: 1.5, variant: "Linear" })) : (_jsx(ArrowSquareDown, { color: "var(--tp-slate-500)", size: 18, strokeWidth: 1.5, variant: "Linear" })) })] }) }), expanded ? (_jsx("div", { className: layout.accBody, children: entry.rows.map((row) => (_jsx(LabRow, { ...row }, `${entry.id}-${row.label}`))) })) : null] }));
}
export function LabResultsContent() {
    const [expandedState, setExpandedState] = useState(() => Object.fromEntries(LAB_ENTRIES.map((entry, index) => [entry.id, index === 0])));
    return (_jsxs("div", { className: layout.pageRoot, children: [_jsx(ActionButton, { label: "Add/Edit Details", icon: "plus" }), _jsx("div", { className: layout.scrollFlex, "data-sticky-scroll-root": "true", children: _jsx("div", { className: layout.innerStack, children: LAB_ENTRIES.map((entry) => (_jsx(LabDateCard, { entry: entry, expanded: Boolean(expandedState[entry.id]), onToggle: () => {
                            setExpandedState((prev) => ({
                                ...prev,
                                [entry.id]: !prev[entry.id],
                            }));
                        } }, entry.id))) }) })] }));
}
