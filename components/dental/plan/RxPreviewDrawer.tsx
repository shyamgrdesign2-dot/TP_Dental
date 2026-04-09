"use client"

import {
  TPDrawer,
  TPDrawerContent,
  TPDrawerFooter,
} from "@/components/tp-ui/tp-drawer"
import { Printer } from "iconsax-reactjs"
import { usePlanContext } from "./plan-context"
import { DrawerHeader } from "./plan-shared"

export function RxPreviewDrawer() {
  const { state, closeDrawer } = usePlanContext()
  const drawer = state.drawer

  const isOpen = drawer.type === "rx-preview"
  const planId = isOpen ? (drawer as { planId: string }).planId : null
  const serviceId = isOpen ? (drawer as { serviceId?: string }).serviceId : undefined

  const plan = planId ? state.plans.find((p) => p.id === planId) : null
  const services = plan
    ? serviceId
      ? plan.services.filter((s) => s.id === serviceId)
      : plan.services
    : []

  return (
    <TPDrawer open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <TPDrawerContent side="right" size="md" className="!rounded-none">
        <DrawerHeader
          title="Dental Prescription"
          onClose={closeDrawer}
          action={
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-[6px] h-[42px] min-w-[120px] rounded-[10px] px-[20px] font-sans text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 transition-colors shadow-sm">
              <Printer size={16} variant="Linear" />
              Print RX
            </button>
          }
        />

        <div className="flex-1 overflow-y-auto px-[24px] py-[16px]">
          {plan && (
            <div className="space-y-[16px]">
              {/* Rx Header */}
              <div className="rounded-[10px] border border-tp-slate-200 p-[16px] bg-tp-slate-50/50">
                <p className="font-sans text-[14px] font-bold text-tp-slate-900">Dr. Sheela B R</p>
                <p className="font-sans text-[12px] text-tp-slate-500">BDS, MDS — Conservative Dentistry</p>
                <p className="font-sans text-[12px] text-tp-slate-400 mt-[2px]">Apex Ortho Clinic, Bengaluru</p>
                <div className="h-px bg-tp-slate-200 my-[10px]" />
                <div className="grid grid-cols-2 gap-[8px]">
                  <div>
                    <p className="font-sans text-[12px] font-semibold uppercase text-tp-slate-400">Patient</p>
                    <p className="font-sans text-[12px] font-medium text-tp-slate-800">Shyam GR, 25M</p>
                  </div>
                  <div>
                    <p className="font-sans text-[12px] font-semibold uppercase text-tp-slate-400">ID</p>
                    <p className="font-sans text-[12px] font-medium text-tp-slate-800">PAT0061</p>
                  </div>
                  <div>
                    <p className="font-sans text-[12px] font-semibold uppercase text-tp-slate-400">Date</p>
                    <p className="font-sans text-[12px] font-medium text-tp-slate-800">
                      {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-[12px] font-semibold uppercase text-tp-slate-400">Plan</p>
                    <p className="font-sans text-[12px] font-medium text-tp-slate-800">{plan.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-[8px]">
                <span className="font-serif text-[24px] font-bold text-tp-blue-600">&#8478;</span>
                <span className="font-sans text-[13px] font-semibold text-tp-slate-700">Procedures Performed</span>
              </div>

              <div className="space-y-[12px]">
                {services.map((svc, idx) => (
                  <div key={svc.id} className="flex gap-[10px]">
                    <span className="shrink-0 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-tp-blue-100 font-sans text-[12px] font-bold text-tp-blue-700">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-[13px] font-semibold text-tp-slate-800">
                        {svc.treatment}
                        <span className="ml-[6px] font-sans text-[12px] font-normal text-tp-slate-400">
                          — {svc.toothFdi === "full-mouth" ? "Full Mouth" : `T${svc.toothFdi}`}
                        </span>
                      </p>
                      <p className="font-sans text-[12px] text-tp-slate-500">{svc.toothLabel}</p>
                      <p className="font-sans text-[12px] text-tp-slate-400 mt-[2px]">
                        {svc.sittings.length} sitting{svc.sittings.length !== 1 ? "s" : ""} · {svc.status === "completed" ? "Completed" : svc.status === "in-progress" ? "Active" : "Planned"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-[24px] pt-[16px] border-t border-tp-slate-200">
                <div className="flex justify-end">
                  <div className="text-right">
                    <div className="h-[40px]" />
                    <div className="h-px w-[160px] bg-tp-slate-300 mb-[4px]" />
                    <p className="font-sans text-[12px] text-tp-slate-500">Doctor&apos;s Signature</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </TPDrawerContent>
    </TPDrawer>
  )
}
