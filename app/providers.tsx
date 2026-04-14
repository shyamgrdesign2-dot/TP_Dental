"use client"

import type { ReactNode } from "react"
import { RxPadSyncProvider } from "@/components/tp-rxpad/rxpad-sync-context"
import { RxPadChromeProvider } from "@/components/tp-rxpad/rxpad-chrome-context"
import { DrAgentLayoutShell } from "@/components/tp-rxpad/DrAgentLayoutShell"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <RxPadSyncProvider>
      <RxPadChromeProvider>
        <DrAgentLayoutShell>{children}</DrAgentLayoutShell>
      </RxPadChromeProvider>
    </RxPadSyncProvider>
  )
}
