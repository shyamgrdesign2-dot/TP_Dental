import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchInvestigation, getFrequentlySearchedInvestigation } from '../../redux/investigationSlice';
import { searchMedication, getFrequentlySearchedMedication } from '../../redux/medicationSlice';
import { removeBeforeWhiteSpace } from '../../utils/utils';
import examinationIcon from '../../assets/images/Examination.svg';
import diagnosisIcon from '../../assets/images/Diagnosis.svg';
import vitalsIcon from '../../assets/images/Vitals.svg';
import medicationIcon from '../../assets/images/Medication.svg';
import labIcon from '../../assets/images/Lab.svg';
import medicalHistoryIcon from '../../assets/images/Medical-History.svg';
import adviceIcon from '../../assets/images/advice.svg';
import followUpIcon from '../../assets/images/followup.svg';
import gynecHistoryIcon from '../../assets/images/obstetric-dark.svg';
import obstetricHistoryIcon from '../../assets/images/obstetric-dark.svg';
import surgeryIcon from '../../assets/images/surgery.svg';
import vaccinationIcon from '../../assets/images/Vaccination.svg';
// import editIcon from '../../assets/images/edit-icon-blue.svg';
import editIcon from '../../assets/mobile/edit.svg';
import deleteIcon from '../../assets/images/Delete.svg';
import frameIcon from '../../assets/mobile/Frame_3.svg';
import logoutIcon from '../../assets/mobile/logout.svg';
// Rich Text Editor Components
import VitalsRichTextEditor from '../VitalsRichTextEditor';
import MedicalHistoryRichTextEditor from '../MedicalHistoryRichTextEditor';
import ExaminationRichTextEditor from '../ExaminationRichTextEditor';
import DiagnosisRichTextEditor from '../DiagnosisRichTextEditor';
import LabResultsRichTextEditor from '../LabResultsRichTextEditor';
import AdviceRichTextEditor from '../AdviceRichTextEditor';
import VaccinationsRichTextEditor from '../VaccinationsRichTextEditor';
import FollowUpRichTextEditor from '../FollowUpRichTextEditor';
import AdditionalNotesRichTextEditor from '../AdditionalNotesRichTextEditor';
import CustomModuleRichTextEditor from '../CustomModuleRichTextEditor';
import LabInvestigationEditSheet from './LabInvestigationEditSheet';
import MedicationEditSheet from './MedicationEditSheet';
import AddCustomMedicineSheet from './AddCustomMedicineSheet';
import SymptomsRichTextEditor from '../SymptomsRichTextEditor';
import './MobileRxPadContent.scss';

const MobileRxPadContent = ({ prescriptionData, onUpdate, onEditWithVoice, onEndVisit, isProcessing = false }) => {
  const dispatch = useDispatch();
  const { parentOptionsList = [] } = useSelector((state) => state.investigation);
  const { parentOptionsList: medicationParentList = [] } = useSelector((state) => state.medication);
  const labSearchDebounceRef = useRef(null);
  const medicationSearchDebounceRef = useRef(null);

  const [expandedGroups, setExpandedGroups] = useState(new Set(['MEDICAL CONDITIONS', 'ALLERGY', 'FAMILY HISTORY', 'LIFESTYLE', 'ADDITIONAL NOTES']));
  const [medicationSearch, setMedicationSearch] = useState('');
  const [labInvestigationSearch, setLabInvestigationSearch] = useState('');
  const [labInvestigationEdit, setLabInvestigationEdit] = useState({ visible: false, index: -1 });
  const [medicationEdit, setMedicationEdit] = useState({ visible: false, index: -1, prefillName: null, prefillMetadata: null });
  const [addCustomMedicine, setAddCustomMedicine] = useState({ visible: false, initialName: '' });

  // Web-like: empty -> FREQUENTLY USED; typing -> debounced searchInvestigation
  useEffect(() => {
    if (labSearchDebounceRef.current) clearTimeout(labSearchDebounceRef.current);
    const q = (labInvestigationSearch || '').trim();
    if (!q) {
      dispatch(getFrequentlySearchedInvestigation());
      return;
    }
    labSearchDebounceRef.current = setTimeout(() => {
      dispatch(searchInvestigation({ searchQuery: q, type: 'parent' }));
    }, 500);
    return () => { if (labSearchDebounceRef.current) clearTimeout(labSearchDebounceRef.current); };
  }, [labInvestigationSearch, dispatch]);

  // Medication: empty -> getFrequentlySearchedMedication; typing -> debounced searchMedication (same as web)
  useEffect(() => {
    if (medicationSearchDebounceRef.current) clearTimeout(medicationSearchDebounceRef.current);
    const q = (medicationSearch || '').trim();
    if (!q) {
      dispatch(getFrequentlySearchedMedication());
      return;
    }
    medicationSearchDebounceRef.current = setTimeout(() => {
      dispatch(searchMedication({ searchQuery: q, type: 'parent' }));
    }, 500);
    return () => { if (medicationSearchDebounceRef.current) clearTimeout(medicationSearchDebounceRef.current); };
  }, [medicationSearch, dispatch]);

  // Options: parentOptionsList + "FREQUENTLY USED" when empty + "Add as custom" when no match (match web)
  const labInvestigationOptions = useMemo(() => {
    const list = Array.isArray(parentOptionsList) ? parentOptionsList : [];
    const q = (labInvestigationSearch || '').trim();
    const opts = [];
    if (q.length === 0) {
      opts.push({ key: -1, value: '', label: 'FREQUENTLY USED', disabled: true });
    }
    list.filter((inv) => inv && inv.investigation_name).forEach((inv, idx) => {
      opts.push({ key: JSON.stringify({ ...inv, _i: idx }), value: inv.investigation_name, label: inv.investigation_name });
    });
    if (q.length > 0) {
      const exact = list.some((inv) => (inv.investigation_name || '').toLowerCase().trim() === q.toLowerCase());
      if (!exact) {
        opts.push({ key: JSON.stringify({ change: 1, investigation_name: q }), value: q, label: `Add "${q}" as custom` });
      }
    }
    return opts;
  }, [parentOptionsList, labInvestigationSearch]);

  const medicationOptions = useMemo(() => {
    const list = Array.isArray(medicationParentList) ? medicationParentList : [];
    const q = (medicationSearch || '').trim();
    const opts = [];
    if (q.length === 0) {
      opts.push({ key: -1, value: '', label: 'SUGGESTED', disabled: true });
    }
    list.filter((m) => m && (m.tmm_medicine_name || m.medicine_name)).forEach((m) => {
      const nm = m.tmm_medicine_name || m.medicine_name;
      opts.push({ key: JSON.stringify(m), value: nm, label: nm });
    });
    if (q.length > 0) {
      const exact = list.some(
        (m) => (m.tmm_medicine_name || m.medicine_name || '').toLowerCase().trim() === q.toLowerCase()
      );
      if (!exact) {
        opts.push({ key: JSON.stringify({ tmm_id: 0, tmm_medicine_name: q }), value: q, label: `Add "${q}" as custom` });
      }
    }
    return opts;
  }, [medicationParentList, medicationSearch]);

  // Toggle medical history group expansion
  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  };

  // Handle delete for array items
  const handleDelete = (section, index) => {
    if (!onUpdate) return;
    const newData = { ...prescriptionData };
    if (Array.isArray(newData[section])) {
      newData[section] = newData[section].filter((_, i) => i !== index);
      onUpdate(newData);
    }
  };

  // Handle delete for custom module
  const handleDeleteCustomModule = (moduleName) => {
    if (!onUpdate) return;
    const newData = { ...prescriptionData };
    if (newData.dynamicFields) {
      const updatedDynamicFields = { ...newData.dynamicFields };
      delete updatedDynamicFields[moduleName];
      newData.dynamicFields = updatedDynamicFields;
      onUpdate(newData);
    }
  };

  // Handle delete for custom module item
  const handleDeleteCustomModuleItem = (moduleName, index) => {
    if (!onUpdate) return;
    const newData = { ...prescriptionData };
    if (newData.dynamicFields && Array.isArray(newData.dynamicFields[moduleName])) {
      newData.dynamicFields[moduleName] = newData.dynamicFields[moduleName].filter((_, i) => i !== index);
      onUpdate(newData);
    }
  };

  // Handle edit: opens section-specific edit sheet (labInvestigation, medications)
  const handleEdit = (section, index) => {
    if (section === 'labInvestigation') {
      setLabInvestigationEdit({ visible: true, index });
    }
    if (section === 'medications') {
      setMedicationEdit({ visible: true, index, prefillName: null, prefillMetadata: null });
    }
  };

  const handleLabInvestigationSave = (value) => {
    if (!onUpdate) return;
    const arr = [...(prescriptionData?.labInvestigation || [])];
    const i = labInvestigationEdit.index;
    if (i < 0 || i >= arr.length) return;
    const existing = arr[i] && typeof arr[i] === 'object' ? arr[i] : { name: arr[i], lineItem: arr[i] };
    arr[i] = {
      ...existing,
      name: value.name,
      lineItem: value.name,
      notes: value.notes || '',
      instruction: value.notes || '',
      ...(value.hm_type !== undefined && { hm_type: value.hm_type }),
      ...(value.um_id !== undefined && { um_id: value.um_id }),
    };
    onUpdate({ ...prescriptionData, labInvestigation: arr });
    setLabInvestigationEdit({ visible: false, index: -1 });
  };

  const handleMedicationSave = (value) => {
    if (!onUpdate) return;
    const arr = [...(prescriptionData?.medications || [])];
    const i = medicationEdit.index;
    if (i >= 0 && i < arr.length) {
      arr[i] = { ...arr[i], ...value };
    } else {
      arr.push(value);
    }
    onUpdate({ ...prescriptionData, medications: arr });
    setMedicationEdit({ visible: false, index: -1, prefillName: null, prefillMetadata: null });
    setMedicationSearch('');
  };

  const handleMedicationAddFromSearch = useCallback((value, option) => {
    if (!option?.key || option.key === -1 || option.key === '-1') return;
    try {
      const parsed = JSON.parse(option.key);
      const name = parsed?.tmm_medicine_name || parsed?.medicine_name || value;
      if (parsed?.tmm_id === 0) {
        setAddCustomMedicine({ visible: true, initialName: name });
        setMedicationSearch('');
        return;
      }
      setMedicationEdit({ visible: true, index: -1, prefillName: name, prefillMetadata: parsed });
      setMedicationSearch('');
    } catch {
      setMedicationEdit({ visible: true, index: -1, prefillName: value, prefillMetadata: null });
      setMedicationSearch('');
    }
  }, []);

  // Web-like: onSelect from search adds to list inline (no Add sheet)
  const handleLabInvestigationAddFromSearch = useCallback((value, option) => {
    if (!onUpdate || !option?.key || option.key === -1 || option.key === '-1' || option.key === '-2') return;
    try {
      const parsed = JSON.parse(option.key);
      const name = parsed?.change === 1 ? (parsed.investigation_name || value) : (parsed?.investigation_name || value);
      const newItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name,
        lineItem: name,
        notes: '',
        instruction: '',
        ...(parsed?.change !== 1 && parsed?.hm_type !== undefined && { hm_type: parsed.hm_type }),
        ...(parsed?.change !== 1 && parsed?.um_id !== undefined && { um_id: parsed.um_id }),
      };
      const arr = [...(prescriptionData?.labInvestigation || []), newItem];
      onUpdate({ ...prescriptionData, labInvestigation: arr });
      setLabInvestigationSearch('');
    } catch {
      const newItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: value,
        lineItem: value,
        notes: '',
        instruction: '',
      };
      const arr = [...(prescriptionData?.labInvestigation || []), newItem];
      onUpdate({ ...prescriptionData, labInvestigation: arr });
      setLabInvestigationSearch('');
    }
  }, [onUpdate, prescriptionData]);

  // Render Section Component. showWhenEmpty: when true, still render (e.g. Lab Investigation with Add)
  const renderSection = (title, icon, data, renderContent, headerActions = null, showWhenEmpty = false) => {
    const isEmpty = !data || (Array.isArray(data) && data.length === 0) ||
      (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0) ||
      (typeof data === 'string' && !data.trim());
    if (isEmpty && !showWhenEmpty) return null;

    return (
      <div className="rx-section-card">
        <div className="section-header">
          <div className="header-left">
            <img src={icon} alt={title} className="section-icon" />
          <span className="section-title">{title}</span>
          </div>
          {headerActions && <div className="header-right">{headerActions}</div>}
        </div>
        <div className="section-content">
          {renderContent ? renderContent(data) : (
            <div className="section-text">
              {typeof data === 'string' ? data : JSON.stringify(data)}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render List Items with Edit/Delete
  const renderListItemsWithActions = (items, sectionName) => {
    if (!Array.isArray(items) || items.length === 0) return null;
    
    return (
      <ul className="section-list">
        {items.map((item, index) => {
          const text = typeof item === 'string' ? item : item?.lineItem || item?.name || item?.notes || JSON.stringify(item);
          return (
            <li key={index} className="list-item-with-actions">
              <span className="item-text">{text}</span>
              <div className="item-actions">
                <button 
                  type="button"
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(sectionName, index)}
                >
                  <img src={editIcon} alt="Edit" />
                </button>
                <button 
                  type="button"
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(sectionName, index)}
                >
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  // Render Vitals - Single Line Format
  const renderVitals = (vitals) => {
    if (!vitals || typeof vitals !== 'object') return null;
    
    const vitalFields = [
      { key: 'pulse', label: 'Pulse', suffix: 'f' },
      { key: 'bp', label: 'BP', suffix: '' },
      { key: 'temperature', label: 'Temperature', suffix: 'F' },
      { key: 'spo2', label: 'SpO2', suffix: '%' },
      { key: 'rr', label: 'RR', suffix: '/Min' },
      { key: 'weight', label: 'Weight', suffix: 'Kg' },
      { key: 'height', label: 'Height', suffix: 'cms' },
      { key: 'generalRbs', label: 'General Pbs', suffix: 'mg/Dl' },
    ];

    const vitalParts = vitalFields
      .filter(field => vitals[field.key])
      .map(field => {
        const value = vitals[field.key];
        return `${field.label}: ${value}${field.suffix}`;
      });

    if (vitalParts.length === 0) return null;

    return (
      <div className="vitals-single-line">
        {vitalParts.join(' | ')}
      </div>
    );
  };

  // Render Medications: card list (Edit/Delete) + AutoComplete to add via bottom sheet. UX like Lab Investigation; functionality matches web.
  const renderMedications = (medications) => {
    const list = Array.isArray(medications) ? medications : [];
    return (
      <div className="medications-list">
        {list.map((med, index) => {
          const name = med?.name || med?.lineItem;
          const dosage = med?.dosage;
          const frequency = med?.frequency;
          const schedule = med?.schedule;
          const duration = med?.duration;
          const quantity = med?.quantity;
          const notes = med?.notes || med?.instructions;
          const details = [dosage, frequency, schedule, duration, quantity != null && quantity !== '' ? `Qty: ${quantity}` : null].filter(Boolean).join(' | ');
          return (
            <div key={med?.id || index} className="medication-card">
              <div className="med-content">
                <div className="med-name">{name}</div>
                {details && <div className="med-details">{details}</div>}
                {notes && <div className="med-instructions">{notes}</div>}
              </div>
              <div className="med-actions">
                <button
                  type="button"
                  className="action-btn edit-btn"
                  onClick={() => handleEdit('medications', index)}
                >
                  <img src={editIcon} alt="Edit" />
                </button>
                <button
                  type="button"
                  className="action-btn delete-btn"
                  onClick={() => handleDelete('medications', index)}
                >
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
            </div>
          );
        })}
        <AutoComplete
          value={medicationSearch}
          onSearch={(v) => setMedicationSearch(removeBeforeWhiteSpace(v))}
          onSelect={handleMedicationAddFromSearch}
          options={medicationOptions}
          defaultActiveFirstOption
          getPopupContainer={() => document.body}
          className="search-input medication-autocomplete"
        >
          <Input
            placeholder="Search by Medication Name"
            prefix={<SearchOutlined className="lab-search-icon" />}
            allowClear
          />
        </AutoComplete>
      </div>
    );
  };

  // Render Lab Investigation: list (Edit/Delete) + search. Web-like: type → FREQUENTLY USED / results → onSelect adds inline.
  const renderLabInvestigation = (labInvestigation) => {
    const list = Array.isArray(labInvestigation) ? labInvestigation : [];

    return (
      <div className="lab-investigation-list">
        {list.map((item, index) => {
          const name = typeof item === 'string' ? item : item?.name || item?.lineItem;
          const notes = item?.notes;

          return (
            <div key={item?.id || index} className="lab-investigation-card">
              <div className="lab-content">
                <div className="lab-name">{name}</div>
                {notes && <div className="lab-notes">Note: {notes}</div>}
              </div>
              <span className="lab-actions-divider" aria-hidden />
              <div className="lab-actions">
                <button
                  type="button"
                  className="action-btn edit-btn"
                  onClick={() => handleEdit('labInvestigation', index)}
                >
                  <img src={editIcon} alt="Edit" />
                </button>
                <button
                  type="button"
                  className="action-btn delete-btn"
                  onClick={() => handleDelete('labInvestigation', index)}
                >
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
            </div>
          );
        })}
        <AutoComplete
          value={labInvestigationSearch}
          onSearch={(v) => setLabInvestigationSearch(removeBeforeWhiteSpace(v))}
          onSelect={handleLabInvestigationAddFromSearch}
          options={labInvestigationOptions}
          defaultActiveFirstOption
          getPopupContainer={() => document.body}
          className="search-input lab-investigation-autocomplete"
        >
          <Input
            placeholder="Search by Investigation Name"
            prefix={<SearchOutlined className="lab-search-icon" />}
            allowClear
          />
        </AutoComplete>
      </div>
    );
  };

  // Render Medical History (Grouped & Collapsible)
  const renderMedicalHistory = (medicalHistory) => {
    if (!Array.isArray(medicalHistory) || medicalHistory.length === 0) return null;
    
    const grouped = {
      'MEDICAL CONDITIONS': [],
      'ALLERGY': [],
      'FAMILY HISTORY': [],
      'LIFESTYLE': [],
      'ADDITIONAL NOTES': []
    };

    medicalHistory.forEach(item => {
      const type = item?.type?.toUpperCase() || 'ADDITIONAL NOTES';
      const key = Object.keys(grouped).find(k => type.includes(k)) || 'ADDITIONAL NOTES';
      grouped[key].push(item);
    });

    return (
      <div className="medical-history-groups">
        {Object.entries(grouped).map(([type, items]) => {
          if (items.length === 0) return null;
          const isExpanded = expandedGroups.has(type);
          
          return (
            <div key={type} className="history-group">
              <div className="group-header" onClick={() => toggleGroup(type)}>
                <span className="group-title">{type}</span>
                <i className={`icon-arrow-${isExpanded ? 'up' : 'down'}`} />
              </div>
              {isExpanded && (
                <div className="group-items">
                  {items.map((item, index) => {
                    const originalIndex = medicalHistory.indexOf(item);
                    const text = item?.lineItem || item?.name || item;
                    const since = item?.since;
                    const status = item?.status;
                    const notes = item?.notes;
                    const relation = item?.relation;
                    
                    const metaParts = [];
                    if (since) metaParts.push(`Since: ${since}`);
                    if (status) metaParts.push(`Status: ${status}`);
                    if (relation) metaParts.push(`Relation: ${relation}`);
                    if (notes) metaParts.push(`Notes: ${notes}`);
                    
                    return (
                      <div key={index} className="history-item">
                        <div className="history-content">
                          <span className="history-text">{text}</span>
                          {metaParts.length > 0 && (
                            <span className="history-meta">
                              {metaParts.join(' | ')}
                            </span>
                          )}
                        </div>
                        <div className="item-actions">
                          <button 
                            type="button"
                            className="action-btn edit-btn"
                            onClick={() => handleEdit('medicalHistory', originalIndex)}
                          >
                            <img src={editIcon} alt="Edit" />
                          </button>
                          <button 
                            type="button"
                            className="action-btn delete-btn"
                            onClick={() => handleDelete('medicalHistory', originalIndex)}
                          >
                            <img src={deleteIcon} alt="Delete" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <button 
          type="button"
          className="add-edit-button"
          onClick={() => {
            // TODO: Open medical history add/edit modal
          }}
        >
          Add/Edit
        </button>
      </div>
    );
  };

  // Render Gynae History with Edit/Delete
  const renderGynaeHistory = (gynecHistory) => {
    if (!gynecHistory || (Array.isArray(gynecHistory) && gynecHistory.length === 0)) return null;
    
    return (
      <div className="gynae-history-list">
        {Array.isArray(gynecHistory) ? (
          renderListItemsWithActions(gynecHistory, 'gynecHistory')
        ) : (
          <div className="gynae-history-content">
            {Object.entries(gynecHistory).map(([key, value]) => (
              <div key={key} className="gynae-item">
                <span className="gynae-label">{key}:</span>
                <span className="gynae-value">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render Obstetric History with Edit/Delete
  const renderObstetricHistory = (obstetricHistory) => {
    if (!obstetricHistory || (Array.isArray(obstetricHistory) && obstetricHistory.length === 0)) return null;
    
    return renderListItemsWithActions(obstetricHistory, 'obstetricHistory');
  };

  // Render Surgeries & Procedures with Edit/Delete
  const renderSurgeries = (surgeries) => {
    if (!Array.isArray(surgeries) || surgeries.length === 0) return null;
    
    return renderListItemsWithActions(surgeries, 'surgeriesAndProcedures');
  };

  // Render Lab Results with Edit/Delete
  const renderLabResults = (labResults) => {
    if (!Array.isArray(labResults) || labResults.length === 0) return null;
    
    return renderListItemsWithActions(labResults, 'labResults');
  };

  // Render List Items (simple)
  const renderListItems = (items) => {
    if (!Array.isArray(items) || items.length === 0) return null;
    
    return (
      <ul className="section-list">
        {items.map((item, index) => {
          const text = typeof item === 'string' ? item : item?.lineItem || item?.name || item?.notes || JSON.stringify(item);
          return (
            <li key={index} className="list-item">
              <span className="item-text">{text}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  // Render Custom Modules with Edit/Delete
  const renderCustomModules = (dynamicFields) => {
    if (!dynamicFields || typeof dynamicFields !== 'object') return null;
    
    const modules = Object.entries(dynamicFields).filter(([key, value]) => 
      Array.isArray(value) && value.length > 0
    );

    if (modules.length === 0) return null;

    return modules.map(([moduleName, moduleData]) => (
      <div key={moduleName} className="rx-section-card custom-module-card">
        <div className="section-header">
          <div className="header-left">
            <span className="section-title">{moduleName}</span>
          </div>
          <div className="header-right">
            <button 
              type="button"
              className="action-btn delete-btn"
              onClick={() => handleDeleteCustomModule(moduleName)}
              title="Delete Module"
            >
              <img src={deleteIcon} alt="Delete Module" />
            </button>
          </div>
        </div>
        <div className="section-content">
          <ul className="section-list">
            {moduleData.map((item, index) => {
              const text = typeof item === 'string' ? item : item?.lineItem || item?.name || JSON.stringify(item);
              return (
                <li key={index} className="list-item-with-actions">
                  <span className="item-text">{text}</span>
                  <div className="item-actions">
                    <button 
                      type="button"
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(`dynamicFields.${moduleName}`, index)}
                    >
                      <img src={editIcon} alt="Edit" />
                    </button>
                    <button 
                      type="button"
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteCustomModuleItem(moduleName, index)}
                    >
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    ));
  };

  // Update handlers for Rich Text Editor sections
  const handleVitalsUpdate = (vitals) => {
    const updatedData = { ...prescriptionData, vitalsAndBodyComposition: vitals };
    onUpdate(updatedData);
  };

  const handleMedicalHistoryUpdate = (medicalHistory) => {
    const updatedData = { ...prescriptionData, medicalHistory };
    onUpdate(updatedData);
  };

  const handleSymptomsUpdate = (symptoms) => {
    const updatedData = { ...prescriptionData, symptoms };
    onUpdate(updatedData);
  };

  const handleExaminationsUpdate = (examinations) => {
    const updatedData = { ...prescriptionData, examinations };
    onUpdate(updatedData);
  };

  const handleDiagnosisUpdate = (diagnosis) => {
    const updatedData = { ...prescriptionData, diagnosis };
    onUpdate(updatedData);
  };

  const handleLabResultsUpdate = (labResults) => {
    const updatedData = { ...prescriptionData, labResults };
    onUpdate(updatedData);
  };

  const handleAdviceUpdate = (advice) => {
    const updatedData = { ...prescriptionData, advice };
    onUpdate(updatedData);
  };

  const handleVaccinationsUpdate = (vaccinations) => {
    const updatedData = { ...prescriptionData, vaccinations };
    onUpdate(updatedData);
  };

  const handleFollowUpUpdate = (followUp) => {
    const updatedData = { ...prescriptionData, followUp };
    onUpdate(updatedData);
  };

  const handleAdditionalNotesUpdate = (others) => {
    const updatedData = { ...prescriptionData, others };
    onUpdate(updatedData);
  };

  const handleCustomModuleUpdate = (moduleName, moduleArray) => {
    const updatedData = {
      ...prescriptionData,
      dynamicFields: {
        ...prescriptionData.dynamicFields,
        [moduleName]: moduleArray
      }
    };
    onUpdate(updatedData);
  };

  return (
    <div className="mobile-rx-pad-content-wrapper">
      {/* Rich Text Editor Sections */}
      {(prescriptionData?.vitalsAndBodyComposition && 
        Object.values(prescriptionData.vitalsAndBodyComposition).some(value => 
          value !== undefined && value !== null && value !== ''
        )) && (
        <VitalsRichTextEditor
          vitalsAndBodyComposition={prescriptionData?.vitalsAndBodyComposition || {}}
          onUpdate={handleVitalsUpdate}
          isProcessing={isProcessing}
        />
      )}

      {(prescriptionData?.medicalHistory && 
        Array.isArray(prescriptionData.medicalHistory) && 
        prescriptionData.medicalHistory.length > 0) && (
        <MedicalHistoryRichTextEditor
          medicalHistory={prescriptionData?.medicalHistory || []}
          onUpdate={handleMedicalHistoryUpdate}
          isProcessing={isProcessing}
        />
      )}

      {/* Symptoms - inline rich text editor (same as web, no bottom sheet). Visibility matches DigitisedPrescription: only when has content. */}
      {(prescriptionData?.symptoms &&
        Array.isArray(prescriptionData.symptoms) &&
        prescriptionData.symptoms.length > 0) && (
        <SymptomsRichTextEditor
          symptoms={prescriptionData.symptoms}
          onUpdate={handleSymptomsUpdate}
          isProcessing={isProcessing}
        />
      )}

      {(prescriptionData?.examinations && 
        Array.isArray(prescriptionData.examinations) && 
        prescriptionData.examinations.length > 0) && (
        <ExaminationRichTextEditor
          examinations={prescriptionData?.examinations || []}
          onUpdate={handleExaminationsUpdate}
          isProcessing={isProcessing}
        />
      )}

      {(prescriptionData?.diagnosis && 
        Array.isArray(prescriptionData.diagnosis) && 
        prescriptionData.diagnosis.length > 0) && (
        <DiagnosisRichTextEditor
          diagnosis={prescriptionData?.diagnosis || []}
          onUpdate={handleDiagnosisUpdate}
          isProcessing={isProcessing}
        />
      )}

      {/* Table Sections - Keep Current Implementation */}
      {renderSection('Medication [Rx]', medicationIcon, prescriptionData?.medications, renderMedications, null, true)}
      {renderSection('Lab Investigation', labIcon, prescriptionData?.labInvestigation, renderLabInvestigation, null, true)}

      {/* Rich Text Editor Sections - Continued */}
      {(prescriptionData?.labResults && 
        Array.isArray(prescriptionData.labResults) && 
        prescriptionData.labResults.length > 0) && (
        <LabResultsRichTextEditor
          labResults={prescriptionData?.labResults || []}
          onUpdate={handleLabResultsUpdate}
          isProcessing={isProcessing}
        />
      )}

      {(prescriptionData?.advice && 
        ((typeof prescriptionData.advice === 'string' && prescriptionData.advice.trim()) ||
          (Array.isArray(prescriptionData.advice) && prescriptionData.advice.length > 0))) && (
        <AdviceRichTextEditor
          advice={prescriptionData?.advice 
            ? (typeof prescriptionData.advice === 'string' 
                ? [{ lineItem: prescriptionData.advice }]
                : prescriptionData.advice.map(adv => 
                    typeof adv === 'string' 
                      ? { lineItem: adv }
                      : adv
                  ))
            : []}
          onUpdate={handleAdviceUpdate}
          isProcessing={isProcessing}
        />
      )}

      {(prescriptionData?.vaccinations && 
        Array.isArray(prescriptionData.vaccinations) && 
        prescriptionData.vaccinations.length > 0) && (
        <VaccinationsRichTextEditor
          vaccinations={prescriptionData?.vaccinations || []}
          onUpdate={handleVaccinationsUpdate}
          isProcessing={isProcessing}
        />
      )}

      {(prescriptionData?.followUp && 
        typeof prescriptionData.followUp === 'string' && 
        prescriptionData.followUp.trim()) && (
        <FollowUpRichTextEditor
          followUp={prescriptionData?.followUp || ''}
          onUpdate={handleFollowUpUpdate}
          isProcessing={isProcessing}
        />
      )}

      {(prescriptionData?.others && 
        Array.isArray(prescriptionData.others) && 
        prescriptionData.others.length > 0) && (
        <AdditionalNotesRichTextEditor
          others={prescriptionData?.others || []}
          onUpdate={handleAdditionalNotesUpdate}
          isProcessing={isProcessing}
        />
      )}

      {/* Custom Modules - Rich Text Editor */}
      {prescriptionData?.dynamicFields && 
        Object.entries(prescriptionData.dynamicFields).map(([moduleName, moduleData]) => {
          const hasContent = Array.isArray(moduleData) && moduleData.length > 0;
          if (!hasContent) return null;
          
          return (
            <CustomModuleRichTextEditor
              key={moduleName}
              moduleName={moduleName}
              moduleData={moduleData || []}
              onUpdate={(moduleArray) => handleCustomModuleUpdate(moduleName, moduleArray)}
              onDelete={(module) => {
                const updatedData = { ...prescriptionData };
                if (updatedData.dynamicFields) {
                  const updatedDynamicFields = { ...updatedData.dynamicFields };
                  delete updatedDynamicFields[module];
                  updatedData.dynamicFields = updatedDynamicFields;
                  onUpdate(updatedData);
                }
              }}
              onEdit={() => {}} // Optional - not implementing module name edit in mobile
              isProcessing={isProcessing}
              isLocalModule={false}
              editingModule={null}
              updatedModuleName=""
              onEditNameChange={() => {}}
              onEditSave={() => {}}
              onEditCancel={() => {}}
            />
          );
        })}

      {/* Mobile-Only Sections - Keep Simple Rendering */}
      {renderSection('Gynae History', gynecHistoryIcon, prescriptionData?.gynecHistory, renderGynaeHistory)}
      {renderSection('Obstetric History', obstetricHistoryIcon, prescriptionData?.obstetricHistory, renderObstetricHistory)}
      {renderSection('Surgeries & Procedures', surgeryIcon, prescriptionData?.surgeriesAndProcedures, renderSurgeries)}
      
      {/* Bottom Action Buttons */}
      <div className="bottom-action-buttons">
        <button 
          type="button"
          className="quick-edit-btn"
          onClick={() => onEditWithVoice && onEditWithVoice('prescription')}
        >
          <img src={frameIcon} alt="Quick Edit" className="btn-icon" />
          <span>Quick Edit</span>
        </button>
        <button 
          type="button"
          className="end-visit-btn"
          onClick={() => onEndVisit && onEndVisit()}
        >
          <img src={logoutIcon} alt="End Visit" className="btn-icon" />
          <span>End Visit</span>
        </button>
      </div>

      {/* Phase 1: Lab Investigation Edit Sheet */}
      <LabInvestigationEditSheet
        visible={labInvestigationEdit.visible}
        onClose={() => setLabInvestigationEdit({ visible: false, index: -1 })}
        item={labInvestigationEdit.index >= 0 ? prescriptionData?.labInvestigation?.[labInvestigationEdit.index] : undefined}
        onSave={handleLabInvestigationSave}
      />

      <MedicationEditSheet
        visible={medicationEdit.visible}
        onClose={() => setMedicationEdit({ visible: false, index: -1, prefillName: null, prefillMetadata: null })}
        item={medicationEdit.index >= 0 ? prescriptionData?.medications?.[medicationEdit.index] : undefined}
        prefillName={medicationEdit.prefillName}
        prefillMetadata={medicationEdit.prefillMetadata}
        onSave={handleMedicationSave}
      />

      <AddCustomMedicineSheet
        visible={addCustomMedicine.visible}
        onClose={() => setAddCustomMedicine({ visible: false, initialName: '' })}
        initialData={addCustomMedicine.initialName ? { tmm_medicine_name: addCustomMedicine.initialName } : null}
        onSuccess={(added) => {
          setAddCustomMedicine({ visible: false, initialName: '' });
          setMedicationEdit({
            visible: true,
            index: -1,
            prefillName: added?.tmm_medicine_name || added?.medicine_name || '',
            prefillMetadata: added || null,
          });
        }}
      />
    </div>
  );
};

export default MobileRxPadContent;
