import api from "../../api/services/axiosService";
import config from "../../config";

const baseUrl = { customBaseUrl: config.gen_rx_api_url, timeout: 120000 };
const symptomsCollectorBaseUrl = {
  customBaseUrl: config.symptoms_collector_api_url,
  timeout: 120000,
};

const getAmbientRxConfig = () => {
  return {
    baseUrl: config.ambient_rx_api_url,
    timeout: parseInt(process.env.REACT_APP_AMBIENT_RX_TIMEOUT) || 300000,
    headers: {
      'Authorization': process.env.REACT_APP_AMBIENT_RX_AUTH_TOKEN || `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsidXNlcl9pZCI6MTIzLCJkb2N0b3JfaWQiOjQ1NiwiaG9zcGl0YWxfaWQiOjc4OX0sImlhdCI6MTc2MDI1ODQ4MH0.2XAlSZqM8xL1TR8bKLB0jvUQr_CUFlTbLXGeR_i13iw`
    },
    endpoints: {
      create: '/api/v1/ambient-voice-rx/create-ambient-voice-rx',
      update: '/api/v1/ambient-voice-rx/update-ambient-voice',
      get: '/api/v1/ambient-voice-rx/get-ambient-voice',
      edit: '/api/v1/ambient-voice-rx/edit-ambient-voice'
    },
    defaults: {
      doctorId: parseInt(process.env.REACT_APP_AMBIENT_RX_DOCTOR_ID) || 456,
      hospitalId: parseInt(process.env.REACT_APP_AMBIENT_RX_HOSPITAL_ID) || 789,
      sourceDuration: parseInt(process.env.REACT_APP_AMBIENT_RX_SOURCE_DURATION) || 45000,
      updateSourceDuration: parseInt(process.env.REACT_APP_AMBIENT_RX_UPDATE_SOURCE_DURATION) || 30,
      schemaKey: process.env.REACT_APP_AMBIENT_RX_SCHEMA_KEY || "default",
      getConversation: process.env.REACT_APP_AMBIENT_RX_GET_CONVERSATION === 'true' || true
    },
    retry: {
      maxRetries: parseInt(process.env.REACT_APP_AMBIENT_RX_MAX_RETRIES) || 2,
      retryDelay: parseInt(process.env.REACT_APP_AMBIENT_RX_RETRY_DELAY) || 1000
    }
  };
};

const ambientRxBaseUrl = {
  customBaseUrl: getAmbientRxConfig().baseUrl,
  timeout: getAmbientRxConfig().timeout,
  headers: getAmbientRxConfig().headers
};
const rxDigitizationBaseUrl = {
  customBaseUrl: config.rx_digitization,
  timeout: 300000,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiZG9jdG9yX3VuaXF1ZV9pZCI6InhMd0hVRTNzSld6YUZmVCIsIm1vYmlsZV9ubyI6Ijk2ODY5OTc1NDIiLCJjbGluaWNfaWQiOjM5MCwiaG9zcGl0YWxfYnVzaW5lc3NfaWQiOjM5Njc0MTcxOTkwNjcwMCwidXNlcl9pZCI6NTI0LCJhZG1pbiI6MSwic2VhcmNoV2l0aCI6IlQiLCJpbmRpdmlkdWFsUHJlc2VudGF0aW9uIjoiTiIsInRlbXBsYXRlTm90ZXNIaWRlIjoiTiJ9LCJpYXQiOjE3MzgxNTA2NzgsImV4cCI6MTc2OTcwODI3OH0.lT-QbGC5uQrnSCa7gemMHgOtLl5NhUnEzbmUT09QTlM`
  }
};

export const generateRx = async function (payload) {
  let res = {};
  try {
    res = await api.post(`/api/v1/voice-digitize`, payload, baseUrl);
  } catch (e) {
    console.error("Error while generating rx: ", e);
  }
  return res;
};

export const updateGenRx = async function (payload, id) {
  let res = {};
  try {
    res = await api.put(`/api/v1/voice-digitize/${id}`, payload, baseUrl);
  } catch (e) {
    console.error("Error while updating gen rx: ", e);
  }
  return res;
};

export const editGenRxDetails = async function (payload, id) {
  let res = {};
  try {
    res = await api.patch(`/api/v1/voice-digitize/${id}`, payload, baseUrl);
  } catch (e) {
    console.error("Error while updating gen rx: ", e);
  }
  return res;
};

export const getGenRx = async function (id) {
  let res = {};
  try {
    res = await api.get(`/api/v1/voice-digitize/${id}`, baseUrl);
  } catch (e) {
    console.error("Error while fetching patient gynec details: ", e);
  }
  return res;
};

export const fetchSymptomsCollectorData = async function (payload) {
  let res = {};
  try {
    res = await api.post(
      `/api/v1/agents/get-symptoms`,
      payload,
      symptomsCollectorBaseUrl
    );
  } catch (e) {
    console.error("Error while fetching symptoms collector data: ", e);
  }
  return res;
};

export const checkSymptomsCollectorTour = async function (payload) {
  let res = {};
  try {
    res = await api.post(
      `/api/v1/agents/get-appointment-ids`,
      payload,
      symptomsCollectorBaseUrl
    );
    res = res?.pam_ids?.length === 1;
  } catch (e) {
    console.error("Error while checking symptoms collector tour: ", e);
  }
  return res;
};

export const setAddToRx = async function (payload) {
  try {
    await api.post(
      `/api/v1/agents/set-add-to-rx`,
      payload,
      symptomsCollectorBaseUrl
    );
  } catch (e) {
    console.error("Error while setting add to rx: ", e);
  }
};

export const generateAmbientRx = async function (payload, patientId, admissionId) {
  let res = {};
  let retryCount = 0;
  const ambientConfig = getAmbientRxConfig();
  const maxRetries = ambientConfig.retry.maxRetries;

  while (retryCount <= maxRetries) {
    let requestPayload = payload;
    let config = ambientRxBaseUrl;
    
    try {

      if (payload instanceof FormData) {
      
        const formDataEntries = Array.from(payload.entries());
        // Accept either anonymous key "" or explicit keys like "file"/"voice_prescription_text"
        const audioFile = formDataEntries.find(([key, value]) => (key === '' || key === 'file') && value instanceof File)?.[1];
        const transcriptValue = formDataEntries.find(([key, value]) => (key === '' || key === 'voice_prescription_text') && typeof value === 'string' && value.trim() !== '')?.[1];
        
        if (audioFile) {
        
          requestPayload = payload;
          config = {
            ...ambientRxBaseUrl,
            headers: {
              ...ambientRxBaseUrl.headers,
              'Content-Type': 'multipart/form-data'
            }
          };
        } else if (transcriptValue) {
         
          const allFields = {};
          formDataEntries.forEach(([key, value]) => {
            if (key !== '') { 
              allFields[key] = value;
            }
          });
          
          requestPayload = {
            patientId: allFields.patientId || patientId,
            admissionId: allFields.admissionId || admissionId,
            doctorId: allFields.doctorId || ambientConfig.defaults.doctorId,
            hospitalId: allFields.hospitalId || ambientConfig.defaults.hospitalId,
            voice_prescription_text: transcriptValue,
            source_duration: allFields.source_duration || ambientConfig.defaults.sourceDuration,
            getConversation: ambientConfig.defaults.getConversation
          };
          
          config = {
            ...ambientRxBaseUrl,
            headers: {
              ...ambientRxBaseUrl.headers,
              'Content-Type': 'application/json'
            }
          };
        } else {
          throw new Error('Either audio file or transcript text must be provided');
        }
      }

      const apiResponse = await api.post(ambientConfig.endpoints.create, requestPayload, config);
      
      
      if (apiResponse.data) {
       
        res = { success: true, data: apiResponse.data };
      } else {
        
        res = { success: true, data: apiResponse };
      }
      
      break;
    } catch (e) {
      console.error(`Ambient Voice Rx - Error on attempt ${retryCount + 1}:`, e.message);

      if (e.response?.status === 504 || e.code === 'ECONNABORTED' || e.message?.includes('timeout') || e.message?.includes('Network Error')) {
        retryCount++;
        if (retryCount <= maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          continue;
        }
      }

      throw e;
    }
  }

  return res;
};

export const updateAmbientRx = async function (payload, id, patientId, admissionId) {
  let res = {};
  let retryCount = 0;
  const ambientConfig = getAmbientRxConfig();
  const maxRetries = ambientConfig.retry.maxRetries;

  while (retryCount <= maxRetries) {
    let requestPayload = payload;
    let config = ambientRxBaseUrl;
    
    try {
      if (payload instanceof FormData) {
        const formDataEntries = Array.from(payload.entries());
        // Accept either anonymous key "" or explicit keys like "file"/"voice_prescription_text"
        const audioFile = formDataEntries.find(([key, value]) => (key === '' || key === 'file') && value instanceof File)?.[1];
        const transcriptValue = formDataEntries.find(([key, value]) => (key === '' || key === 'voice_prescription_text') && typeof value === 'string' && value.trim() !== '')?.[1];

        if (audioFile) {
        
          requestPayload = payload;
          config = {
            ...ambientRxBaseUrl,
            headers: {
              ...ambientRxBaseUrl.headers,
              'Content-Type': 'multipart/form-data'
            }
          };
        } else if (transcriptValue) {
         
          requestPayload = {
            doctorId: formDataEntries.find(([key]) => key === 'doctorId')?.[1] || ambientConfig.defaults.doctorId,
            patientId: formDataEntries.find(([key]) => key === 'patientId')?.[1] || patientId,
            hospitalId: formDataEntries.find(([key]) => key === 'hospitalId')?.[1] || ambientConfig.defaults.hospitalId,
            admissionId: formDataEntries.find(([key]) => key === 'admissionId')?.[1] || admissionId,
            schemaKey: ambientConfig.defaults.schemaKey,
            source_duration: formDataEntries.find(([key]) => key === 'source_duration')?.[1] || ambientConfig.defaults.updateSourceDuration,
            voice_prescription_text: transcriptValue,
            getConversation: ambientConfig.defaults.getConversation
          };
          config = {
            ...ambientRxBaseUrl,
            headers: {
              ...ambientRxBaseUrl.headers,
              'Content-Type': 'application/json'
            }
          };
        } else {
          throw new Error('Either audio file or transcript text must be provided');
        }
      }

    
      const apiResponse = await api.put(`${ambientConfig.endpoints.update}/${id}`, requestPayload, config);
      
    
      if (apiResponse.data) {
       
        res = { success: true, data: apiResponse.data };
      } else {
        
        res = { success: true, data: apiResponse };
      }
      
      break;
    } catch (e) {
      console.error(`Update Ambient Voice Rx - Error on attempt ${retryCount + 1}:`, e.message);
      
      if (e.response?.status === 504 || e.code === 'ECONNABORTED' || e.message?.includes('timeout') || e.message?.includes('Network Error')) {
        retryCount++;
        if (retryCount <= maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          continue;
        }
      }

      throw e;
    }
  }

  return res;
};

export const editAmbientRxDetails = async function (payload, id) {
  let res = {};
  const ambientConfig = getAmbientRxConfig();
  try {
    res = await api.patch(`${ambientConfig.endpoints.edit}/${id}`, payload, ambientRxBaseUrl);
  } catch (e) {
    console.error("Error while editing ambient rx: ", e);
  }
  return res;
};

export const getAmbientRx = async function (id) {
  let res = {};
  const ambientConfig = getAmbientRxConfig();
  try {
    res = await api.get(`${ambientConfig.endpoints.get}/${id}`, ambientRxBaseUrl);
  } catch (e) {
    console.error("Error while fetching ambient rx details: ", e);
  }
  return res;
};

export const editAmbientRx = async function (payload, id) {
  let res = {};
  const ambientConfig = getAmbientRxConfig();
  try {
    res = await api.patch(`${ambientConfig.endpoints.edit}/${id}`, payload, ambientRxBaseUrl);
  } catch (e) {
    console.error("Error while editing ambient rx: ", e);
  }
  return res;
};