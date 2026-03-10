import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import { isMobile } from "react-device-detect";
import { jwtDecode } from "jwt-decode";
// import { errorMessage } from "../utils/utils";
import api from "../api/services/axiosService";
import documentIcon from "../assets/images/document-normal.svg";
import { FETCH_SMART_RX, S_RX_DIGITIZATION } from "../utils/constants";
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN, ADD } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { env } from "../EnvironmentConfig";
import { getInvestigationAndMedicine, addCaseManager, editCaseManager, viewCaseManager } from "../redux/caseManagerSlice";
import { placeIctOrder } from "../redux/appointmentsSlice";
import { enrichVitalsWithCalculations } from "../utils/vitalsCalculations";
import { resolveMedicalHistoryForCaseManager } from "../utils/medicalHistoryUtils";
import { getNormalizedGynecHistory, syncGynecHistoryAfterEndVisit } from "../utils/gynecHistoryUtils";
import { getGynecDetails, postGynecDetails, updateGynecDetails } from "../api/services/ApiGynec";
import { fetchLabResultsTodayOnly } from "../utils/labResultsUtils";
import ApiMedicalHistory from "../api/services/ApiMedicalHistory";
import { getVitals, setVitalsIdsFromAddVitals, resetVitalsState } from "../redux/vitalsSlice";
import ApiVitals from "../api/services/ApiVitals";
import moment from "moment";
import { getClinicName, getTokenData } from "../utils/utils";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { GB_ZYDUS_USER } from "../utils/constants";
import HeaderSmartRxDigitise from "../common/HeaderSmartRxDigitise";
import DigitisedPrescription from "../components/DigitisedPrescription";
import axios from "axios";
import { updateCredits } from "../redux/monetizationSlice";
import ApiMedication from "../api/services/ApiMedication";
import { setDentalData, clearDentalData } from "../redux/dentalRxSlice";

function SmartRxDigitise() {
  const divRef = useRef(null);
  const splitRef = useRef(null);
  const isResizingRef = useRef(false);
  const persistVitalsInFlightRef = useRef(false);
  const [leftWidthPercent, setLeftWidthPercent] = useState(30);

  const { profile, siteId, storeCode, userId } = useSelector((state) => state.doctors);
  const dentalDataFromStore = useSelector((state) => state.dentalRx?.dentalData);
  const { loading } = useSelector((state) => state.caseManager);
  const { listVitalsTodayIds } = useSelector((state) => state.vitals);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const { state: locationState } = location;
  const state = locationState || {};
  const {
    patient_data,
    smartRxFilesData,
    tcm_id,
    print_url,
    digitisedData,
    pam_id,
    isCustomSSRX,
  } = state;

  const [printUrl, setPrintUrl] = useState(
    state !== undefined ? `${state.print_url}` : null
  );
  const [token, setToken] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [divWidth, setDivWidth] = useState(0);
  const [data, setData] = useState(null);
  const [isDigitiseRxSubmit, setIsDigitiseRxSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [smartRxFile, setSmartRxFile] = useState(smartRxFilesData);
  // Object URLs for native File/Blob so left panel can display them; revoke on cleanup
  const [objectUrlsForFiles, setObjectUrlsForFiles] = useState([]);
  const objectUrlsRef = useRef([]);
  const isZydusUserAccessableFromGB = useFeatureIsOn(GB_ZYDUS_USER);
  // Grounding check (Zydus users)
  const tokenDataLocal = getTokenData();
  const isGroundingAccessableForZydus =
    tokenDataLocal?.hospital_business_id == env.zydus_business_id &&
    isZydusUserAccessableFromGB;

  const baseUrlRxDigitise = env.rx_digitization;
  const clinicName = getClinicName(profile?.hospital_data);
  const isManyaClinic = (clinicName || "") === "Manya Dental - Hongasandra";
  const isSmartRxDigitisePath = location?.pathname === "/smart-rx-digitise";
  const shouldUseCustomRxDigitize = isManyaClinic && isSmartRxDigitisePath;

  // Create object URLs for native File/Blob items so left panel can display; revoke on unmount or when smartRxFile changes
  useEffect(() => {
    if (!smartRxFile?.length) {
      setObjectUrlsForFiles([]);
      return;
    }
    const urls = [];
    smartRxFile.forEach((file, i) => {
      if (file instanceof File || file instanceof Blob) {
        urls[i] = URL.createObjectURL(file);
      }
    });
    objectUrlsRef.current.forEach((u) => {
      if (u) try { URL.revokeObjectURL(u); } catch (_) {}
    });
    objectUrlsRef.current = urls;
    setObjectUrlsForFiles(urls);
    return () => {
      objectUrlsRef.current.forEach((u) => {
        if (u) try { URL.revokeObjectURL(u); } catch (_) {}
      });
      objectUrlsRef.current = [];
    };
  }, [smartRxFile]);

  useEffect(() => {
    setDivWidth(divRef.current?.offsetWidth);
  }, [divRef]);

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

  // Keep only non-empty vitals; preserve tcv_id, tcbc_id, dev_unique_id, pam_id (same pattern as Cardiology/ConsultationDrawer)
  const vitalsOnlyNonEmpty = useCallback((v) => {
    if (!v || typeof v !== "object") return {};
    const actual = v._doc || v;
    const keyMap = { respiratoryRate: "respRate", randomBloodSugar: "sugar", headCircumference: "ofc", genralRBS: "general_rbs" };
    const result = {};
    const idKeys = ["tcv_id", "tcbc_id", "dev_unique_id", "pam_id"];
    idKeys.forEach((k) => {
      if (actual[k] !== undefined) result[k] = actual[k];
    });
    Object.entries(actual).forEach(([key, value]) => {
      if (idKeys.includes(key)) return;
      if (value !== undefined && value !== null && value !== "" && String(value).trim() !== "") {
        result[keyMap[key] || key] = value;
      }
    });
    return result;
  }, []);

  // Filter vitals to non-empty only before passing to Rx Pad (API already returns vitalsAndBodyComposition, examinations, labInvestigation)
  const canonicalFromApi = useCallback((src) => {
    if (!src || typeof src !== "object") return src;
    const out = { ...src };
    if (out.vitalsAndBodyComposition) {
      out.vitalsAndBodyComposition = vitalsOnlyNonEmpty(out.vitalsAndBodyComposition);
    }
    return out;
  }, [vitalsOnlyNonEmpty]);

  const persistSmartRxVitals = useCallback(
    async (vitalsAndBodyComposition, setDataFn) => {
      if (!vitalsAndBodyComposition || typeof vitalsAndBodyComposition !== "object" || !patient_data?.patient_unique_id) return;
      const idKeys = ["tcv_id", "tcbc_id", "dev_unique_id", "pam_id"];
      const hasMeaningful = Object.entries(vitalsAndBodyComposition).some(
        ([k, v]) => !idKeys.includes(k) && v != null && String(v).trim() !== ""
      );
      if (!hasMeaningful) return;
      if (persistVitalsInFlightRef.current) return;
      persistVitalsInFlightRef.current = true;
      try {
      const listPayload = {
        patient_unique_id: patient_data.patient_unique_id,
        pam_id: patient_data.pam_id ?? 0,
        mode: ADD,
        pm_pid: patient_data.pm_pid ?? 0,
        pm_id: patient_data.pm_id ?? 0,
      };
      try {
        const list = await dispatch(getVitals(listPayload)).unwrap().catch(() => []);
        const today = moment().format("YYYY-MM-DD");
        const existingToday = Array.isArray(list) ? list.find((v) => (v.date || "").toString().startsWith(today)) : null;
        const ids = {
          tcv_id: existingToday?.tcv_id ?? 0,
          tcbc_id: existingToday?.tcbc_id ?? 0,
          dev_unique_id: existingToday?.dev_unique_id ?? 0,
        };

        const v = vitalsAndBodyComposition;
        let systolic = String(v.Systolic || v.systolic || "").trim();
        let diastolic = String(v.Diastolic || v.diastolic || "").trim();
        let blood_press = v.bloodPressure || v.blood_press || "";
        if (blood_press && !systolic && !diastolic) {
          const parts = String(blood_press).split("/");
          if (parts.length >= 2) {
            systolic = parts[0].trim();
            diastolic = parts[1].trim();
          }
        } else if (!blood_press && systolic && diastolic) blood_press = `${systolic}/${diastolic}`;
        if (!systolic || !diastolic) blood_press = "";

        const vitalsArray = [
          {
            date: today,
            temp: String(v.temperature || v.temp || "").trim(),
            pres: String(v.pulse || v.pres || "").trim(),
            resp_rate: String(v.respRate || v.resp_rate || "").trim(),
            systolic,
            diastolic,
            ...(systolic && diastolic ? { blood_press } : {}),
            spo2: String(v.spo2 || v.SPO2 || "").trim(),
            height: String(v.height || v.Height || "").trim(),
            weight: String(v.weight || v.Weight || "").trim(),
            ofc: String(v.ofc || v.OFC || "").trim(),
            sugar: String(v.sugar || v.Sugar || "").trim(),
            general_rbs: String(v["General RBS"] || v.general_rbs || v.generalRBS || v.genralRBS || "").trim(),
            fib4: String(v.FIB4 || v.fib4 || "").trim(),
            waist_circumference: String(v["Waist Circumference"] || v.waist_circumference || "").trim(),
            bmi: String(v.BMI || v.bmi || "").trim(),
            bmr: String(v.BMR || v.bmr || "").trim(),
            bsa: String(v.BSA || v.bsa || "").trim(),
            tcv_id: ids.tcv_id,
            tcbc_id: ids.tcbc_id,
            dev_unique_id: ids.dev_unique_id,
          },
        ];
        const sendData = {
          patient_unique_id: patient_data.patient_unique_id,
          pm_pid: patient_data.pm_pid ?? 0,
          pm_id: patient_data.pm_id ?? 0,
          pam_id: patient_data.pam_id ?? 0,
          patient_birth_weight: null,
          data: vitalsArray,
        };
        const addRes = await ApiVitals.addUpdateVitals(sendData);
        if (addRes?.status !== false && addRes?.statusCode !== 400 && addRes?.data?.length) {
          const saved = addRes.data.find((row) => (row.date || "").toString().startsWith(today)) || addRes.data[0];
          const responseIds = {
            tcv_id: saved?.tcv_id ?? 0,
            tcbc_id: saved?.tcbc_id ?? 0,
            dev_unique_id: saved?.dev_unique_id ?? 0,
          };
          dispatch(
            setVitalsIdsFromAddVitals({
              flow: "smart",
              patient_unique_id: patient_data.patient_unique_id,
              ...responseIds,
            })
          );
          if (typeof setDataFn === "function") {
            setDataFn((prev) => ({
              ...prev,
              vitalsAndBodyComposition: { ...(prev?.vitalsAndBodyComposition || {}), ...responseIds },
            }));
          }
        }
      } catch (err) {
        // persistSmartRxVitals failed; IDs may be 0 in save payload
      }
      } finally {
        persistVitalsInFlightRef.current = false;
      }
    },
    [dispatch, patient_data]
  );

  useEffect(() => {
    if (smartRxFile?.length > 0 && token && state.type === "new") {
      uploadFiles();
    } else if (state.type === "edit" && digitisedData) {
      uploadFiles();
    } else {
      setIsLoading(false);
    }
  }, [token, smartRxFile, digitisedData]);

  useEffect(() => {
    return () => {
      dispatch(resetVitalsState());
      dispatch(clearDentalData());
    };
  }, [dispatch]);

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

      const editedDataForApi = { ...updatedPrescriptionData };
      const hasDentalPayload = !!(
        editedDataForApi?.dental ||
        editedDataForApi?.dentalData ||
        editedDataForApi?.complaints ||
        editedDataForApi?.treatmentPlans ||
        dentalDataFromStore
      );
      if (hasDentalPayload) {
        editedDataForApi.dental = true;
        if (!editedDataForApi.dentalData && dentalDataFromStore) {
          editedDataForApi.dentalData = dentalDataFromStore;
        }
        if (!editedDataForApi.complaints && dentalDataFromStore?.complaints) {
          editedDataForApi.complaints = dentalDataFromStore.complaints;
        }
        if (!editedDataForApi.treatmentPlans && dentalDataFromStore?.treatmentPlans) {
          editedDataForApi.treatmentPlans = dentalDataFromStore.treatmentPlans;
        }
      }
      console.log('INTEL ==> editedDataForApi', editedDataForApi)
      // return;
      if (editedDataForApi.vitalsAndBodyComposition && typeof editedDataForApi.vitalsAndBodyComposition === "object") {
        const { tcv_id, tcbc_id, dev_unique_id, ...vitalsRest } = editedDataForApi.vitalsAndBodyComposition;
        const generalRBSVal = vitalsRest.general_rbs ?? vitalsRest["General RBS"] ?? vitalsRest.generalRBS ?? vitalsRest.genralRBS;
        if (generalRBSVal != null && String(generalRBSVal).trim() !== "") vitalsRest.generalRBS = String(generalRBSVal).trim();
        delete vitalsRest.general_rbs;
        delete vitalsRest["General RBS"];
        delete vitalsRest.genralRBS;
        editedDataForApi.vitalsAndBodyComposition = vitalsRest;
      }

      const payload = {
        isDigitize: true,
        editedData: editedDataForApi,
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

      console.log('INTEL ==> response 2', response);
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
              action: tcm_id == 0 ? "add" : "edit",
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

        let vitalsForCase = [];
        try {
          const listPayload = {
            patient_unique_id: patient_data.patient_unique_id,
            pam_id: patient_data.pam_id ?? 0,
            mode: ADD,
            pm_pid: patient_data.pm_pid ?? 0,
            pm_id: patient_data.pm_id ?? 0,
          };
          const allVitals = await dispatch(getVitals(listPayload)).unwrap().catch(() => []);
          const today = moment().format("YYYY-MM-DD");
          const todayVitals = Array.isArray(allVitals) ? allVitals.filter((v) => (v.date || "").toString().startsWith(today)) : [];

          const v = updatedPrescriptionData?.vitalsAndBodyComposition || {};
          const hasRxPadVitals = v && Object.keys(v).length > 0 && Object.keys(v).some((k) => !["tcv_id", "tcbc_id", "dev_unique_id", "pam_id"].includes(k) && v[k] != null && String(v[k]).trim() !== "");
          
          if (hasRxPadVitals && todayVitals.length > 0) {
            // Multiple vitals entries: send all with their respective IDs
            vitalsForCase = todayVitals.map((vitalEntry) => {
              let systolic = String(vitalEntry.blood_press || "").split("/")[0]?.trim() || "";
              let diastolic = String(vitalEntry.blood_press || "").split("/")[1]?.trim() || "";
              const vital = {
                date: today,
                temp: String(vitalEntry.temp || "").trim(),
                pres: String(vitalEntry.pres || "").trim(),
                resp_rate: String(vitalEntry.resp_rate || "").trim(),
                systolic,
                diastolic,
                blood_press: vitalEntry.blood_press || "",
                spo2: String(vitalEntry.spo2 || "").trim(),
                height: String(vitalEntry.height || "").trim(),
                weight: String(vitalEntry.weight || "").trim(),
                ofc: String(vitalEntry.ofc || "").trim(),
                sugar: String(vitalEntry.sugar || "").trim(),
                general_rbs: String(vitalEntry.general_rbs || "").trim(),
                fib4: String(vitalEntry.fib4 || "").trim(),
                waist_circumference: String(vitalEntry.waist_circumference || "").trim(),
                bmi: String(vitalEntry.bmi || "").trim(),
                bmr: String(vitalEntry.bmr || "").trim(),
                bsa: String(vitalEntry.bsa || "").trim(),
                tcv_id: Number(vitalEntry.tcv_id ?? 0),
                tcbc_id: Number(vitalEntry.tcbc_id ?? 0),
                dev_unique_id: Number(vitalEntry.dev_unique_id ?? 0),
                pam_id: patient_data?.pam_id ?? pam_id ?? 0,
              };
              const patientInfo = patient_data ? { age: patient_data.ageYears || patient_data.age || patient_data.pm_age, gender: patient_data.pm_gender || patient_data.gender } : {};
              return enrichVitalsWithCalculations(vital, patientInfo);
            });
          } else if (hasRxPadVitals) {
            // Single vital entry from Rx Pad
            let systolic = String(v.Systolic || v.systolic || "").trim();
            let diastolic = String(v.Diastolic || v.diastolic || "").trim();
            let blood_press = v.bloodPressure || v.blood_press || "";
            if (blood_press && !systolic && !diastolic) {
              const parts = String(blood_press).split("/");
              if (parts.length >= 2) {
                systolic = parts[0].trim();
                diastolic = parts[1].trim();
              }
            }
            if (!systolic || !diastolic) blood_press = "";
            else if (!blood_press) blood_press = `${systolic}/${diastolic}`;
            const rxPadVital = {
              date: today,
              temp: String(v.temperature || v.temp || "").trim(),
              pres: String(v.pulse || v.pres || "").trim(),
              resp_rate: String(v.respRate || v.resp_rate || "").trim(),
              systolic,
              diastolic,
              spo2: String(v.spo2 || v.SPO2 || "").trim(),
              height: String(v.height || v.Height || "").trim(),
              weight: String(v.weight || v.Weight || "").trim(),
              ofc: String(v.ofc || v.OFC || "").trim(),
              sugar: String(v.sugar || v.Sugar || "").trim(),
              general_rbs: String(v["General RBS"] || v.general_rbs || v.generalRBS || v.genralRBS || "").trim(),
              fib4: String(v.FIB4 || v.fib4 || "").trim(),
              waist_circumference: String(v["Waist Circumference"] || v.waist_circumference || "").trim(),
              bmi: String(v.BMI || v.bmi || "").trim(),
              bmr: String(v.BMR || v.bmr || "").trim(),
              bsa: String(v.BSA || v.bsa || "").trim(),
              tcv_id: Number(v.tcv_id ?? 0),
              tcbc_id: Number(v.tcbc_id ?? 0),
              dev_unique_id: Number(v.dev_unique_id ?? 0),
              pam_id: patient_data?.pam_id ?? pam_id ?? 0,
            };
            if (systolic && diastolic) rxPadVital.blood_press = blood_press;
            const patientMatch = listVitalsTodayIds != null && String(listVitalsTodayIds.patient_unique_id) === String(patient_data?.patient_unique_id);
            const hasIds = patientMatch && listVitalsTodayIds && (
              (listVitalsTodayIds.tcv_id != null && listVitalsTodayIds.tcv_id !== 0) ||
              (listVitalsTodayIds.tcbc_id != null && listVitalsTodayIds.tcbc_id !== 0) ||
              (listVitalsTodayIds.dev_unique_id != null && listVitalsTodayIds.dev_unique_id !== 0)
            );
            if (hasIds) {
              rxPadVital.tcv_id = Number(listVitalsTodayIds.tcv_id ?? 0);
              rxPadVital.tcbc_id = Number(listVitalsTodayIds.tcbc_id ?? 0);
              rxPadVital.dev_unique_id = Number(listVitalsTodayIds.dev_unique_id ?? 0);
            }
            const patientInfo = patient_data ? { age: patient_data.ageYears || patient_data.age || patient_data.pm_age, gender: patient_data.pm_gender || patient_data.gender } : {};
            const enriched = enrichVitalsWithCalculations(rxPadVital, patientInfo);
            vitalsForCase = [{ ...enriched }];
          }
          // Clean blood_press if systolic/diastolic missing
          vitalsForCase = vitalsForCase.map((row) => {
            const cleanedRow = { ...row };
            if (!String(cleanedRow.systolic || "").trim() || !String(cleanedRow.diastolic || "").trim()) cleanedRow.blood_press = "";
            return cleanedRow;
          });
        } catch (err) {
          console.error("[SmartRx] build vitals for addCaseManager/editCaseManager", err);
        }
        const rawMedicalHistory = Array.isArray(updatedPrescriptionData?.medicalHistory) ? updatedPrescriptionData.medicalHistory : [];
        const medicalHistoryForApi = await resolveMedicalHistoryForCaseManager(rawMedicalHistory, {
          getSectionsWithTags: () => ApiMedicalHistory.listSectionwithTag(),
          addTag: (payload) => ApiMedicalHistory.addTag(payload),
          searchTag: (payload) => ApiMedicalHistory.searchTag(payload),
        });
        const consultationDate = moment().format("YYYY-MM-DD HH:mm");
        let smartPrescriptionFilenames = (smartRxFilesData || smartRxFile || [])
          .map((f) => (f && (f.smart_prescription_filename ?? f.name)) || "")
          .filter(Boolean);
        if (smartPrescriptionFilenames.length === 0 && Array.isArray(digitisedData?.smart_prescription_filename)) {
          smartPrescriptionFilenames = digitisedData.smart_prescription_filename.filter(Boolean);
        }
        if (smartPrescriptionFilenames.length === 0 && digitisedData?.editedData?.smart_prescription_filename != null) {
          const fromEdited = digitisedData.editedData.smart_prescription_filename;
          smartPrescriptionFilenames = Array.isArray(fromEdited) ? fromEdited.filter(Boolean) : [fromEdited].filter(Boolean);
        }
        if (smartPrescriptionFilenames.length === 0 && Array.isArray(data?.smart_prescription_filename)) {
          smartPrescriptionFilenames = data.smart_prescription_filename.filter(Boolean);
        }
        if (smartPrescriptionFilenames.length === 0 && tcm_id > 0 && patient_data?.patient_unique_id != null) {
          try {
            const viewAction = await dispatch(viewCaseManager({
              patient_unique_id: patient_data.patient_unique_id,
              tcm_id,
            }));
            if (viewAction.meta.requestStatus === "fulfilled" && viewAction.payload?.smart_prescription_filename != null) {
              const existing = viewAction.payload.smart_prescription_filename;
              smartPrescriptionFilenames = Array.isArray(existing) ? existing.filter(Boolean) : [existing].filter(Boolean);
            }
          } catch (e) {
            // fallback failed
          }
        }
        const caseManagerPayload = {
          action: tcm_id === 0 ? "add" : "edit",
          tcm_id: tcm_id,
          patient_unique_id: patient_data?.patient_unique_id ?? 0,
          pam_id: patient_data?.pam_id ?? pam_id ?? 0,
          consultation_date: consultationDate,
          consultation_start_datetime: consultationDate,
          medical_history: medicalHistoryForApi,
          private_notes_id: 0,
          smart_prescription_filename: smartPrescriptionFilenames,
          ...(vitalsForCase.length > 0 && { vitals: vitalsForCase }),
        };
        const caseAction = tcm_id === 0
          ? await dispatch(addCaseManager(caseManagerPayload))
          : await dispatch(editCaseManager(caseManagerPayload));
        if (caseAction.meta.requestStatus === "fulfilled") {
          dispatch(resetVitalsState());
          if (patient_data?.patient_unique_id && (userId !== undefined && userId !== null)) {
            const rxGynec = getNormalizedGynecHistory(updatedPrescriptionData ?? {});
            syncGynecHistoryAfterEndVisit(patient_data.patient_unique_id, userId, rxGynec, { getGynecDetails, postGynecDetails, updateGynecDetails });
          }
          try {
            await fetchLabResultsTodayOnly(patient_data);
          } catch (e) {
            // no-op: lab results today fetch after save
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
              smartRxFile: smartRxFilesData,
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

  // Navigate back to Smart Rx preview without saving: pass state WITHOUT page "digitise" so preview shows Written Rx + Digitise Now (not Digital Rx)
  const handleBackToPreview = useCallback(() => {
    navigate("/print-smart-rx", {
      replace: true,
      state: {
        patient_data,
        smartRxFilesData: smartRxFile ?? smartRxFilesData,
        smartRxFile: smartRxFile ?? smartRxFilesData,
        tcm_id,
        pam_id: pam_id ?? patient_data?.pam_id,
        print_url: printUrl ?? state?.print_url,
        print_rx_url: state?.print_rx_url,
        showProgressbar: false,
        // Do NOT pass page: "digitise" — only save flow sets that; back-without-save should show Written Rx + Digitise Now
      },
    });
  }, [navigate, patient_data, smartRxFile, smartRxFilesData, tcm_id, pam_id, printUrl, state?.print_url, state?.print_rx_url]);

  // Resolve display URL: native File/Blob use object URL; API-shaped use smart_prescription_file or fallbacks
  const getDisplayUrl = useCallback((file, index) => {
    if (!file) return null;
    if (file instanceof File || file instanceof Blob) {
      return objectUrlsForFiles[index] || null;
    }
    return file.smart_prescription_file ?? file.fileUrl ?? file.url ?? file.smart_prescription_file_url ?? null;
  }, [objectUrlsForFiles]);

  const fetchImageAsFile = async (url, fileName) => {
    try {
      if (!url) return null;
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const uploadFiles = async () => {
    try {
      setIsLoading(true);
      const cleanedToken = token.replace(/['"]+/g, "");
      let response;

      if (shouldUseCustomRxDigitize) {
        if (!tcm_id || !patient_data?.patient_unique_id) {
          setIsLoading(false);
          return;
        }
        response = await axios.post(
          `${env.snap_rx_api_url}/api/v1/digitization/custom-rx/digitize-rx`,
          {
            tcm_id,
            patient_unique_id: patient_data.patient_unique_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cleanedToken}`,
            },
          }
        );
      //   response = {
      //     "status": true,
      //     "data": {
      //         "results": {
      //             "metadata": {
      //                 "branch": "",
      //                 "doctorName": "PALLAVI",
      //                 "caseNo": "22-05-2024 (01)",
      //                 "date": "22-05-2024",
      //                 "patientName": "Ashwini K",
      //                 "age": "36",
      //                 "gender": "F",
      //                 "dob": "03/02/1988",
      //                 "occupation": "B.E",
      //                 "address": "Suraksha Sunflower Apt",
      //                 "contactNo": "9886129122",
      //                 "consent": {
      //                     "datetime": "22-05-2024",
      //                     "sign": "Signed"
      //                 },
      //                 "surgicalConsent": {
      //                     "consentText": "",
      //                     "patientSign": "",
      //                     "doctorSign": "",
      //                     "datetime": ""
      //                 }
      //             },
      //             "diagnosis": {
      //                 "stains": {
      //                     "lessThan1Percent": false,
      //                     "lessThan5Percent": false,
      //                     "lessThan10Percent": false,
      //                     "fiveTo30Percent": false,
      //                     "moreThan10Percent": false,
      //                     "moreThan30Percent": false
      //                 },
      //                 "calculus": {
      //                     "lessThan1Percent": false,
      //                     "lessThan5Percent": false,
      //                     "lessThan10Percent": false,
      //                     "fiveTo30Percent": false,
      //                     "moreThan10Percent": false,
      //                     "moreThan30Percent": false
      //                 },
      //                 "oralHygieneStatus": [
      //                     "Stn + Cal"
      //                 ],
      //                 "periodontalseverity": {
      //                     "gingivitis": false,
      //                     "severeGingivitis": false,
      //                     "moderatePeriodontitis": false,
      //                     "severePeriodontitis": false
      //                 },
      //                 "orthodonticFindings": {
      //                     "overjet": false,
      //                     "overbite": false,
      //                     "crowding": false,
      //                     "spacing": false,
      //                     "tfo": false,
      //                     "collapsedBite": false,
      //                     "tmj": false,
      //                     "extraOralFindings": false
      //                 },
      //                 "orthodonticInterventionRequired": {
      //                     "yes": true,
      //                     "no": false
      //                 },
      //                 "habitsPedo": {
      //                     "lipSucking": false,
      //                     "thumbSucking": false,
      //                     "tongueThristing": false,
      //                     "mouthBreathing": false
      //                 },
      //                 "toothDiagramNotes": [
      //                     "Fluorosis present Grade II Moderate to Grade III",
      //                     "Tooth 41: Mildly-Rotated",
      //                     "Wisdom Teeth (18, 28, 38, 48): Clinically missing",
      //                     "While biting, the metal mesial marginal ridge of tooth 16 is hitting on the distal aspect of tooth 15",
      //                     "Patient is trying to adjust for occlusion on the left side"
      //                 ],
      //                 "teeth": [
      //                     {
      //                         "toothNum": 2,
      //                         "toothSection": "UPPER_RIGHT",
      //                         "diagnose": "Deep class II Caries"
      //                     },
      //                     {
      //                         "toothNum": 3,
      //                         "toothSection": "UPPER_RIGHT",
      //                         "diagnose": "Metal Crown without RCT"
      //                     },
      //                     {
      //                         "toothNum": 8,
      //                         "toothSection": "UPPER_LEFT",
      //                         "diagnose": "PFM Crown"
      //                     },
      //                     {
      //                         "toothNum": 13,
      //                         "toothSection": "UPPER_LEFT",
      //                         "diagnose": "Pit caries (mesially)"
      //                     },
      //                     {
      //                         "toothNum": 14,
      //                         "toothSection": "UPPER_LEFT",
      //                         "diagnose": "Pit caries (distally)"
      //                     },
      //                     {
      //                         "toothNum": 19,
      //                         "toothSection": "LOWER_LEFT",
      //                         "diagnose": "Class I Amalgam restoration"
      //                     },
      //                     {
      //                         "toothNum": 30,
      //                         "toothSection": "LOWER_RIGHT",
      //                         "diagnose": "Class I composite"
      //                     },
      //                     {
      //                         "toothNum": 31,
      //                         "toothSection": "LOWER_RIGHT",
      //                         "diagnose": "Metal Crown RCT treated"
      //                     },
      //                     {
      //                         "toothNum": 32,
      //                         "toothSection": "LOWER_RIGHT",
      //                         "diagnose": "Mild TOP, Pocket present distally"
      //                     }
      //                 ]
      //             },
      //             "complaints": {
      //                 "chiefComplaint": "Pt complain of pain in rt. lower back Tooth",
      //                 "symptom": "Cavity, tooth ache",
      //                 "otherDiseases": "NIL",
      //                 "medications": "NIL",
      //                 "drugAllergy": "NIL",
      //                 "pregnancy": "No",
      //                 "covidStatus": null,
      //                 "habits": "NIL",
      //                 "dentalHistory": "n/o Crown",
      //                 "pain": "NIL",
      //                 "notes": "NIL"
      //             },
      //             "treatmentPlans": {
      //                 "items": [
      //                     {
      //                         "srno": 1,
      //                         "treatment": "Consultation",
      //                         "toothNum": "",
      //                         "rate": 400,
      //                         "count": 1,
      //                         "estimate": 400
      //                     },
      //                     {
      //                         "srno": 2,
      //                         "treatment": "IOPA",
      //                         "toothNum": "6",
      //                         "rate": 100,
      //                         "count": 2,
      //                         "estimate": 200
      //                     },
      //                     {
      //                         "srno": 3,
      //                         "treatment": "Oral prophylaxis",
      //                         "toothNum": "",
      //                         "rate": 1000,
      //                         "count": 1,
      //                         "estimate": 1000
      //                     },
      //                     {
      //                         "srno": 4,
      //                         "treatment": "Encaratin A Review",
      //                         "toothNum": "4",
      //                         "rate": 1800,
      //                         "count": 1,
      //                         "estimate": 1800
      //                     },
      //                     {
      //                         "srno": 5,
      //                         "treatment": "Restn - GIC",
      //                         "toothNum": "17",
      //                         "rate": 800,
      //                         "count": 1,
      //                         "estimate": 800
      //                     },
      //                     {
      //                         "srno": 6,
      //                         "treatment": "Ortho consultation",
      //                         "toothNum": "",
      //                         "rate": 0,
      //                         "count": 1,
      //                         "estimate": 0
      //                     }
      //                 ],
      //                 "notes": "Perio-consultation by Dr. Naved. Scaling advised by Dr. Naved & Adi. Case reviewed by Dr. Yamini. Patient informed about overhanging metal crown with respect to tooth #6. Recommendations: Water floss advised."
      //             },
      //             "workDone": {
      //                 "items": [
      //                     {
      //                         "date": "22/5/24",
      //                         "workDone": "Consultation + X-ray, Oral prophylaxis, Class II resin restoration with GIC base",
      //                         "ptr": "",
      //                         "ttReview": "",
      //                         "payment": 3400,
      //                         "balance": null,
      //                         "remarks": "Dr. Pallavi",
      //                         "doctorAndAssistant": "",
      //                         "nextAppointment": "27/5/24 at 11:30 am for follow-up",
      //                         "clinicalNotes": "Mesial margin of metal crown adjusted with respect to tooth 6 as it was hitting the distal ridge of tooth 5.",
      //                         "implantDetails": {
      //                             "productName": "",
      //                             "productCode": "",
      //                             "dimensions": "",
      //                             "torque": "",
      //                             "graftDetails": "",
      //                             "sutureDetails": ""
      //                         }
      //                     },
      //                     {
      //                         "date": "31/5/24",
      //                         "workDone": "Composite restoration, High point reduction with respect to metal crown on tooth 6",
      //                         "ptr": "",
      //                         "ttReview": "",
      //                         "payment": 800,
      //                         "balance": null,
      //                         "remarks": "Dr. Pallavi",
      //                         "doctorAndAssistant": "",
      //                         "nextAppointment": "14/6/24 at 7:30 pm for follow-up on tooth 6",
      //                         "clinicalNotes": "Patient advised flossing. To be kept on follow-up.",
      //                         "implantDetails": {
      //                             "productName": "",
      //                             "productCode": "",
      //                             "dimensions": "",
      //                             "torque": "",
      //                             "graftDetails": "",
      //                             "sutureDetails": ""
      //                         }
      //                     }
      //                 ],
      //                 "notes": "5% discount. Payment method: UPI."
      //             },
      //             "visitHistory": {
      //                 "items": [
      //                     {
      //                         "date": "10/6/24",
      //                         "items": [
      //                             "Crown removal with tooth 6 done",
      //                             "Crown structure decayed subgingivally",
      //                             "Advice: Extraction of tooth 6, Implant for tooth 6, Graft for tooth 6, Crown for tooth 6",
      //                             "Cost for crown removal: 1000 - 2000",
      //                             "Cost for implant: 28000",
      //                             "Cost for graft: 7000 + 2000",
      //                             "Payment Status: 6500 / 10000 Balance"
      //                         ]
      //                     },
      //                     {
      //                         "date": "11/6/24",
      //                         "items": [
      //                             "Next Appointment: Scheduled for 11/6/24 @ 4pm for implant placement with tooth 6",
      //                             "Advice: CBCT",
      //                             "Treatment Plan for Tooth 5: RCT for tooth 5, Crown for tooth 5",
      //                             "Cost for RCT on tooth 5: 5500",
      //                             "Payment Status: 6500 / 10000 Balance",
      //                             "RCT on tooth 5 done. Status: Temp placed",
      //                             "Extraction of tooth 6 done",
      //                             "Implant placed",
      //                             "Grafting Details: Autologous bone + graft + PRP + membrane",
      //                             "Implant Details: Brand: OSSTEM IMPLANT, Product: TSIII SA Fixture, Size: R Ø5.5xH10 R, LOT: FTN24C457",
      //                             "4 BBS sutures placed (2+2)",
      //                             "Total cost: 38475",
      //                             "Next Appointment: 18/6/24 for suture removal with Dr Yamin"
      //                         ]
      //                     },
      //                     {
      //                         "date": "19/6/24",
      //                         "items": [
      //                             "Follow-up done",
      //                             "Suture removal done",
      //                             "Findings: Healing satisfactory",
      //                             "Additional Note: in progress BBS suture pending for removal",
      //                             "Future Elements: RCT appointment scheduled for 25/6/24 at 5pm with Dr Yamin"
      //                         ]
      //                     }
      //                 ],
      //                 "notes": "Partially visible words in the left margin: 'pinal', 'usion)'."
      //             },
      //             "transcription": "### Document Identity\n- **Document Type**: Patient Registration and Medical History Form\n- **Source**: MANYA DENTAL ™\n- **Case Number**: 22-05-2024 (01)\n- **Date**: 22-05-2024\n\n---\n\n### Entity Information\n- **Clinic Name**: MANYA DENTAL ™\n- **Operating Doctor (OP DR)**: PALLAVI\n\n#### Patient Details\n- **Patient Name**: Ashwini K\n- **Age**: 36\n- **Gender**: F (Female)\n- **Date of Birth (DOB)**: 03/02/1988\n- **Occupation**: B.E\n- **Address**: Suraksha Sunflower Apt\n- **Contact No**: 9886129122\n\n---\n\n### Patient Consent\n- **Consent Statement**: \"I consent to the consultation and for any additional procedures required for the diagnosis such as x-ray and physical examination. I have signed this consent voluntarily out of my free will without any pressure and in my full senses.\"\n- **Signature**: A signature is present.\n- **Signature Type**: To be signed by patient/guardian in case of minor.\n- **Date/Time of Signature**: 22-05-2024\n\n---\n\n### Medical Assessment (To be filled by Doctor)\n\n#### Chief Complaint\n- **Primary Complaint**: Pt complain of pain in rt. lower back Tooth\n- **Associated Symptoms**: Cavity, tooth ache\n- **Onset**: yesterday\n\n#### Systemic Health Status\n- **HTN/DM/ASTHMA/CARDIAC STATUS/BLOOD DISORDER**: normal\n\n#### Medical History\n- **Other Diseases**: no\n- **Medication**: no\n- **H/O Drug Allergy**: no\n- **Pregnancy**: no\n\n#### Habits\n- **Tobacco/Smoking/Grinding Teeth**: no\n\n#### Dental History\n- **Dental History**: n/o Crown (no history of Crown)\n- **Head/Jaw/Neck Pain**: no\n\n#### Notes\n- The notes section is empty.\n\n---\n\n### Administrative Information\n- **Page Number**: 1\n\n### **Medical Document Extraction**\n\n---\n\n#### **1. Document Identity**\n*   **Document Title**: DIAGNOSIS\n*   **Page Number**: 2\n\n---\n\n#### **2. Diagnosis & General Findings**\n*   **Oral Hygiene Status**: Stn + Cal (Stain and Calculus)\n*   **Orthodontic Findings**: Fluorosis present Grade II Moderate to Grade III.\n*   **Habits (Pedo)**: No habits (Lip Sucking, Thumb Sucking, Tongue Thrusting, Mouth Breathing) were indicated.\n*   **Orthodontic Intervention Required**: YES\n\n---\n\n#### **3. Dental Chart Findings (Per Quadrant)**\n\n**Quadrant 1: Upper Right**\n*   **Second Molar**: Deep class II Caries.\n*   **First Molar**: Metal Crown without RCT (Root Canal Treatment).\n\n**Quadrant 2: Upper Left**\n*   **Central Incisors**: PFM Crown (Porcelain Fused to Metal Crown) indicated.\n*   **Second Premolar**: Pit caries (mesially).\n*   **First Molar**: Pit caries (distally).\n\n**Quadrant 3: Lower Left**\n*   **First and Second Molars**: Class I Amalgam restoration.\n\n**Quadrant 4: Lower Right**\n*   **Second Premolar**: Class I composite.\n*   **First Molar**: Metal Crown RCT treated.\n*   **Second Molar**: NO TOP (No Tenderness On Percussion).\n*   **Third Molar (Wisdom Tooth) Area**:\n    *   **C/C (Chief Complaint)**: Mild TOP (Tenderness On Percussion) present.\n    *   Pocket present distally.\n\n---\n\n#### **4. Additional Clinical Observations & Notes**\n\n*   **Tooth Status**:\n    *   **Tooth 41 (Lower Right Central Incisor)**: Mildly-Rotated.\n    *   **Wisdom Teeth (18, 28, 38, 48)**: Clinically missing.\n\n*   **On O/E (On Oral Examination)**:\n    *   While biting, the metal mesial marginal ridge of tooth **16** is hitting on the distal aspect of tooth **15**.\n    *   (Patient is trying to adjust for occlusion on the left side).\n\n### Medical Document Extraction\n\n---\n\n#### **1. Document Identity**\n*   **Document Type**: Handwritten patient progress notes / treatment log.\n*   **Page Number**: 3\n\n---\n\n#### **2. Entity Information**\n*   **Patient Name**: Ashwini. K.\n*   **Patient Demographics**: 36/F (36-year-old Female)\n*   **Provider(s)**:\n    *   Dr. Yamin\n    *   Mahesh (noted in parentheses next to a signature)\n\n---\n\n#### **3. Chronological Medical Entries**\n\n**Date: 10/6/24**\n*   **Procedure**: Crown removal with tooth 6 done.\n*   **Findings**: Crown structure decayed subgingivally.\n*   **Advice (Adv)**:\n    *   Extraction (ext) of tooth 6.\n    *   Implant for tooth 6.\n    *   Graft for tooth 6.\n    *   Crown for tooth 6.\n*   **Financial Information**:\n    *   Cost for crown removal: 1000 - 2000\n    *   Cost for implant: 28,000\n    *   Cost for graft: 7000 + 2000\n    *   Payment Status: (6500 / 10000) Balance\n\n---\n\n**Date: 11/6/24 (Pre-Procedure & Planning)**\n*   **Next Appointment (N/A)**: Scheduled for 11/6/24 @ 4pm for implant placement with tooth 6.\n*   **Advice (Adv)**: CBCT.\n*   **Treatment Plan for Tooth 5**:\n    *   RCT (Root Canal Treatment) for tooth 5.\n    *   Crown for tooth 5.\n*   **Financial Information**:\n    *   Cost for RCT on tooth 5: 5500\n    *   Payment Status: (6500/10000) Balance.\n*   **Provider**: Signed by Yamin (Mahesh).\n\n---\n\n**Date: 11/6/24 (Procedure Record)**\n*   **Procedure 1**: RCT on tooth 5 done.\n    *   Status: Temp placed.\n*   **Procedure 2**: Extraction (extn) of tooth 6 done.\n*   **Procedure 3**: Implant placed.\n    *   **Grafting Details**: Autologous bone + graft + PRP + membrane.\n    *   **Implant Details**:\n        *   Handwritten Size: 5.5 X 10\n        *   **Sticker Information**:\n            *   **Brand**: OSSTEM IMPLANT\n            *   **Product**: TSIII SA Fixture\n            *   **Size**: R Ø5.5xH10 R\n            *   **LOT**: FTN24C457\n*   **Procedure 4**: 4 BBS sutures placed (2+2).\n*   **Financial Information**: Total cost noted as (38475).\n*   **Next Appointment (N/A)**: 18/6/24 for suture removal with Dr Yamin.\n*   **Provider**: Signed by Yamin.\n\n---\n\n**Date: 19/6/24**\n*   **Visit Type**: F/U (Follow-up) done.\n*   **Procedure**: Suture removal done.\n*   **Findings**: Healing satisfactory.\n*   **Additional Note**: \"in progress BBS suture pending for removal\" is also written.\n*   **Future Elements**: RCT app (appointment) scheduled for 25/6/24 at 5pm with Dr Yamin.\n*   **Provider**: Signed by Yamin.\n\n---\n\n#### **4. Marginalia**\n*   Partially visible words in the left margin: \"pinal\", \"usion)\". The full context is not visible.\n\n### **Document Identification**\n- **Document Type:** Handwritten Dental Treatment Record / Progress Notes\n- **Page Number:** 4\n\n### **Provider Information**\n- **Primary Provider:** Dr. Pallavi\n- **Associated Staff/Signatories:**\n    - Sachi (noted with Dr. Pallavi's signature on 29/6/24)\n    - Revathi (noted with Pallavi's signature on 10/7/24)\n\n---\n\n### **Treatment Chronology**\n\n#### **Visit Date: 29/6/24**\n- **Assessment:** PTR - Good\n- **Procedures Performed:**\n    - Single sitting RCT (Root Canal Treatment) done on tooth/site \"5t\".\n    - Closed Temp rest (Temporary restoration) done on tooth/site \"5t\".\n- **Scheduled Next Appointment (N/A):**\n    - **Date:** 1/7/24\n    - **Time:** 5:30 pm\n    - **Purpose:** Crown prep for teeth/sites \"5t & 7t\".\n- **Financial Note:**\n    - Payment of 5,500/- was made on 11/6/24.\n\n---\n\n#### **Visit Date: 5/7/24**\n- **Assessment:** PTR: Good\n- **Procedures Performed:**\n    - Crown prep done on tooth/site \"5t\".\n        - **Warranty:** (10 yrs) waranti\n    - Rest (Restoration) GZC (Glass Ionomer Cement) done dresially (Cbon) on tooth/site \"7t\".\n    - U/L (Upper/Lower) Alginate impression done for Crown.\n    - **Shade Selection:** Sh-2M2\n- **Financial Details:**\n    - Cost for tooth \"5t\": 6,500/-\n    - Cost for tooth \"7t\": 800/-\n    - **Subtotal:** 7,300\n    - **Discount:** 5% discom\n    - **Total Amount:** 6,935/-\n- **Scheduled Next Appointment (N/A):**\n    - **Date:** 10/7/24\n    - **Time:** 4:30 pm\n    - **Purpose:** Crown cementation.\n\n---\n\n#### **Visit Date: 10/7/24**\n- **Assessment:** PTR good\n- **Procedures Performed:**\n    - PFM (Porcelain Fused to Metal) Crown Cementation done on tooth/site \"5t\".\n        - **Note:** (10 yrs)\n- **Patient Instructions:**\n    - Post-cementation instructions given.\n- **Scheduled Next Appointment (N/A):**\n    - **Date:** 17/7/24\n    - **Purpose:** follow-up.\n\n---\n\n### **Administrative & Marginalia**\n- **Top Right Corner:** Handwritten note \"Wo As\".\n- **Left Margin:** Pre-printed text fields are present:\n    - ORA\n    - ORT\n    - HA!\n    - OR\n\n### Document Identity\n- **Document Type**: Treatment Plan\n- **Title**: TREATMENT PLAN(S)\n- **Page Number**: 5\n\n### Entity Information\n- **Medical Professionals Mentioned**:\n    - Dr. Naved\n    - Dr. Yamini\n    - Adi (Role unclear, possibly an assistant or another professional)\n\n### Treatment Plan Details\n\n| S NO | TREATMENT | TOOTH NUMBER | RATE | COUNT | ESTIMATE | NOTES |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| 1. | Consultation | | 400/- | | | |\n| 2. | IOPA | 54 | 100 | 2 | 200/- | |\n| 3. | Oral prophylaxis | | 1000/- | | | |\n| 4. | Encaratin A Review | 4 (with a horizontal line through it) | 1800/- | | | Sub-note: -> RCT followed by Crown -> 5000/- -> 2.5K - 10K |\n| 5. | Restn - GIC (Restoration - Glass Ionomer Cement) | 17 | 800/- | | | |\n| 6. | Ortho consultation | | | | | Counselled but pt. is not willing |\n\n### Handwritten Notes & Observations\n- **Perio-Consultation**: A perio-consultation was done by Dr. Naved.\n- **Scaling**: Scaling was advised by Dr. Naved & Adi.\n- **Case Review**: The case was also shown to Dr. Yamini.\n- **Patient Information**: The patient has been informed about an overhanging metal crown with respect to tooth #6 (written with a Palmer notation symbol for the upper left first molar).\n- **Recommendations**: Water floss has been advised.\n\n### **Comprehensive Medical Document Extraction**\n\n---\n\n### **1. Document Identity**\n*   **Document Type**: Patient Treatment and Payment Ledger\n*   **Page Number**: 6\n*   **Column Headers**: DATE, WORK DONE, PAYMENT, BALANCE, REMARKS\n\n---\n\n### **2. Administrative & Financial Information**\n*   **Handwritten Annotation (Top of Page)**: (5% discount)\n*   **Payment Method Noted**: UPI\n\n---\n\n### **3. Patient Treatment Records (Chronological)**\n\n#### **Patient: Sachin**\n*   **Treating Doctor**: Dr. Pallavi\n*   **Date**: 22/5/24\n    *   **Work Done**:\n        *   Consultation + X-ray (Teeth noted as 5| and J5|)\n        *   Oral prophylaxis\n        *   Class II resin restoration with GIC base (Tooth noted as 5|)\n    *   **Clinical Notes**:\n        *   Mesial margin of metal crown adjusted with respect to tooth 6| as it was hitting the distal ridge of tooth 5|.\n        *   This was noted as a potential reason for pain with respect to tooth 5|.\n    *   **Payment**:\n        *   400 + 200\n        *   1000\n        *   1800\n        *   **Total**: 3400\n*   **Future Elements**:\n    *   **Next Appointment**: 27/5/24 at 11:30 am for follow-up.\n    *   **Planned Work**: Restoration for tooth 6| is noted.\n\n---\n\n#### **Patient: Revathy**\n*   **Treating Doctor**: Dr. Pallavi\n*   **Date**: 31/5/24\n    *   **Clinical Findings**:\n        *   Mild TOP (Tenderness on Percussion) present with respect to tooth 5|.\n    *   **Work Done**:\n        *   Composite restoration done (note seems to trail off with \"but Pitt\").\n        *   High point reduction done with respect to metal crown on tooth 6|.\n    *   **Recommendations & Patient Instructions**:\n        *   Patient has been advised flossing.\n        *   To be kept on follow-up.\n    *   **Payment**: 800 (Associated with teeth noted as 6S and 7|)\n*   **Future Elements**:\n    *   **Next Appointment**: 14/6/24 at 7:30 pm for follow-up on tooth 6S|.\n\n---\n\n#### **Patient: Mahesh**\n*   **Treating Doctor**: Dr. Pallavi\n*   **Other Name Noted**: Yamini\n*   **Date**: 10/6/24\n    *   **Work Done**: Consultation done.\n*   **Future Elements**:\n    *   **Next Appointment**: 11/6/24 at 4 pm for implant with tooth 6|.\n*   **Date**: 11/6/24\n    *   **Work Done**: Implant done.\n*   **Future Elements**:\n    *   **Next Appointment**: 18/6/24 for RCT (Root Canal Treatment).\n\n### **Document Information**\n*   **Document Type**: Patient Treatment and Payment Log\n*   **Page Number**: 7\n\n### **Personnel Mentioned**\n*   Dr. Pallavi\n*   Dr. Ajay (also written as Dr. Ajs, Dr. Ajy)\n*   Sachin\n\n---\n\n### **Treatment and Financial Log**\n\n**Date: 11/12/25**\n*   **Work Done**:\n    *   Oral prophylaxis done\n    *   GIC Class II restn bond done (restn likely means restoration)\n    *   Class II composite c̄ GAC bone done (c̄ means \"with\")\n    *   Tooth notation: +6\n*   **PTR**: +7\n*   **Payment**:\n    *   1200/-\n    *   1200/-\n    *   2300/-\n    *   Subtotal: 4700/-\n*   **Remarks**: Dr. Pallavi, (Sachin)\n\n---\n\n**Date: 24/12/25**\n*   **Work Done**: Healing Collar placed ist 6+ (ist likely refers to the first stage of the implant procedure, 6+ is likely tooth notation for the upper right first molar)\n*   **PTR**: the\n*   **Payment**:\n    *   Procedure noted as Zr (10y) (likely Zirconia crown with a 10-year warranty)\n    *   6,000 paid\n*   **Balance**: Bal -> 6,000\n*   **Remarks**: Dr. Ajs (likely Dr. Ajay), (Sachin)\n\n---\n\n**Date: 31/12/25**\n*   **Work Done**: Implant-level Impression made\n*   **PTR**: the\n*   **Payment**: 6,000 paid\n*   **Remarks**: Dr. Ajay, (Sachin)\n\n---\n\n### **Scheduled Appointments**\n\n*   **Appointment 1**:\n    *   **Purpose**: Implant Crown 2nd stage\n    *   **With**: Dr. Ajay\n    *   **Date & Time**: 13/12/25 at 5:00 pm\n    *   **Notes**: Payment status noted as \"UPL\".\n\n*   **Appointment 2**:\n    *   **Purpose**: Implant impression\n    *   **With**: Dr. Ajay\n    *   **Date & Time**: 31/12/25 @ 12:30\n    *   **Location/Note**: @ CM4\n\n*   **Appointment 3**:\n    *   **Purpose**: Jig trial\n    *   **With**: Dr. Ajy (likely Dr. Ajay)\n    *   **Date & Time**: 3/12/25 @ 6:30 (*Note: This date precedes the previous entry of 31/12/25 and is likely a typo for 3/1/26*)\n    *   **Location/Note**: @ CM4"
      //         },
      //         "ocrModel": "zyvelor",
      //         "timeTakenInMs": 133522
      //     }
      // }
      } else {
        const formData = new FormData();

        // Build list of File objects: native File use as-is; Blob wrap as File; API-shaped fetch from URL
        const files = await Promise.all(
          smartRxFile.map(async (file, index) => {
            if (file instanceof File) {
              return file;
            }
            if (file instanceof Blob) {
              return new File([file], file.name || `rx-${index}-${Date.now()}.jpg`, { type: file.type });
            }
            const fileUrl = file.smart_prescription_file ?? file.fileUrl ?? file.url ?? file.smart_prescription_file_url;
            const fileName = file.smart_prescription_filename ?? file.name ?? `rx-${index}-${Date.now()}.jpg`;
            return await fetchImageAsFile(fileUrl, fileName);
          })
        );

        const validCount = files.filter(Boolean).length;
        if (validCount === 0) {
          setIsLoading(false);
          return;
        }

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

        response = await axios.post(
          `${baseUrlRxDigitise}/api/v1/rxdigitize/rx`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${cleanedToken}`,
            },
          }
        );
      }
      console.log("intel ==> response", response);

      // Update the digitized data (normalize to canonical shape for Rx Pad)
      const responseData = response?.data?.data ?? response?.data;
      // const responseData = {
      //   status: true,
      //   data: {
      //     results: {
      //       metadata: {
      //         branch: "",
      //         doctorName: "PALLAVI",
      //         caseNo: "22-05-2024 (01)",
      //         date: "22-05-2024",
      //         patientName: "Ashwini K",
      //         age: "36",
      //         gender: "F",
      //         dob: "03/02/1988",
      //         occupation: "B.E",
      //         address: "Suraksha Sunflower Apt",
      //         contactNo: "9886129122",
      //         consent: {
      //           datetime: "22-05-2024",
      //           sign: "Signed",
      //         },
      //         surgicalConsent: {
      //           consentText: "",
      //           patientSign: "",
      //           doctorSign: "",
      //           datetime: "",
      //         },
      //       },
      //       diagnosis: {
      //         stains: {
      //           lessThan1Percent: false,
      //           lessThan5Percent: false,
      //           lessThan10Percent: false,
      //           fiveTo30Percent: false,
      //           moreThan10Percent: false,
      //           moreThan30Percent: false,
      //         },
      //         calculus: {
      //           lessThan1Percent: false,
      //           lessThan5Percent: false,
      //           lessThan10Percent: false,
      //           fiveTo30Percent: false,
      //           moreThan10Percent: false,
      //           moreThan30Percent: false,
      //         },
      //         oralHygieneStatus: ["Stn + Cal"],
      //         periodontalseverity: {
      //           gingivitis: false,
      //           severeGingivitis: false,
      //           moderatePeriodontitis: false,
      //           severePeriodontitis: false,
      //         },
      //         orthodonticFindings: {
      //           overjet: false,
      //           overbite: false,
      //           crowding: false,
      //           spacing: false,
      //           tfo: false,
      //           collapsedBite: false,
      //           tmj: false,
      //           extraOralFindings: false,
      //         },
      //         orthodonticInterventionRequired: {
      //           yes: true,
      //           no: false,
      //         },
      //         habitsPedo: {
      //           lipSucking: false,
      //           thumbSucking: false,
      //           tongueThristing: false,
      //           mouthBreathing: false,
      //         },
      //         toothDiagramNotes: [
      //           "Fluorosis present Grade II Moderate to Grade III",
      //           "Tooth 41: Mildly-Rotated",
      //           "Wisdom Teeth (18, 28, 38, 48): Clinically missing",
      //           "While biting, the metal mesial marginal ridge of tooth 16 is hitting on the distal aspect of tooth 15",
      //           "Patient is trying to adjust for occlusion on the left side",
      //         ],
      //         teeth: [
      //           {
      //             toothNum: 2,
      //             toothSection: "UPPER_RIGHT",
      //             diagnose: "Deep class II Caries",
      //           },
      //           {
      //             toothNum: 3,
      //             toothSection: "UPPER_RIGHT",
      //             diagnose: "Metal Crown without RCT",
      //           },
      //           {
      //             toothNum: 8,
      //             toothSection: "UPPER_LEFT",
      //             diagnose: "PFM Crown",
      //           },
      //           {
      //             toothNum: 13,
      //             toothSection: "UPPER_LEFT",
      //             diagnose: "Pit caries (mesially)",
      //           },
      //           {
      //             toothNum: 14,
      //             toothSection: "UPPER_LEFT",
      //             diagnose: "Pit caries (distally)",
      //           },
      //           {
      //             toothNum: 19,
      //             toothSection: "LOWER_LEFT",
      //             diagnose: "Class I Amalgam restoration",
      //           },
      //           {
      //             toothNum: 30,
      //             toothSection: "LOWER_RIGHT",
      //             diagnose: "Class I composite",
      //           },
      //           {
      //             toothNum: 31,
      //             toothSection: "LOWER_RIGHT",
      //             diagnose: "Metal Crown RCT treated",
      //           },
      //           {
      //             toothNum: 32,
      //             toothSection: "LOWER_RIGHT",
      //             diagnose: "Mild TOP, Pocket present distally",
      //           },
      //         ],
      //       },
      //       complaints: {
      //         chiefComplaint: "Pt complain of pain in rt. lower back Tooth",
      //         symptom: "Cavity, tooth ache",
      //         otherDiseases: "NIL",
      //         medications: "NIL",
      //         drugAllergy: "NIL",
      //         pregnancy: "No",
      //         covidStatus: null,
      //         habits: "NIL",
      //         dentalHistory: "n/o Crown",
      //         pain: "NIL",
      //         notes: "NIL",
      //       },
      //       treatmentPlans: {
      //         items: [
      //           {
      //             srno: 1,
      //             treatment: "Consultation",
      //             toothNum: "",
      //             rate: 400,
      //             count: 1,
      //             estimate: 400,
      //           },
      //           {
      //             srno: 2,
      //             treatment: "IOPA",
      //             toothNum: "6",
      //             rate: 100,
      //             count: 2,
      //             estimate: 200,
      //           },
      //           {
      //             srno: 3,
      //             treatment: "Oral prophylaxis",
      //             toothNum: "",
      //             rate: 1000,
      //             count: 1,
      //             estimate: 1000,
      //           },
      //           {
      //             srno: 4,
      //             treatment: "Encaratin A Review",
      //             toothNum: "4",
      //             rate: 1800,
      //             count: 1,
      //             estimate: 1800,
      //           },
      //           {
      //             srno: 5,
      //             treatment: "Restn - GIC",
      //             toothNum: "17",
      //             rate: 800,
      //             count: 1,
      //             estimate: 800,
      //           },
      //           {
      //             srno: 6,
      //             treatment: "Ortho consultation",
      //             toothNum: "",
      //             rate: 0,
      //             count: 1,
      //             estimate: 0,
      //           },
      //         ],
      //         notes:
      //           "Perio-consultation by Dr. Naved. Scaling advised by Dr. Naved & Adi. Case reviewed by Dr. Yamini. Patient informed about overhanging metal crown with respect to tooth #6. Recommendations: Water floss advised.",
      //       },
      //       workDone: {
      //         items: [
      //           {
      //             date: "22/5/24",
      //             workDone:
      //               "Consultation + X-ray, Oral prophylaxis, Class II resin restoration with GIC base",
      //             ptr: "",
      //             ttReview: "",
      //             payment: 3400,
      //             balance: null,
      //             remarks: "Dr. Pallavi",
      //             doctorAndAssistant: "",
      //             nextAppointment: "27/5/24 at 11:30 am for follow-up",
      //             clinicalNotes:
      //               "Mesial margin of metal crown adjusted with respect to tooth 6 as it was hitting the distal ridge of tooth 5.",
      //             implantDetails: {
      //               productName: "",
      //               productCode: "",
      //               dimensions: "",
      //               torque: "",
      //               graftDetails: "",
      //               sutureDetails: "",
      //             },
      //           },
      //           {
      //             date: "31/5/24",
      //             workDone:
      //               "Composite restoration, High point reduction with respect to metal crown on tooth 6",
      //             ptr: "",
      //             ttReview: "",
      //             payment: 800,
      //             balance: null,
      //             remarks: "Dr. Pallavi",
      //             doctorAndAssistant: "",
      //             nextAppointment:
      //               "14/6/24 at 7:30 pm for follow-up on tooth 6",
      //             clinicalNotes:
      //               "Patient advised flossing. To be kept on follow-up.",
      //             implantDetails: {
      //               productName: "",
      //               productCode: "",
      //               dimensions: "",
      //               torque: "",
      //               graftDetails: "",
      //               sutureDetails: "",
      //             },
      //           },
      //         ],
      //         notes: "5% discount. Payment method: UPI.",
      //       },
      //       visitHistory: {
      //         items: [
      //           {
      //             date: "10/6/24",
      //             items: [
      //               "Crown removal with tooth 6 done",
      //               "Crown structure decayed subgingivally",
      //               "Advice: Extraction of tooth 6, Implant for tooth 6, Graft for tooth 6, Crown for tooth 6",
      //               "Cost for crown removal: 1000 - 2000",
      //               "Cost for implant: 28000",
      //               "Cost for graft: 7000 + 2000",
      //               "Payment Status: 6500 / 10000 Balance",
      //             ],
      //           },
      //           {
      //             date: "11/6/24",
      //             items: [
      //               "Next Appointment: Scheduled for 11/6/24 @ 4pm for implant placement with tooth 6",
      //               "Advice: CBCT",
      //               "Treatment Plan for Tooth 5: RCT for tooth 5, Crown for tooth 5",
      //               "Cost for RCT on tooth 5: 5500",
      //               "Payment Status: 6500 / 10000 Balance",
      //               "RCT on tooth 5 done. Status: Temp placed",
      //               "Extraction of tooth 6 done",
      //               "Implant placed",
      //               "Grafting Details: Autologous bone + graft + PRP + membrane",
      //               "Implant Details: Brand: OSSTEM IMPLANT, Product: TSIII SA Fixture, Size: R Ø5.5xH10 R, LOT: FTN24C457",
      //               "4 BBS sutures placed (2+2)",
      //               "Total cost: 38475",
      //               "Next Appointment: 18/6/24 for suture removal with Dr Yamin",
      //             ],
      //           },
      //           {
      //             date: "19/6/24",
      //             items: [
      //               "Follow-up done",
      //               "Suture removal done",
      //               "Findings: Healing satisfactory",
      //               "Additional Note: in progress BBS suture pending for removal",
      //               "Future Elements: RCT appointment scheduled for 25/6/24 at 5pm with Dr Yamin",
      //             ],
      //           },
      //         ],
      //         notes:
      //           "Partially visible words in the left margin: 'pinal', 'usion)'.",
      //       },
      //       transcription:
      //         '### Document Identity\n- **Document Type**: Patient Registration and Medical History Form\n- **Source**: MANYA DENTAL ™\n- **Case Number**: 22-05-2024 (01)\n- **Date**: 22-05-2024\n\n---\n\n### Entity Information\n- **Clinic Name**: MANYA DENTAL ™\n- **Operating Doctor (OP DR)**: PALLAVI\n\n#### Patient Details\n- **Patient Name**: Ashwini K\n- **Age**: 36\n- **Gender**: F (Female)\n- **Date of Birth (DOB)**: 03/02/1988\n- **Occupation**: B.E\n- **Address**: Suraksha Sunflower Apt\n- **Contact No**: 9886129122\n\n---\n\n### Patient Consent\n- **Consent Statement**: "I consent to the consultation and for any additional procedures required for the diagnosis such as x-ray and physical examination. I have signed this consent voluntarily out of my free will without any pressure and in my full senses."\n- **Signature**: A signature is present.\n- **Signature Type**: To be signed by patient/guardian in case of minor.\n- **Date/Time of Signature**: 22-05-2024\n\n---\n\n### Medical Assessment (To be filled by Doctor)\n\n#### Chief Complaint\n- **Primary Complaint**: Pt complain of pain in rt. lower back Tooth\n- **Associated Symptoms**: Cavity, tooth ache\n- **Onset**: yesterday\n\n#### Systemic Health Status\n- **HTN/DM/ASTHMA/CARDIAC STATUS/BLOOD DISORDER**: normal\n\n#### Medical History\n- **Other Diseases**: no\n- **Medication**: no\n- **H/O Drug Allergy**: no\n- **Pregnancy**: no\n\n#### Habits\n- **Tobacco/Smoking/Grinding Teeth**: no\n\n#### Dental History\n- **Dental History**: n/o Crown (no history of Crown)\n- **Head/Jaw/Neck Pain**: no\n\n#### Notes\n- The notes section is empty.\n\n---\n\n### Administrative Information\n- **Page Number**: 1\n\n### **Medical Document Extraction**\n\n---\n\n#### **1. Document Identity**\n*   **Document Title**: DIAGNOSIS\n*   **Page Number**: 2\n\n---\n\n#### **2. Diagnosis & General Findings**\n*   **Oral Hygiene Status**: Stn + Cal (Stain and Calculus)\n*   **Orthodontic Findings**: Fluorosis present Grade II Moderate to Grade III.\n*   **Habits (Pedo)**: No habits (Lip Sucking, Thumb Sucking, Tongue Thrusting, Mouth Breathing) were indicated.\n*   **Orthodontic Intervention Required**: YES\n\n---\n\n#### **3. Dental Chart Findings (Per Quadrant)**\n\n**Quadrant 1: Upper Right**\n*   **Second Molar**: Deep class II Caries.\n*   **First Molar**: Metal Crown without RCT (Root Canal Treatment).\n\n**Quadrant 2: Upper Left**\n*   **Central Incisors**: PFM Crown (Porcelain Fused to Metal Crown) indicated.\n*   **Second Premolar**: Pit caries (mesially).\n*   **First Molar**: Pit caries (distally).\n\n**Quadrant 3: Lower Left**\n*   **First and Second Molars**: Class I Amalgam restoration.\n\n**Quadrant 4: Lower Right**\n*   **Second Premolar**: Class I composite.\n*   **First Molar**: Metal Crown RCT treated.\n*   **Second Molar**: NO TOP (No Tenderness On Percussion).\n*   **Third Molar (Wisdom Tooth) Area**:\n    *   **C/C (Chief Complaint)**: Mild TOP (Tenderness On Percussion) present.\n    *   Pocket present distally.\n\n---\n\n#### **4. Additional Clinical Observations & Notes**\n\n*   **Tooth Status**:\n    *   **Tooth 41 (Lower Right Central Incisor)**: Mildly-Rotated.\n    *   **Wisdom Teeth (18, 28, 38, 48)**: Clinically missing.\n\n*   **On O/E (On Oral Examination)**:\n    *   While biting, the metal mesial marginal ridge of tooth **16** is hitting on the distal aspect of tooth **15**.\n    *   (Patient is trying to adjust for occlusion on the left side).\n\n### Medical Document Extraction\n\n---\n\n#### **1. Document Identity**\n*   **Document Type**: Handwritten patient progress notes / treatment log.\n*   **Page Number**: 3\n\n---\n\n#### **2. Entity Information**\n*   **Patient Name**: Ashwini. K.\n*   **Patient Demographics**: 36/F (36-year-old Female)\n*   **Provider(s)**:\n    *   Dr. Yamin\n    *   Mahesh (noted in parentheses next to a signature)\n\n---\n\n#### **3. Chronological Medical Entries**\n\n**Date: 10/6/24**\n*   **Procedure**: Crown removal with tooth 6 done.\n*   **Findings**: Crown structure decayed subgingivally.\n*   **Advice (Adv)**:\n    *   Extraction (ext) of tooth 6.\n    *   Implant for tooth 6.\n    *   Graft for tooth 6.\n    *   Crown for tooth 6.\n*   **Financial Information**:\n    *   Cost for crown removal: 1000 - 2000\n    *   Cost for implant: 28,000\n    *   Cost for graft: 7000 + 2000\n    *   Payment Status: (6500 / 10000) Balance\n\n---\n\n**Date: 11/6/24 (Pre-Procedure & Planning)**\n*   **Next Appointment (N/A)**: Scheduled for 11/6/24 @ 4pm for implant placement with tooth 6.\n*   **Advice (Adv)**: CBCT.\n*   **Treatment Plan for Tooth 5**:\n    *   RCT (Root Canal Treatment) for tooth 5.\n    *   Crown for tooth 5.\n*   **Financial Information**:\n    *   Cost for RCT on tooth 5: 5500\n    *   Payment Status: (6500/10000) Balance.\n*   **Provider**: Signed by Yamin (Mahesh).\n\n---\n\n**Date: 11/6/24 (Procedure Record)**\n*   **Procedure 1**: RCT on tooth 5 done.\n    *   Status: Temp placed.\n*   **Procedure 2**: Extraction (extn) of tooth 6 done.\n*   **Procedure 3**: Implant placed.\n    *   **Grafting Details**: Autologous bone + graft + PRP + membrane.\n    *   **Implant Details**:\n        *   Handwritten Size: 5.5 X 10\n        *   **Sticker Information**:\n            *   **Brand**: OSSTEM IMPLANT\n            *   **Product**: TSIII SA Fixture\n            *   **Size**: R Ø5.5xH10 R\n            *   **LOT**: FTN24C457\n*   **Procedure 4**: 4 BBS sutures placed (2+2).\n*   **Financial Information**: Total cost noted as (38475).\n*   **Next Appointment (N/A)**: 18/6/24 for suture removal with Dr Yamin.\n*   **Provider**: Signed by Yamin.\n\n---\n\n**Date: 19/6/24**\n*   **Visit Type**: F/U (Follow-up) done.\n*   **Procedure**: Suture removal done.\n*   **Findings**: Healing satisfactory.\n*   **Additional Note**: "in progress BBS suture pending for removal" is also written.\n*   **Future Elements**: RCT app (appointment) scheduled for 25/6/24 at 5pm with Dr Yamin.\n*   **Provider**: Signed by Yamin.\n\n---\n\n#### **4. Marginalia**\n*   Partially visible words in the left margin: "pinal", "usion)". The full context is not visible.\n\n### **Document Identification**\n- **Document Type:** Handwritten Dental Treatment Record / Progress Notes\n- **Page Number:** 4\n\n### **Provider Information**\n- **Primary Provider:** Dr. Pallavi\n- **Associated Staff/Signatories:**\n    - Sachi (noted with Dr. Pallavi\'s signature on 29/6/24)\n    - Revathi (noted with Pallavi\'s signature on 10/7/24)\n\n---\n\n### **Treatment Chronology**\n\n#### **Visit Date: 29/6/24**\n- **Assessment:** PTR - Good\n- **Procedures Performed:**\n    - Single sitting RCT (Root Canal Treatment) done on tooth/site "5t".\n    - Closed Temp rest (Temporary restoration) done on tooth/site "5t".\n- **Scheduled Next Appointment (N/A):**\n    - **Date:** 1/7/24\n    - **Time:** 5:30 pm\n    - **Purpose:** Crown prep for teeth/sites "5t & 7t".\n- **Financial Note:**\n    - Payment of 5,500/- was made on 11/6/24.\n\n---\n\n#### **Visit Date: 5/7/24**\n- **Assessment:** PTR: Good\n- **Procedures Performed:**\n    - Crown prep done on tooth/site "5t".\n        - **Warranty:** (10 yrs) waranti\n    - Rest (Restoration) GZC (Glass Ionomer Cement) done dresially (Cbon) on tooth/site "7t".\n    - U/L (Upper/Lower) Alginate impression done for Crown.\n    - **Shade Selection:** Sh-2M2\n- **Financial Details:**\n    - Cost for tooth "5t": 6,500/-\n    - Cost for tooth "7t": 800/-\n    - **Subtotal:** 7,300\n    - **Discount:** 5% discom\n    - **Total Amount:** 6,935/-\n- **Scheduled Next Appointment (N/A):**\n    - **Date:** 10/7/24\n    - **Time:** 4:30 pm\n    - **Purpose:** Crown cementation.\n\n---\n\n#### **Visit Date: 10/7/24**\n- **Assessment:** PTR good\n- **Procedures Performed:**\n    - PFM (Porcelain Fused to Metal) Crown Cementation done on tooth/site "5t".\n        - **Note:** (10 yrs)\n- **Patient Instructions:**\n    - Post-cementation instructions given.\n- **Scheduled Next Appointment (N/A):**\n    - **Date:** 17/7/24\n    - **Purpose:** follow-up.\n\n---\n\n### **Administrative & Marginalia**\n- **Top Right Corner:** Handwritten note "Wo As".\n- **Left Margin:** Pre-printed text fields are present:\n    - ORA\n    - ORT\n    - HA!\n    - OR\n\n### Document Identity\n- **Document Type**: Treatment Plan\n- **Title**: TREATMENT PLAN(S)\n- **Page Number**: 5\n\n### Entity Information\n- **Medical Professionals Mentioned**:\n    - Dr. Naved\n    - Dr. Yamini\n    - Adi (Role unclear, possibly an assistant or another professional)\n\n### Treatment Plan Details\n\n| S NO | TREATMENT | TOOTH NUMBER | RATE | COUNT | ESTIMATE | NOTES |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| 1. | Consultation | | 400/- | | | |\n| 2. | IOPA | 54 | 100 | 2 | 200/- | |\n| 3. | Oral prophylaxis | | 1000/- | | | |\n| 4. | Encaratin A Review | 4 (with a horizontal line through it) | 1800/- | | | Sub-note: -> RCT followed by Crown -> 5000/- -> 2.5K - 10K |\n| 5. | Restn - GIC (Restoration - Glass Ionomer Cement) | 17 | 800/- | | | |\n| 6. | Ortho consultation | | | | | Counselled but pt. is not willing |\n\n### Handwritten Notes & Observations\n- **Perio-Consultation**: A perio-consultation was done by Dr. Naved.\n- **Scaling**: Scaling was advised by Dr. Naved & Adi.\n- **Case Review**: The case was also shown to Dr. Yamini.\n- **Patient Information**: The patient has been informed about an overhanging metal crown with respect to tooth #6 (written with a Palmer notation symbol for the upper left first molar).\n- **Recommendations**: Water floss has been advised.\n\n### **Comprehensive Medical Document Extraction**\n\n---\n\n### **1. Document Identity**\n*   **Document Type**: Patient Treatment and Payment Ledger\n*   **Page Number**: 6\n*   **Column Headers**: DATE, WORK DONE, PAYMENT, BALANCE, REMARKS\n\n---\n\n### **2. Administrative & Financial Information**\n*   **Handwritten Annotation (Top of Page)**: (5% discount)\n*   **Payment Method Noted**: UPI\n\n---\n\n### **3. Patient Treatment Records (Chronological)**\n\n#### **Patient: Sachin**\n*   **Treating Doctor**: Dr. Pallavi\n*   **Date**: 22/5/24\n    *   **Work Done**:\n        *   Consultation + X-ray (Teeth noted as 5| and J5|)\n        *   Oral prophylaxis\n        *   Class II resin restoration with GIC base (Tooth noted as 5|)\n    *   **Clinical Notes**:\n        *   Mesial margin of metal crown adjusted with respect to tooth 6| as it was hitting the distal ridge of tooth 5|.\n        *   This was noted as a potential reason for pain with respect to tooth 5|.\n    *   **Payment**:\n        *   400 + 200\n        *   1000\n        *   1800\n        *   **Total**: 3400\n*   **Future Elements**:\n    *   **Next Appointment**: 27/5/24 at 11:30 am for follow-up.\n    *   **Planned Work**: Restoration for tooth 6| is noted.\n\n---\n\n#### **Patient: Revathy**\n*   **Treating Doctor**: Dr. Pallavi\n*   **Date**: 31/5/24\n    *   **Clinical Findings**:\n        *   Mild TOP (Tenderness on Percussion) present with respect to tooth 5|.\n    *   **Work Done**:\n        *   Composite restoration done (note seems to trail off with "but Pitt").\n        *   High point reduction done with respect to metal crown on tooth 6|.\n    *   **Recommendations & Patient Instructions**:\n        *   Patient has been advised flossing.\n        *   To be kept on follow-up.\n    *   **Payment**: 800 (Associated with teeth noted as 6S and 7|)\n*   **Future Elements**:\n    *   **Next Appointment**: 14/6/24 at 7:30 pm for follow-up on tooth 6S|.\n\n---\n\n#### **Patient: Mahesh**\n*   **Treating Doctor**: Dr. Pallavi\n*   **Other Name Noted**: Yamini\n*   **Date**: 10/6/24\n    *   **Work Done**: Consultation done.\n*   **Future Elements**:\n    *   **Next Appointment**: 11/6/24 at 4 pm for implant with tooth 6|.\n*   **Date**: 11/6/24\n    *   **Work Done**: Implant done.\n*   **Future Elements**:\n    *   **Next Appointment**: 18/6/24 for RCT (Root Canal Treatment).\n\n### **Document Information**\n*   **Document Type**: Patient Treatment and Payment Log\n*   **Page Number**: 7\n\n### **Personnel Mentioned**\n*   Dr. Pallavi\n*   Dr. Ajay (also written as Dr. Ajs, Dr. Ajy)\n*   Sachin\n\n---\n\n### **Treatment and Financial Log**\n\n**Date: 11/12/25**\n*   **Work Done**:\n    *   Oral prophylaxis done\n    *   GIC Class II restn bond done (restn likely means restoration)\n    *   Class II composite c̄ GAC bone done (c̄ means "with")\n    *   Tooth notation: +6\n*   **PTR**: +7\n*   **Payment**:\n    *   1200/-\n    *   1200/-\n    *   2300/-\n    *   Subtotal: 4700/-\n*   **Remarks**: Dr. Pallavi, (Sachin)\n\n---\n\n**Date: 24/12/25**\n*   **Work Done**: Healing Collar placed ist 6+ (ist likely refers to the first stage of the implant procedure, 6+ is likely tooth notation for the upper right first molar)\n*   **PTR**: the\n*   **Payment**:\n    *   Procedure noted as Zr (10y) (likely Zirconia crown with a 10-year warranty)\n    *   6,000 paid\n*   **Balance**: Bal -> 6,000\n*   **Remarks**: Dr. Ajs (likely Dr. Ajay), (Sachin)\n\n---\n\n**Date: 31/12/25**\n*   **Work Done**: Implant-level Impression made\n*   **PTR**: the\n*   **Payment**: 6,000 paid\n*   **Remarks**: Dr. Ajay, (Sachin)\n\n---\n\n### **Scheduled Appointments**\n\n*   **Appointment 1**:\n    *   **Purpose**: Implant Crown 2nd stage\n    *   **With**: Dr. Ajay\n    *   **Date & Time**: 13/12/25 at 5:00 pm\n    *   **Notes**: Payment status noted as "UPL".\n\n*   **Appointment 2**:\n    *   **Purpose**: Implant impression\n    *   **With**: Dr. Ajay\n    *   **Date & Time**: 31/12/25 @ 12:30\n    *   **Location/Note**: @ CM4\n\n*   **Appointment 3**:\n    *   **Purpose**: Jig trial\n    *   **With**: Dr. Ajy (likely Dr. Ajay)\n    *   **Date & Time**: 3/12/25 @ 6:30 (*Note: This date precedes the previous entry of 31/12/25 and is likely a typo for 3/1/26*)\n    *   **Location/Note**: @ CM4',
      //     },
      //     ocrModel: "zyvelor",
      //     timeTakenInMs: 133522,
      //   },
      // };
      const refinedData =
        responseData?.refinedData ??
        responseData?.editedData ??
        responseData?.digitization?.refinedData ??
        responseData?.digitization?.editedData ??
        responseData?.digitization ??
        responseData;
      if (refinedData) {
        const canonical = canonicalFromApi(refinedData);
        
        // Fetch lab results from GET API if not present in digitization response
        const hasLabResultsFromApi = canonical?.labResults && Array.isArray(canonical.labResults) && canonical.labResults.length > 0;
        let labResultsToUse = hasLabResultsFromApi ? canonical.labResults : [];
        if (!hasLabResultsFromApi && patient_data?.patient_unique_id) {
          try {
            const { getTodayLabResults } = await import('../utils/labResultsUtils');
            const fetchedLabResults = await getTodayLabResults(patient_data, false);
            if (fetchedLabResults && fetchedLabResults.length > 0) {
              labResultsToUse = fetchedLabResults;
            }
          } catch (err) {
            console.error('[SmartRx] Failed to fetch lab results from GET API:', err);
          }
        }

        const dentalResults = canonical?.data?.results ?? canonical?.results;
        const hasDentalResults = !!(dentalResults && (dentalResults?.complaints || dentalResults?.treatmentPlans));
        setData((prev) => {
          const base = { ...canonical, labResults: labResultsToUse };
          if (!hasDentalResults) return base;
          const complaints = dentalResults?.complaints ?? {};
          const treatmentPlans = dentalResults?.treatmentPlans ?? { items: [] };
          return {
            ...base,
            dental: true,
            dentalData: dentalResults,
            complaints,
            treatmentPlans,
          };
        });
        if (hasDentalResults) {
          dispatch(setDentalData(dentalResults));
        } else {
          dispatch(clearDentalData());
        }
        setIsLoading(false);
        // Persist vitals via listVitals + addVitals so tcv_id/tcbc_id/dev_unique_id are set for save payload
        if (canonical?.vitalsAndBodyComposition) {
          persistSmartRxVitals(canonical.vitalsAndBodyComposition, setData);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeaderSmartRxDigitise
        onSave={handleSave}
        patient_data={patient_data}
        tcm_id={tcm_id}
        onBackToPreview={handleBackToPreview}
      />
      <div
        ref={splitRef}
        className={`${
          isMobile ? "p-0" : ""
        } w-100 bg-body wrapper2 prescription-wrapper prescription-wrapper-digitise`}
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
                  <div className="d-flex flex-column justify-content-center align-items-center h-100 min-h-200">
                    <Spin />
                  </div>
                ) : (
                  smartRxFile?.length > 0 &&
                  smartRxFile?.map((file, idx) => {
                    const src = getDisplayUrl(file, idx);
                    return (
                      <div key={src || idx}>
                        {src && (
                          <img
                            src={src}
                            alt="Smart Rx"
                            className="written-rx-image"
                            width="100%"
                          />
                        )}
                      </div>
                    );
                  })
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
            <div className="snap-smart-right-panel drx-h-full drx-digitize-container">
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
                  showAbsHeaderInsideLoader={true}
                  showHeader={false}
                  showInstructionMessage={false}
                  patient_data={patient_data}
                  vitalsFlow="smart"
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
    </>
  );
}

export default SmartRxDigitise;
