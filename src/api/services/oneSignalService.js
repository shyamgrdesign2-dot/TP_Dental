import OneSignal from "react-onesignal";
import config from "../../config";

const CUSTOM_EVENT_TELECONSULT = "teleconsult-notification";

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
    console.warn("[OneSignal] REACT_APP_ONESIGNAL_APP_ID not set; skipping init.");
    return false;
  }
  if (initialized) {
    console.log("[OneSignal] initOneSignal called but already initialized; skipping.");
    return true;
  }
  try {
    console.log("[OneSignal] Initializing with appId:", appId);
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

      console.log("[OneSignal] foregroundWillDisplay notification:", {
        notification,
        additionalData: raw,
      });

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
      console.log("[OneSignal] Emitting foreground teleconsult payload:", payload);
      emitTeleconsultNotification(payload);
    });
    console.log("[OneSignal] initOneSignal completed successfully.");
    return true;
  } catch (e) {
    // In dev/HMR, the underlying SDK can already be initialized even if our module state was reset.
    // Treat the specific "SDK already initialized" error as a benign success so we don't abort the flow.
    if (e && typeof e.message === "string" && e.message.includes("SDK already initialized")) {
      console.warn("[OneSignal] initOneSignal: SDK already initialized; treating as success.");
      initialized = true;
      return true;
    }
    console.error("[OneSignal] initOneSignal failed:", e);
    return false;
  }
}

/**
 * Register the doctor's external user ID for targeted push (must match backend include_external_user_ids).
 * Call only after requestPermission + optIn (done in bootstrap).
 */
export async function registerDoctorExternalId(doctorId) {
  if (!doctorId || !initialized) return;
  console.log("[OneSignal] registerDoctorExternalId called with doctorId:", doctorId);
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
    console.log("[OneSignal] loginDoctorExternalId calling OneSignal.login with id:", id);
    await OneSignal.login(id);
    console.log("[OneSignal] loginDoctorExternalId completed successfully for id:", id);
  } catch (e) {
    console.error("[OneSignal] loginDoctorExternalId failed:", e);
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
      console.log("[OneSignal] Notification click event received:", {
        notification: event?.notification,
        additionalData: data,
      });
      const payload = parsePayload(data);
      if (payload && isPayloadValid(payload)) {
        console.log("[OneSignal] Parsed valid teleconsult click payload:", payload);
        emitTeleconsultNotification(payload);
      } else {
        console.warn("[OneSignal] Invalid or missing teleconsult payload on click; ignoring.", {
          additionalData: data,
        });
      }
    });

    listenerAttached = true;
    console.log("[OneSignal] listenForTeleconsultNotifications attached click listener.");
  } catch (e) {
    console.error("[OneSignal] listenForTeleconsultNotifications failed to attach listener:", e);
  }
}


export function resetOneSignalState() {
  console.log("[OneSignal] resetOneSignalState called; clearing init and listener flags.");
  initialized = false;
  listenerAttached = false;
}

/**
 * Custom event name for UI to subscribe to teleconsult notification payloads.
 */
export const TELECONSULT_NOTIFICATION_EVENT = CUSTOM_EVENT_TELECONSULT;

