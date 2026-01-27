import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import GenRXLoaders from "./GenRxLoaders";
import { AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { searchMedication } from "../redux/medicationSlice";
import { searchInvestigation } from "../redux/investigationSlice";
import CustomMedicinePopup from "./CustomMedicinePopup";
import ApiMedication from "../api/services/ApiMedication";
import ApiInvestigation from "../api/services/ApiInvestigation";
import { getTokenData, getHmTypeIndicator } from "../utils/utils";
import { env } from "../EnvironmentConfig";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { GB_APOLLO_DISABLE_FEATURE, GB_ZYDUS_USER } from "../utils/constants";
import MedicationsTable from "./MedicationsTable";
import LabInvestigationTable from "./LabInvestigationTable";
import config from "../config";
import { useGrounding } from "../hooks/useGrounding";
import { convertMedicalHistoryToContextFormat, convertContextToRxPadFormat } from "../utils/medicalHistoryConverters";
import moment from "moment";

export const ARRAY_SECTIONS = [
  "symptoms",
  "medicalHistory",
  "examination",
  "diagnosis",
  "medications",
  "tests",
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

  if (type === "medications" || type === "tests") {
    return {
      name: t,
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

  if (type === "examination" || type === "diagnosis") {
    return { name: t, notes: "", lineItem: "" };
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
  if (type === "medications" || type === "tests") return item?.refinedName || item?.name || "";
  if (type === "dynamicFields") return item?.title || "";
  if (type === "others") return typeof item === "string" ? item : "";
  if (type === "labResults") return item?.testname || "";
  return item?.name || "";
};

// Inline vitals enrichment (BMI, BMR, BSA) – matches ConsultationDrawer / VitalsBox
function enrichVitalsWithCalculations(vital, patientInfo = {}) {
  const out = { ...vital };
  const height = parseFloat(vital.height || vital.Height || '');
  const weight = parseFloat(vital.weight || vital.Weight || '');
  if (height > 0 && weight > 0) {
    const calBMI = (weight / height / height) * 10000;
    out.bmi = Number.isFinite(calBMI) ? String(calBMI.toFixed(2)) : (out.bmi || out.BMI || '');
    const age = patientInfo.age || 0;
    const isMale = patientInfo.gender === 'Male';
    if (age > 0) {
      const calBMR = isMale ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
      out.bmr = Number.isFinite(calBMR) ? String(calBMR.toFixed(2)) : (out.bmr || out.BMR || '');
    }
    const calBSA = Math.sqrt((height * weight) / 3600);
    out.bsa = Number.isFinite(calBSA) ? String(calBSA.toFixed(2)) : (out.bsa || out.BSA || '');
  }
  return out;
}

const DigitisedPrescription = ({
  data,
  setData,
  loading,
  showAbsHeaderInsideLoader = false,
  setVitalsData,
  setMedicalHistoryData,
  contextMedicalHistoryData,
  onRxEdited,
  onVitalsUpdate,
  onMedicalHistoryUpdate,
  onSymptomsUpdate,
  onExaminationsUpdate,
  onDiagnosisUpdate,
  onMedicationsUpdate,
  onLabInvestigationUpdate,
  onLabResultsUpdate,
  sectionsStore: sectionsStoreProp,
  context,
}) => {
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
  const editingRef = useRef(false);
  const suggestionRef = useRef(null);
  const inputRef = useRef(null);
  const isUpdatingFromContextRef = useRef(false);
  const isUpdatingFromRxPadRef = useRef(false);
  const defaultSectionsStoreRef = useRef(new Set());
  const sectionsStore = sectionsStoreProp ?? defaultSectionsStoreRef;
  const dispatch = useDispatch();
  const { parentOptionsList } = useSelector((state) => state.medication);
  const { parentOptionsList: testOptionsList } = useSelector(
    (state) => state.investigation
  );
  // Fuzzy search run-once guards for meds and tests
  const hasFuzzyRunMedsRef = useRef(false);
  const hasFuzzyRunTestsRef = useRef(false);
  const tokenData = getTokenData();
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
      setData((prevData) => {
        const updatedData = { ...prevData };
        const arr = [...(updatedData[itemType] || [])];
        if (itemType === "diagnosis" || itemType === "examination" || itemType === "dynamicFields") {
          arr[index] = { ...arr[index], notes: editableLineItem };
        } else {
          arr[index] = { ...arr[index], lineItem: editableLineItem };
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

  const renderedSections = useMemo(() => {
    const order = [];
    if (
      data?.vitals &&
      Object.values(data.vitals || {}).some((v) => v?.trim?.()?.length)
    ) {
      order.push("vitals");
    }
    ARRAY_SECTIONS.forEach((s) => {
      if (Array.isArray(data?.[s]) && data[s].length > 0) {
        order.push(s);
      }
    });
    return order;
  }, [data]);

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
    const arr = data?.[visibleSection];
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

      setData((prevData) => {
        const updatedData = { ...prevData };

        if (type === "vitals-key") {
          const newKey = (editableKey || "")
            .trim()
            .replace(/\s+/g, "")
            .replace(/^(.)/, (c) => c.toLowerCase());
          if (newKey && newKey !== index) {
            const v = { ...(updatedData.vitals || {}) };
            const value = v[index];
            delete v[index];
            v[newKey] = value;
            updatedData.vitals = v;
          }
          return updatedData;
        }

        if (type === "vitals") {
          const val = (editableText || "").trim();
          const v = { ...(updatedData.vitals || {}) };
          if (val) v[index] = val;
          updatedData.vitals = v;
          return updatedData;
        }
        if (type === "labResults") {
          const val = (editableText || "").trim();
          const arr = [...(updatedData.labResults || [])];
          if (val) {
            arr[index] = { ...arr[index], testname: val };
          }
          updatedData.labResults = arr;
          return updatedData;
        }
        if (type === "followUp") {
          updatedData.followUp = editableText.trim();
          return updatedData;
        } else if (ARRAY_SECTIONS.includes(type)) {
          let arr = [...(updatedData[type] || [])];
          const item = arr[index];

          const val = (editableText || "").trim();
          if (type === "advice" || type === "others") {
            arr[index] = (editableText || "").trim();
          } else if (type === "medications" || type === "tests") {
            if (val) {
              arr[index] = {
                ...item,
                name: item?.name || val,
                refinedName: item?.name || val,
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
          } else {
            if (val) {
              arr[index] = { ...item, name: val };
            } else {
              arr[index] = item;
            }
          }
          if (type === "advice" || type === "others") {
            arr = arr.filter((v) => typeof v === "string" && v.trim() !== "");
          } else if (type === "medications" || type === "tests") {
            arr = arr.filter(
              (v) =>
                v &&
                ((typeof v === "object" &&
                  ((v.name && v.name.trim() !== "") ||
                    (v.refinedName && v.refinedName.trim() !== ""))) ||
                  (typeof v === "string" && v.trim() !== ""))
            );
          } else if (type === "dynamicFields") {
            arr = arr.filter(
              (v) =>
                v &&
                typeof v === "object" &&
                v.title &&
                v.title.trim() !== ""
            );
          } else if (type === "labResults") {
            arr = arr.filter(
              (v) =>
                v &&
                typeof v === "object" &&
                v.testname &&
                v.testname.trim() !== ""
            );
          } else {
            arr = arr.filter(
              (v) =>
                v && typeof v === "object" && v.name && v.name.trim() !== ""
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

  // Debounced search for test name
  useEffect(() => {
    if (activeType !== "tests") return;
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

  // Build options from store list for tests
  useEffect(() => {
    if (activeType !== "tests") return;
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
        const meds = medsSnapshot || data?.medications || [];
        if (!meds.length) return;

        const correctedResults = await Promise.all(
          meds.map(async (med) => {
            const currentName = (med?.name || "").trim();
            if (!currentName)
              return { correctedName: currentName, fullData: null };
            try {
              const result = await ApiMedication.getFuzzySearch(currentName);
              const corrected = result?.[0]?.tmm_medicine_name?.trim();
              return {
                correctedName: corrected || currentName,
                fullData: result?.[0] || null,
              };
            } catch {
              return { correctedName: currentName, fullData: null };
            }
          })
        );

        const anyChanged = meds.some(
          (m, i) => (m?.name || "").trim() !== correctedResults[i].correctedName
        );
        if (!anyChanged) return;

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
              originalName: m.name,
              isFuzzyCorrected: true,
              ...(correctedResults[idx].fullData || {}),
            },
          })),
        }));
      } finally {
        // nothing
      }
    },
    [data?.medications, setData]
  );

  const getFuzzySearchLabs = useCallback(
    async (testsSnapshot) => {
      try {
        const tests = testsSnapshot || data?.tests || [];
        if (!tests.length) return;
        const correctedResults = await Promise.all(
          tests.map(async (it) => {
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

        const anyChanged = tests.some(
          (m, i) => (m?.name || "").trim() !== correctedResults[i].correctedName
        );
        if (!anyChanged) return;

        setData((prev) => ({
          ...prev,
          tests: (prev?.tests || []).map((m, idx) => ({
            ...m,
            name: correctedResults[idx].correctedName,
            refinedName: correctedResults[idx].correctedName,
            edited: false,
            // Add metadata for fuzzy search corrected name with full data
            metadata: {
              ...m.metadata,
              fuzzyCorrectedName: correctedResults[idx].correctedName,
              originalName: m.name,
              isFuzzyCorrected: true,
              ...(correctedResults[idx].fullData || {}),
            },
          })),
        }));
      } finally {
      }
    },
    [data?.tests, setData]
  );

  const syncVitalsToContext = useCallback((vitalsObject) => {
    if (vitalsObject && typeof vitalsObject === 'object' && Object.keys(vitalsObject).length > 0 && setVitalsData) {
      const vitalsData = vitalsObject;
      let systolic = vitalsData.Systolic || '';
      let diastolic = vitalsData.Diastolic || '';
      let blood_press = vitalsData.bloodPressure || '';
      
      if (blood_press && !systolic && !diastolic) {
        const bpParts = String(blood_press).split('/');
        if (bpParts.length === 2) {
          systolic = bpParts[0].trim();
          diastolic = bpParts[1].trim();
        }
      } else if (!blood_press && systolic && diastolic) {
        blood_press = `${systolic}/${diastolic}`;
      }
      if (!systolic || !diastolic) {
        blood_press = '';
      }
      
      const vitalsArray = [{
        date: vitalsData.date || moment().format('YYYY-MM-DD'),
        temp: String(vitalsData.temperature || '').trim(),
        pres: String(vitalsData.pulse || '').trim(),
        resp_rate: String(vitalsData.respRate || '').trim(),
        systolic: String(systolic).trim(),
        diastolic: String(diastolic).trim(),
        blood_press: String(blood_press).trim(),
        spo2: String(vitalsData.spo2 || '').trim(),
        height: String(vitalsData.height || '').trim(),
        weight: String(vitalsData.weight || '').trim(),
        ofc: String(vitalsData.ofc || vitalsData.OFC || '').trim(),
        sugar: String(vitalsData.sugar || '').trim(),
        general_rbs: String(vitalsData['General RBS'] || vitalsData.general_rbs || '').trim(),
        fib4: String(vitalsData.FIB4 || vitalsData.fib4 || '').trim(),
        waist_circumference: String(vitalsData['Waist Circumference'] || vitalsData.waist_circumference || '').trim(),
        bmi: String(vitalsData.BMI || vitalsData.bmi || '').trim(),
        bmr: String(vitalsData.BMR || vitalsData.bmr || '').trim(),
        bsa: String(vitalsData.BSA || vitalsData.bsa || '').trim()
      }];
      setVitalsData(vitalsArray);
    }
  }, [setVitalsData]);

  const vitalsUpdater = useMemo(() => {
    const baseUpdater = (vitalsObject) => {
      if (!setData) return;
      
      // Enrich vitals with BMI, BMR, BSA calculations
      const patientInfo = context?.patient_data ? {
        age: context.patient_data.ageYears || context.patient_data.age || context.patient_data.pm_age,
        gender: context.patient_data.pm_gender || context.patient_data.gender
      } : {};
      const enrichedVitals = enrichVitalsWithCalculations(vitalsObject || {}, patientInfo);
      
      const shouldPreserve = sectionsStore.current && sectionsStore.current.has('vitalsAndBodyComposition');
      setData((prev = {}) => {
        const updatedData = { ...prev };
        if (shouldPreserve) {
          updatedData.vitalsAndBodyComposition = enrichedVitals && typeof enrichedVitals === 'object' ? enrichedVitals : {};
        } else {
          updatedData.vitalsAndBodyComposition = enrichedVitals || {};
        }
        return updatedData;
      });
      
      syncVitalsToContext(enrichedVitals);
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    if (typeof onVitalsUpdate === "function") {
      return (vitalsObject) => {
        onVitalsUpdate(vitalsObject);
        baseUpdater(vitalsObject);
      };
    }
    return baseUpdater;
  }, [onVitalsUpdate, setData, sectionsStore, syncVitalsToContext, onRxEdited, context?.patient_data]);

  const medicalHistoryUpdater = useMemo(() => {
    const baseUpdater = (medicalHistoryArray) => {
      if (!setData) return;
      
      const shouldPreserve = sectionsStore.current && sectionsStore.current.has('medicalHistory');
      setData((prev = {}) => {
        const updatedData = { ...prev };
        if (shouldPreserve) {
          updatedData.medicalHistory = Array.isArray(medicalHistoryArray) ? medicalHistoryArray : [];
        } else {
          updatedData.medicalHistory = medicalHistoryArray || [];
        }
        return updatedData;
      });
      
      if (medicalHistoryArray && Array.isArray(medicalHistoryArray) && medicalHistoryArray.length > 0 && setMedicalHistoryData) {
        const convertedData = convertMedicalHistoryToContextFormat(medicalHistoryArray, contextMedicalHistoryData || []);
        setMedicalHistoryData(convertedData);
      }
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    if (typeof onMedicalHistoryUpdate === "function") {
      return (medicalHistoryArray) => {
        onMedicalHistoryUpdate(medicalHistoryArray);
        baseUpdater(medicalHistoryArray);
      };
    }
    return baseUpdater;
  }, [onMedicalHistoryUpdate, setData, sectionsStore, setMedicalHistoryData, contextMedicalHistoryData, onRxEdited]);

  const symptomsUpdater = useMemo(() => {
    const baseUpdater = (symptomsArray) => {
      if (!setData) return;
      
      const shouldPreserve = sectionsStore.current && sectionsStore.current.has('symptoms');
      setData((prev = {}) => {
        const updatedData = { ...prev };
        if (shouldPreserve) {
          updatedData.symptoms = Array.isArray(symptomsArray) ? symptomsArray : [];
        } else {
          updatedData.symptoms = symptomsArray || [];
        }
        return updatedData;
      });
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    if (typeof onSymptomsUpdate === "function") {
      return (symptomsArray) => {
        onSymptomsUpdate(symptomsArray);
        baseUpdater(symptomsArray);
      };
    }
    return baseUpdater;
  }, [onSymptomsUpdate, setData, sectionsStore, onRxEdited]);

  const examinationsUpdater = useMemo(() => {
    const baseUpdater = (examinationsArray) => {
      if (!setData) return;
      
      const shouldPreserve = sectionsStore.current && sectionsStore.current.has('examinations');
      setData((prev = {}) => {
        const updatedData = { ...prev };
        if (shouldPreserve) {
          updatedData.examinations = Array.isArray(examinationsArray) ? examinationsArray : [];
        } else {
          updatedData.examinations = examinationsArray || [];
        }
        return updatedData;
      });
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    if (typeof onExaminationsUpdate === "function") {
      return (examinationsArray) => {
        onExaminationsUpdate(examinationsArray);
        baseUpdater(examinationsArray);
      };
    }
    return baseUpdater;
  }, [onExaminationsUpdate, setData, sectionsStore, onRxEdited]);

  const diagnosisUpdater = useMemo(() => {
    const baseUpdater = (diagnosisArray) => {
      if (!setData) return;
      
      const shouldPreserve = sectionsStore.current && sectionsStore.current.has('diagnosis');
      setData((prev = {}) => {
        const updatedData = { ...prev };
        if (shouldPreserve) {
          updatedData.diagnosis = Array.isArray(diagnosisArray) ? diagnosisArray : [];
        } else {
          updatedData.diagnosis = diagnosisArray || [];
        }
        return updatedData;
      });
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    if (typeof onDiagnosisUpdate === "function") {
      return (diagnosisArray) => {
        onDiagnosisUpdate(diagnosisArray);
        baseUpdater(diagnosisArray);
      };
    }
    return baseUpdater;
  }, [onDiagnosisUpdate, setData, sectionsStore, onRxEdited]);

  const medicationsUpdater = useMemo(() => {
    const baseUpdater = (medicationsArray) => {
      if (!setData) return;
      setData((prev = {}) => ({
        ...prev,
        medications: medicationsArray,
      }));
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    if (typeof onMedicationsUpdate === "function") {
      return (medicationsArray) => {
        onMedicationsUpdate(medicationsArray);
        baseUpdater(medicationsArray);
      };
    }
    return baseUpdater;
  }, [onMedicationsUpdate, setData, onRxEdited]);

  const investigationsUpdater = useMemo(() => {
    const baseUpdater = (investigationArray) => {
      if (!setData) return;
      setData((prev = {}) => ({
        ...prev,
        labInvestigation: investigationArray,
      }));
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    if (typeof onLabInvestigationUpdate === "function") {
      return (investigationArray) => {
        onLabInvestigationUpdate(investigationArray);
        baseUpdater(investigationArray);
      };
    }
    return baseUpdater;
  }, [onLabInvestigationUpdate, setData, onRxEdited]);

  const labResultsUpdater = useMemo(() => {
    const baseUpdater = (labResultsArray) => {
      if (!setData) return;
      
      const shouldPreserve = sectionsStore.current && sectionsStore.current.has('labResults');
      setData((prev = {}) => {
        const updatedData = { ...prev };
        if (shouldPreserve) {
          updatedData.labResults = Array.isArray(labResultsArray) ? labResultsArray : [];
        } else {
          updatedData.labResults = labResultsArray || [];
        }
        return updatedData;
      });
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    if (typeof onLabResultsUpdate === "function") {
      return (labResultsArray) => {
        onLabResultsUpdate(labResultsArray);
        baseUpdater(labResultsArray);
      };
    }
    return baseUpdater;
  }, [onLabResultsUpdate, setData, sectionsStore, onRxEdited]);

  // Sync Rx pad data to context when data loads (initial load only)
  useEffect(() => {
    if (data && context && !isUpdatingFromContextRef.current) {
      if (data.medicalHistory && Array.isArray(data.medicalHistory) && data.medicalHistory.length > 0 && setMedicalHistoryData) {
        isUpdatingFromRxPadRef.current = true;
        const convertedData = convertMedicalHistoryToContextFormat(data.medicalHistory, contextMedicalHistoryData || []);
        setMedicalHistoryData(convertedData);
        setTimeout(() => {
          isUpdatingFromRxPadRef.current = false;
        }, 100);
      }
      
      if (data.vitalsAndBodyComposition && Object.keys(data.vitalsAndBodyComposition).length > 0 && setVitalsData) {
        syncVitalsToContext(data.vitalsAndBodyComposition);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.medicalHistory, data?.vitalsAndBodyComposition]);

  // Sync context medical history back to Rx pad when drawer saves
  useEffect(() => {
    if (contextMedicalHistoryData && Array.isArray(contextMedicalHistoryData) && contextMedicalHistoryData.length > 0 && setData && !isUpdatingFromRxPadRef.current) {
      const rxPadFormat = convertContextToRxPadFormat(contextMedicalHistoryData);
      if (rxPadFormat.length > 0) {
        isUpdatingFromContextRef.current = true;
        setData((prev = {}) => {
          const currentRxPadHistory = prev.medicalHistory || [];
          const currentRxPadSignature = JSON.stringify(currentRxPadHistory.map(item => ({
            name: item.name,
            type: item.type,
            enable: item.enable
          })));
          const contextSignature = JSON.stringify(rxPadFormat.map(item => ({
            name: item.name,
            type: item.type,
            enable: item.enable
          })));
          
          // Only update if context has new data not in Rx pad
          if (currentRxPadSignature !== contextSignature) {
            return {
              ...prev,
              medicalHistory: rxPadFormat
            };
          }
          return prev;
        });
        setTimeout(() => {
          isUpdatingFromContextRef.current = false;
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextMedicalHistoryData]);

  // Fuzzy-correct medication names ONCE when medications first become available
  useEffect(() => {
    if (!isGroundingAccessable) return;
    if (hasFuzzyRunMedsRef.current) return;
    const meds = data?.medications || [];
    if (!meds.length) return;
    hasFuzzyRunMedsRef.current = true;
    getFuzzySearchMedicine(meds);
  }, [data?.medications]);

  // Fuzzy-correct tests (lab investigations) ONCE when tests first become available
  useEffect(() => {
    if (!isGroundingAccessable) return;
    if (hasFuzzyRunTestsRef.current) return;
    const tests = data?.tests || [];
    if (!tests.length) return;
    hasFuzzyRunTestsRef.current = true;
    getFuzzySearchLabs(tests);
  }, [data?.tests]);

  const onSearchParent = (query) => {
    setSearchParentQuery((query || "").trimStart());
  };

  const adviceUpdater = useMemo(() => {
    const baseUpdater = (adviceArray) => {
      if (!setData) return;
      
      const shouldPreserve = sectionsStore.current && sectionsStore.current.has('advice');
      setData((prev = {}) => {
        const updatedData = { ...prev };
        if (shouldPreserve) {
          updatedData.advice = Array.isArray(adviceArray) ? adviceArray : [];
        } else {
          updatedData.advice = adviceArray || [];
        }
        return updatedData;
      });
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    return baseUpdater;
  }, [setData, sectionsStore, onRxEdited]);

  const vaccinationsUpdater = useMemo(() => {
    const baseUpdater = (vaccinationsArray) => {
      if (!setData) return;
      
      const shouldPreserve = sectionsStore.current && sectionsStore.current.has('vaccinations');
      setData((prev = {}) => {
        const updatedData = { ...prev };
        if (shouldPreserve) {
          updatedData.vaccinations = Array.isArray(vaccinationsArray) ? vaccinationsArray : [];
        } else {
          updatedData.vaccinations = vaccinationsArray || [];
        }
        return updatedData;
      });
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    return baseUpdater;
  }, [setData, sectionsStore, onRxEdited]);

  const followUpUpdater = useMemo(() => {
    const baseUpdater = (followUpText) => {
      if (!setData) return;
      
      const shouldPreserve = sectionsStore.current && sectionsStore.current.has('followUp');
      setData((prev = {}) => {
        const updatedData = { ...prev };
        if (shouldPreserve) {
          updatedData.followUp = typeof followUpText === 'string' ? followUpText : '';
        } else {
          updatedData.followUp = followUpText || '';
        }
        return updatedData;
      });
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    return baseUpdater;
  }, [setData, sectionsStore, onRxEdited]);

  const othersUpdater = useMemo(() => {
    const baseUpdater = (othersArray) => {
      if (!setData) return;
      
      const shouldPreserve = sectionsStore.current && sectionsStore.current.has('others');
      setData((prev = {}) => {
        const updatedData = { ...prev };
        if (shouldPreserve) {
          updatedData.others = Array.isArray(othersArray) ? othersArray : [];
        } else {
          updatedData.others = othersArray || [];
        }
        return updatedData;
      });
      if (typeof onRxEdited === "function") {
        onRxEdited(true);
      }
    };

    return baseUpdater;
  }, [setData, sectionsStore, onRxEdited]);

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
    if (activeType === "medications" || activeType === "tests") {
      setData((prev) => {
        const updated = { ...prev };
        const arr = Array.isArray(updated[activeType])
          ? [...updated[activeType]]
          : [];
        if (arr[activeIndex]) {
          arr[activeIndex] = {
            ...arr[activeIndex],
            name: value,
            refinedName: value,
            // Add metadata for selected option
            metadata: {
              ...arr[activeIndex].metadata,
              ...(option?.key ? JSON.parse(option.key) : {}),
              selectedValue: value,
            },
          };
          updated[activeType] = arr;
        }
        return updated;
      });
      editingRef.current = false;
      setTimeout(() => {
        handleInputBlur(activeType, activeIndex);
      }, 0);
    }
  };

  const onSelectTest = (value, option) => {
    // Open Add Custom popup if needed (investigation_id === 0)
    try {
      const meta = option?.key ? JSON.parse(option.key) : null;
      if (meta && meta.investigation_id === 0) {
        // For now, just add the custom test directly since we don't have a custom test popup
        setEditableText(value);
        if (activeType === "tests") {
          setData((prev) => {
            const updated = { ...prev };
            const arr = Array.isArray(updated[activeType])
              ? [...updated[activeType]]
              : [];
            if (arr[activeIndex]) {
              arr[activeIndex] = {
                ...arr[activeIndex],
                name: value,
                refinedName: value,
                // Add metadata for selected option
                metadata: {
                  ...arr[activeIndex].metadata,
                  ...(option?.key ? JSON.parse(option.key) : {}),
                  selectedValue: value,
                },
              };
              updated[activeType] = arr;
            }
            return updated;
          });
          editingRef.current = false;
          setTimeout(() => {
            handleInputBlur(activeType, activeIndex);
          }, 0);
        }
        return;
      }
    } catch {}

    setEditableText(value);
    if (activeType === "tests") {
      setData((prev) => {
        const updated = { ...prev };
        const arr = Array.isArray(updated[activeType])
          ? [...updated[activeType]]
          : [];
        if (arr[activeIndex]) {
          arr[activeIndex] = {
            ...arr[activeIndex],
            name: value,
            refinedName: value,
            // Add metadata for selected option
            metadata: {
              ...arr[activeIndex].metadata,
              ...(option?.key ? JSON.parse(option.key) : {}),
              selectedValue: value,
            },
          };
          updated[activeType] = arr;
        }
        return updated;
      });
      // Persist and exit edit mode so selection reflects immediately in UI
      editingRef.current = false;
      setTimeout(() => {
        handleInputBlur(activeType, activeIndex);
      }, 0);
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
    // Live update name for medications/tests at current index
    if (activeType === "medications" || activeType === "tests") {
      setData((prev) => {
        const updated = { ...prev };
        const arr = Array.isArray(updated[activeType])
          ? [...updated[activeType]]
          : [];
        if (arr[activeIndex]) {
          arr[activeIndex] = {
            ...arr[activeIndex],
            name: value,
            refinedName: value,
          };
          updated[activeType] = arr;
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

    if (type === "vitals-key") {
      const isNumberKey = /^\d+$/.test(index);
      const label = isNumberKey
        ? index
        : index
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase());
      setEditableKey(label);
    } else if (type === "vitals") {
      setEditableText(data.vitals[index] || "");
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
    setEditableLineItem(type === "diagnosis" || type === "examination" || type === "dynamicFields" ? src?.notes : src?.lineItem);
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
      } else if (type === "medications" || type === "tests") {
        const name = isLineItem ? cur?.name || prev[type]?.name : currentText || cur?.name;
        const lineItem = isLineItem ? currentText || cur?.lineItem || prev[type]?.lineItem : cur?.lineItem;
        arr[index] = currentText ? { ...(cur || {}), name, refinedName: name, lineItem } : cur;
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

  const renderVitals = () => (
    <div
      data-section="vitals"
      ref={(el) => (sectionRefs.current["vitals"] = el)}
      className={`digitised-section-rx ${
        visibleSection === "vitals" ? "highlight-blue" : ""
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
      ) : (
        <ul>
          {Object.entries(data.vitals || {}).map(([key, value]) => {
            let textWidth = 0;
            let keyWidth = 0;
            if (activeIndex === key && activeType === "vitals") {
              const temp = document.createElement("span");
              temp.style.visibility = "hidden";
              temp.style.position = "absolute";
              temp.style.whiteSpace = "nowrap";
              temp.innerText = editableText || "";
              document.body.appendChild(temp);
              textWidth = temp.offsetWidth;
              document.body.removeChild(temp);
            }
            if (activeIndex === key && activeType === "vitals-key") {
              const temp = document.createElement("span");
              temp.style.visibility = "hidden";
              temp.style.position = "absolute";
              temp.style.whiteSpace = "nowrap";
              temp.innerText = editableKey || "";
              document.body.appendChild(temp);
              keyWidth = temp.offsetWidth;
              document.body.removeChild(temp);
            }

            const isNumberKey = /^\d+$/.test(key);
            const label = isNumberKey
              ? `${key}: `
              : `${key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase())}: `;

            return (
              <li key={key}>
                <div className="medicine-item">
                  {activeIndex === key && activeType === "vitals-key" ? (
                    <input
                      ref={inputRef}
                      data-vitals-key={key}
                      type="text"
                      value={editableKey}
                      className="editable-digitised-item"
                      onChange={(e) => setEditableKey(e.target.value)}
                      onBlur={() => {
                        editingRef.current = false;
                        handleInputBlur("vitals-key", key);
                      }}
                      onFocus={() => {
                        editingRef.current = true;
                        setVisibleSection("vitals");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleInputBlur("vitals-key", key);
                        }
                      }}
                      autoFocus
                      style={{ width: `clamp(12px, ${keyWidth + 10}px, 100%)` }}
                    />
                  ) : (
                    <span
                      onClick={() => handleItemClick("vitals-key", key)}
                      className="digitised-item"
                    >
                      {label}
                    </span>
                  )}
                  {activeIndex === key && activeType === "vitals" ? (
                    <input
                      ref={inputRef}
                      data-vitals-key={key}
                      type="text"
                      value={editableText}
                      className="editable-digitised-item"
                      onChange={(e) => setEditableText(e.target.value)}
                      onBlur={() => {
                        editingRef.current = false;
                        handleInputBlur("vitals", key);
                      }}
                      onFocus={() => {
                        editingRef.current = true;
                        setVisibleSection("vitals");
                      }}
                      autoFocus
                      style={{
                        width: `clamp(12px, ${textWidth + 10}px, 100%)`,
                      }}
                    />
                  ) : (
                    <span
                      onClick={() => handleItemClick("vitals", key)}
                      className="digitised-item"
                    >
                      {value || "_"}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  const renderFollowUp = () => {
    let textWidth = 0;
    if (activeType === "followUp") {
      const temp = document.createElement("span");
      temp.style.visibility = "hidden";
      temp.style.position = "absolute";
      temp.style.whiteSpace = "nowrap";
      temp.innerText = editableText || "";
      document.body.appendChild(temp);
      textWidth = temp.offsetWidth;
      document.body.removeChild(temp);
    }
    return (
      <div className="medicine-item digitised-rx-follow-up-item">
        {activeType === "followUp" ? (
          <input
            type="text"
            value={editableText}
            className="editable-digitised-item"
            onChange={handleInputChange}
            onBlur={() => {
              editingRef.current = false;
              handleInputBlur("followUp");
            }}
            onFocus={() => {
              editingRef.current = true;
              setVisibleSection("followUp");
            }}
            autoFocus
            style={{ width: `clamp(12px, ${textWidth + 10}px, 100%)` }}
          />
        ) : (
          <span
            onClick={() => handleItemClick("followUp")}
            className="digitised-item"
          >
            {data?.followUp}
          </span>
        )}
      </div>
    );
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
                      ) : type === "tests" ? (
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
                      type === "tests") &&
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

                    {/* Editable input for notes (examination/diagnosis/dynamicFields) */}
                    {(type === "examination" || type === "diagnosis" || type === "dynamicFields") &&
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
          <>{type === "followUp" && renderFollowUp()}</>
        )}
      </div>
    );
  };

  const hasValidContent = (type) => {
    if (!data[type] || !Array.isArray(data[type])) return false;
    return data[type].some((item) => {
      if (typeof item === "string") return item.trim().length > 0;
      const relevant = {
        medications: ["refinedName", "lineItem"],
        symptoms: ["name", "lineItem"],
        examination: ["name", "notes"],
        diagnosis: ["name", "notes"],
        medicalHistory: ["name", "lineItem"],
        vaccinations: ["name", "lineItem"],
        tests: ["refinedName", "lineItem"],
        dynamicFields: ["title", "notes"],
        others: ["name"],
        labResults: ["testname", "value", "notes"],
      }[type] || ["name"];
      return relevant.some((f) => item[f]?.trim?.()?.length > 0);
    });
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
      tests: investigationArray,
    }));
  }, []);

  return (
    <div
      className={
        loading ? "loading-digitised-container" : "digitised-container"
      }
      ref={containerRef}
    >
      {loading ? (
        <GenRXLoaders
          showAbsHeaderInsideLoader={showAbsHeaderInsideLoader}
          isProcessing={true}
          isSnapRx={true}
        />
      ) : (
        <>
          {data?.vitals &&
            Object.values(data.vitals).some((v) => v?.trim?.()?.length > 0) && (
              <div
                ref={(el) => (sectionRefs.current["vitals"] = el)}
                className="title-digitise-section-wrapper"
              >
                <div className="title-digitise-section mb-2">Vitals</div>
                {renderVitals()}
              </div>
            )}

          {data?.medicalHistory && hasValidContent("medicalHistory") && (
            <div className="title-digitise-section-wrapper">
              <div className="title-digitise-section mb-2">Medical History</div>
              {renderArraySection("medicalHistory")}
            </div>
          )}

          {data?.symptoms && hasValidContent("symptoms") && (
            <div className="title-digitise-section-wrapper">
              <div className="title-digitise-section mb-2">Symptoms</div>
              {renderArraySection("symptoms")}
            </div>
          )}

          {data?.examination && hasValidContent("examination") && (
            <div className="title-digitise-section-wrapper">
              <div className="title-digitise-section mb-2">Examination</div>
              {renderArraySection("examination")}
            </div>
          )}

          {data?.diagnosis && hasValidContent("diagnosis") && (
            <div className="title-digitise-section-wrapper">
              <div className="title-digitise-section mb-2">Diagnosis</div>
              {renderArraySection("diagnosis")}
            </div>
          )}

          {data?.medications &&
            hasValidContent("medications") &&
            Array.isArray(data?.medications) &&
            data?.medications.length > 0 && (
              <MedicationsTable
                medications={data?.medications}
                onUpdate={handleMedicationsUpdate}
                isProcessing={false}
              />
            )}

          {data?.tests &&
            Array.isArray(data?.tests) &&
            data?.tests.length > 0 && (
              <LabInvestigationTable
                labInvestigation={data?.tests}
                onUpdate={handleInvestigationUpdate}
                isProcessing={false}
              />
            )}

          {data?.advice && hasValidContent("advice") && (
            <div className="title-digitise-section-wrapper">
              <div className="title-digitise-section mb-2">Advices</div>
              {renderArraySection("advice")}
            </div>
          )}

          {data?.vaccinations && hasValidContent("vaccinations") && (
            <div className="title-digitise-section-wrapper">
              <div className="title-digitise-section mb-2">Vaccination</div>
              {renderArraySection("vaccinations")}
            </div>
          )}

          {data?.followUp && (
            <div className="title-digitise-section-wrapper">
              <div className="title-digitise-section mb-2">Follow Up</div>
              {renderArraySection("followUp")}
            </div>
          )}

          {data?.labResults && hasValidContent("labResults") && (
            <div className="title-digitise-section-wrapper">
              <div className="title-digitise-section mb-2">Lab Results</div>
              {renderArraySection("labResults")}
            </div>
          )}

          {data?.dynamicFields && hasValidContent("dynamicFields") && (
            <div className="title-digitise-section-wrapper">
              <div className="title-digitise-section mb-2">Dynamic Modules</div>
              {renderArraySection("dynamicFields")}
            </div>
          )}

          {data?.others && hasValidContent("others") && (
            <div className="title-digitise-section-wrapper">
              <div className="title-digitise-section mb-2">Others</div>
              {renderArraySection("others")}
            </div>
          )}
        </>
      )}
      {showAddMedicinePopup && (
        <CustomMedicinePopup
          isOpen={showAddMedicinePopup}
          onCancel={() => setShowAddMedicinePopup(false)}
          initialData={{ tmm_medicine_name: searchParentQuery }}
        />
      )}
    </div>
  );
};

export default DigitisedPrescription;
