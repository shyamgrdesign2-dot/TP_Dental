import api from "./axiosService";
import config from "../../config";
import {
  NEO_LOCAL_GATEWAY,
  neoDebug,
  neoDebugError,
  neoDebugWarn,
  getNeoVoiceSessionId,
  setNeoVoiceSessionId,
} from "../../utils/neoConsultationUtils";

// Neo voice digitize API:
// - proxy mode ON  (REACT_APP_NEO_USE_LOCAL_PROXY=true): use relative path and CRA
//   proxy forwards /api/v1/digitization/* -> localhost:3021 (prevents browser CORS)
// - proxy mode OFF: call localhost:3021 directly via customBaseUrl
const useNeoLocalProxy = process.env.REACT_APP_NEO_USE_LOCAL_PROXY === "true";
const neoLocalRequestConfig = {
  ...(!useNeoLocalProxy && { customBaseUrl: NEO_LOCAL_GATEWAY }),
  timeout: parseInt(process.env.REACT_APP_AMBIENT_RX_TIMEOUT, 10) || 300000,
};

const neoLocalVoiceRequestConfig = {
  ...neoLocalRequestConfig,
  headers: {
    "Content-Type": "application/json",
  },
};

const neoUploadUatRequestConfig = {
  customBaseUrl: config.snap_rx_api_url,
  timeout: parseInt(process.env.REACT_APP_AMBIENT_RX_TIMEOUT, 10) || 300000,
};

const generateCorrelationId = () =>
  `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const uploadNeoVoiceAudio = async (audioFile) => {
  if (!audioFile || !(audioFile instanceof File)) {
    neoDebugError("[upload] invalid file", { audioFile });
    throw new Error("Invalid audio file for Neo upload");
  }

  const uploadUrl = `${config.snap_rx_api_url}/api/v1/digitization/voice/upload`;
  neoDebug("[upload] POST UAT digitization", {
    url: uploadUrl,
    name: audioFile.name,
    size: audioFile.size,
    type: audioFile.type,
  });

  const formData = new FormData();
  formData.append("file", audioFile, audioFile.name || "neo_recording.wav");

  try {
    // Multipart upload — let the browser set Content-Type with its boundary,
    // so we explicitly omit headers here rather than inheriting the JSON ones.
    const response = await api.post(
      "/api/v1/digitization/voice/upload",
      formData,
      neoUploadUatRequestConfig
    );
    neoDebug("[upload] UAT response", response);
    return response;
  } catch (err) {
    neoDebugError("[upload] UAT digitization failed", {
      url: uploadUrl,
      message: err?.message,
      status: err?.response?.status,
      data: err?.response?.data,
      hint: "Check UAT digitization service and auth token",
    });
    throw err;
  }
};

/**
 * Local voice digitize — same contract as:
 * POST http://localhost:3021/api/v1/digitization/voice?id=...&um_id=...
 * Headers: Authorization, Content-Type, x-correlation-id
 */
export const digitizeNeoConsultation = async ({
  prescriptionUrl,
  sourceDuration,
  umId,
  voiceSessionId,
  consent,
  correlationId,
}) => {
  const resolvedCorrelationId = correlationId || generateCorrelationId();
  window.__TATVA_VOICE_SESSION_ID = resolvedCorrelationId;

  const resolvedVoiceId = voiceSessionId || getNeoVoiceSessionId();

  const payload = {
    prescriptionUrls: [prescriptionUrl],
    sourceDuration: Math.round(sourceDuration || 0),
    needConversation: true,
    consent: consent || {
      timestamp: Date.now(),
      ip: "",
      given: true,
    },
    text: "",
    type: "AUDIO_NO_CONTEXT",
    version: "v2",
    previousContext: {},
    correlationId: resolvedCorrelationId,
  };

  const queryParams = [];
  if (resolvedVoiceId) {
    queryParams.push(`id=${encodeURIComponent(resolvedVoiceId)}`);
  }
  if (umId) {
    queryParams.push(`um_id=${encodeURIComponent(umId)}`);
  }

  let endpoint = "/api/v1/digitization/voice";
  if (queryParams.length) {
    endpoint += `?${queryParams.join("&")}`;
  }

  const fullUrl = useNeoLocalProxy
    ? `${window.location.origin}${endpoint}`
    : `${NEO_LOCAL_GATEWAY}${endpoint}`;

  neoDebug("[digitize] POST local voice API", {
    method: "POST",
    url: fullUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <from app login>",
      "x-correlation-id": resolvedCorrelationId,
    },
    body: payload,
  });

  try {
    const apiResponse = await api.post(
      endpoint,
      payload,
      neoLocalVoiceRequestConfig
    );

    const responseData = apiResponse?.data ?? apiResponse;
    const newSessionId =
      responseData?.data?._id ?? responseData?._id ?? null;
    if (newSessionId) {
      setNeoVoiceSessionId(newSessionId);
      neoDebug("[digitize] saved voice session id for next call", newSessionId);
    }

    neoDebug("[digitize] local response", apiResponse);
    return apiResponse?.data
      ? { success: true, data: apiResponse.data }
      : { success: true, data: apiResponse };
  } catch (err) {
    neoDebugError("[digitize] local voice API failed", {
      url: fullUrl,
      message: err?.message,
      status: err?.response?.status,
      data: err?.response?.data,
      hint: "Start local gateway on :3021 and enable CORS for your React origin",
    });
    throw err;
  }
};

export const processNeoRecording = async ({
  audioBlob,
  neoFilename,
  neoFileUrl,
  recordingSource = "websocket",
  umId,
  voiceSessionId,
  consent,
  sourceDuration: sourceDurationOverride,
}) => {
  const fileName = neoFilename || `neo_recording_${Date.now()}.wav`;

  neoDebug("[processNeoRecording] start", {
    recordingSource,
    neoFilename: fileName,
    neoFileUrl,
    blobSize: audioBlob?.size,
    umId,
    voiceSessionId: voiceSessionId || getNeoVoiceSessionId(),
    localGateway: NEO_LOCAL_GATEWAY,
  });

  const audioFile = new File([audioBlob], fileName, {
    type: audioBlob.type || "audio/wav",
  });

  let sourceDuration =
    typeof sourceDurationOverride === "number" && sourceDurationOverride > 0
      ? sourceDurationOverride
      : 0;

  if (!sourceDuration) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      sourceDuration = audioBuffer.duration;
      await audioContext.close?.();
    } catch (decodeErr) {
      neoDebugWarn("[processNeoRecording] duration fallback 30s", decodeErr);
      sourceDuration = 30;
    }
  }

  const uploadResponse = await uploadNeoVoiceAudio(audioFile);
  const prescriptionUrl =
    uploadResponse?.data?.prescriptionUrl ?? uploadResponse?.prescriptionUrl;

  if (!prescriptionUrl) {
    throw new Error("Failed to upload Neo recording — no prescriptionUrl from UAT");
  }

  neoDebug("[processNeoRecording] UAT upload OK", { prescriptionUrl });

  const correlationId = generateCorrelationId();

  const digitizeResponse = await digitizeNeoConsultation({
    prescriptionUrl,
    sourceDuration,
    umId,
    voiceSessionId,
    consent,
    correlationId,
  });

  return {
    prescriptionUrl,
    sourceDuration,
    correlationId,
    neoFilename: fileName,
    neoFileUrl,
    recordingSource,
    digitizeResponse,
  };
};
