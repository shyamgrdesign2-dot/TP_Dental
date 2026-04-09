"use client"

/**
 * plan-context.tsx — React context + useReducer for treatment plan state.
 *
 * Provides: state, dispatch, and derived selectors (estimatePlans,
 * inProgressPlans, completedPlans, activePlan).
 */

import React, { createContext, useContext, useMemo, useReducer } from "react"
import type {
  DrawerState,
  PlanAction,
  PlanService,
  PlanState,
  TreatmentPlan,
} from "./plan-types"
import { genId } from "./plan-types"
import { getMockPlans } from "./plan-mock-data"

// ─── Reducer ────────────────────────────────────────────────

function planReducer(state: PlanState, action: PlanAction): PlanState {
  switch (action.type) {
    // ── Plan CRUD ────────────────────────────────────────

    case "ADD_PLAN":
      return { ...state, plans: [...state.plans, action.plan] }

    case "UPDATE_PLAN":
      return {
        ...state,
        plans: state.plans.map((p) =>
          p.id === action.planId ? { ...p, ...action.patch, updatedAt: new Date().toISOString().slice(0, 10) } : p,
        ),
      }

    case "DELETE_PLAN":
      return { ...state, plans: state.plans.filter((p) => p.id !== action.planId) }

    case "DUPLICATE_PLAN": {
      const source = state.plans.find((p) => p.id === action.planId)
      if (!source) return state
      const newPlanId = genId("plan")
      const dup: TreatmentPlan = {
        ...source,
        id: newPlanId,
        name: `${source.name} (Copy)`,
        status: "draft",
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
        services: source.services.map((s) => ({
          ...s,
          id: genId("svc"),
          planId: newPlanId,
          status: "planned" as const,
          surfaces: [...s.surfaces],
          sittings: [],
          procedures: [],
          startedAt: undefined,
          completedAt: undefined,
        })),
      }
      return { ...state, plans: [...state.plans, dup] }
    }

    // ── Plan lifecycle ───────────────────────────────────

    case "ACTIVATE_PLAN":
      return {
        ...state,
        plans: state.plans.map((p) => {
          if (p.id === action.planId) return { ...p, status: "active" as const }
          // Demote any current active → draft
          if (p.status === "active") return { ...p, status: "draft" as const }
          return p
        }),
      }

    case "START_TREATMENT":
      return {
        ...state,
        plans: state.plans.map((p) => {
          if (p.id !== action.planId) return p
          if (p.status !== "draft" && p.status !== "active") return p
          const now = new Date().toISOString().slice(0, 10)
          return {
            ...p,
            status: "in-progress" as const,
            updatedAt: now,
            services: p.services.map((s) => ({
              ...s,
              status: "in-progress" as const,
              startedAt: s.startedAt ?? now,
            })),
          }
        }),
      }

    case "REVERT_PLAN_TO_ESTIMATES":
      return {
        ...state,
        plans: state.plans.map((p) => {
          if (p.id !== action.planId) return p
          if (p.status !== "in-progress") return p
          return {
            ...p,
            status: "draft" as const,
            updatedAt: new Date().toISOString().slice(0, 10),
            services: p.services.map((s) => ({
              ...s,
              status: "planned" as const,
              startedAt: undefined,
              completedAt: undefined,
              sittings: [],
              procedures: [],
            })),
          }
        }),
      }

    case "MARK_PLAN_COMPLETED": {
      const now = new Date().toISOString().slice(0, 10)
      return {
        ...state,
        plans: state.plans.map((p) => {
          if (p.id !== action.planId) return p
          return {
            ...p,
            status: "completed" as const,
            updatedAt: now,
            services: p.services.map((s) => ({
              ...s,
              status: "completed" as const,
              completedAt: s.completedAt ?? now,
            })),
          }
        }),
      }
    }

    case "REVERT_PLAN_TO_PROGRESS":
      return {
        ...state,
        plans: state.plans.map((p) => {
          if (p.id !== action.planId) return p
          if (p.status !== "completed") return p
          return {
            ...p,
            status: "in-progress" as const,
            updatedAt: new Date().toISOString().slice(0, 10),
            services: p.services.map((s) => ({
              ...s,
              status: "in-progress" as const,
              completedAt: undefined,
            })),
          }
        }),
      }

    // ── Service CRUD ─────────────────────────────────────

    case "ADD_SERVICE":
      return {
        ...state,
        plans: state.plans.map((p) =>
          p.id === action.planId
            ? { ...p, services: [...p.services, action.service], updatedAt: new Date().toISOString().slice(0, 10) }
            : p,
        ),
      }

    case "UPDATE_SERVICE":
      return {
        ...state,
        plans: state.plans.map((p) => ({
          ...p,
          services: p.services.map((s) =>
            s.id === action.serviceId ? { ...s, ...action.patch } : s,
          ),
        })),
      }

    case "REMOVE_SERVICE":
      return {
        ...state,
        plans: state.plans.map((p) => ({
          ...p,
          services: p.services.filter((s) => s.id !== action.serviceId),
        })),
      }

    case "MARK_SERVICE_COMPLETED": {
      const now = new Date().toISOString().slice(0, 10)
      let newPlans = state.plans.map((p) => ({
        ...p,
        services: p.services.map((s) =>
          s.id === action.serviceId
            ? { ...s, status: "completed" as const, completedAt: now }
            : s,
        ),
      }))
      // Auto-promote plan to completed if all services are now completed
      newPlans = newPlans.map((p) => {
        if (p.status !== "in-progress") return p
        const allDone = p.services.length > 0 && p.services.every((s) => s.status === "completed")
        if (allDone) return { ...p, status: "completed" as const, updatedAt: now }
        return p
      })
      return { ...state, plans: newPlans }
    }

    case "REVERT_SERVICE_TO_PROGRESS":
      return {
        ...state,
        plans: state.plans.map((p) => ({
          ...p,
          services: p.services.map((s) =>
            s.id === action.serviceId
              ? { ...s, status: "in-progress" as const, completedAt: undefined }
              : s,
          ),
        })),
      }

    // ── Sittings & procedures ────────────────────────────

    case "ADD_SITTING":
      return {
        ...state,
        plans: state.plans.map((p) => ({
          ...p,
          services: p.services.map((s) =>
            s.id === action.serviceId
              ? { ...s, sittings: [...s.sittings, action.sitting] }
              : s,
          ),
        })),
      }

    case "ADD_SUB_PROCEDURE":
      return {
        ...state,
        plans: state.plans.map((p) => ({
          ...p,
          services: p.services.map((s) =>
            s.id === action.serviceId
              ? { ...s, procedures: [...s.procedures, action.procedure] }
              : s,
          ),
        })),
      }

    // ── Drawer ───────────────────────────────────────────

    case "SET_DRAWER":
      return { ...state, drawer: action.drawer }

    default:
      return state
  }
}

// ─── Context ────────────────────────────────────────────────

interface PlanContextValue {
  state: PlanState
  dispatch: React.Dispatch<PlanAction>
  // Derived selectors
  estimatePlans: TreatmentPlan[]
  inProgressPlans: TreatmentPlan[]
  completedPlans: TreatmentPlan[]
  activePlan: TreatmentPlan | undefined
  /** Find the parent plan for a given service ID */
  findPlanForService: (serviceId: string) => TreatmentPlan | undefined
  /** Find a service by ID across all plans */
  findService: (serviceId: string) => PlanService | undefined
  /** Whether any plan is currently in progress (only one allowed) */
  hasInProgressPlan: boolean
  /** Open a drawer */
  openDrawer: (drawer: DrawerState) => void
  /** Close the drawer */
  closeDrawer: () => void
  /** Navigate to a specific tab (e.g., after starting treatment) */
  navigateTab?: (tab: string) => void
}

const PlanContext = createContext<PlanContextValue | null>(null)

export function usePlanContext(): PlanContextValue {
  const ctx = useContext(PlanContext)
  if (!ctx) throw new Error("usePlanContext must be used within PlanProvider")
  return ctx
}

// ─── Provider ───────────────────────────────────────────────

interface PlanProviderProps {
  patientId: string
  children: React.ReactNode
  onNavigateTab?: (tab: string) => void
  initialDrawer?: DrawerState
}

export function PlanProvider({ patientId, children, onNavigateTab, initialDrawer }: PlanProviderProps) {
  const [state, dispatch] = useReducer(planReducer, {
    plans: getMockPlans(patientId),
    drawer: initialDrawer ?? { type: "closed" },
  })

  const estimatePlans = useMemo(
    () => state.plans.filter((p) => p.status === "draft" || p.status === "active"),
    [state.plans],
  )

  const inProgressPlans = useMemo(
    () => state.plans.filter((p) => p.status === "in-progress"),
    [state.plans],
  )

  const completedPlans = useMemo(
    () => state.plans.filter((p) => p.status === "completed"),
    [state.plans],
  )

  const activePlan = useMemo(
    () => state.plans.find((p) => p.status === "active"),
    [state.plans],
  )

  const findPlanForService = useMemo(
    () => (serviceId: string) =>
      state.plans.find((p) => p.services.some((s) => s.id === serviceId)),
    [state.plans],
  )

  const findService = useMemo(
    () => (serviceId: string) => {
      for (const p of state.plans) {
        const svc = p.services.find((s) => s.id === serviceId)
        if (svc) return svc
      }
      return undefined
    },
    [state.plans],
  )

  const openDrawer = (drawer: DrawerState) =>
    dispatch({ type: "SET_DRAWER", drawer })

  const closeDrawer = () =>
    dispatch({ type: "SET_DRAWER", drawer: { type: "closed" } })

  const hasInProgressPlan = inProgressPlans.length > 0

  const value = useMemo<PlanContextValue>(
    () => ({
      state,
      dispatch,
      estimatePlans,
      inProgressPlans,
      completedPlans,
      activePlan,
      findPlanForService,
      findService,
      hasInProgressPlan,
      openDrawer,
      closeDrawer,
      navigateTab: onNavigateTab,
    }),
    [state, estimatePlans, inProgressPlans, completedPlans, activePlan, findPlanForService, findService, hasInProgressPlan, onNavigateTab],
  )

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
}
