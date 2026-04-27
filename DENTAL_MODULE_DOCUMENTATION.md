# Dental Module Documentation — TatvaPractice Demo

> **Purpose**: Context-sharing document for AI tools and developers working on the dental module.
> **Last updated**: 2026-04-27

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Feature List](#2-feature-list)
3. [Component Hierarchy](#3-component-hierarchy)
4. [Design System](#4-design-system)
5. [3D Dental Canvas System](#5-3d-dental-canvas-system)
6. [Tooth Data Model](#6-tooth-data-model)
7. [Single-Tooth Examination Workflow](#7-single-tooth-examination-workflow)
8. [Dentition View](#8-dentition-view)
9. [Treatment Plan System](#9-treatment-plan-system)
10. [Patient Detail Page](#10-patient-detail-page)
11. [Navigation Flow](#11-navigation-flow)
12. [Naming Conventions](#12-naming-conventions)
13. [File Inventory](#13-file-inventory)
14. [Recent Changes](#14-recent-changes)
15. [3D Performance & Loading](#15-3d-performance--loading)

---

## 1. Architecture Overview

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 14** with App Router (`app/` directory) |
| UI Library | **React 18** with `"use client"` directives throughout |
| 3D Rendering | **React Three Fiber** (`@react-three/fiber`) + `@react-three/drei` helpers + raw **Three.js** |
| Icons | **iconsax-reactjs** (general UI icons) + **TPMedicalIcon** (custom medical/dental icon library with 74+ icons, line/bulk variants) |
| Styling | **Tailwind CSS** with custom `tp-*` design tokens + scoped CSS (`dental-canvas.css`) |
| Font | **Inter** (UI body) + **Mulish** (heading variable `--font-heading`) |
| State | React `useState`/`useMemo`/`useCallback` (no external state library) |
| SSR Safety | 3D components loaded via `next/dynamic` with `ssr: false` |

### Key Patterns
- Components are `"use client"` — no server components in the dental module.
- The `DentalCanvas` is dynamically imported to avoid SSR issues with Three.js/WebGL.
- State flows top-down: `DentalCanvas` owns canonical state and exposes a `DentalCanvasState` interface that the side panel (`ExaminationTab`) consumes via a callback (`onCanvasState`).
- Mock data lives in `components/dental/mock-data.ts` and `INITIAL_TOOTH_STATE`.

---

## 2. Feature List

| Feature | Description |
|---------|-------------|
| **3D Tooth Examination** | Single-tooth 3D view with GLB models, zone highlighting, orbit controls, shader-injected surface coloring |
| **Full Dentition View** | 32-tooth panoramic arch layout with parabolic positioning, hover tooltips, click-to-select |
| **Zone-Based Findings** | 7 anatomical zones per tooth (occlusal, buccal, lingual, mesial, distal, cervical, root) with per-zone findings and notes |
| **Diagnosis System** | Tooth-level diagnoses (Implant, Missing, RCT, Crown, Bridge, etc.) + surface-level findings (Cavity/Caries, Crack, Fracture, etc.) |
| **Treatment History** | Per-tooth procedure records with multi-surface support |
| **Treatment Plan Management** | Three-tab system: Plan Estimates, In Progress, Completed |
| **Dental Score** | Computed health score (0-100) based on diagnosis/finding severity weights; conditionally hidden for new patients |
| **Onboarding Card** | First-time user guidance card shown when no examination data exists |
| **Patient Detail Page** | Six-section sidebar with visit summary, prescription, records, billing, health checkup, and dental plan navigation |

---

## 3. Component Hierarchy

```
app/
  treatment-plan/page.tsx ── route: /treatment-plan
  patient-detail/page.tsx ── route: /patient-detail
  rxpad/page.tsx           ── route: /rxpad (assumed)

RxPadPage (components/tp-rxpad/RxPadPage.tsx)
  +-- TPRxPadShell
  |     +-- TPRxPadTopNav
  |     +-- TPRxPadSecondarySidebar
  |           +-- NavPanel
  |                 +-- NavItem (x7: Past Visits, Vitals, Medical History,
  |                 |            Records, Lab Results, Personal Notes, Dental Plan)
  |                 +-- DrAgentItem
  +-- Tab Bar: [BaseRx | Dental]
  +-- ExaminationTab  (when Dental tab active)
        |
        +-- DentalCanvas  (left: 3D viewport, dynamically imported)
        |     +-- Canvas (R3F)
        |     |     +-- OrbitControls
        |     |     +-- DentitionView  (when viewMode === 'dentition')
        |     |     |     +-- ArchTooth (x32)
        |     |     |     +-- DentitionTooltip (camera-relative, with leader line)
        |     |     +-- Tooth  (when viewMode === 'single-tooth')
        |     |     |     +-- ImplantScrew / PreparedStump / RootCanals (conditional)
        |     |     +-- ZoneCameraRotator
        |     +-- ToothSelector  (bottom overlay: 32-tooth FDI chart)
        |     +-- QuickSurfaceSelector  (bottom-left: clickable SVG zone diagram)
        |     +-- MiniDentitionPreview  (bottom-right: back-to-full-view thumbnail)
        |     +-- Zone Navigator  (top-left: arrow-based zone cycling)
        |     +-- Diagnosis Summary Overlay  (top-right: badge chips)
        |
        +-- DentitionPanel  (right panel when viewMode === 'dentition')
        |     +-- ScoreCard  (dental health score, conditional)
        |     +-- Onboarding Card  (shown when no data)
        |     +-- Tooth Record Cards  (per-tooth summary)
        |
        +-- SingleToothPanel  (right panel when viewMode === 'single-tooth')
              +-- Tooth Header  (back arrow + quadrant name + FDI badge)
              +-- Section Accordion:
              |     1. Treatment History  (diagnoses + procedures)
              |     2. Diagnosis  (surface-level findings)
              |     3. Treatment Plan  (planned procedures)
              |     4. Notes  (overall tooth notes)
              +-- MiniToothCanvas  (inline 3D preview)

TreatmentPlanPage (components/dental/plan/TreatmentPlanPage.tsx)
  +-- TPRxPadShell
  |     +-- TPRxPadTopNav (back -> /rxpad)
  |     +-- TPRxPadSecondarySidebar
  +-- Page Heading: "Dental Treatment Plan"
  +-- TreatmentPlanTab
        +-- Sub-tabs: [Plan Estimates | In Progress | Completed]
        +-- ToothPicker (FDI tooth selector for adding rows)
        +-- Table/card rows per sub-tab

PatientDetailPage (components/patient-detail/PatientDetailPage.tsx)
  +-- Header (patient info, back button)
  +-- Sidebar (6 items)
  +-- Content area (switches by activeSection)
        dental-plan -> navigates to /treatment-plan
```

---

## 4. Design System

### Color Palettes (CSS custom properties)

| Token Family | Usage | Example Values |
|-------------|-------|----------------|
| `tp-slate-*` | Neutral text, borders, backgrounds | `--tp-slate-50` through `--tp-slate-900` |
| `tp-blue-*` | Primary actions, active states, links | `--tp-blue-500`, `--tp-blue-600` |
| `tp-violet-*` | Dental accent, FDI badge gradient | `#7c3aed` to `#a855f7` gradient |

### Icons

- **TPMedicalIcon**: Custom medical icon library with 74+ icons. Supports `variant="line"` (outline) and `variant="bulk"` (filled). Common dental icons: `"tooth"`, `"surgical-scissors-02"`, `"diagnosis"`, `"clipboard-activity"`, `"medical-document"`, `"health-file-03"`, `"cardiogram"`, `"medical-information"`.
- **iconsax-reactjs**: General UI icons (`ArrowLeft2`, `Add`, `Trash`, `Eye`, `Edit2`, `TickCircle`, `InfoCircle`, `SearchNormal1`, `Health`, `ClipboardText`, etc.). Support `variant="Linear"` / `"Bulk"` and `strokeWidth`.
- **ToothIcon**: Custom SVG component at `components/dental/ToothIcon.tsx`.

### Typography

| Context | Font | Size | Weight |
|---------|------|------|--------|
| Body text | Inter | 14px | 400-500 |
| Secondary/meta | Inter | 12px | 500 |
| Tiny meta | Inter | 10-11px | 500-600 |
| Section labels | Inter | 11px uppercase | 600-700 |
| Panel headings | Inter | 18px | 700 |
| Tooltip heading | Inter | 12px | 700 |
| Page heading | Inter/sans | 14px | 600 |

### Spacing Tokens

- Panel padding: `24px` (desktop), `16px` (compact)
- Card border-radius: `10-16px`
- Chip padding: `6px 14px`, border-radius: `18px`
- Gap between items: `6-10px` standard, `3-4px` tight
- Section dividers: `1px solid #f0f1f3`

---

## 5. 3D Dental Canvas System

### Shader Injection

The 3D system uses **runtime shader injection** (`injectShader` from `DentitionView.tsx` helpers) to modify GLB model materials. This enables:
- **Zone highlighting**: Each zone gets a distinct color overlay via custom shader uniforms. Colors are defined as `colorVec: [r, g, b]` tuples in `ZONE_INFO`.
- **Finding spot decals**: Procedural visual markers at the exact 3D click location (`hitPoint`) for findings like caries spots, cracks, etc.
- **Diagnosis tinting**: Whole-tooth color shifts in dentition view based on `DIAGNOSIS_COLORS`.

### ZoneId System

Seven anatomical zones per tooth:

| ZoneId | Color | Hex | Layer |
|--------|-------|-----|-------|
| `occlusal` | Teal | `#14b8a6` | crown |
| `buccal` | Orange | `#f97316` | crown |
| `lingual` | Violet | `#8b5cf6` | crown |
| `mesial` | Yellow | `#eab308` | crown |
| `distal` | Blue | `#2563eb` | crown |
| `cervical` | Pink | `#ec4899` | cervical |
| `root` | Olive-green | `#65a30d` | root |

Zone labels are context-sensitive:
- **Anterior teeth** (positions 1-3): `occlusal` -> "Incisal", `buccal` -> "Labial"
- **Upper arch** (maxillary): `lingual` -> "Palatal"
- **Lower arch** (mandibular): `lingual` -> "Lingual"

Clinical abbreviations: I (Incisal), O (Occlusal), La (Labial), B (Buccal), P (Palatal), L (Lingual), M (Mesial), D (Distal), C (Cervical), R (Root).

### Camera-Relative Tooltip Positioning

The `DentitionTooltip` component uses `useFrame` to position tooltips in **camera space** so they remain fixed on screen during orbit rotation. A **leader line** (dashed `<line>` geometry) connects the tooltip to the tooth's world-space position, updating endpoints every frame.

- Maxillary teeth: tooltip placed ABOVE
- Mandibular teeth: tooltip placed BELOW
- Horizontal nudge toward tooth's quadrant side

### Procedural Visuals

The `Tooth` component renders procedural overlays:
- `ImplantScrew` — 3D implant screw geometry
- `PreparedStump` — crown preparation visualization
- `RootCanals` — root canal treatment indication

---

## 6. Tooth Data Model

### ToothDef Interface

```typescript
interface ToothDef {
  fdi: string          // FDI number, e.g. "11", "48"
  name: string         // e.g. "Central Incisor", "Third Molar"
  position: number     // 1-8 within quadrant
  quadrant: Quadrant   // 'upper-right' | 'upper-left' | 'lower-left' | 'lower-right'
  arch: 'maxillary' | 'mandibular'
  type: 'incisor' | 'canine' | 'premolar' | 'molar'
  modelPath: string    // GLB path (left-side model)
  mirrorX: boolean     // true for right-side teeth (Q1, Q4)
}
```

### ToothEntry Interface (Entity-Centric Records)

```typescript
interface ToothEntry {
  id: string
  toothFdi: string
  kind: "finding" | "procedure" | "symptom" | "planned"
  name: string
  surfaces: ZoneId[]       // which surfaces are affected
  since?: string           // date string
  plannedDate?: string
  status?: "planned" | "in-progress" | "completed"
  notes?: string
}
```

### Finding Interface

```typescript
interface Finding {
  id: string
  zoneId: ZoneId
  type: string             // from DIAGNOSES catalog
  notes: string
  hitPoint?: [number, number, number]  // world-space 3D click location
}
```

### TEETH Array — 32 Teeth with FDI Numbering

The `TEETH` constant is an array of 32 `ToothDef` objects built by `buildTeeth()`:

| Quadrant | FDI Range | Arch | Mirror |
|----------|-----------|------|--------|
| Q1: Upper Right | 11-18 | Maxillary | Yes (mirror of Q2 models) |
| Q2: Upper Left | 21-28 | Maxillary | No (original models) |
| Q3: Lower Left | 31-38 | Mandibular | No (original models) |
| Q4: Lower Right | 41-48 | Mandibular | Yes (mirror of Q3 models) |

Positions 1-8 within each quadrant:
1. Central Incisor, 2. Lateral Incisor, 3. Canine, 4. First Premolar, 5. Second Premolar, 6. First Molar, 7. Second Molar, 8. Third Molar (Wisdom)

### Arch Positions

Teeth are positioned along a **parabolic curve** (`z = -k * x^2`):
- Upper arch: `k = 0.12`, y = 0
- Lower arch: `k = 0.14`, y = -1.8
- Right-side teeth are mirrored from left-side positions (negate X and Y-rotation)

### Catalogs

- **DIAGNOSES** (surface-level, 15 items): Cavity/Caries, Crack, Fracture, Erosion, Abrasion, Attrition, Staining, Plaque, Calculus, Restoration Defect, NCCL, Sensitivity, Resorption, Recession, Normal
- **TOOTH_DIAGNOSES** (tooth-level, 14 items): Implant, Missing, RCT, Crown, Bridge, Denture, Extraction, Composite Filling, Scaling, Polishing, Veneer, Pulp Cap, Root Planing, Fluoride Treatment
- **PROCEDURE_CATALOG** (12 items): RCT, Restoration, Extraction, Scaling, Polishing, Crown Prep, Bridge Prep, Implant Placement, Pulp Cap, Root Planing, Veneer, Composite Filling

---

## 7. Single-Tooth Examination Workflow

### Selection

1. User clicks a tooth in the dentition view **or** picks from the ToothSelector chart (bottom overlay with all 32 teeth in FDI order).
2. `viewMode` transitions from `'dentition'` to `'single-tooth'`.
3. The selected tooth's GLB model loads in the 3D viewport with orbit controls.

### Four Sections (Accordion)

The `SingleToothPanel` displays four collapsible sections, toggled by clicking their header:

| # | Section ID | Label | Content |
|---|-----------|-------|---------|
| 1 | `procedures` | **Treatment History** | Tooth-level diagnosis chips (from `TOOTH_DIAGNOSES`) + procedure entries |
| 2 | `findings` | **Diagnosis** | Surface-level findings (from `DIAGNOSES`) with zone association |
| 3 | `planned` | **Treatment Plan** | Planned procedures with surfaces and dates |
| 4 | `notes` | **Notes** | Free-text notes for the overall tooth |

### Zone Navigator

Located top-left of the 3D viewport. Allows cycling through zones with arrow buttons. Shows current zone's color dot, name, and surface label. Clicking a zone rotates the camera to that surface via `ZoneCameraRotator`.

### Multi-Surface Selection

When editing a finding/procedure row's surfaces, `multiSelectActive` is set to `true`. In this mode, clicking zones on the 3D model toggles them into `multiSelectZones` (a `Set<ZoneId>`), allowing multi-surface association.

---

## 8. Dentition View

### 32-Tooth Panoramic

All 32 teeth rendered as `ArchTooth` components positioned along the parabolic arch curve. Each tooth:
- Loads its GLB model from `/models/tooth_*.glb`
- Applies diagnosis-based tinting via `DIAGNOSIS_COLORS`
- Supports hover highlighting and click selection

### Hover Tooltips (4 Subheadings)

When a tooth is hovered (or externally hovered via summary card sync), a `DentitionTooltip` appears with:

1. **Heading**: `T{fdi} . {Quadrant} {Name}` (e.g., "T16 . Upper Right First Molar")
2. **Treatment History**: Diagnosis chips + procedure names
3. **Diagnosis**: Surface findings grouped by zone, each with zone color dot and comma-separated finding types
4. **Treatment Plan**: Planned procedure names
5. **Notes**: Overall tooth notes text

The tooltip has a dark glass-morphism background (`rgba(0,0,0,0.78)` with `blur(14px)`), a violet left border (`#a78bfa`), and a leader line connecting it to the tooth.

### External Hover Sync

The `externalHoveredFdi` prop allows summary cards in the side panel to trigger hover highlighting on the 3D model. When a user hovers a tooth record card in the `DentitionPanel`, the corresponding tooth in the 3D view highlights and shows its tooltip.

### Interaction

- **Hover**: Shows tooltip, highlights tooth
- **Click**: Selects tooth, transitions to single-tooth view
- **Pin**: Click on tooltip area pins it (persists after hover-out); ESC or background click dismisses

---

## 9. Treatment Plan System

### Three Sub-Tabs

| Tab | ID | Description |
|-----|-----|-------------|
| Plan Estimates | `estimates` | Draft and active treatment plans with line items (tooth, treatment, surfaces, rate, discount, total) |
| In Progress | `progress` | Visit-level tracking: service, tooth, sittings count, last visit, doctor, remarks, billed amount |
| Completed | `completed` | Final billing records: service, teeth treated, completed date, doctor, amount |

### Standalone Page

Route: `/treatment-plan?patientId={id}`

Rendered by `TreatmentPlanPage` which wraps `TreatmentPlanTab` inside the standard `TPRxPadShell` layout (top nav + secondary sidebar). The top nav back button returns to `/rxpad?patientId={id}`.

### Data Types

```typescript
interface PlanEstimate {
  id: string; name: string; createdAt: string
  status: "draft" | "active"
  rows: TreatmentPlanRow[]
}

interface InProgressEntry {
  id: string; planId: string; service: string; tooth: string
  sittings: number; lastVisit: string; doctor: string
  remarks: string; amount: number
}

interface CompletedEntry {
  id: string; planId: string; service: string; teeth: string
  // ... completed date, doctor, amount
}
```

### Treatment Catalog

Treatment names and rates are defined in `components/dental/plan/treatments.ts` via `TREATMENT_NAMES` and `getRate()`.

---

## 10. Patient Detail Page

Route: `/patient-detail?patientId={id}&from={page}`

### Layout

- **Header**: Back button, patient avatar, name, gender/age/DOB, phone, patient ID
- **Page title**: "Patient Details"
- **Body**: Left sidebar (220px) + right content area

### Sidebar Sections (6 Items)

| # | ID | Label | Medical Icon | Behavior |
|---|-----|-------|-------------|----------|
| 1 | `visit-summary` | Visit Summary | `clipboard-activity` | Shows visit summary content |
| 2 | `prescription` | Prescription | `medical-document` | Shows prescription content |
| 3 | `medical-records` | Medical Records | `health-file-03` | Shows records content |
| 4 | `add-bill` | Add Bill/Payment | `medical-information` | Shows billing content |
| 5 | `health-checkup` | Health Checkup Report | `cardiogram` | Shows checkup content |
| 6 | `dental-plan` | Dental Treatment Plan | `surgical-scissors-02` | **Navigates to** `/treatment-plan?patientId={id}` |

The "Dental Treatment Plan" sidebar item does not render content inline. Instead, clicking it navigates to the standalone `/treatment-plan` page.

### Active State Styling

Active sidebar item gets: `bg-tp-blue-50`, `text-tp-blue-700`, left accent bar (3px `bg-tp-blue-500`), bulk icon variant in blue.

---

## 11. Navigation Flow

```
/appointments
  |
  +-- Click patient --> /rxpad?patientId={id}
  |                       |
  |                       +-- Tab bar: [BaseRx | Dental]
  |                       |     Dental tab --> ExaminationTab (3D dental canvas)
  |                       |
  |                       +-- Secondary Sidebar NavPanel:
  |                       |     - Past Visits (panel)
  |                       |     - Vitals (panel)
  |                       |     - Medical History (panel)
  |                       |     - Records (panel)
  |                       |     - Lab Results (panel)
  |                       |     - Personal Notes (panel)
  |                       |     - Dental Plan --> navigates to /treatment-plan?patientId={id}
  |                       |
  |                       +-- Visit Summary button --> /patient-detail?patientId={id}&from=rxpad
  |
  +-- /patient-detail?patientId={id}
  |     |
  |     +-- Sidebar: Visit Summary | Prescription | Medical Records |
  |     |            Add Bill | Health Checkup | Dental Treatment Plan
  |     |
  |     +-- "Dental Treatment Plan" --> /treatment-plan?patientId={id}
  |
  +-- /treatment-plan?patientId={id}
        |
        +-- Back button --> /rxpad?patientId={id}
        +-- TreatmentPlanTab (Plan Estimates | In Progress | Completed)
        +-- Secondary Sidebar (same NavPanel as RxPad)
```

### Key Navigation Points

- **RxPad secondary sidebar**: "Dental Plan" item has `navigateTo: "/treatment-plan"`, handled in `NavPanel` via `router.push`.
- **Patient Detail sidebar**: "Dental Treatment Plan" click calls `router.push('/treatment-plan?patientId=...')`.
- **Treatment Plan page**: Back button returns to `/rxpad?patientId=...`.
- All navigation preserves `patientId` via query params.

---

## 12. Naming Conventions

### Section Names (IMPORTANT: Use these exact names)

| Correct Name | NOT This | Context |
|-------------|----------|---------|
| **Treatment History** | ~~Procedures~~, ~~Past Procedures~~ | Section 1 in single-tooth panel and dentition tooltip |
| **Diagnosis** | ~~Clinical Examination~~, ~~Findings~~ | Section 2: surface-level findings |
| **Treatment Plan** | ~~Planned~~, ~~Planned Procedures~~ | Section 3: planned future procedures |
| **Notes** | ~~Overall Tooth Notes~~ (internal label only) | Section 4: free-text notes |

### Tooth Number Format

| Correct | NOT This | Example |
|---------|----------|---------|
| `T{fdi}` | ~~#{fdi}~~ | T16, T21, T48 |

The FDI badge uses a violet gradient background (`linear-gradient(135deg, #7c3aed, #a855f7)`) with white text.

### Full Tooth Name Format

`{Quadrant} {Name}` -- e.g., "Upper Right Lateral Incisor", "Lower Left First Molar"

Quadrant labels are defined in `QUADRANT_LABELS`:
- `'upper-right'` -> "Upper Right"
- `'upper-left'` -> "Upper Left"
- `'lower-left'` -> "Lower Left"
- `'lower-right'` -> "Lower Right"

---

## 13. File Inventory

### Dental Module — Examination

| File | Description |
|------|-------------|
| `components/dental/examination/types.ts` | Core type definitions: ZoneId, Finding, ToothEntry, ToothDef, TEETH array, ZONE_INFO, arch positions, diagnosis colors |
| `components/dental/examination/ExaminationTab.tsx` | Main examination UI: side-by-side 3D canvas + context panel (DentitionPanel / SingleToothPanel), dental score computation |
| `components/dental/examination/DentalCanvas.tsx` | 3D canvas wrapper: R3F Canvas, state management, DentalCanvasState interface, view mode switching |
| `components/dental/examination/DentitionView.tsx` | 32-tooth panoramic view: ArchTooth components, DentitionTooltip with camera-relative positioning and leader line |
| `components/dental/examination/Tooth.tsx` | Single tooth 3D component: GLB model loading, zone shader injection, finding decals, implant/crown/RCT overlays |
| `components/dental/examination/dental-canvas.css` | Scoped CSS for 3D viewer: zone navigator, tooth selector, diagnosis overlays, panel layout, animations |
| `components/dental/examination/ToothSelector.tsx` | Bottom overlay: 32-tooth FDI chart for quick tooth selection |
| `components/dental/examination/QuickSurfaceSelector.tsx` | Clickable SVG zone diagram for quick surface selection |
| `components/dental/examination/ExaminationPanel.tsx` | Internal panel component (used when DentalCanvas is not in compact mode) |
| `components/dental/examination/MiniToothCanvas.tsx` | Small inline 3D tooth preview used in the side panel |
| `components/dental/examination/DiagnosisMatrix.ts` | Mutual exclusion / compatibility rules for tooth-level diagnoses |
| `components/dental/examination/Annotations.tsx` | 3D annotation overlays for findings on tooth surfaces |
| `components/dental/examination/ToothExaminationPanelTP.tsx` | TP-styled tooth examination panel variant |
| `components/dental/examination/exam-catalog.ts` | Examination type catalog data |
| `components/dental/examination/ui-icons.tsx` | Custom SVG icons (ExpandIcon, MinimizeIcon) for the examination UI |

### Dental Module — Plan

| File | Description |
|------|-------------|
| `components/dental/plan/TreatmentPlanTab.tsx` | Three-tab treatment plan UI: Plan Estimates, In Progress, Completed; with ToothPicker integration |
| `components/dental/plan/TreatmentPlanPage.tsx` | Standalone page wrapper: embeds TreatmentPlanTab in TPRxPadShell layout |
| `components/dental/plan/ToothPicker.tsx` | FDI tooth picker component for selecting teeth in plan rows |
| `components/dental/plan/treatments.ts` | Treatment name catalog and rate lookup (`TREATMENT_NAMES`, `getRate()`) |

### Dental Module — Shared

| File | Description |
|------|-------------|
| `components/dental/mock-data.ts` | Mock patient data, initial tooth state (`INITIAL_TOOTH_STATE`), treatment plan rows (`TREATMENT_PLANS`) |
| `components/dental/ToothIcon.tsx` | Custom SVG tooth icon component |
| `components/dental/LottieIcon.tsx` | Lottie animation icon wrapper |
| `components/dental/DentalModuleShell.tsx` | Shell/layout wrapper for the dental module |

### Navigation and Pages

| File | Description |
|------|-------------|
| `app/treatment-plan/page.tsx` | Next.js route for `/treatment-plan`, renders `TreatmentPlanPage` |
| `app/patient-detail/page.tsx` | Next.js route for `/patient-detail`, renders `PatientDetailPage` |
| `components/tp-rxpad/RxPadPage.tsx` | RxPad page with BaseRx/Dental tab switcher; Dental tab renders `ExaminationTab` |
| `components/tp-rxpad/secondary-sidebar/NavPanel.tsx` | Secondary sidebar navigation with 7 items + Dr.Agent; "Dental Plan" navigates to `/treatment-plan` |
| `components/patient-detail/PatientDetailPage.tsx` | Patient detail page with 6-section sidebar; "Dental Treatment Plan" navigates to `/treatment-plan` |

### TP UI Library (selected relevant components)

| File | Description |
|------|-------------|
| `components/tp-ui/medical-icons/TPMedicalIcon.tsx` | Medical icon component with 74+ icons, line/bulk variants |
| `components/tp-ui/medical-icons/registry.ts` | Icon name-to-SVG registry |
| `components/tp-ui/tp-rxpad-shell.tsx` | RxPad page shell layout (top nav + sidebar + content) |
| `components/tp-ui/tp-rxpad-top-nav.tsx` | Top navigation bar for RxPad pages |
| `components/tp-ui/tp-rxpad-secondary-sidebar.tsx` | Secondary sidebar container |
| `components/tp-ui/index.ts` | Barrel export for all TP UI components |

---

## 14. Recent Changes

| Change | Details |
|--------|---------|
| **Tooth number format: # to T** | All tooth number displays changed from `#{fdi}` to `T{fdi}` (e.g., `T16` instead of `#16`) |
| **FDI badge color: blue to violet** | FDI number badge background changed from blue to violet gradient (`linear-gradient(135deg, #7c3aed, #a855f7)`) |
| **Conditional dental score** | The `ScoreCard` component is now hidden for new patients (no examination data). An onboarding card is shown instead |
| **Onboarding card for first-time users** | When `summary.length === 0`, a dashed-border card with 3-step instructions replaces the score card: (1) Click a tooth, (2) Add diagnoses/findings, (3) Add notes and plans |
| **Enhanced 4-section dentition tooltip** | The dentition hover tooltip now shows 4 subheadings: Treatment History, Diagnosis, Treatment Plan, Notes (previously showed fewer sections) |
| **Dental plan navigation to standalone page** | "Dental Treatment Plan" in both PatientDetailPage sidebar and RxPad secondary sidebar now navigates to `/treatment-plan` instead of rendering inline. The TreatmentPlanTab import was removed from PatientDetailPage |
| **Full quadrant names in tooth records** | Tooth records and headers now display full quadrant names (e.g., "Upper Right Lateral Incisor") via `QUADRANT_LABELS` instead of abbreviated forms |
| **3D performance overhaul** *(2026-04-27)* | All `public/models/*.glb` DRACO-compressed: total payload 53 MB → 5.3 MB (90% smaller). Anterior/posterior teeth ~70–95 KB each post-compression. DRACO decoder self-hosted at `public/draco/`. Long-cache headers added in `next.config.mjs` for `/models` and `/draco` (`max-age=31536000, immutable`). |
| **CanvasLoader** *(2026-04-27)* | New component `components/dental/examination/CanvasLoader.jsx` shows a single-tooth shimmer overlay over the 3D viewer **only if loading drags past 2 s**. Tracks `useProgress()` from drei. On fast machines never renders; on slow 5G / throttled CPU it replaces the previous blank canvas. `pointerEvents: none`, ARIA `role="status"`. |
| **Project housekeeping** *(2026-04-27)* | Removed 25 orphaned assets from `public/assets/`, the entire dead `lib/export-*` chain (7 files: `export-figma.ts`, `export-figma-html.ts`, `export-component-specs.ts`, `export-tokens.ts`, `export-library.ts`, `component-tokens.ts`, `docs-navigation.ts`), unused `components/shared/TopHeader.jsx` (DrAgentPage has its own inline `TopHeader`), and stale `tsconfig.tsbuildinfo`. |

---

## 15. 3D Performance & Loading

The 3D dental viewer was the highest-impact perf surface in the app. As of the 2026-04-27 pass:

### Network budget

| Surface | Cold network | Notes |
|---|---|---|
| Full Adult Dentition (16 maxillary + mandibular permanent teeth + implant + DRACO decoder) | ~6 MB | First visit only; subsequent visits hit disk cache |
| Single Tooth view | ~70–130 KB per tooth | After preload (which fires when `Tooth.jsx` is imported) all switches are instant |
| Repeat visits | 0 bytes for `/models/*` and `/draco/*` | Served from disk cache via `Cache-Control: public, max-age=31536000, immutable` |

### Per-model breakdown (post-DRACO)

| Model | Original | Compressed | Why |
|---|---|---|---|
| `tooth_11.glb` … `tooth_38.glb` (15 perm. teeth) | 2.2 – 5.0 MB each | 65 – 130 KB each | Pure mesh; DRACO quantizes geometry to ~3% of original |
| `implant.glb` | 1.6 MB | 79 KB | Small mesh, no textures |
| `implant_pro.glb` | 4.1 MB | 163 KB | Slightly bigger detailed implant |
| `maxillary_first_molar.glb` | 4.5 MB | 2.2 MB | Has baked PNG textures — only mesh is DRACO-compressed |
| `reference_molar.glb` | 3.2 MB | 1.4 MB | Same — texture-bound |

### How it works (file map)

| Concern | File | Notes |
|---|---|---|
| Decoder bootstrap | `components/dental/examination/Tooth.jsx` (top of file) | `useGLTF.setDecoderPath('/draco/')` — global setter, runs once at module load |
| Decoder files | `public/draco/draco_decoder.wasm`, `draco_wasm_wrapper.js`, `draco_decoder.js` | Copied from `node_modules/three/examples/jsm/libs/draco/gltf/`; self-hosted to avoid CDN dependency |
| Models | `public/models/*.glb` | Binary glTF, DRACO-compressed; verify with `file public/models/<x>.glb` → `glTF binary model, version 2` |
| Cache headers | `next.config.mjs` `headers()` | Matches `/models/*` and `/draco/*` |
| Eager preload | bottom of `components/dental/examination/Tooth.jsx` | `ALL_MODEL_PATHS.forEach(p => useGLTF.preload(p))` — fires when Tooth module loads (i.e. when ExaminationTab mounts) |
| Loader UI | `components/dental/examination/CanvasLoader.jsx` | 2-second delayed shimmer; uses `useProgress()` from drei |

### Loader contract

* Renders nothing until `active && loadStart + 2000 ms`.
* Resets `visible` to `false` whenever `active` flips to `false` (so it disappears the instant loading finishes).
* Pointer-events disabled — never blocks interaction with the underlying scene.
* Inline `<style>` block keeps the component self-contained; no global CSS coupling.
* Inline tooth SVG (~400 bytes); no external icon dependency.

### Recompressing a model

```bash
npx --yes @gltf-transform/cli@latest draco \
  public/models/<name>.glb \
  public/models/<name>.glb \
  --quantize-position 14 --quantize-normal 10 \
  --quantize-texcoord 12 --quantize-color 8 --quantize-generic 12
```

Pitfall: writing to a `.tmp` extension makes gltf-transform default to glTF JSON output. Always write to a `.glb` filename (use a sibling subdir if you need a temp location, then `mv`).

### Things tried but NOT shipped

* **WebP texture transcode on the two textured molars** — gltf-transform's `webp` step extracts textures and re-references them, breaking the binary GLB packaging in our environment. Possible follow-up: extract → resize to 1024² → re-pack with explicit `glb` output, but the gain is marginal (~3 MB total).
* **Dynamic `next/dynamic` import of `DentalCanvas`** — `MiniToothCanvas` is statically imported by `ExaminationTab` and already drags Three.js into the bundle, so dynamic-importing only `DentalCanvas` doesn't shrink the initial JS chunk. Would need a coordinated dynamic-import of both.

---

## Appendix: DentalCanvasState Interface

The central state object shared between `DentalCanvas` and `ExaminationTab`:

```typescript
interface DentalCanvasState {
  viewMode: 'dentition' | 'single-tooth'
  selectedTooth: ToothDef
  selectedZone: ZoneId | null
  findings: Finding[]
  toothDiagnoses: Record<string, Set<string>>
  implantTeeth: Set<string>
  findingsByTooth: Record<string, Finding[]>
  currentToothDiagnoses: Set<string>
  currentToothNotes: string
  zoneNotes: Record<string, string>
  isImplant: boolean
  currentToothEntries: ToothEntry[]
  allEntries: ToothEntry[]
  highlightZones: ZoneId[]
  multiSelectZones: Set<ZoneId>
  hoveredToothFdi: string | null
  multiSelectActive: boolean

  // Mutation handlers
  onToggleToothDiagnosis: (diagnosis: string) => void
  onToggleImplant: () => void
  onAddFinding: (zoneId: ZoneId, type: string) => void
  onRemoveFinding: (id: string) => void
  onUpdateNotes: (zoneId: ZoneId, notes: string) => void
  onUpdateToothNotes: (notes: string) => void
  onBackToDentition: () => void
  onSelectTooth: (tooth: ToothDef) => void
  // ... additional handlers
}
```
