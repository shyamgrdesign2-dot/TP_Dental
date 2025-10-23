import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from "../../utils/constants";
import { env } from "../../EnvironmentConfig";

const getBaseUrl = () => {
  return env.visit_api_url || "https://pm-visit-integration-uat.tatvacare.in";
};

const getAuthToken = () => {
  const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
  return token ? token.replace(/['"]+/g, "") : "";
};

const ApiVideoConsult = {};

/**
 * Initiate a tele-consultation call
 * @param {number} appointmentId - The appointment ID (pam_id)
 * @returns {Promise} Response containing callJoinUrlForDoctor and action type
 */
ApiVideoConsult.initiateTeleCall = async function (appointmentId) {
  try {
    const response = await fetch(`${getBaseUrl()}/api/v1/teleconsult/initiate-tele-call`, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointmentId: appointmentId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Failed to initiate call: ${response.status}`;
      return { error: errorMessage, status: response.status };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error initiating tele-call:", error);
    return { error: error.message || "Network error", data: null };
  }
};

/**
 * Get appointment status type
 * @param {number} tcmId - The consultation ID (tcm_id)
 * @returns {Promise} Response containing pam_id and pam_status_type_appointment
 */
ApiVideoConsult.getAppointmentStatus = async function (tcmId) {
  if (!tcmId) {
    return { error: "Invalid tcmId", data: null };
  }

  try {
    const response = await fetch(`${getBaseUrl()}/api/v1/appointment-status-type/${tcmId}`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${getAuthToken()}`,
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Failed to fetch status: ${response.status}`;
      return { error: errorMessage, data: null };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching appointment status:", error);
    return { error: error.message || "Network error", data: null };
  }
};

export default ApiVideoConsult;