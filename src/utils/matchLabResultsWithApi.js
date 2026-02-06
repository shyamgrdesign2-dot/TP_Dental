import moment from 'moment';
import { env } from '../EnvironmentConfig';
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from './constants';

const normalizeTestName = (testName) => {
  return (testName || '').toLowerCase().trim();
};

const fetchExistingLabResults = async (patientId, cleanedToken, baseUrl) => {
  if (!patientId || !cleanedToken || !baseUrl) return [];
  
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/lab-parameters/results/${patientId}`,
      {
        headers: {
          'Authorization': `Bearer ${cleanedToken}`,
        },
      }
    );
    
    const labData = await response.json();
    return labData?.data?.results || [];
  } catch (error) {
    return [];
  }
};

const mergeWithExistingResults = (newResults, existingResults) => {
  if (!Array.isArray(existingResults) || existingResults.length === 0) {
    return newResults;
  }

  const existingMap = new Map();
  existingResults.forEach(result => {
    const resultDate = result.date || result.createdAt || result.created_at || result.createdDate;
    if (!resultDate) return;
    
    const dateKey = moment(resultDate).format('YYYY-MM-DD');
    (result.inputs || []).forEach(input => {
      if (!input?.testName || input.testName === 'Remarks') return;
      const testKey = normalizeTestName(input.testName);
      const mapKey = `${dateKey}|${testKey}`;
      
      if (!existingMap.has(mapKey)) {
        existingMap.set(mapKey, {
          date: dateKey,
          testName: input.testName,
          value: input.value || '',
          units: input.units || '',
          reportName: result.reportName || '',
          refRange: input.refRange || '',
        });
      }
    });
  });

  const mergedResults = [];

  newResults.forEach(newResult => {
    const testName = (newResult.testname || newResult.testName || newResult.name || '').trim();
    if (!testName) {
      mergedResults.push(newResult);
      return;
    }

    const dateKey = newResult.date || moment().format('YYYY-MM-DD');
    const normalizedTestName = normalizeTestName(testName);
    const mapKey = `${dateKey}|${normalizedTestName}`;
    
    if (existingMap.has(mapKey)) {
      const existing = existingMap.get(mapKey);
      mergedResults.push({
        ...newResult,
        testname: existing.testName,
        testName: existing.testName,
        name: existing.testName,
        date: dateKey,
        reportName: newResult.reportName || existing.reportName || '',
        units: newResult.units || existing.units || '',
        refRange: newResult.refRange || existing.refRange || '',
      });
    } else {
      mergedResults.push({
        ...newResult,
        date: dateKey,
      });
    }
  });

  return mergedResults;
};

export const matchLabResultsWithApi = async (labResults = [], patient_data = null) => {
  if (!Array.isArray(labResults) || labResults.length === 0) {
    return labResults;
  }

  try {
    const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
    const cleanedToken = token ? token.replace(/['"]+/g, '') : '';
    const baseUrl = env.lab_params_api_url;
    
    if (!cleanedToken || !baseUrl) {
      return labResults;
    }

    let existingResults = [];
    if (patient_data?.patient_unique_id) {
      existingResults = await fetchExistingLabResults(
        patient_data.patient_unique_id,
        cleanedToken,
        baseUrl
      );
    }

    const matchedResults = await Promise.all(
      labResults.map(async (result) => {
        const testName = (result.testname || result.testName || result.name || '').trim();
        if (!testName) {
          return result;
        }

        try {
          const searchQuery = encodeURIComponent(testName);
          const response = await fetch(
            `${baseUrl}/api/v1/lab-parameters?search=${searchQuery}`,
            {
              headers: {
                'Authorization': `Bearer ${cleanedToken}`,
              },
            }
          );

          const searchData = await response.json();
          
          if (searchData?.data && Array.isArray(searchData.data) && searchData.data.length > 0) {
            const matchedTest = searchData.data[0];
            return {
              ...result,
              testname: matchedTest.testName || matchedTest.name || testName,
              name: matchedTest.testName || matchedTest.name || testName,
              reportName: matchedTest.reportName || result.reportName || '',
              units: matchedTest.units || result.units || '',
              refRange: matchedTest.refRange || result.refRange || null,
            };
          }
        } catch (error) {
        }

        return result;
      })
    );

    if (existingResults.length > 0) {
      return mergeWithExistingResults(matchedResults, existingResults);
    }

    return matchedResults;
  } catch (error) {
    return labResults;
  }
};
