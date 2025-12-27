import api from "./axiosService";
import config from "../../config";

const baseUrl = { customBaseUrl: config.vaccination_api_url };

const ApiCustomModule = {};

ApiCustomModule.addModule = function (template) {
  return api.post(`/dynamicmodules/user_modules`, template, baseUrl);
};

ApiCustomModule.getModules = function (userId) {
  return api.get(`/dynamicmodules/user_modules/${userId}`, baseUrl);
};

ApiCustomModule.getModuleContents = function (tcmId) {
  return api.get(`/dynamicmodules/user_modules_rx/${tcmId}`, baseUrl);
};

ApiCustomModule.searchModule = function (moduleId, keyword) {
  return api.get(
    `/dynamicmodules/user_modules_rx/search?module_id=${moduleId}${
      keyword ? `&keyword=${keyword}` : ""
    }`,
    baseUrl
  );
};

ApiCustomModule.userPreModulesRX = function (data) {
  return api.post(`/dynamicmodules/user_pre_modules_rx`, data, baseUrl);
};

/**
 * Search user modules by hospital ID with optional module name filtering
 * @param {String} hospitalId - Hospital ID to search modules for (required)
 * @param {String} moduleName - Keyword to filter modules by name (optional)
 * @param {Number} page - Page number for pagination (optional, default: 1)
 * @param {Number} limit - Number of results per page (optional, default: 20, max: 100)
 * @returns {Promise} Returns paginated modules with pagination metadata
 */
ApiCustomModule.searchModulesByHospital = function (
  hospitalId,
  moduleName,
  page,
  limit
) {
  const params = new URLSearchParams();
  params.append("hospitalId", hospitalId);
  if (moduleName) {
    params.append("moduleName", moduleName);
  }
  if (page) {
    params.append("page", page.toString());
  }
  if (limit) {
    params.append("limit", limit.toString());
  }
  return api.get(
    `/dynamicmodules/user_modules/search?${params.toString()}`,
    baseUrl
  );
};

/**
 * Migrate a V1 module to V2
 * @param {String} userId - User ID
 * @param {String} moduleId - Module ID to migrate
 * @param {Object} migrationData - Optional migration configuration
 * @param {Array<String>} migrationData.fieldNames - Field names to migrate
 * @param {Object} migrationData.fieldLabels - Field labels mapping
 * @param {Object} migrationData.fieldTypes - Field types mapping
 * @returns {Promise} Returns the migrated V2 module
 */
ApiCustomModule.migrateModule = function (userId, moduleId, migrationData) {
  return api.post(
    `/dynamicmodules/user_modules/migrate/${userId}/${moduleId}`,
    migrationData || {},
    baseUrl
  );
};

export default ApiCustomModule;
