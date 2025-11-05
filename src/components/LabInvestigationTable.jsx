import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AutoComplete, Input } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './ConsultationDrawer.module.css';
import investigationIcon from '../assets/images/Lab.svg';
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
  const [editingCell, setEditingCell] = useState(null); // { itemId: '...', field: 'name' }                                                                     
  const [editValue, setEditValue] = useState('');
  const [editingRow, setEditingRow] = useState(null); // itemId when entire row is being edited (tablet view)
  const [rowEditValues, setRowEditValues] = useState({}); // Store edit values for all fields in a row
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

  const handleCellClick = (itemId, field, currentValue) => {
    setEditingCell({ itemId, field });
    setEditValue(currentValue || '');
  };

  const handleCellSave = () => {
    if (!editingCell) return;
    
    const { itemId, field } = editingCell;
    const updatedInvestigations = labInvestigation.map(item => {
      if (item.id === itemId) {
        const updated = { ...item, [field]: editValue };
        updated.lineItem = updated.name + (updated.notes ? ` (${updated.notes})` : '');
        return updated;
          }
      return item;
    });
    
    onUpdate(updatedInvestigations);
    setEditingCell(null);
    setEditValue('');
  };

  const handleRowEdit = (itemId) => {
    const item = labInvestigation.find(inv => inv.id === itemId);
    if (item) {
      setEditingRow(itemId);
      setRowEditValues({
        name: item.name || '',
        notes: item.notes || ''
      });
    }
  };

  const handleRowSave = (itemId) => {
    const updatedInvestigations = labInvestigation.map(item => {
      if (item.id === itemId) {
        const updated = { ...item, ...rowEditValues };
        updated.lineItem = updated.name + (updated.notes ? ` (${updated.notes})` : '');
        return updated;
      }
      return item;
    });
    
    onUpdate(updatedInvestigations);
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
    const updatedInvestigations = labInvestigation.filter(item => item.id !== itemId);
    onUpdate(updatedInvestigations);
  };

  // Drag and drop functionality
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const sourceItem = filteredInvestigations[result.source.index];
    const destItem = filteredInvestigations[result.destination.index];
    
    const sourceIndex = labInvestigation.findIndex(item => item.id === sourceItem.id);
    const destIndex = labInvestigation.findIndex(item => item.id === destItem.id);
    
    if (sourceIndex === -1 || destIndex === -1) return;
    
    const reorderedInvestigations = reorder(
      labInvestigation,
      sourceIndex,
      destIndex
    );
    onUpdate(reorderedInvestigations);
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
      
            <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles['investigation-table-container']}>
        <table className={styles['investigation-table']}>
          <thead>
            <tr>
              <th className={styles['drag-column']}></th>
                <th className={styles['medicine-column']}>INVESTIGATION NAME</th>
              <th className={styles['note-column']}>NOTE</th>
                <th className={styles['action-column']}></th>
            </tr>
          </thead>
            <Droppable droppableId="investigation-table" direction="vertical">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
            {filteredInvestigations.map((item, index) => (
                    <Draggable key={item.id || `inv-${index}`} draggableId={`inv-${item.id || index}`} index={index}>
                      {(provided, snapshot) => (
                        <tr 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          key={item.id || index} 
                          className={styles['investigation-row']}
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
                      placeholder="Enter investigation name"
                      autoFocus={!isTablet}
                    />
                  ) : (
                    <span className={styles['medicine-text']}>
                      {item.name || '-'}
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
        
        {filteredInvestigations.length === 0 && (
          <div className={styles['empty-state']}>
            <p>No investigations found</p>
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
