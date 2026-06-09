# Dental module — recent changes

A short reference doc for the dev team. Each section is "what was there
→ what's now there, and why." Use it as a delta over the existing code
base. Only changes the dev team needs to know about are listed.

---

## 1. Print supports Adult, Pediatric & Mixed dentitions

**Where:** `components/dental/examination/FlatDentitionChart.jsx`,
`components/dental/examination/DentalChartPrint.jsx`,
`components/tp-rxpad/RxPreviewDocument.jsx`,
`components/dental/examination/ExaminationTab.jsx`.

**Before.** The "Print Dental Chart" button printed an **adult-only**
odontogram regardless of which patient-type pill the doctor had selected
in the canvas (Adult / Pediatric / Mixed). For pediatric patients,
recorded primary-FDI teeth (51–85) didn't render at all; for mixed
patients the print only showed the permanent half. The button passed
`patientType` to the dropdown row labels ("Plain pediatric dental chart")
but never to the renderer.

**After.** `DentalChartPrintButton` now threads `patientType` through
`PrintRunner` → `RxPreviewDocument` (`settings.patientType`) → the
underlying `FlatDentitionChart`. The chart component:

- Defines two new row constants — `UPPER_ROW_PRIMARY` and
  `LOWER_ROW_PRIMARY` (10 FDIs per row, 5 + 5).
- Introduces a `PRIMARY_TO_ADULT_FDI` map + `toothImageFdi()` so the
  primary FDIs render using their adult-anatomical-equivalent's WebP
  (the project ships 32 adult tooth images; we don't need separate
  primary art).
- Parameterises the right/left split — `Math.floor(fdis.length / 2)` —
  so the same row builder works for the 16-tooth permanent rows and the
  10-tooth primary rows.
- Renders **one arch pair for adult / pediatric** and **two stacked arch
  pairs for mixed** (permanent on top, primary below, both labelled
  internally as "PERMANENT" / "PRIMARY").

`toDentalPreviewSections()` in `ExaminationTab.jsx` got a small
`findToothDef()` helper that looks up an FDI in `TEETH` first and falls
back to `PEDIATRIC_TEETH`. Three call sites switched over so pediatric
FDIs resolve to proper quadrant + name labels (e.g. "Upper Right First
Molar (T54)") instead of falling back to "Tooth (T54)".

**Validate:** Switch the patient pill to Pediatric → click 🖨 → "Plain
pediatric dental chart" → you should see a 20-tooth primary odontogram.
Switch to Mixed → "Historical mixed dental chart" → two stacked arch
pairs with every recorded site rendered.

---

## 2. Printed chart heading shows the dentition type

**Where:** `components/dental/examination/FlatDentitionChart.jsx`
(the `<h3>` directly above the odontogram).

**Before.** The heading on the printed odontogram always read
`Dental Chart` — even when the chart underneath was the pediatric
primary 20-tooth layout or the mixed 4-row stack. The printout couldn't
tell you, on its own, which dentition the doctor had selected.

**After.** The heading reflects the `patientType` that's already
threaded through to this component for §1:

| `patientType`        | Heading                |
|----------------------|------------------------|
| `"adult"` (default)  | **Adult Dental Chart**     |
| `"pediatric"`        | **Pediatric Dental Chart** |
| `"mixed"`            | **Mixed Dental Chart**     |

End-to-end consistency now: the Print dropdown row label, the runner
label, and the heading printed on the page all say the same thing.
Mixed mode still keeps its **PERMANENT** / **PRIMARY** internal section
labels above each arch pair — the new top-level heading just gives the
overall context.

---

## 3. `SINCE` → `WHEN` for Past Procedures, plus SinceDropdown updates

**Where:** `components/dental/examination/ExaminationTab.jsx`
(`OralTable`, `PrimaryDiagnosisBody`, `SinceDropdown`),
`components/dental/examination/ExaminationTab.ui.module.scss`.

### 3a. Column header rename

**Before.** Past Procedures, Findings, Procedures and Symptoms — every
table called the date column **"SINCE"**.

**After.** Findings and Symptoms still call it **SINCE** (they record
onset duration). **Past Procedures now reads "WHEN"** — the field means
"when was the procedure performed", which "since" worded awkwardly.
Renames applied to:

- `OralTable` header (kind-aware:
  `kind === "past" ? "WHEN" : "SINCE"`).
- `PrimaryDiagnosisBody` header (single-tooth past procedures, dental
  side).

No data-model change — same field, clearer column label.

### 3b. SinceDropdown — dynamic numeric suggestions

**Before.** The suggestion list was hard-coded
`["1 day", "1 week", "1 month", "1 year"]`. Typing a number had no
effect on what was shown.

**After.** The `options` `useMemo` parses the leading digits from the
input. Typing `2` rewrites the list to
`["2 days", "2 weeks", "2 months", "2 years"]`; any leading 1–99 drives
the multiplier; an empty input falls back to the singular form. Doctors
get the same canonical four options at whichever scale they're typing.

### 3c. SinceDropdown — native picker positioning

**Before.** The hidden `<input type="date">` lived at
`right: 8, top: 50%` of the cell, so calling `showPicker()` anchored
the OS calendar against the cell's right edge — not below it.

**After.** The hidden input now overlays the visible field
(`position: absolute; inset: 0; opacity: 0; pointer-events: none`).
`showPicker()` now drops the OS calendar **directly below the cell**,
matching where the suggestion popover already sits.

### 3d. SINCE column width fix

**Before.** Input right-padding was `30px` and the SINCE columns were
declared as narrow as 90–110 px. A full date string ("07 Jul 2026")
overlapped the calendar icon.

**After.** Input right-padding bumped 30 → **38px**. All four
SINCE/WHEN columns widened to **`width: 150, minWidth: 140`**
(`OralTable`, `EntryTab` for findings + symptoms, `DentalSymptomsBody`,
`PrimaryDiagnosisBody`). "07 Jul 2026" now sits flush against the
padding with the calendar icon free of overlap.

---

## 4. Group dental examination by Tooth or by Type (default: By Type)

**Where:** `components/tp-rxpad/PrintSettingsDrawer.jsx`,
`components/tp-rxpad/imports/RxpadHeader.jsx`,
`components/tp-rxpad/RxPreviewDocument.jsx`,
`components/tp-rxpad/EndVisitPage.jsx`.

**Before.** The dental examination section of the printed Rx was
always organised **by tooth** — each tooth was a heading with its
findings, past procedures, procedures and notes nested underneath.

**After.** New `settings.groupBy: "tooth" | "type"` field. **Defaults
to `"type"`** so the printout reads kind-first out of the box.

- **By Type** (default): top-level headings are categories — Past
  Procedures, Findings, Procedures, Overall Teeth Notes — and the teeth
  with that kind are listed underneath each heading.
- **By Tooth**: the original behaviour. One click away.

New helpers in `RxPreviewDocument.jsx`:

- `buildByTypeBuckets(dentalBlocks)` — pivots blocks into the four
  buckets, sorted by FDI ascending; empty buckets dropped.
- `byTypeListNode`, `byTypeInlineNode`, `byTypeTableNode` — one
  renderer per layout view (List / Inline / Table). The toggle composes
  cleanly with whichever layout the doctor picked.
- Table view drops to a 2-column `Tooth | Note` shape for the notes
  bucket; the other three keep the 5-column
  `Tooth | Name | Surfaces | Since | Notes` shape so column widths read
  familiar.

The UI lives on **both** surfaces — a clean inline radio pair kept in
sync via the same `settings.groupBy` key:

- **Print Settings drawer**: between the existing "Layout" and
  "Sections" blocks.
- **Preview Settings popover** (gear icon in the Preview Rx drawer):
  same radio shape, slightly tighter for the popover footprint.

Initial state defaults updated in `EndVisitPage.printSettings` and
`RxpadHeader.previewSettings` (both seed `groupBy: "type"`); the
`RxPreviewDocument` + `PrintSettingsDrawer` resolvers fall back to
`"type"` when the key is missing.

**Oral examination is always grouped by Type**, irrespective of the
toggle. `OralExamReport` doesn't read `settings.groupBy` at all — the
toggle only affects the per-tooth dental section. The List view of the
oral section (previously grouped by primary site first) now matches
the Inline and Table views, which already grouped by kind.

---

## 5. Dental History card on the Patient Detail page

**Where:** `components/patient-detail/PatientDetailPage.jsx` (new
`loadDentalHistory()` helper + `DentalHistoryCard` + `DentalHistoryInline`
+ wiring into `HistorySectionCards`).

**Before.** The History column on the Patient Detail page showed
Vitals, Lab Results, Medical History, Body Composition — but **no
dental record** of the patient. A doctor opening Anjali's profile had
no way to see her past procedures / findings / planned procedures from
previous visits without diving into the dental examination tab.

**After.** A new **Dental History card** sits in the History column.

- Reads the same `dental.exam.chart.<patientId>` localStorage entry the
  chart writes to, with a fallback to the in-memory `INITIAL_TOOTH_STATE`
  seed so the demo persona (Anjali) renders her data even on a fresh
  browser session.
- **Truly empty patients render nothing.** Shyam GR and Ria Kapoor have
  no chart data; `DentalHistoryCard` returns `null` so the History
  column stays honest about what's on file. The History column never
  shows an empty "Dental History" placeholder.
- Reads in real-time on every render — any edits the doctor makes in
  the dental tab are reflected the next time this card mounts.

**Card structure:**
- Header: violet tooth icon + "Dental History" title + a chevron button
  that jumps to the dental examination tab.
- Body: inline-format rendering — `DentalHistoryInline` paragraphs.
  Oral section pinned at the top with an `ORAL RECORD` tag, then a
  `TOOTH RECORD` tag and per-tooth lines (Findings / Past Procedures /
  Procedures / Overall Notes inline-rendered per tooth).
- **View more** behaviour: the body is collapsed to `maxHeight: 180`
  with a fade gradient overlay hosting a centered "View more ⌄"
  button. Click expands to full height. Click "View less ⌃" to
  collapse again.

---

## Files touched (full list)

| File                                                                          | Sections |
|-------------------------------------------------------------------------------|----------|
| `components/dental/examination/ExaminationTab.jsx`                            | §1 (lookup fallback), §3 |
| `components/dental/examination/ExaminationTab.ui.module.scss`                 | §3 |
| `components/dental/examination/FlatDentitionChart.jsx`                        | §1, §2, §4 (oral always-by-type) |
| `components/dental/examination/DentalChartPrint.jsx`                          | §1 |
| `components/tp-rxpad/RxPreviewDocument.jsx`                                   | §1, §4 |
| `components/tp-rxpad/PrintSettingsDrawer.jsx`                                 | §4 |
| `components/tp-rxpad/EndVisitPage.jsx`                                        | §4 (default `groupBy: "type"`) |
| `components/tp-rxpad/imports/RxpadHeader.jsx`                                 | §4 (inline preview popover) |
| `components/patient-detail/PatientDetailPage.jsx`                             | §5 |

All edits are JSX / SCSS — no schema, no API, no backend changes.
