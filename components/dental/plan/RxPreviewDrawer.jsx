"use client";

import { Building2 } from "lucide-react";
import { Printer } from "iconsax-reactjs";
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer";
import { getAppointmentPatient } from "@/lib/appointment-patients";
import { usePlanContext } from "./plan-context";
import { DrawerHeader, PLAN_DRAWER_PANEL_CLASS } from "./plan-shared";

function formatProcedureStatus(status) {
    switch (status) {
        case "completed":
            return "Completed";
        case "in-progress":
            return "In progress";
        case "not-started":
            return "Not started";
        case "no-show":
            return "Patient no-show";
        case "not-interested":
            return "Not interested";
        default:
            return status ? String(status).replace(/-/g, " ") : "—";
    }
}

function serviceToothLine(svc) {
    if (svc.toothFdi === "full-mouth")
        return "Full mouth";
    return `T${svc.toothFdi} — ${svc.toothLabel}`;
}

export function RxPreviewDrawer() {
    const { state, closeDrawer, patientId: ctxPatientId } = usePlanContext();
    const drawer = state.drawer;
    const isOpen = drawer.type === "rx-preview";
    const planId = isOpen ? drawer.planId : null;
    const serviceId = isOpen ? drawer.serviceId : undefined;
    const plan = planId ? state.plans.find((p) => p.id === planId) : null;
    const services = plan
        ? serviceId
            ? plan.services.filter((s) => s.id === serviceId)
            : plan.services
        : [];

    const patient = plan
        ? getAppointmentPatient(plan.patientId || ctxPatientId || "apt-1")
        : null;

    const today = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const mobileDisplay = patient?.mobile?.replace(/^\+91-/, "") ?? "—";

    return (
        <TPDrawer open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
            <TPDrawerContent side="right" size="lg" className={`${PLAN_DRAWER_PANEL_CLASS} flex flex-col`}>
                <DrawerHeader
                    title="Dental prescription"
                    onClose={closeDrawer}
                    action={
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex h-[42px] min-w-[120px] items-center gap-[6px] rounded-[10px] bg-tp-blue-600 px-[20px] font-['Inter',sans-serif] text-[14px] font-semibold text-white transition-colors hover:bg-tp-blue-700"
                        >
                            <Printer size={16} variant="Linear" />
                            Print RX
                        </button>
                    }
                />
                <div className="min-h-0 flex-1 overflow-y-auto bg-tp-slate-50/80 px-[24px] py-[16px]">
                    {plan && patient && (
                        <article className="overflow-hidden rounded-[12px] border border-tp-slate-200 bg-white font-['Inter',sans-serif] shadow-sm">
                            {/* Letterhead — same clinic block as bill preview */}
                            <div className="flex items-start gap-[12px] px-[16px] py-[14px]">
                                <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] bg-tp-blue-50 text-tp-blue-500">
                                    <Building2 size={26} strokeWidth={1.6} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[14px] font-bold text-tp-slate-900">TP Dental Care</p>
                                    <p className="text-[12px] font-medium text-tp-slate-600">Dr. Umesh Aggarwal, BDS, MDS</p>
                                    <p className="text-[10px] text-tp-slate-500">Reg. ID: DCI-2342342 | +91 78945 61230</p>
                                    <p className="text-[10px] text-tp-slate-500">K9 Sardar Bungalow, Prahladnagar, Ahmedabad</p>
                                </div>
                            </div>
                            <div className="h-px bg-tp-slate-100" aria-hidden />
                            {/* Patient + visit context — continuous with letterhead (no separate card) */}
                            <div className="grid grid-cols-2 gap-x-[16px] gap-y-[6px] bg-tp-slate-50/70 px-[16px] py-[12px] text-[12px] text-tp-slate-600">
                                <p>
                                    <span className="font-semibold text-tp-slate-700">Patient name:</span> {patient.name}
                                </p>
                                <p>
                                    <span className="font-semibold text-tp-slate-700">Patient ID:</span> {patient.patientCode}
                                </p>
                                <p>
                                    <span className="font-semibold text-tp-slate-700">Age / sex:</span> {patient.age} Y, {patient.genderLabel}
                                </p>
                                <p>
                                    <span className="font-semibold text-tp-slate-700">Mobile:</span> {mobileDisplay}
                                </p>
                                <p>
                                    <span className="font-semibold text-tp-slate-700">Blood group:</span> {patient.bloodGroup}
                                </p>
                                <p>
                                    <span className="font-semibold text-tp-slate-700">Date:</span> {today}
                                </p>
                                <p className="col-span-2">
                                    <span className="font-semibold text-tp-slate-700">Treatment plan:</span> {plan.name}
                                </p>
                            </div>
                            {serviceId && (
                                <p className="border-t border-tp-slate-100 px-[16px] py-[8px] text-[12px] font-medium text-tp-blue-600">
                                    Prescription limited to the selected service line.
                                </p>
                            )}
                            <div className="h-px bg-tp-slate-100" aria-hidden />
                            {/* Prescription body — inside same sheet */}
                            <div className="px-[16px] py-[14px]">
                                <div className="mb-[12px] flex flex-wrap items-end gap-x-[10px] gap-y-[4px] border-b border-tp-slate-100 pb-[10px]">
                                    <span className="font-serif text-[26px] font-bold leading-none text-tp-blue-600">℞</span>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[13px] font-semibold text-tp-slate-800">Clinical procedures (treatment record)</p>
                                        <p className="text-[11px] leading-snug text-tp-slate-500">
                                            Step-wise procedures performed or planned under this treatment plan. For charting, billing alignment, and
                                            medico-legal documentation.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-0">
                                    {services.map((svc, svcIdx) => {
                                        const procs = svc.procedures ?? [];
                                        return (
                                            <div
                                                key={svc.id}
                                                className={svcIdx > 0 ? "mt-[12px] border-t border-tp-slate-100 pt-[12px]" : ""}
                                            >
                                                <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-tp-slate-500">
                                                    {svc.treatment}
                                                    <span className="ml-[6px] font-normal normal-case tracking-normal text-tp-slate-400">
                                                        ({serviceToothLine(svc)})
                                                    </span>
                                                </p>
                                                {procs.length === 0 ? (
                                                    <p className="mt-[6px] text-[12px] leading-relaxed text-tp-slate-500">
                                                        No step-wise procedures recorded for this line yet.
                                                    </p>
                                                ) : (
                                                    <ol className="m-0 mt-[8px] list-decimal space-y-[8px] pl-[18px] text-[12px] leading-[1.55] text-tp-slate-700 marker:text-tp-slate-400">
                                                        {procs.map((p) => (
                                                            <li key={p.id} className="pl-[4px]">
                                                                <span className="font-semibold text-tp-slate-800">{p.name}</span>
                                                                <span className="text-tp-slate-500">
                                                                    {" "}
                                                                    — {p.date || "—"} · {p.doctor || "—"} · {formatProcedureStatus(p.status)}
                                                                </span>
                                                                {p.notes ? (
                                                                    <span className="mt-[2px] block text-[11px] text-tp-slate-500">{p.notes}</span>
                                                                ) : null}
                                                            </li>
                                                        ))}
                                                    </ol>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="border-t border-tp-slate-100 px-[16px] py-[14px]">
                                <div className="flex justify-end">
                                    <div className="text-right">
                                        <div className="h-[36px]" aria-hidden />
                                        <div className="mb-[4px] ml-auto h-px w-[160px] bg-tp-slate-300" />
                                        <p className="text-[11px] text-tp-slate-500">Authorised signatory / treating dentist</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-tp-slate-100 bg-tp-slate-50/50 px-[16px] py-[10px] text-center text-[10px] text-tp-slate-500">
                                support@tpdentalcare.com | www.tpdentalcare.com
                            </div>
                        </article>
                    )}
                </div>
            </TPDrawerContent>
        </TPDrawer>
    );
}
