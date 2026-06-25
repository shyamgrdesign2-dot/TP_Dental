# Dental Plans V0 — Change Summary

> Branch: `Dental_Plans_V0`
>
> Decouples Dental Treatment Plans from the Rx Pad / appointment flow and makes them a standalone module. Also adds examination-level date columns, print improvements, and appointment-level quick actions.

---

## 1. Standalone Dental Plans

Plans now operate independently — no appointment creation, no Rx Pad session linking. Visit records (sittings) are created directly within the plan.

| What | Detail |
|------|--------|
| Decoupled from Rx Pad | Removed all connectivity between Treatment Plan and Rx Pad / appointment booking |
| Entry points restored | Rx Pad sidebar + patient detail navigation (`c36a6d2ac`) |
| Direct sittings | Visit records created within the plan, not via appointment bookings |

**Files:** `plan-context.jsx`, `InProgressTab.jsx`, `plan-types.ts`

---

## 2. Create Plan / Add-Edit Plan Drawer

| Feature | Detail |
|---------|--------|
| Rate per Tooth | New column in the service table |
| Discount | Inline editable column |
| ToothPicker | Up to 6 chips (3 per row x 2 rows); `+N` overflow chip with tooltip |
| SurfacePicker | Individual surface tooltips on abbreviated chips |
| Auto-height rows | Replaced fixed `h-[52px]` with `min-h-[46px]` + `py-[6px]` |
| Wider columns | Better readability across the table |
| Removed suggestions | "From today's dental examination" section removed |

**Files:** `AddEditPlanDrawer.jsx`, `ToothPicker.jsx`, `PlanEstimatesTab.jsx`

---

## 3. Bill Preview Redesign

Clean 5-column table (`#`, `Description`, `Rate`, `Disc.`, `Amount`) with light neutral borders, rounded corners, and summary footer rows (Subtotal, Service Discount, Additional Discount, Total). Multi-tooth descriptions use `"N teeth (T11, T12, ...)"` format. Single-service view shows a gray info banner.

**Files:** `BillPreviewDrawer.jsx`, `plan-print-styles.css`

---

## 4. Record Visit (Add Sitting)

Simplified to essentials: removed Remarks field (only Notes remains), removed appointment booking button from `ServiceSubCard`. Each sitting stores `id`, `date`, `doctor`, `createdAt`, `notes`.

**Files:** `AddSittingDrawer.jsx`, `InProgressTab.jsx`

---

## 5. Visit Timeline (In-Progress Tab)

| Removed | Added |
|---------|-------|
| All appointment-type entries (~160 lines) | Compact date+time pill next to doctor name |
| Status badges (Completed, Cancelled, Upcoming) | "View Rx" button on each card |
| `isCancelledSit` / `isUpcomingSit` logic | Three-dot menu: Edit, View Rx, Delete |
| Full subtext row (date, visit type, notes) | Clinical notes box below card header |
| `"Planned:"` tag | — |

**Files:** `InProgressTab.jsx`

---

## 6. Service Status & End Plan Flow

- Status options: `In Progress`, `Completed`, `No Show`, `Not Interested`, `Cancelled` (removed "Yet to start")
- **"No Show"** styled in red (`text-tp-error-600`)
- **End Plan** button — enabled only when all services are resolved; shows confirmation dialog listing unresolved services
- **Info icon** per service with tooltip (treatment, tooth, surfaces, amount)
- Three-dot menu per service: "View Rx", "View Plan Bill"

**Files:** `InProgressTab.jsx`, `CompletedTab.jsx`

---

## 7. Rx / Dental Prescription View

Visit History section per service (date, doctor, clinical notes) + toggleable Dental Chart using `FlatDentitionChart`. Available from Completed tab via "View Rx".

**Files:** `RxPreviewDrawer.jsx`

---

## 8. Visit Rx Preview (Per-Sitting Rx Drawer)

Fully decoupled from Rx Pad — renders the sitting's own data directly with clinic letterhead, patient details grid, and three content sections (Teeth Details, Visit Details, Clinical Notes). Dental chart toggle in drawer header with print support.

**Files:** `InProgressTab.jsx` (`QuickVisitRxPreview` component)

---

## 9. Global UI Updates

- **Tooltip styling** — dark background (`#1e293b`) with white text (was white bg + dark text)

**Files:** `tooltip.jsx`

---

## 10. Examination Table — WHEN Column

| Table | Column | Control |
|-------|--------|---------|
| Oral Planned Procedures | WHEN | Native `<input type="date">` with DD/MM/YYYY placeholder + calendar icon |
| Dental (per-tooth) Planned Procedures | WHEN | Same calendar date picker |
| Findings / Symptoms | SINCE | `SinceDropdown` (unchanged — "5 days", "2 weeks", custom date) |

Removed empty column from oral planned procedures table (heading ternary previously returned `""` for `kind === "procedure"`).

**Files:** `ExaminationTab.jsx`

---

## 11. Print Views — WHEN Column & Date Format

| Rule | Detail |
|------|--------|
| Date format | `DD MMM YY` (e.g. "22 Jun 26") — formatted in snapshot builder before storing |
| Findings | "Since" column header, `"since <date>"` text prefix |
| Past Procedures | "When" column header, `"on <date>"` text prefix |
| Planned Procedures | "When" column header, `"on <date>"` text prefix |

Applied across all print modes (list, inline, table) and both groupings (by-tooth, by-type), plus oral examination tables.

**Files:** `ExaminationTab.jsx`, `FlatDentitionChart.jsx`, `RxPreviewDocument.jsx`

---

## 12. Appointment Three-Dot Menu

Functional dropdown menu on the three-dot button in the appointments table. Appears across all tabs (Queue, Finished, Cancelled, Draft, Pending Digitisation).

| Option | Action |
|--------|--------|
| **Dental Plan** | Opens `/treatment-plan?patientId=...` |
| **Patient Profile** | Opens `/patient-detail?patientId=...` |
| **Preview Rx** | Opens `/rxpad/end-visit?patientId=...` |
| **Delete** | Removes appointment from list (red styling) |

Uses Radix `DropdownMenu` — same pattern as `CalendarEventMenu`.

**Files:** `DrAgentPage.jsx`

---

## 13. Rx Preview Overhaul

| Change | Detail |
|--------|--------|
| Tooth-number-only display | Bill preview and Rx drawers show `T{number}` only, not full anatomical names |
| Edit Plan mode | Drawer opens in edit mode when triggered from in-progress plan menu |
| Signature removal | Removed doctor signature block from Rx preview |
| Edit Plan icon | Changed from `DocumentText` to `Edit2` (pencil) icon in active plan menu |

**Files:** `RxPreviewDrawer.jsx`, `InProgressTab.jsx`, `BillPreviewDrawer.jsx`

---

## 14. Combined Estimates View

View all plan estimates in a single bill-style drawer when multiple plans exist.

| Feature | Detail |
|---------|--------|
| Menu entry | "View Combined Estimates" in Plan Estimates three-dot menu |
| Layout | Plan heading row → service line items → plan subtotal, repeated per plan, then grand total |
| Heading style | Neutral `bg-tp-slate-50` background for plan heading rows |
| Single plan fallback | If only one plan exists, opens standard "Bill Preview" instead |
| Text download | "Download as Text" generates combined multi-plan plain-text bill |

**Files:** `BillPreviewDrawer.jsx`, `PlanEstimatesTab.jsx`

---

## 15. Active Plan Safeguards

| Feature | Detail |
|---------|--------|
| Revert All to Plan — disabled | Grayed out and unclickable once any service has at least one visit recorded |
| Delete Visit confirmation | Clicking "Delete visit" in the visit three-dot menu now shows a TPConfirmDialog with warning text before removing |

**Files:** `InProgressTab.jsx`

---

## 16. Completed Tab Polish

| Change | Detail |
|--------|--------|
| "Surgery Date" → "Date" | Shortened column header to prevent text wrapping |
| "View Plan Bill" → "View Service Bill" | Service-level menu item renamed (plan-level stays "View Plan Bill") |
| Removed header three-dot menu | Printer import and header menu removed from Completed tab |

**Files:** `CompletedTab.jsx`

---

## File Index

| File | Sections | What changed |
|------|----------|-------------|
| `plan-context.jsx` | 1 | Standalone state, sitting CRUD, drawer types |
| `plan-types.ts` | 1 | Type defs for sittings, drawers, service status |
| `AddEditPlanDrawer.jsx` | 2 | Rate/tooth, discount, auto-height rows, wider columns |
| `AddSittingDrawer.jsx` | 4 | Simplified — notes only, no remarks |
| `InProgressTab.jsx` | 1, 4, 5, 6, 8, 13, 15 | Decoupled visits, timeline, end plan, Visit Rx preview, edit icon, revert guard, delete visit confirm |
| `CompletedTab.jsx` | 6, 16 | View Rx / View Service Bill, date header, no-show red styling |
| `PlanEstimatesTab.jsx` | 2, 14 | Updated table columns, View Combined Estimates |
| `BillPreviewDrawer.jsx` | 3, 14 | 5-column table, combined multi-plan estimates view |
| `RxPreviewDrawer.jsx` | 7, 13 | Visit history + toggleable dental chart, signature removal |
| `ToothPicker.jsx` | 2 | 6-chip layout, overflow tooltip |
| `plan-print-styles.css` | 3 | Lighter print borders, rounded table |
| `ExaminationTab.jsx` | 10, 11 | WHEN column + snapshot date formatting |
| `FlatDentitionChart.jsx` | 11 | OralExamReport: When/Since headers + prefix |
| `RxPreviewDocument.jsx` | 11 | Print table headers: When for procedures |
| `tooltip.jsx` | 9 | Dark bg, white text globally |
| `DrAgentPage.jsx` | 12 | Three-dot dropdown menu on appointment rows |
