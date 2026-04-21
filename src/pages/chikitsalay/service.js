import api from "../../api/services/axiosService";
import config from "../../config";

const baseUrl = { customBaseUrl: config.chikitsalay_api_url };

export const clinicTargetStatus = async function (appointmentId, payload) {
    let res = {};
    try {
      res = await api.post(`/api/v1/bookings/${appointmentId}/advance`, payload, baseUrl);
    } catch (e) {
      console.error("Error while updating clinic target status: ", e);
    }
    return res;
};