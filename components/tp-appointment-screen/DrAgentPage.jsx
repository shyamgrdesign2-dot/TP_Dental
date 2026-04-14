"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import clsx from "clsx";
import Slide from "@mui/material/Slide";
import { Calendar2, CalendarAdd, ClipboardClose, ClipboardText, ClipboardTick, Clock, DocumentLike, DocumentSketch, Flash, Hospital, MessageProgramming, Messages2, Notification, Profile2User, Timer, ReceiptText, SearchNormal1, Shop, TickCircle, Video, } from "iconsax-reactjs";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, LayoutList, ListFilter, MoreVertical, Plus, Search, Star, X } from "lucide-react";
import styles from "./DrAgentPage.module.scss";
import { TPButton as Button, TPSplitButton } from "@/components/tp-ui/button-system";
import { TPSecondaryNavPanel, TPTag } from "@/components/tp-ui";
import { TPSnackbar } from "@/components/tp-ui";
import { AppointmentBanner } from "@/components/appointments/AppointmentBanner";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import svgPaths from "@/components/tp-rxpad/imports/svg-gb0jbe9ifm";
import { BOOKED_APPT_EVENT, computeDateKey, formatHumanDate, loadBookedAppointments, } from "./booked-appointments-store";
const REF_LOGO = "/assets/b38df11ad80d11b9c1d530142443a18c2f53d406.png";
const REF_AVATAR = "/assets/52cb18088c5b8a5db6a7711c9900d7d08a1bac42.png";
const navItems = [
    { id: "appointments", label: "Appointments", icon: Calendar2 },
    {
        id: "ask-tatva",
        label: "Ask Tatva",
        icon: Messages2,
        badge: {
            text: "New",
            gradient: "linear-gradient(257.32deg, rgb(22, 163, 74) 0%, rgb(68, 207, 119) 47.222%, rgb(22, 163, 74) 94.444%)",
        },
    },
    {
        id: "opd-billing",
        label: "OPD Billing",
        icon: ReceiptText,
        badge: {
            text: "Trial",
            gradient: "linear-gradient(257.32deg, rgb(241, 82, 35) 0%, rgb(255, 152, 122) 47.222%, rgb(241, 82, 35) 94.444%)",
        },
    },
    { id: "all-patients", label: "All Patients", icon: Profile2User },
    { id: "follow-ups", label: "Follow-ups", icon: CalendarAdd },
    { id: "pharmacy", label: "Pharmacy", icon: Shop },
    { id: "ipd", label: "IPD", icon: Hospital },
    { id: "daycare", label: "Daycare", icon: DocumentLike },
    { id: "bulk-messages", label: "Bulk Messages", icon: MessageProgramming },
];
const appointmentTabs = [
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
];
const queueAppointments = [
    {
        id: "apt-new",
        serial: 1,
        name: "Ria Kapoor",
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
        serial: 7,
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
];
// ─── Column sort / filter helpers ────────────────────────────────────────────
const ALL_VISIT_TYPES = ["Follow-up", "New", "Routine"];
function parseSlotTime(t) {
    const [time, mer] = t.split(" ");
    const [h, m] = time.split(":").map(Number);
    const hour = mer === "pm" && h < 12 ? h + 12 : mer === "am" && h === 12 ? 0 : h;
    return hour * 60 + m;
}
function toMeridiemSlot(time12) {
    if (!time12) return "";
    const trimmed = time12.trim();
    const [hhmm, mer] = trimmed.split(/\s+/);
    if (!hhmm || !mer) return trimmed.toLowerCase();
    return `${hhmm} ${mer.toLowerCase()}`;
}
function mergeBookedAppointments(baseQueue, bookedList) {
    if (!bookedList || bookedList.length === 0) return baseQueue;
    const templateByPatient = new Map();
    for (const row of baseQueue) {
        if (row.id && !templateByPatient.has(row.id))
            templateByPatient.set(row.id, row);
    }
    const extras = [];
    let nextSerial = baseQueue.length + 1;
    for (const booked of bookedList) {
        const template = templateByPatient.get(booked.patientId);
        if (!template) continue;
        extras.push({
            ...template,
            id: booked.id,
            serial: nextSerial++,
            slotTime: toMeridiemSlot(booked.time),
            slotDate: formatHumanDate(booked.date),
            dateKey: computeDateKey(booked.date),
            visitBadge: { text: "Scheduled", tone: "info" },
            visitType: template.visitType,
            status: "queue",
            // Tag the row so UI can show why it was added, if it wants to.
            bookedFromPlan: true,
            bookedServiceName: booked.serviceName,
            bookedToothLabel: booked.toothLabel,
            bookedDoctor: booked.doctor,
        });
    }
    return [...baseQueue, ...extras];
}
function matchesDateFilter(rowDateKey, selected) {
    if (selected === "today")
        return rowDateKey === "today";
    if (selected === "yesterday")
        return rowDateKey === "yesterday";
    if (selected === "past-3-months" || selected === "next-3-months") {
        return rowDateKey === "today" || rowDateKey === "yesterday" || rowDateKey === "past-3-months";
    }
    // past-4-months, next-4-months → show all
    return true;
}
function inferDatePresetFromDate(date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
    if (diff === 0)
        return "today";
    if (diff === -1)
        return "yesterday";
    if (diff > 0)
        return diff <= 92 ? "next-3-months" : "next-4-months";
    return Math.abs(diff) <= 92 ? "past-3-months" : "past-4-months";
}
function formatCalendarFilterLabel(date, mode) {
    if (mode === "month") {
        return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
    if (mode === "day") {
        if (isSameDate(date, startOfDay(new Date())))
            return "Today";
        return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
    }
    const weekStart = startOfWeek(date);
    const weekEnd = addDays(weekStart, 6);
    const sameMonth = weekStart.getMonth() === weekEnd.getMonth() && weekStart.getFullYear() === weekEnd.getFullYear();
    if (sameMonth) {
        return `${weekStart.getDate()}-${weekEnd.getDate()} ${weekStart.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
    }
    return `${weekStart.toLocaleDateString("en-US", { day: "numeric", month: "short" })} - ${weekEnd.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}`;
}
const TAB_EMPTY_MESSAGES = {
    "queue": "There are no patients in the queue right now",
    "finished": "You haven't finished any consultations yet",
    "cancelled": "Nothing here — you haven't cancelled any appointments",
    "draft": "You haven't saved any drafts yet",
    "pending-digitisation": "No pending digitisations right now",
};
const TAB_EMPTY_ICONS = {
    "queue": Clock,
    "finished": ClipboardTick,
    "cancelled": ClipboardClose,
    "draft": ClipboardText,
    "pending-digitisation": DocumentSketch,
};
export function DrAgentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeRailItem, setActiveRailItem] = useState(navItems[0].id);
    const [activeTab, setActiveTab] = useState("queue");
    const [appointmentViewMode, setAppointmentViewMode] = useState("list");
    const [calendarGranularity, setCalendarGranularity] = useState("day");
    const [calendarCursorDate, setCalendarCursorDate] = useState(new Date());
    const [appointments, setAppointments] = useState(() => mergeBookedAppointments(queueAppointments, loadBookedAppointments()));
    // Live-update when the Plan drawer books / edits / removes an appointment.
    useEffect(() => {
        if (typeof window === "undefined") return;
        const refresh = () => {
            setAppointments(mergeBookedAppointments(queueAppointments, loadBookedAppointments()));
        };
        window.addEventListener(BOOKED_APPT_EVENT, refresh);
        return () => window.removeEventListener(BOOKED_APPT_EVENT, refresh);
    }, []);
    const [query, setQuery] = useState("");
    const [tabDateFilters, setTabDateFilters] = useState({});
    const dateFilter = tabDateFilters[activeTab] ?? "today";
    function setDateFilter(id) {
        setTabDateFilters((prev) => {
            if (prev[activeTab] === id)
                return prev;
            return { ...prev, [activeTab]: id };
        });
    }
    const tableOverflowRef = useRef(null);
    const [isTableScrolled, setIsTableScrolled] = useState(false);
    useEffect(() => {
        const el = tableOverflowRef.current;
        if (!el)
            return;
        const handler = () => setIsTableScrolled(el.scrollLeft > 0);
        el.addEventListener("scroll", handler, { passive: true });
        return () => el.removeEventListener("scroll", handler);
    }, []);
    // ── Column sort + unified filter ─────────────────────────────────────────
    const [slotSort, setSlotSort] = useState("none");
    const [slotConsult, setSlotConsult] = useState("all");
    const [vtFilter, setVtFilter] = useState([]);
    // Filter panel (portal)
    const filterBtnRef = useRef(null);
    const filterPanelRef = useRef(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterStyle, setFilterStyle] = useState({});
    const [filterMounted, setFilterMounted] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    useEffect(() => { setFilterMounted(true); }, []);
    useEffect(() => {
        if (appointmentViewMode === "calendar") {
            setCalendarGranularity("day");
        }
    }, [appointmentViewMode]);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const snackbarType = searchParams?.get("snackbar");
        const pendingKey = "tp.snackbar.appointment-completed";
        if (snackbarType === "appointment-completed") {
            window.sessionStorage.setItem(pendingKey, "1");
            router.replace("/appointments");
            return;
        }
        if (window.sessionStorage.getItem(pendingKey) === "1") {
            window.sessionStorage.removeItem(pendingKey);
            setSnackbarMessage("Appointment completed successfully");
            setSnackbarOpen(true);
        }
    }, [router, searchParams]);
    function handleFilterBtnClick() {
        if (filterOpen) {
            setFilterOpen(false);
            return;
        }
        const rect = filterBtnRef.current.getBoundingClientRect();
        setFilterStyle({ position: "fixed", top: rect.bottom + 4, right: window.innerWidth - rect.right, zIndex: 9999 });
        setFilterOpen(true);
    }
    const activeFilterCount = vtFilter.length + (slotConsult !== "all" ? 1 : 0);
    const hasActiveFilters = !!(query.trim()) || vtFilter.length > 0 || slotConsult !== "all" || dateFilter !== "today";
    const visibleAppointments = useMemo(() => {
        let rows = appointments.filter((row) => {
            const tabMatch = row.status === activeTab;
            const dateMatch = matchesDateFilter(row.dateKey, dateFilter);
            const slotMatch = slotConsult === "all" ? true
                : slotConsult === "video" ? row.hasVideo : !row.hasVideo;
            const vtMatch = vtFilter.length === 0 ? true : vtFilter.includes(row.visitType);
            const q = query.trim().toLowerCase();
            if (!tabMatch || !dateMatch || !slotMatch || !vtMatch)
                return false;
            if (!q)
                return true;
            return (row.name.toLowerCase().includes(q) ||
                row.contact.toLowerCase().includes(q) ||
                row.visitType.toLowerCase().includes(q));
        });
        if (slotSort !== "none") {
            rows = [...rows].sort((a, b) => {
                const d = parseSlotTime(a.slotTime) - parseSlotTime(b.slotTime);
                return slotSort === "asc" ? d : -d;
            });
        }
        return rows;
    }, [activeTab, dateFilter, query, slotSort, slotConsult, vtFilter, appointments]);
    // Calculate counts for each tab
    const getTabCount = (tabId) => {
        return appointments.filter((row) => {
            const tabMatch = row.status === tabId;
            const dateMatch = matchesDateFilter(row.dateKey, dateFilter);
            const slotMatch = slotConsult === "all" ? true
                : slotConsult === "video" ? row.hasVideo : !row.hasVideo;
            const vtMatch = vtFilter.length === 0 ? true : vtFilter.includes(row.visitType);
            const q = query.trim().toLowerCase();
            if (!tabMatch || !dateMatch || !slotMatch || !vtMatch)
                return false;
            if (!q)
                return true;
            return (row.name.toLowerCase().includes(q) ||
                row.contact.toLowerCase().includes(q) ||
                row.visitType.toLowerCase().includes(q));
        }).length;
    };
    const handleUpdateCalendarAppointment = (rowId, patch) => {
        setAppointments((prev) => prev.map((row) => row.id === rowId
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
            : row));
    };
    const handleCalendarStart = (row) => {
        router.push(`/rxpad?patientId=${row.id}`);
    };
    const handleCalendarAddVitals = (row) => {
        setSnackbarMessage(`Opening vitals for ${row.name}`);
        setSnackbarOpen(true);
    };
    const handleCalendarOpenReports = (row) => {
        router.push(`/patient-detail?patientId=${row.id}&from=appointments`);
    };
    const handleCalendarInvite = (row) => {
        setSnackbarMessage(`Invite sent to ${row.name}`);
        setSnackbarOpen(true);
    };
    const handleCalendarEndVisit = (row) => {
        router.push(`/rxpad/end-visit?patientId=${row.id}`);
    };
    const handleCalendarDelete = (rowId) => {
        setAppointments((prev) => prev.filter((row) => row.id !== rowId));
        setSnackbarMessage("Appointment deleted");
        setSnackbarOpen(true);
    };
    return (<div className={styles.page}>
      <TopHeader />

      <div className={styles.bodyRow}>
        <aside className={styles.asideRail}>
          <TPSecondaryNavPanel items={navItems} activeId={activeRailItem} onSelect={setActiveRailItem} variant="primary" height="100%" bottomSpacerPx={96} renderIcon={({ item, isActive, iconSize }) => {
            const Icon = item.icon;
            return (<Icon size={iconSize} variant={isActive ? "Bulk" : "Linear"} strokeWidth={isActive ? undefined : 1.5} color={isActive ? "var(--tp-slate-0)" : "var(--tp-slate-700)"}/>);
        }}/>
        </aside>

        <main className={styles.main}>
          <section className={styles.section}>
            <div className={styles.mobileNav}>
              <div className={styles.mobileNavRow}>
                {navItems.map((item) => {
            const isActive = item.id === activeRailItem;
            return (<button key={item.id} type="button" onClick={() => setActiveRailItem(item.id)} className={clsx(styles.mobilePill, isActive && styles.mobilePillActive)}>
                      {item.label}
                    </button>);
        })}
              </div>
            </div>

            <div className={styles.bannerWrap}>
              <AppointmentBanner title="Your Appointments" actions={<>
                    <Button variant="outline" theme="primary" size="md" surface="dark" className={styles.addApptBtn} leftIcon={<Plus size={20} strokeWidth={1.5}/>}>
                      Add Appointment
                    </Button>
                    <Button variant="solid" theme="primary" size="md" surface="dark" className={styles.startWalkInBtn} leftIcon={<Flash size={24} variant="Linear" strokeWidth={1.5}/>}>
                      Start Walk-In
                    </Button>
                  </>}/>
            </div>

            <div className={styles.cardOverlap}>
              <div className={styles.cardInner}>

                <div className={styles.tabBar}>
                  <div className={styles.tabRow}>
                    {appointmentTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (<button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={clsx(styles.tabButton, isActive && styles.tabButtonActive)} aria-pressed={isActive}>
                          <span className={styles.tabLabelRow}>
                            <Icon size={20} variant={isActive ? "Bulk" : "Linear"} strokeWidth={isActive ? undefined : 1.5} color={isActive ? "var(--tp-blue-500)" : "var(--tp-slate-600)"}/>
                            <span className={clsx(isActive && styles.tabTitleActive)}>
                              {tab.label}
                            </span>
                            <span className={clsx(styles.tabCount, isActive && styles.tabCountActive)}>
                              {getTabCount(tab.id)}
                            </span>
                          </span>

                          <span className={clsx(styles.tabUnderline, isActive && styles.tabUnderlineActive)}/>
                        </button>);
        })}
                  </div>
                </div>

                <div className={styles.searchBar}>
                  <div className={styles.searchRow}>
                    <label className={styles.searchLabel}>
                      <SearchNormal1 size={20} variant="Linear" strokeWidth={1.5} className={styles.searchIcon}/>
                      <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by patient name / ID / mobile number" className={styles.searchInput}/>
                    </label>

                    <div className={styles.toolbarRight}>
                      <div className={styles.viewToggle}>
                        <button type="button" onClick={() => setAppointmentViewMode("list")} className={clsx(styles.viewToggleBtn, appointmentViewMode === "list" && styles.viewToggleBtnActive)} aria-pressed={appointmentViewMode === "list"} title="List view">
                          <LayoutList size={15} strokeWidth={2}/>
                        </button>
                        <button type="button" onClick={() => setAppointmentViewMode("calendar")} className={clsx(styles.viewToggleBtn, appointmentViewMode === "calendar" && styles.viewToggleBtnActive)} aria-pressed={appointmentViewMode === "calendar"} title="Calendar view">
                          <CalendarDays size={15} strokeWidth={2}/>
                        </button>
                      </div>

                      <button ref={filterBtnRef} type="button" onClick={handleFilterBtnClick} className={clsx(styles.filterBtn, activeFilterCount > 0 && styles.filterBtnActive)}>
                        <ListFilter size={15} strokeWidth={2} className={styles.filterBtnIcon}/>
                        <span>Filter</span>
                        {activeFilterCount > 0 && (<span className={styles.filterCountBadge}>
                            {activeFilterCount}
                          </span>)}
                      </button>

                      <DateRangePicker value={dateFilter} onChange={(sel) => setDateFilter(sel.presetId)} triggerLabelOverride={appointmentViewMode === "calendar"
            ? formatCalendarFilterLabel(calendarCursorDate, calendarGranularity)
            : undefined} className={styles.datePickerClass} hideFuturePresets={activeTab !== "queue"}/>
                    </div>
                  </div>
                </div>

                {(vtFilter.length > 0 || slotConsult !== "all") && (<div className={styles.filterTagsOuter}>
                    <div className={styles.filterTagsBar}>
                      <span className={styles.filterTagsLabel}>
                        Filter: {activeFilterCount}
                      </span>
                      <span className={styles.filterTagsDivider}/>
                      {slotConsult !== "all" && (<FilterTag prefix="Slot" value={slotConsult === "video" ? "Teleconsultation" : "In-Clinic"} onRemove={() => setSlotConsult("all")}/>)}
                      {vtFilter.map((vt) => (<FilterTag key={vt} prefix="Visit Type" value={vt} onRemove={() => setVtFilter((p) => p.filter((v) => v !== vt))}/>))}
                      <button type="button" onClick={() => { setSlotConsult("all"); setVtFilter([]); }} className={clsx(styles.linkWarning, styles.linkWarningEnd)}>
                        Clear all
                      </button>
                    </div>
                  </div>)}

                <div className={styles.bodyFlex}>
                  {appointmentViewMode === "list" ? (<div ref={tableOverflowRef} className={styles.tableScroll}>
                      <div className={styles.tableInner}>
                        <table className={styles.table}>
                        <thead>
                          <tr className={styles.theadRow}>
                            <th className={styles.thHash}>
                              #
                            </th>
                            <th className={styles.thName}>
                              Name
                            </th>
                            <th className={styles.thContact}>
                              Contact
                            </th>
                            <th className={styles.thVisit}>
                              Visit Type
                            </th>
                            <th className={styles.thSlot}>
                              <button type="button" onClick={() => setSlotSort((s) => s === "none" ? "asc" : s === "asc" ? "desc" : "none")} className={clsx(styles.slotSortBtn, slotSort !== "none" && styles.slotSortBtnActive)}>
                                <span className={styles.uppercase}>Slot</span>
                                <ColumnSortIcon dir={slotSort}/>
                              </button>
                            </th>
                            <th className={clsx(styles.thAction, isTableScrolled && styles.thActionShadow)}>
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {visibleAppointments.length === 0 ? (<tr>
                              <td colSpan={6} className={styles.emptyCell}>
                                <div className={styles.emptyState}>
                                  {(() => {
                    const EmptyIcon = TAB_EMPTY_ICONS[activeTab];
                    return (<EmptyIcon size={140} variant="Bulk" color="var(--tp-slate-200)"/>);
                })()}
                                  <p className={styles.emptyText}>
                                    {hasActiveFilters
                    ? "No appointments matching your filters."
                    : TAB_EMPTY_MESSAGES[activeTab]}
                                  </p>
                                  {hasActiveFilters && (<button type="button" onClick={() => { setQuery(""); setSlotConsult("all"); setVtFilter([]); setTabDateFilters({}); }} className={clsx(styles.linkWarning, styles.emptyClear)}>
                                      Clear all filters
                                    </button>)}
                                </div>
                              </td>
                            </tr>) : (visibleAppointments.map((row, index) => (<tr key={row.id} className={styles.dataRow}>
                                <td className={styles.tdIndex}>
                                  {index + 1}
                                </td>

                                <td className={styles.tdMiddle}>
                                  <div className={styles.maxW200}>
                                    <p className={styles.patientName} onClick={() => router.push(`/patient-detail?patientId=${row.id}&from=appointments`)}>
                                      {row.name}
                                    </p>
                                    <p className={clsx(styles.patientMeta, styles.mt1)}>
                                      {row.gender}, {row.age}y
                                      {row.starred && (<span className={styles.starInline}>
                                          <Star size={14} fill="var(--tp-success-500)" stroke="var(--tp-success-500)"/>
                                        </span>)}
                                    </p>
                                  </div>
                                </td>

                                <td className={styles.tdMiddle}>
                                  <div className={styles.maxW180}>
                                    <span className={styles.contactText}>
                                      {row.contact}
                                    </span>
                                    {row.contactBadge && (<div className={styles.mt1}>
                                        <TPTag color="violet" variant="light" size="sm">
                                          {row.contactBadge}
                                        </TPTag>
                                      </div>)}
                                  </div>
                                </td>

                                <td className={clsx(styles.tdMiddle, styles.tdVisit)}>
                                  <div className={styles.maxW160}>
                                    <span className={styles.visitTypeText}>{row.visitType}</span>
                                    {row.visitBadge && (<div className={styles.mt1}>
                                        <TPTag color={row.visitBadge.tone === "warning" ? "warning" : "success"} variant={row.visitBadge.tone === "warning" ? "light" : "light"} size="sm">
                                          {row.visitBadge.text}
                                        </TPTag>
                                      </div>)}
                                  </div>
                                </td>

                                <td className={styles.tdMiddle}>
                                  <div className={styles.maxW150}>
                                    <div className={styles.slotInner}>
                                      <span className={styles.slotTimeRow}>
                                        {row.slotTime}
                                        {row.hasVideo && (<VideoConsultTooltip>
                                            <Video size={13} variant="Bulk" color="var(--tp-violet-500)"/>
                                          </VideoConsultTooltip>)}
                                      </span>
                                    </div>
                                    <p className={clsx(styles.slotDate, styles.mt1)}>
                                      {row.slotDate}
                                    </p>
                                  </div>
                                </td>

                                <td className={clsx(styles.tdAction, isTableScrolled && styles.tdActionShadow)}>
                                  <div className={styles.actionRow}>
                                    <div className={styles.splitBtnWrap}>
                                      <TPSplitButton primaryAction={{
                    label: "TypeRx",
                    onClick: () => router.push(`/rxpad?patientId=${row.id}`),
                }} secondaryActions={[
                    { id: "voice-rx", label: "VoiceRx", onClick: () => router.push(`/rxpad?patientId=${row.id}`) },
                    { id: "tab-rx", label: "TabRx", onClick: () => router.push(`/rxpad?patientId=${row.id}`) },
                    { id: "snap-rx", label: "SnapRx", onClick: () => router.push(`/rxpad?patientId=${row.id}`) },
                    { id: "smart-sync", label: "SmartSync", onClick: () => router.push(`/rxpad?patientId=${row.id}`) },
                ]} variant="outline" theme="primary" size="md"/>
                                    </div>

                                    <button type="button" aria-label="AI action" className={styles.aiActionBtn} style={{
                    background: "linear-gradient(135deg, rgba(213,101,234,0.25) 0%, rgba(103,58,172,0.25) 45%, rgba(26,25,148,0.25) 100%)",
                }}>
                                      <AiSparkIcon />
                                    </button>

                                    <button type="button" aria-label="More options" className={styles.moreBtn}>
                                      <MoreVertical size={20} strokeWidth={1.5}/>
                                    </button>
                                  </div>
                                </td>
                              </tr>)))}
                        </tbody>
                        </table>
                      </div>
                    </div>) : (<div className={styles.calendarScroll}>
                      <AppointmentsCalendarView rows={visibleAppointments} granularity={calendarGranularity} onGranularityChange={setCalendarGranularity} datePreset={dateFilter} onDatePresetChange={setDateFilter} onCursorDateChange={setCalendarCursorDate} onUpdate={handleUpdateCalendarAppointment} onStart={handleCalendarStart} onAddVitals={handleCalendarAddVitals} onOpenReports={handleCalendarOpenReports} onInvite={handleCalendarInvite} onEndVisit={handleCalendarEndVisit} onDelete={handleCalendarDelete}/>
                    </div>)}
                </div>

              </div>
            </div>
          </section>
        </main>
      </div>

      {filterMounted && filterOpen && (<CommonFilterPanel style={filterStyle} panelRef={filterPanelRef} triggerRef={filterBtnRef} currentConsult={slotConsult} currentVtFilter={vtFilter} onApply={(consult, vtf) => { setSlotConsult(consult); setVtFilter(vtf); setFilterOpen(false); }}/>)}

      <TPSnackbar open={snackbarOpen} message={snackbarMessage ?? ""} severity="success" anchorOrigin={{ vertical: "top", horizontal: "center" }} TransitionComponent={Slide} TransitionProps={{ direction: "down" }} autoHideDuration={1800} onClose={(_, reason) => {
            if (reason === "clickaway")
                return;
            setSnackbarOpen(false);
            setSnackbarMessage(null);
        }}/>
    </div>);
}
// ─── Sub-components ────────────────────────────────────────────────────────────
function AiSparkIcon() {
    return (<span className={styles.aiSparkWrap}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="ai-spark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D565EA"/>
            <stop offset="45%" stopColor="#673AAC"/>
            <stop offset="100%" stopColor="#1A1994"/>
          </linearGradient>
        </defs>
        <path d="M18.0841 11.612C18.4509 11.6649 18.4509 12.3351 18.0841 12.388C14.1035 12.9624 12.9624 14.1035 12.388 18.0841C12.3351 18.4509 11.6649 18.4509 11.612 18.0841C11.0376 14.1035 9.89647 12.9624 5.91594 12.388C5.5491 12.3351 5.5491 11.6649 5.91594 11.612C9.89647 11.0376 11.0376 9.89647 11.612 5.91594C11.6649 5.5491 12.3351 5.5491 12.388 5.91594C12.9624 9.89647 14.1035 11.0376 18.0841 11.612Z" fill="url(#ai-spark-gradient)"/>
      </svg>
    </span>);
}
// ─── Dynamic sort icon (active direction highlighted in blue) ─────────────────
function ColumnSortIcon({ dir }) {
    return (<span className={styles.sortCol}>
      <span className={clsx(styles.sortCaretSmUp, dir === "asc" && styles.sortCaretSmUpActive)}/>
      <span className={clsx(styles.sortCaretSmDown, dir === "desc" && styles.sortCaretSmDownActive)}/>
    </span>);
}
// ─── Filter chip tag ──────────────────────────────────────────────────────────
function FilterTag({ prefix, value, onRemove }) {
    return (<span className={styles.filterChip}>
      <span className={styles.filterChipPrefix}>{prefix}:</span>
      <span className={styles.filterChipValue}>{value}</span>
      <button type="button" onClick={onRemove} className={styles.filterChipRemove}>
        <X size={10} strokeWidth={2.5}/>
      </button>
    </span>);
}
function toDateRangeKey(date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diff = Math.round((today.getTime() - target.getTime()) / 86400000);
    if (diff === 0)
        return "today";
    if (diff === 1)
        return "yesterday";
    return diff <= 92 ? "past-3-months" : "past-4-months";
}
function toMeridiemTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const suffix = hours >= 12 ? "pm" : "am";
    hours %= 12;
    if (hours === 0)
        hours = 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
}
function ordinal(day) {
    if (day % 10 === 1 && day % 100 !== 11)
        return `${day}st`;
    if (day % 10 === 2 && day % 100 !== 12)
        return `${day}nd`;
    if (day % 10 === 3 && day % 100 !== 13)
        return `${day}rd`;
    return `${day}th`;
}
function toHumanDate(date) {
    return `${ordinal(date.getDate())} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;
}
function parseSlotDate(value) {
    const normalized = value.replace(/(\d+)(st|nd|rd|th)/, "$1");
    const parsed = new Date(normalized);
    if (!Number.isNaN(parsed.getTime()))
        return parsed;
    return new Date();
}
function toEventStart(row) {
    const date = resolveRowDate(row);
    const mins = parseSlotTime(row.slotTime);
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0, 0);
}
function resolveRowDate(row) {
    const today = startOfDay(new Date());
    // Plan-booked rows always have a real slotDate, even for past/future buckets.
    if (row.bookedFromPlan)
        return parseSlotDate(row.slotDate);
    if (row.dateKey === "today")
        return today;
    if (row.dateKey === "yesterday")
        return addDays(today, -1);
    if (row.dateKey === "past-3-months")
        return addDays(today, -(14 + (row.serial % 21)));
    if (row.dateKey === "past-4-months")
        return addDays(today, -(35 + (row.serial % 40)));
    return parseSlotDate(row.slotDate);
}
function toInputDate(date) {
    const yyyy = date.getFullYear();
    const mm = `${date.getMonth() + 1}`.padStart(2, "0");
    const dd = `${date.getDate()}`.padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
function toInputTime(date) {
    return `${`${date.getHours()}`.padStart(2, "0")}:${`${date.getMinutes()}`.padStart(2, "0")}`;
}
function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function startOfWeek(date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - day);
    return d;
}
function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}
function isSameDate(a, b) {
    return (a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate());
}
function AppointmentsCalendarView({ rows, granularity, onGranularityChange, datePreset, onDatePresetChange, onCursorDateChange, onUpdate, onStart, onAddVitals, onOpenReports, onInvite, onEndVisit, onDelete, }) {
    const [cursorDate, setCursorDate] = useState(new Date());
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [draft, setDraft] = useState({
        name: "",
        contact: "",
        visitType: "New",
        date: toInputDate(new Date()),
        time: "10:00",
        durationMin: 30,
        hasVideo: false,
    });
    const events = useMemo(() => [], [rows]);
    const openEdit = (row, start) => {
        setEditingId(row.id);
        setDraft({
            name: row.name,
            contact: row.contact,
            visitType: row.visitType,
            date: toInputDate(start),
            time: toInputTime(start),
            durationMin: 30,
            hasVideo: row.hasVideo,
        });
        setIsModalOpen(true);
    };
    const submit = () => {
        const start = new Date(`${draft.date}T${draft.time}:00`);
        if (Number.isNaN(start.getTime()))
            return;
        const end = new Date(start.getTime() + draft.durationMin * 60000);
        const payload = {
            name: draft.name.trim(),
            contact: draft.contact.trim(),
            visitType: draft.visitType.trim(),
            start,
            end,
            hasVideo: draft.hasVideo,
        };
        if (!editingId)
            return;
        onUpdate(editingId, payload);
        setIsModalOpen(false);
    };
    useEffect(() => {
        const now = new Date();
        if (datePreset === "today") {
            setCursorDate(now);
            return;
        }
        if (datePreset === "yesterday") {
            setCursorDate(addDays(now, -1));
            return;
        }
        if (datePreset === "past-3-months" || datePreset === "next-3-months") {
            setCursorDate(addDays(now, -45));
            return;
        }
        setCursorDate(addDays(now, -75));
    }, [datePreset]);
    useEffect(() => {
        onDatePresetChange(inferDatePresetFromDate(cursorDate));
    }, [cursorDate, onDatePresetChange]);
    useEffect(() => {
        onCursorDateChange(cursorDate);
    }, [cursorDate, onCursorDateChange]);
    const goPrev = () => {
        if (granularity === "month")
            setCursorDate(new Date(cursorDate.getFullYear(), cursorDate.getMonth() - 1, 1));
        else if (granularity === "week")
            setCursorDate(addDays(cursorDate, -7));
        else
            setCursorDate(addDays(cursorDate, -1));
    };
    const goNext = () => {
        if (granularity === "month")
            setCursorDate(new Date(cursorDate.getFullYear(), cursorDate.getMonth() + 1, 1));
        else if (granularity === "week")
            setCursorDate(addDays(cursorDate, 7));
        else
            setCursorDate(addDays(cursorDate, 1));
    };
    const weekDays = useMemo(() => {
        const ws = startOfWeek(cursorDate);
        return Array.from({ length: 7 }, (_, i) => addDays(ws, i));
    }, [cursorDate]);
    return (<div className={styles.calShell}>
      <div className={styles.calHeader}>
        <div className={styles.calNavGroup}>
          <button type="button" onClick={goPrev} className={styles.calNavBtn}>
            <ChevronLeft size={16}/>
          </button>
          <button type="button" onClick={goNext} className={styles.calNavBtn}>
            <ChevronRight size={16}/>
          </button>
          <p className={styles.calTitle}>
            {cursorDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
        })}
          </p>
        </div>

        <div className={styles.calNavGroup}>
          <div className={styles.calGranularity}>
            {["day", "week", "month"].map((mode) => (<button key={mode} type="button" onClick={() => onGranularityChange(mode)} className={clsx(styles.calModeBtn, granularity === mode && styles.calModeBtnActive)}>
                {mode}
              </button>))}
          </div>
        </div>
      </div>

      <div className={styles.calBody}>
        {granularity === "month" ? (<MonthCalendarGrid cursorDate={cursorDate} events={events} onEdit={openEdit} onStart={onStart} onAddVitals={onAddVitals} onOpenReports={onOpenReports} onInvite={onInvite} onEndVisit={onEndVisit} onDelete={onDelete}/>) : (<WeekDayCalendarGrid mode={granularity} weekDays={weekDays} cursorDate={cursorDate} events={events} onEdit={openEdit} onStart={onStart} onAddVitals={onAddVitals} onOpenReports={onOpenReports} onInvite={onInvite} onEndVisit={onEndVisit} onDelete={onDelete}/>)}
      </div>

      {isModalOpen && (<div className={styles.calModalOverlay}>
          <div className={styles.calModal}>
            <p className={styles.calModalTitle}>Reschedule appointment</p>
            <div className={styles.calModalStack}>
              <input value={draft.name} onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))} placeholder="Patient name" className={styles.calInput}/>
              <input value={draft.contact} onChange={(e) => setDraft((p) => ({ ...p, contact: e.target.value }))} placeholder="Contact number" className={styles.calInput}/>
              <div className={styles.calGrid2}>
                <input type="date" value={draft.date} onChange={(e) => setDraft((p) => ({ ...p, date: e.target.value }))} className={styles.calInput}/>
                <input type="time" value={draft.time} onChange={(e) => setDraft((p) => ({ ...p, time: e.target.value }))} className={styles.calInput}/>
              </div>
              <div className={styles.calGrid2}>
                <input value={draft.visitType} onChange={(e) => setDraft((p) => ({ ...p, visitType: e.target.value }))} placeholder="Visit type" className={styles.calInput}/>
                <select value={draft.durationMin} onChange={(e) => setDraft((p) => ({ ...p, durationMin: Number(e.target.value) }))} className={styles.calInput}>
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={45}>45 min</option>
                  <option value={60}>60 min</option>
                </select>
              </div>
              <label className={styles.calCheckRow}>
                <input type="checkbox" checked={draft.hasVideo} onChange={(e) => setDraft((p) => ({ ...p, hasVideo: e.target.checked }))}/>
                Teleconsultation
              </label>
            </div>

            <div className={styles.calModalFooter}>
              <button type="button" onClick={() => setIsModalOpen(false)} className={styles.calBtnGhost}>
                Cancel
              </button>
              <button type="button" onClick={submit} className={styles.calBtnPrimary}>
                Update
              </button>
            </div>
          </div>
        </div>)}
    </div>);
}
function MonthCalendarGrid({ cursorDate, events, onEdit, onStart, onAddVitals, onOpenReports, onInvite, onEndVisit, onDelete, }) {
    const monthStart = new Date(cursorDate.getFullYear(), cursorDate.getMonth(), 1);
    const gridStart = startOfWeek(monthStart);
    const days = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
    return (<div className={styles.monthGrid}>
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (<div key={d} className={styles.monthDow}>
          {d}
        </div>))}
      {days.map((day) => {
            const dayEvents = events.filter((e) => isSameDate(e.start, day));
            const outside = day.getMonth() !== cursorDate.getMonth();
            return (<div key={day.toISOString()} className={clsx(styles.monthCell, outside && styles.monthCellOutside)}>
            <div className={styles.monthCellHeader}>
              <span className={clsx(styles.monthDayNum, outside ? styles.monthDayMuted : styles.monthDayStrong)}>{day.getDate()}</span>
              {dayEvents.length > 0 && <span className={styles.monthEventCount}>{dayEvents.length}</span>}
            </div>
            <div className={styles.eventList}>
              {dayEvents.slice(0, 3).map((event) => (<div key={event.row.id} className={styles.eventPill}>
                  <button type="button" onClick={() => onEdit(event.row, event.start)} className={styles.eventPillBtn} title={`${toMeridiemTime(event.start)} ${event.row.name}`}>
                    {toMeridiemTime(event.start)} {event.row.name}
                  </button>
                  <CalendarEventMenu row={event.row} onStart={onStart} onAddVitals={onAddVitals} onOpenReports={onOpenReports} onInvite={onInvite} onEndVisit={onEndVisit} onReschedule={() => onEdit(event.row, event.start)} onDelete={onDelete}/>
                </div>))}
              {dayEvents.length > 3 && <span className={styles.eventMore}>+{dayEvents.length - 3} more</span>}
            </div>
          </div>);
        })}
    </div>);
}
function WeekDayCalendarGrid({ mode, weekDays, cursorDate, events, onEdit, onStart, onAddVitals, onOpenReports, onInvite, onEndVisit, onDelete, }) {
    const days = mode === "day" ? [cursorDate] : weekDays;
    const dayStartHour = 8;
    const slots = Array.from({ length: 13 }, (_, i) => dayStartHour + i);
    const slotHeight = 56;
    const gridHeight = slots.length * slotHeight;
    return (<div className={styles.weekRoot}>
      <div className={styles.weekGridHeader} style={{ gridTemplateColumns: `72px repeat(${days.length}, minmax(0, 1fr))` }}>
        <div className={styles.weekCorner}/>
        {days.map((d) => (<div key={d.toISOString()} className={styles.weekColHead}>
            <p className={styles.weekColHeadText}>
              {d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
            </p>
          </div>))}
      </div>
      <div className={styles.weekGridBody} style={{ gridTemplateColumns: `72px repeat(${days.length}, minmax(0, 1fr))` }}>
        <div className={styles.timeCol}>
          {slots.map((hour) => (<div key={hour} className={styles.timeSlot}>
              {hour}:00
            </div>))}
        </div>
        {days.map((day) => {
            const dayEvents = events.filter((e) => isSameDate(e.start, day));
            return (<div key={day.toISOString()} className={styles.dayCol} style={{ height: `${gridHeight}px` }}>
              {slots.map((hour) => (<div key={`${day.toISOString()}-${hour}`} className={styles.daySlotRow}/>))}
              {dayEvents.map((event) => {
                    const startMin = event.start.getHours() * 60 + event.start.getMinutes();
                    const startBase = dayStartHour * 60;
                    const top = Math.max(0, ((startMin - startBase) / 60) * slotHeight);
                    const durMin = Math.max(15, (event.end.getTime() - event.start.getTime()) / 60000);
                    const height = Math.max(104, (durMin / 60) * slotHeight);
                    return (<div key={event.row.id} className={styles.eventCard} style={{ top: `${top}px`, height: `${height}px` }}>
                    <div className={styles.eventCardInner}>
                      <div className={styles.eventCardTop}>
                        <button type="button" onClick={() => onEdit(event.row, event.start)} className={styles.eventCardBtn}>
                          <p className={styles.eventName}>{event.row.name}</p>
                          <p className={styles.eventMeta}>
                            {event.row.gender}, {event.row.age}y • {event.row.contact}
                          </p>
                          <p className={styles.eventMeta}>
                            {toMeridiemTime(event.start)} • {event.row.visitType}
                          </p>
                        </button>
                        <CalendarEventMenu row={event.row} onStart={onStart} onAddVitals={onAddVitals} onOpenReports={onOpenReports} onInvite={onInvite} onEndVisit={onEndVisit} onReschedule={() => onEdit(event.row, event.start)} onDelete={onDelete}/>
                      </div>
                      <div className={styles.eventActions}>
                        <button type="button" onClick={() => onStart(event.row)} className={styles.typeRxBtn}>
                          TypeRx
                        </button>
                        <button type="button" aria-label="AI action" className={styles.aiMini} style={{
                            background: "linear-gradient(135deg, rgba(213,101,234,0.25) 0%, rgba(103,58,172,0.25) 45%, rgba(26,25,148,0.25) 100%)",
                        }}>
                          <span className={styles.aiMiniScale}><AiSparkIcon /></span>
                        </button>
                      </div>
                    </div>
                  </div>);
                })}
            </div>);
        })}
      </div>
    </div>);
}
function CalendarEventMenu({ row, onStart, onAddVitals, onOpenReports, onInvite, onEndVisit, onReschedule, onDelete, }) {
    return (<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label={`Appointment actions for ${row.name}`} className={styles.menuTrigger}>
          <MoreVertical size={13} strokeWidth={2}/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={styles.menuContent}>
        <DropdownMenuItem onClick={() => onStart(row)} className={styles.menuItem}>Start Appointment</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAddVitals(row)} className={styles.menuItem}>Add Vitals</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onOpenReports(row)} className={styles.menuItem}>Open Reports</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onInvite(row)} className={styles.menuItem}>Invite</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEndVisit(row)} className={styles.menuItem}>End Visit</DropdownMenuItem>
        <DropdownMenuItem onClick={onReschedule} className={styles.menuItem}>Reschedule</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(row.id)} className={styles.menuItemDelete}>
          Delete Appointment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>);
}
// ─── Unified filter panel ─────────────────────────────────────────────────────
function CommonFilterPanel({ style, panelRef, triggerRef, currentConsult, currentVtFilter, onApply, }) {
    const [consult, setConsult] = useState(currentConsult);
    const [vtFilter, setVtFilter] = useState(currentVtFilter);
    // Stale-closure safe ref so the mousedown handler always sees latest onApply
    const onApplyRef = useRef(onApply);
    useEffect(() => { onApplyRef.current = onApply; }, [onApply]);
    // Click-outside → apply staged filters (not discard)
    useEffect(() => {
        function handler(e) {
            const panel = panelRef.current;
            if (panel?.contains(e.target))
                return;
            if (triggerRef?.current?.contains(e.target))
                return;
            onApplyRef.current(consult, vtFilter);
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [consult, vtFilter, triggerRef, panelRef]);
    const consultOpts = [
        { v: "video", label: "Teleconsultation" },
        { v: "in-clinic", label: "In-clinic" },
    ];
    function toggleVtType(t) {
        setVtFilter((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
    }
    function isVtChecked(t) {
        return vtFilter.includes(t);
    }
    function handleClear() {
        setConsult("all");
        setVtFilter([]);
    }
    return createPortal(<div ref={panelRef} style={style} className={styles.filterPanel}>
      <div className={styles.filterSection}>
        <p className={styles.filterSectionTitle}>Slot Type</p>
        <div className={styles.filterOptionList}>
          {consultOpts.map(({ v, label }) => (<button key={v} type="button" onClick={() => setConsult(v)} className={styles.filterOptionBtn}>
              <span className={clsx(styles.radioOuter, consult === v && styles.radioOuterOn)}/>
              <span className={clsx(styles.filterOptionLabel, consult === v ? styles.filterOptionLabelOn : styles.filterOptionLabelOff)}>
                {label}
              </span>
            </button>))}
        </div>
      </div>

      <div className={styles.filterDivider}/>

      <div className={styles.filterSection}>
        <p className={styles.filterSectionTitle}>Visit Type</p>
        <div className={styles.filterOptionList}>
          {ALL_VISIT_TYPES.map((t) => (<button key={t} type="button" onClick={() => toggleVtType(t)} className={styles.filterOptionBtn}>
              <span className={clsx(styles.checkboxOuter, isVtChecked(t) && styles.checkboxOuterOn)}>
                {isVtChecked(t) && <Check size={10} strokeWidth={3} className={styles.checkIcon}/>}
              </span>
              <span className={clsx(styles.filterOptionLabel, isVtChecked(t) ? styles.filterOptionLabelOn : styles.filterOptionLabelOff)}>
                {t}
              </span>
            </button>))}
        </div>
      </div>

      <div className={styles.filterDivider}/>

      <div className={styles.filterFooter}>
        <button type="button" onClick={handleClear} className={styles.linkWarning}>
          Clear
        </button>
        <button type="button" onClick={() => onApply(consult, vtFilter)} className={styles.applyBtn}>
          Apply
        </button>
      </div>
    </div>, document.body);
}
// ─── Video Consultation Tooltip ───────────────────────────────────────────────
function VideoConsultTooltip({ children }) {
    const [visible, setVisible] = useState(false);
    const [style, setStyle] = useState({});
    const triggerRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    function show() {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setStyle({
                position: "fixed",
                // Center above the icon, with a small gap
                top: rect.top - 8,
                left: rect.left + rect.width / 2,
                transform: "translate(-50%, -100%)",
                zIndex: 9999,
            });
        }
        setVisible(true);
    }
    function hide() {
        setVisible(false);
    }
    return (<>
      <span ref={triggerRef} onMouseEnter={show} onMouseLeave={hide} className={styles.videoTooltipTrigger}>
        {children}
      </span>
      {visible && mounted &&
            createPortal(<div style={style} className={styles.videoPopover}>
            <div className={styles.videoPopoverHeader}>
              <span className={styles.videoIconWrap} style={{ background: "rgba(138,77,187,0.12)" }}>
                <Video size={14} variant="Bulk" color="var(--tp-violet-500)"/>
              </span>
              <div className={styles.minW0}>
                <p className={styles.videoPopoverTitle}>Video Consultation</p>
                <p className={styles.videoPopoverSub}>Scheduled call</p>
              </div>
            </div>
            <div className={styles.videoPopoverBody}>
              <p className={styles.videoPopoverText}>
                Patient has requested a video call for this appointment slot.
              </p>
              <div className={styles.videoPopoverActions}>
                <button type="button" className={styles.videoJoinBtn}>
                  Join Call
                </button>
                <button type="button" className={styles.videoRescheduleBtn}>
                  Reschedule
                </button>
              </div>
            </div>
          </div>, document.body)}
    </>);
}
// ─── Clinic data ──────────────────────────────────────────────────────────────
const DUMMY_CLINICS = [
    { id: "rajeshwar", name: "Rajeshwar Eye Clinic" },
    { id: "city", name: "City Medical Centre" },
    { id: "sunrise", name: "Sunrise Hospital" },
    { id: "apollo", name: "Apollo Clinic, Banjara Hills" },
    { id: "care", name: "Care Diagnostics" },
];
// ─── TopHeader ────────────────────────────────────────────────────────────────
function TopHeader() {
    const [isClinicMenuOpen, setClinicMenuOpen] = useState(false);
    const [activeClinic, setActiveClinic] = useState(DUMMY_CLINICS[0].id);
    const [clinicSearch, setClinicSearch] = useState("");
    const clinicMenuRef = useRef(null);
    const clinicSearchRef = useRef(null);
    const clinicListRef = useRef(null);
    const [clinicListCanScrollDown, setClinicListCanScrollDown] = useState(false);
    function updateClinicScrollState() {
        const el = clinicListRef.current;
        if (!el)
            return;
        setClinicListCanScrollDown(el.scrollHeight > el.scrollTop + el.clientHeight + 2);
    }
    useEffect(() => {
        function onPointerDown(event) {
            if (!clinicMenuRef.current?.contains(event.target)) {
                setClinicMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", onPointerDown);
        return () => document.removeEventListener("mousedown", onPointerDown);
    }, []);
    // Focus search input + init scroll indicator when dropdown opens
    useEffect(() => {
        if (isClinicMenuOpen) {
            setClinicSearch("");
            setTimeout(() => {
                clinicSearchRef.current?.focus();
                updateClinicScrollState();
            }, 50);
        }
    }, [isClinicMenuOpen]);
    // Re-check scroll indicator when filter changes
    useEffect(() => {
        if (isClinicMenuOpen) {
            requestAnimationFrame(updateClinicScrollState);
        }
    }, [clinicSearch, isClinicMenuOpen]);
    const activeClinicName = DUMMY_CLINICS.find((c) => c.id === activeClinic)?.name ?? "Clinic";
    const filteredClinics = DUMMY_CLINICS.filter((c) => c.name.toLowerCase().includes(clinicSearch.toLowerCase()));
    return (<header className={styles.topHeader}>
      <div className={styles.headerLeft}>
        <img src={REF_LOGO} alt="TatvaPractice" className={styles.logo}/>
      </div>

      <div className={styles.headerRight}>
        <button type="button" className={styles.tutorialBtn} aria-label="Play tutorial">
          <svg className={styles.tutorialSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
            <g id="Tutorial">
              <g id="Union" opacity="0.8">
                <path clipRule="evenodd" d={svgPaths.p3172ac80} fill="var(--fill-0, #8A4DBB)" fillRule="evenodd"/>
                <path clipRule="evenodd" d={svgPaths.p2ee5cec0} fill="var(--fill-0, #8A4DBB)" fillRule="evenodd"/>
              </g>
            </g>
          </svg>
        </button>

        <button type="button" className={styles.notifBtn} aria-label="Notifications">
          <Notification size={20} variant="Linear" strokeWidth={1.5}/>
          <span className={styles.notifDot}/>
        </button>

        <div className={styles.headerDivider}/>

        <div className={styles.clinicWrap} ref={clinicMenuRef}>
          <button type="button" onClick={() => setClinicMenuOpen((v) => !v)} className={styles.clinicTrigger} aria-label="Switch clinic" aria-expanded={isClinicMenuOpen}>
            <Hospital size={20} variant="Linear" strokeWidth={1.5} color="var(--tp-slate-700)"/>
            <span className={styles.clinicName}>
              {activeClinicName.length > 18 ? activeClinicName.substring(0, 18) + "…" : activeClinicName}
            </span>
            <ChevronDown size={18} strokeWidth={1.5} className={styles.chevronAnim} style={{ transform: isClinicMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }}/>
          </button>

          {isClinicMenuOpen && (<div className={styles.clinicDropdown}>
              <div className={styles.clinicSearchBlock}>
                <div className={styles.clinicSearchLabel}>
                  <Search size={14} strokeWidth={1.5} className={styles.clinicSearchIcon}/>
                  <input ref={clinicSearchRef} type="text" value={clinicSearch} onChange={(e) => setClinicSearch(e.target.value)} placeholder="Search clinics..." className={styles.clinicSearchInput}/>
                </div>
              </div>

              <div className={styles.clinicListWrap}>
                <div ref={clinicListRef} onScroll={updateClinicScrollState} className={styles.clinicList}>
                  <p className={styles.clinicListTitle}>
                    Your Clinics
                  </p>
                  {filteredClinics.length === 0 ? (<p className={styles.clinicEmpty}>No clinics found</p>) : (filteredClinics.map((clinic) => (<button key={clinic.id} type="button" onClick={() => {
                    setActiveClinic(clinic.id);
                    setClinicMenuOpen(false);
                }} className={clsx(styles.clinicRow, clinic.id === activeClinic ? styles.clinicRowActive : styles.clinicRowIdle)}>
                        <Hospital size={16} variant={clinic.id === activeClinic ? "Bulk" : "Linear"} strokeWidth={1.5} color={clinic.id === activeClinic ? "var(--tp-blue-500)" : "var(--tp-slate-500)"}/>
                        <span className={styles.clinicRowName}>{clinic.name}</span>
                        {clinic.id === activeClinic && (<TickCircle size={14} variant="Bold" color="var(--tp-blue-500)"/>)}
                      </button>)))}
                </div>
                {clinicListCanScrollDown && (<div className={styles.clinicScrollFade}>
                    <ChevronDown size={13} strokeWidth={2} className={styles.chevronMuted}/>
                  </div>)}
              </div>
            </div>)}
        </div>

        <button type="button" className={styles.avatarBtn} aria-label="Profile">
          <span className={styles.avatarRing} style={{
            background: "linear-gradient(to bottom, #FFDE00, #FD5900) padding-box, linear-gradient(to bottom, #FFDE00, #FD5900) border-box",
        }}>
            <span className={styles.avatarInner}>
              <img src={REF_AVATAR} alt="User" className={styles.avatarImg}/>
            </span>
          </span>
        </button>
      </div>
    </header>);
}
