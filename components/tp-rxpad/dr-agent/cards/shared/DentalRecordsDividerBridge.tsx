"use client"

import { ArrowDown2 } from "iconsax-reactjs"

/** Animated arrow between the radiology summary card and per-tooth cards */
export function DentalRecordsDividerBridge() {
  return (
    <div className="flex w-full flex-col items-center py-0" aria-hidden>
      <ArrowDown2
        size={16}
        variant="Linear"
        color="var(--tp-slate-400,#94A3B8)"
        className="animate-bounce"
      />
    </div>
  )
}
