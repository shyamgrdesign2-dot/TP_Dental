import { env } from '../../../../EnvironmentConfig';

function normalizeBaseUrl(url) {
	return (url || '').trim().replace(/\/+$/, '');
}

export const CLINICAL_API_BASE_URL =
	normalizeBaseUrl(process.env.REACT_APP_CLINICAL_API_BASE_URL) ||
	'https://pm-digitise-transcription-uat.tatvacare.in';

export const CLINICAL_API_BEARER_TOKEN =
	(process.env.REACT_APP_CLINICAL_API_BEARER_TOKEN || '').trim() ||
	(process.env.REACT_APP_VOICE_EXTRACT_BEARER_TOKEN || '').trim();

export const AGENT_MODULE_API_BASE_URL =
	normalizeBaseUrl(env?.agent_module_api_base_url) ||
	'https://pm-digitise-transcription-uat.tatvacare.in';

export function joinClinicalApiUrl(path) {
	if (!CLINICAL_API_BASE_URL) {
		throw new Error('Clinical API base URL is not configured.');
	}
	return `${CLINICAL_API_BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

export function joinAgentModuleApiUrl(path) {
	const configuredUrl = AGENT_MODULE_API_BASE_URL.replace(/\/+$/, '');
	const requestedPath = (path || '').replace(/^\/+/, '');

	if (!requestedPath) {
		return configuredUrl;
	}

	return `${configuredUrl}/${requestedPath}`;
}

export function buildClinicalApiHeaders({ includeContentType = true } = {}) {
	const headers = includeContentType ? { 'Content-Type': 'application/json' } : {};

	if (CLINICAL_API_BEARER_TOKEN) {
		headers.Authorization = CLINICAL_API_BEARER_TOKEN.startsWith('Bearer ')
			? CLINICAL_API_BEARER_TOKEN
			: `Bearer ${CLINICAL_API_BEARER_TOKEN}`;
	}

	return headers;
}
