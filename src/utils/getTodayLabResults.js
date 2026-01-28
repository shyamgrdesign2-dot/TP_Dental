import moment from 'moment';
import { env } from '../EnvironmentConfig';
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from './constants';

/**
 * Fetches today's lab results from lab parameters API and returns formatted lab results
 * @param {Object} patient_data - Patient data object
 * @returns {Promise<Array|null>} Formatted lab results array or null if not found
 */
export const getTodayLabResults = async (patient_data) => {
  if (!patient_data?.patient_unique_id) return null;
  
  try {
    const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
    const cleanedToken = token ? token.replace(/['"]+/g, '') : '';
    const baseUrl = env.lab_params_api_url;
    
    if (!cleanedToken || !baseUrl) return null;
    
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
    
    if (allResults.length === 0) return null;
    
    const today = moment().format('YYYY-MM-DD');
    const todayResults = allResults.filter(result => {
      const resultDate = result.createdAt || result.created_at || result.createdDate || result.date;
      return resultDate && moment(resultDate).format('YYYY-MM-DD') === today;
    });
    
    if (todayResults.length === 0) return null;
    
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
        // Check if value already contains units to avoid duplication
        let displayValue = value;
        if (units && !value.toLowerCase().includes(units.toLowerCase())) {
          displayValue = `${value} ${units}`.trim();
        }
        formattedResults.push({
          testname: input.testName,
          value: displayValue,
        });
        seenTests.add(testKey);
      });
    });
    
    return formattedResults.length > 0 ? formattedResults : null;
  } catch (error) {
    console.error('Error fetching today lab results:', error);
    return null;
  }
};
