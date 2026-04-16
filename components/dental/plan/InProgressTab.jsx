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
import { useEffect, useState } from "react";
import {
    TickCircle, ArrowRotateLeft, Printer, Receipt1, Add, Timer1,
    Edit2, Trash, Calendar2, DocumentDownload, DocumentText,
} from "iconsax-reactjs";
import { Ban, ChevronDown, MoreVertical, X } from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlanContext } from "./plan-context";
import {
    SectionFrame, EmptyState, formatINR, computePlanTotal, getServiceWorkflowStatus,
    buildConsultationRxUrl,
} from "./plan-shared";
import { TPSplitButton } from "@/components/tp-ui/button-system";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer";
import { RxPreviewDocument } from "@/components/tp-rxpad/RxPreviewDocument";
import { getComposedRxPreviewSnapshot } from "@/components/tp-rxpad/rx-preview-composer";
import dui from "../dental-ui.module.scss";

const dropdownContentClass = "w-[220px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1";
const dropdownItemClass = "rounded-[8px] focus:bg-tp-slate-100 focus:text-tp-slate-700 data-[highlighted]:bg-tp-slate-100 data-[highlighted]:text-tp-slate-700";
/** View Rx — light blue stroke, blue text, white fill. */
const VIEW_RX_SECONDARY_CLASS = "inline-flex h-[30px] shrink-0 items-center justify-center rounded-[8px] border border-tp-blue-200 bg-white px-[10px] font-['Inter',sans-serif] text-[11px] font-semibold text-tp-blue-600 shadow-sm transition-colors hover:border-tp-blue-300 hover:bg-tp-blue-50/40";
/** Appointment row icon actions — white surface, slate border. */
const APPT_ACTION_ICON_CLASS = "inline-flex h-[32px] w-[32px] items-center justify-center rounded-[10px] border border-tp-slate-200 bg-white text-tp-slate-600 transition-colors hover:border-tp-slate-300 hover:bg-tp-slate-50";
/** Timeline row ⋮ — no border, matches soft header controls. */
const TIMELINE_MENU_TRIGGER_CLASS = "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-tp-slate-500 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-700";
/** Capture / book in service header — filled slate, 10px radius (not circular). */
const SERVICE_HEADER_ACTION_CLASS = "inline-flex shrink-0 items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-600 transition-colors hover:bg-tp-slate-200/90";
const PREVIEW_RX_ICON_BTN_CLASS = "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-600 transition-colors hover:bg-tp-slate-200";

const APPT_MONTH_LONG = {
    Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June",
    Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December",
};
/** e.g. "14 Apr 2026" → "14 April 2026" */
function formatAppointmentDateLong(dateStr) {
    const s = String(dateStr ?? "").trim();
    const m = /^(\d{1,2})\s+(\w+)\s+(\d{4})$/.exec(s);
    if (!m)
        return s;
    const mon = APPT_MONTH_LONG[m[2]] ?? m[2];
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
            className: "inline-flex items-center rounded-[6px] bg-tp-error-50 px-[8px] py-[3px] font-['Inter',sans-serif] text-[10px] font-bold uppercase tracking-wide text-tp-error-700",
            children: "VISIT CANCELLED",
        });
    }
    if (kind === "completed") {
        return _jsx("span", {
            className: "inline-flex items-center rounded-[6px] bg-tp-success-50 px-[8px] py-[3px] font-['Inter',sans-serif] text-[10px] font-bold uppercase tracking-wide text-tp-success-700",
            children: "VISIT COMPLETED",
        });
    }
    return _jsx("span", {
        className: "inline-flex items-center rounded-[6px] bg-tp-warning-50 px-[8px] py-[3px] font-['Inter',sans-serif] text-[10px] font-bold uppercase tracking-wide text-tp-warning-700",
        children: "UPCOMING VISIT",
    });
}
/** Date and time read as one unit; optional note after a divider (no bracket around the note). */
function formatAppointmentWhenNote(appt, dateLong, isCancelled) {
    const timeRaw = String(appt.time ?? "").trim() || "—";
    const timeParen = timeRaw === "—" ? "—" : `(${timeRaw})`;
    const note = String(appt.notes ?? "").trim();
    const dateTimeCls = isCancelled ? "text-tp-slate-400 line-through" : "text-tp-slate-700/90";
    const noteCls = isCancelled ? "text-tp-slate-400 line-through" : "text-tp-slate-500/80";
    return _jsxs("div", {
        className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 font-['Inter',sans-serif] text-[12px] leading-[1.5]",
        children: [
            _jsxs("span", { className: `shrink-0 ${dateTimeCls}`, children: [dateLong, " ", timeParen] }),
            note
                ? _jsxs(_Fragment, {
                    children: [
                        _jsx("span", { className: "text-tp-slate-300 sm:hidden", "aria-hidden": true, children: "·" }),
                        _jsx("span", {
                            className: `hidden h-3 w-px shrink-0 bg-tp-slate-200 sm:block ${isCancelled ? "opacity-50" : ""}`,
                            "aria-hidden": true,
                        }),
                        _jsx("span", { className: `min-w-0 flex-1 basis-[120px] sm:flex-none ${noteCls}`, children: note }),
                    ],
                })
                : null,
        ],
    });
}
const ENDED_AT_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function formatEndedAtTimelineParts(endedAt) {
    const n = Date.parse(String(endedAt ?? ""));
    if (!Number.isFinite(n))
        return { dateLong: String(endedAt ?? "").trim() || "—", timePart: null };
    const d = new Date(n);
    const dateLong = `${d.getDate()} ${ENDED_AT_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    const timePart = d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
    return { dateLong, timePart };
}
/** Direct / chairside row: "14 April 2026, 11:15 am | Direct visit | Note: …" */
function formatDirectVisitTimelineMeta(consultation) {
    const { dateLong, timePart } = formatEndedAtTimelineParts(consultation.endedAt);
    const head = timePart ? `${dateLong}, ${timePart}` : dateLong;
    const noteLine = String(consultation.summaryText ?? "").trim().split(/\n/).map((l) => l.trim()).filter(Boolean)[0] ?? "";
    const segments = [head, "Direct visit"];
    if (noteLine)
        segments.push(`Note: ${noteLine.length > 120 ? `${noteLine.slice(0, 120)}…` : noteLine}`);
    return _jsx("p", {
        className: "min-w-0 font-['Inter',sans-serif] text-[12px] font-normal leading-[1.5] text-tp-slate-500/90",
        children: segments.join(" | "),
    });
}
function formatQuickVisitTimelineMeta(sitting) {
    const visitWhen = String(sitting.date ?? "").trim() || "—";
    const visitType = String(sitting.visitType ?? "").trim() || "Quick record";
    const segments = [visitWhen, visitType];
    return _jsx("p", {
        className: "min-w-0 font-['Inter',sans-serif] text-[12px] font-normal leading-[1.5] text-tp-slate-500/90",
        children: segments.join(" | "),
    });
}
/** Figma-style meta: "14 April 2026, 11:15 AM | Follow-up | Note: …" */
function formatTimelineVisitMeta(appt, dateLong, isCancelled) {
    const timeRaw = String(appt.time ?? "").trim() || "—";
    const timePart = timeRaw === "—" ? null : timeRaw.replace(/^\(|\)$/g, "");
    const head = timePart ? `${dateLong}, ${timePart}` : dateLong;
    const caseLabel = appt.caseType ? CASE_TYPE_LABELS[appt.caseType] : null;
    const note = String(appt.notes ?? "").trim();
    const segments = [head];
    if (caseLabel)
        segments.push(caseLabel);
    if (note)
        segments.push(`Note: ${note}`);
    const line = segments.join(" | ");
    const cls = isCancelled ? "text-tp-slate-400 line-through" : "text-tp-slate-500/90";
    return _jsx("p", {
        className: `min-w-0 font-['Inter',sans-serif] text-[12px] font-normal leading-[1.5] ${cls}`,
        children: line,
    });
}

function renderStatusChip(status, size = "sm") {
    const cls = status === "completed"
        ? "bg-tp-success-50 text-tp-success-700"
        : status === "in-progress"
            ? "bg-tp-warning-50 text-tp-warning-700"
            : status === "no-show"
                ? "bg-tp-violet-50 text-tp-violet-700"
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
        className: `inline-flex items-center rounded-[6px] px-[8px] py-[2px] font-['Inter',sans-serif] font-semibold ${size === "md" ? "text-[12px]" : "text-[11px]"} ${cls}`,
        children: label,
    });
}

function getStatusSelectClasses(status) {
    if (status === "completed") return "bg-tp-success-50 text-tp-success-700";
    if (status === "in-progress") return "bg-tp-warning-50 text-tp-warning-700";
    if (status === "no-show") return "bg-tp-violet-50 text-tp-violet-700";
    if (status === "not-interested") return "bg-tp-error-50 text-tp-error-700";
    if (status === "cancelled") return "bg-tp-error-50 text-tp-error-700";
    return "bg-tp-slate-100 text-tp-slate-600";
}

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

function buildServiceDescription(service) {
    const toothLabel = service.toothFdi === "full-mouth" ? "the full mouth" : service.toothLabel;
    if (service.surfaces.length === 0) {
        return `Planned for ${toothLabel}.`;
    }
    const surfaceText = service.surfaces.map((surface) => formatSurfaceLabel(surface)).join(", ");
    return `Planned for ${toothLabel} on ${surfaceText} surface${service.surfaces.length > 1 ? "s" : ""}.`;
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
    const pad = inSurface ? "pl-0" : "pl-[4px]";
    const rows = segmentConsultSummaryLines(raw);
    if (inSurface) {
        if (!rows.length) {
            const prose = buildProseConsultSummary(raw);
            return prose
                ? _jsx("p", {
                    className: `block w-full min-w-0 max-w-full break-words ${pad} font-['Inter',sans-serif] text-[13px] leading-[1.65] text-tp-slate-600`,
                    children: prose,
                })
                : _jsx("p", { className: `block w-full min-w-0 max-w-full ${pad} font-['Inter',sans-serif] text-[13px] text-tp-slate-500 italic`, children: "No summary text." });
        }
        const compactRows = rows.filter((r) => r.badge === "Tooth" || r.badge === "Proc").slice(0, 3);
        const visibleRows = compactRows.length ? compactRows : rows.filter((r) => !["Sx", "Ex", "Dx", "Lab", "Rx", "Adv"].includes(r.badge ?? "")).slice(0, 3);
        const inlineText = visibleRows.map((r) => formatInlineSnippetPart(r)).filter(Boolean).join(" | ");
        return inlineText
            ? _jsx("p", {
                className: `block w-full min-w-0 max-w-full break-words ${pad} font-['Inter',sans-serif] text-[13px] leading-[1.65] text-tp-slate-600`,
                children: inlineText,
            })
            : _jsx("p", { className: `block w-full min-w-0 max-w-full ${pad} font-['Inter',sans-serif] text-[13px] text-tp-slate-500 italic`, children: "No summary text." });
    }
    if (!rows.length) {
        const t = raw?.trim();
        return t
            ? _jsx("p", { className: `block w-full min-w-0 max-w-full break-words ${pad} font-['Inter',sans-serif] text-[13px] leading-[1.65] text-tp-slate-700`, children: t })
            : _jsx("p", { className: `block w-full min-w-0 max-w-full ${pad} font-['Inter',sans-serif] text-[13px] text-tp-slate-500 italic`, children: "No summary text." });
    }
    return _jsx("p", {
        className: `block w-full min-w-0 max-w-full break-words ${pad} font-['Inter',sans-serif] text-[13px] leading-[1.65] text-tp-slate-600`,
        children: rows.map((r, i) => _jsxs(_Fragment, {
            children: [
                i > 0 && _jsx("span", { className: "text-tp-slate-200", children: " · " }),
                r.badge && _jsxs("span", { className: "font-medium text-tp-slate-400", children: [r.badge, ": "] }),
                _jsx("span", { className: "text-tp-slate-600", children: r.text }),
            ],
        }, i)),
    });
}
function downloadSnapshotTxt(snapshot) {
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
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "digital-rx.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
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
                className: variant === "snippet" ? `mt-[8px] self-start ${VIEW_RX_SECONDARY_CLASS}` : `mt-[10px] ${VIEW_RX_SECONDARY_CLASS}`,
                children: "View Rx",
            }),
        ],
    });
    return _jsxs(_Fragment, {
        children: [
            variant === "snippet"
                ? _jsxs("div", {
                    className: [
                        "mt-[6px] w-full min-w-0 max-w-full overflow-hidden rounded-[10px]",
                        "border border-tp-slate-100/90 border-l-[3px] border-l-tp-blue-400/45",
                        "bg-gradient-to-br from-tp-slate-50 via-tp-slate-50/98 to-tp-blue-50/25",
                        "px-[12px] py-[10px] shadow-[0_1px_3px_rgba(15,23,42,0.05)]",
                    ].join(" "),
                    children: [
                        _jsx("p", {
                            className: "mb-[6px] font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-600",
                            children: "Consultation summary",
                        }),
                        _jsx("div", { className: "flex w-full min-w-0 max-w-full flex-col items-stretch", children: snippet }),
                    ],
                })
                : _jsxs("div", {
                    className: "mt-[10px] w-full max-w-none rounded-[12px] border border-tp-slate-200/70 bg-white p-[12px]",
                    children: [
                        _jsxs("div", {
                            className: "flex flex-wrap items-center justify-between gap-2 border-b border-tp-slate-100 pb-[8px]",
                            children: [
                                _jsx("p", { className: "font-['Inter',sans-serif] text-[11px] font-semibold uppercase tracking-[0.06em] text-tp-slate-500/85", children: "Rx summary" }),
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
                    className: "!flex !max-w-[min(100vw,720px)] flex-col !rounded-none !p-0",
                    children: [
                        _jsxs("div", {
                            className: "flex shrink-0 items-center gap-0 border-b border-tp-slate-200 bg-white px-3 py-3",
                            children: [
                                _jsxs(Tooltip, { delayDuration: 200, children: [
                                    _jsx(TooltipTrigger, {
                                        asChild: true,
                                        children: _jsx("button", {
                                            type: "button",
                                            onClick: () => setPreviewOpen(false),
                                            className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-tp-slate-600 transition-colors hover:bg-tp-slate-100",
                                            "aria-label": "Close preview",
                                            children: _jsx(X, { size: 20, strokeWidth: 2 }),
                                        }),
                                    }),
                                    _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Close" }),
                                ] }),
                                _jsx("div", { className: "mx-3 h-6 w-px shrink-0 bg-tp-slate-200", "aria-hidden": true }),
                                _jsxs("div", {
                                    className: "flex min-w-0 flex-1 items-center gap-2",
                                    children: [
                                        _jsx(DocumentText, { size: 20, variant: "Linear", className: "shrink-0 text-tp-slate-600" }),
                                        _jsx("h2", {
                                            className: "truncate font-['Inter',sans-serif] text-[16px] font-semibold text-tp-slate-900",
                                            children: "Preview Rx",
                                        }),
                                    ],
                                }),
                                _jsxs("div", {
                                    className: "flex shrink-0 items-center gap-1.5",
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
                                                    "aria-label": "Edit in RxPad",
                                                    children: _jsx(Edit2, { size: 18, variant: "Linear" }),
                                                }),
                                            }),
                                            _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Edit in RxPad" }),
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

/** Capture visit: record visit notes (drawer) + Rx capture shortcuts. */
function SittingCaptureDropdown({ service, serviceRxHref, openDrawer, triggerLabel, triggerVariant = "default", }) {
    const isIcon = triggerVariant === "icon";
    const isHeader = triggerVariant === "header";
    return _jsxs(DropdownMenu, {
        children: [
            _jsx(DropdownMenuTrigger, {
                asChild: true,
                children: isHeader
                    ? _jsxs("button", {
                        type: "button",
                        className: `${SERVICE_HEADER_ACTION_CLASS} h-8 min-w-[40px] gap-0 px-[9px]`,
                        "aria-label": triggerLabel ?? "Capture visit",
                        children: [
                            _jsx(Add, { size: 17, variant: "Linear", className: "text-tp-slate-700" }),
                            _jsx(ChevronDown, { size: 10, strokeWidth: 2.5, className: "-ml-0.5 text-tp-slate-500 opacity-80" }),
                        ],
                    })
                    : isIcon
                        ? _jsxs("button", {
                            type: "button",
                            className: "inline-flex h-[32px] min-w-[44px] shrink-0 items-center justify-center gap-0.5 rounded-[10px] border border-tp-slate-200 bg-white px-1.5 text-tp-slate-600 transition-colors hover:border-tp-slate-300 hover:bg-tp-slate-50",
                            "aria-label": triggerLabel ?? "Capture visit",
                            children: [
                                _jsx(Add, { size: 18, variant: "Linear", className: "text-tp-slate-700" }),
                                _jsx(ChevronDown, { size: 12, strokeWidth: 2.5, className: "text-tp-slate-500 opacity-70" }),
                            ],
                        })
                        : _jsxs("button", {
                            type: "button",
                            className: "inline-flex h-[34px] items-center gap-1 rounded-[10px] border border-tp-slate-200 bg-white px-[12px] font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-700 shadow-sm transition-colors hover:border-tp-slate-300 hover:bg-tp-slate-50",
                            children: [
                                triggerLabel,
                                _jsx(ChevronDown, { size: 14, strokeWidth: 2.5, className: "opacity-60" }),
                            ],
                        }),
            }),
            _jsxs(DropdownMenuContent, {
                align: "end",
                className: dropdownContentClass,
                children: [
                    _jsx(DropdownMenuItem, {
                        className: dropdownItemClass,
                        onClick: () => openDrawer({ type: "add-sitting", serviceId: service.id }),
                        children: "Quick visit record form",
                    }),
                    _jsx(DropdownMenuSeparator, {}),
                    _jsx(DropdownMenuItem, {
                        className: dropdownItemClass,
                        onClick: () => window.location.assign(serviceRxHref),
                        children: "TypeRx",
                    }),
                    _jsx(DropdownMenuItem, {
                        className: dropdownItemClass,
                        onClick: () => window.location.assign(serviceRxHref),
                        children: "VoiceRx",
                    }),
                    _jsx(DropdownMenuItem, {
                        className: dropdownItemClass,
                        onClick: () => window.location.assign(serviceRxHref),
                        children: "TabRx",
                    }),
                    _jsx(DropdownMenuItem, {
                        className: dropdownItemClass,
                        onClick: () => window.location.assign(serviceRxHref),
                        children: "SnapRx",
                    }),
                    _jsx(DropdownMenuItem, {
                        className: dropdownItemClass,
                        onClick: () => window.location.assign(serviceRxHref),
                        children: "SmartSync",
                    }),
                ],
            }),
        ],
    });
}

// ─── Service Sub-Card ──────────────────────────────────────
function ServiceSubCard({ service, plan, index, isOpen, onToggle }) {
    const { dispatch, openDrawer, patientId, embedInPatientShell } = usePlanContext();
    const [consultPreviewId, setConsultPreviewId] = useState(null);
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
    const serviceDescription = buildServiceDescription(service);
    const planLineMeta = [
        service.procedureDate ? `Surgery date: ${service.procedureDate}` : null,
        service.notes,
    ].filter(Boolean).join(" \u00B7 ");
    const workflowStatus = getServiceWorkflowStatus(service);
    const statusSelectClasses = getStatusSelectClasses(workflowStatus);
    // Persisted-store status that we use as the dropdown value. If the
    // service has never been explicitly set, fall back to the derived
    // workflow status so the dropdown reflects reality.
    const dropdownValue = service.status === "planned" ? workflowStatus : service.status;
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
        className: "flex min-h-0 min-w-0 w-full flex-col overflow-hidden rounded-[16px] border border-tp-slate-200/60 bg-white",
        children: [
            _jsxs("div", {
                className: "flex shrink-0 cursor-pointer items-center gap-[12px] border-b border-tp-slate-200/70 bg-tp-warning-50/35 px-[18px] py-[13px]",
                onClick: () => onToggle?.(),
                children: [
                    _jsx("div", {
                        className: "flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-tp-warning-100 shrink-0",
                        children: _jsx("span", {
                            className: "font-['Inter',sans-serif] text-[16px] font-bold text-tp-warning-700",
                            children: index + 1,
                        }),
                    }),
                    _jsxs("div", {
                        className: "grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1",
                        children: [
                            _jsxs("div", {
                                className: "col-span-2 flex min-w-0 flex-wrap items-center gap-[8px]",
                                children: [
                                    _jsx("p", {
                                        className: "font-['Inter',sans-serif] text-[16px] font-bold text-tp-slate-900",
                                        children: service.treatment,
                                    }),
                                    _jsxs("span", {
                                        className: "font-['Inter',sans-serif] text-[14px] font-medium text-tp-slate-500",
                                        children: ["(", toothText, ")"],
                                    }),
                                ],
                            }),
                            _jsxs("div", {
                                className: "flex min-w-0 flex-wrap items-center gap-[8px]",
                                children: [
                                    _jsx("span", {
                                        className: "inline-flex h-[24px] items-center rounded-[6px] bg-tp-slate-100 px-[8px] font-['Inter',sans-serif] text-[12px] font-medium leading-none text-tp-slate-500",
                                        children: formatINR(service.amount),
                                    }),
                                    _jsx("select", {
                                        value: dropdownValue,
                                        onClick: (e) => e.stopPropagation(),
                                        onChange: (e) => handleServiceStatusChange(e.target.value),
                                        className: `h-[24px] max-w-full rounded-[6px] border-0 px-0 font-['Inter',sans-serif] text-[11px] font-semibold leading-none focus:outline-none focus:ring-1 focus:ring-tp-blue-500/30 ${statusSelectClasses}`,
                                        children: STATUS_OPTIONS.map((opt) => _jsx("option", { value: opt.value, children: opt.label }, opt.value)),
                                    }),
                                ],
                            }),
                            _jsxs("div", {
                                className: "flex shrink-0 items-center gap-1",
                                children: [
                                    isOpen && _jsx("div", {
                                        onClick: (e) => e.stopPropagation(),
                                        className: "flex items-center gap-[6px]",
                                        children: [
                                            _jsx(SittingCaptureDropdown, {
                                                service: service,
                                                serviceRxHref: serviceRxHref,
                                                openDrawer: openDrawer,
                                                triggerLabel: "Capture visit",
                                                triggerVariant: "header",
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
                                                                openDrawer({ type: "book-appointment", planId: plan.id, serviceId: service.id });
                                                            },
                                                            className: `${SERVICE_HEADER_ACTION_CLASS} h-8 w-8`,
                                                            "aria-label": "Book appointment",
                                                            children: _jsx(Calendar2, { size: 17, variant: "Linear" }),
                                                        }),
                                                    }),
                                                    _jsx(TooltipContent, { side: "bottom", sideOffset: 6, children: "Book appointment" }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsxs(DropdownMenu, {
                                        children: [
                                            _jsx(DropdownMenuTrigger, {
                                                asChild: true,
                                                children: _jsx("button", {
                                                    type: "button",
                                                    onClick: (e) => e.stopPropagation(),
                                                    className: "flex h-[28px] w-[28px] items-center justify-center rounded-[6px] hover:bg-tp-slate-100 transition-colors",
                                                    children: _jsx(MoreVertical, { size: 20, color: "var(--tp-slate-500)", strokeWidth: 2 }),
                                                }),
                                            }),
                                            _jsxs(DropdownMenuContent, {
                                                align: "end",
                                                className: dropdownContentClass,
                                                children: [
                                                    _jsxs(DropdownMenuItem, {
                                                        onClick: () => openDrawer({ type: "bill-preview", planId: plan.id, serviceId: service.id }),
                                                        className: dropdownItemClass,
                                                        children: [_jsx(Receipt1, { size: 16, variant: "Linear", className: "mr-2" }), "View Bill Preview"],
                                                    }),
                                                    _jsxs(DropdownMenuItem, {
                                                        onClick: () => window.print(),
                                                        className: dropdownItemClass,
                                                        children: [_jsx(Printer, { size: 16, variant: "Linear", className: "mr-2" }), "Print Service Details"],
                                                    }),
                                                    _jsx(DropdownMenuSeparator, {}),
                                                    _jsxs(DropdownMenuItem, {
                                                        onClick: () => setMarkDoneOpen(true),
                                                        className: "rounded-[8px] focus:bg-tp-success-50 data-[highlighted]:bg-tp-success-50",
                                                        children: [
                                                            _jsx(TickCircle, { size: 16, variant: "Linear", className: "mr-2 text-tp-success-600" }),
                                                            _jsx("span", { className: "text-tp-success-600 font-semibold", children: "Mark as Done" }),
                                                        ],
                                                    }),
                                                    _jsxs(DropdownMenuItem, {
                                                        onClick: () => setDeleteOpen(true),
                                                        className: "rounded-[8px] focus:bg-red-50 data-[highlighted]:bg-red-50",
                                                        children: [
                                                            _jsx(Trash, { size: 16, variant: "Linear", className: "mr-2 text-tp-error-600" }),
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
                                        className: "flex h-[28px] w-[28px] items-center justify-center rounded-[6px] hover:bg-tp-slate-100 transition-colors",
                                        children: _jsx("span", {
                                            className: `inline-flex transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
                                            children: _jsx(ChevronDown, { size: 18, color: "var(--tp-slate-700)", strokeWidth: 2.5 }),
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            isOpen && _jsx("div", {
                className: "min-h-0 min-w-0 overflow-y-auto overflow-x-hidden overscroll-y-contain bg-white px-[14px] py-[12px] [max-height:min(72vh,680px)]",
                children: _jsxs("div", {
                    className: "pb-[4px]",
                    children: [
                        _jsxs("div", {
                            className: "flex flex-wrap items-start gap-2 px-[2px] pb-[14px]",
                            children: [
                                _jsx("span", {
                                    className: "inline-flex max-w-full rounded-[8px] bg-tp-slate-100 px-[10px] py-[6px] font-['Inter',sans-serif] text-[13px] font-medium leading-[1.5] text-tp-slate-700",
                                    children: serviceDescription,
                                }),
                                planLineMeta && _jsx("span", {
                                    className: "inline-flex max-w-full rounded-[8px] bg-tp-slate-50 px-[10px] py-[6px] font-['Inter',sans-serif] text-[12px] leading-[1.5] text-tp-slate-500",
                                    children: planLineMeta,
                                }),
                            ],
                        }),
                        _jsx("div", {
                            className: "min-w-0",
                            children: timelineEntries.length > 0
                                ? _jsx("div", {
                                    className: "min-w-0 space-y-[20px]",
                                    children: timelineEntries.map((entry, idx) => {
                                                    const isLast = idx === timelineEntries.length - 1;
                                                    if (entry.kind === "appointment") {
                                                        const appt = entry.appt;
                                                        const isCancelled = appt.status === "cancelled";
                                                        const linkedConsultations = entry.linkedConsultations;
                                                        const hasVisitNotes = linkedConsultations.length > 0;
                                                        const primaryConsult = linkedConsultations[0];
                                                        const apptRxHref = buildConsultationRxUrl(patientId, plan.id, service.id, appt.id, embedInPatientShell, service.treatment);
                                                        const dateLong = formatAppointmentDateLong(appt.date);
                                                        const badgeKind = isCancelled ? "cancelled" : hasVisitNotes ? "completed" : "upcoming";
                                                        return _jsxs("div", {
                                                            className: "relative w-full min-w-0 pl-[18px]",
                                                            children: [
                                                                !isLast && _jsx("span", { className: "absolute left-[5px] top-[20px] h-[calc(100%-4px)] border-l border-tp-blue-200/85" }),
                                                                _jsx("span", {
                                                                    className: `absolute left-0 top-[5px] h-[10px] w-[10px] rounded-full ring-2 ring-white ${isCancelled ? "bg-tp-error-400" : "bg-tp-blue-500"}`,
                                                                }),
                                                                _jsxs("div", {
                                                                    className: "flex min-w-0 flex-col gap-1.5",
                                                                    children: [
                                                                        _jsxs("div", {
                                                                            className: "flex min-w-0 flex-wrap items-start justify-between gap-x-3 gap-y-2",
                                                                            children: [
                                                                                _jsxs("div", {
                                                                                    className: "min-w-0 max-w-full flex-1 space-y-1.5",
                                                                                    children: [
                                                                                        _jsxs("div", {
                                                                                            className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
                                                                                            children: [
                                                                                                _jsx("p", {
                                                                                                    className: `font-['Inter',sans-serif] text-[13px] font-bold leading-snug text-tp-slate-900 ${isCancelled ? "text-tp-slate-400 line-through" : ""}`,
                                                                                                    children: appt.doctor,
                                                                                                }),
                                                                                                visitBadge(badgeKind),
                                                                                            ],
                                                                                        }),
                                                                                        formatTimelineVisitMeta(appt, dateLong, isCancelled),
                                                                                    ],
                                                                                }),
                                                                                _jsxs("div", {
                                                                                    className: "flex shrink-0 flex-wrap items-center justify-end gap-1.5",
                                                                                    children: [
                                                                                        hasVisitNotes && primaryConsult && _jsx("button", {
                                                                                            type: "button",
                                                                                            onClick: () => setConsultPreviewId(primaryConsult.id),
                                                                                            className: VIEW_RX_SECONDARY_CLASS,
                                                                                            children: "View Rx",
                                                                                        }),
                                                                                        !hasVisitNotes && !isCancelled && _jsx(TPSplitButton, {
                                                                                            size: "sm",
                                                                                            variant: "outline",
                                                                                            theme: "primary",
                                                                                            className: "shadow-none",
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
                                                                                                        hasVisitNotes && primaryConsult && _jsxs(DropdownMenuItem, {
                                                                                                            className: dropdownItemClass,
                                                                                                            onClick: () => window.location.assign(apptRxHref),
                                                                                                            children: [_jsx(Edit2, { size: 16, variant: "Linear", className: "mr-2" }), "Edit in RxPad"],
                                                                                                        }),
                                                                                                        !isCancelled && !hasVisitNotes && _jsxs(_Fragment, {
                                                                                                            children: [
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => openDrawer({ type: "book-appointment", planId: plan.id, serviceId: service.id, appointmentId: appt.id }),
                                                                                                                    children: [_jsx(Edit2, { size: 16, variant: "Linear", className: "mr-2" }), "Edit appointment"],
                                                                                                                }),
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => openCancelDialog(appt),
                                                                                                                    children: [_jsx(Ban, { size: 16, variant: "Linear", className: "mr-2 text-tp-error-600" }), _jsx("span", { className: "text-tp-error-600", children: "Cancel appointment" })],
                                                                                                                }),
                                                                                                                _jsxs(DropdownMenuItem, {
                                                                                                                    className: dropdownItemClass,
                                                                                                                    onClick: () => dispatch({ type: "REMOVE_APPOINTMENT", serviceId: service.id, appointmentId: appt.id }),
                                                                                                                    children: [_jsx(Trash, { size: 16, variant: "Linear", className: "mr-2" }), "Remove from timeline"],
                                                                                                                }),
                                                                                                            ],
                                                                                                        }),
                                                                                                        isCancelled && !hasVisitNotes && _jsxs(DropdownMenuItem, {
                                                                                                            className: dropdownItemClass,
                                                                                                            onClick: () => dispatch({ type: "REMOVE_APPOINTMENT", serviceId: service.id, appointmentId: appt.id }),
                                                                                                            children: [_jsx(Trash, { size: 16, variant: "Linear", className: "mr-2" }), "Remove from timeline"],
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
                                                                            className: "font-['Inter',sans-serif] text-[11px] leading-[1.65] text-tp-error-600",
                                                                            children: [_jsx("span", { className: "font-semibold", children: "Reason: " }), appt.cancellationReason],
                                                                        }),
                                                                        linkedConsultations.map((c) => _jsx(ConsultationPreviewCard, {
                                                                            c: c,
                                                                            appointmentItems: appointmentItems,
                                                                            patientId: patientId,
                                                                            plan: plan,
                                                                            service: service,
                                                                            embedInPatientShell: embedInPatientShell,
                                                                            underAppointment: true,
                                                                            variant: "snippet",
                                                                            previewOpen: consultPreviewId === c.id,
                                                                            onPreviewOpenChange: (o) => setConsultPreviewId(o ? c.id : null),
                                                                            hideViewRxButton: true,
                                                                        }, c.id)),
                                                                    ],
                                                                }),
                                                            ],
                                                        }, appt.id);
                                                    }
                                                    if (entry.kind === "sitting") {
                                                        const sit = entry.sitting;
                                                        return _jsxs("div", {
                                                            className: "relative w-full min-w-0 pl-[18px]",
                                                            children: [
                                                                !isLast && _jsx("span", { className: "absolute left-[5px] top-[20px] h-[calc(100%-4px)] border-l border-tp-blue-200/85" }),
                                                                _jsx("span", { className: "absolute left-0 top-[5px] h-[10px] w-[10px] rounded-full bg-tp-blue-500 ring-2 ring-white" }),
                                                                _jsxs("div", {
                                                                    className: "flex min-w-0 flex-col gap-1.5",
                                                                    children: [
                                                                        _jsxs("div", {
                                                                            className: "flex min-w-0 flex-wrap items-start justify-between gap-x-3 gap-y-2",
                                                                            children: [
                                                                                _jsxs("div", {
                                                                                    className: "min-w-0 max-w-full flex-1 space-y-1.5",
                                                                                    children: [
                                                                                        _jsxs("div", {
                                                                                            className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
                                                                                            children: [
                                                                                                _jsx("p", {
                                                                                                    className: "font-['Inter',sans-serif] text-[13px] font-bold leading-snug text-tp-slate-900",
                                                                                                    children: sit.doctor || "Quick visit",
                                                                                                }),
                                                                                                visitBadge("completed"),
                                                                                            ],
                                                                                        }),
                                                                                        formatQuickVisitTimelineMeta(sit),
                                                                                    ],
                                                                                }),
                                                                                _jsxs("div", {
                                                                                    className: "flex shrink-0 flex-wrap items-center justify-end gap-1.5",
                                                                                    children: [
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
                                                                                                            onClick: () => openDrawer({ type: "edit-sitting", serviceId: service.id, sittingId: sit.id }),
                                                                                                            children: [_jsx(Edit2, { size: 16, variant: "Linear", className: "mr-2" }), "Edit visit"],
                                                                                                        }),
                                                                                                        _jsxs(DropdownMenuItem, {
                                                                                                            className: dropdownItemClass,
                                                                                                            onClick: () => dispatch({ type: "REMOVE_SITTING", serviceId: service.id, sittingId: sit.id }),
                                                                                                            children: [_jsx(Trash, { size: 16, variant: "Linear", className: "mr-2" }), "Remove from timeline"],
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
                                                            ],
                                                        }, sit.id);
                                                    }
                                                    const c = entry.consultation;
                                                    const directRxHref = buildConsultationRxUrl(patientId, plan.id, service.id, c.appointmentId, embedInPatientShell, service.treatment);
                                                    return _jsxs("div", {
                                                        className: "relative w-full min-w-0 pl-[18px]",
                                                        children: [
                                                            !isLast && _jsx("span", { className: "absolute left-[5px] top-[20px] h-[calc(100%-4px)] border-l border-tp-blue-200/85" }),
                                                            _jsx("span", { className: "absolute left-0 top-[5px] h-[10px] w-[10px] rounded-full bg-tp-blue-500 ring-2 ring-white" }),
                                                            _jsxs("div", {
                                                                className: "flex min-w-0 flex-col gap-1.5",
                                                                children: [
                                                                    _jsxs("div", {
                                                                        className: "flex min-w-0 flex-wrap items-start justify-between gap-x-3 gap-y-2",
                                                                        children: [
                                                                            _jsxs("div", {
                                                                                className: "min-w-0 max-w-full flex-1 space-y-1.5",
                                                                                children: [
                                                                                    _jsxs("div", {
                                                                                        className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
                                                                                        children: [
                                                                                            _jsx("p", {
                                                                                                className: "font-['Inter',sans-serif] text-[13px] font-bold leading-snug text-tp-slate-900",
                                                                                                children: "Chairside visit",
                                                                                            }),
                                                                                            visitBadge("completed"),
                                                                                        ],
                                                                                    }),
                                                                                    formatDirectVisitTimelineMeta(c),
                                                                                ],
                                                                            }),
                                                                            _jsxs("div", {
                                                                                className: "flex shrink-0 flex-wrap items-center justify-end gap-1.5",
                                                                                children: [
                                                                                    _jsx("button", {
                                                                                        type: "button",
                                                                                        onClick: () => setConsultPreviewId(c.id),
                                                                                        className: VIEW_RX_SECONDARY_CLASS,
                                                                                        children: "View Rx",
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
                                                                                                        children: [_jsx(Edit2, { size: 16, variant: "Linear", className: "mr-2" }), "Edit in RxPad"],
                                                                                                    }),
                                                                                                ],
                                                                                            }),
                                                                        sit.notes && _jsxs("div", {
                                                                            className: "mt-[6px] w-full min-w-0 max-w-full overflow-hidden rounded-[10px] border border-tp-slate-100/90 border-l-[3px] border-l-tp-blue-400/45 bg-gradient-to-br from-tp-slate-50 via-tp-slate-50/98 to-tp-blue-50/25 px-[12px] py-[10px] shadow-[0_1px_3px_rgba(15,23,42,0.05)]",
                                                                            children: [
                                                                                _jsx("p", {
                                                                                    className: "mb-[6px] font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-600",
                                                                                    children: "Consultation summary",
                                                                                }),
                                                                                _jsx("div", {
                                                                                    className: "flex w-full min-w-0 max-w-full flex-col items-stretch",
                                                                                    children: renderConsultSummarySnippetBody(sit.notes, { inSurface: true }),
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
                                                                        onPreviewOpenChange: (o) => setConsultPreviewId(o ? c.id : null),
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
                                                    _jsx(Timer1, { size: 28, variant: "Bulk", className: "text-tp-slate-300" }),
                                                    _jsx("p", { className: "mt-2 font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-600", children: "No visits recorded yet" }),
                                                    _jsx("p", {
                                                        className: "mt-1.5 max-w-[300px] font-['Inter',sans-serif] text-[12px] leading-[1.65] text-tp-slate-500",
                                                        children: "Use Capture visit or Book appointment in the row above.",
                                                    }),
                                                ],
                                            }),
                        }),
                    ],
                }),
            }),
            // ── Dialogs ────────────────────────────────────
            _jsx(AlertDialog, {
                open: markDoneOpen,
                onOpenChange: setMarkDoneOpen,
                children: _jsxs(AlertDialogContent, {
                    children: [
                        _jsxs(AlertDialogHeader, {
                            children: [
                                _jsx(AlertDialogTitle, { children: "Mark as Completed" }),
                                _jsxs(AlertDialogDescription, {
                                    children: [
                                        "Mark ",
                                        _jsx("strong", { children: service.treatment }),
                                        " (",
                                        service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi}`,
                                        ") as completed?",
                                    ],
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { children: "Cancel" }),
                                _jsx(AlertDialogAction, {
                                    onClick: handleMarkDone,
                                    className: "bg-tp-success-600 text-white hover:bg-tp-success-700",
                                    children: "Mark Done",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            _jsx(AlertDialog, {
                open: deleteOpen,
                onOpenChange: setDeleteOpen,
                children: _jsxs(AlertDialogContent, {
                    children: [
                        _jsxs(AlertDialogHeader, {
                            children: [
                                _jsx(AlertDialogTitle, { children: "Delete Service" }),
                                _jsxs(AlertDialogDescription, {
                                    children: ["Delete ", _jsx("strong", { children: service.treatment }), " from this plan?"],
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { children: "Cancel" }),
                                _jsx(AlertDialogAction, {
                                    onClick: () => {
                                        dispatch({ type: "REMOVE_SERVICE", serviceId: service.id });
                                        setDeleteOpen(false);
                                    },
                                    className: "bg-tp-error-600 text-white hover:bg-tp-error-700",
                                    children: "Delete",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            _jsx(AlertDialog, {
                open: !!cancelTarget,
                onOpenChange: (open) => { if (!open) closeCancelDialog(); },
                children: _jsxs(AlertDialogContent, {
                    children: [
                        _jsxs(AlertDialogHeader, {
                            children: [
                                _jsx(AlertDialogTitle, { children: "Cancel Appointment" }),
                                _jsxs(AlertDialogDescription, {
                                    children: [
                                        cancelTarget
                                            ? `Cancelling ${cancelTarget.doctor}'s appointment on ${cancelTarget.date} at ${cancelTarget.time}. Please record a reason for the cancellation so it stays visible in the visit history.`
                                            : "",
                                    ],
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            className: "px-[4px] pb-[4px]",
                            children: [
                                _jsx("label", {
                                    className: "block font-['Inter',sans-serif] text-[12px] font-semibold text-tp-slate-600 mb-[6px]",
                                    children: "Reason for cancellation",
                                }),
                                _jsx("textarea", {
                                    value: cancelReason,
                                    onChange: (e) => setCancelReason(e.target.value),
                                    placeholder: "e.g. Patient requested to reschedule due to travel",
                                    rows: 3,
                                    className: "w-full rounded-[10px] border border-tp-slate-200 bg-white px-[14px] py-[10px] font-['Inter',sans-serif] text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:outline-none focus:border-tp-blue-500 focus:ring-2 focus:ring-tp-blue-500/20 transition-colors resize-none",
                                }),
                                _jsxs("div", {
                                    className: "mt-[8px] flex flex-wrap gap-[6px]",
                                    children: ["Patient travel", "Doctor unavailable", "Patient no-show", "Rescheduled"].map((quick) => _jsx("button", {
                                        type: "button",
                                        onClick: () => setCancelReason(quick),
                                        className: "inline-flex h-[26px] items-center rounded-[8px] bg-tp-slate-100 px-[10px] font-['Inter',sans-serif] text-[11px] font-medium text-tp-slate-600 hover:bg-tp-slate-200 transition-colors",
                                        children: quick,
                                    }, quick)),
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { onClick: closeCancelDialog, children: "Keep appointment" }),
                                _jsx(AlertDialogAction, {
                                    onClick: confirmCancelAppointment,
                                    className: "bg-tp-warning-600 text-white hover:bg-tp-warning-700",
                                    children: "Cancel appointment",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        ],
    });
}

// ─── Plan Cluster Card ─────────────────────────────────────
function PlanClusterCard({ plan }) {
    const { dispatch, openDrawer } = usePlanContext();
    const [markAllOpen, setMarkAllOpen] = useState(false);
    const [revertAllOpen, setRevertAllOpen] = useState(false);
    // Accordion — first service open by default, one at a time.
    const [openServiceIndex, setOpenServiceIndex] = useState(0);
    const services = plan.services;
    const total = computePlanTotal(plan.services);
    return _jsxs("div", {
        className: `flex h-full min-h-0 flex-col overflow-hidden ${dui.planClusterShell}`,
        children: [
            _jsxs("div", {
                className: `sticky top-0 z-[3] shrink-0 flex items-center justify-between px-[16px] py-[14px] ${dui.planClusterHeaderActive}`,
                children: [
                    _jsxs("div", {
                        className: "flex items-center gap-[12px]",
                        children: [
                            _jsx("div", {
                                className: "flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-tp-warning-100",
                                children: _jsx(Timer1, { size: 22, variant: "Bulk", className: "text-tp-warning-600" }),
                            }),
                            _jsxs("div", {
                                children: [
                                    _jsx("h4", { className: "font-['Inter',sans-serif] text-[18px] font-bold text-tp-slate-900", children: plan.name }),
                                    _jsx("div", {
                                        className: "mt-[2px] flex items-center gap-[6px]",
                                        children: _jsx("span", {
                                            className: "inline-flex items-center rounded-[6px] bg-tp-slate-100 px-[8px] py-[2px] font-['Inter',sans-serif] text-[12px] font-medium text-tp-slate-500",
                                            children: formatINR(total),
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
                                            className: "flex h-[28px] w-[28px] items-center justify-center rounded-[8px] hover:bg-tp-slate-100 transition-colors",
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
                                                children: [_jsx(Receipt1, { size: 16, variant: "Linear", className: "mr-2" }), "View Plan Bill"],
                                            }),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => window.print(),
                                                className: dropdownItemClass,
                                                children: [_jsx(Printer, { size: 16, variant: "Linear", className: "mr-2" }), "Print All Services"],
                                            }),
                                            _jsx(DropdownMenuSeparator, {}),
                                            _jsxs(DropdownMenuItem, {
                                                onClick: () => setRevertAllOpen(true),
                                                className: "rounded-[8px] focus:bg-tp-warning-50 data-[highlighted]:bg-tp-warning-50",
                                                children: [
                                                    _jsx(ArrowRotateLeft, { size: 16, variant: "Linear", className: "mr-2 text-tp-warning-600" }),
                                                    _jsx("span", { className: "text-tp-warning-600", children: "Revert All to Plan" }),
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
            _jsx("div", {
                className: `flex min-h-0 min-w-0 flex-1 flex-col space-y-[8px] overflow-y-auto overflow-x-hidden overscroll-y-contain rounded-b-[16px] p-[12px] ${dui.planClusterInnerSurface}`,
                children: services.map((svc, idx) => _jsx(ServiceSubCard, {
                    service: svc,
                    plan: plan,
                    index: idx,
                    isOpen: openServiceIndex === idx,
                    onToggle: () => setOpenServiceIndex((current) => current === idx ? -1 : idx),
                }, svc.id)),
            }),
            _jsx(AlertDialog, {
                open: markAllOpen,
                onOpenChange: setMarkAllOpen,
                children: _jsxs(AlertDialogContent, {
                    children: [
                        _jsxs(AlertDialogHeader, {
                            children: [
                                _jsx(AlertDialogTitle, { children: "Mark All Services as Completed" }),
                                _jsxs(AlertDialogDescription, {
                                    children: [
                                        "This will mark all ",
                                        services.length,
                                        " services in ",
                                        _jsx("strong", { children: plan.name }),
                                        " as completed and move this plan to Completed Plans.",
                                    ],
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { children: "Cancel" }),
                                _jsx(AlertDialogAction, {
                                    onClick: () => {
                                        dispatch({ type: "MARK_PLAN_COMPLETED", planId: plan.id });
                                        setMarkAllOpen(false);
                                    },
                                    className: "bg-tp-success-600 text-white hover:bg-tp-success-700",
                                    children: "Mark All Done",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            _jsx(AlertDialog, {
                open: revertAllOpen,
                onOpenChange: setRevertAllOpen,
                children: _jsxs(AlertDialogContent, {
                    children: [
                        _jsxs(AlertDialogHeader, {
                            children: [
                                _jsx(AlertDialogTitle, { children: "Revert Plan to Estimates" }),
                                _jsxs(AlertDialogDescription, {
                                    children: [
                                        "This will revert ",
                                        _jsx("strong", { children: plan.name }),
                                        " back to estimates. Appointments, consultations, recorded visits, and procedures on this plan will be cleared.",
                                    ],
                                }),
                            ],
                        }),
                        _jsxs(AlertDialogFooter, {
                            children: [
                                _jsx(AlertDialogCancel, { children: "Cancel" }),
                                _jsx(AlertDialogAction, {
                                    onClick: () => {
                                        dispatch({ type: "REVERT_PLAN_TO_ESTIMATES", planId: plan.id });
                                        setRevertAllOpen(false);
                                    },
                                    className: "bg-tp-warning-600 text-white hover:bg-tp-warning-700",
                                    children: "Revert to Estimates",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        ],
    });
}

// ─── Tab Content ────────────────────────────────────────────
export function InProgressTab() {
    const { inProgressPlans } = usePlanContext();
    const activePlan = inProgressPlans[0];
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
                                    className: "flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-tp-warning-50",
                                    children: _jsx(Timer1, { size: 24, variant: "Bulk", className: "text-tp-warning-600" }),
                                }),
                                _jsx("h3", { className: "font-['Inter',sans-serif] text-[18px] font-bold text-tp-slate-900", children: "Active Plans" }),
                            ],
                        }),
                    }),
                    _jsx("div", {
                        className: `flex flex-1 flex-col rounded-b-[16px] p-[12px] ${dui.planClusterInnerSurface}`,
                        children: _jsx(EmptyState, {
                            icon: _jsxs("svg", {
                                width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true,
                                children: [
                                    _jsx("path", { d: "M12 8v4l3 3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
                                    _jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.5" }),
                                ],
                            }),
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
            className: "h-full min-h-0",
            children: activePlan && _jsx(PlanClusterCard, { plan: activePlan }, activePlan.id),
        }),
    });
}
