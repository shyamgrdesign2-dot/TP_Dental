/**
 * OneSignal integration for real-time teleconsult status notifications.
 * Aligned with working HTML test flow: init → requestPermission → optIn → login.
 * Communicates with UI via custom events to avoid coupling to React/Redux.
 */

import OneSignal from "react-onesignal";
import config from "../config";

const CUSTOM_EVENT_TELECONSULT = "teleconsult-notification";

const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";

function getOneSignalAppId() {
  const appId = config?.onesignal_app_id;
  if (isDev) {
    console.log("[OneSignal] getOneSignalAppId:", appId ? `${appId.slice(0, 8)}...` : "NOT SET");
  }
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
    if (isDev) console.log("[OneSignal] emitTeleconsultNotification", payload);
    window.dispatchEvent(
      new CustomEvent(CUSTOM_EVENT_TELECONSULT, { detail: payload })
    );
  } catch (e) {
    console.error("[OneSignal] Failed to emit teleconsult notification event", e);
  }
}

let initialized = false;
let listenerAttached = false;

/**
 * Initialize OneSignal once. Safe to call multiple times; only runs once.
 * After init, attaches foregroundWillDisplay listener (same as working HTML test).
 */
export async function initOneSignal() {
  if (isDev) console.log("[OneSignal] initOneSignal() called");
  const appId = getOneSignalAppId();
  if (!appId) {
    if (isDev) {
      console.warn("[OneSignal] REACT_APP_ONESIGNAL_APP_ID not set; skipping init.");
    }
    return;
  }
  if (initialized) {
    if (isDev) console.log("[OneSignal] Already initialized; skipping.");
    return;
  }
  try {
    if (isDev) console.log("[OneSignal] OneSignal.init() starting...");
    await OneSignal.init({
      appId,
      allowLocalhostAsSecureOrigin: true,
      // Use existing app service worker (PWA + MoEngage) so only one SW is active; OneSignal is merged into it
      serviceWorkerPath: "serviceworker.js",
      serviceWorkerParam: { scope: "/" },
    });
    initialized = true;
    if (isDev) console.log("[OneSignal] OneSignal.init() success");

    // Attach foreground listener exactly like working HTML test (no preventDefault, no display())
    OneSignal.Notifications.addEventListener("foregroundWillDisplay", (event) => {
      const notification = event.notification;
      console.log("[OneSignal] Foreground notification received:", notification);

      const raw = notification.additionalData;
      if (!raw || typeof raw !== "object") return;

      // Read these directly from raw so they are not lost (OneSignal object may not serialize via JSON.stringify)
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

      // Backend may omit status; infer from message or default to WAITING
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
      if (isDev) console.log("[OneSignal] Emitting payload (patientName, appointmentTime):", payload.patientName, payload.appointmentTime);
      emitTeleconsultNotification(payload);
    });
  } catch (e) {
    console.error("[OneSignal] Init failed", e);
  }
}

/**
 * Register the doctor's external user ID for targeted push (must match backend include_external_user_ids).
 * Call only after requestPermission + optIn (done in bootstrap).
 */
export async function registerDoctorExternalId(doctorId) {
  if (isDev) console.log("[OneSignal] registerDoctorExternalId called", { doctorId, initialized });
  if (!doctorId || !initialized) {
    if (isDev) console.log("[OneSignal] registerDoctorExternalId skipped (no doctorId or not initialized)");
    return;
  }
  return loginDoctorExternalId(doctorId);
}

/**
 * Call OneSignal.login(doctorId). Permission and optIn are done in bootstrap before this.
 */
export async function loginDoctorExternalId(doctorId) {
  if (!doctorId) return;
  const id = String(doctorId);

  if (!initialized) {
    if (isDev) console.log("[OneSignal] loginDoctorExternalId skipped (not initialized)");
    return;
  }

  try {
    await OneSignal.login(id);
    if (isDev) console.log("[OneSignal] loginDoctorExternalId success for", id);

    // Debug logs after login
    const os = typeof window !== "undefined" ? window.OneSignal : undefined;
    if (os?.User) {
      console.log("[OneSignal] External ID:", os.User.externalId);
      if (os.User.PushSubscription) {
        console.log("[OneSignal] Opted In:", os.User.PushSubscription.optedIn);
        console.log("[OneSignal] Subscription ID:", os.User.PushSubscription.id);
      }
    }
  } catch (e) {
    console.error("[OneSignal] loginDoctorExternalId failed", e);
  }
}

/**
 * Attach click listener for teleconsult notifications (foreground listener is in initOneSignal).
 */
export function listenForTeleconsultNotifications() {
  if (isDev) console.log("[OneSignal] listenForTeleconsultNotifications() called");
  const appId = getOneSignalAppId();
  if (!appId || !initialized) {
    if (isDev) console.log("[OneSignal] listenForTeleconsultNotifications skipped (no appId or not initialized)");
    return;
  }
  if (listenerAttached) {
    if (isDev) console.log("[OneSignal] Click listener already attached; skipping.");
    return;
  }

  try {
    OneSignal.Notifications.addEventListener("click", (event) => {
      const data = event?.notification?.additionalData;
      if (isDev) console.log("[OneSignal] notification click", { additionalData: data });
      const payload = parsePayload(data);
      if (payload && isPayloadValid(payload)) {
        if (isDev) console.log("[OneSignal] click valid payload", payload);
        emitTeleconsultNotification(payload);
      } else if (isDev) {
        console.log("[OneSignal] click invalid or missing payload", { payload, raw: data });
      }
    });

    listenerAttached = true;
    if (isDev) console.log("[OneSignal] Notification click listener attached");
  } catch (e) {
    console.error("[OneSignal] Failed to add notification click listener", e);
  }
}

/**
 * Custom event name for UI to subscribe to teleconsult notification payloads.
 */
export const TELECONSULT_NOTIFICATION_EVENT = CUSTOM_EVENT_TELECONSULT;
