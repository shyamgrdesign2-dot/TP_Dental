import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete, Input, Button, Drawer, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import closeIcon from '../../assets/mobile/close 2.svg';
import { searchMedication, getFrequentlySearchedMedication } from '../../redux/medicationSlice';
import { removeBeforeWhiteSpace, onlyNumberFormat, frequencyFormat, frequencyCombination } from '../../utils/utils';
import { EXTRA_OPTIONS } from '../../utils/constants';
import AddCustomMedicineSheet from './AddCustomMedicineSheet';
import './MedicationEditSheet.scss';

const DURATION_UNITS = [
  { value: 'Day(s)', label: 'Days' },
  { value: 'Week(s)', label: 'Weeks' },
  { value: 'Month(s)', label: 'Months' },
  { value: 'Year(s)', label: 'Years' },
];

/**
 * Bottom sheet for Add / Edit Medication. UX matches LabInvestigationEditSheet.
 * Functionality matches web MedicationsTable: searchMedication, getFrequentlySearchedMedication;
 * item shape: id, name, lineItem, dosage, frequency, schedule, duration, quantity, notes, metadata.
 */
function MedicationEditSheet({ visible, onClose, item, prefillName, prefillMetadata, onSave }) {
  const dispatch = useDispatch();
  const { parentOptionsList = [] } = useSelector((state) => state.medication);
  const { timingList = [], frequencyList = [] } = useSelector((state) => state.doctors);
  const debounceRef = useRef(null);

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [schedule, setSchedule] = useState(undefined);
  const [duration, setDuration] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [nameError, setNameError] = useState('');
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [options, setOptions] = useState([]);
  const [frequencyOptions, setFrequencyOptions] = useState([]);
  const [durationOptions, setDurationOptions] = useState(
    EXTRA_OPTIONS.map((o) => ({ value: o.value, label: o.label }))
  );
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [addCustomInitialName, setAddCustomInitialName] = useState('');

  const isAdd = !item;

  // Sync form from item (Edit) or prefill (Add) or reset (Add empty)
  useEffect(() => {
    if (!visible) return;
    if (item) {
      setName(item?.name || item?.lineItem || '');
      setDosage(item?.dosage || '');
      setFrequency(item?.frequency || '');
      setSchedule(item?.schedule || undefined);
      setDuration((item?.duration || '').toString());
      setQuantity((item?.quantity != null && item?.quantity !== '') ? String(item.quantity) : '');
      setNotes(item?.notes || '');
      setSelectedMedication(item?.metadata || null);
    } else if (prefillName) {
      setName(prefillName);
      setDosage('');
      setFrequency('');
      setSchedule(undefined);
      setDuration('');
      setQuantity('');
      setNotes('');
      setSelectedMedication(prefillMetadata || null);
    } else {
      setName('');
      setDosage('');
      setFrequency('');
      setSchedule(undefined);
      setDuration('');
      setQuantity('');
      setNotes('');
      setSelectedMedication(null);
    }
    setNameError('');
  }, [visible, item, prefillName, prefillMetadata]);

  // API: empty → getFrequently; typing → debounced searchMedication (same as web)
  useEffect(() => {
    if (!visible) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = (name || '').trim();
    if (!q) {
      dispatch(getFrequentlySearchedMedication());
      return;
    }
    debounceRef.current = setTimeout(() => {
      dispatch(searchMedication({ searchQuery: q, type: 'parent' }));
    }, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [visible, name, dispatch]);

  // Build options from parentOptionsList + "Add as custom" when no exact match (match web)
  useEffect(() => {
    const list = Array.isArray(parentOptionsList) ? parentOptionsList : [];
    const q = (name || '').trim();
    const opts = list
      .filter((m) => m && (m.tmm_medicine_name || m.medicine_name))
      .map((m) => {
        const medicineName = m.tmm_medicine_name || m.medicine_name;
        return {
          key: JSON.stringify({ ...m }),
          value: medicineName,
          label: medicineName,
        };
      });
    if (q.length > 0) {
      const exact = list.some(
        (m) => (m.tmm_medicine_name || m.medicine_name || '').toLowerCase().trim() === q.toLowerCase()
      );
      if (!exact) {
        opts.push({
          key: JSON.stringify({ tmm_id: 0, tmm_medicine_name: q }),
          value: q,
          label: `Add "${q}" as custom`,
        });
      }
    }
    setOptions(opts);
  }, [parentOptionsList, name]);

  const onSearch = useCallback((val) => {
    setName(removeBeforeWhiteSpace(val));
    setNameError('');
  }, []);

  const onSelect = useCallback((value, option) => {
    if (!option?.key) return;
    try {
      const parsed = JSON.parse(option.key);
      if (parsed?.tmm_id === 0) {
        setAddCustomInitialName(parsed?.tmm_medicine_name || value || '');
        setShowAddCustom(true);
        return;
      }
      const medicineName = parsed?.tmm_medicine_name || parsed?.medicine_name || value;
      setName(medicineName);
      setSelectedMedication(parsed);
    } catch {
      setSelectedMedication(null);
      setName(value);
    }
  }, []);

  const onAddCustomSuccess = useCallback((added) => {
    setName(added?.tmm_medicine_name || added?.medicine_name || '');
    setSelectedMedication(added || null);
    setShowAddCustom(false);
    setAddCustomInitialName('');
  }, []);

  const onAddCustomClose = useCallback(() => {
    setShowAddCustom(false);
    setAddCustomInitialName('');
  }, []);

  const onSearchFrequency = useCallback((query) => {
    const q = (query || '').trim();
    if (!q) {
      setFrequencyOptions([]);
      return;
    }
    const data = [];
    if (frequencyFormat(q)) {
      const combinationList = frequencyCombination(q) || [];
      combinationList.forEach((opt) => data.push({ value: opt, label: opt }));
    }
    const filtered = (frequencyList || []).filter((f) => f.tmf_block !== 0);
    filtered.forEach((f) => data.push({ value: f.tmf_title, label: f.tmf_title }));
    setFrequencyOptions(data);
  }, [frequencyList]);

  const onSearchDuration = useCallback((query) => {
    const num = onlyNumberFormat(query || '');
    if (num) {
      const opts = DURATION_UNITS.map((u) => ({
        value: `${num} ${u.value}`,
        label: `${num} ${u.label}`,
      }));
      setDurationOptions(opts);
    } else {
      setDurationOptions(EXTRA_OPTIONS.map((o) => ({ value: o.value, label: o.label })));
    }
  }, []);

  const handleSave = () => {
    const medicineName = (name || '').trim();
    if (!medicineName) {
      setNameError('Medicine name is required');
      return;
    }
    setNameError('');

    const durationStr = (duration || '').trim();
    const lineItem = `${medicineName} (${[dosage, quantity, frequency, schedule, durationStr, notes].filter(Boolean).join(', ')})`;

    const payload = {
      id: item?.id || Date.now().toString(),
      name: medicineName,
      lineItem,
      dosage: (dosage || '').trim(),
      frequency: (frequency || '').trim(),
      schedule: schedule || '',
      duration: durationStr,
      quantity: quantity !== '' ? (isNaN(Number(quantity)) ? 0 : Number(quantity)) : 0,
      notes: (notes || '').trim(),
      ...(selectedMedication && { metadata: selectedMedication }),
      ...(selectedMedication && (selectedMedication.tmm_generic || selectedMedication.generic_name) && {
        corrected_name: selectedMedication.tmm_generic || selectedMedication.generic_name,
      }),
    };

    onSave?.(payload);
    onClose?.();
  };

  const handleClose = () => {
    setNameError('');
    onClose?.();
  };

  const saveEnabled = (name || '').trim().length > 0;

  const scheduleOptions = (timingList || []).map((t) => ({
    value: t.tmt_title,
    label: t.tmt_title,
  }));

  if (!visible) return null;

  return (
    <>
    <Drawer
      placement="bottom"
      onClose={handleClose}
      open={visible}
      height="auto"
      className="medication-edit-sheet"
      closable={false}
      maskClosable
    >
      <div className="medication-edit-sheet-content">
        <div className="medication-edit-sheet-header">
          <h3 className="medication-edit-sheet-title">
            {isAdd ? 'Add Medication' : 'Edit Medication'}
          </h3>
          <button
            className="medication-edit-sheet-close"
            onClick={handleClose}
            type="button"
            aria-label="Close"
          >
            <img src={closeIcon} alt="" />
          </button>
        </div>

        <div className="medication-edit-sheet-body">
          <div className="medication-edit-sheet-field">
            <label className="medication-edit-sheet-label">Medicine <span className="required">*</span></label>
            <AutoComplete
              value={name}
              onSearch={onSearch}
              onSelect={onSelect}
              options={options}
              defaultActiveFirstOption
              getPopupContainer={() => document.body}
              className="medication-edit-sheet-autocomplete"
            >
              <Input
                placeholder="Search by medicine name"
                prefix={<SearchOutlined className="medication-edit-sheet-search-icon" />}
                allowClear
                className="medication-edit-sheet-input"
                maxLength={500}
              />
            </AutoComplete>
            {nameError && <span className="medication-edit-sheet-error">{nameError}</span>}
          </div>

          <div className="medication-edit-sheet-field">
            <label className="medication-edit-sheet-label">Unit per dose</label>
            <Input
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g. 1 Tablet"
              className="medication-edit-sheet-input"
              maxLength={200}
            />
          </div>

          <div className="medication-edit-sheet-field">
            <label className="medication-edit-sheet-label">Frequency</label>
            <AutoComplete
              value={frequency}
              onSearch={(v) => {
                setFrequency(removeBeforeWhiteSpace(v || ''));
                onSearchFrequency(v);
              }}
              onSelect={(v) => setFrequency(v)}
              options={frequencyOptions}
              defaultActiveFirstOption
              getPopupContainer={() => document.body}
              allowClear
              className="medication-edit-sheet-autocomplete"
            >
              <Input
                placeholder="e.g. 1-0-1"
                className="medication-edit-sheet-input"
                maxLength={200}
              />
            </AutoComplete>
          </div>

          <div className="medication-edit-sheet-field">
            <label className="medication-edit-sheet-label">When</label>
            <Select
              value={schedule || undefined}
              onChange={setSchedule}
              onClear={() => setSchedule(undefined)}
              placeholder="e.g. Before Food"
              allowClear
              options={scheduleOptions}
              className="medication-edit-sheet-select"
            />
          </div>

          <div className="medication-edit-sheet-field">
            <label className="medication-edit-sheet-label">Duration</label>
            <AutoComplete
              value={duration}
              onSearch={(v) => {
                setDuration(v || '');
                onSearchDuration(v);
              }}
              onSelect={(v) => setDuration(v)}
              options={durationOptions}
              defaultActiveFirstOption
              getPopupContainer={() => document.body}
              allowClear
              className="medication-edit-sheet-autocomplete"
            >
              <Input
                placeholder="e.g. 5 Days"
                className="medication-edit-sheet-input"
                maxLength={100}
              />
            </AutoComplete>
          </div>

          <div className="medication-edit-sheet-field">
            <label className="medication-edit-sheet-label">Quantity</label>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(onlyNumberFormat(e.target.value))}
              placeholder="e.g. 10"
              className="medication-edit-sheet-input"
              maxLength={20}
            />
          </div>

          <div className="medication-edit-sheet-field">
            <label className="medication-edit-sheet-label">Note</label>
            <Input.TextArea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional instructions"
              className="medication-edit-sheet-textarea"
              rows={2}
              maxLength={1000}
            />
          </div>

          <div className="medication-edit-sheet-actions">
            <Button
              type="primary"
              onClick={handleSave}
              className="medication-edit-sheet-btn-save"
              disabled={!saveEnabled}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
    {showAddCustom && (
      <AddCustomMedicineSheet
        visible={showAddCustom}
        onClose={onAddCustomClose}
        initialData={addCustomInitialName ? { tmm_medicine_name: addCustomInitialName } : null}
        onSuccess={onAddCustomSuccess}
      />
    )}
    </>
  );
}

export default MedicationEditSheet;
