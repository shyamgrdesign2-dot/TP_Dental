# Oral Records / Oral Examination — Subsystem Doc

> **Purpose**: Self-contained reference for the Oral Records section of the dental EMR — the right-column card, the in-canvas region tags, the per-row entry panel, and how it all flows into the Rx Preview + print output.
>
> Scope is the **oral-side** of the dental examination only. For per-tooth records see `DENTAL_MODULE_DOCUMENTATION.md`.

---

## Table of Contents

1. [Why a separate subsystem](#1-why-a-separate-subsystem)
2. [Data model](#2-data-model)
3. [Region taxonomy](#3-region-taxonomy)
4. [Right-column card (`OralRecordsList`)](#4-right-column-card-oralrecordslist)
5. [Oral Examination panel (entry UI)](#5-oral-examination-panel-entry-ui)
6. [SITE cell (`OralPositionCell`)](#6-site-cell-oralpositioncell)
7. [Canvas tags (`OralRegionTag3D`)](#7-canvas-tags-oralregiontag3d)
8. [Per-chip hover interconnect](#8-per-chip-hover-interconnect)
9. [Rx Preview rendering (`OralExamReport`)](#9-rx-preview-rendering-oralexamreport)
10. [Print (Plain vs Historical)](#10-print-plain-vs-historical)
11. [Files](#11-files)

---

## 1. Why a separate subsystem

Per-tooth dental records and oral examination records cover **different clinical domains** and the UI mirrors that distinction:

| | Per-tooth (Dental) | Oral Examination |
|---|---|---|
| **Anchor** | A specific FDI tooth (16, 21, 36, …) | A region — full mouth / arch / quadrant / surface / soft-tissue site |
| **Mental model** | "What's wrong with tooth 26?" | "What did I find in the gingiva / maxillary arch / whole mouth?" |
| **Primary axis** | Tooth → kind (Past / Findings / Procedures) | Kind (Past / Findings / Procedures) → region |
| **Canvas affordance** | Click a tooth → single-tooth view | `+ Oral Examination` CTA → region-level entry panel |
| **Records card** | One `toothRow` per affected tooth, plus grouped scope cards | **One** "Oral Examination" card (the whole section is a single card) |

These models are kept visually distinct on purpose. The oral records card is therefore **not** a copy-paste of the per-tooth card structure.

---

## 2. Data model

Oral entries live inside the chart-state store (`dental.exam.chart.<patientId>`) alongside per-tooth diagnoses/findings:

```ts
interface OralEntry {
  id: string
  kind: 'past' | 'finding' | 'procedure'  // primary axis
  name: string                              // e.g. "Scaling & Polishing", "Periodontitis", "LANAP"
  surfaces: string[]                        // region ids — see Region Taxonomy
  since?: string                            // free text — "1 day", "2 weeks", etc.
  note?: string
}

// Persisted as part of:
interface ChartState {
  // … per-tooth fields …
  oralEntries: OralEntry[]
  oralNotes: string                         // overall section notes
}
```

Wire-up:

- **Add / remove / update** flow through `state.onAddOralEntry`, `onRemoveOralEntry`, `onUpdateOralEntry` (see `DentalCanvas.jsx`).
- **Persistence** goes through the chart-state localStorage key.
- **Rx snapshot** does **not** include oral data directly — `OralExamReport` reads `oralEntries` + `oralNotes` from the chart store via `loadChart(patientId)` (or via the `chart` prop override for Plain print). This keeps the snapshot lean and the oral section data-driven from one source of truth.

---

## 3. Region taxonomy

Defined once in `components/dental/examination/types.ts` as `ORAL_POSITION_GROUPS`. Four groups:

| Group | Items |
|---|---|
| **Distribution** | Whole mouth, Generalized, Localized |
| **Oral sites** | Gingiva, Buccal mucosa, Tongue, Floor of mouth, Hard palate, Soft palate, Upper lip, Lower lip, Vestibule, Labial mucosa, TMJ |
| **Tooth regions** | **Full mouth** (first), Maxillary, Mandibular, Upper Right, Upper Left, Lower Right, Lower Left, Right arch, Left arch |
| **Tooth surfaces** | Mesial, Distal, Buccal / Labial, Lingual / Palatal, Occlusal / Incisal, Cervical, Root |

`ORAL_POSITION_LABEL` is a flat `Record<id, label>` derived from the above, used for tooltip / pill rendering.

`ORAL_POSITION_SHORT` is the compact pill text (e.g. `Whole mouth` → `Whole mouth`, `Buccal mucosa` → `Buccal muc.`, `Right arch` → `R-arch`) so chips stay one-line when there's room.

### Clinical reconcile

`reconcileOralPositions(current, id)` enforces real-world combinations:

- **Whole mouth** is an everything-marker — picking it clears every other region; picking anything specific clears `Whole mouth`.
- **Distribution** (Whole / Generalized / Localized) is radio-style. Generalized / Localized still allow a specific site (e.g. "Generalized" + "Gingiva").
- **Full mouth** (under Tooth Regions) is either/or with quadrants/arches.
- Toggling an already-selected id always just removes it.

---

## 4. Right-column card (`OralRecordsList`)

Single card per visit. No outer "Oral Records" h3 — the count is inlined into the card title.

```
┌─────────────────────────────────────────────────────────────┐
│ [3D thumb] Oral Examination [8]                          ⇱ │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 📋  Past Procedures (3)                             │    │
│  │     [Scaling & Polishing] [Root Planing] [Crown L.] │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 🩺  Findings (3)                                    │    │
│  │     [Periodontitis] [Gingival Recession] [Calculus] │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ✂️  Procedures (2)                                  │    │
│  │     [Root Planing] [Depigmentation]                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 📝  Oral Notes                                      │    │
│  │     Generalized plaque accumulation.                │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

Visual rules:

- **Card title** — `Oral Examination` + inline count chip (`12px / 700, slate-400 bg, 1×8 padding, 999px radius`).
- **Section cards** — neutral slate (`#f8fafc` bg, `1px solid #eef2f7`, `10px` radius, `12×14` padding). 32×32 violet-tinted icon box on the left with a 16px `TPMedicalIcon` (`clipboard-activity` / `diagnosis` / `surgical-scissors-02` / `note-2`).
- **Section header** — `14px / 700 #0f172a` with the count in `(N)` form using `font-weight: 500, color: #94a3b8` — no separate badge pill.
- **Item tags** — flat plain-light-violet chips: `12px / 600, color #703A9E, background rgba(164,97,216,0.16), padding 3×8, border-radius 6`, **no stroke** (matches the dental tag chips). Each tag is hoverable for canvas highlight (see §8).
- **Notes row** — same card shape, slate-tinted icon box, free text clamped to 2 lines (`-webkit-line-clamp`) with `title` for hover overflow.

All font sizes snap to the **even scale** (10 / 12 / 14 / 16 / …) — no 11 / 13 / 15.

When there are no oral entries the card doesn't render. Clicking the card opens the entry panel (`state.onEnterOralExam?.()`).

---

## 5. Oral Examination panel (entry UI)

`OralExamPanel` (`ExaminationTab.jsx`) is the right-column panel when the user is in oral mode. Structure mirrors the per-tooth panel for muscle-memory, but the rows are oral-aware:

- **Past Procedures** accordion (count) — `OralTable kind="past"` with chip catalog (`ORAL_PROCEDURES`).
- **Findings** accordion — `OralTable kind="finding"` with `ORAL_FINDINGS`.
- **Procedures** accordion — `OralTable kind="procedure"`.
- **Overall Notes** accordion — free-text textarea.

`OralTable` columns: NAME | SITE | SINCE | NOTE | (delete).
The SITE cell is the key oral-specific control — see §6.

---

## 6. SITE cell (`OralPositionCell`)

A multi-select pill trigger + searchable popover.

**Trigger pill area** (inside the table cell):
- Pills `flex-wrap: wrap` with `rowGap: 4` — all selected sites stay visible; the row grows vertically as needed.
- Pill style: `12px / 600, padding 2×8, radius 999, background rgba(164,97,216,0.14), color #703A9E`.
- The whole trigger is wrapped in `<TPTooltip arrow placement="top" enterDelay={250}>` whose title is every selected region's full label, comma-joined — so on hover the doctor sees the full names even when the chips show short forms (`Buccal muc.` → `Buccal mucosa`).
- Trigger button: `min-height: 52px, padding: 10px 12px` — single line at rest, auto-grows when pills wrap.
- SITE column min-width: 200 / width: 220 — enough room for typical 2–3 selections without truncation.

**Popover** (portaled, position-clamped to viewport):
- **Sticky search input** at top — auto-focused on open, filters across every group as you type. Clear button on the right when query non-empty.
- **Two-column grouped layout** when no query — Distribution / Oral Sites / Tooth Regions / Tooth Surfaces side-by-side via `column-count: 2`. Group headings are 12px ALL-CAPS slate-500; item labels are 14px slate-900 with 8×12 padding (tap-target friendly).
- **Flat filtered list** when query non-empty — each item also shows its group as a small caption underneath.
- **Bottom fade indicator** — a non-clickable gradient at the bottom of the body (`linear-gradient(to bottom, rgba(255,255,255,0) → #fff)`) with a small chevron-down, signalling there's more to scroll.
- Width is `min(440, max(triggerWidth, 360))`, clamped so the panel never spills past the viewport's right edge.
- Item rows reuse `ui.surfaceZoneBtn` / `ui.surfaceCheck` / `ui.surfaceCheckOn` so the SITE picker matches the per-tooth SURFACES picker.

---

## 7. Canvas tags (`OralRegionTag3D`)

When `oralEntries.length > 0`, the dentition canvas (`DentitionView`) renders a small pill per affected region. Same visual treatment as the per-tooth treatment tags — **no colour differentiation**.

Pill style:
```
background: rgba(107,114,128,0.78)   ← dark slate transparent
color: #fff
border-radius: 4px
font: 10px / 600 Inter, letter-spacing 0.01em
padding: 2px 7px
backdrop-filter: blur(3px)
```

### Grouping

`oralTagGroups` (`DentitionView.useMemo`) buckets `oralEntries` by their primary region. For each group:

- `key` is the region id (`FULL` / `UPPER_ARCH` / `RIGHT_ARCH` / `UR` / …).
- `fdis` is the set of affected tooth FDIs (used to dim the rest of the dentition on hover).
- `position` is the **centroid** of the affected teeth's world positions, plus a small in-bounds nudge from `GROUP_TAG_OFFSET` (e.g. `UPPER_ARCH: [0, 0.6, 0]`). Offsets are small on purpose so tags land **within** or **between** teeth — they never drift outside the dentition frame.
- `label` = `ORAL_POSITION_LABEL[key]`.

### Tooltip placement

Each tag accepts `tooltipSide: 'above' | 'below' | 'left' | 'right'`. The dark expanded tooltip opens on **direct pill hover** (or `forceShowAll` from the per-chip route below) and radiates AWAY from canvas centre so multiple visible tooltips don't overlap:

| Region | Side |
|---|---|
| FULL / WHOLE / GENERALIZED | below |
| UPPER_ARCH / UR / UL | above |
| LOWER_ARCH / LR / LL | below |
| RIGHT_ARCH | left |
| LEFT_ARCH | right |

Tooltip box: `min-width: 200, max-width: 280, rgba(0,0,0,0.82) bg, 3px solid rgba(255,255,255,0.35) border-left`, with "Oral" badge and grouped Past Procedures / Findings / Procedures sub-boxes inside. Dashed leader line from the box to the pill on the correct side.

**Important**: Tooltips no longer auto-pop on records-card hover. The earlier `oral-tags-show-all` broadcast (which opened every tooltip when the user hovered the card) was removed because clicking the card to expand left the mouse inside it → tooltips stuck open.

---

## 8. Per-chip hover interconnect

Each item chip in the records card has `onMouseEnter` / `onMouseLeave` that dispatch a `oral-tags-show-one` `CustomEvent` with `{ kind, name }` (or `null` on leave). `DentitionView` listens:

```js
useEffect(() => {
  const onShowOne = (ev) => setHoverOneOral(ev?.detail ?? null);
  window.addEventListener('oral-tags-show-one', onShowOne);
  return () => window.removeEventListener('oral-tags-show-one', onShowOne);
}, []);
```

When `hoverOneOral` is set, each `OralRegionTag3D`:
1. Filters its `list` to ONLY the entry matching `{ kind, name }`.
2. Sets `hideTag: true` if the filtered list is empty (no match in this group) → component returns null and nothing renders.
3. Sets `forceShowAll: true` on the matching tag so its tooltip pops automatically.

Result: hovering "Scaling & Polishing" in the records card highlights JUST that entry's region on the canvas with its expanded tooltip open. Hovering the empty card area triggers no canvas changes.

Defensive guards in `OralRegionTag3D`:

```js
if (hideTag || !list || list.length === 0) return null;   // early return before any list[0] access
const firstName = list[0]?.name ?? "";                    // optional chaining + fallback
```

---

## 9. Rx Preview rendering (`OralExamReport`)

`OralExamReport({ patientId, chart, view })` in `FlatDentitionChart.jsx` is the printable/preview view. It renders nothing when there are zero entries and no notes. Three view variants:

### `view: "list"` (default)
Nested bullet list grouped by site:
```
• Right arch
    • Past Procedures
        • Scaling & Polishing (since 1 day | ery)
    ...
```

### `view: "inline"`
One paragraph per site, kinds joined with semicolons.

### `view: "table"`  ← **the new shape**
**Grouped by KIND, not by site.** Region is just a column inside each kind's flat table. This matches how the doctor actually entered the data (chose Past Procedures → typed name → tagged region):

```
┌─ Past Procedures ──────────────────────────────────────┐
│ Name                  │ Region        │ Since  │ Notes │
│ Scaling & Polishing   │ Right arch    │ 1 day  │ —     │
│ Root Planing          │ Generalized   │ 1 week │ sfd   │
│ Crown Lengthening     │ Whole mouth   │ —      │ —     │
└────────────────────────────────────────────────────────┘
┌─ Findings ─────────────────────────────────────────────┐
│ ...                                                    │
└────────────────────────────────────────────────────────┘
┌─ Procedures ───────────────────────────────────────────┐
│ ...                                                    │
└────────────────────────────────────────────────────────┘
```

The kind name (`Past Procedures` / `Findings` / `Procedures` / `Overall Notes`) is the **primary heading** — there are no per-region subheadings, no Arc / Generalized / Whole mouth highlights. Region is data inside the table, not a section break.

Table styling: 12px body / 10px ALL-CAPS column headers / 8×12 cell padding / 1px slate row dividers / rounded 8px wrap with grey kind header.

### Tag preview

`itemParts(e)` returns `{ name, meta, region, since, note }` so the table can render structured columns and the list/inline views still get the joined `meta` for compact display. `region` is computed via `(e.surfaces || []).map(s => ORAL_POSITION_LABEL[s] || s).join(", ")`.

---

## 10. Print (Plain vs Historical)

The "Print Dental Chart" button (`DentalChartPrint.DentalChartPrintButton` — the icon-only button bottom-left of the canvas in dentition view) opens a 320px dropdown:

```
PRINT
🦷  Plain dental chart        →
    Blank odontogram template
📋  Historical dental chart   →
    With recorded findings & history
─────────────────────────────────────
☑  Include patient information
```

- **Plain** → `PrintRunner` mounts `<RxPreviewDocument snapshot={emptySnapshot(patientId)} settings={{ view: "list", showDentalChart: true, chartOverride: BLANK_CHART, hideOral: true }} />`. Result: one A4 page with letterhead + patient + blank odontogram. No oral, no clinical sections.
- **Historical** → snapshot built via `getComposedRxPreviewSnapshot(patientId)` (full clinical sections + dental Tooth Records); chart reads live from the chart store. Result: paginated Rx — clinical sections → per-tooth dental records (one block per tooth, paginated) → Follow-up / Notes → **Oral Examination** (the by-kind table from §9) → **Dental Chart** on its own A4 page. Letterhead + patient + footer repeat on every sheet.

Print stylesheet (in `PRINT_STYLE`):
```css
@media print {
  body > *:not(.dcp-print-root) { display: none !important; }
  .dcp-print-root article { break-after: page; box-shadow: none; border-radius: 0; aspect-ratio: auto; }
  .dcp-print-root article:last-child { break-after: auto; }
  @page { size: A4 portrait; margin: 10mm; }
}
```

`PrintRunner` waits **2200 ms** after mount before firing `window.print()` so:
1. The 32 odontogram WebPs fully decode (`/teeth/<fdi>.webp`, `decoding="async"`, **no `loading="lazy"`** — lazy would defer offscreen-root images).
2. `RxPreviewDocument.PaginatedRx` finishes its hidden-replica measurement + pagination pass.
3. The chart's `useState`/`useEffect` settle once `loadChart` returns.

`FlatDentitionChart` accepts an `alwaysRender` prop — the print path passes `true` so the chart shows even when the patient has no per-tooth data (it's literally a "Print Dental Chart" button).

---

## 11. Files

| File | What lives there |
|---|---|
| `components/dental/examination/types.ts` | `ORAL_POSITION_GROUPS`, `ORAL_POSITION_LABEL`, `ORAL_POSITION_SHORT`, `oralPositionShort`, `reconcileOralPositions` |
| `components/dental/examination/ExaminationTab.jsx` | `OralRecordsList` (right-column card), `OralExamPanel` (entry panel), `OralTable`, `OralPositionCell` (SITE cell + dropdown) |
| `components/dental/examination/DentitionView.jsx` | `OralRegionTag3D` (canvas pill + tooltip), `GROUP_TAG_OFFSET`, `GROUP_TIP_SIDE`, `oralTagGroups` memo, `hoverOneOral` state + `oral-tags-show-one` listener |
| `components/dental/examination/FlatDentitionChart.jsx` | `OralExamReport` (preview / print rendering, list / inline / table views) |
| `components/dental/examination/DentalChartPrint.jsx` | `DentalChartPrintButton` (the print icon + dropdown), `PrintRunner`, `emptySnapshot`, `BLANK_CHART`, `PRINT_STYLE` |
| `components/tp-rxpad/RxPreviewDocument.jsx` | `PaginatedRx` (measurement-based pagination), the oral block push (`OralExamReport` with `view` / `chartOverride` settings) |

Storage key: `dental.exam.chart.<patientId>` (`oralEntries` + `oralNotes` keys inside).
Event channel: `window` `oral-tags-show-one` `CustomEvent({ detail: { kind, name } | null })`.
