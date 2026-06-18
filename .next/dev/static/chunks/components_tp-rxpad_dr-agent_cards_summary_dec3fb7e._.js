(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmbeddedSpecialtyBox",
    ()=>EmbeddedSpecialtyBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function EmbeddedSpecialtyBox({ data }) {
    const { obstetricData, pediatricsData, gynecData, ophthalData } = data;
    /* Priority: obstetric > pediatrics > gynec > ophthal — render only ONE */ if (obstetricData) {
        const values = [
            obstetricData.lmp && {
                key: "LMP",
                value: obstetricData.lmp
            },
            obstetricData.edd && {
                key: "EDD",
                value: obstetricData.edd
            },
            obstetricData.gestationalWeeks && {
                key: "GA",
                value: `${obstetricData.gestationalWeeks} wks`
            },
            obstetricData.gravida != null && {
                key: "GPLAE",
                value: `G${obstetricData.gravida}P${obstetricData.para ?? 0}L${obstetricData.living ?? 0}A${obstetricData.abortion ?? 0}E${obstetricData.ectopic ?? 0}`
            },
            obstetricData.ancDue && obstetricData.ancDue.length > 0 && {
                key: "ANC",
                value: obstetricData.ancDue.join(", "),
                flag: "warning"
            },
            obstetricData.vaccineStatus && obstetricData.vaccineStatus.length > 0 && {
                key: "Vaccines",
                value: obstetricData.vaccineStatus.join(", ")
            }
        ].filter(Boolean);
        if (values.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 rounded-[6px] px-2 py-1.5",
            style: {
                border: "1px solid var(--tp-violet-100, #E9E0FA)",
                background: "rgba(243, 239, 254, 0.25)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                    label: "Obstetric",
                    variant: "specialty"
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pl-[4px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                        tag: "",
                        values: values,
                        source: "existing"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this);
    }
    if (pediatricsData) {
        const values = [
            pediatricsData.ageDisplay && {
                key: "Age",
                value: pediatricsData.ageDisplay
            },
            pediatricsData.heightCm != null && {
                key: "Ht",
                value: `${pediatricsData.heightCm} cm${pediatricsData.heightPercentile ? ` (${pediatricsData.heightPercentile})` : ""}`
            },
            pediatricsData.weightKg != null && {
                key: "Wt",
                value: `${pediatricsData.weightKg} kg${pediatricsData.weightPercentile ? ` (${pediatricsData.weightPercentile})` : ""}`
            },
            pediatricsData.vaccinesPending != null && pediatricsData.vaccinesPending > 0 && {
                key: "Vaccines Pending",
                value: String(pediatricsData.vaccinesPending),
                flag: "warning"
            },
            pediatricsData.vaccinesOverdue != null && pediatricsData.vaccinesOverdue > 0 && {
                key: "Overdue",
                value: String(pediatricsData.vaccinesOverdue),
                flag: "high"
            }
        ].filter(Boolean);
        if (values.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 rounded-[6px] px-2 py-1.5",
            style: {
                border: "1px solid var(--tp-violet-100, #E9E0FA)",
                background: "rgba(243, 239, 254, 0.25)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                    label: "Pediatrics",
                    variant: "specialty"
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pl-[4px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                        tag: "",
                        values: values,
                        source: "existing"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this);
    }
    if (gynecData) {
        const values = [
            gynecData.menarche && {
                key: "Menarche",
                value: gynecData.menarche
            },
            gynecData.cycleLength && {
                key: "Cycle",
                value: `${gynecData.cycleLength}${/day/i.test(gynecData.cycleLength) ? "" : " days"}${gynecData.cycleRegularity ? ` (${gynecData.cycleRegularity})` : ""}`
            },
            gynecData.flowDuration && {
                key: "Flow",
                value: `${gynecData.flowDuration}${gynecData.flowIntensity ? ` · ${gynecData.flowIntensity}` : ""}`
            },
            gynecData.painScore && {
                key: "Pain",
                value: gynecData.painScore
            }
        ].filter(Boolean);
        if (values.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 rounded-[6px] px-2 py-1.5",
            style: {
                border: "1px solid var(--tp-violet-100, #E9E0FA)",
                background: "rgba(243, 239, 254, 0.25)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                    label: "Gynec",
                    variant: "specialty"
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pl-[4px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                        tag: "",
                        values: values,
                        source: "existing"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
            lineNumber: 113,
            columnNumber: 7
        }, this);
    }
    if (ophthalData) {
        const values = [
            ophthalData.vaRight && {
                key: "OD VA",
                value: ophthalData.vaRight
            },
            ophthalData.vaLeft && {
                key: "OS VA",
                value: ophthalData.vaLeft
            },
            ophthalData.iop && {
                key: "IOP",
                value: ophthalData.iop
            }
        ].filter(Boolean);
        if (values.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 rounded-[6px] px-2 py-1.5",
            style: {
                border: "1px solid var(--tp-violet-100, #E9E0FA)",
                background: "rgba(243, 239, 254, 0.25)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                    label: "Ophthal",
                    variant: "specialty"
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pl-[4px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                        tag: "",
                        values: values,
                        source: "existing"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx",
            lineNumber: 138,
            columnNumber: 7
        }, this);
    }
    return null;
}
_c = EmbeddedSpecialtyBox;
var _c;
__turbopack_context__.k.register(_c, "EmbeddedSpecialtyBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GPSummaryCard",
    ()=>GPSummaryCard,
    "buildSummaryNarrative",
    ()=>buildSummaryNarrative
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx [app-client] (ecmascript)");
// InsightBox removed — cross-problem flags now rendered inline
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$EmbeddedSpecialtyBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/summary/EmbeddedSpecialtyBox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$highlightClinicalText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/highlightClinicalText.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/buildCoreNarrative.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatLastVisitSectionLabel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/formatLastVisitSectionLabel.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const LAB_SHORT_NAMES = {
    "HbA1c": "HbA1c",
    "Fasting Glucose": "F.Glucose",
    "Fasting Blood Sugar": "FBS",
    "TSH": "TSH",
    "LDL": "LDL",
    "HDL": "HDL",
    "Vitamin D": "Vit D",
    "Creatinine": "Creat",
    "Microalbumin": "Microalb",
    "Hemoglobin": "Hb",
    "Triglycerides": "TG",
    "Total Cholesterol": "T.Chol"
};
function shortenLabName(fullName) {
    return LAB_SHORT_NAMES[fullName] || fullName;
}
function parseVitalFlag(key, raw) {
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VITAL_META"].find((m)=>m.key === key);
    if (!meta) return undefined;
    // For BP, check systolic
    if (key === "bp") {
        const sys = parseInt(raw.split("/")[0], 10);
        if (isNaN(sys)) return undefined;
        if (sys >= 140) return "high";
        if (sys <= 90) return "low";
        return "normal";
    }
    const num = parseFloat(raw);
    if (isNaN(num)) return undefined;
    if (meta.isAbnormal(num)) {
        // Determine direction heuristically based on thresholds
        if (key === "spo2") return "low";
        if (key === "temp") return "high";
        if (key === "bmi") return num > 30 ? "high" : "low";
        return num > 100 ? "high" : "low";
    }
    return "normal";
}
/** Split a comma-separated string while respecting parentheses. */ function splitRespectingParens(str) {
    const results = [];
    let depth = 0;
    let current = "";
    for (const ch of str){
        if (ch === "(") depth++;
        if (ch === ")") depth = Math.max(0, depth - 1);
        if (ch === "," && depth === 0) {
            results.push(current.trim());
            current = "";
        } else {
            current += ch;
        }
    }
    if (current.trim()) results.push(current.trim());
    return results;
}
/**
 * Shorten a symptom string.
 * "Fever (2d, high, evening spikes)" -> "Fever 2d"
 * "Eye redness (2d, bilateral)" -> "Eye redness 2d"
 * "Headache" -> "Headache"
 */ function shortenSymptom(raw) {
    const match = raw.match(/^([^(]+)\(([^,)]+)/);
    if (match) {
        const name = match[1].trim();
        const firstDetail = match[2].trim();
        // Include first detail if it looks like a duration (contains d/w/m or digits)
        if (/\d/.test(firstDetail)) {
            return `${name} (${firstDetail})`;
        }
        return name;
    }
    return raw.trim();
}
/**
 * Shorten medication string to just drug name (+ strength if present).
 * "Telma20 1-0-0-1 BF" -> "Telma20"
 * "Metsmail 500 1-0-0-0 BF" -> "Metsmail 500"
 * "Paracetamol 650 SOS" -> "Paracetamol 650"
 */ function shortenMedication(raw) {
    const parts = raw.trim().split(/\s+/);
    if (parts.length === 0) return raw;
    // drug name is first token; if second token is a number (strength), include it
    const drugName = parts[0];
    if (parts.length > 1 && /^\d+/.test(parts[1]) && !/^\d+-\d+/.test(parts[1])) {
        return `${drugName} ${parts[1]}`;
    }
    return drugName;
}
function buildSummaryNarrative(data, specialty) {
    const quote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildCardSituationQuote"])(data, specialty);
    if (!quote) return null;
    return [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$highlightClinicalText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["highlightClinicalText"])(quote)
        }, "situation-quote", false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
            lineNumber: 146,
            columnNumber: 11
        }, this)
    ];
}
function GPSummaryCard({ data, onPillTap, onSidebarNav, defaultCollapsed, hideNarrative, activeSpecialty }) {
    const hasSpecialty = !!data.obstetricData || !!data.pediatricsData || !!data.gynecData || !!data.ophthalData;
    /* - Vitals row - */ const vitalsValues = data.todayVitals ? [
        data.todayVitals.bp && {
            key: "BP",
            value: data.todayVitals.bp,
            flag: parseVitalFlag("bp", data.todayVitals.bp)
        },
        data.todayVitals.pulse && {
            key: "Pulse",
            value: `${data.todayVitals.pulse} bpm`,
            flag: parseVitalFlag("pulse", data.todayVitals.pulse)
        },
        data.todayVitals.spo2 && {
            key: "SpO\u2082",
            value: `${data.todayVitals.spo2}%`,
            flag: parseVitalFlag("spo2", data.todayVitals.spo2)
        },
        data.todayVitals.temp && {
            key: "Temp",
            value: `${data.todayVitals.temp}\u00B0F`,
            flag: parseVitalFlag("temp", data.todayVitals.temp)
        },
        data.todayVitals.weight && {
            key: "Wt",
            value: `${data.todayVitals.weight} kg`
        }
    ].filter(Boolean) : [];
    /* - Labs row - */ const labsValues = data.keyLabs ? data.keyLabs.slice(0, 3).map((lab)=>({
            key: shortenLabName(lab.name),
            value: `${lab.value}${lab.unit ? ` ${lab.unit}` : ""}`,
            flag: lab.flag === "high" ? "high" : lab.flag === "low" ? "low" : lab.flag === "critical" ? "high" : undefined
        })) : [];
    /* - History row - */ const historyValues = [];
    if (data.chronicConditions && data.chronicConditions.length > 0) {
        historyValues.push({
            key: "Chronic",
            value: data.chronicConditions.join(", ")
        });
    }
    if (data.allergies && data.allergies.length > 0) {
        historyValues.push({
            key: "Allergies",
            value: data.allergies.join(", ")
        });
    }
    /* - Last Visit row (shortened) - */ const lastVisitValues = [];
    if (data.lastVisit) {
        if (data.lastVisit.symptoms) {
            const shortened = splitRespectingParens(data.lastVisit.symptoms).map(shortenSymptom).join(", ");
            lastVisitValues.push({
                key: "Sx",
                value: shortened
            });
        }
        if (data.lastVisit.diagnosis) {
            lastVisitValues.push({
                key: "Dx",
                value: data.lastVisit.diagnosis
            });
        }
        if (data.lastVisit.medication) {
            const shortened = splitRespectingParens(data.lastVisit.medication).map(shortenMedication).join(", ");
            lastVisitValues.push({
                key: "Rx",
                value: shortened
            });
        }
    }
    /* - Action pills — data-aware (only show if data exists) - */ const pills = [];
    if (data.lastVisit) pills.push({
        label: "Last visit details"
    });
    if (data.keyLabs && data.keyLabs.length > 0) {
        pills.push({
            label: data.labFlagCount > 0 ? `Labs (${data.labFlagCount} flagged)` : "Labs"
        });
    }
    if (data.todayVitals && Object.keys(data.todayVitals).length > 0) pills.push({
        label: "Vital trends"
    });
    if (pills.length === 0) pills.push({
        label: "Suggest DDX"
    });
    pills.push({
        label: "Ask me anything"
    });
    /* - Cross-problem flags (max 2 high-severity) - */ const highSeverityFlags = (data.crossProblemFlags || []).filter((f)=>f.severity === "high").slice(0, 2);
    /* - Clinical narrative — compact patient snapshot at top of card.
       Uses patientNarrative (if available) or auto-generates from
       chronic conditions + medications + allergies. - */ const narrativeParts = buildSummaryNarrative(data, activeSpecialty);
    /* - Section ordering — most actionable first:
       1. Today's Vitals — current state, what needs attention now
       2. Key Labs — lab values with provenance flags
       3. History — chronic conditions, allergies
       4. Last Visit — previous care context
     Narrative (quick snapshot) is shown separately in the intro flow. - */ const sections = [];
    // Current vitals — what needs attention today
    if (vitalsValues.length > 0) {
        sections.push({
            id: "vitals",
            node: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                        label: "Today's Vitals",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Today's Vitals"]
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                        lineNumber: 264,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pl-[4px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                            tag: "",
                            values: vitalsValues,
                            onTagClick: ()=>onSidebarNav?.("vitals"),
                            source: "existing"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                            lineNumber: 266,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                        lineNumber: 265,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                lineNumber: 263,
                columnNumber: 9
            }, this)
        });
    }
    // Lab results with flags and provenance
    if (labsValues.length > 0) {
        sections.push({
            id: "labs",
            node: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                        label: "Key Labs",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Key Labs"]
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                        lineNumber: 284,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pl-[4px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                            tag: "",
                            values: labsValues,
                            onTagClick: ()=>onSidebarNav?.("labResults"),
                            source: "existing"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                        lineNumber: 285,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                lineNumber: 283,
                columnNumber: 9
            }, this)
        });
    }
    // Chronic conditions, allergies, medical history
    if (historyValues.length > 0) {
        sections.push({
            id: "history",
            node: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                        label: "Medical History",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Medical History"]
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                        lineNumber: 304,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pl-[4px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                            tag: "",
                            values: historyValues,
                            onTagClick: ()=>onSidebarNav?.("history"),
                            source: "existing"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                            lineNumber: 306,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                        lineNumber: 305,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                lineNumber: 303,
                columnNumber: 9
            }, this)
        });
    }
    // Previous care context
    if (lastVisitValues.length > 0) {
        sections.push({
            id: "lastVisit",
            node: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatLastVisitSectionLabel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatLastVisitSectionLabel"])(data.lastVisit?.date),
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Last Visit"]
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                        lineNumber: 324,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pl-[4px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                            tag: "",
                            values: lastVisitValues,
                            onTagClick: ()=>onSidebarNav?.("pastVisits"),
                            source: "existing",
                            allowCopyToRxPad: true,
                            trailingNote: data.lastVisit?.doctorName ? `${data.lastVisit.doctorName}` : undefined
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                            lineNumber: 329,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                lineNumber: 323,
                columnNumber: 9
            }, this)
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
            lineNumber: 345,
            columnNumber: 13
        }, void 0),
        tpIconName: "stethoscope",
        title: "Patient Summary",
        collapsible: true,
        defaultCollapsed: defaultCollapsed,
        dataSources: [
            "EMR Records",
            "Past Visit History"
        ],
        sidebarLink: onSidebarNav ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: "View all past visits",
            onClick: ()=>onSidebarNav("pastVisits")
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
            lineNumber: 353,
            columnNumber: 11
        }, void 0) : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[8px]",
            children: [
                !hideNarrative && narrativeParts && narrativeParts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[14px] leading-[1.6] text-tp-slate-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-tp-slate-400 select-none",
                            children: '"'
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                            lineNumber: 364,
                            columnNumber: 13
                        }, this),
                        narrativeParts,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-tp-slate-400 select-none",
                            children: '"'
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                            lineNumber: 366,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                    lineNumber: 363,
                    columnNumber: 11
                }, this),
                sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                        children: section.node
                    }, section.id, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                        lineNumber: 371,
                        columnNumber: 11
                    }, this)),
                hasSpecialty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-[2px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$EmbeddedSpecialtyBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedSpecialtyBox"], {
                        data: data
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                        lineNumber: 379,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                    lineNumber: 378,
                    columnNumber: 11
                }, this),
                highSeverityFlags.map((flag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-[6px] text-[14px] leading-[1.6]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `mt-[6px] h-[6px] w-[6px] rounded-full flex-shrink-0 ${flag.severity === "high" ? "bg-tp-error-500" : "bg-tp-warning-500"}`
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                                lineNumber: 386,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-tp-slate-600",
                                children: flag.text
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                                lineNumber: 387,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
                        lineNumber: 385,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
            lineNumber: 360,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx",
        lineNumber: 344,
        columnNumber: 5
    }, this);
}
_c = GPSummaryCard;
var _c;
__turbopack_context__.k.register(_c, "GPSummaryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ObstetricExpandedCard",
    ()=>ObstetricExpandedCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function gravidaLabel(gravida) {
    if (gravida == null) return "";
    if (gravida === 1) return "Primigravida";
    if (gravida === 2) return "Secundigravida";
    return `G${gravida} Multigravida`;
}
function ancVaccineFlag(status) {
    const lower = status.toLowerCase();
    if (lower.includes("overdue")) return "high";
    if (lower.includes("due")) return "warning";
    if (lower.includes("given") || lower.includes("done") || lower.includes("complete")) return "success";
    return "normal";
}
function ObstetricExpandedCard({ data, onSidebarNav }) {
    /* ─ Basic info row ─ */ const basicValues = [
        data.lmp && {
            key: "LMP",
            value: data.lmp
        },
        data.edd && {
            key: "EDD",
            value: data.edd
        },
        data.gestationalWeeks && {
            key: "GA",
            value: `${data.gestationalWeeks} wks`
        },
        data.gravida != null && {
            key: "GPLAE",
            value: `G${data.gravida}P${data.para ?? 0}L${data.living ?? 0}A${data.abortion ?? 0}E${data.ectopic ?? 0}`
        }
    ].filter(Boolean);
    /* ─ ANC & Vaccines row — single combined value ─ */ const ancVaccineParts = [];
    if (data.ancDue && data.ancDue.length > 0) {
        ancVaccineParts.push(...data.ancDue);
    }
    if (data.vaccineStatus && data.vaccineStatus.length > 0) {
        data.vaccineStatus.forEach((item)=>{
            const colonIdx = item.indexOf(":");
            if (colonIdx > -1) {
                const name = item.slice(0, colonIdx).trim();
                const status = item.slice(colonIdx + 1).trim();
                ancVaccineParts.push(`${name} (${status})`);
            } else {
                ancVaccineParts.push(item);
            }
        });
    }
    const ancVaccineValues = ancVaccineParts.length > 0 ? [
        {
            key: "",
            value: ancVaccineParts.join(", ")
        }
    ] : [];
    /* ─ Last exam row ─ */ const examValues = [
        data.presentation && {
            key: "Presentation",
            value: data.presentation
        },
        data.fetalMovement && {
            key: "Fetal Movement",
            value: data.fetalMovement
        },
        data.fundusHeight && {
            key: "Fundus Ht",
            value: data.fundusHeight
        },
        data.oedema && {
            key: "Oedema",
            value: data.oedema
        },
        data.amnioticFluid && {
            key: "Amniotic Fluid",
            value: data.amnioticFluid
        },
        data.bpLatest && {
            key: "BP",
            value: data.bpLatest
        }
    ].filter(Boolean);
    const badge = data.gravida != null ? {
        label: gravidaLabel(data.gravida),
        color: "#6D28D9",
        bg: "#EDE9FE"
    } : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
            lineNumber: 99,
            columnNumber: 13
        }, void 0),
        tpIconName: "Obstetric",
        title: "Obstetric Summary",
        badge: badge,
        dataSources: [
            "EMR Records",
            "ANC Records"
        ],
        collapsible: true,
        sidebarLink: onSidebarNav ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: "View detailed obstetric history",
            onClick: ()=>onSidebarNav("obstetric")
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
            lineNumber: 107,
            columnNumber: 11
        }, void 0) : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[8px]",
            children: [
                basicValues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "Basic Info",
                            icon: "health-file-02"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                                tag: "",
                                values: basicValues,
                                source: "existing"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                            lineNumber: 118,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                    lineNumber: 116,
                    columnNumber: 11
                }, this),
                ancVaccineValues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "ANC / Vaccines",
                            icon: "injection"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                                tag: "",
                                values: ancVaccineValues,
                                source: "existing"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                    lineNumber: 125,
                    columnNumber: 11
                }, this),
                examValues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "Last Exam"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                                tag: "",
                                values: examValues,
                                source: "existing"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                                lineNumber: 137,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
                    lineNumber: 134,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
            lineNumber: 114,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_c = ObstetricExpandedCard;
var _c;
__turbopack_context__.k.register(_c, "ObstetricExpandedCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/summary/GynecSummaryCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GynecSummaryCard",
    ()=>GynecSummaryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function GynecSummaryCard({ data, onSidebarNav }) {
    const values = [
        data.menarche && {
            key: "Menarche",
            value: data.menarche
        },
        data.cycleLength && {
            key: "Cycle",
            value: [
                data.cycleLength,
                data.cycleRegularity
            ].filter(Boolean).join(", ")
        },
        data.flowDuration && {
            key: "Flow",
            value: [
                data.flowDuration,
                data.flowIntensity
            ].filter(Boolean).join(", ")
        },
        data.painScore && {
            key: "Pain",
            value: data.painScore
        },
        data.lmp && {
            key: "LMP",
            value: data.lmp
        },
        data.lastPapSmear && {
            key: "Pap Smear",
            value: data.lastPapSmear
        }
    ].filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GynecSummaryCard.tsx",
            lineNumber: 38,
            columnNumber: 13
        }, void 0),
        tpIconName: "Gynec",
        title: "Gynec Summary",
        dataSources: [
            "EMR Records"
        ],
        collapsible: true,
        sidebarLink: onSidebarNav ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: "View detailed gynec history",
            onClick: ()=>onSidebarNav("gynec")
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GynecSummaryCard.tsx",
            lineNumber: 45,
            columnNumber: 11
        }, void 0) : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[8px]",
            children: values.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                        label: "Menstrual History",
                        icon: "Gynec"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GynecSummaryCard.tsx",
                        lineNumber: 55,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pl-[4px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                            tag: "",
                            values: values,
                            source: "existing"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GynecSummaryCard.tsx",
                            lineNumber: 57,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GynecSummaryCard.tsx",
                        lineNumber: 56,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GynecSummaryCard.tsx",
                lineNumber: 54,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GynecSummaryCard.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/GynecSummaryCard.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c = GynecSummaryCard;
var _c;
__turbopack_context__.k.register(_c, "GynecSummaryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PediatricSummaryCard",
    ()=>PediatricSummaryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/sectionInlineKey.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function PediatricSummaryCard({ data, onSidebarNav }) {
    /* ─ Growth row ─ */ const growthValues = [
        data.ageDisplay && {
            key: "Age",
            value: data.ageDisplay
        },
        data.heightCm != null && {
            key: "Ht",
            value: `${data.heightCm} cm${data.heightPercentile ? ` (${data.heightPercentile})` : ""}`
        },
        data.weightKg != null && {
            key: "Wt",
            value: `${data.weightKg} kg${data.weightPercentile ? ` (${data.weightPercentile})` : ""}`
        },
        data.bmiPercentile && {
            key: "BMI",
            value: data.bmiPercentile
        },
        data.ofcCm != null && {
            key: "OFC",
            value: `${data.ofcCm} cm`
        }
    ].filter(Boolean);
    /* ─ Vaccine row ─ */ /* Vaccine display: plain text, no color coding on counts */ const hasPending = data.vaccinesPending != null && data.vaccinesPending > 0;
    const hasOverdue = data.vaccinesOverdue != null && data.vaccinesOverdue > 0;
    const isUpToDate = !hasPending && !hasOverdue;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
            lineNumber: 44,
            columnNumber: 13
        }, void 0),
        tpIconName: "health care",
        title: "Pedia Summary",
        dataSources: [
            "EMR Records",
            "Growth Records"
        ],
        collapsible: true,
        sidebarLink: onSidebarNav ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterCTAGroupTertiary"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterCTA"], {
                    label: "View growth chart",
                    onClick: ()=>onSidebarNav("growth"),
                    fullWidth: true
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                    lineNumber: 52,
                    columnNumber: 13
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterDivider"], {}, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                    lineNumber: 53,
                    columnNumber: 13
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterCTA"], {
                    label: "View vaccine history",
                    onClick: ()=>onSidebarNav("vaccine"),
                    fullWidth: true
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                    lineNumber: 54,
                    columnNumber: 13
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
            lineNumber: 51,
            columnNumber: 11
        }, void 0) : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[8px]",
            children: [
                growthValues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cursor-pointer rounded-[4px] outline-none",
                    role: "button",
                    tabIndex: 0,
                    onClick: ()=>onSidebarNav?.("growth"),
                    onKeyDown: (e)=>{
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSidebarNav?.("growth");
                        }
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "Growth",
                            icon: "Heart Rate"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                                tag: "",
                                values: growthValues,
                                source: "existing"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cursor-pointer rounded-[4px] outline-none",
                    role: "button",
                    tabIndex: 0,
                    onClick: ()=>onSidebarNav?.("vaccine"),
                    onKeyDown: (e)=>{
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSidebarNav?.("vaccine");
                        }
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "Vaccines",
                            icon: "injection"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px] text-[14px] leading-[1.65] text-tp-slate-700",
                            children: isUpToDate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Up to date"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    hasPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"],
                                                children: "Pending: "
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                                                lineNumber: 100,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-tp-slate-700",
                                                children: data.vaccinesPending
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                                                lineNumber: 101,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    hasPending && hasOverdue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mx-[6px] text-tp-slate-200",
                                        children: "|"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                                        lineNumber: 104,
                                        columnNumber: 46
                                    }, this),
                                    hasOverdue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"],
                                                children: "Overdue: "
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                                                lineNumber: 107,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-tp-slate-700",
                                                children: data.vaccinesOverdue
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                                                lineNumber: 108,
                                                columnNumber: 21
                                            }, this),
                                            data.overdueVaccineNames && data.overdueVaccineNames.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-tp-slate-400",
                                                children: [
                                                    " (",
                                                    data.overdueVaccineNames.join(", "),
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                                                lineNumber: 110,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = PediatricSummaryCard;
var _c;
__turbopack_context__.k.register(_c, "PediatricSummaryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OphthalSummaryCard",
    ()=>OphthalSummaryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function OphthalSummaryCard({ data, onSidebarNav }) {
    /* ─ OD (Right eye) values ─ */ const odValues = [
        data.vaRight && {
            key: "UC Dist",
            value: data.vaRight
        },
        data.nearVaRight && {
            key: "UC Near",
            value: data.nearVaRight
        },
        data.glassPrescription && {
            key: "C Dist",
            value: data.glassPrescription
        }
    ].filter(Boolean);
    /* ─ OS (Left eye) values ─ */ const osValues = [
        data.vaLeft && {
            key: "UC Dist",
            value: data.vaLeft
        },
        data.nearVaLeft && {
            key: "UC Near",
            value: data.nearVaLeft
        }
    ].filter(Boolean);
    /* ─ Supplementary findings (IOP, Slit Lamp, Fundus) ─ */ const suppValues = [
        data.iop && {
            key: "IOP",
            value: data.iop
        },
        data.slitLamp && {
            key: "Slit Lamp",
            value: data.slitLamp
        },
        data.fundus && {
            key: "Fundus",
            value: data.fundus
        }
    ].filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
            lineNumber: 41,
            columnNumber: 13
        }, void 0),
        tpIconName: "eye",
        title: "Ophthal Summary",
        dataSources: [
            "EMR Records"
        ],
        collapsible: true,
        sidebarLink: onSidebarNav ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: "View detailed ophthal history",
            onClick: ()=>onSidebarNav("ophthal")
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
            lineNumber: 48,
            columnNumber: 11
        }, void 0) : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[8px]",
            children: [
                odValues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "OD (Right)",
                            icon: "eye"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                                tag: "",
                                values: odValues,
                                source: "existing"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this),
                osValues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "OS (Left)",
                            icon: "eye"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                                tag: "",
                                values: osValues,
                                source: "existing"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this),
                suppValues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "Findings",
                            icon: "clipboard-activity"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                                tag: "",
                                values: suppValues,
                                source: "existing"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = OphthalSummaryCard;
var _c;
__turbopack_context__.k.register(_c, "OphthalSummaryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PatientReportedCard",
    ()=>PatientReportedCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-touch-device.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MessageQuestion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageQuestion$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/MessageQuestion.js [app-client] (ecmascript) <export default as MessageQuestion>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
/** Parse medication string into name + frequency detail.
 *  "Telma 20mg 1-0-0-1" → { name: "Telma 20mg", detail: "1-0-0-1" }
 *  "Metsmall 500mg 1-0-0-0" → { name: "Metsmall 500mg", detail: "1-0-0-0" }
 *  "Paracetamol SOS" → { name: "Paracetamol", detail: "SOS" }
 */ function parseMedication(med) {
    // Pattern 1: Parenthesized detail — "Telma 20mg (Twice daily)" or "Telma 20mg (Twice daily | Before food)"
    const parenMatch = med.trim().match(/^(.+?)\s*\((.+)\)\s*$/);
    if (parenMatch) {
        return {
            name: parenMatch[1].trim(),
            detail: parenMatch[2].trim()
        };
    }
    // Pattern 2: Frequency pattern (1-0-0-1) optionally followed by timing (BF, AF, etc.)
    const freqMatch = med.match(/\s+(\d+-\d+-\d+-\d+(?:\s+(?:BF|AF|BD|TDS|OD|SOS|HS))?)\s*$/i);
    if (freqMatch) {
        return {
            name: med.slice(0, freqMatch.index).trim(),
            detail: freqMatch[1].trim()
        };
    }
    // Pattern 3: Standalone timing code at end
    const timingMatch = med.match(/\s+(BF|AF|BD|TDS|OD|SOS|HS)\s*$/i);
    if (timingMatch) {
        return {
            name: med.slice(0, timingMatch.index).trim(),
            detail: timingMatch[1].trim()
        };
    }
    return {
        name: med
    };
}
/**
 * Parse a chronic condition / medical history string into name + detail.
 * Extracts duration, treatment context, and clinical details from raw text.
 *
 * "CKD Stage 5 on peritoneal dialysis since Jan 2024"
 *   → { name: "CKD Stage 5", detail: "peritoneal dialysis, since Jan 2024" }
 * "Type 2 Diabetes for 18 years — on insulin"
 *   → { name: "Type 2 Diabetes", detail: "18 years, on insulin" }
 * "Heart attack in 2021 — stent placed"
 *   → { name: "Heart attack", detail: "2021, stent placed" }
 * "High blood pressure — on medications"
 *   → { name: "High blood pressure", detail: "on medications" }
 * "Hypertension (3yr)"
 *   → { name: "Hypertension", detail: "3yr" }
 */ function parseCondition(raw) {
    const trimmed = raw.trim();
    // Pattern 1: Already has parenthesized detail — "Hypertension (3yr)"
    const parenMatch = trimmed.match(/^([^(]+?)\s*\(([^)]+)\)\s*$/);
    if (parenMatch) {
        return {
            name: parenMatch[1].trim(),
            detail: parenMatch[2].trim()
        };
    }
    // Pattern 2: Has em-dash separator — "Heart attack in 2021 — stent placed"
    const dashMatch = trimmed.match(/^(.+?)\s*[—–]\s*(.+)$/);
    if (dashMatch) {
        // Check if the left side also has "for/since/in" qualifier
        const leftParts = splitConditionQualifier(dashMatch[1].trim());
        const rightDetail = dashMatch[2].trim();
        if (leftParts.detail) {
            return {
                name: leftParts.name,
                detail: `${leftParts.detail}, ${rightDetail}`
            };
        }
        return {
            name: leftParts.name,
            detail: rightDetail
        };
    }
    // Pattern 3: Has "on/for/since/in" qualifier — "Type 2 Diabetes for 18 years"
    const qualParts = splitConditionQualifier(trimmed);
    if (qualParts.detail) {
        return qualParts;
    }
    return {
        name: trimmed
    };
}
/**
 * Split a condition string at qualifier words (on, for, since, in + year).
 * "CKD Stage 5 on peritoneal dialysis since Jan 2024"
 *   → { name: "CKD Stage 5", detail: "peritoneal dialysis, since Jan 2024" }
 * "Type 2 Diabetes for 18 years"
 *   → { name: "Type 2 Diabetes", detail: "18 years" }
 */ function splitConditionQualifier(text) {
    // Match "on [treatment]", "for [duration]", "since [date]", "in [year]"
    const qualMatch = text.match(/^(.+?)\s+(?:(on)\s+(.+?)(?:\s+(since|from)\s+(.+))?|(for)\s+(.+?)(?:\s+(on)\s+(.+))?|(since|from)\s+(.+)|(in)\s+(\d{4})\b(.*)?)$/i);
    if (!qualMatch) return {
        name: text
    };
    // Simplify: split at first "on", "for", "since", or "in [year]"
    const simpleMatch = text.match(/^(.+?)\s+(?:on|for|since|from)\s+(.+)$/i);
    if (simpleMatch) {
        const name = simpleMatch[1].trim();
        const rest = simpleMatch[2].trim();
        // Further split at "since" or "from" if present
        const sinceMatch = rest.match(/^(.+?)\s+(?:since|from)\s+(.+)$/i);
        if (sinceMatch) {
            return {
                name,
                detail: `${sinceMatch[1].trim()}, since ${sinceMatch[2].trim()}`
            };
        }
        return {
            name,
            detail: rest
        };
    }
    // "in 2021" pattern
    const inYearMatch = text.match(/^(.+?)\s+in\s+(\d{4})\s*(.*)$/i);
    if (inYearMatch) {
        const name = inYearMatch[1].trim();
        const detail = inYearMatch[3] ? `${inYearMatch[2]}, ${inYearMatch[3].trim()}` : inYearMatch[2];
        return {
            name,
            detail
        };
    }
    return {
        name: text
    };
}
const SECTION_DEFS = [
    {
        id: "symptoms",
        tpIconName: "virus",
        title: "Symptoms Reported",
        copyTooltip: "Fill all symptoms to Symptoms",
        copyDest: "symptoms",
        getItems: (d)=>d.symptoms?.map((s)=>({
                    name: s.name,
                    detail: [
                        s.duration,
                        s.severity,
                        s.notes
                    ].filter(Boolean).join(", ")
                }))
    },
    {
        id: "medicalHistory",
        tpIconName: "medical-service",
        title: "Chronic Conditions",
        copyTooltip: "Fill chronic conditions to History",
        copyDest: "history",
        getItems: (d)=>d.medicalHistory?.map((item)=>parseCondition(item))
    },
    {
        id: "currentMedications",
        tpIconName: "pill",
        title: "Current Medications",
        copyTooltip: "Fill medications to RxPad",
        copyDest: "medications",
        getItems: (d)=>d.currentMedications?.map((item)=>parseMedication(item))
    },
    {
        id: "questionsToDoctor",
        tpIconName: "Diagnosis",
        title: "Questions to Doctor",
        copyTooltip: "Fill questions",
        copyDest: "notes",
        getItems: (d)=>d.questionsToDoctor?.map((q)=>({
                    name: q
                }))
    }
];
/* ── helpers ────────────────────────────────────────── */ function formatItem(item) {
    return item.detail ? `${item.name} (${item.detail})` : item.name;
}
function PatientReportedCard({ data, onCopy, onPillTap, defaultCollapsed }) {
    _s();
    const isTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"])();
    const [copiedKey, setCopiedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    /* Build all non-empty sections */ const activeSections = SECTION_DEFS.map((def)=>{
        const items = def.getItems(data);
        if (!items || items.length === 0) return null;
        return {
            ...def,
            items
        };
    }).filter(Boolean);
    if (activeSections.length === 0) return null;
    /* Collect all items for copy-all */ const allItems = activeSections.flatMap((s)=>s.items.map(formatItem));
    /* Copy handler with flash feedback */ const handleCopyItem = (text, key)=>{
        navigator.clipboard?.writeText(text);
        setCopiedKey(key);
        setTimeout(()=>setCopiedKey(null), 1200);
    };
    const handleCopySection = (section)=>{
        const text = section.items.map(formatItem).join("\n");
        navigator.clipboard?.writeText(text);
        onCopy?.(section.copyDest, section.items.map(formatItem));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
            lineNumber: 222,
            columnNumber: 13
        }, void 0),
        tpIconName: "clipboard-activity",
        title: "Reported by Patient",
        badge: data.reportedAt ? {
            label: data.reportedAt,
            color: "#6D28D9",
            bg: "#EDE9FE"
        } : undefined,
        copyAll: ()=>onCopy?.("all", allItems),
        copyAllTooltip: "Fill all patient-reported data to RxPad",
        collapsible: true,
        dataSources: [
            "Patient Intake"
        ],
        defaultCollapsed: defaultCollapsed ?? false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[8px]",
            children: activeSections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: section.title,
                            icon: section.id === "questionsToDoctor" ? undefined : section.tpIconName,
                            iconSlot: section.id === "questionsToDoctor" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MessageQuestion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageQuestion$3e$__["MessageQuestion"], {
                                size: 18,
                                variant: "Bulk",
                                color: "var(--tp-slate-500, #64748B)",
                                className: "shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                lineNumber: 246,
                                columnNumber: 21
                            }, void 0) : undefined,
                            trailing: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/section-header:opacity-100"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                                    label: section.copyTooltip,
                                    onAction: ()=>handleCopySection(section),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                        size: 14,
                                        onClick: ()=>handleCopySection(section)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                        lineNumber: 255,
                                        columnNumber: 21
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                    lineNumber: 251,
                                    columnNumber: 19
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                lineNumber: 250,
                                columnNumber: 17
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                            lineNumber: 241,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-1 flex flex-col gap-[2px] pl-1",
                            children: section.items.map((item, idx)=>{
                                const itemKey = `${section.id}-${idx}`;
                                const itemText = formatItem(item);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "group/reported-item flex items-start gap-[6px] rounded-[4px] px-1 -mx-1 py-[2px] text-[14px] leading-[1.6] text-tp-slate-700 transition-colors hover:bg-tp-slate-50/80",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-[1px] flex-shrink-0 text-tp-slate-400",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                            lineNumber: 271,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-normal text-tp-slate-700",
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 23
                                                }, this),
                                                item.detail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-tp-slate-400",
                                                    children: [
                                                        " ",
                                                        "(",
                                                        item.detail,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                            lineNumber: 274,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-shrink-0 transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/reported-item:opacity-100"),
                                            children: copiedKey === itemKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[14px] text-tp-success-500 font-medium",
                                                children: "Copied"
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                                lineNumber: 286,
                                                columnNumber: 25
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                                                label: `Fill "${item.name}" to RxPad`,
                                                onAction: ()=>handleCopyItem(itemText, itemKey),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                                    size: 14,
                                                    onClick: ()=>handleCopyItem(itemText, itemKey)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                                lineNumber: 288,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                            lineNumber: 284,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                                    lineNumber: 267,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                            lineNumber: 262,
                            columnNumber: 13
                        }, this)
                    ]
                }, section.id, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
                    lineNumber: 239,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
            lineNumber: 236,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx",
        lineNumber: 221,
        columnNumber: 5
    }, this);
}
_s(PatientReportedCard, "iEov92yC/iWrmyMPsxm9KzS8eZM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"]
    ];
});
_c = PatientReportedCard;
var _c;
__turbopack_context__.k.register(_c, "PatientReportedCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LastVisitCard",
    ()=>LastVisitCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
/* ── icon map: section tag → TP Medical Icon name ── */ const SECTION_ICON_MAP = {
    Symptoms: "thermometer",
    Examination: "stethoscope",
    Diagnosis: "Diagnosis",
    Medication: "pill",
    Investigation: "Lab",
    Advice: "clipboard-activity",
    "Follow-up": "medical-record"
};
/** Sections where copy-to-RxPad makes sense */ const COPYABLE_SECTIONS = new Set([
    "Symptoms",
    "Examination",
    "Diagnosis",
    "Medication",
    "Investigation",
    "Advice",
    "Follow-up",
    "Surgery",
    "Additional Notes"
]);
/* ── helper: fill text to RxPad ── */ function copyText(text) {
    navigator.clipboard?.writeText(text);
}
/* ── helper: build copy payload for a section ── */ function copySectionText(section) {
    return section.items.filter((item)=>item.label || item.detail).map((item)=>item.detail && item.detail !== item.label ? `${item.label}: ${item.detail}` : item.label).join(", ");
}
/* ── helper: map section items to InlineDataRow values ── */ function sectionToInlineValues(section) {
    // All sections: use bracket format "Name (detail)" so color hierarchy
    // renders name as primary (dark) and detail as secondary (lighter)
    // Items without detail just show the label.
    // All items combined into a single row, comma-separated.
    const formatted = section.items.map((item)=>{
        if (item.detail && item.detail !== item.label) {
            return `${item.label} (${item.detail})`;
        }
        return item.label;
    }).filter(Boolean);
    if (formatted.length === 0) return [];
    return [
        {
            key: "",
            value: formatted.join(", ")
        }
    ];
}
function LastVisitCard({ data, onPillTap, onSidebarNav, onCopy }) {
    /* Build section list with dividers */ const sections = data.sections.map((section, sIdx)=>{
        const iconName = SECTION_ICON_MAP[section.tag];
        const values = sectionToInlineValues(section);
        return {
            id: `${section.tag}-${sIdx}`,
            tag: section.tag,
            iconName,
            values,
            notes: section.notes,
            onCopy: ()=>copyText(copySectionText(section)),
            allowCopy: COPYABLE_SECTIONS.has(section.tag)
        };
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx",
            lineNumber: 100,
            columnNumber: 13
        }, void 0),
        tpIconName: "medical-record",
        title: data.visitDate?.trim() ? `Last Visit (${data.visitDate.trim()})` : "Last Visit",
        copyAll: onCopy,
        copyAllTooltip: "Fill last visit data to RxPad",
        collapsible: true,
        dataSources: [
            "EMR Records"
        ],
        actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatPillButton"], {
            label: "Compare previous visit",
            onClick: ()=>onPillTap?.("Compare previous visit")
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx",
            lineNumber: 108,
            columnNumber: 9
        }, void 0),
        sidebarLink: onSidebarNav ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: "See all past visits",
            onClick: ()=>onSidebarNav("pastVisits")
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx",
            lineNumber: 115,
            columnNumber: 11
        }, void 0) : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[8px]",
            children: sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-[2px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                                label: section.tag,
                                icon: section.iconName
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pl-[4px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                                    tag: "",
                                    values: section.values,
                                    onTagClick: ()=>onSidebarNav?.("pastVisits"),
                                    onTagCopy: section.onCopy,
                                    source: "existing",
                                    allowCopyToRxPad: section.allowCopy
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx",
                                    lineNumber: 128,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, this),
                            section.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "pl-1 text-[14px] italic leading-[1.6] text-tp-slate-400",
                                children: section.notes
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx",
                                lineNumber: 139,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx",
                        lineNumber: 125,
                        columnNumber: 13
                    }, this)
                }, section.id, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx",
                    lineNumber: 124,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx",
            lineNumber: 122,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_c = LastVisitCard;
var _c;
__turbopack_context__.k.register(_c, "LastVisitCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SbarOverviewCard",
    ()=>SbarOverviewCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatLastVisitSectionLabel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/formatLastVisitSectionLabel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$highlightClinicalText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/highlightClinicalText.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/formatWithHierarchy.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/sectionInlineKey.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/buildCoreNarrative.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$patientRecommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/patientRecommendations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
// ── Shared helpers ──
const LAB_SHORT_NAMES = {
    "HbA1c": "HbA1c",
    "Fasting Glucose": "F.Glucose",
    "Fasting Blood Sugar": "FBS",
    "TSH": "TSH",
    "LDL": "LDL",
    "HDL": "HDL",
    "Vitamin D": "Vit D",
    "Creatinine": "Creat",
    "Microalbumin": "Microalb",
    "Hemoglobin": "Hb",
    "Triglycerides": "TG",
    "Total Cholesterol": "T.Chol",
    "eGFR": "eGFR",
    "Potassium": "K+",
    "Phosphorus": "Phos",
    "Calcium": "Ca",
    "PTH": "PTH",
    "Uric Acid": "UA",
    "WBC": "WBC",
    "Platelet": "Plt"
};
function shortenLabName(name) {
    return LAB_SHORT_NAMES[name] || name;
}
function parseVitalFlag(key, raw) {
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VITAL_META"].find((m)=>m.key === key);
    if (!meta) return undefined;
    if (key === "bp") {
        const sys = parseInt(raw.split("/")[0], 10);
        if (isNaN(sys)) return undefined;
        if (sys >= 140) return "high";
        if (sys <= 90) return "low";
        return "normal";
    }
    const num = parseFloat(raw);
    if (isNaN(num)) return undefined;
    if (meta.isAbnormal(num)) {
        if (key === "spo2") return "low";
        if (key === "temp") return "high";
        if (key === "bmi") return num > 30 ? "high" : "low";
        return num > 100 ? "high" : "low";
    }
    return "normal";
}
function shortenMedication(raw) {
    const parts = raw.trim().split(/\s+/);
    if (parts.length === 0) return raw;
    const drugName = parts[0];
    if (parts.length > 1 && /^\d+/.test(parts[1]) && !/^\d+-\d+/.test(parts[1])) {
        return `${drugName} ${parts[1]}`;
    }
    return drugName;
}
/** Split by commas but respect parenthetical groups */ function splitRespectingParens(str) {
    const parts = [];
    let depth = 0;
    let current = "";
    for (const ch of str){
        if (ch === "(") depth++;
        else if (ch === ")") depth--;
        if (ch === "," && depth === 0) {
            if (current.trim()) parts.push(current.trim());
            current = "";
        } else {
            current += ch;
        }
    }
    if (current.trim()) parts.push(current.trim());
    return parts;
}
/** Shorten symptom — "Fever (2d, high, evening spikes)" → "Fever (2d)" */ function shortenSymptom(raw) {
    const match = raw.match(/^([^(]+)\(([^,)]+)/);
    if (match) {
        const name = match[1].trim();
        const firstDetail = match[2].trim();
        if (/\d/.test(firstDetail)) return `${name} (${firstDetail})`;
        return name;
    }
    return raw.trim();
}
/**
 * Highlight clinical keywords in recommendation text.
 * Matches vitals (BP, SpO₂, HbA1c), clinical terms, values with units,
 * and action words — wraps them in semibold + darker color.
 */ function highlightRecommendation(text) {
    // Critical / urgent phrases → red; labs, vitals, dialysis context → bold slate
    const criticalPattern = /(\b(?:overdue|critically low|severely elevated|hypertensive urgency|hypotension|critical|urgent|immediately|uncontrolled|acidosis|Hyperkalaemia|Hyperkalemia|Hypokalaemia|Hypokalemia)\b|\bMetabolic acidosis\b)/gi;
    const valuePattern = /(\b(?:BP|SpO[₂2]|HbA1c|eGFR|LDL|HDL|TSH|PTH|Creatinine|Lipid Profile|Hemoglobin|WBC|INR|EPO|K\+|Potassium|Sodium|Na\+|Bicarbonate|Bicarb|PD)\b|K\+\s*\d+(?:\.\d+)?|Bicarb(?:onate)?\s*\d+(?:\.\d+)?|\d+\/\d+(?:\s*mmHg)?|\d+(?:\.\d+)?%|\d+(?:\.\d+)?°F|\d+\s*days?|\d+(?:\.\d+)?\s*mg\/(?:dL|L)|\d+(?:\.\d+)?\s*m[Ll]\/min)/gi;
    const pattern = new RegExp(`(${criticalPattern.source})|(${valuePattern.source})`, "gi");
    const result = [];
    let lastIndex = 0;
    let match;
    while((match = pattern.exec(text)) !== null){
        // Add plain text before match
        if (match.index > lastIndex) {
            result.push(text.slice(lastIndex, match.index));
        }
        // Critical terms in tp-error-600, values in tp-slate-700 bold
        const isCritical = criticalPattern.test(match[0]);
        criticalPattern.lastIndex = 0; // reset regex
        result.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: isCritical ? "font-semibold text-tp-error-600" : "font-semibold text-tp-slate-700",
            children: match[0]
        }, match.index, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this));
        lastIndex = pattern.lastIndex;
    }
    // Add remaining text
    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }
    return result.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: result
    }, void 0, false) : text;
}
/** Build a short last visit summary line */ function buildLastVisitLine(data) {
    if (!data.lastVisit) return null;
    const lv = data.lastVisit;
    return {
        date: lv.date || undefined,
        diagnosis: lv.diagnosis || undefined,
        symptoms: lv.symptoms ? lv.symptoms.split(",").slice(0, 2).map((s)=>shortenSymptom(s.trim())).join(", ") : undefined,
        medication: lv.medication || undefined
    };
}
function buildHistorySegments(data) {
    const segments = [];
    if ((data.chronicConditions?.length ?? 0) > 0) {
        segments.push({
            key: "chronic",
            label: "Chronic",
            items: data.chronicConditions
        });
    }
    if ((data.allergies?.length ?? 0) > 0) {
        segments.push({
            key: "allergies",
            label: "Allergies",
            items: data.allergies
        });
    }
    if ((data.lifestyleNotes?.length ?? 0) > 0) {
        segments.push({
            key: "lifestyle",
            label: "Lifestyle",
            items: data.lifestyleNotes
        });
    }
    if ((data.familyHistory?.length ?? 0) > 0) {
        segments.push({
            key: "family",
            label: "Family history",
            items: data.familyHistory
        });
    }
    if ((data.surgicalHistory?.length ?? 0) > 0) {
        segments.push({
            key: "surgical",
            label: "Surgical history",
            items: data.surgicalHistory
        });
    }
    if ((data.additionalHistory?.length ?? 0) > 0) {
        segments.push({
            key: "other",
            label: "Other",
            items: data.additionalHistory
        });
    }
    return segments;
}
function SbarOverviewCard({ data, onSidebarNav, activeSpecialty }) {
    _s();
    const situation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildCardSituationQuote"])(data, activeSpecialty);
    const historySegments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SbarOverviewCard.useMemo[historySegments]": ()=>buildHistorySegments(data)
    }["SbarOverviewCard.useMemo[historySegments]"], [
        data
    ]);
    // ── Assessment: Vitals ──
    const vitals = data.todayVitals;
    const vitalEntries = [];
    if (vitals) {
        const VITAL_ORDER = [
            "bp",
            "pulse",
            "spo2",
            "temp",
            "weight",
            "rr"
        ];
        for (const k of VITAL_ORDER){
            const raw = vitals[k];
            if (!raw) continue;
            const meta = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VITAL_META"].find((m)=>m.key === k);
            const label = meta?.label || k;
            const unit = meta?.unit || "";
            const flag = parseVitalFlag(k, raw);
            vitalEntries.push({
                key: label,
                value: `${raw}${unit ? " " + unit : ""}`,
                flag
            });
        }
    }
    // ── Assessment: Labs ──
    const labEntries = (data.keyLabs ?? []).slice(0, 4).map((lab)=>({
            key: shortenLabName(lab.name),
            value: `${lab.value}${lab.unit ? " " + lab.unit : ""}`,
            flag: lab.flag
        }));
    // ── Recommendations ──
    const recommendations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$patientRecommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRecommendationsForSummaryCard"])(data);
    // ── Last visit ──
    const lastVisit = buildLastVisitLine(data);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
            lineNumber: 219,
            columnNumber: 13
        }, void 0),
        tpIconName: "stethoscope",
        title: "Patient Summary",
        dataSources: [
            "EMR Records"
        ],
        collapsible: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[8px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[14px] leading-[1.6] text-tp-slate-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-tp-slate-400 select-none",
                            children: '"'
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$highlightClinicalText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["highlightClinicalText"])(situation),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-tp-slate-400 select-none",
                            children: '"'
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this),
                historySegments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "Medical History",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Medical History"] || "medical-record"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px] text-[14px] leading-[1.65]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-[1px] flex list-none flex-col gap-[10px]",
                                children: historySegments.map((seg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-start gap-[6px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-[3px] shrink-0 text-[10px] leading-[18px] text-tp-slate-400",
                                                children: "●"
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                lineNumber: 242,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 break-words",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"],
                                                        children: [
                                                            seg.label,
                                                            ": "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 23
                                                    }, this),
                                                    seg.items.map((item, i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWithHierarchy"])(item, "font-medium text-tp-slate-700", "font-normal text-tp-slate-400"),
                                                                i < arr.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-tp-slate-400",
                                                                    children: " | "
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                                    lineNumber: 248,
                                                                    columnNumber: 50
                                                                }, this)
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 25
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                lineNumber: 243,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, seg.key, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                        lineNumber: 241,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                lineNumber: 239,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 238,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                    lineNumber: 236,
                    columnNumber: 11
                }, this),
                vitalEntries.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "Today's Vitals",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Today's Vitals"] || "Heart Rate"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 262,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                                tag: "",
                                values: vitalEntries,
                                source: "existing",
                                onTagClick: onSidebarNav ? ()=>onSidebarNav("vitals") : undefined
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                lineNumber: 264,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 263,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                    lineNumber: 261,
                    columnNumber: 11
                }, this),
                labEntries.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "Key Labs",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Key Labs"] || "Lab"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 277,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                                tag: "",
                                values: labEntries,
                                source: "existing",
                                onTagClick: onSidebarNav ? ()=>onSidebarNav("lab-results") : undefined
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                lineNumber: 279,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                    lineNumber: 276,
                    columnNumber: 11
                }, this),
                lastVisit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatLastVisitSectionLabel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatLastVisitSectionLabel"])(data.lastVisit?.date),
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Last Visit"] || "medical-report"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 292,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px] text-[14px] leading-[1.65] text-tp-slate-800",
                            children: [
                                lastVisit.symptoms && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"],
                                            children: "Sx: "
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                            lineNumber: 299,
                                            columnNumber: 19
                                        }, this),
                                        lastVisit.symptoms.split(", ").map((s, i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWithHierarchy"])(s.trim(), "text-tp-slate-700", "font-normal text-tp-slate-400"),
                                                    i < arr.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-tp-slate-400",
                                                        children: ", "
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 46
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                lineNumber: 301,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, void 0, true),
                                lastVisit.diagnosis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        lastVisit.symptoms ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mx-[6px] text-tp-slate-200",
                                            children: "|"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                            lineNumber: 310,
                                            columnNumber: 41
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"],
                                            children: "Dx: "
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                            lineNumber: 311,
                                            columnNumber: 19
                                        }, this),
                                        lastVisit.diagnosis.split(", ").map((d, i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWithHierarchy"])(d.trim(), "font-medium text-tp-slate-700", "font-normal text-tp-slate-400"),
                                                    i < arr.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-tp-slate-400",
                                                        children: ", "
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 46
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                lineNumber: 313,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, void 0, true),
                                lastVisit.medication && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        lastVisit.symptoms || lastVisit.diagnosis ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mx-[6px] text-tp-slate-200",
                                            children: "|"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                            lineNumber: 322,
                                            columnNumber: 66
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"],
                                            children: "Rx: "
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                            lineNumber: 323,
                                            columnNumber: 19
                                        }, this),
                                        splitRespectingParens(lastVisit.medication).map((m, i, arr)=>{
                                            const shortened = shortenMedication(m);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWithHierarchy"])(shortened, "text-tp-slate-700", "font-normal text-tp-slate-400"),
                                                    i < arr.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-tp-slate-400",
                                                        children: ", "
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 48
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                lineNumber: 327,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 296,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                    lineNumber: 291,
                    columnNumber: 11
                }, this),
                recommendations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: "Recommendations",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Due Alerts"] || "emergency"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 342,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pl-[4px] text-[14px] leading-[1.65]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-[1px] flex list-none flex-col gap-[10px]",
                                children: recommendations.map((rec, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-start gap-[6px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-[3px] shrink-0 text-[10px] leading-[18px] text-tp-slate-400",
                                                children: "●"
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                lineNumber: 347,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "min-w-0 break-words text-[14px] leading-[1.5] text-tp-slate-600",
                                                children: highlightRecommendation(rec)
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                                lineNumber: 348,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                        lineNumber: 346,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                                lineNumber: 344,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                            lineNumber: 343,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
                    lineNumber: 341,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
            lineNumber: 225,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx",
        lineNumber: 218,
        columnNumber: 5
    }, this);
}
_s(SbarOverviewCard, "/xPC2qyYQupaZl0mLwZP1PJXLtQ=");
_c = SbarOverviewCard;
var _c;
__turbopack_context__.k.register(_c, "SbarOverviewCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/summary/MedicalHistoryCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MedicalHistoryCard",
    ()=>MedicalHistoryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function MedicalHistoryCard({ data, onSidebarNav }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/MedicalHistoryCard.tsx",
            lineNumber: 17,
            columnNumber: 13
        }, void 0),
        tpIconName: "medical-record",
        title: "Medical History",
        collapsible: true,
        dataSources: [
            "EMR Records"
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-[8px]",
                children: data.sections.map((section, i)=>{
                    // Join items as comma-separated string — InlineDataRow's compound renderer
                    // splits by commas and applies renderWithColorHierarchy to each sub-item
                    const values = section.items.length > 0 ? [
                        {
                            key: "",
                            value: section.items.join(", ")
                        }
                    ] : [
                        {
                            key: "",
                            value: "Not recorded"
                        }
                    ];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                                label: section.tag,
                                icon: section.icon
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/MedicalHistoryCard.tsx",
                                lineNumber: 33,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pl-[4px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$InlineDataRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineDataRow"], {
                                    tag: "",
                                    values: values,
                                    onTagClick: ()=>onSidebarNav?.("history"),
                                    source: "existing"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/MedicalHistoryCard.tsx",
                                    lineNumber: 35,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/MedicalHistoryCard.tsx",
                                lineNumber: 34,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/MedicalHistoryCard.tsx",
                        lineNumber: 32,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/MedicalHistoryCard.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            data.insight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-[6px] rounded-[6px] bg-tp-slate-50 px-[8px] py-[5px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[12px] italic leading-[1.5] text-tp-slate-500",
                    children: data.insight
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/MedicalHistoryCard.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/MedicalHistoryCard.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/summary/MedicalHistoryCard.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = MedicalHistoryCard;
var _c;
__turbopack_context__.k.register(_c, "MedicalHistoryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_tp-rxpad_dr-agent_cards_summary_dec3fb7e._.js.map