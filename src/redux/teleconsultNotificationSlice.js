import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /** Stack of WAITING notification payloads for banners: [{ consultationId, appointmentId, patientName, appointmentTime, prescriptionContext, ... }] */
  waitingBanners: [],
  /** Live status by appointmentId (from push): "CREATED" | "WAITING" | "ONGOING" | "ENDED". Merged with list API teleconsultStatus for list icon. */
  appointmentStatusByAppointmentId: {},
  /** Token from join API when user joins from notification (enables global floating window) */
  joinToken: null,
  /** Last status+consultationId we showed toast for (avoid duplicate toasts) */
  lastShownStatusKey: null,
};

const teleconsultNotificationSlice = createSlice({
  name: "teleconsultNotification",
  initialState,
  reducers: {
    addWaitingBanner: (state, action) => {
      const payload = action.payload;
      if (!payload?.consultationId) return;
      const exists = state.waitingBanners.some((b) => b.consultationId === payload.consultationId);
      if (!exists) {
        state.waitingBanners.push(payload);
      }
    },
    removeWaitingBanner: (state, action) => {
      const consultationId = action.payload;
      state.waitingBanners = state.waitingBanners.filter((b) => b.consultationId !== consultationId);
    },
    setAppointmentTeleconsultStatus: (state, action) => {
      const { appointmentId, status } = action.payload;
      if (appointmentId == null) return;
      if (status == null) {
        delete state.appointmentStatusByAppointmentId[String(appointmentId)];
      } else {
        state.appointmentStatusByAppointmentId[String(appointmentId)] = status;
      }
    },
    setJoinToken: (state, action) => {
      state.joinToken = action.payload;
    },
    setLastShownStatusKey: (state, action) => {
      state.lastShownStatusKey = action.payload;
    },
    clearTeleconsultNotification: (state) => {
      state.waitingBanners = [];
      state.appointmentStatusByAppointmentId = {};
      state.joinToken = null;
      state.lastShownStatusKey = null;
    },
  },
});

export const {
  addWaitingBanner,
  removeWaitingBanner,
  setAppointmentTeleconsultStatus,
  setJoinToken,
  setLastShownStatusKey,
  clearTeleconsultNotification,
} = teleconsultNotificationSlice.actions;
export default teleconsultNotificationSlice.reducer;
