# Dr Agent Panel Port — VoiceRx → PM Doctor Portal

**Source repo:** `/Users/kancharlaintel/Documents/work/shyam/VoiceRx` (Next.js 15 + Tailwind 4 + RSC)
**Target repo:** `/Users/kancharlaintel/Documents/dupe-work/Pm-Doctor-Portal` (CRA + React 18 + SCSS Modules + plain CSS)

---

## Goal

Port the Doctor Agent Panel (FAB → side panel → voice consultation flow → result tabs → quick-edit) from VoiceRx into PM Doctor Portal with **pixel-identical** UI. Includes real API transcription + digitization pipeline (not mock).

---

## Routes wired

| Route | File | FAB present |
|-------|------|-------------|
| `/prescription` | `src/pages/Prescription.js` | yes |
| `/prescription-new` | `src/pages/PrescriptionNew.jsx` | yes |

Each page:
- Renders `<DrAgentFab>` when `drAgentOpen=false`
- Renders `<DrAgentPanel>` inside `<RxPadSyncProvider>` when `drAgentOpen=true`
- Both wrapped in `<div className={drAgentStyles.drAgentOverlay} data-dr-agent="true">` — **`data-dr-agent` is the override scope**
- `voiceRxMode` hardcoded `true` (no prop value needed, JSX shorthand)
- `patientId={patient_data?.patient_unique_id}` and `doctorId={profile?.doctor_unique_id}` passed to `<DrAgentPanel>`
- `profile` comes from `useSelector((state) => state.doctors)`

---

## Build & dev rules

```bash
# Local build (skip Sentry sourcemaps step)
SKIP_SENTRY=1 npx react-scripts build

# Serve build
npx serve -s build -l 62148

# Always clear cache after module-resolution-affecting changes
rm -rf node_modules/.cache

# Direct ESLint (bypass CRA webpack plugin quirks)
npx eslint src/components/dr-agent/
```

**Why `SKIP_SENTRY=1`:** npm `build` script chains `sentry:sourcemaps` which needs `SENTRY_AUTH_TOKEN`. Skip locally.

---

## Porting rules applied

| VoiceRx pattern | PM Portal replacement |
|-----------------|------------------------|
| `"use client"` | removed |
| `@/src/components/...` aliases | relative paths |
| Tailwind utilities | CSS Modules + Tailwind-lite shim in `dr-agent-globals.css` |
| `next/image` | `<img>` |
| Lucide icons | shim in `atoms/icons/lucide.jsx` mapping to `iconsax-reactjs` + inline SVG |
| Tailwind 3D classes | inline SCSS `transform-style: preserve-3d`, dynamic `--flip-deg` CSS var |
| `import.meta.env.VITE_*` | `process.env.REACT_APP_*` |
| `globalThis.setTimeout` | `setTimeout` (CRA ESLint doesn't recognize globalThis) |
| Toast errors | `message.error()` from `antd` (not `toast.error`) |

### Path-depth cheat sheet (component root = `src/components/dr-agent/`)

| From | Levels up to component root |
|------|----------------------------|
| `dr-agent/voicerx/X.jsx` | `../` (1) |
| `dr-agent/rxpad/dr-agent/X.jsx` | `../../../` (3) |
| `dr-agent/rxpad/dr-agent/{shell,chat,cards,hooks,engines}/X.jsx` | `../../../../` to root |
| `dr-agent/rxpad/dr-agent/cards/action/X.jsx` | `../../../../` (4) |

---

## Real API pipeline (Session 2)

### Env vars (`.env.dev`)
```
REACT_APP_CLINICAL_API_BASE_URL=https://pm-digitise-transcription-prod.nicerock-72127a04.centralindia.azurecontainerapps.io
REACT_APP_CLINICAL_API_BEARER_TOKEN=zyvl_f2b802ea6afa1588d1bc0bc626a52a4463cb716f6f6d621e25d6f605b512cb38
```

### New files created
| File | Purpose |
|------|---------|
| `voicerx/api/clinical-api.js` | Base URL + bearer token (CRA env vars) |
| `voicerx/api/clinical-processing.js` | `transcribeAudio`, `digitiseClinicalData`, `retryDigitization` + retry/timeout/abort helpers |
| `voicerx/utils/result-formatters.js` | `digitizationToSections`, `digitizationToHtml` |
| `voicerx/api/run-voice-rx-pipeline.js` | `createVoiceRxSessionContext`, `runVoiceRxPipeline` |

### Identity wiring
```js
patient_id: patient_data?.patient_unique_id
doctor_id:  profile?.doctor_unique_id        // profile from useSelector((s) => s.doctors)
session_id: crypto.randomUUID()              // generated per recording in voiceRxSessionRef
```

### Pipeline flow
1. User speaks → MediaRecorder captures audio blob (useBlobRecorder in VoiceRxActiveAgent)
2. Submit → `transcribeAudio({ audioBlob, context, signal })` → POST `/agents/transcribe-audio` (multipart, 10min timeout, 3 retries, 409 fallback to GET `/medical-transcripts`)
3. → `digitiseClinicalData({ context, signal })` → POST `/agents/digitise-data` (30s timeout, 3 retries)
4. Result → `digitizationToSections` + `digitizationToHtml` → rendered in Clinical Notes tab + chat card

### Key decision: live captions vs API transcription
- **Live captions** (in-panel while recording) = Web Speech API (`useLiveTranscript`) — cosmetic only
- **Real transcription** = server-side from audio blob via `/agents/transcribe-audio`
- SOAP and ICD modules deliberately skipped — only digitization

---

## Critical files — full inventory

### Page wiring

- `src/pages/Prescription.js` — imports + state + JSX (FAB + Panel + RxPadSyncProvider) + `data-dr-agent="true"`
- `src/pages/PrescriptionNew.jsx` — same

### Top-level dr-agent

- `dr-agent-globals.css` — global tokens, sheen keyframes, **portal-override layer**, **Tailwind-lite shim**
- `utils.js` — `cn()` + helpers
- `voicerx/utils.js` — voice utils

### Atoms

- `atoms/icons/lucide.jsx` — Lucide → iconsax/SVG shim
- `atoms/MedicalIcon.jsx` — `TPMedicalIcon` placeholder
- `atoms/Tooltip.jsx` + `HoverTooltip` export
- `atoms/Popover.jsx` — `Popover/PopoverTrigger/PopoverContent` (uses `usePosition` hook)

### Molecules

- `molecules/Drawer.jsx` — context-driven `open` gate (fixes session history auto-open bug)
- `molecules/DropdownMenu.jsx`
- `molecules/Tabs.jsx`
- `molecules/ConfirmDialog.jsx` — **scoped `position: absolute`** (covers panel only, not viewport). New layout: title + dark X close, warning in pale-yellow box w/ amber triangle, secondary as red underlined link, primary as violet pill

### Hooks

- `hooks/use-overlay.js` — `useEscape`, `useClickOutside`, `useScrollLock`, `useFocusTrap`, `usePosition`
- `hooks/use-touch-device.js`
- `rxpad/dr-agent/hooks/useDrAgentPanel.js` — main panel state (~1340 lines)

### RxPad / Dr Agent

- `rxpad/dr-agent/RxPadSyncContext.jsx` — full VoiceRx impl (~30 fields)
- `rxpad/dr-agent/DrAgentPanel.jsx` — main panel + 3D flip; accepts `patientId` + `doctorId` props forwarded to `useDrAgentPanel`
- `rxpad/dr-agent/DrAgentPanel.module.scss` — flip styles
- `rxpad/dr-agent/PrescriptionNew.module.scss` — `drAgentOverlay` 400px right drawer
- `rxpad/dr-agent/engines/reply-engine.js` — 2560 lines, verbatim
- `rxpad/dr-agent/engines/voice-rx-patient-mock.js`
- `rxpad/dr-agent/shared/per-patient-rxpad-data.js`
- `rxpad/dr-agent/shared/patientRecommendations.js`
- `rxpad/dr-agent/shell/DrAgentFab.jsx` — **`data-dr-agent="true"` + `vrx-fab-wrapper` class** added so FAB text/sheen overrides apply outside panel
- `rxpad/dr-agent/shell/AgentHeader.jsx`, `FooterBar.jsx`, `SessionHistoryDrawer.jsx`, `VoiceEmptyState.jsx`, `FeedbackBottomSheet.jsx`, `WelcomeScreen.jsx`
- `rxpad/dr-agent/shell/BackFace.jsx` — **wraps `<VoiceRxActiveAgent>` in `VoiceErrorBoundary`** — prevents page lockup if voice canvas throws
- `rxpad/dr-agent/chat/ChatBubble.jsx` (998 lines), `ChatInput.jsx` (with VoiceRx CTA button), `ChatThread.jsx`, `AttachPanel.jsx`, etc.
- `rxpad/dr-agent/cards/CardRenderer.jsx` — **prop signature is `{ output, isStale, onCopy, ... }` matching ChatBubble call** (`output={message.rxOutput}`). Renders `<VoiceStructuredRxCard>` for `voice_structured_rx`.
- `rxpad/dr-agent/cards/action/VoiceStructuredRxCard.jsx`, `FeedbackRow.jsx`, `DataCompletenessDonut.jsx`, `CardShell.jsx`, `CopyIcon.jsx`, `ActionableTooltip.jsx`, `SectionSummaryBar.jsx`

### VoiceRx subdir

- `voicerx/VoiceRxCanvas.jsx` + module.scss — Result tabs view; **`overlayWrap` height: 50%; bottom: 0** so chat content stays visible above with `recorderBgStack` mask fade
- `voicerx/VoiceRxModuleRecorder.jsx` + module.scss — **`div.ctaBtnNormal/Compact/Ultra { width: auto; min-width }`** so segmented mic+chevron container fits both
- `voicerx/VoiceRxBottomSheet.jsx` + module.scss — Consultation mode dialog. **`ctaEnabled/ctaLabel/ctaIcon { color: #fff !important }`**, **`infoTooltip` text white centered**, **`optionLabelSelected { color: var(--tp-blue-600) !important }`**
- `voicerx/VoiceRxResultTabs.jsx` — back chevron 13→20px, strokeWidth 2.2
- `voicerx/VoiceTranscriptCard.jsx`, `VoiceTranscriptProcessingCard.jsx`
- `voicerx/voice-consult-icons.jsx` — **`VoiceRxIcon` = 5-bar equalizer**, `ConversationIcon` = 2 people + waves, `DictationIcon` = bust + sound wave on right
- `voicerx/VoiceRxBrandIcon.jsx` (`VoiceRxWaveGlyph`)
- `voicerx/VoiceRxActiveAgent.jsx` — main recorder; contains `useBlobRecorder` hook + `handleSubmitClick` async handler that captures audio blob before calling `onSubmit`; **Submit button uses `style={{ paddingLeft: 18, paddingRight: 22 }}`** (not Tailwind arbitrary classes)
- `voicerx/VoiceRxSiriWaveform.jsx`, `VoiceRxMiniFab.jsx` — canvas-based bar/wave renderers
- `voicerx/use-net-connection.js`
- `voicerx/use-live-transcript.js` — Web Speech API live captions; **exponential backoff on restarts + MAX_SILENT_RESTARTS=3 cap + `error` state exposed**
- `voicerx/audio.js`
- `voicerx/toast.js` — re-exports from Toaster molecule (use for `toast.warning`; use antd `message.error` for errors)
- `voicerx/ClinicalNotesEditor.jsx` — **real `contentEditable` div** rendering `value ?? html` prop via `useEffect → node.innerHTML`; re-exports `emrSectionsToHtml`
- `voicerx/api/clinical-api.js` — CRA-adapted base URL + bearer token
- `voicerx/api/clinical-processing.js` — transcribeAudio + digitiseClinicalData (SOAP/ICD removed)
- `voicerx/api/run-voice-rx-pipeline.js` — createVoiceRxSessionContext + runVoiceRxPipeline
- `voicerx/utils/result-formatters.js` — digitizationToSections + digitizationToHtml
- `rxpad/form/VoiceRxSectionProcessing.jsx` — **real impl** (spinner + "Updating <section>…" + transcript preview); was `null` stub causing blank panel during 12s regen window

### Shared

- `shared/AiBrandSparkIcon.jsx`
- `assets/chevron-down.json` — Lottie data
- `assets/icons/` — 6 SVG/GIF for SCSS `url()` refs

---

## Asset strategy — public vs src

### `public/new-assets/icons/dr-agent/` (for JSX `<img src="/...">`)
- `agent-bg.svg`, `agent-spark.svg`, `chat-bg.gif`, `empty-docs.svg`, `spark-icon-bg.svg`, `spark-icon.svg`

### `src/components/dr-agent/assets/icons/` (for SCSS `url(...)`)
Same 6 files duplicated.

**Why both:** CRA copies `public/` verbatim (JSX absolute paths work). SCSS goes through `resolve-url-loader` which only resolves relative paths (so SCSS needs assets inside `src/`).

---

## Issues encountered & root-cause fixes

### Phase 1 — Build & runtime correctness (initial port)

#### 1. `setAiFillInProgress is not a function` (runtime)
- **Cause:** `RxPadSyncContext` stub had only `pushToRxPad`, missing 28 other fields
- **Fix:** replaced with full VoiceRx impl

#### 2. `setMicUnavailable is not a function`
- Same as #1

#### 3. Session history drawer auto-opens
- **Cause:** `Drawer` molecule stub returned `<>{children}</>` unconditionally; `DrawerContent` always rendered portal
- **Fix:** `DrawerCtx` React context, `Drawer` provides `{open}`, `DrawerContent` returns `null` if `!open`

#### 4. Confirm dialog CTAs not firing
- **Cause:** stub used `{onConfirm,onCancel,confirmLabel,cancelLabel}`; callers pass `{onPrimary,onSecondary,primaryLabel,secondaryLabel,warning,secondaryTone,onOpenChange}`
- **Fix:** rewrote to support both signatures with fallbacks `onPrimary ?? onConfirm`

#### 5. Persistent ESLint `import/no-unresolved` errors
- **Cause:** CRA's `eslint-webpack-plugin` uses different module resolver than direct `eslint`
- **Fix:** disabled rule in `package.json` `eslintConfig.rules`

#### 6. SCSS `url('/icons/...')` failed
- **Cause:** `resolve-url-loader` treats `/path` as relative
- **Fix:** copied 6 icon assets to `src/components/dr-agent/assets/icons/`, switched SCSS to `../../../assets/icons/...`

#### 7. iconsax-reactjs install
- **Cause:** peer dep conflict with React 18
- **Fix:** `npm install iconsax-reactjs --legacy-peer-deps`

#### 8. ESLint cache stale
- `rm -rf node_modules/.cache` before rebuild

---

### Phase 2 — Visual fidelity (portal global CSS bleed)

**Root cause across many issues:** `src/styles/common.scss` has aggressive `!important` rules:

```scss
body {
  ...
  table, p, div, span, tr, th, td {
    font-family: 'Poppins' !important;
    color: $maincolor !important;  // #171725
  }
  .ff-poppins, .ff-poppins * { font-family: 'Poppins' !important; color: $maincolor !important; }
}
```

These bleed into the dr-agent panel forcing wrong fonts and dark colors on every white-text button.

#### 9. White text buttons render dark ("Start with Voice", "Start conversation", FAB "VoiceRx", Submit)
- **Cause:** `body span { color: $maincolor !important }` overrides our class colors
- **Fix:** added `[data-dr-agent="true"]` scope + `!important` overrides in `dr-agent-globals.css`:
  ```css
  html [data-dr-agent="true"] .vrx-ai-cta * { color: #ffffff !important; }
  html [data-dr-agent="true"] [class*="ctaLabel"] { color: #fff !important; }
  ```
  Plus per-module `!important` on `ctaEnabled`/`ctaLabel`/`ctaIcon` in `VoiceRxBottomSheet.module.scss`.

#### 10. FAB outside `data-dr-agent` scope
- **Cause:** FAB rendered when panel closed, sibling to overlay div
- **Fix:** added `data-dr-agent="true"` + `vrx-fab-wrapper` class to FAB root div + global `.vrx-fab-wrapper * { color: #fff !important }`

#### 11. Tailwind classes not loading (`text-white`, `flex`, `absolute`, `inset-0`, `w-[40%]`, etc.)
- **Cause:** No Tailwind in CRA build
- **Fix:** **Tailwind-lite shim** in `dr-agent-globals.css` — ~80 utility classes scoped to `[data-dr-agent="true"]` covering position/flex/spacing/color/visibility/arbitrary values used in dr-agent JSX

#### 12. Black borders on Close X / Submit / Source / Mic buttons
- **Cause:** browser default `<button>` border + portal CSS rules
- **Fix:** scoped reset `[data-dr-agent="true"] button { border: none; outline: none; box-shadow: none }`. **Important:** does NOT reset `background: transparent` (would kill gradient buttons). Specific classes (`.vrx-cn-secondary-blue`, `.vrx-rt-voice-cta-outline`, `.vrx-mic-chip`) re-apply their own borders.

#### 13. Source chip border
- `[data-dr-agent="true"] [class*="sourceBtn"] { border: none !important; background: transparent !important }`

#### 14. Voice CTA outline gradient border lost
- **Cause:** initially had `[data-dr-agent="true"] button { background: transparent }` killing `.vrx-rt-voice-cta-outline` gradient
- **Fix:** removed `background: transparent` from generic reset. Class uses `padding-box, border-box` gradient with `!important`.

#### 15. Wrong VoiceRx mic icon (plain mic instead of equalizer)
- **Cause:** stub `VoiceRxIcon` was a mic shape
- **Fix:** replaced with 5-bar equalizer SVG (matches VoiceRx source pixel-for-pixel)
- Affects: "Start with Voice", "Start conversation", footer voice CTA, FAB shimmer

#### 16. ConsultationMode `DictationIcon` mismatch
- **Fix:** rewrote — single bust (head + shoulders) + sound wave arcs on right

#### 17. Back/minimize chevrons too small
- VoiceRxCanvas: 16→20px, strokeWidth 2→2.2, container 20→28px
- VoiceRxResultTabs: 13→20px

#### 18. Modepill back button missing background
- **Fix:** `.modePill` got `background: rgba(255,255,255,0.55) + border + light shadow`

#### 19. Sheen invisible on buttons
- **Cause:** `.vrx-ai-cta-sheen` etc. relied on Tailwind `absolute inset-y-0 left-0 w-[40%]`
- **Fix:** baked positioning directly into `.vrx-ai-cta-sheen` / `.vrx-submit-sheen` classes. Bumped peak opacity 0.55→0.7

#### 20. FAB sheen not animating top→bottom
- **Cause:** original gated by `hasNudge` (never true). Original CSS keyframes `vrxFabSheen` used `translateX` — doesn't animate SVG paths reliably without `transform-box`
- **Fix:** removed `hasNudge` gate (`showShimmer = !isPanelOpen && !isModuleRecording`). Used `transform-box: view-box` + `transform-origin: 0 0` + CSS keyframes `translateX(-120% → 320%)` with opacity 0→0.85→0. FAB rotated 90deg → x-sweep becomes vertical visually. Added `mix-blend-mode: screen`.

#### 21. Submit button bloated padding + light color
- VoiceRx-portal mismatch — `submitBtnNormal/Compact/Ultra` heights 42/38/34→38/36/32, padding tightened, `submitEnabled` solid violet→indigo gradient with `!important`

#### 22. Conversation Mode label color (selected)
- `.optionLabelSelected { color: var(--tp-blue-600) !important; font-weight: 600 !important }`

#### 23. Tooltip text dark grey
- **Cause:** `body div { color: $maincolor !important }`
- **Fix:** `.infoTooltip / .tooltipTitle / .tooltipBody` — `color: #fff !important` on all descendants, `text-align: center`, slate-800 background, padding 14/18, radius 14, 13px font

#### 24. `Structured Clinical Notes` card not rendering (Phase 1 stub)
- **Cause (Phase 1):** `CardRenderer` was stub returning `<div data-card-kind/>` for ALL kinds
- **Fix:** rewrote with `switch(kind)` — `case "voice_structured_rx"` renders real `<VoiceStructuredRxCard>`. Other kinds still fall through.
- **Cause (Session 2):** `CardRenderer` prop signature was `{ message }` but `ChatBubble` calls it with `output={message.rxOutput}` — `message` always undefined → always returned `null`
- **Fix:** changed `CardRenderer` signature to `{ output, isStale, onCopy, ... }` matching what `ChatBubble` passes

#### 25. ConfirmDialog covers entire viewport (not panel)
- **Cause:** `position: fixed; inset: 0`
- **Fix:** changed to `position: absolute` — fills nearest positioned ancestor (drAgentOverlay panel). New layout matches design: title + dark-pill X close, amber-warning box, secondary as underlined link, primary as violet pill

#### 26. Blank panel after Submit (12s processing window)
- **Cause:** `VoiceRxSectionProcessing` was `null` stub. `recorderBgStack` overlay covered entire canvas.
- **Fix A:** real impl with spinner + "Updating Clinical Notes…" + transcript preview
- **Fix B:** reverted `overlayWrap` to `bottom: 0; height: 50%` (was full takeover) so chat content visible above with masked fade

#### 27. Mic dropdown chevron clipped/missing
- **Cause:** `.ctaBtnNormal { width: 42px }` applied to BOTH the close button AND the segmented mic+chevron container (a `<div>`). Container clamped to 42px clipping chevron
- **Fix:** `div.ctaBtnNormal/Compact/Ultra { width: auto; min-width: 76/66/58px }` — element-specific selector boosts width when applied to div

#### 28. Page stuck after "Start conversation" click
- **Cause:** suspected `VoiceRxActiveAgent` runtime crash (heavy mock data, getUserMedia, AudioContext) breaking React tree — no console feedback to user
- **Fix:** added `VoiceErrorBoundary` (`React.Component` with `getDerivedStateFromError` + `componentDidCatch`) wrapping `<VoiceRxActiveAgent>` in `BackFace.jsx`. Logs to console, shows fallback "Voice consultation could not start" + Close button instead of locking page.

#### 29. FeedbackRow thumbs (👍👎) rendering everywhere
- **Fix:** CSS `display: none` on `[class*="feedbackRow" i]` + `[aria-label*="thumb" i]` etc. — hides without JSX surgery

---

### Phase 3 — Real API pipeline (Session 2)

#### 30. `globalThis is not defined` ESLint error in clinical-processing.js
- **Cause:** pm-voice-rx uses `globalThis.setTimeout` (valid in browser/Node ESM); CRA ESLint config doesn't recognize `globalThis`
- **Fix:** `replace_all` → `setTimeout` / `clearTimeout` directly

#### 31. `toast.error` doesn't exist in voicerx/toast.js
- **Cause:** `voicerx/toast.js` only wraps warning/success; `error` not exported
- **Fix:** import `{ message }` from `antd` in `useDrAgentPanel.js`; call `message.error(...)` in the catch block

#### 32. Submit never enables — live captions not working in Chrome
- **Cause 1:** Chrome Web Speech API can encounter `"network"` error (can't reach Google servers) → `onerror` fires → `onend` fires immediately → restarts immediately → infinite tight error loop, never produces results
- **Cause 2:** `canSubmit` gated on `transcript.trim().length > 0` — if SpeechRecognition fails, transcript stays empty forever
- **Fix 1:** Added **exponential backoff** to `onend` restart in `useLiveTranscript`: delay = `0, 500, 1000, 2000, 4000, max 8000ms` per attempt. `restartAttemptsRef` resets to 0 on successful `onresult`.
- **Fix 2:** Added `error` state to `useLiveTranscript`; set on `onerror` (except `"aborted"`/`"no-speech"`), cleared on successful result.
- **Fix 3:** Changed `canSubmit` in `VoiceRxActiveAgent`: `transcript.trim().length > 0 || elapsedMs >= 2000`. Real transcription is server-side from audio blob — live captions are cosmetic.
- **Fix 4:** In `useDrAgentPanel`, when `liveError` is set, fall back to scripted transcript so captions still animate.

#### 33. Submit never enables — live captions not working in Opera
- **Cause:** Opera (Chromium-based) has `webkitSpeechRecognition` in DOM but Google speech service not wired → `rec.start()` succeeds but immediately triggers `onend` without `onerror` → `liveError` never set → scripted fallback never kicks in → empty transcript → `elapsedMs >= 2000` still enables submit but captions blank
- **Fix:** Added `MAX_SILENT_RESTARTS = 3` cap in `scheduleRestart`. After 3 silent restarts with no results, explicitly `setError("service-not-available")` → `liveError` set → scripted fallback activates → captions animate

#### 34. Submit button horizontal padding missing
- **Cause:** Button className used `pl-[18px] pr-[22px]` (Tailwind arbitrary-value classes) not in Tailwind-lite shim
- **Fix:** Removed from className, added `style={{ paddingLeft: 18, paddingRight: 22 }}` inline

---

## Architecture points

### `data-dr-agent="true"` scope
Marker attribute on every panel + FAB root. All Tailwind shim, color overrides, and `!important` rules use `[data-dr-agent="true"]` selector ancestor. Beats portal `body x !important` rules via specificity (`[attr] .class` = 0,2,1 > `body span` = 0,0,2 with !important comparison going to specificity).

### 3D card flip
- Static SCSS: `transform-style: preserve-3d; perspective: 1200px; transition: transform 800ms cubic-bezier(0.4,0,0.2,1)`
- Dynamic: JSX passes `style={{"--flip-deg": flipDeg + "deg"}}` → SCSS `transform: rotateY(var(--flip-deg, 0deg))`

### Tailwind-lite shim
~80 utility classes appended to `dr-agent-globals.css`, all scoped to `[data-dr-agent="true"]`. Covers position/flex/spacing/text-color/bg/opacity/visibility/arbitrary values (`w-[40%]`, `gap-[8px]`, `rounded-[12px]`, `text-[#DC2626]`). **Arbitrary-value classes with pixel values (e.g. `pl-[18px]`) still need inline `style={}`** — the shim only covers the common set.

### Sheen animations
- `vrx-ai-cta-sheen` / `vrx-submit-sheen` — CSS classes with embedded `position: absolute; inset; width; pointer-events: none` so they don't depend on Tailwind utils
- `vrx-fab-sheen` — applied to SVG `<path>`. CSS keyframes `translateX -120% → 320%` with `transform-box: view-box; transform-origin: 0 0`. Path translates across SVG viewBox; gradient stays anchored (`gradientUnits="userSpaceOnUse"`); bright stripe sweeps the visible path.
- FAB rotated 90deg via parent transform → x-sweep becomes vertical visually = top→bottom.

### voiceRxMode prop
Pass `voiceRxMode={true}` to `<DrAgentPanel>` to open directly into voice flow (skip welcome screen). In prescription pages this is a JSX boolean shorthand (`voiceRxMode` with no value).

### RxPadSyncProvider scope
Wraps panel mount per-page. Could hoist to App-level if panel needs to coexist with RxPad form integration.

### Live transcript vs API transcript
- `useLiveTranscript` (Web Speech API) = live captions during recording, cosmetic only
- If SpeechRecognition errors or browser doesn't support, falls back to scripted mock transcript
- Actual transcription = POST `/agents/transcribe-audio` from MediaRecorder blob after submit
- `liveText` captured at submit time is shown in the echo bubble but real API transcript replaces it

### useLiveTranscript resilience (updated)
```js
// Restart with exponential backoff to avoid hammering on error
// After MAX_SILENT_RESTARTS=3 silent failures, sets error → scripted fallback kicks in
// Clears error on first successful onresult
// reset() clears error + restartAttemptsRef + timer
```

### CardRenderer prop contract
`ChatBubble` calls `<CardRenderer output={message.rxOutput} isStale={isStale} onCopy={onCopy} .../>`.
`CardRenderer` signature MUST be `{ output, isStale, ... }` — NOT `{ message }`.

---

## Testing checklist

- [ ] `SKIP_SENTRY=1 npx react-scripts build` → "Compiled with warnings" only
- [ ] `npx serve -s build -l 62148` → load
- [ ] `/prescription` → FAB bottom-right, sheen sweep top→bottom
- [ ] Click FAB → panel slides in 400px from right
- [ ] Click "Start with Voice" → consultation mode dialog opens
  - [ ] Conversation Mode icon = 2 people + waves; Dictation Mode icon = bust + waves
  - [ ] Selected option label = blue, deselected = slate
  - [ ] Info icon (16px) → tooltip text white centered on slate-800 bg
  - [ ] "Start conversation" button = violet→indigo gradient, white icon + label, sheen sweep
- [ ] Click Start conversation → flips to recorder canvas (NOT stuck — if crashes, ErrorBoundary shows fallback)
- [ ] Recorder controls: red close X (no border), white mic + chevron-down (segmented, both visible), violet Submit
- [ ] Submit button has correct horizontal padding (not too tight/wide)
- [ ] Submit enables after 2 seconds of recording even without live captions
- [ ] Live captions appear (either real SpeechRecognition or scripted fallback)
- [ ] Click close → confirm dialog covers panel only (not full viewport), title + dark X close, amber warning box, "Close and discard" red link, "Keep recording" violet pill
- [ ] Click Submit → API called (transcribe → digitize) → result appears
- [ ] `Structured Clinical Notes` card renders in chat with "View clinical notes >" button
- [ ] "View clinical notes" opens result canvas with Transcript / Clinical Notes tabs
- [ ] No FeedbackRow thumbs anywhere
- [ ] Footer chat input shows VoiceRx purple gradient button on right
- [ ] No black borders on any button
- [ ] Works in Chrome (real SpeechRecognition)
- [ ] Works in Opera (scripted fallback after 3 silent restarts)

---

## Known limitations

- Cards (CardRenderer) — only `voice_structured_rx` real; other kinds still stubbed `<div data-card-kind/>`
- "Copy to RxPad" — mock, no real bridge
- `VoiceRxActiveAgent` may throw on first run (mic permission / AudioContext) — ErrorBoundary catches; check DevTools console for root cause
- `DictationIcon`/`ConversationIcon` — hand-rolled approximations; pixel-exact requires copying full SVG markup from VoiceRx source
- Gemini Live (`gemini-live.js`) in pm-voice-rx is dead code — NOT ported, not needed

---

## Quick recovery commands

```bash
# Full clean build
rm -rf node_modules/.cache build
SKIP_SENTRY=1 npx react-scripts build

# Direct ESLint (bypasses CRA webpack plugin quirks)
npx eslint src/components/dr-agent/

# Find orphan absolute icon paths
grep -rn "/icons/dr-agent" src/components/dr-agent/

# Find SCSS url() issues
grep -rn "url(" src/components/dr-agent/**/*.module.scss

# Check data-dr-agent presence on every panel mount
grep -rn 'data-dr-agent="true"' src/

# Find Tailwind arbitrary classes that need inline style instead
grep -rn 'pl-\[\|pr-\[\|pt-\[\|pb-\[' src/components/dr-agent/

# Serve build
npx serve -s build -l 62148
```

---

## File counts

- ~100 files written under `src/components/dr-agent/`
- 6 icon assets in `public/new-assets/icons/dr-agent/`
- 6 icon assets in `src/components/dr-agent/assets/icons/`
- 2 page files modified (`Prescription.js`, `PrescriptionNew.jsx`)
- 1 config file modified (`package.json` — eslint rule disabled)
- 1 env file modified (`.env.dev` — clinical API vars)

---

## Key learnings

1. **Portal `!important` color/font bleed is the dominant fight.** `data-dr-agent="true"` scope + Tailwind-lite shim + per-module `!important` color overrides are the durable answer. One-off fixes get re-overridden.

2. **CRA + Tailwind absence requires shim.** ~80 utility classes scoped under `[data-dr-agent="true"]` cover all dr-agent JSX without polluting rest of app. **Exception:** Tailwind arbitrary-value pixel classes (`pl-[18px]`) are too specific to shim — use inline `style={}` for those.

3. **CSS Module class with `!important` beats portal `body span !important`.** Specificity wins.

4. **Don't blanket-reset `background: transparent` on `[data-dr-agent="true"] button`.** Kills gradient/colored buttons. Just reset border/outline/box-shadow.

5. **Element-specific selectors fix shared-class collisions.** `div.ctaBtnNormal { width: auto }` distinguishes segmented container (`<div>`) from close button (`<button>`).

6. **Stub components break runtime silently.** Replace `null` returns with real impls (`VoiceRxSectionProcessing`, `CardRenderer.voice_structured_rx`, `ClinicalNotesEditor`).

7. **ErrorBoundary around heavy voice canvas.** Surfaces runtime crashes (mic permission, AudioContext) instead of locking the page.

8. **SVG sheen animation pitfalls.** `transform-box: view-box` + `transform-origin: 0 0` + `gradientUnits="userSpaceOnUse"` is the working combo. CSS background on SVG `<path>` doesn't render.

9. **Tooltip text inversion.** Dark-bg tooltip with `body div { color !important }` portal rule needs `color: #fff !important` cascaded to all descendants including `<strong>`/`<b>`.

10. **Overlay positioning vs takeover.** Quick-edit recorder = bottom 50% with mask fade. Full takeover (top:0; bottom:0) → blank looking results when content stub returns null.

11. **`import.meta.env.VITE_*` → `process.env.REACT_APP_*`.** Always check env var prefixes when porting from Vite to CRA. Also `globalThis.setTimeout` → `setTimeout` for CRA ESLint.

12. **`toast.error` pattern.** `voicerx/toast.js` only wraps warning/success. For error notifications in PM Portal, import `{ message } from "antd"` and call `message.error(...)`.

13. **SpeechRecognition resilience across browsers:**
    - Chrome: may hit `"network"` error → infinite restart loop → add exponential backoff
    - Opera: `webkitSpeechRecognition` exists but `onend` fires silently with no results → cap at `MAX_SILENT_RESTARTS=3` then set error → scripted fallback
    - Always: `canSubmit` should NOT gate on transcript text alone — use `elapsedMs >= 2000` fallback since real transcription is server-side from audio blob

14. **CardRenderer prop contract is caller-defined.** The component receives what `ChatBubble` passes (`output`, `isStale`), not what internal logic might suggest (`message`). When a card never renders, check prop name mismatch first.

15. **`ClinicalNotesEditor` was a `return null` stub.** Real impl needs `useRef` + `useEffect` setting `node.innerHTML = content`. Accepts both `value` and `html` prop names since different callers use different names.
