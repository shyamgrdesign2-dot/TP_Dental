"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"
import {
  type BillingItem,
  BILLING_CATALOG_STORAGE_KEY,
  buildInitialBillingItems,
} from "@/lib/billing-catalog"

type BillingCatalogContextValue = {
  items: BillingItem[]
  setItems: Dispatch<SetStateAction<BillingItem[]>>
  addItem: (item: BillingItem) => void
}

const BillingCatalogContext = createContext<BillingCatalogContextValue | null>(null)

function readStoredItems(): BillingItem[] | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(BILLING_CATALOG_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed) || parsed.length === 0) return null
    return parsed as BillingItem[]
  } catch {
    return null
  }
}

export function BillingCatalogProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BillingItem[]>(() => buildInitialBillingItems())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = readStoredItems()
    if (stored) setItems(stored)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return
    try {
      window.localStorage.setItem(BILLING_CATALOG_STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore quota */
    }
  }, [items, hydrated])

  const addItem = useCallback((item: BillingItem) => {
    setItems((prev) => [...prev, item])
  }, [])

  const value = useMemo(
    () => ({
      items,
      setItems,
      addItem,
    }),
    [items, addItem],
  )

  return <BillingCatalogContext.Provider value={value}>{children}</BillingCatalogContext.Provider>
}

export function useBillingCatalog() {
  const ctx = useContext(BillingCatalogContext)
  if (!ctx) {
    throw new Error("useBillingCatalog must be used within BillingCatalogProvider")
  }
  return ctx
}
