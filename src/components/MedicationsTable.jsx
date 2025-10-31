import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AutoComplete, Input } from 'antd';
import styles from './ConsultationDrawer.module.css';
import medicationsIcon from '../assets/images/Medication.svg';
import editIcon from '../assets/images/edit.svg';
import deleteIcon from '../assets/images/Delete.svg';
import menuIcon from '../assets/images/Menu Button.svg';
import {
  getFrequentlySearchedMedication,
  searchMedication
} from "../redux/medicationSlice";

const MedicationsTable = ({
  medications = [],
  onUpdate,
  isProcessing = false,
}) => {
  const dispatch = useDispatch();
  const { parentOptionsList, loading } = useSelector((state) => state.medication);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [parentSearchOptions, setParentSearchOptions] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    schedule: '',
    duration: '',
    notes: ''
  });

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

  const handleEditMedication = (item) => {
    setEditingItem(item.id);
    setEditData({
      name: item.name || '',
      dosage: item.dosage || '',
      frequency: item.frequency || '',
      schedule: item.schedule || '',
      duration: item.duration || '',
      notes: item.notes || ''
    });
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    const updatedMedications = medications.map(item => 
      item.id === editingItem 
        ? { 
            ...item, 
            ...editData,
            lineItem: `${editData.name} (${[editData.dosage, editData.frequency, editData.schedule, editData.duration, editData.notes].filter(Boolean).join(', ')})`
          }
        : item
    );
    
    onUpdate(updatedMedications);
    setEditingItem(null);
    setEditData({
      name: '',
      dosage: '',
      frequency: '',
      schedule: '',
      duration: '',
      notes: ''
    });
  };

  // Handle canceling edit
  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditData({
      name: '',
      dosage: '',
      frequency: '',
      schedule: '',
      duration: '',
      notes: ''
    });
  };

  const handleDeleteMedication = (itemId) => {
    const updatedMedications = medications.filter(item => item.id !== itemId);
    onUpdate(updatedMedications);
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
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
              <th className={styles['action-column']}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((item, index) => (
              <tr key={item.id || index} className={styles['medications-row']}>
                <td className={styles['drag-cell']}>
                  <img src={menuIcon} alt="Drag" className={styles['drag-icon']} />
                </td>
                <td className={styles['medicine-cell']}>
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                      className={styles['edit-input']}
                      placeholder="Enter medicine name"
                      autoFocus
                    />
                  ) : (
                    <div className={styles['medicine-content']}>
                      <div className={styles['medicine-name']}>{item.name || '-'}</div>
                      {item.corrected_name && (
                        <div className={styles['medicine-subtitle']}>{item.corrected_name}</div>
                      )}
                    </div>
                  )}
                </td>
                <td className={styles['unit-dose-cell']}>
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={editData.dosage}
                      onChange={(e) => handleEditChange('dosage', e.target.value)}
                      className={styles['edit-input']}
                      placeholder="e.g., 1 Tablet"
                    />
                  ) : (
                    <span className={styles['unit-dose-text']}>
                      {item.dosage || '-'}
                    </span>
                  )}
                </td>
                <td className={styles['frequency-cell']}>
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={editData.frequency}
                      onChange={(e) => handleEditChange('frequency', e.target.value)}
                      className={styles['edit-input']}
                      placeholder="e.g., Twice daily"
                    />
                  ) : (
                    <span className={styles['frequency-text']}>
                      {item.frequency || '-'}
                    </span>
                  )}
                </td>
                <td className={styles['when-cell']}>
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={editData.schedule}
                      onChange={(e) => handleEditChange('schedule', e.target.value)}
                      className={styles['edit-input']}
                      placeholder="e.g., Before breakfast"
                    />
                  ) : (
                    <span className={styles['when-text']}>
                      {item.schedule || '-'}
                    </span>
                  )}
                </td>
                <td className={styles['duration-cell']}>
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={editData.duration}
                      onChange={(e) => handleEditChange('duration', e.target.value)}
                      className={styles['edit-input']}
                      placeholder="e.g., 5 days"
                    />
                  ) : (
                    <span className={styles['duration-text']}>
                      {item.duration || '-'}
                    </span>
                  )}
                </td>
                <td className={styles['note-cell']}>
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={editData.notes}
                      onChange={(e) => handleEditChange('notes', e.target.value)}
                      className={styles['edit-input']}
                      placeholder="Enter notes"
                    />
                  ) : (
                    <span className={styles['note-text']}>
                      {item.notes || '-'}
                    </span>
                  )}
                </td>
                <td className={styles['action-cell']}>
                  {editingItem === item.id ? (
                    <div className={styles['edit-actions']}>
                      <button
                        onClick={handleSaveEdit}
                        className={styles['save-button']}
                        title="Save"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className={styles['cancel-button']}
                        title="Cancel"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className={styles['action-buttons']}>
                      <button
                        onClick={() => handleEditMedication(item)}
                        className={styles['edit-button']}
                        title="Edit"
                      >
                        <img src={editIcon} alt="Edit" className={styles['action-icon']} />
                      </button>
                      <button
                        onClick={() => handleDeleteMedication(item.id)}
                        className={styles['delete-button']}
                        title="Delete"
                      >
                        <img src={deleteIcon} alt="Delete" className={styles['action-icon']} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {medications.length === 0 && (
          <div className={styles['empty-state']}>
            <p>No medications found</p>
          </div>
        )}
      </div>
      
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
