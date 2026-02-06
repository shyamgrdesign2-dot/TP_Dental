import React, { useState, useEffect, useCallback, useContext, useMemo, useRef } from "react";
import { Button, Card, DatePicker, Input, Tooltip } from 'antd';
import dayjs from "dayjs";

import { useSelector, useDispatch } from "react-redux";
// import { v4 as uuidv4 } from 'uuid';
import { errorMessage, getClinicName, onlyDecimalFormat } from "../utils/utils";

import CashManagerContext from '../context/CashManagerContext';

import {
    addUpdateVitals,
    getPatientBirthWeight,
    getVitals,
} from "../redux/vitalsSlice";
import moment from "moment";
import { NEO_NATOLOGISTS_DP_ID, PAEDIATRICS } from "../utils/constants";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { useAccess } from "../pages/vaccination/useAccess";

const dateFormat = 'YYYY-MM-DD'
const showDateFormat = 'DD MMM, YY'

function VitalsBox(props) {

    const scrollContainerRef = useRef(null);
    const inputRef = useRef([]);
    const hasInitializedRef = useRef(false);

    const { handleDrawerVital, handleCollapsed, initialVitals, onVitalsUpdate, onVitalsSave } = props

    const {
      selectedVitalsList,
      loading,
      patientBirthWeight: storedPatientBirthWeight,
    } = useSelector((state) => state.vitals);
    const dispatch = useDispatch();

    const { patient_data, vitalsData, setVitalsData } = useContext(CashManagerContext);
    const [childVitalsData, setChildVitalsData] = useState([]);
    const [dateString, setDateString] = useState(null);
    const [patientBirthWeight, setPatientBirthWeight] = useState(
      vitalsData?.[0]?.patient_birth_weight || storedPatientBirthWeight
    );
    const { measurements } = useSelector((state) => state.growthChart);
    const isGowthChartAccessableFromGB = useFeatureIsOn(
      "growth-chart-new-design"
    );

    const { profile, userId } = useSelector((state) => state.doctors);
    const { isPediatricAccessable } = useAccess();

    useEffect(() => {
        if (selectedVitalsList.length > 0) {
            const updatedData = selectedVitalsList.map((e, i) => {
                return { ...e, systolic: e.blood_press ? e.blood_press.split('/')[0] : '', diastolic: e.blood_press ? e.blood_press.split('/')[1] : '' };
            });
            setVitalsData(updatedData);
        } else if(measurements.length) {
            let cal = calculate('', '');
            setVitalsData(measurements.map(m => ({
                date: m.date,
                height: m.height || "",
                weight: m.weight || "", 
                ofc: m.ofc || "",
                bmi: m.bmi || cal.bmi,
                dev_unique_id: 0,
                tcv_id: 0,
                tcbc_id: 0,
                temp: '',
                pres: '',
                resp_rate: '',
                systolic: '',
                diastolic: '',
                spo2: '',
                bmr: cal.bmr,
                bsa: cal.bsa,
                    general_rbs: m.general_rbs,
                    fib4: '',
                    waist_circumference: ''
                })));
        }
    }, [selectedVitalsList, measurements]);

    useEffect(() => {
        if (!hasInitializedRef.current && childVitalsData.length === 0) {
            if (initialVitals && Object.keys(initialVitals).length > 0) {
                let cal = calculate(initialVitals?.height || '', initialVitals?.weight || '');
                let systolic = initialVitals?.Systolic || '';
                let diastolic = initialVitals?.Diastolic || '';
                if (!systolic && !diastolic && initialVitals?.bloodPressure) {
                    const bpParts = String(initialVitals.bloodPressure).split('/');
                    if (bpParts.length === 2) {
                        systolic = bpParts[0].trim();
                        diastolic = bpParts[1].trim();
                    }
                }
                const initialDate = initialVitals?.date ? moment(initialVitals.date, ['YYYY-MM-DD', 'DD MMM YYYY']).format(dateFormat) : moment().format(dateFormat);
                
                // Check if entry exists for this date in API data
                const existingEntry = Array.isArray(vitalsData) && vitalsData.length > 0 
                    ? vitalsData.find(v => v.date === initialDate)
                    : null;
                
                const newEntry = {
                    date: initialDate,
                    dev_unique_id: existingEntry?.dev_unique_id || 0,
                    tcv_id: existingEntry?.tcv_id || 0,
                    tcbc_id: existingEntry?.tcbc_id || 0,
                    temp: initialVitals?.temperature || existingEntry?.temp || '',
                    pres: initialVitals?.pulse || existingEntry?.pres || '',
                    resp_rate: initialVitals?.respRate || existingEntry?.resp_rate || '',
                    systolic: systolic || existingEntry?.systolic || '',
                    diastolic: diastolic || existingEntry?.diastolic || '',
                    spo2: initialVitals?.spo2 || existingEntry?.spo2 || '',
                    height: initialVitals?.height || existingEntry?.height || '',
                    weight: initialVitals?.weight || existingEntry?.weight || '',
                    fib4: initialVitals?.FIB4 || existingEntry?.fib4 || '',
                    waist_circumference: initialVitals?.['Waist Circumference'] || existingEntry?.waist_circumference || '',
                    ofc: initialVitals?.ofc || existingEntry?.ofc || '',
                    bmi: cal.bmi || existingEntry?.bmi || '',
                    bmr: cal.bmr || existingEntry?.bmr || '',
                    bsa: cal.bsa || existingEntry?.bsa || '',
                    general_rbs: initialVitals?.['General RBS'] || existingEntry?.general_rbs || ''
                };
                
                // Merge with other existing vitals, replacing the entry for this date if it exists
                const otherVitals = Array.isArray(vitalsData) && vitalsData.length > 0
                    ? vitalsData.filter(v => v.date !== initialDate)
                    : [];
                const mergedData = [...otherVitals, newEntry];
                setChildVitalsData(mergedData);
                hasInitializedRef.current = true;
            } else if (Array.isArray(vitalsData) && vitalsData.length > 0) {
                setChildVitalsData([...vitalsData]);
                hasInitializedRef.current = true;
            } else {
                let cal = calculate('', '');
                setChildVitalsData([{
                    date: moment().format(dateFormat),
                    dev_unique_id: 0,
                    tcv_id: 0,
                    tcbc_id: 0,
                    temp: '',
                    pres: '',
                    resp_rate: '',
                    systolic: '',
                    diastolic: '',
                    spo2: '',
                    height: '',
                    weight: '',
                    fib4: '',
                    waist_circumference: '',
                    ofc: '',
                    bmi: cal.bmi,
                    bmr: cal.bmr,
                    bsa: cal.bsa,
                    general_rbs: ''
                }]);
                hasInitializedRef.current = true;
            }
        }
    }, [initialVitals, vitalsData]);

    const onChange = useCallback(
        (date, dateString) => {
            const existingIndex = childVitalsData.findIndex(item => item.date === dateString);
            if (existingIndex >= 0) {
                setDateString(dateString);
                return;
            }
            
            // Check if entry exists in API vitals for this date
            const existingApiEntry = Array.isArray(vitalsData) && vitalsData.length > 0
                ? vitalsData.find(v => v.date === dateString)
                : null;
            
            let cal = calculate('', '');
            const growthChartData = measurements?.find((m) => m.date === dateString);
            const { height, weight, bmi, ofc } = growthChartData || {};
            
            // Remove any existing entries for this date to prevent duplicates
            const tempVitals = childVitalsData.filter(item => item.date !== dateString);
            setDateString(dateString);
            
            tempVitals.push({
                date: dateString,
                height: height || existingApiEntry?.height || "",
                weight: weight || existingApiEntry?.weight || "",
                ofc: ofc || existingApiEntry?.ofc || "",
                bmi: bmi || existingApiEntry?.bmi || cal.bmi,
                dev_unique_id: existingApiEntry?.dev_unique_id || 0,
                tcv_id: existingApiEntry?.tcv_id || 0,
                tcbc_id: existingApiEntry?.tcbc_id || 0,
                temp: existingApiEntry?.temp || "",
                pres: existingApiEntry?.pres || "",
                resp_rate: existingApiEntry?.resp_rate || "",
                systolic: existingApiEntry?.systolic || (existingApiEntry?.blood_press ? existingApiEntry.blood_press.split('/')[0] : '') || "",
                diastolic: existingApiEntry?.diastolic || (existingApiEntry?.blood_press ? existingApiEntry.blood_press.split('/')[1] : '') || "",
                spo2: existingApiEntry?.spo2 || "",
                bmr: existingApiEntry?.bmr || cal.bmr,
                bsa: existingApiEntry?.bsa || cal.bsa,
                general_rbs: existingApiEntry?.general_rbs || '',
                fib4: existingApiEntry?.fib4 || "",
                waist_circumference: existingApiEntry?.waist_circumference || ""
            });
            setChildVitalsData([...tempVitals]);
        },
        [childVitalsData, measurements, vitalsData]
    );

    useEffect(() => {
        if (scrollContainerRef.current) {
            // const scrollWidth = scrollContainerRef.current.scrollWidth;
            // scrollContainerRef.current.scrollLeft = scrollWidth;
            const data = childVitalsData.sort((a, b) => new Date(b.date) - new Date(a.date))
            const index = data.findLastIndex(e => e.date == dateString)
            if (index !== -1) {
                inputRef.current[index].focus()
                const scrollWidth = index;
                scrollContainerRef.current.scrollLeft = scrollWidth * 180;
            }
        }
    }, [childVitalsData.length])

    const calculate = (H, W) => {
        var height = 0, weight = 0, bmi = "", bmr = "", bsa = ""

        if (H != '' && H != 0) {
            height = parseFloat(H)
        } else {
            height = 0
        }

        if (W != '' && W != 0) {
            weight = parseFloat(W)
        } else {
            weight = 0
        }

        const calBMI = (weight / height / height) * 10000
        bmi = weight && height ? isFinite(calBMI) ? calBMI.toFixed(2) : '' : '';

        var age = patient_data !== undefined && patient_data.ageYears !== undefined ? patient_data.ageYears : 0
        if (patient_data !== undefined && patient_data.pm_gender == 'Male') {
            const calBMR = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            bmr = weight && height ? isFinite(calBMR) ? calBMR.toFixed(2) : '' : '';
        } else {
            const calBMR = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            bmr = weight && height ? isFinite(calBMR) ? calBMR.toFixed(2) : '' : '';
        }

        const calBSA = Math.sqrt(height * weight / 3600);
        bsa = weight && height ? isFinite(calBSA) ? calBSA.toFixed(2) : '' : '';

        return { bmi: bmi, bmr: bmr, bsa: bsa }
    }

    const convertToRxPadFormat = useCallback((vitalsData) => {
        if (!vitalsData || vitalsData.length === 0) return {};
        const latestVitals = vitalsData.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        return {
            date: latestVitals.date || moment().format('YYYY-MM-DD'),
            temperature: latestVitals.temp || '',
            pulse: latestVitals.pres || '',
            respRate: latestVitals.resp_rate || '',
            Systolic: latestVitals.systolic || '',
            Diastolic: latestVitals.diastolic || '',
            spo2: latestVitals.spo2 || '',
            height: latestVitals.height || '',
            weight: latestVitals.weight || '',
            ofc: latestVitals.ofc || '',
            'General RBS': latestVitals.general_rbs || '',
            FIB4: latestVitals.fib4 || '',
            'Waist Circumference': latestVitals.waist_circumference || '',
            // Combine systolic and diastolic into bloodPressure if both exist
            ...(latestVitals.systolic && latestVitals.diastolic ? {
                bloodPressure: `${latestVitals.systolic}/${latestVitals.diastolic}`
            } : {})
        };
    }, []);

    const onChangeInput = useCallback(
        (value, i, flag) => {
            const updateValue = onlyDecimalFormat(value);
            setChildVitalsData((prev) => {
                const updated = [...prev];
                const currentItem = { ...updated[i] };
                
                if (flag === 1) {
                    currentItem.temp = updateValue;
                } else if (flag === 2) {
                    currentItem.pres = updateValue;
                } else if (flag === 3) {
                    currentItem.resp_rate = updateValue;
                } else if (flag === 4) {
                    currentItem.systolic = updateValue;
                } else if (flag === 5) {
                    currentItem.diastolic = updateValue;
                } else if (flag === 6) {
                    currentItem.spo2 = updateValue;
                } else if (flag === 7) {
                    currentItem.height = updateValue;
                    let cal = calculate(updateValue, currentItem.weight);
                    currentItem.bmi = cal.bmi;
                    currentItem.bmr = cal.bmr;
                    currentItem.bsa = cal.bsa;
                } else if (flag === 8) {
                    currentItem.weight = updateValue;
                    let cal = calculate(currentItem.height, updateValue);
                    currentItem.bmi = cal.bmi;
                    currentItem.bmr = cal.bmr;
                    currentItem.bsa = cal.bsa;
                } else if (flag === 9) {
                    currentItem.ofc = updateValue;
                } else if (flag === 10) {
                    currentItem.general_rbs = updateValue;
                } else if (flag === 11) {
                    currentItem.fib4 = updateValue;
                } else if (flag === 12) {
                    currentItem.waist_circumference = updateValue;
                }
                
                updated[i] = currentItem;
                return updated;
            });
        },
        []
    );

    const onAddUpdateClicked = async () => {
        const clinic_name = getClinicName(profile?.hospital_data);
        window.Moengage.track_event("TP_vitals_updated", {
            clinic_name,
            "patient_number": patient_data?.pm_contact_no,
            "patient_id": patient_data?.patient_unique_id
        });
        
        // Merge entries by date - keep only one entry per date with the most complete data
        const vitalsByDate = {};
        childVitalsData.forEach(vital => {
            const dateKey = vital.date;
            const existing = vitalsByDate[dateKey];
            
            // If no entry exists for this date, or current entry has IDs (from API), use it
            // Otherwise, merge non-empty values
            if (!existing) {
                vitalsByDate[dateKey] = { ...vital };
            } else {
                // Prefer entry with IDs (existing API entry) over new entry
                if ((vital.tcv_id > 0 || vital.tcbc_id > 0) && (existing.tcv_id === 0 && existing.tcbc_id === 0)) {
                    vitalsByDate[dateKey] = { ...vital };
                } else if ((existing.tcv_id > 0 || existing.tcbc_id > 0) && (vital.tcv_id === 0 && vital.tcbc_id === 0)) {
                    // Keep existing, but merge all values from new entry (preserve user edits)
                    Object.keys(vital).forEach(key => {
                        if (key !== 'date' && key !== 'tcv_id' && key !== 'tcbc_id' && key !== 'dev_unique_id') {
                            vitalsByDate[dateKey][key] = vital[key] !== undefined ? vital[key] : existing[key];
                        }
                    });
                } else {
                    // Both have IDs or both don't - merge all values, prefer new entry
                    const merged = { ...existing };
                    Object.keys(vital).forEach(key => {
                        if (key !== 'date' && key !== 'tcv_id' && key !== 'tcbc_id' && key !== 'dev_unique_id') {
                            merged[key] = vital[key] !== undefined ? vital[key] : merged[key];
                        }
                    });
                    vitalsByDate[dateKey] = merged;
                }
            }
        });
        
        const mergedVitalsData = Object.values(vitalsByDate);
        
        const sendData = {
            patient_unique_id: patient_data !== undefined ? patient_data.patient_unique_id : 0,
            pm_pid: patient_data !== undefined ? patient_data.pm_pid : 0,
            pm_id: patient_data !== undefined ? patient_data.pm_id : 0,
            pam_id: patient_data !== undefined && patient_data.pam_id !== undefined ? patient_data.pam_id : 0,
            patient_birth_weight: patientBirthWeight,
            data: mergedVitalsData,
        };
        const action = await dispatch(addUpdateVitals(sendData));
        if ((profile?.dp_name === PAEDIATRICS || profile?.dp_id === NEO_NATOLOGISTS_DP_ID) && patient_data?.ageMonths <= 12 && patient_data?.ageYears === 0) {
          dispatch(
            getPatientBirthWeight({
              patient_unique_id:
                patient_data !== undefined ? patient_data.patient_unique_id : 0,
              pam_id:
                patient_data !== undefined && patient_data.pam_id !== undefined
                  ? patient_data.pam_id
                  : 0,
            })
          );
        }
        if (action.meta.requestStatus === "fulfilled") {
            // Only sync to Rx pad after save succeeds
            if (onVitalsUpdate && mergedVitalsData.length > 0) {
                const vitalsForRxPad = convertToRxPadFormat(mergedVitalsData);
                onVitalsUpdate(vitalsForRxPad);
            }
            handleCollapsed(1);
            handleDrawerVital();
        } else {
            errorMessage(action.error)
        }
    }

    const TABLE_VITALS = useMemo(() => {
        // Deduplicate by date - keep one entry per date
        const vitalsByDate = {};
        childVitalsData.forEach(vital => {
            const dateKey = vital.date;
            const existing = vitalsByDate[dateKey];
            
            // Prefer entry with IDs (from API) or most complete entry
            if (!existing) {
                vitalsByDate[dateKey] = vital;
            } else if ((vital.tcv_id > 0 || vital.tcbc_id > 0) && (existing.tcv_id === 0 && existing.tcbc_id === 0)) {
                vitalsByDate[dateKey] = vital;
            } else if ((existing.tcv_id > 0 || existing.tcbc_id > 0) && (vital.tcv_id === 0 && vital.tcbc_id === 0)) {
                // Keep existing
            } else {
                // Both have IDs or both don't - prefer the one with more data
                const existingDataCount = Object.values(existing).filter(v => v && v !== '' && v !== 0).length;
                const vitalDataCount = Object.values(vital).filter(v => v && v !== '' && v !== 0).length;
                if (vitalDataCount > existingDataCount) {
                    vitalsByDate[dateKey] = vital;
                }
            }
        });
        
        const uniqueVitals = Object.values(vitalsByDate);
        
        return (
            uniqueVitals.length > 0 &&
            uniqueVitals.sort((a, b) => new Date(b.date) - new Date(a.date)).map((item, i) => {
                return (
                    <div key={i} className='vitals-wrap-body w-100 vitals-child-width'>
                        <div className='vitals-head rounded-start-0 w-100'>{moment(item.date).format(showDateFormat)}</div>
                        {isPediatricAccessable && <><div className='vitals-row vitals-row-60 d-flex align-items-center px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.weight} addonAfter={'kgs'} onChange={(e) => onChangeInput(e.target.value, i, 8)} />
                        </div>
                        <div className='vitals-row vitals-row-60 d-flex align-items-center px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.height} addonAfter={'cms'} onChange={(e) => onChangeInput(e.target.value, i, 7)} />
                        </div>
                        {profile?.dp_name === PAEDIATRICS || profile?.dp_id === NEO_NATOLOGISTS_DP_ID || isGowthChartAccessableFromGB ? <div className='vitals-row d-flex align-items-center border-bottom px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.ofc} addonAfter={'cms'} onChange={(e) => onChangeInput(e.target.value, i, 9)} />
                        </div> : null}
                        </>}
                        <div className='vitals-row d-flex align-items-center border-bottom px-2 w-100'>
                            <Input ref={(el) => (inputRef.current[i] = el)} className='inputheight41-group focused' placeholder="Enter" inputMode="numeric" value={item.temp} addonAfter={'Frh'} onChange={(e) => onChangeInput(e.target.value, i, 1)} />
                        </div>
                        <div className='vitals-row d-flex align-items-center border-bottom px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.pres} addonAfter={'/min'} onChange={(e) => onChangeInput(e.target.value, i, 2)} />
                        </div>
                        <div className='vitals-row d-flex align-items-center border-bottom px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.resp_rate} addonAfter={'/min'} onChange={(e) => onChangeInput(e.target.value, i, 3)} />
                        </div>
                        <div className='vitals-row d-flex align-items-center border-bottom px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.systolic} addonAfter={'mmHg'} onChange={(e) => onChangeInput(e.target.value, i, 4)} />
                        </div>
                        <div className='vitals-row d-flex align-items-center border-bottom px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.diastolic} addonAfter={'mmHg'} onChange={(e) => onChangeInput(e.target.value, i, 5)} />
                        </div>
                        <div className='vitals-row d-flex align-items-center border-bottom px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.spo2} addonAfter={'%'} onChange={(e) => onChangeInput(e.target.value, i, 6)} />
                        </div>
                        <div className='vitals-row d-flex align-items-center border-bottom px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.general_rbs} addonAfter={'mg/dl'} onChange={(e) => onChangeInput(e.target.value, i, 10)} />
                        </div>
                         <div className='vitals-row vitals-row-60 d-flex align-items-center px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.fib4} addonAfter={<span style={{ width: "24px" }} />}  onChange={(e) => onChangeInput(e.target.value, i, 11)} />
                        </div>
                        <div className='vitals-row vitals-row-60 d-flex align-items-center px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.waist_circumference} addonAfter={'cms'} onChange={(e) => onChangeInput(e.target.value, i, 12)} />
                        </div>
                        <div className='vitals-row d-flex align-items-center border-bottom px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.ofc} addonAfter={'cms'} onChange={(e) => onChangeInput(e.target.value, i, 9)} />
                        </div>
                        <div className='vitals-row vitals-row-60 d-flex align-items-center px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.height} addonAfter={'cms'} onChange={(e) => onChangeInput(e.target.value, i, 7)} />
                        </div>
                        <div className='vitals-row vitals-row-60 d-flex align-items-center px-2 w-100'>
                            <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" value={item.weight} addonAfter={'kgs'} onChange={(e) => onChangeInput(e.target.value, i, 8)} />
                        </div>
                        <div className='vitals-row vitals-row-40 d-flex align-items-center px-2 w-100'>
                            <div className='fs-14 '>{`${item.bmi != '' ? parseFloat(item.bmi).toFixed(2) : '--'} kg/m²`}</div>
                        </div>
                        <div className='vitals-row vitals-row-40 d-flex align-items-center px-2 w-100'>
                            <div className='fs-14'>{`${item.bmr != '' ? parseFloat(item.bmr).toFixed(2) : '--'} kcals`}</div>
                        </div>
                        <div className='vitals-row vitals-row-40 d-flex align-items-center px-2 w-100'>
                            <div className='fs-14'>{`${item.bsa != '' ? parseFloat(item.bsa).toFixed(2) : '--'} m²`}</div>
                        </div>
                    </div>
                );
            })
        );
    }, [childVitalsData]);

    const disabledDate = (current) => {
        // Can not select days before today and today
        // return current && current > dayjs().endOf("day");
        return current && current >= moment().add(1, 'days').startOf('day');
    };

    return (
        <>
            <Card bordered={false} className="search-modalCard ">
                <div className='modalCard-header h-60 align-items-center justify-content-between d-flex'
                    style={{
                        position: "sticky",
                        top: "0px",
                        zIndex: 2,
                    }}>
                    <div className='align-items-center d-flex'>
                        <Button type="text" className='btn btn-delete-prescription px-3 focus-none h-100' onClick={handleDrawerVital}>
                            <i className='icon-Cross fs-3'></i>
                        </Button>
                        <div className="modal-title">Vitals</div>
                    </div>
                    <Button onClick={onAddUpdateClicked} className='btn btn-primary3 btn-41 px-4 me-20' loading={loading} disabled={childVitalsData.length > 0 ? false : true}>
                        Done
                    </Button>
                </div>
                <div className="align-items-center d-flex justify-content-between px-20 py-3">
                    {(profile?.dp_name === PAEDIATRICS || profile?.dp_id === NEO_NATOLOGISTS_DP_ID) && patient_data?.ageMonths <= 12 && patient_data?.ageYears === 0 ? (
                        <div className="vitals-wrapper">
                            <div className='vitals-row d-flex align-items-center px-2'>
                                Patient’s birth weight
                            </div>
                            <div className='vitals-row d-flex align-items-center px-2'>
                                <Input className='inputheight41-group' placeholder="Enter" inputMode="numeric" maxLength={5} value={patientBirthWeight} addonAfter={'kgs'} onChange={(e) => setPatientBirthWeight(onlyDecimalFormat(e.target.value))} />
                            </div>
                        </div>
                    ) : null}
                    <div className="position-relative">
                        <Button className="btn btn-primary2 btn-41">Add New Date</Button>
                        <DatePicker
                            key={Math.random()}
                            suffixIcon={null}
                            inputReadOnly
                            onChange={(date, dateString) => onChange(date, dateString)}
                            disabledDate={disabledDate}
                            className="calender-labparams"
                        />
                    </div>
                </div>
                {childVitalsData.length > 0 && (
                    <div className='px-20' style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                        <div className='vitals-wrapper w-100'>
                            <div className='vitals-wrap-body vitals-parent-width'>
                                <div className='vitals-head'>Name</div>
                                {isPediatricAccessable && (
                                    <>
                                <div className='vitals-row vitals-row-60 d-flex align-items-center px-2'>
                                    Weight
                                </div>
                                <div className='vitals-row vitals-row-60 d-flex align-items-center px-2'>
                                    Height
                                </div>
                                {profile?.dp_name === PAEDIATRICS || profile?.dp_id === NEO_NATOLOGISTS_DP_ID || isGowthChartAccessableFromGB ? <div className='vitals-row d-flex align-items-center border-bottom px-2'>
                                    OFC
                                </div> : null} </>)}
                                <div className='vitals-row d-flex align-items-center border-bottom px-2'>
                                    Temperature
                                </div>
                                <div className='vitals-row d-flex align-items-center border-bottom px-2'>
                                    Pulse
                                </div>
                                <div className='vitals-row d-flex align-items-center border-bottom px-2'>
                                    Resp. Rate
                                </div>
                                <div className='vitals-row d-flex align-items-center border-bottom px-2'>
                                    Systolic
                                </div>
                                <div className='vitals-row d-flex align-items-center border-bottom px-2'>
                                    Diastolic
                                </div>
                                <div className='vitals-row d-flex align-items-center border-bottom px-2'>
                                    SPO2
                                </div>
                                <div className='vitals-row d-flex align-items-center border-bottom px-2'>
                                    General RBS
                                </div>
                                 <div className='vitals-row vitals-row-60 d-flex align-items-center px-2'>
                                    FIB4
                                </div>
                                 <div className='vitals-row vitals-row-60 d-flex align-items-center px-2'>
                                    Waist Circumference
                                </div>
                                <div className='vitals-row d-flex align-items-center border-bottom px-2'>
                                    OFC
                                </div>
                                <div className='vitals-row vitals-row-60 d-flex align-items-center px-2'>
                                    Height
                                </div>
                                <div className='vitals-row vitals-row-60 d-flex align-items-center px-2'>
                                    Weight
                                </div>
                                <div className='vitals-row vitals-row-40 d-flex align-items-center px-2'>
                                    BMI
                                    <Tooltip placement="right" title="Body mass index will be auto-calculated by entering Height and Weight">
                                        <i className='icon-info ms-1'></i>
                                    </Tooltip>
                                </div>
                                <div className='vitals-row vitals-row-40 d-flex align-items-center px-2'>
                                    BMR
                                    <Tooltip placement="right" title="Basal metabolic rate will be auto-calculated by entering Height and Weight">
                                        <i className='icon-info ms-1'></i>
                                    </Tooltip>
                                </div>
                                <div className='vitals-row vitals-row-40 d-flex align-items-center px-2'>
                                    BSA
                                    <Tooltip placement="right" title="Body surface area will be auto-calculated by entering Height and Weight">
                                        <i className='icon-info ms-1'></i>
                                    </Tooltip>
                                </div>
                            </div>
                            <div ref={scrollContainerRef} className='d-flex overflow-x-auto scrollvitals w-100'>
                                {TABLE_VITALS}
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </>
    );
}


export default React.memo(VitalsBox);