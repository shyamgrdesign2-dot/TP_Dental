import React, { useCallback, useMemo, useRef, useState, useContext, useEffect } from "react";
import { Button, Input } from "antd";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import GenRXLoaders from "./GenRxLoaders";
import VitalsRichTextEditor from "./VitalsRichTextEditor";
import MedicalHistoryRichTextEditor from "./MedicalHistoryRichTextEditor";
import SymptomsRichTextEditor from "./SymptomsRichTextEditor";
import ExaminationRichTextEditor from "./ExaminationRichTextEditor";
import DiagnosisRichTextEditor from "./DiagnosisRichTextEditor";
import MedicationsTable from "./MedicationsTable";
import LabInvestigationTable from "./LabInvestigationTable";
import LabResultsRichTextEditor from "./LabResultsRichTextEditor";
import AdviceRichTextEditor from "./AdviceRichTextEditor";
import VaccinationsRichTextEditor from "./VaccinationsRichTextEditor";
import AdditionalNotesRichTextEditor from "./AdditionalNotesRichTextEditor";
import FollowUpRichTextEditor from "./FollowUpRichTextEditor";
import CustomModuleRichTextEditor from "./CustomModuleRichTextEditor";
import CommonModal from "../common/CommonModal";
import styles from "./ConsultationDrawer.module.css";
import alertIcon from "../assets/images/alertIcon.svg";
import warningIcon from "../assets/images/danger.svg";
import documentIcon from "../assets/images/document-normal.svg";
import genRxBg from "../assets/images/gen-rx-bg.gif";
import CashManagerContext from "../context/CashManagerContext";
import moment from "moment";

const ensureRefObject = (maybeRef, fallbackRef) => {
  if (!maybeRef) return fallbackRef;
  if (maybeRef.current !== undefined) return maybeRef;
  return { current: maybeRef };
};

const DigitisedPrescription = ({
  data = {},
  setData,
  loading = false,
  showAbsHeaderInsideLoader = false,
  isProcessing: processingOverride,
  initiallyPopulatedSectionsRef,
  initialMedicalHistoryTypes = [],
  localModules,
  setLocalModules,
  enableInstructionBanner = true,
  showHeader = true,
  allowCustomModules = true,
  onVitalsUpdate,
  onMedicalHistoryUpdate,
  onSymptomsUpdate,
  onExaminationsUpdate,
  onDiagnosisUpdate,
  onMedicationsUpdate,
  onLabInvestigationUpdate,
  onLabResultsUpdate,
  onLabResultsSaved,
  onAdviceUpdate,
  onVaccinationsUpdate,
  onFollowUpUpdate,
  onOthersUpdate,
  onRxEdited,
}) => {
  const fallbackSectionsRef = useRef(new Set());
  const sectionsStore = useMemo(
    () => ensureRefObject(initiallyPopulatedSectionsRef, fallbackSectionsRef),
    [initiallyPopulatedSectionsRef]
  );

  const [internalModules, setInternalModules] = useState([]);
  const modules = localModules ?? internalModules;
  const updateModules = setLocalModules ?? setInternalModules;
  const normalizedDynamicFields = useMemo(() => {
    if (Array.isArray(data?.dynamicFields)) {
        return data.dynamicFields.reduce((acc, field, index) => {
          const key = field?.title?.trim() || `Custom ${index + 1}`;
          const notes = (field?.notes || '').trim();
          const title = field?.title || key;
          acc[key] = [
            {
              title,
              notes,
              lineItem: notes || title,
            },
          ];
          return acc;
        }, {});
    }
    return data?.dynamicFields || {};
  }, [data?.dynamicFields]);

  const [instructionDismissed, setInstructionDismissed] = useState(false);
  const [showModuleInput, setShowModuleInput] = useState(false);
  const [newModuleName, setNewModuleName] = useState("");
  const [editingModule, setEditingModule] = useState("");
  const [updatedModuleName, setUpdatedModuleName] = useState("");
  const [moduleToDelete, setModuleToDelete] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const resolvedProcessing = processingOverride ?? false;
  const showLoader = loading || resolvedProcessing;
  const instructionVisible = enableInstructionBanner && !instructionDismissed;

  const context = useContext(CashManagerContext);
  const { setMedicalHistoryData, setVitalsData, medicalHistoryData: contextMedicalHistoryData } = context || {};
  const isUpdatingFromRxPadRef = useRef(false);
  const isUpdatingFromContextRef = useRef(false);

  const convertMedicalHistoryToContextFormat = useCallback((apiMedicalHistory, existingContextData) => {
    if (!apiMedicalHistory || !Array.isArray(apiMedicalHistory) || apiMedicalHistory.length === 0) {
      return existingContextData || [];
    }

    const typeToIdMap = {
      'Lifestyle': 1,
      'Medical Condition': 2,
      'Family History': 3,
      'Allergies': 4,
      'Surgical History': 5,
      'lifestyle': 1,
      'medical_condition': 2,
      'family_history': 3,
      'allergies': 4,
      'surgical_history': 5
    };

    const groupedByType = {};
    apiMedicalHistory.forEach(item => {
      const type = item.type || 'Lifestyle';
      const normalizedType = type.toLowerCase().replace(/\s+/g, '_');
      if (normalizedType === 'others' || type === 'others' || type === 'Additional Notes' || normalizedType === 'additional_notes') {
        return; 
      }
      const mappedType = typeToIdMap[type] || typeToIdMap[normalizedType] || 1;
      const sectionName = type === 'Lifestyle' ? 'Lifestyle' : 
                         type === 'Medical Condition' || normalizedType === 'medical_condition' ? 'Medical Condition' :
                         type === 'Family History' || normalizedType === 'family_history' ? 'Family History' :
                         type === 'Allergies' || normalizedType === 'allergies' ? 'Allergies' :
                         type === 'Surgical History' || normalizedType === 'surgical_history' ? 'Surgical History' : 'Lifestyle';
      
      if (!groupedByType[mappedType]) {
        groupedByType[mappedType] = {
          tmmhs_id: mappedType,
          section_name: sectionName,
          tags: []
        };
      }
      let tagTitle = item.name || '';
      let tagEnable = item.enable || 'Y';
      if (!item.enable) {
        const nameToCheck = item.name || item.lineItem || '';
        if (nameToCheck.trim().toLowerCase().startsWith('no ')) {
          tagTitle = nameToCheck.trim().substring(3); 
          tagEnable = 'N';
        }
      }
      
      const tag = {
        tmmhst_id: Date.now() + Math.random(),
        title: tagTitle,
        enable: tagEnable,
        note: item.notes || '',
        since: item.duration || '',
        status: 'Active',
        relationship: item.relation || ''
      };
      
      groupedByType[mappedType].tags.push(tag);
    });

    const medicalHistoryDataArray = Object.values(groupedByType);

    if (existingContextData && existingContextData.length > 0) {
      const merged = existingContextData.map(existingSection => {
        const apiSection = groupedByType[existingSection.tmmhs_id];
        if (apiSection) {
          const existingTagNames = new Set(existingSection.tags.map(t => t.title?.toLowerCase()));
          const newTags = apiSection.tags.filter(tag => !existingTagNames.has(tag.title?.toLowerCase()));
          return {
            ...existingSection,
            tags: [...existingSection.tags, ...newTags]
          };
        }
        return existingSection;
      });

      Object.values(groupedByType).forEach(apiSection => {
        if (!merged.find(s => s.tmmhs_id === apiSection.tmmhs_id)) {
          merged.push(apiSection);
        }
      });

      return merged;
    } else {
      return medicalHistoryDataArray;
    }
  }, []);

  const convertContextToRxPadFormat = useCallback((contextMedicalHistory) => {
    if (!contextMedicalHistory || !Array.isArray(contextMedicalHistory) || contextMedicalHistory.length === 0) {
      return [];
    }

    const idToTypeMap = {
      1: 'lifestyle',
      2: 'medical_condition',
      3: 'family_history',
      4: 'allergies',
      5: 'surgical_history'
    };

    const rxPadArray = [];
    
    contextMedicalHistory.forEach(section => {
      if (section.no_know_history || !section.tags || section.tags.length === 0) {
        return;
      }

      const type = idToTypeMap[section.tmmhs_id] || 'others';
      
      section.tags.forEach(tag => {
        if (tag.enable === 'N') {
          rxPadArray.push({
            type: type,
            name: `No ${tag.title}`,
            enable: 'N',
            lineItem: `No ${tag.title}`
          });
        } else {
          const parts = [];
          if (tag.title) parts.push(tag.title);
          if (tag.since) parts.push(`Since: ${tag.since}`);
          if (tag.relationship) parts.push(`Relation: ${tag.relationship}`);
          if (tag.note) parts.push(`Notes: ${tag.note}`);
          
          rxPadArray.push({
            type: type,
            name: tag.title || '',
            enable: tag.enable || 'Y',
            duration: tag.since || '',
            relation: tag.relationship || '',
            notes: tag.note || '',
            lineItem: parts.length > 1 ? `${parts[0]} (${parts.slice(1).join(' | ')})` : (parts[0] || '')
          });
        }
      });
    });

    return rxPadArray;
  }, []);


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
      
      const shouldPreserve = sectionsStore.current && sectionsStore.current.has('vitalsAndBodyComposition');
      setData((prev = {}) => {
        const updatedData = { ...prev };
        if (shouldPreserve) {
          updatedData.vitalsAndBodyComposition = vitalsObject && typeof vitalsObject === 'object' ? vitalsObject : {};
        } else {
          updatedData.vitalsAndBodyComposition = vitalsObject || {};
        }
        return updatedData;
      });
      
      syncVitalsToContext(vitalsObject);
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
  }, [onVitalsUpdate, setData, sectionsStore, syncVitalsToContext, onRxEdited]);

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
  }, [onMedicalHistoryUpdate, setData, sectionsStore, setMedicalHistoryData, convertMedicalHistoryToContextFormat, contextMedicalHistoryData, onRxEdited]);

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

    if (typeof onAdviceUpdate === "function") {
      return (adviceArray) => {
        onAdviceUpdate(adviceArray);
        baseUpdater(adviceArray);
      };
    }
    return baseUpdater;
  }, [onAdviceUpdate, setData, sectionsStore, onRxEdited]);

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

    if (typeof onVaccinationsUpdate === "function") {
      return (vaccinationsArray) => {
        onVaccinationsUpdate(vaccinationsArray);
        baseUpdater(vaccinationsArray);
      };
    }
    return baseUpdater;
  }, [onVaccinationsUpdate, setData, sectionsStore, onRxEdited]);

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

    if (typeof onFollowUpUpdate === "function") {
      return (followUpText) => {
        onFollowUpUpdate(followUpText);
        baseUpdater(followUpText);
      };
    }
    return baseUpdater;
  }, [onFollowUpUpdate, setData, sectionsStore, onRxEdited]);

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

    if (typeof onOthersUpdate === "function") {
      return (othersArray) => {
        onOthersUpdate(othersArray);
        baseUpdater(othersArray);
      };
    }
    return baseUpdater;
  }, [onOthersUpdate, setData, sectionsStore, onRxEdited]);

  const updateDynamicFields = useCallback(
    (updater) => {
      if (!setData) return;
      setData((prev = {}) => {
        const dynamicFields = { ...(prev.dynamicFields || {}) };
        const nextDynamic = updater(dynamicFields);
        return { ...prev, dynamicFields: nextDynamic };
      });
    },
    [setData]
  );

  const hasSectionFlag = useCallback(
    (key) =>
      !!(
        sectionsStore.current &&
        typeof sectionsStore.current.has === "function" &&
        sectionsStore.current.has(key)
      ),
    [sectionsStore]
  );

  const flagSection = useCallback(
    (key) => {
      if (sectionsStore.current && typeof sectionsStore.current.add === "function") {
        sectionsStore.current.add(key);
      }
    },
    [sectionsStore]
  );

  const unflagSection = useCallback(
    (key) => {
      if (
        sectionsStore.current &&
        typeof sectionsStore.current.delete === "function" &&
        sectionsStore.current.has(key)
      ) {
        sectionsStore.current.delete(key);
      }
    },
    [sectionsStore]
  );

  const hasArrayContent = (value) => Array.isArray(value) && value.length > 0;
  const hasVitalsContent = useMemo(() => {
    const vitals = data?.vitalsAndBodyComposition || {};
    return Object.values(vitals).some((val) =>
      typeof val === "string" ? val.trim().length > 0 : !!val
    );
  }, [data?.vitalsAndBodyComposition]);

  const shouldRenderSection = (key, predicate) => hasSectionFlag(key) || predicate;

  const dynamicFieldEntries = useMemo(
    () => Object.entries(normalizedDynamicFields),
    [normalizedDynamicFields]
  );

  const handleCustomModuleUpdate = useCallback(
    (moduleName, moduleArray) => {
      updateDynamicFields((prevDynamic) => ({
        ...prevDynamic,
        [moduleName]: Array.isArray(moduleArray) ? moduleArray : [],
      }));
    },
    [updateDynamicFields]
  );

  const handleAddModule = () => {
    const trimmedName = newModuleName.trim();
    if (!trimmedName) return;

    updateDynamicFields((prevDynamic) => {
      if (prevDynamic[trimmedName]) return prevDynamic;
      const next = { ...prevDynamic, [trimmedName]: [] };
      return next;
    });

    updateModules((prev = []) =>
      prev.includes(trimmedName) ? prev : [...prev, trimmedName]
    );
    flagSection(`dynamicFields.${trimmedName}`);
    setShowModuleInput(false);
    setNewModuleName("");
  };

  const handleEditModule = () => {
    const trimmed = updatedModuleName.trim();
    if (!editingModule || !trimmed || trimmed === editingModule) {
      setEditingModule("");
      setUpdatedModuleName("");
        return;
      }

    updateDynamicFields((prevDynamic) => {
      if (!prevDynamic[editingModule]) return prevDynamic;
      const nextDynamic = { ...prevDynamic };
      nextDynamic[trimmed] = nextDynamic[editingModule];
      delete nextDynamic[editingModule];
      return nextDynamic;
    });

    updateModules((prev = []) =>
      prev.map((module) => (module === editingModule ? trimmed : module))
    );
    unflagSection(`dynamicFields.${editingModule}`);
    flagSection(`dynamicFields.${trimmed}`);
    setEditingModule("");
    setUpdatedModuleName("");
  };

  const handleConfirmDelete = () => {
    if (!moduleToDelete) return;
    updateDynamicFields((prevDynamic) => {
      if (!prevDynamic[moduleToDelete]) return prevDynamic;
      const next = { ...prevDynamic };
      delete next[moduleToDelete];
      return next;
    });
    updateModules((prev = []) => prev.filter((module) => module !== moduleToDelete));
    unflagSection(`dynamicFields.${moduleToDelete}`);
    setModuleToDelete("");
    setIsDeleteModalOpen(false);
  };

  const renderedBody = showLoader ? (
    <div
      className={`${styles.rightSection} ${styles.gradientBorder}`}
      style={{ background: `url(${genRxBg})` }}
    >
      <GenRXLoaders
        isProcessing={true}
        isSnapRx={true}
        showAbsHeaderInsideLoader={showAbsHeaderInsideLoader}
      />
          </div>
  ) : (
    <div className={styles.rightSection}>
      {instructionVisible && (
        <div className={styles.rxPadInstruction}>
          <div className={styles.instructionIcon}>
            <img src={warningIcon} alt="Warning" className={styles.dangerIcon} />
          </div>
          <div className={styles.instructionText}>
            Dictate the Rx or start a conversation with Ambient Rx. We&apos;ll
            automatically fill these details so you can focus on the patient.
        </div>
          <button
            className={styles.closeButton}
            onClick={() => setInstructionDismissed(true)}
            aria-label="Dismiss instruction"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}

      {hasVitalsContent && (
        <VitalsRichTextEditor
          vitalsAndBodyComposition={data?.vitalsAndBodyComposition || {}}
          onUpdate={vitalsUpdater}
          isProcessing={resolvedProcessing}
        />
      )}

      {shouldRenderSection("medicalHistory", hasArrayContent(data?.medicalHistory)) && (
        <MedicalHistoryRichTextEditor
          medicalHistory={data?.medicalHistory || []}
          onUpdate={medicalHistoryUpdater}
          initiallyPopulatedTypes={initialMedicalHistoryTypes}
          isProcessing={resolvedProcessing}
        />
      )}

      {shouldRenderSection("symptoms", hasArrayContent(data?.symptoms)) && (
        <SymptomsRichTextEditor
          symptoms={data?.symptoms || []}
          onUpdate={symptomsUpdater}
          isProcessing={resolvedProcessing}
        />
      )}

      {shouldRenderSection("examinations", hasArrayContent(data?.examinations)) && (
        <ExaminationRichTextEditor
          examinations={data?.examinations || []}
          onUpdate={examinationsUpdater}
          isProcessing={resolvedProcessing}
        />
      )}

      {shouldRenderSection("diagnosis", hasArrayContent(data?.diagnosis)) && (
        <DiagnosisRichTextEditor
          diagnosis={data?.diagnosis || []}
          onUpdate={diagnosisUpdater}
          isProcessing={resolvedProcessing}
        />
      )}

      {shouldRenderSection("medications", hasArrayContent(data?.medications)) && (
        <MedicationsTable
          medications={data?.medications || []}
          onUpdate={medicationsUpdater}
          isProcessing={resolvedProcessing}
        />
      )}

      {(() => {
        const labInvestigationData =
          Array.isArray(data?.labInvestigation) && data.labInvestigation.length
            ? data.labInvestigation
            : data?.tests || [];
        if (
          !shouldRenderSection(
            "labInvestigation",
            hasArrayContent(labInvestigationData)
          )
        ) {
          return null;
        }
              return (
          <LabInvestigationTable
            labInvestigation={labInvestigationData}
            onUpdate={investigationsUpdater}
            isProcessing={resolvedProcessing}
          />
        );
      })()}

      {shouldRenderSection("labResults", hasArrayContent(data?.labResults)) && (
        <LabResultsRichTextEditor
          labResults={data?.labResults || []}
          onUpdate={labResultsUpdater}
          isProcessing={resolvedProcessing}
          onLabResultsSaved={onLabResultsSaved}
        />
      )}

      {shouldRenderSection(
        "advice",
        Array.isArray(data?.advice)
          ? data.advice.length > 0
          : typeof data?.advice === "string" && data.advice.trim().length > 0
      ) && (
        <AdviceRichTextEditor
          advice={
            Array.isArray(data?.advice)
              ? data?.advice
              : data?.advice
              ? [{ lineItem: data.advice }]
              : []
          }
          onUpdate={adviceUpdater}
          isProcessing={resolvedProcessing}
        />
      )}

      {shouldRenderSection("vaccinations", hasArrayContent(data?.vaccinations)) && (
        <VaccinationsRichTextEditor
          vaccinations={data?.vaccinations || []}
          onUpdate={vaccinationsUpdater}
          isProcessing={resolvedProcessing}
        />
      )}

      {shouldRenderSection("others", hasArrayContent(data?.others)) && (
        <AdditionalNotesRichTextEditor
          others={data?.others || []}
          onUpdate={othersUpdater}
          isProcessing={resolvedProcessing}
        />
      )}

      {shouldRenderSection(
        "followUp",
        typeof data?.followUp === "string" && data.followUp.trim().length > 0
      ) && (
        <FollowUpRichTextEditor
          followUp={data?.followUp || ""}
          onUpdate={followUpUpdater}
          isProcessing={resolvedProcessing}
        />
      )}

      {allowCustomModules &&
        dynamicFieldEntries.map(([moduleName, moduleData]) => {
          const hasContent = hasArrayContent(moduleData);
          const shouldRender =
            hasSectionFlag(`dynamicFields.${moduleName}`) || hasContent;
          if (!shouldRender) return null;
          const isLocal = modules?.includes(moduleName);

          return (
            <CustomModuleRichTextEditor
              key={moduleName}
              moduleName={moduleName}
              moduleData={moduleData || []}
              onUpdate={(items) => handleCustomModuleUpdate(moduleName, items)}
              onDelete={() => {
                setModuleToDelete(moduleName);
                setIsDeleteModalOpen(true);
              }}
              onEdit={() => {
                setEditingModule(moduleName);
                setUpdatedModuleName(moduleName);
              }}
              isProcessing={resolvedProcessing}
              isLocalModule={isLocal}
              editingModule={editingModule}
              updatedModuleName={updatedModuleName}
              onEditNameChange={setUpdatedModuleName}
              onEditSave={handleEditModule}
              onEditCancel={() => {
                setEditingModule("");
                setUpdatedModuleName("");
              }}
            />
              );
            })}

      {allowCustomModules && showModuleInput && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Input
            placeholder="Enter custom module name"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
            className="custom-module-input"
                          onKeyDown={(e) => {
              if (e.key === "Enter") {
                              e.preventDefault();
                handleAddModule();
              }
            }}
          />
          <>
            <CheckOutlined className="input-action-icon tick-icon" onClick={handleAddModule} />
            <CloseOutlined
              className="input-action-icon cross-icon"
              onClick={() => {
                setShowModuleInput(false);
                setNewModuleName("");
              }}
            />
          </>
              </div>
            )}

      {allowCustomModules && (
        <div className="cta-container mt-4 mb-4" onClick={() => setShowModuleInput(true)}>
          <Button type="link" icon={<PlusOutlined />} className="add-custom-module-link">
            Add Custom Module
          </Button>
            </div>
          )}

      <div className={styles.disclaimer}>
        <span style={{ fontWeight: 500 }}>Disclaimer:</span> Our AI model aims to be
        accurate, but it may make mistakes. Please double-check all details to ensure they
        are correct and complete.
            </div>
            </div>
  );

  return (
    <>
      {showHeader && (
        <div className={styles.rxPadHeader}>
          <img src={documentIcon} alt="Rx Pad" className={styles.rxPadIcon} />
          <span className={styles.rxPadTitle}>Rx Pad</span>
            </div>
          )}
      {renderedBody}
      <CommonModal
        isModalOpen={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setModuleToDelete("");
        }}
        modalWidth={550}
        title={"Are you sure you want to delete this module?"}
        modalBody={
          <>
            <div className="d-flex align-items-start alert-warning rounded-10px p-3 patient-details">
              <img className="me-3" src={alertIcon} alt="Warning" />
              <span>
                This action will permanently delete the module and cannot be undone. Please
                confirm to proceed.
              </span>
            </div>
            <div className="mt-4">
              <div className="d-flex align-items-center mt-2 justify-content-end">
                <div
                  onClick={handleConfirmDelete}
                  className="me-4 text-decoration-underline btn p-0 text-main"
                >
                  Yes, Delete
            </div>
                <Button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setModuleToDelete("");
                  }}
                  className="lh-lg btn btn-primary3 btn-41 px-4"
                >
                  <span>No</span>
                </Button>
            </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default DigitisedPrescription;
