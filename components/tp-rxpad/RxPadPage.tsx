"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ClipboardText, Health, Receipt1 } from "iconsax-reactjs"
import cn from "clsx"

import { RxPad } from "@/components/rx/rxpad/RxPad"
import { ExaminationTab } from "@/components/dental/examination/ExaminationTab"
import { TreatmentPlanTab } from "@/components/dental/plan/TreatmentPlanTab"
import { RxPadSyncProvider } from "@/components/tp-rxpad/rxpad-sync-context"
import {
  TPRxPadSecondarySidebar,
  TPRxPadShell,
  TPRxPadTopNav,
} from "@/components/tp-ui"

type RxTabId = "base" | "dental" | "treatment-plan"

const RX_TABS: { id: RxTabId; label: string; Icon: React.ComponentType<any> }[] = [
  { id: "base",           label: "BaseRx",         Icon: ClipboardText },
  { id: "dental",         label: "Dental",          Icon: Health },
  { id: "treatment-plan", label: "Treatment Plan",  Icon: Receipt1 },
]

function RxPadInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams?.get("patientId") ?? "apt-1"
  const [activeTab, setActiveTab] = useState<RxTabId>("base")

  return (
    <RxPadSyncProvider>
      <TPRxPadShell
        topNav={
          <TPRxPadTopNav
            className="relative h-[62px] w-full bg-white"
            onBack={() => router.push("/appointments")}
          />
        }
        sidebar={<TPRxPadSecondarySidebar />}
      >
        {/* ── Tab bar ── */}
        <div className="shrink-0 bg-white relative z-10 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-center gap-0">
            {RX_TABS.map((tab) => {
              const isActive = activeTab === tab.id
              const Icon = tab.Icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "group relative flex shrink-0 items-center gap-[8px] px-[24px] h-[42px] text-[14px] font-medium transition-colors",
                    isActive
                      ? "text-tp-blue-600 font-semibold"
                      : "text-tp-slate-600 hover:text-tp-slate-800",
                  )}
                  aria-pressed={isActive}
                >
                  <Icon
                    size={20}
                    variant={isActive ? "Bulk" : "Linear"}
                    strokeWidth={isActive ? undefined : 1.5}
                    color={isActive ? "var(--tp-blue-500)" : "var(--tp-slate-500)"}
                  />
                  {tab.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-2 right-2 h-[3px] rounded-full transition-opacity",
                      isActive ? "bg-tp-blue-500 opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Active tab content ── */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {activeTab === "base" && <RxPad />}
          {activeTab === "dental" && <ExaminationTab patientId={patientId} />}
          {activeTab === "treatment-plan" && <TreatmentPlanTab patientId={patientId} />}
        </div>
      </TPRxPadShell>
    </RxPadSyncProvider>
  )
}

export function RxPadPage() {
  return (
    <Suspense>
      <RxPadInner />
    </Suspense>
  )
}
