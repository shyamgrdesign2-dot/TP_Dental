import api from "./axiosService";
import config from "../../config";
import { neoDebug, neoDebugError } from "../../utils/neoConsultationUtils";

const neoBackendConfig = {
  customBaseUrl: config.snap_rx_api_url,
  timeout: 20000,
};

export const registerPairedDevice = async ({
  userId,
  deviceAddress,
  deviceName,
  firmware,
}) => {
  if (!userId || !deviceAddress) {
    return null;
  }
  const payload = {
    user_id: String(userId),
    device_address: deviceAddress,
    device_name: deviceName || "Neo",
    firmware: firmware || null,
    paired_at: Date.now(),
  };
  neoDebug("[devices] POST /neo/devices", payload);
  try {
    const response = await api.post(
      "/api/v1/neo/devices",
      payload,
      neoBackendConfig
    );
    return response?.data ?? response;
  } catch (err) {
    neoDebugError("[devices] register failed", {
      message: err?.message,
      status: err?.response?.status,
    });
    return null;
  }
};

export const listPairedDevices = async (userId) => {
  if (!userId) return [];
  try {
    const response = await api.get(
      `/api/v1/neo/devices?user_id=${encodeURIComponent(userId)}`,
      neoBackendConfig
    );
    return response?.data?.devices ?? response?.devices ?? [];
  } catch (err) {
    neoDebugError("[devices] list failed", { message: err?.message });
    return [];
  }
};

export const forgetPairedDevice = async ({ userId, deviceAddress }) => {
  if (!userId || !deviceAddress) return false;
  try {
    await api.delete(
      `/api/v1/neo/devices/${encodeURIComponent(deviceAddress)}?user_id=${encodeURIComponent(userId)}`,
      neoBackendConfig
    );
    return true;
  } catch (err) {
    neoDebugError("[devices] forget failed", { message: err?.message });
    return false;
  }
};
