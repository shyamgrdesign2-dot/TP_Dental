import { env } from '../EnvironmentConfig';
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from './constants';

const findBestMatchFromApiResults = (searchQuery, apiResults) => {
  if (!Array.isArray(apiResults) || apiResults.length === 0) {
    return null;
  }
  return apiResults[0];
};

const apiCache = new Map();

export const matchLabResultsWithApi = async (labResults = [], patient_data = null) => {
  if (!Array.isArray(labResults) || labResults.length === 0) {
    return [];
  }

  try {
    const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
    const cleanedToken = token ? token.replace(/['"]+/g, '') : '';
    const baseUrl = env.lab_params_api_url;

    if (!cleanedToken || !baseUrl) {
      return [];
    }

    const matchedResults = [];

    for (const result of labResults) {
      const originalTestName = (result.testname || result.testName || result.name || '').trim();
      if (!originalTestName) {
        continue;
      }

      try {
        let matchedTest = null;
        const cacheKey = originalTestName.toLowerCase();

        if (apiCache.has(cacheKey)) {
          matchedTest = apiCache.get(cacheKey);
        } else {
          const searchQuery = encodeURIComponent(originalTestName);
          const response = await fetch(
            `${baseUrl}/api/v1/lab-parameters?search=${searchQuery}`,
            {
              headers: {
                'Authorization': `Bearer ${cleanedToken}`,
              },
            }
          );

          if (response.ok) {
            const searchData = await response.json();
            const apiResults = Array.isArray(searchData) ? searchData : (searchData?.data || []);

            if (Array.isArray(apiResults) && apiResults.length > 0) {
              matchedTest = findBestMatchFromApiResults(originalTestName, apiResults);
              if (matchedTest) {
                apiCache.set(cacheKey, matchedTest);
              }
            }
          }
        }

        if (matchedTest && matchedTest.testName && matchedTest.reportName) {
          const apiTestName = matchedTest.testName.trim();
          const apiReportName = matchedTest.reportName.trim();
          const originalValue = result.value || result.testValue || '';

          matchedResults.push({
            ...result,
            testname: apiTestName,
            testName: apiTestName,
            name: apiTestName,
            reportName: apiReportName,
            value: originalValue,
            units: matchedTest.units || result.units || '',
            refRange: matchedTest.refRange || result.refRange || null,
          });
        }
      } catch (error) {
      }
    }

    return matchedResults;
  } catch (error) {
    return [];
  }
};
