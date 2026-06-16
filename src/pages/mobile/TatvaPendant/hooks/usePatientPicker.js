import { useCallback, useEffect, useRef, useState } from 'react';
import ApiAppointments from '../../../../api/services/ApiAppointments';
import ApiIpdService from '../../../../api/services/ApiIpd';
import { fetchAllPatients } from '../../../allPatients.js/service';
import { getDecodedToken } from '../../../../utils/localStorage';
import {
  buildIpdDoctorIdsFilter,
  extractIpdPatientsFromResponse,
  normalizeIpdPickerPatients,
  normalizePickerPatients,
} from '../utils/patientPickerUtils';

const PAGE_LIMIT = 25;
const IPD_PAGE_LIMIT = 50;

const IPD_PATIENT_QUERY = {
  page: 1,
  limit: IPD_PAGE_LIMIT,
  ward: '',
  patientId: '',
  startDate: '',
  endDate: '',
  sort: 'admittedOn:desc',
  isDischarged: false,
  sentForApproval: false,
  isIntimateDischarged: false,
};

async function fetchIpdPatients(searchValue, doctorIdsFilter) {
  const response = await ApiIpdService.getPatients({
    ...IPD_PATIENT_QUERY,
    search: searchValue,
    doctorIdsFilter,
  });
  return {
    response,
    rawCount: extractIpdPatientsFromResponse(response).length,
    patients: normalizeIpdPickerPatients(response),
  };
}

export function usePatientPicker({ enabled = true, initialQuery = '', mode = 'opd' } = {}) {
  const [query, setQuery] = useState(initialQuery);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const debounceRef = useRef(null);

  const loadPatients = useCallback(async (searchValue = '') => {
    setLoading(true);
    setLoadError(null);
    try {
      if (mode === 'ipd') {
        const token = getDecodedToken()?.result || {};
        const doctorIdsFilter = buildIpdDoctorIdsFilter();

        console.log('[usePatientPicker][ipd] loading patients', {
          search: searchValue,
          doctorIdsFilter,
          userId: token.user_id,
          clinicId: token.clinic_id,
          hospitalId: token.hospital_business_id,
        });

        let { response, rawCount, patients: list } = await fetchIpdPatients(searchValue, doctorIdsFilter);

        if (!list.length && doctorIdsFilter) {
          console.warn('[usePatientPicker][ipd] no patients for doctor filter, retrying without filter', {
            doctorIdsFilter,
            rawCount,
          });
          ({ response, rawCount, patients: list } = await fetchIpdPatients(searchValue, ''));
        }

        console.log('[usePatientPicker][ipd] patients loaded', {
          normalizedCount: list.length,
          rawCount,
          total: response?.pagination?.total,
          sample: list.slice(0, 3).map((patient) => ({
            id: patient.patient_unique_id,
            name: patient.pm_fullname,
            bed: patient.bed,
          })),
        });

        setPatients(list);
        if (!list.length && !searchValue) {
          setLoadError('No in-patients found for your hospital. Log in with an IPD-enabled account.');
        }
        return;
      }

      const response = await fetchAllPatients({
        page: 1,
        limit: PAGE_LIMIT,
        search: searchValue,
      });
      let list = normalizePickerPatients(response);

      if (!list.length && searchValue) {
        const fallback = await ApiAppointments.searchPatients(searchValue, '');
        list = normalizePickerPatients(fallback);
      } else if (!list.length && !searchValue) {
        const fallback = await ApiAppointments.searchPatients('', '');
        list = normalizePickerPatients(fallback);
      }

      setPatients(list);
    } catch (error) {
      setPatients([]);
      setLoadError(
        mode === 'ipd'
          ? 'Could not load in-patients. Check IPD access for your account.'
          : 'Could not load patients.'
      );
      console.error('[usePatientPicker] load failed', {
        mode,
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
    } finally {
      setLoading(false);
    }
  }, [mode]);

  useEffect(() => {
    if (!enabled) return undefined;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadPatients(query.trim());
    }, query.trim() ? 350 : 0);

    return () => clearTimeout(debounceRef.current);
  }, [enabled, query, loadPatients]);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  return {
    query,
    setQuery,
    patients,
    loading,
    loadError,
    reload: loadPatients,
  };
}
