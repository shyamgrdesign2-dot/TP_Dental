"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useRxPadChrome } from "@/components/tp-rxpad/rxpad-chrome-context"
import { DrAgentFab } from "@/components/tp-rxpad/dr-agent/shell/DrAgentFab"
import { DrAgentPanel } from "@/components/tp-rxpad/dr-agent/DrAgentPanel"
import styles from "./TPRxPadShell.module.scss"

function RxPadDrAgentFab() {
  const { drAgentOpen, setDrAgentOpen } = useRxPadChrome()
  if (drAgentOpen) return null
  return <DrAgentFab onClick={() => setDrAgentOpen(true)} />
}

function RxPadDrAgentAside() {
  const { drAgentOpen, setDrAgentOpen } = useRxPadChrome()
  const searchParams = useSearchParams()
  const patientId = searchParams.get("patientId")?.trim() || "apt-1"

  if (!drAgentOpen) return null

  return (
    <aside
      className={cn(
        styles.drAgentAside,
        "flex shrink-0 flex-col border-tp-slate-200 bg-white",
        "min-h-0 max-h-[min(52vh,560px)] w-full border-t md:h-full md:max-h-none md:w-[clamp(350px,25vw,400px)] md:max-w-[400px] md:border-l md:border-t-0",
      )}
      aria-label="Dr. Agent"
    >
      <DrAgentPanel
        onClose={() => setDrAgentOpen(false)}
        mode="rxpad"
        initialPatientId={patientId}
        dentalChartPatientId={patientId}
      />
    </aside>
  )
}

export function TPRxPadShell({ topNav, sidebar, children }) {
  return (
    <div className={styles.root}>
      {topNav}
      <div className={styles.bodyRow}>
        <aside className={styles.aside}>{sidebar}</aside>
        <main className={styles.main}>
          {children}
          <Suspense fallback={null}>
            <RxPadDrAgentFab />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <RxPadDrAgentAside />
        </Suspense>
      </div>
    </div>
  )
}
