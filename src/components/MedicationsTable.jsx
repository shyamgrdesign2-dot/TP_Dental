import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AutoComplete, Input } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './ConsultationDrawer.module.css';
import medicationsIcon from '../assets/images/Medication.svg';
import {
  getFrequentlySearchedMedication,
  searchMedication
} from "../redux/medicationSlice";
import { capitalize } from '../utils/utils';

const MedicationsTable = ({
  medications = [],
  onUpdate,
  isProcessing = false,
}) => {
  const dispatch = useDispatch();
  const { parentOptionsList, loading } = useSelector((state) => state.medication);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [parentSearchOptions, setParentSearchOptions] = useState([]);
  const [editingCell, setEditingCell] = useState(null); // { itemId: '...', field: 'name' }
  const [editValue, setEditValue] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [rowEditValues, setRowEditValues] = useState({});
  const [isTablet, setIsTablet] = useState(false);
  
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
      if (parentOptionsList.length === 0 && searchQuery.length > 0) {
        data.push({
          key: -2,
          label: <div>{'No Data Found'}</div>,
        });
      } else {
        parentOptionsList.forEach((medication) => {
          if (medication && (medication.tmm_medicine_name || medication.medicine_name)) {
            const medicineName = medication.tmm_medicine_name || medication.medicine_name;
            const genericName = medication.tmm_generic || medication.generic_name || '';
            data.push({
              key: JSON.stringify(medication),
              value: medicineName,
              label: (
                <div>
                  <span style={{ fontWeight: '500' }}>{medicineName}</span>
                  {genericName && <span>, {genericName}</span>}
                </div>
              ),
            });
          }
        });
      }
    }
    setParentSearchOptions(data);
  }, [parentOptionsList, searchQuery]);

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

  const onSearchParent = useCallback(
    (query) => {
      setSearchQuery(query);
    },
    []
  );

  const onSelectParent = useCallback(
    (value, option) => {
      try {
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
        const updated = { ...item, [field]: editValue };
        updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
        return updated;
          }
      return item;
    });
    
    onUpdate(updatedMedications);
    setEditingCell(null);
    setEditValue('');
  };

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
        const updated = { ...item, ...rowEditValues };
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
                    <input
                      type="text"
                      value={isTablet && editingRow === item.id ? rowEditValues.name : editValue}
                      onChange={(e) => isTablet && editingRow === item.id ? handleRowFieldChange('name', e.target.value) : setEditValue(e.target.value)}
                      onBlur={isTablet && editingRow === item.id ? undefined : handleCellSave}
                      onKeyDown={isTablet && editingRow === item.id ? (e) => handleRowFieldKeyDown(e, item.id) : handleCellKeyDown}
                      className={styles['edit-input']}
                      placeholder="Enter medicine name"
                      autoFocus
                    />
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
    </div>
  );
};

export default MedicationsTable;
