(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/dental/LottieIcon.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LottieIcon",
    ()=>LottieIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lottie$2d$react$2f$build$2f$index$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lottie-react/build/index.umd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$lottie$2f$arrow$2d$left$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/lottie/arrow-left.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$lottie$2f$arrow$2d$up$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/lottie/arrow-up.json (json)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const ANIMATIONS = {
    "arrow-left": __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$lottie$2f$arrow$2d$left$2e$json__$28$json$29$__["default"],
    "arrow-up": __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$lottie$2f$arrow$2d$up$2e$json__$28$json$29$__["default"]
};
/**
 * Recursively walk a Lottie JSON and recolor all strokes (stroke type "st"
 * and fill type "fl") to the given RGB 0..1 array.
 */ function recolor(data, rgb) {
    if (!data) return data;
    if (Array.isArray(data)) return data.map((d)=>recolor(d, rgb));
    if (typeof data !== "object") return data;
    const out = Array.isArray(data) ? [] : {
        ...data
    };
    if (data.ty === "st" || data.ty === "fl") {
        if (data.c?.k) {
            out.c = {
                ...data.c,
                k: rgb
            };
        }
    }
    for (const key of Object.keys(data)){
        if (key === "c") continue;
        out[key] = recolor(data[key], rgb);
    }
    return out;
}
function hexToRgb01(hex) {
    const m = hex.replace("#", "").match(/.{2}/g);
    if (!m || m.length < 3) return [
        1,
        1,
        1,
        1
    ];
    return [
        parseInt(m[0], 16) / 255,
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        1
    ];
}
function LottieIcon({ name, size = 24, loop = true, autoplay = true, className, color }) {
    _s();
    const src = ANIMATIONS[name];
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LottieIcon.useMemo[data]": ()=>color ? recolor(src, hexToRgb01(color)) : src
    }["LottieIcon.useMemo[data]"], [
        src,
        color
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: {
            width: size,
            height: size,
            pointerEvents: "none"
        },
        className: className,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lottie$2d$react$2f$build$2f$index$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            animationData: data,
            loop: loop,
            autoplay: autoplay,
            style: {
                width: size,
                height: size
            }
        })
    });
}
_s(LottieIcon, "jwuu1hJIzb+z9O8CErpZ1XdXNoc=");
_c = LottieIcon;
var _c;
__turbopack_context__.k.register(_c, "LottieIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/plan/treatments.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Treatment catalog + default rates (per tooth) based on the PRD.
 * Rates in ₹.
 */ __turbopack_context__.s([
    "TREATMENT_CATALOG",
    ()=>TREATMENT_CATALOG,
    "TREATMENT_NAMES",
    ()=>TREATMENT_NAMES,
    "getRate",
    ()=>getRate
]);
const TREATMENT_CATALOG = [
    // Endodontics
    {
        name: "Root Canal Treatment",
        defaultRate: 8000,
        category: "Endodontics"
    },
    {
        name: "Pulp Capping",
        defaultRate: 1500,
        category: "Endodontics"
    },
    {
        name: "Apicoectomy",
        defaultRate: 5000,
        category: "Endodontics"
    },
    // General
    {
        name: "Scaling & Polishing",
        defaultRate: 1500,
        category: "General"
    },
    {
        name: "Teeth Whitening",
        defaultRate: 8000,
        category: "General"
    },
    {
        name: "Fluoride Application",
        defaultRate: 1200,
        category: "General"
    },
    {
        name: "Cavity Filling (GIC)",
        defaultRate: 1500,
        category: "General"
    },
    {
        name: "Restoration (Composite Filling)",
        defaultRate: 2000,
        category: "General"
    },
    {
        name: "Restoration (Amalgam)",
        defaultRate: 1800,
        category: "General"
    },
    // Prosthodontics
    {
        name: "Crown (PFM)",
        defaultRate: 6000,
        category: "Prosthodontics"
    },
    {
        name: "Crown (Zirconia)",
        defaultRate: 12000,
        category: "Prosthodontics"
    },
    {
        name: "Crown (All-Ceramic)",
        defaultRate: 10000,
        category: "Prosthodontics"
    },
    {
        name: "Bridge (per unit)",
        defaultRate: 6000,
        category: "Prosthodontics"
    },
    {
        name: "Complete Denture",
        defaultRate: 15000,
        category: "Prosthodontics"
    },
    {
        name: "Partial Denture",
        defaultRate: 8000,
        category: "Prosthodontics"
    },
    {
        name: "Veneers",
        defaultRate: 9000,
        category: "Prosthodontics"
    },
    // Oral Surgery
    {
        name: "Extraction",
        defaultRate: 1500,
        category: "Oral Surgery"
    },
    {
        name: "Surgical Extraction",
        defaultRate: 3500,
        category: "Oral Surgery"
    },
    {
        name: "Wisdom Tooth Removal",
        defaultRate: 5000,
        category: "Oral Surgery"
    },
    {
        name: "Implant (Single)",
        defaultRate: 25000,
        category: "Oral Surgery"
    },
    {
        name: "Implant Crown",
        defaultRate: 9000,
        category: "Oral Surgery"
    },
    {
        name: "Bone Grafting",
        defaultRate: 12000,
        category: "Oral Surgery"
    },
    // Periodontics
    {
        name: "Deep Cleaning (per quadrant)",
        defaultRate: 2500,
        category: "Periodontics"
    },
    {
        name: "Flap Surgery",
        defaultRate: 8000,
        category: "Periodontics"
    },
    {
        name: "Gingival Grafting",
        defaultRate: 10000,
        category: "Periodontics"
    },
    // Orthodontics
    {
        name: "Metal Braces",
        defaultRate: 25000,
        category: "Orthodontics"
    },
    {
        name: "Ceramic Braces",
        defaultRate: 45000,
        category: "Orthodontics"
    },
    {
        name: "Clear Aligners",
        defaultRate: 80000,
        category: "Orthodontics"
    },
    {
        name: "Retainer",
        defaultRate: 3000,
        category: "Orthodontics"
    }
];
const TREATMENT_NAMES = TREATMENT_CATALOG.map(_c = (t)=>t.name);
_c1 = TREATMENT_NAMES;
function getRate(treatmentName) {
    const found = TREATMENT_CATALOG.find((t)=>t.name === treatmentName);
    return found?.defaultRate ?? 0;
}
var _c, _c1;
__turbopack_context__.k.register(_c, "TREATMENT_NAMES$TREATMENT_CATALOG.map");
__turbopack_context__.k.register(_c1, "TREATMENT_NAMES");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/plan/exam-suggestions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EXAM_CHART_STORAGE_PREFIX",
    ()=>EXAM_CHART_STORAGE_PREFIX,
    "buildExamSuggestions",
    ()=>buildExamSuggestions,
    "fdiToLabel",
    ()=>fdiToLabel
]);
/**
 * Builds treatment-plan quick picks from (1) seeded INITIAL_TOOTH_STATE,
 * (2) live examination chart rows persisted from DentalCanvas.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$treatments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/treatments.ts [app-client] (ecmascript)");
;
;
const EXAM_CHART_STORAGE_PREFIX = "dental.exam.chart.";
const QUADRANT_MAP = {
    "1": "Upper Right",
    "2": "Upper Left",
    "3": "Lower Left",
    "4": "Lower Right"
};
const TOOTH_NAMES = {
    1: "Central Incisor",
    2: "Lateral Incisor",
    3: "Canine",
    4: "First Premolar",
    5: "Second Premolar",
    6: "First Molar",
    7: "Second Molar",
    8: "Third Molar"
};
function fdiToLabel(fdi) {
    if (fdi === "full-mouth") return "Full Mouth";
    const q = fdi[0];
    const pos = parseInt(fdi[1], 10);
    const quadrant = QUADRANT_MAP[q] ?? "";
    const name = TOOTH_NAMES[pos] ?? "";
    return `${quadrant} ${name}`.trim();
}
function mapDiagnosisToTreatment(diagnosis) {
    const map = {
        RCT: "Root Canal Treatment",
        Crown: "Crown (PFM)",
        Bridge: "Bridge (per unit)",
        Implant: "Implant (Single)",
        Missing: "Implant (Single)",
        Extraction: "Extraction",
        "Composite Filling": "Restoration (Composite Filling)",
        Scaling: "Scaling & Polishing",
        Polishing: "Scaling & Polishing",
        Veneer: "Veneers",
        "Pulp Cap": "Pulp Capping",
        "Root Planing": "Deep Cleaning (per quadrant)",
        Denture: "Partial Denture"
    };
    return map[diagnosis] ?? null;
}
function mapFindingToTreatment(findingType) {
    const map = {
        "Cavity/Caries": "Restoration (Composite Filling)",
        Crack: "Crown (PFM)",
        Fracture: "Crown (PFM)",
        Sensitivity: "Root Canal Treatment",
        Erosion: "Restoration (Composite Filling)",
        NCCL: "Restoration (Composite Filling)",
        Calculus: "Scaling & Polishing",
        Plaque: "Scaling & Polishing",
        Staining: "Teeth Whitening",
        Recession: "Gingival Grafting",
        Resorption: "Root Canal Treatment"
    };
    return map[findingType] ?? null;
}
/** Map short examination procedure names to billing catalog lines. */ function mapChartProcedureName(name) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$treatments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TREATMENT_NAMES"].includes(name)) return name;
    const shortcuts = {
        RCT: "Root Canal Treatment",
        Restoration: "Restoration (Composite Filling)",
        "Composite Filling": "Restoration (Composite Filling)",
        Extraction: "Extraction",
        Scaling: "Scaling & Polishing",
        Polishing: "Scaling & Polishing",
        "Crown Prep": "Crown (PFM)",
        "Bridge Prep": "Bridge (per unit)",
        "Implant Placement": "Implant (Single)",
        "Pulp Cap": "Pulp Capping",
        "Root Planing": "Deep Cleaning (per quadrant)",
        Veneer: "Veneers"
    };
    if (shortcuts[name]) return shortcuts[name];
    const lower = name.toLowerCase();
    const fuzzy = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$treatments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TREATMENT_NAMES"].find((n)=>n.toLowerCase() === lower || n.toLowerCase().includes(lower) || lower.includes(n.toLowerCase()));
    return fuzzy ?? null;
}
function loadChartSnapshot(patientId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(`${EXAM_CHART_STORAGE_PREFIX}${patientId}`);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
function diagnosesForPatient(patientId, toothState) {
    const snap = loadChartSnapshot(patientId);
    if (snap?.toothDiagnoses && Object.keys(snap.toothDiagnoses).length > 0) return snap.toothDiagnoses;
    return toothState?.toothDiagnoses ?? {};
}
function findingsForPatient(patientId, toothState) {
    const snap = loadChartSnapshot(patientId);
    if (snap?.findingsByTooth && Object.keys(snap.findingsByTooth).length > 0) return snap.findingsByTooth;
    return toothState?.findingsByTooth ?? {};
}
function suggestionKey(s) {
    return `${s.treatment}::${s.toothFdi}`;
}
function buildExamSuggestions(patientId) {
    const byKey = new Map();
    const push = (s)=>{
        const k = suggestionKey(s);
        if (!byKey.has(k)) byKey.set(k, s);
    };
    const toothState = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_TOOTH_STATE"][patientId];
    const diagMap = diagnosesForPatient(patientId, toothState);
    for (const [fdi, diagnoses] of Object.entries(diagMap)){
        for (const diag of diagnoses){
            const treatmentName = mapDiagnosisToTreatment(diag);
            if (treatmentName) {
                push({
                    treatment: treatmentName,
                    toothFdi: fdi,
                    toothLabel: fdiToLabel(fdi),
                    surfaces: [],
                    source: "examination",
                    hint: `Diagnosis on T${fdi}: ${diag}`
                });
            }
        }
    }
    const findMap = findingsForPatient(patientId, toothState);
    for (const [fdi, findings] of Object.entries(findMap)){
        for (const finding of findings){
            const treatmentName = mapFindingToTreatment(finding.type);
            if (treatmentName) {
                push({
                    treatment: treatmentName,
                    toothFdi: fdi,
                    toothLabel: fdiToLabel(fdi),
                    surfaces: [
                        finding.zoneId
                    ],
                    source: "examination",
                    hint: `Finding on T${fdi}: ${finding.type}`
                });
            }
        }
    }
    const live = loadChartSnapshot(patientId);
    const entries = live?.entries ?? [];
    for (const e of entries){
        if (e.kind !== "procedure" && e.kind !== "planned") continue;
        const rawName = (e.name ?? "").trim();
        if (!rawName) continue;
        const mapped = mapChartProcedureName(e.name);
        const treatmentName = mapped ?? rawName;
        push({
            treatment: treatmentName,
            toothFdi: e.toothFdi,
            toothLabel: fdiToLabel(e.toothFdi),
            surfaces: [
                ...e.surfaces ?? []
            ],
            source: "chart",
            hint: mapped ? `Examination: “${e.name}” → ${treatmentName}` : `Examination: ${rawName} (T${e.toothFdi})`
        });
    }
    return Array.from(byKey.values());
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/plan/plan-types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * plan-types.ts — Type definitions for the Treatment Plan module.
 *
 * Hierarchy: TreatmentPlan → PlanService → SittingRecord / SubProcedure
 * Lifecycle:  Draft → Active (1 at a time) → In Progress → Completed
 */ // ─── Core Entities ──────────────────────────────────────────
__turbopack_context__.s([
    "SURFACE_ABBR",
    ()=>SURFACE_ABBR,
    "SURFACE_COLORS",
    ()=>SURFACE_COLORS,
    "SURFACE_OPTIONS",
    ()=>SURFACE_OPTIONS,
    "genId",
    ()=>genId,
    "getDefaultPlanSurfaces",
    ()=>getDefaultPlanSurfaces,
    "getPlanSurfaceLabel",
    ()=>getPlanSurfaceLabel
]);
const SURFACE_OPTIONS = [
    {
        id: "whole",
        label: "Whole Tooth",
        abbr: "WT"
    },
    {
        id: "occlusal",
        label: "Occlusal",
        abbr: "O"
    },
    {
        id: "buccal",
        label: "Buccal",
        abbr: "B"
    },
    {
        id: "lingual",
        label: "Lingual",
        abbr: "L"
    },
    {
        id: "mesial",
        label: "Mesial",
        abbr: "M"
    },
    {
        id: "distal",
        label: "Distal",
        abbr: "D"
    },
    {
        id: "cervical",
        label: "Cervical",
        abbr: "C"
    },
    {
        id: "root",
        label: "Root",
        abbr: "R"
    }
];
const SURFACE_COLORS = {
    whole: "#34d399",
    occlusal: "#14b8a6",
    buccal: "#f97316",
    lingual: "#8b5cf6",
    mesial: "#eab308",
    distal: "#2563eb",
    cervical: "#ec4899",
    root: "#65a30d"
};
const SURFACE_ABBR = Object.fromEntries(_c1 = SURFACE_OPTIONS.map(_c = (option)=>[
        option.id,
        option.abbr
    ]));
_c2 = SURFACE_ABBR;
function getPlanSurfaceLabel(surfaceId) {
    const opt = SURFACE_OPTIONS.find((o)=>o.id === surfaceId);
    if (opt) return opt.label;
    if (typeof surfaceId === "string" && surfaceId.length > 0) return surfaceId.charAt(0).toUpperCase() + surfaceId.slice(1);
    return String(surfaceId);
}
const WHOLE_TOOTH_TREATMENTS = new Set([
    "Root Canal Treatment",
    "Pulp Capping",
    "Crown (PFM)",
    "Crown (Zirconia)",
    "Crown (All-Ceramic)",
    "Bridge (per unit)",
    "Complete Denture",
    "Partial Denture",
    "Veneers",
    "Extraction",
    "Surgical Extraction",
    "Wisdom Tooth Removal",
    "Implant (Single)",
    "Implant Crown",
    "Bone Grafting",
    "Apicoectomy",
    "Fluoride Application"
]);
function getDefaultPlanSurfaces(treatmentName) {
    return WHOLE_TOOTH_TREATMENTS.has(treatmentName) ? [
        "whole"
    ] : [];
}
// ─── Helper: generate unique ID ─────────────────────────────
let _counter = 0;
function genId(prefix = "id") {
    _counter += 1;
    return `${prefix}-${Date.now()}-${_counter}`;
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SURFACE_ABBR$Object.fromEntries$SURFACE_OPTIONS.map");
__turbopack_context__.k.register(_c1, "SURFACE_ABBR$Object.fromEntries");
__turbopack_context__.k.register(_c2, "SURFACE_ABBR");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/plan/plan-mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * plan-mock-data.ts — Realistic demo data for treatment plans.
 *
 * apt-1 (Shyam GR): 3 plans covering draft, in-progress, completed
 * apt-6 (if needed): 1 plan
 */ __turbopack_context__.s([
    "getMockPlans",
    ()=>getMockPlans
]);
// ─── apt-1: Shyam GR ───────────────────────────────────────
const PRIMARY_CARE_PLAN = {
    id: "plan-001",
    name: "Primary Care Plan",
    patientId: "apt-1",
    createdAt: "2026-03-15",
    updatedAt: "2026-04-03",
    status: "in-progress",
    notes: "Priority treatment — patient reports sensitivity and pain.",
    services: [
        {
            id: "svc-001",
            planId: "plan-001",
            treatment: "Root Canal Treatment",
            toothFdi: "36",
            toothLabel: "Lower Left First Molar",
            surfaces: [
                "occlusal",
                "root"
            ],
            rate: 8000,
            discount: 0,
            amount: 8000,
            status: "in-progress",
            startedAt: "2026-04-03",
            sittings: [
                {
                    id: "sit-001",
                    date: "3 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Initial debridement, access opening, BMP placed"
                },
                {
                    id: "sit-002",
                    date: "10 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Canal shaping + obturation completed"
                },
                {
                    id: "sit-cancel-demo",
                    date: "1 Apr 2026, 2:00 PM",
                    doctor: "Dr. Riya Kapoor",
                    visitType: "Review",
                    status: "cancelled",
                    notes: "Patient rescheduled — no treatment performed.",
                    createdAt: "2026-04-01T14:00:00.000Z"
                }
            ],
            procedures: [
                {
                    id: "proc-001",
                    name: "Access opening",
                    date: "3 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-002",
                    name: "BMP placement",
                    date: "3 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-003",
                    name: "Obturation",
                    date: "10 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "in-progress"
                }
            ]
        },
        {
            id: "svc-002",
            planId: "plan-001",
            treatment: "Restoration (Composite Filling)",
            toothFdi: "16",
            toothLabel: "Upper Right First Molar",
            surfaces: [
                "buccal",
                "occlusal"
            ],
            rate: 2000,
            discount: 0,
            amount: 2000,
            status: "planned",
            sittings: [
                {
                    id: "sit-upcoming-demo",
                    date: "24 Apr 2026, 10:30 AM",
                    doctor: "Dr. Sheela B R",
                    visitType: "Follow-up",
                    status: "scheduled",
                    createdAt: "2026-04-24T05:00:00.000Z"
                }
            ],
            procedures: []
        },
        {
            id: "svc-003",
            planId: "plan-001",
            treatment: "Scaling & Polishing",
            toothFdi: "full-mouth",
            toothLabel: "Full Mouth",
            surfaces: [],
            rate: 1500,
            discount: 0,
            amount: 1500,
            status: "planned",
            sittings: [],
            procedures: []
        }
    ]
};
const WISDOM_TOOTH_PLAN = {
    id: "plan-002",
    name: "Wisdom Tooth Removal",
    patientId: "apt-1",
    createdAt: "2026-04-05",
    updatedAt: "2026-04-05",
    status: "draft",
    notes: "All four wisdom teeth — patient wants elective removal.",
    services: [
        {
            id: "svc-004",
            planId: "plan-002",
            treatment: "Wisdom Tooth Removal",
            toothFdi: "18",
            toothLabel: "Upper Right Third Molar",
            surfaces: [],
            rate: 5000,
            discount: 0,
            amount: 5000,
            status: "planned",
            sittings: [],
            procedures: []
        },
        {
            id: "svc-005",
            planId: "plan-002",
            treatment: "Wisdom Tooth Removal",
            toothFdi: "28",
            toothLabel: "Upper Left Third Molar",
            surfaces: [],
            rate: 5000,
            discount: 0,
            amount: 5000,
            status: "planned",
            sittings: [],
            procedures: []
        },
        {
            id: "svc-006",
            planId: "plan-002",
            treatment: "Wisdom Tooth Removal",
            toothFdi: "38",
            toothLabel: "Lower Left Third Molar",
            surfaces: [],
            rate: 5000,
            discount: 0,
            amount: 5000,
            status: "planned",
            sittings: [],
            procedures: []
        },
        {
            id: "svc-007",
            planId: "plan-002",
            treatment: "Wisdom Tooth Removal",
            toothFdi: "48",
            toothLabel: "Lower Right Third Molar",
            surfaces: [],
            rate: 5000,
            discount: 0,
            amount: 5000,
            status: "planned",
            sittings: [],
            procedures: []
        }
    ]
};
const CROWN_REPLACEMENT_PLAN = {
    id: "plan-003",
    name: "Crown Replacement",
    patientId: "apt-1",
    createdAt: "2026-02-10",
    updatedAt: "2026-03-20",
    status: "completed",
    services: [
        {
            id: "svc-008",
            planId: "plan-003",
            treatment: "Crown (PFM)",
            toothFdi: "26",
            toothLabel: "Upper Left First Molar",
            surfaces: [
                "occlusal",
                "buccal"
            ],
            rate: 6000,
            discount: 500,
            amount: 5500,
            status: "completed",
            startedAt: "2026-02-15",
            completedAt: "2026-03-20",
            sittings: [
                {
                    id: "sit-003",
                    date: "15 Feb 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Tooth preparation, impression taken"
                },
                {
                    id: "sit-004",
                    date: "20 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "PFM crown cemented, occlusion checked"
                }
            ],
            procedures: [
                {
                    id: "proc-004",
                    name: "Tooth preparation",
                    date: "15 Feb 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-005",
                    name: "Impression & temporary crown",
                    date: "15 Feb 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-006",
                    name: "PFM crown cementation",
                    date: "20 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                }
            ]
        }
    ]
};
// ─── apt-6: Anjali Patel — active / scheduled plans (demo) ─────────────────
const ANJALI_ESTIMATE_PLAN_1 = {
    id: "plan-anjali-001",
    name: "Smile Rehabilitation Plan",
    patientId: "apt-6",
    createdAt: "2026-04-08",
    updatedAt: "2026-04-10",
    status: "draft",
    notes: "Prioritize aesthetic + sensitivity concerns for upper anteriors.",
    services: [
        {
            id: "svc-new-001",
            planId: "plan-anjali-001",
            treatment: "Veneers",
            toothFdi: "11",
            toothLabel: "Upper Right Central Incisor",
            surfaces: [
                "buccal",
                "mesial"
            ],
            rate: 7500,
            discount: 500,
            amount: 7000,
            status: "planned",
            sittings: [],
            procedures: []
        },
        {
            id: "svc-new-002",
            planId: "plan-anjali-001",
            treatment: "Veneers",
            toothFdi: "21",
            toothLabel: "Upper Left Central Incisor",
            surfaces: [
                "buccal",
                "distal"
            ],
            rate: 7500,
            discount: 500,
            amount: 7000,
            status: "planned",
            sittings: [],
            procedures: []
        },
        {
            id: "svc-new-003",
            planId: "plan-anjali-001",
            treatment: "Scaling & Polishing",
            toothFdi: "full-mouth",
            toothLabel: "Full Mouth",
            surfaces: [],
            rate: 1800,
            discount: 0,
            amount: 1800,
            status: "planned",
            sittings: [],
            procedures: []
        }
    ]
};
const ANJALI_ESTIMATE_PLAN_2 = {
    id: "plan-anjali-002",
    name: "Quadrant Stabilization",
    patientId: "apt-6",
    createdAt: "2026-04-06",
    updatedAt: "2026-04-11",
    status: "active",
    notes: "Address caries/restorations in lower left quadrant first.",
    services: [
        {
            id: "svc-new-004",
            planId: "plan-anjali-002",
            treatment: "Restoration (Composite Filling)",
            toothFdi: "36",
            toothLabel: "Lower Left First Molar",
            surfaces: [
                "occlusal",
                "distal"
            ],
            rate: 2400,
            discount: 200,
            amount: 2200,
            status: "planned",
            sittings: [],
            procedures: []
        },
        {
            id: "svc-new-005",
            planId: "plan-anjali-002",
            treatment: "Root Canal Treatment",
            toothFdi: "37",
            toothLabel: "Lower Left Second Molar",
            surfaces: [
                "occlusal",
                "root"
            ],
            rate: 8200,
            discount: 700,
            amount: 7500,
            status: "planned",
            sittings: [],
            procedures: []
        }
    ]
};
const ANJALI_IN_PROGRESS_PLAN = {
    id: "plan-anjali-003",
    name: "Pain Relief and Core Build-up",
    patientId: "apt-6",
    createdAt: "2026-03-30",
    updatedAt: "2026-04-14",
    status: "in-progress",
    notes: "Pain reduced after first two sittings; proceed with core build-up.",
    services: [
        {
            id: "svc-new-006",
            planId: "plan-anjali-003",
            treatment: "Root Canal Treatment",
            toothFdi: "46",
            toothLabel: "Lower Right First Molar",
            surfaces: [
                "occlusal",
                "root"
            ],
            rate: 8500,
            discount: 500,
            amount: 8000,
            status: "in-progress",
            startedAt: "2026-04-01",
            sittings: [],
            appointments: [
                {
                    id: "appt-new-001",
                    date: "14 Apr 2026",
                    time: "11:15 AM",
                    doctor: "Dr. Sheela B R",
                    notes: "Review and obturation planning"
                },
                {
                    id: "appt-new-003",
                    date: "18 Apr 2026",
                    time: "10:30 AM",
                    doctor: "Dr. Sheela B R",
                    notes: "Master cone trial and final obturation"
                }
            ],
            consultations: [
                {
                    id: "cons-appt-new-001",
                    endedAt: "2026-04-15T08:16:00",
                    source: "appointment",
                    appointmentId: "appt-new-001",
                    summaryText: [
                        "Symptoms: Lingering cold and soreness on biting localized to the lower right first molar (46).",
                        "Examination: Access reopened under rubber dam; temporary restoration removed; percussion ++; palpation WNL; canals patent.",
                        "Tooth: Lower Right First Molar (T46) · MB, ML, and D canals negotiated to working length; glide path with #15 K-file; copious 2.5% NaOCl irrigation; calcium hydroxide intracanal medicament; Cavit temporary seal.",
                        "Diagnosis: Previously treated root canal with asymptomatic apical periodontitis (46).",
                        "Lab investigation: Periapical radiograph — periapical radiolucency at 46; no vertical fracture line.",
                        "Medication: Ibuprofen 400mg SOS for post-visit soreness.",
                        "Advice: Soft diet on the right side; return for master cone trial, obturation, and core build-up planning."
                    ].join("\n")
                }
            ],
            procedures: [
                {
                    id: "proc-new-001",
                    name: "Access opening",
                    date: "1 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Pulp chamber opened",
                    status: "completed"
                },
                {
                    id: "proc-new-002",
                    name: "Working length determination",
                    date: "5 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-new-003",
                    name: "Temporary restoration",
                    date: "12 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "in-progress"
                }
            ]
        },
        {
            id: "svc-new-007",
            planId: "plan-anjali-003",
            treatment: "Restoration (Composite Filling)",
            toothFdi: "45",
            toothLabel: "Lower Right Second Premolar",
            surfaces: [
                "buccal",
                "occlusal"
            ],
            rate: 2600,
            discount: 100,
            amount: 2500,
            status: "in-progress",
            startedAt: "2026-04-09",
            sittings: [
                {
                    id: "sit-new-004",
                    date: "9 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Caries excavation and base placement"
                }
            ],
            appointments: [
                {
                    id: "appt-new-002",
                    date: "16 Apr 2026",
                    time: "03:45 PM",
                    doctor: "Dr. Sheela B R",
                    notes: "Composite finishing"
                }
            ],
            procedures: [
                {
                    id: "proc-new-004",
                    name: "Shade selection",
                    date: "9 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "in-progress"
                }
            ]
        }
    ]
};
const ANJALI_COMPLETED_PLAN = {
    id: "plan-anjali-004",
    name: "Posterior Crown Completion",
    patientId: "apt-6",
    createdAt: "2026-02-18",
    updatedAt: "2026-03-28",
    status: "completed",
    notes: "Patient comfortable with final bite. Review after 3 months.",
    services: [
        {
            id: "svc-new-008",
            planId: "plan-anjali-004",
            treatment: "Crown (Zirconia)",
            toothFdi: "26",
            toothLabel: "Upper Left First Molar",
            surfaces: [
                "occlusal",
                "buccal",
                "lingual"
            ],
            rate: 9200,
            discount: 1200,
            amount: 8000,
            status: "completed",
            startedAt: "2026-02-20",
            completedAt: "2026-03-18",
            notes: "Final zirconia crown seated with proper proximal contact.",
            sittings: [
                {
                    id: "sit-new-005",
                    date: "20 Feb 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Preparation + digital scan"
                },
                {
                    id: "sit-new-006",
                    date: "5 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Try-in and occlusal adjustments"
                },
                {
                    id: "sit-new-007",
                    date: "18 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Final cementation and polishing"
                }
            ],
            procedures: [
                {
                    id: "proc-new-005",
                    name: "Tooth preparation",
                    date: "20 Feb 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-new-006",
                    name: "Digital impression",
                    date: "20 Feb 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-new-007",
                    name: "Zirconia try-in",
                    date: "5 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-new-008",
                    name: "Final crown cementation",
                    date: "18 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Occlusion verified",
                    status: "completed"
                }
            ]
        }
    ]
};
function getMockPlans(patientId) {
    if (patientId === "apt-1") {
        return [
            PRIMARY_CARE_PLAN,
            WISDOM_TOOTH_PLAN,
            CROWN_REPLACEMENT_PLAN
        ];
    }
    if (patientId === "apt-6") {
        return [
            ANJALI_ESTIMATE_PLAN_1,
            ANJALI_ESTIMATE_PLAN_2,
            ANJALI_IN_PROGRESS_PLAN,
            ANJALI_COMPLETED_PLAN
        ];
    }
    // First-visit patients (e.g. Ria Kapoor) and others — no plans until created
    return [];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/plan/plan-context.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanProvider",
    ()=>PlanProvider,
    "usePlanContext",
    ()=>usePlanContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-snackbar.jsx [app-client] (ecmascript)");
/**
 * plan-context.tsx — React context + useReducer for treatment plan state.
 *
 * Provides: state, dispatch, and derived selectors (estimatePlans,
 * inProgressPlans, completedPlans, activePlan).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$consultation$2d$queue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/plan-consultation-queue.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/plan-procedures-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/plan-types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/plan-mock-data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
// ─── Reducer ────────────────────────────────────────────────
function planReducer(state, action) {
    switch(action.type){
        // ── Plan CRUD ────────────────────────────────────────
        case "ADD_PLAN":
            return {
                ...state,
                plans: [
                    ...state.plans,
                    action.plan
                ]
            };
        case "UPDATE_PLAN":
            return {
                ...state,
                plans: state.plans.map((p)=>p.id === action.planId ? {
                        ...p,
                        ...action.patch,
                        updatedAt: new Date().toISOString().slice(0, 10)
                    } : p)
            };
        case "DELETE_PLAN":
            return {
                ...state,
                plans: state.plans.filter((p)=>p.id !== action.planId)
            };
        case "DUPLICATE_PLAN":
            {
                const source = state.plans.find((p)=>p.id === action.planId);
                if (!source) return state;
                const newPlanId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["genId"])("plan");
                const dup = {
                    ...source,
                    id: newPlanId,
                    name: `${source.name} (Copy)`,
                    status: "draft",
                    createdAt: new Date().toISOString().slice(0, 10),
                    updatedAt: new Date().toISOString().slice(0, 10),
                    services: source.services.map((s)=>({
                            ...s,
                            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["genId"])("svc"),
                            planId: newPlanId,
                            status: "planned",
                            surfaces: [
                                ...s.surfaces
                            ],
                            sittings: [],
                            procedures: [],
                            appointments: [],
                            consultations: [],
                            startedAt: undefined,
                            completedAt: undefined
                        }))
                };
                return {
                    ...state,
                    plans: [
                        ...state.plans,
                        dup
                    ]
                };
            }
        // ── Plan lifecycle ───────────────────────────────────
        case "ACTIVATE_PLAN":
            return {
                ...state,
                plans: state.plans.map((p)=>{
                    if (p.id === action.planId) return {
                        ...p,
                        status: "active"
                    };
                    // Demote any current active → draft
                    if (p.status === "active") return {
                        ...p,
                        status: "draft"
                    };
                    return p;
                })
            };
        case "START_TREATMENT":
            return {
                ...state,
                plans: state.plans.map((p)=>{
                    if (p.id !== action.planId) return p;
                    if (p.status !== "draft" && p.status !== "active") return p;
                    const now = new Date().toISOString().slice(0, 10);
                    return {
                        ...p,
                        status: "in-progress",
                        updatedAt: now,
                        services: p.services.map((s)=>({
                                ...s,
                                status: "planned",
                                startedAt: undefined
                            }))
                    };
                })
            };
        case "REVERT_PLAN_TO_ESTIMATES":
            return {
                ...state,
                plans: state.plans.map((p)=>{
                    if (p.id !== action.planId) return p;
                    if (p.status !== "in-progress") return p;
                    return {
                        ...p,
                        status: "draft",
                        updatedAt: new Date().toISOString().slice(0, 10),
                        services: p.services.map((s)=>({
                                ...s,
                                status: "planned",
                                startedAt: undefined,
                                completedAt: undefined,
                                sittings: [],
                                procedures: [],
                                appointments: [],
                                consultations: []
                            }))
                    };
                })
            };
        case "MARK_PLAN_COMPLETED":
            {
                const now = new Date().toISOString().slice(0, 10);
                return {
                    ...state,
                    plans: state.plans.map((p)=>{
                        if (p.id !== action.planId) return p;
                        return {
                            ...p,
                            status: "completed",
                            updatedAt: now,
                            services: p.services.map((s)=>({
                                    ...s,
                                    status: "completed",
                                    completedAt: s.completedAt ?? now
                                }))
                        };
                    })
                };
            }
        case "REVERT_PLAN_TO_PROGRESS":
            return {
                ...state,
                plans: state.plans.map((p)=>{
                    if (p.id !== action.planId) return p;
                    if (p.status !== "completed") return p;
                    return {
                        ...p,
                        status: "in-progress",
                        updatedAt: new Date().toISOString().slice(0, 10),
                        services: p.services.map((s)=>({
                                ...s,
                                status: "in-progress",
                                completedAt: undefined
                            }))
                    };
                })
            };
        // ── Service CRUD ─────────────────────────────────────
        case "ADD_SERVICE":
            return {
                ...state,
                plans: state.plans.map((p)=>p.id === action.planId ? {
                        ...p,
                        services: [
                            ...p.services,
                            action.service
                        ],
                        updatedAt: new Date().toISOString().slice(0, 10)
                    } : p)
            };
        case "UPDATE_SERVICE":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                ...action.patch
                            } : s)
                    }))
            };
        case "APPEND_SERVICE_CONSULTATION":
            {
                const now = new Date().toISOString().slice(0, 10);
                const { serviceId, consultation } = action;
                return {
                    ...state,
                    plans: state.plans.map((p)=>({
                            ...p,
                            services: p.services.map((s)=>{
                                if (s.id !== serviceId) return s;
                                const nextConsultations = [
                                    ...s.consultations ?? [],
                                    consultation
                                ];
                                const next = {
                                    ...s,
                                    consultations: nextConsultations
                                };
                                if (s.status === "planned") {
                                    return {
                                        ...next,
                                        status: "in-progress",
                                        startedAt: s.startedAt ?? now
                                    };
                                }
                                return next;
                            })
                        }))
                };
            }
        case "REMOVE_SERVICE_CONSULTATION":
            {
                const { serviceId, consultationId } = action;
                return {
                    ...state,
                    plans: state.plans.map((p)=>({
                            ...p,
                            services: p.services.map((s)=>s.id !== serviceId ? s : {
                                    ...s,
                                    consultations: (s.consultations ?? []).filter((c)=>c.id !== consultationId)
                                })
                        }))
                };
            }
        case "REMOVE_SERVICE":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.filter((s)=>s.id !== action.serviceId)
                    }))
            };
        case "MARK_SERVICE_COMPLETED":
            {
                const now = new Date().toISOString().slice(0, 10);
                const newPlans = state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                status: "completed",
                                completedAt: now
                            } : s)
                    }));
                return {
                    ...state,
                    plans: newPlans
                };
            }
        case "REVERT_SERVICE_TO_PROGRESS":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                status: "in-progress",
                                completedAt: undefined
                            } : s)
                    }))
            };
        // ── Sittings & procedures ────────────────────────────
        case "ADD_SITTING":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                status: s.status === "planned" ? "in-progress" : s.status,
                                sittings: [
                                    ...s.sittings,
                                    action.sitting
                                ],
                                // Procedures recorded in the quick visit also join the
                                // service's procedure history so they surface in the
                                // timeline and bill (story stays connected).
                                procedures: action.procedures && action.procedures.length ? [
                                    ...s.procedures,
                                    ...action.procedures
                                ] : s.procedures
                            } : s)
                    }))
            };
        case "UPDATE_SITTING":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                sittings: s.sittings.map((sit)=>sit.id === action.sittingId ? {
                                        ...sit,
                                        ...action.patch
                                    } : sit)
                            } : s)
                    }))
            };
        case "REMOVE_SITTING":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                sittings: s.sittings.filter((sit)=>sit.id !== action.sittingId)
                            } : s)
                    }))
            };
        case "ADD_SUB_PROCEDURE":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                status: s.status === "planned" ? "in-progress" : s.status,
                                procedures: [
                                    ...s.procedures,
                                    action.procedure
                                ]
                            } : s)
                    }))
            };
        case "UPDATE_SUB_PROCEDURE":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                procedures: s.procedures.map((proc)=>proc.id === action.procedureId ? {
                                        ...proc,
                                        ...action.patch
                                    } : proc)
                            } : s)
                    }))
            };
        case "REMOVE_SUB_PROCEDURE":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                procedures: s.procedures.filter((proc)=>proc.id !== action.procedureId)
                            } : s)
                    }))
            };
        case "ADD_APPOINTMENT":
            // Note: adding an appointment does NOT change the service status.
            // Status only transitions to "in-progress" when a sitting or
            // procedure is recorded. Scheduling a visit is intent, not activity.
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                appointments: [
                                    ...s.appointments ?? [],
                                    action.appointment
                                ]
                            } : s)
                    }))
            };
        case "UPDATE_APPOINTMENT":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                appointments: (s.appointments ?? []).map((appt)=>appt.id === action.appointmentId ? {
                                        ...appt,
                                        ...action.patch
                                    } : appt)
                            } : s)
                    }))
            };
        case "REMOVE_APPOINTMENT":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                appointments: (s.appointments ?? []).filter((appt)=>appt.id !== action.appointmentId)
                            } : s)
                    }))
            };
        // ── Drawer ───────────────────────────────────────────
        case "SET_DRAWER":
            return {
                ...state,
                drawer: action.drawer
            };
        default:
            return state;
    }
}
const PlanContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function usePlanContext() {
    _s();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PlanContext);
    if (!ctx) throw new Error("usePlanContext must be used within PlanProvider");
    return ctx;
}
_s(usePlanContext, "/dMy7t63NXD4eYACoT93CePwGrg=");
function PlanProvider({ patientId, children, onNavigateTab, initialDrawer, embedInPatientShell = false }) {
    _s1();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(planReducer, {
        plans: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMockPlans"])(patientId),
        drawer: initialDrawer ?? {
            type: "closed"
        }
    });
    const [snackbar, setSnackbar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        message: ""
    });
    const showSnackbar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlanProvider.useCallback[showSnackbar]": (message)=>{
            if (!message) return;
            setSnackbar({
                open: true,
                message
            });
        }
    }["PlanProvider.useCallback[showSnackbar]"], []);
    const closeSnackbar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlanProvider.useCallback[closeSnackbar]": ()=>setSnackbar({
                "PlanProvider.useCallback[closeSnackbar]": (s)=>({
                        ...s,
                        open: false
                    })
            }["PlanProvider.useCallback[closeSnackbar]"])
    }["PlanProvider.useCallback[closeSnackbar]"], []);
    const estimatePlans = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[estimatePlans]": ()=>state.plans.filter({
                "PlanProvider.useMemo[estimatePlans]": (p)=>p.status === "draft" || p.status === "active"
            }["PlanProvider.useMemo[estimatePlans]"])
    }["PlanProvider.useMemo[estimatePlans]"], [
        state.plans
    ]);
    const inProgressPlans = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[inProgressPlans]": ()=>state.plans.filter({
                "PlanProvider.useMemo[inProgressPlans]": (p)=>p.status === "in-progress"
            }["PlanProvider.useMemo[inProgressPlans]"])
    }["PlanProvider.useMemo[inProgressPlans]"], [
        state.plans
    ]);
    const completedPlans = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[completedPlans]": ()=>state.plans.filter({
                "PlanProvider.useMemo[completedPlans]": (p)=>p.status === "completed"
            }["PlanProvider.useMemo[completedPlans]"])
    }["PlanProvider.useMemo[completedPlans]"], [
        state.plans
    ]);
    const activePlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[activePlan]": ()=>state.plans.find({
                "PlanProvider.useMemo[activePlan]": (p)=>p.status === "active"
            }["PlanProvider.useMemo[activePlan]"])
    }["PlanProvider.useMemo[activePlan]"], [
        state.plans
    ]);
    const findPlanForService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[findPlanForService]": ()=>({
                "PlanProvider.useMemo[findPlanForService]": (serviceId)=>state.plans.find({
                        "PlanProvider.useMemo[findPlanForService]": (p)=>p.services.some({
                                "PlanProvider.useMemo[findPlanForService]": (s)=>s.id === serviceId
                            }["PlanProvider.useMemo[findPlanForService]"])
                    }["PlanProvider.useMemo[findPlanForService]"])
            })["PlanProvider.useMemo[findPlanForService]"]
    }["PlanProvider.useMemo[findPlanForService]"], [
        state.plans
    ]);
    const findService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[findService]": ()=>({
                "PlanProvider.useMemo[findService]": (serviceId)=>{
                    for (const p of state.plans){
                        const svc = p.services.find({
                            "PlanProvider.useMemo[findService].svc": (s)=>s.id === serviceId
                        }["PlanProvider.useMemo[findService].svc"]);
                        if (svc) return svc;
                    }
                    return undefined;
                }
            })["PlanProvider.useMemo[findService]"]
    }["PlanProvider.useMemo[findService]"], [
        state.plans
    ]);
    const openDrawer = (drawer)=>dispatch({
            type: "SET_DRAWER",
            drawer
        });
    const closeDrawer = ()=>dispatch({
            type: "SET_DRAWER",
            drawer: {
                type: "closed"
            }
        });
    // Publish recorded procedures so Past Visits / Patient Detail Rx can surface
    // them (the treatment plan is the source of truth for "what was done").
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlanProvider.useEffect": ()=>{
            const toothLabelFor = {
                "PlanProvider.useEffect.toothLabelFor": (svc)=>{
                    const fdis = svc.toothFdis && svc.toothFdis.length > 0 ? svc.toothFdis : svc.toothFdi ? [
                        svc.toothFdi
                    ] : [];
                    if (fdis.length === 0) return svc.toothLabel || "";
                    if (fdis[0] === "full-mouth") return "Full Mouth";
                    if (fdis.length === 1) return `${svc.toothLabel || ""} (T${fdis[0]})`.trim();
                    return `${svc.toothLabel || `${fdis.length} teeth`} (${fdis.map({
                        "PlanProvider.useEffect.toothLabelFor": (f)=>`T${f}`
                    }["PlanProvider.useEffect.toothLabelFor"]).join(", ")})`;
                }
            }["PlanProvider.useEffect.toothLabelFor"];
            const out = [];
            for (const p of state.plans){
                for (const svc of p.services){
                    const fdis = svc.toothFdis && svc.toothFdis.length > 0 ? svc.toothFdis : svc.toothFdi ? [
                        svc.toothFdi
                    ] : [];
                    for (const proc of svc.procedures ?? []){
                        out.push({
                            id: proc.id,
                            name: proc.name,
                            doctor: proc.doctor,
                            date: proc.date,
                            status: proc.status,
                            notes: proc.notes,
                            toothLabel: toothLabelFor(svc),
                            toothFdis: fdis,
                            treatment: svc.treatment,
                            planName: p.name
                        });
                    }
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePlanProcedures"])(patientId, out);
        }
    }["PlanProvider.useEffect"], [
        state.plans,
        patientId
    ]);
    const hasInProgressPlan = inProgressPlans.length > 0;
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[value]": ()=>({
                patientId,
                embedInPatientShell,
                state,
                dispatch,
                estimatePlans,
                inProgressPlans,
                completedPlans,
                activePlan,
                findPlanForService,
                findService,
                hasInProgressPlan,
                openDrawer,
                closeDrawer,
                navigateTab: onNavigateTab,
                showSnackbar,
                snackbar,
                closeSnackbar
            })
    }["PlanProvider.useMemo[value]"], [
        patientId,
        embedInPatientShell,
        state,
        estimatePlans,
        inProgressPlans,
        completedPlans,
        activePlan,
        findPlanForService,
        findService,
        hasInProgressPlan,
        onNavigateTab,
        showSnackbar,
        snackbar,
        closeSnackbar
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlanProvider.useEffect": ()=>{
            const key = `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$consultation$2d$queue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAN_CONSULTATION_QUEUE_PREFIX"]}${patientId || "apt-1"}`;
            const flush = {
                "PlanProvider.useEffect.flush": ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const raw = localStorage.getItem(key);
                    if (!raw) return;
                    let queue = [];
                    try {
                        queue = JSON.parse(raw);
                        if (!Array.isArray(queue) || queue.length === 0) return;
                    } catch  {
                        return;
                    }
                    localStorage.removeItem(key);
                    for (const item of queue){
                        if (!item || item.patientId !== patientId || !item.serviceId || !item.summaryText) continue;
                        dispatch({
                            type: "APPEND_SERVICE_CONSULTATION",
                            serviceId: item.serviceId,
                            consultation: {
                                id: item.id ?? `cns-${Date.now()}`,
                                endedAt: item.endedAt ?? new Date().toISOString(),
                                source: item.source === "appointment" ? "appointment" : "treatment-row",
                                appointmentId: item.appointmentId,
                                summaryText: item.summaryText
                            }
                        });
                    }
                }
            }["PlanProvider.useEffect.flush"];
            flush();
            window.addEventListener("storage", flush);
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$consultation$2d$queue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAN_CONSULTATION_FLUSH_EVENT"], flush);
            return ({
                "PlanProvider.useEffect": ()=>{
                    window.removeEventListener("storage", flush);
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$consultation$2d$queue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAN_CONSULTATION_FLUSH_EVENT"], flush);
                }
            })["PlanProvider.useEffect"];
        }
    }["PlanProvider.useEffect"], [
        patientId
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(PlanContext.Provider, {
        value: value,
        children: [
            children,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPSnackbar"], {
                open: snackbar.open,
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center"
                },
                autoHideDuration: 3000,
                severity: "success",
                message: snackbar.message,
                onClose: (_e, reason)=>{
                    if (reason === "clickaway") return;
                    closeSnackbar();
                }
            })
        ]
    });
}
_s1(PlanProvider, "R9z3xxfoNHaXeN0Pl1fRNy1uUlc=");
_c = PlanProvider;
var _c;
__turbopack_context__.k.register(_c, "PlanProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/plan/plan-shared.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClipboardTickIcon",
    ()=>ClipboardTickIcon,
    "CloseSquareIcon",
    ()=>CloseSquareIcon,
    "DrawerHeader",
    ()=>DrawerHeader,
    "EmptyState",
    ()=>EmptyState,
    "PLAN_DRAWER_PANEL_CLASS",
    ()=>PLAN_DRAWER_PANEL_CLASS,
    "PLAN_DRAWER_WIDE_PANEL_CLASS",
    ()=>PLAN_DRAWER_WIDE_PANEL_CLASS,
    "PLAN_DRAWER_XWIDE_PANEL_CLASS",
    ()=>PLAN_DRAWER_XWIDE_PANEL_CLASS,
    "PlanEmptyIcon",
    ()=>PlanEmptyIcon,
    "PlanSurfaceAbbrTags",
    ()=>PlanSurfaceAbbrTags,
    "SectionFrame",
    ()=>SectionFrame,
    "TabPill",
    ()=>TabPill,
    "buildConsultationRxUrl",
    ()=>buildConsultationRxUrl,
    "buildPlanRxReturnPath",
    ()=>buildPlanRxReturnPath,
    "computePlanDiscount",
    ()=>computePlanDiscount,
    "computePlanTotal",
    ()=>computePlanTotal,
    "formatINR",
    ()=>formatINR,
    "getPlanCompletionStatus",
    ()=>getPlanCompletionStatus,
    "getServiceWorkflowStatus",
    ()=>getServiceWorkflowStatus,
    "serviceToothDisplay",
    ()=>serviceToothDisplay,
    "serviceToothFdis",
    ()=>serviceToothFdis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
/**
 * plan-shared.tsx — Shared sub-components for the Treatment Plan module.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tooltip.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/dental/dental-ui.module.scss [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$context$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/plan-context.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/plan-types.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const PLAN_DRAWER_PANEL_CLASS = "!gap-0 !rounded-none !min-h-0 !w-[min(100vw,600px)] !max-w-[600px] sm:!w-[600px] sm:!max-w-[600px]";
const PLAN_DRAWER_WIDE_PANEL_CLASS = "!gap-0 !rounded-none !min-h-0 !w-[min(100vw,880px)] !max-w-[880px] sm:!w-[880px] sm:!max-w-[880px]";
const PLAN_DRAWER_XWIDE_PANEL_CLASS = "!gap-0 !rounded-none !min-h-0 !w-[80vw] !max-w-[80vw] sm:!w-[80vw] sm:!max-w-[80vw]";
const PLAN_SURFACE_CHIP_CLASS = "inline-flex h-[18px] cursor-default items-center rounded-[4px] px-[5px] font-['Inter',sans-serif] text-[12px] font-bold text-white tabular-nums outline-none transition-[filter] duration-150 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-blue-500/45 focus-visible:ring-offset-1";
function PlanSurfaceAbbrTags({ surfaces, gapClass = "gap-[3px]", wrap = false }) {
    if (!surfaces?.length) return null;
    const rowClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(wrap ? "flex flex-wrap items-center" : "flex items-center", gapClass);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: rowClass,
        children: surfaces.map((z, i)=>{
            const label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPlanSurfaceLabel"])(z);
            const abbr = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SURFACE_ABBR"][z] ?? (typeof z === "string" ? z.charAt(0).toUpperCase() : "?");
            const bg = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SURFACE_COLORS"][z] ?? "#94a3b8";
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                delayDuration: 200,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                        asChild: true,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            tabIndex: 0,
                            className: PLAN_SURFACE_CHIP_CLASS,
                            style: {
                                background: bg
                            },
                            children: abbr
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                        side: "top",
                        sideOffset: 6,
                        children: label
                    })
                ]
            }, `${String(z)}-${i}`);
        })
    });
}
_c = PlanSurfaceAbbrTags;
function formatINR(amount) {
    return `₹${amount.toLocaleString("en-IN")}`;
}
function TabPill({ label, count, active, onClick }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
        type: "button",
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabPill, active && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabPillActive),
        children: [
            label,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabPillCount, active && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabPillCountActive),
                children: count
            })
        ]
    });
}
_c1 = TabPill;
function SectionFrame({ children, className }) {
    _s();
    const { embedInPatientShell } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$context$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanContext"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionFrame, embedInPatientShell && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionFrameEmbed, className),
        children: children
    });
}
_s(SectionFrame, "hFiSX4LeO+9ZID1xAMKnamUgIeo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$context$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanContext"]
    ];
});
_c2 = SectionFrame;
function EmptyState({ icon, title, description, action }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyIcon,
                children: icon
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyTitle,
                        children: title
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyDesc,
                        children: description
                    })
                ]
            }),
            action && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyAction,
                children: action
            })
        ]
    });
}
_c3 = EmptyState;
function PlanEmptyIcon({ size = 112, className }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 80 80",
        fill: "none",
        "aria-hidden": true,
        className: className,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M71.9803 14.6484H9.57474C8.73282 14.649 7.92552 14.9836 7.33019 15.579C6.73486 16.1743 6.40018 16.9816 6.39966 17.8235V75.0812C6.40018 75.9231 6.73486 76.7304 7.33019 77.3258C7.92552 77.9211 8.73282 78.2558 9.57474 78.2563H71.9803C72.8223 78.2559 73.6297 77.9212 74.2251 77.3259C74.8205 76.7305 75.1552 75.9232 75.1557 75.0812V17.8235C75.1552 16.9815 74.8205 16.1742 74.2251 15.5789C73.6297 14.9835 72.8223 14.6489 71.9803 14.6484Z",
                fill: "#C8CED6"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M67.8722 58.3622H13.6836C11.9302 58.3622 10.5085 56.9406 10.5085 55.1871V4.59696C10.5085 2.84351 11.9302 1.42188 13.6836 1.42188H67.8722C69.6256 1.42188 71.0472 2.84351 71.0472 4.59696V55.1871C71.0472 56.9406 69.6256 58.3622 67.8722 58.3622Z",
                fill: "#FFFFFF"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M61.2048 12.1094H20.3513V14.4376H61.2048V12.1094ZM61.2048 20.9992H20.3513V23.3274H61.2048V20.9992ZM61.2048 29.891H20.3513V32.2192H61.2048V29.891ZM61.2048 38.7808H20.3513V41.1094H61.2048V38.7808Z",
                fill: "#E4E7EB"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M25.2197 31.2656L35.4856 41.5319H25.2197V31.2656Z",
                fill: "#B9C0CA"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M75.1559 42.3779V18.7573L71.0474 14.6484V42.3776H75.1559V42.3779Z",
                fill: "#B9C0CA"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M79.9682 44.5123L75.5416 75.8474C75.3203 77.4139 73.9796 78.5782 72.3977 78.5782H9.15767C7.57571 78.5782 6.23505 77.4139 6.01374 75.8474L0.0317719 33.5061C-0.238064 31.5946 1.24521 29.8867 3.17571 29.8867H22.7055C24.2875 29.8867 25.6282 31.051 25.8495 32.6172L26.6334 38.1621C26.8547 39.7287 28.1954 40.8929 29.7773 40.8929H76.8249C78.7547 40.8929 80.2383 42.6008 79.9685 44.5123H79.9682Z",
                fill: "#DEE3EA"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M64.2844 64.6016H17.2716C17.0139 64.6015 16.7651 64.5074 16.5718 64.337C16.3785 64.1667 16.2539 63.9316 16.2214 63.676L15.6332 59.0189C15.6145 58.87 15.6278 58.7187 15.672 58.5752C15.7162 58.4317 15.7904 58.2993 15.8897 58.1867C15.9891 58.0741 16.1112 57.9839 16.248 57.922C16.3848 57.8602 16.5333 57.8282 16.6834 57.8281H64.8726C65.0227 57.8282 65.1711 57.8602 65.308 57.922C65.4448 57.9839 65.5669 58.0741 65.6662 58.1867C65.7655 58.2993 65.8398 58.4316 65.884 58.5752C65.9282 58.7187 65.9414 58.87 65.9227 59.0189L65.3345 63.676C65.3021 63.9316 65.1775 64.1667 64.9842 64.337C64.7909 64.5074 64.5421 64.6015 64.2844 64.6016Z",
                fill: "#CCD2DB"
            })
        ]
    });
}
_c4 = PlanEmptyIcon;
function ClipboardTickIcon({ size = 24, className }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                opacity: "0.4",
                d: "M16.24 3.65039H7.76004C5.29004 3.65039 3.29004 5.66039 3.29004 8.12039V17.5304C3.29004 19.9904 5.30004 22.0004 7.76004 22.0004H16.23C18.7 22.0004 20.7 19.9904 20.7 17.5304V8.12039C20.71 5.65039 18.7 3.65039 16.24 3.65039Z"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M14.3498 2H9.64977C8.60977 2 7.75977 2.84 7.75977 3.88V4.82C7.75977 5.86 8.59977 6.7 9.63977 6.7H14.3498C15.3898 6.7 16.2298 5.86 16.2298 4.82V3.88C16.2398 2.84 15.3898 2 14.3498 2Z"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M10.81 16.9506C10.62 16.9506 10.43 16.8806 10.28 16.7306L8.78 15.2306C8.49 14.9406 8.49 14.4606 8.78 14.1706C9.07 13.8806 9.55 13.8806 9.84 14.1706L10.81 15.1406L14.28 11.6706C14.57 11.3806 15.05 11.3806 15.34 11.6706C15.63 11.9606 15.63 12.4406 15.34 12.7306L11.34 16.7306C11.2 16.8806 11 16.9506 10.81 16.9506Z"
            })
        ]
    });
}
_c5 = ClipboardTickIcon;
function CloseSquareIcon({ size = 24, color = "var(--tp-slate-700)" }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: color,
        xmlns: "http://www.w3.org/2000/svg",
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z"
        })
    });
}
_c6 = CloseSquareIcon;
function DrawerHeader({ title, onClose, action, titleClassName }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerHeader,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                type: "button",
                onClick: onClose,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerCloseBtn,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CloseSquareIcon, {
                    size: 24,
                    color: "var(--tp-slate-700)"
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerDivider
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h2", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerTitle, titleClassName),
                children: title
            }),
            action && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerAction,
                children: action
            })
        ]
    });
}
_c7 = DrawerHeader;
function computePlanTotal(services) {
    return services.reduce((sum, s)=>sum + s.amount, 0);
}
function serviceToothFdis(service) {
    if (service.toothFdis && service.toothFdis.length > 0) return service.toothFdis;
    return service.toothFdi ? [
        service.toothFdi
    ] : [];
}
function serviceToothDisplay(service) {
    const fdis = serviceToothFdis(service);
    if (fdis.length === 0) return "—";
    if (fdis.length === 1) return fdis[0] === "full-mouth" ? "Full" : `T${fdis[0]}`;
    return fdis.map((f)=>f === "full-mouth" ? "Full" : `T${f}`).join(", ");
}
function computePlanDiscount(services) {
    return services.reduce((sum, s)=>sum + s.discount, 0);
}
function getServiceWorkflowStatus(service) {
    if (service.status === "completed") return "completed";
    if (service.status === "no-show") return "no-show";
    if (service.status === "not-interested") return "not-interested";
    if (service.status === "cancelled") return "cancelled";
    if (service.status === "in-progress") return "in-progress";
    // Booked appointments do NOT count as activity — scheduling a visit is
    // intent, not execution. Consultations (Rx / end visit), sittings, or
    // procedures count as activity for the workflow chip.
    const consultCount = service.consultations?.length ?? 0;
    const hasActivity = consultCount > 0 || service.sittings.length > 0 || service.procedures.length > 0;
    return hasActivity ? "in-progress" : "not-started";
}
function getPlanCompletionStatus(services) {
    if (services.length === 0) return "not-completed";
    const completedCount = services.filter((s)=>s.status === "completed").length;
    if (completedCount === 0) return "not-completed";
    if (completedCount === services.length) return "completed";
    return "partially-completed";
}
function buildPlanRxReturnPath(embedInPatientShell, patientId) {
    if (embedInPatientShell) {
        const q = new URLSearchParams({
            patientId,
            nav: "dental-plan",
            planTab: "progress"
        });
        return `/patient-detail?${q.toString()}`;
    }
    const q = new URLSearchParams({
        patientId,
        tab: "progress"
    });
    return `/treatment-plan?${q.toString()}`;
}
function buildConsultationRxUrl(patientId, planId, serviceId, appointmentId, embedInPatientShell, treatmentName) {
    const p = new URLSearchParams();
    p.set("patientId", patientId);
    p.set("planId", planId);
    p.set("serviceId", serviceId);
    if (appointmentId) p.set("appointmentId", appointmentId);
    p.set("returnTo", buildPlanRxReturnPath(embedInPatientShell, patientId));
    if (treatmentName) p.set("ctxTreatment", treatmentName);
    return `/rxpad?${p.toString()}`;
}
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "PlanSurfaceAbbrTags");
__turbopack_context__.k.register(_c1, "TabPill");
__turbopack_context__.k.register(_c2, "SectionFrame");
__turbopack_context__.k.register(_c3, "EmptyState");
__turbopack_context__.k.register(_c4, "PlanEmptyIcon");
__turbopack_context__.k.register(_c5, "ClipboardTickIcon");
__turbopack_context__.k.register(_c6, "CloseSquareIcon");
__turbopack_context__.k.register(_c7, "DrawerHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/dental-ui.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "drawerAction": "dental-ui-module-scss-module__Y0ODAq__drawerAction",
  "drawerCloseBtn": "dental-ui-module-scss-module__Y0ODAq__drawerCloseBtn",
  "drawerDivider": "dental-ui-module-scss-module__Y0ODAq__drawerDivider",
  "drawerHeader": "dental-ui-module-scss-module__Y0ODAq__drawerHeader",
  "drawerTitle": "dental-ui-module-scss-module__Y0ODAq__drawerTitle",
  "emptyAction": "dental-ui-module-scss-module__Y0ODAq__emptyAction",
  "emptyDesc": "dental-ui-module-scss-module__Y0ODAq__emptyDesc",
  "emptyIcon": "dental-ui-module-scss-module__Y0ODAq__emptyIcon",
  "emptyState": "dental-ui-module-scss-module__Y0ODAq__emptyState",
  "emptyTitle": "dental-ui-module-scss-module__Y0ODAq__emptyTitle",
  "planClusterHeaderActive": "dental-ui-module-scss-module__Y0ODAq__planClusterHeaderActive",
  "planClusterHeaderCompleted": "dental-ui-module-scss-module__Y0ODAq__planClusterHeaderCompleted",
  "planClusterHeaderEstimates": "dental-ui-module-scss-module__Y0ODAq__planClusterHeaderEstimates",
  "planClusterInnerSurface": "dental-ui-module-scss-module__Y0ODAq__planClusterInnerSurface",
  "planClusterShell": "dental-ui-module-scss-module__Y0ODAq__planClusterShell",
  "sectionFrame": "dental-ui-module-scss-module__Y0ODAq__sectionFrame",
  "sectionFrameEmbed": "dental-ui-module-scss-module__Y0ODAq__sectionFrameEmbed",
  "shellBackBtn": "dental-ui-module-scss-module__Y0ODAq__shellBackBtn",
  "shellBackRule": "dental-ui-module-scss-module__Y0ODAq__shellBackRule",
  "shellBody": "dental-ui-module-scss-module__Y0ODAq__shellBody",
  "shellHeader": "dental-ui-module-scss-module__Y0ODAq__shellHeader",
  "shellMain": "dental-ui-module-scss-module__Y0ODAq__shellMain",
  "shellNav": "dental-ui-module-scss-module__Y0ODAq__shellNav",
  "shellRoot": "dental-ui-module-scss-module__Y0ODAq__shellRoot",
  "shellSubtitle": "dental-ui-module-scss-module__Y0ODAq__shellSubtitle",
  "shellTitle": "dental-ui-module-scss-module__Y0ODAq__shellTitle",
  "shellTitleCol": "dental-ui-module-scss-module__Y0ODAq__shellTitleCol",
  "tabNavBtn": "dental-ui-module-scss-module__Y0ODAq__tabNavBtn",
  "tabNavCaret": "dental-ui-module-scss-module__Y0ODAq__tabNavCaret",
  "tabNavIconOff": "dental-ui-module-scss-module__Y0ODAq__tabNavIconOff",
  "tabNavIconOn": "dental-ui-module-scss-module__Y0ODAq__tabNavIconOn",
  "tabNavIconWrap": "dental-ui-module-scss-module__Y0ODAq__tabNavIconWrap",
  "tabNavLabel": "dental-ui-module-scss-module__Y0ODAq__tabNavLabel",
  "tabNavLabelOff": "dental-ui-module-scss-module__Y0ODAq__tabNavLabelOff",
  "tabNavLabelOn": "dental-ui-module-scss-module__Y0ODAq__tabNavLabelOn",
  "tabPill": "dental-ui-module-scss-module__Y0ODAq__tabPill",
  "tabPillActive": "dental-ui-module-scss-module__Y0ODAq__tabPillActive",
  "tabPillCount": "dental-ui-module-scss-module__Y0ODAq__tabPillCount",
  "tabPillCountActive": "dental-ui-module-scss-module__Y0ODAq__tabPillCountActive",
  "tpPageBackChevron": "dental-ui-module-scss-module__Y0ODAq__tpPageBackChevron",
  "tpPageBackIconWrap": "dental-ui-module-scss-module__Y0ODAq__tpPageBackIconWrap",
  "tpPageHeader": "dental-ui-module-scss-module__Y0ODAq__tpPageHeader",
  "tpPageHeaderRow": "dental-ui-module-scss-module__Y0ODAq__tpPageHeaderRow",
  "tpPageMain": "dental-ui-module-scss-module__Y0ODAq__tpPageMain",
  "tpPageTitle": "dental-ui-module-scss-module__Y0ODAq__tpPageTitle",
  "tpPageTitleArea": "dental-ui-module-scss-module__Y0ODAq__tpPageTitleArea",
  "tpTabBody": "dental-ui-module-scss-module__Y0ODAq__tpTabBody",
  "tpTabHeader": "dental-ui-module-scss-module__Y0ODAq__tpTabHeader",
  "tpTabHeaderEmbed": "dental-ui-module-scss-module__Y0ODAq__tpTabHeaderEmbed",
  "tpTabPills": "dental-ui-module-scss-module__Y0ODAq__tpTabPills",
  "tpTabRoot": "dental-ui-module-scss-module__Y0ODAq__tpTabRoot",
  "tpTabRootEmbed": "dental-ui-module-scss-module__Y0ODAq__tpTabRootEmbed",
});
}),
"[project]/components/dental/AddDentalBillItemDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddDentalBillItemDrawer",
    ()=>AddDentalBillItemDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowDown2.js [app-client] (ecmascript) <export default as ArrowDown2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowUp2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowUp2.js [app-client] (ecmascript) <export default as ArrowUp2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$InfoCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/InfoCircle.js [app-client] (ecmascript) <export default as InfoCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-drawer.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$shared$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/plan-shared.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/button-system/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/button-system/TPButton.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tooltip.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/billing-catalog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/billing-catalog-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/billing-settings/billing-settings.module.scss [app-client] (css module)");
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
function sanitizeDecimal(raw) {
    const cleaned = raw.replace(/[^\d.]/g, "");
    const firstDot = cleaned.indexOf(".");
    if (firstDot === -1) return cleaned;
    return cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "");
}
/**
 * Tooltip copy shown next to the drawer title — mirrors the shared-catalog
 * explainer from the main billing settings drawer, but worded for the
 * dental exam / treatment plan surface where this drawer is launched.
 */ function DentalServiceHelpContent() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-[8px] text-[12px] leading-[1.45] text-tp-slate-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-semibold text-tp-slate-900",
                children: "Shared billing catalog"
            }, void 0, false, {
                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-tp-slate-600",
                children: "After you save, this name and price can be picked again in the dental exam, treatment plan, and billing."
            }, void 0, false, {
                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-[4px] pl-[2px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex gap-[6px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": true,
                                className: "mt-[5px] h-[4px] w-[4px] shrink-0 rounded-full bg-tp-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-tp-slate-600",
                                children: [
                                    "Keep the name ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "font-semibold text-tp-slate-700",
                                        children: "short and easy to read"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                        lineNumber: 38,
                                        columnNumber: 27
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex gap-[6px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": true,
                                className: "mt-[5px] h-[4px] w-[4px] shrink-0 rounded-full bg-tp-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-tp-slate-600",
                                children: [
                                    "Use ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "font-semibold text-tp-slate-700",
                                        children: "accurate pricing"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                        lineNumber: 44,
                                        columnNumber: 17
                                    }, this),
                                    " so estimates stay consistent."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = DentalServiceHelpContent;
function AddDentalBillItemDrawer({ open, onOpenChange, initialName = "", onSaved }) {
    _s();
    const formId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBillingCatalog"])();
    const [formName, setFormName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formPrice, setFormPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formCgst, setFormCgst] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formSgst, setFormSgst] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formDiscount, setFormDiscount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formDiscountUnit, setFormDiscountUnit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("inr");
    const [formErrors, setFormErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        price: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddDentalBillItemDrawer.useEffect": ()=>{
            if (open) {
                setFormName(initialName.trim());
                setFormPrice("");
                setFormCgst("");
                setFormSgst("");
                setFormDiscount("");
                setFormDiscountUnit("inr");
                setFormErrors({
                    name: "",
                    price: ""
                });
            }
        }
    }["AddDentalBillItemDrawer.useEffect"], [
        open,
        initialName
    ]);
    const drawerPreviewTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AddDentalBillItemDrawer.useMemo[drawerPreviewTotal]": ()=>{
            const priceNum = Number(sanitizeDecimal(String(formPrice)));
            if (!Number.isFinite(priceNum) || priceNum <= 0) return null;
            const cgstPct = formCgst.trim() === "" ? 0 : Number(sanitizeDecimal(String(formCgst))) || 0;
            const sgstPct = formSgst.trim() === "" ? 0 : Number(sanitizeDecimal(String(formSgst))) || 0;
            const gstPct = cgstPct + sgstPct;
            const discountRaw = sanitizeDecimal(String(formDiscount));
            const discount = discountRaw === "" ? 0 : Number(discountRaw);
            if (!Number.isFinite(discount) || discount < 0) return null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeBillingLineTotal"])(priceNum, discount, gstPct, formDiscountUnit);
        }
    }["AddDentalBillItemDrawer.useMemo[drawerPreviewTotal]"], [
        formPrice,
        formCgst,
        formSgst,
        formDiscount,
        formDiscountUnit
    ]);
    function handleSave() {
        const name = formName.trim();
        const priceNum = Number(sanitizeDecimal(String(formPrice)));
        const nextErrors = {
            name: "",
            price: ""
        };
        if (!name) nextErrors.name = "Enter a name to continue.";
        if (!Number.isFinite(priceNum) || priceNum <= 0) nextErrors.price = "Enter a valid price greater than zero.";
        if (nextErrors.name || nextErrors.price) {
            setFormErrors(nextErrors);
            return;
        }
        const cgstPct = formCgst.trim() === "" ? 0 : Number(sanitizeDecimal(String(formCgst))) || 0;
        const sgstPct = formSgst.trim() === "" ? 0 : Number(sanitizeDecimal(String(formSgst))) || 0;
        const gstPct = cgstPct + sgstPct;
        const discountRaw = sanitizeDecimal(String(formDiscount));
        const discount = discountRaw === "" ? 0 : Number(discountRaw);
        if (!Number.isFinite(discount) || discount < 0) return;
        const item = {
            id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `dent-${Date.now()}`,
            name,
            type: "dental",
            price: priceNum,
            priceUnit: "per_unit",
            discount,
            discountUnit: formDiscountUnit,
            cgstPct,
            sgstPct,
            gstPct
        };
        addItem(item);
        onSaved?.(item);
        onOpenChange(false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
        delayDuration: 200,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPDrawer"], {
            open: open,
            onOpenChange: onOpenChange,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPDrawerContent"], {
                side: "right",
                size: "lg",
                overlayClassName: "!z-[100]",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("!gap-0 !p-0 !rounded-none !z-[100]", __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerSheet),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$shared$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DrawerHeader"], {
                        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].billingDrawerTitleRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Add dental service"
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                    lineNumber: 147,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoIconBtn,
                                                "aria-label": "About dental services in the catalog",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$InfoCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoCircle$3e$__["InfoCircle"], {
                                                    size: 16,
                                                    variant: "Linear",
                                                    color: "var(--tp-slate-500)"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 23
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                lineNumber: 150,
                                                columnNumber: 21
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 149,
                                            columnNumber: 19
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            side: "bottom",
                                            align: "start",
                                            className: "max-w-[320px] rounded-[12px] p-[12px]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DentalServiceHelpContent, {}, void 0, false, {
                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                lineNumber: 155,
                                                columnNumber: 21
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 154,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                    lineNumber: 148,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                            lineNumber: 146,
                            columnNumber: 15
                        }, void 0),
                        titleClassName: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].billingDrawerTitle,
                        onClose: ()=>onOpenChange(false),
                        action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPButton"], {
                            type: "button",
                            variant: "solid",
                            theme: "primary",
                            size: "sm",
                            surface: "light",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerSaveCompact,
                            onClick: handleSave,
                            children: "Save"
                        }, void 0, false, {
                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                            lineNumber: 163,
                            columnNumber: 15
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerBody,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            id: formId,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                            onSubmit: (e)=>{
                                e.preventDefault();
                                handleSave();
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                            htmlFor: `${formId}-name`,
                                            children: [
                                                "Dental service name",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].requiredMark,
                                                    "aria-hidden": true,
                                                    children: [
                                                        " ",
                                                        "*"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 186,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: `${formId}-name`,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerInput, formErrors.name && __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerInputError),
                                            value: formName,
                                            onChange: (e)=>{
                                                setFormName(e.target.value);
                                                if (formErrors.name) setFormErrors((er)=>({
                                                        ...er,
                                                        name: ""
                                                    }));
                                            },
                                            placeholder: "e.g., Ceramic crown",
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 193,
                                            columnNumber: 17
                                        }, this),
                                        formErrors.name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldError,
                                            children: formErrors.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 204,
                                            columnNumber: 36
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                            htmlFor: `${formId}-price`,
                                            children: [
                                                "Price (₹)",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].requiredMark,
                                                    "aria-hidden": true,
                                                    children: [
                                                        " ",
                                                        "*"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 208,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffix, formErrors.price && __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffixError),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffixPrefix,
                                                    "aria-hidden": true,
                                                    children: "₹"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: `${formId}-price`,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerInputAffixed,
                                                    inputMode: "decimal",
                                                    value: formPrice,
                                                    onChange: (e)=>{
                                                        setFormPrice(sanitizeDecimal(e.target.value));
                                                        if (formErrors.price) setFormErrors((er)=>({
                                                                ...er,
                                                                price: ""
                                                            }));
                                                    },
                                                    placeholder: "0"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this),
                                        formErrors.price ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldError,
                                            children: formErrors.price
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 231,
                                            columnNumber: 37
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerPricingTriple,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingCol,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingMiniLabel,
                                                        htmlFor: `${formId}-cgst`,
                                                        children: "CGST (%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffix,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: `${formId}-cgst`,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerInputAffixedGst,
                                                                inputMode: "decimal",
                                                                value: formCgst,
                                                                onChange: (e)=>setFormCgst(sanitizeDecimal(e.target.value)),
                                                                placeholder: "0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 241,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffixSuffix,
                                                                "aria-hidden": true,
                                                                children: "%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 249,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                lineNumber: 236,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingCol,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingMiniLabel,
                                                        htmlFor: `${formId}-sgst`,
                                                        children: "SGST (%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffix,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: `${formId}-sgst`,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerInputAffixedGst,
                                                                inputMode: "decimal",
                                                                value: formSgst,
                                                                onChange: (e)=>setFormSgst(sanitizeDecimal(e.target.value)),
                                                                placeholder: "0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 259,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffixSuffix,
                                                                "aria-hidden": true,
                                                                children: "%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 267,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                lineNumber: 254,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingCol,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingMiniLabel,
                                                        htmlFor: `${formId}-disc`,
                                                        children: "Discount"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].discountInline,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: `${formId}-disc`,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].discountInlineInput,
                                                                inputMode: "decimal",
                                                                value: formDiscount,
                                                                onChange: (e)=>setFormDiscount(sanitizeDecimal(e.target.value)),
                                                                placeholder: "0",
                                                                "aria-label": formDiscountUnit === "percent" ? "Discount percent" : "Discount amount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 277,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onMouseDown: (e)=>e.preventDefault(),
                                                                onClick: ()=>setFormDiscountUnit(formDiscountUnit === "inr" ? "percent" : "inr"),
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].discountUnitSwitch,
                                                                title: formDiscountUnit === "inr" ? "Switch to %" : "Switch to ₹",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: formDiscountUnit === "inr" ? "₹" : "%"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                        lineNumber: 293,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].discountUnitChevrons,
                                                                        "aria-hidden": true,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowUp2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp2$3e$__["ArrowUp2"], {
                                                                                size: 8,
                                                                                color: "currentColor",
                                                                                variant: "Bold"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                                lineNumber: 295,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__["ArrowDown2"], {
                                                                                size: 8,
                                                                                color: "currentColor",
                                                                                variant: "Bold"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                                lineNumber: 296,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                        lineNumber: 294,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                lineNumber: 272,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                        lineNumber: 235,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerTotalFooter,
                        "aria-live": "polite",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerTotalLabel,
                                children: "Total amount (incl. GST)"
                            }, void 0, false, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerTotalValue,
                                children: drawerPreviewTotal === null ? "—" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBillingInr"])(drawerPreviewTotal)
                            }, void 0, false, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                        lineNumber: 305,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
            lineNumber: 137,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s(AddDentalBillItemDrawer, "gDhrCfSwK5Ty096G+LwZh3U0hj0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBillingCatalog"]
    ];
});
_c1 = AddDentalBillItemDrawer;
var _c, _c1;
__turbopack_context__.k.register(_c, "DentalServiceHelpContent");
__turbopack_context__.k.register(_c1, "AddDentalBillItemDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_dental_4571764f._.js.map