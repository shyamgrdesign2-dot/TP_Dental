module.exports = [
"[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DDXCard",
    ()=>DDXCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const BUCKET_CONFIG = {
    cant_miss: {
        label: "CAN'T MISS",
        borderColor: "#EF4444",
        bgColor: "rgba(239, 68, 68, 0.04)",
        labelColor: "#DC2626",
        checkColor: "#EF4444"
    },
    most_likely: {
        label: "MOST LIKELY",
        borderColor: "#4B4AD5",
        bgColor: "rgba(75, 74, 213, 0.04)",
        labelColor: "#3C3BB5",
        checkColor: "#4B4AD5"
    },
    consider: {
        label: "EXTENDED",
        borderColor: "#94A3B8",
        bgColor: "rgba(148, 163, 184, 0.04)",
        labelColor: "#64748B",
        checkColor: "#94A3B8"
    }
};
const BUCKET_ORDER = [
    "cant_miss",
    "most_likely",
    "consider"
];
function CustomCheckbox({ checked, color, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>onChange(!checked),
        className: "flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[4px] border-[1.5px] transition-all",
        style: {
            borderColor: checked ? color : "#CBD5E1",
            backgroundColor: checked ? color : "transparent"
        },
        children: checked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "10",
            height: "10",
            viewBox: "0 0 16 16",
            fill: "none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3.5 8.5L6.5 11.5L12.5 4.5",
                stroke: "white",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                lineNumber: 67,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
            lineNumber: 66,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
function DDXCard({ data, onAccept, onCopyToDiagnosis, onCopyToRxPad, onSendCannedMessage }) {
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        const init = {};
        data.options.forEach((opt)=>{
            init[opt.name] = opt.selected ?? false;
        });
        return init;
    });
    const handleToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((name, checked)=>{
        setSelected((prev)=>{
            const next = {
                ...prev,
                [name]: checked
            };
            if (onAccept) {
                const selectedNames = Object.entries(next).filter(([, v])=>v).map(([k])=>k);
                onAccept(selectedNames);
            }
            return next;
        });
    }, [
        onAccept
    ]);
    const grouped = BUCKET_ORDER.map((bucket)=>({
            bucket,
            items: data.options.filter((o)=>o.bucket === bucket)
        })).filter((g)=>g.items.length > 0);
    const selectedCount = Object.values(selected).filter(Boolean).length;
    // Parse reasoning basis (pipe-separated)
    const contextParts = data.context.split(/[,;·|]/).map((s)=>s.trim()).filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
            lineNumber: 111,
            columnNumber: 13
        }, void 0),
        tpIconName: "Diagnosis",
        title: "Differential Diagnosis",
        date: "Ranked by clinical probability",
        dataSources: [
            "AI-Generated"
        ],
        copyAll: ()=>{
            const selectedNames = Object.entries(selected).filter(([, v])=>v).map(([k])=>k);
            onCopyToDiagnosis?.(selectedNames);
        },
        copyAllTooltip: "Fill selected diagnoses to RxPad",
        actions: selectedCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatPillButton"], {
                    label: `Generate cascade (${selectedCount})`,
                    onClick: ()=>{
                        const selectedNames = Object.entries(selected).filter(([, v])=>v).map(([k])=>k);
                        onSendCannedMessage?.(`Generate cascade for: ${selectedNames.join(", ")}`);
                    }
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                    lineNumber: 126,
                    columnNumber: 13
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatPillButton"], {
                    label: "Suggest investigations",
                    onClick: ()=>onSendCannedMessage?.("Suggest investigations")
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                    lineNumber: 135,
                    columnNumber: 13
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatPillButton"], {
                    label: "Compare with history",
                    onClick: ()=>onSendCannedMessage?.("Compare with history")
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                    lineNumber: 139,
                    columnNumber: 13
                }, void 0)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[14px] text-tp-slate-400 italic px-1",
            children: "Select a diagnosis to see suggestions"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
            lineNumber: 145,
            columnNumber: 11
        }, void 0),
        sidebarLink: selectedCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: `Fill selected to RxPad (${selectedCount})`,
            onClick: ()=>{
                const selectedNames = Object.entries(selected).filter(([, v])=>v).map(([k])=>k);
                onCopyToRxPad?.(selectedNames);
            }
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
            lineNumber: 152,
            columnNumber: 11
        }, void 0) : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-[10px] rounded-[8px] bg-tp-slate-50 px-3 py-[6px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[14px] leading-[1.6] text-tp-slate-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium text-tp-slate-600",
                            children: "Reasoning basis:"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this),
                        " ",
                        contextParts.map((part, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mx-[6px] text-tp-slate-200",
                                        children: "|"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                                        lineNumber: 170,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: part
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-[10px]",
                children: grouped.map((group)=>{
                    const cfg = BUCKET_CONFIG[group.bucket];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden rounded-[8px]",
                        style: {
                            border: `1px solid ${cfg.borderColor}20`,
                            borderLeftWidth: 3,
                            borderLeftColor: cfg.borderColor,
                            backgroundColor: cfg.bgColor
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 pt-[8px] pb-[2px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[12px] font-semibold tracking-wider",
                                    style: {
                                        color: cfg.labelColor
                                    },
                                    children: cfg.label
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                                    lineNumber: 194,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                                lineNumber: 193,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 pb-[8px]",
                                children: group.items.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex cursor-pointer items-center gap-[8px] py-[6px]",
                                        style: {
                                            borderBottom: i < group.items.length - 1 ? `1px solid ${cfg.borderColor}10` : undefined
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomCheckbox, {
                                                checked: selected[opt.name] ?? false,
                                                color: cfg.checkColor,
                                                onChange: (checked)=>handleToggle(opt.name, checked)
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                                                lineNumber: 214,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[14px] text-tp-slate-800",
                                                children: opt.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                                                lineNumber: 219,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, opt.name, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                                        lineNumber: 205,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                                lineNumber: 203,
                                columnNumber: 15
                            }, this)
                        ]
                    }, group.bucket, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                        lineNumber: 182,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProtocolMedsCard",
    ()=>ProtocolMedsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-touch-device.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function ProtocolMedsCard({ data, onCopy, onCopySingle }) {
    const isTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTouchDevice"])();
    const isSafe = !data.safetyCheck.toLowerCase().includes("warning") && !data.safetyCheck.toLowerCase().includes("caution") && !data.safetyCheck.toLowerCase().includes("alert");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
            lineNumber: 34,
            columnNumber: 13
        }, void 0),
        tpIconName: "pill",
        title: "Suggested Rx",
        copyAll: ()=>onCopy?.(data.copyPayload),
        copyAllTooltip: "Fill medications to RxPad",
        dataSources: [
            "AI-Generated",
            "Clinical Guidelines"
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 rounded-[6px] bg-tp-slate-50 px-2.5 py-[4px] text-[14px] text-tp-slate-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium text-tp-slate-600",
                        children: "For:"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    " ",
                    data.diagnosis
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mb-2 flex items-center gap-1 text-[14px] font-medium", isSafe ? "text-tp-success-600" : "text-tp-warning-600"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: isSafe ? "\u2713" : "!"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: data.safetyCheck
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-0",
                children: data.meds.map((med, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("group/med flex items-start gap-2 py-[5px]"),
                        style: i < data.meds.length - 1 ? {
                            borderBottom: "0.5px solid var(--tp-slate-50, #F8FAFC)"
                        } : undefined,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[14px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "font-medium text-tp-slate-800",
                                                children: med.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                                                lineNumber: 71,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-1 text-tp-slate-500",
                                                children: med.dosage
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[14px] text-tp-slate-400",
                                        children: [
                                            med.timing,
                                            " · ",
                                            med.duration,
                                            med.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-1 italic",
                                                children: med.notes
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                                                lineNumber: 81,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                size: 12,
                                onClick: ()=>onCopySingle?.(med.name),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-[2px] transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/med:opacity-100")
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        ]
                    }, `${med.name}-${i}`, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/action/InvestigationCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvestigationCard",
    ()=>InvestigationCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ClipboardTick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardTick$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ClipboardTick.js [app-ssr] (ecmascript) <export default as ClipboardTick>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CheckboxRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CheckboxRow.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function InvestigationCard({ data, onCopy, onPillTap }) {
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        const init = {};
        data.items.forEach((item)=>{
            init[item.name] = item.selected ?? false;
        });
        return init;
    });
    const handleToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((name, checked)=>{
        setSelected((prev)=>({
                ...prev,
                [name]: checked
            }));
    }, []);
    const selectedCount = Object.values(selected).filter(Boolean).length;
    const selectedNames = Object.entries(selected).filter(([, v])=>v).map(([k])=>k);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/InvestigationCard.tsx",
            lineNumber: 49,
            columnNumber: 13
        }, void 0),
        tpIconName: "Lab",
        title: `Investigations — ${data.title}`,
        copyAll: ()=>{
            // Copy only selected investigations (or all if none selected)
            const names = selectedCount > 0 ? selectedNames : data.items.map((i)=>i.name);
            navigator.clipboard?.writeText(names.join("\n"));
        },
        copyAllTooltip: selectedCount > 0 ? `Fill ${selectedCount} selected to RxPad` : "Fill all to RxPad",
        dataSources: [
            "AI-Generated"
        ],
        sidebarLink: selectedCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: `Fill selected to RxPad (${selectedCount})`,
            onClick: ()=>onCopy?.(data.copyPayload),
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ClipboardTick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardTick$3e$__["ClipboardTick"], {
                size: 14,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/InvestigationCard.tsx",
                lineNumber: 66,
                columnNumber: 23
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/InvestigationCard.tsx",
            lineNumber: 62,
            columnNumber: 11
        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: "Fill all to RxPad",
            onClick: ()=>onCopy?.(data.copyPayload),
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ClipboardTick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardTick$3e$__["ClipboardTick"], {
                size: 14,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/InvestigationCard.tsx",
                lineNumber: 73,
                columnNumber: 23
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/InvestigationCard.tsx",
            lineNumber: 69,
            columnNumber: 11
        }, void 0),
        children: data.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CheckboxRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CheckboxRow"], {
                label: item.name,
                rationale: item.rationale,
                checked: selected[item.name] ?? false,
                onChange: (checked)=>handleToggle(item.name, checked),
                isLast: i === data.items.length - 1
            }, item.name, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/InvestigationCard.tsx",
                lineNumber: 79,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/InvestigationCard.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/action/FollowUpCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FollowUpCard",
    ()=>FollowUpCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
// InsightBox removed
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function FollowUpCard({ data, onSelect, onCopyToFollowUp }) {
    // Find recommended option for the insight box
    const recommended = data.options.find((o)=>o.recommended);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/FollowUpCard.tsx",
            lineNumber: 23,
            columnNumber: 13
        }, void 0),
        tpIconName: "medical-record",
        title: "Suggested Follow-Up",
        copyAll: recommended ? ()=>onCopyToFollowUp?.(recommended.days, recommended.label) : undefined,
        copyAllTooltip: "Fill follow-up to RxPad",
        dataSources: [
            "AI-Generated"
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-2 text-[14px] leading-[1.5] text-tp-slate-400",
                children: data.context
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/FollowUpCard.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1.5",
                children: data.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatPillButton"], {
                        label: option.label,
                        onClick: ()=>onSelect?.(option.days)
                    }, option.days, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/FollowUpCard.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/FollowUpCard.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/FollowUpCard.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdviceCard",
    ()=>AdviceCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-touch-device.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Share$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Share.js [app-ssr] (ecmascript) <export default as Share>");
"use client";
;
;
;
;
;
;
;
;
function AdviceCard({ data, onCopy, onPillTap }) {
    const isTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTouchDevice"])();
    const [copiedIndex, setCopiedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleCopyItem = (item, index)=>{
        navigator.clipboard?.writeText(item);
        setCopiedIndex(index);
        setTimeout(()=>setCopiedIndex(null), 1200);
    };
    const handleShare = ()=>{
        if (typeof navigator !== "undefined" && navigator.share) {
            navigator.share({
                text: data.shareMessage
            }).catch(()=>{});
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx",
            lineNumber: 43,
            columnNumber: 13
        }, void 0),
        tpIconName: "clipboard-activity",
        title: data.title,
        copyAll: ()=>onCopy?.(data.copyPayload),
        copyAllTooltip: "Fill advice to RxPad",
        dataSources: [
            "AI-Generated"
        ],
        collapsible: true,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: "Share via WhatsApp",
            onClick: handleShare,
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Share$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share$3e$__["Share"], {
                size: 14,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx",
                lineNumber: 52,
                columnNumber: 96
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx",
            lineNumber: 52,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "flex flex-col gap-[2px]",
            children: data.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: "group/advice-item flex items-start gap-[6px] rounded-[4px] px-1 -mx-1 py-[3px] text-[14px] leading-[1.6] text-tp-slate-700 transition-colors hover:bg-tp-slate-50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mt-[1px] flex-shrink-0 text-tp-slate-400",
                            children: "•"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex-1",
                            children: item
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex-shrink-0 transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/advice-item:opacity-100"),
                            children: copiedIndex === i ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[14px] text-tp-success-500 font-medium",
                                children: "Copied"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx",
                                lineNumber: 65,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                size: 14,
                                onClick: ()=>handleCopyItem(item, i)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx",
                                lineNumber: 67,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceStructuredRxCard",
    ()=>VoiceStructuredRxCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-touch-device.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$voice$2d$rx$2d$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/engines/voice-rx-engine.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$DrAgentRuntimeContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/DrAgentRuntimeContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$use$2d$chart$2d$linked$2d$patient$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/use-chart-linked-patient-id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$emit$2d$dental$2d$scan$2d$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dental-ai/emit-dental-scan-apply.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$MiniToothCanvas$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/MiniToothCanvas.jsx [app-ssr] (ecmascript)");
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
;
function VoiceStructuredRxCard({ data, onCopy }) {
    const { dentalChartPatientId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$DrAgentRuntimeContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDrAgentRuntime"])();
    const chartPatientId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$use$2d$chart$2d$linked$2d$patient$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChartLinkedPatientId"])(dentalChartPatientId);
    const isTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTouchDevice"])();
    const [copiedKey, setCopiedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const teeth = data.dentalTeeth ?? [];
    const teethForCards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>teeth.filter(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dentalScanToothHasAgentCardContent"]), [
        teeth
    ]);
    const examinationLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>teethForCards.map((t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDentalExaminationLine"])(t)), [
        teethForCards
    ]);
    const clinical = data.clinicalExam;
    const orderedPrimary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$voice$2d$rx$2d$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortPrimaryVoiceSections"])(data.sections), [
        data.sections
    ]);
    const handleCopyAllToRxPad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!onCopy) return;
        const base = {
            ...data.copyAllPayload,
            sourceDateLabel: "Voice capture"
        };
        if (teethForCards.length) {
            onCopy({
                ...base,
                examinations: examinationLines.length ? examinationLines : base.examinations,
                dentalScanApply: {
                    patientId: chartPatientId,
                    teeth: teethForCards
                }
            });
        } else {
            onCopy(base);
        }
    }, [
        data.copyAllPayload,
        chartPatientId,
        examinationLines,
        onCopy,
        teethForCards
    ]);
    const handleCopyOneTooth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((t)=>{
        onCopy?.({
            sourceDateLabel: `Voice capture · T${t.fdi}`,
            examinations: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDentalExaminationLine"])(t)
            ],
            dentalScanApply: {
                patientId: chartPatientId,
                teeth: [
                    t
                ]
            }
        });
    }, [
        chartPatientId,
        onCopy
    ]);
    const handleCopyClipboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((text, key)=>{
        navigator.clipboard?.writeText(text);
        setCopiedKey(key);
        setTimeout(()=>setCopiedKey(null), 1200);
    }, []);
    const handleCopySectionLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((lines, key)=>{
        navigator.clipboard?.writeText(lines.join("\n"));
        setCopiedKey(key);
        setTimeout(()=>setCopiedKey(null), 1200);
    }, []);
    const handleMergeFindingToDental = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((fdi, finding)=>{
        if (!chartPatientId) return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$emit$2d$dental$2d$scan$2d$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["emitDentalScanApplyNormalized"])({
            patientId: chartPatientId,
            teeth: [
                {
                    fdi,
                    findings: [
                        finding
                    ]
                }
            ],
            openFullDentition: false,
            focusFdi: fdi,
            highlightFdis: [
                fdi
            ]
        });
    }, [
        chartPatientId
    ]);
    const handleCopyItem = (sectionId, item, key)=>{
        const line = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$voice$2d$rx$2d$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatVoiceRxItemPublic"])(item);
        if (onCopy) {
            const base = {
                sourceDateLabel: "Voice capture"
            };
            if (sectionId === "symptoms") onCopy({
                ...base,
                symptoms: [
                    line
                ]
            });
            else if (sectionId === "medication") onCopy({
                ...base,
                medications: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$voice$2d$rx$2d$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseMedString"])(line)
                ]
            });
            else if (sectionId === "investigation") onCopy({
                ...base,
                labInvestigations: [
                    line
                ]
            });
        } else {
            navigator.clipboard?.writeText(line);
        }
        setCopiedKey(key);
        setTimeout(()=>setCopiedKey(null), 1400);
    };
    const handleCopySection = (section)=>{
        const lines = section.items.map(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$voice$2d$rx$2d$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatVoiceRxItemPublic"]);
        if (onCopy) {
            const base = {
                sourceDateLabel: "Voice capture"
            };
            if (section.sectionId === "symptoms") onCopy({
                ...base,
                symptoms: lines
            });
            else if (section.sectionId === "medication") onCopy({
                ...base,
                medications: lines.map(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$voice$2d$rx$2d$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseMedString"])
            });
            else if (section.sectionId === "investigation") onCopy({
                ...base,
                labInvestigations: lines
            });
        } else {
            navigator.clipboard?.writeText(lines.join("\n"));
        }
        setCopiedKey(`section-${section.sectionId}`);
        setTimeout(()=>setCopiedKey(null), 1400);
    };
    const structuredClinical = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-[8px]",
        children: orderedPrimary.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                        label: section.title,
                        icon: section.tpIconName,
                        trailing: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/section-header:opacity-100"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                                label: `Fill ${section.title.toLowerCase()} to RxPad`,
                                onAction: ()=>handleCopySection(section),
                                children: copiedKey === `section-${section.sectionId}` ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[12px] font-semibold text-emerald-600",
                                    children: "In RxPad"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                                    lineNumber: 143,
                                    columnNumber: 23
                                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                    size: 14,
                                    onClick: ()=>handleCopySection(section)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                                    lineNumber: 145,
                                    columnNumber: 23
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                                lineNumber: 138,
                                columnNumber: 19
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                            lineNumber: 137,
                            columnNumber: 17
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                        lineNumber: 133,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-1 flex flex-col gap-[2px] pl-1",
                        children: section.items.map((item, idx)=>{
                            const itemKey = `${section.sectionId}-${idx}`;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "group/voice-item flex items-start gap-[6px] rounded-[4px] px-1 -mx-1 py-[2px] text-[14px] leading-[1.6] text-tp-slate-700 transition-colors hover:bg-tp-slate-50/80",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-[1px] flex-shrink-0 text-tp-slate-400",
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                                        lineNumber: 159,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1 font-normal text-tp-slate-700",
                                        children: [
                                            item.name,
                                            item.detail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-1 text-tp-slate-400",
                                                children: [
                                                    "(",
                                                    item.detail,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                                                lineNumber: 163,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                                        lineNumber: 160,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex-shrink-0 transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/voice-item:opacity-100"),
                                        children: copiedKey === itemKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[12px] font-semibold text-emerald-600",
                                            children: "In RxPad"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                                            lineNumber: 168,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                                            label: "Fill to RxPad",
                                            onAction: ()=>handleCopyItem(section.sectionId, item, itemKey),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                                size: 14,
                                                onClick: ()=>handleCopyItem(section.sectionId, item, itemKey)
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                                                lineNumber: 171,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                                            lineNumber: 170,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                                        lineNumber: 166,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, idx, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                                lineNumber: 155,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                        lineNumber: 151,
                        columnNumber: 13
                    }, this)
                ]
            }, section.sectionId, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                lineNumber: 132,
                columnNumber: 11
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
    const dentalBlock = teethForCards.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex w-full min-w-0 flex-col gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                label: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DENTAL_EXAMINATION"],
                icon: "tooth",
                marginBottom: false
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                lineNumber: 187,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full min-w-0 flex-col gap-2.5",
                children: teethForCards.map((t)=>{
                    const toothDef = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEETH"].find((x)=>x.fdi === t.fdi);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                            lineNumber: 194,
                            columnNumber: 21
                        }, void 0),
                        title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toothDisplayName"])(t.fdi) ?? `Tooth ${t.fdi}`,
                        badgeBelowTitle: true,
                        badge: {
                            label: `T${t.fdi}`,
                            color: "var(--tp-slate-700,#334155)",
                            bg: "var(--tp-slate-100,#F1F5F9)"
                        },
                        leadingVisual: toothDef ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$MiniToothCanvas$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniToothCanvas"], {
                            tooth: toothDef,
                            size: 40,
                            diagnoses: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toothDiagnosisSet"])(t),
                            isImplant: !!t.implant,
                            findings: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dentalScanToCanvasFindings"])(t.findings)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                            lineNumber: 204,
                            columnNumber: 19
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] text-tp-slate-400",
                            children: "—"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                            lineNumber: 212,
                            columnNumber: 19
                        }, void 0),
                        collapsible: true,
                        defaultCollapsed: true,
                        collapseIcon: "chevron",
                        largeCollapseControl: true,
                        copyAll: ()=>handleCopyOneTooth(t),
                        copyAllTooltip: `Apply T${t.fdi} to ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DENTAL_EXAMINATION"]}`,
                        pinnedBody: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DentalExaminationToothBlock"], {
                            variant: "stacked",
                            stackedPart: "preview",
                            tooth: t,
                            copiedKey: copiedKey,
                            onCopyClipboard: handleCopyClipboard,
                            onCopySectionLines: handleCopySectionLines,
                            onApplyToothToRxPad: handleCopyOneTooth,
                            isTouch: isTouch,
                            onMergeFindingToDental: handleMergeFindingToDental
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                            lineNumber: 222,
                            columnNumber: 17
                        }, void 0),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DentalExaminationToothBlock"], {
                            variant: "stacked",
                            stackedPart: "details",
                            tooth: t,
                            copiedKey: copiedKey,
                            onCopyClipboard: handleCopyClipboard,
                            onCopySectionLines: handleCopySectionLines,
                            onApplyToothToRxPad: handleCopyOneTooth,
                            isTouch: isTouch,
                            onMergeFindingToDental: handleMergeFindingToDental,
                            emptyBodyHint: "No tooth-level lines were parsed from this dictation."
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                            lineNumber: 235,
                            columnNumber: 15
                        }, this)
                    }, t.fdi, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                        lineNumber: 192,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
                lineNumber: 188,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
        lineNumber: 186,
        columnNumber: 7
    }, this) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
            lineNumber: 256,
            columnNumber: 13
        }, void 0),
        tpIconName: "medical-record",
        title: clinical?.title ?? "Voice recorder",
        date: clinical?.subtitle,
        collapsible: false,
        copyAll: handleCopyAllToRxPad,
        copyAllTooltip: teethForCards.length ? `Apply structured Rx and all ${teethForCards.length} teeth to RxPad / ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DENTAL_EXAMINATION"]}` : "Apply voice capture to RxPad",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                structuredClinical,
                dentalBlock
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
            lineNumber: 268,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/action/MedicalRecordsUploadCtaCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MedicalRecordsUploadCtaCard",
    ()=>MedicalRecordsUploadCtaCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentUpload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentUpload$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentUpload.js [app-ssr] (ecmascript) <export default as DocumentUpload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function MedicalRecordsUploadCtaCard({ data, onAddRecords }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentUpload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentUpload$3e$__["DocumentUpload"], {
            size: 15,
            variant: "Bulk",
            className: "text-[var(--tp-blue-500,#4B4AD5)]",
            "aria-hidden": true
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/MedicalRecordsUploadCtaCard.tsx",
            lineNumber: 21,
            columnNumber: 9
        }, void 0),
        title: "Medical records",
        collapsible: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onAddRecords,
            "aria-label": `Open medical records for ${data.patientLabel}`,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex w-full items-center gap-2.5 rounded-[10px] px-2 py-2.5 text-left transition-colors", "text-[14px] font-semibold text-tp-slate-800 hover:bg-tp-slate-50/90"),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentUpload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentUpload$3e$__["DocumentUpload"], {
                    size: 20,
                    variant: "Linear",
                    color: "var(--tp-blue-600, #4B4AD5)",
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/MedicalRecordsUploadCtaCard.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                "Medical records"
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/MedicalRecordsUploadCtaCard.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/MedicalRecordsUploadCtaCard.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RxPreviewCard",
    ()=>RxPreviewCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/formatWithHierarchy.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Printer.js [app-ssr] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Share$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Share.js [app-ssr] (ecmascript) <export default as Share>");
"use client";
;
;
;
;
;
;
;
function Section({ label, items }) {
    if (items.length === 0) return null;
    const iconName = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"][label];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-[6px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-[5px] rounded-[4px] bg-tp-slate-50 px-2 py-[3px] mb-[4px]",
                children: [
                    iconName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                        name: iconName,
                        variant: "bulk",
                        size: 12,
                        color: "var(--tp-slate-500, #64748B)"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-1 text-[12px] font-medium text-tp-slate-600",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "flex flex-col gap-[2px] pl-1",
                children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex items-start gap-[6px] px-1 py-[2px] text-[14px] leading-[1.6] text-tp-slate-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-[1px] flex-shrink-0 text-tp-slate-400",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-1",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatWithHierarchy"])(item)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
function RxPreviewCard({ data, onPillTap }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
            lineNumber: 51,
            columnNumber: 13
        }, void 0),
        tpIconName: "clipboard-activity",
        title: "Prescription Preview",
        date: data.date,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTAGroup"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
                    label: "Print prescription",
                    tone: "secondary",
                    fullWidth: true,
                    iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                        size: 14,
                        variant: "Linear"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                        lineNumber: 58,
                        columnNumber: 86
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                    lineNumber: 58,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
                    label: "Share digitally",
                    tone: "secondary",
                    fullWidth: true,
                    iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Share$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share$3e$__["Share"], {
                        size: 14,
                        variant: "Linear"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                        lineNumber: 59,
                        columnNumber: 83
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
            lineNumber: 57,
            columnNumber: 9
        }, void 0),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-[8px] rounded-[6px] bg-tp-slate-50 px-2.5 py-[4px] text-[14px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium text-tp-slate-600",
                        children: "Patient:"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-tp-slate-800",
                        children: data.patientName
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                label: "Diagnoses",
                items: data.diagnoses
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                label: "Medications",
                items: data.medications
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                label: "Investigations",
                items: data.investigations
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                label: "Advice",
                items: data.advice
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            data.followUp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-[5px] rounded-[4px] bg-tp-slate-50 px-2 py-[3px] mb-[4px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                                name: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Follow-up"] ?? "medical-record",
                                variant: "bulk",
                                size: 12,
                                color: "var(--tp-slate-500, #64748B)"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-1 text-[12px] font-medium text-tp-slate-600",
                                children: "Follow-up"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] leading-[1.6] pl-[10px]",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatWithHierarchy"])(data.followUp)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_tp-rxpad_dr-agent_cards_action_efa25887._.js.map