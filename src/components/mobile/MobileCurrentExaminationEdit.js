import React, { useState, useEffect, useMemo } from 'react';
import { Drawer, Button, Input, DatePicker, Select, Radio, message, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import moment from 'moment';
import { addObstetricDetails, obstetricDetailsUpdated, patientDiagnosisUpdated } from '../../redux/obstetricSlice';
import { upsertObstetricDetails, fetchPrefillObstetricDetails, updatePrefillObstetricData } from '../../pages/obstetric/service';
import { errorMessage } from '../../utils/utils';
import closeIcon from '../../assets/mobile/close 2.svg';
import deleteIcon from '../../assets/images/Delete.svg';
import alertIcon from '../../assets/images/alertIcon.svg';
import './MobileCurrentExaminationEdit.scss';

const { TextArea } = Input;

const PresentationOptions = [
  { value: 'Breech', label: 'Breech' },
  { value: 'Cephalic', label: 'Cephalic' },
  { value: 'Variable', label: 'Variable' },
  { value: 'Transverse', label: 'Transverse' },
  { value: 'EB', label: 'EB' },
];

const LiquorOptions = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Less', label: 'Less' },
  { value: 'More', label: 'More' },
];

function MobileCurrentExaminationEdit({
  visible,
  onClose,
  patient_data,
  editIndex = -1,
  prefillObstetricData,
  setPrefillObstetricData,
  onSave
}) {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.doctors);
  const { obstetricDetails: allObstetricDetails } = useSelector((state) => state.obstetric);
  const obstetricDetails = allObstetricDetails?.currentPregnancy || {};
  const examinationHistory = obstetricDetails?.examinationHistory || [];

  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [discardChangesModalVisible, setDiscardChangesModalVisible] = useState(false);
  const [prefillExamData, setPrefillExamData] = useState({});
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [pallor, setPallor] = useState(undefined);
  const [oedema, setOedema] = useState(undefined);
  const [mothersHeight, setMothersHeight] = useState('');
  const [mothersWeight, setMothersWeight] = useState('');
  const [mothersBMI, setMothersBMI] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heightOfFundus, setHeightOfFundus] = useState('');
  const [heightOfFundusUnit, setHeightOfFundusUnit] = useState('weeks');
  const [presentation, setPresentation] = useState(undefined);
  const [liquor, setLiquor] = useState(undefined);
  const [foetalHeartRate, setFoetalHeartRate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (visible) {
      if (editIndex >= 0 && examinationHistory.length > 0) {
        const reversedHistory = [...examinationHistory].reverse();
        const examData = reversedHistory[editIndex];
        if (examData) {
          loadDataFromExam(examData);
        }
      } else {
        resetForm();
      }
    } else {
      // When sheet closes, clear discard modal so it doesn't show on next open
      setDiscardChangesModalVisible(false);
    }
  }, [visible, editIndex]);

  // Calculate BMI when height or weight changes
  useEffect(() => {
    calculateBMI();
  }, [mothersHeight, mothersWeight]);

  // Prefill examination data when adding new visit - same as web (from parent prefill or fetch)
  useEffect(() => {
    if (!visible || editIndex >= 0) return;

    const applyPrefill = (data) => {
      if (!data) return;
      if (data.height) setMothersHeight(String(data.height));
      if (data.weight) setMothersWeight(String(data.weight));
      if (data.bloodPressure) {
        const parts = String(data.bloodPressure).split('/');
        const sys = parts[0];
        const dia = parts[1];
        if (sys) setSystolic(sys.trim());
        if (dia) setDiastolic(dia.trim());
      }
    };

    // Prefer parent prefill (same as web) so Add visit gets height/weight/BP without delay
    const fromParent = prefillObstetricData && (
      prefillObstetricData.height ||
      prefillObstetricData.weight ||
      prefillObstetricData.bloodPressure
    );
    if (fromParent) {
      applyPrefill(prefillObstetricData);
      return;
    }

    // Fallback: fetch when parent hasn't passed prefill yet
    const fetchAndApplyPrefillData = async () => {
      if (!patient_data?.patient_unique_id) return;
      try {
        const prefillData = await fetchPrefillObstetricDetails(patient_data.patient_unique_id);
        applyPrefill(prefillData);
      } catch (error) {
        // Silently fail - prefill is optional
      }
    };
    fetchAndApplyPrefillData();
  }, [visible, editIndex, patient_data?.patient_unique_id, prefillObstetricData]);

  const calculateBMI = () => {
    const height = parseFloat(mothersHeight) || 0;
    const weight = parseFloat(mothersWeight) || 0;

    if (height > 0 && weight > 0) {
      const bmi = (weight / height / height) * 10000;
      setMothersBMI(isFinite(bmi) ? bmi.toFixed(2) : '');
    } else {
      setMothersBMI('');
    }
  };

  const loadDataFromExam = (data) => {
    setDate(data.date ? moment(data.date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'));
    setPallor(data.pallor);
    setOedema(data.oedema);
    setMothersHeight(data.mothersHeight ? String(data.mothersHeight) : '');
    setMothersWeight(data.mothersWeight ? String(data.mothersWeight) : '');
    setMothersBMI(data.mothersBMI ? String(data.mothersBMI) : '');
    setSystolic(data.systolic ? String(data.systolic) : '');
    setDiastolic(data.diastolic ? String(data.diastolic) : '');
    setHeightOfFundus(data.heightOfFundus ? String(data.heightOfFundus) : '');
    setHeightOfFundusUnit(data.heightOfFundusUnit || 'weeks');
    setPresentation(data.presentation);
    setLiquor(data.liquor);
    setFoetalHeartRate(data.foetalHeartRate ? String(data.foetalHeartRate) : '');
    setNotes(data.notes || '');
  };

  const resetForm = () => {
    setDate(moment().format('YYYY-MM-DD'));
    setPallor(undefined);
    setOedema(undefined);
    setMothersHeight('');
    setMothersWeight('');
    setMothersBMI('');
    setSystolic('');
    setDiastolic('');
    setHeightOfFundus('');
    setHeightOfFundusUnit('weeks');
    setPresentation(undefined);
    setLiquor(undefined);
    setFoetalHeartRate('');
    setNotes('');
    setIsDirty(false);
    setPrefillExamData({}); // Reset prefill tracking
  };

  // Check if form has any data (for validation)
  const hasAnyData = useMemo(() => {
    return (
      pallor !== undefined ||
      oedema !== undefined ||
      mothersHeight ||
      mothersWeight ||
      systolic ||
      diastolic ||
      heightOfFundus ||
      presentation ||
      liquor ||
      foetalHeartRate ||
      notes
    );
  }, [pallor, oedema, mothersHeight, mothersWeight, systolic, diastolic, heightOfFundus, presentation, liquor, foetalHeartRate, notes]);

  const handleSave = async () => {
    if (!patient_data?.patient_unique_id) {
      errorMessage('Patient information is missing');
      return;
    }
    if (!date) {
      errorMessage('Please select a date');
      return;
    }

    if (!hasAnyData) {
      errorMessage('Please fill at least one examination field');
      return;
    }

    setLoading(true);

    try {
      // Build examination data
      const examData = {
        date: new Date(date).toISOString(),
        modifiedAt: new Date().toISOString(),
        modifiedBy: userId,
      };

      // Only add fields that have values
      if (pallor !== undefined) examData.pallor = pallor;
      if (oedema !== undefined) examData.oedema = oedema;
      if (mothersHeight) examData.mothersHeight = mothersHeight;
      if (mothersWeight) examData.mothersWeight = mothersWeight;
      if (mothersBMI) examData.mothersBMI = mothersBMI;
      if (systolic) examData.systolic = systolic;
      if (diastolic) examData.diastolic = diastolic;
      if (heightOfFundus) examData.heightOfFundus = heightOfFundus;
      if (heightOfFundusUnit) examData.heightOfFundusUnit = heightOfFundusUnit;
      if (presentation) examData.presentation = presentation;
      if (liquor) examData.liquor = liquor;
      if (foetalHeartRate) examData.foetalHeartRate = foetalHeartRate;
      if (notes) examData.notes = notes.trim();

      // Update examination history
      let newExaminationHistory = [...examinationHistory].reverse();

      if (editIndex >= 0) {
        // Edit existing
        newExaminationHistory[editIndex] = examData;
      } else {
        // Add new
        examData.createdAt = new Date().toISOString();
        examData.createdBy = userId;
        newExaminationHistory = [...examinationHistory, examData];
      }

      // Build payload: match web order (newest first) for API consistency
      const payloadHistory =
        editIndex >= 0
          ? newExaminationHistory.reverse()
          : [...newExaminationHistory].reverse();
      const currentPregnancy = allObstetricDetails?.currentPregnancy || {};
      const payload = {
        ...allObstetricDetails,
        currentPregnancy: {
          ...currentPregnancy,
          patientId: patient_data.patient_unique_id,
          examinationHistory: payloadHistory,
          ancHistory: currentPregnancy?.ancHistory || [],
          immunisationHistory: currentPregnancy?.immunisationHistory || [],
        },
      };

      // Save to API
      const response = await upsertObstetricDetails(patient_data.patient_unique_id, payload);

      if (response) {
        // Update Redux state
        dispatch(addObstetricDetails(payload));
        dispatch(patientDiagnosisUpdated());
        dispatch(obstetricDetailsUpdated());

        // Sync prefill data to patient profile (height, weight, blood pressure)
        // This is a secondary operation - main save should succeed even if prefill sync fails
        if (Object.keys(prefillExamData).length > 0) {
          try {
            const prefillPayload = {};
            if (prefillExamData.height) {
              prefillPayload.height = prefillExamData.height;
            }
            if (prefillExamData.weight) {
              prefillPayload.weight = prefillExamData.weight;
            }
            // Combine systolic/diastolic into bloodPressure format
            const sys = prefillExamData.systolic || systolic;
            const dia = prefillExamData.diastolic || diastolic;
            if (sys && dia) {
              prefillPayload.bloodPressure = `${sys}/${dia}`;
            }
            if (Object.keys(prefillPayload).length > 0 && userId) {
              await updatePrefillObstetricData(prefillPayload, userId);
            }
          } catch (prefillError) {
            // Silently fail - main save succeeded
          }
        }

        message.success(editIndex >= 0 ? 'Examination updated' : 'Examination added');
        setPrefillExamData({}); // Reset prefill tracking

        // Update parent prefill (same as web) so next "Add visit" shows latest height/weight/BP
        if (setPrefillObstetricData && (mothersHeight || mothersWeight || systolic || diastolic)) {
          setPrefillObstetricData(prev => ({
            ...prev,
            ...(mothersHeight && { height: mothersHeight }),
            ...(mothersWeight && { weight: mothersWeight }),
            ...(systolic && diastolic && { bloodPressure: `${systolic}/${diastolic}` }),
          }));
        }

        // Reset dirty and modal state so "Unsaved Changes" popup doesn't show after save or on re-open
        setIsDirty(false);
        setDiscardChangesModalVisible(false);
        if (onSave) {
          onSave(payload.currentPregnancy);
        }
        onClose?.();
      } else {
        errorMessage('Failed to save examination');
      }
    } catch (error) {
      errorMessage('Error saving examination. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!patient_data?.patient_unique_id) {
      errorMessage('Patient information is missing');
      return;
    }
    if (editIndex < 0) return;

    setLoading(true);

    try {
      let newExaminationHistory = [...examinationHistory].reverse();
      newExaminationHistory.splice(editIndex, 1);

      const currentPregnancy = allObstetricDetails?.currentPregnancy || {};
      const payload = {
        ...allObstetricDetails,
        currentPregnancy: {
          ...currentPregnancy,
          patientId: patient_data.patient_unique_id,
          examinationHistory: newExaminationHistory.reverse(),
          ancHistory: currentPregnancy?.ancHistory || [],
          immunisationHistory: currentPregnancy?.immunisationHistory || [],
        },
      };

      const response = await upsertObstetricDetails(patient_data.patient_unique_id, payload);

      if (response) {
        dispatch(addObstetricDetails(payload));
        dispatch(patientDiagnosisUpdated());
        dispatch(obstetricDetailsUpdated());

        message.success('Examination deleted');

        setIsDirty(false);
        setDiscardChangesModalVisible(false);
        if (onSave) {
          onSave(payload.currentPregnancy);
        }
        onClose?.();
      } else {
        errorMessage('Failed to delete examination');
      }
    } catch (error) {
      errorMessage('Error deleting examination');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (isDirty) {
      setDiscardChangesModalVisible(true);
    } else {
      resetForm();
      onClose?.();
    }
  };

  const handleConfirmDiscard = () => {
    setDiscardChangesModalVisible(false);
    setIsDirty(false);
    resetForm();
    onClose?.();
  };

  // Number only input handler
  const handleNumberInput = (value, setter, allowDecimal = false, prefillField = null) => {
    setIsDirty(true);
    let cleaned;
    if (allowDecimal) {
      cleaned = value.replace(/[^0-9.]/g, '');
    } else {
      cleaned = value.replace(/[^0-9]/g, '');
    }
    setter(cleaned);
    
    // Track prefill data for height, weight, and blood pressure
    if (prefillField) {
      setPrefillExamData(prev => ({ ...prev, [prefillField]: cleaned }));
    }
  };

  return (
    <Drawer
      placement="bottom"
      open={visible}
      onClose={handleClose}
      closable={false}
      height="90vh"
      className="mobile-current-examination-edit"
      destroyOnClose
    >
      <div className="mobile-examination-content">
        {/* Header */}
        <div className="mobile-examination-header">
          <h2 className="mobile-examination-title">
            {editIndex >= 0 ? `Edit Visit ${editIndex + 1}` : 'Add Examination'}
          </h2>
          <div className="header-actions">
            {editIndex >= 0 && (
              <button className="delete-btn" onClick={handleDelete}>
                <img src={deleteIcon} alt="Delete" />
              </button>
            )}
            <button className="mobile-examination-close" onClick={handleClose}>
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="mobile-examination-body">
          {/* Date */}
          <div className="form-section">
            <p className="section-label">Visit Date</p>
            <DatePicker
              value={date ? dayjs(date) : null}
              onChange={(d) => { setIsDirty(true); setDate(d ? d.format('YYYY-MM-DD') : null); }}
              format="DD-MM-YYYY"
              placeholder="Select Date"
              disabledDate={(current) => current && current > dayjs()}
              style={{ width: '100%' }}
              className="exam-date-picker"
            />
          </div>

          {/* Pallor & Oedema */}
          <div className="form-section">
            <p className="section-label">General Examination</p>
            <div className="exam-grid">
              <div className="exam-item">
                <span className="exam-label">Pallor</span>
                <Radio.Group
                  value={pallor}
                  onChange={(e) => { setIsDirty(true); setPallor(e.target.value); }}
                  className="exam-radio-group"
                >
                  <Radio.Button value={true}>Yes</Radio.Button>
                  <Radio.Button value={false}>No</Radio.Button>
                </Radio.Group>
              </div>
              <div className="exam-item">
                <span className="exam-label">Oedema</span>
                <Radio.Group
                  value={oedema}
                  onChange={(e) => { setIsDirty(true); setOedema(e.target.value); }}
                  className="exam-radio-group"
                >
                  <Radio.Button value={true}>Yes</Radio.Button>
                  <Radio.Button value={false}>No</Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </div>

          {/* Body Measurements */}
          <div className="form-section">
            <p className="section-label">Body Measurements</p>
            <div className="exam-grid">
              <div className="exam-item">
                <span className="exam-label">Height (cm)</span>
                <Input
                  value={mothersHeight}
                  onChange={(e) => handleNumberInput(e.target.value, setMothersHeight, false, 'height')}
                  placeholder="Enter"
                  className="exam-input"
                  suffix="cm"
                  inputMode="numeric"
                />
              </div>
              <div className="exam-item">
                <span className="exam-label">Weight (kg)</span>
                <Input
                  value={mothersWeight}
                  onChange={(e) => handleNumberInput(e.target.value, setMothersWeight, true, 'weight')}
                  placeholder="Enter"
                  className="exam-input"
                  suffix="kg"
                  inputMode="decimal"
                />
              </div>
              <div className="exam-item">
                <span className="exam-label">BMI (Auto)</span>
                <Input
                  value={mothersBMI ? `${mothersBMI} kg/m²` : '-'}
                  disabled
                  className="exam-input disabled"
                />
              </div>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="form-section">
            <p className="section-label">Blood Pressure</p>
            <div className="exam-grid">
              <div className="exam-item">
                <span className="exam-label">Systolic (mmHg)</span>
                <Input
                  value={systolic}
                  onChange={(e) => handleNumberInput(e.target.value, setSystolic, false, 'systolic')}
                  placeholder="Enter"
                  className="exam-input"
                  suffix="mmHg"
                  inputMode="numeric"
                />
              </div>
              <div className="exam-item">
                <span className="exam-label">Diastolic (mmHg)</span>
                <Input
                  value={diastolic}
                  onChange={(e) => handleNumberInput(e.target.value, setDiastolic, false, 'diastolic')}
                  placeholder="Enter"
                  className="exam-input"
                  suffix="mmHg"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>

          {/* Obstetric Examination */}
          <div className="form-section">
            <p className="section-label">Obstetric Examination</p>
            <div className="exam-grid">
              <div className="exam-item full-width">
                <span className="exam-label">Height of Fundus</span>
                <div className="fundus-input-group">
                  <Input
                    value={heightOfFundus}
                    onChange={(e) => handleNumberInput(e.target.value, setHeightOfFundus)}
                    placeholder="Enter"
                    className="exam-input fundus-input"
                    inputMode="numeric"
                  />
                  <Radio.Group
                    value={heightOfFundusUnit}
                    onChange={(e) => { setIsDirty(true); setHeightOfFundusUnit(e.target.value); }}
                    className="fundus-unit-group"
                  >
                    <Radio.Button value="cm">cm</Radio.Button>
                    <Radio.Button value="weeks">Weeks</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div className="exam-item">
                <span className="exam-label">Presentation</span>
                <Select
                  value={presentation}
                  onChange={(val) => { setIsDirty(true); setPresentation(val); }}
                  placeholder="Select"
                  options={PresentationOptions}
                  className="exam-select"
                  allowClear
                />
              </div>
              <div className="exam-item">
                <span className="exam-label">Liquor</span>
                <Select
                  value={liquor}
                  onChange={(val) => { setIsDirty(true); setLiquor(val); }}
                  placeholder="Select"
                  options={LiquorOptions}
                  className="exam-select"
                  allowClear
                />
              </div>
              <div className="exam-item">
                <span className="exam-label">Fetal Heart Rate (BPM)</span>
                <Input
                  value={foetalHeartRate}
                  onChange={(e) => handleNumberInput(e.target.value, setFoetalHeartRate)}
                  placeholder="Enter"
                  className="exam-input"
                  suffix="bpm"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="form-section">
            <p className="section-label">Notes</p>
            <TextArea
              value={notes}
              onChange={(e) => { setIsDirty(true); setNotes(e.target.value); }}
              placeholder="Enter notes..."
              className="exam-notes"
              rows={3}
              maxLength={500}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mobile-examination-footer">
          <Button
            type="primary"
            block
            className="save-btn"
            onClick={handleSave}
            loading={loading}
            disabled={!date || !hasAnyData}
          >
            {editIndex >= 0 ? 'Update' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Discard Changes Modal */}
      <Modal
        open={discardChangesModalVisible}
        onCancel={() => setDiscardChangesModalVisible(false)}
        footer={null}
        centered
        width={320}
        className="discard-changes-modal"
        closable={false}
      >
        <div className="delete-modal-content">
          <div className="delete-modal-header">
            <h3>Unsaved Changes</h3>
          </div>
          <div className="delete-modal-body">
            <div className="alert-warning-box">
              <img src={alertIcon} alt="Warning" className="alert-icon" />
              <span>
                You have unsaved changes. Are you sure you want to discard them?
              </span>
            </div>
          </div>
          <div className="delete-modal-footer">
            <button
              type="button"
              className="yes-delete-btn"
              onClick={handleConfirmDiscard}
            >
              Discard Changes
            </button>
            <Button
              type="primary"
              className="no-keep-btn"
              onClick={() => setDiscardChangesModalVisible(false)}
            >
              Keep Editing
            </Button>
          </div>
        </div>
      </Modal>
    </Drawer>
  );
}

export default MobileCurrentExaminationEdit;
