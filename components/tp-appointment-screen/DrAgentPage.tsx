"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createPortal } from "react-dom"
import Slide from "@mui/material/Slide"
import {
  Calendar2,
  CalendarAdd,
  ClipboardClose,
  ClipboardText,
  ClipboardTick,
  Clock,
  DocumentLike,
  DocumentSketch,
  Flash,
  Hospital,
  MessageCircle,
  MessageProgramming,
  Messages2,
  Notification,
  Profile2User,
  Timer,
  ReceiptText,
  SearchNormal1,
  Shop,
  TickCircle,
  Video,
} from "iconsax-reactjs"
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, LayoutList, ListFilter, MoreVertical, Plus, Search, Star, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { TPButton as Button, TPSplitButton } from "@/components/tp-ui/button-system"
import { TPSecondaryNavPanel, type TPSecondaryNavItem, TPTag } from "@/components/tp-ui"
import { TPSnackbar } from "@/components/tp-ui"
import { AppointmentBanner } from "@/components/appointments/AppointmentBanner"
import { DateRangePicker, type DatePresetId } from "@/components/ui/date-range-picker"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import svgPaths from "@/components/tp-rxpad/imports/svg-gb0jbe9ifm"

const REF_LOGO = "/assets/b38df11ad80d11b9c1d530142443a18c2f53d406.png"
const REF_AVATAR = "/assets/52cb18088c5b8a5db6a7711c9900d7d08a1bac42.png"

type AppointmentStatus =
  | "queue"
  | "finished"
  | "cancelled"
  | "draft"
  | "pending-digitisation"

type BadgeTone = "warning" | "success"
type DateRangeKey = "today" | "yesterday" | "past-3-months" | "past-4-months"

interface AppointmentTab {
  id: AppointmentStatus
  label: string
  count: number
  icon: React.ComponentType<any>
}

interface AppointmentRow {
  id: string
  serial: number
  name: string
  gender: "M" | "F"
  age: number
  contact: string
  visitType: string
  visitBadge?: {
    text: string
    tone: BadgeTone
  }
  contactBadge?: string
  slotTime: string
  slotDate: string
  hasVideo: boolean
  status: AppointmentStatus
  dateKey: DateRangeKey
  starred?: boolean
}

type AppointmentViewMode = "list" | "calendar"
type CalendarGranularity = "day" | "week" | "month"

const navItems: TPSecondaryNavItem[] = [
  { id: "appointments", label: "Appointments", icon: Calendar2 },
  {
    id: "ask-tatva",
    label: "Ask Tatva",
    icon: Messages2,
    badge: {
      text: "New",
      gradient:
        "linear-gradient(257.32deg, rgb(22, 163, 74) 0%, rgb(68, 207, 119) 47.222%, rgb(22, 163, 74) 94.444%)",
    },
  },
  {
    id: "opd-billing",
    label: "OPD Billing",
    icon: ReceiptText,
    badge: {
      text: "Trial",
      gradient:
        "linear-gradient(257.32deg, rgb(241, 82, 35) 0%, rgb(255, 152, 122) 47.222%, rgb(241, 82, 35) 94.444%)",
    },
  },
  { id: "all-patients", label: "All Patients", icon: Profile2User },
  { id: "follow-ups", label: "Follow-ups", icon: CalendarAdd },
  { id: "pharmacy", label: "Pharmacy", icon: Shop },
  { id: "ipd", label: "IPD", icon: Hospital },
  { id: "daycare", label: "Daycare", icon: DocumentLike },
  { id: "bulk-messages", label: "Bulk Messages", icon: MessageProgramming },
]

const appointmentTabs: AppointmentTab[] = [
  { id: "queue", label: "Queue", count: 20, icon: Clock },
  { id: "finished", label: "Finished", count: 0, icon: ClipboardTick },
  { id: "cancelled", label: "Cancelled", count: 0, icon: ClipboardClose },
  { id: "draft", label: "Draft", count: 0, icon: Timer },
  {
    id: "pending-digitisation",
    label: "Pending Digitisation",
    count: 0,
    icon: DocumentSketch,
  },
]


const queueAppointments: AppointmentRow[] = [
  {
    id: "apt-new",
    serial: 1,
    name: "Riya Kapoor",
    gender: "F",
    age: 24,
    contact: "+91-9812000123",
    visitBadge: { text: "First visit", tone: "info" },
    visitType: "New",
    slotTime: "10:15 am",
    slotDate: "9th Oct 2024",
    hasVideo: false,
    status: "queue",
    dateKey: "today",
  },
  {
    id: "apt-1",
    serial: 2,
    name: "Shyam GR",
    gender: "M",
    age: 35,
    contact: "+91-9812734567",
    visitType: "Follow-up",
    visitBadge: { text: "Unfulfilled", tone: "warning" },
    slotTime: "10:30 am",
    slotDate: "9th Oct 2024",
    hasVideo: true,
    status: "queue",
    dateKey: "today",
  },
  {
    id: "apt-2",
    serial: 3,
    name: "Sita Menon",
    gender: "F",
    age: 30,
    contact: "+91-9988776655",
    contactBadge: "IPD",
    visitType: "New",
    slotTime: "10:35 am",
    slotDate: "8th Oct 2024",
    hasVideo: true,
    status: "queue",
    dateKey: "yesterday",
    starred: true,
  },
  {
    id: "apt-3",
    serial: 4,
    name: "Vikram Singh",
    gender: "M",
    age: 42,
    contact: "+91-9001234567",
    visitType: "New",
    slotTime: "10:40 am",
    slotDate: "12th Sep 2024",
    hasVideo: true,
    status: "queue",
    dateKey: "past-3-months",
  },
  {
    id: "apt-4",
    serial: 5,
    name: "Nisha Rao",
    gender: "F",
    age: 26,
    contact: "+91-9876543210",
    visitType: "Routine",
    slotTime: "10:45 am",
    slotDate: "18th Aug 2024",
    hasVideo: true,
    status: "queue",
    dateKey: "past-4-months",
  },
  {
    id: "apt-5",
    serial: 6,
    name: "Rahul Verma",
    gender: "M",
    age: 50,
    contact: "+91-9123456789",
    visitType: "Follow-up",
    slotTime: "10:50 am",
    slotDate: "2nd Jul 2024",
    hasVideo: false,
    status: "queue",
    dateKey: "past-4-months",
  },
  {
    id: "apt-6",
    serial: 6,
    name: "Anjali Patel",
    gender: "F",
    age: 28,
    contact: "+91-9988771122",
    visitType: "New",
    slotTime: "10:55 am",
    slotDate: "9th Oct 2024",
    hasVideo: true,
    status: "queue",
    dateKey: "today",
  },
]

// ─── Column sort / filter helpers ────────────────────────────────────────────

const ALL_VISIT_TYPES = ["Follow-up", "New", "Routine"]

function parseSlotTime(t: string): number {
  const [time, mer] = t.split(" ")
  const [h, m] = time.split(":").map(Number)
  const hour = mer === "pm" && h < 12 ? h + 12 : mer === "am" && h === 12 ? 0 : h
  return hour * 60 + m
}

function matchesDateFilter(rowDateKey: DateRangeKey, selected: DatePresetId) {
  if (selected === "today") return rowDateKey === "today"
  if (selected === "yesterday") return rowDateKey === "yesterday"
  if (selected === "past-3-months" || selected === "next-3-months") {
    return rowDateKey === "today" || rowDateKey === "yesterday" || rowDateKey === "past-3-months"
  }
  // past-4-months, next-4-months → show all
  return true
}

function inferDatePresetFromDate(date: Date): DatePresetId {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000)
  if (diff === 0) return "today"
  if (diff === -1) return "yesterday"
  if (diff > 0) return diff <= 92 ? "next-3-months" : "next-4-months"
  return Math.abs(diff) <= 92 ? "past-3-months" : "past-4-months"
}

function formatCalendarFilterLabel(date: Date, mode: CalendarGranularity): string {
  if (mode === "month") {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }
  if (mode === "day") {
    if (isSameDate(date, startOfDay(new Date()))) return "Today"
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
  }
  const weekStart = startOfWeek(date)
  const weekEnd = addDays(weekStart, 6)
  const sameMonth = weekStart.getMonth() === weekEnd.getMonth() && weekStart.getFullYear() === weekEnd.getFullYear()
  if (sameMonth) {
    return `${weekStart.getDate()}-${weekEnd.getDate()} ${weekStart.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
  }
  return `${weekStart.toLocaleDateString("en-US", { day: "numeric", month: "short" })} - ${weekEnd.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}`
}

const TAB_EMPTY_MESSAGES: Record<AppointmentStatus, string> = {
  "queue":                "There are no patients in the queue right now",
  "finished":             "You haven't finished any consultations yet",
  "cancelled":            "Nothing here — you haven't cancelled any appointments",
  "draft":                "You haven't saved any drafts yet",
  "pending-digitisation": "No pending digitisations right now",
}

const TAB_EMPTY_ICONS: Record<AppointmentStatus, React.ComponentType<any>> = {
  "queue":                Clock,
  "finished":             ClipboardTick,
  "cancelled":            ClipboardClose,
  "draft":                ClipboardText,
  "pending-digitisation": DocumentSketch,
}

export function DrAgentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeRailItem, setActiveRailItem] = useState(navItems[0].id)
  const [activeTab, setActiveTab] = useState<AppointmentStatus>("queue")
  const [appointmentViewMode, setAppointmentViewMode] = useState<AppointmentViewMode>("list")
  const [calendarGranularity, setCalendarGranularity] = useState<CalendarGranularity>("day")
  const [calendarCursorDate, setCalendarCursorDate] = useState(new Date())
  const [appointments, setAppointments] = useState<AppointmentRow[]>(queueAppointments)
  const [query, setQuery] = useState("")
  const [tabDateFilters, setTabDateFilters] = useState<Partial<Record<AppointmentStatus, DatePresetId>>>({})
  const dateFilter = tabDateFilters[activeTab] ?? "today"
  function setDateFilter(id: DatePresetId) {
    setTabDateFilters((prev) => {
      if (prev[activeTab] === id) return prev
      return { ...prev, [activeTab]: id }
    })
  }
  const tableOverflowRef = useRef<HTMLDivElement | null>(null)
  const [isTableScrolled, setIsTableScrolled] = useState(false)

  useEffect(() => {
    const el = tableOverflowRef.current
    if (!el) return
    const handler = () => setIsTableScrolled(el.scrollLeft > 0)
    el.addEventListener("scroll", handler, { passive: true })
    return () => el.removeEventListener("scroll", handler)
  }, [])

  // ── Column sort + unified filter ─────────────────────────────────────────
  const [slotSort, setSlotSort] = useState<"none" | "asc" | "desc">("none")
  const [slotConsult, setSlotConsult] = useState<"all" | "video" | "in-clinic">("all")
  const [vtFilter, setVtFilter] = useState<string[]>([])

  // Filter panel (portal)
  const filterBtnRef = useRef<HTMLButtonElement | null>(null)
  const filterPanelRef = useRef<HTMLDivElement | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterStyle, setFilterStyle] = useState<React.CSSProperties>({})
  const [filterMounted, setFilterMounted] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  useEffect(() => { setFilterMounted(true) }, [])

  useEffect(() => {
    if (appointmentViewMode === "calendar") {
      setCalendarGranularity("day")
    }
  }, [appointmentViewMode])

  useEffect(() => {
    if (typeof window === "undefined") return
    const snackbarType = searchParams?.get("snackbar")
    const pendingKey = "tp.snackbar.appointment-completed"
    if (snackbarType === "appointment-completed") {
      window.sessionStorage.setItem(pendingKey, "1")
      router.replace("/appointments")
      return
    }
    if (window.sessionStorage.getItem(pendingKey) === "1") {
      window.sessionStorage.removeItem(pendingKey)
      setSnackbarMessage("Appointment completed successfully")
      setSnackbarOpen(true)
    }
  }, [router, searchParams])

  function handleFilterBtnClick() {
    if (filterOpen) { setFilterOpen(false); return }
    const rect = filterBtnRef.current!.getBoundingClientRect()
    setFilterStyle({ position: "fixed", top: rect.bottom + 4, right: window.innerWidth - rect.right, zIndex: 9999 })
    setFilterOpen(true)
  }

  const activeFilterCount = vtFilter.length + (slotConsult !== "all" ? 1 : 0)
  const hasActiveFilters = !!(query.trim()) || vtFilter.length > 0 || slotConsult !== "all" || dateFilter !== "today"

  const visibleAppointments = useMemo(() => {
    let rows = appointments.filter((row) => {
      const tabMatch = row.status === activeTab
      const dateMatch = matchesDateFilter(row.dateKey, dateFilter)
      const slotMatch = slotConsult === "all" ? true
        : slotConsult === "video" ? row.hasVideo : !row.hasVideo
      const vtMatch = vtFilter.length === 0 ? true : vtFilter.includes(row.visitType)
      const q = query.trim().toLowerCase()
      if (!tabMatch || !dateMatch || !slotMatch || !vtMatch) return false
      if (!q) return true
      return (
        row.name.toLowerCase().includes(q) ||
        row.contact.toLowerCase().includes(q) ||
        row.visitType.toLowerCase().includes(q)
      )
    })
    if (slotSort !== "none") {
      rows = [...rows].sort((a, b) => {
        const d = parseSlotTime(a.slotTime) - parseSlotTime(b.slotTime)
        return slotSort === "asc" ? d : -d
      })
    }
    return rows
  }, [activeTab, dateFilter, query, slotSort, slotConsult, vtFilter, appointments])

  // Calculate counts for each tab
  const getTabCount = (tabId: AppointmentStatus) => {
    return appointments.filter((row) => {
      const tabMatch = row.status === tabId
      const dateMatch = matchesDateFilter(row.dateKey, dateFilter)
      const slotMatch = slotConsult === "all" ? true
        : slotConsult === "video" ? row.hasVideo : !row.hasVideo
      const vtMatch = vtFilter.length === 0 ? true : vtFilter.includes(row.visitType)
      const q = query.trim().toLowerCase()
      if (!tabMatch || !dateMatch || !slotMatch || !vtMatch) return false
      if (!q) return true
      return (
        row.name.toLowerCase().includes(q) ||
        row.contact.toLowerCase().includes(q) ||
        row.visitType.toLowerCase().includes(q)
      )
    }).length
  }

  const handleUpdateCalendarAppointment = (
    rowId: string,
    patch: {
      name: string
      contact: string
      visitType: string
      start: Date
      end: Date
      hasVideo: boolean
    },
  ) => {
    setAppointments((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              name: patch.name || row.name,
              contact: patch.contact || row.contact,
              visitType: patch.visitType || row.visitType,
              slotTime: toMeridiemTime(patch.start),
              slotDate: toHumanDate(patch.start),
              hasVideo: patch.hasVideo,
              dateKey: toDateRangeKey(patch.start),
            }
          : row,
      ),
    )
  }

  const handleCalendarStart = (row: AppointmentRow) => {
    router.push(`/rxpad?patientId=${row.id}`)
  }

  const handleCalendarAddVitals = (row: AppointmentRow) => {
    setSnackbarMessage(`Opening vitals for ${row.name}`)
    setSnackbarOpen(true)
  }

  const handleCalendarOpenReports = (row: AppointmentRow) => {
    router.push(`/patient-detail?patientId=${row.id}&from=appointments`)
  }

  const handleCalendarInvite = (row: AppointmentRow) => {
    setSnackbarMessage(`Invite sent to ${row.name}`)
    setSnackbarOpen(true)
  }

  const handleCalendarEndVisit = (row: AppointmentRow) => {
    router.push(`/rxpad/end-visit?patientId=${row.id}`)
  }

  const handleCalendarDelete = (rowId: string) => {
    setAppointments((prev) => prev.filter((row) => row.id !== rowId))
    setSnackbarMessage("Appointment deleted")
    setSnackbarOpen(true)
  }

  return (
    <div className="min-h-screen bg-tp-slate-100 font-sans text-tp-slate-900">
      <TopHeader />

      <div className="flex h-[calc(100vh-62px)]">
        <aside className="hidden h-full shrink-0 md:block">
          <TPSecondaryNavPanel
            items={navItems}
            activeId={activeRailItem}
            onSelect={setActiveRailItem}
            variant="primary"
            height="100%"
            bottomSpacerPx={96}
            renderIcon={({ item, isActive, iconSize }) => {
              const Icon = item.icon as React.ComponentType<any>
              return (
                <Icon
                  size={iconSize}
                  variant={isActive ? "Bulk" : "Linear"}
                  strokeWidth={isActive ? undefined : 1.5}
                  color={isActive ? "var(--tp-slate-0)" : "var(--tp-slate-700)"}
                />
              )
            }}
          />
        </aside>

        <main className="flex-1 min-h-0 overflow-hidden">
          {/* STICKY LAYOUT: section is a flex column — only the table body scrolls */}
          <section className="flex h-full min-h-0 flex-col overflow-hidden">
            {/* Mobile nav strip — fixed, no scroll */}
            <div className="shrink-0 px-3 py-3 md:hidden">
              <div className="flex items-center gap-2 overflow-x-auto">
                {navItems.map((item) => {
                  const isActive = item.id === activeRailItem
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveRailItem(item.id)}
                      className={cn(
                        "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        isActive
                          ? "border-tp-blue-500 bg-tp-blue-50 text-tp-blue-700"
                          : "border-tp-slate-200 bg-white text-tp-slate-600",
                      )}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Banner — fixed, shrinks to natural height */}
            <div className="shrink-0">
              <AppointmentBanner
                title="Your Appointments"
                actions={
                  <>
                    <Button
                      variant="outline"
                      theme="primary"
                      size="md"
                      surface="dark"
                      className="whitespace-nowrap !bg-[rgba(255,255,255,0.13)] backdrop-blur-sm"
                      leftIcon={<Plus size={20} strokeWidth={1.5} />}
                    >
                      Add Appointment
                    </Button>
                    <Button
                      variant="solid"
                      theme="primary"
                      size="md"
                      surface="dark"
                      className="whitespace-nowrap"
                      leftIcon={<Flash size={24} variant="Linear" strokeWidth={1.5} />}
                    >
                      Start Walk-In
                    </Button>
                  </>
                }
              />
            </div>

            {/* Card — flex-1 so it takes all remaining height; overlaps banner by 60px */}
            {/* Note: no overflow-hidden here — the date picker popover must be able to escape */}
            <div className="relative z-10 -mt-[60px] flex flex-1 min-h-0 flex-col px-3 pb-3 sm:px-4 lg:px-[18px]">
              <div className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-2xl border border-tp-slate-200 bg-white">

                {/* Tabs row — fixed, does not scroll vertically */}
                <div className="shrink-0 overflow-x-auto border-b border-tp-slate-100 px-2 pt-2 sm:px-4 sm:pt-3 lg:px-[18px] lg:pt-[18px]">
                  <div className="flex min-w-max items-center gap-0">
                    {appointmentTabs.map((tab) => {
                      const isActive = activeTab === tab.id
                      const Icon = tab.icon

                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "group relative flex shrink-0 flex-col gap-2 rounded-t-lg px-3 pb-0 pt-1 transition-colors",
                            // hover: only background changes, text color stays same
                            isActive
                              ? "text-tp-blue-500"
                              : "text-tp-slate-700 hover:bg-tp-slate-100",
                          )}
                          aria-pressed={isActive}
                        >
                          <span className="flex items-center gap-2 text-[14px] font-medium">
                            <Icon
                              size={20}
                              variant={isActive ? "Bulk" : "Linear"}
                              strokeWidth={isActive ? undefined : 1.5}
                              color={isActive ? "var(--tp-blue-500)" : "var(--tp-slate-600)"}
                            />
                            <span className={cn(isActive && "font-semibold")}>
                              {tab.label}
                            </span>
                            <span className={cn(
                              "inline-flex items-center justify-center rounded-full px-[5px] h-[16px] min-w-[16px] text-[10px] font-semibold tabular-nums leading-none",
                              isActive
                                ? "bg-tp-blue-100 text-tp-blue-400"
                                : "bg-tp-slate-100 text-tp-slate-400",
                            )}>
                              {getTabCount(tab.id)}
                            </span>
                          </span>

                          <span
                            className={cn(
                              "h-[3px] w-full translate-y-px rounded-full transition-opacity",
                              isActive
                                ? "bg-tp-blue-500 opacity-100"
                                : "bg-tp-blue-500 opacity-0",
                            )}
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Search + filter bar — fixed, does not scroll */}
                <div className="shrink-0 px-3 pt-4 pb-3 sm:px-4 lg:px-[18px] lg:pt-5 lg:pb-4">
                  <div className="flex flex-nowrap items-center justify-between gap-3">
                    <label className="relative min-w-[160px] w-full max-w-[420px]">
                      <SearchNormal1
                        size={20}
                        variant="Linear"
                        strokeWidth={1.5}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-tp-slate-400"
                      />
                      <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search by patient name / ID / mobile number"
                        className="h-[38px] w-full rounded-[10px] border border-tp-slate-200 bg-white pl-10 pr-3 text-sm text-ellipsis text-tp-slate-700 placeholder:text-tp-slate-400 transition-colors hover:border-tp-slate-300 focus:border-tp-blue-300 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/15"
                      />
                    </label>

                    <div className="flex shrink-0 items-center gap-2">
                      <div className="inline-flex h-[38px] items-center rounded-[10px] border border-tp-slate-200 bg-white p-1">
                        <button
                          type="button"
                          onClick={() => setAppointmentViewMode("list")}
                          className={cn(
                            "inline-flex h-[30px] items-center gap-1.5 rounded-[8px] px-2.5 text-[12px] font-semibold transition-colors",
                            appointmentViewMode === "list"
                              ? "bg-tp-blue-50 text-tp-blue-700"
                              : "text-tp-slate-600 hover:bg-tp-slate-50",
                          )}
                          aria-pressed={appointmentViewMode === "list"}
                          title="List view"
                        >
                          <LayoutList size={15} strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setAppointmentViewMode("calendar")}
                          className={cn(
                            "inline-flex h-[30px] items-center gap-1.5 rounded-[8px] px-2.5 text-[12px] font-semibold transition-colors",
                            appointmentViewMode === "calendar"
                              ? "bg-tp-blue-50 text-tp-blue-700"
                              : "text-tp-slate-600 hover:bg-tp-slate-50",
                          )}
                          aria-pressed={appointmentViewMode === "calendar"}
                          title="Calendar view"
                        >
                          <CalendarDays size={15} strokeWidth={2} />
                        </button>
                      </div>

                      {/* Unified filter button */}
                      <button
                        ref={filterBtnRef}
                        type="button"
                        onClick={handleFilterBtnClick}
                        className={cn(
                          "inline-flex h-[38px] items-center gap-1.5 rounded-[10px] border px-3 text-[13px] font-medium transition-colors whitespace-nowrap",
                          activeFilterCount > 0
                            ? "border-tp-blue-300 bg-tp-blue-50 text-tp-blue-700 hover:bg-tp-blue-100"
                            : "border-tp-slate-200 bg-white text-tp-slate-600 hover:border-tp-slate-300 hover:bg-tp-slate-50",
                        )}
                      >
                        <ListFilter size={15} strokeWidth={2} className="shrink-0 text-tp-slate-600" />
                        <span>Filter</span>
                        {activeFilterCount > 0 && (
                          <span className="rounded-full bg-tp-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
                            {activeFilterCount}
                          </span>
                        )}
                      </button>

                      <DateRangePicker
                        value={dateFilter}
                        onChange={(sel) => setDateFilter(sel.presetId)}
                        triggerLabelOverride={
                          appointmentViewMode === "calendar"
                            ? formatCalendarFilterLabel(calendarCursorDate, calendarGranularity)
                            : undefined
                        }
                        className="min-w-[80px] max-w-[180px]"
                        hideFuturePresets={activeTab !== "queue"}
                      />
                    </div>
                  </div>
                </div>

                {/* Active filter tags — shown between search bar and table */}
                {(vtFilter.length > 0 || slotConsult !== "all") && (
                  <div className="shrink-0 px-3 pb-3 sm:px-4 lg:px-[18px]">
                    <div className="flex flex-wrap items-center gap-2 rounded-[10px] border border-tp-slate-100 bg-tp-slate-50 px-3 py-2">
                      <span className="shrink-0 text-[12px] font-semibold text-tp-slate-500">
                        Filter: {activeFilterCount}
                      </span>
                      <span className="h-4 w-px shrink-0 bg-tp-slate-200" />
                      {slotConsult !== "all" && (
                        <FilterTag
                          prefix="Slot"
                          value={slotConsult === "video" ? "Teleconsultation" : "In-Clinic"}
                          onRemove={() => setSlotConsult("all")}
                        />
                      )}
                      {vtFilter.map((vt) => (
                        <FilterTag
                          key={vt}
                          prefix="Visit Type"
                          value={vt}
                          onRemove={() => setVtFilter((p) => p.filter((v) => v !== vt))}
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => { setSlotConsult("all"); setVtFilter([]) }}
                        className="ml-auto shrink-0 text-[12px] font-semibold text-tp-warning-600 underline underline-offset-2 decoration-tp-warning-400 hover:text-tp-warning-700 transition-colors"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                )}

                {/* Body — list or calendar */}
                <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                  {appointmentViewMode === "list" ? (
                    <div
                      ref={tableOverflowRef}
                      className="flex-1 min-h-0 overflow-auto px-3 pb-4 sm:px-4 lg:px-[18px]"
                    >
                      <div className="min-w-[920px] pt-1">
                        <table className="w-full border-collapse">
                        <thead>
                          <tr className="rounded-[12px] bg-tp-slate-100">
                            <th className="rounded-l-[12px] px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[40px] max-w-[56px] w-[48px]">
                              #
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[140px] max-w-[220px]">
                              Name
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[140px] max-w-[200px]">
                              Contact
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[110px] max-w-[180px]">
                              Visit Type
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[110px] max-w-[160px]">
                              <button
                                type="button"
                                onClick={() => setSlotSort((s) => s === "none" ? "asc" : s === "asc" ? "desc" : "none")}
                                className={cn(
                                  "inline-flex items-center gap-1.5 -ml-0.5 rounded-[6px] px-0.5 py-0.5 transition-colors hover:bg-tp-slate-200/70",
                                  slotSort !== "none" && "text-tp-blue-600",
                                )}
                              >
                                <span className="uppercase">Slot</span>
                                <ColumnSortIcon dir={slotSort} />
                              </button>
                            </th>
                            <th className={cn(
                              "sticky right-0 z-20 w-px rounded-r-[12px] bg-tp-slate-100 px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 xl:static",
                              isTableScrolled && "shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.10)]",
                            )}>
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {visibleAppointments.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="py-12 text-center">
                                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                                  {(() => {
                                    const EmptyIcon = TAB_EMPTY_ICONS[activeTab]
                                    return (
                                      <EmptyIcon
                                        size={140}
                                        variant="Bulk"
                                        color="var(--tp-slate-200)"
                                      />
                                    )
                                  })()}
                                  <p className="text-[13px] font-medium text-tp-slate-500">
                                    {hasActiveFilters
                                      ? "No appointments matching your filters."
                                      : TAB_EMPTY_MESSAGES[activeTab]}
                                  </p>
                                  {hasActiveFilters && (
                                    <button
                                      type="button"
                                      onClick={() => { setQuery(""); setSlotConsult("all"); setVtFilter([]); setTabDateFilters({}) }}
                                      className="mt-0.5 text-[12px] font-semibold text-tp-warning-600 underline underline-offset-2 decoration-tp-warning-400 transition-colors hover:text-tp-warning-700"
                                    >
                                      Clear all filters
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ) : (
                            visibleAppointments.map((row, index) => (
                              <tr
                                key={row.id}
                                className="h-16 border-b border-tp-slate-100 last:border-b-0 hover:bg-tp-slate-50/50"
                              >
                                <td className="px-3 py-3 text-sm text-tp-slate-700">
                                  {index + 1}
                                </td>

                                <td className="px-3 py-3 align-middle">
                                  <div className="max-w-[200px] overflow-hidden">
                                    {/* Patient name: hover underline → opens patient detail */}
                                    <p
                                      className="cursor-pointer truncate text-sm font-semibold text-tp-blue-500 hover:underline"
                                      onClick={() => router.push(`/patient-detail?patientId=${row.id}&from=appointments`)}
                                    >
                                      {row.name}
                                    </p>
                                    <p className="mt-1 truncate text-sm text-tp-slate-700">
                                      {row.gender}, {row.age}y
                                      {row.starred && (
                                        <span className="ml-1 inline-flex">
                                          <Star
                                            size={14}
                                            fill="var(--tp-success-500)"
                                            stroke="var(--tp-success-500)"
                                          />
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-3 py-3 align-middle">
                                  <div className="max-w-[180px] overflow-hidden">
                                    <span className="block truncate text-sm text-tp-slate-700">
                                      {row.contact}
                                    </span>
                                    {row.contactBadge && (
                                      <div className="mt-1">
                                        <TPTag
                                          color="violet"
                                          variant="light"
                                          size="sm"
                                        >
                                          {row.contactBadge}
                                        </TPTag>
                                      </div>
                                    )}
                                  </div>
                                </td>

                                <td className="px-3 py-3 align-middle text-sm text-tp-slate-700">
                                  <div className="max-w-[160px] overflow-hidden">
                                    <span className="truncate block">{row.visitType}</span>
                                    {row.visitBadge && (
                                      <div className="mt-1">
                                        <TPTag
                                          color={row.visitBadge.tone === "warning" ? "warning" : "success"}
                                          variant={row.visitBadge.tone === "warning" ? "light" : "light"}
                                          size="sm"
                                        >
                                          {row.visitBadge.text}
                                        </TPTag>
                                      </div>
                                    )}
                                  </div>
                                </td>

                                <td className="px-3 py-3 align-middle">
                                  <div className="max-w-[150px] overflow-hidden">
                                    <div className="text-sm text-tp-slate-700">
                                      <span className="inline-flex items-center gap-1">
                                        {row.slotTime}
                                        {row.hasVideo && (
                                          <VideoConsultTooltip>
                                            <Video
                                              size={13}
                                              variant="Bulk"
                                              color="var(--tp-violet-500)"
                                            />
                                          </VideoConsultTooltip>
                                        )}
                                      </span>
                                    </div>
                                    <p className="mt-1 truncate text-xs text-tp-slate-600">
                                      {row.slotDate}
                                    </p>
                                  </div>
                                </td>

                                <td className={cn(
                                  "sticky right-0 z-10 w-px bg-white px-3 py-3 align-middle xl:static",
                                  isTableScrolled && "shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.10)]",
                                )}>
                                  <div className="flex items-center gap-3 whitespace-nowrap">
                                    <div className="transition-all hover:scale-105 duration-200">
                                      <TPSplitButton
                                        primaryAction={{
                                          label: "TypeRx",
                                          onClick: () => router.push(`/rxpad?patientId=${row.id}`),
                                        }}
                                        secondaryActions={[
                                          { id: "voice-rx", label: "VoiceRx", onClick: () => router.push(`/rxpad?patientId=${row.id}`) },
                                          { id: "tab-rx", label: "TabRx", onClick: () => router.push(`/rxpad?patientId=${row.id}`) },
                                          { id: "snap-rx", label: "SnapRx", onClick: () => router.push(`/rxpad?patientId=${row.id}`) },
                                          { id: "smart-sync", label: "SmartSync", onClick: () => router.push(`/rxpad?patientId=${row.id}`) },
                                        ]}
                                        variant="outline"
                                        theme="primary"
                                        size="md"
                                      />
                                    </div>

                                    <button
                                      type="button"
                                      aria-label="AI action"
                                      className="shrink-0 inline-flex size-[42px] items-center justify-center rounded-[10px] transition-all hover:opacity-80 hover:scale-105"
                                      style={{
                                        background: "linear-gradient(135deg, rgba(213,101,234,0.25) 0%, rgba(103,58,172,0.25) 45%, rgba(26,25,148,0.25) 100%)",
                                      }}
                                    >
                                      <AiSparkIcon />
                                    </button>

                                    <button
                                      type="button"
                                      aria-label="More options"
                                      className="flex shrink-0 items-center justify-center rounded-lg p-1 text-tp-slate-600 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-900"
                                    >
                                      <MoreVertical size={20} strokeWidth={1.5} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 min-h-0 overflow-auto px-3 pb-4 sm:px-4 lg:px-[18px]">
                      <AppointmentsCalendarView
                        rows={visibleAppointments}
                        granularity={calendarGranularity}
                        onGranularityChange={setCalendarGranularity}
                        datePreset={dateFilter}
                        onDatePresetChange={setDateFilter}
                        onCursorDateChange={setCalendarCursorDate}
                        onUpdate={handleUpdateCalendarAppointment}
                        onStart={handleCalendarStart}
                        onAddVitals={handleCalendarAddVitals}
                        onOpenReports={handleCalendarOpenReports}
                        onInvite={handleCalendarInvite}
                        onEndVisit={handleCalendarEndVisit}
                        onDelete={handleCalendarDelete}
                      />
                    </div>
                  )}
                </div>

              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Unified filter panel — portal-rendered to escape overflow:hidden */}
      {filterMounted && filterOpen && (
        <CommonFilterPanel
          style={filterStyle}
          panelRef={filterPanelRef}
          triggerRef={filterBtnRef}
          currentConsult={slotConsult}
          currentVtFilter={vtFilter}
          onApply={(consult, vtf) => { setSlotConsult(consult); setVtFilter(vtf); setFilterOpen(false) }}
        />
      )}

      <TPSnackbar
        open={snackbarOpen}
        message={snackbarMessage ?? ""}
        severity="success"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "down" }}
        autoHideDuration={1800}
        onClose={(_, reason) => {
          if (reason === "clickaway") return
          setSnackbarOpen(false)
          setSnackbarMessage(null)
        }}
      />
    </div>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function AiSparkIcon() {
  return (
    <span className="inline-flex size-[28px] items-center justify-center">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ai-spark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D565EA" />
            <stop offset="45%" stopColor="#673AAC" />
            <stop offset="100%" stopColor="#1A1994" />
          </linearGradient>
        </defs>
        <path
          d="M18.0841 11.612C18.4509 11.6649 18.4509 12.3351 18.0841 12.388C14.1035 12.9624 12.9624 14.1035 12.388 18.0841C12.3351 18.4509 11.6649 18.4509 11.612 18.0841C11.0376 14.1035 9.89647 12.9624 5.91594 12.388C5.5491 12.3351 5.5491 11.6649 5.91594 11.612C9.89647 11.0376 11.0376 9.89647 11.612 5.91594C11.6649 5.5491 12.3351 5.5491 12.388 5.91594C12.9624 9.89647 14.1035 11.0376 18.0841 11.612Z"
          fill="url(#ai-spark-gradient)"
        />
      </svg>
    </span>
  )
}

function SortIndicators() {
  return (
    <span className="inline-flex flex-col items-center gap-[2px]">
      <span className="h-0 w-0 border-b-[5px] border-l-[4px] border-r-[4px] border-b-tp-slate-700 border-l-transparent border-r-transparent" />
      <span className="h-0 w-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-tp-slate-500" />
    </span>
  )
}

// ─── Dynamic sort icon (active direction highlighted in blue) ─────────────────

function ColumnSortIcon({ dir }: { dir: "none" | "asc" | "desc" }) {
  return (
    <span className="inline-flex flex-col items-center gap-[2px]">
      <span className={cn(
        "h-0 w-0 border-b-[4px] border-l-[3px] border-r-[3px] border-l-transparent border-r-transparent transition-colors",
        dir === "asc" ? "border-b-tp-blue-500" : "border-b-tp-slate-600",
      )} />
      <span className={cn(
        "h-0 w-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent transition-colors",
        dir === "desc" ? "border-t-tp-blue-500" : "border-t-tp-slate-600",
      )} />
    </span>
  )
}

// ─── Filter chip tag ──────────────────────────────────────────────────────────

function FilterTag({ prefix, value, onRemove }: { prefix: string; value: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-tp-blue-200 bg-tp-blue-50 px-2.5 py-1 text-[11px]">
      <span className="font-medium text-tp-blue-300">{prefix}:</span>
      <span className="font-semibold text-tp-blue-500">{value}</span>
      <button
        type="button"
        onClick={onRemove}
        className="ml-0.5 rounded-full p-0.5 text-tp-blue-300 transition-colors hover:bg-tp-blue-100 hover:text-tp-blue-500"
      >
        <X size={10} strokeWidth={2.5} />
      </button>
    </span>
  )
}

type CalendarDraft = {
  name: string
  contact: string
  visitType: string
  date: string
  time: string
  durationMin: number
  hasVideo: boolean
}

function toDateRangeKey(date: Date): DateRangeKey {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diff = Math.round((today.getTime() - target.getTime()) / 86400000)
  if (diff === 0) return "today"
  if (diff === 1) return "yesterday"
  return diff <= 92 ? "past-3-months" : "past-4-months"
}

function toMeridiemTime(date: Date): string {
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const suffix = hours >= 12 ? "pm" : "am"
  hours %= 12
  if (hours === 0) hours = 12
  return `${hours}:${minutes.toString().padStart(2, "0")} ${suffix}`
}

function ordinal(day: number): string {
  if (day % 10 === 1 && day % 100 !== 11) return `${day}st`
  if (day % 10 === 2 && day % 100 !== 12) return `${day}nd`
  if (day % 10 === 3 && day % 100 !== 13) return `${day}rd`
  return `${day}th`
}

function toHumanDate(date: Date): string {
  return `${ordinal(date.getDate())} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`
}

function parseSlotDate(value: string): Date {
  const normalized = value.replace(/(\d+)(st|nd|rd|th)/, "$1")
  const parsed = new Date(normalized)
  if (!Number.isNaN(parsed.getTime())) return parsed
  return new Date()
}

function toEventStart(row: AppointmentRow): Date {
  const date = resolveRowDate(row)
  const mins = parseSlotTime(row.slotTime)
  const hours = Math.floor(mins / 60)
  const minutes = mins % 60
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0, 0)
}

function resolveRowDate(row: AppointmentRow): Date {
  const today = startOfDay(new Date())
  if (row.dateKey === "today") return today
  if (row.dateKey === "yesterday") return addDays(today, -1)
  if (row.dateKey === "past-3-months") return addDays(today, -(14 + (row.serial % 21)))
  if (row.dateKey === "past-4-months") return addDays(today, -(35 + (row.serial % 40)))
  return parseSlotDate(row.slotDate)
}

function toInputDate(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = `${date.getMonth() + 1}`.padStart(2, "0")
  const dd = `${date.getDate()}`.padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

function toInputTime(date: Date): string {
  return `${`${date.getHours()}`.padStart(2, "0")}:${`${date.getMinutes()}`.padStart(2, "0")}`
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function startOfWeek(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - day)
  return d
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
  )
}

function AppointmentsCalendarView({
  rows,
  granularity,
  onGranularityChange,
  datePreset,
  onDatePresetChange,
  onCursorDateChange,
  onUpdate,
  onStart,
  onAddVitals,
  onOpenReports,
  onInvite,
  onEndVisit,
  onDelete,
}: {
  rows: AppointmentRow[]
  granularity: CalendarGranularity
  onGranularityChange: (g: CalendarGranularity) => void
  datePreset: DatePresetId
  onDatePresetChange: (preset: DatePresetId) => void
  onCursorDateChange: (date: Date) => void
  onUpdate: (rowId: string, patch: { name: string; contact: string; visitType: string; start: Date; end: Date; hasVideo: boolean }) => void
  onStart: (row: AppointmentRow) => void
  onAddVitals: (row: AppointmentRow) => void
  onOpenReports: (row: AppointmentRow) => void
  onInvite: (row: AppointmentRow) => void
  onEndVisit: (row: AppointmentRow) => void
  onDelete: (rowId: string) => void
}) {
  const [cursorDate, setCursorDate] = useState(new Date())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [draft, setDraft] = useState<CalendarDraft>({
    name: "",
    contact: "",
    visitType: "New",
    date: toInputDate(new Date()),
    time: "10:00",
    durationMin: 30,
    hasVideo: false,
  })

  const events = useMemo<{ row: AppointmentRow; start: Date; end: Date }[]>(() => [], [rows])

  const openEdit = (row: AppointmentRow, start: Date) => {
    setEditingId(row.id)
    setDraft({
      name: row.name,
      contact: row.contact,
      visitType: row.visitType,
      date: toInputDate(start),
      time: toInputTime(start),
      durationMin: 30,
      hasVideo: row.hasVideo,
    })
    setIsModalOpen(true)
  }

  const submit = () => {
    const start = new Date(`${draft.date}T${draft.time}:00`)
    if (Number.isNaN(start.getTime())) return
    const end = new Date(start.getTime() + draft.durationMin * 60000)
    const payload = {
      name: draft.name.trim(),
      contact: draft.contact.trim(),
      visitType: draft.visitType.trim(),
      start,
      end,
      hasVideo: draft.hasVideo,
    }
    if (!editingId) return
    onUpdate(editingId, payload)
    setIsModalOpen(false)
  }

  useEffect(() => {
    const now = new Date()
    if (datePreset === "today") {
      setCursorDate(now)
      return
    }
    if (datePreset === "yesterday") {
      setCursorDate(addDays(now, -1))
      return
    }
    if (datePreset === "past-3-months" || datePreset === "next-3-months") {
      setCursorDate(addDays(now, -45))
      return
    }
    setCursorDate(addDays(now, -75))
  }, [datePreset])

  useEffect(() => {
    onDatePresetChange(inferDatePresetFromDate(cursorDate))
  }, [cursorDate, onDatePresetChange])

  useEffect(() => {
    onCursorDateChange(cursorDate)
  }, [cursorDate, onCursorDateChange])

  const goPrev = () => {
    if (granularity === "month") setCursorDate(new Date(cursorDate.getFullYear(), cursorDate.getMonth() - 1, 1))
    else if (granularity === "week") setCursorDate(addDays(cursorDate, -7))
    else setCursorDate(addDays(cursorDate, -1))
  }
  const goNext = () => {
    if (granularity === "month") setCursorDate(new Date(cursorDate.getFullYear(), cursorDate.getMonth() + 1, 1))
    else if (granularity === "week") setCursorDate(addDays(cursorDate, 7))
    else setCursorDate(addDays(cursorDate, 1))
  }

  const weekDays = useMemo(() => {
    const ws = startOfWeek(cursorDate)
    return Array.from({ length: 7 }, (_, i) => addDays(ws, i))
  }, [cursorDate])

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[14px] border border-tp-slate-100 bg-white">
      <div className="flex items-center justify-between border-b border-tp-slate-100 px-3 py-2.5 sm:px-4">
        <div className="inline-flex items-center gap-2">
          <button type="button" onClick={goPrev} className="inline-flex size-8 items-center justify-center rounded-[8px] border border-tp-slate-200 text-tp-slate-600 hover:bg-tp-slate-50">
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={goNext} className="inline-flex size-8 items-center justify-center rounded-[8px] border border-tp-slate-200 text-tp-slate-600 hover:bg-tp-slate-50">
            <ChevronRight size={16} />
          </button>
          <p className="ml-1 text-[14px] font-semibold text-tp-slate-800">
            {cursorDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="inline-flex items-center gap-2">
          <div className="inline-flex h-8 items-center rounded-[8px] border border-tp-slate-200 bg-white p-1">
            {(["day", "week", "month"] as CalendarGranularity[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onGranularityChange(mode)}
                className={cn(
                  "rounded-[6px] px-2.5 py-1 text-[12px] font-semibold capitalize",
                  granularity === mode ? "bg-tp-blue-50 text-tp-blue-700" : "text-tp-slate-600 hover:bg-tp-slate-50",
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        {granularity === "month" ? (
          <MonthCalendarGrid
            cursorDate={cursorDate}
            events={events}
            onEdit={openEdit}
            onStart={onStart}
            onAddVitals={onAddVitals}
            onOpenReports={onOpenReports}
            onInvite={onInvite}
            onEndVisit={onEndVisit}
            onDelete={onDelete}
          />
        ) : (
          <WeekDayCalendarGrid
            mode={granularity}
            weekDays={weekDays}
            cursorDate={cursorDate}
            events={events}
            onEdit={openEdit}
            onStart={onStart}
            onAddVitals={onAddVitals}
            onOpenReports={onOpenReports}
            onInvite={onInvite}
            onEndVisit={onEndVisit}
            onDelete={onDelete}
          />
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-[430px] rounded-[14px] border border-tp-slate-200 bg-white p-4 shadow-[0_20px_45px_-20px_rgba(15,23,42,0.5)]">
            <p className="text-[16px] font-semibold text-tp-slate-900">Reschedule appointment</p>
            <div className="mt-3 space-y-2.5">
              <input
                value={draft.name}
                onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                placeholder="Patient name"
                className="h-[38px] w-full rounded-[10px] border border-tp-slate-200 px-3 text-[13px] focus:border-tp-blue-300 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/15"
              />
              <input
                value={draft.contact}
                onChange={(e) => setDraft((p) => ({ ...p, contact: e.target.value }))}
                placeholder="Contact number"
                className="h-[38px] w-full rounded-[10px] border border-tp-slate-200 px-3 text-[13px] focus:border-tp-blue-300 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/15"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={draft.date}
                  onChange={(e) => setDraft((p) => ({ ...p, date: e.target.value }))}
                  className="h-[38px] w-full rounded-[10px] border border-tp-slate-200 px-3 text-[13px] focus:border-tp-blue-300 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/15"
                />
                <input
                  type="time"
                  value={draft.time}
                  onChange={(e) => setDraft((p) => ({ ...p, time: e.target.value }))}
                  className="h-[38px] w-full rounded-[10px] border border-tp-slate-200 px-3 text-[13px] focus:border-tp-blue-300 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/15"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={draft.visitType}
                  onChange={(e) => setDraft((p) => ({ ...p, visitType: e.target.value }))}
                  placeholder="Visit type"
                  className="h-[38px] w-full rounded-[10px] border border-tp-slate-200 px-3 text-[13px] focus:border-tp-blue-300 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/15"
                />
                <select
                  value={draft.durationMin}
                  onChange={(e) => setDraft((p) => ({ ...p, durationMin: Number(e.target.value) }))}
                  className="h-[38px] w-full rounded-[10px] border border-tp-slate-200 px-3 text-[13px] focus:border-tp-blue-300 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/15"
                >
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={45}>45 min</option>
                  <option value={60}>60 min</option>
                </select>
              </div>
              <label className="inline-flex items-center gap-2 text-[13px] text-tp-slate-700">
                <input
                  type="checkbox"
                  checked={draft.hasVideo}
                  onChange={(e) => setDraft((p) => ({ ...p, hasVideo: e.target.checked }))}
                />
                Teleconsultation
              </label>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="inline-flex h-[36px] items-center rounded-[9px] border border-tp-slate-200 px-3 text-[12px] font-semibold text-tp-slate-700 hover:bg-tp-slate-50">
                Cancel
              </button>
              <button type="button" onClick={submit} className="inline-flex h-[36px] items-center rounded-[9px] bg-tp-blue-600 px-3 text-[12px] font-semibold text-white hover:bg-tp-blue-700">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MonthCalendarGrid({
  cursorDate,
  events,
  onEdit,
  onStart,
  onAddVitals,
  onOpenReports,
  onInvite,
  onEndVisit,
  onDelete,
}: {
  cursorDate: Date
  events: { row: AppointmentRow; start: Date; end: Date }[]
  onEdit: (row: AppointmentRow, start: Date) => void
  onStart: (row: AppointmentRow) => void
  onAddVitals: (row: AppointmentRow) => void
  onOpenReports: (row: AppointmentRow) => void
  onInvite: (row: AppointmentRow) => void
  onEndVisit: (row: AppointmentRow) => void
  onDelete: (rowId: string) => void
}) {
  const monthStart = new Date(cursorDate.getFullYear(), cursorDate.getMonth(), 1)
  const gridStart = startOfWeek(monthStart)
  const days = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i))

  return (
    <div className="grid min-w-[900px] grid-cols-7">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
        <div key={d} className="sticky top-0 z-10 border-b border-r border-tp-slate-100 bg-tp-slate-50 px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-tp-slate-500">
          {d}
        </div>
      ))}
      {days.map((day) => {
        const dayEvents = events.filter((e) => isSameDate(e.start, day))
        const outside = day.getMonth() !== cursorDate.getMonth()
        return (
          <div
            key={day.toISOString()}
            className={cn(
              "min-h-[130px] border-b border-r border-tp-slate-100 p-2 text-left align-top transition-colors",
              outside ? "bg-tp-slate-50/60" : "bg-white",
            )}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span className={cn("text-[12px] font-semibold", outside ? "text-tp-slate-400" : "text-tp-slate-700")}>{day.getDate()}</span>
              {dayEvents.length > 0 && <span className="rounded-full bg-tp-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-tp-blue-600">{dayEvents.length}</span>}
            </div>
            <div className="space-y-1">
              {dayEvents.slice(0, 3).map((event) => (
                <div
                  key={event.row.id}
                  className="flex items-center gap-1 rounded-[6px] bg-tp-blue-50 px-1.5 py-1 text-[10px] font-medium text-tp-blue-700"
                >
                  <button
                    type="button"
                    onClick={() => onEdit(event.row, event.start)}
                    className="min-w-0 flex-1 truncate text-left"
                    title={`${toMeridiemTime(event.start)} ${event.row.name}`}
                  >
                    {toMeridiemTime(event.start)} {event.row.name}
                  </button>
                  <CalendarEventMenu
                    row={event.row}
                    onStart={onStart}
                    onAddVitals={onAddVitals}
                    onOpenReports={onOpenReports}
                    onInvite={onInvite}
                    onEndVisit={onEndVisit}
                    onReschedule={() => onEdit(event.row, event.start)}
                    onDelete={onDelete}
                  />
                </div>
              ))}
              {dayEvents.length > 3 && <span className="block text-[10px] font-medium text-tp-slate-500">+{dayEvents.length - 3} more</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function WeekDayCalendarGrid({
  mode,
  weekDays,
  cursorDate,
  events,
  onEdit,
  onStart,
  onAddVitals,
  onOpenReports,
  onInvite,
  onEndVisit,
  onDelete,
}: {
  mode: "week" | "day"
  weekDays: Date[]
  cursorDate: Date
  events: { row: AppointmentRow; start: Date; end: Date }[]
  onEdit: (row: AppointmentRow, start: Date) => void
  onStart: (row: AppointmentRow) => void
  onAddVitals: (row: AppointmentRow) => void
  onOpenReports: (row: AppointmentRow) => void
  onInvite: (row: AppointmentRow) => void
  onEndVisit: (row: AppointmentRow) => void
  onDelete: (rowId: string) => void
}) {
  const days = mode === "day" ? [cursorDate] : weekDays
  const dayStartHour = 8
  const slots = Array.from({ length: 13 }, (_, i) => dayStartHour + i)
  const slotHeight = 56
  const gridHeight = slots.length * slotHeight

  return (
    <div className="min-w-[900px]">
      <div className="grid border-b border-tp-slate-100" style={{ gridTemplateColumns: `72px repeat(${days.length}, minmax(0, 1fr))` }}>
        <div className="border-r border-tp-slate-100 bg-tp-slate-50" />
        {days.map((d) => (
          <div key={d.toISOString()} className="border-r border-tp-slate-100 bg-tp-slate-50 px-2 py-2">
            <p className="text-[12px] font-semibold text-tp-slate-700">
              {d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
            </p>
          </div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: `72px repeat(${days.length}, minmax(0, 1fr))` }}>
        <div className="border-r border-tp-slate-100">
          {slots.map((hour) => (
            <div key={hour} className="h-[56px] border-b border-tp-slate-100 pr-2 pt-1 text-right text-[11px] text-tp-slate-500">
              {hour}:00
            </div>
          ))}
        </div>
        {days.map((day) => {
          const dayEvents = events.filter((e) => isSameDate(e.start, day))
          return (
            <div key={day.toISOString()} className="relative border-r border-tp-slate-100 bg-white" style={{ height: `${gridHeight}px` }}>
              {slots.map((hour) => (
                <div key={`${day.toISOString()}-${hour}`} className="h-[56px] border-b border-tp-slate-100" />
              ))}
              {dayEvents.map((event) => {
                const startMin = event.start.getHours() * 60 + event.start.getMinutes()
                const startBase = dayStartHour * 60
                const top = Math.max(0, ((startMin - startBase) / 60) * slotHeight)
                const durMin = Math.max(15, (event.end.getTime() - event.start.getTime()) / 60000)
                const height = Math.max(104, (durMin / 60) * slotHeight)
                return (
                  <div
                    key={event.row.id}
                    className="absolute left-1 right-1 rounded-[8px] border border-tp-blue-200 bg-tp-blue-50 px-2 py-1.5 hover:bg-tp-blue-100"
                    style={{ top: `${top}px`, height: `${height}px` }}
                  >
                    <div className="flex h-full flex-col">
                      <div className="flex items-start justify-between gap-1">
                        <button type="button" onClick={() => onEdit(event.row, event.start)} className="min-w-0 flex-1 text-left">
                          <p className="truncate text-[11px] font-semibold text-tp-blue-700">{event.row.name}</p>
                          <p className="truncate text-[10px] text-tp-blue-600">
                            {event.row.gender}, {event.row.age}y • {event.row.contact}
                          </p>
                          <p className="truncate text-[10px] text-tp-blue-600">
                            {toMeridiemTime(event.start)} • {event.row.visitType}
                          </p>
                        </button>
                        <CalendarEventMenu
                          row={event.row}
                          onStart={onStart}
                          onAddVitals={onAddVitals}
                          onOpenReports={onOpenReports}
                          onInvite={onInvite}
                          onEndVisit={onEndVisit}
                          onReschedule={() => onEdit(event.row, event.start)}
                          onDelete={onDelete}
                        />
                      </div>
                      <div className="mt-auto flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => onStart(event.row)}
                          className="inline-flex h-[24px] items-center rounded-[6px] border border-tp-blue-300 bg-white px-2 text-[10px] font-semibold text-tp-blue-700 hover:bg-tp-blue-50"
                        >
                          TypeRx
                        </button>
                        <button
                          type="button"
                          aria-label="AI action"
                          className="inline-flex size-[24px] items-center justify-center rounded-[6px] transition-all hover:opacity-80"
                          style={{
                            background: "linear-gradient(135deg, rgba(213,101,234,0.25) 0%, rgba(103,58,172,0.25) 45%, rgba(26,25,148,0.25) 100%)",
                          }}
                        >
                          <span className="scale-[0.78]"><AiSparkIcon /></span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CalendarEventMenu({
  row,
  onStart,
  onAddVitals,
  onOpenReports,
  onInvite,
  onEndVisit,
  onReschedule,
  onDelete,
}: {
  row: AppointmentRow
  onStart: (row: AppointmentRow) => void
  onAddVitals: (row: AppointmentRow) => void
  onOpenReports: (row: AppointmentRow) => void
  onInvite: (row: AppointmentRow) => void
  onEndVisit: (row: AppointmentRow) => void
  onReschedule: () => void
  onDelete: (rowId: string) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Appointment actions for ${row.name}`}
          className="inline-flex size-5 items-center justify-center rounded text-tp-slate-600 hover:bg-white/80"
        >
          <MoreVertical size={13} strokeWidth={2} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] rounded-[10px] border border-tp-slate-100 bg-white p-1">
        <DropdownMenuItem onClick={() => onStart(row)} className="rounded-[8px] text-[12px]">Start Appointment</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAddVitals(row)} className="rounded-[8px] text-[12px]">Add Vitals</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onOpenReports(row)} className="rounded-[8px] text-[12px]">Open Reports</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onInvite(row)} className="rounded-[8px] text-[12px]">Invite</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEndVisit(row)} className="rounded-[8px] text-[12px]">End Visit</DropdownMenuItem>
        <DropdownMenuItem onClick={onReschedule} className="rounded-[8px] text-[12px]">Reschedule</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(row.id)} className="rounded-[8px] text-[12px] text-red-600 focus:text-red-700 data-[highlighted]:text-red-700">
          Delete Appointment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── Unified filter panel ─────────────────────────────────────────────────────

function CommonFilterPanel({
  style,
  panelRef,
  triggerRef,
  currentConsult,
  currentVtFilter,
  onApply,
}: {
  style: React.CSSProperties
  panelRef: React.Ref<HTMLDivElement>
  triggerRef: React.RefObject<HTMLButtonElement>
  currentConsult: "all" | "video" | "in-clinic"
  currentVtFilter: string[]
  onApply: (consult: "all" | "video" | "in-clinic", vtFilter: string[]) => void
}) {
  const [consult, setConsult] = useState(currentConsult)
  const [vtFilter, setVtFilter] = useState<string[]>(currentVtFilter)

  // Stale-closure safe ref so the mousedown handler always sees latest onApply
  const onApplyRef = useRef(onApply)
  useEffect(() => { onApplyRef.current = onApply }, [onApply])

  // Click-outside → apply staged filters (not discard)
  useEffect(() => {
    function handler(e: MouseEvent) {
      const panel = (panelRef as React.RefObject<HTMLDivElement>).current
      if (panel?.contains(e.target as Node)) return
      if (triggerRef?.current?.contains(e.target as Node)) return
      onApplyRef.current(consult, vtFilter)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [consult, vtFilter, triggerRef, panelRef])

  const consultOpts: Array<{ v: "video" | "in-clinic"; label: string }> = [
    { v: "video", label: "Teleconsultation" },
    { v: "in-clinic", label: "In-clinic" },
  ]

  function toggleVtType(t: string) {
    setVtFilter((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )
  }

  function isVtChecked(t: string) {
    return vtFilter.includes(t)
  }

  function handleClear() {
    setConsult("all")
    setVtFilter([])
  }

  return createPortal(
    <div
      ref={panelRef}
      style={style}
      className="w-[236px] overflow-hidden rounded-[12px] border border-tp-slate-200 bg-white shadow-[0_8px_24px_-4px_rgba(23,23,37,0.12)]"
    >
      {/* Slot Type section */}
      <div className="p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-tp-slate-400">Slot Type</p>
        <div className="flex flex-col gap-0.5">
          {consultOpts.map(({ v, label }) => (
            <button
              key={v}
              type="button"
              onClick={() => setConsult(v)}
              className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left transition-colors hover:bg-tp-slate-50"
            >
              <span className={cn(
                "size-4 shrink-0 rounded-full border-2 transition-colors",
                consult === v
                  ? "border-tp-blue-500 bg-tp-blue-500 shadow-[inset_0_0_0_2px_white]"
                  : "border-tp-slate-300",
              )} />
              <span className={cn(
                "text-[13px]",
                consult === v ? "font-medium text-tp-slate-900" : "text-tp-slate-600",
              )}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-3 h-px bg-tp-slate-100" />

      {/* Visit Types section */}
      <div className="p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-tp-slate-400">Visit Type</p>
        <div className="flex flex-col gap-0.5">
          {ALL_VISIT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleVtType(t)}
              className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left transition-colors hover:bg-tp-slate-50"
            >
              <span className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-[4px] border-2 transition-colors",
                isVtChecked(t) ? "border-tp-blue-500 bg-tp-blue-500" : "border-tp-slate-300",
              )}>
                {isVtChecked(t) && <Check size={10} strokeWidth={3} className="text-white" />}
              </span>
              <span className={cn("text-[13px]", isVtChecked(t) ? "font-medium text-tp-slate-900" : "text-tp-slate-600")}>
                {t}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-3 h-px bg-tp-slate-100" />

      {/* Footer — Clear (warning orange) + Apply, right-aligned */}
      <div className="flex items-center justify-end gap-3 border-t border-tp-slate-100 p-3 pt-2.5">
        <button
          type="button"
          onClick={handleClear}
          className="text-[12px] font-semibold text-tp-warning-600 underline underline-offset-2 decoration-tp-warning-400 transition-colors hover:text-tp-warning-700"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => onApply(consult, vtFilter)}
          className="rounded-[8px] bg-tp-blue-500 px-4 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-tp-blue-600"
        >
          Apply
        </button>
      </div>
    </div>,
    document.body,
  )
}

// ─── Video Consultation Tooltip ───────────────────────────────────────────────

function VideoConsultTooltip({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [style, setStyle] = useState<React.CSSProperties>({})
  const triggerRef = useRef<HTMLSpanElement | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  function show() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setStyle({
        position: "fixed",
        // Center above the icon, with a small gap
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
        transform: "translate(-50%, -100%)",
        zIndex: 9999,
      })
    }
    setVisible(true)
  }

  function hide() {
    setVisible(false)
  }

  return (
    <>
      <span ref={triggerRef} onMouseEnter={show} onMouseLeave={hide} className="inline-flex cursor-pointer">
        {children}
      </span>
      {visible && mounted &&
        createPortal(
          <div
            style={style}
            className="w-[208px] overflow-hidden rounded-[12px] border border-tp-slate-200 bg-white shadow-[0_8px_24px_-4px_rgba(23,23,37,0.16)]"
          >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-tp-slate-100 px-3 py-2.5">
              <span
                className="flex size-[28px] shrink-0 items-center justify-center rounded-[7px]"
                style={{ background: "rgba(138,77,187,0.12)" }}
              >
                <Video size={14} variant="Bulk" color="var(--tp-violet-500)" />
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-tp-slate-900">Video Consultation</p>
                <p className="text-[11px] text-tp-slate-500">Scheduled call</p>
              </div>
            </div>
            {/* Body */}
            <div className="px-3 py-2.5">
              <p className="mb-2.5 text-[11px] leading-relaxed text-tp-slate-500">
                Patient has requested a video call for this appointment slot.
              </p>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  className="flex-1 rounded-[8px] bg-tp-blue-500 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-tp-blue-600"
                >
                  Join Call
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-[8px] border border-tp-slate-200 py-1.5 text-[11px] font-medium text-tp-slate-700 transition-colors hover:bg-tp-slate-50"
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

// ─── Clinic data ──────────────────────────────────────────────────────────────

const DUMMY_CLINICS = [
  { id: "rajeshwar", name: "Rajeshwar Eye Clinic" },
  { id: "city", name: "City Medical Centre" },
  { id: "sunrise", name: "Sunrise Hospital" },
  { id: "apollo", name: "Apollo Clinic, Banjara Hills" },
  { id: "care", name: "Care Diagnostics" },
]

// ─── TopHeader ────────────────────────────────────────────────────────────────

function TopHeader() {
  const [isClinicMenuOpen, setClinicMenuOpen] = useState(false)
  const [activeClinic, setActiveClinic] = useState(DUMMY_CLINICS[0].id)
  const [clinicSearch, setClinicSearch] = useState("")
  const clinicMenuRef = useRef<HTMLDivElement | null>(null)
  const clinicSearchRef = useRef<HTMLInputElement | null>(null)
  const clinicListRef = useRef<HTMLDivElement | null>(null)
  const [clinicListCanScrollDown, setClinicListCanScrollDown] = useState(false)

  function updateClinicScrollState() {
    const el = clinicListRef.current
    if (!el) return
    setClinicListCanScrollDown(el.scrollHeight > el.scrollTop + el.clientHeight + 2)
  }

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!clinicMenuRef.current?.contains(event.target as Node)) {
        setClinicMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [])

  // Focus search input + init scroll indicator when dropdown opens
  useEffect(() => {
    if (isClinicMenuOpen) {
      setClinicSearch("")
      setTimeout(() => {
        clinicSearchRef.current?.focus()
        updateClinicScrollState()
      }, 50)
    }
  }, [isClinicMenuOpen])

  // Re-check scroll indicator when filter changes
  useEffect(() => {
    if (isClinicMenuOpen) {
      requestAnimationFrame(updateClinicScrollState)
    }
  }, [clinicSearch, isClinicMenuOpen])

  const activeClinicName = DUMMY_CLINICS.find((c) => c.id === activeClinic)?.name ?? "Clinic"

  const filteredClinics = DUMMY_CLINICS.filter((c) =>
    c.name.toLowerCase().includes(clinicSearch.toLowerCase()),
  )

  return (
    <header className="flex h-[62px] shrink-0 items-center border-b border-tp-slate-100 bg-tp-slate-0 px-4 py-2.5">
      <div className="flex min-w-0 flex-1 items-center">
        <img
          src={REF_LOGO}
          alt="TatvaPractice"
          className="h-8 w-auto object-contain"
        />
      </div>

      <div className="flex items-center gap-3.5">
        {/* Tutorial icon — same as RxPad */}
        <button
          type="button"
          className="relative inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10.5px] transition-colors hover:bg-tp-slate-50"
          aria-label="Play tutorial"
        >
          <svg className="block h-[42px] w-[42px]" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
            <g id="Tutorial">
              <g id="Union" opacity="0.8">
                <path clipRule="evenodd" d={svgPaths.p3172ac80} fill="var(--fill-0, #8A4DBB)" fillRule="evenodd" />
                <path clipRule="evenodd" d={svgPaths.p2ee5cec0} fill="var(--fill-0, #8A4DBB)" fillRule="evenodd" />
              </g>
            </g>
          </svg>
        </button>

        <button
          type="button"
          className="relative inline-flex size-[42px] items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-200"
          aria-label="Notifications"
        >
          <Notification size={20} variant="Linear" strokeWidth={1.5} />
          <span className="absolute -top-0.5 right-1 size-2.5 rounded-full border-2 border-white bg-red-500" />
        </button>

        <div className="bg-gradient-to-b from-[rgba(208,213,221,0.2)] h-[42px] opacity-80 shrink-0 to-[rgba(208,213,221,0.2)] via-1/2 via-[#d0d5dd] w-[1.05px]" />

        {/* Clinic selector with search + scrollable list */}
        <div className="relative hidden sm:block" ref={clinicMenuRef}>
          <button
            type="button"
            onClick={() => setClinicMenuOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-tp-slate-100 px-4 py-2 transition-colors hover:bg-tp-slate-200"
            aria-label="Switch clinic"
            aria-expanded={isClinicMenuOpen}
          >
            <Hospital size={20} variant="Linear" strokeWidth={1.5} color="var(--tp-slate-700)" />
            <span className="max-w-[120px] truncate text-[14.7px] text-tp-slate-700">
              {activeClinicName.length > 18 ? activeClinicName.substring(0, 18) + "…" : activeClinicName}
            </span>
            <ChevronDown
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-200"
              style={{ transform: isClinicMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          {isClinicMenuOpen && (
            <div className="absolute right-0 top-[46px] z-50 w-[240px] overflow-hidden rounded-[12px] border border-tp-slate-200 bg-white shadow-[0_12px_24px_-4px_rgba(23,23,37,0.10)]">
              {/* Search input */}
              <div className="border-b border-tp-slate-100 p-2">
                <div className="relative">
                  <Search
                    size={14}
                    strokeWidth={1.5}
                    className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-tp-slate-400"
                  />
                  <input
                    ref={clinicSearchRef}
                    type="text"
                    value={clinicSearch}
                    onChange={(e) => setClinicSearch(e.target.value)}
                    placeholder="Search clinics..."
                    className="h-[32px] w-full rounded-[8px] border border-tp-slate-200 bg-tp-slate-50 pl-7 pr-2 text-[13px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-300 focus:outline-none focus:ring-1 focus:ring-tp-blue-200"
                  />
                </div>
              </div>

              {/* Clinic list — scrollable when many items, with scroll indicator */}
              <div className="relative">
                <div
                  ref={clinicListRef}
                  onScroll={updateClinicScrollState}
                  className="max-h-[200px] overflow-y-auto py-1"
                >
                  <p className="px-3 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-tp-slate-400">
                    Your Clinics
                  </p>
                  {filteredClinics.length === 0 ? (
                    <p className="px-3 py-3 text-[13px] text-tp-slate-400">No clinics found</p>
                  ) : (
                    filteredClinics.map((clinic) => (
                      <button
                        key={clinic.id}
                        type="button"
                        onClick={() => {
                          setActiveClinic(clinic.id)
                          setClinicMenuOpen(false)
                        }}
                        className={cn(
                          "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors",
                          clinic.id === activeClinic
                            ? "bg-tp-blue-50 text-tp-blue-700"
                            : "text-tp-slate-700 hover:bg-tp-slate-50",
                        )}
                      >
                        <Hospital
                          size={16}
                          variant={clinic.id === activeClinic ? "Bulk" : "Linear"}
                          strokeWidth={1.5}
                          color={clinic.id === activeClinic ? "var(--tp-blue-500)" : "var(--tp-slate-500)"}
                        />
                        <span className="flex-1 truncate">{clinic.name}</span>
                        {clinic.id === activeClinic && (
                          <TickCircle size={14} variant="Bold" color="var(--tp-blue-500)" />
                        )}
                      </button>
                    ))
                  )}
                </div>
                {/* Scroll-down indicator — gradient fade with chevron */}
                {clinicListCanScrollDown && (
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex h-9 items-end justify-center rounded-b-[12px] bg-gradient-to-t from-white via-white/80 to-transparent pb-1.5">
                    <ChevronDown size={13} strokeWidth={2} className="text-tp-slate-400" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <button
          type="button"
          className="relative inline-flex size-[42px] items-center justify-center rounded-full transition-opacity hover:opacity-80"
          aria-label="Profile"
        >
          <span
            className="inline-flex size-full items-center justify-center rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, #FFDE00, #FD5900) padding-box, linear-gradient(to bottom, #FFDE00, #FD5900) border-box",
            }}
          >
            <span className="inline-flex size-full overflow-hidden rounded-full border border-white">
              <img src={REF_AVATAR} alt="User" className="size-full object-cover" />
            </span>
          </span>
        </button>
      </div>
    </header>
  )
}
