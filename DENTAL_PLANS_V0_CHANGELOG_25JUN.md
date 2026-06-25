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

## Files Modified

| File | Summary |
|------|---------|
| `components/dental/plan/RxPreviewDrawer.jsx` | Complete rewrite — compact treatment details, visit cards, removed signature/chart |
| `components/dental/plan/InProgressTab.jsx` | Single-visit Rx format, Edit Plan menu, tooth display, View Consolidated Rx menu |
| `components/dental/plan/AddEditPlanDrawer.jsx` | Full edit mode, delete confirmation dialog |
| `components/dental/plan/CompletedTab.jsx` | Tooth number display, surgery date column, menu rename |
