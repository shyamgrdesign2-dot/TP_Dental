import React, { useEffect, useMemo, useState } from 'react';
import { Spin } from 'antd';
import { usePatientPicker } from '../hooks/usePatientPicker';
import {
  findAiMatchPatient,
  formatPatientPickerMeta,
  getPatientDisplayName,
  getPatientInitials,
  mergePickerPatients,
  sortPickerPatientsWithSelectedFirst,
} from '../utils/patientPickerUtils';
import { SearchNormal, StatSparklesIcon, TpIcon } from './TpIcons';
import './AssignPatientPicker.scss';

function CheckIcon({ size = 12, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AssignPatientPicker({
  open,
  onOpen,
  onCancel,
  suggestedName = '',
  dbMatchCandidates = [],
  initialSelectedId = null,
  title = 'Assign to patient',
  confirmLabel = 'Confirm assignment',
  onConfirm,
  confirming = false,
  mode = 'opd',
}) {
  const { query, setQuery, patients, loading, loadError } = usePatientPicker({ enabled: open, mode });
  const [selectedId, setSelectedId] = useState(null);

  const mergedPatients = useMemo(
    () => mergePickerPatients(patients, dbMatchCandidates),
    [patients, dbMatchCandidates]
  );

  const displayPatients = useMemo(
    () => sortPickerPatientsWithSelectedFirst(mergedPatients, selectedId),
    [mergedPatients, selectedId]
  );

  const aiMatchPatient = useMemo(
    () => findAiMatchPatient(mergedPatients, suggestedName),
    [mergedPatients, suggestedName]
  );

  useEffect(() => {
    if (!open) return;
    if (initialSelectedId) {
      setSelectedId(initialSelectedId);
      return;
    }
    if (aiMatchPatient?.patient_unique_id) {
      setSelectedId(aiMatchPatient.patient_unique_id);
      return;
    }
    const singleDbMatch = dbMatchCandidates?.length === 1
      ? mergedPatients.find(
        (patient) => String(patient.patient_unique_id) === String(
          dbMatchCandidates[0]?.patient_unique_id
        )
      )
      : null;
    if (singleDbMatch?.patient_unique_id) {
      setSelectedId(singleDbMatch.patient_unique_id);
      return;
    }
    setSelectedId(null);
  }, [open, initialSelectedId, aiMatchPatient?.patient_unique_id, dbMatchCandidates, mergedPatients]);

  const selectedPatient = displayPatients.find(
    (patient) => String(patient.patient_unique_id) === String(selectedId)
  );

  if (!open) {
    return (
      <button type="button" className="tp-assign-trigger" onClick={onOpen}>
        <TpIcon icon={SearchNormal} size={17} color="#3b82f6" />
        <span className="tp-assign-trigger__placeholder">Search name, MRN or bed…</span>
        {suggestedName && (
          <span className="tp-assign-trigger__suggested">
            <StatSparklesIcon size={10} color="#6d28d9" />
            {suggestedName}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="tp-assign-picker">
      <div className="tp-assign-picker__title-row">
        <div className="tp-assign-picker__title">{title}</div>
        {onCancel && (
          <button type="button" className="tp-assign-picker__cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="tp-assign-picker__search">
        <TpIcon icon={SearchNormal} size={16} color="#94a3b8" />
        <input
          type="search"
          placeholder="Search patients by name, MRN, bed…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        {loading && <Spin size="small" />}
      </div>

      <div className="tp-assign-picker__list">
        {!loading && displayPatients.length === 0 && (
          <div className="tp-assign-picker__empty">
            {query.trim()
              ? `No patients found for "${query.trim()}"`
              : loadError || 'No patients available'}
          </div>
        )}

        {displayPatients.map((patient) => {
          const id = patient.patient_unique_id;
          const isSelected = String(selectedId) === String(id);
          const isAiMatch = aiMatchPatient && String(aiMatchPatient.patient_unique_id) === String(id);
          const isDbMatch = Boolean(patient.isDbMatch);
          const displayName = getPatientDisplayName(patient);
          const meta = formatPatientPickerMeta(patient);

          return (
            <button
              key={id}
              type="button"
              className={`tp-assign-picker__item ${isSelected ? 'tp-assign-picker__item--selected' : ''}`}
              onClick={() => setSelectedId(id)}
            >
              <span className="tp-assign-picker__avatar">{getPatientInitials(patient.pm_fullname)}</span>
              <div className="tp-assign-picker__info">
                <div className="tp-assign-picker__name-row">
                  <span className="tp-assign-picker__name">{displayName}</span>
                  {isDbMatch && (
                    <span className="tp-assign-picker__ai-badge">
                      <StatSparklesIcon size={9} color="#6d28d9" />
                      Suggested
                    </span>
                  )}
                  {isAiMatch && !isDbMatch && (
                    <span className="tp-assign-picker__ai-badge">
                      <StatSparklesIcon size={9} color="#6d28d9" />
                      AI match
                    </span>
                  )}
                </div>
                {meta && <span className="tp-assign-picker__meta">{meta}</span>}
              </div>
              {isSelected && (
                <span className="tp-assign-picker__check" aria-hidden>
                  <CheckIcon />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="tp-assign-picker__footer">
        <button
          type="button"
          className="tp-assign-picker__confirm"
          disabled={!selectedPatient || confirming}
          onClick={() => selectedPatient && onConfirm(selectedPatient)}
        >
          <CheckIcon size={16} color="#ffffff" />
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}

export default AssignPatientPicker;
