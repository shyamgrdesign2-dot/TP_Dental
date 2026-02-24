/**
 * OneSignal integration for real-time teleconsult status notifications.
 * Uses existing env pattern (CRA: process.env.REACT_APP_*).
 * Communicates with UI via custom events to avoid coupling to React/Redux.
 */

import OneSignal from "react-onesignal";

const CUSTOM_EVENT_TELECONSULT = "teleconsult-notification";

const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";

function getOneSignalAppId() {
  const appId =
    typeof process !== "undefined" && process.env?.REACT_APP_ONESIGNAL_APP_ID
      ? process.env.REACT_APP_ONESIGNAL_APP_ID
      : undefined;
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
    });
    initialized = true;
    if (isDev) console.log("[OneSignal] OneSignal.init() success");
  } catch (e) {
    console.error("[OneSignal] Init failed", e);
  }
}

/**
 * Register the doctor's external user ID for targeted push (must match backend include_external_user_ids).
 * Call only after authentication is confirmed.
 */
export async function registerDoctorExternalId(doctorId) {
  console.log("[OneSignal] registerDoctorExternalId called", { doctorId, initialized });
  if (!doctorId || !initialized) {
    console.log("[OneSignal] registerDoctorExternalId skipped (no doctorId or not initialized)");
    return;
  }
  return loginDoctorExternalId(doctorId);
}

/** Max time (ms) to wait for push subscription to exist after optIn before trying login. */
const LOGIN_WAIT_SUBSCRIPTION_MS = 30000;
/** Poll interval (ms) when waiting for subscription. */
const LOGIN_POLL_MS = 500;

function hasSubscription(os) {
  if (!os?.User?.PushSubscription) return false;
  const sub = os.User.PushSubscription;
  return !!(sub.id || sub.token || sub.optedIn);
}

/**
 * Call OneSignal.login(doctorId). The SDK throws "reading 'tt'" until the push subscription exists.
 * We request browser permission if needed, call optIn(), wait for subscription, then login.
 */
export async function loginDoctorExternalId(doctorId) {
  if (!doctorId) return;
  const id = String(doctorId);

  try {
    const perm =
      typeof window !== "undefined" && "Notification" in window
        ? Notification.permission
        : "unsupported";
    console.log("[OneSignal] loginDoctorExternalId: Notification.permission =", perm);

    if (perm === "denied") {
      console.warn("[OneSignal] loginDoctorExternalId: notifications denied; unblock in browser to get teleconsult alerts.");
      return;
    }

    if (perm === "default" && typeof Notification !== "undefined" && typeof Notification.requestPermission === "function") {
      console.log("[OneSignal] loginDoctorExternalId: requesting notification permission...");
      const result = await Notification.requestPermission();
      console.log("[OneSignal] loginDoctorExternalId: requestPermission result =", result);
      if (result === "denied") return;
    }

    const os = typeof window !== "undefined" ? window.OneSignal : undefined;
    if (os && os.User && os.User.PushSubscription && typeof os.User.PushSubscription.optIn === "function") {
      console.log("[OneSignal] loginDoctorExternalId: calling optIn()...");
      await os.User.PushSubscription.optIn().catch(() => {});
    }

    if (perm === "granted") {
      await new Promise((r) => setTimeout(r, 2000));
    }

    let loginDone = false;
    const doLogin = async () => {
      if (loginDone) return;
      loginDone = true;
      try {
        console.log("[OneSignal] loginDoctorExternalId: subscription ready, calling login...");
        await OneSignal.login(id);
        console.log("[OneSignal] loginDoctorExternalId success for", id);
      } catch (e) {
        console.error("[OneSignal] loginDoctorExternalId failed", e);
      }
    };

    const sub = os?.User?.PushSubscription;
    if (sub && typeof sub.addEventListener === "function") {
      const onChange = () => {
        if (hasSubscription(os)) {
          sub.removeEventListener("change", onChange);
          doLogin();
        }
      };
      sub.addEventListener("change", onChange);
    }

    const deadline = Date.now() + LOGIN_WAIT_SUBSCRIPTION_MS;
    while (Date.now() < deadline && !loginDone) {
      if (hasSubscription(os)) {
        await doLogin();
        return;
      }
      await new Promise((r) => setTimeout(r, LOGIN_POLL_MS));
    }

    if (!loginDone) {
      console.warn(
        "[OneSignal] loginDoctorExternalId: no push subscription after",
        LOGIN_WAIT_SUBSCRIPTION_MS / 1000,
        "s (allow notifications to receive teleconsult alerts). Skipping login."
      );
    }
  } catch (e) {
    console.error("[OneSignal] loginDoctorExternalId failed", e);
  }
}

/**
 * Attach foreground and click listeners for teleconsult notifications. Prevents duplicate listeners.
 */
export function listenForTeleconsultNotifications() {
  if (isDev) console.log("[OneSignal] listenForTeleconsultNotifications() called");
  const appId = getOneSignalAppId();
  if (!appId || !initialized) {
    if (isDev) console.log("[OneSignal] listenForTeleconsultNotifications skipped (no appId or not initialized)");
    return;
  }
  if (listenerAttached) {
    if (isDev) console.log("[OneSignal] Listeners already attached; skipping.");
    return;
  }

  try {
    OneSignal.Notifications.addEventListener("foregroundWillDisplay", (event) => {
      const ev = event;
      const data = ev?.notification?.additionalData;
      if (isDev) console.log("[OneSignal] foregroundWillDisplay", { additionalData: data });
      const payload = parsePayload(data);
      if (payload && isPayloadValid(payload)) {
        if (isDev) console.log("[OneSignal] foregroundWillDisplay valid payload", payload);
        emitTeleconsultNotification(payload);
      } else if (isDev) {
        console.log("[OneSignal] foregroundWillDisplay invalid or missing payload", { payload, raw: data });
      }
    });

    OneSignal.Notifications.addEventListener("click", (event) => {
      const ev = event;
      const data = ev?.notification?.additionalData;
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
    if (isDev) console.log("[OneSignal] Notification listeners attached");
  } catch (e) {
    console.error("[OneSignal] Failed to add notification listeners", e);
  }
}

/**
 * Custom event name for UI to subscribe to teleconsult notification payloads.
 */
export const TELECONSULT_NOTIFICATION_EVENT = CUSTOM_EVENT_TELECONSULT;
