(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/tp-rxpad/dr-agent/engines/pill-engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// -----------------------------------------------------------------
// Canned Pill Engine -- 4-Layer Priority Pipeline
// Pure function: (summary, phase, tabLens) -> CannedPill[]
// -----------------------------------------------------------------
__turbopack_context__.s([
    "generatePills",
    ()=>generatePills
]);
const MAX_PILLS = 35;
// =============== LAYER 1: SAFETY FORCE ===============
function getLayer1(summary) {
    const pills = [];
    // SpO2 critical
    const spo2 = summary.todayVitals?.spo2 ? parseFloat(summary.todayVitals.spo2) : null;
    if (spo2 !== null && spo2 < 90) {
        pills.push({
            id: "force-spo2-critical",
            label: "Review SpO\u2082",
            priority: 0,
            layer: 1,
            force: true,
            tone: "primary"
        });
    }
    // Allergies present
    if (summary.allergies && summary.allergies.length > 0) {
        pills.push({
            id: "force-allergy",
            label: "Allergy Alert",
            priority: 2,
            layer: 1,
            force: true,
            tone: "primary"
        });
    }
    return pills;
}
// =============== LAYER 2: CLINICAL FLAGS ===============
function getLayer2(summary) {
    const pills = [];
    if (summary.labFlagCount >= 3) {
        pills.push({
            id: "flag-labs",
            label: `${summary.labFlagCount} lab values flagged`,
            priority: 10,
            layer: 2,
            tone: "primary"
        });
    }
    const spo2 = summary.todayVitals?.spo2 ? parseFloat(summary.todayVitals.spo2) : null;
    if (spo2 !== null && spo2 >= 90 && spo2 < 95) {
        pills.push({
            id: "flag-spo2-declining",
            label: "SpO\u2082 trend declining",
            priority: 14,
            layer: 2,
            tone: "primary"
        });
    }
    // Check vital abnormals
    if (summary.todayVitals?.bp) {
        const sys = parseFloat(summary.todayVitals.bp.split("/")[0]);
        if (sys > 140 || sys < 90) {
            pills.push({
                id: "flag-vitals-bp",
                label: "BP needs attention",
                priority: 16,
                layer: 2,
                tone: "primary"
            });
        }
    }
    if (summary.todayVitals?.temp) {
        const temp = parseFloat(summary.todayVitals.temp);
        if (temp >= 100.4) {
            pills.push({
                id: "flag-vitals-temp",
                label: "Temperature elevated",
                priority: 18,
                layer: 2,
                tone: "primary"
            });
        }
    }
    // Specialty-aware clinical pills (Layer 2 when clinically relevant)
    if (summary.obstetricData) {
        pills.push({
            id: "specialty-obstetric",
            label: "Obstetric summary",
            priority: 20,
            layer: 2,
            tone: "primary"
        });
    }
    if (summary.gynecData) {
        pills.push({
            id: "specialty-gynec",
            label: "Gynec summary",
            priority: 22,
            layer: 2,
            tone: "primary"
        });
    }
    if (summary.pediatricsData) {
        pills.push({
            id: "specialty-pediatrics",
            label: "Growth & vaccines",
            priority: 24,
            layer: 2,
            tone: "primary"
        });
    }
    if (summary.ophthalData) {
        pills.push({
            id: "specialty-ophthal",
            label: "Vision summary",
            priority: 26,
            layer: 2,
            tone: "primary"
        });
    }
    // POMR per-problem pills (CKD, Hypertension, Diabetes, Anaemia, etc.)
    if (summary.pomrProblems && summary.pomrProblems.length > 0) {
        summary.pomrProblems.forEach((prob, i)=>{
            const shortLabel = prob.problem.split(/[/–—]/)[0].trim();
            pills.push({
                id: `pomr-${i}-${shortLabel.toLowerCase().replace(/\s+/g, "-")}`,
                label: shortLabel,
                priority: 28 + i,
                layer: 2,
                tone: "primary"
            });
        });
        // Missing data pills
        if (summary.missingExpectedFields && summary.missingExpectedFields.length > 0) {
            pills.push({
                id: "pomr-missing-data",
                label: `${summary.missingExpectedFields.length} missing tests`,
                priority: 35,
                layer: 2,
                tone: "primary"
            });
        }
        // Cross-problem interaction pills
        if (summary.crossProblemFlags && summary.crossProblemFlags.length > 0) {
            pills.push({
                id: "pomr-cross-flags",
                label: "Drug interactions",
                priority: 36,
                layer: 2,
                tone: "primary"
            });
        }
        // Due alerts pills
        if (summary.dueAlerts && summary.dueAlerts.length > 0) {
            pills.push({
                id: "pomr-due-alerts",
                label: `${summary.dueAlerts.length} overdue items`,
                priority: 37,
                layer: 2,
                tone: "primary"
            });
        }
        // Recommendation pills
        if (summary.recommendationTiers) {
            const actCount = summary.recommendationTiers.filter((r)=>r.tier === "act").length;
            if (actCount > 0) {
                pills.push({
                    id: "pomr-act-now",
                    label: `${actCount} actions needed`,
                    priority: 38,
                    layer: 2,
                    tone: "primary"
                });
            }
        }
    }
    // Record alerts
    if (summary.recordAlerts && summary.recordAlerts.length > 0) {
        pills.push({
            id: "flag-records",
            label: "Pending records",
            priority: 39,
            layer: 2,
            tone: "primary"
        });
    }
    // ---- CKD / chronic-disease-aware clinical pills ----
    // Dialysis-related pills
    if (summary.pomrProblems?.some((p)=>p.problem.toLowerCase().includes("ckd"))) {
        pills.push({
            id: "ckd-dialysis-adequacy",
            label: "Dialysis adequacy",
            priority: 40,
            layer: 2,
            tone: "primary"
        });
        pills.push({
            id: "ckd-fluid-balance",
            label: "Fluid & electrolytes",
            priority: 41,
            layer: 2,
            tone: "primary"
        });
        pills.push({
            id: "ckd-bone-mineral",
            label: "Bone mineral status",
            priority: 42,
            layer: 2,
            tone: "primary"
        });
        pills.push({
            id: "ckd-cardiovascular",
            label: "CV risk assessment",
            priority: 43,
            layer: 2,
            tone: "primary"
        });
    }
    // Diabetes-related pills
    if (summary.pomrProblems?.some((p)=>p.problem.toLowerCase().includes("diabetes"))) {
        pills.push({
            id: "dm-glycemic-control",
            label: "Glycemic control",
            priority: 44,
            layer: 2,
            tone: "primary"
        });
        pills.push({
            id: "dm-insulin-adjust",
            label: "Insulin adjustment",
            priority: 45,
            layer: 2,
            tone: "primary"
        });
    }
    // Anaemia-related pills
    if (summary.pomrProblems?.some((p)=>p.problem.toLowerCase().includes("anaemia") || p.problem.toLowerCase().includes("anemia"))) {
        pills.push({
            id: "anaemia-epo-dose",
            label: "EPO dosing",
            priority: 46,
            layer: 2,
            tone: "primary"
        });
        pills.push({
            id: "anaemia-iron-stores",
            label: "Iron stores",
            priority: 47,
            layer: 2,
            tone: "primary"
        });
    }
    // Multi-morbidity pills (when 3+ problems)
    if (summary.pomrProblems && summary.pomrProblems.length >= 3) {
        pills.push({
            id: "pomr-polypharmacy",
            label: "Polypharmacy review",
            priority: 48,
            layer: 2,
            tone: "primary"
        });
        pills.push({
            id: "pomr-medication-timeline",
            label: "Medication timeline",
            priority: 49,
            layer: 2,
            tone: "primary"
        });
    }
    // Active medications review
    if (summary.activeMeds && summary.activeMeds.length > 3) {
        pills.push({
            id: "flag-med-review",
            label: "Medication review",
            priority: 50,
            layer: 2,
            tone: "primary"
        });
    }
    // Chronic conditions
    if (summary.chronicConditions && summary.chronicConditions.length > 0) {
        pills.push({
            id: "flag-chronic-summary",
            label: "Chronic conditions",
            priority: 51,
            layer: 2,
            tone: "primary"
        });
    }
    return pills;
}
// =============== LAYER 3: CONSULTATION PHASE (Patient-Data-Aware) ===============
function getLayer3(phase, summary) {
    const hasVitals = !!(summary.todayVitals && Object.keys(summary.todayVitals).length > 0);
    const hasLabs = !!(summary.keyLabs && summary.keyLabs.length > 0);
    const hasLastVisit = !!summary.lastVisit;
    const isNewPatient = summary.symptomCollectorData?.isNewPatient || summary.specialtyTags.length === 0;
    const hasSymptoms = !!summary.symptomCollectorData?.symptoms?.length;
    function buildEmpty() {
        if (isNewPatient) {
            // New patient — no past data to show, focus on intake + initial workup
            const pills = [];
            if (hasSymptoms) pills.push({
                id: "phase-intake",
                label: "Reported by patient",
                priority: 30,
                layer: 3,
                tone: "primary"
            });
            pills.push({
                id: "phase-ddx",
                label: "Suggest DDX",
                priority: 32,
                layer: 3,
                tone: "primary"
            });
            pills.push({
                id: "phase-initial-workup",
                label: "Initial investigations",
                priority: 34,
                layer: 3,
                tone: "primary"
            });
            pills.push({
                id: "phase-ask",
                label: "Ask me anything",
                priority: 36,
                layer: 3,
                tone: "primary"
            });
            return pills;
        }
        // Existing patient — show pills for data that actually exists
        const pills = [];
        const hasIntake = !!summary.symptomCollectorData?.symptoms?.length;
        const hasFlaggedLabs = !!summary.keyLabs?.some((l)=>l.flag === "high" || l.flag === "low");
        const hasFollowUp = !!summary.followUpOverdueDays;
        // Always show "Patient's detailed summary" as the absolute first pill
        pills.push({
            id: "phase-detailed-summary",
            label: "Patient's detailed summary",
            priority: -1,
            layer: 3,
            force: true,
            tone: "primary"
        });
        if (hasIntake) pills.push({
            id: "phase-intake",
            label: "Reported by patient",
            priority: 30,
            layer: 3,
            tone: "primary"
        });
        if (hasVitals) pills.push({
            id: "phase-vital-trends",
            label: "Vital trends",
            priority: 31,
            layer: 3,
            tone: "primary"
        });
        if (hasFlaggedLabs) pills.push({
            id: "phase-flagged-labs",
            label: "Flagged lab results",
            priority: 32,
            layer: 3,
            tone: "primary"
        });
        else if (hasLabs) pills.push({
            id: "phase-labs",
            label: "Lab overview",
            priority: 32,
            layer: 3,
            tone: "primary"
        });
        if (hasLastVisit) pills.push({
            id: "phase-last-visit",
            label: "Last visit details",
            priority: 33,
            layer: 3,
            tone: "primary"
        });
        if (hasFollowUp) pills.push({
            id: "phase-followup-overview",
            label: "Follow-up overview",
            priority: 34,
            layer: 3,
            tone: "primary"
        });
        pills.push({
            id: "phase-ask",
            label: "Ask me anything",
            priority: 36,
            layer: 3,
            tone: "primary"
        });
        return pills;
    }
    function buildSymptomsEntered() {
        const pills = [
            {
                id: "phase-ddx",
                label: "Suggest DDX",
                priority: 30,
                layer: 3,
                tone: "primary"
            }
        ];
        if (hasLastVisit) pills.push({
            id: "phase-compare",
            label: "Compare with last visit",
            priority: 32,
            layer: 3,
            tone: "primary"
        });
        if (hasVitals) pills.push({
            id: "phase-vital-trends",
            label: "Vital trends",
            priority: 33,
            layer: 3,
            tone: "primary"
        });
        if (!hasLastVisit) pills.push({
            id: "phase-investigation",
            label: "Suggest investigations",
            priority: 34,
            layer: 3,
            tone: "primary"
        });
        return pills;
    }
    const generators = {
        empty: buildEmpty,
        symptoms_entered: buildSymptomsEntered,
        dx_accepted: ()=>[
                {
                    id: "phase-protocol-meds",
                    label: "Suggest medications",
                    priority: 30,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "phase-investigation",
                    label: "Suggest investigations",
                    priority: 32,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "phase-advice",
                    label: "Draft advice",
                    priority: 34,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "phase-followup",
                    label: "Plan follow-up",
                    priority: 36,
                    layer: 3,
                    tone: "primary"
                }
            ],
        meds_written: ()=>[
                {
                    id: "phase-translate",
                    label: "Translate to regional",
                    priority: 32,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "phase-followup",
                    label: "Plan follow-up",
                    priority: 34,
                    layer: 3,
                    tone: "primary"
                }
            ],
        near_complete: ()=>[
                {
                    id: "phase-completeness",
                    label: "Completeness check",
                    priority: 30,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "phase-translate",
                    label: "Translate advice",
                    priority: 32,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "phase-summary-final",
                    label: "Visit summary",
                    priority: 34,
                    layer: 3,
                    tone: "primary"
                }
            ]
    };
    const base = (generators[phase] || generators.empty)();
    // Add lab comparison pill when labs are available (all phases)
    if (hasLabs && !base.some((p)=>p.id === "phase-lab-compare")) {
        base.push({
            id: "phase-lab-compare",
            label: "Lab comparison",
            priority: 55,
            layer: 3,
            tone: "primary"
        });
    }
    return base;
}
// =============== LAYER 4: TAB LENS ===============
function getLayer4(lens) {
    const map = {
        "dr-agent": [],
        "past-visits": [
            {
                id: "lens-compare",
                label: "Compare visits",
                priority: 60,
                layer: 4,
                tone: "primary"
            },
            {
                id: "lens-recurrence",
                label: "Recurrence check",
                priority: 62,
                layer: 4,
                tone: "primary"
            }
        ],
        vitals: [
            {
                id: "lens-vital-trends",
                label: "Vital trends",
                priority: 60,
                layer: 4,
                tone: "primary"
            },
            {
                id: "lens-graph",
                label: "Graph view",
                priority: 62,
                layer: 4,
                tone: "primary"
            }
        ],
        history: [
            {
                id: "lens-med-search",
                label: "Med history search",
                priority: 60,
                layer: 4,
                tone: "primary"
            },
            {
                id: "lens-chronic-timeline",
                label: "Chronic timeline",
                priority: 62,
                layer: 4,
                tone: "primary"
            }
        ],
        "lab-results": [
            {
                id: "lens-lab-compare",
                label: "Lab comparison",
                priority: 60,
                layer: 4,
                tone: "primary"
            },
            {
                id: "lens-annual-panel",
                label: "Annual panel",
                priority: 62,
                layer: 4,
                tone: "primary"
            }
        ],
        obstetric: [
            {
                id: "lens-ob-summary",
                label: "Obstetric summary",
                priority: 60,
                layer: 4,
                tone: "primary"
            },
            {
                id: "lens-anc",
                label: "ANC schedule",
                priority: 62,
                layer: 4,
                tone: "primary"
            }
        ],
        "medical-records": [
            {
                id: "lens-ocr",
                label: "OCR analysis",
                priority: 60,
                layer: 4,
                tone: "primary"
            },
            {
                id: "lens-extract",
                label: "Report extract",
                priority: 62,
                layer: 4,
                tone: "primary"
            }
        ]
    };
    return map[lens] || [];
}
// =============== TREATING PHYSICIAN — trend-focused pills ===============
function getTreatingPhysicianPills(summary) {
    const pills = [];
    // Always show detailed summary as the absolute first pill
    pills.push({
        id: "tp-detailed-summary",
        label: "Patient's detailed summary",
        priority: -1,
        layer: 3,
        force: true,
        tone: "primary"
    });
    pills.push({
        id: "tp-vital-trends",
        label: "Vital trends",
        priority: 30,
        layer: 3,
        tone: "primary"
    });
    if (summary.keyLabs && summary.keyLabs.length > 0) {
        pills.push({
            id: "tp-lab-compare",
            label: "Lab comparison",
            priority: 31,
            layer: 3,
            tone: "primary"
        });
    }
    // CKD-specific trends
    if (summary.pomrProblems?.some((p)=>p.problem.toLowerCase().includes("ckd"))) {
        pills.push({
            id: "tp-egfr-trend",
            label: "eGFR trend",
            priority: 32,
            layer: 3,
            tone: "primary"
        });
    }
    // Diabetes-specific trends
    if (summary.pomrProblems?.some((p)=>p.problem.toLowerCase().includes("diabetes"))) {
        pills.push({
            id: "tp-hba1c-trend",
            label: "HbA1c trend",
            priority: 33,
            layer: 3,
            tone: "primary"
        });
    }
    pills.push({
        id: "tp-med-timeline",
        label: "Medication timeline",
        priority: 34,
        layer: 3,
        tone: "primary"
    });
    pills.push({
        id: "tp-plan-followup",
        label: "Plan follow-up",
        priority: 35,
        layer: 3,
        tone: "primary"
    });
    pills.push({
        id: "tp-ask",
        label: "Ask me anything",
        priority: 36,
        layer: 3,
        tone: "primary"
    });
    return pills;
}
// =============== EMERGENCY — triage-only pills ===============
function getEmergencyPills(summary) {
    const pills = [];
    // Force allergy alert if allergies present
    if (summary.allergies && summary.allergies.length > 0) {
        pills.push({
            id: "er-allergy",
            label: "Allergy Alert",
            priority: 0,
            layer: 1,
            force: true,
            tone: "primary"
        });
    }
    // Cross-problem interactions
    if (summary.crossProblemFlags && summary.crossProblemFlags.length > 0) {
        pills.push({
            id: "er-interactions",
            label: "Drug interactions",
            priority: 10,
            layer: 2,
            tone: "primary"
        });
    }
    // Always show detailed summary as the absolute first pill
    pills.push({
        id: "er-detailed-summary",
        label: "Patient's detailed summary",
        priority: -1,
        layer: 2,
        force: true,
        tone: "primary"
    });
    pills.push({
        id: "er-recent-er",
        label: "Recent ER history",
        priority: 12,
        layer: 2,
        tone: "primary"
    });
    pills.push({
        id: "er-key-labs",
        label: "Key labs",
        priority: 14,
        layer: 2,
        tone: "primary"
    });
    pills.push({
        id: "er-active-meds",
        label: "Active medications",
        priority: 16,
        layer: 2,
        tone: "primary"
    });
    return pills;
}
function generatePills(summary, phase, tabLens, doctorViewType) {
    // --- Doctor-type-specific pill sets ---
    if (doctorViewType === "treating_physician") {
        // Layer 1 safety + treating physician trend pills only (no Layer 2 POMR, no Layer 4)
        const all = [
            ...getLayer1(summary),
            ...getTreatingPhysicianPills(summary)
        ];
        all.sort((a, b)=>a.priority - b.priority);
        const seen = new Set();
        return all.filter((p)=>{
            if (seen.has(p.label)) return false;
            seen.add(p.label);
            return true;
        }).slice(0, MAX_PILLS);
    }
    if (doctorViewType === "emergency_oncall") {
        // Triage-only pills
        const all = getEmergencyPills(summary);
        all.sort((a, b)=>a.priority - b.priority);
        return all.slice(0, MAX_PILLS);
    }
    // --- Default / specialist_first_visit: all layers ---
    const all = [
        ...getLayer1(summary),
        ...getLayer2(summary),
        ...getLayer3(phase, summary),
        ...getLayer4(tabLens)
    ];
    // Sort by priority (ascending = highest priority first)
    all.sort((a, b)=>a.priority - b.priority);
    // Deduplicate by label
    const seen = new Set();
    const deduped = all.filter((p)=>{
        if (seen.has(p.label)) return false;
        seen.add(p.label);
        return true;
    });
    // Layer 1 force pills always included, rest truncated to MAX_PILLS
    const forced = deduped.filter((p)=>p.force);
    const rest = deduped.filter((p)=>!p.force);
    const available = MAX_PILLS - forced.length;
    return [
        ...forced,
        ...rest.slice(0, Math.max(0, available))
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/engines/homepage-pill-engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// -----------------------------------------------------------------
// Homepage Pill Engine -- Generates operational canned pills
// for the Homepage Doctor Agent based on active tab, rail item,
// and patient context (now patient-data-aware)
// -----------------------------------------------------------------
__turbopack_context__.s([
    "ALL_HOMEPAGE_PILLS",
    ()=>ALL_HOMEPAGE_PILLS,
    "generateHomepagePills",
    ()=>generateHomepagePills
]);
// ─── Master list: one pill per homepage card type (15 total) ─────
// The UI will show max 4–5 at a time; tab overrides pick the
// most relevant subset. This master list is the exhaustive catalogue
// so every homepage card kind has a discoverable entry-point.
const ALL_HOMEPAGE_PILLS = [
    /* ① follow_up_list     */ {
        id: "hp-followups",
        label: "Follow-up dues today",
        priority: 12,
        layer: 3,
        tone: "primary"
    },
    /* ② follow_up_week     */ {
        id: "hp-followups-week",
        label: "Follow-up dues this week",
        priority: 14,
        layer: 3,
        tone: "primary"
    },
    /* ⑤ donut_chart        */ {
        id: "hp-demographics",
        label: "Patient demographics",
        priority: 20,
        layer: 3,
        tone: "primary"
    },
    /* ⑥ pie_chart          */ {
        id: "hp-diagnosis-dist",
        label: "Diagnosis breakdown",
        priority: 22,
        layer: 3,
        tone: "primary"
    },
    /* ⑦ line_graph         */ {
        id: "hp-patient-volume",
        label: "Patient trends",
        priority: 24,
        layer: 3,
        tone: "primary"
    },
    /* ⑧ analytics_table    */ {
        id: "hp-kpis",
        label: "Weekly KPIs",
        priority: 26,
        layer: 3,
        tone: "primary"
    },
    /* ⑨ condition_bar      */ {
        id: "hp-conditions",
        label: "Chronic conditions",
        priority: 28,
        layer: 3,
        tone: "primary"
    },
    /* ⑩ heatmap            */ {
        id: "hp-peak-hours",
        label: "Peak hours",
        priority: 30,
        layer: 3,
        tone: "primary"
    },
    /* ⑪ referral           */ {
        id: "hp-referrals",
        label: "Referral summary",
        priority: 32,
        layer: 3,
        tone: "primary"
    },
    /* ⑫ vaccination_sched  */ {
        id: "hp-vaccine-schedule",
        label: "Vaccination schedule",
        priority: 34,
        layer: 3,
        tone: "primary"
    },
    /* ⑭ vaccination_due    */ {
        id: "hp-vaccine-due",
        label: "Vaccination due list",
        priority: 38,
        layer: 3,
        tone: "warning"
    },
    /* ⑮ anc_schedule_list  */ {
        id: "hp-anc-schedule",
        label: "ANC schedule",
        priority: 40,
        layer: 3,
        tone: "warning"
    }
];
// ─── Tab overrides: pick the 4 most relevant pills per tab ──────
const TAB_OVERRIDES = {
    queue: [
        ALL_HOMEPAGE_PILLS[2],
        ALL_HOMEPAGE_PILLS[3],
        ALL_HOMEPAGE_PILLS[4],
        ALL_HOMEPAGE_PILLS[5],
        ALL_HOMEPAGE_PILLS[6],
        ALL_HOMEPAGE_PILLS[7],
        ALL_HOMEPAGE_PILLS[8],
        ALL_HOMEPAGE_PILLS[9],
        ALL_HOMEPAGE_PILLS[10],
        ALL_HOMEPAGE_PILLS[11],
        ALL_HOMEPAGE_PILLS[0],
        ALL_HOMEPAGE_PILLS[1]
    ],
    finished: [
        ALL_HOMEPAGE_PILLS[3],
        ALL_HOMEPAGE_PILLS[1],
        ALL_HOMEPAGE_PILLS[2],
        ALL_HOMEPAGE_PILLS[6]
    ],
    cancelled: [
        ALL_HOMEPAGE_PILLS[7],
        ALL_HOMEPAGE_PILLS[4],
        ALL_HOMEPAGE_PILLS[5],
        ALL_HOMEPAGE_PILLS[2]
    ],
    draft: [
        ALL_HOMEPAGE_PILLS[9],
        ALL_HOMEPAGE_PILLS[8],
        ALL_HOMEPAGE_PILLS[10],
        ALL_HOMEPAGE_PILLS[11]
    ],
    "pending-digitisation": [
        ALL_HOMEPAGE_PILLS[8],
        ALL_HOMEPAGE_PILLS[1],
        ALL_HOMEPAGE_PILLS[5],
        ALL_HOMEPAGE_PILLS[0]
    ]
};
// Rail-specific pills — shown when a non-appointments rail item is active
const RAIL_PILLS = {
    "follow-ups": [
        {
            id: "rail-due-today",
            label: "Follow-up dues today",
            priority: 10,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-overdue-today",
            label: "Overdue follow-ups today",
            priority: 12,
            layer: 3,
            tone: "warning"
        },
        {
            id: "rail-thisweek",
            label: "This week follow-ups",
            priority: 14,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-rate",
            label: "Follow-up rate",
            priority: 16,
            layer: 3,
            tone: "info"
        }
    ],
    "opd-billing": [
        {
            id: "rail-collection",
            label: "Today's collection",
            priority: 10,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-billing-today",
            label: "Today's billing",
            priority: 12,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-deposits-today",
            label: "Today's deposits",
            priority: 14,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-invoice",
            label: "Generate invoice",
            priority: 16,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-due-week",
            label: "Patients with due this week",
            priority: 18,
            layer: 3,
            tone: "warning"
        },
        {
            id: "rail-due-till",
            label: "Patients with due till now",
            priority: 20,
            layer: 3,
            tone: "warning"
        }
    ],
    "all-patients": [
        {
            id: "rail-demographics",
            label: "Patient demographics",
            priority: 10,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-diagnosis",
            label: "Diagnosis breakdown",
            priority: 12,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-trends",
            label: "Patient trends",
            priority: 14,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-kpis",
            label: "Weekly KPIs",
            priority: 16,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-chronic",
            label: "Chronic conditions",
            priority: 18,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-peak",
            label: "Peak hours",
            priority: 20,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-referrals",
            label: "Referral summary",
            priority: 22,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-vaccine",
            label: "Vaccination schedule",
            priority: 24,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-vaccine-due",
            label: "Vaccination due list",
            priority: 26,
            layer: 3,
            tone: "warning"
        },
        {
            id: "rail-anc",
            label: "ANC schedule",
            priority: 28,
            layer: 3,
            tone: "warning"
        },
        {
            id: "rail-fu-due-today",
            label: "Follow-up dues today",
            priority: 30,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-fu-due-week",
            label: "Follow-up dues this week",
            priority: 32,
            layer: 3,
            tone: "primary"
        }
    ],
    pharmacy: [
        {
            id: "rail-lowstock",
            label: "Low stock alerts",
            priority: 10,
            layer: 3,
            tone: "danger"
        },
        {
            id: "rail-pendingrx",
            label: "Pending prescriptions",
            priority: 12,
            layer: 3,
            tone: "warning"
        },
        {
            id: "rail-dispense",
            label: "Dispense history",
            priority: 14,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-expiring",
            label: "Expiring medicines",
            priority: 16,
            layer: 3,
            tone: "warning"
        }
    ],
    "bulk-messages": [
        {
            id: "rail-campaign",
            label: "Draft campaign",
            priority: 10,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-delivery",
            label: "Delivery stats",
            priority: 12,
            layer: 3,
            tone: "info"
        },
        {
            id: "rail-templates",
            label: "Template library",
            priority: 14,
            layer: 3,
            tone: "primary"
        },
        {
            id: "rail-scheduled",
            label: "Scheduled messages",
            priority: 16,
            layer: 3,
            tone: "primary"
        }
    ]
};
// ─── Patient-Context-Aware Pill Generator ────────────────────────
// Generates pills based on the patient's actual data — no "Last visit"
// if they've never visited, no "Flagged labs" if they have no labs, etc.
function generatePatientContextPills(summary) {
    const isNew = summary.symptomCollectorData?.isNewPatient || summary.specialtyTags.length === 0;
    const hasVitals = !!(summary.todayVitals && Object.keys(summary.todayVitals).length > 0);
    const hasLabs = !!(summary.keyLabs && summary.keyLabs.length > 0);
    const hasLastVisit = !!summary.lastVisit;
    const pills = [];
    let p = 10;
    if (isNew) {
        // New patient: focus on intake review, DDX, initial workup
        if (summary.symptomCollectorData?.symptoms?.length) {
            pills.push({
                id: "pc-intake",
                label: "Reported by patient",
                priority: p,
                layer: 3,
                tone: "primary"
            });
            p += 2;
        }
        pills.push({
            id: "pc-ddx",
            label: "Suggest DDX",
            priority: p,
            layer: 3,
            tone: "primary"
        });
        p += 2;
        if (summary.allergies?.length) {
            pills.push({
                id: "pc-allergy",
                label: `Allergy: ${summary.allergies[0]}`,
                priority: p,
                layer: 3,
                tone: "warning"
            });
            p += 2;
        }
        pills.push({
            id: "pc-workup",
            label: "Initial workup",
            priority: p,
            layer: 3,
            tone: "info"
        });
        p += 2;
    } else {
        // Existing patient: show data-relevant pills
        pills.push({
            id: "pc-snapshot",
            label: "Patient's detailed summary",
            priority: p,
            layer: 3,
            tone: "primary"
        });
        p += 2;
        if (hasLastVisit) {
            pills.push({
                id: "pc-lastvisit",
                label: "Last visit",
                priority: p,
                layer: 3,
                tone: "primary"
            });
            p += 2;
        }
        if (hasLabs && summary.labFlagCount > 0) {
            pills.push({
                id: "pc-labs",
                label: `${summary.labFlagCount} flagged labs`,
                priority: p,
                layer: 3,
                tone: "warning"
            });
            p += 2;
        }
        // Follow-up overdue
        if (summary.followUpOverdueDays > 0) {
            pills.push({
                id: "pc-fu-overdue",
                label: `Follow-up overdue ${summary.followUpOverdueDays}d`,
                priority: p,
                layer: 3,
                tone: "warning"
            });
            p += 2;
        }
        // Specialty pills — prioritize the most clinically relevant specialty
        if (summary.obstetricData) {
            pills.push({
                id: "pc-ob",
                label: "Obstetric summary",
                priority: p,
                layer: 3,
                tone: "primary"
            });
            p += 2;
        }
        if (summary.gynecData) {
            pills.push({
                id: "pc-gynec",
                label: "Gynec summary",
                priority: p,
                layer: 3,
                tone: "primary"
            });
            p += 2;
        }
        if (summary.pediatricsData) {
            pills.push({
                id: "pc-pedia",
                label: "Growth & vaccines",
                priority: p,
                layer: 3,
                tone: "primary"
            });
            p += 2;
        }
        if (summary.ophthalData) {
            pills.push({
                id: "pc-ophthal",
                label: "Vision summary",
                priority: p,
                layer: 3,
                tone: "primary"
            });
            p += 2;
        }
        if (hasVitals && pills.length < 4) {
            pills.push({
                id: "pc-vitals",
                label: "Vital trends",
                priority: p,
                layer: 3,
                tone: "info"
            });
            p += 2;
        }
        if (pills.length < 4) {
            pills.push({
                id: "pc-preconsult",
                label: "Pre-consult prep",
                priority: p,
                layer: 3,
                tone: "info"
            });
            p += 2;
        }
    }
    return pills.slice(0, 4);
}
// ─── Legacy fallback for when no summary is available ────────────
const FALLBACK_PATIENT_PILLS = [
    {
        id: "pc-snapshot",
        label: "Patient's detailed summary",
        priority: 10,
        layer: 3,
        tone: "primary"
    },
    {
        id: "pc-lastvisit",
        label: "Last visit",
        priority: 12,
        layer: 3,
        tone: "primary"
    },
    {
        id: "pc-preconsult",
        label: "Pre-consult prep",
        priority: 16,
        layer: 3,
        tone: "info"
    }
];
function generateHomepagePills(activeTab, activeRailItem, /** Pass SmartSummaryData for patient-specific pills, null for operational mode */ patientSummary) {
    // Patient-specific context → data-aware pills
    if (patientSummary) {
        return generatePatientContextPills(patientSummary);
    }
    // Rail-specific context (non-appointments rail items)
    if (activeRailItem && activeRailItem !== "appointments" && RAIL_PILLS[activeRailItem]) {
        return RAIL_PILLS[activeRailItem];
    }
    // Demo mode: show ALL pills so every card type is discoverable
    // In production, swap to: TAB_OVERRIDES[tab] || ALL_HOMEPAGE_PILLS.slice(0, 4)
    return ALL_HOMEPAGE_PILLS;
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/engines/phase-engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ─────────────────────────────────────────────────────────────
// Consult Phase State Machine
// Infers consultation phase from latest user actions
// ─────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "getPhaseLabel",
    ()=>getPhaseLabel,
    "inferPhase",
    ()=>inferPhase
]);
const PHASE_KEYWORDS = {
    symptoms_entered: [
        "symptom",
        "fever",
        "cough",
        "pain",
        "complaint",
        "sx"
    ],
    dx_accepted: [
        "accept",
        "dx",
        "diagnosis",
        "differential",
        "ddx",
        "protocol"
    ],
    meds_written: [
        "med",
        "drug",
        "prescription",
        "rx",
        "advice",
        "translate"
    ],
    near_complete: [
        "completeness",
        "final",
        "follow-up",
        "follow up",
        "f/u",
        "done"
    ],
    empty: []
};
function inferPhase(messages, currentPhase) {
    if (messages.length === 0) return "empty";
    // Find last user message
    const lastUserMsg = [
        ...messages
    ].reverse().find((m)=>m.role === "user");
    if (!lastUserMsg) return currentPhase;
    const text = lastUserMsg.text.toLowerCase();
    // Find last assistant message with rxOutput
    const lastAssistantOutput = [
        ...messages
    ].reverse().find((m)=>m.role === "assistant" && m.rxOutput);
    // Check if DDX was accepted (assistant showed DDX and user responded)
    if (lastAssistantOutput?.rxOutput?.kind === "ddx" && currentPhase === "symptoms_entered") {
        return "dx_accepted";
    }
    // Check if meds were shown (protocol_meds card)
    if (lastAssistantOutput?.rxOutput?.kind === "protocol_meds" && currentPhase === "dx_accepted") {
        return "meds_written";
    }
    // Keyword-based inference
    for (const [phase, keywords] of Object.entries(PHASE_KEYWORDS)){
        if (phase === "empty") continue;
        if (keywords.some((kw)=>text.includes(kw))) {
            return phase;
        }
    }
    // Progression: don't go backwards
    const ORDER = [
        "empty",
        "symptoms_entered",
        "dx_accepted",
        "meds_written",
        "near_complete"
    ];
    const currentIdx = ORDER.indexOf(currentPhase);
    // If text has content and we're still in empty, move to symptoms_entered
    if (currentPhase === "empty" && text.length > 0) {
        return "symptoms_entered";
    }
    return currentPhase;
}
function getPhaseLabel(phase) {
    const labels = {
        empty: "Getting started",
        symptoms_entered: "Symptoms captured",
        dx_accepted: "Diagnosis accepted",
        meds_written: "Medications written",
        near_complete: "Nearly complete"
    };
    return labels[phase];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/engines/intent-engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ─────────────────────────────────────────────────────────────
// Intent Classification Engine
// Maps user input → intent category + response format
// ─────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "PILL_INTENT_MAP",
    ()=>PILL_INTENT_MAP,
    "classifyIntent",
    ()=>classifyIntent
]);
const RULES = [
    // ── Operational (Homepage) — checked first because multi-word phrases must win over single-word matches ──
    {
        keywords: [
            "today's schedule",
            "appointments today",
            "who's next",
            "queue status",
            "queue list"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "follow-ups due",
            "overdue follow",
            "callback",
            "follow up due"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "revenue",
            "billing",
            "collection",
            "payment",
            "income",
            "earnings",
            "refund",
            "deposit",
            "this week's billing",
            "this week's deposits"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "send sms",
            "send reminder",
            "remind all",
            "bulk sms",
            "notify"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "demographics",
            "age group",
            "gender split",
            "patient composition"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "diagnosis distribution",
            "diagnosis breakdown",
            "top diagnos",
            "common conditions"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "patient volume",
            "footfall",
            "monthly patients"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "kpi",
            "performance",
            "weekly summary",
            "analytics",
            "dashboard"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "chronic",
            "diabetic",
            "hypertensive",
            "condition breakdown"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "busiest",
            "slot utilization",
            "peak hours",
            "appointment density"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "how many patients",
            "patient count",
            "total patients"
        ],
        intent: "operational",
        format: "hybrid"
    },
    {
        keywords: [
            "cancellation rate",
            "no show",
            "no-show"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "referral summary",
            "specialist referral",
            "referral this week"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "vaccination due",
            "vaccine overdue",
            "immunization due",
            "vaccination overdue"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "anc schedule",
            "anc due",
            "antenatal",
            "anc overdue",
            "obstetric schedule"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "details about",
            "search patient",
            "find patient",
            "show patient",
            "look up patient",
            "patient named",
            "who is"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "vaccination schedule",
            "vaccine schedule",
            "immunization"
        ],
        intent: "operational",
        format: "card"
    },
    // Clinical guidelines pill removed from homepage
    {
        keywords: [
            "billing overview",
            "bill summary",
            "billing summary"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "patient timeline",
            "visit timeline",
            "clinical timeline"
        ],
        intent: "data_retrieval",
        format: "card"
    },
    {
        keywords: [
            "patient trend",
            "footfall trend",
            "daily patient count"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "discharge status",
            "discharge summary"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "pending draft",
            "pending digitisation"
        ],
        intent: "operational",
        format: "card"
    },
    // Data Retrieval
    {
        keywords: [
            "summary",
            "snapshot",
            "patient",
            "overview",
            "history",
            "last visit",
            "past visit",
            "intake",
            "reported"
        ],
        intent: "data_retrieval",
        format: "card"
    },
    {
        keywords: [
            "gynec",
            "gynae",
            "gynaec",
            "ophthal",
            "eye",
            "vision",
            "obstetric",
            "anc",
            "pediatric",
            "pedia",
            "growth",
            "vaccine"
        ],
        intent: "data_retrieval",
        format: "card"
    },
    {
        keywords: [
            "vitals",
            "bp",
            "spo2",
            "pulse",
            "temperature",
            "weight"
        ],
        intent: "data_retrieval",
        format: "hybrid"
    },
    {
        keywords: [
            "lab",
            "report",
            "hba1c",
            "glucose",
            "creatinine",
            "cbc",
            "lipid",
            "tsh"
        ],
        intent: "data_retrieval",
        format: "card"
    },
    {
        keywords: [
            "medication",
            "meds",
            "drug",
            "rx",
            "prescription"
        ],
        intent: "data_retrieval",
        format: "card"
    },
    // Clinical Decision Support
    {
        keywords: [
            "ddx",
            "differential",
            "diagnosis",
            "diagnose",
            "suggest dx"
        ],
        intent: "clinical_decision",
        format: "card"
    },
    {
        keywords: [
            "protocol",
            "suggest med",
            "recommend",
            "guideline"
        ],
        intent: "clinical_decision",
        format: "card"
    },
    {
        keywords: [
            "investigation",
            "test",
            "order",
            "screening",
            "workup"
        ],
        intent: "clinical_decision",
        format: "card"
    },
    // Action
    {
        keywords: [
            "copy",
            "add",
            "fill",
            "draft"
        ],
        intent: "action",
        format: "hybrid"
    },
    {
        keywords: [
            "translate",
            "hindi",
            "telugu",
            "kannada",
            "tamil",
            "marathi"
        ],
        intent: "action",
        format: "card"
    },
    {
        keywords: [
            "follow-up",
            "follow up",
            "f/u",
            "next visit",
            "schedule"
        ],
        intent: "action",
        format: "card"
    },
    // Comparison
    {
        keywords: [
            "compare",
            "trend",
            "change",
            "previous",
            "difference",
            "delta"
        ],
        intent: "comparison",
        format: "card"
    },
    {
        keywords: [
            "graph",
            "chart",
            "line",
            "bar",
            "plot"
        ],
        intent: "comparison",
        format: "card"
    },
    // Document Analysis
    {
        keywords: [
            "upload",
            "document",
            "ocr",
            "scan",
            "report upload",
            "attach"
        ],
        intent: "document_analysis",
        format: "card"
    },
    // Clinical Question
    {
        keywords: [
            "what is",
            "how to",
            "why",
            "explain",
            "cause",
            "mechanism"
        ],
        intent: "clinical_question",
        format: "text"
    },
    {
        keywords: [
            "check interaction",
            "drug interaction"
        ],
        intent: "clinical_question",
        format: "card"
    },
    {
        keywords: [
            "dose",
            "dosage",
            "interaction",
            "contraindication",
            "side effect"
        ],
        intent: "clinical_question",
        format: "hybrid"
    },
    {
        keywords: [
            "suggest lab",
            "initial investigation",
            "initial workup"
        ],
        intent: "clinical_decision",
        format: "card"
    },
    {
        keywords: [
            "ask me anything",
            "ask anything",
            "pre-consult"
        ],
        intent: "ambiguous",
        format: "text"
    },
    // Rail-specific operational queries
    {
        keywords: [
            "follow-up dues this week",
            "follow-up dues today",
            "overdue follow-ups today",
            "this week follow-ups",
            "overdue follow-up",
            "send reminder",
            "this week's follow-up",
            "follow-up rate",
            "follow up rate"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "patients with due",
            "due this week",
            "due till now",
            "dues till date",
            "total bill today",
            "today's billing",
            "today's deposit",
            "today's collection",
            "overall collection",
            "past 30 days collection",
            "generate invoice",
            "open billing",
            "open opd billing"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "low stock",
            "pending prescription",
            "dispense history",
            "expiring medicine"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "draft campaign",
            "delivery stat",
            "template library",
            "scheduled message"
        ],
        intent: "operational",
        format: "card"
    },
    {
        keywords: [
            "excel",
            "xlsx",
            "word",
            "docx",
            "export format",
            "download file"
        ],
        intent: "operational",
        format: "card"
    },
    // Patient-context pills
    {
        keywords: [
            "patient snapshot",
            "patient's detailed summary",
            "detailed summary",
            "pre-consult prep",
            "abnormal lab"
        ],
        intent: "operational",
        format: "card"
    },
    // Operational (RxPad)
    {
        keywords: [
            "completeness",
            "checklist",
            "missing",
            "empty section",
            "documentation"
        ],
        intent: "operational",
        format: "card"
    },
    // Follow-up questions
    {
        keywords: [
            "which",
            "select",
            "choose",
            "pick one"
        ],
        intent: "follow_up",
        format: "card"
    },
    // Out-of-scope — non-medical topics
    {
        keywords: [
            "cricket",
            "football",
            "soccer",
            "tennis",
            "basketball",
            "baseball",
            "hockey",
            "ipl",
            "world cup score",
            "match score"
        ],
        intent: "out_of_scope",
        format: "card"
    },
    {
        keywords: [
            "weather",
            "forecast",
            "temperature outside",
            "rain today",
            "sunny today"
        ],
        intent: "out_of_scope",
        format: "card"
    },
    {
        keywords: [
            "movie",
            "netflix",
            "series",
            "tv show",
            "web series",
            "bollywood",
            "hollywood"
        ],
        intent: "out_of_scope",
        format: "card"
    },
    {
        keywords: [
            "stock market",
            "share price",
            "nifty",
            "sensex",
            "crypto",
            "bitcoin",
            "trading"
        ],
        intent: "out_of_scope",
        format: "card"
    },
    {
        keywords: [
            "recipe",
            "cooking",
            "how to cook",
            "food recipe",
            "restaurant"
        ],
        intent: "out_of_scope",
        format: "card"
    },
    {
        keywords: [
            "politics",
            "election",
            "prime minister",
            "president",
            "government"
        ],
        intent: "out_of_scope",
        format: "card"
    },
    {
        keywords: [
            "joke",
            "tell me a joke",
            "funny",
            "riddle",
            "poem",
            "story",
            "song"
        ],
        intent: "out_of_scope",
        format: "card"
    },
    {
        keywords: [
            "book a flight",
            "hotel",
            "travel",
            "vacation",
            "holiday plan"
        ],
        intent: "out_of_scope",
        format: "card"
    },
    {
        keywords: [
            "news today",
            "headline",
            "latest news",
            "trending"
        ],
        intent: "out_of_scope",
        format: "card"
    }
];
function classifyIntent(input) {
    const normalized = input.toLowerCase().replace(/[\u2080-\u2089]/g, (ch)=>String(ch.charCodeAt(0) - 0x2080)).trim();
    // Check each rule
    for (const rule of RULES){
        if (rule.keywords.some((kw)=>normalized.includes(kw))) {
            return {
                category: rule.intent,
                format: rule.format,
                confidence: 0.85
            };
        }
    }
    // Ambiguous fallback
    return {
        category: "ambiguous",
        format: "text",
        confidence: 0.3
    };
}
const PILL_INTENT_MAP = {
    "Summary": "data_retrieval",
    "Gynec summary": "data_retrieval",
    "Ophthal summary": "data_retrieval",
    "Obstetric summary": "data_retrieval",
    "Pediatric summary": "data_retrieval",
    "Patient summary": "data_retrieval",
    "Patient's detailed summary": "data_retrieval",
    "Vision summary": "data_retrieval",
    "Growth summary": "data_retrieval",
    "Lab trends": "comparison",
    "Ask anything": "ambiguous",
    "Ask me anything": "ambiguous",
    "Check interactions": "clinical_question",
    "Suggest lab tests": "clinical_decision",
    "Pre-consult prep": "data_retrieval",
    "Suggest DDX": "clinical_decision",
    "Compare with last visit": "comparison",
    "Protocol meds": "clinical_decision",
    "Investigations": "clinical_decision",
    "Advice": "action",
    "F/U": "action",
    "Translate": "action",
    "Follow-up": "action",
    "Completeness check": "operational",
    "Translate advice": "action",
    "Compare visits": "comparison",
    "Vital trends": "comparison",
    "Graph view": "comparison",
    "Line graph": "comparison",
    "Bar view": "comparison",
    "All 11 params": "comparison",
    "Med history search": "data_retrieval",
    "Chronic timeline": "data_retrieval",
    "Lab comparison": "comparison",
    "Compare prev": "comparison",
    "HbA1c trend": "comparison",
    "Annual panel": "data_retrieval",
    "OB summary": "data_retrieval",
    "OCR analysis": "document_analysis",
    "Report extract": "document_analysis",
    "Review SpO2": "data_retrieval",
    "Review SpO\u2082": "data_retrieval",
    "Allergy Alert": "data_retrieval",
    "Other drug classes": "data_retrieval",
    "Compare with previous": "comparison",
    "Hindi": "action",
    "Tamil": "action",
    "Telugu": "action",
    "Suggest inv": "clinical_decision",
    // Homepage operational pills
    "Today's schedule": "operational",
    "Follow-ups due": "operational",
    "Revenue today": "operational",
    "Revenue this week": "operational",
    "This week's billing": "operational",
    "This week's deposits": "operational",
    "Compare with another date": "comparison",
    "Weekly KPIs": "operational",
    "Upload document": "document_analysis",
    "Upload medical records for this patient": "document_analysis",
    "Patient demographics": "operational",
    "Diagnosis breakdown": "operational",
    "Busiest hours": "operational",
    "Chronic conditions": "operational",
    "Cancellation rate": "operational",
    "Pending drafts": "operational",
    "Discharge status": "operational",
    "Show cancelled patients": "operational",
    "Reduce cancellations": "operational",
    "Send reminder to all": "operational",
    "Follow-up analytics": "operational",
    "Compare with last week": "comparison",
    "Compare with yesterday": "operational",
    "Gender split": "operational",
    "Condition breakdown": "operational",
    "Show all fever patients": "operational",
    "Monthly trend": "comparison",
    "Show all DM patients": "operational",
    "HbA1c distribution": "operational",
    "Show patients": "operational",
    "Compare months": "comparison",
    "Payment reminders": "operational",
    // Rail-specific pill labels
    "Overdue follow-ups": "operational",
    "Overdue follow-ups today": "operational",
    "This week's follow-ups": "operational",
    "This week follow-ups": "operational",
    "Follow-up dues this week": "operational",
    "Follow-up dues today": "operational",
    "Follow-up rate": "operational",
    "Patients with due this week": "operational",
    "Patients with due till now": "operational",
    "Today's collection": "operational",
    "Today's billing": "operational",
    "Today's deposits": "operational",
    "Past 30 days collection": "operational",
    "Generate invoice": "operational",
    "Open Excel file": "operational",
    "Open Word document": "operational",
    "Low stock alerts": "operational",
    "Pending prescriptions": "operational",
    "Dispense history": "operational",
    "Expiring medicines": "operational",
    "Draft campaign": "operational",
    "Delivery stats": "operational",
    "Template library": "operational",
    "Scheduled messages": "operational",
    // New homepage pill labels (tab-specific)
    "Referral summary": "operational",
    "Vaccination schedule": "operational",
    // Clinical guidelines removed from homepage pills
    "Billing overview": "operational",
    "Patient timeline": "data_retrieval",
    "Patient trends": "operational",
    "Peak hours": "operational",
    "Vaccination due list": "operational",
    "ANC schedule": "operational",
    // Patient-context pill labels (data-aware)
    "Patient snapshot": "data_retrieval",
    "Patient detail summary": "data_retrieval",
    "Last visit": "data_retrieval",
    "Last visit details": "data_retrieval",
    "Past visit summaries": "data_retrieval",
    "Abnormal labs": "operational",
    "Reported by patient": "data_retrieval",
    "Show reported intake": "data_retrieval",
    "Chronic conditions": "data_retrieval",
    "Allergies": "data_retrieval",
    "Family history": "data_retrieval",
    "Lifestyle": "data_retrieval",
    "Initial investigations": "clinical_decision",
    "Initial workup": "clinical_decision",
    "Lab overview": "data_retrieval",
    "Growth & vaccines": "data_retrieval",
    "Growth check": "data_retrieval",
    "Vision check": "data_retrieval",
    "Today's vitals": "data_retrieval",
    "Medical history": "data_retrieval",
    // Doctor-type-aware pills (treating physician + emergency)
    "eGFR trend": "comparison",
    "Medication timeline": "data_retrieval",
    "Plan follow-up": "action",
    "Recent ER history": "data_retrieval",
    "Key labs": "data_retrieval",
    "Active medications": "data_retrieval"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/engines/voice-rx-engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Voice-to-Structured-RX Engine
 *
 * POC implementation: keyword-based extraction that parses spoken clinical
 * dictation into structured RxPad sections (symptoms, examination, diagnosis,
 * medication, advice, investigation, follow-up, history).
 */ __turbopack_context__.s([
    "VOICE_RX_LEAD_IN",
    ()=>VOICE_RX_LEAD_IN,
    "enrichVoiceStructuredWithPatientContext",
    ()=>enrichVoiceStructuredWithPatientContext,
    "extractDentalTeethFromVoice",
    ()=>extractDentalTeethFromVoice,
    "formatVoiceRxItemPublic",
    ()=>formatVoiceRxItemPublic,
    "parseMedString",
    ()=>parseMedString,
    "parseVoiceToStructuredRx",
    ()=>parseVoiceToStructuredRx,
    "sortPrimaryVoiceSections",
    ()=>sortPrimaryVoiceSections
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/cards/shared/DentalExaminationToothBlock.tsx [app-client] (ecmascript)");
;
;
const SECTION_RULES = [
    {
        sectionId: "symptoms",
        title: "Symptoms",
        tpIconName: "thermometer",
        startKeywords: [
            "complaining of",
            "suffering from",
            "symptoms include",
            "presenting with",
            "chief complaint",
            "c/o"
        ],
        itemKeywords: [
            "fever",
            "cough",
            "cold",
            "pain",
            "headache",
            "nausea",
            "vomiting",
            "diarrhea",
            "weakness",
            "fatigue",
            "redness",
            "swelling",
            "rash",
            "itching",
            "breathlessness",
            "chest pain",
            "abdominal pain",
            "sore throat",
            "body ache",
            "loss of appetite",
            "burning",
            "discharge",
            "sneezing",
            "runny nose",
            "congestion"
        ]
    },
    {
        sectionId: "examination",
        title: "Examination",
        tpIconName: "medical service",
        startKeywords: [
            "on examination",
            "o/e",
            "examination findings",
            "examination reveals",
            "on exam",
            "physical examination"
        ],
        itemKeywords: [
            "tenderness",
            "chest clear",
            "bilateral",
            "no lymphadenopathy",
            "heart sounds",
            "normal",
            "lungs clear",
            "abdomen soft",
            "throat congested",
            "tonsils",
            "pharyngeal",
            "conjunctival",
            "injection"
        ]
    },
    {
        sectionId: "diagnosis",
        title: "Diagnosis",
        tpIconName: "Diagnosis",
        startKeywords: [
            "diagnosis",
            "diagnosed with",
            "impression",
            "assessment",
            "provisional diagnosis",
            "final diagnosis",
            "d/d"
        ],
        itemKeywords: [
            "viral",
            "bacterial",
            "rhinitis",
            "pharyngitis",
            "conjunctivitis",
            "bronchitis",
            "gastritis",
            "UTI",
            "URTI",
            "LRTI",
            "allergic",
            "acute",
            "chronic"
        ]
    },
    {
        sectionId: "medication",
        title: "Medication",
        tpIconName: "Tablets",
        startKeywords: [
            "prescribing",
            "prescribed",
            "medication",
            "medicines",
            "rx",
            "tab",
            "cap",
            "syrup",
            "drops"
        ],
        itemKeywords: [
            "mg",
            "tablet",
            "capsule",
            "syrup",
            "drops",
            "ointment",
            "cream",
            "gel",
            "injection",
            "ml",
            "paracetamol",
            "amoxicillin",
            "azithromycin",
            "cetirizine",
            "pantoprazole",
            "ibuprofen",
            "dolo",
            "crocin",
            "augmentin",
            "metformin",
            "amlodipine"
        ]
    },
    {
        sectionId: "advice",
        title: "Advice",
        tpIconName: "health care",
        startKeywords: [
            "advising",
            "advised",
            "advice",
            "counselled",
            "instructions"
        ],
        itemKeywords: [
            "rest",
            "fluids",
            "warm water",
            "steam inhalation",
            "salt gargle",
            "avoid",
            "light diet",
            "stay home",
            "no spicy food",
            "hydration",
            "exercise",
            "walking",
            "deep breathing"
        ]
    },
    {
        sectionId: "investigation",
        title: "Lab Investigation",
        tpIconName: "Test Tube",
        startKeywords: [
            "suggest test",
            "order test",
            "investigations",
            "labs ordered",
            "send for",
            "advise tests"
        ],
        itemKeywords: [
            "CBC",
            "ESR",
            "CRP",
            "LFT",
            "RFT",
            "TFT",
            "HbA1c",
            "lipid profile",
            "urine routine",
            "blood sugar",
            "X-ray",
            "ECG",
            "ultrasound",
            "CT",
            "MRI"
        ]
    },
    {
        sectionId: "followUp",
        title: "Follow-up",
        tpIconName: "Calendar",
        startKeywords: [
            "follow up",
            "follow-up",
            "come back",
            "review in",
            "next visit",
            "revisit"
        ],
        itemKeywords: [
            "days",
            "week",
            "weeks",
            "month",
            "months",
            "if not better",
            "SOS",
            "as needed"
        ]
    },
    {
        sectionId: "history",
        title: "Medical History",
        tpIconName: "pill",
        startKeywords: [
            "history of",
            "past history",
            "known case of",
            "h/o",
            "chronic"
        ],
        itemKeywords: [
            "hypertension",
            "diabetes",
            "asthma",
            "thyroid",
            "PCOD",
            "surgery",
            "allergy"
        ]
    }
];
// ─── Parsing logic ───────────────────────────────────────────────
function extractSections(text) {
    const sentences = text.split(/[.;]+/).map((s)=>s.trim()).filter(Boolean);
    const result = [];
    // Track which sentences are claimed by startKeyword matches (higher priority)
    const claimedSentences = new Set();
    // First pass: claim sentences that match startKeywords
    for (const rule of SECTION_RULES){
        for(let si = 0; si < sentences.length; si++){
            const sentenceLower = sentences[si].toLowerCase();
            if (rule.startKeywords.some((kw)=>sentenceLower.includes(kw))) {
                claimedSentences.add(si);
            }
        }
    }
    // Second pass: extract items per section
    for (const rule of SECTION_RULES){
        const rawItems = [];
        for(let si = 0; si < sentences.length; si++){
            const sentence = sentences[si];
            const sentenceLower = sentence.toLowerCase();
            const isStartKeyword = rule.startKeywords.some((kw)=>sentenceLower.includes(kw));
            // Only use itemKeyword matching for unclaimed sentences
            const matchingItemKeywords = !claimedSentences.has(si) ? rule.itemKeywords.filter((kw)=>sentenceLower.includes(kw.toLowerCase())) : [];
            if (isStartKeyword || matchingItemKeywords.length > 0) {
                // Clean up the sentence — remove leading section keywords
                let cleaned = sentence;
                for (const kw of rule.startKeywords){
                    const regex = new RegExp(`${kw}\\s*:?\\s*`, "i");
                    cleaned = cleaned.replace(regex, "");
                }
                cleaned = cleaned.trim();
                if (cleaned.length > 0) {
                    // Split multi-item sentences on commas or "and"
                    if (rule.sectionId === "medication" || rule.sectionId === "symptoms") {
                        const parts = cleaned.split(/,\s*|\s+and\s+/).map((p)=>p.trim()).filter(Boolean);
                        rawItems.push(...parts);
                    } else {
                        rawItems.push(cleaned);
                    }
                }
            }
        }
        if (rawItems.length > 0) {
            const unique = [
                ...new Set(rawItems)
            ];
            // Convert plain strings to VoiceRxItem with name/detail split
            const items = unique.map((raw)=>parseToVoiceRxItem(raw, rule.sectionId));
            result.push({
                sectionId: rule.sectionId,
                title: rule.title,
                tpIconName: rule.tpIconName,
                items
            });
        }
    }
    return result;
}
const PRIMARY_SECTION_IDS = new Set([
    "symptoms",
    "medication",
    "investigation"
]);
const VALID_FDI = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].map((t)=>t.fdi));
const VOICE_RX_LEAD_IN = "Voice recorder card below — structured Rx sections and dental tooth cards — copy all to RxPad or apply each tooth to the chart.";
function ensureDentalTooth(map, fdi) {
    if (!map.has(fdi)) map.set(fdi, {
        fdi
    });
}
function truncateDentalNote(s, max = 180) {
    const t = s.trim();
    return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}
const MONTH_TO_SHORT = {
    january: "Jan",
    february: "Feb",
    march: "Mar",
    april: "Apr",
    may: "May",
    june: "Jun",
    july: "Jul",
    august: "Aug",
    september: "Sep",
    october: "Oct",
    november: "Nov",
    december: "Dec"
};
function extractSinceLabel(sentence) {
    if (/\baugust\s+20\s*22\b/i.test(sentence) || /\baug(?:ust)?\s*['']?\s*22\b/i.test(sentence)) return "Aug 2022";
    const long = sentence.match(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(20\d{2})\b/i);
    if (long) {
        const mon = MONTH_TO_SHORT[long[1].toLowerCase()];
        if (mon) return `${mon} ${long[2]}`;
    }
    const short = sentence.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\.?\s+(20\d{2})\b/i);
    if (short) {
        const u = short[1].toLowerCase().slice(0, 3);
        const map = {
            jan: "Jan",
            feb: "Feb",
            mar: "Mar",
            apr: "Apr",
            may: "May",
            jun: "Jun",
            jul: "Jul",
            aug: "Aug",
            sep: "Sep",
            oct: "Oct",
            nov: "Nov",
            dec: "Dec"
        };
        const mon = map[u];
        if (mon) return `${mon} ${short[2]}`;
    }
    return undefined;
}
function inferZoneFromSentence(sentence) {
    const s = sentence.toLowerCase();
    if (/\bmesial\b/.test(s)) return "mesial";
    if (/\bdistal\b/.test(s)) return "distal";
    if (/\bocclusal|incisal\b/.test(s)) return "occlusal";
    if (/\bpalatal\b/.test(s)) return "lingual";
    if (/\blingual\b/.test(s)) return "lingual";
    if (/\blateral|labial|buccal\b/.test(s)) return "buccal";
    if (/\bcervical\b/.test(s)) return "cervical";
    return "occlusal";
}
function isClinicalDentalSentence(sentence) {
    const s = sentence.toLowerCase();
    return /\b(dental|dentition|tooth|teeth|molar|premolar|canine|incisor|occlusal|buccal|mesial|distal|gingiv|implant|peri[- ]?implant|cavity|caries|decay|lesion|restoration|composite|crown|rct|root\s+canal|stain|labial|palatal|lateral|surface|dictation|examination)\b/.test(s) || /\b(?:tooth|tee?th|t\.?)\s*(?:number\s+)?\d{2}\b/i.test(sentence) || /\bfdi\s*\d{2}\b/i.test(sentence);
}
/** Strip common date phrases so years (e.g. August 22) are not parsed as FDI 22. */ function stripApproxDatesForFdiScan(sentence) {
    return sentence.replace(/\baug(?:ust)?\s*['']?\s*\d{2}\b/gi, " ").replace(/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(19|20)\d{2}\b/gi, " ");
}
function fdisInSentence(sentence) {
    const scrubbed = stripApproxDatesForFdiScan(sentence);
    const out = [];
    const seen = new Set();
    for (const m of scrubbed.matchAll(/\b(\d{2})\b/g)){
        const f = m[1];
        if (VALID_FDI.has(f) && !seen.has(f)) {
            seen.add(f);
            out.push(f);
        }
    }
    return out;
}
function patchDentalTooth(map, fdi, patch) {
    const cur = map.get(fdi) ?? {
        fdi
    };
    const next = {
        ...cur,
        fdi
    };
    if (patch.diagnoses?.length) {
        next.diagnoses = [
            ...new Set([
                ...cur.diagnoses ?? [],
                ...patch.diagnoses
            ])
        ];
    }
    if (patch.findings?.length) {
        next.findings = [
            ...cur.findings ?? [],
            ...patch.findings
        ];
    }
    if (patch.treatmentHistoryRows?.length) {
        next.treatmentHistoryRows = [
            ...cur.treatmentHistoryRows ?? [],
            ...patch.treatmentHistoryRows
        ];
    }
    if (patch.procedures?.length) {
        next.procedures = [
            ...cur.procedures ?? [],
            ...patch.procedures
        ];
    }
    if (patch.treatmentHistory?.length) {
        next.treatmentHistory = [
            ...cur.treatmentHistory ?? [],
            ...patch.treatmentHistory
        ];
    }
    if (patch.scannerNotes?.trim()) {
        const add = patch.scannerNotes.trim();
        next.scannerNotes = cur.scannerNotes?.trim() ? `${cur.scannerNotes.trim()} ${add}` : add;
    }
    if (patch.implant !== undefined) next.implant = patch.implant;
    map.set(fdi, next);
}
function extractDentalTeethFromVoice(text) {
    const map = new Map();
    const namedPairs = [
        [
            /upper\s+left\s+lateral\s+incisor/i,
            "22"
        ],
        [
            /upper\s+left\s+central\s+incisor/i,
            "21"
        ],
        [
            /upper\s+left\s+canine/i,
            "23"
        ],
        [
            /upper\s+left\s+first\s+premolar/i,
            "24"
        ],
        [
            /upper\s+left\s+second\s+premolar/i,
            "25"
        ],
        [
            /upper\s+left\s+first\s+molar/i,
            "26"
        ],
        [
            /upper\s+left\s+second\s+molar/i,
            "27"
        ],
        [
            /upper\s+right\s+first\s+molar/i,
            "16"
        ],
        [
            /upper\s+right\s+second\s+molar/i,
            "17"
        ],
        [
            /lower\s+left\s+first\s+molar/i,
            "36"
        ],
        [
            /lower\s+right\s+first\s+molar/i,
            "46"
        ]
    ];
    for (const [re, fdi] of namedPairs){
        if (re.test(text)) ensureDentalTooth(map, fdi);
    }
    const fdiPattern = /\b(?:tooth|tee?th|t\.?)\s*(\d{2})\b|\bt\s*(\d{2})\b|\bfdi\s*(\d{2})\b/gi;
    let m;
    while((m = fdiPattern.exec(text)) !== null){
        const fdi = m[1] || m[2] || m[3];
        if (VALID_FDI.has(fdi)) ensureDentalTooth(map, fdi);
    }
    for (const sentence of text.split(/[.;]+/).map((s)=>s.trim()).filter(Boolean)){
        if (!isClinicalDentalSentence(sentence)) continue;
        const fdis = fdisInSentence(sentence);
        if (fdis.length === 0) continue;
        const zone = inferZoneFromSentence(sentence);
        const newFindings = [];
        if (/\bcaries|cavity|decay|lesion\b/i.test(sentence)) {
            newFindings.push({
                zoneId: zone,
                type: "Caries",
                notes: truncateDentalNote(sentence)
            });
        }
        if (/\bstain|staining\b/i.test(sentence)) {
            newFindings.push({
                zoneId: zone,
                type: "Staining",
                notes: truncateDentalNote(sentence)
            });
        }
        if (/\bcalculus|plaque\b/i.test(sentence)) {
            newFindings.push({
                zoneId: "cervical",
                type: "Calculus",
                notes: truncateDentalNote(sentence)
            });
        }
        const newDx = [];
        if (/\brct|root\s+canal\b/i.test(sentence)) newDx.push("RCT");
        if (/\bcrown\b/i.test(sentence) && !/\bimplant\s*(?:with|\+)\s*crown\b/i.test(sentence) && !/\bcrown\s+on\s+implant\b/i.test(sentence)) {
            newDx.push("Crown");
        }
        const implantMention = /\bimplant\b/i.test(sentence);
        const since = extractSinceLabel(sentence);
        for (const fdi of fdis){
            const patch = {
                findings: newFindings.length ? newFindings : undefined,
                diagnoses: newDx.length ? newDx : undefined
            };
            if (implantMention) {
                patch.implant = true;
                patch.treatmentHistoryRows = [
                    {
                        name: "Endosseous implant + superstructure",
                        surface: "Whole tooth",
                        since,
                        notes: since ? "Placement date per patient report" : "Confirm placement date in records"
                    }
                ];
            }
            if (/\bpatient\s+(states|says|reports)\b/i.test(sentence) || implantMention && since) {
                patch.scannerNotes = truncateDentalNote(sentence);
            }
            patchDentalTooth(map, fdi, patch);
        }
    }
    return [
        ...map.values()
    ].sort((a, b)=>a.fdi.localeCompare(b.fdi, undefined, {
            numeric: true
        }));
}
/** Rich demo tooth rows when transcript mentions dental but FDI extraction is thin */ const DEMO_VOICE_DENTAL_TEETH = [
    {
        fdi: "22",
        implant: true,
        treatmentHistoryRows: [
            {
                name: "Endosseous implant + crown",
                surface: "Whole tooth",
                since: "Aug 2022",
                notes: "Patient recalls placement in August 2022; verify fixture brand in chart"
            }
        ],
        findings: [
            {
                zoneId: "buccal",
                type: "Staining",
                notes: "Light supragingival — polish vs monitor"
            },
            {
                zoneId: "cervical",
                type: "Calculus",
                notes: "Peri-implant plaque; reinforced hygiene"
            }
        ],
        scannerNotes: "Occlusion feels stable; no patient-reported mobility. Soft tissue 2–3 mm probing buccal — chart at recall."
    },
    {
        fdi: "24",
        treatmentHistoryRows: [
            {
                name: "Resin sealant",
                surface: "Occlusal",
                since: "2016",
                notes: "Partial loss on mesial aspect"
            }
        ],
        findings: [
            {
                zoneId: "buccal",
                type: "Caries",
                notes: "Cavitated lesion on lateral / buccal surface extending toward contact; bitewing advised"
            }
        ],
        scannerNotes: "Cold test: delayed response vs adjacent; rule out reversible pulpitis before definitive restoration."
    }
];
function ensureSection(sections, sectionId, title, tpIconName, items) {
    if (items.length === 0) return sections;
    if (sections.some((s)=>s.sectionId === sectionId)) return sections;
    return [
        ...sections,
        {
            sectionId,
            title,
            tpIconName,
            items
        }
    ];
}
function voiceTranscriptLooksDentalButNoTeeth(text, extracted) {
    if (extracted.length > 0) return false;
    const t = text.toLowerCase();
    if (!/\b(tooth|teeth|dental|dentition|molar|premolar|canine|incisor|occlusal|buccal|gingiv|fdi|implant|cavity|lateral)\b/.test(t)) {
        return false;
    }
    return /\b(?:tooth|tee?th|t\.?|fdi)\s*(?:number\s+)?\d{2}\b/i.test(text) || /\b(?:t|fdi)\s*\d{2}\b/i.test(text) || /upper\s+left\s+(lateral\s+incisor|first\s+premolar|first\s+molar)/i.test(text) || /upper\s+right\s+first\s+molar/i.test(text) || /lower\s+left\s+first\s+molar/i.test(text) || /lower\s+right\s+first\s+molar/i.test(text);
}
const PRIMARY_VOICE_SECTION_ORDER = [
    "symptoms",
    "medication",
    "investigation"
];
function sortPrimaryVoiceSections(sections) {
    const rank = (id)=>{
        const i = PRIMARY_VOICE_SECTION_ORDER.indexOf(id);
        return i === -1 ? 100 : i;
    };
    return [
        ...sections
    ].sort((a, b)=>rank(a.sectionId) - rank(b.sectionId));
}
function formatVoiceRxItemPublic(item) {
    return item.detail ? `${item.name} (${item.detail})` : item.name;
}
function buildVoiceClinicalExam(_text, _sections, _dentalTeeth) {
    const subtitle = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
    return {
        title: "Voice recorder",
        subtitle
    };
}
function enrichVoiceStructuredWithPatientContext(text, summary) {
    const base = parseVoiceToStructuredRx(text);
    let sections = [
        ...base.sections
    ];
    let dentalTeeth = [
        ...base.dentalTeeth ?? []
    ];
    const lv = summary.lastVisit;
    const intake = summary.symptomCollectorData;
    if (!sections.some((s)=>s.sectionId === "symptoms")) {
        const items = [];
        if (intake?.symptoms?.length) {
            items.push(...intake.symptoms.slice(0, 5).map((s)=>({
                    name: s.name,
                    detail: [
                        s.duration,
                        s.severity
                    ].filter(Boolean).join(" · ") || undefined
                })));
        } else if (lv?.symptoms) {
            items.push({
                name: lv.symptoms
            });
        }
        sections = ensureSection(sections, "symptoms", "Symptoms", "thermometer", items);
    }
    if (!sections.some((s)=>s.sectionId === "medication")) {
        const items = [];
        if (lv?.medication) {
            const parts = lv.medication.split(",").map((p)=>p.trim()).filter(Boolean).slice(0, 6);
            items.push(...parts.map((m)=>({
                    name: m
                })));
        } else if (summary.activeMeds?.length) {
            items.push(...summary.activeMeds.slice(0, 4).map((m)=>({
                    name: m
                })));
        }
        sections = ensureSection(sections, "medication", "Medication", "Tablets", items);
    }
    if (!sections.some((s)=>s.sectionId === "investigation")) {
        const items = [];
        if (lv?.labTestsSuggested?.trim()) {
            const parts = lv.labTestsSuggested.split(/[,;]+/).map((p)=>p.trim()).filter(Boolean).slice(0, 8);
            items.push(...parts.map((name)=>({
                    name
                })));
        }
        sections = ensureSection(sections, "investigation", "Lab Investigation", "Test Tube", items);
    }
    if (voiceTranscriptLooksDentalButNoTeeth(text, dentalTeeth)) {
        dentalTeeth = [
            ...DEMO_VOICE_DENTAL_TEETH
        ];
    }
    if (dentalTeeth.length === 0 && text.trim().length > 0) {
        dentalTeeth = [
            ...DEMO_VOICE_DENTAL_TEETH
        ];
    }
    const copyAllPayload = buildCopyPayload(sections, dentalTeeth.length ? dentalTeeth : undefined);
    const clinicalExam = buildVoiceClinicalExam(text, sections, dentalTeeth.length ? dentalTeeth : undefined);
    return {
        voiceText: text,
        sections,
        dentalTeeth: dentalTeeth.length ? dentalTeeth : undefined,
        leadInText: VOICE_RX_LEAD_IN,
        clinicalExam,
        copyAllPayload
    };
}
/** Convert a raw extracted string into a VoiceRxItem with name/detail separation */ function parseToVoiceRxItem(raw, sectionId) {
    // Medication: try to split "Paracetamol 650mg 1-0-1 for 5 days" → name + freq/duration
    if (sectionId === "medication") {
        const freqMatch = raw.match(/\b(\d+-\d+-\d+(?:-\d+)?\s*.*)$/);
        if (freqMatch?.index && freqMatch.index > 0) {
            return {
                name: raw.slice(0, freqMatch.index).trim(),
                detail: freqMatch[1].trim()
            };
        }
    }
    // Symptoms: try to split "fever since 3 days" or "fever (3 days)"
    if (sectionId === "symptoms") {
        const sinceMatch = raw.match(/\s+(?:since|for|from|×|x)\s+(.+)$/i);
        if (sinceMatch?.index && sinceMatch.index > 0) {
            return {
                name: raw.slice(0, sinceMatch.index).trim(),
                detail: sinceMatch[1].trim()
            };
        }
        const parenMatch = raw.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
        if (parenMatch) {
            return {
                name: parenMatch[1].trim(),
                detail: parenMatch[2].trim()
            };
        }
    }
    // Follow-up: try to split "Review in 5 days" → name + detail
    if (sectionId === "followUp") {
        const inMatch = raw.match(/\s+(?:in|after)\s+(.+)$/i);
        if (inMatch?.index && inMatch.index > 0) {
            return {
                name: raw.slice(0, inMatch.index).trim(),
                detail: inMatch[1].trim()
            };
        }
    }
    return {
        name: raw
    };
}
/** Format a VoiceRxItem back to a plain string */ function formatVoiceRxItem(item) {
    return item.detail ? `${item.name} (${item.detail})` : item.name;
}
// ─── Build copy payload from sections ────────────────────────────
function buildCopyPayload(sections, dentalTeeth) {
    const payload = {
        sourceDateLabel: "Voice capture"
    };
    for (const section of sections){
        const plainItems = section.items.map(formatVoiceRxItem);
        switch(section.sectionId){
            case "symptoms":
                payload.symptoms = plainItems;
                break;
            case "medication":
                payload.medications = plainItems.map(parseMedString);
                break;
            case "investigation":
                payload.labInvestigations = plainItems;
                break;
        }
    }
    if (dentalTeeth?.length) {
        payload.examinations = dentalTeeth.map(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$cards$2f$shared$2f$DentalExaminationToothBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDentalExaminationLine"]);
    }
    return payload;
}
function parseMedString(med) {
    // Try to extract dose pattern: "Paracetamol 650mg 1-0-1 after food for 5 days"
    const parts = med.trim();
    const frequencyMatch = parts.match(/\b(\d+-\d+-\d+(?:-\d+)?)\b/);
    const durationMatch = parts.match(/(?:for\s+)?(\d+\s+(?:days?|weeks?|months?))/i);
    const whenMatch = parts.match(/\b(before food|after food|before breakfast|after breakfast|before lunch|after lunch|before dinner|after dinner|with food|empty stomach|SOS)\b/i);
    // Extract medicine name — everything before frequency/duration/when
    let medicineName = parts;
    if (frequencyMatch?.index) {
        medicineName = parts.slice(0, frequencyMatch.index).trim();
    }
    return {
        medicine: medicineName || med,
        unitPerDose: "1 tablet",
        frequency: frequencyMatch?.[1] ?? "1-0-1",
        when: whenMatch?.[1] ?? "After Food",
        duration: durationMatch?.[1] ?? "5 days",
        note: "From voice input"
    };
}
function parseVoiceToStructuredRx(text) {
    const allSections = extractSections(text);
    const primary = allSections.filter((s)=>PRIMARY_SECTION_IDS.has(s.sectionId));
    const dentalTeethRaw = extractDentalTeethFromVoice(text);
    const dentalTeeth = dentalTeethRaw.length ? dentalTeethRaw : undefined;
    const copyAllPayload = buildCopyPayload(primary, dentalTeeth);
    const clinicalExam = buildVoiceClinicalExam(text, primary, dentalTeeth);
    return {
        voiceText: text,
        sections: primary,
        dentalTeeth,
        leadInText: VOICE_RX_LEAD_IN,
        clinicalExam,
        copyAllPayload
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/engines/reply-engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// -----------------------------------------------------------------
// Reply Engine -- Maps intent + patient data -> RxAgentOutput
// Generates mock card data from SmartSummaryData
// -----------------------------------------------------------------
__turbopack_context__.s([
    "buildDocumentReply",
    ()=>buildDocumentReply,
    "buildPomrCardData",
    ()=>buildPomrCardData,
    "buildReply",
    ()=>buildReply,
    "getDocTypeForSpecialty",
    ()=>getDocTypeForSpecialty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$patientRecommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/shared/patientRecommendations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$voice$2d$rx$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dr-agent/engines/voice-rx-engine.ts [app-client] (ecmascript)");
;
;
/** Split a comma-separated string while respecting parentheses. */ function splitRespectingParens(str) {
    const results = [];
    let depth = 0;
    let current = "";
    for (const ch of str){
        if (ch === "(") depth++;
        if (ch === ")") depth = Math.max(0, depth - 1);
        if (ch === "," && depth === 0) {
            results.push(current.trim());
            current = "";
        } else {
            current += ch;
        }
    }
    if (current.trim()) results.push(current.trim());
    return results;
}
/** Words that indicate a more specific clinical query — bypass POMR card matching */ const SPECIFIC_CLINICAL_TERMS = [
    "adequacy",
    "fluid",
    "electrolyte",
    "bone",
    "mineral",
    "calcium",
    "phosph",
    "cardiovascular",
    "cv risk",
    "cardiac",
    "heart",
    "glycemic",
    "glycaemic",
    "glucose",
    "sugar control",
    "adjustment",
    "adjust",
    "dosing",
    "dose",
    "iron",
    "stores",
    "ferritin",
    "polypharmacy",
    "review",
    "timeline",
    "diet",
    "lifestyle",
    "nutrition",
    "handout",
    "education",
    "explain",
    "chronic",
    "medication review",
    "medication timeline"
];
/** Keyword map: input keywords → POMR problem name prefix */ const POMR_KEYWORDS = [
    {
        keywords: [
            "ckd",
            "kidney",
            "renal",
            "dialysis",
            "peritoneal",
            "nephro"
        ],
        matchPrefix: "CKD"
    },
    {
        keywords: [
            "hypertension",
            "htn",
            "bp needs",
            "blood pressure"
        ],
        matchPrefix: "Hypertension"
    },
    {
        keywords: [
            "diabetes",
            "dm",
            "sugar",
            "hba1c",
            "fbs",
            "insulin",
            "glyc"
        ],
        matchPrefix: "Type 2 Diabetes"
    },
    {
        keywords: [
            "anaemia",
            "anemia",
            "epo",
            "haemoglobin",
            "hemoglobin"
        ],
        matchPrefix: "Anaemia"
    }
];
function findPomrProblem(normalized, summary) {
    if (!summary.pomrProblems) return null;
    // If the query contains specific clinical terms, skip POMR card matching
    // so more specific handlers can respond instead
    if (SPECIFIC_CLINICAL_TERMS.some((term)=>normalized.includes(term))) return null;
    for (const { keywords, matchPrefix } of POMR_KEYWORDS){
        if (keywords.some((kw)=>normalized.includes(kw))) {
            const prob = summary.pomrProblems.find((p)=>p.problem.startsWith(matchPrefix));
            if (prob) {
                return {
                    text: `Here's the ${prob.problem} problem card with data completeness and action items.`,
                    rxOutput: {
                        kind: "pomr_problem_card",
                        data: buildPomrCardData(prob, summary)
                    }
                };
            }
        }
    }
    return null;
}
function buildPomrCardData(prob, summary) {
    // Resolve labs from keyLabs by labKeys
    const labs = (prob.labKeys || []).map((key)=>{
        const found = summary.keyLabs?.find((l)=>l.name === key);
        const prov = summary.dataProvenance?.[key];
        return {
            name: key,
            value: found?.value || "—",
            unit: found?.unit,
            flag: found?.flag,
            provenance: prov?.source === "emr" ? "emr" : prov?.source === "ai_extracted" ? "ai_extracted" : undefined
        };
    });
    // Resolve missing fields
    const missingFields = (prob.missingKeys || []).map((key)=>{
        const found = summary.missingExpectedFields?.find((f)=>f.field.includes(key));
        return {
            field: key,
            reason: found?.reason || "Not found in available data",
            prompt: found?.prompt || `Order ${key}`
        };
    });
    // Build source entries from lab provenance + summary data provenance
    const sourceEntries = [];
    const seenSources = new Set();
    (prob.labKeys || []).forEach((key)=>{
        const prov = summary.dataProvenance?.[key];
        if (prov && !seenSources.has(prov.extractedFrom || prov.source)) {
            const sourceKey = prov.extractedFrom || prov.source;
            seenSources.add(sourceKey);
            if (prov.source === "emr") {
                sourceEntries.push({
                    label: prov.extractedFrom || "EMR — Lab Results",
                    date: undefined,
                    type: "emr"
                });
            } else if (prov.source === "ai_extracted") {
                sourceEntries.push({
                    label: prov.extractedFrom || "Uploaded Report",
                    type: "uploaded"
                });
            }
        }
    });
    // Fallback: if no provenance data, add generic EMR source
    if (sourceEntries.length === 0) {
        // Add mock source entries for demo (CKD patient typically has multiple sources)
        if (prob.problem.includes("CKD")) {
            sourceEntries.push({
                label: "Blood Work — CBC, KFT, Electrolytes",
                date: "28 Feb 2026",
                type: "emr"
            }, {
                label: "Nephrology Report — Dr. Arun Mehta",
                date: "15 Feb 2026",
                type: "uploaded"
            });
        } else if (prob.problem.includes("Diabetes")) {
            sourceEntries.push({
                label: "Blood Work — HbA1c, FBS, Lipid Panel",
                date: "28 Feb 2026",
                type: "emr"
            }, {
                label: "Rx #4521 — Dr. Sharma",
                date: "01 Mar 2026",
                type: "rx"
            });
        } else if (prob.problem.includes("Hypertension")) {
            sourceEntries.push({
                label: "Vitals Record — OPD",
                date: "10 Mar 2026",
                type: "emr"
            }, {
                label: "ECG Report — Uploaded",
                date: "20 Feb 2026",
                type: "uploaded"
            });
        } else if (prob.problem.includes("Anaemia") || prob.problem.includes("Anemia")) {
            sourceEntries.push({
                label: "Blood Work — CBC, Iron Studies",
                date: "28 Feb 2026",
                type: "emr"
            }, {
                label: "Rx #4522 — Dr. Sharma",
                date: "01 Mar 2026",
                type: "rx"
            });
        } else {
            sourceEntries.push({
                label: "EMR Records",
                type: "emr"
            });
        }
    }
    return {
        problem: prob.problem,
        status: prob.status,
        statusColor: prob.statusColor,
        completeness: prob.completeness,
        labs,
        meds: prob.medKeys || [],
        missingFields,
        sourceEntries
    };
}
/**
 * Build a concise clinical summary for the patient detail view.
 * Follows SBAR conceptual ordering without literal labels:
 * context → history → assessment → action items
 */ function buildDetailSummary(summary) {
    const lines = [];
    // Clinical context (situation)
    if (summary.sbarSituation) {
        lines.push(summary.sbarSituation);
    } else if (summary.lastVisit?.symptoms) {
        lines.push(`Presenting with ${summary.lastVisit.symptoms.split(",").slice(0, 3).map((s)=>s.trim()).join(", ")}`);
    }
    // History context (background)
    const bg = [];
    if (summary.chronicConditions?.length) bg.push(summary.chronicConditions.join(", "));
    if (summary.allergies?.length) bg.push(`Allergies: ${summary.allergies.join(", ")}`);
    if (bg.length > 0) lines.push(bg.join(". "));
    // Current findings (assessment)
    const findings = [];
    if (summary.todayVitals?.bp) {
        const sys = parseInt(summary.todayVitals.bp.split("/")[0]);
        if (sys > 140 || sys < 90) findings.push(`BP ${summary.todayVitals.bp} (abnormal)`);
    }
    if (summary.todayVitals?.spo2) {
        const spo2 = parseFloat(summary.todayVitals.spo2);
        if (spo2 < 95) findings.push(`SpO₂ ${summary.todayVitals.spo2}% (low)`);
    }
    if (summary.labFlagCount > 0) findings.push(`${summary.labFlagCount} lab values flagged`);
    if (findings.length > 0) lines.push(findings.join("; "));
    // Action items (recommendation)
    const actions = [];
    if (summary.crossProblemFlags?.some((f)=>f.severity === "high")) {
        actions.push("Review drug interactions");
    }
    if (summary.missingExpectedFields?.length) {
        actions.push(`${summary.missingExpectedFields.length} tests overdue`);
    }
    if (summary.followUpOverdueDays > 0) actions.push("Follow-up overdue");
    if (actions.length > 0) lines.push(`Needs attention: ${actions.join("; ")}`);
    if (lines.length === 0) return "Here's the full patient detail summary.";
    return lines.join("\n");
}
function buildReply(input, summary, phase, intent) {
    const normalized = input.toLowerCase().replace(/[\u2080-\u2089]/g, (ch)=>String(ch.charCodeAt(0) - 0x2080));
    // === OUT-OF-SCOPE GUARDRAIL ===
    if (intent.category === "out_of_scope") {
        return {
            text: "Sorry, that's outside my area of expertise. I'm here to help with clinical insights, patient data, and practice management — try one of these instead:",
            suggestions: [
                {
                    label: "Patient summary",
                    message: "Patient summary"
                },
                {
                    label: "Today's vitals",
                    message: "Today's vitals"
                },
                {
                    label: "Medical history",
                    message: "Medical history"
                },
                {
                    label: "Last visit",
                    message: "Last visit details"
                }
            ]
        };
    }
    // === ACTION FLOWS — Write RX, Create Bill, Schedule Follow-up, Book Appointment ===
    // Write RX / Prescription
    if (normalized.includes("write rx") || normalized.includes("write prescription") || normalized.includes("prescribe") || normalized.includes("create rx") || normalized.includes("draft rx")) {
        const meds = summary.activeMeds || [];
        return {
            text: `Prescription draft for ${meds.length > 0 ? `current medications (${meds.slice(0, 3).join(", ")}${meds.length > 3 ? ` + ${meds.length - 3} more` : ""})` : "this patient"}. Review and confirm below.`,
            rxOutput: {
                kind: "follow_up_question",
                data: {
                    question: "How would you like to proceed with the prescription?",
                    options: [
                        "Save prescription for patient",
                        "Add more medications",
                        "Copy to RxPad for editing"
                    ],
                    multiSelect: false
                }
            }
        };
    }
    // Create Bill
    if (normalized.includes("create bill") || normalized.includes("generate bill") || normalized.includes("billing") || normalized.includes("create invoice") || normalized.includes("bill for")) {
        return {
            text: "Bill summary for today's consultation:\n\n• **Consultation Fee** — ₹800\n\nWould you like to add any additional services?",
            rxOutput: {
                kind: "follow_up_question",
                data: {
                    question: "Select additional services to include in the bill:",
                    options: [
                        "Lab tests conducted",
                        "Procedure / Minor surgery",
                        "Pharmacy items",
                        "No additional services — generate bill"
                    ],
                    multiSelect: true
                }
            }
        };
    }
    // Schedule Follow-up
    if (normalized.includes("schedule follow") || normalized.includes("book follow") || normalized.includes("plan follow") || normalized.includes("set follow")) {
        return {
            text: "Follow-up scheduling confirmation:\n\n• **Patient**: will be scheduled for a follow-up\n• **Suggested interval**: based on current diagnosis\n\nThe follow-up has been scheduled. The patient will receive a reminder via the TatvaPractice app."
        };
    }
    // Book Appointment
    if (normalized.includes("book appointment") || normalized.includes("schedule appointment") || normalized.includes("new appointment") || normalized.includes("add appointment")) {
        return {
            text: "Appointment booking:\n\n• Use **+ Add Appointment** in the header to book a new appointment\n• Or use **Start Walk-In** for immediate consultations\n\nI can help you with patient summaries and clinical data — appointment booking is handled through the appointment module."
        };
    }
    // === SYMPTOM COLLECTOR — DIRECT MATCH (highest priority after guardrail) ===
    // Handles: "Show reported intake", "Reported by patient", "Pre-visit intake", "Show intake"
    if (normalized.includes("intake") || normalized === "reported by patient" || normalized.includes("show reported") || normalized.includes("patient reported") || normalized.includes("symptom collector")) {
        if (summary.symptomCollectorData) {
            return {
                text: `Here's the patient-reported data from ${summary.symptomCollectorData.reportedAt}.`,
                rxOutput: {
                    kind: "symptom_collector",
                    data: summary.symptomCollectorData
                }
            };
        }
        return {
            text: "No patient-reported data available for this visit yet."
        };
    }
    // === CLINICAL RECOMMENDATIONS — full list (patient summary card shows top five only) ===
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$patientRecommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["messageAsksForRecommendationsList"])(normalized)) {
        const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$shared$2f$patientRecommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRecommendationsFullListForChat"])(summary);
        if (items.length > 0) {
            return {
                text: "Here are the clinical recommendations for this patient. The summary card lists the five highest-priority bullets; this reply uses the same rules and shows the full set available from the chart.",
                rxOutput: {
                    kind: "text_list",
                    data: {
                        items
                    }
                }
            };
        }
        return {
            text: "No clinical recommendations are available for this patient yet."
        };
    }
    // === EXTERNAL EXPORT CTA (Excel / Word) ===
    if (normalized.includes("excel") || normalized.includes("xlsx") || normalized.includes("spreadsheet") || normalized.includes("word") || normalized.includes("docx") || normalized.includes("document format")) {
        const isExcel = normalized.includes("excel") || normalized.includes("xlsx") || normalized.includes("spreadsheet");
        return {
            text: isExcel ? "Here's an exportable Excel output for this view." : "Here's an exportable Word document for this view.",
            rxOutput: {
                kind: "external_cta",
                data: {
                    title: isExcel ? "Export ready: Excel" : "Export ready: Word",
                    description: isExcel ? "The requested data is ready in spreadsheet format. Open the file using the link below." : "The requested data is ready in Word format. Open the document using the link below.",
                    ctaLabel: isExcel ? "Open Excel file" : "Open Word document",
                    ctaUrl: isExcel ? "https://example.com/exports/patient-view.xlsx" : "https://example.com/exports/patient-view.docx",
                    openInNewTab: true
                }
            }
        };
    }
    // === POMR PROBLEM CARDS (CKD, Hypertension, Diabetes, Anaemia) ===
    if (summary.pomrProblems && summary.pomrProblems.length > 0) {
        const pomrMatch = findPomrProblem(normalized, summary);
        if (pomrMatch) {
            return pomrMatch;
        }
    }
    // === MISSING TESTS / OVERDUE ITEMS ===
    if ((normalized.includes("missing") || normalized.includes("overdue") || normalized.includes("due")) && summary.missingExpectedFields && summary.missingExpectedFields.length > 0) {
        const items = summary.missingExpectedFields.map((f)=>`**${f.field}** — ${f.reason}`);
        return {
            text: `${summary.missingExpectedFields.length} tests/assessments are missing or overdue for this patient:`,
            rxOutput: {
                kind: "text_list",
                data: {
                    items
                }
            }
        };
    }
    // === DRUG INTERACTIONS / CROSS-PROBLEM FLAGS ===
    if ((normalized.includes("interaction") || normalized.includes("cross") || normalized.includes("conflict") || normalized.includes("contraindic")) && summary.crossProblemFlags && summary.crossProblemFlags.length > 0) {
        const items = summary.crossProblemFlags.map((f)=>`[${f.severity.toUpperCase()}] ${f.text}`);
        return {
            text: `${summary.crossProblemFlags.length} cross-problem interactions identified:`,
            rxOutput: {
                kind: "text_list",
                data: {
                    items
                }
            }
        };
    }
    // === ACTIONS NEEDED / RECOMMENDATIONS ===
    if ((normalized.includes("action") || normalized.includes("recommend") || normalized.includes("plan") || normalized.includes("next step")) && summary.recommendationTiers && summary.recommendationTiers.length > 0) {
        const actItems = summary.recommendationTiers.filter((r)=>r.tier === "act");
        const verifyItems = summary.recommendationTiers.filter((r)=>r.tier === "verify");
        const gatherItems = summary.recommendationTiers.filter((r)=>r.tier === "gather");
        const steps = [];
        if (actItems.length > 0) steps.push("**Act now:** " + actItems.map((r)=>r.text).join("; "));
        if (verifyItems.length > 0) steps.push("**Verify first:** " + verifyItems.map((r)=>r.text).join("; "));
        if (gatherItems.length > 0) steps.push("**Gather data:** " + gatherItems.map((r)=>r.text).join("; "));
        return {
            text: "Here are the prioritised recommendations for this visit:",
            rxOutput: {
                kind: "text_step",
                data: {
                    steps
                }
            }
        };
    }
    // === PENDING RECORDS ===
    if ((normalized.includes("record") || normalized.includes("pending")) && summary.recordAlerts && summary.recordAlerts.length > 0) {
        return {
            text: `${summary.recordAlerts.length} pending records need attention:`,
            rxOutput: {
                kind: "text_list",
                data: {
                    items: summary.recordAlerts
                }
            }
        };
    }
    // === DUE ALERTS (specific) ===
    if (normalized.includes("due alert") && summary.dueAlerts && summary.dueAlerts.length > 0) {
        return {
            text: `${summary.dueAlerts.length} overdue or upcoming items:`,
            rxOutput: {
                kind: "text_list",
                data: {
                    items: summary.dueAlerts
                }
            }
        };
    }
    // === DIALYSIS ADEQUACY ===
    if (normalized.includes("dialysis") && summary.pomrProblems?.some((p)=>p.problem.toLowerCase().includes("ckd"))) {
        return {
            text: "Dialysis adequacy assessment based on available data:",
            rxOutput: {
                kind: "text_step",
                data: {
                    steps: [
                        "**Kt/V target:** ≥1.7/week for peritoneal dialysis — verify with recent adequacy test",
                        "**Ultrafiltration:** Monitor daily drain volumes and net UF",
                        "**Residual renal function:** Check 24-hour urine output — declining residual function may need prescription adjustment",
                        "**Peritonitis risk:** Last episode date, PET category, exit site status",
                        "**Adequacy markers:** BUN, Creatinine clearance, albumin trend"
                    ]
                }
            }
        };
    }
    // === FLUID & ELECTROLYTES ===
    if ((normalized.includes("fluid") || normalized.includes("electrolyte")) && summary.pomrProblems) {
        const labs = summary.keyLabs || [];
        const potassium = labs.find((l)=>l.name === "Potassium");
        const sodium = labs.find((l)=>l.name === "Sodium");
        const items = [
            potassium ? `**Potassium:** ${potassium.value} ${potassium.unit || ""} ${potassium.flag ? `(${potassium.flag})` : ""}` : "**Potassium:** Not available — order stat",
            sodium ? `**Sodium:** ${sodium.value} ${sodium.unit || ""} ${sodium.flag ? `(${sodium.flag})` : ""}` : "**Sodium:** Not available",
            "**Fluid balance:** Assess daily weight trends, oedema, dry weight target",
            "**Phosphate binders:** Verify adherence and timing with meals"
        ];
        return {
            text: "Fluid and electrolyte status:",
            rxOutput: {
                kind: "text_list",
                data: {
                    items
                }
            }
        };
    }
    // === BONE MINERAL STATUS ===
    if ((normalized.includes("bone") || normalized.includes("mineral") || normalized.includes("calcium") || normalized.includes("phosph")) && summary.pomrProblems) {
        const labs = summary.keyLabs || [];
        const calcium = labs.find((l)=>l.name === "Calcium");
        const phosphorus = labs.find((l)=>l.name === "Phosphorus");
        const items = [
            calcium ? `**Calcium:** ${calcium.value} ${calcium.unit || ""}` : "**Calcium:** Not available — order",
            phosphorus ? `**Phosphorus:** ${phosphorus.value} ${phosphorus.unit || ""}` : "**Phosphorus:** Not available — order",
            "**PTH:** Check if due (target 2-9× upper normal for CKD Stage 5)",
            "**Vitamin D:** Assess 25(OH)D levels, supplement if <30 ng/mL",
            "**Phosphate binders:** Review type and dose adequacy"
        ];
        return {
            text: "CKD Mineral Bone Disease (CKD-MBD) assessment:",
            rxOutput: {
                kind: "text_list",
                data: {
                    items
                }
            }
        };
    }
    // === CV RISK ASSESSMENT ===
    if ((normalized.includes("cv risk") || normalized.includes("cardiovascular") || normalized.includes("cardiac") || normalized.includes("heart")) && summary.pomrProblems) {
        return {
            text: "Cardiovascular risk assessment for CKD patient:",
            rxOutput: {
                kind: "text_step",
                data: {
                    steps: [
                        "**BP control:** Target <130/80 mmHg — current: " + (summary.todayVitals?.bp || "not recorded today"),
                        "**Lipid panel:** LDL target <70 mg/dL (high CV risk) — statin optimisation",
                        "**ECG:** Annual screening or if symptoms present (stent history noted)",
                        "**Echo:** If new symptoms of dyspnea or fluid overload",
                        "**Antiplatelet:** Continue aspirin post-stent — review duration with cardiology"
                    ]
                }
            }
        };
    }
    // === GLYCEMIC CONTROL ===
    if ((normalized.includes("glycemic") || normalized.includes("glycaemic") || normalized.includes("sugar control") || normalized.includes("glucose")) && summary.pomrProblems) {
        const hba1c = summary.keyLabs?.find((l)=>l.name === "HbA1c");
        const fbs = summary.keyLabs?.find((l)=>l.name === "Fasting Glucose" || l.name === "Fasting Blood Sugar");
        return {
            text: "Glycemic control assessment:",
            rxOutput: {
                kind: "text_step",
                data: {
                    steps: [
                        hba1c ? `**HbA1c:** ${hba1c.value}% — target 7-8% in CKD (avoid aggressive control)` : "**HbA1c:** Not available — order",
                        fbs ? `**Fasting glucose:** ${fbs.value} ${fbs.unit || ""}` : "**Fasting glucose:** Not available",
                        "**Insulin dosing:** CKD reduces insulin clearance — monitor for hypoglycaemia",
                        "**Metformin:** Contraindicated in CKD Stage 4-5 — verify discontinuation",
                        "**Self-monitoring:** Review glucose diary, frequency of hypo episodes"
                    ]
                }
            }
        };
    }
    // === INSULIN ADJUSTMENT ===
    if (normalized.includes("insulin")) {
        return {
            text: "Insulin management considerations for CKD patient:",
            rxOutput: {
                kind: "text_step",
                data: {
                    steps: [
                        "**Dose reduction:** CKD Stage 5 often requires 25-50% dose reduction due to decreased renal clearance",
                        "**Hypoglycaemia risk:** Reduced gluconeogenesis and insulin clearance increase hypo risk",
                        "**Monitoring:** Check pre-meal and bedtime glucose; consider CGM if available",
                        "**Dialysis days:** May need dose adjustment on dialysis vs non-dialysis days"
                    ]
                }
            }
        };
    }
    // === EPO DOSING ===
    if (normalized.includes("epo")) {
        const hb = summary.keyLabs?.find((l)=>l.name === "Hemoglobin");
        return {
            text: "EPO (Erythropoietin) dosing review:",
            rxOutput: {
                kind: "text_step",
                data: {
                    steps: [
                        hb ? `**Current Hb:** ${hb.value} ${hb.unit || ""} — target 10-11.5 g/dL` : "**Hemoglobin:** Not available — order CBC",
                        "**EPO dose:** Titrate to maintain Hb 10-11.5 g/dL; avoid >13 g/dL",
                        "**Iron stores:** Check ferritin (>200 ng/mL) and TSAT (>20%) before increasing EPO",
                        "**Response monitoring:** Recheck Hb in 2-4 weeks after dose change",
                        "**Resistance:** If poor response, evaluate iron deficiency, infection, inflammation"
                    ]
                }
            }
        };
    }
    // === IRON STORES ===
    if (normalized.includes("iron")) {
        const ferritin = summary.keyLabs?.find((l)=>l.name === "Ferritin");
        return {
            text: "Iron stores assessment for anaemia management:",
            rxOutput: {
                kind: "text_list",
                data: {
                    items: [
                        ferritin ? `**Ferritin:** ${ferritin.value} ${ferritin.unit || ""} — target >200 ng/mL for CKD` : "**Ferritin:** Not available — order",
                        "**TSAT:** Target >20% — order if not recent",
                        "**Iron supplementation:** IV iron preferred in CKD (oral absorption poor)",
                        "**Monitoring:** Recheck ferritin and TSAT monthly during IV iron therapy"
                    ]
                }
            }
        };
    }
    // === POLYPHARMACY REVIEW ===
    if (normalized.includes("polypharmacy") || normalized.includes("medication") && normalized.includes("review")) {
        const meds = summary.activeMeds || [];
        return {
            text: `Polypharmacy review — ${meds.length} active medications:`,
            rxOutput: {
                kind: "text_step",
                data: {
                    steps: [
                        `**Active medications:** ${meds.join(", ")}`,
                        "**Renal dose adjustments:** Verify all medications are dosed for CKD Stage 5 / dialysis",
                        "**Deprescribing opportunities:** Review PRN medications, assess ongoing need",
                        "**Timing with dialysis:** Some medications need to be given post-dialysis",
                        "**Adherence:** Complex regimens — consider simplification or pill organiser"
                    ]
                }
            }
        };
    }
    // === MEDICATION TIMELINE ===
    if (normalized.includes("medication timeline") || normalized.includes("med timeline")) {
        return {
            text: "Medication timeline showing prescription history:",
            rxOutput: {
                kind: "text_list",
                data: {
                    items: [
                        "**Jan 2024:** Started peritoneal dialysis — added phosphate binders, EPO",
                        "**2021:** Post-MI — started dual antiplatelet, statin optimised",
                        "**2018+:** Insulin therapy for T2DM — doses adjusted for declining renal function",
                        "**Ongoing:** Antihypertensives (Telma, Amlodipine), Cholesterol tablet"
                    ]
                }
            }
        };
    }
    // === CHRONIC CONDITIONS SUMMARY ===
    if (normalized.includes("chronic")) {
        const conditions = summary.chronicConditions || [];
        if (conditions.length === 0) {
            return {
                text: "No chronic conditions documented for this patient."
            };
        }
        const items = conditions.map((c)=>`• ${c}`);
        return {
            text: `${conditions.length} chronic conditions on record:`,
            rxOutput: {
                kind: "text_list",
                data: {
                    items
                }
            }
        };
    }
    // === DIET & LIFESTYLE ===
    if (normalized.includes("diet") || normalized.includes("lifestyle") || normalized.includes("nutrition")) {
        const isCKD = summary.pomrProblems?.some((p)=>p.problem.toLowerCase().includes("ckd"));
        const isDM = summary.pomrProblems?.some((p)=>p.problem.toLowerCase().includes("diabetes"));
        const steps = [];
        if (isCKD) {
            steps.push("**Renal diet:** Low potassium, low phosphorus, moderate protein (0.8-1.0 g/kg/day on PD)");
            steps.push("**Fluid restriction:** Based on residual urine output + 500mL/day");
            steps.push("**Sodium:** <2g/day to manage fluid balance and BP");
        }
        if (isDM) {
            steps.push("**Carbohydrate:** Consistent carb intake, avoid refined sugars");
            steps.push("**Glycemic index:** Prefer low-GI foods for stable glucose");
        }
        steps.push("**Exercise:** Light to moderate activity as tolerated — improves CV health");
        steps.push("**Smoking/alcohol:** Counsel cessation if applicable");
        return {
            text: "Personalised diet and lifestyle recommendations:",
            rxOutput: {
                kind: "text_step",
                data: {
                    steps
                }
            }
        };
    }
    // === PATIENT HANDOUT ===
    if (normalized.includes("handout") || normalized.includes("patient education")) {
        return {
            text: "Patient education handout generated:",
            rxOutput: {
                kind: "text_step",
                data: {
                    steps: [
                        "**Understanding your condition:** Brief explanation of CKD Stage 5 and peritoneal dialysis",
                        "**Medications:** Why each medication is important — take as prescribed",
                        "**Warning signs:** When to seek emergency care (chest pain, severe breathlessness, cloudy PD fluid)",
                        "**Diet tips:** Foods to avoid (high potassium, high phosphorus), safe choices",
                        "**Follow-up:** Next appointment schedule and what tests to expect"
                    ]
                }
            }
        };
    }
    // === EXPLAIN DIAGNOSIS ===
    if (normalized.includes("explain") && (normalized.includes("diagnos") || normalized.includes("dx"))) {
        return {
            text: "Diagnosis explanation for clinical documentation:",
            rxOutput: {
                kind: "text_step",
                data: {
                    steps: [
                        "**Primary:** CKD Stage 5 on peritoneal dialysis — ESRD requiring renal replacement therapy since Jan 2024",
                        "**Comorbid:** Type 2 Diabetes Mellitus (18 years) — insulin-dependent, complicated by nephropathy",
                        "**Comorbid:** Hypertension — likely renoparenchymal + essential, on dual antihypertensives",
                        "**Comorbid:** Renal Anaemia — on EPO therapy, likely functional iron deficiency",
                        "**History:** CAD post-MI (2021) — stent placed, on secondary prevention"
                    ]
                }
            }
        };
    }
    // === OBSTETRIC SUMMARY (before generic summary) ===
    if ((normalized.includes("obstetric") || normalized.includes("ob summary") || normalized.includes("obstetric history") || normalized.includes("obstetric summary") || normalized.includes("pregnancy summary") || normalized.includes("pregnancy") || normalized.includes("anc summary") || normalized.includes("anc")) && summary.obstetricData) {
        return {
            text: `Here's the obstetric summary${summary.obstetricData.gestationalWeeks ? ` at ${summary.obstetricData.gestationalWeeks}` : ""}.`,
            rxOutput: {
                kind: "obstetric_summary",
                data: summary.obstetricData
            }
        };
    }
    // === GYNEC SUMMARY (before generic summary) ===
    if ((normalized.includes("gynec") || normalized.includes("gynae") || normalized.includes("gynaec") || normalized.includes("gynecological") || normalized.includes("gynec history") || normalized.includes("gynec summary") || normalized.includes("cycle") || normalized.includes("lmp") || normalized.includes("menstrual")) && summary.gynecData) {
        return {
            text: "Here's the gynecological summary for your review.",
            rxOutput: {
                kind: "gynec_summary",
                data: summary.gynecData
            }
        };
    }
    // === PEDIATRIC SUMMARY (before generic summary) ===
    if ((normalized.includes("growth") || normalized.includes("vaccine") || normalized.includes("pediatric") || normalized.includes("pedia") || normalized.includes("pediatric summary") || normalized.includes("pedia summary") || normalized.includes("growth summary") || normalized.includes("vaccination summary") || normalized.includes("growth and vaccination")) && summary.pediatricsData) {
        return {
            text: `Here's the pediatric summary${summary.pediatricsData.ageDisplay ? ` for this ${summary.pediatricsData.ageDisplay} patient` : ""}.`,
            rxOutput: {
                kind: "pediatric_summary",
                data: summary.pediatricsData
            }
        };
    }
    // === OPHTHAL SUMMARY (before generic summary) ===
    if ((normalized.includes("ophthal") || normalized.includes("ophthal summary") || normalized.includes("ophthalmology") || normalized.includes("ophthal history") || normalized.includes("vision summary") || normalized.includes("eye") || normalized.includes("vision") || normalized.includes("va")) && summary.ophthalData) {
        return {
            text: "Here's the ophthalmology summary for your review.",
            rxOutput: {
                kind: "ophthal_summary",
                data: summary.ophthalData
            }
        };
    }
    // === PATIENT'S DETAILED SUMMARY (pill-triggered) ===
    // SBAR card situation quote is built from intake only (see buildCardSituationQuote); no narrative mutation here.
    if (normalized.includes("detailed summary") || normalized.includes("detail summary") || normalized.includes("patient detail")) {
        return {
            text: "Patient's detailed summary:",
            rxOutput: {
                kind: "sbar_overview",
                data: summary
            },
            suggestions: [
                {
                    label: "Today's vitals",
                    message: "Today's vitals"
                },
                {
                    label: "Medical history",
                    message: "Medical history"
                },
                {
                    label: "Lab overview",
                    message: "Lab overview"
                }
            ]
        };
    }
    // === SBAR OVERVIEW (explicit) ===
    if (normalized.includes("sbar") || normalized.includes("s-bar") || normalized.includes("handoff")) {
        return {
            text: "Here's the clinical summary.",
            rxOutput: {
                kind: "sbar_overview",
                data: summary
            },
            suggestions: [
                {
                    label: "Today's vitals",
                    message: "Today's vitals"
                },
                {
                    label: "Lab overview",
                    message: "Lab overview"
                },
                {
                    label: "Last visit",
                    message: "Last visit details"
                }
            ]
        };
    }
    // === PATIENT SUMMARY (now returns SBAR overview as primary) ===
    if (normalized.includes("summary") || normalized.includes("snapshot") || normalized.includes("patient")) {
        return {
            text: summary.specialtyTags.length > 0 ? "Here's the patient's clinical summary." : "This is a new patient, no records found yet. You can begin by adding history or uploading reports.",
            rxOutput: {
                kind: "sbar_overview",
                data: summary
            },
            suggestions: [
                {
                    label: "Today's vitals",
                    message: "Today's vitals"
                },
                {
                    label: "Medical history",
                    message: "Medical history"
                },
                {
                    label: "Last visit",
                    message: "Last visit details"
                }
            ]
        };
    }
    // === PAST VISIT SUMMARIES ===
    if (normalized.includes("last visit") || normalized.includes("past visit") || normalized.includes("previous")) {
        if (!summary.lastVisit) {
            return {
                text: "No past visits found for this patient yet."
            };
        }
        return {
            text: `Here's the visit summary from ${summary.lastVisit.date}. You can ask for any specific date to see that visit's details.`,
            rxOutput: {
                kind: "last_visit",
                data: {
                    visitDate: summary.lastVisit.date,
                    sections: [
                        {
                            tag: "Symptoms",
                            icon: "thermometer",
                            items: splitRespectingParens(summary.lastVisit.symptoms).map((s)=>{
                                const parenMatch = s.match(/^([^(]+)\((.+)\)\s*$/);
                                if (parenMatch) {
                                    // "Fever (2d, high, evening spikes)" → label: "Fever", detail: "2d, high, evening spikes"
                                    return {
                                        label: parenMatch[1].trim(),
                                        detail: parenMatch[2].trim()
                                    };
                                }
                                return {
                                    label: s.trim()
                                };
                            })
                        },
                        {
                            tag: "Examination",
                            icon: "stethoscope",
                            items: splitRespectingParens(summary.lastVisit.examination).map((e)=>{
                                const parts = e.split(":");
                                return {
                                    label: parts[0].trim(),
                                    detail: parts.length > 1 ? parts.slice(1).join(":").trim() : undefined
                                };
                            })
                        },
                        {
                            tag: "Diagnosis",
                            icon: "Diagnosis",
                            items: splitRespectingParens(summary.lastVisit.diagnosis).map((d)=>({
                                    label: d
                                }))
                        },
                        {
                            tag: "Medication",
                            icon: "pill",
                            items: splitRespectingParens(summary.lastVisit.medication).map((m)=>{
                                // "Telma 20mg (Twice daily | Before food)" → label: "Telma 20mg", detail: "Twice daily | Before food"
                                const parenMatch = m.trim().match(/^(.+?)\s*\((.+)\)\s*$/);
                                if (parenMatch) {
                                    return {
                                        label: parenMatch[1].trim(),
                                        detail: parenMatch[2].trim()
                                    };
                                }
                                // "Paracetamol 650mg" — no parenthetical detail
                                return {
                                    label: m.trim()
                                };
                            })
                        },
                        {
                            tag: "Investigation",
                            icon: "Lab",
                            items: splitRespectingParens(summary.lastVisit.labTestsSuggested).map((l)=>({
                                    label: l
                                }))
                        },
                        ...summary.lastVisit.advice ? [
                            {
                                tag: "Advice",
                                icon: "clipboard-activity",
                                items: splitRespectingParens(summary.lastVisit.advice).map((a)=>({
                                        label: a
                                    }))
                            }
                        ] : [],
                        ...summary.lastVisit.followUp ? [
                            {
                                tag: "Follow-up",
                                icon: "medical-record",
                                items: [
                                    {
                                        label: summary.lastVisit.followUp
                                    }
                                ]
                            }
                        ] : []
                    ],
                    copyAllPayload: {
                        sourceDateLabel: summary.lastVisit.date,
                        symptoms: splitRespectingParens(summary.lastVisit.symptoms),
                        diagnoses: splitRespectingParens(summary.lastVisit.diagnosis),
                        advice: summary.lastVisit.advice,
                        followUp: summary.lastVisit.followUp
                    }
                }
            },
            suggestions: [
                {
                    label: "Medical history",
                    message: "Medical history"
                },
                {
                    label: "Today's vitals",
                    message: "Today's vitals"
                },
                {
                    label: "Suggest DDX",
                    message: "Suggest DDX"
                }
            ]
        };
    }
    // === MEDICAL HISTORY (patient's clinical background) ===
    // === INDIVIDUAL HISTORY SUB-SECTIONS ===
    if (normalized === "chronic conditions" || normalized.includes("chronic") && normalized.includes("condition")) {
        if (summary.chronicConditions?.length) {
            return {
                text: `${summary.chronicConditions.length} chronic condition${summary.chronicConditions.length > 1 ? "s" : ""} on record.`,
                rxOutput: {
                    kind: "medical_history",
                    data: {
                        sections: [
                            {
                                tag: "Chronic Conditions",
                                items: summary.chronicConditions
                            }
                        ]
                    }
                }
            };
        }
        return {
            text: "No chronic conditions on record for this patient."
        };
    }
    if (normalized === "allergies" || normalized.includes("allerg") && !normalized.includes("conflict")) {
        if (summary.allergies?.length) {
            return {
                text: `${summary.allergies.length} allerg${summary.allergies.length > 1 ? "ies" : "y"} on record.`,
                rxOutput: {
                    kind: "medical_history",
                    data: {
                        sections: [
                            {
                                tag: "Allergies",
                                items: summary.allergies
                            }
                        ]
                    }
                }
            };
        }
        return {
            text: "No allergies recorded for this patient."
        };
    }
    if (normalized === "family history" || normalized.includes("family") && normalized.includes("history")) {
        if (summary.familyHistory?.length) {
            return {
                text: `Family history — ${summary.familyHistory.length} entries.`,
                rxOutput: {
                    kind: "medical_history",
                    data: {
                        sections: [
                            {
                                tag: "Family History",
                                items: summary.familyHistory
                            }
                        ]
                    }
                }
            };
        }
        return {
            text: "No family history on record."
        };
    }
    if (normalized === "lifestyle" || normalized.includes("lifestyle note")) {
        if (summary.lifestyleNotes?.length) {
            return {
                text: `Lifestyle notes — ${summary.lifestyleNotes.length} entries.`,
                rxOutput: {
                    kind: "medical_history",
                    data: {
                        sections: [
                            {
                                tag: "Lifestyle",
                                items: summary.lifestyleNotes
                            }
                        ]
                    }
                }
            };
        }
        return {
            text: "No lifestyle notes on record."
        };
    }
    // === FULL MEDICAL HISTORY ===
    if (normalized.includes("medical history") || normalized.includes("med history") || normalized.includes("clinical history") || normalized.includes("past history") || normalized.includes("patient history")) {
        const sections = [];
        if (summary.chronicConditions?.length) {
            sections.push({
                tag: "Chronic Conditions",
                items: summary.chronicConditions
            });
        }
        if (summary.allergies?.length) {
            sections.push({
                tag: "Allergies",
                items: summary.allergies
            });
        }
        if (summary.familyHistory?.length) {
            sections.push({
                tag: "Family History",
                items: summary.familyHistory
            });
        }
        if (summary.lifestyleNotes?.length) {
            sections.push({
                tag: "Lifestyle",
                items: summary.lifestyleNotes
            });
        }
        // Active medications NOT included in medical history — separate card
        // Surgical history from symptom collector
        if (summary.symptomCollectorData?.medicalHistory?.length) {
            sections.push({
                tag: "History",
                items: summary.symptomCollectorData.medicalHistory
            });
        }
        if (sections.length === 0) {
            return {
                text: "No medical history on record for this patient yet."
            };
        }
        const totalItems = sections.reduce((sum, s)=>sum + s.items.length, 0);
        return {
            text: `Here's the medical history — ${sections.length} sections, ${totalItems} entries on record.`,
            rxOutput: {
                kind: "medical_history",
                data: {
                    sections,
                    insight: summary.chronicConditions && summary.chronicConditions.length > 2 ? `${summary.chronicConditions.length} chronic conditions — multimorbidity consideration.` : undefined
                }
            },
            suggestions: [
                {
                    label: "Medication history",
                    message: "Medication history"
                },
                {
                    label: "Last visit",
                    message: "Last visit details"
                },
                {
                    label: "Today's vitals",
                    message: "Today's vitals"
                }
            ]
        };
    }
    // === MEDICATION HISTORY ===
    if (normalized.includes("medication history") || normalized.includes("drug history") || normalized.includes("past medication")) {
        const entries = (summary.activeMeds || []).map((m, i)=>({
                drug: m.split(/\s+\d/)[0] || m,
                dosage: m,
                date: summary.lastVisit?.date || "Recent",
                diagnosis: summary.chronicConditions?.[i] || summary.lastVisit?.diagnosis || "Chronic management",
                source: "prescribed"
            }));
        if (entries.length === 0) {
            return {
                text: "No medication history available for this patient yet."
            };
        }
        return {
            text: `Here's the medication history — ${entries.length} active medications on record.`,
            rxOutput: {
                kind: "med_history",
                data: {
                    entries,
                    insight: entries.length > 3 ? "Multiple active medications — consider polypharmacy review." : `${entries.length} active medication${entries.length > 1 ? "s" : ""} on record.`
                }
            },
            suggestions: [
                {
                    label: "Drug interactions",
                    message: "Check drug interactions"
                },
                {
                    label: "Medical history",
                    message: "Medical history"
                },
                {
                    label: "Lab overview",
                    message: "Lab overview"
                }
            ]
        };
    }
    // === TODAY'S VITALS (VITALS SUMMARY) ===
    if (normalized.includes("today's vitals") || normalized.includes("todays vitals") || normalized.includes("vitals today") || normalized.includes("vital summary") || normalized.includes("vitals summary") || normalized.includes("current vitals") || normalized.includes("recorded vitals")) {
        const v = summary.todayVitals;
        const rows = [];
        if (v) {
            if (v.bp) {
                const parts = v.bp.split("/").map(Number);
                const sys = parts[0] || 0;
                const dia = parts[1] || 0;
                rows.push({
                    shortLabel: "BP",
                    label: "Blood Pressure",
                    value: v.bp,
                    unit: "mmHg",
                    flag: sys > 140 || dia > 90 ? "high" : sys < 90 ? "low" : "normal"
                });
            }
            if (v.pulse) {
                const p = parseFloat(v.pulse);
                rows.push({
                    shortLabel: "HR",
                    label: "Heart Rate",
                    value: v.pulse,
                    unit: "bpm",
                    flag: p > 100 ? "high" : p < 60 ? "low" : "normal"
                });
            }
            if (v.spo2) {
                const s = parseFloat(v.spo2);
                rows.push({
                    shortLabel: "SpO₂",
                    label: "Oxygen Saturation",
                    value: v.spo2,
                    unit: "%",
                    flag: s < 95 ? "low" : "normal"
                });
            }
            if (v.temp) {
                const t = parseFloat(v.temp);
                rows.push({
                    shortLabel: "Temp",
                    label: "Temperature",
                    value: v.temp,
                    unit: "°F",
                    flag: t > 99.5 ? "high" : "normal"
                });
            }
            if (v.weight) rows.push({
                shortLabel: "Wt",
                label: "Weight",
                value: v.weight,
                unit: "kg",
                flag: "normal"
            });
            if (v.height) rows.push({
                shortLabel: "Ht",
                label: "Height",
                value: v.height,
                unit: "cm",
                flag: "normal"
            });
            if (v.bmi) {
                const b = parseFloat(v.bmi);
                rows.push({
                    shortLabel: "BMI",
                    label: "Body Mass Index",
                    value: v.bmi,
                    unit: "kg/m²",
                    flag: b > 30 ? "high" : b < 18.5 ? "low" : "normal"
                });
            }
            if (v.rr) {
                const r = parseFloat(v.rr);
                rows.push({
                    shortLabel: "RR",
                    label: "Respiratory Rate",
                    value: v.rr,
                    unit: "/min",
                    flag: r > 20 ? "high" : "normal"
                });
            }
            if (v.bloodSugar) rows.push({
                shortLabel: "BS",
                label: "Blood Sugar",
                value: v.bloodSugar,
                unit: "mg/dL",
                flag: parseFloat(v.bloodSugar) > 200 ? "high" : "normal"
            });
        }
        if (rows.length === 0) {
            return {
                text: "No vitals have been recorded for this patient today."
            };
        }
        const flaggedCount = rows.filter((r)=>r.flag && r.flag !== "normal").length;
        return {
            text: flaggedCount > 0 ? `Today's vitals — ${flaggedCount} parameter${flaggedCount > 1 ? "s" : ""} flagged.` : "Today's vitals — all within normal range.",
            rxOutput: {
                kind: "vitals_summary",
                data: {
                    title: "Today's Vitals",
                    recordedAt: "Today",
                    rows,
                    insight: flaggedCount > 0 ? `${flaggedCount} value${flaggedCount > 1 ? "s" : ""} outside normal range — review recommended.` : "All parameters within normal limits."
                }
            },
            suggestions: [
                {
                    label: "Vital trends",
                    message: "Vital trends"
                },
                {
                    label: "Lab overview",
                    message: "Lab overview"
                },
                {
                    label: "Patient summary",
                    message: "Patient summary"
                }
            ]
        };
    }
    // === PATIENT TIMELINE ===
    if (normalized.includes("timeline") || normalized.includes("patient timeline") || normalized.includes("visit timeline") || normalized.includes("history timeline")) {
        const events = [];
        if (summary.lastVisit) {
            events.push({
                date: summary.lastVisit.date,
                type: "visit",
                summary: `${summary.lastVisit.diagnosis} — ${summary.lastVisit.medication?.split(",")[0] || ""}`
            });
        }
        if (summary.keyLabs?.length) {
            events.push({
                date: summary.lastVisit?.date || "Recent",
                type: "lab",
                summary: `${summary.keyLabs.length} parameters, ${summary.labFlagCount} flagged`
            });
        }
        if (summary.obstetricData?.lastExamDate) {
            events.push({
                date: summary.obstetricData.lastExamDate,
                type: "procedure",
                summary: `Obstetric exam — ${summary.obstetricData.gestationalWeeks || "ANC"}`
            });
        }
        if (summary.recordAlerts?.length) {
            events.push({
                date: "Uploaded",
                type: "procedure",
                summary: summary.recordAlerts[0]
            });
        }
        // Add some historical entries
        if (summary.chronicConditions?.length) {
            events.push({
                date: "On record",
                type: "visit",
                summary: `Chronic: ${summary.chronicConditions.join(", ")}`
            });
        }
        return {
            text: `Here's the patient timeline — ${events.length} key events on record.`,
            rxOutput: {
                kind: "patient_timeline",
                data: {
                    title: "Patient Timeline",
                    events
                }
            }
        };
    }
    // === REFERRAL ===
    if (normalized.includes("referral") || normalized.includes("refer to") || normalized.includes("specialist referral") || normalized.includes("refer specialist")) {
        const patientName = "Current Patient";
        return {
            text: `Here's the incoming referral summary for ${patientName}.`,
            rxOutput: {
                kind: "referral",
                data: {
                    title: "Doctor Referral Summary (Incoming)",
                    totalReferrers: 1,
                    totalPatients: 1,
                    items: [
                        {
                            doctorName: summary.obstetricData ? "Dr. Meena Iyer" : "Dr. Sanjay Mehta",
                            doctorPhone: "98XXXXXX11",
                            specialty: summary.obstetricData ? "OBG" : "General Medicine",
                            patientsReferred: 1,
                            topReason: summary.obstetricData ? `Early pregnancy (${summary.obstetricData.gestationalWeeks}) with asthma` : `Consultation support for ${(summary.chronicConditions || [
                                "general review"
                            ]).join(", ")}`
                        }
                    ]
                }
            }
        };
    }
    // === VACCINATION SCHEDULE ===
    if (normalized.includes("vaccination") || normalized.includes("vaccine schedule") || normalized.includes("immunization") || normalized.includes("vaccine") && !normalized.includes("vaccine summary")) {
        const patientName = "Current Patient";
        const vaccines = [];
        if (summary.obstetricData?.vaccineStatus) {
            summary.obstetricData.vaccineStatus.forEach((v)=>{
                const isGiven = v.toLowerCase().includes("given");
                vaccines.push({
                    patientName,
                    name: v.split("(")[0].trim(),
                    dose: "Standard",
                    dueDate: isGiven ? "Completed" : "Due now",
                    status: isGiven ? "given" : "due"
                });
            });
        }
        if (summary.pediatricsData?.overdueVaccineNames) {
            summary.pediatricsData.overdueVaccineNames.forEach((v)=>{
                vaccines.push({
                    patientName,
                    name: v,
                    dose: "Standard",
                    dueDate: "Overdue",
                    status: "overdue"
                });
            });
        }
        // Add standard vaccines for adults
        if (vaccines.length === 0 || !summary.pediatricsData) {
            vaccines.push({
                patientName,
                name: "Influenza (Annual)",
                dose: "0.5ml IM",
                dueDate: "Due",
                status: "due"
            }, {
                patientName,
                name: "Td/TT Booster",
                dose: "0.5ml IM",
                dueDate: summary.obstetricData ? "Due now" : "Due (if >10yr)",
                status: summary.obstetricData ? "due" : "due"
            }, {
                patientName,
                name: "Hepatitis B",
                dose: "3-dose series",
                dueDate: "Check status",
                status: "due"
            });
        }
        const overdueCount = vaccines.filter((v)=>v.status === "overdue").length;
        const dueCount = vaccines.filter((v)=>v.status === "due").length;
        const givenCount = vaccines.filter((v)=>v.status === "given").length;
        return {
            text: `Here's the vaccination schedule — ${vaccines.filter((v)=>v.status !== "given").length} vaccines pending.`,
            rxOutput: {
                kind: "vaccination_schedule",
                data: {
                    title: "Vaccination Schedule",
                    overdueCount,
                    dueCount,
                    givenCount,
                    vaccines
                }
            }
        };
    }
    // === CLINICAL GUIDELINE ===
    if (normalized.includes("guideline") || normalized.includes("clinical guideline") || normalized.includes("evidence") || normalized.includes("protocol guide") || normalized.includes("treatment guideline")) {
        const condition = summary.chronicConditions?.[0] || summary.lastVisit?.diagnosis || "General";
        const isAsthma = (summary.chronicConditions || []).some((c)=>c.toLowerCase().includes("asthma"));
        const isPregnant = !!summary.obstetricData;
        const recommendations = isAsthma && isPregnant ? [
            "Budesonide is the preferred ICS in pregnancy (Category B)",
            "Uncontrolled asthma poses greater risk than ICS use",
            "LABA + ICS combination preferred over high-dose ICS alone",
            "Avoid Deriphyllin in 1st trimester — consider alternatives",
            "Monitor PEFR weekly, target >80% predicted",
            "Step down only if well-controlled for ≥3 months"
        ] : isAsthma ? [
            "Step-up therapy if symptoms >2 days/week",
            "ICS is first-line controller therapy",
            "SABA for rescue use only (not maintenance)",
            "Annual influenza vaccination recommended",
            "Allergen avoidance as adjunct to pharmacotherapy"
        ] : [
            "Follow evidence-based treatment protocols",
            "Monitor response to therapy at regular intervals",
            "Patient education is integral to management",
            "Consider specialist referral if inadequate response"
        ];
        return {
            text: `Here are the clinical guidelines for ${condition.split("(")[0].trim()}.`,
            rxOutput: {
                kind: "clinical_guideline",
                data: {
                    title: `Clinical Guidelines: ${condition.split("(")[0].trim()}`,
                    condition: condition.split("(")[0].trim(),
                    source: isAsthma ? "GINA 2025 / Indian Chest Society" : "Standard Clinical Protocols",
                    recommendations,
                    evidenceLevel: "A"
                }
            }
        };
    }
    // === BILLING SUMMARY ===
    if (normalized.includes("billing") || normalized.includes("bill summary") || normalized.includes("billing overview") || normalized.includes("invoice") || normalized.includes("charges")) {
        return {
            text: "Here's the billing summary for this consultation.",
            rxOutput: {
                kind: "billing_summary",
                data: {
                    title: "OPD Billing: This Week",
                    mode: "billing",
                    items: [
                        {
                            referenceNo: "INV-1001",
                            patientName: "Current Patient",
                            amount: 500,
                            billedAmount: 500,
                            paidAmount: 500,
                            status: "paid_fully"
                        },
                        {
                            referenceNo: "INV-1002",
                            patientName: "Current Patient",
                            amount: 1200,
                            billedAmount: 1200,
                            paidAmount: 0,
                            status: "due"
                        },
                        {
                            referenceNo: "INV-1003",
                            patientName: "Current Patient",
                            amount: 300,
                            billedAmount: 300,
                            paidAmount: 300,
                            status: "paid_fully"
                        },
                        {
                            referenceNo: "INV-1004",
                            patientName: "Current Patient",
                            amount: 80,
                            billedAmount: 80,
                            paidAmount: 80,
                            status: "refunded"
                        }
                    ],
                    totalBilledAmount: 2080,
                    totalPaidFullyAmount: 1880,
                    totalDueAmount: 1200,
                    totalRefundedAmount: 80,
                    totalAdvanceReceived: 650,
                    totalAdvanceRefunded: 80,
                    totalAdvanceDebited: 200
                }
            }
        };
    }
    // === RX PREVIEW ===
    if (normalized.includes("rx preview") || normalized.includes("prescription preview") || normalized.includes("preview rx") || normalized.includes("preview prescription")) {
        const diagnoses = summary.lastVisit?.diagnosis ? splitRespectingParens(summary.lastVisit.diagnosis) : [
            "Current diagnosis"
        ];
        const medications = (summary.activeMeds || []).slice(0, 4);
        const investigations = summary.lastVisit?.labTestsSuggested ? splitRespectingParens(summary.lastVisit.labTestsSuggested) : [];
        return {
            text: "Here's a preview of the current prescription being prepared.",
            rxOutput: {
                kind: "rx_preview",
                data: {
                    patientName: summary.specialtyTags.length > 0 ? "Current Patient" : "New Patient",
                    date: "Today",
                    diagnoses,
                    medications,
                    investigations,
                    advice: summary.lastVisit?.advice ? splitRespectingParens(summary.lastVisit.advice) : [
                        "Continue prescribed medications"
                    ],
                    followUp: summary.lastVisit?.followUp || "As advised"
                }
            }
        };
    }
    // === OCR / DOCUMENT ANALYSIS ===
    if (normalized.includes("ocr") || normalized.includes("scan report") || normalized.includes("uploaded report") || normalized.includes("document analysis") || normalized.includes("extract report")) {
        if (normalized.includes("extract") || normalized.includes("extraction")) {
            // OCR Full Extraction
            return {
                text: "I've extracted structured data from the uploaded report.",
                rxOutput: {
                    kind: "ocr_extraction",
                    data: {
                        title: "Report Extraction",
                        category: "Pathology Report",
                        sections: [
                            {
                                heading: "Diagnosis",
                                icon: "Diagnosis",
                                items: summary.lastVisit?.diagnosis ? splitRespectingParens(summary.lastVisit.diagnosis) : [
                                    "Pending review"
                                ],
                                copyDestination: "rxpad"
                            },
                            {
                                heading: "Medications",
                                icon: "pill",
                                items: (summary.activeMeds || []).slice(0, 3),
                                copyDestination: "rxpad"
                            },
                            {
                                heading: "Investigations",
                                icon: "Lab",
                                items: summary.lastVisit?.labTestsSuggested ? splitRespectingParens(summary.lastVisit.labTestsSuggested) : [
                                    "No investigations noted"
                                ],
                                copyDestination: "rxpad"
                            }
                        ]
                    }
                }
            };
        }
        // OCR Pathology
        const parameters = (summary.keyLabs || []).map((lab)=>({
                name: lab.name,
                value: lab.value,
                refRange: lab.refRange,
                flag: lab.flag,
                confidence: "high"
            }));
        return {
            text: `I've analyzed the uploaded report — ${parameters.filter((p)=>p.flag).length} flagged values found.`,
            rxOutput: {
                kind: "ocr_pathology",
                data: {
                    title: "Lab Report (OCR)",
                    category: "Blood Investigation",
                    parameters,
                    normalCount: Math.max(0, 12 - parameters.length)
                }
            }
        };
    }
    // === VOICE / STRUCTURED RX / TRANSCRIPT ===
    if (normalized.includes("voice") || normalized.includes("transcript") || normalized.includes("structured rx") || normalized.includes("dictation") || normalized.includes("voice rx")) {
        const voiceText = summary.lastVisit ? `Chief complaint ${summary.lastVisit.symptoms}. On general examination ${summary.lastVisit.examination}. Impression ${summary.lastVisit.diagnosis}. Medication ${summary.lastVisit.medication}. Suggest labs ${summary.lastVisit.labTestsSuggested}. Dental examination dictation. Tooth number 22 upper left lateral incisor: endosseous implant with crown; patient states placement in August 2022; light plaque and stain buccally; occlusion feels stable. Tooth number 24 upper left first premolar: cavitated caries on lateral buccal surface toward contact; resin sealant occlusal since 2016 with partial mesial loss; cold test shows delayed response versus adjacent.` : "Chief complaint sore throat and low-grade fever since two days. Prescribing paracetamol 650 milligram one zero one after food for five days and warm saline gargle. Order CBC and CRP if fever persists beyond forty-eight hours. Dental examination dictation. Tooth number 22 upper left lateral incisor: endosseous implant and crown; patient says it was placed in August 2022; buccal plaque noted; no mobility reported. Tooth number 24 upper left first premolar: cavity on lateral buccal surface near contact; old sealant 2016 with partial loss; cold test delayed.";
        const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$voice$2d$rx$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enrichVoiceStructuredWithPatientContext"])(voiceText, summary);
        return {
            text: data.leadInText ?? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dr$2d$agent$2f$engines$2f$voice$2d$rx$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VOICE_RX_LEAD_IN"],
            rxOutput: {
                kind: "voice_structured_rx",
                data
            }
        };
    }
    // === ALLERGY CONFLICT (specific, before generic allergy handler) ===
    if (normalized.includes("allergy conflict") || normalized.includes("allergy safety") || normalized.includes("conflict check") || normalized.includes("drug allergy check")) {
        if (summary.allergies?.length) {
            const allergen = summary.allergies[0];
            const drug = allergen.toLowerCase().includes("aspirin") ? "Aspirin 75mg" : allergen.toLowerCase().includes("penicillin") ? "Amoxicillin 500mg" : allergen.toLowerCase().includes("sulfa") ? "Sulfasalazine 500mg" : "Suspected medication";
            const alternative = allergen.toLowerCase().includes("aspirin") ? "Clopidogrel 75mg" : allergen.toLowerCase().includes("penicillin") ? "Azithromycin 500mg" : allergen.toLowerCase().includes("sulfa") ? "Mesalamine 400mg" : "Alternative medication";
            return {
                text: `⚠️ Allergy conflict detected — **${allergen}** is on record. Suggesting safe alternative.`,
                rxOutput: {
                    kind: "allergy_conflict",
                    data: {
                        drug,
                        allergen,
                        alternative
                    }
                }
            };
        }
        return {
            text: "No allergies on record — no conflicts detected with current prescriptions."
        };
    }
    // === FOLLOW-UP QUESTION / CLARIFY ===
    if (normalized.includes("clarify") || normalized.includes("ask patient") || normalized.includes("question for patient") || normalized.includes("follow-up question") || normalized.includes("need more info")) {
        const question = summary.obstetricData ? "Can you confirm the exact date of your last menstrual period?" : summary.chronicConditions?.length ? "Have you been taking your medications regularly without missing any doses?" : "When did the symptoms first start?";
        const options = summary.obstetricData ? [
            "28 Dec 2025 (as recorded)",
            "Different date",
            "Not sure — want USG dating"
        ] : summary.chronicConditions?.length ? [
            "Yes, fully compliant",
            "Missed a few doses",
            "Stopped some medications",
            "Changed doses on my own"
        ] : [
            "Less than a week ago",
            "1-2 weeks",
            "More than 2 weeks",
            "Gradual onset"
        ];
        return {
            text: "I need a bit more information to refine the recommendations.",
            rxOutput: {
                kind: "follow_up_question",
                data: {
                    question,
                    options,
                    multiSelect: false
                }
            }
        };
    }
    // === TEXT FACT ===
    if (normalized.includes("fact") || normalized.includes("quick fact") || normalized.includes("did you know")) {
        const isAsthma = (summary.chronicConditions || []).some((c)=>c.toLowerCase().includes("asthma"));
        const isPregnant = !!summary.obstetricData;
        const value = isAsthma && isPregnant ? "Uncontrolled asthma in pregnancy increases risk of preterm birth by 50%. Well-controlled asthma has outcomes comparable to non-asthmatic pregnancies." : isAsthma ? "Bronchial asthma affects 4.5% of Indian adults. Nocturnal symptoms indicate suboptimal control and warrant step-up therapy." : `Current clinical profile: ${summary.chronicConditions?.join(", ") || "No chronic conditions"}, ${summary.labFlagCount} lab flags, ${summary.followUpOverdueDays > 0 ? `follow-up overdue ${summary.followUpOverdueDays}d` : "follow-up on track"}.`;
        return {
            text: "Here's a relevant clinical fact.",
            rxOutput: {
                kind: "text_fact",
                data: {
                    value,
                    context: isAsthma ? "Asthma Management" : "Clinical Context",
                    source: isAsthma ? "GINA Guidelines 2025" : "Patient Records"
                }
            }
        };
    }
    // === TEXT STEPS / PROCEDURE ===
    if (normalized.includes("steps") || normalized.includes("step by step") || normalized.includes("procedure") || normalized.includes("how to")) {
        const isAsthma = (summary.chronicConditions || []).some((c)=>c.toLowerCase().includes("asthma"));
        const steps = isAsthma ? [
            "Assess symptom control: daytime symptoms, night waking, reliever use, activity limitation",
            "Classify control level: well-controlled / partly controlled / uncontrolled",
            "Check inhaler technique — correct common errors (not shaking, not holding breath)",
            "Review PEFR diary — target ≥80% of predicted",
            "Adjust therapy: step up if uncontrolled, maintain if controlled, step down after 3 months stable",
            "Schedule follow-up: 2-4 weeks after any medication change"
        ] : [
            "Review patient history and current medications",
            "Assess vital signs and flag any abnormalities",
            "Review recent lab results and pending investigations",
            "Formulate differential diagnosis based on presenting complaints",
            "Plan treatment: medications, investigations, and advice",
            "Set follow-up schedule and patient education"
        ];
        return {
            text: isAsthma ? "Here's a step-by-step asthma assessment protocol." : "Here's a step-by-step consultation workflow.",
            rxOutput: {
                kind: "text_step",
                data: {
                    steps
                }
            }
        };
    }
    // === TEXT QUOTE / CLINICAL REFERENCE ===
    if (normalized.includes("quote") || normalized.includes("clinical reference") || normalized.includes("reference")) {
        const isAsthma = (summary.chronicConditions || []).some((c)=>c.toLowerCase().includes("asthma"));
        return {
            text: "Here's a relevant clinical reference.",
            rxOutput: {
                kind: "text_quote",
                data: {
                    quote: isAsthma ? "Step-up therapy is recommended when symptoms are not well controlled on current treatment. Poorly controlled asthma carries greater risk than medication side effects." : "Clinical decision-making should integrate patient preferences, clinical expertise, and best available evidence.",
                    source: isAsthma ? "GINA 2025, Chapter 3: Treating to Control Symptoms" : "Evidence-Based Medicine Principles"
                }
            }
        };
    }
    // === TEXT COMPARISON (treatment options) ===
    if (normalized.includes("compare treatment") || normalized.includes("compare option") || normalized.includes("treatment comparison") || normalized.includes("drug comparison") || normalized.includes("vs") && !normalized.includes("visit")) {
        const isAsthma = (summary.chronicConditions || []).some((c)=>c.toLowerCase().includes("asthma"));
        return {
            text: isAsthma ? "Here's a comparison of asthma management approaches." : "Here's a comparison of treatment options.",
            rxOutput: {
                kind: "text_comparison",
                data: {
                    labelA: isAsthma ? "ICS Monotherapy" : "Option A",
                    labelB: isAsthma ? "ICS + LABA Combo" : "Option B",
                    itemsA: isAsthma ? [
                        "Budesonide 200mcg BD",
                        "Lower cost",
                        "First-line for mild-moderate",
                        "Step up if inadequate"
                    ] : [
                        "Standard approach",
                        "Well-established evidence",
                        "Lower complexity"
                    ],
                    itemsB: isAsthma ? [
                        "Budesonide/Formoterol 200/6mcg BD",
                        "Better symptom control",
                        "Preferred if ICS alone insufficient",
                        "Maintenance + reliever in one"
                    ] : [
                        "Advanced approach",
                        "May offer better outcomes",
                        "Higher complexity"
                    ]
                }
            }
        };
    }
    // === TEXT LIST ===
    if (normalized.includes("checklist") || normalized.includes("to-do list") || normalized.includes("action items") || normalized.includes("pending items")) {
        const items = [];
        if (summary.dueAlerts?.length) items.push(...summary.dueAlerts);
        if (summary.recordAlerts?.length) items.push(...summary.recordAlerts);
        if (summary.followUpOverdueDays > 0) items.push(`Follow-up overdue by ${summary.followUpOverdueDays} days`);
        if (summary.labFlagCount > 0) items.push(`${summary.labFlagCount} flagged lab values to review`);
        if (items.length === 0) items.push("No pending items — all caught up!");
        return {
            text: `Here are the pending action items — ${items.length} items to address.`,
            rxOutput: {
                kind: "text_list",
                data: {
                    items
                }
            }
        };
    }
    // === SUGGEST LAB TESTS → routes to investigation, not lab panel ===
    if (normalized.includes("suggest") && normalized.includes("lab") || normalized.includes("initial investigation") || normalized.includes("initial workup")) {
        const { title, items, labInvestigations } = buildInvestigations(summary);
        return {
            text: "These investigations might help clarify the clinical picture.",
            rxOutput: {
                kind: "investigation_bundle",
                data: {
                    title,
                    items,
                    copyPayload: {
                        sourceDateLabel: "Today",
                        targetSection: "rxpad",
                        labInvestigations
                    }
                }
            }
        };
    }
    // === LAB PANEL ===
    if (normalized.includes("lab") || normalized.includes("report") || normalized.includes("flag")) {
        if (!summary.keyLabs || summary.keyLabs.length === 0) {
            return {
                text: "No lab results available for this patient yet."
            };
        }
        const flaggedCount = summary.keyLabs.filter((l)=>l.flag).length;
        return {
            text: `I noticed ${flaggedCount} flagged values in the latest panel \u2014 here's a closer look.`,
            rxOutput: {
                kind: "lab_panel",
                data: {
                    panelDate: summary.lastVisit?.date || "Recent",
                    flagged: summary.keyLabs,
                    hiddenNormalCount: Math.max(0, 17 - summary.keyLabs.length)
                }
            },
            suggestions: [
                {
                    label: "Lab comparison",
                    message: "Lab comparison"
                },
                {
                    label: "Today's vitals",
                    message: "Today's vitals"
                },
                {
                    label: "Suggest investigations",
                    message: "Suggest investigations"
                }
            ]
        };
    }
    // === eGFR TREND (CKD-specific) ===
    if (normalized.includes("egfr trend") || normalized.includes("egfr")) {
        return {
            text: "Here's the eGFR trend over the past 12 months. The declining trajectory confirms CKD Stage 5 progression — Ramesh is now on maintenance dialysis.",
            rxOutput: {
                kind: "lab_trend",
                data: {
                    title: "eGFR Trend (12 months)",
                    parameterName: "eGFR",
                    series: [
                        {
                            label: "eGFR",
                            values: [
                                14,
                                12,
                                10,
                                9,
                                8,
                                7
                            ],
                            dates: [
                                "Apr'25",
                                "Jun'25",
                                "Aug'25",
                                "Oct'25",
                                "Dec'25",
                                "Feb'26"
                            ],
                            tone: "critical",
                            threshold: 15,
                            thresholdLabel: "Stage 5 <15",
                            unit: "mL/min/1.73m²"
                        }
                    ]
                }
            }
        };
    }
    // === LAB TREND (HbA1c, specific lab trends) ===
    if (normalized.includes("hba1c trend") || normalized.includes("lab trend") || normalized.includes("hba1c")) {
        return {
            text: "Here's the HbA1c trend over recent visits. Gradual improvement from 10.1% → 9.2% with current regimen, but still above target.",
            rxOutput: {
                kind: "lab_trend",
                data: {
                    title: "HbA1c Trend",
                    parameterName: "HbA1c",
                    series: [
                        {
                            label: "HbA1c",
                            values: [
                                10.1,
                                10.0,
                                9.4,
                                9.3,
                                9.2
                            ],
                            dates: [
                                "Jun'25",
                                "Aug'25",
                                "Oct'25",
                                "Dec'25",
                                "Feb'26"
                            ],
                            tone: "critical",
                            threshold: 6.5,
                            thresholdLabel: "Target <6.5%",
                            unit: "%"
                        }
                    ]
                }
            }
        };
    }
    // === VITAL TRENDS ===
    if (normalized.includes("vital") || normalized.includes("trend") || normalized.includes("bp") || normalized.includes("spo2") || normalized.includes("temperature") || normalized.includes("pulse")) {
        if (!summary.concernTrend && !summary.todayVitals) {
            return {
                text: "No vital signs recorded for this patient yet."
            };
        }
        const series = [];
        if (summary.concernTrend) {
            series.push({
                label: summary.concernTrend.label,
                values: summary.concernTrend.values,
                dates: summary.concernTrend.labels,
                tone: summary.concernTrend.tone === "red" ? "critical" : summary.concernTrend.tone === "amber" || summary.concernTrend.tone === "violet" ? "warn" : "ok",
                threshold: summary.concernTrend.label === "SpO\u2082" ? 95 : 140,
                thresholdLabel: summary.concernTrend.label === "SpO\u2082" ? "Normal \u226595%" : "140 mmHg",
                unit: summary.concernTrend.unit
            });
        }
        const useBar = false // Always use line graph for better visualization
        ;
        return {
            text: "Here's how the vitals have been trending over recent visits.",
            rxOutput: {
                kind: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "vitals_trend_line",
                data: {
                    title: "Vital Trends",
                    series
                }
            }
        };
    }
    // === DDX ===
    if (normalized.includes("ddx") || normalized.includes("differential") || normalized.includes("diagnosis") || normalized.includes("diagnose")) {
        const symptoms = summary.symptomCollectorData?.symptoms.map((s)=>s.name).join(", ") || summary.patientNarrative || "Symptoms";
        const context = `${symptoms} \u00B7 ${(summary.chronicConditions || []).join(", ")} \u00B7 ${(summary.allergies || []).join(", ")}`;
        return {
            text: "Based on the symptoms and history, here are some diagnostic considerations.",
            rxOutput: {
                kind: "ddx",
                data: {
                    context,
                    options: buildDDXOptions(summary)
                }
            }
        };
    }
    // === PROTOCOL MEDS ===
    if (normalized.includes("protocol") || normalized.includes("med") || normalized.includes("prescription") || normalized.includes("rx")) {
        const { diagnosis, meds, medications } = buildProtocolMeds(summary);
        return {
            text: `Here's a medication protocol suggestion for ${diagnosis} \u2014 please review and adjust as needed.`,
            rxOutput: {
                kind: "protocol_meds",
                data: {
                    diagnosis,
                    meds,
                    safetyCheck: summary.allergies && summary.allergies.length > 0 ? `Checked against allergies: ${summary.allergies.join(", ")}` : "\u2713 No allergy conflicts \u00B7 No interactions",
                    copyPayload: {
                        sourceDateLabel: "Today",
                        targetSection: "rxpad",
                        medications
                    }
                }
            }
        };
    }
    // === INVESTIGATIONS ===
    if (normalized.includes("investigation") || normalized.includes("test") || normalized.includes("order") || normalized.includes("workup")) {
        const { title, items, labInvestigations } = buildInvestigations(summary);
        return {
            text: "These investigations might help clarify the clinical picture.",
            rxOutput: {
                kind: "investigation_bundle",
                data: {
                    title,
                    items,
                    copyPayload: {
                        sourceDateLabel: "Today",
                        targetSection: "rxpad",
                        labInvestigations
                    }
                }
            }
        };
    }
    // === ADVICE ===
    if (normalized.includes("advice") || normalized.includes("counsel") || normalized.includes("advise")) {
        const { items, shareMessage, adviceCopy } = buildAdvice(summary);
        return {
            text: "I've drafted some advice points for this consultation.",
            rxOutput: {
                kind: "advice_bundle",
                data: {
                    title: "Advice",
                    items,
                    shareMessage,
                    copyPayload: {
                        sourceDateLabel: "Today",
                        targetSection: "rxpad",
                        advice: adviceCopy
                    }
                }
            }
        };
    }
    // === FOLLOW-UP ===
    if (normalized.includes("follow") || normalized.includes("f/u") || normalized.includes("schedule") || normalized.includes("next visit")) {
        const { context, options } = buildFollowUpOptions(summary);
        return {
            text: "Here's a follow-up recommendation based on the current status.",
            rxOutput: {
                kind: "follow_up",
                data: {
                    context,
                    options
                }
            }
        };
    }
    // === TRANSLATE ===
    if (normalized.includes("translate") || normalized.includes("hindi") || normalized.includes("telugu")) {
        const advice = summary.lastVisit?.advice || "Take medicines as prescribed. Rest well. Drink plenty of water. Follow up as scheduled.";
        const lang = normalized.includes("hindi") ? "Hindi" : normalized.includes("telugu") ? "Telugu" : "Hindi";
        return {
            text: `I've translated the advice into ${lang} for you.`,
            rxOutput: {
                kind: "translation",
                data: {
                    sourceLanguage: "English",
                    targetLanguage: lang,
                    sourceText: `Take Telma20 before food morning & night. Drink 3L water. Avoid oily food. Walk 30 min. Follow-up 5 days with CBC.`,
                    translatedText: lang === "Hindi" ? "Telma20 \u0938\u0941\u092C\u0939 \u0914\u0930 \u0930\u093E\u0924 \u0916\u093E\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0932\u0947\u0902\u0964 3L \u092A\u093E\u0928\u0940 \u092A\u093F\u090F\u0902\u0964 \u0924\u0932\u093E \u0916\u093E\u0928\u093E \u0928 \u0916\u093E\u090F\u0902\u0964 30 \u092E\u093F\u0928\u091F \u091A\u0932\u0947\u0902\u0964 5 \u0926\u093F\u0928 \u092C\u093E\u0926 CBC \u0915\u0930\u0935\u093E\u090F\u0902\u0964" : "Telma20 \u0C09\u0C26\u0C2F\u0C02, \u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F \u0C2D\u0C4B\u0C1C\u0C28\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C2E\u0C41\u0C02\u0C26\u0C41 \u0C24\u0C40\u0C38\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F. 3L \u0C28\u0C40\u0C30\u0C41 \u0C24\u0C3E\u0C17\u0C02\u0C21\u0C3F. 30 \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C3E\u0C32\u0C41 \u0C28\u0C21\u0C35\u0C02\u0C21\u0C3F.",
                    copyPayload: {
                        sourceDateLabel: "Today",
                        targetSection: "rxpad",
                        advice: lang === "Hindi" ? "Telma20 \u0938\u0941\u092C\u0939 \u0914\u0930 \u0930\u093E\u0924 \u0916\u093E\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0932\u0947\u0902\u0964 3L \u092A\u093E\u0928\u0940 \u092A\u093F\u090F\u0902\u0964 \u0924\u0932\u093E \u0916\u093E\u0928\u093E \u0928 \u0916\u093E\u090F\u0902\u0964 30 \u092E\u093F\u0928\u091F \u091A\u0932\u0947\u0902\u0964 5 \u0926\u093F\u0928 \u092C\u093E\u0926 CBC \u0915\u0930\u0935\u093E\u090F\u0902\u0964" : "Telma20 \u0C09\u0C26\u0C2F\u0C02, \u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F \u0C2D\u0C4B\u0C1C\u0C28\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C2E\u0C41\u0C02\u0C26\u0C41 \u0C24\u0C40\u0C38\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F."
                    }
                }
            }
        };
    }
    // === COMPLETENESS ===
    if (normalized.includes("completeness") || normalized.includes("checklist") || normalized.includes("missing")) {
        return {
            text: "Here's the documentation checklist \u2014 a few sections still need your input.",
            rxOutput: {
                kind: "completeness",
                data: {
                    sections: [
                        {
                            name: "Symptoms",
                            filled: true,
                            count: 2
                        },
                        {
                            name: "Diagnosis",
                            filled: true,
                            count: 1
                        },
                        {
                            name: "Med(Rx)",
                            filled: true,
                            count: 3
                        },
                        {
                            name: "Examination",
                            filled: false
                        },
                        {
                            name: "Lab Investigation",
                            filled: false
                        },
                        {
                            name: "Advice",
                            filled: false
                        },
                        {
                            name: "Follow Up",
                            filled: false
                        }
                    ],
                    emptyCount: 4
                }
            }
        };
    }
    // === COMPARE ===
    if (normalized.includes("compare") && summary.keyLabs && summary.keyLabs.length > 0) {
        return {
            text: "Here's a side-by-side comparison of the latest lab values with previous results.",
            rxOutput: {
                kind: "lab_comparison",
                data: {
                    rows: summary.keyLabs.slice(0, 5).map((lab)=>({
                            parameter: lab.name,
                            prevValue: String(Math.round(parseFloat(lab.value) * 0.92 * 10) / 10),
                            currValue: lab.value,
                            prevDate: "15 Dec",
                            currDate: "27 Jan",
                            delta: lab.flag === "high" ? `\u2191${(parseFloat(lab.value) * 0.08).toFixed(1)}` : `\u2193${(parseFloat(lab.value) * 0.08).toFixed(1)}`,
                            direction: lab.flag === "high" ? "up" : "down",
                            isFlagged: true
                        }))
                }
            }
        };
    }
    // === RECENT ER HISTORY ===
    if (normalized.includes("recent er") || normalized.includes("er history") || normalized.includes("emergency admission")) {
        return {
            text: "Here are Ramesh Kumar's recent emergency department visits.",
            rxOutput: {
                kind: "text_list",
                data: {
                    items: [
                        "**Dec 2025** — Hyperkalemia (K⁺ 6.8 mEq/L) with ECG changes. Emergency dialysis + IV calcium gluconate. Discharged after 48hrs.",
                        "**Oct 2025** — Acute pulmonary edema with fluid overload. Required urgent ultrafiltration. BP 198/112 on arrival. Stabilised and switched to higher-dose Torsemide."
                    ]
                }
            }
        };
    }
    // === ACTIVE MEDICATIONS (pill-triggered) ===
    if (normalized.includes("active medication") || normalized.includes("active med") || normalized.includes("current med")) {
        const meds = summary.activeMeds || [];
        if (meds.length === 0) {
            return {
                text: "No active medications recorded for this patient."
            };
        }
        return {
            text: `Here are the **${meds.length} active medications** for this patient.`,
            rxOutput: {
                kind: "text_list",
                data: {
                    items: meds
                }
            }
        };
    }
    // === KEY LABS (emergency pill) ===
    if (normalized === "key labs" || normalized.includes("key lab") && !normalized.includes("trend")) {
        const labs = summary.keyLabs || [];
        if (labs.length === 0) {
            return {
                text: "No lab results available for this patient."
            };
        }
        return {
            text: `Here are the **${labs.length} key lab values** for this patient.`,
            rxOutput: {
                kind: "text_list",
                data: {
                    items: labs.map((l)=>{
                        const flagIcon = l.flag === "critical" ? "🔴" : l.flag === "high" || l.flag === "low" ? "🟡" : "🟢";
                        return `${flagIcon} **${l.name}**: ${l.value}${l.unit ? ` ${l.unit}` : ""}${l.flag ? ` (${l.flag})` : ""}`;
                    })
                }
            }
        };
    }
    // === ALLERGY/SPO2 ALERTS ===
    if (normalized.includes("allergy") || normalized.includes("alert")) {
        if (summary.allergies && summary.allergies.length > 0) {
            return {
                text: `**${summary.allergies.length} allergies** on record for this patient. All prescriptions are automatically checked against this list before dispensing.`,
                rxOutput: {
                    kind: "text_alert",
                    data: {
                        severity: "high",
                        message: `Known allergens: **${summary.allergies.join("**, **")}**. Avoid prescribing medications containing these substances.`
                    }
                }
            };
        }
        return {
            text: "No allergies recorded for this patient."
        };
    }
    // === CHECK INTERACTIONS ===
    if (normalized.includes("interaction") || normalized.includes("check interaction")) {
        const meds = summary.symptomCollectorData?.currentMedications || [];
        if (meds.length >= 2) {
            return {
                text: `Checked **${meds.length} medications** for interactions, no critical conflicts found.`,
                rxOutput: {
                    kind: "drug_interaction",
                    data: {
                        drug1: meds[0]?.split(/\s+\d/)[0] || meds[0],
                        drug2: meds[1]?.split(/\s+\d/)[0] || meds[1],
                        severity: "moderate",
                        risk: "Both medications are metabolized via CYP3A4. Monitor for increased side effects.",
                        action: "No dose adjustment needed at current doses. Monitor renal function periodically."
                    }
                }
            };
        }
        return {
            text: "No significant drug interactions found for the current medication list."
        };
    }
    // === PRE-CONSULT PREP ===
    if (normalized.includes("pre-consult") || normalized.includes("preconsult")) {
        return {
            text: summary.specialtyTags.length > 0 ? `Pre-consult summary ready. Key points: ${summary.chronicConditions?.join(", ") || "No chronic conditions"}, ${summary.labFlagCount > 0 ? `${summary.labFlagCount} flagged labs` : "labs normal"}, ${summary.followUpOverdueDays > 0 ? `follow-up overdue ${summary.followUpOverdueDays}d` : "follow-up on track"}.` : "New patient, no prior data available for pre-consult prep. You can start by reviewing the intake form or asking for symptoms.",
            rxOutput: summary.specialtyTags.length > 0 ? {
                kind: "sbar_overview",
                data: summary
            } : undefined
        };
    }
    // === ASK ME ANYTHING / GENERIC ===
    if (normalized.includes("ask me anything") || normalized.includes("ask anything")) {
        return {
            text: summary.specialtyTags.length > 0 ? `I have access to ${summary.chronicConditions?.length || 0} chronic conditions, ${summary.keyLabs?.length || 0} lab values, and recent visit data. What would you like to know?` : "This is a new patient. I can help with differential diagnosis, suggest investigations, or review the intake data. What would you like?"
        };
    }
    // === DEFAULT — TEXT + SUGGESTION PILLS FOR LOW-CONFIDENCE QUERIES ===
    return {
        text: buildDefaultResponse(input, summary),
        suggestions: [
            {
                label: "Patient summary",
                message: "Patient summary"
            },
            {
                label: "Today's vitals",
                message: "Today's vitals"
            },
            {
                label: "Medical history",
                message: "Medical history"
            },
            {
                label: "Last visit",
                message: "Last visit details"
            }
        ]
    };
}
// === HELPERS ===
function buildLabInsight(labs) {
    if (!labs || labs.length === 0) return "";
    const highLabs = labs.filter((l)=>l.flag === "high").map((l)=>`${l.name}\u2191`);
    const lowLabs = labs.filter((l)=>l.flag === "low").map((l)=>`${l.name}\u2193`);
    const parts = [
        ...highLabs,
        ...lowLabs
    ];
    if (parts.length === 0) return "All values within normal range.";
    return `${parts.join(", ")} \u2014 correlate clinically.`;
}
function buildDDXOptions(summary) {
    const symptoms = summary.symptomCollectorData?.symptoms.map((s)=>s.name.toLowerCase()) || [];
    const hasFever = symptoms.some((s)=>s.includes("fever"));
    const hasCough = symptoms.some((s)=>s.includes("cough"));
    const hasKneePain = symptoms.some((s)=>s.includes("knee"));
    const hasStiffness = symptoms.some((s)=>s.includes("stiffness"));
    const hasHeadache = symptoms.some((s)=>s.includes("headache"));
    const hasFatigue = symptoms.some((s)=>s.includes("fatigue"));
    const hasBleeding = symptoms.some((s)=>s.includes("bleeding") || s.includes("menstrual"));
    // Musculoskeletal — Ramesh M pattern (knee pain + morning stiffness)
    if (hasKneePain || hasStiffness) {
        return [
            {
                name: "Rheumatoid Arthritis",
                bucket: "cant_miss"
            },
            {
                name: "Septic Arthritis",
                bucket: "cant_miss"
            },
            {
                name: "Osteoarthritis",
                bucket: "most_likely"
            },
            {
                name: "Mechanical Knee Injury (meniscal)",
                bucket: "most_likely"
            },
            {
                name: "Gout / Pseudogout",
                bucket: "consider"
            },
            {
                name: "Reactive Arthritis",
                bucket: "consider"
            }
        ];
    }
    // Obstetric — check for asthma-in-pregnancy (Neha) vs generic obstetric (Priya)
    if (summary.obstetricData) {
        const chronicLower = (summary.chronicConditions || []).map((c)=>c.toLowerCase());
        const hasAsthma = chronicLower.some((c)=>c.includes("asthma"));
        if (hasAsthma) {
            // Asthma in pregnancy — Neha Gupta pattern
            return [
                {
                    name: "Acute severe asthma in pregnancy",
                    bucket: "cant_miss"
                },
                {
                    name: "Pre-eclampsia (with respiratory overlay)",
                    bucket: "cant_miss"
                },
                {
                    name: "Asthma exacerbation (seasonal/allergic)",
                    bucket: "most_likely"
                },
                {
                    name: "Allergic bronchitis in pregnancy",
                    bucket: "most_likely"
                },
                {
                    name: "GERD-related cough (pregnancy)",
                    bucket: "consider"
                },
                {
                    name: "Pulmonary embolism",
                    bucket: "consider"
                }
            ];
        }
        // Priya Rao pattern (edema + pregnancy)
        return [
            {
                name: "Pre-eclampsia",
                bucket: "cant_miss"
            },
            {
                name: "Deep Vein Thrombosis",
                bucket: "cant_miss"
            },
            {
                name: "Physiological edema of pregnancy",
                bucket: "most_likely"
            },
            {
                name: "Lumbar strain (pregnancy-related)",
                bucket: "most_likely"
            },
            {
                name: "Renal pathology",
                bucket: "consider"
            }
        ];
    }
    // Gynec — Lakshmi K pattern (heavy bleeding + fatigue)
    if (hasBleeding) {
        return [
            {
                name: "Endometrial carcinoma",
                bucket: "cant_miss"
            },
            {
                name: "AUB (Ovulatory dysfunction)",
                bucket: "most_likely"
            },
            {
                name: "Uterine fibroids",
                bucket: "most_likely"
            },
            {
                name: "Coagulopathy",
                bucket: "consider"
            },
            {
                name: "Thyroid-related AUB",
                bucket: "consider"
            }
        ];
    }
    // Headache — Anjali Patel pattern (headache + photophobia)
    if (hasHeadache) {
        return [
            {
                name: "Subarachnoid Hemorrhage",
                bucket: "cant_miss"
            },
            {
                name: "Migraine without aura",
                bucket: "most_likely"
            },
            {
                name: "Tension-type headache",
                bucket: "most_likely"
            },
            {
                name: "Cluster headache",
                bucket: "consider"
            },
            {
                name: "Digital eye strain headache",
                bucket: "consider"
            }
        ];
    }
    // Pediatric — Arjun S pattern (cough + reduced appetite)
    if (summary.pediatricsData) {
        return [
            {
                name: "Pertussis (Whooping cough)",
                bucket: "cant_miss"
            },
            {
                name: "Recurrent reactive airways",
                bucket: "most_likely"
            },
            {
                name: "Post-nasal drip cough",
                bucket: "most_likely"
            },
            {
                name: "Foreign body aspiration",
                bucket: "consider"
            },
            {
                name: "Tuberculosis exposure",
                bucket: "consider"
            }
        ];
    }
    // Fatigue — Vikram Singh pattern (fatigue + poor sleep + metabolic)
    if (hasFatigue) {
        return [
            {
                name: "Obstructive Sleep Apnea",
                bucket: "cant_miss"
            },
            {
                name: "Metabolic syndrome fatigue",
                bucket: "most_likely"
            },
            {
                name: "Subclinical hypothyroidism",
                bucket: "most_likely"
            },
            {
                name: "Depression / Anxiety",
                bucket: "consider"
            },
            {
                name: "Cardiac insufficiency",
                bucket: "consider"
            }
        ];
    }
    // Fever — Shyam GR pattern (fever + cough + DM/HTN)
    if (hasFever) {
        return [
            {
                name: "Dengue Fever",
                bucket: "cant_miss"
            },
            {
                name: "Leptospirosis",
                bucket: "cant_miss"
            },
            {
                name: "Viral Fever",
                bucket: "most_likely"
            },
            {
                name: hasCough ? "URTI with Viral Fever" : "Bacterial Infection",
                bucket: "most_likely"
            },
            {
                name: "Allergic Reaction",
                bucket: "consider"
            },
            {
                name: "Drug Reaction",
                bucket: "consider"
            }
        ];
    }
    // Chronic-condition-based detection (when no symptomCollectorData)
    const chronicLower = (summary.chronicConditions || []).map((c)=>c.toLowerCase());
    const hasChronicAsthma = chronicLower.some((c)=>c.includes("asthma"));
    const hasChronicThyroid = chronicLower.some((c)=>c.includes("thyroid"));
    if (hasChronicAsthma) {
        return [
            {
                name: "Acute severe asthma",
                bucket: "cant_miss"
            },
            {
                name: "Pneumonia",
                bucket: "cant_miss"
            },
            {
                name: "Acute exacerbation of bronchial asthma",
                bucket: "most_likely"
            },
            {
                name: "Allergic bronchitis",
                bucket: "most_likely"
            },
            {
                name: "GERD-related cough",
                bucket: "consider"
            },
            {
                name: hasChronicThyroid ? "Thyroid-related respiratory symptoms" : "Cardiac wheeze",
                bucket: "consider"
            }
        ];
    }
    return [
        {
            name: "Primary diagnosis",
            bucket: "most_likely"
        },
        {
            name: "Secondary consideration",
            bucket: "consider"
        }
    ];
}
function buildDefaultResponse(input, summary) {
    if (summary.specialtyTags.length === 0) {
        return "This patient is new \u2014 you can start by adding history, uploading reports, or just ask me anything.";
    }
    return "Sorry, I couldn't help you with that at the moment. You can ask me about patient summaries, vitals, medical history, or past visits, or try the quick-action pills below to get started.";
}
function buildProtocolMeds(summary) {
    const symptoms = summary.symptomCollectorData?.symptoms.map((s)=>s.name.toLowerCase()) || [];
    const hasKneePain = symptoms.some((s)=>s.includes("knee"));
    const hasHeadache = symptoms.some((s)=>s.includes("headache"));
    const hasFatigue = symptoms.some((s)=>s.includes("fatigue"));
    const hasBleeding = symptoms.some((s)=>s.includes("bleeding") || s.includes("menstrual"));
    // Musculoskeletal (Ramesh M)
    if (hasKneePain) {
        return {
            diagnosis: "Osteoarthritis, Right Knee",
            meds: [
                {
                    name: "Paracetamol 500mg",
                    dosage: "500mg",
                    timing: "1-0-0-1",
                    duration: "7d",
                    notes: "For pain relief"
                },
                {
                    name: "Diclofenac 50mg",
                    dosage: "50mg",
                    timing: "0-1-0-1",
                    duration: "5d",
                    notes: "After food only"
                },
                {
                    name: "Pantoprazole 40mg",
                    dosage: "40mg",
                    timing: "1-0-0-0",
                    duration: "7d",
                    notes: "Gastric cover (BF)"
                },
                {
                    name: "Calcium 500mg",
                    dosage: "500mg",
                    timing: "0-0-0-1",
                    duration: "30d",
                    notes: "Continue current"
                }
            ],
            medications: [
                {
                    medicine: "Paracetamol 500mg",
                    unitPerDose: "1",
                    frequency: "1-0-0-1",
                    when: "AF",
                    duration: "7d",
                    note: "For pain"
                },
                {
                    medicine: "Diclofenac 50mg",
                    unitPerDose: "1",
                    frequency: "0-1-0-1",
                    when: "AF",
                    duration: "5d",
                    note: ""
                },
                {
                    medicine: "Pantoprazole 40mg",
                    unitPerDose: "1",
                    frequency: "1-0-0-0",
                    when: "BF",
                    duration: "7d",
                    note: "Gastric cover"
                },
                {
                    medicine: "Calcium 500mg",
                    unitPerDose: "1",
                    frequency: "0-0-0-1",
                    when: "AF",
                    duration: "30d",
                    note: "Continue"
                }
            ]
        };
    }
    // Obstetric — differentiate asthma-in-pregnancy (Neha) vs generic ANC (Priya)
    if (summary.obstetricData) {
        const chronicLower = (summary.chronicConditions || []).map((c)=>c.toLowerCase());
        const hasAsthma = chronicLower.some((c)=>c.includes("asthma"));
        if (hasAsthma) {
            // Neha Gupta — asthma + pregnancy + hypothyroid
            return {
                diagnosis: `Bronchial asthma in pregnancy (${summary.obstetricData.gestationalWeeks || "early"}), Hypothyroid on Rx`,
                meds: [
                    {
                        name: "Budesonide 200mcg",
                        dosage: "200mcg",
                        timing: "1-0-0-1",
                        duration: "Cont.",
                        notes: "Category B — safe in pregnancy"
                    },
                    {
                        name: "Salbutamol MDI",
                        dosage: "200mcg",
                        timing: "SOS",
                        duration: "SOS",
                        notes: "Rescue inhaler"
                    },
                    {
                        name: "Thyronorm 75mcg",
                        dosage: "75mcg",
                        timing: "1-0-0-0",
                        duration: "Cont.",
                        notes: "Increase dose in pregnancy"
                    },
                    {
                        name: "Folic Acid 5mg",
                        dosage: "5mg",
                        timing: "1-0-0-0",
                        duration: "Cont."
                    },
                    {
                        name: "Ferrous Fumarate 200mg",
                        dosage: "200mg",
                        timing: "0-1-0-0",
                        duration: "Cont.",
                        notes: "Hb 10.8 — needs correction"
                    }
                ],
                medications: [
                    {
                        medicine: "Budesonide 200mcg",
                        unitPerDose: "1 puff",
                        frequency: "1-0-0-1",
                        when: "",
                        duration: "Cont.",
                        note: "Cat B safe"
                    },
                    {
                        medicine: "Salbutamol MDI 200mcg",
                        unitPerDose: "2 puffs",
                        frequency: "SOS",
                        when: "",
                        duration: "SOS",
                        note: "Rescue"
                    },
                    {
                        medicine: "Thyronorm 75mcg",
                        unitPerDose: "1",
                        frequency: "1-0-0-0",
                        when: "BF",
                        duration: "Cont.",
                        note: "↑ dose"
                    },
                    {
                        medicine: "Folic Acid 5mg",
                        unitPerDose: "1",
                        frequency: "1-0-0-0",
                        when: "AF",
                        duration: "Cont.",
                        note: ""
                    },
                    {
                        medicine: "Ferrous Fumarate 200mg",
                        unitPerDose: "1",
                        frequency: "0-1-0-0",
                        when: "AF",
                        duration: "Cont.",
                        note: "Anemia"
                    }
                ]
            };
        }
        // Priya Rao — generic ANC pattern
        return {
            diagnosis: `ANC ${summary.obstetricData.gestationalWeeks || ""}, Hypothyroid on Rx, Pedal Edema`,
            meds: [
                {
                    name: "Thyronorm 50mcg",
                    dosage: "50mcg",
                    timing: "1-0-0-0",
                    duration: "Cont.",
                    notes: "BF, empty stomach"
                },
                {
                    name: "Folic Acid 5mg",
                    dosage: "5mg",
                    timing: "1-0-0-0",
                    duration: "Cont."
                },
                {
                    name: "Iron + Folic",
                    dosage: "1 tab",
                    timing: "0-1-0-0",
                    duration: "Cont.",
                    notes: "After food"
                },
                {
                    name: "Calcium 500mg",
                    dosage: "500mg",
                    timing: "0-1-0-1",
                    duration: "Cont."
                }
            ],
            medications: [
                {
                    medicine: "Thyronorm 50mcg",
                    unitPerDose: "1",
                    frequency: "1-0-0-0",
                    when: "BF",
                    duration: "Cont.",
                    note: "Empty stomach"
                },
                {
                    medicine: "Folic Acid 5mg",
                    unitPerDose: "1",
                    frequency: "1-0-0-0",
                    when: "AF",
                    duration: "Cont.",
                    note: ""
                },
                {
                    medicine: "Iron + Folic",
                    unitPerDose: "1",
                    frequency: "0-1-0-0",
                    when: "AF",
                    duration: "Cont.",
                    note: ""
                },
                {
                    medicine: "Calcium 500mg",
                    unitPerDose: "1",
                    frequency: "0-1-0-1",
                    when: "AF",
                    duration: "Cont.",
                    note: ""
                }
            ]
        };
    }
    // Gynec / bleeding (Lakshmi K)
    if (hasBleeding) {
        return {
            diagnosis: "AUB-Ovulatory dysfunction, Iron deficiency anemia, Hypothyroid",
            meds: [
                {
                    name: "Thyronorm 75mcg",
                    dosage: "75mcg",
                    timing: "1-0-0-0",
                    duration: "Cont.",
                    notes: "BF, empty stomach"
                },
                {
                    name: "Autrin capsule",
                    dosage: "1 cap",
                    timing: "0-1-0-0",
                    duration: "30d",
                    notes: "After food"
                },
                {
                    name: "Tranexamic acid 500mg",
                    dosage: "500mg",
                    timing: "1-1-1-0",
                    duration: "During flow",
                    notes: "Max 5 days"
                },
                {
                    name: "Vitamin C 500mg",
                    dosage: "500mg",
                    timing: "0-1-0-0",
                    duration: "30d",
                    notes: "Aids iron absorption"
                }
            ],
            medications: [
                {
                    medicine: "Thyronorm 75mcg",
                    unitPerDose: "1",
                    frequency: "1-0-0-0",
                    when: "BF",
                    duration: "Cont.",
                    note: "Empty stomach"
                },
                {
                    medicine: "Autrin capsule",
                    unitPerDose: "1",
                    frequency: "0-1-0-0",
                    when: "AF",
                    duration: "30d",
                    note: ""
                },
                {
                    medicine: "Tranexamic acid 500mg",
                    unitPerDose: "1",
                    frequency: "1-1-1-0",
                    when: "AF",
                    duration: "During flow",
                    note: "Max 5d"
                },
                {
                    medicine: "Vitamin C 500mg",
                    unitPerDose: "1",
                    frequency: "0-1-0-0",
                    when: "AF",
                    duration: "30d",
                    note: ""
                }
            ]
        };
    }
    // Migraine (Anjali Patel)
    if (hasHeadache) {
        return {
            diagnosis: "Migraine without aura, Vitamin D deficiency",
            meds: [
                {
                    name: "Sumatriptan 50mg",
                    dosage: "50mg",
                    timing: "SOS",
                    duration: "SOS",
                    notes: "Max 2 tabs/day"
                },
                {
                    name: "Naproxen 250mg",
                    dosage: "250mg",
                    timing: "1-0-0-1",
                    duration: "5d",
                    notes: "SOS for headache"
                },
                {
                    name: "Vitamin D3 60K",
                    dosage: "60K IU",
                    timing: "Once weekly",
                    duration: "8wk"
                },
                {
                    name: "Amitriptyline 10mg",
                    dosage: "10mg",
                    timing: "0-0-0-1",
                    duration: "30d",
                    notes: "Migraine prophylaxis"
                }
            ],
            medications: [
                {
                    medicine: "Sumatriptan 50mg",
                    unitPerDose: "1",
                    frequency: "SOS",
                    when: "",
                    duration: "SOS",
                    note: "Max 2/day"
                },
                {
                    medicine: "Naproxen 250mg",
                    unitPerDose: "1",
                    frequency: "1-0-0-1",
                    when: "AF",
                    duration: "5d",
                    note: "SOS"
                },
                {
                    medicine: "Vitamin D3 60K",
                    unitPerDose: "1",
                    frequency: "Once weekly",
                    when: "",
                    duration: "8wk",
                    note: ""
                },
                {
                    medicine: "Amitriptyline 10mg",
                    unitPerDose: "1",
                    frequency: "0-0-0-1",
                    when: "AF",
                    duration: "30d",
                    note: "Prophylaxis"
                }
            ]
        };
    }
    // Pediatric (Arjun S)
    if (summary.pediatricsData) {
        return {
            diagnosis: "Recurrent reactive airways, Reduced appetite",
            meds: [
                {
                    name: "Salbutamol syrup",
                    dosage: "2ml",
                    timing: "1-1-1-0",
                    duration: "5d",
                    notes: "If wheeze"
                },
                {
                    name: "Cetirizine syrup",
                    dosage: "2.5ml",
                    timing: "0-0-0-1",
                    duration: "5d"
                },
                {
                    name: "Honey + warm water",
                    dosage: "1 tsp",
                    timing: "0-0-0-1",
                    duration: "5d",
                    notes: "Cough soother"
                },
                {
                    name: "Multivitamin syrup",
                    dosage: "5ml",
                    timing: "0-1-0-0",
                    duration: "30d",
                    notes: "Appetite booster"
                }
            ],
            medications: [
                {
                    medicine: "Salbutamol syrup 2ml",
                    unitPerDose: "2ml",
                    frequency: "1-1-1-0",
                    when: "",
                    duration: "5d",
                    note: "If wheeze"
                },
                {
                    medicine: "Cetirizine syrup 2.5ml",
                    unitPerDose: "2.5ml",
                    frequency: "0-0-0-1",
                    when: "",
                    duration: "5d",
                    note: ""
                },
                {
                    medicine: "Honey + warm water 1 tsp",
                    unitPerDose: "1 tsp",
                    frequency: "0-0-0-1",
                    when: "",
                    duration: "5d",
                    note: ""
                },
                {
                    medicine: "Multivitamin syrup 5ml",
                    unitPerDose: "5ml",
                    frequency: "0-1-0-0",
                    when: "",
                    duration: "30d",
                    note: ""
                }
            ]
        };
    }
    // Fatigue/metabolic (Vikram Singh)
    if (hasFatigue) {
        return {
            diagnosis: "Fatigue syndrome, HTN Stage I, Dyslipidemia",
            meds: [
                {
                    name: "Telma 40mg",
                    dosage: "40mg",
                    timing: "1-0-0-0",
                    duration: "Cont.",
                    notes: "BF (continue)"
                },
                {
                    name: "Rosuvastatin 10mg",
                    dosage: "10mg",
                    timing: "0-0-0-1",
                    duration: "Cont.",
                    notes: "Bedtime (continue)"
                },
                {
                    name: "CoQ10 100mg",
                    dosage: "100mg",
                    timing: "0-0-0-1",
                    duration: "30d",
                    notes: "Fatigue support"
                },
                {
                    name: "Melatonin 3mg",
                    dosage: "3mg",
                    timing: "0-0-0-1",
                    duration: "14d",
                    notes: "30 min before bed"
                }
            ],
            medications: [
                {
                    medicine: "Telma 40mg",
                    unitPerDose: "1",
                    frequency: "1-0-0-0",
                    when: "BF",
                    duration: "Cont.",
                    note: "Continue"
                },
                {
                    medicine: "Rosuvastatin 10mg",
                    unitPerDose: "1",
                    frequency: "0-0-0-1",
                    when: "AF",
                    duration: "Cont.",
                    note: "Bedtime"
                },
                {
                    medicine: "CoQ10 100mg",
                    unitPerDose: "1",
                    frequency: "0-0-0-1",
                    when: "AF",
                    duration: "30d",
                    note: ""
                },
                {
                    medicine: "Melatonin 3mg",
                    unitPerDose: "1",
                    frequency: "0-0-0-1",
                    when: "",
                    duration: "14d",
                    note: "30min before bed"
                }
            ]
        };
    }
    // Asthma pattern (chronic condition — Neha without symptomCollectorData)
    const chronicLower2 = (summary.chronicConditions || []).map((c)=>c.toLowerCase());
    if (chronicLower2.some((c)=>c.includes("asthma"))) {
        return {
            diagnosis: "Bronchial asthma (exacerbation), Hypothyroid on Rx",
            meds: [
                {
                    name: "Budesonide 200mcg",
                    dosage: "200mcg",
                    timing: "1-0-0-1",
                    duration: "Cont.",
                    notes: "ICS controller"
                },
                {
                    name: "Montelukast 10mg",
                    dosage: "10mg",
                    timing: "0-0-0-1",
                    duration: "Cont.",
                    notes: "LTRA"
                },
                {
                    name: "Salbutamol MDI",
                    dosage: "200mcg",
                    timing: "SOS",
                    duration: "SOS",
                    notes: "Rescue inhaler"
                },
                {
                    name: "Thyronorm 50mcg",
                    dosage: "50mcg",
                    timing: "1-0-0-0",
                    duration: "Cont.",
                    notes: "BF empty stomach"
                }
            ],
            medications: [
                {
                    medicine: "Budesonide 200mcg",
                    unitPerDose: "1 puff",
                    frequency: "1-0-0-1",
                    when: "",
                    duration: "Cont.",
                    note: "ICS"
                },
                {
                    medicine: "Montelukast 10mg",
                    unitPerDose: "1",
                    frequency: "0-0-0-1",
                    when: "AF",
                    duration: "Cont.",
                    note: ""
                },
                {
                    medicine: "Salbutamol MDI 200mcg",
                    unitPerDose: "2 puffs",
                    frequency: "SOS",
                    when: "",
                    duration: "SOS",
                    note: "Rescue"
                },
                {
                    medicine: "Thyronorm 50mcg",
                    unitPerDose: "1",
                    frequency: "1-0-0-0",
                    when: "BF",
                    duration: "Cont.",
                    note: ""
                }
            ]
        };
    }
    // Default (Shyam GR / fever pattern)
    const dx = summary.lastVisit?.diagnosis || "Current diagnosis";
    return {
        diagnosis: dx,
        meds: [
            {
                name: "Paracetamol 650mg",
                dosage: "650mg",
                timing: "1-0-0-1",
                duration: "5d",
                notes: "SOS if fever>100\u00B0F"
            },
            {
                name: "Cetirizine 10mg",
                dosage: "10mg",
                timing: "0-0-0-1",
                duration: "5d"
            },
            {
                name: "Pantoprazole 40mg",
                dosage: "40mg",
                timing: "1-0-0-0",
                duration: "5d",
                notes: "BF"
            }
        ],
        medications: [
            {
                medicine: "Paracetamol 650mg",
                unitPerDose: "1",
                frequency: "1-0-0-1",
                when: "AF",
                duration: "5d",
                note: "SOS"
            },
            {
                medicine: "Cetirizine 10mg",
                unitPerDose: "1",
                frequency: "0-0-0-1",
                when: "AF",
                duration: "5d",
                note: ""
            },
            {
                medicine: "Pantoprazole 40mg",
                unitPerDose: "1",
                frequency: "1-0-0-0",
                when: "BF",
                duration: "5d",
                note: ""
            }
        ]
    };
}
function buildInvestigations(summary) {
    const symptoms = summary.symptomCollectorData?.symptoms.map((s)=>s.name.toLowerCase()) || [];
    const hasKneePain = symptoms.some((s)=>s.includes("knee"));
    const hasHeadache = symptoms.some((s)=>s.includes("headache"));
    const hasFatigue = symptoms.some((s)=>s.includes("fatigue"));
    const hasBleeding = symptoms.some((s)=>s.includes("bleeding") || s.includes("menstrual"));
    if (hasKneePain) {
        const items = [
            {
                name: "X-ray Both Knees AP/LAT",
                rationale: "Joint space assessment",
                selected: true
            },
            {
                name: "CBC",
                rationale: "Baseline + infection screening",
                selected: true
            },
            {
                name: "ESR",
                rationale: "Inflammatory marker",
                selected: true
            },
            {
                name: "CRP",
                rationale: "Acute inflammation",
                selected: true
            },
            {
                name: "Uric Acid",
                rationale: "Rule out gout",
                selected: true
            },
            {
                name: "RA Factor",
                rationale: "Rule out RA (morning stiffness)",
                selected: false
            },
            {
                name: "Serum Vitamin D",
                rationale: "Known deficiency context",
                selected: false
            }
        ];
        return {
            title: "Investigations \u2014 Knee Pain Workup",
            items,
            labInvestigations: items.filter((i)=>i.selected).map((i)=>i.name)
        };
    }
    if (summary.obstetricData) {
        const items = [
            {
                name: "BP Chart (4-hourly)",
                rationale: "Pre-eclampsia monitoring",
                selected: true
            },
            {
                name: "24hr Urine Protein",
                rationale: "If BP rises above 140/90",
                selected: true
            },
            {
                name: "NST (Non-stress test)",
                rationale: "Fetal wellbeing at 38wk",
                selected: true
            },
            {
                name: "TSH",
                rationale: "Thyroid recheck (on Thyronorm)",
                selected: true
            },
            {
                name: "CBC",
                rationale: "Hb monitoring (last 11.2 g/dL)",
                selected: true
            },
            {
                name: "USG Doppler",
                rationale: "If edema worsens",
                selected: false
            }
        ];
        return {
            title: "Investigations \u2014 ANC 38wk",
            items,
            labInvestigations: items.filter((i)=>i.selected).map((i)=>i.name)
        };
    }
    if (hasBleeding) {
        const items = [
            {
                name: "USG Pelvis",
                rationale: "Endometrial thickness + ovarian eval",
                selected: true
            },
            {
                name: "Pap Smear",
                rationale: "Overdue >1 year",
                selected: true
            },
            {
                name: "CBC",
                rationale: "Hb monitoring (last 9.2 g/dL)",
                selected: true
            },
            {
                name: "Iron Studies",
                rationale: "Serum ferritin + TIBC",
                selected: true
            },
            {
                name: "Thyroid Panel",
                rationale: "TSH + Free T4 (on Thyronorm)",
                selected: true
            },
            {
                name: "Endometrial Biopsy",
                rationale: "If USG shows thickened endometrium",
                selected: false
            }
        ];
        return {
            title: "Investigations \u2014 AUB Workup",
            items,
            labInvestigations: items.filter((i)=>i.selected).map((i)=>i.name)
        };
    }
    if (hasHeadache) {
        const items = [
            {
                name: "Vitamin D",
                rationale: "Known deficiency (last 18 ng/mL)",
                selected: true
            },
            {
                name: "Vitamin B12",
                rationale: "Neurological screening",
                selected: true
            },
            {
                name: "CBC",
                rationale: "Baseline assessment",
                selected: true
            },
            {
                name: "Thyroid Panel",
                rationale: "Rule out thyroid-related headache",
                selected: false
            },
            {
                name: "MRI Brain",
                rationale: "If refractory to treatment",
                selected: false
            }
        ];
        return {
            title: "Investigations \u2014 Migraine Workup",
            items,
            labInvestigations: items.filter((i)=>i.selected).map((i)=>i.name)
        };
    }
    if (summary.pediatricsData) {
        const items = [
            {
                name: "CBC",
                rationale: "Infection screening + Hb check",
                selected: true
            },
            {
                name: "Chest X-ray",
                rationale: "If wheeze persists >5d",
                selected: false
            },
            {
                name: "IgE levels",
                rationale: "Allergy screening (family hx asthma)",
                selected: false
            },
            {
                name: "Speech & Language Assessment",
                rationale: "Developmental concern noted",
                selected: true
            }
        ];
        return {
            title: "Investigations \u2014 Pediatric Workup",
            items,
            labInvestigations: items.filter((i)=>i.selected).map((i)=>i.name)
        };
    }
    if (hasFatigue) {
        const items = [
            {
                name: "ECG",
                rationale: "Cardiac screening (pending)",
                selected: true
            },
            {
                name: "Lipid Panel",
                rationale: "Recheck overdue",
                selected: true
            },
            {
                name: "HbA1c",
                rationale: "Pre-diabetes monitoring (last 6.2%)",
                selected: true
            },
            {
                name: "TSH",
                rationale: "Rule out hypothyroidism",
                selected: true
            },
            {
                name: "Sleep Study Referral",
                rationale: "If sleep issues persist",
                selected: false
            },
            {
                name: "Vitamin D + B12",
                rationale: "Fatigue workup",
                selected: false
            }
        ];
        return {
            title: "Investigations \u2014 Fatigue + Metabolic Workup",
            items,
            labInvestigations: items.filter((i)=>i.selected).map((i)=>i.name)
        };
    }
    // Asthma + Thyroid pattern (Neha — chronic conditions without symptomCollectorData)
    const chronicLower3 = (summary.chronicConditions || []).map((c)=>c.toLowerCase());
    const hasChronicAsthma3 = chronicLower3.some((c)=>c.includes("asthma"));
    const isPregnant3 = !!summary.obstetricData;
    if (hasChronicAsthma3) {
        const items = [
            {
                name: "PEFR (Peak Expiratory Flow)",
                rationale: "Asthma control assessment",
                selected: true
            },
            {
                name: "TSH",
                rationale: "Thyroid monitoring (last 5.2 mIU/L)",
                selected: true
            },
            {
                name: "CBC",
                rationale: "Hb check (last 10.8 g/dL)",
                selected: true
            },
            {
                name: "IgE levels",
                rationale: "Allergy quantification (last 380)",
                selected: true
            },
            {
                name: "Serum Vitamin D",
                rationale: "Known deficiency (last 16 ng/mL)",
                selected: true
            },
            ...isPregnant3 ? [
                {
                    name: "NT Scan (11-14wk)",
                    rationale: "First trimester screening",
                    selected: true
                },
                {
                    name: "Fasting Blood Sugar",
                    rationale: "GDM screening (PCOS history)",
                    selected: true
                },
                {
                    name: "Beta hCG + PAPP-A",
                    rationale: "Combined first trimester screen",
                    selected: false
                }
            ] : [
                {
                    name: "Chest X-ray (PA view)",
                    rationale: "If persistent wheeze",
                    selected: false
                },
                {
                    name: "Spirometry",
                    rationale: "Detailed pulmonary function",
                    selected: false
                }
            ]
        ];
        return {
            title: isPregnant3 ? "Investigations — Asthma in Pregnancy" : "Investigations — Asthma Workup",
            items,
            labInvestigations: items.filter((i)=>i.selected).map((i)=>i.name)
        };
    }
    // Default (fever pattern)
    const items = [
        {
            name: "CBC",
            rationale: "Infection screening",
            selected: true
        },
        {
            name: "CRP",
            rationale: "Inflammation marker",
            selected: true
        },
        {
            name: "LFT",
            rationale: "Dengue rule-out",
            selected: true
        },
        {
            name: "Dengue NS1",
            rationale: "Endemic area",
            selected: true
        },
        {
            name: "Blood Culture",
            rationale: "If persistent fever",
            selected: false
        },
        {
            name: "Chest X-ray",
            rationale: "If cough >5d",
            selected: false
        }
    ];
    return {
        title: "Investigations",
        items,
        labInvestigations: items.filter((i)=>i.selected).map((i)=>i.name)
    };
}
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 PER-PATIENT ADVICE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function buildAdvice(summary) {
    const symptoms = summary.symptomCollectorData?.symptoms.map((s)=>s.name.toLowerCase()) || [];
    const hasKneePain = symptoms.some((s)=>s.includes("knee"));
    const hasHeadache = symptoms.some((s)=>s.includes("headache"));
    const hasFatigue = symptoms.some((s)=>s.includes("fatigue"));
    const hasBleeding = symptoms.some((s)=>s.includes("bleeding") || s.includes("menstrual"));
    if (hasKneePain) {
        const items = [
            "Rest the affected knee \u2014 avoid climbing stairs and squatting",
            "Apply ice pack on knee for 15 min, 3 times a day",
            "Calcium-rich diet (milk, curd, ragi, leafy greens)",
            "Continue Vitamin D3 as prescribed",
            "Avoid Sulfonamide-containing medications (known allergy)",
            "Return with X-ray report in 1 week"
        ];
        return {
            items,
            shareMessage: "Rest knee. Ice 15min TDS. Calcium-rich diet. Continue Vitamin D3. Avoid Sulfonamides. Return in 1 week with X-ray.",
            adviceCopy: items.join(". ")
        };
    }
    if (summary.obstetricData) {
        const items = [
            "Left lateral sleeping position \u2014 reduces edema",
            "Keep legs elevated when sitting",
            "Adequate hydration (3L/day)",
            "Monitor fetal kick count \u2014 report if <10 kicks in 2 hours",
            "Report immediately: severe headache, visual changes, sudden swelling, reduced fetal movement",
            "Continue all prescribed medications",
            "Hospital bag ready \u2014 EDD approaching"
        ];
        return {
            items,
            shareMessage: "Sleep on left side. Elevate legs. Drink 3L water. Count baby kicks. Report headache/swelling/reduced movement. Keep hospital bag ready.",
            adviceCopy: items.join(". ")
        };
    }
    if (hasBleeding) {
        const items = [
            "Iron-rich diet: spinach, beetroot, dates, jaggery, red meat",
            "Take Vitamin C with iron \u2014 aids absorption",
            "AVOID Ibuprofen (known allergy) \u2014 use Paracetamol if needed",
            "Track cycle and flow (pads/day) in diary",
            "Report if soaking >1 pad/hour or passing large clots",
            "Pap smear due \u2014 please schedule",
            "Return with USG pelvis report"
        ];
        return {
            items,
            shareMessage: "Iron-rich diet. Take Vitamin C with iron. AVOID Ibuprofen. Track cycle. Report heavy flow. Get Pap smear done. Return with USG report.",
            adviceCopy: items.join(". ")
        };
    }
    if (hasHeadache) {
        const items = [
            "Follow 20-20-20 rule: every 20 min, look 20 feet away for 20 sec",
            "Maintain regular sleep schedule (7-8 hrs)",
            "Stay hydrated (2.5-3L/day)",
            "Maintain a migraine diary (triggers, frequency, severity)",
            "Reduce screen time where possible, use blue light filter",
            "Avoid known triggers (bright lights, skipped meals, stress)"
        ];
        return {
            items,
            shareMessage: "Follow 20-20-20 rule. Sleep 7-8 hrs. Drink 3L water. Keep migraine diary. Reduce screen time. Avoid triggers.",
            adviceCopy: items.join(". ")
        };
    }
    if (summary.pediatricsData) {
        const items = [
            "Steam inhalation before bedtime (supervised)",
            "Avoid cold drinks and ice cream",
            "Encourage solid food intake \u2014 reduce milk dependency",
            "Honey + warm water at bedtime for cough (safe >1yr)",
            "MMR-2 vaccine overdue \u2014 schedule at next visit",
            "Consider speech therapy referral for language assessment",
            "Limit screen time to <1 hr/day"
        ];
        return {
            items,
            shareMessage: "Steam inhalation at night. No cold drinks. More solid food. Honey for cough. Get MMR-2 vaccine. Speech eval needed. Limit screen time.",
            adviceCopy: items.join(". ")
        };
    }
    if (hasFatigue) {
        const items = [
            "Dinner by 8 PM \u2014 no heavy meals before bed",
            "No screens 1 hour before bedtime",
            "Walk 30 minutes daily \u2014 morning preferred",
            "Limit alcohol to occasional (avoid weekday drinking)",
            "Get ECG done as advised",
            "Continue current medications without interruption"
        ];
        return {
            items,
            shareMessage: "Dinner by 8 PM. No screens before bed. Walk 30 min daily. Limit alcohol. Get ECG. Continue medicines.",
            adviceCopy: items.join(". ")
        };
    }
    // Asthma pattern (Neha — chronic condition without symptomCollectorData)
    const chronicLower4 = (summary.chronicConditions || []).map((c)=>c.toLowerCase());
    const hasChronicAsthma4 = chronicLower4.some((c)=>c.includes("asthma"));
    const isPregnant4 = !!summary.obstetricData;
    if (hasChronicAsthma4) {
        const items = isPregnant4 ? [
            "Continue Budesonide inhaler — safe in pregnancy (Category B)",
            "AVOID Aspirin (known bronchospasm trigger) and Penicillin (rash)",
            "Use Salbutamol MDI as rescue — safe in pregnancy",
            "Deriphyllin NOT recommended in 1st trimester",
            "Monitor PEFR daily — report if <300 L/min",
            "Take Thyronorm on empty stomach (increased dose for pregnancy)",
            "Iron-rich diet for Hb correction (10.8 g/dL — target 11.5+)",
            "NT Scan due this week (11-14 weeks window)",
            "Report immediately: worsening breathlessness, chest tightness, reduced fetal movement"
        ] : [
            "Use inhaler correctly — shake, exhale, inhale slowly, hold 10s",
            "Avoid triggers: dust, smoke, cold air, strong perfumes",
            "AVOID Aspirin and Penicillin (known allergies)",
            "Monitor PEFR daily — maintain diary",
            "Take Thyronorm on empty stomach, 30 min before breakfast",
            "Annual flu vaccine recommended for asthmatics",
            "Report if needing rescue inhaler >2 times/week"
        ];
        const shareMessage = isPregnant4 ? "Continue Budesonide. Avoid Aspirin/Penicillin. Monitor PEFR daily. Take Thyronorm empty stomach. Get NT Scan done. Report breathlessness." : "Use inhaler correctly. Avoid triggers. Take Thyronorm empty stomach. Monitor PEFR. Get flu vaccine.";
        return {
            items,
            shareMessage,
            adviceCopy: items.join(". ")
        };
    }
    // Default (fever/Shyam GR pattern)
    const items = [
        "Rest, plenty of fluids (3L/day minimum)",
        "Avoid dust exposure (known allergy)",
        "Monitor temperature \u2014 return if fever persists >3 days",
        "Continue regular medications (Telma20, Metsmail 500)",
        "Follow up with CBC report"
    ];
    return {
        items,
        shareMessage: "Rest well. Drink 3L water daily. Avoid dust. Take medicines as prescribed. Return if fever continues >3 days.",
        adviceCopy: items.join(". ")
    };
}
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 PER-PATIENT FOLLOW-UP OPTIONS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function buildFollowUpOptions(summary) {
    const symptoms = summary.symptomCollectorData?.symptoms.map((s)=>s.name.toLowerCase()) || [];
    const hasKneePain = symptoms.some((s)=>s.includes("knee"));
    const hasHeadache = symptoms.some((s)=>s.includes("headache"));
    const hasFatigue = symptoms.some((s)=>s.includes("fatigue"));
    const hasBleeding = symptoms.some((s)=>s.includes("bleeding") || s.includes("menstrual"));
    if (hasKneePain) {
        return {
            context: "Dx: Osteoarthritis R knee \u00B7 Initial workup ordered",
            options: [
                {
                    label: "1 week",
                    days: 7,
                    recommended: true,
                    reason: "Review X-ray + lab results"
                },
                {
                    label: "2 weeks",
                    days: 14,
                    reason: "If improvement, extend to fortnightly"
                },
                {
                    label: "1 month",
                    days: 30,
                    reason: "Routine follow-up if stable"
                }
            ]
        };
    }
    if (summary.obstetricData) {
        const chronicLowerFU = (summary.chronicConditions || []).map((c)=>c.toLowerCase());
        const hasAsthmaFU = chronicLowerFU.some((c)=>c.includes("asthma"));
        if (hasAsthmaFU) {
            // Neha — asthma in pregnancy
            return {
                context: `Dx: Asthma in pregnancy (${summary.obstetricData.gestationalWeeks || "early"}) + Hypothyroid + ${summary.labFlagCount} lab flags`,
                options: [
                    {
                        label: "1 week",
                        days: 7,
                        recommended: true,
                        reason: "NT Scan window + asthma review + TSH recheck"
                    },
                    {
                        label: "2 weeks",
                        days: 14,
                        reason: "Pulmonary function assessment + lab results"
                    },
                    {
                        label: "4 weeks",
                        days: 28,
                        reason: "Routine ANC (monthly until 28wk)"
                    }
                ]
            };
        }
        // Priya Rao — generic ANC
        return {
            context: "Dx: ANC 38wk \u00B7 Primigravida \u00B7 BP borderline",
            options: [
                {
                    label: "3 days",
                    days: 3,
                    recommended: true,
                    reason: "Weekly ANC at 38wk + BP monitoring"
                },
                {
                    label: "1 week",
                    days: 7,
                    reason: "Standard weekly ANC"
                },
                {
                    label: "Admit if BP\u2191",
                    days: 0,
                    reason: "Immediate admission if BP >140/90 or symptoms"
                }
            ]
        };
    }
    if (hasBleeding) {
        return {
            context: "Dx: AUB + Iron deficiency anemia \u00B7 Hb 9.2 g/dL",
            options: [
                {
                    label: "2 weeks",
                    days: 14,
                    recommended: true,
                    reason: "USG pelvis + Pap smear results"
                },
                {
                    label: "6 weeks",
                    days: 42,
                    reason: "Standard gynec follow-up"
                },
                {
                    label: "1 month",
                    days: 30,
                    reason: "Check Hb response to iron therapy"
                }
            ]
        };
    }
    if (hasHeadache) {
        return {
            context: "Dx: Migraine without aura \u00B7 Vitamin D deficiency",
            options: [
                {
                    label: "2 weeks",
                    days: 14,
                    recommended: true,
                    reason: "Assess prophylaxis response"
                },
                {
                    label: "1 month",
                    days: 30,
                    reason: "Lab results + migraine diary review"
                },
                {
                    label: "3 months",
                    days: 90,
                    reason: "Long-term prophylaxis assessment"
                }
            ]
        };
    }
    if (summary.pediatricsData) {
        return {
            context: "Dx: Recurrent reactive airways \u00B7 Reduced appetite \u00B7 Speech delay",
            options: [
                {
                    label: "5 days",
                    days: 5,
                    recommended: true,
                    reason: "Reassess cough + appetite"
                },
                {
                    label: "2 weeks",
                    days: 14,
                    reason: "Speech therapy follow-up"
                },
                {
                    label: "1 month",
                    days: 30,
                    reason: "Growth monitoring + vaccine catch-up"
                }
            ]
        };
    }
    if (hasFatigue) {
        return {
            context: "Dx: Fatigue syndrome \u00B7 HTN + Dyslipidemia \u00B7 3 lab flags",
            options: [
                {
                    label: "2 weeks",
                    days: 14,
                    recommended: true,
                    reason: "ECG + lab results review"
                },
                {
                    label: "1 month",
                    days: 30,
                    reason: "Sleep improvement assessment"
                },
                {
                    label: "3 months",
                    days: 90,
                    reason: "Lipid panel recheck"
                }
            ]
        };
    }
    // Asthma without pregnancy (standalone chronic condition pattern)
    const chronicLower5 = (summary.chronicConditions || []).map((c)=>c.toLowerCase());
    if (chronicLower5.some((c)=>c.includes("asthma"))) {
        return {
            context: `Dx: Bronchial asthma exacerbation + Hypothyroid + ${summary.labFlagCount} lab flags`,
            options: [
                {
                    label: "2 weeks",
                    days: 14,
                    recommended: true,
                    reason: "Reassess asthma control + PEFR review"
                },
                {
                    label: "1 month",
                    days: 30,
                    reason: "Step-down assessment if well-controlled"
                },
                {
                    label: "3 months",
                    days: 90,
                    reason: "TSH recheck + long-term asthma review"
                }
            ]
        };
    }
    // Default (Shyam GR / fever)
    const dx = summary.lastVisit?.diagnosis || "Current consultation";
    return {
        context: `Dx: ${dx}${summary.labFlagCount > 0 ? ` + ${summary.labFlagCount} lab flags` : ""}`,
        options: [
            {
                label: "5 days",
                days: 5,
                recommended: true,
                reason: "Fever reassessment + new med glucose check"
            },
            {
                label: "2 weeks",
                days: 14,
                reason: "Standard follow-up interval"
            },
            {
                label: "1 month",
                days: 30,
                reason: "Chronic monitoring (DM + HTN)"
            }
        ]
    };
}
function getDocTypeForSpecialty(specialty) {
    if (specialty === "gynec") return "radiology";
    if (specialty === "obstetric") return "prescription";
    if (specialty === "gp") return "pathology";
    return "generic";
}
function buildDentalRadiologyReply() {
    const teeth = [
        {
            fdi: "26",
            implant: true,
            diagnoses: [],
            treatmentHistoryRows: [
                {
                    name: "Implant-supported crown",
                    surface: "Whole tooth",
                    since: "Aug 2024"
                }
            ],
            findings: [
                {
                    zoneId: "cervical",
                    type: "Calculus",
                    notes: "Supracrestal density — peri-implant hygiene"
                }
            ],
            scannerNotes: "Fixture appears centred in the 26 site; crestal bone height within common limits on this panoramic projection. No obvious thread exposure. Compare with baseline periapical if the patient reports pain or bleeding on probing."
        },
        {
            fdi: "37",
            implant: false,
            diagnoses: [],
            treatmentHistoryRows: [
                {
                    name: "Prior episodes of tenderness",
                    surface: "Whole tooth",
                    notes: "Analgesia as needed"
                }
            ],
            findings: [
                {
                    zoneId: "root",
                    type: "Sensitivity",
                    notes: "Periapical translucency vs widened PDL — vitality and percussion"
                },
                {
                    zoneId: "occlusal",
                    type: "Cavity/Caries",
                    notes: "Deep radiolucency — bitewing / PA for pulp proximity"
                }
            ],
            scannerNotes: "If symptoms persist, rule out vertical root fracture; CBCT may be indicated beyond this OPG."
        }
    ];
    return {
        text: "Here’s a quick reconstruction from your OPG — the priority sites are expanded in the cards.",
        rxOutput: {
            kind: "dental_radiology_scan",
            data: {
                title: "Dental radiology — panoramic (OPG)",
                scanSubtitle: "12 April 2026",
                category: "",
                fileLabel: "OPG upload",
                summary: "Brief OPG reconstruction: 26 — implant crown with peri-implant calculus; 37 — periapical change plus occlusal radiolucency. Findings and notes are grouped by tooth below.",
                teeth
            }
        }
    };
}
function buildDocumentReply(docType, _summary) {
    switch(docType){
        case "pathology":
            return buildPathologyReply();
        case "radiology":
            return buildRadiologyReply();
        case "prescription":
            return buildPrescriptionReply();
        case "dental_radiology":
            return buildDentalRadiologyReply();
        default:
            return buildGenericDocReply();
    }
}
function buildPathologyReply() {
    return {
        text: "I've detected this as a **pathology report**. Here are the extracted lab values \u2014 I've highlighted the concerning ones for your review.\n\nWould you like me to copy these values to the lab results section, or compare them with previous results?",
        rxOutput: {
            kind: "ocr_pathology",
            data: {
                title: "Pathology Report",
                category: "Apollo Diagnostics \u00B7 05 Mar 2026",
                parameters: [
                    {
                        name: "Hemoglobin",
                        value: "11.2 g/dL",
                        refRange: "13-17",
                        flag: "low"
                    },
                    {
                        name: "WBC",
                        value: "12,800 /\u03BCL",
                        refRange: "4000-11000",
                        flag: "high"
                    },
                    {
                        name: "Platelet Count",
                        value: "1,45,000 /\u03BCL",
                        refRange: "150000-400000",
                        flag: "low"
                    },
                    {
                        name: "ESR",
                        value: "42 mm/hr",
                        refRange: "0-20",
                        flag: "high"
                    },
                    {
                        name: "CRP",
                        value: "18.5 mg/L",
                        refRange: "0-5",
                        flag: "high"
                    },
                    {
                        name: "Fasting Glucose",
                        value: "168 mg/dL",
                        refRange: "70-100",
                        flag: "high"
                    },
                    {
                        name: "HbA1c",
                        value: "8.1 %",
                        refRange: "4-5.6",
                        flag: "high"
                    },
                    {
                        name: "Creatinine",
                        value: "1.1 mg/dL",
                        refRange: "0.7-1.3"
                    }
                ],
                normalCount: 1
            }
        }
    };
}
function buildRadiologyReply() {
    return {
        text: "I've identified this as a **radiology report**. Here are the key findings extracted from the scan.\n\nWould you like me to save this to medical records, or extract specific findings?",
        rxOutput: {
            kind: "ocr_extraction",
            data: {
                title: "Radiology Report - USG Pelvis",
                category: "Radiology \u00B7 Auto-Analyzed",
                sections: [
                    {
                        heading: "Findings",
                        icon: "search",
                        items: [
                            "Uterus: Anteverted, normal size (8.2 \u00D7 4.1 \u00D7 3.8 cm)",
                            "Endometrial thickness: 12mm (thickened)",
                            "Right ovary: Simple cyst 2.3cm",
                            "Left ovary: Normal",
                            "No free fluid in POD"
                        ],
                        copyDestination: "medical-records"
                    },
                    {
                        heading: "Impression",
                        icon: "clipboard-activity",
                        items: [
                            "Thickened endometrium \u2014 correlate clinically",
                            "Right ovarian simple cyst \u2014 likely functional",
                            "Suggest follow-up USG after next cycle"
                        ],
                        copyDestination: "medical-records"
                    }
                ]
            }
        }
    };
}
function buildPrescriptionReply() {
    return {
        text: "I've detected this as a **prescription document**. Here are the medications and notes extracted.\n\nWould you like me to copy these medications to the current prescription, or save to records?",
        rxOutput: {
            kind: "ocr_extraction",
            data: {
                title: "Prescription - Previous Consultation",
                category: "Prescription \u00B7 Auto-Analyzed",
                sections: [
                    {
                        heading: "Medications",
                        icon: "pill",
                        items: [
                            "Tab Folvite 5mg \u2014 1-0-0 \u2014 30 days",
                            "Tab Calcium 500mg \u2014 1-0-1 \u2014 30 days",
                            "Tab Iron (Autrin) \u2014 0-1-0 \u2014 30 days (AF)",
                            "Cap DHA Omega-3 \u2014 0-0-1 \u2014 30 days"
                        ],
                        copyDestination: "rxpad"
                    },
                    {
                        heading: "Advice",
                        icon: "clipboard-activity",
                        items: [
                            "Continue prenatal vitamins",
                            "Adequate hydration (3L/day)",
                            "Gentle walking 20 min daily",
                            "Report any bleeding, severe headache, or reduced fetal movement"
                        ],
                        copyDestination: "advice"
                    },
                    {
                        heading: "Follow-up",
                        icon: "medical-record",
                        items: [
                            "Next ANC visit: 2 weeks",
                            "Anomaly scan at 18-20 weeks if not done"
                        ],
                        copyDestination: "follow-up"
                    }
                ]
            }
        }
    };
}
function buildGenericDocReply() {
    return {
        text: "I've scanned the uploaded document. It appears to be a **medical document** \u2014 here's what I could extract.\n\nWould you like me to save this to medical records?",
        rxOutput: {
            kind: "ocr_extraction",
            data: {
                title: "Medical Document",
                category: "General \u00B7 Auto-Analyzed",
                sections: [
                    {
                        heading: "Extracted Content",
                        icon: "medical-record",
                        items: [
                            "Document scanned successfully",
                            "Content type: Medical record / clinical note",
                            "Date on document: Recent",
                            "Full OCR text available for review"
                        ],
                        copyDestination: "medical-records"
                    }
                ]
            }
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tp-rxpad/dr-agent/engines/homepage-reply-engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// -----------------------------------------------------------------
// Homepage Reply Engine -- Maps operational queries → Homepage cards
// Generates mock operational data for the Homepage Doctor Agent
// -----------------------------------------------------------------
__turbopack_context__.s([
    "buildHomepageReply",
    ()=>buildHomepageReply
]);
// ═══════════════ MOCK DATA GENERATORS ═══════════════
function mockPatientList() {
    return {
        title: "Queue List: Today",
        totalCount: 19,
        items: [
            {
                name: "Ramesh M",
                age: 35,
                gender: "M",
                time: "10:15 AM",
                status: "Queue",
                statusTone: "info",
                patientId: "apt-zerodata"
            },
            {
                name: "Neha Gupta",
                age: 32,
                gender: "F",
                time: "10:20 AM",
                status: "Follow-up",
                statusTone: "warning",
                patientId: "apt-neha"
            },
            {
                name: "Shyam GR",
                age: 25,
                gender: "M",
                time: "10:30 AM",
                status: "Follow-up",
                statusTone: "warning",
                patientId: "__patient__"
            },
            {
                name: "Anjali Patel",
                age: 28,
                gender: "F",
                time: "10:45 AM",
                status: "New",
                statusTone: "info",
                patientId: "apt-anjali"
            },
            {
                name: "Vikram Singh",
                age: 42,
                gender: "M",
                time: "11:00 AM",
                status: "Overdue",
                statusTone: "danger",
                patientId: "apt-vikram"
            },
            {
                name: "Priya Rao",
                age: 26,
                gender: "F",
                time: "11:15 AM",
                status: "Routine",
                statusTone: "success",
                patientId: "apt-priya"
            }
        ]
    };
}
function mockFollowUpList() {
    return {
        title: "Follow-up Dues Today",
        overdueCount: 2,
        items: [
            {
                name: "Shyam GR",
                scheduledDate: "9 Mar'26",
                reason: "Review culture results",
                isOverdue: false,
                patientId: "__patient__"
            },
            {
                name: "Vikram Singh",
                scheduledDate: "5 Mar'26",
                reason: "HTN medication review",
                isOverdue: true,
                patientId: "apt-vikram"
            },
            {
                name: "Lakshmi K",
                scheduledDate: "2 Mar'26",
                reason: "Hb recheck after iron therapy",
                isOverdue: true,
                patientId: "apt-lakshmi"
            }
        ]
    };
}
function mockOverdueFollowUpsToday() {
    return {
        title: "Overdue Follow-ups Today",
        overdueCount: 2,
        items: [
            {
                name: "Vikram Singh",
                scheduledDate: "Today · 11:15 AM",
                reason: "HTN medication review",
                isOverdue: true,
                patientId: "apt-vikram"
            },
            {
                name: "Lakshmi K",
                scheduledDate: "Today · 4:10 PM",
                reason: "Hb recheck after iron therapy",
                isOverdue: true,
                patientId: "apt-lakshmi"
            }
        ]
    };
}
function mockThisWeekFollowUps() {
    return {
        title: "This Week Follow-ups",
        overdueCount: 3,
        items: [
            {
                name: "Shyam GR",
                scheduledDate: "Mon · 10:30 AM",
                reason: "Review culture results",
                isOverdue: false,
                patientId: "__patient__"
            },
            {
                name: "Vikram Singh",
                scheduledDate: "Tue · 11:15 AM",
                reason: "HTN medication review",
                isOverdue: true,
                patientId: "apt-vikram"
            },
            {
                name: "Lakshmi K",
                scheduledDate: "Wed · 4:10 PM",
                reason: "Hb recheck after iron therapy",
                isOverdue: true,
                patientId: "apt-lakshmi"
            },
            {
                name: "Neha Gupta",
                scheduledDate: "Thu · 9:50 AM",
                reason: "Asthma follow-up",
                isOverdue: false,
                patientId: "apt-neha"
            },
            {
                name: "Priya Rao",
                scheduledDate: "Fri · 3:00 PM",
                reason: "ANC review",
                isOverdue: false,
                patientId: "apt-priya"
            },
            {
                name: "Arjun S",
                scheduledDate: "Sat · 12:20 PM",
                reason: "Vaccination catch-up",
                isOverdue: true,
                patientId: "apt-arjun"
            }
        ]
    };
}
function mockRevenueBar() {
    return {
        title: "This Week's Billing",
        mode: "billing",
        totalRevenue: 42500,
        totalPaid: 38200,
        totalDue: 4300,
        totalRefunded: 1100,
        days: [
            {
                label: "Mon",
                paid: 7200,
                due: 800,
                refunded: 120
            },
            {
                label: "Tue",
                paid: 6500,
                due: 500,
                refunded: 140
            },
            {
                label: "Wed",
                paid: 8100,
                due: 1200,
                refunded: 180
            },
            {
                label: "Thu",
                paid: 5400,
                due: 600,
                refunded: 160
            },
            {
                label: "Fri",
                paid: 6800,
                due: 700,
                refunded: 210
            },
            {
                label: "Sat",
                paid: 4200,
                due: 500,
                refunded: 290
            }
        ]
    };
}
function mockDepositBar() {
    return {
        title: "This Week's Deposits",
        mode: "deposit",
        totalRevenue: 3600,
        totalPaid: 3600,
        totalDue: 500,
        totalRefunded: 800,
        days: [
            {
                label: "Mon",
                paid: 600,
                due: 100,
                refunded: 120
            },
            {
                label: "Tue",
                paid: 700,
                due: 50,
                refunded: 90
            },
            {
                label: "Wed",
                paid: 500,
                due: 120,
                refunded: 160
            },
            {
                label: "Thu",
                paid: 650,
                due: 80,
                refunded: 110
            },
            {
                label: "Fri",
                paid: 650,
                due: 90,
                refunded: 170
            },
            {
                label: "Sat",
                paid: 500,
                due: 60,
                refunded: 150
            }
        ]
    };
}
function mockTodayRevenueBar() {
    return {
        title: "Today's Billing",
        mode: "billing",
        totalRevenue: 7800,
        totalPaid: 6400,
        totalDue: 1200,
        totalRefunded: 200,
        days: [
            {
                label: "Today",
                paid: 6400,
                due: 1200,
                refunded: 200
            }
        ]
    };
}
function mockTodayDepositBar() {
    return {
        title: "Today's Deposits",
        mode: "deposit",
        totalRevenue: 2200,
        totalPaid: 2200,
        totalDue: 300,
        totalRefunded: 150,
        days: [
            {
                label: "Today",
                paid: 2200,
                due: 300,
                refunded: 150
            }
        ]
    };
}
function mockRevenueComparison() {
    return {
        title: "Billing Comparison",
        primaryDateLabel: "Today (12 Mar)",
        compareDateLabel: "Yesterday (11 Mar)",
        primaryRevenue: 7800,
        compareRevenue: 6950,
        primaryRefunded: 180,
        compareRefunded: 95,
        primaryDeposits: 2200,
        compareDeposits: 1800
    };
}
function mockBulkAction(recipientNames) {
    return {
        action: `Send SMS reminder to ${recipientNames.length} patients`,
        messagePreview: "Dear patient, this is a reminder for your follow-up appointment at TP Clinic. Please confirm your availability.",
        recipients: recipientNames,
        totalCount: recipientNames.length
    };
}
function mockDonutChart() {
    return {
        title: "Patient Demographics: Age Groups",
        total: 284,
        centerLabel: "patients",
        segments: [
            {
                label: "0–17y",
                value: 42,
                color: "#3B6FE0"
            },
            {
                label: "18–30y",
                value: 68,
                color: "#7049C7"
            },
            {
                label: "31–45y",
                value: 82,
                color: "#0E7E7E"
            },
            {
                label: "46–60y",
                value: 56,
                color: "#C6850C"
            },
            {
                label: "60+",
                value: 36,
                color: "#C42B2B"
            }
        ]
    };
}
function mockPieChart() {
    return {
        title: "Top Diagnoses: This Week",
        total: 64,
        centerLabel: "diagnoses",
        segments: [
            {
                label: "Viral Fever",
                value: 16,
                color: "#C42B2B"
            },
            {
                label: "DM Follow-up",
                value: 13,
                color: "#3B6FE0"
            },
            {
                label: "HTN Review",
                value: 10,
                color: "#7049C7"
            },
            {
                label: "URTI",
                value: 9,
                color: "#0E7E7E"
            },
            {
                label: "ANC Routine",
                value: 8,
                color: "#C6850C"
            },
            {
                label: "Others",
                value: 8,
                color: "#9E978B"
            }
        ]
    };
}
function mockLineGraph() {
    return {
        title: "Patient Volume: Last 4 Weeks",
        average: 17,
        changePercent: "12%",
        changeDirection: "up",
        points: [
            {
                label: "W1",
                value: 14
            },
            {
                label: "W2",
                value: 18
            },
            {
                label: "W3",
                value: 15
            },
            {
                label: "W4",
                value: 22
            }
        ]
    };
}
function mockAnalyticsTable() {
    return {
        title: "Weekly Performance: KPIs",
        kpis: [
            {
                metric: "Total Patients",
                thisWeek: "64",
                lastWeek: "58",
                delta: "+10%",
                direction: "up",
                isGood: true
            },
            {
                metric: "Revenue",
                thisWeek: "₹42,500",
                lastWeek: "₹38,800",
                delta: "+9.5%",
                direction: "up",
                isGood: true
            },
            {
                metric: "Avg / Patient",
                thisWeek: "₹664",
                lastWeek: "₹669",
                delta: "-0.7%",
                direction: "down",
                isGood: false
            },
            {
                metric: "Follow-up Rate",
                thisWeek: "72%",
                lastWeek: "68%",
                delta: "+4%",
                direction: "up",
                isGood: true
            },
            {
                metric: "Cancellation",
                thisWeek: "11%",
                lastWeek: "8%",
                delta: "+3%",
                direction: "up",
                isGood: false
            },
            {
                metric: "Due Bills",
                thisWeek: "₹4,300",
                lastWeek: "₹3,100",
                delta: "+38%",
                direction: "up",
                isGood: false
            }
        ]
    };
}
function mockConditionBar() {
    return {
        title: "Chronic Condition Distribution",
        note: "68 patients have 2+ conditions (DM+HTN most common: 42)",
        items: [
            {
                condition: "Diabetes Mellitus",
                count: 86,
                color: "#3B6FE0"
            },
            {
                condition: "Hypertension",
                count: 72,
                color: "#C42B2B"
            },
            {
                condition: "Thyroid",
                count: 45,
                color: "#7049C7"
            },
            {
                condition: "Asthma",
                count: 28,
                color: "#0E7E7E"
            },
            {
                condition: "COPD",
                count: 18,
                color: "#C6850C"
            },
            {
                condition: "Others",
                count: 35,
                color: "#9E978B"
            }
        ]
    };
}
function mockHeatmap() {
    return {
        title: "Appointment Slot Utilization",
        rows: [
            "9–10 AM",
            "10–11 AM",
            "11–12 PM",
            "4–5 PM",
            "5–6 PM"
        ],
        cols: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ],
        cells: [
            [
                {
                    value: 3,
                    intensity: "low"
                },
                {
                    value: 4,
                    intensity: "medium"
                },
                {
                    value: 2,
                    intensity: "low"
                },
                {
                    value: 5,
                    intensity: "medium"
                },
                {
                    value: 3,
                    intensity: "low"
                },
                {
                    value: 1,
                    intensity: "low"
                }
            ],
            [
                {
                    value: 7,
                    intensity: "high"
                },
                {
                    value: 8,
                    intensity: "high"
                },
                {
                    value: 6,
                    intensity: "medium"
                },
                {
                    value: 7,
                    intensity: "high"
                },
                {
                    value: 5,
                    intensity: "medium"
                },
                {
                    value: 3,
                    intensity: "low"
                }
            ],
            [
                {
                    value: 5,
                    intensity: "medium"
                },
                {
                    value: 6,
                    intensity: "medium"
                },
                {
                    value: 8,
                    intensity: "high"
                },
                {
                    value: 4,
                    intensity: "medium"
                },
                {
                    value: 6,
                    intensity: "medium"
                },
                {
                    value: 2,
                    intensity: "low"
                }
            ],
            [
                {
                    value: 4,
                    intensity: "medium"
                },
                {
                    value: 5,
                    intensity: "medium"
                },
                {
                    value: 3,
                    intensity: "low"
                },
                {
                    value: 6,
                    intensity: "medium"
                },
                {
                    value: 4,
                    intensity: "medium"
                },
                {
                    value: 2,
                    intensity: "low"
                }
            ],
            [
                {
                    value: 2,
                    intensity: "low"
                },
                {
                    value: 3,
                    intensity: "low"
                },
                {
                    value: 2,
                    intensity: "low"
                },
                {
                    value: 3,
                    intensity: "low"
                },
                {
                    value: 2,
                    intensity: "low"
                },
                {
                    value: 1,
                    intensity: "low"
                }
            ]
        ]
    };
}
function mockReferral() {
    return {
        title: "Doctor Referral Summary (Incoming)",
        totalReferrers: 4,
        totalPatients: 19,
        items: [
            {
                doctorName: "Dr. Meena Iyer",
                doctorPhone: "9876501122",
                specialty: "OBG",
                patientsReferred: 7,
                topReason: "ANC and high-risk pregnancy follow-up"
            },
            {
                doctorName: "Dr. Ravi Mehta",
                doctorPhone: "9899001134",
                specialty: "Cardiology",
                patientsReferred: 5,
                topReason: "HTN and chest pain workup"
            },
            {
                doctorName: "Dr. Sanjay Nair",
                doctorPhone: "9822207711",
                specialty: "Ophthalmology",
                patientsReferred: 4,
                topReason: "Diabetic retinopathy screening"
            },
            {
                doctorName: "Dr. Kiran Joshi",
                doctorPhone: "9966112200",
                specialty: "General Medicine",
                patientsReferred: 3,
                topReason: "Fever and chronic disease review"
            }
        ]
    };
}
function mockVaccinationSchedule() {
    return {
        title: "Vaccination Schedule: This Week",
        overdueCount: 1,
        dueCount: 3,
        givenCount: 1,
        vaccines: [
            {
                patientName: "Arjun S",
                patientId: "apt-arjun",
                name: "MMR-2",
                dose: "0.5ml SC",
                dueDate: "15 Feb'26",
                status: "overdue"
            },
            {
                patientName: "Neha Gupta",
                patientId: "apt-neha",
                name: "Td/TT Booster",
                dose: "0.5ml IM",
                dueDate: "12 Mar'26",
                status: "due"
            },
            {
                patientName: "Sita R",
                name: "Hepatitis B (Dose 3)",
                dose: "1ml IM",
                dueDate: "12 Mar'26",
                status: "due"
            },
            {
                patientName: "Vikram Singh",
                patientId: "apt-vikram",
                name: "Influenza (Annual)",
                dose: "0.5ml IM",
                dueDate: "14 Mar'26",
                status: "due"
            },
            {
                patientName: "Priya Rao",
                patientId: "apt-priya",
                name: "Tdap (ANC)",
                dose: "0.5ml IM",
                dueDate: "10 Mar'26",
                status: "given"
            }
        ]
    };
}
function mockClinicalGuideline() {
    return {
        title: "Clinical Guidelines: Asthma in Pregnancy",
        condition: "Bronchial Asthma in Pregnancy",
        source: "GINA 2025 / Indian Chest Society",
        recommendations: [
            "Budesonide is the preferred ICS in pregnancy (Category B)",
            "Uncontrolled asthma poses greater risk to fetus than medication use",
            "Monitor PEFR weekly — target ≥80% predicted",
            "Step down only after ≥3 months of well-controlled asthma",
            "Avoid Deriphyllin in 1st trimester — use LABA if needed",
            "Screen for GDM if on systemic corticosteroids"
        ],
        evidenceLevel: "A"
    };
}
function mockBillingSummary(mode = "combined") {
    return {
        title: mode === "billing" ? "OPD Billing: This Week" : mode === "deposit" ? "Advance Deposits: This Week" : "Billing & Deposits: This Week",
        items: [
            mode === "deposit" ? {
                referenceNo: "ADV-2900567",
                patientName: "Tony Danza",
                amount: 500,
                status: "deposited"
            } : {
                referenceNo: "INV-2900567",
                patientName: "Tony Danza",
                amount: 500,
                billedAmount: 500,
                paidAmount: 500,
                status: "paid_fully"
            },
            mode === "deposit" ? {
                referenceNo: "ADV-2900571",
                patientName: "Templeton Peck",
                amount: 500,
                status: "deposited"
            } : {
                referenceNo: "INV-2900569",
                patientName: "Jonathan Higgins",
                amount: 250,
                billedAmount: 750,
                paidAmount: 500,
                status: "due"
            },
            mode === "deposit" ? {
                referenceNo: "ADV-2900572",
                patientName: "Capt. Trunk",
                amount: 500,
                status: "debited"
            } : {
                referenceNo: "INV-2900571",
                patientName: "Templeton Peck",
                amount: 500,
                billedAmount: 500,
                paidAmount: 500,
                status: "paid_fully"
            },
            mode === "deposit" ? {
                referenceNo: "ADV-2900573",
                patientName: "Michael Knight",
                amount: 800,
                status: "refunded"
            } : {
                referenceNo: "INV-2900573",
                patientName: "Michael Knight",
                amount: 800,
                billedAmount: 800,
                paidAmount: 800,
                status: "refunded"
            }
        ],
        mode,
        totalBilledAmount: 42500,
        totalPaidFullyAmount: 38200,
        totalDueAmount: 4300,
        totalRefundedAmount: 1100,
        totalAdvanceReceived: 3600,
        totalAdvanceRefunded: 800,
        totalAdvanceDebited: 500,
        footerCtaLabel: "Open OPD billing section",
        footerCtaAction: "Open OPD billing section"
    };
}
function mockTodayCollectionSummary() {
    return {
        ...mockBillingSummary("combined"),
        title: "Today's Collection Overview",
        items: [
            {
                referenceNo: "INV-2900611",
                patientName: "Neha Gupta",
                amount: 1200,
                billedAmount: 1200,
                paidAmount: 1200,
                status: "paid_fully"
            },
            {
                referenceNo: "INV-2900612",
                patientName: "Vikram Singh",
                amount: 1500,
                billedAmount: 1500,
                paidAmount: 300,
                status: "due"
            },
            {
                referenceNo: "INV-2900613",
                patientName: "Ramesh M",
                amount: 1000,
                billedAmount: 1000,
                paidAmount: 1000,
                status: "paid_fully"
            },
            {
                referenceNo: "INV-2900614",
                patientName: "Priya Rao",
                amount: 800,
                billedAmount: 800,
                paidAmount: 800,
                status: "paid_fully"
            },
            {
                referenceNo: "INV-2900615",
                patientName: "Sita R",
                amount: 400,
                billedAmount: 400,
                paidAmount: 0,
                status: "due"
            },
            {
                referenceNo: "ADV-2900616",
                patientName: "Arjun S",
                amount: 500,
                status: "deposited"
            },
            {
                referenceNo: "ADV-2900617",
                patientName: "Meera Nair",
                amount: 200,
                status: "debited"
            },
            {
                referenceNo: "ADV-2900618",
                patientName: "Tony Danza",
                amount: 300,
                status: "refunded"
            }
        ],
        totalBilledAmount: 7800,
        totalPaidFullyAmount: 6400,
        totalDueAmount: 1200,
        totalRefundedAmount: 200,
        totalAdvanceReceived: 2200,
        totalAdvanceDebited: 300,
        totalAdvanceRefunded: 150,
        footerCtaLabel: "View details",
        footerCtaAction: "Open OPD billing section"
    };
}
function mockPast30DayCollectionSummary() {
    return {
        ...mockBillingSummary("combined"),
        title: "Past 30 Days Collection",
        totalBilledAmount: 184000,
        totalPaidFullyAmount: 161500,
        totalDueAmount: 18500,
        totalRefundedAmount: 4000,
        totalAdvanceReceived: 27600,
        totalAdvanceDebited: 4200,
        totalAdvanceRefunded: 2100,
        footerCtaLabel: "Open OPD billing section",
        footerCtaAction: "Open OPD billing section"
    };
}
function mockGenerateInvoiceCard() {
    return {
        ...mockBillingSummary("combined"),
        title: "Generate Invoice",
        minimal: true,
        footerCtaLabel: "Open OPD billing section",
        footerCtaAction: "Open OPD billing section"
    };
}
function opdBillingTodayPills() {
    return [
        {
            id: "hp-collection-today",
            label: "Today's collection",
            priority: 8,
            layer: 3,
            tone: "primary"
        },
        {
            id: "hp-billing-today",
            label: "Today's billing",
            priority: 10,
            layer: 3,
            tone: "primary"
        },
        {
            id: "hp-deposits-today",
            label: "Today's deposits",
            priority: 12,
            layer: 3,
            tone: "primary"
        },
        {
            id: "hp-generate-invoice",
            label: "Generate invoice",
            priority: 14,
            layer: 3,
            tone: "primary"
        }
    ];
}
function mockDuePatients(period) {
    const isWeek = period === "week";
    return {
        title: isWeek ? "Patients With Due — This Week" : "Patients With Due — Till Now",
        periodLabel: isWeek ? "Week to date" : "Cumulative (till now)",
        patientCount: 10,
        totalDueAmount: 18500,
        asOf: isWeek ? "this week" : "today",
        ctaLabel: "View in detail"
    };
}
function mockFollowUpRateCard() {
    return {
        title: "Follow-up Rate",
        currentRate: 72,
        lastWeekRate: 68,
        dueToday: 5,
        overdueToday: 2,
        completedThisWeek: 18,
        scheduledThisWeek: 25,
        trend: [
            {
                label: "W1",
                rate: 61
            },
            {
                label: "W2",
                rate: 65
            },
            {
                label: "W3",
                rate: 68
            },
            {
                label: "W4",
                rate: 72
            }
        ]
    };
}
function mockPatientTimeline() {
    return {
        title: "Patient Activity: This Week",
        events: [
            {
                date: "10 Mar'26",
                type: "visit",
                summary: "Neha Gupta — Asthma follow-up + ANC"
            },
            {
                date: "10 Mar'26",
                type: "lab",
                summary: "Shyam GR — CBC, LFT results received"
            },
            {
                date: "9 Mar'26",
                type: "visit",
                summary: "Vikram Singh — HTN review, ECG done"
            },
            {
                date: "8 Mar'26",
                type: "procedure",
                summary: "Priya Rao — NST performed at 38wk"
            },
            {
                date: "7 Mar'26",
                type: "lab",
                summary: "Lakshmi K — Hb recheck: 9.8 g/dL (improving)"
            },
            {
                date: "6 Mar'26",
                type: "visit",
                summary: "Arjun S — Cough follow-up, MMR-2 pending"
            }
        ]
    };
}
function mockVaccinationDueList() {
    return {
        title: "Vaccination Due & Overdue",
        overdueCount: 2,
        dueCount: 3,
        items: [
            {
                patientName: "Arjun S",
                patientId: "apt-arjun",
                vaccineName: "MMR",
                dose: "Dose 2",
                dueDate: "15 Feb'26",
                isOverdue: true
            },
            {
                patientName: "Baby Meera",
                vaccineName: "IPV",
                dose: "Booster",
                dueDate: "1 Mar'26",
                isOverdue: true
            },
            {
                patientName: "Neha Gupta",
                patientId: "apt-neha",
                vaccineName: "Td/TT",
                dose: "Dose 1",
                dueDate: "12 Mar'26",
                isOverdue: false
            },
            {
                patientName: "Priya Rao",
                patientId: "apt-priya",
                vaccineName: "Tdap",
                dose: "Dose 1",
                dueDate: "14 Mar'26",
                isOverdue: false
            },
            {
                patientName: "Sita R",
                vaccineName: "Hepatitis B",
                dose: "Dose 3",
                dueDate: "18 Mar'26",
                isOverdue: false
            }
        ]
    };
}
function mockANCScheduleList() {
    return {
        title: "ANC Schedule — Due & Overdue",
        overdueCount: 1,
        dueCount: 3,
        items: [
            {
                patientName: "Priya Rao",
                patientId: "apt-priya",
                ancItem: "Dating Scan",
                dueWeek: "8-10 wk",
                gestationalAge: "38wk",
                isOverdue: true
            },
            {
                patientName: "Neha Gupta",
                patientId: "apt-neha",
                ancItem: "NT Scan",
                dueWeek: "11-14 wk",
                gestationalAge: "12wk",
                isOverdue: false
            },
            {
                patientName: "Neha Gupta",
                patientId: "apt-neha",
                ancItem: "First Trimester Screening",
                dueWeek: "11-14 wk",
                gestationalAge: "12wk",
                isOverdue: false
            },
            {
                patientName: "Shalini M",
                ancItem: "GDM Screening",
                dueWeek: "24-28 wk",
                gestationalAge: "25wk",
                isOverdue: false
            }
        ]
    };
}
function mockExternalExportCard(format) {
    const isExcel = format === "excel";
    return {
        title: isExcel ? "Export ready: Excel" : "Export ready: Word",
        description: isExcel ? "Your requested data is prepared in spreadsheet format. Use the link below to open or download the file." : "Your requested document is prepared in Word format. Use the link below to open or download the file.",
        ctaLabel: isExcel ? "Open Excel file" : "Open Word document",
        ctaUrl: isExcel ? "https://example.com/exports/daily-collection.xlsx" : "https://example.com/exports/daily-collection.docx",
        openInNewTab: true
    };
}
function buildHomepageReply(input, intent) {
    const n = input.toLowerCase();
    // ── Multi-word phrase handlers (must come before single-word matches like "schedule") ──
    // External export CTA (single-view response card)
    if (n.includes("excel") || n.includes("xlsx") || n.includes("sheet format") || n.includes("spreadsheet")) {
        return {
            text: "I prepared an Excel output for this request.",
            rxOutput: {
                kind: "external_cta",
                data: mockExternalExportCard("excel")
            },
            followUpPills: [
                {
                    id: "hp-billing-today",
                    label: "Today's billing",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-collection-today",
                    label: "Today's collection",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    if (n.includes("word") || n.includes("docx") || n.includes("document format")) {
        return {
            text: "I prepared a Word document output for this request.",
            rxOutput: {
                kind: "external_cta",
                data: mockExternalExportCard("word")
            },
            followUpPills: [
                {
                    id: "hp-billing-today",
                    label: "Today's billing",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-collection-today",
                    label: "Today's collection",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Referral Summary
    if (n.includes("referral") || n.includes("refer") || n.includes("specialist referral")) {
        return {
            text: "Here is the incoming referral summary: doctors who referred patients to your clinic this week.",
            rxOutput: {
                kind: "referral",
                data: mockReferral()
            },
            followUpPills: [
                {
                    id: "hp-billing-week",
                    label: "This week's billing",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-followups",
                    label: "Follow-ups due",
                    priority: 14,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Vaccination Due/Overdue List (must come before generic "vaccination" match)
    if (n.includes("vaccination due") || n.includes("vaccine overdue") || n.includes("vaccination overdue") || n.includes("immunization due")) {
        return {
            text: "5 patients with pending vaccinations — 2 overdue, 3 due this week.",
            rxOutput: {
                kind: "vaccination_due_list",
                data: mockVaccinationDueList()
            },
            followUpPills: [
                {
                    id: "hp-vaccine-schedule",
                    label: "Vaccination schedule",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-followups",
                    label: "Follow-ups due",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // ANC Schedule Due/Overdue List
    if (n.includes("anc schedule") || n.includes("anc due") || n.includes("antenatal") || n.includes("obstetric schedule") || n.includes("anc overdue")) {
        return {
            text: "4 ANC checkpoints pending — 1 overdue (Dating Scan for Priya Rao at 38wk).",
            rxOutput: {
                kind: "anc_schedule_list",
                data: mockANCScheduleList()
            },
            followUpPills: [
                {
                    id: "hp-vaccine-due",
                    label: "Vaccination due list",
                    priority: 10,
                    layer: 3,
                    tone: "warning"
                },
                {
                    id: "hp-followups",
                    label: "Follow-ups due",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Vaccination Schedule
    if (n.includes("vaccination") || n.includes("vaccine schedule") || n.includes("immunization") || n.includes("vaccine due")) {
        return {
            text: "3 vaccinations pending this week, 1 overdue. Here's the schedule.",
            rxOutput: {
                kind: "vaccination_schedule",
                data: mockVaccinationSchedule()
            },
            followUpPills: [
                {
                    id: "hp-followups",
                    label: "Follow-ups due",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-guidelines",
                    label: "Clinical guidelines",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Clinical Guidelines
    if (n.includes("guideline") || n.includes("clinical guideline") || n.includes("evidence") || n.includes("treatment protocol")) {
        return {
            text: "Here are the latest clinical guidelines relevant to your current patient mix.",
            rxOutput: {
                kind: "clinical_guideline",
                data: mockClinicalGuideline()
            },
            followUpPills: [
                {
                    id: "hp-vaccine-schedule",
                    label: "Vaccination schedule",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-referrals",
                    label: "Referral summary",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Billing Overview
    if (n.includes("bill summary") || n.includes("billing overview") || n.includes("invoice summary")) {
        return {
            text: "This week's billing (excluding deposits): ₹42,500 billed, ₹38,200 paid fully, ₹4,300 due, ₹1,100 refunded.",
            rxOutput: {
                kind: "revenue_bar",
                data: mockRevenueBar()
            },
            followUpPills: [
                {
                    id: "hp-billing-week",
                    label: "This week's billing",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-deposits-week",
                    label: "This week's deposits",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Patient Timeline — removed from clinic overview (patient-specific; handled via guardrail in DrAgentPanel)
    // Patient List / Schedule
    if (n.includes("schedule") || n.includes("queue") || n.includes("appointment") || n.includes("who's next") || n.includes("today's schedule")) {
        return {
            text: "Appointments are already visible on screen. Current snapshot: 18 patients total, 7 in queue, 3 finished, 2 drafts pending.",
            rxOutput: {
                kind: "patient_list",
                data: mockPatientList()
            },
            followUpPills: [
                {
                    id: "hp-fu-due",
                    label: "Follow-ups due",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-kpi-queue",
                    label: "Weekly KPIs",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Follow-ups (specific handlers first)
    if (n.includes("follow-up dues this week") || n.includes("follow up dues this week")) {
        return {
            text: "Showing follow-up dues for this week.",
            rxOutput: {
                kind: "follow_up_list",
                data: mockThisWeekFollowUps()
            },
            followUpPills: [
                {
                    id: "hp-fu-due",
                    label: "Follow-up dues today",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-fu-rate",
                    label: "Follow-up rate",
                    priority: 12,
                    layer: 3,
                    tone: "info"
                }
            ]
        };
    }
    if (n.includes("overdue follow-ups today") || n.includes("overdue follow up today")) {
        return {
            text: "Showing overdue follow-ups scheduled for today.",
            rxOutput: {
                kind: "follow_up_list",
                data: mockOverdueFollowUpsToday()
            },
            followUpPills: [
                {
                    id: "hp-fu-due",
                    label: "Follow-up dues today",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-fu-week",
                    label: "This week follow-ups",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    if (n.includes("this week follow-ups") || n.includes("this week's follow-up") || n.includes("this week follow-up")) {
        return {
            text: "Here's the follow-up roster for this week.",
            rxOutput: {
                kind: "follow_up_list",
                data: mockThisWeekFollowUps()
            },
            followUpPills: [
                {
                    id: "hp-fu-due",
                    label: "Follow-up dues today",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-fu-rate",
                    label: "Follow-up rate",
                    priority: 12,
                    layer: 3,
                    tone: "info"
                }
            ]
        };
    }
    if (n.includes("follow-up rate") || n.includes("follow up rate")) {
        return {
            text: "Here is the current follow-up rate overview.",
            rxOutput: {
                kind: "follow_up_rate",
                data: mockFollowUpRateCard()
            },
            followUpPills: [
                {
                    id: "hp-fu-due",
                    label: "Follow-up dues today",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-fu-week",
                    label: "This week follow-ups",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    if (n.includes("follow-up dues today") || n.includes("follow-ups due today") || n.includes("follow up due today")) {
        return {
            text: "Showing follow-up dues scheduled for today.",
            rxOutput: {
                kind: "follow_up_list",
                data: mockFollowUpList()
            },
            followUpPills: [
                {
                    id: "hp-fu-overdue",
                    label: "Overdue follow-ups today",
                    priority: 10,
                    layer: 3,
                    tone: "warning"
                },
                {
                    id: "hp-fu-week",
                    label: "This week follow-ups",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Follow-ups (fallback generic)
    if (n.includes("follow-up") || n.includes("follow up") || n.includes("overdue") || n.includes("callback") || n.includes("follow-ups due")) {
        return {
            text: "3 follow-ups scheduled today, 2 are overdue. You can send individual or bulk reminders.",
            rxOutput: {
                kind: "follow_up_list",
                data: mockFollowUpList()
            },
            followUpPills: [
                {
                    id: "hp-fu-due",
                    label: "Follow-up dues today",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-fu-rate",
                    label: "Follow-up rate",
                    priority: 12,
                    layer: 3,
                    tone: "info"
                }
            ]
        };
    }
    if (n.includes("this week's deposits") || n.includes("this week deposits") || n.includes("weekly deposits") || n.includes("week deposits") || n.includes("deposit this week")) {
        return {
            text: "This week's deposits: ₹3,600 received, ₹800 refunded, ₹500 debited.",
            rxOutput: {
                kind: "revenue_bar",
                data: mockDepositBar()
            },
            followUpPills: [
                {
                    id: "hp-billing-week",
                    label: "This week's billing",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-compare-yday",
                    label: "Compare with yesterday",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    if (n.includes("this week's billing") || n.includes("this week billing") || n.includes("weekly billing") || n.includes("week billing")) {
        return {
            text: "This week's billing (excluding advance deposits): ₹42,500 total billed, ₹38,200 collected, ₹4,300 due, ₹1,100 refunded.",
            rxOutput: {
                kind: "revenue_bar",
                data: mockRevenueBar()
            },
            followUpPills: [
                {
                    id: "hp-deposits-week",
                    label: "This week's deposits",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-compare-yday",
                    label: "Compare with yesterday",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    if (n.includes("compare with yesterday")) {
        return {
            text: "Here's today's billing versus yesterday for quick comparison.",
            rxOutput: {
                kind: "revenue_comparison",
                data: mockRevenueComparison()
            },
            followUpPills: [
                {
                    id: "hp-billing-week",
                    label: "This week's billing",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-deposits-week",
                    label: "This week's deposits",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    if (n.includes("revenue today") || n.includes("today revenue") || n.includes("today's revenue")) {
        return {
            text: "Top-level billing today: ₹7,800 billed, ₹180 refunded. Deposits are tracked separately.",
            rxOutput: {
                kind: "billing_summary",
                data: mockTodayCollectionSummary()
            },
            followUpPills: [
                {
                    id: "hp-collection-today",
                    label: "Today's collection",
                    priority: 8,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-billing-today",
                    label: "Today's billing",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-deposits-today",
                    label: "Today's deposits",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-collection-30d",
                    label: "Past 30 days collection",
                    priority: 14,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // OPD Billing rail specifics (kept before generic revenue matcher)
    if (n.includes("total bill today") || n.includes("today bill total") || n.includes("today's billing") || n.includes("todays billing")) {
        return {
            text: "Here's today's billing only.",
            rxOutput: {
                kind: "revenue_bar",
                data: mockTodayRevenueBar()
            },
            followUpPills: opdBillingTodayPills()
        };
    }
    if (n.includes("today's deposit") || n.includes("todays deposit") || n.includes("today deposit")) {
        return {
            text: "Here's today's deposits only.",
            rxOutput: {
                kind: "revenue_bar",
                data: mockTodayDepositBar()
            },
            followUpPills: opdBillingTodayPills()
        };
    }
    if (n.includes("overall collection") || n.includes("past 30 days collection") || n.includes("last 30 days collection")) {
        return {
            text: "Here's the overall collection snapshot for the past 30 days.",
            rxOutput: {
                kind: "billing_summary",
                data: mockPast30DayCollectionSummary()
            },
            followUpPills: [
                {
                    id: "hp-collection-today",
                    label: "Today's collection",
                    priority: 8,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-billing-week",
                    label: "This week's billing",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-deposits-week",
                    label: "This week's deposits",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-generate-invoice",
                    label: "Generate invoice",
                    priority: 14,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    if (n.includes("today's collection") || n.includes("todays collection")) {
        return {
            text: "Here's today's collection summary with billing, advance, and dues.",
            rxOutput: {
                kind: "billing_summary",
                data: mockTodayCollectionSummary()
            },
            followUpPills: opdBillingTodayPills()
        };
    }
    if (n.includes("patients with due") || n.includes("patient with due") || n.includes("dues this week") || n.includes("due this week")) {
        return {
            text: "Here are patients with due for this week.",
            rxOutput: {
                kind: "due_patients",
                data: mockDuePatients("week")
            },
            followUpPills: opdBillingTodayPills()
        };
    }
    if (n.includes("due till now") || n.includes("dues till now") || n.includes("dues till date")) {
        return {
            text: "Here are patients with due till now.",
            rxOutput: {
                kind: "due_patients",
                data: mockDuePatients("till_now")
            },
            followUpPills: opdBillingTodayPills()
        };
    }
    if (n.includes("open billing") || n.includes("open opd billing") || n.includes("billing section")) {
        return {
            text: "Opening OPD billing overview with dues and collection summary.",
            rxOutput: {
                kind: "billing_summary",
                data: mockTodayCollectionSummary()
            },
            followUpPills: opdBillingTodayPills()
        };
    }
    // Revenue
    if (n.includes("revenue") || n.includes("billing") || n.includes("collection") || n.includes("payment") || n.includes("income") || n.includes("earnings")) {
        return {
            text: "This week's billing (excluding advance deposits): ₹42,500 total billed, ₹38,200 paid fully, ₹4,300 due, ₹1,100 refunded.",
            rxOutput: {
                kind: "revenue_bar",
                data: mockRevenueBar()
            },
            followUpPills: [
                {
                    id: "hp-deposits-week",
                    label: "This week's deposits",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-compare-yday",
                    label: "Compare with yesterday",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // SMS / Reminders / Bulk
    if (n.includes("send sms") || n.includes("send reminder") || n.includes("remind all") || n.includes("bulk sms") || n.includes("notify")) {
        // Extract specific patient name if "send reminder to <name>"
        const singleMatch = n.match(/send reminder to (.+)/);
        const isAll = n.includes("remind all") || n.includes("reminder to all") || n.includes("bulk");
        if (singleMatch && !isAll) {
            const patientName = singleMatch[1].trim().replace(/^(dr\.?\s+)/i, "");
            // Capitalize each word for display
            const displayName = patientName.replace(/\b\w/g, (c)=>c.toUpperCase());
            return {
                text: `I've prepared an SMS reminder for ${displayName}. Please review and confirm.`,
                rxOutput: {
                    kind: "bulk_action",
                    data: mockBulkAction([
                        displayName
                    ])
                }
            };
        }
        return {
            text: "I've prepared a bulk SMS for overdue follow-up patients. Please review and confirm.",
            rxOutput: {
                kind: "bulk_action",
                data: mockBulkAction([
                    "Vikram Singh",
                    "Lakshmi K",
                    "Shyam GR"
                ])
            }
        };
    }
    // Demographics
    if (n.includes("demographic") || n.includes("age group") || n.includes("gender split") || n.includes("patient composition") || n.includes("patient distribution")) {
        return {
            text: "Here's the patient demographics breakdown by age group. 284 total patients on record.",
            rxOutput: {
                kind: "donut_chart",
                data: mockDonutChart()
            },
            followUpPills: [
                {
                    id: "hp-diagnosis-dist",
                    label: "Diagnosis breakdown",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-conditions",
                    label: "Chronic conditions",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Diagnosis Distribution
    if (n.includes("diagnosis distribution") || n.includes("top diagnos") || n.includes("common condition") || n.includes("diagnosis breakdown")) {
        return {
            text: "Top diagnoses this week: Viral Fever leads at 25%, followed by DM Follow-up and HTN Review.",
            rxOutput: {
                kind: "pie_chart",
                data: mockPieChart()
            },
            followUpPills: [
                {
                    id: "hp-demographics",
                    label: "Patient demographics",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-conditions",
                    label: "Chronic conditions",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Patient Volume / Footfall
    if (n.includes("patient volume") || n.includes("footfall") || n.includes("monthly patient") || n.includes("patient trend") || n.includes("trend") && !n.includes("vital")) {
        return {
            text: "Patient volume has increased 12% over the last 4 weeks, from 14/day average to 22/day.",
            rxOutput: {
                kind: "line_graph",
                data: mockLineGraph()
            },
            followUpPills: [
                {
                    id: "hp-peak-hours",
                    label: "Peak hours",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-demographics",
                    label: "Patient demographics",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // KPIs / Analytics
    if (n.includes("kpi") || n.includes("performance") || n.includes("weekly summary") || n.includes("analytics") || n.includes("dashboard") || n.includes("weekly kpi")) {
        return {
            text: "Here's this week's performance dashboard compared to last week.",
            rxOutput: {
                kind: "analytics_table",
                data: mockAnalyticsTable()
            },
            followUpPills: [
                {
                    id: "hp-billing-week",
                    label: "This week's billing",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-deposits-week",
                    label: "This week's deposits",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Chronic Conditions
    if (n.includes("chronic") || n.includes("diabetic") || n.includes("hypertensive") || n.includes("condition breakdown") || n.includes("condition distribution")) {
        return {
            text: "Chronic condition distribution across your patient base. DM and HTN are the most prevalent.",
            rxOutput: {
                kind: "condition_bar",
                data: mockConditionBar()
            },
            followUpPills: [
                {
                    id: "hp-demographics",
                    label: "Patient demographics",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-guidelines",
                    label: "Clinical guidelines",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Heatmap / Busiest
    if (n.includes("busiest") || n.includes("slot utilization") || n.includes("peak hour") || n.includes("appointment density") || n.includes("busiest hours") || n.includes("peak hours")) {
        return {
            text: "Appointment slot heatmap: 10-11 AM is consistently the busiest across all days.",
            rxOutput: {
                kind: "heatmap",
                data: mockHeatmap()
            },
            followUpPills: [
                {
                    id: "hp-patient-volume",
                    label: "Patient trends",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-cancel-rate",
                    label: "Cancellation rate",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // How many patients
    if (n.includes("how many patient") || n.includes("patient count") || n.includes("total patient")) {
        return {
            text: "Today: 18 patients scheduled, 7 in queue, 3 finished, 2 cancelled, 2 drafts, 2 pending discharge. Total on record: 284 patients."
        };
    }
    // Cancellation
    if (n.includes("cancel") || n.includes("no show") || n.includes("no-show") || n.includes("cancellation rate")) {
        return {
            text: "This week's cancellation rate: 11% (7 out of 64). Up from 8% last week. Main reasons: patient called to postpone (3), no reason given (2), rescheduled (2).",
            followUpPills: [
                {
                    id: "hp-cancel-detail",
                    label: "Show cancelled patients",
                    priority: 10,
                    layer: 3,
                    tone: "primary"
                },
                {
                    id: "hp-reduce-cancel",
                    label: "Reduce cancellations",
                    priority: 12,
                    layer: 3,
                    tone: "primary"
                }
            ]
        };
    }
    // Pre-consultation: add symptoms
    if (n.includes("add") && (n.includes("fever") || n.includes("symptom") || n.includes("cough") || n.includes("pain"))) {
        // Try to extract patient name
        const patients = [
            "shyam",
            "anjali",
            "vikram",
            "priya",
            "arjun",
            "lakshmi",
            "ramesh"
        ];
        const matched = patients.find((p)=>n.includes(p));
        const patientName = matched ? matched.charAt(0).toUpperCase() + matched.slice(1) : "the patient";
        return {
            text: `\u2705 Pre-consultation data noted for ${patientName}. This will appear in the Symptoms section when you open their Rx.`
        };
    }
    // Pre-consultation: copy last Rx
    if (n.includes("copy last") || n.includes("copy rx") || n.includes("copy prescription")) {
        return {
            text: "\u2705 Last visit medications have been pre-filled. When you open the Rx, you'll see them in the Med(Rx) section. Review before saving."
        };
    }
    // ── Rail-specific: Follow-ups ──
    if (n.includes("overdue follow-up") || n.includes("overdue follow up")) {
        return {
            text: "You have 2 overdue follow-ups: Vikram Singh (HTN review, 4 days overdue) and Lakshmi K (Hb recheck, 7 days overdue). Shall I send reminders?",
            rxOutput: {
                kind: "follow_up_list",
                data: mockFollowUpList()
            }
        };
    }
    if (n.includes("this week's follow-up") || n.includes("this week follow-up")) {
        return {
            text: "Here's the follow-up roster for this week.",
            rxOutput: {
                kind: "follow_up_list",
                data: mockThisWeekFollowUps()
            }
        };
    }
    if (n.includes("follow-up rate") || n.includes("follow up rate")) {
        return {
            text: "Here is the current follow-up rate overview.",
            rxOutput: {
                kind: "follow_up_rate",
                data: mockFollowUpRateCard()
            }
        };
    }
    // ── Rail-specific: OPD Billing ──
    if (n.includes("generate invoice")) {
        return {
            text: "Generate invoice from OPD billing for the selected patient.",
            rxOutput: {
                kind: "billing_summary",
                data: mockGenerateInvoiceCard()
            },
            followUpPills: opdBillingTodayPills()
        };
    }
    // ── Rail-specific: Pharmacy ──
    if (n.includes("low stock")) {
        return {
            text: "Low stock alerts: Metformin 500mg (12 strips left, ~3 days), Amoxicillin 250mg (8 strips), Pantoprazole 40mg (15 strips). Reorder recommended for all 3."
        };
    }
    if (n.includes("pending prescription")) {
        return {
            text: "3 prescriptions pending dispensing: Shyam GR (10:30 AM, 4 items), Anjali Patel (10:45 AM, 2 items), Ramesh M (10:15 AM, 3 items)."
        };
    }
    if (n.includes("dispense history")) {
        return {
            text: "Today's dispense log: 4 prescriptions fulfilled. Total items: 14. Most dispensed: Paracetamol 650mg (4 patients), Metformin 500mg (3 patients)."
        };
    }
    if (n.includes("expiring medicine")) {
        return {
            text: "Medicines expiring within 30 days: Azithromycin 500mg (batch AZ-2024, exp 2 Apr), Ceftriaxone Inj (batch CT-2024, exp 28 Mar). Action: Return/use immediately."
        };
    }
    // ── Rail-specific: Bulk Messages ──
    if (n.includes("draft campaign")) {
        return {
            text: "Campaign draft started. Template: Follow-up reminder. Recipients: 12 overdue patients. Preview: 'Dear [Name], your follow-up at TP Clinic is overdue. Please call +91-XXXXX to reschedule.'"
        };
    }
    if (n.includes("delivery stat")) {
        return {
            text: "Last campaign stats: 45 messages sent, 42 delivered (93.3%), 3 failed. Open rate: 78%. Response rate: 34% (14 patients confirmed/rescheduled)."
        };
    }
    if (n.includes("template library")) {
        return {
            text: "Available templates: Follow-up Reminder, Appointment Confirmation, Lab Report Ready, Vaccination Due, Birthday Greeting, Health Tip of the Week. 6 templates total."
        };
    }
    if (n.includes("scheduled message")) {
        return {
            text: "2 scheduled messages: Tomorrow 9 AM, 'Appointment reminder' to 5 patients. Wednesday 10 AM, 'Lab report ready' to 3 patients."
        };
    }
    // ── Patient-context pills ──
    if (n.includes("patient snapshot") || n.includes("patient's detailed summary") || n.includes("detailed summary")) {
        return {
            text: "Select a specific patient from the dropdown above to see their clinical snapshot, including vitals, recent visits, and active medications."
        };
    }
    if (n.includes("pre-consult prep")) {
        return {
            text: "Pre-consult prep ready. Review pending labs, overdue follow-up reasons, and symptom reports before starting the consultation. Switch to the patient context above to see specific data."
        };
    }
    if (n.includes("abnormal lab")) {
        return {
            text: "Patients with abnormal labs this week: Shyam GR (HbA1c 8.2%, Creatinine 1.4), Vikram Singh (LDL 168, TG 210), Lakshmi K (Hb 9.8, improving). 3 patients flagged."
        };
    }
    // Fallback
    return {
        text: "I can help with follow-ups, weekly billing, weekly deposits, patient demographics, diagnosis trends, and more.",
        followUpPills: [
            {
                id: "hp-fu",
                label: "Follow-ups due",
                priority: 12,
                layer: 3,
                tone: "primary"
            },
            {
                id: "hp-bill",
                label: "This week's billing",
                priority: 14,
                layer: 3,
                tone: "primary"
            },
            {
                id: "hp-dep",
                label: "This week's deposits",
                priority: 16,
                layer: 3,
                tone: "primary"
            },
            {
                id: "hp-kpi",
                label: "Weekly KPIs",
                priority: 18,
                layer: 3,
                tone: "primary"
            }
        ]
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_tp-rxpad_dr-agent_engines_55f1277a._.js.map