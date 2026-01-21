import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visualAcuity: {
    od: {
      ucDistance: "",
      ucNear: "",
      pinhole: "",
      cDistance: "",
      cNear: "",
    },
    os: {
      ucDistance: "",
      ucNear: "",
      pinhole: "",
      cDistance: "",
      cNear: "",
    },
  },
};

const ophthalmologyExamSlice = createSlice({
  name: "ophthalmologyExam",
  initialState,
  reducers: {
    setVisualAcuityData: (state, action) => {
      const next = action.payload || {};
      state.visualAcuity = {
        od: { ...initialState.visualAcuity.od, ...(next?.od || {}) },
        os: { ...initialState.visualAcuity.os, ...(next?.os || {}) },
      };
    },
    updateVisualAcuityField: (state, action) => {
      const { eye, field, value } = action.payload || {};
      if (!eye || !field) return;
      const normalizedEye = eye.toLowerCase();
      if (!state.visualAcuity[normalizedEye]) return;
      state.visualAcuity[normalizedEye][field] = value;
    },
    resetVisualAcuity: (state) => {
      state.visualAcuity = initialState.visualAcuity;
    },
  },
});

export const {
  setVisualAcuityData,
  updateVisualAcuityField,
  resetVisualAcuity,
} = ophthalmologyExamSlice.actions;

export default ophthalmologyExamSlice.reducer;
