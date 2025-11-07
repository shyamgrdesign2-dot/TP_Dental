import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AutoComplete, Input, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useFeatureIsOn } from '@growthbook/growthbook-react';
import { useLocation } from 'react-router-dom';
import styles from './ConsultationDrawer.module.css';
import medicationsIcon from '../assets/images/Medication.svg';
import {
  getFrequentlySearchedMedication,
  searchMedication
} from "../redux/medicationSlice";
import { capitalize, removeBeforeWhiteSpace, getTokenData } from '../utils/utils';
import CommonModal from '../common/CommonModal';
import CashManagerContext from '../context/CashManagerContext';
import { env } from '../EnvironmentConfig';
import { GB_ZYDUS_USER, GB_APOLLO_DISABLE_FEATURE } from '../utils/constants';
import { getInvestigationAndMedicine } from '../redux/caseManagerSlice';
import { placeIctOrder } from '../redux/appointmentsSlice';
import ApiMedication from '../api/services/ApiMedication';
import CustomMedicinePopup from './CustomMedicinePopup';

const MedicationsTable = ({
  medications = [],
  onUpdate,
  isProcessing = false,
}) => {
  const dispatch = useDispatch();
  const { parentOptionsList, loading } = useSelector((state) => state.medication);
  const { state } = useLocation();
  const { patient_data } = state || {};
  const { tcmId } = useContext(CashManagerContext);
  const { profile, siteId, storeCode } = useSelector((state) => state.doctors);
  const isApolloHosBusinessIdAccessableFromGB = useFeatureIsOn(GB_APOLLO_DISABLE_FEATURE);
  const isZydusUserAccessableFromGB = useFeatureIsOn(GB_ZYDUS_USER);
  const tokenData = getTokenData();
  const isGroundingAccessable = tokenData?.hospital_business_id === env.zydus_business_id && isZydusUserAccessableFromGB;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [parentSearchOptions, setParentSearchOptions] = useState([]);
  const [editingCell, setEditingCell] = useState(null); // { itemId: '...', field: 'name' }
  const [editValue, setEditValue] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [rowEditValues, setRowEditValues] = useState({});
  const [isTablet, setIsTablet] = useState(false);
  const [showAddMedicinePopup, setShowAddMedicinePopup] = useState(false);
  const [showNonZydusWarning, setShowNonZydusWarning] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);
  const [dontShowZydusWarning, setDontShowZydusWarning] = useState(() => {
    return localStorage.getItem('dontShowZydusWarning') === 'true';
  });
  
  // Detect tablet view
  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1024);
    };
    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  useEffect(() => {
    dispatch(getFrequentlySearchedMedication());
  }, [dispatch]);

  useEffect(() => {
    const data = [];
    if (parentOptionsList && Array.isArray(parentOptionsList)) {
      parentOptionsList.forEach((medication) => {
        if (medication && (medication.tmm_medicine_name || medication.medicine_name)) {
          const medicineName = medication.tmm_medicine_name || medication.medicine_name;
          const genericName = medication.tmm_generic || medication.generic_name || '';
          data.push({
            key: JSON.stringify({ ...medication, unique_id: uuidv4() }),
            value: medicineName,
            label: (
              <div>
                <span className="fw-medium">{medicineName}</span>,{' '}
                <span>{genericName}</span>{' '}
                {medication?.tmm_hm_type === 1 && medication?.um_id === 0 && (
                  <span
                    className="align-items-center small fs-12-1 d-inline-flex justify-content-center rounded-circle text-white"
                    style={{ width: 18, height: 18, background: '#c44ea2' }}
                  >
                    Z
                  </span>
                )}
              </div>
            ),
          });
        }
      });
    }

    if (searchQuery.length === 0) {
      data.unshift({
        key: -1,
        label: (
          <>
            <div>SUGGESTED</div>
          </>
        ),
      });
    } else {
      searchQuery &&
        data.push({
          key: JSON.stringify({
            unique_id: uuidv4(),
            tmm_id: 0,
            tmm_medicine_name: searchQuery,
          }),
          value: searchQuery,
          label: (
            <>
              <div className="text-primary fontroboto fs-16">
                {' '}
                <i className="icon-Add mx-1 fs-6"></i> Add{' '}
                <span className="fw-medium fontroboto text-primary">
                  "{searchQuery}"
                </span>{' '}
                <span className="text-primary fontroboto">as a new medicine</span>
              </div>
            </>
          ),
        });
    }
    setParentSearchOptions(data);
  }, [parentOptionsList, searchQuery]);

  useEffect(() => {
    if (editValue === '') {
      setSearchQuery('');
      setParentSearchOptions([]);
    }
  }, [editValue, editingCell]);

  useEffect(() => {
    if (editingCell?.field === 'name') {
      const timeOutId = setTimeout(() => {
        if (editValue) {
          dispatch(
            searchMedication({
              searchQuery: editValue,
              type: 'parent',
            })
          );
        } else {
          dispatch(getFrequentlySearchedMedication());
        }
      }, 500);
      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [editValue, editingCell, dispatch]);

  useEffect(() => {
    if (searchQuery && searchQuery.trim().length > 0) {
      const timeOutId = setTimeout(() => {
        dispatch(
          searchMedication({ searchQuery: searchQuery, type: "parent" })
        );
      }, 500);
      return () => {
        clearTimeout(timeOutId);
      };
    } else {
      dispatch(getFrequentlySearchedMedication());
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    const needsIdUpdate = medications.some(item => !item.id);
    if (needsIdUpdate) {
      const updatedMedications = medications.map(item => ({
        ...item,
        id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }));
      onUpdate(updatedMedications);
    }
  }, [medications, onUpdate]);

  // Clear editing state when the medication name matches what we selected
  useEffect(() => {
    if (editingCell?.field === 'name' && editValue && editingCell.itemId) {
      const currentItem = medications.find(m => m.id === editingCell.itemId);
      // If the item name matches the editValue and has metadata, it means selection completed
      // Clear the editing state after a short delay to ensure UI is updated
      if (currentItem && currentItem.name === editValue && currentItem.metadata) {
        const timer = setTimeout(() => {
          if (editingCell?.itemId === currentItem.id && editingCell?.field === 'name') {
            setEditingCell(null);
            setEditValue('');
          }
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, [medications, editingCell, editValue]);

  const onSearchParent = useCallback(
    (query) => {
      setSearchQuery(removeBeforeWhiteSpace(query));
    },
    []
  );

  const onSelectParent = useCallback(
    (value, option) => {
      try {
        if (option?.key && typeof option.key === 'string') {
          const medication = JSON.parse(option.key);
          if (medication && medication.tmm_id === 0) {
            setShowAddMedicinePopup(true);
            return;
          }
        }
        const medication = JSON.parse(option.key);
        const medicineName = medication.tmm_medicine_name || medication.medicine_name || value;
        const newMedication = {
          id: Date.now().toString(),
          name: medicineName,
          corrected_name: medication.tmm_generic || medication.generic_name || '',
          dosage: '',
          frequency: '',
          schedule: '',
          duration: '',
          notes: '',
          lineItem: medicineName,
          edited: false,
        };
        const updatedMedications = [...medications, newMedication];
        onUpdate(updatedMedications);
        setSearchQuery('');
      } catch (error) {
        const newMedication = {
          id: Date.now().toString(),
          name: value,
          dosage: '',
          frequency: '',
          schedule: '',
          duration: '',
          notes: '',
          lineItem: value,
          edited: false,
        };
        const updatedMedications = [...medications, newMedication];
        onUpdate(updatedMedications);
        setSearchQuery('');
      }
    },
    [medications, onUpdate]
  );

  const handleCellClick = (itemId, field, currentValue) => {
    setEditingCell({ itemId, field });
    setEditValue(currentValue || '');
  };

  const handleCellSave = () => {
    if (!editingCell) return;
    
    const { itemId, field } = editingCell;
    const updatedMedications = medications.map(item => {
      if (item.id === itemId) {
        const updated = { ...item, [field]: editValue, edited: true };
        updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
        return updated;
          }
      return item;
    });
    
    onUpdate(updatedMedications);
    setEditingCell(null);
    setEditValue('');
  };

  // Handle selecting a medicine from autocomplete within the name cell
  const handleNameSelect = useCallback((itemId, value, option, isTabletMode) => {
    try {
      let medicineData = null;
      if (option?.key && typeof option.key === 'string') {
        try {
          medicineData = JSON.parse(option.key);
        } catch (e) {
          console.error('Error parsing medicine data:', e);
        }
      }
      
      const medicineName = medicineData?.tmm_medicine_name || medicineData?.medicine_name || value;
      const generic = medicineData?.tmm_generic || medicineData?.generic_name || '';
      
      // Update medications with new name and metadata
      // When selecting from autocomplete, set edited: false (similar to ConsultationDrawer.js)
      const updatedMedications = medications.map((item) => {
        if (item.id === itemId) {
          const updated = {
            ...item, // Preserve all existing properties
            name: medicineName,
            corrected_name: generic || item.corrected_name || '',
            edited: false, // Set to false for autocomplete selections
          };
          
          // Add metadata if available
          if (medicineData) {
            updated.metadata = {
              ...medicineData,
              selectedValue: medicineName,
            };
          }
          
          // Recalculate lineItem
          updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
          return updated;
        }
        return item;
      });
      
      // Update the parent state with the new name and metadata
      onUpdate(updatedMedications);
      
      if (isTabletMode) {
        // For tablet mode, update rowEditValues
        setRowEditValues(prev => ({
          ...prev,
          name: medicineName,
        }));
      } else {
        // For web mode: keep editValue set to show selected name
        // Don't clear editing state immediately - let it persist until parent updates
        // The editing state will be cleared when the component re-renders with updated props
        setEditValue(medicineName);
      }
      setSearchQuery('');
    } catch (e) {
      console.error('Error selecting medicine:', e);
      // Fallback: update with just the value
      const updatedMedications = medications.map((item) => {
        if (item.id === itemId) {
          const updated = {
            ...item,
            name: value,
            edited: false, // Set to false for autocomplete selections
          };
          updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
          return updated;
        }
        return item;
      });
      onUpdate(updatedMedications);
      if (!isTabletMode) {
        setEditValue(value);
      }
      setSearchQuery('');
    }
  }, [medications, onUpdate]);

  const handleMedicineSelection = useCallback((itemId, value, option, isTabletMode) => {
    try {
      const med = option?.key ? JSON.parse(option.key) : null;
      if (med && med.tmm_id === 0) {
        setShowAddMedicinePopup(true);
        return;
      }

      const medicineData = option?.key ? JSON.parse(option.key) : null;
      const isZydusMedicine = medicineData?.tmm_hm_type === 1 && medicineData?.um_id === 0;

      if (
        isGroundingAccessable &&
        !isZydusMedicine &&
        !dontShowZydusWarning
      ) {
        setPendingSelection({
          itemId,
          value,
          option,
          isTabletMode,
        });
        setShowNonZydusWarning(true);
      } else {
        handleNameSelect(itemId, value, option, isTabletMode);
      }
    } catch (e) {
      handleNameSelect(itemId, value, option, isTabletMode);
    }
  }, [isGroundingAccessable, dontShowZydusWarning, handleNameSelect]);

  // Handle editing entire row (tablet view)
  const handleRowEdit = (itemId) => {
    const item = medications.find(med => med.id === itemId);
    if (item) {
      setEditingRow(itemId);
      setRowEditValues({
      name: item.name || '',
      dosage: item.dosage || '',
      frequency: item.frequency || '',
      schedule: item.schedule || '',
      duration: item.duration || '',
      notes: item.notes || ''
    });
    }
  };

  // Handle saving entire row (tablet view)
  const handleRowSave = (itemId) => {
    const updatedMedications = medications.map(item => {
      if (item.id === itemId) {
        const updated = { ...item, ...rowEditValues, edited: true };
        updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
        return updated;
          }
      return item;
    });
    
    onUpdate(updatedMedications);
    setEditingRow(null);
    setRowEditValues({});
  };

  const handleRowCancel = () => {
    setEditingRow(null);
    setRowEditValues({});
  };

  const handleRowFieldChange = (field, value) => {
    setRowEditValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRowFieldKeyDown = (e, itemId) => {
    if (e.key === 'Enter' && isTablet && editingRow === itemId) {
      e.preventDefault();
      handleRowSave(itemId);
    }
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleCellKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCellSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCellCancel();
    }
  };

  const handleRowDelete = (e, itemId) => {
    e.stopPropagation();
    e.preventDefault();
    const updatedMedications = medications.filter(item => item.id !== itemId);
    onUpdate(updatedMedications);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedMedications = reorder(
      medications,
      result.source.index,
      result.destination.index
    );
    onUpdate(reorderedMedications);
  };

  if (isProcessing) {
    return (
      <div className={styles['medications-content-box']}>
        <div className={styles['medications-header']}>
          <div className={styles['medications-icon']}>
            <img src={medicationsIcon} alt="Medications" />
          </div>
          <span className={styles['medications-title']}>Medication (Rx)</span>
        </div>
        <div className={styles['medications-editor-container']}>
          <div className={styles['medications-shimmer-container']}>
            <div className={styles['medications-shimmer']}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['medications-content-box']}>
      <div className={styles['medications-header']}>
        <div className={styles['medications-icon']}>
          <img src={medicationsIcon} alt="Medications" />
        </div>
        <span className={styles['medications-title']}>Medication (Rx)</span>
      </div>
      
            <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles['medications-table-container']}>
        <table className={styles['medications-table']}>
          <thead>
            <tr>
              <th className={styles['drag-column']}></th>
              <th className={styles['medicine-column']}>MEDICINE</th>
              <th className={styles['unit-dose-column']}>UNIT PER DOSE</th>
              <th className={styles['frequency-column']}>FREQUENCY</th>
              <th className={styles['when-column']}>WHEN</th>
              <th className={styles['duration-column']}>DURATION</th>
              <th className={styles['note-column']}>NOTE</th>
                <th className={styles['action-column']}></th>
            </tr>
          </thead>
            <Droppable droppableId="medications-table" direction="vertical">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
            {medications.map((item, index) => (
                    <Draggable key={item.id || `med-${index}`} draggableId={`med-${item.id || index}`} index={index}>
                      {(provided, snapshot) => (
                        <tr 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          key={item.id || index} 
                          className={styles['medications-row']}
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging ? '#f0f0f0' : 'transparent'
                          }}
                        >
                          <td className={styles['drag-cell']} {...provided.dragHandleProps}>
                            <MenuOutlined 
                              className={styles['drag-icon']}
                              style={{ cursor: 'grab', fontSize: '16px', color: '#92929D' }}
                            />
                </td>
                <td 
                  className={styles['medicine-cell']}
                  onClick={!isTablet ? () => handleCellClick(item.id, 'name', item.name) : undefined}
                  style={{ cursor: !isTablet ? 'pointer' : 'default' }}
                >
                                    {(!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'name') || (isTablet && editingRow === item.id) ? (
                    <AutoComplete
                      value={isTablet && editingRow === item.id ? rowEditValues.name : editValue}
                      onSearch={onSearchParent}
                      options={parentSearchOptions}
                      onSelect={(val, option) => handleMedicineSelection(item.id, val, option, isTablet && editingRow === item.id)}
                      defaultActiveFirstOption
                      popupMatchSelectWidth={false}
                      getPopupContainer={(trigger) => trigger.parentNode}
                    >
                      <Input
                        value={isTablet && editingRow === item.id ? rowEditValues.name : editValue}
                        onChange={(e) => isTablet && editingRow === item.id ? handleRowFieldChange('name', e.target.value) : setEditValue(e.target.value)}
                        onBlur={isTablet && editingRow === item.id ? undefined : handleCellSave}
                        onKeyDown={isTablet && editingRow === item.id ? (e) => handleRowFieldKeyDown(e, item.id) : handleCellKeyDown}
                        className={styles['edit-input']}
                        placeholder="Enter medicine name"
                        autoFocus
                      />
                    </AutoComplete>
                ) : (
                    <div className={styles['medicine-content']}>
                      <div className={styles['medicine-name']}>{capitalize(item.name || '-', true)}</div>                                                       
                      {item.corrected_name && (
                        <div className={styles['medicine-subtitle']}>{item.corrected_name}</div>
                      )}
                    </div>
                  )}
                </td>
                <td 
                  className={styles['unit-dose-cell']}
                  onClick={!isTablet ? () => handleCellClick(item.id, 'dosage', item.dosage) : undefined}
                  style={{ cursor: !isTablet ? 'pointer' : 'default' }}
                >
                  {(!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'dosage') || (isTablet && editingRow === item.id) ? (
                    <input
                      type="text"
                      value={isTablet && editingRow === item.id ? rowEditValues.dosage : editValue}
                      onChange={(e) => isTablet && editingRow === item.id ? handleRowFieldChange('dosage', e.target.value) : setEditValue(e.target.value)}
                      onBlur={isTablet && editingRow === item.id ? undefined : handleCellSave}
                      onKeyDown={isTablet && editingRow === item.id ? (e) => handleRowFieldKeyDown(e, item.id) : handleCellKeyDown}
                      className={styles['edit-input']}
                      placeholder="e.g., 1 Tablet"
                      autoFocus={!isTablet}
                    />
                  ) : (
                    <span className={styles['unit-dose-text']}>
                      {item.dosage || '-'}
                    </span>
                  )}
                </td>
                <td 
                  className={styles['frequency-cell']}
                  onClick={!isTablet ? () => handleCellClick(item.id, 'frequency', item.frequency) : undefined}
                  style={{ cursor: !isTablet ? 'pointer' : 'default' }}
                >
                  {(!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'frequency') || (isTablet && editingRow === item.id) ? (
                    <input
                      type="text"
                      value={isTablet && editingRow === item.id ? rowEditValues.frequency : editValue}
                      onChange={(e) => isTablet && editingRow === item.id ? handleRowFieldChange('frequency', e.target.value) : setEditValue(e.target.value)}
                      onBlur={isTablet && editingRow === item.id ? undefined : handleCellSave}
                      onKeyDown={isTablet && editingRow === item.id ? (e) => handleRowFieldKeyDown(e, item.id) : handleCellKeyDown}
                      className={styles['edit-input']}
                      placeholder="e.g., Twice daily"
                      autoFocus={!isTablet}
                    />
                  ) : (
                    <span className={styles['frequency-text']}>
                      {item.frequency || '-'}
                    </span>
                  )}
                </td>
                <td 
                  className={styles['when-cell']}
                  onClick={!isTablet ? () => handleCellClick(item.id, 'schedule', item.schedule) : undefined}
                  style={{ cursor: !isTablet ? 'pointer' : 'default' }}
                >
                  {(!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'schedule') || (isTablet && editingRow === item.id) ? (
                    <input
                      type="text"
                      value={isTablet && editingRow === item.id ? rowEditValues.schedule : editValue}
                      onChange={(e) => isTablet && editingRow === item.id ? handleRowFieldChange('schedule', e.target.value) : setEditValue(e.target.value)}
                      onBlur={isTablet && editingRow === item.id ? undefined : handleCellSave}
                      onKeyDown={isTablet && editingRow === item.id ? (e) => handleRowFieldKeyDown(e, item.id) : handleCellKeyDown}
                      className={styles['edit-input']}
                      placeholder="e.g., Before breakfast"
                      autoFocus={!isTablet}
                    />
                  ) : (
                    <span className={styles['when-text']}>
                      {item.schedule || '-'}
                    </span>
                  )}
                </td>
                <td 
                  className={styles['duration-cell']}
                  onClick={!isTablet ? () => handleCellClick(item.id, 'duration', item.duration) : undefined}
                  style={{ cursor: !isTablet ? 'pointer' : 'default' }}
                >
                  {(!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'duration') || (isTablet && editingRow === item.id) ? (
                    <input
                      type="text"
                      value={isTablet && editingRow === item.id ? rowEditValues.duration : editValue}
                      onChange={(e) => isTablet && editingRow === item.id ? handleRowFieldChange('duration', e.target.value) : setEditValue(e.target.value)}
                      onBlur={isTablet && editingRow === item.id ? undefined : handleCellSave}
                      onKeyDown={isTablet && editingRow === item.id ? (e) => handleRowFieldKeyDown(e, item.id) : handleCellKeyDown}
                      className={styles['edit-input']}
                      placeholder="e.g., 5 days"
                      autoFocus={!isTablet}
                    />
                  ) : (
                    <span className={styles['duration-text']}>
                      {item.duration || '-'}
                    </span>
                  )}
                </td>
                <td 
                  className={styles['note-cell']}
                  onClick={!isTablet ? () => handleCellClick(item.id, 'notes', item.notes) : undefined}
                  style={{ cursor: !isTablet ? 'pointer' : 'default' }}
                >
                  {(!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'notes') || (isTablet && editingRow === item.id) ? (
                    <input
                      type="text"
                      value={isTablet && editingRow === item.id ? rowEditValues.notes : editValue}
                      onChange={(e) => isTablet && editingRow === item.id ? handleRowFieldChange('notes', e.target.value) : setEditValue(e.target.value)}
                      onBlur={isTablet && editingRow === item.id ? undefined : handleCellSave}
                      onKeyDown={isTablet && editingRow === item.id ? (e) => handleRowFieldKeyDown(e, item.id) : handleCellKeyDown}
                      className={styles['edit-input']}
                      placeholder="Enter notes"
                      autoFocus={!isTablet}
                    />
                  ) : (
                    <span className={styles['note-text']}>
                      {item.notes || '-'}
                    </span>
                  )}
                </td>
                <td className={`${styles['action-cell']} ${isTablet ? styles['action-cell-sticky'] : ''}`}>
                  {isTablet ? (
                    <div className={styles['action-buttons']}>
                      <i 
                        className={editingRow === item.id ? "icon-check text-main" : "icon-Edit text-main"}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (editingRow === item.id) {
                            handleRowSave(item.id);
                          } else {
                            handleRowEdit(item.id);
                          }
                        }}
                        style={{ cursor: 'pointer', fontSize: '16px', marginRight: '8px', color: editingRow === item.id ? '#52c41a' : undefined }}
                        title={editingRow === item.id ? 'Save changes' : 'Edit row'}
                      />
                      <i 
                        className="icon-delete" 
                        onClick={(e) => handleRowDelete(e, item.id)}
                        style={{ cursor: 'pointer', fontSize: '16px', color: '#92929D' }}
                      />
                    </div>
                  ) : (
                    <i 
                      className="icon-delete" 
                      onClick={(e) => handleRowDelete(e, item.id)}
                      style={{ cursor: 'pointer', fontSize: '16px', color: '#92929D' }}
                    />
                  )}
                </td>
              </tr>
                      )}
                    </Draggable>
            ))}
                  {provided.placeholder}
          </tbody>
              )}
            </Droppable>
        </table>
        
        {medications.length === 0 && (
          <div className={styles['empty-state']}>
            <p>No medications found</p>
          </div>
        )}
      </div>
      </DragDropContext>
      
      <div className={styles['search-container']}>
        <div className={styles['search-input-wrapper']}>
          <AutoComplete
            value={searchQuery}
            onSearch={onSearchParent}
            options={parentSearchOptions}
            className={styles['search-autocomplete']}
            onSelect={onSelectParent}
            defaultActiveFirstOption={true}
            popupClassName={!searchQuery && "boxpopup"}
          >
            <Input
              placeholder="Search by Medication Name"
              prefix={<img src={medicationsIcon} alt="Search" className={styles['search-icon']} />}
              className={styles['search-input']}
            />
          </AutoComplete>
        </div>
      </div>
      <CommonModal
        isModalOpen={showNonZydusWarning}
        onCancel={() => {
          setShowNonZydusWarning(false);
          setPendingSelection(null);
        }}
        modalWidth={550}
        title={'Not in Zydus Data Engine'}
        modalBody={
          <>
            <div className="alert-warning rounded-10px p-3">
              <div className="d-flex align-items-start">
                <i
                  className="icon-Warning fs-24 me-3"
                  style={{ color: '#F59E0B' }}
                ></i>
                <div>
                  <span className="semi-bold-text">
                    "{pendingSelection?.value}"
                  </span>{' '}
                  is <span className="semi-bold-text">not </span>in
                  <span className="semi-bold-text"> Zydus Data Engine</span>.
                  Prescribing it may impact{' '}
                  <span className="semi-bold-text">patient fulfilment</span>.
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  id="dontShowAgain"
                  checked={dontShowZydusWarning}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setDontShowZydusWarning(checked);
                    localStorage.setItem(
                      'dontShowZydusWarning',
                      checked.toString()
                    );
                  }}
                  style={{ marginRight: 8, width: 16, height: 16 }}
                />
                <label
                  htmlFor="dontShowAgain"
                  style={{ cursor: 'pointer', marginBottom: 0 }}
                >
                  Don't show this again
                </label>
              </div>
            </div>
            <div className="mt-4">
              <div className="d-flex align-items-center mt-2 justify-content-end">
                <div
                  onClick={() => {
                    setShowNonZydusWarning(false);
                    setPendingSelection(null);
                  }}
                  className="me-4 text-decoration-underline btn p-0 text-main"
                >
                  <span>Go Back</span>
                </div>
                <Button
                  onClick={() => {
                    if (pendingSelection) {
                      handleNameSelect(
                        pendingSelection.itemId,
                        pendingSelection.value,
                        pendingSelection.option,
                        pendingSelection.isTabletMode
                      );
                    }
                    setShowNonZydusWarning(false);
                    setPendingSelection(null);
                  }}
                  className="lh-lg btn btn-primary3 btn-41 px-4"
                >
                  <span>Yes, Proceed</span>
                </Button>
              </div>
            </div>
          </>
        }
      />

       {showAddMedicinePopup && (
        <CustomMedicinePopup
          isOpen={showAddMedicinePopup}
          onCancel={() => setShowAddMedicinePopup(false)}
          initialData={{ tmm_medicine_name: searchQuery }}
        />
      )}
    </div>
  );
};

export default MedicationsTable;
