"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * TreatmentPlanPage — Standalone full-page layout for dental treatment planning.
 * Has its own header with back button and title. No RxPad shell dependency.
 */
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import dui from "../dental-ui.module.scss";
import { TreatmentPlanTab } from "./TreatmentPlanTab";
import { getMockPlans } from "./plan-mock-data";
function getInitialDrawer(drawerParam, tab, plans) {
    if (!drawerParam)
        return { type: "closed" };
    const inProgressPlan = plans.find((plan) => plan.status === "in-progress");
    const completedPlan = plans.find((plan) => plan.status === "completed");
    const firstServiceFrom = (plan) => plan?.services?.[0];
    if (drawerParam === "add-plan")
        return { type: "add-plan" };
    if (drawerParam === "edit-plan")
        return plans[0] ? { type: "edit-plan", planId: plans[0].id } : { type: "closed" };
    if (drawerParam === "add-sitting") {
        const service = firstServiceFrom(inProgressPlan);
        return service ? { type: "add-sitting", serviceId: service.id } : { type: "closed" };
    }
    if (drawerParam === "add-procedure") {
        const service = firstServiceFrom(inProgressPlan);
        return service ? { type: "add-procedure", serviceId: service.id } : { type: "closed" };
    }
    if (drawerParam === "book-appointment") {
        const plan = tab === "completed" ? completedPlan : inProgressPlan;
        if (!plan)
            return { type: "closed" };
        const service = firstServiceFrom(plan);
        return { type: "book-appointment", planId: plan.id, serviceId: service?.id };
    }
    if (drawerParam === "bill-preview") {
        const plan = tab === "completed" ? completedPlan : inProgressPlan;
        if (!plan)
            return { type: "closed" };
        const service = firstServiceFrom(plan);
        return { type: "bill-preview", planId: plan.id, serviceId: service?.id };
    }
    if (drawerParam === "rx-preview") {
        if (!completedPlan)
            return { type: "closed" };
        const service = firstServiceFrom(completedPlan);
        return { type: "rx-preview", planId: completedPlan.id, serviceId: service?.id };
    }
    return { type: "closed" };
}
function TreatmentPlanInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const patientId = searchParams?.get("patientId") ?? "apt-1";
    const fromPage = searchParams?.get("from") ?? "rxpad";
    const tabParam = searchParams?.get("tab");
    const drawerParam = searchParams?.get("drawer");
    const initialTab = tabParam === "progress" || tabParam === "completed" || tabParam === "estimates"
        ? tabParam
        : "estimates";
    const plans = getMockPlans(patientId);
    const initialDrawer = getInitialDrawer(drawerParam, initialTab, plans);
    const handleBack = () => {
        const q = encodeURIComponent(patientId);
        if (fromPage === "patient-detail") {
            router.push(`/patient-detail?patientId=${q}`);
        }
        else if (fromPage === "appointments") {
            router.push("/appointments");
        }
        else {
            router.push(`/rxpad?patientId=${q}`);
        }
    };
    return (_jsxs("div", { className: dui.shellRoot, children: [_jsx("header", { className: dui.tpPageHeader, children: _jsxs("div", { className: dui.tpPageHeaderRow, children: [_jsxs("button", { type: "button", "aria-label": "Go back", onClick: handleBack, "data-name": "Back Button", className: dui.shellBackBtn, children: [_jsx("div", { "aria-hidden": "true", className: dui.shellBackRule }), _jsx("div", { className: dui.tpPageBackIconWrap, "data-name": "Back Arrow", children: _jsx(ChevronLeft, { size: 24, strokeWidth: 2, className: dui.tpPageBackChevron, color: "#454551" }) })] }), _jsx("div", { className: dui.tpPageTitleArea, children: _jsx("h1", { className: dui.tpPageTitle, children: "Dental Treatment Plan" }) })] }) }), _jsx("div", { className: dui.tpPageMain, children: _jsx(TreatmentPlanTab, { patientId: patientId, initialTab: initialTab, initialDrawer: initialDrawer }) })] }));
}
function TreatmentPlanEmbedInner({ patientId }) {
    const pid = patientId ?? "apt-1";
    const searchParams = useSearchParams();
    const tabParam = searchParams?.get("tab");
    const drawerParam = searchParams?.get("drawer");
    const initialTab = tabParam === "progress" || tabParam === "completed" || tabParam === "estimates"
        ? tabParam
        : "estimates";
    const plans = getMockPlans(pid);
    const initialDrawer = getInitialDrawer(drawerParam, initialTab, plans);
    return (_jsx("div", { className: "h-full min-h-0 min-w-0", children: _jsx(TreatmentPlanTab, { patientId: pid, initialTab: initialTab, initialDrawer: initialDrawer, embedInPatientShell: true }) }));
}
/** Inline dental plan for patient detail — no standalone page chrome. */
export function TreatmentPlanEmbed({ patientId }) {
    return (_jsx(Suspense, { fallback: _jsx("div", { className: "flex min-h-[200px] items-center justify-center font-['Inter',sans-serif] text-sm text-tp-slate-500", children: "Loading\u2026" }), children: _jsx(TreatmentPlanEmbedInner, { patientId: patientId }) }));
}
export function TreatmentPlanPage() {
    return (_jsx(Suspense, { children: _jsx(TreatmentPlanInner, {}) }));
}
