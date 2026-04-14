/**
 * Voice-to-Structured-RX Engine
 *
 * POC implementation: keyword-based extraction that parses spoken clinical
 * dictation into structured RxPad sections (symptoms, examination, diagnosis,
 * medication, advice, investigation, follow-up, history).
 */

import type {
  VoiceStructuredRxData,
  VoiceRxSection,
  VoiceRxItem,
  SmartSummaryData,
  DentalScanToothRow,
  VoiceClinicalExamLead,
} from "../types"
import type { RxPadCopyPayload, RxPadMedicationSeed } from "@/components/tp-rxpad/rxpad-sync-context"
import { TEETH, type ZoneId } from "@/components/dental/examination/types"
import { buildDentalExaminationLine } from "../cards/shared/DentalExaminationToothBlock"

// ─── Section detection rules ─────────────────────────────────────

interface SectionRule {
  sectionId: string
  title: string
  tpIconName: string
  /** Keywords that start a section context */
  startKeywords: string[]
  /** Keywords that identify items within this section */
  itemKeywords: string[]
}

const SECTION_RULES: SectionRule[] = [
  {
    sectionId: "symptoms",
    title: "Symptoms",
    tpIconName: "thermometer",
    startKeywords: ["complaining of", "suffering from", "symptoms include", "presenting with", "chief complaint", "c/o"],
    itemKeywords: ["fever", "cough", "cold", "pain", "headache", "nausea", "vomiting", "diarrhea", "weakness", "fatigue", "redness", "swelling", "rash", "itching", "breathlessness", "chest pain", "abdominal pain", "sore throat", "body ache", "loss of appetite", "burning", "discharge", "sneezing", "runny nose", "congestion"],
  },
  {
    sectionId: "examination",
    title: "Examination",
    tpIconName: "medical service",
    startKeywords: ["on examination", "o/e", "examination findings", "examination reveals", "on exam", "physical examination"],
    itemKeywords: ["tenderness", "chest clear", "bilateral", "no lymphadenopathy", "heart sounds", "normal", "lungs clear", "abdomen soft", "throat congested", "tonsils", "pharyngeal", "conjunctival", "injection"],
  },
  {
    sectionId: "diagnosis",
    title: "Diagnosis",
    tpIconName: "Diagnosis",
    startKeywords: ["diagnosis", "diagnosed with", "impression", "assessment", "provisional diagnosis", "final diagnosis", "d/d"],
    itemKeywords: ["viral", "bacterial", "rhinitis", "pharyngitis", "conjunctivitis", "bronchitis", "gastritis", "UTI", "URTI", "LRTI", "allergic", "acute", "chronic"],
  },
  {
    sectionId: "medication",
    title: "Medication",
    tpIconName: "Tablets",
    startKeywords: ["prescribing", "prescribed", "medication", "medicines", "rx", "tab", "cap", "syrup", "drops"],
    itemKeywords: ["mg", "tablet", "capsule", "syrup", "drops", "ointment", "cream", "gel", "injection", "ml", "paracetamol", "amoxicillin", "azithromycin", "cetirizine", "pantoprazole", "ibuprofen", "dolo", "crocin", "augmentin", "metformin", "amlodipine"],
  },
  {
    sectionId: "advice",
    title: "Advice",
    tpIconName: "health care",
    startKeywords: ["advising", "advised", "advice", "counselled", "instructions"],
    itemKeywords: ["rest", "fluids", "warm water", "steam inhalation", "salt gargle", "avoid", "light diet", "stay home", "no spicy food", "hydration", "exercise", "walking", "deep breathing"],
  },
  {
    sectionId: "investigation",
    title: "Lab Investigation",
    tpIconName: "Test Tube",
    startKeywords: ["suggest test", "order test", "investigations", "labs ordered", "send for", "advise tests"],
    itemKeywords: ["CBC", "ESR", "CRP", "LFT", "RFT", "TFT", "HbA1c", "lipid profile", "urine routine", "blood sugar", "X-ray", "ECG", "ultrasound", "CT", "MRI"],
  },
  {
    sectionId: "followUp",
    title: "Follow-up",
    tpIconName: "Calendar",
    startKeywords: ["follow up", "follow-up", "come back", "review in", "next visit", "revisit"],
    itemKeywords: ["days", "week", "weeks", "month", "months", "if not better", "SOS", "as needed"],
  },
  {
    sectionId: "history",
    title: "Medical History",
    tpIconName: "pill",
    startKeywords: ["history of", "past history", "known case of", "h/o", "chronic"],
    itemKeywords: ["hypertension", "diabetes", "asthma", "thyroid", "PCOD", "surgery", "allergy"],
  },
]

// ─── Parsing logic ───────────────────────────────────────────────

function extractSections(text: string): VoiceRxSection[] {
  const sentences = text.split(/[.;]+/).map((s) => s.trim()).filter(Boolean)
  const result: VoiceRxSection[] = []

  // Track which sentences are claimed by startKeyword matches (higher priority)
  const claimedSentences = new Set<number>()

  // First pass: claim sentences that match startKeywords
  for (const rule of SECTION_RULES) {
    for (let si = 0; si < sentences.length; si++) {
      const sentenceLower = sentences[si].toLowerCase()
      if (rule.startKeywords.some((kw) => sentenceLower.includes(kw))) {
        claimedSentences.add(si)
      }
    }
  }

  // Second pass: extract items per section
  for (const rule of SECTION_RULES) {
    const rawItems: string[] = []

    for (let si = 0; si < sentences.length; si++) {
      const sentence = sentences[si]
      const sentenceLower = sentence.toLowerCase()

      const isStartKeyword = rule.startKeywords.some((kw) => sentenceLower.includes(kw))

      // Only use itemKeyword matching for unclaimed sentences
      const matchingItemKeywords = !claimedSentences.has(si)
        ? rule.itemKeywords.filter((kw) => sentenceLower.includes(kw.toLowerCase()))
        : []

      if (isStartKeyword || matchingItemKeywords.length > 0) {
        // Clean up the sentence — remove leading section keywords
        let cleaned = sentence
        for (const kw of rule.startKeywords) {
          const regex = new RegExp(`${kw}\\s*:?\\s*`, "i")
          cleaned = cleaned.replace(regex, "")
        }
        cleaned = cleaned.trim()

        if (cleaned.length > 0) {
          // Split multi-item sentences on commas or "and"
          if (rule.sectionId === "medication" || rule.sectionId === "symptoms") {
            const parts = cleaned.split(/,\s*|\s+and\s+/).map((p) => p.trim()).filter(Boolean)
            rawItems.push(...parts)
          } else {
            rawItems.push(cleaned)
          }
        }
      }
    }

    if (rawItems.length > 0) {
      const unique = [...new Set(rawItems)]
      // Convert plain strings to VoiceRxItem with name/detail split
      const items: VoiceRxItem[] = unique.map((raw) => parseToVoiceRxItem(raw, rule.sectionId))
      result.push({
        sectionId: rule.sectionId,
        title: rule.title,
        tpIconName: rule.tpIconName,
        items,
      })
    }
  }

  return result
}

const PRIMARY_SECTION_IDS = new Set(["symptoms", "medication", "investigation"])

const VALID_FDI = new Set(TEETH.map((t) => t.fdi))

/** Assistant + card intro (single source of truth for voice structured replies). */
export const VOICE_RX_LEAD_IN =
  "Voice recorder card below — structured Rx sections and dental tooth cards — copy all to RxPad or apply each tooth to the chart."

function ensureDentalTooth(map: Map<string, DentalScanToothRow>, fdi: string) {
  if (!map.has(fdi)) map.set(fdi, { fdi })
}

function truncateDentalNote(s: string, max = 180): string {
  const t = s.trim()
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`
}

const MONTH_TO_SHORT: Record<string, string> = {
  january: "Jan",
  february: "Feb",
  march: "Mar",
  april: "Apr",
  may: "May",
  june: "Jun",
  july: "Jul",
  august: "Aug",
  september: "Sep",
  october: "Oct",
  november: "Nov",
  december: "Dec",
}

function extractSinceLabel(sentence: string): string | undefined {
  if (/\baugust\s+20\s*22\b/i.test(sentence) || /\baug(?:ust)?\s*['']?\s*22\b/i.test(sentence)) return "Aug 2022"
  const long = sentence.match(
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(20\d{2})\b/i,
  )
  if (long) {
    const mon = MONTH_TO_SHORT[long[1].toLowerCase()]
    if (mon) return `${mon} ${long[2]}`
  }
  const short = sentence.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\.?\s+(20\d{2})\b/i)
  if (short) {
    const u = short[1].toLowerCase().slice(0, 3)
    const map: Record<string, string> = {
      jan: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", may: "May", jun: "Jun",
      jul: "Jul", aug: "Aug", sep: "Sep", oct: "Oct", nov: "Nov", dec: "Dec",
    }
    const mon = map[u]
    if (mon) return `${mon} ${short[2]}`
  }
  return undefined
}

function inferZoneFromSentence(sentence: string): ZoneId {
  const s = sentence.toLowerCase()
  if (/\bmesial\b/.test(s)) return "mesial"
  if (/\bdistal\b/.test(s)) return "distal"
  if (/\bocclusal|incisal\b/.test(s)) return "occlusal"
  if (/\bpalatal\b/.test(s)) return "lingual"
  if (/\blingual\b/.test(s)) return "lingual"
  if (/\blateral|labial|buccal\b/.test(s)) return "buccal"
  if (/\bcervical\b/.test(s)) return "cervical"
  return "occlusal"
}

function isClinicalDentalSentence(sentence: string): boolean {
  const s = sentence.toLowerCase()
  return (
    /\b(dental|dentition|tooth|teeth|molar|premolar|canine|incisor|occlusal|buccal|mesial|distal|gingiv|implant|peri[- ]?implant|cavity|caries|decay|lesion|restoration|composite|crown|rct|root\s+canal|stain|labial|palatal|lateral|surface|dictation|examination)\b/.test(
      s,
    )
    || /\b(?:tooth|tee?th|t\.?)\s*(?:number\s+)?\d{2}\b/i.test(sentence)
    || /\bfdi\s*\d{2}\b/i.test(sentence)
  )
}

/** Strip common date phrases so years (e.g. August 22) are not parsed as FDI 22. */
function stripApproxDatesForFdiScan(sentence: string): string {
  return sentence
    .replace(/\baug(?:ust)?\s*['']?\s*\d{2}\b/gi, " ")
    .replace(/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(19|20)\d{2}\b/gi, " ")
}

function fdisInSentence(sentence: string): string[] {
  const scrubbed = stripApproxDatesForFdiScan(sentence)
  const out: string[] = []
  const seen = new Set<string>()
  for (const m of scrubbed.matchAll(/\b(\d{2})\b/g)) {
    const f = m[1]
    if (VALID_FDI.has(f) && !seen.has(f)) {
      seen.add(f)
      out.push(f)
    }
  }
  return out
}

function patchDentalTooth(map: Map<string, DentalScanToothRow>, fdi: string, patch: Partial<DentalScanToothRow>) {
  const cur = map.get(fdi) ?? { fdi }
  const next: DentalScanToothRow = { ...cur, fdi }
  if (patch.diagnoses?.length) {
    next.diagnoses = [...new Set([...(cur.diagnoses ?? []), ...patch.diagnoses])]
  }
  if (patch.findings?.length) {
    next.findings = [...(cur.findings ?? []), ...patch.findings]
  }
  if (patch.treatmentHistoryRows?.length) {
    next.treatmentHistoryRows = [...(cur.treatmentHistoryRows ?? []), ...patch.treatmentHistoryRows]
  }
  if (patch.procedures?.length) {
    next.procedures = [...(cur.procedures ?? []), ...patch.procedures]
  }
  if (patch.treatmentHistory?.length) {
    next.treatmentHistory = [...(cur.treatmentHistory ?? []), ...patch.treatmentHistory]
  }
  if (patch.scannerNotes?.trim()) {
    const add = patch.scannerNotes.trim()
    next.scannerNotes = cur.scannerNotes?.trim() ? `${cur.scannerNotes.trim()} ${add}` : add
  }
  if (patch.implant !== undefined) next.implant = patch.implant
  map.set(fdi, next)
}

/**
 * Heuristic extraction of dental examination from voice (FDI, common tooth names, keywords).
 */
export function extractDentalTeethFromVoice(text: string): DentalScanToothRow[] {
  const map = new Map<string, DentalScanToothRow>()

  const namedPairs: Array<[RegExp, string]> = [
    [/upper\s+left\s+lateral\s+incisor/i, "22"],
    [/upper\s+left\s+central\s+incisor/i, "21"],
    [/upper\s+left\s+canine/i, "23"],
    [/upper\s+left\s+first\s+premolar/i, "24"],
    [/upper\s+left\s+second\s+premolar/i, "25"],
    [/upper\s+left\s+first\s+molar/i, "26"],
    [/upper\s+left\s+second\s+molar/i, "27"],
    [/upper\s+right\s+first\s+molar/i, "16"],
    [/upper\s+right\s+second\s+molar/i, "17"],
    [/lower\s+left\s+first\s+molar/i, "36"],
    [/lower\s+right\s+first\s+molar/i, "46"],
  ]
  for (const [re, fdi] of namedPairs) {
    if (re.test(text)) ensureDentalTooth(map, fdi)
  }

  const fdiPattern = /\b(?:tooth|tee?th|t\.?)\s*(\d{2})\b|\bt\s*(\d{2})\b|\bfdi\s*(\d{2})\b/gi
  let m: RegExpExecArray | null
  while ((m = fdiPattern.exec(text)) !== null) {
    const fdi = (m[1] || m[2] || m[3]) as string
    if (VALID_FDI.has(fdi)) ensureDentalTooth(map, fdi)
  }

  for (const sentence of text.split(/[.;]+/).map((s) => s.trim()).filter(Boolean)) {
    if (!isClinicalDentalSentence(sentence)) continue
    const fdis = fdisInSentence(sentence)
    if (fdis.length === 0) continue

    const zone = inferZoneFromSentence(sentence)
    const newFindings: NonNullable<DentalScanToothRow["findings"]> = []
    if (/\bcaries|cavity|decay|lesion\b/i.test(sentence)) {
      newFindings.push({ zoneId: zone, type: "Caries", notes: truncateDentalNote(sentence) })
    }
    if (/\bstain|staining\b/i.test(sentence)) {
      newFindings.push({ zoneId: zone, type: "Staining", notes: truncateDentalNote(sentence) })
    }
    if (/\bcalculus|plaque\b/i.test(sentence)) {
      newFindings.push({ zoneId: "cervical", type: "Calculus", notes: truncateDentalNote(sentence) })
    }

    const newDx: string[] = []
    if (/\brct|root\s+canal\b/i.test(sentence)) newDx.push("RCT")
    if (
      /\bcrown\b/i.test(sentence)
      && !/\bimplant\s*(?:with|\+)\s*crown\b/i.test(sentence)
      && !/\bcrown\s+on\s+implant\b/i.test(sentence)
    ) {
      newDx.push("Crown")
    }

    const implantMention = /\bimplant\b/i.test(sentence)
    const since = extractSinceLabel(sentence)

    for (const fdi of fdis) {
      const patch: Partial<DentalScanToothRow> = {
        findings: newFindings.length ? newFindings : undefined,
        diagnoses: newDx.length ? newDx : undefined,
      }
      if (implantMention) {
        patch.implant = true
        patch.treatmentHistoryRows = [
          {
            name: "Endosseous implant + superstructure",
            surface: "Whole tooth",
            since,
            notes: since ? "Placement date per patient report" : "Confirm placement date in records",
          },
        ]
      }
      if (/\bpatient\s+(states|says|reports)\b/i.test(sentence) || (implantMention && since)) {
        patch.scannerNotes = truncateDentalNote(sentence)
      }
      patchDentalTooth(map, fdi, patch)
    }
  }

  return [...map.values()].sort((a, b) => a.fdi.localeCompare(b.fdi, undefined, { numeric: true }))
}

/** Rich demo tooth rows when transcript mentions dental but FDI extraction is thin */
const DEMO_VOICE_DENTAL_TEETH: DentalScanToothRow[] = [
  {
    fdi: "22",
    implant: true,
    treatmentHistoryRows: [
      {
        name: "Endosseous implant + crown",
        surface: "Whole tooth",
        since: "Aug 2022",
        notes: "Patient recalls placement in August 2022; verify fixture brand in chart",
      },
    ],
    findings: [
      { zoneId: "buccal", type: "Staining", notes: "Light supragingival — polish vs monitor" },
      { zoneId: "cervical", type: "Calculus", notes: "Peri-implant plaque; reinforced hygiene" },
    ],
    scannerNotes: "Occlusion feels stable; no patient-reported mobility. Soft tissue 2–3 mm probing buccal — chart at recall.",
  },
  {
    fdi: "24",
    treatmentHistoryRows: [
      {
        name: "Resin sealant",
        surface: "Occlusal",
        since: "2016",
        notes: "Partial loss on mesial aspect",
      },
    ],
    findings: [
      {
        zoneId: "buccal",
        type: "Caries",
        notes: "Cavitated lesion on lateral / buccal surface extending toward contact; bitewing advised",
      },
    ],
    scannerNotes: "Cold test: delayed response vs adjacent; rule out reversible pulpitis before definitive restoration.",
  },
]

function ensureSection(
  sections: VoiceRxSection[],
  sectionId: string,
  title: string,
  tpIconName: string,
  items: VoiceRxItem[],
): VoiceRxSection[] {
  if (items.length === 0) return sections
  if (sections.some((s) => s.sectionId === sectionId)) return sections
  return [...sections, { sectionId, title, tpIconName, items }]
}

function voiceTranscriptLooksDentalButNoTeeth(text: string, extracted: DentalScanToothRow[]): boolean {
  if (extracted.length > 0) return false
  const t = text.toLowerCase()
  if (!/\b(tooth|teeth|dental|dentition|molar|premolar|canine|incisor|occlusal|buccal|gingiv|fdi|implant|cavity|lateral)\b/.test(t)) {
    return false
  }
  return (
    /\b(?:tooth|tee?th|t\.?|fdi)\s*(?:number\s+)?\d{2}\b/i.test(text)
    || /\b(?:t|fdi)\s*\d{2}\b/i.test(text)
    || /upper\s+left\s+(lateral\s+incisor|first\s+premolar|first\s+molar)/i.test(text)
    || /upper\s+right\s+first\s+molar/i.test(text)
    || /lower\s+left\s+first\s+molar/i.test(text)
    || /lower\s+right\s+first\s+molar/i.test(text)
  )
}

const PRIMARY_VOICE_SECTION_ORDER = ["symptoms", "medication", "investigation"] as const

export function sortPrimaryVoiceSections(sections: VoiceRxSection[]): VoiceRxSection[] {
  const rank = (id: string) => {
    const i = PRIMARY_VOICE_SECTION_ORDER.indexOf(id as (typeof PRIMARY_VOICE_SECTION_ORDER)[number])
    return i === -1 ? 100 : i
  }
  return [...sections].sort((a, b) => rank(a.sectionId) - rank(b.sectionId))
}

export function formatVoiceRxItemPublic(item: VoiceRxItem): string {
  return item.detail ? `${item.name} (${item.detail})` : item.name
}

function buildVoiceClinicalExam(
  _text: string,
  _sections: VoiceRxSection[],
  _dentalTeeth: DentalScanToothRow[] | undefined,
): VoiceClinicalExamLead {
  const subtitle = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return {
    title: "Voice recorder",
    subtitle,
  }
}

/** Merge voice parse with chart-backed lines when sections are empty — demo-quality structured Rx. */
export function enrichVoiceStructuredWithPatientContext(
  text: string,
  summary: SmartSummaryData,
): VoiceStructuredRxData {
  const base = parseVoiceToStructuredRx(text)
  let sections = [...base.sections]
  let dentalTeeth = [...(base.dentalTeeth ?? [])]
  const lv = summary.lastVisit
  const intake = summary.symptomCollectorData

  if (!sections.some((s) => s.sectionId === "symptoms")) {
    const items: VoiceRxItem[] = []
    if (intake?.symptoms?.length) {
      items.push(
        ...intake.symptoms.slice(0, 5).map((s) => ({
          name: s.name,
          detail: [s.duration, s.severity].filter(Boolean).join(" · ") || undefined,
        })),
      )
    } else if (lv?.symptoms) {
      items.push({ name: lv.symptoms })
    }
    sections = ensureSection(sections, "symptoms", "Symptoms", "thermometer", items)
  }

  if (!sections.some((s) => s.sectionId === "medication")) {
    const items: VoiceRxItem[] = []
    if (lv?.medication) {
      const parts = lv.medication.split(",").map((p) => p.trim()).filter(Boolean).slice(0, 6)
      items.push(...parts.map((m) => ({ name: m })))
    } else if (summary.activeMeds?.length) {
      items.push(...summary.activeMeds.slice(0, 4).map((m) => ({ name: m })))
    }
    sections = ensureSection(sections, "medication", "Medication", "Tablets", items)
  }

  if (!sections.some((s) => s.sectionId === "investigation")) {
    const items: VoiceRxItem[] = []
    if (lv?.labTestsSuggested?.trim()) {
      const parts = lv.labTestsSuggested.split(/[,;]+/).map((p) => p.trim()).filter(Boolean).slice(0, 8)
      items.push(...parts.map((name) => ({ name })))
    }
    sections = ensureSection(sections, "investigation", "Lab Investigation", "Test Tube", items)
  }

  if (voiceTranscriptLooksDentalButNoTeeth(text, dentalTeeth)) {
    dentalTeeth = [...DEMO_VOICE_DENTAL_TEETH]
  }
  if (dentalTeeth.length === 0 && text.trim().length > 0) {
    dentalTeeth = [...DEMO_VOICE_DENTAL_TEETH]
  }

  const copyAllPayload = buildCopyPayload(sections, dentalTeeth.length ? dentalTeeth : undefined)
  const clinicalExam = buildVoiceClinicalExam(text, sections, dentalTeeth.length ? dentalTeeth : undefined)

  return {
    voiceText: text,
    sections,
    dentalTeeth: dentalTeeth.length ? dentalTeeth : undefined,
    leadInText: VOICE_RX_LEAD_IN,
    clinicalExam,
    copyAllPayload,
  }
}

/** Convert a raw extracted string into a VoiceRxItem with name/detail separation */
function parseToVoiceRxItem(raw: string, sectionId: string): VoiceRxItem {
  // Medication: try to split "Paracetamol 650mg 1-0-1 for 5 days" → name + freq/duration
  if (sectionId === "medication") {
    const freqMatch = raw.match(/\b(\d+-\d+-\d+(?:-\d+)?\s*.*)$/)
    if (freqMatch?.index && freqMatch.index > 0) {
      return { name: raw.slice(0, freqMatch.index).trim(), detail: freqMatch[1].trim() }
    }
  }
  // Symptoms: try to split "fever since 3 days" or "fever (3 days)"
  if (sectionId === "symptoms") {
    const sinceMatch = raw.match(/\s+(?:since|for|from|×|x)\s+(.+)$/i)
    if (sinceMatch?.index && sinceMatch.index > 0) {
      return { name: raw.slice(0, sinceMatch.index).trim(), detail: sinceMatch[1].trim() }
    }
    const parenMatch = raw.match(/^(.+?)\s*\(([^)]+)\)\s*$/)
    if (parenMatch) {
      return { name: parenMatch[1].trim(), detail: parenMatch[2].trim() }
    }
  }
  // Follow-up: try to split "Review in 5 days" → name + detail
  if (sectionId === "followUp") {
    const inMatch = raw.match(/\s+(?:in|after)\s+(.+)$/i)
    if (inMatch?.index && inMatch.index > 0) {
      return { name: raw.slice(0, inMatch.index).trim(), detail: inMatch[1].trim() }
    }
  }
  return { name: raw }
}

/** Format a VoiceRxItem back to a plain string */
function formatVoiceRxItem(item: VoiceRxItem): string {
  return item.detail ? `${item.name} (${item.detail})` : item.name
}

// ─── Build copy payload from sections ────────────────────────────

function buildCopyPayload(sections: VoiceRxSection[], dentalTeeth?: DentalScanToothRow[]): RxPadCopyPayload {
  const payload: RxPadCopyPayload = {
    sourceDateLabel: "Voice capture",
  }

  for (const section of sections) {
    const plainItems = section.items.map(formatVoiceRxItem)
    switch (section.sectionId) {
      case "symptoms":
        payload.symptoms = plainItems
        break
      case "medication":
        payload.medications = plainItems.map(parseMedString)
        break
      case "investigation":
        payload.labInvestigations = plainItems
        break
    }
  }

  if (dentalTeeth?.length) {
    payload.examinations = dentalTeeth.map(buildDentalExaminationLine)
  }

  return payload
}

/** Parse a medication string into RxPadMedicationSeed */
export function parseMedString(med: string): RxPadMedicationSeed {
  // Try to extract dose pattern: "Paracetamol 650mg 1-0-1 after food for 5 days"
  const parts = med.trim()
  const frequencyMatch = parts.match(/\b(\d+-\d+-\d+(?:-\d+)?)\b/)
  const durationMatch = parts.match(/(?:for\s+)?(\d+\s+(?:days?|weeks?|months?))/i)
  const whenMatch = parts.match(/\b(before food|after food|before breakfast|after breakfast|before lunch|after lunch|before dinner|after dinner|with food|empty stomach|SOS)\b/i)

  // Extract medicine name — everything before frequency/duration/when
  let medicineName = parts
  if (frequencyMatch?.index) {
    medicineName = parts.slice(0, frequencyMatch.index).trim()
  }

  return {
    medicine: medicineName || med,
    unitPerDose: "1 tablet",
    frequency: frequencyMatch?.[1] ?? "1-0-1",
    when: whenMatch?.[1] ?? "After Food",
    duration: durationMatch?.[1] ?? "5 days",
    note: "From voice input",
  }
}

// ─── Public API ──────────────────────────────────────────────────

export function parseVoiceToStructuredRx(text: string): VoiceStructuredRxData {
  const allSections = extractSections(text)
  const primary = allSections.filter((s) => PRIMARY_SECTION_IDS.has(s.sectionId))
  const dentalTeethRaw = extractDentalTeethFromVoice(text)
  const dentalTeeth = dentalTeethRaw.length ? dentalTeethRaw : undefined
  const copyAllPayload = buildCopyPayload(primary, dentalTeeth)

  const clinicalExam = buildVoiceClinicalExam(text, primary, dentalTeeth)

  return {
    voiceText: text,
    sections: primary,
    dentalTeeth,
    leadInText: VOICE_RX_LEAD_IN,
    clinicalExam,
    copyAllPayload,
  }
}
