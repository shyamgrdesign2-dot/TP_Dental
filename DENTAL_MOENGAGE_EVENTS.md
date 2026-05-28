# Dental Examination — MoEngage Event Tracking Spec

> Single source of truth for product analytics on the Dental Examination module.
> Owner: Product · Last updated: 2026-05-28 · Status: v1 (Ready for engineering)

---

## 1. Conventions

### 1.1 Naming
- **Pattern:** `Dental_<Object>_<Verb>` (Title_Snake_Case)
  - Object = the noun the user acted on (`Tab`, `Tooth`, `OralExam`, `Preview`, `PrintSettings`…)
  - Verb = past tense action (`Viewed`, `Selected`, `Saved`, `Toggled`, `Printed`, `Discarded`…)
- All events are prefixed with **`Dental_`** so they sit together in MoEngage's Events tree.
- Verbs are standardised to MoEngage's recommended dictionary:
  `Viewed · Clicked · Selected · Hovered · Added · Edited · Deleted · Saved · Discarded · Toggled · Opened · Closed · Started · Completed · Printed · Downloaded · Searched · Filtered · Failed`

### 1.2 Common (super) properties
Sent on **every** event in this spec — set once per session via `MoEngage.helper.setUserAttribute` / `setEventAttribute`.

| Property | Type | Example | Notes |
|---|---|---|---|
| `clinic_id` | string | `clinic_834` | From tenant context |
| `clinician_id` | string | `dr_4192` | Logged-in user |
| `clinician_role` | enum | `dentist` \| `assistant` | RBAC |
| `appointment_id` | string | `apt-6` | From URL |
| `patient_id` | string | `pt_88412` | From appointment |
| `patient_age` | number | 34 | For cohorting |
| `patient_gender` | enum | `M` \| `F` \| `O` | |
| `is_first_time_patient` | boolean | `true` | Drives onboarding card |
| `dentition_mode` | enum | `adult` \| `pediatric` \| `mixed` | Current canvas mode |
| `app_version` | string | `2.14.0` | Release tracking |
| `platform` | enum | `web` \| `ios` \| `android` | |

### 1.3 Property naming
- All property keys are `snake_case`.
- IDs are strings (never numbers — avoids precision loss).
- Enums are lowercase tokens (`upper_arch`, `past`, `finding`, `procedure`).
- Timestamps are ISO 8601 UTC (`2026-05-28T10:14:33Z`).
- Durations are integers in **milliseconds** with `_ms` suffix.

### 1.4 PII rules
- Never send free-text clinical notes (`notes`, `oral_notes`, `surface_note`) as event properties — send only `has_notes: true/false` and `notes_char_count`.
- Patient name is **never** an event property (use `patient_id` only).

---

## 2. Event Catalogue

Total events: **42** across 9 funnels.

### Funnel A — Entry & Navigation

#### A1. `Dental_Tab_Viewed`
Fired when the user lands on the Dental Examination tab inside an appointment.
| Property | Type | Example |
|---|---|---|
| `entry_source` | enum: `direct_url` \| `tab_click` \| `back_nav` | `tab_click` |
| `previous_tab` | string \| null | `clinical` |
| `has_existing_records` | boolean | `true` |
| `tooth_record_count` | number | 3 |
| `oral_entry_count` | number | 4 |
| `time_since_appointment_open_ms` | number | 8420 |

#### A2. `Dental_ExaminationTabToggle_Clicked`
Fired when the user switches between Clinical Examination and Dental Examination.
| Property | Type | Example |
|---|---|---|
| `from_tab` | enum: `clinical` \| `dental` | `clinical` |
| `to_tab` | enum: `clinical` \| `dental` | `dental` |

#### A3. `Dental_DentitionMode_Changed`
Adult / Pediatric / Mixed segmented control.
| Property | Type | Example |
|---|---|---|
| `from_mode` | enum: `adult` \| `pediatric` \| `mixed` | `adult` |
| `to_mode` | enum: `adult` \| `pediatric` \| `mixed` | `pediatric` |
| `had_records_in_from_mode` | boolean | `false` |

---

### Funnel B — Onboarding (first-time users)

#### B1. `Dental_GetStarted_Viewed`
Fired once per appointment when the "Getting Started" card is rendered (i.e. no records yet).
| Property | Type | Example |
|---|---|---|
| `card_variant` | string | `v1_4step` |
| `is_first_time_patient` | boolean | `true` |

#### B2. `Dental_GetStartedVideo_Played`
| Property | Type | Example |
|---|---|---|
| `video_id` | string | `how_dental_works_v1` |
| `video_position_ms` | number | 0 |

#### B3. `Dental_GetStartedStep_Clicked`
Optional — fire if any step row becomes clickable in future.
| Property | Type | Example |
|---|---|---|
| `step_number` | number 1–4 | 2 |
| `step_title` | string | `Record findings` |

---

### Funnel C — 3D Dentition Canvas

#### C1. `Dental_Tooth_Hovered`
Debounced (≥250 ms hover) to avoid floods.
| Property | Type | Example |
|---|---|---|
| `fdi_code` | string | `34` |
| `tooth_label` | string | `Lower Left First Premolar` |
| `has_records` | boolean | `true` |

#### C2. `Dental_Tooth_Selected`
The user taps a tooth on the 3D model — opens the single-tooth view.
| Property | Type | Example |
|---|---|---|
| `fdi_code` | string | `34` |
| `tooth_label` | string | `Lower Left First Premolar` |
| `entry_source` | enum: `canvas_tap` \| `tooth_record_card` \| `scope_chip` | `canvas_tap` |
| `existing_record_count` | number | 0 |
| `is_grouped_member` | boolean | `false` |

#### C3. `Dental_Canvas_Interacted`
Rotated, zoomed, or reset. Throttled to one event per 2 s of activity.
| Property | Type | Example |
|---|---|---|
| `interaction_type` | enum: `rotate` \| `zoom_in` \| `zoom_out` \| `reset` | `zoom_in` |
| `current_zoom_level` | number | 28 |

---

### Funnel D — Single-Tooth Examination

#### D1. `Dental_ToothView_Opened`
Fires alongside `Dental_Tooth_Selected` but represents the *view* lifecycle (paired with D9 close).
| Property | Type | Example |
|---|---|---|
| `fdi_code` | string | `34` |
| `view_mode` | enum: `single` \| `scope` | `single` |
| `scope_group` | enum or null | `lower_arch` |

#### D2. `Dental_ToothSurface_Selected`
A surface (mesial, distal, occlusal, lingual, buccal, whole) is tapped in the surface picker.
| Property | Type | Example |
|---|---|---|
| `fdi_code` | string | `34` |
| `surface` | enum: `mesial` \| `distal` \| `occlusal` \| `lingual` \| `buccal` \| `incisal` \| `whole` | `occlusal` |

#### D3. `Dental_ToothRecord_Added`
A new past procedure / finding / planned procedure is added on a tooth.
| Property | Type | Example |
|---|---|---|
| `fdi_code` | string | `34` |
| `record_kind` | enum: `past` \| `finding` \| `procedure` | `finding` |
| `record_name` | string | `Caries` |
| `surfaces` | array<string> | `["occlusal","distal"]` |
| `has_since` | boolean | `true` |
| `has_notes` | boolean | `false` |
| `is_scope_application` | boolean | `false` |
| `scope_group` | enum or null | `null` |
| `entry_method` | enum: `picker` \| `recent` \| `voice_rx` \| `quick_chip` | `picker` |

#### D4. `Dental_ToothRecord_Edited`
| Property | Type | Example |
|---|---|---|
| `fdi_code` | string | `34` |
| `record_id` | string | `tr_8932` |
| `record_kind` | enum | `finding` |
| `field_changed` | enum: `name` \| `surfaces` \| `since` \| `notes` | `surfaces` |

#### D5. `Dental_ToothRecord_Deleted`
| Property | Type | Example |
|---|---|---|
| `fdi_code` | string | `34` |
| `record_id` | string | `tr_8932` |
| `record_kind` | enum | `finding` |
| `record_age_ms` | number | 18430 |

#### D6. `Dental_ToothNotes_Edited`
Fired on blur / save of the notes field.
| Property | Type | Example |
|---|---|---|
| `fdi_code` | string | `34` |
| `notes_char_count` | number | 84 |
| `had_previous_notes` | boolean | `false` |

#### D7. `Dental_ToothScope_Applied`
Whole arch / quadrant scope application.
| Property | Type | Example |
|---|---|---|
| `scope_group` | enum: `full` \| `upper_arch` \| `lower_arch` \| `right_arch` \| `left_arch` \| `ur` \| `ul` \| `lr` \| `ll` | `upper_arch` |
| `affected_tooth_count` | number | 16 |
| `record_kind` | enum: `past` \| `finding` \| `procedure` | `procedure` |
| `record_name` | string | `Scaling & Polishing` |

#### D8. `Dental_ScopeRecord_Discarded`
User removes a previously applied scope record.
| Property | Type | Example |
|---|---|---|
| `scope_group` | enum | `upper_arch` |
| `record_kind` | enum | `procedure` |

#### D9. `Dental_ToothView_Closed`
| Property | Type | Example |
|---|---|---|
| `fdi_code` | string | `34` |
| `time_spent_ms` | number | 42180 |
| `records_added` | number | 2 |
| `records_edited` | number | 1 |
| `records_deleted` | number | 0 |
| `close_method` | enum: `back_button` \| `outside_click` \| `another_tooth` \| `oral_exam_cta` | `back_button` |

---

### Funnel E — Oral Examination

#### E1. `Dental_OralExam_Opened`
"+ Oral Examination" CTA tapped at the bottom of the canvas.
| Property | Type | Example |
|---|---|---|
| `entry_source` | enum: `cta_button` \| `oral_card_click` \| `onboarding` | `cta_button` |
| `existing_oral_entry_count` | number | 0 |

#### E2. `Dental_OralRegion_Selected`
A region pill is picked from the SITE popover.
| Property | Type | Example |
|---|---|---|
| `region_code` | string | `gingiva` |
| `region_label` | string | `Gingiva` |
| `region_category` | enum: `soft_tissue` \| `tooth_region` \| `distribution` | `soft_tissue` |

#### E3. `Dental_OralRegion_Searched`
User types in the SITE popover search box.
| Property | Type | Example |
|---|---|---|
| `query_length` | number | 4 |
| `results_count` | number | 7 |
| `selected_after_search` | boolean | `true` |

#### E4. `Dental_OralEntry_Added`
| Property | Type | Example |
|---|---|---|
| `entry_kind` | enum: `past` \| `finding` \| `procedure` | `finding` |
| `entry_name` | string | `Mild Gingivitis` |
| `regions` | array<string> | `["gingiva","generalized"]` |
| `region_count` | number | 2 |
| `has_since` | boolean | `false` |
| `has_notes` | boolean | `true` |
| `entry_method` | enum: `picker` \| `recent` \| `voice_rx` | `picker` |

#### E5. `Dental_OralEntry_Edited`
| Property | Type | Example |
|---|---|---|
| `entry_id` | string | `oe_4421` |
| `entry_kind` | enum | `finding` |
| `field_changed` | enum: `name` \| `regions` \| `since` \| `notes` | `notes` |

#### E6. `Dental_OralEntry_Deleted`
| Property | Type | Example |
|---|---|---|
| `entry_id` | string | `oe_4421` |
| `entry_kind` | enum | `finding` |

#### E7. `Dental_OralNotes_Edited`
| Property | Type | Example |
|---|---|---|
| `notes_char_count` | number | 128 |
| `had_previous_notes` | boolean | `true` |

#### E8. `Dental_OralExam_Closed`
| Property | Type | Example |
|---|---|---|
| `time_spent_ms` | number | 38120 |
| `entries_added` | number | 3 |
| `close_method` | enum: `back_button` \| `tooth_tap` \| `tab_switch` | `back_button` |

---

### Funnel F — Records Sidebar (Right Panel)

#### F1. `Dental_RecordCard_Hovered`
Used to attribute "discovery" — proves the tag-highlight broadcast is actually used.
| Property | Type | Example |
|---|---|---|
| `card_type` | enum: `tooth` \| `oral` | `oral` |
| `card_id` | string | `oral_card` |
| `hover_duration_ms` | number | 1240 |

#### F2. `Dental_RecordCard_Clicked`
| Property | Type | Example |
|---|---|---|
| `card_type` | enum: `tooth` \| `oral` | `tooth` |
| `card_id` | string | `tr_8932` |
| `fdi_code` | string \| null | `34` |

#### F3. `Dental_RecordSection_Hovered`
Section (Past / Findings / Procedures) within a card.
| Property | Type | Example |
|---|---|---|
| `card_type` | enum: `tooth` \| `oral` | `oral` |
| `section_kind` | enum: `past` \| `finding` \| `procedure` | `finding` |

#### F4. `Dental_RecordChip_Hovered`
Individual entry chip — used for verifying single-entity highlight broadcast.
| Property | Type | Example |
|---|---|---|
| `card_type` | enum: `tooth` \| `oral` | `oral` |
| `entry_kind` | enum | `finding` |
| `entry_name` | string | `Calculus` |

---

### Funnel G — Voice Rx (Dictation Assist)

#### G1. `Dental_VoiceRx_Opened`
FAB or header button.
| Property | Type | Example |
|---|---|---|
| `entry_source` | enum: `fab` \| `header_button` | `fab` |
| `context` | enum: `dentition` \| `tooth_view` \| `oral_exam` | `tooth_view` |

#### G2. `Dental_VoiceRx_RecordingStarted`
| Property | Type | Example |
|---|---|---|
| `mic_permission` | enum: `granted` \| `denied` \| `prompt` | `granted` |

#### G3. `Dental_VoiceRx_RecordingStopped`
| Property | Type | Example |
|---|---|---|
| `recording_duration_ms` | number | 14200 |
| `transcript_char_count` | number | 312 |
| `stop_reason` | enum: `user` \| `silence_timeout` \| `error` | `user` |

#### G4. `Dental_VoiceRx_SuggestionApplied`
User accepts a parsed finding/procedure from the dictation.
| Property | Type | Example |
|---|---|---|
| `suggestion_kind` | enum: `past` \| `finding` \| `procedure` \| `note` | `finding` |
| `target` | enum: `tooth` \| `oral` | `tooth` |
| `suggestion_confidence` | number 0–1 | 0.86 |

#### G5. `Dental_VoiceRx_Closed`
| Property | Type | Example |
|---|---|---|
| `time_spent_ms` | number | 26100 |
| `suggestions_applied` | number | 2 |
| `suggestions_dismissed` | number | 1 |

---

### Funnel H — Preview Rx

#### H1. `Dental_Preview_Opened`
"Preview" header button.
| Property | Type | Example |
|---|---|---|
| `entry_source` | enum: `header_button` | `header_button` |
| `pages_generated` | number | 3 |
| `dental_chart_included` | boolean | `true` |
| `historical_included` | boolean | `false` |

#### H2. `Dental_PreviewSettings_Opened`
Gear icon in preview drawer header.
*(no extra properties)*

#### H3. `Dental_PreviewSettings_Toggled`
| Property | Type | Example |
|---|---|---|
| `setting_key` | enum: `show_dental_chart` \| `include_historical` | `include_historical` |
| `new_value` | boolean | `true` |
| `pages_after_change` | number | 4 |

#### H4. `Dental_PreviewPage_Navigated`
Pagination footer next/prev.
| Property | Type | Example |
|---|---|---|
| `from_page` | number | 1 |
| `to_page` | number | 2 |
| `nav_method` | enum: `next` \| `prev` \| `jump` | `next` |

#### H5. `Dental_Preview_Closed`
| Property | Type | Example |
|---|---|---|
| `time_spent_ms` | number | 14800 |
| `settings_changed` | boolean | `true` |
| `printed_from_preview` | boolean | `false` |

---

### Funnel I — End Visit & Print

#### I1. `Dental_EndVisit_Opened`
"End Visit" CTA / dropdown.
| Property | Type | Example |
|---|---|---|
| `entry_source` | enum: `header_button` \| `dropdown` | `header_button` |
| `tooth_record_count` | number | 3 |
| `oral_entry_count` | number | 4 |

#### I2. `Dental_PrintSettings_Opened`
Print Settings drawer.
*(no extra properties)*

#### I3. `Dental_PrintSettings_Toggled`
| Property | Type | Example |
|---|---|---|
| `setting_key` | enum: `view` \| `show_dental_chart` \| `include_historical` | `show_dental_chart` |
| `new_value` | string \| boolean | `false` |

#### I4. `Dental_PrintSettings_Applied`
Final state captured the moment the user hits Print.
| Property | Type | Example |
|---|---|---|
| `view` | enum: `list` \| `table` | `list` |
| `show_dental_chart` | boolean | `true` |
| `include_historical` | boolean | `false` |
| `pages_total` | number | 3 |

#### I5. `Dental_Rx_Printed`
| Property | Type | Example |
|---|---|---|
| `print_method` | enum: `browser_print` \| `pdf_download` \| `share_whatsapp` \| `share_email` | `browser_print` |
| `pages_total` | number | 3 |
| `dental_chart_included` | boolean | `true` |
| `historical_included` | boolean | `false` |
| `tooth_record_count` | number | 3 |
| `oral_entry_count` | number | 4 |
| `time_to_print_ms` | number | 96420 |

#### I6. `Dental_Visit_Ended`
| Property | Type | Example |
|---|---|---|
| `total_session_duration_ms` | number | 312000 |
| `tooth_records_final` | number | 3 |
| `oral_entries_final` | number | 4 |
| `voice_rx_used` | boolean | `true` |
| `preview_opened_count` | number | 2 |
| `printed` | boolean | `true` |

#### I7. `Dental_Visit_Discarded`
User exits without printing/saving.
| Property | Type | Example |
|---|---|---|
| `unsaved_record_count` | number | 1 |
| `exit_method` | enum: `back_nav` \| `tab_close` \| `appointment_switch` | `back_nav` |

---

### Funnel J — Errors & Empty States (passive)

#### J1. `Dental_Error_Shown`
| Property | Type | Example |
|---|---|---|
| `error_type` | enum: `chart_load_failed` \| `voice_permission_denied` \| `print_failed` \| `save_failed` | `chart_load_failed` |
| `error_code` | string | `WEBP_DECODE_FAIL` |
| `surface` | enum: `canvas` \| `oral_picker` \| `preview` \| `print` | `preview` |

#### J2. `Dental_EmptyState_Shown`
| Property | Type | Example |
|---|---|---|
| `surface` | enum: `tooth_records` \| `oral_records` \| `preview` | `tooth_records` |
| `is_first_time_patient` | boolean | `true` |

---

## 3. Recommended User Attributes (set/incremented per user)

| Attribute | Type | Update rule |
|---|---|---|
| `dental_total_visits_charted` | number | `+1` on `Dental_Visit_Ended` |
| `dental_total_teeth_charted` | number | `+= tooth_records_final` |
| `dental_total_oral_entries_logged` | number | `+= oral_entries_final` |
| `dental_voice_rx_adoption` | boolean | `true` once `Dental_VoiceRx_SuggestionApplied` fires |
| `dental_historical_print_adoption` | boolean | `true` first time `include_historical=true` is applied |
| `dental_last_visit_at` | datetime | latest `Dental_Visit_Ended` timestamp |
| `dental_preferred_view` | enum | last value of `Dental_PrintSettings_Applied.view` |
| `dental_preferred_mode` | enum | most-used value of `dentition_mode` across last 10 visits |

---

## 4. Funnels & Dashboards (suggested in MoEngage)

### 4.1 Activation funnel — "Dentist completes first charted visit"
1. `Dental_Tab_Viewed`
2. `Dental_Tooth_Selected` **OR** `Dental_OralExam_Opened`
3. `Dental_ToothRecord_Added` **OR** `Dental_OralEntry_Added`
4. `Dental_Preview_Opened` **OR** `Dental_PrintSettings_Opened`
5. `Dental_Rx_Printed`

### 4.2 Drop-off funnel — "Records added but never printed"
- `Dental_ToothRecord_Added` (or oral equivalent) → no `Dental_Rx_Printed` within 30 min → trigger nudge campaign.

### 4.3 Feature-adoption dashboards
- **Voice Rx adoption** — `Dental_VoiceRx_Opened` ÷ `Dental_Tab_Viewed` per clinician per week
- **Historical print adoption** — `Dental_PrintSettings_Toggled where setting_key=include_historical AND new_value=true`
- **Scope (whole-arch) usage** — `Dental_ToothScope_Applied` rate vs per-tooth `Dental_ToothRecord_Added`
- **Onboarding completion** — first-time patients reaching `Dental_Rx_Printed`

### 4.4 UX-quality dashboards
- **Time-on-tooth** — `Dental_ToothView_Closed.time_spent_ms` p50/p90 trends
- **Edits per record** — `Dental_ToothRecord_Edited` ÷ `Dental_ToothRecord_Added`
- **Preview re-opens** — `Dental_Preview_Opened` count per `Dental_Rx_Printed` (>1.5 signals settings friction)
- **Error rate** — `Dental_Error_Shown` per session

---

## 5. Cohorts (for retention & nudges)

| Cohort | Definition |
|---|---|
| **Activated Dentists** | `dental_total_visits_charted ≥ 3` |
| **Voice Rx Power Users** | `Dental_VoiceRx_SuggestionApplied ≥ 5` in last 14 days |
| **Stalled — No Print** | `Dental_ToothRecord_Added` in last 7 days AND no `Dental_Rx_Printed` |
| **Historical Print Curious** | toggled `include_historical=true` but did NOT print |
| **Onboarding Drop-off** | `Dental_GetStarted_Viewed` ≥ 2 times but `Dental_Rx_Printed = 0` |

---

## 6. Campaign hooks (push / in-app)

| Trigger event | Channel | Message intent |
|---|---|---|
| `Dental_GetStarted_Viewed` (2nd time, no records) | In-app tooltip | "Tap any tooth or use + Oral Examination to start" |
| `Dental_VoiceRx_RecordingStopped` (first time) | In-app toast | "Tip: Voice Rx works best with the FDI tooth name spoken first" |
| `Dental_PrintSettings_Toggled` (include_historical=true, first time) | In-app coach mark | "Past visits will be appended to this Rx" |
| `Dental_Visit_Discarded` (unsaved_record_count > 0) | Browser notification | "Your dental records from <patient> weren't saved" |
| `Dental_Error_Shown` (chart_load_failed) | In-app banner + Slack alert to eng | n/a (ops) |

---

## 7. Implementation notes for engineering

### 7.1 Where to instrument
| Surface | File | Hook |
|---|---|---|
| Tab navigation | `app/appointments/[id]/page.tsx` | `useEffect` on tab change |
| Dentition canvas | `components/dental/examination/DentitionView.jsx` | onClick / onPointerOver handlers |
| Single-tooth view | `components/dental/examination/ToothView.jsx` | onAdd / onEdit / onDelete handlers |
| Oral exam | `components/dental/examination/OralExamView.jsx` | same pattern |
| Tooth records sidebar | `components/dental/examination/ExaminationTab.jsx` | existing hover handlers (`onItemEnter`, etc.) |
| Voice Rx | `components/tp-rxpad/dr-agent/*` | recorder lifecycle |
| Preview drawer | `components/tp-rxpad/imports/RxpadHeader.jsx` | settings popover handlers |
| Print settings | `components/tp-rxpad/PrintSettingsDrawer.jsx` | toggle handlers |
| End visit / print | `components/tp-rxpad/EndVisitPage.jsx` | print confirmation |

### 7.2 Helper signature (proposed)
Create one wrapper so PMs can grep events by name:
```ts
// lib/analytics/moengage.ts
export function trackDental(eventName: DentalEventName, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const enriched = { ...getCommonProps(), ...props };
  window.Moengage?.track_event?.(eventName, enriched);
  if (process.env.NODE_ENV === 'development') console.debug('[moe]', eventName, enriched);
}
```

### 7.3 Debounce / throttle rules
- `Dental_Tooth_Hovered` — fire only after **250 ms** sustained hover on the same tooth.
- `Dental_Canvas_Interacted` — throttle to **1 event / 2 s**.
- `Dental_RecordCard_Hovered` — fire on **leave**, with `hover_duration_ms`.

### 7.4 QA checklist
- [ ] Every event verified in MoEngage Debug View (web SDK).
- [ ] No event contains free-text clinical notes (auto-check via regex on `notes`/`oral_notes` keys).
- [ ] Common props present on 100% sample of events.
- [ ] Funnel A1 → I5 completes for the Anjali Patel demo patient with the expected counts.
- [ ] No event fires twice for a single user action (de-dupe instrumentation review).

---

## 8. Versioning

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-05-28 | Initial spec — 42 events across 9 funnels covering tab → preview → end visit. |

> When adding events, bump the minor version and append a row above. Never reuse a deprecated event name.
