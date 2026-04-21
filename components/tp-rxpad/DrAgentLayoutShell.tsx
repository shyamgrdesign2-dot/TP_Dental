"use client"

import { Suspense, useEffect, type ReactNode } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { DrAgentFab } from "@/components/tp-rxpad/dr-agent/shell/DrAgentFab"
import { DrAgentPanel } from "@/components/tp-rxpad/dr-agent/DrAgentPanel"
import { useRxPadChrome } from "@/components/tp-rxpad/rxpad-chrome-context"

/**
 * Global class for primary content columns on legacy (non-RxPad shell) routes.
 * When Dr. Agent is open, `globals.css` adds padding so content doesn't sit under the fixed panel.
 */
export const DR_AGENT_MAIN_RESERVE_CLASS = "dr-agent-main-reserve"

/** Dr. Agent panel + FAB for routes that are not wrapped by `TPRxPadShell` (e.g. appointments). */
function LegacyDrAgentChrome() {
  const { drAgentOpen: open, setDrAgentOpen: setOpen } = useRxPadChrome()
  const searchParams = useSearchParams()
  const pathname = usePathname() ?? ""
  const urlPatientId = searchParams.get("patientId")?.trim() || "apt-1"
  const dentalChartPatientId = urlPatientId

  // Patient detail page has no 62px app header — panel should fill full height.
  const isPatientDetail = pathname.startsWith("/patient-detail")

  return (
    <>
      {open ? (
        <aside
          className={cn(
            "pointer-events-auto fixed z-[35] flex min-h-0 flex-col border-tp-slate-200 bg-white shadow-[0_0_24px_-8px_rgba(23,23,37,0.18)]",
            /* Mobile: bottom sheet */
            "inset-x-0 bottom-0 max-h-[min(52vh,560px)] w-full border-t",
            /* md+: dock right — page stays full width; panel only covers main band */
            "md:inset-x-auto md:bottom-0 md:left-auto md:right-0 md:max-h-none md:w-[300px] lg:w-[clamp(350px,30vw,400px)] md:border-l md:border-t-0",
            isPatientDetail ? "md:top-0" : "md:top-[62px]",
          )}
          aria-label="Dr. Agent"
        >
          <DrAgentPanel
            onClose={() => setOpen(false)}
            mode="rxpad"
            initialPatientId={urlPatientId}
            dentalChartPatientId={dentalChartPatientId}
          />
        </aside>
      ) : null}
      {!open ? <DrAgentFab onClick={() => setOpen(true)} /> : null}
    </>
  )
}

/**
 * Push-layout Dr. Agent chrome — for routes where the panel should push content
 * side-by-side (like RxPad), not overlay as a fixed panel.
 */
function PushDrAgentChrome() {
  const { drAgentOpen: open, setDrAgentOpen: setOpen } = useRxPadChrome()
  const searchParams = useSearchParams()
  const urlPatientId = searchParams.get("patientId")?.trim() || "apt-1"
  const dentalChartPatientId = urlPatientId

  return (
    <>
      {open ? (
        <aside
          className="flex min-h-0 w-[300px] lg:w-[clamp(350px,30vw,400px)] shrink-0 flex-col border-l border-tp-slate-200 bg-white"
          aria-label="Dr. Agent"
        >
          <DrAgentPanel
            onClose={() => setOpen(false)}
            mode="rxpad"
            initialPatientId={urlPatientId}
            dentalChartPatientId={dentalChartPatientId}
          />
        </aside>
      ) : null}
      {!open ? <DrAgentFab onClick={() => setOpen(true)} /> : null}
    </>
  )
}

function DrAgentLayoutShellInner({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? ""
  const isRxPadShellRoute = pathname.startsWith("/rxpad")
  const { drAgentOpen: open } = useRxPadChrome()

  // Treatment-plan page: Dr. Agent pushes content (side-by-side) instead of overlaying.
  const isTreatmentPlan = pathname.startsWith("/treatment-plan")

  useEffect(() => {
    if (isRxPadShellRoute || isTreatmentPlan) {
      document.documentElement.removeAttribute("data-dr-agent-open")
      return
    }
    if (open) {
      document.documentElement.setAttribute("data-dr-agent-open", "true")
    } else {
      document.documentElement.removeAttribute("data-dr-agent-open")
    }
    return () => {
      document.documentElement.removeAttribute("data-dr-agent-open")
    }
  }, [isRxPadShellRoute, isTreatmentPlan, open])

  if (isRxPadShellRoute) {
    return <>{children}</>
  }

  // Treatment-plan: flex row — panel pushes content instead of overlaying.
  if (isTreatmentPlan) {
    return (
      <div className="relative flex h-[100dvh] min-h-0 w-full overflow-hidden">
        <div className="relative flex-1 min-h-0 min-w-0 overflow-x-hidden overflow-y-auto">
          {children}
        </div>
        <Suspense fallback={null}>
          <PushDrAgentChrome />
        </Suspense>
      </div>
    )
  }

  // Default: fixed overlay for other routes (appointments, patient-detail, etc.)
  return (
    <div className="relative h-[100dvh] min-h-0 w-full overflow-hidden">
      <div className="relative h-full min-h-0 w-full overflow-x-hidden overflow-y-auto">{children}</div>
      <Suspense fallback={null}>
        <LegacyDrAgentChrome />
      </Suspense>
    </div>
  )
}

export function DrAgentLayoutShell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] w-full">{children}</div>}>
      <DrAgentLayoutShellInner>{children}</DrAgentLayoutShellInner>
    </Suspense>
  )
}
