import OneSignal from "react-onesignal";
import config from "../../config";

const CUSTOM_EVENT_TELECONSULT = "teleconsult-notification";
const IDENTITY_LOCK_KEY = "onesignal_identity_lock_v1";
const IDENTITY_LOCK_TTL_MS = 8000;
const IDENTITY_LOCK_WAIT_MS = 12000;
const TAB_ID = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

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
let loginInFlightPromise = null;

function isAliasConflictError(error) {
  if (!error) return false;
  const message = String(error?.message || "");
  const statusCode = Number(error?.statusCode ?? error?.status ?? 0);
  const errors = Array.isArray(error?.errors) ? error.errors : [];
  return (
    statusCode === 409 ||
    message.includes("409") ||
    message.includes("Aliases claimed by another User") ||
    errors.some((e) => String(e?.code || "").startsWith("user-2"))
  );
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readIdentityLock() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const raw = window.localStorage.getItem(IDENTITY_LOCK_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeIdentityLock(lockValue) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    window.localStorage.setItem(IDENTITY_LOCK_KEY, JSON.stringify(lockValue));
    return true;
  } catch {
    return false;
  }
}

function clearIdentityLockIfOwner() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    const current = readIdentityLock();
    if (current?.owner === TAB_ID) {
      window.localStorage.removeItem(IDENTITY_LOCK_KEY);
    }
  } catch {
    // ignore
  }
}

function isActiveForeignLock(lockValue) {
  if (!lockValue || typeof lockValue !== "object") return false;
  const expiresAt = Number(lockValue.expiresAt || 0);
  return lockValue.owner !== TAB_ID && Date.now() < expiresAt;
}

async function acquireIdentityLock(label) {
  const start = Date.now();
  while (Date.now() - start < IDENTITY_LOCK_WAIT_MS) {
    const current = readIdentityLock();
    if (isActiveForeignLock(current)) {
      await delay(180);
      continue;
    }

    const lock = {
      owner: TAB_ID,
      expiresAt: Date.now() + IDENTITY_LOCK_TTL_MS,
      label,
    };

    if (!writeIdentityLock(lock)) {
      // localStorage unavailable; continue without cross-tab lock
      return () => {};
    }

    const afterWrite = readIdentityLock();
    if (afterWrite?.owner === TAB_ID) {
      return () => clearIdentityLockIfOwner();
    }
    await delay(120);
  }

  console.warn("[OneSignal] acquireIdentityLock timed out; proceeding without lock.", {
    label,
  });
  return () => {};
}

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
      serviceWorkerPath: "/serviceworker.js",
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

async function performLogout(reason = "manual") {
  const currentExternalId = OneSignal?.User?.externalId;
  if (currentExternalId) {
    console.log("[OneSignal] logoutOneSignalUser: logging out current externalId.", {
      reason,
      currentExternalId,
    });
  } else {
    console.log("[OneSignal] logoutOneSignalUser: no externalId bound; calling logout anyway.", {
      reason,
    });
  }
  await OneSignal.logout();
  console.log("[OneSignal] logoutOneSignalUser completed.");
}

export async function logoutOneSignalUser(reason = "manual") {
  if (!initialized) return;
  const releaseLock = await acquireIdentityLock(`logout:${reason}`);
  try {
    await performLogout(reason);
  } catch (e) {
    console.warn("[OneSignal] logoutOneSignalUser failed:", e);
  } finally {
    releaseLock();
  }
}

/**
 * Call OneSignal.login(doctorId). Permission and optIn are done in bootstrap before this.
 */
export async function loginDoctorExternalId(doctorId) {
  if (!doctorId) return;
  const id = String(doctorId);
  if (!initialized) return;

  if (loginInFlightPromise) {
    console.log("[OneSignal] loginDoctorExternalId waiting for existing login attempt.");
    await loginInFlightPromise;
  }

  loginInFlightPromise = (async () => {
    const releaseLock = await acquireIdentityLock(`login:${id}`);
    try {
      const currentExternalId = OneSignal?.User?.externalId;
      if (currentExternalId === id) {
        console.log("[OneSignal] loginDoctorExternalId: already logged in with matching externalId.", {
          externalId: id,
        });
        return;
      }

      if (currentExternalId && currentExternalId !== id) {
        console.log("[OneSignal] loginDoctorExternalId: switching externalId.", {
          from: currentExternalId,
          to: id,
        });
        await performLogout("switch-external-id");
        await delay(200);
      }

      console.log("[OneSignal] loginDoctorExternalId calling OneSignal.login with id:", id);
      await OneSignal.login(id);
      console.log("[OneSignal] loginDoctorExternalId completed successfully for id:", id);
    } catch (e) {
      if (isAliasConflictError(e)) {
        console.warn(
          "[OneSignal] loginDoctorExternalId alias conflict (409). Retrying with forced logout.",
          {
            doctorId: id,
            error: e,
          }
        );

        try {
          await performLogout("alias-conflict-retry");
          await delay(400);
          await OneSignal.login(id);
          console.log("[OneSignal] loginDoctorExternalId succeeded after alias-conflict retry.", {
            doctorId: id,
          });
          return;
        } catch (retryError) {
          console.error(
            "[OneSignal] loginDoctorExternalId retry failed after alias conflict. " +
              "Likely alias ownership is locked to another OneSignal user.",
            {
              doctorId: id,
              retryError,
            }
          );
          return;
        }
      }

      console.error("[OneSignal] loginDoctorExternalId failed:", e);
    } finally {
      releaseLock();
      loginInFlightPromise = null;
    }
  })();

  await loginInFlightPromise;
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
