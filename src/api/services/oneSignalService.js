import OneSignal from "react-onesignal";
import config from "../../config";

const CUSTOM_EVENT_TELECONSULT = "teleconsult-notification";
const TELECONSULT_STATUSES = ["CREATED", "WAITING", "ONGOING", "ENDED"];

const IDENTITY_LOCK_KEY = "onesignal_identity_lock_v1";
const IDENTITY_LOCK_TTL_MS = 8000;
const IDENTITY_LOCK_WAIT_MS = 12000;
const TAB_ID = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

let initialized = false;
let foregroundListener = null;
let clickListener = null;
let loginInFlightPromise = null;

function getOneSignalAppId() {
  return config?.onesignal_app_id;
}

function normalizeStatus(status, message) {
  if (typeof status === "string" && TELECONSULT_STATUSES.includes(status)) {
    return status;
  }
  return /waiting|wait/i.test(String(message || "")) ? "WAITING" : "CREATED";
}

function normalizeAppointmentId(value) {
  if (value == null) return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || null;
  }
  return null;
}

function isPayloadValid(data) {
  if (!data || typeof data !== "object") return false;
  const d = data;
  return (
    typeof d.consultationId === "string" &&
    d.consultationId.trim().length > 0 &&
    (typeof d.appointmentId === "number" || typeof d.appointmentId === "string") &&
    typeof d.status === "string" &&
    TELECONSULT_STATUSES.includes(d.status)
  );
}

function parsePayload(additionalData) {
  if (!additionalData || typeof additionalData !== "object") return null;
  const d = additionalData;

  const payload = {
    id: d.id == null ? "" : String(d.id),
    consultationId:
      d.consultationId != null
        ? String(d.consultationId)
        : d.consultation_id != null
          ? String(d.consultation_id)
          : d.id != null
            ? String(d.id)
            : "",
    appointmentId: normalizeAppointmentId(
      d.appointmentId ?? d.appointment_id ?? d.pam_id ?? d?.prescriptionContext?.pam_id
    ),
    status: normalizeStatus(d.status, d.message),
    message: typeof d.message === "string" ? d.message : "",
    patientName:
      typeof d.patientName === "string"
        ? d.patientName
        : typeof d.patient_name === "string"
          ? d.patient_name
          : undefined,
    appointmentTime:
      typeof d.appointmentTime === "string"
        ? d.appointmentTime
        : typeof d.appointment_time === "string"
          ? d.appointment_time
          : undefined,
    prescriptionContext:
      d.prescriptionContext && typeof d.prescriptionContext === "object"
        ? d.prescriptionContext
        : undefined,
  };

  return payload.consultationId ? payload : null;
}

function emitTeleconsultNotification(payload) {
  try {
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_TELECONSULT, { detail: payload }));
  } catch (_e) {
    // Ignore dispatch errors
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

function isPushSubscribed() {
  return Boolean(OneSignal?.User?.PushSubscription?.optedIn);
}

function hasPushSubscriptionId() {
  return Boolean(OneSignal?.User?.PushSubscription?.id);
}

function readIdentityLock() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const raw = window.localStorage.getItem(IDENTITY_LOCK_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
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

function ensureForegroundListener() {
  if (foregroundListener) return;

  foregroundListener = (event) => {
    const notification = event?.notification;
    const raw = notification?.additionalData;
    if (!raw || typeof raw !== "object") return;

    console.log("[OneSignal] foregroundWillDisplay notification:", {
      notification,
      additionalData: raw,
    });

    const payload = {
      consultationId:
        raw.consultationId != null
          ? String(raw.consultationId)
          : raw.consultation_id != null
            ? String(raw.consultation_id)
            : raw.id != null
              ? String(raw.id)
              : "",
      appointmentId: normalizeAppointmentId(
        raw.appointmentId ?? raw.appointment_id ?? raw.pam_id ?? raw?.prescriptionContext?.pam_id
      ),
      status: normalizeStatus(raw.status, raw.message),
      message: typeof raw.message === "string" ? raw.message : "",
      patientName:
        raw.patientName != null
          ? String(raw.patientName)
          : raw.patient_name != null
            ? String(raw.patient_name)
            : undefined,
      appointmentTime:
        raw.appointmentTime != null
          ? String(raw.appointmentTime)
          : raw.appointment_time != null
            ? String(raw.appointment_time)
            : undefined,
      prescriptionContext:
        raw.prescriptionContext && typeof raw.prescriptionContext === "object"
          ? raw.prescriptionContext
          : undefined,
    };

    if (!isPayloadValid(payload)) {
      console.warn("[OneSignal] Foreground payload invalid; ignoring.", { payload, raw });
      return;
    }

    console.log("[OneSignal] Emitting foreground teleconsult payload:", payload);
    emitTeleconsultNotification(payload);
  };

  OneSignal.Notifications.addEventListener("foregroundWillDisplay", foregroundListener);
}

function ensureClickListener() {
  if (clickListener) return;

  clickListener = (event) => {
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
  };

  OneSignal.Notifications.addEventListener("click", clickListener);
}

async function performLogout(reason) {
  const currentExternalId = OneSignal?.User?.externalId;
  console.log("[OneSignal] logoutOneSignalUser called:", {
    reason,
    currentExternalId: currentExternalId ?? null,
  });
  await OneSignal.logout();
  console.log("[OneSignal] logoutOneSignalUser completed.");
}

export async function initOneSignal() {
  const appId = getOneSignalAppId();
  if (!appId) {
    console.warn("[OneSignal] REACT_APP_ONESIGNAL_APP_ID not set; skipping init.");
    return false;
  }

  if (!initialized) {
    try {
      console.log("[OneSignal] Initializing with appId:", appId);
      await OneSignal.init({
        appId,
        allowLocalhostAsSecureOrigin: true,
        path: "/",
        serviceWorkerPath: "serviceworker.js",
        serviceWorkerParam: { scope: "/" },
      });
      initialized = true;
    } catch (e) {
      if (e && typeof e.message === "string" && e.message.includes("SDK already initialized")) {
        console.warn("[OneSignal] initOneSignal: SDK already initialized; treating as success.");
        initialized = true;
      } else {
        console.error("[OneSignal] initOneSignal failed:", e);
        return false;
      }
    }
  }

  ensureForegroundListener();
  ensureClickListener();
  console.log("[OneSignal] initOneSignal completed successfully.");
  return true;
}

export async function registerDoctorExternalId(doctorId) {
  if (!doctorId || !initialized) return;
  if (!isPushSubscribed() || !hasPushSubscriptionId()) {
    console.warn(
      "[OneSignal] registerDoctorExternalId skipped: device has no active push subscription.",
      {
        doctorId,
        optedIn: OneSignal?.User?.PushSubscription?.optedIn,
        pushSubscriptionId: OneSignal?.User?.PushSubscription?.id ?? null,
      }
    );
    return false;
  }
  console.log("[OneSignal] registerDoctorExternalId called with doctorId:", doctorId);
  return loginDoctorExternalId(doctorId);
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

export async function loginDoctorExternalId(doctorId) {
  if (!doctorId || !initialized) return;
  const id = String(doctorId);
  if (!isPushSubscribed() || !hasPushSubscriptionId()) {
    console.warn(
      "[OneSignal] loginDoctorExternalId skipped: no active push subscription for this browser.",
      {
        doctorId: id,
        optedIn: OneSignal?.User?.PushSubscription?.optedIn,
        pushSubscriptionId: OneSignal?.User?.PushSubscription?.id ?? null,
      }
    );
    return false;
  }

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
        console.warn("[OneSignal] loginDoctorExternalId alias conflict (409). Retrying with forced logout.", {
          doctorId: id,
          error: e,
        });

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
            "[OneSignal] loginDoctorExternalId retry failed after alias conflict. Likely alias ownership is locked.",
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
  return true;
}

export function listenForTeleconsultNotifications() {
  const appId = getOneSignalAppId();
  if (!appId || !initialized) return;
  ensureClickListener();
}

export function getOneSignalRuntimeState() {
  return {
    initialized,
    externalId: OneSignal?.User?.externalId ?? null,
    oneSignalId: OneSignal?.User?.onesignalId ?? null,
    subscribed: Boolean(OneSignal?.User?.PushSubscription?.optedIn),
    pushSubscriptionId: OneSignal?.User?.PushSubscription?.id ?? null,
    notificationPermission:
      typeof Notification !== "undefined" ? Notification.permission : "unsupported",
  };
}

export function resetOneSignalState() {
  console.log("[OneSignal] resetOneSignalState called; clearing init/listener flags.");

  try {
    if (foregroundListener) {
      OneSignal.Notifications.removeEventListener("foregroundWillDisplay", foregroundListener);
      foregroundListener = null;
    }
    if (clickListener) {
      OneSignal.Notifications.removeEventListener("click", clickListener);
      clickListener = null;
    }
  } catch (e) {
    console.warn("[OneSignal] resetOneSignalState failed while removing listeners:", e);
  }

  initialized = false;
}

export const TELECONSULT_NOTIFICATION_EVENT = CUSTOM_EVENT_TELECONSULT;
