import moment from 'moment';
import ApiVitals from '../api/services/ApiVitals';
import { enrichVitalsWithCalculations } from './vitalsCalculations';
import { env } from '../EnvironmentConfig';
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from './constants';

// Track ongoing requests to prevent duplicate calls
const ongoingRequests = new Map();
const loadedDataCache = new Map();

/**
 * Loads today's vitals and lab results for a patient and updates the state
 * @param {Object} params
 * @param {Object} params.patient_data - Patient data object
 * @param {Function} params.setState - State setter function (setPrescriptionData or setData)
 * @returns {Promise<void>}
 */
export const loadTodayVitalsAndLabResults = async ({ patient_data, setState }) => {
  if (!patient_data?.patient_unique_id) return;
  
  const patientId = patient_data.patient_unique_id;
  const today = moment().format('YYYY-MM-DD');
  const cacheKey = `${patientId}_${today}`;
  

  if (loadedDataCache.has(cacheKey)) return;
  if (ongoingRequests.has(cacheKey)) await ongoingRequests.get(cacheKey);
  
  const requestPromise = (async () => {
    try {
      // Load today's vitals
      try {
        const vitalsResp = await ApiVitals.getVitals({
          patient_unique_id: patient_data.patient_unique_id,
          pam_id: patient_data.pam_id || 0,
          mode: 'ADD',
          pm_pid: patient_data.pm_pid || '',
          pm_id: patient_data.pm_id || 0
        });
        
        if (vitalsResp?.status && Array.isArray(vitalsResp.data) && vitalsResp.data.length > 0) {
          const todayVitals = vitalsResp.data.find(v => {
            const vitalDate = v.createdAt || v.created_at || v.createdDate || v.date;
            return vitalDate && moment(vitalDate).format('YYYY-MM-DD') === today;
          });
          
          if (todayVitals) {
            const patientInfo = patient_data ? {
              age: patient_data.ageYears || patient_data.age || patient_data.pm_age,
              gender: patient_data.pm_gender || patient_data.gender
            } : {};
            
            const formattedVitals = {
              date: today,
              temperature: todayVitals.temp || '',
              pulse: todayVitals.pres || '',
              respRate: todayVitals.resp_rate || '',
              Systolic: todayVitals.systolic || '',
              Diastolic: todayVitals.diastolic || '',
              spo2: todayVitals.spo2 || '',
              'General RBS': todayVitals.general_rbs || '',
              FIB4: todayVitals.fib4 || '',
              'Waist Circumference': todayVitals.waist_circumference || '',
              ofc: todayVitals.ofc || '',
              height: todayVitals.height || '',
              weight: todayVitals.weight || '',
              BMI: todayVitals.bmi || '',
              BMR: todayVitals.bmr || '',
              BSA: todayVitals.bsa || '',
              bloodPressure: todayVitals.blood_press || ''
            };
            
            const enrichedVitals = enrichVitalsWithCalculations(formattedVitals, patientInfo);
            
            setState(prev => {
              const existing = prev?.vitalsAndBodyComposition || {};
              const hasData = Object.keys(existing).length > 0 && 
                Object.values(existing).some(v => String(v || '').trim() !== '' && String(v).trim() !== 'undefined' && String(v).trim() !== 'null');
              if (hasData) return prev;
              return { ...prev, vitalsAndBodyComposition: enrichedVitals };
            });
          }
        }
      } catch (error) {
        console.error('Error fetching vitals:', error);
      }
      
      // Load today's lab results
      try {
        const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
        const cleanedToken = token ? token.replace(/['"]+/g, '') : '';
        const baseUrl = env.lab_params_api_url;
        
        if (cleanedToken && baseUrl) {
          const response = await fetch(
            `${baseUrl}/api/v1/lab-parameters/results/${patient_data.patient_unique_id}`,
            {
              headers: {
                'Authorization': `Bearer ${cleanedToken}`,
              },
            }
          );
          
          const labData = await response.json();
          const allResults = labData?.data?.results || [];
          
          if (allResults.length > 0) {
            const todayResults = allResults.filter(result => {
              const resultDate = result.createdAt || result.created_at || result.createdDate || result.date;
              return resultDate && moment(resultDate).format('YYYY-MM-DD') === today;
            });
            
            if (todayResults.length > 0) {
              const formattedResults = [];
              const seenTests = new Set();
              
              todayResults.forEach(result => {
                (result.inputs || []).forEach(input => {
                  if (!input?.testName || input.testName === "Remarks") return;
                  
                  const testKey = `${input.testName}`.toLowerCase().trim();
                  if (seenTests.has(testKey)) return;
                  
                  const value = input.value !== undefined ? String(input.value).trim() : "";
                  if (!value) return;
                  
                  const units = input.units?.trim();
                  const displayValue = units ? `${value} ${units}`.trim() : value;
                  formattedResults.push({
                    testname: input.testName,
                    value: displayValue,
                  });
                  seenTests.add(testKey);
                });
              });
              
              if (formattedResults.length > 0) {
                setState(prev => {
                  const existing = prev?.labResults || [];
                  const hasData = Array.isArray(existing) && existing.length > 0 && 
                    existing.some(r => {
                      const testname = (r.testname || r.name || '').trim();
                      const value = (r.value || '').trim();
                      return testname !== '' && value !== '' && value !== 'undefined' && value !== 'null';
                    });
                  if (hasData) return prev;
                  return { ...prev, labResults: formattedResults };
                });
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching lab results:', error);
      }
    } catch (error) {
      console.error('Error in loadTodayVitalsAndLabResults:', error);
    } finally {
      loadedDataCache.set(cacheKey, true);
      ongoingRequests.delete(cacheKey);
    }
  })();
  ongoingRequests.set(cacheKey, requestPromise);
  await requestPromise;
};
