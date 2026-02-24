import config from "../../config";
import api from "./axiosService";

const TELECONSULT_BASE_URL = config.visit_api_url;

const baseUrl = { customBaseUrl: TELECONSULT_BASE_URL };

const ApiTeleconsult = {};

ApiTeleconsult.getHasVideoSlots = function (doctorId) {
  return api.get(`/api/v1/teleconsult/has-video-slots?doctorId=${doctorId}`, baseUrl);
};

ApiTeleconsult.getSlots = function (doctorId, date) {
  return api.get(
    `/api/v1/appointment/listSlots?doctorId=${doctorId}&date=${date}&pam_status_type_appointment=2`,
    baseUrl
  );
};


ApiTeleconsult.checkVideoAvailability = function (appointmentId) {
  return api.get(
    `/api/v1/teleconsult/check-video-availability?appointmentId=${appointmentId}`,
    baseUrl
  );
};


ApiTeleconsult.createAppointment = function (body) {
  return api.post("/api/v1/appointment", body, baseUrl);
};

export default ApiTeleconsult;
