import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import { isMobile } from "react-device-detect";
import { jwtDecode } from "jwt-decode";
// import { errorMessage } from "../utils/utils";
import documentIcon from "../../assets/images/document-normal.svg";
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { getInvestigationAndMedicine, addCaseManager, editCaseManager } from "../../redux/caseManagerSlice";
import { placeIctOrder } from "../../redux/appointmentsSlice";
import { env } from "../../EnvironmentConfig";
import HeaderSmartRxDigitise from "../../common/HeaderSmartRxDigitise";
import DigitisedPrescription from "../../components/DigitisedPrescription";
import axios from "axios";
import { trackEvent } from "../../utils/utils";
import { EVENTS } from "../../utils/events";
import { getDecodedToken } from "../../utils/localStorage";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { GB_ZYDUS_USER } from "../../utils/constants";
import ApiMedication from "../../api/services/ApiMedication";
import ApiVitals from "../../api/services/ApiVitals";
import { addPatientLabReports } from "../../api/services/ApiLabParams";
import { mapLabResultsToStandardized } from "../../utils/mapLabResults";
import moment from "moment";
import { enrichVitalsWithCalculations } from "../../utils/vitalsCalculations";
import CashManagerContext from "../../context/CashManagerContext";

function SnapRxDigitise() {
  // Minimal resizable split state
  const splitRef = useRef(null);
  const isResizingRef = useRef(false);
  const [leftWidthPercent, setLeftWidthPercent] = useState(30);

  const { loading } = useSelector((state) => state.caseManager);
  const { siteId, storeCode } = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const {
    patient_data,
    smartRxFilesData,
    tcm_id,
    print_url,
    digitisedData,
    pam_id,
    isCustomSSRX,
  } = state;

  const isZydusUserAccessableFromGB = useFeatureIsOn(GB_ZYDUS_USER);
  const [token, setToken] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const smartRxFile = smartRxFilesData;
  
  const [medicalHistoryData, setMedicalHistoryData] = useState([]);
  const [vitalsData, setVitalsData] = useState([]);
  const [labResultsSavedFromSidebar, setLabResultsSavedFromSidebar] = useState(false);

  const baseUrlRxDigitise = env.digitization_api_url;

  // Ensure medications default edited flag is present
  const normalizeEditedFlag = useCallback((src) => {
    if (!src || typeof src !== "object") return src;
    const meds = Array.isArray(src.medications) ? src.medications : [];

    const vitalsSource = src.vitalsAndBodyComposition || src.vitals;
    const mappedVitals = vitalsSource
      ? {
          temperature: vitalsSource.temperature || vitalsSource.temp || vitalsSource.Temp || "",
          pulse: vitalsSource.pulse || vitalsSource.Pulse || vitalsSource.pres || "",
          respRate: vitalsSource.respRate || vitalsSource.resp_rate || vitalsSource.respRate || vitalsSource.RespRate || vitalsSource.Resp_rate || "",
          Systolic: vitalsSource.Systolic || vitalsSource.systolic || "",
          Diastolic: vitalsSource.Diastolic || vitalsSource.diastolic || "",
          bloodPressure: vitalsSource.bloodPressure || vitalsSource.blood_press || "",
          spo2: vitalsSource.spo2 || vitalsSource.SPO2 || "",
          height: vitalsSource.height || "",
          weight: vitalsSource.weight || "",
          ofc: vitalsSource.ofc || vitalsSource.OFC || "",
          sugar: vitalsSource.sugar || vitalsSource.Sugar || "",
          general_rbs: vitalsSource.general_rbs || vitalsSource.GeneralRBS || vitalsSource["General RBS"] || "",
          fib4: vitalsSource.fib4 || vitalsSource.FIB4 || "",
          waist_circumference: vitalsSource.waist_circumference || vitalsSource.WaistCircumference || "",
          BMI: vitalsSource.BMI || vitalsSource.bmi || "",
          BMR: vitalsSource.BMR || vitalsSource.bmr || "",
          BSA: vitalsSource.BSA || vitalsSource.bsa || "",
        }
      : null;

    const normalized = {
      ...src,
      medications: meds.map((m) => ({ ...m, edited: false })),
      ...(mappedVitals ? { vitalsAndBodyComposition: mappedVitals } : {}),
    };
    
    if (normalized.vitalsAndBodyComposition && Object.keys(normalized.vitalsAndBodyComposition).length > 0) {
      const patientInfo = patient_data ? {
        age: patient_data.ageYears || patient_data.age || patient_data.pm_age,
        gender: patient_data.pm_gender || patient_data.gender
      } : {};
      normalized.vitalsAndBodyComposition = enrichVitalsWithCalculations(
        normalized.vitalsAndBodyComposition,
        patientInfo
      );
    }
    if (!normalized.examinations && Array.isArray(normalized.examination)) {
      normalized.examinations = normalized.examination;
    }
    
    // Map lab results to standardized names (matching sidebar)
    if (Array.isArray(normalized.labResults) && normalized.labResults.length > 0) {
      normalized.labResults = mapLabResultsToStandardized(normalized.labResults);
    }
    
    return normalized;
  }, [patient_data]);

  const formatMedicalHistoryForApi = useCallback((contextMedicalHistory = []) => {
    if (!Array.isArray(contextMedicalHistory) || contextMedicalHistory.length === 0) {
      return [];
    }

    return contextMedicalHistory.map((section) => ({
      title: section?.title || section?.section_name || "",
      tmmhs_id: section?.tmmhs_id || 0,
      no_know_history: section?.no_know_history !== undefined ? section?.no_know_history : false,
      tags:
        !section?.no_know_history && Array.isArray(section?.tags)
          ? section.tags
              .filter((tag) => tag?.enable === "Y" || tag?.enable === "N")
              .map((tag) => ({
                tmmhst_id: tag?.tmmhst_id || 0,
                title: tag?.title || "",
                pms_default: tag?.pms_default || 0,
                since: tag?.since || "",
                status: tag?.status || "",
                medication: tag?.medication || "",
                note: tag?.note || "",
                enable: tag?.enable || "Y",
                relationship: tag?.relationship || "",
              }))
          : [],
    }));
  }, []);

  const formatLabResultsForApi = useCallback((labResults = []) => {
    if (!Array.isArray(labResults) || labResults.length === 0) return [];
    const today = moment().format("YYYY-MM-DD");
    const groupedByDate = {};
    labResults.forEach((result = {}) => {
      const dateKey = result.date || today;
      const testname = result.testname || result.name || "Result";
      const value = result.value || "";
      const units = result.units || "";
      if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
      // Extract value and units from display format (e.g., "23 mg/dl" -> value: "23", units: "mg/dl")
      let cleanValue = value;
      let cleanUnits = units;
      if (value && !units) {
        const parts = String(value).trim().split(/\s+/);
        if (parts.length > 1) {
          cleanValue = parts.slice(0, -1).join(" ");
          cleanUnits = parts[parts.length - 1];
        }
      }
      groupedByDate[dateKey].push({
        reportName: result.reportName || "",
        testName: testname,
        value: cleanValue,
        units: cleanUnits,
        refRange: result.refRange || "",
        arrowDirection: result.arrowDirection || "",
      });
    });
    return Object.entries(groupedByDate).map(([date, inputs]) => ({
      date,
      inputs: inputs.filter(input => input.value && input.value.trim() !== ""),
    })).filter(result => result.inputs.length > 0);
  }, []);

  const onMouseMoveResizer = useCallback((e) => {
    if (!isResizingRef.current || !splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const pct = (relativeX / rect.width) * 100;
    const clamped = Math.min(75, Math.max(25, pct));
    setLeftWidthPercent(clamped);
  }, []);

  const stopResizing = useCallback(() => {
    if (!isResizingRef.current) return;
    isResizingRef.current = false;
    document.removeEventListener("mousemove", onMouseMoveResizer);
    document.removeEventListener("mouseup", stopResizing);
  }, [onMouseMoveResizer]);

  const startResizing = useCallback(() => {
    isResizingRef.current = true;
    document.addEventListener("mousemove", onMouseMoveResizer);
    document.addEventListener("mouseup", stopResizing);
  }, [onMouseMoveResizer, stopResizing]);


  useEffect(() => {
    if (smartRxFile?.length > 0 && token && state?.type === "new") {
      digitizeRx();
    } else if (state?.type === "edit" && digitisedData) {
      setData(normalizeEditedFlag(digitisedData?.editedData));
      setIsLoading(false);
    } else if (state?.type === "review" && digitisedData) {
      setData(normalizeEditedFlag(digitisedData?.refinedData));
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, smartRxFile, digitisedData, state?.type]);


  useEffect(() => {
    const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
    setToken(token);
    if (token) {
      try {
        var decoded = jwtDecode(token);
        setTokenData(decoded.result);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSave = async () => {
    try {
      const cleanedToken = token.replace(/['"]+/g, "");

      const sanitizedMedications =
        data?.medications?.map((item) => {
          const quantityValue = item?.quantity;
          let quantity = 0;

          if (typeof quantityValue === "number" && Number.isFinite(quantityValue)) {
            quantity = quantityValue;
          } else if (quantityValue !== undefined && quantityValue !== null) {
            const parsedQuantity = Number(quantityValue);
            quantity = Number.isFinite(parsedQuantity) ? parsedQuantity : 0;
          }

          return {
            ...item,
            quantity,
          };
        }) || [];

      const quantityActionMedicine = await ApiMedication.getQuantity({
        medicines: sanitizedMedications,
      });
      const updatedPrescriptionData = {
        ...data,
        medications:
          sanitizedMedications.map((item, index) => {
            const quantityValue =
              quantityActionMedicine?.medicines?.[index]?.quantity;
            let quantity = 0;

            if (typeof quantityValue === "number" && Number.isFinite(quantityValue)) {
              quantity = quantityValue;
            } else if (quantityValue !== undefined && quantityValue !== null) {
              const parsedQuantity = Number(quantityValue);
              quantity = Number.isFinite(parsedQuantity) ? parsedQuantity : 0;
            }

            return {
              ...item,
              quantity,
            };
          }),
      };
      const payload = {
        tcm_id: tcm_id,
        patient_unique_id: patient_data?.patient_unique_id,
        editedData: { ...updatedPrescriptionData },
      };

      // API call to save the data
      const response = await axios.post(
        `${baseUrlRxDigitise}/api/v1/digitization/snap-rx/verify-digitized-rx`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanedToken}`,
          },
        }
      );
      // Handle navigation based on the API response
      if (response.status === 200) {
        state.type === "edit" &&
          trackEvent(EVENTS.SNAP_RX.editedByDoctor, {
            consultation_id: state?.tcm_id,
            doctor_id: getDecodedToken()?.user_id,
          });
        const isGroundingAccessable =
          tokenData?.hospital_business_id === env.zydus_business_id &&
          isZydusUserAccessableFromGB;

        // Call placeIctOrder for Zydus users
        if (isGroundingAccessableForZydus && patient_data?.departmentId) {
          let sendInvestigationAndMedicine = {
            patient_unique_id:
              patient_data !== undefined ? patient_data.patient_unique_id : 0,
            tcm_id: tcm_id,
          };
          const actionIM = await dispatch(
            getInvestigationAndMedicine(sendInvestigationAndMedicine)
          );
          if (actionIM.meta.requestStatus === "fulfilled") {
            
            let zydusSendData = {
              action: tcm_id === 0 ? "add" : "edit",
              tcmId: tcm_id,
              siteId: siteId,
              departmentId: patient_data?.departmentId,
              visitId: patient_data?.visitId,
              encounterId: patient_data?.encounterId,
              mrno: patient_data?.mrno,
              doctorCode: patient_data?.employeeId,
              storeCode: storeCode,
              duplicateCheck: 1,
              investigationList: data?.tests?.map((item) => item.name) || [],
              medicineList:
                data?.medications?.map(({ name, notes }, index) => ({
                  name: name,
                  quantity:
                    quantityActionMedicine?.medicines?.[index]?.quantity,
                  instruction: notes,
                })) || [],
              pillupSwitch: 0,
            };
            await dispatch(placeIctOrder(zydusSendData));
          }
        }

        // Fetch vitals for case manager payload 
        let vitalsForCase = [];
        try {
          const vitalsResp = await ApiVitals.getVitals({
            patient_unique_id: patient_data?.patient_unique_id || 0,
            pam_id: patient_data?.pam_id || pam_id || 0,
            mode: "ADD",
            pm_pid: patient_data?.pm_pid || 0,
            pm_id: patient_data?.pm_id || 0,
          });
          const patientInfo = patient_data ? {
            age: patient_data.ageYears || patient_data.age || patient_data.pm_age,
            gender: patient_data.pm_gender || patient_data.gender
          } : {};
          
          if (vitalsResp?.status && Array.isArray(vitalsResp.data) && vitalsResp.data.length > 0) {
            const today = moment().format('YYYY-MM-DD');
            // Only use vitals that are for today's date (check createdAt or date)
            const todayVitals = vitalsResp.data.filter(v => {
              const vitalDate = v.createdAt || v.created_at || v.createdDate || v.date;
              if (!vitalDate) return false;
              return moment(vitalDate).format('YYYY-MM-DD') === today;
            });
            
            if (todayVitals.length > 0) {
              const latestTodayVital = todayVitals.reduce((latest, current) => {
                const latestId = Math.max(Number(latest.tcv_id || 0), Number(latest.tcbc_id || 0));
                const currentId = Math.max(Number(current.tcv_id || 0), Number(current.tcbc_id || 0));
                return currentId > latestId ? current : latest;
              });
              vitalsForCase = [enrichVitalsWithCalculations(latestTodayVital, patientInfo)];
            } else {
              vitalsForCase = [];
            }
          }
          
          if (vitalsData && Array.isArray(vitalsData) && vitalsData.length > 0) {
            const today = moment().format('YYYY-MM-DD');
            vitalsData.forEach((v) => {
              const vitalDate = v.date || moment().format("YYYY-MM-DD");
              if (vitalDate === today) {
                const enrichedVital = enrichVitalsWithCalculations(v, patientInfo);
                const existingIndex = vitalsForCase.findIndex(vc => (vc.date || moment().format("YYYY-MM-DD")) === today);
                if (existingIndex >= 0) {
                  const existing = vitalsForCase[existingIndex];
                  const merged = { ...existing };
                  Object.keys(enrichedVital).forEach(key => {
                    if (key !== 'date' && key !== 'tcv_id' && key !== 'tcbc_id' && key !== 'dev_unique_id' && key !== 'pam_id') {
                      const vitalValue = enrichedVital[key];
                      if (key === 'general_rbs' || key === 'ofc' || key === 'fib4') {
                        merged[key] = vitalValue !== undefined ? vitalValue : '';
                      } else if (vitalValue !== undefined && vitalValue !== null && String(vitalValue).trim() !== '') {
                        merged[key] = vitalValue;
                      }
                    }
                  });
                  vitalsForCase[existingIndex] = merged;
                } else {
                  vitalsForCase.push(enrichedVital);
                }
              }
            });
          }
          
          // Merge Rx pad vitals with fetched vitals (which include sidebar edits)
          // Process if either Rx pad vitals exist OR we have vitals from sidebar/API
          const hasRxPadVitals = data?.vitalsAndBodyComposition && Object.keys(data.vitalsAndBodyComposition).length > 0;
          if (hasRxPadVitals || vitalsForCase.length > 0) {
            const sanitizeVitalsValue = (key, value) => {
              if (value === undefined || value === null) return "";
              const str = String(value).trim();
              if (key === 'bloodPressure' || key === 'blood_press') {
                return str.replace(/[^0-9/.-]/g, '').replace(/\/+/g, '/');
              }
              if (key === 'general_rbs' || key === 'General RBS' || key === 'ofc' || key === 'OFC' || key === 'fib4' || key === 'FIB4') {
                return str;
              }
              return str.replace(/[^0-9.-]/g, '');
            };
            const cleanVitals = hasRxPadVitals ? Object.fromEntries(
              Object.entries(data.vitalsAndBodyComposition || {}).map(([k, v]) => [k, sanitizeVitalsValue(k, v)])
            ) : {};

            let systolic = String(cleanVitals.Systolic || cleanVitals.systolic || '').trim();
            let diastolic = String(cleanVitals.Diastolic || cleanVitals.diastolic || '').trim();
            let blood_press = cleanVitals.bloodPressure || cleanVitals.blood_press || '';
            
            if (blood_press && !systolic && !diastolic) {
              const bpParts = String(blood_press).split('/');
              if (bpParts.length === 2) {
                systolic = bpParts[0].trim();
                diastolic = bpParts[1].trim();
              }
            }
            
            if (!systolic || !diastolic) {
              blood_press = '';
            } else if (!blood_press) {
              blood_press = `${systolic}/${diastolic}`;
            }
            
            const today = moment().format('YYYY-MM-DD');
            
            const rxPadVital = {
              date: today,
              temp: String(cleanVitals.temperature || cleanVitals.temp || '').trim(),
              pres: String(cleanVitals.pulse || cleanVitals.pres || '').trim(),
              resp_rate: String(cleanVitals.respRate || cleanVitals.resp_rate || '').trim(),
              systolic: systolic,
              diastolic: diastolic,
              spo2: String(cleanVitals.spo2 || cleanVitals.SPO2 || '').trim(),
              height: String(cleanVitals.height || cleanVitals.Height || '').trim(),
              weight: String(cleanVitals.weight || cleanVitals.Weight || '').trim(),
              ofc: String(cleanVitals.ofc || cleanVitals.OFC || cleanVitals.Ofc || '').trim(),
              sugar: String(cleanVitals.sugar || cleanVitals.Sugar || '').trim(),
              general_rbs: String(cleanVitals['General RBS'] || cleanVitals.general_rbs || cleanVitals.GeneralRBS || '').trim(),
              fib4: String(cleanVitals.FIB4 || cleanVitals.fib4 || cleanVitals.Fib4 || '').trim(),
              waist_circumference: String(cleanVitals['Waist Circumference'] || cleanVitals.waist_circumference || cleanVitals.WaistCircumference || '').trim(),
              bmi: String(cleanVitals.BMI || cleanVitals.bmi || '').trim(),
              bmr: String(cleanVitals.BMR || cleanVitals.bmr || '').trim(),
              bsa: String(cleanVitals.BSA || cleanVitals.bsa || '').trim()
            };
            if (systolic && diastolic) {
              rxPadVital.blood_press = blood_press;
            }
            
            const enrichedRxPadVital = enrichVitalsWithCalculations(rxPadVital, patientInfo);
            const existingTodayIndex = vitalsForCase.findIndex(v => (v.date || moment().format("YYYY-MM-DD")) === today);
            
            if (existingTodayIndex >= 0) {
              const existing = vitalsForCase[existingTodayIndex];
              const merged = { ...enrichedRxPadVital };
              Object.keys(existing).forEach(key => {
                if (key !== 'date' && key !== 'tcv_id' && key !== 'tcbc_id' && key !== 'dev_unique_id' && key !== 'pam_id') {
                  const rxValue = enrichedRxPadVital[key];
                  const existingValue = existing[key];
                  if (key === 'general_rbs' || key === 'ofc' || key === 'fib4') {
                    merged[key] = rxValue !== undefined && rxValue !== null && String(rxValue).trim() !== '' 
                      ? rxValue 
                      : (existingValue !== undefined && existingValue !== null && String(existingValue).trim() !== '' ? existingValue : '');
                  } else {
                    if (rxValue === undefined || rxValue === null || String(rxValue).trim() === '') {
                      if (existingValue !== undefined && existingValue !== null && String(existingValue).trim() !== '') {
                        merged[key] = existingValue;
                      }
                    }
                  }
                } else {
                  merged[key] = existing[key];
                }
              });
              const mergedSystolic = String(merged.systolic || '').trim();
              const mergedDiastolic = String(merged.diastolic || '').trim();
              if (!mergedSystolic || !mergedDiastolic) {
                merged.blood_press = '';
              }
              vitalsForCase[existingTodayIndex] = merged;
            } else {
              vitalsForCase.push(enrichedRxPadVital);
            }
            
            // Save merged vitals to API
            if (patient_data?.patient_unique_id) {
              const mergedVitalsArray = hasRxPadVitals 
                ? (existingTodayIndex >= 0 ? [vitalsForCase[existingTodayIndex]] : [enrichedRxPadVital])
                : vitalsForCase.filter(v => v.date === moment().format('YYYY-MM-DD'));
              if (mergedVitalsArray.length > 0) {
              mergedVitalsArray.forEach(v => {
                const systolic = String(v.systolic || '').trim();
                const diastolic = String(v.diastolic || '').trim();
                if (!systolic || !diastolic) {
                  v.blood_press = '';
                }
                  v.general_rbs = v.general_rbs !== undefined ? String(v.general_rbs).trim() : '';
                  v.ofc = v.ofc !== undefined ? String(v.ofc).trim() : '';
                  v.fib4 = v.fib4 !== undefined ? String(v.fib4).trim() : '';
              });
                const saveResult = await ApiVitals.addUpdateVitals({
                patient_unique_id: patient_data.patient_unique_id,
                pm_pid: patient_data.pm_pid || 0,
                pm_id: patient_data.pm_id || 0,
                pam_id: patient_data.pam_id || 0,
                patient_birth_weight: null,
                data: mergedVitalsArray
              });
                
                // Update vitalsForCase with saved data (with IDs) from API response for case manager payload
                if (saveResult?.status && Array.isArray(saveResult.data) && saveResult.data.length > 0) {
                  const savedVital = saveResult.data[0];
                  const enrichedSavedVital = enrichVitalsWithCalculations(savedVital, patientInfo);
                  const savedDate = enrichedSavedVital.date || moment().format("YYYY-MM-DD");
                  // Find existing entry for this date and update it, or add if not found
                  const existingDateIndex = vitalsForCase.findIndex(v => (v.date || moment().format("YYYY-MM-DD")) === savedDate);
                  if (existingDateIndex >= 0) {
                    vitalsForCase[existingDateIndex] = enrichedSavedVital;
                    } else {
                      vitalsForCase.push(enrichedSavedVital);
                  }
                }
              }
            }
          }
        } catch (err) {
          console.error("Error fetching vitals for case manager payload:", err);
        }

        const labResultsDataForApi = formatLabResultsForApi(data?.labResults || []);
        
        if (labResultsDataForApi.length > 0 && patient_data?.patient_unique_id && !labResultsSavedFromSidebar) {
          try {
            const decodedToken = getDecodedToken();
            const doctorId = decodedToken?.result?.user_id;
            const payload = {
              patientId: patient_data.patient_unique_id,
              doctorId: doctorId,
              results: labResultsDataForApi,
            };
            await addPatientLabReports(payload);
          } catch (err) {
            console.error("Error saving lab results to API:", err);
          }
        }

        const hasTcm = tcm_id !== undefined && tcm_id !== null;
        // Deduplicate vitals by date - keep only one entry per date (prefer highest tcv_id or most recent)
        const deduplicatedVitals = {};
        vitalsForCase.forEach((v) => {
          const dateKey = v.date || moment().format("YYYY-MM-DD");
          if (!deduplicatedVitals[dateKey]) {
            deduplicatedVitals[dateKey] = v;
          } else {
            // If duplicate exists, prefer the one with higher tcv_id (more recent), or merge fields
            const existing = deduplicatedVitals[dateKey];
            if (v.tcv_id && existing.tcv_id && v.tcv_id > existing.tcv_id) {
              deduplicatedVitals[dateKey] = v;
            } else if (!existing.tcv_id && v.tcv_id) {
              deduplicatedVitals[dateKey] = v;
            } else {
              // Merge non-empty fields from both, preferring the newer one
              const merged = { ...existing };
              Object.keys(v).forEach(key => {
                if (key !== 'date' && key !== 'tcv_id' && key !== 'tcbc_id' && key !== 'dev_unique_id' && key !== 'pam_id') {
                  const vValue = v[key];
                  if (vValue !== undefined && vValue !== null && String(vValue).trim() !== '') {
                    merged[key] = vValue;
                  }
                }
              });
              deduplicatedVitals[dateKey] = merged;
            }
          }
        });
        const cleanedVitalsForCase = Object.values(deduplicatedVitals).map(v => {
          const cleaned = { ...v };
          const systolic = String(cleaned.systolic || '').trim();
          const diastolic = String(cleaned.diastolic || '').trim();
          if (!systolic || !diastolic) {
            cleaned.blood_press = '';
          }
          return cleaned;
        });
        if (hasTcm && patient_data?.patient_unique_id && ((Array.isArray(medicalHistoryData) && medicalHistoryData.length > 0) || labResultsDataForApi.length > 0 || cleanedVitalsForCase.length > 0)) {
          try {
            const formattedMedicalHistory = formatMedicalHistoryForApi(medicalHistoryData);
            if (formattedMedicalHistory.length > 0 || labResultsDataForApi.length > 0 || cleanedVitalsForCase.length > 0) {
              const consultationDate = moment().format("YYYY-MM-DD HH:mm:ss");
              const smartRxFiles = smartRxFilesData
                ?.map((file) => 
                  file?.smart_prescription_filename || 
                  file?.filename || 
                  file?.name
                )
                .filter(Boolean) || [];
              const smartFileName = smartRxFiles.length > 0 
                ? smartRxFiles[0] 
                : (data?.rxDigitizeEditedData?.fileName || data?.fileName || "");

              const sendData = {
                action: tcm_id === 0 ? "add" : "edit",
                tcm_id: tcm_id,
                patient_unique_id: patient_data.patient_unique_id,
                pam_id: patient_data?.pam_id || pam_id || 0,
                consultation_date: consultationDate,
                ...(formattedMedicalHistory.length > 0 && { medical_history: formattedMedicalHistory }),
                ...(labResultsDataForApi.length > 0 && { labParamsData: labResultsDataForApi }),
                ...(cleanedVitalsForCase.length > 0 && { vitals: cleanedVitalsForCase }),
                // Send ALL filenames as an array (like HeaderSmartPrescription.js does)
                // This ensures the backend print service includes all pages in the PDF
                ...(smartRxFiles.length > 0 ? { smart_prescription_filename: smartRxFiles } : 
                    (smartFileName ? { smart_prescription_filename: [smartFileName] } : {})),
              };

              const updateAction =
                tcm_id === 0
                  ? await dispatch(addCaseManager(sendData))
                  : await dispatch(editCaseManager(sendData));

              if (updateAction.meta.requestStatus !== "fulfilled") {
                console.error("Error saving medical history:", updateAction.error);
              }
            }
          } catch (error) {
            console.error("Error saving medical history to API:", error);
          }
        }
        
        // // Navigate based on isCustomSSRX flag
        // if (isCustomSSRX) {
        //   navigate("/smart-rx/preview", {
        //     replace: true,
        //     state: {
        //       patient_data,
        //       files: smartRxFilesData,
        //       tcm_id,
        //       pam_id: pam_id || patient_data?.pam_id,
        //       print_url,
        //       showProgressbar: false,
        //       page: "digitise",
        //     },
        //   });
        // } else {
        const navigationState = {
          patient_data,
          files: smartRxFilesData,
          tcm_id,
          pam_id: pam_id || patient_data?.pam_id,
          print_url,
          showProgressbar: false,
          page: "digitise",
        };
        
        navigate("/snap-rx/preview", {
          replace: true,
          state: navigationState,
        });
        // }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const digitizeRx = async () => {
    try {
      setIsLoading(true);

      const cleanedToken = token.replace(/['"]+/g, "");
      const response = await axios.post(
        `${baseUrlRxDigitise}/api/v1/digitization/snap-rx/digitize-rx`,
        {
          tcm_id: tcm_id,
          patient_unique_id: patient_data?.patient_unique_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanedToken}`,
          },
        }
      );

      // Update the digitized data
      if (response?.data?.data) {
        setData(normalizeEditedFlag(response.data.data.refinedData));
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const contextApi = {
    patient_data,
    tcmId: tcm_id,
    pamId: pam_id || patient_data?.pam_id || 0,
    consultationDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    medicalHistoryData,
    setMedicalHistoryData,
    vitalsData,
    setVitalsData,
  };

  return (
    <CashManagerContext.Provider value={contextApi}>
      <div style={{ minHeight: "100vh" }}>
        <HeaderSmartRxDigitise
          onSave={handleSave}
          isDigitiseRxLoading={isLoading}
          patient_data={patient_data}
          isSnapRx={true}
        />
        <div
          ref={splitRef}
          className={`${
            isMobile ? "p-0" : ""
          } w-100 bg-body prescription-wrapper srx-drx-container`}
          style={{ position: "relative" }}
        >
          <Row gutter={0} justify="center" wrap={false}>
            <Col
              md={17}
              lg={17}
              xl={10}
              style={{
                flex: `0 0 ${leftWidthPercent}%`,
                maxWidth: `${leftWidthPercent}%`,
                padding: 0,
              }}
            >
              <div className="snap-smart-left-panel">
                <div className="snap-smart-left-content">
                  {loading ? (
                    <div className="d-flex flex-column justify-content-center align-items-center h-100">
                      <Spin />
                    </div>
                  ) : (
                    smartRxFile?.length > 0 &&
                    smartRxFile?.map(({ fileUrl, smart_prescription_file }) => (
                      <div key={fileUrl || smart_prescription_file}>
                        {(isCustomSSRX ? smart_prescription_file : fileUrl) && (
                          <img
                            src={isCustomSSRX ? smart_prescription_file : fileUrl}
                            alt="Smart Rx"
                            className="written-rx-image"
                          />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Col>
            <Col
              md={17}
              lg={17}
              xl={10}
              style={{
                flex: `0 0 ${100 - leftWidthPercent}%`,
                maxWidth: `${100 - leftWidthPercent}%`,
                padding: 0,
              }}
            >
              <div className="snap-smart-right-panel">
                <div className="snap-smart-right-header">
                  <div className="snap-smart-header-title">
                    <img src={documentIcon} alt="Rx Pad" className="me-2" />
                    Digitized RX
                  </div>
                </div>
                <div className="snap-smart-right-body">
                  <DigitisedPrescription
                    data={data}
                    setData={setData}
                    loading={isLoading}
                    showAbsHeaderInsideLoader={isLoading}
                    enableInstructionBanner={false}
                    showHeader={false}
                    onLabResultsSaved={() => setLabResultsSavedFromSidebar(true)}
                  />
                </div>
              </div>
            </Col>
          </Row>
          {/* Draggable divider */}
          <div
            onMouseDown={startResizing}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${leftWidthPercent}%`,
              transform: "translateX(-8px)",
              width: 16,
              cursor: "col-resize",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: 32,
                height: 56,
                borderRadius: 16,
                background: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                border: "1px solid #E2E2EA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 16,
                  background:
                    "repeating-linear-gradient(to bottom, #C9CDD3, #C9CDD3 2px, transparent 2px, transparent 4px)",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </CashManagerContext.Provider>
  );
}

export default SnapRxDigitise;
