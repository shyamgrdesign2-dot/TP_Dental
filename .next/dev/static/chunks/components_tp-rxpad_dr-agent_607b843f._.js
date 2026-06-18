(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/tp-rxpad/dr-agent/DrAgentRuntimeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DrAgentRuntimeContext",
    ()=>DrAgentRuntimeContext,
    "useDrAgentRuntime",
    ()=>useDrAgentRuntime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const defaultValue = {
    dentalChartPatientId: "apt-1"
};
const DrAgentRuntimeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(defaultValue);
function useDrAgentRuntime() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(DrAgentRuntimeContext);
}
_s(useDrAgentRuntime, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ─────────────────────────────────────────────────────────────
// Doctor Agent v0 — Constants & Configuration
// ─────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "AI_GRADIENT",
    ()=>AI_GRADIENT,
    "AI_GRADIENT_BORDER",
    ()=>AI_GRADIENT_BORDER,
    "AI_GRADIENT_SOFT",
    ()=>AI_GRADIENT_SOFT,
    "AI_GRADIENT_SOFT_ANIMATED",
    ()=>AI_GRADIENT_SOFT_ANIMATED,
    "AI_PILL_BG",
    ()=>AI_PILL_BG,
    "AI_PILL_BG_HOVER",
    ()=>AI_PILL_BG_HOVER,
    "AI_PILL_BORDER",
    ()=>AI_PILL_BORDER,
    "AI_PILL_TEXT_GRADIENT",
    ()=>AI_PILL_TEXT_GRADIENT,
    "CARD",
    ()=>CARD,
    "CONTEXT_PATIENT_ID",
    ()=>CONTEXT_PATIENT_ID,
    "PHASE_PROMPTS",
    ()=>PHASE_PROMPTS,
    "QUICK_CLINICAL_SNAPSHOT_PROMPT",
    ()=>QUICK_CLINICAL_SNAPSHOT_PROMPT,
    "RX_CONTEXT_OPTIONS",
    ()=>RX_CONTEXT_OPTIONS,
    "SECTION_TAGS",
    ()=>SECTION_TAGS,
    "SIDEBAR_CTA_MAP",
    ()=>SIDEBAR_CTA_MAP,
    "SPECIALTY_TABS",
    ()=>SPECIALTY_TABS,
    "TAB_PROMPTS",
    ()=>TAB_PROMPTS,
    "UPLOAD_MEDICAL_RECORDS_MESSAGE",
    ()=>UPLOAD_MEDICAL_RECORDS_MESSAGE,
    "VITAL_META",
    ()=>VITAL_META,
    "findContextIdByPatientId",
    ()=>findContextIdByPatientId
]);
const RX_CONTEXT_OPTIONS = [
    // Patients with appointments today
    {
        id: "__patient__",
        label: "Shyam GR",
        meta: "M, 25y · PAT0061 · 9567933357",
        kind: "patient",
        isToday: true,
        gender: "M",
        age: 25
    },
    /** Same person as __patient__ — used when RxPad URL uses ?patientId=apt-1 */ {
        id: "apt-1",
        label: "Shyam GR",
        meta: "M, 25y · PAT0061 · Dental",
        kind: "patient",
        isToday: true,
        gender: "M",
        age: 25
    },
    {
        id: "apt-neha",
        label: "Neha Gupta",
        meta: "F, 32y · PAT0042 · 9876501234",
        kind: "patient",
        isToday: true,
        gender: "F",
        age: 32
    },
    {
        id: "apt-anjali",
        label: "Anjali Patel",
        meta: "F, 28y · PAT0088 · 9845123456",
        kind: "patient",
        isToday: true,
        gender: "F",
        age: 28
    },
    /** Same patient as apt-anjali — queue / RxPad URL id from appointment-patients */ {
        id: "apt-6",
        label: "Anjali Patel",
        meta: "F, 28y · PAT0067 · 9988771122",
        kind: "patient",
        isToday: true,
        gender: "F",
        age: 28
    },
    {
        id: "apt-vikram",
        label: "Vikram Singh",
        meta: "M, 42y · PAT0045 · 9876543210",
        kind: "patient",
        gender: "M",
        age: 42
    },
    {
        id: "apt-priya",
        label: "Priya Rao",
        meta: "F, 26y · PAT0112 · 8899776655",
        kind: "patient",
        isToday: true,
        gender: "F",
        age: 26
    },
    {
        id: "apt-arjun",
        label: "Arjun S",
        meta: "M, 4y · PAT0203 · 7788994455",
        kind: "patient",
        isToday: true,
        gender: "M",
        age: 4
    },
    {
        id: "apt-lakshmi",
        label: "Lakshmi K",
        meta: "F, 45y · PAT0076 · 9911223344",
        kind: "patient",
        isToday: true,
        gender: "F",
        age: 45
    },
    {
        id: "apt-zerodata",
        label: "Ramesh M",
        meta: "M, 35y · PAT0190 · Walk-in",
        kind: "patient",
        isToday: true,
        gender: "M",
        age: 35
    },
    {
        id: "apt-ramesh-ckd",
        label: "Ramesh Kumar",
        meta: "M, 76y · PAT0215 · Nephrology F/U",
        kind: "patient",
        isToday: true,
        gender: "M",
        age: 76
    },
    // Registered patients without appointment
    {
        id: "reg-meera",
        label: "Meera Sharma",
        meta: "F, 32y · PAT0034 · 9123456780",
        kind: "patient",
        gender: "F",
        age: 32
    },
    {
        id: "reg-suresh",
        label: "Suresh Nair",
        meta: "M, 58y · PAT0019 · 8877665544",
        kind: "patient",
        gender: "M",
        age: 58
    },
    {
        id: "reg-divya",
        label: "Divya Menon",
        meta: "F, 22y · PAT0155 · 9988771122",
        kind: "patient",
        gender: "F",
        age: 22
    },
    {
        id: "reg-mohammad",
        label: "Mohammad Farooq",
        meta: "M, 67y · PAT0008 · 9000112233",
        kind: "patient",
        gender: "M",
        age: 67
    },
    {
        id: "reg-kavitha",
        label: "Kavitha R",
        meta: "F, 39y · PAT0201 · 8765432109",
        kind: "patient",
        gender: "F",
        age: 39
    }
];
const CONTEXT_PATIENT_ID = "__patient__";
const QUICK_CLINICAL_SNAPSHOT_PROMPT = "Quick clinical snapshot";
const UPLOAD_MEDICAL_RECORDS_MESSAGE = "Upload medical records for this patient";
function findContextIdByPatientId(patientId, patientName) {
    // Direct match by id
    const direct = RX_CONTEXT_OPTIONS.find((o)=>o.id === patientId);
    if (direct) return direct.id;
    // Match by embedded patient ID (PAT0061, etc.) in meta
    const byMeta = RX_CONTEXT_OPTIONS.find((o)=>o.meta?.includes(patientId));
    if (byMeta) return byMeta.id;
    // Match by name (case-insensitive)
    if (patientName) {
        const lower = patientName.toLowerCase();
        const byName = RX_CONTEXT_OPTIONS.find((o)=>o.label.toLowerCase() === lower);
        if (byName) return byName.id;
    }
    return undefined;
}
const SPECIALTY_TABS = [
    {
        id: "gp",
        label: "GP",
        headerBg: "var(--tp-slate-50)",
        accentColor: "var(--tp-blue-500)",
        lightBg: "var(--tp-blue-50)",
        iconName: "stethoscope"
    },
    {
        id: "gynec",
        label: "Gynec",
        headerBg: "#FDF2F8",
        accentColor: "#EC4899",
        lightBg: "#FDF2F8",
        iconName: "female"
    },
    {
        id: "ophthal",
        label: "Ophthal",
        headerBg: "#F0FDFA",
        accentColor: "#14B8A6",
        lightBg: "#F0FDFA",
        iconName: "eye"
    },
    {
        id: "obstetric",
        label: "Obstetric",
        headerBg: "var(--tp-violet-50)",
        accentColor: "var(--tp-violet-500)",
        lightBg: "var(--tp-violet-50)",
        iconName: "baby"
    },
    {
        id: "pediatrics",
        label: "Pedia",
        headerBg: "var(--tp-blue-50)",
        accentColor: "var(--tp-blue-400)",
        lightBg: "var(--tp-blue-50)",
        iconName: "baby"
    }
];
const VITAL_META = [
    {
        key: "bp",
        label: "BP",
        unit: "mmHg",
        priority: 1,
        isAbnormal: (v)=>v >= 140 || v <= 90,
        isCritical: (v)=>v >= 180 || v <= 70
    },
    {
        key: "spo2",
        label: "SpO₂",
        unit: "%",
        priority: 2,
        isAbnormal: (v)=>v < 95,
        isCritical: (v)=>v < 90
    },
    {
        key: "pulse",
        label: "Pulse",
        unit: "bpm",
        priority: 3,
        isAbnormal: (v)=>v > 100 || v < 50,
        isCritical: (v)=>v > 130 || v < 40
    },
    {
        key: "temp",
        label: "Temp",
        unit: "°F",
        priority: 4,
        isAbnormal: (v)=>v >= 100.4,
        isCritical: (v)=>v >= 103
    },
    {
        key: "rr",
        label: "RR",
        unit: "/min",
        priority: 5,
        isAbnormal: (v)=>v > 20 || v < 12,
        isCritical: (v)=>v > 30 || v < 8
    },
    {
        key: "weight",
        label: "Weight",
        unit: "kg",
        priority: 6,
        isAbnormal: ()=>false,
        isCritical: ()=>false
    },
    {
        key: "height",
        label: "Height",
        unit: "cm",
        priority: 7,
        isAbnormal: ()=>false,
        isCritical: ()=>false
    },
    {
        key: "bmi",
        label: "BMI",
        unit: "",
        priority: 8,
        isAbnormal: (v)=>v > 30 || v < 18.5,
        isCritical: (v)=>v > 40 || v < 16
    },
    {
        key: "bloodSugar",
        label: "Blood Sugar",
        unit: "mg/dL",
        priority: 11,
        isAbnormal: (v)=>v > 140,
        isCritical: (v)=>v > 300
    }
];
const SECTION_TAGS = {
    vitals: {
        id: "vitals",
        label: "Today's Vitals",
        icon: "Heart Rate",
        sidebarTab: "vitals",
        copyDestination: "vitals"
    },
    labs: {
        id: "labs",
        label: "Key Labs",
        icon: "Lab",
        sidebarTab: "labResults",
        copyDestination: "labResults"
    },
    history: {
        id: "history",
        label: "Medical History",
        icon: "clipboard-activity",
        sidebarTab: "history",
        copyDestination: "history"
    },
    lastVisit: {
        id: "lastVisit",
        label: "Last Visit",
        icon: "medical-record",
        sidebarTab: "pastVisits",
        copyDestination: "rxpad"
    },
    symptoms: {
        id: "symptoms",
        label: "Symptoms Reported",
        icon: "thermometer",
        copyDestination: "rxpad"
    },
    examination: {
        id: "examination",
        label: "Examination",
        icon: "stethoscope",
        copyDestination: "rxpad"
    },
    diagnosis: {
        id: "diagnosis",
        label: "Diagnosis",
        icon: "Diagnosis",
        copyDestination: "rxpad"
    },
    medication: {
        id: "medication",
        label: "Medication",
        icon: "pill",
        sidebarTab: "pastVisits",
        copyDestination: "rxpad"
    },
    investigation: {
        id: "investigation",
        label: "Lab Investigations",
        icon: "Lab",
        copyDestination: "rxpad"
    },
    advice: {
        id: "advice",
        label: "Advice",
        icon: "clipboard-activity",
        copyDestination: "rxpad"
    },
    followUp: {
        id: "followUp",
        label: "Follow-up",
        icon: "medical-record",
        sidebarTab: "followUp",
        copyDestination: "followUp"
    },
    obstetric: {
        id: "obstetric",
        label: "Obstetric",
        icon: "Obstetric",
        sidebarTab: "obstetric",
        copyDestination: "obstetric"
    },
    gynec: {
        id: "gynec",
        label: "Gynec",
        icon: "Gynec",
        sidebarTab: "gynec",
        copyDestination: "gynec"
    },
    growth: {
        id: "growth",
        label: "Growth",
        icon: "Heart Rate Monitor",
        sidebarTab: "growth",
        copyDestination: "growth"
    },
    vaccine: {
        id: "vaccine",
        label: "Vaccine",
        icon: "injection",
        sidebarTab: "vaccine",
        copyDestination: "vaccine"
    }
};
const AI_GRADIENT = "linear-gradient(91deg, #D565EA 3.04%, #673AAC 66.74%, #1A1994 130.45%)";
const AI_GRADIENT_SOFT = "linear-gradient(135deg, rgba(213,101,234,0.08) 0%, rgba(103,58,172,0.08) 50%, rgba(26,25,148,0.08) 100%)";
const AI_GRADIENT_BORDER = "linear-gradient(135deg, rgba(213,101,234,0.3) 0%, rgba(103,58,172,0.3) 50%, rgba(26,25,148,0.3) 100%)";
const AI_GRADIENT_SOFT_ANIMATED = "linear-gradient(135deg, rgba(213,101,234,0.18) 0%, rgba(139,92,246,0.22) 25%, rgba(103,58,172,0.18) 50%, rgba(26,25,148,0.15) 75%, rgba(213,101,234,0.18) 100%)";
const AI_PILL_BG = "linear-gradient(135deg, rgba(213,101,234,0.08) 0%, rgba(103,58,172,0.08) 50%, rgba(26,25,148,0.08) 100%)";
const AI_PILL_BG_HOVER = "linear-gradient(135deg, rgba(213,101,234,0.14) 0%, rgba(103,58,172,0.14) 50%, rgba(26,25,148,0.14) 100%)";
const AI_PILL_BORDER = "1px solid rgba(103,58,172,0.15)";
const AI_PILL_TEXT_GRADIENT = "linear-gradient(91deg, #D565EA 3.04%, #673AAC 66.74%, #1A1994 130.45%)";
const CARD = {
    radius: 12,
    headerIconSize: 26,
    headerIconRadius: 8,
    titleSize: 16,
    bodySize: 14,
    secondarySize: 12,
    tagSize: 13,
    ctaHeight: 30,
    ctaRadius: 10,
    ctaFontSize: 14,
    padding: {
        x: 12,
        y: 8
    }
};
const PHASE_PROMPTS = {
    empty: [
        "Patient's detailed summary",
        "Last visit",
        "Abnormal labs",
        "Reported by patient"
    ],
    symptoms_entered: [
        "Generate DDX",
        "Last visit compare",
        "Vitals review",
        "Lab focus"
    ],
    dx_accepted: [
        "Medication plan",
        "Investigations",
        "Advice draft",
        "Follow-up plan"
    ],
    meds_written: [
        "Refine advice",
        "Translate advice",
        "Follow-up plan",
        "Completeness check"
    ],
    near_complete: [
        "Final checklist",
        "Translate advice",
        "Visit review",
        "Risk recap"
    ]
};
const TAB_PROMPTS = {
    "dr-agent": [
        "Patient's detailed summary",
        "Abnormal findings",
        "Last visit essentials"
    ],
    "past-visits": [
        "Last visit essentials",
        "Previous comparison",
        "Recurrence check"
    ],
    vitals: [
        "Vitals overview",
        "Concerning vitals",
        "Trend if relevant"
    ],
    history: [
        "Chronic history",
        "Allergy safety",
        "Family/lifestyle context"
    ],
    "lab-results": [
        "Flagged labs",
        "Latest panel focus",
        "Follow-up lab suggestion"
    ],
    obstetric: [
        "Obstetric highlights",
        "ANC due items",
        "Pregnancy risk checks"
    ],
    "medical-records": [
        "Latest document insights",
        "Abnormal OCR findings",
        "Older record lookup"
    ]
};
const SIDEBAR_CTA_MAP = {
    last_visit: {
        text: "See all past visits →",
        tab: "pastVisits"
    },
    vitals_trend_bar: {
        text: "View full vitals history →",
        tab: "vitals"
    },
    vitals_trend_line: {
        text: "View full vitals history →",
        tab: "vitals"
    },
    lab_panel: {
        text: "View complete lab report →",
        tab: "labResults"
    },
    lab_comparison: {
        text: "View full lab history →",
        tab: "labResults"
    },
    ocr_pathology: {
        text: "View in Medical Records →",
        tab: "medicalRecords"
    },
    ocr_extraction: {
        text: "View in Medical Records →",
        tab: "medicalRecords"
    },
    obstetric_summary: {
        text: "View full obstetric record →",
        tab: "obstetric"
    },
    gynec_summary: {
        text: "View gynec history →",
        tab: "gynec"
    },
    pediatric_summary: {
        text: "View growth chart →",
        tab: "growth"
    },
    ophthal_summary: {
        text: "View full ophthal history →",
        tab: "ophthal"
    },
    med_history: {
        text: "View full medical history →",
        tab: "history"
    },
    patient_summary: {
        text: "View full medical history →",
        tab: "history"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/patient-resolution.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapUrlPatientIdToAgentDataKey",
    ()=>mapUrlPatientIdToAgentDataKey,
    "resolveRxContextOption",
    ()=>resolveRxContextOption
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appointment-patients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/constants.ts [app-client] (ecmascript)");
;
;
function mapUrlPatientIdToAgentDataKey(patientId) {
    if (patientId === "apt-1") return __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTEXT_PATIENT_ID"];
    if (patientId === "apt-6") return "apt-anjali";
    if (patientId === "apt-3") return "apt-vikram";
    if (patientId === "apt-2") return "apt-neha";
    if (patientId === "apt-4") return "apt-priya";
    if (patientId === "apt-5") return "apt-arjun";
    if (patientId === "apt-new") return "apt-zerodata";
    return patientId;
}
function resolveRxContextOption(selectedPatientId) {
    const fromList = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RX_CONTEXT_OPTIONS"].find((p)=>p.id === selectedPatientId);
    if (fromList) return fromList;
    const ap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppointmentPatient"])(selectedPatientId);
    return {
        id: selectedPatientId,
        label: ap.name,
        meta: `${ap.genderShort}, ${ap.age}y · ${ap.patientCode}`,
        kind: "patient",
        gender: ap.genderShort,
        age: ap.age
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/shared/buildCoreNarrative.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared narrative builder — produces a structured intermediate format
 * that both GPSummaryCard (JSX) and SbarOverviewCard (plain text) consume.
 *
 * This ensures the patient summary narrative and SBAR situation line
 * always present the same clinical content, just formatted differently.
 */ __turbopack_context__.s([
    "QUICK_SNAPSHOT_EMPTY_PLACEHOLDER",
    ()=>QUICK_SNAPSHOT_EMPTY_PLACEHOLDER,
    "buildCardSituationQuote",
    ()=>buildCardSituationQuote,
    "buildCoreNarrative",
    ()=>buildCoreNarrative,
    "buildQuickClinicalSnapshotInlineSuggestions",
    ()=>buildQuickClinicalSnapshotInlineSuggestions,
    "buildQuickClinicalSnapshotText",
    ()=>buildQuickClinicalSnapshotText,
    "expandAbbreviation",
    ()=>expandAbbreviation,
    "extractDemographicsLine",
    ()=>extractDemographicsLine,
    "narrativeToPlainText",
    ()=>narrativeToPlainText,
    "patientHasQuickClinicalSnapshotData",
    ()=>patientHasQuickClinicalSnapshotData,
    "shortenMedication",
    ()=>shortenMedication
]);
// ── Helpers ──
const ABBREV_MAP = {
    "DM": "Diabetes",
    "HTN": "Hypertension",
    "CKD": "Chronic Kidney Disease",
    "COPD": "Chronic Obstructive Pulmonary Disease",
    "CAD": "Coronary Artery Disease",
    "CHF": "Congestive Heart Failure",
    "RA": "Rheumatoid Arthritis",
    "SLE": "Systemic Lupus Erythematosus",
    "TB": "Tuberculosis",
    "GERD": "Gastroesophageal Reflux Disease"
};
function expandAbbreviation(text) {
    return text.replace(/\b(DM|HTN|CKD|COPD|CAD|CHF|RA|SLE|TB|GERD)\b/g, (match)=>{
        return ABBREV_MAP[match] || match;
    });
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
/** Specialty-relevant condition keywords */ const SPECIALTY_CONDITION_RELEVANCE = {
    obstetric: /pre-?eclampsia|gestational|GDM|HTN|hypertension|anemia|thyroid|diabetes/i,
    ophthal: /diabet|HTN|hypertension|glaucoma|cataract|retino|macula/i,
    gynec: /PCOS|endometri|fibroid|thyroid|anemia|hormonal/i,
    pediatrics: /asthma|allergy|anemia|epilepsy|growth|nutrition|congenital/i
};
function filterConditionsForSpecialty(conditions, specialty) {
    if (!specialty || specialty === "gp") return conditions;
    const pattern = SPECIALTY_CONDITION_RELEVANCE[specialty];
    if (!pattern) return conditions;
    const relevant = conditions.filter((c)=>pattern.test(c));
    const other = conditions.filter((c)=>!pattern.test(c));
    return [
        ...relevant,
        ...other
    ];
}
/** Parse a condition string like "Diabetes (5 yrs)" into name + duration */ function parseCondition(raw) {
    const match = raw.match(/^(.+?)\s*(?:\(([^)]+)\)\s*)?$/);
    const name = match?.[1]?.replace(/\s*—\s*$/, "").trim() || raw;
    const duration = match?.[2];
    return {
        name,
        duration,
        raw
    };
}
// ── Specialty lead-in (plain text) ──
function buildSpecialtyLeadInText(data, specialty) {
    if (!specialty || specialty === "gp") return undefined;
    if (specialty === "obstetric" && data.obstetricData) {
        const ob = data.obstetricData;
        const gp = [
            ob.gravida != null ? `G${ob.gravida}` : null,
            ob.para != null ? `P${ob.para}` : null,
            ob.living != null ? `L${ob.living}` : null,
            ob.abortion != null && ob.abortion > 0 ? `A${ob.abortion}` : null
        ].filter(Boolean).join("");
        const details = [];
        if (ob.gestationalWeeks) details.push(`${ob.gestationalWeeks} wks`);
        if (ob.edd) details.push(`EDD ${ob.edd}`);
        if (ob.lmp) details.push(`LMP ${ob.lmp}`);
        return `${gp || "Obstetric patient"}${details.length > 0 ? ` — ${details.join(", ")}` : ""}`;
    }
    if (specialty === "ophthal" && data.ophthalData) {
        const oph = data.ophthalData;
        const vaDetails = [];
        if (oph.vaRight) vaDetails.push(`OD: ${oph.vaRight}`);
        if (oph.vaLeft) vaDetails.push(`OS: ${oph.vaLeft}`);
        if (oph.iop) vaDetails.push(`IOP: ${oph.iop}`);
        if (vaDetails.length > 0) return vaDetails.join(", ");
    }
    if (specialty === "gynec" && data.gynecData) {
        const gyn = data.gynecData;
        const details = [];
        if (gyn.lmp) details.push(`LMP ${gyn.lmp}`);
        if (gyn.cycleRegularity) details.push(`cycles ${gyn.cycleRegularity.toLowerCase()}`);
        if (gyn.painScore && parseInt(gyn.painScore, 10) > 5) details.push(`pain ${gyn.painScore}/10`);
        if (details.length > 0) return details.join(", ");
    }
    if (specialty === "pediatrics" && data.pediatricsData) {
        const ped = data.pediatricsData;
        const details = [];
        if (ped.ageDisplay) details.push(ped.ageDisplay);
        if (ped.weightKg != null) {
            details.push(`Wt ${ped.weightKg}kg${ped.weightPercentile ? ` (${ped.weightPercentile})` : ""}`);
        }
        if (ped.vaccinesOverdue && ped.vaccinesOverdue > 0) {
            details.push(`${ped.vaccinesOverdue} vaccines overdue`);
        } else if (ped.vaccinesPending && ped.vaccinesPending > 0) {
            details.push(`${ped.vaccinesPending} vaccines pending`);
        }
        if (details.length > 0) return details.join(", ");
    }
    return undefined;
}
function buildCoreNarrative(data, specialty, options) {
    const maxConditions = options?.maxConditions ?? 3;
    const maxAllergies = options?.maxAllergies ?? 2;
    const maxMeds = options?.maxMeds ?? 3;
    const result = {};
    // Specialty lead-in
    const lead = buildSpecialtyLeadInText(data, specialty);
    if (lead) result.specialtyLead = lead;
    // Symptoms from collector
    if (data.symptomCollectorData?.symptoms?.length) {
        result.symptoms = data.symptomCollectorData.symptoms.slice(0, 3).map((s)=>({
                name: s.name,
                duration: s.duration
            }));
    }
    // Chronic conditions (filtered by specialty)
    if (data.chronicConditions && data.chronicConditions.length > 0) {
        const filtered = filterConditionsForSpecialty(data.chronicConditions, specialty);
        if (filtered.length > 0) {
            const items = filtered.slice(0, maxConditions).map(parseCondition);
            result.conditions = {
                items,
                hasMore: Math.max(0, filtered.length - maxConditions)
            };
        }
    }
    // Allergies (all types, not just drug allergies)
    if (data.allergies && data.allergies.length > 0) {
        result.allergies = data.allergies.slice(0, maxAllergies);
    }
    // Active medications
    if (data.activeMeds && data.activeMeds.length > 0) {
        result.meds = {
            names: data.activeMeds.slice(0, maxMeds).map(shortenMedication),
            hasMore: Math.max(0, data.activeMeds.length - maxMeds)
        };
    }
    // Last visit
    if (data.lastVisit) {
        const date = data.lastVisit.date || "";
        const dx = data.lastVisit.diagnosis || "";
        if (date && dx) {
            result.lastVisit = {
                date,
                dx
            };
        }
    }
    // Follow-up overdue
    if (data.followUpOverdueDays && data.followUpOverdueDays > 0) {
        result.followUpOverdue = data.followUpOverdueDays;
    }
    return result;
}
function narrativeToPlainText(parts, maxChars = 220) {
    const sentences = [];
    // Specialty lead-in
    if (parts.specialtyLead) {
        sentences.push(`${parts.specialtyLead}.`);
    }
    // Symptoms
    if (parts.symptoms?.length) {
        const symptomStr = parts.symptoms.map((s)=>{
            return s.duration ? `${s.name} (${s.duration})` : s.name;
        }).join(", ");
        sentences.push(`Presenting with ${symptomStr}.`);
    }
    // Conditions
    if (parts.conditions) {
        const condStr = parts.conditions.items.map((c)=>c.duration ? `${expandAbbreviation(c.name)} (${c.duration})` : expandAbbreviation(c.name)).join(", ");
        const prefix = sentences.length > 0 ? "Known case of" : "Patient with";
        const more = parts.conditions.hasMore > 0 ? ` + ${parts.conditions.hasMore} more` : "";
        sentences.push(`${prefix} ${condStr}${more}.`);
    }
    // Allergies
    if (parts.allergies?.length) {
        const allergyStr = parts.allergies.map((a)=>a.split("(")[0].trim()).join(", ");
        sentences.push(`Allergic to ${allergyStr}.`);
    }
    // Medications
    if (parts.meds) {
        const more = parts.meds.hasMore > 0 ? ` + ${parts.meds.hasMore} more` : "";
        sentences.push(`On ${parts.meds.names.join(", ")}${more}.`);
    }
    // Last visit
    if (parts.lastVisit) {
        sentences.push(`Last seen ${parts.lastVisit.date} — Dx: ${parts.lastVisit.dx}.`);
    }
    // Follow-up overdue
    if (parts.followUpOverdue) {
        sentences.push(`Follow-up overdue by ${parts.followUpOverdue} days.`);
    }
    if (sentences.length === 0) return "New patient, no prior clinical data available.";
    // Cap at maxChars
    let result = sentences.join(" ");
    if (result.length > maxChars) {
        // Progressively trim from the end
        result = "";
        for (const s of sentences){
            const candidate = result ? `${result} ${s}` : s;
            if (candidate.length > maxChars && result.length > 0) break;
            result = candidate;
        }
    }
    return result;
}
function detectQuickSnapshotSpecialty(data) {
    if (data.obstetricData) return "obstetric";
    if (data.pediatricsData) return "pediatrics";
    if (data.gynecData && !data.obstetricData) return "gynec";
    if (data.ophthalData) return "ophthal";
    return "gp";
}
function extractDemographicsLine(data) {
    const src = (data.patientNarrative || data.sbarSituation || "").trim();
    if (!src) return "Patient";
    const beforeWith = src.split(/\s+with\s+/i)[0];
    const beforePresenting = beforeWith.split(/\s+presenting\s+/i)[0];
    const firstSentence = beforePresenting.split(/\.\s+/)[0].trim();
    if (/^\d+-year-old/i.test(firstSentence)) return firstSentence;
    const m2 = src.match(/^(\d+)\s*([MF])\b/i);
    if (m2) {
        const gender = m2[2].toUpperCase() === "M" ? "male" : "female";
        return `${m2[1]}-year-old ${gender}`;
    }
    return "Patient";
}
/**
 * First chat message / text_quote when opening Dr. Agent (quick clinical snapshot):
 * demographics + intake symptoms when available + compact history (same permutation as SBAR), without duplicating symptoms in the history clause.
 */ /** ~10 lines at ~14px / 1.6 leading� 90 chars/line → allow full history clause without hard ellipsis */ const QUICK_SNAPSHOT_HISTORY_MAX_CHARS = 1100;
function buildQuickClinicalSnapshotText(data) {
    const specialty = detectQuickSnapshotSpecialty(data);
    const parts = buildCoreNarrative(data, specialty, {
        maxConditions: 4,
        maxAllergies: 3,
        maxMeds: 3
    });
    const demo = extractDemographicsLine(data);
    const collectorSyms = data.symptomCollectorData?.symptoms;
    const symSource = collectorSyms?.length ? collectorSyms : parts.symptoms?.map((s)=>({
            name: s.name,
            duration: s.duration
        })) ?? [];
    let symptomInline = "";
    if (symSource.length > 0) {
        const shown = symSource.map((s)=>{
            const d = s.duration?.trim();
            return d ? `${s.name} ${d}` : s.name;
        });
        symptomInline = `presenting with ${shown.join(", ")}`;
    }
    const historyParts = {
        ...parts,
        symptoms: undefined,
        specialtyLead: undefined
    };
    let history = narrativeToPlainText(historyParts, QUICK_SNAPSHOT_HISTORY_MAX_CHARS).trim();
    const segments = [];
    if (parts.specialtyLead) {
        segments.push(`${parts.specialtyLead}.`);
    }
    const opener = symptomInline ? `${demo} ${symptomInline}` : demo;
    segments.push(opener.endsWith(".") ? opener : `${opener}.`);
    if (history && history !== "New patient, no prior clinical data available.") {
        segments.push(history.endsWith(".") ? history : `${history}.`);
    }
    let out = segments.join(" ").replace(/\s+/g, " ").replace(/\.+/g, ".").replace(/\.\s*\./g, ". ").trim();
    if (!symptomInline && (!out || out === "Patient.")) {
        const fallback = (data.patientNarrative || data.sbarSituation || "").trim();
        if (fallback) out = fallback;
    }
    return out || "New patient, no prior clinical data available.";
}
const QUICK_SNAPSHOT_EMPTY_PLACEHOLDER = "New patient, no prior clinical data available.";
function patientHasQuickClinicalSnapshotData(data) {
    const text = buildQuickClinicalSnapshotText(data).trim();
    if (!text) return false;
    if (text === QUICK_SNAPSHOT_EMPTY_PLACEHOLDER) return false;
    return true;
}
function buildQuickClinicalSnapshotInlineSuggestions(data, variant) {
    const out = [];
    if (variant === "full") {
        out.push({
            label: "Detailed summary",
            message: "Patient's detailed summary"
        });
    }
    if (data.symptomCollectorData) {
        out.push({
            label: "Reported by patient",
            message: "Show reported intake"
        });
    }
    out.push({
        label: "Medical history",
        message: "Medical history"
    });
    out.push({
        label: "Upload reports",
        message: "Upload medical records for this patient"
    });
    if (variant === "v0" && data.todayVitals && Object.keys(data.todayVitals).length > 0) {
        out.push({
            label: "Today's vitals",
            message: "Today's vitals"
        });
    }
    if (data.lastVisit) {
        out.push({
            label: "Last visit",
            message: "Last visit details"
        });
    }
    return out;
}
function buildCardSituationQuote(data, specialty) {
    const spec = specialty ?? detectQuickSnapshotSpecialty(data);
    const maxLen = 420;
    const sc = data.symptomCollectorData;
    if (sc?.symptoms?.length) {
        const segs = [];
        const symLine = sc.symptoms.slice(0, 6).map((s)=>{
            const d = s.duration?.trim();
            return d ? `${s.name} ${d}` : s.name;
        }).join(", ");
        segs.push(`Presenting with ${symLine}.`);
        if (sc.questionsToDoctor?.[0]?.trim()) {
            segs.push(`Patient asks: ${sc.questionsToDoctor[0].trim()}`);
        }
        if (sc.medicalHistory?.length) {
            const mh = sc.medicalHistory.slice(0, 3).join("; ");
            if (mh) segs.push(`Intake medical history: ${mh}.`);
        }
        let out = expandAbbreviation(segs.join(" "));
        if (out.length > maxLen) out = `${out.slice(0, maxLen - 3)}...`;
        return out;
    }
    const lines = [];
    const core = buildCoreNarrative(data, spec, {
        maxConditions: 0,
        maxAllergies: 0,
        maxMeds: 0
    });
    if (core.specialtyLead) lines.push(`${core.specialtyLead}.`);
    const demo = extractDemographicsLine(data);
    lines.push(demo.endsWith(".") ? demo : `${demo}.`);
    if (data.lastVisit?.symptoms?.trim()) {
        const sx = data.lastVisit.symptoms.trim();
        const short = sx.length > 180 ? `${sx.slice(0, 177)}...` : sx;
        lines.push(`Recent visit symptoms: ${short}.`);
    } else if (data.sbarSituation?.trim()) {
        const one = data.sbarSituation.trim().split(/\.\s+/)[0];
        if (one && one.length < 200) lines.push(`${one}.`);
    }
    let out = lines.join(" ").replace(/\s+/g, " ").trim();
    out = expandAbbreviation(out);
    if (!out || out === "Patient.") {
        out = "Clinical context is in the sections below.";
    }
    if (out.length > maxLen) out = `${out.slice(0, maxLen - 3)}...`;
    return out;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/shared/isSituationAtGlanceMessage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSituationAtGlanceAssistantMessage",
    ()=>isSituationAtGlanceAssistantMessage,
    "situationAtGlanceAssistantLeadIn",
    ()=>situationAtGlanceAssistantLeadIn,
    "threadAlreadyHasQuickClinicalGlance",
    ()=>threadAlreadyHasQuickClinicalGlance
]);
function situationAtGlanceAssistantLeadIn(patientLabel) {
    const label = patientLabel?.trim();
    if (label) {
        return `Here's ${label}'s clinical snapshot.`;
    }
    return "Here's a clinical snapshot.";
}
function isSituationAtGlanceAssistantMessage(message) {
    if (message.role !== "assistant") return false;
    if (message.rxOutput?.kind !== "text_quote") return false;
    const src = message.rxOutput.data.source?.trim() ?? "";
    return src === "";
}
function threadAlreadyHasQuickClinicalGlance(msgs, promptLower) {
    return msgs.some((m)=>{
        if (m.role === "user" && m.text.trim().toLowerCase() === promptLower) return true;
        return isSituationAtGlanceAssistantMessage(m);
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/shared/patientRecommendations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Clinical recommendations pipeline — shared by SBAR summary card (top 5) and chat (full list).
 * Bullets are split for ~1–1.5 lines at card width; no ellipsis truncation.
 */ __turbopack_context__.s([
    "MAX_RECOMMENDATIONS_IN_CHAT",
    ()=>MAX_RECOMMENDATIONS_IN_CHAT,
    "MAX_RECOMMENDATIONS_ON_SUMMARY_CARD",
    ()=>MAX_RECOMMENDATIONS_ON_SUMMARY_CARD,
    "buildRecommendationsForSummaryCard",
    ()=>buildRecommendationsForSummaryCard,
    "buildRecommendationsFullListForChat",
    ()=>buildRecommendationsFullListForChat,
    "collectRawClinicalRecommendations",
    ()=>collectRawClinicalRecommendations,
    "messageAsksForRecommendationsList",
    ()=>messageAsksForRecommendationsList
]);
/** Raw source lines collected before split/flatten (tiers, labs, flags, …) — card */ const MAX_RAW_SOURCES_SUMMARY_CARD = 10;
/** Raw source lines — chat full list */ const MAX_RAW_SOURCES_CHAT = 16;
const MAX_RECOMMENDATIONS_ON_SUMMARY_CARD = 5;
const MAX_RECOMMENDATIONS_IN_CHAT = 28;
/**
 * Target ~1–1.5 lines at 14px in ~320px panel — overflow becomes another bullet, not a cut-off.
 */ const MAX_REC_BULLET_CHARS = 76;
function splitAtWordBoundary(text, maxLen) {
    const t = text.trim().replace(/\s+/g, " ");
    if (t.length <= maxLen) return [
        t
    ];
    let breakAt = t.lastIndexOf(" ", maxLen);
    if (breakAt < maxLen * 0.42) {
        const fwd = t.indexOf(" ", maxLen);
        breakAt = fwd > 0 ? fwd : t.length;
    }
    if (breakAt <= 0) return [
        t
    ];
    const first = t.slice(0, breakAt).trim();
    const rest = t.slice(breakAt).trim();
    if (!rest || rest === t) return [
        t
    ];
    return [
        first,
        ...splitAtWordBoundary(rest, maxLen)
    ];
}
function splitCommaPhrasesIntoBullets(text, maxLen) {
    const segments = text.split(/,\s+/).map((s)=>s.trim()).filter(Boolean);
    if (segments.length <= 1) return [
        text
    ];
    const out = [];
    let buf = "";
    for (const seg of segments){
        const test = buf ? `${buf}, ${seg}` : seg;
        if (test.length <= maxLen) buf = test;
        else {
            if (buf) out.push(buf);
            buf = seg;
        }
    }
    if (buf) out.push(buf);
    return out;
}
function dedupeLowercased(items) {
    const seen = new Set();
    const out = [];
    for (const x of items){
        const k = x.trim().toLowerCase();
        if (!k || seen.has(k)) continue;
        seen.add(k);
        out.push(x.trim());
    }
    return out;
}
/** Split one recommendation string into complete, readable bullets — never mid-word ellipsis */ function splitRecommendationIntoDisplayBullets(text) {
    const t = text.trim().replace(/\s+/g, " ");
    if (!t) return [];
    if (t.length <= MAX_REC_BULLET_CHARS) return [
        t
    ];
    if (t.includes(";")) {
        const parts = t.split(/\s*;\s*/).map((p)=>p.trim()).filter(Boolean);
        if (parts.length > 1) {
            const out = parts.flatMap((p)=>splitRecommendationIntoDisplayBullets(p));
            return dedupeLowercased(out);
        }
    }
    const dashParts = t.split(/\s+[—–]\s+/).map((p)=>p.trim()).filter(Boolean);
    if (dashParts.length > 1) {
        const out = dashParts.flatMap((p)=>splitRecommendationIntoDisplayBullets(p));
        return dedupeLowercased(out);
    }
    if (t.includes(",")) {
        const commaChunks = splitCommaPhrasesIntoBullets(t, MAX_REC_BULLET_CHARS);
        if (commaChunks.length > 1) {
            return dedupeLowercased(commaChunks.flatMap((c)=>c.length <= MAX_REC_BULLET_CHARS ? [
                    c
                ] : splitAtWordBoundary(c, MAX_REC_BULLET_CHARS)));
        }
    }
    const sentences = t.match(/[^.?!]+[.?!]+|[^.?!]+$/g);
    if (sentences && sentences.length > 1) {
        const parts = sentences.map((s)=>s.trim()).filter(Boolean);
        const out = parts.flatMap((p)=>p.length <= MAX_REC_BULLET_CHARS ? [
                p
            ] : splitAtWordBoundary(p, MAX_REC_BULLET_CHARS));
        if (out.length > 1) return dedupeLowercased(out);
    }
    return splitAtWordBoundary(t, MAX_REC_BULLET_CHARS);
}
function flattenRecommendationsForDisplay(raw, maxBullets) {
    const out = [];
    const seen = new Set();
    for (const r of raw){
        for (const b of splitRecommendationIntoDisplayBullets(r)){
            const k = b.toLowerCase();
            if (seen.has(k)) continue;
            seen.add(k);
            out.push(b);
            if (out.length >= maxBullets) return out;
        }
    }
    return out;
}
/** Administrative visit-scheduling noise — not tests/imaging/procedures to order */ function isAdministrativeFollowUpAlert(alert) {
    const t = alert.trim();
    if (!t) return true;
    if (/^follow[-\s]?up (visit|appointment)(\s|$)/i.test(t)) return true;
    if (/^(routine\s+)?follow[-\s]?up (only|scheduling)\b/i.test(t)) return true;
    return false;
}
const LAB_ORDER_NEXT_STEP = {
    LDL: "Repeat lipid panel — LDL high; titrate Rx",
    HDL: "Recheck lipids at next visit",
    "Total Cholesterol": "Repeat fasting lipid panel",
    HbA1c: "Repeat HbA1c; adjust glycemic plan",
    TSH: "Recheck TSH after dose change or in 6–8 wk",
    Triglycerides: "Repeat lipids; cut alcohol if TG high",
    "Fasting Glucose": "Repeat fasting glucose ± HbA1c",
    "Fasting Blood Sugar": "Repeat glucose / HbA1c",
    FBS: "Repeat glucose / HbA1c",
    Creatinine: "Repeat renal panel; review meds & volume",
    eGFR: "Repeat renal panel; stage CKD & dosing",
    Hemoglobin: "Work up anemia — iron/B12/folate as needed",
    Hb: "Work up anemia — iron/B12/folate as needed",
    Ferritin: "Add TSAT / iron studies if guiding anemia Rx",
    "Vitamin D": "Recheck 25-OH D after repletion",
    PTH: "Align PTH / Ca / PO₄ workup with CKD stage",
    "Uric Acid": "Repeat uric acid if changing therapy",
    WBC: "Repeat CBC if indicated",
    Platelet: "Repeat platelets if trend unclear",
    BUN: "Interpret with Cr/eGFR & hydration",
    "K+": "Repeat K+; trim RAAS Rx & diet K+ if high",
    Potassium: "Repeat K+; trim RAAS Rx & diet K+ if high",
    Phosphorus: "Repeat mineral panel; adjust binders (CKD)",
    Calcium: "Repeat Ca ± PTH per context",
    Albumin: "Repeat with liver/renal workup if needed",
    Bicarbonate: "Repeat BMP; address acidosis",
    Microalbumin: "Repeat urine albumin (early AM)",
    INR: "Repeat INR after warfarin change"
};
function labOrderLine(lab) {
    if (lab.flag === "normal" || lab.flag === "success" || !lab.flag) return "";
    const preset = LAB_ORDER_NEXT_STEP[lab.name];
    if (preset) return preset;
    return `Review ${lab.name} ${lab.value} ${lab.unit} — order confirmatory labs`;
}
function pushUniqueLine(recs, line, maxRaw) {
    const t = line.trim();
    if (!t || recs.length >= maxRaw) return;
    const low = t.toLowerCase();
    if (recs.some((r)=>r.toLowerCase() === low)) return;
    const head = low.slice(0, 40);
    if (recs.some((r)=>r.toLowerCase().startsWith(head) || head.length > 12 && r.toLowerCase().includes(head.slice(0, 12)))) return;
    recs.push(t);
}
function tierOrder(tier) {
    if (tier === "act") return 0;
    if (tier === "verify") return 1;
    if (tier === "gather") return 2;
    return 3;
}
function collectRawClinicalRecommendations(data, maxRaw) {
    const recs = [];
    if (data.todayVitals) {
        const v = data.todayVitals;
        if (v.bp) {
            const sys = parseInt(v.bp.split("/")[0], 10);
            if (!isNaN(sys) && (sys <= 90 || sys >= 160)) {
                pushUniqueLine(recs, sys <= 90 ? `BP critically low at ${v.bp} (assess for hypotension)` : `BP severely elevated at ${v.bp} (hypertensive urgency)`, maxRaw);
            }
        }
        if (v.spo2) {
            const spo2 = parseInt(v.spo2, 10);
            if (!isNaN(spo2) && spo2 < 92) {
                pushUniqueLine(recs, `SpO₂ at ${v.spo2}% (consider supplemental oxygen)`, maxRaw);
            }
        }
        if (v.temp) {
            const temp = parseFloat(v.temp);
            if (!isNaN(temp) && temp >= 104) {
                pushUniqueLine(recs, `High fever ${v.temp}°F (evaluate source)`, maxRaw);
            }
        }
    }
    const tiers = [
        ...data.recommendationTiers ?? []
    ].sort((a, b)=>tierOrder(a.tier) - tierOrder(b.tier));
    for (const row of tiers){
        pushUniqueLine(recs, row.text, maxRaw);
    }
    if (data.dueAlerts?.length) {
        for (const alert of data.dueAlerts){
            if (!isAdministrativeFollowUpAlert(alert)) pushUniqueLine(recs, alert, maxRaw);
        }
    }
    const lt = data.lastVisit?.labTestsSuggested?.trim();
    if (lt) {
        pushUniqueLine(recs, `Last visit: order/doc — ${lt}`, maxRaw);
    }
    const badLabs = (data.keyLabs ?? []).filter((l)=>l.flag && l.flag !== "normal" && l.flag !== "success");
    for (const lab of badLabs){
        const line = labOrderLine(lab);
        if (line) pushUniqueLine(recs, line, maxRaw);
    }
    const flags = [
        ...data.crossProblemFlags ?? []
    ].sort((a, b)=>{
        if (a.severity === "high" && b.severity !== "high") return -1;
        if (b.severity === "high" && a.severity !== "high") return 1;
        return 0;
    });
    for (const flag of flags){
        pushUniqueLine(recs, flag.text, maxRaw);
    }
    return recs;
}
function buildRecommendationsForSummaryCard(data) {
    const raw = collectRawClinicalRecommendations(data, MAX_RAW_SOURCES_SUMMARY_CARD);
    return flattenRecommendationsForDisplay(raw, MAX_RECOMMENDATIONS_ON_SUMMARY_CARD);
}
function buildRecommendationsFullListForChat(data) {
    const raw = collectRawClinicalRecommendations(data, MAX_RAW_SOURCES_CHAT);
    return flattenRecommendationsForDisplay(raw, MAX_RECOMMENDATIONS_IN_CHAT);
}
function messageAsksForRecommendationsList(normalizedInput) {
    const n = normalizedInput.trim();
    if (!n) return false;
    if (/\brecommendations\b/.test(n)) return true;
    if (/\brecommendation\b/.test(n) && (n.includes("list") || n.includes("show") || n.includes("full") || n.includes("all ") || n.includes("every ") || n.includes("clinical"))) return true;
    if (n.includes("clinical recommendation")) return true;
    if (n.includes("list recommend") || n.includes("show recommend") || n.includes("full recommend") || n.includes("all recommend")) return true;
    return false;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/shared/rxpad-copy-feedback.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildRxPadCopySnackbarMessage",
    ()=>buildRxPadCopySnackbarMessage
]);
function buildRxPadCopySnackbarMessage(p) {
    if (p.dentalScanApply) {
        const teeth = p.dentalScanApply.teeth;
        const n = Array.isArray(teeth) ? teeth.length : 0;
        const hasClinical = Array.isArray(p.symptoms) && p.symptoms.length > 0 || Array.isArray(p.medications) && p.medications.length > 0 || Array.isArray(p.labInvestigations) && p.labInvestigations.length > 0;
        if (hasClinical && p.sourceDateLabel?.toLowerCase().includes("voice")) {
            return n > 1 ? `Voice capture copied — RxPad plus ${n} teeth` : "Voice capture copied — RxPad plus dental examination";
        }
        return n > 1 ? `Dental examination · ${n} teeth copied to RxPad` : "Dental examination copied to RxPad";
    }
    const hasSymptoms = Array.isArray(p.symptoms) && p.symptoms.length > 0;
    const hasMeds = Array.isArray(p.medications) && p.medications.length > 0;
    const hasLabs = Array.isArray(p.labInvestigations) && p.labInvestigations.length > 0;
    const hasExam = Array.isArray(p.examinations) && p.examinations.length > 0;
    const hasDx = Array.isArray(p.diagnoses) && p.diagnoses.length > 0;
    const hasAdvice = Boolean(p.advice?.trim());
    const hasFu = Boolean(p.followUp?.trim());
    const hasNotes = Boolean(p.additionalNotes?.trim());
    const voiceStyleBlocks = [
        hasSymptoms,
        hasMeds,
        hasLabs
    ].filter(Boolean).length;
    if (voiceStyleBlocks >= 2 || hasSymptoms && hasMeds && hasLabs) {
        return p.sourceDateLabel?.toLowerCase().includes("voice") ? "Voice capture copied to RxPad" : "Clinical capture copied to RxPad";
    }
    if (hasSymptoms && !hasMeds && !hasLabs && !hasExam && !hasDx && !hasAdvice && !hasFu) {
        return "Symptoms copied to RxPad";
    }
    if (hasMeds && !hasSymptoms && !hasLabs && !hasExam && !hasDx && !hasAdvice && !hasFu) {
        return "Medications copied to RxPad";
    }
    if (hasLabs && !hasSymptoms && !hasMeds && !hasExam && !hasDx && !hasAdvice && !hasFu) {
        return "Lab investigations copied to RxPad";
    }
    if (hasExam && !hasSymptoms && !hasMeds && !hasLabs && !hasDx) {
        return "Examination copied to RxPad";
    }
    if (hasDx && !hasSymptoms && !hasMeds && !hasLabs && !hasExam) {
        return "Diagnosis copied to RxPad";
    }
    if (hasAdvice && !hasSymptoms && !hasMeds && !hasLabs) {
        return "Advice copied to RxPad";
    }
    if (hasFu && !hasSymptoms && !hasMeds && !hasLabs) {
        return "Follow-up copied to RxPad";
    }
    if (hasNotes && voiceStyleBlocks === 0 && !hasExam && !hasDx) {
        return "Clinical notes copied to RxPad";
    }
    const labels = [];
    if (hasSymptoms) labels.push("Symptoms");
    if (hasMeds) labels.push("Medications");
    if (hasLabs) labels.push("Labs");
    if (hasExam) labels.push("Examination");
    if (hasDx) labels.push("Diagnosis");
    if (hasAdvice) labels.push("Advice");
    if (hasFu) labels.push("Follow-up");
    if (hasNotes) labels.push("Notes");
    if (labels.length === 1) return `${labels[0]} copied to RxPad`;
    if (labels.length > 1) return `${labels.join(" · ")} copied to RxPad`;
    return "Copied to RxPad";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/shared/highlightClinicalText.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "highlightClinicalText",
    ()=>highlightClinicalText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
/**
 * Shared clinical text highlighter — bolds conditions, medications, lab values,
 * vitals, durations, pregnancy context, and clinical events.
 *
 * Used across:
 * - GPSummaryCard (narrative)
 * - PatientReportedCard (snapshot)
 * - SbarCriticalCard (situation)
 * - CardRenderer (patient_narrative)
 * - AiPatientTooltip (summary hover)
 */ /**
 * PRIMARY highlight — semibold, dark text for important clinical terms.
 * Used for: conditions, medications, lab values, vitals, clinical events.
 * Follows secondary sidebar pattern: font-semibold text-tp-slate-700.
 */ function HighlightPrimary({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "font-semibold not-italic text-tp-slate-700",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/shared/highlightClinicalText.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, this);
}
_c = HighlightPrimary;
/**
 * SECONDARY highlight — normal weight, muted text for supportive context.
 * Used for: durations, dates, parenthetical info, age context, follow-up timing.
 * Follows secondary sidebar pattern: font-normal text-tp-slate-400.
 * This ensures doctor's eye goes to the clinical term first, not the duration.
 */ function HighlightSecondary({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "font-normal not-italic text-tp-slate-400",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/shared/highlightClinicalText.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, this);
}
_c1 = HighlightSecondary;
/** Backward compat alias */ function HighlightBold({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HighlightPrimary, {
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/shared/highlightClinicalText.tsx",
        lineNumber: 38,
        columnNumber: 10
    }, this);
}
_c2 = HighlightBold;
// ── PRIMARY patterns: important clinical data (bold + dark) ──
const PRIMARY_PATTERNS = [
    // Conditions & diagnoses
    /\bCKD\s+Stage\s+\d+\b/gi,
    /\bType\s+\d+\s+D(?:M|iabetes(?:\s+Mellitus)?)\b/gi,
    /\b(?:Hypertension|HTN|Diabetes(?:\s+Mellitus)?|Dyslipidemia|Hypothyroid(?:ism)?|Pre-?Diabetes|PCOS|Migraine|URTI|AUB|Primigravida|COPD|Asthma|Bronchial\s+Asthma|IHD|Ischemic\s+Heart\s+Disease|Diabetic\s+Nephropathy|Renal\s+Anemia|Hyperparathyroidism|Pre-?eclampsia|Gestational\s+DM|GDM|Anemia|Conjunctivitis|Viral\s+Fever|Pharyngitis|Otitis|Sinusitis|Pneumonia|UTI|Gastritis|Vertigo|Sciatica|Arthritis|Gout|Cellulitis|Fibroid\s+Uterus|Iron\s+Deficiency\s+Anemia|Fatigue\s+Syndrome|AUB-Ovulatory\s+Dysfunction|Migraine\s+without\s+Aura|Acute\s+URTI|Routine\s+ANC|Stable\s+Angina|Reactive\s+Airways)\b/gi,
    /\bpost-?(?:MI|CABG|angioplasty)\b/gi,
    // Common symptoms
    /\b(?:Fever|Headache|Cough|Dry\s+Cough|Fatigue|Dizziness|Nausea|Vomiting|Chest\s+Pain|Back\s+Pain|Pedal\s+(?:Edema|Oedema)|Eye\s+Redness|Breathlessness|Palpitations|Abdominal\s+Pain|Joint\s+Pain|Weight\s+(?:Loss|Gain)|Leg\s+Swelling|Heavy\s+(?:Menstrual\s+)?Bleeding|Irregular\s+Cycles|Reduced\s+Appetite|Poor\s+Sleep|Braxton-?Hicks)\b/gi,
    // Durations as standalone (e.g., "3 days", "2 weeks", "6 months", "18 years")
    /\b\d+\s*(?:days?|weeks?|months?|years?|yr|wk|mo)\b/gi,
    /\b(?:peritoneal|hemo)\s*dialysis\b/gi,
    // Medications
    /\b(?:Telma|Metsmall|Metsmail|Metformin|Paracetamol|Azithromycin|Sumatriptan|Naproxen|Vitamin\s+D\d*|Rosuvastatin|Melatonin|CoQ10|Thyronorm|Folic\s+Acid|Calcium|Amoxicillin|Salbutamol|Autrin|Tranexamic\s+Acid|Iron\+Folic|Amlodipine|Atorvastatin|Telmisartan|Erythropoietin|EPO|Calcitriol|Sevelamer|Pantoprazole|Insulin(?:\s+Glargine)?|Glimepiride|Aspirin|Clopidogrel|Levocetrizine|Budecort|Furosemide|Sulfonamides)\s*\d*\w*\b/gi,
    // Lab values (e.g., HbA1c 9.2%, eGFR 7, Hb 10.2, Creatinine 8.2)
    /\b(?:HbA1c|eGFR|Hb|Creatinine|TSH|LDL|HDL|Hemoglobin|Microalbumin|Triglycerides|FBS|IgE|K\+)\s*(?:\d+\.?\d*\s*%?(?:\s*mg\/dL|\s*mL\/min|\s*mIU\/L|\s*ng\/mL|\s*g\/dL|\s*IU\/mL|\s*mEq\/L)?)/gi,
    /\bNT\s+Scan\b/gi,
    /\bKt\/V\b/gi,
    /\bEcho\b/gi,
    // Vitals (e.g., BP 170/100, SpO2 94%, Pulse 88)
    /\b(?:BP|SpO[₂2]|Pulse|HR)\s*\d+(?:\/\d+)?(?:\s*%|\s*bpm|\s*mmHg)?/gi,
    // Clinical events & counts
    /\b\d+\s*(?:ER|hospital)\s+admissions?\b/gi,
    /\b(?:acute\s+)?fluid\s+overload\b/gi,
    // Pregnancy context
    /\bG\d+P\d+(?:L\d+)?(?:A\d+)?\b/gi,
    /\bLMP\s+\S+/gi,
    /\bEDD\s+\S+/gi,
    // Follow-up overdue
    /\bfollow-?up\s+overdue(?:\s+by\s+\d+\s*d(?:ays?)?)?\b/gi
];
// ── SECONDARY patterns: ONLY parenthetical/bracketed content (tp-slate-400) ──
// Simple rule: only text inside parentheses is secondary.
// Standalone durations, dates, numbers are PRIMARY (dark).
const SECONDARY_PATTERNS = [
    // Full parenthetical blocks: (2yr), (5yr | Active), (childhood), (2019, resolved), etc.
    /\([^)]+\)/gi
];
function highlightClinicalText(text) {
    const matches = [];
    // Collect primary matches
    for (const pat of PRIMARY_PATTERNS){
        pat.lastIndex = 0;
        let m;
        let safety = 0;
        while((m = pat.exec(text)) !== null && safety++ < 100){
            matches.push({
                start: m.index,
                end: m.index + m[0].length,
                type: "primary"
            });
            if (!pat.global) break;
        }
    }
    // Collect secondary matches
    for (const pat of SECONDARY_PATTERNS){
        pat.lastIndex = 0;
        let m;
        let safety = 0;
        while((m = pat.exec(text)) !== null && safety++ < 100){
            matches.push({
                start: m.index,
                end: m.index + m[0].length,
                type: "secondary"
            });
            if (!pat.global) break;
        }
    }
    if (matches.length === 0) return text;
    // Sort by start position; primary wins over secondary when overlapping
    matches.sort((a, b)=>a.start - b.start || (a.type === "primary" ? -1 : 1));
    // Merge overlapping — primary takes precedence
    const merged = [
        matches[0]
    ];
    for(let i = 1; i < matches.length; i++){
        const last = merged[merged.length - 1];
        if (matches[i].start <= last.end) {
            // Overlap: extend range, primary wins
            last.end = Math.max(last.end, matches[i].end);
            if (matches[i].type === "primary") last.type = "primary";
        } else {
            merged.push(matches[i]);
        }
    }
    const parts = [];
    let cursor = 0;
    merged.forEach((m, i)=>{
        if (m.start > cursor) {
            parts.push(text.slice(cursor, m.start));
        }
        const segment = text.slice(m.start, m.end);
        if (m.type === "primary") {
            parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HighlightPrimary, {
                children: segment
            }, `h-${i}`, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/shared/highlightClinicalText.tsx",
                lineNumber: 146,
                columnNumber: 18
            }, this));
        } else {
            parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HighlightSecondary, {
                children: segment
            }, `h-${i}`, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/shared/highlightClinicalText.tsx",
                lineNumber: 148,
                columnNumber: 18
            }, this));
        }
        cursor = m.end;
    });
    if (cursor < text.length) {
        parts.push(text.slice(cursor));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: parts
    }, void 0, false);
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HighlightPrimary");
__turbopack_context__.k.register(_c1, "HighlightSecondary");
__turbopack_context__.k.register(_c2, "HighlightBold");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/shared/FlagArrow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlagArrow",
    ()=>FlagArrow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
function FlagArrow({ flag, className }) {
    const isUp = flag === "high" || flag === "critical";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center text-tp-error-500", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: 8,
            height: 8,
            viewBox: "0 0 8 8",
            fill: "none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: isUp ? "M4 1L7 6H1L4 1Z" : "M4 7L1 2H7L4 7Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/shared/FlagArrow.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/shared/FlagArrow.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/shared/FlagArrow.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = FlagArrow;
var _c;
__turbopack_context__.k.register(_c, "FlagArrow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/shared/sectionInlineKey.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Inline subsection keys inside card bodies — e.g. BP:, SpO₂:, lab short names, Chronic:,
 * Sx:/Dx:/Rx:, Pending:/Overdue: — semibold muted slate.
 *
 * Full-width strip titles use `SectionSummaryBar` (slate-500 semibold on bg-tp-slate-100/70), not this class.
 * V0 and full agent share the same card components, so this applies to both.
 */ __turbopack_context__.s([
    "SECTION_INLINE_SUBKEY_CLASS",
    ()=>SECTION_INLINE_SUBKEY_CLASS
]);
const SECTION_INLINE_SUBKEY_CLASS = "text-tp-slate-400 font-semibold";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/shared/formatLastVisitSectionLabel.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Section header for last-visit blocks — date belongs in the title, not in the body row. */ __turbopack_context__.s([
    "formatLastVisitSectionLabel",
    ()=>formatLastVisitSectionLabel
]);
function formatLastVisitSectionLabel(visitDate) {
    const d = visitDate?.trim();
    if (!d) return "Last Visit";
    return `Last Visit (${d})`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/shared/formatWithHierarchy.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatBulletWithHierarchy",
    ()=>formatBulletWithHierarchy,
    "formatWithHierarchy",
    ()=>formatWithHierarchy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function formatWithHierarchy(text, primaryClass = "font-medium text-tp-slate-700", secondaryClass = "font-normal text-tp-slate-400") {
    // Match text with parenthetical suffix: "Primary text (details)"
    const match = text.match(/^(.+?)(\s*\([^)]+\))$/);
    if (match) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: primaryClass,
                    children: match[1]
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/shared/formatWithHierarchy.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: secondaryClass,
                    children: match[2]
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/shared/formatWithHierarchy.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    // No brackets — render as primary
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: primaryClass,
        children: text
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/shared/formatWithHierarchy.tsx",
        lineNumber: 70,
        columnNumber: 10
    }, this);
}
function formatBulletWithHierarchy(text, primaryClass, secondaryClass) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-tp-slate-400 mr-[6px]",
                children: "•"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/dr-agent/shared/formatWithHierarchy.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            formatWithHierarchy(text, primaryClass, secondaryClass)
        ]
    }, void 0, true);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/shared/DirectionArrow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DirectionArrow",
    ()=>DirectionArrow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function DirectionArrow({ direction }) {
    if (direction === "up") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
        className: "inline-block text-tp-error-500",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M5 2L8 6H2L5 2Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/shared/DirectionArrow.tsx",
            lineNumber: 25,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/shared/DirectionArrow.tsx",
        lineNumber: 19,
        columnNumber: 7
    }, this);
    if (direction === "down") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
        className: "inline-block text-tp-success-600",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M5 8L2 4H8L5 8Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/shared/DirectionArrow.tsx",
            lineNumber: 36,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/shared/DirectionArrow.tsx",
        lineNumber: 30,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
        className: "inline-block text-tp-slate-400",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M2 5H8",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round"
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/dr-agent/shared/DirectionArrow.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/shared/DirectionArrow.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = DirectionArrow;
var _c;
__turbopack_context__.k.register(_c, "DirectionArrow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/shared/use-chart-linked-patient-id.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChartLinkedPatientId",
    ()=>useChartLinkedPatientId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useChartLinkedPatientId(fallback) {
    _s();
    const sp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    return sp.get("patientId")?.trim() || fallback;
}
_s(useChartLinkedPatientId, "ykwYSAlrlWFP3j1FXfKhdo1cilA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ─────────────────────────────────────────────────────────────
// Doctor Agent v0 — Mock Patient Data (7 patients)
// ─────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "PATIENT_DOCUMENTS",
    ()=>PATIENT_DOCUMENTS,
    "PATIENT_TOOLTIP_SUMMARIES",
    ()=>PATIENT_TOOLTIP_SUMMARIES,
    "SMART_SUMMARY_BY_CONTEXT",
    ()=>SMART_SUMMARY_BY_CONTEXT
]);
const SMART_SUMMARY_BY_CONTEXT = {
    // ═══════════════ 1. SHYAM GR — GP (Viral Fever + DM + HTN) ═══════════════
    "__patient__": {
        specialtyTags: [
            "General Medicine",
            "Diabetology"
        ],
        followUpOverdueDays: 5,
        patientNarrative: "25-year-old male presenting with Fever since 3 days with evening spikes, Dry Cough 2 days, and Eye Redness bilateral. Known Diabetes (1yr) and Hypertension (6mo), on Telma 20mg and Metsmail 500mg. Allergic to Dust and Egg. Dental: upper left T22 implant crown (hygiene review), T24 caries watch buccal with aging sealant.",
        sbarSituation: "25M, 3-day fever with evening spikes, dry cough, bilateral conjunctivitis. Known Diabetes 1yr + Hypertension 6mo. BP 70/60, SpO2 93%, Temp 104°F. Working Dx: Viral fever, conjunctivitis.",
        familyHistory: [
            "Thyroid (Mom, Aunt)",
            "Diabetes (Father)"
        ],
        lifestyleNotes: [
            "Smoking (2yr, Active)",
            "Alcohol (occasional, Active)"
        ],
        allergies: [
            "Dust",
            "Egg"
        ],
        chronicConditions: [
            "Diabetes (1yr, Active, on Metsmail 500mg)",
            "Hypertension (6mo, Active)"
        ],
        lastVisit: {
            date: "27 Jan'26",
            vitals: "BP: 120/78 | Pulse: 82 | SpO2: 97% | Temp: 101°F | Wt: 94kg",
            symptoms: "Fever (2d, high, evening spikes), Eye redness (2d, bilateral)",
            examination: "Eyes: Conjunctival congestion bilateral mild, Chest: Clear, Throat: Mild pharyngeal congestion. Dental: U/L quadrant — T22 implant crown (peri-implant plaque buccal), T24 occlusal sealant with buccal caries watch (bitewing due)",
            diagnosis: "Viral fever, Conjunctivitis",
            medication: "Telma 20mg (Twice daily | Before food), Metsmail 500mg (Once daily | Before food), Paracetamol 650mg (As needed)",
            labTestsSuggested: "CBC, LFT",
            advice: "Rest, fluids 3L/day, avoid dust exposure, return if fever persists >3d",
            followUp: "2 weeks · Fri, 10 Feb'26"
        },
        labFlagCount: 7,
        todayVitals: {
            bp: "70/60",
            pulse: "78",
            spo2: "93",
            temp: "104",
            weight: "94",
            height: "175",
            bmi: "30.7"
        },
        activeMeds: [
            "Telma 20mg (Twice daily)",
            "Metsmail 500mg (Once daily)"
        ],
        keyLabs: [
            {
                name: "HbA1c",
                value: "8.1",
                unit: "%",
                flag: "high",
                refRange: "<7%"
            },
            {
                name: "Fasting Glucose",
                value: "168",
                unit: "mg/dL",
                flag: "high",
                refRange: "70-100"
            },
            {
                name: "TSH",
                value: "5.8",
                unit: "mIU/L",
                flag: "high",
                refRange: "0.4-4.0"
            },
            {
                name: "LDL",
                value: "142",
                unit: "mg/dL",
                flag: "high",
                refRange: "<100"
            },
            {
                name: "Vitamin D",
                value: "18",
                unit: "ng/mL",
                flag: "low",
                refRange: "30-100"
            },
            {
                name: "Creatinine",
                value: "1.4",
                unit: "mg/dL",
                flag: "high",
                refRange: "0.7-1.2"
            },
            {
                name: "Microalbumin",
                value: "45",
                unit: "mg/L",
                flag: "high",
                refRange: "<30"
            }
        ],
        dueAlerts: [
            "HbA1c recheck (quarterly)",
            "Lipid Profile (6-monthly)"
        ],
        recordAlerts: [
            "Uploaded Rx from Dr. Sharma (Cardiology) not reviewed"
        ],
        concernTrend: {
            label: "SpO₂",
            values: [
                97,
                96,
                94,
                93
            ],
            labels: [
                "20 Jan",
                "22 Jan",
                "24 Jan",
                "27 Jan"
            ],
            unit: "%",
            tone: "red"
        },
        symptomCollectorData: {
            reportedAt: "Today, 10:15 AM",
            symptoms: [
                {
                    name: "Fever",
                    duration: "3 days",
                    severity: "High",
                    notes: "Evening spikes"
                },
                {
                    name: "Dry Cough",
                    duration: "2 days",
                    severity: "Moderate",
                    notes: "Night worsening"
                }
            ],
            medicalHistory: [
                "Hypertension (3yr)",
                "Diabetes (2yr)"
            ],
            familyHistory: [
                "Diabetes (Father)"
            ],
            allergies: [
                "Dust (3yr)",
                "Gastric discomfort (2yr)"
            ],
            lifestyle: [
                "Smoking (2yr)",
                "Drinking (2yr)"
            ],
            questionsToDoctor: [
                "Is my blood sugar level concerning?",
                "Should I get a chest X-ray for the cough?"
            ],
            currentMedications: [
                "Telma 20mg (Twice daily)",
                "Metsmall 500mg (Once daily)"
            ],
            suggestedMeds: [
                "Paracetamol 650mg",
                "Azithromycin 500mg"
            ],
            lastVisitSummary: "last visited on 27 Jan'26 with fever, diagnosed Viral fever and Conjunctivitis, suggested Paracetamol 650mg and Azithromycin 500mg; dental review T22 implant hygiene and T24 caries surveillance",
            isNewPatient: false
        }
    },
    // ═══════════════ 2. NEHA GUPTA — MASTER PATIENT (ALL specialties, ALL card types) ═══════════════
    // Demonstrates: Returning patient with COMPREHENSIVE data covering every specialty and card type.
    // NO symptomCollectorData — patient came directly without filling intake form.
    // Agent shows Patient Summary directly on open (no Patient Reported card).
    // 32F: Asthma + Hypothyroid + Early Pregnancy (12wk) + PCOS history + Mild Myopia
    "apt-neha": {
        specialtyTags: [
            "General Medicine",
            "Pulmonology",
            "Gynecology",
            "Obstetrics",
            "Ophthalmology"
        ],
        followUpOverdueDays: 3,
        patientNarrative: "32-year-old female with bronchial asthma since childhood and hypothyroidism. Recently confirmed pregnancy (12 weeks). PCOS history (resolved). Presenting for asthma follow-up and early ANC.",
        sbarSituation: "32F, G1P0 12wk gestation, bronchial asthma (childhood) + hypothyroidism (3yr). Inhaler use increased this week. Presenting for asthma follow-up and early ANC. Multi-specialty review needed.",
        familyHistory: [
            "Asthma (Mother)",
            "Thyroid (Maternal Aunt)",
            "Gestational DM (Elder Sister)",
            "Breast Cancer (Paternal Aunt)"
        ],
        lifestyleNotes: [
            "Yoga 3x/week (Active)",
            "Vegetarian (Active)",
            "Non-smoker",
            "No alcohol"
        ],
        allergies: [
            "Aspirin",
            "Penicillin"
        ],
        chronicConditions: [
            "Bronchial Asthma (since childhood, Active, on Budecort 200mcg)",
            "Hypothyroidism (3yr, Active, on Thyronorm 50mcg)"
        ],
        receptionistIntakeNotes: [
            "Pregnancy test positive 2 weeks ago",
            "Wants to discuss medication safety in pregnancy",
            "Inhaler use increased this week"
        ],
        lastVisit: {
            date: "18 Feb'26",
            vitals: "BP: 110/72 | Pulse: 76 | SpO2: 97% | Temp: 98.4°F | Wt: 56kg",
            symptoms: "Nocturnal cough 1wk, mild wheeze on exertion",
            examination: "Chest: Bilateral scattered rhonchi (no crepts), Lungs: PEFR 320 (expected 380), Abdomen: Soft, non-tender",
            diagnosis: "Acute exacerbation of bronchial asthma, Hypothyroid on Rx",
            medication: "Budecort 200mcg (Twice daily), Deriphyllin retard 150mg (Twice daily), Thyronorm 50mcg (Once daily, Before food), Montelukast 10mg (At bedtime)",
            labTestsSuggested: "PEFR monitoring, TSH, IgE, CBC, Vitamin D",
            advice: "Avoid dust exposure, use inhaler before exercise, steam inhalation, continue thyroid medication",
            followUp: "2 weeks · 4 Mar'26"
        },
        labFlagCount: 5,
        todayVitals: {
            bp: "112/74",
            pulse: "78",
            spo2: "96",
            temp: "98.6",
            weight: "57",
            height: "160",
            bmi: "22.3",
            bloodSugar: "108"
        },
        activeMeds: [
            "Budecort 200mcg (Twice daily)",
            "Deriphyllin 150mg (Twice daily)",
            "Thyronorm 50mcg (Once daily)",
            "Montelukast 10mg (At bedtime)",
            "Folic Acid 5mg (Once daily)"
        ],
        keyLabs: [
            {
                name: "TSH",
                value: "5.2",
                unit: "mIU/L",
                flag: "high",
                refRange: "0.4-4.0"
            },
            {
                name: "IgE",
                value: "380",
                unit: "IU/mL",
                flag: "high",
                refRange: "<100"
            },
            {
                name: "Hemoglobin",
                value: "10.8",
                unit: "g/dL",
                flag: "low",
                refRange: "12-16"
            },
            {
                name: "Vitamin D",
                value: "16",
                unit: "ng/mL",
                flag: "low",
                refRange: "30-100"
            },
            {
                name: "Fasting Blood Sugar",
                value: "108",
                unit: "mg/dL",
                flag: "high",
                refRange: "70-100"
            }
        ],
        dueAlerts: [
            "PEFR recheck due",
            "TSH recheck (quarterly)",
            "NT Scan due (11-14wk)",
            "First trimester screening",
            "Td/TT vaccine due"
        ],
        recordAlerts: [
            "Allergy testing report from City Chest Hospital uploaded",
            "USG confirmation of pregnancy (8wk) uploaded"
        ],
        concernTrend: {
            label: "SpO₂",
            values: [
                98,
                97,
                97,
                96
            ],
            labels: [
                "Dec'25",
                "Jan'26",
                "Feb'26",
                "Mar'26"
            ],
            unit: "%",
            tone: "amber"
        },
        // NOTE: No symptomCollectorData — master patient for testing ALL card types without intake form
        gynecData: {
            menarche: "13 years",
            lmp: "28 Dec'25",
            cycleLength: "30-35 days",
            cycleRegularity: "Irregular",
            flowDuration: "4-5 days",
            flowIntensity: "Moderate",
            flowClots: "No",
            padsPerDay: "3",
            painScore: "None",
            alerts: [
                "PCOS history (Monitor for GDM in pregnancy)",
                "Irregular cycles normalized post-treatment"
            ]
        },
        obstetricData: {
            gravida: 1,
            para: 0,
            living: 0,
            abortion: 0,
            ectopic: 0,
            lmp: "28 Dec'25",
            edd: "4 Oct'26",
            gestationalWeeks: "12wk 2d",
            bloodGroupPatient: "B+ve",
            bloodGroupHusband: "O+ve",
            maritalStatus: "Married",
            marriageDuration: "2 years",
            consanguineous: "No",
            currentExam: {
                pallor: "Nil",
                oedema: "Nil",
                bmi: "22.3",
                bp: "112/74",
                fundusHeight: "Not palpable",
                presentation: "Not applicable (early)",
                liquor: "Normal (USG)",
                fetalHeartRate: "162 bpm",
                note: "Early pregnancy, routine ANC"
            },
            ancScheduler: [
                {
                    testName: "NT Scan",
                    weekRange: "11-14wk",
                    status: "Due"
                },
                {
                    testName: "First Trimester Screening",
                    weekRange: "11-13wk",
                    status: "Due"
                },
                {
                    testName: "Dating Scan",
                    weekRange: "6-9wk",
                    status: "Completed"
                }
            ],
            alerts: [
                "Asthma in pregnancy (Use pregnancy-safe inhalers only)",
                "TSH elevated (Adjust Thyronorm dose for pregnancy)",
                "PCOS history (Screen for GDM at 24-28wk)",
                "Family hx gestational DM (High alert)"
            ]
        },
        ophthalData: {
            vaRight: "6/9",
            vaLeft: "6/12",
            nearVaRight: "N6",
            nearVaLeft: "N8",
            iop: "14/14",
            slitLamp: "Normal",
            fundus: "Normal",
            lastExamDate: "Oct 2025",
            glassPrescription: "RE: -1.25DS, LE: -1.75DS",
            alerts: [
                "Mild myopia (Stable)",
                "Screen for pregnancy-related vision changes",
                "Review refraction post-delivery"
            ]
        }
    },
    // ═══════════════ 3. ANJALI PATEL — GP + Gynec + Ophthal ═══════════════
    "apt-anjali": {
        specialtyTags: [
            "General Medicine",
            "Ophthalmology"
        ],
        followUpOverdueDays: 0,
        patientNarrative: "28-year-old female with Headache since 4 days with eye strain. Known Migraine without Aura, on Sumatriptan and Naproxen. Mild Myopia (stable). Last seen 22 Jan for routine eye check.",
        familyHistory: [
            "Migraine (Mother)"
        ],
        lifestyleNotes: [
            "Screen time >8hr/day (Active)",
            "No exercise (Active)"
        ],
        allergies: [],
        chronicConditions: [
            "Migraine (3yr, Active, on Sumatriptan 50mg)"
        ],
        lastVisit: {
            date: "15 Jan'26",
            symptoms: "Headache frontal, photophobia, nausea",
            examination: "Neuro: Normal, Fundus: No papilledema",
            diagnosis: "Migraine without aura",
            medication: "Sumatriptan 50mg (As needed), Paracetamol 500mg (As needed)",
            labTestsSuggested: "Vitamin D, B12",
            doctorName: "Dr. Sheela BR (Paediatrics)"
        },
        labFlagCount: 1,
        todayVitals: {
            bp: "110/70",
            pulse: "72",
            spo2: "99",
            temp: "98.4",
            weight: "58",
            height: "162"
        },
        activeMeds: [
            "Sumatriptan 50mg (As needed)"
        ],
        keyLabs: [
            {
                name: "Vitamin D",
                value: "18",
                unit: "ng/mL",
                flag: "low",
                refRange: "30-100"
            }
        ],
        dueAlerts: [],
        symptomCollectorData: {
            reportedAt: "Today, 09:45 AM",
            symptoms: [
                {
                    name: "Headache",
                    duration: "4 days",
                    severity: "Moderate",
                    notes: "Frontal, throbbing"
                },
                {
                    name: "Photophobia",
                    duration: "2 days",
                    severity: "Mild"
                }
            ],
            medicalHistory: [
                "Migraine (episodic)"
            ],
            currentMedications: [
                "Sumatriptan 50mg (As needed)"
            ],
            suggestedMeds: [
                "Naproxen 250mg",
                "Vitamin D 60K"
            ],
            lastVisitSummary: "last visited on 15 Jan'26 with headache and photophobia, diagnosed Migraine without aura, suggested Naproxen 250mg and Vitamin D 60K",
            isNewPatient: false
        },
        gynecData: {
            menarche: "13 years",
            lmp: "10 Feb'26",
            cycleLength: "28-30 days",
            cycleRegularity: "Regular",
            flowDuration: "4 days",
            flowIntensity: "Moderate",
            flowClots: "No",
            padsPerDay: "3",
            painScore: "Mild (Before Menses)"
        },
        ophthalData: {
            vaRight: "6/6",
            vaLeft: "6/6",
            nearVaRight: "N8",
            nearVaLeft: "N8",
            slitLamp: "Normal",
            fundus: "Normal",
            lastExamDate: "15 Jan'26",
            alerts: [
                "Digital eye strain, recommend 20-20-20 rule"
            ]
        }
    },
    // ═══════════════ 3. VIKRAM SINGH — GP + Ophthal (F/U overdue) ═══════════════
    "apt-vikram": {
        specialtyTags: [
            "General Medicine",
            "Cardiology"
        ],
        followUpOverdueDays: 12,
        patientNarrative: "42-year-old male with Fatigue since 2 weeks, Poor Sleep quality, and late meals. Known Hypertension (3yr) and Dyslipidemia (2yr), on Amlodipine 5mg and Atorvastatin 10mg. Follow-up overdue by 12 days.",
        familyHistory: [
            "CAD (Father)",
            "DM (Mother)"
        ],
        lifestyleNotes: [
            "Sedentary (Active)",
            "Late dinners (Active)",
            "Alcohol (weekends, Active)"
        ],
        allergies: [
            "Sulfa drugs"
        ],
        chronicConditions: [
            "Hypertension (3yr, Active, on Telma 40mg)",
            "Dyslipidemia (1yr, Active)"
        ],
        lastVisit: {
            date: "20 Dec'25",
            symptoms: "Fatigue, poor sleep, occasional chest heaviness on exertion",
            examination: "CVS: S1S2 normal (no murmur), Chest: Clear",
            diagnosis: "HTN Stage I, Dyslipidemia, Fatigue syndrome",
            medication: "Telma 40mg (Once daily | Before food), Rosuvastatin 10mg (At bedtime), Melatonin 3mg (At bedtime)",
            labTestsSuggested: "Lipid Panel, HbA1c, TSH, ECG",
            followUp: "2 weeks · Fri, 3 Jan'26"
        },
        labFlagCount: 3,
        todayVitals: {
            bp: "138/88",
            pulse: "84",
            spo2: "97",
            temp: "98.6",
            weight: "82",
            height: "172",
            bmi: "27.7"
        },
        activeMeds: [
            "Telma 40mg (Once daily)",
            "Rosuvastatin 10mg (At bedtime)",
            "Melatonin 3mg (At bedtime)"
        ],
        keyLabs: [
            {
                name: "LDL",
                value: "138",
                unit: "mg/dL",
                flag: "high",
                refRange: "<100"
            },
            {
                name: "HbA1c",
                value: "6.2",
                unit: "%",
                flag: "high",
                refRange: "<5.7"
            },
            {
                name: "Triglycerides",
                value: "195",
                unit: "mg/dL",
                flag: "high",
                refRange: "<150"
            }
        ],
        dueAlerts: [
            "ECG pending",
            "Lipid recheck overdue"
        ],
        symptomCollectorData: {
            reportedAt: "Today, 08:15 AM",
            symptoms: [
                {
                    name: "Fatigue",
                    duration: "2 weeks",
                    severity: "Moderate",
                    notes: ""
                },
                {
                    name: "Poor Sleep quality",
                    duration: "2 weeks",
                    severity: "Mild",
                    notes: ""
                },
                {
                    name: "Late meals",
                    duration: "ongoing",
                    severity: "Mild",
                    notes: ""
                }
            ]
        },
        ophthalData: {
            vaRight: "6/9",
            vaLeft: "6/9",
            nearVaRight: "N8",
            nearVaLeft: "N8",
            iop: "14/16",
            fundus: "Grade I arteriolar narrowing",
            lastExamDate: "20 Dec'25",
            alerts: [
                "Presbyopia onset",
                "Arteriolar narrowing, correlate with HTN control"
            ]
        }
    },
    // ═══════════════ 4. PRIYA RAO — Obstetric (37wk Primigravida) ═══════════════
    "apt-priya": {
        specialtyTags: [
            "Obstetrics",
            "High-risk Pregnancy"
        ],
        followUpOverdueDays: 0,
        patientNarrative: "26-year-old Primigravida at 38 weeks gestation. Pedal Edema since 3 days, Back Pain 2 days, occasional Braxton-Hicks. BP trending high (138/88). Known Hypothyroid, on Thyronorm 50mcg. High-risk: advanced gestation with edema.",
        familyHistory: [
            "Pre-eclampsia (Mother)",
            "GDM (Sister)"
        ],
        lifestyleNotes: [],
        allergies: [
            "Sulfa drugs"
        ],
        chronicConditions: [
            "Hypothyroid (2yr, Active, on Thyronorm 50mcg)"
        ],
        lastVisit: {
            date: "25 Feb'26",
            symptoms: "Routine ANC, mild ankle swelling",
            examination: "Uterus: 36wk (cephalic), FHS: 142/min, BP: 128/82",
            diagnosis: "Routine ANC, Hypothyroid on Rx",
            medication: "Thyronorm 50mcg (Once daily | Before food), Folic Acid 5mg (Once daily), Iron+Folic (Once daily | After food), Calcium 500mg (Twice daily)",
            labTestsSuggested: "CBC, TSH, Urine routine",
            followUp: "1 week · Tue, 4 Mar'26"
        },
        labFlagCount: 2,
        todayVitals: {
            bp: "130/85",
            pulse: "88",
            spo2: "98",
            temp: "98.2",
            weight: "68"
        },
        activeMeds: [
            "Thyronorm 50mcg (Once daily)",
            "Folic Acid 5mg (Once daily)",
            "Iron+Folic (Once daily)",
            "Calcium 500mg (Twice daily)"
        ],
        keyLabs: [
            {
                name: "Hemoglobin",
                value: "11.2",
                unit: "g/dL",
                flag: "low",
                refRange: "12-16"
            },
            {
                name: "TSH",
                value: "4.8",
                unit: "mIU/L",
                flag: "high",
                refRange: "0.4-4.0"
            }
        ],
        dueAlerts: [
            "Dating scan overdue",
            "TSH recheck due"
        ],
        symptomCollectorData: {
            reportedAt: "Today, 09:00 AM",
            symptoms: [
                {
                    name: "Pedal Edema",
                    duration: "3 days",
                    severity: "Mild",
                    notes: ""
                },
                {
                    name: "Back Pain",
                    duration: "2 days",
                    severity: "Moderate",
                    notes: ""
                },
                {
                    name: "Braxton-Hicks contractions",
                    duration: "occasional",
                    severity: "Mild",
                    notes: ""
                }
            ]
        },
        obstetricData: {
            gravida: 1,
            para: 0,
            living: 0,
            abortion: 0,
            ectopic: 0,
            lmp: "14 Jun'25",
            edd: "21 Mar'26",
            gestationalWeeks: "38wk 2d",
            bloodGroupPatient: "A+ve",
            bloodGroupHusband: "B+ve",
            maritalStatus: "Married",
            marriageDuration: "3 years",
            consanguineous: "No",
            currentExam: {
                pallor: "Mild",
                oedema: "Pedal edema (Grade I)",
                bmi: "25.8",
                bp: "130/85",
                fundusHeight: "36cm",
                presentation: "Cephalic",
                liquor: "Adequate",
                fetalHeartRate: "142 bpm",
                note: "Term pregnancy, monitor BP"
            },
            ancScheduler: [
                {
                    testName: "NST",
                    weekRange: "37-40wk",
                    status: "Due"
                },
                {
                    testName: "GBS Screening",
                    weekRange: "35-37wk",
                    status: "Completed"
                },
                {
                    testName: "Growth Scan",
                    weekRange: "34-36wk",
                    status: "Completed"
                }
            ],
            alerts: [
                "BP borderline, monitor for pre-eclampsia",
                "Family history of pre-eclampsia"
            ]
        }
    },
    // ═══════════════ 5. ARJUN S — Pediatric (4y, growth concerns) ═══════════════
    "apt-arjun": {
        specialtyTags: [
            "Pediatrics"
        ],
        followUpOverdueDays: 0,
        patientNarrative: "4-year-old male with Dry Cough 3 days and Reduced Appetite since 1 week. Weight at 25th percentile, Height at 15th percentile — growth monitoring in progress. Vaccine: MMR-2 overdue.",
        familyHistory: [
            "Asthma (Father)"
        ],
        lifestyleNotes: [
            "Picky eater",
            "Screen time 3hr/day"
        ],
        allergies: [],
        chronicConditions: [],
        lastVisit: {
            date: "10 Feb'26",
            symptoms: "URTI, mild wheeze",
            examination: "Chest: Bilateral wheeze (no crepts), Throat: Congested, Ears: Normal",
            diagnosis: "Acute URTI with reactive airways",
            medication: "Amoxicillin 250mg (Three times daily, 5 days), Salbutamol syrup 2ml (Three times daily, 3 days), Cetirizine syrup 2.5ml (Once daily, 5 days)",
            labTestsSuggested: "CBC if no improvement"
        },
        labFlagCount: 0,
        todayVitals: {
            bp: "90/60",
            pulse: "110",
            spo2: "97",
            temp: "99.2",
            weight: "14",
            height: "98"
        },
        activeMeds: [],
        keyLabs: [],
        dueAlerts: [
            "MMR-2 overdue"
        ],
        symptomCollectorData: {
            reportedAt: "Today, 10:30 AM",
            symptoms: [
                {
                    name: "Dry Cough",
                    duration: "3 days",
                    severity: "Mild",
                    notes: ""
                },
                {
                    name: "Reduced Appetite",
                    duration: "1 week",
                    severity: "Moderate",
                    notes: ""
                }
            ]
        },
        pediatricsData: {
            ageDisplay: "4 years",
            heightCm: 98,
            heightPercentile: "25th",
            weightKg: 14,
            weightPercentile: "15th",
            ofcCm: 50,
            bmiPercentile: "20th",
            vaccinesPending: 3,
            vaccinesOverdue: 1,
            overdueVaccineNames: [
                "MMR-2"
            ],
            milestoneNotes: [
                "Speech delay noted by parent, 2-word sentences only"
            ],
            feedingNotes: [
                "Picky eater",
                "Milk-dependent",
                "Poor solid intake"
            ],
            lastGrowthDate: "10 Feb'26",
            alerts: [
                "Weight below expected (15th %ile)",
                "Speech delay, consider eval"
            ]
        }
    },
    // ═══════════════ 6. LAKSHMI K — Gynec (Heavy bleeding, perimenopause) ═══════════════
    "apt-lakshmi": {
        specialtyTags: [
            "Gynecology",
            "Endocrinology"
        ],
        followUpOverdueDays: 0,
        patientNarrative: "45-year-old female with Heavy Menstrual Bleeding since 6 months, increasing Fatigue, and Irregular Cycles (35-40 days). Known Hypothyroid and Iron Deficiency Anemia, on Thyronorm 75mcg and Autrin. Perimenopause evaluation needed.",
        familyHistory: [
            "Breast cancer (Aunt)",
            "Thyroid (Mother)"
        ],
        lifestyleNotes: [
            "Vegetarian (Active)",
            "Walks 20min/day (Active)"
        ],
        allergies: [
            "Ibuprofen"
        ],
        chronicConditions: [
            "Hypothyroid (Active, on Thyronorm 75mcg)",
            "PCOS (8yr, Inactive)"
        ],
        lastVisit: {
            date: "20 Jan'26",
            symptoms: "Heavy flow 7 days, fatigue, hair thinning",
            examination: "General: Pallor +, Thyroid scar noted, P/A: Soft, P/V: Uterus bulky (no tenderness)",
            diagnosis: "AUB-Ovulatory dysfunction, Iron deficiency anemia, Hypothyroid",
            medication: "Thyronorm 75mcg (Once daily | Before food), Autrin capsule (Once daily | After food), Tranexamic acid 500mg (Three times daily | During flow)",
            labTestsSuggested: "CBC, TSH, Iron studies, USG pelvis",
            followUp: "6 weeks · Mon, 3 Mar'26"
        },
        labFlagCount: 3,
        todayVitals: {
            bp: "118/76",
            pulse: "92",
            spo2: "98",
            temp: "98.4",
            weight: "65",
            height: "158"
        },
        activeMeds: [
            "Thyronorm 75mcg (Once daily)",
            "Autrin capsule (Once daily)",
            "Tranexamic acid 500mg (Three times daily)"
        ],
        keyLabs: [
            {
                name: "Hemoglobin",
                value: "9.2",
                unit: "g/dL",
                flag: "low",
                refRange: "12-16"
            },
            {
                name: "TSH",
                value: "6.8",
                unit: "mIU/L",
                flag: "high",
                refRange: "0.4-4.0"
            },
            {
                name: "Fasting Blood Sugar",
                value: "112",
                unit: "mg/dL",
                flag: "high",
                refRange: "70-100"
            }
        ],
        dueAlerts: [
            "USG pelvis pending"
        ],
        symptomCollectorData: {
            reportedAt: "Today, 11:00 AM",
            symptoms: [
                {
                    name: "Heavy Menstrual Bleeding",
                    duration: "6 months",
                    severity: "Moderate",
                    notes: ""
                },
                {
                    name: "Fatigue",
                    duration: "6 months",
                    severity: "Moderate",
                    notes: ""
                },
                {
                    name: "Irregular Cycles",
                    duration: "35-40 days",
                    severity: "Mild",
                    notes: ""
                }
            ]
        },
        gynecData: {
            menarche: "13 years",
            lmp: "02 Nov'25",
            cycleLength: "35-40 days",
            cycleRegularity: "Irregular",
            flowDuration: "7 days",
            flowIntensity: "Heavy",
            flowClots: "Yes",
            padsPerDay: "5",
            painScore: "Moderate (During Menses)",
            lifecycle: "Perimenopause",
            alerts: [
                "Heavy flow + low Hb (compound alert)",
                "Pap smear overdue (>1yr)"
            ]
        }
    },
    // ═══════════════ 7. RAMESH M — Zero Data (New Patient) ═══════════════
    "apt-zerodata": {
        specialtyTags: [],
        followUpOverdueDays: 0,
        patientNarrative: "New patient. Patient reports Joint Pain and morning stiffness since 1 week. Allergic to Sulfonamides. No prior clinical history available.",
        allergies: [
            "Sulfonamides"
        ],
        chronicConditions: [],
        labFlagCount: 0,
        keyLabs: [],
        dueAlerts: [],
        symptomCollectorData: {
            reportedAt: "Today, 09:30 AM",
            symptoms: [
                {
                    name: "Knee Pain",
                    duration: "1 week",
                    severity: "Moderate",
                    notes: "Right knee, worse on climbing stairs"
                },
                {
                    name: "Morning Stiffness",
                    duration: "3 days",
                    severity: "Mild",
                    notes: "Lasts about 15-20 minutes"
                }
            ],
            medicalHistory: [
                "Childhood asthma (resolved)",
                "Appendectomy (2018)"
            ],
            allergies: [
                "Sulfonamides"
            ],
            currentMedications: [
                "Vit D3 60K (weekly)",
                "Calcium 500mg (daily)"
            ],
            lastVisitSummary: undefined,
            isNewPatient: true
        }
    },
    // ═══════════════ 8. SURESH NAIR — Returning patient, NO symptom collector ═══════════════
    // Demonstrates: Full historical data available but patient did NOT fill symptom collector
    // Agent must work with historical context only, no self-reported symptoms
    "reg-suresh": {
        specialtyTags: [
            "General Medicine",
            "Cardiology"
        ],
        followUpOverdueDays: 0,
        patientNarrative: "58-year-old male with stable ischemic heart disease and controlled hypertension. Post-angioplasty (2024), on dual antiplatelet therapy.",
        familyHistory: [
            "MI (Father, age 55)",
            "Stroke (Mother, age 68)"
        ],
        lifestyleNotes: [
            "Ex-smoker (quit 2023, Inactive)",
            "Walks 20 min/day (Active)"
        ],
        allergies: [
            "Aspirin (GI intolerance, switched to Clopidogrel)"
        ],
        chronicConditions: [
            "Ischemic Heart Disease (2yr, Active, on Clopidogrel 75mg)",
            "Hypertension (5yr, Active, on Telmisartan 40mg)"
        ],
        lastVisit: {
            date: "10 Feb'26",
            vitals: "BP: 128/82 | Pulse: 72 | SpO2: 98% | Temp: 98.4°F | Wt: 76kg",
            symptoms: "Routine follow-up, no new complaints",
            examination: "CVS: S1S2 normal (no murmur), Chest: Clear, Extremities: Mild pedal edema resolved",
            diagnosis: "Stable IHD on Rx, HTN controlled",
            medication: "Clopidogrel 75mg (Once daily), Atorvastatin 40mg (At bedtime), Metoprolol 25mg (Twice daily), Telmisartan 40mg (Once daily)",
            labTestsSuggested: "Lipid Profile, Renal Panel, ECG",
            advice: "Continue exercise, low-salt diet, medication compliance",
            followUp: "3 months · 10 May'26",
            doctorName: "Dr. Ravi Mehta (Cardiology)"
        },
        labFlagCount: 2,
        todayVitals: {
            bp: "132/84",
            pulse: "74",
            spo2: "98",
            temp: "98.6",
            weight: "76",
            bmi: "26.1"
        },
        activeMeds: [
            "Clopidogrel 75mg (Once daily)",
            "Atorvastatin 40mg (At bedtime)",
            "Metoprolol 25mg (Twice daily)",
            "Telmisartan 40mg (Once daily)"
        ],
        keyLabs: [
            {
                name: "LDL",
                value: "118",
                unit: "mg/dL",
                flag: "high",
                refRange: "<100"
            },
            {
                name: "Triglycerides",
                value: "178",
                unit: "mg/dL",
                flag: "high",
                refRange: "<150"
            }
        ],
        dueAlerts: [
            "ECG due (annual)",
            "Echo follow-up (post-angioplasty)"
        ],
        recordAlerts: [
            "Angioplasty records from City Heart Hospital (2024) uploaded"
        ],
        concernTrend: {
            label: "LDL",
            values: [
                142,
                128,
                118
            ],
            labels: [
                "Jun 25",
                "Oct 25",
                "Feb 26"
            ],
            unit: "mg/dL",
            tone: "teal"
        }
    },
    // ═══════════════ CKD STAGE 5 — SBAR/POMR/PARTIAL DATA DEMO ═══════════════
    "apt-ramesh-ckd": {
        specialtyTags: [
            "Nephrology",
            "Cardiology",
            "Endocrinology",
            "General Medicine"
        ],
        followUpOverdueDays: 8,
        patientNarrative: "76-year-old male with CKD Stage 5 on peritoneal dialysis since Jan 2024, Type 2 DM 18 years, Hypertension 12 years, IHD post-MI (2021). 2 ER admissions in past 12 months for acute fluid overload. Routine nephrology review today.",
        familyHistory: [
            "CKD (Father, died age 68)",
            "Diabetes (Mother, Brother)",
            "Stroke (Paternal Uncle)"
        ],
        lifestyleNotes: [
            "Non-smoker",
            "No alcohol",
            "Renal diet (Low K+, low phosphate, protein restricted, Active)",
            "CAPD 4 exchanges/day, 2L bags (Active)"
        ],
        allergies: [
            "Iodinated Contrast",
            "Sulfonamides"
        ],
        chronicConditions: [
            "CKD Stage 5 (5yr, Active, on Furosemide 40mg)",
            "Type 2 Diabetes Mellitus (18yr, Active, on Insulin Glargine 18U)"
        ],
        lastVisit: {
            date: "02 Mar'26",
            vitals: "BP 162/96, Pulse 84, SpO₂ 95%, Wt 73kg",
            symptoms: "Routine nephrology review, mild pedal oedema",
            examination: "Extremities: Bilateral pitting oedema (grade 1), JVP: Normal, Lungs: Clear",
            diagnosis: "CKD G5 on PD (Stable)",
            medication: "Insulin Glargine 18U (At bedtime), Amlodipine 10mg, Telmisartan 40mg, Furosemide 40mg (Twice daily), EPO 4000U 2x/wk",
            labTestsSuggested: "KFT, CBC, Iron panel, PTH, Phosphorus, HbA1c",
            advice: "Continue renal diet, monitor BP daily, fluid intake <1.5L/day",
            followUp: "2 weeks · Mon, 16 Mar'26 (Review labs and PD adequacy)"
        },
        labFlagCount: 13,
        todayVitals: {
            bp: "158/92",
            pulse: "88",
            spo2: "94",
            temp: "98.2",
            weight: "72",
            height: "168",
            bmi: "25.5"
        },
        activeMeds: [
            "Insulin Glargine 18U (At bedtime)",
            "Insulin Aspart 8-8-8U (Before meals)",
            "Amlodipine 10mg (Once daily)",
            "Telmisartan 40mg (Once daily)",
            "Furosemide 40mg (Twice daily)",
            "EPO 4000U SC 2x/wk",
            "Calcium Acetate 667mg (Three times daily)",
            "Calcitriol 0.25mcg (Once daily)",
            "Atorvastatin 40mg (At bedtime)",
            "Aspirin 75mg (Once daily)",
            "Sevelamer 800mg (Three times daily)"
        ],
        keyLabs: [
            {
                name: "eGFR",
                value: "11",
                unit: "mL/min",
                flag: "critical",
                refRange: ">60"
            },
            {
                name: "Creatinine",
                value: "8.2",
                unit: "mg/dL",
                flag: "high",
                refRange: "0.7-1.3"
            },
            {
                name: "BUN",
                value: "68",
                unit: "mg/dL",
                flag: "high",
                refRange: "7-20"
            },
            {
                name: "K+",
                value: "5.8",
                unit: "mEq/L",
                flag: "high",
                refRange: "3.5-5.0"
            },
            {
                name: "Phosphorus",
                value: "6.2",
                unit: "mg/dL",
                flag: "high",
                refRange: "2.5-4.5"
            },
            {
                name: "Calcium",
                value: "8.1",
                unit: "mg/dL",
                flag: "low",
                refRange: "8.5-10.5"
            },
            {
                name: "PTH",
                value: "480",
                unit: "pg/mL",
                flag: "high",
                refRange: "10-65"
            },
            {
                name: "Hb",
                value: "9.2",
                unit: "g/dL",
                flag: "low",
                refRange: "13-17"
            },
            {
                name: "HbA1c",
                value: "7.8",
                unit: "%",
                flag: "high",
                refRange: "<7.0"
            },
            {
                name: "Albumin",
                value: "3.1",
                unit: "g/dL",
                flag: "low",
                refRange: "3.5-5.5"
            },
            {
                name: "Bicarbonate",
                value: "18",
                unit: "mEq/L",
                flag: "low",
                refRange: "22-28"
            },
            {
                name: "Ferritin",
                value: "42",
                unit: "ng/mL",
                flag: "low",
                refRange: "100-500"
            },
            {
                name: "FBS",
                value: "186",
                unit: "mg/dL",
                flag: "high",
                refRange: "70-100"
            }
        ],
        dueAlerts: [
            "PD adequacy test (Kt/V, quarterly, overdue)",
            "Peritoneal equilibration test (PET, overdue)",
            "2D Echocardiogram (Ordered post-ER, not done)",
            "Retinal screening (Diabetic + CKD, >14 months overdue)",
            "Fistula maturity assessment (HD transition planning)"
        ],
        recordAlerts: [
            "ER discharge summary (Feb 2026, fluid overload episode, not yet reviewed in EMR)",
            "Cardiology opinion from Dr. Mehta (Oct 2025, uploaded as scanned PDF)"
        ],
        concernTrend: {
            label: "eGFR",
            values: [
                18,
                16,
                14,
                11
            ],
            labels: [
                "Jun'25",
                "Sep'25",
                "Dec'25",
                "Mar'26"
            ],
            unit: "mL/min",
            tone: "red"
        },
        // ── SBAR / Provenance fields (Phase 3 — new for this patient) ──
        sbarSituation: "76M CKD5 on PD, K+ 5.8 (HIGH), eGFR 11 (declining), BP 158/92. 2 ER admissions in 12mo for fluid overload. Assess PD adequacy and fluid status.",
        dataCompleteness: {
            emr: 45,
            ai: 30,
            missing: 25
        },
        dataProvenance: {
            "eGFR": {
                source: "emr",
                confidence: "high"
            },
            "Creatinine": {
                source: "emr",
                confidence: "high"
            },
            "BUN": {
                source: "emr",
                confidence: "high"
            },
            "K+": {
                source: "emr",
                confidence: "high"
            },
            "Phosphorus": {
                source: "emr",
                confidence: "high"
            },
            "Calcium": {
                source: "emr",
                confidence: "high"
            },
            "PTH": {
                source: "emr",
                confidence: "high"
            },
            "Hb": {
                source: "ai_extracted",
                confidence: "medium",
                extractedFrom: "Lab report PDF (Feb 2026)"
            },
            "HbA1c": {
                source: "ai_extracted",
                confidence: "medium",
                extractedFrom: "Printed lab report PDF (Feb 2026)"
            },
            "Albumin": {
                source: "emr",
                confidence: "high"
            },
            "Bicarbonate": {
                source: "emr",
                confidence: "high"
            },
            "Ferritin": {
                source: "ai_extracted",
                confidence: "medium",
                extractedFrom: "External clinic report (Jan 2026)"
            },
            "FBS": {
                source: "ai_extracted",
                confidence: "medium",
                extractedFrom: "Printed lab report PDF (Feb 2026)"
            },
            "Furosemide": {
                source: "ai_extracted",
                confidence: "medium",
                extractedFrom: "Handwritten Rx, Aug 2025 (dose ambiguous)"
            },
            "bp": {
                source: "emr",
                confidence: "high"
            },
            "spo2": {
                source: "emr",
                confidence: "high"
            },
            "Kt/V": {
                source: "not_available"
            },
            "PET": {
                source: "not_available"
            },
            "Echo": {
                source: "not_available"
            },
            "Retinal screening": {
                source: "not_available"
            }
        },
        sectionCompleteness: [
            {
                sectionId: "vitals",
                filled: 7,
                total: 7,
                status: "complete"
            },
            {
                sectionId: "labs-nephro",
                filled: 7,
                total: 9,
                status: "partial"
            },
            {
                sectionId: "labs-diabetes",
                filled: 2,
                total: 3,
                status: "partial"
            },
            {
                sectionId: "labs-anemia",
                filled: 2,
                total: 4,
                status: "partial"
            },
            {
                sectionId: "cardiology",
                filled: 1,
                total: 3,
                status: "partial"
            },
            {
                sectionId: "ophthalmology",
                filled: 0,
                total: 2,
                status: "missing"
            }
        ],
        crossProblemFlags: [
            {
                text: "Metformin contraindicated in CKD5, verify no prescriptions from other specialists",
                problems: [
                    "CKD",
                    "DM"
                ],
                severity: "high"
            },
            {
                text: "K+ 5.8 + on Telmisartan (ARB), monitor closely, consider dose reduction",
                problems: [
                    "CKD",
                    "HTN"
                ],
                severity: "high"
            },
            {
                text: "Furosemide losing efficacy as eGFR declines below 15, consider PD ultrafiltration adjustment",
                problems: [
                    "CKD",
                    "HTN"
                ],
                severity: "medium"
            },
            {
                text: "Insulin clearance reduced in dialysis, hypoglycaemia risk, monitor closely",
                problems: [
                    "CKD",
                    "DM"
                ],
                severity: "medium"
            }
        ],
        missingExpectedFields: [
            {
                field: "Kt/V (PD adequacy)",
                reason: "Quarterly PD adequacy test not found in EMR or uploads",
                prompt: "Order Kt/V sample this visit"
            },
            {
                field: "Peritoneal Equilibration Test",
                reason: "PET overdue, membrane function assessment needed",
                prompt: "Schedule PET within 2 weeks"
            },
            {
                field: "2D Echocardiogram",
                reason: "Ordered post-Feb 2026 ER admission, result not in EMR",
                prompt: "Chase echo result or re-order"
            },
            {
                field: "Retinal screening",
                reason: "Diabetic + CKD patient, last screening >14 months ago",
                prompt: "Refer to ophthalmology"
            },
            {
                field: "Transferrin saturation",
                reason: "Required for EPO dosing decisions, not in any source",
                prompt: "Order iron studies with next labs"
            }
        ],
        recommendationTiers: [
            {
                text: "Hyperkalaemia (K+ 5.8), review dietary compliance, adjust sevelamer dose",
                tier: "act",
                gatedBy: "K+ from EMR"
            },
            {
                text: "BP uncontrolled at 158/92, review antihypertensive regimen and PD fluid strategy",
                tier: "act",
                gatedBy: "BP from EMR"
            },
            {
                text: "Metabolic acidosis (Bicarb 18), consider oral sodium bicarbonate supplementation",
                tier: "act",
                gatedBy: "Bicarbonate from EMR"
            },
            {
                text: "ESA dose review, Hb 9.2 g/dL below PD target 10-12. Confirm Hb from lab PDF before adjusting EPO",
                tier: "verify",
                gatedBy: "Hb from AI-extracted lab PDF"
            },
            {
                text: "Glycaemic review, HbA1c 7.8%. Verify from uploaded lab report before endocrinology referral",
                tier: "verify",
                gatedBy: "HbA1c from AI-extracted report"
            },
            {
                text: "Order Ferritin + Transferrin saturation, iron panel not in any source",
                tier: "gather",
                gatedBy: "Ferritin not available"
            },
            {
                text: "Chase echo result, ordered post-ER Feb 2026, not returned to EMR",
                tier: "gather",
                gatedBy: "Echo not available"
            },
            {
                text: "Refer ophthalmology, retinal screening overdue >14 months",
                tier: "gather",
                gatedBy: "Retinal screening not available"
            }
        ],
        pomrProblems: [
            {
                problem: "CKD Stage 5 / Peritoneal Dialysis",
                status: "Active (Critical)",
                statusColor: "#EF4444",
                completeness: {
                    emr: 70,
                    ai: 15,
                    missing: 15
                },
                labKeys: [
                    "eGFR",
                    "Creatinine",
                    "BUN",
                    "K+",
                    "Phosphorus",
                    "Bicarbonate"
                ],
                missingKeys: [
                    "Kt/V",
                    "PET"
                ]
            },
            {
                problem: "Hypertension",
                status: "Uncontrolled",
                statusColor: "#D97706",
                completeness: {
                    emr: 50,
                    ai: 30,
                    missing: 20
                },
                labKeys: [],
                vitalKeys: [
                    "bp"
                ],
                medKeys: [
                    "Amlodipine 10mg (Once daily)",
                    "Telmisartan 40mg (Once daily)",
                    "Furosemide 40mg (Twice daily)"
                ],
                missingKeys: [
                    "Echo"
                ]
            },
            {
                problem: "Type 2 Diabetes Mellitus",
                status: "Poorly controlled",
                statusColor: "#D97706",
                completeness: {
                    emr: 30,
                    ai: 55,
                    missing: 15
                },
                labKeys: [
                    "HbA1c",
                    "FBS"
                ],
                medKeys: [
                    "Insulin Glargine 18U (At bedtime)",
                    "Insulin Aspart 8-8-8U (Before meals)"
                ],
                missingKeys: [
                    "Retinal screening"
                ]
            },
            {
                problem: "Anaemia of CKD",
                status: "Suboptimal",
                statusColor: "#D97706",
                completeness: {
                    emr: 40,
                    ai: 20,
                    missing: 40
                },
                labKeys: [
                    "Hb",
                    "Ferritin"
                ],
                medKeys: [
                    "EPO 4000U SC 2x/wk"
                ],
                missingKeys: [
                    "Transferrin saturation"
                ]
            }
        ],
        symptomCollectorData: {
            reportedAt: "15 Mar'26, 09:12 AM",
            symptoms: [
                {
                    name: "Mild pedal oedema",
                    duration: "1 week",
                    severity: "mild"
                },
                {
                    name: "Fatigue",
                    duration: "2 weeks",
                    severity: "moderate"
                },
                {
                    name: "Reduced appetite",
                    duration: "1 week",
                    severity: "mild"
                }
            ],
            medicalHistory: [
                "CKD Stage 5 on peritoneal dialysis since Jan 2024",
                "Type 2 Diabetes for 18 years (on insulin)",
                "Heart attack in 2021 (stent placed)",
                "High blood pressure (on medications)"
            ],
            familyHistory: [
                "Father had kidney disease",
                "Mother and brother have diabetes"
            ],
            allergies: [
                "Iodinated contrast dye (severe reaction)",
                "Cannot take Metformin (kidney)"
            ],
            lifestyle: [
                "Vegetarian, follows renal diet",
                "Dialysis at home (4 exchanges daily)"
            ],
            questionsToDoctor: [
                "Is my kidney function getting worse?",
                "Do I need to change my dialysis?",
                "Should I see a heart doctor?"
            ],
            currentMedications: [
                "Insulin injections",
                "Blood pressure pills",
                "EPO injections",
                "Phosphate binders",
                "Cholesterol tablet"
            ]
        }
    }
};
const PATIENT_TOOLTIP_SUMMARIES = {
    "__patient__": "Patient with Type 2 Diabetes 2yr and Hypertension 3yr, on Metformin 500mg and Telma 20mg, last visited on 27 Jan'26 with fever and eye redness, diagnosed Viral Fever and Conjunctivitis, suggested Paracetamol 650mg and Azithromycin 500mg.",
    "apt-anjali": "Patient with Migraine 3yr, on Sumatriptan 50mg, last visited on 15 Jan'26 with headache and eye strain, diagnosed Migraine without Aura, suggested Naproxen 250mg and Vitamin D 60K.",
    "apt-vikram": "Patient with Hypertension 3yr and Dyslipidemia 1yr, on Telma 40mg and Atorvastatin 10mg, last visited on 20 Dec'25 with fatigue and poor sleep, diagnosed Fatigue Syndrome, suggested Melatonin 3mg and CoQ10 100mg.",
    "apt-priya": "Patient with Hypothyroidism 2yr, G2P1 at 34 weeks, on Thyronorm 50mcg, last visited on 25 Feb'26 with pedal edema, diagnosed Routine ANC with mild edema, suggested Folic Acid 5mg and Calcium 500mg.",
    "apt-arjun": "4-year-old male, last visited on 10 Feb'26 with dry cough and reduced appetite, diagnosed Acute URTI with reactive airways, suggested Amoxicillin 250mg and Salbutamol syrup.",
    "apt-lakshmi": "Patient with Hypothyroidism 5yr and Fibroid Uterus 2yr, on Thyronorm 75mcg, last visited on 20 Jan'26 with heavy bleeding and fatigue, diagnosed AUB-Ovulatory Dysfunction and Iron Deficiency Anemia, suggested Autrin capsule and Tranexamic Acid 500mg.",
    "apt-neha": "Patient with Bronchial Asthma since childhood and Hypothyroidism 3yr, newly confirmed pregnancy 12wk, on Budecort 200mcg and Thyronorm 50mcg, last visited on 18 Feb'26 with nocturnal cough, TSH 5.2 and Hb 10.8. NT Scan due.",
    "apt-zerodata": "New patient presenting with knee pain and morning stiffness since 1 week. Allergy to Sulfonamides. On Vitamin D3 60K weekly.",
    "reg-suresh": "Patient with IHD 2yr (post-angioplasty 2024) and Hypertension 5yr, on Clopidogrel 75mg and Atorvastatin 40mg, last visited on 10 Feb'26 with stable angina, LDL 118 above target.",
    "apt-ramesh-ckd": "Patient with CKD Stage 5 5yr and Type 2 DM 18yr, on peritoneal dialysis since Jan 2024, Hypertension 12yr, IHD post-MI (2021), eGFR 11, K+ 5.8, Hb 9.2. 2 ER admissions for fluid overload. Kt/V and Echo overdue."
};
const PATIENT_DOCUMENTS = {
    "__patient__": [
        {
            id: "doc-dental-opg",
            fileName: "OPG_Panoramic_Mar2026.pdf",
            docType: "dental_radiology",
            uploadedAt: "08 Mar'26",
            uploadedBy: "Dental Imaging",
            pageCount: 1,
            size: "2.4 MB"
        },
        {
            id: "doc-1",
            fileName: "CBC_Report_Mar2026.pdf",
            docType: "pathology",
            uploadedAt: "05 Mar'26",
            uploadedBy: "Apollo Diagnostics",
            pageCount: 2,
            size: "340 KB"
        },
        {
            id: "doc-2",
            fileName: "X-Ray_Chest_Feb2026.pdf",
            docType: "radiology",
            uploadedAt: "18 Feb'26",
            uploadedBy: "Dr. Sharma",
            pageCount: 1,
            size: "1.2 MB"
        },
        {
            id: "doc-3",
            fileName: "Previous_Rx_Jan2026.pdf",
            docType: "prescription",
            uploadedAt: "10 Jan'26",
            uploadedBy: "Dr. Meera",
            pageCount: 1,
            size: "180 KB"
        },
        {
            id: "doc-4",
            fileName: "Lipid_Panel_Dec2025.pdf",
            docType: "pathology",
            uploadedAt: "22 Dec'25",
            uploadedBy: "SRL Diagnostics",
            pageCount: 3,
            size: "520 KB"
        },
        {
            id: "doc-5",
            fileName: "ECG_Report_Dec2025.pdf",
            docType: "other",
            uploadedAt: "15 Dec'25",
            uploadedBy: "Patient",
            pageCount: 1,
            size: "890 KB"
        },
        {
            id: "doc-6",
            fileName: "Discharge_Summary_Nov2025.pdf",
            docType: "discharge_summary",
            uploadedAt: "02 Nov'25",
            uploadedBy: "City Hospital",
            pageCount: 4,
            size: "1.1 MB"
        },
        {
            id: "doc-7",
            fileName: "Thyroid_Panel_Oct2025.pdf",
            docType: "pathology",
            uploadedAt: "18 Oct'25",
            uploadedBy: "Metropolis Lab",
            pageCount: 2,
            size: "280 KB"
        },
        {
            id: "doc-8",
            fileName: "MRI_Brain_Sep2025.pdf",
            docType: "radiology",
            uploadedAt: "05 Sep'25",
            uploadedBy: "Dr. Reddy",
            pageCount: 6,
            size: "3.2 MB"
        }
    ],
    "apt-neha": [
        {
            id: "doc-n1",
            fileName: "Lab_Results_Mar2026.pdf",
            docType: "pathology",
            uploadedAt: "09 Mar'26",
            uploadedBy: "Metropolis Lab",
            pageCount: 2,
            size: "420 KB"
        },
        {
            id: "doc-n2",
            fileName: "Chest_Xray_Feb2026.pdf",
            docType: "radiology",
            uploadedAt: "27 Feb'26",
            uploadedBy: "City Imaging",
            pageCount: 1,
            size: "1.4 MB"
        },
        {
            id: "doc-n3",
            fileName: "Pathology_Panel_Feb2026.pdf",
            docType: "pathology",
            uploadedAt: "25 Feb'26",
            uploadedBy: "Apollo Diagnostics",
            pageCount: 3,
            size: "560 KB"
        },
        {
            id: "doc-n4",
            fileName: "Previous_Rx_Feb2026.pdf",
            docType: "prescription",
            uploadedAt: "18 Feb'26",
            uploadedBy: "Dr. Meera",
            pageCount: 1,
            size: "190 KB"
        },
        {
            id: "doc-n5",
            fileName: "Insurance_PreAuth_Feb2026.pdf",
            docType: "other",
            uploadedAt: "16 Feb'26",
            uploadedBy: "Patient",
            pageCount: 2,
            size: "300 KB"
        }
    ],
    "apt-lakshmi": [
        {
            id: "doc-l1",
            fileName: "Pap_Smear_Report_Feb2026.pdf",
            docType: "pathology",
            uploadedAt: "12 Feb'26",
            uploadedBy: "Path Lab",
            pageCount: 2,
            size: "410 KB"
        },
        {
            id: "doc-l2",
            fileName: "Pelvic_Ultrasound_Jan2026.pdf",
            docType: "radiology",
            uploadedAt: "25 Jan'26",
            uploadedBy: "Dr. Anitha",
            pageCount: 3,
            size: "1.8 MB"
        },
        {
            id: "doc-l3",
            fileName: "Hormone_Panel_Jan2026.pdf",
            docType: "pathology",
            uploadedAt: "18 Jan'26",
            uploadedBy: "Thyrocare",
            pageCount: 2,
            size: "320 KB"
        },
        {
            id: "doc-l4",
            fileName: "Previous_Rx_Dec2025.pdf",
            docType: "prescription",
            uploadedAt: "10 Dec'25",
            uploadedBy: "Dr. Kavitha",
            pageCount: 1,
            size: "150 KB"
        },
        {
            id: "doc-l5",
            fileName: "CA125_Report_Nov2025.pdf",
            docType: "pathology",
            uploadedAt: "28 Nov'25",
            uploadedBy: "SRL Diagnostics",
            pageCount: 1,
            size: "220 KB"
        }
    ],
    "apt-anjali": [
        {
            id: "doc-a1",
            fileName: "OCT_Scan_Mar2026.pdf",
            docType: "radiology",
            uploadedAt: "03 Mar'26",
            uploadedBy: "Dr. Patel",
            pageCount: 4,
            size: "2.1 MB"
        },
        {
            id: "doc-a2",
            fileName: "Visual_Field_Test_Feb2026.pdf",
            docType: "other",
            uploadedAt: "15 Feb'26",
            uploadedBy: "Eye Care Centre",
            pageCount: 2,
            size: "680 KB"
        },
        {
            id: "doc-a3",
            fileName: "IOP_Chart_Jan2026.pdf",
            docType: "other",
            uploadedAt: "20 Jan'26",
            uploadedBy: "Dr. Patel",
            pageCount: 1,
            size: "180 KB"
        },
        {
            id: "doc-a4",
            fileName: "Fundus_Photo_Dec2025.pdf",
            docType: "radiology",
            uploadedAt: "12 Dec'25",
            uploadedBy: "Retina Clinic",
            pageCount: 2,
            size: "3.5 MB"
        }
    ],
    "apt-priya": [
        {
            id: "doc-p1",
            fileName: "NT_Scan_Report_Mar2026.pdf",
            docType: "radiology",
            uploadedAt: "08 Mar'26",
            uploadedBy: "Dr. Sunita",
            pageCount: 3,
            size: "1.6 MB"
        },
        {
            id: "doc-p2",
            fileName: "First_Trimester_Screen_Feb2026.pdf",
            docType: "pathology",
            uploadedAt: "22 Feb'26",
            uploadedBy: "Metropolis Lab",
            pageCount: 2,
            size: "450 KB"
        },
        {
            id: "doc-p3",
            fileName: "Blood_Group_Rh_Feb2026.pdf",
            docType: "pathology",
            uploadedAt: "10 Feb'26",
            uploadedBy: "Apollo Lab",
            pageCount: 1,
            size: "120 KB"
        },
        {
            id: "doc-p4",
            fileName: "ANC_Registration_Jan2026.pdf",
            docType: "other",
            uploadedAt: "15 Jan'26",
            uploadedBy: "Dr. Rao",
            pageCount: 2,
            size: "340 KB"
        },
        {
            id: "doc-p5",
            fileName: "Thyroid_Panel_Jan2026.pdf",
            docType: "pathology",
            uploadedAt: "12 Jan'26",
            uploadedBy: "Thyrocare",
            pageCount: 1,
            size: "210 KB"
        },
        {
            id: "doc-p6",
            fileName: "Previous_Rx_Dec2025.pdf",
            docType: "prescription",
            uploadedAt: "28 Dec'25",
            uploadedBy: "Dr. Rao",
            pageCount: 1,
            size: "180 KB"
        }
    ],
    "apt-arjun": [
        {
            id: "doc-ar1",
            fileName: "Vaccination_Record_Mar2026.pdf",
            docType: "vaccination",
            uploadedAt: "01 Mar'26",
            uploadedBy: "Dr. Nair",
            pageCount: 2,
            size: "280 KB"
        },
        {
            id: "doc-ar2",
            fileName: "Growth_Chart_Feb2026.pdf",
            docType: "other",
            uploadedAt: "15 Feb'26",
            uploadedBy: "Dr. Nair",
            pageCount: 1,
            size: "350 KB"
        },
        {
            id: "doc-ar3",
            fileName: "CBC_Report_Jan2026.pdf",
            docType: "pathology",
            uploadedAt: "20 Jan'26",
            uploadedBy: "Path Lab",
            pageCount: 2,
            size: "310 KB"
        },
        {
            id: "doc-ar4",
            fileName: "Hearing_Screen_Dec2025.pdf",
            docType: "other",
            uploadedAt: "10 Dec'25",
            uploadedBy: "ENT Clinic",
            pageCount: 1,
            size: "190 KB"
        },
        {
            id: "doc-ar5",
            fileName: "Previous_Rx_Nov2025.pdf",
            docType: "prescription",
            uploadedAt: "25 Nov'25",
            uploadedBy: "Dr. Nair",
            pageCount: 1,
            size: "140 KB"
        }
    ],
    "apt-ramesh-ckd": [
        {
            id: "doc-rk1",
            fileName: "KFT_CBC_Panel_Mar2026.pdf",
            docType: "pathology",
            uploadedAt: "12 Mar'26",
            uploadedBy: "Apollo Diagnostics",
            pageCount: 3,
            size: "480 KB"
        },
        {
            id: "doc-rk2",
            fileName: "ER_Discharge_Summary_Feb2026.pdf",
            docType: "discharge_summary",
            uploadedAt: "28 Feb'26",
            uploadedBy: "City Hospital",
            pageCount: 4,
            size: "1.3 MB"
        },
        {
            id: "doc-rk3",
            fileName: "Cardiology_Opinion_Oct2025.pdf",
            docType: "other",
            uploadedAt: "18 Oct'25",
            uploadedBy: "Dr. Mehta (scanned)",
            pageCount: 2,
            size: "890 KB"
        },
        {
            id: "doc-rk4",
            fileName: "HbA1c_Lab_Report_Feb2026.pdf",
            docType: "pathology",
            uploadedAt: "15 Feb'26",
            uploadedBy: "Patient (uploaded photo)",
            pageCount: 1,
            size: "340 KB"
        },
        {
            id: "doc-rk5",
            fileName: "Handwritten_Rx_Aug2025.jpg",
            docType: "prescription",
            uploadedAt: "22 Aug'25",
            uploadedBy: "External Clinic",
            pageCount: 1,
            size: "1.1 MB"
        },
        {
            id: "doc-rk6",
            fileName: "PD_Monthly_Log_Jan2026.pdf",
            docType: "other",
            uploadedAt: "05 Jan'26",
            uploadedBy: "Dr. Sharma",
            pageCount: 2,
            size: "420 KB"
        },
        {
            id: "doc-rk7",
            fileName: "External_Lab_Iron_Panel_Jan2026.pdf",
            docType: "pathology",
            uploadedAt: "10 Jan'26",
            uploadedBy: "SRL Diagnostics (external)",
            pageCount: 1,
            size: "260 KB"
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/utils/downloadExcel.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Download tabular data as a CSV file (opens correctly in Excel).
 * BOM prefix ensures Excel uses correct UTF-8 encoding.
 */ __turbopack_context__.s([
    "downloadAsExcel",
    ()=>downloadAsExcel
]);
function downloadAsExcel(filename, headers, rows) {
    const csv = [
        headers.join(","),
        ...rows.map((r)=>r.map((c)=>`"${c.replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    const blob = new Blob([
        "\uFEFF" + csv
    ], {
        type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DrAgentPanel",
    ()=>DrAgentPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$sync$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rxpad-sync-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$emit$2d$dental$2d$scan$2d$apply$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dental-ai/emit-dental-scan-apply.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$DrAgentRuntimeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/DrAgentRuntimeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$patient$2d$resolution$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/patient-resolution.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/buildCoreNarrative.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$isSituationAtGlanceMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/isSituationAtGlanceMessage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$pill$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/engines/pill-engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$homepage$2d$pill$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/engines/homepage-pill-engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$phase$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/engines/phase-engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$intent$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/engines/intent-engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$reply$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/engines/reply-engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$homepage$2d$reply$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/engines/homepage-reply-engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$voice$2d$rx$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/engines/voice-rx-engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$rxpad$2d$copy$2d$feedback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/rxpad-copy-feedback.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$TickCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TickCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/TickCircle.js [app-client] (ecmascript) <export default as TickCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-snackbar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shell$2f$AgentHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shell/AgentHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shell$2f$PatientSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shell/PatientSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$ChatThread$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/chat/ChatThread.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$WelcomeScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/chat/WelcomeScreen.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$PillBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/chat/PillBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/chat/ChatInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$AttachPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/chat/AttachPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$DocumentBottomSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/chat/DocumentBottomSheet.tsx [app-client] (ecmascript)");
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
function formatUploadSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function inferUploadDocType(fileName) {
    const n = fileName.toLowerCase().replace(/_/g, " ");
    const dentalWord = /\b(dental|dentition|tooth|teeth|oral|opg|orthopantom|panoramic|cbct|periapical|bitewing|maxillofacial|intraoral)\b/i;
    if (dentalWord.test(n)) return "dental_radiology";
    if (/\b(dental\s+record|dental\s+report|oral\s+scan)\b/i.test(n)) return "dental_radiology";
    if (/\b(report|summary|records?)\b/i.test(n) && dentalWord.test(n)) return "dental_radiology";
    if (/rx\.|prescription|medicine|medication/.test(n)) return "prescription";
    if (/xray|x-ray|\bct\b|mri|usg|ultrasound/.test(n)) return "radiology";
    return "pathology";
}
/** User-visible prompt when sending attachments; filenames show in the attachment strip. */ function buildAttachmentAnalyzePrompt(attachments) {
    if (attachments.length === 0) return "Please analyze the above attached document.";
    if (attachments.length === 1) {
        return attachments[0].type === "image" ? "Please analyze the above attached image." : "Please analyze the above attached document.";
    }
    const allImages = attachments.every((a)=>a.type === "image");
    const allDocs = attachments.every((a)=>a.type === "pdf");
    if (allImages) return "Please analyze the above attached images.";
    if (allDocs) return "Please analyze the above attached documents.";
    return "Please analyze the above attached files.";
}
// ═══════════════ HELPERS ═══════════════
function uid() {
    return Math.random().toString(36).slice(2, 10);
}
/** Map intent category + query keywords to a context-aware typing indicator hint */ function getQueryHint(category, query) {
    const q = query.toLowerCase();
    if (q.includes("interaction") || q.includes("drug")) return "Checking drug interactions";
    if (q.includes("lab") || q.includes("vital") || q.includes("trend")) return "Fetching lab results";
    if (q.includes("summary") || q.includes("snapshot") || q.includes("patient")) return "Looking up patient records";
    if (q.includes("intake") || q.includes("pre-visit")) return "Loading intake data";
    if (q.includes("ddx") || q.includes("diagnos")) return "Reviewing clinical guidelines";
    if (q.includes("investigation") || q.includes("test")) return "Reviewing investigation protocols";
    if (q.includes("document") || q.includes("report") || q.includes("upload")) return "Analyzing document";
    switch(category){
        case "data_retrieval":
            return "Looking up patient records";
        case "clinical_decision":
            return "Reviewing clinical guidelines";
        case "clinical_question":
            return "Reviewing clinical data";
        case "comparison":
            return "Comparing clinical data";
        case "operational":
            return "Fetching clinic data";
        case "document_analysis":
            return "Analyzing document";
        case "action":
            return "Preparing response";
        default:
            return "Reviewing clinical data";
    }
}
function detectSpecialties(summary) {
    const tabs = [
        "gp"
    ];
    if (summary.obstetricData) tabs.push("obstetric");
    if (summary.pediatricsData) tabs.push("pediatrics");
    if (summary.gynecData) tabs.push("gynec");
    if (summary.ophthalData) tabs.push("ophthal");
    return tabs;
}
function buildIntroMessages(summary, patient, _doctorViewType, intakeMode = "with_intake", panelMode = "homepage") {
    const hasData = summary.specialtyTags.length > 0;
    const messages = [];
    // ── RxPad mode: open directly into quick snapshot when chart data exists (same card as Appointments AI icon)
    if (panelMode === "rxpad") {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patientHasQuickClinicalSnapshotData"])(summary)) {
            return messages;
        }
        const quote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildQuickClinicalSnapshotText"])(summary);
        messages.push({
            id: uid(),
            role: "assistant",
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$isSituationAtGlanceMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["situationAtGlanceAssistantLeadIn"])(patient.label),
            createdAt: new Date().toISOString(),
            rxOutput: {
                kind: "text_quote",
                data: {
                    quote,
                    source: ""
                }
            },
            feedbackGiven: null,
            suggestions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildQuickClinicalSnapshotInlineSuggestions"])(summary, "full")
        });
        return messages;
    }
    // ── Homepage mode WITH specific patient: situation at a glance (not full SBAR narrative) ──
    if (panelMode === "homepage" && hasData) {
        const quote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildQuickClinicalSnapshotText"])(summary);
        messages.push({
            id: uid(),
            role: "assistant",
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$isSituationAtGlanceMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["situationAtGlanceAssistantLeadIn"])(patient.label),
            createdAt: new Date().toISOString(),
            rxOutput: {
                kind: "text_quote",
                data: {
                    quote,
                    source: ""
                }
            },
            feedbackGiven: null,
            suggestions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildQuickClinicalSnapshotInlineSuggestions"])(summary, "full")
        });
        return messages;
    }
    // ── Homepage mode WITHOUT patient data: no messages, WelcomeScreen handles ──
    if (panelMode === "homepage") {
        return messages;
    }
    // ── Homepage / Appointment page intro flow ──
    //
    // With intake:
    //   Single message → Intake card (already includes quick snapshot via patientNarrative)
    //
    // Without intake:
    //   Single message → Quick historical snapshot (patient_narrative)
    //
    // No data:
    //   Single message → New patient text
    //
    const showIntake = intakeMode === "with_intake" && !!summary.symptomCollectorData;
    if (showIntake) {
        // Intake card — includes quick snapshot inside via patientNarrative
        messages.push({
            id: uid(),
            role: "assistant",
            text: `${patient.label}'s details reported by patient via Symptom Collector:`,
            createdAt: new Date().toISOString(),
            rxOutput: {
                kind: "symptom_collector",
                data: {
                    ...summary.symptomCollectorData,
                    patientNarrative: summary.patientNarrative
                }
            },
            feedbackGiven: null
        });
    } else if (hasData) {
        // No intake — show quick historical snapshot
        messages.push({
            id: uid(),
            role: "assistant",
            text: `Quick snapshot for ${patient.label}:`,
            createdAt: new Date().toISOString(),
            rxOutput: {
                kind: "patient_narrative",
                data: summary
            },
            feedbackGiven: null
        });
    } else {
        messages.push({
            id: uid(),
            role: "assistant",
            text: `${patient.label} — new patient, first visit. No prior records yet.`,
            createdAt: new Date().toISOString(),
            feedbackGiven: null
        });
    }
    return messages;
}
// ═══════════════ STATIC PATIENT INFO STRIP ═══════════════
function StaticPatientStrip({ selectedPatientId }) {
    const selected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$patient$2d$resolution$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRxContextOption"])(selectedPatientId);
    const genderLabel = selected?.gender === "M" ? "M" : selected?.gender === "F" ? "F" : "";
    const ageLabel = selected?.age ? `${selected.age}y` : "";
    const metaParts = [
        genderLabel,
        ageLabel
    ].filter(Boolean).join(", ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "sticky top-0 z-10 flex justify-center pb-1 pt-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/55 px-2.5 py-1 text-[14px] font-medium text-tp-slate-600 shadow-[0_8px_20px_-12px_rgba(15,23,42,0.5)] backdrop-blur-md",
            children: [
                selected?.label,
                metaParts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-tp-slate-400",
                    children: [
                        "· ",
                        metaParts
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                    lineNumber: 239,
                    columnNumber: 23
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
            lineNumber: 237,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
_c = StaticPatientStrip;
const HOMEPAGE_COMMON_ID = "__homepage_common__";
function DrAgentPanel({ onClose, initialPatientId, mode = "rxpad", activeTab, activeRailItem, homepagePatients, autoMessage, autoMessageTrigger, patientSwitchTrigger, onSnapshotDelivered, persistedMessagesByPatient, onPersistedMessagesChange, dentalChartPatientId }) {
    _s();
    // ── Patient Context ──
    // In homepage mode with no patient, use a special common ID for operational context
    const effectiveDefaultId = mode === "homepage" && !initialPatientId ? HOMEPAGE_COMMON_ID : initialPatientId ?? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTEXT_PATIENT_ID"];
    const [selectedPatientId, setSelectedPatientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(effectiveDefaultId);
    // Sync when initialPatientId changes from parent (appointment page)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DrAgentPanel.useEffect": ()=>{
            if (mode === "homepage" && !initialPatientId) {
                if (selectedPatientId !== HOMEPAGE_COMMON_ID) {
                    setSelectedPatientId(HOMEPAGE_COMMON_ID);
                }
            } else if (initialPatientId) {
                setSelectedPatientId(initialPatientId);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["DrAgentPanel.useEffect"], [
        initialPatientId,
        mode,
        patientSwitchTrigger
    ]);
    // ── Per-Patient State (keyed by patient ID; lifted to parent when onPersistedMessagesChange is set) ──
    const [internalMessagesByPatient, setInternalMessagesByPatient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const isMessagesPersisted = onPersistedMessagesChange != null;
    const messagesByPatient = isMessagesPersisted ? persistedMessagesByPatient ?? {} : internalMessagesByPatient;
    const setMessagesByPatient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[setMessagesByPatient]": (u)=>{
            if (onPersistedMessagesChange) {
                onPersistedMessagesChange(u);
            } else {
                setInternalMessagesByPatient(u);
            }
        }
    }["DrAgentPanel.useCallback[setMessagesByPatient]"], [
        onPersistedMessagesChange
    ]);
    const [phaseByPatient, setPhaseByPatient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // ── UI State ──
    const [activeSpecialty, setActiveSpecialty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("gp");
    const [activeTabLens] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("dr-agent");
    const [doctorViewType, setDoctorViewType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("specialist_first_visit");
    const [intakeMode, setIntakeMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("with_intake");
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isPrefilled, setIsPrefilled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPatientSheetOpen, setIsPatientSheetOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chipShaking, setChipShaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [typingHint, setTypingHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showAttachPanel, setShowAttachPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showDocBottomSheet, setShowDocBottomSheet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rxPadCopySnackbarOpen, setRxPadCopySnackbarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rxPadCopySnackbarMessage, setRxPadCopySnackbarMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── Integration ──
    const { requestCopyToRxPad, lastSignal, publishSignal, setPatientAllergies } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$sync$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadSync"])();
    const lastSignalIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // ── Derived State ──
    const patient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrAgentPanel.useMemo[patient]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$patient$2d$resolution$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRxContextOption"])(selectedPatientId)
    }["DrAgentPanel.useMemo[patient]"], [
        selectedPatientId
    ]);
    const agentDataPatientKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrAgentPanel.useMemo[agentDataPatientKey]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$patient$2d$resolution$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapUrlPatientIdToAgentDataKey"])(selectedPatientId)
    }["DrAgentPanel.useMemo[agentDataPatientKey]"], [
        selectedPatientId
    ]);
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrAgentPanel.useMemo[summary]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SMART_SUMMARY_BY_CONTEXT"][agentDataPatientKey] || __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SMART_SUMMARY_BY_CONTEXT"][__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTEXT_PATIENT_ID"]]
    }["DrAgentPanel.useMemo[summary]"], [
        agentDataPatientKey
    ]);
    const drAgentRuntimeValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrAgentPanel.useMemo[drAgentRuntimeValue]": ()=>({
                dentalChartPatientId: dentalChartPatientId ?? "apt-1"
            })
    }["DrAgentPanel.useMemo[drAgentRuntimeValue]"], [
        dentalChartPatientId
    ]);
    const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrAgentPanel.useMemo[messages]": ()=>messagesByPatient[selectedPatientId] || []
    }["DrAgentPanel.useMemo[messages]"], [
        messagesByPatient,
        selectedPatientId
    ]);
    /** Glance intro still has inline pills under the bubble — hide context PillBar until cleared */ const glanceInlinePillsActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrAgentPanel.useMemo[glanceInlinePillsActive]": ()=>messages.some({
                "DrAgentPanel.useMemo[glanceInlinePillsActive]": (m)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$isSituationAtGlanceMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSituationAtGlanceAssistantMessage"])(m) && !!m.suggestions?.length
            }["DrAgentPanel.useMemo[glanceInlinePillsActive]"])
    }["DrAgentPanel.useMemo[glanceInlinePillsActive]"], [
        messages
    ]);
    const phase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrAgentPanel.useMemo[phase]": ()=>phaseByPatient[selectedPatientId] || "empty"
    }["DrAgentPanel.useMemo[phase]"], [
        phaseByPatient,
        selectedPatientId
    ]);
    const availableSpecialties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrAgentPanel.useMemo[availableSpecialties]": ()=>detectSpecialties(summary)
    }["DrAgentPanel.useMemo[availableSpecialties]"], [
        summary
    ]);
    const isPatientContext = mode === "homepage" && selectedPatientId !== HOMEPAGE_COMMON_ID;
    // Show doctor view selector only for patients with POMR/SBAR data (POC: Ramesh Kumar only)
    const showDoctorViewSelector = selectedPatientId === "apt-ramesh-ckd";
    // ── Pill deduplication: track which card kinds have been shown ──
    const shownCardKinds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrAgentPanel.useMemo[shownCardKinds]": ()=>{
            const kinds = new Set();
            for (const msg of messages){
                if (msg.rxOutput?.kind) kinds.add(msg.rxOutput.kind);
            }
            return kinds;
        }
    }["DrAgentPanel.useMemo[shownCardKinds]"], [
        messages
    ]);
    /** Map pill labels to the card kind(s) they produce — used to hide pills for already-shown cards */ const PILL_TO_CARD_KINDS = {
        "Patient's detailed summary": [
            "patient_summary",
            "sbar_overview"
        ],
        "Patient summary": [
            "sbar_overview",
            "patient_summary"
        ],
        "Reported by patient": [
            "symptom_collector"
        ],
        "Show reported intake": [
            "symptom_collector"
        ],
        "Last visit": [
            "last_visit"
        ],
        "Last visit details": [
            "last_visit"
        ],
        "Past visit summaries": [
            "last_visit"
        ],
        "Vital trends": [
            "vitals_trend_bar"
        ],
        "Suggest DDX": [
            "ddx"
        ],
        "Lab overview": [
            "lab_panel"
        ],
        "Lab comparison": [
            "lab_comparison"
        ],
        "Obstetric summary": [
            "obstetric_summary"
        ],
        "Gynec summary": [
            "gynec_summary"
        ],
        "Growth & vaccines": [
            "pediatric_summary"
        ],
        "Vision summary": [
            "ophthal_summary"
        ],
        "Flagged lab results": [
            "lab_panel"
        ],
        "Follow-up overview": [
            "follow_up"
        ]
    };
    const pills = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrAgentPanel.useMemo[pills]": ()=>{
            const rawPills = mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$homepage$2d$pill$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateHomepagePills"])(activeTab, activeRailItem, null) : isPatientContext ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$homepage$2d$pill$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateHomepagePills"])(activeTab, activeRailItem, summary) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$pill$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generatePills"])(summary, phase, activeTabLens, showDoctorViewSelector ? doctorViewType : undefined);
            // Filter out pills whose card has already been shown in the current conversation
            return rawPills.filter({
                "DrAgentPanel.useMemo[pills]": (pill)=>{
                    const cardKinds = PILL_TO_CARD_KINDS[pill.label];
                    if (!cardKinds) return true // Unknown mapping — always show
                    ;
                    return !cardKinds.some({
                        "DrAgentPanel.useMemo[pills]": (kind)=>shownCardKinds.has(kind)
                    }["DrAgentPanel.useMemo[pills]"]);
                }
            }["DrAgentPanel.useMemo[pills]"]);
        }
    }["DrAgentPanel.useMemo[pills]"], [
        mode,
        activeTab,
        activeRailItem,
        isPatientContext,
        summary,
        phase,
        activeTabLens,
        selectedPatientId,
        showDoctorViewSelector,
        doctorViewType,
        shownCardKinds
    ]);
    // ── Sync patient allergies to context (for RxPad medication alerts) ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DrAgentPanel.useEffect": ()=>{
            setPatientAllergies(summary.allergies ?? []);
        }
    }["DrAgentPanel.useEffect"], [
        summary,
        setPatientAllergies
    ]);
    // ── Initialize patient messages on first visit or after intake mode change ──
    // Note: we track whether messages exist for the current patient using a ref-derived flag
    // to avoid putting messagesByPatient in the dep array (which would cause infinite loops
    // since this effect itself sets messagesByPatient).
    const hasMessagesForPatient = !!messagesByPatient[selectedPatientId];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DrAgentPanel.useEffect": ()=>{
            if (!hasMessagesForPatient) {
                let introMessages;
                if (mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID) {
                    // Homepage — no intro messages; WelcomeScreen handles the first-time experience
                    introMessages = [];
                } else if (mode === "homepage" && selectedPatientId !== HOMEPAGE_COMMON_ID && autoMessage?.trim() === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUICK_CLINICAL_SNAPSHOT_PROMPT"]) {
                    // Appointment-row AI icon: parent auto-sends quick snapshot — skip intro so we don't duplicate the glance card
                    return;
                } else {
                    introMessages = buildIntroMessages(summary, patient, showDoctorViewSelector ? doctorViewType : undefined, intakeMode, mode);
                }
                setMessagesByPatient({
                    "DrAgentPanel.useEffect": (prev)=>({
                            ...prev,
                            [selectedPatientId]: introMessages
                        })
                }["DrAgentPanel.useEffect"]);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["DrAgentPanel.useEffect"], [
        selectedPatientId,
        hasMessagesForPatient,
        summary,
        patient,
        mode,
        initialPatientId,
        autoMessage
    ]);
    // ── Reset specialty when patient changes ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DrAgentPanel.useEffect": ()=>{
            const detected = detectSpecialties(summary);
            if (!detected.includes(activeSpecialty)) {
                setActiveSpecialty("gp");
            }
        }
    }["DrAgentPanel.useEffect"], [
        summary,
        activeSpecialty
    ]);
    // ── Handle Sidebar Signals ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DrAgentPanel.useEffect": ()=>{
            if (!lastSignal || lastSignal.id === lastSignalIdRef.current) return;
            lastSignalIdRef.current = lastSignal.id;
            if (lastSignal.type === "sidebar_pill_tap" && lastSignal.label) {
                // Pre-fill input box — doctor decides whether to send
                setInputValue(lastSignal.label);
                setIsPrefilled(true);
            }
            // AI trigger from RxPad section chips or sidebar icons → pre-fill input
            if (lastSignal.type === "ai_trigger" && lastSignal.label) {
                setInputValue(lastSignal.label);
                setIsPrefilled(true);
            }
            // When symptoms are added in RxPad, advance phase to show DDX pills
            if (lastSignal.type === "symptoms_changed") {
                const currentPhase = phaseByPatient[selectedPatientId] || "empty";
                if (currentPhase === "empty") {
                    setPhaseByPatient({
                        "DrAgentPanel.useEffect": (prev)=>({
                                ...prev,
                                [selectedPatientId]: "symptoms_entered"
                            })
                    }["DrAgentPanel.useEffect"]);
                }
            }
            // When diagnosis is added, advance phase
            if (lastSignal.type === "diagnosis_changed") {
                const currentPhase = phaseByPatient[selectedPatientId] || "empty";
                if (currentPhase === "symptoms_entered") {
                    setPhaseByPatient({
                        "DrAgentPanel.useEffect": (prev)=>({
                                ...prev,
                                [selectedPatientId]: "dx_accepted"
                            })
                    }["DrAgentPanel.useEffect"]);
                }
            }
            // When medications are added, advance phase accordingly
            if (lastSignal.type === "medications_changed") {
                const currentPhase = phaseByPatient[selectedPatientId] || "empty";
                if (currentPhase === "dx_accepted") {
                    setPhaseByPatient({
                        "DrAgentPanel.useEffect": (prev)=>({
                                ...prev,
                                [selectedPatientId]: "meds_written"
                            })
                    }["DrAgentPanel.useEffect"]);
                }
            }
        }
    }["DrAgentPanel.useEffect"], [
        lastSignal
    ]);
    // ── Core: Send Message ──
    const handleSend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleSend]": (text)=>{
            const msg = text || inputValue.trim();
            if (!msg) return;
            const msgNorm = msg.trim().toLowerCase();
            const qp = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUICK_CLINICAL_SNAPSHOT_PROMPT"].trim().toLowerCase();
            const isQuickSnapshotPrompt = msgNorm === qp || msgNorm.startsWith(qp);
            if (isQuickSnapshotPrompt) {
                const cur = messagesByPatient[selectedPatientId] || [];
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$isSituationAtGlanceMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["threadAlreadyHasQuickClinicalGlance"])(cur, qp)) {
                    setInputValue("");
                    return;
                }
                setMessagesByPatient({
                    "DrAgentPanel.useCallback[handleSend]": (prev)=>({
                            ...prev,
                            [selectedPatientId]: (prev[selectedPatientId] || []).map({
                                "DrAgentPanel.useCallback[handleSend]": (m)=>m.suggestions ? {
                                        ...m,
                                        suggestions: undefined
                                    } : m
                            }["DrAgentPanel.useCallback[handleSend]"])
                        })
                }["DrAgentPanel.useCallback[handleSend]"]);
                setInputValue("");
                setTypingHint("Preparing clinical snapshot");
                setIsTyping(true);
                setTimeout({
                    "DrAgentPanel.useCallback[handleSend]": ()=>{
                        const assistantMsg = {
                            id: uid(),
                            role: "assistant",
                            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$isSituationAtGlanceMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["situationAtGlanceAssistantLeadIn"])(patient.label),
                            createdAt: new Date().toISOString(),
                            rxOutput: {
                                kind: "text_quote",
                                data: {
                                    quote: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildQuickClinicalSnapshotText"])(summary),
                                    source: ""
                                }
                            },
                            feedbackGiven: null,
                            suggestions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$buildCoreNarrative$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildQuickClinicalSnapshotInlineSuggestions"])(summary, "full")
                        };
                        setMessagesByPatient({
                            "DrAgentPanel.useCallback[handleSend]": (prev)=>({
                                    ...prev,
                                    [selectedPatientId]: [
                                        ...prev[selectedPatientId] || [],
                                        assistantMsg
                                    ]
                                })
                        }["DrAgentPanel.useCallback[handleSend]"]);
                        setIsTyping(false);
                        setTypingHint("");
                        onSnapshotDelivered?.(selectedPatientId);
                    }
                }["DrAgentPanel.useCallback[handleSend]"], 1800 + Math.random() * 700);
                return;
            }
            const uploadNorm = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UPLOAD_MEDICAL_RECORDS_MESSAGE"].toLowerCase();
            if (msgNorm === uploadNorm && selectedPatientId !== HOMEPAGE_COMMON_ID) {
                setMessagesByPatient({
                    "DrAgentPanel.useCallback[handleSend]": (prev)=>({
                            ...prev,
                            [selectedPatientId]: (prev[selectedPatientId] || []).map({
                                "DrAgentPanel.useCallback[handleSend]": (m)=>m.suggestions ? {
                                        ...m,
                                        suggestions: undefined
                                    } : m
                            }["DrAgentPanel.useCallback[handleSend]"])
                        })
                }["DrAgentPanel.useCallback[handleSend]"]);
                setInputValue("");
                setShowDocBottomSheet(true);
                return;
            }
            // Clear inline suggestions from all messages (so bottom pill bar reappears)
            setMessagesByPatient({
                "DrAgentPanel.useCallback[handleSend]": (prev)=>({
                        ...prev,
                        [selectedPatientId]: (prev[selectedPatientId] || []).map({
                            "DrAgentPanel.useCallback[handleSend]": (m)=>m.suggestions ? {
                                    ...m,
                                    suggestions: undefined
                                } : m
                        }["DrAgentPanel.useCallback[handleSend]"])
                    })
            }["DrAgentPanel.useCallback[handleSend]"]);
            const userMsg = {
                id: uid(),
                role: "user",
                text: msg,
                createdAt: new Date().toISOString()
            };
            setMessagesByPatient({
                "DrAgentPanel.useCallback[handleSend]": (prev)=>({
                        ...prev,
                        [selectedPatientId]: [
                            ...prev[selectedPatientId] || [],
                            userMsg
                        ]
                    })
            }["DrAgentPanel.useCallback[handleSend]"]);
            setInputValue("");
            // Classify intent — check PILL_INTENT_MAP first (exact pill labels bypass NLU)
            const pillOverride = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$intent$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PILL_INTENT_MAP"][msg];
            const intent = pillOverride ? {
                category: pillOverride,
                format: "card",
                confidence: 1
            } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$intent$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["classifyIntent"])(msg);
            // Set context-aware typing hint before showing indicator
            setTypingHint(getQueryHint(intent.category, msg));
            setIsTyping(true);
            // Build reply after a short delay (simulate thinking)
            setTimeout({
                "DrAgentPanel.useCallback[handleSend]": ()=>{
                    const currentMessages = [
                        ...messagesByPatient[selectedPatientId] || [],
                        userMsg
                    ];
                    const currentPhase = phaseByPatient[selectedPatientId] || "empty";
                    // Update phase
                    const newPhase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$phase$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inferPhase"])(currentMessages, currentPhase);
                    if (newPhase !== currentPhase) {
                        setPhaseByPatient({
                            "DrAgentPanel.useCallback[handleSend]": (prev)=>({
                                    ...prev,
                                    [selectedPatientId]: newPhase
                                })
                        }["DrAgentPanel.useCallback[handleSend]"]);
                    }
                    // ── Guardrails + Routing ──
                    const isClinicOverview = mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID;
                    const isRxPadMode = mode === "rxpad";
                    // Patient-specific intents that should NOT render in Clinic Overview
                    const PATIENT_SPECIFIC_INTENTS = new Set([
                        "data_retrieval",
                        "clinical_decision",
                        "comparison",
                        "document_analysis"
                    ]);
                    // Patient-specific keywords in the message
                    const nl = msg.toLowerCase();
                    const isPatientSpecificQuery = nl.includes("timeline") || nl.includes("last visit") || nl.includes("patient summary") || nl.includes("snapshot") || nl.includes("lab") || nl.includes("vital") || nl.includes("medication") || nl.includes("obstetric summary") || nl.includes("gynec summary") || nl.includes("growth") || nl.includes("vision") || nl.includes("intake");
                    // Operational (clinic-overview) keywords
                    const isOperationalQuery = intent.category === "operational";
                    let reply;
                    // Extract patient name from message for search
                    const extractPatientQuery = {
                        "DrAgentPanel.useCallback[handleSend].extractPatientQuery": (text)=>{
                            const patterns = [
                                /(?:details?\s+(?:about|of|for)\s+)(.+)/i,
                                /(?:search|find|look\s*up|show)\s+(?:patient\s+)?(.+)/i,
                                /(?:patient\s+named?\s+)(.+)/i,
                                /(?:who\s+is\s+)(.+)/i
                            ];
                            for (const p of patterns){
                                const m = text.match(p);
                                if (m) return m[1].trim().replace(/[?.!]+$/, "");
                            }
                            return "";
                        }
                    }["DrAgentPanel.useCallback[handleSend].extractPatientQuery"];
                    // Check if message mentions a patient name (fuzzy match against known patients)
                    const allPatients = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RX_CONTEXT_OPTIONS"].filter({
                        "DrAgentPanel.useCallback[handleSend].allPatients": (o)=>o.kind === "patient"
                    }["DrAgentPanel.useCallback[handleSend].allPatients"]);
                    let nameQuery = extractPatientQuery(msg);
                    // If no pattern matched, check if the raw input matches a known patient name
                    if (!nameQuery) {
                        const directMatch = allPatients.some({
                            "DrAgentPanel.useCallback[handleSend].directMatch": (p)=>p.label.toLowerCase().includes(nl) || nl.includes(p.label.toLowerCase().split(" ")[0])
                        }["DrAgentPanel.useCallback[handleSend].directMatch"]);
                        if (directMatch) nameQuery = msg.trim();
                    }
                    if (isClinicOverview && nameQuery) {
                        // ── Patient search → show search card with pre-filled query ──
                        const matches = allPatients.filter({
                            "DrAgentPanel.useCallback[handleSend].matches": (p)=>p.label.toLowerCase().includes(nameQuery.toLowerCase())
                        }["DrAgentPanel.useCallback[handleSend].matches"]).map({
                            "DrAgentPanel.useCallback[handleSend].matches": (p)=>({
                                    patientId: p.id,
                                    name: p.label,
                                    meta: p.meta,
                                    hasAppointmentToday: !!p.isToday
                                })
                        }["DrAgentPanel.useCallback[handleSend].matches"]);
                        reply = {
                            text: matches.length > 0 ? `Found ${matches.length} patient${matches.length > 1 ? "s" : ""} matching "${nameQuery}". Select to view details.` : `No patients found for "${nameQuery}". Try searching with a different name.`,
                            rxOutput: {
                                kind: "patient_search",
                                data: {
                                    query: nameQuery,
                                    results: matches
                                }
                            }
                        };
                    } else if (isClinicOverview && (PATIENT_SPECIFIC_INTENTS.has(intent.category) || isPatientSpecificQuery)) {
                        // ── GUARDRAIL: Patient-specific query without a name → show search card ──
                        reply = {
                            text: "Please search for a patient to view their clinical data.",
                            rxOutput: {
                                kind: "patient_search",
                                data: {
                                    query: "",
                                    results: []
                                }
                            }
                        };
                    } else if (isRxPadMode && isOperationalQuery) {
                        // ── GUARDRAIL: Operational/clinic query inside RxPad → redirect to appointments page ──
                        const patientLabel = summary.patientNarrative ? "this patient" : "the current patient";
                        reply = {
                            text: `You're currently inside ${patientLabel}'s consultation. Clinic-wide analytics like revenue, KPIs, and scheduling are available on the Appointments page. Switch to the Clinic Overview context to access operational data.`,
                            followUpPills: [
                                {
                                    id: "grd-suggest",
                                    label: "Suggest DDX",
                                    priority: 10,
                                    layer: 3,
                                    tone: "primary"
                                },
                                {
                                    id: "grd-labs",
                                    label: "Lab overview",
                                    priority: 12,
                                    layer: 3,
                                    tone: "primary"
                                }
                            ]
                        };
                    } else if (mode === "homepage" && isOperationalQuery) {
                        // ── Normal: Operational query in Clinic Overview ──
                        reply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$homepage$2d$reply$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildHomepageReply"])(msg, intent);
                    } else {
                        // ── Normal: Patient-context reply ──
                        reply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$reply$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildReply"])(msg, summary, newPhase, intent);
                    }
                    const uploadNorm = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UPLOAD_MEDICAL_RECORDS_MESSAGE"].toLowerCase();
                    if (msg.trim().toLowerCase() === uploadNorm && selectedPatientId === HOMEPAGE_COMMON_ID) {
                        reply = {
                            text: "Select a patient using the floating chip at the top, then use Medical records in the composer to open the records list or upload files for analysis."
                        };
                    }
                    const assistantMsg = {
                        id: uid(),
                        role: "assistant",
                        text: reply.text,
                        createdAt: new Date().toISOString(),
                        rxOutput: reply.rxOutput,
                        feedbackGiven: null,
                        suggestions: reply.suggestions
                    };
                    setMessagesByPatient({
                        "DrAgentPanel.useCallback[handleSend]": (prev)=>({
                                ...prev,
                                [selectedPatientId]: [
                                    ...prev[selectedPatientId] || [],
                                    assistantMsg
                                ]
                            })
                    }["DrAgentPanel.useCallback[handleSend]"]);
                    setIsTyping(false);
                    setTypingHint("");
                    onSnapshotDelivered?.(selectedPatientId);
                // Delay simulates AI thinking — 2-2.5s feels natural for clinical queries
                }
            }["DrAgentPanel.useCallback[handleSend]"], 1800 + Math.random() * 700);
        }
    }["DrAgentPanel.useCallback[handleSend]"], [
        inputValue,
        selectedPatientId,
        summary,
        patient,
        messagesByPatient,
        phaseByPatient,
        mode,
        homepagePatients,
        onSnapshotDelivered
    ]);
    // ── Auto-message from parent (e.g. tooltip "View Detailed Summary" CTA) ──
    const handleSendRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(handleSend);
    handleSendRef.current = handleSend;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DrAgentPanel.useEffect": ()=>{
            if (!autoMessage || !selectedPatientId) return;
            const am = autoMessage.trim().toLowerCase();
            const qp = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUICK_CLINICAL_SNAPSHOT_PROMPT"].trim().toLowerCase();
            if (am === qp || am.startsWith(qp)) {
                const existing = messagesByPatient[selectedPatientId] || [];
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$isSituationAtGlanceMessage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["threadAlreadyHasQuickClinicalGlance"])(existing, am)) {
                    return;
                }
            }
            const rafId = requestAnimationFrame({
                "DrAgentPanel.useEffect.rafId": ()=>{
                    requestAnimationFrame({
                        "DrAgentPanel.useEffect.rafId": ()=>{
                            handleSendRef.current(autoMessage);
                        }
                    }["DrAgentPanel.useEffect.rafId"]);
                }
            }["DrAgentPanel.useEffect.rafId"]);
            return ({
                "DrAgentPanel.useEffect": ()=>cancelAnimationFrame(rafId)
            })["DrAgentPanel.useEffect"];
        }
    }["DrAgentPanel.useEffect"], [
        autoMessage,
        autoMessageTrigger,
        selectedPatientId,
        messagesByPatient
    ]);
    // ── Pill Tap ──
    const handlePillTap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handlePillTap]": (pill)=>{
            handleSend(pill.label);
        }
    }["DrAgentPanel.useCallback[handlePillTap]"], [
        handleSend
    ]);
    // ── Feedback ──
    const handleFeedback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleFeedback]": (messageId, feedback)=>{
            setMessagesByPatient({
                "DrAgentPanel.useCallback[handleFeedback]": (prev)=>{
                    const msgs = prev[selectedPatientId] || [];
                    return {
                        ...prev,
                        [selectedPatientId]: msgs.map({
                            "DrAgentPanel.useCallback[handleFeedback]": (m)=>m.id === messageId ? {
                                    ...m,
                                    feedbackGiven: feedback
                                } : m
                        }["DrAgentPanel.useCallback[handleFeedback]"])
                    };
                }
            }["DrAgentPanel.useCallback[handleFeedback]"]);
        }
    }["DrAgentPanel.useCallback[handleFeedback]"], [
        selectedPatientId
    ]);
    // ── Patient Search Selection (homepage / patient-detail embeds only — not RxPad) ──
    const handlePatientSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handlePatientSelect]": (patientId)=>{
            if (mode === "rxpad") return;
            setSelectedPatientId(patientId);
        }
    }["DrAgentPanel.useCallback[handlePatientSelect]"], [
        mode
    ]);
    // ── Fill to RxPad ──
    const handleCopy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleCopy]": (payload)=>{
            if (!payload || typeof payload !== "object") return;
            const p = payload;
            let didCopy = false;
            if (p.dentalScanApply && ("TURBOPACK compile-time value", "object") !== "undefined") {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$emit$2d$dental$2d$scan$2d$apply$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emitDentalScanApplyNormalized"])(p.dentalScanApply);
                didCopy = true;
            }
            if ("sourceDateLabel" in p) {
                requestCopyToRxPad(p);
                try {
                    const existing = sessionStorage.getItem("pendingRxPadCopy");
                    const arr = existing ? JSON.parse(existing) : [];
                    arr.push(payload);
                    sessionStorage.setItem("pendingRxPadCopy", JSON.stringify(arr));
                } catch  {}
                didCopy = true;
            }
            if (didCopy) {
                setRxPadCopySnackbarMessage((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$rxpad$2d$copy$2d$feedback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRxPadCopySnackbarMessage"])(p));
                setRxPadCopySnackbarOpen(true);
            }
        }
    }["DrAgentPanel.useCallback[handleCopy]"], [
        requestCopyToRxPad
    ]);
    // ── Sidebar Navigation ──
    const handleSidebarNav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleSidebarNav]": (tab)=>{
            // Publish signal first so sidebar can process it
            publishSignal({
                type: "section_focus",
                sectionId: tab
            });
            // Small delay to let sidebar process the signal before closing agent panel
            setTimeout({
                "DrAgentPanel.useCallback[handleSidebarNav]": ()=>{
                    onClose();
                }
            }["DrAgentPanel.useCallback[handleSidebarNav]"], 50);
        }
    }["DrAgentPanel.useCallback[handleSidebarNav]"], [
        publishSignal,
        onClose
    ]);
    // ── From pill tap in chat (text-based) ──
    const handleChatPillTap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleChatPillTap]": (label)=>{
            handleSend(label);
        }
    }["DrAgentPanel.useCallback[handleChatPillTap]"], [
        handleSend
    ]);
    // ── Doctor View Change — directly rebuild intro messages ──
    const handleDoctorViewChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleDoctorViewChange]": (newType)=>{
            setDoctorViewType(newType);
            // Directly rebuild intro messages instead of delete-then-recreate via useEffect
            // This avoids the intermediate empty state that could cause visual flicker
            const newIntro = buildIntroMessages(summary, patient, showDoctorViewSelector ? newType : undefined, intakeMode, mode);
            setMessagesByPatient({
                "DrAgentPanel.useCallback[handleDoctorViewChange]": (prev)=>({
                        ...prev,
                        [selectedPatientId]: newIntro
                    })
            }["DrAgentPanel.useCallback[handleDoctorViewChange]"]);
            setIsTyping(false);
        }
    }["DrAgentPanel.useCallback[handleDoctorViewChange]"], [
        selectedPatientId,
        summary,
        patient,
        showDoctorViewSelector,
        intakeMode
    ]);
    // ── Intake Mode Change — directly rebuild intro messages ──
    const handleIntakeModeChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleIntakeModeChange]": (newMode)=>{
            setIntakeMode(newMode);
            // Directly rebuild intro messages instead of delete-then-recreate via useEffect
            const newIntro = buildIntroMessages(summary, patient, showDoctorViewSelector ? doctorViewType : undefined, newMode, mode);
            setMessagesByPatient({
                "DrAgentPanel.useCallback[handleIntakeModeChange]": (prev)=>({
                        ...prev,
                        [selectedPatientId]: newIntro
                    })
            }["DrAgentPanel.useCallback[handleIntakeModeChange]"]);
            setIsTyping(false);
        }
    }["DrAgentPanel.useCallback[handleIntakeModeChange]"], [
        selectedPatientId,
        summary,
        patient,
        showDoctorViewSelector,
        doctorViewType
    ]);
    // ── Patient Change ──
    const handlePatientChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handlePatientChange]": (id)=>{
            setSelectedPatientId(id);
            setInputValue("");
            setIsTyping(false);
        }
    }["DrAgentPanel.useCallback[handlePatientChange]"], []);
    // ── Chip shake — triggered when locked chip in input is clicked ──
    const handleLockedChipClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleLockedChipClick]": ()=>{
            setChipShaking(true);
            setTimeout({
                "DrAgentPanel.useCallback[handleLockedChipClick]": ()=>setChipShaking(false)
            }["DrAgentPanel.useCallback[handleLockedChipClick]"], 600);
        }
    }["DrAgentPanel.useCallback[handleLockedChipClick]"], []);
    // ── Edit message — ChatGPT-style: truncate after edited msg, re-send ──
    const handleEditMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleEditMessage]": (messageId, newText)=>{
            setMessagesByPatient({
                "DrAgentPanel.useCallback[handleEditMessage]": (prev)=>{
                    const msgs = prev[selectedPatientId] || [];
                    const idx = msgs.findIndex({
                        "DrAgentPanel.useCallback[handleEditMessage].idx": (m)=>m.id === messageId
                    }["DrAgentPanel.useCallback[handleEditMessage].idx"]);
                    if (idx < 0) return prev;
                    // Keep messages up to (not including) the edited one
                    const kept = msgs.slice(0, idx);
                    return {
                        ...prev,
                        [selectedPatientId]: kept
                    };
                }
            }["DrAgentPanel.useCallback[handleEditMessage]"]);
            // Re-send with new text after state updates
            setTimeout({
                "DrAgentPanel.useCallback[handleEditMessage]": ()=>handleSend(newText)
            }["DrAgentPanel.useCallback[handleEditMessage]"], 50);
        }
    }["DrAgentPanel.useCallback[handleEditMessage]"], [
        selectedPatientId,
        handleSend
    ]);
    // ── Handle attach — context-aware ──
    // Homepage (Clinic Overview, no patient) → open native file picker
    // Patient context → show bottom sheet with patient's documents
    const handleAttach = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleAttach]": ()=>{
            if (mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID) {
                // No patient context → trigger native file input
                fileInputRef.current?.click();
            } else {
                // Patient context → show document bottom sheet
                setShowDocBottomSheet(true);
            }
        }
    }["DrAgentPanel.useCallback[handleAttach]"], [
        mode,
        selectedPatientId
    ]);
    // ── Handle sending selected documents from bottom sheet ──
    const handleSendDocuments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleSendDocuments]": (docs)=>{
            setShowDocBottomSheet(false);
            const sorted = [
                ...docs
            ].sort({
                "DrAgentPanel.useCallback[handleSendDocuments].sorted": (a, b)=>{
                    const pri = {
                        "DrAgentPanel.useCallback[handleSendDocuments].sorted.pri": (d)=>d.docType === "dental_radiology" ? 0 : 1
                    }["DrAgentPanel.useCallback[handleSendDocuments].sorted.pri"];
                    return pri(a) - pri(b);
                }
            }["DrAgentPanel.useCallback[handleSendDocuments].sorted"]);
            const attachments = sorted.map({
                "DrAgentPanel.useCallback[handleSendDocuments].attachments": (d)=>({
                        type: /\.(jpe?g|png|webp|gif)$/i.test(d.fileName) ? "image" : "pdf",
                        fileName: d.fileName,
                        pageCount: d.pageCount
                    })
            }["DrAgentPanel.useCallback[handleSendDocuments].attachments"]);
            const textPrefix = buildAttachmentAnalyzePrompt(attachments);
            const userMsg = {
                id: uid(),
                role: "user",
                text: textPrefix,
                createdAt: new Date().toISOString(),
                attachments,
                attachment: attachments[0]
            };
            setMessagesByPatient({
                "DrAgentPanel.useCallback[handleSendDocuments]": (prev)=>({
                        ...prev,
                        [selectedPatientId]: [
                            ...prev[selectedPatientId] || [],
                            userMsg
                        ]
                    })
            }["DrAgentPanel.useCallback[handleSendDocuments]"]);
            setIsTyping(true);
            const primary = sorted[0];
            const docType = mode === "rxpad" ? "dental_radiology" : sorted.some({
                "DrAgentPanel.useCallback[handleSendDocuments]": (d)=>d.docType === "dental_radiology"
            }["DrAgentPanel.useCallback[handleSendDocuments]"]) ? "dental_radiology" : primary.docType === "radiology" ? "radiology" : primary.docType === "prescription" ? "prescription" : "pathology";
            setTimeout({
                "DrAgentPanel.useCallback[handleSendDocuments]": ()=>{
                    const reply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$reply$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDocumentReply"])(docType, summary);
                    const assistantMsg = {
                        id: uid(),
                        role: "assistant",
                        text: mode === "rxpad" ? reply.text : sorted.length === 1 ? reply.text : `I've analyzed ${sorted.length} documents. Here's the structured extraction (prioritizing dental imaging when present):\n\n${reply.text}`,
                        createdAt: new Date().toISOString(),
                        rxOutput: reply.rxOutput,
                        feedbackGiven: null
                    };
                    setMessagesByPatient({
                        "DrAgentPanel.useCallback[handleSendDocuments]": (prev)=>({
                                ...prev,
                                [selectedPatientId]: [
                                    ...prev[selectedPatientId] || [],
                                    assistantMsg
                                ]
                            })
                    }["DrAgentPanel.useCallback[handleSendDocuments]"]);
                    setIsTyping(false);
                }
            }["DrAgentPanel.useCallback[handleSendDocuments]"], 1200);
        }
    }["DrAgentPanel.useCallback[handleSendDocuments]"], [
        selectedPatientId,
        summary,
        mode
    ]);
    // ── Handle upload from bottom sheet or file input ──
    const handleUploadNew = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleUploadNew]": ()=>{
            setShowDocBottomSheet(false);
            fileInputRef.current?.click();
        }
    }["DrAgentPanel.useCallback[handleUploadNew]"], []);
    const handleFileInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleFileInputChange]": ()=>{
            const input = fileInputRef.current;
            if (!input?.files?.length) return;
            const files = Array.from(input.files);
            input.value = "";
            setShowAttachPanel(false);
            const uploadedAt = new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "2-digit"
            });
            const docs = files.map({
                "DrAgentPanel.useCallback[handleFileInputChange].docs": (file, i)=>({
                        id: `local-upload-${Date.now()}-${i}`,
                        fileName: file.name,
                        docType: mode === "rxpad" ? "dental_radiology" : inferUploadDocType(file.name),
                        uploadedAt,
                        uploadedBy: "This device",
                        pageCount: 1,
                        size: formatUploadSize(file.size)
                    })
            }["DrAgentPanel.useCallback[handleFileInputChange].docs"]);
            handleSendDocuments(docs);
        }
    }["DrAgentPanel.useCallback[handleFileInputChange]"], [
        handleSendDocuments,
        mode
    ]);
    const handleAttachSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleAttachSelect]": (docType)=>{
            setShowAttachPanel(false);
            const fileNameMap = {
                pathology: "Lab_Report_Mar2026.pdf",
                radiology: "X-Ray_Chest_Mar2026.pdf",
                prescription: "Previous_Rx_Mar2026.pdf",
                dental_radiology: "OPG_Panoramic_Scan.pdf"
            };
            const pageMap = {
                pathology: 2,
                radiology: 1,
                prescription: 1,
                dental_radiology: 1
            };
            const userMsg = {
                id: uid(),
                role: "user",
                text: "",
                createdAt: new Date().toISOString(),
                attachment: {
                    type: "pdf",
                    fileName: fileNameMap[docType] ?? "Document.pdf",
                    pageCount: pageMap[docType] ?? 1
                }
            };
            setMessagesByPatient({
                "DrAgentPanel.useCallback[handleAttachSelect]": (prev)=>({
                        ...prev,
                        [selectedPatientId]: [
                            ...prev[selectedPatientId] || [],
                            userMsg
                        ]
                    })
            }["DrAgentPanel.useCallback[handleAttachSelect]"]);
            setIsTyping(true);
            setTimeout({
                "DrAgentPanel.useCallback[handleAttachSelect]": ()=>{
                    const effectiveDocType = mode === "rxpad" ? "dental_radiology" : docType;
                    const reply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$reply$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDocumentReply"])(effectiveDocType, summary);
                    const assistantMsg = {
                        id: uid(),
                        role: "assistant",
                        text: reply.text,
                        createdAt: new Date().toISOString(),
                        rxOutput: reply.rxOutput,
                        feedbackGiven: null,
                        suggestions: reply.suggestions
                    };
                    setMessagesByPatient({
                        "DrAgentPanel.useCallback[handleAttachSelect]": (prev)=>({
                                ...prev,
                                [selectedPatientId]: [
                                    ...prev[selectedPatientId] || [],
                                    assistantMsg
                                ]
                            })
                    }["DrAgentPanel.useCallback[handleAttachSelect]"]);
                    setIsTyping(false);
                }
            }["DrAgentPanel.useCallback[handleAttachSelect]"], 1200);
        }
    }["DrAgentPanel.useCallback[handleAttachSelect]"], [
        selectedPatientId,
        summary,
        mode
    ]);
    // ── Voice transcription → structured RX ──
    const handleVoiceTranscription = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DrAgentPanel.useCallback[handleVoiceTranscription]": (text)=>{
            const userMsg = {
                id: uid(),
                role: "user",
                text: text.trim(),
                createdAt: new Date().toISOString(),
                isVoiceTranscript: true
            };
            setMessagesByPatient({
                "DrAgentPanel.useCallback[handleVoiceTranscription]": (prev)=>({
                        ...prev,
                        [selectedPatientId]: [
                            ...prev[selectedPatientId] || [],
                            userMsg
                        ]
                    })
            }["DrAgentPanel.useCallback[handleVoiceTranscription]"]);
            setIsTyping(true);
            setTimeout({
                "DrAgentPanel.useCallback[handleVoiceTranscription]": ()=>{
                    const structured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$voice$2d$rx$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enrichVoiceStructuredWithPatientContext"])(text, summary);
                    const assistantMsg = {
                        id: uid(),
                        role: "assistant",
                        text: structured.leadInText ?? "",
                        createdAt: new Date().toISOString(),
                        rxOutput: {
                            kind: "voice_structured_rx",
                            data: structured
                        },
                        feedbackGiven: null
                    };
                    setMessagesByPatient({
                        "DrAgentPanel.useCallback[handleVoiceTranscription]": (prev)=>({
                                ...prev,
                                [selectedPatientId]: [
                                    ...prev[selectedPatientId] || [],
                                    assistantMsg
                                ]
                            })
                    }["DrAgentPanel.useCallback[handleVoiceTranscription]"]);
                    setIsTyping(false);
                }
            }["DrAgentPanel.useCallback[handleVoiceTranscription]"], 800);
        }
    }["DrAgentPanel.useCallback[handleVoiceTranscription]"], [
        selectedPatientId,
        summary
    ]);
    // ── Chat scroll ref ──
    const chatScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DrAgentPanel.useEffect": ()=>{
            const el = chatScrollRef.current;
            if (!el) return;
            return ({
                "DrAgentPanel.useEffect": ()=>{}
            })["DrAgentPanel.useEffect"];
        }
    }["DrAgentPanel.useEffect"], []);
    // ── Patient documents for bottom sheet ──
    const patientDocuments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrAgentPanel.useMemo[patientDocuments]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATIENT_DOCUMENTS"][agentDataPatientKey] || []
    }["DrAgentPanel.useMemo[patientDocuments]"], [
        agentDataPatientKey
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$DrAgentRuntimeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DrAgentRuntimeContext"].Provider, {
        value: drAgentRuntimeValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            id: "dr-agent-panel-root",
            className: "relative flex h-full min-h-0 w-full min-w-0 flex-col bg-transparent",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "dra-gradient-wash pointer-events-none absolute inset-0 z-0",
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                    lineNumber: 1087,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute inset-0 z-[1] bg-white",
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                    lineNumber: 1088,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    ref: fileInputRef,
                    type: "file",
                    accept: ".pdf,.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    className: "hidden",
                    multiple: true,
                    onChange: handleFileInputChange
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                    lineNumber: 1091,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden",
                    style: {
                        background: "transparent"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: chatScrollRef,
                        className: "da-chat-scroll flex min-h-0 flex-1 flex-col overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none sticky top-0 z-30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shell$2f$AgentHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AgentHeader"], {
                                    availableSpecialties: availableSpecialties,
                                    activeSpecialty: activeSpecialty,
                                    onSpecialtyChange: setActiveSpecialty,
                                    onPatientChange: handlePatientChange,
                                    selectedPatientId: selectedPatientId,
                                    onClose: onClose,
                                    doctorViewType: doctorViewType,
                                    onDoctorViewChange: handleDoctorViewChange,
                                    showDoctorViewSelector: showDoctorViewSelector,
                                    intakeMode: intakeMode,
                                    onIntakeModeChange: handleIntakeModeChange
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                                    lineNumber: 1110,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                                lineNumber: 1109,
                                columnNumber: 11
                            }, this),
                            messages.length === 0 && !isTyping ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$WelcomeScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WelcomeScreen"], {
                                context: mode === "homepage" ? selectedPatientId === HOMEPAGE_COMMON_ID ? "homepage" : "patient_detail" : "rxpad",
                                patientName: selectedPatientId !== HOMEPAGE_COMMON_ID ? patient?.label : undefined,
                                hasIntake: !!summary.symptomCollectorData,
                                summary: selectedPatientId !== HOMEPAGE_COMMON_ID ? summary : undefined,
                                onActionClick: (msg)=>handleSend(msg)
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                                lineNumber: 1126,
                                columnNumber: 13
                            }, this) : /* Chat messages */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$ChatThread$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatThread"], {
                                messages: messages,
                                isTyping: isTyping,
                                typingHint: typingHint,
                                onFeedback: handleFeedback,
                                onPillTap: handleChatPillTap,
                                onCopy: handleCopy,
                                onSidebarNav: handleSidebarNav,
                                className: "flex-1",
                                activeSpecialty: activeSpecialty,
                                patientDocuments: patientDocuments,
                                onPatientSelect: mode === "rxpad" ? undefined : handlePatientSelect,
                                onEditMessage: handleEditMessage,
                                onOpenMedicalRecords: ()=>{
                                    setShowDocBottomSheet(true);
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                                lineNumber: 1139,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                        lineNumber: 1105,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                    lineNumber: 1101,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky bottom-0 z-10 shrink-0 border-t border-tp-slate-100/80 bg-white shadow-[0_-4px_16px_rgba(15,23,42,0.04)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute -top-[16px] left-0 right-0",
                            style: {
                                height: 16,
                                background: "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.55) 42%, transparent)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                            lineNumber: 1163,
                            columnNumber: 9
                        }, this),
                        pills.length > 0 && messages.length > 0 && !isTyping && !glanceInlinePillsActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-[4px] pt-[8px] pb-[6px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$PillBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PillBar"], {
                                pills: pills,
                                onTap: handlePillTap,
                                disabled: false
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                                lineNumber: 1173,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                            lineNumber: 1172,
                            columnNumber: 11
                        }, this),
                        showAttachPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$AttachPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AttachPanel"], {
                            onSelect: handleAttachSelect,
                            onClose: ()=>setShowAttachPanel(false)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                            lineNumber: 1181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatInput"], {
                            value: inputValue,
                            onChange: (v)=>{
                                setInputValue(v);
                                if (isPrefilled) setIsPrefilled(false);
                            },
                            onSend: ()=>{
                                setIsPrefilled(false);
                                handleSend();
                            },
                            onAttach: handleAttach,
                            onVoiceTranscription: handleVoiceTranscription,
                            disabled: isTyping,
                            isPrefilled: isPrefilled,
                            placeholder: selectedPatientId === HOMEPAGE_COMMON_ID ? "Ask about today's clinic..." : `Ask about ${patient.label}...`,
                            patientName: selectedPatientId === HOMEPAGE_COMMON_ID ? "Clinic Overview" : patient.label || undefined,
                            patientMeta: selectedPatientId === HOMEPAGE_COMMON_ID ? undefined : patient.gender && patient.age ? `${patient.gender}|${patient.age}y` : undefined,
                            patientLocked: mode === "rxpad" || mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID,
                            patientLockedMessage: mode === "rxpad" ? "Patient is fixed for this RxPad visit. Change patient from the RxPad header or Appointments." : "Use the floating chip above to switch context",
                            onPatientClick: mode === "rxpad" || mode === "homepage" && selectedPatientId === HOMEPAGE_COMMON_ID ? undefined : ()=>setIsPatientSheetOpen(true),
                            onLockedChipClick: handleLockedChipClick,
                            isClinicContext: selectedPatientId === HOMEPAGE_COMMON_ID
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                            lineNumber: 1186,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                    lineNumber: 1161,
                    columnNumber: 7
                }, this),
                showDocBottomSheet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$chat$2f$DocumentBottomSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentBottomSheet"], {
                    documents: patientDocuments,
                    onSendDocuments: handleSendDocuments,
                    onUploadNew: handleUploadNew,
                    onClose: ()=>setShowDocBottomSheet(false),
                    patientFirstName: patient?.label?.split(" ")[0],
                    maxSelect: 12
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                    lineNumber: 1215,
                    columnNumber: 9
                }, this),
                mode === "homepage" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shell$2f$PatientSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientSelector"], {
                    selectedId: selectedPatientId,
                    onSelect: handlePatientChange,
                    showUniversalOption: mode === "homepage",
                    universalOptionId: HOMEPAGE_COMMON_ID,
                    externalPatients: homepagePatients,
                    isOpen: isPatientSheetOpen,
                    onClose: ()=>setIsPatientSheetOpen(false)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                    lineNumber: 1227,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: `
        .da-floating-chip { cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .da-floating-chip:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 4px 16px rgba(15,23,42,0.12), 0 0 0 1px rgba(255,255,255,0.5) inset !important;
        }
        .da-floating-chip:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 1px 4px rgba(15,23,42,0.06), 0 0 0 1px rgba(255,255,255,0.5) inset !important;
        }
        .da-floating-chip-readonly { cursor: default; }
        @keyframes daChipShake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-4px); }
          30% { transform: translateX(4px); }
          45% { transform: translateX(-3px); }
          60% { transform: translateX(3px); }
          75% { transform: translateX(-1px); }
          90% { transform: translateX(1px); }
        }
        .da-chip-shake { animation: daChipShake 0.5s ease-in-out; }
        .da-chat-scroll::-webkit-scrollbar { width: 3px; }
        .da-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .da-chat-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 3px; }
        .da-chat-scroll { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.12) transparent; }

        /* ── Rotating AI-conic wash — slow, blurred so colours bleed together
           smoothly. Sits behind the white backdrop at ~11% opacity so it only
           shows through the glass header tags. ── */
        @property --dra-wash-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .dra-gradient-wash {
          opacity: 0.11;
          background: conic-gradient(
            from var(--dra-wash-angle) at 50% 50%,
            #E38BBE 0deg,
            #B06CE0 55deg,
            #8B5CF6 115deg,
            #6B5FE0 180deg,
            #4B4AD5 235deg,
            #4FACFE 295deg,
            #E38BBE 360deg
          );
          filter: blur(90px);
          animation: draWashRotate 22s linear infinite;
          will-change: --dra-wash-angle;
        }
        @keyframes draWashRotate {
          from { --dra-wash-angle: 0deg; }
          to   { --dra-wash-angle: 360deg; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dra-gradient-wash { animation: none; }
        }
      `
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                    lineNumber: 1239,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPSnackbar"], {
                    open: rxPadCopySnackbarOpen,
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center"
                    },
                    autoHideDuration: 3200,
                    onClose: (_, reason)=>{
                        if (reason === "clickaway") return;
                        setRxPadCopySnackbarOpen(false);
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
                                fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                                lineNumber: 1314,
                                columnNumber: 13
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: rxPadCopySnackbarMessage
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                                lineNumber: 1315,
                                columnNumber: 13
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                        lineNumber: 1307,
                        columnNumber: 11
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
                    lineNumber: 1298,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
            lineNumber: 1082,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/dr-agent/DrAgentPanel.tsx",
        lineNumber: 1081,
        columnNumber: 5
    }, this);
}
_s(DrAgentPanel, "TQSjpzV+cf18jkrCEeRvBQRfNZs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$sync$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadSync"]
    ];
});
_c1 = DrAgentPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "StaticPatientStrip");
__turbopack_context__.k.register(_c1, "DrAgentPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_tp-rxpad_dr-agent_607b843f._.js.map