"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from "clsx";
import { Suspense, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Tooth, getFrontAzimuth, getDirsForTooth } from './Tooth';
import DentitionView from './DentitionView';
import { ToothSelector } from './ToothSelector';
import { QuickSurfaceSelector } from './QuickSurfaceSelector';
import { TEETH, PEDIATRIC_TEETH, QUADRANT_LABELS, getDefaultTreatmentSurfaces, TOOTH_DIAGNOSES, DIAGNOSES, ALL_ZONES, isOralRegionPosition, ORAL_POSITION_LABEL, } from './types';
import { DENTAL_AI_SCAN_APPLY_EVENT } from '@/components/tp-rxpad/dental-ai/dental-ai-events';
import { applyDiagnosisSelection } from './DiagnosisMatrix';
import './dental-canvas.css';
import dc from './DentalCanvas.module.scss';
import { LottieIcon } from '../LottieIcon';
import { CanvasLoader } from './CanvasLoader';
import { INITIAL_TOOTH_STATE } from '../mock-data';
import { EXAM_CHART_STORAGE_PREFIX } from '../plan/exam-suggestions';
import { TPButtonToken } from '@/components/tp-ui';
import { DentalChartPrintButton } from './DentalChartPrint';
let findingIdCounter = 0;
const VALID_TOOTH_DIAG = new Set(TOOTH_DIAGNOSES);
const VALID_SURFACE_FINDING = new Set(DIAGNOSES);
// Stable empty collections so default values don't create new identity per render
// (which would cause downstream useEffect deps to re-fire and re-inject shaders)
const EMPTY_DIAG_SET = new Set();
const EMPTY_FINDINGS = [];
/** Single-row dentition scope toolbar (quadrants, arches, full). */
const DENTITION_SCOPE_BUTTONS = [
    { id: 'UR', label: 'UR', title: 'Upper right quadrant' },
    { id: 'UL', label: 'UL', title: 'Upper left quadrant' },
    { id: 'LR', label: 'LR', title: 'Lower right quadrant' },
    { id: 'LL', label: 'LL', title: 'Lower left quadrant' },
    { id: 'RIGHT_ARCH', label: 'R arch', title: "Patient's right arch (UR + LR)" },
    { id: 'LEFT_ARCH', label: 'L arch', title: "Patient's left arch (UL + LL)" },
    { id: 'UPPER_ARCH', label: 'Maxillary', title: 'Maxillary arch (UR + UL)' },
    { id: 'LOWER_ARCH', label: 'Mandibular', title: 'Mandibular arch (LR + LL)' },
    { id: 'FULL', label: 'Full', title: 'Full mouth — all teeth' },
];
const ARCH_SCOPE_IDS = new Set(['RIGHT_ARCH', 'LEFT_ARCH', 'UPPER_ARCH', 'LOWER_ARCH']);
/** Agent / voice rows share the same clinical name often — give each applied row its own table key. */
function allocateTreatmentHistoryDetailKey(acc, preferredName) {
    const base = (preferredName && String(preferredName).trim()) || 'Treatment';
    if (!acc[base])
        return base;
    let i = 2;
    while (acc[`${base} (${i})`])
        i += 1;
    return `${base} (${i})`;
}
/** Map radiology / voice surface text to chart zones for treatment-history rows. */
function zonesFromAgentHistorySurface(surfaceRaw, treatmentName) {
    const fallback = () => {
        const d = [...getDefaultTreatmentSurfaces(treatmentName)];
        return d.length ? d : ['whole'];
    };
    const raw = (surfaceRaw || '').trim();
    if (!raw || /whole/i.test(raw))
        return fallback();
    const s = raw.toLowerCase();
    const pairs = [
        ['occlusal', 'occlusal'],
        ['buccal', 'buccal'],
        ['labial', 'buccal'],
        ['lingual', 'lingual'],
        ['palatal', 'lingual'],
        ['mesial', 'mesial'],
        ['distal', 'distal'],
        ['cervical', 'cervical'],
        ['incisal', 'occlusal'],
        ['root', 'root'],
    ];
    for (const [needle, z] of pairs) {
        if (s.includes(needle)) {
            if (z === 'whole' || ALL_ZONES.includes(z))
                return [z];
            break;
        }
    }
    return fallback();
}
/** Short tags in header — align with scope toolbar labels. */
const SCOPE_HEADER_BADGE = {
    FULL: 'FULL',
    UR: 'UR',
    UL: 'UL',
    LR: 'LR',
    LL: 'LL',
    RIGHT_ARCH: 'R arch',
    LEFT_ARCH: 'L arch',
    UPPER_ARCH: 'Maxillary',
    LOWER_ARCH: 'Mandibular',
};
const SCOPE_SELECTION_LABELS = {
    UR: 'Upper Right Quadrant',
    UL: 'Upper Left Quadrant',
    LR: 'Lower Right Quadrant',
    LL: 'Lower Left Quadrant',
    RIGHT_ARCH: 'Right arch',
    LEFT_ARCH: 'Left arch',
    UPPER_ARCH: 'Maxillary arch',
    LOWER_ARCH: 'Mandibular arch',
};
function dentitionScopeIsActive(scopeId, selectionScope) {
    if (scopeId === 'FULL')
        return selectionScope.type === 'full-mouth';
    if (ARCH_SCOPE_IDS.has(scopeId))
        return selectionScope.type === 'arch' && selectionScope.id === scopeId;
    return selectionScope.type === 'quadrant' && selectionScope.id === scopeId;
}
// ══════════════════════════════════════════════════════════════
// Camera Controller — animates between dentition and single-tooth views
// ══════════════════════════════════════════════════════════════
const DENTITION_CAMERA = { position: new THREE.Vector3(0, 2.5, 16.5), target: new THREE.Vector3(0, -0.9, -0.3), fov: 35 };
/** Same default radius as ZoneCameraRotator so “no surface picked” matches buccal framing. */
const SINGLE_TOOTH_ORBIT_RADIUS = 6.28;
/** Single-tooth orbit target; Y slightly above old -0.04 so the tooth sits higher in frame. */
const SINGLE_TOOTH_TARGET = new THREE.Vector3(0, 0.04, 0);
const SINGLE_TOOTH_FOV = 27;
/** UR/UL/LR/LL + R/L: much closer Z than Max/Man/Full (see groupedScopeZ). */
const QUADRANT_SIDE_SCOPE_EXTRA_ZOOM = 3.15;

function getSingleToothBuccalCamera(fdi, width, height) {
    const aspect = width / Math.max(1, height);
    const widthFactor = (width - 980) / 980;
    const widthAdjust = Math.max(-1.1, Math.min(1.1, -widthFactor * 1.5));
    const aspectPull = aspect < 0.7 ? 2.0 : aspect < 0.9 ? 1.15 : aspect < 1.1 ? 0.6 : aspect < 1.4 ? 0.22 : 0;
    const radius = SINGLE_TOOTH_ORBIT_RADIUS + aspectPull + widthAdjust * 0.35;
    const frontAz = getFrontAzimuth(String(fdi)) ?? 0;
    const offset = new THREE.Vector3().setFromSpherical(new THREE.Spherical(radius, Math.PI / 2, frontAz));
    return {
        position: new THREE.Vector3().copy(SINGLE_TOOTH_TARGET).add(offset),
        target: SINGLE_TOOTH_TARGET.clone(),
        fov: SINGLE_TOOTH_FOV,
    };
}
function ZoneCameraRotator({ zone, toothFdi, quadrant, arch, controlsRef, radius = 6.28 }) {
    const { camera } = useThree();
    const target = useRef(null);
    useEffect(() => {
        if (!zone)
            return;
        const frontAz = getFrontAzimuth(toothFdi) ?? 0;
        let az = frontAz;
        let pol = Math.PI / 2;
        const dirs = getDirsForTooth(toothFdi, quadrant, 0);
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
            pol = arch === 'mandibular' ? Math.PI / 2.4 : Math.PI - (Math.PI / 2.4);
        }
        if (zone === 'root') {
            az = frontAz;
            pol = arch === 'mandibular' ? Math.PI - 0.35 : 0.35;
        }
        if (controlsRef.current) {
            controlsRef.current.enabled = false;
            controlsRef.current.enableDamping = false;
        }
        target.current = new THREE.Spherical(radius, pol, az);
    }, [zone, toothFdi, quadrant, arch, radius, controlsRef]);
    useFrame(() => {
        if (!target.current || !controlsRef.current)
            return;
        const controls = controlsRef.current;
        const center = controls.target;
        // Current spherical around target
        const offset = new THREE.Vector3().subVectors(camera.position, center);
        const cur = new THREE.Spherical().setFromVector3(offset);
        const goal = target.current;
        // Lerp spherical angles
        const lerp = 0.12;
        cur.theta += shortestAngleDelta(cur.theta, goal.theta) * lerp;
        cur.phi += (goal.phi - cur.phi) * lerp;
        // Keep radius roughly constant
        cur.radius += (goal.radius - cur.radius) * lerp;
        const next = new THREE.Vector3().setFromSpherical(cur);
        camera.position.copy(next.add(center));
        controls.update();
        // Stop when close enough
        if (Math.abs(shortestAngleDelta(cur.theta, goal.theta)) < 0.005 &&
            Math.abs(cur.phi - goal.phi) < 0.005 &&
            Math.abs(cur.radius - goal.radius) < 0.01) {
            target.current = null;
            if (controls) {
                controls.enabled = true;
                controls.enableDamping = true;
            }
        }
    });
    return null;
}
function shortestAngleDelta(from, to) {
    let d = to - from;
    while (d > Math.PI)
        d -= Math.PI * 2;
    while (d < -Math.PI)
        d += Math.PI * 2;
    return d;
}
function CameraController({ viewMode, patientType, selectionScopeType = 'tooth', selectionScopeId = null, dentitionCameraOverride, dentitionVerticalNudge, onDentitionVerticalNudgeChange, controlsRef, }) {
    const { camera, size } = useThree();
    const animRef = useRef({ active: false, t: 0, startPos: new THREE.Vector3(), endPos: new THREE.Vector3(), startTarget: new THREE.Vector3(), endTarget: new THREE.Vector3(), startFov: 32, endFov: 32 });
    const cameraLayoutKey = useMemo(() => {
        if (viewMode === 'dentition')
            return 'dentition';
        if (selectionScopeType === 'tooth')
            return `single-tooth:${selectionScopeId ?? ''}`;
        return `grouped:${selectionScopeType}:${selectionScopeId ?? ''}`;
    }, [viewMode, selectionScopeType, selectionScopeId]);
    const prevLayoutKey = useRef(cameraLayoutKey);
    const prevPatientType = useRef(patientType);
    const initialized = useRef(false);
    // Canvas-aspect-responsive dentition z: the narrower the canvas, the further
    // back the camera pulls so the whole arch still fits without cropping.
    // Wider range so narrow panels never clip the teeth.
    const dentitionZ = useMemo(() => {
        const aspect = size.width / Math.max(1, size.height);
        const widthFactor = (size.width - 980) / 980;
        // Wider canvas => zoom in a bit (lower Z), narrower => zoom out (higher Z)
        const widthAdjust = Math.max(-1.8, Math.min(1.8, -widthFactor * 2.2));
        const base = (() => {
            // Aim for a comfortable MEDIUM zoom — the whole mouth visible with
            // breathing room around it, never cropping at the edges, never
            // zoomed so close that the dentition fills the entire viewport.
            if (aspect < 0.6)
                return 40;
            if (aspect < 0.8)
                return 32;
            if (aspect < 1.0)
                return 26;
            if (aspect < 1.2)
                return 22;
            if (aspect < 1.5)
                return 20;
            return 18;
        })();
        if (patientType === 'pediatric')
            return base - 4.2 + widthAdjust;
        if (patientType === 'mixed')
            return base + 0.3 + widthAdjust;
        return base - 1.4 + widthAdjust;
    }, [size.width, size.height, patientType]);
    /** Extra Z + framing so UR/Full/… grouped views clear the bottom tooth-chart overlay and fit the arch. */
    const groupedScopeZ = useMemo(() => {
        const aspect = size.width / Math.max(1, size.height);
        const widthFactor = (size.width - 980) / 980;
        const widthAdjust = Math.max(-1.6, Math.min(1.6, -widthFactor * 2.0));
        const zoomPad = 2.45;
        const groupedZoomBase = 1.15;
        // Push the camera further back on narrow / portrait canvases (e.g. split
        // oral-exam view on small screens) so the entire dentition stays visible.
        const base = aspect < 0.6 ? 38 : aspect < 0.8 ? 30 : aspect < 1.1 ? 22 : 18;
        let z;
        if (selectionScopeType === 'full-mouth')
            z = base + (patientType === 'mixed' ? 7.2 : 5.2) + widthAdjust + zoomPad;
        else if (selectionScopeType === 'arch')
            z = base + (patientType === 'mixed' ? 4.2 : 3.0) + widthAdjust + zoomPad;
        else
            z = base + (patientType === 'mixed' ? 1.4 : 0.8) + widthAdjust + zoomPad;
        const isQuadrantOrSideArch = selectionScopeType === 'quadrant'
            || (selectionScopeType === 'arch' && (selectionScopeId === 'RIGHT_ARCH' || selectionScopeId === 'LEFT_ARCH'));
        const zoomTotal = groupedZoomBase + (isQuadrantOrSideArch ? QUADRANT_SIDE_SCOPE_EXTRA_ZOOM : 0);
        return z - zoomTotal;
    }, [size.width, size.height, patientType, selectionScopeType, selectionScopeId]);
    // Ctrl/Cmd + drag vertically nudges dentition framing (desktop).
    // iPad keeps native 2-finger panning through OrbitControls.
    useEffect(() => {
        if (!controlsRef.current?.domElement)
            return;
        const dom = controlsRef.current.domElement;
        let dragging = false;
        let lastY = 0;
        const clampNudge = (v) => Math.max(-2.0, Math.min(2.0, v));
        const onPointerDown = (e) => {
            if (viewMode !== 'dentition')
                return;
            if (e.pointerType === 'touch')
                return;
            if (!(e.ctrlKey || e.metaKey))
                return;
            dragging = true;
            lastY = e.clientY;
            if (controlsRef.current)
                controlsRef.current.enabled = false;
            e.preventDefault();
        };
        const onPointerMove = (e) => {
            if (!dragging)
                return;
            const dy = e.clientY - lastY;
            lastY = e.clientY;
            if (controlsRef.current) {
                controlsRef.current.object.position.y += dy * 0.01;
                controlsRef.current.target.y += dy * 0.01;
                controlsRef.current.update();
            }
            onDentitionVerticalNudgeChange((prev) => clampNudge(prev + dy * 0.01));
            e.preventDefault();
        };
        const stopDragging = () => {
            if (!dragging)
                return;
            dragging = false;
            if (controlsRef.current?.dispatchEvent) {
                controlsRef.current.dispatchEvent({ type: 'end' });
            }
            if (controlsRef.current && !animRef.current.active)
                controlsRef.current.enabled = true;
        };
        dom.addEventListener('pointerdown', onPointerDown, { passive: false });
        window.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', stopDragging);
        window.addEventListener('pointercancel', stopDragging);
        return () => {
            dom.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', stopDragging);
            window.removeEventListener('pointercancel', stopDragging);
        };
    }, [controlsRef, viewMode, onDentitionVerticalNudgeChange]);
    const getCameraPreset = useCallback(() => {
        if (viewMode === 'dentition') {
            if (dentitionCameraOverride) {
                return {
                    cam: {
                        ...DENTITION_CAMERA,
                        position: new THREE.Vector3(dentitionCameraOverride.position[0], dentitionCameraOverride.position[1], dentitionCameraOverride.position[2]),
                        target: new THREE.Vector3(dentitionCameraOverride.target[0], dentitionCameraOverride.target[1], dentitionCameraOverride.target[2]),
                    },
                };
            }
            // Keep all dentition variants aligned to the canvas center-line vertically.
            const centeredY = 2.36;
            const centeredTargetY = -0.34;
            const dentitionFrameByType = patientType === 'pediatric'
                ? { y: centeredY, targetY: centeredTargetY, z: dentitionZ - 2.05 }
                : patientType === 'mixed'
                    ? { y: centeredY, targetY: centeredTargetY, z: dentitionZ + 0.9 }
                    : { y: centeredY, targetY: centeredTargetY, z: dentitionZ - 0.85 };
            return {
                cam: {
                    ...DENTITION_CAMERA,
                    position: new THREE.Vector3(DENTITION_CAMERA.position.x, dentitionFrameByType.y + dentitionVerticalNudge, dentitionFrameByType.z),
                    target: new THREE.Vector3(DENTITION_CAMERA.target.x, dentitionFrameByType.targetY + dentitionVerticalNudge, DENTITION_CAMERA.target.z)
                },
            };
        }
        if (selectionScopeType !== 'tooth') {
            const isNarrowGrouped = selectionScopeType === 'quadrant'
                || (selectionScopeType === 'arch' && (selectionScopeId === 'RIGHT_ARCH' || selectionScopeId === 'LEFT_ARCH'));
            if (isNarrowGrouped) {
                return {
                    cam: {
                        position: new THREE.Vector3(0, 0.64, groupedScopeZ),
                        target: new THREE.Vector3(0, -0.04, -0.35),
                        fov: 30.5,
                    },
                };
            }
            return {
                cam: {
                    position: new THREE.Vector3(0, 0.53, groupedScopeZ),
                    target: new THREE.Vector3(0, -0.13, -0.35),
                    fov: 34.5,
                },
            };
        }
        const rawFdi = selectionScopeId != null ? String(selectionScopeId) : '';
        const fdi = /^\d{2}$/.test(rawFdi) ? rawFdi : '11';
        return { cam: getSingleToothBuccalCamera(fdi, size.width, size.height) };
    }, [viewMode, patientType, selectionScopeType, selectionScopeId, dentitionZ, groupedScopeZ, dentitionVerticalNudge, dentitionCameraOverride, size.width, size.height]);
    // Set initial camera position based on initial viewMode
    useEffect(() => {
        if (initialized.current)
            return;
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
    }, [getCameraPreset]); // eslint-disable-line react-hooks/exhaustive-deps
    // React to canvas resize (e.g. draggable split, viewport resize) — applies the
    // FULL camera preset (position + target + fov) so the dentition stays fully
    // visible when the panel width changes. Without re-syncing y/fov along with z,
    // a portrait → landscape resize could leave the teeth framed too high/low.
    useEffect(() => {
        if (animRef.current.active)
            return;
        const { cam } = getCameraPreset();
        if (viewMode !== 'dentition' && selectionScopeType === 'tooth') {
            camera.position.copy(cam.position);
            camera.fov = cam.fov;
            camera.updateProjectionMatrix();
            if (controlsRef.current) {
                controlsRef.current.target.copy(cam.target);
                controlsRef.current.update();
            }
        }
        else {
            // Dentition + non-tooth scopes (oral / full-mouth / arch / quadrant):
            // resync the entire preset so the teeth auto-reframe on canvas resize.
            camera.position.copy(cam.position);
            if (typeof cam.fov === 'number') camera.fov = cam.fov;
            camera.updateProjectionMatrix();
            if (controlsRef.current) {
                if (cam.target) controlsRef.current.target.copy(cam.target);
                controlsRef.current.update();
            }
        }
    }, [dentitionZ, groupedScopeZ, viewMode, selectionScopeType, getCameraPreset, camera, controlsRef]);
    // Switching patient tabs should restore that tab's own view (or default),
    // rather than carrying over the previous tab's current camera transform.
    useEffect(() => {
        if (viewMode !== 'dentition') {
            prevPatientType.current = patientType;
            return;
        }
        if (prevPatientType.current === patientType)
            return;
        prevPatientType.current = patientType;
        const { cam } = getCameraPreset();
        camera.position.copy(cam.position);
        camera.fov = cam.fov;
        camera.updateProjectionMatrix();
        if (controlsRef.current) {
            controlsRef.current.target.copy(cam.target);
            controlsRef.current.update();
        }
    }, [patientType, viewMode, getCameraPreset, camera, controlsRef]);
    // Animate on dentition ↔ single-tooth, and when grouped scope id changes (UR→UL, Max→R, …).
    useEffect(() => {
        if (prevLayoutKey.current === cameraLayoutKey)
            return;
        prevLayoutKey.current = cameraLayoutKey;
        const { cam: target } = getCameraPreset();
        const a = animRef.current;
        a.startPos.copy(camera.position);
        a.endPos.copy(target.position);
        a.startTarget.copy(controlsRef.current?.target || new THREE.Vector3());
        a.endTarget.copy(target.target);
        a.startFov = camera.fov;
        a.endFov = target.fov;
        a.t = 0;
        a.active = true;
        if (controlsRef.current)
            controlsRef.current.enabled = false;
    }, [cameraLayoutKey, getCameraPreset, camera, controlsRef]);
    useFrame((_, delta) => {
        const a = animRef.current;
        if (!a.active)
            return;
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
            if (controlsRef.current)
                controlsRef.current.enabled = true;
        }
    });
    return null;
}
// ══════════════════════════════════════════════════════════════
// App
// ══════════════════════════════════════════════════════════════
const EMPTY_DIAGNOSES = new Set();
const EMPTY_TREATMENTS = {};
const getTeethForPatientType = (type) => (type === 'adult'
    ? TEETH
    : type === 'pediatric'
        ? PEDIATRIC_TEETH
        : [...TEETH, ...PEDIATRIC_TEETH]);
const getDefaultFdiForPatientType = (type) => (type === 'adult' ? '26' : type === 'pediatric' ? '64' : '26');
// When a diagnosis is applied across a whole scope (a quadrant, an arch, the
// full mouth…) we show ONE consolidated tag instead of repeating it on every
// tooth. Each scope's tag is anchored to a representative spot over the canvas
// (percent of the viewer box) so it visually "belongs" to that region.
// Note: viewer is oriented facing the patient, so the patient's RIGHT teeth
// (UR / LR / Right arch) sit on the viewer's LEFT.
const SCOPE_TAG_POS = {
    'Maxillary': { left: 50, top: 37 },
    'Mandibular': { left: 50, top: 79 },
    'Upper Right': { left: 29, top: 38 },
    'Upper Left': { left: 72, top: 37 },
    'Lower Right': { left: 25, top: 77 },
    'Lower Left': { left: 75, top: 79 },
    'Right arch': { left: 12, top: 55 },
    'Left arch': { left: 88, top: 55 },
    'Full mouth': { left: 50, top: 58 },
};
// Same anchors, keyed by oral-region id — used to float a region's oral-exam
// tag over the dentition so the doctor sees recorded oral findings at a glance.
const ORAL_TAG_POS = {
    UR: { left: 29, top: 38 }, UL: { left: 72, top: 37 },
    LR: { left: 25, top: 77 }, LL: { left: 75, top: 79 },
    RIGHT_ARCH: { left: 12, top: 55 }, LEFT_ARCH: { left: 88, top: 55 },
    UPPER_ARCH: { left: 50, top: 37 }, LOWER_ARCH: { left: 50, top: 79 },
    // Whole-mouth / full tag sits at the central meeting point of all four
    // quadrants (the occlusal midline) rather than on top of the front teeth.
    FULL: { left: 50, top: 50 },
};
// One floating oral-exam tag, anchored over the dentition. Distinct translucent
// violet (vs the grey per-tooth treatment tags and the teal nothing-else), same
// small corner radius. Hover shows a tooltip listing the entries at that anchor.
function OralExamTag({ pos, list, forceShowAll = false }) {
    const [hover, setHover] = useState(false);
    const showTip = hover || forceShowAll;
    const label = list.length > 1 ? `${list[0].name} +${list.length - 1}` : list[0].name;
    const siteOf = (e) => ((e.surfaces || []).map((p) => ORAL_POSITION_LABEL[p] || p).join(', ') || 'Whole mouth');
    return (_jsxs("div", { style: { position: 'absolute', left: `${pos.left}%`, top: `${pos.top}%`, transform: 'translate(-50%, -50%)', zIndex: showTip ? 9998 : 14, pointerEvents: 'auto' }, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), children: [
        _jsx("div", { style: { display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 6, background: 'rgba(164,97,216,0.16)', color: '#703A9E', fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '-0.2px', boxShadow: '0 2px 8px rgba(86,42,129,0.12)', whiteSpace: 'nowrap', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', cursor: 'default' }, children: label }),
        showTip && (_jsx("div", { style: { position: 'absolute', top: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, minWidth: 160, maxWidth: 240, background: 'rgba(15,23,42,0.95)', color: '#fff', borderRadius: 8, padding: '8px 10px', boxShadow: '0 8px 24px rgba(2,6,23,0.4)', fontFamily: 'Inter, sans-serif', whiteSpace: 'normal', pointerEvents: 'none' }, children: _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: list.map((e) => (_jsxs("div", { style: { fontSize: 11, lineHeight: 1.35 }, children: [_jsx("div", { style: { fontWeight: 700 }, children: e.name }), _jsx("div", { style: { color: '#cbd5e1', fontSize: 10 }, children: siteOf(e) + (e.since ? ` · since ${e.since}` : '') + (e.note ? ` · ${e.note}` : '') })] }, e.id))) }) })),
    ] }));
}
function OralExamTags({ entries, forceShowAll = false }) {
    const groups = {};
    entries.forEach((e) => {
        const regionPos = (e.surfaces || []).find((p) => isOralRegionPosition(p) && !['WHOLE', 'GENERALIZED', 'FULL'].includes(p));
        const key = regionPos || 'FULL';
        (groups[key] = groups[key] || []).push(e);
    });
    return (_jsx(_Fragment, { children: Object.entries(groups).map(([key, list]) => _jsx(OralExamTag, { pos: ORAL_TAG_POS[key] || ORAL_TAG_POS.FULL, list: list, forceShowAll: forceShowAll }, key)) }));
}
export function DentalCanvas({ patientId, patientAge = 30, compact = false, onStateChange, showAllOralTooltips = false, }) {
    // When the doctor hovers the "Oral Examination" record card in the aside,
    // every oral tag on the dentition pops its tooltip at once (decoupled via a
    // window event so we don't thread props through the panel tree).
    const [hoverShowAllOral, setHoverShowAllOral] = useState(false);
    useEffect(() => {
        const on = (e) => setHoverShowAllOral(Boolean(e?.detail?.show));
        window.addEventListener('oral-tags-show-all', on);
        return () => window.removeEventListener('oral-tags-show-all', on);
    }, []);
    // Pull initial state for this patient from mock data
    const initialState = INITIAL_TOOTH_STATE[patientId];
    const initialToothDiagnoses = useMemo(() => {
        if (!initialState?.toothDiagnoses)
            return {};
        const out = {};
        for (const [fdi, diags] of Object.entries(initialState.toothDiagnoses)) {
            out[fdi] = new Set(diags);
        }
        return out;
    }, [initialState]);
    const initialImplants = useMemo(() => new Set(initialState?.implantTeeth ?? []), [initialState]);
    const initialFindings = useMemo(() => {
        if (!initialState?.findingsByTooth)
            return {};
        const out = {};
        for (const [fdi, list] of Object.entries(initialState.findingsByTooth)) {
            out[fdi] = list.map((f, i) => ({ id: `seed-${fdi}-${i}`, zoneId: f.zoneId, type: f.type, notes: '' }));
        }
        return out;
    }, [initialState]);
    const [patientType, setPatientType] = useState(patientAge < 12 ? 'pediatric' : 'adult');
    const activeTeeth = useMemo(() => getTeethForPatientType(patientType), [patientType]);
    const [viewMode, setViewMode] = useState('dentition');
    const [selectedTooth, setSelectedTooth] = useState(activeTeeth.find(t => t.fdi === getDefaultFdiForPatientType(patientType)) ?? activeTeeth[0]);
    const [selectionScope, setSelectionScope] = useState({
        type: 'tooth',
        id: 'tooth',
        label: '',
        fdis: [],
    });
    const hasHydratedFromStorage = useRef(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [, setHoveredZone] = useState(null);
    const [findingsByTooth, setFindingsByTooth] = useState(initialFindings);
    // Last 3D click point per zone (world space) — used as spot decal center for findings.
    // Keyed by "fdi-zoneId" so points are scoped to the correct tooth.
    const [zoneHitPoints, setZoneHitPoints] = useState({});
    const [zoneNotes, setZoneNotes] = useState({});
    const [implantTeeth, setImplantTeeth] = useState(initialImplants);
    const [toothDiagnoses, setToothDiagnoses] = useState(initialToothDiagnoses);
    const [toothNotes, setToothNotes] = useState({});
    const [allEntries, setAllEntries] = useState([]);
    const [treatmentHistoryDetailsByTooth, setTreatmentHistoryDetailsByTooth] = useState({});
    const [highlightZones, setHighlightZones] = useState([]);
    const [multiSelectZones, setMultiSelectZones] = useState(() => new Set());
    const [multiSelectActive, setMultiSelectActive] = useState(false);
    const [hoveredToothFdi, setHoveredToothFdi] = useState(null);
    const [dentitionVerticalNudgeByType, setDentitionVerticalNudgeByType] = useState({});
    const [dentitionCameraByType, setDentitionCameraByType] = useState({});
    const [hideExamineHint, setHideExamineHint] = useState(false);
    // Oral Examination — flat list of region/surface-tagged findings & procedures
    // (NOT tied to a single tooth). Each entry: { id, kind, name, surfaces[], since, note }
    // where `surfaces` holds position ids (regions and/or anatomical surfaces).
    const [oralEntries, setOralEntries] = useState(() => Array.isArray(initialState?.oralEntries) ? initialState.oralEntries : []);
    const [oralNotes, setOralNotes] = useState(() => initialState?.oralNotes ?? '');
    const [oralHighlightFdis, setOralHighlightFdis] = useState(() => new Set());
    const oralIdRef = useRef(0);
    const updateOralNotes = useCallback((v) => setOralNotes(v ?? ''), []);
    const addOralEntry = useCallback((kind, name) => {
        if (!name) return;
        setOralEntries((prev) => {
            if (prev.some((e) => e.kind === kind && e.name === name)) return prev;
            // Unique across mounts (hydrated entries may already use oral-1, oral-2…).
            const id = `oral-${Date.now().toString(36)}-${++oralIdRef.current}`;
            return [...prev, { id, kind, name, surfaces: [], since: '', note: '' }];
        });
    }, []);
    const removeOralEntry = useCallback((id) => {
        setOralEntries((prev) => prev.filter((e) => e.id !== id));
    }, []);
    const updateOralEntry = useCallback((id, patch) => {
        setOralEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
    }, []);
    /** FDI set — teeth pulse briefly after Dr Agent / AI scan copy-to-chart */
    const [agentApplyPulseFdis, setAgentApplyPulseFdis] = useState(() => new Set());
    const agentPulseClearTimerRef = useRef(null);
    const controlsRef = useRef(null);
    const dentitionVerticalNudge = dentitionVerticalNudgeByType[patientType] ?? 0;
    const dentitionCameraOverride = dentitionCameraByType[patientType];
    useEffect(() => {
        if (!selectionScope.fdis.length) {
            setSelectionScope({
                type: 'tooth',
                id: selectedTooth.fdi,
                label: `${QUADRANT_LABELS[selectedTooth.quadrant]} ${selectedTooth.name}`,
                fdis: [selectedTooth.fdi],
            });
        }
    }, [selectionScope.fdis.length, selectedTooth]);
    useEffect(() => {
        if (typeof window === 'undefined' || hasHydratedFromStorage.current)
            return;
        hasHydratedFromStorage.current = true;
        const raw = window.localStorage.getItem(`dental.canvas.state.${patientId}`);
        if (!raw)
            return;
        try {
            const saved = JSON.parse(raw);
            const nextType = (saved.patientType === 'adult' || saved.patientType === 'pediatric' || saved.patientType === 'mixed')
                ? saved.patientType
                : undefined;
            if (nextType)
                setPatientType(nextType);
            const source = getTeethForPatientType(nextType ?? patientType);
            const candidateFdi = saved.selectedToothFdi;
            const fallbackFdi = getDefaultFdiForPatientType(nextType ?? patientType);
            const tooth = source.find((t) => t.fdi === candidateFdi) ?? source.find((t) => t.fdi === fallbackFdi) ?? source[0];
            if (tooth) {
                setSelectedTooth(tooth);
                setSelectionScope({
                    type: 'tooth',
                    id: tooth.fdi,
                    label: `${QUADRANT_LABELS[tooth.quadrant]} ${tooth.name}`,
                    fdis: [tooth.fdi],
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
        }
        catch {
            // ignore corrupted localStorage payload
        }
    }, [patientId, patientType]);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const hidden = window.localStorage.getItem(`dental.canvas.hintDismissed.${patientId}`);
        if (hidden === '1')
            setHideExamineHint(true);
    }, [patientId]);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const payload = {
            patientType,
            viewMode,
            selectedToothFdi: selectedTooth.fdi,
            selectionScope,
            dentitionVerticalNudgeByType,
            dentitionCameraByType,
            oralEntries,
            oralNotes,
        };
        window.localStorage.setItem(`dental.canvas.state.${patientId}`, JSON.stringify(payload));
    }, [patientId, patientType, viewMode, selectedTooth.fdi, selectionScope, dentitionVerticalNudgeByType, dentitionCameraByType, oralEntries, oralNotes]);
    // Persist examination clinical data so Treatment Plan "quick picks" stay in sync with the chart.
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const entries = allEntries
            .filter((e) => e.kind === 'procedure' || e.kind === 'planned')
            .map((e) => ({
            toothFdi: e.toothFdi,
            kind: e.kind,
            name: e.name,
            surfaces: [...(e.surfaces ?? [])],
        }));
        const findingsSerialized = Object.fromEntries(Object.entries(findingsByTooth).map(([fdi, list]) => [
            fdi,
            list.map((f) => ({ zoneId: f.zoneId, type: f.type })),
        ]));
        const diagSerialized = Object.fromEntries(Object.entries(toothDiagnoses).map(([fdi, set]) => [fdi, [...set]]));
        // Guard: never clobber a saved chart that has data with empty live state.
        // On a fresh mount (before any edit) the in-memory state can be empty;
        // writing it would wipe a previously-recorded chart and make the exam
        // look like it "reset" when the doctor returns to it.
        const liveIsEmpty = entries.length === 0
            && Object.values(diagSerialized).every((a) => a.length === 0)
            && Object.values(findingsSerialized).every((a) => a.length === 0)
            && oralEntries.length === 0
            && !oralNotes.trim();
        if (liveIsEmpty) {
            try {
                const raw = window.localStorage.getItem(`${EXAM_CHART_STORAGE_PREFIX}${patientId}`);
                if (raw) {
                    const saved = JSON.parse(raw);
                    const savedHasData = (saved.entries?.length ?? 0) > 0
                        || Object.values(saved.toothDiagnoses ?? {}).some((a) => (a || []).length > 0)
                        || Object.values(saved.findingsByTooth ?? {}).some((a) => (a || []).length > 0);
                    if (savedHasData)
                        return;
                }
            }
            catch { /* fall through and write */ }
        }
        try {
            window.localStorage.setItem(`${EXAM_CHART_STORAGE_PREFIX}${patientId}`, JSON.stringify({
                updatedAt: Date.now(),
                entries,
                toothDiagnoses: diagSerialized,
                findingsByTooth: findingsSerialized,
                oralEntries,
                oralNotes,
            }));
            window.dispatchEvent(new CustomEvent('dental-exam-chart-updated', { detail: { patientId } }));
        }
        catch {
            // ignore quota / private mode
        }
    }, [patientId, allEntries, toothDiagnoses, findingsByTooth, oralEntries, oralNotes]);
    const handleDentitionVerticalNudgeChange = useCallback((value) => {
        setDentitionVerticalNudgeByType((prev) => {
            const current = prev[patientType] ?? 0;
            const nextRaw = typeof value === 'function' ? value(current) : value;
            const next = Math.max(-2.0, Math.min(2.0, nextRaw));
            if (Math.abs(next - current) < 0.0001)
                return prev;
            return { ...prev, [patientType]: next };
        });
    }, [patientType]);
    const handleDentitionControlsEnd = useCallback(() => {
        if (viewMode !== 'dentition' || !controlsRef.current)
            return;
        const ctrl = controlsRef.current;
        const p = ctrl.object?.position;
        const t = ctrl.target;
        if (!p || !t)
            return;
        const pose = {
            position: [p.x, p.y, p.z],
            target: [t.x, t.y, t.z],
        };
        setDentitionCameraByType((prev) => ({ ...prev, [patientType]: pose }));
    }, [patientType, viewMode]);
    useEffect(() => {
        if (hideExamineHint)
            return;
        const hasExamData = allEntries.length > 0 || Object.values(findingsByTooth).some((items) => items.length > 0);
        if (!hasExamData)
            return;
        setHideExamineHint(true);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(`dental.canvas.hintDismissed.${patientId}`, '1');
        }
    }, [allEntries.length, findingsByTooth, hideExamineHint, patientId]);
    const currentToothDiagnoses = useMemo(() => toothDiagnoses[selectedTooth.fdi] || EMPTY_DIAGNOSES, [toothDiagnoses, selectedTooth.fdi]);
    const isImplant = currentToothDiagnoses.has('Implant') || implantTeeth.has(selectedTooth.fdi);
    const currentToothNotes = toothNotes[selectedTooth.fdi] || '';
    const currentTreatmentHistoryDetails = useMemo(() => {
        return treatmentHistoryDetailsByTooth[selectedTooth.fdi] || EMPTY_TREATMENTS;
    }, [treatmentHistoryDetailsByTooth, selectedTooth.fdi]);
    // The teeth a newly added diagnosis/finding/procedure should apply to: an
    // explicit arch / quadrant / full-mouth scope fans out to EVERY tooth in
    // that scope (sharing one groupId); otherwise just the focused tooth. This
    // is what makes "select Maxillary, then add Missing" mark all maxillary
    // teeth instead of a single tooth.
    const targetFdis = useMemo(() => {
        if (selectionScope.type !== 'tooth' && selectionScope.fdis.length > 0)
            return selectionScope.fdis;
        return [selectedTooth.fdi];
    }, [selectionScope, selectedTooth.fdi]);
    const newGroupId = useCallback((fdis) => (fdis.length > 1 ? `grp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` : undefined), []);
    // Always-fresh mirror of toothDiagnoses so a multi-apply can lock a single
    // add/remove direction from the focused tooth.
    const toothDiagnosesRef = useRef(toothDiagnoses);
    toothDiagnosesRef.current = toothDiagnoses;
    // Scope-wide diagnoses (a diagnosis covering exactly a whole zone) shown as a
    // single banner at the top of the dentition — e.g. "RCT · Full mouth" —
    // instead of repeating the tag on every tooth.
    // Detect diagnoses that blanket an entire scope and collapse them into one
    // tag per { diagnosis, scope }. Matches DentitionView's per-tooth suppression
    // so a scope-wide diagnosis shows ONCE (positioned by scope) rather than on
    // every tooth.
    const dentitionGroupLabels = useMemo(() => {
        const diagToFdis = {};
        Object.entries(toothDiagnoses || {}).forEach(([fdi, set]) => {
            (set instanceof Set ? [...set] : (set || [])).forEach((d) => { (diagToFdis[d] = diagToFdis[d] || []).push(fdi); });
        });
        (implantTeeth instanceof Set ? [...implantTeeth] : (implantTeeth || [])).forEach((f) => { (diagToFdis['Implant'] = diagToFdis['Implant'] || []).push(f); });
        const byQ = { 'upper-right': [], 'upper-left': [], 'lower-left': [], 'lower-right': [] };
        activeTeeth.forEach((t) => { if (byQ[t.quadrant]) byQ[t.quadrant].push(t.fdi); });
        const defs = [
            ['Full mouth', [...byQ['upper-right'], ...byQ['upper-left'], ...byQ['lower-left'], ...byQ['lower-right']]],
            ['Maxillary', [...byQ['upper-right'], ...byQ['upper-left']]],
            ['Mandibular', [...byQ['lower-left'], ...byQ['lower-right']]],
            ['Right arch', [...byQ['upper-right'], ...byQ['lower-right']]],
            ['Left arch', [...byQ['upper-left'], ...byQ['lower-left']]],
            ['Upper Right', byQ['upper-right']], ['Upper Left', byQ['upper-left']],
            ['Lower Left', byQ['lower-left']], ['Lower Right', byQ['lower-right']],
        ];
        const out = [];
        Object.entries(diagToFdis).forEach(([diag, fdis]) => {
            const uniq = [...new Set(fdis)];
            if (uniq.length < 2) return;
            const set = new Set(uniq);
            const hit = defs.find(([, arr]) => arr.length > 1 && arr.length === set.size && arr.every((f) => set.has(f)));
            if (hit) out.push({ diag, scope: hit[0] });
        });
        return out;
    }, [toothDiagnoses, implantTeeth, activeTeeth]);
    // Implant toggle routes through the compatibility matrix (see toggleToothDiagnosis below).
    // The matrix sync-fires `setImplantTeeth` to keep the top-level set in step so the
    // ImplantScrew shader sees the same truth as the UI chips.
    const toggleImplant = useCallback(() => {
        // Forward-ref: toggleToothDiagnosis is declared below but captured at call time.
        // Using a deferred wrapper avoids use-before-declaration lint errors.
        toggleToothDiagnosisRef.current?.('Implant');
        setSelectedZone(prev => (prev === 'cervical' || prev === 'root') ? null : prev);
    }, []);
    const toggleToothDiagnosisRef = useRef(null);
    const toggleToothDiagnosis = useCallback((diagnosis) => {
        const fdis = targetFdis;
        const multi = fdis.length > 1;
        // Lock the add/remove direction once from the focused tooth so a group
        // stays consistent (teeth that already have it won't toggle the other way).
        const refCurrent = new Set(toothDiagnosesRef.current[selectedTooth.fdi] || []);
        const refNext = applyDiagnosisSelection(refCurrent, diagnosis);
        const adding = refNext.has(diagnosis) && !refCurrent.has(diagnosis);
        const implantAdd = [];
        const implantRemove = [];
        setToothDiagnoses(prev => {
            const next = { ...prev };
            for (const fdi of fdis) {
                const current = new Set(prev[fdi] || []);
                const has = current.has(diagnosis);
                let res = current;
                if (!multi)
                    res = applyDiagnosisSelection(current, diagnosis);
                else if (adding && !has)
                    res = applyDiagnosisSelection(current, diagnosis);
                else if (!adding && has)
                    res = applyDiagnosisSelection(current, diagnosis);
                if (current.has('Implant') && !res.has('Implant'))
                    implantRemove.push(fdi);
                if (!current.has('Implant') && res.has('Implant'))
                    implantAdd.push(fdi);
                next[fdi] = res;
            }
            return next;
        });
        if (implantAdd.length || implantRemove.length) {
            setImplantTeeth(ip => {
                const n = new Set(ip);
                implantAdd.forEach((f) => n.add(f));
                implantRemove.forEach((f) => n.delete(f));
                return n;
            });
        }
        // Tooth-level diagnosis changed → clear all surface findings for these teeth
        setFindingsByTooth(prev => {
            const next = { ...prev };
            fdis.forEach((f) => { delete next[f]; });
            return next;
        });
        if (diagnosis === 'Missing' || diagnosis === 'Extraction') {
            setImplantTeeth(prev => {
                const next = new Set(prev);
                fdis.forEach((f) => next.delete(f));
                return next;
            });
            setSelectedZone(null);
        }
    }, [targetFdis, selectedTooth.fdi]);
    // Keep the deferred ref in sync so toggleImplant can route through the matrix.
    toggleToothDiagnosisRef.current = toggleToothDiagnosis;
    const updateToothNotes = useCallback((notes) => {
        const fdis = targetFdis;
        setToothNotes(prev => { const next = { ...prev }; fdis.forEach((f) => { next[f] = notes; }); return next; });
    }, [targetFdis]);
    const handleSelectTooth = useCallback((tooth) => {
        setSelectedTooth(tooth);
        setSelectionScope({
            type: 'tooth',
            id: tooth.fdi,
            label: `${QUADRANT_LABELS[tooth.quadrant]} ${tooth.name}`,
            fdis: [tooth.fdi],
        });
        setSelectedZone(null);
        setViewMode('single-tooth');
    }, []);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const handler = (e) => {
            const detail = e.detail;
            if (!detail || detail.patientId !== patientId)
                return;
            const { teeth, focusFdi, openFullDentition, patientTypeHint, highlightFdis } = detail;
            if (!Array.isArray(teeth) || teeth.length === 0)
                return;
            const effectivePatientType = patientTypeHint === 'adult' || patientTypeHint === 'pediatric' || patientTypeHint === 'mixed'
                ? patientTypeHint
                : patientType;
            if (patientTypeHint === 'adult' || patientTypeHint === 'pediatric' || patientTypeHint === 'mixed') {
                setPatientType(patientTypeHint);
            }
            setToothDiagnoses((prev) => {
                const next = { ...prev };
                for (const t of teeth) {
                    const fdi = String(t.fdi);
                    const cur = new Set(next[fdi] || []);
                    if (t.implant)
                        cur.add('Implant');
                    for (const d of t.diagnoses || []) {
                        if (VALID_TOOTH_DIAG.has(d))
                            cur.add(d);
                    }
                    next[fdi] = cur;
                }
                return next;
            });
            setImplantTeeth((prev) => {
                const n = new Set(prev);
                for (const t of teeth) {
                    if (t.implant)
                        n.add(String(t.fdi));
                }
                return n;
            });
            setFindingsByTooth((prev) => {
                const next = { ...prev };
                for (const t of teeth) {
                    const fdi = String(t.fdi);
                    const list = [...(next[fdi] || [])];
                    for (const f of t.findings || []) {
                        const z = f.zoneId;
                        const zoneId = (z === 'whole' || ALL_ZONES.includes(z)) ? z : 'occlusal';
                        const type = VALID_SURFACE_FINDING.has(f.type) ? f.type : 'Staining';
                        const notes = (f.notes || '').trim();
                        list.push({
                            id: `finding-${++findingIdCounter}`,
                            zoneId,
                            type,
                            notes: notes || 'From AI scan',
                        });
                    }
                    next[fdi] = list;
                }
                return next;
            });
            setTreatmentHistoryDetailsByTooth((prev) => {
                let next = prev;
                let changed = false;
                for (const t of teeth) {
                    const fdi = String(t.fdi);
                    const rows = (t.treatmentHistoryRows && t.treatmentHistoryRows.length > 0)
                        ? t.treatmentHistoryRows
                        : (t.treatmentHistory || []).map((line) => ({ name: line }));
                    if (!rows.length)
                        continue;
                    if (!changed) {
                        next = { ...prev };
                        changed = true;
                    }
                    const cur = next[fdi] || {};
                    const acc = { ...cur };
                    for (const row of rows) {
                        const baseName = (row.name && String(row.name).trim()) || 'Treatment';
                        const key = allocateTreatmentHistoryDetailKey(acc, baseName);
                        const zones = zonesFromAgentHistorySurface(row.surface, baseName);
                        const prevD = acc[key];
                        const noteMerge = [prevD?.note, row.notes].filter(Boolean).join(', ').trim();
                        acc[key] = {
                            ...prevD,
                            surfaces: zones.length ? zones : [...getDefaultTreatmentSurfaces(baseName)],
                            since: (row.since && String(row.since).trim()) || prevD?.since || '',
                            note: noteMerge || prevD?.note || '',
                        };
                    }
                    next[fdi] = acc;
                }
                return changed ? next : prev;
            });
            setAllEntries((prev) => {
                const add = [];
                for (const t of teeth) {
                    const fdi = String(t.fdi);
                    for (const p of t.procedures || []) {
                        const name = (p.name && String(p.name).trim()) || '';
                        if (!name)
                            continue;
                        const noteBits = [p.surface && p.surface !== '—' ? p.surface : null, p.date, p.status, p.notes].filter(Boolean);
                        add.push({
                            id: `agent-proc-${fdi}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                            toothFdi: fdi,
                            kind: 'procedure',
                            name,
                            surfaces: [...getDefaultTreatmentSurfaces(name)],
                            notes: noteBits.length ? noteBits.join(' · ') : undefined,
                        });
                    }
                }
                return add.length ? [...prev, ...add] : prev;
            });
            setToothNotes((prev) => {
                let next = prev;
                let changed = false;
                for (const t of teeth) {
                    const note = t.scannerNotes?.trim();
                    if (!note)
                        continue;
                    const fdi = String(t.fdi);
                    const existing = (next[fdi] || '').trim();
                    const merged = existing ? `${existing}\n${note}` : note;
                    if (!changed) {
                        next = { ...prev };
                        changed = true;
                    }
                    next[fdi] = merged;
                }
                return changed ? next : prev;
            });
            const goFullDentition = openFullDentition !== false;
            if (goFullDentition) {
                const source = getTeethForPatientType(effectivePatientType);
                const allFdis = source.map((t) => t.fdi);
                if (allFdis.length > 0) {
                    const representative = source.find((t) => t.fdi === allFdis[0]) ?? source[0];
                    setSelectedTooth(representative);
                    setSelectionScope({
                        type: 'full-mouth',
                        id: 'FULL',
                        label: 'Full mouth',
                        fdis: allFdis,
                    });
                    setSelectedZone(null);
                    setViewMode('dentition');
                }
                const pulseList = highlightFdis && highlightFdis.length > 0
                    ? highlightFdis
                    : teeth.map((t) => String(t.fdi));
                const pulseSet = new Set(pulseList.map((fdi) => String(fdi)));
                setAgentApplyPulseFdis(pulseSet);
                if (agentPulseClearTimerRef.current)
                    window.clearTimeout(agentPulseClearTimerRef.current);
                agentPulseClearTimerRef.current = window.setTimeout(() => {
                    setAgentApplyPulseFdis(new Set());
                    agentPulseClearTimerRef.current = null;
                }, 1300);
            }
            else if (focusFdi) {
                const source = getTeethForPatientType(effectivePatientType);
                const tooth = source.find((x) => x.fdi === String(focusFdi));
                if (tooth)
                    handleSelectTooth(tooth);
                const pulseList = highlightFdis && highlightFdis.length > 0
                    ? highlightFdis
                    : [String(focusFdi)];
                const pulseSet = new Set(pulseList.map((fdi) => String(fdi)));
                setAgentApplyPulseFdis(pulseSet);
                if (agentPulseClearTimerRef.current)
                    window.clearTimeout(agentPulseClearTimerRef.current);
                agentPulseClearTimerRef.current = window.setTimeout(() => {
                    setAgentApplyPulseFdis(new Set());
                    agentPulseClearTimerRef.current = null;
                }, 1300);
            }
        };
        window.addEventListener(DENTAL_AI_SCAN_APPLY_EVENT, handler);
        return () => {
            window.removeEventListener(DENTAL_AI_SCAN_APPLY_EVENT, handler);
            if (agentPulseClearTimerRef.current)
                window.clearTimeout(agentPulseClearTimerRef.current);
        };
    }, [patientId, patientType, handleSelectTooth]);
    const handleBackToDentition = useCallback(() => {
        setViewMode('dentition');
        setSelectionScope({
            type: 'tooth',
            id: selectedTooth.fdi,
            label: `${QUADRANT_LABELS[selectedTooth.quadrant]} ${selectedTooth.name}`,
            fdis: [selectedTooth.fdi],
        });
        setSelectedZone(null);
        setHoveredZone(null);
    }, [selectedTooth]);
    const getScopeFdis = useCallback((scope) => {
        const source = getTeethForPatientType(patientType);
        if (scope === 'FULL')
            return source.map((t) => t.fdi);
        const quadrantMap = {
            UR: 'upper-right',
            UL: 'upper-left',
            LR: 'lower-right',
            LL: 'lower-left',
        };
        if (quadrantMap[scope])
            return source.filter((t) => t.quadrant === quadrantMap[scope]).map((t) => t.fdi);
        const archQuadrants = {
            RIGHT_ARCH: ['upper-right', 'lower-right'],
            LEFT_ARCH: ['upper-left', 'lower-left'],
            UPPER_ARCH: ['upper-right', 'upper-left'],
            LOWER_ARCH: ['lower-right', 'lower-left'],
        };
        const qs = archQuadrants[scope];
        if (qs)
            return source.filter((t) => qs.includes(t.quadrant)).map((t) => t.fdi);
        return [];
    }, [patientType]);
    const handleSelectScope = useCallback((scope) => {
        const fdis = getScopeFdis(scope);
        if (fdis.length === 0)
            return;
        const representative = activeTeeth.find((t) => t.fdi === fdis[0]) ?? activeTeeth[0];
        setSelectedTooth(representative);
        const scopeType = scope === 'FULL' ? 'full-mouth' : ARCH_SCOPE_IDS.has(scope) ? 'arch' : 'quadrant';
        setSelectionScope({
            type: scopeType,
            id: scope,
            label: scope === 'FULL' ? 'Full mouth' : SCOPE_SELECTION_LABELS[scope],
            fdis,
        });
        setSelectedZone(null);
        setViewMode('single-tooth');
    }, [activeTeeth, getScopeFdis]);
    // Oral Examination — select a REGION (not a tooth). Reuses the grouped
    // selectionScope so the 3D view highlights that region, but stays in 'oral'
    // viewMode so the side panel shows the Oral Examination (findings/procedures)
    // instead of the per-tooth panel.
    // Oral Examination uses the FULL dentition (no zoom). Entering it just sets
    // a full-mouth scope so the 3D shows all teeth, and flips to 'oral' viewMode
    // so the aside swaps to the oral findings/procedures tables.
    const enterOralExam = useCallback(() => {
        setSelectionScope({ type: 'full-mouth', id: 'FULL', label: 'Full mouth', fdis: getScopeFdis('FULL') });
        setSelectedZone(null);
        setOralHighlightFdis(new Set());
        setViewMode('oral');
    }, [getScopeFdis]);
    // Highlight teeth for the active oral row's region position(s). Anatomical
    // surfaces don't map to teeth, so they're ignored here (recorded as labels).
    const setOralHighlight = useCallback((positionIds) => {
        const ids = Array.isArray(positionIds) ? positionIds : [];
        const regionIds = ids.filter((p) => isOralRegionPosition(p));
        if (regionIds.length === 0) { setOralHighlightFdis(new Set()); return; }
        const fdis = new Set();
        regionIds.forEach((r) => { ((r === 'WHOLE' || r === 'GENERALIZED') ? getScopeFdis('FULL') : getScopeFdis(r)).forEach((f) => fdis.add(f)); });
        setOralHighlightFdis(fdis);
    }, [getScopeFdis]);
    // Tooth chart scope bar: same scope state as the dentition toolbar so the
    // 3D preview (grouped DentitionView) updates. Preserve the current tooth when
    // it already lies in the chosen scope; otherwise jump to the first tooth.
    const handleToothScopeJump = useCallback((scope) => {
        const fdis = getScopeFdis(scope);
        if (fdis.length === 0)
            return;
        setSelectedTooth((prev) => {
            if (prev && fdis.includes(prev.fdi))
                return prev;
            return activeTeeth.find((t) => t.fdi === fdis[0]) ?? prev;
        });
        setSelectionScope({
            type: scope === 'FULL' ? 'full-mouth' : ARCH_SCOPE_IDS.has(scope) ? 'arch' : 'quadrant',
            id: scope,
            label: scope === 'FULL' ? 'Full mouth' : SCOPE_SELECTION_LABELS[scope],
            fdis,
        });
        setSelectedZone(null);
        setViewMode('single-tooth');
    }, [activeTeeth, getScopeFdis]);
    const handlePatientTypeChange = useCallback((nextType) => {
        setPatientType(nextType);
        const nextTeeth = getTeethForPatientType(nextType);
        setSelectedTooth((prev) => {
            const nextSelected = nextTeeth.find(t => t.fdi === prev.fdi)
                ?? nextTeeth.find(t => t.fdi === getDefaultFdiForPatientType(nextType))
                ?? nextTeeth[0];
            setSelectionScope({
                type: 'tooth',
                id: nextSelected.fdi,
                label: `${QUADRANT_LABELS[nextSelected.quadrant]} ${nextSelected.name}`,
                fdis: [nextSelected.fdi],
            });
            return nextSelected;
        });
    }, []);
    const handleSelectZone = useCallback((zone, hitPoint, opts) => {
        if (currentToothDiagnoses.has('Missing') || currentToothDiagnoses.has('Extraction'))
            return;
        if (hitPoint) {
            const key = `${selectedTooth.fdi}-${zone}`;
            setZoneHitPoints(prev => ({ ...prev, [key]: hitPoint }));
        }
        if (opts?.multi) {
            // Always rotate camera to the clicked surface — even during multi-select
            setSelectedZone(zone);
            setMultiSelectZones((prev) => {
                const next = new Set(prev);
                if (zone !== 'whole' && next.has('whole'))
                    next.delete('whole');
                if (next.has(zone))
                    next.delete(zone);
                else
                    next.add(zone);
                return next;
            });
            return;
        }
        setSelectedZone((prev) => (prev === zone ? null : zone));
    }, [currentToothDiagnoses, selectedTooth.fdi]);
    const handleToggleZoneMultiSelect = useCallback((zone) => {
        // Always rotate the 3D camera to the picked surface — the 3D canvas
        // reacts to actions happening in the side panel (bi-directional link).
        setSelectedZone((prev) => multiSelectActive ? zone : (prev === zone ? null : zone));
        // Multi-select mode is gated by multiSelectActive (enabled only when a
        // surface cell in the Findings/Procedures table is active).
        if (!multiSelectActive)
            return;
        setMultiSelectZones((prev) => {
            if (zone === 'whole') {
                return prev.has('whole') ? new Set() : new Set(['whole']);
            }
            const next = new Set(prev);
            if (next.has('whole'))
                next.delete('whole');
            if (next.has(zone))
                next.delete(zone);
            else
                next.add(zone);
            return next;
        });
    }, [multiSelectActive]);
    const handleToggleZoneFromQuickSelector = useCallback((zone) => {
        // Keep selector visible always, but only allow true multi-select
        // while a surfaces cell is actively editing.
        if (!multiSelectActive) {
            setMultiSelectZones((prev) => (prev.size === 0 ? prev : new Set()));
            setSelectedZone((prev) => (prev === zone ? null : zone));
            return;
        }
        setSelectedZone(zone);
        setMultiSelectZones((prev) => {
            if (zone === 'whole') {
                return prev.has('whole') ? new Set() : new Set(['whole']);
            }
            const next = new Set(prev);
            if (next.has('whole'))
                next.delete('whole');
            if (next.has(zone))
                next.delete(zone);
            else
                next.add(zone);
            return next;
        });
    }, [multiSelectActive]);
    const handleClearMultiSelect = useCallback(() => {
        setMultiSelectZones((prev) => (prev.size === 0 ? prev : new Set()));
    }, []);
    const handleClearSelectedZone = useCallback(() => {
        setSelectedZone(null);
    }, []);
    const handleSetMultiSelectZones = useCallback((zones) => {
        setMultiSelectZones((prev) => {
            if (prev.size === zones.length && zones.every((zone) => prev.has(zone)))
                return prev;
            return new Set(zones);
        });
    }, []);
    const handleSetMultiSelectActive = useCallback((active) => {
        setMultiSelectActive(active);
    }, []);
    const handleSetHoveredTooth = useCallback((fdi) => {
        setHoveredToothFdi(fdi);
    }, []);
    const handleAddFinding = useCallback((zoneId, type) => {
        const fdis = targetFdis;
        const groupId = newGroupId(fdis);
        setFindingsByTooth((prev) => {
            const next = { ...prev };
            for (const fdi of fdis) {
                let list = [...(prev[fdi] || [])];
                if (type === 'Normal') {
                    list = list.filter(f => f.zoneId !== zoneId);
                }
                else {
                    list = list.filter(f => !(f.zoneId === zoneId && f.type === 'Normal'));
                }
                const hitPoint = zoneHitPoints[`${fdi}-${zoneId}`];
                list.push({ id: `finding-${++findingIdCounter}`, zoneId, type, notes: '', hitPoint, groupId });
                next[fdi] = list;
            }
            return next;
        });
    }, [zoneHitPoints, targetFdis, newGroupId]);
    const handleRemoveFinding = useCallback((id) => {
        const fdi = selectedTooth.fdi;
        setFindingsByTooth((prev) => {
            const removed = (prev[fdi] || []).find((f) => f.id === id);
            if (removed?.groupId) {
                // Grouped finding → remove it from every tooth in the group.
                const next = {};
                for (const [k, list] of Object.entries(prev)) {
                    next[k] = list.filter((f) => f.groupId !== removed.groupId);
                }
                return next;
            }
            return { ...prev, [fdi]: (prev[fdi] || []).filter((f) => f.id !== id) };
        });
    }, [selectedTooth.fdi]);
    // Current tooth's findings (derived, stable identity when empty)
    const findings = findingsByTooth[selectedTooth.fdi] || EMPTY_FINDINGS;
    const handleUpdateNotes = useCallback((zoneId, notes) => {
        setZoneNotes((prev) => ({ ...prev, [zoneId]: notes }));
    }, []);
    // ── Entity-centric entries (findings + procedures) ──────────────
    let entryIdCounter = useRef(0).current;
    const handleAddEntry = useCallback((partial) => {
        const fdis = targetFdis;
        const groupId = newGroupId(fdis);
        setAllEntries((prev) => [
            ...prev,
            ...fdis.map((fdi) => ({
                ...partial,
                id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${fdi}`,
                toothFdi: fdi,
                groupId,
            })),
        ]);
    }, [targetFdis, newGroupId]);
    const handleUpdateEntry = useCallback((id, patch) => {
        // Edits to a grouped entry propagate to its siblings (except per-tooth
        // identity), so a shared procedure stays in sync across the group.
        setAllEntries((prev) => {
            const target = prev.find((e) => e.id === id);
            if (target?.groupId) {
                return prev.map((e) => (e.groupId === target.groupId ? { ...e, ...patch } : e));
            }
            return prev.map((e) => (e.id === id ? { ...e, ...patch } : e));
        });
    }, []);
    const handleRemoveEntry = useCallback((id) => {
        setAllEntries((prev) => {
            const target = prev.find((e) => e.id === id);
            if (target?.groupId)
                return prev.filter((e) => e.groupId !== target.groupId);
            return prev.filter((e) => e.id !== id);
        });
    }, []);
    const handleUpdateTreatmentHistoryDetail = useCallback((name, patch) => {
        const fdis = targetFdis;
        const groupId = newGroupId(fdis);
        setTreatmentHistoryDetailsByTooth((prev) => {
            const next = { ...prev };
            for (const fdi of fdis) {
                const currentToothDetails = prev[fdi] || {};
                const existing = currentToothDetails[name];
                const previous = existing || { surfaces: getDefaultTreatmentSurfaces(name), groupId };
                next[fdi] = {
                    ...currentToothDetails,
                    [name]: { ...previous, ...patch, groupId: existing?.groupId ?? previous.groupId },
                };
            }
            return next;
        });
    }, [targetFdis, newGroupId]);
    const handleRemoveTreatmentHistoryDetail = useCallback((name) => {
        const fdi = selectedTooth.fdi;
        setTreatmentHistoryDetailsByTooth((prev) => {
            const toothMap = prev[fdi];
            if (!toothMap || !toothMap[name])
                return prev;
            const groupId = toothMap[name].groupId;
            const next = { ...prev };
            for (const [k, map] of Object.entries(prev)) {
                // Drop this named detail from the focused tooth, and from any tooth
                // sharing the same group when it spanned multiple teeth.
                if (k !== fdi && !(groupId && map[name]?.groupId === groupId))
                    continue;
                const { [name]: _removed, ...rest } = map;
                next[k] = rest;
            }
            return next;
        });
    }, [selectedTooth.fdi]);
    const handleClearTreatmentHistoryDetails = useCallback(() => {
        const fdi = selectedTooth.fdi;
        setTreatmentHistoryDetailsByTooth((prev) => {
            if (!prev[fdi])
                return prev;
            const next = { ...prev };
            delete next[fdi];
            return next;
        });
    }, [selectedTooth.fdi]);
    const handleSetHighlightZones = useCallback((zones) => {
        setHighlightZones(zones);
    }, []);
    const currentToothEntries = useMemo(() => allEntries.filter((e) => e.toothFdi === selectedTooth.fdi), [allEntries, selectedTooth.fdi]);
    // Emit state changes to parent (ExaminationTab) for the right-side panel
    useEffect(() => {
        if (!onStateChange)
            return;
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
            onSetOralHighlight: setOralHighlight,
        });
    }, [
        viewMode, patientType, selectedTooth, selectedZone, findings, toothDiagnoses, implantTeeth, findingsByTooth, toothNotes,
        treatmentHistoryDetailsByTooth,
        agentApplyPulseFdis, currentToothDiagnoses, currentToothNotes, currentTreatmentHistoryDetails, zoneNotes, isImplant, onStateChange,
        currentToothEntries, allEntries, highlightZones, multiSelectZones, multiSelectActive, hoveredToothFdi, selectionScope,
        toggleToothDiagnosis, toggleImplant, handleAddFinding, handleRemoveFinding,
        handleUpdateNotes, updateToothNotes, handleBackToDentition, handleSelectTooth, handleSelectScope, handleSelectZone, handleClearSelectedZone,
        handleAddEntry, handleUpdateEntry, handleRemoveEntry, handleUpdateTreatmentHistoryDetail, handleRemoveTreatmentHistoryDetail, handleClearTreatmentHistoryDetails, handleSetHighlightZones,
        handleToggleZoneMultiSelect, handleSetMultiSelectZones, handleClearMultiSelect, handleSetMultiSelectActive, handleSetHoveredTooth,
        oralEntries, oralNotes, oralHighlightFdis, addOralEntry, removeOralEntry, updateOralEntry, updateOralNotes, enterOralExam, setOralHighlight,
    ]);
    const isDentitionView = viewMode === 'dentition';
    const isOralView = viewMode === 'oral';
    const dentitionTitle = patientType === 'adult'
        ? 'Full Adult Dentition View'
        : patientType === 'pediatric'
            ? 'Full Pediatric Dentition View'
            : 'Full Mixed Dentition View';
    return (_jsx("div", { className: `dental-canvas-root ${isDentitionView ? 'dentition-mode' : ''} ${!isDentitionView ? 'has-tooth-selector' : ''} ${compact ? 'compact' : ''}`, children: _jsxs("div", { className: "viewer", children: [_jsx("div", { className: "viewer-header", children: isDentitionView ? (_jsx("div", { className: "tooth-name tooth-name--dentition", children: _jsx("span", { className: "tooth-name-text", children: dentitionTitle }, patientType) })) : (_jsxs("div", { className: "tooth-name", style: { paddingLeft: 6, gap: 3, cursor: 'pointer' }, onClick: handleBackToDentition, title: "Back to full dentition view", role: "button", children: [_jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", style: { flexShrink: 0 }, children: _jsx("path", { d: "M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08", stroke: "#1e293b", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10", strokeWidth: "2.2" }) }), selectionScope.type === 'tooth' ? (_jsxs(_Fragment, { children: [QUADRANT_LABELS[selectedTooth.quadrant], " ", selectedTooth.name, _jsxs("span", { className: "tooth-fdi", children: ["T", selectedTooth.fdi] })] })) : (_jsxs(_Fragment, { children: [isOralView ? 'Oral Examination' : selectionScope.type === 'full-mouth' ? 'Full Mouth View' : `${selectionScope.label} View`, _jsx("span", { className: "tooth-fdi", children: selectionScope.type === 'full-mouth' ? 'FULL' : (SCOPE_HEADER_BADGE[selectionScope.id] ?? selectionScope.id) })] }))] })) }), isDentitionView && dentitionGroupLabels.length > 0 && (_jsx(_Fragment, { children: Object.entries(dentitionGroupLabels.reduce((acc, g) => { (acc[g.scope] = acc[g.scope] || []).push(g.diag); return acc; }, {})).map(([scope, diags]) => { const pos = SCOPE_TAG_POS[scope]; if (!pos) return null; return (_jsx("div", { style: { position: 'absolute', left: `${pos.left}%`, top: `${pos.top}%`, transform: 'translate(-50%, -50%)', zIndex: 13, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, maxWidth: 170, pointerEvents: 'none' }, children: diags.map((d) => _jsx("span", { style: { fontSize: 11.5, fontWeight: 700, padding: '4px 11px', borderRadius: 999, background: 'rgba(15,23,42,0.9)', color: '#fff', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.2px', boxShadow: '0 4px 14px rgba(2,6,23,0.28)', whiteSpace: 'nowrap' }, children: d }, d)) }, scope)); }) })), isDentitionView && (_jsx("div", { className: dc.patientTypeHost, children: _jsxs("div", { className: dc.patientTypeTrack, children: [_jsx("button", { type: "button", onClick: () => handlePatientTypeChange('adult'), className: clsx(dc.patientTypeBtn, patientType === 'adult' && dc.patientTypeBtnActive), children: "Adult" }), _jsx("button", { type: "button", onClick: () => handlePatientTypeChange('pediatric'), className: clsx(dc.patientTypeBtn, patientType === 'pediatric' && dc.patientTypeBtnActive), children: "Pediatric" }), _jsx("button", { type: "button", onClick: () => handlePatientTypeChange('mixed'), className: clsx(dc.patientTypeBtn, patientType === 'mixed' && dc.patientTypeBtnActive), children: "Mixed" })] }) })), isDentitionView && (_jsx("div", { style: { position: 'absolute', left: 16, bottom: 16, zIndex: 21 }, children: _jsx(DentalChartPrintButton, { patientId: patientId }) })), isDentitionView && (_jsx("div", { className: dc.scopeHost, children: _jsxs("button", { type: "button", onClick: enterOralExam, title: "Record region-level oral findings & procedures", style: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, height: 42, padding: "0 18px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "Inter, sans-serif", background: "#fff", color: "var(--tp-blue-500)", border: "1.5px solid var(--tp-blue-500)", cursor: "pointer", transition: "background-color 150ms ease" }, onMouseEnter: (e) => { e.currentTarget.style.backgroundColor = "rgba(75,74,213,0.06)"; }, onMouseLeave: (e) => { e.currentTarget.style.backgroundColor = "#fff"; }, children: [_jsx("span", { style: { fontSize: 16, lineHeight: 1, fontWeight: 700, color: "var(--tp-blue-500)" }, children: "＋" }), _jsx("span", { children: "Oral Examination" })] }) })), isDentitionView && !hideExamineHint && (_jsxs("div", { style: {
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
                        fontFamily: 'Inter, sans-serif',
                    }, children: [_jsx(LottieIcon, { name: "arrow-up", size: 24, color: "#d5dde8" }), _jsx("span", { style: {
                                fontSize: '14px',
                                color: '#b7c3d4',
                                fontWeight: 500,
                                opacity: 0.72,
                                letterSpacing: '0.2px',
                                whiteSpace: 'nowrap',
                            }, children: "Click any tooth to examine" })] })), !isDentitionView && !isOralView && (_jsx(ToothSelector, { selectedTooth: selectedTooth, patientType: patientType, onSelectTooth: handleSelectTooth, toothDiagnoses: toothDiagnoses, viewMode: viewMode, onBackToDentition: handleBackToDentition, onSelectScope: handleToothScopeJump, selectionScope: selectionScope, getScopeFdis: getScopeFdis, findingsByTooth: findingsByTooth, implantTeeth: implantTeeth, allEntries: allEntries, toothNotes: toothNotes, onEnterOralExam: enterOralExam, surfaceSelector: (_jsx(QuickSurfaceSelector, { selectedZones: multiSelectActive
                            ? multiSelectZones
                            : (selectedZone ? new Set([selectedZone]) : new Set()), onToggleZone: handleToggleZoneFromQuickSelector, arch: selectedTooth.arch, toothPosition: selectedTooth.position, zonesWithFindings: new Set(findings.map(f => f.zoneId)), disabled: currentToothDiagnoses.has('Missing') || currentToothDiagnoses.has('Extraction') })) })), _jsxs(Canvas, { camera: { position: [0, 2.5, 13], fov: 35 }, dpr: [1, 1.5], gl: { antialias: true, toneMapping: 3, toneMappingExposure: 1.3, powerPreference: 'high-performance' }, performance: { min: 0.5 }, children: [_jsx("ambientLight", { intensity: 0.8 }), _jsx("directionalLight", { position: [3, 5, 4], intensity: 1.0 }), _jsx("directionalLight", { position: [-2, 3, -2], intensity: 0.4 }), _jsx("directionalLight", { position: [0, -2, 1], intensity: 0.3 }), _jsx(CameraController, { viewMode: viewMode, patientType: patientType, selectionScopeType: selectionScope.type, selectionScopeId: selectionScope.id, dentitionCameraOverride: dentitionCameraOverride, dentitionVerticalNudge: dentitionVerticalNudge, onDentitionVerticalNudgeChange: handleDentitionVerticalNudgeChange, controlsRef: controlsRef }), !isDentitionView && selectionScope.type === 'tooth' && (_jsx(ZoneCameraRotator, { zone: selectedZone, toothFdi: selectedTooth.fdi, quadrant: selectedTooth.quadrant, arch: selectedTooth.arch, controlsRef: controlsRef })), _jsx(Suspense, { fallback: null, children: isDentitionView ? (_jsx(DentitionView, { patientType: patientType, layoutMode: "split", toothDiagnoses: toothDiagnoses, findingsByTooth: findingsByTooth, implantTeeth: implantTeeth, onSelectTooth: handleSelectTooth, onHoverTooth: setHoveredToothFdi, externalHoveredFdi: hoveredToothFdi, allEntries: allEntries, toothNotes: toothNotes, agentPulseFdis: agentApplyPulseFdis, oralEntries: oralEntries, oralForceShowAll: showAllOralTooltips || hoverShowAllOral, treatmentHistoryDetailsByTooth: treatmentHistoryDetailsByTooth }, `dentition-${patientType}`)) : (selectionScope.type !== 'tooth' ? (_jsx(DentitionView, { patientType: patientType, visibleFdis: selectionScope.fdis, disableSelection: true, highlightFdis: oralHighlightFdis, layoutMode: 'split', toothDiagnoses: toothDiagnoses, findingsByTooth: findingsByTooth, implantTeeth: implantTeeth, onSelectTooth: handleSelectTooth, onHoverTooth: setHoveredToothFdi, externalHoveredFdi: hoveredToothFdi, allEntries: allEntries, toothNotes: toothNotes, agentPulseFdis: agentApplyPulseFdis, oralEntries: oralEntries, oralForceShowAll: showAllOralTooltips || hoverShowAllOral, treatmentHistoryDetailsByTooth: treatmentHistoryDetailsByTooth }, `scope-${patientType}-${selectionScope.type}-${selectionScope.id}`)) : (_jsx("group", { position: [0, -0.17, 0], children: _jsx(Tooth, { selectedZone: selectedZone, onSelectZone: handleSelectZone, onClearSelectedZone: handleClearSelectedZone, onHoverZone: setHoveredZone, modelPath: selectedTooth.modelPath, arch: selectedTooth.arch, mirrorX: selectedTooth.mirrorX, quadrant: selectedTooth.quadrant, toothPosition: selectedTooth.position, toothFdi: selectedTooth.fdi, isImplant: isImplant, findings: findings, zoneNotes: zoneNotes, toothDiagnoses: currentToothDiagnoses, multiSelectZones: multiSelectZones, multiSelectActive: multiSelectActive, hideTags: true, treatmentHistoryDetails: currentTreatmentHistoryDetails, toothEntries: currentToothEntries.map(e => ({ kind: e.kind, name: e.name, surfaces: e.surfaces })) }, `${selectedTooth.fdi}-${isImplant ? 'imp' : 'nat'}-${[...currentToothDiagnoses].sort().join(',')}`) }))) }), _jsx(OrbitControls, { ref: controlsRef, onEnd: handleDentitionControlsEnd, enableDamping: true, dampingFactor: 0.12, rotateSpeed: 0.8, minDistance: isDentitionView ? 6 : selectionScope.type === 'tooth' ? 2.05 : (selectionScope.type === 'quadrant' || (selectionScope.type === 'arch' && (selectionScope.id === 'RIGHT_ARCH' || selectionScope.id === 'LEFT_ARCH'))) ? 3.5 : 5, maxDistance: isDentitionView ? (patientType === 'mixed' ? 60 : 55) : selectionScope.type === 'tooth' ? 10.5 : (selectionScope.type === 'quadrant' || (selectionScope.type === 'arch' && (selectionScope.id === 'RIGHT_ARCH' || selectionScope.id === 'LEFT_ARCH'))) ? 30 : 55, enablePan: isDentitionView, touches: { ONE: 0, TWO: 2 } })] }), _jsx(CanvasLoader, {})] }) }));
}
