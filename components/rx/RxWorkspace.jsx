"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { Receipt, Activity, BookOpen, Eye, FolderOpen, ShieldCheck, Heart, Users, Ruler, Calendar, FlaskConical, } from "lucide-react";
import { TPPatientInfoHeader } from "@/components/tp-ui/tp-patient-info-header";
import { ExpandedPanel } from "./ExpandedPanel";
import { PastVisitPanel, VitalsPanel, HistoryPanel, OphthalPanel, GynecPanel, ObstetricPanel, VaccinePanel, GrowthPanel, LabResultsPanel, MedicalRecordsPanel, FollowUpPanel, } from "./sections";
import { RxPad } from "./rxpad/RxPad";
import { samplePatient, samplePastVisits, sampleVitals, sampleHistory, sampleOphthal, sampleGynec, sampleObstetric, sampleVaccines, sampleGrowth, sampleLabReports, sampleDocuments, sampleFollowUps, } from "./sample-data";
/**
 * RX Workspace — Full Layout
 * ──────────────────────────
 * Combines: Secondary Nav Sidebar (dark) + Expanded Section Panel + RxPad Content Area
 *
 * Layout (desktop):
 *   ┌──────┬────────────┬──────────────────────────────────┐
 *   │ 80px │  360px     │  flex-1 (scrollable)             │
 *   │ Nav  │  Expanded  │  RxPad                           │
 *   │      │  Panel     │                                  │
 *   └──────┴────────────┴──────────────────────────────────┘
 *
 * Design tokens (dark sidebar variant for RxWorkspace):
 *   - Nav sidebar: 80px, dark blue gradient
 *   - Active item: white bg icon with blue icon color
 *   - Inactive: semi-transparent white containers, white icons
 *   - Left highlight bar: 3px white
 *   - Right arrow: white triangle
 *   - Labels: white text
 */
const SECONDARY_NAV_TOKENS = {
    panelWidth: 80,
    itemPaddingX: 6,
    itemPaddingY: 12,
    iconLabelGap: 6,
    iconContainerSize: 32,
    iconContainerRadius: 10,
    iconSize: 20,
    highlightBarWidth: 3,
    highlightBarRadius: 12,
    arrowWidth: 8,
    arrowHeight: 16,
    labelWidth: 68,
    labelSize: 12,
    labelLineHeight: 18,
    labelTracking: 0.1,
    badgeSize: 10,
    badgePaddingLeft: 4,
    badgePaddingRight: 2,
    badgePaddingY: 4,
    badgeRadius: 30,
    bottomFadeHeight: 120,
};
const navItems = [
    { id: "past-visits", label: "Past Visits", icon: "Receipt", iconComponent: Receipt, count: 3 },
    {
        id: "vitals", label: "Vitals", icon: "Activity", iconComponent: Activity, count: 3,
        badge: { text: "New", gradient: "linear-gradient(257.32deg, rgb(22, 163, 74) 0%, rgb(68, 207, 119) 47.222%, rgb(22, 163, 74) 94.444%)" },
    },
    {
        id: "history", label: "History", icon: "BookOpen", iconComponent: BookOpen,
        badge: { text: "Trial", gradient: "linear-gradient(257.32deg, rgb(241, 82, 35) 0%, rgb(255, 152, 122) 47.222%, rgb(241, 82, 35) 94.444%)" },
    },
    { id: "ophthal", label: "Ophthal", icon: "Eye", iconComponent: Eye, count: 1 },
    { id: "gynec", label: "Gynec", icon: "Heart", iconComponent: Heart, count: 1 },
    { id: "obstetric", label: "Obstetric", icon: "Users", iconComponent: Users },
    { id: "vaccine", label: "Vaccine", icon: "ShieldCheck", iconComponent: ShieldCheck },
    { id: "growth", label: "Growth", icon: "Ruler", iconComponent: Ruler, count: 3 },
    { id: "records", label: "Records", icon: "FolderOpen", iconComponent: FolderOpen, count: 4 },
    { id: "lab-results", label: "Lab Results", icon: "FlaskConical", iconComponent: FlaskConical, count: 3 },
    { id: "follow-up", label: "Follow-up", icon: "Calendar", iconComponent: Calendar, count: 4 },
];
const sectionTitles = {
    "past-visits": "Past Visits",
    "vitals": "Vitals",
    "history": "Medical History",
    "ophthal": "Ophthalmic History",
    "gynec": "Gynaecological History",
    "obstetric": "Obstetric History",
    "vaccine": "Vaccination Records",
    "growth": "Growth Records",
    "lab-results": "Lab Results",
    "records": "Medical Records",
    "follow-up": "Follow-up",
};
function getSectionIcon(sectionId) {
    const item = navItems.find(n => n.id === sectionId);
    if (!item)
        return null;
    const Icon = item.iconComponent;
    return _jsx(Icon, { size: 18, color: "#4b4ad5" });
}
export function RxWorkspace() {
    const [activeSection, setActiveSection] = useState("past-visits");
    const [expandedSection, setExpandedSection] = useState("past-visits");
    const handleNavSelect = useCallback((id) => {
        const sectionId = id;
        setActiveSection(sectionId);
        setExpandedSection(prev => prev === sectionId ? null : sectionId);
    }, []);
    const handleClosePanel = useCallback(() => {
        setExpandedSection(null);
    }, []);
    const handleCopyToRxPad = useCallback((data) => {
        // In a real implementation, this would update the RxPad state
        console.log("Copy to RxPad:", data);
    }, []);
    const currentItem = navItems.find(n => n.id === activeSection);
    return (_jsxs("div", { className: "flex h-screen w-full flex-col overflow-hidden bg-[#f1f1f5]", children: [_jsx(TPPatientInfoHeader, { patient: {
                    name: samplePatient.name,
                    age: samplePatient.age,
                    gender: samplePatient.gender,
                    bloodGroup: samplePatient.bloodGroup,
                    uhid: samplePatient.uhid,
                    phone: samplePatient.phone,
                }, visitInfo: {
                    type: "OPD",
                    date: "24 Jun 2025",
                    tokenNumber: 3,
                } }), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsxs("nav", { className: "relative flex h-full flex-col overflow-x-clip shrink-0", style: {
                            width: SECONDARY_NAV_TOKENS.panelWidth,
                            background: "radial-gradient(256.21% 808.53% at -194.95% 36.46%, var(--core-primary-900, #161558) 0%, #232277 25%, #313097 50%, #4B4AD5 100%), #FFF",
                        }, children: [_jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden", children: navItems.map((item) => {
                                    const Icon = item.iconComponent;
                                    const isActive = activeSection === item.id;
                                    return (_jsxs("button", { onClick: () => handleNavSelect(item.id), className: "group relative flex w-full shrink-0 items-center transition-colors", style: {
                                            backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "transparent",
                                        }, children: [_jsxs("div", { className: "flex flex-1 flex-col items-center", style: {
                                                    gap: SECONDARY_NAV_TOKENS.iconLabelGap,
                                                    paddingInline: SECONDARY_NAV_TOKENS.itemPaddingX,
                                                    paddingBlock: SECONDARY_NAV_TOKENS.itemPaddingY,
                                                }, children: [_jsxs("span", { className: "relative flex shrink-0 items-center justify-center transition-transform group-hover:scale-[1.02]", style: {
                                                            width: SECONDARY_NAV_TOKENS.iconContainerSize,
                                                            height: SECONDARY_NAV_TOKENS.iconContainerSize,
                                                            borderRadius: SECONDARY_NAV_TOKENS.iconContainerRadius,
                                                            backgroundColor: isActive ? "var(--tp-slate-0)" : "rgba(255,255,255,0.25)",
                                                        }, children: [!isActive && (_jsx("span", { className: "pointer-events-none absolute inset-0 rounded-[10px] opacity-0 transition-opacity group-hover:opacity-100", style: { backgroundColor: "rgba(255,255,255,0.28)" } })), _jsx(Icon, { size: SECONDARY_NAV_TOKENS.iconSize, color: isActive ? "var(--tp-blue-500)" : "var(--tp-slate-0)" })] }), _jsx("span", { className: "overflow-hidden text-center font-medium leading-[18px]", style: {
                                                            width: SECONDARY_NAV_TOKENS.labelWidth,
                                                            fontFamily: "var(--font-sans)",
                                                            fontSize: SECONDARY_NAV_TOKENS.labelSize,
                                                            lineHeight: `${SECONDARY_NAV_TOKENS.labelLineHeight}px`,
                                                            letterSpacing: `${SECONDARY_NAV_TOKENS.labelTracking}px`,
                                                            color: "var(--tp-slate-0)",
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            wordBreak: "break-word",
                                                        }, children: item.label })] }), isActive && (_jsx("span", { className: "absolute left-0 top-0 bottom-0", style: {
                                                    width: SECONDARY_NAV_TOKENS.highlightBarWidth,
                                                    backgroundColor: "var(--tp-slate-0)",
                                                    borderTopRightRadius: SECONDARY_NAV_TOKENS.highlightBarRadius,
                                                    borderBottomRightRadius: SECONDARY_NAV_TOKENS.highlightBarRadius,
                                                } })), isActive && expandedSection && (_jsx("span", { className: "absolute", style: { right: 0, top: "50%", transform: "translateY(-50%)" }, children: _jsx("svg", { width: SECONDARY_NAV_TOKENS.arrowWidth, height: SECONDARY_NAV_TOKENS.arrowHeight, viewBox: "0 0 8 16", fill: "var(--tp-slate-0)", style: { display: "block" }, children: _jsx("path", { d: "M8 0L0 8L8 16V0Z" }) }) })), item.badge && (_jsx("span", { className: "absolute flex items-center justify-center font-medium", style: {
                                                    top: 20.5,
                                                    right: 0,
                                                    fontSize: SECONDARY_NAV_TOKENS.badgeSize,
                                                    lineHeight: "normal",
                                                    color: "var(--tp-slate-0)",
                                                    backgroundImage: item.badge.gradient,
                                                    borderTopLeftRadius: SECONDARY_NAV_TOKENS.badgeRadius,
                                                    borderBottomLeftRadius: SECONDARY_NAV_TOKENS.badgeRadius,
                                                    paddingLeft: SECONDARY_NAV_TOKENS.badgePaddingLeft,
                                                    paddingRight: SECONDARY_NAV_TOKENS.badgePaddingRight,
                                                    paddingBlock: SECONDARY_NAV_TOKENS.badgePaddingY,
                                                    fontFamily: "var(--font-sans)",
                                                }, children: item.badge.text })), !isActive && (_jsx("span", { className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100", style: { backgroundColor: "rgba(255,255,255,0.12)" } }))] }, item.id));
                                }) }), _jsx("div", { className: "pointer-events-none absolute left-0 bottom-0 z-10", style: {
                                    width: SECONDARY_NAV_TOKENS.panelWidth,
                                    height: SECONDARY_NAV_TOKENS.bottomFadeHeight,
                                    background: "linear-gradient(180deg, rgba(22, 21, 88, 0.00) 0%, #161558 100%)",
                                } })] }), expandedSection && (_jsxs(ExpandedPanel, { sectionId: expandedSection, title: sectionTitles[expandedSection], icon: getSectionIcon(expandedSection), isOpen: true, onClose: handleClosePanel, count: currentItem?.count, children: [expandedSection === "past-visits" && (_jsx(PastVisitPanel, { visits: samplePastVisits, onCopyToRxPad: handleCopyToRxPad })), expandedSection === "vitals" && (_jsx(VitalsPanel, { readings: sampleVitals, onCopyToRxPad: handleCopyToRxPad })), expandedSection === "history" && (_jsx(HistoryPanel, { history: sampleHistory, onCopyToRxPad: handleCopyToRxPad })), expandedSection === "ophthal" && (_jsx(OphthalPanel, { entries: sampleOphthal, onCopyToRxPad: handleCopyToRxPad })), expandedSection === "gynec" && (_jsx(GynecPanel, { entries: sampleGynec, onCopyToRxPad: handleCopyToRxPad })), expandedSection === "obstetric" && (_jsx(ObstetricPanel, { history: sampleObstetric, onCopyToRxPad: handleCopyToRxPad })), expandedSection === "vaccine" && (_jsx(VaccinePanel, { categories: sampleVaccines, onCopyToRxPad: handleCopyToRxPad })), expandedSection === "growth" && (_jsx(GrowthPanel, { records: sampleGrowth, onCopyToRxPad: handleCopyToRxPad })), expandedSection === "lab-results" && (_jsx(LabResultsPanel, { reports: sampleLabReports, onCopyToRxPad: handleCopyToRxPad })), expandedSection === "records" && (_jsx(MedicalRecordsPanel, { documents: sampleDocuments, onCopyToRxPad: handleCopyToRxPad })), expandedSection === "follow-up" && (_jsx(FollowUpPanel, { entries: sampleFollowUps, onCopyToRxPad: handleCopyToRxPad }))] })), _jsx("main", { className: "flex-1 overflow-y-auto bg-[#f1f1f5]/80", children: _jsx(RxPad, {}) })] })] }));
}
