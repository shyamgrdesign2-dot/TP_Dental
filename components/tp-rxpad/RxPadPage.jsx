"use client"

import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import clsx from "clsx"
import { RxPad } from "@/components/rx/rxpad/RxPad"
import { ExaminationTab } from "@/components/dental/examination/ExaminationTab"
import { TPRxPadSecondarySidebar, TPRxPadShell, TPRxPadTopNav } from "@/components/tp-ui"
import { useRxPadChrome } from "@/components/tp-rxpad/rxpad-chrome-context"
import styles from "./RxPadPage.module.scss"

function ClipboardTextLinear({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M8 12.2h7M8 16.2h4.38"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6h4c2 0 2-1 2-2 0-2-1-2-2-2h-4C9 2 8 2 8 4s1 2 2 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 4.02c3.33.18 5 1.43 5 5.98v6c0 4-1 6-6 6H9c-5 0-6-2-6-6v-6c0-4.56 1.67-5.8 5-5.98"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ClipboardTextBold({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path
        opacity="0.4"
        d="M16.24 3.65H7.76c-2.47 0-4.47 2.01-4.47 4.47v9.41c0 2.46 2.01 4.47 4.47 4.47h8.47c2.47 0 4.47-2.01 4.47-4.47V8.12c.01-2.47-1.99-4.47-4.46-4.47Z"
      />
      <path d="M14.35 2H9.65c-1.04 0-1.89.84-1.89 1.88v.94c0 1.04.84 1.88 1.88 1.88h4.71c1.04 0 1.88-.84 1.88-1.88v-.94C16.24 2.84 15.39 2 14.35 2Z" />
      <path d="M15 12.95H8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h7c.41 0 .75.34.75.75s-.34.75-.75.75ZM12.38 16.95H8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.38c.41 0 .75.34.75.75s-.34.75-.75.75Z" />
    </svg>
  )
}

function ToothIconLinear({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M14.08 8.09c-1.52 1.28-2.9.95-4.18 0"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.09 5.02c-1.44-2.4-4.31-3.54-7.01-2.79l-1.66.47c-.28.08-.59.08-.87 0l-1.66-.47c-2.7-.76-5.57.37-7.01 2.79-.58.97-.89 2.08-.89 3.21v.12c0 3.86.78 7.67 2.29 11.22l.39.92c.39.92 1.29 1.51 2.29 1.51 1.02 0 1.93-.62 2.31-1.57l1.19-2.99c.25-.63.85-1.04 1.52-1.04.67 0 1.28.41 1.52 1.04l1.19 2.99c.38.95 1.29 1.57 2.31 1.57 1 0 1.9-.6 2.29-1.51l.39-.92c1.51-3.55 2.29-7.37 2.29-11.22v-.12c0-1.13-.31-2.24-.89-3.21z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ToothIconBold({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12.06 9.68c-.85 0-1.72-.33-2.61-.99a.75.75 0 0 1 1.05-1.05c1.22.91 2.19.92 3.24.03a.75.75 0 0 1 1.09.09.75.75 0 0 1-.09 1.06c-.81.68-1.64 1.02-2.5 1.02l-.18-.16z" />
      <path
        opacity="0.4"
        d="M21.09 5.02c-1.44-2.4-4.31-3.54-7.01-2.79l-1.66.47c-.28.08-.59.08-.87 0l-1.66-.47c-2.7-.76-5.57.37-7.01 2.79-.58.97-.89 2.08-.89 3.21v.12c0 3.86.78 7.67 2.29 11.22l.39.92c.39.92 1.29 1.51 2.29 1.51 1.02 0 1.93-.62 2.31-1.57l1.19-2.99c.25-.63.85-1.04 1.52-1.04.67 0 1.28.41 1.52 1.04l1.19 2.99c.38.95 1.29 1.57 2.31 1.57 1 0 1.9-.6 2.29-1.51l.39-.92c1.51-3.55 2.29-7.37 2.29-11.22v-.12c0-1.13-.31-2.24-.89-3.21z"
      />
    </svg>
  )
}

const TAB_IDS = ["base", "dental"]
const GESTURE_LOCK_THRESHOLD = 8
const SNAP_VELOCITY_THRESHOLD = 0.15
const SNAP_DISTANCE_FRACTION = 0.08

function RxPadInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams?.get("patientId") ?? "apt-1"
  const [activeTab, setActiveTab] = useState("base")
  const { setRxPadExamTab } = useRxPadChrome()

  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = window.localStorage.getItem("rxpad.active-tab")
    if (saved === "base" || saved === "dental") {
      setActiveTab(saved)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("rxpad.active-tab", activeTab)
  }, [activeTab])

  useEffect(() => {
    setRxPadExamTab(activeTab === "dental" ? "dental" : "base")
  }, [activeTab, setRxPadExamTab])

  useEffect(() => {
    if (typeof window === "undefined") return
    const openDentalExam = () => {
      setActiveTab("dental")
      setRxPadExamTab("dental")
    }
    window.addEventListener("tp:open-dental-exam", openDentalExam)
    return () => window.removeEventListener("tp:open-dental-exam", openDentalExam)
  }, [setRxPadExamTab])

  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const gestureRef = useRef(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const activeIndex = TAB_IDS.indexOf(activeTab)

  const onPointerDown = useCallback((e) => {
    if (e.button !== 0) return
    const tag = e.target.tagName
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON" || tag === "CANVAS")
      return
    gestureRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startTime: Date.now(),
      locked: null,
      currentDx: 0,
    }
  }, [])

  const onPointerMove = useCallback(
    (e) => {
      const g = gestureRef.current
      if (!g || g.pointerId !== e.pointerId) return
      const dx = e.clientX - g.startX
      const dy = e.clientY - g.startY
      if (!g.locked) {
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < GESTURE_LOCK_THRESHOLD) return
        if (Math.abs(dx) > Math.abs(dy) * 1.2) {
          g.locked = "horizontal"
          setIsDragging(true)
          try {
            e.target.setPointerCapture(e.pointerId)
          } catch {
            /* noop */
          }
        } else {
          g.locked = "vertical"
          return
        }
      }
      if (g.locked !== "horizontal") return
      e.preventDefault()
      g.currentDx = dx
      const atLeftEdge = activeIndex === 0 && dx > 0
      const atRightEdge = activeIndex === TAB_IDS.length - 1 && dx < 0
      const dampened = atLeftEdge || atRightEdge ? dx * 0.2 : dx
      setDragOffset(dampened)
    },
    [activeIndex],
  )

  const onPointerUp = useCallback(
    (e) => {
      const g = gestureRef.current
      if (!g || g.pointerId !== e.pointerId) return
      gestureRef.current = null
      if (g.locked !== "horizontal") {
        setIsDragging(false)
        setDragOffset(0)
        return
      }
      try {
        e.target.releasePointerCapture(e.pointerId)
      } catch {
        /* noop */
      }
      const containerWidth = containerRef.current?.offsetWidth ?? 800
      const dx = g.currentDx
      const elapsed = Math.max(1, Date.now() - g.startTime)
      const velocity = Math.abs(dx) / elapsed
      const passedDistance = Math.abs(dx) > containerWidth * SNAP_DISTANCE_FRACTION
      const fastFlick = velocity > SNAP_VELOCITY_THRESHOLD && Math.abs(dx) > 30
      if (passedDistance || fastFlick) {
        if (dx < 0 && activeIndex < TAB_IDS.length - 1) {
          setActiveTab(TAB_IDS[activeIndex + 1])
        } else if (dx > 0 && activeIndex > 0) {
          setActiveTab(TAB_IDS[activeIndex - 1])
        }
      }
      setIsDragging(false)
      setDragOffset(0)
    },
    [activeIndex],
  )

  const onPointerCancel = useCallback((e) => {
    if (gestureRef.current?.pointerId === e.pointerId) {
      gestureRef.current = null
      setIsDragging(false)
      setDragOffset(0)
    }
  }, [])

  const onContextMenu = useCallback(
    (e) => {
      if (isDragging) e.preventDefault()
    },
    [isDragging],
  )

  const panelPct = 100 / TAB_IDS.length
  const trackTranslateX = isDragging
    ? `calc(${-activeIndex * panelPct}% + ${dragOffset}px)`
    : `${-activeIndex * panelPct}%`

  return (
    <TPRxPadShell
        topNav={
          <TPRxPadTopNav
            className={styles.topNav}
            patientId={patientId}
            onBack={() => router.push("/appointments")}
          />
        }
        sidebar={<TPRxPadSecondarySidebar />}
      >
        <div className={styles.tabBar}>
          <div className={styles.tabInner}>
            <button
              type="button"
              onClick={() => setActiveTab("base")}
              className={clsx(
                styles.tabBtn,
                activeTab === "base" ? styles.tabBtnActive : styles.tabBtnInactive,
              )}
              aria-pressed={activeTab === "base"}
            >
              {activeTab === "base" ? (
                <ClipboardTextBold size={20} color="var(--tp-blue-600)" />
              ) : (
                <ClipboardTextLinear size={20} color="var(--tp-slate-400)" />
              )}
              Clinical Examination
              {activeTab === "base" ? <span className={styles.tabUnderline} /> : null}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("dental")}
              className={clsx(
                styles.tabBtn,
                activeTab === "dental" ? styles.tabBtnActive : styles.tabBtnInactive,
              )}
              aria-pressed={activeTab === "dental"}
            >
              {activeTab === "dental" ? (
                <ToothIconBold size={20} color="var(--tp-blue-600)" />
              ) : (
                <ToothIconLinear size={20} color="var(--tp-slate-400)" />
              )}
              Dental Examination
              {activeTab === "dental" ? <span className={styles.tabUnderline} /> : null}
            </button>
          </div>
        </div>
        <div
          ref={containerRef}
          className={styles.carousel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onContextMenu={onContextMenu}
          style={{ touchAction: "pan-y" }}
        >
          <div
            ref={trackRef}
            className={styles.track}
            style={{
              width: `${TAB_IDS.length * 100}%`,
              transform: `translateX(${trackTranslateX})`,
              transition: isDragging ? "none" : "transform 580ms cubic-bezier(0.25, 0.8, 0.25, 1)",
              willChange: isDragging ? "transform" : "auto",
            }}
          >
            <div className={styles.panelScroll} style={{ width: `${100 / TAB_IDS.length}%` }}>
              <RxPad />
            </div>
            <div className={styles.panelClip} style={{ width: `${100 / TAB_IDS.length}%` }}>
              <ExaminationTab patientId={patientId} />
            </div>
          </div>
        </div>
      </TPRxPadShell>
  )
}

export function RxPadPage() {
  return (
    <Suspense>
      <RxPadInner />
    </Suspense>
  )
}
