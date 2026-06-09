# Dental module — recent changes

A reference doc for the dev team. Every section is "what was there →
what's now there, and why." Use it as a delta over the existing code
base, not a full feature spec.

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
`patientType` to the row labels ("Plain pediatric dental chart") but
never to the renderer.

**After.** `DentalChartPrintButton` now threads `patientType` through
`PrintRunner` → `RxPreviewDocument` (`settings.patientType`) → the
underlying `FlatDentitionChart`. The chart component:

- Defines two new row constants — `UPPER_ROW_PRIMARY` and
  `LOWER_ROW_PRIMARY` (10 FDIs per row, 5+5).
- Introduces a `PRIMARY_TO_ADULT_FDI` map + `toothImageFdi()` so the
  primary FDIs render using their adult-anatomical-equivalent's WebP
  (the project only ships 32 adult tooth images; we don't need separate
  primary art).
- Parameterises the right/left split — `Math.floor(fdis.length / 2)` —
  so the same row builder works for the 16-tooth permanent rows and the
  10-tooth primary rows.
- Renders **one arch-pair for adult / pediatric** and **two stacked
  arch-pairs for mixed** (permanent on top, primary below, both
  labelled).

`toDentalPreviewSections()` in `ExaminationTab.jsx` got a small
`findToothDef()` helper that looks up an FDI in `TEETH` first and falls
back to `PEDIATRIC_TEETH`. Three call sites switched over so pediatric
FDIs resolve to proper quadrant + name labels ("Upper Right First Molar
(T54)") instead of falling back to "Tooth (T54)".

**Validate:** Switch the patient pill to Pediatric → click 🖨 → "Plain
pediatric dental chart" → you should see a 20-tooth primary odontogram.
Switch to Mixed → "Historical mixed dental chart" → two stacked arch
pairs with every recorded site rendered.

---

## 2. Column-header rename: SINCE → WHEN for Past Procedures

**Where:** `components/dental/examination/ExaminationTab.jsx` (OralTable
header + PrimaryDiagnosisBody header).

**Before.** Past Procedures, Findings, Procedures, Symptoms — every
table called the date column **"SINCE"**.

**After.** Findings and Symptoms keep "SINCE" (those record onset
duration). **Past Procedures now read "WHEN"** — the field is "when this
procedure was performed", which "since" reads awkwardly for. Renames
applied to:

- `OralTable` header (kind-aware: `kind === "past" ? "WHEN" : "SINCE"`).
- `PrimaryDiagnosisBody` header (single-tooth past procedures, dental
  side).

No data-model change — same field, just clearer wording on the column.

---

## 3. SinceDropdown — dynamic suggestions, native picker positioning

**Where:** `components/dental/examination/ExaminationTab.jsx`
(`SinceDropdown` function), `components/dental/examination/ExaminationTab.ui.module.scss`.

**Before.**
- Suggestion list was hard-coded `["1 day", "1 week", "1 month", "1 year"]`.
- "Select custom date" opened the OS native date picker, but the hidden
  `<input type="date">` lived at `right: 8, top: 50%` of the cell, so
  the OS calendar anchored against the right edge of the cell, not
  below it.
- Input right-padding was `30px`, which made "07 Jul 2026" overlap the
  calendar icon.

**After.**
- **Dynamic numeric suggestions.** Typing `2` rewrites the list to
  `["2 days", "2 weeks", "2 months", "2 years"]`. Any leading digit
  drives the multiplier; empty string falls back to the singular form.
  Implemented in the `options` `useMemo` — parses leading digits from
  `internalValue` and clamps 1..99.
- **Hidden date input overlays the visible field.** Position is now
  `inset: 0; width: 100%; height: 100%; opacity: 0; pointer-events:
  none`. `showPicker()` now drops the OS calendar **directly below the
  cell**, matching where the suggestion popover already sits.
- **SINCE column wider.** Input right-padding bumped 30 → 38px. All four
  SINCE/WHEN columns widened to `width: 150, minWidth: 140` (was
  90–120). Sites: `OralTable`, `EntryTab` (findings / symptoms),
  `DentalSymptomsBody`, `PrimaryDiagnosisBody`. "07 Jul 2026" now fits
  comfortably with the calendar icon.

---

## 4. "Whole tooth" reads as a tag chip, not dot + plain text

**Where:** `components/dental/examination/ExaminationTab.jsx` (three
trigger sites — `SurfaceCellDropdown`, `SurfaceDots`,
`SurfaceMultiSelect`), `ExaminationTab.ui.module.scss`.

**Before.** Whole-tooth indicator was rendered as a small green dot
followed by the plain text "Whole tooth". Surface initials (`B`, `L`,
`M`, …) used solid colour fills with white text.

**After.** All three trigger contexts now render Whole tooth as a single
**green pill chip** — no inner dot, no outer stroke, no plain-text
fallback. Surface initials switched from solid + white to **light tinted
background + saturated text** so the whole-tooth chip and the surface
chips read as one consistent visual family:

- Shape: 18px tall, 4px radius, no border.
- Whole-tooth fill: `rgba(52, 211, 153, 0.18)` (the ZONE_INFO.whole
  green), text `#047857`.
- Surface fill: `zoneTintBg(ZONE_INFO[z].color, 0.18)` (the zone hue at
  18% alpha), text = the zone's full-saturation hue. A small helper
  `zoneTintBg(hex, alpha)` was added next to `SurfaceDots`.

CSS: new `.wholeToothChip` class merges with the old `.dotsWholePill`
(both use the same rule now); `.dotsAbbr` lost its `color: #fff` and
`filter: brightness()` hover.

---

## 5. Past Procedures / Procedures: no auto-active cell on add

**Where:** `components/dental/examination/ExaminationTab.jsx`
(`PrimaryDiagnosisBody.performAddDiagnosis`, `EntryTab.addEntryFromName`).

**Before.** Adding a row in any kind table activated a cell — Findings
opened the surface picker (good), but **Past Procedures and Procedures
auto-activated the WHEN/SINCE cell** (and Past Procedures also tracked
`lastAddedName` to auto-open the SINCE dropdown). Doctors found this
presumptuous: a custom procedure name often has no default surface, and
the SINCE dropdown popping open was getting in the way.

**After.**
- Findings still auto-open the surface picker — unchanged.
- Past Procedures: `performAddDiagnosis` no longer calls
  `setActiveCell` or `setLastAddedName`. New rows land inert.
- Procedures / Planned: `pendingActivateRef.current = true` is now
  gated `if (kind === "finding")`. Same inert behaviour.

The `lastAddedName` state was removed entirely; SinceDropdown's
`autoOpen` prop is no longer threaded.

---

## 6. OralPositionCell — red "Clear all" with a confirm dialog

**Where:** `components/dental/examination/ExaminationTab.jsx`
(`OralPositionCell`).

**Before.** The area-multi-select dropdown had no bulk-clear action.
Doctors had to untick each pill individually.

**After.**
- Added a centered **"Clear all" CTA** at the bottom of the area
  popover. Only rendered when `value.length > 0`.
- Coloured red (`var(--tp-red-500, #dc2626)`) so it reads as
  destructive, not navigational.
- Clicking it opens a **`TPConfirmDialog`** — same component every other
  destructive action in the chart uses:
  - Title: "Are you sure you want to clear all selected areas?"
  - Warning: pluralises N areas based on `value.length`.
  - Secondary (destructive): "Yes, Clear All" → `onChange([])` +
    `onHoverPreview([])` so the 3D highlight clears too.
  - Primary (cancel): "No, Keep It".

Dialog is mounted at the OralPositionCell root level so it renders on
top of every popover/portal layer correctly.

---

## 7. Patient Detail page — new "Dental History" card

**Where:** `components/patient-detail/PatientDetailPage.jsx`
(new helpers + `DentalHistoryCard` + `DentalHistoryInline`).

**Before.** The History column on the Patient Detail page showed Vitals,
Lab Results, Medical History, Body Composition — but no dental record
of the patient. A doctor opening Anjali's profile had no way to see her
past procedures / findings / planned procedures from previous visits
without diving into the dental examination tab.

**After.** A new **Dental History card** sits in the History column.
It reads the same `dental.exam.chart.<patientId>` localStorage entry
the chart uses, with a fallback to the in-memory `INITIAL_TOOTH_STATE`
seed so demo personas (Anjali) render their data even on a fresh
browser session. Truly empty personas (Shyam GR, Ria Kapoor) render
nothing — the card returns `null` so the column stays honest.

Layout:
- Header: violet tooth icon + "Dental History" + a chevron button that
  jumps to the dental examination tab.
- Body: inline-format rendering — `DentalHistoryInline` paragraphs.
  Oral section pinned at the top with an `ORAL RECORD` tag, then a
  `TOOTH RECORD` tag and per-tooth lines.
- **View more** behaviour: the body is collapsed to `maxHeight: 180`
  with a fade gradient + centered "View more ⌄" button. Click expands
  to full height.

---

## 8. Print Settings — Group by **Type** or **Tooth**

**Where:** `components/tp-rxpad/PrintSettingsDrawer.jsx`,
`components/tp-rxpad/imports/RxpadHeader.jsx`,
`components/tp-rxpad/RxPreviewDocument.jsx`,
`components/tp-rxpad/EndVisitPage.jsx`.

**Before.** The dental examination section in the printed Rx was always
organised **by tooth** — each tooth was a heading with findings, past
procedures, procedures, and notes nested underneath.

**After.** New `settings.groupBy: "tooth" | "type"` field. **Defaults to
`"type"`** so the printout reads kind-first out of the box.

- **By Type** (new default): top-level headings are categories — Past
  Procedures, Findings, Procedures, Overall Teeth Notes — and the teeth
  with that kind are listed underneath each heading.
- **By Tooth**: the old behaviour. One click away.

New helpers in `RxPreviewDocument.jsx`:

- `buildByTypeBuckets(dentalBlocks)` — pivots blocks into the four
  buckets sorted by FDI; empty buckets dropped.
- `byTypeListNode`, `byTypeInlineNode`, `byTypeTableNode` — one
  renderer per layout view (List / Inline / Table). The toggle composes
  cleanly with whichever view the doctor picked.
- Table view drops to a 2-column `Tooth | Note` shape for the notes
  bucket; the other three keep the 5-column
  `Tooth | Name | Surfaces | Since | Notes` shape so column widths read
  familiar.

UI lives on **both** surfaces — kept in sync via the same
`settings.groupBy` key:

- **Print Settings drawer** (`PrintSettingsDrawer`): an inline radio
  group with the description text below picking up the active option's
  copy. Sits between "Layout" and "Sections".
- **Preview Settings popover** (gear icon in the Preview Rx drawer):
  same inline radio shape, slightly tighter for the popover footprint.

Initial state defaults updated in `EndVisitPage.printSettings` and
`RxpadHeader.previewSettings` (both now seed `groupBy: "type"`); the
`RxPreviewDocument` + `PrintSettingsDrawer` resolvers fall back to
`"type"` when the key is missing.

---

## 9. Oral Examination — always grouped by Type in print, irrespective of toggle

**Where:** `components/dental/examination/FlatDentitionChart.jsx`
(`OralExamReport`).

**Before.** The **List** view of `OralExamReport` grouped oral entries
**by primary site** first (Floor of mouth → past / findings / procedures
nested inside), even though the Inline and Table views already grouped
by kind. The three layouts disagreed.

**After.** All three layouts (List / Inline / Table) now group by
**kind first**:
- Past Procedures
- Findings
- Procedures
- Overall Notes (only when `chart.oralNotes` is non-empty)

Within each kind, items render with their area + since + note inside a
bracket — e.g.
`Scaling & Polishing (Floor of mouth, since 6 months)`.

The `byKey` / `order` per-site grouping was removed; replaced with the
same `allPast / allFindings / allProcs` arrays the table + inline views
were already using.

**Importantly:** Oral is **always** by-kind. The dental groupBy toggle
(Type / Tooth) only affects the per-tooth dental examination section —
`OralExamReport` doesn't read `settings.groupBy` at all. Flipping the
dental toggle leaves the oral section's structure untouched.

---

## 10. Dates removed from print + Dental History card

**Where:** `components/tp-rxpad/RxPreviewDocument.jsx`,
`components/dental/examination/FlatDentitionChart.jsx`,
`components/patient-detail/PatientDetailPage.jsx`.

**Before.** Three places injected a "(09 Jun 2026)" date parenthetical
into print + the Dental History card:
- Tooth labels: "Upper Left First Molar (T26, 09 Jun 2026)".
- Oral section headings: "Past Procedures (09 Jun 2026)".
- Dental History card row labels: "Past Procedures (9 Jun, 26):".

These dates fired when `settings.includeHistorical` was on (or whenever
the row carried a `toothUpdatedAt`).

**After.** Dates are **gone from every print and the Dental History
card**, regardless of `includeHistorical`:

- `RxPreviewDocument.jsx`: deleted `toothLabelWithDate()` helper, the
  local `formatDate()` helper, and the `showToothDate` parameter from
  `dentalToothListNode`, `dentalToothInlineNode`, `dentalToothTableNode`,
  `buildByTypeBuckets`. `dentalHeaderNode()` no longer emits a date
  suffix.
- `FlatDentitionChart.jsx`: dropped `showDates` prop from
  `OralExamReport`, the `sectionDateLabel` + `headingWithDate` block,
  and the `date` field from `itemParts`. All 6 `headingWithDate(label)`
  call sites collapsed to the bare label.
- `PatientDetailPage.jsx`: removed both `<span> ({addedOn})</span>`
  spans from `DentalHistoryInline`, removed `fmtAddedOn()`,
  `fallbackDate` and `addedOn:` from the loader output. Loader docblock
  updated.

The `includeHistorical` print setting itself **still exists** — it's
the toggle that will eventually merge past visits' data when the
backend ships (see existing TODO in `rx-preview-composer.ts`). Today
it's effectively a no-op user-facing because the date display was its
only visible side-effect.

---

## 11. Whole-tooth 3D annotation — anchored close to the tooth

**Where:** `components/dental/examination/Annotations.jsx`.

**Before.** When a doctor marked Whole Tooth on the 3D canvas, the
green "WT" annotation pill floated **far from the tooth** in empty
canvas space. The world-space offset (`yOff = 0.18`) was already tight
compared to its prior value (`0.55`), but the single-tooth camera is
zoomed in hard, so even small world-space gaps translate to large
screen-space gaps.

**After.** `yOff` dropped to `0.03`. The WT pill now sits a hairline
outside the bounding-box edge — visually anchored to the crown / root
tip rather than floating. No change to the 22×22 chip styling, the
leader line, or the expanded tooltip card.

---

## Files touched (full list)

| File                                                                          | Change |
|-------------------------------------------------------------------------------|--------|
| `components/dental/examination/ExaminationTab.jsx`                            | §2, §3, §4, §5, §6, plus `findToothDef()` fallback for §1 |
| `components/dental/examination/ExaminationTab.ui.module.scss`                 | §3, §4 |
| `components/dental/examination/FlatDentitionChart.jsx`                        | §1, §9, §10 |
| `components/dental/examination/DentalChartPrint.jsx`                          | §1 |
| `components/dental/examination/Annotations.jsx`                               | §11 |
| `components/tp-rxpad/RxPreviewDocument.jsx`                                   | §1, §8, §10 |
| `components/tp-rxpad/PrintSettingsDrawer.jsx`                                 | §8 |
| `components/tp-rxpad/EndVisitPage.jsx`                                        | §8 (default `groupBy: "type"`) |
| `components/tp-rxpad/imports/RxpadHeader.jsx`                                 | §8 (inline preview popover) |
| `components/patient-detail/PatientDetailPage.jsx`                             | §7, §10 |

All edits are JSX/SCSS — no schema, no API, no backend changes.
