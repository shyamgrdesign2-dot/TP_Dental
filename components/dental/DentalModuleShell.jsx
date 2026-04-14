"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * DentalModuleShell — full-screen dental module with top nav + 2-tab secondary sidebar.
 * Tabs:
 *   1. Examination / Findings → 3D dental canvas (ported from 3D_Dental_R3F)
 *   2. Treatment Plan → PRD-spec table with auto-calculation
 */
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { Health, ClipboardText } from "iconsax-reactjs";
import { ExaminationTab } from "./examination/ExaminationTab";
import { TreatmentPlanTab } from "./plan/TreatmentPlanTab";
import dui from "./dental-ui.module.scss";
import { APPOINTMENT_PATIENTS } from "@/lib/appointment-patients";
const PATIENT_NAMES = {
    ...Object.fromEntries(Object.entries(APPOINTMENT_PATIENTS).map(([id, p]) => [
        id,
        `${p.name}, ${p.age}${p.genderShort}`,
    ])),
    // Legacy PAT-* IDs retained for direct testing
    "PAT-001": "Aarav Mehta, 34M",
    "PAT-002": "Priya Sharma, 28F",
    "PAT-003": "Rahul Verma, 9M",
    "PAT-004": "Sneha Reddy, 42F",
};
export function DentalModuleShell() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const patientId = searchParams?.get("patientId") ?? "PAT-001";
    const rawName = PATIENT_NAMES[patientId] || "Unknown, 30M";
    const ageMatch = rawName.match(/(\d+)[MF]/);
    const patientAge = ageMatch ? parseInt(ageMatch[1], 10) : 30;
    const [activeTab, setActiveTab] = useState("examination");
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const saved = window.localStorage.getItem(`dental.module.active-tab.${patientId}`);
        if (saved === "examination" || saved === "plan") {
            setActiveTab(saved);
        }
    }, [patientId]);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        window.localStorage.setItem(`dental.module.active-tab.${patientId}`, activeTab);
    }, [activeTab, patientId]);
    const handleBack = () => {
        router.push(`/rxpad?patientId=${patientId}`);
    };
    return (_jsxs("div", { className: dui.shellRoot, children: [_jsxs("header", { className: dui.shellHeader, children: [_jsxs("button", { type: "button", onClick: handleBack, "aria-label": "Go back", className: dui.shellBackBtn, children: [_jsx("div", { "aria-hidden": "true", className: dui.shellBackRule }), _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#454551", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { opacity: 0.7 }, children: _jsx("path", { d: "m15 18-6-6 6-6" }) })] }), _jsxs("div", { className: dui.shellTitleCol, children: [_jsx("h1", { className: dui.shellTitle, children: "Dental Module" }), _jsxs("p", { className: dui.shellSubtitle, children: ["Tooth-wise examination & treatment planning - ", rawName] })] })] }), _jsxs("div", { className: dui.shellBody, children: [_jsxs("nav", { "aria-label": "Dental module tabs", className: dui.shellNav, style: {
                            backgroundImage: "radial-gradient(120% 120% at 20% 0%, rgb(75,74,213) 0%, rgb(49,48,151) 50%, rgb(22,21,88) 100%)",
                        }, children: [_jsx(TabButton, { icon: _jsx(Health, { size: 20, variant: activeTab === "examination" ? "Bulk" : "Linear", color: activeTab === "examination" ? "var(--tp-blue-500)" : "#FFFFFF", strokeWidth: 1.5 }), label: "Exam", active: activeTab === "examination", onClick: () => setActiveTab("examination") }), _jsx(TabButton, { icon: _jsx(ClipboardText, { size: 20, variant: activeTab === "plan" ? "Bulk" : "Linear", color: activeTab === "plan" ? "var(--tp-blue-500)" : "#FFFFFF", strokeWidth: 1.5 }), label: "Plan", active: activeTab === "plan", onClick: () => setActiveTab("plan") })] }), _jsx("main", { className: dui.shellMain, children: activeTab === "examination" ? (_jsx(ExaminationTab, { patientId: patientId, patientAge: patientAge })) : (_jsx(TreatmentPlanTab, { patientId: patientId, patientAge: patientAge })) })] })] }));
}
function TabButton({ icon, label, active, onClick, }) {
    return (_jsxs("button", { type: "button", onClick: onClick, "aria-pressed": active, className: dui.tabNavBtn, children: [_jsx("div", { className: clsx(dui.tabNavIconWrap, active ? dui.tabNavIconOn : dui.tabNavIconOff), children: icon }), _jsx("span", { className: clsx(dui.tabNavLabel, active ? dui.tabNavLabelOn : dui.tabNavLabelOff), children: label }), active && (_jsx("span", { className: dui.tabNavCaret }))] }));
}
