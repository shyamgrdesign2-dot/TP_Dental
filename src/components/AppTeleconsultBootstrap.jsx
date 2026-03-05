import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import OneSignal from "react-onesignal";
import {
  initOneSignal,
  listenForTeleconsultNotifications,
  registerDoctorExternalId,
  resetOneSignalState,
} from "../services/oneSignalService";
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
    if (!isTeleConsultEnabledFromGB || isLoginPage || isReceptionist) return;

    if (!doctorId) {
      resetOneSignalState();
      oneSignalFlowStarted = false;
      lastOneSignalDoctorId = null;
      return;
    }

    if (oneSignalFlowStarted && lastOneSignalDoctorId === doctorId) return;

    if (lastOneSignalDoctorId !== null && lastOneSignalDoctorId !== doctorId) {
      resetOneSignalState();
      oneSignalFlowStarted = false;
    }

    lastOneSignalDoctorId = doctorId;
    oneSignalFlowStarted = true;

    (async () => {
      try {
        if (!(await initOneSignal())) {
          oneSignalFlowStarted = false;
          resetOneSignalState();
          return;
        }
        listenForTeleconsultNotifications();
        await OneSignal.Notifications.requestPermission();
        if (!OneSignal.User.PushSubscription.optedIn) {
          await OneSignal.User.PushSubscription.optIn();
        }
        await registerDoctorExternalId(String(doctorId));
      } catch {
        oneSignalFlowStarted = false;
        resetOneSignalState();
      }
    })();
  }, [isTeleConsultEnabledFromGB, isLoginPage, isReceptionist, doctorId]);

  // If user navigates into any Voice Rx consult route while a teleconsult call is active,
  // automatically drop the video call so they can proceed with the Voice Rx flow.
  useEffect(() => {
    if (isVoiceRxRoute && joinToken) {
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
