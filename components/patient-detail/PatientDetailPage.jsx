"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlanProcedures, PLAN_PROCEDURES_UPDATED_EVENT } from "@/lib/plan-procedures-store";

const PROC_STATUS_LABEL = { "not-started": "Planned", planned: "Planned", "in-progress": "In Progress", completed: "Completed", "no-show": "No Show", "not-interested": "Not Interested" };
function usePlanProcedures() {
  const [procs, setProcs] = useState([]);
  useEffect(() => {
    const pid = (() => { try { return new URLSearchParams(window.location.search).get("patientId") || "apt-1"; } catch { return "apt-1"; } })();
    const load = () => setProcs(getPlanProcedures(pid));
    load();
    window.addEventListener(PLAN_PROCEDURES_UPDATED_EVENT, load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener(PLAN_PROCEDURES_UPDATED_EVENT, load);
      window.removeEventListener("storage", load);
    };
  }, []);
  return procs;
}
import clsx from "clsx";
import {
  Add,
  ArrowDown2,
  ArrowLeft2,
  ArrowRight2,
  Buildings2,
  Calendar2,
  CallCalling,
  Card,
  DocumentText,
  DocumentUpload,
  Edit2,
  Hospital,
  MedalStar,
  Note1,
  Printer,
  ReceiptText,
  Refresh2,
  User,
} from "iconsax-reactjs";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TPClinicalTable } from "@/components/tp-ui/tp-clinical-table";
import { TPMedicalIcon } from "@/components/tp-ui/medical-icons";
import { INITIAL_TOOTH_STATE } from "@/components/dental/mock-data";
import { TPButton as Button, TPSplitButton } from "@/components/tp-ui/button-system";
import { AppointmentBanner } from "@/components/appointments/AppointmentBanner";
import svgPaths from "@/components/tp-rxpad/imports/svg-gb0jbe9ifm";
import rxHeaderStyles from "@/components/tp-rxpad/imports/RxpadHeader.module.scss";
import { TreatmentPlanEmbed } from "@/components/dental/plan/TreatmentPlanPage";
import { getAppointmentPatient } from "@/lib/appointment-patients";
import { DR_AGENT_MAIN_RESERVE_CLASS } from "@/components/tp-rxpad/DrAgentLayoutShell";
import { cn } from "@/lib/utils";

const HISTORY_VIOLET = "var(--tp-violet-500)";

/** Same field rows as Rx pad patient dropdown. */
function buildPatientHeaderProfileFields(patientId) {
  const p = getAppointmentPatient(patientId);
  return [
    {
      key: "patient-id",
      label: "Patient ID",
      value: p.patientCode,
      icon: <Card color="var(--tp-violet-500)" size={18} strokeWidth={1.5} variant="Linear" />,
    },
    {
      key: "mobile",
      label: "Mobile Number",
      value: p.mobile.replace(/^\+91-/, ""),
      icon: <CallCalling color="var(--tp-violet-500)" size={18} strokeWidth={1.5} variant="Linear" />,
    },
    {
      key: "dob",
      label: "DOB",
      value: p.dob,
      icon: <Calendar2 color="var(--tp-violet-500)" size={18} strokeWidth={1.5} variant="Linear" />,
    },
  ];
}

const VITALS_ROWS = [
  { name: "SPO2(%)", v1: "95", v2: "94" },
  { name: "Height (cms)", v1: "98.6", v2: "95" },
  { name: "Temperature (Frh)", v1: "95", v2: "94" },
  { name: "Pulse(/min)", v1: "66", v2: "65" },
  { name: "BP(mm Hg)", v1: "120/80", v2: "120/80" },
];

const LAB_ROWS = [
  { name: "Hemoglobin(g/dl)", v1: "14.2", v2: "13.8" },
  { name: "WBC", v1: "7800", v2: "7200" },
  { name: "Platelets", v1: "2.45", v2: "2.38" },
];

/** Matches `TPClinicalTable` (TO clinical table) styling for history cards. */
const VITALS_LAB_TABLE_COLUMNS = [
  { id: "name", header: "Name", accessor: (r) => r.name },
  { id: "v1", header: "10 Oct, 22", accessor: (r) => r.v1 },
  { id: "v2", header: "5 Oct, 22", accessor: (r) => r.v2 },
];

const MEDICAL_HISTORY_ROWS = [
  {
    id: "medical-problems",
    topic: "Medical problems",
    details: (
      <>
        <span className="font-medium text-[#454551]">Hypothyroidism</span>
        <span> — Since </span>
        <span className="font-medium text-[#454551]">3–6 months</span>
        <span>, medication </span>
        <span className="font-medium text-[#454551]">no</span>
      </>
    ),
  },
  {
    id: "lifestyle",
    topic: "Lifestyle",
    details: (
      <>
        <span className="font-medium text-[#454551]">Smoking</span>
        <span> — yes, since </span>
        <span className="font-medium text-[#454551]">2 years</span>
        <span>, quantity </span>
        <span className="font-medium text-[#454551]">2 units/day</span>
      </>
    ),
  },
];

const MEDICAL_HISTORY_COLUMNS = [
  {
    id: "topic",
    header: "Topic",
    minWidth: "38%",
    accessor: (r) => <span className="text-[#a2a2a8]">{r.topic}</span>,
  },
  {
    id: "details",
    header: "Details",
    accessor: (r) => <span className="leading-relaxed">{r.details}</span>,
  },
];

/* ---- Dental History — real-time loader from chart-store --------------- */

// Build the human-friendly tooth label that the right panel uses
// ("Upper Right First Molar (T16)"). Falls back to "Tooth (T<fdi>)" when
// the FDI doesn't map cleanly so the card never blanks out on bad data.
const TOOTH_NAME_BY_FDI = {
  11: "Upper Right Central Incisor", 12: "Upper Right Lateral Incisor",
  13: "Upper Right Canine", 14: "Upper Right First Premolar",
  15: "Upper Right Second Premolar", 16: "Upper Right First Molar",
  17: "Upper Right Second Molar", 18: "Upper Right Third Molar",
  21: "Upper Left Central Incisor", 22: "Upper Left Lateral Incisor",
  23: "Upper Left Canine", 24: "Upper Left First Premolar",
  25: "Upper Left Second Premolar", 26: "Upper Left First Molar",
  27: "Upper Left Second Molar", 28: "Upper Left Third Molar",
  31: "Lower Left Central Incisor", 32: "Lower Left Lateral Incisor",
  33: "Lower Left Canine", 34: "Lower Left First Premolar",
  35: "Lower Left Second Premolar", 36: "Lower Left First Molar",
  37: "Lower Left Second Molar", 38: "Lower Left Third Molar",
  41: "Lower Right Central Incisor", 42: "Lower Right Lateral Incisor",
  43: "Lower Right Canine", 44: "Lower Right First Premolar",
  45: "Lower Right Second Premolar", 46: "Lower Right First Molar",
  47: "Lower Right Second Molar", 48: "Lower Right Third Molar",
};

function toothLabelFor(fdi) {
  return TOOTH_NAME_BY_FDI[fdi] ? `${TOOTH_NAME_BY_FDI[fdi]} (T${fdi})` : `Tooth (T${fdi})`;
}

// Reads `dental.exam.chart.<patientId>` and returns the inline lines for the
// Dental History card, or `null` when the patient has no chart data at all.
// Falls back to the in-memory seed (`INITIAL_TOOTH_STATE[patientId]`) when
// localStorage is empty — that way the demo seed personas (Anjali Patel)
// render the card even on a fresh browser session, while truly empty
// personas (Shyam GR, Ria Kapoor) still render nothing.
// Shapes:
//   oral: [{ label, items: [{ name, meta }] }]
//   tooth: [{ toothLabel, segs: [{ label, text }] }]
// The per-row "(date)" annotation was removed from the rendered card, so
// `addedOn` no longer appears in either shape (the date is no longer
// displayed anywhere in the print or the Dental History card).
function loadDentalHistory(patientId) {
  if (typeof window === "undefined") return null;
  let chart = null;
  try {
    const raw = window.localStorage.getItem(`dental.exam.chart.${patientId || "apt-1"}`);
    if (raw) chart = JSON.parse(raw);
  } catch {}
  // Fall back to the in-memory seed when localStorage is empty for this patient.
  if (!chart || (Array.isArray(chart.oralEntries) ? chart.oralEntries.length : 0) === 0
      && Object.keys(chart?.toothDiagnoses || {}).length === 0
      && Object.keys(chart?.findingsByTooth || {}).length === 0
      && Object.keys(chart?.treatmentHistoryByTooth || {}).length === 0
      && !(chart?.oralNotes || "").trim()) {
    const seed = (INITIAL_TOOTH_STATE && INITIAL_TOOTH_STATE[patientId]) || null;
    if (seed) chart = { ...(chart || {}), ...seed };
  }
  if (!chart) return null;

  // ---- Oral lines, grouped by kind ----
  const byKind = { past: [], finding: [], procedure: [] };
  (chart.oralEntries || []).forEach((e) => {
    if (!e || !e.name) return;
    const region = (e.surfaces || []).join(", ");
    const metaBits = [];
    if (region) metaBits.push(region);
    if (e.since) metaBits.push(`since ${e.since}`);
    if (e.note) metaBits.push(e.note);
    // Pipe separators inside the bracket match the print's dental + oral
    // formatting ("Scaling & Polishing (WHOLE | since 6 months | note)"),
    // so the Dental History card and the printed Rx read identically.
    const meta = metaBits.join(" | ");
    (byKind[e.kind] || byKind.finding).push({ name: e.name, meta });
  });
  const oral = [];
  if (byKind.past.length)      oral.push({ label: "Past Procedures", items: byKind.past });
  if (byKind.finding.length)   oral.push({ label: "Findings",        items: byKind.finding });
  if (byKind.procedure.length) oral.push({ label: "Procedures",      items: byKind.procedure });
  // Overall oral notes line
  if (typeof chart.oralNotes === "string" && chart.oralNotes.trim()) {
    oral.push({ label: "Notes", items: [{ name: chart.oralNotes.trim(), meta: "" }] });
  }

  // ---- Per-tooth lines ----
  const toothMap = {};
  const ensureTooth = (fdi) => {
    if (!toothMap[fdi]) toothMap[fdi] = { toothLabel: toothLabelFor(fdi), segs: [] };
    return toothMap[fdi];
  };
  // Diagnoses (past procedures done on the tooth)
  Object.entries(chart.toothDiagnoses || {}).forEach(([fdi, list]) => {
    if (!Array.isArray(list) || list.length === 0) return;
    ensureTooth(fdi).segs.push({ label: "Past Procedures", text: list.join(", ") });
  });
  // Findings (current observations)
  Object.entries(chart.findingsByTooth || {}).forEach(([fdi, list]) => {
    if (!Array.isArray(list) || list.length === 0) return;
    const names = list.map((f) => {
      const surf = f.zoneId ? ` (${f.zoneId})` : "";
      return `${f.type || f.name || "Finding"}${surf}`;
    });
    ensureTooth(fdi).segs.push({ label: "Findings", text: names.join(", ") });
  });
  // Treatment history detail
  Object.entries(chart.treatmentHistoryByTooth || {}).forEach(([fdi, map]) => {
    if (!map || typeof map !== "object") return;
    const names = Object.keys(map);
    if (!names.length) return;
    const tooth = ensureTooth(fdi);
    if (!tooth.segs.some((s) => s.label === "Past Procedures")) {
      tooth.segs.push({ label: "Past Procedures", text: names.join(", ") });
    }
  });
  const tooth = Object.values(toothMap).filter((t) => t.segs.length > 0);

  if (oral.length === 0 && tooth.length === 0) return null;
  return { oral, tooth };
}

const MEDICATIONS = [
  "Hydroxychloroquine 400 Tablet (400mg, once a week)",
  "Vitamin C 1000 Tablet (1000mg, once a day)",
  "Zinc 50 tablet (50mg, once a day)",
  "Crocin 650mg tablet (650mg, SOS, in case of fever)",
  "cetirizine 10mg tablet (10mg, Once a day, In case of throat pain & cough)",
  "alex syrup (2/3 teaspoon, 3 times a day, SOS incase of cough)",
];

const LAB_TESTS = [
  "Complete Blood Count(CBC) Test",
  "ESR Test",
  "Urea",
  "Creat",
];

const VISIT_PAGES = 8;

/** Mock Rx metadata — used in header + tooltips. */
const RX_VISIT_DATE = "10 Oct 2023";
const RX_VISIT_TIME = "5:13 pm";
const RX_VISIT_DATETIME = `${RX_VISIT_DATE}, ${RX_VISIT_TIME}`;

function CardShell({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-[16px] bg-white shadow-[0_1px_3px_rgba(23,23,37,0.06)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function HistorySectionCard({ title, iconName, onOpenSidebar, children }) {
  return (
    <CardShell className="overflow-hidden border border-tp-slate-200">
      <div className="flex w-full items-center gap-3 border-b border-tp-slate-200 px-3 py-[10px] sm:px-[14px]">
        <span className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center">
          <TPMedicalIcon name={iconName} variant="bulk" size={20} color={HISTORY_VIOLET} />
        </span>
        <span className="min-w-0 flex-1 font-sans text-[13px] font-medium leading-snug text-tp-slate-600">
          {title}
        </span>
        <button
          type="button"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center self-center rounded-[10px] border border-tp-slate-200 bg-white text-tp-slate-500 transition-colors hover:border-tp-slate-300 hover:bg-tp-slate-50/90 hover:text-tp-slate-700"
          aria-label={`Open ${title} in sidebar`}
          onClick={() => onOpenSidebar?.()}
        >
          <ArrowRight2 size={18} variant="Linear" color="currentColor" strokeWidth={1.75} />
        </button>
      </div>
      <div className="p-0">{children}</div>
    </CardShell>
  );
}

// Inline format renders each row as one paragraph — Rx Preview "inline view"
// shape. Oral lines: "Past Procedures: Name (meta), Name". Tooth lines:
// "Upper Right First Molar (T16): Findings: Name (meta); Past Procedures: …".
function DentalHistoryInline({ oral, tooth }) {
  const sectionTag = (label) => (
    <div className="mb-2 mt-1 px-3 py-[6px] rounded-[6px] bg-[#f1f1f5] text-[11px] font-semibold uppercase tracking-[0.05em] text-[#454551]">
      {label}
    </div>
  );
  return (
    <div className="flex flex-col gap-3">
      {oral.length > 0 && (
        <div>
          {sectionTag("Oral Record")}
          <div className="flex flex-col gap-1 pl-3">
            {oral.map((line) => (
              <p key={line.label} className="m-0 text-[12.5px] leading-[1.45] text-[#334155]">
                <span className="font-semibold text-[#0f172a]">
                  {line.label}:
                </span>{" "}
                {line.items.map((it, i) => {
                  // Split the pre-joined meta back into parts and render the
                  // pipe with a slightly lighter shade — same divider styling
                  // the printed Rx uses ("(part1 | part2 | part3)"), so the
                  // card and the print match character + colour.
                  const parts = it.meta ? it.meta.split(" | ") : [];
                  return (
                    <span key={i}>
                      {i > 0 ? ", " : ""}
                      {it.name}
                      {parts.length > 0 ? (
                        <span className="text-[#64748b]">
                          {" ("}
                          {parts.map((p, j) => (
                            <span key={j}>
                              {j > 0 ? <span className="text-[#94a3b8]">{" | "}</span> : null}
                              {p}
                            </span>
                          ))}
                          {")"}
                        </span>
                      ) : null}
                    </span>
                  );
                })}
              </p>
            ))}
          </div>
        </div>
      )}
      {tooth.length > 0 && (
        <div>
          {sectionTag("Tooth Record")}
          <div className="flex flex-col gap-1 pl-3">
            {tooth.map((row, idx) => (
              <p key={idx} className="m-0 text-[12.5px] leading-[1.45] text-[#334155]">
                <span className="font-semibold text-[#0f172a]">
                  {row.toothLabel}:
                </span>
                {" "}
                {row.segs.map((s, i) => (
                  <span key={i}>
                    {i > 0 ? <span className="text-[#94a3b8]">; </span> : null}
                    <span className="font-semibold text-[#1e293b]">{s.label}:</span> {s.text}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Card with collapsible body + single "View more →" CTA at the bottom.
// Reads the live chart store via `loadDentalHistory(patientId)`; returns null
// when the patient has no dental records yet (Shyam GR, Ria Kapoor) so the
// card simply doesn't render — keeping the History column honest about what
// the patient actually has on file.
function DentalHistoryCard({ patientId }) {
  const [expanded, setExpanded] = useState(false);
  // Re-evaluate on every render (cheap localStorage read) so the card mirrors
  // any chart edits the doctor makes elsewhere in the session.
  const data = loadDentalHistory(patientId);
  const onJumpToDental = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.href = `/rxpad?patientId=${patientId || "apt-1"}&dentalTab=dental`;
    }
  }, [patientId]);
  if (!data) return null;
  return (
    <CardShell className="overflow-hidden border border-tp-slate-200">
      <div className="flex w-full items-center gap-3 border-b border-tp-slate-200 px-3 py-[10px] sm:px-[14px]">
        <span className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center">
          <TPMedicalIcon name="tooth" variant="bulk" size={20} color={HISTORY_VIOLET} />
        </span>
        <span className="min-w-0 flex-1 font-sans text-[13px] font-medium leading-snug text-tp-slate-600">
          Dental History
        </span>
        <button
          type="button"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center self-center rounded-[10px] border border-tp-slate-200 bg-white text-tp-slate-500 transition-colors hover:border-tp-slate-300 hover:bg-tp-slate-50/90 hover:text-tp-slate-700"
          aria-label="Open Dental Examination"
          title="Open Dental Examination"
          onClick={onJumpToDental}
        >
          <ArrowRight2 size={18} variant="Linear" color="currentColor" strokeWidth={1.75} />
        </button>
      </div>
      {/* When collapsed, the body has overflow:hidden and a tall gradient
          overlay at the bottom that fades the trailing content while
          HOSTING the "View more" button — no divider, no separate footer
          row, the content visually melts into the CTA. When expanded, the
          body shows full height and the button sits below it without a
          border. */}
      <div
        className="px-3 sm:px-[14px] py-3"
        style={{ maxHeight: expanded ? "none" : 180, overflow: "hidden", position: "relative" }}
      >
        <DentalHistoryInline oral={data.oral} tooth={data.tooth} />
        {!expanded && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 70,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 55%, #fff 100%)",
              pointerEvents: "none",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 8,
            }}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--tp-blue-500)] hover:underline focus:outline-none"
              onClick={() => setExpanded(true)}
              aria-expanded={false}
              style={{ pointerEvents: "auto" }}
            >
              <span>View more</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
      {expanded && (
        <div className="px-3 sm:px-[14px] pb-3 pt-1 flex items-center justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--tp-blue-500)] hover:underline focus:outline-none"
            onClick={() => setExpanded(false)}
            aria-expanded={true}
          >
            <span>Show less</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: "rotate(180deg)", transition: "transform 0.18s ease" }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </CardShell>
  );
}

function HistorySectionCards({ patientId }) {
  return (
    <>
      <HistorySectionCard title="Vitals & Body Composition" iconName="Heart Rate">
        <TPClinicalTable
          columns={VITALS_LAB_TABLE_COLUMNS}
          data={VITALS_ROWS}
          rowKey={(row) => row.name}
        />
      </HistorySectionCard>
      <HistorySectionCard title="Medical History" iconName="clipboard-activity">
        <TPClinicalTable
          columns={MEDICAL_HISTORY_COLUMNS}
          data={MEDICAL_HISTORY_ROWS}
          rowKey={(row) => row.id}
        />
      </HistorySectionCard>
      <HistorySectionCard title="Lab Results" iconName="Lab">
        <TPClinicalTable columns={VITALS_LAB_TABLE_COLUMNS} data={LAB_ROWS} rowKey={(row) => row.name} />
      </HistorySectionCard>
      <DentalHistoryCard patientId={patientId} />
    </>
  );
}

function DigitalRxPanel({ visitIndex, setVisitIndex, rxTab, setRxTab }) {
  const isDigital = rxTab === "digital";
  const docKind = isDigital ? "digital Rx" : "transcript";
  const planProcedures = usePlanProcedures();

  return (
    <CardShell className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="shrink-0 bg-white">
        {/* Row 1 — visit identity: doctor | pagination | date */}
        <div className="flex h-[48px] items-center px-4">
          <div className="grid h-full w-full grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr]">
            <div className="flex min-w-0 flex-wrap items-center gap-2 sm:justify-self-start">
              <p className="font-sans text-[14px] font-semibold leading-tight text-tp-slate-900">Dr Umesh</p>
              <span className="inline-flex shrink-0 items-center rounded-[6px] bg-tp-slate-100 px-2 py-[2px] font-sans text-[12px] font-medium leading-tight text-tp-slate-600">
                Cardiology
              </span>
            </div>

            <div className="flex items-center justify-center gap-[2px] sm:justify-self-center">
              <button
                type="button"
                aria-label="Previous visit"
                className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-tp-slate-500 transition-colors hover:bg-tp-slate-50 hover:text-tp-slate-700 disabled:pointer-events-none disabled:opacity-30"
                disabled={visitIndex <= 0}
                onClick={() => setVisitIndex((i) => Math.max(0, i - 1))}
              >
                <ArrowLeft2 size={16} variant="Linear" color="currentColor" />
              </button>
              <span className="min-w-[44px] text-center font-sans text-[12px] font-semibold tabular-nums text-tp-slate-700">
                {visitIndex + 1} / {VISIT_PAGES}
              </span>
              <button
                type="button"
                aria-label="Next visit"
                className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-tp-slate-500 transition-colors hover:bg-tp-slate-50 hover:text-tp-slate-700 disabled:pointer-events-none disabled:opacity-30"
                disabled={visitIndex >= VISIT_PAGES - 1}
                onClick={() => setVisitIndex((i) => Math.min(VISIT_PAGES - 1, i + 1))}
              >
                <ArrowRight2 size={16} variant="Linear" color="currentColor" />
              </button>
            </div>

            <div className="text-left font-sans sm:text-right sm:justify-self-end">
              <p className="whitespace-nowrap text-[12px] font-medium leading-tight text-tp-slate-500">
                {RX_VISIT_DATETIME}
              </p>
            </div>
          </div>
        </div>

        {/* Hairline separator between identity row and controls row */}
        <div className="h-px w-full shrink-0 bg-tp-slate-100" aria-hidden />

        {/* Row 2 — view toggle + actions */}
        <div className="flex h-[48px] items-center justify-between px-4">
          {/* Segmented pill toggle — floating white active pane on slate-100 track */}
          <div className="inline-flex h-[32px] items-center rounded-[10px] bg-tp-slate-100 p-[3px]">
            <button
              type="button"
              onClick={() => setRxTab("digital")}
              className={cn(
                "inline-flex h-[26px] items-center rounded-[8px] px-[14px] font-sans text-[12px] font-semibold transition-colors",
                rxTab === "digital"
                  ? "bg-white text-tp-blue-700 shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
                  : "text-tp-slate-600 hover:text-tp-slate-900",
              )}
            >
              Digital Rx
            </button>
            <button
              type="button"
              onClick={() => setRxTab("transcript")}
              className={cn(
                "inline-flex h-[26px] items-center rounded-[8px] px-[14px] font-sans text-[12px] font-semibold transition-colors",
                rxTab === "transcript"
                  ? "bg-white text-tp-blue-700 shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
                  : "text-tp-slate-600 hover:text-tp-slate-900",
              )}
            >
              Transcript
            </button>
          </div>

          <TooltipProvider delayDuration={280}>
            <div className="flex items-center gap-[2px]">
              <TooltipPrimitive.Root>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Repeat this ${docKind}`}
                    className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] text-tp-slate-600 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-900"
                  >
                    <Refresh2 size={16} variant="Linear" color="currentColor" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={6} className="max-w-[240px] text-balance">
                  {isDigital
                    ? `Repeat this digital Rx from ${RX_VISIT_DATETIME}`
                    : `Repeat this transcript from ${RX_VISIT_DATETIME}`}
                </TooltipContent>
              </TooltipPrimitive.Root>
              <TooltipPrimitive.Root>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={isDigital ? "Print this digital Rx" : "Print this transcript"}
                    className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] text-tp-slate-600 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-900"
                  >
                    <Printer size={16} variant="Linear" color="currentColor" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={6}>
                  {isDigital ? "Print this digital Rx" : "Print this transcript"}
                </TooltipContent>
              </TooltipPrimitive.Root>
              <TooltipPrimitive.Root>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={isDigital ? "Edit this digital Rx" : "Edit this transcript"}
                    className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] text-tp-slate-600 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-900"
                  >
                    <Edit2 size={16} variant="Linear" color="currentColor" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={6}>
                  {isDigital ? "Edit this digital Rx" : "Edit this transcript"}
                </TooltipContent>
              </TooltipPrimitive.Root>
              <div className="mx-[2px] h-[18px] w-px bg-tp-slate-200" aria-hidden />
              <TooltipPrimitive.Root>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label="More options"
                    className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] text-tp-slate-600 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-900"
                  >
                    <MoreVertical size={16} strokeWidth={1.75} className="text-tp-slate-600" aria-hidden />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={6}>
                  {isDigital ? "More actions for this digital Rx" : "More actions for this transcript"}
                </TooltipContent>
              </TooltipPrimitive.Root>
            </div>
          </TooltipProvider>
        </div>
        <div className="h-px w-full shrink-0 bg-tp-slate-100" aria-hidden />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white px-4 pt-4 pb-[18px]">
        {rxTab === "transcript" ? (
          <p className="font-sans text-[13px] leading-relaxed text-tp-slate-500">
            Consultation transcript will appear here when available from SmartScribe.
          </p>
        ) : (
          <div className="space-y-6">
            <section>
              <h4 className="font-sans text-[14px] font-medium text-tp-slate-900">Chief Complaints</h4>
              <ol className="mt-2 list-decimal pl-5 font-sans text-[12px] text-tp-slate-600">
                <li>Mild symptom (Mild, patient should be on home isolation)</li>
              </ol>
            </section>
            <section>
              <h4 className="font-sans text-[14px] font-medium text-tp-slate-900">Investigations</h4>
              <ol className="mt-2 list-decimal space-y-1 pl-5 font-sans text-[12px] text-tp-slate-600">
                {LAB_TESTS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </section>
            <section>
              <h4 className="font-sans text-[14px] font-medium text-tp-slate-900">Medication</h4>
              <ol className="mt-2 list-decimal space-y-1 pl-5 font-sans text-[12px] leading-relaxed text-tp-slate-600">
                {MEDICATIONS.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ol>
            </section>
            {planProcedures.length > 0 && (
              <section>
                <div className="flex items-center gap-2">
                  <h4 className="font-sans text-[14px] font-medium text-tp-slate-900">Procedures</h4>
                  <span className="inline-flex items-center rounded-[5px] bg-tp-violet-50 px-[7px] py-[2px] font-sans text-[10.5px] font-bold uppercase tracking-[0.3px] text-tp-violet-600">From treatment plan</span>
                </div>
                <ol className="mt-2 list-decimal space-y-1 pl-5 font-sans text-[12px] leading-relaxed text-tp-slate-600">
                  {planProcedures.map((p) => {
                    const meta = [p.toothLabel, p.doctor, p.date, p.status ? (PROC_STATUS_LABEL[p.status] ?? p.status) : "", p.notes].filter(Boolean).join(", ");
                    return <li key={p.id}>{p.name}{meta ? ` (${meta})` : ""}</li>;
                  })}
                </ol>
              </section>
            )}
            <section>
              <h4 className="font-sans text-[14px] font-medium text-tp-slate-900">Advice</h4>
              <ol className="mt-2 list-decimal space-y-1 pl-5 font-sans text-[12px] text-tp-slate-600">
                <li>Follow social distancing</li>
                <li>Practice hand hygiene</li>
                <li>Wear masks</li>
              </ol>
            </section>
            <section>
              <h4 className="font-sans text-[14px] font-medium text-tp-slate-900">Follow-up</h4>
              <p className="mt-2 font-sans text-[12px] text-tp-slate-600">03/07/2024</p>
            </section>
            <section>
              <h4 className="font-sans text-[14px] font-medium text-tp-slate-900">Vitals &amp; Body Compositions</h4>
              <p className="mt-2 font-sans text-[12px] leading-relaxed text-tp-slate-600">
                Temperature: 95Frh, Pulse: 68/min, Resp. Rate: 95/min, Systolic:120mmHg, Diastolic: 75mmHg, SPO2:
                95%, Height: 175cms, Weight: 68kgs, BMI: 22.20kg/m², BMR : 1693.75kcals, BSA: 1.82m²
              </p>
            </section>
          </div>
        )}
      </div>
    </CardShell>
  );
}

/** Copy only — sits inside {@link PatientDetailContentShell}. */
function EmptyModuleBody({ title, message, icon: Icon }) {
  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 px-6 py-10 text-center text-transparent">
      {Icon ? <Icon size={44} variant="Bulk" color="var(--tp-slate-300)" /> : null}
      <p className="font-sans text-[15px] font-semibold text-tp-slate-800">{title}</p>
      <p className="font-sans text-[13px] leading-relaxed text-tp-slate-500">{message}</p>
    </div>
  );
}

/**
 * Shared module surface (placeholders): one rounded panel overlapping the banner.
 */
function PatientDetailContentShell({ children, className, bodyClassName }) {
  return (
    <div
      data-tp-figma-capture="patient-detail-module-shell"
      className={cn(
        "relative z-10 mt-[-62px] flex h-full min-h-0 min-w-0 w-full flex-1 flex-col rounded-[16px] bg-white shadow-[0_1px_3px_rgba(23,23,37,0.06)]",
        bodyClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}

const NAV_CONFIG = [
  { id: "opd-summary", label: "OPD Visit Summary", bannerTitle: "OPD Visit Summary", kind: "opd" },
  { id: "reports", label: "Reports", bannerTitle: "Reports", kind: "placeholder", placeholderKey: "reports" },
  {
    id: "certificates",
    label: "Certificates",
    bannerTitle: "Certificates",
    kind: "placeholder",
    placeholderKey: "certificates",
  },
  { id: "add-edit-bill", label: "Add/Edit Bill", bannerTitle: "Add/Edit Bill", kind: "placeholder", placeholderKey: "bill" },
  {
    id: "dental-plan",
    label: "Dental plan",
    bannerTitle: "Dental treatment plan",
    kind: "dental-plan",
  },
  {
    id: "ipd-discharge",
    label: "IPD Discharge Summary",
    bannerTitle: "IPD Discharge Summary",
    kind: "placeholder",
    placeholderKey: "ipd",
  },
  {
    id: "daycare-discharge",
    label: "Daycare Discharge Summary",
    bannerTitle: "Daycare Discharge Summary",
    kind: "placeholder",
    placeholderKey: "daycare",
  },
];

function SecondaryNavIcon({ item, selected }) {
  /** Match primary sidebar (`SecondaryNavPanel` / appointments): Bulk + inverse on blue pill, Linear + slate on slate pill. */
  const iconSize = 20;
  const idleColor = "var(--tp-slate-700)";
  const activeColor = "var(--tp-slate-0)";

  if (item.id === "opd-summary") {
    return (
      <DocumentText
        size={iconSize}
        variant={selected ? "Bulk" : "Linear"}
        color={selected ? activeColor : idleColor}
      />
    );
  }
  if (item.id === "reports") {
    return <Note1 size={iconSize} variant={selected ? "Bulk" : "Linear"} color={selected ? activeColor : idleColor} />;
  }
  if (item.id === "certificates") {
    return <MedalStar size={iconSize} variant={selected ? "Bulk" : "Linear"} color={selected ? activeColor : idleColor} />;
  }
  if (item.id === "add-edit-bill") {
    return <ReceiptText size={iconSize} variant={selected ? "Bulk" : "Linear"} color={selected ? activeColor : idleColor} />;
  }
  if (item.id === "dental-plan") {
    return (
      <TPMedicalIcon
        name="surgical-scissors-02"
        variant={selected ? "bulk" : "line"}
        size={iconSize}
        color={selected ? activeColor : idleColor}
      />
    );
  }
  if (item.id === "ipd-discharge") {
    return <Hospital size={iconSize} variant={selected ? "Bulk" : "Linear"} color={selected ? activeColor : idleColor} />;
  }
  if (item.id === "daycare-discharge") {
    return <Buildings2 size={iconSize} variant={selected ? "Bulk" : "Linear"} color={selected ? activeColor : idleColor} />;
  }
  return <DocumentText size={iconSize} variant="Linear" color={idleColor} />;
}

const PLACEHOLDER_COPY = {
  reports: {
    title: "Reports",
    message: "Investigation and imaging reports linked to this patient will show here.",
    icon: Note1,
  },
  certificates: {
    title: "Certificates",
    message: "Medical certificates and fitness notes will appear in this section.",
    icon: DocumentText,
  },
  bill: {
    title: "Add/Edit Bill",
    message: "Create invoices, record payments, and manage billing from here.",
    icon: ReceiptText,
  },
  ipd: {
    title: "IPD Discharge Summary",
    message: "Inpatient discharge summaries will be listed here when available.",
    icon: Hospital,
  },
  daycare: {
    title: "Daycare Discharge Summary",
    message: "Daycare procedure summaries will appear here.",
    icon: Buildings2,
  },
};

/** Shared styling for every banner CTA — matches the appointments page action buttons. */
const BANNER_GHOST_BTN_CLASS =
  "!bg-white/[0.13] !text-white !backdrop-blur-[4px] hover:!bg-white/[0.22] whitespace-nowrap";
const BANNER_SOLID_BTN_CLASS = "whitespace-nowrap";

/**
 * Builds the CTA(s) shown on the right of the banner for the currently-selected nav item.
 * Each module gets a contextual action (Type RX dropdown, Add bill, Upload report, etc.),
 * mirroring how the appointments page decorates its own banner with page-specific actions.
 */
function renderBannerActions(activeConfig, { goTypeRx }) {
  if (!activeConfig) return null;

  // OPD summary + Dental plan both live in the Rx authoring flow → offer the
  // Type RX split button (primary = TypeRx; dropdown = Voice/Snap/WriteRx).
  if (activeConfig.kind === "opd" || activeConfig.kind === "dental-plan") {
    return (
      <TPSplitButton
        size="md"
        variant="solid"
        theme="primary"
        surface="dark"
        className={BANNER_SOLID_BTN_CLASS}
        primaryAction={{ label: "Type RX", onClick: goTypeRx }}
        secondaryActions={[
          { id: "type-rx", label: "Type RX", onClick: goTypeRx },
          { id: "voice-rx", label: "Voice RX", onClick: goTypeRx },
          { id: "snap-rx", label: "Snap RX", onClick: goTypeRx },
          { id: "smart-sync", label: "WriteRx", onClick: goTypeRx },
        ]}
      />
    );
  }

  // Simple page-specific CTAs for the remaining sections.
  const actionByKey = {
    reports: { label: "Upload report", icon: <DocumentUpload size={20} variant="Linear" strokeWidth={1.5} /> },
    certificates: { label: "Add new certificate", icon: <Add size={20} strokeWidth={1.5} /> },
    bill: { label: "Add new bill", icon: <Add size={20} strokeWidth={1.5} /> },
    ipd: { label: "Add IPD summary", icon: <Add size={20} strokeWidth={1.5} /> },
    daycare: { label: "Add daycare summary", icon: <Add size={20} strokeWidth={1.5} /> },
  };
  const key = activeConfig.placeholderKey;
  const meta = actionByKey[key];
  if (!meta) return null;
  return (
    <Button
      variant="outline"
      theme="primary"
      size="md"
      surface="dark"
      className={BANNER_GHOST_BTN_CLASS}
      leftIcon={meta.icon}
    >
      {meta.label}
    </Button>
  );
}

function PatientDetailInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = searchParams?.get("patientId") ?? "apt-1";
  const fromPage = searchParams?.get("from") ?? "appointments";

  const [activeNav, setActiveNav] = useState("opd-summary");
  const [rxTab, setRxTab] = useState("digital");
  const [visitIndex, setVisitIndex] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navFromUrl = searchParams?.get("nav");
  useEffect(() => {
    if (!navFromUrl) return;
    if (NAV_CONFIG.some((n) => n.id === navFromUrl)) {
      setActiveNav(navFromUrl);
    }
  }, [navFromUrl]);

  const headerPatient = useMemo(() => getAppointmentPatient(patientId), [patientId]);
  const profileFields = useMemo(() => buildPatientHeaderProfileFields(patientId), [patientId]);

  const activeConfig = NAV_CONFIG.find((n) => n.id === activeNav) ?? NAV_CONFIG[0];

  const handleBack = () => {
    if (fromPage === "rxpad") {
      router.push(`/rxpad?patientId=${patientId}`);
    } else {
      router.push("/appointments");
    }
  };

  const goTypeRx = () => {
    router.push(`/rxpad?patientId=${patientId}`);
  };

  const onNavClick = (item) => {
    if (item.kind === "route" && item.route) {
      router.push(`${item.route}?patientId=${encodeURIComponent(patientId)}`);
      return;
    }
    setActiveNav(item.id);
  };

  const bannerActions = renderBannerActions(activeConfig, { goTypeRx });

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-tp-slate-100">
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Secondary nav — wide rail with back button + patient block + horizontal icon + label */}
        <nav
          className="relative flex w-[220px] shrink-0 flex-col overflow-hidden border-r border-tp-slate-100 bg-white"
          aria-label="Patient sections"
        >
          <div className="shrink-0 px-3 pt-3 pb-2">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Go back"
              className="inline-flex h-[32px] items-center gap-[6px] rounded-[8px] pl-[6px] pr-[10px] font-sans text-[14px] font-medium text-tp-slate-600 transition-colors hover:bg-tp-slate-50 hover:text-tp-blue-600"
            >
              <ArrowLeft2 size={16} color="currentColor" variant="Linear" />
              <span>Back</span>
            </button>
          </div>
          <div className="h-px shrink-0 bg-tp-slate-100" aria-hidden />
          <div className="shrink-0 px-3 pt-3 pb-3">
            <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 rounded-[10px] bg-tp-slate-100 px-2 py-2 text-left transition-colors hover:bg-tp-slate-200/75 data-[state=open]:bg-tp-slate-200/80"
                >
                  <div className={rxHeaderStyles.avatarRing} data-name="Profile Image">
                    <div className={rxHeaderStyles.avatarIcon} data-name="User">
                      <User color="var(--tp-slate-500)" size={22.857} variant="Bulk" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-sans text-[14px] font-semibold text-tp-slate-900">{headerPatient.name}</p>
                    <p className="flex items-center font-sans text-[12px] font-medium">
                      <span className="text-tp-slate-500">{headerPatient.genderShort}</span>
                      <span className="w-[14px] shrink-0 text-center text-tp-slate-300" aria-hidden>
                        ·
                      </span>
                      <span className="text-tp-slate-500">{`${headerPatient.age}Y`}</span>
                    </p>
                  </div>
                  <div
                    className={clsx(
                      rxHeaderStyles.chevronWrap,
                      rxHeaderStyles.chevronSpin,
                      isProfileOpen && rxHeaderStyles.chevronSpinOpen,
                    )}
                    aria-hidden
                  >
                    <ArrowDown2 color="var(--tp-slate-700)" size={18} strokeWidth={2} variant="Linear" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={6} className={rxHeaderStyles.menuContent}>
                <div className={rxHeaderStyles.menuArrowOuter} />
                <div className={rxHeaderStyles.menuArrowInner} />
                <div className={rxHeaderStyles.menuFields}>
                  {profileFields.map((item) => (
                    <div key={item.key} className={rxHeaderStyles.menuFieldRow}>
                      <div className={rxHeaderStyles.menuIconCircle}>{item.icon}</div>
                      <div className={rxHeaderStyles.menuFieldText}>
                        <p className={rxHeaderStyles.menuLabel}>{item.label}</p>
                        <p className={rxHeaderStyles.menuValue}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={rxHeaderStyles.menuActions}>
                  <button
                    type="button"
                    className={rxHeaderStyles.menuActionBtn}
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Edit2 color="currentColor" size={20} strokeWidth={1.5} variant="Linear" />
                    <span className={rxHeaderStyles.menuActionLabel}>Edit patient details</span>
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="h-px shrink-0 bg-tp-slate-100" aria-hidden />

          <div className="flex min-h-0 flex-1 flex-col gap-[2px] overflow-y-auto overflow-x-hidden pb-4 pt-3">
            {NAV_CONFIG.map((item) => {
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavClick(item)}
                  className={cn(
                    "relative flex w-full flex-row items-center gap-3 px-3 py-[10px] text-left transition-colors",
                    active ? "bg-tp-blue-50" : "hover:bg-tp-slate-50",
                  )}
                >
                  {active ? (
                    <span
                      className="absolute bottom-[6px] left-0 top-[6px] w-[3px] rounded-r-[12px] bg-tp-blue-500"
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] transition-colors",
                      active ? "bg-tp-blue-500" : "bg-tp-slate-100",
                    )}
                  >
                    <SecondaryNavIcon item={item} selected={active} />
                  </span>
                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate font-sans text-[14px] leading-snug",
                      active ? "font-semibold text-tp-slate-900" : "font-medium text-tp-slate-700",
                    )}
                    title={item.label}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main column: banner + body; OPD uses a single height-filling row with two sections (history | RX). */}
        <div
          className={cn(
            "static flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden",
            DR_AGENT_MAIN_RESERVE_CLASS,
            "overflow-hidden",
            (activeConfig.kind === "placeholder" || activeConfig.kind === "dental-plan") && "bg-tp-slate-50",
          )}
        >
          <AppointmentBanner
            title={activeConfig.bannerTitle}
            actions={bannerActions}
          />

          <div
            className={cn(
              "relative z-10 flex min-w-0 w-full flex-col px-3 pb-0 sm:px-4 md:px-5 lg:px-[18px] min-h-0 flex-1"
            )}
          >
            <div
              className={cn(
                "relative flex min-w-0 w-full max-w-none flex-col overflow-visible h-full min-h-0 flex-1"
              )}
            >
              {activeConfig.kind === "opd" ? (
                <PatientDetailContentShell
                  className="bg-transparent shadow-none rounded-none"
                  bodyClassName="flex min-h-0 flex-1 flex-col h-full overflow-hidden"
                >
                  <div className="flex w-full h-full min-w-0 min-h-0 flex-col gap-4 py-0 md:gap-5 lg:flex-row pb-[18px]">
                    <section
                      className="flex min-h-0 h-full flex-col gap-4 overflow-y-auto max-lg:w-full lg:w-[340px] lg:min-w-[200px] lg:shrink scrollbar-hide"
                      aria-label="Historical data"
                    >
                      <div className="flex flex-col gap-4">
                        <HistorySectionCards patientId={patientId} />
                      </div>
                    </section>
                    <section
                      className="flex min-h-0 h-full flex-1 flex-col overflow-hidden lg:min-w-[300px]"
                      aria-label="Prescription"
                    >
                      <DigitalRxPanel
                        visitIndex={visitIndex}
                        setVisitIndex={setVisitIndex}
                        rxTab={rxTab}
                        setRxTab={setRxTab}
                      />
                    </section>
                  </div>
                </PatientDetailContentShell>
              ) : activeConfig.kind === "dental-plan" ? (
                <PatientDetailContentShell
                  className="border border-tp-slate-200/80 shadow-none"
                  bodyClassName="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white"
                >
                  <TreatmentPlanEmbed patientId={patientId} />
                </PatientDetailContentShell>
              ) : (
                <PatientDetailContentShell bodyClassName="flex min-h-[min(480px,72vh)] flex-1 flex-col items-center justify-center overflow-y-auto">
                  <EmptyModuleBody
                    title={PLACEHOLDER_COPY[activeConfig.placeholderKey].title}
                    message={PLACEHOLDER_COPY[activeConfig.placeholderKey].message}
                    icon={PLACEHOLDER_COPY[activeConfig.placeholderKey].icon}
                  />
                </PatientDetailContentShell>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PatientDetailPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-tp-slate-100 font-sans text-tp-slate-500">Loading…</div>}>
      <PatientDetailInner />
    </Suspense>
  );
}
