"use client"

import { Suspense, useCallback, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import cn from "clsx"

import { RxPad } from "@/components/rx/rxpad/RxPad"
import { ExaminationTab } from "@/components/dental/examination/ExaminationTab"
import { RxPadSyncProvider } from "@/components/tp-rxpad/rxpad-sync-context"
import {
  TPRxPadSecondarySidebar,
  TPRxPadShell,
  TPRxPadTopNav,
} from "@/components/tp-ui"

type RxTabId = "base" | "dental"

/** Clipboard-text icon — Linear (outline) variant for General Rx */
function ClipboardTextLinear({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 12.2h7M8 16.2h4.38" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 6h4c2 0 2-1 2-2 0-2-1-2-2-2h-4C9 2 8 2 8 4s1 2 2 2Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 4.02c3.33.18 5 1.43 5 5.98v6c0 4-1 6-6 6H9c-5 0-6-2-6-6v-6c0-4.56 1.67-5.8 5-5.98" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Clipboard-text icon — Bold (filled) variant for General Rx */
function ClipboardTextBold({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path opacity="0.4" d="M16.24 3.65H7.76c-2.47 0-4.47 2.01-4.47 4.47v9.41c0 2.46 2.01 4.47 4.47 4.47h8.47c2.47 0 4.47-2.01 4.47-4.47V8.12c.01-2.47-1.99-4.47-4.46-4.47Z" />
      <path d="M14.35 2H9.65c-1.04 0-1.89.84-1.89 1.88v.94c0 1.04.84 1.88 1.88 1.88h4.71c1.04 0 1.88-.84 1.88-1.88v-.94C16.24 2.84 15.39 2 14.35 2Z" />
      <path d="M15 12.95H8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h7c.41 0 .75.34.75.75s-.34.75-.75.75ZM12.38 16.95H8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.38c.41 0 .75.34.75.75s-.34.75-.75.75Z" />
    </svg>
  )
}

/** Tooth icon — Linear (outline) variant for Dental Examination */
function ToothIconLinear({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M14.08 8.09c-1.52 1.28-2.9.95-4.18 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.09 5.02c-1.44-2.4-4.31-3.54-7.01-2.79l-1.66.47c-.28.08-.59.08-.87 0l-1.66-.47c-2.7-.76-5.57.37-7.01 2.79-.58.97-.89 2.08-.89 3.21v.12c0 3.86.78 7.67 2.29 11.22l.39.92c.39.92 1.29 1.51 2.29 1.51 1.02 0 1.93-.62 2.31-1.57l1.19-2.99c.25-.63.85-1.04 1.52-1.04.67 0 1.28.41 1.52 1.04l1.19 2.99c.38.95 1.29 1.57 2.31 1.57 1 0 1.9-.6 2.29-1.51l.39-.92c1.51-3.55 2.29-7.37 2.29-11.22v-.12c0-1.13-.31-2.24-.89-3.21z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Tooth icon — Bold (filled) variant for Dental Examination */
function ToothIconBold({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12.06 9.68c-.85 0-1.72-.33-2.61-.99a.75.75 0 0 1 1.05-1.05c1.22.91 2.19.92 3.24.03a.75.75 0 0 1 1.09.09.75.75 0 0 1-.09 1.06c-.81.68-1.64 1.02-2.5 1.02l-.18-.16z" />
      <path opacity="0.4" d="M21.09 5.02c-1.44-2.4-4.31-3.54-7.01-2.79l-1.66.47c-.28.08-.59.08-.87 0l-1.66-.47c-2.7-.76-5.57.37-7.01 2.79-.58.97-.89 2.08-.89 3.21v.12c0 3.86.78 7.67 2.29 11.22l.39.92c.39.92 1.29 1.51 2.29 1.51 1.02 0 1.93-.62 2.31-1.57l1.19-2.99c.25-.63.85-1.04 1.52-1.04.67 0 1.28.41 1.52 1.04l1.19 2.99c.38.95 1.29 1.57 2.31 1.57 1 0 1.9-.6 2.29-1.51l.39-.92c1.51-3.55 2.29-7.37 2.29-11.22v-.12c0-1.13-.31-2.24-.89-3.21z" />
    </svg>
  )
}

const TAB_IDS: RxTabId[] = ["base", "dental"]

function RxPadInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams?.get("patientId") ?? "apt-1"
  const [activeTab, setActiveTab] = useState<RxTabId>("dental")

  // ── Swipe support (desktop + iPad) ──
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    touchStart.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!touchStart.current) return
    const dx = e.clientX - touchStart.current.x
    const dy = e.clientY - touchStart.current.y
    touchStart.current = null
    // Only trigger if horizontal swipe is dominant and >60px
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return
    const curIdx = TAB_IDS.indexOf(activeTab)
    if (dx < 0 && curIdx < TAB_IDS.length - 1) {
      setActiveTab(TAB_IDS[curIdx + 1])
    } else if (dx > 0 && curIdx > 0) {
      setActiveTab(TAB_IDS[curIdx - 1])
    }
  }, [activeTab])

  return (
    <RxPadSyncProvider>
      <TPRxPadShell
        topNav={
          <TPRxPadTopNav
            className="relative h-[62px] w-full bg-white"
            onBack={() => router.push("/appointments")}
          />
        }
        sidebar={<TPRxPadSecondarySidebar />}
      >
        {/* ── Tab bar — underline variant, shadow instead of border ── */}
        <div
          className="shrink-0 bg-white relative z-10"
          style={{ boxShadow: "0 2px 8px -2px rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center justify-center gap-[40px] px-[20px]">
            {/* General Rx tab */}
            <button
              type="button"
              onClick={() => setActiveTab("base")}
              className={cn(
                "group relative flex items-center gap-[8px] px-[6px] py-[14px] text-[15px] font-medium transition-colors",
                activeTab === "base"
                  ? "text-tp-blue-600 font-semibold"
                  : "text-tp-slate-500 hover:text-tp-slate-700",
              )}
              aria-pressed={activeTab === "base"}
            >
              {activeTab === "base" ? (
                <ClipboardTextBold size={20} color="var(--tp-blue-600)" />
              ) : (
                <ClipboardTextLinear size={20} color="var(--tp-slate-400)" />
              )}
              General Rx
              {activeTab === "base" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-tp-blue-600" />
              )}
            </button>

            {/* Dental Examination tab */}
            <button
              type="button"
              onClick={() => setActiveTab("dental")}
              className={cn(
                "group relative flex items-center gap-[8px] px-[6px] py-[14px] text-[15px] font-medium transition-colors",
                activeTab === "dental"
                  ? "text-tp-blue-600 font-semibold"
                  : "text-tp-slate-500 hover:text-tp-slate-700",
              )}
              aria-pressed={activeTab === "dental"}
            >
              {activeTab === "dental" ? (
                <ToothIconBold size={20} color="var(--tp-blue-600)" />
              ) : (
                <ToothIconLinear size={20} color="var(--tp-slate-400)" />
              )}
              Dental Examination
              {activeTab === "dental" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-tp-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* ── Active tab content (swipeable) ── */}
        <div
          className="flex-1 min-h-0 overflow-hidden touch-pan-y"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {activeTab === "base" && (
            <div className="h-full overflow-y-auto">
              <RxPad />
            </div>
          )}
          {activeTab === "dental" && (
            <div className="h-full overflow-hidden">
              <ExaminationTab patientId={patientId} />
            </div>
          )}
        </div>
      </TPRxPadShell>
    </RxPadSyncProvider>
  )
}

export function RxPadPage() {
  return (
    <Suspense>
      <RxPadInner />
    </Suspense>
  )
}
