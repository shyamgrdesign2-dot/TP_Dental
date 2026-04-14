"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * TreatmentPlanTab — Shell component with context provider, tab pills,
 * tab switch, and drawer outlet. Complete rewrite from monolithic prototype.
 */
import { useCallback, useState } from "react";
import clsx from "clsx";
import { PlanProvider, usePlanContext } from "./plan-context";
import { TabPill } from "./plan-shared";
import { PlanEstimatesTab } from "./PlanEstimatesTab";
import { InProgressTab } from "./InProgressTab";
import { CompletedTab } from "./CompletedTab";
import { AddEditPlanDrawer } from "./AddEditPlanDrawer";
import { BillPreviewDrawer } from "./BillPreviewDrawer";
import { RxPreviewDrawer } from "./RxPreviewDrawer";
import { BookAppointmentDrawer } from "./BookAppointmentDrawer";
import { AddSittingDrawer } from "./AddSittingDrawer";
import { AddProcedureDrawer } from "./AddProcedureDrawer";
import dui from "../dental-ui.module.scss";
import "./plan-print-styles.css";
// ─── Inner component (inside context) ──────────────────────
function TreatmentPlanInner({ activeTab, setActiveTab }) {
    const { estimatePlans, inProgressPlans, completedPlans, embedInPatientShell } = usePlanContext();
    return (_jsxs("div", { className: clsx(dui.tpTabRoot, embedInPatientShell && dui.tpTabRootEmbed), children: [_jsx("div", { className: clsx(dui.tpTabHeader, embedInPatientShell && dui.tpTabHeaderEmbed), children: _jsxs("div", { className: dui.tpTabPills, children: [_jsx(TabPill, { id: "estimates", label: "Plan Estimates", count: estimatePlans.length, active: activeTab === "estimates", onClick: () => setActiveTab("estimates") }), _jsx(TabPill, { id: "progress", label: "Active Plans", count: inProgressPlans.length, active: activeTab === "progress", onClick: () => setActiveTab("progress") }), _jsx(TabPill, { id: "completed", label: "Completed", count: completedPlans.length, active: activeTab === "completed", onClick: () => setActiveTab("completed") })] }) }), _jsxs("div", { className: dui.tpTabBody, children: [activeTab === "estimates" && _jsx(PlanEstimatesTab, {}), activeTab === "progress" && _jsx(InProgressTab, {}), activeTab === "completed" && _jsx(CompletedTab, {})] }), _jsx(AddEditPlanDrawer, {}), _jsx(BillPreviewDrawer, {}), _jsx(RxPreviewDrawer, {}), _jsx(BookAppointmentDrawer, {}), _jsx(AddSittingDrawer, {}), _jsx(AddProcedureDrawer, {})] }));
}
export function TreatmentPlanTab({ patientId, patientAge = 30, initialTab = "estimates", initialDrawer, embedInPatientShell = false, }) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const handleNavigateTab = useCallback((tab) => {
        if (tab === "estimates" || tab === "progress" || tab === "completed") {
            setActiveTab(tab);
        }
    }, []);
    return (_jsx(PlanProvider, { patientId: patientId, onNavigateTab: handleNavigateTab, initialDrawer: initialDrawer, embedInPatientShell: embedInPatientShell, children: _jsx(TreatmentPlanInner, { activeTab: activeTab, setActiveTab: setActiveTab }) }));
}
