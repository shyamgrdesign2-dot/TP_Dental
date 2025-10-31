import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AutoComplete, Input } from 'antd';
import styles from './ConsultationDrawer.module.css';
import investigationIcon from '../assets/images/Lab.svg';
import editIcon from '../assets/images/edit.svg';
import deleteIcon from '../assets/images/Delete.svg';
import menuIcon from '../assets/images/Menu Button.svg';
import {
  getFrequentlySearchedInvestigation,
  searchInvestigation
} from "../redux/investigationSlice";

const LabInvestigationTable = ({
  labInvestigation = [],
  onUpdate,
  isProcessing = false,
}) => {
  const dispatch = useDispatch();
  const { parentOptionsList, loading } = useSelector((state) => state.investigation);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [parentSearchOptions, setParentSearchOptions] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editName, setEditName] = useState('');
  const [editNotes, setEditNotes] = useState('');

  useEffect(() => {
    dispatch(getFrequentlySearchedInvestigation());
  }, [dispatch]);

  useEffect(() => {
    const data = [];
    if (parentOptionsList) {
      if (parentOptionsList.length === 0 && searchQuery.length > 0) {
        data.push({
          key: -2,
          label: <div>{'No Data Found'}</div>,
        });
      } else {
        parentOptionsList.map((investigation) => {
          return data.push({
            key: JSON.stringify(investigation),
            value: investigation.investigation_name,
            label: (
              <div className="d-flex align-items-center">
                <span>{investigation.investigation_name}</span>
              </div>
            ),
          });
        });
      }
    }
    setParentSearchOptions(data);
  }, [parentOptionsList, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      const timeOutId = setTimeout(() => {
        dispatch(
          searchInvestigation({ searchQuery: searchQuery, type: "parent" })
        );
      }, 500);
      return () => {
        clearTimeout(timeOutId);
      };
    } else {
      dispatch(getFrequentlySearchedInvestigation());
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    const needsIdUpdate = labInvestigation.some(item => !item.id);
    if (needsIdUpdate) {
      const updatedInvestigations = labInvestigation.map(item => ({
        ...item,
        id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }));
      onUpdate(updatedInvestigations);
    }
  }, [labInvestigation, onUpdate]);

  const onSearchParent = useCallback(
    (query) => {
      setSearchQuery(query);
    },
    []
  );

  const onSelectParent = useCallback(
    (value, option) => {
      const investigation = JSON.parse(option.key);
      const newInvestigation = {
        id: Date.now().toString(),
        name: investigation.investigation_name,
        notes: '',
        lineItem: investigation.investigation_name,
      };
      const updatedInvestigations = [...labInvestigation, newInvestigation];
      onUpdate(updatedInvestigations);
      setSearchQuery('');
    },
    [labInvestigation, onUpdate]
  );

  // Filter investigations based on search query
  const filteredInvestigations = useMemo(() => {
    if (!searchQuery.trim()) return labInvestigation;
    return labInvestigation.filter(investigation => 
      (investigation.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [labInvestigation, searchQuery]);

  const handleAddInvestigation = () => {
    const newInvestigation = {
      id: Date.now().toString(),
      name: '',
      notes: '',
      lineItem: '',
    };
    const updatedInvestigations = [...labInvestigation, newInvestigation];
    onUpdate(updatedInvestigations);
    setEditingItem(newInvestigation.id);
    setEditName('');
    setEditNotes('');
  };

  const handleEditInvestigation = (item) => {
    setEditingItem(item.id);
    setEditName(item.name || '');
    setEditNotes(item.notes || '');
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    const updatedInvestigations = labInvestigation.map(item => 
      item.id === editingItem 
        ? { 
            ...item, 
            name: editName, 
            notes: editNotes,
            lineItem: editName + (editNotes ? ` (${editNotes})` : '')
          }
        : item
    );
    
    onUpdate(updatedInvestigations);
    setEditingItem(null);
    setEditName('');
    setEditNotes('');
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditName('');
    setEditNotes('');
  };

  const handleDeleteInvestigation = (itemId) => {
    const updatedInvestigations = labInvestigation.filter(item => item.id !== itemId);
    onUpdate(updatedInvestigations);
  };

  if (isProcessing) {
    return (
      <div className={styles['investigation-content-box']}>
        <div className={styles['investigation-header']}>
          <div className={styles['investigation-icon']}>
            <img src={investigationIcon} alt="Investigation" />
          </div>
          <span className={styles['investigation-title']}>Lab Investigation</span>
        </div>
        <div className={styles['investigation-editor-container']}>
          <div className={styles['investigation-shimmer-container']}>
            <div className={styles['investigation-shimmer']}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['investigation-content-box']}>
      <div className={styles['investigation-header']}>
        <div className={styles['investigation-icon']}>
          <img src={investigationIcon} alt="Investigation" />
        </div>
        <span className={styles['investigation-title']}>Lab Investigation</span>
      </div>
      
      <div className={styles['investigation-table-container']}>
        <table className={styles['investigation-table']}>
          <thead>
            <tr>
              <th className={styles['drag-column']}></th>
              <th className={styles['medicine-column']}>MEDICINE</th>
              <th className={styles['note-column']}>NOTE</th>
              <th className={styles['action-column']}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestigations.map((item, index) => (
              <tr key={item.id || index} className={styles['investigation-row']}>
                <td className={styles['drag-cell']}>
                  <img src={menuIcon} alt="Drag" className={styles['drag-icon']} />
                </td>
                <td className={styles['medicine-cell']}>
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className={styles['edit-input']}
                      placeholder="Enter investigation name"
                      autoFocus
                    />
                  ) : (
                    <span className={styles['medicine-text']}>
                      {item.name || '-'}
                    </span>
                  )}
                </td>
                <td className={styles['note-cell']}>
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
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
                        onClick={() => handleEditInvestigation(item)}
                        className={styles['edit-button']}
                        title="Edit"
                      >
                        <img src={editIcon} alt="Edit" className={styles['action-icon']} />
                      </button>
                      <button
                        onClick={() => handleDeleteInvestigation(item.id)}
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
        
        {filteredInvestigations.length === 0 && (
          <div className={styles['empty-state']}>
            <p>No investigations found</p>
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
              placeholder="Search by Investigation Name"
              prefix={<img src={investigationIcon} alt="Search" className={styles['search-icon']} />}
              className={styles['search-input']}
            />
          </AutoComplete>
        </div>
      </div>
    </div>
  );
};

export default LabInvestigationTable;
