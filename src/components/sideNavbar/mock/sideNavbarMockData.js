const WRITTEN_RX_PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
const WRITTEN_RX_PREVIEW = "/new-assets/assets/afc7c9e55f8624dd8cba9c2017f7a975fba9d2d2.png";

export const EMPTY_VITALS = {
  temperature: "",
  pulse: "",
  respiratoryRate: "",
  bloodPressure: "",
  systolic: "",
  diastolic: "",
  spo2: "",
  randomBloodSugar: "",
  height: "",
  weight: "",
  headCircumference: "",
  waistCircumference: "",
  bmi: "",
  bmr: "",
  bsa: "",
  fib4: "",
  generalRBS: "",
};

export const EMPTY_GYNEC = {
  lastMenstrualPeriod: "",
  ageAtMenarche: 0,
  cycle: "",
  intervalCycle: 0,
  intervalNotes: "",
  flow: "",
  durationOfMenstrualFlow: 0,
  clotsDuringFlow: "",
  numberOfPadsPerDay: 0,
  clotsNotes: "",
  pain: "",
  occurrenceOfPain: "",
  painNotes: "",
  lifecycleHarmonialChanges: "",
  ageAtMenopause: 0,
  typeOfMenopause: "",
  lifecycleHarmonialChangesNotes: "",
  notes: "",
};

export const EMPTY_OBSTETRIC = {
  gravidity: 0,
  parity: 0,
  livingChildren: 0,
  abortions: 0,
  ectopicPregnancies: 0,
  lastMenstrualPeriod: "",
  expectedDateOfDelivery: "",
  calculatedExpectedDateOfDelivery: "",
  gestationWeeks: 0,
  gestationDays: 0,
  bloodGroup: "",
  husbandsBloodGroup: "",
  consanguineousMarriage: "",
  maritalStatus: "",
  marriageDurationYears: 0,
  marriageDurationMonths: 0,
  pastPregnancyDetails: [],
  antenatalExamination: [],
  ancHistory: [],
  immunisationHistory: [],
  diagnosisNotes: "",
};

export function emptyPrescription() {
  return {
    patientDetails: { name: "", age: "", gender: "", bloodGroup: "", notes: "" },
    vitalsAndBodyComposition: { ...EMPTY_VITALS },
    symptoms: [],
    examinations: [],
    diagnosis: [],
    medications: [],
    vaccinations: [],
    surgeries: [],
    labResults: [],
    medicalHistory: [],
    gyneacHistory: { ...EMPTY_GYNEC },
    obstetricHistory: { ...EMPTY_OBSTETRIC },
    advice: [],
    labInvestigation: [],
    followUp: "",
    others: [],
    dynamicFields: [],
  };
}

function visit(partial, meta) {
  return {
    id: meta.id,
    dateLabel: meta.dateLabel,
    isCurrent: meta.isCurrent,
    attachments: meta.attachments,
    payload: { ...emptyPrescription(), ...partial },
  };
}

const TODAY = visit(
  {
    patientDetails: {
      name: "Aarav Mehta",
      age: "34",
      gender: "Male",
      bloodGroup: "O+",
      notes: "",
    },
    vitalsAndBodyComposition: {
      temperature: "95",
      pulse: "68",
      respiratoryRate: "18",
      bloodPressure: "120/75",
      systolic: "120",
      diastolic: "75",
      spo2: "98",
      randomBloodSugar: "",
      height: "172",
      weight: "68",
      headCircumference: "",
      waistCircumference: "",
      bmi: "23.0",
      bmr: "1680",
      bsa: "1.82",
      fib4: "",
      generalRBS: "",
    },
    symptoms: [
      { name: "Fever", duration: "2 days", severity: "High", notes: "No measured temperature" },
      { name: "Redness in both eyes", duration: "2 days", severity: "High", notes: "Conjunctival congestion" },
    ],
    examinations: [{ name: "Lung Infection", notes: "Mild crepitations in bilateral lower zones" }],
    diagnosis: [
      { name: "Viral Fever", since: "2 days", status: "Confirmed", notes: "Moderate" },
      { name: "Conjunctivitis", since: "", status: "Confirmed", notes: "Acute, Bilateral" },
    ],
    medications: [
      {
        name: "Telma20 Tablet",
        frequency: "1-0-0-1",
        dosage: "1 Tablet(s)",
        schedule: "Before Food",
        duration: "4 Days",
        notes: "Stop if no fever",
        quantity: 8,
      },
      {
        name: "Metsmail 500 Tablet",
        frequency: "1-0-0-1",
        dosage: "1 Tablet(s)",
        schedule: "After Food",
        duration: "4 Days",
        notes: "Hydration advised",
        quantity: 8,
      },
    ],
    advice: ["Hydration, eye hygiene, and steam inhalation.", "Return if fever persists for 48 hours."],
    labInvestigation: [
      { name: "CBC", instruction: "", notes: "" },
      { name: "LFT", instruction: "", notes: "" },
    ],
    followUp: "2 Weeks",
    medicalHistory: [
      { name: "Type 2 Diabetes", type: "Medical condition", duration: "2 Year(s)", relation: "", enable: "Y", notes: "" },
      { name: "Hypertension", type: "Medical condition", duration: "5 Year(s)", relation: "", enable: "Y", notes: "" },
      { name: "Dyslipidemia", type: "Medical condition", duration: "1 Year(s)", relation: "", enable: "Y", notes: "" },
      { name: "Dust", type: "Allergies", duration: "3 Year(s)", relation: "", enable: "Y", notes: "" },
      { name: "Ibuprofen", type: "Allergies", duration: "5 Year(s)", relation: "", enable: "Y", notes: "Gastric intolerance" },
      { name: "Diabetes Mellitus", type: "Family History", duration: "", relation: "Father, Paternal Uncle", enable: "Y", notes: "" },
      { name: "Hypertension", type: "Family History", duration: "", relation: "Mother", enable: "Y", notes: "" },
      { name: "Thyroid disorder", type: "Family History", duration: "", relation: "Mother, Maternal Grandmother", enable: "Y", notes: "" },
      { name: "Appendectomy", type: "Surgical History", duration: "", relation: "", enable: "Y", notes: "2018, Uncomplicated, laparoscopic" },
      { name: "Right knee arthroscopy", type: "Surgical History", duration: "", relation: "", enable: "Y", notes: "2022, Meniscus tear repair, full recovery" },
      { name: "Smoking", type: "Lifestyle", duration: "10 Year(s)", relation: "", enable: "Y", notes: "6 cigarettes/day, quit target 3 months" },
      { name: "Alcohol", type: "Lifestyle", duration: "8 Year(s)", relation: "", enable: "Y", notes: "Occasional, social drinking" },
      { name: "Diet", type: "Additional Notes", duration: "", relation: "", enable: "Y", notes: "Mixed diet, Irregular meal timing during work shifts" },
    ],
    labResults: [
      { testname: "Hb", value: "13.8 g/dL", notes: "" },
      { testname: "Creatinine", value: "0.9 mg/dL", notes: "" },
      { testname: "TSH", value: "2.4 mIU/L", notes: "" },
    ],
    others: ["Digital Rx imported from 27 Jan consultation."],
  },
  {
    id: "visit-27-jan",
    dateLabel: "27 Jan'26",
    isCurrent: true,
    attachments: [
      {
        id: "wrx-27-a",
        title: "Written Rx",
        description: "Scanned OPD sheet (27 Jan'26)",
        pdfUrl: WRITTEN_RX_PDF,
        previewImage: WRITTEN_RX_PREVIEW,
        doctorName: "Dr. Shyam Sundar",
        doctorSpecialty: "General Physician",
      },
    ],
  }
);

const D_26 = visit(
  {
    vitalsAndBodyComposition: {
      ...EMPTY_VITALS,
      temperature: "99.2",
      pulse: "84",
      respiratoryRate: "20",
      bloodPressure: "124/78",
      systolic: "124",
      diastolic: "78",
      spo2: "97",
      weight: "68.4",
      bmi: "23.1",
    },
    symptoms: [
      { name: "Cough", duration: "3 days", severity: "Productive", notes: "Night worsening" },
      { name: "Mild breathlessness", duration: "Intermittent", severity: "", notes: "Exertional" },
    ],
    examinations: [{ name: "Chest auscultation", notes: "Rhonchi present" }],
    diagnosis: [{ name: "Acute Bronchitis", since: "3 days", status: "Confirmed", notes: "Mild" }],
    medications: [
      { name: "Azithromycin 500", frequency: "1-0-0", dosage: "1 Tablet(s)", schedule: "After Food", duration: "3 Days", notes: "Complete course", quantity: 3 },
    ],
    advice: ["Warm fluids and rest.", "Avoid cold exposure."],
    labInvestigation: [{ name: "CBC", instruction: "", notes: "" }],
    followUp: "5 Days",
    others: ["Digital Rx imported from 26 Jan consultation."],
  },
  { id: "visit-26-jan", dateLabel: "26 Jan'26" }
);

const D_24 = visit(
  {
    vitalsAndBodyComposition: {
      ...EMPTY_VITALS,
      temperature: "98.6",
      pulse: "79",
      respiratoryRate: "18",
      bloodPressure: "118/74",
      systolic: "118",
      diastolic: "74",
      spo2: "99",
      weight: "68.0",
      bmi: "22.9",
    },
    symptoms: [
      { name: "Headache", duration: "1 day", severity: "Frontal", notes: "Intermittent" },
      { name: "Photophobia", duration: "", severity: "Mild", notes: "" },
    ],
    examinations: [{ name: "Neurological exam", notes: "No focal deficits" }],
    diagnosis: [{ name: "Migraine (episodic)", since: "", status: "Confirmed", notes: "Known history" }],
    medications: [
      { name: "Naproxen 250", frequency: "SOS", dosage: "1 Tablet(s)", schedule: "After Food", duration: "Till Required", notes: "Max 2/day", quantity: 0 },
    ],
    advice: ["Sleep hygiene and hydration.", "Trigger diary advised."],
    labInvestigation: [{ name: "TSH", instruction: "", notes: "" }],
    followUp: "1 Week",
    others: ["Digital Rx imported from 24 Jan consultation."],
  },
  {
    id: "visit-24-jan",
    dateLabel: "24 Jan'26",
    attachments: [
      {
        id: "wrx-24-a",
        title: "Written Rx",
        description: "Legacy handwritten prescription (24 Jan'26)",
        pdfUrl: WRITTEN_RX_PDF,
        previewImage: WRITTEN_RX_PREVIEW,
        doctorName: "Dr. Shyam Sundar",
        doctorSpecialty: "General Physician",
      },
    ],
  }
);

const D_22 = visit(
  {
    vitalsAndBodyComposition: {
      ...EMPTY_VITALS,
      temperature: "98.4",
      pulse: "76",
      respiratoryRate: "17",
      bloodPressure: "116/72",
      systolic: "116",
      diastolic: "72",
      spo2: "99",
      weight: "67.8",
      bmi: "22.8",
    },
  },
  {
    id: "visit-22-jan",
    dateLabel: "22 Jan'26",
    attachments: [{ id: "wrx-22-a", title: "Written Rx", description: "Only written Rx available for this date", pdfUrl: WRITTEN_RX_PDF, previewImage: WRITTEN_RX_PREVIEW }],
  }
);

const D_20 = visit(
  {
    vitalsAndBodyComposition: {
      ...EMPTY_VITALS,
      temperature: "98.5",
      pulse: "80",
      respiratoryRate: "18",
      bloodPressure: "119/75",
      systolic: "119",
      diastolic: "75",
      spo2: "98",
      weight: "68.2",
      bmi: "23.0",
    },
  },
  {
    id: "visit-20-jan",
    dateLabel: "20 Jan'26",
    attachments: [{ id: "wrx-20-a", title: "Written Rx", description: "Only written Rx available for this date", pdfUrl: WRITTEN_RX_PDF, previewImage: WRITTEN_RX_PREVIEW }],
  }
);

export const SIDE_NAVBAR_PATIENT_HISTORY = { visits: [TODAY, D_26, D_24, D_22, D_20] };

export function getMockPatientHistory() {
  return SIDE_NAVBAR_PATIENT_HISTORY;
}

const VITAL_FIELDS = [
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

function isPresent(value) {
  if (value === undefined || value === null) return false;
  const text = String(value).trim();
  return Boolean(text) && text !== "0";
}

function valueDetail(values) {
  return values.filter(isPresent).map((value) => String(value).trim()).join(", ");
}

export function vitalsByDate(history) {
  return history.visits
    .map((visitItem) => ({
      id: visitItem.id,
      dateLabel: visitItem.dateLabel,
      rows: VITAL_FIELDS.flatMap((field) => {
        const value = visitItem.payload.vitalsAndBodyComposition[field.key];
        return isPresent(value) ? [{ label: field.label, unit: field.unit, value }] : [];
      }),
    }))
    .filter((block) => block.rows.length > 0);
}

const HISTORY_SECTION_ORDER = [
  { id: "medical", title: "Medical Conditions", type: "Medical condition" },
  { id: "allergies", title: "Allergies", type: "Allergies" },
  { id: "family", title: "Family History", type: "Family History" },
  { id: "surgical", title: "Surgeries", type: "Surgical History" },
  { id: "lifestyle", title: "Lifestyle", type: "Lifestyle" },
  { id: "additional", title: "Additional Notes", type: "Additional Notes" },
];

function historyDetailFor(entry) {
  if (entry.type === "Family History") return valueDetail([entry.relation, entry.notes]) || undefined;
  const showsStatus = entry.type === "Medical condition" || entry.type === "Allergies" || entry.type === "Lifestyle";
  const status = showsStatus && entry.enable === "N" ? "Negated" : showsStatus && entry.enable === "Y" ? "Active" : "";
  return valueDetail([entry.duration, status, entry.notes]) || undefined;
}

export function historySections(history) {
  const byKey = new Map();
  history.visits.forEach((visitItem) => {
    visitItem.payload.medicalHistory.forEach((entry) => {
      byKey.set(`${entry.type}::${entry.name.toLowerCase()}`, entry);
    });
  });
  const aggregated = [...byKey.values()];
  return HISTORY_SECTION_ORDER.map(({ id, title, type }) => ({
    id,
    title,
    items: aggregated.filter((entry) => entry.type === type).map((entry) => ({ name: entry.name, detail: historyDetailFor(entry) })),
  }));
}

export function pastVisits(history) {
  return history.visits.map((visitItem) => {
    const p = visitItem.payload;
    const hasDigitalContent = p.symptoms.length || p.examinations.length || p.diagnosis.length || p.medications.length;
    const digitalRx = hasDigitalContent
      ? {
          symptoms: p.symptoms.map((s) => ({ label: s.name, detail: valueDetail([s.duration, s.severity, s.notes]) })),
          examinations: p.examinations.map((e) => ({ label: e.name, detail: valueDetail([e.notes]) })),
          diagnoses: p.diagnosis.map((d) => ({ label: d.name, detail: valueDetail([d.since, d.status, d.notes]) })),
          medications: p.medications.map((m) => ({ label: m.name, detail: valueDetail([m.dosage, m.frequency, m.schedule, m.duration, m.notes, m.quantity]) })),
          advice: p.advice.join(" "),
          followUp: p.followUp ? `After ${p.followUp}` : "",
          labInvestigations: p.labInvestigation.map((li) => li.name).filter(Boolean),
          additionalNotes: p.others.join(" "),
        }
      : undefined;

    return { id: visitItem.id, dateLabel: visitItem.dateLabel, digitalRx, writtenRx: visitItem.attachments || [] };
  });
}

const LAB_BASE_ROWS = [
  { label: "Haemoglobin", unit: "(g/dL)", value: "11.2" },
  { label: "Neutrophils", unit: "(%)", value: "62" },
  { label: "WBC Count", unit: "(cells/mm³)", value: "7800" },
  { label: "TSH", unit: "(mIU/L)", value: "5.2", abnormal: true, direction: "high" },
  { label: "T3", unit: "(ng/dL)", value: "102" },
  { label: "Iron, Serum", unit: "(µg/dL)", value: "76" },
  { label: "UIBC", unit: "(µg/dL)", value: "365", abnormal: true, direction: "high" },
  { label: "TIBC", unit: "(µg/dL)", value: "441" },
  { label: "Vitamin D", unit: "(ng/mL)", value: "20", abnormal: true, direction: "low" },
  { label: "Calcium, Total", unit: "(mg/dL)", value: "9.4" },
  { label: "Phosphorus", unit: "(mg/dL)", value: "4.0" },
  { label: "Magnesium", unit: "(mg/dL)", value: "2.2" },
  { label: "Cholesterol, Total", unit: "(mg/dL)", value: "220", abnormal: true, direction: "high" },
  { label: "Triglycerides", unit: "(mg/dL)", value: "150" },
  { label: "HDL", unit: "(mg/dL)", value: "45", abnormal: true, direction: "low" },
  { label: "LDL", unit: "(mg/dL)", value: "130", abnormal: true, direction: "high" },
  { label: "Glucose", unit: "(mg/dL)", value: "116", abnormal: true, direction: "high" },
];

export const LAB_RESULT_ENTRIES = [
  { id: "l-27", dateLabel: "27 Jan'26", rows: LAB_BASE_ROWS },
  {
    id: "l-26",
    dateLabel: "26 Jan'26",
    rows: LAB_BASE_ROWS.map((row, i) =>
      i % 4 === 0 ? { ...row, value: (parseFloat(row.value) * 0.98).toFixed(1) } : row
    ),
  },
  {
    id: "l-24",
    dateLabel: "24 Jan'26",
    rows: LAB_BASE_ROWS.map((row, i) =>
      i % 5 === 0 ? { ...row, value: (parseFloat(row.value) * 1.02).toFixed(1) } : row
    ),
  },
  {
    id: "l-22",
    dateLabel: "22 Jan'26",
    rows: LAB_BASE_ROWS.map((row, i) =>
      i % 3 === 0 ? { ...row, value: (parseFloat(row.value) * 1.01).toFixed(1) } : row
    ),
  },
  {
    id: "l-20",
    dateLabel: "20 Jan'26",
    rows: LAB_BASE_ROWS.map((row, i) =>
      i % 6 === 0 ? { ...row, value: (parseFloat(row.value) * 0.97).toFixed(1) } : row
    ),
  },
];

export const GYNEC_SECTIONS = [
  { id: "lmp", title: "LMP", lines: ["LMP: 15 Feb'26"] },
  { id: "menarche", title: "Menarche", lines: ["Age at: 13 years"] },
  { id: "cycle", title: "Cycle", lines: ["Type: Irregular | Interval: 35-40 days"] },
  { id: "flow", title: "Flow", lines: ["Volume: Heavy | Duration: 5 days | Clots: Yes | Pads/day: 5"] },
  { id: "pain", title: "Pain", lines: ["Severity: None | Occurrence: Before Menses"] },
  { id: "notes", title: "Notes", lines: ["Patient reports good medication adherence and tracks cycles on mobile app."] },
];

export const OBSTETRIC_SECTIONS = [
  { id: "patientInfo", title: "Patient Info", lines: ["LMP: 14 Jan'26 | EDD: 21 Oct'26 | C.E.D.D: 25 Oct'26", "Gestation: 14 Weeks 2 Days | Patient Blood Group: B+ve | Husband's Blood Group: O+ve"] },
  { id: "gplae", title: "GPLAE", lines: ["G: 1 | P: 0 | L: 0 | A: 0 | E: 0", "Primigravida"] },
  { id: "pregnancy", title: "Pregnancy History", lines: ["Gravida no: 1 | Mode of Delivery: LSCS | Date of Delivery: 14 Nov'24 | Gender: Male | Baby's Weight: 3.2 Kgs"] },
  { id: "examination", title: "Current Examination", lines: ["17 Jan'26 | Pallor: Absent | Oedema: Mild | BMI: 23 Kg/m2 | BP: 128/82 mmHg | FHR: 142 bpm"] },
  { id: "anc", title: "ANC Scheduler", lines: ["Complete Blood Count | Week Range: 8-12 Weeks | Due Date: 11 Mar'26 | Status: Done", "Glucose Tolerance Test | Week Range: 24-28 Weeks | Due Date: 08 Jul'26 | Status: Due"] },
  { id: "immunisation", title: "Immunisation History", lines: ["Tetanus Toxoid (TT-1) | Status: Done | Given Date: 20 Feb'26", "Tetanus Toxoid (TT-2) | Status: Due"] },
];

export const PENDING_VACCINES = [
  { week: "12-18 Weeks", name: "HPV 1", dueDate: "2025-12-30", notes: "" },
  { week: "13 Weeks", name: "PPSV23", dueDate: "2025-09-12", notes: "Discuss with parents first" },
  { week: "18 Weeks", name: "Tdap Booster", dueDate: "2026-02-12", notes: "" },
  { week: "20 Weeks", name: "Influenza", dueDate: "2026-04-10", notes: "Seasonal - confirm stock" },
  { week: "24 Weeks", name: "Hepatitis A", dueDate: "2026-09-08", notes: "" },
  { week: "24 Weeks", name: "Varicella", dueDate: "2026-09-08", notes: "Confirm parental consent" },
  { week: "30 Weeks", name: "MMR Booster", dueDate: "2026-11-22", notes: "" },
  { week: "36 Weeks", name: "Meningococcal", dueDate: "2027-01-15", notes: "Annual review" },
];

export const GIVEN_VACCINES = [
  { week: "Birth", name: "IPV B-1", givenDate: "14 Jan'25", brand: "Pneumovax 23 Vaccine", dueDate: "14 Jan'26", notes: "" },
  { week: "6 Weeks", name: "DTP B1", givenDate: "14 Jan'25", brand: "Pneumovax 23 Vaccine", dueDate: "14 Jan'26", notes: "Mild fever next day" },
  { week: "6 Weeks", name: "Hib B1", givenDate: "14 Jan'25", brand: "Pneumovax 23 Vaccine", dueDate: "14 Jan'26", notes: "" },
  { week: "10 Weeks", name: "HEP A-2", givenDate: "14 Jan'25", brand: "Pneumovax 23 Vaccine", dueDate: "14 Jan'26", notes: "" },
  { week: "10 Weeks", name: "PPSV 23", givenDate: "14 Jan'25", brand: "Pneumovax 23 Vaccine", dueDate: "14 Jan'26", notes: "" },
  { week: "2-3 years", name: "PPSV 23", givenDate: "14 Jan'25", brand: "Pneumovax 23 Vaccine", dueDate: "14 Jan'26", notes: "Booster" },
];

export const GROWTH_PATIENT_INFO = {
  midParentalHeight: "168 cm",
  motherHeight: "162 cm",
  fatherHeight: "176 cm",
  gestationPeriod: "39 weeks",
  ageMonths: 34,
};

export const GROWTH_ENTRIES = [
  { id: "g-27", dateLabel: "27 Jan'26", rows: [{ label: "Height", value: "172 cms" }, { label: "Weight", value: "68 kgs" }, { label: "BMI", value: "23.0 kg/m2" }] },
  { id: "g-24", dateLabel: "24 Jan'26", rows: [{ label: "Weight", value: "68.0 kgs" }, { label: "BMI", value: "22.9 kg/m2" }] },
];

export const OPHTHAL_ENTRIES = [
  {
    id: "op-27",
    dateLabel: "27 Jan'26",
    visualAcuity: {
      OD: { "UC Dist": "6/9", PH: "6/6", "C Dist": "6/6", "C Near": "N6" },
      OS: { "UC Dist": "6/12", PH: "6/9", "C Dist": "6/9", "C Near": "N8" },
    },
    iop: {
      OD: { NCT: "12 mmhg", GAT: "14 mmhg" },
      OS: { NCT: "13 mmhg", GAT: "15 mmhg" },
    },
    slitLamp: [
      { name: "Lids/Lacrimal Apparatus", OD: "Normal", OS: "Normal" },
      { name: "Cornea", OD: "Clear", OS: "Clear" },
    ],
    fundus: [{ name: "Disc", OD: "WNL", OS: "WNL" }],
  },
  {
    id: "op-15",
    dateLabel: "15 Jan'26",
    visualAcuity: {
      OD: { "UC Dist": "6/120", "UC Near": "N5", PH: "6/12", "C Dist": "6/9", "C Near": "N6" },
      OS: { "UC Dist": "6/120", "UC Near": "N5", PH: "6/12", "C Dist": "6/9", "C Near": "N6" },
    },
    iop: {
      OD: { NCT: "1 mmhg", GAT: "3 mmhg" },
      OS: { NCT: "1 mmhg", GAT: "3 mmhg" },
    },
    slitLamp: [
      { name: "Lids/Lacrimal Apparatus", OD: "Normal", OS: "Blepharitis" },
      { name: "Conjuctiva/Sclera", OD: "Congestion / Hyperemia", OS: "NIL" },
      { name: "Cornea", OD: "Corneal Edema", OS: "NIL" },
    ],
    fundus: [
      { name: "Disc", OD: "Vitreous Floaters", OS: "Vitreous Floaters" },
      { name: "Macula", OD: "Macular Scar", OS: "NIL" },
    ],
  },
];

export const MEDICAL_RECORDS = [
  { id: "rec-1", imgType: "pathology-img", label: "Pathology", date: "10 Aug'26", filterType: "Pathology" },
  { id: "rec-2", imgType: "prescription-img", label: "Prescription", date: "10 Aug'26", filterType: "Prescription" },
  { id: "rec-3", imgType: "pdf", label: "Prescription", date: "10 Aug'26", filterType: "Prescription" },
  { id: "rec-4", imgType: "pathology-img", label: "Pathology", date: "27 Jan'26", filterType: "Pathology" },
  { id: "rec-5", imgType: "radiology-pdf", label: "Radiology", date: "24 Jan'26", filterType: "Radiology" },
];

export const PRIVATE_NOTES = [
  "Patient prefers morning appointments.",
  "Discuss work-shift diet irregularity in next follow-up.",
  "Family member usually accompanies patient for lab reports.",
];
