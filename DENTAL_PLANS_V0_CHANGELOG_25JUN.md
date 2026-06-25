# Dental Plans V0 — Changes (25 Jun 2026)

Branch: `Dental_Plans_V0`

---

## 1. Rx Preview Overhaul

### Consolidated Rx (`RxPreviewDrawer.jsx`)

- **Renamed** drawer title from "Dental prescription" to **"Consolidated Rx"**
- **Removed** the old clinical-procedures/step-wise format (ordered list with status, dots)
- **New layout**: Treatment Details as a compact single line with pipe separators
  - Format: `Root Canal Treatment | T36 | occlusal, root`
- **Visit History** shown in gray cards (`bg-tp-slate-50`) with:
  - **Visit N** as a bold heading (no colon)
  - Doctor name and date on a single line with comma separator (no dots)
  - **Clinical Notes** label in bold, followed by notes text
- **Removed** the dental chart toggle section (FlatDentitionChart)
- **Removed** the "Authorised signatory / treating dentist" signature block
- **Kept** letterhead, patient info, and footer

### Single Visit Rx (`InProgressTab.jsx` — `QuickVisitRxPreview`)

- **Three flat section headings** (no gray card background):
  - **TREATMENT DETAILS** — compact single line: `Treatment | T36 | surfaces`
  - **VISIT DETAILS** — doctor name and date on one line
  - **CLINICAL NOTES** — notes text or italic placeholder
- All headings use consistent bold uppercase styling (`text-[11px] font-bold uppercase`)
- Removed old multi-line format (Treatment/Tooth/Surface on separate rows)
- Removed `toothName` variable — only `T{number}` shown, never the full tooth name

---

## 2. Tooth Display — Number Only

All tooth references now display **only the tooth number** (e.g., `T36`), never the full anatomical name.

### Files changed:
- **`CompletedTab.jsx`** — `buildServiceDescription()` uses `T${service.toothFdi}` instead of `service.toothLabel`
- **`InProgressTab.jsx`** — Service meta summary and hover details show `toothText` only (removed `service.toothLabel (T36)` format)
- **`RxPreviewDrawer.jsx`** — Treatment details line uses `T${toothNum}`

---

## 3. Plan Builder — Edit Plan

### Menu rename (`InProgressTab.jsx`)
- Plan-level three-dot menu: **"View Plan Builder"** renamed to **"Edit Plan"**
- Opens the plan builder in **full edit mode** (no longer read-only)

### Full edit mode (`AddEditPlanDrawer.jsx`)
- **Removed** the `readOnly` variable and ALL associated guards:
  - `if (readOnly) return;` in `addTreatmentRow`, `updateRow`, `removeRow`, `clearAllRows`, `handleNameChange`
  - `readOnly` prop on plan name input and additional discount input
  - View-only header badge ("View only") — always shows edit UI with action buttons
- **Title**: Shows "Edit Plan" when editing, "Create Treatment Plan" when creating
- **Delete confirmation dialog** for ALL service deletions in edit mode:
  - Clicking the trash icon on any service row shows a confirmation dialog
  - **Contextual warning message**:
    - Services with existing visits/procedures: *"Are you sure you want to remove 'Root Canal Treatment'? This will permanently delete all associated visits, notes, and progress."*
    - Services without data: *"Are you sure you want to remove 'Root Canal Treatment'? This action cannot be undone."*
  - Uses the existing `TPConfirmDialog` component
  - Added `confirmDeleteRow` state, `serviceHasData()` helper, and `confirmRemoveRow()` handler

---

## 4. Completed Tab Enhancements (`CompletedTab.jsx`)

- **Surgery Date column** added to the completed services table (header + data cell)
- `formatProcedureDate()` helper: formats dates as `DD MMM YY`
- **"View Rx"** menu item renamed to **"View Consolidated Rx"** in the service three-dot menu

---

## 5. Service Three-Dot Menu — View Consolidated Rx (`InProgressTab.jsx`)

- Added **"View Consolidated Rx"** menu item to the active service three-dot menu (opens `RxPreviewDrawer` scoped to that service)

---

## 6. Combined Estimates View (`BillPreviewDrawer.jsx`, `PlanEstimatesTab.jsx`)

New multi-plan drawer for viewing all plan estimates together.

| Feature | Detail |
|---------|--------|
| Menu entry | **"View Combined Estimates"** in Plan Estimates header three-dot menu |
| Layout | Plan heading row → service line items → plan subtotal breakdown, repeated per plan |
| Plan subtotal breakdown | **Subtotal** → **Additional Discount** (if > 0, in red) → **Plan Total** (if any discounts) |
| Grand Total | Shown at the bottom in a bold footer row |
| Heading style | Neutral `bg-tp-slate-50` background for plan heading rows |
| Single plan fallback | If only one estimate plan exists, opens standard single-plan "Estimate Preview" |
| Text download | "Download as Text" generates combined multi-plan plain-text file |

### How it works:
- `PlanEstimatesTab` passes `planIds: estimatePlans.map(p => p.id)` to the drawer
- `BillPreviewDrawer` detects `isCombined` when `planIds.length > 1`
- Each plan group computes: `subtotal`, `serviceDiscount`, `additionalDiscount`, `planTotal`
- `PlanSubtotalRows()` renders 1–3 rows per plan depending on whether discounts exist

---

## 7. Edit Plan Icon (`InProgressTab.jsx`)

- **Changed** the "Edit Plan" menu icon from `DocumentText` to **`Edit2`** (pencil icon) in the active plan three-dot menu

---

## 8. Active Plan Safeguards (`InProgressTab.jsx`)

### Revert All to Plan — Disabled when visits exist

| State | Behavior |
|-------|----------|
| No visits on any service | "Revert All to Plan" is enabled (orange text) |
| At least one visit exists | "Revert All to Plan" is **disabled** — grayed out (`text-tp-slate-400`), `onClick` blocked |

- `hasAnyVisits = services.some(s => (s.sittings ?? []).length > 0)` computed in `PlanClusterCard`

### Delete Visit Confirmation Dialog

Clicking **"Delete visit"** in the visit three-dot menu now shows a confirmation dialog instead of deleting immediately.

| Property | Value |
|----------|-------|
| Title | "Delete Visit" |
| Warning | "Are you sure you want to delete Visit N? All clinical notes and records for this visit will be permanently removed." |
| Cancel button | "Cancel" — closes dialog, visit preserved |
| Confirm button | "Delete Visit" (red/destructive) — dispatches `REMOVE_SITTING` |

- `confirmDeleteVisit` state and `TPConfirmDialog` are in `ServiceSubCard` (same component as the menu item)

---

## 9. Rename "Bill" → "Estimate" (All plan files)

All user-facing "Bill" labels renamed to **"Estimate"** — plans produce estimates, not bills.

| Before | After | Location |
|--------|-------|----------|
| View Plan Bill | **View Plan Estimate** | Plan Estimates, Active Plans, Completed tab menus |
| View Service Bill | **View Service Estimate** | Active Plans service menu, Completed tab service menu |
| Bill Preview | **Estimate Preview** | Drawer title (single plan view) |
| View Combined Bill | **View Combined Estimates** | Plan Estimates header menu |
| Combined Bill | **Combined Estimates** | Drawer title (multi-plan view) |
| Download bill / Print bill | Download estimate / Print estimate | Tooltips and aria-labels |

Internal code identifiers (`type: "bill-preview"`, function names) kept unchanged.

---

## 10. Completed Tab Polish (`CompletedTab.jsx`)

| Change | Detail |
|--------|--------|
| **"Surgery Date" → "Date"** | Shortened column header to prevent text wrapping on narrow screens |
| **Removed header three-dot menu** | Printer import and header menu removed |

---

## Files Modified

| File | Summary |
|------|---------|
| `components/dental/plan/RxPreviewDrawer.jsx` | Complete rewrite — compact treatment details, visit cards, removed signature/chart |
| `components/dental/plan/InProgressTab.jsx` | Single-visit Rx format, Edit Plan pencil icon, tooth display, View Consolidated Rx menu, revert guard, delete visit confirmation |
| `components/dental/plan/AddEditPlanDrawer.jsx` | Full edit mode, delete confirmation dialog |
| `components/dental/plan/CompletedTab.jsx` | Tooth number display, date column header, View Service Estimate rename |
| `components/dental/plan/BillPreviewDrawer.jsx` | Combined multi-plan estimates view, subtotal/discount/total breakdown, all "Bill" → "Estimate" labels |
| `components/dental/plan/PlanEstimatesTab.jsx` | View Combined Estimates menu, View Plan Estimate rename |

---

## Commits (25 Jun 2026)

| Hash | Message |
|------|---------|
| `63355123b` | Rx preview overhaul, Edit Plan mode, tooth-number-only display, signature removal |
| `7e567647b` | Combined Estimates view, delete visit confirmation, active plan safeguards, menu renames |
| `df4d2ade8` | Combined estimates: show subtotal, additional discount, and plan total per plan |
| `cfc3d71c6` | Rename all "Bill" labels to "Estimate" across plan module |
