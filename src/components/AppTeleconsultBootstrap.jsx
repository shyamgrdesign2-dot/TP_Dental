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
} from "../api/services/oneSignalService";
import { getDecodedToken } from "../utils/localStorage";
import { GB_TELE_CONSULT } from "../utils/constants";
import TeleconsultNotificationHandler from "./TeleconsultNotificationHandler";
import TeleconsultFloatingWindow from "./TeleconsultFloatingWindow";
import { setJoinToken } from "../redux/teleconsultNotificationSlice";

let oneSignalFlowStarted = false;
let lastOneSignalDoctorId = null;

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
    if (!isTeleConsultEnabledFromGB || isLoginPage || isReceptionist) {
      console.log("[OneSignalBootstrap] Skipping OneSignal flow:", {
        isTeleConsultEnabledFromGB,
        isLoginPage,
        isReceptionist,
        path: location.pathname,
      });
      return;
    }

    if (!doctorId) {
      console.log("[OneSignalBootstrap] No doctorId found; resetting OneSignal state.");
      resetOneSignalState();
      oneSignalFlowStarted = false;
      lastOneSignalDoctorId = null;
      return;
    }

    if (oneSignalFlowStarted && lastOneSignalDoctorId === doctorId) {
      console.log("[OneSignalBootstrap] OneSignal flow already started for doctor; skipping re-init.", {
        doctorId,
      });
      return;
    }

    if (lastOneSignalDoctorId !== null && lastOneSignalDoctorId !== doctorId) {
      console.log("[OneSignalBootstrap] Doctor changed; resetting OneSignal state.", {
        previousDoctorId: lastOneSignalDoctorId,
        nextDoctorId: doctorId,
      });
      resetOneSignalState();
      oneSignalFlowStarted = false;
    }

    lastOneSignalDoctorId = doctorId;
    oneSignalFlowStarted = true;

    console.log("[OneSignalBootstrap] Starting OneSignal flow for doctor:", {
      doctorId,
    });

    (async () => {
      try {
        if (!(await initOneSignal())) {
          console.warn("[OneSignalBootstrap] initOneSignal returned false; aborting flow.");
          oneSignalFlowStarted = false;
          resetOneSignalState();
          return;
        }
        console.log("[OneSignalBootstrap] initOneSignal succeeded; attaching listeners and requesting permission.");
        listenForTeleconsultNotifications();
        const permissionResult = await OneSignal.Notifications.requestPermission();
        console.log("[OneSignalBootstrap] Notification permission result:", permissionResult);
        if (!OneSignal.User.PushSubscription.optedIn) {
          console.log("[OneSignalBootstrap] PushSubscription not opted in; calling optIn().");
          await OneSignal.User.PushSubscription.optIn();
        }
        await registerDoctorExternalId(String(doctorId));
        console.log("[OneSignalBootstrap] Completed OneSignal bootstrap for doctor:", {
          doctorId,
          optedIn: OneSignal.User.PushSubscription.optedIn,
        });
      } catch (e) {
        console.error("[OneSignalBootstrap] Error during OneSignal flow:", e);
        oneSignalFlowStarted = false;
        resetOneSignalState();
      }
    })();
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
  }, [isVoiceRxRoute, joinToken, dispatch]);

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
