import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import OneSignal from "react-onesignal";
import {
  initOneSignal,
  listenForTeleconsultNotifications,
  registerDoctorExternalId,
  resetOneSignalState,
  logoutOneSignalUser,
  getOneSignalRuntimeState,
} from "../api/services/oneSignalService";
import { getDecodedToken } from "../utils/localStorage";
import { GB_TELE_CONSULT } from "../utils/constants";
import TeleconsultNotificationHandler from "./TeleconsultNotificationHandler";
import TeleconsultFloatingWindow from "./TeleconsultFloatingWindow";
import { setJoinToken } from "../redux/teleconsultNotificationSlice";

let loggedNoSubscriptionSuppression = false;

function isBenignOneSignalNoSubscriptionError(errLike) {
  const message = String(errLike?.message || errLike || "");
  const stack = String(errLike?.stack || "");
  return (
    /No subscription/i.test(message) &&
    (/SessionManager\.ts/i.test(stack) || /onesignal/i.test(stack))
  );
}

export default function AppTeleconsultBootstrap() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const joinToken = useSelector((state) => state.teleconsultNotification?.joinToken);
  const profile = useSelector((state) => state.doctors?.profile);

  const isTeleConsultEnabledFromGB = useFeatureIsOn(GB_TELE_CONSULT);
  const isLoginPage = location.pathname === "/login";
  const isVoiceRxRoute = location.pathname.startsWith("/voice-rx");
  const isReceptionist = searchParams.has("receptionist");
  const doctorId = getDecodedToken()?.result?.user_id ?? null;
  const showFloatingWindow = joinToken && !isLoginPage && !isReceptionist && !isVoiceRxRoute;
  const doctorName = profile?.um_name || profile?.doctor_name || "Doctor";

  useEffect(() => {
    const onUnhandledRejection = (event) => {
      if (!isBenignOneSignalNoSubscriptionError(event?.reason)) return;
      event.preventDefault();
      if (!loggedNoSubscriptionSuppression) {
        loggedNoSubscriptionSuppression = true;
        console.warn(
          "[OneSignalBootstrap] Suppressed benign OneSignal SessionManager 'No subscription' rejection."
        );
      }
    };

    const onWindowError = (event) => {
      const candidate = event?.error || event?.message;
      if (!isBenignOneSignalNoSubscriptionError(candidate)) return;
      event.preventDefault();
      if (!loggedNoSubscriptionSuppression) {
        loggedNoSubscriptionSuppression = true;
        console.warn(
          "[OneSignalBootstrap] Suppressed benign OneSignal SessionManager 'No subscription' error."
        );
      }
    };

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    window.addEventListener("error", onWindowError);

    return () => {
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
      window.removeEventListener("error", onWindowError);
    };
  }, []);

  useEffect(() => {
    if (!isTeleConsultEnabledFromGB || isLoginPage || isReceptionist) {
      console.log("[OneSignalBootstrap] Skipping OneSignal flow:", {
        isTeleConsultEnabledFromGB,
        isLoginPage,
        isReceptionist,
      });
      return;
    }

    if (!doctorId) {
      console.log("[OneSignalBootstrap] No doctorId found; resetting OneSignal state.");
      logoutOneSignalUser("missing-doctor-id");
      resetOneSignalState();
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        if (!(await initOneSignal())) {
          console.warn("[OneSignalBootstrap] initOneSignal returned false; aborting flow.");
          resetOneSignalState();
          return;
        }

        if (cancelled) return;

        listenForTeleconsultNotifications();

        const beforeState = getOneSignalRuntimeState();
        console.log("[OneSignalBootstrap] Runtime state before permission/login:", beforeState);

        // Permission/subscription are device+browser scoped, not doctor scoped.
        if (!OneSignal.User.PushSubscription.optedIn) {
          const permissionResult = await OneSignal.Notifications.requestPermission();
          console.log("[OneSignalBootstrap] Notification permission result:", permissionResult);

          if (!OneSignal.User.PushSubscription.optedIn) {
            console.log("[OneSignalBootstrap] PushSubscription not opted in; calling optIn().");
            await OneSignal.User.PushSubscription.optIn();
          }
        }

        const canBindDoctorIdentity =
          Boolean(OneSignal?.User?.PushSubscription?.optedIn) &&
          Boolean(OneSignal?.User?.PushSubscription?.id);
        if (!canBindDoctorIdentity) {
          const runtimeWithoutSubscription = getOneSignalRuntimeState();
          console.warn(
            "[OneSignalBootstrap] Skipping doctor registration because this browser has no push subscription.",
            {
              doctorId,
              ...runtimeWithoutSubscription,
            }
          );

          // If identity was previously bound, clear it to avoid SDK visibility/session errors.
          if (OneSignal?.User?.externalId) {
            await logoutOneSignalUser("no-subscription");
          }
          return;
        }

        const expectedExternalId = String(doctorId);
        const currentExternalId =
          OneSignal?.User?.externalId != null ? String(OneSignal.User.externalId) : null;
        const isAlreadyReady =
          currentExternalId === expectedExternalId &&
          Boolean(OneSignal?.User?.PushSubscription?.optedIn);
        if (isAlreadyReady) {
          console.log("[OneSignalBootstrap] OneSignal already ready for doctor; reasserting externalId.", {
            doctorId: expectedExternalId,
          });
          await registerDoctorExternalId(expectedExternalId);
          return;
        }

        // Always re-run doctor registration so SDK/backend identity drift gets corrected.
        await registerDoctorExternalId(String(doctorId));

        const afterState = getOneSignalRuntimeState();
        console.log("[OneSignalBootstrap] Completed OneSignal bootstrap:", {
          doctorId,
          ...afterState,
        });

        if (!afterState.subscribed) {
          console.warn(
            "[OneSignalBootstrap] Device is not opted in for push. " +
              "Doctor is logged in, but notifications cannot be received on this browser until permission is granted."
          );
        }
      } catch (e) {
        if (!cancelled) {
          console.error("[OneSignalBootstrap] Error during OneSignal flow:", e);
          resetOneSignalState();
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isTeleConsultEnabledFromGB, isLoginPage, isReceptionist, doctorId]);

  // If user navigates into any Voice Rx consult route while a teleconsult call is active,
  // automatically drop the video call so they can proceed with the Voice Rx flow.
  useEffect(() => {
    if (isVoiceRxRoute && joinToken) {
      message.info("Voice Rx does not support tele consultation", 3);
      console.log("[OneSignalBootstrap] Clearing joinToken because user navigated to Voice Rx route.", {
        path: location.pathname,
      });
      dispatch(setJoinToken(null));
    }
  }, [isVoiceRxRoute, joinToken, dispatch, location.pathname]);

  const handleCloseFloatingWindow = () => {
    dispatch(setJoinToken(null));
  };

  return (
    <>
      <TeleconsultNotificationHandler />
      {showFloatingWindow && (
        <TeleconsultFloatingWindow
          authToken={joinToken}
          doctorName={doctorName}
          onClose={handleCloseFloatingWindow}
        />
      )}
    </>
  );
}
