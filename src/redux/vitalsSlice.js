import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ADD, EDIT } from "../utils/constants";

import ApiVitals from "../api/services/ApiVitals";

const initialState = {
    selectedVitalsList: [],
    vitalsPastList: [],
    loading: false,
    error: null,
    patientBirthWeight: null,
    todayData: null
};

export const getTodayWeight = createAsyncThunk(
    "growChart/getTodayWeight",
    async (data) => {
        const result = await ApiVitals.getTodayWeight(data?.pm_id, data?.pm_pid);
        if (result.statusCode !== 404) {
            return result;
        } else {
            throw Error(result.error);
        }
    }
);

export const updateTodayWeight = createAsyncThunk(
    "growChart/updateTodayWeight",
    async (data) => {
        const result = await ApiVitals.updateTodayWeight(data);
        // if (result.statusCode !== 400) {
        //     return result;
        // } else {
        //     throw Error(result.error);
        // }
    }
);

export const addUpdateVitals = createAsyncThunk(
    "vitals/addUpdateVitals",
    async (data, { dispatch }) => {
        let result = {};
        result = await ApiVitals.addUpdateVitals(data);
        await dispatch(getTodayWeight(data))
        if (result.status) {
            return result.data;
        } else {
            throw Error(result.error);
        }
    }
);

export const getVitals = createAsyncThunk(
    "vitals/getVitals",
    async (data, { dispatch }) => {
        let result = {};
        result = await ApiVitals.getVitals(data);
        await dispatch(getTodayWeight(data))
        if (result.status) {
            return result.data;
        } else {
            throw Error(result.error);
        }
    }
);

export const getPatientBirthWeight = createAsyncThunk("vitals/getPatientBirthWeight", async (data) => {
    let result = {};
    result = await ApiVitals.getPatientBirthWeight(data);
    if (result.status) {
        return result.data;
    } else {
        throw Error(result.error);
    }
});

const vitalsSlice = createSlice({
    name: "vitals",
    initialState,
    reducers: {
        updateList: (state, action) => {
            const { status, data, weight } = action.payload
            if (status == 'selected') {
                state.selectedVitalsList = data;
            } else {
                state.vitalsPastList = data;
            }
            state.todayData = { ...state.todayData, weight: weight };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUpdateVitals.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUpdateVitals.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedVitalsList = action.payload;
            })
            .addCase(addUpdateVitals.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getVitals.pending, (state) => {
                state.loading = true;
                state.selectedVitalsList = [];
            })
            .addCase(getVitals.fulfilled, (state, action) => {
                state.loading = false;

                const deduplicateByDate = (vitals) => {
                    const vitalsByDate = {};
                    vitals.forEach(vital => {
                        const dateKey = vital.date;
                        const existing = vitalsByDate[dateKey];
                        
                        if (!existing) {
                            vitalsByDate[dateKey] = vital;
                        } else {
                            const existingId = Math.max(Number(existing.tcv_id || 0), Number(existing.tcbc_id || 0));
                            const vitalId = Math.max(Number(vital.tcv_id || 0), Number(vital.tcbc_id || 0));
                            if (vitalId > existingId) {
                                vitalsByDate[dateKey] = vital;
                            } else if (vitalId === existingId && vitalId > 0) {
                                const existingTime = new Date(existing.updated_at || existing.created_at || 0).getTime();
                                const vitalTime = new Date(vital.updated_at || vital.created_at || 0).getTime();
                                if (vitalTime > existingTime) {
                                    vitalsByDate[dateKey] = vital;
                                } else if (vitalTime === existingTime) {
                                    const existingDataCount = Object.values(existing).filter(v => v && v !== '' && v !== 0 && v !== null).length;
                                    const vitalDataCount = Object.values(vital).filter(v => v && v !== '' && v !== 0 && v !== null).length;
                                    if (vitalDataCount > existingDataCount) {
                                        vitalsByDate[dateKey] = vital;
                                    }
                                }
                            } else if (existingId === 0 && vitalId === 0) {
                                const existingTime = new Date(existing.updated_at || existing.created_at || 0).getTime();
                                const vitalTime = new Date(vital.updated_at || vital.created_at || 0).getTime();
                                if (vitalTime > existingTime) {
                                    vitalsByDate[dateKey] = vital;
                                }
                            }
                        }
                    });
                    return Object.values(vitalsByDate);
                };

                if (action.meta.arg.mode === ADD && action.meta.arg.pam_id !== 0) {
                    const updatedWithPamId = action.payload.filter((e) =>
                        e.pam_id == action.meta.arg.pam_id
                    );
                    state.selectedVitalsList = deduplicateByDate(updatedWithPamId);

                    const updatedWithoutPamId = action.payload.filter((e) =>
                        e.pam_id != action.meta.arg.pam_id
                    );
                    state.vitalsPastList = deduplicateByDate(updatedWithoutPamId);
                } else {
                    state.vitalsPastList = deduplicateByDate(action.payload);
                }
            })
            .addCase(getVitals.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getPatientBirthWeight.fulfilled, (state, action) => {
                state.patientBirthWeight = action?.payload?.birth_weight;
            })
            .addCase(getTodayWeight.fulfilled, (state, action) => {
                state.todayData = action.payload;
            })
            .addCase(getTodayWeight.rejected, (state) => {
                state.todayData = null;
            })
    },
});

export const { updateList } = vitalsSlice.actions
export default vitalsSlice.reducer;