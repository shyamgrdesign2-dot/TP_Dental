# Oral Records / Oral Examination — Subsystem Doc

> **Purpose**: Self-contained reference for the Oral Records section of the dental EMR — the right-column card, the in-canvas region tags, the per-row entry panel, and how it all flows into the Rx Preview + print output.
>
> Scope is the **oral-side** of the dental examination only. For per-tooth records see `DENTAL_MODULE_DOCUMENTATION.md`.

---

## Table of Contents

1. [Why a separate subsystem](#1-why-a-separate-subsystem)
2. [Data model](#2-data-model)
3. [Region taxonomy — what each group means clinically](#3-region-taxonomy--what-each-group-means-clinically)
4. [Why this taxonomy matters](#4-why-this-taxonomy-matters)
5. [End-to-end workflow](#5-end-to-end-workflow)
6. [Right-column card (`OralRecordsList`)](#6-right-column-card-oralrecordslist)
7. [Oral Examination panel (entry UI)](#7-oral-examination-panel-entry-ui)
8. [SITE cell (`OralPositionCell`)](#8-site-cell-oralpositioncell)
9. [Canvas tags (`OralRegionTag3D`)](#9-canvas-tags-oralregiontag3d)
10. [Hover broadcast — 2-level model](#10-hover-broadcast--2-level-model)
11. [Rx Preview rendering (`OralExamReport`)](#11-rx-preview-rendering-oralexamreport)
12. [Print (Plain vs Historical)](#12-print-plain-vs-historical)
13. [Files & wiring](#13-files--wiring)
14. [Clinical glossary](#14-clinical-glossary)

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

## 3. Region taxonomy — what each group means clinically

The SITE picker is the single most important control in the oral flow. It answers **"where is this finding?"** for anything that isn't tied to one specific tooth. The catalog is defined once in `components/dental/examination/types.ts` as `ORAL_POSITION_GROUPS` and falls into **four conceptually different groups**.

### 3.1 Distribution — "how widespread is it?"

| Item | Clinical meaning | When to pick |
|---|---|---|
| **Whole mouth** | The finding involves the **entire oral cavity** — every quadrant, every surface | Stomatitis affecting all mucosa, generalised xerostomia, oral candidiasis covering whole mouth |
| **Generalized** | Spread across **most** of the dentition / oral cavity but not necessarily every site | Generalized gingivitis, generalized plaque, generalized stains |
| **Localized** | Confined to a **small specific area** (used together with a Site or Tooth Region) | Localized periodontitis on lower anteriors, localized gingival recession around tooth 41 |

**Why three?** They map directly to how dentists already chart in paper notes: "generalised", "localised", "throughout". Without these, the doctor would have to either (a) tick every region individually (slow + lossy) or (b) just type prose into the notes field (un-queryable). Distribution gives the chart a **shape** for population-level findings without forcing per-tooth granularity.

**Pairing rule**: Distribution is **radio-style** (only one of Whole / Generalized / Localized at a time). `Generalized` and `Localized` may be combined with any Site / Tooth Region / Tooth Surface to qualify it (e.g. *"Generalized · Gingiva"* = generalised gingivitis on gingiva specifically). `Whole mouth` is exclusive — picking it clears every other region.

### 3.2 Oral sites — "which soft-tissue structure?"

Anatomical landmarks **outside** the teeth themselves — the soft tissue, the supporting structures, the jaw joint.

| Item | What it is | Example finding |
|---|---|---|
| **Gingiva** | The gums — the keratinised tissue surrounding the teeth | Gingivitis, gingival recession, hyperplasia |
| **Buccal mucosa** | Inner lining of the cheeks | Lichen planus, leukoplakia, cheek biting trauma |
| **Tongue** | The tongue surface (dorsal / ventral / lateral combined here for simplicity) | Geographic tongue, fissured tongue, ulcer |
| **Floor of mouth** | Under the tongue, between mandible and tongue base | Ranula, calculi in submandibular duct |
| **Hard palate** | Bony roof of the mouth | Torus palatinus, palatal stomatitis from a denture |
| **Soft palate** | Posterior soft portion of the palate | Petechiae from infection, ulceration |
| **Upper lip** / **Lower lip** | External lip vermillion + inner labial surface | Herpes labialis, fissures, mucocele |
| **Vestibule** | The fold between cheek/lip and gum | Fistula opening, abscess drainage point |
| **Labial mucosa** | Inner surface of lips (mucosal side) | Fordyce spots, mucocele |
| **TMJ** | Temporomandibular joint | Clicking, deviation on opening, pain on palpation |

**Why this list?** It covers the **non-dental clinical surfaces** that a routine intra-oral exam inspects. The list mirrors the headings on a standard paper soft-tissue exam form. If the finding's natural answer to "where?" is *not* a tooth or arch, it's almost certainly in this list.

### 3.3 Tooth regions — "which teeth, as a group?"

When something affects a **set of teeth** but it would be tedious (or clinically inaccurate) to tag every individual tooth. Stored as a region id (`FULL` / `MAXILLARY` / `UR` / `RIGHT_ARCH` / …) but resolves to a list of FDIs on the canvas.

| Item | FDI scope | When to use |
|---|---|---|
| **Full mouth** | Every adult permanent tooth (16 maxillary + 16 mandibular) | Full-mouth scaling, full-mouth fluoride application, full-mouth radiographs |
| **Maxillary** | Whole upper arch (FDI 11–18 + 21–28) | Maxillary calculus, maxillary stains |
| **Mandibular** | Whole lower arch (FDI 31–38 + 41–48) | Mandibular crowding, lower anterior calculus |
| **Upper Right** | Quadrant 1 (FDI 11–18) | Caries in UR quadrant, UR fluorosis |
| **Upper Left** | Quadrant 2 (FDI 21–28) | UL quadrant scaling |
| **Lower Left** | Quadrant 3 (FDI 31–38) | LL quadrant trauma |
| **Lower Right** | Quadrant 4 (FDI 41–48) | LR quadrant attrition |
| **Right arch** | Right half (FDI 11–18 + 41–48) | Right-side mastication issues |
| **Left arch** | Left half (FDI 21–28 + 31–38) | Left-side TMJ-referred issues |

**Why "Full mouth" sits at the top?** It's the most common choice for routine procedures (scaling, fluoride, prophylaxis) — putting it first avoids 4–5 extra eye-scans every time. Order is intentional and clinically motivated, not alphabetical.

**Pairing rule**: `Full mouth` is **either/or** with quadrants/arches. Picking a quadrant clears `Full mouth` and vice versa. Multiple quadrants/arches can coexist (e.g. "Upper Right" + "Upper Left" = both upper quadrants).

### 3.4 Tooth surfaces — "which face of the tooth?"

Anatomical surfaces shared across all teeth. Used when a finding lives on a **specific face** but is **not tied to one tooth** — e.g. "generalised cervical staining" tagged with `Generalized` + `Cervical`.

| Item | What it is | Example finding |
|---|---|---|
| **Mesial** | The side facing the midline (front-of-mouth side) | Interproximal caries on mesial surfaces |
| **Distal** | The side facing away from the midline (back-of-mouth side) | Distal calculus build-up |
| **Buccal / Labial** | The outer surface — towards cheek (posterior) or lip (anterior) | Buccal abrasion, labial staining |
| **Lingual / Palatal** | The inner surface — towards tongue (lower) or palate (upper) | Lingual calculus, palatal pits |
| **Occlusal / Incisal** | The chewing surface (posterior) or biting edge (anterior) | Occlusal caries, incisal wear / attrition |
| **Cervical** | The neck of the tooth — at the gum line | Cervical abrasion, abfraction, cervical caries (root caries near CEJ) |
| **Root** | Below the cementoenamel junction | Root caries, root resorption visible on imaging |

**Why grouped surfaces (Buccal / Labial, Lingual / Palatal, Occlusal / Incisal)?** Each pair describes the **same anatomical face** under different names depending on whether the tooth is anterior or posterior. Combining them avoids forcing the doctor to remember which terminology applies — the chart shows the right label automatically.

### 3.5 Naming + helper utilities

| Symbol | Purpose |
|---|---|
| `ORAL_POSITION_GROUPS` | Source of truth — array of `{ group, items: [{ id, label }] }` |
| `ORAL_POSITION_LABEL` | Flat `Record<id, label>` for tooltip / pill rendering |
| `oralPositionShort(id)` | Compact pill text — `Whole mouth` → `Whole mouth`, `Buccal mucosa` → `Buccal muc.`, `Right arch` → `R-arch`, `Full mouth` → `Full` — keeps chips one-line when room allows |
| `reconcileOralPositions(current, id)` | Toggles `id` in the list, applies the pairing rules above. Always returns a new array |

### 3.6 Clinical reconcile rules — full table

`reconcileOralPositions(current, id)` codifies what's clinically valid:

| Action | Effect |
|---|---|
| Pick **Whole mouth** | Clears every other selection |
| Pick anything when **Whole mouth** is on | Clears `Whole mouth`, then adds the new pick |
| Pick **Generalized** / **Localized** | Clears the other Distribution option, keeps Sites / Tooth Regions / Surfaces |
| Pick **Full mouth** | Clears all quadrants + arches |
| Pick a quadrant / arch when **Full mouth** is on | Clears `Full mouth`, then adds the pick |
| Toggle an already-selected id | Removes it |

---

## 4. Why this taxonomy matters

A single "where?" field with free text would be faster to ship, but quickly becomes useless for any of the downstream needs the oral exam serves:

| Need | Free-text "where" fails | Structured taxonomy works |
|---|---|---|
| **Print/Rx output** | "lower left, mesial of 36, and a bit of gum" needs a human to parse | `[LL, mesial, Gingiva]` → renders cleanly in the report table |
| **Canvas pin-pointing** | Can't draw a 3D tag from prose | Each region id has known FDI fan-out + spatial offset → tag pins exactly |
| **Cross-visit comparison** | Free text from visit 1 doesn't match free text from visit 2 | Same region ids over time → "calculus in UR was found at visits 2, 4, 6" is a query |
| **Treatment-plan suggestion** | Agent can't infer "whole-mouth scaling" from "everywhere" | `WHOLE` or `FULL` region tag → plan can propose the matching procedure |
| **Analytics (MoEngage spec)** | Each note unique → no cohorts | `region_category: 'soft_tissue' \| 'tooth_region' \| 'distribution'` becomes a property → segment patients by what kind of findings they have |
| **Voice Rx parsing** | "uh, kind of all over the bottom front" → ?? | Recognised region tokens map to ids → chart updates structurally |
| **Per-doctor templates** | Templates are text snippets — no chart write | Templates can store region-tag lists → applying a template seeds the right chart entries |

The taxonomy is also what makes the canvas **alive**: when a doctor tags `RIGHT_ARCH`, every tooth in that arch dims and a tag pin appears. None of that is possible with a free-text field.

---

## 5. End-to-end workflow

How a typical oral examination plays out in this UI, step by step:

### Step 1 — Entry

The doctor lands on the Dental Examination tab. The 3D dentition canvas fills the left two-thirds. The right column shows tooth records and the Oral Examination card (only visible once entries exist). To start an oral exam they either:

- **Tap the `+ Oral Examination` CTA** at the bottom of the canvas (primary entry)
- **Click on the existing Oral Examination records card** if there are already entries to edit

Either route swaps the right column for the `OralExamPanel`. The dentition stays in **full view** (every tooth visible, no zoom) because oral exam is whole-mouth context, not per-tooth.

### Step 2 — Pick a kind

The panel has four accordion sections — `Past Procedures`, `Findings`, `Procedures`, `Overall Notes` — only one expands at a time. The doctor opens the section that matches their next entry. Mental model: "kind first, then specifics" — the inverse of the per-tooth flow where the tooth comes first.

### Step 3 — Name the finding/procedure

Inside the open section, a search-typeable input filters a catalogue (`ORAL_PROCEDURES` for Past / Procedures, `ORAL_FINDINGS` for Findings). Quick-add chips below the input cover the most-used items. Picking from either path creates a new row in the table.

### Step 4 — Tag the SITE

The new row has empty `SITE`, `SINCE`, `NOTE` cells. The SITE cell is the structured region picker (§8). Click it → popover opens with the 4 groups in 2 columns. The doctor:

- Types in the search box to filter (instant matching across all groups), OR
- Eyeballs the groups and ticks one or more items

The clinical reconcile rules (§3.6) keep selections valid as they go. Selected items appear as inline short-label chips in the cell — multiple chips wrap vertically.

### Step 5 — Optional metadata

`SINCE` ("1 day", "2 weeks", etc.) and `NOTE` (free text) round out the row. Both are optional.

### Step 6 — Canvas feedback

As soon as a row has a region tag, the dentition canvas:

1. **Dims** the teeth that are NOT in the tagged region (region resolves to an FDI list via `getScopeFdis`).
2. **Pins** an `OralRegionTag3D` pill near the centroid of those teeth.

The doctor can hover the pill to see the expanded tooltip with all entries grouped under that region.

### Step 7 — Repeat for more entries

The doctor adds as many entries as needed across the 3 kinds. The Oral Examination records card on the right column updates inline with counts and chip lists.

### Step 8 — Hover to verify

Back on the dentition view, hovering anywhere on the Oral Examination card shows every region pin's tooltip (so the doctor sees the whole picture). Hovering a **specific chip** in the card narrows the canvas to just that one entry — useful when the doctor wants to confirm "where exactly is the calculus I noted?" without re-opening the panel.

### Step 9 — Preview & print

`Preview` (header button) opens the Rx Preview drawer, where the oral exam renders as a 3-table block (one per kind) inside the printable Rx. The Print Settings drawer offers `Show dental chart` and `Include past visits` toggles. Print → A4-paginated output, dental chart on its own page.

### Step 10 — End visit

`End Visit` → Print Settings → final Rx → ends the consultation. State persists in localStorage under `dental.exam.chart.<patientId>`, so reopening the patient brings back the same chart.

---

## 6. Right-column card (`OralRecordsList`)

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

## 7. Oral Examination panel (entry UI)

`OralExamPanel` (`ExaminationTab.jsx`) is the right-column panel when the user is in oral mode. Structure mirrors the per-tooth panel for muscle-memory, but the rows are oral-aware:

- **Past Procedures** accordion (count) — `OralTable kind="past"` with chip catalog (`ORAL_PROCEDURES`).
- **Findings** accordion — `OralTable kind="finding"` with `ORAL_FINDINGS`.
- **Procedures** accordion — `OralTable kind="procedure"`.
- **Overall Notes** accordion — free-text textarea.

`OralTable` columns: NAME | SITE | SINCE | NOTE | (delete).
The SITE cell is the key oral-specific control — see §6.

---

## 8. SITE cell (`OralPositionCell`)

The structured region picker — a multi-select pill trigger + searchable popover. This is the **single most-used control** in the oral flow.

### Trigger (inside the table cell)

- Pills `flex-wrap: wrap` with `rowGap: 4` — every selected site stays visible; the row grows vertically as needed.
- Pill style: `12px / 600, padding 2×8, radius 999, background rgba(164,97,216,0.14), color #703A9E`. Short labels via `oralPositionShort(id)`.
- The whole trigger is wrapped in `<TPTooltip arrow placement="top" enterDelay={250}>` whose title is every selected region's full label, comma-joined — so on hover the doctor sees the full names even when the chips show short forms (`Buccal muc.` → `Buccal mucosa`).
- Trigger button: `min-height: 52px, padding: 10px 12px` — single line at rest, auto-grows when pills wrap.
- SITE column `min-width: 200 / width: 220` — enough room for typical 2–3 selections without truncation.

### Popover

Portaled to `<body>`, fixed-positioned, repositioned on window scroll/resize, dismissed on outside click.

- **Width**: `min(440, max(triggerWidth, 360))`, clamped so the panel never spills past the viewport's right edge.
- **Max-height**: `min(460px, 60vh)` — set directly on the scroll container (NOT on the popover) so wheel events scroll natively. (An earlier attempt used `flex: 1 + min-height: 0` on a wrapper inside a `max-height` popover; the flex child collapsed to 0px because flex grow only kicks in inside a parent with an explicit `height` — `max-height` doesn't count. The direct `max-height` on the scroller is the reliable fix.)
- **Layout outside search**: groups flow with `column-count: 2` so a short group like Distribution doesn't leave dead vertical space — `Tooth Regions` sits directly at the top of the right column, balanced naturally.
- **Layout when searching**: flat filtered list — each item also shows its group as a small caption underneath, so the doctor never loses context.

### Search input

- Sticky at the top of the popover, auto-focused on open.
- Filters across every group as the doctor types, case-insensitive `includes` match on the label.
- "Clear search" `×` button on the right when query is non-empty.

### Custom always-visible scroll indicator

> **macOS Chromium gotcha**: when the system "Show scrollbars: Automatically based on mouse or trackpad" preference is on, Chromium renders `::-webkit-scrollbar` styles as an **overlay** (taking 0 px and disappearing when idle), regardless of `width`, `appearance: none`, or `scrollbar-gutter`. The visible scrollbar simply isn't reliable.

So the SITE popover paints its **own** track + thumb on the right edge:

```jsx
<div style={{ position: "relative" }}>
  <div ref={scrollRef} onScroll={updateScrollMetrics} className={ui.surfacePopoverScroll}>…</div>

  {/* Track — always rendered when content overflows */}
  <div style={{ position: "absolute", top: 8, bottom: 8, right: 4, width: 6,
       background: "var(--tp-slate-100)", borderRadius: 999, pointerEvents: "none" }} />

  {/* Thumb — top + height derived from scrollTop / scrollHeight / clientHeight */}
  <div style={{ position: "absolute", top: scrollMetrics.thumbTop,
       height: scrollMetrics.thumbH, right: 4, width: 6,
       background: "var(--tp-slate-500)", borderRadius: 999,
       pointerEvents: "none", transition: "top 60ms linear" }} />
</div>
```

`updateScrollMetrics` runs on mount (deferred 60 ms so paint settles), on every `onScroll`, and when `query` changes (which rebuilds the inner DOM):

```js
const trackPad = 8;
const trackH = clientHeight - trackPad * 2;
const thumbH = Math.max(28, (clientHeight / scrollHeight) * trackH);
const maxThumbTop = trackH - thumbH;
const thumbTop = trackPad + (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop;
```

`pointer-events: none` on both track and thumb so they never block chip clicks. The system's native overlay scrollbar still shows on touch/scroll (you get both — the OS overlay is transient, our painted thumb is permanent).

### Item rows

Reuse `ui.surfaceZoneBtn` / `ui.surfaceCheck` / `ui.surfaceCheckOn` so the SITE picker matches the per-tooth SURFACES picker exactly. Each row: `8×12 padding, gap 10, font 14`. Checkbox `16×16` rounded square that fills with TP blue + checkmark when selected.

---

## 9. Canvas tags (`OralRegionTag3D`)

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

Each tag accepts `tooltipSide: 'above' | 'below' | 'left' | 'right'`. The dark expanded tooltip opens on **direct pill hover** (or when the records-card hover broadcast — §10 — forces it open) and radiates AWAY from canvas centre so multiple visible tooltips don't overlap:

| Region | Side |
|---|---|
| FULL / WHOLE / GENERALIZED | below |
| UPPER_ARCH / UR / UL | above |
| LOWER_ARCH / LR / LL | below |
| RIGHT_ARCH | left |
| LEFT_ARCH | right |

Tooltip box: `min-width: 200, max-width: 280, rgba(0,0,0,0.82) bg, 3px solid rgba(255,255,255,0.35) border-left`, with "Oral" badge and grouped Past Procedures / Findings / Procedures sub-boxes inside. Dashed leader line from the box to the pill on the correct side.

---

## 10. Hover broadcast — 2-level model

The records card on the right column drives canvas highlights via a single `oral-tags-filter` `CustomEvent`. **Two levels** (we used to have three — a per-section "show only this kind" level was removed as noisy):

| Hover target | Detail | Effect on canvas |
|---|---|---|
| Anywhere inside the card body (card itself or in the section row, but **not** over a chip) | `{ all: true }` | Every region tag visible, every tooltip auto-pops |
| **Individual chip** (e.g. "Scaling & Polishing") | `{ kind, name }` | Only the one matching tag renders; its tooltip auto-pops |
| Card leave | `null` | All tags + tooltips hide |

### Producer (records card)

```js
// OralRecordsList in ExaminationTab.jsx
const fire = (detail) => window.dispatchEvent(new CustomEvent("oral-tags-filter", { detail }));

const onCardEnter = () => fire({ all: true });
const onCardLeave = () => { fire(null); state?.onSetOralHighlight?.([]); };
const onItemEnter = (kind, name) => {
  const e = entries.find((x) => x.kind === kind && x.name === name);
  if (e) state?.onSetOralHighlight?.(e.surfaces || []);
  fire({ kind, name });
};
// Chip leave restores `{ all: true }` — cursor is still inside the card.
const onItemLeave = () => { state?.onSetOralHighlight?.([]); fire({ all: true }); };
```

Note: section rows used to have their own `onMouseEnter` / `onMouseLeave` that fired `{ kind }`. Those were removed — leaving a chip now goes straight back to "show all" instead of briefly flickering through a per-section state.

### Consumer (`DentitionView`)

Listens once and stores the latest filter in state:

```js
useEffect(() => {
  const onFilter = (ev) => setOralFilter(ev?.detail ?? null);
  window.addEventListener('oral-tags-filter', onFilter);
  return () => window.removeEventListener('oral-tags-filter', onFilter);
}, []);
```

In the tag render loop, each `OralRegionTag3D` applies the filter:
1. If `oralFilter === null` → render with default visibility.
2. If `{ all: true }` → render every tag and set `forceShowAll: true` so tooltips pop.
3. If `{ kind, name }` → filter `list` to just the matching entry. If the filter has no match in this group, set `hideTag: true` (component returns null).

Defensive guards in `OralRegionTag3D`:

```js
if (hideTag || !list || list.length === 0) return null;
const firstName = list[0]?.name ?? "";
```

### Also: `onSetOralHighlight`

A parallel piece of state — `oralHighlightFdis` on the canvas — dims the teeth that are NOT in the affected region when the doctor hovers a chip. This is what makes the "only the right arch is lit" effect work alongside the tag/tooltip. Card-level hover doesn't dim (it's an "everything" view).

---

## 11. Rx Preview rendering (`OralExamReport`)

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
**Grouped by KIND** (matching the table layout). One paragraph per kind, with each item showing its region + since + note collapsed into a single bracket:

```
Past Procedures: Scaling & Polishing (Right arch, since 1 day, ery),
                 Root Planing (Generalized, Buccal mucosa, since 1 week, sfd),
                 Crown Lengthening, LANAP
Findings:        Periodontitis, Gingival Recession, Calculus, Gingivitis
Procedures:      Root Planing, Depigmentation, Scaling & Polishing
```

No em dashes — colons only. Items with no metadata (e.g. Crown Lengthening) print bare; items with metadata get one merged bracket.

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

## 12. Print (Plain vs Historical)

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

## 13. Files & wiring

| File | What lives there |
|---|---|
| `components/dental/examination/types.ts` | `ORAL_POSITION_GROUPS`, `ORAL_POSITION_LABEL`, `oralPositionShort`, `reconcileOralPositions`, `ORAL_FINDINGS`, `ORAL_PROCEDURES` |
| `components/dental/examination/ExaminationTab.jsx` | `OralRecordsList` (right-column card + 2-level hover broadcast), `OralExamPanel` (entry panel + panel-Clear `TPConfirmDialog`), `OralTable`, `OralPositionCell` (SITE cell + popover + custom scroll indicator) |
| `components/dental/examination/DentitionView.jsx` | `OralRegionTag3D` (canvas pill + tooltip), `GROUP_TAG_OFFSET`, `GROUP_TIP_SIDE`, `oralTagGroups` memo, `oralFilter` state + `oral-tags-filter` listener |
| `components/dental/examination/FlatDentitionChart.jsx` | `OralExamReport` (preview / print rendering — list / inline-by-kind / table-by-kind views) |
| `components/dental/examination/DentalChartPrint.jsx` | `DentalChartPrintButton` (the print icon + dropdown), `PrintRunner`, `emptySnapshot`, `BLANK_CHART`, `PRINT_STYLE` |
| `components/tp-rxpad/RxPreviewDocument.jsx` | `PaginatedRx` (measurement-based pagination + stale-pages re-seed guard), the oral block push (`OralExamReport` with `view` / `chartOverride` / `includeHistorical` settings) |
| `components/tp-rxpad/PrintSettingsDrawer.jsx` | Print Settings drawer — `view` (list/inline/table), `showDentalChart`, `includeHistorical` toggles. Copy: "Include past visits" |
| `components/tp-rxpad/imports/RxpadHeader.jsx` | Preview drawer header + Preview Settings gear popover (uses `.toolGreyAlt` style) with the same `Show dental chart` / `Include past visits` toggles |
| `components/tp-ui/tp-confirm-dialog.{jsx,module.scss}` | Shared confirm modal (VoiceRx reference) — used by every destructive flow including the oral exam panel-Clear and per-section Clear |

### Persistence

`localStorage` key: `dental.exam.chart.<patientId>` — JSON-serialised `ChartState` with `oralEntries` + `oralNotes` alongside the per-tooth fields.

### Events

| Event | Detail | Producer | Consumer |
|---|---|---|---|
| `oral-tags-filter` | `null` ‖ `{ all: true }` ‖ `{ kind, name }` | `OralRecordsList` (card / chip hover) | `DentitionView` → filters tag render loop |

(The legacy `oral-tags-show-all` and `oral-tags-show-one` channels were retired.)

### State shared with the canvas

`oralHighlightFdis` lives on `DentalCanvas`. `onSetOralHighlight(fdis)` is invoked by the records-card chip hover to dim non-affected teeth.

---

## 14. Clinical glossary

Quick reference for non-dental contributors reading this code:

| Term | Meaning |
|---|---|
| **FDI** | Fédération Dentaire Internationale tooth-numbering system. 2-digit code: first digit = quadrant (1 UR / 2 UL / 3 LL / 4 LR), second digit = tooth-from-midline (1 central incisor → 8 third molar). Tooth 36 = lower-left first molar. |
| **Quadrant** | One of the four 8-tooth halves of the mouth (Upper Right, Upper Left, Lower Left, Lower Right) |
| **Arch** | Either the upper (maxillary) or lower (mandibular) row of teeth as a whole — OR the right/left half spanning both jaws ("Right arch" = upper-right + lower-right) |
| **Anterior** | Front teeth (incisors + canines, FDI 1–3 in each quadrant) |
| **Posterior** | Back teeth (premolars + molars, FDI 4–8 in each quadrant) |
| **CEJ** | Cementoenamel junction — the line where enamel meets cementum at the neck of the tooth; reference for cervical findings |
| **Mesial / Distal** | Towards / away from the midline of the dental arch |
| **Buccal / Labial** | The cheek-facing (posterior) / lip-facing (anterior) outer surface |
| **Lingual / Palatal** | The tongue-facing (lower teeth) / palate-facing (upper teeth) inner surface |
| **Occlusal / Incisal** | The chewing surface (posterior molars/premolars) / biting edge (anterior incisors) |
| **Cervical** | At the neck of the tooth — at or just above the gum line |
| **Gingiva** | The gums — the soft tissue around the teeth |
| **Vestibule** | The fold/space between cheek-or-lip and the gum |
| **TMJ** | Temporomandibular joint — the jaw joint, just in front of the ear |
| **Scaling & Polishing** | Cleaning calculus + smoothing surfaces; usually whole-mouth |
| **Root Planing** | Deeper subgingival cleaning, typically on periodontally-involved teeth |
| **Gingivitis** | Inflammation of the gums (reversible) |
| **Periodontitis** | Gum + bone disease — progression beyond gingivitis (not reversible without treatment) |
| **Calculus** | Hardened plaque/tartar |
| **Caries** | Tooth decay / cavities |
| **Attrition** | Wear from tooth-on-tooth contact |
| **Abrasion** | Wear from foreign object (hard brushing, pen biting) |
| **Abfraction** | Wear at cervical area thought to be from occlusal stress |
