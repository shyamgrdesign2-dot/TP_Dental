"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"

export type RxPadExamTabId = "base" | "dental"

type ChromeState = {
  drAgentOpen: boolean
  secondarySidebarActiveId: string | null
}

type ChromeAction =
  | { type: "set_dr_agent"; open: boolean }
  | { type: "set_dr_agent_functional"; fn: (prev: boolean) => boolean }
  | { type: "toggle_secondary"; id: string }
  | { type: "set_secondary"; id: string | null }

function chromeReducer(state: ChromeState, action: ChromeAction): ChromeState {
  switch (action.type) {
    case "set_dr_agent":
      if (action.open) {
        return { drAgentOpen: true, secondarySidebarActiveId: null }
      }
      return { ...state, drAgentOpen: false }
    case "set_dr_agent_functional": {
      const next = action.fn(state.drAgentOpen)
      if (next) {
        return { drAgentOpen: true, secondarySidebarActiveId: null }
      }
      return { ...state, drAgentOpen: false }
    }
    case "toggle_secondary": {
      const nextId = state.secondarySidebarActiveId === action.id ? null : action.id
      if (nextId) {
        return { drAgentOpen: false, secondarySidebarActiveId: nextId }
      }
      return { ...state, secondarySidebarActiveId: null }
    }
    case "set_secondary":
      if (action.id) {
        return { drAgentOpen: false, secondarySidebarActiveId: action.id }
      }
      return { ...state, secondarySidebarActiveId: null }
    default:
      return state
  }
}

export interface RxPadChromeContextValue {
  drAgentOpen: boolean
  setDrAgentOpen: Dispatch<SetStateAction<boolean>>
  secondarySidebarActiveId: string | null
  toggleSecondarySidebar: (id: string) => void
  setSecondarySidebarActiveId: (id: string | null) => void
  /** Mirrors RxPad carousel: clinical vs dental examination panel (for sidebars / deep links). */
  rxPadExamTab: RxPadExamTabId
  setRxPadExamTab: (tab: RxPadExamTabId) => void
}

export const RxPadChromeContext = createContext<RxPadChromeContextValue | null>(null)

export function RxPadChromeProvider({ children }: { children: ReactNode }) {
  const [rxPadExamTab, setRxPadExamTab] = useState<RxPadExamTabId>("base")
  const [state, dispatch] = useReducer(chromeReducer, {
    drAgentOpen: false,
    secondarySidebarActiveId: null,
  })

  const setDrAgentOpen = useCallback((open: SetStateAction<boolean>) => {
    if (typeof open === "function") {
      dispatch({ type: "set_dr_agent_functional", fn: open })
    } else {
      dispatch({ type: "set_dr_agent", open })
    }
  }, [])

  const toggleSecondarySidebar = useCallback((id: string) => {
    dispatch({ type: "toggle_secondary", id })
  }, [])

  const setSecondarySidebarActiveId = useCallback((id: string | null) => {
    dispatch({ type: "set_secondary", id })
  }, [])

  const value = useMemo(
    () => ({
      drAgentOpen: state.drAgentOpen,
      setDrAgentOpen,
      secondarySidebarActiveId: state.secondarySidebarActiveId,
      toggleSecondarySidebar,
      setSecondarySidebarActiveId,
      rxPadExamTab,
      setRxPadExamTab,
    }),
    [
      state.drAgentOpen,
      state.secondarySidebarActiveId,
      setDrAgentOpen,
      toggleSecondarySidebar,
      setSecondarySidebarActiveId,
      rxPadExamTab,
    ],
  )

  return <RxPadChromeContext.Provider value={value}>{children}</RxPadChromeContext.Provider>
}

export function useRxPadChrome(): RxPadChromeContextValue {
  const ctx = useContext(RxPadChromeContext)
  if (!ctx) {
    throw new Error("useRxPadChrome must be used within RxPadChromeProvider")
  }
  return ctx
}
