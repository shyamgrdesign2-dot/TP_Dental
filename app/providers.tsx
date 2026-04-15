"use client"

import type { ReactNode } from "react"
import { RxPadSyncProvider } from "@/components/tp-rxpad/rxpad-sync-context"
import { RxPadChromeProvider } from "@/components/tp-rxpad/rxpad-chrome-context"
import { DrAgentLayoutShell } from "@/components/tp-rxpad/DrAgentLayoutShell"
import { BillingCatalogProvider } from "@/lib/billing-catalog-context"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <RxPadSyncProvider>
      <RxPadChromeProvider>
        <BillingCatalogProvider>
          <DrAgentLayoutShell>{children}</DrAgentLayoutShell>
        </BillingCatalogProvider>
      </RxPadChromeProvider>
    </RxPadSyncProvider>
  )
}
