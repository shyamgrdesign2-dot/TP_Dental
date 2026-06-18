module.exports = [
"[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DocumentAttachmentBubble",
    ()=>DocumentAttachmentBubble,
    "DocumentAttachmentsStrip",
    ()=>DocumentAttachmentsStrip,
    "inferChatAttachmentKind",
    ()=>inferChatAttachmentKind
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText1$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentText1.js [app-ssr] (ecmascript) <export default as DocumentText1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Image.js [app-ssr] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function inferChatAttachmentKind(a) {
    if (a.type === "image" || a.type === "pdf") return a.type;
    return /\.(jpe?g|png|webp|gif)$/i.test(a.fileName) ? "image" : "pdf";
}
function EmbeddedAttachmentTile({ attachment }) {
    const kind = inferChatAttachmentKind(attachment);
    const meta = attachment.pageCount ? `${attachment.pageCount} ${attachment.pageCount === 1 ? "page" : "pages"}` : kind === "image" ? "Image" : "Attachment";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex min-w-0 flex-1 basis-[min(100%,240px)] gap-3 rounded-[10px] bg-white/60 py-2.5 pl-3 pr-3", "backdrop-blur-[2px]"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-w-0 flex-1 items-center gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-white/85 shadow-[inset_0_0_0_1px_rgba(75,74,213,0.06)]",
                    children: kind === "image" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                        size: 22,
                        variant: "Bold",
                        className: "text-[var(--tp-blue-600,#4338CA)]"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                        lineNumber: 37,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText1$3e$__["DocumentText1"], {
                        size: 22,
                        variant: "Bold",
                        className: "text-[var(--tp-blue-600,#4338CA)]"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "truncate text-[13px] font-semibold leading-snug text-tp-slate-900",
                            title: attachment.fileName,
                            children: attachment.fileName
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-0.5 text-[11px] font-medium leading-tight text-tp-slate-500",
                            children: meta
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
function DocumentAttachmentsStrip({ attachments, embedded }) {
    if (embedded) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-2",
            children: attachments.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EmbeddedAttachmentTile, {
                    attachment: a
                }, `${a.fileName}-${i}`, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2",
        children: attachments.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DocumentAttachmentBubble, {
                attachment: a,
                embedded: false
            }, `${a.fileName}-${i}`, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
function DocumentAttachmentBubble({ attachment, embedded }) {
    if (embedded) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DocumentAttachmentsStrip, {
            attachments: [
                attachment
            ],
            embedded: true
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
            lineNumber: 82,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-[8px] rounded-[8px] border border-tp-slate-200 bg-white px-[10px] py-[8px] shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-[32px] w-[26px] shrink-0 items-center justify-center rounded-[4px] bg-tp-error-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "16",
                    height: "18",
                    viewBox: "0 0 16 18",
                    fill: "none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M10 1H3C2.44772 1 2 1.44772 2 2V16C2 16.5523 2.44772 17 3 17H13C13.5523 17 14 16.5523 14 16V5L10 1Z",
                            fill: "var(--tp-error-100, #FFE4E6)",
                            stroke: "var(--tp-error-500, #E11D48)",
                            strokeWidth: "1.5",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M10 1V5H14",
                            stroke: "var(--tp-error-500, #E11D48)",
                            strokeWidth: "1.5",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: "8",
                            y: "13",
                            textAnchor: "middle",
                            fill: "var(--tp-error-500, #E11D48)",
                            fontSize: "5",
                            fontWeight: "700",
                            fontFamily: "sans-serif",
                            children: "PDF"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 flex-1 flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate text-[14px] font-medium leading-[1.3] text-tp-slate-700",
                        children: attachment.fileName
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    attachment.pageCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px] leading-[1.3] text-tp-slate-400",
                        children: [
                            attachment.pageCount,
                            " ",
                            attachment.pageCount === 1 ? "page" : "pages"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatBubble",
    ()=>ChatBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-touch-device.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardRenderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FeedbackRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$doctor$2d$agent$2f$ai$2d$brand$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/doctor-agent/ai-brand.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Edit2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Edit2.js [app-ssr] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText1$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentText1.js [app-ssr] (ecmascript) <export default as DocumentText1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$DocumentAttachmentBubble$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/chat/DocumentAttachmentBubble.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$DataCompletenessDonut$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$isSituationAtGlanceMessage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/isSituationAtGlanceMessage.ts [app-ssr] (ecmascript)");
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
/**
 * Derive data completeness from card kind — used for completeness ring.
 * Only shown for cards where completeness is meaningful:
 * - POMR problem cards (have actual completeness data)
 * - Document extraction (OCR) — mix of AI extraction vs missing
 * - SBAR — mix of EMR + AI assessment
 * NOT shown for: patient summaries, labs, vitals, med history (pure EMR),
 * DDX/protocol meds (pure AI), symptom collector (patient-reported), etc.
 */ function getCompletenessForOutput(output) {
    if (!output) return null;
    // POMR cards have their own completeness data
    if (output.kind === "pomr_problem_card") {
        const d = output.data;
        return {
            emr: d.completeness.emr,
            ai: d.completeness.ai,
            missing: d.completeness.missing
        };
    }
    switch(output.kind){
        // Document extraction — meaningful: shows how much was extracted vs missing
        case "ocr_extraction":
        case "ocr_pathology":
        case "dental_radiology_scan":
            return {
                emr: 0,
                ai: 90,
                missing: 10
            };
        // SBAR — meaningful: mix of EMR data + AI clinical assessment
        case "sbar_critical":
            return {
                emr: 70,
                ai: 20,
                missing: 10
            };
        // Everything else — no completeness ring (only source tag)
        default:
            return null;
    }
}
/**
 * Derive provenance-focused source references from card output data.
 * Each entry answers "WHERE did this data come from?" — the origin, not the count.
 *
 * Provenance types:
 * - EMR historical records (past visits, demographics, chronic conditions)
 * - Uploaded documents (lab PDFs, prescriptions, discharge summaries)
 * - AI extraction (from uploaded/scanned documents)
 * - Patient-reported (symptom collector intake)
 * - Clinical protocols (guidelines, treatment standards)
 */ function getSourcesForOutput(output, documents) {
    if (!output) return null;
    /** Helper: readable doc name from fileName */ const docName = (doc)=>doc.fileName.replace(/_/g, " ").replace(/\.pdf$/i, "").replace(/\.jpg$/i, "");
    switch(output.kind){
        case "patient_summary":
        case "patient_narrative":
            {
                const d = output.data;
                const entries = [
                    {
                        label: "EMR",
                        description: "Patient's clinical data"
                    }
                ];
                if (d.keyLabs?.length) {
                    const prov = d.dataProvenance;
                    if (prov) {
                        const emrLabs = d.keyLabs.filter((l)=>prov[l.name]?.source === "emr");
                        if (emrLabs.length > 0) {
                            entries.push({
                                label: "Lab Results",
                                description: `${emrLabs.length} lab results`
                            });
                        }
                        const extractedLabs = d.keyLabs.filter((l)=>prov[l.name]?.source === "ai_extracted");
                        if (extractedLabs.length > 0) {
                            const sources = new Set(extractedLabs.map((l)=>prov[l.name].extractedFrom).filter(Boolean));
                            entries.push({
                                label: "Records",
                                description: `${sources.size} uploaded record${sources.size > 1 ? "s" : ""} (${sources.size > 1 ? "multiple dates" : "1 date"})`
                            });
                        }
                    } else {
                        const uploadedDocs = documents?.filter((doc)=>[
                                "pathology",
                                "radiology",
                                "dental_radiology",
                                "discharge_summary",
                                "prescription",
                                "other"
                            ].includes(doc.docType)) || [];
                        if (uploadedDocs.length > 0) {
                            const uniqueDates = new Set(uploadedDocs.map((doc)=>doc.uploadedAt)).size;
                            entries.push({
                                label: "Records",
                                description: `${uploadedDocs.length} uploaded record${uploadedDocs.length > 1 ? "s" : ""} (${uniqueDates > 1 ? `${uniqueDates} dates` : uploadedDocs[0].uploadedAt})`
                            });
                        } else {
                            entries.push({
                                label: "Lab Results",
                                description: `${d.keyLabs.length} lab results`
                            });
                        }
                    }
                }
                if (d.lastVisit) {
                    entries.push({
                        label: "Past Visits",
                        description: `Consultation (${d.lastVisit.date})`
                    });
                }
                if (d.symptomCollectorData) {
                    entries.push({
                        label: "Symptom Collector",
                        description: `Patient's reported data (${d.symptomCollectorData.reportedAt})`
                    });
                }
                return entries;
            }
        case "symptom_collector":
            return [
                {
                    label: "Symptom Collector",
                    description: `Patient's reported data (${output.data.reportedAt || "today"})`
                }
            ];
        case "last_visit":
            return [
                {
                    label: "Past Visits",
                    description: `Last consultation (${output.data?.visitDate || "recent"})`
                }
            ];
        case "lab_panel":
            {
                const d = output.data;
                const labDocs = documents?.filter((doc)=>doc.docType === "pathology") || [];
                const match = d?.panelDate ? labDocs.find((doc)=>doc.uploadedAt === d.panelDate) : labDocs[0];
                return [
                    {
                        label: match ? "Records" : "Lab Results",
                        description: match ? `Uploaded report (${match.uploadedAt})` : `EMR lab results${d?.panelDate ? ` (${d.panelDate})` : ""}`
                    }
                ];
            }
        case "lab_trend":
            {
                const dates = [
                    ...new Set((output.data?.series || []).flatMap((s)=>s.dates || []).map((d)=>d.trim()))
                ];
                const dateStr = dates.length > 1 ? `${dates.length} dates` : dates[0] || "";
                return [
                    {
                        label: "Lab Results",
                        description: `${output.data?.series?.length || 0} parameters${dateStr ? ` (${dateStr})` : ""}`
                    }
                ];
            }
        case "lab_comparison":
            return [
                {
                    label: "Lab Results",
                    description: `${output.data.rows?.length || 0} parameters compared`
                }
            ];
        case "vitals_trend_bar":
        case "vitals_trend_line":
            {
                const series = output.data?.series || [];
                const dates = [
                    ...new Set(series.flatMap((s)=>s.dates || []).map((d)=>d.trim()))
                ];
                const dateStr = dates.length > 1 ? `${dates.length} dates` : dates[0] || "";
                return [
                    {
                        label: "Vitals",
                        description: `${series.map((s)=>s.label).join(", ")}${dateStr ? ` (${dateStr})` : ""}`
                    }
                ];
            }
        case "med_history":
            return [
                {
                    label: "History",
                    description: "Medication history"
                }
            ];
        case "ddx":
            return [
                {
                    label: "Context",
                    description: output.data.context || "Patient's symptoms & history"
                },
                {
                    label: "Protocol",
                    description: "Clinical DDx guidelines"
                }
            ];
        case "protocol_meds":
            return [
                {
                    label: "Context",
                    description: output.data.diagnosis
                },
                {
                    label: "Protocol",
                    description: "Treatment protocols"
                }
            ];
        case "investigation_bundle":
            return [
                {
                    label: "Context",
                    description: "Patient's conditions & history"
                },
                {
                    label: "Protocol",
                    description: "Investigation guidelines"
                }
            ];
        case "follow_up":
            return [
                {
                    label: "Context",
                    description: output.data.context || "Current conditions & treatment"
                },
                {
                    label: "Protocol",
                    description: "Follow-up guidelines"
                }
            ];
        case "advice_bundle":
            return [
                {
                    label: "Protocol",
                    description: "Clinical care & lifestyle guidelines"
                }
            ];
        case "obstetric_summary":
            return [
                {
                    label: "Obstetric",
                    description: `ANC records${output.data.gestationalWeeks ? ` — ${output.data.gestationalWeeks}` : ""}`
                }
            ];
        case "gynec_summary":
            return [
                {
                    label: "Gynec",
                    description: "Gynaecology history & records"
                }
            ];
        case "ophthal_summary":
            return [
                {
                    label: "Ophthal",
                    description: "Ophthalmology records"
                }
            ];
        case "pediatric_summary":
            return [
                {
                    label: "Growth",
                    description: "Pediatric growth & development records"
                }
            ];
        case "pomr_problem_card":
            {
                const d = output.data;
                const entries = [
                    {
                        label: "History",
                        description: `${d.problem} clinical data`
                    }
                ];
                if (d.labs?.length) entries.push({
                    label: "Lab Results",
                    description: `${d.labs.length} results`
                });
                if (d.sourceEntries?.some((se)=>se.type === "uploaded")) entries.push({
                    label: "Records",
                    description: "Uploaded records"
                });
                return entries;
            }
        case "sbar_critical":
            return [
                {
                    label: "History",
                    description: "Clinical history & vitals"
                },
                {
                    label: "AI",
                    description: "AI clinical assessment"
                }
            ];
        case "ocr_pathology":
            return [
                {
                    label: "Records",
                    description: "Uploaded report"
                }
            ];
        case "ocr_extraction":
            return [
                {
                    label: "Records",
                    description: "Uploaded document"
                }
            ];
        case "dental_radiology_scan":
            return [
                {
                    label: "Records",
                    description: "Dental radiology upload"
                }
            ];
        case "drug_interaction":
            return [
                {
                    label: "History",
                    description: "Active medications"
                },
                {
                    label: "Protocol",
                    description: "Drug interaction check"
                }
            ];
        case "allergy_conflict":
            return [
                {
                    label: "History",
                    description: "Allergy records"
                },
                {
                    label: "Protocol",
                    description: "Allergen contraindication check"
                }
            ];
        case "translation":
            return [
                {
                    label: "Context",
                    description: "Current consultation content"
                }
            ];
        case "completeness":
            return [
                {
                    label: "EMR",
                    description: "Current visit completeness check"
                }
            ];
        case "text_fact":
            return [
                {
                    label: output.data.source ? "Reference" : "Context",
                    description: output.data.source || "Patient's clinical context"
                }
            ];
        case "text_alert":
            return [
                {
                    label: "AI",
                    description: "Current clinical data & visit context"
                }
            ];
        case "text_list":
            return [
                {
                    label: "Context",
                    description: "Clinical history & current visit"
                }
            ];
        case "voice_structured_rx":
            return [
                {
                    label: "Voice",
                    description: "Clinical dictation transcript"
                },
                {
                    label: "Dental",
                    description: "Tooth-level examination (FDI)"
                },
                {
                    label: "EMR",
                    description: "Chart & last-visit context"
                }
            ];
        case "referral":
            return [
                {
                    label: "History",
                    description: "Clinical records & diagnosis"
                },
                {
                    label: "Context",
                    description: "Current consultation"
                }
            ];
        case "vaccination_schedule":
            return [
                {
                    label: "Vaccine",
                    description: "Immunisation records"
                },
                {
                    label: "Protocol",
                    description: "Immunisation schedule"
                }
            ];
        case "follow_up_question":
            return [
                {
                    label: "AI",
                    description: "Conversation context"
                }
            ];
        case "patient_list":
        case "follow_up_list":
        case "due_patients":
            return [
                {
                    label: "EMR",
                    description: "Clinic records"
                }
            ];
        case "revenue_bar":
        case "revenue_comparison":
        case "analytics_table":
        case "line_graph":
        case "donut_chart":
        case "pie_chart":
        case "condition_bar":
        case "heatmap":
        case "follow_up_rate":
            return [
                {
                    label: "EMR",
                    description: "Clinic analytics"
                }
            ];
        case "bulk_action":
            return [
                {
                    label: "EMR",
                    description: "Patient communication records"
                }
            ];
        case "welcome_card":
        case "external_cta":
        case "patient_search":
            return null;
        default:
            return [
                {
                    label: "AI",
                    description: "Patient & clinical data"
                }
            ];
    }
}
/** Short badge text for each source type — maps to sidebar section names */ function getSourceTag(label) {
    const TAG_MAP = {
        "EMR": "EMR",
        "Lab Results": "Lab Results",
        "Records": "Records",
        "Past Visits": "Past Visits",
        "History": "History",
        "Vitals": "Vitals",
        "Obstetric": "Obstetric",
        "Gynec": "Gynec",
        "Ophthal": "Ophthal",
        "Growth": "Growth",
        "Vaccine": "Vaccine",
        "Symptom Collector": "Symptom Collector",
        "Receptionist Agent": "Receptionist Agent",
        "AI": "AI",
        "Context": "Context",
        "Protocol": "Protocol",
        "Rx": "Rx",
        "Voice": "Voice",
        "Reference": "Reference"
    };
    return TAG_MAP[label] || label;
}
/**
 * Portal-based tooltip with arrow — shared by SourceTag and DataCompletenessDonut.
 * Renders above the trigger, arrow points to center of trigger, viewport-aware.
 */ function PortalTooltip({ isVisible, triggerRef, children, width = 240, onMouseEnter, onMouseLeave }) {
    const tooltipRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [pos, setPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const updatePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!triggerRef.current || !tooltipRef.current) return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipEl = tooltipRef.current;
        const tooltipH = tooltipEl.offsetHeight;
        const MARGIN = 8;
        const GAP = 8;
        // Center tooltip horizontally on trigger
        const triggerCenterX = triggerRect.left + triggerRect.width / 2;
        let left = triggerCenterX - width / 2;
        // Clamp to viewport
        left = Math.max(MARGIN, Math.min(left, window.innerWidth - width - MARGIN));
        // Arrow points at trigger center
        const arrowLeft = Math.max(12, Math.min(triggerCenterX - left, width - 12));
        // Position above trigger
        const top = triggerRect.top - GAP - tooltipH;
        setPos({
            top,
            left,
            arrowLeft
        });
    }, [
        triggerRef,
        width
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isVisible) {
            setPos(null);
            return;
        }
        requestAnimationFrame(updatePosition);
    }, [
        isVisible,
        updatePosition
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isVisible) return;
        const reposition = ()=>requestAnimationFrame(updatePosition);
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
        return ()=>{
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [
        isVisible,
        updatePosition
    ]);
    if (!isVisible || typeof document === "undefined") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: tooltipRef,
        className: "fixed z-[9999]",
        style: pos ? {
            top: pos.top,
            left: pos.left,
            width,
            opacity: 1,
            transition: "opacity 100ms ease-out"
        } : {
            top: -9999,
            left: -9999,
            width,
            opacity: 0
        },
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[8px] bg-white overflow-hidden",
                style: {
                    boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                    border: "1px solid rgba(148,163,184,0.2)"
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                lineNumber: 367,
                columnNumber: 7
            }, this),
            pos && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    paddingLeft: pos.arrowLeft - 5
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 0,
                        height: 0,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "5px solid white",
                        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.06))"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                    lineNumber: 379,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                lineNumber: 378,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
        lineNumber: 356,
        columnNumber: 5
    }, this), document.body);
}
/** Dot color for each source type — subtle, meaningful differentiation */ function getDotColor(label) {
    switch(label){
        case "EMR":
            return "#7C3AED" // violet — primary clinical data
            ;
        case "Lab Results":
            return "#3C3BB5" // blue — lab/diagnostic
            ;
        case "Records":
            return "#D97706" // amber — uploaded documents
            ;
        case "Past Visits":
            return "#059669" // green — visit history
            ;
        case "Symptom Collector":
        case "Receptionist Agent":
            return "#DB2777" // pink — patient-reported
            ;
        case "Vitals":
            return "#0891B2" // teal — vitals
            ;
        case "History":
            return "#7C3AED" // violet — clinical history
            ;
        case "Obstetric":
        case "Gynec":
        case "Ophthal":
        case "Growth":
        case "Vaccine":
            return "#7C3AED" // violet — specialty sections
            ;
        case "AI":
            return "#4F46E5" // indigo — AI-generated
            ;
        case "Protocol":
            return "#475569" // slate — guidelines
            ;
        case "Context":
            return "#475569" // slate — context
            ;
        default:
            return "#64748B" // neutral
            ;
    }
}
/**
 * Source provenance — click-to-open dropdown below the Source button.
 * Uses portal for proper layering. Positioned directly below the trigger.
 * Shows WHERE data was fetched from — trust signal for doctors.
 */ function SourceDropdown({ isOpen, onToggle, sources }) {
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [pos, setPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const showTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hideTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Hover handlers — show on hover after short delay, hide with grace period
    const hoverShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (hideTimer.current) clearTimeout(hideTimer.current);
        if (isOpen) return;
        showTimer.current = setTimeout(()=>onToggle(), 200);
    }, [
        isOpen,
        onToggle
    ]);
    const hoverHide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (showTimer.current) clearTimeout(showTimer.current);
        hideTimer.current = setTimeout(()=>{
            if (isOpen) onToggle();
        }, 250);
    }, [
        isOpen,
        onToggle
    ]);
    const keepOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (hideTimer.current) clearTimeout(hideTimer.current);
        if (showTimer.current) clearTimeout(showTimer.current);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>{
            if (showTimer.current) clearTimeout(showTimer.current);
            if (hideTimer.current) clearTimeout(hideTimer.current);
        }, []);
    // Position dropdown — above or below depending on viewport space
    const updatePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!triggerRef.current || !dropdownRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        const dropdownH = dropdownRef.current.offsetHeight;
        const dropdownWidth = 280;
        const GAP = 4;
        const MARGIN = 8;
        // Open above if not enough room below
        const spaceBelow = window.innerHeight - rect.bottom;
        const openAbove = spaceBelow < dropdownH + GAP + MARGIN;
        const top = openAbove ? rect.top - dropdownH - GAP : rect.bottom + GAP;
        // Clamp left to stay in viewport
        let left = rect.left;
        if (left + dropdownWidth > window.innerWidth - MARGIN) {
            left = window.innerWidth - dropdownWidth - MARGIN;
        }
        if (left < MARGIN) left = MARGIN;
        setPos({
            top,
            left
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) return;
        updatePosition();
        const reposition = ()=>requestAnimationFrame(updatePosition);
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
        return ()=>{
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [
        isOpen,
        updatePosition
    ]);
    // Close on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) return;
        const handleClick = (e)=>{
            if (triggerRef.current?.contains(e.target) || dropdownRef.current?.contains(e.target)) return;
            onToggle();
        };
        document.addEventListener("mousedown", handleClick);
        return ()=>document.removeEventListener("mousedown", handleClick);
    }, [
        isOpen,
        onToggle
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: triggerRef,
                type: "button",
                onClick: onToggle,
                onMouseEnter: hoverShow,
                onMouseLeave: hoverHide,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-[3px] rounded-[4px] px-[5px] py-[2px] transition-colors", isOpen ? "text-tp-violet-600 bg-tp-violet-50" : "text-tp-slate-400 hover:text-tp-slate-500 hover:bg-tp-slate-50"),
                "aria-label": "View data sources",
                "aria-expanded": isOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText1$3e$__["DocumentText1"], {
                        size: 13,
                        variant: "Linear"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                        lineNumber: 531,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[14px] font-medium leading-[1]",
                        children: "Source"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                        lineNumber: 532,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                lineNumber: 516,
                columnNumber: 7
            }, this),
            isOpen && typeof document !== "undefined" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: dropdownRef,
                className: "fixed z-[9999] w-[280px] rounded-[8px] bg-white overflow-hidden",
                onMouseEnter: keepOpen,
                onMouseLeave: hoverHide,
                style: {
                    top: pos?.top ?? -9999,
                    left: pos?.left ?? -9999,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 0 0 1px rgba(148,163,184,0.12)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-[5px] px-[12px] py-[7px]",
                        style: {
                            borderBottom: "1px solid rgba(148,163,184,0.10)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText1$3e$__["DocumentText1"], {
                                size: 12,
                                variant: "Bold",
                                className: "text-tp-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                lineNumber: 553,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[14px] font-semibold text-tp-slate-500",
                                children: [
                                    "Compiled from ",
                                    sources.length,
                                    " source",
                                    sources.length > 1 ? "s" : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                lineNumber: 554,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                        lineNumber: 549,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-[10px] py-[6px] max-h-[240px] overflow-y-auto",
                        children: sources.map((src, i)=>{
                            const dotColor = getDotColor(src.label);
                            const tag = getSourceTag(src.label);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-[7px] py-[4px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-[4px] flex-shrink-0 h-[5px] w-[5px] rounded-full",
                                        style: {
                                            backgroundColor: dotColor
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                        lineNumber: 567,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[14px] leading-[1.5] text-tp-slate-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: tag
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                                    lineNumber: 573,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-tp-slate-400 mx-[4px]",
                                                    children: "·"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                                    lineNumber: 574,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-tp-slate-500",
                                                    children: src.description
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                                    lineNumber: 575,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                            lineNumber: 572,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                        lineNumber: 571,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                lineNumber: 565,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                        lineNumber: 560,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                lineNumber: 537,
                columnNumber: 9
            }, this), document.body)
        ]
    }, void 0, true);
}
/** Convert light markdown (bold + links) into rich text. Uses non-greedy `**…**` so filenames and phrases render bold. */ function renderLightMarkdown(text, onPillTap) {
    const tokens = text.split(/(\*\*[\s\S]+?\*\*|\[[^\]]+\]\([^)]+\))/g);
    return tokens.map((token, i)=>{
        if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                className: "font-semibold text-tp-slate-900",
                children: token.slice(2, -2)
            }, i, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                lineNumber: 594,
                columnNumber: 14
            }, this);
        }
        if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
            const match = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (!match) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: token
            }, i, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                lineNumber: 599,
                columnNumber: 26
            }, this);
            const [, label, href] = match;
            if (href.startsWith("action:")) {
                const actionLabel = decodeURIComponent(href.slice("action:".length));
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>onPillTap?.(actionLabel || label),
                    className: "font-medium text-tp-blue-600 underline underline-offset-2 transition-colors hover:text-tp-blue-700",
                    children: label
                }, i, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                    lineNumber: 605,
                    columnNumber: 11
                }, this);
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: href,
                target: "_blank",
                rel: "noreferrer",
                className: "font-medium text-tp-blue-600 underline underline-offset-2 transition-colors hover:text-tp-blue-700",
                children: label
            }, i, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                lineNumber: 617,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: token
        }, i, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
            lineNumber: 629,
            columnNumber: 12
        }, this);
    });
}
function formatTime(iso) {
    try {
        const d = new Date(iso);
        let hours = d.getHours();
        const mm = d.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        if (hours === 0) hours = 12;
        return `${hours}:${mm} ${ampm}`;
    } catch  {
        return "";
    }
}
/**
 * Typewriter hook — reveals text character by character for a streaming feel.
 * Only runs once when the component first mounts with text; subsequent renders
 * show the full text immediately.
 */ function useTypewriter(text, shouldAnimate, speed = 18) {
    const [charIndex, setCharIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(shouldAnimate ? 0 : text.length);
    const isDone = charIndex >= text.length;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!shouldAnimate || charIndex >= text.length) return;
        const t = setTimeout(()=>setCharIndex((i)=>Math.min(i + 1, text.length)), speed);
        return ()=>clearTimeout(t);
    }, [
        charIndex,
        text.length,
        shouldAnimate,
        speed
    ]);
    return {
        displayText: text.slice(0, charIndex),
        isDone
    };
}
function ChatBubble({ message, onFeedback, onPillTap, onCopy, onSidebarNav, activeSpecialty, patientDocuments, onPatientSelect, onEditMessage, onOpenMedicalRecords }) {
    const isTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTouchDevice"])();
    const isUser = message.role === "user";
    const timestamp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>formatTime(message.createdAt), [
        message.createdAt
    ]);
    const [sourceOpen, setSourceOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // ── Edit state — must be before any conditionals (hooks rule) ──
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editText, setEditText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(message.text);
    const editRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isEditing && editRef.current) {
            editRef.current.focus();
            editRef.current.style.height = "auto";
            editRef.current.style.height = editRef.current.scrollHeight + "px";
        }
    }, [
        isEditing
    ]);
    const handleSaveEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const trimmed = editText.trim();
        if (trimmed && trimmed !== message.text && onEditMessage) {
            onEditMessage(message.id, trimmed);
        }
        setIsEditing(false);
    }, [
        editText,
        message.text,
        message.id,
        onEditMessage
    ]);
    const handleCancelEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setEditText(message.text);
        setIsEditing(false);
    }, [
        message.text
    ]);
    // ── Track whether this is a "new" message (just appeared) for streaming ──
    const isNewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    const shouldStream = isNewRef.current && !isUser && !!message.text;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        isNewRef.current = false;
    }, []);
    // ── Typewriter for assistant text ──
    const { displayText, isDone: textDone } = useTypewriter(message.text || "", shouldStream, 16);
    // ── Phased card reveal: card fades in after text finishes streaming ──
    const [cardRevealed, setCardRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasCard = !!message.rxOutput;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hasCard || isUser) {
            setCardRevealed(true);
            return;
        }
        if (shouldStream && !textDone) return; // Wait for text to finish
        // Small delay after text completes, then reveal card
        const delay = message.text ? 150 : 80;
        const t = setTimeout(()=>setCardRevealed(true), delay);
        return ()=>clearTimeout(t);
    }, [
        hasCard,
        isUser,
        message.text,
        shouldStream,
        textDone
    ]);
    // ---- USER bubble ----
    if (isUser) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "group/msg flex w-full flex-col",
            children: isEditing ? /* ── Edit mode — full-width within chat area ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full rounded-[12px] border border-tp-blue-200 bg-white px-3 py-2.5",
                style: {
                    boxShadow: "0 0 0 2px rgba(75,74,213,0.08)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        ref: editRef,
                        value: editText,
                        onChange: (e)=>{
                            setEditText(e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                        },
                        onKeyDown: (e)=>{
                            if (e.key === "Escape") handleCancelEdit();
                        },
                        className: "w-full resize-none bg-transparent text-[14px] leading-[20px] text-tp-slate-700 outline-none",
                        rows: 1
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                        lineNumber: 768,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-[8px] flex items-center justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-[6px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleCancelEdit,
                                    className: "rounded-[6px] px-[10px] py-[4px] text-[12px] font-medium text-tp-slate-500 transition-colors hover:bg-tp-slate-50",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                    lineNumber: 780,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleSaveEdit,
                                    disabled: !editText.trim() || editText.trim() === message.text,
                                    className: "rounded-[6px] px-[10px] py-[4px] text-[12px] font-medium text-white transition-colors disabled:opacity-40",
                                    style: {
                                        background: "var(--tp-blue-500, #4B4AD5)"
                                    },
                                    children: "Send"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                    lineNumber: 781,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                            lineNumber: 779,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                        lineNumber: 778,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                lineNumber: 767,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-full max-w-[85%] flex-col items-end gap-[6px]",
                    children: [
                        (()=>{
                            const chatAttachments = message.attachments?.length ? message.attachments : message.attachment ? [
                                message.attachment
                            ] : [];
                            return chatAttachments.length > 0 || message.text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full overflow-hidden rounded-[14px] rounded-br-[4px] bg-tp-slate-200/55 text-[14px] leading-[18px] text-tp-slate-800",
                                children: [
                                    chatAttachments.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-3", message.text && "pb-2"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$DocumentAttachmentBubble$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DocumentAttachmentsStrip"], {
                                            attachments: chatAttachments,
                                            embedded: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                            lineNumber: 795,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                        lineNumber: 794,
                                        columnNumber: 17
                                    }, this) : null,
                                    message.text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("whitespace-pre-wrap break-words px-3 py-2.5", chatAttachments.length > 0 && "pt-0"),
                                        children: message.isVoiceTranscript ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-1.5 text-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] font-semibold uppercase tracking-[0.08em] text-tp-slate-500",
                                                    children: "Transcript"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                                    lineNumber: 807,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[14px] leading-[1.55] italic text-tp-slate-700/75",
                                                    children: [
                                                        '"',
                                                        message.text,
                                                        '"'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                                    lineNumber: 810,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                            lineNumber: 806,
                                            columnNumber: 21
                                        }, this) : renderLightMarkdown(message.text)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                        lineNumber: 799,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                lineNumber: 792,
                                columnNumber: 13
                            }, this) : null;
                        })(),
                        message.text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-[2px] transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/msg:opacity-100"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                                    label: "Copy to clipboard",
                                    onAction: ()=>navigator.clipboard?.writeText(message.text),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                        onClick: ()=>navigator.clipboard?.writeText(message.text),
                                        className: "!text-tp-slate-400 hover:!text-tp-slate-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                        lineNumber: 830,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                    lineNumber: 826,
                                    columnNumber: 15
                                }, this),
                                onEditMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setEditText(message.text);
                                        setIsEditing(true);
                                    },
                                    className: "flex h-[16px] w-[16px] items-center justify-center text-tp-slate-400 transition-colors hover:text-tp-slate-600",
                                    title: "Edit message",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Edit2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                        size: 14,
                                        variant: "Linear"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                        lineNumber: 839,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                    lineNumber: 833,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                            lineNumber: 825,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                    lineNumber: 787,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                lineNumber: 786,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
            lineNumber: 764,
            columnNumber: 7
        }, this);
    }
    // ---- ASSISTANT layout ----
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group/msg flex w-full justify-start",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full flex-col items-start",
            children: [
                message.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-[6px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$doctor$2d$agent$2f$ai$2d$brand$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AiBrandSparkIcon"], {
                            size: 20,
                            className: "mt-0.5 shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                            lineNumber: 859,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] leading-[18px] text-tp-slate-700 whitespace-pre-wrap break-words",
                            children: [
                                renderLightMarkdown(shouldStream ? displayText : message.text, onPillTap),
                                shouldStream && !textDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block w-[2px] h-[14px] bg-tp-violet-400 ml-[1px] align-middle animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                    lineNumber: 867,
                                    columnNumber: 45
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                            lineNumber: 865,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                    lineNumber: 857,
                    columnNumber: 11
                }, this),
                !message.text && message.rxOutput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-[6px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$doctor$2d$agent$2f$ai$2d$brand$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AiBrandSparkIcon"], {
                        size: 20,
                        className: "mt-0.5 shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                        lineNumber: 875,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                    lineNumber: 874,
                    columnNumber: 11
                }, this),
                message.rxOutput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-[6px] min-w-0 max-w-full pl-[30px] transition-all duration-[400ms] ease-out", cardRevealed ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[8px] scale-[0.98]"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardRenderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardRenderer"], {
                        output: message.rxOutput,
                        onPillTap: onPillTap,
                        onCopy: onCopy,
                        onSidebarNav: onSidebarNav,
                        activeSpecialty: activeSpecialty,
                        onPatientSelect: onPatientSelect,
                        onOpenMedicalRecords: onOpenMedicalRecords
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                        lineNumber: 893,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                    lineNumber: 885,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ml-[30px] mt-[2px] flex items-center gap-[6px]",
                    children: [
                        onFeedback ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FeedbackRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FeedbackRow"], {
                            messageId: message.id,
                            initialFeedback: message.feedbackGiven,
                            onFeedback: onFeedback
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                            lineNumber: 908,
                            columnNumber: 13
                        }, this) : null,
                        (()=>{
                            const output = message.rxOutput;
                            if (!output) return null;
                            const completeness = getCompletenessForOutput(output);
                            const sources = getSourcesForOutput(output, patientDocuments);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    completeness && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-[12px] w-[1px] flex-shrink-0",
                                                style: {
                                                    background: "linear-gradient(180deg, transparent 0%, rgba(148,163,184,0.25) 50%, transparent 100%)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                                lineNumber: 928,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$DataCompletenessDonut$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataCompletenessDonut"], {
                                                emr: completeness.emr,
                                                ai: completeness.ai,
                                                missing: completeness.missing,
                                                size: "sm"
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                                lineNumber: 934,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    sources && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-[12px] w-[1px] flex-shrink-0",
                                                style: {
                                                    background: "linear-gradient(180deg, transparent 0%, rgba(148,163,184,0.25) 50%, transparent 100%)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                                lineNumber: 946,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SourceDropdown, {
                                                isOpen: sourceOpen,
                                                onToggle: ()=>setSourceOpen((v)=>!v),
                                                sources: sources
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                                lineNumber: 952,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true);
                        })()
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                    lineNumber: 906,
                    columnNumber: 9
                }, this),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$isSituationAtGlanceMessage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSituationAtGlanceAssistantMessage"])(message) && message.suggestions && message.suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ml-[30px] mt-[8px] w-[calc(100%-30px)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "da-suggestion-scroll flex gap-[6px] overflow-x-auto pb-[2px]",
                        children: message.suggestions.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onPillTap?.(s.message),
                                className: "flex-shrink-0 rounded-full px-[10px] py-[5px] text-[12px] font-medium transition-all duration-150 active:scale-[0.97]",
                                style: {
                                    background: "linear-gradient(135deg, rgba(213,101,234,0.08) 0%, rgba(103,58,172,0.08) 50%, rgba(26,25,148,0.08) 100%)",
                                    border: "1px solid rgba(103,58,172,0.15)"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        background: "linear-gradient(91deg, #D565EA 3%, #673AAC 67%, #1A1994 130%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text"
                                    },
                                    children: s.label
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                    lineNumber: 979,
                                    columnNumber: 19
                                }, this)
                            }, i, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                                lineNumber: 969,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                        lineNumber: 967,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
                    lineNumber: 966,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
            lineNumber: 854,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx",
        lineNumber: 853,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/chat/TypingIndicator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypingIndicator",
    ()=>TypingIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$doctor$2d$agent$2f$ai$2d$brand$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/doctor-agent/ai-brand.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
// -----------------------------------------------------------------
// TypingIndicator — rotating “thinking” copy for clinicians
//
// Every ~900ms the line advances (with a quick slide), so it feels
// alive even when the model takes a few seconds. queryHint is always
// the first beat; follow-ups are quirky, ward-round flavoured lines.
// -----------------------------------------------------------------
/** How long each line stays readable before sliding away */ const HOLD_MS = 900;
/** Slide-out / swap / slide-in budget */ const TRANSITION_MS = 260;
/** When no hint (e.g. design-system preview) — still rotates */ const DEFAULT_THINKING_SEQUENCE = [
    "Stitching the chart into a coherent story",
    "Skipping the fluff — surfacing what matters",
    "Like a sharp ward round, minus the pager beeps",
    "Correlating vitals, history, and the question you asked",
    "Pulling the signal out of the noise",
    "Almost there — bedside manner loading"
];
/** Extra beats after the contextual first line (must stay one line in UI) */ const HINT_FOLLOWUPS = {
    "Checking drug interactions": [
        "Cross-checking doses with age and renal function",
        "Scanning for awkward pairings you’d flag yourself",
        "No white coat — still obsessive about safety"
    ],
    "Fetching lab results": [
        "Trends beat single snapshots — grabbing both",
        "Separating ‘watch’ from ‘act now’",
        "Numbers first, interpretation on deck"
    ],
    "Looking up patient records": [
        "Skimming encounters without missing the pivot",
        "Demographics, problems, recent trajectory",
        "The chart is thick — the answer won’t be"
    ],
    "Loading intake data": [
        "Patient-reported symptoms — reading carefully",
        "Triaging what’s new vs chronic backdrop",
        "Pre-visit forms, decoded"
    ],
    "Reviewing clinical guidelines": [
        "Guidelines in one tab, your patient in the other",
        "Evidence first, then how it fits this case",
        "DDx seasoning — not cookbook medicine"
    ],
    "Reviewing investigation protocols": [
        "Right test, right urgency",
        "Avoiding the ‘scan everything’ reflex",
        "Who ordered what, and was it enough?"
    ],
    "Analyzing document": [
        "OCR and sense-making in parallel",
        "Tables, impressions, fine print",
        "If it’s illegible, we still squint politely"
    ],
    "Reviewing clinical data": [
        "Vitals, labs, narrative — one thread",
        "Teaching-file brain, real-shift speed",
        "Connecting dots the EMR scattered"
    ],
    "Comparing clinical data": [
        "Then vs now — what actually moved?",
        "Same patient, different chapter",
        "Delta matters more than absolutes"
    ],
    "Fetching clinic data": [
        "Queue, revenue, reality — operational lens",
        "Big-picture clinic pulse",
        "From the waiting room to the spreadsheet"
    ],
    "Preparing response": [
        "Compressing thought into something you can skim",
        "Attending-grade summary, intern-grade latency",
        "Almost clipboard-ready"
    ]
};
const GENERIC_FOLLOWUPS = [
    "Still thinking — medicine isn’t multiple choice",
    "Organizing thoughts like a quiet pre-clinic huddle",
    "Brewing something concise enough for a busy OPD"
];
function buildThinkingSequence(queryHint) {
    const hint = queryHint?.trim();
    if (!hint) return [
        ...DEFAULT_THINKING_SEQUENCE
    ];
    const extras = HINT_FOLLOWUPS[hint] ?? GENERIC_FOLLOWUPS;
    // De-dupe if hint accidentally matches a follow-up
    const seen = new Set([
        hint
    ]);
    const uniqueExtras = extras.filter((x)=>{
        if (seen.has(x)) return false;
        seen.add(x);
        return true;
    });
    return [
        hint,
        ...uniqueExtras
    ];
}
function TypingIndicator({ className, queryHint }) {
    const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>buildThinkingSequence(queryHint), [
        queryHint
    ]);
    const [idx, setIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("in");
    const timersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const clearTimers = ()=>{
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };
    // Reset carousel when the hint (and thus sequence) changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIdx(0);
        setPhase("in");
    }, [
        messages
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        clearTimers();
        if (messages.length <= 1) return;
        const schedule = (fn, ms)=>{
            const id = setTimeout(fn, ms);
            timersRef.current.push(id);
            return id;
        };
        /** One full beat: hold → slide out → swap → slide in → schedule next beat */ const step = ()=>{
            schedule(()=>{
                setPhase("out");
                schedule(()=>{
                    setIdx((i)=>(i + 1) % messages.length);
                    setPhase("in");
                    schedule(step, HOLD_MS);
                }, TRANSITION_MS);
            }, HOLD_MS);
        };
        schedule(step, HOLD_MS);
        return ()=>{
            clearTimers();
        };
    }, [
        messages
    ]);
    const displayText = messages[idx] ?? "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-start gap-[8px]", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$doctor$2d$agent$2f$ai$2d$brand$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AiBrandSparkIcon"], {
                size: 20,
                className: "da-typing-spark-pulse mt-[1px] shrink-0"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/TypingIndicator.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "typing-carousel-wrap min-w-0 flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("typing-carousel-item", phase === "out" ? "typing-slide-out" : "typing-slide-in"),
                    children: [
                        displayText,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "typing-ellipsis",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "typing-ellipsis-dot",
                                    style: {
                                        animationDelay: "0ms"
                                    },
                                    children: "."
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/TypingIndicator.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "typing-ellipsis-dot",
                                    style: {
                                        animationDelay: "180ms"
                                    },
                                    children: "."
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/TypingIndicator.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "typing-ellipsis-dot",
                                    style: {
                                        animationDelay: "360ms"
                                    },
                                    children: "."
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/TypingIndicator.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/TypingIndicator.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/TypingIndicator.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/TypingIndicator.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes daTypingSpark {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(0.96); }
        }
        .da-typing-spark-pulse {
          animation: daTypingSpark 1.25s ease-in-out infinite;
        }

        .typing-carousel-wrap {
          overflow: hidden;
          height: 18px;
          display: flex;
          align-items: center;
          padding-top: 1px;
        }

        .typing-carousel-item {
          display: inline-flex;
          align-items: center;
          max-width: 100%;
          font-size: 12.5px;
          font-weight: 500;
          line-height: 18px;
          color: var(--tp-slate-500, #717179);
          white-space: nowrap;
          text-overflow: ellipsis;
          will-change: transform, opacity;
        }

        .typing-slide-in {
          animation: typingSlideIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .typing-slide-out {
          animation: typingSlideOut 0.26s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }

        @keyframes typingSlideIn {
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes typingSlideOut {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-10px);
            opacity: 0;
          }
        }

        .typing-ellipsis {
          display: inline;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        .typing-ellipsis-dot {
          display: inline-block;
          animation: ellipsisFade 1.4s ease-in-out infinite;
          opacity: 0.3;
        }

        @keyframes ellipsisFade {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/TypingIndicator.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/TypingIndicator.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/chat/ChatThread.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatThread",
    ()=>ChatThread
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$ChatBubble$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/chat/ChatBubble.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$TypingIndicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/chat/TypingIndicator.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function ChatThread({ messages, isTyping = false, onFeedback, onPillTap, onCopy, onSidebarNav, className, activeSpecialty, patientDocuments, onPatientSelect, typingHint, onEditMessage, onOpenMedicalRecords }) {
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Track which message IDs have already been "seen" — skip animation for those
    const seenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const prevMessageCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const [, forceRender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Mark all current messages as seen on mount (so initial load doesn't animate)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (seenRef.current.size === 0 && messages.length > 0) {
            messages.forEach((m)=>seenRef.current.add(m.id));
            forceRender((n)=>n + 1);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // Only scroll to bottom when typing indicator appears — no auto-scroll on new messages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isTyping) {
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
        prevMessageCountRef.current = messages.length;
    }, [
        messages.length,
        isTyping
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col px-[8px] pt-[14px] pb-[12px]", "bg-gradient-to-b from-[rgba(213,101,234,0.02)] via-white to-[rgba(26,25,148,0.02)]", className),
        children: [
            messages.map((message, index)=>{
                // Spacing: 6px between same-role, 16px between different roles for clear separation
                const prevMessage = index > 0 ? messages[index - 1] : null;
                const isSameRole = prevMessage?.role === message.role;
                const spacing = index === 0 ? "" : isSameRole ? "mt-[6px]" : "mt-[16px]";
                // Stream-in animation: only for NEW assistant messages WITHOUT text.
                // Text-bearing messages use the typewriter hook in ChatBubble instead,
                // so the CSS opacity animation would hide the typewriter effect.
                const isNew = !seenRef.current.has(message.id);
                const isAssistant = message.role === "assistant";
                if (isNew) seenRef.current.add(message.id);
                const animate = isNew && isAssistant && !message.text;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(spacing, animate && "chat-stream-in"),
                    style: animate ? {
                        animationDelay: `${(index - (messages.length - 1)) * 0 + 50}ms`
                    } : undefined,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$ChatBubble$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatBubble"], {
                        message: message,
                        onFeedback: onFeedback,
                        onPillTap: onPillTap,
                        onCopy: onCopy,
                        onSidebarNav: onSidebarNav,
                        activeSpecialty: activeSpecialty,
                        patientDocuments: patientDocuments,
                        onPatientSelect: onPatientSelect,
                        onEditMessage: onEditMessage,
                        onOpenMedicalRecords: onOpenMedicalRecords
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatThread.tsx",
                        lineNumber: 97,
                        columnNumber: 13
                    }, this)
                }, message.id, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatThread.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this);
            }),
            isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-[10px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$TypingIndicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TypingIndicator"], {
                    queryHint: typingHint
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatThread.tsx",
                    lineNumber: 116,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatThread.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: bottomRef
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatThread.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes chatStreamIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(2px);
          }
          50% {
            opacity: 0.7;
            transform: translateY(3px);
            filter: blur(0.5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .chat-stream-in {
          animation: chatStreamIn 550ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .da-suggestion-scroll::-webkit-scrollbar { height: 0; display: none; }
        .da-suggestion-scroll { scrollbar-width: none; -ms-overflow-style: none; }
      `
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatThread.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatThread.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WelcomeScreen",
    ()=>WelcomeScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Calendar2.js [app-ssr] (ecmascript) <export default as Calendar2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentText.js [app-ssr] (ecmascript) <export default as DocumentText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Receipt1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt1$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Receipt1.js [app-ssr] (ecmascript) <export default as Receipt1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$StatusUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__StatusUp$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/StatusUp.js [app-ssr] (ecmascript) <export default as StatusUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MessageQuestion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageQuestion$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/MessageQuestion.js [app-ssr] (ecmascript) <export default as MessageQuestion>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ClipboardText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardText$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ClipboardText.js [app-ssr] (ecmascript) <export default as ClipboardText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Activity.js [app-ssr] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Hospital$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hospital$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Hospital.js [app-ssr] (ecmascript) <export default as Hospital>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Health$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Health$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Health.js [app-ssr] (ecmascript) <export default as Health>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$SearchStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchStatus$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/SearchStatus.js [app-ssr] (ecmascript) <export default as SearchStatus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentUpload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentUpload$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentUpload.js [app-ssr] (ecmascript) <export default as DocumentUpload>");
"use client";
;
;
const ICON_SIZE = 18;
const CONTEXT_ACTIONS = {
    homepage: [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 40,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Follow-up Dues",
            subtitle: "View overdue and pending follow-ups that need your attention today",
            message: "Follow-up dues today"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$StatusUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__StatusUp$3e$__["StatusUp"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Weekly KPIs",
            subtitle: "Compare this week's clinic performance against your previous week",
            message: "Weekly KPI dashboard"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Receipt1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt1$3e$__["Receipt1"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Today's Collection",
            subtitle: "Get a quick summary of billing, advances, and outstanding dues",
            message: "Today's collection"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 58,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Chronic Conditions",
            subtitle: "See distribution of DM, HTN, and other chronic conditions in your clinic",
            message: "Condition distribution"
        }
    ],
    // RxPad actions are built dynamically — see buildRxPadActions()
    rxpad: [],
    patient_detail: [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText$3e$__["DocumentText"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Patient Summary",
            subtitle: "Get a complete clinical overview including vitals, labs, and history",
            message: "Patient summary"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Vital Trends",
            subtitle: "Track blood pressure, weight, and SpO2 trends over recent visits",
            message: "Vital trends"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ClipboardText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardText$3e$__["ClipboardText"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 80,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Lab Results",
            subtitle: "Review recent lab values and flagged abnormal parameters",
            message: "Labs flagged"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__["Calendar2"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 86,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Last Visit",
            subtitle: "View the previous visit summary, prescriptions, and follow-up notes",
            message: "Last visit details"
        }
    ],
    billing: [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Receipt1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt1$3e$__["Receipt1"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 94,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Today's Billing",
            subtitle: "View today's revenue collection and outstanding payment summary",
            message: "Show today's billing summary"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$StatusUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__StatusUp$3e$__["StatusUp"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 100,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Revenue Trends",
            subtitle: "Compare weekly and monthly revenue to spot growth patterns",
            message: "Show revenue trends this week"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Hospital$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hospital$3e$__["Hospital"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 106,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Pending Dues",
            subtitle: "See patients with outstanding balances that need follow-up",
            message: "Show patients with pending dues"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MessageQuestion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageQuestion$3e$__["MessageQuestion"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 112,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Generate Invoice",
            subtitle: "Create and send a new invoice for a specific patient visit",
            message: "Help me generate an invoice"
        }
    ],
    default: [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Health$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Health$3e$__["Health"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 120,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Patient Summary",
            subtitle: "Get a complete clinical overview of the selected patient's history",
            message: "Show me this patient's summary"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$SearchStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchStatus$3e$__["SearchStatus"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 126,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Lab Results",
            subtitle: "Review recent investigation reports and flagged abnormal values",
            message: "Show recent lab results"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__["Calendar2"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 132,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Today's Schedule",
            subtitle: "View today's appointment list and upcoming patient queue",
            message: "Show today's schedule"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MessageQuestion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageQuestion$3e$__["MessageQuestion"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 138,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            title: "Ask Anything",
            subtitle: "Ask clinical questions, guidelines, or anything about your practice",
            message: "What clinical guidelines apply here?"
        }
    ]
};
/**
 * ═══════════════════════════════════════════════════════════════
 * PATIENT CANNED ACTIONS — Smart Priority System
 * ═══════════════════════════════════════════════════════════════
 *
 * 5 candidate cards, pick best 4 based on available patient data:
 *
 *   1. INTAKE    — "Reported by patient"         (only if symptom collector data exists)
 *   2. SUMMARY   — "Patient summary"            (always available)
 *   3. HISTORY   — "Medical history"            (past visits, prescriptions)
 *   4. SPECIALTY — Specialty-specific history    (obstetric / gynec / pediatric / ophthal)
 *   5. VITALS    — "Vital trends"               (fallback when a slot is empty)
 *
 * Priority rules:
 *   WITH intake + WITH specialty → intake, summary, history, specialty
 *   WITH intake + NO specialty  → intake, summary, history, vitals
 *   NO intake + WITH specialty  → summary, history, specialty, vitals
 *   NO intake + NO specialty    → summary, history, vitals, past visit details
 *
 * This logic is shared between V0 and non-V0 panels.
 * ═══════════════════════════════════════════════════════════════
 */ // Individual action definitions for dynamic composition
const PATIENT_ACTION_INTAKE = {
    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ClipboardText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardText$3e$__["ClipboardText"], {
        size: ICON_SIZE,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
        lineNumber: 171,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    title: "Reported by patient",
    subtitle: "Symptoms & history shared before the visit",
    message: "Show reported intake"
};
const PATIENT_ACTION_SUMMARY = {
    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText$3e$__["DocumentText"], {
        size: ICON_SIZE,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
        lineNumber: 177,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    title: "Patient summary",
    subtitle: "Clinical overview with vitals, labs, and history",
    message: "Patient summary"
};
const PATIENT_ACTION_HISTORY = {
    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
        size: ICON_SIZE,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
        lineNumber: 183,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    title: "Medical history",
    subtitle: "Past visits, prescriptions, and treatment history",
    message: "Medical history"
};
const PATIENT_ACTION_VITALS = {
    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
        size: ICON_SIZE,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
        lineNumber: 189,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    title: "Today's vitals",
    subtitle: "View today's recorded vital parameters at a glance",
    message: "Today's vitals"
};
const PATIENT_ACTION_PAST_VISITS = {
    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__["Calendar2"], {
        size: ICON_SIZE,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
        lineNumber: 195,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    title: "Past visit details",
    subtitle: "Previous visit prescriptions, follow-ups, and notes",
    message: "Last visit details"
};
const PATIENT_ACTION_UPLOAD = {
    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentUpload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentUpload$3e$__["DocumentUpload"], {
        size: ICON_SIZE,
        variant: "Bulk"
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
        lineNumber: 201,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    title: "Upload reports",
    subtitle: "Select chart records or upload PDF / images to analyze in chat",
    message: "Upload medical records for this patient"
};
function withUploadCapped(actions) {
    const has = actions.some((a)=>a.message === PATIENT_ACTION_UPLOAD.message);
    const next = has ? actions : [
        ...actions,
        PATIENT_ACTION_UPLOAD
    ];
    return next.slice(0, 5);
}
function getSpecialtyAction(summary) {
    if (summary.obstetricData) {
        return {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Health$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Health$3e$__["Health"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 216,
                columnNumber: 13
            }, this),
            title: "Obstetric history",
            subtitle: "ANC schedule, pregnancy parameters, and alerts",
            message: "Obstetric summary"
        };
    }
    if (summary.gynecData) {
        return {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Health$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Health$3e$__["Health"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 224,
                columnNumber: 13
            }, this),
            title: "Gynec history",
            subtitle: "Menstrual cycle, screening, and gynec parameters",
            message: "Gynec summary"
        };
    }
    if (summary.pediatricsData) {
        return {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Health$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Health$3e$__["Health"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 232,
                columnNumber: 13
            }, this),
            title: "Vaccination & growth",
            subtitle: "Growth chart, milestones, and vaccination schedule",
            message: "Growth & vaccines"
        };
    }
    if (summary.ophthalData) {
        return {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Health$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Health$3e$__["Health"], {
                size: ICON_SIZE,
                variant: "Bulk"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 240,
                columnNumber: 13
            }, this),
            title: "Vision history",
            subtitle: "Visual acuity, IOP, and ophthalmic examination",
            message: "Vision summary"
        };
    }
    return null;
}
function buildPatientActions(summary) {
    if (!summary) {
        return withUploadCapped([
            PATIENT_ACTION_SUMMARY,
            PATIENT_ACTION_HISTORY,
            PATIENT_ACTION_VITALS,
            PATIENT_ACTION_PAST_VISITS
        ]);
    }
    const hasIntake = !!summary.symptomCollectorData;
    const specialtyAction = getSpecialtyAction(summary);
    if (hasIntake && specialtyAction) {
        return withUploadCapped([
            PATIENT_ACTION_INTAKE,
            PATIENT_ACTION_SUMMARY,
            PATIENT_ACTION_HISTORY,
            specialtyAction
        ]);
    }
    if (hasIntake && !specialtyAction) {
        return withUploadCapped([
            PATIENT_ACTION_INTAKE,
            PATIENT_ACTION_SUMMARY,
            PATIENT_ACTION_HISTORY,
            PATIENT_ACTION_VITALS
        ]);
    }
    if (!hasIntake && specialtyAction) {
        return withUploadCapped([
            PATIENT_ACTION_SUMMARY,
            PATIENT_ACTION_HISTORY,
            specialtyAction,
            PATIENT_ACTION_VITALS
        ]);
    }
    return withUploadCapped([
        PATIENT_ACTION_SUMMARY,
        PATIENT_ACTION_HISTORY,
        PATIENT_ACTION_VITALS,
        PATIENT_ACTION_PAST_VISITS
    ]);
}
function WelcomeScreen({ context = "default", doctorName, patientName, hasIntake = false, summary, onActionClick }) {
    // Patient context (RxPad / patient detail): smart priority system picks best 4 from 5 candidates
    // Other contexts (homepage, billing, default): static preset actions
    const actions = context === "rxpad" || context === "patient_detail" ? buildPatientActions(summary) : CONTEXT_ACTIONS[context] ?? CONTEXT_ACTIONS.default;
    const greeting = getGreeting();
    const displayName = doctorName ? `Dr. ${doctorName.split(" ")[0]}` : "Doctor";
    const isPatientContext = context === "rxpad" || context === "patient_detail";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-1 flex-col items-center justify-center px-[12px] py-[16px] relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-white pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    backgroundImage: "url(/icons/dr-agent/chat-bg.gif)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.04
                }
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-[1] mb-[10px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "pointer-events-none select-none relative inline-flex items-center justify-center overflow-hidden",
                    style: {
                        width: 36,
                        height: 36,
                        borderRadius: 36 * 0.24
                    },
                    "aria-hidden": "true",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-white",
                            style: {
                                borderRadius: 36 * 0.24
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0",
                            style: {
                                backgroundImage: "url(/icons/dr-agent/chat-bg.gif)",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                borderRadius: 36 * 0.24,
                                opacity: 0.3
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/icons/dr-agent/agent-spark.svg",
                            width: 36 * 0.75,
                            height: 36 * 0.75,
                            alt: "",
                            className: "relative z-10 welcome-spark-rotate",
                            draggable: false
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                    lineNumber: 311,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 310,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "relative z-[1] text-[18px] font-semibold text-tp-slate-800 text-center leading-[24px]",
                children: [
                    greeting,
                    ", ",
                    displayName,
                    "!"
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "relative z-[1] mt-[4px] max-w-full px-1 text-[14px] text-center leading-[18px] whitespace-nowrap text-ellipsis overflow-hidden",
                style: {
                    color: "var(--tp-slate-400, #A2A2A8)"
                },
                title: isPatientContext && patientName ? `How can I help with patient ${patientName.split(" ")[0]}?` : undefined,
                children: isPatientContext && patientName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        "How can I help with patient ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold",
                            style: {
                                color: "var(--tp-slate-500, #717179)"
                            },
                            children: patientName.split(" ")[0]
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                            lineNumber: 349,
                            columnNumber: 43
                        }, this),
                        "?"
                    ]
                }, void 0, true) : "What can I assist you with today?"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 343,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-[1] mt-[16px] grid grid-cols-2 gap-[10px] w-full",
                children: actions.map((action, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onActionClick(action.message),
                        className: "welcome-canned-card group relative flex flex-col items-start text-left transition-all overflow-hidden",
                        style: {
                            borderRadius: 14,
                            padding: "14px 12px 16px",
                            background: "rgba(255,255,255,0.55)",
                            border: "1px solid rgba(226,226,234,0.5)",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.03)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 pointer-events-none",
                                style: {
                                    backgroundImage: "url(/icons/dr-agent/chat-bg.gif)",
                                    backgroundSize: "cover",
                                    opacity: 0.06,
                                    borderRadius: 14
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                                lineNumber: 371,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative z-[1] mb-[8px] welcome-icon-grad",
                                style: {
                                    opacity: 0.85
                                },
                                children: action.icon
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                                lineNumber: 379,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative z-[1] text-[12px] font-semibold leading-[15px] w-full",
                                style: {
                                    color: "var(--tp-slate-700, #454551)"
                                },
                                children: action.title
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                                lineNumber: 384,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative z-[1] mt-[4px] text-[11px] font-normal leading-[15px] w-full welcome-card-subtitle",
                                style: {
                                    color: "var(--tp-slate-400, #A2A2A8)"
                                },
                                children: action.subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                                lineNumber: 389,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .welcome-icon-grad svg { color: #8B5CF6; }
        .welcome-icon-grad svg path,
        .welcome-icon-grad svg circle,
        .welcome-icon-grad svg rect {
          fill: url(#welcomeIconGrad);
        }
        .welcome-card-subtitle {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .welcome-canned-card {
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
        .welcome-canned-card:hover {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 3px 12px rgba(0,0,0,0.06) !important;
          border-color: rgba(138,77,187,0.25) !important;
        }
        .welcome-canned-card:active {
          transform: translateY(0) scale(0.99);
          box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;
        }
        @keyframes welcomeSparkRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .welcome-spark-rotate {
          animation: welcomeSparkRotate 16s linear infinite;
        }
      `
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 397,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: 0,
                height: 0,
                className: "absolute",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: "welcomeIconGrad",
                        x1: "0%",
                        y1: "0%",
                        x2: "0%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#BE6DCF"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                                lineNumber: 434,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#5351BD"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                                lineNumber: 435,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                        lineNumber: 433,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                    lineNumber: 432,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
                lineNumber: 431,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx",
        lineNumber: 299,
        columnNumber: 5
    }, this);
}
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
}
}),
"[project]/components/tp-rxpad/dr-agent/chat/PillBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PillBar",
    ()=>PillBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/constants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const COOLDOWN_DEFAULT = 3000;
function PillBar({ pills, onTap, disabled = false, className }) {
    const [cooldowns, setCooldowns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [hoveredId, setHoveredId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleTap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((pill)=>{
        if (disabled || cooldowns.has(pill.id)) return;
        onTap(pill);
        const cooldownMs = pill.cooldownMs ?? COOLDOWN_DEFAULT;
        setCooldowns((prev)=>new Set(prev).add(pill.id));
        setTimeout(()=>{
            setCooldowns((prev)=>{
                const next = new Set(prev);
                next.delete(pill.id);
                return next;
            });
        }, cooldownMs);
    }, [
        disabled,
        cooldowns,
        onTap
    ]);
    const sorted = [
        ...pills
    ].sort((a, b)=>a.priority - b.priority);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-[6px] overflow-x-auto px-[8px] scrollbar-hide", className),
        style: {
            scrollbarWidth: "none",
            msOverflowStyle: "none"
        },
        children: sorted.map((pill)=>{
            const isOnCooldown = cooldowns.has(pill.id);
            const isDisabled = disabled || isOnCooldown;
            const isHovered = hoveredId === pill.id;
            /* All pills use the unified AI gradient style */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>handleTap(pill),
                onMouseEnter: ()=>setHoveredId(pill.id),
                onMouseLeave: ()=>setHoveredId(null),
                disabled: isDisabled,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-[26px] shrink-0 items-center rounded-full px-[14px] text-[14px] font-normal transition-all whitespace-nowrap", isDisabled && "opacity-50", pill.force && !isDisabled && "animate-pulse"),
                style: {
                    background: isHovered && !isDisabled ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AI_PILL_BG_HOVER"] : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AI_PILL_BG"],
                    border: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AI_PILL_BORDER"]
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        background: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AI_PILL_TEXT_GRADIENT"],
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 400
                    },
                    children: pill.label
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/PillBar.tsx",
                    lineNumber: 75,
                    columnNumber: 13
                }, this)
            }, pill.id, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/PillBar.tsx",
                lineNumber: 58,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/PillBar.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatInput",
    ()=>ChatInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// KeyboardEvent used for both HTMLInputElement and HTMLTextAreaElement
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$SecuritySafe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SecuritySafe$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/SecuritySafe.js [app-ssr] (ecmascript) <export default as SecuritySafe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/constants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
/* ── Inline SVG Icons (14-16px) ── */ function PaperclipIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
/** Voice-circle Bulk icon with AI gradient fill */ function AiVoiceIcon({ size = 24 }) {
    const gid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])().replace(/[:]/g, "");
    const grad = `url(#aiv${gid})`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: `aiv${gid}`,
                    x1: "0%",
                    y1: "50%",
                    x2: "100%",
                    y2: "50%",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "3.04%",
                            stopColor: "#D565EA"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "66.74%",
                            stopColor: "#673AAC"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "130.45%",
                            stopColor: "#1A1994"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                opacity: "0.4",
                d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
                fill: grad
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 14.8896C5.59 14.8896 5.25 14.5496 5.25 14.1396V9.84961C5.25 9.43961 5.59 9.09961 6 9.09961C6.41 9.09961 6.75 9.43961 6.75 9.84961V14.1396C6.75 14.5596 6.41 14.8896 6 14.8896Z",
                fill: grad
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9 16.3197C8.59 16.3197 8.25 15.9797 8.25 15.5697V8.42969C8.25 8.01969 8.59 7.67969 9 7.67969C9.41 7.67969 9.75 8.01969 9.75 8.42969V15.5697C9.75 15.9897 9.41 16.3197 9 16.3197Z",
                fill: grad
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 17.75C11.59 17.75 11.25 17.41 11.25 17V7C11.25 6.59 11.59 6.25 12 6.25C12.41 6.25 12.75 6.59 12.75 7V17C12.75 17.41 12.41 17.75 12 17.75Z",
                fill: grad
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M15 16.3197C14.59 16.3197 14.25 15.9797 14.25 15.5697V8.42969C14.25 8.01969 14.59 7.67969 15 7.67969C15.41 7.67969 15.75 8.01969 15.75 8.42969V15.5697C15.75 15.9897 15.41 16.3197 15 16.3197Z",
                fill: grad
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18 14.8896C17.59 14.8896 17.25 14.5496 17.25 14.1396V9.84961C17.25 9.43961 17.59 9.09961 18 9.09961C18.41 9.09961 18.75 9.43961 18.75 9.84961V14.1396C18.75 14.5596 18.41 14.8896 18 14.8896Z",
                fill: grad
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
/** Arrow-up-04 Bulk icon with AI gradient fill */ function AiSendIcon({ size = 24 }) {
    const gid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])().replace(/[:]/g, "");
    const grad = `url(#ais${gid})`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: `ais${gid}`,
                    x1: "0%",
                    y1: "50%",
                    x2: "100%",
                    y2: "50%",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "3.04%",
                            stopColor: "#D565EA"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "66.74%",
                            stopColor: "#673AAC"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "130.45%",
                            stopColor: "#1A1994"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                opacity: "0.4",
                d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
                fill: grad
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M15.53 10.9704L12.53 7.97043C12.24 7.68043 11.76 7.68043 11.47 7.97043L8.47 10.9704C8.18 11.2604 8.18 11.7404 8.47 12.0304C8.76 12.3204 9.24 12.3204 9.53 12.0304L11.25 10.3104V15.5004C11.25 15.9104 11.59 16.2504 12 16.2504C12.41 16.2504 12.75 15.9104 12.75 15.5004V10.3104L14.47 12.0304C14.62 12.1804 14.81 12.2504 15 12.2504C15.19 12.2504 15.38 12.1804 15.53 12.0304C15.82 11.7404 15.82 11.2604 15.53 10.9704Z",
                fill: grad
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
function MicIcon({ size = 14 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M19 10v2a7 7 0 01-14 0v-2"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "12",
                y1: "19",
                x2: "12",
                y2: "23"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "8",
                y1: "23",
                x2: "16",
                y2: "23"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
function PauseIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "6",
                y: "4",
                width: "4",
                height: "16",
                rx: "1"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "14",
                y: "4",
                width: "4",
                height: "16",
                rx: "1"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
/** Play/Resume triangle icon — right-facing filled triangle */ function ResumeIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
            lineNumber: 140,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
function CheckIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            points: "5 13 10 18 19 6"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
            lineNumber: 157,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
function CrossIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "12",
        height: "12",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "18",
                y1: "6",
                x2: "6",
                y2: "18"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "6",
                y1: "6",
                x2: "18",
                y2: "18"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
/* ── Recording wave animation bars ── */ function WaveAnimation() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-[3px] h-[20px]",
        children: [
            [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7
            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[2.5px] rounded-full",
                    style: {
                        background: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AI_GRADIENT"],
                        animation: `wave-bar 1s ease-in-out ${i * 0.1}s infinite alternate`,
                        height: "6px"
                    }
                }, i, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        @keyframes wave-bar {
          0% { height: 4px; opacity: 0.4; }
          50% { height: 16px; opacity: 1; }
          100% { height: 6px; opacity: 0.5; }
        }
      `
                }
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
/* ── Recording timer — pauses when isPaused is true ── */ function RecordingTimer({ isPaused }) {
    const [elapsed, setElapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const lastTickRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(Date.now());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isPaused) return; // Don't tick when paused
        lastTickRef.current = Date.now();
        const interval = setInterval(()=>{
            const now = Date.now();
            setElapsed((prev)=>prev + Math.round((now - lastTickRef.current) / 1000));
            lastTickRef.current = now;
        }, 1000);
        return ()=>clearInterval(interval);
    }, [
        isPaused
    ]);
    const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const ss = String(elapsed % 60).padStart(2, "0");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-[14px] font-medium tabular-nums text-tp-slate-500",
        children: [
            mm,
            ":",
            ss
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
/** Patient chip — shows name + (meta) inside input box. Locked mode for RxPad. */ function PatientChip({ name, meta, locked, lockedMessage, onClick, onLockedClick, isClinic }) {
    const [showLockedTip, setShowLockedTip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleClick = ()=>{
        if (locked) {
            setShowLockedTip(true);
            setTimeout(()=>setShowLockedTip(false), 2500);
            onLockedClick?.();
        } else {
            onClick?.();
        }
    };
    // Split meta "M|76y" or "M/76y" into gender and age with divider
    const metaParts = meta ? meta.split(/[|\/]/) : [];
    const gender = metaParts[0]?.trim() || "";
    const age = metaParts[1]?.trim() || "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleClick,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-[4px] transition-all", locked ? "cursor-default" : "hover:opacity-85"),
                style: {
                    background: "var(--tp-slate-100, #F1F5F9)",
                    borderRadius: 6,
                    padding: "3px 5px 3px 6px",
                    height: 24,
                    maxWidth: 175,
                    minWidth: 0
                },
                "aria-label": `Patient context: ${name}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-shrink-0 text-tp-slate-600",
                        children: isClinic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: 12,
                            height: 12,
                            viewBox: "0 0 24 24",
                            fill: "none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    opacity: "0.4",
                                    d: "M2 22H22",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    strokeMiterlimit: "10",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                    lineNumber: 273,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M17 2H7C4 2 3 3.79 3 6V22H21V6C21 3.79 20 2 17 2Z",
                                    fill: "currentColor",
                                    opacity: "0.4"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                    lineNumber: 274,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M14.06 15H9.93996C9.47996 15 9.09998 15.38 9.09998 15.84V22H14.9V15.84C14.9 15.38 14.52 15 14.06 15Z",
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                    lineNumber: 275,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M10 11H8C7.45 11 7 10.55 7 10V8.5C7 7.95 7.45 7.5 8 7.5H10C10.55 7.5 11 7.95 11 8.5V10C11 10.55 10.55 11 10 11Z",
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                    lineNumber: 276,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M16 11H14C13.45 11 13 10.55 13 10V8.5C13 7.95 13.45 7.5 14 7.5H16C16.55 7.5 17 7.95 17 8.5V10C17 10.55 16.55 11 16 11Z",
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                    lineNumber: 277,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                            lineNumber: 272,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: 12,
                            height: 12,
                            viewBox: "0 0 24 24",
                            fill: "none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    opacity: "0.4",
                                    d: "M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                    lineNumber: 281,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 14.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5Z",
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                    lineNumber: 282,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate",
                        style: {
                            fontSize: 10,
                            fontWeight: 600,
                            color: "#3D3D4E",
                            lineHeight: "12px"
                        },
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                        lineNumber: 287,
                        columnNumber: 9
                    }, this),
                    meta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-shrink-0 whitespace-nowrap flex items-center",
                        style: {
                            fontSize: 10,
                            lineHeight: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#B0B7C3",
                                    fontWeight: 400
                                },
                                children: "("
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#B0B7C3",
                                    fontWeight: 400
                                },
                                children: gender
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this),
                            age && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mx-[2px]",
                                        style: {
                                            color: "#D0D5DD",
                                            fontWeight: 400
                                        },
                                        children: "|"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "#B0B7C3",
                                            fontWeight: 400
                                        },
                                        children: age
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#B0B7C3",
                                    fontWeight: 400
                                },
                                children: ")"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 297,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                        lineNumber: 290,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            showLockedTip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 bottom-full mb-[6px] z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-[6px] bg-tp-slate-800 px-[8px] py-[5px] text-[12px] leading-[1.4] text-white shadow-lg whitespace-normal",
                    style: {
                        maxWidth: 200
                    },
                    children: [
                        lockedMessage || "Context switching is not available on this page",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-[16px] top-full border-[4px] border-transparent border-t-tp-slate-800"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                            lineNumber: 306,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                    lineNumber: 304,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 303,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 258,
        columnNumber: 5
    }, this);
}
function ChatInput({ value, onChange, onSend, quickActions = [], onQuickActionTap, onAttach, onVoiceTranscription, disabled = false, placeholder = "Ask about this patient...", className, isPrefilled = false, patientName, patientMeta, onPatientClick, patientLocked = false, patientLockedMessage, onLockedChipClick, isClinicContext = false }) {
    const hasText = value.trim().length > 0;
    const [isRecording, setIsRecording] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPaused, setIsPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto-resize textarea
    const autoResize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        const maxH = 120 // ~5 lines
        ;
        el.style.height = `${Math.min(el.scrollHeight, maxH)}px`;
        el.style.overflowY = el.scrollHeight > maxH ? "auto" : "hidden";
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        autoResize();
    }, [
        value,
        autoResize
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (e.key === "Enter" && !e.shiftKey && hasText && !disabled) {
            e.preventDefault();
            onSend();
        }
    }, [
        hasText,
        disabled,
        onSend
    ]);
    const handleMicClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsRecording(true);
        setIsPaused(false);
    }, []);
    const handlePause = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsPaused((prev)=>!prev);
    }, []);
    const handleDiscard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsRecording(false);
        setIsPaused(false);
    }, []);
    const handleSendRecording = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const mockTranscribedText = "Patient complaining of fever since 3 days, dry cough and body ache since 2 days. " + "On examination, throat congested, bilateral chest clear, no lymphadenopathy. " + "Diagnosis: Acute viral pharyngitis with allergic rhinitis. " + "Prescribing Paracetamol 650mg 1-0-1 after food for 5 days, Cetirizine 10mg 0-0-1 for 5 days, Pantoprazole 40mg 1-0-0 before breakfast for 5 days. " + "Advising rest, warm fluids, steam inhalation, salt gargle twice daily. " + "Suggest test CBC, ESR if fever persists. " + "Dental examination dictation. Tooth number 22: implant crown in place; buccal plaque and light stain; patient states placement August 2022; occlusion stable. " + "Tooth number 24: cavitated caries buccal toward contact; sealant on occlusal since 2016 with partial mesial loss; cold test delayed versus adjacent. " + "Follow up in 5 days if not better.";
        if (onVoiceTranscription) {
            onVoiceTranscription(mockTranscribedText);
        } else {
            onChange(mockTranscribedText);
        }
        setIsRecording(false);
        setIsPaused(false);
    }, [
        onChange,
        onVoiceTranscription
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("sticky bottom-0 bg-white px-[10px] pt-[8px] pb-[4px]", className),
        children: [
            isRecording ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-[6px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-[36px] flex-1 items-center gap-[10px] rounded-[10px] border px-[12px]", isPaused ? "border-tp-slate-300 bg-tp-slate-50" : "border-tp-violet-300 bg-gradient-to-r from-tp-violet-50 to-tp-blue-50"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-[6px] w-[6px] shrink-0 rounded-full", isPaused ? "bg-tp-slate-400" : "bg-tp-error-500 animate-pulse")
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 416,
                                columnNumber: 13
                            }, this),
                            isPaused ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[14px] text-tp-slate-400",
                                children: "Paused"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 423,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WaveAnimation, {}, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 425,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-1"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 427,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RecordingTimer, {
                                isPaused: isPaused
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 428,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handlePause,
                                className: "flex h-[24px] w-[24px] items-center justify-center rounded-full text-tp-slate-500 transition-colors hover:bg-tp-slate-100",
                                title: isPaused ? "Resume recording" : "Pause recording",
                                children: isPaused ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ResumeIcon, {}, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                    lineNumber: 435,
                                    columnNumber: 27
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PauseIcon, {}, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                    lineNumber: 435,
                                    columnNumber: 44
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 429,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                        lineNumber: 408,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleSendRecording,
                        className: "flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full text-tp-success-600 transition-colors hover:bg-tp-success-50",
                        title: "Submit for transcription",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                            lineNumber: 444,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                        lineNumber: 438,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleDiscard,
                        className: "flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full text-tp-slate-400 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-600",
                        title: "Discard recording",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CrossIcon, {}, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                            lineNumber: 452,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                        lineNumber: 446,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 407,
                columnNumber: 9
            }, this) : /* ── Normal input mode — Figma spec: two-row layout ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("chat-input-border flex flex-col justify-end rounded-[12px]", isPrefilled && "chat-input-prefilled", disabled && "opacity-50"),
                style: {
                    padding: "8px 10.5px",
                    gap: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        dangerouslySetInnerHTML: {
                            __html: `
            .chat-input-border {
              border: 1px solid var(--tp-slate-200, #E2E2EA);
              transition: border-color 0.2s ease, box-shadow 0.2s ease;
            }
            .chat-input-border:focus-within {
              border-color: var(--tp-violet-400, #BA7DE9);
              box-shadow: 0 0 0 2px rgba(75,74,213,0.08);
            }
            .chat-input-border textarea::placeholder {
              color: var(--tp-slate-300, #D0D5DD);
              line-height: 16px;
            }
            .chat-input-border.chat-input-prefilled {
              border-color: transparent;
              background-image: linear-gradient(white, white),
                linear-gradient(135deg, #D565EA, #673AAC, #1A1994, #D565EA, #673AAC);
              background-origin: border-box;
              background-clip: padding-box, border-box;
              background-size: 100% 100%, 300% 300%;
              animation: aiGradientBorderFlow 3s ease-in-out infinite;
              box-shadow: 0 0 0 2px rgba(103,58,172,0.08);
            }
            .chat-input-border.chat-input-prefilled:focus-within {
              border-color: transparent;
              box-shadow: 0 0 0 3px rgba(103,58,172,0.12);
            }
            @keyframes aiGradientBorderFlow {
              0% { background-position: 0% 0%, 0% 50%; }
              50% { background-position: 0% 0%, 100% 50%; }
              100% { background-position: 0% 0%, 0% 50%; }
            }
          `
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                        lineNumber: 465,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        ref: textareaRef,
                        value: value,
                        onChange: (e)=>onChange(e.target.value),
                        onKeyDown: handleKeyDown,
                        disabled: disabled,
                        placeholder: placeholder,
                        rows: 1,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full resize-none bg-transparent px-[4px]", "text-[14px] leading-[16px] text-tp-slate-800", "focus:outline-none"),
                        style: {
                            minHeight: 28,
                            maxHeight: 120,
                            color: "#1D2939",
                            fontWeight: 400,
                            lineHeight: "16px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                        lineNumber: 504,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        style: {
                            height: 24
                        },
                        children: [
                            patientName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PatientChip, {
                                name: patientName,
                                meta: patientMeta,
                                locked: patientLocked,
                                lockedMessage: patientLockedMessage,
                                onClick: onPatientClick,
                                onLockedClick: onLockedChipClick,
                                isClinic: isClinicContext
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 524,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 533,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-[6px]",
                                children: [
                                    onAttach && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: onAttach,
                                                disabled: disabled,
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex shrink-0 items-center justify-center transition-all hover:opacity-80", disabled && "pointer-events-none"),
                                                title: "Add files and more",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: 24,
                                                    height: 24,
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M0 12C0 5.37258 5.37258 0 12 0V0C18.6274 0 24 5.37258 24 12V12C24 18.6274 18.6274 24 12 24V24C5.37258 24 0 18.6274 0 12V12Z",
                                                            fill: "var(--tp-slate-100, #F1F5F9)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M7.625 12H16.375",
                                                            stroke: "#667085",
                                                            strokeWidth: "1.5",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                            lineNumber: 552,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M12 7.625V16.375",
                                                            stroke: "#667085",
                                                            strokeWidth: "1.5",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                            lineNumber: 553,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 550,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                lineNumber: 540,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "self-stretch shrink-0",
                                                style: {
                                                    width: 1,
                                                    background: "linear-gradient(180deg, rgba(208,213,221,0.2) 0%, #D0D5DD 50%, rgba(208,213,221,0.2) 100%)",
                                                    opacity: 0.8
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                lineNumber: 558,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    hasText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onSend,
                                        disabled: disabled,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex shrink-0 items-center justify-center transition-all hover:opacity-90", disabled && "pointer-events-none"),
                                        title: "Enter to send · Shift+Enter for new line",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: 24,
                                            height: 24,
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M0 12C0 5.37258 5.37258 0 12 0V0C18.6274 0 24 5.37258 24 12V12C24 18.6274 18.6274 24 12 24V24C5.37258 24 0 18.6274 0 12V12Z",
                                                    fill: "url(#sendGrad)"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 575,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M8.2063 10.4812L12 6.68745L15.7938 10.4812",
                                                    stroke: "white",
                                                    strokeWidth: "1.5",
                                                    strokeMiterlimit: "10",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 576,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M12 17.3125V6.79375",
                                                    stroke: "white",
                                                    strokeWidth: "1.5",
                                                    strokeMiterlimit: "10",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 577,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                        id: "sendGrad",
                                                        x1: "-0.0224",
                                                        y1: "10.3128",
                                                        x2: "24.0296",
                                                        y2: "10.365",
                                                        gradientUnits: "userSpaceOnUse",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "0.0304",
                                                                stopColor: "#D565EA"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                                lineNumber: 580,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "0.6674",
                                                                stopColor: "#673AAC"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                                lineNumber: 581,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "1",
                                                                stopColor: "#1A1994"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                                lineNumber: 582,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                        lineNumber: 579,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 578,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                            lineNumber: 574,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                        lineNumber: 564,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleMicClick,
                                        disabled: disabled,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex shrink-0 items-center justify-center transition-all hover:opacity-90", disabled && "pointer-events-none"),
                                        title: "Use voice to dictate",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: 24,
                                            height: 24,
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M0 12C0 5.37258 5.37258 0 12 0V0C18.6274 0 24 5.37258 24 12V12C24 18.6274 18.6274 24 12 24V24C5.37258 24 0 18.6274 0 12V12Z",
                                                    fill: "url(#micGrad)"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 599,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M5.73891 15.0152C5.31108 15.0152 4.9563 14.6605 4.9563 14.2326V9.75611C4.9563 9.32829 5.31108 8.97351 5.73891 8.97351C6.16673 8.97351 6.52152 9.32829 6.52152 9.75611V14.2326C6.52152 14.6709 6.16673 15.0152 5.73891 15.0152Z",
                                                    fill: "white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 600,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M8.86934 16.5075C8.44152 16.5075 8.08673 16.1527 8.08673 15.7249V8.27446C8.08673 7.84663 8.44152 7.49185 8.86934 7.49185C9.29717 7.49185 9.65195 7.84663 9.65195 8.27446V15.7249C9.65195 16.1632 9.29717 16.5075 8.86934 16.5075Z",
                                                    fill: "white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M11.9998 18C11.572 18 11.2172 17.6452 11.2172 17.2174V6.78261C11.2172 6.35478 11.572 6 11.9998 6C12.4276 6 12.7824 6.35478 12.7824 6.78261V17.2174C12.7824 17.6452 12.4276 18 11.9998 18Z",
                                                    fill: "white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 602,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M15.1302 16.5075C14.7024 16.5075 14.3476 16.1527 14.3476 15.7249V8.27446C14.3476 7.84663 14.7024 7.49185 15.1302 7.49185C15.558 7.49185 15.9128 7.84663 15.9128 8.27446V15.7249C15.9128 16.1632 15.558 16.5075 15.1302 16.5075Z",
                                                    fill: "white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 603,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M18.2606 15.0152C17.8328 15.0152 17.478 14.6605 17.478 14.2326V9.75611C17.478 9.32829 17.8328 8.97351 18.2606 8.97351C18.6885 8.97351 19.0433 9.32829 19.0433 9.75611V14.2326C19.0433 14.6709 18.6885 15.0152 18.2606 15.0152Z",
                                                    fill: "white"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 604,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                        id: "micGrad",
                                                        x1: "-0.0224",
                                                        y1: "10.3128",
                                                        x2: "24.0296",
                                                        y2: "10.365",
                                                        gradientUnits: "userSpaceOnUse",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "0.0304",
                                                                stopColor: "#D565EA"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                                lineNumber: 607,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "0.6674",
                                                                stopColor: "#673AAC"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                                lineNumber: 608,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "1",
                                                                stopColor: "#1A1994"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                                lineNumber: 609,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                        lineNumber: 606,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                                    lineNumber: 605,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                            lineNumber: 598,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                        lineNumber: 588,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                                lineNumber: 536,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                        lineNumber: 521,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 457,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-[4px] mb-[14px] flex items-center justify-center gap-[4px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$SecuritySafe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SecuritySafe$3e$__["SecuritySafe"], {
                        size: 12,
                        variant: "Bulk",
                        className: "shrink-0 text-tp-slate-300"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                        lineNumber: 622,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] leading-[1.4] text-tp-slate-300",
                        children: "Data stays private · AI-assisted, you decide"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                        lineNumber: 623,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
                lineNumber: 621,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx",
        lineNumber: 399,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttachPanel",
    ()=>AttachPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-ssr] (ecmascript)");
"use client";
;
;
const DUMMY_FILES = [
    {
        docType: "dental_radiology",
        name: "OPG_Panoramic_Scan.pdf",
        size: "2.1 MB",
        pages: 1,
        iconName: "medical service",
        iconColor: "#0891B2",
        bgColor: "rgba(8,145,178,0.10)"
    },
    {
        docType: "pathology",
        name: "Lab_Report_Mar2026.pdf",
        size: "340 KB",
        pages: 2,
        iconName: "test-tube",
        iconColor: "#1B8C54",
        bgColor: "rgba(27,140,84,0.08)"
    },
    {
        docType: "radiology",
        name: "X-Ray_Chest_Mar2026.pdf",
        size: "1.2 MB",
        pages: 1,
        iconName: "x-ray",
        iconColor: "#3B6FE0",
        bgColor: "rgba(59,111,224,0.08)"
    },
    {
        docType: "prescription",
        name: "Previous_Rx_Mar2026.pdf",
        size: "180 KB",
        pages: 1,
        iconName: "clipboard-activity",
        iconColor: "#C6850C",
        bgColor: "rgba(198,133,12,0.08)"
    }
];
function AttachPanel({ onSelect, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-[10px] mb-[6px] overflow-hidden rounded-[12px] border border-white/50 shadow-lg animate-in slide-in-from-bottom-2 duration-200",
        style: {
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between border-b border-tp-slate-100 px-[12px] py-[6px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[14px] font-semibold text-tp-slate-600",
                        children: "Select a document to upload"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        className: "flex h-[18px] w-[18px] items-center justify-center rounded-full text-tp-slate-400 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-600",
                        "aria-label": "Close",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: 10,
                            height: 10,
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: 2.5,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "18",
                                    y1: "6",
                                    x2: "6",
                                    y2: "18"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "6",
                                    y1: "6",
                                    x2: "18",
                                    y2: "18"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-[4px]",
                children: DUMMY_FILES.map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onSelect(file.docType),
                        className: "flex w-full items-center gap-[10px] px-[12px] py-[8px] text-left transition-colors hover:bg-tp-slate-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-[8px]",
                                style: {
                                    background: file.bgColor
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                                    name: file.iconName,
                                    variant: "bulk",
                                    size: 16,
                                    color: file.iconColor
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 flex-1 flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate text-[14px] font-medium text-tp-slate-700",
                                        children: file.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-tp-slate-400",
                                        children: [
                                            file.pages,
                                            " ",
                                            file.pages === 1 ? "page" : "pages",
                                            " · ",
                                            file.size
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: 14,
                                height: 14,
                                viewBox: "0 0 24 24",
                                fill: "none",
                                className: "flex-shrink-0 text-tp-slate-300",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 19V5M5 12l7-7 7 7",
                                    stroke: "currentColor",
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this)
                        ]
                    }, file.docType, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DocumentBottomSheet",
    ()=>DocumentBottomSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentUpload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentUpload$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentUpload.js [app-ssr] (ecmascript) <export default as DocumentUpload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const DOC_CANNED_SUGGESTIONS = [
    {
        id: "doc-summarize",
        label: "Summarize document"
    },
    {
        id: "doc-compare",
        label: "Compare documents"
    },
    {
        id: "doc-extract",
        label: "Extract key findings"
    },
    {
        id: "doc-abnormal",
        label: "Check abnormalities"
    }
];
const DOC_TYPE_CONFIG = {
    pathology: {
        iconName: "test-tube",
        iconColor: "#1B8C54",
        bgColor: "rgba(27,140,84,0.08)",
        label: "Pathology"
    },
    dental_radiology: {
        iconName: "medical service",
        iconColor: "#0891B2",
        bgColor: "rgba(8,145,178,0.10)",
        label: "Dental radiology"
    },
    radiology: {
        iconName: "x-ray",
        iconColor: "#3B6FE0",
        bgColor: "rgba(59,111,224,0.08)",
        label: "Radiology"
    },
    prescription: {
        iconName: "clipboard-activity",
        iconColor: "#C6850C",
        bgColor: "rgba(198,133,12,0.08)",
        label: "Prescription"
    },
    discharge_summary: {
        iconName: "file-text",
        iconColor: "#7C3AED",
        bgColor: "rgba(124,58,237,0.08)",
        label: "Discharge"
    },
    vaccination: {
        iconName: "injection",
        iconColor: "#0891B2",
        bgColor: "rgba(8,145,178,0.08)",
        label: "Vaccination"
    },
    other: {
        iconName: "document",
        iconColor: "#64748B",
        bgColor: "rgba(100,116,139,0.08)",
        label: "Document"
    }
};
function CloseIcon({ size = 24, color = "currentColor" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: color,
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z",
            fill: color
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
function DocumentBottomSheet({ documents, onSendDocuments, onUploadNew, onClose, onCannedAction, maxSelect = 12, patientFirstName }) {
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [maxWarning, setMaxWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleDoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((docId)=>{
        setSelected((prev)=>{
            const next = new Set(prev);
            if (next.has(docId)) {
                next.delete(docId);
                setMaxWarning(false);
            } else {
                if (next.size >= maxSelect) {
                    setMaxWarning(true);
                    setTimeout(()=>setMaxWarning(false), 2000);
                    return prev;
                }
                next.add(docId);
            }
            return next;
        });
    }, [
        maxSelect
    ]);
    const handleSend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const docs = documents.filter((d)=>selected.has(d.id));
        if (docs.length > 0) onSendDocuments(docs);
    }, [
        documents,
        selected,
        onSendDocuments
    ]);
    const selectedCount = selected.size;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-50 flex flex-col justify-end",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                onClick: onClose,
                style: {
                    background: "rgba(0,0,0,0.35)",
                    animation: "docFadeIn 150ms ease-out"
                }
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex flex-col rounded-t-[16px] shadow-2xl overflow-hidden",
                style: {
                    height: "60%",
                    animation: "docSlideUp 200ms ease-out"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between px-[16px] pt-[14px] pb-[10px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-[6px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-[16px] font-semibold text-tp-slate-800",
                                                        children: patientFirstName ? `${patientFirstName}'s Medical Records` : "Medical Records"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                        lineNumber: 113,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-full bg-tp-slate-100 px-[7px] py-[1px] text-[12px] font-medium text-tp-slate-500",
                                                        children: documents.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                lineNumber: 112,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: onClose,
                                                className: "flex items-center justify-center transition-colors text-tp-slate-700",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CloseIcon, {
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                lineNumber: 116,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-tp-slate-100"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            documents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "#F9FAFB"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-[12px] py-[10px]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: onUploadNew,
                                            className: "flex w-full items-center justify-center gap-[6px] rounded-[8px] border border-tp-blue-200 bg-white px-[12px] py-[8px] text-[14px] font-medium text-tp-blue-500 transition-colors hover:bg-tp-blue-50/60 hover:border-tp-blue-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentUpload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentUpload$3e$__["DocumentUpload"], {
                                                    size: 14,
                                                    variant: "Linear"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Add New Medical Record"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                            lineNumber: 127,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative mx-[16px] pb-[6px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 flex items-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full border-t border-tp-slate-100"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 69
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative flex justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-[10px] text-[12px] font-medium text-tp-slate-300",
                                                    style: {
                                                        background: "#F9FAFB"
                                                    },
                                                    children: "or"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 63
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                lineNumber: 135,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "doc-scroll flex-1 overflow-y-auto",
                        style: {
                            background: "#F9FAFB"
                        },
                        children: documents.length === 0 ? /* ── Empty state — vertically + horizontally centered ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-full flex-col items-center justify-center px-[24px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/icons/dr-agent/empty-docs.svg",
                                    width: 120,
                                    height: 120,
                                    alt: "",
                                    className: "mb-[16px] opacity-60",
                                    draggable: false
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-[16px] font-semibold text-tp-slate-600 mb-[4px]",
                                    children: "No Medical Records"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                    lineNumber: 155,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[15px] text-tp-slate-400 text-center leading-[18px] mb-[16px]",
                                    style: {
                                        maxWidth: 220
                                    },
                                    children: patientFirstName ? `No medical records have been added for ${patientFirstName}. Upload one to get started.` : "No medical records have been added yet. Upload one to get started."
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onUploadNew,
                                    className: "flex items-center justify-center gap-[6px] rounded-[8px] border border-tp-blue-200 bg-white px-[16px] h-[46px] text-[15px] font-medium text-tp-blue-500 transition-colors hover:bg-tp-blue-50/60 hover:border-tp-blue-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentUpload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentUpload$3e$__["DocumentUpload"], {
                                            size: 16,
                                            variant: "Linear"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Add New Medical Record"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between px-[16px] py-[6px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[12px] text-tp-slate-400",
                                            children: selectedCount > 0 ? `${selectedCount} selected` : "Select documents to analyze"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                            lineNumber: 171,
                                            columnNumber: 13
                                        }, this),
                                        maxWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[12px] font-medium text-tp-amber-600",
                                            children: [
                                                "Max ",
                                                maxSelect,
                                                " documents"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                            lineNumber: 175,
                                            columnNumber: 15
                                        }, this),
                                        selectedCount > 0 && !maxWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setSelected(new Set());
                                                setMaxWarning(false);
                                            },
                                            className: "text-[12px] font-medium text-tp-slate-400 hover:text-tp-slate-600",
                                            children: "Clear all"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                            lineNumber: 178,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                    lineNumber: 170,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-[10px] pb-[8px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-[2px]",
                                        children: documents.map((doc)=>{
                                            const config = DOC_TYPE_CONFIG[doc.docType] ?? DOC_TYPE_CONFIG.other;
                                            const isSelected = selected.has(doc.id);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>toggleDoc(doc.id),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex w-full items-center gap-[10px] rounded-[8px] px-[10px] py-[9px] text-left transition-colors", isSelected ? "bg-tp-violet-50" : "hover:bg-tp-slate-100/80"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-all", isSelected ? "border-transparent" : "border-tp-slate-300 bg-white"),
                                                        style: isSelected ? {
                                                            background: "var(--tp-blue-500, #4B4AD5)"
                                                        } : undefined,
                                                        children: isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: 11,
                                                            height: 11,
                                                            viewBox: "0 0 12 12",
                                                            fill: "none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M2.5 6L5 8.5L9.5 3.5",
                                                                stroke: "white",
                                                                strokeWidth: 1.8,
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                                lineNumber: 216,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                            lineNumber: 215,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px]",
                                                        style: {
                                                            background: config.bgColor
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                                                            name: config.iconName,
                                                            variant: "bulk",
                                                            size: 16,
                                                            color: config.iconColor
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex min-w-0 flex-1 flex-col gap-[1px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate text-[14px] font-medium text-tp-slate-700",
                                                                children: doc.fileName
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                                lineNumber: 224,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[12px] text-tp-slate-400",
                                                                children: [
                                                                    config.label,
                                                                    " · ",
                                                                    doc.uploadedAt,
                                                                    " · ",
                                                                    doc.uploadedBy
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                                lineNumber: 225,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "shrink-0 text-[12px] text-tp-slate-300",
                                                        children: doc.size
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, doc.id, true, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                                lineNumber: 196,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                                    lineNumber: 189,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    documents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border-t border-tp-slate-100 px-[16px] py-[10px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleSend,
                            disabled: selectedCount === 0,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex w-full items-center justify-center gap-[6px] rounded-[10px] px-4 py-[9px] text-[14px] font-semibold text-white transition-all", selectedCount === 0 ? "cursor-not-allowed bg-tp-slate-200 text-tp-slate-400" : "hover:opacity-90 active:scale-[0.98]"),
                            style: selectedCount > 0 ? {
                                background: "var(--tp-blue-500, #4B4AD5)"
                            } : undefined,
                            children: selectedCount === 0 ? "Select documents to analyze" : `Add ${selectedCount} document${selectedCount > 1 ? "s" : ""} to chat`
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                        lineNumber: 238,
                        columnNumber: 34
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes docFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes docSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .doc-scroll::-webkit-scrollbar{width:3px}
        .doc-scroll::-webkit-scrollbar-track{background:transparent}
        .doc-scroll::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.12);border-radius:3px}
      `
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_tp-rxpad_dr-agent_chat_49d2f222._.js.map