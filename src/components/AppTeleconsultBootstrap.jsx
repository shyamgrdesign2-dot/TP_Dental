import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  initOneSignal,
  listenForTeleconsultNotifications,
  loginDoctorExternalId,
} from "../services/oneSignalService";
import { getDecodedToken } from "../utils/localStorage";
import { setJoinToken } from "../redux/teleconsultNotificationSlice";
import TeleconsultNotificationHandler from "./TeleconsultNotificationHandler";
import TeleconsultFloatingWindow from "./TeleconsultFloatingWindow";

let oneSignalInitStarted = false;

export default function AppTeleconsultBootstrap() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { joinToken } = useSelector((state) => state.teleconsultNotification);
  const { profile } = useSelector((state) => state.doctors);
  const registeredDoctorIdRef = useRef(null);
  const [oneSignalReady, setOneSignalReady] = useState(false);

  const isLoginPage = location.pathname === "/login";
  const isReceptionist = searchParams.has("receptionist");

  useEffect(() => {
    if (oneSignalInitStarted) {
      return;
    }
    oneSignalInitStarted = true;
    initOneSignal()
      .then(() => {
        listenForTeleconsultNotifications();
        setOneSignalReady(true);
        // Register doctor in same tick as init so oneSignalService.initialized is definitely true
        if (!isLoginPage && !isReceptionist) {
          const token = getDecodedToken();
          const doctorId = token?.result?.user_id;
          if (doctorId) {
            const id = String(doctorId);
            registeredDoctorIdRef.current = id;
            loginDoctorExternalId(id).catch((e) => {
              if (typeof console !== "undefined" && console.error) {
                console.error("[App] OneSignal loginDoctorExternalId failed", e);
              }
            });
          }
        }
      })
      .catch((e) => {
        if (typeof console !== "undefined" && console.error) {
          console.error("[App] OneSignal init failed", e);
        }
      });
  }, [isLoginPage, isReceptionist]);

  useEffect(() => {
    if (isLoginPage || isReceptionist) {
      registeredDoctorIdRef.current = null;
      return;
    }
    if (!oneSignalReady) {
      return;
    }
    const token = getDecodedToken();
    const doctorId = token?.result?.user_id;
    if (!doctorId) {
      return;
    }
    const id = String(doctorId);
    if (registeredDoctorIdRef.current === id) {
      return;
    }
    registeredDoctorIdRef.current = id;
    loginDoctorExternalId(id).catch((e) => {
      if (typeof console !== "undefined" && console.error) {
        console.error("[App] OneSignal loginDoctorExternalId failed", e);
      }
    });
  }, [isLoginPage, isReceptionist, oneSignalReady]);

  const handleCloseFloatingWindow = () => {
    dispatch(setJoinToken(null));
  };

  const doctorName =
    profile?.um_name || profile?.doctor_name || "Doctor";

  return (
    <>
      <TeleconsultNotificationHandler />
      {joinToken && (
        <TeleconsultFloatingWindow
          authToken={joinToken}
          doctorName={doctorName}
          onClose={handleCloseFloatingWindow}
        />
      )}
    </>
  );
}
