import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OneSignal from "react-onesignal";
import {
  initOneSignal,
  listenForTeleconsultNotifications,
  registerDoctorExternalId,
} from "../services/oneSignalService";
import { getDecodedToken } from "../utils/localStorage";
import TeleconsultNotificationHandler from "./TeleconsultNotificationHandler";
import TeleconsultFloatingWindow from "./TeleconsultFloatingWindow";
import { setJoinToken } from "../redux/teleconsultNotificationSlice";

let oneSignalFlowStarted = false;

export default function AppTeleconsultBootstrap() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const joinToken = useSelector((state) => state.teleconsultNotification?.joinToken);
  const profile = useSelector((state) => state.doctors?.profile);

  const isLoginPage = location.pathname === "/login";
  const isReceptionist = searchParams.has("receptionist");
  const showFloatingWindow = joinToken && !isLoginPage && !isReceptionist;
  const doctorName = profile?.um_name || profile?.doctor_name || "Doctor";

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
