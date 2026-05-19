function humanize(key) {
	return key
		.replace(/_/g, " ")
		.replace(/([A-Z])/g, " $1")
		.replace(/^./, (c) => c.toUpperCase())
		.trim();
}

function escapeHtml(value) {
	if (value == null) return "";
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

function rtfToHtml(rtf) {
	if (!rtf) return "";
	if (typeof rtf !== "string") return "";
	const looksLikeRtf = rtf.trim().startsWith("{\\rtf") || rtf.includes("\\par") || rtf.includes("\\b ");
	if (!looksLikeRtf) {
		return rtf
			.split(/\n{2,}/)
			.map((para) => `<p>${escapeHtml(para).replace(/\n/g, "<br/>")}</p>`)
			.join("");
	}
	const cleaned = rtf
		.replace(/\\par[d]?\b/g, "\n")
		.replace(/\\line\b/g, "\n")
		.replace(/\\(?:[a-zA-Z]+-?\d* ?|[^a-zA-Z])/g, "")
		.replace(/[{}]/g, "")
		.trim();
	return cleaned
		.split(/\n{2,}/)
		.map((para) => `<p>${escapeHtml(para).replace(/\n/g, "<br/>")}</p>`)
		.join("");
}

function unwrapSoapData(data) {
	if (!data) return null;
	if (typeof data === "string") return data;
	const candidates = [
		data,
		data.soap,
		data.soapNote,
		data.soapNotes,
		data.soap_note,
		data.soap_notes,
		data.notes,
		data.result,
		data.output,
		data.response
	];
	return candidates.find((item) => item && (typeof item === "string" || typeof item === "object")) ?? data;
}

export function soapToHtml(data) {
	const soap = unwrapSoapData(data);
	if (!soap) return "";
	if (typeof soap === "string") return rtfToHtml(soap);

	const sections = [
		{ key: "subjective", label: "Subjective" },
		{ key: "objective", label: "Objective" },
		{ key: "assessment", label: "Assessment" },
		{ key: "plan", label: "Plan" }
	];
	const hasStructuredSoap = sections.some(({ key }) => soap[key]);
	if (!hasStructuredSoap) {
		const values = Object.entries(soap)
			.filter(([, value]) => value != null && value !== "")
			.map(([key, value]) => `<h2>${escapeHtml(humanize(key))}</h2>${rtfToHtml(value) || `<p>${escapeHtml(value)}</p>`}`)
			.join("");
		return values || "<p><em>No SOAP note data was returned.</em></p>";
	}

	return sections
		.map(({ key, label }) => {
			let body = rtfToHtml(soap[key]) || "<p><em>Not mentioned.</em></p>";
			const labelRegex = new RegExp(`^(?:<p>)?\\s*(?:<strong>|<b>)?\\s*${label}\\s*(?:<\\/strong>|<\\/b>|:)?\\s*(?:<br\\s*\\/?>)?\\s*`, "i");
			body = body.replace(labelRegex, "<p>");
			if (body === "<p></p>" || body === "<p>") {
				body = "<p><em>Not documented.</em></p>";
			} else if (body.match(/^<p>\s*\(?Not documented\)?\s*<\/p>$/i)) {
				body = "<p><em>Not documented.</em></p>";
			}
			return `<h2>${label}</h2>${body}`;
		})
		.join("");
}
