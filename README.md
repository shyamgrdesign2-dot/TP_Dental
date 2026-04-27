# TP Dental Demo — Engineering Reference

A Next.js demo of TatvaPractice's dental EMR. The headline surface is the **3D dental examination** (full-arch dentition + per-tooth detail), wired into a Rx pad workflow with a Dr. Agent assistant panel.

This document is the engineering entry point. For clinical/feature depth see [`DENTAL_MODULE_DOCUMENTATION.md`](./DENTAL_MODULE_DOCUMENTATION.md). For the shared confirm-dialog pattern see [`TP_CONFIRM_DIALOG.md`](./TP_CONFIRM_DIALOG.md).

---

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.1 (App Router, Turbopack) |
| Runtime | React 19.2 |
| 3D | Three.js 0.183 + `@react-three/fiber` 9 + `@react-three/drei` 10 |
| Styling | Tailwind 4 + SCSS modules + a small set of token files in `styles/` |
| Primitives | Radix UI (dialogs, popovers, dropdowns, tabs, etc.) + shadcn-style wrappers in `components/ui/` |
| Charts | Recharts |
| Icons | `iconsax-reactjs` (general) + custom `TPMedicalIcon` set under `components/tp-ui/medical-icons` |
| Forms | `react-hook-form` + `zod` |
| State | Local React state. No global store; cross-component state flows through context (`billing-catalog-context`, `rxpad-chrome-context`) and a few singleton stores in `components/tp-rxpad/*-store.ts` |

No backend in this repo — everything is mock data under `components/dental/mock-data*`, `lib/appointment-patients.ts`, and `lib/billing-catalog.ts`.

---

## 2. Layout

```
app/                       Next.js App Router routes
  appointments/            Daily queue + walk-in entry
  rxpad/                   Visit / Rx pad shell (hosts the dental examination)
  patient/[id]/            Patient detail with sidebar (vitals, history, etc.)
  ...

components/
  dental/
    examination/           3D viewer + per-tooth findings, the heart of the app
    plan/                  Treatment plans, exam suggestions, billing roll-up
    ...
  tp-rxpad/
    dr-agent/              Floating agent panel (chat + structured cards)
    secondary-sidebar/     Patient secondary nav
    *-store.ts             Singleton mini-stores (preview snapshot, dental AI, etc.)
  tp-ui/                   Reusable design-system primitives (TPButton, TPTag, TPInput, ...)
  tp-appointment-screen/   Appointments page composition
  ui/                      Low-level shadcn-style wrappers (do not edit directly)

lib/                       Cross-cutting helpers, mock data, design tokens
hooks/                     Reusable hooks (sidebar, mobile, dirty-drawer guard)
public/
  models/    DRACO-compressed glTF tooth models (~5.3 MB total)
  draco/     Self-hosted DRACO decoder (wasm + JS shim)
  assets/    Images / SVG used by composition surfaces
  icons/     SVG icon library
  lottie/    Lottie JSON animations
styles/                    Global SCSS (tokens + resets)
```

---

## 3. Local development

Prerequisites: Node 20+. Plain `npm install` works (the project ships an `.npmrc` configured for pnpm but the lockfile is `package-lock.json`, so npm is the source of truth). The dev server uses Turbopack.

```bash
npm install
npm run dev            # http://localhost:3000
npm run lint
npm run build          # production build (Turbopack)
npm start              # serve the production build
```

`npm run convert:tsx` is a one-shot codemod under `scripts/convert-tsx-to-jsx.mjs` used to migrate components from `.tsx` to a pre-compiled `.jsx` form (see §5).

> **Working in a git worktree?** Turbopack does not allow `node_modules` to be a symlink that points outside the worktree root. Either run `npm install` inside the worktree, or set `turbopack.root` in `next.config.mjs` accordingly. The current config sets `turbopack.root = __dirname`.

---

## 4. The 3D pipeline

This is the most performance-sensitive surface in the app. As of this branch, opening the Full Dentition view costs **~5.3 MB of network** (down from 53 MB), and per-tooth switching is local-cache-only after first load.

### Asset pipeline

* **Source models** live in `public/models/` as binary glTF (`.glb`).
* They are **DRACO-compressed** (geometry quantized to 14-bit position / 10-bit normal / 12-bit texcoord). Anterior/posterior teeth weigh ~70–95 KB each; the two textured molars (`maxillary_first_molar.glb`, `reference_molar.glb`) are larger because most of their bytes are baked-in PNG textures, not mesh.
* The **DRACO decoder** is self-hosted at `public/draco/` — `draco_decoder.wasm` (~190 KB), `draco_wasm_wrapper.js`, `draco_decoder.js`. We do not depend on the gstatic CDN at runtime.
* `next.config.mjs` serves both `/models/*` and `/draco/*` with `Cache-Control: public, max-age=31536000, immutable`. Repeat visits never re-download.

### Recompressing models

If a new uncompressed `.glb` lands in `public/models/`, recompress it with:

```bash
npx --yes @gltf-transform/cli@latest draco \
  public/models/<file>.glb \
  public/models/<file>.glb \
  --quantize-position 14 --quantize-normal 10 \
  --quantize-texcoord 12 --quantize-color 8 --quantize-generic 12
```

Verify output stays binary GLB (not glTF JSON): `file public/models/<file>.glb` should report `glTF binary model, version 2`.

### Loader wiring

* `components/dental/examination/Tooth.jsx` calls `useGLTF.setDecoderPath('/draco/')` once at module load. This is a global setter on drei's `useGLTF`, so `DentitionView` and `MiniToothCanvas` inherit it.
* Every tooth model + the implant is **eagerly preloaded** via `useGLTF.preload()` once the module is imported (Tooth.jsx, bottom of file). At ~80 KB per model post-DRACO, the cost is negligible; the win is instant tooth switching.
* `components/dental/examination/CanvasLoader.jsx` is a sibling of `<Canvas>` inside the `.viewer` container. It tracks drei's `useProgress()` and **only renders if loading drags past 2000 ms**. On fast machines users see nothing; on slow networks they see a single tooth icon with a CSS-mask shimmer over a soft slate veil. Caption: "Loading 3D view…". Pointer events stay disabled so it never blocks the canvas underneath.

### Rendering

Single Canvas per surface: `components/dental/examination/DentalCanvas.jsx` mounts one `<Canvas>` and swaps its scene contents between Full Dentition (`DentitionView`), partial scopes (right/left arch, quadrant), and Single Tooth (`Tooth`) based on `selectionScope`. `OrbitControls` provides camera; `CameraController` and `ZoneCameraRotator` animate framing on view changes.

Mini canvases (`MiniToothCanvas`, 44 × 44 px chips used by Dr. Agent cards and the patient sidebar) reuse the same `<Tooth>` component but skip the loader — too small to be useful at that size.

---

## 5. Code conventions worth knowing

* **Pre-compiled JSX**: most files in `components/dental/`, `components/tp-rxpad/`, and `components/tp-appointment-screen/` are checked in as `.jsx` with the JSX already lowered to `_jsx`/`_jsxs` calls (`import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime"`). New files in those directories should match. The original `.tsx` source is converted by `scripts/convert-tsx-to-jsx.mjs`. When editing, keep the `_jsx` shape — it parses fine and avoids re-running the codemod.
* **`"use client"` everywhere**: the entire app effectively runs client-side. Server components are not in active use.
* **CSS modules** sit next to their component (`Foo.module.scss`) with a short two-letter import alias (`import dc from './DentalCanvas.module.scss'`). Tokens live in `styles/tp-tokens.scss`.
* **Skills under `.claude/skills/`** document re-usable design-system patterns (tp-design-system, dr-agent-design-system, dr-agent-ui-card, clinical-ui-reviewer). Read them before adding new surfaces.

---

## 6. Recent work (this branch)

3D dental examination was loading 53 MB of uncompressed mesh on cold start, with no loading state and no caching. After this branch:

| Metric | Before | After |
|---|---|---|
| Cold network for Full Dentition | ~53 MB | ~5.3 MB |
| Repeat visits | re-download | served from disk cache (immutable) |
| DRACO decoder | not used | self-hosted, 190 KB wasm, cached |
| Loader UI | none (`fallback={null}`) | shimmer overlay after 2 s, never on fast machines |
| Project housekeeping | 25 orphaned assets + dead `lib/export-*` chain | removed |

See `DENTAL_MODULE_DOCUMENTATION.md` §15 for the full clinical/UX context.

---

## 7. What lives where (cheat sheet)

| I want to… | Look at |
|---|---|
| Add a new tooth-level finding type | `components/dental/examination/types.ts` (`TOOTH_DIAGNOSES`, `DIAGNOSES`) |
| Tweak the 3D camera per-FDI | `components/dental/examination/Tooth.jsx` (`FRONT_VIEWS`) |
| Add a Dr. Agent card kind | Skill: `dr-agent-ui-card`. Cards live under `components/tp-rxpad/dr-agent/cards/` |
| Re-theme colors / fonts | `app/globals.css` + `styles/tp-tokens.scss`. Skill: `tp-design-system` |
| Add a confirm modal | `components/tp-ui/tp-confirm-dialog.tsx`. Spec: `TP_CONFIRM_DIALOG.md` |
| Wire a new patient sidebar entry | `components/tp-rxpad/secondary-sidebar/` |
| Change the appointments queue | `app/appointments/` + `components/tp-appointment-screen/` |
