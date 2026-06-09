# Print rework plan — three tasks  ·  **STATUS: shipped**

> All three tasks below landed in the codebase. Sub-changes that the user
> added on top (oral always-by-type, default to By Type, SINCE width,
> Past-Procedures auto-open fix, Clear-all confirm dialog, radio-toggle
> UI for the Group By setting) shipped alongside. The plan stays here as
> a record of what was scoped vs. what shipped.

---

## Task 1 — Pedia & Mixed print views are broken

### What's happening today

`DentalChartPrintButton` (in `components/dental/examination/DentalChartPrint.jsx`)
receives `patientType` and uses it only to label the dropdown rows
(`Plain pediatric dental chart`, `Plain mixed dental chart`).

It then renders `<PrintRunner patientId={patientId} mode={…} />` — **without
forwarding `patientType`**. `PrintRunner` builds an `emptySnapshot()` and
hands it to `<RxPreviewDocument snapshot={…} settings={…} />`. That snapshot
+ settings object has no notion of dentition, so the printed odontogram
falls back to the adult chart regardless of which row was clicked.

### Why it visibly fails

- **Plain mode (pedia / mixed):** prints the adult odontogram template even
  though the row said "pediatric" / "mixed".
- **Historical mode (pedia / mixed):** `getComposedRxPreviewSnapshot()`
  reads `dental.exam.chart.<patientId>` which is keyed by FDI numbers — for
  a pedia patient, primary FDIs (51–85) don't map to any tooth in the
  adult `TEETH` array, so the rendered chart loses those rows entirely (or
  throws when a downstream component dereferences an unknown FDI).

### The fix

1. **`DentalChartPrint.jsx → PrintRunner`**
   - Add `patientType` to the props.
   - Forward it as `settings.patientType` to `RxPreviewDocument`.
   - Pass it from `DentalChartPrintButton` (`<PrintRunner … patientType={patientType} />`).

2. **`components/tp-rxpad/RxPreviewDocument.jsx`**
   - Read `settings.patientType` (default `"adult"`).
   - Where the printed dental chart is rendered (whatever calls the
     `FlatDentitionChart` / odontogram component), pass `patientType` down
     so it uses `getTeethForPatientType(patientType)` instead of the
     hard-coded adult `TEETH`.
   - In the `dentalToothListNode` / `dentalToothInlineNode` /
     `dentalToothTableNode` helpers, when iterating per-tooth records, use
     the same `getTeethForPatientType(patientType)` to drive ordering and
     labelling.

3. **`components/dental/examination/FlatDentitionChart.jsx`**
   - Already accepts `patientType` in some entry points. Confirm the
     print-path entry receives it and stops defaulting to adult.
   - Make sure `tooth-name` / quadrant-label lookups use the
     dentition-appropriate map (no implicit `TEETH[fdi]` reads).

### Validation steps (you do these after I ship)

- Switch the patient-type pill to **Pediatric**, click 🖨 → "Plain pediatric
  dental chart". Confirm the printed page shows the 20-tooth primary chart,
  not the adult one.
- Switch to **Mixed**, click 🖨 → "Historical mixed dental chart". Confirm
  every recorded finding/procedure renders and FDIs match what's on screen.

---

## Task 2 — Remove the `(9 Jun, 26)` date from all print + Dental-History views

### What's happening today

Two helpers inject a date suffix into headings:

- `components/dental/examination/FlatDentitionChart.jsx`
  ```js
  const sectionDateLabel = dt(chart?.updatedAt ?? new Date().toISOString());
  const headingWithDate = (label) => showDates ? `${label} (${sectionDateLabel})` : label;
  ```
  Used by all three views (list, inline, table) of `OralExamReport`.

- `components/tp-rxpad/RxPreviewDocument.jsx`
  ```js
  function toothLabelWithDate(block, showToothDate) {
    if (!showToothDate || !block?.toothUpdatedAt) return block?.toothLabel || "";
    const date = formatDate(block.toothUpdatedAt);
    …
    return `${label} (${date})`;
  }
  ```
  Used by `dentalToothListNode`, `dentalToothInlineNode`,
  `dentalToothTableNode`.

- `components/patient-detail/PatientDetailPage.jsx` → `DentalHistoryCard`
  renders the same `(date)` suffix on each tooth + oral row
  (the `<span class="font-normal text-[#64748b]"> (9 Jun, 26)</span>` you
  highlighted in the screenshot).

### The fix

You said:

> Remove this date everywhere. Even if it is in historical data or
> non-historical data, don't show this date.

So I will:

1. **`FlatDentitionChart.jsx`** — delete `sectionDateLabel` /
   `headingWithDate`; render plain `${label}` everywhere. Drop the
   `showDates` prop (kept defaulting to false anyway) so callers stop
   threading it through. Remove `showDates` from the print settings shape.
2. **`RxPreviewDocument.jsx`** — delete `toothLabelWithDate`; render
   `block.toothLabel` directly in all three views. Remove the
   `showToothDate` setting from the settings shape and any UI toggle that
   set it.
3. **`PatientDetailPage.jsx` → `DentalHistoryInline` / `DentalHistoryList` /
   `DentalHistoryTable`** — remove the `<span>(date)</span>` after each
   tooth label and each oral-entry label.
4. **Print Settings drawer + Preview Settings popover** — if they expose a
   "Show dates next to headings" toggle, remove that toggle entirely (it
   has no remaining purpose).

### What you'll see after

The printed sections and the Dental History card show **only** the
tooth/region label + the findings text — no `(9 Jun, 26)` parenthetical
anywhere.

---

## Task 3 — "Group by" toggle in Print Settings (By Tooth vs By Type)

This is the structural change.

### Current rendering (single mode — "by tooth")

Each printed dental section reads as:

```
Upper Right First Molar (T16): Past Procedures — Scaling, RCT;
                                Findings — Mild Gingivitis;
                                Procedures — Filling (occlusal);
                                Notes — Monitor at next visit.
Upper Left First Molar (T26): …
```

The heading is the **tooth**, and inside the tooth we list each kind of
record.

### New rendering (toggle — "by type")

```
Past Procedures
  T16 (Upper Right First Molar): Scaling, RCT
  T26 (Upper Left First Molar): Crown
  T36 (Lower Left First Molar): Extraction

Findings
  T16: Mild Gingivitis
  T26: Recurrent caries

Procedures
  T26: Filling (occlusal)
  T36: Apicoectomy (planned)

Overall Teeth Notes
  T16: Monitor at next visit
  T36: Re-X-ray in 2 weeks
```

The four top-level categories are:

| Category             | Source of truth                                                       |
|----------------------|-----------------------------------------------------------------------|
| **Past Procedures**  | `chart.entries` filtered by `kind === "past"` (oral) + per-tooth `PrimaryDiagnosisBody` rows (single-tooth diagnoses) |
| **Findings**         | `chart.entries` filtered by `kind === "finding"` + per-tooth `EntryTab kind="finding"` |
| **Procedures**       | `chart.entries` filtered by `kind === "procedure"` (oral) + per-tooth `EntryTab kind="planned"` (planned tooth procedure) |
| **Overall Teeth Notes** | `chart.toothNotes` (and `chart.oralNotes` if non-empty)            |

Both oral-region rows (`WHOLE_MOUTH`, `UR`, …) **and** per-tooth rows live
under the same heading; the inner row label tells you which one
(`Whole mouth: Scaling` vs `T16 (Upper Right First Molar): Scaling`).

### Where the toggle goes

**Both** surfaces get the same control, kept in sync via the same setting:

1. **Print Settings drawer** (`PrintSettingsDrawer.tsx`)
   Add a new "Group by" section below the existing "Sections" block:

   ```
   GROUP BY
   ●  By Tooth     Each tooth is a heading with its findings, past
                   procedures, planned procedures, and notes underneath.
   ○  By Type      Each kind is a heading (Past Procedures, Findings,
                   Procedures, Overall Teeth Notes) with the teeth that
                   have that kind listed underneath.
   ```

   Default: **By Tooth** (matches today's behavior — no regression).

2. **Preview Settings gear popover** (the one inside the Rx Preview drawer)
   Same control, same wording, same default. Edits to either surface
   write back to the shared `settings.groupBy` value so the preview and
   the print match.

### Settings shape

Today the print/preview settings look like:

```js
{ view: "list" | "inline" | "table", showDentalChart: boolean,
  includePastHistory: boolean, /* + a few overrides */ }
```

Add one field:

```js
groupBy: "tooth" | "type"   // default "tooth"
```

Persistence: same scheme as the other print settings (URL/state in the
drawer, in-memory in the preview popover — no localStorage change required).

### Rendering plumbing

- **`RxPreviewDocument.jsx`** — keep the existing
  `dentalToothListNode` / `dentalToothInlineNode` / `dentalToothTableNode`
  helpers as the **By Tooth** path.
- Add three new sibling helpers — `dentalTypeListNode` /
  `dentalTypeInlineNode` / `dentalTypeTableNode` — for the **By Type**
  path. They iterate the same per-tooth structure but pivot it so the
  category becomes the heading and each tooth becomes a row underneath.
- The wrapper picks one or the other based on `settings.groupBy`.
- Both shapes share the same row formatter (so the visual style stays
  identical — only the grouping flips).
- The toggle has no effect on the **oral** section (it's already by
  region, not by tooth); only the per-tooth dental section pivots.

### Edge cases I'll handle

- A type with zero rows for this patient → heading is suppressed (don't
  print "Findings (none)").
- Inside a category, teeth are sorted by FDI ascending (consistent with
  the chart order).
- For the **Procedures** category, oral-region procedure rows render
  *before* per-tooth planned procedure rows so the section flows from
  whole-mouth → site-specific.
- **Overall Teeth Notes** only includes teeth where the note is a
  non-empty trimmed string.

---

## What I'll need from you before I start

Just a "go ahead" once you've read this. I'll then implement Task 1, push
it, ask you to verify the pedia/mixed print works, and only then move to
Tasks 2 + 3 (which I'll bundle into one commit since they share the same
RxPreviewDocument / FlatDentitionChart / PatientDetailPage edits).

If anything in the **Task 3 categorisation table** is wrong — e.g. you
want "Planned procedures" as its own category separate from "Procedures",
or you want oral and per-tooth rows in *separate* sub-headings rather
than mixed — tell me which row to change and I'll update the plan
before touching code.
