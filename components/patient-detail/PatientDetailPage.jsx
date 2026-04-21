"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

function HistorySectionCards() {
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
    </>
  );
}

function DigitalRxPanel({ visitIndex, setVisitIndex, rxTab, setRxTab }) {
  const isDigital = rxTab === "digital";
  const docKind = isDigital ? "digital Rx" : "transcript";

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
  // Type RX split button (primary = TypeRx; dropdown = Voice/Snap/SmartSync).
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
          { id: "smart-sync", label: "SmartSync", onClick: goTypeRx },
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
                        <HistorySectionCards />
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
