"use client"

import { Suspense, type ReactNode } from "react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { DrAgentFab } from "@/components/tp-rxpad/dr-agent/shell/DrAgentFab"
import { DrAgentPanel } from "@/components/tp-rxpad/dr-agent/DrAgentPanel"
import { useRxPadChrome } from "@/components/tp-rxpad/rxpad-chrome-context"

function DrAgentLayoutShellInner({ children }: { children: ReactNode }) {
  const { drAgentOpen: open, setDrAgentOpen: setOpen } = useRxPadChrome()
  const searchParams = useSearchParams()
  const urlPatientId = searchParams.get("patientId")?.trim() || "apt-1"
  const dentalChartPatientId = urlPatientId

  return (
    <div className="flex h-[100dvh] min-h-0 w-full flex-col overflow-hidden md:flex-row">
      {/* Main app — flex-1; when agent opens, remaining space shrinks (in-flow, not overlay) */}
      <div className="relative min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">{children}</div>

      {open ? (
        <aside
          className={cn(
            "flex shrink-0 flex-col border-tp-slate-200 bg-white",
            "min-h-0 max-h-[min(52vh,560px)] w-full border-t md:h-full md:max-h-none md:w-[clamp(350px,25vw,400px)] md:max-w-[400px] md:border-l md:border-t-0",
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
