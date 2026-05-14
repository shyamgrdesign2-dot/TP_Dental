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

function cleanValue(value) {
	if (value == null) return '';
	const text = String(value).trim();
	if (!text || text === 'null' || text === 'undefined') return '';
	return text;
}

function firstValue(data, keys) {
	for (const key of keys) {
		const value = cleanValue(data?.[key]);
		if (value) return value;
	}
	return '';
}

function detailFrom(values) {
	return values.map(cleanValue).filter(Boolean).join(', ');
}

function sectionItem(name, detail = '') {
	return { name: cleanValue(name), detail: cleanValue(detail) };
}

function asArray(value) {
	if (Array.isArray(value)) return value;
	return cleanValue(value) ? [value] : [];
}

function htmlStructuredItem(item) {
	const value = typeof item === 'string' ? sectionItem(item) : item;
	const name = escapeHtml(value?.name || '');
	const detail = cleanValue(value?.detail);
	return `<strong>${name}</strong>${detail ? ` (${escapeHtml(detail)})` : ''}`;
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
			arraySection('Symptoms', asArray(data.symptoms), (s) => {
			if (typeof s === 'string') return htmlStructuredItem(s);
			return htmlStructuredItem(sectionItem(
				firstValue(s, ['name', 'symptom_name', 'lineItem']),
				detailFrom([s.since, s.duration, s.severity, s.notes, s.note])
			));
		})
	);

	out.push(
		arraySection('Examination', asArray(data.examinations), (e) => {
			if (typeof e === 'string') return htmlStructuredItem(e);
			return htmlStructuredItem(sectionItem(
				firstValue(e, ['name', 'examination_name', 'findings', 'lineItem']),
				detailFrom([e.notes, e.note])
			));
		})
	);

	out.push(
		arraySection('Diagnosis', asArray(data.diagnosis), (d) => {
			if (typeof d === 'string') return htmlStructuredItem(d);
			return htmlStructuredItem(sectionItem(
				firstValue(d, ['name', 'tds_name', 'diagnosis_name', 'lineItem']),
				detailFrom([d.since, d.status, d.notes, d.note])
			));
		})
	);

	out.push(
		arraySection('Med (Rx)', asArray(data.medications), (m) => {
			if (typeof m === 'string') return htmlStructuredItem(m);
			const dosage = firstValue(m, ['dosage', 'dose', 'tmm_dosage']);
			const unit = firstValue(m, ['unit', 'tmm_unit']);
			const dosageText = [dosage, unit].filter(Boolean).join(' ');
			const duration = firstValue(m, ['duration', 'tmm_days']);
			const durationType = firstValue(m, ['durationType', 'tmm_duration_type', 'tmm_days_duration_type']);
			const durationText = [duration, durationType].filter(Boolean).join(' ');
			return htmlStructuredItem(sectionItem(
				firstValue(m, ['name', 'medicine', 'medicine_name', 'tmm_medicine_name']),
				detailFrom([
					dosageText,
					m.frequency,
					m.schedule,
					m.tmm_dosage_frequency,
					m.tmm_freq_type_name,
					m.when,
					m.time,
					m.tmm_time_name,
					durationText,
					m.notes,
					m.note,
				])
			));
		})
	);

	out.push(
		arraySection('Medical History', asArray(medicalHistory), (h) => {
			if (typeof h === 'string') return htmlStructuredItem(h);
			return htmlStructuredItem(sectionItem(
				firstValue(h, ['name', 'history_name', 'lineItem']),
				detailFrom([h.type, h.duration, h.relation, h.notes, h.note])
			));
		})
	);

	out.push(
		arraySection('Lab Investigation', asArray(labInvestigation), (l) => {
			if (typeof l === 'string') return htmlStructuredItem(l);
			return htmlStructuredItem(sectionItem(
				firstValue(l, ['name', 'investigation_name', 'testname', 'testName', 'lineItem']),
				detailFrom([l.instruction, l.notes, l.note])
			));
		})
	);

	const advice = asArray(data.advice).filter((a) => a != null && String(a).trim());
	if (advice.length) {
		const items = advice.map((a) => {
			if (typeof a === 'string') return `<li>${escapeHtml(a)}</li>`;
			return `<li>${htmlStructuredItem(sectionItem(
				firstValue(a, ['advice_name', 'name', 'lineItem']),
				detailFrom([a.notes, a.note])
			))}</li>`;
		}).join('');
		out.push(`<h3>Advice</h3><ul>${items}</ul>`);
	}

	if (followUp != null && String(followUp).trim()) {
		out.push(`<h3>Follow Up</h3><p>${escapeHtml(followUp)}</p>`);
	}

	out.push(arraySection('Additional Notes', asArray(data.others), (o) => escapeHtml(typeof o === 'string' ? o : (o?.value ?? o?.name ?? ''))));

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
	const items = asArray(arr);
	if (!items.length) return [];
	return items
		.map((it) => formatter(it))
		.filter((item) => {
			if (!item) return false;
			if (typeof item === 'string') return String(item).trim();
			return cleanValue(item.name) || cleanValue(item.detail);
		});
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
		if (typeof s === 'string') return sectionItem(s);
		const name = firstValue(s, ['name', 'symptom_name', 'lineItem']);
		const detail = detailFrom([
			s.since,
			s.duration,
			s.severity,
			s.notes,
			s.note,
		]);
		return sectionItem(name, detail);
	});
	if (items2.length) sections.push({ id: 'symptoms', title: 'Symptoms', tpIconName: 'symptoms', items: items2 });

	const items3 = arraySectionItems(data.examinations, (e) => {
		if (typeof e === 'string') return sectionItem(e);
		const name = firstValue(e, ['name', 'examination_name', 'findings', 'lineItem']);
		const detail = detailFrom([e.notes, e.note]);
		return sectionItem(name, detail);
	});
	if (items3.length) sections.push({ id: 'examinations', title: 'Examination', tpIconName: 'examination', items: items3 });

	const items4 = arraySectionItems(data.diagnosis, (d) => {
		if (typeof d === 'string') return sectionItem(d);
		const name = firstValue(d, ['name', 'tds_name', 'diagnosis_name', 'lineItem']);
		const detail = detailFrom([
			d.since,
			d.status,
			d.notes,
			d.note,
		]);
		return sectionItem(name, detail);
	});
	if (items4.length) sections.push({ id: 'diagnosis', title: 'Diagnosis', tpIconName: 'diagnosis', items: items4 });

	const items5 = arraySectionItems(data.medications, (m) => {
		if (typeof m === 'string') return sectionItem(m);
		const dosage = firstValue(m, ['dosage', 'dose', 'tmm_dosage']);
		const unit = firstValue(m, ['unit', 'tmm_unit']);
		const dosageText = [dosage, unit].filter(Boolean).join(' ');
		const duration = firstValue(m, ['duration', 'tmm_days']);
		const durationType = firstValue(m, ['durationType', 'tmm_duration_type', 'tmm_days_duration_type']);
		const durationText = [duration, durationType].filter(Boolean).join(' ');
		const name = firstValue(m, ['name', 'medicine', 'medicine_name', 'tmm_medicine_name']);
		const detail = detailFrom([
			dosageText,
			m.frequency,
			m.schedule,
			m.tmm_dosage_frequency,
			m.tmm_freq_type_name,
			m.when,
			m.time,
			m.tmm_time_name,
			durationText,
			m.notes,
			m.note,
		]);
		return sectionItem(name, detail);
	});
	if (items5.length) sections.push({ id: 'medications', title: 'Med (Rx)', tpIconName: 'medication', items: items5 });

	const medicalHistory = field(data, 'medicalHistory', 'medical_history');
	const items6 = arraySectionItems(medicalHistory, (h) => {
		if (typeof h === 'string') return sectionItem(h);
		const name = firstValue(h, ['name', 'history_name', 'lineItem']);
		const detail = detailFrom([h.type, h.duration, h.relation, h.notes, h.note]);
		return sectionItem(name, detail);
	});
	if (items6.length) sections.push({ id: 'medical-history', title: 'Medical History', tpIconName: 'medicalHistory', items: items6 });

	const labInvestigation = field(data, 'labInvestigation', 'lab_investigation');
	const items7 = arraySectionItems(labInvestigation, (l) => {
		if (typeof l === 'string') return sectionItem(l);
		const name = firstValue(l, ['name', 'investigation_name', 'testname', 'testName', 'lineItem']);
		const detail = detailFrom([l.instruction, l.notes, l.note]);
		return sectionItem(name, detail);
	});
	if (items7.length) sections.push({ id: 'lab-investigation', title: 'Lab Investigation', tpIconName: 'lab', items: items7 });

	const advice = asArray(data.advice).filter((a) => a != null && String(a).trim());
	if (advice.length) {
		sections.push({
			id: 'advice',
			title: 'Advice',
			tpIconName: 'advice',
			items: advice.map((a) => {
				if (typeof a === 'string') return sectionItem(a);
				return sectionItem(
					firstValue(a, ['advice_name', 'name', 'lineItem']),
					detailFrom([a.notes, a.note])
				);
			}),
		});
	}

	const followUp = field(data, 'followUp', 'follow_up');
	if (followUp != null && String(followUp).trim()) {
		sections.push({ id: 'follow-up', title: 'Follow Up', tpIconName: 'followup', items: [sectionItem(followUp)] });
	}

	const others = asArray(data.others).filter((o) => o != null && String(o).trim());
	if (others.length) {
		sections.push({
			id: 'others',
			title: 'Additional Notes',
			tpIconName: 'notes',
			items: others.map((o) => sectionItem(typeof o === 'string' ? o : (o?.value ?? o?.name ?? ''))),
		});
	}

	return sections;
}
