(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CopyIcon",
    ()=>CopyIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-touch-device.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function CopyIcon({ size = 14, onClick, className }) {
    _s();
    const isTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"])();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: (e)=>{
            if (onClick) {
                e.stopPropagation();
                onClick(e);
            }
        /* When no onClick, let the event bubble so parent wrappers (e.g. ActionableTooltip) can handle it. */ },
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-shrink-0 cursor-pointer transition-colors", hovered ? "text-tp-blue-600" : "text-tp-blue-500", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
            size: size,
            variant: isTouch || hovered ? "Bulk" : "Linear"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(CopyIcon, "HNI82a7w5DK3G+G9w8goosZVo04=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"]
    ];
});
_c = CopyIcon;
var _c;
__turbopack_context__.k.register(_c, "CopyIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionableTooltip",
    ()=>ActionableTooltip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-touch-device.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ActionableTooltip({ children, label, onAction, className }) {
    _s();
    const isTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"])();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCopied, setIsCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const wrapperRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tooltipRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hideTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [pos, setPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    /* ── Position calculation ──────────────────────────── */ const updatePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ActionableTooltip.useCallback[updatePosition]": ()=>{
            if (!wrapperRef.current || !tooltipRef.current) return;
            const triggerRect = wrapperRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const triggerCenterX = triggerRect.left + triggerRect.width / 2;
            const tooltipW = tooltipRect.width;
            const MARGIN = 8;
            const GAP = 6;
            // Default: center tooltip on trigger
            let left = triggerCenterX - tooltipW / 2;
            // Clamp to viewport edges
            left = Math.max(MARGIN, Math.min(left, window.innerWidth - tooltipW - MARGIN));
            // Arrow should point at trigger center relative to tooltip left
            const arrowLeft = Math.max(10, Math.min(triggerCenterX - left, tooltipW - 10));
            // Show above (default) or below if insufficient room above
            let top;
            let arrowDir;
            if (triggerRect.top > tooltipRect.height + GAP + 10) {
                // Show above
                top = triggerRect.top - GAP - tooltipRect.height;
                arrowDir = "down";
            } else {
                // Show below
                top = triggerRect.bottom + GAP;
                arrowDir = "up";
            }
            setPos({
                top,
                left,
                arrowDir,
                arrowLeft
            });
        }
    }["ActionableTooltip.useCallback[updatePosition]"], []);
    // Reposition whenever tooltip is visible or content changes (copied state)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ActionableTooltip.useEffect": ()=>{
            if (!isVisible) {
                setPos(null);
                return;
            }
            // Run after the tooltip has been painted so we can measure its real size
            requestAnimationFrame(updatePosition);
        }
    }["ActionableTooltip.useEffect"], [
        isVisible,
        isCopied,
        updatePosition
    ]);
    // Reposition on scroll (any ancestor) and window resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ActionableTooltip.useEffect": ()=>{
            if (!isVisible) return;
            const reposition = {
                "ActionableTooltip.useEffect.reposition": ()=>requestAnimationFrame(updatePosition)
            }["ActionableTooltip.useEffect.reposition"];
            window.addEventListener("scroll", reposition, true);
            window.addEventListener("resize", reposition);
            return ({
                "ActionableTooltip.useEffect": ()=>{
                    window.removeEventListener("scroll", reposition, true);
                    window.removeEventListener("resize", reposition);
                }
            })["ActionableTooltip.useEffect"];
        }
    }["ActionableTooltip.useEffect"], [
        isVisible,
        updatePosition
    ]);
    /* ── Hover handlers ────────────────────────────────── */ const clearHideTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ActionableTooltip.useCallback[clearHideTimeout]": ()=>{
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = null;
            }
        }
    }["ActionableTooltip.useCallback[clearHideTimeout]"], []);
    const handleMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ActionableTooltip.useCallback[handleMouseEnter]": ()=>{
            clearHideTimeout();
            if (!isCopied) {
                setIsVisible(true);
            }
        }
    }["ActionableTooltip.useCallback[handleMouseEnter]"], [
        isCopied,
        clearHideTimeout
    ]);
    const handleMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ActionableTooltip.useCallback[handleMouseLeave]": ()=>{
            hideTimeoutRef.current = setTimeout({
                "ActionableTooltip.useCallback[handleMouseLeave]": ()=>{
                    if (!isCopied) {
                        setIsVisible(false);
                    }
                }
            }["ActionableTooltip.useCallback[handleMouseLeave]"], 100);
        }
    }["ActionableTooltip.useCallback[handleMouseLeave]"], [
        isCopied
    ]);
    /** Debounce so touch + synthesized click does not run onAction twice (e.g. Dr Agent copy → chart). */ const lastActionAtRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const runAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ActionableTooltip.useCallback[runAction]": ()=>{
            const now = Date.now();
            if (now - lastActionAtRef.current < 450) return;
            lastActionAtRef.current = now;
            onAction();
            setIsCopied(true);
            setTimeout({
                "ActionableTooltip.useCallback[runAction]": ()=>{
                    setIsCopied(false);
                    setIsVisible(false);
                }
            }["ActionableTooltip.useCallback[runAction]"], 1000);
        }
    }["ActionableTooltip.useCallback[runAction]"], [
        onAction
    ]);
    /** Pointer click / synthesized tap — always runs the action (tooltip is secondary). */ const handleTriggerClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ActionableTooltip.useCallback[handleTriggerClick]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
            runAction();
        }
    }["ActionableTooltip.useCallback[handleTriggerClick]"], [
        runAction
    ]);
    /* ── Touch-primary: first tap must run the action (not only open the tooltip). ─── */ const handleTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ActionableTooltip.useCallback[handleTouchStart]": (e)=>{
            if (!isTouch) return;
            e.preventDefault();
            e.stopPropagation();
            if (isCopied) return;
            runAction();
        }
    }["ActionableTooltip.useCallback[handleTouchStart]"], [
        isTouch,
        isCopied,
        runAction
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ActionableTooltip.useEffect": ()=>{
            if (!isTouch || !isVisible) return;
            const handleOutsideTap = {
                "ActionableTooltip.useEffect.handleOutsideTap": (e)=>{
                    if (wrapperRef.current && !wrapperRef.current.contains(e.target) && tooltipRef.current && !tooltipRef.current.contains(e.target)) {
                        setIsVisible(false);
                    }
                }
            }["ActionableTooltip.useEffect.handleOutsideTap"];
            document.addEventListener("touchstart", handleOutsideTap);
            return ({
                "ActionableTooltip.useEffect": ()=>document.removeEventListener("touchstart", handleOutsideTap)
            })["ActionableTooltip.useEffect"];
        }
    }["ActionableTooltip.useEffect"], [
        isTouch,
        isVisible
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ActionableTooltip.useEffect": ()=>{
            return ({
                "ActionableTooltip.useEffect": ()=>{
                    if (hideTimeoutRef.current) {
                        clearTimeout(hideTimeoutRef.current);
                    }
                }
            })["ActionableTooltip.useEffect"];
        }
    }["ActionableTooltip.useEffect"], []);
    /* ── Tooltip portal ────────────────────────────────── */ const tooltip = isVisible && typeof document !== "undefined" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: tooltipRef,
        role: "tooltip",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed z-[9999]", "whitespace-nowrap rounded-[6px] bg-tp-slate-800 px-[8px] py-[5px]", "text-[12px] leading-[1.3] text-white", "cursor-pointer select-none", "shadow-[0_4px_12px_rgba(0,0,0,0.15)]"),
        // Simple opacity fade — no translate/slide animation
        "data-tooltip": true,
        style: pos ? {
            top: pos.top,
            left: pos.left,
            opacity: 1,
            transition: "opacity 40ms ease-out"
        } : {
            top: -9999,
            left: -9999,
            opacity: 0
        } // off-screen until measured
        ,
        onClick: (e)=>{
            e.stopPropagation();
            runAction();
        },
        onMouseEnter: clearHideTimeout,
        onMouseLeave: handleMouseLeave,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-[5px]",
                children: isCopied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "10",
                            height: "10",
                            viewBox: "0 0 16 16",
                            fill: "none",
                            className: "flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M3 8.5L6.5 12L13 4",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx",
                                lineNumber: 214,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx",
                            lineNumber: 213,
                            columnNumber: 19
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: "Filled!"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx",
                            lineNumber: 216,
                            columnNumber: 19
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            size: 14,
                            variant: "Bulk",
                            className: "flex-shrink-0 opacity-70"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx",
                            lineNumber: 220,
                            columnNumber: 19
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx",
                            lineNumber: 221,
                            columnNumber: 19
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx",
                lineNumber: 210,
                columnNumber: 13
            }, this),
            pos && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute", "w-0 h-0", "border-l-[5px] border-l-transparent", "border-r-[5px] border-r-transparent", pos.arrowDir === "down" ? "top-full border-t-[5px] border-t-tp-slate-800" : "bottom-full border-b-[5px] border-b-tp-slate-800"),
                style: {
                    left: pos.arrowLeft,
                    transform: "translateX(-50%)"
                }
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx",
                lineNumber: 228,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx",
        lineNumber: 185,
        columnNumber: 11
    }, this), document.body) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: wrapperRef,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex cursor-pointer items-center", className),
        onMouseEnter: isTouch ? undefined : handleMouseEnter,
        onMouseLeave: isTouch ? undefined : handleMouseLeave,
        onTouchStart: handleTouchStart,
        onClick: handleTriggerClick,
        children: [
            children,
            tooltip
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx",
        lineNumber: 247,
        columnNumber: 5
    }, this);
}
_s(ActionableTooltip, "dnQS0Q2kJUgaaIwd5LKRlacP7nM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"]
    ];
});
_c = ActionableTooltip;
var _c;
__turbopack_context__.k.register(_c, "ActionableTooltip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SECTION_TAG_ICON_MAP",
    ()=>SECTION_TAG_ICON_MAP,
    "SectionTag",
    ()=>SectionTag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Calendar2.js [app-client] (ecmascript) <export default as Calendar2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-touch-device.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const SECTION_TAG_ICON_MAP = {
    "Vitals": "Heart Rate",
    "Today's Vitals": "Heart Rate",
    "Symptoms": "Virus",
    "Diagnosis": "Diagnosis",
    "Diagnoses": "Diagnosis",
    "Medication": "Tablets",
    "Medications": "Tablets",
    "Active Meds": "Tablets",
    "Current Medications": "Tablets",
    "Investigation": "test-tube-02",
    "Investigations": "test-tube-02",
    "Key Labs": "Lab",
    "Chronic Conditions": "medical-service",
    "Family History": "medical-report",
    "Allergies": "mask",
    "Lifestyle": "health care",
    "Due Alerts": "emergency",
    "History": "medical-record",
    "Medical History": "medical-record",
    "Last Visit": "medical-report",
    "Advice": "medical book",
    "Follow-up": "iconsax:calendar",
    "Basic Info": "health-file-02",
    "ANC Status": "Obstetric",
    "Last Exam": "medical-report",
    "Menstrual History": "Gynec",
    "Screening": "ultrasound-monitor-02",
    "OD (Right)": "eye",
    "OS (Left)": "eye",
    "Findings": "clipboard-activity",
    "Growth": "health-file-03",
    "Vaccines": "injection",
    "Pediatrics": "health care",
    "Ophthal": "eye",
    "Obstetric": "Obstetric",
    "Gynec": "Gynec",
    "ANC / Vaccines": "injection",
    "Recommendations": "emergency",
    "Dental Examination": "tooth"
};
/** Returns true if the string starts with an emoji character */ function isEmoji(str) {
    if (!str) return false;
    return /^[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}]/u.test(str);
}
function SectionTag({ label, icon, onClick, onCopy, variant = "default", className, tooltip, copyTooltip }) {
    _s();
    const isTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"])();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const resolvedIcon = icon || SECTION_TAG_ICON_MAP[label];
    const bg = variant === "specialty" ? "bg-tp-violet-50 text-tp-violet-600" : "bg-tp-slate-100/70 text-tp-slate-500";
    const foregroundClassName = variant === "specialty" ? hovered ? "text-tp-violet-700" : "text-tp-violet-600" : hovered ? "text-tp-slate-700" : "text-tp-slate-500";
    const foregroundColor = variant === "specialty" ? hovered ? "var(--tp-violet-700, #6D28D9)" : "var(--tp-violet-600, #7C3AED)" : hovered ? "var(--tp-slate-700, #334155)" : "var(--tp-slate-500, #64748B)";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group/tag inline-flex h-[30px] cursor-pointer items-center gap-1 whitespace-nowrap rounded-[4px] px-2 py-0 text-[14px] font-semibold align-middle transition-colors", bg, hovered && variant === "specialty" && "bg-tp-violet-100", hovered && variant !== "specialty" && "bg-tp-slate-100", className),
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        onClick: onClick,
        title: tooltip,
        children: [
            resolvedIcon && (isEmoji(resolvedIcon) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[14px]",
                children: resolvedIcon
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx",
                lineNumber: 112,
                columnNumber: 13
            }, this) : resolvedIcon === "iconsax:calendar" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__["Calendar2"], {
                size: 18,
                variant: "Bulk",
                color: foregroundColor,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-block align-middle transition-opacity", hovered ? "opacity-100" : "opacity-60", foregroundClassName)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx",
                lineNumber: 115,
                columnNumber: 15
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                name: resolvedIcon,
                variant: "bulk",
                size: 18,
                color: foregroundColor,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-block align-middle transition-opacity", hovered ? "opacity-100" : "opacity-60", foregroundClassName)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx",
                lineNumber: 127,
                columnNumber: 13
            }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-colors", foregroundClassName),
                children: label
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            onCopy && (hovered || isTouch) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                size: 14,
                onClick: (e)=>{
                    e.stopPropagation();
                    onCopy();
                },
                className: "ml-0.5"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx",
                lineNumber: 144,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(SectionTag, "HNI82a7w5DK3G+G9w8goosZVo04=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"]
    ];
});
_c = SectionTag;
var _c;
__turbopack_context__.k.register(_c, "SectionTag");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionSummaryBar",
    ()=>SectionSummaryBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function SectionSummaryBar({ label, icon, iconSlot, variant = "default", trailing, className, marginBottom = true, compact = false }) {
    const resolvedName = icon ?? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"][label];
    const barBg = variant === "specialty" ? "bg-tp-violet-50" : "bg-tp-slate-100/70";
    const labelColor = variant === "specialty" ? "text-tp-violet-600" : "text-tp-slate-500";
    const iconColor = variant === "specialty" ? "var(--tp-violet-600, #7C3AED)" : "var(--tp-slate-500, #64748B)";
    const rowH = compact ? "h-[28px]" : "h-[30px]";
    const iconBoxW = compact ? "w-[16px]" : "w-[18px]";
    const iconPx = compact ? 14 : 18;
    const labelText = compact ? "text-[12px]" : "text-[14px]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group/section-header flex w-full min-w-0 shrink-0 items-center gap-2 rounded-[4px] px-2", rowH, marginBottom && "mb-[4px]", barBg, className),
        children: [
            iconSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex shrink-0 items-center justify-center", rowH),
                children: iconSlot
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this) : resolvedName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex shrink-0 items-center justify-center", rowH, iconBoxW),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                    name: resolvedName,
                    variant: "bulk",
                    size: iconPx,
                    color: iconColor,
                    className: "shrink-0"
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-full min-w-0 flex-1 items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("min-w-0 flex-1 text-left font-semibold leading-[1.2]", labelText, labelColor),
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    trailing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full shrink-0 items-center gap-1",
                        children: trailing
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = SectionSummaryBar;
var _c;
__turbopack_context__.k.register(_c, "SectionSummaryBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DENTAL_EXAMINATION",
    ()=>DENTAL_EXAMINATION,
    "DentalExaminationToothBlock",
    ()=>DentalExaminationToothBlock,
    "buildDentalExaminationLine",
    ()=>buildDentalExaminationLine,
    "dentalScanToCanvasFindings",
    ()=>dentalScanToCanvasFindings,
    "dentalScanToothHasAgentCardContent",
    ()=>dentalScanToothHasAgentCardContent,
    "findingParts",
    ()=>findingParts,
    "formatHistoryLineParts",
    ()=>formatHistoryLineParts,
    "formatPrimaryDetail",
    ()=>formatPrimaryDetail,
    "procedureParts",
    ()=>procedureParts,
    "toothDiagnosisSet",
    ()=>toothDiagnosisSet,
    "toothDisplayName",
    ()=>toothDisplayName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-collapsible/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowDown2.js [app-client] (ecmascript) <export default as ArrowDown2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$MiniToothCanvas$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/MiniToothCanvas.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-client] (ecmascript)");
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
const DENTAL_EXAMINATION = "Dental Examination";
function toothDiagnosisSet(t) {
    const s = new Set(t.diagnoses ?? []);
    if (t.implant) s.add("Implant");
    return s;
}
function dentalScanToothHasAgentCardContent(t) {
    const histRows = t.treatmentHistoryRows?.length ? t.treatmentHistoryRows : (t.treatmentHistory || []).map((line)=>({
            name: line
        }));
    const hasHistory = histRows.length > 0;
    const hasFindings = (t.findings?.length ?? 0) > 0;
    const hasProcedures = (t.procedures?.length ?? 0) > 0;
    const hasNote = !!t.scannerNotes?.trim();
    const rawDx = [
        ...toothDiagnosisSet(t)
    ];
    const dxArr = scanImplantRedundantWithNarrative(t, histRows) ? rawDx.filter((d)=>d !== "Implant") : rawDx;
    return hasHistory || hasFindings || hasProcedures || hasNote || dxArr.length > 0;
}
function textMentionsImplant(s) {
    return Boolean(s?.trim() && /implant/i.test(s));
}
/** True when implant is already described by history/procedures — skip duplicate "Implant" preview chip. */ function scanImplantRedundantWithNarrative(t, histRows) {
    if (!t.implant) return false;
    if (histRows.some((r)=>textMentionsImplant(r.name) || textMentionsImplant(r.notes))) return true;
    return (t.procedures ?? []).some((p)=>textMentionsImplant(p.name) || textMentionsImplant(p.notes));
}
function dentalScanToCanvasFindings(findings) {
    return (findings ?? []).map((f, i)=>{
        const z = f.zoneId || "whole";
        const zoneId = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_ZONES"].includes(z) ? z : "whole";
        return {
            id: `dental-block-${i}`,
            zoneId,
            type: f.type,
            notes: f.notes?.trim() ?? ""
        };
    });
}
function toothDisplayName(fdi) {
    const tooth = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].find((x)=>x.fdi === fdi);
    if (!tooth) return null;
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][tooth.quadrant]} ${tooth.name}`;
}
function formatHistoryLineParts(r) {
    const primary = r.name?.trim() || "—";
    const bracket = r.surface?.trim() || "Whole tooth";
    const tailBits = [];
    if (r.since?.trim()) tailBits.push(`Since ${r.since.trim()}`);
    if (r.notes?.trim()) tailBits.push(r.notes.trim());
    const tail = tailBits.length ? tailBits.join(", ") : undefined;
    const base = `${primary} (${bracket})`;
    const copyText = tail ? `${base} · ${tail}` : base;
    return {
        primary,
        bracket,
        tail,
        copyText
    };
}
function findingParts(f) {
    const detail = [
        f.zoneId,
        f.since,
        f.notes?.trim()
    ].filter(Boolean).join(", ");
    return {
        primary: f.type,
        detail: detail || undefined
    };
}
function procedureParts(p) {
    const detail = [
        p.surface && p.surface !== "—" ? p.surface : null,
        p.date,
        p.status,
        p.notes?.trim()
    ].filter(Boolean).join(", ");
    return {
        primary: p.name,
        detail: detail || undefined
    };
}
function formatPrimaryDetail(parts) {
    return parts.detail ? `${parts.primary} (${parts.detail})` : parts.primary;
}
function buildDentalExaminationLine(t) {
    const parts = [];
    if (t.implant) parts.push("Implant");
    if (t.procedures?.length) {
        parts.push(...t.procedures.map((p)=>{
            const bits = [
                p.surface && p.surface !== "—" ? `surface ${p.surface}` : null,
                p.date,
                p.status,
                p.notes
            ].filter(Boolean);
            return bits.length ? `${p.name} (${bits.join(", ")})` : p.name;
        }));
    }
    if (t.treatmentHistoryRows?.length) {
        parts.push(...t.treatmentHistoryRows.map((r)=>formatHistoryLineParts(r).copyText));
    }
    if (t.treatmentHistory?.length) parts.push(...t.treatmentHistory);
    if (t.diagnoses?.length) parts.push(...t.diagnoses.map((d)=>`Dx: ${d}`));
    if (t.findings?.length) {
        parts.push(...t.findings.map((f)=>formatPrimaryDetail(findingParts(f))));
    }
    if (t.scannerNotes?.trim()) parts.push(t.scannerNotes.trim());
    const body = parts.length ? parts.join(", ") : "No significant findings (verify)";
    return `T${t.fdi} — ${body}`;
}
/** Compact preview chips — same violet family as dentition tooth-record tags in examination. */ function DrPreviewTag({ icon, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex max-w-full min-w-0 items-start gap-1.5 rounded-[6px] px-2 py-1", "bg-[var(--tp-violet-50)] text-[12px] font-semibold leading-snug text-[var(--tp-violet-800)]"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                name: icon,
                variant: "bulk",
                size: 14,
                color: "var(--tp-violet-600)",
                className: "mt-0.5 shrink-0"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-0 whitespace-normal break-words",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_c = DrPreviewTag;
function RxBulletLine({ primary, bracket, tail, copyText, onCopyLine, isTouch }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "group/line flex items-start gap-2 text-[12px] leading-[1.55]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-[6px] h-1 w-1 shrink-0 rounded-full bg-tp-slate-400",
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-tp-slate-800",
                        children: primary
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    bracket ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-normal text-tp-slate-400",
                        children: [
                            " (",
                            bracket,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                        lineNumber: 165,
                        columnNumber: 20
                    }, this) : null,
                    tail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-normal text-tp-slate-400",
                        children: [
                            " · ",
                            tail
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                        lineNumber: 166,
                        columnNumber: 17
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                label: `Copy: ${copyText}`,
                onAction: onCopyLine,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                    size: 14,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("!mt-0.5 !flex !h-7 !w-7 !shrink-0 !items-center !justify-center !rounded-md !text-[var(--tp-blue-600,#4B4AD5)] transition-opacity hover:!bg-[var(--tp-blue-50)]", isTouch ? "opacity-80" : "opacity-0 group-hover/line:opacity-100 focus-within:opacity-100")
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_c1 = RxBulletLine;
function ChatStructuredSection({ label, icon, copyTooltip, onCopySection, isTouch, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group/dental-section space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                label: label,
                icon: icon,
                marginBottom: false,
                compact: true,
                trailing: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-opacity", isTouch ? "opacity-80" : "opacity-0 group-hover/dental-section:opacity-100 group-hover/section-header:opacity-100 focus-within:opacity-100"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                        label: copyTooltip,
                        onAction: onCopySection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                            size: 14,
                            className: "!flex !h-7 !w-7 !items-center !justify-center !rounded-md !text-[var(--tp-blue-600,#4B4AD5)] hover:!bg-[var(--tp-blue-50)]"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                            lineNumber: 211,
                            columnNumber: 15
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                        lineNumber: 210,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                    lineNumber: 204,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
_c2 = ChatStructuredSection;
function DentalExaminationToothBlock({ tooth: t, copiedKey: _copiedKey, onCopyClipboard, onCopySectionLines, onApplyToothToRxPad, isTouch, variant = "standalone", stackedPart, collapsible = false, defaultCollapsed = false, noteSectionLabel = "Notes", emptyBodyHint = "No additional lines — correlate with the full imaging report.", onMergeFindingToDental }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!defaultCollapsed);
    const stacked = variant === "stacked";
    const toothDef = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].find((x)=>x.fdi === t.fdi);
    const labelName = toothDisplayName(t.fdi);
    const histRows = t.treatmentHistoryRows?.length ? t.treatmentHistoryRows : (t.treatmentHistory || []).map((line)=>({
            name: line
        }));
    const hasHistory = histRows.length > 0;
    const hasFindings = (t.findings?.length ?? 0) > 0;
    const hasProcedures = (t.procedures?.length ?? 0) > 0;
    const hasNote = !!t.scannerNotes?.trim();
    const dxArrPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalExaminationToothBlock.useMemo[dxArrPreview]": ()=>{
            const raw = [
                ...toothDiagnosisSet(t)
            ];
            if (scanImplantRedundantWithNarrative(t, histRows)) {
                return raw.filter({
                    "DentalExaminationToothBlock.useMemo[dxArrPreview]": (d)=>d !== "Implant"
                }["DentalExaminationToothBlock.useMemo[dxArrPreview]"]);
            }
            return raw;
        }
    }["DentalExaminationToothBlock.useMemo[dxArrPreview]"], [
        t,
        histRows
    ]);
    const hasDx = dxArrPreview.length > 0;
    const hasBody = hasHistory || hasFindings || hasProcedures || hasNote || hasDx;
    const canvasFindings = dentalScanToCanvasFindings(t.findings);
    const historyLines = histRows.map((r)=>formatHistoryLineParts(r).copyText);
    const findingLines = (t.findings ?? []).map((f)=>formatPrimaryDetail(findingParts(f)));
    const procedureLines = (t.procedures ?? []).map((p)=>formatPrimaryDetail(procedureParts(p)));
    const dxLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalExaminationToothBlock.useMemo[dxLines]": ()=>dxArrPreview.map({
                "DentalExaminationToothBlock.useMemo[dxLines]": (d)=>`Dx: ${d}`
            }["DentalExaminationToothBlock.useMemo[dxLines]"])
    }["DentalExaminationToothBlock.useMemo[dxLines]"], [
        dxArrPreview
    ]);
    const toothTitle = labelName ?? `Tooth ${t.fdi}`;
    const previewTags = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-wrap items-center gap-1", stacked ? "py-0.5" : "px-3 pb-2.5 pl-[62px] pt-1"),
        children: [
            dxArrPreview.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DrPreviewTag, {
                    icon: "diagnosis",
                    label: d
                }, `dx-${d}`, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                    lineNumber: 297,
                    columnNumber: 9
                }, this)),
            histRows.map((r, i)=>{
                const hp = formatHistoryLineParts(r);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DrPreviewTag, {
                    icon: "clipboard-activity",
                    label: hp.primary
                }, `h-${i}-${hp.primary}`, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                    lineNumber: 301,
                    columnNumber: 16
                }, this);
            }),
            (t.findings ?? []).map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DrPreviewTag, {
                    icon: "diagnosis",
                    label: f.type
                }, `f-${i}-${f.type}`, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                    lineNumber: 304,
                    columnNumber: 9
                }, this)),
            (t.procedures ?? []).map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DrPreviewTag, {
                    icon: "surgical-scissors-02",
                    label: p.name?.trim() || "Procedure"
                }, `p-${i}-${p.name ?? i}`, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this)),
            hasNote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DrPreviewTag, {
                icon: "note-2",
                label: "Notes"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 313,
                columnNumber: 18
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
        lineNumber: 290,
        columnNumber: 5
    }, this);
    const showPreviewRow = dxArrPreview.length > 0 || histRows.length > 0 || (t.findings?.length ?? 0) > 0 || (t.procedures?.length ?? 0) > 0 || hasNote;
    const structuredDetails = hasBody ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("space-y-4", stacked ? "py-0" : "px-3 py-2.5"),
        children: [
            hasDx ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatStructuredSection, {
                label: "Diagnoses",
                icon: "diagnosis",
                copyTooltip: `Copy diagnoses for ${DENTAL_EXAMINATION}`,
                onCopySection: ()=>onCopySectionLines(dxLines, `dx-${t.fdi}`),
                isTouch: isTouch,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "flex flex-col gap-2 pl-0.5",
                    children: dxArrPreview.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RxBulletLine, {
                            primary: d,
                            copyText: d,
                            onCopyLine: ()=>onCopyClipboard(d, `th-${t.fdi}-dx-${i}`),
                            isTouch: isTouch
                        }, i, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                            lineNumber: 336,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                    lineNumber: 334,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 327,
                columnNumber: 9
            }, this) : null,
            hasHistory ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatStructuredSection, {
                label: "Treatment history",
                icon: "clipboard-activity",
                copyTooltip: `Copy treatment history for ${DENTAL_EXAMINATION}`,
                onCopySection: ()=>onCopySectionLines(historyLines, `th-${t.fdi}`),
                isTouch: isTouch,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "flex flex-col gap-2 pl-0.5",
                    children: histRows.map((r, i)=>{
                        const p = formatHistoryLineParts(r);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RxBulletLine, {
                            primary: p.primary,
                            bracket: p.bracket,
                            tail: p.tail,
                            copyText: p.copyText,
                            onCopyLine: ()=>onCopyClipboard(p.copyText, `th-${t.fdi}-hist-${i}`),
                            isTouch: isTouch
                        }, i, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                            lineNumber: 360,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                    lineNumber: 356,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 349,
                columnNumber: 9
            }, this) : null,
            hasFindings ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatStructuredSection, {
                label: "Findings",
                icon: "diagnosis",
                copyTooltip: `Copy all findings for ${DENTAL_EXAMINATION}`,
                onCopySection: ()=>onCopySectionLines(findingLines, `fg-${t.fdi}`),
                isTouch: isTouch,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "flex flex-col gap-2 pl-0.5",
                    children: (t.findings ?? []).map((f, i)=>{
                        const p = findingParts(f);
                        const line = formatPrimaryDetail(p);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RxBulletLine, {
                            primary: p.primary,
                            bracket: p.detail,
                            copyText: line,
                            onCopyLine: ()=>{
                                onCopyClipboard(line, `th-${t.fdi}-find-${i}`);
                                onMergeFindingToDental?.(t.fdi, f);
                            },
                            isTouch: isTouch
                        }, i, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                            lineNumber: 388,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                    lineNumber: 383,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 376,
                columnNumber: 9
            }, this) : null,
            hasProcedures ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatStructuredSection, {
                label: "Procedures",
                icon: "surgical-scissors-02",
                copyTooltip: `Copy procedures for ${DENTAL_EXAMINATION}`,
                onCopySection: ()=>onCopySectionLines(procedureLines, `pr-${t.fdi}`),
                isTouch: isTouch,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "flex flex-col gap-2 pl-0.5",
                    children: (t.procedures ?? []).map((pRow, i)=>{
                        const p = procedureParts(pRow);
                        const line = formatPrimaryDetail(p);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RxBulletLine, {
                            primary: p.primary,
                            bracket: p.detail,
                            copyText: line,
                            onCopyLine: ()=>onCopyClipboard(line, `th-${t.fdi}-proc-${i}`),
                            isTouch: isTouch
                        }, i, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                            lineNumber: 418,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                    lineNumber: 413,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 406,
                columnNumber: 9
            }, this) : null,
            hasNote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatStructuredSection, {
                label: noteSectionLabel,
                icon: "note-2",
                copyTooltip: `Copy note for ${DENTAL_EXAMINATION}`,
                onCopySection: ()=>onCopyClipboard(t.scannerNotes.trim(), `note-${t.fdi}`),
                isTouch: isTouch,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "group/note flex items-start gap-1 pl-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "min-w-0 flex-1 text-[12px] font-normal leading-[1.55] text-tp-slate-700",
                            children: t.scannerNotes.trim()
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                            lineNumber: 441,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                            label: "Copy note text",
                            onAction: ()=>onCopyClipboard(t.scannerNotes.trim(), `note-${t.fdi}-line`),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                size: 14,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("!mt-0.5 !flex !h-7 !w-7 !shrink-0 !items-center !justify-center !rounded-md !text-[var(--tp-blue-600,#4B4AD5)] transition-opacity hover:!bg-[var(--tp-blue-50)]", isTouch ? "opacity-80" : "opacity-0 group-hover/dental-section:opacity-100 group-hover/note:opacity-100 focus-within:opacity-100")
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                                lineNumber: 443,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                            lineNumber: 442,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                    lineNumber: 440,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 433,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
        lineNumber: 325,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("py-2 text-[12px] text-tp-slate-500", !stacked && "px-3"),
        children: emptyBodyHint
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
        lineNumber: 456,
        columnNumber: 5
    }, this);
    /** Stacked: split preview / details for CardShell pinned body */ if (stacked && stackedPart === "preview") {
        return showPreviewRow ? previewTags : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-0.5 text-[12px] text-tp-slate-400",
            children: "No quick tags for this tooth."
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
            lineNumber: 461,
            columnNumber: 43
        }, this);
    }
    if (stacked && stackedPart === "details") {
        return structuredDetails;
    }
    /** Legacy stacked one-column (should not be used) */ if (stacked) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-2",
            children: [
                showPreviewRow ? previewTags : null,
                structuredDetails
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
            lineNumber: 470,
            columnNumber: 7
        }, this);
    }
    const headerBar = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-b border-[var(--tp-slate-100,#F1F5F9)]",
        style: {
            background: "linear-gradient(180deg, rgba(75,74,213,0.06) 0%, rgba(255,255,255,0.92) 100%)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2.5 px-3 py-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shrink-0 rounded-[10px] bg-white/80 p-0.5 ring-1 ring-tp-slate-100",
                        children: toothDef ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$MiniToothCanvas$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniToothCanvas"], {
                            tooth: toothDef,
                            size: 48,
                            diagnoses: toothDiagnosisSet(t),
                            isImplant: !!t.implant,
                            findings: canvasFindings
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                            lineNumber: 487,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-12 w-12 items-center justify-center text-[10px] text-tp-slate-400",
                            children: "—"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                            lineNumber: 495,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                        lineNumber: 485,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 flex-col gap-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "min-w-0 truncate text-[14px] font-semibold leading-tight text-tp-slate-900",
                                    title: toothTitle,
                                    children: toothTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                                    lineNumber: 500,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex h-[22px] w-fit min-w-[2.25rem] items-center justify-center rounded-[4px] bg-tp-slate-100 px-2 font-mono text-[11px] font-bold tabular-nums leading-none text-tp-slate-600",
                                    children: [
                                        "T",
                                        t.fdi
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                                    lineNumber: 506,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                            lineNumber: 499,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                        lineNumber: 498,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex shrink-0 items-center gap-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                                label: `Apply tooth T${t.fdi} to ${DENTAL_EXAMINATION}`,
                                onAction: ()=>onApplyToothToRxPad(t),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                    size: 18,
                                    className: "!flex !h-9 !w-9 !items-center !justify-center !rounded-lg hover:bg-white/90"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                                    lineNumber: 513,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                                lineNumber: 512,
                                columnNumber: 11
                            }, this),
                            collapsible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-tp-slate-600 outline-none transition-colors hover:bg-white/90 hover:text-tp-slate-900 focus-visible:ring-2 focus-visible:ring-[var(--tp-blue-500,#4B4AD5)] focus-visible:ring-offset-1",
                                    "aria-expanded": open,
                                    "aria-label": open ? "Collapse tooth details" : "Expand tooth details",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__["ArrowDown2"], {
                                        size: 18,
                                        variant: "Linear",
                                        color: "currentColor",
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-transform duration-200", open ? "rotate-180" : "rotate-0")
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                                        lineNumber: 526,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                                    lineNumber: 520,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                                lineNumber: 519,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                        lineNumber: 511,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 484,
                columnNumber: 7
            }, this),
            showPreviewRow ? previewTags : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
        lineNumber: 478,
        columnNumber: 5
    }, this);
    const shell = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-hidden rounded-[12px] border border-tp-slate-100 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]",
        children: [
            headerBar,
            collapsible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                className: "overflow-hidden",
                children: structuredDetails
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
                lineNumber: 545,
                columnNumber: 9
            }, this) : structuredDetails
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
        lineNumber: 542,
        columnNumber: 5
    }, this);
    if (!collapsible) return shell;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Collapsible"], {
        open: open,
        onOpenChange: setOpen,
        children: shell
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx",
        lineNumber: 557,
        columnNumber: 5
    }, this);
}
_s(DentalExaminationToothBlock, "nvIiUEtG39SmgztiuPYHxAy78Bw=");
_c3 = DentalExaminationToothBlock;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "DrPreviewTag");
__turbopack_context__.k.register(_c1, "RxBulletLine");
__turbopack_context__.k.register(_c2, "ChatStructuredSection");
__turbopack_context__.k.register(_c3, "DentalExaminationToothBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CardShell",
    ()=>CardShell,
    "SourceInfoIcon",
    ()=>SourceInfoIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowDown2.js [app-client] (ecmascript) <export default as ArrowDown2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowUp2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowUp2.js [app-client] (ecmascript) <export default as ArrowUp2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$InfoCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/InfoCircle.js [app-client] (ecmascript) <export default as InfoCircle>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function SourceInfoIcon({ sources }) {
    _s();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative ml-[4px] flex-shrink-0",
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        onClick: ()=>setIsHovered((v)=>!v),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "flex h-[20px] w-[20px] items-center justify-center rounded-full text-tp-slate-500 transition-colors hover:text-tp-blue-600 hover:bg-tp-slate-100",
                "aria-label": "Data sources",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$InfoCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoCircle$3e$__["InfoCircle"], {
                    size: 14,
                    variant: "Bold"
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            isHovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-full z-[100] mt-[4px] min-w-[160px] max-w-[220px] rounded-[8px] border border-tp-slate-100/80 bg-white/95 px-[10px] py-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-[4px] text-[12px] font-semibold tracking-wider text-tp-slate-400",
                        children: "Sources"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-[3px]",
                        children: sources.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-[5px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[5px] w-[5px] flex-shrink-0 rounded-full bg-tp-violet-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                        lineNumber: 37,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] leading-[1.4] text-tp-slate-600",
                                        children: src
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                        lineNumber: 38,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                lineNumber: 36,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(SourceInfoIcon, "FPQn8a98tPjpohC7NUYORQR8GJE=");
_c = SourceInfoIcon;
function CardShell({ icon, title, date, tpIconName, badge, copyAll, copyAllTooltip, collapsible = true, defaultCollapsed = false, actions, sidebarLink, headerExtra, collapseIcon = "chevron", largeCollapseControl = false, dataSources, leadingVisual, pinnedBody, badgeBelowTitle = false, children }) {
    _s1();
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultCollapsed);
    const [copyHovered, setCopyHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [copyInlineAck, setCopyInlineAck] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const runCopyAll = ()=>{
        copyAll?.();
        if (!copyAll) return;
        setCopyInlineAck(true);
        window.setTimeout(()=>setCopyInlineAck(false), 1800);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full overflow-hidden rounded-[14px] bg-white",
        style: {
            border: "1px solid transparent",
            backgroundImage: "linear-gradient(white, white), linear-gradient(180deg, rgba(75,74,213,0.18) 0%, rgba(75,74,213,0.04) 25%, rgba(23,23,37,0.02) 50%, rgba(75,74,213,0.04) 75%, rgba(75,74,213,0.18) 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex gap-[7px] px-3 py-[11px]", leadingVisual || badgeBelowTitle || date && !leadingVisual ? "items-start" : "items-center"),
                style: {
                    background: "linear-gradient(180deg, rgba(75,74,213,0.05) 0%, #FFFFFF 100%)",
                    borderBottom: "1px solid var(--tp-slate-50, #F8FAFC)"
                },
                children: [
                    leadingVisual ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white ring-1 ring-tp-slate-100",
                        children: leadingVisual
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-[8px]",
                        style: {
                            background: "var(--tp-blue-50, rgba(75, 74, 213, 0.08))"
                        },
                        children: tpIconName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                            name: tpIconName,
                            variant: "bulk",
                            size: 15,
                            color: "var(--tp-blue-500, #4B4AD5)"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                            lineNumber: 146,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: "var(--tp-blue-500, #4B4AD5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            },
                            children: icon
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                            lineNumber: 148,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-col text-tp-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "group/title relative max-w-[min(100%,min(90vw,200px))] truncate text-[13px] font-semibold leading-[1.4]",
                                title: title,
                                children: [
                                    title,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pointer-events-none absolute bottom-full left-0 z-50 mb-1 hidden max-w-[min(90vw,320px)] whitespace-normal rounded-[4px] bg-tp-slate-800 px-2 py-1 text-[10px] font-normal leading-snug text-white shadow-md group-hover/title:block group-focus-within/title:block",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            badge && badgeBelowTitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-0.5 inline-flex h-[22px] w-fit max-w-full items-center truncate rounded-[4px] px-2 font-mono text-[11px] font-bold tabular-nums leading-none",
                                style: {
                                    background: badge.bg,
                                    color: badge.color
                                },
                                title: badge.label,
                                children: badge.label
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this) : null,
                            date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-[1px] max-w-[min(100%,min(90vw,400px))] break-words text-[11px] font-normal leading-[1.4] text-tp-slate-400",
                                title: date,
                                children: date
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    badge && !badgeBelowTitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "group/badge relative max-w-[100px] truncate rounded-[4px] px-[6px] py-[3px] text-[12px] font-semibold leading-[1.2]",
                        style: {
                            background: badge.bg,
                            color: badge.color
                        },
                        title: badge.label,
                        children: [
                            badge.label,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "pointer-events-none absolute bottom-full right-0 z-50 mb-1 hidden max-w-[240px] whitespace-normal rounded-[4px] bg-tp-slate-800 px-2 py-1 text-[10px] font-normal leading-snug text-white shadow-md group-hover/badge:block",
                                children: badge.label
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this) : null,
                    headerExtra && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-[4px] flex-shrink-0",
                        children: headerExtra
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 201,
                        columnNumber: 25
                    }, this),
                    (copyAll || collapsible) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-2 flex flex-shrink-0 items-center gap-4",
                        children: [
                            copyAll && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex max-w-[min(160px,42vw)] flex-shrink-0 items-center justify-end gap-1.5",
                                children: copyInlineAck ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate text-[11px] font-semibold leading-tight text-emerald-600",
                                    title: "Copied to RxPad",
                                    children: "Copied to RxPad"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                    lineNumber: 209,
                                    columnNumber: 19
                                }, this) : copyAllTooltip ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                                    label: copyAllTooltip,
                                    onAction: runCopyAll,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[6px] transition-colors", copyHovered ? "text-tp-blue-600 bg-tp-blue-50/80" : "text-tp-blue-500"),
                                        onMouseEnter: ()=>setCopyHovered(true),
                                        onMouseLeave: ()=>setCopyHovered(false),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                            size: 17,
                                            variant: copyHovered ? "Bulk" : "Linear"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                            lineNumber: 222,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                        lineNumber: 214,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                    lineNumber: 213,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                    size: 17,
                                    onClick: runCopyAll
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                    lineNumber: 226,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                lineNumber: 207,
                                columnNumber: 15
                            }, this),
                            collapsible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setCollapsed(!collapsed),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-shrink-0 items-center justify-center rounded-[6px] text-tp-slate-600 transition-colors", largeCollapseControl ? "h-[26px] w-[26px]" : "h-[22px] w-[22px]", collapseIcon === "eye" ? "bg-transparent hover:bg-tp-slate-100" : "bg-tp-slate-100 hover:bg-tp-slate-200"),
                                "aria-expanded": !collapsed,
                                "aria-label": collapsed ? "Expand card" : "Collapse card",
                                children: collapseIcon === "eye" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                    className: largeCollapseControl ? "h-[18px] w-[18px]" : "h-4 w-4",
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                    lineNumber: 245,
                                    columnNumber: 19
                                }, this) : collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__["ArrowDown2"], {
                                    size: largeCollapseControl ? 14 : 12,
                                    variant: "Linear"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                    lineNumber: 247,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowUp2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp2$3e$__["ArrowUp2"], {
                                    size: largeCollapseControl ? 14 : 12,
                                    variant: "Linear"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                    lineNumber: 249,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                                lineNumber: 231,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            pinnedBody && collapsible && collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-tp-slate-50 px-3 py-[8px]",
                style: {
                    borderTop: "1px solid var(--tp-slate-50, #F8FAFC)"
                },
                children: pinnedBody
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                lineNumber: 259,
                columnNumber: 9
            }, this),
            pinnedBody && !collapsible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-tp-slate-50 px-3 py-[8px]",
                style: {
                    borderTop: "1px solid var(--tp-slate-50, #F8FAFC)"
                },
                children: pinnedBody
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                lineNumber: 267,
                columnNumber: 9
            }, this),
            (!collapsible || !collapsed) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-[10px]",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 276,
                        columnNumber: 11
                    }, this),
                    actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto px-3 pt-[2px] pb-[10px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1 whitespace-nowrap",
                            children: actions
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                            lineNumber: 283,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 282,
                        columnNumber: 13
                    }, this),
                    sidebarLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-[8px]",
                        style: {
                            borderTop: "0.5px solid var(--tp-slate-50, #F8FAFC)",
                            background: "linear-gradient(180deg, #FFFFFF 0%, rgba(75,74,213,0.04) 100%)"
                        },
                        children: sidebarLink
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
                        lineNumber: 291,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_s1(CardShell, "AnoNH0Thtu72MQW9xmoAxE7dYfQ=");
_c1 = CardShell;
var _c, _c1;
__turbopack_context__.k.register(_c, "SourceInfoIcon");
__turbopack_context__.k.register(_c1, "CardShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineDataRow",
    ()=>InlineDataRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$FlagArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/FlagArrow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-touch-device.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/sectionInlineKey.ts [app-client] (ecmascript)");
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
const FLAG_STYLES = {
    normal: "text-tp-slate-800",
    high: "text-tp-error-600 font-medium",
    low: "text-tp-error-600 font-medium",
    warning: "text-tp-warning-600 font-medium",
    success: "text-tp-success-600 font-medium"
};
/** Tooltip mapping for known tag labels */ const TAG_TOOLTIPS = {
    "Today's Vitals": {
        tooltip: "Open detailed vitals",
        copyTooltip: "Fill all vitals to RxPad"
    },
    "Key Labs": {
        tooltip: "Open lab results",
        copyTooltip: "Fill all lab values to RxPad"
    },
    "History": {
        tooltip: "Open medical history",
        copyTooltip: "Fill history to RxPad"
    },
    "Medical History": {
        tooltip: "Open medical history",
        copyTooltip: "Fill history to RxPad"
    },
    "Last Visit": {
        tooltip: "Open past visits",
        copyTooltip: "Fill last visit to RxPad"
    },
    "Symptoms": {
        tooltip: "View symptoms",
        copyTooltip: "Fill all symptoms to RxPad"
    },
    "Examination": {
        tooltip: "View examination",
        copyTooltip: "Fill examination to RxPad"
    },
    "Diagnosis": {
        tooltip: "View diagnosis",
        copyTooltip: "Fill diagnosis to RxPad"
    },
    "Medication": {
        tooltip: "View medication",
        copyTooltip: "Fill medication to RxPad"
    },
    "Investigation": {
        tooltip: "View investigations",
        copyTooltip: "Fill investigations to RxPad"
    },
    "Advice": {
        tooltip: "View advice",
        copyTooltip: "Fill advice to RxPad"
    },
    "Follow-up": {
        tooltip: "View follow-up",
        copyTooltip: "Fill follow-up to RxPad"
    }
};
/** Truncate text for display */ function truncate(text, maxLen = 30) {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen - 3) + "...";
}
/** Check if a value is compound (contains comma-separated sub-values) */ function isCompoundValue(value) {
    return value.includes(", ");
}
/** Split compound value into individual sub-values, respecting parentheses */ function splitCompoundValue(value) {
    const parts = [];
    let depth = 0;
    let current = "";
    for (const ch of value){
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
/** Extract a clean display name from a sub-value, e.g. "Diabetes (1yr)" -> "Diabetes" */ function extractDisplayName(subValue) {
    // Remove parenthetical suffixes like "(1yr)", "(6mo)" for tooltip label
    const match = subValue.match(/^([^(]+)/);
    return match ? match[1].trim() : subValue.trim();
}
/**
 * ═══════════════════════════════════════════════════════════════
 * COLOR HIERARCHY SYSTEM FOR INLINE VALUES
 * ═══════════════════════════════════════════════════════════════
 *
 * Simple rule:
 *   • Text before brackets → tp-slate-700 (primary, dark)
 *   • Text inside brackets → tp-slate-400 (secondary, lighter)
 *   • Pipe dividers ( | ) and dot ( · ) → tp-slate-200 (lightest)
 *   • Value keys (BP:, lab name:, etc.) → SECTION_INLINE_SUBKEY_CLASS (shared with SbarOverviewCard / other cards)
 *   • Commas stay same color as surrounding text
 *
 * That's it. No complex classification of what's "numeric" vs "clinical".
 * The bracket is the only delimiter between primary and secondary.
 *
 * ── Layout principle (dense clinical rows) ──
 * Do not wrap section content in flex-row + flex-wrap for Sx | Dx | Rx style
 * rows: flex items get min-width:auto and tend to jump to the next line as
 * whole chunks, wasting horizontal space. Prefer normal inline flow (inline /
 * inline-block) so prose wraps at word boundaries and pipe dividers stay
 * mid-line until the viewport forces a break. Simple value cells here use
 * `inline`, not `inline-flex`, so long vitals/labs/last-visit lines use the
 * full card width.
 *
 * Examples:
 *   "Diabetes (2yr, Active)" → "Diabetes" dark + "(2yr, Active)" light
 *   "35-40 days (Irregular)" → "35-40 days" dark + "(Irregular)" light
 *   "7 days · Heavy (5 pads/day)" → "7 days" dark + "·" lightest + "Heavy" dark + "(5 pads/day)" light
 * ═══════════════════════════════════════════════════════════════
 */ function renderWithColorHierarchy(text, flagClass) {
    // 1. Parenthetical suffixes: "Diabetes (1yr)" → primary + (secondary)
    const parenMatch = text.match(/^(.+?)(\s*\([^)]+\))$/);
    if (parenMatch) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: flagClass,
                    children: parenMatch[1].trim()
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-tp-slate-400 font-normal",
                    children: parenMatch[2]
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    // 2. Dot/bullet separated: "7 days · Heavy (5 pads/day)"
    if (text.includes(" · ")) {
        const segments = text.split(" · ");
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: segments.map((seg, i)=>{
                const trimSeg = seg.trim();
                const innerParen = trimSeg.match(/^(.+?)(\s*\([^)]+\))$/);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                    children: [
                        i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-tp-slate-200",
                            children: " · "
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                            lineNumber: 153,
                            columnNumber: 25
                        }, this),
                        innerParen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: flagClass,
                                    children: innerParen[1].trim()
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                                    lineNumber: 156,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-tp-slate-400 font-normal",
                                    children: innerParen[2]
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                                    lineNumber: 157,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: flagClass,
                            children: trimSeg
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                            lineNumber: 160,
                            columnNumber: 17
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                    lineNumber: 152,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false);
    }
    // 3. Default: primary (dark)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: flagClass,
        children: text
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
        lineNumber: 170,
        columnNumber: 10
    }, this);
}
function InlineDataRow({ tag, tagIcon, tagVariant, values, onTagClick, onTagCopy, className, source, allowCopyToRxPad, copyDestination = "RxPad", trailingNote, showValueDivider = true }) {
    _s();
    const isTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"])();
    const showCopy = source !== "existing" || allowCopyToRxPad === true;
    const tooltips = TAG_TOOLTIPS[tag];
    const destinationLabel = copyDestination.trim() || "RxPad";
    const sectionCopyTooltip = destinationLabel === "RxPad" ? tooltips?.copyTooltip || `Fill all ${tag.toLowerCase()} to RxPad` : `Fill all ${tag.toLowerCase()} to ${destinationLabel}`;
    const handleCopyText = (text)=>{
        navigator.clipboard?.writeText(text);
    };
    const handleCopyAll = ()=>{
        const text = values.map((v)=>`${v.key}: ${v.value}`).join("\n");
        navigator.clipboard?.writeText(text);
        onTagCopy?.();
    };
    const tagHidden = !tag.trim();
    /** Preserve sidebar nav when tag is omitted (no SectionTag hit target) */ const rowActsAsTagNav = tagHidden && !!onTagClick && !showCopy;
    /** Render a single (non-compound) value with ActionableTooltip */ /** Render a single (non-compound) value with color hierarchy applied */ const renderSimpleValue = (v)=>{
        const flagArrowType = v.flag === "high" ? "high" : v.flag === "low" ? "low" : null;
        // Keep Unicode in copy text for clipboard readability
        const flagPrefix = flagArrowType === "high" ? "\u25B2" : flagArrowType === "low" ? "\u25BC" : "";
        const copyText = `${v.key}: ${flagPrefix}${v.value}`;
        const tooltipLabel = `Fill ${truncate(copyText)} to ${destinationLabel}`;
        const flagClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(FLAG_STYLES[v.flag || "normal"]);
        if (!showCopy) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline",
                children: [
                    v.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"],
                        children: [
                            v.key,
                            ": "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                        lineNumber: 222,
                        columnNumber: 21
                    }, this),
                    flagArrowType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$FlagArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlagArrow"], {
                        flag: flagArrowType,
                        className: "mr-[2px]"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                        lineNumber: 223,
                        columnNumber: 29
                    }, this),
                    renderWithColorHierarchy(v.value, flagClass)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                lineNumber: 221,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
            label: tooltipLabel,
            onAction: ()=>handleCopyText(copyText),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline cursor-pointer",
                children: [
                    v.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"],
                        children: [
                            v.key,
                            ": "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                        lineNumber: 235,
                        columnNumber: 21
                    }, this),
                    flagArrowType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$FlagArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlagArrow"], {
                        flag: flagArrowType,
                        className: "mr-[2px]"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                        lineNumber: 236,
                        columnNumber: 29
                    }, this),
                    renderWithColorHierarchy(v.value, flagClass)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                lineNumber: 234,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
            lineNumber: 230,
            columnNumber: 7
        }, this);
    };
    /** Render a compound value (comma-separated) with individual sub-value tooltips */ const renderCompoundValue = (v)=>{
        const subValues = splitCompoundValue(v.value);
        const count = subValues.length;
        const keyTooltipLabel = `Fill ${count} ${v.key.toLowerCase()} to ${destinationLabel}`;
        const keyCopyText = `${v.key}: ${v.value}`;
        if (!showCopy) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline",
                children: [
                    v.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"],
                        children: [
                            v.key,
                            ": "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                        lineNumber: 253,
                        columnNumber: 21
                    }, this),
                    subValues.map((sub, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                renderWithColorHierarchy(sub, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(FLAG_STYLES[v.flag || "normal"])),
                                j < subValues.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-tp-slate-400",
                                    children: ", "
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                                    lineNumber: 258,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, j, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                lineNumber: 252,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                    label: keyTooltipLabel,
                    onAction: ()=>handleCopyText(keyCopyText),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"], "cursor-pointer"),
                        children: v.key ? `${v.key}: ` : ""
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                        lineNumber: 273,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                    lineNumber: 269,
                    columnNumber: 9
                }, this),
                subValues.map((sub, j)=>{
                    const displayName = extractDisplayName(sub);
                    const subTooltipLabel = `Fill ${truncate(displayName)} to ${destinationLabel}`;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                                label: subTooltipLabel,
                                onAction: ()=>handleCopyText(sub),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cursor-pointer",
                                    children: renderWithColorHierarchy(sub, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(FLAG_STYLES[v.flag || "normal"]))
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                                    lineNumber: 287,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                                lineNumber: 283,
                                columnNumber: 15
                            }, this),
                            j < subValues.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-tp-slate-400",
                                children: ", "
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                                lineNumber: 292,
                                columnNumber: 17
                            }, this)
                        ]
                    }, j, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                        lineNumber: 282,
                        columnNumber: 13
                    }, this);
                })
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
            lineNumber: 267,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative rounded-[4px] px-[3px] -mx-[3px] text-[14px] leading-[1.7] text-tp-slate-800 transition-colors", showCopy ? "group/section pr-[20px] hover:bg-tp-slate-50/80" : "", rowActsAsTagNav && "cursor-pointer", className),
        role: rowActsAsTagNav ? "button" : undefined,
        tabIndex: rowActsAsTagNav ? 0 : undefined,
        onClick: rowActsAsTagNav ? onTagClick : undefined,
        onKeyDown: rowActsAsTagNav ? (e)=>{
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onTagClick?.();
            }
        } : undefined,
        children: [
            !tagHidden ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTag"], {
                        label: tag,
                        icon: tagIcon,
                        variant: tagVariant,
                        onClick: onTagClick,
                        tooltip: tooltips?.tooltip
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, this),
                    " "
                ]
            }, void 0, true) : null,
            values.map((v, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        isCompoundValue(v.value) ? renderCompoundValue(v) : renderSimpleValue(v),
                        i < values.length - 1 && (showValueDivider ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mx-[6px] text-tp-slate-200",
                            children: "|"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                            lineNumber: 347,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-tp-slate-400",
                            children: ", "
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                            lineNumber: 349,
                            columnNumber: 15
                        }, this))
                    ]
                }, v.key ? `${v.key}-${i}` : `v-${i}`, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                    lineNumber: 340,
                    columnNumber: 9
                }, this)),
            trailingNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-[4px] text-[14px] italic text-tp-slate-400 font-normal",
                children: [
                    "— ",
                    trailingNote
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                lineNumber: 356,
                columnNumber: 9
            }, this),
            showCopy && values.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                label: sectionCopyTooltip,
                onAction: handleCopyAll,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute right-0 top-[2px] transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/section:opacity-100"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                    size: 14,
                    onClick: handleCopyAll
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                    lineNumber: 368,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
                lineNumber: 363,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/InlineDataRow.tsx",
        lineNumber: 302,
        columnNumber: 5
    }, this);
}
_s(InlineDataRow, "n9byzPbSyiaFMQC4OHfbkLW3ZW0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"]
    ];
});
_c = InlineDataRow;
var _c;
__turbopack_context__.k.register(_c, "InlineDataRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SidebarLink",
    ()=>SidebarLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function SidebarLink({ text, onClick }) {
    // Strip any trailing arrow characters from text (→, \u2192, etc.)
    const cleanText = text.replace(/[\s]*[→\u2192\u279C\u2794]+[\s]*$/g, "").trim();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: "group/link inline-flex h-[36px] items-center gap-[4px] rounded-[10px] px-2 text-left text-[14px] font-medium text-tp-blue-500 transition-all hover:bg-tp-blue-50/60 hover:text-tp-blue-600",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "group-hover/link:underline",
                children: cleanText
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "14",
                height: "14",
                viewBox: "0 0 16 16",
                fill: "none",
                className: "flex-shrink-0 transition-transform duration-200 group-hover/link:translate-x-[2px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M6 3L11 8L6 13",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = SidebarLink;
var _c;
__turbopack_context__.k.register(_c, "SidebarLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FooterCTA",
    ()=>FooterCTA,
    "FooterCTAGroup",
    ()=>FooterCTAGroup,
    "FooterCTAGroupTertiary",
    ()=>FooterCTAGroupTertiary,
    "FooterDivider",
    ()=>FooterDivider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
// Tertiary tones (no border, transparent bg)
const tertiaryTones = {
    primary: "text-tp-blue-500 hover:bg-tp-blue-50/60",
    neutral: "text-tp-slate-400"
};
// Secondary/bordered tones (border + white bg)
const borderedTones = {
    secondary: "border-tp-blue-200 text-tp-blue-500 hover:border-tp-blue-300 hover:bg-tp-blue-50/60",
    danger: "border-tp-error-200 text-tp-error-600 hover:border-tp-error-300 hover:bg-tp-error-50",
    success: "border-tp-success-200 text-tp-success-600 hover:border-tp-success-300 hover:bg-tp-success-50"
};
function isBorderedTone(tone) {
    return tone === "secondary" || tone === "danger" || tone === "success";
}
function buildClassName({ tone = "primary", disabled = false, fullWidth = false, compact = false }) {
    // Single CTA: hug content starting at min 200px, grow with text, cap at available space.
    // Two CTAs (fullWidth): flex-1 each, equal split filling full footer width.
    // Compact: no min-width, just hug the text.
    const widthClass = fullWidth ? "flex-1 w-0" : compact ? "" : "min-w-[200px]";
    const base = `${widthClass} inline-flex h-[36px] items-center justify-center gap-[4px] rounded-[10px] px-3 text-[14px] font-medium transition-colors`;
    const bordered = isBorderedTone(tone);
    const toneClass = bordered ? `border bg-white ${borderedTones[tone] || borderedTones.secondary}` : `${tertiaryTones[tone] || tertiaryTones.primary}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(base, toneClass, disabled && "cursor-not-allowed opacity-40 pointer-events-none");
}
function FooterCTA({ label, onClick, href, target, rel, tone = "primary", iconLeft, iconRight, disabled = false, align = "left", fullWidth = false, compact = false }) {
    const className = buildClassName({
        tone,
        disabled,
        fullWidth,
        compact
    });
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            iconLeft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex-shrink-0",
                children: iconLeft
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
                lineNumber: 110,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "truncate",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            iconRight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex-shrink-0",
                children: iconRight
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
                lineNumber: 112,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true);
    // When fullWidth (2-CTA layout): render button directly with flex-1, no wrapper div
    if (fullWidth) {
        if (href) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: href,
                target: target,
                rel: rel,
                className: className,
                children: content
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
                lineNumber: 119,
                columnNumber: 14
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onClick,
            disabled: disabled,
            className: className,
            children: content
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
            lineNumber: 121,
            columnNumber: 12
        }, this);
    }
    // Single CTA: wrap in left-aligned flex container
    const wrapperClassName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex", align === "center" ? "justify-center" : "justify-start");
    if (href) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: wrapperClassName,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: href,
                target: target,
                rel: rel,
                className: className,
                children: content
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
                lineNumber: 130,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
            lineNumber: 129,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: wrapperClassName,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onClick,
            disabled: disabled,
            className: className,
            children: content
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
            lineNumber: 137,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_c = FooterCTA;
function FooterCTAGroupTertiary({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_c1 = FooterCTAGroupTertiary;
function FooterCTAGroup({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-6",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_c2 = FooterCTAGroup;
function FooterDivider() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-[20px] flex-shrink-0",
        style: {
            width: "1px",
            background: "linear-gradient(180deg, transparent 0%, #CBD5E1 50%, transparent 100%)"
        }
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_c3 = FooterDivider;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "FooterCTA");
__turbopack_context__.k.register(_c1, "FooterCTAGroupTertiary");
__turbopack_context__.k.register(_c2, "FooterCTAGroup");
__turbopack_context__.k.register(_c3, "FooterDivider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionRow",
    ()=>ActionRow,
    "ChatPillButton",
    ()=>ChatPillButton,
    "CopyButton",
    ()=>CopyButton,
    "ExternalButton",
    ()=>ExternalButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ActionRow({ items, className }) {
    if (items.length === 0) return null;
    const chatPills = items.filter((i)=>i.type === "chat");
    const otherButtons = items.filter((i)=>i.type !== "chat");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-0", className),
        children: [
            chatPills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1",
                children: chatPills.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatPillButton, {
                        label: item.label,
                        onClick: item.onClick
                    }, item.label, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx",
                        lineNumber: 30,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this),
            chatPills.length > 0 && otherButtons.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "my-1",
                style: {
                    borderTop: "0.5px solid var(--tp-slate-50, #F8FAFC)"
                }
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            otherButtons.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1",
                children: otherButtons.map((item)=>item.type === "copy" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CopyButton, {
                        label: item.label,
                        onClick: item.onClick
                    }, item.label, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx",
                        lineNumber: 45,
                        columnNumber: 17
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExternalButton, {
                        label: item.label,
                        onClick: item.onClick
                    }, item.label, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = ActionRow;
function ChatPillButton({ label, onClick, className }) {
    _s();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-[26px] items-center gap-[3px] rounded-full px-[14px] text-[14px] font-normal transition-all whitespace-nowrap", className),
        style: {
            background: isHovered ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_PILL_BG_HOVER"] : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_PILL_BG"],
            border: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_PILL_BORDER"]
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                background: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_PILL_TEXT_GRADIENT"],
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
            },
            children: label
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(ChatPillButton, "FPQn8a98tPjpohC7NUYORQR8GJE=");
_c1 = ChatPillButton;
function CopyButton({ label, onClick, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-[26px] items-center gap-[3px] rounded-full border-[1.5px] border-tp-blue-500 bg-tp-blue-50 px-2.5 text-[14px] font-medium text-tp-blue-500 transition-colors hover:bg-tp-blue-100", className),
        children: label
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_c2 = CopyButton;
function ExternalButton({ label, onClick, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-[26px] items-center gap-[3px] rounded-full border-[1.5px] border-tp-blue-500 bg-transparent px-2.5 text-[14px] font-medium text-tp-blue-500 transition-colors hover:bg-tp-blue-50", className),
        children: label
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/ActionRow.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_c3 = ExternalButton;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ActionRow");
__turbopack_context__.k.register(_c1, "ChatPillButton");
__turbopack_context__.k.register(_c2, "CopyButton");
__turbopack_context__.k.register(_c3, "ExternalButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ViewToggle",
    ()=>ViewToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
function ViewToggle({ viewMode, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative h-[26px] rounded-[7px] bg-tp-slate-100 p-[2px] inline-flex",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-[2px] h-[22px] w-[calc(50%-2px)] rounded-[5px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-transform duration-200 ease-out pointer-events-none",
                    style: {
                        transform: viewMode === "text" ? "translateX(100%)" : "translateX(0)"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>onChange("graph"),
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-10 flex items-center gap-[4px] px-[12px] text-[12px] font-medium rounded-[5px] transition-colors", viewMode === "graph" ? "text-tp-slate-800" : "text-tp-slate-400"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "10",
                            height: "10",
                            viewBox: "0 0 12 12",
                            fill: "none",
                            className: "shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M1 10L4 5L7 7L11 2",
                                stroke: "currentColor",
                                strokeWidth: "1.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        "Graph"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>onChange("text"),
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-10 flex items-center gap-[4px] px-[12px] text-[12px] font-medium rounded-[5px] transition-colors", viewMode === "text" ? "text-tp-slate-800" : "text-tp-slate-400"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "10",
                            height: "10",
                            viewBox: "0 0 12 12",
                            fill: "none",
                            className: "shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M2 3h8M2 6h6M2 9h7",
                                stroke: "currentColor",
                                strokeWidth: "1.5",
                                strokeLinecap: "round"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        "Text"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/ViewToggle.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = ViewToggle;
var _c;
__turbopack_context__.k.register(_c, "ViewToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/ChartTypeToggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartTypeToggle",
    ()=>ChartTypeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
function ChartTypeToggle({ chartType, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-[26px] rounded-[7px] bg-tp-slate-100 p-[2px] inline-flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[2px] h-[22px] w-[calc(50%-2px)] rounded-[5px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-transform duration-200 ease-out pointer-events-none",
                style: {
                    transform: chartType === "bar" ? "translateX(100%)" : "translateX(0)"
                }
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/ChartTypeToggle.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onChange("line"),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-10 flex items-center px-[10px] text-[12px] font-medium rounded-[5px] transition-colors", chartType === "line" ? "text-tp-slate-800" : "text-tp-slate-400"),
                children: "Line"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/ChartTypeToggle.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onChange("bar"),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-10 flex items-center px-[10px] text-[12px] font-medium rounded-[5px] transition-colors", chartType === "bar" ? "text-tp-slate-800" : "text-tp-slate-400"),
                children: "Bar"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/ChartTypeToggle.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/ChartTypeToggle.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = ChartTypeToggle;
var _c;
__turbopack_context__.k.register(_c, "ChartTypeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/CheckboxRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckboxRow",
    ()=>CheckboxRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
function CheckboxRow({ label, rationale, checked = false, accentColor = "var(--tp-blue-500)", onChange, isLast }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-pointer items-center gap-[8px] py-[6px] text-[14px]"),
        style: !isLast ? {
            borderBottom: "0.5px solid var(--tp-slate-50, #F8FAFC)"
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onChange?.(!checked),
                className: "flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[4px] border-[1.5px] transition-all",
                style: {
                    borderColor: checked ? accentColor : "#CBD5E1",
                    backgroundColor: checked ? accentColor : "transparent"
                },
                children: checked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "10",
                    height: "10",
                    viewBox: "0 0 16 16",
                    fill: "none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M3.5 8.5L6.5 11.5L12.5 4.5",
                        stroke: "white",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CheckboxRow.tsx",
                        lineNumber: 32,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CheckboxRow.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CheckboxRow.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-medium text-tp-slate-800",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CheckboxRow.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            rationale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-auto text-[12px] text-tp-slate-400",
                children: rationale
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CheckboxRow.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CheckboxRow.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = CheckboxRow;
var _c;
__turbopack_context__.k.register(_c, "CheckboxRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OCRPathologyCard",
    ()=>OCRPathologyCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$FlagArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/FlagArrow.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function OCRPathologyCard({ data, onPillTap, onCopy }) {
    _s();
    const [showNormal, setShowNormal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const flaggedParams = data.parameters.filter((p)=>p.flag);
    const normalParams = data.parameters.filter((p)=>!p.flag);
    const visibleParams = showNormal ? data.parameters : flaggedParams;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
            lineNumber: 31,
            columnNumber: 13
        }, void 0),
        tpIconName: "Lab",
        title: data.title,
        badge: flaggedParams.length > 0 ? {
            label: `${flaggedParams.length} flagged`,
            color: "#DC2626",
            bg: "#FEE2E2"
        } : undefined,
        copyAll: ()=>onCopy?.({
                sourceDateLabel: "Today",
                targetSection: "labResults",
                labInvestigations: data.parameters.map((p)=>`${p.name}: ${p.value}${p.refRange ? ` (ref: ${p.refRange})` : ""}`)
            }),
        copyAllTooltip: "Fill complete digitized report to Lab Results",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden rounded-[8px] border border-tp-slate-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-[1px] bg-tp-slate-50 px-[8px] py-[4px] text-[14px] font-semibold text-tp-slate-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Parameter"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Value"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Ref Range"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    visibleParams.map((param, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid grid-cols-3 gap-[1px] px-[8px] py-[6px] text-[14px]", i % 2 === 0 ? "bg-white" : "bg-tp-slate-50"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-tp-slate-700 truncate",
                                    children: param.name
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-[3px] font-medium", param.flag ? "text-tp-error-600" : "text-tp-slate-800"),
                                    children: [
                                        param.flag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$FlagArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlagArrow"], {
                                            flag: param.flag
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
                                            lineNumber: 70,
                                            columnNumber: 30
                                        }, this),
                                        param.value
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-tp-slate-400",
                                    children: param.refRange ?? "\u2014"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, param.name, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            data.normalCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setShowNormal(!showNormal),
                className: "mt-[6px] w-full text-center text-[14px] font-medium text-tp-blue-500 transition-colors hover:text-tp-blue-600",
                children: showNormal ? "\u2212 Hide normal values" : `+ ${data.normalCount} normal`
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(OCRPathologyCard, "mWe0sOaldvsySalCGmAMXL8pB+0=");
_c = OCRPathologyCard;
var _c;
__turbopack_context__.k.register(_c, "OCRPathologyCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OCRFullExtractionCard",
    ()=>OCRFullExtractionCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-touch-device.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CopyIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/ActionableTooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionSummaryBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/formatWithHierarchy.tsx [app-client] (ecmascript)");
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
function OCRFullExtractionCard({ data, onCopySection, onCopyItem }) {
    _s();
    const isTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"])();
    const [copiedKey, setCopiedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleCopyItem = (item, dest, key)=>{
        navigator.clipboard?.writeText(item);
        onCopyItem?.(item, dest);
        setCopiedKey(key);
        setTimeout(()=>setCopiedKey(null), 1200);
    };
    const handleCopySection = (heading, items, dest, key)=>{
        const text = items.join("\n");
        navigator.clipboard?.writeText(text);
        onCopySection?.(heading, items, dest);
        setCopiedKey(key);
        setTimeout(()=>setCopiedKey(null), 1200);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
            lineNumber: 54,
            columnNumber: 13
        }, void 0),
        tpIconName: "medical-record",
        title: data.title,
        badge: {
            label: "Auto-Analyzed",
            color: "#7C3AED",
            bg: "#EDE9FE"
        },
        copyAll: ()=>{
            const text = data.sections.map((s)=>`${s.heading}:\n${s.items.map((i)=>`  • ${i}`).join('\n')}`).join('\n\n');
            navigator.clipboard?.writeText(text);
        },
        copyAllTooltip: "Fill complete digitized report to Medical Records",
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: "View original"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
            lineNumber: 67,
            columnNumber: 20
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[8px]",
            children: data.sections.map((section)=>{
                const sectionKey = `section-${section.heading}`;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionSummaryBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionSummaryBar"], {
                            label: section.heading,
                            icon: section.icon,
                            trailing: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/section-header:opacity-100"),
                                children: copiedKey === sectionKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[14px] text-tp-success-500 font-medium",
                                    children: "Copied"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                                    lineNumber: 82,
                                    columnNumber: 23
                                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                                    label: `Fill ${section.heading.toLowerCase()} to ${section.copyDestination}`,
                                    onAction: ()=>handleCopySection(section.heading, section.items, section.copyDestination, sectionKey),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                        size: 14,
                                        onClick: ()=>handleCopySection(section.heading, section.items, section.copyDestination, sectionKey)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                                        lineNumber: 88,
                                        columnNumber: 25
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                                    lineNumber: 84,
                                    columnNumber: 23
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                                lineNumber: 80,
                                columnNumber: 19
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                            lineNumber: 76,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-1 flex flex-col gap-[2px] pl-1",
                            children: section.items.map((item, idx)=>{
                                const itemKey = `${section.heading}-${idx}`;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "group/ocr-item flex items-start gap-[6px] rounded-[4px] px-1 -mx-1 py-[2px] text-[14px] leading-[1.6] text-tp-slate-700 transition-colors hover:bg-tp-slate-50/80",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-[1px] flex-shrink-0 text-tp-slate-400",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                                            lineNumber: 104,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-1 font-normal",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWithHierarchy"])(item)
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                                            lineNumber: 107,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-shrink-0 transition-opacity", isTouch ? "opacity-70" : "opacity-0 group-hover/ocr-item:opacity-100"),
                                            children: copiedKey === itemKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[14px] text-tp-success-500 font-medium",
                                                children: "Copied"
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                                                lineNumber: 112,
                                                columnNumber: 27
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$ActionableTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionableTooltip"], {
                                                label: `Fill to ${section.copyDestination}`,
                                                onAction: ()=>handleCopyItem(item, section.copyDestination, itemKey),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CopyIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                                    size: 14,
                                                    onClick: ()=>handleCopyItem(item, section.copyDestination, itemKey)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 29
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                                                lineNumber: 114,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                                            lineNumber: 110,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                                    lineNumber: 100,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                            lineNumber: 96,
                            columnNumber: 15
                        }, this)
                    ]
                }, section.heading, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
                    lineNumber: 74,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
            lineNumber: 69,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(OCRFullExtractionCard, "iEov92yC/iWrmyMPsxm9KzS8eZM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"]
    ];
});
_c = OCRFullExtractionCard;
var _c;
__turbopack_context__.k.register(_c, "OCRFullExtractionCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DentalRadiologyScanCard",
    ()=>DentalRadiologyScanCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$DrAgentRuntimeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/DrAgentRuntimeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$use$2d$chart$2d$linked$2d$patient$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/use-chart-linked-patient-id.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$emit$2d$dental$2d$scan$2d$apply$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dental-ai/emit-dental-scan-apply.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-touch-device.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$MiniToothCanvas$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/MiniToothCanvas.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx [app-client] (ecmascript)");
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
function DentalRadiologyScanCard({ data, onCopy }) {
    _s();
    const { dentalChartPatientId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$DrAgentRuntimeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDrAgentRuntime"])();
    const chartPatientId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$use$2d$chart$2d$linked$2d$patient$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartLinkedPatientId"])(dentalChartPatientId);
    const isTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"])();
    const [copiedKey, setCopiedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const teethForCards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalRadiologyScanCard.useMemo[teethForCards]": ()=>data.teeth.filter(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dentalScanToothHasAgentCardContent"])
    }["DentalRadiologyScanCard.useMemo[teethForCards]"], [
        data.teeth
    ]);
    const examinationLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalRadiologyScanCard.useMemo[examinationLines]": ()=>teethForCards.map({
                "DentalRadiologyScanCard.useMemo[examinationLines]": (t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDentalExaminationLine"])(t)
            }["DentalRadiologyScanCard.useMemo[examinationLines]"])
    }["DentalRadiologyScanCard.useMemo[examinationLines]"], [
        teethForCards
    ]);
    const handleCopyAllToRxPad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalRadiologyScanCard.useCallback[handleCopyAllToRxPad]": ()=>{
            onCopy?.({
                sourceDateLabel: "Dental radiology scan",
                examinations: examinationLines,
                dentalScanApply: {
                    patientId: chartPatientId,
                    teeth: teethForCards
                }
            });
        }
    }["DentalRadiologyScanCard.useCallback[handleCopyAllToRxPad]"], [
        chartPatientId,
        examinationLines,
        onCopy,
        teethForCards
    ]);
    const handleCopyOneTooth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalRadiologyScanCard.useCallback[handleCopyOneTooth]": (t)=>{
            onCopy?.({
                sourceDateLabel: `Dental radiology · T${t.fdi}`,
                examinations: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDentalExaminationLine"])(t)
                ],
                dentalScanApply: {
                    patientId: chartPatientId,
                    teeth: [
                        t
                    ]
                }
            });
        }
    }["DentalRadiologyScanCard.useCallback[handleCopyOneTooth]"], [
        chartPatientId,
        onCopy
    ]);
    const handleCopyClipboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalRadiologyScanCard.useCallback[handleCopyClipboard]": (text, key)=>{
            navigator.clipboard?.writeText(text);
            setCopiedKey(key);
            setTimeout({
                "DentalRadiologyScanCard.useCallback[handleCopyClipboard]": ()=>setCopiedKey(null)
            }["DentalRadiologyScanCard.useCallback[handleCopyClipboard]"], 1200);
        }
    }["DentalRadiologyScanCard.useCallback[handleCopyClipboard]"], []);
    const handleCopySectionLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalRadiologyScanCard.useCallback[handleCopySectionLines]": (lines, key)=>{
            const text = lines.join("\n");
            navigator.clipboard?.writeText(text);
            setCopiedKey(key);
            setTimeout({
                "DentalRadiologyScanCard.useCallback[handleCopySectionLines]": ()=>setCopiedKey(null)
            }["DentalRadiologyScanCard.useCallback[handleCopySectionLines]"], 1200);
        }
    }["DentalRadiologyScanCard.useCallback[handleCopySectionLines]"], []);
    const handleMergeFindingToDental = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalRadiologyScanCard.useCallback[handleMergeFindingToDental]": (fdi, finding)=>{
            if (!chartPatientId) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$emit$2d$dental$2d$scan$2d$apply$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emitDentalScanApplyNormalized"])({
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
        }
    }["DentalRadiologyScanCard.useCallback[handleMergeFindingToDental]"], [
        chartPatientId
    ]);
    /** Under-title line: count of tooth rows shown (replaces scan date in header). */ const headerSubtitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalRadiologyScanCard.useMemo[headerSubtitle]": ()=>{
            const n = teethForCards.length;
            if (n === 0) return undefined;
            return `${n} tooth record${n === 1 ? "" : "s"}`;
        }
    }["DentalRadiologyScanCard.useMemo[headerSubtitle]"], [
        teethForCards.length
    ]);
    const leadBody = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: [
            data.summary?.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[14px] leading-[1.55] text-tp-slate-600",
                children: data.summary.trim()
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
                lineNumber: 108,
                columnNumber: 9
            }, this) : null,
            data.summaryPoints && data.summaryPoints.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "list-inside list-disc space-y-1 text-[14px] leading-[1.55] text-tp-slate-700",
                children: data.summaryPoints.map((pt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: pt
                    }, i, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
                        lineNumber: 113,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
    if (data.teeth.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
                lineNumber: 123,
                columnNumber: 15
            }, void 0),
            tpIconName: "medical service",
            title: data.title,
            date: headerSubtitle,
            collapsible: false,
            copyAll: handleCopyAllToRxPad,
            copyAllTooltip: `Apply all teeth to ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DENTAL_EXAMINATION"]}`,
            children: leadBody
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
            lineNumber: 122,
            columnNumber: 7
        }, this);
    }
    const copyTooltip = teethForCards.length > 0 ? `Apply all ${teethForCards.length} teeth to ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DENTAL_EXAMINATION"]}` : `Apply scan summary to ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DENTAL_EXAMINATION"]}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
            lineNumber: 143,
            columnNumber: 13
        }, void 0),
        tpIconName: "medical service",
        title: data.title,
        date: headerSubtitle,
        collapsible: false,
        copyAll: handleCopyAllToRxPad,
        copyAllTooltip: copyTooltip,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full min-w-0 flex-col gap-3",
            children: [
                leadBody,
                teethForCards.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-full min-w-0 flex-col gap-2.5",
                    children: teethForCards.map((t)=>{
                        const toothDef = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].find((x)=>x.fdi === t.fdi);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
                                lineNumber: 160,
                                columnNumber: 27
                            }, void 0),
                            title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toothDisplayName"])(t.fdi) ?? `Tooth ${t.fdi}`,
                            badgeBelowTitle: true,
                            badge: {
                                label: `T${t.fdi}`,
                                color: "var(--tp-slate-700,#334155)",
                                bg: "var(--tp-slate-100,#F1F5F9)"
                            },
                            leadingVisual: toothDef ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$MiniToothCanvas$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniToothCanvas"], {
                                tooth: toothDef,
                                size: 40,
                                diagnoses: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toothDiagnosisSet"])(t),
                                isImplant: !!t.implant,
                                findings: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dentalScanToCanvasFindings"])(t.findings)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
                                lineNumber: 170,
                                columnNumber: 25
                            }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-tp-slate-400",
                                children: "—"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
                                lineNumber: 178,
                                columnNumber: 25
                            }, void 0),
                            collapsible: true,
                            defaultCollapsed: true,
                            collapseIcon: "chevron",
                            largeCollapseControl: true,
                            copyAll: ()=>handleCopyOneTooth(t),
                            copyAllTooltip: `Apply T${t.fdi} to ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DENTAL_EXAMINATION"]}`,
                            pinnedBody: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DentalExaminationToothBlock"], {
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
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
                                lineNumber: 188,
                                columnNumber: 23
                            }, void 0),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DentalExaminationToothBlock"], {
                                variant: "stacked",
                                stackedPart: "details",
                                tooth: t,
                                copiedKey: copiedKey,
                                onCopyClipboard: handleCopyClipboard,
                                onCopySectionLines: handleCopySectionLines,
                                onApplyToothToRxPad: handleCopyOneTooth,
                                isTouch: isTouch,
                                onMergeFindingToDental: handleMergeFindingToDental,
                                emptyBodyHint: "No tooth-level lines were parsed from this scan."
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
                                lineNumber: 201,
                                columnNumber: 21
                            }, this)
                        }, t.fdi, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
                            lineNumber: 158,
                            columnNumber: 19
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
                    lineNumber: 154,
                    columnNumber: 13
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_s(DentalRadiologyScanCard, "cEC5W9DgSCl5Z/37Q8oL7MRlSOI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$DrAgentRuntimeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDrAgentRuntime"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$use$2d$chart$2d$linked$2d$patient$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartLinkedPatientId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$touch$2d$device$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchDevice"]
    ];
});
_c = DentalRadiologyScanCard;
var _c;
__turbopack_context__.k.register(_c, "DentalRadiologyScanCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/utility/TranslationCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TranslationCard",
    ()=>TranslationCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Translate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Translate$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Translate.js [app-client] (ecmascript) <export default as Translate>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function TranslationCard({ data, onCopy, onPillTap }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Translate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Translate$3e$__["Translate"], {
            size: 14,
            variant: "Bulk"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/TranslationCard.tsx",
            lineNumber: 22,
            columnNumber: 13
        }, void 0),
        title: data.targetLanguage,
        copyAll: ()=>onCopy?.(data.copyPayload),
        copyAllTooltip: "Fill translation to RxPad",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-[2px] text-[12px] font-medium tracking-wide text-tp-slate-400",
                        children: data.sourceLanguage
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/TranslationCard.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[6px] bg-tp-slate-50 px-2 py-[5px] text-[14px] leading-[1.6] text-tp-slate-600",
                        children: data.sourceText
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/TranslationCard.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/TranslationCard.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-[2px] text-[12px] font-medium tracking-wide text-tp-success-600",
                        children: data.targetLanguage
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/TranslationCard.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[6px] bg-tp-success-50 px-2 py-[5px] text-[14px] leading-[1.6] text-tp-success-700",
                        children: data.translatedText
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/TranslationCard.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/TranslationCard.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/TranslationCard.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = TranslationCard;
var _c;
__turbopack_context__.k.register(_c, "TranslationCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/utility/CompletenessCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompletenessCard",
    ()=>CompletenessCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function CompletenessCard({ data, onPillTap }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/CompletenessCard.tsx",
            lineNumber: 20,
            columnNumber: 13
        }, void 0),
        tpIconName: "clipboard-activity",
        title: "Documentation Check",
        badge: data.emptyCount > 0 ? {
            label: `${data.emptyCount} empty`,
            color: "#64748B",
            bg: "#F1F5F9"
        } : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-0",
            children: data.sections.map((section, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 py-[4px]",
                    style: i < data.sections.length - 1 ? {
                        borderBottom: "0.5px solid var(--tp-slate-50, #F8FAFC)"
                    } : undefined,
                    children: [
                        section.filled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                            size: 14,
                            className: "flex-shrink-0 text-tp-success-500"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/CompletenessCard.tsx",
                            lineNumber: 43,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                            size: 14,
                            className: "flex-shrink-0 text-tp-slate-300"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/CompletenessCard.tsx",
                            lineNumber: 45,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-1 text-[14px]", section.filled ? "text-tp-slate-600" : "font-medium text-tp-slate-500"),
                            children: section.name
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/CompletenessCard.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this),
                        section.count != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "rounded-[4px] bg-tp-slate-100 px-1 py-[0.5px] text-[12px] text-tp-slate-400",
                            children: section.count
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/CompletenessCard.tsx",
                            lineNumber: 62,
                            columnNumber: 15
                        }, this)
                    ]
                }, section.name, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/CompletenessCard.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/CompletenessCard.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/CompletenessCard.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = CompletenessCard;
var _c;
__turbopack_context__.k.register(_c, "CompletenessCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DrugInteractionCard",
    ()=>DrugInteractionCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
"use client";
;
;
const SEVERITY_LABEL = {
    critical: "Critical",
    high: "High",
    moderate: "Moderate",
    low: "Low"
};
const SEVERITY_BADGE = {
    critical: {
        color: "#DC2626",
        bg: "#FEE2E2"
    },
    high: {
        color: "#EA580C",
        bg: "#FFF7ED"
    },
    moderate: {
        color: "#D97706",
        bg: "#FFFBEB"
    },
    low: {
        color: "#64748B",
        bg: "#F1F5F9"
    }
};
function DrugInteractionCard({ data }) {
    const badge = SEVERITY_BADGE[data.severity];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
            lineNumber: 29,
            columnNumber: 13
        }, void 0),
        tpIconName: "first-aid",
        title: "Drug Interaction",
        badge: {
            label: "Danger",
            color: "#DC2626",
            bg: "#FEE2E2"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-[8px] rounded-[8px] bg-white px-3 py-[10px]",
            style: {
                borderLeft: "3px solid var(--tp-error-400, #F87171)",
                boxShadow: "0 0 0 0.5px rgba(220, 38, 38, 0.1)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-[6px] text-[14px] font-semibold text-tp-slate-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: data.drug1
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "14",
                            height: "14",
                            viewBox: "0 0 16 16",
                            fill: "none",
                            className: "flex-shrink-0 text-tp-warning-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M8 2L9.5 6H14L10.5 9L12 13L8 10.5L4 13L5.5 9L2 6H6.5L8 2Z",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: data.drug2
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-[6px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[12px] font-medium tracking-wider text-tp-slate-400",
                            children: "Severity"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "rounded-[4px] px-1.5 py-[1px] text-[12px] font-semibold",
                            style: {
                                color: badge.color,
                                backgroundColor: badge.bg
                            },
                            children: SEVERITY_LABEL[data.severity]
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-[2px] text-[12px] font-medium tracking-wider text-tp-slate-400",
                            children: "Risk"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] leading-[1.6] text-tp-slate-700",
                            children: data.risk
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-[2px] text-[12px] font-medium tracking-wider text-tp-slate-400",
                            children: "Recommended action"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] leading-[1.6] text-tp-slate-700",
                            children: data.action
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = DrugInteractionCard;
var _c;
__turbopack_context__.k.register(_c, "DrugInteractionCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/utility/AllergyConflictCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AllergyConflictCard",
    ()=>AllergyConflictCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ShieldTick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldTick$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ShieldTick.js [app-client] (ecmascript) <export default as ShieldTick>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AllergyConflictCard({ data, onOverride }) {
    _s();
    const [overridden, setOverridden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleOverride = ()=>{
        setOverridden(true);
        onOverride?.();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/AllergyConflictCard.tsx",
            lineNumber: 27,
            columnNumber: 13
        }, void 0),
        tpIconName: "first-aid",
        title: "Allergy Conflict",
        badge: {
            label: "Danger",
            color: "#DC2626",
            bg: "#FEE2E2"
        },
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: overridden ? "Override applied" : "Override - I accept the risk",
            onClick: handleOverride,
            disabled: overridden,
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ShieldTick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldTick$3e$__["ShieldTick"], {
                size: 14,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/AllergyConflictCard.tsx",
                lineNumber: 37,
                columnNumber: 21
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/AllergyConflictCard.tsx",
            lineNumber: 32,
            columnNumber: 9
        }, void 0),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 text-[14px] font-semibold text-tp-error-700",
                children: [
                    data.drug,
                    " → ",
                    data.allergen
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/AllergyConflictCard.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-1 flex items-center gap-1.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex rounded-[4px] bg-tp-error-100 px-1.5 py-[2px] text-[12px] font-semibold text-tp-error-700",
                    children: "Contraindicated"
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/AllergyConflictCard.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/AllergyConflictCard.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 rounded-[6px] bg-tp-slate-50 px-2 py-[5px] text-[14px] leading-[1.55] text-tp-slate-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        className: "text-tp-slate-800",
                        children: "Alternative:"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/AllergyConflictCard.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    " ",
                    data.alternative
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/AllergyConflictCard.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/AllergyConflictCard.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(AllergyConflictCard, "JE4bPTjcswbv2ob3cOhQpOnrH84=");
_c = AllergyConflictCard;
var _c;
__turbopack_context__.k.register(_c, "AllergyConflictCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/utility/FollowUpQuestionCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FollowUpQuestionCard",
    ()=>FollowUpQuestionCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TickCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TickCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/TickCircle.js [app-client] (ecmascript) <export default as TickCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CheckboxRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CheckboxRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$RadioRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/RadioRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/FooterCTA.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function FollowUpQuestionCard({ data, onSubmit }) {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "FollowUpQuestionCard.useState": ()=>{
            const init = {};
            data.options.forEach({
                "FollowUpQuestionCard.useState": (opt)=>{
                    init[opt] = false;
                }
            }["FollowUpQuestionCard.useState"]);
            return init;
        }
    }["FollowUpQuestionCard.useState"]);
    const handleCheckboxToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FollowUpQuestionCard.useCallback[handleCheckboxToggle]": (option, checked)=>{
            setSelected({
                "FollowUpQuestionCard.useCallback[handleCheckboxToggle]": (prev)=>({
                        ...prev,
                        [option]: checked
                    })
            }["FollowUpQuestionCard.useCallback[handleCheckboxToggle]"]);
        }
    }["FollowUpQuestionCard.useCallback[handleCheckboxToggle]"], []);
    const handleRadioSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FollowUpQuestionCard.useCallback[handleRadioSelect]": (option)=>{
            setSelected({
                "FollowUpQuestionCard.useCallback[handleRadioSelect]": ()=>{
                    const next = {};
                    data.options.forEach({
                        "FollowUpQuestionCard.useCallback[handleRadioSelect]": (opt)=>{
                            next[opt] = opt === option;
                        }
                    }["FollowUpQuestionCard.useCallback[handleRadioSelect]"]);
                    return next;
                }
            }["FollowUpQuestionCard.useCallback[handleRadioSelect]"]);
        }
    }["FollowUpQuestionCard.useCallback[handleRadioSelect]"], [
        data.options
    ]);
    const selectedOptions = Object.entries(selected).filter(([, v])=>v).map(([k])=>k);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/FollowUpQuestionCard.tsx",
            lineNumber: 59,
            columnNumber: 13
        }, void 0),
        tpIconName: "Diagnosis",
        title: data.question,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$FooterCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterCTA"], {
            label: `Submit${selectedOptions.length > 0 ? ` (${selectedOptions.length})` : ""}`,
            onClick: ()=>onSubmit?.(selectedOptions),
            disabled: selectedOptions.length === 0,
            tone: "secondary",
            iconLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TickCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TickCircle$3e$__["TickCircle"], {
                size: 14,
                variant: "Bold"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/FollowUpQuestionCard.tsx",
                lineNumber: 68,
                columnNumber: 21
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/FollowUpQuestionCard.tsx",
            lineNumber: 63,
            columnNumber: 9
        }, void 0),
        children: data.multiSelect ? data.options.map((option, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CheckboxRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckboxRow"], {
                label: option,
                checked: selected[option] ?? false,
                onChange: (checked)=>handleCheckboxToggle(option, checked),
                isLast: i === data.options.length - 1
            }, option, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/FollowUpQuestionCard.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, this)) : data.options.map((option, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$RadioRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioRow"], {
                name: "follow-up-question",
                label: option,
                checked: selected[option] ?? false,
                onChange: ()=>handleRadioSelect(option),
                isLast: i === data.options.length - 1
            }, option, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/FollowUpQuestionCard.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/FollowUpQuestionCard.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(FollowUpQuestionCard, "idcpjTt4+aMJWz8Ks14G9yQY0bY=");
_c = FollowUpQuestionCard;
var _c;
__turbopack_context__.k.register(_c, "FollowUpQuestionCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/utility/GuardrailCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GuardrailCard",
    ()=>GuardrailCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$InfoCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/InfoCircle.js [app-client] (ecmascript) <export default as InfoCircle>");
"use client";
;
;
function GuardrailCard({ data, onPillTap }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "guardrail-card overflow-hidden rounded-[12px] border border-[rgba(217,165,32,0.2)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[2px]",
                style: {
                    background: "linear-gradient(90deg, rgba(217,165,32,0.3) 0%, rgba(217,165,32,0.08) 100%)"
                }
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/GuardrailCard.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-[8px] px-[12px] pt-[10px] pb-[8px] bg-[rgba(217,165,32,0.04)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$InfoCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoCircle$3e$__["InfoCircle"], {
                        size: 16,
                        variant: "Bulk",
                        className: "mt-[1px] flex-shrink-0 text-[#D9A520]"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/GuardrailCard.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[13px] leading-[1.5] text-tp-slate-600",
                        children: data.message
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/GuardrailCard.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/GuardrailCard.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            data.suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-[12px] pb-[10px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-[6px] text-[11px] font-medium uppercase tracking-wider text-tp-slate-400",
                        children: "Try asking about"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/GuardrailCard.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-[6px]",
                        children: data.suggestions.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onPillTap?.(s.message),
                                className: "rounded-full border border-tp-slate-200 bg-white px-[10px] py-[4px] text-[12px] font-medium text-tp-slate-600 transition-all duration-150 hover:border-tp-blue-300 hover:bg-tp-blue-50 hover:text-tp-blue-600 active:scale-[0.97]",
                                children: s.label
                            }, i, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/GuardrailCard.tsx",
                                lineNumber: 43,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/GuardrailCard.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/GuardrailCard.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/GuardrailCard.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = GuardrailCard;
var _c;
__turbopack_context__.k.register(_c, "GuardrailCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReferralCard",
    ()=>ReferralCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SidebarLink.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function ReferralCard({ data, onPillTap }) {
    const copyAll = ()=>{
        const text = data.items.map((r)=>`${r.doctorName} (${r.specialty}) · ${r.doctorPhone} · ${r.patientsReferred} patients · ${r.topReason}`).join("\n");
        navigator.clipboard.writeText(text);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
            lineNumber: 22,
            columnNumber: 13
        }, void 0),
        tpIconName: "hospital",
        title: data.title,
        badge: {
            label: `${data.totalPatients} patients`,
            color: "#4B4AD5",
            bg: "#EEF2FF"
        },
        copyAll: copyAll,
        sidebarLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SidebarLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarLink"], {
            text: `View all referrers (${data.totalReferrers})`,
            onClick: ()=>onPillTap?.("View all referrers")
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
            lineNumber: 30,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-[6px]",
            children: data.items.map((item, i)=>{
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-[8px] border border-tp-slate-100 bg-white px-[8px] py-[6px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-[3px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-[6px] min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[14px] font-medium text-tp-slate-800 truncate",
                                            children: item.doctorName
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
                                            lineNumber: 47,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "shrink-0 rounded-[4px] px-1.5 py-[1px] text-[12px] font-medium",
                                            style: {
                                                color: "#4B4AD5",
                                                backgroundColor: "#EEF2FF"
                                            },
                                            children: item.specialty
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
                                            lineNumber: 50,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
                                    lineNumber: 46,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "shrink-0 ml-2 rounded-[6px] border border-tp-blue-200 bg-white px-2 py-[2px] text-[14px] font-medium text-tp-blue-600 hover:bg-tp-blue-50 transition-colors",
                                    onClick: ()=>onPillTap?.(`Contact ${item.doctorName}`),
                                    children: "Contact"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
                                    lineNumber: 57,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
                            lineNumber: 45,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] text-tp-slate-600 truncate",
                            children: [
                                item.doctorPhone,
                                " · ",
                                item.patientsReferred,
                                " referred patient",
                                item.patientsReferred > 1 ? "s" : ""
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
                            lineNumber: 66,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] text-tp-slate-400 truncate mt-[1px]",
                            children: [
                                "Top reason: ",
                                item.topReason
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
                            lineNumber: 71,
                            columnNumber: 15
                        }, this)
                    ]
                }, `${item.doctorName}-${i}`, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
                    lineNumber: 40,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = ReferralCard;
var _c;
__turbopack_context__.k.register(_c, "ReferralCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/utility/ClinicalGuidelinesCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClinicalGuidelinesCard",
    ()=>ClinicalGuidelinesCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
"use client";
;
;
const EVIDENCE_BADGE = {
    A: {
        color: "#22C55E",
        bg: "#F0FDF4"
    },
    B: {
        color: "#4B4AD5",
        bg: "#EEEEFF"
    },
    C: {
        color: "#F59E0B",
        bg: "#FFFBEB"
    }
};
function ClinicalGuidelinesCard({ data, onPillTap }) {
    const badge = EVIDENCE_BADGE[data.evidenceLevel] ?? EVIDENCE_BADGE.C;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ClinicalGuidelinesCard.tsx",
            lineNumber: 23,
            columnNumber: 13
        }, void 0),
        tpIconName: "medical book",
        title: data.title,
        badge: {
            label: `Evidence ${data.evidenceLevel}`,
            color: badge.color,
            bg: badge.bg
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-[6px] rounded-[6px] bg-tp-slate-50 px-2.5 py-[4px] text-[14px] text-tp-slate-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium text-tp-slate-600",
                        children: "Condition:"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ClinicalGuidelinesCard.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    " ",
                    data.condition
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ClinicalGuidelinesCard.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-[6px] space-y-[3px]",
                children: data.recommendations.map((rec, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-[6px] text-[14px] leading-[1.6] text-tp-slate-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-[2px] flex-shrink-0 text-tp-blue-400",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ClinicalGuidelinesCard.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: rec
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ClinicalGuidelinesCard.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ClinicalGuidelinesCard.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ClinicalGuidelinesCard.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[14px] text-tp-slate-400",
                children: [
                    "Source: ",
                    data.source
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ClinicalGuidelinesCard.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/utility/ClinicalGuidelinesCard.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = ClinicalGuidelinesCard;
var _c;
__turbopack_context__.k.register(_c, "ClinicalGuidelinesCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/RadioRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RadioRow",
    ()=>RadioRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
function RadioRow({ name, label, detail, checked = false, onChange, isLast }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-pointer items-center gap-[5px] py-[3px] text-[14px]"),
        style: !isLast ? {
            borderBottom: "0.5px solid var(--tp-slate-50, #F8FAFC)"
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "radio",
                name: name,
                checked: checked,
                onChange: onChange,
                className: "h-[14px] w-[14px] flex-shrink-0",
                style: {
                    accentColor: "var(--tp-blue-500)"
                }
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/RadioRow.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-medium text-tp-slate-800",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/RadioRow.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            detail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-auto text-[12px] text-tp-slate-400",
                children: detail
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/RadioRow.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/RadioRow.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = RadioRow;
var _c;
__turbopack_context__.k.register(_c, "RadioRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PomrProblemCard",
    ()=>PomrProblemCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/formatWithHierarchy.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/sectionInlineKey.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$FlagArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/FlagArrow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
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
const FLAG_COLORS = {
    high: "text-tp-error-600 font-semibold",
    low: "text-tp-error-600 font-semibold",
    critical: "text-tp-error-700 font-bold",
    normal: "text-tp-slate-800"
};
function PomrProblemCard({ data, onPillTap, onOpenDocument }) {
    _s();
    // Build rich source entries for the donut tooltip
    const sourceEntries = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "PomrProblemCard.useMemo[sourceEntries]": ()=>{
            // Use explicit sourceEntries from data if available
            if (data.sourceEntries && data.sourceEntries.length > 0) {
                return data.sourceEntries.map({
                    "PomrProblemCard.useMemo[sourceEntries]": (entry)=>({
                            label: entry.label,
                            date: entry.date,
                            type: entry.type,
                            onClick: onOpenDocument ? ({
                                "PomrProblemCard.useMemo[sourceEntries]": ()=>onOpenDocument(entry.label)
                            })["PomrProblemCard.useMemo[sourceEntries]"] : undefined
                        })
                }["PomrProblemCard.useMemo[sourceEntries]"]);
            }
            // Fallback: derive from lab provenance
            const entries = [];
            const hasEmr = data.labs.some({
                "PomrProblemCard.useMemo[sourceEntries].hasEmr": (l)=>l.provenance === "emr" || !l.provenance
            }["PomrProblemCard.useMemo[sourceEntries].hasEmr"]);
            const hasAi = data.labs.some({
                "PomrProblemCard.useMemo[sourceEntries].hasAi": (l)=>l.provenance === "ai_extracted"
            }["PomrProblemCard.useMemo[sourceEntries].hasAi"]);
            if (hasEmr) {
                entries.push({
                    label: "EMR — Lab Results",
                    type: "emr",
                    onClick: onOpenDocument ? ({
                        "PomrProblemCard.useMemo[sourceEntries]": ()=>onOpenDocument("EMR — Lab Results")
                    })["PomrProblemCard.useMemo[sourceEntries]"] : undefined
                });
            }
            if (hasAi) {
                entries.push({
                    label: "Uploaded Report (AI-Extracted)",
                    type: "uploaded",
                    onClick: onOpenDocument ? ({
                        "PomrProblemCard.useMemo[sourceEntries]": ()=>onOpenDocument("Uploaded Report (AI-Extracted)")
                    })["PomrProblemCard.useMemo[sourceEntries]"] : undefined
                });
            }
            if (entries.length === 0) {
                entries.push({
                    label: "EMR Records",
                    type: "emr"
                });
            }
            return entries;
        }
    }["PomrProblemCard.useMemo[sourceEntries]"], [
        data.labs,
        data.sourceEntries,
        onOpenDocument
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
            lineNumber: 65,
            columnNumber: 13
        }, void 0),
        tpIconName: "clipboard-activity",
        title: data.problem,
        badge: {
            label: data.status,
            color: data.statusColor,
            bg: `${data.statusColor}14`
        },
        dataSources: [
            "EMR Records",
            "AI-Extracted"
        ],
        collapsible: true,
        defaultCollapsed: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[8px]",
            children: [
                data.labs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[14px] leading-[1.8] text-tp-slate-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTag"], {
                            label: "Key Labs",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Key Labs"]
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this),
                        " ",
                        data.labs.map((lab, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$sectionInlineKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_INLINE_SUBKEY_CLASS"],
                                        children: [
                                            lab.name,
                                            ": "
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                        lineNumber: 84,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center", FLAG_COLORS[lab.flag || "normal"]),
                                        children: [
                                            (lab.flag === "high" || lab.flag === "low" || lab.flag === "critical") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$FlagArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlagArrow"], {
                                                flag: lab.flag,
                                                className: "mr-[1px]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                                lineNumber: 86,
                                                columnNumber: 94
                                            }, this),
                                            lab.value,
                                            lab.unit ? ` ${lab.unit}` : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, this),
                                    i < data.labs.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mx-[6px] text-tp-slate-200",
                                        children: "|"
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                        lineNumber: 91,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, lab.name, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                    lineNumber: 80,
                    columnNumber: 11
                }, this),
                data.meds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[14px] leading-[1.8] text-tp-slate-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTag"], {
                            label: "Current Medications",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Current Medications"]
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this),
                        " ",
                        data.meds.map((med, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                children: [
                                    i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-tp-slate-400",
                                        children: ", "
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                        lineNumber: 104,
                                        columnNumber: 27
                                    }, this),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWithHierarchy"])(med)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                    lineNumber: 100,
                    columnNumber: 11
                }, this),
                data.missingFields.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-[6px] px-[8px] py-[6px]",
                    style: {
                        background: "rgba(245,158,11,0.06)",
                        border: "1px solid rgba(245,158,11,0.12)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-[4px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTag"], {
                                label: "Missing / Action Items",
                                icon: "danger"
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-[3px]",
                            children: data.missingFields.map((mf, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-[6px] text-[14px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-[1px] flex-shrink-0 text-[14px] text-amber-500",
                                            children: "\u25CF"
                                        }, void 0, false, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                            lineNumber: 126,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-tp-slate-700",
                                                    children: mf.field
                                                }, void 0, false, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-tp-slate-400",
                                                    children: [
                                                        " — ",
                                                        mf.reason
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                            lineNumber: 127,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                                    lineNumber: 122,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
                    lineNumber: 113,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(PomrProblemCard, "VkIfATo7Mny5nDobrsOOcWkJ3n0=");
_c = PomrProblemCard;
var _c;
__turbopack_context__.k.register(_c, "PomrProblemCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SbarCriticalCard",
    ()=>SbarCriticalCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/CardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/SectionTag.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$highlightClinicalText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/highlightClinicalText.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/formatWithHierarchy.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const SEVERITY_STYLES = {
    critical: "bg-tp-error-50 text-tp-error-700 font-bold",
    high: "bg-tp-warning-50 text-tp-warning-700 font-semibold"
};
function SbarCriticalCard({ data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$CardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardShell"], {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
            lineNumber: 23,
            columnNumber: 13
        }, void 0),
        tpIconName: "stethoscope",
        title: "Patient Summary",
        dataSources: [
            "EMR Records"
        ],
        collapsible: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[8px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-[8px] bg-tp-slate-50 border-l-[3px] border-tp-violet-300 px-3 py-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] italic leading-[1.7] text-tp-slate-500",
                        children: [
                            "“",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$highlightClinicalText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["highlightClinicalText"])(data.situation),
                            "”"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                data.activeProblems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[14px] leading-[1.8] text-tp-slate-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTag"], {
                            label: "Current Symptoms",
                            icon: "clipboard-activity"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                            lineNumber: 40,
                            columnNumber: 13
                        }, this),
                        " ",
                        data.activeProblems.map((p, i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWithHierarchy"])(p.trim(), "text-tp-slate-700", "text-tp-slate-400"),
                                    i < arr.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-tp-slate-400",
                                        children: ", "
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                                        lineNumber: 44,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this),
                data.allergies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[14px] leading-[1.8]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTag"], {
                            label: "Allergies",
                            icon: "shield-cross"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, this),
                        " ",
                        data.allergies.map((a, i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWithHierarchy"])(a.trim(), "text-tp-slate-700", "text-tp-slate-400"),
                                    i < arr.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-tp-slate-400",
                                        children: ", "
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                                        lineNumber: 57,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                    lineNumber: 52,
                    columnNumber: 11
                }, this),
                data.keyMeds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[14px] leading-[1.8] text-tp-slate-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTag"], {
                            label: "Key Medications",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$SectionTag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TAG_ICON_MAP"]["Medications"]
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this),
                        " ",
                        data.keyMeds.slice(0, 8).map((m, i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$formatWithHierarchy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWithHierarchy"])(m.trim(), "text-tp-slate-700", "text-tp-slate-400"),
                                    i < arr.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-tp-slate-400",
                                        children: ", "
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                                        lineNumber: 70,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = SbarCriticalCard;
var _c;
__turbopack_context__.k.register(_c, "SbarCriticalCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CardRenderer",
    ()=>CardRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$highlightClinicalText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/highlightClinicalText.tsx [app-client] (ecmascript)");
// Summary Cards (A1-A7)
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$GPSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/summary/GPSummaryCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$ObstetricExpandedCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/summary/ObstetricExpandedCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$GynecSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/summary/GynecSummaryCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$PediatricSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/summary/PediatricSummaryCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$OphthalSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/summary/OphthalSummaryCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$PatientReportedCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/summary/PatientReportedCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$LastVisitCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/summary/LastVisitCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$SbarOverviewCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/summary/SbarOverviewCard.tsx [app-client] (ecmascript)");
// Data Cards (B1-B6)
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$LabPanelCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/data/LabPanelCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$VitalTrendsBarCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsBarCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$VitalTrendsLineCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/data/VitalTrendsLineCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$LabComparisonCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/data/LabComparisonCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$LabTrendsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/data/LabTrendsCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$MedHistoryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/data/MedHistoryCard.tsx [app-client] (ecmascript)");
// Action Cards (C1-C6)
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$DDXCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/action/DDXCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$ProtocolMedsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/action/ProtocolMedsCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$InvestigationCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/action/InvestigationCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$FollowUpCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/action/FollowUpCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$AdviceCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/action/AdviceCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$VoiceStructuredRxCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/action/VoiceStructuredRxCard.tsx [app-client] (ecmascript)");
// Analysis Cards (D1, D3)
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$analysis$2f$OCRPathologyCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRPathologyCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$analysis$2f$OCRFullExtractionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/analysis/OCRFullExtractionCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$analysis$2f$DentalRadiologyScanCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/analysis/DentalRadiologyScanCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$MedicalRecordsUploadCtaCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/action/MedicalRecordsUploadCtaCard.tsx [app-client] (ecmascript)");
// Homepage Operational Cards (H1–H12)
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$PatientListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientListCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$FollowUpListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpListCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$RevenueBarCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueBarCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$RevenueComparisonCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/RevenueComparisonCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$BulkActionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/BulkActionCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$DonutChartCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/DonutChartCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$PieChartCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/PieChartCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$LineGraphCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/LineGraphCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$AnalyticsTableCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/AnalyticsTableCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$ConditionBarCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/ConditionBarCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$HeatmapCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/HeatmapCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$WelcomeCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/WelcomeCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$DuePatientsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/DuePatientsCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$ExternalCtaCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/ExternalCtaCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$FollowUpRateCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/FollowUpRateCard.tsx [app-client] (ecmascript)");
// Utility & Safety Cards (E1-E2 + CDSS)
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$TranslationCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/utility/TranslationCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$CompletenessCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/utility/CompletenessCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$DrugInteractionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/utility/DrugInteractionCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$AllergyConflictCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/utility/AllergyConflictCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$FollowUpQuestionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/utility/FollowUpQuestionCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$GuardrailCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/utility/GuardrailCard.tsx [app-client] (ecmascript)");
// Vitals Summary Card
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$VitalsSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/data/VitalsSummaryCard.tsx [app-client] (ecmascript)");
// Medical History Card
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$MedicalHistoryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/summary/MedicalHistoryCard.tsx [app-client] (ecmascript)");
// Clinical Cards
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$clinical$2f$PomrProblemCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/clinical/PomrProblemCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$clinical$2f$SbarCriticalCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/clinical/SbarCriticalCard.tsx [app-client] (ecmascript)");
// New Card Variants
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$ReferralCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/utility/ReferralCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$ClinicalGuidelinesCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/utility/ClinicalGuidelinesCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$VaccinationScheduleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/data/VaccinationScheduleCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$PatientTimelineCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/data/PatientTimelineCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$RxPreviewCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/action/RxPreviewCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$BillingSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/BillingSummaryCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$VaccinationDueListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/VaccinationDueListCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$ANCScheduleListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/ANCScheduleListCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$PatientSearchCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/homepage/PatientSearchCard.tsx [app-client] (ecmascript)");
"use client";
;
;
/** Render **bold** markdown in text (non-greedy; supports filenames with underscores, etc.) */ function renderBold(text) {
    const parts = text.split(/(\*\*[\s\S]+?\*\*)/g);
    if (parts.length === 1) return text;
    return parts.map((part, i)=>{
        if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                className: "font-semibold",
                children: part.slice(2, -2)
            }, i, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 13,
                columnNumber: 14
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: part
        }, i, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
            lineNumber: 15,
            columnNumber: 12
        }, this);
    });
}
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
;
;
;
;
;
;
;
function CardRenderer({ output, onPillTap, onCopy, onSidebarNav, activeSpecialty, onPatientSelect, onOpenMedicalRecords }) {
    return renderCard(output, onPillTap, onCopy, onSidebarNav, activeSpecialty, onPatientSelect, onOpenMedicalRecords);
}
_c = CardRenderer;
function renderCard(output, onPillTap, onCopy, onSidebarNav, activeSpecialty, onPatientSelect, onOpenMedicalRecords) {
    switch(output.kind){
        // -- Summary Family (A) --------------------------------------------------
        case "patient_summary":
            // GPSummaryCard expects { data: SmartSummaryData; onPillTap?; onSidebarNav?; hideNarrative?; activeSpecialty? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$GPSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GPSummaryCard"], {
                data: output.data,
                onPillTap: onPillTap,
                onSidebarNav: onSidebarNav,
                defaultCollapsed: false,
                hideNarrative: output.hideNarrative,
                activeSpecialty: activeSpecialty
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 154,
                columnNumber: 14
            }, this);
        case "patient_narrative":
            {
                // Standalone narrative quotation block — no CardShell, just the violet-bordered paragraph
                const narrativeParts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$GPSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSummaryNarrative"])(output.data, activeSpecialty);
                if (!narrativeParts || narrativeParts.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-[8px] bg-tp-slate-50 border-l-[3px] border-tp-violet-300 px-3 py-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] italic leading-[1.7] text-tp-slate-500",
                        children: [
                            "“",
                            narrativeParts,
                            "”"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this);
            }
        case "obstetric_summary":
            // ObstetricExpandedCard expects { data: ObstetricData; onSidebarNav? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$ObstetricExpandedCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ObstetricExpandedCard"], {
                data: output.data,
                onSidebarNav: onSidebarNav
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 171,
                columnNumber: 14
            }, this);
        case "gynec_summary":
            // GynecSummaryCard expects { data: GynecData; onSidebarNav? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$GynecSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GynecSummaryCard"], {
                data: output.data,
                onSidebarNav: onSidebarNav
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 175,
                columnNumber: 14
            }, this);
        case "pediatric_summary":
            // PediatricSummaryCard expects { data: PediatricsData; onSidebarNav? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$PediatricSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PediatricSummaryCard"], {
                data: output.data,
                onSidebarNav: onSidebarNav
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 179,
                columnNumber: 14
            }, this);
        case "ophthal_summary":
            // OphthalSummaryCard expects { data: OphthalData; onSidebarNav? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$OphthalSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OphthalSummaryCard"], {
                data: output.data,
                onSidebarNav: onSidebarNav
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 183,
                columnNumber: 14
            }, this);
        case "symptom_collector":
            // PatientReportedCard expects { data: SymptomCollectorData; onCopy?; onPillTap? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$PatientReportedCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientReportedCard"], {
                data: output.data,
                defaultCollapsed: false,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 187,
                columnNumber: 14
            }, this);
        case "last_visit":
            // LastVisitCard expects { data: LastVisitCardData; onPillTap?; onSidebarNav?; onCopy?: () => void }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$LastVisitCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LastVisitCard"], {
                data: output.data,
                onPillTap: onPillTap,
                onSidebarNav: onSidebarNav
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 191,
                columnNumber: 14
            }, this);
        // -- Data Family (B) -----------------------------------------------------
        case "lab_panel":
            // LabPanelCard expects { data: LabPanelData; onPillTap?; onSidebarNav? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$LabPanelCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabPanelCard"], {
                data: output.data,
                onPillTap: onPillTap,
                onSidebarNav: onSidebarNav
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 196,
                columnNumber: 14
            }, this);
        case "vitals_trend_bar":
            // VitalTrendsBarCard expects { data: { title: string; series: VitalTrendSeries[] } }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$VitalTrendsBarCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VitalTrendsBarCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 200,
                columnNumber: 14
            }, this);
        case "vitals_trend_line":
            // VitalTrendsLineCard expects { data: { title: string; series: VitalTrendSeries[] } }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$VitalTrendsLineCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VitalTrendsLineCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 204,
                columnNumber: 14
            }, this);
        case "lab_trend":
            // LabTrendsCard expects { data: { title: string; series: VitalTrendSeries[]; parameterName: string } }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$LabTrendsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabTrendsCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 208,
                columnNumber: 14
            }, this);
        case "lab_comparison":
            // LabComparisonCard expects { data: { rows: LabComparisonRow[]; insight: string } }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$LabComparisonCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabComparisonCard"], {
                data: output.data
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 212,
                columnNumber: 14
            }, this);
        case "med_history":
            // MedHistoryCard expects { data: { entries: MedHistoryEntry[]; insight: string } }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$MedHistoryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedHistoryCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 216,
                columnNumber: 14
            }, this);
        // -- Action Family (C) ---------------------------------------------------
        case "ddx":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$DDXCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DDXCard"], {
                data: output.data,
                onCopyToDiagnosis: (selected)=>onCopy?.({
                        section: "diagnosis",
                        items: selected
                    }),
                onCopyToRxPad: (selected)=>onCopy?.({
                        section: "rxpad",
                        items: selected
                    }),
                onSendCannedMessage: (msg)=>onPillTap?.(msg)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 221,
                columnNumber: 9
            }, this);
        case "protocol_meds":
            // ProtocolMedsCard expects { data: { diagnosis; meds; safetyCheck; copyPayload }; onCopy?; onCopySingle? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$ProtocolMedsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProtocolMedsCard"], {
                data: output.data,
                onCopy: onCopy
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 232,
                columnNumber: 9
            }, this);
        case "investigation_bundle":
            // InvestigationCard expects { data: { title; items; copyPayload }; onCopy? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$InvestigationCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvestigationCard"], {
                data: output.data,
                onCopy: onCopy
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 241,
                columnNumber: 9
            }, this);
        case "follow_up":
            // FollowUpCard expects { data: { context: string; options: FollowUpOption[] }; onSelect?; onCopyToFollowUp? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$FollowUpCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FollowUpCard"], {
                data: output.data,
                onCopyToFollowUp: (days, label)=>onCopy?.({
                        section: "follow_up",
                        days,
                        label
                    })
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 249,
                columnNumber: 14
            }, this);
        // -- Analysis Family (D) -------------------------------------------------
        case "ocr_pathology":
            // OCRPathologyCard expects { data: { title; category; parameters; normalCount; insight } }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$analysis$2f$OCRPathologyCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OCRPathologyCard"], {
                data: output.data,
                onPillTap: onPillTap,
                onCopy: onCopy
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 255,
                columnNumber: 9
            }, this);
        case "ocr_extraction":
            // OCRFullExtractionCard expects { data: { title; category; sections; insight }; onCopySection?; onCopyItem? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$analysis$2f$OCRFullExtractionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OCRFullExtractionCard"], {
                data: output.data
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 265,
                columnNumber: 9
            }, this);
        case "dental_radiology_scan":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$analysis$2f$DentalRadiologyScanCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DentalRadiologyScanCard"], {
                data: output.data,
                onCopy: onCopy
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 272,
                columnNumber: 9
            }, this);
        case "medical_records_upload_cta":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$MedicalRecordsUploadCtaCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicalRecordsUploadCtaCard"], {
                data: output.data,
                onAddRecords: ()=>onOpenMedicalRecords?.()
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 280,
                columnNumber: 9
            }, this);
        // -- Utility & Safety Family (E + CDSS) ----------------------------------
        case "translation":
            // TranslationCard expects { data: TranslationData & { copyPayload }; onCopy? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$TranslationCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TranslationCard"], {
                data: output.data,
                onCopy: onCopy,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 290,
                columnNumber: 9
            }, this);
        case "completeness":
            // CompletenessCard expects { data: { sections: CompletenessSection[]; emptyCount: number } }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$CompletenessCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletenessCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 299,
                columnNumber: 14
            }, this);
        case "drug_interaction":
            // DrugInteractionCard expects { data: DrugInteractionData }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$DrugInteractionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DrugInteractionCard"], {
                data: output.data
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 303,
                columnNumber: 14
            }, this);
        case "allergy_conflict":
            // AllergyConflictCard expects { data: AllergyConflictData; onOverride? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$AllergyConflictCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AllergyConflictCard"], {
                data: output.data
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 307,
                columnNumber: 14
            }, this);
        case "follow_up_question":
            // FollowUpQuestionCard expects { data: { question; options; multiSelect }; onSubmit? }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$FollowUpQuestionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FollowUpQuestionCard"], {
                data: output.data
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 311,
                columnNumber: 14
            }, this);
        // -- Clinical Cards -------------------------------------------------------
        case "pomr_problem_card":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$clinical$2f$PomrProblemCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PomrProblemCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 315,
                columnNumber: 14
            }, this);
        case "sbar_critical":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$clinical$2f$SbarCriticalCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SbarCriticalCard"], {
                data: output.data
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 318,
                columnNumber: 14
            }, this);
        case "sbar_overview":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$SbarOverviewCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SbarOverviewCard"], {
                data: output.data,
                onSidebarNav: onSidebarNav,
                activeSpecialty: activeSpecialty
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 321,
                columnNumber: 14
            }, this);
        case "patient_search":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$PatientSearchCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientSearchCard"], {
                data: output.data,
                onPatientSelect: onPatientSelect
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 324,
                columnNumber: 14
            }, this);
        case "guardrail":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$GuardrailCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GuardrailCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 327,
                columnNumber: 14
            }, this);
        case "vitals_summary":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$VitalsSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VitalsSummaryCard"], {
                data: output.data
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 330,
                columnNumber: 14
            }, this);
        case "medical_history":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$summary$2f$MedicalHistoryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicalHistoryCard"], {
                data: output.data,
                onSidebarNav: onSidebarNav
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 333,
                columnNumber: 14
            }, this);
        // -- Text-Only Kinds -----------------------------------------------------
        case "text_fact":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[8px] bg-tp-slate-50 px-[10px] py-[8px] text-[14px] text-tp-slate-700 leading-[1.6]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-[2px] font-semibold text-tp-slate-800",
                        children: output.data.context
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                        lineNumber: 339,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$highlightClinicalText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["highlightClinicalText"])(output.data.value)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-[4px] text-[14px] text-tp-slate-400",
                        children: [
                            "Source: ",
                            output.data.source
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                        lineNumber: 341,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 338,
                columnNumber: 9
            }, this);
        case "text_alert":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `rounded-[8px] px-[10px] py-[8px] text-[14px] font-medium ${output.data.severity === "critical" ? "bg-tp-error-50 text-tp-error-700" : output.data.severity === "high" ? "bg-tp-warning-50 text-tp-warning-700" : "bg-tp-slate-50 text-tp-slate-700"}`,
                children: renderBold(output.data.message)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 347,
                columnNumber: 9
            }, this);
        case "text_list":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "list-inside list-disc space-y-[3px] text-[14px] text-tp-slate-700 leading-[1.6]",
                children: output.data.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$highlightClinicalText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["highlightClinicalText"])(item)
                    }, i, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                        lineNumber: 364,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 362,
                columnNumber: 9
            }, this);
        case "advice_bundle":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$AdviceCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdviceCard"], {
                data: output.data,
                onCopy: onCopy,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 371,
                columnNumber: 9
            }, this);
        case "voice_structured_rx":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$VoiceStructuredRxCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VoiceStructuredRxCard"], {
                data: output.data,
                onCopy: onCopy
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 380,
                columnNumber: 9
            }, this);
        // -- Homepage Operational Cards (H1–H12) ---------------------------------
        case "patient_list":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$PatientListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientListCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 388,
                columnNumber: 14
            }, this);
        case "follow_up_list":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$FollowUpListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FollowUpListCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 391,
                columnNumber: 14
            }, this);
        case "revenue_bar":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$RevenueBarCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RevenueBarCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 394,
                columnNumber: 14
            }, this);
        case "revenue_comparison":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$RevenueComparisonCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RevenueComparisonCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 397,
                columnNumber: 14
            }, this);
        case "bulk_action":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$BulkActionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BulkActionCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 400,
                columnNumber: 14
            }, this);
        case "donut_chart":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$DonutChartCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DonutChartCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 403,
                columnNumber: 14
            }, this);
        case "pie_chart":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$PieChartCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChartCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 406,
                columnNumber: 14
            }, this);
        case "line_graph":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$LineGraphCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineGraphCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 409,
                columnNumber: 14
            }, this);
        case "analytics_table":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$AnalyticsTableCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalyticsTableCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 412,
                columnNumber: 14
            }, this);
        case "condition_bar":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$ConditionBarCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConditionBarCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 415,
                columnNumber: 14
            }, this);
        case "heatmap":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$HeatmapCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeatmapCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 418,
                columnNumber: 14
            }, this);
        case "due_patients":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$DuePatientsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DuePatientsCard"], {
                data: output.data
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 421,
                columnNumber: 14
            }, this);
        case "external_cta":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$ExternalCtaCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExternalCtaCard"], {
                data: output.data
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 424,
                columnNumber: 14
            }, this);
        case "follow_up_rate":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$FollowUpRateCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FollowUpRateCard"], {
                data: output.data
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 427,
                columnNumber: 14
            }, this);
        case "welcome_card":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$WelcomeCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WelcomeCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 430,
                columnNumber: 14
            }, this);
        // -- New Card Variants ----------------------------------------------------
        case "referral":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$ReferralCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferralCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 434,
                columnNumber: 14
            }, this);
        case "vaccination_schedule":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$VaccinationScheduleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VaccinationScheduleCard"], {
                data: output.data,
                onSidebarNav: onSidebarNav,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 437,
                columnNumber: 14
            }, this);
        case "clinical_guideline":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$utility$2f$ClinicalGuidelinesCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClinicalGuidelinesCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 440,
                columnNumber: 14
            }, this);
        case "patient_timeline":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$data$2f$PatientTimelineCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientTimelineCard"], {
                data: output.data,
                onSidebarNav: onSidebarNav
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 443,
                columnNumber: 14
            }, this);
        case "rx_preview":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$action$2f$RxPreviewCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RxPreviewCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 446,
                columnNumber: 14
            }, this);
        case "billing_summary":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$BillingSummaryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BillingSummaryCard"], {
                data: output.data,
                onSidebarNav: onSidebarNav
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 449,
                columnNumber: 14
            }, this);
        case "vaccination_due_list":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$VaccinationDueListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VaccinationDueListCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 452,
                columnNumber: 14
            }, this);
        case "anc_schedule_list":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$homepage$2f$ANCScheduleListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANCScheduleListCard"], {
                data: output.data,
                onPillTap: onPillTap
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 455,
                columnNumber: 14
            }, this);
        // -- New Text Variants ----------------------------------------------------
        case "text_step":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-[4px]",
                children: output.data.steps.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-[8px] text-[14px] text-tp-slate-700",
                        style: {
                            borderLeft: "2px solid var(--tp-blue-200, #BFDBFE)",
                            paddingLeft: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-tp-blue-500",
                                children: [
                                    i + 1,
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                                lineNumber: 463,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "leading-[1.6]",
                                children: step
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                                lineNumber: 464,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                        lineNumber: 462,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 460,
                columnNumber: 9
            }, this);
        case "text_quote":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full rounded-[6px] px-[10px] py-[8px] text-[14px] leading-[1.6] text-tp-slate-600 [overflow-wrap:anywhere]",
                style: {
                    borderLeft: "3px solid var(--tp-violet-200, #DDD6FE)"
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$highlightClinicalText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["highlightClinicalText"])(output.data.quote)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 472,
                columnNumber: 9
            }, this);
        case "text_comparison":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-[1px] overflow-hidden rounded-[8px] border border-tp-slate-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-tp-slate-50 px-[8px] py-[6px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-[4px] text-[14px] font-medium text-tp-slate-500",
                                children: output.data.labelA
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                                lineNumber: 484,
                                columnNumber: 13
                            }, this),
                            output.data.itemsA.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[14px] leading-[1.6] text-tp-slate-700",
                                    children: [
                                        "• ",
                                        item
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                                    lineNumber: 486,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                        lineNumber: 483,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white px-[8px] py-[6px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-[4px] text-[14px] font-medium text-tp-slate-500",
                                children: output.data.labelB
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                                lineNumber: 490,
                                columnNumber: 13
                            }, this),
                            output.data.itemsB.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[14px] leading-[1.6] text-tp-slate-700",
                                    children: [
                                        "• ",
                                        item
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                                    lineNumber: 492,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                        lineNumber: 489,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                lineNumber: 482,
                columnNumber: 9
            }, this);
        default:
            {
                // Exhaustive check -- if new kinds are added, TypeScript will flag this
                const _exhaustive = output;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-[8px] bg-tp-slate-50 p-[8px] text-[14px] text-tp-slate-400",
                    children: [
                        "Unknown card type: ",
                        _exhaustive.kind
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/CardRenderer.tsx",
                    lineNumber: 502,
                    columnNumber: 9
                }, this);
            }
    }
}
var _c;
__turbopack_context__.k.register(_c, "CardRenderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeedbackRow",
    ()=>FeedbackRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Like1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Like1$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Like1.js [app-client] (ecmascript) <export default as Like1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Dislike$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dislike$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Dislike.js [app-client] (ecmascript) <export default as Dislike>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TickCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TickCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/TickCircle.js [app-client] (ecmascript) <export default as TickCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-snackbar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shell$2f$FeedbackBottomSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shell/FeedbackBottomSheet.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function FeedbackRow({ messageId, initialFeedback, onFeedback }) {
    _s();
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialFeedback ?? null);
    const [downSheetOpen, setDownSheetOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [snackbarOpen, setSnackbarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedbackRow.useEffect": ()=>{
            setFeedback(initialFeedback ?? null);
        }
    }["FeedbackRow.useEffect"], [
        initialFeedback
    ]);
    const handleUp = ()=>{
        if (!onFeedback) return;
        setDownSheetOpen(false);
        if (feedback === "up") return;
        setFeedback("up");
        onFeedback(messageId, "up");
    };
    /** Down selects immediately; optional sheet. Tapping down again while already down reopens the sheet */ const handleDownClick = ()=>{
        if (!onFeedback) return;
        if (feedback === "down") {
            setDownSheetOpen(true);
            return;
        }
        setFeedback("down");
        onFeedback(messageId, "down");
        setDownSheetOpen(true);
    };
    const handleDownSheetClose = ()=>{
        setDownSheetOpen(false);
    };
    const handleDownSubmit = (_comment)=>{
        setDownSheetOpen(false);
        setSnackbarOpen(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-[4px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleUp,
                        disabled: !onFeedback,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-[20px] w-[20px] items-center justify-center rounded transition-all", feedback === "up" && "text-tp-success-500", feedback === "down" && "text-tp-slate-300 hover:text-tp-success-500", feedback === null && "text-tp-slate-400 hover:text-tp-success-500"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Like1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Like1$3e$__["Like1"], {
                            size: 14,
                            variant: feedback === "up" ? "Bold" : "Linear"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleDownClick,
                        disabled: !onFeedback,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-[20px] w-[20px] items-center justify-center rounded transition-all", feedback === "down" && "text-tp-error-500", feedback === "up" && "text-tp-slate-300 hover:text-tp-error-500", feedback === null && "text-tp-slate-400 hover:text-tp-error-500"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Dislike$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dislike$3e$__["Dislike"], {
                            size: 14,
                            variant: feedback === "down" ? "Bold" : "Linear"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shell$2f$FeedbackBottomSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeedbackBottomSheet"], {
                isOpen: downSheetOpen,
                onClose: handleDownSheetClose,
                onSubmit: handleDownSubmit
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPSnackbar"], {
                open: snackbarOpen,
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center"
                },
                autoHideDuration: 2800,
                onClose: (_, reason)=>{
                    if (reason === "clickaway") return;
                    setSnackbarOpen(false);
                },
                message: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex max-w-[min(400px,calc(100vw-32px))] items-center gap-2.5 rounded-[12px] px-4 py-3 text-[14px] font-medium leading-snug text-white shadow-lg",
                    style: {
                        background: "#171725",
                        boxShadow: "0 12px 24px rgba(23,23,37,0.15)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TickCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TickCircle$3e$__["TickCircle"], {
                            size: 20,
                            variant: "Bold",
                            className: "shrink-0 text-emerald-400",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Feedback received"
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/FeedbackRow.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(FeedbackRow, "YhbgNcinKmCZky26BEfiOVH28es=");
_c = FeedbackRow;
var _c;
__turbopack_context__.k.register(_c, "FeedbackRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataCompletenessDonut",
    ()=>DataCompletenessDonut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// Ring colors — neutral palette for the inline donut (download-progress style)
const EMR_COLOR_RING = "#94A3B8" // slate-400 — neutral for ring
;
const AI_COLOR_RING = "#CBD5E1" // slate-300 — neutral for ring
;
const MISSING_COLOR = "#E2E8F0" // slate-200
;
// Tooltip colors — vivid, from original design system
const EMR_COLOR_TOOLTIP = "var(--tp-violet-500, #A461D8)" // violet-500
;
const AI_COLOR_TOOLTIP = "var(--tp-amber-500, #F5B832)" // amber-500
;
function DataCompletenessDonut({ emr, ai, missing, size = "md" }) {
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tooltipRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const showTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hideTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [pos, setPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const total = emr + ai + missing;
    if (total === 0) return null;
    const svgSize = size === "md" ? 24 : 14;
    const strokeWidth = size === "md" ? 3.5 : 2;
    const radius = (svgSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    // Arc lengths
    const emrLen = emr / total * circumference;
    const aiLen = ai / total * circumference;
    const missingLen = missing / total * circumference;
    // Center percentage (EMR + AI = verified data)
    const verifiedPct = Math.round((emr + ai) / total * 100);
    const TOOLTIP_W = 220;
    const updatePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataCompletenessDonut.useCallback[updatePosition]": ()=>{
            if (!triggerRef.current || !tooltipRef.current) return;
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipH = tooltipRef.current.offsetHeight;
            const MARGIN = 8;
            const GAP = 8;
            const triggerCenterX = triggerRect.left + triggerRect.width / 2;
            let left = triggerCenterX - TOOLTIP_W / 2;
            left = Math.max(MARGIN, Math.min(left, window.innerWidth - TOOLTIP_W - MARGIN));
            const arrowLeft = Math.max(12, Math.min(triggerCenterX - left, TOOLTIP_W - 12));
            const top = triggerRect.top - GAP - tooltipH;
            setPos({
                top,
                left,
                arrowLeft
            });
        }
    }["DataCompletenessDonut.useCallback[updatePosition]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataCompletenessDonut.useEffect": ()=>{
            if (!isVisible) {
                setPos(null);
                return;
            }
            requestAnimationFrame(updatePosition);
        }
    }["DataCompletenessDonut.useEffect"], [
        isVisible,
        updatePosition
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataCompletenessDonut.useEffect": ()=>{
            if (!isVisible) return;
            const reposition = {
                "DataCompletenessDonut.useEffect.reposition": ()=>requestAnimationFrame(updatePosition)
            }["DataCompletenessDonut.useEffect.reposition"];
            window.addEventListener("scroll", reposition, true);
            window.addEventListener("resize", reposition);
            return ({
                "DataCompletenessDonut.useEffect": ()=>{
                    window.removeEventListener("scroll", reposition, true);
                    window.removeEventListener("resize", reposition);
                }
            })["DataCompletenessDonut.useEffect"];
        }
    }["DataCompletenessDonut.useEffect"], [
        isVisible,
        updatePosition
    ]);
    const show = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataCompletenessDonut.useCallback[show]": ()=>{
            if (hideTimer.current) clearTimeout(hideTimer.current);
            showTimer.current = setTimeout({
                "DataCompletenessDonut.useCallback[show]": ()=>setIsVisible(true)
            }["DataCompletenessDonut.useCallback[show]"], 200);
        }
    }["DataCompletenessDonut.useCallback[show]"], []);
    const hide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataCompletenessDonut.useCallback[hide]": ()=>{
            if (showTimer.current) clearTimeout(showTimer.current);
            hideTimer.current = setTimeout({
                "DataCompletenessDonut.useCallback[hide]": ()=>setIsVisible(false)
            }["DataCompletenessDonut.useCallback[hide]"], 150);
        }
    }["DataCompletenessDonut.useCallback[hide]"], []);
    const keepOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataCompletenessDonut.useCallback[keepOpen]": ()=>{
            if (hideTimer.current) clearTimeout(hideTimer.current);
        }
    }["DataCompletenessDonut.useCallback[keepOpen]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataCompletenessDonut.useEffect": ()=>({
                "DataCompletenessDonut.useEffect": ()=>{
                    if (showTimer.current) clearTimeout(showTimer.current);
                    if (hideTimer.current) clearTimeout(hideTimer.current);
                }
            })["DataCompletenessDonut.useEffect"]
    }["DataCompletenessDonut.useEffect"], []);
    const tooltip = isVisible && typeof document !== "undefined" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: tooltipRef,
        className: "fixed z-[9999]",
        style: pos ? {
            top: pos.top,
            left: pos.left,
            width: TOOLTIP_W,
            opacity: 1,
            transition: "opacity 100ms ease-out"
        } : {
            top: -9999,
            left: -9999,
            width: TOOLTIP_W,
            opacity: 0
        },
        onMouseEnter: keepOpen,
        onMouseLeave: hide,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[8px] bg-white overflow-hidden px-[10px] py-[8px]",
                style: {
                    boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                    border: "1px solid rgba(148,163,184,0.2)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-[5px] text-[14px] font-semibold text-tp-slate-600",
                        children: "Data Completeness"
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                        lineNumber: 141,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-[5px] flex h-[5px] w-full overflow-hidden rounded-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: `${emr}%`,
                                    background: EMR_COLOR_TOOLTIP
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                lineNumber: 145,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: `${ai}%`,
                                    background: AI_COLOR_TOOLTIP
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                lineNumber: 146,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: `${missing}%`,
                                    background: MISSING_COLOR
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                lineNumber: 147,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                        lineNumber: 144,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-[8px] text-[14px] leading-[1.4]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-[3px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block h-[5px] w-[5px] rounded-full",
                                        style: {
                                            background: EMR_COLOR_TOOLTIP
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                        lineNumber: 153,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-tp-slate-500",
                                        children: [
                                            emr,
                                            "% EMR"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                        lineNumber: 154,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                lineNumber: 152,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-[3px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block h-[5px] w-[5px] rounded-full",
                                        style: {
                                            background: AI_COLOR_TOOLTIP
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                        lineNumber: 157,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-tp-slate-500",
                                        children: [
                                            ai,
                                            "% Doc. Extraction"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                        lineNumber: 158,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                lineNumber: 156,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-[3px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block h-[5px] w-[5px] rounded-full",
                                        style: {
                                            background: MISSING_COLOR
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                        lineNumber: 161,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-tp-slate-500",
                                        children: [
                                            missing,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                        lineNumber: 162,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                                lineNumber: 160,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                        lineNumber: 151,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                lineNumber: 134,
                columnNumber: 13
            }, this),
            pos && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    paddingLeft: pos.arrowLeft - 5
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 0,
                        height: 0,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "5px solid white",
                        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.06))"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                    lineNumber: 169,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                lineNumber: 168,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
        lineNumber: 123,
        columnNumber: 11
    }, this), document.body) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: triggerRef,
        className: "flex-shrink-0 cursor-default",
        onMouseEnter: show,
        onMouseLeave: hide,
        onClick: ()=>setIsVisible((v)=>!v),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: svgSize,
                height: svgSize,
                viewBox: `0 0 ${svgSize} ${svgSize}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: svgSize / 2,
                        cy: svgSize / 2,
                        r: radius,
                        fill: "none",
                        stroke: MISSING_COLOR,
                        strokeWidth: strokeWidth,
                        opacity: 0.5
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: svgSize / 2,
                        cy: svgSize / 2,
                        r: radius,
                        fill: "none",
                        stroke: EMR_COLOR_RING,
                        strokeWidth: strokeWidth,
                        strokeDasharray: `${emrLen} ${circumference - emrLen}`,
                        strokeDashoffset: 0,
                        strokeLinecap: "round",
                        transform: `rotate(-90 ${svgSize / 2} ${svgSize / 2}) scale(1, -1) translate(0, -${svgSize})`
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: svgSize / 2,
                        cy: svgSize / 2,
                        r: radius,
                        fill: "none",
                        stroke: AI_COLOR_RING,
                        strokeWidth: strokeWidth,
                        strokeDasharray: `${aiLen} ${circumference - aiLen}`,
                        strokeDashoffset: -emrLen,
                        strokeLinecap: "round",
                        transform: `rotate(-90 ${svgSize / 2} ${svgSize / 2}) scale(1, -1) translate(0, -${svgSize})`
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: svgSize / 2,
                        cy: svgSize / 2,
                        r: radius,
                        fill: "none",
                        stroke: MISSING_COLOR,
                        strokeWidth: strokeWidth,
                        strokeDasharray: `${missingLen} ${circumference - missingLen}`,
                        strokeDashoffset: -(emrLen + aiLen),
                        transform: `rotate(-90 ${svgSize / 2} ${svgSize / 2}) scale(1, -1) translate(0, -${svgSize})`
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    size === "md" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: svgSize / 2,
                        y: svgSize / 2,
                        textAnchor: "middle",
                        dominantBaseline: "central",
                        fontSize: "7",
                        fontWeight: "600",
                        fill: "#64748B",
                        children: verifiedPct
                    }, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            tooltip
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/dr-agent/cards/DataCompletenessDonut.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
_s(DataCompletenessDonut, "RpLz9zpxtdrw9pJa7zMrD9Ixork=");
_c = DataCompletenessDonut;
var _c;
__turbopack_context__.k.register(_c, "DataCompletenessDonut");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_tp-rxpad_dr-agent_cards_9092ff63._.js.map