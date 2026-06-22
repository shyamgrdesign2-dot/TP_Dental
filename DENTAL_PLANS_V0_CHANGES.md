# Dental Plans V0 — Change Summary

Branch: `Dental_Plans_V0`

This document lists all changes made to decouple Dental Plans from the appointment/Rx pad flow and make it a standalone module.

---

## 1. Standalone Dental Plans (Decoupled from Rx Pad & Appointments)

- Removed all connectivity between the Dental Treatment Plan module and the Rx Pad / appointment booking flow
- Plans operate independently — no appointment creation, no Rx pad session linking
- Entry points restored in Rx pad sidebar and patient detail navigation (commit `c36a6d2ac`)
- Visit records (sittings) are created directly within the plan, not through appointment bookings

### Files changed
- `components/dental/plan/plan-context.jsx` — standalone plan state management
- `components/dental/plan/InProgressTab.jsx` — removed appointment booking flow
- `components/dental/plan/plan-types.ts` — updated drawer type definitions

---

## 2. Create Plan / Add-Edit Plan Drawer

- Added **Rate per Tooth** column in the service table
- Added **Discount** column with inline editing
- **ToothPicker** — shows up to 6 chips (3 per row × 2 rows) before overflow; `+N` overflow chip with instant tooltip showing remaining teeth
- **SurfacePicker** — individual surface tooltips on abbreviated chips
- Auto-height rows (removed fixed `h-[52px]`, now `min-h-[46px]` with `py-[6px]`)
- Wider columns for better readability
- Removed "From today's dental examination" suggestions section

### Files changed
- `components/dental/plan/AddEditPlanDrawer.jsx`
- `components/dental/plan/ToothPicker.jsx`
- `components/dental/plan/PlanEstimatesTab.jsx`

---

## 3. Bill Preview Redesign

- 5-column table layout: `#`, `Description`, `Rate`, `Disc.`, `Amount`
- Light neutral outer stroke (`1px solid #cbd5e1`) with `10px` border radius
- Inner cell borders: `tp-slate-200` (consistent neutral dividers)
- Header row: `bg-tp-slate-100` with `font-semibold text-tp-slate-600`
- Multi-tooth descriptions: `"N teeth (T11, T12, ...)"` format
- Discount column: red for discounts, `"—"` dash for none
- Summary rows in `<tfoot>`: Subtotal, Service Discount, Additional Discount, Total
- Total row: `bg-tp-slate-50` with bold styling
- Single-service view: gray info banner at top
- Print CSS updated to match (lighter borders, rounded corners)

### Files changed
- `components/dental/plan/BillPreviewDrawer.jsx`
- `components/dental/plan/plan-print-styles.css`

---

## 4. Record Visit (Add Sitting) — Simplified

- Removed **Remarks** field — only **Notes** remains
- Removed appointment booking button from `ServiceSubCard`
- Visit records created directly via the `+` button on each service line
- Each sitting stores: `id`, `date`, `doctor`, `createdAt`, `notes`
- No visit type linked to appointment status

### Files changed
- `components/dental/plan/AddSittingDrawer.jsx`
- `components/dental/plan/InProgressTab.jsx`

---

## 5. Visit Timeline (In-Progress Tab)

- **Fully decoupled from appointments** — the timeline builder (`buildVisitTimelineEntries`) no longer includes appointment-type entries; only sittings and direct consultations remain
- **Removed all appointment rendering** — the entire `if (entry.kind === "appointment")` block (~160 lines) was deleted; no appointment cards appear in the timeline
- **Removed all status badges** (`Completed`, `Cancelled`, `Upcoming`) from visit cards — visits are not linked to appointments, so status badges don't apply
- **Simplified sitting cards** — removed `isCancelledSit`/`isUpcomingSit` conditional logic; sittings are simple visit records (no cancelled/scheduled states). Always rendered with default styling, no strikethrough or rose tint
- Removed `"Planned:"` tag from timeline entries
- **Removed full subtext row** (Date, Visit Type, Notes metadata line) — replaced with a compact date+time pill tag next to the doctor's name
- Visit cards now show: doctor name + date pill, "View Rx" button, and clinical notes box below
- Three-dot menu on sittings: Edit visit, View Rx (when notes exist), Delete visit
- Clinical notes shown in a dedicated box below the card header — no duplicate notes in subtext

### Files changed
- `components/dental/plan/InProgressTab.jsx`

---

## 6. Service Status & End Plan Flow

- **Removed "Yet to start"** from `STATUS_OPTIONS` — services start as `In Progress` or remain unstarted
- Status options: `In Progress`, `Completed`, `No Show`, `Not Interested`, `Cancelled`
- **"No Show"** styled in red (`text-tp-error-600`)
- **End Plan** button (renamed from "Mark All Done") — enabled only when all services are resolved (completed / cancelled / no-show / not-interested)
- If unresolved services exist, confirmation dialog lists them before allowing end
- **Info icon** on each service with tooltip showing service details (treatment, tooth, surfaces, amount)
- **"View Rx"** and **"View Plan Bill"** options in the three-dot menu per service

### Files changed
- `components/dental/plan/InProgressTab.jsx`
- `components/dental/plan/CompletedTab.jsx`

---

## 7. Rx / Dental Prescription View

- **Visit History** section added per service — shows each sitting with date, doctor, and clinical notes
- **Dental Chart** — toggleable section using `FlatDentitionChart`, collapsed by default with chevron toggle
- Available from Completed tab via service three-dot menu → "View Rx"

### Files changed
- `components/dental/plan/RxPreviewDrawer.jsx`

---

## 8. Visit Rx Preview (Per-Sitting Rx Drawer)

- **Fully decoupled from Rx Pad** — no longer uses `RxPreviewDocument` or `getComposedRxPreviewSnapshot`; renders the sitting's own data directly
- **Clinic letterhead** — TP Dental Care header with doctor credentials and clinic address
- **Patient details** — name, ID, age/sex, mobile, blood group, plan name in a 2-column grid
- **Body content** — three clearly separated sections:
  1. **Teeth Details** — `Tooth: T36 (Lower Left First Molar)`, `Surface: occlusal, root`
  2. **Visit Details** — doctor name, date with time in parentheses (parsed from `sit.date` combined field)
  3. **Clinical Notes** — renders the sitting's notes as plain text; shows italic placeholder when empty
- **Treatment heading** — bold standalone heading above the three sections (e.g. "Root Canal Treatment")
- **Dental chart toggle** — tonal CTA button in the drawer header (`bg-tp-slate-100`, matching nearby icon buttons) with a custom SVG checkbox (blue fill + white checkmark when checked, white with gray border when unchecked) and "Dental Chart" label; toggles `FlatDentitionChart` visibility, shown by default
- **Dental chart section** — when visible, shows "DENTAL CHART" sub-heading with a "Hide" text button on the right; clicking "Hide" or unchecking the header checkbox both hide the chart
- **Print support** — toggle button has `data-print-visible` attribute so it persists in print; dental chart renders in print when toggled on

### Files changed
- `components/dental/plan/InProgressTab.jsx` — `QuickVisitRxPreview` component rewritten

---

## 9. Global UI Updates

- **Tooltip styling** — all tooltips now use dark background (`#1e293b`) with white text (was white bg with dark text)
- Arrow color updated to match dark background

### Files changed
- `components/ui/tooltip.jsx`

---

## 10. Examination Table — WHEN Column for Planned Procedures

- **Oral Planned Procedures** — added "WHEN" column with a native calendar date picker (`<input type="date">`) showing "DD/MM/YYYY" placeholder + calendar icon; clicking opens the browser date picker directly (no dropdown)
- **Oral Past Procedures** — already had "WHEN" column with `SinceDropdown` (no change)
- **Dental (per-tooth) Planned Procedures** — added "WHEN" column with the same calendar date picker; previously only findings/symptoms had a date column (`hasDate`); now `kind === "procedure"` and `kind === "planned"` also get the column with a "WHEN" header and calendar picker
- **Findings / Symptoms** — unchanged; still use `SinceDropdown` with "SINCE" header (e.g. "5 days", "2 weeks", custom date)
- **Removed empty column** from oral planned procedures table (previously rendered an empty `<th>` / `<td>` because the heading ternary returned `""` for `kind === "procedure"`)

### Files changed
- `components/dental/examination/ExaminationTab.jsx` — `OralTable` header + body cell, `EntryTab` `hasDate` condition + header label

---

## File Index

| File | What changed |
|------|-------------|
| `plan-context.jsx` | Standalone state, sitting CRUD, drawer types |
| `plan-types.ts` | Type defs for sittings, drawers, service status |
| `AddEditPlanDrawer.jsx` | Rate/tooth, discount, auto-height rows, wider columns |
| `AddSittingDrawer.jsx` | Simplified — notes only, no remarks |
| `InProgressTab.jsx` | Removed appointment flow, status badges, booking button; added visit timeline, end plan, info icon, Visit Rx preview |
| `CompletedTab.jsx` | View Rx / View Plan Bill in dropdown, no-show red styling |
| `PlanEstimatesTab.jsx` | Updated table columns |
| `BillPreviewDrawer.jsx` | 5-column table, light stroke, rounded corners |
| `RxPreviewDrawer.jsx` | Visit history + toggleable dental chart |
| `ToothPicker.jsx` | 6-chip layout, overflow tooltip |
| `plan-print-styles.css` | Lighter print borders, rounded table |
| `ExaminationTab.jsx` | WHEN column for planned procedures (oral + dental per-tooth) |
| `tooltip.jsx` | Dark bg, white text globally |
