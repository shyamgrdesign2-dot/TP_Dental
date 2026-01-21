import moment from 'moment';
import ApiVitals from '../api/services/ApiVitals';
import { enrichVitalsWithCalculations } from './vitalsCalculations';

/**
 * Fetches today's vitals from listVitals API and returns formatted vitals
 * @param {Object} patient_data - Patient data object
 * @returns {Promise<Object|null>} Formatted vitals object or null if not found
 */
export const getTodayVitals = async (patient_data) => {
  if (!patient_data?.patient_unique_id) return null;
  
  try {
    const vitalsResp = await ApiVitals.getVitals({
      patient_unique_id: patient_data.patient_unique_id,
      pam_id: patient_data.pam_id || 0,
      mode: 'ADD',
      pm_pid: patient_data.pm_pid || '',
      pm_id: patient_data.pm_id || 0
    });
    
    if (vitalsResp?.status && Array.isArray(vitalsResp.data) && vitalsResp.data.length > 0) {
      const today = moment().format('YYYY-MM-DD');
      const todayVitals = vitalsResp.data.find(v => {
        const vitalDate = v.createdAt || v.created_at || v.createdDate || v.date;
        return vitalDate && moment(vitalDate).format('YYYY-MM-DD') === today;
      });
      
      if (todayVitals) {
        const patientInfo = patient_data ? {
          age: patient_data.ageYears || patient_data.age || patient_data.pm_age,
          gender: patient_data.pm_gender || patient_data.gender
        } : {};
        
        // Extract systolic and diastolic from blood_press if needed
        let systolic = todayVitals.systolic || '';
        let diastolic = todayVitals.diastolic || '';
        let blood_press = todayVitals.blood_press || '';
        
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
        
        const formattedVitals = {
          date: today,
          temperature: String(todayVitals.temp || '').trim(),
          pulse: String(todayVitals.pres || '').trim(),
          respRate: String(todayVitals.resp_rate || '').trim(),
          Systolic: String(systolic).trim(),
          Diastolic: String(diastolic).trim(),
          spo2: String(todayVitals.spo2 || '').trim(),
          'General RBS': String(todayVitals.general_rbs || '').trim(),
          FIB4: String(todayVitals.fib4 || '').trim(),
          'Waist Circumference': String(todayVitals.waist_circumference || '').trim(),
          ofc: String(todayVitals.ofc || '').trim(),
          height: String(todayVitals.height || '').trim(),
          weight: String(todayVitals.weight || '').trim(),
          BMI: String(todayVitals.bmi || '').trim(),
          BMR: String(todayVitals.bmr || '').trim(),
          BSA: String(todayVitals.bsa || '').trim(),
          bloodPressure: String(blood_press).trim()
        };
        
        const enrichedVitals = enrichVitalsWithCalculations(formattedVitals, patientInfo);
        return enrichedVitals;
      }
    }
  } catch (error) {
    console.error('Error fetching today vitals:', error);
  }
  
  return null;
};
