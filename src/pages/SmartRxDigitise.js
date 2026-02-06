import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import { isMobile } from "react-device-detect";
import { jwtDecode } from "jwt-decode";
// import { errorMessage } from "../utils/utils";
import documentIcon from "../assets/images/document-normal.svg";
import { S_RX_DIGITIZATION, FETCH_SMART_RX } from "../utils/constants";
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from "../utils/constants";
import api from "../api/services/axiosService";
import { useSelector, useDispatch } from "react-redux";
import { env } from "../EnvironmentConfig";
import { getInvestigationAndMedicine, addCaseManager, editCaseManager } from "../redux/caseManagerSlice";
import { placeIctOrder } from "../redux/appointmentsSlice";
import { getTokenData } from "../utils/utils";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { GB_ZYDUS_USER } from "../utils/constants";
import HeaderSmartRxDigitise from "../common/HeaderSmartRxDigitise";
import DigitisedPrescription from "../components/DigitisedPrescription";
import axios from "axios";
import { updateCredits } from "../redux/monetizationSlice";
import ApiMedication from "../api/services/ApiMedication";
import ApiVitals from "../api/services/ApiVitals";
import { addPatientLabReports } from "../api/services/ApiLabParams";
import { mapLabResultsToStandardized } from "../utils/mapLabResults";
import moment from "moment";
import { enrichVitalsWithCalculations } from "../utils/vitalsCalculations";
import CashManagerContext from "../context/CashManagerContext";

function SmartRxDigitise() {
  const splitRef = useRef(null);
  const isResizingRef = useRef(false);
  const [leftWidthPercent, setLeftWidthPercent] = useState(30);

  const { profile, siteId, storeCode } = useSelector((state) => state.doctors);
  const { loading } = useSelector((state) => state.caseManager);
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
  } = state;

  const [token, setToken] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [smartRxFile, setSmartRxFile] = useState(smartRxFilesData);
  
  // Fetch file URLs when smartRxFilesData contains only filenames (strings)
  useEffect(() => {
    const fetchFileUrls = async () => {
      if (!smartRxFilesData || !Array.isArray(smartRxFilesData) || smartRxFilesData.length === 0) {
        setSmartRxFile([]);
        return;
      }
      
      // Check if files are strings (filenames) or objects with URLs
      const isStringArray = smartRxFilesData.every(file => typeof file === 'string');
      
      if (isStringArray && tcm_id) {
        // Files are filenames, need to fetch URLs from API
        try {
          const baseUrl = { customBaseUrl: env.casemanager_api_url };
          const payload = { tcm_id };
          const response = await api.post(FETCH_SMART_RX, payload, baseUrl);
          
          if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
            setSmartRxFile(response.data);
          } else {
            setSmartRxFile(smartRxFilesData);
          }
        } catch (error) {
          console.error("Error fetching file URLs:", error);
          setSmartRxFile(smartRxFilesData);
        }
      } else {
        // Files are already objects, use as is
        setSmartRxFile(smartRxFilesData);
      }
    };
    
    fetchFileUrls();
  }, [smartRxFilesData, tcm_id]);
  const isZydusUserAccessableFromGB = useFeatureIsOn(GB_ZYDUS_USER);
  
  const [medicalHistoryData, setMedicalHistoryData] = useState([]);
  const [vitalsData, setVitalsData] = useState([]);
  const [labResultsSavedFromSidebar, setLabResultsSavedFromSidebar] = useState(false);
  // Grounding check (Zydus users)
  const tokenDataLocal = getTokenData();
  const isGroundingAccessable =
    tokenDataLocal?.hospital_business_id === env.zydus_business_id &&
    isZydusUserAccessableFromGB;

  const baseUrlRxDigitise = env.rx_digitization;

  const onMouseMoveResizer = useCallback((e) => {
    if (!isResizingRef.current || !splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const pct = (relativeX / rect.width) * 100;
    const clamped = Math.min(75, Math.max(25, pct));
    setLeftWidthPercent(clamped);
  }, []);

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
    if (smartRxFile?.length > 0 && state.type === "new") {
      if (token) {
        uploadFiles();
      } else {
        setIsLoading(true);
      }
    } else if (state.type === "edit" && digitisedData) {
      if (token) {
        uploadFiles();
      } else {
        setIsLoading(true);
      }
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, smartRxFile, digitisedData]);


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
        isDigitize: true,
        editedData: {
          ...updatedPrescriptionData,
        },
      };

      // API call to save the data
      const response = await axios.patch(
        `${baseUrlRxDigitise}/api/v1/rxdigitize/rx/${tcm_id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanedToken}`,
          },
        }
      );

      // Handle navigation based on the API response
      if (response.status === 204) {
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
              investigationList:
                actionIM?.payload?.investigation?.map(
                  (item) => item.investigation_name
                ) || [],
              medicineList:
                sanitizedMedications.map(({ name, notes }, index) => {
                  const quantityValue =
                    quantityActionMedicine?.medicines?.[index]?.quantity;
                  let quantity = 0;

                  if (
                    typeof quantityValue === "number" &&
                    Number.isFinite(quantityValue)
                  ) {
                    quantity = quantityValue;
                  } else if (quantityValue !== undefined && quantityValue !== null) {
                    const parsedQuantity = Number(quantityValue);
                    quantity = Number.isFinite(parsedQuantity) ? parsedQuantity : 0;
                  }

                  return {
                    name,
                    quantity,
                    instruction: notes,
                  };
                }),
              pillupSwitch: 0,
            };
            await dispatch(placeIctOrder(zydusSendData));
          }
        }

        // Fetch vitals for case manager payload (like voice/ambient)
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
                  const merged = { ...enrichedVital };
                  Object.keys(existing).forEach(key => {
                    if (key !== 'date' && key !== 'tcv_id' && key !== 'tcbc_id' && key !== 'dev_unique_id' && key !== 'pam_id') {
                      const sidebarValue = enrichedVital[key];
                      const existingValue = existing[key];
                      if (key === 'general_rbs' || key === 'ofc' || key === 'fib4') {
                        merged[key] = sidebarValue !== undefined && sidebarValue !== null && String(sidebarValue).trim() !== '' 
                          ? sidebarValue 
                          : (existingValue !== undefined && existingValue !== null && String(existingValue).trim() !== '' ? existingValue : '');
                      } else {
                        if (sidebarValue === undefined || sidebarValue === null || String(sidebarValue).trim() === '') {
                          if (existingValue !== undefined && existingValue !== null && String(existingValue).trim() !== '') {
                            merged[key] = existingValue;
                          }
                        }
                      }
                    } else {
                      merged[key] = existing[key];
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
            const patientInfo = patient_data ? {
              age: patient_data.ageYears || patient_data.age || patient_data.pm_age,
              gender: patient_data.pm_gender || patient_data.gender
            } : {};
            
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
            const payload = {
              patientId: patient_data.patient_unique_id,
              doctorId: profile?.doctor_unique_id || tokenData?.user_id,
              results: labResultsDataForApi,
            };
            await addPatientLabReports(payload);
          } catch (err) {
            console.error("Error saving lab results to API:", err);
          }
        }

        const hasTcm = tcm_id !== undefined && tcm_id !== null;
        const deduplicatedVitals = {};
        vitalsForCase.forEach((v) => {
          const dateKey = v.date || moment().format("YYYY-MM-DD");
          if (!deduplicatedVitals[dateKey]) {
            deduplicatedVitals[dateKey] = v;
          } else {
            const existing = deduplicatedVitals[dateKey];
            if (v.tcv_id && existing.tcv_id && v.tcv_id > existing.tcv_id) {
              deduplicatedVitals[dateKey] = v;
            } else if (!existing.tcv_id && v.tcv_id) {
              deduplicatedVitals[dateKey] = v;
            } else {
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
        const smartRxFiles = smartRxFilesData
          ?.map((file) => 
            file?.smart_prescription_filename || 
            file?.filename || 
            file?.name
          )
          .filter(Boolean) || [];
        
        const smartRxFileFilenames = smartRxFile
          ?.map((file) => 
            file?.smart_prescription_filename || 
            file?.filename || 
            file?.name
          )
          .filter(Boolean) || [];
        let allFilenames = [];
        if (smartRxFiles.length > 0) {
          allFilenames = smartRxFiles;
        } else if (smartRxFileFilenames.length > 0) {
          allFilenames = smartRxFileFilenames;
        } else {
          const fallbackFileName = 
            data?.rxDigitizeEditedData?.fileName ||
            data?.fileName ||
            "";
          if (fallbackFileName) {
            allFilenames = [fallbackFileName];
          }
        }

        if (
          hasTcm &&
          patient_data?.patient_unique_id &&
          (
            (Array.isArray(medicalHistoryData) && medicalHistoryData.length > 0) ||
            labResultsDataForApi.length > 0 ||
            cleanedVitalsForCase.length > 0 ||
            allFilenames.length > 0
          )
        ) {
          try {
            const formattedMedicalHistory = formatMedicalHistoryForApi(medicalHistoryData);
            if (formattedMedicalHistory.length > 0 || labResultsDataForApi.length > 0 || cleanedVitalsForCase.length > 0 || allFilenames.length > 0) {
              const consultationDate = moment().format("YYYY-MM-DD HH:mm:ss");

              const sendData = {
                action: tcm_id === 0 ? "add" : "edit",
                tcm_id: tcm_id,
                patient_unique_id: patient_data.patient_unique_id,
                pam_id: patient_data?.pam_id || pam_id || 0,
                consultation_date: consultationDate,
                ...(formattedMedicalHistory.length > 0 && { medical_history: formattedMedicalHistory }),
                ...(labResultsDataForApi.length > 0 && { labParamsData: labResultsDataForApi }),
                ...(cleanedVitalsForCase.length > 0 && { vitals: cleanedVitalsForCase }),
                // Send as array (like SnapRxDigitise and HeaderSmartPrescription do)
                ...(allFilenames.length > 0 ? { smart_prescription_filename: allFilenames } : {}),
              };

              const updateAction =
                tcm_id === 0
                  ? await dispatch(addCaseManager(sendData))
                  : await dispatch(editCaseManager(sendData));

              if (updateAction.meta.requestStatus !== "fulfilled") {
                console.error("Error saving to case manager:", updateAction.error);
              }
            }
            } catch (error) {
              console.error("Error saving medical history to API:", error);
            }
        }
        
        let sendData = {
          b2c_id: profile?.b2c,
          service_name: S_RX_DIGITIZATION,
        };
        dispatch(updateCredits(sendData));
        if (
          state?.page === "patient-summary" ||
          state?.page === "pending-digitization"
        ) {
          navigate(-1); // Go back to the previous page
        } else {
          navigate("/print-smart-rx", {
            replace: true,
            state: {
              patient_data,
              smartRxData: smartRxFilesData,
              tcm_id,
              pam_id: pam_id || patient_data?.pam_id,
              print_url,
              showProgressbar: false,
              page: "digitise",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const fetchImageAsFile = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Check if blob is an XML error (expired SAS token) instead of an image
      if (blob.type === 'application/xml' || blob.type === 'text/xml') {
        return null;
      }
      
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const uploadFiles = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Convert images to File objects and append to FormData
      const files = await Promise.all(
        smartRxFile.map(async (file) => {
          const fileUrl = file.smart_prescription_file;
          const fileName = file.smart_prescription_filename;
          return await fetchImageAsFile(fileUrl, fileName);
        })
      );

      files.forEach((file) => {
        if (file) {
          formData.append("files", file);
        }
      });

      // Append other required fields
      formData.append("doctorId", tokenData.user_id);
      formData.append("patientId", patient_data.patient_unique_id);
      formData.append("appointmentId", pam_id || patient_data?.pam_id);
      formData.append("caseId", tcm_id);

      // Append ocrModelSelected only if isCustomSSRX is true
      // if (isCustomSSRX) {
      formData.append("ocrModelSelected", "zyvelor");
      // }

      const cleanedToken = token.replace(/['"]+/g, "");
      const response = await axios.post(
        `${baseUrlRxDigitise}/api/v1/rxdigitize/rx`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cleanedToken}`,
          },
        }
      );

      // Update the digitized data
      if (response?.data?.data) {
        let refinedData = response.data.data.refinedData;
        
        // Map vitals -> vitalsAndBodyComposition if only vitals present
        if (!refinedData?.vitalsAndBodyComposition && refinedData?.vitals) {
          const v = refinedData.vitals;
          refinedData.vitalsAndBodyComposition = {
            temperature: v.temperature || v.temp || v.Temp || "",
            pulse: v.pulse || v.Pulse || v.pres || "",
            respRate: v.respRate || v.resp_rate || v.RespRate || v.Resp_rate || "",
            Systolic: v.Systolic || v.systolic || "",
            Diastolic: v.Diastolic || v.diastolic || "",
            bloodPressure: v.bloodPressure || v.blood_press || "",
            spo2: v.spo2 || v.SPO2 || "",
            height: v.height || "",
            weight: v.weight || "",
            ofc: v.ofc || v.OFC || "",
            sugar: v.sugar || v.Sugar || "",
            general_rbs: v.general_rbs || v.GeneralRBS || v["General RBS"] || "",
            fib4: v.fib4 || v.FIB4 || "",
            waist_circumference: v.waist_circumference || v.WaistCircumference || "",
            BMI: v.BMI || v.bmi || "",
            BMR: v.BMR || v.bmr || "",
            BSA: v.BSA || v.bsa || "",
          };
        }

        // Enrich vitals with calculated BMI, BSA, BMR if missing
        if (refinedData?.vitalsAndBodyComposition && Object.keys(refinedData.vitalsAndBodyComposition).length > 0) {
          const patientInfo = patient_data ? {
            age: patient_data.ageYears || patient_data.age || patient_data.pm_age,
            gender: patient_data.pm_gender || patient_data.gender
          } : {};
          refinedData.vitalsAndBodyComposition = enrichVitalsWithCalculations(
            refinedData.vitalsAndBodyComposition,
            patientInfo
          );
        }
        if (!refinedData?.examinations && Array.isArray(refinedData?.examination)) {
          refinedData.examinations = refinedData.examination;
        }
        
        // Map lab results to standardized names (matching sidebar)
        if (Array.isArray(refinedData?.labResults) && refinedData.labResults.length > 0) {
          refinedData.labResults = mapLabResultsToStandardized(refinedData.labResults);
        }
        
        setData(refinedData);
      }
    } catch (error) {
      console.error("🟢 SmartRx uploadFiles: Error uploading files:", error);
    } finally {
      setIsLoading(false);
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
      <HeaderSmartRxDigitise
        onSave={handleSave}
        patient_data={patient_data}
        tcm_id={tcm_id}
      />
      <div
        ref={splitRef}
        className={`${
          isMobile ? "p-0" : ""
        } w-100 bg-body wrapper2 prescription-wrapper`}
        style={{ position: "relative" }}
      >
        <Row gutter={0} justify="center" wrap={false}>
          <Col
            md={17}
            lg={17}
            xl={12}
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
                  smartRxFile?.map(({ smart_prescription_file }) => (
                    <div key={smart_prescription_file}>
                      {smart_prescription_file && (
                        <img
                          src={smart_prescription_file}
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
            xl={12}
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
                    isProcessing={isLoading}
                    showAbsHeaderInsideLoader={isLoading}
                    enableInstructionBanner={false}
                    showHeader={false}
                    onLabResultsSaved={() => setLabResultsSavedFromSidebar(true)}
                  />
              </div>
            </div>
          </Col>
        </Row>
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
    </CashManagerContext.Provider>
  );
}

export default SmartRxDigitise;
