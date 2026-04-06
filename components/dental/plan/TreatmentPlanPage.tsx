"use client"

/**
 * TreatmentPlanPage — Standalone full-page layout for dental treatment planning.
 * Has its own header with back button and title. No RxPad shell dependency.
 */

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { TreatmentPlanTab } from "./TreatmentPlanTab"

function TreatmentPlanInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams?.get("patientId") ?? "apt-1"
  const fromPage = searchParams?.get("from") ?? "rxpad"

  const handleBack = () => {
    if (fromPage === "patient-detail") {
      router.push(`/patient-detail?patientId=${patientId}`)
    } else {
      router.push(`/rxpad?patientId=${patientId}`)
    }
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-tp-slate-50">
      {/* Header — matches RxPad back button pattern */}
      <header className="shrink-0 bg-white border-b border-tp-slate-100 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
        <div className="flex h-[62px] items-center">
          <button
            type="button"
            aria-label="Go back"
            onClick={handleBack}
            data-name="Back Button"
            className="bg-white flex h-[62px] items-center justify-center px-[15px] py-[20px] relative shrink-0 w-[80px] transition-colors hover:bg-tp-slate-50"
          >
            <div aria-hidden="true" className="absolute border-[#f1f1f5] border-r-[0.5px] border-solid inset-[0_-0.25px_0_0] pointer-events-none" />
            <div className="relative shrink-0 size-[24px]" data-name="Back Arrow">
              <ChevronLeft size={24} strokeWidth={2} className="opacity-70" color="#454551" />
            </div>
          </button>
          <div className="flex items-center px-[16px]">
            <h1 className="font-sans text-[16px] font-semibold text-tp-slate-800">
              Dental Treatment Plan
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <TreatmentPlanTab patientId={patientId} />
      </div>
    </div>
  )
}

export function TreatmentPlanPage() {
  return (
    <Suspense>
      <TreatmentPlanInner />
    </Suspense>
  )
}
