"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import DentitionView from "./DentitionView";
export function MiniScopeCanvas({ patientType, scopeType, fdis, toothDiagnoses, findingsByTooth, implantTeeth, size = 40, }) {
    const camZ = scopeType === "full-mouth" ? 23 : scopeType === "arch" ? 21.2 : 20;
    return (_jsx("div", { style: { width: size, height: size, pointerEvents: "none", position: "relative" }, children: _jsxs(Canvas, { camera: { position: [0, 0.35, camZ], fov: 35 }, dpr: [1, 1.5], gl: { antialias: true, toneMapping: 3, toneMappingExposure: 1.35, alpha: true }, style: { pointerEvents: "none", width: "100%", height: "100%", display: "block" }, children: [_jsx("ambientLight", { intensity: 0.9 }), _jsx("directionalLight", { position: [2, 3, 3], intensity: 0.8 }), _jsx("directionalLight", { position: [-2, 1, -2], intensity: 0.3 }), _jsx(Suspense, { fallback: null, children: _jsx("group", { scale: 0.95, children: _jsx(DentitionView, { patientType: patientType, visibleFdis: fdis, disableSelection: true, layoutMode: scopeType === "full-mouth" ? "natural" : "split", toothDiagnoses: toothDiagnoses, findingsByTooth: findingsByTooth, implantTeeth: implantTeeth, onSelectTooth: () => { } }) }) })] }) }));
}
