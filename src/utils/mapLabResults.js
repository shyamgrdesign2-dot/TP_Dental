import { DEFAULT_TESTS_DATA } from './labParamsConstants';

const levenshteinDistance = (str1 = "", str2 = "") => {
  if (!str1 || !str2) return Infinity;
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
};

// Normalize plural/singular forms
const normalizePlural = (word = "") => {
  if (!word) return word;
  const lower = word.toLowerCase();
  if (lower.endsWith("ies")) {
    return lower.slice(0, -3) + "y";
  }
  if (lower.endsWith("es") && lower.length > 3) {
    return lower.slice(0, -2);
  }
  if (lower.endsWith("s") && lower.length > 2) {
    return lower.slice(0, -1);
  }
  return lower;
};

// Enhanced normalization
const normalizeTestNameAdvanced = (name = "") => {
  if (!name) return null;
  let cleaned = String(name).replace(/\([^)]*\)/g, "").trim();
  cleaned = cleaned
    .toLowerCase()
    .replace(/haem/g, "hem")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = cleaned.split(/\s+/).filter(w => w.length > 0).map(w => normalizePlural(w));
  const normalizedWordsSorted = [...words].sort();
  return {
    normalized: normalizedWordsSorted.join(""),
    words,
  };
};

// Normalize test name
const normalizeTestName = (name = "") => {
  if (!name) return "";
  return String(name)
    .toLowerCase()
    .replace(/haem/g, "hem")
    .replace(/[^a-z0-9]/g, "")
    .trim();
};

// Get normalized variants
const getNormalizedVariants = (name = "") => {
  const variants = new Set();
  if (!name) return variants;
  const normalized = normalizeTestName(name);
  if (normalized) variants.add(normalized);
  const advanced = normalizeTestNameAdvanced(name);
  if (advanced && advanced.normalized) {
    variants.add(advanced.normalized);
    if (Array.isArray(advanced.words) && advanced.words.length > 0) {
      const acronym = advanced.words.map((w) => w[0]).join("");
      if (acronym) variants.add(acronym);
    }
  }
  return variants;
};

// Find best match using fuzzy matching
const findBestMatch = (inputName = "", testLookup = {}, defaultTestData = []) => {
  if (!inputName || !defaultTestData || defaultTestData.length === 0) {
    return null;
  }
  
  const variants = Array.from(getNormalizedVariants(inputName));
  for (const variantKey of variants) {
    if (testLookup[variantKey]) {
      return testLookup[variantKey];
    }
  }
  
  const inputNormalized = normalizeTestNameAdvanced(inputName);
  if (!inputNormalized || !inputNormalized.normalized) {
    return null;
  }
  
  let bestMatch = null;
  let bestScore = Infinity;
  const maxDistance = Math.max(3, Math.floor(inputNormalized.normalized.length * 0.3));
  
  for (const test of defaultTestData) {
    const testName = test?.testName || "";
    if (!testName) continue;
    
    const testNormalized = normalizeTestNameAdvanced(testName);
    if (!testNormalized || !testNormalized.normalized) continue;
    
    const distance = levenshteinDistance(inputNormalized.normalized, testNormalized.normalized);
    const inputWords = inputNormalized.words || [];
    const testWords = testNormalized.words || [];
    const commonWords = inputWords.filter(w => testWords.includes(w));
    const wordMatchScore = inputWords.length + testWords.length - (commonWords.length * 2);
    const combinedScore = distance + wordMatchScore;
    
    if (combinedScore < bestScore && combinedScore <= maxDistance) {
      bestScore = combinedScore;
      bestMatch = test;
    }
  }
  
  return bestMatch;
};

// Build test lookup from DEFAULT_TESTS_DATA
const buildTestLookup = (defaultTestData = []) => {
  const lookup = {};
  defaultTestData.forEach((test) => {
    const testName = test?.testName || "";
    if (!testName) return;
    const variants = getNormalizedVariants(testName);
    variants.forEach((variant) => {
      if (!lookup[variant]) {
        lookup[variant] = test;
      }
    });
  });
  return lookup;
};

// Map a single lab result to standardized format
const mapLabResult = (result = {}, testLookup = {}, defaultTestData = []) => {
  const rawTestName = (result?.testname || result?.testName || result?.name || "").trim();
  if (!rawTestName) {
    return result;
  }

  const variants = Array.from(getNormalizedVariants(rawTestName));
  let matchedTest = variants
    .map((variantKey) => testLookup[variantKey])
    .find(Boolean);
  
  if (!matchedTest) {
    matchedTest = findBestMatch(rawTestName, testLookup, defaultTestData);
  }
  
  if (!matchedTest) {
    return result;
  }

  // Extract value and units
  const rawValue = result?.value !== undefined ? String(result.value).trim() : "";
  let cleanValue = rawValue;
  let cleanUnits = result?.units || "";
  
  // Extract units from value if not present (e.g., "23 mg/dl" -> value: "23", units: "mg/dl")
  if (rawValue && !cleanUnits) {
    const parts = rawValue.trim().split(/\s+/);
    if (parts.length > 1) {
      cleanValue = parts.slice(0, -1).join(" ");
      cleanUnits = parts[parts.length - 1];
    }
  }

  return {
    ...result,
    testname: matchedTest.testName,
    name: matchedTest.testName,
    reportName: matchedTest.reportName || result.reportName || "",
    units: matchedTest.units || cleanUnits || result.units || "",
    refRange: matchedTest.refRange || result.refRange || null,
  };
};

// Map lab results array to standardized format
export const mapLabResultsToStandardized = (labResults = []) => {
  if (!Array.isArray(labResults) || labResults.length === 0) {
    return labResults;
  }

  const testLookup = buildTestLookup(DEFAULT_TESTS_DATA);
  
  return labResults.map((result) => {
    return mapLabResult(result, testLookup, DEFAULT_TESTS_DATA);
  });
};

