import api from "./axiosService";
import config from "../../config";
import { getDecodedToken } from "../../utils/localStorage";

const templateBaseUrl = { customBaseUrl: config.templates_api_url };

const normalizeTemplate = (template = {}) => {
  return {
    tsl_id:
      template.tsl_id ??
      template.tat_id ??
      template.id ??
      template._id ??
      null,
    tsl_template_name:
      template.tsl_template_name ??
      template.tat_template_name ??
      template.title ??
      template.name ??
      "",
    slitLampExamination:
      template.slitLampExamination ??
      template.entries ??
      template.advices ??
      template.items ??
      [],
  };
};

const getDoctorId = () => {
  const decoded = getDecodedToken();
  const result = decoded?.result || {};
  return result.user_id || result.doctor_unique_id || result.doctorId || "";
};

const buildTemplatePayload = (payload = {}) => ({
  module: "slit-lamp",
  site: "opd",
  isMaster: false,
  title: payload.tsl_template_name || "",
  entries: payload.slitLampExamination ?? [],
});

const ApiSlitLampTemplates = {
  addTemplate(template) {
    const doctorId = getDoctorId();
    const params = new URLSearchParams();
    if (doctorId) {
      params.set("doctorId", doctorId);
    }
    return api.post(
      `/api/v1/templates?${params.toString()}`,
      buildTemplatePayload(template),
      templateBaseUrl
    );
  },
  updateTemplate(template) {
    const doctorId = getDoctorId();
    const params = new URLSearchParams();
    if (template?.tsl_id) {
      params.set("_id", template.tsl_id);
    }
    if (doctorId) {
      params.set("doctorId", doctorId);
    }
    return api.put(
      `/api/v1/templates?${params.toString()}`,
      buildTemplatePayload(template),
      templateBaseUrl
    );
  },
  deleteTemplate(templateId) {
    const doctorId = getDoctorId();
    const params = new URLSearchParams();
    if (templateId) {
      params.set("_id", templateId);
    }
    if (doctorId) {
      params.set("doctorId", doctorId);
    }
    return api.delete(
      `/api/v1/templates?${params.toString()}`,
      templateBaseUrl
    );
  },
  listTemplates() {
    const params = new URLSearchParams({
      moduleName: "slit-lamp",
      site: "opd",
      isMaster: "false",
    });
    return api.get(`/api/v1/templates/via-module-name?${params.toString()}`, templateBaseUrl);
  },
  normalizeTemplate,
  normalizeTemplates(templates = []) {
    return templates.map(normalizeTemplate);
  },
};

export default ApiSlitLampTemplates;
