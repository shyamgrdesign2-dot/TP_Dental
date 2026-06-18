module.exports = [
"[project]/app/tooth-capture/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToothCapturePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// TEMPORARY tooth-capture harness. Replicates the EXACT single-tooth view
// (same camera framing via getSingleToothBuccalCamera, same lights, same
// [0,-0.17,0] group + Tooth props) and POSTs a transparent PNG of each tooth's
// initial view to /api/save-tooth, named by FDI. Safe to delete afterward.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-ssr] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/Tooth.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
// Match the single-tooth view's framing constants from DentalCanvas.
const SINGLE_TOOTH_ORBIT_RADIUS = 6.28;
const SINGLE_TOOTH_TARGET = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 0.04, 0);
const SINGLE_TOOTH_FOV = 27;
function getSingleToothBuccalCamera(fdi, width, height) {
    const aspect = width / Math.max(1, height);
    const widthFactor = (width - 980) / 980;
    const widthAdjust = Math.max(-1.1, Math.min(1.1, -widthFactor * 1.5));
    const aspectPull = aspect < 0.7 ? 2.0 : aspect < 0.9 ? 1.15 : aspect < 1.1 ? 0.6 : aspect < 1.4 ? 0.22 : 0;
    const radius = SINGLE_TOOTH_ORBIT_RADIUS + aspectPull + widthAdjust * 0.35;
    const frontAz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFrontAzimuth"])(String(fdi)) ?? 0;
    const offset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]().setFromSpherical(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Spherical"](radius, Math.PI / 2, frontAz));
    return {
        position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]().copy(SINGLE_TOOTH_TARGET).add(offset),
        target: SINGLE_TOOTH_TARGET.clone(),
        fov: SINGLE_TOOTH_FOV
    };
}
// Panel size that matches the single-tooth view's CSS dimensions so the camera
// framing equals what the doctor sees.
const CSS_W = 361;
const CSS_H = 577;
function CaptureCam({ fdi }) {
    const { camera, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const c = getSingleToothBuccalCamera(fdi, size.width, size.height);
        camera.position.copy(c.position);
        camera.fov = c.fov;
        camera.up.set(0, 1, 0);
        camera.lookAt(c.target);
        camera.updateProjectionMatrix();
    });
    return null;
}
function ToothCapturePage() {
    const [idx, setIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEETH"].forEach((t)=>{
            try {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGLTF"].preload(t.modelPath);
            } catch  {}
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        window.__teeth = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEETH"].map((t)=>t.fdi);
        window.__setTooth = (i)=>setIdx(i);
        window.__progress = {
            i: 0,
            total: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEETH"].length,
            done: false,
            saved: [],
            phase: "idle"
        };
        const sleep = (ms)=>new Promise((r)=>setTimeout(r, ms));
        window.__runCapture = async ()=>{
            if (window.__capturing) return;
            window.__capturing = true;
            // Pass 1 — warm: load all GLBs + compile every shader variant in this context.
            setStatus("warming");
            window.__progress = {
                i: 0,
                total: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEETH"].length,
                done: false,
                saved: [],
                phase: "warm"
            };
            for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEETH"].length; i++){
                setIdx(i);
                window.__progress.i = i;
                await sleep(700);
            }
            await sleep(800);
            // Pass 2 — capture.
            setStatus("capturing");
            window.__progress.phase = "capture";
            for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEETH"].length; i++){
                setIdx(i);
                window.__progress.i = i;
                await sleep(1500);
                const cv = document.querySelector("#cap-host canvas");
                let url = null;
                try {
                    url = cv && cv.toDataURL("image/png");
                } catch  {}
                if (url && url.length > 5000) {
                    try {
                        const res = await fetch("/api/save-tooth", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                fdi: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEETH"][i].fdi,
                                dataUrl: url
                            })
                        });
                        const j = await res.json();
                        if (j.ok) window.__progress.saved.push(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEETH"][i].fdi);
                    } catch  {}
                }
            }
            window.__progress.done = true;
            window.__capturing = false;
            setStatus("done");
        };
    }, []);
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEETH"][idx];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 20,
            fontFamily: "Inter, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    fontSize: 16
                },
                children: "Tooth capture harness (single-tooth view)"
            }, void 0, false, {
                fileName: "[project]/app/tooth-capture/page.jsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: 13,
                    color: "#475569"
                },
                children: [
                    "Status: ",
                    status,
                    " · current FDI: ",
                    t.fdi,
                    " (",
                    t.name,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/app/tooth-capture/page.jsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>window.__runCapture(),
                style: {
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "1px solid #cbd5e1",
                    cursor: "pointer"
                },
                children: "Run capture"
            }, void 0, false, {
                fileName: "[project]/app/tooth-capture/page.jsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "cap-host",
                style: {
                    width: CSS_W,
                    height: CSS_H,
                    marginTop: 16,
                    background: "transparent"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                    camera: {
                        position: [
                            0,
                            2.5,
                            13
                        ],
                        fov: 35
                    },
                    dpr: [
                        2,
                        3
                    ],
                    gl: {
                        antialias: true,
                        alpha: true,
                        preserveDrawingBuffer: true,
                        toneMapping: 3,
                        toneMappingExposure: 1.3,
                        powerPreference: "high-performance"
                    },
                    style: {
                        width: "100%",
                        height: "100%",
                        background: "transparent"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                            intensity: 0.8
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                            position: [
                                3,
                                5,
                                4
                            ],
                            intensity: 1.0
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                            position: [
                                -2,
                                3,
                                -2
                            ],
                            intensity: 0.4
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                            position: [
                                0,
                                -2,
                                1
                            ],
                            intensity: 0.3
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CaptureCam, {
                            fdi: t.fdi
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                            fallback: null,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                                position: [
                                    0,
                                    -0.17,
                                    0
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooth"], {
                                    modelPath: t.modelPath,
                                    arch: t.arch,
                                    mirrorX: t.mirrorX,
                                    quadrant: t.quadrant,
                                    toothPosition: t.position,
                                    toothFdi: t.fdi,
                                    selectedZone: null,
                                    onSelectZone: ()=>{},
                                    onClearSelectedZone: ()=>{},
                                    onHoverZone: ()=>{},
                                    isImplant: false,
                                    findings: [],
                                    zoneNotes: {},
                                    toothDiagnoses: new Set(),
                                    multiSelectZones: [],
                                    multiSelectActive: false,
                                    hideTags: true,
                                    treatmentHistoryDetails: {},
                                    toothEntries: []
                                }, void 0, false, {
                                    fileName: "[project]/app/tooth-capture/page.jsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/tooth-capture/page.jsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/tooth-capture/page.jsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/tooth-capture/page.jsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/tooth-capture/page.jsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_tooth-capture_page_jsx_276e7a7b._.js.map