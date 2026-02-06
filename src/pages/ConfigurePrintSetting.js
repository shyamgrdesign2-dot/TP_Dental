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
import { getModules } from "../redux/customModuleSlice";
import moment from "moment";
import { fetchBillsByPatient, fetchPatientWalletBalance, listAdvancedDepositByPatient } from "./opdBilling/service";
import { getCarePlanAssignments } from "./smartSync/services/carePlanService";
import { updateFooterImageHeight } from "../utils/utils";
import { getGenRx, getAmbientRx } from "../api/services/ApiGenRx";
import { getSnapRxDigitization } from "./snapRx/services/snapRxService";
import { env } from "../EnvironmentConfig";
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from "../utils/constants";
import { getFormattedDate } from "../utils/utils";
import { getDecodedToken } from "../utils/localStorage";
import { fetchAgents } from "./appointmentAgent/service";

function ConfigurePrintSetting() {

    const divRef = useRef(null);

    const { defaultPrintSettings, userId, profile } = useSelector((state) => state.doctors);

    const { state } = useLocation();
    const { caseManagerData, certificateData, smartRxFile, pam_id, isAmbientRx, rxId } = state || {};
    // selectedLang is available in state but not used in this component

    const [divWidth, setDivWidth] = useState(0);
    const [selectedTab, setSelectedTab] = useState(caseManagerData !== undefined ? TAB_PRESCRIPTION : TAB_HEADER_FOOTER);
    const [printSettings, setPrintSettings] = useState(null);
    const [fileHeader, setFileHeader] = useState(null);
    const [fileFooter, setFileFooter] = useState(null);
    const [fileLogo, setFileLogo] = useState(null);
    const [fileWatermark, setFileWatermark] = useState(null);
    const [fileSignature, setFileSignature] = useState(null);
    const [mergedCaseManagerData, setMergedCaseManagerData] = useState(caseManagerData);
    
    useEffect(() => {
        if (caseManagerData && !mergedCaseManagerData) {
            setMergedCaseManagerData(caseManagerData);
        }
    }, [caseManagerData, mergedCaseManagerData]);
    const [labParamsData, setLabParamsData] = useState(caseManagerData?.labParamsData || []);
    const todayVaccines = useTodayVaccines(mergedCaseManagerData);
    const growthChartDetails = useGrowthChart(mergedCaseManagerData);
    const obstetricDetails = useObstetric(mergedCaseManagerData?.patient_data?.patient_unique_id, mergedCaseManagerData?.doctor_Data?.um_id);
    const medicalHistoryCheckboxOptions = mergedCaseManagerData?.medical_history?.map(e => {
        return { label: e?.title, value: e?.tmmhs_id }
    })
    const [patientBills, setPatientBills] = useState([]);
    const [advanceReceipts, setAdvanceReceipts] = useState([]);
    const [patientWalletBalance, setPatientWalletBalance] = useState(0);
    const [carePlanAssignments, setCarePlanAssignments] = useState([]);
    const [appointmentLinkShared, setAppointmentLinkShared] = useState(null);
    const footerImageShowRef = useRef(false);

    const {customModules} = useSelector((state) => state.customModules);
    const dispatch = useDispatch();

    const zydusSelectedLabParams = mergedCaseManagerData?.zydusSelectedLabParams || [];


    useEffect(() => {
        setDivWidth(divRef.current?.offsetWidth);
    }, [divRef]);

    useEffect(() => {
        const fetchVoiceAmbientData = async () => {
            if (!caseManagerData) {
                return;
            }
            
            const rxIdToUse = rxId || caseManagerData?.smart_prescription_filename;
            const isAmbientMode = isAmbientRx || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX;
            const isSnapRx = caseManagerData?.isRxDigitize;
            
            const hasMergedMedicine = mergedCaseManagerData?.medicine && 
                                      Array.isArray(mergedCaseManagerData.medicine) && 
                                      mergedCaseManagerData.medicine.length > 0;
            const isVoiceAmbientRx = mergedCaseManagerData?.isVoiceAmbientRx;
            const isNormalConsult = !rxIdToUse && !isSnapRx;
            
            if (hasMergedMedicine && (isVoiceAmbientRx || isSnapRx) && (rxIdToUse || isSnapRx)) {
                return;
            }
            
            if (!mergedCaseManagerData) {
                setMergedCaseManagerData(caseManagerData);
            } else if (isNormalConsult && !hasMergedMedicine && mergedCaseManagerData !== caseManagerData) {
                setMergedCaseManagerData(caseManagerData);
            }
            
            if (rxIdToUse || isSnapRx) {
                try {
                    let voiceAmbientResponse = null;
                    let prescriptionData = null;
                    
                    if (isSnapRx) {
                        voiceAmbientResponse = await getSnapRxDigitization(
                            caseManagerData?.patient_data?.patient_unique_id,
                            caseManagerData?.tcm_id,
                            null
                        );
                    } else if (isAmbientMode) {
                        voiceAmbientResponse = await getAmbientRx(rxIdToUse);
                    } else {
                        voiceAmbientResponse = await getGenRx(rxIdToUse);
                    }
                    
                    if (voiceAmbientResponse) {
                        let responseData = voiceAmbientResponse?.data?.data || voiceAmbientResponse?.data;
                        
                        if (isSnapRx) {
                            // Try path for 1: responseData.digitization
                            if (responseData?.digitization) {
                                responseData = responseData.digitization;
                            } 
                            // Try path 2: voiceAmbientResponse.data.digitization
                            else if (voiceAmbientResponse?.data?.digitization) {
                                responseData = voiceAmbientResponse.data.digitization;
                            } 
                            // Try path 3: voiceAmbientResponse.digitization
                            else if (voiceAmbientResponse?.digitization) {
                                responseData = voiceAmbientResponse.digitization;
                            }
                            // Try path 4: responseData itself might be the digitization
                            else if (responseData && typeof responseData === 'object' && (responseData.editedData || responseData.refinedData || responseData.digitize)) {
                                // Keep responseData as is
                            }
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
                                            change: 0
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
                                    transformed.medicine = data.medications.map(med => ({
                                        ...med,
                                        unique_id: med.unique_id || med._id || med.tmm_id || `voice-${Date.now()}-${Math.random()}`,
                                        change: med.change || 0
                                    }));
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
                                                freqMorning = parseInt(numericFreq4[1]) || 0;
                                                freqAfternoon = parseInt(numericFreq4[2]) || 0;
                                                freqEvening = parseInt(numericFreq4[3]) || 0;
                                                freqNight = parseInt(numericFreq4[4]) || 0;
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
                                            tmm_generic: med.generic || med.generic_name || med.tmm_generic || "",
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
                                            medicineUnit: med.medicineUnit || []
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
                                transformed.diagnosis = data.diagnosis.map(diag => ({
                                    ...diag,
                                    tds_name: diag.name || diag.tds_name || diag.lineItem || "",
                                    unique_id: diag.unique_id || diag._id || `voice-${Date.now()}-${Math.random()}`,
                                    change: diag.change || 0
                                }));
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
                                smart_prescription_filename: caseManagerData?.smart_prescription_filename,
                            };
                            
                            setMergedCaseManagerData(merged);
                        } else {
                            setMergedCaseManagerData({
                                ...caseManagerData,
                                isVoiceAmbientRx: true
                            });
                        }
                    } else {
                        setMergedCaseManagerData({
                            ...caseManagerData,
                            isVoiceAmbientRx: true
                        });
                    }
                } catch (error) {
                    setMergedCaseManagerData({
                        ...caseManagerData,
                        isVoiceAmbientRx: true
                    });
                }
            } else {
                if (!mergedCaseManagerData || mergedCaseManagerData !== caseManagerData) {
                    setMergedCaseManagerData(caseManagerData);
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
                        {
                            headers: {
                                'Authorization': `Bearer ${cleanedToken}`,
                            },
                        }
                    );
                    
                    if (response?.data?.data?.results) {
                        setLabParamsData(response.data.data.results);
                    }
                } catch (error) {
                    
                }
            }
        };
        
        fetchVoiceAmbientData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [caseManagerData, rxId, isAmbientRx]);

    useEffect(() => {
        if (mergedCaseManagerData) {
            growthChartDetails.getGrowthChartDetails();
            getPatientBills();
        }
    }, [mergedCaseManagerData?.patient_data?.patient_unique_id, mergedCaseManagerData?.patient_data?.pam_id]);

    // Fetch care plan assignments for PDF rendering (used by Quixote/ViewPDF)
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const patientId = mergedCaseManagerData?.patient_data?.patient_unique_id;
                if (!patientId) return;
                const resp = await getCarePlanAssignments(patientId);
                setCarePlanAssignments(Array.isArray(resp) ? resp : []);
            } catch (e) {
                setCarePlanAssignments([]);
            }
        };
        fetchAssignments();
    }, [mergedCaseManagerData?.patient_data?.patient_unique_id]);

    useEffect(() => {
        dispatch(getModules(userId));
      }, [userId, dispatch]);

    const isVoiceAmbientModeCheck = mergedCaseManagerData?.isVoiceAmbientRx || 
                                     isAmbientRx || 
                                     window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX || 
                                     (rxId && !smartRxFile);
    const smartRxFileForContext = isVoiceAmbientModeCheck ? null : smartRxFile;
    
    const contextApi = { 
        smartRxFile: smartRxFileForContext, 
        divWidth, 
        caseManagerData: mergedCaseManagerData, 
        certificateData, 
        printSettings, 
        setPrintSettings, 
        fileHeader, 
        setFileHeader, 
        fileFooter, 
        setFileFooter, 
        fileLogo, 
        setFileLogo, 
        fileWatermark, 
        setFileWatermark, 
        fileSignature, 
        setFileSignature, 
        medicalHistoryCheckboxOptions, 
        labParamsData, 
        zydusSelectedLabParams, 
        customModules, 
        carePlanAssignments,
        isVoiceAmbientRx: mergedCaseManagerData?.isVoiceAmbientRx || false
    };

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
            const copyPrintSettings = JSON.parse(JSON.stringify({
                ...defaultPrintSettings,
                qrcode: await QRCode.toDataURL(`${config.doctor_website_url}${parseInt(defaultPrintSettings?.um_contact, 10).toString(36)}_${defaultPrintSettings?.hm_refer_code}`)
            }))
            
            const isVoiceAmbientFlow = isAmbientRx || window.TATVA_ACTIVE_VOICE_SERVICE === S_AMBIENT_VOICE_RX || mergedCaseManagerData?.isVoiceAmbientRx;
            if (isVoiceAmbientFlow && copyPrintSettings?.prescription?.case_option) {
                copyPrintSettings.prescription.case_option = copyPrintSettings.prescription.case_option.filter(
                    option => option?.type !== "page_break"
                );
            }
            
            // Add Case Option ID 18 for Zydus Lab Results if it doesn't exist and we have Zydus data
            if (zydusSelectedLabParams?.length > 0 && copyPrintSettings?.prescription?.case_option) {
                const hasZydusOption = copyPrintSettings.prescription.case_option.find(option => option.id === 18);
                if (!hasZydusOption) {
                    // Find Lab Results (ID 15) position to insert Zydus Lab Results (ID 18) after it
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
    }, [defaultPrintSettings, zydusSelectedLabParams?.length, isAmbientRx, mergedCaseManagerData?.isVoiceAmbientRx]);

    useEffect(() => {
        // Only run if fileFooter.showFile exists, imageShow is true, and it's the first time imageShow becomes true
        if (fileFooter?.showFile && fileFooter?.imageShow && !footerImageShowRef.current) {
            updateFooterImageHeight(fileFooter, setFileFooter, true);
            footerImageShowRef.current = true; // Mark as handled
        } else if (!fileFooter?.imageShow) {
            footerImageShowRef.current = false; // Reset when imageShow becomes false
        }
    }, [printSettings, fileFooter?.imageShow, fileFooter?.showFile])

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
          patientId: mergedCaseManagerData?.patient_data?.patient_unique_id,
          appointmentId: pam_id || mergedCaseManagerData?.patient_data?.pam_id,
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
            mergedCaseManagerData?.patient_data?.patient_unique_id
        );
        setPatientWalletBalance(patientWalletBalanceRes?.advanceDepositBalance);
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
                                    items={mergedCaseManagerData !== undefined ? TabsPrintSetting : TabsPrintSetting.slice(1, 2)} 
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
                                        {mergedCaseManagerData !== undefined ? <Quixote mode={NORMAL} todayVaccines={todayVaccines} growthChartDetails={growthChartDetails} obstetricDetails={obstetricDetails} patientBills={patientBills} advanceReceipts={advanceReceipts} patientWalletBalance={patientWalletBalance} /> : <QuixoteCertificate mode={NORMAL} />}
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