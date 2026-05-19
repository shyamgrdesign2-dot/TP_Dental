import {
	postJson,
	withRetry,
	buildIdentityPayload,
	extractResultData,
	MODULE_TIMEOUT_MS
} from "./clinical-processing";

const SOAP_PATH = "/agents/get-soap-notes";
const SOAP_NAME = "SOAP";
const SOAP_TAB = "soap";

function hasSoapPreviousContext(value) {
	if (value === undefined || value === null) return false;
	if (typeof value === "string") return value.trim() !== "";
	if (Array.isArray(value)) return value.length > 0;
	if (typeof value === "object") return Object.keys(value).length > 0;
	return String(value).trim() !== "";
}

function buildSoapPayload(context, previousContext) {
	const payload = buildIdentityPayload(context);
	if (hasSoapPreviousContext(previousContext)) {
		payload.previous_context = { soap: previousContext };
	}
	return payload;
}

function runSoapModule({ context, previousContext, signal, onResult }) {
	return withRetry(() => postJson(SOAP_PATH, buildSoapPayload(context, previousContext), SOAP_NAME, { timeoutMs: MODULE_TIMEOUT_MS, signal }))
		.then((responseJson) => {
			const result = {
				name: SOAP_TAB,
				status: "fulfilled",
				data: extractResultData(responseJson)
			};
			onResult?.(SOAP_TAB, result);
			return result;
		})
		.catch((error) => {
			const result = { name: SOAP_TAB, status: "rejected", error: error.message };
			onResult?.(SOAP_TAB, result);
			return result;
		});
}

export async function generateSoapNote({ context, previousContext, signal, onResult }) {
	if (!context?.patientId || !context?.doctorId || !context?.sessionId) {
		throw new Error("Missing patient, doctor, or session id for SOAP generation.");
	}
	return runSoapModule({ context, previousContext, signal, onResult });
}

export function retrySoap({ context, previousContext, signal, onResult }) {
	onResult?.(SOAP_TAB, { name: SOAP_TAB, status: "pending" });
	return runSoapModule({ context, previousContext, signal, onResult });
}
