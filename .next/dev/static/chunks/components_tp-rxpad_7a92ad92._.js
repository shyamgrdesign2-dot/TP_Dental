(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/tp-rxpad/PrintSettingsDrawer.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrintSettingsDrawer",
    ()=>PrintSettingsDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Slide-in Print Settings panel for the End-Visit Rx preview. Modelled on
// TP_Master's print-settings (Inline / List View / Table variants), re-built for
// this project's client-side RxPreviewDocument. Changes update the live preview
// instantly via the `settings` state held by EndVisitPage.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$CloseCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/CloseCircle.js [app-client] (ecmascript) <export default as CloseCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TextalignJustifycenter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextalignJustifycenter$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/TextalignJustifycenter.js [app-client] (ecmascript) <export default as TextalignJustifycenter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$RowVertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RowVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/RowVertical.js [app-client] (ecmascript) <export default as RowVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Grid1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid1$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Grid1.js [app-client] (ecmascript) <export default as Grid1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalChartPrint$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/DentalChartPrint.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const VIEWS = [
    {
        id: "list",
        label: "List View",
        desc: "Each item on its own bulleted line",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$RowVertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RowVertical$3e$__["RowVertical"]
    },
    {
        id: "inline",
        label: "Inline",
        desc: "Items joined compactly on one line",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TextalignJustifycenter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextalignJustifycenter$3e$__["TextalignJustifycenter"]
    },
    {
        id: "table",
        label: "Table",
        desc: "Items laid out in a table grid",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Grid1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid1$3e$__["Grid1"]
    }
];
// How the per-tooth dental examination section is organised on the print.
// "tooth" (default) keeps the existing per-tooth heading layout; "type"
// pivots it so the heading is the category (Past Procedures / Findings /
// Procedures / Overall Teeth Notes) with the teeth that have that kind
// listed underneath. Single source of truth so the on-screen preview and
// the printed page always match.
const GROUP_BY_OPTIONS = [
    {
        id: "type",
        label: "By Type",
        desc: "Each kind is a heading (Past Procedures, Findings, Procedures, Notes) with the teeth listed underneath."
    },
    {
        id: "tooth",
        label: "By Tooth",
        desc: "Each tooth is a heading with its findings, past & planned procedures, and notes underneath."
    }
];
function PrintSettingsDrawer({ open, settings, onChange, onClose, patientId }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PrintSettingsDrawer.useEffect": ()=>{
            if (!open) return;
            const onKey = {
                "PrintSettingsDrawer.useEffect.onKey": (e)=>{
                    if (e.key === "Escape") onClose();
                }
            }["PrintSettingsDrawer.useEffect.onKey"];
            document.addEventListener("keydown", onKey);
            return ({
                "PrintSettingsDrawer.useEffect": ()=>document.removeEventListener("keydown", onKey)
            })["PrintSettingsDrawer.useEffect"];
        }
    }["PrintSettingsDrawer.useEffect"], [
        open,
        onClose
    ]);
    if (!open || typeof document === "undefined") return null;
    const view = settings?.view || "list";
    // Default to "type" — most doctors prefer kind-first scanning on the
    // printed Rx. The toggle below flips back to "tooth" instantly.
    const groupBy = settings?.groupBy === "tooth" ? "tooth" : "type";
    const showChart = settings?.showDentalChart !== false;
    const includeHistorical = settings?.includeHistorical === true;
    // Gate the Include-past toggle off the same data check the Print Dental
    // Chart dropdown uses, so a patient with no chart data sees a disabled
    // toggle (with a tooltip) on every print/preview surface.
    const historyAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalChartPrint$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasHistoricalData"])(patientId);
    // TP blue is the brand colour for clickable/selected/CTA across the app —
    // resolves to #4B4AD5 in CSS. Used everywhere here in place of the older violet.
    const BLUE = "var(--tp-blue-500)";
    const BLUE_BG = "rgba(75,74,213,0.08)";
    const Toggle = ({ on, onClick, disabled })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            onClick: (e)=>{
                e.preventDefault();
                if (!disabled) onClick();
            },
            style: {
                position: "relative",
                width: 40,
                height: 22,
                borderRadius: 999,
                background: on ? BLUE : "#cbd5e1",
                transition: "background 0.15s",
                flexShrink: 0,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: "absolute",
                    top: 2,
                    left: on ? 20 : 2,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.15s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                }
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
            lineNumber: 51,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 9999
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: onClose,
                style: {
                    position: "absolute",
                    inset: 0,
                    background: "rgba(15,23,42,0.35)"
                }
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                style: {
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: "100%",
                    width: 360,
                    maxWidth: "92vw",
                    background: "#fff",
                    boxShadow: "-12px 0 40px rgba(2,6,23,0.22)",
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "Inter, sans-serif"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "18px 20px",
                            borderBottom: "1px solid #e2e8f0"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    margin: 0,
                                    fontSize: 16,
                                    fontWeight: 700,
                                    color: "#1e293b"
                                },
                                children: "Print Settings"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                "aria-label": "Close",
                                style: {
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                    color: "#64748b",
                                    display: "inline-flex"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$CloseCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircle$3e$__["CloseCircle"], {
                                    size: 22,
                                    variant: "Linear"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: 20,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: 22
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            fontWeight: 700,
                                            letterSpacing: "0.4px",
                                            textTransform: "uppercase",
                                            color: "#94a3b8",
                                            marginBottom: 10
                                        },
                                        children: "Layout"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 8
                                        },
                                        children: VIEWS.map((v)=>{
                                            const active = view === v.id;
                                            const Icon = v.icon;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>onChange({
                                                        ...settings,
                                                        view: v.id
                                                    }),
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 12,
                                                    padding: "12px 14px",
                                                    borderRadius: 12,
                                                    cursor: "pointer",
                                                    textAlign: "left",
                                                    background: active ? BLUE_BG : "#fff",
                                                    border: `1.5px solid ${active ? BLUE : "#e2e8f0"}`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            display: "inline-flex",
                                                            color: active ? BLUE : "#64748b"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            size: 20,
                                                            variant: active ? "Bold" : "Linear"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                            lineNumber: 77,
                                                            columnNumber: 96
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                        lineNumber: 77,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            flex: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    display: "block",
                                                                    fontSize: 14,
                                                                    fontWeight: 700,
                                                                    color: active ? BLUE : "#334155"
                                                                },
                                                                children: v.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                                lineNumber: 79,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    display: "block",
                                                                    fontSize: 12,
                                                                    color: "#94a3b8",
                                                                    marginTop: 1
                                                                },
                                                                children: v.desc
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                                lineNumber: 80,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                        lineNumber: 78,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: "50%",
                                                            border: `2px solid ${active ? BLUE : "#cbd5e1"}`,
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        },
                                                        children: active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                width: 8,
                                                                height: 8,
                                                                borderRadius: "50%",
                                                                background: BLUE
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                            lineNumber: 83,
                                                            columnNumber: 33
                                                        }, this) : null
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                        lineNumber: 82,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, v.id, true, {
                                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            fontWeight: 700,
                                            letterSpacing: "0.4px",
                                            textTransform: "uppercase",
                                            color: "#94a3b8",
                                            marginBottom: 10
                                        },
                                        children: "Group dental examination by"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        role: "radiogroup",
                                        "aria-label": "Group dental examination by",
                                        style: {
                                            display: "flex",
                                            gap: 22,
                                            padding: "2px 2px 0"
                                        },
                                        children: GROUP_BY_OPTIONS.map((g)=>{
                                            const active = groupBy === g.id;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                role: "radio",
                                                "aria-checked": active,
                                                onClick: ()=>onChange({
                                                        ...settings,
                                                        groupBy: g.id
                                                    }),
                                                style: {
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                    padding: "4px 0",
                                                    background: "transparent",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    fontFamily: "Inter, sans-serif"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "aria-hidden": true,
                                                        style: {
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: "50%",
                                                            border: `1.75px solid ${active ? BLUE : "#cbd5e1"}`,
                                                            background: "#fff",
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            flexShrink: 0,
                                                            transition: "border-color 0.15s"
                                                        },
                                                        children: active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                width: 7,
                                                                height: 7,
                                                                borderRadius: "50%",
                                                                background: BLUE
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                            lineNumber: 108,
                                                            columnNumber: 33
                                                        }, this) : null
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                        lineNumber: 107,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 14,
                                                            fontWeight: 600,
                                                            color: active ? "#334155" : "#64748b"
                                                        },
                                                        children: g.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                        lineNumber: 110,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, g.id, true, {
                                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                lineNumber: 104,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            margin: "8px 4px 0",
                                            fontSize: 12,
                                            color: "#94a3b8",
                                            lineHeight: 1.4,
                                            fontFamily: "Inter, sans-serif"
                                        },
                                        children: GROUP_BY_OPTIONS.find((g)=>g.id === groupBy)?.desc
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            fontWeight: 700,
                                            letterSpacing: "0.4px",
                                            textTransform: "uppercase",
                                            color: "#94a3b8",
                                            marginBottom: 10
                                        },
                                        children: "Sections"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    gap: 12,
                                                    padding: "12px 14px",
                                                    borderRadius: 12,
                                                    border: "1px solid #e2e8f0",
                                                    cursor: "pointer"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    display: "block",
                                                                    fontSize: 14,
                                                                    fontWeight: 600,
                                                                    color: "#334155"
                                                                },
                                                                children: "Show dental chart"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                                lineNumber: 125,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    display: "block",
                                                                    fontSize: 12,
                                                                    color: "#94a3b8",
                                                                    marginTop: 1
                                                                },
                                                                children: "Include the odontogram in the printout"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                                lineNumber: 126,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                        lineNumber: 124,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toggle, {
                                                        on: showChart,
                                                        onClick: ()=>onChange({
                                                                ...settings,
                                                                showDentalChart: !showChart
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                        lineNumber: 128,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                lineNumber: 123,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                title: historyAvailable ? undefined : "There is no past dental or oral history for this patient.",
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    gap: 12,
                                                    padding: "12px 14px",
                                                    borderRadius: 12,
                                                    border: "1px solid #e2e8f0",
                                                    cursor: historyAvailable ? "pointer" : "not-allowed",
                                                    opacity: historyAvailable ? 1 : 0.55
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    display: "block",
                                                                    fontSize: 14,
                                                                    fontWeight: 600,
                                                                    color: "#334155"
                                                                },
                                                                children: "Include past dental & oral history"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                                lineNumber: 134,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    display: "block",
                                                                    fontSize: 12,
                                                                    color: "#94a3b8",
                                                                    marginTop: 1,
                                                                    lineHeight: 1.4
                                                                },
                                                                children: historyAvailable ? "Adds tooth records and oral examination entries from previous visits. Each tooth shows the date it was last updated." : "There is no past dental or oral history for this patient."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                                lineNumber: 135,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                        lineNumber: 133,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toggle, {
                                                        disabled: !historyAvailable,
                                                        on: includeHistorical && historyAvailable,
                                                        onClick: ()=>onChange({
                                                                ...settings,
                                                                includeHistorical: !includeHistorical
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                        lineNumber: 139,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                                lineNumber: 130,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: "auto",
                            padding: "14px 20px",
                            borderTop: "1px solid #e2e8f0",
                            display: "flex",
                            justifyContent: "flex-end"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            style: {
                                padding: "10px 20px",
                                borderRadius: 10,
                                border: "none",
                                background: BLUE,
                                color: "#fff",
                                fontSize: 14,
                                fontWeight: 700,
                                cursor: "pointer"
                            },
                            children: "Done"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/PrintSettingsDrawer.jsx",
        lineNumber: 57,
        columnNumber: 5
    }, this), document.body);
}
_s(PrintSettingsDrawer, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = PrintSettingsDrawer;
var _c;
__turbopack_context__.k.register(_c, "PrintSettingsDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/EndVisitPage.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionIcon": "EndVisitPage-module-scss-module__kGVa1a__actionIcon",
  "actionLabel": "EndVisitPage-module-scss-module__kGVa1a__actionLabel",
  "actionTile": "EndVisitPage-module-scss-module__kGVa1a__actionTile",
  "actionTileInner": "EndVisitPage-module-scss-module__kGVa1a__actionTileInner",
  "actionTileLeft": "EndVisitPage-module-scss-module__kGVa1a__actionTileLeft",
  "alertAction": "EndVisitPage-module-scss-module__kGVa1a__alertAction",
  "alertCancel": "EndVisitPage-module-scss-module__kGVa1a__alertCancel",
  "alertContent": "EndVisitPage-module-scss-module__kGVa1a__alertContent",
  "alertDesc": "EndVisitPage-module-scss-module__kGVa1a__alertDesc",
  "alertFooter": "EndVisitPage-module-scss-module__kGVa1a__alertFooter",
  "alertTitle": "EndVisitPage-module-scss-module__kGVa1a__alertTitle",
  "avatar": "EndVisitPage-module-scss-module__kGVa1a__avatar",
  "backBtn": "EndVisitPage-module-scss-module__kGVa1a__backBtn",
  "backBtnRule": "EndVisitPage-module-scss-module__kGVa1a__backBtnRule",
  "backIconWrap": "EndVisitPage-module-scss-module__kGVa1a__backIconWrap",
  "chevronBlue": "EndVisitPage-module-scss-module__kGVa1a__chevronBlue",
  "dividerV": "EndVisitPage-module-scss-module__kGVa1a__dividerV",
  "doneBtn": "EndVisitPage-module-scss-module__kGVa1a__doneBtn",
  "dropdownItem": "EndVisitPage-module-scss-module__kGVa1a__dropdownItem",
  "dropdownPanel": "EndVisitPage-module-scss-module__kGVa1a__dropdownPanel",
  "header": "EndVisitPage-module-scss-module__kGVa1a__header",
  "headerInner": "EndVisitPage-module-scss-module__kGVa1a__headerInner",
  "headerLeft": "EndVisitPage-module-scss-module__kGVa1a__headerLeft",
  "headerPillBtn": "EndVisitPage-module-scss-module__kGVa1a__headerPillBtn",
  "headerRight": "EndVisitPage-module-scss-module__kGVa1a__headerRight",
  "iconBtnTutorial": "EndVisitPage-module-scss-module__kGVa1a__iconBtnTutorial",
  "main": "EndVisitPage-module-scss-module__kGVa1a__main",
  "page": "EndVisitPage-module-scss-module__kGVa1a__page",
  "patientMeta": "EndVisitPage-module-scss-module__kGVa1a__patientMeta",
  "patientName": "EndVisitPage-module-scss-module__kGVa1a__patientName",
  "patientRow": "EndVisitPage-module-scss-module__kGVa1a__patientRow",
  "pillBtnLabel": "EndVisitPage-module-scss-module__kGVa1a__pillBtnLabel",
  "previewSection": "EndVisitPage-module-scss-module__kGVa1a__previewSection",
  "sidebar": "EndVisitPage-module-scss-module__kGVa1a__sidebar",
  "sidebarStack": "EndVisitPage-module-scss-module__kGVa1a__sidebarStack",
  "tutorialSvg": "EndVisitPage-module-scss-module__kGVa1a__tutorialSvg",
});
}),
"[project]/components/tp-rxpad/EndVisitPage.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EndVisitPage",
    ()=>EndVisitPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Slide$2f$Slide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Slide/Slide.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowDown2.js [app-client] (ecmascript) <export default as ArrowDown2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentDownload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDownload$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentDownload.js [app-client] (ecmascript) <export default as DocumentDownload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Edit2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Edit2.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$LanguageSquare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LanguageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/LanguageSquare.js [app-client] (ecmascript) <export default as LanguageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ReceiptText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReceiptText$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ReceiptText.js [app-client] (ecmascript) <export default as ReceiptText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Setting2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Setting2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Setting2.js [app-client] (ecmascript) <export default as Setting2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$User$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/User.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown-menu.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/RxPreviewDocument.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$PrintSettingsDrawer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/PrintSettingsDrawer.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$composer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rx-preview-composer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$confirm$2d$dialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-confirm-dialog.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-snackbar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$svg$2d$gb0jbe9ifm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/imports/svg-gb0jbe9ifm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/EndVisitPage.module.scss [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appointment-patients.ts [app-client] (ecmascript)");
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
;
;
const LANGUAGES = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam"
];
function ActionTile({ label, icon, onClick }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
        type: "button",
        onClick: onClick,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionTile,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionTileInner,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionTileLeft,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionIcon,
                            children: icon
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionLabel,
                            children: label
                        })
                    ]
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                    size: 18,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chevronBlue
                })
            ]
        })
    });
}
_c = ActionTile;
function EndVisitPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const patientId = searchParams?.get("patientId") ?? "apt-1";
    const buildRxResumeQuery = ()=>{
        const q = new URLSearchParams();
        q.set("patientId", patientId);
        for (const key of [
            "planId",
            "serviceId",
            "appointmentId",
            "returnTo",
            "ctxTreatment"
        ]){
            const v = searchParams?.get(key);
            if (v) q.set(key, v);
        }
        return q.toString();
    };
    const returnToPlan = ()=>{
        const r = searchParams?.get("returnTo");
        if (r && r.startsWith("/") && !r.startsWith("//")) router.push(r);
        else router.push("/appointments?snackbar=appointment-completed");
    };
    const openDentalPlan = ()=>{
        const q = new URLSearchParams();
        q.set("patientId", patientId);
        q.set("from", "rxpad");
        q.set("planTab", "estimates");
        router.push(`/treatment-plan?${q.toString()}`);
    };
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("English");
    const [snackbarMessage, setSnackbarMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [snackbarOpen, setSnackbarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEditConfirmOpen, setIsEditConfirmOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [previewSnapshot, setPreviewSnapshot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [printSettingsOpen, setPrintSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // includeHistorical defaults OFF — print shows only the CURRENT consultation.
    // Toggling on (via Print Settings) merges past-visit dental + oral records.
    const [printSettings, setPrintSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        view: "list",
        showDentalChart: true,
        includeHistorical: false,
        groupBy: "type"
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EndVisitPage.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const snackbarType = searchParams?.get("snackbar");
            const pendingKey = "tp.snackbar.end-visit";
            if (snackbarType === "visit-ended") {
                window.sessionStorage.setItem(pendingKey, "1");
                const params = new URLSearchParams(searchParams?.toString() ?? "");
                params.delete("snackbar");
                const next = params.toString();
                router.replace(next ? `/rxpad/end-visit?${next}` : "/rxpad/end-visit");
                return;
            }
            if (window.sessionStorage.getItem(pendingKey) === "1") {
                window.sessionStorage.removeItem(pendingKey);
                setSnackbarMessage("Visit ended successfully");
                setSnackbarOpen(true);
            }
        }
    }["EndVisitPage.useEffect"], [
        router,
        searchParams
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EndVisitPage.useEffect": ()=>{
            setPreviewSnapshot((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$composer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComposedRxPreviewSnapshot"])(patientId));
        }
    }["EndVisitPage.useEffect"], [
        patientId
    ]);
    const openEditRxConfirm = ()=>{
        setIsEditConfirmOpen(true);
    };
    const handleConfirmEditRx = ()=>{
        setIsEditConfirmOpen(false);
        router.push(`/rxpad?${buildRxResumeQuery()}`);
    };
    const handleEndVisitBack = ()=>{
        const r = searchParams?.get("returnTo");
        if (r && r.startsWith("/") && !r.startsWith("//")) {
            router.push(r);
            return;
        }
        openEditRxConfirm();
    };
    const patient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EndVisitPage.useMemo[patient]": ()=>{
            const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppointmentPatient"])(patientId);
            return {
                name: p.name,
                gender: p.genderShort,
                age: `${p.age}y`
            };
        }
    }["EndVisitPage.useMemo[patient]"], [
        patientId
    ]);
    const downloadRx = async ()=>{
        const lines = [];
        lines.push("Digital Rx");
        lines.push("");
        if (previewSnapshot) {
            const pushSection = (title, rows)=>{
                if (!rows.length) return;
                lines.push(title);
                rows.forEach((row)=>{
                    const suffix = row.metaParts.length ? ` (${row.metaParts.join(" | ")})` : "";
                    lines.push(`- ${row.title}${suffix}`);
                });
                lines.push("");
            };
            if (previewSnapshot.vitals.length) {
                lines.push("Vitals");
                previewSnapshot.vitals.forEach((row)=>lines.push(`- ${row.label} (${row.unit}): ${row.value}`));
                lines.push("");
            }
            pushSection("Symptoms", previewSnapshot.symptoms);
            pushSection("Examination", previewSnapshot.examinations);
            pushSection("Diagnosis", previewSnapshot.diagnoses);
            pushSection("Lab Investigation", previewSnapshot.labInvestigations);
            pushSection("Medication (Rx)", previewSnapshot.medications);
            pushSection("Advice", previewSnapshot.advice);
            if (previewSnapshot.labResults.length) {
                lines.push("Lab Results (Today)");
                previewSnapshot.labResults.forEach((row)=>lines.push(`- ${row.label} ${row.unit}: ${row.value}`));
                lines.push("");
            }
            if (previewSnapshot.dentalExamination.length) {
                lines.push("Dental Examination");
                previewSnapshot.dentalExamination.forEach((block)=>{
                    lines.push(`- ${block.toothLabel}`);
                    block.treatmentHistory.forEach((item)=>lines.push(`  - Treatment History: ${item.title}${item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : ""}`));
                    block.findings.forEach((item)=>lines.push(`  - Findings: ${item.title}${item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : ""}`));
                    block.procedures.forEach((item)=>lines.push(`  - Procedures: ${item.title}${item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : ""}`));
                    if (block.overallToothNote) {
                        lines.push(`  - Overall Tooth Notes: ${block.overallToothNote}`);
                    }
                });
                lines.push("");
            }
            if (previewSnapshot.followUp) {
                lines.push(`Follow Up: ${previewSnapshot.followUp}`);
            }
            if (previewSnapshot.additionalNotes) {
                lines.push(`Additional Notes: ${previewSnapshot.additionalNotes}`);
            }
        } else {
            lines.push("No Rx data available yet.");
        }
        const blob = new Blob([
            lines.join("\n")
        ], {
            type: "text/plain;charset=utf-8"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "digital-rx.txt";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerInner,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerLeft,
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                                    "aria-label": "Go back",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backBtn,
                                    "data-name": "Back Button",
                                    onClick: handleEndVisitBack,
                                    type: "button",
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                            "aria-hidden": "true",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backBtnRule
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backIconWrap,
                                            "data-name": "Back Arrow",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                color: "#454551",
                                                size: 24,
                                                strokeWidth: 2,
                                                style: {
                                                    opacity: 0.7
                                                }
                                            })
                                        })
                                    ]
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientRow,
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatar,
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$User$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                size: 24,
                                                variant: "Bulk",
                                                color: "var(--tp-slate-600)"
                                            })
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientName,
                                                    children: patient.name
                                                }),
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientMeta,
                                                    children: [
                                                        patient.gender,
                                                        " | ",
                                                        patient.age
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerRight,
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                    type: "button",
                                    "aria-label": "Tutorial",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconBtnTutorial,
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tutorialSvg,
                                        fill: "none",
                                        preserveAspectRatio: "none",
                                        viewBox: "0 0 42 42",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                                            id: "Tutorial",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                                                id: "Union",
                                                opacity: "0.8",
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                                        clipRule: "evenodd",
                                                        d: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$svg$2d$gb0jbe9ifm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].p3172ac80,
                                                        fill: "var(--fill-0, #8A4DBB)",
                                                        fillRule: "evenodd"
                                                    }),
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                                        clipRule: "evenodd",
                                                        d: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$svg$2d$gb0jbe9ifm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].p2ee5cec0,
                                                        fill: "var(--fill-0, #8A4DBB)",
                                                        fillRule: "evenodd"
                                                    })
                                                ]
                                            })
                                        })
                                    })
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dividerV
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                                    type: "button",
                                    onClick: ()=>setPrintSettingsOpen(true),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerPillBtn,
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Setting2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Setting2$3e$__["Setting2"], {
                                            size: 20,
                                            variant: "Linear"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pillBtnLabel,
                                            children: "Print Settings"
                                        })
                                    ]
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                            asChild: true,
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                                                type: "button",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerPillBtn,
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$LanguageSquare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LanguageSquare$3e$__["LanguageSquare"], {
                                                        size: 20,
                                                        variant: "Linear"
                                                    }),
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pillBtnLabel,
                                                        children: language
                                                    }),
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__["ArrowDown2"], {
                                                        size: 18,
                                                        variant: "Linear"
                                                    })
                                                ]
                                            })
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                            align: "end",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dropdownPanel,
                                            children: LANGUAGES.map((lang)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                    onClick: ()=>setLanguage(lang),
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dropdownItem,
                                                    children: lang
                                                }, lang))
                                        })
                                    ]
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                    type: "button",
                                    onClick: returnToPlan,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].doneBtn,
                                    children: "Done"
                                })
                            ]
                        })
                    ]
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("aside", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebar,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebarStack,
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ActionTile, {
                                    label: "Create Bill",
                                    icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ReceiptText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReceiptText$3e$__["ReceiptText"], {
                                        size: 20,
                                        variant: "Linear"
                                    })
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ActionTile, {
                                    label: "Print Digital Rx",
                                    icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                        size: 20,
                                        variant: "Linear"
                                    }),
                                    onClick: ()=>window.print()
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ActionTile, {
                                    label: "Download Digital Rx",
                                    icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentDownload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDownload$3e$__["DocumentDownload"], {
                                        size: 20,
                                        variant: "Linear"
                                    }),
                                    onClick: downloadRx
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ActionTile, {
                                    label: "Edit Digital Rx",
                                    icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Edit2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                        size: 20,
                                        variant: "Linear"
                                    }),
                                    onClick: openEditRxConfirm
                                })
                            ]
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$EndVisitPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].previewSection,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RxPreviewDocument"], {
                            snapshot: previewSnapshot,
                            settings: printSettings
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$PrintSettingsDrawer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrintSettingsDrawer"], {
                        open: printSettingsOpen,
                        settings: printSettings,
                        onChange: setPrintSettings,
                        onClose: ()=>setPrintSettingsOpen(false),
                        patientId: patientId
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$confirm$2d$dialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPConfirmDialog"], {
                open: isEditConfirmOpen,
                onOpenChange: setIsEditConfirmOpen,
                title: "Are you sure you want to edit this?",
                warning: "Going back reopens this visit for editing. You can save and end it again once you're done.",
                secondaryLabel: "Yes, Edit Rx",
                secondaryTone: "destructive",
                onSecondary: handleConfirmEditRx,
                primaryLabel: "No, Stay Here"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPSnackbar"], {
                open: snackbarOpen,
                message: snackbarMessage ?? "",
                severity: "success",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center"
                },
                TransitionComponent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Slide$2f$Slide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                TransitionProps: {
                    direction: "down"
                },
                autoHideDuration: 1800,
                onClose: (_, reason)=>{
                    if (reason === "clickaway") return;
                    setSnackbarOpen(false);
                    setSnackbarMessage(null);
                }
            })
        ]
    });
}
_s(EndVisitPage, "Lf1mAVnKhKTgmntFpIztIf9paFg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c1 = EndVisitPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "ActionTile");
__turbopack_context__.k.register(_c1, "EndVisitPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_tp-rxpad_7a92ad92._.js.map