"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * CanvasLoader — shimmer overlay shown over the 3D dental viewer ONLY when the
 * scene takes longer than SHOW_DELAY_MS to load. On fast networks/devices the
 * GLBs land before the timer fires and this never renders, so users never see
 * a flash of loader for sub-second loads.
 *
 * Uses drei's `useProgress` to track the GLTF/DRACO loaders. The artwork is a
 * single inline tooth SVG (~400 bytes) with a CSS mask-based shimmer sweep.
 */
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

const SHOW_DELAY_MS = 2000;

export function CanvasLoader() {
    const { active } = useProgress();
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!active) { setVisible(false); return; }
        const t = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
        return () => clearTimeout(t);
    }, [active]);
    if (!visible) return null;
    return _jsxs("div", {
        className: "tp-3d-loader",
        role: "status",
        "aria-label": "Loading 3D dental view",
        children: [
            _jsx("style", { children: STYLES }),
            _jsx("div", { className: "tp-3d-loader__art", dangerouslySetInnerHTML: { __html: TEETH_SVG } }),
            _jsx("span", { className: "tp-3d-loader__label", children: "Loading 3D view…" }),
        ],
    });
}

const TEETH_SVG = `<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M50 8C32 8 20 22 22 44c2 22 6 38 12 50 4 8 9 4 11-6l3-16c.4-2 3-2 3.4 0l3 16c2 10 7 14 11 6 6-12 10-28 12-50C82 22 68 8 50 8Z" fill="currentColor"/></svg>`;

const STYLES = `
.tp-3d-loader { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; pointer-events: none; z-index: 5; background: linear-gradient(180deg, rgba(248,250,252,0.92), rgba(241,245,249,0.92)); animation: tp-3d-loader-fade 200ms ease-out both; }
.tp-3d-loader__art { width: 72px; height: 80px; color: #cbd5e1; -webkit-mask-image: linear-gradient(110deg, rgba(0,0,0,0.55) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.55) 70%); mask-image: linear-gradient(110deg, rgba(0,0,0,0.55) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.55) 70%); -webkit-mask-size: 220% 100%; mask-size: 220% 100%; animation: tp-3d-loader-shimmer 1.6s linear infinite; }
.tp-3d-loader__art svg { display: block; width: 100%; height: 100%; }
.tp-3d-loader__label { font: 500 12px/1 'Inter', sans-serif; color: #64748b; letter-spacing: 0.2px; }
@keyframes tp-3d-loader-shimmer { 0% { -webkit-mask-position: 110% 0; mask-position: 110% 0; } 100% { -webkit-mask-position: -110% 0; mask-position: -110% 0; } }
@keyframes tp-3d-loader-fade { from { opacity: 0; } to { opacity: 1; } }
`;
