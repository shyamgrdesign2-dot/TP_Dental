"use client"

/**
 * TreatmentPlanTab — Shell component with context provider, tab pills,
 * tab switch, and drawer outlet. Complete rewrite from monolithic prototype.
 */

import { useCallback, useState } from "react"
import { PlanProvider, usePlanContext } from "./plan-context"
import { TabPill } from "./plan-shared"
import { PlanEstimatesTab } from "./PlanEstimatesTab"
import { InProgressTab } from "./InProgressTab"
import { CompletedTab } from "./CompletedTab"
import { AddEditPlanDrawer } from "./AddEditPlanDrawer"
import { BillPreviewDrawer } from "./BillPreviewDrawer"
import { RxPreviewDrawer } from "./RxPreviewDrawer"
import { BookAppointmentDrawer } from "./BookAppointmentDrawer"
import { AddSittingDrawer } from "./AddSittingDrawer"
import { AddProcedureDrawer } from "./AddProcedureDrawer"
import type { DrawerState, PlanTabId } from "./plan-types"
import "./plan-print-styles.css"

// ─── Inner component (inside context) ──────────────────────

function TreatmentPlanInner({ activeTab, setActiveTab }: { activeTab: PlanTabId; setActiveTab: (tab: PlanTabId) => void }) {
  const { estimatePlans, inProgressPlans, completedPlans } = usePlanContext()

  return (
    <div className="flex h-full flex-col overflow-hidden" style={{ background: "#F4F5F7" }}>
      {/* Tab bar — grayish container with tabs inside */}
      <div className="shrink-0 px-[24px] pt-[20px] pb-[8px]" style={{ background: "#F4F5F7" }}>
        <div className="inline-flex items-center gap-[3px] rounded-[12px] bg-tp-slate-200/70 p-[4px]">
          <TabPill
            id="estimates"
            label="Plan Estimates"
            count={estimatePlans.length}
            active={activeTab === "estimates"}
            onClick={() => setActiveTab("estimates")}
          />
          <TabPill
            id="progress"
            label="In Progress"
            count={inProgressPlans.length}
            active={activeTab === "progress"}
            onClick={() => setActiveTab("progress")}
          />
          <TabPill
            id="completed"
            label="Completed"
            count={completedPlans.length}
            active={activeTab === "completed"}
            onClick={() => setActiveTab("completed")}
          />
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {activeTab === "estimates" && <PlanEstimatesTab />}
        {activeTab === "progress" && <InProgressTab />}
        {activeTab === "completed" && <CompletedTab />}
      </div>

      {/* Drawer outlet — all drawers render here */}
      <AddEditPlanDrawer />
      <BillPreviewDrawer />
      <RxPreviewDrawer />
      <BookAppointmentDrawer />
      <AddSittingDrawer />
      <AddProcedureDrawer />
    </div>
  )
}

// ─── Exported component (provides context) ──────────────────

interface TreatmentPlanTabProps {
  patientId: string
  patientAge?: number
  initialTab?: PlanTabId
  initialDrawer?: DrawerState
}

export function TreatmentPlanTab({
  patientId,
  patientAge = 30,
  initialTab = "estimates",
  initialDrawer,
}: TreatmentPlanTabProps) {
  const [activeTab, setActiveTab] = useState<PlanTabId>(initialTab)

  const handleNavigateTab = useCallback((tab: string) => {
    if (tab === "estimates" || tab === "progress" || tab === "completed") {
      setActiveTab(tab as PlanTabId)
    }
  }, [])

  return (
    <PlanProvider patientId={patientId} onNavigateTab={handleNavigateTab} initialDrawer={initialDrawer}>
      <TreatmentPlanInner activeTab={activeTab} setActiveTab={setActiveTab} />
    </PlanProvider>
  )
}
