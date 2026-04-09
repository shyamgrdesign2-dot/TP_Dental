/**
 * Past Visits content panel
 * - Supports per-date digital/written modes.
 * - Written Rx opens in a right sidebar PDF viewer.
 * - Copy affordances on date / section / item provide UX-level copy feedback.
 */
import React, { useEffect, useMemo, useState } from "react"
import {
  ArrowSquareDown,
  ArrowSquareUp,
  Calendar2,
  Copy as CopyIcon,
  Eye,
  Import,
  Printer,
} from "iconsax-reactjs"
import { MoreVertical } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  TPDrawer,
  TPDrawerContent,
  TPDrawerDescription,
  TPDrawerHeader,
  TPDrawerTitle,
} from "@/components/tp-ui/tp-drawer"
import { TPMedicalIcon, TPSnackbar } from "@/components/tp-ui"
import { ToothIcon } from "@/components/dental/ToothIcon"

import { tpSectionCardStyle } from "../tokens"
import { useStickyHeaderState } from "../detail-shared"

type RxTab = "digital" | "written"

interface VisitLineItem {
  label: string
  detail: string
}

interface MedicationVisitItem extends VisitLineItem {
  row: {
    medicine: string
    unitPerDose: string
    frequency: string
    when: string
    duration: string
    note: string
  }
}

interface DigitalVisitData {
  symptoms: VisitLineItem[]
  examinations: VisitLineItem[]
  diagnoses: VisitLineItem[]
  medications: MedicationVisitItem[]
  dentalExamination?: DentalToothVisitBlock[]
  advice: string
  followUp: string
  labInvestigations: string[]
  vitals: {
    bpSystolic?: string
    bpDiastolic?: string
    temperature?: string
    heartRate?: string
    respiratoryRate?: string
    weight?: string
    surgeryProcedure?: string
  }
  additionalNotes: string
}

interface WrittenRxDocument {
  id: string
  title: string
  description: string
  pdfUrl: string
  previewImage: string
}

interface PastVisitEntry {
  id: string
  dateLabel: string
  digitalRx?: DigitalVisitData
  writtenRx: WrittenRxDocument[]
}

interface DentalStructuredLine {
  name: string
  surface?: string
  since?: string
  date?: string
  status?: string
  notes?: string
}

interface DentalToothVisitBlock {
  toothLabel: string
  treatmentHistory: DentalStructuredLine[]
  findings: DentalStructuredLine[]
  procedures: DentalStructuredLine[]
  overallToothNote?: string
}

interface FormattedLine {
  title: string
  metaParts: string[]
}

function normalizePointerText(value: string): string {
  return value
    .replace(/\s*[•·]\s*/g, " • ")
    .replace(/\s*\|\s*/g, " | ")
    .replace(/\s+/g, " ")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .trim()
}

function formatMedicationDetail(item: MedicationVisitItem): string {
  const row = item.row
  const details = [
    row.unitPerDose,
    row.frequency,
    row.when,
    row.duration,
    row.note,
  ].map((value) => normalizePointerText(value)).filter(Boolean)

  return details.join(" | ")
}

function formatBracketParts(parts: Array<string | undefined>): string {
  const clean = parts.map((part) => normalizePointerText(part ?? "")).filter(Boolean)
  return clean.length > 0 ? clean.join(" | ") : ""
}

function splitMetaParts(value: string): string[] {
  return normalizePointerText(value)
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean)
}

function renderMetaInBrackets(parts: string[]) {
  if (parts.length === 0) return null
  return (
    <span className="text-tp-slate-400">
      {" ("}
      {parts.map((part, index) => (
        <React.Fragment key={`${part}-${index}`}>
          {index > 0 ? <span className="text-tp-slate-300"> | </span> : null}
          {part}
        </React.Fragment>
      ))}
      {")"}
    </span>
  )
}

const WRITTEN_RX_PDF_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
const WRITTEN_RX_PREVIEW = "/assets/afc7c9e55f8624dd8cba9c2017f7a975fba9d2d2.png"

const PAST_VISITS: PastVisitEntry[] = [
  {
    id: "visit-27-jan",
    dateLabel: "27 Jan'26",
    digitalRx: {
      symptoms: [
        { label: "Tooth pain", detail: "Since: 5 days | Status: Active | Trigger: Night-time throbbing" },
        { label: "Cold sensitivity", detail: "Since: 2 weeks | Status: Active | Trigger: Sweet and cold drinks" },
      ],
      examinations: [
        { label: "General oral exam", detail: "Deep cavity in 36, tenderness on percussion, oral hygiene fair" },
      ],
      diagnoses: [
        { label: "Irreversible pulpitis", detail: "Since: 5 days | Status: Confirmed | Related to tooth 36" },
        { label: "Dental caries", detail: "Since: 2 weeks | Status: Confirmed | Affected teeth: 16, 36" },
      ],
      dentalExamination: [
        {
          toothLabel: "Lower Left First Molar (T36)",
          treatmentHistory: [
            {
              name: "Root Canal Treatment",
              surface: "Occlusal, Root",
              since: "12 Feb'25",
              notes: "Access opening completed",
            },
            {
              name: "Composite Restoration",
              surface: "Mesio-occlusal",
              since: "20 Nov'24",
              notes: "Secondary caries suspected near margin",
            },
          ],
          findings: [
            {
              name: "Deep caries with percussion tenderness",
              surface: "Occlusal",
              since: "27 Jan'26",
              notes: "Night pain present",
            },
            {
              name: "Localized gingival inflammation",
              surface: "Lingual",
              since: "27 Jan'26",
              notes: "Mild bleeding on probing",
            },
          ],
          procedures: [
            {
              name: "RCT Sitting 1",
              surface: "Mesial and distal canals",
              date: "28 Jan'26",
              status: "Planned",
              notes: "Working length confirmation pending",
            },
            {
              name: "Pain management protocol",
              date: "27 Jan'26",
              status: "Completed",
              notes: "Ibuprofen SOS prescribed",
            },
          ],
          overallToothNote: "Severe throbbing pain for 5 days; crown planned post-obturation.",
        },
        {
          toothLabel: "Upper Right First Molar (T16)",
          treatmentHistory: [],
          findings: [
            {
              name: "Early caries with staining",
              surface: "Buccal, Occlusal",
              since: "27 Jan'26",
              notes: "Cold and sweet sensitivity",
            },
            {
              name: "Food impaction tendency",
              surface: "Distal marginal ridge",
              since: "27 Jan'26",
            },
          ],
          procedures: [
            {
              name: "Composite Restoration",
              surface: "Buccal, Occlusal",
              date: "30 Jan'26",
              status: "Planned",
            },
            {
              name: "Topical fluoride application",
              date: "27 Jan'26",
              status: "Completed",
              notes: "Post-sensitivity management",
            },
          ],
          overallToothNote: "No previous restorative work for this tooth.",
        },
        {
          toothLabel: "Lower Right Central Incisor (T41)",
          treatmentHistory: [],
          findings: [
            {
              name: "Supragingival calculus",
              surface: "Lingual",
              since: "27 Jan'26",
            },
          ],
          procedures: [
            {
              name: "Scaling and Polishing",
              surface: "Lingual",
              date: "31 Jan'26",
              status: "Planned",
            },
          ],
          overallToothNote: "Include with full-mouth periodontal therapy.",
        },
      ],
      medications: [
        {
          label: "Amoxicillin 500mg",
          detail: "1 capsule | 1-0-1 | After Food | 5 days",
          row: {
            medicine: "Amoxicillin 500mg",
            unitPerDose: "1 Capsule",
            frequency: "1 - 0 - 1",
            when: "After Food",
            duration: "5 Days",
            note: "Pre-RCT antibiotic cover",
          },
        },
        {
          label: "Ibuprofen 400mg",
          detail: "1 tablet | SOS | After Food | 3 days",
          row: {
            medicine: "Ibuprofen 400mg",
            unitPerDose: "1 Tablet",
            frequency: "SOS",
            when: "After Food",
            duration: "3 Days",
            note: "For pain management",
          },
        },
      ],
      advice: "Avoid chewing on left side. Warm salt water rinse 3×/day. Soft diet recommended. RCT sitting 1 scheduled for 28 Jan.",
      followUp: "After 3 days (RCT sitting 1)",
      labInvestigations: ["IOPA X-ray — 36", "OPG (Full mouth)"],
      vitals: {
        bpSystolic: "122",
        bpDiastolic: "78",
        temperature: "98.6",
        heartRate: "76",
        respiratoryRate: "16",
        weight: "68",
      },
      additionalNotes: "Treatment plan: RCT on 36, composite restoration on 16, full-mouth scaling. Crown (PFM) on 26 post-RCT.",
    },
    writtenRx: [
      {
        id: "wrx-27-a",
        title: "Written Rx",
        description: "Scanned OPD sheet (27 Jan'26)",
        pdfUrl: WRITTEN_RX_PDF_URL,
        previewImage: WRITTEN_RX_PREVIEW,
      },
    ],
  },
  {
    id: "visit-26-jan",
    dateLabel: "26 Jan'26",
    digitalRx: {
      symptoms: [
        { label: "Facial swelling", detail: "Since: 3 days | Status: Active | Site: Left buccal vestibule" },
      ],
      examinations: [
        { label: "Oral exam", detail: "Mild facial swelling, large carious lesion on 26, tenderness positive" },
      ],
      diagnoses: [
        { label: "Periapical abscess", detail: "Since: 3 days | Status: Confirmed | Associated with tooth 26" },
      ],
      dentalExamination: [
        {
          toothLabel: "Upper Left First Molar (T26)",
          treatmentHistory: [
            {
              name: "Acute periapical abscess",
              surface: "Buccal vestibule",
              since: "26 Jan'26",
              notes: "Buccal space involvement",
            },
          ],
          findings: [
            {
              name: "Large carious lesion with swelling",
              surface: "Buccal",
              since: "26 Jan'26",
              notes: "Tender on percussion",
            },
          ],
          procedures: [
            {
              name: "Incision and Drainage",
              surface: "Buccal vestibule",
              date: "26 Jan'26",
              status: "Completed",
              notes: "Under LA",
            },
          ],
          overallToothNote: "Review for RCT vs extraction after antibiotic course.",
        },
      ],
      medications: [
        {
          label: "Augmentin 625mg",
          detail: "1 tablet | 1-0-1 | After Food | 5 days",
          row: {
            medicine: "Augmentin 625mg",
            unitPerDose: "1 Tablet",
            frequency: "1 - 0 - 1",
            when: "After Food",
            duration: "5 Days",
            note: "Amoxicillin + Clavulanate for abscess",
          },
        },
        {
          label: "Metronidazole 400mg",
          detail: "1 tablet | 1-1-1 | After Food | 5 days",
          row: {
            medicine: "Metronidazole 400mg",
            unitPerDose: "1 Tablet",
            frequency: "1 - 1 - 1",
            when: "After Food",
            duration: "5 Days",
            note: "Anaerobic coverage",
          },
        },
      ],
      advice: "Incision & drainage performed. Warm saline rinse 4×/day. Review after antibiotics for RCT or extraction decision.",
      followUp: "After 5 days",
      labInvestigations: ["IOPA X-ray — 26"],
      vitals: {
        bpSystolic: "118",
        bpDiastolic: "74",
        temperature: "99.1",
        heartRate: "90",
        respiratoryRate: "20",
      },
      additionalNotes: "I&D done under LA. Pus drained. Crown (PFM) planned post-RCT.",
    },
    writtenRx: [],
  },
  {
    id: "visit-24-jan",
    dateLabel: "24 Jan'26",
    digitalRx: {
      symptoms: [
        { label: "Bleeding gums", detail: "Since: 1 month | Status: Active | During brushing" },
        { label: "Bad breath", detail: "Since: 1 month | Status: Active" },
      ],
      examinations: [
        { label: "Periodontal exam", detail: "Generalized 3-4mm pockets, bleeding on probing, moderate calculus" },
      ],
      diagnoses: [
        { label: "Chronic generalized gingivitis", detail: "Since: 1 month | Status: Confirmed | Moderate severity" },
      ],
      dentalExamination: [
        {
          toothLabel: "Full Mouth (Periodontal)",
          treatmentHistory: [],
          findings: [
            {
              name: "Generalized periodontal pockets",
              surface: "All quadrants",
              since: "24 Jan'26",
              notes: "3-4mm pockets with bleeding on probing",
            },
            {
              name: "Moderate supragingival calculus",
              surface: "All quadrants",
              since: "24 Jan'26",
            },
          ],
          procedures: [
            {
              name: "Scaling and Polishing",
              surface: "Full Mouth",
              date: "24 Jan'26",
              status: "Completed",
              notes: "Single sitting",
            },
          ],
          overallToothNote: "Modified Bass brushing technique demonstrated; 2-week review advised.",
        },
      ],
      medications: [
        {
          label: "Chlorhexidine 0.2% Mouthwash",
          detail: "10ml | Twice daily | After brushing | 2 weeks",
          row: {
            medicine: "Chlorhexidine 0.2% Mouthwash",
            unitPerDose: "10 ml",
            frequency: "1 - 0 - 1",
            when: "After Brushing",
            duration: "2 Weeks",
            note: "Do not rinse after use",
          },
        },
      ],
      advice: "Full-mouth scaling completed. Use soft-bristle brush. Modified Bass brushing technique demonstrated. Floss daily.",
      followUp: "After 2 weeks (review)",
      labInvestigations: [],
      vitals: {
        bpSystolic: "116",
        bpDiastolic: "72",
        temperature: "98.4",
        heartRate: "82",
      },
      additionalNotes: "Scaling & polishing completed in single sitting. Oral hygiene instructions given. Recall in 6 months.",
    },
    writtenRx: [
      {
        id: "wrx-24-a",
        title: "Written Rx",
        description: "Handwritten prescription (24 Jan'26)",
        pdfUrl: WRITTEN_RX_PDF_URL,
        previewImage: WRITTEN_RX_PREVIEW,
      },
    ],
  },
  {
    id: "visit-22-jan",
    dateLabel: "22 Jan'26",
    writtenRx: [
      {
        id: "wrx-22-a",
        title: "Written Rx",
        description: "Extraction consent + post-op instructions (22 Jan'26)",
        pdfUrl: WRITTEN_RX_PDF_URL,
        previewImage: WRITTEN_RX_PREVIEW,
      },
    ],
  },
  {
    id: "visit-20-jan",
    dateLabel: "20 Jan'26",
    writtenRx: [
      {
        id: "wrx-20-a",
        title: "Written Rx",
        description: "Initial consultation notes (20 Jan'26)",
        pdfUrl: WRITTEN_RX_PDF_URL,
        previewImage: WRITTEN_RX_PREVIEW,
      },
    ],
  },
]

function useIsTouchLike() {
  const [touchLike, setTouchLike] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const query = window.matchMedia("(hover: none), (pointer: coarse)")
    const update = () => {
      setTouchLike(query.matches || window.navigator.maxTouchPoints > 0)
    }

    update()
    query.addEventListener?.("change", update)

    return () => query.removeEventListener?.("change", update)
  }, [])

  return touchLike
}

function CopyAffordance({
  onCopy,
  showOnHover = true,
  hideOnTouch = false,
  copyHint = "Copy to RxPad",
  copiedLabel = "Copied to RxPad",
  className,
}: {
  onCopy: () => void
  showOnHover?: boolean
  hideOnTouch?: boolean
  copyHint?: string
  copiedLabel?: string
  className?: string
}) {
  const isTouchLike = useIsTouchLike()
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  const runCopy = () => {
    onCopy()
    setCopied(true)
    window.setTimeout(() => {
      setCopied(false)
    }, 1200)
  }

  const visibilityClass = isTouchLike
    ? hideOnTouch
      ? "pointer-events-none w-0 opacity-0"
      : "opacity-100"
    : showOnHover
      ? "opacity-0 group-hover:opacity-100 focus-within:opacity-100"
      : "opacity-100"

  const button = (
    <button
      type="button"
      aria-label={copyHint}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(event) => {
        event.stopPropagation()
        runCopy()
      }}
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-md transition-all",
        copied
          ? "bg-tp-success-50 text-tp-success-600"
          : "text-tp-blue-500 hover:bg-tp-blue-50 active:bg-tp-blue-100",
        visibilityClass,
        className,
      )}
    >
      <CopyIcon
        size={14}
        color={copied ? "var(--tp-success-600)" : "var(--tp-blue-500)"}
        variant={copied || hovered ? "Bulk" : "Linear"}
      />
    </button>
  )

  if (isTouchLike) {
    return <div className="inline-flex items-center">{button}</div>
  }

  return (
    <div className="inline-flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="top" sideOffset={4} className="rounded-lg bg-tp-slate-900 px-2 py-1 text-[11px] text-white">
          {copied ? copiedLabel : copyHint}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

function TapCopyTooltip({
  onCopy,
  copyHint = "Copy to RxPad",
  copiedLabel = "Copied to RxPad",
  className,
  children,
}: React.PropsWithChildren<{
  onCopy: () => void
  copyHint?: string
  copiedLabel?: string
  className?: string
}>) {
  const isTouchLike = useIsTouchLike()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const runCopy = () => {
    onCopy()
    setCopied(true)
    window.setTimeout(() => {
      setCopied(false)
      setOpen(false)
    }, 900)
  }

  if (!isTouchLike) {
    return <>{children}</>
  }

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          aria-label={copyHint}
          className={cn("min-w-0 text-left", className)}
          onClick={(event) => {
            event.stopPropagation()
            setOpen((prev) => !prev)
          }}
          type="button"
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent
        align="start"
        className="max-w-[180px] rounded-lg border border-tp-slate-200 bg-white px-2 py-1.5 text-[11px] leading-[16px] text-tp-slate-700 shadow-lg"
        collisionPadding={10}
        side="top"
        sideOffset={4}
      >
        <div className="flex items-center gap-2">
          <p className="min-w-0 flex-1">{copied ? copiedLabel : copyHint}</p>
          <button
            className="inline-flex shrink-0 items-center gap-1 rounded-md border border-tp-blue-200 bg-tp-blue-50 px-1.5 py-1 font-medium text-tp-blue-600"
            onClick={(event) => {
              event.stopPropagation()
              runCopy()
            }}
            type="button"
          >
            <CopyIcon
              size={12}
              color={copied ? "var(--tp-success-600)" : "var(--tp-blue-500)"}
              variant={copied ? "Bulk" : "Linear"}
            />
            <span>{copied ? "Done" : "Copy to RxPad"}</span>
          </button>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

function SymptomsIcon() {
  return <TPMedicalIcon name="Virus" variant="bulk" size={16} color="var(--tp-violet-400)" className="block h-[16px] w-[16px]" />
}

function ExamIcon() {
  return <TPMedicalIcon name="medical service" variant="bulk" size={16} color="var(--tp-violet-400)" className="block h-[16px] w-[16px]" />
}

function DiagnosisIcon() {
  return <TPMedicalIcon name="Diagnosis" variant="bulk" size={16} color="var(--tp-violet-400)" className="block h-[16px] w-[16px]" />
}

function PillIcon() {
  return <TPMedicalIcon name="Tablets" variant="bulk" size={16} color="var(--tp-violet-400)" className="block h-[16px] w-[16px]" />
}

function AdviceIcon() {
  return <TPMedicalIcon name="health care" variant="bulk" size={16} color="var(--tp-violet-400)" className="block h-[16px] w-[16px]" />
}

function ClockIcon() {
  return <Calendar2 size={16} color="var(--tp-violet-400)" variant="Bulk" className="block h-[16px] w-[16px]" />
}

function DateHeader({
  dateLabel,
  expanded,
  onToggle,
  onCopyDate,
  canCopy,
}: {
  dateLabel: string
  expanded: boolean
  onToggle: () => void
  onCopyDate: () => void
  canCopy: boolean
}) {
  const { headerRef, isStuck } = useStickyHeaderState()

  return (
    <div
      ref={headerRef as React.Ref<HTMLDivElement>}
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onToggle()
        }
      }}
      className={cn(
        "group bg-tp-slate-100 shrink-0 w-full sticky top-0 z-[4] text-left cursor-pointer",
        expanded
          ? isStuck
            ? "rounded-tl-none rounded-tr-none"
            : "rounded-tl-[10px] rounded-tr-[10px]"
          : "rounded-[10px]",
      )}
    >
      <div className="flex items-center justify-between px-[10px] py-[8px] w-full">
        <div className="flex items-center gap-1.5">
          <div className="font-['Inter',sans-serif] font-semibold text-tp-slate-700 text-[14px] tracking-[0.012px] whitespace-nowrap leading-[20px]">
            {dateLabel}
          </div>
          {canCopy ? (
            <CopyAffordance
              onCopy={onCopyDate}
              showOnHover={false}
              copyHint={`Copy all details from ${dateLabel} to RxPad`}
              copiedLabel={`${dateLabel} copied to RxPad`}
            />
          ) : null}
        </div>

        <div className="relative shrink-0 size-[18px]">
          {expanded ? (
            <ArrowSquareUp color="var(--tp-slate-500)" size={18} strokeWidth={1.5} variant="Linear" />
          ) : (
            <ArrowSquareDown color="var(--tp-slate-500)" size={18} strokeWidth={1.5} variant="Linear" />
          )}
        </div>
      </div>
    </div>
  )
}

function RxTabStrip({
  activeTab,
  onSwitch,
}: {
  activeTab: RxTab
  onSwitch: (value: RxTab) => void
}) {
  return (
    <div className="bg-white shrink-0 sticky top-[34px] w-full z-[3]">
      <div className="flex items-center pb-[10px] pt-[10px] px-[8px] gap-0 w-full">
        <button
          onClick={() => onSwitch("digital")}
          className={cn(
            "flex-1 rounded-bl-[5px] rounded-tl-[5px] py-[4px] text-center text-[14px] font-sans font-medium tracking-[0.05px]",
            "leading-[20px]",
            activeTab === "digital" ? "text-white" : "text-tp-slate-700",
          )}
          style={
            activeTab === "digital"
              ? {
                  backgroundImage: "linear-gradient(180deg, #6a69ff 0%, #3a39b2 100%)",
                  border: "0.518px solid var(--tp-blue-400)",
                }
              : {
                  backgroundImage: "linear-gradient(180.418deg, rgba(255,255,255,0) 0%, rgb(240,240,255) 100%)",
                  border: "0.518px solid var(--tp-slate-200)",
                  borderRight: "none",
                }
          }
        >
          Digital Rx
        </button>

        <button
          onClick={() => onSwitch("written")}
          className={cn(
            "flex-1 rounded-br-[5px] rounded-tr-[5px] py-[4px] text-center text-[14px] font-sans font-medium tracking-[0.05px]",
            "leading-[20px]",
            activeTab === "written" ? "text-white" : "text-tp-slate-700",
          )}
          style={
            activeTab === "written"
              ? {
                  backgroundImage: "linear-gradient(180deg, #6a69ff 0%, #3a39b2 100%)",
                  border: "0.518px solid var(--tp-blue-400)",
                }
              : {
                  backgroundImage: "linear-gradient(180.418deg, rgba(255,255,255,0) 0%, rgb(240,240,255) 100%)",
                  border: "0.518px solid var(--tp-slate-200)",
                  borderLeft: "none",
                }
          }
        >
          Written Rx
        </button>
      </div>
    </div>
  )
}

function ListSection({
  icon,
  title,
  items,
  onCopySection,
  onCopyItem,
}: {
  icon: React.ReactNode
  title: string
  items: VisitLineItem[]
  onCopySection: () => void
  onCopyItem: (item: VisitLineItem) => void
}) {
  const sectionDescriptions: Record<string, string> = {
    Symptoms: "all symptoms",
    Examination: "all examination findings",
    Diagnosis: "all diagnoses",
    "Medication (Rx)": "all medications",
  }
  const itemDescriptions: Record<string, string> = {
    Symptoms: "this symptom",
    Examination: "this finding",
    Diagnosis: "this diagnosis",
    "Medication (Rx)": "this medication",
  }

  return (
    <div className="relative shrink-0 w-full px-[12px] py-[8px] flex flex-col gap-[6px]">
      <div className="group flex items-center gap-[6px]">
        <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">{icon}</div>
        <TapCopyTooltip
          onCopy={onCopySection}
          copyHint={`Copy ${sectionDescriptions[title] ?? "all items"} to RxPad`}
          copiedLabel={`${title} copied to RxPad`}
        >
          <span className="font-sans font-semibold text-tp-slate-700 text-[14px] tracking-[0.012px] leading-[20px]">{title}</span>
        </TapCopyTooltip>
        <CopyAffordance
          onCopy={onCopySection}
          className="ml-auto"
          showOnHover
          hideOnTouch
          copyHint={`Copy ${sectionDescriptions[title] ?? "all items"} to RxPad`}
          copiedLabel={`${title} copied to RxPad`}
        />
      </div>

      <ul className="space-y-1 pl-[18px]">
        {items.map((item) => {
          const normalizedLabel = normalizePointerText(item.label)
          const normalizedDetail = normalizePointerText(item.detail)
          const detailParts = splitMetaParts(normalizedDetail)
          return (
            <li key={`${title}-${item.label}-${item.detail}`} className="group list-disc marker:text-tp-slate-500 text-[14px] leading-[20px] text-tp-slate-700">
              <div className="flex items-start justify-between gap-1.5">
                <TapCopyTooltip
                  className="min-w-0 flex-1"
                  copyHint={`Copy ${itemDescriptions[title] ?? "this item"} to RxPad`}
                  copiedLabel={`${item.label} copied to RxPad`}
                  onCopy={() => onCopyItem(item)}
                >
                  <span className="block min-w-0">
                    <span className="font-sans font-medium text-tp-slate-700">{normalizedLabel}</span>
                    {detailParts.length > 0 ? (
                      <span className="ml-1 font-sans text-[14px] leading-[20px]">
                        {renderMetaInBrackets(detailParts)}
                      </span>
                    ) : null}
                  </span>
                </TapCopyTooltip>
                <CopyAffordance
                  onCopy={() => onCopyItem(item)}
                  showOnHover
                  hideOnTouch
                  copyHint={`Copy ${itemDescriptions[title] ?? "this item"} to RxPad`}
                  copiedLabel={`${item.label} copied to RxPad`}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function AdviceSection({
  advice,
  onCopy,
}: {
  advice: string
  onCopy: () => void
}) {
  return (
    <div className="relative shrink-0 w-full px-[12px] py-[8px] flex flex-col gap-[6px]">
      <div className="group flex items-center gap-[6px]">
        <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">
          <AdviceIcon />
        </div>
        <TapCopyTooltip
          onCopy={onCopy}
          copyHint="Copy all advice to RxPad"
          copiedLabel="Advice copied to RxPad"
        >
          <span className="font-sans font-semibold text-tp-slate-700 text-[14px] tracking-[0.012px] leading-[20px]">Advice</span>
        </TapCopyTooltip>
        <CopyAffordance
          onCopy={onCopy}
          className="ml-auto"
          showOnHover
          hideOnTouch
          copiedLabel="Advice copied to RxPad"
        />
      </div>
      <TapCopyTooltip
        className="w-full pl-[18px]"
        onCopy={onCopy}
        copyHint="Copy this advice to RxPad"
        copiedLabel="Advice copied to RxPad"
      >
        <span className="font-sans text-[14px] leading-[20px] text-tp-slate-600">{advice}</span>
      </TapCopyTooltip>
    </div>
  )
}

function FollowUpSection({
  followUp,
  onCopy,
}: {
  followUp: string
  onCopy: () => void
}) {
  return (
    <div className="relative shrink-0 w-full px-[12px] py-[8px] flex flex-col gap-[6px]">
      <div className="group flex items-center gap-[6px]">
        <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">
          <ClockIcon />
        </div>
        <TapCopyTooltip
          onCopy={onCopy}
          copyHint="Copy all follow-up details to RxPad"
          copiedLabel="Follow-up copied to RxPad"
        >
          <span className="font-sans font-semibold text-tp-slate-700 text-[14px] tracking-[0.012px] leading-[20px]">Follow Up</span>
        </TapCopyTooltip>
        <CopyAffordance
          onCopy={onCopy}
          className="ml-auto"
          showOnHover
          hideOnTouch
          copiedLabel="Follow-up copied to RxPad"
        />
      </div>
      <TapCopyTooltip
        className="w-full pl-[18px]"
        onCopy={onCopy}
        copyHint="Copy this follow-up to RxPad"
        copiedLabel="Follow-up copied to RxPad"
      >
        <span className="font-sans text-[14px] leading-[20px] text-tp-slate-600">{followUp}</span>
      </TapCopyTooltip>
    </div>
  )
}

function DentalToothBlock({
  block,
}: {
  block: DentalToothVisitBlock
}) {
  const hasRows =
    block.treatmentHistory.length > 0 ||
    block.findings.length > 0 ||
    block.procedures.length > 0 ||
    Boolean(block.overallToothNote?.trim())

  if (!hasRows) return null

  const formatStructuredLine = (line: DentalStructuredLine): FormattedLine => {
    const meta = formatBracketParts([
      line.surface,
      line.since,
      line.date,
      line.status,
      line.notes,
    ])
    return {
      title: normalizePointerText(line.name),
      metaParts: meta ? splitMetaParts(meta) : [],
    }
  }

  const sectionRows: Array<{ label: string; values: FormattedLine[] }> = [
    { label: "Treatment History", values: block.treatmentHistory.map(formatStructuredLine) },
    { label: "Findings", values: block.findings.map(formatStructuredLine) },
    { label: "Procedures", values: block.procedures.map(formatStructuredLine) },
    {
      label: "Overall Tooth Notes",
      values: block.overallToothNote?.trim()
        ? [{ title: normalizePointerText(block.overallToothNote), metaParts: [] }]
        : [],
    },
  ].filter((row) => row.values.length > 0)

  return (
    <div className="relative shrink-0 w-full px-[12px] py-[8px] flex flex-col gap-[6px]">
      <div className="group flex items-center gap-[6px]">
        <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">
          <ToothIcon size={14} color="var(--tp-violet-400)" variant="Bulk" />
        </div>
        <span className="font-sans font-semibold text-tp-slate-700 text-[14px] tracking-[0.012px] leading-[20px]">
          {block.toothLabel}
        </span>
      </div>
      <ul className="space-y-[2px] pl-[18px]">
        {sectionRows.map((row) => (
          <li key={`${block.toothLabel}-${row.label}`} className="list-disc marker:text-tp-slate-500 text-[14px] leading-[20px] text-tp-slate-600">
            <span className="font-medium text-tp-slate-700">{row.label}:</span>{" "}
            {row.values.map((value, index) => (
              <React.Fragment key={`${row.label}-${index}`}>
                {index > 0 ? <span className="text-tp-slate-400">, </span> : null}
                <span className="text-tp-slate-700">{value.title}</span>
                {renderMetaInBrackets(value.metaParts)}
              </React.Fragment>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

function WrittenRxPreviewCard({
  document,
  onOpen,
  onPreview,
  onDownload,
  onPrint,
}: {
  document: WrittenRxDocument
  onOpen: (doc: WrittenRxDocument) => void
  onPreview: (doc: WrittenRxDocument) => void
  onDownload: (doc: WrittenRxDocument) => void
  onPrint: (doc: WrittenRxDocument) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(document)}
      className="group w-full overflow-hidden rounded-[10px] border border-tp-slate-100 bg-white text-left transition-colors hover:border-tp-blue-200"
    >
      <div className="h-[88px] w-full bg-tp-slate-50 overflow-hidden">
        <img alt={document.title} src={document.previewImage} className="h-full w-full object-cover opacity-85" />
      </div>
      <div className="flex items-center justify-between gap-3 px-[10px] py-[8px]">
        <div className="min-w-0">
          <p className="truncate font-sans text-[14px] font-semibold leading-[20px] text-tp-slate-700">{document.title}</p>
          <p className="truncate font-sans text-[14px] leading-[20px] text-tp-slate-400">{document.description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span
              role="button"
              tabIndex={0}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-tp-slate-600 hover:bg-tp-slate-100"
            >
              <MoreVertical color="var(--tp-slate-500)" size={16} strokeWidth={1.5} />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault()
                onPreview(document)
              }}
            >
              <Eye color="var(--tp-violet-500)" size={14} variant="Bulk" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault()
                onDownload(document)
              }}
            >
              <Import color="var(--tp-violet-500)" size={14} variant="Bulk" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault()
                onPrint(document)
              }}
            >
              <Printer color="var(--tp-violet-500)" size={14} variant="Bulk" />
              Print
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </button>
  )
}

export function PastVisitsContent() {
  const [expandedState, setExpandedState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PAST_VISITS.map((entry, index) => [entry.id, index === 0]))
  )

  const [tabState, setTabState] = useState<Record<string, RxTab>>(() =>
    Object.fromEntries(
      PAST_VISITS.map((entry) => [entry.id, entry.digitalRx ? "digital" : "written"]),
    ),
  )

  const [activeDocument, setActiveDocument] = useState<{
    dateLabel: string
    document: WrittenRxDocument
  } | null>(null)
  const [snackbar, setSnackbar] = useState<{ id: number; message: string } | null>(null)

  const orderedVisits = useMemo(() => PAST_VISITS, [])

  const showCopySnackbar = (message: string) => {
    setSnackbar({ id: Date.now(), message })
  }

  const openDocument = (dateLabel: string, document: WrittenRxDocument) => {
    setActiveDocument({ dateLabel, document })
  }

  const handleDownload = (doc: WrittenRxDocument) => {
    const anchor = window.document.createElement("a")
    anchor.href = doc.pdfUrl
    anchor.target = "_blank"
    anchor.rel = "noopener noreferrer"
    anchor.download = `${doc.title.toLowerCase().replace(/\\s+/g, "-")}.pdf`
    anchor.click()
    showCopySnackbar("Written Rx download started")
  }

  const handlePrint = (doc: WrittenRxDocument) => {
    const printWindow = window.open(doc.pdfUrl, "_blank", "noopener,noreferrer")
    if (printWindow) {
      printWindow.focus()
      window.setTimeout(() => {
        try {
          printWindow.print()
        } catch {
          // no-op
        }
      }, 500)
      showCopySnackbar("Opened print view for written Rx")
    }
  }

  return (
    <>
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full overflow-y-auto" data-sticky-scroll-root="true">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative w-full">
          {orderedVisits.map((entry) => {
            const expanded = Boolean(expandedState[entry.id])
            const hasDigital = Boolean(entry.digitalRx)
            const hasWritten = entry.writtenRx.length > 0
            const activeTab = tabState[entry.id]
            const showDigital = expanded && hasDigital && activeTab === "digital"
            const showWritten = expanded && hasWritten && (!hasDigital || activeTab === "written")
            const diagnosisItems = entry.digitalRx ? entry.digitalRx.diagnoses : []
            const medicationItems: VisitLineItem[] = entry.digitalRx
              ? entry.digitalRx.medications.map((item) => ({
                  label: normalizePointerText(item.row.medicine || item.label),
                  detail: formatMedicationDetail(item),
                }))
              : []
            const dentalToothBlocks = (entry.digitalRx?.dentalExamination ?? []).filter(
              (block) =>
                block.treatmentHistory.length > 0 ||
                block.findings.length > 0 ||
                block.procedures.length > 0 ||
                Boolean(block.overallToothNote?.trim()),
            )
            const hasClinicalContent = Boolean(
              entry.digitalRx &&
              (
                entry.digitalRx.symptoms.length > 0 ||
                entry.digitalRx.examinations.length > 0 ||
                diagnosisItems.length > 0 ||
                medicationItems.length > 0 ||
                entry.digitalRx.labInvestigations.length > 0 ||
                Boolean(entry.digitalRx.advice?.trim()) ||
                Boolean(entry.digitalRx.followUp?.trim())
              ),
            )
            const hasDentalContent = dentalToothBlocks.length > 0

            return (
              <div key={entry.id} className="relative shrink-0 w-full" style={tpSectionCardStyle}>
                <DateHeader
                  dateLabel={entry.dateLabel}
                  expanded={expanded}
                  canCopy={hasDigital}
                  onToggle={() => {
                    setExpandedState((prev) => ({
                      ...prev,
                      [entry.id]: !prev[entry.id],
                    }))
                  }}
                  onCopyDate={() => showCopySnackbar(`${entry.dateLabel} details added successfully to RxPad`)}
                />

                {expanded ? (
                  <>
                    {hasDigital && hasWritten ? (
                      <RxTabStrip
                        activeTab={activeTab}
                        onSwitch={(tab) => {
                          setTabState((prev) => ({ ...prev, [entry.id]: tab }))
                        }}
                      />
                    ) : null}

                    {showDigital && entry.digitalRx ? (
                      <>
                        {entry.digitalRx.symptoms.length > 0 ? (
                          <ListSection
                            icon={<SymptomsIcon />}
                            title="Symptoms"
                            items={entry.digitalRx.symptoms}
                            onCopySection={() => showCopySnackbar("Symptoms added successfully to RxPad")}
                            onCopyItem={(item) => showCopySnackbar(`${item.label} symptom added successfully to RxPad`)}
                          />
                        ) : null}

                        {entry.digitalRx.examinations.length > 0 ? (
                          <ListSection
                            icon={<ExamIcon />}
                            title="Examination"
                            items={entry.digitalRx.examinations}
                            onCopySection={() => showCopySnackbar("Examination findings added successfully to RxPad")}
                            onCopyItem={(item) => showCopySnackbar(`${item.label} finding added successfully to RxPad`)}
                          />
                        ) : null}

                        {diagnosisItems.length > 0 ? (
                          <ListSection
                            icon={<DiagnosisIcon />}
                            title="Diagnosis"
                            items={diagnosisItems}
                            onCopySection={() => showCopySnackbar("Diagnoses added successfully to RxPad")}
                            onCopyItem={(item) => showCopySnackbar(`${item.label} diagnosis added successfully to RxPad`)}
                          />
                        ) : null}

                        {entry.digitalRx.labInvestigations.length > 0 ? (
                          <ListSection
                            icon={<DiagnosisIcon />}
                            title="Lab Investigation"
                            items={entry.digitalRx.labInvestigations.map((item) => ({ label: item, detail: "" }))}
                            onCopySection={() => showCopySnackbar("Lab investigations added successfully to RxPad")}
                            onCopyItem={(item) => showCopySnackbar(`${item.label} added successfully to RxPad`)}
                          />
                        ) : null}

                        {medicationItems.length > 0 ? (
                          <ListSection
                            icon={<PillIcon />}
                            title="Medication (Rx)"
                            items={medicationItems}
                            onCopySection={() => showCopySnackbar("Medications added successfully to RxPad")}
                            onCopyItem={(item) => showCopySnackbar(`${item.label} medication added successfully to RxPad`)}
                          />
                        ) : null}

                        {hasDentalContent ? (
                          <div className="space-y-[8px] pb-[10px]">
                            {dentalToothBlocks.map((block) => (
                              <DentalToothBlock key={`${entry.id}-${block.toothLabel}`} block={block} />
                            ))}
                          </div>
                        ) : null}

                        {entry.digitalRx.advice.trim() ? (
                          <AdviceSection
                            advice={entry.digitalRx.advice}
                            onCopy={() => showCopySnackbar("Advice added successfully to RxPad")}
                          />
                        ) : null}

                        {entry.digitalRx.followUp.trim() ? (
                          <FollowUpSection
                            followUp={entry.digitalRx.followUp}
                            onCopy={() => showCopySnackbar("Follow-up added successfully to RxPad")}
                          />
                        ) : null}

                        {!hasClinicalContent && !hasDentalContent ? (
                          <div className="px-[12px] py-[10px]">
                            <p className="font-sans text-[12px] text-tp-slate-400">
                              No clinical or dental examination details available for this visit.
                            </p>
                          </div>
                        ) : null}
                      </>
                    ) : null}

                    {showWritten ? (
                      <div className="space-y-2 px-[10px] py-[10px]">
                        {entry.writtenRx.map((document) => (
                          <WrittenRxPreviewCard
                            key={document.id}
                            document={document}
                            onOpen={(selectedDocument) => openDocument(entry.dateLabel, selectedDocument)}
                            onPreview={(selectedDocument) => {
                              openDocument(entry.dateLabel, selectedDocument)
                              showCopySnackbar("Opened written Rx preview")
                            }}
                            onDownload={handleDownload}
                            onPrint={handlePrint}
                          />
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>

      <TPDrawer
        open={Boolean(activeDocument)}
        onOpenChange={(open) => {
          if (!open) setActiveDocument(null)
        }}
      >
        <TPDrawerContent side="right" size="xl" className="p-0 w-[min(90vw,860px)] sm:max-w-none">
          <TPDrawerHeader className="space-y-3">
            <div>
              <TPDrawerTitle>
                {activeDocument?.document.title ?? "Written Rx PDF"}
              </TPDrawerTitle>
              <TPDrawerDescription>
                {activeDocument ? `${activeDocument.dateLabel} • ${activeDocument.document.description}` : ""}
              </TPDrawerDescription>
            </div>
            {activeDocument ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md border border-tp-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-tp-slate-700 hover:bg-tp-slate-50"
                  onClick={() => showCopySnackbar("Preview is open")}
                >
                  <Eye color="currentColor" size={14} strokeWidth={1.5} variant="Linear" />
                  Preview
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md border border-tp-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-tp-slate-700 hover:bg-tp-slate-50"
                  onClick={() => handleDownload(activeDocument.document)}
                >
                  <Import color="currentColor" size={14} strokeWidth={1.5} variant="Linear" />
                  Download
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md border border-tp-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-tp-slate-700 hover:bg-tp-slate-50"
                  onClick={() => handlePrint(activeDocument.document)}
                >
                  <Printer color="currentColor" size={14} strokeWidth={1.5} variant="Linear" />
                  Print
                </button>
              </div>
            ) : null}
          </TPDrawerHeader>

          <div className="h-[calc(100vh-128px)] bg-tp-slate-50 p-4">
            <object
              data={activeDocument?.document.pdfUrl}
              type="application/pdf"
              className="h-full w-full rounded-lg border border-tp-slate-200 bg-white"
            >
              <div className="flex h-full flex-col items-center justify-center gap-3">
                {activeDocument ? (
                  <img
                    alt={activeDocument.document.title}
                    src={activeDocument.document.previewImage}
                    className="max-h-[70vh] w-auto rounded-md border border-tp-slate-200"
                  />
                ) : null}
                <p className="text-sm text-tp-slate-500">PDF preview unavailable. Use a browser with PDF support.</p>
              </div>
            </object>
          </div>
        </TPDrawerContent>
      </TPDrawer>

      <TPSnackbar
        key={snackbar?.id ?? 0}
        open={Boolean(snackbar)}
        message={snackbar?.message ?? ""}
        severity="success"
        autoHideDuration={1800}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={(_, reason) => {
          if (reason === "clickaway") return
          setSnackbar(null)
        }}
      />
    </>
  )
}
