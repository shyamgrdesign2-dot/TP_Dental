module.exports = [
"[project]/components/tp-rxpad/secondary-sidebar/tokens.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rxSidebarTokens",
    ()=>rxSidebarTokens,
    "tpSectionCardStyle",
    ()=>tpSectionCardStyle
]);
const rxSidebarTokens = {
    railWidth: 80,
    panelMinWidth: 250,
    panelMaxWidth: 350,
    panelPreferredWidth: "clamp(250px, 28vw, 350px)",
    itemGap: 6,
    itemPaddingX: 6,
    itemPaddingY: 12,
    iconContainerSize: 32,
    iconGlyphSize: 20,
    iconRadius: 10,
    contentRadius: 10,
    navItemSelectedBg: "var(--tp-icon-clickable-dark-bg)",
    navItemHoverBg: "rgba(255,255,255,0.12)"
};
const tpSectionCardStyle = {
    border: "0.8px solid var(--tp-slate-100)",
    borderRadius: `${rxSidebarTokens.contentRadius}px`
};
}),
"[project]/components/tp-rxpad/secondary-sidebar/rxSidebarPrimitives.module.scss [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bodyMedium": "rxSidebarPrimitives-module-scss-module__4EyDTq__bodyMedium",
  "bodyStrong": "rxSidebarPrimitives-module-scss-module__4EyDTq__bodyStrong",
  "bodyText": "rxSidebarPrimitives-module-scss-module__4EyDTq__bodyText",
  "iconGlyph": "rxSidebarPrimitives-module-scss-module__4EyDTq__iconGlyph",
  "iconInner": "rxSidebarPrimitives-module-scss-module__4EyDTq__iconInner",
  "iconPill": "rxSidebarPrimitives-module-scss-module__4EyDTq__iconPill",
  "iconPillActiveBg": "rxSidebarPrimitives-module-scss-module__4EyDTq__iconPillActiveBg",
  "iconPillBg": "rxSidebarPrimitives-module-scss-module__4EyDTq__iconPillBg",
  "navLabel": "rxSidebarPrimitives-module-scss-module__4EyDTq__navLabel",
  "sectionHeaderTitle": "rxSidebarPrimitives-module-scss-module__4EyDTq__sectionHeaderTitle",
});
}),
"[project]/components/tp-rxpad/secondary-sidebar/NavPanel.module.scss [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "activeBar": "NavPanel-module-scss-module__6EPyOq__activeBar",
  "drGlyph": "NavPanel-module-scss-module__6EPyOq__drGlyph",
  "drGlyphSvg": "NavPanel-module-scss-module__6EPyOq__drGlyphSvg",
  "linkFull": "NavPanel-module-scss-module__6EPyOq__linkFull",
  "navBounce": "NavPanel-module-scss-module__6EPyOq__navBounce",
  "navCol": "NavPanel-module-scss-module__6EPyOq__navCol",
  "navDividerOuter": "NavPanel-module-scss-module__6EPyOq__navDividerOuter",
  "navDividerSvg": "NavPanel-module-scss-module__6EPyOq__navDividerSvg",
  "navDividerSvgWrap": "NavPanel-module-scss-module__6EPyOq__navDividerSvgWrap",
  "navItemRoot": "NavPanel-module-scss-module__6EPyOq__navItemRoot",
  "navLabel": "NavPanel-module-scss-module__6EPyOq__navLabel",
  "navRow": "NavPanel-module-scss-module__6EPyOq__navRow",
  "root": "NavPanel-module-scss-module__6EPyOq__root",
  "scrollArea": "NavPanel-module-scss-module__6EPyOq__scrollArea",
  "scrollHint": "NavPanel-module-scss-module__6EPyOq__scrollHint",
  "scrollHintBtn": "NavPanel-module-scss-module__6EPyOq__scrollHintBtn",
  "selectionArrow": "NavPanel-module-scss-module__6EPyOq__selectionArrow",
});
}),
"[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavPanel",
    ()=>NavPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * SecondaryNavPanel — 80px left sidebar (Rx Pad).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowDown2.js [app-ssr] (ecmascript) <export default as ArrowDown2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentText.js [app-ssr] (ecmascript) <export default as DocumentText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Note1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Note1$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Note1.js [app-ssr] (ecmascript) <export default as Note1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$ToothIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/ToothIcon.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/tokens.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/rxSidebarPrimitives.module.scss [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/NavPanel.module.scss [app-ssr] (css module)");
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
const NAV_BG = {
    backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 80 1133\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(64.518 65.21 -19.503 89.302 -155.96 413.08)\\'><stop stop-color=\\'rgba(22,21,88,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(35,34,119,1)\\' offset=\\'0.25\\'/><stop stop-color=\\'rgba(49,48,151,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(75,74,213,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg,rgb(255,255,255) 0%,rgb(255,255,255) 100%)"
};
function IconPill({ active, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconPill, active ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconPillActiveBg : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconPillBg),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconInner,
            children: children
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
function MedicalNavIcon({ active, name }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconPill, {
        active: active,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
            name: name,
            variant: active ? "bulk" : "line",
            size: 20,
            color: active ? "var(--tp-blue-500)" : "#FFFFFF",
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconGlyph
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
function IconsaxNavIcon({ active, Icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconPill, {
        active: active,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
            size: 20,
            variant: active ? "Bulk" : "Linear",
            color: active ? "var(--tp-blue-500)" : "#FFFFFF",
            strokeWidth: 1.5
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
            lineNumber: 47,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
function SelectionArrow() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selectionArrow,
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
        lineNumber: 53,
        columnNumber: 10
    }, this);
}
const NAV_ITEMS = [
    {
        id: "pastVisits",
        label: "Past Visits",
        icon: {
            kind: "iconsax",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Note1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Note1$3e$__["Note1"]
        }
    },
    {
        id: "vitals",
        label: "Vitals",
        icon: {
            kind: "medical",
            name: "Heart Rate"
        }
    },
    {
        id: "history",
        label: "Medical History",
        icon: {
            kind: "medical",
            name: "clipboard-activity"
        }
    },
    // Dental Plan hidden for v0 — no doctor-facing entry point.
    {
        id: "medicalRecords",
        label: "Records",
        icon: {
            kind: "medical",
            name: "health-file-03"
        }
    },
    {
        id: "labResults",
        label: "Lab Results",
        icon: {
            kind: "medical",
            name: "Lab"
        }
    },
    {
        id: "personalNotes",
        label: "Personal Notes",
        icon: {
            kind: "iconsax",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText$3e$__["DocumentText"]
        }
    }
];
function NavItem({ id, label, icon, active, onClick }) {
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const rowBg = active ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rxSidebarTokens"].navItemSelectedBg : hovered ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rxSidebarTokens"].navItemHoverBg : "transparent";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navItemRoot,
        style: {
            width: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rxSidebarTokens"].railWidth,
            backgroundColor: rowBg
        },
        onClick: ()=>onClick(id),
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navRow,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navCol,
                        style: {
                            gap: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rxSidebarTokens"].itemGap,
                            paddingInline: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rxSidebarTokens"].itemPaddingX,
                            paddingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rxSidebarTokens"].itemPaddingY,
                            width: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rxSidebarTokens"].railWidth
                        },
                        children: [
                            icon.kind === "medical" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MedicalNavIcon, {
                                active: active,
                                name: icon.name
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this) : icon.kind === "tooth" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconPill, {
                                active: active,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$ToothIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToothIcon"], {
                                    size: 20,
                                    variant: active ? "Bulk" : "Linear",
                                    color: active ? "var(--tp-blue-500)" : "#FFFFFF",
                                    strokeWidth: 1.5,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconGlyph
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconsaxNavIcon, {
                                active: active,
                                Icon: icon.Icon
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navLabel, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navLabel),
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].activeBar
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                        lineNumber: 109,
                        columnNumber: 19
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectionArrow, {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                lineNumber: 111,
                columnNumber: 17
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
function NavPanel({ active, onSelect }) {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showScrollHint, setShowScrollHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const node = scrollRef.current;
        if (!node) return;
        const updateHint = ()=>{
            const hasOverflow = node.scrollHeight > node.clientHeight + 2;
            const atTop = node.scrollTop <= 2;
            setShowScrollHint(hasOverflow && atTop);
        };
        updateHint();
        node.addEventListener("scroll", updateHint, {
            passive: true
        });
        window.addEventListener("resize", updateHint);
        let observer = null;
        if (typeof ResizeObserver !== "undefined") {
            observer = new ResizeObserver(updateHint);
            observer.observe(node);
        }
        return ()=>{
            node.removeEventListener("scroll", updateHint);
            window.removeEventListener("resize", updateHint);
            observer?.disconnect();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].root,
        style: {
            width: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rxSidebarTokens"].railWidth
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollRef,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollArea,
                style: {
                    ...NAV_BG,
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rxSidebarTokens"].railWidth,
                    touchAction: "pan-y",
                    WebkitOverflowScrolling: "touch"
                },
                children: NAV_ITEMS.map(({ id, label, icon, navigateTo })=>{
                    const item = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NavItem, {
                        id: id,
                        label: label,
                        icon: icon,
                        active: active === id,
                        onClick: (nid)=>{
                            if (!navigateTo) onSelect(nid);
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                        lineNumber: 158,
                        columnNumber: 13
                    }, this);
                    if (navigateTo) {
                        const patientId = searchParams?.get("patientId") ?? "apt-1";
                        const fromParam = navigateTo === "/treatment-plan" ? `&from=rxpad` : "";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `${navigateTo}?patientId=${encodeURIComponent(patientId)}${fromParam}`,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].linkFull,
                            children: item
                        }, id, false, {
                            fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                            lineNumber: 175,
                            columnNumber: 15
                        }, this);
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                        children: item
                    }, id, false, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                        lineNumber: 181,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            showScrollHint ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollHint,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollHintBtn,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__["ArrowDown2"], {
                        color: "#FFFFFF",
                        size: 16,
                        strokeWidth: 1.5,
                        variant: "Linear"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                        lineNumber: 190,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
                lineNumber: 188,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/imports/svg-g7iuydxwol.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    p105ce480: "M10 13.9583H6.66667C6.325 13.9583 6.04167 13.675 6.04167 13.3333C6.04167 12.9917 6.325 12.7083 6.66667 12.7083H10C10.3417 12.7083 10.625 12.9917 10.625 13.3333C10.625 13.675 10.3417 13.9583 10 13.9583Z",
    p1066a300: "M239.916 239.578V200.389H239.525V239.578H239.916Z",
    p108b8e80: "M6.66667 13.3333C10.3486 13.3333 13.3333 10.3486 13.3333 6.66667C13.3333 2.98477 10.3486 0 6.66667 0C2.98477 0 0 2.98477 0 6.66667C0 10.3486 2.98477 13.3333 6.66667 13.3333Z",
    p11095bf0: "M201.232 219.16V140.23H201.623V219.16H201.232Z",
    p118ff00: "M17.5 7.08333V14.1667C17.5 16.6667 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6667 2.5 14.1667V7.08333C2.5 4.58333 3.75 2.91667 6.66667 2.91667H13.3333C16.25 2.91667 17.5 4.58333 17.5 7.08333Z",
    p11cc2e00: "M121.258 20.3714H199.406V19.9807H121.258V20.3714Z",
    p127a9800: "M12.417 10.333C12.6471 10.333 12.834 10.5199 12.834 10.75V12.208C12.834 12.3231 12.9269 12.417 13.042 12.417H14.5C14.73 12.417 14.9168 12.603 14.917 12.833V14.083C14.917 14.3131 14.7301 14.5 14.5 14.5H13.042C12.927 14.5 12.8342 14.5931 12.834 14.708V16.167C12.8338 16.397 12.647 16.583 12.417 16.583H11.167C10.937 16.583 10.7502 16.397 10.75 16.167V14.708C10.7498 14.5931 10.6569 14.5 10.542 14.5H9.08398C8.85387 14.5 8.66699 14.3131 8.66699 14.083V12.833C8.66717 12.603 8.85397 12.417 9.08398 12.417H10.542C10.6571 12.417 10.75 12.3231 10.75 12.208V10.75C10.75 10.5199 10.9369 10.333 11.167 10.333H12.417ZM8.04785 0C8.90971 1.37633e-05 9.73624 0.342769 10.3457 0.952148L13.0479 3.6543C13.6573 4.26378 14 5.09021 14 5.95215V7.83301C14 8.24722 13.6642 8.58301 13.25 8.58301C12.8359 8.58283 12.5 8.24711 12.5 7.83301V6.70215H9.71484C8.38031 6.70197 7.29785 5.61974 7.29785 4.28516V1.5H3.25C2.28365 1.50018 1.5 2.28361 1.5 3.25V13.25C1.5 14.2164 2.28365 14.9998 3.25 15H6.58301C6.99722 15 7.33301 15.3358 7.33301 15.75C7.33301 16.1642 6.99722 16.5 6.58301 16.5H3.25C1.45522 16.4998 0 15.0448 0 13.25V3.25C0 1.45518 1.45522 0.000175901 3.25 0H8.04785ZM8.79785 4.28516C8.79785 4.79131 9.20873 5.20197 9.71484 5.20215H12.3291C12.2441 5.02324 12.13 4.85757 11.9873 4.71484L9.28516 2.0127C9.14233 1.86991 8.97688 1.7549 8.79785 1.66992V4.28516Z",
    p12ee2af0: "M80.7027 22.8849L59.9363 2.11841L60.2126 1.84211L80.979 22.6086L80.7027 22.8849Z",
    p12fe00: "M7.96143 13.3322H2.84143C0.0480998 13.3322 -0.505233 11.6455 0.401433 9.59219L1.36143 7.41219C1.36143 7.41219 3.40143 7.33219 5.40143 7.99885C7.40143 8.66552 9.2881 7.40552 9.2881 7.40552L9.41477 7.32552L10.4081 9.59885C11.3014 11.6522 10.7148 13.3322 7.96143 13.3322Z",
    p133728e0: "M18.3333 14.5833V6.25C18.3333 2.91667 17.5 2.08333 14.1667 2.08333",
    p13413000: "M6 1C5.17157 1 4.5 1.67157 4.5 2.5V3.83333C4.5 4.10948 4.27614 4.33333 4 4.33333C3.72386 4.33333 3.5 4.10948 3.5 3.83333V2.5C3.5 1.11929 4.61929 0 6 0H7.33333C8.71405 0 9.83333 1.11929 9.83333 2.5V3.83333C9.83333 4.10948 9.60948 4.33333 9.33333 4.33333C9.05719 4.33333 8.83333 4.10948 8.83333 3.83333V2.5C8.83333 1.67157 8.16176 1 7.33333 1H6Z",
    p134a6c00: "M120.734 141.138L100.664 121.068L100.941 120.792L121.01 140.862L120.734 141.138Z",
    p1364b500: "M82.2546 120.792H121.13V120.401H82.2546V120.792Z",
    p13912f00: "M39.7861 41.7716L60.0738 21.4836L60.3501 21.7599L40.0624 42.0479L39.7861 41.7716Z",
    p13aefb00: "M40.6372 80.5457V2.00656H41.0279V80.5457H40.6372Z",
    p13eb7980: "M201.232 140.23V120.792H201.623V140.23H201.232Z",
    p145cac00: "M199.883 120.736L239.86 80.7583L239.584 80.482L199.607 120.459L199.883 120.736Z",
    p14b77500: "M58.7234 2.00656H98.2259V2.3973H58.7234V2.00656Z",
    p15728500: "M239.916 62.1656V22.663H239.525V62.1656H239.916Z",
    p15b5eb50: "M20.5872 60.9705L39.7861 41.7716L40.0624 42.0479L20.8635 61.2468L20.5872 60.9705Z",
    p16023200: "M14.0166 0.505821C14.9243 0.454149 15.7861 0.735109 16.4102 1.32613C17.0247 1.90802 17.334 2.70738 17.334 3.60152C17.3339 4.1612 17.1683 4.66728 16.8428 5.09762L16.3486 5.74996L15.9932 5.01266C15.9264 4.87395 15.8303 4.75937 15.7109 4.67281L15.377 4.43063L15.5518 4.0566C15.6626 3.81881 15.6717 3.5252 15.5527 3.25191H15.5518C15.5063 3.14747 15.3993 2.95766 15.1768 2.79391C14.9592 2.63391 14.5974 2.47359 13.9971 2.47359C12.8983 2.47364 12.3124 2.9849 11.9609 3.58785C11.5896 4.22492 11.4809 4.96829 11.4229 5.38668C11.2751 6.47393 10.6121 7.52042 10.2598 8.01754C10.0342 8.33554 9.91316 8.71683 9.91309 9.12496V12.583H7.91992V9.12496C7.91985 8.71647 7.79853 8.33515 7.57324 8.01754C7.22087 7.52033 6.55771 6.47453 6.40918 5.38668V5.3857C6.35128 4.96779 6.24403 4.22464 5.87305 3.58785C5.52175 2.98504 4.93497 2.47359 3.83594 2.47359C3.23559 2.47367 2.87373 2.63387 2.65625 2.79391C2.43362 2.95776 2.32668 3.14753 2.28125 3.25191C2.16223 3.52529 2.17135 3.81881 2.28223 4.0566L2.45703 4.43063L2.12305 4.67281C2.00365 4.75934 1.90749 4.87404 1.84082 5.01266L1.48535 5.75094L0.991211 5.09762C0.665662 4.66732 0.500059 4.16131 0.5 3.60152C0.5 2.7072 0.809137 1.90791 1.42383 1.32613L1.54297 1.21871C2.15512 0.700987 2.96451 0.458347 3.81641 0.505821L3.81543 0.506797C5.5289 0.600147 6.45231 1.46037 7.1748 2.12789C7.81158 2.71656 8.25375 3.09859 8.91699 3.09859C9.5802 3.09852 10.0224 2.71661 10.6592 2.12789L10.9404 1.87008C11.6243 1.25697 12.518 0.588771 14.0166 0.506797V0.505821Z",
    p16053e00: "M161.376 80.5457H239.916V80.1549H161.376V80.5457Z",
    p162a4a40: "M221.489 239.187H180.07V239.578H221.489V239.187Z",
    p1724ae00: "M10.6667 1.33333H5.33333C2.66667 1.33333 1.33333 2.66667 1.33333 5.33333V14C1.33333 14.3667 1.63333 14.6667 2 14.6667H10.6667C13.3333 14.6667 14.6667 13.3333 14.6667 10.6667V5.33333C14.6667 2.66667 13.3333 1.33333 10.6667 1.33333Z",
    p17744f0: "M60.1743 220.14V239.578H60.565V220.14H60.1743Z",
    p17aad000: "M20.5624 120.545V100.617H20.9531V120.545H20.5624Z",
    p17d30d80: "M141.305 100.474H180.77V100.083H141.305V100.474Z",
    p18439600: "M0.0964041 120.892L19.8779 140.673L20.1542 140.397L0.3727 120.616L0.0964041 120.892Z",
    p18c61280: "M6.06061 6.06061C4.40771 6.06061 3.0303 7.43802 3.0303 9.09091C3.0303 10.7438 4.40771 12.1212 6.06061 12.1212C7.7135 12.1212 9.09091 10.7438 9.09091 9.09091C9.09091 7.43802 7.7135 6.06061 6.06061 6.06061ZM7.30028 10.3994C7.23141 10.4683 7.09366 10.5372 7.02479 10.5372C6.88705 10.5372 6.81818 10.4683 6.74931 10.3994L5.85399 9.50413C5.78512 9.43526 5.71625 9.29752 5.71625 9.22865V7.7135C5.71625 7.50689 5.92287 7.30028 6.12948 7.30028C6.33609 7.30028 6.5427 7.50689 6.5427 7.7135V9.02204L7.30028 9.77961C7.43802 9.98623 7.43802 10.1928 7.30028 10.3994Z",
    p18f42600: "M141.939 61.0086H220.478V60.6179H141.939V61.0086Z",
    p18ffeb00: "M20.5624 61.1523V21.6873H20.9531V61.1523H20.5624Z",
    p19658200: "M20.5624 180.432V219.897H20.9531V180.432H20.5624Z",
    p198e2f00: "M100.756 42.938L80.7027 22.8849L80.979 22.6086L101.032 42.6617L100.756 42.938Z",
    p198e4700: "M220.144 60.9544L239.549 80.3589L239.825 80.0826L220.42 60.6781L220.144 60.9544Z",
    p19cf0280: "M221.639 239.497L201.242 219.1L201.518 218.824L221.915 239.221L221.639 239.497Z",
    p19efe500: "M221.642 161.852L201.589 141.798L201.865 141.522L221.918 161.575L221.642 161.852Z",
    p1a70dc00: "M221.551 161.575L239.581 143.545L239.858 143.821L221.827 161.852L221.551 161.575Z",
    p1a837a80: "M221.551 239.578V161.429H221.941V239.578H221.551Z",
    p1a86a00: "M20.5872 180.614L39.7861 199.813L40.0624 199.536L20.8635 180.337L20.5872 180.614Z",
    p1b056b60: "M180.952 100.449L200.151 81.2498L199.874 80.9735L180.675 100.172L180.952 100.449Z",
    p1b05aa80: "M201.242 219.1L180.931 198.789L181.207 198.513L201.518 218.824L201.242 219.1Z",
    p1b42c680: "M4.95 10.9333C4.95 10.9333 7.5 10.8333 10 11.6667C12.5 12.5 14.8583 10.925 14.8583 10.925",
    p1b66ad80: "M0.0969044 2.00656H39.286V2.3973H0.0969044V2.00656Z",
    p1c225700: "M120.938 120.792H201.04V120.401H120.938V120.792Z",
    p1c7e7000: "M11.852 3.36659C12.1123 3.10623 12.1123 2.68413 11.852 2.42378L10.9092 1.48097C10.6489 1.22062 10.2267 1.22062 9.9664 1.48097C9.70607 1.74132 9.706 2.16343 9.9664 2.42378L10.9092 3.36659C11.1695 3.62693 11.5917 3.62693 11.852 3.36659ZM8 0.666667C8 0.298473 7.70153 0 7.33333 0H6C5.6318 0 5.33333 0.298473 5.33333 0.666667C5.33333 1.03485 5.6318 1.33333 6 1.33333H7.33333C7.70153 1.33333 8 1.03485 8 0.666667ZM12.6667 8.00001C13.0349 8.00001 13.3333 7.70154 13.3333 7.33334V6.00001C13.3333 5.63181 13.0349 5.33334 12.6667 5.33334C12.2985 5.33334 12 5.63181 12 6.00001V7.33334C12 7.70154 12.2985 8.00001 12.6667 8.00001ZM0.666667 8.00001C1.03486 8.00001 1.33333 7.70154 1.33333 7.33334V6.00001C1.33333 5.63181 1.03486 5.33334 0.666667 5.33334C0.29848 5.33334 0 5.63181 0 6.00001V7.33334C0 7.70154 0.29848 8.00001 0.666667 8.00001ZM7.33333 12C7.70153 12 8 12.2985 8 12.6667C8 13.0349 7.70153 13.3333 7.33333 13.3333H6C5.6318 13.3333 5.33333 13.0349 5.33333 12.6667C5.33333 12.2985 5.6318 12 6 12H7.33333ZM2.42404 3.36713C2.16369 3.62749 1.74158 3.62749 1.48123 3.36713C1.22089 3.10679 1.22089 2.68467 1.48123 2.42433L2.42404 1.48152C2.68439 1.22117 3.1065 1.22117 3.36685 1.48152C3.6272 1.74187 3.6272 2.16398 3.36685 2.42433L2.42404 3.36713ZM9.9666 11.8521C10.2269 12.1125 10.6491 12.1125 10.9094 11.8521L11.8522 10.9093C12.1125 10.649 12.1125 10.2269 11.8522 9.96654C11.5919 9.70621 11.1697 9.70621 10.9094 9.96654L9.9666 10.9093C9.70627 11.1697 9.70627 11.5918 9.9666 11.8521ZM3.36681 10.9095C3.62716 11.1698 3.62716 11.5919 3.36681 11.8523C3.10646 12.1126 2.68435 12.1126 2.424 11.8523L1.48119 10.9095C1.22085 10.6491 1.22085 10.227 1.48119 9.96667C1.74154 9.70627 2.16365 9.70627 2.424 9.96667L3.36681 10.9095Z",
    p1cce7dc0: "M12.0833 3.75V5.41667C12.0833 6.33333 12.8333 7.08333 13.75 7.08333H15.4167",
    p1da00170: "M120.739 159.277V120.401H121.13V159.277H120.739Z",
    p1dc28400: "M239.916 81.603V62.1656H239.525V81.603H239.916Z",
    p1df65500: "M121.377 100.474H141.305V100.083H121.377V100.474Z",
    p1e011f80: "M100.702 160.907L80.4299 181.179L80.7062 181.455L100.979 161.183L100.702 160.907Z",
    p1f1ead60: "M1.66667 14.5833V6.25C1.66667 2.91667 2.5 2.08333 5.83333 2.08333",
    p1f3b5000: "M100.753 121.001L80.3557 141.397L80.632 141.674L101.029 121.277L100.753 121.001Z",
    p1f659000: "M2.66667 6C2.66667 6.36819 2.36819 6.66667 2 6.66667C1.63181 6.66667 1.33333 6.36819 1.33333 6C1.33333 5.63181 1.63181 5.33333 2 5.33333C2.36819 5.33333 2.66667 5.63181 2.66667 6Z",
    p200b2420: "M181.002 218.788L161.376 199.162L161.653 198.886L181.278 218.512L181.002 218.788Z",
    p20119000: "M80.3459 21.3164V1.87873H80.7367V21.3164H80.3459Z",
    p20efe00: "M39.286 2.00656H58.7234V2.3973H39.286V2.00656Z",
    p20f74680: "M19.879 100.91L40.5473 80.2413L40.8236 80.5176L20.1553 101.186L19.879 100.91Z",
    p2224a880: "M60.1743 141.601V220.14H60.565V141.601H60.1743Z",
    p22540600: "M141.473 179.884L160.672 160.685L160.949 160.961L141.75 180.16L141.473 179.884Z",
    p23bd000: "M6.50056 0.343026L4.6028 3.75901L3.99195 5.04345L2.81122 8.68685C2.53007 8.50577 2.19574 8.40012 1.83333 8.40012C0.803232 8.40012 0 9.25368 0 10.2668C0 11.2799 0.803232 12.1335 1.83333 12.1335C2.82378 12.1335 3.60449 11.3443 3.66313 10.383L5.04315 6.12469L5.57343 4.75737L7.6661 0.99055C7.84491 0.668694 7.72895 0.262825 7.4071 0.0840166C7.08524 -0.0947922 6.67937 0.0211704 6.50056 0.343026ZM1.83333 9.73345C1.57477 9.73345 1.33333 9.95441 1.33333 10.2668C1.33333 10.5792 1.57477 10.8001 1.83333 10.8001C2.0919 10.8001 2.33333 10.5792 2.33333 10.2668C2.33333 9.95441 2.0919 9.73345 1.83333 9.73345Z",
    p250286c0: "M180.968 140.691L161.345 121.068L161.621 120.792L181.244 140.415L180.968 140.691Z",
    p251d1400: "M201.589 141.798L180.822 121.032L181.099 120.756L201.865 141.522L201.589 141.798Z",
    p25254f80: "M13.3333 9.79167H6.66667C6.325 9.79167 6.04167 9.50833 6.04167 9.16667C6.04167 8.825 6.325 8.54167 6.66667 8.54167H13.3333C13.675 8.54167 13.9583 8.825 13.9583 9.16667C13.9583 9.50833 13.675 9.79167 13.3333 9.79167Z",
    p2541e400: "M121.338 20.2833L141.735 40.6802L142.012 40.4039L121.615 20.007L121.338 20.2833Z",
    p255d0580: "M239.916 120.792V81.603H239.525V120.792H239.916Z",
    p2653b180: "M141.449 219.531V180.066H141.839V219.531H141.449Z",
    p26f60a30: "M0.300411 42.0387L40.2882 2.05092L40.5645 2.32722L0.576707 42.315L0.300411 42.0387Z",
    p274dc900: "M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z",
    p275273a0: "M11.5833 2.41667H12.4167C14.2576 2.41667 15.75 3.90905 15.75 5.75V14.0833C15.75 15.9243 14.2576 17.4167 12.4167 17.4167H4.08333C2.24238 17.4167 0.75 15.9243 0.75 14.0833V5.75C0.75 3.90905 2.24238 2.41667 4.08333 2.41667H4.91667M11.5833 2.41667C11.5833 3.33714 10.8371 4.08333 9.91667 4.08333H6.58333C5.66286 4.08333 4.91667 3.33714 4.91667 2.41667M11.5833 2.41667C11.5833 1.49619 10.8371 0.75 9.91667 0.75H6.58333C5.66286 0.75 4.91667 1.49619 4.91667 2.41667",
    p278a7f80: "M60.116 99.8745L40.4902 80.2487L40.7665 79.9724L60.3923 99.5982L60.116 99.8745Z",
    p27baff00: "M39.7861 199.813L60.0738 220.101L60.3501 219.824L40.0624 199.536L39.7861 199.813Z",
    p27e28200: "M2.47569 0.845265C2.57424 0.490508 2.36653 0.123034 2.01178 0.0244905C1.65702 -0.0740533 1.28955 0.133649 1.191 0.488406L0.0243357 4.68841C-0.0390963 4.91676 0.0234755 5.16163 0.188684 5.33155L1.0753 6.2435L1.68614 4.95905L1.41146 4.67652L2.47569 0.845265ZM2.65678 5.95742L2.1265 7.32473L2.43348 7.64049L4.08901 11.6137C4.16218 12.5611 4.93678 13.3335 5.91668 13.3335C6.94678 13.3335 7.75001 12.4799 7.75001 11.4668C7.75001 10.4537 6.94678 9.60017 5.91668 9.60017C5.51165 9.60017 5.14169 9.73214 4.84184 9.95388L3.6154 7.01043C3.58312 6.93296 3.53651 6.86229 3.47801 6.80212L2.65678 5.95742ZM5.41668 11.4668C5.41668 11.1545 5.65812 10.9335 5.91668 10.9335C6.17524 10.9335 6.41668 11.1545 6.41668 11.4668C6.41668 11.7792 6.17524 12.0002 5.91668 12.0002C5.65812 12.0002 5.41668 11.7792 5.41668 11.4668Z",
    p27e73780: "M15 10.625C14.6583 10.625 14.375 10.3417 14.375 10V5.83333C14.375 5.49167 14.6583 5.20833 15 5.20833C15.3417 5.20833 15.625 5.49167 15.625 5.83333V10C15.625 10.3417 15.3417 10.625 15 10.625Z",
    p27f9b5f0: "M161.376 199.331V120.792H161.767V199.331H161.376Z",
    p28258680: "M219.257 40.5533L239.53 60.8265L239.807 60.5502L219.534 40.277L219.257 40.5533Z",
    p2839b600: "M0.6 2.26667H2.26667L3.93333 0.600007L5.6 3.93334L7.26667 2.26667H8.93333",
    p28440900: "M239.916 180.951V141.449H239.525V180.951H239.916Z",
    p28445400: "M80.3459 141.338V220.268H80.7367V141.338H80.3459Z",
    p284e9900: "M8 3C8 2.63181 7.70152 2.33333 7.33333 2.33333C6.96514 2.33333 6.66667 2.63181 6.66667 3V3.33333C6.66667 3.70152 6.36819 4 6 4C4.89543 4 4 4.89543 4 6V6.33333C4 6.70152 4.29848 7 4.66667 7C5.03486 7 5.33333 6.70152 5.33333 6.33333V6C5.33333 5.63181 5.63181 5.33333 6 5.33333C7.10457 5.33333 8 4.4379 8 3.33333V3Z",
    p28d53c00: "M80.3459 100.246V21.3164H80.7367V100.246H80.3459Z",
    p28ec4600: "M6.8 18.3333C3.31667 18.3333 2.61667 16.225 3.75 13.6583L7.29167 5.61667H7.04167C6.5 5.61667 6 5.4 5.64167 5.04167C5.275 4.68333 5.05833 4.18333 5.05833 3.64167C5.05833 2.55833 5.94167 1.66667 7.03333 1.66667H12.9583C13.5083 1.66667 14 1.89167 14.3583 2.25C14.825 2.71667 15.0583 3.4 14.8833 4.125C14.6583 5.025 13.7917 5.61667 12.8667 5.61667H12.7333L16.25 13.6667C17.375 16.2333 16.6417 18.3333 13.1917 18.3333H6.8Z",
    p29c44c80: "M0.75008 4.08341L5.75008 0.75008",
    p2a0eb500: "M100.664 120.92V199.068H101.055V120.92H100.664Z",
    p2a882900: "M80.3557 141.397L60.0449 161.709L60.3212 161.985L80.632 141.674L80.3557 141.397Z",
    p2b0c6e00: "M180.914 218.769V140.23H181.304V218.769H180.914Z",
    p2b24a200: "M120.854 140.755L100.702 160.907L100.979 161.183L121.13 141.032L120.854 140.755Z",
    p2b646840: "M60.1743 120.501V141.601H60.565V120.501H60.1743Z",
    p2b70ea80: "M98.2259 239.578H120.889V239.187H98.2259V239.578Z",
    p2bb74040: "M9.09091 0C8.72727 0 8.48485 0.242424 8.48485 0.606061V1.81818H9.69697V0.606061C9.69697 0.242424 9.45455 0 9.09091 0ZM3.0303 0C2.66667 0 2.42424 0.242424 2.42424 0.606061V1.81818H3.63636V0.606061C3.63636 0.242424 3.39394 0 3.0303 0Z",
    p2bbe1500: "M121.03 121.139L140.811 101.358L140.535 101.081L120.754 120.863L121.03 121.139Z",
    p2bc11500: "M239.916 200.389V180.951H239.525V200.389H239.916Z",
    p2c197e00: "M8.33333 13.2583V16C8.33333 17.6667 7.66667 18.3333 6 18.3333H4C2.33333 18.3333 1.66667 17.6667 1.66667 16V13.2583C1.66667 11.5917 2.33333 10.925 4 10.925H6C7.66667 10.925 8.33333 11.5917 8.33333 13.2583Z",
    p2c33f480: "M179.366 2.00656H218.868V2.3973H179.366V2.00656Z",
    p2c588b00: "M139.041 2.50255L161.255 20.3547L161.499 20.0502L139.285 2.19797L139.041 2.50255Z",
    p2c76bc00: "M120.739 120.593V40.8819H121.13V120.593H120.739Z",
    p2cae2090: "M80.3459 220.268V239.705H80.7367V220.268H80.3459Z",
    p2d083100: "M140.881 239.187H121.13V239.578H140.881V239.187Z",
    p2d0aa980: "M60.1743 120.693V99.9834H60.565V120.693H60.1743Z",
    p2d56180: "M100.756 198.646L80.7027 218.699L80.979 218.975L101.032 198.922L100.756 198.646Z",
    p2d98f200: "M18.3333 13.2583V16C18.3333 17.6667 17.6667 18.3333 16 18.3333H14C12.3333 18.3333 11.6667 17.6667 11.6667 16V13.2583C11.6667 11.5917 12.3333 10.925 14 10.925H16C17.6667 10.925 18.3333 11.5917 18.3333 13.2583Z",
    p2e579d80: "M121.229 61.0086H141.939V60.6179H121.229V61.0086Z",
    p2eb7bf80: "M10.3333 7.5H8.5V5.66667C8.5 5.39333 8.27333 5.16667 8 5.16667C7.72667 5.16667 7.5 5.39333 7.5 5.66667V7.5H5.66667C5.39333 7.5 5.16667 7.72667 5.16667 8C5.16667 8.27333 5.39333 8.5 5.66667 8.5H7.5V10.3333C7.5 10.6067 7.72667 10.8333 8 10.8333C8.27333 10.8333 8.5 10.6067 8.5 10.3333V8.5H10.3333C10.6067 8.5 10.8333 8.27333 10.8333 8C10.8333 7.72667 10.6067 7.5 10.3333 7.5Z",
    p2eeacd00: "M60.116 141.71L40.4902 161.335L40.7665 161.612L60.3923 141.986L60.116 141.71Z",
    p2fa14300: "M12.1212 3.63636H0V4.84848H12.1212V3.63636Z",
    p2fd47c00: "M60.0817 21.7779L40.7337 2.42993L41.01 2.15363L60.358 21.5016L60.0817 21.7779Z",
    p308c6600: "M241.808 239.187H221.489V239.578H241.808V239.187Z",
    p30f2c80: "M0.905349 0.750006L0.750006 6.28522",
    p3105da00: "M40.4902 161.166V239.705H40.881V161.166H40.4902Z",
    p31b9e400: "M80.7027 218.699L59.9363 239.466L60.2126 239.742L80.979 218.975L80.7027 218.699Z",
    p321c0580: "M39.286 239.578H58.7234V239.187H39.286V239.578Z",
    p32559a80: "M13.3333 4.79167C12.9917 4.79167 12.7083 4.50833 12.7083 4.16667V1.66667C12.7083 1.325 12.9917 1.04167 13.3333 1.04167C13.675 1.04167 13.9583 1.325 13.9583 1.66667V4.16667C13.9583 4.50833 13.675 4.79167 13.3333 4.79167Z",
    p327e7280: "M100.702 80.6774L80.4299 60.4049L80.7062 60.1286L100.979 80.4011L100.702 80.6774Z",
    p32b60c80: "M17.5 5.83333V14.1667C17.5 16.6667 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6667 2.5 14.1667V5.83333C2.5 3.33333 3.75 1.66667 6.66667 1.66667H13.3333C16.25 1.66667 17.5 3.33333 17.5 5.83333Z",
    p32d75e00: "M6.23335 12.9083C5.95835 12.05 6.28332 10.9917 7.17499 10.7C7.64999 10.55 8.23333 10.675 8.55833 11.1333C8.86666 10.6583 9.475 10.55 9.94166 10.7C10.8417 10.9917 11.1583 12.05 10.8917 12.9083C10.4667 14.2666 8.97499 14.975 8.55833 14.975C8.14999 14.9666 6.67501 14.275 6.23335 12.9083Z",
    p341e62f1: "M141.735 40.6802L162.047 60.991L162.323 60.7147L142.012 40.4039L141.735 40.6802Z",
    p341f7200: "M142.048 60.9199L161.673 80.5457L161.95 80.2694L142.324 60.6436L142.048 60.9199Z",
    p346a2700: "M100.753 120.584L80.3557 100.187L80.632 99.9104L101.029 120.307L100.753 120.584Z",
    p352b2700: "M2.66667 1.33333C3.03486 1.33333 3.33333 1.03486 3.33333 0.666667C3.33333 0.298477 3.03486 1.92473e-08 2.66667 1.92473e-08C2.29848 1.92473e-08 2 0.298477 2 0.666667C2 1.03486 2.29848 1.33333 2.66667 1.33333Z",
    p3558c040: "M12.24 0.72H2.16C1.36471 0.72 0.72 1.36471 0.72 2.16V12.24C0.72 13.0353 1.36471 13.68 2.16 13.68H12.24C13.0353 13.68 13.68 13.0353 13.68 12.24V2.16C13.68 1.36471 13.0353 0.72 12.24 0.72Z",
    p3569b700: "M7.33333 0H6V2.72197C5.39213 2.82395 4.83081 3.06301 4.34882 3.40628L2.42401 1.48147L1.48121 2.42428L3.40606 4.34913C3.06291 4.83105 2.82393 5.39227 2.72197 6H0V7.33333H2.72197C2.82393 7.94107 3.06291 8.50227 3.40607 8.9842L1.48114 10.9091L2.42395 11.8519L4.34885 9.92707C4.83083 10.2703 5.3922 10.5094 6 10.6113V13.3333H7.33333V10.6113C7.94107 10.5094 8.50233 10.2704 8.98427 9.9272L10.9094 11.8523L11.8522 10.9095L9.92713 8.9844C10.2703 8.50247 10.5094 7.94113 10.6113 7.33333H13.3333V6H10.6113C10.5094 5.3922 10.2703 4.83083 9.92707 4.34885L11.852 2.42393L10.9092 1.48112L8.9842 3.40607C8.50227 3.06291 7.94107 2.82393 7.33333 2.72197V0Z",
    p35c7ca00: "M1.58333 8.25H5.75L7.41667 5.75L10.75 10.75L12.4167 8.25H16.5833M9.08333 2.85352L9.72087 2.16857C11.4814 0.277143 14.3358 0.277143 16.0963 2.16857C17.8568 4.06 17.8568 7.12661 16.0963 9.01804L10.3584 15.1826C9.65421 15.9391 8.51246 15.9391 7.80825 15.1826L2.07039 9.01805C0.30987 7.12662 0.309871 4.06 2.07039 2.16857C3.83091 0.277142 6.68527 0.277143 8.44579 2.16857L9.08333 2.85352Z",
    p36615880: "M80.3557 100.187L60.0449 79.8756L60.3212 79.5993L80.632 99.9104L80.3557 100.187Z",
    p36a52880: "M6.66667 4.79167C6.325 4.79167 6.04167 4.50833 6.04167 4.16667V1.66667C6.04167 1.325 6.325 1.04167 6.66667 1.04167C7.00833 1.04167 7.29167 1.325 7.29167 1.66667V4.16667C7.29167 4.50833 7.00833 4.79167 6.66667 4.79167Z",
    p36cf2400: "M10.303 13.3333H1.81818C0.848485 13.3333 0 12.5017 0 11.4141V3.73737C0 2.7138 0.787879 1.81818 1.81818 1.81818H10.303C11.2727 1.81818 12.1212 2.64983 12.1212 3.73737V11.4781C12.1212 12.5017 11.3333 13.3333 10.303 13.3333Z",
    p36f65100: "M20.5624 100.617V61.1523H20.9531V100.617H20.5624Z",
    p3766be00: "M120.739 40.8819V2.00656H121.13V40.8819H120.739Z",
    p379edb00: "M239.505 218.714L221.529 239.026L221.801 239.293L239.777 218.981L239.505 218.714Z",
    p37d08480: "M180.07 239.187H140.881V239.578H180.07V239.187Z",
    p3808f370: "M100.665 198.922L120.761 219.019L121.037 218.742L100.941 198.646L100.665 198.922Z",
    p38767800: "M121.187 160.952L161.347 120.792L161.623 121.068L121.463 161.229L121.187 160.952Z",
    p389a1400: "M8.33333 10.625C7.98333 10.625 7.70833 10.3417 7.70833 9.99167L7.75 5.825C7.75 5.48333 8.03333 5.20833 8.375 5.20833C8.375 5.20833 8.375 5.20833 8.38333 5.20833C8.725 5.20833 9.00833 5.49167 9 5.84167L8.95833 10.0083C8.95833 10.35 8.675 10.625 8.33333 10.625Z",
    p38e75200: "M120.739 2.00656H159.928V2.3973H120.739V2.00656Z",
    p38ea5271: "M220.478 61.0086H239.916V60.6179H220.478V61.0086Z",
    p394cbc00: "M20.5624 140.967V180.432H20.9531V140.967H20.5624Z",
    p395c8100: "M98.2259 2.00656H120.889V2.3973H98.2259V2.00656Z",
    p39e01ff0: "M120.739 238.988V159.277H121.13V238.988H120.739Z",
    p3a13db00: "M17.5949 2.06635C15.2844 -0.2001 11.6844 0.51559 9.75001 3.78881C7.81562 0.514975 4.21558 -0.2001 1.90512 2.06635C-0.331414 4.25958 -0.0980538 12.1783 9.75001 16.75C19.5981 12.1783 19.8314 4.25958 17.5949 2.06635Z",
    p3a6f7e00: "M180.914 140.23V120.792H181.304V140.23H180.914Z",
    p3b0f32c0: "M0 40.8819V2.00656H0.390742V40.8819H0Z",
    p3b293780: "M100.665 42.6617L120.761 22.5653L121.037 22.8415L100.941 42.938L100.665 42.6617Z",
    p3b5c4a00: "M180.77 100.474H220.235V100.083H180.77V100.474Z",
    p3b7c6800: "M141.548 40.69H220.478V40.2993H141.548V40.69Z",
    p3cb9e1a0: "M58.7234 239.578H98.2259V239.187H58.7234V239.578Z",
    p3cce9800: "M218.868 2.00656H241.531V2.3973H218.868V2.00656Z",
    p3cfbb900: "M1.60254 0.422852C2.53942 0.257897 3.34957 0.972285 3.34961 1.875C3.34961 2.24264 3.21411 2.57795 2.98926 2.83789L2.24121 3.70215L3.36523 3.49219C3.84979 3.40165 4.26703 3.19074 4.57031 2.91211C4.86861 2.63804 5.08238 2.27174 5.08691 1.87305C5.08826 1.74971 5.18924 1.65039 5.3125 1.65039H5.31543L5.36035 1.65527C5.46246 1.67722 5.53896 1.76842 5.53809 1.87695C5.53014 2.57091 5.08129 3.22511 4.33887 3.62402L3.66309 3.9873L4.34863 4.33301C4.89584 4.60906 5.47875 4.75991 6.24219 4.77539L6.46875 4.7793L6.58887 4.58691L7.47266 3.16992C7.68497 2.82936 8.10769 2.684 8.48535 2.82129L10.5137 3.56055L10.5205 3.5625C10.7675 3.64823 10.8927 3.92465 10.7939 4.16797C10.7038 4.3894 10.4576 4.505 10.2295 4.43164L8.87207 3.99414L8.47754 3.86719L8.36523 4.2666C8.03139 5.4494 7.09301 6.47455 5.625 6.47461C5.17648 6.47461 4.27093 6.47212 3.39258 6.08789C2.5385 5.71416 1.68701 4.97067 1.3418 3.4209L1.30371 3.24707L1.14941 3.15918L1.05371 3.10059C0.590012 2.78926 0.313016 2.22298 0.424805 1.59863C0.529608 1.0133 1.01737 0.527208 1.60352 0.423828L1.60254 0.422852Z",
    p3d0c5280: "M15.8428 16.7735L15.083 16.32C14.9506 16.2416 14.8428 16.0529 14.8428 15.8985V14.8936",
    p3d2ffb00: "M239.619 219.13L219.714 198.735L219.979 198.448L239.883 218.843L239.619 219.13Z",
    p3d553600: "M160.672 160.685L180.96 140.397L181.236 140.673L160.949 160.961L160.672 160.685Z",
    p3daa1700: "M100.664 120.664V42.5159H101.055V120.664H100.664Z",
    p3e19eb80: "M6.3525 7.98L9 10.62L11.6475 7.98",
    p3e2845f0: "M19.8779 140.673L40.5465 161.342L40.8228 161.065L20.1542 140.397L19.8779 140.673Z",
    p3e336080: "M0.195262 2.19526C0.455612 1.93491 0.877722 1.93491 1.13807 2.19526L1.80474 2.86193C2.06509 3.12228 2.06509 3.54439 1.80474 3.80474C1.54439 4.06509 1.12228 4.06509 0.861929 3.80474L0.195262 3.13807C-0.0650874 2.87772 -0.0650874 2.45561 0.195262 2.19526Z",
    p3e3a6580: "M141.449 180.066V140.601H141.839V180.066H141.449Z",
    p3e9c3500: "M159.928 2.00656H179.366V2.3973H159.928V2.00656Z",
    p3ec80: "M17.5 7.08317V13.6332C16.8917 12.9415 16 12.4998 15 12.4998C13.1583 12.4998 11.6667 13.9915 11.6667 15.8332C11.6667 16.4582 11.8417 17.0498 12.15 17.5498C12.325 17.8498 12.55 18.1165 12.8083 18.3332H6.66667C3.75 18.3332 2.5 16.6665 2.5 14.1665V7.08317C2.5 4.58317 3.75 2.9165 6.66667 2.9165H13.3333C16.25 2.9165 17.5 4.58317 17.5 7.08317Z",
    p3ef9fb00: "M201.04 120.792H239.916V120.401H201.04V120.792Z",
    p3f25bf00: "M198.984 20.2802L219.257 40.5533L219.534 40.277L199.261 20.0039L198.984 20.2802Z",
    p3f2a7b00: "M200.151 81.2498L220.438 60.9621L220.162 60.6858L199.874 80.9735L200.151 81.2498Z",
    p438b800: "M6.9282 0L13.8564 6H0L6.9282 0Z",
    p4394c00: "M15 19.1667C16.8409 19.1667 18.3333 17.6743 18.3333 15.8333C18.3333 13.9924 16.8409 12.5 15 12.5C13.1591 12.5 11.6667 13.9924 11.6667 15.8333C11.6667 17.6743 13.1591 19.1667 15 19.1667Z",
    p521e00: "M0 120.593V40.8819H0.390742V120.593H0Z",
    p5571300: "M9.41499 7.32667L9.28832 7.40667C9.28832 7.40667 7.40165 8.66667 5.40165 8C3.40165 7.33333 1.36165 7.41333 1.36165 7.41333L3.22832 3.16H3.02832C2.59499 3.16 2.19499 2.98667 1.90832 2.7C1.62165 2.41333 1.44832 2.01333 1.44832 1.58C1.44832 0.713333 2.15499 0 3.02832 0H7.76832C8.20832 0 8.60165 0.18 8.88832 0.466667C9.26165 0.84 9.45499 1.38667 9.30832 1.96667C9.13499 2.68667 8.44165 3.16 7.69499 3.16H7.58832L9.41499 7.32667Z",
    p5730920: "M0.0969044 239.578H39.286V239.187H0.0969044V239.578Z",
    p59a54c0: "M60.0815 219.806L40.4586 239.429L40.7349 239.705L60.3578 220.083L60.0815 219.806Z",
    p5b25080: "M20.5624 121.039V140.967H20.9531V121.039H20.5624Z",
    p5beb100: "M11.6667 8.95833C11.325 8.95833 11.0417 8.675 11.0417 8.33333V5.83333C11.0417 5.49167 11.325 5.20833 11.6667 5.20833C12.0083 5.20833 12.2917 5.49167 12.2917 5.83333V8.33333C12.2917 8.675 12.0083 8.95833 11.6667 8.95833Z",
    p5c20c00: "M140.811 101.358L161.48 80.6895L161.204 80.4132L140.535 101.081L140.811 101.358Z",
    p621bc00: "M120.854 100.829L100.702 80.6774L100.979 80.4011L121.13 100.553L120.854 100.829Z",
    p629d100: "M121.328 239.261L141.109 219.479L141.385 219.755L121.604 239.537L121.328 239.261Z",
    p6636a80: "M0.198889 120.792H82.2546V120.401H0.198889V120.792Z",
    p67e2d00: "M219.714 198.735L199.691 178.217L199.955 177.93L219.979 198.448L219.714 198.735Z",
    p725f672: "M0.75 2.75V8.41667C0.75 8.84941 0.890356 9.27047 1.15 9.61667L1.65 10.2833C2.45 11.35 4.05 11.35 4.85 10.2833L5.35 9.61667C5.60964 9.27047 5.75 8.84941 5.75 8.41667V2.75C5.75 1.64543 4.85457 0.75 3.75 0.75H2.75C1.64543 0.75 0.75 1.64543 0.75 2.75Z",
    p7458280: "M139.422 2.35594L121.406 20.3714L121.13 20.0951L139.145 2.07964L139.422 2.35594Z",
    p7aa5300: "M0.0975303 120.691L19.879 100.91L20.1553 101.186L0.373827 120.967L0.0975303 120.691Z",
    p8138300: "M239.916 141.449V118.786H239.525V141.449H239.916Z",
    p89459f0: "M141.109 219.479L161.777 198.811L162.054 199.087L141.385 219.755L141.109 219.479Z",
    p8c40770: "M15.8333 14.7917H4.16667C2.15 14.7917 1.04167 13.6833 1.04167 11.6667V8.33333C1.04167 6.31667 2.15 5.20833 4.16667 5.20833H15.8333C17.85 5.20833 18.9583 6.31667 18.9583 8.33333V11.6667C18.9583 13.6833 17.85 14.7917 15.8333 14.7917ZM4.16667 6.45833C2.85 6.45833 2.29167 7.01667 2.29167 8.33333V11.6667C2.29167 12.9833 2.85 13.5417 4.16667 13.5417H15.8333C17.15 13.5417 17.7083 12.9833 17.7083 11.6667V8.33333C17.7083 7.01667 17.15 6.45833 15.8333 6.45833H4.16667Z",
    p90ac100: "M60.1743 21.4443V2.00656H60.565V21.4443H60.1743Z",
    p91f3880: "M5 9.79167C4.65833 9.79167 4.375 9.50833 4.375 9.16667V5.83333C4.375 5.49167 4.65833 5.20833 5 5.20833C5.34167 5.20833 5.625 5.49167 5.625 5.83333V9.16667C5.625 9.50833 5.34167 9.79167 5 9.79167Z",
    p96d2600: "M199.261 20.3714L217.209 2.42291L216.933 2.14662L198.984 20.0951L199.261 20.3714Z",
    pa2d3900: "M2.00598 0.5C2.2105 0.500009 2.42022 0.536009 2.62415 0.610352L2.62317 0.611328C3.14443 0.800663 3.44573 1.0115 3.61926 1.20801C3.72655 1.32959 3.81971 1.48317 3.85266 1.67578C3.88499 1.86515 3.85054 2.03958 3.797 2.1875L3.79602 2.18848C3.64715 2.59699 3.31223 2.94943 2.95032 3.16992C2.5957 3.38597 2.09802 3.54295 1.62122 3.36914V3.37012C1.22077 3.22467 0.881443 2.94662 0.679811 2.57422C0.48922 2.22177 0.441358 1.81176 0.580201 1.42969C0.804314 0.812921 1.41325 0.5 2.00598 0.5ZM16.7511 0.5C17.3437 0.50017 17.9529 0.813039 18.1769 1.42969C18.3157 1.81171 18.2678 2.22181 18.0773 2.57422C17.9008 2.9002 17.6187 3.15388 17.2823 3.30957L17.1349 3.37012C16.6573 3.5432 16.1599 3.38557 15.8048 3.16895C15.443 2.94824 15.1086 2.59638 14.9601 2.18848V2.1875C14.9065 2.03955 14.8711 1.86521 14.9034 1.67578C14.9364 1.48314 15.0295 1.32961 15.1368 1.20801C15.3103 1.01145 15.6115 0.799748 16.1329 0.610352L16.2863 0.561523C16.4408 0.520114 16.5974 0.5 16.7511 0.5Z",
    pb7dd600: "M0 5.83333C0 4.36057 1.19391 3.16667 2.66667 3.16667H10.6667C12.1394 3.16667 13.3333 4.36057 13.3333 5.83333V11.1667C13.3333 12.6394 12.1394 13.8333 10.6667 13.8333H2.66667C1.19391 13.8333 0 12.6394 0 11.1667V5.83333Z",
    pc1970: "M0 200.702V239.578H0.390742V200.702H0Z",
    pc60990: "M7.04 5.83333H6.29333C6.14399 5.83333 6.06931 5.83333 6.01227 5.8624C5.96209 5.88796 5.9213 5.92876 5.89573 5.97894C5.86667 6.03598 5.86667 6.11065 5.86667 6.26V7.27333C5.86667 7.42268 5.86667 7.49735 5.8376 7.5544C5.81204 7.60457 5.77124 7.64537 5.72106 7.67094C5.66402 7.7 5.58935 7.7 5.44 7.7H4.42667C4.27732 7.7 4.20265 7.7 4.1456 7.72907C4.09543 7.75463 4.05463 7.79543 4.02906 7.8456C4 7.90265 4 7.97732 4 8.12667V8.87333C4 9.02268 4 9.09735 4.02906 9.1544C4.05463 9.20457 4.09543 9.24537 4.1456 9.27094C4.20265 9.3 4.27732 9.3 4.42667 9.3H5.44C5.58935 9.3 5.66402 9.3 5.72106 9.32906C5.77124 9.35463 5.81204 9.39543 5.8376 9.4456C5.86667 9.50265 5.86667 9.57732 5.86667 9.72667V10.74C5.86667 10.8893 5.86667 10.964 5.89573 11.0211C5.9213 11.0712 5.96209 11.112 6.01227 11.1376C6.06931 11.1667 6.14399 11.1667 6.29333 11.1667H7.04C7.18935 11.1667 7.26402 11.1667 7.32106 11.1376C7.37124 11.112 7.41204 11.0712 7.4376 11.0211C7.46667 10.964 7.46667 10.8893 7.46667 10.74V9.72667C7.46667 9.57732 7.46667 9.50265 7.49573 9.4456C7.5213 9.39543 7.56209 9.35463 7.61227 9.32906C7.66931 9.3 7.74399 9.3 7.89333 9.3H8.90667C9.05601 9.3 9.13069 9.3 9.18773 9.27094C9.23791 9.24537 9.2787 9.20457 9.30427 9.1544C9.33333 9.09735 9.33333 9.02268 9.33333 8.87333V8.12667C9.33333 7.97732 9.33333 7.90265 9.30427 7.8456C9.2787 7.79543 9.23791 7.75463 9.18773 7.72907C9.13069 7.7 9.05601 7.7 8.90667 7.7H7.89333C7.74399 7.7 7.66931 7.7 7.61227 7.67094C7.56209 7.64537 7.5213 7.60457 7.49573 7.5544C7.46667 7.49735 7.46667 7.42268 7.46667 7.27333V6.26C7.46667 6.11065 7.46667 6.03598 7.4376 5.97894C7.41204 5.92876 7.37124 5.88796 7.32106 5.8624C7.26402 5.83333 7.18935 5.83333 7.04 5.83333Z",
    pc7f0460: "M0 120.6V200.702H0.390742V120.6H0Z",
    pcf85200: "M2.88 5.04L0.72 2.88L2.88 0.72",
    pd5f6980: "M180.914 239.478V218.769H181.304V239.478H180.914Z",
    pd6a3300: "M239.916 22.663V0H239.525V22.663H239.916Z",
    pd6cfe00: "M0.300328 199.545L40.4605 239.705L40.7368 239.429L0.576624 199.269L0.300328 199.545Z",
    pde45100: "M60.1743 99.9834V21.4443H60.565V99.9834H60.1743Z",
    pe4b80: "M161.255 20.3547L186.431 40.588L186.676 40.2835L161.499 20.0502L161.255 20.3547Z",
    ped70280: "M220.478 40.69H239.916V40.2993H220.478V40.69Z",
    peeeb600: "M5.5286 0.195262C5.78895 -0.0650874 6.21106 -0.0650874 6.47141 0.195262C6.73175 0.455612 6.73175 0.877722 6.47141 1.13807L4.4714 3.13807C4.21106 3.39842 3.78895 3.39842 3.5286 3.13807C3.26825 2.87772 3.26825 2.45561 3.5286 2.19526L5.5286 0.195262Z",
    pfc5ec00: "M141.449 239.458V219.531H141.839V239.458H141.449Z"
};
}),
"[project]/components/tp-rxpad/secondary-sidebar/detailShared.module.scss [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionBar": "detailShared-module-scss-module__HKd9xq__actionBar",
  "actionCenter": "detailShared-module-scss-module__HKd9xq__actionCenter",
  "actionHit": "detailShared-module-scss-module__HKd9xq__actionHit",
  "actionInner": "detailShared-module-scss-module__HKd9xq__actionInner",
  "actionLabel": "detailShared-module-scss-module__HKd9xq__actionLabel",
  "actionOutline": "detailShared-module-scss-module__HKd9xq__actionOutline",
  "cardHeader": "detailShared-module-scss-module__HKd9xq__cardHeader",
  "cardHeaderClickable": "detailShared-module-scss-module__HKd9xq__cardHeaderClickable",
  "cardHeaderCollapsed": "detailShared-module-scss-module__HKd9xq__cardHeaderCollapsed",
  "cardHeaderInner": "detailShared-module-scss-module__HKd9xq__cardHeaderInner",
  "cardHeaderRoundedOpen": "detailShared-module-scss-module__HKd9xq__cardHeaderRoundedOpen",
  "cardHeaderRoundedStuck": "detailShared-module-scss-module__HKd9xq__cardHeaderRoundedStuck",
  "cardHeaderRow": "detailShared-module-scss-module__HKd9xq__cardHeaderRow",
  "chevronBox": "detailShared-module-scss-module__HKd9xq__chevronBox",
  "chevronRot": "detailShared-module-scss-module__HKd9xq__chevronRot",
  "chevronWrap": "detailShared-module-scss-module__HKd9xq__chevronWrap",
  "collapsedCard": "detailShared-module-scss-module__HKd9xq__collapsedCard",
  "collapsedInner": "detailShared-module-scss-module__HKd9xq__collapsedInner",
  "collapsedPad": "detailShared-module-scss-module__HKd9xq__collapsedPad",
  "collapsedRow": "detailShared-module-scss-module__HKd9xq__collapsedRow",
  "collapsedTitle": "detailShared-module-scss-module__HKd9xq__collapsedTitle",
  "collapsedTitleP": "detailShared-module-scss-module__HKd9xq__collapsedTitleP",
  "contentGrow": "detailShared-module-scss-module__HKd9xq__contentGrow",
  "contentRowFlex": "detailShared-module-scss-module__HKd9xq__contentRowFlex",
  "contentRowOuter": "detailShared-module-scss-module__HKd9xq__contentRowOuter",
  "contentRowPad": "detailShared-module-scss-module__HKd9xq__contentRowPad",
  "contentStack": "detailShared-module-scss-module__HKd9xq__contentStack",
  "contentText": "detailShared-module-scss-module__HKd9xq__contentText",
  "grey": "detailShared-module-scss-module__HKd9xq__grey",
  "plusIcon": "detailShared-module-scss-module__HKd9xq__plusIcon",
  "plusSvg": "detailShared-module-scss-module__HKd9xq__plusSvg",
  "red": "detailShared-module-scss-module__HKd9xq__red",
  "scrollArea": "detailShared-module-scss-module__HKd9xq__scrollArea",
  "scrollInner": "detailShared-module-scss-module__HKd9xq__scrollInner",
  "sectionCardBody": "detailShared-module-scss-module__HKd9xq__sectionCardBody",
  "sectionCardRoot": "detailShared-module-scss-module__HKd9xq__sectionCardRoot",
  "sep": "detailShared-module-scss-module__HKd9xq__sep",
  "titleRow": "detailShared-module-scss-module__HKd9xq__titleRow",
  "titleStrong": "detailShared-module-scss-module__HKd9xq__titleStrong",
  "titleStrongP": "detailShared-module-scss-module__HKd9xq__titleStrongP",
});
}),
"[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionButton",
    ()=>ActionButton,
    "Bold",
    ()=>Bold,
    "CollapsedCard",
    ()=>CollapsedCard,
    "ContentRow",
    ()=>ContentRow,
    "Grey",
    ()=>Grey,
    "Red",
    ()=>Red,
    "SectionCard",
    ()=>SectionCard,
    "SectionScrollArea",
    ()=>SectionScrollArea,
    "Sep",
    ()=>Sep,
    "useStickyHeaderState",
    ()=>useStickyHeaderState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * Shared primitives for detailed section content panels.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareDown$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowSquareDown.js [app-ssr] (ecmascript) <export default as ArrowSquareDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareUp$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowSquareUp.js [app-ssr] (ecmascript) <export default as ArrowSquareUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/tokens.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/rxSidebarPrimitives.module.scss [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/detailShared.module.scss [app-ssr] (css module)");
;
;
;
;
;
;
;
function getNearestScrollContainer(element) {
    let current = element.parentElement;
    while(current){
        const style = window.getComputedStyle(current);
        const overflowY = style.overflowY;
        if (overflowY === "auto" || overflowY === "scroll") {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}
function useStickyHeaderState(offset = 0) {
    const headerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const [isStuck, setIsStuck] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const node = undefined;
        const scrollRoot = undefined;
        let frame;
        const update = undefined;
        const scheduleUpdate = undefined;
        const observer = undefined;
    }, [
        offset
    ]);
    return {
        headerRef,
        isStuck
    };
}
function ActionButton({ label = "Add/Edit Details", icon = "plus", onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionBar,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionHit,
            role: onClick ? "button" : undefined,
            onClick: onClick,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionOutline,
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionCenter,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionInner,
                        children: [
                            icon === "plus" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].plusIcon,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].plusSvg,
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M6 12H18",
                                            stroke: "var(--tp-blue-500)",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "1.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                            lineNumber: 75,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M12 18V6",
                                            stroke: "var(--tp-blue-500)",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "1.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                            lineNumber: 82,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                    lineNumber: 74,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                lineNumber: 73,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionLabel,
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
function SectionCardHeader({ title, titleAddon, expanded = true, onToggle, hideChevron = false }) {
    const { headerRef, isStuck } = useStickyHeaderState();
    const HeaderTag = onToggle ? "button" : "div";
    const radiusClass = expanded ? isStuck ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardHeaderRoundedStuck : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardHeaderRoundedOpen : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardHeaderCollapsed;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderTag, {
        ref: headerRef,
        type: onToggle ? "button" : undefined,
        onClick: onToggle,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardHeader, radiusClass, onToggle ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardHeaderClickable : ""),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardHeaderRow,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardHeaderInner,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].titleRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].titleStrong} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyStrong}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].titleStrongP,
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this),
                            titleAddon
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this),
                    !hideChevron ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chevronWrap,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chevronRot,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chevronBox,
                                children: expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareUp$3e$__["ArrowSquareUp"], {
                                    color: "var(--tp-slate-500)",
                                    size: 18,
                                    strokeWidth: 1.5,
                                    variant: "Linear"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                    lineNumber: 133,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareDown$3e$__["ArrowSquareDown"], {
                                    color: "var(--tp-slate-500)",
                                    size: 18,
                                    strokeWidth: 1.5,
                                    variant: "Linear"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                    lineNumber: 140,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                lineNumber: 131,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                            lineNumber: 130,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                        lineNumber: 129,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                lineNumber: 121,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
            lineNumber: 120,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
function SectionCard({ title, titleAddon, expanded = true, onToggle, hideChevron = false, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionCardRoot,
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tpSectionCardStyle"],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionCardHeader, {
                title: title,
                titleAddon: titleAddon,
                expanded: expanded,
                onToggle: onToggle,
                hideChevron: hideChevron
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionCardBody,
                children: children
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                lineNumber: 168,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
function SectionScrollArea({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollArea,
        "data-sticky-scroll-root": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollInner,
            children: children
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
            lineNumber: 177,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
function ContentRow({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contentRowOuter,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contentRowFlex,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contentRowPad,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contentGrow,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contentStack,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contentText,
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                            lineNumber: 189,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                        lineNumber: 188,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                    lineNumber: 187,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                lineNumber: 186,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
            lineNumber: 185,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
function Grey({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grey,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
        lineNumber: 199,
        columnNumber: 10
    }, this);
}
function Sep() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sep,
        children: " | "
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
        lineNumber: 203,
        columnNumber: 10
    }, this);
}
function Bold({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyStrong),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
        lineNumber: 207,
        columnNumber: 10
    }, this);
}
function Red({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].red,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
        lineNumber: 211,
        columnNumber: 10
    }, this);
}
function CollapsedCard({ text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].collapsedCard,
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tpSectionCardStyle"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].collapsedInner,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].collapsedRow,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].collapsedPad,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].collapsedTitle,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].collapsedTitleP,
                                children: text
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                lineNumber: 221,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detailShared$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chevronBox,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareDown$3e$__["ArrowSquareDown"], {
                                color: "var(--tp-slate-500)",
                                size: 18,
                                strokeWidth: 1.5,
                                variant: "Linear"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                                lineNumber: 224,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                            lineNumber: 223,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
                lineNumber: 218,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
            lineNumber: 217,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx",
        lineNumber: 216,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/PastVisitsContent.module.scss [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bodyPl": "PastVisitsContent-module-scss-module___3p3tq__bodyPl",
  "bodyTextMuted": "PastVisitsContent-module-scss-module___3p3tq__bodyTextMuted",
  "chevronBox": "PastVisitsContent-module-scss-module___3p3tq__chevronBox",
  "copyBtn": "PastVisitsContent-module-scss-module___3p3tq__copyBtn",
  "copyBtnIdle": "PastVisitsContent-module-scss-module___3p3tq__copyBtnIdle",
  "copyBtnSuccess": "PastVisitsContent-module-scss-module___3p3tq__copyBtnSuccess",
  "copyPeek": "PastVisitsContent-module-scss-module___3p3tq__copyPeek",
  "copyTouchHide": "PastVisitsContent-module-scss-module___3p3tq__copyTouchHide",
  "copyVisible": "PastVisitsContent-module-scss-module___3p3tq__copyVisible",
  "dateHead": "PastVisitsContent-module-scss-module___3p3tq__dateHead",
  "dateHeadCollapsed": "PastVisitsContent-module-scss-module___3p3tq__dateHeadCollapsed",
  "dateHeadLeft": "PastVisitsContent-module-scss-module___3p3tq__dateHeadLeft",
  "dateHeadOpen": "PastVisitsContent-module-scss-module___3p3tq__dateHeadOpen",
  "dateHeadRow": "PastVisitsContent-module-scss-module___3p3tq__dateHeadRow",
  "dateHeadStuck": "PastVisitsContent-module-scss-module___3p3tq__dateHeadStuck",
  "dateHeadTitle": "PastVisitsContent-module-scss-module___3p3tq__dateHeadTitle",
  "dentalComma": "PastVisitsContent-module-scss-module___3p3tq__dentalComma",
  "dentalLabel": "PastVisitsContent-module-scss-module___3p3tq__dentalLabel",
  "dentalLi": "PastVisitsContent-module-scss-module___3p3tq__dentalLi",
  "dentalStack": "PastVisitsContent-module-scss-module___3p3tq__dentalStack",
  "dentalUl": "PastVisitsContent-module-scss-module___3p3tq__dentalUl",
  "dentalValue": "PastVisitsContent-module-scss-module___3p3tq__dentalValue",
  "drawerActionBtn": "PastVisitsContent-module-scss-module___3p3tq__drawerActionBtn",
  "drawerActions": "PastVisitsContent-module-scss-module___3p3tq__drawerActions",
  "drawerHeader": "PastVisitsContent-module-scss-module___3p3tq__drawerHeader",
  "drawerSheet": "PastVisitsContent-module-scss-module___3p3tq__drawerSheet",
  "emptyClinical": "PastVisitsContent-module-scss-module___3p3tq__emptyClinical",
  "emptyClinicalText": "PastVisitsContent-module-scss-module___3p3tq__emptyClinicalText",
  "iconBox16": "PastVisitsContent-module-scss-module___3p3tq__iconBox16",
  "inlineFlexCenter": "PastVisitsContent-module-scss-module___3p3tq__inlineFlexCenter",
  "innerStack": "PastVisitsContent-module-scss-module___3p3tq__innerStack",
  "interactiveGroup": "PastVisitsContent-module-scss-module___3p3tq__interactiveGroup",
  "itemLabelBlock": "PastVisitsContent-module-scss-module___3p3tq__itemLabelBlock",
  "itemLabelStrong": "PastVisitsContent-module-scss-module___3p3tq__itemLabelStrong",
  "itemMetaInline": "PastVisitsContent-module-scss-module___3p3tq__itemMetaInline",
  "itemTapWrap": "PastVisitsContent-module-scss-module___3p3tq__itemTapWrap",
  "listItemRow": "PastVisitsContent-module-scss-module___3p3tq__listItemRow",
  "listLi": "PastVisitsContent-module-scss-module___3p3tq__listLi",
  "listUl": "PastVisitsContent-module-scss-module___3p3tq__listUl",
  "medIcon": "PastVisitsContent-module-scss-module___3p3tq__medIcon",
  "menuNarrow": "PastVisitsContent-module-scss-module___3p3tq__menuNarrow",
  "menuTriggerIcon": "PastVisitsContent-module-scss-module___3p3tq__menuTriggerIcon",
  "metaMuted": "PastVisitsContent-module-scss-module___3p3tq__metaMuted",
  "metaSep": "PastVisitsContent-module-scss-module___3p3tq__metaSep",
  "pdfFallback": "PastVisitsContent-module-scss-module___3p3tq__pdfFallback",
  "pdfFallbackImg": "PastVisitsContent-module-scss-module___3p3tq__pdfFallbackImg",
  "pdfFallbackText": "PastVisitsContent-module-scss-module___3p3tq__pdfFallbackText",
  "pdfObject": "PastVisitsContent-module-scss-module___3p3tq__pdfObject",
  "pdfPane": "PastVisitsContent-module-scss-module___3p3tq__pdfPane",
  "pushEnd": "PastVisitsContent-module-scss-module___3p3tq__pushEnd",
  "scrollFlex": "PastVisitsContent-module-scss-module___3p3tq__scrollFlex",
  "sectionBlock": "PastVisitsContent-module-scss-module___3p3tq__sectionBlock",
  "sectionHead": "PastVisitsContent-module-scss-module___3p3tq__sectionHead",
  "sectionTitle": "PastVisitsContent-module-scss-module___3p3tq__sectionTitle",
  "tabBtn": "PastVisitsContent-module-scss-module___3p3tq__tabBtn",
  "tabBtnLeft": "PastVisitsContent-module-scss-module___3p3tq__tabBtnLeft",
  "tabBtnRight": "PastVisitsContent-module-scss-module___3p3tq__tabBtnRight",
  "tabLabelOff": "PastVisitsContent-module-scss-module___3p3tq__tabLabelOff",
  "tabLabelOn": "PastVisitsContent-module-scss-module___3p3tq__tabLabelOn",
  "tabStripInner": "PastVisitsContent-module-scss-module___3p3tq__tabStripInner",
  "tabStripWrap": "PastVisitsContent-module-scss-module___3p3tq__tabStripWrap",
  "tapCopyAction": "PastVisitsContent-module-scss-module___3p3tq__tapCopyAction",
  "tapTooltipPanel": "PastVisitsContent-module-scss-module___3p3tq__tapTooltipPanel",
  "tapTooltipRow": "PastVisitsContent-module-scss-module___3p3tq__tapTooltipRow",
  "tapTooltipText": "PastVisitsContent-module-scss-module___3p3tq__tapTooltipText",
  "tapTriggerReset": "PastVisitsContent-module-scss-module___3p3tq__tapTriggerReset",
  "tooltipDark": "PastVisitsContent-module-scss-module___3p3tq__tooltipDark",
  "visitCard": "PastVisitsContent-module-scss-module___3p3tq__visitCard",
  "writtenBtn": "PastVisitsContent-module-scss-module___3p3tq__writtenBtn",
  "writtenDesc": "PastVisitsContent-module-scss-module___3p3tq__writtenDesc",
  "writtenFooter": "PastVisitsContent-module-scss-module___3p3tq__writtenFooter",
  "writtenImg": "PastVisitsContent-module-scss-module___3p3tq__writtenImg",
  "writtenStack": "PastVisitsContent-module-scss-module___3p3tq__writtenStack",
  "writtenTextCol": "PastVisitsContent-module-scss-module___3p3tq__writtenTextCol",
  "writtenThumb": "PastVisitsContent-module-scss-module___3p3tq__writtenThumb",
  "writtenTitle": "PastVisitsContent-module-scss-module___3p3tq__writtenTitle",
});
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/PastVisitsContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PastVisitsContent",
    ()=>PastVisitsContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
/**
 * Past Visits content panel
 * - Supports per-date digital/written modes.
 * - Written Rx opens in a right sidebar PDF viewer.
 * - Copy affordances on date / section / item provide UX-level copy feedback.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareDown$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowSquareDown.js [app-ssr] (ecmascript) <export default as ArrowSquareDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareUp$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowSquareUp.js [app-ssr] (ecmascript) <export default as ArrowSquareUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Calendar2.js [app-ssr] (ecmascript) <export default as Calendar2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Import$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Import.js [app-ssr] (ecmascript) <export default as Import>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Printer.js [app-ssr] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-ssr] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tooltip.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown-menu.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-drawer.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-snackbar.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$ToothIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/ToothIcon.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/tokens.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/PastVisitsContent.module.scss [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/plan-procedures-store.ts [app-ssr] (ecmascript)");
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
const PROC_STATUS_LABEL = {
    "not-started": "Planned",
    planned: "Planned",
    "in-progress": "In Progress",
    completed: "Completed",
    "no-show": "No Show",
    "not-interested": "Not Interested"
};
// Build a synthetic "from treatment plan" visit out of published procedures so
// chairside procedures recorded in the dental plan show up in Past Visits.
function buildPlanProcedureVisit(procs) {
    if (!procs || procs.length === 0) return null;
    const byTooth = new Map();
    for (const p of procs){
        const toothLabel = p.toothLabel || "General";
        if (!byTooth.has(toothLabel)) byTooth.set(toothLabel, []);
        byTooth.get(toothLabel).push({
            name: p.name,
            surface: p.doctor || "",
            date: p.date || "",
            status: p.status ? PROC_STATUS_LABEL[p.status] ?? p.status : "",
            notes: p.notes || ""
        });
    }
    const dentalExamination = Array.from(byTooth.entries()).map(([toothLabel, procedures])=>({
            toothLabel,
            treatmentHistory: [],
            findings: [],
            procedures,
            overallToothNote: ""
        }));
    return {
        id: "plan-procedures",
        dateLabel: "From Treatment Plan",
        isProcedureTag: true,
        digitalRx: {
            symptoms: [],
            examinations: [],
            diagnoses: [],
            dentalExamination,
            medications: [],
            advice: "",
            followUp: "",
            labInvestigations: [],
            vitals: {}
        },
        writtenRx: []
    };
}
function readPatientIdFromUrl() {
    if ("TURBOPACK compile-time truthy", 1) return "apt-1";
    //TURBOPACK unreachable
    ;
}
function normalizePointerText(value) {
    return value.replace(/\s*[•·]\s*/g, " • ").replace(/\s*\|\s*/g, " | ").replace(/\s+/g, " ").replace(/\(\s+/g, "(").replace(/\s+\)/g, ")").trim();
}
function formatMedicationDetail(item) {
    const row = item.row;
    const details = [
        row.unitPerDose,
        row.frequency,
        row.when,
        row.duration,
        row.note
    ].map((value)=>normalizePointerText(value)).filter(Boolean);
    return details.join(" | ");
}
function formatBracketParts(parts) {
    const clean = parts.map((part)=>normalizePointerText(part ?? "")).filter(Boolean);
    return clean.length > 0 ? clean.join(" | ") : "";
}
function splitMetaParts(value) {
    return normalizePointerText(value).split("|").map((part)=>part.trim()).filter(Boolean);
}
function renderMetaInBrackets(parts) {
    if (parts.length === 0) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].metaMuted,
        children: [
            " (",
            parts.map((part, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                    children: [
                        index > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].metaSep,
                            children: " | "
                        }) : null,
                        part
                    ]
                }, `${part}-${index}`)),
            ")"
        ]
    });
}
const WRITTEN_RX_PDF_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
const WRITTEN_RX_PREVIEW = "/assets/afc7c9e55f8624dd8cba9c2017f7a975fba9d2d2.png";
const PAST_VISITS = [
    {
        id: "visit-27-jan",
        dateLabel: "27 Jan'26",
        digitalRx: {
            symptoms: [
                {
                    label: "Tooth pain",
                    detail: "Since: 5 days | Status: Active | Trigger: Night-time throbbing"
                },
                {
                    label: "Cold sensitivity",
                    detail: "Since: 2 weeks | Status: Active | Trigger: Sweet and cold drinks"
                }
            ],
            examinations: [
                {
                    label: "General oral exam",
                    detail: "Deep cavity in 36, tenderness on percussion, oral hygiene fair"
                }
            ],
            diagnoses: [
                {
                    label: "Irreversible pulpitis",
                    detail: "Since: 5 days | Status: Confirmed | Related to tooth 36"
                },
                {
                    label: "Dental caries",
                    detail: "Since: 2 weeks | Status: Confirmed | Affected teeth: 16, 36"
                }
            ],
            dentalExamination: [
                {
                    toothLabel: "Lower Left First Molar (T36)",
                    treatmentHistory: [
                        {
                            name: "Root Canal Treatment",
                            surface: "Occlusal, Root",
                            since: "12 Feb'25",
                            notes: "Access opening completed"
                        },
                        {
                            name: "Composite Restoration",
                            surface: "Mesio-occlusal",
                            since: "20 Nov'24",
                            notes: "Secondary caries suspected near margin"
                        }
                    ],
                    findings: [
                        {
                            name: "Deep caries with percussion tenderness",
                            surface: "Occlusal",
                            since: "27 Jan'26",
                            notes: "Night pain present"
                        },
                        {
                            name: "Localized gingival inflammation",
                            surface: "Lingual",
                            since: "27 Jan'26",
                            notes: "Mild bleeding on probing"
                        }
                    ],
                    procedures: [
                        {
                            name: "RCT Sitting 1",
                            surface: "Mesial and distal canals",
                            date: "28 Jan'26",
                            status: "Planned",
                            notes: "Working length confirmation pending"
                        },
                        {
                            name: "Pain management protocol",
                            date: "27 Jan'26",
                            status: "Completed",
                            notes: "Ibuprofen SOS prescribed"
                        }
                    ],
                    overallToothNote: "Severe throbbing pain for 5 days; crown planned post-obturation."
                },
                {
                    toothLabel: "Upper Right First Molar (T16)",
                    treatmentHistory: [],
                    findings: [
                        {
                            name: "Early caries with staining",
                            surface: "Buccal, Occlusal",
                            since: "27 Jan'26",
                            notes: "Cold and sweet sensitivity"
                        },
                        {
                            name: "Food impaction tendency",
                            surface: "Distal marginal ridge",
                            since: "27 Jan'26"
                        }
                    ],
                    procedures: [
                        {
                            name: "Composite Restoration",
                            surface: "Buccal, Occlusal",
                            date: "30 Jan'26",
                            status: "Planned"
                        },
                        {
                            name: "Topical fluoride application",
                            date: "27 Jan'26",
                            status: "Completed",
                            notes: "Post-sensitivity management"
                        }
                    ],
                    overallToothNote: "No previous restorative work for this tooth."
                },
                {
                    toothLabel: "Lower Right Central Incisor (T41)",
                    treatmentHistory: [],
                    findings: [
                        {
                            name: "Supragingival calculus",
                            surface: "Lingual",
                            since: "27 Jan'26"
                        }
                    ],
                    procedures: [
                        {
                            name: "Scaling and Polishing",
                            surface: "Lingual",
                            date: "31 Jan'26",
                            status: "Planned"
                        }
                    ],
                    overallToothNote: "Include with full-mouth periodontal therapy."
                }
            ],
            medications: [
                {
                    label: "Amoxicillin 500mg",
                    detail: "1 capsule | 1-0-1 | After Food | 5 days",
                    row: {
                        medicine: "Amoxicillin 500mg",
                        unitPerDose: "1 Capsule",
                        frequency: "1 - 0 - 1",
                        when: "After Food",
                        duration: "5 Days",
                        note: "Pre-RCT antibiotic cover"
                    }
                },
                {
                    label: "Ibuprofen 400mg",
                    detail: "1 tablet | SOS | After Food | 3 days",
                    row: {
                        medicine: "Ibuprofen 400mg",
                        unitPerDose: "1 Tablet",
                        frequency: "SOS",
                        when: "After Food",
                        duration: "3 Days",
                        note: "For pain management"
                    }
                }
            ],
            advice: "Avoid chewing on left side. Warm salt water rinse 3×/day. Soft diet recommended. RCT sitting 1 scheduled for 28 Jan.",
            followUp: "After 3 days (RCT sitting 1)",
            labInvestigations: [
                "IOPA X-ray — 36",
                "OPG (Full mouth)"
            ],
            vitals: {
                bpSystolic: "122",
                bpDiastolic: "78",
                temperature: "98.6",
                heartRate: "76",
                respiratoryRate: "16",
                weight: "68"
            },
            additionalNotes: "Treatment plan: RCT on 36, composite restoration on 16, full-mouth scaling. Crown (PFM) on 26 post-RCT."
        },
        writtenRx: [
            {
                id: "wrx-27-a",
                title: "Written Rx",
                description: "Scanned OPD sheet (27 Jan'26)",
                pdfUrl: WRITTEN_RX_PDF_URL,
                previewImage: WRITTEN_RX_PREVIEW
            }
        ]
    },
    {
        id: "visit-26-jan",
        dateLabel: "26 Jan'26",
        digitalRx: {
            symptoms: [
                {
                    label: "Facial swelling",
                    detail: "Since: 3 days | Status: Active | Site: Left buccal vestibule"
                }
            ],
            examinations: [
                {
                    label: "Oral exam",
                    detail: "Mild facial swelling, large carious lesion on 26, tenderness positive"
                }
            ],
            diagnoses: [
                {
                    label: "Periapical abscess",
                    detail: "Since: 3 days | Status: Confirmed | Associated with tooth 26"
                }
            ],
            dentalExamination: [
                {
                    toothLabel: "Upper Left First Molar (T26)",
                    treatmentHistory: [
                        {
                            name: "Acute periapical abscess",
                            surface: "Buccal vestibule",
                            since: "26 Jan'26",
                            notes: "Buccal space involvement"
                        }
                    ],
                    findings: [
                        {
                            name: "Large carious lesion with swelling",
                            surface: "Buccal",
                            since: "26 Jan'26",
                            notes: "Tender on percussion"
                        }
                    ],
                    procedures: [
                        {
                            name: "Incision and Drainage",
                            surface: "Buccal vestibule",
                            date: "26 Jan'26",
                            status: "Completed",
                            notes: "Under LA"
                        }
                    ],
                    overallToothNote: "Review for RCT vs extraction after antibiotic course."
                }
            ],
            medications: [
                {
                    label: "Augmentin 625mg",
                    detail: "1 tablet | 1-0-1 | After Food | 5 days",
                    row: {
                        medicine: "Augmentin 625mg",
                        unitPerDose: "1 Tablet",
                        frequency: "1 - 0 - 1",
                        when: "After Food",
                        duration: "5 Days",
                        note: "Amoxicillin + Clavulanate for abscess"
                    }
                },
                {
                    label: "Metronidazole 400mg",
                    detail: "1 tablet | 1-1-1 | After Food | 5 days",
                    row: {
                        medicine: "Metronidazole 400mg",
                        unitPerDose: "1 Tablet",
                        frequency: "1 - 1 - 1",
                        when: "After Food",
                        duration: "5 Days",
                        note: "Anaerobic coverage"
                    }
                }
            ],
            advice: "Incision & drainage performed. Warm saline rinse 4×/day. Review after antibiotics for RCT or extraction decision.",
            followUp: "After 5 days",
            labInvestigations: [
                "IOPA X-ray — 26"
            ],
            vitals: {
                bpSystolic: "118",
                bpDiastolic: "74",
                temperature: "99.1",
                heartRate: "90",
                respiratoryRate: "20"
            },
            additionalNotes: "I&D done under LA. Pus drained. Crown (PFM) planned post-RCT."
        },
        writtenRx: []
    },
    {
        id: "visit-24-jan",
        dateLabel: "24 Jan'26",
        digitalRx: {
            symptoms: [
                {
                    label: "Bleeding gums",
                    detail: "Since: 1 month | Status: Active | During brushing"
                },
                {
                    label: "Bad breath",
                    detail: "Since: 1 month | Status: Active"
                }
            ],
            examinations: [
                {
                    label: "Periodontal exam",
                    detail: "Generalized 3-4mm pockets, bleeding on probing, moderate calculus"
                }
            ],
            diagnoses: [
                {
                    label: "Chronic generalized gingivitis",
                    detail: "Since: 1 month | Status: Confirmed | Moderate severity"
                }
            ],
            dentalExamination: [
                {
                    toothLabel: "Full Mouth (Periodontal)",
                    treatmentHistory: [],
                    findings: [
                        {
                            name: "Generalized periodontal pockets",
                            surface: "All quadrants",
                            since: "24 Jan'26",
                            notes: "3-4mm pockets with bleeding on probing"
                        },
                        {
                            name: "Moderate supragingival calculus",
                            surface: "All quadrants",
                            since: "24 Jan'26"
                        }
                    ],
                    procedures: [
                        {
                            name: "Scaling and Polishing",
                            surface: "Full Mouth",
                            date: "24 Jan'26",
                            status: "Completed",
                            notes: "Single sitting"
                        }
                    ],
                    overallToothNote: "Modified Bass brushing technique demonstrated; 2-week review advised."
                }
            ],
            medications: [
                {
                    label: "Chlorhexidine 0.2% Mouthwash",
                    detail: "10ml | Twice daily | After brushing | 2 weeks",
                    row: {
                        medicine: "Chlorhexidine 0.2% Mouthwash",
                        unitPerDose: "10 ml",
                        frequency: "1 - 0 - 1",
                        when: "After Brushing",
                        duration: "2 Weeks",
                        note: "Do not rinse after use"
                    }
                }
            ],
            advice: "Full-mouth scaling completed. Use soft-bristle brush. Modified Bass brushing technique demonstrated. Floss daily.",
            followUp: "After 2 weeks (review)",
            labInvestigations: [],
            vitals: {
                bpSystolic: "116",
                bpDiastolic: "72",
                temperature: "98.4",
                heartRate: "82"
            },
            additionalNotes: "Scaling & polishing completed in single sitting. Oral hygiene instructions given. Recall in 6 months."
        },
        writtenRx: [
            {
                id: "wrx-24-a",
                title: "Written Rx",
                description: "Handwritten prescription (24 Jan'26)",
                pdfUrl: WRITTEN_RX_PDF_URL,
                previewImage: WRITTEN_RX_PREVIEW
            }
        ]
    },
    {
        id: "visit-22-jan",
        dateLabel: "22 Jan'26",
        writtenRx: [
            {
                id: "wrx-22-a",
                title: "Written Rx",
                description: "Extraction consent + post-op instructions (22 Jan'26)",
                pdfUrl: WRITTEN_RX_PDF_URL,
                previewImage: WRITTEN_RX_PREVIEW
            }
        ]
    },
    {
        id: "visit-20-jan",
        dateLabel: "20 Jan'26",
        writtenRx: [
            {
                id: "wrx-20-a",
                title: "Written Rx",
                description: "Initial consultation notes (20 Jan'26)",
                pdfUrl: WRITTEN_RX_PDF_URL,
                previewImage: WRITTEN_RX_PREVIEW
            }
        ]
    }
];
function useIsTouchLike() {
    const [touchLike, setTouchLike] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const query = undefined;
        const update = undefined;
    }, []);
    return touchLike;
}
function CopyAffordance({ onCopy, showOnHover = true, hideOnTouch = false, copyHint = "Copy to RxPad", copiedLabel = "Copied to RxPad", className }) {
    const isTouchLike = useIsTouchLike();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const runCopy = ()=>{
        onCopy();
        setCopied(true);
        window.setTimeout(()=>{
            setCopied(false);
        }, 1200);
    };
    const visibilityClass = isTouchLike ? hideOnTouch ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].copyTouchHide : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].copyVisible : showOnHover ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].copyPeek : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].copyVisible;
    const button = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
        type: "button",
        "aria-label": copyHint,
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        onClick: (event)=>{
            event.stopPropagation();
            runCopy();
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].copyBtn, copied ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].copyBtnSuccess : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].copyBtnIdle, visibilityClass, className),
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
            size: 14,
            color: copied ? "var(--tp-success-600)" : "var(--tp-blue-500)",
            variant: copied || hovered ? "Bulk" : "Linear"
        })
    });
    if (isTouchLike) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inlineFlexCenter,
            children: button
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inlineFlexCenter,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                    asChild: true,
                    children: button
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                    side: "top",
                    sideOffset: 4,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tooltipDark,
                    children: copied ? copiedLabel : copyHint
                })
            ]
        })
    });
}
function TapCopyTooltip({ onCopy, copyHint = "Copy to RxPad", copiedLabel = "Copied to RxPad", className, children }) {
    const isTouchLike = useIsTouchLike();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const runCopy = ()=>{
        onCopy();
        setCopied(true);
        window.setTimeout(()=>{
            setCopied(false);
            setOpen(false);
        }, 900);
    };
    if (!isTouchLike) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
        open: open,
        onOpenChange: setOpen,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                asChild: true,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
                    "aria-label": copyHint,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tapTriggerReset, className),
                    onClick: (event)=>{
                        event.stopPropagation();
                        setOpen((prev)=>!prev);
                    },
                    type: "button",
                    children: children
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                align: "start",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tapTooltipPanel,
                collisionPadding: 10,
                side: "top",
                sideOffset: 4,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tapTooltipRow,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tapTooltipText,
                            children: copied ? copiedLabel : copyHint
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tapCopyAction,
                            onClick: (event)=>{
                                event.stopPropagation();
                                runCopy();
                            },
                            type: "button",
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                    size: 12,
                                    color: copied ? "var(--tp-success-600)" : "var(--tp-blue-500)",
                                    variant: copied ? "Bulk" : "Linear"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    children: copied ? "Done" : "Copy to RxPad"
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
function SymptomsIcon() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
        name: "Virus",
        variant: "bulk",
        size: 16,
        color: "var(--tp-violet-400)",
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].medIcon
    });
}
function ExamIcon() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
        name: "medical service",
        variant: "bulk",
        size: 16,
        color: "var(--tp-violet-400)",
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].medIcon
    });
}
function DiagnosisIcon() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
        name: "Diagnosis",
        variant: "bulk",
        size: 16,
        color: "var(--tp-violet-400)",
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].medIcon
    });
}
function PillIcon() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
        name: "Tablets",
        variant: "bulk",
        size: 16,
        color: "var(--tp-violet-400)",
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].medIcon
    });
}
function AdviceIcon() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
        name: "health care",
        variant: "bulk",
        size: 16,
        color: "var(--tp-violet-400)",
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].medIcon
    });
}
function ClockIcon() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__["Calendar2"], {
        size: 16,
        color: "var(--tp-violet-400)",
        variant: "Bulk",
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].medIcon
    });
}
function DateHeader({ dateLabel, expanded, onToggle, onCopyDate, canCopy }) {
    const { headerRef, isStuck } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStickyHeaderState"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ref: headerRef,
        role: "button",
        tabIndex: 0,
        onClick: onToggle,
        onKeyDown: (event)=>{
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onToggle();
            }
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dateHead, expanded ? isStuck ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dateHeadStuck : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dateHeadOpen : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dateHeadCollapsed),
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dateHeadRow,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dateHeadLeft, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].interactiveGroup),
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dateHeadTitle,
                            children: dateLabel
                        }),
                        canCopy ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CopyAffordance, {
                            onCopy: onCopyDate,
                            showOnHover: false,
                            copyHint: `Copy all details from ${dateLabel} to RxPad`,
                            copiedLabel: `${dateLabel} copied to RxPad`
                        }) : null
                    ]
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chevronBox,
                    children: expanded ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareUp$3e$__["ArrowSquareUp"], {
                        color: "var(--tp-slate-500)",
                        size: 18,
                        strokeWidth: 1.5,
                        variant: "Linear"
                    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareDown$3e$__["ArrowSquareDown"], {
                        color: "var(--tp-slate-500)",
                        size: 18,
                        strokeWidth: 1.5,
                        variant: "Linear"
                    })
                })
            ]
        })
    });
}
function RxTabStrip({ activeTab, onSwitch }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tabStripWrap,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tabStripInner,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
                    type: "button",
                    onClick: ()=>onSwitch("digital"),
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tabBtn, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tabBtnLeft, activeTab === "digital" ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tabLabelOn : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tabLabelOff),
                    style: activeTab === "digital" ? {
                        backgroundImage: "linear-gradient(180deg, #6a69ff 0%, #3a39b2 100%)",
                        border: "0.518px solid var(--tp-blue-400)"
                    } : {
                        backgroundImage: "linear-gradient(180.418deg, rgba(255,255,255,0) 0%, rgb(240,240,255) 100%)",
                        border: "0.518px solid var(--tp-slate-200)",
                        borderRight: "none"
                    },
                    children: "Digital Rx"
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
                    type: "button",
                    onClick: ()=>onSwitch("written"),
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tabBtn, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tabBtnRight, activeTab === "written" ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tabLabelOn : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tabLabelOff),
                    style: activeTab === "written" ? {
                        backgroundImage: "linear-gradient(180deg, #6a69ff 0%, #3a39b2 100%)",
                        border: "0.518px solid var(--tp-blue-400)"
                    } : {
                        backgroundImage: "linear-gradient(180.418deg, rgba(255,255,255,0) 0%, rgb(240,240,255) 100%)",
                        border: "0.518px solid var(--tp-slate-200)",
                        borderLeft: "none"
                    },
                    children: "Written Rx"
                })
            ]
        })
    });
}
function ListSection({ icon, title, items, onCopySection, onCopyItem }) {
    const sectionDescriptions = {
        Symptoms: "all symptoms",
        Examination: "all examination findings",
        Diagnosis: "all diagnoses",
        "Medication (Rx)": "all medications"
    };
    const itemDescriptions = {
        Symptoms: "this symptom",
        Examination: "this finding",
        Diagnosis: "this diagnosis",
        "Medication (Rx)": "this medication"
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionBlock,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionHead, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].interactiveGroup),
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconBox16,
                        children: icon
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(TapCopyTooltip, {
                        onCopy: onCopySection,
                        copyHint: `Copy ${sectionDescriptions[title] ?? "all items"} to RxPad`,
                        copiedLabel: `${title} copied to RxPad`,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                            children: title
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CopyAffordance, {
                        onCopy: onCopySection,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pushEnd,
                        showOnHover: true,
                        hideOnTouch: true,
                        copyHint: `Copy ${sectionDescriptions[title] ?? "all items"} to RxPad`,
                        copiedLabel: `${title} copied to RxPad`
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("ul", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listUl,
                children: items.map((item)=>{
                    const normalizedLabel = normalizePointerText(item.label);
                    const normalizedDetail = normalizePointerText(item.detail);
                    const detailParts = splitMetaParts(normalizedDetail);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("li", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listLi, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].interactiveGroup),
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listItemRow,
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(TapCopyTooltip, {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemTapWrap,
                                    copyHint: `Copy ${itemDescriptions[title] ?? "this item"} to RxPad`,
                                    copiedLabel: `${item.label} copied to RxPad`,
                                    onCopy: ()=>onCopyItem(item),
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemLabelBlock,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemLabelStrong,
                                                children: normalizedLabel
                                            }),
                                            detailParts.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemMetaInline,
                                                children: renderMetaInBrackets(detailParts)
                                            }) : null
                                        ]
                                    })
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CopyAffordance, {
                                    onCopy: ()=>onCopyItem(item),
                                    showOnHover: true,
                                    hideOnTouch: true,
                                    copyHint: `Copy ${itemDescriptions[title] ?? "this item"} to RxPad`,
                                    copiedLabel: `${item.label} copied to RxPad`
                                })
                            ]
                        })
                    }, `${title}-${item.label}-${item.detail}`);
                })
            })
        ]
    });
}
function AdviceSection({ advice, onCopy }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionBlock,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionHead, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].interactiveGroup),
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconBox16,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(AdviceIcon, {})
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(TapCopyTooltip, {
                        onCopy: onCopy,
                        copyHint: "Copy all advice to RxPad",
                        copiedLabel: "Advice copied to RxPad",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                            children: "Advice"
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CopyAffordance, {
                        onCopy: onCopy,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pushEnd,
                        showOnHover: true,
                        hideOnTouch: true,
                        copiedLabel: "Advice copied to RxPad"
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(TapCopyTooltip, {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyPl,
                onCopy: onCopy,
                copyHint: "Copy this advice to RxPad",
                copiedLabel: "Advice copied to RxPad",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyTextMuted,
                    children: advice
                })
            })
        ]
    });
}
function FollowUpSection({ followUp, onCopy }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionBlock,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionHead, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].interactiveGroup),
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconBox16,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ClockIcon, {})
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(TapCopyTooltip, {
                        onCopy: onCopy,
                        copyHint: "Copy all follow-up details to RxPad",
                        copiedLabel: "Follow-up copied to RxPad",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                            children: "Follow Up"
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CopyAffordance, {
                        onCopy: onCopy,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pushEnd,
                        showOnHover: true,
                        hideOnTouch: true,
                        copiedLabel: "Follow-up copied to RxPad"
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(TapCopyTooltip, {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyPl,
                onCopy: onCopy,
                copyHint: "Copy this follow-up to RxPad",
                copiedLabel: "Follow-up copied to RxPad",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyTextMuted,
                    children: followUp
                })
            })
        ]
    });
}
function DentalToothBlock({ block }) {
    const hasRows = block.treatmentHistory.length > 0 || block.findings.length > 0 || block.procedures.length > 0 || Boolean(block.overallToothNote?.trim());
    if (!hasRows) return null;
    const formatStructuredLine = (line)=>{
        const meta = formatBracketParts([
            line.surface,
            line.since,
            line.date,
            line.status,
            line.notes
        ]);
        return {
            title: normalizePointerText(line.name),
            metaParts: meta ? splitMetaParts(meta) : []
        };
    };
    const sectionRows = [
        {
            label: "Treatment History",
            values: block.treatmentHistory.map(formatStructuredLine)
        },
        {
            label: "Findings",
            values: block.findings.map(formatStructuredLine)
        },
        {
            label: "Procedures",
            values: block.procedures.map(formatStructuredLine)
        },
        {
            label: "Overall Tooth Notes",
            values: block.overallToothNote?.trim() ? [
                {
                    title: normalizePointerText(block.overallToothNote),
                    metaParts: []
                }
            ] : []
        }
    ].filter((row)=>row.values.length > 0);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionBlock,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionHead,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconBox16,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$ToothIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToothIcon"], {
                            size: 14,
                            color: "var(--tp-violet-400)",
                            variant: "Bulk"
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                        children: block.toothLabel
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("ul", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dentalUl,
                children: sectionRows.map((row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("li", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dentalLi,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dentalLabel,
                                children: [
                                    row.label,
                                    ":"
                                ]
                            }),
                            " ",
                            row.values.map((value, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                    children: [
                                        index > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dentalComma,
                                            children: ", "
                                        }) : null,
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dentalValue,
                                            children: value.title
                                        }),
                                        renderMetaInBrackets(value.metaParts)
                                    ]
                                }, `${row.label}-${index}`))
                        ]
                    }, `${block.toothLabel}-${row.label}`))
            })
        ]
    });
}
function WrittenRxPreviewCard({ document, onOpen, onPreview, onDownload, onPrint }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("button", {
        type: "button",
        onClick: ()=>onOpen(document),
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].writtenBtn,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].writtenThumb,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("img", {
                    alt: document.title,
                    src: document.previewImage,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].writtenImg
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].writtenFooter,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].writtenTextCol,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].writtenTitle,
                                children: document.title
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].writtenDesc,
                                children: document.description
                            })
                        ]
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                asChild: true,
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    role: "button",
                                    tabIndex: 0,
                                    onClick: (event)=>event.stopPropagation(),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].menuTriggerIcon,
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                        color: "var(--tp-slate-500)",
                                        size: 16,
                                        strokeWidth: 1.5
                                    })
                                })
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                align: "end",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].menuNarrow,
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                        onSelect: (event)=>{
                                            event.preventDefault();
                                            onPreview(document);
                                        },
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                color: "var(--tp-violet-500)",
                                                size: 14,
                                                variant: "Bulk"
                                            }),
                                            "Preview"
                                        ]
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                        onSelect: (event)=>{
                                            event.preventDefault();
                                            onDownload(document);
                                        },
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Import$3e$__["Import"], {
                                                color: "var(--tp-violet-500)",
                                                size: 14,
                                                variant: "Bulk"
                                            }),
                                            "Download"
                                        ]
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                        onSelect: (event)=>{
                                            event.preventDefault();
                                            onPrint(document);
                                        },
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                color: "var(--tp-violet-500)",
                                                size: 14,
                                                variant: "Bulk"
                                            }),
                                            "Print"
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function PastVisitsContent() {
    const [expandedState, setExpandedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>Object.fromEntries(PAST_VISITS.map((entry, index)=>[
                entry.id,
                index === 0
            ])));
    const [tabState, setTabState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>Object.fromEntries(PAST_VISITS.map((entry)=>[
                entry.id,
                entry.digitalRx ? "digital" : "written"
            ])));
    const [activeDocument, setActiveDocument] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [snackbar, setSnackbar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [planProcs, setPlanProcs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const patientId = readPatientIdFromUrl();
        const load = ()=>setPlanProcs((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPlanProcedures"])(patientId));
        load();
        window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLAN_PROCEDURES_UPDATED_EVENT"], load);
        window.addEventListener("storage", load);
        return ()=>{
            window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLAN_PROCEDURES_UPDATED_EVENT"], load);
            window.removeEventListener("storage", load);
        };
    }, []);
    const planProcedureVisit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>buildPlanProcedureVisit(planProcs), [
        planProcs
    ]);
    const orderedVisits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>planProcedureVisit ? [
            planProcedureVisit,
            ...PAST_VISITS
        ] : PAST_VISITS, [
        planProcedureVisit
    ]);
    const showCopySnackbar = (message)=>{
        setSnackbar({
            id: Date.now(),
            message
        });
    };
    const openDocument = (dateLabel, document)=>{
        setActiveDocument({
            dateLabel,
            document
        });
    };
    const handleDownload = (doc)=>{
        const anchor = window.document.createElement("a");
        anchor.href = doc.pdfUrl;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.download = `${doc.title.toLowerCase().replace(/\\s+/g, "-")}.pdf`;
        anchor.click();
        showCopySnackbar("Written Rx download started");
    };
    const handlePrint = (doc)=>{
        const printWindow = window.open(doc.pdfUrl, "_blank", "noopener,noreferrer");
        if (printWindow) {
            printWindow.focus();
            window.setTimeout(()=>{
                try {
                    printWindow.print();
                } catch  {
                // no-op
                }
            }, 500);
            showCopySnackbar("Opened print view for written Rx");
        }
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollFlex,
                "data-sticky-scroll-root": "true",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].innerStack,
                    children: orderedVisits.map((entry)=>{
                        const expanded = entry.isProcedureTag ? expandedState[entry.id] ?? true : Boolean(expandedState[entry.id]);
                        const hasDigital = Boolean(entry.digitalRx);
                        const hasWritten = entry.writtenRx.length > 0;
                        const activeTab = tabState[entry.id] ?? (hasDigital ? "digital" : "written");
                        const showDigital = expanded && hasDigital && activeTab === "digital";
                        const showWritten = expanded && hasWritten && (!hasDigital || activeTab === "written");
                        const diagnosisItems = entry.digitalRx ? entry.digitalRx.diagnoses : [];
                        const medicationItems = entry.digitalRx ? entry.digitalRx.medications.map((item)=>({
                                label: normalizePointerText(item.row.medicine || item.label),
                                detail: formatMedicationDetail(item)
                            })) : [];
                        const dentalToothBlocks = (entry.digitalRx?.dentalExamination ?? []).filter((block)=>block.treatmentHistory.length > 0 || block.findings.length > 0 || block.procedures.length > 0 || Boolean(block.overallToothNote?.trim()));
                        const hasClinicalContent = Boolean(entry.digitalRx && (entry.digitalRx.symptoms.length > 0 || entry.digitalRx.examinations.length > 0 || diagnosisItems.length > 0 || medicationItems.length > 0 || entry.digitalRx.labInvestigations.length > 0 || Boolean(entry.digitalRx.advice?.trim()) || Boolean(entry.digitalRx.followUp?.trim())));
                        const hasDentalContent = dentalToothBlocks.length > 0;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].visitCard,
                            style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tpSectionCardStyle"],
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DateHeader, {
                                    dateLabel: entry.dateLabel,
                                    expanded: expanded,
                                    canCopy: hasDigital,
                                    onToggle: ()=>{
                                        setExpandedState((prev)=>({
                                                ...prev,
                                                [entry.id]: !prev[entry.id]
                                            }));
                                    },
                                    onCopyDate: ()=>showCopySnackbar(`${entry.dateLabel} details added successfully to RxPad`)
                                }),
                                entry.isProcedureTag ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: {
                                        padding: "0 14px 6px"
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                        style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            borderRadius: 5,
                                            background: "rgba(139,92,246,0.12)",
                                            color: "#7c3aed",
                                            fontSize: 10.5,
                                            fontWeight: 700,
                                            letterSpacing: 0.3,
                                            textTransform: "uppercase",
                                            padding: "2px 7px"
                                        },
                                        children: "Procedure"
                                    })
                                }) : null,
                                expanded ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        hasDigital && hasWritten ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(RxTabStrip, {
                                            activeTab: activeTab,
                                            onSwitch: (tab)=>{
                                                setTabState((prev)=>({
                                                        ...prev,
                                                        [entry.id]: tab
                                                    }));
                                            }
                                        }) : null,
                                        showDigital && entry.digitalRx ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                entry.digitalRx.symptoms.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ListSection, {
                                                    icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(SymptomsIcon, {}),
                                                    title: "Symptoms",
                                                    items: entry.digitalRx.symptoms,
                                                    onCopySection: ()=>showCopySnackbar("Symptoms added successfully to RxPad"),
                                                    onCopyItem: (item)=>showCopySnackbar(`${item.label} symptom added successfully to RxPad`)
                                                }) : null,
                                                entry.digitalRx.examinations.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ListSection, {
                                                    icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ExamIcon, {}),
                                                    title: "Examination",
                                                    items: entry.digitalRx.examinations,
                                                    onCopySection: ()=>showCopySnackbar("Examination findings added successfully to RxPad"),
                                                    onCopyItem: (item)=>showCopySnackbar(`${item.label} finding added successfully to RxPad`)
                                                }) : null,
                                                diagnosisItems.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ListSection, {
                                                    icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DiagnosisIcon, {}),
                                                    title: "Diagnosis",
                                                    items: diagnosisItems,
                                                    onCopySection: ()=>showCopySnackbar("Diagnoses added successfully to RxPad"),
                                                    onCopyItem: (item)=>showCopySnackbar(`${item.label} diagnosis added successfully to RxPad`)
                                                }) : null,
                                                entry.digitalRx.labInvestigations.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ListSection, {
                                                    icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DiagnosisIcon, {}),
                                                    title: "Lab Investigation",
                                                    items: entry.digitalRx.labInvestigations.map((item)=>({
                                                            label: item,
                                                            detail: ""
                                                        })),
                                                    onCopySection: ()=>showCopySnackbar("Lab investigations added successfully to RxPad"),
                                                    onCopyItem: (item)=>showCopySnackbar(`${item.label} added successfully to RxPad`)
                                                }) : null,
                                                medicationItems.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ListSection, {
                                                    icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(PillIcon, {}),
                                                    title: "Medication (Rx)",
                                                    items: medicationItems,
                                                    onCopySection: ()=>showCopySnackbar("Medications added successfully to RxPad"),
                                                    onCopyItem: (item)=>showCopySnackbar(`${item.label} medication added successfully to RxPad`)
                                                }) : null,
                                                hasDentalContent ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dentalStack,
                                                    children: dentalToothBlocks.map((block)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DentalToothBlock, {
                                                            block: block
                                                        }, `${entry.id}-${block.toothLabel}`))
                                                }) : null,
                                                entry.digitalRx.advice.trim() ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(AdviceSection, {
                                                    advice: entry.digitalRx.advice,
                                                    onCopy: ()=>showCopySnackbar("Advice added successfully to RxPad")
                                                }) : null,
                                                entry.digitalRx.followUp.trim() ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(FollowUpSection, {
                                                    followUp: entry.digitalRx.followUp,
                                                    onCopy: ()=>showCopySnackbar("Follow-up added successfully to RxPad")
                                                }) : null,
                                                !hasClinicalContent && !hasDentalContent ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyClinical,
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyClinicalText,
                                                        children: "No clinical or dental examination details available for this visit."
                                                    })
                                                }) : null
                                            ]
                                        }) : null,
                                        showWritten ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].writtenStack,
                                            children: entry.writtenRx.map((document)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(WrittenRxPreviewCard, {
                                                    document: document,
                                                    onOpen: (selectedDocument)=>openDocument(entry.dateLabel, selectedDocument),
                                                    onPreview: (selectedDocument)=>{
                                                        openDocument(entry.dateLabel, selectedDocument);
                                                        showCopySnackbar("Opened written Rx preview");
                                                    },
                                                    onDownload: handleDownload,
                                                    onPrint: handlePrint
                                                }, document.id))
                                        }) : null
                                    ]
                                }) : null
                            ]
                        }, entry.id);
                    })
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPDrawer"], {
                open: Boolean(activeDocument),
                onOpenChange: (open)=>{
                    if (!open) setActiveDocument(null);
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPDrawerContent"], {
                    side: "right",
                    size: "xl",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].drawerSheet,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPDrawerHeader"], {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].drawerHeader,
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPDrawerTitle"], {
                                            children: activeDocument?.document.title ?? "Written Rx PDF"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPDrawerDescription"], {
                                            children: activeDocument ? `${activeDocument.dateLabel} • ${activeDocument.document.description}` : ""
                                        })
                                    ]
                                }),
                                activeDocument ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].drawerActions,
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                                            type: "button",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].drawerActionBtn,
                                            onClick: ()=>showCopySnackbar("Preview is open"),
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    color: "currentColor",
                                                    size: 14,
                                                    strokeWidth: 1.5,
                                                    variant: "Linear"
                                                }),
                                                "Preview"
                                            ]
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                                            type: "button",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].drawerActionBtn,
                                            onClick: ()=>handleDownload(activeDocument.document),
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Import$3e$__["Import"], {
                                                    color: "currentColor",
                                                    size: 14,
                                                    strokeWidth: 1.5,
                                                    variant: "Linear"
                                                }),
                                                "Download"
                                            ]
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                                            type: "button",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].drawerActionBtn,
                                            onClick: ()=>handlePrint(activeDocument.document),
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                    color: "currentColor",
                                                    size: 14,
                                                    strokeWidth: 1.5,
                                                    variant: "Linear"
                                                }),
                                                "Print"
                                            ]
                                        })
                                    ]
                                }) : null
                            ]
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pdfPane,
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("object", {
                                data: activeDocument?.document.pdfUrl,
                                type: "application/pdf",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pdfObject,
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pdfFallback,
                                    children: [
                                        activeDocument ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("img", {
                                            alt: activeDocument.document.title,
                                            src: activeDocument.document.previewImage,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pdfFallbackImg
                                        }) : null,
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pdfFallbackText,
                                            children: "PDF preview unavailable. Use a browser with PDF support."
                                        })
                                    ]
                                })
                            })
                        })
                    ]
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPSnackbar"], {
                open: Boolean(snackbar),
                message: snackbar?.message ?? "",
                severity: "success",
                autoHideDuration: 1800,
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center"
                },
                onClose: (_, reason)=>{
                    if (reason === "clickaway") return;
                    setSnackbar(null);
                }
            }, snackbar?.id ?? 0)
        ]
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/today-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LAB_PRIMARY_DATE_LABEL",
    ()=>LAB_PRIMARY_DATE_LABEL,
    "LAB_PRIMARY_ROWS",
    ()=>LAB_PRIMARY_ROWS,
    "VITALS_PRIMARY_DATE_LABEL",
    ()=>VITALS_PRIMARY_DATE_LABEL,
    "VITALS_PRIMARY_ROWS",
    ()=>VITALS_PRIMARY_ROWS
]);
const VITALS_PRIMARY_DATE_LABEL = "27 Jan'26";
const VITALS_PRIMARY_ROWS = [
    {
        label: "Temperature",
        unit: "Frh",
        value: "95"
    },
    {
        label: "Pulse",
        unit: "/min",
        value: "68"
    },
    {
        label: "Resp. Rate",
        unit: "/min",
        value: "18"
    },
    {
        label: "Systolic",
        unit: "mmhg",
        value: "120"
    },
    {
        label: "Diastolic",
        unit: "mmhg",
        value: "75"
    },
    {
        label: "SpO2",
        unit: "%",
        value: "98"
    },
    {
        label: "Height",
        unit: "cms",
        value: "172"
    },
    {
        label: "Weight",
        unit: "kgs",
        value: "68"
    },
    {
        label: "BMI",
        unit: "kg/m²",
        value: "23.0"
    },
    {
        label: "BMR",
        unit: "kcals",
        value: "1680"
    },
    {
        label: "BSA",
        unit: "m²",
        value: "1.82"
    }
];
const LAB_PRIMARY_DATE_LABEL = "27 Jan'26";
const LAB_PRIMARY_ROWS = [
    {
        label: "Haemoglobin",
        unit: "(g/dL)",
        value: "11.2"
    },
    {
        label: "Neutrophils",
        unit: "(%)",
        value: "62"
    },
    {
        label: "WBC Count",
        unit: "(cells/mm³)",
        value: "7800"
    },
    {
        label: "TSH",
        unit: "(mIU/L)",
        value: "5.2",
        abnormal: true
    },
    {
        label: "T3",
        unit: "(ng/dL)",
        value: "102"
    },
    {
        label: "Iron, Serum",
        unit: "(µg/dL)",
        value: "76"
    },
    {
        label: "UIBC",
        unit: "(µg/dL)",
        value: "365",
        abnormal: true
    },
    {
        label: "TIBC",
        unit: "(µg/dL)",
        value: "441"
    },
    {
        label: "Vitamin D",
        unit: "(ng/mL)",
        value: "20",
        abnormal: true
    },
    {
        label: "Calcium, Total",
        unit: "(mg/dL)",
        value: "9.4"
    },
    {
        label: "Phosphorus",
        unit: "(mg/dL)",
        value: "4.0"
    },
    {
        label: "Magnesium",
        unit: "(mg/dL)",
        value: "2.2"
    },
    {
        label: "Cholesterol, Total",
        unit: "(mg/dL)",
        value: "220",
        abnormal: true
    },
    {
        label: "Triglycerides",
        unit: "(mg/dL)",
        value: "150"
    },
    {
        label: "HDL",
        unit: "(mg/dL)",
        value: "45"
    },
    {
        label: "LDL",
        unit: "(mg/dL)",
        value: "130",
        abnormal: true
    },
    {
        label: "Glucose",
        unit: "(mg/dL)",
        value: "116",
        abnormal: true
    }
];
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/sidebarContentLayout.module.scss [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "accBody": "sidebarContentLayout-module-scss-module__Bb8Woa__accBody",
  "accCard": "sidebarContentLayout-module-scss-module__Bb8Woa__accCard",
  "accChevron": "sidebarContentLayout-module-scss-module__Bb8Woa__accChevron",
  "accHeader": "sidebarContentLayout-module-scss-module__Bb8Woa__accHeader",
  "accHeaderCollapsed": "sidebarContentLayout-module-scss-module__Bb8Woa__accHeaderCollapsed",
  "accHeaderInner": "sidebarContentLayout-module-scss-module__Bb8Woa__accHeaderInner",
  "accHeaderRoundedOpen": "sidebarContentLayout-module-scss-module__Bb8Woa__accHeaderRoundedOpen",
  "accHeaderStuck": "sidebarContentLayout-module-scss-module__Bb8Woa__accHeaderStuck",
  "accTitle": "sidebarContentLayout-module-scss-module__Bb8Woa__accTitle",
  "badgePrimigravida": "sidebarContentLayout-module-scss-module__Bb8Woa__badgePrimigravida",
  "blockBody": "sidebarContentLayout-module-scss-module__Bb8Woa__blockBody",
  "blockBodyBreak": "sidebarContentLayout-module-scss-module__Bb8Woa__blockBodyBreak",
  "blockPad": "sidebarContentLayout-module-scss-module__Bb8Woa__blockPad",
  "blockTitle": "sidebarContentLayout-module-scss-module__Bb8Woa__blockTitle",
  "bodyPara": "sidebarContentLayout-module-scss-module__Bb8Woa__bodyPara",
  "chipsRow": "sidebarContentLayout-module-scss-module__Bb8Woa__chipsRow",
  "detailPipe": "sidebarContentLayout-module-scss-module__Bb8Woa__detailPipe",
  "divider": "sidebarContentLayout-module-scss-module__Bb8Woa__divider",
  "emptyBody": "sidebarContentLayout-module-scss-module__Bb8Woa__emptyBody",
  "emptyCta": "sidebarContentLayout-module-scss-module__Bb8Woa__emptyCta",
  "emptyHeading": "sidebarContentLayout-module-scss-module__Bb8Woa__emptyHeading",
  "emptyIconWrap": "sidebarContentLayout-module-scss-module__Bb8Woa__emptyIconWrap",
  "emptyRoot": "sidebarContentLayout-module-scss-module__Bb8Woa__emptyRoot",
  "emptyTextStack": "sidebarContentLayout-module-scss-module__Bb8Woa__emptyTextStack",
  "followBorder": "sidebarContentLayout-module-scss-module__Bb8Woa__followBorder",
  "followFieldRow": "sidebarContentLayout-module-scss-module__Bb8Woa__followFieldRow",
  "followInputClip": "sidebarContentLayout-module-scss-module__Bb8Woa__followInputClip",
  "followInputInner": "sidebarContentLayout-module-scss-module__Bb8Woa__followInputInner",
  "followInputShell": "sidebarContentLayout-module-scss-module__Bb8Woa__followInputShell",
  "followPage": "sidebarContentLayout-module-scss-module__Bb8Woa__followPage",
  "followPlaceholder": "sidebarContentLayout-module-scss-module__Bb8Woa__followPlaceholder",
  "followStack": "sidebarContentLayout-module-scss-module__Bb8Woa__followStack",
  "fullColumn": "sidebarContentLayout-module-scss-module__Bb8Woa__fullColumn",
  "givenLi": "sidebarContentLayout-module-scss-module__Bb8Woa__givenLi",
  "givenList": "sidebarContentLayout-module-scss-module__Bb8Woa__givenList",
  "growthLabel": "sidebarContentLayout-module-scss-module__Bb8Woa__growthLabel",
  "growthRow": "sidebarContentLayout-module-scss-module__Bb8Woa__growthRow",
  "growthUnit": "sidebarContentLayout-module-scss-module__Bb8Woa__growthUnit",
  "growthValue": "sidebarContentLayout-module-scss-module__Bb8Woa__growthValue",
  "historyCardBody": "sidebarContentLayout-module-scss-module__Bb8Woa__historyCardBody",
  "historyDetail": "sidebarContentLayout-module-scss-module__Bb8Woa__historyDetail",
  "historyName": "sidebarContentLayout-module-scss-module__Bb8Woa__historyName",
  "innerStack": "sidebarContentLayout-module-scss-module__Bb8Woa__innerStack",
  "innerStackCenter": "sidebarContentLayout-module-scss-module__Bb8Woa__innerStackCenter",
  "labLabel": "sidebarContentLayout-module-scss-module__Bb8Woa__labLabel",
  "labLeft": "sidebarContentLayout-module-scss-module__Bb8Woa__labLeft",
  "labRow": "sidebarContentLayout-module-scss-module__Bb8Woa__labRow",
  "labRowInner": "sidebarContentLayout-module-scss-module__Bb8Woa__labRowInner",
  "labUnit": "sidebarContentLayout-module-scss-module__Bb8Woa__labUnit",
  "labValue": "sidebarContentLayout-module-scss-module__Bb8Woa__labValue",
  "labValueAbnormal": "sidebarContentLayout-module-scss-module__Bb8Woa__labValueAbnormal",
  "notesHint": "sidebarContentLayout-module-scss-module__Bb8Woa__notesHint",
  "overflowScroll": "sidebarContentLayout-module-scss-module__Bb8Woa__overflowScroll",
  "pageRoot": "sidebarContentLayout-module-scss-module__Bb8Woa__pageRoot",
  "pageRootStart": "sidebarContentLayout-module-scss-module__Bb8Woa__pageRootStart",
  "quickChip": "sidebarContentLayout-module-scss-module__Bb8Woa__quickChip",
  "quickChipClip": "sidebarContentLayout-module-scss-module__Bb8Woa__quickChipClip",
  "quickChipInner": "sidebarContentLayout-module-scss-module__Bb8Woa__quickChipInner",
  "quickChipLabel": "sidebarContentLayout-module-scss-module__Bb8Woa__quickChipLabel",
  "quickChipOutline": "sidebarContentLayout-module-scss-module__Bb8Woa__quickChipOutline",
  "scrollFlex": "sidebarContentLayout-module-scss-module__Bb8Woa__scrollFlex",
  "seeChartBar": "sidebarContentLayout-module-scss-module__Bb8Woa__seeChartBar",
  "seeChartCenter": "sidebarContentLayout-module-scss-module__Bb8Woa__seeChartCenter",
  "seeChartChevron": "sidebarContentLayout-module-scss-module__Bb8Woa__seeChartChevron",
  "seeChartHit": "sidebarContentLayout-module-scss-module__Bb8Woa__seeChartHit",
  "seeChartInner": "sidebarContentLayout-module-scss-module__Bb8Woa__seeChartInner",
  "seeChartLabel": "sidebarContentLayout-module-scss-module__Bb8Woa__seeChartLabel",
  "seeChartOutline": "sidebarContentLayout-module-scss-module__Bb8Woa__seeChartOutline",
  "stack16": "sidebarContentLayout-module-scss-module__Bb8Woa__stack16",
  "svgShrink": "sidebarContentLayout-module-scss-module__Bb8Woa__svgShrink",
  "textareaNotes": "sidebarContentLayout-module-scss-module__Bb8Woa__textareaNotes",
  "vaccineMedium": "sidebarContentLayout-module-scss-module__Bb8Woa__vaccineMedium",
  "vaccineMeta": "sidebarContentLayout-module-scss-module__Bb8Woa__vaccineMeta",
  "vitalsLabel": "sidebarContentLayout-module-scss-module__Bb8Woa__vitalsLabel",
  "vitalsRow": "sidebarContentLayout-module-scss-module__Bb8Woa__vitalsRow",
  "vitalsUnit": "sidebarContentLayout-module-scss-module__Bb8Woa__vitalsUnit",
  "vitalsValue": "sidebarContentLayout-module-scss-module__Bb8Woa__vitalsValue",
  "warningText": "sidebarContentLayout-module-scss-module__Bb8Woa__warningText",
});
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/VitalsContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VitalsContent",
    ()=>VitalsContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
/**
 * Vitals content panel with per-date accordion.
 * Each date can expand/collapse and provides mock values.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareDown$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowSquareDown.js [app-ssr] (ecmascript) <export default as ArrowSquareDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareUp$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowSquareUp.js [app-ssr] (ecmascript) <export default as ArrowSquareUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/tokens.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$today$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/today-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/sidebarContentLayout.module.scss [app-ssr] (css module)");
;
;
;
;
;
;
;
;
const VITALS_BY_DATE = [
    {
        id: "today-27",
        dateLabel: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$today$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VITALS_PRIMARY_DATE_LABEL"],
        rows: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$today$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VITALS_PRIMARY_ROWS"]
    },
    {
        id: "d-26",
        dateLabel: "26 Jan'26",
        rows: [
            {
                label: "Temperature",
                unit: "Frh",
                value: "99.2"
            },
            {
                label: "Pulse",
                unit: "/min",
                value: "84"
            },
            {
                label: "Resp. Rate",
                unit: "/min",
                value: "20"
            },
            {
                label: "Systolic",
                unit: "mmhg",
                value: "124"
            },
            {
                label: "Diastolic",
                unit: "mmhg",
                value: "78"
            },
            {
                label: "SpO2",
                unit: "%",
                value: "97"
            },
            {
                label: "Weight",
                unit: "kgs",
                value: "68.4"
            },
            {
                label: "BMI",
                unit: "kg/m²",
                value: "23.1"
            }
        ]
    },
    {
        id: "d-24",
        dateLabel: "24 Jan'26",
        rows: [
            {
                label: "Temperature",
                unit: "Frh",
                value: "98.6"
            },
            {
                label: "Pulse",
                unit: "/min",
                value: "79"
            },
            {
                label: "Resp. Rate",
                unit: "/min",
                value: "18"
            },
            {
                label: "Systolic",
                unit: "mmhg",
                value: "118"
            },
            {
                label: "Diastolic",
                unit: "mmhg",
                value: "74"
            },
            {
                label: "SpO2",
                unit: "%",
                value: "99"
            },
            {
                label: "Weight",
                unit: "kgs",
                value: "68.0"
            },
            {
                label: "BMI",
                unit: "kg/m²",
                value: "22.9"
            }
        ]
    },
    {
        id: "d-22",
        dateLabel: "22 Jan'26",
        rows: [
            {
                label: "Temperature",
                unit: "Frh",
                value: "98.4"
            },
            {
                label: "Pulse",
                unit: "/min",
                value: "76"
            },
            {
                label: "Resp. Rate",
                unit: "/min",
                value: "17"
            },
            {
                label: "Systolic",
                unit: "mmhg",
                value: "116"
            },
            {
                label: "Diastolic",
                unit: "mmhg",
                value: "72"
            },
            {
                label: "SpO2",
                unit: "%",
                value: "99"
            },
            {
                label: "Weight",
                unit: "kgs",
                value: "67.8"
            },
            {
                label: "BMI",
                unit: "kg/m²",
                value: "22.8"
            }
        ]
    },
    {
        id: "d-20",
        dateLabel: "20 Jan'26",
        rows: [
            {
                label: "Temperature",
                unit: "Frh",
                value: "98.5"
            },
            {
                label: "Pulse",
                unit: "/min",
                value: "80"
            },
            {
                label: "Resp. Rate",
                unit: "/min",
                value: "18"
            },
            {
                label: "Systolic",
                unit: "mmhg",
                value: "119"
            },
            {
                label: "Diastolic",
                unit: "mmhg",
                value: "75"
            },
            {
                label: "SpO2",
                unit: "%",
                value: "98"
            },
            {
                label: "Weight",
                unit: "kgs",
                value: "68.2"
            },
            {
                label: "BMI",
                unit: "kg/m²",
                value: "23.0"
            }
        ]
    }
];
function VitalsDateCard({ block, expanded, onToggle }) {
    const { headerRef, isStuck } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStickyHeaderState"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accCard,
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tpSectionCardStyle"],
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
                type: "button",
                ref: headerRef,
                onClick: onToggle,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeader, expanded ? isStuck ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderStuck : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderRoundedOpen : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderCollapsed),
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderInner,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accTitle,
                            children: block.dateLabel
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accChevron,
                            children: expanded ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareUp$3e$__["ArrowSquareUp"], {
                                color: "var(--tp-slate-500)",
                                size: 18,
                                strokeWidth: 1.5,
                                variant: "Linear"
                            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareDown$3e$__["ArrowSquareDown"], {
                                color: "var(--tp-slate-500)",
                                size: 18,
                                strokeWidth: 1.5,
                                variant: "Linear"
                            })
                        })
                    ]
                })
            }),
            expanded ? block.rows.map((row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].vitalsRow,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].vitalsLabel,
                            children: [
                                row.label,
                                " ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].vitalsUnit,
                                    children: [
                                        "(",
                                        row.unit,
                                        ")"
                                    ]
                                })
                            ]
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].vitalsValue,
                            children: row.value
                        })
                    ]
                }, `${block.id}-${row.label}`)) : null
        ]
    });
}
function VitalsContent() {
    const [expandedByDate, setExpandedByDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        "today-27": true,
        "d-26": false,
        "d-24": false,
        "d-22": false,
        "d-20": false
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pageRoot,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButton"], {
                label: "Add/Edit Details",
                icon: "plus"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollFlex,
                "data-sticky-scroll-root": "true",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].innerStack,
                    children: VITALS_BY_DATE.map((block)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(VitalsDateCard, {
                            block: block,
                            expanded: Boolean(expandedByDate[block.id]),
                            onToggle: ()=>setExpandedByDate((prev)=>({
                                        ...prev,
                                        [block.id]: !prev[block.id]
                                    }))
                        }, block.id))
                })
            })
        ]
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/HistoryContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HistoryContent",
    ()=>HistoryContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
/**
 * Medical History content panel — always-open section cards.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/sidebarContentLayout.module.scss [app-ssr] (css module)");
;
;
;
;
const SECTIONS = [
    {
        id: "medical",
        title: "Medical Conditions",
        items: [
            {
                name: "Type 2 Diabetes",
                detail: "Since: 2 years | Status: Active | HbA1c (27 Jan'26): 7.4%"
            },
            {
                name: "Hypertension",
                detail: "Since: 1 year | Status: Controlled | Home BP log reviewed"
            },
            {
                name: "Hypothyroidism",
                detail: "Since: 8 months | Status: Stable | TSH recheck advised in 6 weeks"
            }
        ]
    },
    {
        id: "allergies",
        title: "Allergies",
        items: [
            {
                name: "Dust Mite Allergy",
                detail: "Since: 1 year | Status: Active | Trigger: sweeping/closed spaces"
            },
            {
                name: "NSAID Sensitivity",
                detail: "Status: Suspected | Reaction: gastric discomfort"
            }
        ]
    },
    {
        id: "family",
        title: "Family History",
        items: [
            {
                name: "Diabetes Mellitus",
                detail: "Relatives: Father, Paternal Uncle | Early-onset pattern in family"
            },
            {
                name: "Cardiovascular Disease",
                detail: "Relative: Maternal Grandfather | MI at 62 years"
            }
        ]
    },
    {
        id: "surgery",
        title: "Surgery History",
        items: [
            {
                name: "Appendectomy",
                detail: "Date: 20 Nov 2018 | Hospital: City General Hospital | Outcome: Uneventful recovery"
            },
            {
                name: "Impacted Wisdom Tooth Extraction",
                detail: "Date: 14 Jul 2023 | Facility: TP Dental Care | Outcome: Healed well in 1 week"
            }
        ]
    },
    {
        id: "dental-history",
        title: "Dental History",
        items: [
            {
                name: "Upper Right Quadrant (UR)",
                detail: "Findings: Generalized plaque, cervical sensitivity | Procedures: Quadrant scaling and root planing (Completed)"
            },
            {
                name: "Upper Left Quadrant (UL)",
                detail: "Findings: Early caries (26, 27), mild gingival inflammation | Procedures: Fluoride varnish + oral prophylaxis (Planned)"
            },
            {
                name: "Lower Arches (LR/LL)",
                detail: "Findings: Calculus deposits in molar region, food impaction | Procedures: Full-mouth scaling and polishing (In Progress)"
            },
            {
                name: "Full Mouth Summary",
                detail: "Primary Diagnosis: Chronic generalized gingivitis | Advice: 3-month periodontal maintenance recall"
            }
        ]
    },
    {
        id: "lifestyle",
        title: "Lifestyle",
        items: [
            {
                name: "Smoking",
                detail: "6 cigarettes/day | Counselling started | Quit target: 3 months"
            },
            {
                name: "Exercise",
                detail: "Walks 25 minutes/day | 5 days/week"
            },
            {
                name: "Sleep",
                detail: "Average 6 hours/night | Irregular bedtime on weekdays"
            }
        ]
    }
];
function renderDetail(detail) {
    const parts = detail.split("|").map((part)=>part.trim()).filter(Boolean);
    if (parts.length <= 1) return detail;
    return parts.map((part, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
            children: [
                index > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailPipe,
                    children: " | "
                }) : null,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: part
                })
            ]
        }, `${part}-${index}`));
}
function HistoryCard({ title, items }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionCard"], {
        title: title,
        hideChevron: true,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].historyCardBody,
            children: items.map((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].historyName,
                            children: item.name
                        }),
                        item.detail ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].historyDetail,
                            children: renderDetail(item.detail)
                        }) : null
                    ]
                }, `${title}-${item.name}`))
        })
    });
}
function HistoryContent() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pageRoot,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButton"], {
                label: "Add/Edit Details",
                icon: "plus"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].overflowScroll,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].innerStack,
                    children: SECTIONS.map((section)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(HistoryCard, {
                            title: section.title,
                            items: section.items
                        }, section.id))
                })
            })
        ]
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/GynecHistoryContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GynecHistoryContent",
    ()=>GynecHistoryContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
/**
 * Gynec History content panel — always-open section cards.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/sidebarContentLayout.module.scss [app-ssr] (css module)");
;
;
;
;
const GYNEC_SECTIONS = [
    {
        id: "menarche",
        title: "Menarche",
        content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyPara,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "Age at: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "12 years "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "Notes: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "Menarche reported at expected age with no early-cycle complications"
                })
            ]
        })
    },
    {
        id: "cycle",
        title: "Cycle",
        content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyPara,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "Type: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "Regular "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "Cycle Interval: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "28 days "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "Notes: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "Last three cycles regular, no missed cycle in past 6 months"
                })
            ]
        })
    },
    {
        id: "flow",
        title: "Flow",
        content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyPara,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "Volume: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "Moderate "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "No of pads per day: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "3 "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "Notes: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "No passage of clots reported in recent cycles"
                })
            ]
        })
    },
    {
        id: "pain",
        title: "Pain",
        content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyPara,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "Level: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "Mild dysmenorrhea "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "Status: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "Intermittent "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "Notes: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "Improves with hydration and over-the-counter analgesics"
                })
            ]
        })
    },
    {
        id: "lifecycle",
        title: "Lifecycle Hormonal Changes",
        content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyPara,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "LA at: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "Not attained "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "LA type: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "NA "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                    children: "LA Notes: "
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: "No menopausal symptoms currently reported"
                })
            ]
        })
    },
    {
        id: "notes",
        title: "Notes",
        content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyPara,
            children: "Patient reports good medication adherence and tracks cycles on mobile app. No intermenstrual bleeding or post-coital bleeding reported in recent visits."
        })
    }
];
function GynecHistoryContent() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pageRoot,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButton"], {
                label: "Add/Edit Details",
                icon: "plus"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionScrollArea"], {
                children: GYNEC_SECTIONS.map((section)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionCard"], {
                        title: section.title,
                        hideChevron: true,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContentRow"], {
                            children: section.content
                        })
                    }, section.id))
            })
        ]
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/ObstetricHistoryContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ObstetricHistoryContent",
    ()=>ObstetricHistoryContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
/**
 * Obstetric History content panel — expandable sections.
 * Patient Info is intentionally non-collapsible (no chevron).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/sidebarContentLayout.module.scss [app-ssr] (css module)");
;
;
;
;
;
function PatientInfoCard() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionCard"], {
        title: "Patient Info",
        hideChevron: true,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContentRow"], {
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyPara,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                        children: "LMP: "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "14 Jan'26 "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                        children: "EDD: "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "21 Oct'26 "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                        children: "Gestation: "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "14 Weeks 2 Days"
                    })
                ]
            })
        })
    });
}
function GPLAECard() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionCard"], {
        title: "GPLAE",
        hideChevron: true,
        titleAddon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].badgePrimigravida,
            children: "Primigravida"
        }),
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContentRow"], {
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyPara,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "G: 1 "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "P: 0 "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "L: 0 "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "A: 0 "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "E: 0"
                    })
                ]
            })
        })
    });
}
function GravidaEntry({ no, hasRemarks }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockPad,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockTitle,
                children: [
                    "Gravida no: ",
                    no
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockBody, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockBodyBreak),
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                        children: "LMP: "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "14 Jan'25 "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                        children: "EDD: "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "21 Oct'25 "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                        children: "Gestation: "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "40 Weeks "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                        children: "MOD: "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "NVD "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                        children: "Delivery Date: "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "14 Nov'25 "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                        children: "Baby Weight: "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: "2.8 Kgs"
                    }),
                    hasRemarks ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                                children: "Remarks: "
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                children: "Postnatal period was uneventful; breastfeeding initiated within first hour."
                            })
                        ]
                    }) : null
                ]
            })
        ]
    });
}
function PregnancyHistoryCard({ expanded, onToggle }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionCard"], {
        title: "Pregnancy History",
        expanded: expanded,
        onToggle: onToggle,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(GravidaEntry, {
                no: 1
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].divider
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(GravidaEntry, {
                no: 2,
                hasRemarks: true
            })
        ]
    });
}
function ExaminationCard({ expanded, onToggle }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionCard"], {
        title: "Examination",
        expanded: expanded,
        onToggle: onToggle,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockPad,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockTitle,
                        children: "17 Jan'26"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].vaccineMeta,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                                children: "Pedal Oedema: "
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                children: "Mild "
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                                children: "BMI: "
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                children: "23 Kg/m\u00B2 "
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                                children: "BP: "
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                children: "128/82 mmHg"
                            })
                        ]
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].divider
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockPad,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockTitle,
                        children: "24 Jan'26"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].vaccineMeta,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                                children: "Pedal Oedema: "
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                children: "Absent "
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                                children: "BMI: "
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                children: "23.2 Kg/m\u00B2 "
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                                children: "BP: "
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                children: "122/80 mmHg"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function ObstetricHistoryContent() {
    const [expandedState, setExpandedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        pregnancy: true,
        examination: true
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pageRoot,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButton"], {
                label: "Add/Edit Details",
                icon: "plus"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionScrollArea"], {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(PatientInfoCard, {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(GPLAECard, {}),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(PregnancyHistoryCard, {
                        expanded: expandedState.pregnancy,
                        onToggle: ()=>setExpandedState((prev)=>({
                                    ...prev,
                                    pregnancy: !prev.pregnancy
                                }))
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ExaminationCard, {
                        expanded: expandedState.examination,
                        onToggle: ()=>setExpandedState((prev)=>({
                                    ...prev,
                                    examination: !prev.examination
                                }))
                    })
                ]
            })
        ]
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/VaccineContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VaccineContent",
    ()=>VaccineContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
/**
 * Vaccination content panel — expandable section cards.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/sidebarContentLayout.module.scss [app-ssr] (css module)");
;
;
;
;
function VaccineItemRow({ week, name, status, statusColor = "normal", givenDate = "14 Jan'26" }) {
    const statusEl = statusColor === "overdue" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Red"], {
        children: status
    }) : statusColor === "due" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].warningText,
        children: status
    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
        children: status
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockPad,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockTitle,
                children: week
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].vaccineMeta,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].vaccineMedium,
                        children: name
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: " ("
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                        children: "Status: "
                    }),
                    statusEl,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].detailPipe,
                        children: " | "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                        children: "Given date: "
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                        children: [
                            givenDate,
                            " )"
                        ]
                    })
                ]
            })
        ]
    });
}
function GivenVaccineItem({ name, givenDate = "14 Jan'25", dueDate = "14 Jan'26" }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("li", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].givenLi,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].vaccineMedium,
                children: name
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                children: " ("
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                children: "Given date: "
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                children: [
                    givenDate,
                    " "
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                children: "Brand: "
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                children: "Pneumovax 23 Vaccine "
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sep"], {}),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Grey"], {
                children: "Due date: "
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                children: [
                    dueDate,
                    ")"
                ]
            })
        ]
    });
}
function GivenVaccineGroup({ week, vaccines }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockPad,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockTitle,
                children: week
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("ul", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].givenList,
                children: vaccines.map((v, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(GivenVaccineItem, {
                        name: v
                    }, `${week}-${v}-${i}`))
            })
        ]
    });
}
function VaccineContent() {
    const [expandedState, setExpandedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        pending: true,
        upcoming: true,
        given: true
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pageRoot,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButton"], {
                label: "Add/Edit Details",
                icon: "plus"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionScrollArea"], {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionCard"], {
                        title: "Pending Vaccine (4)",
                        expanded: expandedState.pending,
                        onToggle: ()=>setExpandedState((prev)=>({
                                    ...prev,
                                    pending: !prev.pending
                                })),
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(VaccineItemRow, {
                                week: "12-18 Weeks",
                                name: "HPV 1",
                                status: "Due",
                                statusColor: "due"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].divider
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(VaccineItemRow, {
                                week: "18 Weeks",
                                name: "Tdap Booster",
                                status: "Due",
                                statusColor: "due"
                            })
                        ]
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionCard"], {
                        title: "Upcoming Vaccine (2)",
                        expanded: expandedState.upcoming,
                        onToggle: ()=>setExpandedState((prev)=>({
                                    ...prev,
                                    upcoming: !prev.upcoming
                                })),
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(VaccineItemRow, {
                                week: "13 Weeks",
                                name: "PPSV23",
                                status: "Overdue",
                                statusColor: "overdue"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].divider
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(VaccineItemRow, {
                                week: "20 Weeks",
                                name: "Influenza",
                                status: "Due in 2 weeks"
                            })
                        ]
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionCard"], {
                        title: "Given Vaccine (20)",
                        expanded: expandedState.given,
                        onToggle: ()=>setExpandedState((prev)=>({
                                    ...prev,
                                    given: !prev.given
                                })),
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(GivenVaccineGroup, {
                                week: "Birth",
                                vaccines: [
                                    "IPV B-1"
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].divider
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(GivenVaccineGroup, {
                                week: "6 Weeks",
                                vaccines: [
                                    "DTP B1",
                                    "Hib B1"
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].divider
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(GivenVaccineGroup, {
                                week: "10 Weeks",
                                vaccines: [
                                    "HEP A-2",
                                    "PPSV 23",
                                    "PPSV 23 (2)"
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].divider
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(GivenVaccineGroup, {
                                week: "2-3 years",
                                vaccines: [
                                    "PPSV 23"
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/GrowthContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GrowthContent",
    ()=>GrowthContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
/**
 * Growth content panel — date-based expandable cards.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareDown$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowSquareDown.js [app-ssr] (ecmascript) <export default as ArrowSquareDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareUp$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowSquareUp.js [app-ssr] (ecmascript) <export default as ArrowSquareUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/tokens.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/sidebarContentLayout.module.scss [app-ssr] (css module)");
;
;
;
;
;
;
;
const GROWTH_ENTRIES = [
    {
        id: "g-27",
        dateLabel: "27 Jan'26",
        rows: [
            {
                label: "Age",
                unit: "years",
                value: "3"
            },
            {
                label: "Height",
                unit: "cm",
                value: "130"
            },
            {
                label: "Weight",
                unit: "kg",
                value: "12.8"
            },
            {
                label: "BMI",
                unit: "kg/m²",
                value: "24.2"
            },
            {
                label: "OFC",
                unit: "cm",
                value: "49"
            }
        ]
    },
    {
        id: "g-26",
        dateLabel: "26 Jan'26",
        rows: [
            {
                label: "Age",
                unit: "years",
                value: "3"
            },
            {
                label: "Height",
                unit: "cm",
                value: "129.8"
            },
            {
                label: "Weight",
                unit: "kg",
                value: "12.6"
            },
            {
                label: "BMI",
                unit: "kg/m²",
                value: "24.0"
            },
            {
                label: "OFC",
                unit: "cm",
                value: "49"
            }
        ]
    },
    {
        id: "g-24",
        dateLabel: "24 Jan'26",
        rows: [
            {
                label: "Age",
                unit: "years",
                value: "3"
            },
            {
                label: "Height",
                unit: "cm",
                value: "129.5"
            },
            {
                label: "Weight",
                unit: "kg",
                value: "12.5"
            },
            {
                label: "BMI",
                unit: "kg/m²",
                value: "23.8"
            },
            {
                label: "OFC",
                unit: "cm",
                value: "48.8"
            }
        ]
    },
    {
        id: "g-22",
        dateLabel: "22 Jan'26",
        rows: [
            {
                label: "Age",
                unit: "years",
                value: "3"
            },
            {
                label: "Height",
                unit: "cm",
                value: "129.3"
            },
            {
                label: "Weight",
                unit: "kg",
                value: "12.4"
            },
            {
                label: "BMI",
                unit: "kg/m²",
                value: "23.7"
            },
            {
                label: "OFC",
                unit: "cm",
                value: "48.8"
            }
        ]
    },
    {
        id: "g-20",
        dateLabel: "20 Jan'26",
        rows: [
            {
                label: "Age",
                unit: "years",
                value: "3"
            },
            {
                label: "Height",
                unit: "cm",
                value: "129.1"
            },
            {
                label: "Weight",
                unit: "kg",
                value: "12.3"
            },
            {
                label: "BMI",
                unit: "kg/m²",
                value: "23.6"
            },
            {
                label: "OFC",
                unit: "cm",
                value: "48.7"
            }
        ]
    }
];
function SeeChartButton() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].seeChartBar,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].seeChartHit,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    "aria-hidden": "true",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].seeChartOutline
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].seeChartCenter,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].seeChartInner,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].seeChartLabel,
                                children: "See Chart"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 16 16",
                                fill: "none",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].seeChartChevron,
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                    d: "M6 4l4 4-4 4",
                                    stroke: "var(--tp-blue-500)",
                                    strokeWidth: "1.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
}
function GrowthDateCard({ entry, expanded, onToggle }) {
    const { headerRef, isStuck } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStickyHeaderState"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accCard,
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tpSectionCardStyle"],
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
                ref: headerRef,
                type: "button",
                onClick: onToggle,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeader, expanded ? isStuck ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderStuck : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderRoundedOpen : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderCollapsed),
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderInner,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accTitle,
                            children: entry.dateLabel
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accChevron,
                            children: expanded ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareUp$3e$__["ArrowSquareUp"], {
                                color: "var(--tp-slate-500)",
                                size: 18,
                                strokeWidth: 1.5,
                                variant: "Linear"
                            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareDown$3e$__["ArrowSquareDown"], {
                                color: "var(--tp-slate-500)",
                                size: 18,
                                strokeWidth: 1.5,
                                variant: "Linear"
                            })
                        })
                    ]
                })
            }),
            expanded ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accBody,
                children: entry.rows.map((row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].growthRow,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].growthLabel,
                                children: [
                                    row.label,
                                    " ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].growthUnit,
                                        children: [
                                            "(",
                                            row.unit,
                                            ")"
                                        ]
                                    })
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].growthValue,
                                children: row.value
                            })
                        ]
                    }, `${entry.id}-${row.label}`))
            }) : null
        ]
    });
}
function GrowthContent() {
    const [expandedState, setExpandedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>Object.fromEntries(GROWTH_ENTRIES.map((entry, index)=>[
                entry.id,
                index === 0
            ])));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pageRoot,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(SeeChartButton, {}),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollFlex,
                "data-sticky-scroll-root": "true",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].innerStack, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].innerStackCenter),
                    children: GROWTH_ENTRIES.map((entry)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(GrowthDateCard, {
                            entry: entry,
                            expanded: Boolean(expandedState[entry.id]),
                            onToggle: ()=>{
                                setExpandedState((prev)=>({
                                        ...prev,
                                        [entry.id]: !prev[entry.id]
                                    }));
                            }
                        }, entry.id))
                })
            })
        ]
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/MedicalRecordsContent.module.scss [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "addBar": "MedicalRecordsContent-module-scss-module__dcA6hG__addBar",
  "addBarTopRule": "MedicalRecordsContent-module-scss-module__dcA6hG__addBarTopRule",
  "addCenter": "MedicalRecordsContent-module-scss-module__dcA6hG__addCenter",
  "addHit": "MedicalRecordsContent-module-scss-module__dcA6hG__addHit",
  "addInner": "MedicalRecordsContent-module-scss-module__dcA6hG__addInner",
  "addLabel": "MedicalRecordsContent-module-scss-module__dcA6hG__addLabel",
  "addOutline": "MedicalRecordsContent-module-scss-module__dcA6hG__addOutline",
  "cardsStack": "MedicalRecordsContent-module-scss-module__dcA6hG__cardsStack",
  "dotsWrap": "MedicalRecordsContent-module-scss-module__dcA6hG__dotsWrap",
  "dropdownItem": "MedicalRecordsContent-module-scss-module__dcA6hG__dropdownItem",
  "dropdownPanel": "MedicalRecordsContent-module-scss-module__dcA6hG__dropdownPanel",
  "filterChip": "MedicalRecordsContent-module-scss-module__dcA6hG__filterChip",
  "filterChipActive": "MedicalRecordsContent-module-scss-module__dcA6hG__filterChipActive",
  "filterChipBorder": "MedicalRecordsContent-module-scss-module__dcA6hG__filterChipBorder",
  "filterChipBorderActive": "MedicalRecordsContent-module-scss-module__dcA6hG__filterChipBorderActive",
  "filterChipInactive": "MedicalRecordsContent-module-scss-module__dcA6hG__filterChipInactive",
  "filterChipLabel": "MedicalRecordsContent-module-scss-module__dcA6hG__filterChipLabel",
  "filterRow": "MedicalRecordsContent-module-scss-module__dcA6hG__filterRow",
  "footerBar": "MedicalRecordsContent-module-scss-module__dcA6hG__footerBar",
  "footerBorder": "MedicalRecordsContent-module-scss-module__dcA6hG__footerBorder",
  "footerDate": "MedicalRecordsContent-module-scss-module__dcA6hG__footerDate",
  "footerInner": "MedicalRecordsContent-module-scss-module__dcA6hG__footerInner",
  "footerRow": "MedicalRecordsContent-module-scss-module__dcA6hG__footerRow",
  "footerTextCol": "MedicalRecordsContent-module-scss-module__dcA6hG__footerTextCol",
  "footerTitle": "MedicalRecordsContent-module-scss-module__dcA6hG__footerTitle",
  "menuCell": "MedicalRecordsContent-module-scss-module__dcA6hG__menuCell",
  "menuTrigger": "MedicalRecordsContent-module-scss-module__dcA6hG__menuTrigger",
  "noteBtn": "MedicalRecordsContent-module-scss-module__dcA6hG__noteBtn",
  "pageRoot": "MedicalRecordsContent-module-scss-module__dcA6hG__pageRoot",
  "pdfName": "MedicalRecordsContent-module-scss-module__dcA6hG__pdfName",
  "pdfPlaceholderCol": "MedicalRecordsContent-module-scss-module__dcA6hG__pdfPlaceholderCol",
  "plusBox": "MedicalRecordsContent-module-scss-module__dcA6hG__plusBox",
  "plusSvg": "MedicalRecordsContent-module-scss-module__dcA6hG__plusSvg",
  "recordCard": "MedicalRecordsContent-module-scss-module__dcA6hG__recordCard",
  "reportIconWrap": "MedicalRecordsContent-module-scss-module__dcA6hG__reportIconWrap",
  "scrollFlex": "MedicalRecordsContent-module-scss-module__dcA6hG__scrollFlex",
  "scrollInner": "MedicalRecordsContent-module-scss-module__dcA6hG__scrollInner",
  "thumbBorder": "MedicalRecordsContent-module-scss-module__dcA6hG__thumbBorder",
  "thumbFill": "MedicalRecordsContent-module-scss-module__dcA6hG__thumbFill",
  "thumbImg": "MedicalRecordsContent-module-scss-module__dcA6hG__thumbImg",
  "thumbImgBlur": "MedicalRecordsContent-module-scss-module__dcA6hG__thumbImgBlur",
  "thumbPdfBg": "MedicalRecordsContent-module-scss-module__dcA6hG__thumbPdfBg",
  "thumbShell": "MedicalRecordsContent-module-scss-module__dcA6hG__thumbShell",
  "tooltipPanel": "MedicalRecordsContent-module-scss-module__dcA6hG__tooltipPanel",
});
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/MedicalRecordsContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MedicalRecordsContent",
    ()=>MedicalRecordsContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
/**
 * Medical Records content panel — matches Figma DetailedSectionView (Medical Records).
 * Shows filter chips and stacked record cards with document thumbnails.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$EyeSlash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeSlash$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/EyeSlash.js [app-ssr] (ecmascript) <export default as EyeSlash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Import$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Import.js [app-ssr] (ecmascript) <export default as Import>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$NoteText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__NoteText$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/NoteText.js [app-ssr] (ecmascript) <export default as NoteText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Trash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Trash.js [app-ssr] (ecmascript) <export default as Trash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-ssr] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown-menu.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tooltip.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/MedicalRecordsContent.module.scss [app-ssr] (css module)");
;
;
;
;
;
;
;
;
const imgImage = "/assets/254812c5250025b09cfb4d7901db6be9343f3ff7.png";
const imgEka111 = "/assets/afc7c9e55f8624dd8cba9c2017f7a975fba9d2d2.png";
// ─── Add New Records button ───────────────────────────────────────────────────
function AddRecordsButton() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addBar,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                "aria-hidden": "true",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addBarTopRule
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addHit,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        "aria-hidden": "true",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addOutline
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addCenter,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addInner,
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].plusBox,
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].plusSvg,
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                                d: "M6 12H18",
                                                stroke: "var(--tp-blue-500)",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "1.5"
                                            }),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                                d: "M12 18V6",
                                                stroke: "var(--tp-blue-500)",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "1.5"
                                            })
                                        ]
                                    })
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addLabel,
                                    children: "Add New Records"
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
}
// ─── Filter chip ──────────────────────────────────────────────────────────────
const FILTERS = [
    "All",
    "Pathology",
    "Radiology",
    "Prescription",
    "Other"
];
function FilterChip({ label, active, onClick }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterChip, active ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterChipActive : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterChipInactive),
        onClick: onClick,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                "aria-hidden": "true",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterChipBorder, active && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterChipBorderActive)
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterChipLabel,
                children: label
            })
        ]
    });
}
// ─── Three-dots icon ─────────────────────────────────────────────────────────
function DotsIcon() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dotsWrap,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
            color: "var(--tp-slate-500)",
            size: 16,
            strokeWidth: 1.5
        })
    });
}
// ─── Report icon ──────────────────────────────────────────────────────────────
function ReportIcon() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reportIconWrap,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$NoteText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__NoteText$3e$__["NoteText"], {
            color: "var(--tp-slate-500)",
            size: 14,
            strokeWidth: 1.5,
            variant: "Linear"
        })
    });
}
const RECORD_ACTIONS = [
    {
        id: "view",
        label: "View",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"]
    },
    {
        id: "download",
        label: "Download",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Import$3e$__["Import"]
    },
    {
        id: "hide",
        label: "Hide",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$EyeSlash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeSlash$3e$__["EyeSlash"]
    },
    {
        id: "delete",
        label: "Delete",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Trash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"]
    }
];
function RecordActionMenu() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
                    type: "button",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].menuTrigger,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DotsIcon, {})
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "end",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdownPanel,
                children: RECORD_ACTIONS.map((action)=>{
                    const Icon = action.icon;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdownItem,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Icon, {
                                color: "var(--tp-violet-500)",
                                size: 16,
                                variant: "Bulk"
                            }),
                            action.label
                        ]
                    }, action.id);
                })
            })
        ]
    });
}
function RecordCard({ type, label, date, note }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].recordCard,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbShell,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        "aria-hidden": "true",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbBorder
                    }),
                    type === "pathology-img" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbFill,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("img", {
                            alt: "pathology report",
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbImg, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbImgBlur),
                            src: imgImage
                        })
                    }),
                    type === "prescription-img" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbFill,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("img", {
                            alt: "prescription",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbImg,
                            src: imgEka111
                        })
                    }),
                    type === "pdf" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbPdfBg,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pdfPlaceholderCol,
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
                                    width: "32",
                                    height: "32",
                                    viewBox: "0 0 32 32",
                                    fill: "none",
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                                            x: "6",
                                            y: "4",
                                            width: "20",
                                            height: "24",
                                            rx: "2",
                                            fill: "var(--tp-slate-300)"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                                            x: "9",
                                            y: "9",
                                            width: "14",
                                            height: "2",
                                            rx: "1",
                                            fill: "white"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                                            x: "9",
                                            y: "13",
                                            width: "14",
                                            height: "2",
                                            rx: "1",
                                            fill: "white"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                                            x: "9",
                                            y: "17",
                                            width: "8",
                                            height: "2",
                                            rx: "1",
                                            fill: "white"
                                        })
                                    ]
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pdfName,
                                    children: "20240121_190912.pdf"
                                })
                            ]
                        })
                    }),
                    type === "pathology-blank" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbFill,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("img", {
                            alt: "pathology report",
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbImg, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbImgBlur),
                            src: imgImage
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                asChild: true,
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                    type: "button",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].noteBtn,
                                    "aria-label": "View upload note",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ReportIcon, {})
                                })
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                side: "top",
                                sideOffset: 4,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tooltipPanel,
                                children: note
                            })
                        ]
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footerBar,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        "aria-hidden": "true",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footerBorder
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footerRow,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footerInner,
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footerTextCol,
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footerTitle,
                                            children: label
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footerDate,
                                            children: date
                                        })
                                    ]
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].menuCell,
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(RecordActionMenu, {})
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
}
function MedicalRecordsContent() {
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pageRoot,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(AddRecordsButton, {}),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterRow,
                children: FILTERS.map((f)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(FilterChip, {
                        label: f,
                        active: activeFilter === f,
                        onClick: ()=>setActiveFilter(f)
                    }, f))
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollFlex,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollInner,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardsStack,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(RecordCard, {
                                type: "pathology-img",
                                label: "Pathology",
                                date: "10 Aug'26",
                                note: "Uploaded by Dr. Shyam: pathology panel from last follow-up."
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(RecordCard, {
                                type: "prescription-img",
                                label: "Prescription",
                                date: "10 Aug'26",
                                note: "Scanned written prescription shared by patient at intake."
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(RecordCard, {
                                type: "pdf",
                                label: "Prescription",
                                date: "10 Aug'26",
                                note: "Digitized PDF export generated from hospital EMR."
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(RecordCard, {
                                type: "pathology-blank",
                                label: "Pathology",
                                date: "10 Aug'26",
                                note: "Follow-up pathology receipt uploaded by front desk."
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(RecordCard, {
                                type: "pathology-img",
                                label: "Pathology",
                                date: "10 Aug'26",
                                note: "Previous lab copy attached for trend comparison."
                            })
                        ]
                    })
                })
            })
        ]
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/LabResultsContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabResultsContent",
    ()=>LabResultsContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
/**
 * Lab Results content panel — date-based expandable cards.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareDown$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowSquareDown.js [app-ssr] (ecmascript) <export default as ArrowSquareDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareUp$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowSquareUp.js [app-ssr] (ecmascript) <export default as ArrowSquareUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/tokens.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$today$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/today-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/sidebarContentLayout.module.scss [app-ssr] (css module)");
;
;
;
;
;
;
;
;
const BASE_ROWS = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$today$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LAB_PRIMARY_ROWS"];
const LAB_ENTRIES = [
    {
        id: "l-27",
        dateLabel: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$today$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LAB_PRIMARY_DATE_LABEL"],
        rows: BASE_ROWS
    },
    {
        id: "l-26",
        dateLabel: "26 Jan'26",
        rows: BASE_ROWS.map((row, index)=>index % 4 === 0 ? {
                ...row,
                value: (Number.parseFloat(row.value) * 0.98).toFixed(1)
            } : row)
    },
    {
        id: "l-24",
        dateLabel: "24 Jan'26",
        rows: BASE_ROWS.map((row, index)=>index % 5 === 0 ? {
                ...row,
                value: (Number.parseFloat(row.value) * 1.02).toFixed(1)
            } : row)
    },
    {
        id: "l-22",
        dateLabel: "22 Jan'26",
        rows: BASE_ROWS.map((row, index)=>index % 3 === 0 ? {
                ...row,
                value: (Number.parseFloat(row.value) * 1.01).toFixed(1)
            } : row)
    },
    {
        id: "l-20",
        dateLabel: "20 Jan'26",
        rows: BASE_ROWS.map((row, index)=>index % 6 === 0 ? {
                ...row,
                value: (Number.parseFloat(row.value) * 0.97).toFixed(1)
            } : row)
    }
];
function LabRow({ label, unit, value, abnormal = false }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].labRow,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].labRowInner,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].labLeft,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].labLabel,
                            children: label
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].labUnit,
                            children: unit
                        })
                    ]
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].labValue, abnormal && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].labValueAbnormal),
                    children: value
                })
            ]
        })
    });
}
function LabDateCard({ entry, expanded, onToggle }) {
    const { headerRef, isStuck } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStickyHeaderState"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accCard,
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tpSectionCardStyle"],
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
                ref: headerRef,
                type: "button",
                onClick: onToggle,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeader, expanded ? isStuck ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderStuck : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderRoundedOpen : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderCollapsed),
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accHeaderInner,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accTitle,
                            children: entry.dateLabel
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accChevron,
                            children: expanded ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareUp$3e$__["ArrowSquareUp"], {
                                color: "var(--tp-slate-500)",
                                size: 18,
                                strokeWidth: 1.5,
                                variant: "Linear"
                            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowSquareDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowSquareDown$3e$__["ArrowSquareDown"], {
                                color: "var(--tp-slate-500)",
                                size: 18,
                                strokeWidth: 1.5,
                                variant: "Linear"
                            })
                        })
                    ]
                })
            }),
            expanded ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accBody,
                children: entry.rows.map((row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(LabRow, {
                        ...row
                    }, `${entry.id}-${row.label}`))
            }) : null
        ]
    });
}
function LabResultsContent() {
    const [expandedState, setExpandedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>Object.fromEntries(LAB_ENTRIES.map((entry, index)=>[
                entry.id,
                index === 0
            ])));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pageRoot,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButton"], {
                label: "Add/Edit Details",
                icon: "plus"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollFlex,
                "data-sticky-scroll-root": "true",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].innerStack,
                    children: LAB_ENTRIES.map((entry)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(LabDateCard, {
                            entry: entry,
                            expanded: Boolean(expandedState[entry.id]),
                            onToggle: ()=>{
                                setExpandedState((prev)=>({
                                        ...prev,
                                        [entry.id]: !prev[entry.id]
                                    }));
                            }
                        }, entry.id))
                })
            })
        ]
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/PersonalNotesContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PersonalNotesContent",
    ()=>PersonalNotesContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
/**
 * Personal Notes panel — free-form notes area.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/sidebarContentLayout.module.scss [app-ssr] (css module)");
;
;
;
const PERSONAL_NOTES_STORAGE_KEY = "tp-rxpad-personal-notes";
function PersonalNotesContent() {
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const saved = undefined;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }, [
        notes
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].fullColumn,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scrollFlex,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].innerStack,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("textarea", {
                        value: notes,
                        onChange: (event)=>setNotes(event.currentTarget.value),
                        placeholder: "Write personal notes...",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textareaNotes
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].notesHint,
                        children: "Doctor-only note. This content is not included in print and is never shared with the patient."
                    })
                ]
            })
        })
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/EmptyStateContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyStateContent",
    ()=>EmptyStateContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
/**
 * Empty state content panel — shown when there are no records for a section.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/sidebarContentLayout.module.scss [app-ssr] (css module)");
;
;
;
function EmptyStateContent({ sectionLabel }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyRoot,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyIconWrap,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
                    width: "32",
                    height: "32",
                    viewBox: "0 0 32 32",
                    fill: "none",
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                            d: "M26.667 12H5.333A2.667 2.667 0 0 0 2.667 14.667v10.666A2.667 2.667 0 0 0 5.333 28h21.334a2.667 2.667 0 0 0 2.666-2.667V14.667A2.667 2.667 0 0 0 26.667 12Z",
                            fill: "var(--tp-slate-200)"
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                            d: "M10.667 12V9.333a5.333 5.333 0 0 1 10.666 0V12",
                            stroke: "var(--tp-blue-300)",
                            strokeWidth: "2",
                            strokeLinecap: "round"
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                            cx: "16",
                            cy: "20",
                            r: "2",
                            fill: "var(--tp-blue-300)"
                        })
                    ]
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyTextStack,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyHeading,
                        children: [
                            "No ",
                            sectionLabel,
                            " Records"
                        ]
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyBody,
                        children: [
                            "No ",
                            sectionLabel.toLowerCase(),
                            " data has been recorded for this patient yet."
                        ]
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                type: "button",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$sidebarContentLayout$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyCta,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 12 12",
                        fill: "none",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                            d: "M6 1v10M1 6h10",
                            stroke: "white",
                            strokeWidth: "1.5",
                            strokeLinecap: "round"
                        })
                    }),
                    "Add ",
                    sectionLabel
                ]
            })
        ]
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/DentalContent.module.scss [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bannerText": "DentalContent-module-scss-module__qjjYQG__bannerText",
  "bannerWrap": "DentalContent-module-scss-module__qjjYQG__bannerWrap",
  "bodyPanel": "DentalContent-module-scss-module__qjjYQG__bodyPanel",
  "cardRoot": "DentalContent-module-scss-module__qjjYQG__cardRoot",
  "emptyIconCircle": "DentalContent-module-scss-module__qjjYQG__emptyIconCircle",
  "emptyLine": "DentalContent-module-scss-module__qjjYQG__emptyLine",
  "emptyStack": "DentalContent-module-scss-module__qjjYQG__emptyStack",
  "emptySubtitle": "DentalContent-module-scss-module__qjjYQG__emptySubtitle",
  "emptyTextCol": "DentalContent-module-scss-module__qjjYQG__emptyTextCol",
  "emptyTitle": "DentalContent-module-scss-module__qjjYQG__emptyTitle",
  "headRow": "DentalContent-module-scss-module__qjjYQG__headRow",
  "iconWrap": "DentalContent-module-scss-module__qjjYQG__iconWrap",
  "infoMsg": "DentalContent-module-scss-module__qjjYQG__infoMsg",
  "itemStrong": "DentalContent-module-scss-module__qjjYQG__itemStrong",
  "listItem": "DentalContent-module-scss-module__qjjYQG__listItem",
  "listLoose": "DentalContent-module-scss-module__qjjYQG__listLoose",
  "listTight": "DentalContent-module-scss-module__qjjYQG__listTight",
  "medIcon": "DentalContent-module-scss-module__qjjYQG__medIcon",
  "metaSep": "DentalContent-module-scss-module__qjjYQG__metaSep",
  "metaWrap": "DentalContent-module-scss-module__qjjYQG__metaWrap",
  "openExamBtn": "DentalContent-module-scss-module__qjjYQG__openExamBtn",
  "pageRoot": "DentalContent-module-scss-module__qjjYQG__pageRoot",
  "sectionBody": "DentalContent-module-scss-module__qjjYQG__sectionBody",
  "sectionHeadRow": "DentalContent-module-scss-module__qjjYQG__sectionHeadRow",
  "sectionTitle": "DentalContent-module-scss-module__qjjYQG__sectionTitle",
  "stickyHead": "DentalContent-module-scss-module__qjjYQG__stickyHead",
  "stickyHeadOpen": "DentalContent-module-scss-module__qjjYQG__stickyHeadOpen",
  "stickyHeadStuck": "DentalContent-module-scss-module__qjjYQG__stickyHeadStuck",
  "toothTitle": "DentalContent-module-scss-module__qjjYQG__toothTitle",
});
}),
"[project]/components/tp-rxpad/secondary-sidebar/content/DentalContent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DentalContent",
    ()=>DentalContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$ToothIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/ToothIcon.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/mock-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/detail-shared.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/tokens.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/DentalContent.module.scss [app-ssr] (css module)");
/**
 * Dental History content panel — tooth-first historical format.
 *
 * Main heading per card = tooth name.
 * Inside each card: Treatment History, Findings, Procedures, Overall Tooth Notes.
 */ "use client";
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
function ToothHistorySection({ title, medicalIcon, children }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionHeadRow,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconWrap,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                            name: medicalIcon,
                            variant: "bulk",
                            size: 16,
                            color: "var(--tp-violet-400)",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].medIcon
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                        children: title
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionBody,
                children: children
            })
        ]
    });
}
function renderMeta(parts) {
    const cleanParts = parts.filter(Boolean);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].metaWrap,
        children: [
            "(",
            cleanParts.map((part, idx)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                    children: [
                        idx > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].metaSep,
                            children: " | "
                        }) : null,
                        part
                    ]
                }, `${part}-${idx}`)),
            ")"
        ]
    });
}
function formatHistoryDate(value) {
    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
    if (!isoMatch) return value;
    const [, y, m, d0] = isoMatch;
    const dt = new Date(Number(y), Number(m) - 1, Number(d0));
    if (Number.isNaN(dt.getTime())) return value;
    const day = dt.getDate().toString().padStart(2, "0");
    const month = dt.toLocaleString("en-IN", {
        month: "short"
    });
    const year = dt.getFullYear().toString().slice(-2);
    return `${day} ${month}'${year}`;
}
function ToothHistoryCard({ entry }) {
    const { headerRef, isStuck } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStickyHeaderState"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardRoot,
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tpSectionCardStyle"],
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                ref: headerRef,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stickyHead, isStuck ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stickyHeadStuck : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stickyHeadOpen),
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].headRow,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].toothTitle,
                        children: entry.toothCode === "full-mouth" ? "Full Mouth" : `${entry.toothLabel} (T${entry.toothCode})`
                    })
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyPanel,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ToothHistorySection, {
                        title: "Treatment History",
                        medicalIcon: "clipboard-activity",
                        children: entry.treatmentHistory.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("ul", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listLoose,
                            children: entry.treatmentHistory.map((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("li", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listItem,
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemStrong,
                                            children: item.name
                                        }),
                                        " ",
                                        renderMeta([
                                            item.surface,
                                            formatHistoryDate(item.since),
                                            item.notes
                                        ])
                                    ]
                                }, item.id))
                        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyLine,
                            children: "No treatment history documented."
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ToothHistorySection, {
                        title: "Findings",
                        medicalIcon: "diagnosis",
                        children: entry.findings.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("ul", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listTight,
                            children: entry.findings.map((finding)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("li", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listItem,
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemStrong,
                                            children: finding.name
                                        }),
                                        " ",
                                        renderMeta([
                                            finding.surface,
                                            formatHistoryDate(finding.since),
                                            finding.notes
                                        ])
                                    ]
                                }, finding.id))
                        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyLine,
                            children: "No findings added."
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ToothHistorySection, {
                        title: "Procedures",
                        medicalIcon: "surgical-scissors-02",
                        children: entry.procedures.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("ul", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listLoose,
                            children: entry.procedures.map((procedure)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("li", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listItem,
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemStrong,
                                            children: procedure.name
                                        }),
                                        " ",
                                        renderMeta([
                                            procedure.surface,
                                            formatHistoryDate(procedure.date),
                                            procedure.status,
                                            procedure.notes
                                        ])
                                    ]
                                }, procedure.id))
                        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyLine,
                            children: "No procedures recorded."
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ToothHistorySection, {
                        title: "Overall Tooth Notes",
                        medicalIcon: "note-2",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("ul", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listTight,
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("li", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listItem,
                                children: entry.overallNotes ?? "No additional notes."
                            })
                        })
                    })
                ]
            })
        ]
    });
}
function DentalContent() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const patientId = searchParams?.get("patientId") ?? "apt-1";
    const entries = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DENTAL_TOOTH_HISTORY"][patientId] ?? [];
    const [infoMessage, setInfoMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const openDentalExamination = ()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const activeTab = undefined;
    };
    if (entries.length === 0) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pageRoot,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyStack,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyIconCircle,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$ToothIcon$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToothIcon"], {
                            size: 38,
                            color: "var(--tp-blue-500)",
                            variant: "Linear"
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyTextCol,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyTitle,
                                children: "No dental history yet"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptySubtitle,
                                children: "Open Dental Examination to add treatment history, findings, procedures, and tooth notes."
                            })
                        ]
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                        type: "button",
                        onClick: openDentalExamination,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].openExamBtn,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                "aria-hidden": "true",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                        d: "M6 12H18",
                                        stroke: "currentColor",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "1.5"
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                        d: "M12 18V6",
                                        stroke: "currentColor",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "1.5"
                                    })
                                ]
                            }),
                            "Open Dental Examination"
                        ]
                    }),
                    infoMessage ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].infoMsg,
                        children: infoMessage
                    }) : null
                ]
            })
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pageRoot,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButton"], {
                label: "Open Dental Examination",
                icon: "plus",
                onClick: openDentalExamination
            }),
            infoMessage ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bannerWrap,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bannerText,
                    children: infoMessage
                })
            }) : null,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$detail$2d$shared$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionScrollArea"], {
                children: entries.map((entry)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ToothHistoryCard, {
                        entry: entry
                    }, entry.id))
            })
        ]
    });
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.module.scss [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bodyAbs": "ContentPanel-module-scss-module__q1uIeG__bodyAbs",
  "bodyFlex": "ContentPanel-module-scss-module__q1uIeG__bodyFlex",
  "closeBtn": "ContentPanel-module-scss-module__q1uIeG__closeBtn",
  "closeIconBox": "ContentPanel-module-scss-module__q1uIeG__closeIconBox",
  "closeInner": "ContentPanel-module-scss-module__q1uIeG__closeInner",
  "closeSvgAbs": "ContentPanel-module-scss-module__q1uIeG__closeSvgAbs",
  "closeSvgFull": "ContentPanel-module-scss-module__q1uIeG__closeSvgFull",
  "panelBorder": "ContentPanel-module-scss-module__q1uIeG__panelBorder",
  "panelRoot": "ContentPanel-module-scss-module__q1uIeG__panelRoot",
  "sectionHeaderRoot": "ContentPanel-module-scss-module__q1uIeG__sectionHeaderRoot",
  "sectionHeaderRow": "ContentPanel-module-scss-module__q1uIeG__sectionHeaderRow",
  "sectionTitle": "ContentPanel-module-scss-module__q1uIeG__sectionTitle",
  "sectionTitleWrap": "ContentPanel-module-scss-module__q1uIeG__sectionTitleWrap",
});
}),
"[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContentPanel",
    ()=>ContentPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * Right content panel — gradient header + scrollable section content.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$imports$2f$svg$2d$g7iuydxwol$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/imports/svg-g7iuydxwol.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/PastVisitsContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$VitalsContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/VitalsContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$HistoryContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/HistoryContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$GynecHistoryContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/GynecHistoryContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$ObstetricHistoryContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/ObstetricHistoryContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$VaccineContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/VaccineContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$GrowthContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/GrowthContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/MedicalRecordsContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$LabResultsContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/LabResultsContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PersonalNotesContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/PersonalNotesContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$EmptyStateContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/EmptyStateContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/content/DentalContent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/rxSidebarPrimitives.module.scss [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.module.scss [app-ssr] (css module)");
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
;
;
const SECTION_TITLES = {
    pastVisits: "Past Visit",
    vitals: "Vitals",
    history: "Medical History",
    ophthal: "Ophthal",
    gynec: "Gynec History",
    obstetric: "Obstetric History",
    vaccine: "Vaccination",
    growth: "Growth",
    medicalRecords: "Medical Records",
    labResults: "Lab Results",
    personalNotes: "Personal Notes",
    dental: "Dental History",
    dentalPlan: "Dental Treatment Plan"
};
function SectionHeader({ title, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionHeaderRoot,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionHeaderRow,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitleWrap,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$rxSidebarPrimitives$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionHeaderTitle} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitle}`,
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].closeBtn,
                    onClick: onClose,
                    "aria-label": "Collapse section panel",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].closeInner,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].closeIconBox,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].closeSvgAbs,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            inset: "-5.56%"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].closeSvgFull,
                                            fill: "none",
                                            preserveAspectRatio: "none",
                                            viewBox: "0 0 14.4 14.4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$imports$2f$svg$2d$g7iuydxwol$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].p3558c040,
                                                stroke: "white",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeOpacity: "0.8",
                                                strokeWidth: "1.44"
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                                lineNumber: 60,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                            lineNumber: 54,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                        lineNumber: 53,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                    lineNumber: 52,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "absolute",
                                        inset: "12.5% 62.5% 12.5% 37.5%"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            inset: "-5.56% -0.72px"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].closeSvgFull,
                                            fill: "none",
                                            preserveAspectRatio: "none",
                                            viewBox: "0 0 1.44 14.4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M0.72 0.72V13.68",
                                                stroke: "white",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeOpacity: "0.8",
                                                strokeWidth: "1.44"
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                                lineNumber: 84,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                            lineNumber: 78,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                        lineNumber: 77,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "absolute",
                                        inset: "37.5% 33.33% 37.5% 54.17%"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            inset: "-16.67% -33.33%"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].closeSvgFull,
                                            fill: "none",
                                            preserveAspectRatio: "none",
                                            viewBox: "0 0 3.6 5.76",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$imports$2f$svg$2d$g7iuydxwol$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pcf85200,
                                                stroke: "white",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeOpacity: "0.8",
                                                strokeWidth: "1.44"
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                                lineNumber: 108,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                            lineNumber: 102,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                        lineNumber: 101,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
function SectionContent({ activeId }) {
    switch(activeId){
        case "pastVisits":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PastVisitsContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PastVisitsContent"], {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 130,
                columnNumber: 14
            }, this);
        case "vitals":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$VitalsContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VitalsContent"], {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 132,
                columnNumber: 14
            }, this);
        case "history":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$HistoryContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HistoryContent"], {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 134,
                columnNumber: 14
            }, this);
        case "gynec":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$GynecHistoryContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GynecHistoryContent"], {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 136,
                columnNumber: 14
            }, this);
        case "obstetric":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$ObstetricHistoryContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ObstetricHistoryContent"], {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 138,
                columnNumber: 14
            }, this);
        case "vaccine":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$VaccineContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VaccineContent"], {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 140,
                columnNumber: 14
            }, this);
        case "growth":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$GrowthContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GrowthContent"], {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 142,
                columnNumber: 14
            }, this);
        case "medicalRecords":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$MedicalRecordsContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MedicalRecordsContent"], {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 144,
                columnNumber: 14
            }, this);
        case "labResults":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$LabResultsContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LabResultsContent"], {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 146,
                columnNumber: 14
            }, this);
        case "personalNotes":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$PersonalNotesContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PersonalNotesContent"], {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 148,
                columnNumber: 14
            }, this);
        case "dental":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$DentalContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DentalContent"], {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 150,
                columnNumber: 14
            }, this);
        case "ophthal":
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$content$2f$EmptyStateContent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyStateContent"], {
                sectionLabel: SECTION_TITLES[activeId]
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 153,
                columnNumber: 14
            }, this);
    }
}
function ContentPanel({ activeId, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].panelRoot,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].panelBorder,
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                title: SECTION_TITLES[activeId],
                onClose: onClose
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyFlex,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bodyAbs,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionContent, {
                        activeId: activeId
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
                lineNumber: 162,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/tp-rxpad/secondary-sidebar/SecondarySidebar.module.scss [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "root": "SecondarySidebar-module-scss-module__RkpnXa__root",
});
}),
"[project]/components/tp-rxpad/secondary-sidebar/SecondarySidebar.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SecondarySidebar",
    ()=>SecondarySidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * SecondarySidebar — NavPanel + optional ContentPanel.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/NavPanel.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/ContentPanel.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$SecondarySidebar$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/secondary-sidebar/SecondarySidebar.module.scss [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rxpad-chrome-context.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const RX_SIDEBAR_IDS = new Set([
    "pastVisits",
    "vitals",
    "history",
    "gynec",
    "obstetric",
    "vaccine",
    "growth",
    "medicalRecords",
    "labResults",
    "personalNotes",
    "dental",
    "ophthal"
]);
function SecondarySidebar() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const chrome = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RxPadChromeContext"]);
    const [localActiveId, setLocalActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const rxSidebarParam = searchParams?.get("rxSidebar") ?? null;
    const activeId = chrome ? chrome.secondarySidebarActiveId : localActiveId;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!rxSidebarParam || !RX_SIDEBAR_IDS.has(rxSidebarParam)) return;
        if (chrome) {
            chrome.setSecondarySidebarActiveId(rxSidebarParam);
        } else {
            setLocalActiveId(rxSidebarParam);
        }
    // Only react to URL changes — not chrome identity — so closing the panel is not undone on re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        rxSidebarParam
    ]);
    function handleSelect(id) {
        if (chrome) {
            chrome.toggleSecondarySidebar(id);
        } else {
            setLocalActiveId((prev)=>prev === id ? null : id);
        }
    }
    function handleClose() {
        if (chrome) {
            chrome.setSecondarySidebarActiveId(null);
        } else {
            setLocalActiveId(null);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$SecondarySidebar$2e$module$2e$scss__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].root,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$NavPanel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NavPanel"], {
                active: activeId,
                onSelect: handleSelect
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/SecondarySidebar.jsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            activeId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$secondary$2d$sidebar$2f$ContentPanel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContentPanel"], {
                activeId: activeId,
                onClose: handleClose
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/secondary-sidebar/SecondarySidebar.jsx",
                lineNumber: 67,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/secondary-sidebar/SecondarySidebar.jsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_tp-rxpad_secondary-sidebar_c41eb49b._.js.map