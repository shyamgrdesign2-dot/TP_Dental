(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabPanelCard",
    ()=>LabPanelCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$FlagArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/FlagArrow.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function LabPanelCard({ data, onPillTap, onSidebarNav }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
            lineNumber: 19,
            columnNumber: 13
        }, void 0),
        tpIconName: "Lab",
        title: "Lab Results",
        date: data.panelDate,
        badge: data.flagged.length > 0 ? {
            label: `${data.flagged.length} flagged`,
            color: "#DC2626",
            bg: "#FEE2E2"
        } : undefined,
        dataSources: [
            "EMR Records",
            "Lab Reports"
        ],
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: data.hiddenNormalCount > 0 ? `View full lab report (+${data.hiddenNormalCount} normal)` : "View full lab report",
            onClick: ()=>onSidebarNav?.("labResults")
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
            lineNumber: 35,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-hidden rounded-[8px] border border-tp-slate-100",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 gap-[1px] bg-tp-slate-100 px-[8px] py-[4px] text-[12px] font-medium text-tp-slate-500 tracking-wider",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Parameter"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Value"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Ref Range"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                data.flagged.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid grid-cols-3 gap-[1px] px-[8px] py-[6px] text-[14px]", i % 2 === 0 ? "bg-white" : "bg-tp-slate-50"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-tp-slate-700 truncate",
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-[3px] font-medium text-tp-error-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$FlagArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlagArrow"], {
                                        flag: item.flag
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this),
                                    item.value,
                                    item.unit ? ` ${item.unit}` : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-tp-slate-400",
                                children: item.refRange ?? '—'
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this)
                        ]
                    }, item.name, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
                        lineNumber: 54,
                        columnNumber: 13
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = LabPanelCard;
var _c;
__turbopack_context__.k.register(_c, "LabPanelCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VitalTrendsBarCard",
    ()=>VitalTrendsBarCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ChartTypeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ChartTypeToggle.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const SERIES_COLORS = [
    "#14B8A6",
    "#8B5CF6",
    "#EF4444",
    "#F59E0B",
    "#4B4AD5"
];
function getTrendSummary(series) {
    if (series.values.length < 2) return "";
    const first = series.values[0];
    const last = series.values[series.values.length - 1];
    const diff = last - first;
    const pct = Math.abs(diff / (first || 1)) * 100;
    if (pct < 2) return "\u25B6 Stable";
    return diff > 0 ? "\u25B2 Increasing" : "\u25BC Declining";
}
/* ── Convert VitalTrendSeries[] → Recharts row data ── */ function toRechartsData(allSeries) {
    const longest = allSeries.reduce((a, b)=>a.dates.length >= b.dates.length ? a : b);
    return longest.dates.map((date, i)=>{
        const row = {
            date
        };
        allSeries.forEach((s)=>{
            row[s.label] = i < s.values.length ? s.values[i] : 0;
        });
        return row;
    });
}
/* ── Legend row — below the chart, identical for both modes ── */ function SeriesLegend({ series }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-x-4 gap-y-1 mt-[6px]",
        children: series.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[8px] w-[8px] rounded-full",
                        style: {
                            backgroundColor: SERIES_COLORS[i % SERIES_COLORS.length]
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[14px] font-medium text-tp-slate-700",
                        children: s.label
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this)
                ]
            }, s.label, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c = SeriesLegend;
/* ── Recharts Bar Chart ── */ function RechartsBarChart({ allSeries, data, chartHeight, minWidth }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto -mx-1 px-1",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minWidth,
                height: chartHeight
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                    data: data,
                    margin: {
                        top: 16,
                        right: 8,
                        bottom: 4,
                        left: -8
                    },
                    barGap: 2,
                    barCategoryGap: "20%",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            vertical: false,
                            stroke: "var(--tp-slate-100, #F1F5F9)"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "date",
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: {
                                stroke: "#E2E8F0"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: false,
                            tickCount: 5,
                            width: 36
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                fontSize: 11,
                                borderRadius: 8,
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                            },
                            labelStyle: {
                                fontWeight: 600,
                                marginBottom: 2
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        allSeries.map((s, si)=>s.threshold != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                y: s.threshold,
                                stroke: SERIES_COLORS[si % SERIES_COLORS.length],
                                strokeDasharray: "4 2",
                                strokeOpacity: 0.5,
                                label: {
                                    value: s.thresholdLabel ?? "",
                                    position: "right",
                                    fontSize: 10,
                                    fill: SERIES_COLORS[si % SERIES_COLORS.length]
                                }
                            }, `thresh-${si}`, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                                lineNumber: 73,
                                columnNumber: 17
                            }, this) : null),
                        allSeries.map((s, si)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: s.label,
                                fill: SERIES_COLORS[si % SERIES_COLORS.length],
                                radius: [
                                    3,
                                    3,
                                    0,
                                    0
                                ],
                                maxBarSize: 24,
                                label: {
                                    position: "top",
                                    fontSize: 9,
                                    fill: SERIES_COLORS[si % SERIES_COLORS.length],
                                    fontWeight: 600
                                }
                            }, s.label, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c1 = RechartsBarChart;
/* ── Recharts Line Chart ── */ function RechartsLineChart({ allSeries, data, chartHeight, minWidth }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto -mx-1 px-1",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minWidth,
                height: chartHeight
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                    data: data,
                    margin: {
                        top: 16,
                        right: 8,
                        bottom: 4,
                        left: -8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            vertical: false,
                            stroke: "var(--tp-slate-100, #F1F5F9)"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "date",
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: {
                                stroke: "#E2E8F0"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: false,
                            tickCount: 5,
                            width: 36
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                fontSize: 11,
                                borderRadius: 8,
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                            },
                            labelStyle: {
                                fontWeight: 600,
                                marginBottom: 2
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this),
                        allSeries.map((s, si)=>s.threshold != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                y: s.threshold,
                                stroke: SERIES_COLORS[si % SERIES_COLORS.length],
                                strokeDasharray: "4 2",
                                strokeOpacity: 0.5
                            }, `thresh-${si}`, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                                lineNumber: 104,
                                columnNumber: 17
                            }, this) : null),
                        allSeries.map((s, si)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: s.label,
                                stroke: SERIES_COLORS[si % SERIES_COLORS.length],
                                strokeWidth: 2,
                                dot: {
                                    r: 3,
                                    fill: "white",
                                    strokeWidth: 1.5
                                },
                                activeDot: {
                                    r: 5
                                },
                                label: {
                                    position: "top",
                                    fontSize: 9,
                                    fill: SERIES_COLORS[si % SERIES_COLORS.length],
                                    fontWeight: 600
                                }
                            }, s.label, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                    lineNumber: 94,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                lineNumber: 93,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_c2 = RechartsLineChart;
/* ── Table View ── */ function VitalTrendsTable({ series }) {
    if (series.length === 0) return null;
    const longest = series.reduce((a, b)=>a.dates.length >= b.dates.length ? a : b);
    const toneColor = (tone, value, threshold)=>{
        if (tone === "critical") return "text-tp-error-600 font-semibold";
        if (tone === "warn") return "text-tp-warning-600 font-semibold";
        if (threshold != null && value < threshold) return "text-tp-error-600 font-semibold";
        return "text-tp-slate-700";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[8px] border border-tp-slate-100 overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full text-[14px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "bg-tp-slate-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "text-left px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                children: "Date"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this),
                            series.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "text-right px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                    children: [
                                        s.label,
                                        " (",
                                        s.unit,
                                        ")"
                                    ]
                                }, s.label, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: longest.dates.map((date, di)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: di % 2 === 1 ? "bg-tp-slate-50/50" : "",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "text-left px-[8px] py-[6px] text-tp-slate-500",
                                    children: date
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this),
                                series.map((s)=>{
                                    const val = di < s.values.length ? s.values[di] : null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: `text-right px-[8px] py-[6px] ${val != null ? toneColor(s.tone, val, s.threshold) : "text-tp-slate-300"}`,
                                        children: val != null ? val : "\u2014"
                                    }, s.label, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                                        lineNumber: 147,
                                        columnNumber: 19
                                    }, this);
                                })
                            ]
                        }, date, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_c3 = VitalTrendsTable;
function VitalTrendsBarCard({ data, onPillTap }) {
    _s();
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("graph");
    const [chartType, setChartType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("bar");
    const totalVisits = data.series.length > 0 ? data.series[0].values.length : 0;
    const isMultiSeries = data.series.length > 1;
    const rechartsData = toRechartsData(data.series);
    const pointCount = rechartsData.length;
    const chartHeight = isMultiSeries ? 180 : 160;
    const minWidth = Math.max(300, pointCount * 60);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
            lineNumber: 173,
            columnNumber: 13
        }, void 0),
        tpIconName: "Heart Rate",
        title: data.title,
        date: `${totalVisits} visits`,
        dataSources: [
            "EMR Records",
            "Vitals History"
        ],
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: "View full vitals history"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
            lineNumber: 178,
            columnNumber: 20
        }, void 0),
        children: data.series.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-[6px] flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewToggle"], {
                            viewMode: viewMode,
                            onChange: setViewMode
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this),
                        viewMode === "graph" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ChartTypeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartTypeToggle"], {
                            chartType: chartType,
                            onChange: setChartType
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 185,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, this),
                viewMode === "graph" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        chartType === "bar" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RechartsBarChart, {
                            allSeries: data.series,
                            data: rechartsData,
                            chartHeight: chartHeight,
                            minWidth: minWidth
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 192,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RechartsLineChart, {
                            allSeries: data.series,
                            data: rechartsData,
                            chartHeight: chartHeight,
                            minWidth: minWidth
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 194,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SeriesLegend, {
                            series: data.series
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                            lineNumber: 196,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VitalTrendsTable, {
                    series: data.series
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
                    lineNumber: 199,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-4 text-center text-[14px] text-tp-slate-400",
            children: "No vitals data available for charting."
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
            lineNumber: 203,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
_s(VitalTrendsBarCard, "WZwt99XIZDggtIG3PviyYrclvI0=");
_c4 = VitalTrendsBarCard;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "SeriesLegend");
__turbopack_context__.k.register(_c1, "RechartsBarChart");
__turbopack_context__.k.register(_c2, "RechartsLineChart");
__turbopack_context__.k.register(_c3, "VitalTrendsTable");
__turbopack_context__.k.register(_c4, "VitalTrendsBarCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VitalTrendsLineCard",
    ()=>VitalTrendsLineCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ChartTypeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ChartTypeToggle.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const SERIES_COLORS = [
    "#14B8A6",
    "#8B5CF6",
    "#EF4444",
    "#F59E0B",
    "#4B4AD5"
];
function getTrendSummary(series) {
    if (series.values.length < 2) return "";
    const first = series.values[0];
    const last = series.values[series.values.length - 1];
    const diff = last - first;
    const pct = Math.abs(diff / (first || 1)) * 100;
    if (pct < 2) return "\u25B6 Stable";
    return diff > 0 ? "\u25B2 Increasing" : "\u25BC Declining";
}
function toRechartsData(allSeries) {
    const longest = allSeries.reduce((a, b)=>a.dates.length >= b.dates.length ? a : b);
    return longest.dates.map((date, i)=>{
        const row = {
            date
        };
        allSeries.forEach((s)=>{
            row[s.label] = i < s.values.length ? s.values[i] : 0;
        });
        return row;
    });
}
function SeriesLegend({ series }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-x-4 gap-y-1 mt-[6px]",
        children: series.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[8px] w-[8px] rounded-full",
                        style: {
                            backgroundColor: SERIES_COLORS[i % SERIES_COLORS.length]
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[14px] font-medium text-tp-slate-700",
                        children: s.label
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                ]
            }, s.label, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = SeriesLegend;
function RechartsBarChart({ allSeries, data, chartHeight, minWidth }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto -mx-1 px-1",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minWidth,
                height: chartHeight
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                    data: data,
                    margin: {
                        top: 16,
                        right: 8,
                        bottom: 4,
                        left: -8
                    },
                    barGap: 2,
                    barCategoryGap: "20%",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            vertical: false,
                            stroke: "var(--tp-slate-100, #F1F5F9)"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "date",
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: {
                                stroke: "#E2E8F0"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: false,
                            tickCount: 5,
                            width: 36
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                fontSize: 11,
                                borderRadius: 8,
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                            },
                            labelStyle: {
                                fontWeight: 600,
                                marginBottom: 2
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this),
                        allSeries.map((s, si)=>s.threshold != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                y: s.threshold,
                                stroke: SERIES_COLORS[si % SERIES_COLORS.length],
                                strokeDasharray: "4 2",
                                strokeOpacity: 0.5
                            }, `t-${si}`, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this) : null),
                        allSeries.map((s, si)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: s.label,
                                fill: SERIES_COLORS[si % SERIES_COLORS.length],
                                radius: [
                                    3,
                                    3,
                                    0,
                                    0
                                ],
                                maxBarSize: 24,
                                label: {
                                    position: "top",
                                    fontSize: 9,
                                    fill: SERIES_COLORS[si % SERIES_COLORS.length],
                                    fontWeight: 600
                                }
                            }, s.label, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c1 = RechartsBarChart;
function RechartsLineChart({ allSeries, data, chartHeight, minWidth }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto -mx-1 px-1",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minWidth,
                height: chartHeight
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                    data: data,
                    margin: {
                        top: 16,
                        right: 8,
                        bottom: 4,
                        left: -8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            vertical: false,
                            stroke: "var(--tp-slate-100, #F1F5F9)"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "date",
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: {
                                stroke: "#E2E8F0"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: false,
                            tickCount: 5,
                            width: 36
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                fontSize: 11,
                                borderRadius: 8,
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                            },
                            labelStyle: {
                                fontWeight: 600,
                                marginBottom: 2
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this),
                        allSeries.map((s, si)=>s.threshold != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                y: s.threshold,
                                stroke: SERIES_COLORS[si % SERIES_COLORS.length],
                                strokeDasharray: "4 2",
                                strokeOpacity: 0.5
                            }, `t-${si}`, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this) : null),
                        allSeries.map((s, si)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: s.label,
                                stroke: SERIES_COLORS[si % SERIES_COLORS.length],
                                strokeWidth: 2,
                                dot: {
                                    r: 3,
                                    fill: "white",
                                    strokeWidth: 1.5
                                },
                                activeDot: {
                                    r: 5
                                },
                                label: {
                                    position: "top",
                                    fontSize: 9,
                                    fill: SERIES_COLORS[si % SERIES_COLORS.length],
                                    fontWeight: 600
                                }
                            }, s.label, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                                lineNumber: 94,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
            lineNumber: 83,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_c2 = RechartsLineChart;
function VitalTrendsTable({ series }) {
    if (series.length === 0) return null;
    const longest = series.reduce((a, b)=>a.dates.length >= b.dates.length ? a : b);
    const toneColor = (tone, value, threshold)=>{
        if (tone === "critical") return "text-tp-error-600 font-semibold";
        if (tone === "warn") return "text-tp-warning-600 font-semibold";
        if (threshold != null && value < threshold) return "text-tp-error-600 font-semibold";
        return "text-tp-slate-700";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[8px] border border-tp-slate-100 overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full text-[14px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "bg-tp-slate-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "text-left px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                children: "Date"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this),
                            series.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "text-right px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                    children: [
                                        s.label,
                                        " (",
                                        s.unit,
                                        ")"
                                    ]
                                }, s.label, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: longest.dates.map((date, di)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: di % 2 === 1 ? "bg-tp-slate-50/50" : "",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "text-left px-[8px] py-[6px] text-tp-slate-500",
                                    children: date
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this),
                                series.map((s)=>{
                                    const val = di < s.values.length ? s.values[di] : null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: `text-right px-[8px] py-[6px] ${val != null ? toneColor(s.tone, val, s.threshold) : "text-tp-slate-300"}`,
                                        children: val != null ? val : "\u2014"
                                    }, s.label, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                                        lineNumber: 131,
                                        columnNumber: 19
                                    }, this);
                                })
                            ]
                        }, date, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_c3 = VitalTrendsTable;
function VitalTrendsLineCard({ data, onPillTap }) {
    _s();
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("graph");
    const [chartType, setChartType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("line");
    const totalVisits = data.series.length > 0 ? data.series[0].values.length : 0;
    const isMultiSeries = data.series.length > 1;
    const rechartsData = toRechartsData(data.series);
    const pointCount = rechartsData.length;
    const chartHeight = isMultiSeries ? 180 : 160;
    const minWidth = Math.max(300, pointCount * 60);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
            lineNumber: 157,
            columnNumber: 13
        }, void 0),
        tpIconName: "Heart Rate",
        title: data.title,
        date: `${totalVisits} visits`,
        dataSources: [
            "EMR Records",
            "Vitals History"
        ],
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: "View full vitals history"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
            lineNumber: 162,
            columnNumber: 20
        }, void 0),
        children: data.series.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-[6px] flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewToggle"], {
                            viewMode: viewMode,
                            onChange: setViewMode
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 167,
                            columnNumber: 13
                        }, this),
                        viewMode === "graph" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ChartTypeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartTypeToggle"], {
                            chartType: chartType,
                            onChange: setChartType
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 168,
                            columnNumber: 38
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                    lineNumber: 166,
                    columnNumber: 11
                }, this),
                viewMode === "graph" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        chartType === "line" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RechartsLineChart, {
                            allSeries: data.series,
                            data: rechartsData,
                            chartHeight: chartHeight,
                            minWidth: minWidth
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 173,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RechartsBarChart, {
                            allSeries: data.series,
                            data: rechartsData,
                            chartHeight: chartHeight,
                            minWidth: minWidth
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 175,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SeriesLegend, {
                            series: data.series
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                            lineNumber: 177,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VitalTrendsTable, {
                    series: data.series
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
                    lineNumber: 180,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-4 text-center text-[14px] text-tp-slate-400",
            children: "No vitals data available for charting."
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
            lineNumber: 184,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
_s(VitalTrendsLineCard, "ZWFLh8xGJT2uN+aUa4ZwWmBZiFw=");
_c4 = VitalTrendsLineCard;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "SeriesLegend");
__turbopack_context__.k.register(_c1, "RechartsBarChart");
__turbopack_context__.k.register(_c2, "RechartsLineChart");
__turbopack_context__.k.register(_c3, "VitalTrendsTable");
__turbopack_context__.k.register(_c4, "VitalTrendsLineCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabComparisonCard",
    ()=>LabComparisonCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$DirectionArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/DirectionArrow.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function LabComparisonCard({ data }) {
    // Derive dates from first row for column headers
    const prevDate = data.rows.length > 0 ? data.rows[0].prevDate : "Prev";
    const currDate = data.rows.length > 0 ? data.rows[0].currDate : "Curr";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
            lineNumber: 26,
            columnNumber: 13
        }, void 0),
        tpIconName: "Lab",
        title: "Lab Comparison",
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: "View full lab history"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
            lineNumber: 29,
            columnNumber: 20
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-hidden rounded-[8px] border border-tp-slate-100",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-4 gap-[1px] bg-tp-slate-100 px-[8px] py-[4px] text-[12px] font-medium text-tp-slate-500 tracking-wider",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Parameter"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: prevDate
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: currDate
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Change"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                data.rows.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid grid-cols-4 gap-[1px] px-[8px] py-[7px] text-[14px]", i % 2 === 0 ? "bg-white" : "bg-tp-slate-50"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-tp-slate-700 truncate",
                                children: row.parameter
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-tp-slate-500",
                                children: row.prevValue
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(row.isFlagged ? "font-medium text-tp-error-600" : "text-tp-slate-700"),
                                children: row.currValue
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-[3px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$DirectionArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionArrow"], {
                                        direction: row.direction
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[14px] font-medium", row.direction === "up" && "text-tp-error-500", row.direction === "down" && "text-tp-success-600", row.direction === "stable" && "text-tp-slate-400"),
                                        children: row.delta
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        ]
                    }, row.parameter, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = LabComparisonCard;
var _c;
__turbopack_context__.k.register(_c, "LabComparisonCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabTrendsCard",
    ()=>LabTrendsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ChartTypeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ChartTypeToggle.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function seriesColor(tone) {
    if (tone === "critical") return "#EF4444";
    if (tone === "warn") return "#F59E0B";
    return "#22C55E";
}
function getTrendSummary(series) {
    if (series.values.length < 2) return "";
    const first = series.values[0];
    const last = series.values[series.values.length - 1];
    const diff = last - first;
    const pct = Math.abs(diff / (first || 1)) * 100;
    if (pct < 2) return "\u25B6 Stable";
    return diff > 0 ? "\u25B2 Increasing" : "\u25BC Declining";
}
function toRechartsData(allSeries) {
    const longest = allSeries.reduce((a, b)=>a.dates.length >= b.dates.length ? a : b);
    return longest.dates.map((date, i)=>{
        const row = {
            date
        };
        allSeries.forEach((s)=>{
            row[s.label] = i < s.values.length ? s.values[i] : 0;
        });
        return row;
    });
}
function SeriesLegend({ series }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-x-4 gap-y-1 mt-[6px]",
        children: series.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[8px] w-[8px] rounded-full",
                        style: {
                            backgroundColor: seriesColor(s.tone)
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[14px] font-medium text-tp-slate-700",
                        children: s.label
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this)
                ]
            }, s.label, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c = SeriesLegend;
/* ── Bar chart with per-point coloring (above threshold = red) ── */ function LabRechartsBarChart({ allSeries, data, chartHeight, minWidth }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto -mx-1 px-1",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minWidth,
                height: chartHeight
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                    data: data,
                    margin: {
                        top: 16,
                        right: 8,
                        bottom: 4,
                        left: -8
                    },
                    barGap: 2,
                    barCategoryGap: "20%",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            vertical: false,
                            stroke: "var(--tp-slate-100, #F1F5F9)"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "date",
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: {
                                stroke: "#E2E8F0"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: false,
                            tickCount: 5,
                            width: 36
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                fontSize: 11,
                                borderRadius: 8,
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                            },
                            labelStyle: {
                                fontWeight: 600,
                                marginBottom: 2
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this),
                        allSeries.map((s)=>s.threshold != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                y: s.threshold,
                                stroke: "#EF4444",
                                strokeDasharray: "4 2",
                                strokeOpacity: 0.6,
                                label: {
                                    value: s.thresholdLabel ?? "",
                                    position: "right",
                                    fontSize: 9,
                                    fill: "#EF4444"
                                }
                            }, `t-${s.label}`, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                                lineNumber: 72,
                                columnNumber: 17
                            }, this) : null),
                        allSeries.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: s.label,
                                radius: [
                                    3,
                                    3,
                                    0,
                                    0
                                ],
                                maxBarSize: 24,
                                label: {
                                    position: "top",
                                    fontSize: 9,
                                    fontWeight: 600
                                },
                                children: data.map((entry, idx)=>{
                                    const val = Number(entry[s.label] ?? 0);
                                    const color = s.threshold != null && val > s.threshold ? "#EF4444" : seriesColor(s.tone);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                        fill: color
                                    }, idx, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                                        lineNumber: 80,
                                        columnNumber: 26
                                    }, this);
                                })
                            }, s.label, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_c1 = LabRechartsBarChart;
/* ── Line chart with per-point coloring ── */ function LabRechartsLineChart({ allSeries, data, chartHeight, minWidth }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto -mx-1 px-1",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minWidth,
                height: chartHeight
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                    data: data,
                    margin: {
                        top: 16,
                        right: 8,
                        bottom: 4,
                        left: -8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            vertical: false,
                            stroke: "var(--tp-slate-100, #F1F5F9)"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "date",
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: {
                                stroke: "#E2E8F0"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            tick: {
                                fontSize: 10,
                                fill: "#94A3B8"
                            },
                            tickLine: false,
                            axisLine: false,
                            tickCount: 5,
                            width: 36
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                fontSize: 11,
                                borderRadius: 8,
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                            },
                            labelStyle: {
                                fontWeight: 600,
                                marginBottom: 2
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this),
                        allSeries.map((s)=>s.threshold != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                y: s.threshold,
                                stroke: "#EF4444",
                                strokeDasharray: "4 2",
                                strokeOpacity: 0.6,
                                label: {
                                    value: s.thresholdLabel ?? "",
                                    position: "right",
                                    fontSize: 9,
                                    fill: "#EF4444"
                                }
                            }, `t-${s.label}`, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                                lineNumber: 106,
                                columnNumber: 17
                            }, this) : null),
                        allSeries.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: s.label,
                                stroke: seriesColor(s.tone),
                                strokeWidth: 2,
                                dot: {
                                    r: 3,
                                    fill: "white",
                                    strokeWidth: 1.5
                                },
                                activeDot: {
                                    r: 5
                                },
                                label: {
                                    position: "top",
                                    fontSize: 9,
                                    fill: seriesColor(s.tone),
                                    fontWeight: 600
                                }
                            }, s.label, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                    lineNumber: 99,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                lineNumber: 98,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_c2 = LabRechartsLineChart;
function LabTrendsTable({ series }) {
    if (series.length === 0) return null;
    const longest = series.reduce((a, b)=>a.dates.length >= b.dates.length ? a : b);
    const toneColor = (tone, value, threshold)=>{
        if (tone === "critical") return "text-tp-error-600 font-semibold";
        if (tone === "warn") return "text-tp-warning-600 font-semibold";
        if (threshold != null && value > threshold) return "text-tp-error-600 font-semibold";
        return "text-tp-slate-700";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[8px] border border-tp-slate-100 overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full text-[14px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "bg-tp-slate-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "text-left px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                children: "Date"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this),
                            series.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "text-right px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                    children: [
                                        s.label,
                                        " (",
                                        s.unit,
                                        ")"
                                    ]
                                }, s.label, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: longest.dates.map((date, di)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: di % 2 === 1 ? "bg-tp-slate-50/50" : "",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "text-left px-[8px] py-[6px] text-tp-slate-500",
                                    children: date
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this),
                                series.map((s)=>{
                                    const val = di < s.values.length ? s.values[di] : null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: `text-right px-[8px] py-[6px] ${val != null ? toneColor(s.tone, val, s.threshold) : "text-tp-slate-300"}`,
                                        children: val != null ? val : "\u2014"
                                    }, s.label, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                                        lineNumber: 147,
                                        columnNumber: 19
                                    }, this);
                                })
                            ]
                        }, date, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_c3 = LabTrendsTable;
function LabTrendsCard({ data, onPillTap }) {
    _s();
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("graph");
    const [chartType, setChartType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("line");
    const totalVisits = data.series.length > 0 ? data.series[0].values.length : 0;
    const rechartsData = toRechartsData(data.series);
    const pointCount = rechartsData.length;
    const chartHeight = 160;
    const minWidth = Math.max(300, pointCount * 60);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
            lineNumber: 172,
            columnNumber: 13
        }, void 0),
        tpIconName: "Lab",
        title: data.title,
        date: `${totalVisits} visits`,
        dataSources: [
            "EMR Records",
            "Lab Reports"
        ],
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: "View full lab report"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
            lineNumber: 177,
            columnNumber: 20
        }, void 0),
        children: data.series.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-[6px] flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewToggle"], {
                            viewMode: viewMode,
                            onChange: setViewMode
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 182,
                            columnNumber: 13
                        }, this),
                        viewMode === "graph" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ChartTypeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartTypeToggle"], {
                            chartType: chartType,
                            onChange: setChartType
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 183,
                            columnNumber: 38
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this),
                viewMode === "graph" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        chartType === "line" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LabRechartsLineChart, {
                            allSeries: data.series,
                            data: rechartsData,
                            chartHeight: chartHeight,
                            minWidth: minWidth
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 188,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LabRechartsBarChart, {
                            allSeries: data.series,
                            data: rechartsData,
                            chartHeight: chartHeight,
                            minWidth: minWidth
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 190,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SeriesLegend, {
                            series: data.series
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                            lineNumber: 192,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LabTrendsTable, {
                    series: data.series
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
                    lineNumber: 195,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-4 text-center text-[14px] text-tp-slate-400",
            children: "No lab data available for charting."
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
            lineNumber: 199,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_s(LabTrendsCard, "ZWFLh8xGJT2uN+aUa4ZwWmBZiFw=");
_c4 = LabTrendsCard;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "SeriesLegend");
__turbopack_context__.k.register(_c1, "LabRechartsBarChart");
__turbopack_context__.k.register(_c2, "LabRechartsLineChart");
__turbopack_context__.k.register(_c3, "LabTrendsTable");
__turbopack_context__.k.register(_c4, "LabTrendsCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MedHistoryCard",
    ()=>MedHistoryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function SourceBadge({ source }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex rounded-[4px] px-1.5 py-[1px] text-[12px] font-semibold leading-[1.5]", source === "prescribed" ? "bg-tp-blue-50 text-tp-blue-500" : "bg-tp-violet-50 text-tp-violet-600"),
        children: source
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = SourceBadge;
function MedHistoryCard({ data, onPillTap }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx",
            lineNumber: 34,
            columnNumber: 13
        }, void 0),
        tpIconName: "pill",
        title: "Medication History",
        badge: {
            label: `${data.entries.length} found`,
            color: "#92400E",
            bg: "#FEF3C7"
        },
        dataSources: [
            "EMR Records",
            "Pharmacy Records"
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-0",
            children: data.entries.map((entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-start gap-2 py-[4px]", i < data.entries.length - 1 && "border-b border-tp-slate-100"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[14px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-tp-slate-800",
                                            children: entry.drug
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx",
                                            lineNumber: 58,
                                            columnNumber: 17
                                        }, this),
                                        entry.dosage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-tp-slate-400",
                                            children: [
                                                " (",
                                                entry.dosage,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx",
                                            lineNumber: 62,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[14px] text-tp-slate-400",
                                    children: entry.date
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SourceBadge, {
                            source: entry.source
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this)
                    ]
                }, `${entry.drug}-${i}`, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c1 = MedHistoryCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "SourceBadge");
__turbopack_context__.k.register(_c1, "MedHistoryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VitalsSummaryCard",
    ()=>VitalsSummaryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$FlagArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/FlagArrow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/sectionInlineKey.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function VitalsSummaryCard({ data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
            lineNumber: 22,
            columnNumber: 13
        }, void 0),
        tpIconName: "Heart Rate",
        title: data.title,
        badge: data.recordedAt ? {
            label: data.recordedAt,
            color: "var(--tp-violet-600, #6D28D9)",
            bg: "var(--tp-violet-50, #EDE9FE)"
        } : undefined,
        collapsible: true,
        dataSources: [
            "EMR Records"
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-0",
                children: data.rows.map((row, i)=>{
                    const isFlagged = row.flag && row.flag !== "normal";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between py-[5px]", i > 0 && "border-t border-tp-slate-50"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"], "text-[12px]"),
                                        children: row.shortLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
                                        lineNumber: 46,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-[3px] font-normal text-tp-slate-400",
                                        children: [
                                            "(",
                                            row.unit,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
                                        lineNumber: 47,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-[3px]",
                                children: [
                                    isFlagged && row.flag && row.flag !== "normal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$FlagArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlagArrow"], {
                                        flag: row.flag
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
                                        lineNumber: 53,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[13px] font-medium tabular-nums", isFlagged ? "text-tp-error-600" : "text-tp-slate-700"),
                                        children: row.value
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
                                        lineNumber: 55,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
                        lineNumber: 37,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            data.insight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-[6px] rounded-[6px] bg-tp-slate-50 px-[8px] py-[5px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[12px] italic leading-[1.5] text-tp-slate-500",
                    children: data.insight
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = VitalsSummaryCard;
var _c;
__turbopack_context__.k.register(_c, "VitalsSummaryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VaccinationScheduleCard",
    ()=>VaccinationScheduleCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$NotificationBing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NotificationBing$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/NotificationBing.js [app-client] (ecmascript) <export default as NotificationBing>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const STATUS_BADGE = {
    given: {
        label: "Given",
        color: "#22C55E",
        bg: "#F0FDF4"
    },
    due: {
        label: "Due",
        color: "#F59E0B",
        bg: "#FFFBEB"
    },
    overdue: {
        label: "Overdue",
        color: "#DC2626",
        bg: "#FEE2E2"
    }
};
function VaccinationScheduleCard({ data, onSidebarNav, onPillTap }) {
    const copyAll = ()=>{
        const text = data.vaccines.map((v)=>`${v.patientName} | ${v.name} (${v.dose}) | ${v.dueDate} [${v.status}]`).join("\n");
        navigator.clipboard.writeText(text);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
            lineNumber: 31,
            columnNumber: 13
        }, void 0),
        tpIconName: "injection",
        title: data.title,
        badge: data.overdueCount > 0 ? {
            label: `${data.overdueCount} overdue`,
            color: "#DC2626",
            bg: "#FEE2E2"
        } : undefined,
        copyAll: copyAll,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: "Send reminder to all",
            onClick: ()=>onPillTap?.("Send reminder to all"),
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$NotificationBing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NotificationBing$3e$__["NotificationBing"], {
                size: 14,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                lineNumber: 45,
                columnNumber: 21
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
            lineNumber: 41,
            columnNumber: 9
        }, void 0),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-[6px] mb-[8px]",
                children: [
                    data.overdueCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full px-2 py-[1px] text-[12px] font-medium",
                        style: {
                            color: "#DC2626",
                            backgroundColor: "#FEE2E2"
                        },
                        children: [
                            data.overdueCount,
                            " overdue"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full px-2 py-[1px] text-[12px] font-medium",
                        style: {
                            color: "#F59E0B",
                            backgroundColor: "#FFFBEB"
                        },
                        children: [
                            data.dueCount,
                            " due"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    data.givenCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full px-2 py-[1px] text-[12px] font-medium",
                        style: {
                            color: "#22C55E",
                            backgroundColor: "#F0FDF4"
                        },
                        children: [
                            data.givenCount,
                            " given"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-[1px] overflow-hidden rounded-[8px] border border-tp-slate-100",
                children: data.vaccines.map((vax, i)=>{
                    const badge = STATUS_BADGE[vax.status] ?? STATUS_BADGE.due;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between px-[8px] py-[6px]", i % 2 === 0 ? "bg-white" : "bg-tp-slate-50"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-[6px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[14px] font-medium text-tp-slate-800 truncate",
                                                children: vax.patientName
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                                                lineNumber: 81,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "shrink-0 rounded-[4px] px-1.5 py-[1px] text-[12px] font-medium",
                                                style: {
                                                    color: badge.color,
                                                    backgroundColor: badge.bg
                                                },
                                                children: badge.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                                                lineNumber: 84,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                                        lineNumber: 80,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[14px] text-tp-slate-500 truncate mt-[1px]",
                                        children: [
                                            vax.name,
                                            " · ",
                                            vax.dose,
                                            " · ",
                                            vax.dueDate
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                                        lineNumber: 91,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                                lineNumber: 79,
                                columnNumber: 15
                            }, this),
                            vax.status !== "given" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "shrink-0 ml-2 rounded-[6px] border border-tp-blue-200 bg-white px-2 py-[2px] text-[14px] font-medium text-tp-blue-600 hover:bg-tp-blue-50 transition-colors",
                                onClick: ()=>onPillTap?.(`Remind ${vax.patientName} ${vax.name}`),
                                children: "Remind"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                                lineNumber: 98,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "shrink-0 ml-2 text-[14px] text-tp-green-500 font-medium",
                                children: "✓ Done"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                                lineNumber: 105,
                                columnNumber: 17
                            }, this)
                        ]
                    }, `${vax.patientName}-${vax.name}-${i}`, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = VaccinationScheduleCard;
var _c;
__turbopack_context__.k.register(_c, "VaccinationScheduleCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PatientTimelineCard",
    ()=>PatientTimelineCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
"use client";
;
;
;
const TYPE_CONFIG = {
    visit: {
        color: "var(--tp-violet-500, #8B5CF6)",
        bg: "var(--tp-violet-50, #F5F3FF)"
    },
    lab: {
        color: "var(--tp-slate-500, #64748B)",
        bg: "var(--tp-slate-100, #F1F5F9)"
    },
    procedure: {
        color: "var(--tp-violet-600, #7C3AED)",
        bg: "var(--tp-violet-100, #EDE9FE)"
    },
    admission: {
        color: "var(--tp-error-500, #EF4444)",
        bg: "var(--tp-error-50, #FEF2F2)"
    }
};
function PatientTimelineCard({ data, onSidebarNav }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
            lineNumber: 23,
            columnNumber: 13
        }, void 0),
        tpIconName: "medical-record",
        title: data.title,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: "View all records",
            onClick: ()=>onSidebarNav?.("pastVisits")
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
            lineNumber: 26,
            columnNumber: 20
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative pl-[20px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-[6px] top-[4px] bottom-[4px] w-[1px]",
                    style: {
                        backgroundColor: "var(--tp-slate-200, #E2E8F0)"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                data.events.map((event, i)=>{
                    const cfg = TYPE_CONFIG[event.type] ?? TYPE_CONFIG.visit;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mb-[10px] last:mb-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-[-17px] top-[4px] h-[8px] w-[8px] rounded-full border-[1.5px]",
                                style: {
                                    borderColor: cfg.color,
                                    backgroundColor: cfg.bg
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-[8px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-[60px] flex-shrink-0 text-[14px] text-tp-slate-400",
                                        children: event.date
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
                                        lineNumber: 51,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mr-[4px] rounded-[3px] px-1 py-[0.5px] text-[12px] font-medium",
                                                style: {
                                                    color: cfg.color,
                                                    backgroundColor: cfg.bg
                                                },
                                                children: event.type
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
                                                lineNumber: 53,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[14px] leading-[1.6] text-tp-slate-700",
                                                children: event.summary
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
                                                lineNumber: 59,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
                                        lineNumber: 52,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this);
                })
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = PatientTimelineCard;
var _c;
__turbopack_context__.k.register(_c, "PatientTimelineCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_tp-rxpad_dr-agent_cards_data_f5d64db2._.js.map