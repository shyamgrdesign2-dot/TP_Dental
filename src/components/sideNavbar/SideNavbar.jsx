import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useVirtualizer } from "@tanstack/react-virtual";
import moment from "moment";
import axios from "axios";
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
  More,
  Note1,
  Printer,
  Ruler,
  SidebarLeft,
} from "iconsax-reactjs";
import { VoiceRxIcon } from "../dr-agent/voicerx/voice-consult-icons";
import { VoiceRecorderCore } from "../dr-agent/voicerx/VoiceRecorderCore";
import RecordCard from "../../pages/medicalRecords/components/recordCard/RecordCard";
import CashManagerContext from "../../context/CashManagerContext";
import { useAccess } from "../../pages/vaccination/useAccess";
import { getOverridenDueDate, getPatientVaccineDetails, getVaccineBrands, getVaccineTemplates } from "../../pages/vaccination/service";
import { mergeDataPatientDetails } from "../../pages/vaccination/VaccinationHelper";
import { getAllOpthalPrescriptions } from "../../pages/ophthalmology/service";
import { getAllGrowthChartParams, getParentalDetails } from "../../pages/growthChart/service";
import { getMidParentalHeight } from "../../pages/growthChart/growthChartHelper";
import ApiCaseManager from "../../api/services/ApiCaseManager";
import { usePrintPayloadPdf } from "../../hooks/usePrintPayloadPdf";
import { ASSETS } from "../../assets";
import { buildClinicalApiHeaders, joinAgentModuleApiUrl } from "../dr-agent/voicerx/api/clinical-api";
import { useRxPadSync } from "../dr-agent/rxpad/dr-agent/RxPadSyncContext";
import { toast } from "../dr-agent/voicerx/toast";
import { useEdgeSwipeNavigation } from "./useEdgeSwipeNavigation";
import {
  findMatchingMedicalHistoryTag,
  mergeMedicalHistoryTagsBySection,
  tagsAreDuplicateForHistoryMerge,
} from "../../utils/medicalHistoryUtils";
import { listSectionwithTag } from "../../redux/medicalhistorySlice";
import { SIDE_NAVBAR_DIGITIZATION_RESPONSE_CONTRACT } from "./mock/sideNavbarDigitizationContract";
import "./sideNavbar.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Legend, Filler);

const LEGACY_VITALS_DATE_FORMAT = "DD MMM, YY";

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

const NAV_ITEM_BY_ID = NAV_ITEMS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
const SIDE_NAV_BATCH_SIZE = 3;

function getCustomizedPadNavId(item, access = {}) {
  if (!item || item.tmdpm_status !== 0) return null;

  switch (Number(item.tmdpm_id)) {
    case 1:
      return "vitals";
    case 3:
      return access.isGynaecHistoryAccessable ? "gynec" : "history";
    case 7:
      return access.isVaccinationAccessable ? "vaccine" : null;
    case 8:
      return "personalNotes";
    case 16:
      return access.isGrowthChartAccessable ? "growth" : null;
    case 17:
      return access.isGynaecHistoryAccessable ? "obstetric" : null;
    case 18:
      return "medicalRecords";
    case 19:
      return "labResults";
    default:
      return null;
  }
}

const SECTION_TITLES = {
  pastVisits: "Past Visit",
  vitals: "Vitals and Body Composition",
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

const SIDE_NAV_MODULE_NAMES = {
  vitals: "vitals_body",
  history: "medical_history",
  labResults: "lab_investigations",
};

const SIDE_NAV_SUPPORTED_VOICE_SECTIONS = new Set(Object.keys(SIDE_NAV_MODULE_NAMES));
const SIDE_NAV_MODULE_ENDPOINT = "/agents/module";
const SIDE_NAV_SHINER_DELAY_MS = 5000;
const SIDE_NAV_MODULE_TIMEOUT_MS = 120000;

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

function legacyVitalHasValue(value) {
  return value !== undefined && value !== null && value !== "";
}

function formatLegacyVitalDate(date) {
  if (!date) return "Current Visit";
  const parsed = moment(date);
  return parsed.isValid() ? parsed.format(LEGACY_VITALS_DATE_FORMAT) : String(date);
}

function formatOpthalDate(date) {
  if (!date) return "Consultation";
  const parsed = moment(date);
  return parsed.isValid() ? parsed.format("DD MMM'YY") : String(date);
}

function parsePatientDobForGrowth(patientData) {
  const candidates = [
    patientData?.pm_dob,
    patientData?.patient_dob,
    patientData?.DOB,
    patientData?.dob,
  ].filter(Boolean);
  const formats = ["YYYY-MM-DD", "DD/MM/YYYY", "Do MMMM YYYY", "DD-MM-YYYY", moment.ISO_8601];
  for (const value of candidates) {
    const parsed = moment(value, formats, true);
    if (parsed.isValid()) return parsed;
    const loose = moment(value);
    if (loose.isValid()) return loose;
  }
  return null;
}

function parsePatientDobForVaccines(patientData) {
  const candidates = [
    patientData?.vac_dob,
    patientData?.pm_dob,
    patientData?.patient_dob,
    patientData?.DOB,
    patientData?.dob,
  ].filter(Boolean);
  const formats = ["DD-MMM-YYYY", "Do MMMM YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "DD-MM-YYYY", moment.ISO_8601];
  for (const value of candidates) {
    const parsed = moment(value, formats, true);
    if (parsed.isValid()) return parsed.toDate();
    const loose = moment(value);
    if (loose.isValid()) return loose.toDate();
  }
  return "";
}

function formatFixedVitalValue(value) {
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? String(value) : parsed.toFixed(2);
}

function addLegacyVitalRow(rows, item, key, label, unit, formatter) {
  const value = item?.[key];
  if (!legacyVitalHasValue(value)) return;
  rows.push({
    label,
    unit,
    value: formatter ? formatter(value) : String(value),
  });
}

function addLegacyBloodPressureRows(rows, item) {
  const bloodPressure = item?.blood_press;
  if (!legacyVitalHasValue(bloodPressure)) return;
  const [systolic, diastolic] = String(bloodPressure).split("/");
  if (legacyVitalHasValue(systolic)) {
    rows.push({ label: "Systolic", unit: "mmHg", value: systolic });
  }
  if (legacyVitalHasValue(diastolic)) {
    rows.push({ label: "Diastolic", unit: "mmHg", value: diastolic });
  }
}

function addLegacyPediatricVitals(rows, item) {
  addLegacyVitalRow(rows, item, "weight", "Weight", "kgs");
  addLegacyVitalRow(rows, item, "height", "Height", "cms");
  addLegacyVitalRow(rows, item, "ofc", "OFC", "cms");
}

function addLegacyAdultVitals(rows, item) {
  addLegacyVitalRow(rows, item, "ofc", "OFC", "cms");
  addLegacyVitalRow(rows, item, "height", "Height", "cms");
  addLegacyVitalRow(rows, item, "weight", "Weight", "kgs");
}

function buildLegacyVitalRows(item, isPediatricAccessable) {
  const rows = [];

  if (isPediatricAccessable) addLegacyPediatricVitals(rows, item);

  addLegacyVitalRow(rows, item, "temp", "Temperature", "Frh");
  addLegacyVitalRow(rows, item, "pres", "Pulse", "/min");
  addLegacyVitalRow(rows, item, "resp_rate", "Resp. Rate", "/min");
  addLegacyBloodPressureRows(rows, item);
  addLegacyVitalRow(rows, item, "spo2", "SPO2", "%");
  addLegacyVitalRow(rows, item, "general_rbs", "General RBS", "mg/dl");
  addLegacyVitalRow(rows, item, "fib4", "FIB4", "");
  addLegacyVitalRow(rows, item, "waist_circumference", "Waist Circumference", "cms");

  if (!isPediatricAccessable) addLegacyAdultVitals(rows, item);

  addLegacyVitalRow(rows, item, "bmi", "BMI", "kg/m²", formatFixedVitalValue);
  addLegacyVitalRow(rows, item, "bmr", "BMR", "kcals", formatFixedVitalValue);
  addLegacyVitalRow(rows, item, "bsa", "BSA", "m²", formatFixedVitalValue);

  return rows;
}

function buildLegacyVitalsEntries({
  vitalsData = [],
  vitalsPastList = [],
  patientBirthWeight,
  patientData,
  isPediatricAccessable,
}) {
  const entries = [];
  const birthWeight = vitalsData?.[0]?.patient_birth_weight || patientBirthWeight;

  if (
    patientData?.ageMonths <= 12 &&
    patientData?.ageYears === 0 &&
    legacyVitalHasValue(birthWeight)
  ) {
    entries.push({
      id: "legacy-vitals-birth-weight",
      dateLabel: "Birth Weight",
      rows: [{ label: "Patient Birth weight", unit: "kgs", value: String(birthWeight) }],
    });
  }

  vitalsData.forEach((item, index) => {
    const rows = buildLegacyVitalRows(item, isPediatricAccessable);
    if (!rows.length) return;
    entries.push({
      id: `legacy-vitals-today-${item?.tcv_id || item?.tcbc_id || item?.dev_unique_id || item?.date || index}`,
      dateLabel: formatLegacyVitalDate(item?.date),
      rows,
    });
  });

  vitalsPastList.forEach((item, index) => {
    const rows = buildLegacyVitalRows(item, isPediatricAccessable);
    if (!rows.length) return;
    entries.push({
      id: `legacy-vitals-past-${item?.tcv_id || item?.tcbc_id || item?.dev_unique_id || item?.date || index}`,
      dateLabel: formatLegacyVitalDate(item?.date),
      rows,
    });
  });

  return entries;
}

function legacyHistoryHasValue(value) {
  return value !== undefined && value !== null && value !== "";
}

function legacyHistoryEnableState(value) {
  const key = String(value || "").trim().toLowerCase();
  if (!key) return "";
  if (["y", "yes", "true", "active", "inactive", "present", "positive"].includes(key)) return "Y";
  if (["n", "no", "false", "absent", "negative"].includes(key)) return "N";
  return value;
}

function legacyHistoryStatus(sectionId, tag) {
  if (legacyHistoryHasValue(tag?.status)) return tag.status;
  if (sectionId === 3 || sectionId === 5) return "";
  const key = String(tag?.enable || "").trim().toLowerCase();
  if (key === "active") return "Active";
  if (key === "inactive") return "Inactive";
  return "";
}

function legacyHistoryDetailParts(sectionId, tag) {
  const parts = [];

  if (sectionId !== 5 && legacyHistoryHasValue(tag?.since)) {
    parts.push(`Since: ${tag.since}`);
  }
  if (sectionId === 5 && legacyHistoryHasValue(tag?.date)) {
    parts.push(`Date of Surgery: ${tag.date}`);
  }
  if (sectionId !== 3 && sectionId !== 5) {
    const status = legacyHistoryStatus(sectionId, tag);
    if (legacyHistoryHasValue(status)) parts.push(`Status: ${status}`);
    if (legacyHistoryHasValue(tag?.medication)) parts.push(`Medication: ${tag.medication}`);
  }
  if (sectionId === 3 && legacyHistoryHasValue(tag?.relationship)) {
    parts.push(`Relationship: ${tag.relationship}`);
  }
  if (legacyHistoryHasValue(tag?.note)) {
    parts.push(`${sectionId === 5 ? "Remarks" : "Note"}: ${tag.note}`);
  }
  if (legacyHistoryHasValue(tag?.medical_history_remarks)) {
    parts.push(`Additional History: ${tag.medical_history_remarks}`);
  }

  return parts;
}

function buildLegacyMedicalHistorySections(medicalHistoryData = []) {
  const sections = [];

  medicalHistoryData.forEach((section, index) => {
    const tags = Array.isArray(section?.tags) ? section.tags : [];
    if (!section?.no_know_history && tags.length === 0) return;

    const sectionId = section?.tmmhs_id;
    const enabledItems = tags
      .filter((tag) => {
        const enableState = legacyHistoryEnableState(tag?.enable);
        return enableState === "Y" || (enableState !== "N" && legacyHistoryDetailParts(sectionId, tag).length > 0);
      })
      .map((tag, tagIndex) => {
        const detail = legacyHistoryDetailParts(sectionId, tag).join(" | ");
        return {
          id: `legacy-history-${index}-enabled-${tagIndex}`,
          name: tag?.title || "",
          detail,
        };
      });
    const disabledItems = tags
      .filter((tag) => legacyHistoryEnableState(tag?.enable) === "N")
      .map((tag, tagIndex) => ({
        id: `legacy-history-${index}-disabled-${tagIndex}`,
        name: `No ${tag?.title || ""}`,
      }));
    const items = section?.no_know_history
      ? [{ id: `legacy-history-${index}-none`, name: "No known history" }]
      : [...enabledItems, ...disabledItems];

    sections.push({
      id: `legacy-history-section-${section?.tmmhs_id || index}`,
      title: section?.title || "Medical History",
      items,
    });
  });

  if (legacyHistoryHasValue(medicalHistoryData?.[0]?.medical_history_remarks)) {
    sections.push({
      id: "legacy-history-additional",
      title: "Additional History",
      items: [{ id: "legacy-history-additional-remarks", name: medicalHistoryData[0].medical_history_remarks }],
    });
  }

  return sections;
}

const CATEGORY_TO_FILTER = {
  Pathology: "Pathology",
  Radiology: "Radiology",
  Prescription: "Prescription",
  "Zydus Lab": "Pathology",
  "Zydus Radio": "Radiology",
};

const CATEGORY_TO_IMG_TYPE = {
  Pathology: "pathology-img",
  Radiology: "radiology-pdf",
  Prescription: "prescription-img",
  "Zydus Lab": "pathology-img",
  "Zydus Radio": "radiology-pdf",
};

function resolveCategoryName(categoryId, uploadDocCategories = []) {
  if (categoryId === -2) return "Zydus Lab";
  if (categoryId === -3) return "Zydus Radio";
  return uploadDocCategories.find((c) => c.category_id === categoryId)?.category_name || "Other";
}

function buildLegacyMedicalRecords(allUploadedDocs = [], uploadDocCategories = []) {
  return allUploadedDocs.map((doc, index) => {
    const categoryName = resolveCategoryName(doc.category_id, uploadDocCategories);
    const isPdf = doc.url?.toLowerCase().includes(".pdf");
    const imgType = isPdf && CATEGORY_TO_IMG_TYPE[categoryName] === "prescription-img"
      ? "pdf"
      : CATEGORY_TO_IMG_TYPE[categoryName] || "pdf";
    const dateFormatted = doc.investigation_date
      ? moment(doc.investigation_date).format("DD MMM'YY")
      : "";
    return {
      id: doc.id ? String(doc.id) : `legacy-rec-${index}`,
      label: doc.display_name || categoryName,
      date: dateFormatted,
      filterType: CATEGORY_TO_FILTER[categoryName] || "Other",
      imgType,
      thumbnailUrl: doc.thumbnail_url || (!isPdf ? doc.url : null),
      fileUrl: doc.url || null,
      categoryName,
    };
  });
}

function extractLabNumericValue(raw) {
  if (!raw && raw !== 0) return "--";
  const str = String(raw).trim();
  const match = str.match(/[\d]+(?:[.,]\d+)?/);
  return match ? match[0] : str;
}

function buildLegacyLabEntries(labParamsData = []) {
  const sorted = [...labParamsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  return sorted.reduce((entries, entry) => {
    const rows = (entry.inputs || [])
      .filter((input) => input.testName && input.testName !== "Remarks")
      .map((input) => ({
        label: input.testName,
        unit: input.units ? `(${input.units})` : "",
        value: extractLabNumericValue(input.value),
        abnormal: Boolean(input.arrowDirection),
        direction: input.arrowDirection === "up" ? "high" : input.arrowDirection === "down" ? "low" : undefined,
      }));
    if (!rows.length) return entries;
    entries.push({
      id: `legacy-lab-${entry.date || entries.length}`,
      dateLabel: formatLegacyVitalDate(entry.date),
      rows,
    });
    return entries;
  }, []);
}

function legacyArray(value) {
  return Array.isArray(value) ? value : [];
}

function firstLegacyText(item, keys) {
  if (typeof item === "string") return item;
  const key = keys.find((candidate) => hasValue(item?.[candidate]));
  return key ? String(item[key]) : "";
}

function legacyDetail(item, keys) {
  if (!item || typeof item === "string") return "";
  return keys
    .map((key) => item?.[key])
    .filter(hasValue)
    .map((value) => String(value))
    .join(" | ");
}

function legacyVisitRows(items, labelKeys, detailKeys) {
  return legacyArray(items)
    .map((item) => ({
      label: firstLegacyText(item, labelKeys),
      detail: legacyDetail(item, detailKeys),
    }))
    .filter((item) => item.label);
}

function buildPastVisitMedicalHistoryRows(items) {
  return legacyArray(items).flatMap((section) => {
    const sectionTitle = firstLegacyText(section, ["title", "name", "label"]);
    return legacyArray(section?.tags)
      .filter((tag) => tag?.enable !== "N")
      .map((tag) => {
        const detail = [
          tag?.since,
          tag?.MonthYear,
          tag?.relationship && `Relationship: ${tag.relationship}`,
          tag?.status,
          tag?.medication,
          tag?.note,
        ].filter(hasValue).join(" | ");
        return {
          label: tag?.title || tag?.name || sectionTitle,
          detail: [sectionTitle, detail].filter(Boolean).join(" - "),
        };
      });
  }).filter((item) => item.label);
}

function buildPastVisitModuleRows(items) {
  return legacyArray(items).flatMap((module) => (
    legacyArray(module?.content).map((content, index) => {
      const details = Object.entries(content || {})
        .filter(([, value]) => hasValue(value))
        .map(([key, value]) => `${key}: ${value}`)
        .join(" | ");
      return {
        label: module?.module_name || module?.name || `Module ${index + 1}`,
        detail: details,
      };
    })
  )).filter((item) => item.label || item.detail);
}

function legacyAdviceText(value) {
  if (typeof value === "string") return value;
  return legacyArray(value)
    .map((item) => firstLegacyText(item, ["advice", "notes", "name", "label", "title"]))
    .filter(Boolean)
    .join(" ");
}

function isValidMongoId(value) {
  return typeof value === "string" && /^[a-f\d]{24}$/i.test(value);
}

function maybeParseJsonObject(value) {
  if (isObject(value)) return value;
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value);
    return isObject(parsed) ? parsed : null;
  } catch (error) {
    return null;
  }
}

function getPastVisitSmartDigitizeData(consultation) {
  const smartData = consultation?.smartDigitizeRxData ||
    consultation?.smart_digitize_rx_data ||
    consultation?.printPayload?.smartDigitizeRxData ||
    consultation?.printPayload?.smart_digitize_rx_data ||
    consultation?.printPayload?.data?.smartDigitizeRxData ||
    consultation?.printPayload?.response?.smartDigitizeRxData ||
    null;
  return maybeParseJsonObject(smartData) || smartData;
}

function unwrapDigitizePayload(value) {
  const parsedValue = maybeParseJsonObject(value) || value;
  if (!isObject(parsedValue)) return null;
  const valueWithVoiceEdited = maybeParseJsonObject(parsedValue.voiceRxDigitizeEditedData) || parsedValue.voiceRxDigitizeEditedData;
  const candidate = parsedValue.editedData ||
    valueWithVoiceEdited ||
    parsedValue.digitizeData ||
    parsedValue.refinedData ||
    parsedValue.payload ||
    parsedValue.prescription ||
    parsedValue;
  const normalizedCandidate = maybeParseJsonObject(candidate) || candidate;
  if (!isObject(normalizedCandidate)) return null;
  const numericKeys = Object.keys(normalizedCandidate).filter((key) => /^\d+$/.test(key));
  if (numericKeys.length && isObject(normalizedCandidate[numericKeys[0]])) return normalizedCandidate[numericKeys[0]];
  return normalizedCandidate;
}

function getPastVisitSmartDigitalPayload(consultation) {
  const smartData = getPastVisitSmartDigitizeData(consultation);
  if (!isObject(smartData)) return null;
  const direct = unwrapDigitizePayload(smartData.voiceRxDigitizeEditedData);
  if (direct) return direct;
  const fallbacks = [
    smartData.editedData,
    smartData.digitizeData,
    smartData.refinedData,
    smartData.digitize,
    smartData.history?.[smartData.history.length - 1]?.digitize,
    smartData.history?.[0]?.digitize,
  ];
  return fallbacks.map(unwrapDigitizePayload).find(Boolean) || null;
}

function buildPastVisitTranscriptBlocks(consultation) {
  const smartData = getPastVisitSmartDigitizeData(consultation);
  const history = Array.isArray(smartData?.history) ? smartData.history : [];
  return history.flatMap((entry, index) => {
    const conversation = Array.isArray(entry?.conversation) ? entry.conversation : [];
    if (conversation.length) {
      return [{
        id: `conversation-${index}`,
        type: "conversation",
        items: conversation
          .map((item, itemIndex) => ({
            id: `${index}-${itemIndex}`,
            speaker: item?.speaker || item?.role || item?.type || "",
            text: item?.text || item?.message || item?.transcription || item?.content || "",
          }))
          .filter((item) => hasValue(item.text)),
      }].filter((block) => block.items.length);
    }

    const text = entry?.transcription || entry?.source || entry?.text || entry?.content || "";
    return hasValue(text) ? [{ id: `transcript-${index}`, type: "text", text: String(text) }] : [];
  });
}

function hasPastVisitTranscriptMode(consultation) {
  const smartData = getPastVisitSmartDigitizeData(consultation);
  const smartFile = consultation?.smart_prescription_filename || consultation?.smartPrescriptionFilename;
  return Boolean(smartData && (isValidMongoId(smartFile) || buildPastVisitTranscriptBlocks(consultation).length));
}

function buildPastVisitDigitalRx(consultation) {
  if (!consultation) return null;
  const smartPayload = getPastVisitSmartDigitalPayload(consultation);
  const smartRx = buildDigitalRx(smartPayload);
  if (smartRx) return smartRx;

  const digitalRx = {
    symptoms: legacyVisitRows(
      consultation.symptoms,
      ["symptom_name", "name", "title", "label"],
      ["since", "duration", "severity", "note", "notes"]
    ),
    examinations: legacyVisitRows(
      consultation.examination,
      ["examination_name", "name", "title", "label"],
      ["note", "notes"]
    ),
    diagnoses: legacyVisitRows(
      consultation.diagnosis,
      ["tds_name", "diagnosis_name", "name", "title", "label"],
      ["since", "status", "note", "notes"]
    ),
    medications: legacyVisitRows(
      consultation.medicine,
      ["tmm_medicine_name", "medicine_name", "name", "title", "label"],
      ["tmm_dosage_unit_name", "dosage", "tmm_freq_type_name", "frequency", "tmm_time_name", "schedule", "tmm_days_duration_type", "duration", "tmm_remarks", "notes", "quantity"]
    ),
    medicalHistory: buildPastVisitMedicalHistoryRows(consultation.medical_history || consultation.medicalHistory),
    surgeries: legacyVisitRows(
      consultation.surgeries,
      ["surgery_name", "name", "title", "label"],
      ["notes", "note", "date", "since"]
    ),
    moduleContents: buildPastVisitModuleRows(consultation.moduleContents || consultation.module_contents),
    advice: legacyAdviceText(consultation.advice) || consultation.visit_advice || "",
    labInvestigations: legacyVisitRows(
      consultation.investigation || consultation.investigations,
      ["investigation_name", "test_name", "name", "title", "label"],
      ["note", "notes"]
    ).map((item) => (item.detail ? { label: item.label, detail: item.detail } : item.label)),
    followUp: consultation.follow_up_date ? `On ${formatPastVisitDate(consultation.follow_up_date)}` : "",
    additionalNotes: consultation.additional_notes || consultation.additionalNotes || consultation.notes || "",
  };
  const hasDigitalRx = digitalRx.symptoms.length ||
    digitalRx.examinations.length ||
    digitalRx.diagnoses.length ||
    digitalRx.medications.length ||
    digitalRx.medicalHistory.length ||
    digitalRx.surgeries.length ||
    digitalRx.moduleContents.length ||
    digitalRx.advice ||
    digitalRx.labInvestigations.length ||
    digitalRx.followUp ||
    digitalRx.additionalNotes;
  return hasDigitalRx ? digitalRx : null;
}

function formatPastVisitDate(date) {
  if (!date) return "Consultation";
  const parsed = moment(date);
  return parsed.isValid() ? parsed.format("DD MMM'YY") : String(date);
}

function getPastVisitDate(consultation, detail) {
  return consultation?.consultation_date ||
    consultation?.tcm_consultation_date ||
    consultation?.tcm_created_date ||
    consultation?.created_date ||
    consultation?.createdAt ||
    consultation?.created_at ||
    consultation?.date ||
    detail?.consultation_date ||
    detail?.tcm_consultation_date ||
    detail?.tcm_created_date ||
    detail?.created_date ||
    detail?.createdAt ||
    detail?.created_at ||
    detail?.date;
}

function buildPastVisitEntry(consultation, detail) {
  const tcmId = consultation?.tcm_id || consultation?.tcmId || detail?.tcm_id;
  const consultationDate = getPastVisitDate(consultation, detail);
  const detailRx = buildPastVisitDigitalRx(detail || consultation);
  const printUrl = detail?.print_url || consultation?.print_url || "";
  const transcriptSource = detail || consultation;
  const transcriptBlocks = buildPastVisitTranscriptBlocks(transcriptSource);
  const showTranscript = hasPastVisitTranscriptMode(transcriptSource);
  return {
    id: `past-visit-${tcmId || consultationDate}`,
    tcmId,
    dateLabel: formatPastVisitDate(consultationDate),
    digitalRx: detailRx,
    hasTranscript: showTranscript,
    transcriptBlocks,
    writtenRx: printUrl ? [{ id: `written-rx-${tcmId || consultationDate}`, printUrl, doctorName: detail?.doctor_data?.doctor_name || consultation?.doctor_name || "", speciality: detail?.doctor_data?.dp_name || consultation?.dp_name || "" }] : [],
    detailLoaded: Boolean(detail),
    detailLoading: Boolean(consultation?.detailLoading) && !detailRx && !printUrl && !transcriptBlocks.length,
  };
}

function pastVisitRowText(item) {
  if (typeof item === "string") return { label: item, detail: "" };
  return {
    label: String(item?.label || item?.name || item?.title || "").trim(),
    detail: String(item?.detail || item?.notes || item?.note || "").trim(),
  };
}

function pastVisitRows(items) {
  return toArray(items)
    .map(pastVisitRowText)
    .filter((item) => item.label || item.detail);
}

function pastVisitMedicalHistoryType(detail) {
  const text = String(detail || "").trim();
  if (!text) return "Medical Condition";
  const type = text.split(" - ")[0]?.trim();
  return type || "Medical Condition";
}

function buildPastVisitSectionPayload(visitItem, sectionKey) {
  const rx = visitItem?.digitalRx;
  if (!rx) return null;
  const base = {
    sourceDateLabel: visitItem.dateLabel || "Past visit",
    targetSection: "rxpad",
  };

  switch (sectionKey) {
    case "symptoms": {
      const rows = pastVisitRows(rx.symptoms).map((item) => ({
        symptom_name: item.label,
        note: item.detail,
      }));
      return rows.length ? { ...base, digitization: { symptoms: rows } } : null;
    }
    case "examinations": {
      const rows = pastVisitRows(rx.examinations).map((item) => ({
        examination_name: item.label,
        note: item.detail,
      }));
      return rows.length ? { ...base, digitization: { examinations: rows } } : null;
    }
    case "diagnosis": {
      const rows = pastVisitRows(rx.diagnoses).map((item) => ({
        tds_name: item.label,
        note: item.detail,
      }));
      return rows.length ? { ...base, digitization: { diagnosis: rows } } : null;
    }
    case "medications": {
      const rows = pastVisitRows(rx.medications).map((item) => ({
        tmm_medicine_name: item.label,
        notes: item.detail,
      }));
      return rows.length ? { ...base, digitization: { medications: rows } } : null;
    }
    case "medicalHistory": {
      const rows = pastVisitRows(rx.medicalHistory).map((item) => ({
        name: item.label,
        type: pastVisitMedicalHistoryType(item.detail),
        notes: item.detail.includes(" - ") ? item.detail.split(" - ").slice(1).join(" - ") : "",
      }));
      return rows.length ? { ...base, digitization: { medical_history: rows } } : null;
    }
    case "surgeries": {
      const rows = pastVisitRows(rx.surgeries).map((item) => ({
        name: item.label,
        notes: item.detail,
      }));
      return rows.length ? { ...base, digitization: { surgeries: rows } } : null;
    }
    case "advice":
      return rx.advice ? { ...base, digitization: { advice: [rx.advice] } } : null;
    case "investigations": {
      const rows = pastVisitRows(rx.labInvestigations).map((item) => ({
        investigation_name: item.label,
        note: item.detail,
      }));
      return rows.length ? { ...base, digitization: { lab_investigation: rows } } : null;
    }
    case "additionalNotes":
      return rx.additionalNotes ? { ...base, digitization: { others: [rx.additionalNotes] } } : null;
    case "followUp":
      return rx.followUp ? { ...base, digitization: { follow_up: [rx.followUp] } } : null;
    case "moduleContents": {
      const notes = pastVisitRows(rx.moduleContents)
        .map((item) => [item.label, item.detail ? `(${item.detail})` : ""].filter(Boolean).join(" "))
        .filter(Boolean);
      return notes.length ? { ...base, digitization: { others: notes } } : null;
    }
    default:
      return null;
  }
}

function buildPastVisitAllPayload(visitItem) {
  const payloads = [
    "symptoms",
    "examinations",
    "diagnosis",
    "medications",
    "medicalHistory",
    "surgeries",
    "advice",
    "investigations",
    "additionalNotes",
    "followUp",
    "moduleContents",
  ].map((sectionKey) => buildPastVisitSectionPayload(visitItem, sectionKey)).filter(Boolean);
  if (!payloads.length) return null;
  return payloads.reduce((acc, payload) => ({
    ...acc,
    digitization: Object.entries(payload.digitization || {}).reduce((digitizationAcc, [key, value]) => {
      const prevValue = digitizationAcc[key];
      if (Array.isArray(prevValue) || Array.isArray(value)) {
        return {
          ...digitizationAcc,
          [key]: [...toArray(prevValue), ...toArray(value)],
        };
      }
      return { ...digitizationAcc, [key]: value };
    }, acc.digitization),
  }), {
    sourceDateLabel: visitItem.dateLabel || "Past visit",
    targetSection: "rxpad",
    digitization: {},
  });
}

function shouldUseVoiceRxPrintPayload(detail) {
  const smartFile = detail?.smart_prescription_filename || detail?.smartPrescriptionFilename;
  return isValidMongoId(smartFile) &&
    !String(smartFile).includes(".jpeg") &&
    !String(smartFile).includes("snap_rx") &&
    !String(smartFile).includes("tab_rx");
}

function buildPastVisitPrintPayloadUrl(printUrl, detail) {
  if (!printUrl) return null;
  try {
    const url = new URL(printUrl, window.location.origin);
    if (shouldUseVoiceRxPrintPayload(detail)) {
      url.searchParams.delete("ambientVoiceRxDigitize");
      url.searchParams.set("voiceRxDigitize", "true");
      url.searchParams.set("rxDigitize", "false");
    }
    if (!url.searchParams.get("lg")) {
      url.searchParams.set("lg", btoa("1"));
    }
    url.searchParams.set("output", "json");
    return url.toString();
  } catch (error) {
    const separator = printUrl.includes("?") ? "&" : "?";
    return `${printUrl}${separator}output=json`;
  }
}

async function fetchPastVisitPrintPayload(printUrl, detail) {
  const fetchUrl = buildPastVisitPrintPayloadUrl(printUrl, detail);
  if (!fetchUrl) return null;
  try {
    console.log("[SideNavbar][PastVisits] print payload URL:", fetchUrl);
    const response = await axios.get(fetchUrl);
    return response?.data?.data || response?.data || null;
  } catch (error) {
    console.error("[SideNavbar][PastVisits] failed to fetch print JSON payload:", error);
    return null;
  }
}

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
    toArray(p.examinations || p.examination).length ||
    toArray(p.diagnosis || p.diagnoses).length ||
    toArray(p.medications || p.medicine).length ||
    toArray(p.advice).length ||
    toArray(p.labInvestigation || p.labInvestigations || p.investigation || p.investigations).length ||
    toArray(p.medicalHistory || p.medical_history).length ||
    toArray(p.surgeries).length ||
    toArray(p.moduleContents || p.module_contents).length ||
    hasValue(p.followUp);

  if (!hasContent) return null;

  return {
    symptoms: toArray(p.symptoms).map((item) => ({
      label: item?.name || item?.symptom_name || item?.lineItem || item?.label || String(item || ""),
      detail: valueText([item?.since, item?.duration, item?.severity, item?.notes, item?.note, item?.detail]),
      fresh: true,
    })),
    examinations: toArray(p.examinations || p.examination).map((item) => ({
      label: item?.name || item?.examination_name || item?.lineItem || item?.label || String(item || ""),
      detail: valueText([item?.notes, item?.note, item?.detail]),
      fresh: true,
    })),
    diagnoses: toArray(p.diagnosis || p.diagnoses).map((item) => ({
      label: item?.name || item?.tds_name || item?.diagnosis_name || item?.lineItem || item?.label || String(item || ""),
      detail: valueText([item?.since, item?.status, item?.notes, item?.note, item?.detail]),
      fresh: true,
    })),
    medications: toArray(p.medications || p.medicine).map((item) => ({
      label: item?.name || item?.medicine_name || item?.tmm_medicine_name || item?.lineItem || item?.label || String(item || ""),
      detail: valueText([item?.dosage, item?.tmm_dosage_unit_name, item?.frequency, item?.tmm_freq_type_name, item?.schedule, item?.tmm_time_name, item?.duration, item?.tmm_days_duration_type, item?.notes, item?.note, item?.quantity, item?.detail]),
      fresh: true,
    })),
    advice: toArray(p.advice).map((item) => (typeof item === "string" ? item : item?.advice_name || item?.notes || item?.note || item?.name || item?.lineItem || item?.label || "")).filter(Boolean).join(" "),
    labInvestigations: toArray(p.labInvestigation || p.labInvestigations || p.investigation || p.investigations).map((item) => (typeof item === "string" ? item : item?.investigation_name || item?.test_name || item?.name || item?.lineItem || item?.label)).filter(Boolean),
    medicalHistory: legacyVisitRows(
      p.medicalHistory || p.medical_history,
      ["name", "title", "label"],
      ["relationship", "since", "duration", "status", "medication", "notes", "note", "detail"]
    ),
    surgeries: legacyVisitRows(
      p.surgeries,
      ["surgery_name", "name", "title", "label"],
      ["notes", "note", "date", "since"]
    ),
    moduleContents: buildPastVisitModuleRows(p.moduleContents || p.module_contents),
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
  const labs = toArray(payload?.labResults || payload?.labs || payload?.lab_investigations || payload?.labInvestigations || payload);
  return labs.flatMap((item) => {
    const label = item?.testname || item?.testName || item?.investigation_name || item?.test_name || item?.name || item?.label;
    const value = item?.value || item?.result || item?.note || item?.notes || "--";
    if (!hasValue(label)) return [];
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
  if (!Object.keys(o).length) return [];
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
    {
      id: "gplae",
      title: "GPLAE",
      lines: [lineFromParts([
        hasValue(o.gravidity) && `G: ${o.gravidity}`,
        hasValue(o.parity) && `P: ${o.parity}`,
        hasValue(o.livingChildren) && `L: ${o.livingChildren}`,
        hasValue(o.abortions) && `A: ${o.abortions}`,
        hasValue(o.ectopicPregnancies) && `E: ${o.ectopicPregnancies}`,
      ])].filter(Boolean),
    },
    { id: "examination", title: "Current Examination", lines: examLines },
    { id: "anc", title: "ANC Scheduler", lines: ancLines },
    { id: "immunisation", title: "Immunisation History", lines: immunisationLines },
  ];
  return cards.filter((card) => card.lines.length).map((card) => ({ ...card, fresh: true }));
}

function joinParts(parts) {
  return parts.filter(Boolean).join(" | ");
}

function buildLegacyGynecSections(gynecHistory) {
  if (!gynecHistory || Object.keys(gynecHistory).length === 0) return [];
  const cards = [];

  if (gynecHistory.lmp) {
    cards.push({ id: "gynec-lmp", title: "LMP", lines: [`LMP: ${moment(gynecHistory.lmp).format("DD MMM'YY")}`] });
  }

  const menarcheLines = joinParts([
    gynecHistory.ageAtMenarche && `Age at: ${gynecHistory.ageAtMenarche} years`,
    gynecHistory.menarcheNotes && `Notes: ${gynecHistory.menarcheNotes}`,
  ]);
  if (menarcheLines) cards.push({ id: "gynec-menarche", title: "Menarche", lines: [menarcheLines] });

  const cycleLine = joinParts([
    gynecHistory.cycle && `Type: ${gynecHistory.cycle}`,
    gynecHistory.intervalOfCycle && `Interval: ${gynecHistory.intervalOfCycle} days`,
    gynecHistory.cycleNotes && `Note: ${gynecHistory.cycleNotes}`,
  ]);
  if (cycleLine) cards.push({ id: "gynec-cycle", title: "Cycle", lines: [cycleLine] });

  const flowLine = joinParts([
    gynecHistory.flow && `Volume: ${gynecHistory.flow}`,
    gynecHistory.durationOfMenstrualFlow && `Duration: ${gynecHistory.durationOfMenstrualFlow} days`,
    gynecHistory.clots !== undefined && gynecHistory.clots !== "" && `Clots: ${gynecHistory.clots ? "Yes" : "No"}`,
    gynecHistory.numberOfPadsPerDay && `Pads/day: ${gynecHistory.numberOfPadsPerDay}`,
    gynecHistory.flowNotes && `Notes: ${gynecHistory.flowNotes}`,
  ]);
  if (flowLine) cards.push({ id: "gynec-flow", title: "Flow", lines: [flowLine] });

  const painLine = joinParts([
    gynecHistory.pain && `Severity: ${gynecHistory.pain}`,
    gynecHistory.occurrenceOfPain && `Occurrence: ${gynecHistory.occurrenceOfPain}`,
    gynecHistory.painNotes && `Notes: ${gynecHistory.painNotes}`,
  ]);
  if (painLine) cards.push({ id: "gynec-pain", title: "Pain", lines: [painLine] });

  const hormLines = [];
  if (gynecHistory.reproductiveLifeStages) hormLines.push(`Stage: ${gynecHistory.reproductiveLifeStages}`);
  if (gynecHistory.ageAtMenopause) hormLines.push(`Age at: ${gynecHistory.ageAtMenopause} years`);
  if (gynecHistory.typeOfMenopause) hormLines.push(`Type: ${gynecHistory.typeOfMenopause}`);
  if (gynecHistory.reproductiveNotes) hormLines.push(`Notes: ${gynecHistory.reproductiveNotes}`);
  if (hormLines.length) cards.push({ id: "gynec-hormonal", title: "Lifecycle Hormonal Changes", lines: hormLines });

  if (gynecHistory.notes) cards.push({ id: "gynec-notes", title: "Notes", lines: [gynecHistory.notes] });

  return cards;
}

function buildLegacyObstetricSections(obstetricDetails) {
  const currentPregnancy = obstetricDetails?.currentPregnancy || obstetricDetails;
  const pregnancyHistory = obstetricDetails?.pregnancyHistory || [];
  if (!currentPregnancy && pregnancyHistory.length === 0) return [];
  const sections = [];
  const today = moment();
  const lmpDate = currentPregnancy?.lmp ? moment(currentPregnancy.lmp) : null;
  let gestationWeeks = null;
  let gestationDays = null;

  if (currentPregnancy?.ceed) {
    const gestationAge = 40 * 7 - Math.ceil(Math.abs(moment(currentPregnancy.ceed).startOf("day").diff(moment(today).startOf("day"), "days")));
    gestationWeeks = Math.floor(gestationAge / 7);
    gestationDays = gestationAge % 7;
  } else if (lmpDate) {
    gestationWeeks = today.diff(lmpDate, "weeks");
    gestationDays = today.diff(lmpDate.clone().add(gestationWeeks, "weeks"), "days");
  }

  const patientRows = [];
  const primaryInfo = [];
  if (currentPregnancy?.lmp) primaryInfo.push({ label: "LMP", value: moment(currentPregnancy.lmp).format("DD MMM'YY") });
  if (currentPregnancy?.edd) {
    primaryInfo.push({ label: "EDD", value: moment(currentPregnancy.edd).format("DD MMM'YY") });
  }
  if (currentPregnancy?.ceed) {
    primaryInfo.push({ label: "C.E.D.D", value: moment(currentPregnancy.ceed).format("DD MMM'YY") });
  }
  if (gestationWeeks > 0 || gestationDays > 0) {
    const gStr = [
      gestationWeeks ? `${gestationWeeks} ${gestationWeeks > 1 ? "Weeks" : "Week"}` : "",
      gestationDays ? `${gestationDays} ${gestationDays > 1 ? "Days" : "Day"}` : "",
    ].filter(Boolean).join(" ");
    const bloodGroup = currentPregnancy?.blood || currentPregnancy?.bloodGroup;
    const husbandsBlood = currentPregnancy?.husbandsBlood || currentPregnancy?.husbandBloodGroup;
    patientRows.push([
      { label: "Gestation", value: gStr },
      bloodGroup && { label: "Patient Blood Group", value: bloodGroup },
      husbandsBlood && { label: "Husband's Blood Group", value: husbandsBlood },
    ].filter(Boolean));
  }
  const maritalStatus = currentPregnancy?.maritialStatus || currentPregnancy?.maritalStatus;
  const marriageDuration = [
    currentPregnancy?.marriageDurationYears && `${currentPregnancy.marriageDurationYears} Years`,
    currentPregnancy?.marriageDurationMonths && `${currentPregnancy.marriageDurationMonths} Months`,
  ].filter(Boolean).join(" ");
  const consangValue = currentPregnancy?.consang;
  const consangText = consangValue === true ? "Yes" : consangValue === false ? "No" : currentPregnancy?.consanguinity;
  const maritalRow = [
    maritalStatus && { label: "Marital Status", value: maritalStatus },
    marriageDuration && { label: "Marriage Duration", value: marriageDuration },
    consangText && { label: "Consanguineous", value: consangText },
  ].filter(Boolean);
  if (primaryInfo.length) patientRows.unshift(primaryInfo);
  if (maritalRow.length) patientRows.push(maritalRow);
  if (patientRows.length) sections.push({ id: "obstetric-patient-info", type: "patientInfo", title: "Patient Info", rows: patientRows });

  const hasG = legacyHistoryHasValue(currentPregnancy?.gravidity);
  const hasP = legacyHistoryHasValue(currentPregnancy?.parity);
  const hasL = legacyHistoryHasValue(currentPregnancy?.livingChildren);
  const hasA = legacyHistoryHasValue(currentPregnancy?.abortion);
  const hasE = legacyHistoryHasValue(currentPregnancy?.ectopicPregnancies);
  if (hasG || hasP || hasL || hasA || hasE) {
    const isPrimigravida = Number(currentPregnancy?.gravidity) === 1 &&
      [0, "0", "", null, undefined].includes(currentPregnancy?.parity) &&
      [0, "0", "", null, undefined].includes(currentPregnancy?.livingChildren) &&
      [0, "0", "", null, undefined].includes(currentPregnancy?.abortion) &&
      [0, "0", "", null, undefined].includes(currentPregnancy?.ectopicPregnancies);
    const gplaeLines = isPrimigravida
      ? ["Primigravida"]
      : [];
    const gplaeParts = [
      { label: "G", value: currentPregnancy?.gravidity ?? 0 },
      { label: "P", value: currentPregnancy?.parity ?? 0 },
      { label: "L", value: currentPregnancy?.livingChildren ?? 0 },
      { label: "A", value: currentPregnancy?.abortion ?? 0 },
      { label: "E", value: currentPregnancy?.ectopicPregnancies ?? 0 },
    ];
    sections.push({ id: "obstetric-gplae", type: "gplae", title: "GPLAE", parts: gplaeParts, badge: gplaeLines[0], notes: currentPregnancy?.diagnosisNotes });
  }

  const pregnancyItems = [];
  pregnancyHistory.forEach((pregnancy, index) => {
    const gravida = pregnancy?.gravidity || pregnancy?.gravidaNumber;
    const details = [
      pregnancy?.deliveryMode && `Mode of Delivery: ${pregnancy.deliveryMode}`,
      pregnancy?.dateOfDelivery && `Date of Delivery: ${moment(pregnancy.dateOfDelivery).format("DD MMM'YY")}`,
      pregnancy?.ageOfDelivery && `Age of Delivery: ${pregnancy.ageOfDelivery}`,
      pregnancy?.gender && `Gender: ${pregnancy.gender}`,
      pregnancy?.babysWeight && `Baby's Weight: ${pregnancy.babysWeight} Kgs`,
      pregnancy?.gestationPeriod && `Gestation: ${pregnancy.gestationPeriod}`,
      pregnancy?.location && `Location: ${pregnancy.location}`,
      pregnancy?.typeOfAbortion && `Type of Miscarriage: ${pregnancy.typeOfAbortion === "Missed abortion" ? "Missed Miscarriage" : pregnancy.typeOfAbortion}`,
      (pregnancy?.modeOfAbortion || pregnancy?.modeOfManagement) && `Mode of Management: ${pregnancy.modeOfAbortion || pregnancy.modeOfManagement}`,
      pregnancy?.remarks && `Remarks: ${pregnancy.remarks}`,
    ].filter(Boolean);
    if (details.length) {
      pregnancyItems.push({
        strong: `Gravida no: ${gravida || index + 1}`,
        text: ` (${details.join(", ")})`,
      });
    }
  });
  if (pregnancyItems.length) sections.push({ id: "obstetric-pregnancy-history", type: "bullet", title: "Pregnancy History", items: pregnancyItems });

  const examinationItems = [];
  (currentPregnancy?.examinationHistory || []).forEach((visit, i) => {
    const visitLines = [
      typeof visit.pallor === "boolean" && `Pallor: ${visit.pallor ? "Present" : "Absent"}`,
      typeof visit.oedema === "boolean" && `Oedema: ${visit.oedema ? "Present" : "Absent"}`,
      visit.mothersBMI && `BMI: ${visit.mothersBMI} Kg/m²`,
      (visit.systolic || visit.diastolic) && `BP: ${visit.systolic || "-"}${visit.diastolic ? `/${visit.diastolic}` : ""} mmHg`,
      visit.heightOfFundus && `Fundus Height: ${visit.heightOfFundus} ${visit.heightOfFundusUnit || ""}`,
      visit.presentation && `Presentation: ${visit.presentation}`,
      visit.liquor && `Liquor: ${visit.liquor}`,
      visit.foetalHeartRate && `FHR: ${visit.foetalHeartRate} bpm`,
    ].filter(Boolean);
    if (visit.notes) visitLines.push(`Notes: ${visit.notes}`);
    if (visitLines.length) {
      examinationItems.push({
        strong: visit.date ? moment(visit.date).format("DD MMM'YY") : `Visit ${currentPregnancy.examinationHistory.length - i}`,
        text: ` (${visitLines.join(", ")})`,
      });
    }
  });
  if (examinationItems.length) sections.push({ id: "obstetric-current-examination", type: "bullet", title: "Current Examination", items: examinationItems });

  const ancLines = (currentPregnancy?.ancHistory || [])
    .filter((item) => !item.deleted && (item.dueDate || item.status === "Completed" || item.notes || item.enablePrint))
    .map((item) => ({
      strong: item.master?.name || item.name,
      text: ` (${[
        item.weekRange?.start && item.weekRange?.end && `Week Range: ${item.weekRange.start}-${item.weekRange.end} Weeks`,
        item.dueDate && `Due Date: ${moment(item.dueDate).format("DD MMM'YY")}`,
        item.status && `Status: ${item.status === "Completed" ? "Done" : item.status}`,
        item.notes && `Remarks: ${item.notes}`,
      ].filter(Boolean).join(", ")})`,
    }));
  if (ancLines.length) sections.push({ id: "obstetric-anc", type: "bullet", title: "ANC Scheduler", items: ancLines });

  const immunLines = (currentPregnancy?.immunisationHistory || [])
    .filter((item) => !item.deleted && (item.givenDate || item.status === "Given" || item.notes || item.enablePrint))
    .map((item) => ({
      strong: item.master?.name || item.name,
      text: ` (${[
        item.status && `Status: ${item.status === "Given" ? "Done" : item.status}`,
        item.givenDate && `Given Date: ${moment(item.givenDate).format("DD MMM'YY")}`,
        item.notes && `Remarks: ${item.notes}`,
      ].filter(Boolean).join(", ")})`,
    }));
  if (immunLines.length) sections.push({ id: "obstetric-immunisation", type: "bullet", title: "Immunisation History", items: immunLines });

  return sections;
}

function buildViewData(overrides = {}, sourceData = {}) {
  const currentDate = "Current Visit";
  const data = {
    pastVisits: sourceData.pastVisits ?? [],
    vitals: sourceData.vitals ?? [],
    history: sourceData.history ?? [],
    labResults: sourceData.labResults ?? [],
    medicalRecords: sourceData.medicalRecords ?? [],
    medicalRecordsRawDocs: sourceData.medicalRecordsRawDocs ?? [],
    medicalRecordsCategories: sourceData.medicalRecordsCategories ?? [],
    gynec: sourceData.gynec ?? [],
    obstetric: sourceData.obstetric ?? [],
    vaccine: sourceData.vaccine ?? { pending: [], given: [] },
    growth: sourceData.growth ?? { entries: [], info: {} },
    optal: sourceData.optal ?? [],
    personalNotes: sourceData.personalNotes ?? [],
  };

  const digitalRx = buildDigitalRx(overrides.pastVisits);
  if (digitalRx) {
    data.pastVisits = [{ id: "digitized-current", dateLabel: currentDate, digitalRx, writtenRx: [], fresh: true }, ...data.pastVisits];
  }

  const vitalsRows = buildVitalsRows(overrides.vitals);
  if (vitalsRows.length) {
    data.vitals = [{ id: "digitized-vitals", dateLabel: currentDate, rows: vitalsRows, fresh: true }, ...data.vitals];
  }

  const labRows = buildLabRows(overrides.labResults);
  if (labRows.length) {
    data.labResults = [{ id: "digitized-labs", dateLabel: currentDate, rows: labRows, fresh: true }, ...data.labResults];
  }

  const gynecCards = buildGynecCards(overrides.gynec);
  if (gynecCards.length) data.gynec = gynecCards;

  if (overrides.obstetric) {
    const obstetricCards = buildObstetricCards(overrides.obstetric);
    if (obstetricCards.length) data.obstetric = obstetricCards;
  }

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

function createSideNavVoiceId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `snv_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function extractSideNavModulePayload(responseJson) {
  return responseJson?.payload?.data?.rxDigitizationHistory?.[0]?.response ??
    responseJson?.data?.rxDigitizationHistory?.[0]?.response ??
    responseJson?.rxDigitizationHistory?.[0]?.response ??
    responseJson?.data?.documents?.[0]?.data ??
    responseJson?.data?.document?.data ??
    responseJson?.data ??
    responseJson;
}

function firstSideNavArray(payload, keys) {
  if (Array.isArray(payload)) return payload;
  for (const key of keys) {
    const value = payload?.[key];
    if (Array.isArray(value)) return value;
  }
  return [];
}

function firstSideNavObject(payload, keys) {
  if (isObject(payload) && keys.some((key) => payload?.[key] !== undefined)) return payload;
  for (const key of keys) {
    const value = payload?.[key];
    if (isObject(value)) return value;
    if (Array.isArray(value) && isObject(value[0])) return value[0];
  }
  return {};
}

function normalizeSideNavVitals(payload) {
  const vitals = firstSideNavObject(payload, ["vitals_body", "vitalsBody", "vitalsAndBodyComposition", "vitals"]);
  const systolic = vitals?.systolic ?? vitals?.bp_systolic;
  const diastolic = vitals?.diastolic ?? vitals?.bp_diastolic;
  const bloodPress = vitals?.blood_press || ((hasValue(systolic) || hasValue(diastolic)) ? `${systolic || ""}/${diastolic || ""}` : "");
  return {
    date: moment().format("YYYY-MM-DD"),
    temp: vitals?.temp ?? vitals?.temperature ?? "",
    pres: vitals?.pres ?? vitals?.pulse ?? "",
    resp_rate: vitals?.resp_rate ?? vitals?.respiratoryRate ?? "",
    blood_press: bloodPress,
    spo2: vitals?.spo2 ?? vitals?.SpO2 ?? "",
    general_rbs: vitals?.general_rbs ?? vitals?.randomBloodSugar ?? vitals?.rbs ?? "",
    height: vitals?.height ?? "",
    weight: vitals?.weight ?? "",
    bmi: vitals?.bmi ?? "",
    bmr: vitals?.bmr ?? "",
    bsa: vitals?.bsa ?? "",
    fib4: vitals?.fib4 ?? "",
    ofc: vitals?.ofc ?? "",
    waist_circumference: vitals?.waist_circumference ?? vitals?.waistCircumference ?? "",
  };
}

function normalizeSideNavHistorySections(payload) {
  const rows = firstSideNavArray(payload, ["medical_history", "medicalHistory", "history"]);
  return rows.filter((section) => section?.no_know_history || section?.tags?.length);
}

function normalizeSideNavMedicalHistoryMatch(value) {
  return String(value || "").trim().toLowerCase();
}

function mapSideNavMedicalHistoryIdsFromDefaultList(data = [], defaultList = []) {
  if (!Array.isArray(data)) return [];

  return data
    .map((item) => {
      const incomingTitle = item?.title || item?.section || item?.type || "Medical Condition";
      let section = defaultList?.find((defaultItem) => (
        Number(defaultItem?.tmmhs_id) === Number(item?.tmmhs_id) ||
        normalizeSideNavMedicalHistoryMatch(defaultItem?.title) === normalizeSideNavMedicalHistoryMatch(incomingTitle)
      ));
      if (!section && normalizeSideNavMedicalHistoryMatch(incomingTitle) === "others") {
        section = defaultList?.find((defaultItem) => normalizeSideNavMedicalHistoryMatch(defaultItem?.title) === "lifestyle");
      }

      const mappedTags = Array.isArray(item?.tags)
        ? item.tags
          .map((tag) => {
            const tagTitle = String(tag?.title || tag?.name || tag?.lineItem || "").trim();
            if (!tagTitle) return null;
            const matchedTag = findMatchingMedicalHistoryTag(
              { title: tagTitle, tmmhst_id: tag?.tmmhst_id },
              section?.tags,
              section?.tmmhs_id
            );
            return {
              ...tag,
              title: tagTitle,
              ...(matchedTag?.tmmhst_id ? { tmmhst_id: matchedTag.tmmhst_id } : {}),
              note: tag?.note || tag?.notes || "",
              notes: tag?.notes || tag?.note || "",
              enable: tag?.enable === "" || tag?.enable === undefined ? "Y" : tag?.enable,
              relationship: tag?.relationship || tag?.relation || "",
              since: tag?.since || tag?.duration || "",
              status: tag?.status || "",
              medication: tag?.medication || "",
            };
          })
          .filter(Boolean)
        : [];

      return {
        ...item,
        title: section?.title || incomingTitle,
        ...(section?.tmmhs_id ? { tmmhs_id: section.tmmhs_id } : {}),
        no_know_history: Boolean(item?.no_know_history),
        tags: mappedTags,
      };
    })
    .filter((section) => section.no_know_history || section.tags.length);
}

function mergeSideNavMedicalHistorySections(base = [], incoming = []) {
  const baseData = Array.isArray(base) ? JSON.parse(JSON.stringify(base)) : [];
  const incomingData = Array.isArray(incoming) ? JSON.parse(JSON.stringify(incoming)) : [];
  const usedIncomingIndexes = new Set();

  const merged = baseData.map((section) => {
    const incomingIndex = incomingData.findIndex((item) => (
      Number(item?.tmmhs_id) === Number(section?.tmmhs_id) ||
      normalizeSideNavMedicalHistoryMatch(item?.title) === normalizeSideNavMedicalHistoryMatch(section?.title)
    ));
    const incomingSection = incomingIndex >= 0 ? incomingData[incomingIndex] : null;
    if (!incomingSection) return section;
    usedIncomingIndexes.add(incomingIndex);

    const mergedTags = [
      ...(section?.tags || []).map((tag) => ({
        ...tag,
        ...(findMatchingMedicalHistoryTag(tag, incomingSection?.tags, section?.tmmhs_id) || {}),
      })),
      ...(incomingSection?.tags || []).filter(
        (incomingTag) => !(section?.tags || []).some((existingTag) =>
          tagsAreDuplicateForHistoryMerge(existingTag, incomingTag, section?.tmmhs_id)
        )
      ),
    ];

    return {
      ...section,
      ...incomingSection,
      tags: mergeMedicalHistoryTagsBySection(mergedTags, [], section?.tmmhs_id || incomingSection?.tmmhs_id),
    };
  });

  incomingData.forEach((section, index) => {
    if (!usedIncomingIndexes.has(index)) merged.push(section);
  });

  return merged;
}

function normalizeSideNavLabItems(payload) {
  return firstSideNavArray(payload, ["lab_investigations", "labInvestigations", "labInvestigation", "investigations", "investigation", "labResults", "labs"])
    .map((row) => ({
      ...row,
      investigation_name: row?.investigation_name || row?.test_name || row?.testName || row?.name || row?.label || "",
      note: row?.note ?? row?.notes ?? row?.value ?? row?.result ?? "",
      unique_id: row?.unique_id || row?.id || createSideNavVoiceId(),
    }))
    .filter((row) => hasValue(row.investigation_name));
}

function normalizeSideNavModuleResponse(responseJson, sectionId) {
  const payload = extractSideNavModulePayload(responseJson);
  switch (sectionId) {
    case "vitals":
      return { vitals: normalizeSideNavVitals(payload) };
    case "history":
      return { history: normalizeSideNavHistorySections(payload) };
    case "labResults":
      return { labResults: normalizeSideNavLabItems(payload) };
    default:
      return {};
  }
}

function sideNavObjectHasContent(object, ignoredKeys = []) {
  const ignored = new Set(ignoredKeys);
  return Object.entries(object || {}).some(([key, value]) => !ignored.has(key) && hasValue(value));
}

async function requestSideNavModuleDigitise({ sectionId, audioBlob, patientId, doctorId, sessionId }) {
  const moduleName = SIDE_NAV_MODULE_NAMES[sectionId];
  if (!moduleName) {
    throw new Error("Voice input is not available for this section.");
  }
  if (!patientId || !doctorId || !sessionId) {
    throw new Error("Missing patient, doctor, or session id for section voice digitisation.");
  }
  if (!audioBlob?.size) {
    throw new Error("No audio recording found for section voice digitisation.");
  }

  const formData = new FormData();
  formData.append("patient_id", String(patientId));
  formData.append("doctor_id", String(doctorId));
  formData.append("session_id", String(sessionId));
  formData.append("module_name", moduleName);
  formData.append("audio", audioBlob, "audio.webm");

  const abortController = new AbortController();
  const timeoutId = window.setTimeout(() => abortController.abort(), SIDE_NAV_MODULE_TIMEOUT_MS);
  let response;
  try {
    response = await fetch(joinAgentModuleApiUrl(SIDE_NAV_MODULE_ENDPOINT), {
      method: "POST",
      headers: buildClinicalApiHeaders({ includeContentType: false }),
      body: formData,
      signal: abortController.signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("Section voice digitise timed out after 120 seconds.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(`Section voice digitise failed with ${response.status}`);
  }

  return normalizeSideNavModuleResponse(await response.json(), sectionId);
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

function NavPanel({ activeId, onSelect, items = NAV_ITEMS }) {
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
        {items.map((item) => (
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

function PastVisitCopyAffordance({ onClick, label = "Copy to RxPad" }) {
  return (
    <button
      type="button"
      className="snv-copy-btn"
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
    >
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

function RxSection({ title, icon, children, onCopy }) {
  return (
    <div className="snv-rx-section">
      <div className="snv-rx-section-title">
        <span className="snv-rx-section-icon">{icon}</span>
        <span>{title}</span>
        <PastVisitCopyAffordance onClick={onCopy} label={`Copy ${title} to RxPad`} />
      </div>
      {children}
    </div>
  );
}

const RX_SECTION_ICONS = {
  symptoms: ASSETS.images.symptoms,
  examination: ASSETS.images.examination,
  diagnosis: ASSETS.images.diagnosis,
  medications: ASSETS.images.medication,
  medicalHistory: ASSETS.images.medicalHistory,
  surgeries: ASSETS.images.surgery,
  customModules: ASSETS.images.customModule,
  advice: ASSETS.images.advice,
  investigations: ASSETS.images.lab,
  notes: ASSETS.images.notes,
  followUp: ASSETS.images.followup,
};

function RxSectionIcon({ src, alt = "" }) {
  if (!src) return null;
  return (
    <img
      className="snv-rx-section-icon-img"
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : "true"}
    />
  );
}

function hasListData(items) {
  return Array.isArray(items) && items.length > 0;
}

function DateCard({ title, expanded, onToggle, onCopy, children, fresh }) {
  return (
    <article className={`snv-date-card ${fresh ? "snv-fresh-card" : ""}`}>
      <div className="snv-date-card-header">
        <button type="button" className="snv-date-toggle-btn" onClick={onToggle}>
          <span>{title}</span>
        </button>
        {onCopy ? (
          <PastVisitCopyAffordance onClick={onCopy} label={`Copy ${title} visit to RxPad`} />
        ) : null}
        <button type="button" className="snv-date-arrow-btn" onClick={onToggle} aria-label={expanded ? "Collapse visit" : "Expand visit"}>
          {expanded ? <ArrowSquareUp size={18} variant="Linear" /> : <ArrowSquareDown size={18} variant="Linear" />}
        </button>
      </div>
      {expanded ? <div className="snv-date-card-body">{children}</div> : null}
    </article>
  );
}

function defaultExpandedMap(firstId) {
  return firstId ? { [firstId]: true } : {};
}

function PastVisitsContent({ visits, hasMore, loading, onLoadMore, onExpand, onCopyPayload }) {
  const scrollRef = useRef(null);
  const pendingLoadMoreRef = useRef(false);
  const firstVisitId = visits[0]?.id;
  const [expandedById, setExpandedById] = useState(() => defaultExpandedMap(firstVisitId));
  const [modeByVisit, setModeByVisit] = useState({});
  const [visibleCount, setVisibleCount] = useState(SIDE_NAV_BATCH_SIZE);

  useEffect(() => {
    setExpandedById(defaultExpandedMap(firstVisitId));
    setVisibleCount(SIDE_NAV_BATCH_SIZE);
    pendingLoadMoreRef.current = false;
  }, [firstVisitId]);

  useEffect(() => {
    const firstVisit = visits.find((visit) => expandedById[visit.id]);
    if (firstVisit) onExpand(firstVisit);
  }, [expandedById, onExpand, visits]);

  const handleVisitToggle = useCallback((visitItem, expanded) => {
    setExpandedById((prev) => ({ ...prev, [visitItem.id]: !expanded }));
    if (!expanded) onExpand(visitItem);
  }, [onExpand]);

  useEffect(() => {
    if (!pendingLoadMoreRef.current || loading || visibleCount >= visits.length) return;
    setVisibleCount((current) => Math.min(current + SIDE_NAV_BATCH_SIZE, visits.length));
    pendingLoadMoreRef.current = false;
  }, [loading, visibleCount, visits.length]);

  const visibleVisits = useMemo(() => visits.slice(0, visibleCount), [visibleCount, visits]);
  const canLoadMore = visibleCount < visits.length || hasMore;

  const handleLoadMore = useCallback(() => {
    if (visibleCount < visits.length) {
      setVisibleCount((current) => Math.min(current + SIDE_NAV_BATCH_SIZE, visits.length));
      return;
    }
    if (hasMore && !loading) {
      pendingLoadMoreRef.current = true;
      onLoadMore();
    }
  }, [hasMore, loading, onLoadMore, visibleCount, visits.length]);

  const handleCopyPayload = useCallback((payload, successMessage, opts) => {
    if (!payload) return;
    onCopyPayload?.(payload, {
      ...opts,
      onAfterCopy: () => toast.success(successMessage),
    });
  }, [onCopyPayload]);

  const handleCopyVisit = useCallback((visitItem) => {
    handleCopyPayload(
      buildPastVisitAllPayload(visitItem),
      `${visitItem.dateLabel} copied to RxPad`,
      { bulk: true }
    );
  }, [handleCopyPayload]);

  const handleCopySection = useCallback((visitItem, sectionKey, title) => {
    handleCopyPayload(
      buildPastVisitSectionPayload(visitItem, sectionKey),
      `${title} copied to RxPad`
    );
  }, [handleCopyPayload]);

  const rowVirtualizer = useVirtualizer({
    count: visibleVisits.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (index) => expandedById[visibleVisits[index]?.id] ? 520 : 78,
    overscan: 4,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div ref={scrollRef} className="snv-content-scroll" data-snv-scroll-root="true">
      {visits.length === 0 && !loading ? (
        <div className="snv-empty-state">No past visits recorded.</div>
      ) : (
        <div className="snv-virtual-list" style={{ height: rowVirtualizer.getTotalSize() }}>
          {virtualRows.map((virtualRow) => {
        const visitItem = visibleVisits[virtualRow.index];
        const expanded = Boolean(expandedById[visitItem.id]);
        const mode = modeByVisit[visitItem.id] || "digital";
        const rx = visitItem.digitalRx;
        const canCopyVisit = Boolean(visitItem.detailLoaded && buildPastVisitAllPayload(visitItem));

        return (
          <div
            key={visitItem.id}
            ref={rowVirtualizer.measureElement}
            data-index={virtualRow.index}
            className="snv-virtual-row"
            style={{ transform: `translateY(${virtualRow.start}px)` }}
          >
            <DateCard
              title={visitItem.dateLabel}
              expanded={expanded}
              fresh={visitItem.fresh}
              onToggle={() => handleVisitToggle(visitItem, expanded)}
              onCopy={canCopyVisit ? () => handleCopyVisit(visitItem) : undefined}
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
                  {visitItem.hasTranscript ? "Transcript" : "Written Rx"}
                </button>
              </div>
              {mode === "written" ? (
                visitItem.detailLoading ? (
                  <div className="snv-loading-state">Loading {visitItem.hasTranscript ? "transcript" : "written Rx"}...</div>
                ) : visitItem.hasTranscript ? (
                  <TranscriptContent blocks={visitItem.transcriptBlocks || []} />
                ) : (
                  <WrittenRxContent docs={visitItem.writtenRx || []} />
                )
              ) : visitItem.detailLoading ? (
                <div className="snv-loading-state">Loading visit details...</div>
              ) : rx ? (
                <>
                  {hasListData(rx.symptoms) ? <RxSection title="Symptoms" icon={<RxSectionIcon src={RX_SECTION_ICONS.symptoms} />} onCopy={() => handleCopySection(visitItem, "symptoms", "Symptoms")}><BulletList items={rx.symptoms} /></RxSection> : null}
                  {hasListData(rx.examinations) ? <RxSection title="Examination" icon={<RxSectionIcon src={RX_SECTION_ICONS.examination} />} onCopy={() => handleCopySection(visitItem, "examinations", "Examination")}><BulletList items={rx.examinations} /></RxSection> : null}
                  {hasListData(rx.diagnoses) ? <RxSection title="Diagnosis" icon={<RxSectionIcon src={RX_SECTION_ICONS.diagnosis} />} onCopy={() => handleCopySection(visitItem, "diagnosis", "Diagnosis")}><BulletList items={rx.diagnoses} /></RxSection> : null}
                  {hasListData(rx.medications) ? <RxSection title="Med (Rx)" icon={<RxSectionIcon src={RX_SECTION_ICONS.medications} />} onCopy={() => handleCopySection(visitItem, "medications", "Med (Rx)")}><BulletList items={rx.medications} /></RxSection> : null}
                  {hasListData(rx.medicalHistory) ? <RxSection title="Medical History" icon={<RxSectionIcon src={RX_SECTION_ICONS.medicalHistory} />} onCopy={() => handleCopySection(visitItem, "medicalHistory", "Medical History")}><BulletList items={rx.medicalHistory} /></RxSection> : null}
                  {hasListData(rx.surgeries) ? <RxSection title="Surgeries" icon={<RxSectionIcon src={RX_SECTION_ICONS.surgeries} />} onCopy={() => handleCopySection(visitItem, "surgeries", "Surgeries")}><BulletList items={rx.surgeries} /></RxSection> : null}
                  {hasListData(rx.moduleContents) ? <RxSection title="Custom Modules" icon={<RxSectionIcon src={RX_SECTION_ICONS.customModules} />} onCopy={() => handleCopySection(visitItem, "moduleContents", "Custom Modules")}><BulletList items={rx.moduleContents} /></RxSection> : null}
                  {rx.advice ? <RxSection title="Advice" icon={<RxSectionIcon src={RX_SECTION_ICONS.advice} />} onCopy={() => handleCopySection(visitItem, "advice", "Advice")}><p className="snv-section-text">{rx.advice}</p></RxSection> : null}
                  {hasListData(rx.labInvestigations) ? <RxSection title="Investigations" icon={<RxSectionIcon src={RX_SECTION_ICONS.investigations} />} onCopy={() => handleCopySection(visitItem, "investigations", "Investigations")}><BulletList items={rx.labInvestigations} /></RxSection> : null}
                  {rx.additionalNotes ? <RxSection title="Additional Notes" icon={<RxSectionIcon src={RX_SECTION_ICONS.notes} />} onCopy={() => handleCopySection(visitItem, "additionalNotes", "Additional Notes")}><p className="snv-section-text">{rx.additionalNotes}</p></RxSection> : null}
                  {rx.followUp ? <RxSection title="Follow Up" icon={<RxSectionIcon src={RX_SECTION_ICONS.followUp} />} onCopy={() => handleCopySection(visitItem, "followUp", "Follow Up")}><p className="snv-section-text">{rx.followUp}</p></RxSection> : null}
                </>
              ) : (
                <div className="snv-empty-state">No digital Rx available for this visit.</div>
              )}
            </DateCard>
          </div>
        );
          })}
        </div>
      )}
      {loading ? <div className="snv-loading-state">Loading visits...</div> : null}
      {canLoadMore ? (
        <button type="button" className="snv-load-more-btn" onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </button>
      ) : null}
    </div>
  );
}

function WrittenRxPreview({ doc }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const printUrlWithLang = useMemo(() => {
    if (!doc?.printUrl) return null;
    return doc.printUrl;
  }, [doc?.printUrl]);
  const { printBlob, isGenerating, error } = usePrintPayloadPdf({
    printUrl: printUrlWithLang,
    selectedLang: undefined,
    isGynaecHistoryAccessable: false,
    payloadOverride: null,
    skipFetch: !printUrlWithLang,
  });
  const [blobUrl, setBlobUrl] = useState("");

  useEffect(() => {
    if (!(printBlob instanceof Blob)) {
      setBlobUrl("");
      return undefined;
    }
    const nextUrl = URL.createObjectURL(printBlob);
    setBlobUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [printBlob]);

  const handlePrint = useCallback(() => {
    if (!(printBlob instanceof Blob)) return;
    const nextUrl = URL.createObjectURL(printBlob);
    window.open(nextUrl, "_blank");
    setMenuOpen(false);
    window.setTimeout(() => URL.revokeObjectURL(nextUrl), 30000);
  }, [printBlob]);

  if (isGenerating) return <div className="snv-loading-state">Loading written Rx...</div>;
  if (error || !blobUrl) return <div className="snv-empty-state">No written Rx available.</div>;

  return (
    <div className="snv-written-preview-card">
      <iframe
        title="Written Rx preview"
        src={`${blobUrl}#toolbar=0&navpanes=0&scrollbar=0`}
        className="snv-written-preview-frame"
      />
      <div className="snv-written-preview-footer">
        <div className="snv-written-preview-meta">
          {doc.doctorName ? <div className="snv-written-preview-doctor">{doc.doctorName}</div> : null}
          {doc.speciality ? <div className="snv-written-preview-speciality">{doc.speciality}</div> : null}
        </div>
        <div className="snv-written-actions">
          <button
            type="button"
            className="snv-written-more-btn"
            aria-label="Written Rx actions"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <More size={18} variant="Linear" />
          </button>
          {menuOpen ? (
            <div className="snv-written-menu">
              <button type="button" className="snv-written-menu-item" onClick={handlePrint}>
                <Printer size={15} variant="Linear" />
                <span>Print</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function WrittenRxContent({ docs = [] }) {
  if (!docs.length) return <div className="snv-empty-state">No written Rx available.</div>;
  return (
    <div className="snv-written-list">
      {docs.map((doc) => (
        <WrittenRxPreview key={doc.id || doc.printUrl} doc={doc} />
      ))}
    </div>
  );
}

function TranscriptContent({ blocks = [] }) {
  if (!blocks.length) return <div className="snv-empty-state">No transcript available.</div>;
  return (
    <div className="snv-transcript-list">
      {blocks.map((block) => (
        <div key={block.id} className="snv-transcript-block">
          {block.type === "conversation" ? (
            block.items.map((item) => (
              <div key={item.id} className="snv-transcript-line">
                {item.speaker ? <span className="snv-transcript-speaker">{item.speaker}: </span> : null}
                <span>{item.text}</span>
              </div>
            ))
          ) : (
            <div className="snv-transcript-text">{block.text}</div>
          )}
        </div>
      ))}
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

function DateRowsContent({ entries = [] }) {
  const scrollRef = useRef(null);
  const firstEntryId = entries[0]?.id;
  const [expandedById, setExpandedById] = useState(() => defaultExpandedMap(firstEntryId));
  const [visibleCount, setVisibleCount] = useState(SIDE_NAV_BATCH_SIZE);

  useEffect(() => {
    setExpandedById(defaultExpandedMap(firstEntryId));
    setVisibleCount(SIDE_NAV_BATCH_SIZE);
  }, [firstEntryId]);

  const visibleEntries = useMemo(() => entries.slice(0, visibleCount), [entries, visibleCount]);

  const rowVirtualizer = useVirtualizer({
    count: visibleEntries.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (index) => expandedById[visibleEntries[index]?.id] ? 360 : 78,
    overscan: 4,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div ref={scrollRef} className="snv-content-scroll" data-snv-scroll-root="true">
      {entries.length === 0 ? (
        <div className="snv-empty-state">No data recorded.</div>
      ) : (
        <div className="snv-virtual-list" style={{ height: rowVirtualizer.getTotalSize() }}>
          {virtualRows.map((virtualRow) => {
            const entry = visibleEntries[virtualRow.index];
            const expanded = Boolean(expandedById[entry.id]);
            return (
              <div
                key={entry.id}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                className="snv-virtual-row"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                <DateCard
                  title={entry.dateLabel}
                  expanded={expanded}
                  fresh={entry.fresh}
                  onToggle={() => setExpandedById((prev) => ({ ...prev, [entry.id]: !expanded }))}
                >
                  <KeyValueRows rows={entry.rows} />
                </DateCard>
              </div>
            );
          })}
        </div>
      )}
      {visibleCount < entries.length ? (
        <button
          type="button"
          className="snv-load-more-btn"
          onClick={() => setVisibleCount((current) => Math.min(current + SIDE_NAV_BATCH_SIZE, entries.length))}
        >
          Load more
        </button>
      ) : null}
    </div>
  );
}

function HistoryContent({ sections = [] }) {
  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      {sections.length === 0 ? (
        <div className="snv-empty-state">No data recorded.</div>
      ) : sections.map((section) => (
        <div key={section.id} className={`snv-info-card ${section.fresh ? "snv-fresh-card" : ""}`}>
          <div className="snv-info-card-title">{section.title}</div>
          {section.items.length ? <BulletList items={section.items.map((item) => ({ label: item.name, detail: item.detail, fresh: item.fresh }))} /> : <div className="snv-empty-state">No data recorded.</div>}
        </div>
      ))}
    </div>
  );
}

function SectionCardsContent({ sections }) {
  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      {sections.length === 0 ? (
        <div className="snv-empty-state">No data recorded.</div>
      ) : sections.map((section) => (
        <div key={section.id} className={`snv-info-card ${section.fresh ? "snv-fresh-card" : ""}`}>
          <div className="snv-info-card-title">{section.title}</div>
          <div className="snv-card-lines">
            {(section.lines || []).map((line, i) => (
              <p key={i} className="snv-card-line">{line}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ObstetricPatientInfoCard({ section }) {
  return (
    <article className="snv-ob-card snv-ob-patient-card">
      <div className="snv-ob-card-title">{section.title}</div>
      <div className="snv-ob-patient-body">
        {(section.rows || []).map((row, rowIndex) => (
          <div key={rowIndex} className="snv-ob-patient-row">
            {row.map((item, index) => (
              <React.Fragment key={`${item.label}-${index}`}>
                {index > 0 ? <span className="snv-ob-separator" aria-hidden="true">|</span> : null}
                <span className="snv-ob-field">
                  <span className="snv-ob-label">{item.label}: </span>
                  <strong>{item.value}</strong>
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}

function ObstetricGplaeCard({ section }) {
  return (
    <article className="snv-ob-card">
      <div className="snv-ob-card-title snv-ob-gplae-title">
        <span>{section.title}</span>
        {section.badge ? <span className="snv-ob-badge">{section.badge}</span> : null}
      </div>
      <div className="snv-ob-gplae-body">
        {(section.parts || []).map((part, index) => (
          <React.Fragment key={part.label}>
            {index > 0 ? <span className="snv-ob-separator" aria-hidden="true">|</span> : null}
            <span className="snv-ob-gplae-part">{part.label}: <strong>{part.value}</strong></span>
          </React.Fragment>
        ))}
      </div>
      {section.notes ? <div className="snv-ob-note">Notes: <strong>{section.notes}</strong></div> : null}
    </article>
  );
}

function ObstetricBulletCard({ section }) {
  return (
    <article className="snv-ob-card">
      <div className="snv-ob-card-title">
        <span>{section.title}</span>
        <ArrowSquareUp size={18} variant="Linear" />
      </div>
      <ul className="snv-ob-bullet-list">
        {(section.items || []).map((item, index) => (
          <li key={`${item.strong}-${index}`}>
            <strong>{item.strong}</strong>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ObstetricContent({ sections = [] }) {
  const visibleSections = sections.filter((section) => {
    if (section.type === "patientInfo") return (section.rows || []).some((row) => row.length > 0);
    if (section.type === "gplae") return (section.parts || []).length > 0 || section.badge || section.notes;
    return (section.items || []).length > 0;
  });

  return (
    <div className="snv-content-scroll snv-ob-content" data-snv-scroll-root="true">
      {visibleSections.length === 0 ? (
        <div className="snv-empty-state">No data recorded.</div>
      ) : visibleSections.map((section) => {
        if (section.type === "patientInfo") return <ObstetricPatientInfoCard key={section.id} section={section} />;
        if (section.type === "gplae") return <ObstetricGplaeCard key={section.id} section={section} />;
        return <ObstetricBulletCard key={section.id} section={section} />;
      })}
    </div>
  );
}

const RECORD_FILTER_TYPES = ["All", "Pathology", "Prescription", "Radiology"];

const NOOP = () => {};

function RecordsContent({ records = [], rawDocs = [], uploadDocCategories = [] }) {
  const scrollRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const hasRawDocs = rawDocs.length > 0;

  const availableFilters = useMemo(() => {
    if (hasRawDocs) {
      return ["All", ...Array.from(new Set(
      rawDocs.map((doc) => CATEGORY_TO_FILTER[resolveCategoryName(doc.category_id, uploadDocCategories)] || "Other")
      ))];
    }
    return RECORD_FILTER_TYPES;
  }, [hasRawDocs, rawDocs, uploadDocCategories]);

  const filteredDocs = useMemo(() => {
    if (!hasRawDocs) return [];
    return activeFilter === "All"
      ? rawDocs
      : rawDocs.filter((doc) => {
          const catName = resolveCategoryName(doc.category_id, uploadDocCategories);
          return (CATEGORY_TO_FILTER[catName] || "Other") === activeFilter;
        });
  }, [activeFilter, hasRawDocs, rawDocs, uploadDocCategories]);

  const filteredRecords = useMemo(
    () => activeFilter === "All" ? records : records.filter((record) => record.filterType === activeFilter),
    [activeFilter, records]
  );

  const visibleItems = hasRawDocs ? filteredDocs : filteredRecords;
  const hasRecords = hasRawDocs ? rawDocs.length > 0 : records.length > 0;
  const rowVirtualizer = useVirtualizer({
    count: visibleItems.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: hasRawDocs ? () => 240 : () => 76,
    overscan: 5,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [activeFilter]);

  return (
    <div
      ref={scrollRef}
      className={`snv-content-scroll ${hasRawDocs ? "snv-records-list" : ""}`}
      data-snv-scroll-root="true"
    >
      {!hasRecords ? (
        <div className="snv-empty-state">No data recorded.</div>
      ) : (
        <div className="snv-filter-strip">
          {availableFilters.map((f) => (
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
      )}
      {hasRecords && visibleItems.length === 0 ? (
        <div className="snv-empty-state">No records in this category.</div>
      ) : null}
      {visibleItems.length > 0 ? (
        <div className="snv-virtual-list" style={{ height: rowVirtualizer.getTotalSize() }}>
          {virtualRows.map((virtualRow) => {
            const item = visibleItems[virtualRow.index];
            const key = hasRawDocs ? item.id || item.document_id || item.file_name || virtualRow.index : item.id;
            return (
              <div
                key={key}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                className="snv-virtual-row"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                {hasRawDocs ? (
                  <RecordCard
                    cardData={item}
                    handleDrawerUploadDoc={NOOP}
                    setFilesData={NOOP}
                    setIsEditDocument={NOOP}
                    setUploadDocDrawer={NOOP}
                  />
                ) : (
                  <div className="snv-record-thumb-card">
                    <div
                      className={`snv-record-thumb ${item.thumbnailUrl ? "" : `snv-thumb-${item.imgType}`}`}
                      style={item.thumbnailUrl ? {
                        backgroundImage: `url('${item.thumbnailUrl}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      } : undefined}
                      aria-hidden="true"
                    />
                    <div className="snv-record-thumb-info">
                      <div className="snv-record-thumb-label">{item.label}</div>
                      <div className="snv-record-thumb-date">{item.date}</div>
                      {item.categoryName ? <div className="snv-record-thumb-date">{item.categoryName}</div> : null}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
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

function buildLegacyVaccineData(patientVaccineRows = [], vaccineTemplateRows = []) {
  if (vaccineTemplateRows.length) {
    const rows = vaccineTemplateRows.map((item) => {
      const dueDate = item?.tvd_due_date || item?.dueDate || "";
      return {
        week: item?.tvt_age || "Vaccines",
        name: item?.tvac_name || item?.tvt_name || "Vaccine",
        givenDate: item?.tvp_given_date ? formatVaccDate(item.tvp_given_date) : "",
        dueDate,
        brand: item?.tvc_name || item?.brandName || "",
        notes: [
          item?.tvp_remarks,
          item?.tvd_remarks,
          item?.remarks,
          item?.tvpv_route && `Route: ${item.tvpv_route}`,
          item?.tvpv_dose && `Dose: ${item.tvpv_dose}`,
          item?.tvpv_site && `Site: ${item.tvpv_site}`,
        ].filter(Boolean).join(" | "),
      };
    });

    return {
      pending: rows.filter((item) => !item.givenDate && item.dueDate),
      given: rows.filter((item) => item.givenDate),
    };
  }

  const templateById = new Map(
    vaccineTemplateRows
      .filter((item) => item?.tvt_id)
      .map((item) => [item.tvt_id, item])
  );
  const given = patientVaccineRows
    .filter((item) => item?.tvp_given_date || item?.tvac_name)
    .map((item) => {
      const template = templateById.get(item?.tvp_temp_id) || {};
      const givenDate = item?.tvp_given_date ? formatVaccDate(item.tvp_given_date) : "";
      const fallbackWeek = item?.tvp_given_date ? `Given on ${givenDate}` : "Given Vaccines";
      const details = [
        item?.tvpv_route && `Route: ${item.tvpv_route}`,
        item?.tvpv_dose && `Dose: ${item.tvpv_dose}`,
        item?.tvpv_site && `Site: ${item.tvpv_site}`,
      ].filter(Boolean);

      return {
        week: template?.tvt_age || item?.tvt_age || fallbackWeek,
        name: item?.tvac_name || template?.tvt_name || "Vaccine",
        givenDate,
        dueDate: template?.dueDate || template?.tvd_due_date || "",
        brand: item?.tvc_name || item?.brandName || "",
        notes: [item?.tvp_remarks, ...details].filter(Boolean).join(" | "),
      };
    });

  return { pending: [], given };
}

function hasOpthalValue(value) {
  if (value === 0 || value === "0") return true;
  if (value === null || value === undefined) return false;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed || /^[-–—]+$/.test(trimmed)) return false;
    if (/^(n\/?a|nil)$/i.test(trimmed)) return false;
    return true;
  }
  return Boolean(value);
}

function normalizeOpthalEye(eye) {
  const normalized = String(eye || "").toUpperCase();
  if (normalized === "RE") return "OD";
  if (normalized === "LE") return "OS";
  return normalized;
}

function findOpthalEyeRow(rows = [], eye) {
  return rows.find((item) => normalizeOpthalEye(item?.eye) === eye) || {};
}

function opthalDetailText(parts = []) {
  return parts.filter((part) => hasOpthalValue(part?.value)).map((part) => `${part.label}: ${part.value}`).join(", ");
}

function buildOpthalEyeItems(rows = [], config = []) {
  return ["OD", "OS"].flatMap((eye) => {
    const row = findOpthalEyeRow(rows, eye);
    const detail = opthalDetailText(config.map((item) => ({ label: item.label, value: row[item.key] })));
    return detail ? [{ label: eye, detail }] : [];
  });
}

function buildOpthalStructureItems(rows = []) {
  return rows.flatMap((item) => {
    const detail = opthalDetailText([
      { label: "OD", value: item?.OD ?? item?.od },
      { label: "OS", value: item?.OS ?? item?.os },
      { label: "Remarks", value: item?.remarks },
    ]);
    return detail ? [{ label: item?.section || item?.name || "Finding", detail }] : [];
  });
}

function buildLegacyOpthalEntries(rows = []) {
  return rows.flatMap((row, index) => {
    const sections = [
      {
        id: "visual-acuity",
        title: "Visual Acuity Test",
        icon: "Tt",
        items: buildOpthalEyeItems(row?.visualAcuity, [
          { key: "ucDistance", label: "UC Dist" },
          { key: "pinhole", label: "PH" },
          { key: "cDistance", label: "C Dist" },
          { key: "cNear", label: "C Near" },
          { key: "ucNear", label: "UC Near" },
        ]),
      },
      {
        id: "iop",
        title: "Intra Ocular Pressure",
        icon: "IOP",
        items: buildOpthalEyeItems(row?.intraOcularPressure, [
          { key: "nct", label: "NCT" },
          { key: "gat", label: "GAT" },
          { key: "cc", label: "CC" },
          { key: "cct", label: "CCT" },
          { key: "ciop", label: "CIOP" },
        ]),
      },
      {
        id: "slit-lamp",
        title: "Slit Lamp Examination",
        icon: "SL",
        items: buildOpthalStructureItems(row?.slitLampExamination),
      },
      {
        id: "fundus",
        title: "Fundus Examination",
        icon: "F",
        items: buildOpthalStructureItems(row?.fundusExamination),
      },
    ].filter((section) => section.items.length);

    if (!sections.length) return [];
    const date = row?.consultation_date || row?.date || row?.createdAt || row?.created_at || row?.updatedAt || row?.updated_at;
    return [{
      id: `opthal-${row?._id || row?.id || row?.tcm_id || index}`,
      dateLabel: formatOpthalDate(date),
      sections,
    }];
  });
}

function getGrowthRowDate(row) {
  return row?.tcbc_created_date || row?.created_date || row?.date || row?.createdAt || row?.created_at;
}

function getGrowthRowValue(row, key) {
  return row?.[key] ?? row?.[`tcbc_${key}`] ?? row?.[`gc_${key}`] ?? "";
}

function hasGrowthMetricValue(value) {
  return value !== "" && value !== null && value !== undefined && Number.isFinite(Number(value));
}

function buildLegacyGrowthData(rows = [], parentalDetails, patientData) {
  const dob = parsePatientDobForGrowth(patientData);
  const todayAgeMonths = dob ? Math.max(0, moment().diff(dob, "months")) : 36;
  const sortedRows = rows
    .filter((row) => (
      getGrowthRowDate(row) ||
      hasGrowthMetricValue(getGrowthRowValue(row, "height")) ||
      hasGrowthMetricValue(getGrowthRowValue(row, "weight")) ||
      hasGrowthMetricValue(getGrowthRowValue(row, "bmi")) ||
      hasGrowthMetricValue(getGrowthRowValue(row, "ofc"))
    ))
    .sort((a, b) => {
      const aDate = moment(getGrowthRowDate(a));
      const bDate = moment(getGrowthRowDate(b));
      if (!aDate.isValid() && !bDate.isValid()) return 0;
      if (!aDate.isValid()) return 1;
      if (!bDate.isValid()) return -1;
      return aDate.valueOf() - bDate.valueOf();
    });
  const entries = sortedRows
    .map((row, index) => {
      const created = moment(getGrowthRowDate(row));
      const fallbackStep = sortedRows.length > 1 ? 36 / (sortedRows.length - 1) : 36;
      const ageMonths = dob && created.isValid()
        ? Math.max(0, created.diff(dob, "months"))
        : Math.min(36, Math.round(index * fallbackStep));
      return {
        ...row,
        height: getGrowthRowValue(row, "height"),
        weight: getGrowthRowValue(row, "weight"),
        bmi: getGrowthRowValue(row, "bmi"),
        ofc: getGrowthRowValue(row, "ofc"),
        ageMonths,
      };
    })
    .filter((row) => row.ageMonths !== null && row.ageMonths !== undefined)
    .sort((a, b) => a.ageMonths - b.ageMonths);
  const hasParentalDetails = isObject(parentalDetails) && Object.values(parentalDetails).some(hasValue);
  if (!entries.length && !hasParentalDetails) return { entries: [], info: {} };

  const fatherHeight = Number(parentalDetails?.father_height);
  const motherHeight = Number(parentalDetails?.mother_height);
  let midParentalHeight = parentalDetails?.mid_parental_height;
  if (!midParentalHeight && fatherHeight && motherHeight) {
    const { maleChildHeight, femaleChildHeight } = getMidParentalHeight(fatherHeight, motherHeight);
    const gender = patientData?.pm_gender || patientData?.patient_gender;
    midParentalHeight = String(gender).toLowerCase() === "female" ? femaleChildHeight : maleChildHeight;
  }
  const gestationPeriod = parentalDetails?.gestation_period_weeks ||
    (parentalDetails?.gestation_period ? Math.floor(Number(parentalDetails.gestation_period) / 7) : "");

  return {
    entries,
    info: {
      ageMonths: todayAgeMonths,
      midParentalHeight: midParentalHeight ? `${Math.round(Number(midParentalHeight))} cm` : "",
      motherHeight: motherHeight ? `${motherHeight} cm` : "",
      fatherHeight: fatherHeight ? `${fatherHeight} cm` : "",
      gestationPeriod: gestationPeriod ? `${gestationPeriod} weeks` : "",
    },
  };
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

function VaccineContent({ data = { pending: [], given: [] } }) {
  const pending = React.useMemo(() => Array.isArray(data.pending) ? data.pending : [], [data.pending]);
  const given = React.useMemo(() => Array.isArray(data.given) ? data.given : [], [data.given]);
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

  if (!pending.length && !given.length) {
    return (
      <div className="snv-content-scroll" data-snv-scroll-root="true">
        <div className="snv-empty-state">No data recorded.</div>
      </div>
    );
  }

  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      {overdueCount > 0 ? (
        <article className="snv-date-card">
          <button type="button" className="snv-date-card-header" onClick={() => setExp((p) => ({ ...p, overdue: !p.overdue }))}>
            <span>{`Overdue Vaccines (${overdueCount})`}</span>
            {exp.overdue ? <ArrowSquareUp size={18} variant="Linear" /> : <ArrowSquareDown size={18} variant="Linear" />}
          </button>
          {exp.overdue ? (
            <div className="snv-date-card-body">
              {overdueGroups.map((g, i) => <VaccineWeekGroup key={`ov-${g.week}-${i}`} week={g.week} items={g.items} kind="overdue" />)}
            </div>
          ) : null}
        </article>
      ) : null}

      {upcomingCount > 0 ? (
        <article className="snv-date-card">
          <button type="button" className="snv-date-card-header" onClick={() => setExp((p) => ({ ...p, upcoming: !p.upcoming }))}>
            <span>{`Upcoming Vaccines (${upcomingCount})`}</span>
            {exp.upcoming ? <ArrowSquareUp size={18} variant="Linear" /> : <ArrowSquareDown size={18} variant="Linear" />}
          </button>
          {exp.upcoming ? (
            <div className="snv-date-card-body">
              {upcomingGroups.map((g, i) => <VaccineWeekGroup key={`up-${g.week}-${i}`} week={g.week} items={g.items} kind="upcoming" />)}
            </div>
          ) : null}
        </article>
      ) : null}

      {given.length > 0 ? (
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
      ) : null}
    </div>
  );
}

function OptalContent({ entries = [] }) {
  const firstEntryId = entries[0]?.id;
  const [expandedById, setExpandedById] = useState(() => defaultExpandedMap(firstEntryId));
  useEffect(() => { setExpandedById(defaultExpandedMap(firstEntryId)); }, [firstEntryId]);

  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      {entries.length === 0 ? (
        <div className="snv-empty-state">No data recorded.</div>
      ) : entries.map((entry) => {
        const expanded = Boolean(expandedById[entry.id]);
        return (
          <DateCard
            key={entry.id}
            title={entry.dateLabel}
            expanded={expanded}
            fresh={entry.fresh}
            onToggle={() => setExpandedById((prev) => ({ ...prev, [entry.id]: !expanded }))}
          >
            {entry.sections.map((section) => (
              <div key={section.id} className="snv-optal-subsection">
                <div className="snv-optal-subsection-title">
                  <span className="snv-optal-icon">{section.icon}</span>
                  <span>{section.title}</span>
                </div>
                <BulletList items={section.items} />
              </div>
            ))}
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
const WHO_OFC = {
  P03: [31.5, 41.0, 45.0, 46.5, 47.5, 48.2, 48.8],
  P10: [32.5, 42.0, 46.0, 47.4, 48.4, 49.1, 49.7],
  P50: [34.5, 44.0, 47.8, 49.2, 50.2, 50.9, 51.5],
  P90: [36.0, 45.5, 49.3, 50.7, 51.7, 52.4, 53.0],
  P97: [37.0, 46.5, 50.2, 51.6, 52.6, 53.3, 53.9],
};
const PCT_COLORS = {
  P97: "#f59e0b", P90: "#8b5cf6", P50: "#10b981", P10: "#6366f1", P03: "#ef4444",
};
const PCT_ORDER = ["P97", "P90", "P50", "P10", "P03"];

function makeWhoDatasets(whoData, visiblePercentiles = PCT_ORDER) {
  return PCT_ORDER.filter((key) => visiblePercentiles.includes(key)).map((key) => ({
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

function makeMeasurementDataset(entries, valueKey, label) {
  const data = entries
    .filter((entry) => entry.ageMonths !== null && hasGrowthMetricValue(entry[valueKey]))
    .map((entry) => ({
      x: entry.ageMonths,
      y: Number(entry[valueKey]),
    }));
  return data.length ? [{
    label,
    data,
    borderColor: "#312e81",
    backgroundColor: "#312e81",
    pointRadius: 3,
    pointHoverRadius: 4,
    showLine: true,
    borderWidth: 1.5,
    tension: 0.25,
  }] : [];
}

function makeHeightWeightDataset(entries) {
  const data = entries
    .filter((entry) => hasGrowthMetricValue(entry.height) && hasGrowthMetricValue(entry.weight))
    .map((entry) => ({
      x: Number(entry.height),
      y: Number(entry.weight),
    }));
  return data.length ? [{
    label: "Patient",
    data,
    borderColor: "#312e81",
    backgroundColor: "#312e81",
    pointRadius: 3,
    pointHoverRadius: 4,
    showLine: true,
    borderWidth: 1.5,
    tension: 0.25,
  }] : [];
}

function makeHeightWeightPercentileDatasets(visiblePercentiles = PCT_ORDER) {
  return PCT_ORDER.filter((key) => visiblePercentiles.includes(key)).map((key) => ({
    label: key.replace("P", "P "),
    data: GROWTH_AGE_MONTHS.map((_, index) => ({
      x: WHO_HEIGHT[key][index],
      y: WHO_WEIGHT[key][index],
    })),
    borderColor: PCT_COLORS[key],
    backgroundColor: "transparent",
    borderWidth: 1.5,
    pointRadius: 0,
    tension: 0.4,
    fill: false,
  }));
}

function formatGrowthAgeLabel(ageMonths, timelineUnit) {
  if (timelineUnit === "months") return `${ageMonths}m`;
  const yrs = Math.floor(ageMonths / 12);
  const mths = ageMonths % 12;
  return mths ? `${yrs}y ${mths}m` : `${yrs}y`;
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
      ctx.font = "500 10px Inter, sans-serif";
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
        ctx.font = "500 9px Inter, sans-serif";
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

function PercentileMenu({ visiblePercentiles, onToggle, onClose }) {
  return (
    <div className="snv-gwc-percentile-menu">
      <div className="snv-gwc-percentile-title">Enable/Disable percentile line</div>
      <div className="snv-gwc-percentile-options">
        {PCT_ORDER.map((key) => (
          <label key={key} className="snv-gwc-percentile-option">
            <input
              type="checkbox"
              checked={visiblePercentiles.includes(key)}
              onChange={() => onToggle(key)}
            />
            <span style={{ color: PCT_COLORS[key] }}>{key.replace("P", "P ")}</span>
          </label>
        ))}
      </div>
      <button type="button" className="snv-gwc-percentile-done" onClick={onClose}>
        Done
      </button>
    </div>
  );
}

function GrowthChartCard({ title, whoData, yLabel, ageMonths, entries = [], valueKey }) {
  const [timelineUnit, setTimelineUnit] = useState("years");
  const [isPercentileOpen, setIsPercentileOpen] = useState(false);
  const [visiblePercentiles, setVisiblePercentiles] = useState(PCT_ORDER);
  const ageLabel = React.useMemo(() => formatGrowthAgeLabel(ageMonths, timelineUnit), [ageMonths, timelineUnit]);
  const plugin = React.useMemo(() => makeGrowthPlugin(ageMonths, ageLabel), [ageMonths, ageLabel]);
  const patientDataset = React.useMemo(() => makeMeasurementDataset(entries, valueKey, "Patient"), [entries, valueKey]);
  const chartData = React.useMemo(() => ({
    datasets: [
      ...makeWhoDatasets(whoData, visiblePercentiles),
      ...patientDataset,
    ],
  }), [patientDataset, visiblePercentiles, whoData]);
  const maxAgeMonths = Math.max(
    36,
    ageMonths,
    ...entries
      .map((entry) => Number(entry.ageMonths))
      .filter(Number.isFinite)
  );
  const opts = React.useMemo(() => ({
    ...BASE_GROWTH_OPTS,
    scales: {
      ...BASE_GROWTH_OPTS.scales,
      x: {
        ...BASE_GROWTH_OPTS.scales.x,
        max: Math.ceil(maxAgeMonths / 6) * 6,
        ticks: {
          ...BASE_GROWTH_OPTS.scales.x.ticks,
          callback: (value) => timelineUnit === "months"
            ? `${value}`
            : value === 0
              ? "0y"
              : `${Number(value) / 12}y`,
        },
        title: {
          ...BASE_GROWTH_OPTS.scales.x.title,
          text: `Age in ${timelineUnit === "months" ? "Months" : "Years"}`,
        },
      },
      y: { ...BASE_GROWTH_OPTS.scales.y, title: { display: true, text: yLabel, color: "#9ca3af", font: { size: 9 } } },
    },
  }), [maxAgeMonths, timelineUnit, yLabel]);
  const handlePercentileToggle = useCallback((key) => {
    setVisiblePercentiles((current) => (
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    ));
  }, []);
  if (!patientDataset.length) return null;

  return (
    <div className="snv-gwc-card">
      <div className="snv-gwc-header">
        <span className="snv-gwc-title">{title}</span>
      </div>
      <div className="snv-gwc-controls">
        <button
          type="button"
          className="snv-gwc-pct-btn"
          onClick={() => setIsPercentileOpen((current) => !current)}
        >
          All Percentiles
          <ArrowDown2 size={11} variant="Linear" color="#454551" />
        </button>
        {isPercentileOpen ? (
          <PercentileMenu
            visiblePercentiles={visiblePercentiles}
            onToggle={handlePercentileToggle}
            onClose={() => setIsPercentileOpen(false)}
          />
        ) : null}
        <div className="snv-gwc-unit-toggle">
          <button
            type="button"
            className={`snv-gwc-unit-btn ${timelineUnit === "years" ? "snv-gwc-unit-active" : ""}`}
            onClick={() => setTimelineUnit("years")}
          >
            Yrs
          </button>
          <button
            type="button"
            className={`snv-gwc-unit-btn ${timelineUnit === "months" ? "snv-gwc-unit-active" : ""}`}
            onClick={() => setTimelineUnit("months")}
          >
            Mth
          </button>
        </div>
      </div>
      <div className="snv-gwc-chart">
        <Line data={chartData} options={opts} plugins={[plugin]} />
      </div>
    </div>
  );
}

function GrowthHeightWeightCard({ entries = [] }) {
  const [isPercentileOpen, setIsPercentileOpen] = useState(false);
  const [visiblePercentiles, setVisiblePercentiles] = useState(PCT_ORDER);
  const chartData = React.useMemo(() => ({
    datasets: [
      ...makeHeightWeightPercentileDatasets(visiblePercentiles),
      ...makeHeightWeightDataset(entries),
    ],
  }), [entries, visiblePercentiles]);
  const patientDataset = React.useMemo(() => makeHeightWeightDataset(entries), [entries]);
  const handlePercentileToggle = useCallback((key) => {
    setVisiblePercentiles((current) => (
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    ));
  }, []);
  if (!patientDataset.length) return null;

  const values = patientDataset[0].data;
  const maxHeight = Math.max(...values.map((item) => item.x), 120);
  const maxWeight = Math.max(...values.map((item) => item.y), 20);
  const opts = {
    ...BASE_GROWTH_OPTS,
    layout: { padding: { right: 12, top: 10 } },
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: Math.ceil(maxHeight / 20) * 20,
        ticks: { color: "#9ca3af", font: { size: 9 } },
        grid: { color: "rgba(0,0,0,0.06)" },
        title: { display: true, text: "Height (cm)", color: "#9ca3af", font: { size: 9 } },
      },
      y: {
        min: 0,
        max: Math.ceil(maxWeight / 5) * 5,
        ticks: { color: "#9ca3af", font: { size: 9 } },
        grid: { color: "rgba(0,0,0,0.06)" },
        title: { display: true, text: "Weight (kg)", color: "#9ca3af", font: { size: 9 } },
      },
    },
  };

  return (
    <div className="snv-gwc-card">
      <div className="snv-gwc-header">
        <span className="snv-gwc-title">Height vs Weight</span>
      </div>
      <div className="snv-gwc-controls">
        <button
          type="button"
          className="snv-gwc-pct-btn"
          onClick={() => setIsPercentileOpen((current) => !current)}
        >
          All Percentiles
          <ArrowDown2 size={11} variant="Linear" color="#454551" />
        </button>
        {isPercentileOpen ? (
          <PercentileMenu
            visiblePercentiles={visiblePercentiles}
            onToggle={handlePercentileToggle}
            onClose={() => setIsPercentileOpen(false)}
          />
        ) : null}
      </div>
      <div className="snv-gwc-chart">
        <Line data={chartData} options={opts} />
      </div>
    </div>
  );
}

function GrowthContent({ data }) {
  const { entries = [], info = {} } = data;
  const infoRows = [
    ["Mid-parental height", info.midParentalHeight],
    ["Mother", info.motherHeight],
    ["Father", info.fatherHeight],
    ["Gestation period", info.gestationPeriod],
  ].filter(([, value]) => hasValue(value));
  const hasMetricData = entries.some((entry) => (
    hasGrowthMetricValue(entry.height) ||
    hasGrowthMetricValue(entry.weight) ||
    hasGrowthMetricValue(entry.bmi) ||
    hasGrowthMetricValue(entry.ofc)
  ));
  if (!hasMetricData && !infoRows.length) {
    return (
      <div className="snv-content-scroll" data-snv-scroll-root="true">
        <div className="snv-empty-state">No data recorded.</div>
      </div>
    );
  }
  const ageMonths = Number.isFinite(info.ageMonths) ? info.ageMonths : 36;

  return (
    <div className="snv-content-scroll" data-snv-scroll-root="true">
      {infoRows.length > 0 ? (
        <div className="snv-date-card snv-growth-info-card">
          <div className="snv-date-card-header" style={{ cursor: "default" }}>
            <span>Growth Info</span>
          </div>
          <div className="snv-date-card-body snv-growth-info-rows">
            {infoRows.map(([label, value]) => (
            <div key={label} className="snv-growth-info-row">
              <span className="snv-kv-label">{label}</span>
              <span className="snv-kv-value">{value}</span>
            </div>
            ))}
          </div>
        </div>
      ) : null}
      <GrowthChartCard title="Height for Age" whoData={WHO_HEIGHT} yLabel="Height (cm)" ageMonths={ageMonths} entries={entries} valueKey="height" />
      <GrowthChartCard title="Weight for Age" whoData={WHO_WEIGHT} yLabel="Weight (kg)" ageMonths={ageMonths} entries={entries} valueKey="weight" />
      <GrowthChartCard title="BMI for Age" whoData={WHO_BMI} yLabel="BMI (kg/m²)" ageMonths={ageMonths} entries={entries} valueKey="bmi" />
      <GrowthChartCard title="Head Circumference (OFC)" whoData={WHO_OFC} yLabel="OFC (cm)" ageMonths={ageMonths} entries={entries} valueKey="ofc" />
      <GrowthHeightWeightCard entries={entries} />
    </div>
  );
}

function PrivateNotesContent({ value, onChange, showVoiceRx }) {
  return (
    <div className="snv-content-scroll snv-private-notes-content" data-snv-scroll-root="true">
      <div className="snv-private-note-wrap">
        <textarea
          className="snv-private-note-input"
          placeholder="Write private notes..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {showVoiceRx ? (
          <span className="snv-private-note-voice" aria-hidden="true">
            <VoiceRxIcon size={22} color="#8B3FD1" />
          </span>
        ) : null}
      </div>
      <div className="snv-private-note-hint">
        <span className="snv-private-note-hint-icon">!</span>
        <span>This note will only be visible to you and will not be printed. You will be able to see it in Patient Details.</span>
      </div>
    </div>
  );
}

function SectionContent({ activeId, viewData, pastVisitsState, privateNotesValue, onPrivateNotesChange, onCopyPayload, showVoiceRx }) {
  switch (activeId) {
    case "pastVisits":
      return (
        <PastVisitsContent
          visits={viewData.pastVisits}
          hasMore={pastVisitsState.hasMore}
          loading={pastVisitsState.loading}
          onLoadMore={pastVisitsState.onLoadMore}
          onExpand={pastVisitsState.onExpand}
          onCopyPayload={onCopyPayload}
        />
      );
    case "vitals":
      return <DateRowsContent entries={viewData.vitals} />;
    case "history":
      return <HistoryContent sections={viewData.history} />;
    case "labResults":
      return <DateRowsContent entries={viewData.labResults} />;
    case "medicalRecords":
      return <RecordsContent records={viewData.medicalRecords} rawDocs={viewData.medicalRecordsRawDocs} uploadDocCategories={viewData.medicalRecordsCategories} />;
    case "gynec":
      return <SectionCardsContent sections={viewData.gynec} />;
    case "obstetric":
      return <ObstetricContent sections={viewData.obstetric} />;
    case "vaccine":
      return <VaccineContent data={viewData.vaccine} />;
    case "growth":
      return <GrowthContent data={viewData.growth} />;
    case "optal":
      return <OptalContent entries={viewData.optal} />;
    case "personalNotes":
      return <PrivateNotesContent value={privateNotesValue} onChange={onPrivateNotesChange} showVoiceRx={showVoiceRx} />;
    default:
      return <div className="snv-empty-state">No data recorded.</div>;
  }
}

function sectionActionLabel(activeId, actionLabels = {}) {
  if (actionLabels[activeId]) return actionLabels[activeId];
  if (activeId === "medicalRecords") return "Add New Records";
  return "Add/Edit Details";
}

function sectionVoiceLabel(activeId) {
  const title = SECTION_TITLES[activeId] || "Details";
  return title.replace(/\s+History$/i, "").replace(/^Medical\s+/, "").trim() || "Details";
}

function SectionActionRow({ activeId, voiceState, onVoiceClick, onActionClick, actionLabels, hidePlusIcon, voiceEnabled, voiceLocked }) {
  if (activeId === "pastVisits" || activeId === "personalNotes" || activeId === "optal") return null;
  const status = voiceState?.status || "idle";
  const busy = status === "recording" || status === "transcribing" || status === "digitizing";
  const disabled = busy || voiceLocked;
  const label = sectionActionLabel(activeId, actionLabels);

  return (
    <div className="snv-action-row">
      <button
        type="button"
        className="snv-add-details-btn vrx-cn-secondary-blue"
        onClick={() => onActionClick(activeId)}
      >
        {!hidePlusIcon ? <span className="snv-add-plus" aria-hidden="true" /> : null}
        <span>{label}</span>
      </button>
      {voiceEnabled ? (
        <button
          type="button"
          className="snv-voice-cta-btn vrx-rt-voice-cta-outline"
          onClick={disabled ? undefined : onVoiceClick}
          disabled={disabled}
          aria-label={`Use Voice AI to fill ${label.toLowerCase()}`}
          title={`Use Voice AI to fill ${label.toLowerCase()}`}
        >
          <VoiceRxIcon size={20} color="#673AAC" />
        </button>
      ) : null}
    </div>
  );
}


function SectionPanel({ activeId, onClose, onNavigate, transitionDir, voiceState, onVoiceClick, onVoiceRecorderSubmit, onVoiceCancel, onVoiceOverlayClose, viewData, pastVisitsState, onActionClick, actionLabels, actionHidePlusIcons, privateNotesValue, onPrivateNotesChange, onCopyPayload, voiceEnabled, voiceLocked, showVoiceRx }) {
  const title = SECTION_TITLES[activeId] || "Section";
  const containerRef = useRef(null);
  const voiceStatus = voiceState?.status;
  const overlayActive = voiceState && !["idle", "done"].includes(voiceStatus);
  const voiceRecorderVisible = overlayActive;
  const isAwaitingResponse = voiceStatus === "transcribing" || voiceStatus === "digitizing";
  const processingLabel = voiceStatus === "transcribing" ? "Refining your captured consultation..." : voiceStatus === "digitizing" ? "Filling section…" : undefined;

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
      <SectionActionRow
        activeId={activeId}
        voiceState={voiceState}
        onVoiceClick={onVoiceClick}
        onActionClick={onActionClick}
        actionLabels={actionLabels}
        hidePlusIcon={actionHidePlusIcons?.[activeId]}
        voiceEnabled={voiceEnabled}
        voiceLocked={voiceLocked}
      />
      <div key={activeId} className={`snv-section-anim ${transitionDir ? `snv-section-${transitionDir}` : ""}`}>
        <SectionContent
          activeId={activeId}
          viewData={viewData}
          pastVisitsState={pastVisitsState}
          privateNotesValue={privateNotesValue}
          onPrivateNotesChange={onPrivateNotesChange}
          onCopyPayload={onCopyPayload}
          showVoiceRx={showVoiceRx}
        />
      </div>
      {showVoiceRx && voiceRecorderVisible && (
        <div className="snv-vrx-overlay" data-dr-agent="true" data-voice-allow="true">
          <VoiceRecorderCore
            layout="overlay"
            variant="stack"
            fillHeight
            sectionLabel={sectionVoiceLabel(activeId)}
            showSectionInStatus
            isAwaitingResponse={isAwaitingResponse}
            processingLabel={processingLabel}
            error={voiceStatus === "error" ? (voiceState?.error || "Voice processing failed.") : null}
            onClose={onVoiceOverlayClose}
            onCancel={onVoiceCancel}
            onSubmit={onVoiceRecorderSubmit}
          />
        </div>
      )}
    </section>
  );
}

function createSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `snv_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}


export function SideNavbar({
  onSectionSelect,
  onSectionAction,
  patientId,
  doctorId,
  labParamsData: labParamsDataProp,
  gynecHistory: gynecHistoryProp,
  vaccineRefreshKey = 0,
  growthRefreshKey = 0,
  opthalRefreshKey = 0,
  customizedPadLeftList = [],
  isOpthalModuleAccessible = false,
  isVaccinationAccessable = false,
  isGrowthChartAccessable = false,
  isGynaecHistoryAccessable = false,
  showVoiceRx = true,
}) {
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState("pastVisits");
  const [transitionDir, setTransitionDir] = useState(null);
  const [voiceBySection, setVoiceBySection] = useState({});
  const { activeVoiceModule, runCopyWithAura } = useRxPadSync();
  const [digitizedOverrides, setDigitizedOverrides] = useState({});
  const [pastVisitRows, setPastVisitRows] = useState([]);
  const [pastVisitDetails, setPastVisitDetails] = useState({});
  const [pastVisitLoadingIds, setPastVisitLoadingIds] = useState({});
  const [pastVisitsPage, setPastVisitsPage] = useState(1);
  const [pastVisitsTotalPages, setPastVisitsTotalPages] = useState(1);
  const [isPastVisitsLoading, setIsPastVisitsLoading] = useState(false);
  const [hasPastVisitsLoaded, setHasPastVisitsLoaded] = useState(false);
  const [patientVaccineRows, setPatientVaccineRows] = useState([]);
  const [vaccineTemplateRows, setVaccineTemplateRows] = useState([]);
  const [opthalPrescriptionRows, setOpthalPrescriptionRows] = useState([]);
  const [growthChartRows, setGrowthChartRows] = useState([]);
  const [growthParentalDetails, setGrowthParentalDetails] = useState(null);
  const vaccineRequestRef = useRef(0);
  const opthalRequestRef = useRef(0);
  const growthRequestRef = useRef(0);
  const pastVisitsRequestRef = useRef(0);
  const voiceDelayTimerRef = useRef(null);
  const medicalHistoryDefaultListRequestedRef = useRef(false);
  const emptyPastVisitsAutoSelectRef = useRef(false);
  const activePatientRef = useRef(patientId);
  const { vitalsPastList, patientBirthWeight } = useSelector((state) => state.vitals);
  const { allUploadedDocs = [], uploadDocCategories = [] } = useSelector((state) => state.uploadDoc);
  const obstetricRawDetails = useSelector((state) => state.obstetric?.obstetricDetails);
  const { defaultList: medicalHistoryDefaultList = [], loading: medicalHistoryLoading } = useSelector((state) => state.medicalhistory);
  const { isPediatricAccessable } = useAccess();
  const {
    vitalsData = [],
    setVitalsData,
    medicalHistoryData = [],
    setMedicalHistoryData,
    setLabParamsData,
    patient_data: patientData,
    tcmId,
    pamId,
    privateNotesData,
    setPrivateNotesData,
  } = useContext(CashManagerContext) || {};
  useEffect(() => {
    activePatientRef.current = patientId;
  }, [patientId]);

  useEffect(() => {
    if (medicalHistoryDefaultList?.length || medicalHistoryLoading || medicalHistoryDefaultListRequestedRef.current) return;
    medicalHistoryDefaultListRequestedRef.current = true;
    dispatch(listSectionwithTag());
  }, [dispatch, medicalHistoryDefaultList, medicalHistoryLoading]);

  useEffect(() => () => {
    if (voiceDelayTimerRef.current) {
      window.clearTimeout(voiceDelayTimerRef.current);
    }
  }, []);

  useEffect(() => {
    const patientPid = patientData?.pm_pid || patientData?.vac_pid;
    const patientDob = parsePatientDobForVaccines(patientData);
    const requestId = vaccineRequestRef.current + 1;
    vaccineRequestRef.current = requestId;

    setPatientVaccineRows([]);
    setVaccineTemplateRows([]);

    if (!patientId || !patientPid) return;

    const fetchVaccines = async () => {
      try {
        const [patientTemplates, standardTemplates, overridenVaccines, vaccineBrands] = await Promise.all([
          getPatientVaccineDetails(patientId, patientPid),
          getVaccineTemplates(),
          getOverridenDueDate(patientId, patientPid),
          getVaccineBrands(),
        ]);
        if (vaccineRequestRef.current !== requestId) return;
        const mergedTemplates = mergeDataPatientDetails(
          Array.isArray(standardTemplates) ? standardTemplates : [],
          Array.isArray(patientTemplates) ? patientTemplates : [],
          Array.isArray(overridenVaccines) ? overridenVaccines : [],
          Array.isArray(vaccineBrands) ? vaccineBrands : [],
          patientDob
        );
        setPatientVaccineRows(Array.isArray(patientTemplates) ? patientTemplates : []);
        setVaccineTemplateRows(Array.isArray(mergedTemplates) ? mergedTemplates : []);
      } catch (error) {
        if (vaccineRequestRef.current !== requestId) return;
        setPatientVaccineRows([]);
        setVaccineTemplateRows([]);
        console.error("[SideNavbar][Vaccines] failed to fetch patient vaccines:", error);
      }
    };

    fetchVaccines();
  }, [patientId, patientData?.DOB, patientData?.dob, patientData?.patient_dob, patientData?.pm_dob, patientData?.pm_pid, patientData?.vac_dob, patientData?.vac_pid, vaccineRefreshKey]);

  useEffect(() => {
    const requestId = opthalRequestRef.current + 1;
    opthalRequestRef.current = requestId;
    setOpthalPrescriptionRows([]);

    if (!patientId) return;

    const fetchOpthalPrescriptions = async () => {
      try {
        const response = await getAllOpthalPrescriptions({ patientId });
        if (opthalRequestRef.current !== requestId) return;
        const payload = response?.data ?? response;
        const rows = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.prescriptions)
              ? payload.prescriptions
              : [];
        setOpthalPrescriptionRows(rows);
      } catch (error) {
        if (opthalRequestRef.current !== requestId) return;
        setOpthalPrescriptionRows([]);
        console.error("[SideNavbar][Ophthal] failed to fetch prescriptions:", error);
      }
    };

    fetchOpthalPrescriptions();
  }, [patientId, opthalRefreshKey]);

  useEffect(() => {
    const requestId = growthRequestRef.current + 1;
    growthRequestRef.current = requestId;
    setGrowthChartRows([]);
    setGrowthParentalDetails(null);

    const pmId = patientData?.pm_id || patientData?.pmId;
    const pmPid = patientData?.pm_pid || patientData?.patient_id || patientData?.pmPid;
    if (!pmId || !pmPid) return;

    const fetchGrowthData = async () => {
      try {
        const [growthRows, parentalDetails] = await Promise.all([
          getAllGrowthChartParams({ pm_id: pmId, pm_pid: pmPid }),
          getParentalDetails(pmId, pmPid),
        ]);
        if (growthRequestRef.current !== requestId) return;
        const growthPayload = growthRows?.data ?? growthRows;
        const parentalPayload = parentalDetails?.data ?? parentalDetails;
        setGrowthChartRows(Array.isArray(growthPayload) ? growthPayload : []);
        setGrowthParentalDetails(parentalPayload || null);
      } catch (error) {
        if (growthRequestRef.current !== requestId) return;
        setGrowthChartRows([]);
        setGrowthParentalDetails(null);
        console.error("[SideNavbar][Growth] failed to fetch growth data:", error);
      }
    };

    fetchGrowthData();
  }, [growthRefreshKey, patientData?.patient_id, patientData?.pm_id, patientData?.pm_pid, patientData?.pmId, patientData?.pmPid]);

  const fetchPastVisitsPage = useCallback(async (page = 1) => {
    if (!patientId) return;
    const requestId = pastVisitsRequestRef.current + 1;
    pastVisitsRequestRef.current = requestId;
    setIsPastVisitsLoading(true);
    try {
      const response = await ApiCaseManager.listConsultations({
        patient_unique_id: patientId,
        limit: SIDE_NAV_BATCH_SIZE,
        page,
      });
      if (pastVisitsRequestRef.current !== requestId) return;
      const payload = response?.status ? response?.data : {};
      const consultations = Array.isArray(payload?.consultations) ? payload.consultations : [];
      const pagination = payload?.pagination || {};
      setPastVisitRows((prev) => {
        if (page === 1) return consultations;
        const existingIds = new Set(prev.map((item) => item?.tcm_id || item?.tcmId));
        const nextRows = consultations.filter((item) => !existingIds.has(item?.tcm_id || item?.tcmId));
        return [...prev, ...nextRows];
      });
      setPastVisitsPage(pagination.currentPage || page);
      setPastVisitsTotalPages(pagination.totalPages || page);
    } catch (error) {
      console.error("[SideNavbar][PastVisits] failed to fetch consultations:", error);
    } finally {
      if (pastVisitsRequestRef.current === requestId) {
        setIsPastVisitsLoading(false);
        if (page === 1) setHasPastVisitsLoaded(true);
      }
    }
  }, [patientId]);

  useEffect(() => {
    setPastVisitRows([]);
    setPastVisitDetails({});
    setPastVisitLoadingIds({});
    setPastVisitsPage(1);
    setPastVisitsTotalPages(1);
    setHasPastVisitsLoaded(false);
    emptyPastVisitsAutoSelectRef.current = false;
    pastVisitsRequestRef.current += 1;
    if (patientId) {
      fetchPastVisitsPage(1);
    } else {
      setHasPastVisitsLoaded(true);
    }
  }, [fetchPastVisitsPage, patientId]);

  const fetchPastVisitDetail = useCallback(async (visit) => {
    const tcmId = visit?.tcmId;
    if (!patientId || !tcmId || pastVisitDetails[tcmId] || pastVisitLoadingIds[tcmId]) return;
    const patientAtRequest = patientId;
    setPastVisitLoadingIds((prev) => ({ ...prev, [tcmId]: true }));
    try {
      const response = await ApiCaseManager.viewCaseManager({
        patient_unique_id: patientAtRequest,
        tcm_id: tcmId,
      });
      if (response?.status && response?.data) {
        if (patientAtRequest !== activePatientRef.current) return;
        const printPayload = await fetchPastVisitPrintPayload(response.data.print_url, response.data);
        if (patientAtRequest !== activePatientRef.current) return;
        const enrichedDetail = {
          ...response.data,
          printPayload,
          smartDigitizeRxData: response.data.smartDigitizeRxData || printPayload?.smartDigitizeRxData,
        };
        setPastVisitDetails((prev) => ({ ...prev, [tcmId]: enrichedDetail }));
      }
    } catch (error) {
      console.error("[SideNavbar][PastVisits] failed to fetch consultation detail:", error);
    } finally {
      setPastVisitLoadingIds((prev) => ({ ...prev, [tcmId]: false }));
    }
  }, [pastVisitDetails, pastVisitLoadingIds, patientId]);

  const legacyPastVisitEntries = useMemo(
    () => pastVisitRows.map((row) => {
      const tcmId = row?.tcm_id || row?.tcmId;
      const entry = buildPastVisitEntry(row, pastVisitDetails[tcmId]);
      const hasRenderableData = entry.digitalRx ||
        entry.writtenRx?.length ||
        entry.transcriptBlocks?.length;
      return {
        ...entry,
        detailLoading: Boolean(pastVisitLoadingIds[tcmId]) && !hasRenderableData,
      };
    }),
    [pastVisitRows, pastVisitDetails, pastVisitLoadingIds]
  );
  const legacyVitalsEntries = useMemo(() => buildLegacyVitalsEntries({
    vitalsData,
    vitalsPastList,
    patientBirthWeight,
    patientData,
    isPediatricAccessable,
  }), [vitalsData, vitalsPastList, patientBirthWeight, patientData, isPediatricAccessable]);
  const legacyHistorySections = useMemo(
    () => buildLegacyMedicalHistorySections(medicalHistoryData),
    [medicalHistoryData]
  );
  const legacyLabEntries = useMemo(
    () => buildLegacyLabEntries(labParamsDataProp),
    [labParamsDataProp]
  );
  const legacyMedicalRecords = useMemo(
    () => buildLegacyMedicalRecords(allUploadedDocs, uploadDocCategories),
    [allUploadedDocs, uploadDocCategories]
  );
  const legacyGynecSections = useMemo(
    () => {
      const sections = buildLegacyGynecSections(gynecHistoryProp);
      console.log("[SideNavbar][Gynec] active patient:", patientId);
      console.log("[SideNavbar][Gynec] incoming gynecHistory prop:", gynecHistoryProp);
      console.log("[SideNavbar][Gynec] mapped gynec sections:", sections);
      return sections;
    },
    [gynecHistoryProp, patientId]
  );
  const legacyObstetricSections = useMemo(
    () => buildLegacyObstetricSections(obstetricRawDetails),
    [obstetricRawDetails]
  );
  const legacyVaccineData = useMemo(
    () => buildLegacyVaccineData(patientVaccineRows, vaccineTemplateRows),
    [patientVaccineRows, vaccineTemplateRows]
  );
  const legacyOpthalEntries = useMemo(
    () => buildLegacyOpthalEntries(opthalPrescriptionRows),
    [opthalPrescriptionRows]
  );
  const legacyGrowthData = useMemo(
    () => buildLegacyGrowthData(growthChartRows, growthParentalDetails, patientData),
    [growthChartRows, growthParentalDetails, patientData]
  );
  const privateNotesValue = typeof privateNotesData === "string" ? privateNotesData : privateNotesData?.notes || "";
  const handlePrivateNotesChange = useCallback((notes) => {
    if (!setPrivateNotesData) return;
    if (!notes.trim()) {
      setPrivateNotesData(privateNotesData?.id !== undefined ? { ...privateNotesData, notes } : null);
      return;
    }
    setPrivateNotesData({
      ...(typeof privateNotesData === "object" && privateNotesData ? privateNotesData : {}),
      id: privateNotesData?.id,
      notes,
    });
  }, [privateNotesData, setPrivateNotesData]);
  const viewData = useMemo(() => buildViewData(digitizedOverrides, {
    pastVisits: legacyPastVisitEntries,
    vitals: legacyVitalsEntries,
    history: legacyHistorySections,
    labResults: legacyLabEntries,
    medicalRecords: legacyMedicalRecords.length ? legacyMedicalRecords : undefined,
    medicalRecordsRawDocs: allUploadedDocs,
    medicalRecordsCategories: uploadDocCategories,
    gynec: legacyGynecSections,
    obstetric: legacyObstetricSections,
    vaccine: legacyVaccineData,
    optal: legacyOpthalEntries,
    growth: legacyGrowthData,
  }), [digitizedOverrides, legacyPastVisitEntries, legacyVitalsEntries, legacyHistorySections, legacyLabEntries, legacyMedicalRecords, allUploadedDocs, uploadDocCategories, legacyGynecSections, legacyObstetricSections, legacyVaccineData, legacyOpthalEntries, legacyGrowthData]);

  const pastVisitsState = useMemo(() => ({
    loading: isPastVisitsLoading,
    hasMore: pastVisitsPage < pastVisitsTotalPages,
    onLoadMore: () => {
      if (!isPastVisitsLoading && pastVisitsPage < pastVisitsTotalPages) {
        fetchPastVisitsPage(pastVisitsPage + 1);
      }
    },
    onExpand: fetchPastVisitDetail,
  }), [fetchPastVisitDetail, fetchPastVisitsPage, isPastVisitsLoading, pastVisitsPage, pastVisitsTotalPages]);

  const handlePastVisitCopyPayload = useCallback((payload, opts) => {
    runCopyWithAura(payload, opts);
  }, [runCopyWithAura]);

  const actionLabels = useMemo(() => ({
    vitals: "Add/Edit Details",
    history: "Add/Edit Details",
    labResults: labParamsDataProp?.length > 0 ? "View All" : "Add/Edit Details",
    medicalRecords: allUploadedDocs.length > 0 ? "View All" : "Add/Edit Details",
    gynec: "Add/Edit Details",
    obstetric: "Add/Edit Details",
    vaccine: "Add/Edit Details",
    optal: "Add/Edit Details",
    growth: "Add/Edit Details",
  }), [
    allUploadedDocs.length,
    labParamsDataProp?.length,
  ]);

  const actionHidePlusIcons = useMemo(() => ({
    labResults: labParamsDataProp?.length > 0,
    medicalRecords: allUploadedDocs.length > 0,
  }), [allUploadedDocs.length, labParamsDataProp?.length]);

  const navItems = useMemo(() => {
    const seen = new Set(["pastVisits", "vitals", "history"]);
    const orderedItems = [NAV_ITEM_BY_ID.pastVisits, NAV_ITEM_BY_ID.vitals, NAV_ITEM_BY_ID.history];
    const access = {
      isVaccinationAccessable,
      isGrowthChartAccessable,
      isGynaecHistoryAccessable,
    };

    (customizedPadLeftList || []).forEach((item) => {
      const navId = getCustomizedPadNavId(item, access);
      if (navId === "growth") return;
      if (!navId || seen.has(navId) || !NAV_ITEM_BY_ID[navId]) return;
      seen.add(navId);
      orderedItems.push(NAV_ITEM_BY_ID[navId]);
    });

    if (isOpthalModuleAccessible && !seen.has("optal")) {
      seen.add("optal");
      orderedItems.push(NAV_ITEM_BY_ID.optal);
    }
    if (isGrowthChartAccessable && !seen.has("growth")) {
      seen.add("growth");
      orderedItems.push(NAV_ITEM_BY_ID.growth);
    }

    return orderedItems;
  }, [
    customizedPadLeftList,
    isGynaecHistoryAccessable,
    isGrowthChartAccessable,
    isOpthalModuleAccessible,
    isVaccinationAccessable,
  ]);

  const navSequence = useMemo(() => navItems.map((item) => item.id), [navItems]);
  const firstCustomizedNavId = useMemo(
    () => navSequence.find((id) => id !== "pastVisits") || null,
    [navSequence]
  );

  const handleSectionAction = useCallback((sectionId) => {
    if (onSectionAction) {
      onSectionAction(sectionId);
      return;
    }
    console.log("[sideNavbar] add/edit details clicked", { sectionId });
  }, [onSectionAction]);

  const setActiveSection = useCallback((id, dir = null) => {
    setTransitionDir(dir);
    setActiveId(id);
    if (onSectionSelect) onSectionSelect(id);
  }, [onSectionSelect]);

  useEffect(() => {
    if (!activeId || navSequence.includes(activeId)) return;
    setActiveSection(firstCustomizedNavId || "pastVisits", null);
  }, [activeId, firstCustomizedNavId, navSequence, setActiveSection]);

  useEffect(() => {
    if (!hasPastVisitsLoaded || isPastVisitsLoading || activeId !== "pastVisits") return;
    if (legacyPastVisitEntries.length > 0 || !firstCustomizedNavId || emptyPastVisitsAutoSelectRef.current) return;
    emptyPastVisitsAutoSelectRef.current = true;
    setActiveSection(firstCustomizedNavId, null);
  }, [
    activeId,
    firstCustomizedNavId,
    hasPastVisitsLoaded,
    isPastVisitsLoading,
    legacyPastVisitEntries.length,
    setActiveSection,
  ]);

  const handleSelect = (id) => {
    const next = activeId === id ? null : id;
    setActiveSection(next, null);
  };

  const handleClose = () => {
    setActiveSection(null, null);
  };

  const handleNavigate = useCallback((dir) => {
    const currentIndex = navSequence.indexOf(activeId);
    if (currentIndex === -1) return;
    const nextIndex = dir === "next" ? currentIndex + 1 : currentIndex - 1;
    const next = navSequence[nextIndex];
    if (!next) return;
    setActiveSection(next, dir);
  }, [activeId, navSequence, setActiveSection]);

  const updateVoiceState = useCallback((sectionId, patch) => {
    setVoiceBySection((prev) => ({
      ...prev,
      [sectionId]: { ...(prev[sectionId] || {}), ...patch },
    }));
  }, []);

  const applySideNavVoiceResult = useCallback((sectionId, result) => {
    if (sectionId === "vitals" && result?.vitals && sideNavObjectHasContent(result.vitals, ["date"])) {
      setVitalsData?.((prev = []) => [result.vitals, ...prev]);
      setDigitizedOverrides((prev) => ({ ...prev, vitals: result.vitals }));
      return;
    }

    if (sectionId === "history" && Array.isArray(result?.history) && result.history.length > 0) {
      setMedicalHistoryData?.((prev = []) => {
        const defaultSource = medicalHistoryDefaultList?.length ? medicalHistoryDefaultList : prev;
        const mappedHistory = mapSideNavMedicalHistoryIdsFromDefaultList(result.history, defaultSource);
        return mergeSideNavMedicalHistorySections(prev, mappedHistory);
      });
      return;
    }

    if (sectionId === "labResults" && Array.isArray(result?.labResults) && result.labResults.length > 0) {
      const entry = {
        date: moment().format("YYYY-MM-DD"),
        inputs: result.labResults.map((item) => ({
          testName: item.investigation_name,
          value: item.value || item.result || item.note || "--",
          units: item.unit || item.units || "",
          arrowDirection: item.arrowDirection || item.direction || "",
        })),
      };
      setLabParamsData?.((prev = []) => [entry, ...prev]);
      setDigitizedOverrides((prev) => ({ ...prev, labResults: { lab_investigations: result.labResults } }));
    }
  }, [medicalHistoryDefaultList, setLabParamsData, setMedicalHistoryData, setVitalsData]);

  const transcribeSectionAudio = useCallback(async (sectionId, audioBlob) => {
    if (!SIDE_NAV_SUPPORTED_VOICE_SECTIONS.has(sectionId)) {
      return;
    }
    updateVoiceState(sectionId, { status: "recording", error: "", transcript: "", digitizedSummary: "" });
    if (voiceDelayTimerRef.current) {
      window.clearTimeout(voiceDelayTimerRef.current);
    }
    voiceDelayTimerRef.current = window.setTimeout(() => {
      updateVoiceState(sectionId, { status: "digitizing", error: "", transcript: "", digitizedSummary: "" });
    }, SIDE_NAV_SHINER_DELAY_MS);

    try {
      const result = await requestSideNavModuleDigitise({
        sectionId,
        audioBlob,
        patientId,
        doctorId,
        sessionId: tcmId && Number(tcmId) !== 0 ? tcmId : pamId || createSessionId(),
      });
      if (voiceDelayTimerRef.current) {
        window.clearTimeout(voiceDelayTimerRef.current);
        voiceDelayTimerRef.current = null;
      }
      applySideNavVoiceResult(sectionId, result);
      updateVoiceState(sectionId, {
        status: "done",
        transcript: "",
        digitizedSummary: JSON.stringify(result, null, 2),
        error: "",
      });
    } catch (error) {
      if (voiceDelayTimerRef.current) {
        window.clearTimeout(voiceDelayTimerRef.current);
        voiceDelayTimerRef.current = null;
      }
      console.error("[sideNavbar] voice processing failed", { sectionId, error });
      toast.error(error?.message || "Voice processing failed.");
      updateVoiceState(sectionId, { status: "idle", error: "", transcript: "", digitizedSummary: "" });
    }
  }, [applySideNavVoiceResult, doctorId, pamId, patientId, tcmId, updateVoiceState]);

  const handleVoiceClick = useCallback(() => {
    if (!activeId) return;
    if (!SIDE_NAV_SUPPORTED_VOICE_SECTIONS.has(activeId)) return;
    if (activeVoiceModule) return;
    const existing = voiceBySection[activeId]?.status;
    if (existing === "recording" || existing === "transcribing" || existing === "digitizing") return;
    updateVoiceState(activeId, { status: "recording", error: "", transcript: "", digitizedSummary: "" });
  }, [activeId, activeVoiceModule, voiceBySection, updateVoiceState]);

  const handleVoiceRecorderSubmit = useCallback(({ audioBlob } = {}) => {
    if (activeId) return transcribeSectionAudio(activeId, audioBlob);
    return Promise.resolve();
  }, [activeId, transcribeSectionAudio]);

  const handleVoiceCancel = useCallback(() => {
    if (!activeId) return;
    if (voiceDelayTimerRef.current) {
      window.clearTimeout(voiceDelayTimerRef.current);
      voiceDelayTimerRef.current = null;
    }
    updateVoiceState(activeId, { status: "idle", error: "", transcript: "", digitizedSummary: "" });
  }, [activeId, updateVoiceState]);

  const handleVoiceOverlayClose = useCallback(() => {
    if (!activeId) return;
    if (voiceDelayTimerRef.current) {
      window.clearTimeout(voiceDelayTimerRef.current);
      voiceDelayTimerRef.current = null;
    }
    updateVoiceState(activeId, { status: "idle", error: "", transcript: "", digitizedSummary: "" });
  }, [activeId, updateVoiceState]);

  return (
    <aside className="snv-root" data-side-navbar="true">
      <NavPanel activeId={activeId} onSelect={handleSelect} items={navItems} />
      {activeId ? (
        <SectionPanel
          activeId={activeId}
          onClose={handleClose}
          onNavigate={handleNavigate}
          transitionDir={transitionDir}
          voiceState={voiceBySection[activeId]}
          onVoiceClick={handleVoiceClick}
          onVoiceRecorderSubmit={handleVoiceRecorderSubmit}
          onVoiceCancel={handleVoiceCancel}
          onVoiceOverlayClose={handleVoiceOverlayClose}
          viewData={viewData}
          pastVisitsState={pastVisitsState}
          onActionClick={handleSectionAction}
          actionLabels={actionLabels}
          actionHidePlusIcons={actionHidePlusIcons}
          privateNotesValue={privateNotesValue}
          onPrivateNotesChange={handlePrivateNotesChange}
          onCopyPayload={handlePastVisitCopyPayload}
          voiceEnabled={showVoiceRx && SIDE_NAV_SUPPORTED_VOICE_SECTIONS.has(activeId)}
          voiceLocked={!!activeVoiceModule}
          showVoiceRx={showVoiceRx}
        />
      ) : null}
    </aside>
  );
}

export { SIDE_NAVBAR_DIGITIZATION_RESPONSE_CONTRACT };

export default SideNavbar;
