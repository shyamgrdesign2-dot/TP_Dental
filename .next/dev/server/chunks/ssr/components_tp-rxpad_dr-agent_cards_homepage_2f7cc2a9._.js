module.exports = [
"[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PatientListCard",
    ()=>PatientListCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
"use client";
;
;
const TONE_COLORS = {
    warning: {
        bg: "#FEF6E7",
        color: "#C6850C"
    },
    success: {
        bg: "#EDF8F1",
        color: "#1B8C54"
    },
    info: {
        bg: "#EEF3FC",
        color: "#3B6FE0"
    },
    danger: {
        bg: "#FDEDED",
        color: "#C42B2B"
    }
};
function PatientListCard({ data, onPillTap }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx",
            lineNumber: 19,
            columnNumber: 13
        }, void 0),
        tpIconName: "clipboard-activity",
        title: data.title,
        badge: {
            label: `${data.totalCount}`,
            color: "#6D28D9",
            bg: "#EDE9FE"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-[4px]",
                children: data.items.map((item, i)=>{
                    const tone = TONE_COLORS[item.statusTone];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-[8px] rounded-[8px] bg-tp-slate-50 px-[8px] py-[5px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-tp-slate-200 text-[12px] font-semibold text-tp-slate-600",
                                children: item.name.charAt(0).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate text-[14px] font-semibold text-tp-slate-800",
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx",
                                        lineNumber: 33,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-tp-slate-400",
                                        children: [
                                            item.gender,
                                            "/",
                                            item.age,
                                            "y · ",
                                            item.time
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx",
                                        lineNumber: 34,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx",
                                lineNumber: 32,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-[4px] px-[6px] py-[1px] text-[12px] font-semibold",
                                style: {
                                    background: tone.bg,
                                    color: tone.color
                                },
                                children: item.status
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx",
                                lineNumber: 36,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            data.totalCount > data.items.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-[6px] text-center text-[12px] text-tp-blue-500 cursor-pointer hover:underline",
                children: [
                    "View all ",
                    data.totalCount,
                    " patients"
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FollowUpListCard",
    ()=>FollowUpListCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Calendar2.js [app-ssr] (ecmascript) <export default as Calendar2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$NotificationBing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__NotificationBing$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/NotificationBing.js [app-ssr] (ecmascript) <export default as NotificationBing>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function FollowUpListCard({ data, onPillTap }) {
    const [disabledItems, setDisabledItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [allDisabled, setAllDisabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSendAll = ()=>{
        setAllDisabled(true);
        setDisabledItems(new Set(data.items.map((_, i)=>i)));
        onPillTap?.("Send reminder to all");
    };
    const handleSendItem = (index, name)=>{
        setDisabledItems((prev)=>new Set(prev).add(index));
        onPillTap?.(`Send reminder to ${name}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__["Calendar2"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
            lineNumber: 27,
            columnNumber: 13
        }, void 0),
        title: data.title,
        badge: data.overdueCount > 0 ? {
            label: `${data.overdueCount} overdue`,
            color: "#DC2626",
            bg: "#FEE2E2"
        } : undefined,
        sidebarLink: data.items.length > 0 && !allDisabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: `Send reminder to all (${data.items.length})`,
            onClick: handleSendAll,
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$NotificationBing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__NotificationBing$3e$__["NotificationBing"], {
                size: 14,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
                lineNumber: 36,
                columnNumber: 23
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
            lineNumber: 32,
            columnNumber: 11
        }, void 0) : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-[5px]",
            children: data.items.map((item, i)=>{
                const isDisabled = disabledItems.has(i);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-[8px] rounded-[8px] bg-tp-slate-50 px-[8px] py-[6px] transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-[4px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate text-[14px] font-medium text-tp-slate-800",
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
                                            lineNumber: 48,
                                            columnNumber: 19
                                        }, this),
                                        item.isOverdue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 rounded-[4px] bg-tp-error-50 px-[5px] py-[1px] text-[12px] font-semibold text-tp-error-600",
                                            children: "Overdue"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
                                            lineNumber: 52,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
                                    lineNumber: 47,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] text-tp-slate-400",
                                    children: item.scheduledDate
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
                                    lineNumber: 57,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
                            lineNumber: 46,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: isDisabled,
                            className: "flex-shrink-0 rounded-[6px] border border-tp-blue-400 bg-transparent px-[10px] py-[3px] text-[12px] font-medium text-tp-blue-600 transition-colors hover:bg-tp-blue-50 disabled:opacity-40 disabled:cursor-not-allowed",
                            onClick: ()=>handleSendItem(i, item.name),
                            children: "Remind"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
                            lineNumber: 59,
                            columnNumber: 15
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
                    lineNumber: 45,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RevenueBarCard",
    ()=>RevenueBarCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MoneyRecive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyRecive$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/MoneyRecive.js [app-ssr] (ecmascript) <export default as MoneyRecive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function RevenueBarCard({ data, onPillTap }) {
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("graph");
    const isDepositMode = data.mode === "deposit";
    const isSinglePoint = data.days.length === 1;
    // Recharts data
    const rechartsData = data.days.map((day)=>({
            name: day.label,
            paid: day.paid,
            due: day.due,
            refunded: day.refunded ?? 0,
            total: day.paid + day.due + (day.refunded ?? 0)
        }));
    const pointCount = rechartsData.length;
    const chartHeight = 160;
    const minWidth = Math.max(300, pointCount * 60);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MoneyRecive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyRecive$3e$__["MoneyRecive"], {
            size: 14,
            variant: "Bulk"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
            lineNumber: 35,
            columnNumber: 13
        }, void 0),
        title: data.title,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-[10px] grid grid-cols-2 gap-[6px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[8px] bg-tp-slate-50 px-[8px] py-[7px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block truncate text-[14px] font-semibold leading-tight text-tp-slate-800",
                                children: [
                                    "₹",
                                    data.totalRevenue.toLocaleString("en-IN")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-[3px] block text-[12px] font-medium text-tp-slate-500",
                                children: isDepositMode ? "Total advance received" : "Total billed amount"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[8px] px-[8px] py-[7px]",
                        style: {
                            backgroundColor: isDepositMode ? "rgba(239,68,68,0.08)" : "rgba(34,197,94,0.08)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block truncate text-[14px] font-semibold leading-tight",
                                style: {
                                    color: isDepositMode ? "var(--tp-error-600, #DC2626)" : "var(--tp-success-600, #16A34A)"
                                },
                                children: [
                                    "₹",
                                    isDepositMode ? data.totalRefunded.toLocaleString("en-IN") : data.totalPaid.toLocaleString("en-IN")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-[3px] block text-[12px] font-medium",
                                style: {
                                    color: isDepositMode ? "var(--tp-error-500, #EF4444)" : "var(--tp-success-500, #22C55E)"
                                },
                                children: isDepositMode ? "Total advance refunded" : "Paid fully"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[8px] px-[8px] py-[7px]",
                        style: {
                            backgroundColor: "rgba(245,158,11,0.08)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block truncate text-[14px] font-semibold leading-tight",
                                style: {
                                    color: "var(--tp-warning-600, #D97706)"
                                },
                                children: [
                                    "₹",
                                    data.totalDue.toLocaleString("en-IN")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-[3px] block text-[12px] font-medium",
                                style: {
                                    color: "var(--tp-warning-500, #F59E0B)"
                                },
                                children: isDepositMode ? "Total advance debited" : "Due"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    !isDepositMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[8px] px-[8px] py-[7px]",
                        style: {
                            backgroundColor: "rgba(239,68,68,0.08)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block truncate text-[14px] font-semibold leading-tight",
                                style: {
                                    color: "var(--tp-error-600, #DC2626)"
                                },
                                children: [
                                    "₹",
                                    data.totalRefunded.toLocaleString("en-IN")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-[3px] block text-[12px] font-medium",
                                style: {
                                    color: "var(--tp-error-500, #EF4444)"
                                },
                                children: "Refunded"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            !isSinglePoint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-[6px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ViewToggle"], {
                    viewMode: viewMode,
                    onChange: setViewMode
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this),
            viewMode === "graph" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: !isSinglePoint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto -mx-1 px-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    minWidth,
                                    height: chartHeight
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                                        data: rechartsData,
                                        margin: {
                                            top: 8,
                                            right: 8,
                                            bottom: 4,
                                            left: -8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                strokeDasharray: "3 3",
                                                vertical: false,
                                                stroke: "var(--tp-slate-100, #F1F5F9)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                                lineNumber: 91,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                                dataKey: "name",
                                                tick: {
                                                    fontSize: 10,
                                                    fill: "#94A3B8"
                                                },
                                                tickLine: false,
                                                axisLine: {
                                                    stroke: "#E2E8F0"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                                lineNumber: 92,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                                tick: {
                                                    fontSize: 10,
                                                    fill: "#94A3B8"
                                                },
                                                tickLine: false,
                                                axisLine: false,
                                                tickCount: 5,
                                                width: 36
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                                lineNumber: 93,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                contentStyle: {
                                                    fontSize: 11,
                                                    borderRadius: 8,
                                                    border: "1px solid #E2E8F0",
                                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                                lineNumber: 94,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                                dataKey: "paid",
                                                stackId: "a",
                                                fill: "var(--tp-success-500, #22C55E)",
                                                radius: [
                                                    0,
                                                    0,
                                                    0,
                                                    0
                                                ],
                                                maxBarSize: 24
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                                lineNumber: 95,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                                dataKey: "due",
                                                stackId: "a",
                                                fill: "var(--tp-warning-500, #F59E0B)",
                                                radius: [
                                                    0,
                                                    0,
                                                    0,
                                                    0
                                                ],
                                                maxBarSize: 24
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                                lineNumber: 96,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                                dataKey: "refunded",
                                                stackId: "a",
                                                fill: "var(--tp-error-500, #EF4444)",
                                                radius: [
                                                    3,
                                                    3,
                                                    0,
                                                    0
                                                ],
                                                maxBarSize: 24
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                                lineNumber: 97,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                        lineNumber: 90,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                    lineNumber: 89,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                lineNumber: 88,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                            lineNumber: 87,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-[6px] flex gap-[12px] text-[12px] text-tp-slate-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-[3px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block h-[6px] w-[6px] rounded-full",
                                            style: {
                                                backgroundColor: "var(--tp-success-500, #22C55E)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                            lineNumber: 104,
                                            columnNumber: 63
                                        }, this),
                                        " ",
                                        isDepositMode ? "Received" : "Paid fully"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                    lineNumber: 104,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-[3px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block h-[6px] w-[6px] rounded-full",
                                            style: {
                                                backgroundColor: "var(--tp-warning-500, #F59E0B)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                            lineNumber: 105,
                                            columnNumber: 63
                                        }, this),
                                        " ",
                                        isDepositMode ? "Debited" : "Due"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                    lineNumber: 105,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-[3px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block h-[6px] w-[6px] rounded-full",
                                            style: {
                                                backgroundColor: "var(--tp-error-500, #EF4444)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                            lineNumber: 106,
                                            columnNumber: 63
                                        }, this),
                                        " Refunded"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                    lineNumber: 106,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                            lineNumber: 103,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false) : !isSinglePoint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[8px] border border-tp-slate-100 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-[14px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "bg-tp-slate-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                        children: "Day"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                        lineNumber: 117,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-right px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                        children: isDepositMode ? "Received" : "Paid"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                        lineNumber: 118,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-right px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                        children: isDepositMode ? "Debited" : "Due"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                        lineNumber: 119,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-right px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                        children: "Refunded"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                        lineNumber: 120,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                lineNumber: 116,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: data.days.map((day, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: i % 2 === 1 ? "bg-tp-slate-50/50" : "",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "text-left px-[8px] py-[6px] text-tp-slate-500",
                                            children: day.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                            lineNumber: 126,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "text-right px-[8px] py-[6px] font-semibold",
                                            style: {
                                                color: "var(--tp-success-600, #16A34A)"
                                            },
                                            children: [
                                                "₹",
                                                day.paid.toLocaleString("en-IN")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                            lineNumber: 127,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "text-right px-[8px] py-[6px] font-semibold",
                                            style: {
                                                color: "var(--tp-warning-600, #D97706)"
                                            },
                                            children: [
                                                "₹",
                                                day.due.toLocaleString("en-IN")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                            lineNumber: 128,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "text-right px-[8px] py-[6px] font-semibold",
                                            style: {
                                                color: "var(--tp-error-600, #DC2626)"
                                            },
                                            children: [
                                                "₹",
                                                (day.refunded ?? 0).toLocaleString("en-IN")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                            lineNumber: 129,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                                    lineNumber: 125,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                            lineNumber: 123,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                    lineNumber: 114,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
                lineNumber: 113,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RevenueComparisonCard",
    ()=>RevenueComparisonCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowDown2.js [app-ssr] (ecmascript) <export default as ArrowDown2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowUp2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowUp2.js [app-ssr] (ecmascript) <export default as ArrowUp2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MoneyRecive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyRecive$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/MoneyRecive.js [app-ssr] (ecmascript) <export default as MoneyRecive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function formatMoney(value) {
    return `₹${value.toLocaleString("en-IN")}`;
}
function RevenueComparisonCard({ data, onPillTap }) {
    const revenueDelta = data.primaryRevenue - data.compareRevenue;
    const deltaDirection = revenueDelta >= 0 ? "up" : "down";
    const deltaTone = deltaDirection === "up" ? {
        bg: "rgba(34,197,94,0.10)",
        text: "var(--tp-success-600, #16A34A)"
    } : {
        bg: "rgba(239,68,68,0.10)",
        text: "var(--tp-danger-600, #DC2626)"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MoneyRecive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyRecive$3e$__["MoneyRecive"], {
            size: 14,
            variant: "Bulk"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
            lineNumber: 25,
            columnNumber: 13
        }, void 0),
        title: data.title,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-[8px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[8px] bg-tp-slate-50 px-[8px] py-[7px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] font-medium text-tp-slate-500",
                                children: data.primaryDateLabel
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-[2px] text-[14px] font-bold text-tp-slate-800",
                                children: formatMoney(data.primaryRevenue)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-[3px] text-[12px] text-tp-slate-500",
                                children: [
                                    "Refunded ",
                                    formatMoney(data.primaryRefunded)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] text-tp-slate-500",
                                children: [
                                    "Deposits ",
                                    formatMoney(data.primaryDeposits)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[8px] bg-tp-slate-50 px-[8px] py-[7px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] font-medium text-tp-slate-500",
                                children: data.compareDateLabel
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-[2px] text-[14px] font-bold text-tp-slate-800",
                                children: formatMoney(data.compareRevenue)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-[3px] text-[12px] text-tp-slate-500",
                                children: [
                                    "Refunded ",
                                    formatMoney(data.compareRefunded)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] text-tp-slate-500",
                                children: [
                                    "Deposits ",
                                    formatMoney(data.compareDeposits)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-[8px] flex items-center justify-between rounded-[8px] px-[8px] py-[6px]",
                style: {
                    backgroundColor: deltaTone.bg
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] font-medium text-tp-slate-700",
                        children: "Revenue change"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-[4px]",
                        style: {
                            color: deltaTone.text
                        },
                        children: [
                            deltaDirection === "up" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowUp2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp2$3e$__["ArrowUp2"], {
                                size: 14,
                                variant: "Bold"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                                lineNumber: 47,
                                columnNumber: 38
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__["ArrowDown2"], {
                                size: 14,
                                variant: "Bold"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                                lineNumber: 47,
                                columnNumber: 78
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[14px] font-semibold",
                                children: formatMoney(Math.abs(revenueDelta))
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BulkActionCard",
    ()=>BulkActionCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Flash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flash$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Flash.js [app-ssr] (ecmascript) <export default as Flash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TickCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TickCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/TickCircle.js [app-ssr] (ecmascript) <export default as TickCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function BulkActionCard({ data, onPillTap }) {
    const [confirmed, setConfirmed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const visibleRecipients = data.recipients.slice(0, 3);
    const remainingCount = data.totalCount - visibleRecipients.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Flash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flash$3e$__["Flash"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
            lineNumber: 17,
            columnNumber: 13
        }, void 0),
        title: data.action,
        badge: {
            label: "Action",
            color: "#92400E",
            bg: "#FEF3C7"
        },
        sidebarLink: confirmed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: `Sent to ${data.totalCount} recipients`,
            disabled: true,
            tone: "neutral",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TickCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TickCircle$3e$__["TickCircle"], {
                size: 14,
                variant: "Bold"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                lineNumber: 26,
                columnNumber: 23
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
            lineNumber: 22,
            columnNumber: 11
        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTAGroup"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
                    label: "Confirm & Send",
                    onClick: ()=>setConfirmed(true),
                    tone: "success",
                    fullWidth: true
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                    lineNumber: 30,
                    columnNumber: 13
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
                    label: "Cancel",
                    onClick: ()=>onPillTap?.("Cancel bulk action"),
                    tone: "danger",
                    fullWidth: true
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                    lineNumber: 31,
                    columnNumber: 13
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
            lineNumber: 29,
            columnNumber: 11
        }, void 0),
        children: confirmed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[8px] bg-tp-green-50 p-[10px] text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[14px] font-semibold text-tp-green-700",
                    children: "Action confirmed"
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-[2px] text-[12px] text-tp-green-600",
                    children: [
                        "Sent to ",
                        data.totalCount,
                        " recipients"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
            lineNumber: 37,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-[10px] rounded-[8px] bg-tp-slate-50 p-[8px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-[2px] text-[12px] font-semibold tracking-wider text-tp-slate-400",
                            children: "Message preview"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] text-tp-slate-700 italic",
                            children: [
                                "“",
                                data.messagePreview,
                                "”"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-[8px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-[3px] text-[12px] font-semibold tracking-wider text-tp-slate-400",
                            children: [
                                "Recipients (",
                                data.totalCount,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-[2px]",
                            children: [
                                visibleRecipients.map((name, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[14px] text-tp-slate-700",
                                        children: [
                                            "• ",
                                            name
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                                        lineNumber: 54,
                                        columnNumber: 17
                                    }, this)),
                                remainingCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] text-tp-slate-400",
                                    children: [
                                        "+ ",
                                        remainingCount,
                                        " more"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                                    lineNumber: 57,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DonutChartCard",
    ()=>DonutChartCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chart$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Chart.js [app-ssr] (ecmascript) <export default as Chart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function DonutChartCard({ data, onPillTap }) {
    // Build conic-gradient stops
    let cumPercent = 0;
    const stops = data.segments.map((seg)=>{
        const start = cumPercent;
        const pct = seg.value / data.total * 100;
        cumPercent += pct;
        return `${seg.color} ${start}% ${cumPercent}%`;
    }).join(", ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chart$3e$__["Chart"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
            lineNumber: 22,
            columnNumber: 13
        }, void 0),
        title: data.title,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-[2px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-[16px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-[90px] w-[90px] rounded-full",
                                style: {
                                    background: `conic-gradient(${stops})`
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-[18px] flex flex-col items-center justify-center rounded-full bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] font-semibold text-tp-slate-800",
                                        children: data.total
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12px] text-tp-slate-400",
                                        children: data.centerLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 space-y-[4px]",
                        children: data.segments.map((seg, i)=>{
                            const pct = (seg.value / data.total * 100).toFixed(0);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-[6px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-[8px] w-[8px] flex-shrink-0 rounded-[2px]",
                                        style: {
                                            background: seg.color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                                        lineNumber: 47,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1 text-[12px] text-tp-slate-600 truncate",
                                        children: seg.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                                        lineNumber: 48,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12px] font-semibold text-tp-slate-700",
                                        children: [
                                            pct,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                                        lineNumber: 49,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12px] text-tp-slate-400",
                                        children: [
                                            "(",
                                            seg.value,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                                        lineNumber: 50,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                                lineNumber: 46,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PieChartCard",
    ()=>PieChartCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chart$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Chart.js [app-ssr] (ecmascript) <export default as Chart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function PieChartCard({ data, onPillTap }) {
    let cumPercent = 0;
    const stops = data.segments.map((seg)=>{
        const start = cumPercent;
        const pct = seg.value / data.total * 100;
        cumPercent += pct;
        return `${seg.color} ${start}% ${cumPercent}%`;
    }).join(", ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chart$3e$__["Chart"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
            lineNumber: 21,
            columnNumber: 13
        }, void 0),
        title: data.title,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-[2px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-[16px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-[90px] w-[90px] rounded-full",
                                style: {
                                    background: `conic-gradient(${stops})`
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-[22px] flex flex-col items-center justify-center rounded-full bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] font-semibold text-tp-slate-800",
                                        children: data.total
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                                        lineNumber: 30,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[7px] text-tp-slate-400",
                                        children: data.centerLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                                        lineNumber: 31,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                                lineNumber: 29,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 space-y-[4px]",
                        children: data.segments.map((seg, i)=>{
                            const pct = (seg.value / data.total * 100).toFixed(0);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-[6px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-[8px] w-[8px] flex-shrink-0 rounded-[2px]",
                                        style: {
                                            background: seg.color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                                        lineNumber: 39,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1 text-[12px] text-tp-slate-600 truncate",
                                        children: seg.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                                        lineNumber: 40,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12px] font-semibold text-tp-slate-700",
                                        children: [
                                            pct,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                                        lineNumber: 41,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12px] text-tp-slate-400",
                                        children: [
                                            "(",
                                            seg.value,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                                        lineNumber: 42,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                                lineNumber: 38,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LineGraphCard",
    ()=>LineGraphCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TrendUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendUp$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/TrendUp.js [app-ssr] (ecmascript) <export default as TrendUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentDownload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDownload$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentDownload.js [app-ssr] (ecmascript) <export default as DocumentDownload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ChartTypeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ChartTypeToggle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$utils$2f$downloadExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/utils/downloadExcel.ts [app-ssr] (ecmascript)");
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
function LineGraphCard({ data, onPillTap }) {
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("graph");
    const [chartType, setChartType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("bar");
    const dirArrow = data.changeDirection === "up" ? "\u25B2" : data.changeDirection === "down" ? "\u25BC" : "\u25B6";
    const dirColor = data.changeDirection === "up" ? "#15803D" : data.changeDirection === "down" ? "#DC2626" : "#6D28D9";
    const handleDownload = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$utils$2f$downloadExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["downloadAsExcel"])("patient_volume", [
            "Period",
            "Value"
        ], data.points.map((p)=>[
                p.label,
                String(p.value)
            ]));
    };
    // Recharts data
    const rechartsData = data.points.map((p)=>({
            name: p.label,
            value: p.value
        }));
    const pointCount = rechartsData.length;
    const chartHeight = 160;
    const minWidth = Math.max(300, pointCount * 60);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TrendUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendUp$3e$__["TrendUp"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
            lineNumber: 37,
            columnNumber: 13
        }, void 0),
        title: data.title,
        badge: {
            label: `${dirArrow} ${data.changePercent}`,
            color: dirColor,
            bg: data.changeDirection === "up" ? "#DCFCE7" : data.changeDirection === "down" ? "#FEE2E2" : "#EDE9FE"
        },
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: "Download as Excel",
            onClick: handleDownload,
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentDownload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDownload$3e$__["DocumentDownload"], {
                size: 14,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                lineNumber: 40,
                columnNumber: 109
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
            lineNumber: 40,
            columnNumber: 20
        }, void 0),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-[6px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ViewToggle"], {
                        viewMode: viewMode,
                        onChange: setViewMode
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    viewMode === "graph" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ChartTypeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChartTypeToggle"], {
                        chartType: chartType,
                        onChange: setChartType
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                        lineNumber: 44,
                        columnNumber: 34
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            viewMode === "graph" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto -mx-1 px-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        minWidth,
                        height: chartHeight
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: "100%",
                        children: chartType === "line" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineChart"], {
                            data: rechartsData,
                            margin: {
                                top: 16,
                                right: 8,
                                bottom: 4,
                                left: -8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3",
                                    vertical: false,
                                    stroke: "var(--tp-slate-100, #F1F5F9)"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 53,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "name",
                                    tick: {
                                        fontSize: 10,
                                        fill: "#9E978B"
                                    },
                                    tickLine: false,
                                    axisLine: {
                                        stroke: "#E2E8F0"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 54,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                    tick: {
                                        fontSize: 10,
                                        fill: "#9E978B"
                                    },
                                    tickLine: false,
                                    axisLine: false,
                                    tickCount: 5,
                                    width: 36
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 55,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    contentStyle: {
                                        fontSize: 11,
                                        borderRadius: 8,
                                        border: "1px solid #E2E8F0",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 56,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                    y: data.average,
                                    stroke: "#7049C7",
                                    strokeDasharray: "3 3",
                                    strokeOpacity: 0.5,
                                    label: {
                                        value: "avg",
                                        position: "right",
                                        fontSize: 10,
                                        fill: "#7049C7"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 57,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                    type: "monotone",
                                    dataKey: "value",
                                    stroke: "#3B6FE0",
                                    strokeWidth: 2,
                                    dot: {
                                        r: 3,
                                        fill: "white",
                                        strokeWidth: 1.5,
                                        stroke: "#3B6FE0"
                                    },
                                    activeDot: {
                                        r: 5
                                    },
                                    label: {
                                        position: "top",
                                        fontSize: 9,
                                        fill: "#3B6FE0",
                                        fontWeight: 600
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 58,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                            lineNumber: 52,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                            data: rechartsData,
                            margin: {
                                top: 16,
                                right: 8,
                                bottom: 4,
                                left: -8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3",
                                    vertical: false,
                                    stroke: "var(--tp-slate-100, #F1F5F9)"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 62,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "name",
                                    tick: {
                                        fontSize: 10,
                                        fill: "#9E978B"
                                    },
                                    tickLine: false,
                                    axisLine: {
                                        stroke: "#E2E8F0"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 63,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                    tick: {
                                        fontSize: 10,
                                        fill: "#9E978B"
                                    },
                                    tickLine: false,
                                    axisLine: false,
                                    tickCount: 5,
                                    width: 36
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 64,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    contentStyle: {
                                        fontSize: 11,
                                        borderRadius: 8,
                                        border: "1px solid #E2E8F0",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 65,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                    y: data.average,
                                    stroke: "#7049C7",
                                    strokeDasharray: "3 3",
                                    strokeOpacity: 0.5,
                                    label: {
                                        value: "avg",
                                        position: "right",
                                        fontSize: 10,
                                        fill: "#7049C7"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 66,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: "value",
                                    fill: "#3B6FE0",
                                    radius: [
                                        3,
                                        3,
                                        0,
                                        0
                                    ],
                                    maxBarSize: 24,
                                    opacity: 0.8,
                                    label: {
                                        position: "top",
                                        fontSize: 9,
                                        fill: "#3B6FE0",
                                        fontWeight: 600
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 67,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                            lineNumber: 61,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                        lineNumber: 50,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[8px] border border-tp-slate-100 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-[14px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "bg-tp-slate-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                        children: "Period"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-right px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                        children: "Value"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: data.points.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: i % 2 === 1 ? "bg-tp-slate-50/50" : "",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "text-left px-[8px] py-[6px] text-tp-slate-500",
                                            children: p.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                            lineNumber: 85,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "text-right px-[8px] py-[6px] font-semibold text-tp-slate-700",
                                            children: p.value
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                            lineNumber: 86,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                    lineNumber: 84,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-t border-tp-slate-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "text-left px-[8px] py-[6px] text-tp-slate-500 font-medium",
                                        children: "Average"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "text-right px-[8px] py-[6px] font-semibold text-purple-600",
                                        children: data.average
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                        lineNumber: 93,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalyticsTableCard",
    ()=>AnalyticsTableCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$StatusUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__StatusUp$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/StatusUp.js [app-ssr] (ecmascript) <export default as StatusUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentDownload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDownload$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentDownload.js [app-ssr] (ecmascript) <export default as DocumentDownload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$utils$2f$downloadExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/utils/downloadExcel.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function AnalyticsTableCard({ data, onPillTap }) {
    const handleDownload = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$utils$2f$downloadExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["downloadAsExcel"])("weekly_kpis", [
            "Metric",
            "This Week",
            "Last Week",
            "Change"
        ], data.kpis.map((k)=>[
                k.metric,
                k.thisWeek,
                k.lastWeek,
                k.delta
            ]));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$StatusUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__StatusUp$3e$__["StatusUp"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
            lineNumber: 24,
            columnNumber: 13
        }, void 0),
        title: data.title,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: "Download as Excel",
            onClick: handleDownload,
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentDownload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDownload$3e$__["DocumentDownload"], {
                size: 14,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
                lineNumber: 26,
                columnNumber: 109
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
            lineNumber: 26,
            columnNumber: 20
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-hidden rounded-[8px] border border-tp-slate-100",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-4 gap-[1px] bg-tp-slate-100 px-[8px] py-[4px] text-[12px] font-semibold text-tp-slate-500 tracking-wider",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Metric"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-right",
                            children: "This Week"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-right",
                            children: "Last Week"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-right",
                            children: "Change"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                data.kpis.map((kpi, i)=>{
                    const arrow = kpi.direction === "up" ? "\u25B2" : kpi.direction === "down" ? "\u25BC" : "\u25B6";
                    const deltaColor = kpi.isGood ? "text-tp-green-600" : kpi.direction === "stable" ? "text-tp-slate-400" : "text-tp-error-600";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `grid grid-cols-4 gap-[1px] px-[8px] py-[6px] text-[14px] ${i % 2 === 0 ? "bg-white" : "bg-tp-slate-50"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-tp-slate-700 truncate",
                                children: kpi.metric
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right font-semibold text-tp-slate-700",
                                children: kpi.thisWeek
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right font-semibold text-tp-slate-700",
                                children: kpi.lastWeek
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
                                lineNumber: 46,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-right font-semibold ${deltaColor}`,
                                children: [
                                    arrow,
                                    " ",
                                    kpi.delta
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
                        lineNumber: 43,
                        columnNumber: 13
                    }, this);
                })
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConditionBarCard",
    ()=>ConditionBarCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentDownload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDownload$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentDownload.js [app-ssr] (ecmascript) <export default as DocumentDownload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$utils$2f$downloadExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/utils/downloadExcel.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function ConditionBarCard({ data, onPillTap }) {
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("graph");
    const total = data.items.reduce((sum, item)=>sum + item.count, 0) || 1;
    const handleDownload = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$utils$2f$downloadExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["downloadAsExcel"])("condition_distribution", [
            "Condition",
            "Count"
        ], data.items.map((i)=>[
                i.condition,
                String(i.count)
            ]));
    };
    // Build conic-gradient stops for the donut
    let cumPercent = 0;
    const stops = data.items.map((item)=>{
        const start = cumPercent;
        const pct = item.count / total * 100;
        cumPercent += pct;
        return `${item.color} ${start}% ${cumPercent}%`;
    }).join(", ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
            lineNumber: 33,
            columnNumber: 13
        }, void 0),
        tpIconName: "medical-record",
        title: data.title,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: "Download as Excel",
            onClick: handleDownload,
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentDownload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDownload$3e$__["DocumentDownload"], {
                size: 14,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                lineNumber: 36,
                columnNumber: 109
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
            lineNumber: 36,
            columnNumber: 20
        }, void 0),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-[6px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ViewToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ViewToggle"], {
                    viewMode: viewMode,
                    onChange: setViewMode
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            viewMode === "graph" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-[2px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-[16px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-[90px] w-[90px] rounded-full",
                                    style: {
                                        background: `conic-gradient(${stops})`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-[18px] flex flex-col items-center justify-center rounded-full bg-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[14px] font-semibold text-tp-slate-800",
                                            children: total
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                            lineNumber: 53,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[12px] text-tp-slate-400",
                                            children: "Total"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                            lineNumber: 54,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                    lineNumber: 52,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 space-y-[4px]",
                            children: data.items.map((item, i)=>{
                                const pct = (item.count / total * 100).toFixed(0);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-[6px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-[8px] w-[8px] flex-shrink-0 rounded-[2px]",
                                            style: {
                                                background: item.color
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                            lineNumber: 64,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-1 text-[14px] text-tp-slate-600 truncate",
                                            children: item.condition
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                            lineNumber: 65,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[14px] font-semibold text-tp-slate-700",
                                            children: [
                                                pct,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                            lineNumber: 66,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[12px] text-tp-slate-400",
                                            children: [
                                                "(",
                                                item.count,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                            lineNumber: 67,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                    lineNumber: 63,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this) : /* Text view — ranked list */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[8px] border border-tp-slate-100 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-[14px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "bg-tp-slate-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left px-[8px] py-[6px] font-semibold text-tp-slate-500 w-[28px]",
                                        children: "#"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                        lineNumber: 80,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                        children: "Condition"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                        lineNumber: 81,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-right px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                        children: "Count"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-right px-[8px] py-[6px] font-semibold text-tp-slate-500",
                                        children: "%"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                        lineNumber: 83,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                lineNumber: 79,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: data.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: i % 2 === 1 ? "bg-tp-slate-50/50" : "",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-[8px] py-[6px] text-tp-slate-400 font-semibold",
                                            children: i + 1
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                            lineNumber: 89,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-[8px] py-[6px]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-[6px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-block h-[8px] w-[8px] rounded-full flex-shrink-0",
                                                        style: {
                                                            backgroundColor: item.color
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-tp-slate-700",
                                                        children: item.condition
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                                lineNumber: 91,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                            lineNumber: 90,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "text-right px-[8px] py-[6px] font-semibold text-tp-slate-800",
                                            children: item.count
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                            lineNumber: 96,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "text-right px-[8px] py-[6px] text-tp-slate-500",
                                            children: [
                                                (item.count / total * 100).toFixed(0),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                            lineNumber: 97,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                    lineNumber: 77,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this),
            data.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-[8px] text-[12px] text-tp-slate-400 italic",
                children: data.note
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeatmapCard",
    ()=>HeatmapCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Calendar2.js [app-ssr] (ecmascript) <export default as Calendar2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentDownload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDownload$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentDownload.js [app-ssr] (ecmascript) <export default as DocumentDownload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$utils$2f$downloadExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/utils/downloadExcel.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const INTENSITY_COLORS = {
    low: "#EDF8F1",
    medium: "#FEF6E7",
    high: "#FDEDED"
};
const INTENSITY_TEXT = {
    low: "#1B8C54",
    medium: "#C6850C",
    high: "#C42B2B"
};
function HeatmapCard({ data, onPillTap }) {
    const handleDownload = ()=>{
        const headers = [
            "Time Slot",
            ...data.cols
        ];
        const rows = data.rows.map((row, ri)=>[
                row,
                ...data.cells[ri].map((c)=>String(c.value))
            ]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$utils$2f$downloadExcel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["downloadAsExcel"])("appointment_heatmap", headers, rows);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__["Calendar2"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
            lineNumber: 32,
            columnNumber: 13
        }, void 0),
        title: data.title,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: "Download as Excel",
            onClick: handleDownload,
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentDownload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDownload$3e$__["DocumentDownload"], {
                size: 14,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                lineNumber: 34,
                columnNumber: 109
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
            lineNumber: 34,
            columnNumber: 20
        }, void 0),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-[2px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full border-collapse text-[12px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-[3px] text-left font-semibold text-tp-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                            lineNumber: 41,
                                            columnNumber: 15
                                        }, this),
                                        data.cols.map((col, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-[3px] text-center font-semibold text-tp-slate-500",
                                                children: col
                                            }, i, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                                lineNumber: 43,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: data.rows.map((row, ri)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "whitespace-nowrap p-[3px] font-medium text-tp-slate-500",
                                                children: row
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                                lineNumber: 50,
                                                columnNumber: 17
                                            }, this),
                                            data.cells[ri].map((cell, ci)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-[2px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-[26px] items-center justify-center rounded-[4px] font-semibold",
                                                        style: {
                                                            background: INTENSITY_COLORS[cell.intensity],
                                                            color: INTENSITY_TEXT[cell.intensity]
                                                        },
                                                        children: cell.value
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                                        lineNumber: 53,
                                                        columnNumber: 21
                                                    }, this)
                                                }, ci, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                                    lineNumber: 52,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, ri, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                    lineNumber: 37,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-[6px] flex gap-[10px] text-[12px] text-tp-slate-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-[3px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block h-[8px] w-[8px] rounded-[2px]",
                                style: {
                                    background: INTENSITY_COLORS.low
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                lineNumber: 73,
                                columnNumber: 55
                            }, this),
                            " 1–3"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-[3px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block h-[8px] w-[8px] rounded-[2px]",
                                style: {
                                    background: INTENSITY_COLORS.medium
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                lineNumber: 74,
                                columnNumber: 55
                            }, this),
                            " 4–6"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-[3px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block h-[8px] w-[8px] rounded-[2px]",
                                style: {
                                    background: INTENSITY_COLORS.high
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                                lineNumber: 75,
                                columnNumber: 55
                            }, this),
                            " 7+"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WelcomeCard",
    ()=>WelcomeCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$People$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__People$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/People.js [app-ssr] (ecmascript) <export default as People>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TickCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TickCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/TickCircle.js [app-ssr] (ecmascript) <export default as TickCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Edit2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Edit2.js [app-ssr] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Timer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Timer.js [app-ssr] (ecmascript) <export default as Timer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$CloseCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/CloseCircle.js [app-ssr] (ecmascript) <export default as CloseCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const STAT_ICONS = {
    Queued: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$People$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__People$3e$__["People"], {
        size: 14,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
        lineNumber: 13,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    Finished: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TickCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TickCircle$3e$__["TickCircle"], {
        size: 14,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
        lineNumber: 14,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0)),
    Drafts: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Edit2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
        size: 14,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
        lineNumber: 15,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    Pending: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Timer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__["Timer"], {
        size: 14,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
        lineNumber: 16,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    Cancelled: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$CloseCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircle$3e$__["CloseCircle"], {
        size: 14,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
        lineNumber: 17,
        columnNumber: 14
    }, ("TURBOPACK compile-time value", void 0)),
    "P.Digitisation": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Timer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__["Timer"], {
        size: 14,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
        lineNumber: 18,
        columnNumber: 21
    }, ("TURBOPACK compile-time value", void 0)),
    "Follow-ups": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
        size: 14,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
        lineNumber: 19,
        columnNumber: 17
    }, ("TURBOPACK compile-time value", void 0))
};
function WelcomeCard({ data, onPillTap }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
            size: 14,
            variant: "Bulk"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
            lineNumber: 25,
            columnNumber: 13
        }, void 0),
        title: "Today's Clinic Overview",
        date: data.date,
        children: [
            data.contextLine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-[8px] text-[14px] text-tp-slate-500",
                children: data.contextLine
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-[6px]",
                children: data.stats.map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>stat.tab && onPillTap?.(`Show ${stat.label.toLowerCase()}`),
                        className: "flex items-center gap-[6px] rounded-[8px] bg-tp-slate-50 px-[6px] py-[6px] text-left transition-colors hover:bg-tp-slate-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center rounded-[6px] bg-tp-slate-100 text-tp-slate-500",
                                children: STAT_ICONS[stat.label] ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$People$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__People$3e$__["People"], {
                                    size: 14,
                                    variant: "Bulk"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
                                    lineNumber: 46,
                                    columnNumber: 42
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-[14px] font-semibold leading-none text-tp-slate-700",
                                        children: stat.value
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-[12px] font-medium leading-[1.4] text-tp-slate-400",
                                        children: stat.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this)
                        ]
                    }, stat.label, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DuePatientsCard",
    ()=>DuePatientsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$WalletMinus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WalletMinus$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/WalletMinus.js [app-ssr] (ecmascript) <export default as WalletMinus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function DuePatientsCard({ data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$WalletMinus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WalletMinus$3e$__["WalletMinus"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx",
            lineNumber: 15,
            columnNumber: 13
        }, void 0),
        title: data.title,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: data.ctaLabel
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx",
            lineNumber: 17,
            columnNumber: 20
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[12px] border border-tp-warning-100 bg-tp-warning-50/45 px-[8px] py-[7px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[12px] font-semibold text-tp-warning-700",
                    children: data.periodLabel
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-[3px] text-[14px] text-tp-slate-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold text-tp-warning-700",
                            children: data.patientCount
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        " patients with dues"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[14px] text-tp-slate-700",
                    children: [
                        "Total due amount: ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold text-tp-warning-700",
                            children: [
                                "₹",
                                data.totalDueAmount.toLocaleString("en-IN")
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx",
                            lineNumber: 25,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-[3px] text-[12px] text-tp-slate-500",
                    children: [
                        "As of ",
                        data.asOf
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/ExternalCtaCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExternalCtaCard",
    ()=>ExternalCtaCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowRight2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowRight2.js [app-ssr] (ecmascript) <export default as ArrowRight2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Link1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link1$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Link1.js [app-ssr] (ecmascript) <export default as Link1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function ExternalCtaCard({ data }) {
    const target = data.openInNewTab === false ? "_self" : "_blank";
    const rel = target === "_blank" ? "noreferrer noopener" : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Link1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link1$3e$__["Link1"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ExternalCtaCard.tsx",
            lineNumber: 18,
            columnNumber: 13
        }, void 0),
        title: data.title,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: data.ctaLabel,
            href: data.ctaUrl,
            target: target,
            rel: rel,
            tone: "primary",
            iconRight: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowRight2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight2$3e$__["ArrowRight2"], {
                size: 14,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ExternalCtaCard.tsx",
                lineNumber: 27,
                columnNumber: 22
            }, void 0),
            compact: true
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ExternalCtaCard.tsx",
            lineNumber: 21,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[12px] border border-tp-slate-100 bg-tp-slate-50/60 px-[8px] py-[7px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[14px] leading-[1.5] text-tp-slate-600",
                children: data.description
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ExternalCtaCard.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ExternalCtaCard.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ExternalCtaCard.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FollowUpRateCard",
    ()=>FollowUpRateCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Chart2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chart2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Chart2.js [app-ssr] (ecmascript) <export default as Chart2>");
"use client";
;
;
;
function FollowUpRateCard({ data }) {
    const delta = data.currentRate - data.lastWeekRate;
    const deltaTone = delta >= 0 ? "text-tp-success-600" : "text-tp-error-600";
    const trendMax = Math.max(...data.trend.map((p)=>p.rate), 1);
    const trendMin = Math.min(...data.trend.map((p)=>p.rate), 0);
    const chartW = 220;
    const chartH = 64;
    const padX = 8;
    const padY = 8;
    const xStep = data.trend.length > 1 ? (chartW - padX * 2) / (data.trend.length - 1) : 0;
    const gradientId = `fuTrendFill-${data.title.replace(/\s+/g, "-").toLowerCase()}`;
    const yScale = (v)=>{
        const range = Math.max(trendMax - trendMin, 1);
        return padY + (chartH - padY * 2) * (1 - (v - trendMin) / range);
    };
    const points = data.trend.map((p, i)=>`${padX + i * xStep},${yScale(p.rate)}`).join(" ");
    const areaPoints = `${padX},${chartH - padY} ${points} ${padX + (data.trend.length - 1) * xStep},${chartH - padY}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Chart2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chart2$3e$__["Chart2"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
            lineNumber: 31,
            columnNumber: 13
        }, void 0),
        title: data.title,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-[6px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[8px] bg-tp-blue-50/60 px-[8px] py-[7px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] text-tp-blue-500",
                                children: "Current follow-up rate"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[14px] font-semibold text-tp-blue-700",
                                children: [
                                    data.currentRate,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[8px] bg-tp-slate-50 px-[8px] py-[7px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] text-tp-slate-500",
                                children: "Change vs last week"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-[14px] font-semibold ${deltaTone}`,
                                children: [
                                    delta >= 0 ? "+" : "",
                                    delta,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-[8px] rounded-[8px] border border-tp-slate-100 bg-white px-[8px] py-[7px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-y-[4px] text-[12px] text-tp-slate-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Due today: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-tp-slate-800",
                                    children: data.dueToday
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                    lineNumber: 47,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Overdue today: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-tp-warning-700",
                                    children: data.overdueToday
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                    lineNumber: 48,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Completed this week: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-tp-success-700",
                                    children: data.completedThisWeek
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                    lineNumber: 49,
                                    columnNumber: 35
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Scheduled this week: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-tp-slate-800",
                                    children: data.scheduledThisWeek
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                    lineNumber: 50,
                                    columnNumber: 35
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-[8px] rounded-[8px] border border-tp-slate-100 bg-white px-[8px] py-[7px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] text-tp-slate-500",
                                children: "4-week trend"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] text-tp-slate-500",
                                children: [
                                    "Avg: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-tp-slate-700",
                                        children: [
                                            Math.round(data.trend.reduce((a, p)=>a + p.rate, 0) / Math.max(1, data.trend.length)),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                        lineNumber: 58,
                                        columnNumber: 18
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-[6px] rounded-[8px] bg-tp-blue-50/40 px-[6px] py-[6px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "100%",
                                viewBox: `0 0 ${chartW} ${chartH}`,
                                className: "block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                            id: gradientId,
                                            x1: "0",
                                            y1: "0",
                                            x2: "0",
                                            y2: "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "0%",
                                                    stopColor: "rgba(75,74,213,0.30)"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "100%",
                                                    stopColor: "rgba(75,74,213,0.04)"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: padX,
                                        y1: chartH - padY,
                                        x2: chartW - padX,
                                        y2: chartH - padY,
                                        stroke: "var(--tp-slate-200, #E2E8F0)",
                                        strokeWidth: "1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: areaPoints,
                                        fill: `url(#${gradientId})`
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: points,
                                        fill: "none",
                                        stroke: "var(--tp-blue-500, #4B4AD5)",
                                        strokeWidth: "2",
                                        strokeLinejoin: "round",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this),
                                    data.trend.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: padX + i * xStep,
                                            cy: yScale(p.rate),
                                            r: "2.5",
                                            fill: "var(--tp-blue-500, #4B4AD5)"
                                        }, p.label, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-[4px] flex items-center justify-between px-[2px]",
                                children: data.trend.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12px] text-tp-slate-500",
                                        children: p.label
                                    }, p.label, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BillingSummaryCard",
    ()=>BillingSummaryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MoneyRecive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyRecive$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/MoneyRecive.js [app-ssr] (ecmascript) <export default as MoneyRecive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function BillingSummaryCard({ data, onSidebarNav }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MoneyRecive$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoneyRecive$3e$__["MoneyRecive"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
            lineNumber: 16,
            columnNumber: 13
        }, void 0),
        title: data.title,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: data.footerCtaLabel || "Open OPD billing section",
            onClick: ()=>onSidebarNav?.("opd-billing")
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
            lineNumber: 19,
            columnNumber: 9
        }, void 0),
        children: !data.minimal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-[8px] rounded-[10px] border border-tp-slate-100 bg-white",
            children: [
                (data.mode === "billing" || data.mode === "combined") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-[8px] py-[7px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[12px] text-tp-slate-500",
                            children: "Billing"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                            lineNumber: 29,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-[6px] grid grid-cols-2 gap-[6px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[8px] bg-tp-slate-50 px-[7px] py-[6px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[12px] text-tp-slate-500",
                                            children: "Total billed"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                            lineNumber: 32,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[14px] font-semibold text-tp-slate-800",
                                            children: [
                                                "₹",
                                                data.totalBilledAmount.toLocaleString("en-IN")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                            lineNumber: 33,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                    lineNumber: 31,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[8px] bg-tp-success-50/60 px-[7px] py-[6px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[12px] text-tp-success-500",
                                            children: "Paid fully"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                            lineNumber: 36,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[14px] font-semibold text-tp-success-700",
                                            children: [
                                                "₹",
                                                data.totalPaidFullyAmount.toLocaleString("en-IN")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                            lineNumber: 37,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                    lineNumber: 35,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[8px] bg-tp-warning-50/60 px-[7px] py-[6px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[12px] text-tp-warning-500",
                                            children: "Dues"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                            lineNumber: 40,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[14px] font-semibold text-tp-warning-700",
                                            children: [
                                                "₹",
                                                data.totalDueAmount.toLocaleString("en-IN")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                            lineNumber: 41,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                    lineNumber: 39,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[8px] bg-tp-error-50/60 px-[7px] py-[6px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[12px] text-tp-error-500",
                                            children: "Refunded"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                            lineNumber: 44,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[14px] font-semibold text-tp-error-700",
                                            children: [
                                                "₹",
                                                data.totalRefundedAmount.toLocaleString("en-IN")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                            lineNumber: 45,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                    lineNumber: 43,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                            lineNumber: 30,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                    lineNumber: 28,
                    columnNumber: 13
                }, this),
                (data.mode === "deposit" || data.mode === "combined") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        data.mode === "combined" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-[8px] h-px bg-tp-slate-100"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                            lineNumber: 53,
                            columnNumber: 46
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-[8px] py-[7px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] text-tp-slate-500",
                                    children: "Advance"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                    lineNumber: 55,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-[6px] grid grid-cols-3 gap-[6px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-[8px] bg-tp-slate-50 px-[7px] py-[6px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[12px] text-tp-slate-500",
                                                    children: "Total received"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                                    lineNumber: 58,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[14px] font-semibold text-tp-slate-800",
                                                    children: [
                                                        "₹",
                                                        data.totalAdvanceReceived.toLocaleString("en-IN")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                            lineNumber: 57,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-[8px] bg-tp-warning-50/60 px-[7px] py-[6px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[12px] text-tp-warning-500",
                                                    children: "Debited"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[14px] font-semibold text-tp-warning-700",
                                                    children: [
                                                        "₹",
                                                        data.totalAdvanceDebited.toLocaleString("en-IN")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                            lineNumber: 61,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-[8px] bg-tp-error-50/60 px-[7px] py-[6px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[12px] text-tp-error-500",
                                                    children: "Refunded"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[14px] font-semibold text-tp-error-700",
                                                    children: [
                                                        "₹",
                                                        data.totalAdvanceRefunded.toLocaleString("en-IN")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                            lineNumber: 65,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                                    lineNumber: 56,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
                            lineNumber: 54,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
            lineNumber: 26,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VaccinationDueListCard",
    ()=>VaccinationDueListCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Hospital$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hospital$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Hospital.js [app-ssr] (ecmascript) <export default as Hospital>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$NotificationBing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__NotificationBing$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/NotificationBing.js [app-ssr] (ecmascript) <export default as NotificationBing>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function VaccinationDueListCard({ data, onPillTap }) {
    const [disabledItems, setDisabledItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [allDisabled, setAllDisabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSendAll = ()=>{
        setAllDisabled(true);
        setDisabledItems(new Set(data.items.map((_, i)=>i)));
        onPillTap?.("Send reminder to all");
    };
    const handleRemindItem = (index, name)=>{
        setDisabledItems((prev)=>new Set(prev).add(index));
        onPillTap?.(`Remind vaccine due for ${name}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Hospital$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hospital$3e$__["Hospital"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
            lineNumber: 27,
            columnNumber: 13
        }, void 0),
        title: data.title,
        badge: data.overdueCount > 0 ? {
            label: `${data.overdueCount} overdue`,
            color: "#DC2626",
            bg: "#FEE2E2"
        } : undefined,
        sidebarLink: data.items.length > 0 && !allDisabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: `Send reminder to all (${data.items.length})`,
            onClick: handleSendAll,
            tone: "primary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$NotificationBing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__NotificationBing$3e$__["NotificationBing"], {
                size: 14,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
                lineNumber: 36,
                columnNumber: 23
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
            lineNumber: 32,
            columnNumber: 11
        }, void 0) : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-[5px]",
            children: data.items.map((item, i)=>{
                const isDisabled = disabledItems.has(i);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-[8px] rounded-[8px] bg-tp-slate-50 px-[8px] py-[6px] transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-[4px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate text-[14px] font-medium text-tp-slate-800",
                                            children: item.patientName
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
                                            lineNumber: 48,
                                            columnNumber: 19
                                        }, this),
                                        item.isOverdue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 rounded-[4px] bg-tp-error-50 px-[5px] py-[1px] text-[12px] font-semibold text-tp-error-600",
                                            children: "Overdue"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
                                            lineNumber: 52,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
                                    lineNumber: 47,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] text-tp-slate-400",
                                    children: [
                                        item.vaccineName,
                                        " ",
                                        item.dose,
                                        " · Due ",
                                        item.dueDate
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
                                    lineNumber: 57,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
                            lineNumber: 46,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: isDisabled,
                            className: "flex-shrink-0 rounded-[6px] border border-tp-blue-400 bg-transparent px-[10px] py-[3px] text-[12px] font-medium text-tp-blue-600 transition-colors hover:bg-tp-blue-50 disabled:opacity-40 disabled:cursor-not-allowed",
                            onClick: ()=>handleRemindItem(i, item.patientName),
                            children: "Remind"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
                            lineNumber: 61,
                            columnNumber: 15
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
                    lineNumber: 45,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANCScheduleListCard",
    ()=>ANCScheduleListCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$NotificationBing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__NotificationBing$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/NotificationBing.js [app-ssr] (ecmascript) <export default as NotificationBing>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function ANCScheduleListCard({ data, onPillTap }) {
    const [disabledItems, setDisabledItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [allDisabled, setAllDisabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSendAll = ()=>{
        setAllDisabled(true);
        setDisabledItems(new Set(data.items.map((_, i)=>i)));
        onPillTap?.("Send reminder to all");
    };
    const handleRemindItem = (index, name)=>{
        setDisabledItems((prev)=>new Set(prev).add(index));
        onPillTap?.(`Remind ANC due for ${name}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
            size: 14,
            variant: "Bulk",
            color: "var(--tp-blue-500, #4B4AD5)"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
            lineNumber: 27,
            columnNumber: 13
        }, void 0),
        title: data.title,
        badge: data.overdueCount > 0 ? {
            label: `${data.overdueCount} overdue`,
            color: "#DC2626",
            bg: "#FEE2E2"
        } : undefined,
        sidebarLink: data.items.length > 0 && !allDisabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: `Send reminder to all (${data.items.length})`,
            onClick: handleSendAll,
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$NotificationBing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__NotificationBing$3e$__["NotificationBing"], {
                size: 14,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
                lineNumber: 36,
                columnNumber: 23
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
            lineNumber: 32,
            columnNumber: 11
        }, void 0) : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-[5px]",
            children: data.items.map((item, i)=>{
                const isDisabled = disabledItems.has(i);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-[8px] rounded-[8px] bg-tp-slate-50 px-[8px] py-[6px] transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-[4px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate text-[14px] font-medium text-tp-slate-800",
                                            children: item.patientName
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
                                            lineNumber: 48,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 rounded-[4px] bg-tp-violet-50 px-[5px] py-[1px] text-[12px] font-semibold text-tp-violet-600",
                                            children: item.gestationalAge
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
                                            lineNumber: 51,
                                            columnNumber: 19
                                        }, this),
                                        item.isOverdue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 rounded-[4px] bg-tp-error-50 px-[5px] py-[1px] text-[12px] font-semibold text-tp-error-600",
                                            children: "Overdue"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
                                            lineNumber: 55,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
                                    lineNumber: 47,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] text-tp-slate-400",
                                    children: [
                                        item.ancItem,
                                        " · Due ",
                                        item.dueWeek
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
                                    lineNumber: 60,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
                            lineNumber: 46,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: isDisabled,
                            className: "flex-shrink-0 rounded-[6px] border border-tp-blue-400 bg-transparent px-[10px] py-[3px] text-[12px] font-medium text-tp-blue-600 transition-colors hover:bg-tp-blue-50 disabled:opacity-40 disabled:cursor-not-allowed",
                            onClick: ()=>handleRemindItem(i, item.patientName),
                            children: "Remind"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
                            lineNumber: 64,
                            columnNumber: 15
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
                    lineNumber: 45,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PatientSearchCard",
    ()=>PatientSearchCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/constants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function PatientSearchCard({ data, onPatientSelect }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(data.query);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Note: removed auto-focus on mount — it caused unwanted scroll in catalog previews.
    // Focus is handled by the parent when the card is used in the live agent chat.
    const results = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RX_CONTEXT_OPTIONS"].filter((o)=>o.kind === "patient" && o.label.toLowerCase().includes(q)).map((o)=>({
                patientId: o.id,
                name: o.label,
                meta: o.meta,
                hasAppointmentToday: !!o.isToday
            }));
    }, [
        query
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "11",
                    cy: "11",
                    r: "8"
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "21",
                    y1: "21",
                    x2: "16.65",
                    y2: "16.65"
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
            lineNumber: 35,
            columnNumber: 9
        }, void 0),
        title: "Patient Search",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-[6px] rounded-[8px] border border-tp-slate-200 bg-white px-[8px] py-[6px] focus-within:border-tp-blue-400 focus-within:shadow-[0_0_0_2px_rgba(75,74,213,0.08)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "13",
                            height: "13",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "#94a3b8",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            className: "flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "11",
                                    cy: "11",
                                    r: "8"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "21",
                                    y1: "21",
                                    x2: "16.65",
                                    y2: "16.65"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: inputRef,
                            type: "text",
                            value: query,
                            onChange: (e)=>setQuery(e.target.value),
                            placeholder: "Search patient by name...",
                            className: "w-full bg-transparent text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 outline-none"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        query && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setQuery("");
                                inputRef.current?.focus();
                            },
                            className: "flex-shrink-0 text-tp-slate-400 hover:text-tp-slate-600",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "12",
                                height: "12",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "18",
                                        y1: "6",
                                        x2: "6",
                                        y2: "18"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "6",
                                        y1: "6",
                                        x2: "18",
                                        y2: "18"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            query.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-[6px] space-y-[3px]",
                children: results.length > 0 ? results.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onPatientSelect?.(r.patientId),
                        className: "flex w-full items-center gap-[8px] rounded-[8px] bg-tp-slate-50 px-[8px] py-[6px] text-left transition-colors hover:bg-tp-blue-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center rounded-full bg-tp-slate-200 text-[12px] font-semibold text-tp-slate-600",
                                children: r.name.charAt(0).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                                lineNumber: 81,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate text-[14px] font-semibold text-tp-slate-800",
                                        children: r.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                                        lineNumber: 85,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-tp-slate-400",
                                        children: r.meta
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                                        lineNumber: 86,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                                lineNumber: 84,
                                columnNumber: 17
                            }, this),
                            r.hasAppointmentToday && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-[4px] bg-tp-success-50 px-[6px] py-[1px] text-[12px] font-semibold text-tp-success-700",
                                children: "Today"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                                lineNumber: 89,
                                columnNumber: 19
                            }, this)
                        ]
                    }, r.patientId, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                        lineNumber: 76,
                        columnNumber: 15
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-[8px] bg-tp-slate-50 px-[8px] py-[10px] text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] text-tp-slate-500",
                            children: [
                                "No patients found for “",
                                query,
                                "”"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                            lineNumber: 97,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-[2px] text-[12px] text-tp-slate-400",
                            children: "Try a different name or check spelling"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                            lineNumber: 98,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                    lineNumber: 96,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_tp-rxpad_dr-agent_cards_homepage_2f7cc2a9._.js.map