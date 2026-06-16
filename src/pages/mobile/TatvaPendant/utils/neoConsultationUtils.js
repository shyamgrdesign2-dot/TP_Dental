import moment from 'moment';
import { normalizeNeoSpeaker } from '../../../../utils/neoConsultationUtils';
import {
  buildIpdNoteSections,
  getIpdTabSections as getIpdTabSectionsFromOutput,
  getVisibleIpdCaptureTabs as getVisibleIpdTabsFromOutput,
  hasIpdDigitizedModules,
  IPD_CAPTURE_TABS,
} from './ipdDigitizedUtils';

export { IPD_CAPTURE_TABS };

export const FILTER_CHIPS = [
  { key: 'all', label: 'All' },
  { key: 'needs_review', label: 'Need review' },
  { key: 'assigned', label: 'Assigned' },
];

export const CONTEXT_FILTERS = [
  { key: 'both', label: 'Both' },
  { key: 'ipd', label: 'IPD' },
  { key: 'opd', label: 'OPD' },
];

export function formatDuration(seconds) {
  if (seconds == null || seconds === '') return '';
  const totalSeconds = Math.round(Number(seconds));
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '';

  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

export function buildCaptureId(consultationId, encounterIndex) {
  return `${consultationId}__${encounterIndex}`;
}

export function parseCaptureId(captureId) {
  const [consultationId, encounterIndex] = (captureId || '').split('__');
  return { consultationId, encounterIndex: Number(encounterIndex) };
}

function getSessionGroup(createdAt, encounterMode) {
  const hour = moment(createdAt).hour();
  const period = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
  return `${period} ${(encounterMode || 'OPD').toUpperCase()} Round`;
}

function formatSessionLabel(sessionGroup) {
  if (!sessionGroup) return '';
  return sessionGroup
    .replace(' MORNING ', ' Morning ')
    .replace(' AFTERNOON ', ' Afternoon ')
    .replace(' EVENING ', ' Evening ')
    .replace(' ROUND', ' Round');
}

/** IPD composite output may live on encounter, digitizeData.digitizedOutput, or directly on digitizeData. */
export function resolveDigitizedOutput(encounter, consultation) {
  const digitizeRoot = consultation?.digitizeData || encounter?.digitizeData || null;

  const candidates = [
    encounter?.digitizedOutput,
    digitizeRoot?.digitizedOutput,
    digitizeRoot,
    consultation?.digitizedOutput,
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== 'object') continue;
    if (hasIpdDigitizedModules(candidate)) return candidate;
    if (candidate.digitizedOutput && hasIpdDigitizedModules(candidate.digitizedOutput)) {
      return candidate.digitizedOutput;
    }
  }

  return null;
}

function resolveEncounterMode(encounter, digitizeRoot, consultation) {
  if (resolveDigitizedOutput(encounter, consultation)) return 'IPD';

  return (
    encounter?.encounterMode
    || digitizeRoot?.encounterMode
    || consultation?.type
    || consultation?.encounterType
    || 'opd'
  ).toUpperCase();
}

export function flattenConsultations(consultations = []) {
  const captures = [];

  consultations.forEach((consultation) => {
    const digitizeRoot = consultation?.digitizeData || {};
    const encounters = digitizeRoot?.patientEncounters?.length
      ? digitizeRoot.patientEncounters
      : digitizeRoot?.patientLabel || digitizeRoot?.patientDetails
        ? [digitizeRoot]
        : [];
    const siblingCount = Math.max(encounters.length - 1, 0);

    encounters.forEach((encounter, encounterIndex) => {
      const patientDetails = encounter?.patientDetails || {};
      const encounterMode = resolveEncounterMode(encounter, digitizeRoot, consultation);
      const digitizedOutput = resolveDigitizedOutput(encounter, consultation);
      const isAssigned = Number(encounter?.patient_unique_id) > 0;
      const needsReview = !isAssigned
        || Boolean(encounter?.review ?? consultation?.review);
      const sessionGroup = getSessionGroup(consultation.createdAt, encounterMode);

      captures.push({
        id: buildCaptureId(consultation.id, encounterIndex),
        consultationId: consultation.id,
        encounterIndex,
        review: needsReview,
        type: encounterMode,
        time: moment(consultation.createdAt).format('hh:mm A'),
        duration: formatDuration(consultation.sourceDurationInSeconds),
        confidence: null,
        title: encounter?.aiTitle || patientDetails?.name || encounter?.patientLabel || 'Untitled capture',
        snippet: encounter?.aiSummary || consultation?.transcription || '',
        bed: patientDetails?.bed || null,
        patient: patientDetails?.name || encounter?.patientLabel || 'Unknown patient',
        age: patientDetails?.age ? `${patientDetails.age} yrs` : null,
        extraCount: siblingCount,
        status: needsReview ? 'needs_review' : 'assigned',
        sessionGroup: formatSessionLabel(sessionGroup),
        patientUniqueId: Number(encounter?.patient_unique_id) || 0,
        dbMatchCandidates: encounter?.dbMatchCandidates || [],
        createdAt: consultation.createdAt,
        rawConsultation: consultation,
        rawEncounter: digitizedOutput
          ? { ...encounter, digitizedOutput }
          : encounter,
      });
    });
  });

  return captures.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function buildConsultationSummary(consultationsResponse, captures = []) {
  const consultations = consultationsResponse?.consultations || [];
  const total = consultationsResponse?.count ?? consultations.length;
  const needReview = captures.filter((item) => item.patientUniqueId === 0 || item.review).length;
  const assigned = captures.filter((item) => item.patientUniqueId > 0).length;

  return { total, needReview, assigned };
}

export function filterCaptures(captures, { activeFilter, contextFilter = 'both', searchQuery }) {
  let list = [...captures];

  if (contextFilter === 'ipd') {
    list = list.filter((item) => item.type === 'IPD');
  } else if (contextFilter === 'opd') {
    list = list.filter((item) => item.type === 'OPD');
  }

  if (activeFilter === 'needs_review') {
    list = list.filter((item) => item.patientUniqueId === 0 || item.review);
  } else if (activeFilter === 'assigned') {
    list = list.filter((item) => item.patientUniqueId > 0);
  }

  if (searchQuery?.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.patient.toLowerCase().includes(q) ||
        (item.bed && item.bed.toLowerCase().includes(q)) ||
        String(item.patientUniqueId).includes(q)
    );
  }

  return list;
}

export function groupCapturesBySession(captures) {
  const groups = {};
  captures.forEach((capture) => {
    const key = capture.sessionGroup;
    if (!groups[key]) groups[key] = [];
    groups[key].push(capture);
  });
  return groups;
}

const NOTE_SECTIONS = [
  { key: 'symptoms', label: 'Symptoms', icon: 'activity', layout: 'split' },
  { key: 'examinations', label: 'Examinations', icon: 'stethoscope', layout: 'bullets' },
  { key: 'diagnosis', label: 'Diagnosis', icon: 'diagnosis', layout: 'split' },
  { key: 'medications', label: 'Medication (Rx)', icon: 'pill', layout: 'meds' },
  { key: 'advice', label: 'Advices', icon: 'lightbulb', layout: 'bullets' },
  { key: 'labInvestigation', label: 'Lab investigation', icon: 'lab', layout: 'bullets' },
  { key: 'labResults', label: 'Lab results', icon: 'lab', layout: 'split' },
];

function isEmptyMedicationValue(value) {
  if (value == null || value === '') return true;
  const normalized = String(value).trim().toLowerCase();
  return normalized === 'none' || normalized === 'n/a' || normalized === '-';
}

function formatMedicationMeta(item) {
  if (!item || typeof item !== 'object') return null;

  const schedule = isEmptyMedicationValue(item.schedule) ? '' : item.schedule;
  const parts = [
    item.dosage || item.dose,
    item.frequency,
    schedule,
    item.duration,
    item.quantity != null && item.quantity !== '' ? `Qty ${item.quantity}` : null,
    item.route,
    item.notes,
  ].filter((part) => part != null && String(part).trim() !== '');

  if (parts.length) return parts.join(' · ');

  const name = String(item.name || item.groundedMedicineName || '').trim();
  const lineItem = String(item.lineItem || '').trim();
  if (!lineItem || lineItem === name) return null;

  if (name) {
    const namePrefix = new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*[,:-]?\\s*`, 'i');
    const details = lineItem.replace(namePrefix, '').trim();
    return details || lineItem;
  }

  return lineItem;
}

function formatNoteItemMeta(sectionKey, item) {
  if (typeof item === 'string') return null;

  if (sectionKey === 'symptoms') {
    const parts = [
      item.nature || item.type,
      item.frequency || item.duration || item.since,
      item.severity,
    ].filter(Boolean);
    return parts.length ? parts.join(' · ') : null;
  }

  if (sectionKey === 'diagnosis') {
    return item.nature || item.type || item.status || null;
  }

  if (sectionKey === 'medications') {
    return formatMedicationMeta(item);
  }

  if (sectionKey === 'labResults') {
    const parts = [item.value, item.units, item.notes].filter(Boolean);
    return parts.length ? parts.join(' · ') : null;
  }

  if (item.lineItem && item.name && item.lineItem !== item.name) {
    return item.lineItem;
  }

  return null;
}

function parseFollowUpSection(followUp) {
  if (!followUp || typeof followUp !== 'string') return null;

  const trimmed = followUp.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/^([^–—-]+?)\s*[-–—]\s*(.+)$/);
  if (match) {
    return {
      badge: match[1].trim(),
      detail: match[2].trim(),
    };
  }

  return {
    badge: null,
    detail: trimmed,
  };
}

function getEncounterDigitizedOutput(encounter, consultation) {
  return resolveDigitizedOutput(encounter, consultation);
}

export function getIpdTabSections(encounter, tabKey, consultation) {
  const digitizedOutput = getEncounterDigitizedOutput(encounter, consultation);
  return getIpdTabSectionsFromOutput(digitizedOutput, tabKey);
}

export function getVisibleIpdCaptureTabs(
  encounter,
  { conversation = [], transcription = '', tasks = [], consultation } = {}
) {
  const digitizedOutput = getEncounterDigitizedOutput(encounter, consultation);
  return getVisibleIpdTabsFromOutput(digitizedOutput, { conversation, transcription, tasks });
}

function buildOpdNoteSections(encounter) {
  const sections = NOTE_SECTIONS.map((section) => {
    const rawItems = encounter[section.key];
    if (!Array.isArray(rawItems) || rawItems.length === 0) return null;

    const items = rawItems.map((item) => {
      if (typeof item === 'string') {
        return { title: item, meta: null };
      }
      const title = section.key === 'labResults'
        ? (item.testname || item.testName || item.name || item.lineItem || '')
        : section.key === 'medications'
          ? (item.name || item.groundedMedicineName || item.lineItem || item.title || '')
          : (item.name || item.lineItem || item.title || '');
      return {
        title,
        meta: formatNoteItemMeta(section.key, item),
      };
    }).filter((item) => item.title);

    if (!items.length) return null;

    return {
      ...section,
      count: items.length,
      items,
    };
  }).filter(Boolean);

  const followUp = parseFollowUpSection(encounter.followUp);
  if (followUp) {
    sections.push({
      key: 'followUp',
      label: 'Follow-up',
      icon: 'calendar',
      layout: 'followup',
      count: 0,
      followUp,
      items: [],
    });
  }

  return sections;
}

export function getStructuredNoteSections(encounter, consultation) {
  if (!encounter) return [];

  const opdSections = buildOpdNoteSections(encounter);
  if (opdSections.length) return opdSections;

  const ipdSections = buildIpdNoteSections(getEncounterDigitizedOutput(encounter, consultation));
  if (ipdSections.length) return ipdSections;

  const summary = String(encounter.aiSummary || '').trim();
  if (summary) {
    return [{
      key: 'summary',
      label: 'Clinical summary',
      icon: 'activity',
      layout: 'bullets',
      count: 1,
      items: [{ title: summary, meta: null }],
    }];
  }

  return [];
}

function getEncounterTriggerWords(encounter, consultation) {
  return (
    encounter?.triggerWords
    || encounter?.trigger_words
    || consultation?.triggerWords
    || consultation?.trigger_words
    || consultation?.digitizeData?.triggerWords
    || consultation?.digitizeData?.trigger_words
    || null
  );
}

function formatTriggerWordsBed(triggerWords = {}) {
  const bed = String(triggerWords.bed_number || '').trim();
  const room = String(triggerWords.room_number || '').trim();
  const ward = String(triggerWords.ward || '').trim();

  if (bed) {
    return /^bed\s/i.test(bed) ? bed : `Bed ${bed}`;
  }
  if (ward && room) return `${ward} · Room ${room}`;
  if (ward) return ward;
  if (room) return `Room ${room}`;
  return '';
}

export function getDetectedIdentifierTags(capture, encounter, consultation) {
  if (!capture && !encounter) return [];

  const patientDetails = encounter?.patientDetails || {};
  const triggerWords = getEncounterTriggerWords(encounter, consultation) || {};
  const tags = [];

  const patientName =
    triggerWords.patient_name
    || patientDetails?.name
    || encounter?.patientLabel
    || capture?.patient;
  if (patientName && patientName !== 'Unknown patient') {
    tags.push({
      type: 'name',
      value: patientName,
      highlight: !capture?.patientUniqueId,
    });
  }

  const bed =
    formatTriggerWordsBed(triggerWords)
    || patientDetails?.bed
    || capture?.bed;
  if (bed) {
    const isOpdLocation = capture?.type === 'OPD' || String(bed).toLowerCase().includes('opd');
    tags.push({ type: isOpdLocation ? 'location' : 'bed', value: bed });
  }

  const age =
    triggerWords.patient_age
    || patientDetails?.age
    || capture?.age?.replace(/\s*yrs?$/i, '');
  if (age) tags.push({ type: 'age', value: String(age).includes('yrs') ? age : `${age} yrs` });

  const mrno = String(triggerWords.mrno || '').trim();
  if (mrno) {
    const label = mrno.toUpperCase().startsWith('MRN') ? mrno : `MRN-${mrno}`;
    tags.push({ type: 'mrno', value: label });
  } else {
    const mrn = patientDetails?.pm_reference_id || patientDetails?.pm_pid || patientDetails?.mrno;
    if (mrn) {
      const label = String(mrn).toUpperCase().startsWith('MRN') ? String(mrn) : `MRN-${mrn}`;
      tags.push({ type: 'mrn', value: label });
    } else if (patientDetails?.uhid) {
      const uhid = patientDetails.uhid;
      tags.push({ type: 'uhid', value: String(uhid).startsWith('UHID') ? uhid : `UHID ${uhid}` });
    }
  }

  return tags;
}

export function extractCaptureTasks(encounter) {
  if (!encounter) return [];

  const tasks = [];

  (encounter.medications || []).forEach((med) => {
    const label = med.name || med.lineItem;
    if (label) tasks.push({ label, done: false, kind: 'med' });
  });

  (encounter.labInvestigation || []).forEach((lab) => {
    const label = lab.name || lab.lineItem;
    if (label) tasks.push({ label, done: false, kind: 'lab' });
  });

  (encounter.advice || []).forEach((item) => {
    const label = typeof item === 'string' ? item : item.name || item.lineItem;
    if (label) tasks.push({ label, done: false, kind: 'order' });
  });

  (encounter.diagnosis || []).slice(0, 1).forEach((dx) => {
    if (dx?.name) {
      tasks.push({ label: `Review diagnosis: ${dx.name}`, done: false, kind: 'followup' });
    }
  });

  return tasks;
}

export function findCaptureById(captures, captureId) {
  return captures.find((item) => item.id === captureId) || null;
}

/** Encounter label for PUT /?id= — matches digitizeData.patientEncounters[].patientLabel. */
export function getEncounterPatientLabel(encounter, capture) {
  const label =
    encounter?.patientLabel
    || encounter?.patientDetails?.name
    || capture?.patient
    || '';
  const trimmed = String(label).trim();
  if (!trimmed || trimmed.toLowerCase() === 'unknown patient') return '';
  return trimmed;
}

function normalizeConversationLine(item) {
  if (!item) return null;
  if (typeof item === 'string') {
    const trimmed = item.trim();
    return trimmed ? { speaker: 'Unknown', text: trimmed } : null;
  }
  const text = item.text ?? item.message ?? item.content ?? '';
  if (!text) return null;
  return {
    speaker: normalizeNeoSpeaker(item.speaker || item.role || 'unknown'),
    text: String(text).trim(),
    t: item.t || item.timestamp || item.time || null,
  };
}

function collectConversationArrays(consultation, encounter) {
  const buckets = [
    consultation?.conversation,
    encounter?.conversation,
    consultation?.transcript,
    encounter?.transcript,
  ];

  const history = consultation?.history || consultation?.data?.history || [];
  if (Array.isArray(history)) {
    history.forEach((item) => {
      if (Array.isArray(item?.conversation)) buckets.push(item.conversation);
      if (Array.isArray(item?.transcript)) buckets.push(item.transcript);
    });
  }

  return buckets.filter((bucket) => Array.isArray(bucket) && bucket.length);
}

function parseLabeledTranscription(text) {
  if (!text || typeof text !== 'string') return [];

  const trimmed = text.trim();
  if (!trimmed) return [];

  const pattern = /\b(Doctor|Patient|Dr\.?|Unknown)\s*:\s*/gi;
  const matches = [...trimmed.matchAll(pattern)];
  if (!matches.length) return [];

  return matches
    .map((match, index) => {
      const start = match.index + match[0].length;
      const end = index + 1 < matches.length ? matches[index + 1].index : trimmed.length;
      const speakerText = trimmed.slice(start, end).trim();
      if (!speakerText) return null;
      return {
        speaker: normalizeNeoSpeaker(match[1]),
        text: speakerText,
      };
    })
    .filter(Boolean);
}

/** Resolve diarized conversation from consultation + encounter (incl. history chunks). */
export function resolveConsultationConversation(consultation, encounter) {
  const arrays = collectConversationArrays(consultation, encounter);
  const merged = arrays.flatMap((bucket) =>
    bucket.map(normalizeConversationLine).filter(Boolean)
  );

  if (merged.length) return merged;

  const transcription =
    consultation?.transcription
    || encounter?.transcription
    || '';

  const parsed = parseLabeledTranscription(transcription);
  if (parsed.length) return parsed;

  if (transcription.trim()) {
    return [{ speaker: 'Doctor', text: transcription.trim() }];
  }

  return [];
}
