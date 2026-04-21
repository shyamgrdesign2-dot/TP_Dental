"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * InProgressTab — Cluster card layout for in-progress plans.
 * Outer shell: rounded-[16px], bg-white, NO stroke.
 * Inner sub-cards: 0.5px neutral stroke.
 * Each service sub-card is an accordion — first open by default, one at a time.
 * Status dropdown exposes all explicit states (Yet to start, In Progress,
 * Completed, No-Show, Not Interested, Cancelled).
 */
import { useEffect, useState, useCallback, Children } from "react";
import {
    TickCircle, ArrowRotateLeft, Printer, Receipt1, Add, Timer1,
    Edit2, Trash, Calendar2, DocumentDownload, DocumentText,
    Clipboard,
} from "iconsax-reactjs";
import { Ban, ChevronDown, Info, MoreVertical, X } from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TPConfirmDialog } from "@/components/ui/tp-confirm-dialog";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlanContext } from "./plan-context";
import {
    SectionFrame, EmptyState, PlanEmptyIcon, formatINR, computePlanTotal, getServiceWorkflowStatus,
    buildConsultationRxUrl, CloseSquareIcon, PLAN_DRAWER_PANEL_CLASS,
} from "./plan-shared";
import { TPSplitButton } from "@/components/tp-ui/button-system";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer";
import { Select as TPSelect, SelectContent as TPSelectContent, SelectItem as TPSelectItem, SelectTrigger as TPSelectTrigger, SelectValue as TPSelectValue } from "@/components/ui/select";
import { RxPreviewDocument } from "@/components/tp-rxpad/RxPreviewDocument";
import { getComposedRxPreviewSnapshot } from "@/components/tp-rxpad/rx-preview-composer";
import dui from "../dental-ui.module.scss";

const dropdownContentClass = "w-[240px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1";
const dropdownItemClass = "rounded-[10px] !gap-[6px] focus:bg-tp-slate-100 focus:text-tp-slate-700 data-[highlighted]:bg-tp-slate-100 data-[highlighted]:text-tp-slate-700";
const dropdownMenuLabelClass = "px-2 py-1.5 font-['Inter',sans-serif] text-[10px] font-semibold uppercase tracking-[0.08em] text-tp-slate-400";
/** View Rx — icon-text button without outer border (matches preview). */
const VIEW_RX_SECONDARY_CLASS = "inline-flex h-9 min-h-[36px] shrink-0 items-center justify-center gap-1.5 rounded-[10px] bg-[#F1F1F5] px-[12px] font-['Inter',sans-serif] text-[12px] font-medium text-[#454551] transition-colors hover:bg-tp-slate-50";
/** Timeline TypeRx split — primary segment at least 120px wide. */
const TIMELINE_TYPERX_TRACK_CLASS = "min-w-[120px]";
/** Appointment row icon actions — white surface, slate border. */
const APPT_ACTION_ICON_CLASS = "inline-flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center rounded-[10px] border border-tp-slate-200 bg-white text-tp-slate-600 transition-colors hover:border-tp-slate-300 hover:bg-tp-slate-50";
/** Timeline row ⋮ — compact icon button (print still hides it). */
const TIMELINE_MENU_TRIGGER_CLASS = "inline-flex h-[16px] w-[20px] min-h-[16px] min-w-[20px] shrink-0 items-center justify-center rounded-[10px] text-[#8F8FA3] transition-colors hover:bg-[#ECEAF4] hover:text-[#5B5B6E]";
/** Capture / book in service header — filled slate, 10px radius (not circular). */
const SERVICE_HEADER_ACTION_CLASS = "inline-flex shrink-0 items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-600 transition-colors hover:bg-tp-slate-200/90";
const PREVIEW_RX_ICON_BTN_CLASS = "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-600 transition-colors hover:bg-tp-slate-200";

const APPT_MONTH_SHORT = {
    jan: "Jan", january: "Jan",
    feb: "Feb", february: "Feb",
    mar: "Mar", march: "Mar",
    apr: "Apr", april: "Apr",
    may: "May",
    jun: "Jun", june: "Jun",
    jul: "Jul", july: "Jul",
    aug: "Aug", august: "Aug",
    sep: "Sep", sept: "Sep", september: "Sep",
    oct: "Oct", october: "Oct",
    nov: "Nov", november: "Nov",
    dec: "Dec", december: "Dec",
};
/** e.g. "14 April 2026" / "14 Apr 2026" -> "14 Apr 2026" */
function formatAppointmentDateLong(dateStr) {
    const s = String(dateStr ?? "").trim();
    const m = /^(\d{1,2})\s+(\w+)\s+(\d{4})$/.exec(s);
    if (!m)
        return s;
    const mon = APPT_MONTH_SHORT[m[2].toLowerCase()] ?? m[2];
    return `${m[1]} ${mon} ${m[3]}`;
}
const CASE_TYPE_LABELS = {
    consultation: "Consultation",
    procedure: "Procedure",
    review: "Review / Check-up",
    emergency: "Emergency",
    "follow-up": "Follow-up",
};
const APPT_MONTH_PARSE = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};
/** Parse "10:30 AM" / "14:00" into ms offset from midnight (local). */
function parseTimeOffsetMs(timeRaw) {
    const t = String(timeRaw ?? "").trim();
    if (!t || t === "—")
        return 0;
    const ampm = /\b(am|pm)\b/i.exec(t);
    const hm = /(\d{1,2})\s*:\s*(\d{2})/.exec(t);
    if (!hm)
        return 0;
    let h = parseInt(hm[1], 10);
    const min = parseInt(hm[2], 10);
    if (ampm) {
        const ap = ampm[1].toLowerCase();
        if (ap === "pm" && h < 12)
            h += 12;
        if (ap === "am" && h === 12)
            h = 0;
    }
    return ((h * 60) + min) * 60 * 1000;
}
function parseApptSortMs(dateStr, timeStr) {
    const s = String(dateStr ?? "").trim();
    const m = /^(\d{1,2})\s+(\w+)\s+(\d{4})$/.exec(s);
    if (!m)
        return 0;
    const day = parseInt(m[1], 10);
    const mon = APPT_MONTH_PARSE[m[2]] ?? 0;
    const y = parseInt(m[3], 10);
    const base = new Date(y, mon, day).getTime();
    return base + parseTimeOffsetMs(timeStr);
}
function parseIsoMs(iso) {
    const n = Date.parse(String(iso ?? ""));
    return Number.isFinite(n) ? n : 0;
}
function parseSittingSortMs(sit) {
    if (sit?.createdAt) {
        const fromCreatedAt = parseIsoMs(sit.createdAt);
        if (fromCreatedAt)
            return fromCreatedAt;
    }
    return parseIsoMs(sit?.date);
}
/**
 * Merged visit timeline: upcoming (booked, no Rx yet) → completed (Rx saved or direct visit) → cancelled.
 */
function buildVisitTimelineEntries(service) {
    const appointmentItems = service.appointments ?? [];
    const consultationItems = service.consultations ?? [];
    const sittingItems = service.sittings ?? [];
    const appointmentIdSet = new Set(appointmentItems.map((a) => a.id));
    const raw = [];
    for (const appt of appointmentItems) {
        const linkedConsultations = consultationItems.filter((c) => c.appointmentId === appt.id);
        raw.push({
            kind: "appointment",
            appt,
            linkedConsultations,
            sortMs: parseApptSortMs(appt.date, appt.time),
        });
    }
    for (const c of consultationItems) {
        if (c.appointmentId && appointmentIdSet.has(c.appointmentId))
            continue;
        raw.push({
            kind: "direct",
            consultation: c,
            linkedConsultations: [],
            sortMs: parseIsoMs(c.endedAt),
        });
    }
    for (const sit of sittingItems) {
        raw.push({
            kind: "sitting",
            sitting: sit,
            linkedConsultations: [],
            sortMs: parseSittingSortMs(sit),
        });
    }
    const upcoming = [];
    const completed = [];
    const cancelled = [];
    for (const e of raw) {
        if (e.kind === "appointment" && e.appt.status === "cancelled") {
            cancelled.push(e);
            continue;
        }
        if (e.kind === "appointment" && e.linkedConsultations.length > 0) {
            completed.push(e);
            continue;
        }
        if (e.kind === "direct") {
            completed.push(e);
            continue;
        }
        if (e.kind === "sitting") {
            const sitSt = e.sitting.status ?? "completed";
            if (sitSt === "cancelled") {
                cancelled.push(e);
                continue;
            }
            if (sitSt === "scheduled") {
                upcoming.push(e);
                continue;
            }
            completed.push(e);
            continue;
        }
        upcoming.push(e);
    }
    upcoming.sort((a, b) => (a.sortMs || 0) - (b.sortMs || 0));
    completed.sort((a, b) => (b.sortMs || 0) - (a.sortMs || 0));
    cancelled.sort((a, b) => (b.sortMs || 0) - (a.sortMs || 0));
    return [...upcoming, ...completed, ...cancelled];
}
function visitBadge(kind) {
    if (kind === "cancelled") {
        return _jsx("span", {
            className: "inline-flex items-center rounded-[72px] bg-[#FCDCD3] px-[8px] py-[3px] font-['Inter',sans-serif] text-[12px] font-medium text-[#C1421C]",
            children: "Cancelled",
        });
    }
    if (kind === "completed") {
        return _jsx("span", {
            className: "inline-flex items-center rounded-[72px] bg-[#C7F4E7] px-[8px] py-[3px] font-['Inter',sans-serif] text-[12px] font-medium text-[#0C8F66]",
            children: "Completed",
        });
    }
    return _jsx("span", {
        className: "inline-flex items-center rounded-[72px] bg-[#FCDCD3] px-[8px] py-[3px] font-['Inter',sans-serif] text-[12px] font-medium text-[#C1421C]",
        children: "Upcoming",
    });
}
/** Inline date+time pill with a small calendar icon, e.g. "18 Apr 2026 (08:30 AM)". */
function VisitDatePill({ date, time }) {
    const datePart = String(date ?? "").trim();
    const timePart = String(time ?? "").trim();
    if (!datePart && !timePart) return null;
    const label = timePart ? `${datePart} (${timePart})` : datePart;
    return _jsxs("span", {
        className: "inline-flex items-center gap-[6px] rounded-full bg-[rgba(88,28,135,0.06)] px-[10px] py-[4px] font-['Inter',sans-serif] text-[12px] font-medium text-[#581C87]",
        children: [
            _jsx(Calendar2, { size: 13, variant: "Linear", color: "#581C87", strokeWidth: 1.75 }),
            _jsx("span", { children: label }),
        ],
    });
}
/**
 * Gradient-border surface for visit-row cards.
 * Two stacked gradients (one per background-clip layer) render a faux stroke
 * that fades in at the top and bottom and thins out through the middle.
 * The stroke hue matches the card's base tint: lavender for default and rose
 * for cancelled rows.
 */
function getVisitRowSurfaceStyle(isCancelled) {
    if (isCancelled) {
        return {
            border: "1px solid transparent",
            borderRadius: "16px",
            backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(253,224,215,0.75) 100%), " +
                "linear-gradient(180deg, rgba(193,66,28,0.10) 0%, rgba(193,66,28,0.02) 30%, rgba(193,66,28,0) 50%, rgba(193,66,28,0.02) 70%, rgba(193,66,28,0.10) 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
        };
    }
    return {
        border: "1px solid transparent",
        borderRadius: "16px",
        backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,239,250,0.7) 100%), " +
            "linear-gradient(180deg, rgba(88,28,135,0.09) 0%, rgba(88,28,135,0.02) 30%, rgba(88,28,135,0) 50%, rgba(88,28,135,0.02) 70%, rgba(88,28,135,0.09) 100%)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
    };
}
/** Visit-row avatar (intentionally hidden to match current UI requirements). */
function VisitDoctorAvatar() {
    return null;
}
/** Timeline dot with centered inner core and larger visual weight. */
function VisitTimelineDot({ variant = "default" }) {
    const isCancelled = variant === "cancelled";
    const outer = isCancelled ? "bg-[#F3C4B9]" : "bg-[#BCA4CF]";
    const inner = isCancelled ? "bg-[#C1421C]" : "bg-white";
    return _jsx("span", {
        "aria-hidden": true,
        className: `absolute left-[-4px] top-[17px] flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(88,28,135,0.06)] ${outer}`,
        children: _jsx("span", {
            className: `h-[8px] w-[8px] rounded-full ${inner}`,
        }),
    });
}
/** Frosted-white consultation summary surface — title + body rendered on a single line. */
function ConsultationSummarySurface({ children, className = "" }) {
    const parts = Children.toArray(children);
    const summary = parts[0];
    const actions = parts.slice(1);
    return _jsxs("div", {
        className: `mt-[10px] w-full min-w-0 max-w-full overflow-hidden rounded-[10px] bg-white/50 px-[14px] py-[12px] shadow-[0_0_12px_rgba(0,0,0,0.01)] font-['Inter',sans-serif] text-[12px] leading-[1.85] ${className}`,
        children: [
            _jsx("span", { className: "font-semibold text-tp-slate-900", children: "Consultation summary:" }),
            " ",
            _jsx("span", { className: "text-tp-slate-600", children: summary }),
            actions.length ? _jsx("div", { className: "mt-[6px]", children: actions }) : null,
        ],
    });
}

function renderStatusChip(status, size = "sm") {
    const cls = status === "completed"
        ? "bg-tp-success-50 text-tp-success-700"
        : status === "in-progress"
            ? "bg-tp-warning-50 text-tp-warning-700"
            : status === "no-show"
                ? "bg-tp-error-50 text-tp-error-700"
                : status === "not-interested" || status === "cancelled"
                    ? "bg-tp-error-50 text-tp-error-700"
                    : "bg-tp-slate-100 text-tp-slate-500";
    const label = status === "completed"
        ? "Completed"
        : status === "in-progress"
            ? "In Progress"
            : status === "no-show"
                ? "No Show"
                : status === "not-interested"
                    ? "Not Interested"
                    : status === "cancelled"
                        ? "Cancelled"
                        : "Yet to Start";
    return _jsx("span", {
        className: `inline-flex items-center rounded-[6px] px-[8px] py-[2px] font-['Inter',sans-serif] font-semibold ${size === "md" ? "text-[12px]" : "text-[10px]"} ${cls}`,
        children: label,
    });
}

function getStatusSelectClasses(status) {
    if (status === "completed") return "bg-tp-success-50 text-tp-success-700";
    if (status === "in-progress") return "bg-tp-warning-50 text-tp-warning-700";
    if (status === "no-show") return "bg-tp-error-50 text-tp-error-700";
    if (status === "not-interested") return "bg-tp-error-50 text-tp-error-700";
    if (status === "cancelled") return "bg-tp-error-50 text-tp-error-700";
    return "bg-tp-slate-100 text-tp-slate-600";
}

function getStatusSelectItemToneClasses(status) {
    if (status === "completed")
        return "text-tp-success-700";
    if (status === "in-progress")
        return "text-tp-warning-700";
    if (status === "no-show" || status === "not-interested" || status === "cancelled")
        return "text-tp-error-700";
    // "not-started" / fallback ("Get Started")
    return "text-tp-slate-600";
}

const statusSelectItemBaseClass = "!h-[28px] !min-h-[28px] !py-0 !rounded-[8px] flex items-center !text-[10px] font-semibold focus:text-inherit data-[highlighted]:text-inherit !bg-transparent focus:!bg-tp-slate-100 data-[highlighted]:!bg-tp-slate-100";

// Explicit status options shown in the treatment status dropdown.
// Order reflects typical flow. No "Auto" option — status is either
// derived from activity (consultations / legacy sittings & procedures) or explicitly chosen.
const STATUS_OPTIONS = [
    { value: "not-started", label: "Yet to start" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "no-show", label: "Patient No-Show" },
    { value: "not-interested", label: "Not Interested" },
    { value: "cancelled", label: "Cancelled" },
];

function renderPlanCompletionChip(status) {
    const cls = status === "completed"
        ? "bg-tp-success-50 text-tp-success-700"
        : status === "partially-completed"
            ? "bg-tp-warning-50 text-tp-warning-700"
            : "bg-tp-slate-100 text-tp-slate-500";
    const label = status === "completed"
        ? "Completed"
        : status === "partially-completed"
            ? "Partially Completed"
            : "Not Completed";
    return _jsx("span", {
        className: `inline-flex items-center rounded-[6px] px-[8px] py-[2px] font-['Inter',sans-serif] text-[12px] font-semibold ${cls}`,
        children: label,
    });
}

function formatSurfaceLabel(surface) {
    return surface.charAt(0).toUpperCase() + surface.slice(1);
}

/** Split saved consultation summary into labeled rows (Sx / Dx / Lab …) for scan-friendly display. */
function segmentConsultSummaryLines(raw) {
    if (!raw?.trim())
        return [];
    const rows = [];
    const pushRow = (badge, tone, text) => {
        const t = text?.trim();
        if (t)
            rows.push({ badge, tone, text: t });
    };
    const lines = raw.split(/\n/).map((l) => l.trim()).filter(Boolean);
    for (const p of lines) {
        if (!p)
            continue;
        const sx = /^symptoms?:\s*(.+)$/i.exec(p);
        if (sx) {
            pushRow("Sx", "emerald", sx[1]);
            continue;
        }
        const dx = /^diagnosis:\s*(.+)$/i.exec(p);
        if (dx) {
            pushRow("Dx", "violet", dx[1]);
            continue;
        }
        const ex = /^examination:\s*(.+)$/i.exec(p);
        if (ex) {
            pushRow("Ex", "cyan", ex[1]);
            continue;
        }
        const lab = /^lab\s*investigation:\s*(.+)$/i.exec(p);
        if (lab) {
            pushRow("Lab", "amber", lab[1]);
            continue;
        }
        const med = /^medication:\s*(.+)$/i.exec(p);
        if (med) {
            pushRow("Rx", "rose", med[1]);
            continue;
        }
        const adv = /^(?:advice|adv)\s*:\s*(.+)$/i.exec(p);
        if (adv) {
            pushRow("Adv", "slate", adv[1]);
            continue;
        }
        if (/^tooth\s*:\s*/i.test(p) || /^tooth\s+/i.test(p) || /^T\d+/i.test(p)) {
            pushRow("Tooth", "blue", p.replace(/^tooth\s*:?\s*/i, ""));
            continue;
        }
        const proc = /^(?:procedure|Tx\s*history)\s*:?\s*(.+)$/i.exec(p);
        if (proc) {
            pushRow("Proc", "indigo", proc[1]);
            continue;
        }
        pushRow(null, "neutral", p);
    }
    return rows;
}
/** Pull FDI e.g. T24 from free text for compact summary lines. */
function extractToothFdiToken(text) {
    const m = /\bT\s*(\d{2})\b/i.exec(text) ?? /\((T?\d{2})\)/.exec(text) ?? /\b(\d{2})\s*(?:\)|$|,|\s)/.exec(text);
    if (!m)
        return null;
    const d = (m[1] ?? m[0]).replace(/^T/i, "");
    return /^\d{2}$/.test(d) ? `T${d}` : null;
}
/** Strip long tooth names; keep a short clause for narrative summaries. */
function compactToothSummaryText(text) {
    let t = text.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
    t = t.replace(/^tooth\s*:?\s*/i, "").trim();
    return t;
}
/**
 * Short prose summary from saved Rx-style lines (no Sx:/Dx: labels).
 * Ordered roughly: presentation → exam → diagnosis → tooth-specific → labs → Rx → advice.
 */
function buildProseConsultSummary(raw, maxLen = 400) {
    const rows = segmentConsultSummaryLines(raw);
    const pushUnique = (arr, s) => {
        const x = s?.trim();
        if (x && !arr.includes(x))
            arr.push(x);
    };
    const clauses = [];
    if (!rows.length) {
        const t = raw?.trim();
        if (!t)
            return "";
        const softened = t
            .replace(/\b(?:symptoms?|diagnosis|examination|lab\s*investigation|medication|adv(?:ice)?|procedure|Tx\s*history)\s*:\s*/gi, "")
            .split(/\s*·\s*/)
            .map((p) => p.trim())
            .filter(Boolean)
            .join(". ")
            .replace(/\s+/g, " ")
            .trim();
        let out = softened || t;
        if (out.length > maxLen)
            out = `${out.slice(0, maxLen - 1).trimEnd()}…`;
        return out;
    }
    const sx = [], ex = [], dx = [], lab = [], rx = [], adv = [], tooth = [], proc = [], other = [];
    for (const r of rows) {
        const txt = r.text?.trim();
        if (!txt)
            continue;
        switch (r.badge) {
            case "Sx":
                pushUnique(sx, txt);
                break;
            case "Ex":
                pushUnique(ex, txt);
                break;
            case "Dx":
                pushUnique(dx, txt);
                break;
            case "Lab":
                pushUnique(lab, txt);
                break;
            case "Rx":
                pushUnique(rx, txt);
                break;
            case "Adv":
                pushUnique(adv, txt);
                break;
            case "Tooth": {
                const fdi = extractToothFdiToken(txt);
                const afterParen = txt.replace(/^[\s\S]*?\)\s*(?:·|,|\s)*\s*/m, "").trim();
                if (fdi && afterParen)
                    pushUnique(tooth, `${fdi} — ${afterParen}`);
                else if (fdi)
                    pushUnique(tooth, fdi);
                else
                    pushUnique(tooth, compactToothSummaryText(txt));
                break;
            }
            case "Proc":
                pushUnique(proc, txt);
                break;
            default:
                pushUnique(other, txt);
        }
    }
    const chunks = [];
    if (sx.length)
        chunks.push(sx.join("; "));
    if (ex.length)
        chunks.push(ex.join("; "));
    if (dx.length)
        chunks.push(`Diagnosis ${dx.join("; ")}`);
    if (tooth.length)
        chunks.push(tooth.join("; "));
    if (proc.length)
        chunks.push(proc.join("; "));
    if (lab.length)
        chunks.push(`Labs ${lab.join("; ")}`);
    if (rx.length)
        chunks.push(`Rx ${rx.join("; ")}`);
    if (adv.length)
        chunks.push(`Advice ${adv.join("; ")}`);
    if (other.length)
        chunks.push(other.join("; "));
    let out = chunks.join(". ").replace(/\s+/g, " ").trim();
    if (out) {
        out = out.charAt(0).toUpperCase() + out.slice(1);
        if (!/[.!?]$/.test(out))
            out += ".";
    }
    if (out.length > maxLen)
        out = `${out.slice(0, maxLen - 1).trimEnd()}…`;
    return out;
}
/** Split tooth row into a Past Visits–style title (tooth + FDI) and detail body after · or —. */
function splitToothSnippetRow(text) {
    const trimmed = text.trim();
    const sep = trimmed.match(/^(.+?)\s*[·—]\s+([\s\S]+)$/);
    if (sep)
        return { title: sep[1].trim(), body: sep[2].trim() };
    return { title: trimmed, body: "" };
}
function formatInlineSnippetPart(row) {
    if (row.badge === "Tooth") {
        const { title, body } = splitToothSnippetRow(row.text);
        return body ? `${title}: ${body}` : title;
    }
    if (row.badge === "Proc")
        return `Procedure: ${row.text}`;
    return row.text;
}
/** Labelled flowing paragraph (full card). Snippet uses structured Past Visits–style blocks when inSurface. */
function renderConsultSummarySnippetBody(raw, { inSurface = false } = {}) {
    const pad = inSurface ? "pl-[0px]" : "pl-[4px]";
    const rows = segmentConsultSummaryLines(raw);
    if (inSurface) {
        if (!rows.length) {
            const prose = buildProseConsultSummary(raw);
            return prose
                ? _jsx("span", {
                    className: `inline break-words ${pad}`,
                    children: prose,
                })
                : _jsx("span", { className: `inline break-words ${pad} text-tp-slate-500 italic`, children: "No summary text." });
        }
        // In the surface variant we must show *all* content (no truncation/slicing),
        // because the requirement is to persist the full summary text.
        const inlineText = rows.map((r) => formatInlineSnippetPart(r)).filter(Boolean).join(" | ");
        return inlineText
            ? _jsx("span", {
                className: `inline break-words ${pad}`,
                children: inlineText,
            })
            : _jsx("span", { className: `inline break-words ${pad} text-tp-slate-500 italic`, children: "No summary text." });
    }
    if (!rows.length) {
        const t = raw?.trim();
        return t
            ? _jsx("p", { className: `block w-full min-w-0 max-w-full break-words ${pad} font-['Inter',sans-serif] text-[12px] leading-[1.65] text-tp-slate-700`, children: t })
            : _jsx("p", { className: `block w-full min-w-0 max-w-full ${pad} font-['Inter',sans-serif] text-[12px] text-tp-slate-500 italic`, children: "No summary text." });
    }
    return _jsx("p", {
        className: `block w-full min-w-0 max-w-full break-words ${pad} font-['Inter',sans-serif] text-[12px] leading-[1.65] text-tp-slate-600`,
        children: rows.map((r, i) => _jsxs(_Fragment, {
            children: [
                i > 0 && _jsx("span", { className: "text-tp-slate-200", children: " · " }),
                r.badge && _jsxs("span", { className: "font-medium text-tp-slate-400", children: [r.badge, ": "] }),
                _jsx("span", { className: "text-tp-slate-600", children: r.text }),
            ],
        }, i)),
    });
}
function formatDigitalRxSnapshotPlainText(snapshot) {
    const lines = [];
    lines.push("Digital Rx");
    lines.push("");
    if (snapshot) {
        const pushSection = (title, rows) => {
            if (!rows?.length)
                return;
            lines.push(title);
            rows.forEach((row) => {
                const suffix = row.metaParts?.length ? ` (${row.metaParts.join(" | ")})` : "";
                lines.push(`- ${row.title}${suffix}`);
            });
            lines.push("");
        };
        pushSection("Symptoms", snapshot.symptoms);
        pushSection("Examination", snapshot.examinations);
        pushSection("Diagnosis", snapshot.diagnoses);
        pushSection("Lab Investigation", snapshot.labInvestigations);
        pushSection("Medication (Rx)", snapshot.medications);
        pushSection("Advice", snapshot.advice);
    }
    else {
        lines.push("No Rx data available yet.");
    }
    return lines.join("\n");
}
function downloadSnapshotTxt(snapshot) {
    const blob = new Blob([formatDigitalRxSnapshotPlainText(snapshot)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "digital-rx.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
function sanitizeDownloadFilename(name) {
    return String(name ?? "document").replace(/[^\w.-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "document";
}
function downloadTxtFile(text, filename = "document.txt") {
    const body = String(text ?? "").trim() || "—";
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = sanitizeDownloadFilename(filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
function printPlainTextDocument(title, bodyText) {
    const esc = (s) => String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    const htmlBody = esc(String(bodyText ?? "").trim() || "—").replace(/\r?\n/g, "<br/>");
    const w = window.open("", "_blank", "noopener,noreferrer,width=800,height=900");
    if (!w)
        return;
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${esc(title)}</title><style>body{font-family:Inter,system-ui,sans-serif;padding:24px;color:#334155;font-size:13px;line-height:1.65;}h1{font-size:15px;font-weight:600;margin:0 0 12px;color:#0f172a;}</style></head><body><h1>${esc(title)}</h1><div>${htmlBody}</div></body></html>`);
    w.document.close();
    w.focus();
    w.print();
    w.close();
}
function downloadDigitalRxSnapshot(patientId) {
    downloadSnapshotTxt(getComposedRxPreviewSnapshot(patientId));
}
function printDigitalRxSnapshot(patientId) {
    printPlainTextDocument("Digital Rx", formatDigitalRxSnapshotPlainText(getComposedRxPreviewSnapshot(patientId)));
}
function ConsultationPreviewCard({ c, appointmentItems, patientId, plan, service, embedInPatientShell, underAppointment = false, variant = "card", previewOpen: previewOpenControlled, onPreviewOpenChange: setPreviewOpenControlled, hideViewRxButton = false, }) {
    const [previewOpenInternal, setPreviewOpenInternal] = useState(false);
    const isPreviewControlled = previewOpenControlled !== undefined && setPreviewOpenControlled !== undefined;
    const previewOpen = isPreviewControlled ? Boolean(previewOpenControlled) : previewOpenInternal;
    const setPreviewOpen = (v) => {
        if (isPreviewControlled)
            setPreviewOpenControlled(v);
        else
            setPreviewOpenInternal(v);
    };
    const [snapshot, setSnapshot] = useState(null);
    useEffect(() => {
        if (!previewOpen)
            return;
        setSnapshot(getComposedRxPreviewSnapshot(patientId));
    }, [previewOpen, patientId]);
    const fromAppt = c.source === "appointment" && c.appointmentId;
    const appt = fromAppt ? appointmentItems.find((a) => a.id === c.appointmentId) : null;
    const tag = fromAppt && appt
        ? `Linked · ${appt.date} · ${appt.time}`
        : "Treatment visit (no appointment)";
    const ended = c.endedAt?.includes("T") ? c.endedAt.slice(0, 16).replace("T", " · ") : (c.endedAt ?? "");
    const metaLine = underAppointment && fromAppt
        ? (ended ? `Ended · ${ended}` : "Saved from this visit's Rx")
        : (ended ? `${tag} · ${ended}` : tag);
    const rxHref = buildConsultationRxUrl(patientId, plan.id, service.id, c.appointmentId, embedInPatientShell, service.treatment);
    const snippet = _jsxs(_Fragment, {
        children: [
            renderConsultSummarySnippetBody(c.summaryText ?? "", { inSurface: variant === "snippet" }),
            !hideViewRxButton && _jsx("button", {
                type: "button",
                onClick: () => setPreviewOpen(true),
                className: variant === "snippet" ? `${VIEW_RX_SECONDARY_CLASS}` : `mt-[10px] ${VIEW_RX_SECONDARY_CLASS}`,
                children: "View Rx",
            }),
        ],
    });
    return _jsxs(_Fragment, {
        children: [
            variant === "snippet"
                ? _jsx(ConsultationSummarySurface, { children: snippet })
                : _jsxs("div", {
                    className: "mt-[10px] w-full max-w-none rounded-[12px] border border-tp-slate-200/70 bg-white p-[12px]",
                    children: [
                        _jsxs("div", {
                            className: "flex flex-wrap items-center justify-between gap-2 border-b border-tp-slate-100 pb-[8px]",
                            children: [
                                _jsx("p", { className: "font-['Inter',sans-serif] text-[10px] font-semibold uppercase tracking-[0.06em] text-tp-slate-500/85", children: "Rx summary" }),
                                _jsx("span", { className: "font-['Inter',sans-serif] text-[10px] text-tp-slate-400/90", children: metaLine }),
                            ],
                        }),
                        _jsx("div", { className: "mt-[10px] w-full min-w-0 max-w-full", children: snippet }),
                    ],
                }),
            _jsx(TPDrawer, {
                open: previewOpen,
                onOpenChange: setPreviewOpen,
                children: _jsxs(TPDrawerContent, {
                    side: "right",
                    size: "xl",
                    className: `!flex !p-0 flex-col ${PLAN_DRAWER_PANEL_CLASS}`,
                    children: [
                        _jsxs("div", {
                            className: dui.drawerHeader,
                            children: [
                                _jsxs(Tooltip, { delayDuration: 200, children: [
                                    _jsx(TooltipTrigger, {
                                        asChild: true,
                                        children: _jsx("button", {
                                            type: "button",
                                            onClick: () => setPreviewOpen(false),
                                            className: dui.drawerCloseBtn,
                                            "aria-label": "Close preview",
                                            children: _jsx(CloseSquareIcon, { size: 24, color: "var(--tp-slate-700)" }),
                                        }),
                                    }),
                                    _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Close" }),
                                ] }),
                                _jsx("div", { className: dui.drawerDivider, "aria-hidden": true }),
                                _jsx("h2", { className: dui.drawerTitle, children: "Preview Rx" }),
                                _jsxs("div", {
                                    className: `${dui.drawerAction} flex items-center gap-1.5`,
                                    children: [
                                        _jsxs(Tooltip, { delayDuration: 200, children: [
                                            _jsx(TooltipTrigger, {
                                                asChild: true,
                                                children: _jsx("button", {
                                                    type: "button",
                                                    onClick: () => downloadSnapshotTxt(snapshot),
                                                    className: PREVIEW_RX_ICON_BTN_CLASS,
                                                    "aria-label": "Download Rx",
                                                    children: _jsx(DocumentDownload, { size: 18, variant: "Linear" }),
                                                }),
                                            }),
                                            _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Download Rx" }),
                                        ] }),
                                        _jsxs(Tooltip, { delayDuration: 200, children: [
                                            _jsx(TooltipTrigger, {
                                                asChild: true,
                                                children: _jsx("button", {
                                                    type: "button",
                                                    onClick: () => window.print(),
                                                    className: PREVIEW_RX_ICON_BTN_CLASS,
                                                    "aria-label": "Print Rx",
                                                    children: _jsx(Printer, { size: 18, variant: "Linear" }),
                                                }),
                                            }),
                                            _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Print Rx" }),
                                        ] }),
                                        _jsxs(Tooltip, { delayDuration: 200, children: [
                                            _jsx(TooltipTrigger, {
                                                asChild: true,
                                                children: _jsx("button", {
                                                    type: "button",
                                                    onClick: () => {
                                                        setPreviewOpen(false);
                                                        window.location.assign(rxHref);
                                                    },
                                                    className: PREVIEW_RX_ICON_BTN_CLASS,
                                                    "aria-label": "Edit RX",
                                                    children: _jsx(Edit2, { size: 18, variant: "Linear" }),
                                                }),
                                            }),
                                            _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Edit RX" }),
                                        ] }),
                                    ],
                                }),
                            ],
                        }),
                        _jsx("div", {
                            className: "min-h-0 flex-1 overflow-y-auto bg-tp-slate-50 p-4",
                            children: _jsx(RxPreviewDocument, { snapshot: snapshot }),
                        }),
                    ],
                }),
            }),
        ],
    });
}

/** Quick visit (sitting) — Preview Rx drawer: consultation notes + composed digital Rx (same shell as consultation preview). */
function QuickVisitRxPreview({ sit, patientId, plan, service, embedInPatientShell, previewOpen, onOpenChange, }) {
    const [snapshot, setSnapshot] = useState(null);
    useEffect(() => {
        if (!previewOpen)
            return;
        setSnapshot(getComposedRxPreviewSnapshot(patientId));
    }, [previewOpen, patientId]);
    const rxHref = buildConsultationRxUrl(patientId, plan.id, service.id, undefined, embedInPatientShell, service.treatment);
    const notesRaw = String(sit.notes ?? "").trim();
    return _jsx(TPDrawer, {
        open: previewOpen,
        onOpenChange: onOpenChange,
        children: _jsxs(TPDrawerContent, {
            side: "right",
            size: "xl",
            className: `!flex !p-0 flex-col ${PLAN_DRAWER_PANEL_CLASS}`,
            children: [
                _jsxs("div", {
                    className: dui.drawerHeader,
                    children: [
                        _jsxs(Tooltip, { delayDuration: 200, children: [
                            _jsx(TooltipTrigger, {
                                asChild: true,
                                children: _jsx("button", {
                                    type: "button",
                                    onClick: () => onOpenChange(false),
                                    className: dui.drawerCloseBtn,
                                    "aria-label": "Close preview",
                                    children: _jsx(CloseSquareIcon, { size: 24, color: "var(--tp-slate-700)" }),
                                }),
                            }),
                            _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Close" }),
                        ] }),
                        _jsx("div", { className: dui.drawerDivider, "aria-hidden": true }),
                        _jsx("h2", { className: dui.drawerTitle, children: "Preview Rx" }),
                        _jsxs("div", {
                            className: `${dui.drawerAction} flex items-center gap-1.5`,
                            children: [
                                _jsxs(Tooltip, { delayDuration: 200, children: [
                                    _jsx(TooltipTrigger, {
                                        asChild: true,
                                        children: _jsx("button", {
                                            type: "button",
                                            onClick: () => downloadSnapshotTxt(snapshot),
                                            className: PREVIEW_RX_ICON_BTN_CLASS,
                                            "aria-label": "Download Rx",
                                            children: _jsx(DocumentDownload, { size: 18, variant: "Linear" }),
                                        }),
                                    }),
                                    _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Download Rx" }),
                                ] }),
                                _jsxs(Tooltip, { delayDuration: 200, children: [
                                    _jsx(TooltipTrigger, {
                                        asChild: true,
                                        children: _jsx("button", {
                                            type: "button",
                                            onClick: () => window.print(),
                                            className: PREVIEW_RX_ICON_BTN_CLASS,
                                            "aria-label": "Print Rx",
                                            children: _jsx(Printer, { size: 18, variant: "Linear" }),
                                        }),
                                    }),
                                    _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Print Rx" }),
                                ] }),
                                _jsxs(Tooltip, { delayDuration: 200, children: [
                                    _jsx(TooltipTrigger, {
                                        asChild: true,
                                        children: _jsx("button", {
                                            type: "button",
                                            onClick: () => {
                                                onOpenChange(false);
                                                window.location.assign(rxHref);
                                            },
                                            className: PREVIEW_RX_ICON_BTN_CLASS,
                                            "aria-label": "Edit RX",
                                            children: _jsx(Edit2, { size: 18, variant: "Linear" }),
                                        }),
                                    }),
                                    _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Edit RX" }),
                                ] }),
                            ],
                        }),
                    ],
                }),
                _jsx("div", {
                    className: "min-h-0 flex-1 overflow-y-auto bg-tp-slate-50 p-4",
                    children: _jsx("div", {
                        className: "mx-auto max-w-[640px]",
                        children: _jsx(RxPreviewDocument, { snapshot: snapshot, extraNotes: notesRaw || undefined }),
                    }),
                }),
            ],
        }),
    });
}


// ─── Service Sub-Card ──────────────────────────────────────
function ServiceSubCard({ service, plan, index, isOpen, onToggle }) {
    const { dispatch, openDrawer, patientId, embedInPatientShell } = usePlanContext();
    const [consultPreviewId, setConsultPreviewId] = useState(null);
    const [sittingPreviewId, setSittingPreviewId] = useState(null);
    const [markDoneOpen, setMarkDoneOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    // Appointment cancellation dialog state
    const [cancelTarget, setCancelTarget] = useState(null);
    const [cancelReason, setCancelReason] = useState("");
    const openCancelDialog = (appt) => {
        setCancelTarget(appt);
        setCancelReason(appt.cancellationReason ?? "");
    };
    const closeCancelDialog = () => {
        setCancelTarget(null);
        setCancelReason("");
    };
    const confirmCancelAppointment = () => {
        if (!cancelTarget) return;
        dispatch({
            type: "UPDATE_APPOINTMENT",
            serviceId: service.id,
            appointmentId: cancelTarget.id,
            patch: {
                status: "cancelled",
                cancellationReason: cancelReason.trim() || "No reason provided",
            },
        });
        closeCancelDialog();
    };
    const handleMarkDone = () => {
        dispatch({ type: "MARK_SERVICE_COMPLETED", serviceId: service.id });
        setMarkDoneOpen(false);
    };
    const appointmentItems = service.appointments ?? [];
    const timelineEntries = buildVisitTimelineEntries(service);
    const serviceRxHref = buildConsultationRxUrl(patientId, plan.id, service.id, undefined, embedInPatientShell, service.treatment);
    const toothText = service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi}`;
    const surfaceSummary = service.surfaces.length > 0
        ? service.surfaces.map((surface) => formatSurfaceLabel(surface)).join(", ")
        : "All surfaces";
    const serviceMetaSummary = service.toothFdi === "full-mouth"
        ? "Full Mouth"
        : `${service.toothLabel} (${toothText})`;
    const hoverDetails = [
        { label: "Tooth", value: service.toothFdi === "full-mouth" ? "Full Mouth" : `${service.toothLabel} (${toothText})` },
        { label: "Surfaces", value: surfaceSummary },
        { label: "Notes", value: String(service.notes ?? "").trim() || "No notes added" },
    ];
    const workflowStatus = getServiceWorkflowStatus(service);
    // Persisted-store status that we use as the dropdown value. If the
    // service has never been explicitly set, fall back to the derived
    // workflow status so the dropdown reflects reality.
    const dropdownValue = service.status === "planned" ? workflowStatus : service.status;
    const statusSelectClasses = getStatusSelectClasses(dropdownValue);
    const accordionIconToneClass = getStatusSelectItemToneClasses(dropdownValue);
    const handleServiceStatusChange = (next) => {
        // "not-started" is synthetic — it maps back to the reducer's "planned".
        const mappedStatus = next === "not-started" ? "planned" : next;
        dispatch({
            type: "UPDATE_SERVICE",
            serviceId: service.id,
            patch: {
                status: mappedStatus,
                completedAt: mappedStatus === "completed"
                    ? service.completedAt ?? new Date().toISOString().slice(0, 10)
                    : undefined,
            },
        });
    };

    return _jsxs("div", {
        className: "flex shrink-0 min-w-0 w-full flex-col overflow-hidden rounded-[16px] border border-tp-slate-200/60 bg-white",
        children: [
            _jsxs("div", {
                className: `flex shrink-0 cursor-pointer items-center gap-[14px] ${isOpen ? "border-b border-tp-slate-100" : ""} bg-gradient-to-b from-tp-warning-50/30 to-white px-[18px] py-[14px]`,
                onClick: () => onToggle?.(),
                children: [
                    _jsx("div", {
                        className: "flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-gradient-to-b from-tp-warning-100/80 to-tp-warning-50/90 shrink-0",
                        children: _jsx("span", {
                            className: "font-['Inter',sans-serif] text-[14px] font-bold text-tp-warning-700",
                            children: index + 1,
                        }),
                    }),
                    _jsxs("div", {
                        className: "grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3",
                        children: [
                            _jsxs("div", {
                                className: "min-w-0 flex flex-col gap-y-[4px]",
                                children: [
                                    _jsxs("div", {
                                        className: "flex min-w-0 flex-wrap items-center gap-[8px]",
                                        children: [
                                            _jsx("p", {
                                                className: "font-['Inter',sans-serif] text-[14px] font-semibold leading-[1.25] text-tp-slate-900",
                                                children: service.treatment,
                                            }),
                                            _jsx("span", {
                                                className: "inline-flex items-center rounded-[4px] bg-tp-slate-100 px-[5px] py-[1px] font-['Inter',sans-serif] text-[12px] font-bold text-tp-slate-600",
                                                children: toothText,
                                            }),
                                            _jsxs(Tooltip, {
                                                delayDuration: 150,
                                                children: [
                                                    _jsx(TooltipTrigger, {
                                                        asChild: true,
                                                        children: _jsx("button", {
                                                            type: "button",
                                                            onClick: (e) => e.stopPropagation(),
                                                            onPointerDown: (e) => e.stopPropagation(),
                                                            className: "inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[999px] text-tp-slate-400 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-600",
                                                            "aria-label": "View treatment details",
                                                            children: _jsx(Info, { size: 14, strokeWidth: 2 }),
                                                        }),
                                                    }),
                                                    _jsx(TooltipContent, {
                                                        side: "bottom",
                                                        align: "start",
                                                        sideOffset: 8,
                                                        className: "max-w-[280px] rounded-[10px] px-3 py-2",
                                                        children: _jsx("div", {
                                                            className: "space-y-1.5 font-['Inter',sans-serif] text-[12px] leading-[1.45] text-tp-slate-600",
                                                            children: hoverDetails.map((detail) => _jsxs("p", {
                                                                children: [
                                                                    _jsxs("span", {
                                                                        className: "font-semibold text-tp-slate-900",
                                                                        children: [detail.label, ": "],
                                                                    }),
                                                                    _jsx("span", { children: detail.value }),
                                                                ],
                                                            }, detail.label)),
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsxs("div", {
                                        className: "flex min-w-0 flex-wrap items-center gap-[8px]",
                                        children: [
                                            _jsxs(TPSelect, {
                                                value: dropdownValue,
                                                onValueChange: (v) => handleServiceStatusChange(v),
                                                children: [
                                                    _jsx(TPSelectTrigger, {
                                                        className: `!h-[24px] data-[size=default]:!h-[24px] data-[size=sm]:!h-[24px] min-h-[24px] !w-fit max-w-full !rounded-[6px] border-0 !px-[8px] !py-0 font-['Inter',sans-serif] text-[12px] font-semibold leading-none focus:outline-none focus:ring-1 focus:ring-tp-blue-500/30 [&_svg]:!text-current [&_svg]:!opacity-100 ${statusSelectClasses}`,
                                                        onPointerDown: (e) => e.stopPropagation(),
                                                        children: _jsx(TPSelectValue, { placeholder: "Select status" }),
                                                    }),
                                                    _jsx(TPSelectContent, {
                                                        className: "w-[180px] !rounded-[8px]",
                                                        children: STATUS_OPTIONS.map((opt) => _jsx(TPSelectItem, { value: opt.value, className: `${statusSelectItemBaseClass} ${getStatusSelectItemToneClasses(opt.value)}`, children: opt.label }, opt.value)),
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs("div", {
                                className: "flex shrink-0 items-center justify-end gap-[10px]",
                                children: [
                                    _jsxs(Tooltip, {
                                        delayDuration: 200,
                                        children: [
                                            _jsx(TooltipTrigger, {
                                                asChild: true,
                                                children: _jsx("button", {
                                                    type: "button",
                                                    onClick: (e) => {
                                                        e.stopPropagation();
                                                        if (!isOpen) onToggle?.();
                                                        openDrawer({ type: "add-sitting", serviceId: service.id });
                                                    },
                                                    className: "inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-200/90",
                                                    "aria-label": "Add quick visit record",
                                                    children: _jsx(Add, { size: 18, variant: "Linear" }),
                                                }),
                                            }),
                                            _jsx(TooltipContent, { side: "bottom", sideOffset: 6, className: "rounded-[10px] px-3 py-2 font-['Inter',sans-serif] text-[12px] leading-[1.45]", children: "Add quick visit record" }),
                                        ],
                                    }),
                                    _jsxs(Tooltip, {
                                        delayDuration: 200,
                                        children: [
                                            _jsx(TooltipTrigger, {
                                                asChild: true,
                                                children: _jsx("button", {
                                                    type: "button",
                                                    onClick: (e) => {
                                                        e.stopPropagation();
                                                        if (!isOpen) onToggle?.();
                                                        openDrawer({ type: "book-appointment", planId: plan.id, serviceId: service.id });
                                                    },
                                                    className: "inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-200/90",
                                                    "aria-label": "Book appointment",
                                                    children: _jsx(Calendar2, { size: 17, variant: "Linear" }),
                                                }),
                                            }),
                                            _jsx(TooltipContent, { side: "bottom", sideOffset: 6, className: "rounded-[10px] px-3 py-2 font-['Inter',sans-serif] text-[12px] leading-[1.45]", children: "Book appointment" }),
                                        ],
                                    }),
                                    _jsxs(DropdownMenu, {
                                        children: [
                                            _jsx(DropdownMenuTrigger, {
                                                asChild: true,
                                                children: _jsx("button", {
                                                    type: "button",
                                                    onClick: (e) => e.stopPropagation(),
                                                    className: "inline-flex h-9 w-[20px] items-center justify-center rounded-[8px] text-tp-slate-700 transition-colors hover:bg-tp-slate-100",
                                                    "aria-label": "More actions",
                                                    children: _jsx(MoreVertical, { size: 18, color: "currentColor", strokeWidth: 2 }),
                                                }),
                                            }),
                                            _jsxs(DropdownMenuContent, {
                                                align: "end",
                                                className: dropdownContentClass,
                                                children: [
                                                    _jsxs(DropdownMenuItem, {
                                                        onClick: () => openDrawer({ type: "bill-preview", planId: plan.id, serviceId: service.id }),
                                                        className: dropdownItemClass,
                                                        children: [_jsx(Receipt1, { size: 16, variant: "Linear", className: "" }), "View work done"],
                                                    }),
                                                    _jsxs(DropdownMenuItem, {
                                                        onClick: () => setDeleteOpen(true),
                                                        className: "rounded-[8px] !gap-[6px] focus:bg-red-50 data-[highlighted]:bg-red-50",
                                                        children: [
                                                            _jsx(Trash, { size: 16, variant: "Linear", className: "text-tp-error-600" }),
                                                            _jsx("span", { className: "text-tp-error-600", children: "Delete Service" }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsx("button", {
                                        type: "button",
                                        onClick: (e) => { e.stopPropagation(); onToggle?.(); },
                                        "aria-label": isOpen ? "Collapse service" : "Expand service",
                                        className: "flex h-9 w-9 items-center justify-center rounded-[10px] text-tp-slate-700 transition-colors hover:bg-tp-slate-100",
                                        children: _jsx("span", {
                                            className: `inline-flex transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
                                            children: _jsx(ChevronDown, { size: 18, className: "text-current", strokeWidth: 2 }),
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            isOpen && _jsx("div", {
                className: "min-w-0 bg-white px-[14px] py-[12px]",
                children: _jsxs("div", {
                    className: "pb-[4px]",
                    children: [
                        _jsx("div", {
                            className: "mb-[14px] rounded-[10px] bg-[rgba(245,245,245,1)] px-[14px] py-[10px]",
                            children: _jsxs("div", {
                                className: "flex min-w-0 flex-wrap items-center gap-x-[12px] gap-y-[6px] font-['Inter',sans-serif] text-[12px] leading-[1.55] text-tp-slate-600",
                                children: [
                                    _jsxs("div", {
                                        className: "inline-flex items-baseline gap-[4px] min-w-0",
                                        children: [
                                            _jsx("span", { className: "font-semibold text-tp-slate-700", children: "Treatment:" }),
                                            _jsx("span", { children: service.treatment }),
                                        ],
                                    }),
                                    _jsx("span", { "aria-hidden": true, className: "h-3 w-px bg-tp-slate-300" }),
                                    _jsxs("div", {
                                        className: "inline-flex items-baseline gap-[4px] min-w-0",
                                        children: [
                                            _jsx("span", { className: "font-semibold text-tp-slate-700", children: "Tooth:" }),
                                            _jsx("span", {
                                                children: service.toothFdi === "full-mouth"
                                                    ? "Full Mouth"
                                                    : `${service.toothLabel} (${toothText})`,
                                            }),
                                        ],
                                    }),
                                    service.toothFdi !== "full-mouth" && _jsx("span", { "aria-hidden": true, className: "h-3 w-px bg-tp-slate-300" }),
                                    service.toothFdi !== "full-mouth" && _jsxs("div", {
                                        className: "inline-flex items-baseline gap-[4px] min-w-0",
                                        children: [
                                            _jsx("span", { className: "font-semibold text-tp-slate-700", children: "Surfaces:" }),
                                            _jsx("span", { children: surfaceSummary }),
                                        ],
                                    }),
                                    _jsx("span", { "aria-hidden": true, className: "h-3 w-px bg-tp-slate-300" }),
                                    _jsxs("div", {
                                        className: "inline-flex items-baseline gap-[4px] min-w-0",
                                        children: [
                                            _jsx("span", { className: "font-semibold text-tp-slate-700", children: "Amount:" }),
                                            _jsx("span", { className: "font-semibold text-tp-slate-800 tabular-nums", children: formatINR(service.amount) }),
                                        ],
                                    }),
                                    _jsx("span", { "aria-hidden": true, className: "h-3 w-px bg-tp-slate-300" }),
                                    _jsxs("div", {
                                        className: "inline-flex items-baseline gap-[4px] min-w-0 max-w-full",
                                        children: [
                                            _jsx("span", { className: "font-semibold text-tp-slate-700", children: "Notes:" }),
                                            _jsx("span", {
                                                className: String(service.notes ?? "").trim() ? "" : "text-tp-slate-400",
                                                children: String(service.notes ?? "").trim() || "—",
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        }),
                        _jsx("div", {
                            className: "min-w-0",
                            children: timelineEntries.length > 0
                                ? _jsx("div", {
                                    className: "min-w-0",
                                    children: timelineEntries.map((entry, idx) => {
                                                    const isLast = idx === timelineEntries.length - 1;
                                                    if (entry.kind === "appointment") {
                                                        const appt = entry.appt;
                                                        const isCancelled = appt.status === "cancelled";
                                                        const linkedConsultations = entry.linkedConsultations;
                                                        // Cancelled appointments must not display consultation summary/preview UI.
                                                        const hasVisitNotes = !isCancelled && linkedConsultations.length > 0;
                                                        const primaryConsult = linkedConsultations[0];
                                                        const apptRxHref = buildConsultationRxUrl(patientId, plan.id, service.id, appt.id, embedInPatientShell, service.treatment);
                                                        const dateLong = formatAppointmentDateLong(appt.date);
                                                        const badgeKind = isCancelled ? "cancelled" : hasVisitNotes ? "completed" : "upcoming";
                                                        return _jsxs("div", {
                                                            className: `relative ${idx === 0 ? "mt-[16px]" : "mt-[22px]"} w-full min-w-0 pl-[28px]`,
                                                            children: [
                                                                !isLast && _jsx("span", { "aria-hidden": true, className: "absolute left-[4px] top-[26px] w-[2px] h-[calc(100%+22px)] bg-gradient-to-b from-[rgba(88,28,135,0.06)] via-[rgba(88,28,135,0.2)] to-[rgba(88,28,135,0.06)]" }),
                                                                _jsx(VisitTimelineDot, { variant: isCancelled ? "cancelled" : "default" }),
                                                                _jsxs("div", {
                                                                    className: "relative w-full min-w-0 px-[20px] py-[16px]",
                                                                    style: getVisitRowSurfaceStyle(isCancelled),
                                                                    children: [
                                                                        _jsxs("div", {
                                                                            className: "relative z-[1] flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2",
                                                                            children: [
                                                                                _jsxs("div", {
                                                                                    className: "min-w-0 max-w-full flex-1 space-y-2",
                                                                                    children: [
                                                                                        _jsxs("div", {
                                                                                            className: "flex min-w-0 flex-wrap items-center gap-x-[8px] gap-y-1.5",
                                                                                            children: [
                                                                                                _jsx(VisitDoctorAvatar, {}),
                                                                                                _jsx("p", {
                                                                                                    className: `font-['Inter',sans-serif] text-[16px] font-semibold leading-snug text-[#581C87] ${isCancelled ? "text-tp-slate-400 line-through" : ""}`,
                                                                                                    children: appt.doctor,
                                                                                                }),
                                                                                                visitBadge(badgeKind),
                                                                                            ],
                                                                                        }),
                                                                                        _jsxs("div", {
                                                                                            className: `flex min-w-0 flex-wrap items-center gap-x-[10px] gap-y-1 font-['Inter',sans-serif] text-[12px] leading-[18px] ${isCancelled ? "text-tp-slate-400 line-through" : "text-[rgba(88,28,135,0.72)]"}`,
                                                                                            children: [
                                                                                                _jsxs("span", {
                                                                                                    className: "inline-flex items-baseline gap-[4px]",
                                                                                                    children: [
                                                                                                        _jsx("span", { className: "font-semibold", children: "Date:" }),
                                                                                                        _jsx("span", { children: appt.time ? `${dateLong} (${appt.time})` : dateLong }),
                                                                                                    ],
                                                                                                }),
                                                                                                _jsx("span", { className: "h-3 w-px bg-[rgba(220,208,232,0.81)]", "aria-hidden": true }),
                                                                                                _jsxs("span", {
                                                                                                    className: "inline-flex items-baseline gap-[4px]",
                                                                                                    children: [
                                                                                                        _jsx("span", { className: "font-semibold", children: "Visit Type:" }),
                                                                                                        _jsx("span", { children: appt.caseType ? CASE_TYPE_LABELS[appt.caseType] ?? "Follow up" : "Follow up" }),
                                                                                                    ],
                                                                                                }),
                                                                                                _jsx("span", { className: "h-3 w-px bg-[rgba(220,208,232,0.81)]", "aria-hidden": true }),
                                                                                                _jsxs("span", {
                                                                                                    className: "inline-flex items-baseline gap-[4px] min-w-0",
                                                                                                    children: [
                                                                                                        _jsx("span", { className: "font-semibold", children: "Remarks:" }),
                                                                                                        _jsx("span", { className: "min-w-0 truncate", children: String(appt.notes ?? "").trim() || "Review and obturation planning" }),
                                                                                                    ],
                                                                                                }),
                                                                                            ],
                                                                                        }),
                                                                                    ],
                                                                                }),
                                                                                _jsxs("div", {
                                                                                    className: "flex shrink-0 flex-wrap items-center justify-end gap-1.5",
                                                                                    children: [
                                                                                        hasVisitNotes && primaryConsult && _jsx("button", {
                                                                                            type: "button",
                                                                                            onClick: () => {
                                                                                                setSittingPreviewId(null);
                                                                                                setConsultPreviewId(primaryConsult.id);
                                                                                            },
                                                                                            className: VIEW_RX_SECONDARY_CLASS,
                                                                                            children: [
                                                                                                _jsx(DocumentText, { size: 14, variant: "Linear" }),
                                                                                                "View Rx",
                                                                                            ],
                                                                                        }),
                                                                                        !hasVisitNotes && !isCancelled && _jsx(TPSplitButton, {
                                                                                            size: "sm",
                                                                                            variant: "outline",
                                                                                            theme: "primary",
                                                                                            className: "shadow-none",
                                                                                            trackClassName: TIMELINE_TYPERX_TRACK_CLASS,
                                                                                            primaryAction: {
                                                                                                label: "TypeRx",
                                                                                                onClick: () => window.location.assign(apptRxHref),
                                                                                            },
                                                                                            secondaryActions: [
                                                                                                {
                                                                                                    id: "quick-record-visit-form",
                                                                                                    label: "Quick visit record form",
                                                                                                    onClick: () => openDrawer({ type: "add-sitting", serviceId: service.id }),
                                                                                                },
                                                                                                { id: "quick-record-separator", separator: true },
                                                                                                { id: "type-rx", label: "TypeRx", onClick: () => window.location.assign(apptRxHref) },
                                                                                                { id: "voice-rx", label: "VoiceRx", onClick: () => window.location.assign(apptRxHref) },
                                                                                                { id: "snap-rx", label: "SnapRx", onClick: () => window.location.assign(apptRxHref) },
                                                                                                { id: "smart-sync", label: "SmartSync", onClick: () => window.location.assign(apptRxHref) },
                                                                                            ],
                                                                                        }),
                                                                                        _jsxs(DropdownMenu, {
                                                                                            children: [
                                                                                                _jsx(DropdownMenuTrigger, {
                                                                                                    asChild: true,
                                                                                                    children: _jsx("button", {
                                                                                                        type: "button",
                                                                                                        className: TIMELINE_MENU_TRIGGER_CLASS,
                                                                                                        "aria-label": "More actions",
                                                                                                        children: _jsx(MoreVertical, { size: 17, color: "currentColor", strokeWidth: 2 }),
                                                                                                    }),
                                                                                                }),
                                                                                                _jsxs(DropdownMenuContent, {
                                                                                                    align: "end",
                                                                                                    className: dropdownContentClass,
                                                                                                    children: [
                                                                                                        hasVisitNotes && primaryConsult && _jsxs(_Fragment, {
                                                                                                            children: [
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => window.location.assign(apptRxHref),
                                                                                                                    children: [_jsx(Edit2, { size: 16, variant: "Linear", className: "" }), "Edit in RxPad"],
                                                                                                                }),
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => {
                                                                                                                        setSittingPreviewId(null);
                                                                                                                        setConsultPreviewId(primaryConsult.id);
                                                                                                                    },
                                                                                                                    children: [_jsx(DocumentText, { size: 16, variant: "Linear", className: "" }), "View Rx"],
                                                                                                                }),
                                                                                                            ],
                                                                                                        }),
                                                                                                        !isCancelled && !hasVisitNotes && _jsxs(_Fragment, {
                                                                                                            children: [
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => openDrawer({ type: "book-appointment", planId: plan.id, serviceId: service.id, appointmentId: appt.id }),
                                                                                                                    children: [_jsx(Edit2, { size: 16, variant: "Linear", className: "" }), "Edit appointment"],
                                                                                                                }),
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: "rounded-[8px] !gap-[6px] focus:bg-red-50 data-[highlighted]:bg-red-50",
                                                                                                                    onClick: () => openCancelDialog(appt),
                                                                                                                    children: [_jsx(Ban, { size: 16, variant: "Linear", className: "text-tp-error-600" }), _jsx("span", { className: "text-tp-error-600", children: "Cancel appointment" })],
                                                                                                                }),
                                                                                                            ],
                                                                                                        }),
                                                                                                        isCancelled && !hasVisitNotes && _jsxs(_Fragment, {
                                                                                                            children: [
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => dispatch({
                                                                                                                        type: "UPDATE_APPOINTMENT",
                                                                                                                        serviceId: service.id,
                                                                                                                        appointmentId: appt.id,
                                                                                                                        patch: { status: "scheduled", cancellationReason: undefined },
                                                                                                                    }),
                                                                                                                    children: [_jsx(ArrowRotateLeft, { size: 16, variant: "Linear", className: "text-tp-success-600" }), _jsx("span", { className: "text-tp-success-600", children: "Revert cancellation" })],
                                                                                                                }),
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => dispatch({ type: "REMOVE_APPOINTMENT", serviceId: service.id, appointmentId: appt.id }),
                                                                                                                    children: [_jsx(Trash, { size: 16, variant: "Linear", className: "" }), "Remove from timeline"],
                                                                                                                }),
                                                                                                            ],
                                                                                                        }),
                                                                                                    ],
                                                                                                }),
                                                                                            ],
                                                                                        }),
                                                                                    ],
                                                                                }),
                                                                            ],
                                                                        }),
                                                                        isCancelled && appt.cancellationReason && _jsxs("p", {
                                                                            className: "font-['Inter',sans-serif] text-[10px] leading-[1.65] text-tp-error-600",
                                                                            children: [_jsx("span", { className: "font-semibold", children: "Reason: " }), appt.cancellationReason],
                                                                        }),
                                                                        !isCancelled && linkedConsultations.map((c) => _jsx(ConsultationPreviewCard, {
                                                                            c: c,
                                                                            appointmentItems: appointmentItems,
                                                                            patientId: patientId,
                                                                            plan: plan,
                                                                            service: service,
                                                                            embedInPatientShell: embedInPatientShell,
                                                                            underAppointment: true,
                                                                            variant: "snippet",
                                                                            previewOpen: consultPreviewId === c.id,
                                                                            onPreviewOpenChange: (o) => {
                                                                                if (o)
                                                                                    setSittingPreviewId(null);
                                                                                setConsultPreviewId(o ? c.id : null);
                                                                            },
                                                                            hideViewRxButton: true,
                                                                        }, c.id)),
                                                                    ],
                                                                }),
                                                            ],
                                                        }, appt.id);
                                                    }
                                                    if (entry.kind === "sitting") {
                                                        const sit = entry.sitting;
                                                        const sitStatus = sit.status ?? "completed";
                                                        const isCancelledSit = sitStatus === "cancelled";
                                                        const isUpcomingSit = sitStatus === "scheduled";
                                                        const sitRxHref = buildConsultationRxUrl(patientId, plan.id, service.id, undefined, embedInPatientShell, service.treatment);
                                                        const sitDateLong = sit.date ? formatAppointmentDateLong(sit.date) : "";
                                                        return _jsxs("div", {
                                                            className: `relative ${idx === 0 ? "mt-[16px]" : "mt-[22px]"} w-full min-w-0 pl-[28px]`,
                                                            children: [
                                                                !isLast && _jsx("span", { "aria-hidden": true, className: "absolute left-[4px] top-[26px] w-[2px] h-[calc(100%+22px)] bg-gradient-to-b from-[rgba(88,28,135,0.06)] via-[rgba(88,28,135,0.2)] to-[rgba(88,28,135,0.06)]" }),
                                                                _jsx(VisitTimelineDot, { variant: isCancelledSit ? "cancelled" : "default" }),
                                                                _jsxs("div", {
                                                                    className: "w-full min-w-0 px-[20px] py-[16px]",
                                                                    style: getVisitRowSurfaceStyle(isCancelledSit),
                                                                    children: [
                                                                        _jsxs("div", {
                                                                            className: "flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2",
                                                                            children: [
                                                                                _jsxs("div", {
                                                                                    className: "min-w-0 max-w-full flex-1 space-y-2",
                                                                                    children: [
                                                                                        _jsxs("div", {
                                                                                            className: "flex min-w-0 flex-wrap items-center gap-x-[8px] gap-y-1.5",
                                                                                            children: [
                                                                                                _jsx(VisitDoctorAvatar, {}),
                                                                                                _jsx("p", {
                                                                                            className: `font-['Inter',sans-serif] text-[16px] font-semibold leading-snug text-[#581C87] ${isCancelledSit ? "text-tp-slate-400 line-through" : ""}`,
                                                                                                    children: sit.doctor || "Quick visit",
                                                                                                }),
                                                                                                visitBadge(isCancelledSit ? "cancelled" : isUpcomingSit ? "upcoming" : "completed"),
                                                                                            ],
                                                                                        }),
                                                                                        _jsxs("div", {
                                                                                            className: `flex min-w-0 flex-wrap items-center gap-x-[10px] gap-y-1 font-['Inter',sans-serif] text-[12px] leading-[18px] ${isCancelledSit ? "text-tp-slate-400 line-through" : "text-[rgba(88,28,135,0.72)]"}`,
                                                                                            children: [
                                                                                                sitDateLong && _jsxs("span", {
                                                                                                    className: "inline-flex items-baseline gap-[4px]",
                                                                                                    children: [
                                                                                                        _jsx("span", { className: "font-semibold", children: "Date:" }),
                                                                                                        _jsx("span", { children: sit.time ? `${sitDateLong} (${sit.time})` : sitDateLong }),
                                                                                                    ],
                                                                                                }),
                                                                                                sitDateLong && _jsx("span", { className: "h-3 w-px bg-[rgba(220,208,232,0.81)]", "aria-hidden": true }),
                                                                                                _jsxs("span", {
                                                                                                    className: "inline-flex items-baseline gap-[4px]",
                                                                                                    children: [
                                                                                                        _jsx("span", { className: "font-semibold", children: "Visit Type:" }),
                                                                                                        _jsx("span", { children: String(sit.visitType ?? "").trim() || "Follow up" }),
                                                                                                    ],
                                                                                                }),
                                                                                                _jsx("span", { className: "h-3 w-px bg-[rgba(220,208,232,0.81)]", "aria-hidden": true }),
                                                                                                _jsxs("span", {
                                                                                                    className: "inline-flex items-baseline gap-[4px] min-w-0",
                                                                                                    children: [
                                                                                                        _jsx("span", { className: "font-semibold", children: "Remarks:" }),
                                                                                                        _jsx("span", { className: "min-w-0 truncate", children: String(sit.notes ?? "").trim() || "Review and obturation planning" }),
                                                                                                    ],
                                                                                                }),
                                                                                            ],
                                                                                        }),
                                                                                    ],
                                                                                }),
                                                                                _jsxs("div", {
                                                                                    className: "flex shrink-0 flex-wrap items-center justify-end gap-1.5",
                                                                                    children: [
                                                                                        !isCancelledSit && sitStatus === "completed" && _jsx("button", {
                                                                                            type: "button",
                                                                                            onClick: () => {
                                                                                                setConsultPreviewId(null);
                                                                                                setSittingPreviewId(sit.id);
                                                                                            },
                                                                                            className: VIEW_RX_SECONDARY_CLASS,
                                                                                            children: [
                                                                                                _jsx(DocumentText, { size: 14, variant: "Linear" }),
                                                                                                "View Rx",
                                                                                            ],
                                                                                        }),
                                                                                        !isCancelledSit && isUpcomingSit && _jsx(TPSplitButton, {
                                                                                            size: "sm",
                                                                                            variant: "outline",
                                                                                            theme: "primary",
                                                                                            className: "shadow-none",
                                                                                            trackClassName: TIMELINE_TYPERX_TRACK_CLASS,
                                                                                            primaryAction: {
                                                                                                label: "TypeRx",
                                                                                                onClick: () => window.location.assign(sitRxHref),
                                                                                            },
                                                                                            secondaryActions: [
                                                                                                { id: "quick-record-visit-form", label: "Quick visit record form", onClick: () => openDrawer({ type: "add-sitting", serviceId: service.id }) },
                                                                                                { id: "quick-record-separator", separator: true },
                                                                                                { id: "type-rx", label: "TypeRx", onClick: () => window.location.assign(sitRxHref) },
                                                                                                { id: "voice-rx", label: "VoiceRx", onClick: () => window.location.assign(sitRxHref) },
                                                                                                { id: "snap-rx", label: "SnapRx", onClick: () => window.location.assign(sitRxHref) },
                                                                                                { id: "smart-sync", label: "SmartSync", onClick: () => window.location.assign(sitRxHref) },
                                                                                            ],
                                                                                        }),
                                                                                        _jsxs(DropdownMenu, {
                                                                                            children: [
                                                                                                _jsx(DropdownMenuTrigger, {
                                                                                                    asChild: true,
                                                                                                    children: _jsx("button", {
                                                                                                        type: "button",
                                                                                                        className: TIMELINE_MENU_TRIGGER_CLASS,
                                                                                                        "aria-label": "More actions",
                                                                                                        children: _jsx(MoreVertical, { size: 17, color: "currentColor", strokeWidth: 2 }),
                                                                                                    }),
                                                                                                }),
                                                                                                _jsxs(DropdownMenuContent, {
                                                                                                    align: "end",
                                                                                                    className: dropdownContentClass,
                                                                                                    children: [
                                                                                                        !isCancelledSit && _jsxs(_Fragment, {
                                                                                                            children: [
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => openDrawer({ type: "edit-sitting", serviceId: service.id, sittingId: sit.id }),
                                                                                                                    children: [_jsx(Edit2, { size: 16, variant: "Linear", className: "" }), "Edit visit"],
                                                                                                                }),
                                                                                                                sit.notes && _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => {
                                                                                                                        setConsultPreviewId(null);
                                                                                                                        setSittingPreviewId(sit.id);
                                                                                                                    },
                                                                                                                    children: [_jsx(DocumentText, { size: 16, variant: "Linear", className: "" }), "View Rx"],
                                                                                                                }),
                                                                                                            ],
                                                                                                        }),
                                                                                                        isCancelledSit && _jsxs(_Fragment, {
                                                                                                            children: [
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => dispatch({
                                                                                                                        type: "UPDATE_SITTING",
                                                                                                                        serviceId: service.id,
                                                                                                                        sittingId: sit.id,
                                                                                                                        patch: { status: "completed" },
                                                                                                                    }),
                                                                                                                    children: [_jsx(ArrowRotateLeft, { size: 16, variant: "Linear", className: "text-tp-success-600" }), _jsx("span", { className: "text-tp-success-600", children: "Revert cancellation" })],
                                                                                                                }),
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => dispatch({ type: "REMOVE_SITTING", serviceId: service.id, sittingId: sit.id }),
                                                                                                                    children: [_jsx(Trash, { size: 16, variant: "Linear", className: "" }), "Remove from timeline"],
                                                                                                                }),
                                                                                                            ],
                                                                                                        }),
                                                                                                    ],
                                                                                                }),
                                                                                            ],
                                                                                        }),
                                                                                    ],
                                                                                }),
                                                                            ],
                                                                        }),
                                                                        !isCancelledSit && !isUpcomingSit && sit.notes && _jsx(ConsultationSummarySurface, {
                                                                            children: renderConsultSummarySnippetBody(sit.notes, { inSurface: true }),
                                                                        }),
                                                                    ],
                                                                }),
                                                                _jsx(QuickVisitRxPreview, {
                                                                    sit: sit,
                                                                    patientId: patientId,
                                                                    plan: plan,
                                                                    service: service,
                                                                    embedInPatientShell: embedInPatientShell,
                                                                    previewOpen: sittingPreviewId === sit.id,
                                                                    onOpenChange: (o) => setSittingPreviewId(o ? sit.id : null),
                                                                }),
                                                            ],
                                                        }, sit.id);
                                                    }
                                                    const c = entry.consultation;
                                                    const directRxHref = buildConsultationRxUrl(patientId, plan.id, service.id, c.appointmentId, embedInPatientShell, service.treatment);
                                                    return _jsxs("div", {
                                                        className: `relative ${idx === 0 ? "mt-[16px]" : "mt-[26px]"} w-full min-w-0 pl-[18px]`,
                                                        children: [
                                                            !isLast && _jsx("span", { className: "absolute left-[5px] top-[20px] h-[calc(100%-4px)] border-l border-[#BCA4CF]/60" }),
                                                            _jsx("span", { className: "absolute left-[-2px] top-[1px] h-[14px] w-[14px] rounded-full bg-[#BCA4CF] ring-[5px] ring-white" }),
                                                            _jsxs("div", {
                                                                className: "w-full min-w-0 rounded-[14px] border-0 border-transparent bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(242,239,250,0.7)_100%)] px-[18px] py-[14px]",
                                                                style: { borderStyle: "none", borderImage: "none", borderColor: "rgba(0, 0, 0, 0)" },
                                                                children: [
                                                                    _jsxs("div", {
                                                                        className: "flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2",
                                                                        children: [
                                                                            _jsxs("div", {
                                                                                className: "min-w-0 max-w-full flex-1 space-y-1.5",
                                                                                children: [
                                                                                    _jsxs("div", {
                                                                                        className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
                                                                                        children: [
                                                                                            _jsx("p", {
                                                                                                className: "font-['Inter',sans-serif] text-[12px] font-bold leading-snug text-[#581C87]",
                                                                                                children: "Chairside visit",
                                                                                            }),
                                                                                            visitBadge("completed"),
                                                                                        ],
                                                                                    }),
                                                                                    _jsxs("div", {
                                                                                        className: "flex min-w-0 flex-wrap items-center gap-1.5 font-['Inter',sans-serif] text-[12px] leading-[18px] text-[rgba(88,28,135,0.72)]",
                                                                                        children: [
                                                                                            _jsx("span", { className: "font-semibold", children: "Visit Type:" }),
                                                                                            _jsx("span", { children: "Follow up" }),
                                                                                            _jsx("span", { className: "h-3 w-px bg-[rgba(220,208,232,0.81)]", "aria-hidden": true }),
                                                                                            _jsx("span", { className: "font-semibold", children: "Remarks:" }),
                                                                                            _jsx("span", { className: "min-w-0 truncate", children: String(c.summaryText ?? "").trim().split(/\n/).map((l) => l.trim()).filter(Boolean)[0] || "Review and obturation planning" }),
                                                                                        ],
                                                                                    }),
                                                                                ],
                                                                            }),
                                                                            _jsxs("div", {
                                                                                className: "flex shrink-0 flex-wrap items-center justify-end gap-1.5",
                                                                                children: [
                                                                                    _jsx("button", {
                                                                                        type: "button",
                                                                                        onClick: () => {
                                                                                            setSittingPreviewId(null);
                                                                                            setConsultPreviewId(c.id);
                                                                                        },
                                                                                        className: VIEW_RX_SECONDARY_CLASS,
                                                                                        children: [
                                                                                            _jsx(DocumentText, { size: 14, variant: "Linear" }),
                                                                                            "View Rx",
                                                                                        ],
                                                                                    }),
                                                                                    _jsxs(DropdownMenu, {
                                                                                        children: [
                                                                                            _jsx(DropdownMenuTrigger, {
                                                                                                asChild: true,
                                                                                                children: _jsx("button", {
                                                                                                    type: "button",
                                                                                                    className: TIMELINE_MENU_TRIGGER_CLASS,
                                                                                                    "aria-label": "More actions",
                                                                                                    children: _jsx(MoreVertical, { size: 17, color: "currentColor", strokeWidth: 2 }),
                                                                                                }),
                                                                                            }),
                                                                                            _jsxs(DropdownMenuContent, {
                                                                                                align: "end",
                                                                                                className: dropdownContentClass,
                                                                                                children: [
                                                                                                    _jsxs(DropdownMenuItem, {
                                                                                                        className: dropdownItemClass,
                                                                                                        onClick: () => window.location.assign(directRxHref),
                                                                                                        children: [_jsx(Edit2, { size: 16, variant: "Linear", className: "" }), "Edit in RxPad"],
                                                                                                    }),
                                                                                                    _jsxs(DropdownMenuItem, {
                                                                                                        className: dropdownItemClass,
                                                                                                        onClick: () => {
                                                                                                            setSittingPreviewId(null);
                                                                                                            setConsultPreviewId(c.id);
                                                                                                        },
                                                                                                        children: [_jsx(DocumentText, { size: 16, variant: "Linear", className: "" }), "View Rx"],
                                                                                                    }),
                                                                                                ],
                                                                                            }),
                                                                                        ],
                                                                                    }),
                                                                                ],
                                                                            }),
                                                                        ],
                                                                    }),
                                                                    _jsx(ConsultationPreviewCard, {
                                                                        c: c,
                                                                        appointmentItems: appointmentItems,
                                                                        patientId: patientId,
                                                                        plan: plan,
                                                                        service: service,
                                                                        embedInPatientShell: embedInPatientShell,
                                                                        variant: "snippet",
                                                                        previewOpen: consultPreviewId === c.id,
                                                                        onPreviewOpenChange: (o) => {
                                                                            if (o)
                                                                                setSittingPreviewId(null);
                                                                            setConsultPreviewId(o ? c.id : null);
                                                                        },
                                                                        hideViewRxButton: true,
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }, c.id);
                                                })
                                            })
                                            : _jsxs("div", {
                                                className: "flex flex-col items-center px-2 py-8 text-center",
                                                children: [
                                                    _jsx(PlanEmptyIcon, { size: 96 }),
                                                    _jsx("p", { className: "mt-3 font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-700", children: "No visits recorded yet" }),
                                                    _jsx("p", {
                                                        className: "mt-1.5 max-w-[360px] font-['Inter',sans-serif] text-[12px] leading-[1.65] text-tp-slate-500",
                                                        children: "Add a quick visit report or book the next appointment for this service.",
                                                    }),
                                                    _jsxs("div", {
                                                        className: "mt-[16px] flex w-full flex-row flex-wrap gap-[10px] items-stretch justify-center max-w-[460px]",
                                                        children: [
                                                            _jsx("button", {
                                                                type: "button",
                                                                onClick: (e) => {
                                                                    e.stopPropagation();
                                                                    openDrawer({ type: "book-appointment", planId: plan.id, serviceId: service.id });
                                                                },
                                                                className: "inline-flex h-[44px] flex-1 min-w-[160px] items-center justify-center gap-[8px] rounded-[12px] bg-white border border-tp-blue-500 px-[16px] font-['Inter',sans-serif] text-[14px] font-semibold text-tp-blue-500 transition-colors hover:bg-tp-blue-50/40",
                                                                children: [
                                                                    _jsx(Calendar2, { size: 18, variant: "Linear", className: "text-tp-blue-500" }),
                                                                    "Book appointment",
                                                                ],
                                                            }),
                                                            _jsx("button", {
                                                                type: "button",
                                                                onClick: (e) => {
                                                                    e.stopPropagation();
                                                                    openDrawer({ type: "add-sitting", serviceId: service.id });
                                                                },
                                                                className: "inline-flex h-[44px] flex-1 min-w-[160px] items-center justify-center gap-[8px] rounded-[12px] bg-tp-blue-600 px-[16px] font-['Inter',sans-serif] text-[14px] font-semibold text-white transition-colors hover:bg-tp-blue-700",
                                                                children: [
                                                                    _jsx(Add, { size: 18, variant: "Linear", className: "text-white" }),
                                                                    "Add Quick Visit Report",
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                        }),
                    ],
                }),
            }),
            // ── Dialogs ────────────────────────────────────
            _jsx(TPConfirmDialog, {
                open: markDoneOpen,
                onOpenChange: setMarkDoneOpen,
                title: "Mark as Completed",
                warning: `This marks ${service.treatment} (${service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi}`}) as completed. You can revert the status if needed.`,
                secondaryLabel: "Cancel",
                primaryLabel: "Mark Done",
                primaryTone: "success",
                onPrimary: handleMarkDone,
            }),
            _jsx(TPConfirmDialog, {
                open: deleteOpen,
                onOpenChange: setDeleteOpen,
                title: "Delete Service",
                warning: `This permanently removes ${service.treatment} from the plan. This action cannot be undone.`,
                secondaryLabel: "Cancel",
                primaryLabel: "Delete",
                primaryTone: "destructive",
                onPrimary: () => {
                    dispatch({ type: "REMOVE_SERVICE", serviceId: service.id });
                    setDeleteOpen(false);
                },
            }),
            _jsx(TPConfirmDialog, {
                open: !!cancelTarget,
                onOpenChange: (open) => { if (!open) closeCancelDialog(); },
                title: "Cancel Appointment",
                warning: cancelTarget
                    ? `Cancelling ${cancelTarget.doctor}'s appointment on ${cancelTarget.date} at ${cancelTarget.time}. Record a reason so it stays visible in the visit history.`
                    : "",
                secondaryLabel: "Keep appointment",
                primaryLabel: "Cancel appointment",
                primaryTone: "destructive",
                primaryDisabled: !cancelReason.trim(),
                onPrimary: confirmCancelAppointment,
                children: _jsxs("div", {
                    className: "flex flex-col gap-[8px]",
                    children: [
                        _jsx("label", {
                            className: "block font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-700",
                            children: "Reason for cancellation",
                        }),
                        _jsx("textarea", {
                            value: cancelReason,
                            onChange: (e) => setCancelReason(e.target.value),
                            placeholder: "e.g. Patient requested to reschedule due to travel",
                            rows: 3,
                            className: "w-full rounded-[10px] border border-tp-slate-200 bg-white px-[14px] py-[10px] font-['Inter',sans-serif] text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors resize-none",
                        }),
                        _jsx("div", {
                            className: "flex flex-wrap gap-[6px]",
                            children: ["Patient travel", "Doctor unavailable", "Patient no-show", "Rescheduled"].map((quick) => _jsx("button", {
                                type: "button",
                                onClick: () => setCancelReason(quick),
                                className: "inline-flex h-[26px] items-center rounded-[8px] bg-tp-slate-100 px-[10px] font-['Inter',sans-serif] text-[10px] font-medium text-tp-slate-600 hover:bg-tp-slate-200 transition-colors",
                                children: quick,
                            }, quick)),
                        }),
                    ],
                }),
            }),
        ],
    });
}

// ─── Plan Cluster Card ─────────────────────────────────────
function PlanClusterCard({ plan, collapsed = false, onToggleCollapse }) {
    const { dispatch, openDrawer, patientId } = usePlanContext();
    const [markAllOpen, setMarkAllOpen] = useState(false);
    const [revertAllOpen, setRevertAllOpen] = useState(false);
    const [deletePlanOpen, setDeletePlanOpen] = useState(false);
    // Accordion — first service open by default, one at a time.
    const [openServiceIndex, setOpenServiceIndex] = useState(0);
    const services = plan.services;
    const total = computePlanTotal(plan.services);
    const additionalDiscount = plan.additionalDiscount ?? 0;
    const finalTotal = Math.max(0, total - additionalDiscount);
    return _jsxs("div", {
        className: `flex min-h-0 flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)] ${dui.planClusterShell} !h-auto`,
        children: [
            _jsxs("div", {
                className: `shrink-0 flex items-center justify-between px-[16px] py-[14px] ${dui.planClusterHeaderActive}`,
                children: [
                    _jsxs("div", {
                        className: "flex items-center gap-[12px]",
                        children: [
                            _jsx("div", {
                                className: "flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-gradient-to-b from-tp-warning-100/80 to-tp-warning-50/90",
                                children: _jsx(Timer1, { size: 22, variant: "Bulk", className: "text-tp-warning-700" }),
                            }),
                            _jsxs("div", {
                                children: [
                                    _jsx("h4", { className: "font-['Inter',sans-serif] text-[16px] font-semibold text-tp-slate-900", children: plan.name }),
                                    _jsx("div", {
                                        className: "mt-[3px] flex items-center gap-[6px] flex-wrap",
                                        children: additionalDiscount > 0
                                            ? _jsxs(Tooltip, {
                                                delayDuration: 200,
                                                children: [
                                                    _jsx(TooltipTrigger, {
                                                        asChild: true,
                                                        children: _jsx("span", {
                                                            className: "inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-700 tabular-nums cursor-default",
                                                            children: formatINR(finalTotal),
                                                        }),
                                                    }),
                                                    _jsx(TooltipContent, {
                                                        side: "bottom",
                                                        sideOffset: 6,
                                                        className: "rounded-[10px] px-3 py-2",
                                                        children: _jsxs("div", {
                                                            className: "space-y-1 font-['Inter',sans-serif] text-[12px] leading-[1.45]",
                                                            children: [
                                                                _jsxs("p", { className: "text-tp-slate-400", children: ["Subtotal: ", formatINR(total)] }),
                                                                _jsxs("p", { className: "text-tp-success-500", children: ["Discount: \u2212", formatINR(additionalDiscount)] }),
                                                                _jsxs("p", { className: "font-semibold text-white", children: ["Final: ", formatINR(finalTotal)] }),
                                                            ],
                                                        }),
                                                    }),
                                                ],
                                            })
                                            : _jsx("span", {
                                                className: "inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-700 tabular-nums",
                                                children: formatINR(finalTotal),
                                            }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    _jsxs("div", {
                        className: "flex items-center gap-[6px]",
                        children: [
                            _jsxs("button", {
                                type: "button",
                                onClick: () => setMarkAllOpen(true),
                                className: "inline-flex items-center justify-center gap-[6px] rounded-[12px] px-[16px] h-[36px] min-w-[120px] font-['Inter',sans-serif] text-[14px] font-semibold text-white bg-tp-success-600 hover:bg-tp-success-700 transition-colors",
                                children: [_jsx(TickCircle, { size: 20, variant: "Linear" }), "Mark All Done"],
                            }),
                            _jsxs(DropdownMenu, {
                                children: [
                                    _jsx(DropdownMenuTrigger, {
                                        asChild: true,
                                        children: _jsx("button", {
                                            type: "button",
                                            className: "flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center rounded-[10px] hover:bg-tp-slate-100 transition-colors",
                                            children: _jsx(MoreVertical, { size: 20, color: "var(--tp-slate-500)", strokeWidth: 2 }),
                                        }),
                                    }),
                                    _jsxs(DropdownMenuContent, {
                                        align: "end",
                                        className: dropdownContentClass,
                                        children: [
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => openDrawer({ type: "bill-preview", planId: plan.id }),
                                                className: dropdownItemClass,
                                                children: [_jsx(Receipt1, { size: 16, variant: "Linear", className: "" }), "View Plan Bill"],
                                            }),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => setRevertAllOpen(true),
                                                className: "rounded-[8px] !gap-[6px] focus:bg-tp-warning-50 data-[highlighted]:bg-tp-warning-50",
                                                children: [
                                                    _jsx(ArrowRotateLeft, { size: 16, variant: "Linear", className: "text-tp-warning-600" }),
                                                    _jsx("span", { className: "text-tp-warning-600", children: "Revert All to Plan" }),
                                                ],
                                            }),
                                            _jsx(DropdownMenuSeparator, {}),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => setDeletePlanOpen(true),
                                                className: "rounded-[8px] !gap-[6px] focus:bg-red-50 data-[highlighted]:bg-red-50",
                                                children: [
                                                    _jsx(Trash, { size: 16, variant: "Linear", className: "text-tp-error-600" }),
                                                    _jsx("span", { className: "text-tp-error-600 font-semibold", children: "Delete Plan" }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            _jsx("button", {
                                type: "button",
                                onClick: () => onToggleCollapse?.(),
                                "aria-label": collapsed ? "Expand plan" : "Collapse plan",
                                className: "flex h-9 w-9 items-center justify-center rounded-[10px] text-tp-slate-500 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-700",
                                children: _jsx(ChevronDown, {
                                    size: 18,
                                    strokeWidth: 2,
                                    className: `transition-transform duration-200 ${collapsed ? "-rotate-90" : ""}`,
                                }),
                            }),
                        ],
                    }),
                ],
            }),
            !collapsed && _jsx("div", {
                className: `flex min-h-0 min-w-0 flex-1 flex-col space-y-[8px] overflow-y-auto overflow-x-hidden overscroll-y-contain rounded-b-[16px] p-[12px] ${dui.planClusterInnerSurface}`,
                children: services.map((svc, idx) => _jsx(ServiceSubCard, {
                    service: svc,
                    plan: plan,
                    index: idx,
                    isOpen: openServiceIndex === idx,
                    onToggle: () => setOpenServiceIndex((current) => current === idx ? -1 : idx),
                }, svc.id)),
            }),
            _jsx(TPConfirmDialog, {
                open: markAllOpen,
                onOpenChange: setMarkAllOpen,
                title: "Mark All Services as Completed",
                warning: `This marks all ${services.length} service${services.length === 1 ? "" : "s"} in ${plan.name} as completed and moves this plan to Completed Plans.`,
                secondaryLabel: "Cancel",
                primaryLabel: "Mark All Done",
                primaryTone: "success",
                onPrimary: () => {
                    dispatch({ type: "MARK_PLAN_COMPLETED", planId: plan.id });
                    setMarkAllOpen(false);
                },
            }),
            _jsx(TPConfirmDialog, {
                open: revertAllOpen,
                onOpenChange: setRevertAllOpen,
                title: "Revert Plan to Estimates",
                warning: `Reverts ${plan.name} back to estimates. Appointments, consultations, recorded visits and procedures on this plan will be cleared.`,
                secondaryLabel: "Cancel",
                primaryLabel: "Revert to Estimates",
                primaryTone: "warning",
                onPrimary: () => {
                    dispatch({ type: "REVERT_PLAN_TO_ESTIMATES", planId: plan.id });
                    setRevertAllOpen(false);
                },
            }),
            _jsx(TPConfirmDialog, {
                open: deletePlanOpen,
                onOpenChange: setDeletePlanOpen,
                title: "Delete Plan",
                warning: `This will permanently delete "${plan.name}" and all its ${services.length} service${services.length === 1 ? "" : "s"}, appointments, and visit records. This action cannot be undone.`,
                secondaryLabel: "Cancel",
                primaryLabel: "Delete Plan",
                primaryTone: "destructive",
                onPrimary: () => {
                    dispatch({ type: "DELETE_PLAN", planId: plan.id });
                    setDeletePlanOpen(false);
                },
            }),
        ],
    });
}

// ─── Tab Content ────────────────────────────────────────────
export function InProgressTab() {
    const { inProgressPlans } = usePlanContext();
    // Track collapsed state per plan. Default: all expanded. Users can collapse
    // individual plans when several are active to keep the page navigable.
    const [collapsedPlanIds, setCollapsedPlanIds] = useState(() => new Set());
    const toggleCollapse = useCallback((planId) => {
        setCollapsedPlanIds((prev) => {
            const next = new Set(prev);
            if (next.has(planId)) next.delete(planId); else next.add(planId);
            return next;
        });
    }, []);
    if (inProgressPlans.length === 0) {
        return _jsx(SectionFrame, {
            children: _jsxs("div", {
                className: `flex h-full min-h-0 flex-col overflow-hidden ${dui.planClusterShell}`,
                children: [
                    _jsx("div", {
                        className: `flex items-center justify-between px-[16px] py-[14px] ${dui.planClusterHeaderActive}`,
                        children: _jsxs("div", {
                            className: "flex items-center gap-[12px]",
                            children: [
                                _jsx("div", {
                                    className: "flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-gradient-to-b from-tp-warning-100/80 to-tp-warning-50/90",
                                    children: _jsx(Timer1, { size: 24, variant: "Bulk", className: "text-tp-warning-700" }),
                                }),
                                _jsx("h3", { className: "font-['Inter',sans-serif] text-[16px] font-semibold text-tp-slate-900", children: "Active Plans" }),
                            ],
                        }),
                    }),
                    _jsx("div", {
                        className: `flex flex-1 flex-col rounded-b-[16px] p-[12px] ${dui.planClusterInnerSurface}`,
                        children: _jsx(EmptyState, {
                            icon: _jsx(PlanEmptyIcon, { size: 120 }),
                            title: "No active plans yet",
                            description: "Activate a plan from Plan Estimates to see services here.",
                        }),
                    }),
                ],
            }),
        });
    }
    return _jsx(SectionFrame, {
        children: _jsx("div", {
            className: "h-full min-h-0 overflow-y-auto",
            children: _jsx("div", {
                className: "flex flex-col gap-[14px]",
                children: inProgressPlans.map((plan) => _jsx(PlanClusterCard, {
                    plan,
                    collapsed: collapsedPlanIds.has(plan.id),
                    onToggleCollapse: () => toggleCollapse(plan.id),
                }, plan.id)),
            }),
        }),
    });
}
