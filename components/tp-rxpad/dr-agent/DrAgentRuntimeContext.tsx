"use client"

import { createContext, useContext } from "react"

export type DrAgentRuntimeValue = {
  /** Patient id used when merging AI dental scan into the 3D examination chart */
  dentalChartPatientId: string
}

const defaultValue: DrAgentRuntimeValue = { dentalChartPatientId: "apt-1" }

export const DrAgentRuntimeContext = createContext<DrAgentRuntimeValue>(defaultValue)

export function useDrAgentRuntime() {
  return useContext(DrAgentRuntimeContext)
}
