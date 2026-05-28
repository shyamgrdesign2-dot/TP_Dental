"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useMemo, useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { useGLTF, Html, Center } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { TEETH, PEDIATRIC_TEETH, ARCH_POSITIONS, PEDIATRIC_ARCH_POSITIONS, ZONE_INFO, getZoneLabel, QUADRANT_LABELS, isOralRegionPosition, ORAL_POSITION_LABEL } from './types';
import { cloneSceneWithUniqueMaterials, injectShader, getDentalShaderVariantKey, ImplantScrew, prewarmDentalShaderProgram, PreparedStump, RootCanals, getDirsForTooth, } from './Tooth';
const ArchTooth = memo(function ArchTooth({ tooth, archPose, toothScale = 1, diagnoses, findings, treatmentHistoryTags, showTreatmentTags = true, isImplant, isHovered, isPinned, agentPulse = false, highlightActive = false, inHighlight = false, onHover, onClick, onPin, }) {
    const { gl, camera } = useThree();
    const gltf = useGLTF(tooth.modelPath);
    const implantGltf = useGLTF('/models/implant.glb');
    const groupRef = useRef(null); // Center ref (for bounding box)
    const outerGroupRef = useRef(null); // mirrorX group (parentGroup for diagnosis visuals)
    const meshRef = useRef(null);
    const isMissing = diagnoses?.has('Missing') || diagnoses?.has('Extraction') || false;
    const isCrown = diagnoses?.has('Crown') || false;
    const isRCT = diagnoses?.has('RCT') || false;
    const isBridge = diagnoses?.has('Bridge') || false;
    const isDenture = diagnoses?.has('Denture') || false;
    // Fresh clone on every mount — mount generation forces a new clone so that
    // switching tabs (Adult→Pedia→Adult) always starts with clean materials.
    const [mountGen] = useState(() => Math.random());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const clonedScene = useMemo(() => cloneSceneWithUniqueMaterials(gltf.scene), [gltf, mountGen]);
    // Implant placement state + tooth mesh ref for procedural implant
    const [implantPlacement, setImplantPlacement] = useState(null);
    // Mesh bounds + dirs for PreparedStump and RootCanals
    const [meshBoundsData, setMeshBoundsData] = useState(null);
    const [zoneDirs, setZoneDirs] = useState(null);
    const toothMeshRefLocal = useRef(null);
    const implantBB = useRef(null);
    const shaderRefs = useRef([]);
    const shaderInjectedRef = useRef(false);
    const zoneFindingsRef = useRef([0, 0, 0, 0, 0, 0, 0]);
    // Update findings ref whenever findings change — picked up next frame
    useEffect(() => {
        const order = ['occlusal', 'buccal', 'lingual', 'mesial', 'distal', 'cervical', 'root'];
        zoneFindingsRef.current = order.map(z => findings.some(f => f.zoneId === z) ? 1 : 0);
    }, [findings]);
    // Push finding-tint uniform every frame
    useFrame(() => {
        const zf = zoneFindingsRef.current;
        for (const ref of shaderRefs.current) {
            const s = ref.shader;
            if (!s?.uniforms?.uZoneHasFinding)
                continue;
            const arr = s.uniforms.uZoneHasFinding.value;
            arr[0] = zf[0];
            arr[1] = zf[1];
            arr[2] = zf[2];
            arr[3] = zf[3];
            arr[4] = zf[4];
            arr[5] = zf[5];
            arr[6] = zf[6];
        }
    });
    // Capture first mesh from cloned scene
    useMemo(() => {
        toothMeshRefLocal.current = null;
        clonedScene.traverse((obj) => {
            const m = obj;
            if (m.isMesh && !toothMeshRefLocal.current) {
                toothMeshRefLocal.current = m;
            }
        });
    }, [clonedScene]);
    // After mount: compute bounding box and inject the SAME shader as single-tooth view
    // No guard ref — always re-inject when diagnosis flags change.
    // Uses requestAnimationFrame to wait for <Center> layout.
    useLayoutEffect(() => {
        shaderInjectedRef.current = false;
        shaderRefs.current = [];
        let cancelled = false;
        let rafOuter = 0;
        let rafInner = 0;
        const applyToCurrentScene = () => {
            if (cancelled)
                return false;
            if (shaderInjectedRef.current)
                return true;
            if (!groupRef.current)
                return false;
            // Walk UP the ancestor chain first so groupRef.matrixWorld reflects
            // the dentition parent-group offset (position: [-contentCenter, ...])
            // and the arch-pose outer group. On first mount inside a useLayoutEffect
            // the parent matrices are still identity (no frame has rendered yet),
            // so updateMatrixWorld(true) alone yields a LOCAL-space bbox which makes
            // uCejY/uCervicalY wildly wrong and the crown-root gradient saturates
            // into the root tint across every tooth.
            groupRef.current.updateWorldMatrix(true, true);
            const bb = new THREE.Box3().setFromObject(groupRef.current);
            const sizeProbe = new THREE.Vector3();
            bb.getSize(sizeProbe);
            if (sizeProbe.lengthSq() < 1e-8)
                return false;
            const center = new THREE.Vector3();
            const size = new THREE.Vector3();
            bb.getCenter(center);
            bb.getSize(size);
            let cervicalY, cejY, crownBottomY;
            if (tooth.arch === 'maxillary') {
                cervicalY = bb.min.y + size.y * 0.42;
                cejY = bb.min.y + size.y * 0.50;
                crownBottomY = bb.min.y;
            }
            else {
                cervicalY = bb.max.y - size.y * 0.42;
                cejY = bb.max.y - size.y * 0.50;
                crownBottomY = bb.max.y;
            }
            const quadNum = parseInt(tooth.fdi[0]);
            const zoneYawRad = (quadNum === 1 || quadNum === 4)
                ? -Math.PI * (tooth.position - 1) / 14
                : Math.PI * (tooth.position - 1) / 14;
            // Collect materials and inject the same shader as single-tooth view.
            const materials = [];
            clonedScene.traverse((obj) => {
                const m = obj;
                if (m.isMesh && m.material) {
                    if (Array.isArray(m.material))
                        materials.push(...m.material);
                    else
                        materials.push(m.material);
                }
            });
            if (materials.length === 0)
                return false;
            shaderRefs.current = [];
            for (const mat of materials) {
                shaderRefs.current.push(injectShader(mat, cervicalY, cejY, crownBottomY, center.x, center.z, tooth.arch, tooth.quadrant, zoneYawRad, tooth.fdi, isImplant, isMissing, isCrown, isRCT, isBridge, isDenture));
                mat.needsUpdate = true;
            }
            prewarmDentalShaderProgram({
                gl,
                camera,
                source: clonedScene,
                variantKey: getDentalShaderVariantKey({
                    isImplant,
                    isMissing,
                    isCrown,
                    isRCT,
                    isBridge,
                    isDenture,
                }),
            });
            shaderInjectedRef.current = true;
            // Compute implant placement + store bb
            implantBB.current = bb;
            if (isImplant) {
                const cervicalDiam = Math.max(size.x, size.z) * 0.75;
                setImplantPlacement({ cervicalY, centerX: center.x, centerZ: center.z, cervicalDiam });
            }
            else {
                setImplantPlacement(null);
            }
            // Compute mesh bounds in outerGroupRef local space for Crown/RCT visuals
            // This ensures PreparedStump + RootCanals render correctly regardless of arch position
            if (outerGroupRef.current) {
                outerGroupRef.current.updateMatrixWorld(true);
                const outerInv = new THREE.Matrix4().copy(outerGroupRef.current.matrixWorld).invert();
                const localCenter = center.clone().applyMatrix4(outerInv);
                const localBBmin = bb.min.clone().applyMatrix4(outerInv);
                const localBBmax = bb.max.clone().applyMatrix4(outerInv);
                const localBB = new THREE.Box3(new THREE.Vector3(Math.min(localBBmin.x, localBBmax.x), Math.min(localBBmin.y, localBBmax.y), Math.min(localBBmin.z, localBBmax.z)), new THREE.Vector3(Math.max(localBBmin.x, localBBmax.x), Math.max(localBBmin.y, localBBmax.y), Math.max(localBBmin.z, localBBmax.z)));
                const localSize = new THREE.Vector3();
                localBB.getSize(localSize);
                const localCervPt = new THREE.Vector3(center.x, cervicalY, center.z).applyMatrix4(outerInv);
                setMeshBoundsData({
                    center: localCenter,
                    size: localSize,
                    cervicalY: localCervPt.y,
                    bb: localBB,
                });
                // Compute direction vectors in outerGroupRef local space
                const dirs = getDirsForTooth(tooth.fdi, tooth.quadrant, zoneYawRad);
                // Transform direction vectors to local space (rotation only, no translation)
                const normalMatrix = new THREE.Matrix3().getNormalMatrix(outerInv);
                const transformDir = (d) => d.clone().applyMatrix3(normalMatrix).normalize();
                setZoneDirs({
                    buccal: transformDir(dirs.buccal),
                    lingual: transformDir(dirs.lingual),
                    mesial: transformDir(dirs.mesial),
                    distal: transformDir(dirs.distal),
                });
            }
            return true;
        };
        const runWithRetries = () => {
            if (applyToCurrentScene())
                return;
            let raf = 0;
            let tries = 0;
            const maxTries = 120;
            const tick = () => {
                if (cancelled)
                    return;
                if (applyToCurrentScene())
                    return;
                tries += 1;
                if (tries < maxTries)
                    raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            return () => cancelAnimationFrame(raf);
        };
        const cancelRetry = runWithRetries();
        const lateRetry = window.setTimeout(() => {
            if (!shaderInjectedRef.current && !cancelled) {
                // One extra pass after layout stabilizes (tab/type transitions).
                applyToCurrentScene();
            }
        }, 1200);
        // Match Tooth.tsx timing model: defer to post-layout via double RAF.
        rafOuter = requestAnimationFrame(() => {
            rafInner = requestAnimationFrame(() => {
                if (!shaderInjectedRef.current && !cancelled) {
                    applyToCurrentScene();
                }
            });
        });
        return () => {
            cancelled = true;
            cancelRetry?.();
            cancelAnimationFrame(rafOuter);
            cancelAnimationFrame(rafInner);
            window.clearTimeout(lateRetry);
        };
    }, [clonedScene, tooth, isImplant, isMissing, isCrown, isRCT, isBridge, isDenture, gl, camera]);
    // Hover glow + oral-region highlight/dim on state change (avoid per-frame
    // traversals across all teeth). Region highlight: teeth in the active oral
    // region glow teal; teeth outside it fade so the region stands out.
    useEffect(() => {
        if (!meshRef.current)
            return;
        const dim = highlightActive && !inHighlight;
        meshRef.current.traverse((obj) => {
            const m = obj;
            if (m.isMesh && m.material && !Array.isArray(m.material)) {
                const mat = m.material;
                if (mat.metalness > 0.5)
                    return;
                if (isHovered) {
                    mat.emissiveIntensity = 0.32;
                    mat.emissive.set('#4a9eff');
                }
                else if (highlightActive && inHighlight) {
                    mat.emissiveIntensity = 0.38;
                    mat.emissive.set('#14b8a6');
                }
                else {
                    mat.emissiveIntensity = 0;
                    mat.emissive.set('#000000');
                }
                mat.transparent = true;
                mat.opacity = dim ? 0.22 : 1;
            }
        });
    }, [isHovered, highlightActive, inHighlight]);
    /** Two clear wobble cycles (~1s) when AI applies scan — strong enough to notice, then stops. */
    const pulseStartRef = useRef(null);
    const hadPulseRef = useRef(false);
    useFrame((state) => {
        if (!meshRef.current)
            return;
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
        /** Gentle envelope — subtle second beat, no harsh “rubber” bounce */
        const envelope = Math.pow(1 - t, 1.35);
        /** Two full sine cycles across [0, 1] → sin(4πt); amplitude kept low for polish */
        const wobble = envelope * 0.034 * Math.sin(t * Math.PI * 4);
        meshRef.current.scale.setScalar(base * (1 + wobble));
    });
    if (!archPose)
        return null;
    const handlePointerEnter = useCallback((e) => {
        e.stopPropagation();
        onHover(tooth.fdi);
        document.body.style.cursor = 'pointer';
    }, [tooth.fdi, onHover]);
    const handlePointerLeave = useCallback((e) => {
        e.stopPropagation();
        onHover(null);
        document.body.style.cursor = 'default';
    }, [onHover]);
    const handleClick = useCallback((e) => {
        e.stopPropagation();
        // On touch: first tap pins the tooltip, second tap navigates.
        // On mouse: click navigates immediately (hover already shows tooltip).
        const isTouch = e.pointerType === 'touch' || e.nativeEvent?.pointerType === 'touch';
        if (isTouch) {
            if (isPinned) {
                onPin(null);
                onClick(tooth);
            }
            else {
                onPin(tooth.fdi);
            }
        }
        else {
            onClick(tooth);
        }
    }, [tooth, onClick, onPin, isPinned]);
    // Diagnosis labels for pill (only tooth-level primary diagnoses)
    const occlusalOffsetY = tooth.arch === 'maxillary' ? -0.75 : 0.75;
    return (_jsxs("group", { ref: meshRef, position: archPose.position, rotation: archPose.rotation, children: [_jsxs("group", { ref: outerGroupRef, scale: tooth.mirrorX ? [-1, 1, 1] : [1, 1, 1], children: [_jsx(Center, { ref: groupRef, children: _jsx("primitive", { object: clonedScene, onPointerEnter: handlePointerEnter, onPointerLeave: handlePointerLeave, onClick: handleClick }) }), isCrown && meshBoundsData && toothMeshRefLocal.current && (_jsx(PreparedStump, { toothMesh: toothMeshRefLocal.current, meshBounds: meshBoundsData, arch: tooth.arch, parentGroup: outerGroupRef.current })), isRCT && meshBoundsData && zoneDirs && (_jsx(RootCanals, { meshBounds: meshBoundsData, arch: tooth.arch, toothPosition: tooth.position, dirs: zoneDirs, toothFdi: tooth.fdi })), isImplant && implantPlacement && (_jsx(ImplantScrew, { placement: implantPlacement, arch: tooth.arch, implantScene: implantGltf.scene, toothMesh: toothMeshRefLocal.current, bb: implantBB.current, parentGroup: outerGroupRef.current }))] }), treatmentHistoryTags.length > 0 && showTreatmentTags && (_jsx(Html, { position: [0, occlusalOffsetY, 0], center: true, style: { pointerEvents: 'none', whiteSpace: 'nowrap' }, zIndexRange: (isHovered || isPinned) ? [80, 40] : [30, 0], children: _jsx("div", { style: {
                        display: 'flex', alignItems: 'center', gap: '3px',
                    }, children: treatmentHistoryTags.map(d => (_jsx("span", { style: {
                            fontSize: '11px', fontWeight: 600, padding: '2px 7px',
                            borderRadius: '4px', fontFamily: 'Inter, sans-serif',
                            background: 'rgba(107, 114, 128, 0.78)', color: '#fff', lineHeight: '1.3',
                            backdropFilter: 'blur(3px)', letterSpacing: '0.01em',
                        }, children: d }, d))) }) }))] }));
});
// Scope detection for tag consolidation: when a diagnosis covers exactly a
// recognizable zone (whole Mandibular, a quadrant, etc.), the dentition shows
// it ONCE — a single "RCT · Mandibular" tag on a front-centre representative
// tooth — instead of repeating it on every tooth in the zone.
const SCOPE_QUAD_DEFS = [
    ['Mandibular', ['lower-left', 'lower-right']],
    ['Maxillary', ['upper-right', 'upper-left']],
    ['Right arch', ['upper-right', 'lower-right']],
    ['Left arch', ['upper-left', 'lower-left']],
    ['Upper Right', ['upper-right']],
    ['Upper Left', ['upper-left']],
    ['Lower Left', ['lower-left']],
    ['Lower Right', ['lower-right']],
];
function detectScopeForDiag(fdis, teethList) {
    const byQ = { 'upper-right': [], 'upper-left': [], 'lower-left': [], 'lower-right': [] };
    teethList.forEach((t) => { if (byQ[t.quadrant]) byQ[t.quadrant].push(t.fdi); });
    const set = new Set(fdis);
    const eq = (arr) => arr.length > 1 && arr.length === set.size && arr.every((f) => set.has(f));
    const all = [...byQ['upper-right'], ...byQ['upper-left'], ...byQ['lower-left'], ...byQ['lower-right']];
    if (eq(all)) return 'Full mouth';
    for (const [label, quads] of SCOPE_QUAD_DEFS) {
        if (eq(quads.flatMap((q) => byQ[q]))) return label;
    }
    return null;
}
export default function DentitionView({ patientType, visibleFdis, disableSelection = false, layoutMode = 'split', showGuides = false, showScopeHotspots = false, onSelectScope, toothDiagnoses, findingsByTooth, implantTeeth, onSelectTooth, onHoverTooth, externalHoveredFdi, allEntries, toothNotes, agentPulseFdis, showTreatmentTags = true, highlightFdis, oralEntries = [], oralForceShowAll = false, treatmentHistoryDetailsByTooth = {}, }) {
    const USE_SPLIT_QUADRANT_EXPERIMENT = layoutMode === 'split';
    const [hoveredTooth, setHoveredToothInternal] = useState(null);
    // Wrap setter to also notify parent.
    const setHoveredTooth = useCallback((v) => {
        setHoveredToothInternal(v);
        onHoverTooth?.(v);
    }, [onHoverTooth]);
    // Merge externally-driven hover (e.g. from summary card hover).
    const effectiveHovered = externalHoveredFdi ?? hoveredTooth;
    const [pinnedTooth, setPinnedTooth] = useState(null);
    // Hovering an oral-exam tag highlights that region's teeth (quadrant / arch /
    // full mouth) the same way the table-row hover does.
    const [hoverOralFdis, setHoverOralFdis] = useState(null);
    // Clear pinned tooltip on background tap / ESC
    useEffect(() => {
        const onDoc = (e) => {
            // If click lands on the canvas but NOT on a tooth (no stopPropagation), clear pin.
            // We rely on the tooth's onClick having already fired and set pinnedTooth.
            // This timeout defers so the tooth's handler runs first.
            setTimeout(() => {
                const target = e.target;
                if (!target.closest('canvas'))
                    setPinnedTooth(null);
            }, 0);
        };
        const onKey = (e) => { if (e.key === 'Escape')
            setPinnedTooth(null); };
        window.addEventListener('keydown', onKey);
        window.addEventListener('click', onDoc);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('click', onDoc);
        };
    }, []);
    const activeFdi = effectiveHovered || pinnedTooth;
    const isPediatricOnly = patientType === 'pediatric';
    const isMixed = patientType === 'mixed';
    const activeTeeth = isMixed ? [...TEETH, ...PEDIATRIC_TEETH] : (isPediatricOnly ? PEDIATRIC_TEETH : TEETH);
    const activePositions = useMemo(() => {
        if (isMixed) {
            const mixed = {};
            // Adult arches stay top/bottom. Pediatric arches sit in-between.
            const adultUpperYOffset = 2.25;
            const adultLowerYOffset = -1.9;
            const pedUpperYOffset = 0.2;
            const pedLowerYOffset = -0.15;
            for (const tooth of TEETH) {
                const base = ARCH_POSITIONS[tooth.fdi];
                if (!base)
                    continue;
                const yShift = tooth.arch === 'maxillary' ? adultUpperYOffset : adultLowerYOffset;
                const xShift = USE_SPLIT_QUADRANT_EXPERIMENT
                    ? (tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left' ? 0.35 : -0.35)
                    : 0;
                mixed[tooth.fdi] = {
                    position: [base.position[0] + xShift, base.position[1] + yShift, base.position[2]],
                    rotation: base.rotation,
                };
            }
            for (const tooth of PEDIATRIC_TEETH) {
                const base = PEDIATRIC_ARCH_POSITIONS[tooth.fdi];
                if (!base)
                    continue;
                const yShift = tooth.arch === 'maxillary' ? pedUpperYOffset : pedLowerYOffset;
                const xShift = USE_SPLIT_QUADRANT_EXPERIMENT
                    ? (tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left' ? 0.35 : -0.35)
                    : 0;
                mixed[tooth.fdi] = {
                    position: [base.position[0] + xShift, base.position[1] + yShift, base.position[2]],
                    rotation: base.rotation,
                };
            }
            return mixed;
        }
        const baseline = isPediatricOnly ? PEDIATRIC_ARCH_POSITIONS : ARCH_POSITIONS;
        if (!USE_SPLIT_QUADRANT_EXPERIMENT)
            return baseline;
        const split = {};
        for (const tooth of activeTeeth) {
            const base = baseline[tooth.fdi];
            if (!base)
                continue;
            const isUpper = tooth.arch === 'maxillary';
            const isLeft = tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left';
            split[tooth.fdi] = {
                position: [
                    base.position[0] + (isLeft ? 0.5 : -0.5),
                    base.position[1] + (isUpper ? 0.42 : -0.42),
                    base.position[2],
                ],
                rotation: base.rotation,
            };
        }
        return split;
    }, [USE_SPLIT_QUADRANT_EXPERIMENT, activeTeeth, isMixed, isPediatricOnly]);
    const sceneScale = isPediatricOnly ? [0.85, 0.85, 0.85] : [1, 1, 1];
    const visibleTeeth = useMemo(() => activeTeeth.filter((tooth) => !visibleFdis || visibleFdis.includes(tooth.fdi)), [activeTeeth, visibleFdis]);
    // Consolidate scope-wide diagnoses into a single representative tag.
    const groupTags = useMemo(() => {
        const diagToFdis = {};
        Object.entries(toothDiagnoses || {}).forEach(([fdi, set]) => {
            const arr = set instanceof Set ? [...set] : (set || []);
            arr.forEach((d) => { (diagToFdis[d] = diagToFdis[d] || []).push(fdi); });
        });
        if (implantTeeth) (implantTeeth instanceof Set ? [...implantTeeth] : implantTeeth).forEach((f) => { (diagToFdis['Implant'] = diagToFdis['Implant'] || []).push(f); });
        const suppressed = new Set();
        const repLabels = {};
        Object.entries(diagToFdis).forEach(([diag, fdis]) => {
            const uniq = [...new Set(fdis)];
            if (uniq.length < 2) return;
            const scope = detectScopeForDiag(uniq, activeTeeth);
            if (!scope) return;
            const rep = ['41', '31', '11', '21'].find((f) => uniq.includes(f)) ?? uniq.slice().sort()[Math.floor(uniq.length / 2)];
            uniq.forEach((f) => suppressed.add(`${f}:${diag}`));
            (repLabels[rep] = repLabels[rep] || []).push(`${diag} · ${scope}`);
        });
        return { suppressed, repLabels };
    }, [toothDiagnoses, implantTeeth, activeTeeth]);
    const contentCenter = useMemo(() => {
        if (visibleTeeth.length === 0)
            return [0, 0, 0];
        const sum = visibleTeeth.reduce((acc, tooth) => {
            const pose = activePositions[tooth.fdi];
            if (!pose)
                return acc;
            return [acc[0] + pose.position[0], acc[1] + pose.position[1], acc[2] + pose.position[2]];
        }, [0, 0, 0]);
        return [sum[0] / visibleTeeth.length, sum[1] / visibleTeeth.length, sum[2] / visibleTeeth.length];
    }, [activePositions, visibleTeeth]);
    // Oral-exam region tags anchored in 3D (so they rotate/zoom with the model).
    // Each region group's tag sits at the centroid of that region's teeth.
    // Per-group anchor offsets — small in-bounds nudges so tags land ON or
    // BETWEEN the affected teeth (within the dentition frame), never drifting
    // outside the visible canvas. FULL/WHOLE/GENERALIZED sit at canvas centre;
    // arches/quadrants are gently biased toward their region's centroid.
    const GROUP_TAG_OFFSET = {
        FULL: [0, 0, 0], WHOLE: [0, 0, 0], GENERALIZED: [0, 0, 0],
        UPPER_ARCH: [0, 0.6, 0], LOWER_ARCH: [0, -0.6, 0],
        RIGHT_ARCH: [-0.6, 0, 0], LEFT_ARCH: [0.6, 0, 0],
        UR: [-0.8, 0.6, 0], UL: [0.8, 0.6, 0], LR: [-0.8, -0.6, 0], LL: [0.8, -0.6, 0],
    };
    // Tooltip placement side per region — each tooltip radiates AWAY from the
    // pill (and away from canvas centre) so multiple visible tooltips never
    // cover other pills/tooltips when the doctor hovers the records card.
    const GROUP_TIP_SIDE = {
        FULL: 'below', WHOLE: 'below', GENERALIZED: 'below',
        UPPER_ARCH: 'above', LOWER_ARCH: 'below',
        RIGHT_ARCH: 'left', LEFT_ARCH: 'right',
        UR: 'above', UL: 'above',
        LR: 'below', LL: 'below',
    };
    const oralTagGroups = useMemo(() => {
        if (!oralEntries || oralEntries.length === 0) return [];
        const groups = {};
        oralEntries.forEach((e) => {
            const regionPos = (e.surfaces || []).find((p) => isOralRegionPosition(p) && !['WHOLE', 'GENERALIZED', 'FULL'].includes(p));
            const key = regionPos || 'FULL';
            (groups[key] = groups[key] || []).push(e);
        });
        const quadOf = { UR: 'upper-right', UL: 'upper-left', LR: 'lower-right', LL: 'lower-left' };
        const archOf = {
            RIGHT_ARCH: ['upper-right', 'lower-right'], LEFT_ARCH: ['upper-left', 'lower-left'],
            UPPER_ARCH: ['upper-right', 'upper-left'], LOWER_ARCH: ['lower-right', 'lower-left'],
        };
        const fdisFor = (key) => {
            if (quadOf[key]) return visibleTeeth.filter((t) => t.quadrant === quadOf[key]).map((t) => t.fdi);
            if (archOf[key]) return visibleTeeth.filter((t) => archOf[key].includes(t.quadrant)).map((t) => t.fdi);
            return visibleTeeth.map((t) => t.fdi); // FULL / whole-mouth
        };
        return Object.entries(groups).map(([key, list]) => {
            const fdis = fdisFor(key).filter((f) => activePositions[f]);
            if (fdis.length === 0) return null;
            const sum = fdis.reduce((a, f) => {
                const p = activePositions[f].position;
                return [a[0] + p[0], a[1] + p[1], a[2] + p[2]];
            }, [0, 0, 0]);
            const off = GROUP_TAG_OFFSET[key] || [0, 0, 0];
            return { key, list, fdis, label: ORAL_POSITION_LABEL[key] || key, position: [sum[0] / fdis.length + off[0], sum[1] / fdis.length + off[1], sum[2] / fdis.length + 0.6 + off[2]] };
        }).filter(Boolean);
    }, [oralEntries, visibleTeeth, activePositions]);
    // Hover broadcast from the right-side OralRecordsList — three levels:
    //   { all: true }      → force-show every tag's tooltip
    //   { kind }           → show tooltips of that kind (Past/Findings/Procedures)
    //   { kind, name }     → show JUST that one entry's tooltip
    //   null               → hide everything
    const [oralFilter, setOralFilter] = useState(null);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const onFilter = (ev) => { setOralFilter(ev?.detail ?? null); };
        window.addEventListener('oral-tags-filter', onFilter);
        return () => window.removeEventListener('oral-tags-filter', onFilter);
    }, []);
    // Keep the dentition stack slightly lower so it aligns with the split drag-handle midpoint.
    // Shift the arch group upward so lower teeth don't overlap the scope bar
    // that sits at the bottom of the canvas (absolute bottom: 16px).
    const frameVerticalOffset = -0.85;
    const activeTooth = activeFdi ? activeTeeth.find(t => t.fdi === activeFdi) : null;
    const guideSegments = useMemo(() => {
        if (!showGuides)
            return null;
        if (isMixed) {
            // Vertical center + separators between the 4 mixed rows.
            return new Float32Array([
                0, 3.2, -2.6, 0, -3.2, -2.6,
                -5.2, 1.15, -2.6, 5.2, 1.15, -2.6,
                -5.2, -0.4, -2.6, 5.2, -0.4, -2.6,
                -5.2, -2.05, -2.6, 5.2, -2.05, -2.6,
            ]);
        }
        return new Float32Array([
            0, 2.3, -2.6, 0, -2.3, -2.6,
            -5.2, 0, -2.6, 5.2, 0, -2.6,
        ]);
    }, [showGuides, isMixed]);
    return (_jsxs("group", { scale: sceneScale, position: [-contentCenter[0], -contentCenter[1] + frameVerticalOffset, -contentCenter[2]], children: [guideSegments && (_jsxs("lineSegments", { renderOrder: 1, children: [_jsx("bufferGeometry", { children: _jsx("bufferAttribute", { attach: "attributes-position", args: [guideSegments, 3] }) }), _jsx("lineBasicMaterial", { color: "#94a3b8", transparent: true, opacity: 0.35 })] })), visibleTeeth.map((tooth) => {
                const isPrimaryTooth = ['5', '6', '7', '8'].includes(tooth.fdi[0]);
                const findings = findingsByTooth[tooth.fdi] || [];
                // Grouped (scope-wide) diagnoses are suppressed here — they're shown
                // once as a banner at the top of the dentition, not on each tooth.
                const treatmentHistoryTags = Array.from(new Set([
                    ...(toothDiagnoses[tooth.fdi] ? Array.from(toothDiagnoses[tooth.fdi]) : []),
                    ...(implantTeeth.has(tooth.fdi) ? ['Implant'] : []),
                    ...Object.keys(treatmentHistoryDetailsByTooth[tooth.fdi] || {}),
                ])).filter((d) => !groupTags.suppressed.has(`${tooth.fdi}:${d}`));
                return (_jsx(ArchTooth, { tooth: tooth, archPose: activePositions[tooth.fdi], toothScale: isMixed && isPrimaryTooth ? 0.85 : 1, diagnoses: toothDiagnoses[tooth.fdi], findings: findings, treatmentHistoryTags: treatmentHistoryTags, showTreatmentTags: showTreatmentTags, isImplant: implantTeeth.has(tooth.fdi), isHovered: effectiveHovered === tooth.fdi, isPinned: pinnedTooth === tooth.fdi, agentPulse: Boolean(agentPulseFdis?.has?.(tooth.fdi)), highlightActive: Boolean((hoverOralFdis || highlightFdis) && (hoverOralFdis || highlightFdis).size > 0), inHighlight: Boolean((hoverOralFdis || highlightFdis) && (hoverOralFdis || highlightFdis).has(tooth.fdi)), onHover: setHoveredTooth, onClick: disableSelection ? () => { } : onSelectTooth, onPin: setPinnedTooth }, `${patientType}-${layoutMode}-${tooth.fdi}-${[...(toothDiagnoses[tooth.fdi] || [])].join(',')}-${implantTeeth.has(tooth.fdi)}`));
            }), showScopeHotspots && onSelectScope && (_jsxs(_Fragment, { children: [_jsx(ScopeHotspot, { label: "UR", position: [-3.2, 1.2, -2.8], onClick: () => onSelectScope('UR') }), _jsx(ScopeHotspot, { label: "UL", position: [3.2, 1.2, -2.8], onClick: () => onSelectScope('UL') }), _jsx(ScopeHotspot, { label: "LR", position: [-3.2, -1.2, -2.8], onClick: () => onSelectScope('LR') }), _jsx(ScopeHotspot, { label: "LL", position: [3.2, -1.2, -2.8], onClick: () => onSelectScope('LL') }), _jsx(ScopeHotspot, { label: "Full", position: [0, 0, -3.2], onClick: () => onSelectScope('FULL'), emphasized: true })] })), activeTooth && (_jsx(DentitionTooltip, { tooth: activeTooth, archPose: activePositions[activeTooth.fdi], findings: findingsByTooth[activeTooth.fdi] || [], diagnoses: toothDiagnoses[activeTooth.fdi], isImplant: implantTeeth.has(activeTooth.fdi), allEntries: allEntries, toothNotes: toothNotes, treatmentHistoryDetails: treatmentHistoryDetailsByTooth[activeTooth.fdi] })), oralTagGroups.map((g) => {
                // Apply the unified `oralFilter` from the records card:
                //   { all: true }    → keep all entries, force-show tooltip
                //   { kind }         → keep entries of that kind only
                //   { kind, name }   → keep just that one entry
                //   null             → no filter, no force
                let list = g.list;
                let hideTag = false;
                let forceFiltered = false;
                if (oralFilter) {
                    if (oralFilter.all) {
                        forceFiltered = true;
                    } else if (oralFilter.kind) {
                        list = g.list.filter((e) => e.kind === oralFilter.kind && (!oralFilter.name || e.name === oralFilter.name));
                        if (list.length === 0) hideTag = true;
                        else forceFiltered = true;
                    }
                }
                return _jsx(OralRegionTag3D, { position: g.position, list: list, label: g.label, hideTag: hideTag, tooltipSide: GROUP_TIP_SIDE[g.key] || 'below', forceShowAll: forceFiltered || oralForceShowAll, onHover: (on) => setHoverOralFdis(on ? new Set(g.fdis) : null) }, g.key);
            })] }));
}
// OralRegionTag3D — oral-exam tag anchored in 3D (drei Html) so it tracks the
// camera like the per-tooth treatment tags. Soft transparent violet pill; hover
// (or forceShowAll from the records-card hover) reveals the entry tooltip.
// Per-side tooltip placement: lets each region's tooltip radiate AWAY from the
// pill (above/below/left/right) so multiple visible tags never overlap each
// other when the user hovers the records card.
const TIP_PLACEMENTS = {
    below: {
        tip: { top: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)' },
        leader: { bottom: '100%', left: '50%', width: 0, height: 14, borderLeft: '1px dashed rgba(148,163,184,0.5)', transform: 'translateX(-50%)' },
    },
    above: {
        tip: { bottom: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)' },
        leader: { top: '100%', left: '50%', width: 0, height: 14, borderLeft: '1px dashed rgba(148,163,184,0.5)', transform: 'translateX(-50%)' },
    },
    right: {
        tip: { left: 'calc(100% + 14px)', top: '50%', transform: 'translateY(-50%)' },
        leader: { right: '100%', top: '50%', height: 0, width: 14, borderTop: '1px dashed rgba(148,163,184,0.5)', transform: 'translateY(-50%)' },
    },
    left: {
        tip: { right: 'calc(100% + 14px)', top: '50%', transform: 'translateY(-50%)' },
        leader: { left: '100%', top: '50%', height: 0, width: 14, borderTop: '1px dashed rgba(148,163,184,0.5)', transform: 'translateY(-50%)' },
    },
};
function OralRegionTag3D({ position, list, label, forceShowAll = false, onHover, hideTag = false, tooltipSide = 'below' }) {
    const [hover, setHover] = useState(false);
    // Early-out before any list[0] access — when the parent filtered the list
    // empty (per-chip hover with no match) we render nothing.
    if (hideTag || !list || list.length === 0) return null;
    const showTip = hover || forceShowAll;
    const firstName = list[0]?.name ?? "";
    const tagLabel = list.length > 1 ? `${firstName} +${list.length - 1}` : firstName;
    const siteOf = (e) => ((e.surfaces || []).map((p) => ORAL_POSITION_LABEL[p] || p).join(', ') || 'Whole mouth');
    const metaOf = (e) => [siteOf(e), (e.since || '').trim() ? `since ${e.since.trim()}` : '', (e.note || '').trim()].filter(Boolean).join(' | ');
    const setHov = (v) => { setHover(v); onHover?.(v); };
    // Group the region's entries into the same boxed sections as the tooth tooltip.
    const groups = { past: [], findings: [], procedures: [] };
    list.forEach((e) => { if (e.kind === 'past') groups.past.push(e); else if (e.kind === 'procedure') groups.procedures.push(e); else groups.findings.push(e); });
    const secHeadStyle = { fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#cbd5e1', marginBottom: '4px', fontWeight: 600 };
    const secBox = (title, items) => items.length ? (_jsxs("div", { style: { background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '7px 9px' }, children: [_jsx("div", { style: secHeadStyle, children: title }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 3 }, children: items.map((e) => (_jsxs("div", { style: { fontSize: 11, lineHeight: 1.35 }, children: [_jsx("span", { style: { fontWeight: 700 }, children: e.name }), (() => { const m = metaOf(e); return m ? _jsxs("span", { style: { color: '#cbd5e1', fontWeight: 400 }, children: [" (", m, ")"] }) : null; })()] }, e.id))) })] })) : null;
    // Same dark-slate transparent pill as the per-tooth treatment tags — no
    // colour differentiation between dental and oral tags, one consistent
    // canvas palette.
    return (_jsx(Html, { position: position, center: true, zIndexRange: showTip ? [500, 300] : [40, 10], style: { pointerEvents: 'auto', whiteSpace: 'nowrap' }, children: _jsxs("div", { onMouseEnter: () => setHov(true), onMouseLeave: () => setHov(false), style: { position: 'relative', display: 'inline-block' }, children: [
        _jsx("div", { style: { display: 'inline-flex', alignItems: 'center', padding: '2px 7px', borderRadius: 4, background: 'rgba(107,114,128,0.78)', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.01em', whiteSpace: 'nowrap', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', lineHeight: 1.3, cursor: 'default' }, children: tagLabel }),
        showTip && (() => { const placement = TIP_PLACEMENTS[tooltipSide] || TIP_PLACEMENTS.below; return (_jsxs("div", { style: { position: 'absolute', ...placement.tip, minWidth: 200, maxWidth: 280, background: 'rgba(0,0,0,0.82)', color: '#fff', borderRadius: 8, borderLeft: '3px solid rgba(255,255,255,0.35)', padding: '10px 13px', boxShadow: '0 4px 18px rgba(0,0,0,0.45)', fontFamily: "'Inter', sans-serif", whiteSpace: 'normal', pointerEvents: 'none', textAlign: 'left' }, children: [
            // dotted leader line on the appropriate side, pointing back to the tag
            _jsx("div", { style: { position: 'absolute', ...placement.leader } }),
            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 7, paddingBottom: 8, marginBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.1)' }, children: [
                _jsx("span", { style: { color: '#fff', background: 'rgba(255,255,255,0.16)', borderRadius: 4, padding: '1px 6px', fontSize: 10, fontWeight: 700, flexShrink: 0 }, children: "Oral" }),
                _jsx("span", { style: { fontWeight: 700, fontSize: 12, color: '#f1f5f9' }, children: label || 'Oral Examination' }),
            ] }),
            _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [secBox('Past Procedures', groups.past), secBox('Findings', groups.findings), secBox('Procedures', groups.procedures)] }),
        ] })); })(),
    ] }) }));
}
function ScopeHotspot({ label, position, onClick, emphasized = false, }) {
    return (_jsx(Html, { position: position, transform: true, occlude: true, zIndexRange: [220, 80], children: _jsx("button", { type: "button", onClick: onClick, style: {
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
                transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
            }, onMouseEnter: (e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.background = emphasized ? 'rgba(15, 23, 42, 0.88)' : 'rgba(30, 41, 59, 0.78)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(2, 6, 23, 0.3)';
            }, onMouseLeave: (e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = emphasized ? 'rgba(30, 41, 59, 0.78)' : 'rgba(15, 23, 42, 0.66)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(2, 6, 23, 0.22)';
            }, children: label }) }));
}
// ══════════════════════════════════════════════════════════════
// DentitionTooltip — camera-relative tooltip that stays fixed on
// screen regardless of tooth rotation. Only the leader line updates.
// ══════════════════════════════════════════════════════════════
function DentitionTooltip({ tooth, archPose, findings, diagnoses, isImplant, allEntries, toothNotes, treatmentHistoryDetails = {}, }) {
    const tooltipRef = useRef(null);
    const connectorRef = useRef(null);
    const { camera, gl, size } = useThree();
    const violetAccent = {
        stroke: '#8B5CF6',
        badgeBg: '#8B5CF6',
        badgeText: '#ffffff',
    };
    // With the narrow side panel and wider 3D canvas, horizontal space on either
    // side of the arch is limited. Place tooltip ABOVE maxillary teeth and BELOW
    // mandibular teeth so it always lands in the whitespace outside the arch —
    // never behind a tooth.
    const isMax = tooth.arch === 'maxillary';
    // Anchor near the outer edge of the tooth rather than its center, then keep
    // a consistent visual gap in screen-space via dynamic transform.
    const tooltipAnchorWorld = useMemo(() => {
        if (!archPose)
            return new THREE.Vector3();
        return new THREE.Vector3(archPose.position[0], archPose.position[1] + (isMax ? 0.72 : -0.72), archPose.position[2]);
    }, [archPose, isMax]);
    useFrame(() => {
        const el = tooltipRef.current;
        if (!el)
            return;
        const connector = connectorRef.current;
        const canvasRect = gl.domElement.getBoundingClientRect();
        const projected = tooltipAnchorWorld.clone().project(camera);
        // Hide if clipped behind camera/frustum.
        if (projected.z < -1 || projected.z > 1) {
            el.style.opacity = "0";
            if (connector)
                connector.style.opacity = "0";
            return;
        }
        el.style.opacity = "1";
        if (connector)
            connector.style.opacity = "1";
        const anchorX = canvasRect.left + (projected.x * 0.5 + 0.5) * size.width;
        const anchorY = canvasRect.top + (-projected.y * 0.5 + 0.5) * size.height;
        const toothProjected = new THREE.Vector3(archPose.position[0], archPose.position[1], archPose.position[2]).project(camera);
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
        const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
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
                free: (anchorY - gapPx - layoutH) - minY,
                x: baseTopX + topAdjX,
                y: -gapPx - layoutH,
                origin: 'center bottom',
            },
            {
                side: 'bottom',
                fits: anchorY + gapPx + layoutH <= canvasRect.bottom - edgePad,
                free: (canvasRect.bottom - edgePad) - (anchorY + gapPx + layoutH),
                x: baseBottomX + bottomAdjX,
                y: gapPx,
                origin: 'center top',
            },
            {
                side: 'right',
                fits: anchorX + gapPx + layoutW <= canvasRect.right - edgePad,
                free: (canvasRect.right - edgePad) - (anchorX + gapPx + layoutW),
                x: gapPx,
                y: baseRightY + rightAdjY + sideVerticalBias,
                origin: 'left center',
            },
            {
                side: 'left',
                fits: anchorX - gapPx - layoutW >= minX,
                free: (anchorX - gapPx - layoutW) - minX,
                x: -gapPx - layoutW,
                y: baseLeftY + leftAdjY + sideVerticalBias,
                origin: 'right center',
            },
        ];
        const preferredOrder = isMax
            ? ['top', 'right', 'left', 'bottom']
            : ['bottom', 'right', 'left', 'top'];
        const toothSafeRadius = isMax ? 72 : 50;
        const distToRect = (px, py, rx, ry, rw, rh) => {
            const dx = Math.max(rx - px, 0, px - (rx + rw));
            const dy = Math.max(ry - py, 0, py - (ry + rh));
            return Math.hypot(dx, dy);
        };
        const withSafety = sides.map((s) => {
            const rectLeft = anchorX + s.x;
            const rectTop = anchorY + s.y;
            const safety = distToRect(toothCenterX, toothCenterY, rectLeft, rectTop, layoutW, layoutH);
            const toothSafe = safety >= toothSafeRadius;
            return { ...s, safety, toothSafe };
        });
        // Upper teeth should never pick "bottom" while a tooth-safe alternative exists.
        // This avoids cards sitting on top of the hovered upper crowns.
        const preferredPool = isMax
            ? withSafety.filter((s) => s.side !== 'bottom')
            : withSafety;
        const fitOptions = preferredPool
            .filter((s) => s.fits && s.toothSafe)
            .sort((a, b) => {
            if (b.safety !== a.safety)
                return b.safety - a.safety;
            if (b.free !== a.free)
                return b.free - a.free;
            return preferredOrder.indexOf(a.side) - preferredOrder.indexOf(b.side);
        });
        // Fallback ladder:
        // 1) any fitting option in preferred pool
        // 2) tooth-safe option from all sides
        // 3) any option from all sides
        const fallbackFits = preferredPool
            .filter((s) => s.fits)
            .sort((a, b) => b.free - a.free);
        const toothSafeAll = withSafety
            .filter((s) => s.toothSafe)
            .sort((a, b) => {
            if (b.safety !== a.safety)
                return b.safety - a.safety;
            return b.free - a.free;
        });
        const anyAll = withSafety
            .slice()
            .sort((a, b) => b.free - a.free);
        const chosen = fitOptions[0] ?? fallbackFits[0] ?? toothSafeAll[0] ?? anyAll[0];
        el.style.transform = `translate(${chosen.x}px, ${chosen.y}px)`;
        el.style.transformOrigin = chosen.origin;
        // Screen-space dashed connector that follows selected side and extends
        // slightly behind the tooltip edge for a visually continuous link.
        if (connector) {
            const edgePoint = (() => {
                if (chosen.side === 'top')
                    return { x: chosen.x + rect.width / 2, y: chosen.y + rect.height };
                if (chosen.side === 'bottom')
                    return { x: chosen.x + rect.width / 2, y: chosen.y };
                if (chosen.side === 'right')
                    return { x: chosen.x, y: chosen.y + rect.height / 2 };
                return { x: chosen.x + rect.width, y: chosen.y + rect.height / 2 };
            })();
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
    });
    // Responsive sizing for smaller canvases.
    const isCompact = size.width < 980;
    const isTiny = size.width < 760;
    const cardMinW = isTiny ? 200 : (isCompact ? 220 : 240);
    const cardMaxW = isTiny ? 260 : (isCompact ? 290 : 320);
    const cardPadding = isTiny ? '8px 10px' : '10px 13px';
    const titleSize = isTiny ? 12 : 13;
    const bodySize = isTiny ? 9 : 10;
    const sectionPad = isTiny ? '6px 8px' : '7px 9px';
    // Derive data for full overview sections.
    const diagLabels = [];
    if (diagnoses) {
        for (const d of diagnoses)
            diagLabels.push(d);
    }
    if (isImplant && !diagLabels.includes('Implant'))
        diagLabels.push('Implant');
    const toothEntries = useMemo(() => (allEntries ?? []).filter(e => e.toothFdi === tooth.fdi), [allEntries, tooth.fdi]);
    const findingEntries = toothEntries.filter((e) => e.kind === 'finding');
    const procedureEntries = toothEntries.filter((e) => e.kind === 'procedure');
    const plannedEntries = toothEntries.filter((e) => e.kind === 'planned');
    const symptomEntries = toothEntries.filter((e) => e.kind === 'symptom');
    const noteText = toothNotes?.[tooth.fdi] ?? '';
    // Findings summary = legacy findings + entity-centric finding entries.
    const groupedFindings = useMemo(() => {
        const m = new Map();
        const push = (zoneId, label) => {
            const list = m.get(zoneId) || [];
            if (!list.includes(label))
                list.push(label);
            m.set(zoneId, list);
        };
        for (const f of findings)
            push(f.zoneId, f.type);
        for (const entry of findingEntries) {
            const surfaces = entry.surfaces.length > 0 ? entry.surfaces : ['whole'];
            for (const surface of surfaces)
                push(surface, entry.name);
        }
        return Array.from(m.entries());
    }, [findings, findingEntries]);
    // Past Procedures = union of toothDiagnoses + the (authoritative, additive)
    // treatment-history detail store, so every recorded item shows — not just
    // the latest. Deduped case-insensitively.
    const treatmentHistory = (() => {
        const seen = new Set();
        const out = [];
        const add = (n) => { if (!n) return; const k = n.toLowerCase(); if (seen.has(k)) return; seen.add(k); out.push(n); };
        diagLabels.forEach(add);
        Object.keys(treatmentHistoryDetails || {}).forEach(add);
        return out;
    })();
    // surface / since / note recorded for a whole-tooth diagnosis.
    const thMeta = (name) => {
        const d = treatmentHistoryDetails?.[name];
        if (!d) return '';
        const surfs = (d.surfaces || []);
        const surfLabel = surfs.includes('whole')
            ? 'Whole tooth'
            : surfs.map((z) => getZoneLabel(z, tooth.arch, tooth.position)).join(', ');
        const bits = [];
        if (surfLabel) bits.push(surfLabel);
        if ((d.since || '').trim()) bits.push(`since ${d.since.trim()}`);
        if ((d.note || '').trim()) bits.push(d.note.trim());
        return bits.join(' | ');
    };
    const procedureSummary = [...procedureEntries, ...plannedEntries, ...symptomEntries];
    // Shared "(surfaces · since · status · note)" formatter so Findings and
    // Procedures read exactly like Past Procedures — item name + bracket meta.
    const surfacesLabel = (surfs) => {
        const arr = surfs || [];
        if (arr.includes('whole')) return 'Whole tooth';
        return arr.map((z) => getZoneLabel(z, tooth.arch, tooth.position)).join(', ');
    };
    const findingRows = useMemo(() => {
        const m = new Map();
        const ensure = (name) => { if (!m.has(name)) m.set(name, { surfaces: new Set(), since: '', note: '' }); return m.get(name); };
        for (const f of findings) { if (!f?.type) continue; const r = ensure(f.type); if (f.zoneId) r.surfaces.add(f.zoneId); }
        for (const e of findingEntries) { const r = ensure(e.name); (e.surfaces || []).forEach((s) => r.surfaces.add(s)); if (!r.since && e.since) r.since = e.since; if (!r.note && e.notes) r.note = e.notes; }
        return [...m.entries()].map(([name, r]) => {
            const bits = [];
            const surf = surfacesLabel([...r.surfaces]);
            if (surf) bits.push(surf);
            if ((r.since || '').trim()) bits.push(`since ${r.since.trim()}`);
            if ((r.note || '').trim()) bits.push(r.note.trim());
            return { name, meta: bits.join(' | ') };
        });
    }, [findings, findingEntries, tooth.arch, tooth.position]);
    const procedureRows = procedureSummary.map((e) => {
        const bits = [];
        const surf = surfacesLabel(e.surfaces || []);
        if (surf) bits.push(surf);
        if (e.status) bits.push(e.status);
        if ((e.since || '').trim()) bits.push(`since ${e.since.trim()}`);
        if (e.plannedDate) bits.push(e.plannedDate);
        if ((e.notes || '').trim()) bits.push(e.notes.trim());
        return { id: e.id, name: e.name, meta: bits.join(' | ') };
    });
    // Has any content across all 4 sections?
    const hasContent = treatmentHistory.length > 0 ||
        groupedFindings.length > 0 ||
        procedureSummary.length > 0 ||
        noteText.length > 0;
    const sectionHeadingStyle = {
        fontSize: isTiny ? '8px' : '9px', textTransform: 'uppercase', letterSpacing: '0.6px',
        color: '#cbd5e1', marginBottom: '4px', fontWeight: 600,
    };
    return (_jsx(_Fragment, { children: _jsxs(Html, { position: [tooltipAnchorWorld.x, tooltipAnchorWorld.y, tooltipAnchorWorld.z], style: { pointerEvents: 'none' }, zIndexRange: [500, 300], children: [_jsx("div", { ref: connectorRef, style: {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: 0,
                        borderTop: '1px dashed rgba(148, 163, 184, 0.45)',
                        transformOrigin: '0 50%',
                        zIndex: 0,
                    } }), _jsxs("div", { ref: tooltipRef, style: {
                        transform: 'translate(-50%, -50%)',
                        transformOrigin: 'center center',
                        background: 'rgba(0, 0, 0, 0.78)', color: '#fff',
                        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                        padding: cardPadding, borderRadius: '8px', fontSize: isTiny ? '11px' : '12px',
                        borderLeft: `3px solid ${violetAccent.stroke}`,
                        fontFamily: "'Inter', sans-serif",
                        minWidth: `${cardMinW}px`, maxWidth: `${cardMaxW}px`, whiteSpace: 'normal',
                        boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
                        textAlign: 'left',
                        left: 0,
                        top: 0,
                        position: 'relative',
                        zIndex: 1,
                        transition: 'transform 120ms ease-out, opacity 120ms ease-out',
                    }, children: [_jsxs("div", { style: {
                                fontWeight: 700, fontSize: `${titleSize}px`,
                                paddingBottom: hasContent ? '8px' : 0,
                                marginBottom: hasContent ? '10px' : 0,
                                borderBottom: hasContent ? '1px solid rgba(255,255,255,0.1)' : 'none',
                                display: 'flex', alignItems: 'center', gap: '7px', lineHeight: 1.3,
                                whiteSpace: 'nowrap',
                            }, children: [_jsxs("span", { style: {
                                        color: violetAccent.badgeText, background: violetAccent.badgeBg, borderRadius: '4px',
                                        padding: isTiny ? '1px 5px' : '1px 6px', fontSize: isTiny ? '11px' : '12px', fontWeight: 700, flexShrink: 0,
                                    }, children: ["T", tooth.fdi] }), _jsxs("span", { style: { fontWeight: 600, color: '#f1f5f9', flexShrink: 0 }, children: [QUADRANT_LABELS[tooth.quadrant], " ", tooth.name] })] }), treatmentHistory.length > 0 && (_jsxs("div", { style: {
                                marginBottom: (groupedFindings.length > 0 || procedureSummary.length > 0 || noteText) ? '8px' : 0,
                                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: sectionPad,
                            }, children: [_jsx("div", { style: sectionHeadingStyle, children: "Past Procedures" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '3px' }, children: treatmentHistory.map(d => { const meta = thMeta(d); return (_jsxs("div", { style: { fontSize: `${bodySize}px`, color: '#f1f5f9', lineHeight: 1.35 }, children: [_jsx("span", { style: { fontWeight: 700 }, children: d }), meta ? _jsxs("span", { style: { color: '#cbd5e1', fontWeight: 400 }, children: [" (", meta, ")"] }) : null] }, d)); }) })] })), findingRows.length > 0 && (_jsxs("div", { style: {
                                marginBottom: (procedureRows.length > 0 || noteText) ? '8px' : 0,
                                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: sectionPad,
                            }, children: [_jsx("div", { style: sectionHeadingStyle, children: "Findings" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '3px' }, children: findingRows.map((r) => (_jsxs("div", { style: { fontSize: `${bodySize}px`, color: '#f1f5f9', lineHeight: 1.35 }, children: [_jsx("span", { style: { fontWeight: 700 }, children: r.name }), r.meta ? _jsxs("span", { style: { color: '#cbd5e1', fontWeight: 400 }, children: [" (", r.meta, ")"] }) : null] }, r.name))) })] })), procedureRows.length > 0 && (_jsxs("div", { style: {
                                marginBottom: noteText ? '8px' : 0,
                                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: sectionPad,
                            }, children: [_jsx("div", { style: sectionHeadingStyle, children: "Procedures" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '3px' }, children: procedureRows.map((r) => (_jsxs("div", { style: { fontSize: `${bodySize}px`, color: '#f1f5f9', lineHeight: 1.35 }, children: [_jsx("span", { style: { fontWeight: 700 }, children: r.name }), r.meta ? _jsxs("span", { style: { color: '#cbd5e1', fontWeight: 400 }, children: [" (", r.meta, ")"] }) : null] }, r.id))) })] })), noteText && (_jsxs("div", { style: {
                                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: sectionPad,
                            }, children: [_jsx("div", { style: sectionHeadingStyle, children: "Notes" }), _jsxs("div", { style: { fontSize: `${bodySize}px`, color: '#e2e8f0', fontStyle: 'italic', lineHeight: 1.4 }, children: ["\u201C", noteText.length > (isTiny ? 64 : 80) ? noteText.slice(0, isTiny ? 64 : 80) + '…' : noteText, "\u201D"] })] })), !hasContent && (_jsx("div", { style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', padding: '8px 0' }, children: "Click on the tooth to start adding details" }))] })] }) }));
}
