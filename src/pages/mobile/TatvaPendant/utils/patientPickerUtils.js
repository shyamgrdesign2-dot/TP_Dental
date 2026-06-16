/** Map IPD /patients response (ipd-prod inPatients) to picker rows. */
import { getDecodedToken } from '../../../../utils/localStorage';

export function buildIpdDoctorIdsFilter() {
  const userId = getDecodedToken()?.result?.user_id;
  return userId != null ? String(userId) : '';
}

export function extractIpdPatientsFromResponse(response) {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.patients)) return response.patients;
  if (Array.isArray(response.data?.patients)) return response.data.patients;
  if (Array.isArray(response.data)) return response.data;
  return [];
}

export function normalizeIpdPickerPatients(response) {
  const raw = extractIpdPatientsFromResponse(response);

  return raw
    .map((patient) => {
      const details = patient?.details || {};
      const room = patient?.room?.title || '';
      const ward = patient?.ward?.title || '';
      const displayName = [details.prefix, details.name].filter(Boolean).join(' ').trim()
        || details.name
        || '';
      const patientUniqueId =
        patient?.patient_unique_id
        || details?.patient_unique_id
        || details?.id
        || details?.patientRefId
        || patient?.mrno
        || '';

      return {
        patient_unique_id: patientUniqueId,
        pm_fullname: displayName,
        pm_salutation: details.prefix || details.salutation || '',
        pm_contact_no: details.contact || '',
        pm_gender: details.gender || '',
        pm_age: details.age ?? '',
        pm_reference_id: patient?.mrno || patient?.mrNo || details?.pm_pid || '',
        bed: ward && room ? `${ward} · ${room}` : room || ward,
        ward,
        room,
        admissionId: patient?.admissionId || patient?.admission_id || '',
        isIpdPatient: true,
        record: patient,
      };
    })
    .filter((patient) => patient.patient_unique_id);
}

export function normalizePickerPatients(response) {
  const raw =
    response?.patients
    || response?.data?.patients
    || response?.data?.data?.patients
    || response?.data
    || response?.records
    || (Array.isArray(response) ? response : []);

  if (!Array.isArray(raw)) return [];

  return raw
    .map((patient) => ({
      patient_unique_id:
        patient?.patient_unique_id || patient?.pm_pid || patient?.patient_id || '',
      pm_fullname:
        patient?.pm_fullname
        || [patient?.pm_first_name, patient?.pm_middle_name, patient?.pm_last_name]
          .filter(Boolean)
          .join(' ')
          .trim(),
      pm_salutation: patient?.pm_salutation || patient?.salutation || '',
      pm_contact_no: patient?.pm_contact_no || patient?.mobile || patient?.phone || '',
      pm_gender: patient?.pm_gender || patient?.gender || '',
      pm_age: patient?.pm_age || patient?.ageYears || patient?.age || '',
      pm_dob: patient?.pm_dob || patient?.dob || '',
      bed: patient?.bed || patient?.pm_room || patient?.ward || '',
      record: patient,
    }))
    .filter((patient) => patient.patient_unique_id);
}

function calculateAge(dob) {
  if (!dob) return '';
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return '';
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

export function getPatientInitials(name) {
  if (!name) return 'P';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return 'P';
}

export function formatPatientPickerMeta(patient) {
  const parts = [];
  const age = patient.pm_age || calculateAge(patient.pm_dob);
  const gender = patient.pm_gender
    ? String(patient.pm_gender).charAt(0).toUpperCase()
    : '';

  if (age && gender) {
    parts.push(`${age}/${gender}`);
  } else if (age) {
    parts.push(String(age));
  } else if (gender) {
    parts.push(gender);
  }

  const mrn =
    patient.pm_reference_id
    || patient.record?.mrno
    || patient.record?.mrNo
    || patient.pm_pid
    || patient.record?.pm_reference_id
    || patient.record?.pm_pid;
  if (mrn) parts.push(String(mrn).toUpperCase().startsWith('MRN') ? String(mrn) : `MRN-${mrn}`);

  if (patient.bed) parts.push(patient.bed);

  return parts.join(' · ');
}

export function getPatientDisplayName(patient) {
  const fullName = `${patient.pm_salutation ? `${patient.pm_salutation} ` : ''}${patient.pm_fullname || ''}`.trim();
  return fullName || `Patient #${patient.patient_unique_id}`;
}

export function normalizeDbMatchCandidates(candidates = []) {
  if (!Array.isArray(candidates)) return [];

  return candidates
    .map((candidate) => ({
      patient_unique_id:
        candidate?.patient_unique_id
        || candidate?.pm_pid
        || candidate?.patient_id
        || '',
      pm_fullname:
        candidate?.name
        || candidate?.pm_fullname
        || [candidate?.pm_first_name, candidate?.pm_last_name].filter(Boolean).join(' ').trim(),
      pm_salutation: candidate?.pm_salutation || candidate?.salutation || '',
      pm_contact_no: candidate?.contact || candidate?.pm_contact_no || candidate?.mobile || '',
      pm_gender: candidate?.pm_gender || candidate?.gender || '',
      pm_age: candidate?.age || candidate?.pm_age || '',
      pm_dob: candidate?.pm_dob || candidate?.dob || '',
      bed: candidate?.bed || candidate?.ward || '',
      isDbMatch: true,
      record: candidate,
    }))
    .filter((patient) => patient.patient_unique_id);
}

export function mergePickerPatients(searchPatients = [], dbMatchCandidates = []) {
  const suggested = normalizeDbMatchCandidates(dbMatchCandidates);
  const seen = new Set();
  const merged = [];

  suggested.forEach((patient) => {
    const id = String(patient.patient_unique_id);
    if (seen.has(id)) return;
    seen.add(id);
    merged.push(patient);
  });

  searchPatients.forEach((patient) => {
    const id = String(patient.patient_unique_id);
    if (seen.has(id)) return;
    seen.add(id);
    merged.push(patient);
  });

  return merged;
}

/** Keep the active selection pinned to the top of the picker list. */
export function sortPickerPatientsWithSelectedFirst(patients = [], selectedId) {
  if (!selectedId || !patients.length) return patients;

  const selected = [];
  const rest = [];

  patients.forEach((patient) => {
    if (String(patient.patient_unique_id) === String(selectedId)) {
      selected.push(patient);
    } else {
      rest.push(patient);
    }
  });

  return selected.length ? [...selected, ...rest] : patients;
}

export function findAiMatchPatient(patients, suggestedName) {
  if (!suggestedName || !patients?.length) return null;

  const needle = suggestedName.trim().toLowerCase();
  if (!needle) return null;

  return (
    patients.find((patient) => {
      const name = (patient.pm_fullname || '').toLowerCase();
      return name.includes(needle) || needle.includes(name.split(' ')[0]);
    }) || null
  );
}
