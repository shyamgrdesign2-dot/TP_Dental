import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Growth content panel — date-based expandable cards.
 */
import React, { useState } from "react";
import clsx from "clsx";
import { ArrowSquareDown, ArrowSquareUp } from "iconsax-reactjs";
import { useStickyHeaderState } from "../detail-shared";
import { tpSectionCardStyle } from "../tokens";
import layout from "./sidebarContentLayout.module.scss";
const GROWTH_ENTRIES = [
    {
        id: "g-27",
        dateLabel: "27 Jan'26",
        rows: [
            { label: "Age", unit: "years", value: "3" },
            { label: "Height", unit: "cm", value: "130" },
            { label: "Weight", unit: "kg", value: "12.8" },
            { label: "BMI", unit: "kg/m²", value: "24.2" },
            { label: "OFC", unit: "cm", value: "49" },
        ],
    },
    {
        id: "g-26",
        dateLabel: "26 Jan'26",
        rows: [
            { label: "Age", unit: "years", value: "3" },
            { label: "Height", unit: "cm", value: "129.8" },
            { label: "Weight", unit: "kg", value: "12.6" },
            { label: "BMI", unit: "kg/m²", value: "24.0" },
            { label: "OFC", unit: "cm", value: "49" },
        ],
    },
    {
        id: "g-24",
        dateLabel: "24 Jan'26",
        rows: [
            { label: "Age", unit: "years", value: "3" },
            { label: "Height", unit: "cm", value: "129.5" },
            { label: "Weight", unit: "kg", value: "12.5" },
            { label: "BMI", unit: "kg/m²", value: "23.8" },
            { label: "OFC", unit: "cm", value: "48.8" },
        ],
    },
    {
        id: "g-22",
        dateLabel: "22 Jan'26",
        rows: [
            { label: "Age", unit: "years", value: "3" },
            { label: "Height", unit: "cm", value: "129.3" },
            { label: "Weight", unit: "kg", value: "12.4" },
            { label: "BMI", unit: "kg/m²", value: "23.7" },
            { label: "OFC", unit: "cm", value: "48.8" },
        ],
    },
    {
        id: "g-20",
        dateLabel: "20 Jan'26",
        rows: [
            { label: "Age", unit: "years", value: "3" },
            { label: "Height", unit: "cm", value: "129.1" },
            { label: "Weight", unit: "kg", value: "12.3" },
            { label: "BMI", unit: "kg/m²", value: "23.6" },
            { label: "OFC", unit: "cm", value: "48.7" },
        ],
    },
];
function SeeChartButton() {
    return (_jsx("div", { className: layout.seeChartBar, children: _jsxs("div", { className: layout.seeChartHit, children: [_jsx("div", { "aria-hidden": "true", className: layout.seeChartOutline }), _jsx("div", { className: layout.seeChartCenter, children: _jsxs("div", { className: layout.seeChartInner, children: [_jsx("p", { className: layout.seeChartLabel, children: "See Chart" }), _jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", className: layout.seeChartChevron, children: _jsx("path", { d: "M6 4l4 4-4 4", stroke: "var(--tp-blue-500)", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })] }) })] }) }));
}
function GrowthDateCard({ entry, expanded, onToggle, }) {
    const { headerRef, isStuck } = useStickyHeaderState();
    return (_jsxs("div", { className: layout.accCard, style: tpSectionCardStyle, children: [_jsx("button", { ref: headerRef, type: "button", onClick: onToggle, className: clsx(layout.accHeader, expanded
                    ? isStuck
                        ? layout.accHeaderStuck
                        : layout.accHeaderRoundedOpen
                    : layout.accHeaderCollapsed), children: _jsxs("div", { className: layout.accHeaderInner, children: [_jsx("p", { className: layout.accTitle, children: entry.dateLabel }), _jsx("div", { className: layout.accChevron, children: expanded ? (_jsx(ArrowSquareUp, { color: "var(--tp-slate-500)", size: 18, strokeWidth: 1.5, variant: "Linear" })) : (_jsx(ArrowSquareDown, { color: "var(--tp-slate-500)", size: 18, strokeWidth: 1.5, variant: "Linear" })) })] }) }), expanded ? (_jsx("div", { className: layout.accBody, children: entry.rows.map((row) => (_jsxs("div", { className: layout.growthRow, children: [_jsxs("span", { className: layout.growthLabel, children: [row.label, " ", _jsxs("span", { className: layout.growthUnit, children: ["(", row.unit, ")"] })] }), _jsx("span", { className: layout.growthValue, children: row.value })] }, `${entry.id}-${row.label}`))) })) : null] }));
}
export function GrowthContent() {
    const [expandedState, setExpandedState] = useState(() => Object.fromEntries(GROWTH_ENTRIES.map((entry, index) => [entry.id, index === 0])));
    return (_jsxs("div", { className: layout.pageRoot, children: [_jsx(SeeChartButton, {}), _jsx("div", { className: layout.scrollFlex, "data-sticky-scroll-root": "true", children: _jsx("div", { className: clsx(layout.innerStack, layout.innerStackCenter), children: GROWTH_ENTRIES.map((entry) => (_jsx(GrowthDateCard, { entry: entry, expanded: Boolean(expandedState[entry.id]), onToggle: () => {
                            setExpandedState((prev) => ({
                                ...prev,
                                [entry.id]: !prev[entry.id],
                            }));
                        } }, entry.id))) }) })] }));
}
