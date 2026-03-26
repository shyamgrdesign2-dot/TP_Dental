import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Col, Tabs, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";
import QRCode from 'qrcode'
import config from '../config';
import axios from 'axios';

import PrintSettingsContext from '../context/PrintSettingsContext';

import HeaderPrintSetting from "../common/HeaderPrintSetting";
import Quixote from "./Quixote";
import QuixoteCertificate from "./QuixoteCertificate";

import { TAB_PRESCRIPTION, TAB_HEADER_FOOTER, TAB_PAGE_FORMAT, NORMAL, S_AMBIENT_VOICE_RX } from "../utils/constants";

import PrescriptionLayout from "../components/print_settings/PrescriptionLayout";
import HeaderFooterLayout from "../components/print_settings/HeaderFooterLayout";
import PageFormatLayout from "../components/print_settings/PageFormatLayout";

import "cropperjs/dist/cropper.css";
import { useTodayVaccines } from "./vaccination/useTodayVaccines";
import { useGrowthChart } from "./growthChart/useGrowthChart";
import useObstetric from "./obstetric/useObstetric";
import { useAccess } from "./vaccination/useAccess";
import { getModules } from "../redux/customModuleSlice";
import moment from "moment";
import { fetchBillsByPatient, fetchPatientWalletBalance, listAdvancedDepositByPatient } from "./opdBilling/service";
import { getCarePlanAssignments } from "./smartSync/services/carePlanService";
import { updateFooterImageHeight } from "../utils/utils";
import { getGenRx } from "../api/services/ApiGenRx";
import { getSnapRxDigitization } from "./snapRx/services/snapRxService";
import { env } from "../EnvironmentConfig";
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from "../utils/constants";
import { getFormattedDate } from "../utils/utils";
import { getDecodedToken } from "../utils/localStorage";
import { fetchAgents } from "./appointmentAgent/service";
import { ophthalmologyDefaultPrintSettings } from "../utils/ophthalmologyDefaultPrintSettings";
import { getOpthalPrescriptionDetails } from "./ophthalmology/service";
import ApiAbha from "../api/services/ApiAbha";
import { getGynecDetails } from "../api/services/ApiGynec";
import { viewCaseManager } from "../redux/caseManagerSlice";

function ConfigurePrintSetting() {

    const divRef = useRef(null);
    const printSettingsRef = useRef(null);

    const { defaultPrintSettings, userId, profile } = useSelector((state) => state.doctors);

    const { state } = useLocation();
    const { caseManagerData, certificateData, smartRxFile, pam_id, dentalData, isAmbientRx, rxId, page, session_id: stateSessionId, sessionId: stateSessionIdAlt } = state;
    const isAfterDigitization = page === "digitise";
    const snapRxSessionId = stateSessionId ?? stateSessionIdAlt ?? caseManagerData?.session_id;

    const [divWidth, setDivWidth] = useState(0);
    const [selectedTab, setSelectedTab] = useState(caseManagerData !== undefined ? TAB_PRESCRIPTION : TAB_HEADER_FOOTER);
    const [printSettings, setPrintSettings] = useState(null);
    printSettingsRef.current = printSettings;
    const [fileHeader, setFileHeader] = useState(null);
    const [fileFooter, setFileFooter] = useState(null);
    const [fileLogo, setFileLogo] = useState(null);
    const [fileWatermark, setFileWatermark] = useState(null);
    const [fileSignature, setFileSignature] = useState(null);
    const todayVaccines = useTodayVaccines(caseManagerData);
    const growthChartDetails = useGrowthChart(caseManagerData);
    const obstetricDetails = useObstetric(caseManagerData?.patient_data?.patient_unique_id, caseManagerData?.doctor_Data?.um_id);
    const medicalHistoryCheckboxOptions = caseManagerData?.medical_history?.map(e => {
        return { label: e?.title, value: e?.tmmhs_id }
    })
    const [labParamsData, setLabParamsData] = useState([]);
    const [prescriptionDataFromApi, setPrescriptionDataFromApi] = useState(null);
    const [patientBills, setPatientBills] = useState([]);
    const [advanceReceipts, setAdvanceReceipts] = useState([]);
    const [patientWalletBalance, setPatientWalletBalance] = useState(0);
    const [carePlanAssignments, setCarePlanAssignments] = useState([]);
    const [appointmentLinkShared, setAppointmentLinkShared] = useState(null);
    const [opthalModuleData, setOpthalModuleData] = useState(null);
    const [abhaDetails, setAbhaDetails] = useState(null);
    const [gynecHistoryData, setGynecHistoryData] = useState(null);

    const {customModules} = useSelector((state) => state.customModules);
    const dispatch = useDispatch();

    const zydusSelectedLabParams = caseManagerData?.zydusSelectedLabParams || [];
    const { isGynaecHistoryAccessable } = useAccess(caseManagerData?.patient_data?.patient_age);

    const getTodayLabParams = (labResults = []) => {
        const todayStr = moment().format("YYYY-MM-DD");
        return (Array.isArray(labResults) ? labResults : []).filter(
            (labResult) => (labResult?.date || labResult?.createdAt) && moment(labResult.date || labResult.createdAt).format("YYYY-MM-DD") === todayStr
        );
    };


    useEffect(() => {
        setDivWidth(divRef.current?.offsetWidth);
    }, [divRef]);

    useEffect(() => {
        growthChartDetails.getGrowthChartDetails();
        getPatientBills();
        fetchAbhaDetails();
    }, []);

    useEffect(() => {
        const fetchGynecHistory = async () => {
            try {
                if (!isGynaecHistoryAccessable) return;
                const patientId = caseManagerData?.patient_data?.patient_unique_id;
                if (!patientId) return;
                const data = await getGynecDetails(patientId, userId);
                if (data && Object.keys(data).length > 0) {
                    setGynecHistoryData(data);
                }
            } catch (error) {
                console.error("Error fetching gynec history for ConfigurePrintSetting:", error);
            }
        };
        fetchGynecHistory();
    }, [isGynaecHistoryAccessable, caseManagerData?.patient_data?.patient_unique_id, userId]);

    useEffect(() => {
        const fetchVoiceAmbientData = async () => {
            if (!isAfterDigitization && smartRxFile && smartRxFile.length > 0 && caseManagerData?.tcm_id && caseManagerData?.patient_data?.patient_unique_id) {
                const hasVitals = caseManagerData?.vitals && Array.isArray(caseManagerData.vitals) && caseManagerData.vitals.length > 0;
                const hasMedicalHistory = caseManagerData?.medical_history && Array.isArray(caseManagerData.medical_history) && caseManagerData.medical_history.length > 0;
                if (!hasVitals || !hasMedicalHistory) {
                    try {
                        const sendData = {
                            patient_unique_id: caseManagerData.patient_data.patient_unique_id,
                            tcm_id: caseManagerData.tcm_id,
                            configurePrintSetting: true
                        };
                        const action = await dispatch(viewCaseManager(sendData));
                        if (action.meta.requestStatus === "fulfilled" && action.payload) {
                            const patientId = caseManagerData.patient_data.patient_unique_id;
                            if (patientId) {
                                try {
                                    const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
                                    const cleanedToken = token ? token.replace(/['"]+/g, '') : '';
                                    const baseUrl = env.lab_params_api_url || config.lab_params_api_url;
                                    const response = await axios.get(
                                        `${baseUrl}/api/v1/lab-parameters/results/${patientId}`,
                                        { headers: { Authorization: `Bearer ${cleanedToken}` } }
                                    );
                                    const labResults = response?.data?.data?.results ?? response?.data?.results ?? [];
                                    const labArray = getTodayLabParams(labResults);
                                    setLabParamsData(labArray);
                                } catch (error) {
                                    console.error('[ConfigurePrintSetting] lab-parameters/results API error (path 1)', error?.message, error?.response?.status);
                                }
                            }
                            return;
                        }
                    } catch (error) {
                    }
                }
            }
            
            if (!caseManagerData) {
                return;
            }
            
            const rxIdToUse = rxId || caseManagerData?.smart_prescription_filename;
            const isSnapRx = (smartRxFile && smartRxFile.length > 0) || (caseManagerData?.isRxDigitize && !rxIdToUse);
            const isVoiceAmbientFlow = rxIdToUse && !isSnapRx;
            const shouldFetchData = (isSnapRx && isAfterDigitization) || isVoiceAmbientFlow;

            if (!shouldFetchData) {
                setPrescriptionDataFromApi(null);
            }
            if (shouldFetchData) {
                try {
                    let voiceAmbientResponse = null;
                    let prescriptionData = null;
                    
                    if (isSnapRx) {
                        voiceAmbientResponse = await getSnapRxDigitization(
                            caseManagerData?.patient_data?.patient_unique_id,
                            caseManagerData?.tcm_id,
                            snapRxSessionId
                        );
                    } else {
                        voiceAmbientResponse = await getGenRx(rxIdToUse);
                    }
                    
                    if (voiceAmbientResponse) {
                        let responseData = voiceAmbientResponse?.data?.data || voiceAmbientResponse?.data;
                        
                        if (isSnapRx) {
                            responseData = responseData?.digitization ?? voiceAmbientResponse?.data?.digitization ?? voiceAmbientResponse?.digitization ?? responseData;
                        }
                        
                        // Check multiple possible data locations
                        if (responseData?.editedData) {
                            prescriptionData = responseData.editedData;
                        } else if (responseData?.refinedData) {
                            prescriptionData = responseData.refinedData;
                        } else if (responseData?.digitizeData) {
                            prescriptionData = responseData.digitizeData;
                        } else if (responseData?.digitize) {
                            prescriptionData = responseData.digitize;
                        } else if (responseData?.history && Array.isArray(responseData.history) && responseData.history.length > 0) {
                            // Get the latest history entry
                            const latestHistory = responseData.history[responseData.history.length - 1];
                            
                            if (latestHistory?.digitize) {
                                const digitizeObj = latestHistory.digitize;
                              
                                if (digitizeObj && typeof digitizeObj === 'object' && !Array.isArray(digitizeObj)) {
                                    const numericKeys = Object.keys(digitizeObj).filter(key => /^\d+$/.test(key));
                                    if (numericKeys.length > 0) {
                                        prescriptionData = digitizeObj[numericKeys[0]];
                                    } else if (digitizeObj.symptoms || digitizeObj.medications || digitizeObj.vitalsAndBodyComposition) {
                                        prescriptionData = digitizeObj;
                                    } else {
                                        prescriptionData = digitizeObj;
                                    }
                                } else {
                                    prescriptionData = digitizeObj;
                                }
                            }
                        } else if (responseData && !isSnapRx) {
                            // For voice/ambient, responseData itself might be the prescription data
                            prescriptionData = responseData;
                        }
                        const transformVoiceAmbientData = (data) => {
                            const transformed = { ...data };
                            if (Array.isArray(data.symptoms)) {
                                transformed.symptoms = data.symptoms.map(symptom => {
                                    if (typeof symptom === 'string') {
                                        return {
                                            symptom_name: symptom,
                                            since: "",
                                            severity: "",
                                            note: "",
                                            unique_id: `voice-${Date.now()}-${Math.random()}`,
                                            change: 0,
                                            isStringFormat: true
                                        };
                                    }
                                    return {
                                        symptom_name: symptom.name || symptom.symptom_name || symptom.lineItem || "",
                                        since: symptom.since || symptom.duration || "",
                                        severity: symptom.severity || "",
                                        note: symptom.note || symptom.notes || "",
                                        unique_id: symptom.unique_id || symptom._id || `voice-${Date.now()}-${Math.random()}`,
                                        change: symptom.change || 0
                                    };
                                });
                            }
                            
                            // Transform examinations data: voice/ambient uses 'name', caseManagerData uses 'examination_name'
                            if (Array.isArray(data.examinations)) {
                                transformed.examination = data.examinations.map(exam => {
                                    if (typeof exam === 'string') {
                                        return {
                                            examination_name: exam,
                                            note: "",
                                            unique_id: `voice-${Date.now()}-${Math.random()}`,
                                            change: 0
                                        };
                                    }
                                    return {
                                        examination_name: exam.name || exam.examination_name || exam.lineItem || "",
                                        note: exam.note || exam.notes || "",
                                        unique_id: exam.unique_id || exam._id || `voice-${Date.now()}-${Math.random()}`,
                                        change: exam.change || 0
                                    };
                                });
                            } else if (Array.isArray(data.examination)) {
                                transformed.examination = data.examination.map(exam => {
                                    if (typeof exam === 'string') {
                                        return {
                                            examination_name: exam,
                                            note: "",
                                            unique_id: `voice-${Date.now()}-${Math.random()}`,
                                            change: 0
                                        };
                                    }
                                    return {
                                        examination_name: exam.name || exam.examination_name || exam.lineItem || "",
                                        note: exam.note || exam.notes || "",
                                        unique_id: exam.unique_id || exam._id || `voice-${Date.now()}-${Math.random()}`,
                                        change: exam.change || 0
                                    };
                                });
                            }
                            
                            if (Array.isArray(data.medications)) {
                                const isAlreadyFormatted = data.medications.some(med => med.tmm_medicine_name || med.tmm_id);
                                
                                if (isAlreadyFormatted) {
                                    const aiFlowUnitMap = { 2: 'Tablet', 3: 'mg', 4: 'ml', 5: 'gm', 6: 'Capsule', 7: 'Sachet', 8: 'Injection', 9: 'Drop', 14: 'Drops' };
                                    transformed.medicine = data.medications.map(med => {
                                        const unitId = med.tmm_unit ?? med.unit_id ?? 2;
                                        const medicineUnit = (Array.isArray(med.medicineUnit) && med.medicineUnit.length > 0)
                                            ? med.medicineUnit
                                            : [{ tmu_id: unitId, tmu_title: aiFlowUnitMap[unitId] || 'Unit' }];
                                        return {
                                            ...med,
                                            unique_id: med.unique_id || med._id || med.tmm_id || `voice-${Date.now()}-${Math.random()}`,
                                            change: med.change || 0,
                                            medicineUnit
                                        };
                                    });
                                } else {
                                    transformed.medicine = data.medications.map((med, index) => {
                                        let days = med.days || med.tmm_days || 0;
                                        let durationType = med.duration_type || med.tmm_duration_type || "day(s)";
                                        
                                        if (med.duration && typeof med.duration === 'string') {
                                            const durationMatch = med.duration.match(/(\d+)\s*(day|days|week|weeks|month|months)/i);
                                            if (durationMatch) {
                                                days = parseInt(durationMatch[1]);
                                                const unit = durationMatch[2].toLowerCase();
                                                if (unit.includes('week')) durationType = 'week(s)';
                                                else if (unit.includes('month')) durationType = 'month(s)';
                                                else durationType = 'day(s)';
                                            }
                                        }
                                        
                                       
                                        let freqType = med.tmm_freq_type || med.freq_type || 0;
                                        let freqMorning = 0, freqAfternoon = 0, freqEvening = 0, freqNight = 0;
                                        let tmfBlock = 1; // Default to block format
                                        
                                        if (med.frequency) {
                                            // Check if it's numeric format with 4 numbers (e.g., "1-0-1-0")
                                            const numericFreq4 = med.frequency.match(/(\d+)[-\s]+(\d+)[-\s]+(\d+)[-\s]+(\d+)/);
                                            if (numericFreq4) {
                                                freqMorning = parseInt(numericFreq4[1]) ;
                                                freqAfternoon = parseInt(numericFreq4[2]) ;
                                                freqEvening = parseInt(numericFreq4[3]) ;
                                                freqNight = parseInt(numericFreq4[4]) ;
                                                tmfBlock = 0; // Use individual frequency values
                                            } else {
                                               
                                                const numericFreq3 = med.frequency.match(/(\d+)[-\s]+(\d+)[-\s]+(\d+)/);
                                                if (numericFreq3) {
                                                    freqMorning = parseInt(numericFreq3[1]) || 0;
                                                    freqAfternoon = parseInt(numericFreq3[2]) || 0;
                                                    freqEvening = parseInt(numericFreq3[3]) || 0;
                                                    freqNight = 0; 
                                                    tmfBlock = 0; 
                                                }
                                            }
                                        }
                                        
                                        // Map timing/schedule in voice/ambient data
                                        let timeId = med.tmm_time || med.time_id || med.timing_id || 1; 
                                        if (med.schedule && typeof med.schedule === 'string') {
                                            const scheduleLower = med.schedule.toLowerCase();
                                            if (scheduleLower.includes('before') || scheduleLower.includes('bf')) timeId = 1;
                                            else if (scheduleLower.includes('after') || scheduleLower.includes('af')) timeId = 2;
                                            else if (scheduleLower.includes('with')) timeId = 3;
                                            else if (scheduleLower.includes('empty')) timeId = 4;
                                        }
                                        
                                        // Extract dosage and unit
                                        let dosage = med.dosage || med.tmm_dosage || "";
                                        let unitId = med.unit_id || med.tmm_unit || med.unit || 2;
                                        
                                        if (typeof dosage === 'string' && dosage) {
                                            const dosageMatch = dosage.match(/(\d+(?:\.\d+)?)\s*(mg|ml|tablet|tab|capsule|cap|drops|drop|g|gm|gms)?/i);
                                            if (dosageMatch) {
                                                dosage = dosageMatch[1];
                                                const unit = (dosageMatch[2] || '').toLowerCase();
                                                if (unit.includes('tablet') || unit.includes('tab')) unitId = 2;
                                                else if (unit.includes('capsule') || unit.includes('cap')) unitId = 6;
                                                else if (unit.includes('ml')) unitId = 4;
                                                else if (unit.includes('mg') || unit.includes('g')) unitId = 3;
                                                else if (unit.includes('drop')) unitId = 14;
                                            }
                                        }
                                        
                                        return {
                                            ...med,
                                            tmm_medicine_name: med.name || med.medicine_name || med.tmm_medicine_name || med.lineItem || "",
                                            tmm_generic: med.corrected_name || med.metadata?.tmm_generic || med.generic || med.generic_name || med.tmm_generic || "",
                                            tmm_dosage: dosage,
                                            tmm_unit: unitId,
                                            tmm_freq_type: freqType,
                                            tmm_time: timeId,
                                            tmm_days: days,
                                            tmm_duration_type: durationType,
                                            tcm_tmm_freq_morning: freqMorning,
                                            tcm_tmm_freq_afternoon: freqAfternoon,
                                            tcm_tmm_freq_evening: freqEvening,
                                            tcm_tmm_freq_night: freqNight,
                                            tmf_block: tmfBlock,
                                            display_qty: med.display_qty !== undefined ? med.display_qty : (med.quantity || med.qty || ""),
                                            tmm_remarks: med.notes || med.note || med.tmm_remarks || "",
                                            unique_id: med.unique_id || med._id || med.id || `voice-${Date.now()}-${index}`,
                                            change: med.change || 0,
                                            medicineUnit: (Array.isArray(med.medicineUnit) && med.medicineUnit.length > 0)
                                                ? med.medicineUnit
                                                : [{ tmu_id: unitId, tmu_title: ({ 2: 'Tablet', 3: 'mg', 4: 'ml', 5: 'gm', 6: 'Capsule', 7: 'Sachet', 8: 'Injection', 9: 'Drop', 14: 'Drops' })[unitId] || 'Unit' }]
                                        };
                                    });
                                }
                            }
                            
                            const investigationArray = [];
                            
                            if (Array.isArray(data.labInvestigation)) {
                                const transformedLabInv = data.labInvestigation.map(inv => ({
                                    investigation_name: inv.name || inv.investigation_name || inv.lineItem || "",
                                    note: inv.note || inv.notes || inv.instruction || "",
                                    unique_id: inv.unique_id || inv._id || `voice-${Date.now()}-${Math.random()}`,
                                    change: inv.change || 0
                                }));
                                investigationArray.push(...transformedLabInv);
                            }
                            
                            if (Array.isArray(data.investigation)) {
                                investigationArray.push(...data.investigation);
                            }
                            
                            if (investigationArray.length > 0) {
                                transformed.investigation = investigationArray;
                            }
                            
                            
                            if (Array.isArray(data.labResults) && data.labResults.length > 0) {
                                const consultationDate = caseManagerData?.patient_data?.patient_consultaion_date || caseManagerData?.consultation_date || moment().format('YYYY-MM-DD');
                                const labParamsDataArray = [];
                                
                                const groupedByDate = {};
                                
                                data.labResults.forEach((labResult) => {
                                    const resultDate = labResult.date || consultationDate;
                                    if (!groupedByDate[resultDate]) {
                                        groupedByDate[resultDate] = [];
                                    }
                                    
                                    const testName = (labResult.testname || labResult.testName || labResult.name || "").trim();
                                    const valueWithUnits = (labResult.value || labResult.note || labResult.notes || "").trim();
                                    
                                    let value = valueWithUnits;
                                    let units = labResult.units || "";
                                    
                                    if (valueWithUnits && !units) {
                                        const parts = valueWithUnits.trim().split(/\s+/);
                                        if (parts.length > 1) {
                                            const lastPart = parts[parts.length - 1];
                                            if (/^[a-zA-Z%/]+$/.test(lastPart) || lastPart.includes('/') || lastPart.includes('%')) {
                                                value = parts.slice(0, -1).join(' ');
                                                units = lastPart;
                                            }
                                        }
                                    }
                                    
                                    if (testName) {
                                        groupedByDate[resultDate].push({
                                            reportName: labResult.reportName || "",
                                            testName: testName,
                                            value: value,
                                            units: units,
                                            arrowDirection: labResult.arrowDirection || "",
                                            refRange: labResult.refRange || labResult.referenceRange || ""
                                        });
                                    }
                                });
                                
                                Object.keys(groupedByDate).forEach(date => {
                                    if (groupedByDate[date].length > 0) {
                                        labParamsDataArray.push({
                                            date: date,
                                            inputs: groupedByDate[date]
                                        });
                                    }
                                });
                                
                                if (labParamsDataArray.length > 0) {
                                    transformed.labParamsData = labParamsDataArray;
                                }
                            }
                            
                            if (Array.isArray(data.advice)) {
                                transformed.advice = data.advice.map(adv => {
                                    if (typeof adv === 'string') {
                                        return {
                                            advice_name: adv,
                                            unique_id: `voice-${Date.now()}-${Math.random()}`,
                                            change: 0
                                        };
                                    }
                                    return {
                                        advice_name: adv.name || adv.advice_name || adv.lineItem || "",
                                        unique_id: adv.unique_id || adv._id || `voice-${Date.now()}-${Math.random()}`,
                                        change: adv.change || 0
                                    };
                                });
                            }
                            
                            if (Array.isArray(data.diagnosis)) {
                                transformed.diagnosis = data.diagnosis.map(diag => {
                                    if (typeof diag === 'string') {
                                        return {
                                            tds_name: diag,
                                            since: "",
                                            status: "",
                                            note: "",
                                            unique_id: `voice-${Date.now()}-${Math.random()}`,
                                            change: 0,
                                            isStringFormat: true
                                        };
                                    }
                                    return {
                                        ...diag,
                                        tds_name: diag.name || diag.tds_name || diag.lineItem || "",
                                        since: diag.since || "",
                                        status: diag.status || "",
                                        note: diag.note || diag.notes || "",
                                        unique_id: diag.unique_id || diag._id || `voice-${Date.now()}-${Math.random()}`,
                                        change: diag.change || 0
                                    };
                                });
                            }
                            // Vaccination from snap/smart/voice/ambient – same format (name, brand, schedule, notes); include in merged for print only
                            if (Array.isArray(data.vaccinations) && data.vaccinations.length > 0) {
                                transformed.vaccinations = data.vaccinations.map(v => (typeof v === 'string' ? { name: v, brand: '', schedule: '', notes: '', lineItem: '' } : { name: v.name || v.lineItem || '', brand: v.brand || '', schedule: v.schedule || '', notes: v.notes || v.note || '', lineItem: v.lineItem || v.schedule || '' }));
                            }
                            // Custom modules from snap/smart/voice/ambient: convert dynamicFields to moduleContents (same format as case manager for print)
                            const rawDynamic = data.dynamicFields;
                            if (rawDynamic && typeof rawDynamic === 'object') {
                                let dynamicObj = rawDynamic;
                                const v2Modules = [];
                                if (Array.isArray(rawDynamic)) {
                                    dynamicObj = rawDynamic.reduce((acc, module) => {
                                        const name = module?.name || module?.module_name || '';
                                        if (!name) return acc;
                                        const rawRows = module?.fields || module?.fieldValues || [];

                                        if (module?.version === 'v2' && Array.isArray(rawRows) && rawRows.length > 0) {
                                            const sorted = [...rawRows].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                                            const columnNames = [];
                                            sorted.forEach(f => {
                                                const dataKey = Object.keys(f).find(k => k !== 'order' && k !== 'id');
                                                if (dataKey && !columnNames.includes(dataKey)) columnNames.push(dataKey);
                                            });
                                            const numCols = columnNames.length || 1;
                                            const rows = [];
                                            for (let ri = 0; ri < sorted.length; ri += numCols) {
                                                const rowItems = sorted.slice(ri, ri + numCols);
                                                const row = {};
                                                rowItems.forEach(f => {
                                                    const dk = Object.keys(f).find(k => k !== 'order' && k !== 'id');
                                                    if (dk) row[dk] = f[dk];
                                                });
                                                if (Object.values(row).some(v => v != null && String(v).trim() !== '')) rows.push(row);
                                            }
                                            if (rows.length > 0) {
                                                v2Modules.push({
                                                    module_id: module?.module_id || name,
                                                    module_name: name,
                                                    module_version: 'v2',
                                                    content: rows,
                                                });
                                            }
                                            return acc;
                                        }

                                        const rows = Array.isArray(rawRows)
                                            ? rawRows
                                                .map((f) => {
                                                    if (typeof f === 'string') return { lineItem: (f || '').trim() };
                                                    if (f && typeof f === 'object' && (f.lineItem || f.title)) return { lineItem: (f.lineItem || f.title || '').trim(), ...f };
                                                    if (f && typeof f === 'object') {
                                                        const parts = Object.entries(f)
                                                            .filter(([k]) => k !== 'order')
                                                            .filter(([, v]) => v != null && String(v).trim() !== '')
                                                            .map(([k, v]) => `${k}: ${v}`);
                                                        return { lineItem: parts.join(', ') };
                                                    }
                                                    return { lineItem: '' };
                                                })
                                                .filter((row) => (row?.lineItem || '').trim() !== '')
                                            : [];
                                        if (rows.length > 0) acc[name] = rows;
                                        return acc;
                                    }, {});
                                }
                                const fromDynamic = Object.entries(dynamicObj)
                                    .filter(([, rows]) => Array.isArray(rows) && rows.length > 0)
                                    .map(([module_name, rows]) => ({
                                        module_id: module_name,
                                        module_name,
                                        content: rows.map((row) => {
                                            const line = typeof row === 'string' ? row : (row?.lineItem ?? row?.notes ?? '');
                                            return { title: '', notes: String(line || '').trim() };
                                        }).filter((item) => item.notes !== ''),
                                    }))
                                    .filter((m) => m.content.length > 0);
                                const allModuleContents = [...fromDynamic, ...v2Modules];
                                if (allModuleContents.length > 0) {
                                    transformed.moduleContents = allModuleContents;
                                }
                            }
                            return transformed;
                        };
                        
                        const transformedData = transformVoiceAmbientData(prescriptionData);
                        if (transformedData) {
                            let followUpDate = transformedData.follow_up_date || transformedData.followUp || caseManagerData?.follow_up_date;
                            if (followUpDate && typeof followUpDate === 'string' && followUpDate.trim() !== '' && !moment(followUpDate, moment.ISO_8601, true).isValid()) {
                                const relativeDateMatch = followUpDate.match(/(\d+)\s*(Day|Days|Week|Weeks|Month|Months|Year|Years)(\(s\))?/i);
                                if (relativeDateMatch) {
                                    const value = parseInt(relativeDateMatch[1]);
                                    const unit = relativeDateMatch[2].toLowerCase();
                                    const consultationDate = caseManagerData?.patient_data?.patient_consultaion_date || moment().format('YYYY-MM-DD');
                                    const baseDate = moment(consultationDate);
                                    
                                    if (unit.includes('year')) {
                                        followUpDate = getFormattedDate(baseDate.add(value, 'years').format('YYYY-MM-DD'));
                                    } else if (unit.includes('month')) {
                                        followUpDate = getFormattedDate(baseDate.add(value, 'months').format('YYYY-MM-DD'));
                                    } else if (unit.includes('week')) {
                                        followUpDate = getFormattedDate(baseDate.add(value, 'weeks').format('YYYY-MM-DD'));
                                    } else {
                                        followUpDate = getFormattedDate(baseDate.add(value, 'days').format('YYYY-MM-DD'));
                                    }
                                }
                            } else if (followUpDate && moment(followUpDate).isValid()) {
                                followUpDate = getFormattedDate(followUpDate);
                            }
                            const mergedModuleContents = [
                                ...(caseManagerData?.moduleContents || []),
                                ...(transformedData.moduleContents || []),
                            ];
                            const merged = {
                                ...caseManagerData,
                                ...(transformedData.medicine && { medicine: transformedData.medicine }),
                                isVoiceAmbientRx: !isSnapRx,
                                isRxDigitize: isSnapRx || caseManagerData?.isRxDigitize,
                                ...(transformedData.diagnosis && { diagnosis: transformedData.diagnosis }),
                                ...(transformedData.advice && { advice: transformedData.advice }),
                                ...(transformedData.investigation && { investigation: transformedData.investigation }),
                                ...(transformedData.labParamsData && { labParamsData: transformedData.labParamsData }),
                                ...(transformedData.symptoms && { symptoms: transformedData.symptoms }),
                                ...(transformedData.examination && { examination: transformedData.examination }),
                                ...(transformedData.surgeries && { surgeries: transformedData.surgeries }),
                                ...(followUpDate && { follow_up_date: followUpDate }),
                                ...(transformedData.visit_advice && { visit_advice: transformedData.visit_advice }),
                                ...(transformedData.others && Array.isArray(transformedData.others) && { others: transformedData.others }),
                                ...(transformedData.vaccinations && { vaccinations: transformedData.vaccinations }),
                                ...(mergedModuleContents.length > 0 && { moduleContents: mergedModuleContents }),
                                smart_prescription_filename: caseManagerData?.smart_prescription_filename,
                            };
                            setPrescriptionDataFromApi(merged);
                        } else {
                            setPrescriptionDataFromApi({ ...caseManagerData, isVoiceAmbientRx: true });
                        }
                    } else {
                        setPrescriptionDataFromApi({ ...caseManagerData, isVoiceAmbientRx: true });
                    }
                } catch (error) {
                    setPrescriptionDataFromApi({ ...caseManagerData, isVoiceAmbientRx: true });
                }
            }
            
            const patientId = caseManagerData?.patient_data?.patient_unique_id;
            if (patientId) {
                try {
                    const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
                    const cleanedToken = token ? token.replace(/['"]+/g, '') : '';
                    const baseUrl = env.lab_params_api_url || config.lab_params_api_url;
                    const response = await axios.get(
                        `${baseUrl}/api/v1/lab-parameters/results/${patientId}`,
                        { headers: { Authorization: `Bearer ${cleanedToken}` } }
                    );
                    const labResults = response?.data?.data?.results ?? response?.data?.results ?? [];
                    const labArray = getTodayLabParams(labResults);
                    setLabParamsData(labArray);
                } catch (error) {
                    // Lab API optional; leave labParamsData unchanged on error
                }
            }
        };
        
        fetchVoiceAmbientData();
    }, [caseManagerData, rxId, isAmbientRx, smartRxFile, isAfterDigitization]);

    useEffect(() => {
        if (caseManagerData) {
            growthChartDetails.getGrowthChartDetails();
            getPatientBills();
        }
    }, [caseManagerData?.patient_data?.patient_unique_id, caseManagerData?.patient_data?.pam_id]);

    // Fetch care plan assignments for PDF rendering (used by Quixote/ViewPDF)
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const patientId = caseManagerData?.patient_data?.patient_unique_id;
                if (!patientId) return;
                const resp = await getCarePlanAssignments(patientId);
                setCarePlanAssignments(Array.isArray(resp) ? resp : []);
            } catch (e) {
                setCarePlanAssignments([]);
            }
        };
        fetchAssignments();
    }, [caseManagerData?.patient_data?.patient_unique_id]);

    useEffect(() => {
        dispatch(getModules(userId));
      }, [userId, dispatch]);

    useEffect(() => {
        const fetchOpthalPrescription = async () => {
            const tcmId = caseManagerData?.tcm_id;
            if (!tcmId) {
                setOpthalModuleData(null);
                return;
            }
            try {
                const response = await getOpthalPrescriptionDetails({
                    tcm_id: tcmId,
                    patientId: caseManagerData?.patient_data?.patient_unique_id,
                });
                const data = response?.data ?? response;
                const payload = Array.isArray(data) ? data[0] : data;
                setOpthalModuleData(payload || null);
            } catch (error) {
                console.error("Error fetching opthal prescription details:", error);
                setOpthalModuleData(null);
            }
        };
        fetchOpthalPrescription();
        return () => {
            setOpthalModuleData(null);
        };
    }, [caseManagerData?.tcm_id]);

    const usePrescriptionDataFromApi = (!!(rxId || isAmbientRx) && !(smartRxFile?.length > 0 && !isAfterDigitization)) || ((smartRxFile?.length > 0 || caseManagerData?.isRxDigitize) && isAfterDigitization);
    const dataSourceForPreview = usePrescriptionDataFromApi && prescriptionDataFromApi != null ? prescriptionDataFromApi : caseManagerData;
    const obstetricData = obstetricDetails?.data || obstetricDetails;
    const enrichedCaseManagerData = dataSourceForPreview
        ? {
            ...dataSourceForPreview,
            ...(gynecHistoryData && isGynaecHistoryAccessable && { gynecHistoryData }),
            ...(obstetricData && { obsHistoryData: dataSourceForPreview.obsHistoryData || obstetricData }),
        }
        : dataSourceForPreview;
    const contextApi = { smartRxFile: isAfterDigitization ? undefined : smartRxFile, isDigitisedPrintConfig: isAfterDigitization, divWidth, caseManagerData: enrichedCaseManagerData, certificateData, printSettings, setPrintSettings, fileHeader, setFileHeader, fileFooter, setFileFooter, fileLogo, setFileLogo, fileWatermark, setFileWatermark, fileSignature, setFileSignature, medicalHistoryCheckboxOptions, labParamsData, zydusSelectedLabParams, customModules, carePlanAssignments, ophthalModuleData: opthalModuleData, dentalData };
    const TabsPrintSetting = [
        {
            key: TAB_PRESCRIPTION,
            label: 'Prescription'
        },
        {
            key: TAB_HEADER_FOOTER,
            label: 'Header & Footer'
        },
        {
            key: TAB_PAGE_FORMAT,
            label: 'Page Format'
        },
    ];

    const hasOphthalValue = (value) => {
        if (value === 0 || value === "0") return true;
        if (value === null || value === undefined) return false;
        return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
    };

    const hasOphthalArrayData = (items, keys) =>
        Array.isArray(items) && items.some((item) => keys.some((key) => hasOphthalValue(item?.[key])));

    const hasOphthalModuleData = !!(
        opthalModuleData &&
        (
            hasOphthalArrayData(opthalModuleData.visualAcuity, ["ucDistance", "ucNear", "pinhole", "cDistance", "cNear"]) ||
            hasOphthalArrayData(opthalModuleData.autoRefraction, ["sphere", "cylinder", "axis", "add", "distance", "near"]) ||
            hasOphthalArrayData(opthalModuleData.lensometerValues, ["sphere", "cylinder", "axis", "add", "distance", "near"]) ||
            hasOphthalArrayData(opthalModuleData.glassPrescription, ["sphere", "cylinder", "axis", "add", "distance", "near"]) ||
            hasOphthalArrayData(opthalModuleData.intraOcularPressure, ["nct", "gat", "cc", "cct", "ciop"]) ||
            hasOphthalArrayData(opthalModuleData.slitLampExamination, ["OD", "OS", "remarks"]) ||
            hasOphthalArrayData(opthalModuleData.fundusExamination, ["OD", "OS", "remarks"]) ||
            hasOphthalValue(opthalModuleData.pd)
        )
    );

    // Fetch appointment agent link
    useEffect(() => {
        const fetchAppointmentLink = async () => {
            try {
                const decodedToken = getDecodedToken();
                const clinicId = decodedToken?.result?.clinic_id;
                if (clinicId) {
                    const res = await fetchAgents(clinicId);
                    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
                        const appointmentLink = res.data[0]?.appointmentLinkShared;
                        if (appointmentLink) {
                            setAppointmentLinkShared(appointmentLink);
                        }
                    }
                }
            } catch (error) {
                console.error("Error while fetching appointment agent link: ", error);
            }
        };
        fetchAppointmentLink();
    }, []);

    useEffect(() => {
        const makeData = async () => {
            const publishUrl = profile?.website_publish ? profile?.publish_url : null ;
            const qrCodeUrl = publishUrl || appointmentLinkShared ;
            const qrCode = qrCodeUrl ? await QRCode.toDataURL(qrCodeUrl) : null;
            const isWrittenRxSnapSmart = (state?.from === "/snap-rx/preview" || state?.from === "/print-smart-rx") && !isAfterDigitization && (smartRxFile?.length > 0 || caseManagerData?.smart_prescription_filename);
            const hasUserPrintSettings = printSettingsRef.current && Object.keys(printSettingsRef.current).length > 0;
            const baseSettings = (isWrittenRxSnapSmart && hasUserPrintSettings) ? printSettingsRef.current : defaultPrintSettings;
            const copyPrintSettings = JSON.parse(JSON.stringify({
                ...baseSettings,
                qrcode: qrCode
            }));

            const isVoiceAmbientFlow = isAmbientRx || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX || caseManagerData?.isVoiceAmbientRx || isAfterDigitization;
            const isVoiceOrSnapDigitised = (rxId || isAmbientRx) || (isAfterDigitization && (smartRxFile?.length > 0 || caseManagerData?.isRxDigitize));
            const dataForPrescription = (isVoiceOrSnapDigitised && prescriptionDataFromApi) ? prescriptionDataFromApi : caseManagerData;

            if (isWrittenRxSnapSmart && copyPrintSettings?.prescription?.case_option) {
                const todayStr = moment().format("YYYY-MM-DD");
                const consultationDate = caseManagerData?.patient_data?.patient_consultaion_date
                    ? moment(caseManagerData.patient_data.patient_consultaion_date).format("YYYY-MM-DD")
                    : todayStr;
                const allVitals = caseManagerData?.vitals || [];
                const vitalsForToday = allVitals.filter(
                    (v) => (v?.date || v?.createdAt) && moment(v.date || v.createdAt).format("YYYY-MM-DD") === todayStr
                );
                const vitalsForConsultation = allVitals.filter(
                    (v) => (v?.date || v?.createdAt) && moment(v.date || v.createdAt).format("YYYY-MM-DD") === consultationDate
                );
                const hasLabData = labParamsData.length > 0;
                const defaultOptions = defaultPrintSettings?.prescription?.case_option || [];
                const medicalHistoryLen = caseManagerData?.medical_history?.length ?? 0;
                const hasMedicalHistory = medicalHistoryLen > 0;
                const allowedIds = [];
                const isEnabledByDefault = (id) => {
                    const opt = defaultOptions.find(o => o.id === id);
                    // If backend has no opinion, keep legacy behaviour (treat as enabled)
                    if (!opt) return true;
                    return opt.enable !== "N";
                };
                // Include vitals if we have any for today OR for consultation date (record of today)
                const hasVitalsForDisplay = vitalsForToday.length > 0 || vitalsForConsultation.length > 0;
                if (hasVitalsForDisplay && isEnabledByDefault(7)) allowedIds.push(7);
                if (hasLabData && isEnabledByDefault(15)) allowedIds.push(15);
                if (hasMedicalHistory && isEnabledByDefault(8)) allowedIds.push(8);
                const obstetricData = obstetricDetails?.data || obstetricDetails;
                const currentPregnancy = obstetricData?.currentPregnancy;
                const pregnancyHistory = obstetricData?.pregnancyHistory;
                const hasObstetricData = currentPregnancy && (currentPregnancy?.lmp || currentPregnancy?.edd || currentPregnancy?.ceed || (currentPregnancy?.gravidity != null) || (currentPregnancy?.parity != null) || (currentPregnancy?.livingChildren != null) || (currentPregnancy?.abortion != null) || (currentPregnancy?.ectopicPregnancies != null) || (Array.isArray(pregnancyHistory) && pregnancyHistory.length > 0));
                const hasGynecFromCaseManager = caseManagerData?.gynecHistoryData && Object.keys(caseManagerData.gynecHistoryData).length > 0;
                const hasObsFromCaseManager = caseManagerData?.obsHistoryData && Object.keys(caseManagerData.obsHistoryData).length > 0;
                if ((hasGynecFromCaseManager || hasObstetricData) && isEnabledByDefault(13)) allowedIds.push(13);
                if ((hasObsFromCaseManager || hasObstetricData) && isEnabledByDefault(14)) allowedIds.push(14);
                if (caseManagerData?.vaccinations?.length > 0 && isEnabledByDefault(10)) allowedIds.push(10);
                const hasOthersData = (caseManagerData?.visit_advice?.trim()) || (Array.isArray(caseManagerData?.others) && caseManagerData.others.length > 0);
                if (hasOthersData && isEnabledByDefault(91)) allowedIds.push(91);
                const hasFollowUp = !!(caseManagerData?.follow_up_date && String(caseManagerData.follow_up_date).trim());
                if (hasFollowUp && isEnabledByDefault(9)) allowedIds.push(9);
                if (isEnabledByDefault(11)) allowedIds.push(11);
                const defaultMedicalHistoryOption = (caseManagerData?.medical_history || [])
                    .filter(item => item && (item.tags?.length > 0 || item.no_know_history))
                    .map(item => item.tmmhs_id);
                const obsData = obstetricData || caseManagerData?.obsHistoryData;
                const cp = obsData?.currentPregnancy || obsData;
                const pHistory = obsData?.pregnancyHistory || [];
                const defaultObsHistoryOption = [];
                if (cp) {
                    if (("gravidity" in cp && cp?.gravidity != null) || ("parity" in cp && cp?.parity != null) || ("livingChildren" in cp && cp?.livingChildren != null) || ("abortion" in cp && cp?.abortion != null) || ("ectopicPregnancies" in cp && cp?.ectopicPregnancies != null) || ("diagnosisNotes" in cp && cp?.diagnosisNotes != null)) defaultObsHistoryOption.push("gplae");
                    if (cp?.lmp || "edd" in cp || "ceed" in cp || "blood" in cp || "husbandsBlood" in cp || "consang" in cp || "maritialStatus" in cp || ("marriageDurationYears" in cp && cp?.marriageDurationYears != null) || ("marriageDurationMonths" in cp && cp?.marriageDurationMonths != null)) defaultObsHistoryOption.push("diagnosis");
                    if (Array.isArray(pHistory) && pHistory.length > 0) defaultObsHistoryOption.push("history");
                    if (cp?.examinationHistory?.length > 0) defaultObsHistoryOption.push("examination");
                    if (cp?.ancHistory?.some((a) => a?.enablePrint)) defaultObsHistoryOption.push("ancHistory");
                    if (cp?.immunisationHistory?.some((i) => i?.enablePrint)) defaultObsHistoryOption.push("immunisationHistory");
                }
                // Start from doctor's saved default case_option for written Snap/SmartRx.
                const defaultCaseOption = defaultOptions.map((o) => {
                    const base = {
                        ...o,
                        custom_status: o.custom_status || "Y",
                        ...(o.id === 15 ? { title: "Lab Results" } : {}),
                    };
                    if (o.id === 8 && hasMedicalHistory && (!o.medical_history_option || o.medical_history_option.length === 0) && defaultMedicalHistoryOption.length > 0) {
                        base.medical_history_option = defaultMedicalHistoryOption;
                    }
                    if (o.id === 14 && hasObstetricData && (!o.obs_history_option || o.obs_history_option.length === 0) && defaultObsHistoryOption.length > 0) {
                        base.obs_history_option = defaultObsHistoryOption;
                    }
                    return base;
                });

                // Preserve per‑Rx edits (Apply on This Rx Only) without changing default enable/disable flags.
                const existingCaseOption = printSettingsRef.current?.prescription?.case_option || [];
                if (existingCaseOption.length > 0) {
                    const existingMap = new Map(existingCaseOption.map((o) => [o.id, o]));
                    copyPrintSettings.prescription.case_option = defaultCaseOption.map((opt) => {
                        const override = existingMap.get(opt.id);
                        return override ? { ...opt, ...override } : opt;
                    });
                    // Also keep any per‑Rx-only sections that don't exist in defaults
                    existingCaseOption.forEach((opt) => {
                        if (!copyPrintSettings.prescription.case_option.some((o) => o.id === opt.id)) {
                            copyPrintSettings.prescription.case_option.push({ ...opt });
                        }
                    });
                } else {
                    copyPrintSettings.prescription.case_option = defaultCaseOption;
                }

                const existingIds = new Set(
                    (copyPrintSettings.prescription.case_option || []).map((o) => o.id)
                );
                const writtenRxOptionTitle = state?.from === "/snap-rx/preview" ? "Snap" : "SmartRx";
                if (isEnabledByDefault(11) && !existingIds.has(11)) {
                    copyPrintSettings.prescription.case_option.push({
                        id: 11,
                        title: writtenRxOptionTitle,
                        format: "inline",
                        enable: "Y",
                        custom_status: "Y",
                    });
                    existingIds.add(11);
                }
                // Vitals, Follow Up, Lab Results, Medical History, Gynec/Obs History, Vaccination, Others:
                // auto-add only when they don't exist in defaults; respect default enable/disable when present.
                if (allowedIds.includes(9) && !existingIds.has(9)) {
                    const smartRxIdx = copyPrintSettings.prescription.case_option.findIndex(o => o.id === 11);
                    const insertIdx = smartRxIdx >= 0 ? smartRxIdx : copyPrintSettings.prescription.case_option.length;
                    copyPrintSettings.prescription.case_option.splice(insertIdx, 0, { id: 9, title: "Follow Up", format: "inline", enable: "Y", custom_status: "Y" });
                    existingIds.add(9);
                }
                if (allowedIds.includes(7) && !existingIds.has(7)) {
                    const smartRxIdx = copyPrintSettings.prescription.case_option.findIndex(o => o.id === 11);
                    const insertIdx = smartRxIdx >= 0 ? smartRxIdx : copyPrintSettings.prescription.case_option.length;
                    copyPrintSettings.prescription.case_option.splice(insertIdx, 0, { id: 7, title: "Vitals", format: "table", enable: "Y", custom_status: "Y" });
                    existingIds.add(7);
                }
                if (allowedIds.includes(15) && !existingIds.has(15)) {
                    const smartRxIdx = copyPrintSettings.prescription.case_option.findIndex(o => o.id === 11);
                    const insertIdx = smartRxIdx >= 0 ? smartRxIdx : copyPrintSettings.prescription.case_option.length;
                    copyPrintSettings.prescription.case_option.splice(insertIdx, 0, { id: 15, title: "Lab Results", format: "table", enable: "Y", custom_status: "Y" });
                    existingIds.add(15);
                }
                if (allowedIds.includes(8) && !existingIds.has(8)) {
                    const medicalHistoryOption = (caseManagerData?.medical_history || [])
                        .filter(item => item && (item.tags?.length > 0 || item.no_know_history))
                        .map(item => item.tmmhs_id);
                    const smartRxIdx = copyPrintSettings.prescription.case_option.findIndex(o => o.id === 11);
                    const insertIdx = smartRxIdx >= 0 ? smartRxIdx : copyPrintSettings.prescription.case_option.length;
                    copyPrintSettings.prescription.case_option.splice(insertIdx, 0, { id: 8, title: "Medical History", format: "table", enable: "Y", custom_status: "Y", medical_history_option: medicalHistoryOption.length > 0 ? medicalHistoryOption : (caseManagerData?.medical_history || []).map(item => item?.tmmhs_id).filter(Boolean) });
                    existingIds.add(8);
                }
                if (allowedIds.includes(13) && !existingIds.has(13)) {
                    const smartRxIdx = copyPrintSettings.prescription.case_option.findIndex(o => o.id === 11);
                    const insertIdx = smartRxIdx >= 0 ? smartRxIdx : copyPrintSettings.prescription.case_option.length;
                    copyPrintSettings.prescription.case_option.splice(insertIdx, 0, { id: 13, title: "Gynec History", format: "table", enable: "Y", custom_status: "Y" });
                    existingIds.add(13);
                }
                if (allowedIds.includes(14) && !existingIds.has(14)) {
                    const smartRxIdx = copyPrintSettings.prescription.case_option.findIndex(o => o.id === 11);
                    const insertIdx = smartRxIdx >= 0 ? smartRxIdx : copyPrintSettings.prescription.case_option.length;
                    copyPrintSettings.prescription.case_option.splice(insertIdx, 0, { id: 14, title: "Obstetric History", format: "table", enable: "Y", custom_status: "Y", obs_history_option: defaultObsHistoryOption.length > 0 ? defaultObsHistoryOption : undefined });
                    existingIds.add(14);
                }
                if (allowedIds.includes(10) && !existingIds.has(10)) {
                    copyPrintSettings.prescription.case_option.push({ id: 10, title: "Vaccination", format: "listview", enable: "Y", custom_status: "Y" });
                    existingIds.add(10);
                }
                if (allowedIds.includes(91) && !existingIds.has(91)) {
                    copyPrintSettings.prescription.case_option.push({ id: 91, title: "Others", format: "listview", enable: "Y", custom_status: "Y" });
                    existingIds.add(91);
                }
            }
            if (isVoiceAmbientFlow && !isWrittenRxSnapSmart && copyPrintSettings?.prescription?.case_option) {
                copyPrintSettings.prescription.case_option = copyPrintSettings.prescription.case_option.filter(
                    option => option?.type !== "page_break"
                );
            }
            // Use digitised-style print config for: digitised snap/smart OR voice/ambient (same as digitised, not written Rx)
            const useDigitisedStyleConfig = isAfterDigitization || !!dataForPrescription?.isVoiceAmbientRx;
            // Remove SmartRx option for digitised and voice/ambient – only snap/smart written Rx should have it
            if (useDigitisedStyleConfig && copyPrintSettings?.prescription?.case_option) {
                copyPrintSettings.prescription.case_option = copyPrintSettings.prescription.case_option.filter(
                    option => option?.id !== 11
                );
            }

            // After digitization or voice/ambient: ensure ALL modules that have data are in print config (same as digitised snap/smart). Use dataForPrescription so voice/ambient API vaccinations are included.
            if (useDigitisedStyleConfig && copyPrintSettings?.prescription?.case_option) {
                const hasMedicationData = (dataForPrescription?.medicine?.length ?? 0) > 0;
                const todayStr = moment().format("YYYY-MM-DD");
                const vitalsForToday = (dataForPrescription?.vitals || []).filter(
                    (v) => (v?.date || v?.createdAt) && moment(v.date || v.createdAt).format("YYYY-MM-DD") === todayStr
                );
                const rawLabParams = dataForPrescription?.labParamsData || [];
                const labParamsToday = rawLabParams.filter(
                    (l) => (l?.date || l?.createdAt) && moment(l.date || l.createdAt).format("YYYY-MM-DD") === todayStr
                );
                const hasLabData = labParamsToday.length > 0;
                const hasMedicalHistory = (dataForPrescription?.medical_history?.length ?? 0) > 0;
                const obstetricData = obstetricDetails?.data || obstetricDetails;
                const currentPregnancy = obstetricData?.currentPregnancy;
                const pregnancyHistory = obstetricData?.pregnancyHistory || [];
                const hasObstetricData = currentPregnancy && (currentPregnancy?.lmp || currentPregnancy?.edd || currentPregnancy?.ceed || (currentPregnancy?.gravidity != null) || (currentPregnancy?.parity != null) || (currentPregnancy?.livingChildren != null) || (currentPregnancy?.abortion != null) || (currentPregnancy?.ectopicPregnancies != null) || (Array.isArray(pregnancyHistory) && pregnancyHistory.length > 0));
                const hasGynecFromCaseManager = dataForPrescription?.gynecHistoryData && Object.keys(dataForPrescription.gynecHistoryData || {}).length > 0;
                const hasObsFromCaseManager = dataForPrescription?.obsHistoryData && Object.keys(dataForPrescription.obsHistoryData || {}).length > 0;
                const hasVaccinations = (dataForPrescription?.vaccinations?.length ?? 0) > 0;
                const hasOthersData = (dataForPrescription?.visit_advice && typeof dataForPrescription.visit_advice === "string" && dataForPrescription.visit_advice.trim()) || (Array.isArray(dataForPrescription?.others) && dataForPrescription.others.length > 0);
                const defaultOptions = defaultPrintSettings?.prescription?.case_option || [];
                const existingIds = new Set((copyPrintSettings.prescription.case_option || []).map(o => o.id));

                const addIfMissing = (id, title, format, extra = {}, insertAtStart = false) => {
                    if (!existingIds.has(id)) {
                        const template = defaultOptions.find(o => o.id === id);
                        const option = template ? { ...template, enable: "Y", custom_status: "Y", ...(id === 15 ? { title: "Lab Results" } : {}), ...extra } : { id, title, format: format || "table", enable: "Y", custom_status: "Y", ...extra };
                        let insertIdx;
                        if (insertAtStart) {
                            insertIdx = 0;
                        } else {
                            const smartRxIdx = copyPrintSettings.prescription.case_option.findIndex(o => o.id === 10);
                            insertIdx = smartRxIdx >= 0 ? smartRxIdx : copyPrintSettings.prescription.case_option.length;
                        }
                        copyPrintSettings.prescription.case_option.splice(insertIdx, 0, option);
                        existingIds.add(id);
                    }
                };

                // Digitized Rx Pad sections (Symptoms, Diagnosis, Examination, Advice, Follow Up) – always add for digitization; ViewPDF renders only when data exists
                addIfMissing(9, "Follow Up", "inline", {}, true);
                addIfMissing(5, "Advice", "inline", {}, true);
                addIfMissing(3, "Diagnosis", "inline", {}, true);
                addIfMissing(2, "Examination", "inline", {}, true);
                addIfMissing(1, "Symptoms", "inline", {}, true);

                if (hasMedicationData) addIfMissing(4, "Medication", "table");
                if (vitalsForToday.length > 0) addIfMissing(7, "Vitals", "table");
                if (hasLabData) addIfMissing(15, "Lab Results", "table");
                if (hasMedicalHistory) {
                    const defaultMedicalHistoryOption = (dataForPrescription?.medical_history || [])
                        .filter(item => item && (item.tags?.length > 0 || item.no_know_history))
                        .map(item => item.tmmhs_id);
                    addIfMissing(8, "Medical History", "table", defaultMedicalHistoryOption.length > 0 ? { medical_history_option: defaultMedicalHistoryOption } : {});
                }
                if (hasGynecFromCaseManager || hasObstetricData) addIfMissing(13, "Gynec History", "table");
                if (hasObsFromCaseManager || hasObstetricData) {
                    const obsData = obstetricData || dataForPrescription?.obsHistoryData;
                    const cp = obsData?.currentPregnancy || obsData;
                    const pHistory = obsData?.pregnancyHistory || [];
                    const defaultObsHistoryOption = [];
                    if (cp) {
                        if (("gravidity" in cp && cp?.gravidity != null) || ("parity" in cp && cp?.parity != null) || ("livingChildren" in cp && cp?.livingChildren != null) || ("abortion" in cp && cp?.abortion != null) || ("ectopicPregnancies" in cp && cp?.ectopicPregnancies != null) || ("diagnosisNotes" in cp && cp?.diagnosisNotes != null)) defaultObsHistoryOption.push("gplae");
                        if (cp?.lmp || "edd" in cp || "ceed" in cp || "blood" in cp || "husbandsBlood" in cp || "consang" in cp || "maritialStatus" in cp || ("marriageDurationYears" in cp && cp?.marriageDurationYears != null) || ("marriageDurationMonths" in cp && cp?.marriageDurationMonths != null)) defaultObsHistoryOption.push("diagnosis");
                        if (Array.isArray(pHistory) && pHistory.length > 0) defaultObsHistoryOption.push("history");
                        if (cp?.examinationHistory?.length > 0) defaultObsHistoryOption.push("examination");
                        if (cp?.ancHistory?.some((a) => a?.enablePrint)) defaultObsHistoryOption.push("ancHistory");
                        if (cp?.immunisationHistory?.some((i) => i?.enablePrint)) defaultObsHistoryOption.push("immunisationHistory");
                    }
                    addIfMissing(14, "Obstetric History", "table", defaultObsHistoryOption.length > 0 ? { obs_history_option: defaultObsHistoryOption } : {});
                }
                if (hasVaccinations) addIfMissing(10, "Vaccination", "listview");
                if (hasOthersData) addIfMissing(91, "Others", "listview");
            }

            // Lab Investigation (id 15): default print section for lab parameters/investigations from backend.
            // Lab Results (id 18): added below when Zydus data exists; both can appear in Format Style.
            // Add Case Option ID 18 for Zydus Lab Results if it doesn't exist and we have Zydus data (skip for written Rx snap/smart)
            if (!isWrittenRxSnapSmart && zydusSelectedLabParams?.length > 0 && copyPrintSettings?.prescription?.case_option) {
                const hasZydusOption = copyPrintSettings.prescription.case_option.find(option => option.id === 18);
                if (!hasZydusOption) {
                    // Find Lab Investigation (ID 15) position to insert Zydus Lab Results (ID 18) after it
                    const labResultsIndex = copyPrintSettings.prescription.case_option.findIndex(option => option.id === 15);
                    const insertIndex = labResultsIndex !== -1 ? labResultsIndex + 1 : copyPrintSettings.prescription.case_option.length;
                    
                    // Add Zydus Lab Results option
                    copyPrintSettings.prescription.case_option.splice(insertIndex, 0, {
                        id: 18,
                        title: "Zydus Lab Results",
                        format: "inline",
                        enable: "Y",
                        custom_status: "Y"
                    });
                }
            }

            // Add Case Option ID 20 for Ophthalmology when module has data (skip for written Rx snap/smart)
            if (!isWrittenRxSnapSmart && hasOphthalModuleData && copyPrintSettings?.prescription?.case_option) {
                const hasOphthalmologyOption = copyPrintSettings.prescription.case_option.find(option => option.id === 20);
                if (!hasOphthalmologyOption) {
                    // Add Ophthalmology option with default settings
                    copyPrintSettings.prescription.case_option.push({
                        id: 20,
                        title: "Ophthal",
                        format: "table", // table, listview, or inline
                        enable: "Y",
                        custom_status: "Y",
                        ophthalmology_option: ophthalmologyDefaultPrintSettings.subSections
                    });
                } else {
                    // Ensure ophthalmology_option exists even if option already exists
                    const ophthOption = copyPrintSettings.prescription.case_option.find(option => option.id === 20);
                    if (ophthOption && !ophthOption.ophthalmology_option) {
                        ophthOption.ophthalmology_option = ophthalmologyDefaultPrintSettings.subSections;
                    }
                }
            }

            const moduleSource = dataForPrescription?.moduleContents || caseManagerData?.moduleContents || [];
            if (moduleSource.length > 0 && copyPrintSettings?.prescription?.case_option) {
                const existingOptionIds = new Set(copyPrintSettings.prescription.case_option.map(o => o.id));
                moduleSource.forEach(mod => {
                    const modId = mod?.module_id;
                    const modName = mod?.module_name || mod?.name || modId;
                    if (modId && !existingOptionIds.has(modId) && mod?.content?.length > 0) {
                        copyPrintSettings.prescription.case_option.push({
                            id: modId,
                            title: modName,
                            format: "inline",
                            enable: "Y",
                            custom_status: "Y",
                            is_custom_module: true,
                            showDefault: true,
                        });
                        existingOptionIds.add(modId);
                    }
                });
            }

            // Add SmartRx (written RX) option only for snap/smart written prescription – NOT for digitised prescription.
            // Respect doctor's default enable/disable; do NOT force-enable if it already exists in defaults.
            const hasSmartRxFiles = (smartRxFile && smartRxFile.length > 0) || caseManagerData?.smart_prescription_filename;
            const showWrittenRxOption = hasSmartRxFiles && isWrittenRxSnapSmart;
            if (showWrittenRxOption && copyPrintSettings?.prescription?.case_option) {
                const writtenRxOptionTitle = state?.from === "/snap-rx/preview" ? "Snap" : "SmartRx";
                const smartRxOption = copyPrintSettings.prescription.case_option.find(option => option.id === 11);
                if (!smartRxOption) {
                    // If SmartRx is missing entirely from defaults, add it as enabled.
                    const vaccinesIndex = copyPrintSettings.prescription.case_option.findIndex(option => option.id === 10);
                    const insertIndex = vaccinesIndex !== -1 ? vaccinesIndex + 1 : copyPrintSettings.prescription.case_option.length;
                    copyPrintSettings.prescription.case_option.splice(insertIndex, 0, {
                        id: 11,
                        title: writtenRxOptionTitle,
                        format: "inline",
                        enable: "Y",
                        custom_status: "Y"
                    });
                } else {
                    // Keep existing enable/custom_status from defaults; only update the title.
                    smartRxOption.title = writtenRxOptionTitle;
                }
            }

            // Add Others option (id 91) when prescription has visit_advice or others (snap/smart/voice/ambient)
            const hasOthersDataForOption = (caseManagerData?.visit_advice && typeof caseManagerData.visit_advice === 'string' && caseManagerData.visit_advice.trim()) || (Array.isArray(caseManagerData?.others) && caseManagerData.others.length > 0);
            if (hasOthersDataForOption && copyPrintSettings?.prescription?.case_option && !copyPrintSettings.prescription.case_option.some(o => o.id === 91)) {
                copyPrintSettings.prescription.case_option.push({
                    id: 91,
                    title: "Others",
                    format: "listview",
                    enable: "Y",
                    custom_status: "Y"
                });
            }

            // Ensure Obstetric History (id 14) has obs_history_option when empty and obstetric data exists (all flows)
            const obsOptData = obstetricDetails?.data || obstetricDetails || dataSourceForPreview?.obsHistoryData;
            const cpForObs = obsOptData?.currentPregnancy || obsOptData;
            const pHistoryForObs = obsOptData?.pregnancyHistory || [];
            const defaultObsHistoryOptionGlobal = [];
            if (cpForObs) {
                if (("gravidity" in cpForObs && cpForObs?.gravidity != null) || ("parity" in cpForObs && cpForObs?.parity != null) || ("livingChildren" in cpForObs && cpForObs?.livingChildren != null) || ("abortion" in cpForObs && cpForObs?.abortion != null) || ("ectopicPregnancies" in cpForObs && cpForObs?.ectopicPregnancies != null) || ("diagnosisNotes" in cpForObs && cpForObs?.diagnosisNotes != null)) defaultObsHistoryOptionGlobal.push("gplae");
                if (cpForObs?.lmp || "edd" in cpForObs || "ceed" in cpForObs || "blood" in cpForObs || "husbandsBlood" in cpForObs || "consang" in cpForObs || "maritialStatus" in cpForObs || ("marriageDurationYears" in cpForObs && cpForObs?.marriageDurationYears != null) || ("marriageDurationMonths" in cpForObs && cpForObs?.marriageDurationMonths != null)) defaultObsHistoryOptionGlobal.push("diagnosis");
                if (Array.isArray(pHistoryForObs) && pHistoryForObs.length > 0) defaultObsHistoryOptionGlobal.push("history");
                if (cpForObs?.examinationHistory?.length > 0) defaultObsHistoryOptionGlobal.push("examination");
                if (cpForObs?.ancHistory?.some((a) => a?.enablePrint)) defaultObsHistoryOptionGlobal.push("ancHistory");
                if (cpForObs?.immunisationHistory?.some((i) => i?.enablePrint)) defaultObsHistoryOptionGlobal.push("immunisationHistory");
            }
            if (copyPrintSettings?.prescription?.case_option && defaultObsHistoryOptionGlobal.length > 0) {
                const obsOption14 = copyPrintSettings.prescription.case_option.find(o => o.id === 14);
                if (obsOption14 && (!obsOption14.obs_history_option || obsOption14.obs_history_option.length === 0)) {
                    obsOption14.obs_history_option = defaultObsHistoryOptionGlobal;
                }
            }

            // Add Vaccines option (id 10) when prescription has vaccinations (snap/smart/voice/ambient) so it appears in config and can be enabled for "Apply on This Rx Only" (skip for written Rx snap/smart). Use dataForPrescription so voice/ambient API vaccinations are included.
            const hasPrescriptionVaccinations = dataForPrescription?.vaccinations && Array.isArray(dataForPrescription.vaccinations) && dataForPrescription.vaccinations.length > 0;
            if (!isWrittenRxSnapSmart && hasPrescriptionVaccinations && copyPrintSettings?.prescription?.case_option) {
                const vaccinesOption = copyPrintSettings.prescription.case_option.find(option => option.id === 10);
                if (!vaccinesOption) {
                    copyPrintSettings.prescription.case_option.push({
                        id: 10,
                        title: "Vaccination",
                        format: "listview",
                        enable: "Y",
                        custom_status: "Y"
                    });
                } else {
                    if (vaccinesOption.enable !== "Y" || vaccinesOption.custom_status !== "Y") {
                        vaccinesOption.enable = "Y";
                        vaccinesOption.custom_status = "Y";
                    }
                }
            }

            setPrintSettings(copyPrintSettings);
            copyPrintSettings?.logo_enable === 'Y' && copyPrintSettings.logo_image && setFileLogo({ imageShow: true, showFile: copyPrintSettings.logo_image });
            copyPrintSettings?.water_mark_enable === 'Y' && copyPrintSettings.water_mark_image && setFileWatermark({ imageShow: true, showFile: copyPrintSettings.water_mark_image });
            copyPrintSettings?.signature_enable === 'Y' && copyPrintSettings.signature_image && setFileSignature({ imageShow: true, showFile: copyPrintSettings.signature_image });
            copyPrintSettings?.header_image && setFileHeader({ imageShow: true, showFile: copyPrintSettings.header_image });
            if (copyPrintSettings?.footer_image) {
                updateFooterImageHeight({showFile: copyPrintSettings?.footer_image}, setFileFooter, true);
            }
        }
        makeData()
    }, [defaultPrintSettings, zydusSelectedLabParams?.length, isAmbientRx, caseManagerData?.isVoiceAmbientRx, caseManagerData?.vaccinations?.length, caseManagerData?.labParamsData?.length, labParamsData?.length, caseManagerData?.medical_history?.length, caseManagerData?.gynecHistoryData, caseManagerData?.obsHistoryData, obstetricDetails, smartRxFile, caseManagerData?.smart_prescription_filename, isAfterDigitization, state?.from, hasOphthalModuleData, appointmentLinkShared, profile?.publish_url, profile?.micrositeUrl, prescriptionDataFromApi, prescriptionDataFromApi?.vaccinations?.length, rxId]);

    useEffect(() => {
        if (!fileFooter?.showFile) return;
        updateFooterImageHeight(fileFooter, setFileFooter);
    }, [fileFooter?.showFile])

    const onTabChange = useCallback(
        (key) => {
            setSelectedTab(key);
            updateFooterImageHeight();
        },
        []
    );

    const getPatientBills = async () => {
        const queryParams = {
          doctorIds: [userId],
          sortBy: "date",
          sortOrder: "asc",
          page: 1,
          limit: 25,
          startDate: moment().format("YYYY-MM-DD"),
          endDate: moment().format("YYYY-MM-DD"),
          patientId: caseManagerData?.patient_data?.patient_unique_id,
          appointmentId: pam_id || caseManagerData?.patient_data?.pam_id,
          includeInRx: true,
        };
        const response = await fetchBillsByPatient(queryParams);
        if (response?.bills?.length > 0) {
            setPatientBills(response?.bills);
        }
        const patientAdvanceDeposit = await listAdvancedDepositByPatient({
          ...queryParams,
          status: ["Deposit", "Refund"],
        });
        if (patientAdvanceDeposit?.receipts?.length > 0) {
          setAdvanceReceipts(patientAdvanceDeposit?.receipts);
        }
        const patientWalletBalanceRes = await fetchPatientWalletBalance(
            caseManagerData?.patient_data?.patient_unique_id
        );
        setPatientWalletBalance(patientWalletBalanceRes?.advanceDepositBalance);
    };

    const fetchAbhaDetails = async () => {
        const abhaDetails = await ApiAbha.fetchAbhaDetails(caseManagerData?.patient_data?.patient_unique_id);
        if (abhaDetails && Object.keys(abhaDetails).length > 0) {
            setAbhaDetails(abhaDetails);
        }
    };

    return (
        <PrintSettingsContext.Provider value={contextApi}>
            <>
                <HeaderPrintSetting defaultPrintSettings={defaultPrintSettings} />
                {/* <style scoped>{css}</style> */}
                <div className={'w-100 bg-body wrapper2'}>
                    <Row justify="space-between">
                        <Col xl={8} sm={10} className="pe-3">
                            <div className="bg-white overflow-y-auto" style={{ height: 'calc(100vh - 60px)' }}>
                                {/* Always show all tabs when we have caseManagerData (normal consult or voice/ambient) */}
                                <Tabs 
                                    defaultActiveKey="1" 
                                    items={caseManagerData !== undefined ? TabsPrintSetting : TabsPrintSetting.slice(1, 2)} 
                                    onChange={onTabChange} 
                                    className="print-tabs" 
                                />
                                {selectedTab === TAB_PRESCRIPTION ? (
                                    <PrescriptionLayout todayVaccines={todayVaccines} growthChartDetails={growthChartDetails} obstetricDetails={obstetricDetails} patientBills={[...patientBills, ...advanceReceipts]} />
                                ) : selectedTab === TAB_HEADER_FOOTER ? (
                                    <HeaderFooterLayout todayVaccines={todayVaccines} growthChartDetails={growthChartDetails} obstetricDetails={obstetricDetails} patientBills={patientBills} advanceReceipts={advanceReceipts} patientWalletBalance={patientWalletBalance} />
                                ) : selectedTab === TAB_PAGE_FORMAT && (
                                    <PageFormatLayout />
                                )}
                            </div>
                        </Col>
                        <Col xl={16} sm={14}>
                            <div className="mx-auto overflow-y-auto " style={{ width: isMobile ? 580 : 900 }} >
                                <div className="titleprint mt-20">Preview</div>
                                <div ref={divRef} className="rounded-20px bg-white mt-20 overflow-hidden">
                                    <div className="position-relative printheight">
                                        {caseManagerData !== undefined ? <Quixote mode={NORMAL} todayVaccines={todayVaccines} growthChartDetails={growthChartDetails} obstetricDetails={obstetricDetails} patientBills={patientBills} advanceReceipts={advanceReceipts} patientWalletBalance={patientWalletBalance} ophthalModuleData={opthalModuleData} abhaDetails={abhaDetails} dentalData={dentalData} /> : <QuixoteCertificate mode={NORMAL} />}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        </PrintSettingsContext.Provider>
    );
}

export default ConfigurePrintSetting;