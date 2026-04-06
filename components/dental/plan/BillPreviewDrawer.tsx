"use client"

/**
 * BillPreviewDrawer — Right-side drawer showing itemized bill.
 * Supports plan-level (all services) or single-service view.
 */

import {
  TPDrawer,
  TPDrawerContent,
  TPDrawerFooter,
} from "@/components/tp-ui/tp-drawer"
import { Printer } from "iconsax-reactjs"
import { usePlanContext } from "./plan-context"
import { formatINR, DrawerHeader } from "./plan-shared"

export function BillPreviewDrawer() {
  const { state, closeDrawer } = usePlanContext()
  const drawer = state.drawer

  const isOpen = drawer.type === "bill-preview"
  const planId = isOpen ? (drawer as { planId: string }).planId : null
  const serviceId = isOpen ? (drawer as { serviceId?: string }).serviceId : undefined

  const plan = planId ? state.plans.find((p) => p.id === planId) : null
  const services = plan
    ? serviceId
      ? plan.services.filter((s) => s.id === serviceId)
      : plan.services
    : []

  const subtotal = services.reduce((sum, s) => sum + s.rate, 0)
  const discount = services.reduce((sum, s) => sum + s.discount, 0)
  const total = services.reduce((sum, s) => sum + s.amount, 0)

  return (
    <TPDrawer open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <TPDrawerContent side="right" size="md" className="!rounded-none">
        <DrawerHeader
          title="Bill Preview"
          onClose={closeDrawer}
          action={
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-[6px] h-[42px] min-w-[120px] rounded-[10px] px-[20px] font-sans text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 transition-colors shadow-sm"
            >
              <Printer size={16} variant="Linear" />
              Print Bill
            </button>
          }
        />

        <div className="flex-1 overflow-y-auto px-[24px] py-[16px]">
          {plan && (
            <>
              {/* Header info */}
              <div className="mb-[16px] space-y-[4px]">
                <p className="font-sans text-[12px] text-tp-slate-500">
                  <span className="font-semibold text-tp-slate-700">Plan:</span> {plan.name}
                </p>
                <p className="font-sans text-[12px] text-tp-slate-500">
                  <span className="font-semibold text-tp-slate-700">Date:</span> {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                {serviceId && (
                  <p className="font-sans text-[12px] text-tp-blue-600 font-medium">
                    Showing single service bill
                  </p>
                )}
              </div>

              {/* Service table */}
              <div className="rounded-[10px] border border-tp-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-tp-slate-50">
                      <th className="px-[12px] py-[8px] text-left font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400">Service</th>
                      <th className="px-[12px] py-[8px] text-right font-sans text-[12px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 w-[90px]">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((svc) => (
                      <tr key={svc.id} className="border-t border-tp-slate-100">
                        <td className="px-[12px] py-[10px]">
                          <p className="font-sans text-[12px] font-medium text-tp-slate-800">
                            {svc.treatment}
                          </p>
                          <p className="font-sans text-[12px] text-tp-slate-400">
                            {svc.toothFdi === "full-mouth" ? "Full Mouth" : `T${svc.toothFdi} — ${svc.toothLabel}`}
                          </p>
                        </td>
                        <td className="px-[12px] py-[10px] text-right font-sans text-[12px] text-tp-slate-700">
                          {formatINR(svc.rate)}
                          {svc.discount > 0 && (
                            <p className="font-sans text-[12px] text-tp-error-500">-{formatINR(svc.discount)}</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="border-t border-tp-slate-200 bg-tp-slate-50/50 px-[12px] py-[10px] space-y-[4px]">
                  <div className="flex justify-between font-sans text-[12px]">
                    <span className="text-tp-slate-500">Subtotal</span>
                    <span className="text-tp-slate-700">{formatINR(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between font-sans text-[12px]">
                      <span className="text-tp-slate-500">Discount</span>
                      <span className="text-tp-error-500">-{formatINR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-sans text-[13px] font-bold pt-[4px] border-t border-tp-slate-200">
                    <span className="text-tp-slate-800">Total</span>
                    <span className="text-tp-blue-700">{formatINR(total)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

      </TPDrawerContent>
    </TPDrawer>
  )
}
