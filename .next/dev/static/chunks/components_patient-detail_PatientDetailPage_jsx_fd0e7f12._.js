(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/patient-detail/PatientDetailPage.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PatientDetailPage",
    ()=>PatientDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/plan-procedures-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Add$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Add$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Add.js [app-client] (ecmascript) <export default as Add>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowDown2.js [app-client] (ecmascript) <export default as ArrowDown2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowLeft2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowLeft2.js [app-client] (ecmascript) <export default as ArrowLeft2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowRight2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowRight2.js [app-client] (ecmascript) <export default as ArrowRight2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Buildings2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Buildings2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Buildings2.js [app-client] (ecmascript) <export default as Buildings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Calendar2.js [app-client] (ecmascript) <export default as Calendar2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$CallCalling$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CallCalling$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/CallCalling.js [app-client] (ecmascript) <export default as CallCalling>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Card.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentText.js [app-client] (ecmascript) <export default as DocumentText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentUpload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentUpload$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/DocumentUpload.js [app-client] (ecmascript) <export default as DocumentUpload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Edit2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Edit2.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Hospital$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hospital$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Hospital.js [app-client] (ecmascript) <export default as Hospital>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MedalStar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MedalStar$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/MedalStar.js [app-client] (ecmascript) <export default as MedalStar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Note1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Note1$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Note1.js [app-client] (ecmascript) <export default as Note1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ReceiptText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReceiptText$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ReceiptText.js [app-client] (ecmascript) <export default as ReceiptText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Refresh2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Refresh2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Refresh2.js [app-client] (ecmascript) <export default as Refresh2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$User$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/User.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tooltip/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown-menu.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tooltip.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$clinical$2d$table$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-clinical-table.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/button-system/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/button-system/TPButton.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPSplitButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/button-system/TPSplitButton.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appointments$2f$AppointmentBanner$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appointments/AppointmentBanner.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$svg$2d$gb0jbe9ifm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/imports/svg-gb0jbe9ifm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/imports/RxpadHeader.module.scss [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$TreatmentPlanPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/TreatmentPlanPage.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appointment-patients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$DrAgentLayoutShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/DrAgentLayoutShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
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
function usePlanProcedures() {
    _s();
    const [procs, setProcs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePlanProcedures.useEffect": ()=>{
            const pid = ({
                "usePlanProcedures.useEffect.pid": ()=>{
                    try {
                        return new URLSearchParams(window.location.search).get("patientId") || "apt-1";
                    } catch  {
                        return "apt-1";
                    }
                }
            })["usePlanProcedures.useEffect.pid"]();
            const load = {
                "usePlanProcedures.useEffect.load": ()=>setProcs((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPlanProcedures"])(pid))
            }["usePlanProcedures.useEffect.load"];
            load();
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAN_PROCEDURES_UPDATED_EVENT"], load);
            window.addEventListener("storage", load);
            return ({
                "usePlanProcedures.useEffect": ()=>{
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAN_PROCEDURES_UPDATED_EVENT"], load);
                    window.removeEventListener("storage", load);
                }
            })["usePlanProcedures.useEffect"];
        }
    }["usePlanProcedures.useEffect"], []);
    return procs;
}
_s(usePlanProcedures, "JR83rSt2ZDu+GOPLQMYc4qVjNLs=");
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
const HISTORY_VIOLET = "var(--tp-violet-500)";
/** Same field rows as Rx pad patient dropdown. */ function buildPatientHeaderProfileFields(patientId) {
    const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppointmentPatient"])(patientId);
    return [
        {
            key: "patient-id",
            label: "Patient ID",
            value: p.patientCode,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                color: "var(--tp-violet-500)",
                size: 18,
                strokeWidth: 1.5,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 70,
                columnNumber: 13
            }, this)
        },
        {
            key: "mobile",
            label: "Mobile Number",
            value: p.mobile.replace(/^\+91-/, ""),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$CallCalling$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CallCalling$3e$__["CallCalling"], {
                color: "var(--tp-violet-500)",
                size: 18,
                strokeWidth: 1.5,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 76,
                columnNumber: 13
            }, this)
        },
        {
            key: "dob",
            label: "DOB",
            value: p.dob,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__["Calendar2"], {
                color: "var(--tp-violet-500)",
                size: 18,
                strokeWidth: 1.5,
                variant: "Linear"
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 82,
                columnNumber: 13
            }, this)
        }
    ];
}
const VITALS_ROWS = [
    {
        name: "SPO2(%)",
        v1: "95",
        v2: "94"
    },
    {
        name: "Height (cms)",
        v1: "98.6",
        v2: "95"
    },
    {
        name: "Temperature (Frh)",
        v1: "95",
        v2: "94"
    },
    {
        name: "Pulse(/min)",
        v1: "66",
        v2: "65"
    },
    {
        name: "BP(mm Hg)",
        v1: "120/80",
        v2: "120/80"
    }
];
const LAB_ROWS = [
    {
        name: "Hemoglobin(g/dl)",
        v1: "14.2",
        v2: "13.8"
    },
    {
        name: "WBC",
        v1: "7800",
        v2: "7200"
    },
    {
        name: "Platelets",
        v1: "2.45",
        v2: "2.38"
    }
];
/** Matches `TPClinicalTable` (TO clinical table) styling for history cards. */ const VITALS_LAB_TABLE_COLUMNS = [
    {
        id: "name",
        header: "Name",
        accessor: (r)=>r.name
    },
    {
        id: "v1",
        header: "10 Oct, 22",
        accessor: (r)=>r.v1
    },
    {
        id: "v2",
        header: "5 Oct, 22",
        accessor: (r)=>r.v2
    }
];
const MEDICAL_HISTORY_ROWS = [
    {
        id: "medical-problems",
        topic: "Medical problems",
        details: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-medium text-[#454551]",
                    children: "Hypothyroidism"
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: " — Since "
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-medium text-[#454551]",
                    children: "3–6 months"
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: ", medication "
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-medium text-[#454551]",
                    children: "no"
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    },
    {
        id: "lifestyle",
        topic: "Lifestyle",
        details: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-medium text-[#454551]",
                    children: "Smoking"
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: " — yes, since "
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-medium text-[#454551]",
                    children: "2 years"
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: ", quantity "
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-medium text-[#454551]",
                    children: "2 units/day"
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }
];
const MEDICAL_HISTORY_COLUMNS = [
    {
        id: "topic",
        header: "Topic",
        minWidth: "38%",
        accessor: (r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[#a2a2a8]",
                children: r.topic
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 142,
                columnNumber: 22
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: "details",
        header: "Details",
        accessor: (r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "leading-relaxed",
                children: r.details
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 147,
                columnNumber: 22
            }, ("TURBOPACK compile-time value", void 0))
    }
];
/* ---- Dental History — real-time loader from chart-store --------------- */ // Build the human-friendly tooth label that the right panel uses
// ("Upper Right First Molar (T16)"). Falls back to "Tooth (T<fdi>)" when
// the FDI doesn't map cleanly so the card never blanks out on bad data.
const TOOTH_NAME_BY_FDI = {
    11: "Upper Right Central Incisor",
    12: "Upper Right Lateral Incisor",
    13: "Upper Right Canine",
    14: "Upper Right First Premolar",
    15: "Upper Right Second Premolar",
    16: "Upper Right First Molar",
    17: "Upper Right Second Molar",
    18: "Upper Right Third Molar",
    21: "Upper Left Central Incisor",
    22: "Upper Left Lateral Incisor",
    23: "Upper Left Canine",
    24: "Upper Left First Premolar",
    25: "Upper Left Second Premolar",
    26: "Upper Left First Molar",
    27: "Upper Left Second Molar",
    28: "Upper Left Third Molar",
    31: "Lower Left Central Incisor",
    32: "Lower Left Lateral Incisor",
    33: "Lower Left Canine",
    34: "Lower Left First Premolar",
    35: "Lower Left Second Premolar",
    36: "Lower Left First Molar",
    37: "Lower Left Second Molar",
    38: "Lower Left Third Molar",
    41: "Lower Right Central Incisor",
    42: "Lower Right Lateral Incisor",
    43: "Lower Right Canine",
    44: "Lower Right First Premolar",
    45: "Lower Right Second Premolar",
    46: "Lower Right First Molar",
    47: "Lower Right Second Molar",
    48: "Lower Right Third Molar"
};
function toothLabelFor(fdi) {
    return TOOTH_NAME_BY_FDI[fdi] ? `${TOOTH_NAME_BY_FDI[fdi]} (T${fdi})` : `Tooth (T${fdi})`;
}
// Reads `dental.exam.chart.<patientId>` and returns the inline lines for the
// Dental History card, or `null` when the patient has no chart data at all.
// Falls back to the in-memory seed (`INITIAL_TOOTH_STATE[patientId]`) when
// localStorage is empty — that way the demo seed personas (Anjali Patel)
// render the card even on a fresh browser session, while truly empty
// personas (Shyam GR, Ria Kapoor) still render nothing.
// Shapes:
//   oral: [{ label, items: [{ name, meta }] }]
//   tooth: [{ toothLabel, segs: [{ label, text }] }]
// The per-row "(date)" annotation was removed from the rendered card, so
// `addedOn` no longer appears in either shape (the date is no longer
// displayed anywhere in the print or the Dental History card).
function loadDentalHistory(patientId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let chart = null;
    try {
        const raw = window.localStorage.getItem(`dental.exam.chart.${patientId || "apt-1"}`);
        if (raw) chart = JSON.parse(raw);
    } catch  {}
    // Fall back to the in-memory seed when localStorage is empty for this patient.
    if (!chart || (Array.isArray(chart.oralEntries) ? chart.oralEntries.length : 0) === 0 && Object.keys(chart?.toothDiagnoses || {}).length === 0 && Object.keys(chart?.findingsByTooth || {}).length === 0 && Object.keys(chart?.treatmentHistoryByTooth || {}).length === 0 && !(chart?.oralNotes || "").trim()) {
        const seed = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_TOOTH_STATE"] && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_TOOTH_STATE"][patientId] || null;
        if (seed) chart = {
            ...chart || {},
            ...seed
        };
    }
    if (!chart) return null;
    // ---- Oral lines, grouped by kind ----
    const byKind = {
        past: [],
        finding: [],
        procedure: []
    };
    (chart.oralEntries || []).forEach((e)=>{
        if (!e || !e.name) return;
        const region = (e.surfaces || []).join(", ");
        const metaBits = [];
        if (region) metaBits.push(region);
        if (e.since) metaBits.push(`since ${e.since}`);
        if (e.note) metaBits.push(e.note);
        const meta = metaBits.join(", ");
        (byKind[e.kind] || byKind.finding).push({
            name: e.name,
            meta
        });
    });
    const oral = [];
    if (byKind.past.length) oral.push({
        label: "Past Procedures",
        items: byKind.past
    });
    if (byKind.finding.length) oral.push({
        label: "Findings",
        items: byKind.finding
    });
    if (byKind.procedure.length) oral.push({
        label: "Procedures",
        items: byKind.procedure
    });
    // Overall oral notes line
    if (typeof chart.oralNotes === "string" && chart.oralNotes.trim()) {
        oral.push({
            label: "Notes",
            items: [
                {
                    name: chart.oralNotes.trim(),
                    meta: ""
                }
            ]
        });
    }
    // ---- Per-tooth lines ----
    const toothMap = {};
    const ensureTooth = (fdi)=>{
        if (!toothMap[fdi]) toothMap[fdi] = {
            toothLabel: toothLabelFor(fdi),
            segs: []
        };
        return toothMap[fdi];
    };
    // Diagnoses (past procedures done on the tooth)
    Object.entries(chart.toothDiagnoses || {}).forEach(([fdi, list])=>{
        if (!Array.isArray(list) || list.length === 0) return;
        ensureTooth(fdi).segs.push({
            label: "Past Procedures",
            text: list.join(", ")
        });
    });
    // Findings (current observations)
    Object.entries(chart.findingsByTooth || {}).forEach(([fdi, list])=>{
        if (!Array.isArray(list) || list.length === 0) return;
        const names = list.map((f)=>{
            const surf = f.zoneId ? ` (${f.zoneId})` : "";
            return `${f.type || f.name || "Finding"}${surf}`;
        });
        ensureTooth(fdi).segs.push({
            label: "Findings",
            text: names.join(", ")
        });
    });
    // Treatment history detail
    Object.entries(chart.treatmentHistoryByTooth || {}).forEach(([fdi, map])=>{
        if (!map || typeof map !== "object") return;
        const names = Object.keys(map);
        if (!names.length) return;
        const tooth = ensureTooth(fdi);
        if (!tooth.segs.some((s)=>s.label === "Past Procedures")) {
            tooth.segs.push({
                label: "Past Procedures",
                text: names.join(", ")
            });
        }
    });
    const tooth = Object.values(toothMap).filter((t)=>t.segs.length > 0);
    if (oral.length === 0 && tooth.length === 0) return null;
    return {
        oral,
        tooth
    };
}
const MEDICATIONS = [
    "Hydroxychloroquine 400 Tablet (400mg, once a week)",
    "Vitamin C 1000 Tablet (1000mg, once a day)",
    "Zinc 50 tablet (50mg, once a day)",
    "Crocin 650mg tablet (650mg, SOS, in case of fever)",
    "cetirizine 10mg tablet (10mg, Once a day, In case of throat pain & cough)",
    "alex syrup (2/3 teaspoon, 3 times a day, SOS incase of cough)"
];
const LAB_TESTS = [
    "Complete Blood Count(CBC) Test",
    "ESR Test",
    "Urea",
    "Creat"
];
const VISIT_PAGES = 8;
/** Mock Rx metadata — used in header + tooltips. */ const RX_VISIT_DATE = "10 Oct 2023";
const RX_VISIT_TIME = "5:13 pm";
const RX_VISIT_DATETIME = `${RX_VISIT_DATE}, ${RX_VISIT_TIME}`;
function CardShell({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-[16px] bg-white shadow-[0_1px_3px_rgba(23,23,37,0.06)]", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
        lineNumber: 291,
        columnNumber: 5
    }, this);
}
_c = CardShell;
function HistorySectionCard({ title, iconName, onOpenSidebar, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
        className: "overflow-hidden border border-tp-slate-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full items-center gap-3 border-b border-tp-slate-200 px-3 py-[10px] sm:px-[14px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                            name: iconName,
                            variant: "bulk",
                            size: 20,
                            color: HISTORY_VIOLET
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 307,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "min-w-0 flex-1 font-sans text-[13px] font-medium leading-snug text-tp-slate-600",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "inline-flex h-8 w-8 shrink-0 items-center justify-center self-center rounded-[10px] border border-tp-slate-200 bg-white text-tp-slate-500 transition-colors hover:border-tp-slate-300 hover:bg-tp-slate-50/90 hover:text-tp-slate-700",
                        "aria-label": `Open ${title} in sidebar`,
                        onClick: ()=>onOpenSidebar?.(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowRight2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight2$3e$__["ArrowRight2"], {
                            size: 18,
                            variant: "Linear",
                            color: "currentColor",
                            strokeWidth: 1.75
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 312,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 305,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-0",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 321,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
        lineNumber: 304,
        columnNumber: 5
    }, this);
}
_c1 = HistorySectionCard;
// Inline format renders each row as one paragraph — Rx Preview "inline view"
// shape. Oral lines: "Past Procedures: Name (meta), Name". Tooth lines:
// "Upper Right First Molar (T16): Findings: Name (meta); Past Procedures: …".
function DentalHistoryInline({ oral, tooth }) {
    const sectionTag = (label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-2 mt-1 px-3 py-[6px] rounded-[6px] bg-[#f1f1f5] text-[11px] font-semibold uppercase tracking-[0.05em] text-[#454551]",
            children: label
        }, void 0, false, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 331,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: [
            oral.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    sectionTag("Oral Record"),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1 pl-3",
                        children: oral.map((line)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 text-[12.5px] leading-[1.45] text-[#334155]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-[#0f172a]",
                                        children: [
                                            line.label,
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 343,
                                        columnNumber: 17
                                    }, this),
                                    " ",
                                    line.items.map((it, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                i > 0 ? ", " : "",
                                                it.name,
                                                it.meta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#64748b]",
                                                    children: [
                                                        " (",
                                                        it.meta,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 350,
                                                    columnNumber: 32
                                                }, this) : null
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 347,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, line.label, true, {
                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                lineNumber: 342,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 338,
                columnNumber: 9
            }, this),
            tooth.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    sectionTag("Tooth Record"),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1 pl-3",
                        children: tooth.map((row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 text-[12.5px] leading-[1.45] text-[#334155]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-[#0f172a]",
                                        children: [
                                            row.toothLabel,
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 364,
                                        columnNumber: 17
                                    }, this),
                                    " ",
                                    row.segs.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                i > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#94a3b8]",
                                                    children: "; "
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 370,
                                                    columnNumber: 30
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-[#1e293b]",
                                                    children: [
                                                        s.label,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 371,
                                                    columnNumber: 21
                                                }, this),
                                                " ",
                                                s.text
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 369,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, idx, true, {
                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                lineNumber: 363,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 361,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 359,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
        lineNumber: 336,
        columnNumber: 5
    }, this);
}
_c2 = DentalHistoryInline;
// Card with collapsible body + single "View more →" CTA at the bottom.
// Reads the live chart store via `loadDentalHistory(patientId)`; returns null
// when the patient has no dental records yet (Shyam GR, Ria Kapoor) so the
// card simply doesn't render — keeping the History column honest about what
// the patient actually has on file.
function DentalHistoryCard({ patientId }) {
    _s1();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Re-evaluate on every render (cheap localStorage read) so the card mirrors
    // any chart edits the doctor makes elsewhere in the session.
    const data = loadDentalHistory(patientId);
    const onJumpToDental = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalHistoryCard.useCallback[onJumpToDental]": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                window.location.href = `/rxpad?patientId=${patientId || "apt-1"}&dentalTab=dental`;
            }
        }
    }["DentalHistoryCard.useCallback[onJumpToDental]"], [
        patientId
    ]);
    if (!data) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
        className: "overflow-hidden border border-tp-slate-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full items-center gap-3 border-b border-tp-slate-200 px-3 py-[10px] sm:px-[14px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                            name: "tooth",
                            variant: "bulk",
                            size: 20,
                            color: HISTORY_VIOLET
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 402,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "min-w-0 flex-1 font-sans text-[13px] font-medium leading-snug text-tp-slate-600",
                        children: "Dental History"
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "inline-flex h-8 w-8 shrink-0 items-center justify-center self-center rounded-[10px] border border-tp-slate-200 bg-white text-tp-slate-500 transition-colors hover:border-tp-slate-300 hover:bg-tp-slate-50/90 hover:text-tp-slate-700",
                        "aria-label": "Open Dental Examination",
                        title: "Open Dental Examination",
                        onClick: onJumpToDental,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowRight2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight2$3e$__["ArrowRight2"], {
                            size: 18,
                            variant: "Linear",
                            color: "currentColor",
                            strokeWidth: 1.75
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 415,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 408,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 401,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 sm:px-[14px] py-3",
                style: {
                    maxHeight: expanded ? "none" : 180,
                    overflow: "hidden",
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DentalHistoryInline, {
                        oral: data.oral,
                        tooth: data.tooth
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this),
                    !expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        style: {
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: 70,
                            background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 55%, #fff 100%)",
                            pointerEvents: "none",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            paddingBottom: 8
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--tp-blue-500)] hover:underline focus:outline-none",
                            onClick: ()=>setExpanded(true),
                            "aria-expanded": false,
                            style: {
                                pointerEvents: "auto"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "View more"
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 454,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "12",
                                    height: "12",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M6 9l6 6 6-6",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 456,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 455,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 447,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 430,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 424,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 sm:px-[14px] pb-3 pt-1 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--tp-blue-500)] hover:underline focus:outline-none",
                    onClick: ()=>setExpanded(false),
                    "aria-expanded": true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Show less"
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 470,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "12",
                            height: "12",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            "aria-hidden": "true",
                            style: {
                                transform: "rotate(180deg)",
                                transition: "transform 0.18s ease"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M6 9l6 6 6-6",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                            }, void 0, false, {
                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                lineNumber: 472,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 471,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 464,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 463,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
        lineNumber: 400,
        columnNumber: 5
    }, this);
}
_s1(DentalHistoryCard, "M5rKFXFKFVjC5MO9fRnDHvmuHz8=");
_c3 = DentalHistoryCard;
function HistorySectionCards({ patientId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HistorySectionCard, {
                title: "Vitals & Body Composition",
                iconName: "Heart Rate",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$clinical$2d$table$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPClinicalTable"], {
                    columns: VITALS_LAB_TABLE_COLUMNS,
                    data: VITALS_ROWS,
                    rowKey: (row)=>row.name
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 485,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 484,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HistorySectionCard, {
                title: "Medical History",
                iconName: "clipboard-activity",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$clinical$2d$table$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPClinicalTable"], {
                    columns: MEDICAL_HISTORY_COLUMNS,
                    data: MEDICAL_HISTORY_ROWS,
                    rowKey: (row)=>row.id
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 492,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 491,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HistorySectionCard, {
                title: "Lab Results",
                iconName: "Lab",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$clinical$2d$table$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPClinicalTable"], {
                    columns: VITALS_LAB_TABLE_COLUMNS,
                    data: LAB_ROWS,
                    rowKey: (row)=>row.name
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 499,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 498,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DentalHistoryCard, {
                patientId: patientId
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 501,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c4 = HistorySectionCards;
function DigitalRxPanel({ visitIndex, setVisitIndex, rxTab, setRxTab }) {
    _s2();
    const isDigital = rxTab === "digital";
    const docKind = isDigital ? "digital Rx" : "transcript";
    const planProcedures = usePlanProcedures();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
        className: "flex min-h-0 flex-1 flex-col overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0 bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[48px] items-center px-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid h-full w-full grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-w-0 flex-wrap items-center gap-2 sm:justify-self-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-sans text-[14px] font-semibold leading-tight text-tp-slate-900",
                                            children: "Dr Umesh"
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 518,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex shrink-0 items-center rounded-[6px] bg-tp-slate-100 px-2 py-[2px] font-sans text-[12px] font-medium leading-tight text-tp-slate-600",
                                            children: "Cardiology"
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 519,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 517,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center gap-[2px] sm:justify-self-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-label": "Previous visit",
                                            className: "inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-tp-slate-500 transition-colors hover:bg-tp-slate-50 hover:text-tp-slate-700 disabled:pointer-events-none disabled:opacity-30",
                                            disabled: visitIndex <= 0,
                                            onClick: ()=>setVisitIndex((i)=>Math.max(0, i - 1)),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowLeft2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft2$3e$__["ArrowLeft2"], {
                                                size: 16,
                                                variant: "Linear",
                                                color: "currentColor"
                                            }, void 0, false, {
                                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                lineNumber: 532,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 525,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "min-w-[44px] text-center font-sans text-[12px] font-semibold tabular-nums text-tp-slate-700",
                                            children: [
                                                visitIndex + 1,
                                                " / ",
                                                VISIT_PAGES
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 534,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-label": "Next visit",
                                            className: "inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-tp-slate-500 transition-colors hover:bg-tp-slate-50 hover:text-tp-slate-700 disabled:pointer-events-none disabled:opacity-30",
                                            disabled: visitIndex >= VISIT_PAGES - 1,
                                            onClick: ()=>setVisitIndex((i)=>Math.min(VISIT_PAGES - 1, i + 1)),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowRight2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight2$3e$__["ArrowRight2"], {
                                                size: 16,
                                                variant: "Linear",
                                                color: "currentColor"
                                            }, void 0, false, {
                                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                lineNumber: 544,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 537,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 524,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-left font-sans sm:text-right sm:justify-self-end",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "whitespace-nowrap text-[12px] font-medium leading-tight text-tp-slate-500",
                                        children: RX_VISIT_DATETIME
                                    }, void 0, false, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 549,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 548,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 516,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 515,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px w-full shrink-0 bg-tp-slate-100",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 557,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[48px] items-center justify-between px-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex h-[32px] items-center rounded-[10px] bg-tp-slate-100 p-[3px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setRxTab("digital"),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-[26px] items-center rounded-[8px] px-[14px] font-sans text-[12px] font-semibold transition-colors", rxTab === "digital" ? "bg-white text-tp-blue-700 shadow-[0_1px_2px_rgba(15,23,42,0.08)]" : "text-tp-slate-600 hover:text-tp-slate-900"),
                                        children: "Digital Rx"
                                    }, void 0, false, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 563,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setRxTab("transcript"),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-[26px] items-center rounded-[8px] px-[14px] font-sans text-[12px] font-semibold transition-colors", rxTab === "transcript" ? "bg-white text-tp-blue-700 shadow-[0_1px_2px_rgba(15,23,42,0.08)]" : "text-tp-slate-600 hover:text-tp-slate-900"),
                                        children: "Transcript"
                                    }, void 0, false, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 575,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                lineNumber: 562,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                delayDuration: 280,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-[2px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": `Repeat this ${docKind}`,
                                                        className: "inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] text-tp-slate-600 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-900",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Refresh2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Refresh2$3e$__["Refresh2"], {
                                                            size: 16,
                                                            variant: "Linear",
                                                            color: "currentColor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                            lineNumber: 598,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                        lineNumber: 593,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 592,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    side: "bottom",
                                                    sideOffset: 6,
                                                    className: "max-w-[240px] text-balance",
                                                    children: isDigital ? `Repeat this digital Rx from ${RX_VISIT_DATETIME}` : `Repeat this transcript from ${RX_VISIT_DATETIME}`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 601,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 591,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": isDigital ? "Print this digital Rx" : "Print this transcript",
                                                        className: "inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] text-tp-slate-600 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-900",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                            size: 16,
                                                            variant: "Linear",
                                                            color: "currentColor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                            lineNumber: 614,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                        lineNumber: 609,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 608,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    side: "bottom",
                                                    sideOffset: 6,
                                                    children: isDigital ? "Print this digital Rx" : "Print this transcript"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 617,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 607,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": isDigital ? "Edit this digital Rx" : "Edit this transcript",
                                                        className: "inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] text-tp-slate-600 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-900",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Edit2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                            size: 16,
                                                            variant: "Linear",
                                                            color: "currentColor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                            lineNumber: 628,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                        lineNumber: 623,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 622,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    side: "bottom",
                                                    sideOffset: 6,
                                                    children: isDigital ? "Edit this digital Rx" : "Edit this transcript"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 631,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 621,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mx-[2px] h-[18px] w-px bg-tp-slate-200",
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 635,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": "More options",
                                                        className: "inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] text-tp-slate-600 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-900",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                                            size: 16,
                                                            strokeWidth: 1.75,
                                                            className: "text-tp-slate-600",
                                                            "aria-hidden": true
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                            lineNumber: 643,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                        lineNumber: 638,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 637,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    side: "bottom",
                                                    sideOffset: 6,
                                                    children: isDigital ? "More actions for this digital Rx" : "More actions for this transcript"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 646,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 636,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 590,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                lineNumber: 589,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 560,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px w-full shrink-0 bg-tp-slate-100",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                        lineNumber: 653,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 513,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white px-4 pt-4 pb-[18px]",
                children: rxTab === "transcript" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-sans text-[13px] leading-relaxed text-tp-slate-500",
                    children: "Consultation transcript will appear here when available from SmartScribe."
                }, void 0, false, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 657,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-sans text-[14px] font-medium text-tp-slate-900",
                                    children: "Chief Complaints"
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 663,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                    className: "mt-2 list-decimal pl-5 font-sans text-[12px] text-tp-slate-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Mild symptom (Mild, patient should be on home isolation)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 665,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 664,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 662,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-sans text-[14px] font-medium text-tp-slate-900",
                                    children: "Investigations"
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 669,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                    className: "mt-2 list-decimal space-y-1 pl-5 font-sans text-[12px] text-tp-slate-600",
                                    children: LAB_TESTS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: t
                                        }, t, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 672,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 670,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 668,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-sans text-[14px] font-medium text-tp-slate-900",
                                    children: "Medication"
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 677,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                    className: "mt-2 list-decimal space-y-1 pl-5 font-sans text-[12px] leading-relaxed text-tp-slate-600",
                                    children: MEDICATIONS.map((line)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: line
                                        }, line, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 680,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 678,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 676,
                            columnNumber: 13
                        }, this),
                        planProcedures.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-sans text-[14px] font-medium text-tp-slate-900",
                                            children: "Procedures"
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 687,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center rounded-[5px] bg-tp-violet-50 px-[7px] py-[2px] font-sans text-[10.5px] font-bold uppercase tracking-[0.3px] text-tp-violet-600",
                                            children: "From treatment plan"
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 688,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 686,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                    className: "mt-2 list-decimal space-y-1 pl-5 font-sans text-[12px] leading-relaxed text-tp-slate-600",
                                    children: planProcedures.map((p)=>{
                                        const meta = [
                                            p.toothLabel,
                                            p.doctor,
                                            p.date,
                                            p.status ? PROC_STATUS_LABEL[p.status] ?? p.status : "",
                                            p.notes
                                        ].filter(Boolean).join(", ");
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                p.name,
                                                meta ? ` (${meta})` : ""
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 693,
                                            columnNumber: 28
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 690,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 685,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-sans text-[14px] font-medium text-tp-slate-900",
                                    children: "Advice"
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 699,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                    className: "mt-2 list-decimal space-y-1 pl-5 font-sans text-[12px] text-tp-slate-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "Follow social distancing"
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 701,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "Practice hand hygiene"
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 702,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "Wear masks"
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 703,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 700,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 698,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-sans text-[14px] font-medium text-tp-slate-900",
                                    children: "Follow-up"
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 707,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 font-sans text-[12px] text-tp-slate-600",
                                    children: "03/07/2024"
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 708,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 706,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-sans text-[14px] font-medium text-tp-slate-900",
                                    children: "Vitals & Body Compositions"
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 711,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 font-sans text-[12px] leading-relaxed text-tp-slate-600",
                                    children: "Temperature: 95Frh, Pulse: 68/min, Resp. Rate: 95/min, Systolic:120mmHg, Diastolic: 75mmHg, SPO2: 95%, Height: 175cms, Weight: 68kgs, BMI: 22.20kg/m², BMR : 1693.75kcals, BSA: 1.82m²"
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 712,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 710,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 661,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 655,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
        lineNumber: 512,
        columnNumber: 5
    }, this);
}
_s2(DigitalRxPanel, "mbvXnU4O/+0uyXqv2n68T0pjU2w=", false, function() {
    return [
        usePlanProcedures
    ];
});
_c5 = DigitalRxPanel;
/** Copy only — sits inside {@link PatientDetailContentShell}. */ function EmptyModuleBody({ title, message, icon: Icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex w-full max-w-md flex-col items-center justify-center gap-3 px-6 py-10 text-center text-transparent",
        children: [
            Icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                size: 44,
                variant: "Bulk",
                color: "var(--tp-slate-300)"
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 728,
                columnNumber: 15
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-sans text-[15px] font-semibold text-tp-slate-800",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 729,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-sans text-[13px] leading-relaxed text-tp-slate-500",
                children: message
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 730,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
        lineNumber: 727,
        columnNumber: 5
    }, this);
}
_c6 = EmptyModuleBody;
/**
 * Shared module surface (placeholders): one rounded panel overlapping the banner.
 */ function PatientDetailContentShell({ children, className, bodyClassName }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-tp-figma-capture": "patient-detail-module-shell",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-10 mt-[-62px] flex h-full min-h-0 min-w-0 w-full flex-1 flex-col rounded-[16px] bg-white shadow-[0_1px_3px_rgba(23,23,37,0.06)]", bodyClassName, className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
        lineNumber: 740,
        columnNumber: 5
    }, this);
}
_c7 = PatientDetailContentShell;
const NAV_CONFIG = [
    {
        id: "opd-summary",
        label: "OPD Visit Summary",
        bannerTitle: "OPD Visit Summary",
        kind: "opd"
    },
    {
        id: "reports",
        label: "Reports",
        bannerTitle: "Reports",
        kind: "placeholder",
        placeholderKey: "reports"
    },
    {
        id: "certificates",
        label: "Certificates",
        bannerTitle: "Certificates",
        kind: "placeholder",
        placeholderKey: "certificates"
    },
    {
        id: "add-edit-bill",
        label: "Add/Edit Bill",
        bannerTitle: "Add/Edit Bill",
        kind: "placeholder",
        placeholderKey: "bill"
    },
    // Dental plan hidden for v0 — no doctor-facing entry point.
    {
        id: "ipd-discharge",
        label: "IPD Discharge Summary",
        bannerTitle: "IPD Discharge Summary",
        kind: "placeholder",
        placeholderKey: "ipd"
    },
    {
        id: "daycare-discharge",
        label: "Daycare Discharge Summary",
        bannerTitle: "Daycare Discharge Summary",
        kind: "placeholder",
        placeholderKey: "daycare"
    }
];
function SecondaryNavIcon({ item, selected }) {
    /** Match primary sidebar (`SecondaryNavPanel` / appointments): Bulk + inverse on blue pill, Linear + slate on slate pill. */ const iconSize = 20;
    const idleColor = "var(--tp-slate-700)";
    const activeColor = "var(--tp-slate-0)";
    if (item.id === "opd-summary") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText$3e$__["DocumentText"], {
            size: iconSize,
            variant: selected ? "Bulk" : "Linear",
            color: selected ? activeColor : idleColor
        }, void 0, false, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 789,
            columnNumber: 7
        }, this);
    }
    if (item.id === "reports") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Note1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Note1$3e$__["Note1"], {
            size: iconSize,
            variant: selected ? "Bulk" : "Linear",
            color: selected ? activeColor : idleColor
        }, void 0, false, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 797,
            columnNumber: 12
        }, this);
    }
    if (item.id === "certificates") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$MedalStar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MedalStar$3e$__["MedalStar"], {
            size: iconSize,
            variant: selected ? "Bulk" : "Linear",
            color: selected ? activeColor : idleColor
        }, void 0, false, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 800,
            columnNumber: 12
        }, this);
    }
    if (item.id === "add-edit-bill") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ReceiptText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReceiptText$3e$__["ReceiptText"], {
            size: iconSize,
            variant: selected ? "Bulk" : "Linear",
            color: selected ? activeColor : idleColor
        }, void 0, false, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 803,
            columnNumber: 12
        }, this);
    }
    if (item.id === "dental-plan") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
            name: "surgical-scissors-02",
            variant: selected ? "bulk" : "line",
            size: iconSize,
            color: selected ? activeColor : idleColor
        }, void 0, false, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 807,
            columnNumber: 7
        }, this);
    }
    if (item.id === "ipd-discharge") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Hospital$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hospital$3e$__["Hospital"], {
            size: iconSize,
            variant: selected ? "Bulk" : "Linear",
            color: selected ? activeColor : idleColor
        }, void 0, false, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 816,
            columnNumber: 12
        }, this);
    }
    if (item.id === "daycare-discharge") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Buildings2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Buildings2$3e$__["Buildings2"], {
            size: iconSize,
            variant: selected ? "Bulk" : "Linear",
            color: selected ? activeColor : idleColor
        }, void 0, false, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 819,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText$3e$__["DocumentText"], {
        size: iconSize,
        variant: "Linear",
        color: idleColor
    }, void 0, false, {
        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
        lineNumber: 821,
        columnNumber: 10
    }, this);
}
_c8 = SecondaryNavIcon;
const PLACEHOLDER_COPY = {
    reports: {
        title: "Reports",
        message: "Investigation and imaging reports linked to this patient will show here.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Note1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Note1$3e$__["Note1"]
    },
    certificates: {
        title: "Certificates",
        message: "Medical certificates and fitness notes will appear in this section.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentText$3e$__["DocumentText"]
    },
    bill: {
        title: "Add/Edit Bill",
        message: "Create invoices, record payments, and manage billing from here.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ReceiptText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReceiptText$3e$__["ReceiptText"]
    },
    ipd: {
        title: "IPD Discharge Summary",
        message: "Inpatient discharge summaries will be listed here when available.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Hospital$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hospital$3e$__["Hospital"]
    },
    daycare: {
        title: "Daycare Discharge Summary",
        message: "Daycare procedure summaries will appear here.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Buildings2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Buildings2$3e$__["Buildings2"]
    }
};
/** Shared styling for every banner CTA — matches the appointments page action buttons. */ const BANNER_GHOST_BTN_CLASS = "!bg-white/[0.13] !text-white !backdrop-blur-[4px] hover:!bg-white/[0.22] whitespace-nowrap";
const BANNER_SOLID_BTN_CLASS = "whitespace-nowrap";
/**
 * Builds the CTA(s) shown on the right of the banner for the currently-selected nav item.
 * Each module gets a contextual action (Type RX dropdown, Add bill, Upload report, etc.),
 * mirroring how the appointments page decorates its own banner with page-specific actions.
 */ function renderBannerActions(activeConfig, { goTypeRx }) {
    if (!activeConfig) return null;
    // OPD summary + Dental plan both live in the Rx authoring flow → offer the
    // Type RX split button (primary = TypeRx; dropdown = Voice/Snap/WriteRx).
    if (activeConfig.kind === "opd" || activeConfig.kind === "dental-plan") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPSplitButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPSplitButton"], {
            size: "md",
            variant: "solid",
            theme: "primary",
            surface: "dark",
            className: BANNER_SOLID_BTN_CLASS,
            primaryAction: {
                label: "Type RX",
                onClick: goTypeRx
            },
            secondaryActions: [
                {
                    id: "type-rx",
                    label: "Type RX",
                    onClick: goTypeRx
                },
                {
                    id: "voice-rx",
                    label: "Voice RX",
                    onClick: goTypeRx
                },
                {
                    id: "snap-rx",
                    label: "Snap RX",
                    onClick: goTypeRx
                },
                {
                    id: "smart-sync",
                    label: "WriteRx",
                    onClick: goTypeRx
                }
            ]
        }, void 0, false, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 869,
            columnNumber: 7
        }, this);
    }
    // Simple page-specific CTAs for the remaining sections.
    const actionByKey = {
        reports: {
            label: "Upload report",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$DocumentUpload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentUpload$3e$__["DocumentUpload"], {
                size: 20,
                variant: "Linear",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 888,
                columnNumber: 46
            }, this)
        },
        certificates: {
            label: "Add new certificate",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Add$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Add$3e$__["Add"], {
                size: 20,
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 889,
                columnNumber: 57
            }, this)
        },
        bill: {
            label: "Add new bill",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Add$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Add$3e$__["Add"], {
                size: 20,
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 890,
                columnNumber: 42
            }, this)
        },
        ipd: {
            label: "Add IPD summary",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Add$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Add$3e$__["Add"], {
                size: 20,
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 891,
                columnNumber: 44
            }, this)
        },
        daycare: {
            label: "Add daycare summary",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Add$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Add$3e$__["Add"], {
                size: 20,
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                lineNumber: 892,
                columnNumber: 52
            }, this)
        }
    };
    const key = activeConfig.placeholderKey;
    const meta = actionByKey[key];
    if (!meta) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPButton"], {
        variant: "outline",
        theme: "primary",
        size: "md",
        surface: "dark",
        className: BANNER_GHOST_BTN_CLASS,
        leftIcon: meta.icon,
        children: meta.label
    }, void 0, false, {
        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
        lineNumber: 898,
        columnNumber: 5
    }, this);
}
function PatientDetailInner() {
    _s3();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const patientId = searchParams?.get("patientId") ?? "apt-1";
    const fromPage = searchParams?.get("from") ?? "appointments";
    const [activeNav, setActiveNav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("opd-summary");
    const [rxTab, setRxTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("digital");
    const [visitIndex, setVisitIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isProfileOpen, setIsProfileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const navFromUrl = searchParams?.get("nav");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatientDetailInner.useEffect": ()=>{
            if (!navFromUrl) return;
            if (NAV_CONFIG.some({
                "PatientDetailInner.useEffect": (n)=>n.id === navFromUrl
            }["PatientDetailInner.useEffect"])) {
                setActiveNav(navFromUrl);
            }
        }
    }["PatientDetailInner.useEffect"], [
        navFromUrl
    ]);
    const headerPatient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PatientDetailInner.useMemo[headerPatient]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppointmentPatient"])(patientId)
    }["PatientDetailInner.useMemo[headerPatient]"], [
        patientId
    ]);
    const profileFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PatientDetailInner.useMemo[profileFields]": ()=>buildPatientHeaderProfileFields(patientId)
    }["PatientDetailInner.useMemo[profileFields]"], [
        patientId
    ]);
    const activeConfig = NAV_CONFIG.find((n)=>n.id === activeNav) ?? NAV_CONFIG[0];
    const handleBack = ()=>{
        if (fromPage === "rxpad") {
            router.push(`/rxpad?patientId=${patientId}`);
        } else {
            router.push("/appointments");
        }
    };
    const goTypeRx = ()=>{
        router.push(`/rxpad?patientId=${patientId}`);
    };
    const onNavClick = (item)=>{
        if (item.kind === "route" && item.route) {
            router.push(`${item.route}?patientId=${encodeURIComponent(patientId)}`);
            return;
        }
        setActiveNav(item.id);
    };
    const bannerActions = renderBannerActions(activeConfig, {
        goTypeRx
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-full flex-col overflow-hidden bg-tp-slate-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-0 flex-1 overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "relative flex w-[220px] shrink-0 flex-col overflow-hidden border-r border-tp-slate-100 bg-white",
                    "aria-label": "Patient sections",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "shrink-0 px-3 pt-3 pb-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleBack,
                                "aria-label": "Go back",
                                className: "inline-flex h-[32px] items-center gap-[6px] rounded-[8px] pl-[6px] pr-[10px] font-sans text-[14px] font-medium text-tp-slate-600 transition-colors hover:bg-tp-slate-50 hover:text-tp-blue-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowLeft2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft2$3e$__["ArrowLeft2"], {
                                        size: 16,
                                        color: "currentColor",
                                        variant: "Linear"
                                    }, void 0, false, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 972,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 973,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                lineNumber: 966,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 965,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-px shrink-0 bg-tp-slate-100",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 976,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "shrink-0 px-3 pt-3 pb-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                open: isProfileOpen,
                                onOpenChange: setIsProfileOpen,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "flex w-full items-center gap-2.5 rounded-[10px] bg-tp-slate-100 px-2 py-2 text-left transition-colors hover:bg-tp-slate-200/75 data-[state=open]:bg-tp-slate-200/80",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatarRing,
                                                    "data-name": "Profile Image",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatarIcon,
                                                        "data-name": "User",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$User$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            color: "var(--tp-slate-500)",
                                                            size: 22.857,
                                                            variant: "Bulk"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                            lineNumber: 986,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                        lineNumber: 985,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 984,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "truncate font-sans text-[14px] font-semibold text-tp-slate-900",
                                                            children: headerPatient.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                            lineNumber: 990,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "flex items-center font-sans text-[12px] font-medium",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-tp-slate-500",
                                                                    children: headerPatient.genderShort
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                                    lineNumber: 992,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-[14px] shrink-0 text-center text-tp-slate-300",
                                                                    "aria-hidden": true,
                                                                    children: "·"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                                    lineNumber: 993,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-tp-slate-500",
                                                                    children: `${headerPatient.age}Y`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                                    lineNumber: 996,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                            lineNumber: 991,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 989,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chevronWrap, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chevronSpin, isProfileOpen && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chevronSpinOpen),
                                                    "aria-hidden": true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__["ArrowDown2"], {
                                                        color: "var(--tp-slate-700)",
                                                        size: 18,
                                                        strokeWidth: 2,
                                                        variant: "Linear"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                        lineNumber: 1007,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 999,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 980,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 979,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                        align: "start",
                                        sideOffset: 6,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuContent,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuArrowOuter
                                            }, void 0, false, {
                                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                lineNumber: 1012,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuArrowInner
                                            }, void 0, false, {
                                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                lineNumber: 1013,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuFields,
                                                children: profileFields.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuFieldRow,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuIconCircle,
                                                                children: item.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                                lineNumber: 1017,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuFieldText,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuLabel,
                                                                        children: item.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                                        lineNumber: 1019,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuValue,
                                                                        children: item.value
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                                        lineNumber: 1020,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                                lineNumber: 1018,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, item.key, true, {
                                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                        lineNumber: 1016,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                lineNumber: 1014,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuActions,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuActionBtn,
                                                    onClick: ()=>setIsProfileOpen(false),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Edit2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                            color: "currentColor",
                                                            size: 20,
                                                            strokeWidth: 1.5,
                                                            variant: "Linear"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                            lineNumber: 1031,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$imports$2f$RxpadHeader$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuActionLabel,
                                                            children: "Edit patient details"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                            lineNumber: 1032,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 1026,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                lineNumber: 1025,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 1011,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                lineNumber: 978,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 977,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-px shrink-0 bg-tp-slate-100",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 1039,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-h-0 flex-1 flex-col gap-[2px] overflow-y-auto overflow-x-hidden pb-4 pt-3",
                            children: NAV_CONFIG.map((item)=>{
                                const active = activeNav === item.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>onNavClick(item),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full flex-row items-center gap-3 px-3 py-[10px] text-left transition-colors", active ? "bg-tp-blue-50" : "hover:bg-tp-slate-50"),
                                    children: [
                                        active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute bottom-[6px] left-0 top-[6px] w-[3px] rounded-r-[12px] bg-tp-blue-500",
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 1055,
                                            columnNumber: 21
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] transition-colors", active ? "bg-tp-blue-500" : "bg-tp-slate-100"),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SecondaryNavIcon, {
                                                item: item,
                                                selected: active
                                            }, void 0, false, {
                                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                lineNumber: 1066,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 1060,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("min-w-0 flex-1 truncate font-sans text-[14px] leading-snug", active ? "font-semibold text-tp-slate-900" : "font-medium text-tp-slate-700"),
                                            title: item.label,
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                            lineNumber: 1068,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 1045,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 1041,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 961,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("static flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden", __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$DrAgentLayoutShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DR_AGENT_MAIN_RESERVE_CLASS"], "overflow-hidden", (activeConfig.kind === "placeholder" || activeConfig.kind === "dental-plan") && "bg-tp-slate-50"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appointments$2f$AppointmentBanner$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppointmentBanner"], {
                            title: activeConfig.bannerTitle,
                            actions: bannerActions
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 1092,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-10 flex min-w-0 w-full flex-col px-3 pb-0 sm:px-4 md:px-5 lg:px-[18px] min-h-0 flex-1"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex min-w-0 w-full max-w-none flex-col overflow-visible h-full min-h-0 flex-1"),
                                children: activeConfig.kind === "opd" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PatientDetailContentShell, {
                                    className: "bg-transparent shadow-none rounded-none",
                                    bodyClassName: "flex min-h-0 flex-1 flex-col h-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex w-full h-full min-w-0 min-h-0 flex-col gap-4 py-0 md:gap-5 lg:flex-row pb-[18px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                className: "flex min-h-0 h-full flex-col gap-4 overflow-y-auto max-lg:w-full lg:w-[340px] lg:min-w-[200px] lg:shrink scrollbar-hide",
                                                "aria-label": "Historical data",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HistorySectionCards, {
                                                        patientId: patientId
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                        lineNumber: 1118,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 1117,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                lineNumber: 1113,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                className: "flex min-h-0 h-full flex-1 flex-col overflow-hidden lg:min-w-[300px]",
                                                "aria-label": "Prescription",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DigitalRxPanel, {
                                                    visitIndex: visitIndex,
                                                    setVisitIndex: setVisitIndex,
                                                    rxTab: rxTab,
                                                    setRxTab: setRxTab
                                                }, void 0, false, {
                                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                    lineNumber: 1125,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                                lineNumber: 1121,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 1112,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 1108,
                                    columnNumber: 17
                                }, this) : activeConfig.kind === "dental-plan" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PatientDetailContentShell, {
                                    className: "border border-tp-slate-200/80 shadow-none",
                                    bodyClassName: "flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$TreatmentPlanPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TreatmentPlanEmbed"], {
                                        patientId: patientId
                                    }, void 0, false, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 1139,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 1135,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PatientDetailContentShell, {
                                    bodyClassName: "flex min-h-[min(480px,72vh)] flex-1 flex-col items-center justify-center overflow-y-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyModuleBody, {
                                        title: PLACEHOLDER_COPY[activeConfig.placeholderKey].title,
                                        message: PLACEHOLDER_COPY[activeConfig.placeholderKey].message,
                                        icon: PLACEHOLDER_COPY[activeConfig.placeholderKey].icon
                                    }, void 0, false, {
                                        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                        lineNumber: 1143,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                    lineNumber: 1142,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                                lineNumber: 1102,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                            lineNumber: 1097,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
                    lineNumber: 1084,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 959,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
        lineNumber: 958,
        columnNumber: 5
    }, this);
}
_s3(PatientDetailInner, "VwevYR22uWuQJOKgk6aDMneAqe4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c9 = PatientDetailInner;
function PatientDetailPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center bg-tp-slate-100 font-sans text-tp-slate-500",
            children: "Loading…"
        }, void 0, false, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 1160,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PatientDetailInner, {}, void 0, false, {
            fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
            lineNumber: 1161,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/patient-detail/PatientDetailPage.jsx",
        lineNumber: 1160,
        columnNumber: 5
    }, this);
}
_c10 = PatientDetailPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "CardShell");
__turbopack_context__.k.register(_c1, "HistorySectionCard");
__turbopack_context__.k.register(_c2, "DentalHistoryInline");
__turbopack_context__.k.register(_c3, "DentalHistoryCard");
__turbopack_context__.k.register(_c4, "HistorySectionCards");
__turbopack_context__.k.register(_c5, "DigitalRxPanel");
__turbopack_context__.k.register(_c6, "EmptyModuleBody");
__turbopack_context__.k.register(_c7, "PatientDetailContentShell");
__turbopack_context__.k.register(_c8, "SecondaryNavIcon");
__turbopack_context__.k.register(_c9, "PatientDetailInner");
__turbopack_context__.k.register(_c10, "PatientDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_patient-detail_PatientDetailPage_jsx_fd0e7f12._.js.map