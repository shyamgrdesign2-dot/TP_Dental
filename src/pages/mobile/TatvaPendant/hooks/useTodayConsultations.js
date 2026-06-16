import { useCallback, useEffect, useMemo, useState } from 'react';
import { getTodayConsultations } from '../../../../api/services/ApiNeoSapien';
import {
  buildConsultationSummary,
  flattenConsultations,
} from '../utils/neoConsultationUtils';

export function useTodayConsultations() {
  const [consultationsResponse, setConsultationsResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConsultations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTodayConsultations();
      setConsultationsResponse(data);
    } catch (err) {
      setError(err?.message || 'Failed to load consultations');
      setConsultationsResponse(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const captures = useMemo(
    () => flattenConsultations(consultationsResponse?.consultations || []),
    [consultationsResponse]
  );

  const summary = useMemo(
    () => buildConsultationSummary(consultationsResponse, captures),
    [consultationsResponse, captures]
  );

  return {
    consultationsResponse,
    captures,
    summary,
    loading,
    error,
    refetch: fetchConsultations,
  };
}
