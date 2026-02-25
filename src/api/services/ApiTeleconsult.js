import config from "../../config";
import api from "./axiosService";

const TELECONSULT_BASE_URL = config.visit_api_url;

const baseUrl = { customBaseUrl: TELECONSULT_BASE_URL };

const ApiTeleconsult = {};

ApiTeleconsult.getHasVideoSlots = function (doctorId, hmId) {
  const params = new URLSearchParams();
  if (doctorId != null && doctorId !== "") params.set("doctorId", String(doctorId));
  if (hmId != null && hmId !== "") params.set("hm_id", String(hmId));
  const query = params.toString();
  return api.get(`/api/v1/teleconsult/has-video-slots${query ? `?${query}` : ""}`, baseUrl);
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

export default ApiTeleconsult;
