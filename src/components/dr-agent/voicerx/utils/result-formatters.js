function escapeHtml(value) {
	if (value == null) return '';
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function humanize(key) {
	return key
		.replace(/_/g, ' ')
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, (c) => c.toUpperCase())
		.trim();
}

function kvList(label, obj, keyOrder) {
	const keys = keyOrder ?? Object.keys(obj || {});
	const rows = keys
		.map((k) => {
			const v = obj?.[k];
			if (v == null || v === '') return '';
			return `<li><strong>${escapeHtml(humanize(k))}:</strong> ${escapeHtml(v)}</li>`;
		})
		.filter(Boolean)
		.join('');
	if (!rows) return '';
	return `<h3>${label}</h3><ul>${rows}</ul>`;
}

function arraySection(label, arr, formatter) {
	if (!arr?.length) return '';
	const items = arr
		.map((it) => formatter(it))
		.filter((item) => item && item.replace(/<[^>]*>/g, '').trim())
		.map((item) => `<li>${item}</li>`)
		.join('');
	if (!items) return '';
	return `<h3>${label}</h3><ul>${items}</ul>`;
}

function field(data, camelKey, snakeKey) {
	return data?.[camelKey] ?? data?.[snakeKey];
}

export function digitizationToHtml(data) {
	if (!data) return '';
	const out = [];
	const patientDetails = field(data, 'patientDetails', 'patient_details');
	const vitals = field(data, 'vitalsAndBodyComposition', 'vitals_and_body_composition');
	const medicalHistory = field(data, 'medicalHistory', 'medical_history');
	const labInvestigation = field(data, 'labInvestigation', 'lab_investigation');
	const followUp = field(data, 'followUp', 'follow_up');

	out.push(kvList('Patient Details', patientDetails, ['name', 'age', 'gender', 'blood_group', 'bloodGroup', 'notes']));
	out.push(kvList('Vitals & Body Composition', vitals));

	out.push(
		arraySection('Symptoms', data.symptoms, (s) => {
			const meta = [s.duration, s.severity, s.notes].filter(Boolean).map(escapeHtml).join(' · ');
			return `<strong>${escapeHtml(s.name || '')}</strong>${meta ? ` — ${meta}` : ''}`;
		})
	);

	out.push(
		arraySection('Examinations', data.examinations, (e) => {
			return `<strong>${escapeHtml(e.name || '')}</strong>${e.notes ? ` — ${escapeHtml(e.notes)}` : ''}`;
		})
	);

	out.push(
		arraySection('Diagnosis', data.diagnosis, (d) => {
			const meta = [d.status, d.since, d.notes].filter(Boolean).map(escapeHtml).join(' · ');
			return `<strong>${escapeHtml(d.name || '')}</strong>${meta ? ` — ${meta}` : ''}`;
		})
	);

	out.push(
		arraySection('Medications', data.medications, (m) => {
			const meta = [m.dosage, m.frequency, m.schedule, m.duration, m.notes]
				.filter(Boolean)
				.map(escapeHtml)
				.join(' · ');
			return `<strong>${escapeHtml(m.name || '')}</strong>${meta ? ` — ${meta}` : ''}`;
		})
	);

	out.push(
		arraySection('Medical History', medicalHistory, (h) => {
			const meta = [h.type, h.duration, h.relation, h.notes].filter(Boolean).map(escapeHtml).join(' · ');
			return `<strong>${escapeHtml(h.name || '')}</strong>${meta ? ` — ${meta}` : ''}`;
		})
	);

	out.push(
		arraySection('Lab Investigations', labInvestigation, (l) => {
			const meta = [l.instruction, l.notes].filter(Boolean).map(escapeHtml).join(' · ');
			return `<strong>${escapeHtml(l.name || '')}</strong>${meta ? ` — ${meta}` : ''}`;
		})
	);

	const advice = data.advice?.filter((a) => a != null && String(a).trim()) ?? [];
	if (advice.length) {
		const items = advice.map((a) => `<li>${escapeHtml(a)}</li>`).join('');
		out.push(`<h3>Advice</h3><ul>${items}</ul>`);
	}

	if (followUp != null && String(followUp).trim()) {
		out.push(`<h3>Follow-up</h3><p>${escapeHtml(followUp)}</p>`);
	}

	out.push(arraySection('Other Notes', data.others, (o) => escapeHtml(o)));

	const html = out.filter(Boolean).join('');
	return html || '<p><em>No data extracted.</em></p>';
}

function kvSectionItems(obj, keyOrder) {
	if (!obj) return [];
	const keys = keyOrder ?? Object.keys(obj);
	return keys
		.map((k) => {
			const v = obj?.[k];
			if (v == null || v === '') return null;
			return `${humanize(k)}: ${v}`;
		})
		.filter(Boolean);
}

function arraySectionItems(arr, formatter) {
	if (!arr?.length) return [];
	return arr
		.map((it) => formatter(it))
		.filter((s) => s && String(s).trim());
}

export function digitizationToSections(data) {
	if (!data) return [];
	const sections = [];

	const patientDetails = field(data, 'patientDetails', 'patient_details');
	const items0 = kvSectionItems(patientDetails, ['name', 'age', 'gender', 'blood_group', 'bloodGroup', 'notes']);
	if (items0.length) sections.push({ id: 'patient-details', title: 'Patient Details', items: items0 });

	const vitals = field(data, 'vitalsAndBodyComposition', 'vitals_and_body_composition');
	const items1 = kvSectionItems(vitals);
	if (items1.length) sections.push({ id: 'vitals', title: 'Vitals & Body Composition', items: items1 });

	const items2 = arraySectionItems(data.symptoms, (s) => {
		const meta = [s.duration, s.severity, s.notes].filter(Boolean).join(' · ');
		return meta ? `${s.name || ''} — ${meta}` : (s.name || '');
	});
	if (items2.length) sections.push({ id: 'symptoms', title: 'Symptoms', items: items2 });

	const items3 = arraySectionItems(data.examinations, (e) => {
		return e.notes ? `${e.name || ''} — ${e.notes}` : (e.name || '');
	});
	if (items3.length) sections.push({ id: 'examinations', title: 'Examinations', items: items3 });

	const items4 = arraySectionItems(data.diagnosis, (d) => {
		const meta = [d.status, d.since, d.notes].filter(Boolean).join(' · ');
		return meta ? `${d.name || ''} — ${meta}` : (d.name || '');
	});
	if (items4.length) sections.push({ id: 'diagnosis', title: 'Diagnosis', items: items4 });

	const items5 = arraySectionItems(data.medications, (m) => {
		const meta = [m.dosage, m.frequency, m.schedule, m.duration, m.notes].filter(Boolean).join(' · ');
		return meta ? `${m.name || ''} — ${meta}` : (m.name || '');
	});
	if (items5.length) sections.push({ id: 'medications', title: 'Medications', items: items5 });

	const medicalHistory = field(data, 'medicalHistory', 'medical_history');
	const items6 = arraySectionItems(medicalHistory, (h) => {
		const meta = [h.type, h.duration, h.relation, h.notes].filter(Boolean).join(' · ');
		return meta ? `${h.name || ''} — ${meta}` : (h.name || '');
	});
	if (items6.length) sections.push({ id: 'medical-history', title: 'Medical History', items: items6 });

	const labInvestigation = field(data, 'labInvestigation', 'lab_investigation');
	const items7 = arraySectionItems(labInvestigation, (l) => {
		const meta = [l.instruction, l.notes].filter(Boolean).join(' · ');
		return meta ? `${l.name || ''} — ${meta}` : (l.name || '');
	});
	if (items7.length) sections.push({ id: 'lab-investigation', title: 'Lab Investigations', items: items7 });

	const advice = (data.advice ?? []).filter((a) => a != null && String(a).trim());
	if (advice.length) sections.push({ id: 'advice', title: 'Advice', items: advice.map(String) });

	const followUp = field(data, 'followUp', 'follow_up');
	if (followUp != null && String(followUp).trim()) {
		sections.push({ id: 'follow-up', title: 'Follow-up', items: [String(followUp)] });
	}

	const others = (data.others ?? []).filter((o) => o != null && String(o).trim());
	if (others.length) sections.push({ id: 'others', title: 'Other Notes', items: others.map(String) });

	return sections;
}
