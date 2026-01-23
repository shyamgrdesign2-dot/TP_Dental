import api from "../../api/services/axiosService";
import config from "../../config";

const baseUrl = { customBaseUrl: config.gen_rx_api_url, timeout: 120000 };
const symptomsCollectorBaseUrl = {
  customBaseUrl: config.symptoms_collector_api_url,
  timeout: 120000,
};

// Use the same base URL as voice Rx (gen_rx_api_url) - ambient API is part of the same service
const ambientRxBaseUrl = {
  customBaseUrl: config.gen_rx_api_url || config.rx_digitization,
  timeout: parseInt(process.env.REACT_APP_AMBIENT_RX_TIMEOUT) || 300000,
  headers: {} // Headers will be set by axiosService interceptor using auth token
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
  const maxRetries = parseInt(process.env.REACT_APP_AMBIENT_RX_MAX_RETRIES) || 2;
  const ambientEndpoints = {
    create: '/api/v1/ambient-voice-rx/',
    update: '/api/v1/ambient-voice-rx/',
    get: '/api/v1/ambient-voice-rx/',
    edit: '/api/v1/ambient-voice-rx/',
    fhir: '/api/v1/ambient-voice-rx/fhir'
  };

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
          // For audio files, send FormData directly
          requestPayload = payload;
          config = {
            ...ambientRxBaseUrl,
            headers: {
              ...ambientRxBaseUrl.headers,
              'Content-Type': 'multipart/form-data'
            }
          };
        } else if (transcriptValue) {
          // For text transcripts, convert FormData to JSON
          const allFields = {};
          formDataEntries.forEach(([key, value]) => {
            if (key !== '') { 
              allFields[key] = value;
            }
          });
          
          // Handle voice_prescription_previous_context if present
          // API expects this as a string, not an object
          let previousContext = null;
          if (allFields.voice_prescription_previous_context) {
            // Keep it as a string - API expects string format
            previousContext = typeof allFields.voice_prescription_previous_context === 'string' 
              ? allFields.voice_prescription_previous_context
              : JSON.stringify(allFields.voice_prescription_previous_context);
          }
          
          requestPayload = {
            patientId: allFields.patientId || patientId || '',
            admissionId: allFields.admissionId || admissionId || null,
            doctorId: allFields.doctorId || parseInt(process.env.REACT_APP_AMBIENT_RX_DOCTOR_ID) || 456,
            hospitalId: allFields.hospitalId || parseInt(process.env.REACT_APP_AMBIENT_RX_HOSPITAL_ID) || 789,                                                                              
            voice_prescription_text: transcriptValue,
            // When data is in JSON format (text-only, no audio), source_duration should be 0
            source_duration: allFields.source_duration ? parseInt(allFields.source_duration) : 0,                           
            getConversation: allFields.getConversation !== undefined ? allFields.getConversation === 'true' || allFields.getConversation === true : (process.env.REACT_APP_AMBIENT_RX_GET_CONVERSATION === 'true' || true),                                                     
            schemaKey: allFields.schemaKey || process.env.REACT_APP_AMBIENT_RX_SCHEMA_KEY || "default"
          };
          
          // Add previous context if available - keep as string for API
          if (previousContext) {
            requestPayload.voice_prescription_previous_context = previousContext;
          }
          
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
      } else {
        // If payload is not FormData, use it directly
        requestPayload = payload;
        config = ambientRxBaseUrl;
      }

            console.log('🔵 Ambient Voice Rx - Creating:', {
        endpoint: ambientEndpoints.create,
        baseUrl: ambientRxBaseUrl.customBaseUrl,
        hasAudio: requestPayload instanceof FormData && Array.from(requestPayload.entries()).some(([key, value]) => value instanceof File),
        hasText: requestPayload instanceof FormData ? Array.from(requestPayload.entries()).some(([key, value]) => typeof value === 'string' && key === 'voice_prescription_text') : typeof requestPayload === 'object' && requestPayload.voice_prescription_text
      });
      
      const apiResponse = await api.post(ambientEndpoints.create, requestPayload, config);                                                               
      
      console.log('✅ Ambient Voice Rx - Response received:', {
        status: apiResponse?.status,
        hasData: !!apiResponse?.data,
        responseKeys: apiResponse?.data ? Object.keys(apiResponse.data) : []
      });
      
      if (apiResponse.data) {
        res = { success: true, data: apiResponse.data };
      } else {
        res = { success: true, data: apiResponse };
      }
      
      break;
    } catch (e) {
            console.error(`❌ Ambient Voice Rx - Error on attempt ${retryCount + 1}:`, {                                                                              
        message: e.message,
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        code: e.code,
        endpoint: ambientEndpoints.create
      });                                                                       

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
  const maxRetries = parseInt(process.env.REACT_APP_AMBIENT_RX_MAX_RETRIES) || 2;
  const ambientEndpoints = {
    create: '/api/v1/ambient-voice-rx/',
    update: '/api/v1/ambient-voice-rx/',
    get: '/api/v1/ambient-voice-rx/',
    edit: '/api/v1/ambient-voice-rx/',
    fhir: '/api/v1/ambient-voice-rx/fhir'
  };

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
          // For audio files, send FormData directly
          requestPayload = payload;
          config = {
            ...ambientRxBaseUrl,
            headers: {
              ...ambientRxBaseUrl.headers,
              'Content-Type': 'multipart/form-data'
            }
          };
        } else if (transcriptValue) {
          // For text transcripts, convert FormData to JSON
          const allFields = {};
          formDataEntries.forEach(([key, value]) => {
            if (key !== '') { 
              allFields[key] = value;
            }
          });
          
          // Handle voice_prescription_previous_context if present
          // API expects this as a string, not an object
          let previousContext = null;
          if (allFields.voice_prescription_previous_context) {
            // Keep it as a string - API expects string format
            previousContext = typeof allFields.voice_prescription_previous_context === 'string' 
              ? allFields.voice_prescription_previous_context
              : JSON.stringify(allFields.voice_prescription_previous_context);
          }
         
          requestPayload = {
            doctorId: allFields.doctorId || parseInt(process.env.REACT_APP_AMBIENT_RX_DOCTOR_ID) || 456,
            patientId: allFields.patientId || patientId || '',
            hospitalId: allFields.hospitalId || parseInt(process.env.REACT_APP_AMBIENT_RX_HOSPITAL_ID) || 789,                                                                              
            admissionId: allFields.admissionId || admissionId || null,
            schemaKey: allFields.schemaKey || process.env.REACT_APP_AMBIENT_RX_SCHEMA_KEY || "default",
            // When data is in JSON format (text-only, no audio), source_duration should be 0
            source_duration: allFields.source_duration ? parseInt(allFields.source_duration) : 0,                     
            voice_prescription_text: transcriptValue,
            getConversation: allFields.getConversation !== undefined ? allFields.getConversation === 'true' || allFields.getConversation === true : (process.env.REACT_APP_AMBIENT_RX_GET_CONVERSATION === 'true' || true)                                                      
          };
          
          // Add previous context if available - keep as string for API
          if (previousContext) {
            requestPayload.voice_prescription_previous_context = previousContext;
          }
          
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
      } else {
        // If payload is not FormData, use it directly
        requestPayload = payload;
        config = ambientRxBaseUrl;
      }

        
      console.log('🔵 Ambient Voice Rx - Updating:', {
        endpoint: `${ambientEndpoints.update}${id}`,
        baseUrl: ambientRxBaseUrl.customBaseUrl,
        id: id,
        hasAudio: requestPayload instanceof FormData && Array.from(requestPayload.entries()).some(([key, value]) => value instanceof File),
        hasText: requestPayload instanceof FormData ? Array.from(requestPayload.entries()).some(([key, value]) => typeof value === 'string' && key === 'voice_prescription_text') : typeof requestPayload === 'object' && requestPayload.voice_prescription_text
      });
      
      const apiResponse = await api.put(`${ambientEndpoints.update}${id}`, requestPayload, config);                                                               
      
      console.log('✅ Ambient Voice Rx - Update response received:', {
        status: apiResponse?.status,
        hasData: !!apiResponse?.data,
        responseKeys: apiResponse?.data ? Object.keys(apiResponse.data) : []
      });
    
      if (apiResponse.data) {
        res = { success: true, data: apiResponse.data };
      } else {
        res = { success: true, data: apiResponse };
      }
      
      break;
    } catch (e) {
      console.error(`❌ Ambient Voice Rx - Update error on attempt ${retryCount + 1}:`, {
        message: e.message,
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        code: e.code,
        endpoint: `${ambientEndpoints.update}${id}`
      });
      
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
  const ambientEndpoints = {
    create: '/api/v1/ambient-voice-rx/',
    update: '/api/v1/ambient-voice-rx/',
    get: '/api/v1/ambient-voice-rx/',
    edit: '/api/v1/ambient-voice-rx/',
    fhir: '/api/v1/ambient-voice-rx/fhir'
  };
  try {
    res = await api.patch(`${ambientEndpoints.edit}${id}`, payload, ambientRxBaseUrl);
  } catch (e) {
    console.error("Error while editing ambient rx: ", e);
  }
  return res;
};

export const getAmbientRx = async function (id) {
  let res = {};
  const ambientEndpoints = {
    create: '/api/v1/ambient-voice-rx/',
    update: '/api/v1/ambient-voice-rx/',
    get: '/api/v1/ambient-voice-rx/',
    edit: '/api/v1/ambient-voice-rx/',
    fhir: '/api/v1/ambient-voice-rx/fhir'
  };
  try {
    console.log('🔵 Ambient Voice Rx - Fetching:', {
      endpoint: `${ambientEndpoints.get}${id}`,
      baseUrl: ambientRxBaseUrl.customBaseUrl,
      id: id
    });
    
    res = await api.get(`${ambientEndpoints.get}${id}`, ambientRxBaseUrl);
    
    console.log('✅ Ambient Voice Rx - Fetch response received:', {
      status: res?.status,
      hasData: !!res?.data,
      responseKeys: res?.data ? Object.keys(res.data) : []
    });
  } catch (e) {
    console.error("❌ Error while fetching ambient rx details: ", {
      message: e.message,
      status: e.response?.status,
      statusText: e.response?.statusText,
      data: e.response?.data,
      code: e.code,
      endpoint: `${ambientEndpoints.get}${id}`
    });
  }
  return res;
};

export const editAmbientRx = async function (payload, id) {
  let res = {};
  const ambientEndpoints = {
    create: '/api/v1/ambient-voice-rx/',
    update: '/api/v1/ambient-voice-rx/',
    get: '/api/v1/ambient-voice-rx/',
    edit: '/api/v1/ambient-voice-rx/',
    fhir: '/api/v1/ambient-voice-rx/fhir'
  };
  try {
    res = await api.patch(`${ambientEndpoints.edit}${id}`, payload, ambientRxBaseUrl);
  } catch (e) {
    console.error("Error while editing ambient rx: ", e);
  }
  return res;
};

export const fhirBundleAmbientRx = async function (payload) {
  let res = {};
  const ambientEndpoints = {
    fhir: '/api/v1/ambient-voice-rx/fhir'
  };
  try {
    console.log('🔵 Ambient Voice Rx - FHIR Bundle:', {
      endpoint: ambientEndpoints.fhir,
      baseUrl: ambientRxBaseUrl.customBaseUrl
    });
    
    res = await api.post(ambientEndpoints.fhir, payload, ambientRxBaseUrl);
    
    console.log('✅ Ambient Voice Rx - FHIR Bundle response received:', {
      status: res?.status,
      hasData: !!res?.data
    });
  } catch (e) {
    console.error("❌ Error while calling fhir bundle for ambient rx: ", {
      message: e.message,
      status: e.response?.status,
      statusText: e.response?.statusText,
      data: e.response?.data,
      code: e.code,
      endpoint: ambientEndpoints.fhir
    });
  }
  return res;
};

export const copyVoiceRx = async function (id, newAppointmentId) {
  let res = { success: false };
  try {
    const response = await api.post(
      `/api/v1/voice-digitize/copy-rx/${id}`,
      { newAppointmentId },
      baseUrl
    );
    if (response?.data) {
      res = { success: true, data: response.data };
    } else {
      res = { success: true, data: response };
    }
  } catch (e) {
    console.error("Error while copying voice rx: ", e);
    res = { 
      success: false, 
      error: e.message,
      status: e.response?.status,
      statusText: e.response?.statusText
    };
  }
  return res;
};

export const copyAmbientRx = async function (id, newAppointmentId) {
  let res = { success: false };
  try {
    const response = await api.post(
      `/api/v1/ambient-voice-rx/copy-rx/${id}`,
      { newAppointmentId },
      ambientRxBaseUrl
    );
    if (response?.data) {
      res = { success: true, data: response.data };
    } else {
      res = { success: true, data: response };
    }
  } catch (e) {
    console.error("Error while copying ambient rx: ", e);
    res = { 
      success: false, 
      error: e.message,
      status: e.response?.status,
      statusText: e.response?.statusText
    };
  }
  return res;
};