(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/dental/examination/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ══════════════════════════════════════════════════════════════
// ZONE SYSTEM — varies by tooth position
// ══════════════════════════════════════════════════════════════
// Base zone IDs used internally
__turbopack_context__.s([
    "ALL_ZONES",
    ()=>ALL_ZONES,
    "ARCH_POSITIONS",
    ()=>ARCH_POSITIONS,
    "DIAGNOSES",
    ()=>DIAGNOSES,
    "DIAGNOSIS_COLORS",
    ()=>DIAGNOSIS_COLORS,
    "PEDIATRIC_ARCH_POSITIONS",
    ()=>PEDIATRIC_ARCH_POSITIONS,
    "PEDIATRIC_TEETH",
    ()=>PEDIATRIC_TEETH,
    "PROCEDURE_CATALOG",
    ()=>PROCEDURE_CATALOG,
    "QUADRANT_LABELS",
    ()=>QUADRANT_LABELS,
    "TEETH",
    ()=>TEETH,
    "TOOTH_DIAGNOSES",
    ()=>TOOTH_DIAGNOSES,
    "TREATMENT_SURFACE_RULES",
    ()=>TREATMENT_SURFACE_RULES,
    "ZONE_INFO",
    ()=>ZONE_INFO,
    "getDefaultTreatmentSurfaces",
    ()=>getDefaultTreatmentSurfaces,
    "getZoneAbbr",
    ()=>getZoneAbbr,
    "getZoneLabel",
    ()=>getZoneLabel,
    "isPatientRightQuadrant",
    ()=>isPatientRightQuadrant
]);
const ALL_ZONES = [
    'occlusal',
    'buccal',
    'lingual',
    'mesial',
    'distal',
    'cervical',
    'root'
];
function getZoneAbbr(zoneId, arch, toothNum) {
    const label = getZoneLabel(zoneId, arch, toothNum);
    switch(label){
        case 'Incisal':
            return 'I';
        case 'Occlusal':
            return 'O';
        case 'Labial':
            return 'La';
        case 'Buccal':
            return 'B';
        case 'Palatal':
            return 'P';
        case 'Lingual':
            return 'L';
        case 'Mesial':
            return 'M';
        case 'Distal':
            return 'D';
        case 'Cervical':
            return 'C';
        case 'Root':
            return 'R';
        case 'Whole Tooth':
            return 'WT';
        default:
            return '?';
    }
}
function getZoneLabel(zoneId, arch, toothNum// 1-8 within quadrant
) {
    const isAnterior = toothNum <= 3 // incisors + canine
    ;
    switch(zoneId){
        case 'occlusal':
            return isAnterior ? 'Incisal' : 'Occlusal';
        case 'buccal':
            return isAnterior ? 'Labial' : 'Buccal';
        case 'lingual':
            return arch === 'maxillary' ? 'Palatal' : 'Lingual';
        case 'mesial':
            return 'Mesial';
        case 'distal':
            return 'Distal';
        case 'cervical':
            return 'Cervical';
        case 'root':
            return 'Root';
        case 'whole':
            return 'Whole Tooth';
        default:
            return zoneId;
    }
}
const ZONE_INFO = {
    occlusal: {
        label: 'Occlusal',
        color: '#14b8a6',
        colorVec: [
            0.078,
            0.722,
            0.651
        ],
        layer: 'crown'
    },
    buccal: {
        label: 'Buccal',
        color: '#f97316',
        colorVec: [
            0.976,
            0.451,
            0.086
        ],
        layer: 'crown'
    },
    lingual: {
        label: 'Lingual',
        color: '#8b5cf6',
        colorVec: [
            0.545,
            0.361,
            0.965
        ],
        layer: 'crown'
    },
    mesial: {
        label: 'Mesial',
        color: '#eab308',
        colorVec: [
            0.918,
            0.702,
            0.031
        ],
        layer: 'crown'
    },
    distal: {
        label: 'Distal',
        color: '#2563eb',
        colorVec: [
            0.149,
            0.388,
            0.922
        ],
        layer: 'crown'
    },
    cervical: {
        label: 'Cervical',
        color: '#ec4899',
        colorVec: [
            0.925,
            0.282,
            0.600
        ],
        layer: 'cervical'
    },
    root: {
        label: 'Root',
        color: '#65a30d',
        colorVec: [
            0.396,
            0.639,
            0.051
        ],
        layer: 'root'
    },
    whole: {
        label: 'Whole Tooth',
        color: '#34d399',
        colorVec: [
            0.204,
            0.827,
            0.600
        ],
        layer: 'crown'
    }
};
const PROCEDURE_CATALOG = [
    "RCT",
    "Restoration",
    "Extraction",
    "Scaling",
    "Polishing",
    "Crown Prep",
    "Bridge Prep",
    "Implant Placement",
    "Pulp Cap",
    "Root Planing",
    "Veneer",
    "Composite Filling"
];
const TREATMENT_SURFACE_RULES = {
    Implant: "whole-tooth",
    Missing: "whole-tooth",
    RCT: "whole-tooth",
    "Root Canal Treatment": "whole-tooth",
    Crown: "whole-tooth",
    "Crown Prep": "whole-tooth",
    Bridge: "whole-tooth",
    "Bridge Prep": "whole-tooth",
    Extraction: "whole-tooth",
    Veneer: "whole-tooth",
    "Pulp Cap": "whole-tooth",
    "Implant Placement": "whole-tooth",
    Denture: "whole-tooth",
    Scaling: "ask",
    Polishing: "ask",
    "Composite Filling": "ask",
    Restoration: "ask",
    "Root Planing": "ask",
    "Fluoride Treatment": "ask"
};
function getDefaultTreatmentSurfaces(name) {
    const rule = TREATMENT_SURFACE_RULES[name] ?? "ask";
    if (rule === "whole-tooth") return [
        "whole"
    ];
    if (rule === "root") return [
        "root"
    ];
    return [];
}
const DIAGNOSES = [
    'Cavity/Caries',
    'Crack',
    'Fracture',
    'Erosion',
    'Abrasion',
    'Attrition',
    'Staining',
    'Plaque',
    'Calculus',
    'Restoration Defect',
    'NCCL',
    'Sensitivity',
    'Resorption',
    'Recession',
    'Normal'
];
const TOOTH_DIAGNOSES = [
    'Implant',
    'Missing',
    'RCT',
    'Crown',
    'Bridge',
    'Denture',
    'Extraction',
    'Composite Filling',
    'Scaling',
    'Polishing',
    'Veneer',
    'Pulp Cap',
    'Root Planing',
    'Fluoride Treatment'
];
const TOOTH_NAMES = {
    1: {
        name: 'Central Incisor',
        type: 'incisor'
    },
    2: {
        name: 'Lateral Incisor',
        type: 'incisor'
    },
    3: {
        name: 'Canine',
        type: 'canine'
    },
    4: {
        name: 'First Premolar',
        type: 'premolar'
    },
    5: {
        name: 'Second Premolar',
        type: 'premolar'
    },
    6: {
        name: 'First Molar',
        type: 'molar'
    },
    7: {
        name: 'Second Molar',
        type: 'molar'
    },
    8: {
        name: 'Third Molar',
        type: 'molar'
    }
};
// Model mapping: which GLB to use for each position
// Upper teeth use UL (upper left) models, lower use LL (lower left) models
const UPPER_MODELS = {
    1: '/models/tooth_11.glb',
    2: '/models/tooth_11.glb',
    3: '/models/tooth_13.glb',
    4: '/models/tooth_14.glb',
    5: '/models/tooth_15.glb',
    6: '/models/tooth_16.glb',
    7: '/models/tooth_17.glb',
    8: '/models/tooth_18.glb'
};
const LOWER_MODELS = {
    1: '/models/tooth_31.glb',
    2: '/models/tooth_32.glb',
    3: '/models/tooth_33.glb',
    4: '/models/tooth_34.glb',
    5: '/models/tooth_35.glb',
    6: '/models/tooth_36.glb',
    7: '/models/tooth_37.glb',
    8: '/models/tooth_38.glb'
};
function buildTeeth() {
    const teeth = [];
    // Quadrant 1: Upper Right (FDI 11-18) — mirror of upper left
    for(let pos = 1; pos <= 8; pos++){
        const info = TOOTH_NAMES[pos];
        teeth.push({
            fdi: `1${pos}`,
            name: info.name,
            position: pos,
            quadrant: 'upper-right',
            arch: 'maxillary',
            type: info.type,
            modelPath: UPPER_MODELS[pos],
            mirrorX: true
        });
    }
    // Quadrant 2: Upper Left (FDI 21-28) — original models
    for(let pos = 1; pos <= 8; pos++){
        const info = TOOTH_NAMES[pos];
        teeth.push({
            fdi: `2${pos}`,
            name: info.name,
            position: pos,
            quadrant: 'upper-left',
            arch: 'maxillary',
            type: info.type,
            modelPath: UPPER_MODELS[pos],
            mirrorX: false
        });
    }
    // Quadrant 3: Lower Left (FDI 31-38) — original models
    for(let pos = 1; pos <= 8; pos++){
        const info = TOOTH_NAMES[pos];
        teeth.push({
            fdi: `3${pos}`,
            name: info.name,
            position: pos,
            quadrant: 'lower-left',
            arch: 'mandibular',
            type: info.type,
            modelPath: LOWER_MODELS[pos],
            mirrorX: false
        });
    }
    // Quadrant 4: Lower Right (FDI 41-48) — mirror of lower left
    for(let pos = 1; pos <= 8; pos++){
        const info = TOOTH_NAMES[pos];
        teeth.push({
            fdi: `4${pos}`,
            name: info.name,
            position: pos,
            quadrant: 'lower-right',
            arch: 'mandibular',
            type: info.type,
            modelPath: LOWER_MODELS[pos],
            mirrorX: true
        });
    }
    return teeth;
}
const TEETH = buildTeeth();
const QUADRANT_LABELS = {
    'upper-right': 'Upper Right',
    'upper-left': 'Upper Left',
    'lower-left': 'Lower Left',
    'lower-right': 'Lower Right'
};
function isPatientRightQuadrant(q) {
    return q === 'upper-right' || q === 'lower-right';
}
const DIAGNOSIS_COLORS = {
    Crown: '#6B7280',
    Missing: '#EF4444',
    RCT: '#6B7280',
    Bridge: '#6B7280',
    Implant: '#6B7280',
    Denture: '#6B7280'
};
function computeArchPositions() {
    const result = {};
    // Tooth widths (approximate mesiodistal widths in scene units)
    const widths = {
        // Note: position 2 reuses the same GLB as position 1 (central incisor),
        // so keep similar width to prevent center-anterior overlap.
        1: 0.55,
        2: 0.45,
        3: 0.52,
        4: 0.48,
        5: 0.48,
        6: 0.68,
        7: 0.65,
        8: 0.60
    };
    // Arch curve: z = -k * x^2 (parabola opening toward -Z)
    const kUpper = 0.12;
    const kLower = 0.14 // slightly tighter curve for lower arch
    ;
    const yLower = -1.8 // vertical offset for lower jaw
    ;
    // Compute cumulative X positions for left side (Q2 upper, Q3 lower)
    // Teeth go from midline outward: pos 1 (central incisor) → pos 8 (wisdom)
    function computeLeftSidePositions(k, yOffset, archPrefix, quadrant) {
        let cumX = 0;
        for(let pos = 1; pos <= 8; pos++){
            const w = widths[pos];
            cumX += w / 2; // half-width to center
            const x = cumX;
            const z = -k * x * x;
            // Rotation: tooth faces outward (perpendicular to arch tangent)
            // Tangent at x: dz/dx = -2kx, so tangent angle = atan(-2kx)
            // Tooth should face outward = perpendicular to tangent
            const tangentAngle = Math.atan(-2 * k * x);
            const ry = tangentAngle // Y rotation for outward facing
            ;
            const fdi = `${quadrant}${pos}`;
            result[fdi] = {
                position: [
                    x,
                    yOffset,
                    z
                ],
                rotation: [
                    0,
                    ry,
                    0
                ]
            };
            cumX += w / 2; // other half-width for spacing
            cumX += 0.04; // small gap between teeth
        }
    }
    // Upper Left (Q2): positive X
    computeLeftSidePositions(kUpper, 0, 'UL', '2');
    // Lower Left (Q3): positive X, lower Y
    computeLeftSidePositions(kLower, yLower, 'LL', '3');
    // Mirror for right side: negate X, negate ry
    // Upper Right (Q1)
    for(let pos = 1; pos <= 8; pos++){
        const src = result[`2${pos}`];
        result[`1${pos}`] = {
            position: [
                -src.position[0],
                src.position[1],
                src.position[2]
            ],
            rotation: [
                src.rotation[0],
                -src.rotation[1],
                src.rotation[2]
            ]
        };
    }
    // Lower Right (Q4)
    for(let pos = 1; pos <= 8; pos++){
        const src = result[`3${pos}`];
        result[`4${pos}`] = {
            position: [
                -src.position[0],
                src.position[1],
                src.position[2]
            ],
            rotation: [
                src.rotation[0],
                -src.rotation[1],
                src.rotation[2]
            ]
        };
    }
    return result;
}
const ARCH_POSITIONS = computeArchPositions();
function buildPediatricTeeth() {
    const teeth = [];
    // Mapping primary positions (1-5) to adult model positions for reuse
    // 1=Central, 2=Lateral, 3=Canine, 4=First Molar (uses adult 6), 5=Second Molar (uses adult 7)
    const posMap = {
        1: 1,
        2: 2,
        3: 3,
        4: 6,
        5: 7
    };
    const typeMap = {
        1: 'incisor',
        2: 'incisor',
        3: 'canine',
        4: 'molar',
        5: 'molar'
    };
    const nameMap = {
        1: 'Central Incisor',
        2: 'Lateral Incisor',
        3: 'Canine',
        4: 'First Molar',
        5: 'Second Molar'
    };
    // Q5: Upper Right
    for(let pos = 1; pos <= 5; pos++){
        const adultPos = posMap[pos];
        teeth.push({
            fdi: `5${pos}`,
            name: nameMap[pos],
            position: pos,
            type: typeMap[pos],
            quadrant: 'upper-right',
            arch: 'maxillary',
            mirrorX: true,
            modelPath: UPPER_MODELS[adultPos]
        });
    }
    // Q6: Upper Left
    for(let pos = 1; pos <= 5; pos++){
        const adultPos = posMap[pos];
        teeth.push({
            fdi: `6${pos}`,
            name: nameMap[pos],
            position: pos,
            type: typeMap[pos],
            quadrant: 'upper-left',
            arch: 'maxillary',
            mirrorX: false,
            modelPath: UPPER_MODELS[adultPos]
        });
    }
    // Q7: Lower Left
    for(let pos = 1; pos <= 5; pos++){
        const adultPos = posMap[pos];
        teeth.push({
            fdi: `7${pos}`,
            name: nameMap[pos],
            position: pos,
            type: typeMap[pos],
            quadrant: 'lower-left',
            arch: 'mandibular',
            mirrorX: false,
            modelPath: LOWER_MODELS[adultPos]
        });
    }
    // Q8: Lower Right
    for(let pos = 1; pos <= 5; pos++){
        const adultPos = posMap[pos];
        teeth.push({
            fdi: `8${pos}`,
            name: nameMap[pos],
            position: pos,
            type: typeMap[pos],
            quadrant: 'lower-right',
            arch: 'mandibular',
            mirrorX: true,
            modelPath: LOWER_MODELS[adultPos]
        });
    }
    return teeth;
}
const PEDIATRIC_TEETH = buildPediatricTeeth();
function computePediatricArchPositions() {
    const result = {};
    // Widths based on adult positions reused
    const widths = {
        // Pediatric pos2 also reuses the same incisor model scale in this setup.
        1: 0.55,
        2: 0.45,
        3: 0.52,
        4: 0.68,
        5: 0.65
    };
    // Scale down curve variables slightly for smaller jaws
    const kUpper = 0.16;
    const kLower = 0.18;
    const yLower = -1.5;
    function computeLeftSidePositions(k, yOffset, quadrant) {
        let cumX = 0;
        for(let pos = 1; pos <= 5; pos++){
            const w = widths[pos];
            cumX += w / 2;
            const x = cumX;
            const z = -k * x * x;
            const ry = Math.atan(-2 * k * x);
            result[`${quadrant}${pos}`] = {
                position: [
                    x,
                    yOffset,
                    z
                ],
                rotation: [
                    0,
                    ry,
                    0
                ]
            };
            cumX += w / 2 + 0.04;
        }
    }
    computeLeftSidePositions(kUpper, 0, '6');
    computeLeftSidePositions(kLower, yLower, '7');
    // Mirror right side
    for(let pos = 1; pos <= 5; pos++){
        const src6 = result[`6${pos}`];
        result[`5${pos}`] = {
            position: [
                -src6.position[0],
                src6.position[1],
                src6.position[2]
            ],
            rotation: [
                src6.rotation[0],
                -src6.rotation[1],
                src6.rotation[2]
            ]
        };
        const src7 = result[`7${pos}`];
        result[`8${pos}`] = {
            position: [
                -src7.position[0],
                src7.position[1],
                src7.position[2]
            ],
            rotation: [
                src7.rotation[0],
                -src7.rotation[1],
                src7.rotation[2]
            ]
        };
    }
    return result;
}
const PEDIATRIC_ARCH_POSITIONS = computePediatricArchPositions();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/ToothIcon.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToothIcon",
    ()=>ToothIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function ToothIcon({ size = 20, variant = "Linear", color = "#FFFFFF", strokeWidth = 1.5, className }) {
    if (variant === "Bulk") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
            width: size,
            height: size,
            viewBox: "0 0 24 24",
            fill: color,
            xmlns: "http://www.w3.org/2000/svg",
            className: className,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: "M12.0597 9.68012C11.2097 9.68012 10.3397 9.35012 9.44969 8.69012C9.11969 8.44012 9.04969 7.97012 9.29969 7.64012C9.54969 7.31012 10.0197 7.24012 10.3497 7.49012C11.5697 8.40012 12.5397 8.41012 13.5897 7.52012C13.9097 7.25012 14.3797 7.29012 14.6497 7.61012C14.9197 7.93012 14.8797 8.40012 14.5597 8.67012C13.7497 9.35012 12.9197 9.69012 12.0597 9.69012V9.68012Z"
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                    opacity: "0.4",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                        d: "M21.0902 5.01989C19.6502 2.61989 16.7802 1.47989 14.0802 2.22989L12.4202 2.69989C12.1402 2.77989 11.8302 2.77989 11.5502 2.69989L9.89023 2.22989C7.19024 1.46989 4.32023 2.60989 2.88023 5.01989C2.30023 5.98989 1.99023 7.09989 1.99023 8.22989V8.34989C1.99023 12.2099 2.77023 16.0199 4.28023 19.5699L4.67023 20.4899C5.06023 21.4099 5.96023 21.9999 6.96023 21.9999C7.98023 21.9999 8.89023 21.3799 9.27024 20.4299L10.4602 17.4399C10.7102 16.8099 11.3102 16.3999 11.9802 16.3999C12.6502 16.3999 13.2602 16.8099 13.5002 17.4399L14.6902 20.4299C15.0702 21.3799 15.9802 21.9999 17.0002 21.9999C18.0002 21.9999 18.9002 21.3999 19.2902 20.4899L19.6802 19.5699C21.1902 16.0199 21.9702 12.1999 21.9702 8.34989V8.22989C21.9702 7.09989 21.6602 5.98989 21.0802 5.01989H21.0902Z"
                    })
                })
            ]
        });
    }
    // Linear
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M14.0799 8.09009C12.5599 9.37009 11.1799 9.04009 9.8999 8.09009",
                stroke: color,
                strokeWidth: strokeWidth,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M21.0902 5.01989C19.6502 2.61989 16.7802 1.47989 14.0802 2.22989L12.4202 2.69989C12.1402 2.77989 11.8302 2.77989 11.5502 2.69989L9.89023 2.22989C7.19023 1.46989 4.32023 2.60989 2.88023 5.01989C2.30023 5.98989 1.99023 7.09989 1.99023 8.22989V8.34989C1.99023 12.2099 2.77023 16.0199 4.28023 19.5699L4.67023 20.4899C5.06023 21.4099 5.96023 21.9999 6.96023 21.9999C7.98023 21.9999 8.89024 21.3799 9.27024 20.4299L10.4602 17.4399C10.7102 16.8099 11.3102 16.3999 11.9802 16.3999C12.6502 16.3999 13.2602 16.8099 13.5002 17.4399L14.6902 20.4299C15.0702 21.3799 15.9802 21.9999 17.0002 21.9999C18.0002 21.9999 18.9002 21.3999 19.2902 20.4899L19.6802 19.5699C21.1902 16.0199 21.9702 12.1999 21.9702 8.34989V8.22989C21.9702 7.09989 21.6602 5.98989 21.0802 5.01989H21.0902Z",
                stroke: color,
                strokeWidth: strokeWidth,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            })
        ]
    });
}
_c = ToothIcon;
var _c;
__turbopack_context__.k.register(_c, "ToothIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Mock dental history data keyed by patientId.
 * Used by both the RxPad Dental empty-state sidebar panel AND the full
 * Dental Module page to simulate real clinic records for the demo story.
 */ __turbopack_context__.s([
    "DENTAL_HISTORY",
    ()=>DENTAL_HISTORY,
    "DENTAL_TOOTH_HISTORY",
    ()=>DENTAL_TOOTH_HISTORY,
    "INITIAL_FINDINGS",
    ()=>INITIAL_FINDINGS,
    "INITIAL_TOOTH_STATE",
    ()=>INITIAL_TOOTH_STATE,
    "TREATMENT_PLANS",
    ()=>TREATMENT_PLANS
]);
const INITIAL_TOOTH_STATE = {
    "apt-new": {},
    "apt-1": {},
    "apt-2": {},
    // Anjali Patel — returning patient with an active restoration on 26, a
    // completed RCT + crown on 36, and an early caries lesion on 16 that's
    // been monitored since last visit.
    "apt-6": {
        toothDiagnoses: {
            "26": [
                "Filling"
            ],
            "36": [
                "RCT",
                "Crown"
            ]
        },
        findingsByTooth: {
            "26": [
                {
                    zoneId: "occlusal",
                    type: "Filling"
                }
            ],
            "16": [
                {
                    zoneId: "occlusal",
                    type: "Caries"
                },
                {
                    zoneId: "buccal",
                    type: "Caries"
                }
            ],
            "47": [
                {
                    zoneId: "cervical",
                    type: "Staining"
                }
            ]
        }
    }
};
const DENTAL_HISTORY = {
    "apt-new": [],
    "apt-1": [
        // Shyam GR — historical entries from past visits (matches current tooth state)
        {
            id: "dh-s01",
            condition: "RCT — 36 (in progress)",
            since: "Feb 2025",
            status: "Active",
            medication: true,
            notes: "2 sittings completed, crown pending."
        },
        {
            id: "dh-s02",
            condition: "Crown — 26 (PFM)",
            since: "Nov 2024",
            status: "Resolved",
            medication: false,
            notes: "Placed after RCT, bite aligned."
        },
        {
            id: "dh-s03",
            condition: "Caries — 16 (Buccal/Occlusal)",
            since: "Jan 2025",
            status: "Monitoring",
            medication: false,
            notes: "Staining + early cavity, restoration planned."
        },
        {
            id: "dh-s04",
            condition: "Scaling & Polishing",
            since: "Jul 2024",
            status: "Resolved",
            medication: false
        }
    ],
    "apt-2": [
        // Sita Menon — basic historical data
        {
            id: "dh-st01",
            condition: "Extraction — 18, 28 (Wisdom teeth)",
            since: "Jun 2024",
            status: "Resolved",
            medication: true,
            notes: "Impacted molars, no complications."
        },
        {
            id: "dh-st02",
            condition: "Fluoride Treatment",
            since: "Mar 2025",
            status: "Resolved",
            medication: false
        }
    ],
    "apt-3": [
        // Vikram Singh — basic historical data
        {
            id: "dh-v01",
            condition: "Deep Cleaning (Scaling & Root Planing)",
            since: "Sep 2024",
            status: "Resolved",
            medication: false,
            notes: "Mild gingivitis, improved at 6-month follow-up."
        }
    ],
    "apt-4": [],
    "apt-5": [],
    "apt-6": [
        {
            id: "dh-101",
            condition: "Scaling & Polishing",
            since: "Dec 2024",
            status: "Resolved",
            medication: false
        },
        {
            id: "dh-102",
            condition: "Restoration — 26 (Occlusal)",
            since: "Jan 2025",
            status: "Active",
            medication: false,
            notes: "Composite filling, monitor for sensitivity."
        }
    ],
    "PAT-001": [],
    "PAT-002": [
        {
            id: "dh-001",
            condition: "Root Canal Treatment — 36",
            since: "Mar 2025",
            status: "Resolved",
            medication: false,
            notes: "Completed over 3 sittings. Follow-up at 6 months."
        },
        {
            id: "dh-002",
            condition: "Restoration — 16 (Occlusal)",
            since: "Jan 2025",
            status: "Active",
            medication: false,
            notes: "Composite filling, monitor for sensitivity."
        },
        {
            id: "dh-003",
            condition: "Scaling & Polishing",
            since: "Dec 2024",
            status: "Resolved",
            medication: false
        }
    ],
    "PAT-003": [
        {
            id: "dh-004",
            condition: "Orthodontic Treatment",
            since: "Sep 2024",
            status: "Active",
            medication: false,
            notes: "Metal braces, planned 18 months. Current month: 7."
        },
        {
            id: "dh-005",
            condition: "Extraction — 18, 28, 38, 48",
            since: "Aug 2024",
            status: "Resolved",
            medication: true,
            notes: "Wisdom tooth removal prior to ortho treatment."
        }
    ],
    "PAT-004": [
        {
            id: "dh-006",
            condition: "Implant — 46",
            since: "Nov 2024",
            status: "Monitoring",
            medication: false,
            notes: "Healing phase, crown placement pending."
        }
    ]
};
const DENTAL_TOOTH_HISTORY = {
    "apt-new": [],
    "apt-1": [
        {
            id: "dth-apt1-36",
            toothCode: "36",
            toothLabel: "Lower Left First Molar",
            treatmentHistory: [
                {
                    id: "th-36-1",
                    name: "Root Canal Treatment",
                    surface: "Occlusal, Root",
                    since: "2025-02-12",
                    notes: "Working length verified. Irrigation and medicament placed."
                }
            ],
            findings: [
                {
                    id: "fnd-36-1",
                    name: "Deep caries with pulpal involvement",
                    surface: "Occlusal",
                    since: "2025-02-06",
                    notes: "Associated with intermittent pain on chewing."
                },
                {
                    id: "fnd-36-2",
                    name: "Percussion sensitivity",
                    surface: "Root",
                    since: "2025-03-10",
                    notes: "Reduced after second sitting."
                }
            ],
            procedures: [
                {
                    id: "proc-36-1",
                    name: "Biomechanical preparation",
                    surface: "Mesial, Distal canals",
                    date: "2025-03-10",
                    status: "Completed",
                    notes: "Mesial and distal canals prepared to final taper."
                }
            ],
            overallNotes: "Needs crown placement after obturation completion."
        },
        {
            id: "dth-apt1-16",
            toothCode: "16",
            toothLabel: "Upper Right First Molar",
            treatmentHistory: [
                {
                    id: "th-16-1",
                    name: "Composite Restoration",
                    surface: "Buccal, Occlusal",
                    since: "2025-01-19",
                    notes: "Shade A2 selected. Margins finished and polished."
                }
            ],
            findings: [
                {
                    id: "fnd-16-1",
                    name: "Early enamel demineralization",
                    surface: "Buccal",
                    since: "2025-01-08"
                },
                {
                    id: "fnd-16-2",
                    name: "Food impaction",
                    surface: "Occlusal",
                    since: "2025-02-05",
                    notes: "Reported during follow-up visit."
                }
            ],
            procedures: [
                {
                    id: "proc-16-1",
                    name: "Caries excavation and etch-bond protocol",
                    surface: "Buccal, Occlusal",
                    date: "2025-01-19",
                    status: "Completed"
                }
            ],
            overallNotes: "Review at 3 months for marginal integrity."
        }
    ],
    "apt-2": [
        {
            id: "dth-apt2-18",
            toothCode: "18",
            toothLabel: "Upper Right Third Molar",
            treatmentHistory: [
                {
                    id: "th-18-1",
                    name: "Surgical Extraction",
                    surface: "Whole Tooth",
                    since: "2024-06-14",
                    notes: "Impacted tooth removed atraumatically."
                }
            ],
            findings: [
                {
                    id: "fnd-18-1",
                    name: "Mesioangular impaction",
                    surface: "Whole Tooth",
                    since: "2024-06-02",
                    notes: "Confirmed in OPG."
                },
                {
                    id: "fnd-18-2",
                    name: "Pericoronal inflammation",
                    surface: "Distal gingival margin",
                    since: "2024-06-07"
                }
            ],
            procedures: [
                {
                    id: "proc-18-1",
                    name: "Flap elevation and sectioning",
                    surface: "Whole Tooth",
                    date: "2024-06-14",
                    status: "Completed"
                }
            ],
            overallNotes: "Socket healed well without postoperative infection."
        }
    ],
    "apt-3": [],
    "apt-4": [],
    "apt-5": [],
    "apt-6": [
        {
            id: "dth-apt6-46",
            toothCode: "46",
            toothLabel: "Lower Right First Molar",
            treatmentHistory: [
                {
                    id: "th-46-1",
                    name: "Implant Assessment",
                    surface: "Whole Tooth",
                    since: "2024-11-22",
                    notes: "Healing abutment stable, soft tissue healthy."
                }
            ],
            findings: [
                {
                    id: "fnd-46-1",
                    name: "Osseointegration satisfactory",
                    surface: "Implant site",
                    since: "2024-12-11",
                    notes: "Stable on clinical mobility assessment."
                }
            ],
            procedures: [
                {
                    id: "proc-46-1",
                    name: "Implant review and occlusal evaluation",
                    surface: "Whole Tooth",
                    date: "2025-02-02",
                    status: "In Progress"
                }
            ],
            overallNotes: "Proceed with definitive crown after next review."
        }
    ],
    "PAT-001": [],
    "PAT-002": [
        {
            id: "dth-p2-36",
            toothCode: "36",
            toothLabel: "Lower Left First Molar",
            treatmentHistory: [
                {
                    id: "th-p2-36-1",
                    name: "Root Canal Treatment",
                    surface: "Root",
                    since: "2025-03-18"
                }
            ],
            findings: [
                {
                    id: "fnd-p2-36-1",
                    name: "Post-endodontic tenderness",
                    surface: "Periapical region",
                    since: "2025-04-01",
                    notes: "Resolved at review."
                }
            ],
            procedures: [],
            overallNotes: "Crown advised within 4 weeks."
        }
    ],
    "PAT-003": [],
    "PAT-004": [
        {
            id: "dth-p4-46",
            toothCode: "46",
            toothLabel: "Lower Right First Molar",
            treatmentHistory: [
                {
                    id: "th-p4-46-1",
                    name: "Implant Placement",
                    surface: "Whole Tooth",
                    since: "2024-11-08"
                }
            ],
            findings: [
                {
                    id: "fnd-p4-46-1",
                    name: "Soft tissue contour satisfactory",
                    surface: "Peri-implant mucosa",
                    since: "2025-01-08"
                }
            ],
            procedures: [
                {
                    id: "proc-p4-46-1",
                    name: "Follow-up implant stability check",
                    surface: "Whole Tooth",
                    date: "2025-01-08",
                    status: "Completed"
                }
            ],
            overallNotes: "Crown loading planned after final radiographic confirmation."
        }
    ]
};
const TREATMENT_PLANS = {
    "apt-1": [
        {
            id: "tp-101",
            treatment: "Root Canal Treatment",
            teeth: [
                "36"
            ],
            rate: 8000
        },
        {
            id: "tp-102",
            treatment: "Restoration (Composite Filling)",
            teeth: [
                "16",
                "26"
            ],
            rate: 2000
        },
        {
            id: "tp-103",
            treatment: "Scaling & Polishing",
            teeth: [
                "full-mouth"
            ],
            rate: 1500
        }
    ],
    "apt-6": [
        {
            id: "tp-201",
            treatment: "Crown (PFM)",
            teeth: [
                "26"
            ],
            rate: 6000
        }
    ],
    "PAT-001": [
        {
            id: "tp-001",
            treatment: "Root Canal Treatment",
            teeth: [
                "36"
            ],
            rate: 8000
        },
        {
            id: "tp-002",
            treatment: "Restoration (Composite Filling)",
            teeth: [
                "16",
                "26"
            ],
            rate: 2000
        },
        {
            id: "tp-003",
            treatment: "Scaling & Polishing",
            teeth: [
                "full-mouth"
            ],
            rate: 1500
        }
    ],
    "PAT-002": [
        {
            id: "tp-004",
            treatment: "Crown (PFM)",
            teeth: [
                "36"
            ],
            rate: 6000
        }
    ],
    "PAT-003": [],
    "PAT-004": [
        {
            id: "tp-005",
            treatment: "Implant Crown",
            teeth: [
                "46"
            ],
            rate: 9000
        }
    ]
};
const INITIAL_FINDINGS = {
    "PAT-001": [],
    "PAT-002": [
        {
            toothFdi: "36",
            diagnoses: [
                "RCT"
            ],
            zoneFindings: {
                root: [
                    "Sensitivity"
                ]
            }
        },
        {
            toothFdi: "16",
            diagnoses: [],
            zoneFindings: {
                occlusal: [
                    "Cavity/Caries"
                ]
            }
        }
    ],
    "PAT-003": [],
    "PAT-004": [
        {
            toothFdi: "46",
            diagnoses: [
                "Implant"
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/Annotations.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Annotations",
    ()=>Annotations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/web/Html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Annotations({ toothMesh, findings, zoneNotes, arch, toothPosition, quadrant, selectedZone, onSelectZone, onClearSelectedZone, zoneDirs, meshBounds }) {
    _s();
    const [expandedAnnotation, setExpandedAnnotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [occludedAnnotations, setOccludedAnnotations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const prevFindingsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    // Smart auto-expand: show tooltip when user selects a zone that has findings,
    // or when a new finding is added to the currently selected zone
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Annotations.useEffect": ()=>{
            if (!selectedZone) {
                setExpandedAnnotation(null);
                return;
            }
            const zoneHasFindings = findings.some({
                "Annotations.useEffect.zoneHasFindings": (f)=>f.zoneId === selectedZone
            }["Annotations.useEffect.zoneHasFindings"]);
            const zoneHasNotes = zoneNotes[selectedZone]?.trim();
            const annotId = `annot-${selectedZone}`;
            // Build a fingerprint of current findings for this zone
            const currentFingerprint = findings.filter({
                "Annotations.useEffect.currentFingerprint": (f)=>f.zoneId === selectedZone
            }["Annotations.useEffect.currentFingerprint"]).map({
                "Annotations.useEffect.currentFingerprint": (f)=>f.id
            }["Annotations.useEffect.currentFingerprint"]).sort().join(',');
            // Auto-expand the tooltip on EVERY zone selection (even if the zone has
            // no findings yet) — user immediately sees which surface is selected.
            // When findings are added later, the fingerprint changes and we re-expand
            // to reflect the new content.
            setExpandedAnnotation(annotId);
            // Suppress unused-var warnings (reserved for potential conditional logic)
            void zoneHasFindings;
            void zoneHasNotes;
            prevFindingsRef.current = currentFingerprint;
        }
    }["Annotations.useEffect"], [
        findings,
        selectedZone,
        zoneNotes
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Annotations.useEffect": ()=>{
            if (!expandedAnnotation) return;
            const handlePointerDown = {
                "Annotations.useEffect.handlePointerDown": (e)=>{
                    const target = e.target;
                    if (target?.closest('[data-dental-annotation-ui="true"]')) return;
                    setExpandedAnnotation(null);
                    if (selectedZone === 'whole') onClearSelectedZone?.();
                }
            }["Annotations.useEffect.handlePointerDown"];
            document.addEventListener('pointerdown', handlePointerDown, true);
            return ({
                "Annotations.useEffect": ()=>{
                    document.removeEventListener('pointerdown', handlePointerDown, true);
                }
            })["Annotations.useEffect"];
        }
    }["Annotations.useEffect"], [
        expandedAnnotation,
        onClearSelectedZone,
        selectedZone
    ]);
    const handleOcclude = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Annotations.useCallback[handleOcclude]": (pointId, hidden)=>{
            setOccludedAnnotations({
                "Annotations.useCallback[handleOcclude]": (prev)=>{
                    if (prev[pointId] === hidden) return prev;
                    return {
                        ...prev,
                        [pointId]: hidden
                    };
                }
            }["Annotations.useCallback[handleOcclude]"]);
        }
    }["Annotations.useCallback[handleOcclude]"], []);
    const zoneFindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Annotations.useMemo[zoneFindings]": ()=>{
            const grouped = {};
            for (const f of findings){
                if (!grouped[f.zoneId]) grouped[f.zoneId] = [];
                grouped[f.zoneId].push(f);
            }
            return grouped;
        }
    }["Annotations.useMemo[zoneFindings]"], [
        findings
    ]);
    const annotationPoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Annotations.useMemo[annotationPoints]": ()=>{
            if (!toothMesh || !zoneDirs || !meshBounds) return [];
            const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Raycaster"]();
            const { center, size, cervicalY, occlusalMidY, bb } = meshBounds;
            const points = [];
            // Show annotation for EVERY zone that has a finding/note, PLUS the
            // currently-selected zone (even if empty) — so users get an immediate
            // visual confirmation of their selection.
            const set = new Set(Object.keys(zoneFindings).filter({
                "Annotations.useMemo[annotationPoints]": (z)=>(zoneFindings[z]?.length ?? 0) > 0 || zoneNotes[z] && zoneNotes[z].trim()
            }["Annotations.useMemo[annotationPoints]"]));
            if (selectedZone) set.add(selectedZone);
            const zonesWithData = Array.from(set);
            for (const zoneId of zonesWithData){
                const zoneFindingsList = zoneFindings[zoneId] || [];
                let outwardDir;
                let rayY;
                switch(zoneId){
                    case 'whole':
                        continue;
                    case 'occlusal':
                        outwardDir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, arch === 'maxillary' ? -1 : 1, 0);
                        rayY = arch === 'maxillary' ? bb.min.y - 1 : bb.max.y + 1;
                        break;
                    case 'buccal':
                        outwardDir = zoneDirs.buccal?.clone() || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1);
                        rayY = occlusalMidY;
                        break;
                    case 'lingual':
                        outwardDir = zoneDirs.lingual?.clone() || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -1);
                        rayY = occlusalMidY;
                        break;
                    case 'mesial':
                        outwardDir = zoneDirs.mesial?.clone() || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0);
                        rayY = occlusalMidY;
                        break;
                    case 'distal':
                        outwardDir = zoneDirs.distal?.clone() || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-1, 0, 0);
                        rayY = occlusalMidY;
                        break;
                    case 'cervical':
                        outwardDir = zoneDirs.buccal?.clone() || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1);
                        rayY = cervicalY;
                        break;
                    case 'root':
                        outwardDir = zoneDirs.buccal?.clone() || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1);
                        rayY = arch === 'maxillary' ? bb.max.y - size.y * 0.15 : bb.min.y + size.y * 0.15;
                        break;
                    default:
                        continue;
                }
                const inwardDir = outwardDir.clone().negate().normalize();
                const rayOrigin = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](center.x + outwardDir.x * 2, rayY, center.z + outwardDir.z * 2);
                if (zoneId === 'occlusal') {
                    rayOrigin.set(center.x, rayY, center.z);
                }
                raycaster.set(rayOrigin, inwardDir);
                const hits = raycaster.intersectObject(toothMesh, false);
                let position;
                let normal;
                if (hits.length > 0) {
                    const hitNormal = hits[0].face ? hits[0].face.normal.clone().transformDirection(toothMesh.matrixWorld).normalize() : outwardDir;
                    position = hits[0].point.clone().add(hitNormal.clone().multiplyScalar(0.02));
                    normal = hitNormal;
                } else {
                    position = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](center.x + outwardDir.x * size.x * 0.4, rayY, center.z + outwardDir.z * size.z * 0.4);
                    normal = outwardDir;
                }
                points.push({
                    id: `annot-${zoneId}`,
                    zoneId,
                    position,
                    normal,
                    findings: zoneFindingsList
                });
            }
            return points;
        }
    }["Annotations.useMemo[annotationPoints]"], [
        toothMesh,
        zoneFindings,
        zoneNotes,
        zoneDirs,
        meshBounds,
        arch,
        selectedZone
    ]);
    if (annotationPoints.length === 0) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("group", {
        children: annotationPoints.map((point)=>{
            const isExpanded = expandedAnnotation === point.id;
            const isSelected = selectedZone === point.zoneId;
            const isOccluded = occludedAnnotations[point.id] || false;
            // Keep selected/expanded annotation UI visible even if occlusion says hidden.
            // Root/cervical points often sit close to geometry and can be falsely marked occluded.
            const suppressByOcclusion = isOccluded && !isSelected && !isExpanded;
            const zoneColor = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZONE_INFO"][point.zoneId]?.color || '#666';
            const zoneLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getZoneLabel"])(point.zoneId, arch, toothPosition);
            const diagnoses = point.findings.map((f)=>f.type);
            const notes = zoneNotes[point.zoneId] || point.findings.map((f)=>f.notes?.trim()).filter(Boolean).join(' · ');
            const abbr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getZoneAbbr"])(point.zoneId, arch, toothPosition);
            const baseOpacity = suppressByOcclusion ? 0.15 : isSelected ? 1 : 0.75;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("group", {
                position: point.position,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
                    center: true,
                    occlude: !isSelected && !isExpanded,
                    onOcclude: (hidden)=>handleOcclude(point.id, hidden),
                    style: {
                        pointerEvents: suppressByOcclusion ? 'none' : 'auto',
                        userSelect: 'none',
                        opacity: baseOpacity,
                        transition: 'opacity 0.15s ease'
                    },
                    zIndexRange: [
                        100,
                        0
                    ],
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        "data-dental-annotation-ui": "true",
                        style: {
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        },
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    if (isExpanded) {
                                        setExpandedAnnotation(null);
                                    } else {
                                        setExpandedAnnotation(point.id);
                                        onSelectZone(point.zoneId);
                                    }
                                },
                                style: {
                                    width: 22,
                                    height: 22,
                                    borderRadius: '50%',
                                    background: isExpanded || isSelected ? zoneColor : 'rgba(70, 70, 75, 0.65)',
                                    color: isExpanded || isSelected ? '#fff' : 'rgba(255,255,255,0.9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 10,
                                    fontWeight: 700,
                                    fontFamily: "'Inter', sans-serif",
                                    cursor: 'pointer',
                                    boxShadow: isExpanded || isSelected ? `0 0 0 2px rgba(255,255,255,0.5)` : '0 1px 3px rgba(0,0,0,0.25)',
                                    border: `1.5px solid ${isExpanded || isSelected ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)'}`,
                                    transition: 'all 0.2s ease',
                                    zIndex: isExpanded ? 10 : 1,
                                    letterSpacing: '-0.3px'
                                },
                                children: abbr
                            }),
                            isExpanded && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                "data-dental-annotation-ui": "true",
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    left: 24,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 20
                                },
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                        style: {
                                            width: 55,
                                            height: 0,
                                            borderTop: '1.5px dashed rgba(100, 100, 110, 0.5)',
                                            flexShrink: 0
                                        }
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                        "data-dental-annotation-ui": "true",
                                        style: {
                                            minWidth: 150,
                                            maxWidth: 200,
                                            background: 'rgba(0, 0, 0, 0.78)',
                                            backdropFilter: 'blur(14px)',
                                            WebkitBackdropFilter: 'blur(14px)',
                                            borderRadius: 8,
                                            padding: '10px 13px',
                                            color: '#fff',
                                            fontFamily: "'Inter', sans-serif",
                                            boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
                                            animation: 'dentalCanvasAnnotFadeIn 0.15s ease-out',
                                            borderLeft: `3px solid ${zoneColor}`
                                        },
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                                style: {
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    marginBottom: diagnoses.length > 0 ? 7 : 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                    lineHeight: 1.3
                                                },
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                        style: {
                                                            width: 7,
                                                            height: 7,
                                                            borderRadius: '50%',
                                                            background: zoneColor,
                                                            flexShrink: 0
                                                        }
                                                    }),
                                                    zoneLabel
                                                ]
                                            }),
                                            (()=>{
                                                const historyList = diagnoses.filter((d)=>d.startsWith('Hx:') || d.startsWith('Dx:')).map((d)=>d.slice(3).trim());
                                                const findingsList = diagnoses.filter((d)=>d.startsWith('Fn:') || !d.startsWith('Pr:') && !d.startsWith('Dx:') && !d.startsWith('Hx:')).map((d)=>d.startsWith('Fn:') ? d.slice(3).trim() : d);
                                                const proceduresList = diagnoses.filter((d)=>d.startsWith('Pr:')).map((d)=>d.slice(3).trim());
                                                const sectionLabelStyle = {
                                                    fontSize: 9,
                                                    fontWeight: 600,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.4px',
                                                    color: 'rgba(255,255,255,0.55)',
                                                    marginBottom: 3
                                                };
                                                const tagRowStyle = {
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 4
                                                };
                                                const tagStyle = {
                                                    fontSize: 11,
                                                    padding: '2px 6px',
                                                    borderRadius: 4,
                                                    background: 'rgba(255,255,255,0.12)',
                                                    color: '#ddd',
                                                    fontWeight: 500,
                                                    lineHeight: 1.4
                                                };
                                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        historyList.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                                            style: {
                                                                marginBottom: findingsList.length > 0 || proceduresList.length > 0 || notes ? 7 : 0
                                                            },
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                                                    style: sectionLabelStyle,
                                                                    children: "Treatment History"
                                                                }),
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                                                    style: tagRowStyle,
                                                                    children: historyList.map((d, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                                            style: tagStyle,
                                                                            children: d
                                                                        }, `h-${i}`))
                                                                })
                                                            ]
                                                        }),
                                                        findingsList.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                                            style: {
                                                                marginBottom: proceduresList.length > 0 || notes ? 7 : 0
                                                            },
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                                                    style: sectionLabelStyle,
                                                                    children: "Findings"
                                                                }),
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                                                    style: tagRowStyle,
                                                                    children: findingsList.map((d, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                                            style: tagStyle,
                                                                            children: d
                                                                        }, `f-${i}`))
                                                                })
                                                            ]
                                                        }),
                                                        proceduresList.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                                            style: {
                                                                marginBottom: notes ? 7 : 0
                                                            },
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                                                    style: sectionLabelStyle,
                                                                    children: "Procedures"
                                                                }),
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                                                    style: tagRowStyle,
                                                                    children: proceduresList.map((d, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                                            style: tagStyle,
                                                                            children: d
                                                                        }, `p-${i}`))
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                });
                                            })(),
                                            notes.trim() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#aaa',
                                                    lineHeight: 1.4,
                                                    borderTop: '1px solid rgba(255,255,255,0.1)',
                                                    paddingTop: 6,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                },
                                                children: notes.trim()
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                })
            }, point.id);
        })
    });
}
_s(Annotations, "U84b/Ts7qyzGUu2pY7LEKXsP86I=");
_c = Annotations;
var _c;
__turbopack_context__.k.register(_c, "Annotations");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/Tooth.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IMPLANT_CENTER_X",
    ()=>IMPLANT_CENTER_X,
    "IMPLANT_CENTER_Z",
    ()=>IMPLANT_CENTER_Z,
    "IMPLANT_TOP_DIAM",
    ()=>IMPLANT_TOP_DIAM,
    "IMPLANT_TOP_Y",
    ()=>IMPLANT_TOP_Y,
    "ImplantScrew",
    ()=>ImplantScrew,
    "PreparedStump",
    ()=>PreparedStump,
    "RootCanals",
    ()=>RootCanals,
    "Tooth",
    ()=>Tooth,
    "cloneSceneWithUniqueMaterials",
    ()=>cloneSceneWithUniqueMaterials,
    "getDentalShaderVariantKey",
    ()=>getDentalShaderVariantKey,
    "getDirsForTooth",
    ()=>getDirsForTooth,
    "getFrontAzimuth",
    ()=>getFrontAzimuth,
    "injectShader",
    ()=>injectShader,
    "prewarmDentalShaderProgram",
    ()=>prewarmDentalShaderProgram,
    "tintShader",
    ()=>tintShader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Center.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/web/Html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Annotations$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/Annotations.jsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
/**
 * Front-view camera azimuths per tooth FDI, from user-provided reference screenshots.
 * The camera azimuth when looking at the labial/buccal face = direction the front faces.
 * Null means use the default (buccal = -Z).
 */ const FRONT_VIEWS = {
    // Upper Right (Quadrant 1) — anterior pol=80°, posterior pol=90°
    '11': {
        az: 0,
        pol: 80
    },
    '12': {
        az: 0,
        pol: 80
    },
    '13': {
        az: -45,
        pol: 80
    },
    '14': {
        az: -70,
        pol: 90
    },
    '15': {
        az: -70,
        pol: 90
    },
    '16': {
        az: -70,
        pol: 90
    },
    '17': {
        az: -80,
        pol: 90
    },
    '18': {
        az: -70,
        pol: 90
    },
    // Upper Left (Quadrant 2) — anterior pol=80°, posterior pol=90°
    '21': {
        az: 0,
        pol: 80
    },
    '22': {
        az: 0,
        pol: 80
    },
    '23': {
        az: 45,
        pol: 80
    },
    '24': {
        az: 70,
        pol: 90
    },
    '25': {
        az: 70,
        pol: 90
    },
    '26': {
        az: 70,
        pol: 90
    },
    '27': {
        az: 80,
        pol: 90
    },
    '28': {
        az: 70,
        pol: 90
    },
    // Lower Left (Quadrant 3) — all pol=90°
    '31': {
        az: 20,
        pol: 90
    },
    '32': {
        az: 0,
        pol: 90
    },
    '33': {
        az: 30,
        pol: 90
    },
    '34': {
        az: 50,
        pol: 90
    },
    '35': {
        az: 50,
        pol: 90
    },
    '36': {
        az: 65,
        pol: 90
    },
    '37': {
        az: 90,
        pol: 90
    },
    '38': {
        az: 90,
        pol: 90
    },
    // Lower Right (Quadrant 4) — all pol=90°
    '41': {
        az: -20,
        pol: 90
    },
    '42': {
        az: 0,
        pol: 90
    },
    '43': {
        az: -30,
        pol: 90
    },
    '44': {
        az: -50,
        pol: 90
    },
    '45': {
        az: -50,
        pol: 90
    },
    '46': {
        az: -65,
        pol: 90
    },
    '47': {
        az: -90,
        pol: 90
    },
    '48': {
        az: -90,
        pol: 90
    }
};
function getFrontAzimuth(fdi) {
    const v = FRONT_VIEWS[fdi];
    return v ? v.az * Math.PI / 180 : undefined;
}
function getFrontPolar(fdi) {
    const v = FRONT_VIEWS[fdi];
    return v ? v.pol * Math.PI / 180 : Math.PI * 0.5;
}
function tintShader(material, flags = {}) {
    const mat = material;
    // Crown / Missing / Denture need transparency — mirror main tooth shader behaviour.
    if (flags.isCrown || flags.isMissing || flags.isDenture || flags.isRCT || flags.isBridge) {
        mat.transparent = true;
        mat.depthWrite = false;
    }
    mat.onBeforeCompile = (shader)=>{
        shader.uniforms.uIsCrown = {
            value: flags.isCrown ? 1.0 : 0.0
        };
        shader.uniforms.uIsRCT = {
            value: flags.isRCT ? 1.0 : 0.0
        };
        shader.uniforms.uIsMissing = {
            value: flags.isMissing ? 1.0 : 0.0
        };
        shader.uniforms.uIsImplant = {
            value: flags.isImplant ? 1.0 : 0.0
        };
        shader.uniforms.uIsBridge = {
            value: flags.isBridge ? 1.0 : 0.0
        };
        shader.uniforms.uIsDenture = {
            value: flags.isDenture ? 1.0 : 0.0
        };
        shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>
       uniform float uIsCrown;
       uniform float uIsRCT;
       uniform float uIsMissing;
       uniform float uIsImplant;
       uniform float uIsBridge;
       uniform float uIsDenture;`);
        shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>
       // Missing: red tint + alpha reduction
       if (uIsMissing > 0.5) {
         float lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
         vec3 redTint = vec3(lum * 0.95 + 0.15, lum * 0.75 + 0.05, lum * 0.72 + 0.03);
         gl_FragColor.rgb = mix(gl_FragColor.rgb, redTint, 0.45);
         gl_FragColor.a *= 0.55;
       }
       // Crown: semi-transparent grayish porcelain
       if (uIsCrown > 0.5) {
         gl_FragColor.a = min(gl_FragColor.a, 0.72);
         vec3 crownGrayTint = vec3(0.85, 0.85, 0.87);
         float lumC = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
         vec3 crownTinted = crownGrayTint * (lumC * 0.55 + 0.45);
         gl_FragColor.rgb = mix(gl_FragColor.rgb, crownTinted, 0.55);
       }
       // RCT: desaturated warm
       if (uIsRCT > 0.5) {
         gl_FragColor.a *= 0.85;
         float lumR = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
         vec3 rctTint = vec3(0.92, 0.90, 0.87) * (lumR * 0.7 + 0.3);
         gl_FragColor.rgb = mix(gl_FragColor.rgb, rctTint, 0.45);
       }
       // Bridge: grayish prosthetic
       if (uIsBridge > 0.5) {
         vec3 bridgeTint = vec3(0.82, 0.83, 0.85);
         float lumB = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
         gl_FragColor.rgb = mix(gl_FragColor.rgb, bridgeTint * (lumB * 0.6 + 0.5), 0.5);
       }
       // Denture: pink-hued translucent
       if (uIsDenture > 0.5) {
         vec3 dentureTint = vec3(0.96, 0.78, 0.80);
         float lumD = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
         gl_FragColor.rgb = mix(gl_FragColor.rgb, dentureTint * (lumD * 0.6 + 0.5), 0.45);
         gl_FragColor.a *= 0.75;
       }
       // Implant: cool desaturated (preview-only; real implant uses separate mesh)
       if (uIsImplant > 0.5) {
         float lumI = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
         vec3 greyTint = vec3(lumI * 0.85 + 0.18);
         gl_FragColor.rgb = mix(gl_FragColor.rgb, greyTint, 0.4);
       }`);
    };
    mat.needsUpdate = true;
}
function cloneSceneWithUniqueMaterials(scene) {
    const root = scene.clone(true);
    root.traverse((obj)=>{
        const mesh = obj;
        if (!mesh.isMesh || !mesh.material) return;
        const mat = mesh.material;
        if (Array.isArray(mat)) mesh.material = mat.map((m)=>m.clone());
        else mesh.material = mat.clone();
    });
    return root;
}
function disposeClonedScene(root) {
    root.traverse((obj)=>{
        const mesh = obj;
        if (!mesh.isMesh) return;
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach((m)=>m.dispose());
        else mat?.dispose();
    });
}
function collectZoneMaterials(root) {
    const out = [];
    const seen = new Set();
    root.traverse((obj)=>{
        const mesh = obj;
        if (!mesh.isMesh || !mesh.material) return;
        const mats = Array.isArray(mesh.material) ? mesh.material : [
            mesh.material
        ];
        for (const m of mats){
            if (seen.has(m)) continue;
            seen.add(m);
            const std = m;
            const phy = m;
            if (std.isMeshStandardMaterial || phy.isMeshPhysicalMaterial) {
                out.push(m);
            }
        }
    });
    return out;
}
/** Rotate a horizontal (XZ) unit direction around world +Y (right-hand rule). */ function rotateDirXZ(v, yawRad) {
    if (yawRad === 0) return v.clone();
    const c = Math.cos(yawRad);
    const s = Math.sin(yawRad);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](v.x * c + v.z * s, v.y, -v.x * s + v.z * c).normalize();
}
/**
 * Compute zone direction vectors from a front-view azimuth.
 * The front-view azimuth is the camera theta (spherical) when looking at the labial/buccal face.
 * Camera at theta is at position (sin(theta), 0, cos(theta)) in XZ plane.
 * Buccal direction = outward normal of buccal face = toward the camera = (sin(az), 0, cos(az))
 */ function surfaceDirsFromFrontAzimuth(frontAz, q) {
    // Buccal/labial points toward the camera at the front view
    const buccal = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](Math.sin(frontAz), 0, Math.cos(frontAz)).normalize();
    // Lingual is opposite
    const lingual = buccal.clone().negate();
    // Mesial points toward midline — perpendicular to buccal, toward +X for right quadrant, -X for left
    const mx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPatientRightQuadrant"])(q) ? 1 : -1;
    // Cross product of buccal with Y-up gives the perpendicular horizontal direction
    const perp = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0), buccal).normalize();
    // Choose the perpendicular that points in the mesial direction
    const mesial = perp.dot(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](mx, 0, 0)) > 0 ? perp : perp.clone().negate();
    const distal = mesial.clone().negate();
    return {
        buccal,
        lingual,
        mesial,
        distal
    };
}
function surfaceDirsForQuadrant(q, yawRad = 0) {
    const mx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPatientRightQuadrant"])(q) ? 1 : -1;
    const base = {
        mesial: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](mx, 0, 0),
        distal: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-mx, 0, 0),
        buccal: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1),
        lingual: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -1)
    };
    if (yawRad === 0) return base;
    return {
        mesial: rotateDirXZ(base.mesial, yawRad),
        distal: rotateDirXZ(base.distal, yawRad),
        buccal: rotateDirXZ(base.buccal, yawRad),
        lingual: rotateDirXZ(base.lingual, yawRad)
    };
}
/** Get the best surface directions for a tooth — uses calibrated front azimuth if available */ const _dirsCache = new Map();
function getDirsForTooth(fdi, quadrant, yawRad) {
    const key = `${fdi}-${quadrant}-${yawRad}`;
    const cached = _dirsCache.get(key);
    if (cached) return cached;
    const frontAz = getFrontAzimuth(fdi);
    const result = frontAz !== undefined ? surfaceDirsFromFrontAzimuth(frontAz, quadrant) : surfaceDirsForQuadrant(quadrant, yawRad);
    _dirsCache.set(key, result);
    return result;
}
function zoneYawForTooth(positionInQuadrant, quadrant) {
    return 0; // No longer using generic yaw — using per-tooth front azimuths instead
}
function crownSideFromNormalAndPoint(point, normal, centerX, centerZ, dirs) {
    const nH = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](normal.x, 0, normal.z);
    const fromC = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](point.x - centerX, 0, point.z - centerZ);
    const guide = nH.length() > 0.18 ? nH.normalize() : fromC.length() > 1e-5 ? fromC.normalize() : dirs.lingual.clone();
    const scores = [
        [
            'mesial',
            guide.dot(dirs.mesial)
        ],
        [
            'distal',
            guide.dot(dirs.distal)
        ],
        [
            'buccal',
            guide.dot(dirs.buccal)
        ],
        [
            'lingual',
            guide.dot(dirs.lingual)
        ]
    ];
    scores.sort((a, b)=>b[1] - a[1]);
    return scores[0][0];
}
const ZONE_ORBIT = {
    occlusal: {
        azimuth: 0,
        polar: Math.PI * 0.88
    },
    buccal: {
        azimuth: Math.PI,
        polar: Math.PI * 0.55
    },
    lingual: {
        azimuth: 0,
        polar: Math.PI * 0.55
    },
    mesial: {
        azimuth: Math.PI * 0.5,
        polar: Math.PI * 0.55
    },
    distal: {
        azimuth: -Math.PI * 0.5,
        polar: Math.PI * 0.55
    },
    cervical: {
        azimuth: Math.PI * 0.8,
        polar: Math.PI * 0.48
    },
    root: {
        azimuth: Math.PI * 0.15,
        polar: Math.PI * 0.28
    },
    whole: {
        azimuth: 0,
        polar: Math.PI * 0.5
    }
};
function smoothstep(t) {
    const c = Math.max(0, Math.min(1, t));
    return c * c * (3 - 2 * c);
}
function lerpAngle(a, b, t) {
    let d = b - a;
    while(d > Math.PI)d -= Math.PI * 2;
    while(d < -Math.PI)d += Math.PI * 2;
    return a + d * t;
}
// ══════════════════════════════════════════════════════════════
// SHADER — per-fragment position-based zones
// Hard cuts, solid coverage, no gaps
// Uses both Y-position AND normal for occlusal (captures full chewing surface)
// ══════════════════════════════════════════════════════════════
// Pre-compute zone color vectors once (avoids allocating 7 Vector3s per material per frame)
const _cachedColorVecs = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_ZONES"].map((z)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZONE_INFO"][z].colorVec));
const WHOLE_TOOTH_COLOR = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZONE_INFO"].whole.colorVec);
const _warmedShaderVariants = new Set();
function getDentalShaderVariantKey(flags) {
    return [
        flags.isImplant ? 'i1' : 'i0',
        flags.isMissing ? 'm1' : 'm0',
        flags.isCrown ? 'c1' : 'c0',
        flags.isRCT ? 'r1' : 'r0',
        flags.isBridge ? 'b1' : 'b0',
        flags.isDenture ? 'd1' : 'd0'
    ].join('|');
}
function prewarmDentalShaderProgram({ gl, camera, source, variantKey }) {
    if (_warmedShaderVariants.has(variantKey)) return;
    try {
        const warmupScene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
        // Clone keeps material refs so we compile the same shader programs.
        const warmupRoot = source.clone(true);
        warmupScene.add(warmupRoot);
        gl.compile(warmupScene, camera);
        warmupScene.remove(warmupRoot);
        _warmedShaderVariants.add(variantKey);
    } catch  {
    // Best-effort optimization only; normal render path remains valid.
    }
}
function injectShader(material, cervicalY, cejY, crownBottomY, centerX, centerZ, arch, quadrant, zoneYawRad, toothFdi = '16', isImplant = false, isMissing = false, isCrown = false, isRCT = false, isBridge = false, isDenture = false, /** Per-zone flags: true if that zone has a finding/note (light persistent tint) */ zonesWithFindings = [
    false,
    false,
    false,
    false,
    false,
    false,
    false
]) {
    const ref = {
        shader: null
    };
    const mat = material;
    const colorVecs = _cachedColorVecs;
    const dirs = getDirsForTooth(toothFdi, quadrant, zoneYawRad);
    // Critical: ensure Three.js does not reuse a stale non-dental shader program
    // across tab/type switches. Without a dedicated key, onBeforeCompile can be
    // bypassed by program cache hits, causing missing dentition colors until remount.
    mat.customProgramCacheKey = ()=>'tp-dental-zone-shader-v1';
    mat.onBeforeCompile = (shader)=>{
        ref.shader = shader;
        shader.uniforms.selectedZone = {
            value: -1
        };
        shader.uniforms.hoveredZone = {
            value: -1
        };
        shader.uniforms.zoneColors = {
            value: colorVecs
        };
        shader.uniforms.uCejY = {
            value: cejY
        };
        shader.uniforms.uCervicalY = {
            value: cervicalY
        };
        const crownH = Math.abs(cervicalY - crownBottomY);
        const occlusalTop = arch === 'maxillary' ? crownBottomY + crownH * 0.45 : crownBottomY - crownH * 0.45;
        shader.uniforms.uOcclusalTop = {
            value: occlusalTop
        };
        shader.uniforms.uCenterX = {
            value: centerX
        };
        shader.uniforms.uCenterZ = {
            value: centerZ
        };
        shader.uniforms.uYDir = {
            value: arch === 'maxillary' ? 1.0 : -1.0
        };
        shader.uniforms.uMesialDir = {
            value: dirs.mesial
        };
        shader.uniforms.uDistalDir = {
            value: dirs.distal
        };
        shader.uniforms.uBuccalDir = {
            value: dirs.buccal
        };
        shader.uniforms.uLingualDir = {
            value: dirs.lingual
        };
        shader.uniforms.uIsImplant = {
            value: isImplant ? 1.0 : 0.0
        };
        shader.uniforms.uIsMissing = {
            value: isMissing ? 1.0 : 0.0
        };
        shader.uniforms.uIsCrown = {
            value: isCrown ? 1.0 : 0.0
        };
        shader.uniforms.uIsRCT = {
            value: isRCT ? 1.0 : 0.0
        };
        shader.uniforms.uIsBridge = {
            value: isBridge ? 1.0 : 0.0
        };
        shader.uniforms.uIsDenture = {
            value: isDenture ? 1.0 : 0.0
        };
        shader.uniforms.uWholeToothSelected = {
            value: 0.0
        };
        shader.uniforms.uWholeToothMarked = {
            value: 0.0
        };
        shader.uniforms.uWholeToothColor = {
            value: WHOLE_TOOTH_COLOR
        };
        const zf = new Array(7).fill(0);
        for(let i = 0; i < Math.min(zonesWithFindings.length, 7); i++)zf[i] = zonesWithFindings[i] ? 1 : 0;
        shader.uniforms.uZoneHasFinding = {
            value: zf
        };
        shader.vertexShader = shader.vertexShader.replace('#include <common>', `#include <common>
       varying vec3 vWorldPos;
       varying vec3 vWorldNorm;
       uniform int selectedZone;
       uniform int hoveredZone;
       uniform float uCejY;
       uniform float uCervicalY;
       uniform float uOcclusalTop;
       uniform float uCenterX;
       uniform float uCenterZ;
       uniform float uYDir;
       uniform vec3 uMesialDir;
       uniform vec3 uDistalDir;
       uniform vec3 uBuccalDir;
       uniform vec3 uLingualDir;
       uniform float uIsImplant;
       uniform float uIsMissing;
       uniform float uIsCrown;
       uniform float uIsRCT;
       uniform float uIsBridge;
       uniform float uIsDenture;
       uniform float uWholeToothSelected;
       uniform float uWholeToothMarked;`);
        shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
       vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
       vWorldNorm = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

       // ── Compute zone in vertex shader for displacement ──
       float vy = vWorldPos.y;
       vec3 vwn = vWorldNorm;
       int vZone = -1;
       bool vIsRoot = (uYDir > 0.0) ? (vy >= uCejY) : (vy <= uCejY);
       bool vIsCervical = (uYDir > 0.0) ? (vy >= uCervicalY && vy < uCejY) : (vy <= uCervicalY && vy > uCejY);
       bool vIsOccY = (uYDir > 0.0) ? (vy < uOcclusalTop) : (vy > uOcclusalTop);
       bool vIsCrown = (uYDir > 0.0) ? (vy < uCervicalY) : (vy > uCervicalY);
       bool vIsOccN = (uYDir > 0.0) ? (vwn.y < -0.45) : (vwn.y > 0.45);

       if (vIsRoot) vZone = 6;
       else if (vIsCervical) vZone = 5;
       else if (vIsOccY || (vIsOccN && vIsCrown)) vZone = 0;
       else {
         vec3 vnH = vec3(vwn.x, 0.0, vwn.z);
         vec3 vFromC = vec3(vWorldPos.x - uCenterX, 0.0, vWorldPos.z - uCenterZ);
         float vLenH = length(vnH);
         float vLenC = length(vFromC);
         vec3 vGuide = vLenH > 0.18 ? normalize(vnH) : (vLenC > 1e-5 ? normalize(vFromC) : uLingualDir);
         float vdm = dot(vGuide, uMesialDir);
         float vdd = dot(vGuide, uDistalDir);
         float vdb = dot(vGuide, uBuccalDir);
         float vdl = dot(vGuide, uLingualDir);
         float vBest = vdm;
         vZone = 3;
         if (vdd > vBest) { vBest = vdd; vZone = 4; }
         if (vdb > vBest) { vBest = vdb; vZone = 1; }
         if (vdl > vBest) { vBest = vdl; vZone = 2; }
       }

       // ── Displacement: push outward along normal when zone is active ──
       float bulge = 0.0;
       if (uIsImplant > 0.5 && (vZone == 5 || vZone == 6)) bulge = 0.0;
       else if (uWholeToothSelected > 0.5) bulge = 0.008;
       else if (selectedZone == vZone) bulge = 0.012;
       else if (hoveredZone == vZone) bulge = 0.006;

       // Crown cap: extends past cervical into root, smooth bulge, no rim lip
       if (uIsCrown > 0.5) {
         // Extend 0.06 past cervical into root area
         float capEdge = (uYDir > 0.0) ? uCervicalY + 0.06 : uCervicalY - 0.06;
         bool inCapZone = (uYDir > 0.0) ? (vy <= capEdge) : (vy >= capEdge);
         if (inCapZone) {
           float crownDist;
           if (uYDir > 0.0) {
             crownDist = smoothstep(capEdge, capEdge - 0.03, vy);
           } else {
             crownDist = smoothstep(capEdge, capEdge + 0.03, vy);
           }
           // Smooth uniform bulge — no rim lip
           bulge += 0.09 * crownDist;
         }
       }
       // Bridge: thick porcelain shell with sharp bottom edge
       if (uIsBridge > 0.5 && vIsCrown) {
         float bridgeDist;
         if (uYDir > 0.0) {
           bridgeDist = smoothstep(uCervicalY, uCervicalY - 0.015, vy);
         } else {
           bridgeDist = smoothstep(uCervicalY, uCervicalY + 0.015, vy);
         }
         float rimProx;
         if (uYDir > 0.0) {
           rimProx = smoothstep(uCervicalY - 0.15, uCervicalY - 0.015, vy);
         } else {
           rimProx = smoothstep(uCervicalY + 0.15, uCervicalY + 0.015, vy);
         }
         bulge += (0.05 + 0.03 * rimProx) * bridgeDist;
       }

       transformed += normal * bulge;`);
        shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>
       varying vec3 vWorldPos;
       varying vec3 vWorldNorm;
       uniform int selectedZone;
       uniform int hoveredZone;
       uniform vec3 zoneColors[7];
       uniform float uCejY;
       uniform float uCervicalY;
       uniform float uOcclusalTop;
       uniform float uCenterX;
       uniform float uCenterZ;
       uniform float uYDir;
       uniform vec3 uMesialDir;
       uniform vec3 uDistalDir;
       uniform vec3 uBuccalDir;
       uniform vec3 uLingualDir;
       uniform float uIsImplant;
       uniform float uIsMissing;
       uniform float uIsCrown;
       uniform float uIsRCT;
       uniform float uIsBridge;
       uniform float uIsDenture;
       uniform float uWholeToothSelected;
       uniform float uWholeToothMarked;
       uniform vec3 uWholeToothColor;
       uniform int uZoneHasFinding[7];`);
        shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>

       // ── Implant mode: discard cervical + root fragments ──
       if (uIsImplant > 0.5) {
         if (uYDir > 0.0) {
           if (vWorldPos.y >= uCervicalY) discard;
         } else {
           if (vWorldPos.y <= uCervicalY) discard;
         }
       }

       // ══ TOOTH RENDERING — depth & shadow, no gloss ══
       vec3 N = normalize(vWorldNorm);
       vec3 V = normalize(cameraPosition - vWorldPos);

       // ── Crown-Root blend ──
       // For maxillary (uYDir>0): root is at high Y, crown at low Y
       //   cejBlend goes 0 (crown/bottom) → 1 (root/top)
       // For mandibular (uYDir<0): root is at low Y, crown at high Y
       //   Need cejBlend 0 (crown/top) → 1 (root/bottom)
       float cejBlend;
       if (uYDir > 0.0) {
         // Maxillary: crown at bottom, root at top
         cejBlend = smoothstep(uCervicalY - 0.02, uCejY + 0.01, vWorldPos.y);
       } else {
         // Mandibular: crown at TOP (high Y), root at BOTTOM (low Y)
         // So as Y decreases past cervical toward CEJ, we go into root
         cejBlend = 1.0 - smoothstep(uCejY - 0.01, uCervicalY + 0.02, vWorldPos.y);
       }

       // ── CROWN: off-white, matte ──
       vec3 crownColor = vec3(0.95, 0.93, 0.90);

       // ── ROOT: warm tan, gradient darker toward apex ──
       vec3 rootLight = vec3(0.85, 0.78, 0.67);
       vec3 rootDark = vec3(0.76, 0.66, 0.52);
       vec3 rootColor = mix(rootLight, rootDark, cejBlend * 0.4);

       vec3 baseColor = mix(crownColor, rootColor, cejBlend);

       // ── CERVICAL: gentle warm tint that blends smoothly into crown and root ──
       float cervicalMask;
       if (uYDir > 0.0) {
         // Wide smooth bell curve centered at the CEJ midpoint
         float mid = (uCervicalY + uCejY) * 0.5;
         float spread = abs(uCejY - uCervicalY) * 1.2;
         cervicalMask = exp(-pow((vWorldPos.y - mid) / spread, 2.0) * 3.0);
       } else {
         float mid = (uCervicalY + uCejY) * 0.5;
         float spread = abs(uCejY - uCervicalY) * 1.2;
         cervicalMask = exp(-pow((vWorldPos.y - mid) / spread, 2.0) * 3.0);
       }
       vec3 cervicalTint = vec3(0.88, 0.80, 0.68);
       baseColor = mix(baseColor, cervicalTint, cervicalMask * 0.35);

       // ── Depth shading: ONLY subtract shadows, keep base bright ──
       vec3 L = normalize(vec3(2.0, 4.0, 3.0));
       float NdotL = max(0.0, dot(N, L));
       // ── Apply tooth color tint ──
       // All diagnoses keep natural tooth color/texture
       {
         gl_FragColor.rgb = gl_FragColor.rgb * baseColor * 1.5;
         gl_FragColor.rgb = min(gl_FragColor.rgb, vec3(1.0));
       }
       float y = vWorldPos.y;
       vec3 wn = normalize(vWorldNorm);
       int zone = -1;

       // uYDir: 1.0=maxillary (root > cej > cervical > crown > occlusal, going up)
       //       -1.0=mandibular (occlusal > crown > cervical > cej > root, going up)
       // Normalize to a common direction: multiply y comparisons by uYDir

       bool isRoot = (uYDir > 0.0) ? (y >= uCejY) : (y <= uCejY);
       bool isCervical = (uYDir > 0.0) ? (y >= uCervicalY && y < uCejY) : (y <= uCervicalY && y > uCejY);
       bool isOcclusalY = (uYDir > 0.0) ? (y < uOcclusalTop) : (y > uOcclusalTop);

       if (isRoot) {
         zone = 6;
       } else if (isCervical) {
         zone = 5;
       } else {
         // Occlusal: PURE Y-position only — no normal-based extension
         // This guarantees zero lateral zone leakage into occlusal
         bool isOcclusal = isOcclusalY;

         if (isOcclusal) {
           zone = 0;
         } else {
           vec3 nH = vec3(wn.x, 0.0, wn.z);
           vec3 fromC = vec3(vWorldPos.x - uCenterX, 0.0, vWorldPos.z - uCenterZ);
           float lenH = length(nH);
           float lenC = length(fromC);
           vec3 guide = lenH > 0.18 ? normalize(nH) : (lenC > 1e-5 ? normalize(fromC) : uLingualDir);
           float dm = dot(guide, uMesialDir);
           float dd = dot(guide, uDistalDir);
           float db = dot(guide, uBuccalDir);
           float dl = dot(guide, uLingualDir);
           float best = dm;
           zone = 3;
           if (dd > best) { best = dd; zone = 4; }
           if (db > best) { best = db; zone = 1; }
           if (dl > best) { best = dl; zone = 2; }
         }
       }

       if (zone >= 0 && zone < 7) {
         vec3 zc = zoneColors[zone];
         // Clamped luminance so front-lit bright pixels still get a saturated
         // tint (instead of washing out to light zone color). Minimum 0.55.
         float lumZ = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
         float tintIntensity = clamp(lumZ * 0.45 + 0.55, 0.55, 1.0);
         vec3 tinted = zc * tintIntensity;
         // Boost tint mix ratios when tooth is rendered transparent (Crown/RCT/Bridge)
         float tBoost = (uIsCrown > 0.5 || uIsRCT > 0.5 || uIsBridge > 0.5) ? 0.22 : 0.0;
         if (selectedZone == zone) {
           gl_FragColor.rgb = mix(gl_FragColor.rgb, tinted, min(0.75 + tBoost, 0.95));
         } else if (hoveredZone == zone) {
           gl_FragColor.rgb = mix(gl_FragColor.rgb, tinted, min(0.45 + tBoost, 0.75));
         } else if (uZoneHasFinding[zone] > 0) {
           gl_FragColor.rgb = mix(gl_FragColor.rgb, tinted, min(0.28 + tBoost * 0.6, 0.55));
         }
       }

       if (uWholeToothSelected > 0.5 || uWholeToothMarked > 0.5) {
         float wholeMix = uWholeToothSelected > 0.5 ? 0.24 : 0.10;
         float wholeLum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
         vec3 wholeTint = uWholeToothColor * clamp(wholeLum * 0.45 + 0.55, 0.55, 1.0);
         gl_FragColor.rgb = mix(gl_FragColor.rgb, wholeTint, wholeMix);
       }

       // ══ TOOTH-LEVEL DIAGNOSIS VISUAL EFFECTS ══

       // Missing: keep texture visible with slight reddish tint, minimal X pattern
       if (uIsMissing > 0.5) {
         // Slight reddish tint while keeping texture detail visible
         float lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
         vec3 redTint = vec3(lum * 0.95 + 0.15, lum * 0.75 + 0.05, lum * 0.72 + 0.03);
         gl_FragColor.rgb = mix(gl_FragColor.rgb, redTint, 0.45);
         gl_FragColor.a *= 0.55;

         // Ultra-minimal X-cross pattern — very few, very faint thin lines
         vec2 uv2 = vec2(vWorldPos.x + vWorldPos.z, vWorldPos.y) * 3.0;
         float line1 = abs(fract(uv2.x + uv2.y) - 0.5);
         float line2 = abs(fract(uv2.x - uv2.y) - 0.5);
         float crossPattern = min(line1, line2);
         if (crossPattern < 0.018) {
           gl_FragColor.rgb *= 0.92;
         }
       }

       // Crown: transparent cap extending past cervical onto root, hard cut at bottom, closed top
       if (uIsCrown > 0.5) {
         // Crown extends 0.06 past cervical into root
         float crownEdge = (uYDir > 0.0) ? uCervicalY + 0.06 : uCervicalY - 0.06;
         bool crownCapArea = (uYDir > 0.0) ? (vWorldPos.y <= crownEdge) : (vWorldPos.y >= crownEdge);

         if (crownCapArea) {
           // Semi-transparent crown — tooth texture visible, stump visible inside
           gl_FragColor.a = 0.46;

           // Grayish tint on the crown outer shell (prosthetic look)
           vec3 crownGrayTint = vec3(0.85, 0.85, 0.87);
           float lumCrown = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
           vec3 crownTinted = crownGrayTint * (lumCrown * 0.55 + 0.45);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, crownTinted, 0.55);

           // Very subtle sparse grid pattern
           vec2 crownUV = vec2(vWorldPos.x + vWorldPos.z, vWorldPos.y) * 8.0;
           float gridX = abs(fract(crownUV.x) - 0.5);
           float gridY = abs(fract(crownUV.y) - 0.5);
           float gridLine = min(gridX, gridY);
           if (gridLine < 0.025) {
             gl_FragColor.rgb *= 0.975;
           }

           // Fresnel: edges slightly more opaque
           float fresnel = pow(1.0 - max(0.0, dot(N, V)), 2.5);
           gl_FragColor.a += fresnel * 0.15;
           gl_FragColor.a = min(gl_FragColor.a, 0.72);

           // Hard cut line at the bottom edge — sharp dark line where crown meets root
           float edgeDist = (uYDir > 0.0)
             ? smoothstep(crownEdge - 0.006, crownEdge, vWorldPos.y)
             : smoothstep(crownEdge + 0.006, crownEdge, vWorldPos.y);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.40, 0.38, 0.35), edgeDist * 0.8);
           gl_FragColor.a = mix(gl_FragColor.a, 0.95, edgeDist);

           // Back face: opaque to close the crown (solid top, not hollow) — grayish-tinted
           if (!gl_FrontFacing) {
             float lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
             gl_FragColor.rgb = vec3(0.85, 0.85, 0.87) * (lum * 0.3 + 0.7);
             gl_FragColor.a = 0.92;
           }
         }
       }

       // RCT: make tooth semi-transparent so the red root canals inside are clearly visible
       if (uIsRCT > 0.5) {
         gl_FragColor.a *= 0.68;
         // Slightly desaturate for a treated/devitalized look
         float lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
         vec3 rctTint = vec3(0.92, 0.90, 0.87) * (lum * 0.7 + 0.3);
         gl_FragColor.rgb = mix(gl_FragColor.rgb, rctTint, 0.35);
       }

       // Bridge: grayish prosthetic for crown, discard roots, dark sealed bottom
       if (uIsBridge > 0.5) {
         bool isRootArea = (uYDir > 0.0) ? (vWorldPos.y >= uCervicalY) : (vWorldPos.y <= uCervicalY);
         if (isRootArea) {
           discard;
         }
         if (gl_FrontFacing) {
           float lumBridge = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
           vec3 bridgeTint = vec3(0.82, 0.83, 0.85) * (lumBridge * 0.55 + 0.45);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, bridgeTint, 0.55);
         }
         // Back face = hollow interior retaining the inner tooth texture
         if (!gl_FrontFacing) {
           // Darken slightly to create depth/shadow for the hollow inside
           gl_FragColor.rgb *= 0.65;
         }
       }


       // Denture: pink acrylic tint on root, light artificial tint on crown — preserves texture
       if (uIsDenture > 0.5) {
         bool isRootArea = (uYDir > 0.0) ? (vWorldPos.y >= uCervicalY) : (vWorldPos.y <= uCervicalY);
         if (isRootArea) {
           float lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
           vec3 acrylicPink = vec3(0.85, 0.55, 0.58) * (lum * 0.45 + 0.55);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, acrylicPink, 0.5);
         } else {
           float lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
           vec3 artificialTint = vec3(0.96, 0.95, 0.93) * (lum * 0.4 + 0.6);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, artificialTint, 0.3);
         }
       }`);
    };
    // Always reset material state before enabling diagnosis-specific flags.
    // Without this reset, tab/scope switches can leave stale transparent/double-sided
    // settings on materials and cause incorrect full-tooth tinting.
    mat.transparent = false;
    mat.opacity = 1;
    mat.depthWrite = true;
    mat.side = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FrontSide"];
    // Enable transparency for diagnoses that need it (Crown = slightly transparent crown portion only)
    if (isMissing || isRCT || isDenture || isCrown) {
        mat.transparent = true;
    }
    // DoubleSide only where shell/interior rendering is needed.
    if (isCrown || isBridge || isDenture) {
        mat.side = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"];
    }
    mat.needsUpdate = true;
    return ref;
}
function classifyHit(point, faceNormal, cervicalY, cejY, occlusalTop, centerX, centerZ, arch, quadrant, zoneYawRad, toothFdi = '16') {
    const isMax = arch === 'maxillary';
    const isRoot = isMax ? point.y >= cejY : point.y <= cejY;
    const isCervical = isMax ? point.y >= cervicalY && point.y < cejY : point.y <= cervicalY && point.y > cejY;
    const isOcclusalY = isMax ? point.y < occlusalTop : point.y > occlusalTop;
    if (isRoot) return 'root';
    if (isCervical) return 'cervical';
    if (isOcclusalY) return 'occlusal';
    const dirs = getDirsForTooth(toothFdi, quadrant, zoneYawRad);
    return crownSideFromNormalAndPoint(point, faceNormal, centerX, centerZ, dirs);
}
const IMPLANT_TOP_Y = 0;
const IMPLANT_TOP_DIAM = 1;
const IMPLANT_CENTER_X = 0;
const IMPLANT_CENTER_Z = 0;
const ImplantScrew = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s(function ImplantScrew({ placement, arch, implantScene, toothMesh, bb, parentGroup }) {
    _s();
    const isMax = arch === 'maxillary';
    // ── Part A: Abutment Base (PreparedStump-like tooth-shaped platform) ──
    const abutmentGeo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ImplantScrew.ImplantScrew.useMemo[abutmentGeo]": ()=>{
            if (!toothMesh?.geometry || !bb) return null;
            const { cervicalY, centerX, centerZ } = placement;
            const srcGeo = toothMesh.geometry.clone();
            // Use relative transform if parentGroup is available (dentition view),
            // otherwise fall back to world-space (single-tooth view)
            if (parentGroup) {
                const groupInverse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().copy(parentGroup.matrixWorld).invert();
                const relativeMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().multiplyMatrices(groupInverse, toothMesh.matrixWorld);
                srcGeo.applyMatrix4(relativeMatrix);
            } else {
                srcGeo.applyMatrix4(toothMesh.matrixWorld);
            }
            const posAttr = srcGeo.attributes.position;
            // Transform reference points to same space
            const groupInv = parentGroup ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().copy(parentGroup.matrixWorld).invert() : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"](); // identity for world-space
            const localCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](centerX, cervicalY, centerZ);
            if (parentGroup) localCenter.applyMatrix4(groupInv);
            const localCervicalY = localCenter.y;
            const localBBmin = bb.min.clone();
            const localBBmax = bb.max.clone();
            if (parentGroup) {
                localBBmin.applyMatrix4(groupInv);
                localBBmax.applyMatrix4(groupInv);
            }
            const localCrownEnd = isMax ? Math.min(localBBmin.y, localBBmax.y) : Math.max(localBBmin.y, localBBmax.y);
            const localCrownHeight = Math.abs(localCervicalY - localCrownEnd);
            const localStumpHeight = localCrownHeight * 0.40; // fill crown shell to close hollow gap
            const localCutY = isMax ? localCervicalY - localStumpHeight : localCervicalY + localStumpHeight;
            // Compute centroid near cervical for scaling pivot
            const cervBand = localStumpHeight * 0.5;
            let sumX = 0, sumZ = 0, count = 0;
            for(let i = 0; i < posAttr.count; i++){
                const vy = posAttr.getY(i);
                if (Math.abs(vy - localCervicalY) < cervBand) {
                    sumX += posAttr.getX(i);
                    sumZ += posAttr.getZ(i);
                    count++;
                }
            }
            const cx = count > 0 ? sumX / count : localCenter.x;
            const cz = count > 0 ? sumZ / count : localCenter.z;
            // Root-side limit: the abutment extends from inside the crown (localCutY)
            // through cervicalY and slightly past into the root zone.
            // This overlap ensures no hollow gap between crown bottom and abutment top.
            const rootOverlapLocal = 0.10; // generous overlap past cervical into root
            const rootLimitLocal = isMax ? localCervicalY + rootOverlapLocal // past cervical into root (maxillary: root is above)
             : localCervicalY - rootOverlapLocal; // past cervical into root (mandibular: root is below)
            // Scale/taper vertices — same approach as PreparedStump
            for(let i = 0; i < posAttr.count; i++){
                const x = posAttr.getX(i);
                const y = posAttr.getY(i);
                const z = posAttr.getZ(i);
                let t;
                if (isMax) {
                    t = (localCervicalY - y) / localStumpHeight;
                } else {
                    t = (y - localCervicalY) / localStumpHeight;
                }
                let scale;
                if (t <= 0) {
                    scale = 0.96; // near-flush with tooth surface at cervical
                } else if (t <= 0.2) {
                    const blend = t / 0.2;
                    scale = 0.96 + (0.78 - 0.96) * blend;
                } else {
                    const tc = Math.min((t - 0.2) / 0.8, 1);
                    scale = 0.78 - tc * 0.25;
                }
                const nx = cx + (x - cx) * scale;
                const nz = cz + (z - cz) * scale;
                let ny = y;
                if (isMax && y < localCutY) ny = localCutY;
                if (!isMax && y > localCutY) ny = localCutY;
                if (isMax && y > rootLimitLocal) ny = rootLimitLocal;
                if (!isMax && y < rootLimitLocal) ny = rootLimitLocal;
                posAttr.setXYZ(i, nx, ny, nz);
            }
            posAttr.needsUpdate = true;
            // Remove degenerate root triangles
            const clampEps = 0.001;
            const indexAttr = srcGeo.index;
            if (indexAttr) {
                const indices = [];
                for(let f = 0; f < indexAttr.count; f += 3){
                    const i0 = indexAttr.getX(f);
                    const i1 = indexAttr.getX(f + 1);
                    const i2 = indexAttr.getX(f + 2);
                    const y0 = posAttr.getY(i0);
                    const y1 = posAttr.getY(i1);
                    const y2 = posAttr.getY(i2);
                    const allAtRoot = Math.abs(y0 - rootLimitLocal) < clampEps && Math.abs(y1 - rootLimitLocal) < clampEps && Math.abs(y2 - rootLimitLocal) < clampEps;
                    if (!allAtRoot) {
                        indices.push(i0, i1, i2);
                    }
                }
                srcGeo.setIndex(indices);
            }
            srcGeo.computeVertexNormals();
            return {
                geo: srcGeo,
                cx,
                cz,
                localCervicalY,
                localCutY
            };
        }
    }["ImplantScrew.ImplantScrew.useMemo[abutmentGeo]"], [
        toothMesh,
        bb,
        placement,
        arch,
        isMax,
        parentGroup
    ]);
    // ── Part B: Cylindrical Screw Body with helical threads ──
    const screwData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ImplantScrew.ImplantScrew.useMemo[screwData]": ()=>{
            if (!abutmentGeo || !bb) return null;
            const { localCutY, cx, cz } = abutmentGeo;
            const groupInv = parentGroup ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().copy(parentGroup.matrixWorld).invert() : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
            const localBBmin = bb.min.clone();
            const localBBmax = bb.max.clone();
            if (parentGroup) {
                localBBmin.applyMatrix4(groupInv);
                localBBmax.applyMatrix4(groupInv);
            }
            const localRootEnd = isMax ? Math.max(localBBmin.y, localBBmax.y) : Math.min(localBBmin.y, localBBmax.y);
            // Detect thin teeth (lower incisors T31/T32/T41/T42): cervicalDiam < 0.35.
            // Shorten screw length and tighten threads to keep geometry inside root.
            const isThinTooth = placement.cervicalDiam < 0.35;
            const lengthFactor = isThinTooth ? 0.78 : 0.92;
            const screwLength = Math.abs(localRootEnd - localCutY) * lengthFactor;
            // Measure the abutment base width at cutY to match the screw top
            const abutPos = abutmentGeo.geo.attributes.position;
            const cutEps = 0.02;
            let maxRadSq = 0;
            for(let i = 0; i < abutPos.count; i++){
                const vy = abutPos.getY(i);
                if (Math.abs(vy - localCutY) < cutEps) {
                    const dx = abutPos.getX(i) - cx;
                    const dz = abutPos.getZ(i) - cz;
                    const rSq = dx * dx + dz * dz;
                    if (rSq > maxRadSq) maxRadSq = rSq;
                }
            }
            // Use abutment base radius (matched) or fallback. Clamp against cervicalDiam
            // so thin teeth cannot get oversized screws that leak outside the root.
            const baseRadius = maxRadSq > 0 ? Math.sqrt(maxRadSq) : placement.cervicalDiam * 0.28;
            const maxRadiusAllowed = placement.cervicalDiam * 0.24;
            const radius = Math.min(baseRadius * 0.82, maxRadiusAllowed);
            // Build cylinder with helical screw threads
            const segs = 32;
            const rings = 40; // more rings for visible threads
            const threads = 10; // thread cycles
            const threadDepth = radius * 0.09; // tighter thread bump (was 0.12) — less edge noise
            const step = Math.PI * 2 / segs;
            const verts = [], norms = [], idx = [];
            for(let r = 0; r <= rings; r++){
                const t = r / rings; // 0 = top, 1 = bottom
                const y = isMax ? localCutY + t * screwLength : localCutY - t * screwLength;
                // Slight taper at very tip for realism (last 15%)
                const tipTaper = t > 0.85 ? 1.0 - (t - 0.85) / 0.15 * 0.35 : 1.0;
                for(let s = 0; s < segs; s++){
                    const a = s * step;
                    // Helical thread: phase varies with both ring position AND angle
                    const helixPhase = t * threads * Math.PI * 2 + a;
                    const threadBump = t > 0.03 && t < 0.90 ? Math.max(0, Math.sin(helixPhase)) * threadDepth : 0;
                    const rad = (radius + threadBump) * tipTaper;
                    verts.push(cx + Math.cos(a) * rad, y, cz + Math.sin(a) * rad);
                    // Normal: radial outward + slight thread normal
                    const nx = Math.cos(a), nz = Math.sin(a);
                    norms.push(nx, 0, nz);
                }
            }
            // Top cap center
            const topI = verts.length / 3;
            verts.push(cx, localCutY, cz);
            norms.push(0, isMax ? -1 : 1, 0);
            // Bottom tip center
            const botI = verts.length / 3;
            const botY = isMax ? localCutY + screwLength : localCutY - screwLength;
            verts.push(cx, botY, cz);
            norms.push(0, isMax ? 1 : -1, 0);
            // Side quads
            for(let r = 0; r < rings; r++){
                for(let s = 0; s < segs; s++){
                    const ns = (s + 1) % segs;
                    const a = r * segs + s, b = r * segs + ns;
                    const c = (r + 1) * segs + s, d = (r + 1) * segs + ns;
                    idx.push(a, b, c, b, d, c);
                }
            }
            // Top cap
            for(let s = 0; s < segs; s++){
                const ns = (s + 1) % segs;
                isMax ? idx.push(topI, ns, s) : idx.push(topI, s, ns);
            }
            // Bottom cap
            const last = rings * segs;
            for(let s = 0; s < segs; s++){
                const ns = (s + 1) % segs;
                isMax ? idx.push(botI, last + s, last + ns) : idx.push(botI, last + ns, last + s);
            }
            const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            geo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](verts, 3));
            geo.setAttribute('normal', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](norms, 3));
            geo.setIndex(idx);
            geo.computeVertexNormals();
            return geo;
        }
    }["ImplantScrew.ImplantScrew.useMemo[screwData]"], [
        abutmentGeo,
        bb,
        placement,
        arch,
        isMax,
        parentGroup
    ]);
    // Opaque metallic material — NO transparency
    const metalMat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ImplantScrew.ImplantScrew.useMemo[metalMat]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: 0xb8c0c8,
                metalness: 0.75,
                roughness: 0.28,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
            })
    }["ImplantScrew.ImplantScrew.useMemo[metalMat]"], []);
    // Cap disc to close the bottom of the abutment (no hollow gap visible from below)
    const capGeo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ImplantScrew.ImplantScrew.useMemo[capGeo]": ()=>{
            if (!abutmentGeo) return null;
            const { localCutY, cx, cz, geo } = abutmentGeo;
            // Sample vertices at cutY to get the outline
            const posAttr = geo.attributes.position;
            const cutEps = 0.015;
            const pts = [];
            for(let i = 0; i < posAttr.count; i++){
                if (Math.abs(posAttr.getY(i) - localCutY) < cutEps) {
                    pts.push({
                        x: posAttr.getX(i),
                        z: posAttr.getZ(i)
                    });
                }
            }
            if (pts.length < 3) return null;
            // Build a flat disc from radial profile
            const segs = 32;
            const step = Math.PI * 2 / segs;
            const radii = [];
            for(let s = 0; s < segs; s++){
                const a = s * step;
                const dx = Math.cos(a), dz = Math.sin(a);
                let maxR = 0.01;
                for (const p of pts){
                    const proj = (p.x - cx) * dx + (p.z - cz) * dz;
                    if (proj > maxR) maxR = proj;
                }
                radii.push(maxR);
            }
            const verts = [];
            const norms = [];
            const idx = [];
            const ny = isMax ? 1 : -1;
            // Center vertex
            verts.push(cx, localCutY, cz);
            norms.push(0, ny, 0);
            // Perimeter vertices
            for(let s = 0; s < segs; s++){
                const a = s * step;
                verts.push(cx + Math.cos(a) * radii[s], localCutY, cz + Math.sin(a) * radii[s]);
                norms.push(0, ny, 0);
            }
            // Fan triangles
            for(let s = 0; s < segs; s++){
                const ns = (s + 1) % segs;
                isMax ? idx.push(0, s + 1, ns + 1) : idx.push(0, ns + 1, s + 1);
            }
            const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            g.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](verts, 3));
            g.setAttribute('normal', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](norms, 3));
            g.setIndex(idx);
            return g;
        }
    }["ImplantScrew.ImplantScrew.useMemo[capGeo]"], [
        abutmentGeo,
        isMax
    ]);
    // Cleanup
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImplantScrew.ImplantScrew.useEffect": ()=>{
            return ({
                "ImplantScrew.ImplantScrew.useEffect": ()=>{
                    abutmentGeo?.geo?.dispose();
                    screwData?.dispose();
                    capGeo?.dispose();
                }
            })["ImplantScrew.ImplantScrew.useEffect"];
        }
    }["ImplantScrew.ImplantScrew.useEffect"], [
        abutmentGeo,
        screwData,
        capGeo
    ]);
    if (!abutmentGeo || !screwData) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("group", {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("mesh", {
                geometry: abutmentGeo.geo,
                material: metalMat
            }),
            capGeo && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("mesh", {
                geometry: capGeo,
                material: metalMat
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("mesh", {
                geometry: screwData,
                material: metalMat
            })
        ]
    });
}, "MEjsMSZkMX2+sA5QtB0nIm7SlX0=")), "MEjsMSZkMX2+sA5QtB0nIm7SlX0=");
_c1 = ImplantScrew;
// ══════════════════════════════════════════════════════════════
// Compute root tip positions from bounding box + dental anatomy
// This is reliable for ALL teeth regardless of mesh transform chains
// ══════════════════════════════════════════════════════════════
function computeRootTips(bb, center, size, cervicalY, arch, numRoots, toothPosition, mesialDir, buccalDir) {
    const isMax = arch === 'maxillary';
    // Root tip Y: 65% of the way from cervical to the root end
    // Conservative to keep canals safely inside the mesh
    const rootEndY = isMax ? bb.max.y : bb.min.y;
    const rootDepth = Math.abs(rootEndY - cervicalY);
    const tipY = isMax ? cervicalY + rootDepth * 0.65 : cervicalY - rootDepth * 0.65;
    // Use the SMALLER dimension at root level for spread basis
    // This prevents canals from escaping narrow roots (premolars, incisors)
    const rootWidth = Math.min(size.x, size.z);
    const spreadBasis = rootWidth;
    const cx = center.x;
    const cz = center.z;
    if (numRoots === 1) {
        // Single root: tip is at center, very slight lingual offset
        const tip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](cx, tipY, cz);
        tip.addScaledVector(buccalDir, -spreadBasis * 0.02);
        return [
            tip
        ];
    }
    if (numRoots === 2) {
        if (isMax && toothPosition === 4) {
            // Upper first premolar: buccal + palatal roots — conservative spread
            const buccalTip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](cx, tipY, cz);
            buccalTip.addScaledVector(buccalDir, spreadBasis * 0.12);
            const palatalTip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](cx, tipY, cz);
            palatalTip.addScaledVector(buccalDir, -spreadBasis * 0.12);
            return [
                buccalTip,
                palatalTip
            ];
        } else {
            // Lower molars: mesial + distal roots
            const mesialTip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](cx, tipY, cz);
            mesialTip.addScaledVector(mesialDir, spreadBasis * 0.18);
            mesialTip.addScaledVector(buccalDir, spreadBasis * 0.03);
            const distalTip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](cx, tipY, cz);
            distalTip.addScaledVector(mesialDir, -spreadBasis * 0.18);
            distalTip.addScaledVector(buccalDir, spreadBasis * 0.03);
            return [
                mesialTip,
                distalTip
            ];
        }
    }
    if (numRoots === 3) {
        // Upper molars: mesio-buccal, disto-buccal, palatal
        const mbTip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](cx, tipY, cz);
        mbTip.addScaledVector(mesialDir, spreadBasis * 0.18);
        mbTip.addScaledVector(buccalDir, spreadBasis * 0.15);
        const dbTip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](cx, tipY, cz);
        dbTip.addScaledVector(mesialDir, -spreadBasis * 0.15);
        dbTip.addScaledVector(buccalDir, spreadBasis * 0.15);
        // Palatal root — conservative spread
        const palatalTip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](cx, tipY * 0.97 + cervicalY * 0.03, cz);
        palatalTip.addScaledVector(buccalDir, -spreadBasis * 0.22);
        return [
            mbTip,
            dbTip,
            palatalTip
        ];
    }
    return [];
}
const RootCanals = /*#__PURE__*/ _s1((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c2 = _s1(function RootCanals({ meshBounds, arch, toothPosition = 6, dirs, toothFdi = '16' }) {
    _s1();
    const canals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RootCanals.RootCanals.useMemo[canals]": ()=>{
            const { center, size, cervicalY, bb } = meshBounds;
            const isMax = arch === 'maxillary';
            const isUpper = arch === 'maxillary';
            // Pulp chamber sits inside the crown — merge point well inside crown, not at cervical
            // pulpBottomY = just above cervical line (where canals branch from)
            // pulpTopY = deep inside the crown (occlusal third)
            const pulpBottomY = isMax ? cervicalY - size.y * 0.02 : cervicalY + size.y * 0.02;
            const pulpY = isMax ? cervicalY - size.y * 0.12 : cervicalY + size.y * 0.12;
            const pulpTopY = isMax ? bb.min.y + size.y * 0.22 : bb.max.y - size.y * 0.22;
            const cx = center.x;
            const cz = center.z;
            const spread = Math.max(size.x, size.z) * 0.18;
            // Helper: create a point offset from center along mesial/buccal directions
            const v = {
                "RootCanals.RootCanals.useMemo[canals].v": (y, m, b)=>{
                    const pos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](cx, y, cz);
                    if (m !== 0) pos.addScaledVector(dirs.mesial, m * spread);
                    if (b !== 0) pos.addScaledVector(dirs.buccal, b * spread);
                    return pos;
                }
            }["RootCanals.RootCanals.useMemo[canals].v"];
            const paths = [];
            // Pulp chamber color (pinkish-red, slightly lighter)
            const pulpColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0.90, 0.45, 0.40);
            // Canal color (deeper red)
            const cColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0.85, 0.25, 0.22);
            // Determine root count based on ACTUAL dental anatomy
            let rootConfig = 'single';
            if (toothPosition <= 3) {
                rootConfig = 'single';
            } else if (toothPosition === 4) {
                rootConfig = isUpper ? 'double' : 'single';
            } else if (toothPosition === 5) {
                rootConfig = 'single';
            } else {
                rootConfig = isUpper ? 'triple' : 'double';
            }
            const numRoots = rootConfig === 'triple' ? 3 : rootConfig === 'double' ? 2 : 1;
            // Compute root tip positions from bounding box + dental anatomy
            const rootTips = computeRootTips(bb, center, size, cervicalY, arch, numRoots, toothPosition, dirs.mesial, dirs.buccal);
            // Pulp chamber: compact area inside the crown where roots merge
            const pulpRadius = rootConfig === 'triple' ? 0.040 : rootConfig === 'double' ? 0.035 : 0.030;
            const pulpChamber = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CatmullRomCurve3"]([
                v(pulpTopY, 0, 0),
                v(pulpY, 0, 0),
                v(pulpBottomY, 0, 0)
            ]);
            paths.push({
                curve: pulpChamber,
                radius: pulpRadius,
                color: pulpColor,
                profile: 0
            });
            // Helper: create a natural nerve-like path with very subtle curves
            // Wiggle is kept extremely small to prevent canals from escaping narrow roots
            const makeNervePath = {
                "RootCanals.RootCanals.useMemo[canals].makeNervePath": (start, tip, seed)=>{
                    const pts = [
                        start.clone()
                    ];
                    const steps = 8;
                    const dx = tip.x - start.x;
                    const dy = tip.y - start.y;
                    const dz = tip.z - start.z;
                    // Use the smaller root dimension for safe wiggle bounds
                    const rootHalfWidth = Math.min(size.x, size.z) * 0.5;
                    for(let s = 1; s <= steps; s++){
                        const t = s / (steps + 1);
                        const bx = start.x + dx * t;
                        const by = start.y + dy * t;
                        const bz = start.z + dz * t;
                        // Very tight envelope — near zero at start/end, small in middle
                        const envelope = Math.sin(t * Math.PI) * (1.0 - t * 0.6);
                        // Wiggle proportional to root width, very conservative
                        const wiggleScale = rootHalfWidth * 0.03 * envelope;
                        const freq1 = 3.0 + seed * 0.8;
                        const freq3 = 1.8 + seed * 0.5;
                        const wx = Math.sin(seed * 2.1 + t * freq1) * wiggleScale;
                        const wz = Math.cos(seed * 1.4 + t * freq3) * wiggleScale * 0.3;
                        pts.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](bx + wx, by, bz + wz));
                    }
                    pts.push(tip.clone());
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CatmullRomCurve3"](pts);
                }
            }["RootCanals.RootCanals.useMemo[canals].makeNervePath"];
            // Use FDI number as a unique seed for each tooth's canal patterns
            const fdiSeed = parseInt(toothFdi, 10) || 16;
            const canalStartY = pulpBottomY;
            if (rootConfig === 'single') {
                const tip = rootTips[0];
                const canal = makeNervePath(v(canalStartY, 0, 0), tip, fdiSeed * 0.37);
                paths.push({
                    curve: canal,
                    radius: 0.020,
                    color: cColor,
                    profile: 1
                });
            } else if (rootConfig === 'double') {
                for(let i = 0; i < 2; i++){
                    const tip = rootTips[i];
                    const canal = makeNervePath(v(canalStartY, 0, 0), tip, fdiSeed * 0.37 + (i + 1) * 2.1);
                    paths.push({
                        curve: canal,
                        radius: 0.016,
                        color: cColor,
                        profile: 1
                    });
                }
            } else {
                for(let i = 0; i < 3; i++){
                    const tip = rootTips[i];
                    const canal = makeNervePath(v(canalStartY, 0, 0), tip, fdiSeed * 0.37 + (i + 1) * 3.3);
                    const r = i === 2 ? 0.018 : 0.015;
                    paths.push({
                        curve: canal,
                        radius: r,
                        color: cColor,
                        profile: 1
                    });
                }
            }
            return paths;
        }
    }["RootCanals.RootCanals.useMemo[canals]"], [
        meshBounds,
        arch,
        toothPosition,
        dirs,
        toothFdi
    ]);
    const onBeforeCompile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RootCanals.RootCanals.useCallback[onBeforeCompile]": (shader, radius, profile)=>{
            shader.uniforms.uBaseRadius = {
                value: radius
            };
            shader.uniforms.uProfile = {
                value: profile
            };
            shader.vertexShader = shader.vertexShader.replace('#include <common>', `#include <common>
       uniform float uBaseRadius;
       uniform float uProfile;`);
            shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
       float taper;
       if (uProfile < 0.5) {
         // Pulp chamber: wide at the top, bulging slightly, dropping cleanly to meet root entries
         taper = 1.0 - pow(uv.x, 2.5) * 0.4;
       } else {
         // Root canals: curve naturally downwards, tapering smoothly to a fine point
         taper = mix(1.0, 0.02, pow(uv.x, 1.2));
         
         // Introduce extremely subtle organic curves so roots don't look like straight pipes
         float wave = sin(uv.x * 12.0) * 0.06 + cos(uv.x * 20.0) * 0.03;
         taper += wave * taper;
       }
       
       // Three.js TubeGeometry normals point directly outward from the tube curve.
       // Pull the vertex inwards along the normal.
       transformed -= normal * uBaseRadius * (1.0 - taper);
      `);
        }
    }["RootCanals.RootCanals.useCallback[onBeforeCompile]"], []);
    // Memoize tube geometries to avoid recreating on every render
    const tubeGeometries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RootCanals.RootCanals.useMemo[tubeGeometries]": ()=>canals.map({
                "RootCanals.RootCanals.useMemo[tubeGeometries]": (canal)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TubeGeometry"](canal.curve, 48, canal.radius, 12, false)
            }["RootCanals.RootCanals.useMemo[tubeGeometries]"])
    }["RootCanals.RootCanals.useMemo[tubeGeometries]"], [
        canals
    ]);
    // Dispose old geometries on cleanup
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RootCanals.RootCanals.useEffect": ()=>{
            return ({
                "RootCanals.RootCanals.useEffect": ()=>{
                    tubeGeometries.forEach({
                        "RootCanals.RootCanals.useEffect": (g)=>g.dispose()
                    }["RootCanals.RootCanals.useEffect"]);
                }
            })["RootCanals.RootCanals.useEffect"];
        }
    }["RootCanals.RootCanals.useEffect"], [
        tubeGeometries
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("group", {
        children: canals.map((canal, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("mesh", {
                geometry: tubeGeometries[i],
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("meshStandardMaterial", {
                    color: canal.color,
                    emissive: canal.color,
                    emissiveIntensity: 0.3,
                    roughness: 0.35,
                    metalness: 0.0,
                    transparent: false,
                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                    onBeforeCompile: (shader)=>onBeforeCompile(shader, canal.radius, canal.profile)
                })
            }, i))
    });
}, "OLFKAzoaXA9/gpoDSY8b7gJIUes=")), "OLFKAzoaXA9/gpoDSY8b7gJIUes=");
_c3 = RootCanals;
const PreparedStump = /*#__PURE__*/ _s2((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c4 = _s2(function PreparedStump({ toothMesh, meshBounds, arch, parentGroup }) {
    _s2();
    const stumpGeo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PreparedStump.PreparedStump.useMemo[stumpGeo]": ()=>{
            if (!toothMesh?.geometry || !parentGroup) return null;
            const { center, cervicalY, bb } = meshBounds;
            const isMax = arch === 'maxillary';
            // Transform geometry to the outer group's local space (not full world space)
            // This avoids the mirrorX double-application issue
            const srcGeo = toothMesh.geometry.clone();
            const groupInverse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().copy(parentGroup.matrixWorld).invert();
            const relativeMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().multiplyMatrices(groupInverse, toothMesh.matrixWorld);
            srcGeo.applyMatrix4(relativeMatrix);
            const posAttr = srcGeo.attributes.position;
            // Transform reference points to the same local space
            const localCenter = center.clone().applyMatrix4(groupInverse);
            const localCervPt = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](center.x, cervicalY, center.z).applyMatrix4(groupInverse);
            const localCervicalY = localCervPt.y;
            const localBBmin = bb.min.clone().applyMatrix4(groupInverse);
            const localBBmax = bb.max.clone().applyMatrix4(groupInverse);
            const localCrownEnd = isMax ? Math.min(localBBmin.y, localBBmax.y) : Math.max(localBBmin.y, localBBmax.y);
            const localCrownHeight = Math.abs(localCervicalY - localCrownEnd);
            const localStumpHeight = localCrownHeight * 0.38;
            const localCutY = isMax ? localCervicalY - localStumpHeight : localCervicalY + localStumpHeight;
            // Compute actual centroid of vertices near cervical for accurate scaling pivot
            const cervBand = localStumpHeight * 0.3;
            let sumX = 0, sumZ = 0, count = 0;
            for(let i = 0; i < posAttr.count; i++){
                const vy = posAttr.getY(i);
                if (Math.abs(vy - localCervicalY) < cervBand) {
                    sumX += posAttr.getX(i);
                    sumZ += posAttr.getZ(i);
                    count++;
                }
            }
            const cx = count > 0 ? sumX / count : localCenter.x;
            const cz = count > 0 ? sumZ / count : localCenter.z;
            const rootOverlapLocal = 0.06;
            const rootLimitLocal = isMax ? localCervicalY + rootOverlapLocal : localCervicalY - rootOverlapLocal;
            for(let i = 0; i < posAttr.count; i++){
                const x = posAttr.getX(i);
                const y = posAttr.getY(i);
                const z = posAttr.getZ(i);
                // t: 0 = cervical, 1 = cut plane, negative = in root zone
                let t;
                if (isMax) {
                    t = (localCervicalY - y) / localStumpHeight;
                } else {
                    t = (y - localCervicalY) / localStumpHeight;
                }
                let scale;
                if (t <= 0) {
                    scale = 0.90;
                } else if (t <= 0.15) {
                    const blend = t / 0.15;
                    scale = 0.90 + (0.72 - 0.90) * blend;
                } else {
                    const tc = Math.min((t - 0.15) / 0.85, 1);
                    scale = 0.72 - tc * 0.27;
                }
                const nx = cx + (x - cx) * scale;
                const nz = cz + (z - cz) * scale;
                let ny = y;
                if (isMax && y < localCutY) ny = localCutY;
                if (!isMax && y > localCutY) ny = localCutY;
                if (isMax && y > rootLimitLocal) ny = rootLimitLocal;
                if (!isMax && y < rootLimitLocal) ny = rootLimitLocal;
                posAttr.setXYZ(i, nx, ny, nz);
            }
            posAttr.needsUpdate = true;
            // Remove only deep-root degenerate triangles (all 3 at rootLimit)
            // KEEP flat top triangles at cutY (solid top) and keep root overlap triangles
            const clampEps = 0.001;
            const indexAttr = srcGeo.index;
            if (indexAttr) {
                const indices = [];
                for(let f = 0; f < indexAttr.count; f += 3){
                    const i0 = indexAttr.getX(f);
                    const i1 = indexAttr.getX(f + 1);
                    const i2 = indexAttr.getX(f + 2);
                    const y0 = posAttr.getY(i0);
                    const y1 = posAttr.getY(i1);
                    const y2 = posAttr.getY(i2);
                    // Skip degenerate triangles clamped at rootLimit
                    const allAtRoot = Math.abs(y0 - rootLimitLocal) < clampEps && Math.abs(y1 - rootLimitLocal) < clampEps && Math.abs(y2 - rootLimitLocal) < clampEps;
                    if (!allAtRoot) {
                        indices.push(i0, i1, i2);
                    }
                }
                srcGeo.setIndex(indices);
            }
            srcGeo.computeVertexNormals();
            return srcGeo;
        }
    }["PreparedStump.PreparedStump.useMemo[stumpGeo]"], [
        toothMesh,
        meshBounds,
        arch,
        parentGroup
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PreparedStump.PreparedStump.useEffect": ()=>{
            return ({
                "PreparedStump.PreparedStump.useEffect": ()=>{
                    stumpGeo?.dispose();
                }
            })["PreparedStump.PreparedStump.useEffect"];
        }
    }["PreparedStump.PreparedStump.useEffect"], [
        stumpGeo
    ]);
    if (!stumpGeo) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("mesh", {
        geometry: stumpGeo,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("meshStandardMaterial", {
            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0.98, 0.96, 0.90),
            emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0.14, 0.12, 0.09),
            roughness: 0.45,
            metalness: 0.0,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
        })
    });
}, "AH5iuFwS94KipBw0QKR3ggeYeHM=")), "AH5iuFwS94KipBw0QKR3ggeYeHM=");
_c5 = PreparedStump;
function Tooth({ selectedZone, onSelectZone, onClearSelectedZone, onHoverZone, modelPath = '/models/tooth_16.glb', arch = 'maxillary', mirrorX = false, quadrant, toothPosition = 6, toothFdi = '16', isImplant = false, findings = [], zoneNotes = {}, toothDiagnoses = new Set(), multiSelectZones, multiSelectActive = false, compact = false, hideTags = false, treatmentHistoryDetails = {}, toothEntries }) {
    _s3();
    const gltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(modelPath);
    const implantGltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])('/models/implant.glb');
    const [mountGen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Tooth.useState": ()=>Math.random()
    }["Tooth.useState"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const clonedScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Tooth.useMemo[clonedScene]": ()=>cloneSceneWithUniqueMaterials(gltf.scene)
    }["Tooth.useMemo[clonedScene]"], [
        gltf,
        mountGen
    ]);
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const outerGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toothMeshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [toothMeshReady, setToothMeshReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const shaderRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [localHover, setLocalHover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [implantPlacement, setImplantPlacement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const boundsData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Annotation positioning data (computed from mesh world-space bounds)
    const [annotationData, setAnnotationData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [boundsReady, setBoundsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const { camera, gl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Tooth.useLayoutEffect": ()=>{
            let cancelled = false;
            let rafOuter = 0;
            let rafInner = 0;
            const schedule = {
                "Tooth.useLayoutEffect.schedule": ()=>{
                    rafOuter = requestAnimationFrame({
                        "Tooth.useLayoutEffect.schedule": ()=>{
                            rafInner = requestAnimationFrame({
                                "Tooth.useLayoutEffect.schedule": ()=>{
                                    if (cancelled || !groupRef.current) return;
                                    groupRef.current.updateMatrixWorld(true);
                                    const materials = collectZoneMaterials(clonedScene);
                                    if (materials.length === 0) return;
                                    // Capture first mesh for annotation raycasting
                                    clonedScene.traverse({
                                        "Tooth.useLayoutEffect.schedule": (obj)=>{
                                            const m = obj;
                                            if (m.isMesh && !toothMeshRef.current) {
                                                toothMeshRef.current = m;
                                            }
                                        }
                                    }["Tooth.useLayoutEffect.schedule"]);
                                    const bb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(groupRef.current);
                                    const center = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                                    const size = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                                    bb.getCenter(center);
                                    bb.getSize(size);
                                    let cervicalY, cejY, occlusalTop, crownBottomY;
                                    if (arch === 'maxillary') {
                                        cervicalY = bb.min.y + size.y * 0.42;
                                        cejY = bb.min.y + size.y * 0.50;
                                        const crownH = cervicalY - bb.min.y;
                                        occlusalTop = bb.min.y + crownH * 0.45;
                                        crownBottomY = bb.min.y;
                                    } else {
                                        cervicalY = bb.max.y - size.y * 0.42;
                                        cejY = bb.max.y - size.y * 0.50;
                                        const crownH = bb.max.y - cervicalY;
                                        occlusalTop = bb.max.y - crownH * 0.45;
                                        crownBottomY = bb.max.y;
                                    }
                                    const zoneYawRad = zoneYawForTooth(toothPosition, quadrant);
                                    boundsData.current = {
                                        cervicalY,
                                        cejY,
                                        occlusalTop,
                                        centerX: center.x,
                                        centerZ: center.z,
                                        quadrant,
                                        zoneYawRad,
                                        bb,
                                        center,
                                        size
                                    };
                                    setBoundsReady({
                                        "Tooth.useLayoutEffect.schedule": (v)=>v + 1
                                    }["Tooth.useLayoutEffect.schedule"]);
                                    const isMissingOrExtraction = toothDiagnoses.has('Missing') || toothDiagnoses.has('Extraction');
                                    shaderRefs.current = [];
                                    for (const mat of materials){
                                        shaderRefs.current.push(injectShader(mat, cervicalY, cejY, crownBottomY, center.x, center.z, arch, quadrant, zoneYawRad, toothFdi, isImplant, isMissingOrExtraction, toothDiagnoses.has('Crown'), toothDiagnoses.has('RCT'), toothDiagnoses.has('Bridge'), toothDiagnoses.has('Denture')));
                                    }
                                    prewarmDentalShaderProgram({
                                        gl,
                                        camera,
                                        source: clonedScene,
                                        variantKey: getDentalShaderVariantKey({
                                            isImplant,
                                            isMissing: isMissingOrExtraction,
                                            isCrown: toothDiagnoses.has('Crown'),
                                            isRCT: toothDiagnoses.has('RCT'),
                                            isBridge: toothDiagnoses.has('Bridge'),
                                            isDenture: toothDiagnoses.has('Denture')
                                        })
                                    });
                                    if (isImplant) {
                                        // Scale implant to fit proportionally within the tooth
                                        const cervicalDiam = Math.max(size.x, size.z) * 0.75;
                                        setImplantPlacement({
                                            cervicalY,
                                            centerX: center.x,
                                            centerZ: center.z,
                                            cervicalDiam
                                        });
                                    }
                                    // Compute annotation data after shader injection is complete
                                    if (toothMeshRef.current) {
                                        const meshBB = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(toothMeshRef.current);
                                        const mCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                                        const mSize = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                                        meshBB.getCenter(mCenter);
                                        meshBB.getSize(mSize);
                                        let mCervicalY, mOcclusalMidY;
                                        if (arch === 'maxillary') {
                                            mCervicalY = meshBB.min.y + mSize.y * 0.42;
                                            const occlTop = meshBB.min.y + (mCervicalY - meshBB.min.y) * 0.45;
                                            mOcclusalMidY = (mCervicalY + occlTop) / 2;
                                        } else {
                                            mCervicalY = meshBB.max.y - mSize.y * 0.42;
                                            const occlTop = meshBB.max.y - (meshBB.max.y - mCervicalY) * 0.45;
                                            mOcclusalMidY = (mCervicalY + occlTop) / 2;
                                        }
                                        const dirs = getDirsForTooth(toothFdi, quadrant, zoneYawRad);
                                        // When mirrorX is active, the mesh world-space X is flipped.
                                        // Negate X component of direction vectors so raycasts hit the correct surface.
                                        const fx = mirrorX ? -1 : 1;
                                        const flipDir = {
                                            "Tooth.useLayoutEffect.schedule.flipDir": (d)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](d.x * fx, d.y, d.z).normalize()
                                        }["Tooth.useLayoutEffect.schedule.flipDir"];
                                        setAnnotationData({
                                            zoneDirs: {
                                                buccal: flipDir(dirs.buccal),
                                                lingual: flipDir(dirs.lingual),
                                                mesial: flipDir(dirs.mesial),
                                                distal: flipDir(dirs.distal)
                                            },
                                            meshBounds: {
                                                center: mCenter,
                                                size: mSize,
                                                cervicalY: mCervicalY,
                                                occlusalMidY: mOcclusalMidY,
                                                bb: meshBB
                                            }
                                        });
                                    }
                                }
                            }["Tooth.useLayoutEffect.schedule"]);
                        }
                    }["Tooth.useLayoutEffect.schedule"]);
                }
            }["Tooth.useLayoutEffect.schedule"];
            schedule();
            return ({
                "Tooth.useLayoutEffect": ()=>{
                    cancelled = true;
                    cancelAnimationFrame(rafOuter);
                    cancelAnimationFrame(rafInner);
                }
            })["Tooth.useLayoutEffect"];
        }
    }["Tooth.useLayoutEffect"], [
        clonedScene,
        arch,
        quadrant,
        toothPosition,
        modelPath,
        isImplant,
        toothDiagnoses
    ]);
    // Store current zone indices + finding flags in a ref so useFrame always has latest values
    const zoneIndicesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        selected: -1,
        hovered: -1
    });
    const zoneFindingsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]);
    const wholeToothStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        selected: false,
        marked: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tooth.useEffect": ()=>{
            zoneIndicesRef.current.selected = selectedZone ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_ZONES"].indexOf(selectedZone) : -1;
        }
    }["Tooth.useEffect"], [
        selectedZone
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tooth.useEffect": ()=>{
            zoneIndicesRef.current.hovered = localHover ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_ZONES"].indexOf(localHover) : -1;
        }
    }["Tooth.useEffect"], [
        localHover
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tooth.useEffect": ()=>{
            // Update the findings ref whenever findings or multi-select zones change — picked up next frame
            zoneFindingsRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_ZONES"].map({
                "Tooth.useEffect": (z)=>findings.some({
                        "Tooth.useEffect": (f)=>f.zoneId === z
                    }["Tooth.useEffect"]) || multiSelectActive && (multiSelectZones?.has(z) ?? false) ? 1 : 0
            }["Tooth.useEffect"]);
        }
    }["Tooth.useEffect"], [
        findings,
        multiSelectZones,
        multiSelectActive
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tooth.useEffect": ()=>{
            wholeToothStateRef.current.selected = selectedZone === 'whole' || multiSelectActive && (multiSelectZones?.has('whole') ?? false);
            wholeToothStateRef.current.marked = false;
        }
    }["Tooth.useEffect"], [
        multiSelectZones,
        selectedZone,
        toothEntries,
        treatmentHistoryDetails,
        multiSelectActive
    ]);
    // Push zone uniforms every frame — guarantees highlighting even after shader recompile
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Tooth.useFrame": ()=>{
            const { selected, hovered } = zoneIndicesRef.current;
            const zf = zoneFindingsRef.current;
            for (const ref of shaderRefs.current){
                const s = ref.shader;
                if (!s?.uniforms) continue;
                s.uniforms.selectedZone.value = selected;
                s.uniforms.hoveredZone.value = hovered;
                if (s.uniforms.uWholeToothSelected) s.uniforms.uWholeToothSelected.value = wholeToothStateRef.current.selected ? 1.0 : 0.0;
                if (s.uniforms.uWholeToothMarked) s.uniforms.uWholeToothMarked.value = wholeToothStateRef.current.marked ? 1.0 : 0.0;
                if (s.uniforms.uZoneHasFinding) {
                    const arr = s.uniforms.uZoneHasFinding.value;
                    arr[0] = zf[0];
                    arr[1] = zf[1];
                    arr[2] = zf[2];
                    arr[3] = zf[3];
                    arr[4] = zf[4];
                    arr[5] = zf[5];
                    arr[6] = zf[6];
                }
            }
        }
    }["Tooth.useFrame"]);
    const getWorldNormal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Tooth.useCallback[getWorldNormal]": (e)=>{
            if (e.face) {
                const n = e.face.normal.clone();
                n.transformDirection(e.object.matrixWorld);
                return n;
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, -1, 0);
        }
    }["Tooth.useCallback[getWorldNormal]"], []);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("group", {
        ref: outerGroupRef,
        scale: mirrorX ? [
            -1.0,
            1.0,
            1.0
        ] : [
            1.0,
            1.0,
            1.0
        ],
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Center"], {
                ref: groupRef,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("primitive", {
                    object: clonedScene,
                    onPointerMove: (e)=>{
                        e.stopPropagation();
                        if (toothDiagnoses.has('Missing') || toothDiagnoses.has('Extraction')) {
                            zoneIndicesRef.current.hovered = -1;
                            setLocalHover(null);
                            onHoverZone(null);
                            document.body.style.cursor = 'default';
                            return;
                        }
                        if (!boundsData.current) return;
                        const b = boundsData.current;
                        const z = classifyHit(e.point, getWorldNormal(e), b.cervicalY, b.cejY, b.occlusalTop, b.centerX, b.centerZ, arch, b.quadrant, b.zoneYawRad, toothFdi);
                        if (isImplant && z && (z === 'cervical' || z === 'root')) {
                            zoneIndicesRef.current.hovered = -1;
                            setLocalHover(null);
                            onHoverZone(null);
                            document.body.style.cursor = 'default';
                            return;
                        }
                        // Push to ref IMMEDIATELY so useFrame picks it up this frame, not after React commits
                        zoneIndicesRef.current.hovered = z ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_ZONES"].indexOf(z) : -1;
                        setLocalHover(z);
                        onHoverZone(z);
                        document.body.style.cursor = z ? 'pointer' : 'default';
                    },
                    onPointerOut: (e)=>{
                        e.stopPropagation();
                        zoneIndicesRef.current.hovered = -1;
                        setLocalHover(null);
                        onHoverZone(null);
                        document.body.style.cursor = 'default';
                    },
                    onClick: (e)=>{
                        e.stopPropagation();
                        if (toothDiagnoses.has('Missing') || toothDiagnoses.has('Extraction')) return;
                        if (!boundsData.current) return;
                        const b = boundsData.current;
                        const z = classifyHit(e.point, getWorldNormal(e), b.cervicalY, b.cejY, b.occlusalTop, b.centerX, b.centerZ, arch, b.quadrant, b.zoneYawRad, toothFdi);
                        if (isImplant && z && (z === 'cervical' || z === 'root')) return;
                        // Multi-select only when a Findings/Procedures row is actively editing its surfaces.
                        // Otherwise: normal single-select (replaces prior selection).
                        if (z) onSelectZone(z, [
                            e.point.x,
                            e.point.y,
                            e.point.z
                        ], {
                            multi: multiSelectActive
                        });
                    }
                })
            }),
            annotationData && !compact && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Annotations$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Annotations"], {
                toothMesh: toothMeshRef.current,
                findings: (()=>{
                    // Synthesize per-surface "findings" from toothEntries so the existing
                    // annotation tooltip surfaces multi-section labels (Dx:… / Fn:… / Pr:…).
                    const synth = [];
                    let id = 0;
                    for (const [name, detail] of Object.entries(treatmentHistoryDetails)){
                        const surfaces = detail.surfaces ?? [];
                        const labelParts = [
                            name
                        ];
                        if (detail.since?.trim()) labelParts.push(detail.since.trim());
                        for (const z of surfaces){
                            synth.push({
                                id: `hist-${id++}`,
                                zoneId: z,
                                type: `Hx: ${labelParts.join(' · ')}`,
                                notes: detail.note ?? ""
                            });
                        }
                    }
                    for (const e of toothEntries ?? []){
                        const prefix = e.kind === "finding" ? "Fn" : e.kind === "planned" ? "Pr" : "Hx";
                        const label = `${prefix}: ${e.name}`;
                        for (const z of e.surfaces){
                            synth.push({
                                id: `ent-${id++}`,
                                zoneId: z,
                                type: label,
                                notes: ""
                            });
                        }
                    }
                    return [
                        ...findings,
                        ...synth
                    ];
                })(),
                zoneNotes: zoneNotes,
                arch: arch,
                toothPosition: toothPosition,
                quadrant: quadrant,
                selectedZone: selectedZone,
                onSelectZone: onSelectZone,
                onClearSelectedZone: onClearSelectedZone,
                zoneDirs: annotationData.zoneDirs,
                meshBounds: annotationData.meshBounds
            }),
            toothDiagnoses.has('Crown') && annotationData && toothMeshRef.current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(PreparedStump, {
                toothMesh: toothMeshRef.current,
                meshBounds: {
                    center: annotationData.meshBounds.center,
                    size: annotationData.meshBounds.size,
                    cervicalY: annotationData.meshBounds.cervicalY,
                    bb: annotationData.meshBounds.bb
                },
                arch: arch,
                parentGroup: outerGroupRef.current
            }),
            toothDiagnoses.has('RCT') && annotationData && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(RootCanals, {
                meshBounds: {
                    center: annotationData.meshBounds.center,
                    size: annotationData.meshBounds.size,
                    cervicalY: annotationData.meshBounds.cervicalY,
                    bb: annotationData.meshBounds.bb
                },
                arch: arch,
                toothPosition: toothPosition,
                dirs: annotationData.zoneDirs,
                toothFdi: toothFdi
            }),
            isImplant && implantPlacement && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ImplantScrew, {
                placement: implantPlacement,
                arch: arch,
                implantScene: implantGltf.scene,
                toothMesh: toothMeshRef.current,
                bb: boundsData.current?.bb || null,
                parentGroup: outerGroupRef.current
            }),
            toothDiagnoses.has('Bridge') && boundsData.current && (()=>{
                const adj = getAdjacentTeeth(toothFdi);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        adj.mesial && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(BridgeGhostTooth, {
                            toothDef: adj.mesial,
                            side: "mesial",
                            currentBB: boundsData.current.bb,
                            arch: arch,
                            mirrorX: mirrorX
                        }),
                        adj.distal && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(BridgeGhostTooth, {
                            toothDef: adj.distal,
                            side: "distal",
                            currentBB: boundsData.current.bb,
                            arch: arch,
                            mirrorX: mirrorX
                        })
                    ]
                });
            })(),
            (()=>{
                const visualWholeTags = new Set([
                    'Implant',
                    'Missing',
                    'Extraction',
                    'RCT',
                    'Crown',
                    'Bridge',
                    'Denture'
                ]);
                const wholeTags = [];
                if (toothDiagnoses) {
                    for (const d of toothDiagnoses){
                        if (visualWholeTags.has(d)) wholeTags.push(d);
                    }
                }
                if (isImplant && !wholeTags.includes('Implant')) wholeTags.push('Implant');
                if (toothEntries) {
                    for (const e of toothEntries){
                        if (e.surfaces?.includes('whole') && !wholeTags.includes(e.name)) {
                            wholeTags.push(e.name);
                        }
                    }
                }
                if (hideTags || wholeTags.length === 0) return null;
                const occlusalOffsetY = arch === 'maxillary' ? -0.72 : 0.72;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
                    position: [
                        0,
                        occlusalOffsetY,
                        0
                    ],
                    center: true,
                    transform: compact,
                    sprite: compact,
                    scale: compact ? 0.35 : 1,
                    style: {
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap'
                    },
                    zIndexRange: [
                        80,
                        40
                    ],
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: compact ? '2px' : '4px'
                        },
                        children: wholeTags.map((tag)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                style: {
                                    fontSize: compact ? '18px' : '11px',
                                    fontWeight: 600,
                                    padding: compact ? '2px 6px' : '3px 8px',
                                    borderRadius: '6px',
                                    fontFamily: 'Inter, sans-serif',
                                    background: 'rgba(107, 114, 128, 0.85)',
                                    color: '#fff',
                                    lineHeight: '1.3',
                                    backdropFilter: 'blur(4px)',
                                    letterSpacing: '0.01em',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)',
                                    maxWidth: compact ? '120px' : 'auto',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                },
                                children: tag
                            }, tag))
                    })
                });
            })()
        ]
    });
}
_s3(Tooth, "pZtGGNaWZP80GXyV0GnoXVh5Xj0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c6 = Tooth;
// ══════════════════════════════════════════════════════════════
// Bridge Adjacent Teeth — shows faded ghost teeth on either side
// of the current tooth in single-tooth view when Bridge diagnosis is active.
// ══════════════════════════════════════════════════════════════
function getAdjacentTeeth(fdi) {
    const quadDigit = parseInt(fdi[0]);
    const posDigit = parseInt(fdi[1]);
    // Mesial = toward midline (position decreases), Distal = away from midline (position increases)
    const mesialPos = posDigit - 1;
    const distalPos = posDigit + 1;
    const mesialFdi = mesialPos >= 1 ? `${quadDigit}${mesialPos}` : null;
    const distalFdi = distalPos <= 8 ? `${quadDigit}${distalPos}` : null;
    const mesial = mesialFdi ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].find((t)=>t.fdi === mesialFdi) || null : null;
    const distal = distalFdi ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].find((t)=>t.fdi === distalFdi) || null : null;
    return {
        mesial,
        distal
    };
}
const BridgeGhostTooth = /*#__PURE__*/ _s4((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c7 = _s4(function BridgeGhostTooth({ toothDef, side, currentBB, arch, mirrorX }) {
    _s4();
    const gltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(toothDef.modelPath);
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ghostCervicalY, setGhostCervicalY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ghostHalfWidth, setGhostHalfWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mountGen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BridgeGhostTooth.BridgeGhostTooth.useState": ()=>Math.random()
    }["BridgeGhostTooth.BridgeGhostTooth.useState"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cloned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BridgeGhostTooth.BridgeGhostTooth.useMemo[cloned]": ()=>{
            const root = gltf.scene.clone(true);
            root.traverse({
                "BridgeGhostTooth.BridgeGhostTooth.useMemo[cloned]": (obj)=>{
                    const mesh = obj;
                    if (!mesh.isMesh || !mesh.material) return;
                    const mat = mesh.material;
                    const prep = {
                        "BridgeGhostTooth.BridgeGhostTooth.useMemo[cloned].prep": (m)=>{
                            const c = m.clone();
                            c.transparent = true;
                            c.opacity = 0.12;
                            c.depthWrite = false;
                            c.side = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"];
                            const lum = c.color.r * 0.299 + c.color.g * 0.587 + c.color.b * 0.114;
                            c.color.setRGB(lum * 0.55 + 0.22, lum * 0.55 + 0.22, lum * 0.55 + 0.22);
                            return c;
                        }
                    }["BridgeGhostTooth.BridgeGhostTooth.useMemo[cloned].prep"];
                    if (Array.isArray(mat)) {
                        mesh.material = mat.map(prep);
                    } else {
                        mesh.material = prep(mat);
                    }
                }
            }["BridgeGhostTooth.BridgeGhostTooth.useMemo[cloned]"]);
            return root;
        }
    }["BridgeGhostTooth.BridgeGhostTooth.useMemo[cloned]"], [
        gltf,
        mountGen
    ]);
    // After mount: compute ghost tooth's cervical Y, then inject crown-only clipping shader
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BridgeGhostTooth.BridgeGhostTooth.useEffect": ()=>{
            if (!groupRef.current) return;
            const raf = requestAnimationFrame({
                "BridgeGhostTooth.BridgeGhostTooth.useEffect.raf": ()=>{
                    if (!groupRef.current) return;
                    groupRef.current.updateMatrixWorld(true);
                    const bb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(groupRef.current);
                    const size = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                    bb.getSize(size);
                    // Cervical Y at 42% from crown tip (same as main tooth)
                    const cY = arch === 'maxillary' ? bb.min.y + size.y * 0.42 : bb.max.y - size.y * 0.42;
                    setGhostCervicalY(cY);
                    // Record half-width so the parent can position us flush against the central tooth
                    setGhostHalfWidth(size.x / 2);
                    // Inject shader to discard root-side fragments (world-space Y)
                    const isMax = arch === 'maxillary';
                    cloned.traverse({
                        "BridgeGhostTooth.BridgeGhostTooth.useEffect.raf": (obj)=>{
                            const mesh = obj;
                            if (!mesh.isMesh || !mesh.material) return;
                            const mats = Array.isArray(mesh.material) ? mesh.material : [
                                mesh.material
                            ];
                            for (const mat of mats){
                                const m = mat;
                                m.onBeforeCompile = ({
                                    "BridgeGhostTooth.BridgeGhostTooth.useEffect.raf": (shader)=>{
                                        shader.uniforms.uCervicalY = {
                                            value: cY
                                        };
                                        shader.uniforms.uIsMax = {
                                            value: isMax ? 1.0 : 0.0
                                        };
                                        shader.vertexShader = shader.vertexShader.replace('#include <common>', `#include <common>
               varying vec3 vWorldPosGhost;
               varying vec3 vNormalGhost;
               varying vec3 vViewDirGhost;`);
                                        shader.vertexShader = shader.vertexShader.replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
               vec4 wp = modelMatrix * vec4(transformed, 1.0);
               vWorldPosGhost = wp.xyz;
               vNormalGhost = normalize(mat3(modelMatrix) * objectNormal);
               vViewDirGhost = normalize(cameraPosition - wp.xyz);`);
                                        shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>
               uniform float uCervicalY;
               uniform float uIsMax;
               varying vec3 vWorldPosGhost;
               varying vec3 vNormalGhost;
               varying vec3 vViewDirGhost;`);
                                        shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>
               // Discard root-side fragments (crown-only)
               if (uIsMax > 0.5) {
                 if (vWorldPosGhost.y > uCervicalY) discard;
               } else {
                 if (vWorldPosGhost.y < uCervicalY) discard;
               }
               // Halo effect: edges more opaque (fresnel), center remains see-through
               float fres = pow(1.0 - max(0.0, dot(normalize(vNormalGhost), normalize(vViewDirGhost))), 2.2);
               gl_FragColor.a = clamp(gl_FragColor.a + fres * 0.28, 0.0, 0.68);
               // Back face: darken slightly so the hollow inner layer is visible from top
               if (!gl_FrontFacing) {
                 gl_FragColor.rgb *= 0.55;
                 gl_FragColor.a = min(gl_FragColor.a + 0.15, 0.85);
               }`);
                                    }
                                })["BridgeGhostTooth.BridgeGhostTooth.useEffect.raf"];
                                m.needsUpdate = true;
                            }
                        }
                    }["BridgeGhostTooth.BridgeGhostTooth.useEffect.raf"]);
                }
            }["BridgeGhostTooth.BridgeGhostTooth.useEffect.raf"]);
            return ({
                "BridgeGhostTooth.BridgeGhostTooth.useEffect": ()=>cancelAnimationFrame(raf)
            })["BridgeGhostTooth.BridgeGhostTooth.useEffect"];
        }
    }["BridgeGhostTooth.BridgeGhostTooth.useEffect"], [
        cloned,
        arch
    ]);
    // Compute offset — attach adjacent tooth directly to current tooth (crowns touching)
    // Both central and ghost are <Center>-ed at their own origin, so the gap-free
    // spacing is (centralHalfWidth + ghostHalfWidth) with a tiny overlap for seamlessness.
    const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BridgeGhostTooth.BridgeGhostTooth.useMemo[offset]": ()=>{
            const currentSize = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            currentBB.getSize(currentSize);
            const centralHalf = currentSize.x / 2;
            // Fallback to central half-width on first render before ghost is measured
            const ghostHalf = ghostHalfWidth ?? centralHalf;
            // Visible overlap so crowns MERGE on both sides with no gap
            const spacing = centralHalf + ghostHalf - 0.12;
            // Mesial = toward midline, Distal = away from midline
            const sign = side === 'mesial' ? 1 : -1;
            const dirSign = mirrorX ? -sign : sign;
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](dirSign * spacing, 0, 0);
        }
    }["BridgeGhostTooth.BridgeGhostTooth.useMemo[offset]"], [
        currentBB,
        side,
        mirrorX,
        ghostHalfWidth
    ]);
    // All three bridge teeth should face the same direction as the central tooth (front view).
    // The outer parent group already applies the central tooth's mirrorX scale, so we do NOT
    // re-apply the ghost's own mirrorX here — that keeps all three visually aligned.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("group", {
        position: offset,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Center"], {
            ref: groupRef,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("primitive", {
                object: cloned
            })
        })
    });
}, "ANQYDMigE1mSZhgBBbjfM4drVDk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"]
    ];
})), "ANQYDMigE1mSZhgBBbjfM4drVDk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"]
    ];
});
_c8 = BridgeGhostTooth;
// Preload all unique tooth models + implant for instant switching
const ALL_MODEL_PATHS = [
    '/models/tooth_11.glb',
    '/models/tooth_13.glb',
    '/models/tooth_14.glb',
    '/models/tooth_15.glb',
    '/models/tooth_16.glb',
    '/models/tooth_17.glb',
    '/models/tooth_18.glb',
    '/models/tooth_31.glb',
    '/models/tooth_32.glb',
    '/models/tooth_33.glb',
    '/models/tooth_34.glb',
    '/models/tooth_35.glb',
    '/models/tooth_36.glb',
    '/models/tooth_37.glb',
    '/models/tooth_38.glb',
    '/models/implant.glb'
];
ALL_MODEL_PATHS.forEach((p)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload(p));
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "ImplantScrew$memo");
__turbopack_context__.k.register(_c1, "ImplantScrew");
__turbopack_context__.k.register(_c2, "RootCanals$memo");
__turbopack_context__.k.register(_c3, "RootCanals");
__turbopack_context__.k.register(_c4, "PreparedStump$memo");
__turbopack_context__.k.register(_c5, "PreparedStump");
__turbopack_context__.k.register(_c6, "Tooth");
__turbopack_context__.k.register(_c7, "BridgeGhostTooth$memo");
__turbopack_context__.k.register(_c8, "BridgeGhostTooth");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/DentitionView.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DentitionView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/web/Html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Center.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/Tooth.jsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const ArchTooth = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s(function ArchTooth({ tooth, archPose, toothScale = 1, diagnoses, findings, treatmentHistoryTags, showTreatmentTags = true, isImplant, isHovered, isPinned, agentPulse = false, onHover, onClick, onPin }) {
    _s();
    const { gl, camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const gltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(tooth.modelPath);
    const implantGltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])('/models/implant.glb');
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // Center ref (for bounding box)
    const outerGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // mirrorX group (parentGroup for diagnosis visuals)
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isMissing = diagnoses?.has('Missing') || diagnoses?.has('Extraction') || false;
    const isCrown = diagnoses?.has('Crown') || false;
    const isRCT = diagnoses?.has('RCT') || false;
    const isBridge = diagnoses?.has('Bridge') || false;
    const isDenture = diagnoses?.has('Denture') || false;
    // Fresh clone on every mount — mount generation forces a new clone so that
    // switching tabs (Adult→Pedia→Adult) always starts with clean materials.
    const [mountGen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ArchTooth.ArchTooth.useState": ()=>Math.random()
    }["ArchTooth.ArchTooth.useState"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const clonedScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ArchTooth.ArchTooth.useMemo[clonedScene]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneSceneWithUniqueMaterials"])(gltf.scene)
    }["ArchTooth.ArchTooth.useMemo[clonedScene]"], [
        gltf,
        mountGen
    ]);
    // Implant placement state + tooth mesh ref for procedural implant
    const [implantPlacement, setImplantPlacement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Mesh bounds + dirs for PreparedStump and RootCanals
    const [meshBoundsData, setMeshBoundsData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [zoneDirs, setZoneDirs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toothMeshRefLocal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const implantBB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const shaderRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const shaderInjectedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const zoneFindingsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]);
    // Update findings ref whenever findings change — picked up next frame
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArchTooth.ArchTooth.useEffect": ()=>{
            const order = [
                'occlusal',
                'buccal',
                'lingual',
                'mesial',
                'distal',
                'cervical',
                'root'
            ];
            zoneFindingsRef.current = order.map({
                "ArchTooth.ArchTooth.useEffect": (z)=>findings.some({
                        "ArchTooth.ArchTooth.useEffect": (f)=>f.zoneId === z
                    }["ArchTooth.ArchTooth.useEffect"]) ? 1 : 0
            }["ArchTooth.ArchTooth.useEffect"]);
        }
    }["ArchTooth.ArchTooth.useEffect"], [
        findings
    ]);
    // Push finding-tint uniform every frame
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ArchTooth.ArchTooth.useFrame": ()=>{
            const zf = zoneFindingsRef.current;
            for (const ref of shaderRefs.current){
                const s = ref.shader;
                if (!s?.uniforms?.uZoneHasFinding) continue;
                const arr = s.uniforms.uZoneHasFinding.value;
                arr[0] = zf[0];
                arr[1] = zf[1];
                arr[2] = zf[2];
                arr[3] = zf[3];
                arr[4] = zf[4];
                arr[5] = zf[5];
                arr[6] = zf[6];
            }
        }
    }["ArchTooth.ArchTooth.useFrame"]);
    // Capture first mesh from cloned scene
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ArchTooth.ArchTooth.useMemo": ()=>{
            toothMeshRefLocal.current = null;
            clonedScene.traverse({
                "ArchTooth.ArchTooth.useMemo": (obj)=>{
                    const m = obj;
                    if (m.isMesh && !toothMeshRefLocal.current) {
                        toothMeshRefLocal.current = m;
                    }
                }
            }["ArchTooth.ArchTooth.useMemo"]);
        }
    }["ArchTooth.ArchTooth.useMemo"], [
        clonedScene
    ]);
    // After mount: compute bounding box and inject the SAME shader as single-tooth view
    // No guard ref — always re-inject when diagnosis flags change.
    // Uses requestAnimationFrame to wait for <Center> layout.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "ArchTooth.ArchTooth.useLayoutEffect": ()=>{
            shaderInjectedRef.current = false;
            shaderRefs.current = [];
            let cancelled = false;
            let rafOuter = 0;
            let rafInner = 0;
            const applyToCurrentScene = {
                "ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene": ()=>{
                    if (cancelled) return false;
                    if (shaderInjectedRef.current) return true;
                    if (!groupRef.current) return false;
                    // Walk UP the ancestor chain first so groupRef.matrixWorld reflects
                    // the dentition parent-group offset (position: [-contentCenter, ...])
                    // and the arch-pose outer group. On first mount inside a useLayoutEffect
                    // the parent matrices are still identity (no frame has rendered yet),
                    // so updateMatrixWorld(true) alone yields a LOCAL-space bbox which makes
                    // uCejY/uCervicalY wildly wrong and the crown-root gradient saturates
                    // into the root tint across every tooth.
                    groupRef.current.updateWorldMatrix(true, true);
                    const bb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(groupRef.current);
                    const sizeProbe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                    bb.getSize(sizeProbe);
                    if (sizeProbe.lengthSq() < 1e-8) return false;
                    const center = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                    const size = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                    bb.getCenter(center);
                    bb.getSize(size);
                    let cervicalY, cejY, crownBottomY;
                    if (tooth.arch === 'maxillary') {
                        cervicalY = bb.min.y + size.y * 0.42;
                        cejY = bb.min.y + size.y * 0.50;
                        crownBottomY = bb.min.y;
                    } else {
                        cervicalY = bb.max.y - size.y * 0.42;
                        cejY = bb.max.y - size.y * 0.50;
                        crownBottomY = bb.max.y;
                    }
                    const quadNum = parseInt(tooth.fdi[0]);
                    const zoneYawRad = quadNum === 1 || quadNum === 4 ? -Math.PI * (tooth.position - 1) / 14 : Math.PI * (tooth.position - 1) / 14;
                    // Collect materials and inject the same shader as single-tooth view.
                    const materials = [];
                    clonedScene.traverse({
                        "ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene": (obj)=>{
                            const m = obj;
                            if (m.isMesh && m.material) {
                                if (Array.isArray(m.material)) materials.push(...m.material);
                                else materials.push(m.material);
                            }
                        }
                    }["ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene"]);
                    if (materials.length === 0) return false;
                    shaderRefs.current = [];
                    for (const mat of materials){
                        shaderRefs.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["injectShader"])(mat, cervicalY, cejY, crownBottomY, center.x, center.z, tooth.arch, tooth.quadrant, zoneYawRad, tooth.fdi, isImplant, isMissing, isCrown, isRCT, isBridge, isDenture));
                        mat.needsUpdate = true;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prewarmDentalShaderProgram"])({
                        gl,
                        camera,
                        source: clonedScene,
                        variantKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDentalShaderVariantKey"])({
                            isImplant,
                            isMissing,
                            isCrown,
                            isRCT,
                            isBridge,
                            isDenture
                        })
                    });
                    shaderInjectedRef.current = true;
                    // Compute implant placement + store bb
                    implantBB.current = bb;
                    if (isImplant) {
                        const cervicalDiam = Math.max(size.x, size.z) * 0.75;
                        setImplantPlacement({
                            cervicalY,
                            centerX: center.x,
                            centerZ: center.z,
                            cervicalDiam
                        });
                    } else {
                        setImplantPlacement(null);
                    }
                    // Compute mesh bounds in outerGroupRef local space for Crown/RCT visuals
                    // This ensures PreparedStump + RootCanals render correctly regardless of arch position
                    if (outerGroupRef.current) {
                        outerGroupRef.current.updateMatrixWorld(true);
                        const outerInv = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().copy(outerGroupRef.current.matrixWorld).invert();
                        const localCenter = center.clone().applyMatrix4(outerInv);
                        const localBBmin = bb.min.clone().applyMatrix4(outerInv);
                        const localBBmax = bb.max.clone().applyMatrix4(outerInv);
                        const localBB = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](Math.min(localBBmin.x, localBBmax.x), Math.min(localBBmin.y, localBBmax.y), Math.min(localBBmin.z, localBBmax.z)), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](Math.max(localBBmin.x, localBBmax.x), Math.max(localBBmin.y, localBBmax.y), Math.max(localBBmin.z, localBBmax.z)));
                        const localSize = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                        localBB.getSize(localSize);
                        const localCervPt = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](center.x, cervicalY, center.z).applyMatrix4(outerInv);
                        setMeshBoundsData({
                            center: localCenter,
                            size: localSize,
                            cervicalY: localCervPt.y,
                            bb: localBB
                        });
                        // Compute direction vectors in outerGroupRef local space
                        const dirs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirsForTooth"])(tooth.fdi, tooth.quadrant, zoneYawRad);
                        // Transform direction vectors to local space (rotation only, no translation)
                        const normalMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix3"]().getNormalMatrix(outerInv);
                        const transformDir = {
                            "ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene.transformDir": (d)=>d.clone().applyMatrix3(normalMatrix).normalize()
                        }["ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene.transformDir"];
                        setZoneDirs({
                            buccal: transformDir(dirs.buccal),
                            lingual: transformDir(dirs.lingual),
                            mesial: transformDir(dirs.mesial),
                            distal: transformDir(dirs.distal)
                        });
                    }
                    return true;
                }
            }["ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene"];
            const runWithRetries = {
                "ArchTooth.ArchTooth.useLayoutEffect.runWithRetries": ()=>{
                    if (applyToCurrentScene()) return;
                    let raf = 0;
                    let tries = 0;
                    const maxTries = 120;
                    const tick = {
                        "ArchTooth.ArchTooth.useLayoutEffect.runWithRetries.tick": ()=>{
                            if (cancelled) return;
                            if (applyToCurrentScene()) return;
                            tries += 1;
                            if (tries < maxTries) raf = requestAnimationFrame(tick);
                        }
                    }["ArchTooth.ArchTooth.useLayoutEffect.runWithRetries.tick"];
                    raf = requestAnimationFrame(tick);
                    return ({
                        "ArchTooth.ArchTooth.useLayoutEffect.runWithRetries": ()=>cancelAnimationFrame(raf)
                    })["ArchTooth.ArchTooth.useLayoutEffect.runWithRetries"];
                }
            }["ArchTooth.ArchTooth.useLayoutEffect.runWithRetries"];
            const cancelRetry = runWithRetries();
            const lateRetry = window.setTimeout({
                "ArchTooth.ArchTooth.useLayoutEffect.lateRetry": ()=>{
                    if (!shaderInjectedRef.current && !cancelled) {
                        // One extra pass after layout stabilizes (tab/type transitions).
                        applyToCurrentScene();
                    }
                }
            }["ArchTooth.ArchTooth.useLayoutEffect.lateRetry"], 1200);
            // Match Tooth.tsx timing model: defer to post-layout via double RAF.
            rafOuter = requestAnimationFrame({
                "ArchTooth.ArchTooth.useLayoutEffect": ()=>{
                    rafInner = requestAnimationFrame({
                        "ArchTooth.ArchTooth.useLayoutEffect": ()=>{
                            if (!shaderInjectedRef.current && !cancelled) {
                                applyToCurrentScene();
                            }
                        }
                    }["ArchTooth.ArchTooth.useLayoutEffect"]);
                }
            }["ArchTooth.ArchTooth.useLayoutEffect"]);
            return ({
                "ArchTooth.ArchTooth.useLayoutEffect": ()=>{
                    cancelled = true;
                    cancelRetry?.();
                    cancelAnimationFrame(rafOuter);
                    cancelAnimationFrame(rafInner);
                    window.clearTimeout(lateRetry);
                }
            })["ArchTooth.ArchTooth.useLayoutEffect"];
        }
    }["ArchTooth.ArchTooth.useLayoutEffect"], [
        clonedScene,
        tooth,
        isImplant,
        isMissing,
        isCrown,
        isRCT,
        isBridge,
        isDenture,
        gl,
        camera
    ]);
    // Hover glow on state change (avoid per-frame traversals across all teeth).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArchTooth.ArchTooth.useEffect": ()=>{
            if (!meshRef.current) return;
            meshRef.current.traverse({
                "ArchTooth.ArchTooth.useEffect": (obj)=>{
                    const m = obj;
                    if (m.isMesh && m.material && !Array.isArray(m.material)) {
                        const mat = m.material;
                        if (mat.metalness > 0.5) return;
                        if (isHovered) {
                            mat.emissiveIntensity = 0.32;
                            mat.emissive.set('#4a9eff');
                        } else {
                            mat.emissiveIntensity = 0;
                            mat.emissive.set('#000000');
                        }
                    }
                }
            }["ArchTooth.ArchTooth.useEffect"]);
        }
    }["ArchTooth.ArchTooth.useEffect"], [
        isHovered
    ]);
    /** Two clear wobble cycles (~1s) when AI applies scan — strong enough to notice, then stops. */ const pulseStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hadPulseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ArchTooth.ArchTooth.useFrame": (state)=>{
            if (!meshRef.current) return;
            const base = toothScale;
            if (!agentPulse) {
                pulseStartRef.current = null;
                hadPulseRef.current = false;
                meshRef.current.scale.setScalar(base);
                return;
            }
            if (!hadPulseRef.current) {
                pulseStartRef.current = state.clock.elapsedTime;
                hadPulseRef.current = true;
            }
            const t0 = pulseStartRef.current;
            if (t0 == null) {
                meshRef.current.scale.setScalar(base);
                return;
            }
            const elapsed = state.clock.elapsedTime - t0;
            const dur = 1.15;
            if (elapsed >= dur) {
                meshRef.current.scale.setScalar(base);
                return;
            }
            const t = elapsed / dur;
            /** Gentle envelope — subtle second beat, no harsh “rubber” bounce */ const envelope = Math.pow(1 - t, 1.35);
            /** Two full sine cycles across [0, 1] → sin(4πt); amplitude kept low for polish */ const wobble = envelope * 0.034 * Math.sin(t * Math.PI * 4);
            meshRef.current.scale.setScalar(base * (1 + wobble));
        }
    }["ArchTooth.ArchTooth.useFrame"]);
    if (!archPose) return null;
    const handlePointerEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ArchTooth.ArchTooth.useCallback[handlePointerEnter]": (e)=>{
            e.stopPropagation();
            onHover(tooth.fdi);
            document.body.style.cursor = 'pointer';
        }
    }["ArchTooth.ArchTooth.useCallback[handlePointerEnter]"], [
        tooth.fdi,
        onHover
    ]);
    const handlePointerLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ArchTooth.ArchTooth.useCallback[handlePointerLeave]": (e)=>{
            e.stopPropagation();
            onHover(null);
            document.body.style.cursor = 'default';
        }
    }["ArchTooth.ArchTooth.useCallback[handlePointerLeave]"], [
        onHover
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ArchTooth.ArchTooth.useCallback[handleClick]": (e)=>{
            e.stopPropagation();
            // On touch: first tap pins the tooltip, second tap navigates.
            // On mouse: click navigates immediately (hover already shows tooltip).
            const isTouch = e.pointerType === 'touch' || e.nativeEvent?.pointerType === 'touch';
            if (isTouch) {
                if (isPinned) {
                    onPin(null);
                    onClick(tooth);
                } else {
                    onPin(tooth.fdi);
                }
            } else {
                onClick(tooth);
            }
        }
    }["ArchTooth.ArchTooth.useCallback[handleClick]"], [
        tooth,
        onClick,
        onPin,
        isPinned
    ]);
    // Diagnosis labels for pill (only tooth-level primary diagnoses)
    const occlusalOffsetY = tooth.arch === 'maxillary' ? -0.75 : 0.75;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("group", {
        ref: meshRef,
        position: archPose.position,
        rotation: archPose.rotation,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("group", {
                ref: outerGroupRef,
                scale: tooth.mirrorX ? [
                    -1,
                    1,
                    1
                ] : [
                    1,
                    1,
                    1
                ],
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Center"], {
                        ref: groupRef,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("primitive", {
                            object: clonedScene,
                            onPointerEnter: handlePointerEnter,
                            onPointerLeave: handlePointerLeave,
                            onClick: handleClick
                        })
                    }),
                    isCrown && meshBoundsData && toothMeshRefLocal.current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PreparedStump"], {
                        toothMesh: toothMeshRefLocal.current,
                        meshBounds: meshBoundsData,
                        arch: tooth.arch,
                        parentGroup: outerGroupRef.current
                    }),
                    isRCT && meshBoundsData && zoneDirs && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RootCanals"], {
                        meshBounds: meshBoundsData,
                        arch: tooth.arch,
                        toothPosition: tooth.position,
                        dirs: zoneDirs,
                        toothFdi: tooth.fdi
                    }),
                    isImplant && implantPlacement && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImplantScrew"], {
                        placement: implantPlacement,
                        arch: tooth.arch,
                        implantScene: implantGltf.scene,
                        toothMesh: toothMeshRefLocal.current,
                        bb: implantBB.current,
                        parentGroup: outerGroupRef.current
                    })
                ]
            }),
            treatmentHistoryTags.length > 0 && showTreatmentTags && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
                position: [
                    0,
                    occlusalOffsetY,
                    0
                ],
                center: true,
                style: {
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                },
                zIndexRange: isHovered || isPinned ? [
                    80,
                    40
                ] : [
                    30,
                    0
                ],
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                    },
                    children: treatmentHistoryTags.map((d)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            style: {
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontFamily: 'Inter, sans-serif',
                                background: 'rgba(107, 114, 128, 0.78)',
                                color: '#fff',
                                lineHeight: '1.3',
                                backdropFilter: 'blur(3px)',
                                letterSpacing: '0.01em'
                            },
                            children: d
                        }, d))
                })
            })
        ]
    });
}, "nZrIR9hXr5lTXWMF/A/bGHmXDds=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
})), "nZrIR9hXr5lTXWMF/A/bGHmXDds=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = ArchTooth;
// Scope detection for tag consolidation: when a diagnosis covers exactly a
// recognizable zone (whole Mandibular, a quadrant, etc.), the dentition shows
// it ONCE — a single "RCT · Mandibular" tag on a front-centre representative
// tooth — instead of repeating it on every tooth in the zone.
const SCOPE_QUAD_DEFS = [
    [
        'Mandibular',
        [
            'lower-left',
            'lower-right'
        ]
    ],
    [
        'Maxillary',
        [
            'upper-right',
            'upper-left'
        ]
    ],
    [
        'Right arch',
        [
            'upper-right',
            'lower-right'
        ]
    ],
    [
        'Left arch',
        [
            'upper-left',
            'lower-left'
        ]
    ],
    [
        'Upper Right',
        [
            'upper-right'
        ]
    ],
    [
        'Upper Left',
        [
            'upper-left'
        ]
    ],
    [
        'Lower Left',
        [
            'lower-left'
        ]
    ],
    [
        'Lower Right',
        [
            'lower-right'
        ]
    ]
];
function detectScopeForDiag(fdis, teethList) {
    const byQ = {
        'upper-right': [],
        'upper-left': [],
        'lower-left': [],
        'lower-right': []
    };
    teethList.forEach((t)=>{
        if (byQ[t.quadrant]) byQ[t.quadrant].push(t.fdi);
    });
    const set = new Set(fdis);
    const eq = (arr)=>arr.length > 1 && arr.length === set.size && arr.every((f)=>set.has(f));
    const all = [
        ...byQ['upper-right'],
        ...byQ['upper-left'],
        ...byQ['lower-left'],
        ...byQ['lower-right']
    ];
    if (eq(all)) return 'Full mouth';
    for (const [label, quads] of SCOPE_QUAD_DEFS){
        if (eq(quads.flatMap((q)=>byQ[q]))) return label;
    }
    return null;
}
function DentitionView({ patientType, visibleFdis, disableSelection = false, layoutMode = 'split', showGuides = false, showScopeHotspots = false, onSelectScope, toothDiagnoses, findingsByTooth, implantTeeth, onSelectTooth, onHoverTooth, externalHoveredFdi, allEntries, toothNotes, agentPulseFdis, showTreatmentTags = true }) {
    _s1();
    const USE_SPLIT_QUADRANT_EXPERIMENT = layoutMode === 'split';
    const [hoveredTooth, setHoveredToothInternal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Wrap setter to also notify parent.
    const setHoveredTooth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentitionView.useCallback[setHoveredTooth]": (v)=>{
            setHoveredToothInternal(v);
            onHoverTooth?.(v);
        }
    }["DentitionView.useCallback[setHoveredTooth]"], [
        onHoverTooth
    ]);
    // Merge externally-driven hover (e.g. from summary card hover).
    const effectiveHovered = externalHoveredFdi ?? hoveredTooth;
    const [pinnedTooth, setPinnedTooth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Clear pinned tooltip on background tap / ESC
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentitionView.useEffect": ()=>{
            const onDoc = {
                "DentitionView.useEffect.onDoc": (e)=>{
                    // If click lands on the canvas but NOT on a tooth (no stopPropagation), clear pin.
                    // We rely on the tooth's onClick having already fired and set pinnedTooth.
                    // This timeout defers so the tooth's handler runs first.
                    setTimeout({
                        "DentitionView.useEffect.onDoc": ()=>{
                            const target = e.target;
                            if (!target.closest('canvas')) setPinnedTooth(null);
                        }
                    }["DentitionView.useEffect.onDoc"], 0);
                }
            }["DentitionView.useEffect.onDoc"];
            const onKey = {
                "DentitionView.useEffect.onKey": (e)=>{
                    if (e.key === 'Escape') setPinnedTooth(null);
                }
            }["DentitionView.useEffect.onKey"];
            window.addEventListener('keydown', onKey);
            window.addEventListener('click', onDoc);
            return ({
                "DentitionView.useEffect": ()=>{
                    window.removeEventListener('keydown', onKey);
                    window.removeEventListener('click', onDoc);
                }
            })["DentitionView.useEffect"];
        }
    }["DentitionView.useEffect"], []);
    const activeFdi = effectiveHovered || pinnedTooth;
    const isPediatricOnly = patientType === 'pediatric';
    const isMixed = patientType === 'mixed';
    const activeTeeth = isMixed ? [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"]
    ] : isPediatricOnly ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"] : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"];
    const activePositions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[activePositions]": ()=>{
            if (isMixed) {
                const mixed = {};
                // Adult arches stay top/bottom. Pediatric arches sit in-between.
                const adultUpperYOffset = 2.25;
                const adultLowerYOffset = -1.9;
                const pedUpperYOffset = 0.2;
                const pedLowerYOffset = -0.15;
                for (const tooth of __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"]){
                    const base = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARCH_POSITIONS"][tooth.fdi];
                    if (!base) continue;
                    const yShift = tooth.arch === 'maxillary' ? adultUpperYOffset : adultLowerYOffset;
                    const xShift = USE_SPLIT_QUADRANT_EXPERIMENT ? tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left' ? 0.35 : -0.35 : 0;
                    mixed[tooth.fdi] = {
                        position: [
                            base.position[0] + xShift,
                            base.position[1] + yShift,
                            base.position[2]
                        ],
                        rotation: base.rotation
                    };
                }
                for (const tooth of __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"]){
                    const base = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_ARCH_POSITIONS"][tooth.fdi];
                    if (!base) continue;
                    const yShift = tooth.arch === 'maxillary' ? pedUpperYOffset : pedLowerYOffset;
                    const xShift = USE_SPLIT_QUADRANT_EXPERIMENT ? tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left' ? 0.35 : -0.35 : 0;
                    mixed[tooth.fdi] = {
                        position: [
                            base.position[0] + xShift,
                            base.position[1] + yShift,
                            base.position[2]
                        ],
                        rotation: base.rotation
                    };
                }
                return mixed;
            }
            const baseline = isPediatricOnly ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_ARCH_POSITIONS"] : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARCH_POSITIONS"];
            if (!USE_SPLIT_QUADRANT_EXPERIMENT) return baseline;
            const split = {};
            for (const tooth of activeTeeth){
                const base = baseline[tooth.fdi];
                if (!base) continue;
                const isUpper = tooth.arch === 'maxillary';
                const isLeft = tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left';
                split[tooth.fdi] = {
                    position: [
                        base.position[0] + (isLeft ? 0.5 : -0.5),
                        base.position[1] + (isUpper ? 0.42 : -0.42),
                        base.position[2]
                    ],
                    rotation: base.rotation
                };
            }
            return split;
        }
    }["DentitionView.useMemo[activePositions]"], [
        USE_SPLIT_QUADRANT_EXPERIMENT,
        activeTeeth,
        isMixed,
        isPediatricOnly
    ]);
    const sceneScale = isPediatricOnly ? [
        0.85,
        0.85,
        0.85
    ] : [
        1,
        1,
        1
    ];
    const visibleTeeth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[visibleTeeth]": ()=>activeTeeth.filter({
                "DentitionView.useMemo[visibleTeeth]": (tooth)=>!visibleFdis || visibleFdis.includes(tooth.fdi)
            }["DentitionView.useMemo[visibleTeeth]"])
    }["DentitionView.useMemo[visibleTeeth]"], [
        activeTeeth,
        visibleFdis
    ]);
    // Consolidate scope-wide diagnoses into a single representative tag.
    const groupTags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[groupTags]": ()=>{
            const diagToFdis = {};
            Object.entries(toothDiagnoses || {}).forEach({
                "DentitionView.useMemo[groupTags]": ([fdi, set])=>{
                    const arr = set instanceof Set ? [
                        ...set
                    ] : set || [];
                    arr.forEach({
                        "DentitionView.useMemo[groupTags]": (d)=>{
                            (diagToFdis[d] = diagToFdis[d] || []).push(fdi);
                        }
                    }["DentitionView.useMemo[groupTags]"]);
                }
            }["DentitionView.useMemo[groupTags]"]);
            if (implantTeeth) (implantTeeth instanceof Set ? [
                ...implantTeeth
            ] : implantTeeth).forEach({
                "DentitionView.useMemo[groupTags]": (f)=>{
                    (diagToFdis['Implant'] = diagToFdis['Implant'] || []).push(f);
                }
            }["DentitionView.useMemo[groupTags]"]);
            const suppressed = new Set();
            const repLabels = {};
            Object.entries(diagToFdis).forEach({
                "DentitionView.useMemo[groupTags]": ([diag, fdis])=>{
                    const uniq = [
                        ...new Set(fdis)
                    ];
                    if (uniq.length < 2) return;
                    const scope = detectScopeForDiag(uniq, activeTeeth);
                    if (!scope) return;
                    const rep = [
                        '41',
                        '31',
                        '11',
                        '21'
                    ].find({
                        "DentitionView.useMemo[groupTags]": (f)=>uniq.includes(f)
                    }["DentitionView.useMemo[groupTags]"]) ?? uniq.slice().sort()[Math.floor(uniq.length / 2)];
                    uniq.forEach({
                        "DentitionView.useMemo[groupTags]": (f)=>suppressed.add(`${f}:${diag}`)
                    }["DentitionView.useMemo[groupTags]"]);
                    (repLabels[rep] = repLabels[rep] || []).push(`${diag} · ${scope}`);
                }
            }["DentitionView.useMemo[groupTags]"]);
            return {
                suppressed,
                repLabels
            };
        }
    }["DentitionView.useMemo[groupTags]"], [
        toothDiagnoses,
        implantTeeth,
        activeTeeth
    ]);
    const contentCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[contentCenter]": ()=>{
            if (visibleTeeth.length === 0) return [
                0,
                0,
                0
            ];
            const sum = visibleTeeth.reduce({
                "DentitionView.useMemo[contentCenter].sum": (acc, tooth)=>{
                    const pose = activePositions[tooth.fdi];
                    if (!pose) return acc;
                    return [
                        acc[0] + pose.position[0],
                        acc[1] + pose.position[1],
                        acc[2] + pose.position[2]
                    ];
                }
            }["DentitionView.useMemo[contentCenter].sum"], [
                0,
                0,
                0
            ]);
            return [
                sum[0] / visibleTeeth.length,
                sum[1] / visibleTeeth.length,
                sum[2] / visibleTeeth.length
            ];
        }
    }["DentitionView.useMemo[contentCenter]"], [
        activePositions,
        visibleTeeth
    ]);
    // Keep the dentition stack slightly lower so it aligns with the split drag-handle midpoint.
    // Shift the arch group upward so lower teeth don't overlap the scope bar
    // that sits at the bottom of the canvas (absolute bottom: 16px).
    const frameVerticalOffset = -0.85;
    const activeTooth = activeFdi ? activeTeeth.find((t)=>t.fdi === activeFdi) : null;
    const guideSegments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[guideSegments]": ()=>{
            if (!showGuides) return null;
            if (isMixed) {
                // Vertical center + separators between the 4 mixed rows.
                return new Float32Array([
                    0,
                    3.2,
                    -2.6,
                    0,
                    -3.2,
                    -2.6,
                    -5.2,
                    1.15,
                    -2.6,
                    5.2,
                    1.15,
                    -2.6,
                    -5.2,
                    -0.4,
                    -2.6,
                    5.2,
                    -0.4,
                    -2.6,
                    -5.2,
                    -2.05,
                    -2.6,
                    5.2,
                    -2.05,
                    -2.6
                ]);
            }
            return new Float32Array([
                0,
                2.3,
                -2.6,
                0,
                -2.3,
                -2.6,
                -5.2,
                0,
                -2.6,
                5.2,
                0,
                -2.6
            ]);
        }
    }["DentitionView.useMemo[guideSegments]"], [
        showGuides,
        isMixed
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("group", {
        scale: sceneScale,
        position: [
            -contentCenter[0],
            -contentCenter[1] + frameVerticalOffset,
            -contentCenter[2]
        ],
        children: [
            guideSegments && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("lineSegments", {
                renderOrder: 1,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("bufferGeometry", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("bufferAttribute", {
                            attach: "attributes-position",
                            args: [
                                guideSegments,
                                3
                            ]
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("lineBasicMaterial", {
                        color: "#94a3b8",
                        transparent: true,
                        opacity: 0.35
                    })
                ]
            }),
            visibleTeeth.map((tooth)=>{
                const isPrimaryTooth = [
                    '5',
                    '6',
                    '7',
                    '8'
                ].includes(tooth.fdi[0]);
                const findings = findingsByTooth[tooth.fdi] || [];
                // Grouped (scope-wide) diagnoses are suppressed here — they're shown
                // once as a banner at the top of the dentition, not on each tooth.
                const treatmentHistoryTags = Array.from(new Set([
                    ...toothDiagnoses[tooth.fdi] ? Array.from(toothDiagnoses[tooth.fdi]) : [],
                    ...implantTeeth.has(tooth.fdi) ? [
                        'Implant'
                    ] : []
                ])).filter((d)=>!groupTags.suppressed.has(`${tooth.fdi}:${d}`));
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ArchTooth, {
                    tooth: tooth,
                    archPose: activePositions[tooth.fdi],
                    toothScale: isMixed && isPrimaryTooth ? 0.85 : 1,
                    diagnoses: toothDiagnoses[tooth.fdi],
                    findings: findings,
                    treatmentHistoryTags: treatmentHistoryTags,
                    showTreatmentTags: showTreatmentTags,
                    isImplant: implantTeeth.has(tooth.fdi),
                    isHovered: effectiveHovered === tooth.fdi,
                    isPinned: pinnedTooth === tooth.fdi,
                    agentPulse: Boolean(agentPulseFdis?.has?.(tooth.fdi)),
                    onHover: setHoveredTooth,
                    onClick: disableSelection ? ()=>{} : onSelectTooth,
                    onPin: setPinnedTooth
                }, `${patientType}-${layoutMode}-${tooth.fdi}-${[
                    ...toothDiagnoses[tooth.fdi] || []
                ].join(',')}-${implantTeeth.has(tooth.fdi)}`);
            }),
            showScopeHotspots && onSelectScope && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ScopeHotspot, {
                        label: "UR",
                        position: [
                            -3.2,
                            1.2,
                            -2.8
                        ],
                        onClick: ()=>onSelectScope('UR')
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ScopeHotspot, {
                        label: "UL",
                        position: [
                            3.2,
                            1.2,
                            -2.8
                        ],
                        onClick: ()=>onSelectScope('UL')
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ScopeHotspot, {
                        label: "LR",
                        position: [
                            -3.2,
                            -1.2,
                            -2.8
                        ],
                        onClick: ()=>onSelectScope('LR')
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ScopeHotspot, {
                        label: "LL",
                        position: [
                            3.2,
                            -1.2,
                            -2.8
                        ],
                        onClick: ()=>onSelectScope('LL')
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ScopeHotspot, {
                        label: "Full",
                        position: [
                            0,
                            0,
                            -3.2
                        ],
                        onClick: ()=>onSelectScope('FULL'),
                        emphasized: true
                    })
                ]
            }),
            activeTooth && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(DentitionTooltip, {
                tooth: activeTooth,
                archPose: activePositions[activeTooth.fdi],
                findings: findingsByTooth[activeTooth.fdi] || [],
                diagnoses: toothDiagnoses[activeTooth.fdi],
                isImplant: implantTeeth.has(activeTooth.fdi),
                allEntries: allEntries,
                toothNotes: toothNotes
            })
        ]
    });
}
_s1(DentitionView, "Z2M4vTRPMJNBVnduSvoQIldjozI=");
_c2 = DentitionView;
function ScopeHotspot({ label, position, onClick, emphasized = false }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
        position: position,
        transform: true,
        occlude: true,
        zIndexRange: [
            220,
            80
        ],
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
            type: "button",
            onClick: onClick,
            style: {
                cursor: 'pointer',
                minWidth: emphasized ? 64 : 44,
                height: emphasized ? 30 : 28,
                borderRadius: emphasized ? 16 : 14,
                border: '1px solid rgba(255,255,255,0.42)',
                background: emphasized ? 'rgba(30, 41, 59, 0.78)' : 'rgba(15, 23, 42, 0.66)',
                color: '#f8fafc',
                fontSize: emphasized ? 12 : 11,
                fontWeight: 700,
                padding: '0 12px',
                boxShadow: '0 4px 14px rgba(2, 6, 23, 0.22)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease'
            },
            onMouseEnter: (e)=>{
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.background = emphasized ? 'rgba(15, 23, 42, 0.88)' : 'rgba(30, 41, 59, 0.78)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(2, 6, 23, 0.3)';
            },
            onMouseLeave: (e)=>{
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = emphasized ? 'rgba(30, 41, 59, 0.78)' : 'rgba(15, 23, 42, 0.66)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(2, 6, 23, 0.22)';
            },
            children: label
        })
    });
}
_c3 = ScopeHotspot;
// ══════════════════════════════════════════════════════════════
// DentitionTooltip — camera-relative tooltip that stays fixed on
// screen regardless of tooth rotation. Only the leader line updates.
// ══════════════════════════════════════════════════════════════
function DentitionTooltip({ tooth, archPose, findings, diagnoses, isImplant, allEntries, toothNotes }) {
    _s2();
    const tooltipRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const connectorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { camera, gl, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const violetAccent = {
        stroke: '#8B5CF6',
        badgeBg: '#8B5CF6',
        badgeText: '#ffffff'
    };
    // With the narrow side panel and wider 3D canvas, horizontal space on either
    // side of the arch is limited. Place tooltip ABOVE maxillary teeth and BELOW
    // mandibular teeth so it always lands in the whitespace outside the arch —
    // never behind a tooth.
    const isMax = tooth.arch === 'maxillary';
    // Anchor near the outer edge of the tooth rather than its center, then keep
    // a consistent visual gap in screen-space via dynamic transform.
    const tooltipAnchorWorld = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionTooltip.useMemo[tooltipAnchorWorld]": ()=>{
            if (!archPose) return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](archPose.position[0], archPose.position[1] + (isMax ? 0.72 : -0.72), archPose.position[2]);
        }
    }["DentitionTooltip.useMemo[tooltipAnchorWorld]"], [
        archPose,
        isMax
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "DentitionTooltip.useFrame": ()=>{
            const el = tooltipRef.current;
            if (!el) return;
            const connector = connectorRef.current;
            const canvasRect = gl.domElement.getBoundingClientRect();
            const projected = tooltipAnchorWorld.clone().project(camera);
            // Hide if clipped behind camera/frustum.
            if (projected.z < -1 || projected.z > 1) {
                el.style.opacity = "0";
                if (connector) connector.style.opacity = "0";
                return;
            }
            el.style.opacity = "1";
            if (connector) connector.style.opacity = "1";
            const anchorX = canvasRect.left + (projected.x * 0.5 + 0.5) * size.width;
            const anchorY = canvasRect.top + (-projected.y * 0.5 + 0.5) * size.height;
            const toothProjected = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](archPose.position[0], archPose.position[1], archPose.position[2]).project(camera);
            const toothCenterX = canvasRect.left + (toothProjected.x * 0.5 + 0.5) * size.width;
            const toothCenterY = canvasRect.top + (-toothProjected.y * 0.5 + 0.5) * size.height;
            const gapPx = 30;
            const edgePad = 10;
            const rect = el.getBoundingClientRect();
            // Normalize placement behavior so empty cards choose sides like filled cards.
            const layoutW = Math.max(rect.width, isTiny ? 220 : 240);
            const layoutH = Math.max(rect.height, isTiny ? 150 : 170);
            const minX = canvasRect.left + edgePad;
            const maxX = canvasRect.right - edgePad - layoutW;
            const minY = canvasRect.top + edgePad;
            const maxY = canvasRect.bottom - edgePad - layoutH;
            const clamp = {
                "DentitionTooltip.useFrame.clamp": (v, lo, hi)=>Math.min(Math.max(v, lo), hi)
            }["DentitionTooltip.useFrame.clamp"];
            const baseTopX = -layoutW / 2;
            const baseBottomX = -layoutW / 2;
            const baseRightY = -layoutH / 2;
            const baseLeftY = -layoutH / 2;
            // For side placements, nudge away from tooth center so cards don't sit over crown.
            const sideVerticalBias = isMax ? -Math.max(24, layoutH * 0.2) : Math.max(24, layoutH * 0.2);
            const topNaturalLeft = anchorX + baseTopX;
            const bottomNaturalLeft = anchorX + baseBottomX;
            const rightNaturalTop = anchorY + baseRightY;
            const leftNaturalTop = anchorY + baseLeftY;
            const topAdjX = clamp(topNaturalLeft, minX, maxX) - topNaturalLeft;
            const bottomAdjX = clamp(bottomNaturalLeft, minX, maxX) - bottomNaturalLeft;
            const rightAdjY = clamp(rightNaturalTop, minY, maxY) - rightNaturalTop;
            const leftAdjY = clamp(leftNaturalTop, minY, maxY) - leftNaturalTop;
            const sides = [
                {
                    side: 'top',
                    fits: anchorY - gapPx - layoutH >= minY,
                    free: anchorY - gapPx - layoutH - minY,
                    x: baseTopX + topAdjX,
                    y: -gapPx - layoutH,
                    origin: 'center bottom'
                },
                {
                    side: 'bottom',
                    fits: anchorY + gapPx + layoutH <= canvasRect.bottom - edgePad,
                    free: canvasRect.bottom - edgePad - (anchorY + gapPx + layoutH),
                    x: baseBottomX + bottomAdjX,
                    y: gapPx,
                    origin: 'center top'
                },
                {
                    side: 'right',
                    fits: anchorX + gapPx + layoutW <= canvasRect.right - edgePad,
                    free: canvasRect.right - edgePad - (anchorX + gapPx + layoutW),
                    x: gapPx,
                    y: baseRightY + rightAdjY + sideVerticalBias,
                    origin: 'left center'
                },
                {
                    side: 'left',
                    fits: anchorX - gapPx - layoutW >= minX,
                    free: anchorX - gapPx - layoutW - minX,
                    x: -gapPx - layoutW,
                    y: baseLeftY + leftAdjY + sideVerticalBias,
                    origin: 'right center'
                }
            ];
            const preferredOrder = isMax ? [
                'top',
                'right',
                'left',
                'bottom'
            ] : [
                'bottom',
                'right',
                'left',
                'top'
            ];
            const toothSafeRadius = isMax ? 72 : 50;
            const distToRect = {
                "DentitionTooltip.useFrame.distToRect": (px, py, rx, ry, rw, rh)=>{
                    const dx = Math.max(rx - px, 0, px - (rx + rw));
                    const dy = Math.max(ry - py, 0, py - (ry + rh));
                    return Math.hypot(dx, dy);
                }
            }["DentitionTooltip.useFrame.distToRect"];
            const withSafety = sides.map({
                "DentitionTooltip.useFrame.withSafety": (s)=>{
                    const rectLeft = anchorX + s.x;
                    const rectTop = anchorY + s.y;
                    const safety = distToRect(toothCenterX, toothCenterY, rectLeft, rectTop, layoutW, layoutH);
                    const toothSafe = safety >= toothSafeRadius;
                    return {
                        ...s,
                        safety,
                        toothSafe
                    };
                }
            }["DentitionTooltip.useFrame.withSafety"]);
            // Upper teeth should never pick "bottom" while a tooth-safe alternative exists.
            // This avoids cards sitting on top of the hovered upper crowns.
            const preferredPool = isMax ? withSafety.filter({
                "DentitionTooltip.useFrame": (s)=>s.side !== 'bottom'
            }["DentitionTooltip.useFrame"]) : withSafety;
            const fitOptions = preferredPool.filter({
                "DentitionTooltip.useFrame.fitOptions": (s)=>s.fits && s.toothSafe
            }["DentitionTooltip.useFrame.fitOptions"]).sort({
                "DentitionTooltip.useFrame.fitOptions": (a, b)=>{
                    if (b.safety !== a.safety) return b.safety - a.safety;
                    if (b.free !== a.free) return b.free - a.free;
                    return preferredOrder.indexOf(a.side) - preferredOrder.indexOf(b.side);
                }
            }["DentitionTooltip.useFrame.fitOptions"]);
            // Fallback ladder:
            // 1) any fitting option in preferred pool
            // 2) tooth-safe option from all sides
            // 3) any option from all sides
            const fallbackFits = preferredPool.filter({
                "DentitionTooltip.useFrame.fallbackFits": (s)=>s.fits
            }["DentitionTooltip.useFrame.fallbackFits"]).sort({
                "DentitionTooltip.useFrame.fallbackFits": (a, b)=>b.free - a.free
            }["DentitionTooltip.useFrame.fallbackFits"]);
            const toothSafeAll = withSafety.filter({
                "DentitionTooltip.useFrame.toothSafeAll": (s)=>s.toothSafe
            }["DentitionTooltip.useFrame.toothSafeAll"]).sort({
                "DentitionTooltip.useFrame.toothSafeAll": (a, b)=>{
                    if (b.safety !== a.safety) return b.safety - a.safety;
                    return b.free - a.free;
                }
            }["DentitionTooltip.useFrame.toothSafeAll"]);
            const anyAll = withSafety.slice().sort({
                "DentitionTooltip.useFrame.anyAll": (a, b)=>b.free - a.free
            }["DentitionTooltip.useFrame.anyAll"]);
            const chosen = fitOptions[0] ?? fallbackFits[0] ?? toothSafeAll[0] ?? anyAll[0];
            el.style.transform = `translate(${chosen.x}px, ${chosen.y}px)`;
            el.style.transformOrigin = chosen.origin;
            // Screen-space dashed connector that follows selected side and extends
            // slightly behind the tooltip edge for a visually continuous link.
            if (connector) {
                const edgePoint = ({
                    "DentitionTooltip.useFrame.edgePoint": ()=>{
                        if (chosen.side === 'top') return {
                            x: chosen.x + rect.width / 2,
                            y: chosen.y + rect.height
                        };
                        if (chosen.side === 'bottom') return {
                            x: chosen.x + rect.width / 2,
                            y: chosen.y
                        };
                        if (chosen.side === 'right') return {
                            x: chosen.x,
                            y: chosen.y + rect.height / 2
                        };
                        return {
                            x: chosen.x + rect.width,
                            y: chosen.y + rect.height / 2
                        };
                    }
                })["DentitionTooltip.useFrame.edgePoint"]();
                const lenToEdge = Math.hypot(edgePoint.x, edgePoint.y);
                const ux = lenToEdge > 0.0001 ? edgePoint.x / lenToEdge : 0;
                const uy = lenToEdge > 0.0001 ? edgePoint.y / lenToEdge : -1;
                const extendBehind = 14;
                const targetX = edgePoint.x + ux * extendBehind;
                const targetY = edgePoint.y + uy * extendBehind;
                const len = Math.hypot(targetX, targetY);
                const angle = Math.atan2(targetY, targetX);
                connector.style.width = `${Math.max(18, len)}px`;
                connector.style.transform = `translateY(-50%) rotate(${angle}rad)`;
            }
        }
    }["DentitionTooltip.useFrame"]);
    // Responsive sizing for smaller canvases.
    const isCompact = size.width < 980;
    const isTiny = size.width < 760;
    const cardMinW = isTiny ? 200 : isCompact ? 220 : 240;
    const cardMaxW = isTiny ? 260 : isCompact ? 290 : 320;
    const cardPadding = isTiny ? '8px 10px' : '10px 13px';
    const titleSize = isTiny ? 12 : 13;
    const bodySize = isTiny ? 9 : 10;
    const sectionPad = isTiny ? '6px 8px' : '7px 9px';
    // Derive data for full overview sections.
    const diagLabels = [];
    if (diagnoses) {
        for (const d of diagnoses)diagLabels.push(d);
    }
    if (isImplant && !diagLabels.includes('Implant')) diagLabels.push('Implant');
    const toothEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionTooltip.useMemo[toothEntries]": ()=>(allEntries ?? []).filter({
                "DentitionTooltip.useMemo[toothEntries]": (e)=>e.toothFdi === tooth.fdi
            }["DentitionTooltip.useMemo[toothEntries]"])
    }["DentitionTooltip.useMemo[toothEntries]"], [
        allEntries,
        tooth.fdi
    ]);
    const findingEntries = toothEntries.filter((e)=>e.kind === 'finding');
    const procedureEntries = toothEntries.filter((e)=>e.kind === 'procedure');
    const plannedEntries = toothEntries.filter((e)=>e.kind === 'planned');
    const symptomEntries = toothEntries.filter((e)=>e.kind === 'symptom');
    const noteText = toothNotes?.[tooth.fdi] ?? '';
    // Findings summary = legacy findings + entity-centric finding entries.
    const groupedFindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionTooltip.useMemo[groupedFindings]": ()=>{
            const m = new Map();
            const push = {
                "DentitionTooltip.useMemo[groupedFindings].push": (zoneId, label)=>{
                    const list = m.get(zoneId) || [];
                    if (!list.includes(label)) list.push(label);
                    m.set(zoneId, list);
                }
            }["DentitionTooltip.useMemo[groupedFindings].push"];
            for (const f of findings)push(f.zoneId, f.type);
            for (const entry of findingEntries){
                const surfaces = entry.surfaces.length > 0 ? entry.surfaces : [
                    'whole'
                ];
                for (const surface of surfaces)push(surface, entry.name);
            }
            return Array.from(m.entries());
        }
    }["DentitionTooltip.useMemo[groupedFindings]"], [
        findings,
        findingEntries
    ]);
    const treatmentHistory = [
        ...diagLabels
    ].filter(Boolean);
    const procedureSummary = [
        ...procedureEntries,
        ...plannedEntries,
        ...symptomEntries
    ];
    // Has any content across all 4 sections?
    const hasContent = treatmentHistory.length > 0 || groupedFindings.length > 0 || procedureSummary.length > 0 || noteText.length > 0;
    const sectionHeadingStyle = {
        fontSize: isTiny ? '8px' : '9px',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        color: '#cbd5e1',
        marginBottom: '4px',
        fontWeight: 600
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
            position: [
                tooltipAnchorWorld.x,
                tooltipAnchorWorld.y,
                tooltipAnchorWorld.z
            ],
            style: {
                pointerEvents: 'none'
            },
            zIndexRange: [
                500,
                300
            ],
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    ref: connectorRef,
                    style: {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: 0,
                        borderTop: '1px dashed rgba(148, 163, 184, 0.45)',
                        transformOrigin: '0 50%',
                        zIndex: 0
                    }
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    ref: tooltipRef,
                    style: {
                        transform: 'translate(-50%, -50%)',
                        transformOrigin: 'center center',
                        background: 'rgba(0, 0, 0, 0.78)',
                        color: '#fff',
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                        padding: cardPadding,
                        borderRadius: '8px',
                        fontSize: isTiny ? '11px' : '12px',
                        borderLeft: `3px solid ${violetAccent.stroke}`,
                        fontFamily: "'Inter', sans-serif",
                        minWidth: `${cardMinW}px`,
                        maxWidth: `${cardMaxW}px`,
                        whiteSpace: 'normal',
                        boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
                        textAlign: 'left',
                        left: 0,
                        top: 0,
                        position: 'relative',
                        zIndex: 1,
                        transition: 'transform 120ms ease-out, opacity 120ms ease-out'
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                fontWeight: 700,
                                fontSize: `${titleSize}px`,
                                paddingBottom: hasContent ? '8px' : 0,
                                marginBottom: hasContent ? '10px' : 0,
                                borderBottom: hasContent ? '1px solid rgba(255,255,255,0.1)' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px',
                                lineHeight: 1.3,
                                whiteSpace: 'nowrap'
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                    style: {
                                        color: violetAccent.badgeText,
                                        background: violetAccent.badgeBg,
                                        borderRadius: '4px',
                                        padding: isTiny ? '1px 5px' : '1px 6px',
                                        fontSize: isTiny ? '11px' : '12px',
                                        fontWeight: 700,
                                        flexShrink: 0
                                    },
                                    children: [
                                        "T",
                                        tooth.fdi
                                    ]
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                    style: {
                                        fontWeight: 600,
                                        color: '#f1f5f9',
                                        flexShrink: 0
                                    },
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][tooth.quadrant],
                                        " ",
                                        tooth.name
                                    ]
                                })
                            ]
                        }),
                        treatmentHistory.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                marginBottom: groupedFindings.length > 0 || procedureSummary.length > 0 || noteText ? '8px' : 0,
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: '6px',
                                padding: sectionPad
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: sectionHeadingStyle,
                                    children: "Treatment History"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '4px',
                                        flexWrap: 'wrap'
                                    },
                                    children: treatmentHistory.map((d)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                            style: {
                                                fontSize: `${bodySize}px`,
                                                fontWeight: 600,
                                                padding: isTiny ? '2px 6px' : '2px 8px',
                                                borderRadius: '10px',
                                                background: 'rgba(148,163,184,0.3)',
                                                color: '#f1f5f9'
                                            },
                                            children: d
                                        }, d))
                                })
                            ]
                        }),
                        groupedFindings.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                marginBottom: procedureSummary.length > 0 || noteText ? '8px' : 0,
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: '6px',
                                padding: sectionPad
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: sectionHeadingStyle,
                                    children: "Findings"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '4px'
                                    },
                                    children: groupedFindings.map(([zid, types])=>{
                                        const zc = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZONE_INFO"][zid]?.color || '#888';
                                        const zl = zid === 'whole' ? 'Whole Tooth' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getZoneLabel"])(zid, tooth.arch, tooth.position);
                                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                            style: {
                                                fontSize: `${bodySize}px`,
                                                display: 'flex',
                                                gap: '8px',
                                                alignItems: 'baseline',
                                                lineHeight: 1.35
                                            },
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                    style: {
                                                        width: '7px',
                                                        height: '7px',
                                                        borderRadius: '50%',
                                                        background: zc,
                                                        flexShrink: 0,
                                                        marginTop: '3px'
                                                    }
                                                }),
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                    style: {
                                                        fontWeight: 600,
                                                        color: zc,
                                                        minWidth: '56px'
                                                    },
                                                    children: zl
                                                }),
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                    style: {
                                                        color: '#e2e8f0'
                                                    },
                                                    children: types.join(', ')
                                                })
                                            ]
                                        }, zid);
                                    })
                                })
                            ]
                        }),
                        procedureSummary.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                marginBottom: noteText ? '8px' : 0,
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: '6px',
                                padding: sectionPad
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: sectionHeadingStyle,
                                    children: "Procedures"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '4px',
                                        flexWrap: 'wrap'
                                    },
                                    children: procedureSummary.map((entry)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                            style: {
                                                fontSize: `${bodySize}px`,
                                                fontWeight: 600,
                                                padding: isTiny ? '2px 6px' : '2px 8px',
                                                borderRadius: '10px',
                                                background: entry.kind === 'planned' ? 'rgba(59,130,246,0.22)' : entry.kind === 'symptom' ? 'rgba(236,72,153,0.22)' : 'rgba(148,163,184,0.3)',
                                                color: '#f1f5f9'
                                            },
                                            children: entry.name
                                        }, entry.id))
                                })
                            ]
                        }),
                        noteText && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: '6px',
                                padding: sectionPad
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: sectionHeadingStyle,
                                    children: "Notes"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                    style: {
                                        fontSize: `${bodySize}px`,
                                        color: '#e2e8f0',
                                        fontStyle: 'italic',
                                        lineHeight: 1.4
                                    },
                                    children: [
                                        "\u201C",
                                        noteText.length > (isTiny ? 64 : 80) ? noteText.slice(0, isTiny ? 64 : 80) + '…' : noteText,
                                        "\u201D"
                                    ]
                                })
                            ]
                        }),
                        !hasContent && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            style: {
                                fontSize: '11px',
                                color: '#94a3b8',
                                fontStyle: 'italic',
                                textAlign: 'center',
                                padding: '8px 0'
                            },
                            children: "Click on the tooth to start adding details"
                        })
                    ]
                })
            ]
        })
    });
}
_s2(DentitionTooltip, "DpDYlgjArPUqteWDlpPbEx+7rQQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c4 = DentitionTooltip;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ArchTooth$memo");
__turbopack_context__.k.register(_c1, "ArchTooth");
__turbopack_context__.k.register(_c2, "DentitionView");
__turbopack_context__.k.register(_c3, "ScopeHotspot");
__turbopack_context__.k.register(_c4, "DentitionTooltip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/FlatDentitionChart.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlatDentitionChart",
    ()=>FlatDentitionChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Flat 2D dentition chart — a print-friendly schematic of the whole mouth with
// the upper teeth on one straight row and the lower teeth on another (instead
// of the 3D curved arch, which is WebGL and does not print). Reads the saved
// examination chart from localStorage so it can render inside the Rx preview /
// printed report without sharing the live DentalCanvas React state.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const EXAM_CHART_PREFIX = "dental.exam.chart.";
// Permanent dentition, laid left→right as seen facing the patient.
const UPPER_ROW = [
    "18",
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28"
];
const LOWER_ROW = [
    "48",
    "47",
    "46",
    "45",
    "44",
    "43",
    "42",
    "41",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38"
];
const MISSING = new Set([
    "Missing",
    "Extraction"
]);
function loadChart(patientId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(`${EXAM_CHART_PREFIX}${patientId || "apt-1"}`);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
// Geometry
const PAD = 10;
const TW = 26; // tooth glyph width
const STEP = 30; // horizontal step between teeth
const CENTER_GAP = 12; // extra gap between the two quadrants of a row
const GLYPH_H = 30;
const LABEL_H = 13;
const ROW_GAP = 16;
const ROW_LABEL_W = 0;
function xFor(i) {
    return PAD + i * STEP + (i >= 8 ? CENTER_GAP : 0);
}
const CHART_W = PAD * 2 + 16 * STEP + CENTER_GAP;
function toothState(fdi, toothDiagnoses, findingsByTooth) {
    const diags = toothDiagnoses?.[fdi] ?? [];
    const findings = (findingsByTooth?.[fdi] ?? []).filter((f)=>f && f.type && f.type !== "Normal");
    const isMissing = diags.some((d)=>MISSING.has(d));
    const treated = diags.length > 0 && !isMissing;
    return {
        diags,
        findingCount: findings.length,
        isMissing,
        treated,
        hasAny: diags.length > 0 || findings.length > 0
    };
}
function Tooth({ fdi, x, y, st }) {
    const fill = st.isMissing ? "#e2e8f0" : st.treated ? "#ede9fe" : "#ffffff";
    const stroke = st.isMissing ? "#94a3b8" : st.treated ? "#7c3aed" : st.findingCount ? "#d97706" : "#cbd5e1";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: `M${x + 3},${y + GLYPH_H} L${x + 3},${y + 8} Q${x + 3},${y} ${x + 8},${y} L${x + TW - 5},${y} Q${x + TW},${y} ${x + TW},${y + 8} L${x + TW},${y + GLYPH_H} Z`,
                fill: fill,
                stroke: stroke,
                strokeWidth: st.treated || st.isMissing ? 1.6 : 1.1
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            st.isMissing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: x + 5,
                        y1: y + 4,
                        x2: x + TW - 2,
                        y2: y + GLYPH_H - 3,
                        stroke: "#64748b",
                        strokeWidth: "1.4"
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: x + TW - 2,
                        y1: y + 4,
                        x2: x + 5,
                        y2: y + GLYPH_H - 3,
                        stroke: "#64748b",
                        strokeWidth: "1.4"
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            !st.isMissing && st.findingCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: x + TW - 4,
                cy: y + 5,
                r: "3.2",
                fill: "#f59e0b",
                stroke: "#fff",
                strokeWidth: "0.8"
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                lineNumber: 74,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: x + (TW + 3) / 2 + 1.5,
                y: y + GLYPH_H + 10,
                textAnchor: "middle",
                fontSize: "8.5",
                fontWeight: "600",
                fill: "#475569",
                fontFamily: "Inter, sans-serif",
                children: fdi
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c = Tooth;
function LegendDot({ color, filled, label, cross }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 9,
            color: "#475569",
            fontFamily: "Inter, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "14",
                height: "14",
                viewBox: "0 0 14 14",
                style: {
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "2.5",
                        y: "1.5",
                        width: "9",
                        height: "11",
                        rx: "2.5",
                        fill: filled || "#fff",
                        stroke: color,
                        strokeWidth: "1.3"
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    cross && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "4",
                                y1: "3",
                                x2: "10",
                                y2: "11",
                                stroke: "#64748b",
                                strokeWidth: "1"
                            }, void 0, false, {
                                fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "10",
                                y1: "3",
                                x2: "4",
                                y2: "11",
                                stroke: "#64748b",
                                strokeWidth: "1"
                            }, void 0, false, {
                                fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            label
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_c1 = LegendDot;
function FlatDentitionChart({ patientId, chart: chartProp }) {
    _s();
    const [chart, setChart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(chartProp ?? null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlatDentitionChart.useEffect": ()=>{
            if (chartProp) return;
            setChart(loadChart(patientId));
        }
    }["FlatDentitionChart.useEffect"], [
        patientId,
        chartProp
    ]);
    const toothDiagnoses = chart?.toothDiagnoses ?? {};
    const findingsByTooth = chart?.findingsByTooth ?? {};
    // Nothing recorded → don't render the chart at all.
    const anyData = Object.values(toothDiagnoses).some((a)=>(a || []).length > 0) || Object.values(findingsByTooth).some((a)=>(a || []).length > 0);
    if (!anyData) return null;
    const rowY = (rowIdx)=>6 + rowIdx * (GLYPH_H + LABEL_H + ROW_GAP);
    const svgH = rowY(2) - ROW_GAP + 4;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            marginTop: 10,
            breakInside: "avoid",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact"
        },
        "data-dental-flat-chart": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#334155",
                    margin: "0 0 6px",
                    fontFamily: "Inter, sans-serif"
                },
                children: [
                    "Dental Chart",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 9,
                            fontWeight: 500,
                            color: "#94a3b8"
                        },
                        children: "(upper & lower)"
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "100%",
                viewBox: `0 0 ${CHART_W} ${svgH}`,
                style: {
                    maxWidth: CHART_W,
                    overflow: "visible"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: xFor(8) - CENTER_GAP / 2 - 2,
                        y1: rowY(0) - 2,
                        x2: xFor(8) - CENTER_GAP / 2 - 2,
                        y2: rowY(0) + GLYPH_H + 2,
                        stroke: "#e2e8f0",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: xFor(8) - CENTER_GAP / 2 - 2,
                        y1: rowY(1) - 2,
                        x2: xFor(8) - CENTER_GAP / 2 - 2,
                        y2: rowY(1) + GLYPH_H + 2,
                        stroke: "#e2e8f0",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    UPPER_ROW.map((fdi, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooth, {
                            fdi: fdi,
                            x: xFor(i),
                            y: rowY(0),
                            st: toothState(fdi, toothDiagnoses, findingsByTooth)
                        }, `u-${fdi}`, false, {
                            fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)),
                    LOWER_ROW.map((fdi, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooth, {
                            fdi: fdi,
                            x: xFor(i),
                            y: rowY(1),
                            st: toothState(fdi, toothDiagnoses, findingsByTooth)
                        }, `l-${fdi}`, false, {
                            fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 14,
                    marginTop: 4,
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendDot, {
                        color: "#7c3aed",
                        filled: "#ede9fe",
                        label: "Treated / diagnosis"
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendDot, {
                        color: "#d97706",
                        label: "Finding"
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LegendDot, {
                        color: "#94a3b8",
                        filled: "#e2e8f0",
                        cross: true,
                        label: "Missing"
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
                lineNumber: 150,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/examination/FlatDentitionChart.jsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s(FlatDentitionChart, "BqoSnCe0+T/RDxBx0N/EeUkwi+A=");
_c2 = FlatDentitionChart;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Tooth");
__turbopack_context__.k.register(_c1, "LegendDot");
__turbopack_context__.k.register(_c2, "FlatDentitionChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/DentitionSnapshot.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DentitionSnapshot",
    ()=>DentitionSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// DentitionSnapshot — a front-view render of the 3D dentition captured to a PNG
// (a live WebGL canvas does not print reliably). The SVG FlatDentitionChart is
// shown immediately and always (so the report is never blank / works in print);
// an offscreen-but-sized canvas renders the real teeth and, once a non-blank
// frame is captured, the view upgrades to that 3D image. If capture never
// succeeds (slow load, no WebGL), the SVG simply remains.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentitionView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/DentitionView.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$FlatDentitionChart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/FlatDentitionChart.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const EXAM_CHART_PREFIX = "dental.exam.chart.";
const SNAP_W = 460;
const SNAP_H = 180;
function normalizeChart(raw) {
    if (!raw) return null;
    const toothDiagnoses = {};
    Object.entries(raw.toothDiagnoses || {}).forEach(([fdi, v])=>{
        toothDiagnoses[fdi] = v instanceof Set ? v : new Set(Array.isArray(v) ? v : []);
    });
    const implantTeeth = new Set();
    if (raw.implantTeeth) (raw.implantTeeth instanceof Set ? [
        ...raw.implantTeeth
    ] : Array.isArray(raw.implantTeeth) ? raw.implantTeeth : []).forEach((f)=>implantTeeth.add(f));
    Object.entries(toothDiagnoses).forEach(([fdi, set])=>{
        if (set.has("Implant")) implantTeeth.add(fdi);
    });
    const findingsByTooth = {};
    Object.entries(raw.findingsByTooth || {}).forEach(([fdi, list])=>{
        findingsByTooth[fdi] = Array.isArray(list) ? list : [];
    });
    const hasData = Object.values(toothDiagnoses).some((s)=>s.size > 0) || implantTeeth.size > 0 || Object.values(findingsByTooth).some((a)=>a.length > 0);
    return hasData ? {
        toothDiagnoses,
        findingsByTooth,
        implantTeeth
    } : null;
}
function FrontCamera() {
    _s();
    const { camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FrontCamera.useEffect": ()=>{
            camera.position.set(0, 2.5, 16.5);
            camera.lookAt(0, -0.9, -0.3);
            camera.updateProjectionMatrix();
        }
    }["FrontCamera.useEffect"], [
        camera
    ]);
    return null;
}
_s(FrontCamera, "Wo14/kl28HhoRfDX+Cg7MK2EhFU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"]
    ];
});
_c = FrontCamera;
// Retries capturing the canvas until a non-blank PNG comes back (models may
// still be streaming in). Mounted inside Suspense → only runs once the tooth
// models have resolved.
function CaptureWhenReady({ onCapture, onGiveUp }) {
    _s1();
    const { gl, scene, camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CaptureWhenReady.useEffect": ()=>{
            let tries = 0;
            let timer;
            const attempt = {
                "CaptureWhenReady.useEffect.attempt": ()=>{
                    tries += 1;
                    try {
                        gl.render(scene, camera);
                        const url = gl.domElement.toDataURL("image/png");
                        if (url && url.length > 9000) {
                            onCapture(url);
                            return;
                        }
                    } catch  {
                        onGiveUp?.();
                        return;
                    }
                    if (tries < 10) timer = setTimeout(attempt, 600);
                    else onGiveUp?.(); // never produced a usable frame — keep the SVG, drop the heavy canvas
                }
            }["CaptureWhenReady.useEffect.attempt"];
            timer = setTimeout(attempt, 700);
            return ({
                "CaptureWhenReady.useEffect": ()=>clearTimeout(timer)
            })["CaptureWhenReady.useEffect"];
        }
    }["CaptureWhenReady.useEffect"], [
        gl,
        scene,
        camera,
        onCapture,
        onGiveUp
    ]);
    return null;
}
_s1(CaptureWhenReady, "RVTFHuczdlyvGFUsZJPSpjurI/Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"]
    ];
});
_c1 = CaptureWhenReady;
function DentitionSnapshot({ patientId, chart: chartProp, toothDiagnoses, findingsByTooth, implantTeeth, patientType = "adult", title = "Dental Chart" }) {
    _s2();
    const [img, setImg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [gaveUp, setGaveUp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const chart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionSnapshot.useMemo[chart]": ()=>{
            if (toothDiagnoses) return normalizeChart({
                toothDiagnoses,
                findingsByTooth,
                implantTeeth
            });
            if (chartProp) return normalizeChart(chartProp);
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    const raw = window.localStorage.getItem(`${EXAM_CHART_PREFIX}${patientId || "apt-1"}`);
                    return normalizeChart(raw ? JSON.parse(raw) : null);
                } catch  {
                    return null;
                }
            }
            return null;
        }
    }["DentitionSnapshot.useMemo[chart]"], [
        toothDiagnoses,
        findingsByTooth,
        implantTeeth,
        chartProp,
        patientId
    ]);
    const sig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionSnapshot.useMemo[sig]": ()=>{
            if (!chart) return "";
            const d = Object.entries(chart.toothDiagnoses).map({
                "DentitionSnapshot.useMemo[sig].d": ([f, s])=>`${f}:${[
                        ...s
                    ].sort().join("+")}`
            }["DentitionSnapshot.useMemo[sig].d"]).sort().join("|");
            const fnd = Object.entries(chart.findingsByTooth).map({
                "DentitionSnapshot.useMemo[sig].fnd": ([f, l])=>`${f}:${l.length}`
            }["DentitionSnapshot.useMemo[sig].fnd"]).sort().join("|");
            return `${d}__${fnd}__${[
                ...chart.implantTeeth
            ].sort().join(",")}`;
        }
    }["DentitionSnapshot.useMemo[sig]"], [
        chart
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentitionSnapshot.useEffect": ()=>{
            setImg(null);
            setGaveUp(false);
        }
    }["DentitionSnapshot.useEffect"], [
        sig
    ]);
    if (!chart) return null;
    // Pass the normalized chart to the SVG fallback (avoids a second localStorage read).
    const svgChart = {
        toothDiagnoses: Object.fromEntries(Object.entries(chart.toothDiagnoses).map(([f, s])=>[
                f,
                [
                    ...s
                ]
            ])),
        findingsByTooth: chart.findingsByTooth
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            marginTop: 10,
            breakInside: "avoid",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact"
        },
        "data-dentition-snapshot": "true",
        children: [
            title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#334155",
                    margin: "0 0 6px",
                    fontFamily: "Inter, sans-serif"
                },
                children: [
                    title,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 9,
                            fontWeight: 500,
                            color: "#94a3b8"
                        },
                        children: "(front view)"
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                lineNumber: 99,
                columnNumber: 9
            }, this) : null,
            img ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    maxWidth: SNAP_W,
                    height: SNAP_H,
                    borderRadius: 10,
                    overflow: "hidden",
                    background: "linear-gradient(180deg,#f8fafc,#eef2f7)",
                    border: "1px solid #e2e8f0"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: img,
                    alt: "Dentition front view",
                    style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                lineNumber: 105,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$FlatDentitionChart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlatDentitionChart"], {
                        chart: svgChart,
                        title: null
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this),
                    !gaveUp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: SNAP_W,
                            height: SNAP_H,
                            opacity: 0,
                            pointerEvents: "none",
                            zIndex: -1
                        },
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                            dpr: 1,
                            gl: {
                                preserveDrawingBuffer: true,
                                alpha: true,
                                antialias: true,
                                toneMapping: 3,
                                toneMappingExposure: 1.3
                            },
                            camera: {
                                position: [
                                    0,
                                    2.5,
                                    16.5
                                ],
                                fov: 35
                            },
                            style: {
                                width: SNAP_W,
                                height: SNAP_H
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FrontCamera, {}, void 0, false, {
                                    fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                                    intensity: 0.8
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                                    position: [
                                        3,
                                        5,
                                        4
                                    ],
                                    intensity: 1.0
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                                    position: [
                                        -2,
                                        3,
                                        -2
                                    ],
                                    intensity: 0.4
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                                    position: [
                                        0,
                                        -2,
                                        1
                                    ],
                                    intensity: 0.3
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                                    fallback: null,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentitionView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            patientType: patientType,
                                            layoutMode: "natural",
                                            disableSelection: true,
                                            showTreatmentTags: false,
                                            toothDiagnoses: chart.toothDiagnoses,
                                            findingsByTooth: chart.findingsByTooth,
                                            implantTeeth: chart.implantTeeth,
                                            onSelectTooth: ()=>{},
                                            onHoverTooth: ()=>{},
                                            externalHoveredFdi: null,
                                            allEntries: [],
                                            toothNotes: {},
                                            agentPulseFdis: new Set()
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CaptureWhenReady, {
                                            onCapture: setImg,
                                            onGiveUp: ()=>setGaveUp(true)
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, sig, true, {
                            fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
                lineNumber: 109,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/examination/DentitionSnapshot.jsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s2(DentitionSnapshot, "V4EckW7jfexTmd5p4KVqnEiM2uQ=");
_c2 = DentitionSnapshot;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "FrontCamera");
__turbopack_context__.k.register(_c1, "CaptureWhenReady");
__turbopack_context__.k.register(_c2, "DentitionSnapshot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/MiniToothCanvas.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MiniToothCanvas",
    ()=>MiniToothCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
/**
 * MiniToothCanvas — renders the actual <Tooth> component in a tiny R3F canvas.
 * Reuses the same shader pipeline as the single-tooth view so the thumbnail
 * exactly mirrors the doctor's current state (tooth-level diagnoses + surface
 * findings all tint in situ).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Center.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/Tooth.jsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function MiniToothCanvas({ tooth, diagnoses, isImplant = false, findings = [], size = 44 }) {
    const diag = diagnoses ?? new Set();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: {
            width: size,
            height: size,
            pointerEvents: "none",
            position: "relative"
        },
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            camera: {
                position: [
                    0,
                    -0.2,
                    5
                ],
                fov: 30
            },
            dpr: [
                1,
                1.5
            ],
            gl: {
                antialias: true,
                toneMapping: 3,
                toneMappingExposure: 1.35,
                alpha: true
            },
            style: {
                pointerEvents: "none",
                width: "100%",
                height: "100%",
                display: "block"
            },
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("ambientLight", {
                    intensity: 0.9
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("directionalLight", {
                    position: [
                        2,
                        3,
                        3
                    ],
                    intensity: 0.8
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("directionalLight", {
                    position: [
                        -2,
                        1,
                        -2
                    ],
                    intensity: 0.3
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Center"], {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("group", {
                            scale: 0.9,
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooth"], {
                                compact: true,
                                modelPath: tooth.modelPath,
                                arch: tooth.arch,
                                mirrorX: tooth.mirrorX,
                                quadrant: tooth.quadrant,
                                toothPosition: tooth.position,
                                toothFdi: tooth.fdi,
                                selectedZone: null,
                                onSelectZone: ()=>{},
                                onHoverZone: ()=>{},
                                isImplant: isImplant,
                                findings: findings,
                                toothDiagnoses: diag,
                                hideTags: true
                            })
                        })
                    })
                })
            ]
        })
    });
}
_c = MiniToothCanvas;
var _c;
__turbopack_context__.k.register(_c, "MiniToothCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_dental_6b2dedf1._.js.map