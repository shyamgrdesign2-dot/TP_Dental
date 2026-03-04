
import OneSignal from "react-onesignal";
import config from "../config";

const CUSTOM_EVENT_TELECONSULT = "teleconsult-notification";

const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";

function getOneSignalAppId() {
  const appId = config?.onesignal_app_id;
  return appId;
}

function isPayloadValid(data) {
  if (!data || typeof data !== "object") return false;
  const d = data;
  return (
    typeof d.consultationId === "string" &&
    typeof d.appointmentId === "number" &&
    typeof d.status === "string" &&
    ["CREATED", "WAITING", "ONGOING", "ENDED"].includes(d.status)
  );
}

function parsePayload(additionalData) {
  if (!additionalData || typeof additionalData !== "object") return null;
  const d = additionalData;
  const payload = {
    id: typeof d.id === "string" ? d.id : "",
    consultationId: typeof d.consultationId === "string" ? d.consultationId : "",
    appointmentId: typeof d.appointmentId === "number" ? d.appointmentId : 0,
    status:
      typeof d.status === "string" && ["CREATED", "WAITING", "ONGOING", "ENDED"].includes(d.status)
        ? d.status
        : "CREATED",
    message: typeof d.message === "string" ? d.message : "",
    patientName: typeof d.patientName === "string" ? d.patientName : undefined,
    appointmentTime: typeof d.appointmentTime === "string" ? d.appointmentTime : undefined,
    prescriptionContext:
      d.prescriptionContext && typeof d.prescriptionContext === "object"
        ? d.prescriptionContext
        : undefined,
  };
  if (!payload.consultationId) return null;
  return payload;
}

function emitTeleconsultNotification(payload) {
  try {
    window.dispatchEvent(
      new CustomEvent(CUSTOM_EVENT_TELECONSULT, { detail: payload })
    );
  } catch (_e) {
  }
}

let initialized = false;
let listenerAttached = false;

export async function initOneSignal() {
  const appId = getOneSignalAppId();
  if (!appId) {
    if (isDev) {
      console.warn("[OneSignal] REACT_APP_ONESIGNAL_APP_ID not set; skipping init.");
    }
    return false;
  }
  if (initialized) {
    return true;
  }
  try {
    await OneSignal.init({
      appId,
      allowLocalhostAsSecureOrigin: true,
      serviceWorkerPath: "serviceworker.js",
      serviceWorkerParam: { scope: "/" },
    });
    initialized = true;

    OneSignal.Notifications.addEventListener("foregroundWillDisplay", (event) => {
      const notification = event.notification;

      const raw = notification.additionalData;
      if (!raw || typeof raw !== "object") return;

      const appointmentTime =
        (raw.appointmentTime != null ? String(raw.appointmentTime).trim() : null) ||
        (raw.appointment_time != null ? String(raw.appointment_time).trim() : null) ||
        "";
      const patientName =
        (raw.patientName != null ? String(raw.patientName).trim() : null) ||
        (raw.patient_name != null ? String(raw.patient_name).trim() : null) ||
        "";

      const consultationId = raw.consultationId ?? raw.id;
      if (!consultationId) return;

      const status =
        raw.status && ["CREATED", "WAITING", "ONGOING", "ENDED"].includes(raw.status)
          ? raw.status
          : /waiting|wait/i.test(String(raw.message || ""))
            ? "WAITING"
            : "CREATED";

      const payload = {
        consultationId,
        appointmentId: raw.appointmentId,
        status,
        message: raw.message,
        patientName,
        appointmentTime,
      };
      emitTeleconsultNotification(payload);
    });
    return true;
  } catch (_e) {
    return false;
  }
}

/**
 * Register the doctor's external user ID for targeted push (must match backend include_external_user_ids).
 * Call only after requestPermission + optIn (done in bootstrap).
 */
export async function registerDoctorExternalId(doctorId) {
  if (!doctorId || !initialized) return;
  return loginDoctorExternalId(doctorId);
}

/**
 * Call OneSignal.login(doctorId). Permission and optIn are done in bootstrap before this.
 */
export async function loginDoctorExternalId(doctorId) {
  if (!doctorId) return;
  const id = String(doctorId);
  if (!initialized) return;
  try {
    await OneSignal.login(id);
  } catch (_e) {
  }
}

/**
 * Attach click listener for teleconsult notifications (foreground listener is in initOneSignal).
 */
export function listenForTeleconsultNotifications() {
  const appId = getOneSignalAppId();
  if (!appId || !initialized || listenerAttached) return;

  try {
    OneSignal.Notifications.addEventListener("click", (event) => {
      const data = event?.notification?.additionalData;
      const payload = parsePayload(data);
      if (payload && isPayloadValid(payload)) {
        emitTeleconsultNotification(payload);
      }
    });

    listenerAttached = true;
  } catch (_e) {
  }
}


export function resetOneSignalState() {
  initialized = false;
  listenerAttached = false;
}

/**
 * Custom event name for UI to subscribe to teleconsult notification payloads.
 */
export const TELECONSULT_NOTIFICATION_EVENT = CUSTOM_EVENT_TELECONSULT;
