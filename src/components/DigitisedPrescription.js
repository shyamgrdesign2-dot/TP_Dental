import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import GenRXLoaders from "./GenRxLoaders";
import { AutoComplete, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { searchMedication } from "../redux/medicationSlice";
import { searchInvestigation } from "../redux/investigationSlice";
import CustomMedicinePopup from "./CustomMedicinePopup";
import CustomModuleRichTextEditor from "./CustomModuleRichTextEditor";
import CommonModal from "../common/CommonModal";
import VitalsRichTextEditor from "./VitalsRichTextEditor";
import SymptomsRichTextEditor from "./SymptomsRichTextEditor";
import MedicalHistoryRichTextEditor from "./MedicalHistoryRichTextEditor";
import ExaminationRichTextEditor from "./ExaminationRichTextEditor";
import DiagnosisRichTextEditor from "./DiagnosisRichTextEditor";
import AdviceRichTextEditor from "./AdviceRichTextEditor";
import VaccinationsRichTextEditor from "./VaccinationsRichTextEditor";
import LabResultsRichTextEditor from "./LabResultsRichTextEditor";
import FollowUpRichTextEditor from "./FollowUpRichTextEditor";
import AdditionalNotesRichTextEditor from "./AdditionalNotesRichTextEditor";
import ApiMedication from "../api/services/ApiMedication";
import ApiInvestigation from "../api/services/ApiInvestigation";
import { useGrounding } from "../hooks/useGrounding";
import { getTokenData, getHmTypeIndicator } from "../utils/utils";
import { env } from "../EnvironmentConfig";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { GB_APOLLO_DISABLE_FEATURE, GB_ZYDUS_USER } from "../utils/constants";
import MedicationsTable from "./MedicationsTable";
import LabInvestigationTable from "./LabInvestigationTable";
import config from "../config";
import styles from "./ConsultationDrawer.module.css";
import alertIcon from "../assets/images/alertIcon.svg";
import documentIcon from "../assets/images/document-normal.svg";
import warningIcon from "../assets/images/danger.svg";
import genRxBg from "../assets/images/gen-rx-bg.gif";

export const ARRAY_SECTIONS = [
  "symptoms",
  "medicalHistory",
  "examinations",
  "diagnosis",
  "medications",
  "labInvestigation",
  "vaccinations",
  "advice",
  "followUp",
  "dynamicFields",
  "others",
  "labResults"
];

export const normalizeNewItem = (type, text = "") => {
  const t = (text ?? "").trim();

  if (type === "advice") return t;

  if (type === "medications") {
    return {
      name: t,
      groundedMedicineName: t,
      refinedName: t,
      frequency: "",
      dosage: "",
      schedule: "",
      duration: "",
      notes: "",
      lineItem: "",
      suggestions: [],
    };
  }

  if (type === "labInvestigation") {
    return {
      name: t,
      instruction: "",
      notes: "",
      lineItem: "",
    };
  }

  if (type === "examinations") {
    return { name: t, notes: "", lineItem: t };
  }
  if (type === "diagnosis") {
    return { name: t, since: "", status: "", notes: "", lineItem: t };
  }

  if (type === "dynamicFields") {
    return { title: t, notes: "" };
  }

  if (type === "others") {
    return t;
  }

  if (type === "labResults") {
    return { testname: t, value: "", notes: "" };
  }

  
  return { name: t, lineItem: "" };
};

const getPrimaryText = (type, item) => {
  if (type === "advice") return typeof item === "string" ? item : "";
  if (type === "medications") return (item?.groundedMedicineName || "").trim() || (item?.name || "").trim() || "";
  if (type === "labInvestigation") return item?.name || "";
  if (type === "dynamicFields") return item?.title || "";
  if (type === "others") return typeof item === "string" ? item : "";
  if (type === "labResults") return item?.testname || "";
  if (type === "diagnosis") return String(item?.lineItem ?? item?.name ?? (item?.status ? `${item?.name ?? ""}, ${item.status}`.trim() : "") ?? item?.notes ?? "").trim();
  if (type === "examinations") return String(item?.lineItem ?? item?.name ?? item?.findings ?? item?.notes ?? "").trim();
  return item?.name || "";
};

/** Normalize dynamicFields to always be an object { moduleName: row[] }. Backend may send array of modules. Skips empty modules and empty rows. */
const getDynamicFieldsAsObject = (dynamicFields) => {
  if (!dynamicFields || typeof dynamicFields !== "object") return {};
  if (!Array.isArray(dynamicFields)) return dynamicFields;
  return dynamicFields.reduce((acc, module) => {
    const name = module?.name || module?.module_name || "";
    if (!name) return acc;
    const rawRows = module?.fields || module?.fieldValues || [];
    const rows = Array.isArray(rawRows)
      ? rawRows
          .map((f) => {
            if (typeof f === "string") return { lineItem: (f || "").trim() };
            if (f && typeof f === "object" && (f.lineItem || f.title)) return { lineItem: (f.lineItem || f.title || "").trim(), ...f };
            if (f && typeof f === "object") {
              const parts = Object.entries(f)
                .filter(([k]) => k !== "order")
                .filter(([, v]) => v != null && String(v).trim() !== "")
                .map(([k, v]) => `${k}: ${v}`);
              return { lineItem: parts.join(", ") };
            }
            return { lineItem: "" };
          })
          .filter((row) => (row?.lineItem || "").trim() !== "")
      : [];
    if (rows.length > 0) acc[name] = rows;
    return acc;
  }, {});
};

const DigitisedPrescription = ({
  data,
  setData,
  loading,
  showAbsHeaderInsideLoader = false,
  showRxPadHeader = false,
  showHeader = false,
  showInstructionMessage = false,
  onCloseInstructionMessage,
  showDisclaimer = false,
  localModules = [],
  setLocalModules,
  onRxEdited,
  isProcessing = false,
  patient_data,
  vitalsFlow,
  skipAutoLabResultsLogic = false,
}) => {
  const showHeaderArea = showRxPadHeader || showHeader;
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [editableText, setEditableText] = useState("");
  const [editableLineItem, setEditableLineItem] = useState("");
  const [editableKey, setEditableKey] = useState("");
  const [editableValue, setEditableValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [ioAutoFocusEnabled, setIoAutoFocusEnabled] = useState(true);
  const [searchParentQuery, setSearchParentQuery] = useState("");
  const [parentSearchOptions, setParentSearchOptions] = useState([]);
  const [searchTestQuery, setSearchTestQuery] = useState("");
  const [testSearchOptions, setTestSearchOptions] = useState([]);
  const [showAddMedicinePopup, setShowAddMedicinePopup] = useState(false);
  const [editingModule, setEditingModule] = useState("");
  const [updatedModuleName, setUpdatedModuleName] = useState("");
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [isDeleteModuleModalOpen, setIsDeleteModuleModalOpen] = useState(false);
  const editingRef = useRef(false);
  const suggestionRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { parentOptionsList } = useSelector((state) => state.medication);
  const { parentOptionsList: testOptionsList } = useSelector(
    (state) => state.investigation
  );
  // Fuzzy search run-once guards for meds and tests
  const hasFuzzyRunMedsRef = useRef(false);
  const hasFuzzyRunTestsRef = useRef(false);
  const lastFuzzyNamesRef = useRef("");
  const lastFuzzyCallRef = useRef({ sig: "", ts: 0 });
  const tokenData = getTokenData();

  const labResultsUpdater = useMemo(
    () => (arr) => {
      if (!setData) return;
      setData((prev) => {
        const next = arr || [];
        const labResults = (Array.isArray(next) && next.length > 0)
          ? next
          : (Array.isArray(prev?.labResults) && prev.labResults.length > 0 ? prev.labResults : []);
        return { ...prev, labResults };
      });
      if (typeof onRxEdited === "function") onRxEdited(true);
    },
    [setData, onRxEdited]
  );
  const isApolloHosBusinessIdAccessableFromGB = useFeatureIsOn(
    GB_APOLLO_DISABLE_FEATURE
  );
  const isZydusUserAccessableFromGB = useFeatureIsOn(GB_ZYDUS_USER);
  const { hospital_business_id } = tokenData || {};
  const isApollo = config.APOLLO_BUSINESS_IDS.includes(hospital_business_id);
  const isGroundingAccessable = useGrounding();

  const handleLineItemBlur = useCallback(
    (type, index) => {
      const itemType = type?.split("-")?.[0];
      const lineItemValue = String(editableLineItem ?? "").trim();
      setData((prevData) => {
        const updatedData = { ...prevData };
        const arr = [...(updatedData[itemType] || [])];
        const item = arr[index];
        if (itemType === "diagnosis") {
          const notes = lineItemValue;
          const name = String(item?.name ?? "").trim();
          const since = String(item?.since ?? "").trim();
          const status = String(item?.status ?? "").trim();
          const lineItem = [name, status, notes].filter(Boolean).join(", ") || name;
          arr[index] = { name: name || "", since, status, notes, lineItem };
        } else if (itemType === "examinations") {
          const notes = lineItemValue;
          const name = String(item?.name ?? "").trim();
          const lineItem = notes ? `${name}, ${notes}` : name || "";
          arr[index] = { name: name || "", notes, lineItem };
        } else if (itemType === "dynamicFields") {
          arr[index] = { ...item, notes: lineItemValue };
        } else {
          arr[index] = { ...item, lineItem: lineItemValue };
        }
        updatedData[itemType] = arr;
        return updatedData;
      });
      setEditableLineItem("");
      setActiveIndex(null);
      setActiveType(null);
    },
    [editableLineItem, setData]
  );

  const containerRef = useRef(null);
  const sectionRefs = useRef({});
  const [visibleSection, setVisibleSection] = useState(null);

  // Support both old and new structure (vitals/vitalsAndBodyComposition, examination/examinations, medicine/medications, tests/labInvestigation)
  const sectionData = useMemo(() => {
    const vitals = data?.vitalsAndBodyComposition || data?.vitals;
    const examinationsRaw = data?.examinations || data?.examination;
    const medications = data?.medications || data?.medicine;
    const labInvestigation = data?.labInvestigation || data?.tests;
    const examinations = !Array.isArray(examinationsRaw)
      ? []
      : examinationsRaw.map((item) => {
          if (item == null) return { name: "", notes: "", lineItem: "" };
          if (typeof item === "string") {
            const t = String(item).trim();
            return { name: t, notes: "", lineItem: t };
          }
          const name = String(item.name ?? item.findings ?? item.lineItem ?? "").trim();
          const notes = String(item.notes ?? "").trim();
          const lineItem = String(item.lineItem ?? "").trim() || (notes ? `${name}, ${notes}` : name) || name;
          return { name, notes, lineItem };
        });
    const diagnosisRaw = data?.diagnosis;
    const diagnosis = !Array.isArray(diagnosisRaw)
      ? []
      : diagnosisRaw.map((item) => {
          if (item == null) return { name: "", since: "", status: "", notes: "", lineItem: "" };
          if (typeof item === "string") {
            const t = String(item).trim();
            return { name: t, since: "", status: "", notes: "", lineItem: t };
          }
          const name = String(item.name ?? item.lineItem ?? "").trim();
          const since = String(item.since ?? "").trim();
          const status = String(item.status ?? "").trim();
          const notes = String(item.notes ?? item.note ?? "").trim();
          const lineItem = String(item.lineItem ?? "").trim() || [name, status, notes].filter(Boolean).join(", ") || name;
          return { name, since, status, notes, lineItem };
        });
    return {
      vitalsAndBodyComposition: vitals,
      examinations,
      medications,
      labInvestigation,
      symptoms: data?.symptoms,
      medicalHistory: data?.medicalHistory,
      diagnosis,
      vaccinations: data?.vaccinations,
      advice: data?.advice,
      followUp: data?.followUp,
      dynamicFields: data?.dynamicFields,
      others: data?.others,
      labResults: data?.labResults ?? data?.lab_results ?? [],
    };
  }, [data]);

  const renderedSections = useMemo(() => {
    const order = [];
    const vitalsObj = sectionData.vitalsAndBodyComposition;
    if (vitalsObj && typeof vitalsObj === "object" && Object.values(vitalsObj || {}).some((v) => v != null && String(v).trim?.()?.length)) {
      order.push("vitalsAndBodyComposition");
    }
    ARRAY_SECTIONS.forEach((s) => {
      const arr = s === "examinations" ? sectionData.examinations : s === "medications" ? sectionData.medications : s === "labInvestigation" ? sectionData.labInvestigation : sectionData[s];
      if (Array.isArray(arr) && arr.length > 0) {
        order.push(s);
      }
    });
    return order;
  }, [sectionData]);

  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (editingRef.current) return;
        const firstVisible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
        if (firstVisible) {
          const sec = firstVisible.target.dataset.section;
          setVisibleSection(sec);
        }
      },
      {
        root,
        threshold: 0.2,
      }
    );

    renderedSections.forEach((sec) => {
      const el = sectionRefs.current[sec];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [renderedSections]);

  useEffect(() => {
    if (activeType !== null) return;
    if (!visibleSection) return;
    if (!ARRAY_SECTIONS.includes(visibleSection)) return;
    if (!ioAutoFocusEnabled) return;
    const arr = visibleSection === "examinations" ? sectionData.examinations : visibleSection === "medications" ? sectionData.medications : visibleSection === "labInvestigation" ? sectionData.labInvestigation : data?.[visibleSection];
    if (!Array.isArray(arr) || arr.length === 0) return;
    const lastIndex = arr.length - 1;
    const lastItem = arr[lastIndex];
    const text = getPrimaryText(visibleSection, lastItem);

    setActiveType(visibleSection);
    setActiveIndex(lastIndex);
    setEditableText(text);
    setTimeout(() => {
      const el = sectionRefs.current[visibleSection]?.querySelector("input");
      el?.focus?.();
    }, 0);
    setIoAutoFocusEnabled(false);
  }, [visibleSection, data, activeType, ioAutoFocusEnabled]);

  const handleInputBlur = useCallback(
    (type, index) => {
      if (activeIndex === null || activeType === null) return;
      const val = String(editableText ?? "").trim();

      setData((prevData) => {
        const updatedData = { ...prevData };

        if (type === "vitalsAndBodyComposition-key") {
          const newKey = String(editableKey ?? "")
            .trim()
            .replace(/\s+/g, "")
            .replace(/^(.)/, (c) => c.toLowerCase());
          if (newKey && newKey !== index) {
            const v = { ...(updatedData.vitalsAndBodyComposition || {}) };
            const value = v[index];
            delete v[index];
            v[newKey] = value;
            updatedData.vitalsAndBodyComposition = v;
          }
          return updatedData;
        }

        if (type === "vitalsAndBodyComposition") {
          const val = String(editableText ?? "").trim();
          const v = { ...(updatedData.vitalsAndBodyComposition || {}) };
          if (val) v[index] = val;
          updatedData.vitalsAndBodyComposition = v;
          return updatedData;
        }
        if (type === "labResults") {
          const val = String(editableText ?? "").trim();
          const arr = [...(updatedData.labResults || [])];
          if (val) {
            arr[index] = { ...arr[index], testname: val };
          }
          updatedData.labResults = arr;
          return updatedData;
        }
        if (type === "followUp") {
          updatedData.followUp = String(editableText ?? "").trim();
          return updatedData;
        } else if (ARRAY_SECTIONS.includes(type)) {
          let arr = [...(updatedData[type] || [])];
          const item = arr[index];

          const val = String(editableText ?? "").trim();
          if (type === "advice" || type === "others") {
            arr[index] = String(editableText ?? "").trim();
          } else if (type === "medications" || type === "labInvestigation") {
            if (val) {
              arr[index] = {
                ...item,
                name: item?.name || val,
                groundedMedicineName: type === "medications" ? (item?.groundedMedicineName || val) : undefined,
                refinedName: type === "medications" ? (item?.refinedName || val) : undefined,
              };
            } else {
              arr[index] = item;
            }
          } else if (type === "dynamicFields") {
            if (val) {
              arr[index] = { ...item, title: val };
            } else {
              arr[index] = item;
            }
          } else if (type === "labResults") {
            if (val) {
              arr[index] = { ...item, testname: val };
            } else {
              arr[index] = item;
            }
          } else if (type === "diagnosis") {
            const nameToSave = (val !== "" ? val : String(item?.name ?? "").trim()) || String(item?.notes ?? "").trim();
            const since = String(item?.since ?? "").trim();
            const status = String(item?.status ?? "").trim();
            const notes = String(item?.notes ?? "").trim();
            const lineItem = [nameToSave, status, notes].filter(Boolean).join(", ") || nameToSave;
            arr[index] = { name: nameToSave || "", since, status, notes, lineItem };
          } else if (type === "examinations") {
            const nameToSave = (val !== "" ? val : String(item?.name ?? "").trim()) || String(item?.notes ?? "").trim();
            const notes = String(item?.notes ?? "").trim();
            const lineItem = notes ? `${nameToSave}, ${notes}` : nameToSave || "";
            arr[index] = { name: nameToSave || "", notes, lineItem };
          } else {
            if (val) {
              arr[index] = { ...item, name: val };
            } else {
              arr[index] = item;
            }
          }
          if (type === "advice" || type === "others") {
            arr = arr.filter((v) => typeof v === "string" && String(v).trim() !== "");
          } else if (type === "medications" || type === "labInvestigation") {
            arr = arr.filter(
              (v) =>
                v &&
                ((typeof v === "object" &&
                  (String(v.name ?? "").trim() !== "" ||
                    String(v.groundedMedicineName ?? "").trim() !== "" ||
                    String(v.refinedName ?? "").trim() !== "")) ||
                  (typeof v === "string" && String(v).trim() !== ""))
            );
          } else if (type === "dynamicFields") {
            arr = arr.filter(
              (v) =>
                v &&
                typeof v === "object" &&
                String(v.title ?? "").trim() !== ""
            );
          } else if (type === "labResults") {
            arr = arr.filter(
              (v) =>
                v &&
                typeof v === "object" &&
                String(v.testname ?? "").trim() !== ""
            );
          } else if (type === "diagnosis") {
            arr = arr.filter(
              (v) =>
                v &&
                typeof v === "object" &&
                (String(v.name ?? "").trim() !== "" ||
                  String(v.notes ?? "").trim() !== "" ||
                  String(v.status ?? "").trim() !== "" ||
                  String(v.lineItem ?? "").trim() !== "")
            );
          } else if (type === "examinations") {
            arr = arr.filter(
              (v) =>
                v &&
                typeof v === "object" &&
                (String(v.name ?? "").trim() !== "" ||
                  String(v.findings ?? "").trim() !== "" ||
                  String(v.notes ?? "").trim() !== "" ||
                  String(v.lineItem ?? "").trim() !== "")
            );
          } else {
            arr = arr.filter(
              (v) => v && typeof v === "object" && String(v.name ?? "").trim() !== ""
            );
          }
          updatedData[type] = arr;
        }

        return updatedData;
      });

      setActiveIndex(null);
      setActiveType(null);
      setEditableText("");
      setEditableKey("");
    },
    [activeIndex, activeType, editableText, editableKey, setData]
  );

  // Debounced search for medication name (mirror ConsultationDrawer)
  useEffect(() => {
    if (activeType !== "medications") return;
    if (!editableText) return;
    const timeoutId = setTimeout(() => {
      dispatch(searchMedication({ searchQuery: editableText, type: "parent" }));
    }, 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editableText, activeType]);

  // Debounced search for lab investigation name
  useEffect(() => {
    if (activeType !== "labInvestigation") return;
    if (!editableText) return;
    const timeoutId = setTimeout(() => {
      dispatch(
        searchInvestigation({ searchQuery: editableText, type: "parent" })
      );
    }, 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editableText, activeType]);

  // Build options from store list for medications
  useEffect(() => {
    if (activeType !== "medications") return;
    const list = parentOptionsList || [];
    const opts = list.map((e) => ({
      key: JSON.stringify({ ...e, unique_id: uuidv4() }),
      value: e.tmm_medicine_name,
      label: (
        <div>
          <span className="fw-medium">{e.tmm_medicine_name}</span>,
          <span className="ms-1">{e.tmm_generic}</span>
          {(e?.tmm_hm_type == 1 || e?.tmm_hm_type == 2) && e?.um_id === 0 && (
            <span
              className="align-items-center small fs-12-1 d-inline-flex justify-content-center rounded-circle text-white ms-2"
              style={{ width: 18, height: 18, background: "#c44ea2" }}
            >
              {getHmTypeIndicator(e)}
            </span>
          )}
        </div>
      ),
    }));

    if (searchParentQuery?.length > 0) {
      opts.push({
        key: JSON.stringify({
          unique_id: uuidv4(),
          tmm_id: 0,
          tmm_medicine_name: searchParentQuery,
        }),
        value: searchParentQuery,
        label: (
          <div>
            {searchParentQuery}
            <i className="icon-Add mx-1 text-primary fs-6"></i>
            <button className="fw-medium text-decoration-underline text-primary ms-1 border-0 bg-transparent p-0">
              Add Custom
            </button>
          </div>
        ),
      });
    }
    setParentSearchOptions(opts);
  }, [parentOptionsList, searchParentQuery, activeType]);

  // Build options from store list for lab investigation
  useEffect(() => {
    if (activeType !== "labInvestigation") return;
    const list = testOptionsList || [];
    const opts = list.map((e) => ({
      key: JSON.stringify({ ...e, unique_id: uuidv4() }),
      value: e.investigation_name,
      label: (
        <div>
          <span className="fw-medium">{e.investigation_name}</span>
          {e?.investigation_category && (
            <span className="ms-1 text-muted">
              ({e.investigation_category})
            </span>
          )}
        </div>
      ),
    }));

    if (searchTestQuery?.length > 0 && tokenData?.hospital_business_id != env.zydus_business_id && !isZydusUserAccessableFromGB && !isApolloHosBusinessIdAccessableFromGB) {
      opts.push({
        key: JSON.stringify({
          unique_id: uuidv4(),
          investigation_id: 0,
          investigation_name: searchTestQuery,
        }),
        value: searchTestQuery,
        label: (
          <div>
            {searchTestQuery}
            <i className="icon-Add mx-1 text-primary fs-6"></i>
            <button className="fw-medium text-decoration-underline text-primary ms-1 border-0 bg-transparent p-0">
              Add Custom
            </button>
          </div>
        ),
      });
    }
    setTestSearchOptions(opts);
  }, [testOptionsList, searchTestQuery, activeType]);

  const getFuzzySearchMedicine = useCallback(
    async (medsSnapshot) => {
      try {
        const meds = medsSnapshot || sectionData.medications || [];
        if (!meds.length) return;

        const correctedResults = await Promise.all(
          meds.map(async (med) => {
            // Use groundingMedicineName if present and non-empty, otherwise use name
            const nameToUse = (med?.groundingMedicineName || "").trim() || (med?.name || "").trim();
            if (!nameToUse)
              return { correctedName: nameToUse, fullData: null };
            try {
              // Send groundingMedicineName to grounding API if present, otherwise send name
              const searchName = (med?.groundingMedicineName || "").trim() || (med?.name || "").trim();
              const result = await ApiMedication.getFuzzySearch(searchName);
              const corrected = result?.[0]?.tmm_medicine_name?.trim();
              return {
                correctedName: corrected || nameToUse,
                fullData: result?.[0] || null,
              };
            } catch (error) {    
              return { correctedName: nameToUse, fullData: null };
            }
          })
        );

        const anyChanged = meds.some(
          (m, i) => {
            const currentDisplayName = (m?.groundingMedicineName || "").trim() || (m?.name || "").trim();
            return currentDisplayName !== correctedResults[i].correctedName;
          }
        );
        if (!anyChanged) {
          const correctedSig = meds.map((m) => {
            const nameToUse = (m?.groundingMedicineName || "").trim() || (m?.name || "").trim();
            return nameToUse;
          }).join("|");
          lastFuzzyNamesRef.current = correctedSig;
          return;
        }

        const correctedSig = correctedResults
          .map((r) => r.correctedName)
          .join("|");
        lastFuzzyNamesRef.current = correctedSig;

        setData((prev) => ({
          ...prev,
          medications: (prev?.medications || []).map((m, idx) => ({
            ...m,
            name: correctedResults[idx].correctedName,
            refinedName: correctedResults[idx].correctedName,
            // Add metadata for fuzzy search corrected name with full data
            metadata: {
              ...m.metadata,
              fuzzyCorrectedName: correctedResults[idx].correctedName,
              originalName: (m?.groundingMedicineName || "").trim() || m.name,
              isFuzzyCorrected: true,
              ...(correctedResults[idx].fullData || {}),
            },
          })),
        }));
      } finally {}
    },
    [sectionData.medications, setData]
  );

  const getFuzzySearchLabs = useCallback(
    async (labsSnapshot) => {
      try {
        const labs = labsSnapshot || sectionData.labInvestigation || [];
        if (!labs.length) return;
        const correctedResults = await Promise.all(
          labs.map(async (it) => {
            const currentName = (it?.name || "").trim();
            if (!currentName)
              return { correctedName: currentName, fullData: null };
            try {
              const result = await ApiInvestigation.getFuzzySearch(currentName);
              const corrected = result?.[0]?.investigation_name?.trim();
              return {
                correctedName: corrected || currentName,
                fullData: result?.[0] || null,
              };
            } catch {
              return { correctedName: currentName, fullData: null };
            }
          })
        );

        const anyChanged = labs.some(
          (m, i) => (m?.name || "").trim() !== correctedResults[i].correctedName
        );
        if (!anyChanged) return;

        setData((prev) => ({
          ...prev,
          labInvestigation: (prev?.labInvestigation || []).map((m, idx) => ({
            ...m,
            name: correctedResults[idx].correctedName,
            edited: false,
            metadata: {
              ...m.metadata,
              fuzzyCorrectedName: correctedResults[idx].correctedName,
              originalName: m.name,
              isFuzzyCorrected: true,
              ...(correctedResults[idx].fullData || {}),
            },
          })),
        }));
      } finally {}
    },
    [sectionData.labInvestigation, setData]
  );

  // Fuzzy-correct medication names ONCE when medications first become available
  useEffect(() => {
    if (!isGroundingAccessable) return;
    if (hasFuzzyRunMedsRef.current) return;
    const meds = sectionData.medications || [];
    if (!meds.length) return;
    
    // Use groundingMedicineName if present, otherwise use name for signature
    const namesSignature = meds.map((m) => {
      const nameToUse = (m?.groundingMedicineName || "").trim() || (m?.name || "").trim();
      return nameToUse;
    }).join("|");
    if (!namesSignature) return;
    
    // If signature matches what we last processed, skip
    if (namesSignature === lastFuzzyNamesRef.current) return;

    const now = Date.now();
    // Prevent rapid duplicate calls (e.g., StrictMode double effect)
    if (
      lastFuzzyCallRef.current.sig === namesSignature &&
      now - lastFuzzyCallRef.current.ts < 800
    ) {
      return;
    }
    lastFuzzyCallRef.current = { sig: namesSignature, ts: now };

    lastFuzzyNamesRef.current = namesSignature;
    getFuzzySearchMedicine(meds);
  }, [sectionData.medications]);

  // Fuzzy-correct lab investigations ONLY when API response (snap/smart/voice/ambient) has labInvestigation
  useEffect(() => {
    if (!isGroundingAccessable) return;
    if (hasFuzzyRunTestsRef.current) return;
    const labs = sectionData.labInvestigation || [];
    if (!labs.length) return;
    hasFuzzyRunTestsRef.current = true;
    getFuzzySearchLabs(labs);
  }, [sectionData.labInvestigation]);

  // Clear fuzzy refs on unmount (back button / end visit)
  useEffect(() => {
    return () => {
      hasFuzzyRunMedsRef.current = false;
      hasFuzzyRunTestsRef.current = false;
      lastFuzzyNamesRef.current = "";
      lastFuzzyCallRef.current = { sig: "", ts: 0 };
    };
  }, []);

  const onSearchParent = (query) => {
    setSearchParentQuery((query || "").trimStart());
  };

  const onSearchTest = (query) => {
    setSearchTestQuery((query || "").trimStart());
  };

  const onSelectParent = (value, option) => {
    // Open Add Custom popup if needed (tmm_id === 0)
    try {
      const meta = option?.key ? JSON.parse(option.key) : null;
      if (meta && meta.tmm_id === 0) {
        setShowAddMedicinePopup(true);
        return;
      }
    } catch {}

    setEditableText(value);
    if (activeType === "medications") {
      setData((prev) => {
        const updated = { ...prev };
        const arr = Array.isArray(updated.medications) ? [...updated.medications] : [];
        if (arr[activeIndex]) {
          arr[activeIndex] = {
            ...arr[activeIndex],
            name: value,
            groundedMedicineName: value,
            refinedName: value,
            metadata: {
              ...arr[activeIndex].metadata,
              ...(option?.key ? JSON.parse(option.key) : {}),
              selectedValue: value,
            },
          };
          updated.medications = arr;
        }
        return updated;
      });
      editingRef.current = false;
      setTimeout(() => handleInputBlur(activeType, activeIndex), 0);
    }
  };

  const onSelectTest = (value, option) => {
    try {
      const meta = option?.key ? JSON.parse(option.key) : null;
      if (meta && meta.investigation_id === 0) {
        setEditableText(value);
        if (activeType === "labInvestigation") {
          setData((prev) => {
            const updated = { ...prev };
            const arr = Array.isArray(updated.labInvestigation) ? [...updated.labInvestigation] : [];
            if (arr[activeIndex]) {
              arr[activeIndex] = {
                ...arr[activeIndex],
                name: value,
                metadata: {
                  ...arr[activeIndex].metadata,
                  ...(option?.key ? JSON.parse(option.key) : {}),
                  selectedValue: value,
                },
              };
              updated.labInvestigation = arr;
            }
            return updated;
          });
          editingRef.current = false;
          setTimeout(() => handleInputBlur(activeType, activeIndex), 0);
        }
        return;
      }
    } catch {}

    setEditableText(value);
    if (activeType === "labInvestigation") {
      setData((prev) => {
        const updated = { ...prev };
        const arr = Array.isArray(updated.labInvestigation) ? [...updated.labInvestigation] : [];
        if (arr[activeIndex]) {
          arr[activeIndex] = {
            ...arr[activeIndex],
            name: value,
            metadata: {
              ...arr[activeIndex].metadata,
              ...(option?.key ? JSON.parse(option.key) : {}),
              selectedValue: value,
            },
          };
          updated.labInvestigation = arr;
        }
        return updated;
      });
      editingRef.current = false;
      setTimeout(() => handleInputBlur(activeType, activeIndex), 0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        if (activeType !== null) {
          if (activeType.includes('-value')) {
            handleValueBlur(activeType, activeIndex);
          } else if (!editableLineItem) {
            handleInputBlur(activeType, activeIndex)
          } else {
            handleLineItemBlur(activeType, activeIndex);
          }
        }
      }
      const target = event.target;
      const inActiveInput =
        inputRef.current && inputRef.current.contains(target);
      const inSuggestions =
        suggestionRef.current && suggestionRef.current.contains(target);

      const sectionEl =
        visibleSection && sectionRefs.current[visibleSection]
          ? sectionRefs.current[visibleSection]
          : null;
      const clickedInsideHighlighted = sectionEl && sectionEl.contains(target);
      if (!inActiveInput && !inSuggestions) {
        if (activeType !== null) {
          if (activeType.includes('-value')) {
            handleValueBlur(activeType, activeIndex);
          } else if (!editableLineItem) {
            handleInputBlur(activeType, activeIndex)
          } else {
            handleLineItemBlur(activeType, activeIndex);
          }
        }

        if (!clickedInsideHighlighted) {
          setVisibleSection(null);
          setActiveType(null);
          setActiveIndex(null);
          setEditableText("");
          setEditableValue("");
          editingRef.current = false;

          setIoAutoFocusEnabled(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeIndex, activeType, handleInputBlur, visibleSection, editableLineItem, editableText, editableValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEditableText(value);
    // Live update name for medications/labInvestigation at current index
    if (activeType === "medications" || activeType === "labInvestigation") {
      setData((prev) => {
        const updated = { ...prev };
        const key = activeType;
        const arr = Array.isArray(updated[key]) ? [...updated[key]] : [];
        if (arr[activeIndex]) {
          arr[activeIndex] = {
            ...arr[activeIndex],
            name: value,
            ...(activeType === "medications" ? { groundedMedicineName: value, refinedName: value } : {}),
          };
          updated[key] = arr;
        }
        return updated;
      });
    }
  };
  const handleLineItemChange = (e) => setEditableLineItem(e.target.value);
  const handleValueChange = (e) => setEditableValue(e.target.value);

  const handleValueBlur = (type, index, currentValue = null) => {
    const itemType = type?.split('-')?.[0];
    const valueToSave = currentValue !== null ? currentValue : editableValue;
    setData((prevData) => {
      const updatedData = { ...prevData };
      const arr = [...(updatedData[itemType] || [])];
      if (itemType === "labResults") {
        arr[index] = { ...arr[index], value: valueToSave || "" };
      }
      updatedData[itemType] = arr;
      return updatedData;
    });
    setEditableValue("");
    setActiveIndex(null);
    setActiveType(null);
    setEditableText("");
    setEditableKey("");
  };

  const handleItemClick = (type, index) => {
    if (activeIndex !== null && activeType !== null) {
      if (activeType.includes('-value')) {
        handleValueBlur(activeType, activeIndex);
      } else {
        handleInputBlur(activeType, activeIndex);
      }
    }

    if (type === "vitalsAndBodyComposition-key") {
      const isNumberKey = /^\d+$/.test(index);
      const label = isNumberKey
        ? index
        : index
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase());
      setEditableKey(label);
    } else if (type === "vitalsAndBodyComposition") {
      setEditableText((data.vitalsAndBodyComposition || {})[index] || "");
    } else if (type === "followUp") {
      setEditableText(data?.followUp);
    } else if (ARRAY_SECTIONS.includes(type)) {
      const item = data[type][index];
      setEditableText(
        type === "advice" ? data[type][index] : getPrimaryText(type, item)
      );
    }

    setActiveIndex(index);
    setActiveType(type);
  };

  const handleLineItemClick = (type, index) => {
    const src = data[type][index];
    setEditableLineItem(type === "diagnosis" || type === "examinations" || type === "dynamicFields" ? src?.notes : src?.lineItem);
    setActiveIndex(index);
    setActiveType(`${type}-lineItem`);
  };

  const handleValueClick = (type, index) => {
    if (activeIndex !== null && activeType !== null) {
      if (activeType.includes('-value')) {
        handleValueBlur(activeType, activeIndex);
      } else {
        handleInputBlur(activeType, activeIndex);
      }
    }
    const src = data[type][index];
    setEditableValue(src?.value || "");
    setActiveIndex(index);
    setActiveType(`${type}-value`);
  };

  
  const handleEnterToInsert = (type, index, isLineItem = false) => {
    if (!ARRAY_SECTIONS.includes(type)) return;
    setVisibleSection(type);
    editingRef.current = true;
    setData((prev) => {
      const updated = { ...prev };
      const arr = Array.isArray(updated[type]) ? [...updated[type]] : [];
      const cur = arr[index];
    
      const currentText = (isLineItem ? editableLineItem : editableText ?? "").trim();
      if (type === "advice" || type === "others") {
        arr[index] = currentText;
      } else if (type === "medications" || type === "labInvestigation") {
        const name = isLineItem ? cur?.name || prev[type]?.name : currentText || cur?.name;
        const lineItem = isLineItem ? currentText || cur?.lineItem || prev[type]?.lineItem : cur?.lineItem;
        arr[index] = currentText
          ? {
              ...(cur || {}),
              name,
              lineItem,
              ...(type === "medications" ? { groundedMedicineName: name, refinedName: name } : {}),
            }
          : cur;
      } else if (type === "dynamicFields") {
        const title = isLineItem ? cur?.title || prev[type]?.title : currentText || cur?.title;
        const notes = isLineItem ? currentText || cur?.notes || prev[type]?.notes : cur?.notes;
        arr[index] = { ...cur, title, notes };
      } else if (type === "labResults") {
        const testname = isLineItem ? cur?.testname || prev[type]?.testname : currentText || cur?.testname;
        const notes = isLineItem ? currentText || cur?.notes || prev[type]?.notes : cur?.notes;
        const value = activeType === `${type}-value` ? editableValue || cur?.value || prev[type]?.value : cur?.value;
        arr[index] = { ...cur, testname, notes, value };
      } else {
        const name = isLineItem
          ? cur?.name || prev[type]?.name
          : currentText || cur?.name;
        const lineItem = isLineItem
          ? currentText || cur?.lineItem || prev[type]?.lineItem
          : cur?.lineItem;
        arr[index] = { ...cur, name, lineItem, notes: lineItem };
      }
      arr.splice(index + 1, 0, normalizeNewItem(type, ""));
      updated[type] = arr;
      return updated;
    });

    setTimeout(() => {
      setActiveType(type);
      setActiveIndex(index + 1);
      setEditableText("");
      setEditableLineItem("");
      const sec = sectionRefs.current[type];
      // Focus the input within the next list item to avoid picking up hidden inputs from AutoComplete
      const nextLi = sec?.querySelectorAll("li")[index + 1];
      const nextInput = nextLi?.querySelector("input");
      nextInput?.focus?.();
    }, 0);
  };

  const renderArraySection = (type) => {
    return (
      <div
        data-section={type}
        ref={(el) => (sectionRefs.current[type] = el)}
        className={`digitised-section-rx ${
          visibleSection === type ? "highlight-blue" : ""
        }`}
      >
        {loading ? (
          <div className="shimmer-container">
            <div className="shimmer-header">
              <div className="shimmer"></div>
            </div>
            <div className="shimmer-content">
              <div className="shimmer"></div>
            </div>
          </div>
        ) : Array.isArray(data[type]) && data[type].length > 0 ? (
          <ul>
            {data[type].map((item, index) => {
              let textWidth = 0;
              let lineItemWidth = 0;
              let valueWidth = 0;
  
              
              if (activeIndex === index && activeType === type) {
                const temp = document.createElement("span");
                temp.style.visibility = "hidden";
                temp.style.position = "absolute";
                temp.style.whiteSpace = "nowrap";
                temp.innerText = editableText || "";
                document.body.appendChild(temp);
                textWidth = temp.offsetWidth;
                document.body.removeChild(temp);
              }

              if (activeIndex === index && activeType === `${type}-lineItem`) {
                const temp2 = document.createElement("span");
                temp2.style.visibility = "hidden";
                temp2.style.position = "absolute";
                temp2.style.whiteSpace = "nowrap";
                temp2.innerText = editableLineItem || "";
                document.body.appendChild(temp2);
                document.body.removeChild(temp2);
              }

              // Calculate width for value input
              if (activeIndex === index && activeType === `${type}-value`) {
                const temp3 = document.createElement("span");
                temp3.style.visibility = "hidden";
                temp3.style.position = "absolute";
                temp3.style.whiteSpace = "nowrap";
                temp3.innerText = editableValue || "";
                document.body.appendChild(temp3);
                valueWidth = temp3.offsetWidth;
                document.body.removeChild(temp3);
              }
  
              const primaryDisplay = getPrimaryText(type, item);

              return (
                <li key={index}>
                  <div className="medicine-item">
                    {activeIndex === index && activeType === type ? (
                      type === "medications" ? (
                        <div ref={suggestionRef}>
                          <AutoComplete
                            value={editableText}
                            onSearch={onSearchParent}
                            options={parentSearchOptions}
                            className="autocomplete-custom grounding-select"
                            popupClassName="grounding-boxpopup grounding-select"
                            onSelect={onSelectParent}
                            defaultActiveFirstOption={true}
                            autoFocus={true}
                            popupMatchSelectWidth={false}
                            dropdownStyle={{ width: 420 }}
                            getPopupContainer={() => suggestionRef.current}
                            open={
                              activeIndex === index &&
                              activeType === type &&
                              parentSearchOptions.length > 0
                            }
                            style={{ minWidth: 260 }}
                          >
                            <input
                              ref={inputRef}
                              type="text"
                              value={editableText}
                              className="editable-digitised-item"
                              onChange={handleInputChange}
                              onBlur={() => {
                                editingRef.current = false;
                                handleInputBlur(type, index);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleEnterToInsert(type, index);
                                }
                              }}
                              onFocus={() => {
                                editingRef.current = true;
                                setVisibleSection(type);
                              }}
                              style={{
                                width: `clamp(12px, ${textWidth + 10}px, 100%)`,
                              }}
                            />
                          </AutoComplete>
                        </div>
                      ) : type === "labInvestigation" ? (
                        <div ref={suggestionRef}>
                          <AutoComplete
                            value={editableText}
                            onSearch={onSearchTest}
                            options={testSearchOptions}
                            className="autocomplete-custom grounding-select"
                            popupClassName="grounding-boxpopup grounding-select"
                            onSelect={onSelectTest}
                            defaultActiveFirstOption={true}
                            autoFocus={true}
                            popupMatchSelectWidth={false}
                            dropdownStyle={{ width: 420 }}
                            getPopupContainer={() => suggestionRef.current}
                            open={
                              activeIndex === index &&
                              activeType === type &&
                              testSearchOptions.length > 0
                            }
                            style={{ minWidth: 260 }}
                          >
                            <input
                              ref={inputRef}
                              type="text"
                              value={editableText}
                              className="editable-digitised-item"
                              onChange={handleInputChange}
                              onBlur={() => {
                                editingRef.current = false;
                                handleInputBlur(type, index);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleEnterToInsert(type, index);
                                }
                              }}
                              onFocus={() => {
                                editingRef.current = true;
                                setVisibleSection(type);
                              }}
                              style={{
                                width: `clamp(12px, ${textWidth + 10}px, 100%)`,
                              }}
                            />
                          </AutoComplete>
                        </div>
                      ) : (
                        <input
                          ref={inputRef}
                          type="text"
                          value={editableText}
                          className="editable-digitised-item"
                          onChange={handleInputChange}
                          onBlur={() => {
                            editingRef.current = false;
                            handleInputBlur(type, index);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleEnterToInsert(type, index);
                            }
                          }}
                          autoFocus
                          onFocus={() => {
                            editingRef.current = true;
                            setVisibleSection(type);
                          }}
                          style={{
                            width: `clamp(12px, ${textWidth + 10}px, 100%)`,
                          }}
                        />
                      )
                    ) : (
                      <span
                        onClick={() => handleItemClick(type, index)}
                        className="digitised-item"
                      >
                        {primaryDisplay}
                      </span>
                    )}

                    {/* Editable input for lineItem (not for advice/userAdded) */}
                    {(type === "medications" ||
                      type === "symptoms" ||
                      type === "vaccinations" ||
                      type === "medicalHistory" ||
                      type === "labInvestigation") &&
                      item?.lineItem &&
                      (activeIndex === index &&
                      activeType === `${type}-lineItem` ? (
                        <input
                          type="text"
                          value={editableLineItem}
                          className="editable-digitised-item"
                          onChange={handleLineItemChange}
                          onBlur={() => {
                            editingRef.current = false;
                            setVisibleSection(type);
                            handleLineItemBlur(type, index);
                          }}
                          onFocus={() => {
                            editingRef.current = true;
                            setVisibleSection(type);
                          }}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleEnterToInsert(type, index, true);
                            }
                          }}
                          style={{
                            width: `clamp(12px, ${
                              (editableLineItem || "").length * 8 + 10
                            }px, 100%)`,
                          }}
                        />
                      ) : (
                        <span
                          onClick={() => handleLineItemClick(type, index)}
                          className="digitised-item"
                        >
                          {`(${item.lineItem})`}
                        </span>
                      ))}

                    {/* Special handling for labResults - testname: value format */}
                    {type === "labResults" && (
                      <>
                        {/* Colon separator - always visible */}
                        <span className="digitised-item">: </span>
                        
                        {/* Editable value */}
                        {item?.value &&
                          (activeIndex === index && activeType === `${type}-value` ? (
                            <input
                              type="text"
                              value={editableValue}
                              className="editable-digitised-item"
                              onChange={handleValueChange}
                              onBlur={(e) => {
                                editingRef.current = false;
                                handleValueBlur(activeType, activeIndex, e.target.value);
                              }}
                              onFocus={() => {
                                editingRef.current = true;
                                setVisibleSection(type);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleEnterToInsert(type, index, true);
                                }
                              }}
                              autoFocus
                              style={{ width: `clamp(12px, ${valueWidth + 10}px, 100%)` }}
                            />
                          ) : (
                            <span
                              onClick={() => handleValueClick(type, index)}
                              className="digitised-item"
                            >
                              {item.value}
                            </span>
                          ))}
                      </>
                    )}

                    {/* Editable input for notes (examinations/diagnosis/dynamicFields) */}
                    {(type === "examinations" || type === "diagnosis" || type === "dynamicFields") &&
                      item?.notes &&
                      (activeIndex === index &&
                      activeType === `${type}-lineItem` ? (
                        <input
                          type="text"
                          value={editableLineItem}
                          className="editable-digitised-item"
                          onChange={handleLineItemChange}
                          onBlur={() => {
                            editingRef.current = false;
                            handleLineItemBlur(type, index);
                          }}
                          onFocus={() => {
                            editingRef.current = true;
                            setVisibleSection(type);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleEnterToInsert(type, index, true);
                            }
                          }}
                          autoFocus
                          style={{
                            width: `clamp(12px, ${
                              (editableLineItem || "").length * 8 + 10
                            }px, 100%)`,
                          }}
                        />
                      ) : (
                        <span
                          onClick={() => handleLineItemClick(type, index)}
                          className="digitised-item"
                        >
                          {`(${item.notes})`}
                        </span>
                      ))}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          type === "followUp" && data?.followUp != null ? <span className="digitised-item">{data.followUp}</span> : null
        )}
      </div>
    );
  };

  const hasValidContent = (type) => {
    const source = type === "vitalsAndBodyComposition" ? sectionData.vitalsAndBodyComposition
      : type === "examinations" ? sectionData.examinations
      : type === "medications" ? sectionData.medications
      : type === "labInvestigation" ? sectionData.labInvestigation
      : data?.[type];
    if (!source) return false;
    if (type === "vitalsAndBodyComposition") {
      return typeof source === "object" && Object.values(source || {}).some((v) => v != null && String(v).trim?.()?.length > 0);
    }
    if (type === "followUp") return typeof source === "string" && source.trim().length > 0;
    if (!Array.isArray(source)) return false;
    const result = source.some((item) => {
      if (typeof item === "string") return String(item).trim().length > 0;
      const relevant = {
        medications: ["groundedMedicineName", "name", "refinedName", "lineItem"],
        symptoms: ["name", "lineItem"],
        examinations: ["name", "findings", "notes", "lineItem"],
        diagnosis: ["name", "notes", "lineItem"],
        medicalHistory: ["name", "lineItem"],
        vaccinations: ["name", "brand", "schedule", "notes", "lineItem"],
        labInvestigation: ["name", "lineItem"],
        dynamicFields: ["title", "notes"],
        others: ["name", "value"],
        labResults: ["testname", "value", "notes"],
        advice: ["name"],
      }[type] || ["name"];
      return relevant.some((f) => {
        const v = item[f];
        return v != null && String(v).trim().length > 0;
      });
    });
    return result;
  };

  const showMedicalHistorySection = !!(data?.medicalHistory && hasValidContent("medicalHistory"));
  const labResultsArray = data?.labResults ?? data?.lab_results ?? [];
  const showLabResultsSection = !!(data && Array.isArray(labResultsArray) && labResultsArray.length > 0);

  const normalizeAdvice = (advice) => {
    if (!Array.isArray(advice)) return [];
    return advice.map((a) => (typeof a === "string" ? { lineItem: a } : a));
  };

  const handleMedicationsUpdate = useCallback((medicationsArray) => {
    setData((prevData) => ({
      ...prevData,
      medications: medicationsArray,
    }));
  }, []);

  const handleInvestigationUpdate = useCallback((investigationArray) => {
    setData((prevData) => ({
      ...prevData,
      labInvestigation: investigationArray,
    }));
  }, []);

  const dynamicFieldsObject = useMemo(
    () => getDynamicFieldsAsObject(data?.dynamicFields),
    [data?.dynamicFields]
  );
  // Legacy alias for any stale reference (e.g. hot reload); we always use object UI now
  const isDynamicFieldsObject = true;

  const handleEditModule = useCallback(
    (module) => {
      const newName = (updatedModuleName || "").trim();
      if (!module || !newName || newName === module) {
        setEditingModule("");
        setUpdatedModuleName("");
        return;
      }
      setData((prev) => {
        const df = getDynamicFieldsAsObject(prev.dynamicFields);
        const updated = { ...prev, dynamicFields: { ...df } };
        if (df[module]) {
          updated.dynamicFields[newName] = df[module];
          delete updated.dynamicFields[module];
        }
        return updated;
      });
      if (setLocalModules)
        setLocalModules((prev) => (prev || []).map((m) => (m === module ? newName : m)));
      setEditingModule("");
      setUpdatedModuleName("");
      onRxEdited?.();
    },
    [updatedModuleName, setLocalModules, onRxEdited]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingModule("");
    setUpdatedModuleName("");
  }, []);

  const handleCustomModuleUpdate = useCallback(
    (moduleName, moduleArray) => {
      setData((prev) => {
        const updated = { ...prev, dynamicFields: { ...getDynamicFieldsAsObject(prev.dynamicFields) } };
        const arr = Array.isArray(moduleArray) ? moduleArray : [];
        if (arr.length === 0) delete updated.dynamicFields[moduleName];
        else updated.dynamicFields[moduleName] = arr;
        return updated;
      });
      onRxEdited?.();
    },
    [onRxEdited]
  );

  const toggleDeleteModuleModal = useCallback(() => {
    setIsDeleteModuleModalOpen((prev) => !prev);
    if (moduleToDelete) setModuleToDelete(null);
  }, [moduleToDelete]);

  const handleDeleteModule = useCallback(() => {
    if (!moduleToDelete) return;
    setData((prev) => {
      const updated = { ...prev, dynamicFields: { ...getDynamicFieldsAsObject(prev.dynamicFields) } };
      delete updated.dynamicFields[moduleToDelete];
      return updated;
    });
    if (setLocalModules)
      setLocalModules((prev) => (prev || []).filter((m) => m !== moduleToDelete));
    onRxEdited?.();
    setIsDeleteModuleModalOpen(false);
    setModuleToDelete(null);
  }, [moduleToDelete, setLocalModules, onRxEdited]);

  return (
    <>
      {showHeaderArea && (
        <div className={styles.rxPadHeader}>
          <img src={documentIcon} alt="Rx Pad" className={styles.rxPadIcon} />
          <span className={styles.rxPadTitle}>Rx Pad</span>
        </div>
      )}
      {loading ? (
        <div
          className={`${styles.rightSection} ${styles.gradientBorder} ${styles.loaderFullBleed}`}
          style={{ background: `url(${genRxBg})` }}
          ref={containerRef}
        >
          <GenRXLoaders
            showAbsHeaderInsideLoader={showAbsHeaderInsideLoader}
            isProcessing={true}
            isSnapRx={true}
          />
        </div>
      ) : (
        <div className={styles.rightSection} ref={containerRef}>
          {showInstructionMessage && onCloseInstructionMessage && (
            <div className={styles.rxPadInstruction}>
              <div className={styles.instructionIcon}>
                <img src={warningIcon} alt="Warning" className={styles.dangerIcon} />
              </div>
              <div className={styles.instructionText}>
                Dictate the Rx or start a conversation with Ambient Rx. We&apos;ll automatically fill these details so you can focus on the patient.
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onCloseInstructionMessage}
                aria-label="Close instruction message"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
          <>
          {hasValidContent("vitalsAndBodyComposition") && (
            <VitalsRichTextEditor
              vitalsAndBodyComposition={sectionData.vitalsAndBodyComposition || {}}
              onUpdate={(vitalsObj) => setData((prev) => ({ ...prev, vitalsAndBodyComposition: vitalsObj }))}
              isProcessing={loading}
              isVoiceAmbientFlow={!!patient_data}
              patient_data={patient_data}
              vitalsFlow={vitalsFlow}
            />
          )}

          {showMedicalHistorySection && (
            <MedicalHistoryRichTextEditor
              medicalHistory={data?.medicalHistory || []}
              onUpdate={(arr) => setData((prev) => ({ ...prev, medicalHistory: arr || [] }))}
              isProcessing={loading}
              isVoiceAmbientSnapSmartFlow={!skipAutoLabResultsLogic}
            />
          )}

          {data?.symptoms && hasValidContent("symptoms") && (
            <SymptomsRichTextEditor
              symptoms={data.symptoms}
              onUpdate={(arr) => setData((prev) => ({ ...prev, symptoms: arr || [] }))}
              isProcessing={loading}
            />
          )}

          {(sectionData.examinations?.length > 0) && hasValidContent("examinations") && (
            <ExaminationRichTextEditor
              examinations={sectionData.examinations}
              onUpdate={(arr) => setData((prev) => ({ ...prev, examinations: arr || [] }))}
              isProcessing={loading}
            />
          )}

          {data?.diagnosis && hasValidContent("diagnosis") && (
            <DiagnosisRichTextEditor
              diagnosis={data.diagnosis}
              onUpdate={(arr) => setData((prev) => ({ ...prev, diagnosis: arr || [] }))}
              isProcessing={loading}
            />
          )}

          {sectionData.medications?.length > 0 &&
            hasValidContent("medications") && (
              <MedicationsTable
                medications={sectionData.medications}
                onUpdate={handleMedicationsUpdate}
                isProcessing={false}
              />
            )}

          {sectionData.labInvestigation?.length > 0 && (
              <LabInvestigationTable
                labInvestigation={sectionData.labInvestigation}
                onUpdate={handleInvestigationUpdate}
                isProcessing={false}
              />
            )}

          {data?.advice && hasValidContent("advice") && (
            <AdviceRichTextEditor
              advice={normalizeAdvice(data.advice)}
              onUpdate={(arr) => setData((prev) => ({
                ...prev,
                advice: (arr || []).map((a) => (typeof a === "string" ? a : (a?.lineItem ?? ""))).filter((s) => String(s).trim() !== ""),
              }))}
              isProcessing={loading}
            />
          )}

          {data?.vaccinations && hasValidContent("vaccinations") && (
            <VaccinationsRichTextEditor
              vaccinations={data.vaccinations}
              onUpdate={(arr) => setData((prev) => ({ ...prev, vaccinations: arr || [] }))}
              isProcessing={loading}
            />
          )}

          {(data?.followUp || hasValidContent("followUp")) && (
            <FollowUpRichTextEditor
              followUp={typeof data.followUp === "string" ? data.followUp : ""}
              onUpdate={(text) => setData((prev) => ({ ...prev, followUp: text || "" }))}
              isProcessing={loading}
            />
          )}

          {showLabResultsSection && (
              <LabResultsRichTextEditor
                labResults={data?.labResults ?? data?.lab_results ?? []}
                onUpdate={labResultsUpdater}
                isProcessing={loading}
                patient_data={patient_data}
                skipAutoFetchAndMerge={skipAutoLabResultsLogic}
                enableLabPrefillFromVoiceSnapSmart={!skipAutoLabResultsLogic}
              />
            )}

          <>
            {Object.entries(dynamicFieldsObject).map(([moduleName, moduleData]) => {
              const hasContent = Array.isArray(moduleData) && moduleData.length > 0;
              if (!hasContent) return null;
              const isLocalModule = (localModules || []).includes(moduleName);
              return (
                <CustomModuleRichTextEditor
                  key={moduleName}
                  moduleName={moduleName}
                  moduleData={moduleData || []}
                  onUpdate={(moduleArray) => handleCustomModuleUpdate(moduleName, moduleArray)}
                  onDelete={(module) => {
                    setModuleToDelete(module);
                    setIsDeleteModuleModalOpen(true);
                  }}
                  onEdit={(module) => {
                    setEditingModule(module);
                    setUpdatedModuleName(module);
                  }}
                  isProcessing={isProcessing}
                  isLocalModule={isLocalModule}
                  editingModule={editingModule}
                  updatedModuleName={updatedModuleName}
                  onEditNameChange={setUpdatedModuleName}
                  onEditSave={() => handleEditModule(editingModule)}
                  onEditCancel={handleCancelEdit}
                />
              );
            })}
          </>

          {data?.others && hasValidContent("others") && (
            <AdditionalNotesRichTextEditor
              others={data.others}
              onUpdate={(arr) => setData((prev) => ({ ...prev, others: arr || [] }))}
              isProcessing={loading}
            />
          )}
          </>
        </div>
      )}
      {moduleToDelete != null && (
        <CommonModal
          isModalOpen={isDeleteModuleModalOpen}
          onCancel={toggleDeleteModuleModal}
          modalWidth={550}
          title="Are you sure you want to delete this module?"
          modalBody={
            <>
              <div className="d-flex align-items-start alert-warning rounded-10px p-3 patient-details">
                <img className="me-3" src={alertIcon} alt="Warning" />
                <span>
                  This action will permanently delete the {moduleToDelete} and cannot be undone. Please confirm to proceed
                </span>
              </div>
              <div className="mt-4">
                <div className="d-flex align-items-center mt-2 justify-content-end">
                  <div onClick={handleDeleteModule} className="me-4 text-decoration-underline btn p-0 text-main">
                    Yes, Delete
                  </div>
                  <Button onClick={toggleDeleteModuleModal} className="lh-lg btn btn-primary3 btn-41 px-4">
                    <span>No</span>
                  </Button>
                </div>
              </div>
            </>
          }
        />
      )}
      {showAddMedicinePopup && (
        <CustomMedicinePopup
          isOpen={showAddMedicinePopup}
          onCancel={() => setShowAddMedicinePopup(false)}
          initialData={{ tmm_medicine_name: searchParentQuery }}
        />
      )}
    </>
  );
};

export default DigitisedPrescription;
