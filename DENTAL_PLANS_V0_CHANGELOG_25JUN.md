# Dental Plans V0 — Changelog (25 Jun 2026)

Branch: `Dental_Plans_V0`

---

## 1. Rx Preview — Complete Redesign

The prescription preview has been completely rewritten for both consolidated and single-visit views.

### Consolidated Rx (multi-visit prescription)

Previously, the consolidated Rx displayed clinical procedures in a step-wise ordered list with status indicators and dot separators. This has been replaced with a cleaner, more readable layout.

**New format:**
- **Treatment Details** are shown as a single compact line using pipe separators — for example: `Root Canal Treatment | T36 | occlusal, root`
- **Visit History** is presented in soft gray cards, each showing the visit number as a bold heading, the doctor name and date on one line, and any clinical notes below
- The dental chart toggle (FlatDentitionChart) and the "Authorised signatory / treating dentist" signature block have been removed — these added clutter without adding clinical value
- The drawer title has been changed from "Dental prescription" to "Consolidated Rx"

### Single Visit Rx (per-visit prescription)

The single-visit Rx has been simplified into three clean sections:
- **Treatment Details** — treatment name, tooth number, and surfaces on one line
- **Visit Details** — doctor name and date
- **Clinical Notes** — the notes or an italic placeholder if empty

All section headings use a consistent bold uppercase style for visual clarity.

---

## 2. Tooth Display — Number Only

Across all plan screens, tooth references now show **only the tooth number** (e.g., `T36`) instead of the full anatomical name (e.g., `Lower Left First Molar (T36)`).

This applies to the Completed Tab service descriptions, the In-Progress Tab service summaries, and the Rx preview treatment details line. The change keeps the UI compact and avoids inconsistencies between tooth naming conventions.

---

## 3. Edit Plan — Full Edit Mode

### What changed

The plan builder was previously opened in **read-only mode** when accessed from an active plan. Users could view the plan but not make changes. This has been changed so the plan builder always opens in **full edit mode**.

- The three-dot menu label has been renamed from "View Plan Builder" to **"Edit Plan"**
- The menu icon has been changed from a document icon to a **pencil icon** (Edit2) to better communicate that the plan is editable
- The drawer title shows "Edit Plan" when editing an existing plan and "Create Treatment Plan" when creating a new one

### Delete confirmation in edit mode

When removing a service from the plan in edit mode, a confirmation dialog now appears instead of deleting immediately. The warning message is contextual:
- If the service has existing visits or clinical data: *"Are you sure you want to remove 'Root Canal Treatment'? This will permanently delete all associated visits, notes, and progress."*
- If the service has no data yet: *"Are you sure you want to remove 'Root Canal Treatment'? This action cannot be undone."*

---

## 4. Combined Estimates View

A new multi-plan view has been added that lets users see all their plan estimates together in a single drawer.

### How to access it

In the **Plan Estimates** tab header, the three-dot menu now includes a **"View Combined Estimates"** option. This opens a drawer that shows all draft and active plans combined into one view. If there is only one plan, it falls back to the standard single-plan estimate preview.

### Layout

Each plan is shown as a group with:
1. A **plan heading row** with the plan name on a soft gray background
2. Individual **service line items** with treatment name, tooth, surfaces, and cost
3. A **plan subtotal breakdown** at the bottom of each group:
   - Subtotal (sum of all services in that plan)
   - Additional Discount (shown in red, only if a discount was applied)
   - Plan Total (shown only when discounts exist, so the user can see the net amount)
4. A **Grand Total** row at the very bottom summing all plans together

The drawer also supports downloading the combined estimates as a plain-text file.

---

## 5. Active Plan Safeguards

### Revert All to Plan — disabled when visits exist

The "Revert All to Plan" option in the active plan menu is now **disabled** (grayed out) whenever any service in the plan has at least one recorded visit. This prevents accidental data loss — reverting a plan would reset service statuses, but the visit records would be orphaned.

### Delete Visit — confirmation dialog

Previously, clicking "Delete visit" in a visit's three-dot menu would immediately remove the visit with no confirmation. Now, a confirmation dialog appears:
- **Title:** "Delete Visit"
- **Warning:** "Are you sure you want to delete Visit N? All clinical notes and records for this visit will be permanently removed."
- **Actions:** Cancel (preserves the visit) or Delete Visit (red button, removes the visit)

---

## 6. "Bill" to "Estimate" — Terminology Correction

All user-facing labels that said "Bill" have been renamed to **"Estimate"** across the entire plan module. Plans in this system produce cost estimates, not invoices or bills, and the terminology should reflect that.

| What changed | New label |
|---|---|
| View Plan Bill | View Plan Estimate |
| View Service Bill | View Service Estimate |
| Bill Preview (drawer title) | Estimate Preview |
| View Combined Bill | View Combined Estimates |
| Combined Bill (drawer title) | Combined Estimates |
| Download bill / Print bill (tooltips) | Download estimate / Print estimate |

This rename applies across all tabs — Plan Estimates, Active Plans (In-Progress), and Completed. Internal code identifiers (variable names, action types) were left unchanged since they don't affect the user experience.

---

## 7. Completed Tab Polish

Two small refinements to the Completed services table:

- **"Surgery Date" column header shortened to "Date"** — the full label was causing text wrapping on narrow screens, and "Date" is clear enough in context since it always refers to the procedure date
- **"View Consolidated Rx"** menu item added to the service three-dot menu, replacing the shorter "View Rx" label for consistency with the In-Progress tab

---

## Files Modified

| File | What changed |
|---|---|
| `RxPreviewDrawer.jsx` | Complete rewrite of consolidated and single-visit Rx layouts |
| `InProgressTab.jsx` | Edit Plan icon, tooth display, View Consolidated Rx menu, revert guard, delete visit confirmation |
| `AddEditPlanDrawer.jsx` | Full edit mode (removed read-only), delete service confirmation dialog |
| `CompletedTab.jsx` | Tooth number display, date column header, menu renames |
| `BillPreviewDrawer.jsx` | Combined multi-plan estimates, subtotal/discount/total breakdown, Bill-to-Estimate labels |
| `PlanEstimatesTab.jsx` | View Combined Estimates menu, View Plan Estimate rename |

All files are in `components/dental/plan/`.

---

## Commits

| Hash | Description |
|---|---|
| `63355123b` | Rx preview overhaul, Edit Plan mode, tooth-number-only display, signature removal |
| `7e567647b` | Combined Estimates view, delete visit confirmation, active plan safeguards, menu renames |
| `df4d2ade8` | Combined estimates: show subtotal, additional discount, and plan total per plan |
| `cfc3d71c6` | Rename all "Bill" labels to "Estimate" across plan module |
