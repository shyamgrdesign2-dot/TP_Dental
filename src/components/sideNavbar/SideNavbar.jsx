import React, { useCallback, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  ArrowDown2,
  ArrowSquareDown,
  ArrowSquareUp,
  Calendar2,
  Copy,
  DocumentText,
  Eye,
  Note1,
  Ruler,
  SidebarLeft,
} from "iconsax-reactjs";
import { VoiceRxIcon } from "../dr-agent/voicerx/voice-consult-icons";
import { digitiseClinicalData, transcribeAudio } from "../dr-agent/voicerx/api/clinical-processing";
import { useEdgeSwipeNavigation } from "./useEdgeSwipeNavigation";
import { SIDE_NAVBAR_DIGITIZATION_RESPONSE_CONTRACT } from "./mock/sideNavbarDigitizationContract";
import {
  getMockPatientHistory,
  GIVEN_VACCINES,
  GROWTH_ENTRIES,
  GROWTH_PATIENT_INFO,
  GYNEC_SECTIONS,
  historySections,
  LAB_RESULT_ENTRIES,
  MEDICAL_RECORDS,
  OBSTETRIC_SECTIONS,
  OPHTHAL_ENTRIES,
  pastVisits,
  PENDING_VACCINES,
  PRIVATE_NOTES,
  vitalsByDate,
} from "./mock/sideNavbarMockData";
import "./sideNavbar.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Legend, Filler);

const NAV_ITEMS = [
  { id: "pastVisits", label: "Past Visits", icon: { kind: "iconsax", Icon: Note1 } },
  { id: "vitals", label: "Vitals", icon: { kind: "medical", name: "heart-rate" } },
  { id: "history", label: "History", icon: { kind: "medical", name: "clipboard-activity" } },
  { id: "labResults", label: "Lab Results", icon: { kind: "medical", name: "lab" } },
  { id: "medicalRecords", label: "Records", icon: { kind: "medical", name: "health-file-03" } },
  { id: "gynec", label: "Gynec", icon: { kind: "medical", name: "gynec" } },
  { id: "obstetric", label: "Obstetric", icon: { kind: "medical", name: "obstetric" } },
  { id: "vaccine", label: "Vaccine", icon: { kind: "medical", name: "injection" } },
  { id: "growth", label: "Growth", icon: { kind: "iconsax", Icon: Ruler } },
  { id: "optal", label: "Ophthal", icon: { kind: "iconsax", Icon: Eye } },
  { id: "personalNotes", label: "Private Notes", icon: { kind: "iconsax", Icon: DocumentText } },
];

const NAV_SEQUENCE = NAV_ITEMS.map((item) => item.id);

const SECTION_TITLES = {
  pastVisits: "Past Visit",
  vitals: "Vitals",
  history: "Medical History",
  labResults: "Lab Results",
  medicalRecords: "Medical Records",
  gynec: "Gynec History",
  obstetric: "Obstetric History",
  vaccine: "Vaccination History",
  growth: "Growth",
  optal: "Ophthal History",
  personalNotes: "Private Notes",
};

const VITAL_DISPLAY_FIELDS = [
  { key: "temperature", label: "Temperature", unit: "Frh" },
  { key: "pulse", label: "Pulse", unit: "/min" },
  { key: "respiratoryRate", label: "Resp. Rate", unit: "/min" },
  { key: "systolic", label: "Systolic", unit: "mmhg" },
  { key: "diastolic", label: "Diastolic", unit: "mmhg" },
  { key: "spo2", label: "SpO2", unit: "%" },
  { key: "randomBloodSugar", label: "RBS", unit: "mg/dL" },
  { key: "height", label: "Height", unit: "cms" },
  { key: "weight", label: "Weight", unit: "kgs" },
  { key: "bmi", label: "BMI", unit: "kg/m2" },
  { key: "bmr", label: "BMR", unit: "kcals" },
  { key: "bsa", label: "BSA", unit: "m2" },
  { key: "fib4", label: "FIB-4", unit: "" },
];

const HISTORY_DISPLAY_GROUPS = [
  { id: "medical", title: "Medical Conditions", type: "Medical condition" },
  { id: "allergies", title: "Allergies", type: "Allergies" },
  { id: "family", title: "Family History", type: "Family History" },
  { id: "surgical", title: "Surgeries", type: "Surgical History" },
  { id: "lifestyle", title: "Lifestyle", type: "Lifestyle" },
  { id: "additional", title: "Additional Notes", type: "Additional Notes" },
];

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function hasValue(value) {
  if (value === undefined || value === null) return false;
  const text = String(value).trim();
  return Boolean(text) && text !== "0";
}

function valueText(values) {
  return values.filter(hasValue).map((value) => String(value).trim()).join(", ");
}

function firstObject(...values) {
  return values.find(isObject) || {};
}

function extractClinicalPayload(response) {
  const raw = response?.data?.documents?.[0]?.data ??
    response?.data?.document?.data ??
    response?.data ??
    response;

  const candidates = [
    raw?.clinicalData,
    raw?.digitization?.editedData,
    raw?.digitization?.refinedData,
    raw?.digitization,
    raw?.digitizeData,
    raw?.digitize,
    raw?.editedData,
    raw?.refinedData,
    raw?.payload,
    raw?.prescription,
    raw,
  ];

  const candidate = candidates.find(isObject) || {};
  const numericKeys = Object.keys(candidate).filter((key) => /^\d+$/.test(key));
  if (numericKeys.length && isObject(candidate[numericKeys[0]])) return candidate[numericKeys[0]];
  return candidate;
}

function buildDigitalRx(payload) {
  const p = firstObject(payload?.payload, payload);
  const hasContent = toArray(p.symptoms).length ||
    toArray(p.examinations).length ||
    toArray(p.diagnosis).length ||
    toArray(p.medications).length ||
    toArray(p.advice).length ||
    toArray(p.labInvestigation).length ||
    hasValue(p.followUp);

  if (!hasContent) return null;

  return {
    symptoms: toArray(p.symptoms).map((item) => ({
      label: item?.name || item?.label || String(item || ""),
      detail: valueText([item?.duration, item?.severity, item?.notes, item?.detail]),
      fresh: true,
    })),
    examinations: toArray(p.examinations).map((item) => ({
      label: item?.name || item?.label || String(item || ""),
      detail: valueText([item?.notes, item?.detail]),
      fresh: true,
    })),
    diagnoses: toArray(p.diagnosis || p.diagnoses).map((item) => ({
      label: item?.name || item?.label || String(item || ""),
      detail: valueText([item?.since, item?.status, item?.notes, item?.detail]),
      fresh: true,
    })),
    medications: toArray(p.medications).map((item) => ({
      label: item?.name || item?.label || String(item || ""),
      detail: valueText([item?.dosage, item?.frequency, item?.schedule, item?.duration, item?.notes, item?.quantity, item?.detail]),
      fresh: true,
    })),
    advice: toArray(p.advice).map((item) => (typeof item === "string" ? item : item?.notes || item?.name || item?.label || "")).filter(Boolean).join(" "),
    labInvestigations: toArray(p.labInvestigation || p.labInvestigations).map((item) => (typeof item === "string" ? item : item?.name || item?.label)).filter(Boolean),
    followUp: hasValue(p.followUp) ? `After ${p.followUp}` : "",
    additionalNotes: toArray(p.others).map((item) => (typeof item === "string" ? item : item?.notes || item?.label || "")).filter(Boolean).join(" "),
  };
}

function buildVitalsRows(payload) {
  const vitals = firstObject(payload?.vitalsAndBodyComposition, payload);
  return VITAL_DISPLAY_FIELDS.flatMap((field) => {
    const value = vitals[field.key];
    return hasValue(value) ? [{ label: field.label, unit: field.unit, value: String(value), fresh: true }] : [];
  });
}

function buildLabRows(payload) {
  const labs = toArray(payload?.labResults || payload?.labs || payload);
  return labs.flatMap((item) => {
    const label = item?.testname || item?.testName || item?.name || item?.label;
    const value = item?.value || item?.result;
    if (!hasValue(label) || !hasValue(value)) return [];
    return [{
      label,
      unit: item?.unit ? `(${item.unit})` : item?.units ? `(${item.units})` : "",
      value: String(value),
      abnormal: Boolean(item?.abnormal),
      direction: item?.direction,
      fresh: true,
    }];
  });
}

function historyDetail(entry) {
  if (entry.type === "Family History") return valueText([entry.relation, entry.notes]) || undefined;
  const showsStatus = entry.type === "Medical condition" || entry.type === "Allergies" || entry.type === "Lifestyle";
  const status = showsStatus && entry.enable === "N" ? "Negated" : showsStatus && entry.enable === "Y" ? "Active" : "";
  return valueText([entry.duration, status, entry.notes]) || undefined;
}

function buildHistoryGroups(payload) {
  const items = toArray(payload?.medicalHistory || payload?.history || payload);
  return HISTORY_DISPLAY_GROUPS.map((group) => ({
    id: group.id,
    title: group.title,
    fresh: true,
    items: items
      .filter((entry) => entry?.type === group.type)
      .map((entry) => ({ name: entry.name, detail: historyDetail(entry), fresh: true })),
  }));
}

function lineFromParts(parts) {
  return parts.filter(hasValue).join(" | ");
}

function buildGynecCards(payload) {
  const g = firstObject(payload?.gyneacHistory, payload?.gynecHistory, payload);
  const cards = [
    { id: "lmp", title: "LMP", lines: hasValue(g.lastMenstrualPeriod) ? [`LMP: ${g.lastMenstrualPeriod}`] : [] },
    { id: "menarche", title: "Menarche", lines: hasValue(g.ageAtMenarche) ? [`Age at: ${g.ageAtMenarche} years`] : [] },
    { id: "cycle", title: "Cycle", lines: [lineFromParts([g.cycle && `Type: ${g.cycle}`, valueText([g.intervalNotes, g.intervalCycle]) && `Interval: ${valueText([g.intervalNotes, g.intervalCycle])}`])].filter(Boolean) },
    { id: "flow", title: "Flow", lines: [lineFromParts([g.flow && `Volume: ${g.flow}`, g.durationOfMenstrualFlow && `Duration: ${g.durationOfMenstrualFlow} days`, g.clotsDuringFlow && `Clots: ${g.clotsDuringFlow}`, g.numberOfPadsPerDay && `Pads/day: ${g.numberOfPadsPerDay}`])].filter(Boolean) },
    { id: "pain", title: "Pain", lines: [lineFromParts([g.pain && `Severity: ${g.pain}`, g.occurrenceOfPain && `Occurrence: ${g.occurrenceOfPain}`, g.painNotes])].filter(Boolean) },
    { id: "notes", title: "Notes", lines: toArray(g.notes).filter(hasValue) },
  ];
  return cards.filter((card) => card.lines.length).map((card) => ({ ...card, fresh: true }));
}

function buildObstetricCards(payload) {
  const o = firstObject(payload?.obstetricHistory, payload);
  const examLines = toArray(o.antenatalExamination).map((entry) => lineFromParts([
    entry?.date,
    entry?.pallor && `Pallor: ${entry.pallor}`,
    entry?.oedema && `Oedema: ${entry.oedema}`,
    entry?.bmi && `BMI: ${entry.bmi} Kg/m2`,
    entry?.bp && `BP: ${entry.bp} mmHg`,
    entry?.fhr && `FHR: ${entry.fhr} bpm`,
  ])).filter(Boolean);
  const ancLines = toArray(o.ancHistory).map((entry) => lineFromParts([
    entry?.name,
    entry?.weekRange && `Week Range: ${entry.weekRange}`,
    entry?.dueDate && `Due Date: ${entry.dueDate}`,
    entry?.status && `Status: ${entry.status}`,
  ])).filter(Boolean);
  const immunisationLines = toArray(o.immunisationHistory).map((entry) => lineFromParts([
    entry?.name,
    entry?.status && `Status: ${entry.status}`,
    entry?.givenDate && `Given Date: ${entry.givenDate}`,
  ])).filter(Boolean);

  const cards = [
    {
      id: "patientInfo",
      title: "Patient Info",
      lines: [
        lineFromParts([o.lastMenstrualPeriod && `LMP: ${o.lastMenstrualPeriod}`, o.expectedDateOfDelivery && `EDD: ${o.expectedDateOfDelivery}`, o.calculatedExpectedDateOfDelivery && `C.E.D.D: ${o.calculatedExpectedDateOfDelivery}`]),
        lineFromParts([o.gestationWeeks && `Gestation: ${o.gestationWeeks} Weeks ${o.gestationDays || 0} Days`, o.bloodGroup && `Patient Blood Group: ${o.bloodGroup}`, o.husbandsBloodGroup && `Husband's Blood Group: ${o.husbandsBloodGroup}`]),
      ].filter(Boolean),
    },
    { id: "gplae", title: "GPLAE", lines: [lineFromParts([`G: ${o.gravidity || 0}`, `P: ${o.parity || 0}`, `L: ${o.livingChildren || 0}`, `A: ${o.abortions || 0}`, `E: ${o.ectopicPregnancies || 0}`])] },
    { id: "examination", title: "Current Examination", lines: examLines },
    { id: "anc", title: "ANC Scheduler", lines: ancLines },
    { id: "immunisation", title: "Immunisation History", lines: immunisationLines },
  ];
  return cards.filter((card) => card.lines.length).map((card) => ({ ...card, fresh: true }));
}

function buildViewData(overrides = {}) {
  const history = getMockPatientHistory();
  const currentDate = "Current Visit";
  const data = {
    pastVisits: pastVisits(history),
    vitals: vitalsByDate(history),
    history: historySections(history),
    labResults: LAB_RESULT_ENTRIES,
    medicalRecords: MEDICAL_RECORDS,
    gynec: GYNEC_SECTIONS,
    obstetric: OBSTETRIC_SECTIONS,
    vaccine: { pending: PENDING_VACCINES, given: GIVEN_VACCINES },
    growth: { entries: GROWTH_ENTRIES, info: GROWTH_PATIENT_INFO },
    optal: OPHTHAL_ENTRIES,
    personalNotes: PRIVATE_NOTES,
  };

  const digitalRx = buildDigitalRx(overrides.pastVisits);
  if (digitalRx) {
    data.pastVisits = [{ id: "digitized-current", dateLabel: currentDate, digitalRx, writtenRx: [], fresh: true }, ...data.pastVisits];
  }

  const vitalsRows = buildVitalsRows(overrides.vitals);
  if (vitalsRows.length) {
    data.vitals = [{ id: "digitized-vitals", dateLabel: currentDate, rows: vitalsRows, fresh: true }, ...data.vitals];
  }

  const historyGroups = buildHistoryGroups(overrides.history).filter((group) => group.items.length);
  if (historyGroups.length) data.history = historyGroups;

  const labRows = buildLabRows(overrides.labResults);
  if (labRows.length) {
    data.labResults = [{ id: "digitized-labs", dateLabel: currentDate, rows: labRows, fresh: true }, ...data.labResults];
  }

  const gynecCards = buildGynecCards(overrides.gynec);
  if (gynecCards.length) data.gynec = gynecCards;

  const obstetricCards = buildObstetricCards(overrides.obstetric);
  if (obstetricCards.length) data.obstetric = obstetricCards;

  return data;
}

function buildSectionOverrides(response, requestedSectionId) {
  const clinical = extractClinicalPayload(response);
  const updates = {};

  if (requestedSectionId) updates[requestedSectionId] = clinical;
  if (clinical.symptoms || clinical.examinations || clinical.diagnosis || clinical.medications || clinical.advice || clinical.labInvestigation || clinical.followUp) updates.pastVisits = clinical;
  if (clinical.vitalsAndBodyComposition || VITAL_DISPLAY_FIELDS.some((field) => clinical[field.key] !== undefined)) updates.vitals = clinical;
  if (clinical.medicalHistory || clinical.history) updates.history = clinical;
  if (clinical.labResults || clinical.labs) updates.labResults = clinical;
  if (clinical.gyneacHistory || clinical.gynecHistory || clinical.lastMenstrualPeriod || clinical.ageAtMenarche) updates.gynec = clinical;
  if (clinical.obstetricHistory || clinical.gravidity !== undefined || clinical.antenatalExamination) updates.obstetric = clinical;

  return updates;
}

function MedicalMaskIcon({ name, active }) {
  const variant = active ? "bulk" : "line";
  const src = `/new-assets/icons/medical/${name}--${variant}.svg`;
  return (
    <span
      className="snv-medical-icon"
      style={{
        "--snv-icon-url": `url("${src}")`,
      }}
      aria-hidden="true"
    />
  );
}

function IconPill({ item, active }) {
  const isMedical = item.icon.kind === "medical";
  const Icon = item.icon.Icon;

  return (
    <span className={`snv-icon-pill ${active ? "snv-icon-pill-active" : ""}`}>
      {isMedical ? (
        <MedicalMaskIcon name={item.icon.name} active={active} />
      ) : (
        <Icon
          size={20}
          variant={active ? "Bulk" : "Linear"}
          strokeWidth={active ? undefined : 1.5}
          color={active ? "var(--tp-blue-500)" : "#ffffff"}
        />
      )}
    </span>
  );
}

function NavItem({ item, active, onClick }) {
  return (
    <button
      type="button"
      className={`snv-nav-item ${active ? "snv-nav-item-active" : ""}`}
      onClick={() => onClick(item.id)}
      aria-current={active ? "page" : undefined}
    >
      <span className="snv-nav-item-inner">
        <IconPill item={item} active={active} />
        <span className="snv-nav-label">{item.label}</span>
      </span>
      {active ? <span className="snv-active-bar" aria-hidden="true" /> : null}
      {active ? <span className="snv-selection-arrow" aria-hidden="true" /> : null}
    </button>
  );
}

function NavPanel({ activeId, onSelect }) {
  const scrollRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return undefined;

    const updateHint = () => {
      const hasOverflow = node.scrollHeight > node.clientHeight + 2;
      const atTop = node.scrollTop <= 2;
      setShowScrollHint(hasOverflow && atTop);
    };

    updateHint();
    node.addEventListener("scroll", updateHint, { passive: true });
    window.addEventListener("resize", updateHint);

    let observer = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateHint);
      observer.observe(node);
    }

    return () => {
      node.removeEventListener("scroll", updateHint);
      window.removeEventListener("resize", updateHint);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div className="snv-rail">
      <div ref={scrollRef} className="snv-rail-scroll">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={activeId === item.id}
            onClick={onSelect}
          />
        ))}
      </div>
      {showScrollHint ? (
        <div className="snv-scroll-hint" aria-hidden="true">
          <span className="snv-scroll-hint-dot">
            <ArrowDown2 color="#ffffff" size={16} strokeWidth={1.5} variant="Linear" />
          </span>
        </div>
      ) : null}
    </div>
  );
}

function CopyAffordance() {
  return (
    <button type="button" className="snv-copy-btn" aria-label="Copy to RxPad">
      <Copy size={14} variant="Linear" />
    </button>
  );
}

function BulletList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="snv-bullet-list">
      {items.map((item, index) => {
        const label = typeof item === "string" ? item : item.label;
        const detail = typeof item === "string" ? "" : item.detail;
        return (
          <li key={`${label}-${index}`} className={item?.fresh ? "snv-fresh-row" : ""}>
            <span className="snv-bullet-label">{label}</span>
            {detail ? <span className="snv-bullet-detail"> ({detail})</span> : null}
          </li>
        );
      })}
    </ul>
  );
}

function RxSection({ title, icon, children }) {
  return (
    <div className="snv-rx-section">
      <div className="snv-rx-section-title">
        <span className="snv-rx-section-icon">{icon}</span>
        <span>{title}</span>
        <CopyAffordance />
      </div>
      {children}
    </div>
  );
}

function DateCard({ title, expanded, onToggle, children, fresh }) {
  return (
    <article className={`snv-date-card ${fresh ? "snv-fresh-card" : ""}`}>
      <button type="button" className="snv-date-card-header" onClick={onToggle}>
        <span>{title}</span>
        {expanded ? <ArrowSquareUp size={18} variant="Linear" /> : <ArrowSquareDown size={18} variant="Linear" />}
      </button>
      {expanded ? <div className="snv-date-card-body">{children}</div> : null}
    </article>
  );
}

function PastVisitsContent({ visits }) {
  const [expandedId, setExpandedId] = useState(visits[0]?.id);
  const [modeByVisit, setModeByVisit] = useState({});

  useEffect(() => {
    setExpandedId(visits[0]?.id);
  }, [visits[0]?.id]);

  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      {visits.map((visitItem) => {
        const expanded = expandedId === visitItem.id;
        const mode = modeByVisit[visitItem.id] || "digital";
        const rx = visitItem.digitalRx;

        return (
          <DateCard
            key={visitItem.id}
            title={visitItem.dateLabel}
            expanded={expanded}
            fresh={visitItem.fresh}
            onToggle={() => setExpandedId(expanded ? null : visitItem.id)}
          >
            <div className="snv-segmented">
              <button
                type="button"
                className={mode === "digital" ? "snv-segmented-active" : ""}
                onClick={() => setModeByVisit((prev) => ({ ...prev, [visitItem.id]: "digital" }))}
              >
                Digital Rx
              </button>
              <button
                type="button"
                className={mode === "written" ? "snv-segmented-active" : ""}
                onClick={() => setModeByVisit((prev) => ({ ...prev, [visitItem.id]: "written" }))}
              >
                Written Rx
              </button>
            </div>
            {mode === "written" ? (
              <div className="snv-written-list">
                {(visitItem.writtenRx || []).length ? (
                  visitItem.writtenRx.map((doc) => (
                    <div key={doc.id} className="snv-record-card">
                      <div className="snv-record-title">{doc.title}</div>
                      <div className="snv-record-meta">{doc.description}</div>
                    </div>
                  ))
                ) : (
                  <div className="snv-empty-state">No written Rx available.</div>
                )}
              </div>
            ) : rx ? (
              <>
                <RxSection title="Symptoms" icon="S"><BulletList items={rx.symptoms} /></RxSection>
                <RxSection title="Examination" icon="+"><BulletList items={rx.examinations} /></RxSection>
                <RxSection title="Diagnosis" icon="D"><BulletList items={rx.diagnoses} /></RxSection>
                <RxSection title="Med (Rx)" icon="Rx"><BulletList items={rx.medications} /></RxSection>
                {rx.advice ? <RxSection title="Advice" icon="A"><p className="snv-section-text">{rx.advice}</p></RxSection> : null}
                {rx.labInvestigations?.length ? <RxSection title="Investigations" icon="I"><BulletList items={rx.labInvestigations} /></RxSection> : null}
                {rx.followUp ? <RxSection title="Follow Up" icon="F"><p className="snv-section-text">{rx.followUp}</p></RxSection> : null}
              </>
            ) : (
              <div className="snv-empty-state">No digital Rx available for this visit.</div>
            )}
          </DateCard>
        );
      })}
    </div>
  );
}

function DirectionArrow({ direction }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`snv-kv-arrow snv-kv-arrow-${direction}`}>
      {direction === "high" ? (
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function KeyValueRows({ rows }) {
  return (
    <div className="snv-kv-list">
      {rows.map((row, index) => (
        <div key={`${row.label}-${index}`} className={`snv-kv-row ${row.abnormal ? "snv-kv-row-abnormal" : ""} ${row.fresh ? "snv-fresh-row" : ""}`}>
          <span className="snv-kv-label">{row.label} {row.unit ? <span className="snv-kv-unit">{row.unit}</span> : null}</span>
          <span className="snv-kv-value-wrap">
            {row.direction ? <DirectionArrow direction={row.direction} /> : null}
            <span className="snv-kv-value">{row.value}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function DateRowsContent({ entries }) {
  const [expandedId, setExpandedId] = useState(entries[0]?.id);

  useEffect(() => {
    setExpandedId(entries[0]?.id);
  }, [entries[0]?.id]);

  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      {entries.map((entry) => {
        const expanded = expandedId === entry.id;
        return (
          <DateCard
            key={entry.id}
            title={entry.dateLabel}
            expanded={expanded}
            fresh={entry.fresh}
            onToggle={() => setExpandedId(expanded ? null : entry.id)}
          >
            <KeyValueRows rows={entry.rows} />
          </DateCard>
        );
      })}
    </div>
  );
}

function HistoryContent({ sections }) {
  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      {sections.map((section) => (
        <div key={section.id} className={`snv-info-card ${section.fresh ? "snv-fresh-card" : ""}`}>
          <div className="snv-info-card-title">{section.title}<CopyAffordance /></div>
          {section.items.length ? <BulletList items={section.items.map((item) => ({ label: item.name, detail: item.detail, fresh: item.fresh }))} /> : <div className="snv-empty-state">No data recorded.</div>}
        </div>
      ))}
    </div>
  );
}

function SectionCardsContent({ sections }) {
  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      {sections.map((section) => (
        <div key={section.id} className={`snv-info-card ${section.fresh ? "snv-fresh-card" : ""}`}>
          <div className="snv-info-card-title">{section.title}<CopyAffordance /></div>
          <BulletList items={section.lines} />
        </div>
      ))}
    </div>
  );
}

const RECORD_FILTER_TYPES = ["All", "Pathology", "Prescription", "Radiology"];

function RecordsContent({ records }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? records : records.filter((r) => r.filterType === activeFilter);

  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      <div className="snv-filter-strip">
        {RECORD_FILTER_TYPES.map((f) => (
          <button
            key={f}
            type="button"
            className={`snv-filter-chip ${activeFilter === f ? "snv-filter-chip-active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      {filtered.map((record) => (
        <div key={record.id} className="snv-record-thumb-card">
          <div className={`snv-record-thumb snv-thumb-${record.imgType}`} aria-hidden="true" />
          <div className="snv-record-thumb-info">
            <div className="snv-record-thumb-label">{record.label}</div>
            <div className="snv-record-thumb-date">{record.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const TODAY_VACC = new Date();

function parseDueDateStr(s) {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatVaccDate(s) {
  const d = parseDueDateStr(s);
  if (!d) return s;
  const M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d.getDate()} ${M[d.getMonth()]}'${String(d.getFullYear()).slice(-2)}`;
}

function groupVaccByWeek(rows) {
  const order = [];
  const map = new Map();
  for (const v of rows) {
    if (!map.has(v.week)) { map.set(v.week, []); order.push(v.week); }
    map.get(v.week).push(v);
  }
  return order.map((week) => ({ week, items: map.get(week) }));
}

function VaccineWeekGroup({ week, items, kind }) {
  return (
    <div className="snv-vaccine-week-group">
      <div className="snv-vaccine-week-chip">
        <Calendar2 size={13} variant="Bulk" color="var(--tp-slate-500)" />
        <span>{week}</span>
      </div>
      <div className="snv-vaccine-item-list">
        {items.map((item, i) => (
          <div key={`${week}-${item.name}-${i}`} className="snv-vaccine-item">
            <span className="snv-vaccine-bullet" aria-hidden="true" />
            <p className="snv-vaccine-item-text">
              <span className="snv-vaccine-name">{item.name}</span>
              <span>{" ("}</span>
              <span className="snv-vaccine-muted">{kind === "given" ? "Given date: " : "Due date: "}</span>
              {kind === "given" ? (
                <span className="snv-vaccine-date-given">{item.givenDate}</span>
              ) : (
                <span className={`snv-vaccine-date-${kind}`}>{formatVaccDate(item.dueDate)}</span>
              )}
              {kind === "given" && item.brand ? (
                <>
                  <span className="snv-vaccine-sep">{" | "}</span>
                  <span className="snv-vaccine-muted">{"Brand: "}</span>
                  <span className="snv-vaccine-name">{item.brand}</span>
                  <span className="snv-vaccine-sep">{" | "}</span>
                  <span className="snv-vaccine-muted">{"Due date: "}</span>
                  <span className="snv-vaccine-name">{item.dueDate}</span>
                </>
              ) : null}
              {item.notes ? (
                <>
                  <span className="snv-vaccine-sep">{" | "}</span>
                  <span className="snv-vaccine-muted">{"Notes: "}</span>
                  <span className="snv-vaccine-name">{item.notes}</span>
                </>
              ) : null}
              <span>{")"}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VaccineContent({ data }) {
  const { pending, given } = data;
  const { overdueGroups, upcomingGroups, overdueCount, upcomingCount } = React.useMemo(() => {
    const overdue = [];
    const upcoming = [];
    for (const v of pending) {
      const d = parseDueDateStr(v.dueDate);
      if (d && d < TODAY_VACC) overdue.push(v);
      else upcoming.push(v);
    }
    return { overdueGroups: groupVaccByWeek(overdue), upcomingGroups: groupVaccByWeek(upcoming), overdueCount: overdue.length, upcomingCount: upcoming.length };
  }, [pending]);
  const givenGroups = React.useMemo(() => groupVaccByWeek(given), [given]);
  const [exp, setExp] = useState({ overdue: true, upcoming: true, given: true });

  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      <article className="snv-date-card">
        <button type="button" className="snv-date-card-header" onClick={() => setExp((p) => ({ ...p, overdue: !p.overdue }))}>
          <span>{`Overdue Vaccines (${overdueCount})`}</span>
          {exp.overdue ? <ArrowSquareUp size={18} variant="Linear" /> : <ArrowSquareDown size={18} variant="Linear" />}
        </button>
        {exp.overdue ? (
          <div className="snv-date-card-body">
            {overdueCount === 0 ? <div className="snv-empty-state">No overdue vaccines.</div> : overdueGroups.map((g, i) => <VaccineWeekGroup key={`ov-${g.week}-${i}`} week={g.week} items={g.items} kind="overdue" />)}
          </div>
        ) : null}
      </article>

      <article className="snv-date-card">
        <button type="button" className="snv-date-card-header" onClick={() => setExp((p) => ({ ...p, upcoming: !p.upcoming }))}>
          <span>{`Upcoming Vaccines (${upcomingCount})`}</span>
          {exp.upcoming ? <ArrowSquareUp size={18} variant="Linear" /> : <ArrowSquareDown size={18} variant="Linear" />}
        </button>
        {exp.upcoming ? (
          <div className="snv-date-card-body">
            {upcomingCount === 0 ? <div className="snv-empty-state">No upcoming vaccines.</div> : upcomingGroups.map((g, i) => <VaccineWeekGroup key={`up-${g.week}-${i}`} week={g.week} items={g.items} kind="upcoming" />)}
          </div>
        ) : null}
      </article>

      <article className="snv-date-card">
        <button type="button" className="snv-date-card-header" onClick={() => setExp((p) => ({ ...p, given: !p.given }))}>
          <span>{`Given Vaccines (${given.length})`}</span>
          {exp.given ? <ArrowSquareUp size={18} variant="Linear" /> : <ArrowSquareDown size={18} variant="Linear" />}
        </button>
        {exp.given ? (
          <div className="snv-date-card-body">
            {givenGroups.map((g, i) => <VaccineWeekGroup key={`gv-${g.week}-${i}`} week={g.week} items={g.items} kind="given" />)}
          </div>
        ) : null}
      </article>
    </div>
  );
}

function OptalEyeTable({ data }) {
  const keys = Object.keys(data.OD || data.OS || {});
  if (!keys.length) return null;
  return (
    <div className="snv-optal-eye-table">
      <div className="snv-optal-eye-row snv-optal-eye-header">
        <span />
        <span>OD</span>
        <span>OS</span>
      </div>
      {keys.map((key) => (
        <div key={key} className="snv-optal-eye-row">
          <span className="snv-optal-eye-key">{key}</span>
          <span className="snv-optal-eye-val">{data.OD?.[key] || "-"}</span>
          <span className="snv-optal-eye-val">{data.OS?.[key] || "-"}</span>
        </div>
      ))}
    </div>
  );
}

function OptalStructureRows({ rows }) {
  return (
    <div className="snv-optal-eye-table">
      <div className="snv-optal-eye-row snv-optal-eye-header">
        <span>Structure</span>
        <span>OD</span>
        <span>OS</span>
      </div>
      {rows.map((row, i) => (
        <div key={`${row.name}-${i}`} className="snv-optal-eye-row">
          <span className="snv-optal-eye-key">{row.name}</span>
          <span className="snv-optal-eye-val">{row.OD || "-"}</span>
          <span className="snv-optal-eye-val">{row.OS || "-"}</span>
        </div>
      ))}
    </div>
  );
}

function OptalContent({ entries }) {
  const [expandedId, setExpandedId] = useState(entries[0]?.id);
  useEffect(() => { setExpandedId(entries[0]?.id); }, [entries[0]?.id]);

  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      {entries.map((entry) => {
        const expanded = expandedId === entry.id;
        return (
          <DateCard key={entry.id} title={entry.dateLabel} expanded={expanded} fresh={entry.fresh} onToggle={() => setExpandedId(expanded ? null : entry.id)}>
            {entry.visualAcuity ? (
              <div className="snv-optal-subsection">
                <div className="snv-optal-subsection-title">Visual Acuity</div>
                <OptalEyeTable data={entry.visualAcuity} />
              </div>
            ) : null}
            {entry.iop ? (
              <div className="snv-optal-subsection">
                <div className="snv-optal-subsection-title">IOP</div>
                <OptalEyeTable data={entry.iop} />
              </div>
            ) : null}
            {entry.slitLamp?.length ? (
              <div className="snv-optal-subsection">
                <div className="snv-optal-subsection-title">Slit Lamp</div>
                <OptalStructureRows rows={entry.slitLamp} />
              </div>
            ) : null}
            {entry.fundus?.length ? (
              <div className="snv-optal-subsection">
                <div className="snv-optal-subsection-title">Fundus</div>
                <OptalStructureRows rows={entry.fundus} />
              </div>
            ) : null}
          </DateCard>
        );
      })}
    </div>
  );
}

// ── WHO growth reference data (0–36 months, 6-month intervals) ───────────────
const GROWTH_AGE_MONTHS = [0, 6, 12, 18, 24, 30, 36];

const WHO_HEIGHT = {
  P03: [44.2, 61.2, 69.0, 74.7, 79.4, 83.5, 87.1],
  P10: [46.1, 63.3, 71.0, 76.9, 81.7, 86.0, 89.9],
  P50: [49.9, 67.6, 75.7, 82.3, 87.8, 92.7, 96.1],
  P90: [53.5, 72.1, 80.6, 87.7, 93.6, 98.8, 103.2],
  P97: [55.6, 74.0, 82.7, 90.1, 96.4, 101.9, 106.5],
};
const WHO_WEIGHT = {
  P03: [2.5, 6.0, 7.8, 8.9, 9.7, 10.5, 11.1],
  P10: [2.8, 6.6, 8.4, 9.7, 10.6, 11.4, 12.1],
  P50: [3.3, 7.9, 9.9, 11.5, 12.5, 13.4, 14.3],
  P90: [4.0, 9.3, 11.6, 13.5, 14.8, 15.8, 16.8],
  P97: [4.3, 9.9, 12.4, 14.5, 15.9, 17.0, 18.0],
};
const WHO_BMI = {
  P03: [10.2, 13.1, 13.6, 13.6, 13.5, 13.4, 13.3],
  P10: [11.0, 13.9, 14.3, 14.3, 14.2, 14.1, 14.0],
  P50: [13.1, 16.7, 16.7, 16.4, 16.0, 15.7, 15.5],
  P90: [15.6, 19.6, 19.9, 19.7, 19.3, 18.9, 18.5],
  P97: [17.0, 20.9, 21.5, 21.5, 21.2, 20.8, 20.4],
};
const PCT_COLORS = {
  P97: "#f59e0b", P90: "#8b5cf6", P50: "#10b981", P10: "#6366f1", P03: "#ef4444",
};
const PCT_ORDER = ["P97", "P90", "P50", "P10", "P03"];

function makeWhoDatasets(whoData) {
  return PCT_ORDER.map((key) => ({
    label: key.replace("P", "P "),
    data: GROWTH_AGE_MONTHS.map((m, i) => ({ x: m, y: whoData[key][i] })),
    borderColor: PCT_COLORS[key],
    backgroundColor: "transparent",
    borderWidth: 1.5,
    pointRadius: 0,
    tension: 0.4,
    fill: false,
  }));
}

function makeGrowthPlugin(ageMonths, ageLabel) {
  return {
    id: "growthOverlay",
    afterDraw(chart) {
      const { ctx, scales, chartArea } = chart;
      if (!scales.x || !scales.y) return;
      const todayPx = scales.x.getPixelForValue(ageMonths);
      ctx.save();
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(todayPx, chartArea.top);
      ctx.lineTo(todayPx, chartArea.bottom);
      ctx.stroke();
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Today", todayPx, chartArea.top - 12);
      ctx.fillStyle = "#6b7280";
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText(ageLabel, todayPx, chartArea.top - 2);
      chart.data.datasets.forEach((ds, i) => {
        const meta = chart.getDatasetMeta(i);
        if (!meta.data.length) return;
        const last = meta.data[meta.data.length - 1];
        ctx.save();
        ctx.fillStyle = ds.borderColor;
        ctx.font = "bold 9px Inter, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(ds.label, chartArea.right + 2, last.y + 3);
        ctx.restore();
      });
      ctx.restore();
    },
  };
}

const BASE_GROWTH_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  layout: { padding: { right: 32, top: 26 } },
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: {
    x: {
      type: "linear", min: 0, max: 36,
      ticks: { stepSize: 6, callback: (v) => v === 0 ? "0y" : `${v / 12}y`, color: "#9ca3af", font: { size: 9 } },
      grid: { color: "rgba(0,0,0,0.06)" },
      title: { display: true, text: "Age in Years", color: "#9ca3af", font: { size: 9 } },
    },
    y: {
      ticks: { color: "#9ca3af", font: { size: 9 } },
      grid: { color: "rgba(0,0,0,0.06)" },
    },
  },
};

function GrowthChartCard({ title, whoData, yLabel, ageMonths, ageLabel }) {
  const plugin = React.useMemo(() => makeGrowthPlugin(ageMonths, ageLabel), [ageMonths, ageLabel]);
  const chartData = React.useMemo(() => ({ datasets: makeWhoDatasets(whoData) }), [whoData]);
  const opts = React.useMemo(() => ({
    ...BASE_GROWTH_OPTS,
    scales: { ...BASE_GROWTH_OPTS.scales, y: { ...BASE_GROWTH_OPTS.scales.y, title: { display: true, text: yLabel, color: "#9ca3af", font: { size: 9 } } } },
  }), [yLabel]);

  return (
    <div className="snv-gwc-card">
      <div className="snv-gwc-header">
        <span className="snv-gwc-title">{title}</span>
      </div>
      <div className="snv-gwc-controls">
        <button type="button" className="snv-gwc-pct-btn">
          All Percentiles
          <ArrowDown2 size={11} variant="Linear" color="#454551" />
        </button>
        <div className="snv-gwc-unit-toggle">
          <button type="button" className="snv-gwc-unit-btn snv-gwc-unit-active">Yrs</button>
          <button type="button" className="snv-gwc-unit-btn">Mth</button>
        </div>
      </div>
      <div className="snv-gwc-chart">
        <Line data={chartData} options={opts} plugins={[plugin]} />
      </div>
    </div>
  );
}

function GrowthContent({ data }) {
  const { info } = data;
  const ageMonths = info.ageMonths || 34;
  const yrs = Math.floor(ageMonths / 12);
  const mths = ageMonths % 12;
  const ageLabel = mths ? `${yrs}y ${mths}m` : `${yrs}y`;

  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      <div className="snv-date-card snv-growth-info-card">
        <div className="snv-date-card-header" style={{ cursor: "default" }}>
          <span>Growth Info</span>
        </div>
        <div className="snv-date-card-body snv-growth-info-rows">
          {[
            ["Mid-parental height", info.midParentalHeight],
            ["Mother", info.motherHeight],
            ["Father", info.fatherHeight],
            ["Gestation period", info.gestationPeriod],
          ].map(([label, value]) => (
            <div key={label} className="snv-growth-info-row">
              <span className="snv-kv-label">{label}</span>
              <span className="snv-kv-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <GrowthChartCard title="Height for Age" whoData={WHO_HEIGHT} yLabel="Height (cm)" ageMonths={ageMonths} ageLabel={ageLabel} />
      <GrowthChartCard title="Weight for Age" whoData={WHO_WEIGHT} yLabel="Weight (kg)" ageMonths={ageMonths} ageLabel={ageLabel} />
      <GrowthChartCard title="BMI for Age" whoData={WHO_BMI} yLabel="BMI (kg/m²)" ageMonths={ageMonths} ageLabel={ageLabel} />
    </div>
  );
}

function PrivateNotesContent({ notes }) {
  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      <div className="snv-info-card">
        <div className="snv-info-card-title">Private Notes<CopyAffordance /></div>
        <BulletList items={notes} />
      </div>
    </div>
  );
}

function SectionContent({ activeId, viewData }) {
  switch (activeId) {
    case "pastVisits":
      return <PastVisitsContent visits={viewData.pastVisits} />;
    case "vitals":
      return <DateRowsContent entries={viewData.vitals} />;
    case "history":
      return <HistoryContent sections={viewData.history} />;
    case "labResults":
      return <DateRowsContent entries={viewData.labResults} />;
    case "medicalRecords":
      return <RecordsContent records={viewData.medicalRecords} />;
    case "gynec":
      return <SectionCardsContent sections={viewData.gynec} />;
    case "obstetric":
      return <SectionCardsContent sections={viewData.obstetric} />;
    case "vaccine":
      return <VaccineContent data={viewData.vaccine} />;
    case "growth":
      return <GrowthContent data={viewData.growth} />;
    case "optal":
      return <OptalContent entries={viewData.optal} />;
    case "personalNotes":
      return <PrivateNotesContent notes={viewData.personalNotes} />;
    default:
      return <div className="snv-empty-state">No data recorded.</div>;
  }
}

function sectionActionLabel(activeId) {
  if (activeId === "medicalRecords") return "Add New Records";
  return "Add/Edit Details";
}

function sectionVoiceLabel(activeId) {
  const title = SECTION_TITLES[activeId] || "Details";
  return title.replace(/\s+History$/i, "").replace(/^Medical\s+/, "").trim() || "Details";
}

function SectionActionRow({ activeId, voiceState, onVoiceClick }) {
  if (activeId === "pastVisits") return null;
  const status = voiceState?.status || "idle";
  const busy = status === "recording" || status === "transcribing" || status === "digitizing";
  const label = sectionActionLabel(activeId);

  return (
    <div className="snv-action-row">
      <button
        type="button"
        className="snv-add-details-btn vrx-cn-secondary-blue"
        onClick={() => console.log("[sideNavbar] add/edit details clicked", { sectionId: activeId })}
      >
        <span className="snv-add-plus" aria-hidden="true" />
        <span>{label}</span>
      </button>
      <button
        type="button"
        className="snv-voice-cta-btn vrx-rt-voice-cta-outline"
        onClick={busy ? undefined : onVoiceClick}
        disabled={busy}
        aria-label={`Use Voice AI to fill ${label.toLowerCase()}`}
        title={`Use Voice AI to fill ${label.toLowerCase()}`}
      >
        <VoiceRxIcon size={20} color="#673AAC" />
      </button>
    </div>
  );
}

function formatRecElapsed(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function VoiceOverlay({ activeId, voiceState, onSubmit, onCancel, onClose }) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    if (voiceState?.status !== "recording") { setElapsedMs(0); return undefined; }
    startRef.current = Date.now();
    const id = window.setInterval(() => setElapsedMs(Date.now() - startRef.current), 500);
    return () => window.clearInterval(id);
  }, [voiceState?.status]);

  if (!voiceState || voiceState.status === "idle" || voiceState.status === "done") return null;

  const title = sectionVoiceLabel(activeId);
  const isRecording = voiceState.status === "recording";
  const isProcessing = voiceState.status === "transcribing" || voiceState.status === "digitizing";
  const isError = voiceState.status === "error";

  return (
    <div className="snv-vrx-overlay" data-voice-allow="true">
      {isRecording ? (
        <>
          {/* transcript placeholder */}
          <div className="snv-vrx-transcript-area">
            <p className="snv-vrx-transcript-placeholder">
              Speak naturally to add {title.toLowerCase()} details.
            </p>
          </div>

          {/* CTA row — cancel | mic+chevron | submit */}
          <div className="snv-vrx-cta-row">
            <button
              type="button"
              onClick={onCancel}
              aria-label="Cancel dictation"
              className="vrx-lg-btn vrx-close-btn snv-vrx-cta-sq">
              <span className="vrx-lg-surface" aria-hidden="true" />
              <span className="vrx-lg-sheen" aria-hidden="true" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="snv-vrx-x-icon" aria-hidden="true">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <span className="snv-vrx-divider" aria-hidden="true" />

            <div className="vrx-lg-btn snv-vrx-mic-group">
              <span className="vrx-lg-surface" aria-hidden="true" />
              <span className="vrx-lg-sheen" aria-hidden="true" />
              <span className="snv-vrx-mic-icon-wrap" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path opacity="0.4" d="M19.12 9.12c-.39 0-.7.31-.7.7v1.58c0 3.54-2.88 6.42-6.42 6.42s-6.42-2.88-6.42-6.42V9.81c0-.39-.31-.7-.7-.7-.39 0-.7.31-.7.7v1.58c0 4.07 3.13 7.42 7.12 7.78v2.13c0 .39.31.7.7.7.39 0 .7-.31.7-.7v-2.13c3.98-.35 7.12-3.71 7.12-7.78V9.81a.707.707 0 0 0-.7-.69Z" />
                  <path d="M12 2c-2.44 0-4.42 1.98-4.42 4.42v5.12c0 2.44 1.98 4.42 4.42 4.42s4.42-1.98 4.42-4.42V6.42C16.42 3.98 14.44 2 12 2Z" />
                </svg>
              </span>
              <div className="vrx-lg-divider" aria-hidden="true" />
              <span className="snv-vrx-chevron" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <span className="snv-vrx-divider" aria-hidden="true" />

            <button
              type="button"
              onClick={onSubmit}
              aria-label="Submit dictation"
              className="vrx-submit-hero vrx-submit-enabled snv-vrx-submit-btn">
              <span className="vrx-submit-gradient" style={{ position: "absolute", inset: 0, borderRadius: "inherit" }} aria-hidden="true" />
              <span className="vrx-submit-sheen" aria-hidden="true" />
              <span className="snv-vrx-submit-inner">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20.46 6.18L8.82 17.82L3.53 12.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Submit</span>
              </span>
            </button>
          </div>

          {/* Status pill */}
          <div className="snv-vrx-status-row">
            <div className="vrx-status-card" role="status" aria-live="polite">
              <span className="snv-vrx-rec-dot">
                <span className="snv-vrx-rec-ring" aria-hidden="true" />
              </span>
              <span className="snv-vrx-status-text">
                Listening
                <span className="snv-vrx-status-section">{" · "}{title}</span>
                {elapsedMs > 0 ? <span className="snv-vrx-status-elapsed">{" ("}{formatRecElapsed(elapsedMs)}{")"}</span> : null}
              </span>
            </div>
          </div>
        </>
      ) : null}

      {isProcessing ? (
        <div className="snv-voice-processing">
          <div className="snv-processing-card">
            <span className="snv-processing-glow" />
            <span>{voiceState.status === "transcribing" ? "Structuring your transcript" : "Filling this section"}</span>
          </div>
          <div className="snv-processing-caption">
            {voiceState.status === "transcribing" ? "Sending audio to transcription API..." : "Calling digitise-data and mapping the response..."}
          </div>
        </div>
      ) : null}

      {isError ? (
        <div className="snv-voice-error-panel">
          <div className="snv-voice-error-title">Voice processing failed</div>
          <div className="snv-voice-error-message">{voiceState.error || "Please try again."}</div>
          <button type="button" className="snv-voice-error-close" onClick={onClose}>Close</button>
        </div>
      ) : null}
    </div>
  );
}

function SectionPanel({ activeId, onClose, onNavigate, transitionDir, voiceState, onVoiceClick, onVoiceSubmit, onVoiceCancel, onVoiceOverlayClose, viewData }) {
  const title = SECTION_TITLES[activeId] || "Section";
  const containerRef = useRef(null);
  const overlayActive = voiceState && !["idle", "done"].includes(voiceState.status);

  useEdgeSwipeNavigation({
    containerRef,
    onNavigate,
    enabled: Boolean(onNavigate),
    resetKey: activeId,
  });

  return (
    <section ref={containerRef} className={`snv-content-panel ${overlayActive ? "snv-content-panel-overlay-active" : ""}`}>
      <div className="snv-section-header">
        <span className="snv-section-title">{title}</span>
        <span className="snv-section-actions">
          <button
            type="button"
            className="snv-collapse-btn"
            onClick={onClose}
            aria-label="Collapse section panel"
          >
            <SidebarLeft size={16} variant="Linear" />
          </button>
        </span>
      </div>
      <SectionActionRow activeId={activeId} voiceState={voiceState} onVoiceClick={onVoiceClick} />
      <div key={activeId} className={`snv-section-anim ${transitionDir ? `snv-section-${transitionDir}` : ""}`}>
        <SectionContent activeId={activeId} viewData={viewData} />
      </div>
      <VoiceOverlay
        activeId={activeId}
        voiceState={voiceState}
        onSubmit={onVoiceSubmit}
        onCancel={onVoiceCancel}
        onClose={onVoiceOverlayClose}
      />
    </section>
  );
}

function createSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `snv_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function pickMimeType() {
  if (typeof MediaRecorder === "undefined" || !MediaRecorder.isTypeSupported) return "";
  if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) return "audio/webm;codecs=opus";
  if (MediaRecorder.isTypeSupported("audio/webm")) return "audio/webm";
  if (MediaRecorder.isTypeSupported("audio/mp4")) return "audio/mp4";
  return "";
}

export function SideNavbar({ onSectionSelect, patientId, doctorId }) {
  const [activeId, setActiveId] = useState("pastVisits");
  const [transitionDir, setTransitionDir] = useState(null);
  const [voiceBySection, setVoiceBySection] = useState({});
  const [digitizedOverrides, setDigitizedOverrides] = useState({});
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const activeVoiceSectionRef = useRef(null);
  const cancelVoiceRef = useRef(false);
  const viewData = buildViewData(digitizedOverrides);

  const setActiveSection = useCallback((id, dir = null) => {
    setTransitionDir(dir);
    setActiveId(id);
    if (onSectionSelect) onSectionSelect(id);
  }, [onSectionSelect]);

  const handleSelect = (id) => {
    const next = activeId === id ? null : id;
    setActiveSection(next, null);
  };

  const handleClose = () => {
    setActiveSection(null, null);
  };

  const handleNavigate = useCallback((dir) => {
    const currentIndex = NAV_SEQUENCE.indexOf(activeId);
    if (currentIndex === -1) return;
    const nextIndex = dir === "next" ? currentIndex + 1 : currentIndex - 1;
    const next = NAV_SEQUENCE[nextIndex];
    if (!next) return;
    setActiveSection(next, dir);
  }, [activeId, setActiveSection]);

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const updateVoiceState = (sectionId, patch) => {
    setVoiceBySection((prev) => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        ...patch,
      },
    }));
  };

  const transcribeSectionAudio = async (sectionId, audioBlob) => {
    updateVoiceState(sectionId, { status: "transcribing", error: "", transcript: "", digitizedSummary: "" });
    let transcript = "";
    try {
      const context = {
        patientId: String(patientId || "mock-patient"),
        doctorId: String(doctorId || "mock-doctor"),
        sessionId: createSessionId(),
      };
      transcript = await transcribeAudio({ audioBlob, context });
      console.log("[sideNavbar] transcribe-audio response", { sectionId, transcript });
      updateVoiceState(sectionId, { status: "digitizing", transcript, error: "", digitizedSummary: "" });

      const digitizedResult = await digitiseClinicalData({
        context,
        onResult: (name, result) => {
          console.log("[sideNavbar] digitise-data module result", { sectionId, name, result });
        },
      });
      console.log("[sideNavbar] digitise-data response", { sectionId, digitizedResult });
      if (digitizedResult?.status === "rejected") {
        throw new Error(digitizedResult.error || "Digitization failed.");
      }

      const sectionUpdates = buildSectionOverrides(digitizedResult, sectionId);
      setDigitizedOverrides((prev) => ({ ...prev, ...sectionUpdates }));
      updateVoiceState(sectionId, {
        status: "done",
        transcript,
        digitizedSummary: JSON.stringify(sectionUpdates, null, 2),
        error: "",
      });
    } catch (error) {
      console.error("[sideNavbar] voice processing failed", { sectionId, error });
      updateVoiceState(sectionId, { status: "error", error: error?.message || "Voice processing failed.", transcript, digitizedSummary: "" });
    } finally {
      stopStream();
      recorderRef.current = null;
      activeVoiceSectionRef.current = null;
      chunksRef.current = [];
      cancelVoiceRef.current = false;
    }
  };

  const handleVoiceClick = async () => {
    if (!activeId) return;

    const existing = voiceBySection[activeId]?.status;
    if (existing === "recording" || existing === "transcribing" || existing === "digitizing") {
      return;
    }

    if (recorderRef.current && recorderRef.current.state === "recording") {
      recorderRef.current.stop();
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      updateVoiceState(activeId, { status: "error", error: "Audio recording is not supported in this browser.", transcript: "" });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      activeVoiceSectionRef.current = activeId;
      cancelVoiceRef.current = false;

      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data?.size) chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const sectionId = activeVoiceSectionRef.current || activeId;
        if (cancelVoiceRef.current) {
          updateVoiceState(sectionId, { status: "idle", error: "", transcript: "", digitizedSummary: "" });
          stopStream();
          recorderRef.current = null;
          activeVoiceSectionRef.current = null;
          chunksRef.current = [];
          cancelVoiceRef.current = false;
          return;
        }
        const type = chunksRef.current[0]?.type || mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type });
        transcribeSectionAudio(sectionId, blob);
      };

      recorder.onerror = (event) => {
        const sectionId = activeVoiceSectionRef.current || activeId;
        updateVoiceState(sectionId, { status: "error", error: event.error?.message || "Recording failed.", transcript: "" });
        stopStream();
      };

      recorder.start();
      updateVoiceState(activeId, { status: "recording", error: "", transcript: "", digitizedSummary: "" });
    } catch (error) {
      updateVoiceState(activeId, { status: "error", error: error?.message || "Microphone permission was denied.", transcript: "" });
      stopStream();
    }
  };

  const handleVoiceSubmit = () => {
    if (recorderRef.current?.state === "recording") {
      cancelVoiceRef.current = false;
      recorderRef.current.stop();
    }
  };

  const handleVoiceCancel = () => {
    const sectionId = activeVoiceSectionRef.current || activeId;
    cancelVoiceRef.current = true;
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
      return;
    }
    updateVoiceState(sectionId, { status: "idle", error: "", transcript: "", digitizedSummary: "" });
    stopStream();
  };

  const handleVoiceOverlayClose = () => {
    if (!activeId) return;
    updateVoiceState(activeId, { status: "idle", error: "", transcript: "", digitizedSummary: "" });
  };

  useEffect(() => () => {
    cancelVoiceRef.current = true;
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    stopStream();
  }, []);

  return (
    <aside className="snv-root" data-side-navbar="true">
      <NavPanel activeId={activeId} onSelect={handleSelect} />
      {activeId ? (
        <SectionPanel
          activeId={activeId}
          onClose={handleClose}
          onNavigate={handleNavigate}
          transitionDir={transitionDir}
          voiceState={voiceBySection[activeId]}
          onVoiceClick={handleVoiceClick}
          onVoiceSubmit={handleVoiceSubmit}
          onVoiceCancel={handleVoiceCancel}
          onVoiceOverlayClose={handleVoiceOverlayClose}
          viewData={viewData}
        />
      ) : null}
    </aside>
  );
}

export { SIDE_NAVBAR_DIGITIZATION_RESPONSE_CONTRACT };

export default SideNavbar;
