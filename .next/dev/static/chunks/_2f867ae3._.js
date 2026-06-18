(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const ArchTooth = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s(function ArchTooth({ tooth, archPose, toothScale = 1, diagnoses, findings, treatmentHistoryTags, showTreatmentTags = true, isImplant, isHovered, isPinned, agentPulse = false, highlightActive = false, inHighlight = false, onHover, onClick, onPin }) {
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
    // Hover glow + oral-region highlight/dim on state change (avoid per-frame
    // traversals across all teeth). Region highlight: teeth in the active oral
    // region glow teal; teeth outside it fade so the region stands out.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArchTooth.ArchTooth.useEffect": ()=>{
            if (!meshRef.current) return;
            const dim = highlightActive && !inHighlight;
            meshRef.current.traverse({
                "ArchTooth.ArchTooth.useEffect": (obj)=>{
                    const m = obj;
                    if (m.isMesh && m.material && !Array.isArray(m.material)) {
                        const mat = m.material;
                        if (mat.metalness > 0.5) return;
                        if (isHovered) {
                            mat.emissiveIntensity = 0.32;
                            mat.emissive.set('#4a9eff');
                        } else if (highlightActive && inHighlight) {
                            mat.emissiveIntensity = 0.38;
                            mat.emissive.set('#14b8a6');
                        } else {
                            mat.emissiveIntensity = 0;
                            mat.emissive.set('#000000');
                        }
                        mat.transparent = true;
                        mat.opacity = dim ? 0.22 : 1;
                    }
                }
            }["ArchTooth.ArchTooth.useEffect"]);
        }
    }["ArchTooth.ArchTooth.useEffect"], [
        isHovered,
        highlightActive,
        inHighlight
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
function DentitionView({ patientType, visibleFdis, disableSelection = false, layoutMode = 'split', showGuides = false, showScopeHotspots = false, onSelectScope, toothDiagnoses, findingsByTooth, implantTeeth, onSelectTooth, onHoverTooth, externalHoveredFdi, allEntries, toothNotes, agentPulseFdis, showTreatmentTags = true, highlightFdis, oralEntries = [], oralForceShowAll = false }) {
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
    // Oral-exam region tags anchored in 3D (so they rotate/zoom with the model).
    // Each region group's tag sits at the centroid of that region's teeth.
    const oralTagGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[oralTagGroups]": ()=>{
            if (!oralEntries || oralEntries.length === 0) return [];
            const groups = {};
            oralEntries.forEach({
                "DentitionView.useMemo[oralTagGroups]": (e)=>{
                    const regionPos = (e.surfaces || []).find({
                        "DentitionView.useMemo[oralTagGroups].regionPos": (p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOralRegionPosition"])(p) && ![
                                'WHOLE',
                                'GENERALIZED',
                                'FULL'
                            ].includes(p)
                    }["DentitionView.useMemo[oralTagGroups].regionPos"]);
                    const key = regionPos || 'FULL';
                    (groups[key] = groups[key] || []).push(e);
                }
            }["DentitionView.useMemo[oralTagGroups]"]);
            const quadOf = {
                UR: 'upper-right',
                UL: 'upper-left',
                LR: 'lower-right',
                LL: 'lower-left'
            };
            const archOf = {
                RIGHT_ARCH: [
                    'upper-right',
                    'lower-right'
                ],
                LEFT_ARCH: [
                    'upper-left',
                    'lower-left'
                ],
                UPPER_ARCH: [
                    'upper-right',
                    'upper-left'
                ],
                LOWER_ARCH: [
                    'lower-right',
                    'lower-left'
                ]
            };
            const fdisFor = {
                "DentitionView.useMemo[oralTagGroups].fdisFor": (key)=>{
                    if (quadOf[key]) return visibleTeeth.filter({
                        "DentitionView.useMemo[oralTagGroups].fdisFor": (t)=>t.quadrant === quadOf[key]
                    }["DentitionView.useMemo[oralTagGroups].fdisFor"]).map({
                        "DentitionView.useMemo[oralTagGroups].fdisFor": (t)=>t.fdi
                    }["DentitionView.useMemo[oralTagGroups].fdisFor"]);
                    if (archOf[key]) return visibleTeeth.filter({
                        "DentitionView.useMemo[oralTagGroups].fdisFor": (t)=>archOf[key].includes(t.quadrant)
                    }["DentitionView.useMemo[oralTagGroups].fdisFor"]).map({
                        "DentitionView.useMemo[oralTagGroups].fdisFor": (t)=>t.fdi
                    }["DentitionView.useMemo[oralTagGroups].fdisFor"]);
                    return visibleTeeth.map({
                        "DentitionView.useMemo[oralTagGroups].fdisFor": (t)=>t.fdi
                    }["DentitionView.useMemo[oralTagGroups].fdisFor"]); // FULL / whole-mouth
                }
            }["DentitionView.useMemo[oralTagGroups].fdisFor"];
            return Object.entries(groups).map({
                "DentitionView.useMemo[oralTagGroups]": ([key, list])=>{
                    const fdis = fdisFor(key).filter({
                        "DentitionView.useMemo[oralTagGroups].fdis": (f)=>activePositions[f]
                    }["DentitionView.useMemo[oralTagGroups].fdis"]);
                    if (fdis.length === 0) return null;
                    const sum = fdis.reduce({
                        "DentitionView.useMemo[oralTagGroups].sum": (a, f)=>{
                            const p = activePositions[f].position;
                            return [
                                a[0] + p[0],
                                a[1] + p[1],
                                a[2] + p[2]
                            ];
                        }
                    }["DentitionView.useMemo[oralTagGroups].sum"], [
                        0,
                        0,
                        0
                    ]);
                    return {
                        key,
                        list,
                        position: [
                            sum[0] / fdis.length,
                            sum[1] / fdis.length,
                            sum[2] / fdis.length + 0.6
                        ]
                    };
                }
            }["DentitionView.useMemo[oralTagGroups]"]).filter(Boolean);
        }
    }["DentitionView.useMemo[oralTagGroups]"], [
        oralEntries,
        visibleTeeth,
        activePositions
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
                    highlightActive: Boolean(highlightFdis && highlightFdis.size > 0),
                    inHighlight: Boolean(highlightFdis && highlightFdis.has(tooth.fdi)),
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
            }),
            oralTagGroups.map((g)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(OralRegionTag3D, {
                    position: g.position,
                    list: g.list,
                    forceShowAll: oralForceShowAll
                }, g.key))
        ]
    });
}
_s1(DentitionView, "/eXVyzgJyTxbiYqtua6bUuOj2UM=");
_c2 = DentitionView;
// OralRegionTag3D — oral-exam tag anchored in 3D (drei Html) so it tracks the
// camera like the per-tooth treatment tags. Soft transparent violet pill; hover
// (or forceShowAll from the records-card hover) reveals the entry tooltip.
function OralRegionTag3D({ position, list, forceShowAll = false }) {
    _s2();
    const [hover, setHover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showTip = hover || forceShowAll;
    const label = list.length > 1 ? `${list[0].name} +${list.length - 1}` : list[0].name;
    const siteOf = (e)=>(e.surfaces || []).map((p)=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ORAL_POSITION_LABEL"][p] || p).join(', ') || 'Whole mouth';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
        position: position,
        center: true,
        zIndexRange: showTip ? [
            400,
            200
        ] : [
            40,
            10
        ],
        style: {
            pointerEvents: 'auto',
            whiteSpace: 'nowrap'
        },
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            onMouseEnter: ()=>setHover(true),
            onMouseLeave: ()=>setHover(false),
            style: {
                position: 'relative',
                display: 'inline-block'
            },
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 8px',
                        borderRadius: 6,
                        background: 'rgba(164,97,216,0.16)',
                        color: '#703A9E',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '-0.2px',
                        boxShadow: '0 2px 8px rgba(86,42,129,0.12)',
                        whiteSpace: 'nowrap',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        cursor: 'default'
                    },
                    children: label
                }),
                showTip && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        minWidth: 160,
                        maxWidth: 240,
                        background: 'rgba(15,23,42,0.95)',
                        color: '#fff',
                        borderRadius: 8,
                        padding: '8px 10px',
                        boxShadow: '0 8px 24px rgba(2,6,23,0.4)',
                        fontFamily: 'Inter, sans-serif',
                        whiteSpace: 'normal',
                        pointerEvents: 'none'
                    },
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6
                        },
                        children: list.map((e)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                style: {
                                    fontSize: 11,
                                    lineHeight: 1.35
                                },
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                        style: {
                                            fontWeight: 700
                                        },
                                        children: e.name
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                        style: {
                                            color: '#cbd5e1',
                                            fontSize: 10
                                        },
                                        children: siteOf(e) + (e.note ? ` · ${e.note}` : '')
                                    })
                                ]
                            }, e.id))
                    })
                })
            ]
        })
    });
}
_s2(OralRegionTag3D, "bRXmKus9fOZFlca/6zXTYU+twGY=");
_c3 = OralRegionTag3D;
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
_c4 = ScopeHotspot;
// ══════════════════════════════════════════════════════════════
// DentitionTooltip — camera-relative tooltip that stays fixed on
// screen regardless of tooth rotation. Only the leader line updates.
// ══════════════════════════════════════════════════════════════
function DentitionTooltip({ tooth, archPose, findings, diagnoses, isImplant, allEntries, toothNotes }) {
    _s3();
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
_s3(DentitionTooltip, "DpDYlgjArPUqteWDlpPbEx+7rQQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c5 = DentitionTooltip;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "ArchTooth$memo");
__turbopack_context__.k.register(_c1, "ArchTooth");
__turbopack_context__.k.register(_c2, "DentitionView");
__turbopack_context__.k.register(_c3, "OralRegionTag3D");
__turbopack_context__.k.register(_c4, "ScopeHotspot");
__turbopack_context__.k.register(_c5, "DentitionTooltip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/ToothSelector.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExamScopeChipBar",
    ()=>ExamScopeChipBar,
    "ToothSelector",
    ()=>ToothSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
"use client";
;
;
const ARCH_SCOPE_IDS = new Set([
    'RIGHT_ARCH',
    'LEFT_ARCH',
    'UPPER_ARCH',
    'LOWER_ARCH'
]);
/** Matches DentalCanvas dentitionScopeIsActive — highlights the scope chip that drives the preview. */ function scopeChipIsActive(btnId, selectionScope) {
    if (!selectionScope) return false;
    if (btnId === 'FULL') return selectionScope.type === 'full-mouth';
    if (ARCH_SCOPE_IDS.has(btnId)) return selectionScope.type === 'arch' && selectionScope.id === btnId;
    return selectionScope.type === 'quadrant' && selectionScope.id === btnId;
}
function toothHasChartMark(fdi, { toothDiagnoses, implantTeeth, findingsByTooth, allEntries, toothNotes }) {
    if (toothDiagnoses?.[fdi]?.size > 0) return true;
    if (implantTeeth?.has?.(fdi)) return true;
    if ((findingsByTooth?.[fdi] ?? []).length > 0) return true;
    if (allEntries?.some((e)=>e.toothFdi === fdi)) return true;
    if (toothNotes?.[fdi]?.trim?.()) return true;
    return false;
}
function scopeMarkDotColor(fdis, toothDiagnoses) {
    for (const fdi of fdis){
        if (toothDiagnoses?.[fdi]?.has?.('Missing')) return '#ef4444';
    }
    return '#8b5cf6';
}
function scopeHasChartMark(scopeId, getScopeFdis, ctx) {
    if (!getScopeFdis) return false;
    const fdis = getScopeFdis(scopeId);
    return fdis.some((fdi)=>toothHasChartMark(fdi, ctx));
}
const SCOPE_BUTTONS = [
    {
        id: 'UR',
        label: 'UR'
    },
    {
        id: 'UL',
        label: 'UL'
    },
    {
        id: 'LR',
        label: 'LR'
    },
    {
        id: 'LL',
        label: 'LL'
    },
    {
        id: 'RIGHT_ARCH',
        label: 'R'
    },
    {
        id: 'LEFT_ARCH',
        label: 'L'
    },
    {
        id: 'UPPER_ARCH',
        label: 'Max'
    },
    {
        id: 'LOWER_ARCH',
        label: 'Man'
    },
    {
        id: 'FULL',
        label: 'Full'
    }
];
function ExamScopeChipBar({ selectionScope = null, onSelectScope, getScopeFdis, toothDiagnoses, implantTeeth, findingsByTooth, allEntries, toothNotes }) {
    const markCtx = {
        toothDiagnoses,
        implantTeeth,
        findingsByTooth,
        allEntries,
        toothNotes
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: "tooth-chart-scope-bar",
        role: "toolbar",
        "aria-label": "Choose dentition scope",
        children: SCOPE_BUTTONS.map((btn)=>{
            const active = scopeChipIsActive(btn.id, selectionScope);
            const fdis = getScopeFdis ? getScopeFdis(btn.id) : [];
            const hasDataInScope = Boolean(getScopeFdis && scopeHasChartMark(btn.id, getScopeFdis, markCtx));
            const showLavender = hasDataInScope && !active;
            const dotColor = scopeMarkDotColor(fdis, toothDiagnoses);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                type: "button",
                onClick: (e)=>{
                    e.stopPropagation();
                    onSelectScope(btn.id);
                },
                title: btn.label,
                "aria-pressed": active,
                className: `scope-chip${active ? ' active' : ''}${showLavender ? ' has-mark' : ''}`,
                children: [
                    btn.label,
                    hasDataInScope && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        className: "tooth-pick-dot",
                        style: {
                            background: active ? '#fff' : dotColor
                        }
                    })
                ]
            }, btn.id);
        })
    });
}
_c = ExamScopeChipBar;
function ToothSelector({ selectedTooth, patientType = 'adult', onSelectTooth, toothDiagnoses, viewMode, onBackToDentition, surfaceSelector, onSelectScope, selectionScope = null, getScopeFdis, findingsByTooth, implantTeeth, allEntries, toothNotes, onEnterOralExam }) {
    const activeTeeth = patientType === 'adult' ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"] : patientType === 'pediatric' ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"] : [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"]
    ];
    const upperRight = activeTeeth.filter((t)=>t.quadrant === 'upper-right').sort((a, b)=>b.position - a.position);
    const upperLeft = activeTeeth.filter((t)=>t.quadrant === 'upper-left').sort((a, b)=>a.position - b.position);
    const lowerRight = activeTeeth.filter((t)=>t.quadrant === 'lower-right').sort((a, b)=>b.position - a.position);
    const lowerLeft = activeTeeth.filter((t)=>t.quadrant === 'lower-left').sort((a, b)=>a.position - b.position);
    // For mixed dentition, separate adult & pediatric within each quadrant
    const isMixed = patientType === 'mixed';
    const quadrantCard = (teeth, scopeId)=>{
        // Split into adult (Q1-4) and pediatric (Q5-8) for mixed mode
        let adultTeeth, pedTeeth;
        if (isMixed) {
            adultTeeth = teeth.filter((t)=>[
                    '1',
                    '2',
                    '3',
                    '4'
                ].includes(t.fdi[0]));
            pedTeeth = teeth.filter((t)=>[
                    '5',
                    '6',
                    '7',
                    '8'
                ].includes(t.fdi[0]));
        }
        const teethBlock = isMixed ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                adultTeeth.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    key: "adult",
                    className: "tooth-chart-row-single",
                    children: adultTeeth.map((t)=>renderToothBtn(t))
                }),
                pedTeeth.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    key: "ped",
                    className: "tooth-chart-row-single",
                    children: pedTeeth.map((t)=>renderToothBtn(t))
                })
            ]
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
            className: "tooth-chart-row-single",
            children: teeth.map((t)=>renderToothBtn(t))
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
            key: scopeId,
            className: "tooth-chart-quadrant-wrap",
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: "tooth-chart-quadrant-teeth",
                children: teethBlock
            })
        });
    };
    const renderToothBtn = (t)=>{
        const scopeIsToothLevel = selectionScope?.type === 'tooth';
        const isSelected = scopeIsToothLevel && selectedTooth?.fdi === t.fdi;
        const diagSet = toothDiagnoses?.[t.fdi];
        const hasDiag = diagSet?.size > 0;
        const diagColor = hasDiag ? diagSet.has('Missing') ? '#ef4444' : '#8b5cf6' : null;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
            type: "button",
            className: `tooth-pick ${isSelected ? 'active' : ''} ${hasDiag ? 'has-diagnosis' : ''}`,
            onClick: (e)=>{
                e.stopPropagation();
                onSelectTooth(t);
            },
            title: `${t.name} (${t.fdi})`,
            children: [
                t.fdi,
                diagColor && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    className: "tooth-pick-dot",
                    style: {
                        background: isSelected ? '#fff' : diagColor
                    }
                })
            ]
        }, t.fdi);
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: "tooth-selector",
        children: [
            surfaceSelector && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: "tooth-selector-surface",
                children: surfaceSelector
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: "tooth-chart",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: "tooth-chart-stack",
                        children: [
                            quadrantCard(upperRight, 'UR'),
                            quadrantCard(upperLeft, 'UL'),
                            quadrantCard(lowerRight, 'LR'),
                            quadrantCard(lowerLeft, 'LL')
                        ]
                    })
                ]
            })
        ]
    });
}
_c1 = ToothSelector;
var _c, _c1;
__turbopack_context__.k.register(_c, "ExamScopeChipBar");
__turbopack_context__.k.register(_c1, "ToothSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/QuickSurfaceSelector.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "qssTooltipFadeIn": "QuickSurfaceSelector-module-scss-module__Xb2rWW__qssTooltipFadeIn",
  "root": "QuickSurfaceSelector-module-scss-module__Xb2rWW__root",
  "svg": "QuickSurfaceSelector-module-scss-module__Xb2rWW__svg",
  "tooltipArrow": "QuickSurfaceSelector-module-scss-module__Xb2rWW__tooltipArrow",
  "tooltipBubble": "QuickSurfaceSelector-module-scss-module__Xb2rWW__tooltipBubble",
  "tooltipHost": "QuickSurfaceSelector-module-scss-module__Xb2rWW__tooltipHost",
});
}),
"[project]/components/dental/examination/QuickSurfaceSelector.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuickSurfaceSelector",
    ()=>QuickSurfaceSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/dental/examination/QuickSurfaceSelector.module.scss [app-client] (css module)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Shapes extracted from the provided quick-surface SVG (viewBox 114 x 229).
// These map directly to interactive zones, including "whole tooth" at the top.
const PATH_ROOT = "M36.8867 202.706H77.1133C79.7678 202.706 81.0969 206.024 79.0986 207.876L58.9854 226.513C57.8617 227.554 56.1384 227.554 55.0146 226.513L34.9004 207.876C32.9023 206.024 34.2321 202.706 36.8867 202.706Z";
const PATH_CERVICAL = "M34.8379 160.384C36.4665 158.775 39.285 158.672 41.5801 160.13C42.9573 161.004 44.4076 161.765 45.916 162.402C49.3632 163.858 53.0481 164.638 56.7607 164.697C60.4735 164.756 64.143 164.093 67.5586 162.741C68.9925 162.174 70.3702 161.489 71.6777 160.696C74.0318 159.27 76.86 159.377 78.4863 160.983L91.1387 173.479C92.8862 175.206 92.7701 177.866 91.0498 179.215C87.1174 182.298 82.7373 184.812 78.0342 186.674C75.2355 187.782 72.3549 187.262 68.9375 186.234C65.6773 185.254 61.7959 183.738 57.8018 183.675C53.8259 183.612 49.6776 184.989 46.1475 185.863C42.4349 186.783 39.2572 187.215 36.3906 186.005C31.555 183.963 27.0269 181.261 22.9404 177.987C21.2187 176.608 21.1158 173.938 22.8594 172.216L34.8379 160.384Z";
const PATH_BL = "M28.333 93.7061C28.5285 96.7782 29.2489 99.801 30.4717 102.649C31.9201 106.023 34.0412 109.085 36.7109 111.661C39.3807 114.237 42.5471 116.278 46.0273 117.669C48.9808 118.849 52.1133 119.541 55.2939 119.724V145.267C48.6064 145.068 42.0077 143.702 35.8203 141.229C32.9322 140.074 30.9982 137.533 29.0322 134.262C27.1638 131.153 25.2141 127.243 22.3545 124.483C19.4819 121.712 15.6489 120.056 12.6436 118.46C9.49039 116.785 7.08943 115.128 5.90723 112.374C3.35942 106.439 1.94928 100.114 1.73633 93.7061H28.333Z";
const PATH_BR = "M112.264 93.7061C112.051 100.114 110.641 106.44 108.093 112.375C106.91 115.129 104.509 116.785 101.356 118.46C98.3511 120.056 94.5181 121.712 91.6455 124.483C88.7859 127.243 86.8362 131.153 84.9678 134.262C83.0018 137.533 81.0677 140.074 78.1797 141.229C71.9923 143.702 65.3936 145.068 58.7061 145.267V119.724C61.8867 119.541 65.0192 118.849 67.9727 117.669C71.4529 116.278 74.6194 114.238 77.2891 111.662C79.959 109.086 82.0799 106.024 83.5283 102.649C84.7511 99.801 85.4715 96.7783 85.667 93.7061H112.264Z";
const PATH_TR = "M58.7061 38.7324C65.3936 38.9314 71.9923 40.2985 78.1797 42.7715C81.0678 43.9259 83.0018 46.4673 84.9678 49.7383C86.8362 52.8469 88.7859 56.7572 91.6455 59.5166C94.5181 62.2884 98.3511 63.9436 101.356 65.54C104.51 67.215 106.911 68.872 108.093 71.626C110.641 77.5611 112.051 83.8857 112.264 90.2939H85.667C85.4715 87.2218 84.751 84.1989 83.5283 81.3506C82.0799 77.9766 79.9588 74.915 77.2891 72.3389C74.6193 69.7628 71.4529 67.7221 67.9727 66.3311C65.0192 65.1506 61.8867 64.4584 58.7061 64.2754V38.7324Z";
const PATH_TL = "M55.2939 64.2754C52.1133 64.4584 48.9808 65.1506 46.0273 66.3311C42.5471 67.7221 39.3807 69.7628 36.7109 72.3389C34.0412 74.915 31.9201 77.9766 30.4717 81.3506C29.249 84.1989 28.5285 87.2218 28.333 90.2939H1.73633C1.94929 83.8857 3.35944 77.5611 5.90723 71.626C7.08943 68.872 9.49039 67.215 12.6436 65.54C15.6489 63.9436 19.4819 62.2884 22.3545 59.5166C25.2141 56.7572 27.1638 52.8469 29.0322 49.7383C30.9982 46.4673 32.9322 43.9259 35.8203 42.7715C42.0078 40.2985 48.6064 38.9314 55.2939 38.7324V64.2754Z";
const PATH_WHOLE = "M40.3711 1.70605H73.627C78.3391 1.70605 82.1599 5.52624 82.1602 10.2383V15.7617C82.1599 20.4738 78.3391 24.2939 73.627 24.2939H40.3711C35.6592 24.2937 31.8391 20.4736 31.8389 15.7617V10.2383C31.8391 5.52639 35.6592 1.7063 40.3711 1.70605Z";
// ──────────────────────────────────────────────────────────────
// Tooltip component — positioned above/below the hovered zone
// ──────────────────────────────────────────────────────────────
function ZoneTooltip({ text, x, y, visible }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tooltipHost,
        style: {
            position: 'absolute',
            left: x,
            top: y,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.15s ease',
            zIndex: 20
        },
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tooltipBubble,
            children: [
                text,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tooltipArrow
                })
            ]
        })
    });
}
_c = ZoneTooltip;
function QuickSurfaceSelector({ selectedZones, onToggleZone, arch = 'maxillary', toothPosition = 6, zonesWithFindings, disabled }) {
    _s();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [tooltipPos, setTooltipPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    // Resolve context-aware label for the hovered zone
    const getLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "QuickSurfaceSelector.useCallback[getLabel]": (zone)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getZoneLabel"])(zone, arch, toothPosition);
        }
    }["QuickSurfaceSelector.useCallback[getLabel]"], [
        arch,
        toothPosition
    ]);
    // Track mouse position within the container for tooltip placement
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "QuickSurfaceSelector.useCallback[handleMouseMove]": (e)=>{
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setTooltipPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top - 4
            });
        }
    }["QuickSurfaceSelector.useCallback[handleMouseMove]"], []);
    const NEUTRAL_STROKE = '#94a3b8'; // slate-400
    const NEUTRAL_FINDING_FILL = '#cbd5e1'; // slate-300
    // Tooltip is visible only when:
    //  1. A zone is hovered
    //  2. That zone is NOT currently selected (selected zones don't need tooltip)
    //  3. Component is not disabled
    const showTooltip = hovered !== null && !disabled && !selectedZones.has(hovered);
    const zoneProps = (id)=>{
        const baseColor = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZONE_INFO"][id].color;
        const isSel = selectedZones.has(id);
        const isHov = hovered === id;
        const hasFinding = zonesWithFindings?.has(id) ?? false;
        let fill;
        let fillOpacity;
        let stroke;
        let strokeOpacity;
        if (isSel) {
            fill = baseColor;
            fillOpacity = 1;
            stroke = baseColor;
            strokeOpacity = 1;
        } else if (isHov) {
            fill = NEUTRAL_STROKE;
            fillOpacity = 0.22;
            stroke = NEUTRAL_STROKE;
            strokeOpacity = 1;
        } else if (hasFinding) {
            fill = NEUTRAL_FINDING_FILL;
            fillOpacity = 0.5;
            stroke = NEUTRAL_STROKE;
            strokeOpacity = 0.85;
        } else {
            fill = NEUTRAL_STROKE;
            fillOpacity = 0;
            stroke = NEUTRAL_STROKE;
            strokeOpacity = 0.85;
        }
        return {
            fill,
            fillOpacity: disabled ? 0 : fillOpacity,
            stroke,
            strokeWidth: isSel ? 2.8 : 1.6,
            strokeOpacity: disabled ? 0.4 : strokeOpacity,
            style: {
                cursor: disabled ? 'default' : 'pointer',
                transition: 'fill-opacity 0.15s, stroke-width 0.15s, stroke 0.15s, fill 0.15s'
            },
            onMouseEnter: ()=>setHovered(id),
            onMouseLeave: ()=>setHovered(null),
            onClick: (e)=>{
                e.stopPropagation();
                if (!disabled) onToggleZone(id);
            }
        };
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        ref: containerRef,
        "data-surface-selector-ui": "true",
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].root,
        style: disabled ? {
            opacity: 0.45,
            pointerEvents: 'none'
        } : undefined,
        onMouseMove: handleMouseMove,
        children: [
            showTooltip && hovered && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ZoneTooltip, {
                text: getLabel(hovered),
                x: tooltipPos.x,
                y: tooltipPos.y,
                visible: showTooltip
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
                viewBox: "0 0 114 229",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].svg,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                        d: PATH_WHOLE,
                        ...zoneProps('whole')
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                        transform: arch === 'maxillary' ? "matrix(1 0 0 -1 0 259)" : undefined,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                d: PATH_TL,
                                ...zoneProps('buccal')
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                d: PATH_TR,
                                ...zoneProps('lingual')
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                d: PATH_BL,
                                ...zoneProps('mesial')
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                d: PATH_BR,
                                ...zoneProps('distal')
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                                cx: 57,
                                cy: 92,
                                r: 20,
                                ...zoneProps('occlusal')
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                d: PATH_CERVICAL,
                                ...zoneProps('cervical')
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                d: PATH_ROOT,
                                ...zoneProps('root')
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
_s(QuickSurfaceSelector, "8dktiD2IQekHQGO2/CiWsX/Ak50=");
_c1 = QuickSurfaceSelector;
var _c, _c1;
__turbopack_context__.k.register(_c, "ZoneTooltip");
__turbopack_context__.k.register(_c1, "QuickSurfaceSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/DiagnosisMatrix.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TERMINAL_DIAGNOSES",
    ()=>TERMINAL_DIAGNOSES,
    "applyDiagnosisSelection",
    ()=>applyDiagnosisSelection,
    "getDisabledDiagnoses",
    ()=>getDisabledDiagnoses,
    "isCompatible",
    ()=>isCompatible,
    "isTerminalDiagnosis",
    ()=>isTerminalDiagnosis
]);
/**
 * Single source of truth for tooth-level diagnosis compatibility.
 *
 * Clinical mental model:
 *   - Missing / Denture / Bridge stand alone — nothing else coexists.
 *   - Implant replaces a tooth → compatible only with Crown (implant-supported crown).
 *   - RCT is endodontic treatment → compatible only with Crown (post-endo crown).
 *   - Crown sits on an implant OR on a root-treated tooth.
 *
 * Chips are NEVER disabled in the UI. Clicking a diagnosis auto-removes any
 * currently-set diagnosis that is not in its allow-list. This mirrors how a
 * dentist mentally re-classifies the same tooth.
 */ const COMPATIBLE = {
    Missing: [],
    Denture: [],
    Bridge: [],
    Implant: [
        "Crown"
    ],
    RCT: [
        "Crown"
    ],
    Crown: [
        "Implant",
        "RCT"
    ]
};
function applyDiagnosisSelection(current, clicked) {
    const next = new Set(current);
    // Toggle-off: clicking an already-active diagnosis removes it.
    if (next.has(clicked)) {
        next.delete(clicked);
        return next;
    }
    // Drop any existing diagnosis not in clicked's compatibility list.
    const allowed = new Set(COMPATIBLE[clicked] ?? []);
    for (const d of Array.from(next)){
        if (!allowed.has(d)) next.delete(d);
    }
    next.add(clicked);
    return next;
}
function isCompatible(a, b) {
    if (a === b) return false;
    return (COMPATIBLE[a] ?? []).includes(b) || (COMPATIBLE[b] ?? []).includes(a);
}
// Teeth that are gone (Missing / Extraction) can't receive treatments that act
// on the natural crown/root. Those chips are DISABLED rather than silently
// auto-reclassifying — you must clear Missing/Extraction first.
const ABSENT = new Set([
    "Missing",
    "Extraction"
]);
const NATURAL_TOOTH_TREATMENTS = [
    "RCT",
    "Crown"
];
const TERMINAL_DIAGNOSES = ABSENT;
function isTerminalDiagnosis(d) {
    return ABSENT.has(d);
}
function getDisabledDiagnoses(current) {
    const disabled = new Set();
    const hasAbsent = Array.from(current).some((d)=>ABSENT.has(d));
    if (hasAbsent) NATURAL_TOOTH_TREATMENTS.forEach((t)=>disabled.add(t));
    return disabled;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/DentalCanvas.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "patientTypeBtn": "DentalCanvas-module-scss-module__EArrsa__patientTypeBtn",
  "patientTypeBtnActive": "DentalCanvas-module-scss-module__EArrsa__patientTypeBtnActive",
  "patientTypeHost": "DentalCanvas-module-scss-module__EArrsa__patientTypeHost",
  "patientTypeTrack": "DentalCanvas-module-scss-module__EArrsa__patientTypeTrack",
  "scopeBtn": "DentalCanvas-module-scss-module__EArrsa__scopeBtn",
  "scopeBtnActive": "DentalCanvas-module-scss-module__EArrsa__scopeBtnActive",
  "scopeBtnCompact": "DentalCanvas-module-scss-module__EArrsa__scopeBtnCompact" + " " + "DentalCanvas-module-scss-module__EArrsa__scopeBtn",
  "scopeDivider": "DentalCanvas-module-scss-module__EArrsa__scopeDivider",
  "scopeHost": "DentalCanvas-module-scss-module__EArrsa__scopeHost",
  "scopeTrack": "DentalCanvas-module-scss-module__EArrsa__scopeTrack",
});
}),
"[project]/public/lottie/arrow-left.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"v":"5.5.3","fr":25,"ip":0,"op":40,"w":24,"h":24,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer 29 Outlines","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[11.313,12.938,0],"ix":2},"a":{"a":0,"k":[7.395,11.67,0],"ix":1},"s":{"a":0,"k":[91,91,100],"ix":6}},"ao":0,"ef":[{"ty":5,"nm":"Elastic Controller","np":5,"mn":"Pseudo/MDS Elastic Controller","ix":1,"en":1,"ef":[{"ty":0,"nm":"Amplitude","mn":"Pseudo/MDS Elastic Controller-0001","ix":1,"v":{"a":0,"k":20,"ix":1}},{"ty":0,"nm":"Frequency","mn":"Pseudo/MDS Elastic Controller-0002","ix":2,"v":{"a":0,"k":40,"ix":2}},{"ty":0,"nm":"Decay","mn":"Pseudo/MDS Elastic Controller-0003","ix":3,"v":{"a":0,"k":60,"ix":3}}]}],"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0.77,-0.77],[0,0]],"o":[[0,0],[-0.77,-0.77],[0,0],[0,0]],"v":[[7.92,3.645],[1.4,-2.875],[-1.4,-2.875],[-7.92,3.645]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":1.5,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":2,"s":[100]},{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":9,"s":[71]},{"t":17,"s":[100]}],"ix":1,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"e":{"a":1,"k":[{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":2,"s":[0]},{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":9,"s":[31]},{"t":17,"s":[0]}],"ix":2,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":8,"s":[7.545,12.02],"to":[-0.833,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":16,"s":[2.545,12.02],"to":[0,0],"ti":[-0.833,0]},{"t":26,"s":[7.545,12.02]}],"ix":2,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"a":{"a":0,"k":[0,0],"ix":1,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"s":{"a":0,"k":[100,100],"ix":3,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"r":{"a":0,"k":-90,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":40,"st":0,"bm":0}],"markers":[]});}),
"[project]/public/lottie/arrow-up.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"v":"5.5.3","fr":25,"ip":0,"op":40,"w":24,"h":24,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer 33 Outlines","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[11.313,12.938,0],"ix":2},"a":{"a":0,"k":[11.67,7.395,0],"ix":1},"s":{"a":0,"k":[91,91,100],"ix":6}},"ao":0,"ef":[{"ty":5,"nm":"Elastic Controller","np":5,"mn":"Pseudo/MDS Elastic Controller","ix":1,"en":1,"ef":[{"ty":0,"nm":"Amplitude","mn":"Pseudo/MDS Elastic Controller-0001","ix":1,"v":{"a":0,"k":20,"ix":1}},{"ty":0,"nm":"Frequency","mn":"Pseudo/MDS Elastic Controller-0002","ix":2,"v":{"a":0,"k":40,"ix":2}},{"ty":0,"nm":"Decay","mn":"Pseudo/MDS Elastic Controller-0003","ix":3,"v":{"a":0,"k":60,"ix":3}}]}],"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0.77,-0.77],[0,0]],"o":[[0,0],[-0.77,-0.77],[0,0],[0,0]],"v":[[7.92,3.645],[1.4,-2.875],[-1.4,-2.875],[-7.92,3.645]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":1.5,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":6,"s":[100]},{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":13,"s":[71]},{"t":21,"s":[100]}],"ix":1,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"e":{"a":1,"k":[{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":6,"s":[0]},{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":13,"s":[31]},{"t":21,"s":[0]}],"ix":2,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":9,"s":[11.67,7.395],"to":[0,-0.667],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":18,"s":[11.67,3.395],"to":[0,0],"ti":[0,-0.667]},{"t":26,"s":[11.67,7.395]}],"ix":2,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"a":{"a":0,"k":[0,0],"ix":1,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"s":{"a":0,"k":[100,100],"ix":3,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":40,"st":0,"bm":0}],"markers":[]});}),
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
"[project]/components/tp-ui/button-system/TPButton.jsx [app-client] (ecmascript) <export TPButton as TPButtonToken>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TPButtonToken",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPButton"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/button-system/TPButton.jsx [app-client] (ecmascript)");
}),
"[project]/components/dental/examination/DentalCanvas.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CameraController",
    ()=>CameraController,
    "DentalCanvas",
    ()=>DentalCanvas,
    "ZoneCameraRotator",
    ()=>ZoneCameraRotator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/Tooth.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentitionView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/DentitionView.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$ToothSelector$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/ToothSelector.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/QuickSurfaceSelector.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$dental$2d$ai$2d$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dental-ai/dental-ai-events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DiagnosisMatrix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/DiagnosisMatrix.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/dental/examination/DentalCanvas.module.scss [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$LottieIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/LottieIcon.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$exam$2d$suggestions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/exam-suggestions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__TPButton__as__TPButtonToken$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/button-system/TPButton.jsx [app-client] (ecmascript) <export TPButton as TPButtonToken>");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
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
let findingIdCounter = 0;
const VALID_TOOTH_DIAG = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOOTH_DIAGNOSES"]);
const VALID_SURFACE_FINDING = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIAGNOSES"]);
// Stable empty collections so default values don't create new identity per render
// (which would cause downstream useEffect deps to re-fire and re-inject shaders)
const EMPTY_DIAG_SET = new Set();
const EMPTY_FINDINGS = [];
/** Single-row dentition scope toolbar (quadrants, arches, full). */ const DENTITION_SCOPE_BUTTONS = [
    {
        id: 'UR',
        label: 'UR',
        title: 'Upper right quadrant'
    },
    {
        id: 'UL',
        label: 'UL',
        title: 'Upper left quadrant'
    },
    {
        id: 'LR',
        label: 'LR',
        title: 'Lower right quadrant'
    },
    {
        id: 'LL',
        label: 'LL',
        title: 'Lower left quadrant'
    },
    {
        id: 'RIGHT_ARCH',
        label: 'R arch',
        title: "Patient's right arch (UR + LR)"
    },
    {
        id: 'LEFT_ARCH',
        label: 'L arch',
        title: "Patient's left arch (UL + LL)"
    },
    {
        id: 'UPPER_ARCH',
        label: 'Maxillary',
        title: 'Maxillary arch (UR + UL)'
    },
    {
        id: 'LOWER_ARCH',
        label: 'Mandibular',
        title: 'Mandibular arch (LR + LL)'
    },
    {
        id: 'FULL',
        label: 'Full',
        title: 'Full mouth — all teeth'
    }
];
const ARCH_SCOPE_IDS = new Set([
    'RIGHT_ARCH',
    'LEFT_ARCH',
    'UPPER_ARCH',
    'LOWER_ARCH'
]);
/** Agent / voice rows share the same clinical name often — give each applied row its own table key. */ function allocateTreatmentHistoryDetailKey(acc, preferredName) {
    const base = preferredName && String(preferredName).trim() || 'Treatment';
    if (!acc[base]) return base;
    let i = 2;
    while(acc[`${base} (${i})`])i += 1;
    return `${base} (${i})`;
}
/** Map radiology / voice surface text to chart zones for treatment-history rows. */ function zonesFromAgentHistorySurface(surfaceRaw, treatmentName) {
    const fallback = ()=>{
        const d = [
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultTreatmentSurfaces"])(treatmentName)
        ];
        return d.length ? d : [
            'whole'
        ];
    };
    const raw = (surfaceRaw || '').trim();
    if (!raw || /whole/i.test(raw)) return fallback();
    const s = raw.toLowerCase();
    const pairs = [
        [
            'occlusal',
            'occlusal'
        ],
        [
            'buccal',
            'buccal'
        ],
        [
            'labial',
            'buccal'
        ],
        [
            'lingual',
            'lingual'
        ],
        [
            'palatal',
            'lingual'
        ],
        [
            'mesial',
            'mesial'
        ],
        [
            'distal',
            'distal'
        ],
        [
            'cervical',
            'cervical'
        ],
        [
            'incisal',
            'occlusal'
        ],
        [
            'root',
            'root'
        ]
    ];
    for (const [needle, z] of pairs){
        if (s.includes(needle)) {
            if (z === 'whole' || __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_ZONES"].includes(z)) return [
                z
            ];
            break;
        }
    }
    return fallback();
}
/** Short tags in header — align with scope toolbar labels. */ const SCOPE_HEADER_BADGE = {
    FULL: 'FULL',
    UR: 'UR',
    UL: 'UL',
    LR: 'LR',
    LL: 'LL',
    RIGHT_ARCH: 'R arch',
    LEFT_ARCH: 'L arch',
    UPPER_ARCH: 'Maxillary',
    LOWER_ARCH: 'Mandibular'
};
const SCOPE_SELECTION_LABELS = {
    UR: 'Upper Right Quadrant',
    UL: 'Upper Left Quadrant',
    LR: 'Lower Right Quadrant',
    LL: 'Lower Left Quadrant',
    RIGHT_ARCH: 'Right arch',
    LEFT_ARCH: 'Left arch',
    UPPER_ARCH: 'Maxillary arch',
    LOWER_ARCH: 'Mandibular arch'
};
function dentitionScopeIsActive(scopeId, selectionScope) {
    if (scopeId === 'FULL') return selectionScope.type === 'full-mouth';
    if (ARCH_SCOPE_IDS.has(scopeId)) return selectionScope.type === 'arch' && selectionScope.id === scopeId;
    return selectionScope.type === 'quadrant' && selectionScope.id === scopeId;
}
// ══════════════════════════════════════════════════════════════
// Camera Controller — animates between dentition and single-tooth views
// ══════════════════════════════════════════════════════════════
const DENTITION_CAMERA = {
    position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 2.5, 16.5),
    target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, -0.9, -0.3),
    fov: 35
};
/** Same default radius as ZoneCameraRotator so “no surface picked” matches buccal framing. */ const SINGLE_TOOTH_ORBIT_RADIUS = 6.28;
/** Single-tooth orbit target; Y slightly above old -0.04 so the tooth sits higher in frame. */ const SINGLE_TOOTH_TARGET = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.04, 0);
const SINGLE_TOOTH_FOV = 27;
/** UR/UL/LR/LL + R/L: much closer Z than Max/Man/Full (see groupedScopeZ). */ const QUADRANT_SIDE_SCOPE_EXTRA_ZOOM = 3.15;
function getSingleToothBuccalCamera(fdi, width, height) {
    const aspect = width / Math.max(1, height);
    const widthFactor = (width - 980) / 980;
    const widthAdjust = Math.max(-1.1, Math.min(1.1, -widthFactor * 1.5));
    const aspectPull = aspect < 0.7 ? 2.0 : aspect < 0.9 ? 1.15 : aspect < 1.1 ? 0.6 : aspect < 1.4 ? 0.22 : 0;
    const radius = SINGLE_TOOTH_ORBIT_RADIUS + aspectPull + widthAdjust * 0.35;
    const frontAz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrontAzimuth"])(String(fdi)) ?? 0;
    const offset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().setFromSpherical(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"](radius, Math.PI / 2, frontAz));
    return {
        position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().copy(SINGLE_TOOTH_TARGET).add(offset),
        target: SINGLE_TOOTH_TARGET.clone(),
        fov: SINGLE_TOOTH_FOV
    };
}
function ZoneCameraRotator({ zone, toothFdi, quadrant, arch, controlsRef, radius = 6.28 }) {
    _s();
    const { camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ZoneCameraRotator.useEffect": ()=>{
            if (!zone) return;
            const frontAz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrontAzimuth"])(toothFdi) ?? 0;
            let az = frontAz;
            let pol = Math.PI / 2;
            const dirs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirsForTooth"])(toothFdi, quadrant, 0);
            if (zone === 'buccal') {
                az = frontAz;
                pol = Math.PI / 2;
            }
            if (zone === 'lingual') {
                az = frontAz + Math.PI;
                pol = Math.PI / 2;
            }
            if (zone === 'mesial') {
                az = Math.atan2(dirs.mesial.x, dirs.mesial.z);
                pol = Math.PI / 2;
            }
            if (zone === 'distal') {
                az = Math.atan2(dirs.distal.x, dirs.distal.z);
                pol = Math.PI / 2;
            }
            if (zone === 'occlusal') {
                az = frontAz;
                pol = arch === 'mandibular' ? 0.25 : Math.PI - 0.25;
            }
            if (zone === 'cervical') {
                az = frontAz;
                pol = arch === 'mandibular' ? Math.PI / 2.4 : Math.PI - Math.PI / 2.4;
            }
            if (zone === 'root') {
                az = frontAz;
                pol = arch === 'mandibular' ? Math.PI - 0.35 : 0.35;
            }
            if (controlsRef.current) {
                controlsRef.current.enabled = false;
                controlsRef.current.enableDamping = false;
            }
            target.current = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"](radius, pol, az);
        }
    }["ZoneCameraRotator.useEffect"], [
        zone,
        toothFdi,
        quadrant,
        arch,
        radius,
        controlsRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ZoneCameraRotator.useFrame": ()=>{
            if (!target.current || !controlsRef.current) return;
            const controls = controlsRef.current;
            const center = controls.target;
            // Current spherical around target
            const offset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().subVectors(camera.position, center);
            const cur = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"]().setFromVector3(offset);
            const goal = target.current;
            // Lerp spherical angles
            const lerp = 0.12;
            cur.theta += shortestAngleDelta(cur.theta, goal.theta) * lerp;
            cur.phi += (goal.phi - cur.phi) * lerp;
            // Keep radius roughly constant
            cur.radius += (goal.radius - cur.radius) * lerp;
            const next = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().setFromSpherical(cur);
            camera.position.copy(next.add(center));
            controls.update();
            // Stop when close enough
            if (Math.abs(shortestAngleDelta(cur.theta, goal.theta)) < 0.005 && Math.abs(cur.phi - goal.phi) < 0.005 && Math.abs(cur.radius - goal.radius) < 0.01) {
                target.current = null;
                if (controls) {
                    controls.enabled = true;
                    controls.enableDamping = true;
                }
            }
        }
    }["ZoneCameraRotator.useFrame"]);
    return null;
}
_s(ZoneCameraRotator, "KodedhdPJlGVbUAFv+Z50gvXiTg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = ZoneCameraRotator;
function shortestAngleDelta(from, to) {
    let d = to - from;
    while(d > Math.PI)d -= Math.PI * 2;
    while(d < -Math.PI)d += Math.PI * 2;
    return d;
}
function CameraController({ viewMode, patientType, selectionScopeType = 'tooth', selectionScopeId = null, dentitionCameraOverride, dentitionVerticalNudge, onDentitionVerticalNudgeChange, controlsRef }) {
    _s1();
    const { camera, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const animRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        active: false,
        t: 0,
        startPos: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        endPos: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        startTarget: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        endTarget: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        startFov: 32,
        endFov: 32
    });
    const cameraLayoutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CameraController.useMemo[cameraLayoutKey]": ()=>{
            if (viewMode === 'dentition') return 'dentition';
            if (selectionScopeType === 'tooth') return `single-tooth:${selectionScopeId ?? ''}`;
            return `grouped:${selectionScopeType}:${selectionScopeId ?? ''}`;
        }
    }["CameraController.useMemo[cameraLayoutKey]"], [
        viewMode,
        selectionScopeType,
        selectionScopeId
    ]);
    const prevLayoutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(cameraLayoutKey);
    const prevPatientType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(patientType);
    const initialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Canvas-aspect-responsive dentition z: the narrower the canvas, the further
    // back the camera pulls so the whole arch still fits without cropping.
    // Wider range so narrow panels never clip the teeth.
    const dentitionZ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CameraController.useMemo[dentitionZ]": ()=>{
            const aspect = size.width / Math.max(1, size.height);
            const widthFactor = (size.width - 980) / 980;
            // Wider canvas => zoom in a bit (lower Z), narrower => zoom out (higher Z)
            const widthAdjust = Math.max(-1.8, Math.min(1.8, -widthFactor * 2.2));
            const base = ({
                "CameraController.useMemo[dentitionZ].base": ()=>{
                    if (aspect < 0.6) return 30;
                    if (aspect < 0.8) return 26;
                    if (aspect < 1.0) return 22;
                    if (aspect < 1.2) return 19;
                    if (aspect < 1.5) return 17;
                    return 16;
                }
            })["CameraController.useMemo[dentitionZ].base"]();
            if (patientType === 'pediatric') return base - 4.2 + widthAdjust;
            if (patientType === 'mixed') return base + 0.3 + widthAdjust;
            return base - 1.4 + widthAdjust;
        }
    }["CameraController.useMemo[dentitionZ]"], [
        size.width,
        size.height,
        patientType
    ]);
    /** Extra Z + framing so UR/Full/… grouped views clear the bottom tooth-chart overlay and fit the arch. */ const groupedScopeZ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CameraController.useMemo[groupedScopeZ]": ()=>{
            const aspect = size.width / Math.max(1, size.height);
            const widthFactor = (size.width - 980) / 980;
            const widthAdjust = Math.max(-1.6, Math.min(1.6, -widthFactor * 2.0));
            const zoomPad = 2.45;
            const groupedZoomBase = 1.15;
            const base = aspect < 0.8 ? 22 : aspect < 1.1 ? 19.6 : 17.6;
            let z;
            if (selectionScopeType === 'full-mouth') z = base + (patientType === 'mixed' ? 7.2 : 5.2) + widthAdjust + zoomPad;
            else if (selectionScopeType === 'arch') z = base + (patientType === 'mixed' ? 4.2 : 3.0) + widthAdjust + zoomPad;
            else z = base + (patientType === 'mixed' ? 1.4 : 0.8) + widthAdjust + zoomPad;
            const isQuadrantOrSideArch = selectionScopeType === 'quadrant' || selectionScopeType === 'arch' && (selectionScopeId === 'RIGHT_ARCH' || selectionScopeId === 'LEFT_ARCH');
            const zoomTotal = groupedZoomBase + (isQuadrantOrSideArch ? QUADRANT_SIDE_SCOPE_EXTRA_ZOOM : 0);
            return z - zoomTotal;
        }
    }["CameraController.useMemo[groupedScopeZ]"], [
        size.width,
        size.height,
        patientType,
        selectionScopeType,
        selectionScopeId
    ]);
    // Ctrl/Cmd + drag vertically nudges dentition framing (desktop).
    // iPad keeps native 2-finger panning through OrbitControls.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraController.useEffect": ()=>{
            if (!controlsRef.current?.domElement) return;
            const dom = controlsRef.current.domElement;
            let dragging = false;
            let lastY = 0;
            const clampNudge = {
                "CameraController.useEffect.clampNudge": (v)=>Math.max(-2.0, Math.min(2.0, v))
            }["CameraController.useEffect.clampNudge"];
            const onPointerDown = {
                "CameraController.useEffect.onPointerDown": (e)=>{
                    if (viewMode !== 'dentition') return;
                    if (e.pointerType === 'touch') return;
                    if (!(e.ctrlKey || e.metaKey)) return;
                    dragging = true;
                    lastY = e.clientY;
                    if (controlsRef.current) controlsRef.current.enabled = false;
                    e.preventDefault();
                }
            }["CameraController.useEffect.onPointerDown"];
            const onPointerMove = {
                "CameraController.useEffect.onPointerMove": (e)=>{
                    if (!dragging) return;
                    const dy = e.clientY - lastY;
                    lastY = e.clientY;
                    if (controlsRef.current) {
                        controlsRef.current.object.position.y += dy * 0.01;
                        controlsRef.current.target.y += dy * 0.01;
                        controlsRef.current.update();
                    }
                    onDentitionVerticalNudgeChange({
                        "CameraController.useEffect.onPointerMove": (prev)=>clampNudge(prev + dy * 0.01)
                    }["CameraController.useEffect.onPointerMove"]);
                    e.preventDefault();
                }
            }["CameraController.useEffect.onPointerMove"];
            const stopDragging = {
                "CameraController.useEffect.stopDragging": ()=>{
                    if (!dragging) return;
                    dragging = false;
                    if (controlsRef.current?.dispatchEvent) {
                        controlsRef.current.dispatchEvent({
                            type: 'end'
                        });
                    }
                    if (controlsRef.current && !animRef.current.active) controlsRef.current.enabled = true;
                }
            }["CameraController.useEffect.stopDragging"];
            dom.addEventListener('pointerdown', onPointerDown, {
                passive: false
            });
            window.addEventListener('pointermove', onPointerMove, {
                passive: false
            });
            window.addEventListener('pointerup', stopDragging);
            window.addEventListener('pointercancel', stopDragging);
            return ({
                "CameraController.useEffect": ()=>{
                    dom.removeEventListener('pointerdown', onPointerDown);
                    window.removeEventListener('pointermove', onPointerMove);
                    window.removeEventListener('pointerup', stopDragging);
                    window.removeEventListener('pointercancel', stopDragging);
                }
            })["CameraController.useEffect"];
        }
    }["CameraController.useEffect"], [
        controlsRef,
        viewMode,
        onDentitionVerticalNudgeChange
    ]);
    const getCameraPreset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CameraController.useCallback[getCameraPreset]": ()=>{
            if (viewMode === 'dentition') {
                if (dentitionCameraOverride) {
                    return {
                        cam: {
                            ...DENTITION_CAMERA,
                            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](dentitionCameraOverride.position[0], dentitionCameraOverride.position[1], dentitionCameraOverride.position[2]),
                            target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](dentitionCameraOverride.target[0], dentitionCameraOverride.target[1], dentitionCameraOverride.target[2])
                        }
                    };
                }
                // Keep all dentition variants aligned to the canvas center-line vertically.
                const centeredY = 2.36;
                const centeredTargetY = -0.34;
                const dentitionFrameByType = patientType === 'pediatric' ? {
                    y: centeredY,
                    targetY: centeredTargetY,
                    z: dentitionZ - 2.05
                } : patientType === 'mixed' ? {
                    y: centeredY,
                    targetY: centeredTargetY,
                    z: dentitionZ + 0.9
                } : {
                    y: centeredY,
                    targetY: centeredTargetY,
                    z: dentitionZ - 0.85
                };
                return {
                    cam: {
                        ...DENTITION_CAMERA,
                        position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](DENTITION_CAMERA.position.x, dentitionFrameByType.y + dentitionVerticalNudge, dentitionFrameByType.z),
                        target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](DENTITION_CAMERA.target.x, dentitionFrameByType.targetY + dentitionVerticalNudge, DENTITION_CAMERA.target.z)
                    }
                };
            }
            if (selectionScopeType !== 'tooth') {
                const isNarrowGrouped = selectionScopeType === 'quadrant' || selectionScopeType === 'arch' && (selectionScopeId === 'RIGHT_ARCH' || selectionScopeId === 'LEFT_ARCH');
                if (isNarrowGrouped) {
                    return {
                        cam: {
                            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.64, groupedScopeZ),
                            target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, -0.04, -0.35),
                            fov: 30.5
                        }
                    };
                }
                return {
                    cam: {
                        position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.53, groupedScopeZ),
                        target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, -0.13, -0.35),
                        fov: 34.5
                    }
                };
            }
            const rawFdi = selectionScopeId != null ? String(selectionScopeId) : '';
            const fdi = /^\d{2}$/.test(rawFdi) ? rawFdi : '11';
            return {
                cam: getSingleToothBuccalCamera(fdi, size.width, size.height)
            };
        }
    }["CameraController.useCallback[getCameraPreset]"], [
        viewMode,
        patientType,
        selectionScopeType,
        selectionScopeId,
        dentitionZ,
        groupedScopeZ,
        dentitionVerticalNudge,
        dentitionCameraOverride,
        size.width,
        size.height
    ]);
    // Set initial camera position based on initial viewMode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraController.useEffect": ()=>{
            if (initialized.current) return;
            initialized.current = true;
            const { cam } = getCameraPreset();
            camera.position.copy(cam.position);
            camera.position.z = cam.position.z;
            camera.fov = cam.fov;
            camera.updateProjectionMatrix();
            if (controlsRef.current) {
                controlsRef.current.target.copy(cam.target);
                controlsRef.current.update();
            }
        }
    }["CameraController.useEffect"], [
        getCameraPreset
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    // React to canvas resize (e.g. draggable split) — both modes.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraController.useEffect": ()=>{
            if (animRef.current.active) return;
            const { cam } = getCameraPreset();
            if (viewMode !== 'dentition' && selectionScopeType === 'tooth') {
                camera.position.copy(cam.position);
                camera.fov = cam.fov;
                camera.updateProjectionMatrix();
                if (controlsRef.current) {
                    controlsRef.current.target.copy(cam.target);
                    controlsRef.current.update();
                }
            } else {
                camera.position.z = cam.position.z;
                camera.updateProjectionMatrix();
                if (controlsRef.current) controlsRef.current.update();
            }
        }
    }["CameraController.useEffect"], [
        dentitionZ,
        groupedScopeZ,
        viewMode,
        selectionScopeType,
        getCameraPreset,
        camera,
        controlsRef
    ]);
    // Switching patient tabs should restore that tab's own view (or default),
    // rather than carrying over the previous tab's current camera transform.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraController.useEffect": ()=>{
            if (viewMode !== 'dentition') {
                prevPatientType.current = patientType;
                return;
            }
            if (prevPatientType.current === patientType) return;
            prevPatientType.current = patientType;
            const { cam } = getCameraPreset();
            camera.position.copy(cam.position);
            camera.fov = cam.fov;
            camera.updateProjectionMatrix();
            if (controlsRef.current) {
                controlsRef.current.target.copy(cam.target);
                controlsRef.current.update();
            }
        }
    }["CameraController.useEffect"], [
        patientType,
        viewMode,
        getCameraPreset,
        camera,
        controlsRef
    ]);
    // Animate on dentition ↔ single-tooth, and when grouped scope id changes (UR→UL, Max→R, …).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraController.useEffect": ()=>{
            if (prevLayoutKey.current === cameraLayoutKey) return;
            prevLayoutKey.current = cameraLayoutKey;
            const { cam: target } = getCameraPreset();
            const a = animRef.current;
            a.startPos.copy(camera.position);
            a.endPos.copy(target.position);
            a.startTarget.copy(controlsRef.current?.target || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
            a.endTarget.copy(target.target);
            a.startFov = camera.fov;
            a.endFov = target.fov;
            a.t = 0;
            a.active = true;
            if (controlsRef.current) controlsRef.current.enabled = false;
        }
    }["CameraController.useEffect"], [
        cameraLayoutKey,
        getCameraPreset,
        camera,
        controlsRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "CameraController.useFrame": (_, delta)=>{
            const a = animRef.current;
            if (!a.active) return;
            a.t += delta / 1.0; // 1.0 second transition — more pronounced zoom
            const t = Math.min(a.t, 1);
            // easeOutQuint — a stronger slowdown near the end gives the "settle into place" feel
            const ease = 1 - Math.pow(1 - t, 5);
            camera.position.lerpVectors(a.startPos, a.endPos, ease);
            camera.fov = a.startFov + (a.endFov - a.startFov) * ease;
            camera.updateProjectionMatrix();
            if (controlsRef.current) {
                controlsRef.current.target.lerpVectors(a.startTarget, a.endTarget, ease);
                controlsRef.current.update();
            }
            if (t >= 1) {
                a.active = false;
                if (controlsRef.current) controlsRef.current.enabled = true;
            }
        }
    }["CameraController.useFrame"]);
    return null;
}
_s1(CameraController, "nGo+zLyLGUFElrEvEJronMRrC9A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = CameraController;
// ══════════════════════════════════════════════════════════════
// App
// ══════════════════════════════════════════════════════════════
const EMPTY_DIAGNOSES = new Set();
const EMPTY_TREATMENTS = {};
const getTeethForPatientType = (type)=>type === 'adult' ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"] : type === 'pediatric' ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"] : [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"]
    ];
const getDefaultFdiForPatientType = (type)=>type === 'adult' ? '26' : type === 'pediatric' ? '64' : '26';
// When a diagnosis is applied across a whole scope (a quadrant, an arch, the
// full mouth…) we show ONE consolidated tag instead of repeating it on every
// tooth. Each scope's tag is anchored to a representative spot over the canvas
// (percent of the viewer box) so it visually "belongs" to that region.
// Note: viewer is oriented facing the patient, so the patient's RIGHT teeth
// (UR / LR / Right arch) sit on the viewer's LEFT.
const SCOPE_TAG_POS = {
    'Maxillary': {
        left: 50,
        top: 37
    },
    'Mandibular': {
        left: 50,
        top: 79
    },
    'Upper Right': {
        left: 29,
        top: 38
    },
    'Upper Left': {
        left: 72,
        top: 37
    },
    'Lower Right': {
        left: 25,
        top: 77
    },
    'Lower Left': {
        left: 75,
        top: 79
    },
    'Right arch': {
        left: 12,
        top: 55
    },
    'Left arch': {
        left: 88,
        top: 55
    },
    'Full mouth': {
        left: 50,
        top: 58
    }
};
// Same anchors, keyed by oral-region id — used to float a region's oral-exam
// tag over the dentition so the doctor sees recorded oral findings at a glance.
const ORAL_TAG_POS = {
    UR: {
        left: 29,
        top: 38
    },
    UL: {
        left: 72,
        top: 37
    },
    LR: {
        left: 25,
        top: 77
    },
    LL: {
        left: 75,
        top: 79
    },
    RIGHT_ARCH: {
        left: 12,
        top: 55
    },
    LEFT_ARCH: {
        left: 88,
        top: 55
    },
    UPPER_ARCH: {
        left: 50,
        top: 37
    },
    LOWER_ARCH: {
        left: 50,
        top: 79
    },
    // Whole-mouth / full tag sits at the central meeting point of all four
    // quadrants (the occlusal midline) rather than on top of the front teeth.
    FULL: {
        left: 50,
        top: 50
    }
};
// One floating oral-exam tag, anchored over the dentition. Distinct translucent
// violet (vs the grey per-tooth treatment tags and the teal nothing-else), same
// small corner radius. Hover shows a tooltip listing the entries at that anchor.
function OralExamTag({ pos, list, forceShowAll = false }) {
    _s2();
    const [hover, setHover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showTip = hover || forceShowAll;
    const label = list.length > 1 ? `${list[0].name} +${list.length - 1}` : list[0].name;
    const siteOf = (e)=>(e.surfaces || []).map((p)=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ORAL_POSITION_LABEL"][p] || p).join(', ') || 'Whole mouth';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        style: {
            position: 'absolute',
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: showTip ? 9998 : 14,
            pointerEvents: 'auto'
        },
        onMouseEnter: ()=>setHover(true),
        onMouseLeave: ()=>setHover(false),
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '2px 8px',
                    borderRadius: 6,
                    background: 'rgba(164,97,216,0.16)',
                    color: '#703A9E',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '-0.2px',
                    boxShadow: '0 2px 8px rgba(86,42,129,0.12)',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    cursor: 'default'
                },
                children: label
            }),
            showTip && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: {
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9999,
                    minWidth: 160,
                    maxWidth: 240,
                    background: 'rgba(15,23,42,0.95)',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '8px 10px',
                    boxShadow: '0 8px 24px rgba(2,6,23,0.4)',
                    fontFamily: 'Inter, sans-serif',
                    whiteSpace: 'normal',
                    pointerEvents: 'none'
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6
                    },
                    children: list.map((e)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                fontSize: 11,
                                lineHeight: 1.35
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: e.name
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: {
                                        color: '#cbd5e1',
                                        fontSize: 10
                                    },
                                    children: siteOf(e) + (e.note ? ` · ${e.note}` : '')
                                })
                            ]
                        }, e.id))
                })
            })
        ]
    });
}
_s2(OralExamTag, "bRXmKus9fOZFlca/6zXTYU+twGY=");
_c2 = OralExamTag;
function OralExamTags({ entries, forceShowAll = false }) {
    const groups = {};
    entries.forEach((e)=>{
        const regionPos = (e.surfaces || []).find((p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOralRegionPosition"])(p) && ![
                'WHOLE',
                'GENERALIZED',
                'FULL'
            ].includes(p));
        const key = regionPos || 'FULL';
        (groups[key] = groups[key] || []).push(e);
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: Object.entries(groups).map(([key, list])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(OralExamTag, {
                pos: ORAL_TAG_POS[key] || ORAL_TAG_POS.FULL,
                list: list,
                forceShowAll: forceShowAll
            }, key))
    });
}
_c3 = OralExamTags;
function DentalCanvas({ patientId, patientAge = 30, compact = false, onStateChange, showAllOralTooltips = false }) {
    _s3();
    // When the doctor hovers the "Oral Examination" record card in the aside,
    // every oral tag on the dentition pops its tooltip at once (decoupled via a
    // window event so we don't thread props through the panel tree).
    const [hoverShowAllOral, setHoverShowAllOral] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            const on = {
                "DentalCanvas.useEffect.on": (e)=>setHoverShowAllOral(Boolean(e?.detail?.show))
            }["DentalCanvas.useEffect.on"];
            window.addEventListener('oral-tags-show-all', on);
            return ({
                "DentalCanvas.useEffect": ()=>window.removeEventListener('oral-tags-show-all', on)
            })["DentalCanvas.useEffect"];
        }
    }["DentalCanvas.useEffect"], []);
    // Pull initial state for this patient from mock data
    const initialState = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_TOOTH_STATE"][patientId];
    const initialToothDiagnoses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[initialToothDiagnoses]": ()=>{
            if (!initialState?.toothDiagnoses) return {};
            const out = {};
            for (const [fdi, diags] of Object.entries(initialState.toothDiagnoses)){
                out[fdi] = new Set(diags);
            }
            return out;
        }
    }["DentalCanvas.useMemo[initialToothDiagnoses]"], [
        initialState
    ]);
    const initialImplants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[initialImplants]": ()=>new Set(initialState?.implantTeeth ?? [])
    }["DentalCanvas.useMemo[initialImplants]"], [
        initialState
    ]);
    const initialFindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[initialFindings]": ()=>{
            if (!initialState?.findingsByTooth) return {};
            const out = {};
            for (const [fdi, list] of Object.entries(initialState.findingsByTooth)){
                out[fdi] = list.map({
                    "DentalCanvas.useMemo[initialFindings]": (f, i)=>({
                            id: `seed-${fdi}-${i}`,
                            zoneId: f.zoneId,
                            type: f.type,
                            notes: ''
                        })
                }["DentalCanvas.useMemo[initialFindings]"]);
            }
            return out;
        }
    }["DentalCanvas.useMemo[initialFindings]"], [
        initialState
    ]);
    const [patientType, setPatientType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(patientAge < 12 ? 'pediatric' : 'adult');
    const activeTeeth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[activeTeeth]": ()=>getTeethForPatientType(patientType)
    }["DentalCanvas.useMemo[activeTeeth]"], [
        patientType
    ]);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dentition');
    const [selectedTooth, setSelectedTooth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(activeTeeth.find({
        "DentalCanvas.useState": (t)=>t.fdi === getDefaultFdiForPatientType(patientType)
    }["DentalCanvas.useState"]) ?? activeTeeth[0]);
    const [selectionScope, setSelectionScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: 'tooth',
        id: 'tooth',
        label: '',
        fdis: []
    });
    const hasHydratedFromStorage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [selectedZone, setSelectedZone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [, setHoveredZone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [findingsByTooth, setFindingsByTooth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialFindings);
    // Last 3D click point per zone (world space) — used as spot decal center for findings.
    // Keyed by "fdi-zoneId" so points are scoped to the correct tooth.
    const [zoneHitPoints, setZoneHitPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [zoneNotes, setZoneNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [implantTeeth, setImplantTeeth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialImplants);
    const [toothDiagnoses, setToothDiagnoses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialToothDiagnoses);
    const [toothNotes, setToothNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [allEntries, setAllEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [treatmentHistoryDetailsByTooth, setTreatmentHistoryDetailsByTooth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [highlightZones, setHighlightZones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [multiSelectZones, setMultiSelectZones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DentalCanvas.useState": ()=>new Set()
    }["DentalCanvas.useState"]);
    const [multiSelectActive, setMultiSelectActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hoveredToothFdi, setHoveredToothFdi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dentitionVerticalNudgeByType, setDentitionVerticalNudgeByType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [dentitionCameraByType, setDentitionCameraByType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [hideExamineHint, setHideExamineHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Oral Examination — flat list of region/surface-tagged findings & procedures
    // (NOT tied to a single tooth). Each entry: { id, kind, name, surfaces[], since, note }
    // where `surfaces` holds position ids (regions and/or anatomical surfaces).
    const [oralEntries, setOralEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DentalCanvas.useState": ()=>Array.isArray(initialState?.oralEntries) ? initialState.oralEntries : []
    }["DentalCanvas.useState"]);
    const [oralNotes, setOralNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DentalCanvas.useState": ()=>initialState?.oralNotes ?? ''
    }["DentalCanvas.useState"]);
    const [oralHighlightFdis, setOralHighlightFdis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DentalCanvas.useState": ()=>new Set()
    }["DentalCanvas.useState"]);
    const oralIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const updateOralNotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[updateOralNotes]": (v)=>setOralNotes(v ?? '')
    }["DentalCanvas.useCallback[updateOralNotes]"], []);
    const addOralEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[addOralEntry]": (kind, name)=>{
            if (!name) return;
            setOralEntries({
                "DentalCanvas.useCallback[addOralEntry]": (prev)=>{
                    if (prev.some({
                        "DentalCanvas.useCallback[addOralEntry]": (e)=>e.kind === kind && e.name === name
                    }["DentalCanvas.useCallback[addOralEntry]"])) return prev;
                    // Unique across mounts (hydrated entries may already use oral-1, oral-2…).
                    const id = `oral-${Date.now().toString(36)}-${++oralIdRef.current}`;
                    return [
                        ...prev,
                        {
                            id,
                            kind,
                            name,
                            surfaces: [],
                            since: '',
                            note: ''
                        }
                    ];
                }
            }["DentalCanvas.useCallback[addOralEntry]"]);
        }
    }["DentalCanvas.useCallback[addOralEntry]"], []);
    const removeOralEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[removeOralEntry]": (id)=>{
            setOralEntries({
                "DentalCanvas.useCallback[removeOralEntry]": (prev)=>prev.filter({
                        "DentalCanvas.useCallback[removeOralEntry]": (e)=>e.id !== id
                    }["DentalCanvas.useCallback[removeOralEntry]"])
            }["DentalCanvas.useCallback[removeOralEntry]"]);
        }
    }["DentalCanvas.useCallback[removeOralEntry]"], []);
    const updateOralEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[updateOralEntry]": (id, patch)=>{
            setOralEntries({
                "DentalCanvas.useCallback[updateOralEntry]": (prev)=>prev.map({
                        "DentalCanvas.useCallback[updateOralEntry]": (e)=>e.id === id ? {
                                ...e,
                                ...patch
                            } : e
                    }["DentalCanvas.useCallback[updateOralEntry]"])
            }["DentalCanvas.useCallback[updateOralEntry]"]);
        }
    }["DentalCanvas.useCallback[updateOralEntry]"], []);
    /** FDI set — teeth pulse briefly after Dr Agent / AI scan copy-to-chart */ const [agentApplyPulseFdis, setAgentApplyPulseFdis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DentalCanvas.useState": ()=>new Set()
    }["DentalCanvas.useState"]);
    const agentPulseClearTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controlsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dentitionVerticalNudge = dentitionVerticalNudgeByType[patientType] ?? 0;
    const dentitionCameraOverride = dentitionCameraByType[patientType];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if (!selectionScope.fdis.length) {
                setSelectionScope({
                    type: 'tooth',
                    id: selectedTooth.fdi,
                    label: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][selectedTooth.quadrant]} ${selectedTooth.name}`,
                    fdis: [
                        selectedTooth.fdi
                    ]
                });
            }
        }
    }["DentalCanvas.useEffect"], [
        selectionScope.fdis.length,
        selectedTooth
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || hasHydratedFromStorage.current) return;
            hasHydratedFromStorage.current = true;
            const raw = window.localStorage.getItem(`dental.canvas.state.${patientId}`);
            if (!raw) return;
            try {
                const saved = JSON.parse(raw);
                const nextType = saved.patientType === 'adult' || saved.patientType === 'pediatric' || saved.patientType === 'mixed' ? saved.patientType : undefined;
                if (nextType) setPatientType(nextType);
                const source = getTeethForPatientType(nextType ?? patientType);
                const candidateFdi = saved.selectedToothFdi;
                const fallbackFdi = getDefaultFdiForPatientType(nextType ?? patientType);
                const tooth = source.find({
                    "DentalCanvas.useEffect": (t)=>t.fdi === candidateFdi
                }["DentalCanvas.useEffect"]) ?? source.find({
                    "DentalCanvas.useEffect": (t)=>t.fdi === fallbackFdi
                }["DentalCanvas.useEffect"]) ?? source[0];
                if (tooth) {
                    setSelectedTooth(tooth);
                    setSelectionScope({
                        type: 'tooth',
                        id: tooth.fdi,
                        label: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][tooth.quadrant]} ${tooth.name}`,
                        fdis: [
                            tooth.fdi
                        ]
                    });
                }
                if (saved.selectionScope && saved.selectionScope.fdis?.length) {
                    setSelectionScope(saved.selectionScope);
                }
                // NOTE: intentionally do NOT restore `viewMode` from localStorage.
                // Every fresh mount of the Dental Examination should boot into the
                // full dentition view; single-tooth mode is a transient drill-down
                // driven by user click within the session.
                if (saved.dentitionVerticalNudgeByType) {
                    setDentitionVerticalNudgeByType(saved.dentitionVerticalNudgeByType);
                }
                if (saved.dentitionCameraByType) {
                    setDentitionCameraByType(saved.dentitionCameraByType);
                }
                if (Array.isArray(saved.oralEntries)) {
                    setOralEntries(saved.oralEntries);
                }
                if (typeof saved.oralNotes === 'string') {
                    setOralNotes(saved.oralNotes);
                }
            } catch  {
            // ignore corrupted localStorage payload
            }
        }
    }["DentalCanvas.useEffect"], [
        patientId,
        patientType
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const hidden = window.localStorage.getItem(`dental.canvas.hintDismissed.${patientId}`);
            if (hidden === '1') setHideExamineHint(true);
        }
    }["DentalCanvas.useEffect"], [
        patientId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const payload = {
                patientType,
                viewMode,
                selectedToothFdi: selectedTooth.fdi,
                selectionScope,
                dentitionVerticalNudgeByType,
                dentitionCameraByType,
                oralEntries,
                oralNotes
            };
            window.localStorage.setItem(`dental.canvas.state.${patientId}`, JSON.stringify(payload));
        }
    }["DentalCanvas.useEffect"], [
        patientId,
        patientType,
        viewMode,
        selectedTooth.fdi,
        selectionScope,
        dentitionVerticalNudgeByType,
        dentitionCameraByType,
        oralEntries,
        oralNotes
    ]);
    // Persist examination clinical data so Treatment Plan "quick picks" stay in sync with the chart.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const entries = allEntries.filter({
                "DentalCanvas.useEffect.entries": (e)=>e.kind === 'procedure' || e.kind === 'planned'
            }["DentalCanvas.useEffect.entries"]).map({
                "DentalCanvas.useEffect.entries": (e)=>({
                        toothFdi: e.toothFdi,
                        kind: e.kind,
                        name: e.name,
                        surfaces: [
                            ...e.surfaces ?? []
                        ]
                    })
            }["DentalCanvas.useEffect.entries"]);
            const findingsSerialized = Object.fromEntries(Object.entries(findingsByTooth).map({
                "DentalCanvas.useEffect.findingsSerialized": ([fdi, list])=>[
                        fdi,
                        list.map({
                            "DentalCanvas.useEffect.findingsSerialized": (f)=>({
                                    zoneId: f.zoneId,
                                    type: f.type
                                })
                        }["DentalCanvas.useEffect.findingsSerialized"])
                    ]
            }["DentalCanvas.useEffect.findingsSerialized"]));
            const diagSerialized = Object.fromEntries(Object.entries(toothDiagnoses).map({
                "DentalCanvas.useEffect.diagSerialized": ([fdi, set])=>[
                        fdi,
                        [
                            ...set
                        ]
                    ]
            }["DentalCanvas.useEffect.diagSerialized"]));
            // Guard: never clobber a saved chart that has data with empty live state.
            // On a fresh mount (before any edit) the in-memory state can be empty;
            // writing it would wipe a previously-recorded chart and make the exam
            // look like it "reset" when the doctor returns to it.
            const liveIsEmpty = entries.length === 0 && Object.values(diagSerialized).every({
                "DentalCanvas.useEffect": (a)=>a.length === 0
            }["DentalCanvas.useEffect"]) && Object.values(findingsSerialized).every({
                "DentalCanvas.useEffect": (a)=>a.length === 0
            }["DentalCanvas.useEffect"]) && oralEntries.length === 0 && !oralNotes.trim();
            if (liveIsEmpty) {
                try {
                    const raw = window.localStorage.getItem(`${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$exam$2d$suggestions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXAM_CHART_STORAGE_PREFIX"]}${patientId}`);
                    if (raw) {
                        const saved = JSON.parse(raw);
                        const savedHasData = (saved.entries?.length ?? 0) > 0 || Object.values(saved.toothDiagnoses ?? {}).some({
                            "DentalCanvas.useEffect": (a)=>(a || []).length > 0
                        }["DentalCanvas.useEffect"]) || Object.values(saved.findingsByTooth ?? {}).some({
                            "DentalCanvas.useEffect": (a)=>(a || []).length > 0
                        }["DentalCanvas.useEffect"]);
                        if (savedHasData) return;
                    }
                } catch  {}
            }
            try {
                window.localStorage.setItem(`${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$exam$2d$suggestions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXAM_CHART_STORAGE_PREFIX"]}${patientId}`, JSON.stringify({
                    updatedAt: Date.now(),
                    entries,
                    toothDiagnoses: diagSerialized,
                    findingsByTooth: findingsSerialized,
                    oralEntries,
                    oralNotes
                }));
                window.dispatchEvent(new CustomEvent('dental-exam-chart-updated', {
                    detail: {
                        patientId
                    }
                }));
            } catch  {
            // ignore quota / private mode
            }
        }
    }["DentalCanvas.useEffect"], [
        patientId,
        allEntries,
        toothDiagnoses,
        findingsByTooth,
        oralEntries,
        oralNotes
    ]);
    const handleDentitionVerticalNudgeChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleDentitionVerticalNudgeChange]": (value)=>{
            setDentitionVerticalNudgeByType({
                "DentalCanvas.useCallback[handleDentitionVerticalNudgeChange]": (prev)=>{
                    const current = prev[patientType] ?? 0;
                    const nextRaw = typeof value === 'function' ? value(current) : value;
                    const next = Math.max(-2.0, Math.min(2.0, nextRaw));
                    if (Math.abs(next - current) < 0.0001) return prev;
                    return {
                        ...prev,
                        [patientType]: next
                    };
                }
            }["DentalCanvas.useCallback[handleDentitionVerticalNudgeChange]"]);
        }
    }["DentalCanvas.useCallback[handleDentitionVerticalNudgeChange]"], [
        patientType
    ]);
    const handleDentitionControlsEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleDentitionControlsEnd]": ()=>{
            if (viewMode !== 'dentition' || !controlsRef.current) return;
            const ctrl = controlsRef.current;
            const p = ctrl.object?.position;
            const t = ctrl.target;
            if (!p || !t) return;
            const pose = {
                position: [
                    p.x,
                    p.y,
                    p.z
                ],
                target: [
                    t.x,
                    t.y,
                    t.z
                ]
            };
            setDentitionCameraByType({
                "DentalCanvas.useCallback[handleDentitionControlsEnd]": (prev)=>({
                        ...prev,
                        [patientType]: pose
                    })
            }["DentalCanvas.useCallback[handleDentitionControlsEnd]"]);
        }
    }["DentalCanvas.useCallback[handleDentitionControlsEnd]"], [
        patientType,
        viewMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if (hideExamineHint) return;
            const hasExamData = allEntries.length > 0 || Object.values(findingsByTooth).some({
                "DentalCanvas.useEffect": (items)=>items.length > 0
            }["DentalCanvas.useEffect"]);
            if (!hasExamData) return;
            setHideExamineHint(true);
            if ("TURBOPACK compile-time truthy", 1) {
                window.localStorage.setItem(`dental.canvas.hintDismissed.${patientId}`, '1');
            }
        }
    }["DentalCanvas.useEffect"], [
        allEntries.length,
        findingsByTooth,
        hideExamineHint,
        patientId
    ]);
    const currentToothDiagnoses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[currentToothDiagnoses]": ()=>toothDiagnoses[selectedTooth.fdi] || EMPTY_DIAGNOSES
    }["DentalCanvas.useMemo[currentToothDiagnoses]"], [
        toothDiagnoses,
        selectedTooth.fdi
    ]);
    const isImplant = currentToothDiagnoses.has('Implant') || implantTeeth.has(selectedTooth.fdi);
    const currentToothNotes = toothNotes[selectedTooth.fdi] || '';
    const currentTreatmentHistoryDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[currentTreatmentHistoryDetails]": ()=>{
            return treatmentHistoryDetailsByTooth[selectedTooth.fdi] || EMPTY_TREATMENTS;
        }
    }["DentalCanvas.useMemo[currentTreatmentHistoryDetails]"], [
        treatmentHistoryDetailsByTooth,
        selectedTooth.fdi
    ]);
    // The teeth a newly added diagnosis/finding/procedure should apply to: an
    // explicit arch / quadrant / full-mouth scope fans out to EVERY tooth in
    // that scope (sharing one groupId); otherwise just the focused tooth. This
    // is what makes "select Maxillary, then add Missing" mark all maxillary
    // teeth instead of a single tooth.
    const targetFdis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[targetFdis]": ()=>{
            if (selectionScope.type !== 'tooth' && selectionScope.fdis.length > 0) return selectionScope.fdis;
            return [
                selectedTooth.fdi
            ];
        }
    }["DentalCanvas.useMemo[targetFdis]"], [
        selectionScope,
        selectedTooth.fdi
    ]);
    const newGroupId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[newGroupId]": (fdis)=>fdis.length > 1 ? `grp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` : undefined
    }["DentalCanvas.useCallback[newGroupId]"], []);
    // Always-fresh mirror of toothDiagnoses so a multi-apply can lock a single
    // add/remove direction from the focused tooth.
    const toothDiagnosesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(toothDiagnoses);
    toothDiagnosesRef.current = toothDiagnoses;
    // Scope-wide diagnoses (a diagnosis covering exactly a whole zone) shown as a
    // single banner at the top of the dentition — e.g. "RCT · Full mouth" —
    // instead of repeating the tag on every tooth.
    // Detect diagnoses that blanket an entire scope and collapse them into one
    // tag per { diagnosis, scope }. Matches DentitionView's per-tooth suppression
    // so a scope-wide diagnosis shows ONCE (positioned by scope) rather than on
    // every tooth.
    const dentitionGroupLabels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[dentitionGroupLabels]": ()=>{
            const diagToFdis = {};
            Object.entries(toothDiagnoses || {}).forEach({
                "DentalCanvas.useMemo[dentitionGroupLabels]": ([fdi, set])=>{
                    (set instanceof Set ? [
                        ...set
                    ] : set || []).forEach({
                        "DentalCanvas.useMemo[dentitionGroupLabels]": (d)=>{
                            (diagToFdis[d] = diagToFdis[d] || []).push(fdi);
                        }
                    }["DentalCanvas.useMemo[dentitionGroupLabels]"]);
                }
            }["DentalCanvas.useMemo[dentitionGroupLabels]"]);
            (implantTeeth instanceof Set ? [
                ...implantTeeth
            ] : implantTeeth || []).forEach({
                "DentalCanvas.useMemo[dentitionGroupLabels]": (f)=>{
                    (diagToFdis['Implant'] = diagToFdis['Implant'] || []).push(f);
                }
            }["DentalCanvas.useMemo[dentitionGroupLabels]"]);
            const byQ = {
                'upper-right': [],
                'upper-left': [],
                'lower-left': [],
                'lower-right': []
            };
            activeTeeth.forEach({
                "DentalCanvas.useMemo[dentitionGroupLabels]": (t)=>{
                    if (byQ[t.quadrant]) byQ[t.quadrant].push(t.fdi);
                }
            }["DentalCanvas.useMemo[dentitionGroupLabels]"]);
            const defs = [
                [
                    'Full mouth',
                    [
                        ...byQ['upper-right'],
                        ...byQ['upper-left'],
                        ...byQ['lower-left'],
                        ...byQ['lower-right']
                    ]
                ],
                [
                    'Maxillary',
                    [
                        ...byQ['upper-right'],
                        ...byQ['upper-left']
                    ]
                ],
                [
                    'Mandibular',
                    [
                        ...byQ['lower-left'],
                        ...byQ['lower-right']
                    ]
                ],
                [
                    'Right arch',
                    [
                        ...byQ['upper-right'],
                        ...byQ['lower-right']
                    ]
                ],
                [
                    'Left arch',
                    [
                        ...byQ['upper-left'],
                        ...byQ['lower-left']
                    ]
                ],
                [
                    'Upper Right',
                    byQ['upper-right']
                ],
                [
                    'Upper Left',
                    byQ['upper-left']
                ],
                [
                    'Lower Left',
                    byQ['lower-left']
                ],
                [
                    'Lower Right',
                    byQ['lower-right']
                ]
            ];
            const out = [];
            Object.entries(diagToFdis).forEach({
                "DentalCanvas.useMemo[dentitionGroupLabels]": ([diag, fdis])=>{
                    const uniq = [
                        ...new Set(fdis)
                    ];
                    if (uniq.length < 2) return;
                    const set = new Set(uniq);
                    const hit = defs.find({
                        "DentalCanvas.useMemo[dentitionGroupLabels].hit": ([, arr])=>arr.length > 1 && arr.length === set.size && arr.every({
                                "DentalCanvas.useMemo[dentitionGroupLabels].hit": (f)=>set.has(f)
                            }["DentalCanvas.useMemo[dentitionGroupLabels].hit"])
                    }["DentalCanvas.useMemo[dentitionGroupLabels].hit"]);
                    if (hit) out.push({
                        diag,
                        scope: hit[0]
                    });
                }
            }["DentalCanvas.useMemo[dentitionGroupLabels]"]);
            return out;
        }
    }["DentalCanvas.useMemo[dentitionGroupLabels]"], [
        toothDiagnoses,
        implantTeeth,
        activeTeeth
    ]);
    // Implant toggle routes through the compatibility matrix (see toggleToothDiagnosis below).
    // The matrix sync-fires `setImplantTeeth` to keep the top-level set in step so the
    // ImplantScrew shader sees the same truth as the UI chips.
    const toggleImplant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[toggleImplant]": ()=>{
            // Forward-ref: toggleToothDiagnosis is declared below but captured at call time.
            // Using a deferred wrapper avoids use-before-declaration lint errors.
            toggleToothDiagnosisRef.current?.('Implant');
            setSelectedZone({
                "DentalCanvas.useCallback[toggleImplant]": (prev)=>prev === 'cervical' || prev === 'root' ? null : prev
            }["DentalCanvas.useCallback[toggleImplant]"]);
        }
    }["DentalCanvas.useCallback[toggleImplant]"], []);
    const toggleToothDiagnosisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toggleToothDiagnosis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[toggleToothDiagnosis]": (diagnosis)=>{
            const fdis = targetFdis;
            const multi = fdis.length > 1;
            // Lock the add/remove direction once from the focused tooth so a group
            // stays consistent (teeth that already have it won't toggle the other way).
            const refCurrent = new Set(toothDiagnosesRef.current[selectedTooth.fdi] || []);
            const refNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DiagnosisMatrix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyDiagnosisSelection"])(refCurrent, diagnosis);
            const adding = refNext.has(diagnosis) && !refCurrent.has(diagnosis);
            const implantAdd = [];
            const implantRemove = [];
            setToothDiagnoses({
                "DentalCanvas.useCallback[toggleToothDiagnosis]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    for (const fdi of fdis){
                        const current = new Set(prev[fdi] || []);
                        const has = current.has(diagnosis);
                        let res = current;
                        if (!multi) res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DiagnosisMatrix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyDiagnosisSelection"])(current, diagnosis);
                        else if (adding && !has) res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DiagnosisMatrix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyDiagnosisSelection"])(current, diagnosis);
                        else if (!adding && has) res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DiagnosisMatrix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyDiagnosisSelection"])(current, diagnosis);
                        if (current.has('Implant') && !res.has('Implant')) implantRemove.push(fdi);
                        if (!current.has('Implant') && res.has('Implant')) implantAdd.push(fdi);
                        next[fdi] = res;
                    }
                    return next;
                }
            }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
            if (implantAdd.length || implantRemove.length) {
                setImplantTeeth({
                    "DentalCanvas.useCallback[toggleToothDiagnosis]": (ip)=>{
                        const n = new Set(ip);
                        implantAdd.forEach({
                            "DentalCanvas.useCallback[toggleToothDiagnosis]": (f)=>n.add(f)
                        }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
                        implantRemove.forEach({
                            "DentalCanvas.useCallback[toggleToothDiagnosis]": (f)=>n.delete(f)
                        }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
                        return n;
                    }
                }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
            }
            // Tooth-level diagnosis changed → clear all surface findings for these teeth
            setFindingsByTooth({
                "DentalCanvas.useCallback[toggleToothDiagnosis]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    fdis.forEach({
                        "DentalCanvas.useCallback[toggleToothDiagnosis]": (f)=>{
                            delete next[f];
                        }
                    }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
                    return next;
                }
            }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
            if (diagnosis === 'Missing' || diagnosis === 'Extraction') {
                setImplantTeeth({
                    "DentalCanvas.useCallback[toggleToothDiagnosis]": (prev)=>{
                        const next = new Set(prev);
                        fdis.forEach({
                            "DentalCanvas.useCallback[toggleToothDiagnosis]": (f)=>next.delete(f)
                        }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
                        return next;
                    }
                }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
                setSelectedZone(null);
            }
        }
    }["DentalCanvas.useCallback[toggleToothDiagnosis]"], [
        targetFdis,
        selectedTooth.fdi
    ]);
    // Keep the deferred ref in sync so toggleImplant can route through the matrix.
    toggleToothDiagnosisRef.current = toggleToothDiagnosis;
    const updateToothNotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[updateToothNotes]": (notes)=>{
            const fdis = targetFdis;
            setToothNotes({
                "DentalCanvas.useCallback[updateToothNotes]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    fdis.forEach({
                        "DentalCanvas.useCallback[updateToothNotes]": (f)=>{
                            next[f] = notes;
                        }
                    }["DentalCanvas.useCallback[updateToothNotes]"]);
                    return next;
                }
            }["DentalCanvas.useCallback[updateToothNotes]"]);
        }
    }["DentalCanvas.useCallback[updateToothNotes]"], [
        targetFdis
    ]);
    const handleSelectTooth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSelectTooth]": (tooth)=>{
            setSelectedTooth(tooth);
            setSelectionScope({
                type: 'tooth',
                id: tooth.fdi,
                label: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][tooth.quadrant]} ${tooth.name}`,
                fdis: [
                    tooth.fdi
                ]
            });
            setSelectedZone(null);
            setViewMode('single-tooth');
        }
    }["DentalCanvas.useCallback[handleSelectTooth]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const handler = {
                "DentalCanvas.useEffect.handler": (e)=>{
                    const detail = e.detail;
                    if (!detail || detail.patientId !== patientId) return;
                    const { teeth, focusFdi, openFullDentition, patientTypeHint, highlightFdis } = detail;
                    if (!Array.isArray(teeth) || teeth.length === 0) return;
                    const effectivePatientType = patientTypeHint === 'adult' || patientTypeHint === 'pediatric' || patientTypeHint === 'mixed' ? patientTypeHint : patientType;
                    if (patientTypeHint === 'adult' || patientTypeHint === 'pediatric' || patientTypeHint === 'mixed') {
                        setPatientType(patientTypeHint);
                    }
                    setToothDiagnoses({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            const next = {
                                ...prev
                            };
                            for (const t of teeth){
                                const fdi = String(t.fdi);
                                const cur = new Set(next[fdi] || []);
                                if (t.implant) cur.add('Implant');
                                for (const d of t.diagnoses || []){
                                    if (VALID_TOOTH_DIAG.has(d)) cur.add(d);
                                }
                                next[fdi] = cur;
                            }
                            return next;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    setImplantTeeth({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            const n = new Set(prev);
                            for (const t of teeth){
                                if (t.implant) n.add(String(t.fdi));
                            }
                            return n;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    setFindingsByTooth({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            const next = {
                                ...prev
                            };
                            for (const t of teeth){
                                const fdi = String(t.fdi);
                                const list = [
                                    ...next[fdi] || []
                                ];
                                for (const f of t.findings || []){
                                    const z = f.zoneId;
                                    const zoneId = z === 'whole' || __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_ZONES"].includes(z) ? z : 'occlusal';
                                    const type = VALID_SURFACE_FINDING.has(f.type) ? f.type : 'Staining';
                                    const notes = (f.notes || '').trim();
                                    list.push({
                                        id: `finding-${++findingIdCounter}`,
                                        zoneId,
                                        type,
                                        notes: notes || 'From AI scan'
                                    });
                                }
                                next[fdi] = list;
                            }
                            return next;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    setTreatmentHistoryDetailsByTooth({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            let next = prev;
                            let changed = false;
                            for (const t of teeth){
                                const fdi = String(t.fdi);
                                const rows = t.treatmentHistoryRows && t.treatmentHistoryRows.length > 0 ? t.treatmentHistoryRows : (t.treatmentHistory || []).map({
                                    "DentalCanvas.useEffect.handler": (line)=>({
                                            name: line
                                        })
                                }["DentalCanvas.useEffect.handler"]);
                                if (!rows.length) continue;
                                if (!changed) {
                                    next = {
                                        ...prev
                                    };
                                    changed = true;
                                }
                                const cur = next[fdi] || {};
                                const acc = {
                                    ...cur
                                };
                                for (const row of rows){
                                    const baseName = row.name && String(row.name).trim() || 'Treatment';
                                    const key = allocateTreatmentHistoryDetailKey(acc, baseName);
                                    const zones = zonesFromAgentHistorySurface(row.surface, baseName);
                                    const prevD = acc[key];
                                    const noteMerge = [
                                        prevD?.note,
                                        row.notes
                                    ].filter(Boolean).join(', ').trim();
                                    acc[key] = {
                                        ...prevD,
                                        surfaces: zones.length ? zones : [
                                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultTreatmentSurfaces"])(baseName)
                                        ],
                                        since: row.since && String(row.since).trim() || prevD?.since || '',
                                        note: noteMerge || prevD?.note || ''
                                    };
                                }
                                next[fdi] = acc;
                            }
                            return changed ? next : prev;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    setAllEntries({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            const add = [];
                            for (const t of teeth){
                                const fdi = String(t.fdi);
                                for (const p of t.procedures || []){
                                    const name = p.name && String(p.name).trim() || '';
                                    if (!name) continue;
                                    const noteBits = [
                                        p.surface && p.surface !== '—' ? p.surface : null,
                                        p.date,
                                        p.status,
                                        p.notes
                                    ].filter(Boolean);
                                    add.push({
                                        id: `agent-proc-${fdi}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                                        toothFdi: fdi,
                                        kind: 'procedure',
                                        name,
                                        surfaces: [
                                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultTreatmentSurfaces"])(name)
                                        ],
                                        notes: noteBits.length ? noteBits.join(' · ') : undefined
                                    });
                                }
                            }
                            return add.length ? [
                                ...prev,
                                ...add
                            ] : prev;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    setToothNotes({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            let next = prev;
                            let changed = false;
                            for (const t of teeth){
                                const note = t.scannerNotes?.trim();
                                if (!note) continue;
                                const fdi = String(t.fdi);
                                const existing = (next[fdi] || '').trim();
                                const merged = existing ? `${existing}\n${note}` : note;
                                if (!changed) {
                                    next = {
                                        ...prev
                                    };
                                    changed = true;
                                }
                                next[fdi] = merged;
                            }
                            return changed ? next : prev;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    const goFullDentition = openFullDentition !== false;
                    if (goFullDentition) {
                        const source = getTeethForPatientType(effectivePatientType);
                        const allFdis = source.map({
                            "DentalCanvas.useEffect.handler.allFdis": (t)=>t.fdi
                        }["DentalCanvas.useEffect.handler.allFdis"]);
                        if (allFdis.length > 0) {
                            const representative = source.find({
                                "DentalCanvas.useEffect.handler": (t)=>t.fdi === allFdis[0]
                            }["DentalCanvas.useEffect.handler"]) ?? source[0];
                            setSelectedTooth(representative);
                            setSelectionScope({
                                type: 'full-mouth',
                                id: 'FULL',
                                label: 'Full mouth',
                                fdis: allFdis
                            });
                            setSelectedZone(null);
                            setViewMode('dentition');
                        }
                        const pulseList = highlightFdis && highlightFdis.length > 0 ? highlightFdis : teeth.map({
                            "DentalCanvas.useEffect.handler": (t)=>String(t.fdi)
                        }["DentalCanvas.useEffect.handler"]);
                        const pulseSet = new Set(pulseList.map({
                            "DentalCanvas.useEffect.handler": (fdi)=>String(fdi)
                        }["DentalCanvas.useEffect.handler"]));
                        setAgentApplyPulseFdis(pulseSet);
                        if (agentPulseClearTimerRef.current) window.clearTimeout(agentPulseClearTimerRef.current);
                        agentPulseClearTimerRef.current = window.setTimeout({
                            "DentalCanvas.useEffect.handler": ()=>{
                                setAgentApplyPulseFdis(new Set());
                                agentPulseClearTimerRef.current = null;
                            }
                        }["DentalCanvas.useEffect.handler"], 1300);
                    } else if (focusFdi) {
                        const source = getTeethForPatientType(effectivePatientType);
                        const tooth = source.find({
                            "DentalCanvas.useEffect.handler.tooth": (x)=>x.fdi === String(focusFdi)
                        }["DentalCanvas.useEffect.handler.tooth"]);
                        if (tooth) handleSelectTooth(tooth);
                        const pulseList = highlightFdis && highlightFdis.length > 0 ? highlightFdis : [
                            String(focusFdi)
                        ];
                        const pulseSet = new Set(pulseList.map({
                            "DentalCanvas.useEffect.handler": (fdi)=>String(fdi)
                        }["DentalCanvas.useEffect.handler"]));
                        setAgentApplyPulseFdis(pulseSet);
                        if (agentPulseClearTimerRef.current) window.clearTimeout(agentPulseClearTimerRef.current);
                        agentPulseClearTimerRef.current = window.setTimeout({
                            "DentalCanvas.useEffect.handler": ()=>{
                                setAgentApplyPulseFdis(new Set());
                                agentPulseClearTimerRef.current = null;
                            }
                        }["DentalCanvas.useEffect.handler"], 1300);
                    }
                }
            }["DentalCanvas.useEffect.handler"];
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$dental$2d$ai$2d$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DENTAL_AI_SCAN_APPLY_EVENT"], handler);
            return ({
                "DentalCanvas.useEffect": ()=>{
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$dental$2d$ai$2d$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DENTAL_AI_SCAN_APPLY_EVENT"], handler);
                    if (agentPulseClearTimerRef.current) window.clearTimeout(agentPulseClearTimerRef.current);
                }
            })["DentalCanvas.useEffect"];
        }
    }["DentalCanvas.useEffect"], [
        patientId,
        patientType,
        handleSelectTooth
    ]);
    const handleBackToDentition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleBackToDentition]": ()=>{
            setViewMode('dentition');
            setSelectionScope({
                type: 'tooth',
                id: selectedTooth.fdi,
                label: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][selectedTooth.quadrant]} ${selectedTooth.name}`,
                fdis: [
                    selectedTooth.fdi
                ]
            });
            setSelectedZone(null);
            setHoveredZone(null);
        }
    }["DentalCanvas.useCallback[handleBackToDentition]"], [
        selectedTooth
    ]);
    const getScopeFdis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[getScopeFdis]": (scope)=>{
            const source = getTeethForPatientType(patientType);
            if (scope === 'FULL') return source.map({
                "DentalCanvas.useCallback[getScopeFdis]": (t)=>t.fdi
            }["DentalCanvas.useCallback[getScopeFdis]"]);
            const quadrantMap = {
                UR: 'upper-right',
                UL: 'upper-left',
                LR: 'lower-right',
                LL: 'lower-left'
            };
            if (quadrantMap[scope]) return source.filter({
                "DentalCanvas.useCallback[getScopeFdis]": (t)=>t.quadrant === quadrantMap[scope]
            }["DentalCanvas.useCallback[getScopeFdis]"]).map({
                "DentalCanvas.useCallback[getScopeFdis]": (t)=>t.fdi
            }["DentalCanvas.useCallback[getScopeFdis]"]);
            const archQuadrants = {
                RIGHT_ARCH: [
                    'upper-right',
                    'lower-right'
                ],
                LEFT_ARCH: [
                    'upper-left',
                    'lower-left'
                ],
                UPPER_ARCH: [
                    'upper-right',
                    'upper-left'
                ],
                LOWER_ARCH: [
                    'lower-right',
                    'lower-left'
                ]
            };
            const qs = archQuadrants[scope];
            if (qs) return source.filter({
                "DentalCanvas.useCallback[getScopeFdis]": (t)=>qs.includes(t.quadrant)
            }["DentalCanvas.useCallback[getScopeFdis]"]).map({
                "DentalCanvas.useCallback[getScopeFdis]": (t)=>t.fdi
            }["DentalCanvas.useCallback[getScopeFdis]"]);
            return [];
        }
    }["DentalCanvas.useCallback[getScopeFdis]"], [
        patientType
    ]);
    const handleSelectScope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSelectScope]": (scope)=>{
            const fdis = getScopeFdis(scope);
            if (fdis.length === 0) return;
            const representative = activeTeeth.find({
                "DentalCanvas.useCallback[handleSelectScope]": (t)=>t.fdi === fdis[0]
            }["DentalCanvas.useCallback[handleSelectScope]"]) ?? activeTeeth[0];
            setSelectedTooth(representative);
            const scopeType = scope === 'FULL' ? 'full-mouth' : ARCH_SCOPE_IDS.has(scope) ? 'arch' : 'quadrant';
            setSelectionScope({
                type: scopeType,
                id: scope,
                label: scope === 'FULL' ? 'Full mouth' : SCOPE_SELECTION_LABELS[scope],
                fdis
            });
            setSelectedZone(null);
            setViewMode('single-tooth');
        }
    }["DentalCanvas.useCallback[handleSelectScope]"], [
        activeTeeth,
        getScopeFdis
    ]);
    // Oral Examination — select a REGION (not a tooth). Reuses the grouped
    // selectionScope so the 3D view highlights that region, but stays in 'oral'
    // viewMode so the side panel shows the Oral Examination (findings/procedures)
    // instead of the per-tooth panel.
    // Oral Examination uses the FULL dentition (no zoom). Entering it just sets
    // a full-mouth scope so the 3D shows all teeth, and flips to 'oral' viewMode
    // so the aside swaps to the oral findings/procedures tables.
    const enterOralExam = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[enterOralExam]": ()=>{
            setSelectionScope({
                type: 'full-mouth',
                id: 'FULL',
                label: 'Full mouth',
                fdis: getScopeFdis('FULL')
            });
            setSelectedZone(null);
            setOralHighlightFdis(new Set());
            setViewMode('oral');
        }
    }["DentalCanvas.useCallback[enterOralExam]"], [
        getScopeFdis
    ]);
    // Highlight teeth for the active oral row's region position(s). Anatomical
    // surfaces don't map to teeth, so they're ignored here (recorded as labels).
    const setOralHighlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[setOralHighlight]": (positionIds)=>{
            const ids = Array.isArray(positionIds) ? positionIds : [];
            const regionIds = ids.filter({
                "DentalCanvas.useCallback[setOralHighlight].regionIds": (p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOralRegionPosition"])(p)
            }["DentalCanvas.useCallback[setOralHighlight].regionIds"]);
            if (regionIds.length === 0) {
                setOralHighlightFdis(new Set());
                return;
            }
            const fdis = new Set();
            regionIds.forEach({
                "DentalCanvas.useCallback[setOralHighlight]": (r)=>{
                    (r === 'WHOLE' || r === 'GENERALIZED' ? getScopeFdis('FULL') : getScopeFdis(r)).forEach({
                        "DentalCanvas.useCallback[setOralHighlight]": (f)=>fdis.add(f)
                    }["DentalCanvas.useCallback[setOralHighlight]"]);
                }
            }["DentalCanvas.useCallback[setOralHighlight]"]);
            setOralHighlightFdis(fdis);
        }
    }["DentalCanvas.useCallback[setOralHighlight]"], [
        getScopeFdis
    ]);
    // Tooth chart scope bar: same scope state as the dentition toolbar so the
    // 3D preview (grouped DentitionView) updates. Preserve the current tooth when
    // it already lies in the chosen scope; otherwise jump to the first tooth.
    const handleToothScopeJump = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleToothScopeJump]": (scope)=>{
            const fdis = getScopeFdis(scope);
            if (fdis.length === 0) return;
            setSelectedTooth({
                "DentalCanvas.useCallback[handleToothScopeJump]": (prev)=>{
                    if (prev && fdis.includes(prev.fdi)) return prev;
                    return activeTeeth.find({
                        "DentalCanvas.useCallback[handleToothScopeJump]": (t)=>t.fdi === fdis[0]
                    }["DentalCanvas.useCallback[handleToothScopeJump]"]) ?? prev;
                }
            }["DentalCanvas.useCallback[handleToothScopeJump]"]);
            setSelectionScope({
                type: scope === 'FULL' ? 'full-mouth' : ARCH_SCOPE_IDS.has(scope) ? 'arch' : 'quadrant',
                id: scope,
                label: scope === 'FULL' ? 'Full mouth' : SCOPE_SELECTION_LABELS[scope],
                fdis
            });
            setSelectedZone(null);
            setViewMode('single-tooth');
        }
    }["DentalCanvas.useCallback[handleToothScopeJump]"], [
        activeTeeth,
        getScopeFdis
    ]);
    const handlePatientTypeChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handlePatientTypeChange]": (nextType)=>{
            setPatientType(nextType);
            const nextTeeth = getTeethForPatientType(nextType);
            setSelectedTooth({
                "DentalCanvas.useCallback[handlePatientTypeChange]": (prev)=>{
                    const nextSelected = nextTeeth.find({
                        "DentalCanvas.useCallback[handlePatientTypeChange]": (t)=>t.fdi === prev.fdi
                    }["DentalCanvas.useCallback[handlePatientTypeChange]"]) ?? nextTeeth.find({
                        "DentalCanvas.useCallback[handlePatientTypeChange]": (t)=>t.fdi === getDefaultFdiForPatientType(nextType)
                    }["DentalCanvas.useCallback[handlePatientTypeChange]"]) ?? nextTeeth[0];
                    setSelectionScope({
                        type: 'tooth',
                        id: nextSelected.fdi,
                        label: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][nextSelected.quadrant]} ${nextSelected.name}`,
                        fdis: [
                            nextSelected.fdi
                        ]
                    });
                    return nextSelected;
                }
            }["DentalCanvas.useCallback[handlePatientTypeChange]"]);
        }
    }["DentalCanvas.useCallback[handlePatientTypeChange]"], []);
    const handleSelectZone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSelectZone]": (zone, hitPoint, opts)=>{
            if (currentToothDiagnoses.has('Missing') || currentToothDiagnoses.has('Extraction')) return;
            if (hitPoint) {
                const key = `${selectedTooth.fdi}-${zone}`;
                setZoneHitPoints({
                    "DentalCanvas.useCallback[handleSelectZone]": (prev)=>({
                            ...prev,
                            [key]: hitPoint
                        })
                }["DentalCanvas.useCallback[handleSelectZone]"]);
            }
            if (opts?.multi) {
                // Always rotate camera to the clicked surface — even during multi-select
                setSelectedZone(zone);
                setMultiSelectZones({
                    "DentalCanvas.useCallback[handleSelectZone]": (prev)=>{
                        const next = new Set(prev);
                        if (zone !== 'whole' && next.has('whole')) next.delete('whole');
                        if (next.has(zone)) next.delete(zone);
                        else next.add(zone);
                        return next;
                    }
                }["DentalCanvas.useCallback[handleSelectZone]"]);
                return;
            }
            setSelectedZone({
                "DentalCanvas.useCallback[handleSelectZone]": (prev)=>prev === zone ? null : zone
            }["DentalCanvas.useCallback[handleSelectZone]"]);
        }
    }["DentalCanvas.useCallback[handleSelectZone]"], [
        currentToothDiagnoses,
        selectedTooth.fdi
    ]);
    const handleToggleZoneMultiSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleToggleZoneMultiSelect]": (zone)=>{
            // Always rotate the 3D camera to the picked surface — the 3D canvas
            // reacts to actions happening in the side panel (bi-directional link).
            setSelectedZone({
                "DentalCanvas.useCallback[handleToggleZoneMultiSelect]": (prev)=>multiSelectActive ? zone : prev === zone ? null : zone
            }["DentalCanvas.useCallback[handleToggleZoneMultiSelect]"]);
            // Multi-select mode is gated by multiSelectActive (enabled only when a
            // surface cell in the Findings/Procedures table is active).
            if (!multiSelectActive) return;
            setMultiSelectZones({
                "DentalCanvas.useCallback[handleToggleZoneMultiSelect]": (prev)=>{
                    if (zone === 'whole') {
                        return prev.has('whole') ? new Set() : new Set([
                            'whole'
                        ]);
                    }
                    const next = new Set(prev);
                    if (next.has('whole')) next.delete('whole');
                    if (next.has(zone)) next.delete(zone);
                    else next.add(zone);
                    return next;
                }
            }["DentalCanvas.useCallback[handleToggleZoneMultiSelect]"]);
        }
    }["DentalCanvas.useCallback[handleToggleZoneMultiSelect]"], [
        multiSelectActive
    ]);
    const handleToggleZoneFromQuickSelector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]": (zone)=>{
            // Keep selector visible always, but only allow true multi-select
            // while a surfaces cell is actively editing.
            if (!multiSelectActive) {
                setMultiSelectZones({
                    "DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]": (prev)=>prev.size === 0 ? prev : new Set()
                }["DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]"]);
                setSelectedZone({
                    "DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]": (prev)=>prev === zone ? null : zone
                }["DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]"]);
                return;
            }
            setSelectedZone(zone);
            setMultiSelectZones({
                "DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]": (prev)=>{
                    if (zone === 'whole') {
                        return prev.has('whole') ? new Set() : new Set([
                            'whole'
                        ]);
                    }
                    const next = new Set(prev);
                    if (next.has('whole')) next.delete('whole');
                    if (next.has(zone)) next.delete(zone);
                    else next.add(zone);
                    return next;
                }
            }["DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]"]);
        }
    }["DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]"], [
        multiSelectActive
    ]);
    const handleClearMultiSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleClearMultiSelect]": ()=>{
            setMultiSelectZones({
                "DentalCanvas.useCallback[handleClearMultiSelect]": (prev)=>prev.size === 0 ? prev : new Set()
            }["DentalCanvas.useCallback[handleClearMultiSelect]"]);
        }
    }["DentalCanvas.useCallback[handleClearMultiSelect]"], []);
    const handleClearSelectedZone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleClearSelectedZone]": ()=>{
            setSelectedZone(null);
        }
    }["DentalCanvas.useCallback[handleClearSelectedZone]"], []);
    const handleSetMultiSelectZones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSetMultiSelectZones]": (zones)=>{
            setMultiSelectZones({
                "DentalCanvas.useCallback[handleSetMultiSelectZones]": (prev)=>{
                    if (prev.size === zones.length && zones.every({
                        "DentalCanvas.useCallback[handleSetMultiSelectZones]": (zone)=>prev.has(zone)
                    }["DentalCanvas.useCallback[handleSetMultiSelectZones]"])) return prev;
                    return new Set(zones);
                }
            }["DentalCanvas.useCallback[handleSetMultiSelectZones]"]);
        }
    }["DentalCanvas.useCallback[handleSetMultiSelectZones]"], []);
    const handleSetMultiSelectActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSetMultiSelectActive]": (active)=>{
            setMultiSelectActive(active);
        }
    }["DentalCanvas.useCallback[handleSetMultiSelectActive]"], []);
    const handleSetHoveredTooth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSetHoveredTooth]": (fdi)=>{
            setHoveredToothFdi(fdi);
        }
    }["DentalCanvas.useCallback[handleSetHoveredTooth]"], []);
    const handleAddFinding = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleAddFinding]": (zoneId, type)=>{
            const fdis = targetFdis;
            const groupId = newGroupId(fdis);
            setFindingsByTooth({
                "DentalCanvas.useCallback[handleAddFinding]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    for (const fdi of fdis){
                        let list = [
                            ...prev[fdi] || []
                        ];
                        if (type === 'Normal') {
                            list = list.filter({
                                "DentalCanvas.useCallback[handleAddFinding]": (f)=>f.zoneId !== zoneId
                            }["DentalCanvas.useCallback[handleAddFinding]"]);
                        } else {
                            list = list.filter({
                                "DentalCanvas.useCallback[handleAddFinding]": (f)=>!(f.zoneId === zoneId && f.type === 'Normal')
                            }["DentalCanvas.useCallback[handleAddFinding]"]);
                        }
                        const hitPoint = zoneHitPoints[`${fdi}-${zoneId}`];
                        list.push({
                            id: `finding-${++findingIdCounter}`,
                            zoneId,
                            type,
                            notes: '',
                            hitPoint,
                            groupId
                        });
                        next[fdi] = list;
                    }
                    return next;
                }
            }["DentalCanvas.useCallback[handleAddFinding]"]);
        }
    }["DentalCanvas.useCallback[handleAddFinding]"], [
        zoneHitPoints,
        targetFdis,
        newGroupId
    ]);
    const handleRemoveFinding = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleRemoveFinding]": (id)=>{
            const fdi = selectedTooth.fdi;
            setFindingsByTooth({
                "DentalCanvas.useCallback[handleRemoveFinding]": (prev)=>{
                    const removed = (prev[fdi] || []).find({
                        "DentalCanvas.useCallback[handleRemoveFinding].removed": (f)=>f.id === id
                    }["DentalCanvas.useCallback[handleRemoveFinding].removed"]);
                    if (removed?.groupId) {
                        // Grouped finding → remove it from every tooth in the group.
                        const next = {};
                        for (const [k, list] of Object.entries(prev)){
                            next[k] = list.filter({
                                "DentalCanvas.useCallback[handleRemoveFinding]": (f)=>f.groupId !== removed.groupId
                            }["DentalCanvas.useCallback[handleRemoveFinding]"]);
                        }
                        return next;
                    }
                    return {
                        ...prev,
                        [fdi]: (prev[fdi] || []).filter({
                            "DentalCanvas.useCallback[handleRemoveFinding]": (f)=>f.id !== id
                        }["DentalCanvas.useCallback[handleRemoveFinding]"])
                    };
                }
            }["DentalCanvas.useCallback[handleRemoveFinding]"]);
        }
    }["DentalCanvas.useCallback[handleRemoveFinding]"], [
        selectedTooth.fdi
    ]);
    // Current tooth's findings (derived, stable identity when empty)
    const findings = findingsByTooth[selectedTooth.fdi] || EMPTY_FINDINGS;
    const handleUpdateNotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleUpdateNotes]": (zoneId, notes)=>{
            setZoneNotes({
                "DentalCanvas.useCallback[handleUpdateNotes]": (prev)=>({
                        ...prev,
                        [zoneId]: notes
                    })
            }["DentalCanvas.useCallback[handleUpdateNotes]"]);
        }
    }["DentalCanvas.useCallback[handleUpdateNotes]"], []);
    // ── Entity-centric entries (findings + procedures) ──────────────
    let entryIdCounter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0).current;
    const handleAddEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleAddEntry]": (partial)=>{
            const fdis = targetFdis;
            const groupId = newGroupId(fdis);
            setAllEntries({
                "DentalCanvas.useCallback[handleAddEntry]": (prev)=>[
                        ...prev,
                        ...fdis.map({
                            "DentalCanvas.useCallback[handleAddEntry]": (fdi)=>({
                                    ...partial,
                                    id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${fdi}`,
                                    toothFdi: fdi,
                                    groupId
                                })
                        }["DentalCanvas.useCallback[handleAddEntry]"])
                    ]
            }["DentalCanvas.useCallback[handleAddEntry]"]);
        }
    }["DentalCanvas.useCallback[handleAddEntry]"], [
        targetFdis,
        newGroupId
    ]);
    const handleUpdateEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleUpdateEntry]": (id, patch)=>{
            // Edits to a grouped entry propagate to its siblings (except per-tooth
            // identity), so a shared procedure stays in sync across the group.
            setAllEntries({
                "DentalCanvas.useCallback[handleUpdateEntry]": (prev)=>{
                    const target = prev.find({
                        "DentalCanvas.useCallback[handleUpdateEntry].target": (e)=>e.id === id
                    }["DentalCanvas.useCallback[handleUpdateEntry].target"]);
                    if (target?.groupId) {
                        return prev.map({
                            "DentalCanvas.useCallback[handleUpdateEntry]": (e)=>e.groupId === target.groupId ? {
                                    ...e,
                                    ...patch
                                } : e
                        }["DentalCanvas.useCallback[handleUpdateEntry]"]);
                    }
                    return prev.map({
                        "DentalCanvas.useCallback[handleUpdateEntry]": (e)=>e.id === id ? {
                                ...e,
                                ...patch
                            } : e
                    }["DentalCanvas.useCallback[handleUpdateEntry]"]);
                }
            }["DentalCanvas.useCallback[handleUpdateEntry]"]);
        }
    }["DentalCanvas.useCallback[handleUpdateEntry]"], []);
    const handleRemoveEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleRemoveEntry]": (id)=>{
            setAllEntries({
                "DentalCanvas.useCallback[handleRemoveEntry]": (prev)=>{
                    const target = prev.find({
                        "DentalCanvas.useCallback[handleRemoveEntry].target": (e)=>e.id === id
                    }["DentalCanvas.useCallback[handleRemoveEntry].target"]);
                    if (target?.groupId) return prev.filter({
                        "DentalCanvas.useCallback[handleRemoveEntry]": (e)=>e.groupId !== target.groupId
                    }["DentalCanvas.useCallback[handleRemoveEntry]"]);
                    return prev.filter({
                        "DentalCanvas.useCallback[handleRemoveEntry]": (e)=>e.id !== id
                    }["DentalCanvas.useCallback[handleRemoveEntry]"]);
                }
            }["DentalCanvas.useCallback[handleRemoveEntry]"]);
        }
    }["DentalCanvas.useCallback[handleRemoveEntry]"], []);
    const handleUpdateTreatmentHistoryDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleUpdateTreatmentHistoryDetail]": (name, patch)=>{
            const fdis = targetFdis;
            const groupId = newGroupId(fdis);
            setTreatmentHistoryDetailsByTooth({
                "DentalCanvas.useCallback[handleUpdateTreatmentHistoryDetail]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    for (const fdi of fdis){
                        const currentToothDetails = prev[fdi] || {};
                        const existing = currentToothDetails[name];
                        const previous = existing || {
                            surfaces: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultTreatmentSurfaces"])(name),
                            groupId
                        };
                        next[fdi] = {
                            ...currentToothDetails,
                            [name]: {
                                ...previous,
                                ...patch,
                                groupId: existing?.groupId ?? previous.groupId
                            }
                        };
                    }
                    return next;
                }
            }["DentalCanvas.useCallback[handleUpdateTreatmentHistoryDetail]"]);
        }
    }["DentalCanvas.useCallback[handleUpdateTreatmentHistoryDetail]"], [
        targetFdis,
        newGroupId
    ]);
    const handleRemoveTreatmentHistoryDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleRemoveTreatmentHistoryDetail]": (name)=>{
            const fdi = selectedTooth.fdi;
            setTreatmentHistoryDetailsByTooth({
                "DentalCanvas.useCallback[handleRemoveTreatmentHistoryDetail]": (prev)=>{
                    const toothMap = prev[fdi];
                    if (!toothMap || !toothMap[name]) return prev;
                    const groupId = toothMap[name].groupId;
                    const next = {
                        ...prev
                    };
                    for (const [k, map] of Object.entries(prev)){
                        // Drop this named detail from the focused tooth, and from any tooth
                        // sharing the same group when it spanned multiple teeth.
                        if (k !== fdi && !(groupId && map[name]?.groupId === groupId)) continue;
                        const { [name]: _removed, ...rest } = map;
                        next[k] = rest;
                    }
                    return next;
                }
            }["DentalCanvas.useCallback[handleRemoveTreatmentHistoryDetail]"]);
        }
    }["DentalCanvas.useCallback[handleRemoveTreatmentHistoryDetail]"], [
        selectedTooth.fdi
    ]);
    const handleClearTreatmentHistoryDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleClearTreatmentHistoryDetails]": ()=>{
            const fdi = selectedTooth.fdi;
            setTreatmentHistoryDetailsByTooth({
                "DentalCanvas.useCallback[handleClearTreatmentHistoryDetails]": (prev)=>{
                    if (!prev[fdi]) return prev;
                    const next = {
                        ...prev
                    };
                    delete next[fdi];
                    return next;
                }
            }["DentalCanvas.useCallback[handleClearTreatmentHistoryDetails]"]);
        }
    }["DentalCanvas.useCallback[handleClearTreatmentHistoryDetails]"], [
        selectedTooth.fdi
    ]);
    const handleSetHighlightZones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSetHighlightZones]": (zones)=>{
            setHighlightZones(zones);
        }
    }["DentalCanvas.useCallback[handleSetHighlightZones]"], []);
    const currentToothEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[currentToothEntries]": ()=>allEntries.filter({
                "DentalCanvas.useMemo[currentToothEntries]": (e)=>e.toothFdi === selectedTooth.fdi
            }["DentalCanvas.useMemo[currentToothEntries]"])
    }["DentalCanvas.useMemo[currentToothEntries]"], [
        allEntries,
        selectedTooth.fdi
    ]);
    // Emit state changes to parent (ExaminationTab) for the right-side panel
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if (!onStateChange) return;
            onStateChange({
                viewMode,
                patientType,
                selectedTooth,
                selectedZone,
                findings,
                toothDiagnoses,
                implantTeeth,
                findingsByTooth,
                toothNotes,
                treatmentHistoryDetailsByTooth,
                agentApplyPulseFdis,
                currentToothDiagnoses,
                currentToothNotes,
                zoneNotes,
                isImplant,
                currentToothEntries,
                currentTreatmentHistoryDetails,
                allEntries,
                highlightZones,
                multiSelectZones,
                multiSelectActive,
                hoveredToothFdi,
                selectionScopeType: selectionScope.type,
                selectionScopeId: selectionScope.id,
                selectionScopeLabel: selectionScope.label,
                selectionScopeFdis: selectionScope.fdis,
                onToggleToothDiagnosis: toggleToothDiagnosis,
                onToggleImplant: toggleImplant,
                onAddFinding: handleAddFinding,
                onRemoveFinding: handleRemoveFinding,
                onUpdateNotes: handleUpdateNotes,
                onUpdateToothNotes: updateToothNotes,
                onBackToDentition: handleBackToDentition,
                onSelectTooth: handleSelectTooth,
                onSelectScope: handleSelectScope,
                onSelectZone: handleSelectZone,
                onClearSelectedZone: handleClearSelectedZone,
                onAddEntry: handleAddEntry,
                onUpdateEntry: handleUpdateEntry,
                onRemoveEntry: handleRemoveEntry,
                onUpdateTreatmentHistoryDetail: handleUpdateTreatmentHistoryDetail,
                onRemoveTreatmentHistoryDetail: handleRemoveTreatmentHistoryDetail,
                onClearTreatmentHistoryDetails: handleClearTreatmentHistoryDetails,
                onSetHighlightZones: handleSetHighlightZones,
                onToggleZoneMultiSelect: handleToggleZoneMultiSelect,
                onSetMultiSelectZones: handleSetMultiSelectZones,
                onClearMultiSelect: handleClearMultiSelect,
                onSetMultiSelectActive: handleSetMultiSelectActive,
                onSetHoveredTooth: handleSetHoveredTooth,
                oralEntries,
                oralNotes,
                oralHighlightFdis,
                onAddOralEntry: addOralEntry,
                onRemoveOralEntry: removeOralEntry,
                onUpdateOralEntry: updateOralEntry,
                onUpdateOralNotes: updateOralNotes,
                onEnterOralExam: enterOralExam,
                onSetOralHighlight: setOralHighlight
            });
        }
    }["DentalCanvas.useEffect"], [
        viewMode,
        patientType,
        selectedTooth,
        selectedZone,
        findings,
        toothDiagnoses,
        implantTeeth,
        findingsByTooth,
        toothNotes,
        treatmentHistoryDetailsByTooth,
        agentApplyPulseFdis,
        currentToothDiagnoses,
        currentToothNotes,
        currentTreatmentHistoryDetails,
        zoneNotes,
        isImplant,
        onStateChange,
        currentToothEntries,
        allEntries,
        highlightZones,
        multiSelectZones,
        multiSelectActive,
        hoveredToothFdi,
        selectionScope,
        toggleToothDiagnosis,
        toggleImplant,
        handleAddFinding,
        handleRemoveFinding,
        handleUpdateNotes,
        updateToothNotes,
        handleBackToDentition,
        handleSelectTooth,
        handleSelectScope,
        handleSelectZone,
        handleClearSelectedZone,
        handleAddEntry,
        handleUpdateEntry,
        handleRemoveEntry,
        handleUpdateTreatmentHistoryDetail,
        handleRemoveTreatmentHistoryDetail,
        handleClearTreatmentHistoryDetails,
        handleSetHighlightZones,
        handleToggleZoneMultiSelect,
        handleSetMultiSelectZones,
        handleClearMultiSelect,
        handleSetMultiSelectActive,
        handleSetHoveredTooth,
        oralEntries,
        oralNotes,
        oralHighlightFdis,
        addOralEntry,
        removeOralEntry,
        updateOralEntry,
        updateOralNotes,
        enterOralExam,
        setOralHighlight
    ]);
    const isDentitionView = viewMode === 'dentition';
    const isOralView = viewMode === 'oral';
    const dentitionTitle = patientType === 'adult' ? 'Full Adult Dentition View' : patientType === 'pediatric' ? 'Full Pediatric Dentition View' : 'Full Mixed Dentition View';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: `dental-canvas-root ${isDentitionView ? 'dentition-mode' : ''} ${!isDentitionView ? 'has-tooth-selector' : ''} ${compact ? 'compact' : ''}`,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: "viewer",
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: "viewer-header",
                    children: isDentitionView ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: "tooth-name tooth-name--dentition",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: "tooth-name-text",
                            children: dentitionTitle
                        }, patientType)
                    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: "tooth-name",
                        style: {
                            paddingLeft: 6,
                            gap: 3,
                            cursor: 'pointer'
                        },
                        onClick: handleBackToDentition,
                        title: "Back to full dentition view",
                        role: "button",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
                                width: "14",
                                height: "14",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                style: {
                                    flexShrink: 0
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                    d: "M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08",
                                    stroke: "#1e293b",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeMiterlimit: "10",
                                    strokeWidth: "2.2"
                                })
                            }),
                            selectionScope.type === 'tooth' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][selectedTooth.quadrant],
                                    " ",
                                    selectedTooth.name,
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                        className: "tooth-fdi",
                                        children: [
                                            "T",
                                            selectedTooth.fdi
                                        ]
                                    })
                                ]
                            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    isOralView ? 'Oral Examination' : selectionScope.type === 'full-mouth' ? 'Full Mouth View' : `${selectionScope.label} View`,
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                        className: "tooth-fdi",
                                        children: selectionScope.type === 'full-mouth' ? 'FULL' : SCOPE_HEADER_BADGE[selectionScope.id] ?? selectionScope.id
                                    })
                                ]
                            })
                        ]
                    })
                }),
                isDentitionView && dentitionGroupLabels.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: Object.entries(dentitionGroupLabels.reduce((acc, g)=>{
                        (acc[g.scope] = acc[g.scope] || []).push(g.diag);
                        return acc;
                    }, {})).map(([scope, diags])=>{
                        const pos = SCOPE_TAG_POS[scope];
                        if (!pos) return null;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            style: {
                                position: 'absolute',
                                left: `${pos.left}%`,
                                top: `${pos.top}%`,
                                transform: 'translate(-50%, -50%)',
                                zIndex: 13,
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: 4,
                                maxWidth: 170,
                                pointerEvents: 'none'
                            },
                            children: diags.map((d)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    style: {
                                        fontSize: 11.5,
                                        fontWeight: 700,
                                        padding: '4px 11px',
                                        borderRadius: 999,
                                        background: 'rgba(15,23,42,0.9)',
                                        color: '#fff',
                                        fontFamily: 'Inter, sans-serif',
                                        letterSpacing: '-0.2px',
                                        boxShadow: '0 4px 14px rgba(2,6,23,0.28)',
                                        whiteSpace: 'nowrap'
                                    },
                                    children: d
                                }, d))
                        }, scope);
                    })
                }),
                isDentitionView && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeHost,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeTrack,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                type: "button",
                                onClick: ()=>handlePatientTypeChange('adult'),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtn, patientType === 'adult' && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtnActive),
                                children: "Adult"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                type: "button",
                                onClick: ()=>handlePatientTypeChange('pediatric'),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtn, patientType === 'pediatric' && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtnActive),
                                children: "Pediatric"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                type: "button",
                                onClick: ()=>handlePatientTypeChange('mixed'),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtn, patientType === 'mixed' && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtnActive),
                                children: "Mixed"
                            })
                        ]
                    })
                }),
                isDentitionView && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scopeHost,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__TPButton__as__TPButtonToken$3e$__["TPButtonToken"], {
                        variant: "tonal",
                        theme: "primary",
                        size: "md",
                        onClick: enterOralExam,
                        title: "Record region-level oral findings & procedures",
                        leftIcon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            style: {
                                fontSize: 16,
                                lineHeight: 1,
                                fontWeight: 700
                            },
                            children: "＋"
                        }),
                        children: "Oral Examination"
                    })
                }),
                isDentitionView && !hideExamineHint && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    style: {
                        position: 'absolute',
                        bottom: '86px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                        pointerEvents: 'none',
                        fontFamily: 'Inter, sans-serif'
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$LottieIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LottieIcon"], {
                            name: "arrow-up",
                            size: 24,
                            color: "#d5dde8"
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            style: {
                                fontSize: '14px',
                                color: '#b7c3d4',
                                fontWeight: 500,
                                opacity: 0.72,
                                letterSpacing: '0.2px',
                                whiteSpace: 'nowrap'
                            },
                            children: "Click any tooth to examine"
                        })
                    ]
                }),
                !isDentitionView && !isOralView && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$ToothSelector$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToothSelector"], {
                    selectedTooth: selectedTooth,
                    patientType: patientType,
                    onSelectTooth: handleSelectTooth,
                    toothDiagnoses: toothDiagnoses,
                    viewMode: viewMode,
                    onBackToDentition: handleBackToDentition,
                    onSelectScope: handleToothScopeJump,
                    selectionScope: selectionScope,
                    getScopeFdis: getScopeFdis,
                    findingsByTooth: findingsByTooth,
                    implantTeeth: implantTeeth,
                    allEntries: allEntries,
                    toothNotes: toothNotes,
                    onEnterOralExam: enterOralExam,
                    surfaceSelector: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickSurfaceSelector"], {
                        selectedZones: multiSelectActive ? multiSelectZones : selectedZone ? new Set([
                            selectedZone
                        ]) : new Set(),
                        onToggleZone: handleToggleZoneFromQuickSelector,
                        arch: selectedTooth.arch,
                        toothPosition: selectedTooth.position,
                        zonesWithFindings: new Set(findings.map((f)=>f.zoneId)),
                        disabled: currentToothDiagnoses.has('Missing') || currentToothDiagnoses.has('Extraction')
                    })
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                    camera: {
                        position: [
                            0,
                            2.5,
                            13
                        ],
                        fov: 35
                    },
                    dpr: [
                        1,
                        1.5
                    ],
                    gl: {
                        antialias: true,
                        toneMapping: 3,
                        toneMappingExposure: 1.3,
                        powerPreference: 'high-performance'
                    },
                    performance: {
                        min: 0.5
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("ambientLight", {
                            intensity: 0.8
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("directionalLight", {
                            position: [
                                3,
                                5,
                                4
                            ],
                            intensity: 1.0
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("directionalLight", {
                            position: [
                                -2,
                                3,
                                -2
                            ],
                            intensity: 0.4
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("directionalLight", {
                            position: [
                                0,
                                -2,
                                1
                            ],
                            intensity: 0.3
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CameraController, {
                            viewMode: viewMode,
                            patientType: patientType,
                            selectionScopeType: selectionScope.type,
                            selectionScopeId: selectionScope.id,
                            dentitionCameraOverride: dentitionCameraOverride,
                            dentitionVerticalNudge: dentitionVerticalNudge,
                            onDentitionVerticalNudgeChange: handleDentitionVerticalNudgeChange,
                            controlsRef: controlsRef
                        }),
                        !isDentitionView && selectionScope.type === 'tooth' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ZoneCameraRotator, {
                            zone: selectedZone,
                            toothFdi: selectedTooth.fdi,
                            quadrant: selectedTooth.quadrant,
                            arch: selectedTooth.arch,
                            controlsRef: controlsRef
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                            fallback: null,
                            children: isDentitionView ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentitionView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                patientType: patientType,
                                layoutMode: "split",
                                toothDiagnoses: toothDiagnoses,
                                findingsByTooth: findingsByTooth,
                                implantTeeth: implantTeeth,
                                onSelectTooth: handleSelectTooth,
                                onHoverTooth: setHoveredToothFdi,
                                externalHoveredFdi: hoveredToothFdi,
                                allEntries: allEntries,
                                toothNotes: toothNotes,
                                agentPulseFdis: agentApplyPulseFdis,
                                oralEntries: oralEntries,
                                oralForceShowAll: showAllOralTooltips || hoverShowAllOral
                            }, `dentition-${patientType}`) : selectionScope.type !== 'tooth' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentitionView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                patientType: patientType,
                                visibleFdis: selectionScope.fdis,
                                disableSelection: true,
                                highlightFdis: oralHighlightFdis,
                                layoutMode: selectionScope.type === 'full-mouth' ? 'natural' : 'split',
                                toothDiagnoses: toothDiagnoses,
                                findingsByTooth: findingsByTooth,
                                implantTeeth: implantTeeth,
                                onSelectTooth: handleSelectTooth,
                                onHoverTooth: setHoveredToothFdi,
                                externalHoveredFdi: hoveredToothFdi,
                                allEntries: allEntries,
                                toothNotes: toothNotes,
                                agentPulseFdis: agentApplyPulseFdis,
                                oralEntries: oralEntries,
                                oralForceShowAll: showAllOralTooltips || hoverShowAllOral
                            }, `scope-${patientType}-${selectionScope.type}-${selectionScope.id}`) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("group", {
                                position: [
                                    0,
                                    -0.17,
                                    0
                                ],
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooth"], {
                                    selectedZone: selectedZone,
                                    onSelectZone: handleSelectZone,
                                    onClearSelectedZone: handleClearSelectedZone,
                                    onHoverZone: setHoveredZone,
                                    modelPath: selectedTooth.modelPath,
                                    arch: selectedTooth.arch,
                                    mirrorX: selectedTooth.mirrorX,
                                    quadrant: selectedTooth.quadrant,
                                    toothPosition: selectedTooth.position,
                                    toothFdi: selectedTooth.fdi,
                                    isImplant: isImplant,
                                    findings: findings,
                                    zoneNotes: zoneNotes,
                                    toothDiagnoses: currentToothDiagnoses,
                                    multiSelectZones: multiSelectZones,
                                    multiSelectActive: multiSelectActive,
                                    hideTags: true,
                                    treatmentHistoryDetails: currentTreatmentHistoryDetails,
                                    toothEntries: currentToothEntries.map((e)=>({
                                            kind: e.kind,
                                            name: e.name,
                                            surfaces: e.surfaces
                                        }))
                                }, `${selectedTooth.fdi}-${isImplant ? 'imp' : 'nat'}-${[
                                    ...currentToothDiagnoses
                                ].sort().join(',')}`)
                            })
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"], {
                            ref: controlsRef,
                            onEnd: handleDentitionControlsEnd,
                            enableDamping: true,
                            dampingFactor: 0.12,
                            rotateSpeed: 0.8,
                            minDistance: isDentitionView ? 6 : selectionScope.type === 'tooth' ? 2.05 : selectionScope.type === 'quadrant' || selectionScope.type === 'arch' && (selectionScope.id === 'RIGHT_ARCH' || selectionScope.id === 'LEFT_ARCH') ? 3.5 : 5,
                            maxDistance: isDentitionView ? patientType === 'mixed' ? 28 : 22 : selectionScope.type === 'tooth' ? 10.5 : selectionScope.type === 'quadrant' || selectionScope.type === 'arch' && (selectionScope.id === 'RIGHT_ARCH' || selectionScope.id === 'LEFT_ARCH') ? 22 : 30,
                            enablePan: isDentitionView,
                            touches: {
                                ONE: 0,
                                TWO: 2
                            }
                        })
                    ]
                })
            ]
        })
    });
}
_s3(DentalCanvas, "Rl1V+rgv2R3vmlZohYfnLijo/n4=");
_c4 = DentalCanvas;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ZoneCameraRotator");
__turbopack_context__.k.register(_c1, "CameraController");
__turbopack_context__.k.register(_c2, "OralExamTag");
__turbopack_context__.k.register(_c3, "OralExamTags");
__turbopack_context__.k.register(_c4, "DentalCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/tooth-capture/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToothCapturePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// TEMPORARY tooth-capture harness. Reproduces the REAL single-tooth view by
// reusing DentalCanvas's CameraController + ZoneCameraRotator + OrbitControls,
// then POSTs a transparent PNG of each tooth's initial view to /api/save-tooth,
// named by FDI. Safe to delete afterward.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/Tooth.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/DentalCanvas.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
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
// Match the single-tooth view's CSS panel dimensions so the camera framing
// (which is width/height-aware) equals what the doctor sees.
const CSS_W = 361;
const CSS_H = 577;
function ToothCapturePage() {
    _s();
    const [idx, setIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const controlsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToothCapturePage.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].forEach({
                "ToothCapturePage.useEffect": (t)=>{
                    try {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload(t.modelPath);
                    } catch  {}
                }
            }["ToothCapturePage.useEffect"]);
        }
    }["ToothCapturePage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToothCapturePage.useEffect": ()=>{
            window.__teeth = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].map({
                "ToothCapturePage.useEffect": (t)=>t.fdi
            }["ToothCapturePage.useEffect"]);
            window.__setTooth = ({
                "ToothCapturePage.useEffect": (i)=>setIdx(i)
            })["ToothCapturePage.useEffect"];
            window.__progress = {
                i: 0,
                total: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].length,
                done: false,
                saved: [],
                phase: "idle"
            };
            const sleep = {
                "ToothCapturePage.useEffect.sleep": (ms)=>new Promise({
                        "ToothCapturePage.useEffect.sleep": (r)=>setTimeout(r, ms)
                    }["ToothCapturePage.useEffect.sleep"])
            }["ToothCapturePage.useEffect.sleep"];
            window.__runCapture = ({
                "ToothCapturePage.useEffect": async ()=>{
                    if (window.__capturing) return;
                    window.__capturing = true;
                    setStatus("warming");
                    window.__progress = {
                        i: 0,
                        total: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].length,
                        done: false,
                        saved: [],
                        phase: "warm"
                    };
                    for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].length; i++){
                        setIdx(i);
                        window.__progress.i = i;
                        await sleep(900);
                    }
                    await sleep(800);
                    setStatus("capturing");
                    window.__progress.phase = "capture";
                    for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"].length; i++){
                        setIdx(i);
                        window.__progress.i = i;
                        await sleep(2200); // allow camera framing animation + render to settle
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
                                        fdi: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"][i].fdi,
                                        dataUrl: url
                                    })
                                });
                                const j = await res.json();
                                if (j.ok) window.__progress.saved.push(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"][i].fdi);
                            } catch  {}
                        }
                    }
                    window.__progress.done = true;
                    window.__capturing = false;
                    setStatus("done");
                }
            })["ToothCapturePage.useEffect"];
        }
    }["ToothCapturePage.useEffect"], []);
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"][idx];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 20,
            fontFamily: "Inter, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    fontSize: 16
                },
                children: "Tooth capture harness (real single-tooth view)"
            }, void 0, false, {
                fileName: "[project]/app/tooth-capture/page.jsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "cap-host",
                style: {
                    width: CSS_W,
                    height: CSS_H,
                    marginTop: 16,
                    background: "transparent"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                            intensity: 0.8
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                            position: [
                                3,
                                5,
                                4
                            ],
                            intensity: 1.0
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                            position: [
                                -2,
                                3,
                                -2
                            ],
                            intensity: 0.4
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                            position: [
                                0,
                                -2,
                                1
                            ],
                            intensity: 0.3
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraController"], {
                            viewMode: "single-tooth",
                            patientType: "adult",
                            selectionScopeType: "tooth",
                            selectionScopeId: t.fdi,
                            dentitionVerticalNudge: 0,
                            onDentitionVerticalNudgeChange: ()=>{},
                            controlsRef: controlsRef
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZoneCameraRotator"], {
                            zone: null,
                            toothFdi: t.fdi,
                            quadrant: t.quadrant,
                            arch: t.arch,
                            controlsRef: controlsRef
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                            fallback: null,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                                position: [
                                    0,
                                    -0.17,
                                    0
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooth"], {
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
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/tooth-capture/page.jsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"], {
                            ref: controlsRef,
                            enableDamping: true,
                            dampingFactor: 0.12,
                            enablePan: false,
                            minDistance: 2.05,
                            maxDistance: 10.5
                        }, void 0, false, {
                            fileName: "[project]/app/tooth-capture/page.jsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/tooth-capture/page.jsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/tooth-capture/page.jsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/tooth-capture/page.jsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(ToothCapturePage, "pBx19aIoy/GV+I5L+HjP2aDhKBA=");
_c = ToothCapturePage;
var _c;
__turbopack_context__.k.register(_c, "ToothCapturePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_2f867ae3._.js.map