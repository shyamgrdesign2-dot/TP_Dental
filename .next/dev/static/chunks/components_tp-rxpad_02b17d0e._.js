(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/tp-rxpad/rxpad-sync-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RxPadSyncProvider",
    ()=>RxPadSyncProvider,
    "useRxPadSync",
    ()=>useRxPadSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const RxPadSyncContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    lastCopyRequest: null,
    lastSignal: null,
    requestCopyToRxPad: ()=>{},
    publishSignal: ()=>{},
    patientAllergies: [],
    setPatientAllergies: ()=>{}
});
function RxPadSyncProvider({ children }) {
    _s();
    const [lastCopyRequest, setLastCopyRequest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastSignal, setLastSignal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copySequence, setCopySequence] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [signalSequence, setSignalSequence] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [patientAllergies, setPatientAllergies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const requestCopyToRxPad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadSyncProvider.useCallback[requestCopyToRxPad]": (payload)=>{
            setCopySequence({
                "RxPadSyncProvider.useCallback[requestCopyToRxPad]": (prev)=>{
                    const next = prev + 1;
                    setLastCopyRequest({
                        id: next,
                        payload
                    });
                    return next;
                }
            }["RxPadSyncProvider.useCallback[requestCopyToRxPad]"]);
        }
    }["RxPadSyncProvider.useCallback[requestCopyToRxPad]"], []);
    const publishSignal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadSyncProvider.useCallback[publishSignal]": (signal)=>{
            setSignalSequence({
                "RxPadSyncProvider.useCallback[publishSignal]": (prev)=>{
                    const next = prev + 1;
                    setLastSignal({
                        id: next,
                        ...signal
                    });
                    return next;
                }
            }["RxPadSyncProvider.useCallback[publishSignal]"]);
        }
    }["RxPadSyncProvider.useCallback[publishSignal]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RxPadSyncProvider.useMemo[value]": ()=>({
                lastCopyRequest,
                lastSignal,
                requestCopyToRxPad,
                publishSignal,
                patientAllergies,
                setPatientAllergies
            })
    }["RxPadSyncProvider.useMemo[value]"], [
        lastCopyRequest,
        lastSignal,
        requestCopyToRxPad,
        publishSignal,
        patientAllergies
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RxPadSyncContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/rxpad-sync-context.tsx",
        lineNumber: 130,
        columnNumber: 10
    }, this);
}
_s(RxPadSyncProvider, "ywQLFAx65OhYI/7iot9i+naE9Qg=");
_c = RxPadSyncProvider;
function useRxPadSync() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(RxPadSyncContext);
}
_s1(useRxPadSync, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "RxPadSyncProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/rxpad-chrome-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RxPadChromeContext",
    ()=>RxPadChromeContext,
    "RxPadChromeProvider",
    ()=>RxPadChromeProvider,
    "useRxPadChrome",
    ()=>useRxPadChrome
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
function chromeReducer(state, action) {
    switch(action.type){
        case "set_dr_agent":
            if (action.open) {
                return {
                    drAgentOpen: true,
                    secondarySidebarActiveId: null
                };
            }
            return {
                ...state,
                drAgentOpen: false
            };
        case "set_dr_agent_functional":
            {
                const next = action.fn(state.drAgentOpen);
                if (next) {
                    return {
                        drAgentOpen: true,
                        secondarySidebarActiveId: null
                    };
                }
                return {
                    ...state,
                    drAgentOpen: false
                };
            }
        case "toggle_secondary":
            {
                const nextId = state.secondarySidebarActiveId === action.id ? null : action.id;
                if (nextId) {
                    return {
                        drAgentOpen: false,
                        secondarySidebarActiveId: nextId
                    };
                }
                return {
                    ...state,
                    secondarySidebarActiveId: null
                };
            }
        case "set_secondary":
            if (action.id) {
                return {
                    drAgentOpen: false,
                    secondarySidebarActiveId: action.id
                };
            }
            return {
                ...state,
                secondarySidebarActiveId: null
            };
        default:
            return state;
    }
}
const RxPadChromeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function RxPadChromeProvider({ children }) {
    _s();
    const [rxPadExamTab, setRxPadExamTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("base");
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(chromeReducer, {
        drAgentOpen: false,
        secondarySidebarActiveId: null
    });
    const setDrAgentOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadChromeProvider.useCallback[setDrAgentOpen]": (open)=>{
            if (typeof open === "function") {
                dispatch({
                    type: "set_dr_agent_functional",
                    fn: open
                });
            } else {
                dispatch({
                    type: "set_dr_agent",
                    open
                });
            }
        }
    }["RxPadChromeProvider.useCallback[setDrAgentOpen]"], []);
    const toggleSecondarySidebar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadChromeProvider.useCallback[toggleSecondarySidebar]": (id)=>{
            dispatch({
                type: "toggle_secondary",
                id
            });
        }
    }["RxPadChromeProvider.useCallback[toggleSecondarySidebar]"], []);
    const setSecondarySidebarActiveId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadChromeProvider.useCallback[setSecondarySidebarActiveId]": (id)=>{
            dispatch({
                type: "set_secondary",
                id
            });
        }
    }["RxPadChromeProvider.useCallback[setSecondarySidebarActiveId]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RxPadChromeProvider.useMemo[value]": ()=>({
                drAgentOpen: state.drAgentOpen,
                setDrAgentOpen,
                secondarySidebarActiveId: state.secondarySidebarActiveId,
                toggleSecondarySidebar,
                setSecondarySidebarActiveId,
                rxPadExamTab,
                setRxPadExamTab
            })
    }["RxPadChromeProvider.useMemo[value]"], [
        state.drAgentOpen,
        state.secondarySidebarActiveId,
        setDrAgentOpen,
        toggleSecondarySidebar,
        setSecondarySidebarActiveId,
        rxPadExamTab
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RxPadChromeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/rxpad-chrome-context.tsx",
        lineNumber: 115,
        columnNumber: 10
    }, this);
}
_s(RxPadChromeProvider, "AUT4fan4t6a3UcIvrlajU6Q0fJc=");
_c = RxPadChromeProvider;
function useRxPadChrome() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(RxPadChromeContext);
    if (!ctx) {
        throw new Error("useRxPadChrome must be used within RxPadChromeProvider");
    }
    return ctx;
}
_s1(useRxPadChrome, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "RxPadChromeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dental-ai/dental-ai-events.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Dispatched on `window` — see `DentalCanvas` listener. detail: { patientId, teeth, focusFdi?, openFullDentition?, highlightFdis?, patientTypeHint? } */ __turbopack_context__.s([
    "DENTAL_AI_SCAN_APPLY_EVENT",
    ()=>DENTAL_AI_SCAN_APPLY_EVENT
]);
const DENTAL_AI_SCAN_APPLY_EVENT = "tp:apply-dental-ai-scan";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dental-ai/emit-dental-scan-apply.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "emitDentalScanApplyNormalized",
    ()=>emitDentalScanApplyNormalized
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appointment-patients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$dental$2d$ai$2d$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dental-ai/dental-ai-events.js [app-client] (ecmascript)");
;
;
function emitDentalScanApplyNormalized(raw) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const ap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppointmentPatient"])(raw.patientId);
    const inferredDentition = ap.age < 12 ? "pediatric" : "adult";
    const teethArr = Array.isArray(raw.teeth) ? raw.teeth : [];
    const highlightFromTeeth = teethArr.map((t)=>t && typeof t === "object" && "fdi" in t && t.fdi != null ? String(t.fdi) : null).filter((x)=>Boolean(x));
    const detail = {
        ...raw,
        openFullDentition: raw.openFullDentition !== false,
        patientTypeHint: raw.patientTypeHint ?? inferredDentition,
        highlightFdis: raw.highlightFdis?.length ? raw.highlightFdis : highlightFromTeeth
    };
    window.dispatchEvent(new CustomEvent("tp:open-dental-exam"));
    /* Let RxPad switch to the dental carousel panel before the chart listener runs. */ window.setTimeout(()=>{
        window.dispatchEvent(new CustomEvent(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$dental$2d$ai$2d$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DENTAL_AI_SCAN_APPLY_EVENT"], {
            detail
        }));
    }, 48);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/RxPreviewDocument.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "buildingIcon": "RxPreviewDocument-module-scss-module__FSk_1W__buildingIcon",
  "bullet": "RxPreviewDocument-module-scss-module__FSk_1W__bullet",
  "clinicName": "RxPreviewDocument-module-scss-module__FSk_1W__clinicName",
  "comma": "RxPreviewDocument-module-scss-module__FSk_1W__comma",
  "contentStack": "RxPreviewDocument-module-scss-module__FSk_1W__contentStack",
  "continueBody": "RxPreviewDocument-module-scss-module__FSk_1W__continueBody",
  "dentalBlocks": "RxPreviewDocument-module-scss-module__FSk_1W__dentalBlocks",
  "dentalDate": "RxPreviewDocument-module-scss-module__FSk_1W__dentalDate",
  "dentalSection": "RxPreviewDocument-module-scss-module__FSk_1W__dentalSection",
  "dentalTitle": "RxPreviewDocument-module-scss-module__FSk_1W__dentalTitle",
  "docLine": "RxPreviewDocument-module-scss-module__FSk_1W__docLine",
  "emptyPad": "RxPreviewDocument-module-scss-module__FSk_1W__emptyPad",
  "emptyText": "RxPreviewDocument-module-scss-module__FSk_1W__emptyText",
  "footer": "RxPreviewDocument-module-scss-module__FSk_1W__footer",
  "footerText": "RxPreviewDocument-module-scss-module__FSk_1W__footerText",
  "icon14": "RxPreviewDocument-module-scss-module__FSk_1W__icon14",
  "letterLeft": "RxPreviewDocument-module-scss-module__FSk_1W__letterLeft",
  "letterRow": "RxPreviewDocument-module-scss-module__FSk_1W__letterRow",
  "letterhead": "RxPreviewDocument-module-scss-module__FSk_1W__letterhead",
  "list": "RxPreviewDocument-module-scss-module__FSk_1W__list",
  "listLi": "RxPreviewDocument-module-scss-module__FSk_1W__listLi",
  "logoBox": "RxPreviewDocument-module-scss-module__FSk_1W__logoBox",
  "medIcon14": "RxPreviewDocument-module-scss-module__FSk_1W__medIcon14",
  "metaLine": "RxPreviewDocument-module-scss-module__FSk_1W__metaLine",
  "metaMuted": "RxPreviewDocument-module-scss-module__FSk_1W__metaMuted",
  "metaSep": "RxPreviewDocument-module-scss-module__FSk_1W__metaSep",
  "miniBody": "RxPreviewDocument-module-scss-module__FSk_1W__miniBody",
  "miniSection": "RxPreviewDocument-module-scss-module__FSk_1W__miniSection",
  "page": "RxPreviewDocument-module-scss-module__FSk_1W__page",
  "patientCol": "RxPreviewDocument-module-scss-module__FSk_1W__patientCol",
  "patientLine": "RxPreviewDocument-module-scss-module__FSk_1W__patientLine",
  "patientRight": "RxPreviewDocument-module-scss-module__FSk_1W__patientRight",
  "patientRow": "RxPreviewDocument-module-scss-module__FSk_1W__patientRow",
  "patientSection": "RxPreviewDocument-module-scss-module__FSk_1W__patientSection",
  "patientStrong": "RxPreviewDocument-module-scss-module__FSk_1W__patientStrong",
  "rowTitle": "RxPreviewDocument-module-scss-module__FSk_1W__rowTitle",
  "rule": "RxPreviewDocument-module-scss-module__FSk_1W__rule",
  "section": "RxPreviewDocument-module-scss-module__FSk_1W__section",
  "sectionHead": "RxPreviewDocument-module-scss-module__FSk_1W__sectionHead",
  "sectionTitle": "RxPreviewDocument-module-scss-module__FSk_1W__sectionTitle",
  "sheet": "RxPreviewDocument-module-scss-module__FSk_1W__sheet",
  "sheetBody": "RxPreviewDocument-module-scss-module__FSk_1W__sheetBody",
  "subBullet": "RxPreviewDocument-module-scss-module__FSk_1W__subBullet",
  "subLine": "RxPreviewDocument-module-scss-module__FSk_1W__subLine",
  "subStack": "RxPreviewDocument-module-scss-module__FSk_1W__subStack",
  "subStrong": "RxPreviewDocument-module-scss-module__FSk_1W__subStrong",
  "toothBlock": "RxPreviewDocument-module-scss-module__FSk_1W__toothBlock",
  "toothLabel": "RxPreviewDocument-module-scss-module__FSk_1W__toothLabel",
});
}),
"[project]/components/tp-rxpad/RxPreviewDocument.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RxPreviewDocument",
    ()=>RxPreviewDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Calendar2.js [app-client] (ecmascript) <export default as Calendar2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Notepad2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notepad2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Notepad2.js [app-client] (ecmascript) <export default as Notepad2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$ToothIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/ToothIcon.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/RxPreviewDocument.module.scss [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appointment-patients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$FlatDentitionChart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/FlatDentitionChart.jsx [app-client] (ecmascript)");
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
function renderMeta(metaParts) {
    if (metaParts.length === 0) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaMuted,
        children: [
            " (",
            metaParts.map((part, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                    children: [
                        index > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaSep,
                            children: " | "
                        }) : null,
                        part
                    ]
                }, `${part}-${index}`)),
            ")"
        ]
    });
}
// Renders a section's rows in the chosen print variant: "list" (bulleted),
// "inline" (comma-joined on one line), or "table" (Name | Details columns).
function SectionRows({ rows, view, kp }) {
    if (view === "inline") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
            style: {
                margin: 0,
                fontSize: 11.5,
                color: "#475569",
                lineHeight: 1.5
            },
            children: rows.map((row, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                    children: [
                        index > 0 ? ", " : "",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            style: {
                                fontWeight: 600,
                                color: "#334155"
                            },
                            children: row.title
                        }),
                        renderMeta(row.metaParts)
                    ]
                }, `${kp}-${index}`))
        });
    }
    if (view === "table") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("table", {
            style: {
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 11.5,
                fontFamily: "Inter, sans-serif"
            },
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tbody", {
                children: rows.map((row, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("tr", {
                        style: {
                            borderTop: "1px solid #f1f5f9"
                        },
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                style: {
                                    padding: "4px 10px 4px 0",
                                    fontWeight: 600,
                                    color: "#334155",
                                    verticalAlign: "top",
                                    width: "42%"
                                },
                                children: row.title
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                style: {
                                    padding: "4px 0",
                                    color: "#475569",
                                    verticalAlign: "top"
                                },
                                children: row.metaParts.length ? row.metaParts.join(" | ") : "—"
                            })
                        ]
                    }, `${kp}-${index}`))
            })
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("ul", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].list,
        children: rows.map((row, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("li", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].listLi,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rowTitle,
                        children: row.title
                    }),
                    renderMeta(row.metaParts)
                ]
            }, `${kp}-${index}`))
    });
}
_c = SectionRows;
function SectionList({ title, rows, icon, view = "list" }) {
    if (!rows.length) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionHead,
                children: [
                    icon ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon14,
                        children: icon
                    }) : null,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h3", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                        children: title
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SectionRows, {
                rows: rows,
                view: view,
                kp: title
            })
        ]
    });
}
_c1 = SectionList;
function RxMedicalSectionIcon({ name }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
        name: name,
        variant: "bulk",
        size: 14,
        color: "var(--tp-slate-500)",
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].medIcon14
    });
}
_c2 = RxMedicalSectionIcon;
// --- Dental Examination, split into header + per-tooth nodes so the section can
// flow across A4 pages (one tooth per paginatable block) instead of being clipped.
const DENTAL_DL = {
    margin: 0,
    fontSize: 11.5,
    color: "#475569",
    display: "flex",
    gap: 5,
    alignItems: "baseline",
    lineHeight: 1.4
};
function dentalSub(label, items, kp) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                style: DENTAL_DL,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        style: {
                            color: "#cbd5e1"
                        },
                        children: "•"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        style: {
                            fontWeight: 600,
                            color: "#334155"
                        },
                        children: label
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: {
                    paddingLeft: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    marginTop: 1
                },
                children: items.map((item, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                        style: DENTAL_DL,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                style: {
                                    color: "#94a3b8"
                                },
                                children: "•"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                        style: {
                                            fontWeight: 600,
                                            color: "#334155"
                                        },
                                        children: item.title
                                    }),
                                    renderMeta(item.metaParts)
                                ]
                            })
                        ]
                    }, `${kp}-${i}`))
            })
        ]
    });
}
// Per-tooth "(date)" annotation removed — the printed Rx and the Dental
// History card now render only the tooth label, regardless of whether
// the entry comes from the current visit or historical data.
function dentalToothListNode(block) {
    const toothLabel = block?.toothLabel || "";
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                style: {
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1e293b",
                    display: "flex",
                    gap: 6,
                    alignItems: "baseline"
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        style: {
                            color: "#1e293b"
                        },
                        children: "•"
                    }),
                    toothLabel
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                style: {
                    paddingLeft: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    marginTop: 2
                },
                children: [
                    block.treatmentHistory.length ? dentalSub("Past Procedures", block.treatmentHistory, "th") : null,
                    block.findings.length ? dentalSub("Findings", block.findings, "fd") : null,
                    block.procedures.length ? dentalSub("Procedures", block.procedures, "pr") : null,
                    block.overallToothNote ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                style: DENTAL_DL,
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                        style: {
                                            color: "#cbd5e1"
                                        },
                                        children: "•"
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                        style: {
                                            fontWeight: 600,
                                            color: "#334155"
                                        },
                                        children: "Overall Tooth Notes"
                                    })
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                style: {
                                    paddingLeft: 14,
                                    marginTop: 1
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                    style: DENTAL_DL,
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                            style: {
                                                color: "#94a3b8"
                                            },
                                            children: "•"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                            children: block.overallToothNote
                                        })
                                    ]
                                })
                            })
                        ]
                    }) : null
                ]
            })
        ]
    });
}
function dentalToothInlineNode(block) {
    // Each item: name + optional (metaparts). Item titles stay slate-700 so the
    // doctor's eye lands on the procedure/finding name; metadata is slate-500.
    const fmtItems = (items)=>items.map((it)=>it.title + (it.metaParts.length ? ` (${it.metaParts.join(" | ")})` : "")).join(", ");
    // Build a list of {label, items} segments, then render each label as a bold
    // slate-900 span (was: plain string joined with "; ", which inherited the
    // paragraph's slate-600 colour and made labels disappear into the body).
    const segs = [
        {
            label: "Past Procedures",
            text: block.treatmentHistory.length ? fmtItems(block.treatmentHistory) : null
        },
        {
            label: "Findings",
            text: block.findings.length ? fmtItems(block.findings) : null
        },
        {
            label: "Procedures",
            text: block.procedures.length ? fmtItems(block.procedures) : null
        },
        {
            label: "Notes",
            text: block.overallToothNote || null
        }
    ].filter((s)=>s.text);
    const toothLabel = block?.toothLabel || "";
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
        style: {
            margin: 0,
            fontSize: 11.5,
            color: "#334155",
            lineHeight: 1.45
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                style: {
                    fontWeight: 700,
                    color: "#0f172a"
                },
                children: `${toothLabel}:`
            }),
            " ",
            ...segs.flatMap((s, i)=>[
                    i > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        style: {
                            color: "#94a3b8"
                        },
                        children: "; "
                    }, `sep-${i}`) : null,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                style: {
                                    fontWeight: 700,
                                    color: "#1e293b"
                                },
                                children: [
                                    s.label,
                                    ":"
                                ]
                            }),
                            " ",
                            s.text
                        ]
                    }, `seg-${i}`)
                ].filter(Boolean))
        ]
    });
}
// Resolve a preview line into table columns. Prefers structured `cols`; falls
// back to positional metaParts ([surfaces, since, ...note]) for older snapshots.
function lineCols(row) {
    if (row.cols) return {
        surfaces: row.cols.surfaces || "",
        since: row.cols.since || "",
        note: row.cols.note || ""
    };
    const m = row.metaParts || [];
    return {
        surfaces: m[0] || "",
        since: m[1] || "",
        note: m.slice(2).join(" · ")
    };
}
// One tooth rendered as a self-contained nested table (TP design system styling):
// a grey tooth header, then a Past Procedures / Findings / Procedures sub-table
// each with Name | Surfaces | Since | Notes columns, then overall notes.
function dentalToothTableNode(block) {
    const wrap = {
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact"
    };
    const toothHead = {
        background: "#eef2f7",
        padding: "6px 10px",
        fontSize: 11,
        fontWeight: 700,
        color: "#1e293b",
        borderBottom: "1px solid #e2e8f0"
    };
    const catSection = {
        borderTop: "1px solid #dde3ec"
    };
    const catLabel = {
        padding: "5px 10px",
        fontSize: 9,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        color: "#64748b",
        background: "#eef1f5",
        borderBottom: "1px solid #e2e8f0"
    };
    const tbl = {
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed"
    };
    const th = {
        textAlign: "left",
        padding: "3px 8px",
        fontSize: 8.5,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.4px",
        color: "#94a3b8",
        background: "#f7f9fb",
        borderBottom: "1px solid #e6ebf1"
    };
    const td = {
        padding: "4px 8px",
        fontSize: 10,
        color: "#475569",
        verticalAlign: "top",
        borderTop: "1px solid #e6ebf1",
        wordBreak: "break-word"
    };
    const tdName = {
        ...td,
        fontWeight: 600,
        color: "#334155"
    };
    const colW = [
        "30%",
        "22%",
        "18%",
        "30%"
    ];
    const catTable = (label, rows)=>rows.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: catSection,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: catLabel,
                    children: label
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("table", {
                    style: tbl,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("thead", {
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tr", {
                                children: [
                                    "Name",
                                    "Surfaces",
                                    "Since",
                                    "Notes"
                                ].map((t, ci)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("th", {
                                        style: {
                                            ...th,
                                            width: colW[ci]
                                        },
                                        children: t
                                    }, t))
                            })
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tbody", {
                            children: rows.map((r, ri)=>{
                                const c = lineCols(r);
                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("tr", {
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                            style: tdName,
                                            children: r.title
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                            style: td,
                                            children: c.surfaces || "—"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                            style: td,
                                            children: c.since || "—"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                            style: td,
                                            children: c.note || "—"
                                        })
                                    ]
                                }, ri);
                            })
                        })
                    ]
                })
            ]
        }) : null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        style: wrap,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: toothHead,
                children: block?.toothLabel || ""
            }),
            catTable("Past Procedures", block.treatmentHistory),
            catTable("Findings", block.findings),
            catTable("Procedures", block.procedures),
            block.overallToothNote ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                style: catSection,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        style: catLabel,
                        children: "Overall Tooth Notes"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        style: {
                            padding: "5px 10px",
                            fontSize: 10,
                            color: "#475569"
                        },
                        children: block.overallToothNote
                    })
                ]
            }) : null
        ]
    });
}
// ──────────────────────────────────────────────────────────────────────
// "By Type" rendering — same dental data pivoted so the heading is the
// CATEGORY (Past Procedures / Findings / Procedures / Overall Teeth
// Notes) and the rows underneath are the teeth that have that kind.
// Mirrors the three views (list / inline / table) so toggling Group By
// stays consistent with whichever Layout is selected.
// ──────────────────────────────────────────────────────────────────────
// Pull the FDI number out of "Upper Right First Molar (T16)" so we can
// sort by-type rows in FDI order (consistent with the chart order).
function extractFdi(label) {
    const m = (label || "").match(/T(\d+)/);
    return m ? parseInt(m[1], 10) : 9999;
}
// Build the four category buckets from the dental blocks, sorted by FDI.
// Each bucket: { key, label, toothRows: [{ tooth, fdi, items }] }
// `items` is an array of { title, metaParts, cols }. For the notes
// bucket we synthesise a single-item array carrying the note text as the
// title so the renderer can stay uniform.
function buildByTypeBuckets(dentalBlocks) {
    const sorted = [
        ...dentalBlocks
    ].sort((a, b)=>extractFdi(a.toothLabel) - extractFdi(b.toothLabel));
    const buckets = [
        {
            key: "past",
            label: "Past Procedures",
            get: (b)=>b.treatmentHistory || [],
            isNote: false
        },
        {
            key: "findings",
            label: "Findings",
            get: (b)=>b.findings || [],
            isNote: false
        },
        {
            key: "procedures",
            label: "Procedures",
            get: (b)=>b.procedures || [],
            isNote: false
        },
        {
            key: "notes",
            label: "Overall Teeth Notes",
            get: (b)=>b.overallToothNote && b.overallToothNote.trim() ? [
                    {
                        title: b.overallToothNote,
                        metaParts: [],
                        cols: {
                            surfaces: "",
                            since: "",
                            note: ""
                        }
                    }
                ] : [],
            isNote: true
        }
    ];
    return buckets.map((bk)=>{
        const toothRows = sorted.map((block)=>{
            const items = bk.get(block);
            if (!items.length) return null;
            return {
                tooth: block?.toothLabel || "",
                fdi: extractFdi(block.toothLabel),
                items
            };
        }).filter(Boolean);
        return {
            ...bk,
            toothRows
        };
    }).filter((bk)=>bk.toothRows.length > 0);
}
function byTypeListNode(bucket) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                style: {
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1e293b",
                    display: "flex",
                    gap: 6,
                    alignItems: "baseline"
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        style: {
                            color: "#1e293b"
                        },
                        children: "•"
                    }),
                    bucket.label
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: {
                    paddingLeft: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    marginTop: 2
                },
                children: bucket.toothRows.map((tr, ti)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                style: DENTAL_DL,
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                        style: {
                                            color: "#cbd5e1"
                                        },
                                        children: "•"
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                        style: {
                                            fontWeight: 600,
                                            color: "#334155"
                                        },
                                        children: `${tr.tooth}:`
                                    })
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                style: {
                                    paddingLeft: 14,
                                    marginTop: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1
                                },
                                children: tr.items.map((it, ii)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                        style: DENTAL_DL,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                style: {
                                                    color: "#94a3b8"
                                                },
                                                children: "•"
                                            }),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                                children: [
                                                    bucket.isNote ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                        style: {
                                                            fontWeight: 600,
                                                            color: "#334155"
                                                        },
                                                        children: it.title
                                                    }),
                                                    bucket.isNote ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                        children: it.title
                                                    }) : renderMeta(it.metaParts)
                                                ]
                                            })
                                        ]
                                    }, `${bucket.key}-${ti}-${ii}`))
                            })
                        ]
                    }, `${bucket.key}-${ti}`))
            })
        ]
    });
}
function byTypeInlineNode(bucket) {
    const fmtItems = (items)=>items.map((it)=>bucket.isNote ? it.title : it.title + (it.metaParts.length ? ` (${it.metaParts.join(" | ")})` : "")).join(", ");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
        style: {
            margin: 0,
            fontSize: 11.5,
            color: "#334155",
            lineHeight: 1.45
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                style: {
                    fontWeight: 700,
                    color: "#0f172a"
                },
                children: [
                    bucket.label,
                    ":"
                ]
            }),
            " ",
            ...bucket.toothRows.flatMap((tr, i)=>[
                    i > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        style: {
                            color: "#94a3b8"
                        },
                        children: "; "
                    }, `sep-${bucket.key}-${i}`) : null,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                style: {
                                    fontWeight: 700,
                                    color: "#1e293b"
                                },
                                children: [
                                    tr.tooth,
                                    ":"
                                ]
                            }),
                            " ",
                            fmtItems(tr.items)
                        ]
                    }, `seg-${bucket.key}-${i}`)
                ].filter(Boolean))
        ]
    });
}
function byTypeTableNode(bucket) {
    const wrap = {
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact"
    };
    const head = {
        background: "#eef2f7",
        padding: "6px 10px",
        fontSize: 11,
        fontWeight: 700,
        color: "#1e293b",
        borderBottom: "1px solid #e2e8f0"
    };
    const tbl = {
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed"
    };
    const th = {
        textAlign: "left",
        padding: "3px 8px",
        fontSize: 8.5,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.4px",
        color: "#94a3b8",
        background: "#f7f9fb",
        borderBottom: "1px solid #e6ebf1"
    };
    const td = {
        padding: "4px 8px",
        fontSize: 10,
        color: "#475569",
        verticalAlign: "top",
        borderTop: "1px solid #e6ebf1",
        wordBreak: "break-word"
    };
    const tdName = {
        ...td,
        fontWeight: 600,
        color: "#334155"
    };
    // Build one row per item, prefixed by tooth label. Notes use a 2-col
    // layout (Tooth | Note); the other buckets keep the same 4-col shape
    // as the by-tooth table so column widths read as familiar.
    if (bucket.isNote) {
        const rows = bucket.toothRows.flatMap((tr)=>tr.items.map((it)=>({
                    tooth: tr.tooth,
                    note: it.title
                })));
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: wrap,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: head,
                    children: bucket.label
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("table", {
                    style: tbl,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("colgroup", {
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("col", {
                                    style: {
                                        width: "34%"
                                    }
                                }, "c0"),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("col", {
                                    style: {
                                        width: "66%"
                                    }
                                }, "c1")
                            ]
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("thead", {
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tr", {
                                children: [
                                    "Tooth",
                                    "Note"
                                ].map((t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("th", {
                                        style: th,
                                        children: t
                                    }, t))
                            })
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tbody", {
                            children: rows.map((r, ri)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("tr", {
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                            style: tdName,
                                            children: r.tooth
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                            style: td,
                                            children: r.note || "—"
                                        })
                                    ]
                                }, ri))
                        })
                    ]
                })
            ]
        });
    }
    const rows = bucket.toothRows.flatMap((tr)=>tr.items.map((it)=>({
                tooth: tr.tooth,
                item: it
            })));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        style: wrap,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: head,
                children: bucket.label
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("table", {
                style: tbl,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("colgroup", {
                        children: [
                            "28%",
                            "26%",
                            "16%",
                            "12%",
                            "18%"
                        ].map((w, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("col", {
                                style: {
                                    width: w
                                }
                            }, `c${i}`))
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("thead", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tr", {
                            children: [
                                "Tooth",
                                "Name",
                                "Surfaces",
                                "Since",
                                "Notes"
                            ].map((t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("th", {
                                    style: th,
                                    children: t
                                }, t))
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tbody", {
                        children: rows.map((r, ri)=>{
                            const c = lineCols(r.item);
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("tr", {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                        style: tdName,
                                        children: r.tooth
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                        style: tdName,
                                        children: r.item.title
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                        style: td,
                                        children: c.surfaces || "—"
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                        style: td,
                                        children: c.since || "—"
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                        style: td,
                                        children: c.note || "—"
                                    })
                                ]
                            }, ri);
                        })
                    })
                ]
            })
        ]
    });
}
// "Dental Examination" section heading — date suffix removed; the
// section reads as just the title now. (The snapshot argument is kept
// for API symmetry in case future variants want to append a derived
// label, but is no longer referenced.)
function dentalHeaderNode(_snapshot, titleSuffix) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("h3", {
        style: {
            fontSize: 12,
            fontWeight: 700,
            color: "#334155",
            margin: "0 0 6px",
            fontFamily: "Inter, sans-serif"
        },
        children: [
            "Dental Examination",
            titleSuffix ? ` ${titleSuffix}` : ""
        ].filter(Boolean)
    });
}
// Flows content blocks across as many A4 sheets as needed. Heights are MEASURED
// from a hidden replica sheet (not estimated) so the true body capacity and each
// block's real rendered height are known. Blocks are packed so overflow (e.g. the
// dental chart) moves onto a fresh sheet rather than being clipped by the fixed
// A4 aspect-ratio + overflow:hidden. Every page repeats letterhead, patient & footer.
function packBlocks(heights, capacity, gap) {
    const pages = [];
    let cur = [];
    let h = 0;
    for(let i = 0; i < heights.length; i++){
        const bh = heights[i];
        const add = (cur.length ? gap : 0) + bh;
        if (cur.length && h + add > capacity) {
            pages.push(cur);
            cur = [];
            h = 0;
        }
        cur.push(i);
        h += (cur.length > 1 ? gap : 0) + bh;
    }
    if (cur.length) pages.push(cur);
    if (!pages.length) pages.push([]);
    return pages;
}
function PaginatedRx({ blocks, renderHead, renderPatient, renderFoot }) {
    _s();
    const measureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bodyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [pages, setPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PaginatedRx.useState": ()=>[
                blocks.map({
                    "PaginatedRx.useState": (_, i)=>i
                }["PaginatedRx.useState"])
            ]
    }["PaginatedRx.useState"]);
    // Recompute whenever the set/order of blocks changes.
    const sig = blocks.map((b)=>b.key).join("|");
    // Re-seed pages synchronously when blocks change so we never render with
    // stale indices that point past the new blocks array (e.g. toggling
    // showDentalChart off removes the chart block but old pages still ref it).
    // Render-phase setState is safe when conditional — React rebases.
    const lastSigRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(sig);
    let effectivePages = pages;
    if (lastSigRef.current !== sig) {
        lastSigRef.current = sig;
        effectivePages = [
            blocks.map((_, i)=>i)
        ];
        setPages(effectivePages);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "PaginatedRx.useLayoutEffect": ()=>{
            const mc = measureRef.current;
            const body = bodyRef.current;
            if (!mc || !body) return;
            const recompute = {
                "PaginatedRx.useLayoutEffect.recompute": ()=>{
                    const cs = getComputedStyle(body);
                    const padTop = parseFloat(cs.paddingTop) || 0;
                    const padBottom = parseFloat(cs.paddingBottom) || 0;
                    const capacity = body.clientHeight - padTop - padBottom;
                    if (capacity <= 0) return;
                    const heights = Array.from(mc.children).map({
                        "PaginatedRx.useLayoutEffect.recompute.heights": (el)=>el.getBoundingClientRect().height
                    }["PaginatedRx.useLayoutEffect.recompute.heights"]);
                    if (!heights.length) return;
                    const next = packBlocks(heights, capacity, 10);
                    setPages({
                        "PaginatedRx.useLayoutEffect.recompute": (prev)=>JSON.stringify(prev) === JSON.stringify(next) ? prev : next
                    }["PaginatedRx.useLayoutEffect.recompute"]);
                }
            }["PaginatedRx.useLayoutEffect.recompute"];
            recompute();
            // Async content (dental chart images, oral report from localStorage) can
            // change height after first paint — re-pack when the measured stack resizes.
            let ro = null;
            if (typeof ResizeObserver !== "undefined") {
                ro = new ResizeObserver(recompute);
                ro.observe(mc);
                ro.observe(body);
            }
            window.addEventListener("resize", recompute);
            return ({
                "PaginatedRx.useLayoutEffect": ()=>{
                    ro?.disconnect();
                    window.removeEventListener("resize", recompute);
                }
            })["PaginatedRx.useLayoutEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["PaginatedRx.useLayoutEffect"], [
        sig
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            // Hidden replica sheet — gives true body capacity + per-block heights at the
            // real content width, without ever being visible (position:absolute + hidden).
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                "aria-hidden": true,
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    visibility: "hidden",
                    pointerEvents: "none",
                    zIndex: -1
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("article", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sheet,
                    children: [
                        renderHead(),
                        renderPatient(),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            ref: bodyRef,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sheetBody,
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                ref: measureRef,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentStack,
                                children: blocks.map((b)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                        children: b.node
                                    }, b.key))
                            })
                        }),
                        renderFoot()
                    ]
                })
            }),
            ...effectivePages.map((idxs, p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("article", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sheet,
                    children: [
                        renderHead(),
                        renderPatient(),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sheetBody,
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentStack,
                                children: idxs.filter((i)=>blocks[i]).map((i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                        children: blocks[i].node
                                    }, blocks[i].key))
                            })
                        }),
                        renderFoot()
                    ]
                }, `pg-${p}`))
        ]
    });
}
_s(PaginatedRx, "7nE0YKouMrrwoYC70ti0vF6B08Q=");
_c3 = PaginatedRx;
function RxPreviewDocument({ snapshot, extraNotes, settings }) {
    const view = settings?.view || "list";
    const showDentalChart = settings?.showDentalChart !== false;
    // Plain mode (used by the dental-chart print button) renders the odontogram
    // with NO recorded data — a blank template. We force an empty chart object
    // through to FlatDentitionChart and skip the oral section entirely.
    const chartOverride = settings?.chartOverride;
    const hideOral = settings?.hideOral === true;
    // When `includeHistorical` is on, the print should merge past-visit dental
    // + oral records with the current consultation. The flag is read here so
    // it propagates through the existing snapshot / chart props; the actual
    // historical-visit merge lives in `rx-preview-composer` (TODO: implement
    // once a past-visits data source is available). The print preview already
    // surfaces the toggle state via the inline "Including historical data"
    // pill rendered by EndVisitPage.
    void settings?.includeHistorical;
    /**
     * When `extraNotes` is passed, fold it into the Additional Notes body so the
     * quick-visit consultation narrative renders inside the Rx itself (instead of
     * as a sibling panel above it). Keeps the preview to a single Rx document.
     */ const mergedAdditionalNotes = (()=>{
        const fromSnapshot = String(snapshot?.additionalNotes ?? "").trim();
        const fromExtra = String(extraNotes ?? "").trim();
        if (fromSnapshot && fromExtra) return `${fromExtra}\n\n${fromSnapshot}`;
        return fromSnapshot || fromExtra || "";
    })();
    const dentalBlocks = snapshot?.dentalExamination ?? [];
    const renderLetterhead = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("header", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].letterhead,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].letterRow,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].letterLeft,
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoBox,
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                        size: 32,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buildingIcon,
                                        strokeWidth: 1.8
                                    })
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].clinicName,
                                            children: "TP Dental Care"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].docLine,
                                            children: "Dr. Umesh Aggarwal, BDS, MDS"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaLine,
                                            children: "Reg. ID: DCI-2342342 | +91 78945 61230"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaLine,
                                            children: "K9 Sardar Bungalow, Prahladnagar, Ahmedabad"
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rule
                })
            ]
        });
    const renderPatientDetails = ()=>{
        const pid = snapshot?.patientId ?? "apt-1";
        const ap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppointmentPatient"])(pid);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("section", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientSection,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientRow,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientCol,
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientLine,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientStrong,
                                                children: "Patient Name:"
                                            }),
                                            " ",
                                            ap.name
                                        ]
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientLine,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientStrong,
                                                children: "Age/Gender:"
                                            }),
                                            " ",
                                            ap.age,
                                            " Years, ",
                                            ap.genderLabel
                                        ]
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientLine,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientStrong,
                                                children: "Height/Weight:"
                                            }),
                                            " —"
                                        ]
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientLine,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientStrong,
                                                children: "Address:"
                                            }),
                                            " Prahladnagar, Ahmedabad"
                                        ]
                                    })
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientRight,
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientLine,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientStrong,
                                                children: "Patient ID:"
                                            }),
                                            " ",
                                            ap.patientCode
                                        ]
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientLine,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientStrong,
                                                children: "Mobile:"
                                            }),
                                            " ",
                                            ap.mobile.replace(/^\+91-/, "")
                                        ]
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientLine,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientStrong,
                                                children: "Blood Group:"
                                            }),
                                            " ",
                                            ap.bloodGroup
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rule
                })
            ]
        });
    };
    const renderFooter = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rule
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("footer", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footer,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footerText,
                        children: "support@tpdentalcare.com | www.tpdentalcare.com"
                    })
                })
            ]
        });
    const blocks = [];
    const pushBlock = (key, node, h)=>{
        if (node) blocks.push({
            key,
            node,
            h
        });
    };
    // Rough per-block height estimates (px at full A4 width) for pagination.
    const rowsH = (n)=>view === "inline" ? 30 : view === "table" ? n * 26 + 12 : n * 22 + 6;
    const secH = (rows)=>30 + rowsH((rows || []).length);
    if (snapshot) {
        pushBlock("symptoms", snapshot.symptoms && snapshot.symptoms.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SectionList, {
            title: "Chief Complaints",
            rows: snapshot.symptoms,
            view: view,
            icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(RxMedicalSectionIcon, {
                name: "Virus"
            })
        }) : null, secH(snapshot.symptoms));
        pushBlock("examinations", snapshot.examinations && snapshot.examinations.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SectionList, {
            title: "Examination",
            rows: snapshot.examinations,
            view: view,
            icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(RxMedicalSectionIcon, {
                name: "medical service"
            })
        }) : null, secH(snapshot.examinations));
        pushBlock("diagnoses", snapshot.diagnoses && snapshot.diagnoses.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SectionList, {
            title: "Diagnosis",
            rows: snapshot.diagnoses,
            view: view,
            icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(RxMedicalSectionIcon, {
                name: "Diagnosis"
            })
        }) : null, secH(snapshot.diagnoses));
        pushBlock("investigations", snapshot.labInvestigations && snapshot.labInvestigations.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SectionList, {
            title: "Investigations",
            rows: snapshot.labInvestigations,
            view: view,
            icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(RxMedicalSectionIcon, {
                name: "Test Tube"
            })
        }) : null, secH(snapshot.labInvestigations));
        pushBlock("medications", snapshot.medications && snapshot.medications.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SectionList, {
            title: "Medication (Rx)",
            rows: snapshot.medications,
            view: view,
            icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(RxMedicalSectionIcon, {
                name: "Tablets"
            })
        }) : null, secH(snapshot.medications));
        pushBlock("advice", snapshot.advice && snapshot.advice.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SectionList, {
            title: "Advice",
            rows: snapshot.advice,
            view: view,
            icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(RxMedicalSectionIcon, {
                name: "health care"
            })
        }) : null, secH(snapshot.advice));
        if (dentalBlocks.length) {
            // Emit the "Dental Examination" section header bundled with the first
            // tooth/bucket, then one block per remaining unit so they paginate
            // across A4 sheets. Each view renders a tooth differently (list
            // bullets / inline / nested table). Per-tooth (date) annotations
            // were removed — the print no longer shows any "(09 Jun 2026)"
            // suffix on tooth labels or section headings.
            const groupBy = settings?.groupBy === "tooth" ? "tooth" : "type";
            if (groupBy === "type") {
                // "By Type" — pivot dentalBlocks so the heading is the category
                // (Past Procedures / Findings / Procedures / Overall Teeth Notes)
                // with the teeth that have that kind listed underneath. One block
                // per non-empty category so each can paginate independently.
                const buckets = buildByTypeBuckets(dentalBlocks);
                const bucketNode = (bk)=>view === "table" ? byTypeTableNode(bk) : view === "inline" ? byTypeInlineNode(bk) : byTypeListNode(bk);
                buckets.forEach((bk, i)=>{
                    const inner = bucketNode(bk);
                    const node = i === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("section", {
                        style: {
                            marginTop: 12,
                            breakInside: "avoid",
                            WebkitPrintColorAdjust: "exact",
                            printColorAdjust: "exact"
                        },
                        children: [
                            dentalHeaderNode(snapshot),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                style: {
                                    marginTop: 4
                                },
                                children: inner
                            })
                        ]
                    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("section", {
                        style: {
                            breakInside: "avoid",
                            WebkitPrintColorAdjust: "exact",
                            printColorAdjust: "exact"
                        },
                        children: inner
                    });
                    pushBlock(`dental-type-${bk.key}`, node, 0);
                });
            } else {
                const toothNode = (b)=>view === "table" ? dentalToothTableNode(b) : view === "inline" ? dentalToothInlineNode(b) : dentalToothListNode(b);
                dentalBlocks.forEach((b, i)=>{
                    const tooth = toothNode(b);
                    const node = i === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("section", {
                        style: {
                            marginTop: 12,
                            breakInside: "avoid",
                            WebkitPrintColorAdjust: "exact",
                            printColorAdjust: "exact"
                        },
                        children: [
                            dentalHeaderNode(snapshot),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                style: {
                                    marginTop: 4
                                },
                                children: tooth
                            })
                        ]
                    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("section", {
                        style: {
                            breakInside: "avoid",
                            WebkitPrintColorAdjust: "exact",
                            printColorAdjust: "exact"
                        },
                        children: tooth
                    });
                    pushBlock(`dental-${i}`, node, 0);
                });
            }
        }
        pushBlock("followUp", snapshot.followUp ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].miniSection,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("h3", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dentalTitle,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__["Calendar2"], {
                            size: 14,
                            color: "var(--tp-slate-500)",
                            variant: "Bulk"
                        }),
                        "Follow Up"
                    ]
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].miniBody,
                    children: snapshot.followUp
                })
            ]
        }) : null, 56);
        pushBlock("additionalNotes", mergedAdditionalNotes ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].miniSection,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("h3", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dentalTitle,
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Notepad2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notepad2$3e$__["Notepad2"], {
                            size: 14,
                            color: "var(--tp-slate-500)",
                            variant: "Bulk"
                        }),
                        "Additional Notes"
                    ]
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].miniBody,
                    children: mergedAdditionalNotes
                })
            ]
        }) : null, 72);
        pushBlock("oral", hideOral ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$FlatDentitionChart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OralExamReport"], {
            patientId: snapshot.patientId,
            view: view,
            chart: chartOverride
        }), view === "list" ? 200 : 120);
        pushBlock("chart", showDentalChart ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$FlatDentitionChart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlatDentitionChart"], {
            patientId: snapshot.patientId,
            chart: chartOverride,
            alwaysRender: true,
            patientType: settings?.patientType || "adult"
        }) : null, 380);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        style: {
            position: "relative"
        },
        children: !snapshot ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("article", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sheet,
            children: [
                renderLetterhead(),
                renderPatientDetails(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sheetBody,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyPad,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyText,
                            children: "No Rx data available yet. Add details in Clinical or Dental Examination to preview here."
                        })
                    })
                }),
                renderFooter()
            ]
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(PaginatedRx, {
            blocks: blocks,
            renderHead: renderLetterhead,
            renderPatient: renderPatientDetails,
            renderFoot: renderFooter
        })
    });
}
_c4 = RxPreviewDocument;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "SectionRows");
__turbopack_context__.k.register(_c1, "SectionList");
__turbopack_context__.k.register(_c2, "RxMedicalSectionIcon");
__turbopack_context__.k.register(_c3, "PaginatedRx");
__turbopack_context__.k.register(_c4, "RxPreviewDocument");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/rx-preview-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadDentalPreviewSnapshot",
    ()=>loadDentalPreviewSnapshot,
    "loadRxPreviewSnapshot",
    ()=>loadRxPreviewSnapshot,
    "saveDentalPreviewSnapshot",
    ()=>saveDentalPreviewSnapshot,
    "saveRxPreviewSnapshot",
    ()=>saveRxPreviewSnapshot
]);
const STORAGE_PREFIX = "tp-rx-preview:";
const DENTAL_STORAGE_PREFIX = "tp-rx-preview-dental:";
function getStorageKey(patientId) {
    return `${STORAGE_PREFIX}${patientId || "apt-1"}`;
}
function getDentalStorageKey(patientId) {
    return `${DENTAL_STORAGE_PREFIX}${patientId || "apt-1"}`;
}
function saveRxPreviewSnapshot(patientId, snapshot) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(getStorageKey(patientId), JSON.stringify(snapshot));
}
function loadRxPreviewSnapshot(patientId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = window.localStorage.getItem(getStorageKey(patientId));
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
function saveDentalPreviewSnapshot(patientId, snapshot) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(getDentalStorageKey(patientId), JSON.stringify(snapshot));
}
function loadDentalPreviewSnapshot(patientId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = window.localStorage.getItem(getDentalStorageKey(patientId));
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/rx-preview-composer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatComposedRxSnapshotSummary",
    ()=>formatComposedRxSnapshotSummary,
    "getComposedRxPreviewSnapshot",
    ()=>getComposedRxPreviewSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rx-preview-store.ts [app-client] (ecmascript)");
"use client";
;
function pushSectionLines(lines, title, rows) {
    if (!rows.length) return;
    const body = rows.map((row)=>{
        const suffix = row.metaParts.length ? ` (${row.metaParts.join(" | ")})` : "";
        return `${row.title}${suffix}`;
    }).join("; ");
    lines.push(`${title}: ${body}`);
}
function formatComposedRxSnapshotSummary(snapshot) {
    if (!snapshot) {
        return "No consultation details were captured on this visit.";
    }
    const lines = [];
    pushSectionLines(lines, "Symptoms", snapshot.symptoms);
    pushSectionLines(lines, "Examination", snapshot.examinations);
    pushSectionLines(lines, "Diagnosis", snapshot.diagnoses);
    pushSectionLines(lines, "Lab investigation", snapshot.labInvestigations);
    pushSectionLines(lines, "Medication", snapshot.medications);
    pushSectionLines(lines, "Advice", snapshot.advice);
    if (snapshot.followUp?.trim()) {
        lines.push(`Follow-up: ${snapshot.followUp.trim()}`);
    }
    if (snapshot.additionalNotes?.trim()) {
        lines.push(`Notes: ${snapshot.additionalNotes.trim()}`);
    }
    if (snapshot.dentalExamination.length) {
        for (const block of snapshot.dentalExamination){
            const bits = [
                `Tooth ${block.toothLabel}`
            ];
            for (const item of block.treatmentHistory){
                const suffix = item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : "";
                bits.push(`Tx history: ${item.title}${suffix}`);
            }
            for (const item of block.findings){
                const suffix = item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : "";
                bits.push(`Finding: ${item.title}${suffix}`);
            }
            for (const item of block.procedures){
                const suffix = item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : "";
                bits.push(`Procedure: ${item.title}${suffix}`);
            }
            if (block.overallToothNote?.trim()) {
                bits.push(`Tooth note: ${block.overallToothNote.trim()}`);
            }
            lines.push(bits.join(" · "));
        }
    }
    const out = lines.filter(Boolean).join("\n").trim();
    return out || "Visit completed — no structured Rx sections were filled.";
}
function getComposedRxPreviewSnapshot(patientId) {
    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadRxPreviewSnapshot"])(patientId);
    const dental = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadDentalPreviewSnapshot"])(patientId);
    if (!base && !dental) {
        return null;
    }
    const fallback = {
        patientId,
        updatedAt: new Date().toISOString(),
        symptoms: [],
        examinations: [],
        diagnoses: [],
        labInvestigations: [],
        medications: [],
        advice: []
    };
    const snapshot = base ?? fallback;
    return {
        ...snapshot,
        vitals: [],
        labResults: [],
        dentalUpdatedAt: dental?.updatedAt,
        dentalExamination: dental?.sections ?? []
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/DrAgentLayoutShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DR_AGENT_MAIN_RESERVE_CLASS",
    ()=>DR_AGENT_MAIN_RESERVE_CLASS,
    "DrAgentLayoutShell",
    ()=>DrAgentLayoutShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
// NOTE: `DrAgentFab` is intentionally NOT imported here. The VoiceRx launcher
// is only rendered inside `TPRxPadShell` (mounted by `/rxpad`). All other
// routes (appointments, patient-detail, treatment-plan, end-visit, …) keep
// the *panel* mountable via context but never expose the floating tab.
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$DrAgentPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rxpad-chrome-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const DR_AGENT_MAIN_RESERVE_CLASS = "dr-agent-main-reserve";
/** Dr. Agent panel + FAB for routes that are not wrapped by `TPRxPadShell` (e.g. appointments). */ function LegacyDrAgentChrome() {
    _s();
    const { drAgentOpen: open, setDrAgentOpen: setOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadChrome"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])() ?? "";
    const urlPatientId = searchParams.get("patientId")?.trim() || "apt-1";
    const dentalChartPatientId = urlPatientId;
    // Patient detail page has no 62px app header — panel should fill full height.
    const isPatientDetail = pathname.startsWith("/patient-detail");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-auto fixed z-[35] flex min-h-0 flex-col border-tp-slate-200 bg-white shadow-[0_0_24px_-8px_rgba(23,23,37,0.18)]", /* Mobile: bottom sheet */ "inset-x-0 bottom-0 max-h-[min(52vh,560px)] w-full border-t", /* md+: dock right — page stays full width; panel only covers main band */ "md:inset-x-auto md:bottom-0 md:left-auto md:right-0 md:max-h-none md:w-[300px] lg:w-[clamp(350px,30vw,400px)] md:border-l md:border-t-0", isPatientDetail ? "md:top-0" : "md:top-[62px]"),
            "aria-label": "Dr. Agent",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$DrAgentPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DrAgentPanel"], {
                onClose: ()=>setOpen(false),
                mode: "rxpad",
                initialPatientId: urlPatientId,
                dentalChartPatientId: dentalChartPatientId
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
                lineNumber: 44,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
            lineNumber: 33,
            columnNumber: 9
        }, this) : null
    }, void 0, false);
}
_s(LegacyDrAgentChrome, "sPBqh7jqJXmuTRxsk21WiIK3tNc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadChrome"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = LegacyDrAgentChrome;
/**
 * Push-layout Dr. Agent chrome — for routes where the panel should push content
 * side-by-side (like RxPad), not overlay as a fixed panel.
 */ function PushDrAgentChrome() {
    _s1();
    const { drAgentOpen: open, setDrAgentOpen: setOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadChrome"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const urlPatientId = searchParams.get("patientId")?.trim() || "apt-1";
    const dentalChartPatientId = urlPatientId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "flex min-h-0 w-[300px] lg:w-[clamp(350px,30vw,400px)] shrink-0 flex-col border-l border-tp-slate-200 bg-white",
            "aria-label": "Dr. Agent",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$DrAgentPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DrAgentPanel"], {
                onClose: ()=>setOpen(false),
                mode: "rxpad",
                initialPatientId: urlPatientId,
                dentalChartPatientId: dentalChartPatientId
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
                lineNumber: 74,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
            lineNumber: 70,
            columnNumber: 9
        }, this) : null
    }, void 0, false);
}
_s1(PushDrAgentChrome, "DRQRSmTGHk7I2QVPzOZsJFEPHc0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadChrome"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c1 = PushDrAgentChrome;
function DrAgentLayoutShellInner({ children }) {
    _s2();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])() ?? "";
    const isRxPadShellRoute = pathname.startsWith("/rxpad");
    const { drAgentOpen: open } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadChrome"])();
    // Treatment-plan page: Dr. Agent pushes content (side-by-side) instead of overlaying.
    const isTreatmentPlan = pathname.startsWith("/treatment-plan");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DrAgentLayoutShellInner.useEffect": ()=>{
            if (isRxPadShellRoute || isTreatmentPlan) {
                document.documentElement.removeAttribute("data-dr-agent-open");
                return;
            }
            if (open) {
                document.documentElement.setAttribute("data-dr-agent-open", "true");
            } else {
                document.documentElement.removeAttribute("data-dr-agent-open");
            }
            return ({
                "DrAgentLayoutShellInner.useEffect": ()=>{
                    document.documentElement.removeAttribute("data-dr-agent-open");
                }
            })["DrAgentLayoutShellInner.useEffect"];
        }
    }["DrAgentLayoutShellInner.useEffect"], [
        isRxPadShellRoute,
        isTreatmentPlan,
        open
    ]);
    if (isRxPadShellRoute) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    // Treatment-plan: flex row — panel pushes content instead of overlaying.
    if (isTreatmentPlan) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex h-[100dvh] min-h-0 w-full overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex-1 min-h-0 min-w-0 overflow-x-hidden overflow-y-auto",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PushDrAgentChrome, {}, void 0, false, {
                        fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
            lineNumber: 117,
            columnNumber: 7
        }, this);
    }
    // Default: fixed overlay for other routes (appointments, patient-detail, etc.)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-[100dvh] min-h-0 w-full overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-full min-h-0 w-full overflow-x-hidden overflow-y-auto",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LegacyDrAgentChrome, {}, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_s2(DrAgentLayoutShellInner, "90WUSLpsL82OepLup9EA8jh+xLg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadChrome"]
    ];
});
_c2 = DrAgentLayoutShellInner;
function DrAgentLayoutShell({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-[100dvh] w-full",
            children: children
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
            lineNumber: 141,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DrAgentLayoutShellInner, {
            children: children
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
            lineNumber: 142,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/DrAgentLayoutShell.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_c3 = DrAgentLayoutShell;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "LegacyDrAgentChrome");
__turbopack_context__.k.register(_c1, "PushDrAgentChrome");
__turbopack_context__.k.register(_c2, "DrAgentLayoutShellInner");
__turbopack_context__.k.register(_c3, "DrAgentLayoutShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_tp-rxpad_02b17d0e._.js.map