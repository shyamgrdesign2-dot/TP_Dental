"use client";

import { Building2 } from "lucide-react";
import { Printer, DocumentDownload } from "iconsax-reactjs";
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { getAppointmentPatient } from "@/lib/appointment-patients";
import { usePlanContext } from "./plan-context";
import { DrawerHeader, PLAN_DRAWER_PANEL_CLASS } from "./plan-shared";

const RX_ACTION_ICON_CLASS =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-200";


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
                    title="Consolidated Rx"
                    onClose={closeDrawer}
                    action={
                        <div className="flex items-center gap-[8px]">
                            <Tooltip delayDuration={200}>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={() => window.print()}
                                        className={RX_ACTION_ICON_CLASS}
                                        aria-label="Download Rx"
                                    >
                                        <DocumentDownload size={18} variant="Linear" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" sideOffset={6}>
                                    Download Rx
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip delayDuration={200}>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={() => window.print()}
                                        className={RX_ACTION_ICON_CLASS}
                                        aria-label="Print Rx"
                                    >
                                        <Printer size={18} variant="Linear" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" sideOffset={6}>
                                    Print Rx
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    }
                />
                <div className="min-h-0 flex-1 overflow-y-auto bg-tp-slate-50/80 px-[24px] py-[16px]">
                    {plan && patient && (
                        <article className="overflow-hidden rounded-[12px] border border-tp-slate-200 bg-white font-['Inter',sans-serif] shadow-sm">
                            {/* Letterhead */}
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
                            {/* Patient info */}
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
                            {/* Service sections */}
                            {services.map((svc, svcIdx) => {
                                const sittings = svc.sittings ?? [];
                                const toothNum = svc.toothFdi === "full-mouth" ? null : svc.toothFdi;
                                return (
                                    <div
                                        key={svc.id}
                                        className={`px-[16px] py-[14px] text-[12px] text-tp-slate-700 space-y-[14px] ${svcIdx > 0 ? "border-t border-tp-slate-100" : ""}`}
                                    >
                                        {/* Treatment Details */}
                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-[0.05em] text-tp-slate-700 mb-[4px]">
                                                Treatment Details
                                            </p>
                                            <p className="text-[12px] text-tp-slate-700">
                                                <span className="font-semibold text-tp-slate-900">{svc.treatment}</span>
                                                <span className="text-tp-slate-300 mx-[6px]">|</span>
                                                {toothNum ? `T${toothNum}` : "Full Mouth"}
                                                {(svc.surfaces ?? []).length > 0 && (
                                                    <>
                                                        <span className="text-tp-slate-300 mx-[6px]">|</span>
                                                        {svc.surfaces.join(", ")}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        {/* Visit History */}
                                        {sittings.length > 0 ? (
                                            <div>
                                                <p className="text-[11px] font-bold uppercase tracking-[0.05em] text-tp-slate-700 mb-[8px]">
                                                    Visit History
                                                </p>
                                                <div className="space-y-[6px]">
                                                    {sittings.map((sit, idx) => (
                                                        <div
                                                            key={sit.id}
                                                            className="rounded-[10px] bg-tp-slate-50 px-[12px] py-[9px]"
                                                        >
                                                            <p className="text-[12px] font-bold text-tp-slate-700 mb-[3px]">
                                                                Visit {idx + 1}
                                                            </p>
                                                            <p className="text-[12px] text-tp-slate-600">
                                                                <span className="font-medium">{sit.doctor || "—"}</span>
                                                                {sit.date && (
                                                                    <span className="text-tp-slate-500">, {sit.date}</span>
                                                                )}
                                                            </p>
                                                            {sit.notes ? (
                                                                <p className="mt-[4px] text-[11px] leading-[1.55] text-tp-slate-600">
                                                                    <span className="font-bold text-tp-slate-700">Clinical Notes: </span>
                                                                    {sit.notes}
                                                                </p>
                                                            ) : (
                                                                <p className="mt-[3px] text-[11px] text-tp-slate-400 italic">
                                                                    No clinical notes recorded.
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-[12px] text-tp-slate-400 italic">
                                                No visits recorded yet.
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                            {/* Footer */}
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
