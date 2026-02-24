import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ApiTeleconsult from "../api/services/ApiTeleconsult";
import videoGreenIcon from "../assets/images/video-green.svg";
import {
  removeWaitingBanner,
  setJoinToken,
} from "../redux/teleconsultNotificationSlice";
import "./TeleconsultWaitingBanner.scss";

export default function TeleconsultWaitingBanner({ payload, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [joinLoading, setJoinLoading] = useState(false);

  const patientName = payload?.patientName || "Patient";
  const appointmentTime = payload?.appointmentTime || "";

  const handleClose = () => {
    onClose?.();
    if (payload?.consultationId) {
      dispatch(removeWaitingBanner(payload.consultationId));
    }
  };

  const handleJoinCall = async () => {
    const appointmentId = payload?.appointmentId ?? payload?.prescriptionContext?.pam_id;
    if (!appointmentId || joinLoading) return;
    setJoinLoading(true);
    try {
      const response = await ApiTeleconsult.checkVideoAvailability(appointmentId);
      const data = response?.data ?? response;
      const joinPayload = data?.joinPayload;
      const token = joinPayload?.token ?? data?.token;
      if (token) {
        const patientData = payload?.prescriptionContext || null;
        if (patientData && (patientData.pam_id != null || patientData.patient_unique_id != null)) {
          const videoConsultData =
            patientData.pam_id != null
              ? {
                  pam_id: patientData.pam_id,
                  pam_status_type_appointment: 2,
                }
              : undefined;
          navigate("/prescription", {
            state: {
              patient_data: patientData,
              videoConsultData,
              teleconsultAutoJoin: { consultationId: payload.consultationId, token },
            },
          });
        } else {
          dispatch(setJoinToken(token));
        }
        dispatch(removeWaitingBanner(payload.consultationId));
      } else {
        message.error(
          data?.joinWindowExpired
            ? "Join window has ended."
            : "Cannot join this video consultation."
        );
      }
    } catch (error) {
      message.error("Cannot join this video consultation.");
      console.error("[TeleconsultWaitingBanner] Join failed", error);
    } finally {
      setJoinLoading(false);
    }
  };

  return (
    <div className="teleconsult-waiting-banner">
      <div className="teleconsult-waiting-banner__content">
        <img
          src={videoGreenIcon}
          alt=""
          className="teleconsult-waiting-banner__icon"
        />
        <p className="teleconsult-waiting-banner__text">
          Patient <strong>{patientName}</strong> has joined the Tele-Consultation
          scheduled at <strong>{appointmentTime || "—"}</strong>!
        </p>
      </div>
      <div className="teleconsult-waiting-banner__actions">
        <button
          type="button"
          className="teleconsult-waiting-banner__btn teleconsult-waiting-banner__btn--close"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          type="button"
          className="teleconsult-waiting-banner__btn teleconsult-waiting-banner__btn--join"
          onClick={handleJoinCall}
          disabled={joinLoading}
        >
          {joinLoading ? (
            <>
              <LoadingOutlined className="me-2" />
              Joining…
            </>
          ) : (
            "Join the Call"
          )}
        </button>
      </div>
    </div>
  );
}
