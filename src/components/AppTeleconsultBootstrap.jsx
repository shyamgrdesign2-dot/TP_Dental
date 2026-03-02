import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import OneSignal from "react-onesignal";
import {
  initOneSignal,
  listenForTeleconsultNotifications,
  registerDoctorExternalId,
} from "../services/oneSignalService";
import { getDecodedToken } from "../utils/localStorage";
import TeleconsultNotificationHandler from "./TeleconsultNotificationHandler";

let oneSignalFlowStarted = false;

export default function AppTeleconsultBootstrap() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isLoginPage = location.pathname === "/login";
  const isReceptionist = searchParams.has("receptionist");

  useEffect(() => {
    if (isLoginPage || isReceptionist) return;

    const token = getDecodedToken();
    const doctorId = token?.result?.user_id;
    if (!doctorId) return;

    if (oneSignalFlowStarted) return;
    oneSignalFlowStarted = true;

    initOneSignal()
      .then(async () => {
        listenForTeleconsultNotifications();
        await OneSignal.Notifications.requestPermission();
        if (!OneSignal.User.PushSubscription.optedIn) {
          await OneSignal.User.PushSubscription.optIn();
        }
        await registerDoctorExternalId(String(doctorId));
      })
      .catch(console.error);
  }, [isLoginPage, isReceptionist]);

  return <TeleconsultNotificationHandler />;
}
