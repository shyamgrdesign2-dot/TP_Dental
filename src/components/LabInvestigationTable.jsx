import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AutoComplete, Input } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import styles from './ConsultationDrawer.module.css';
import investigationIcon from '../assets/images/Lab.svg';
import groundingIndicatorBg from '../assets/images/grounding-indicator.svg';
import {
  searchInvestigation
} from "../redux/investigationSlice";
import { removeBeforeWhiteSpace } from '../utils/utils';
import { env } from '../EnvironmentConfig';
import { useFeatureIsOn } from '@growthbook/growthbook-react';
import { GB_APOLLO_DISABLE_FEATURE, GB_ZYDUS_USER } from '../utils/constants';
import { getDecodedToken } from '../utils/localStorage';

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

  const isZydusUserAccessableFromGB = useFeatureIsOn(GB_ZYDUS_USER);
  const decodedToken = getDecodedToken();
  const tokenData = decodedToken?.result;

  const isApolloHosBusinessIdAccessableFromGB = useFeatureIsOn(
    GB_APOLLO_DISABLE_FEATURE
  );
  
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
    const data = [];
    if (parentOptionsList && Array.isArray(parentOptionsList)) {
      parentOptionsList.forEach((investigation) => {
        if (investigation && investigation.investigation_name) {
          data.push({
            key: JSON.stringify({ ...investigation, unique_id: uuidv4() }),
            value: investigation.investigation_name,
            label: (
              <div>
                {investigation.investigation_name}{' '}
                {investigation?.hm_type === 1 && investigation?.um_id === 0 && (
                  <span
                    className="align-items-center small fs-12-1 d-inline-flex justify-content-center rounded-circle text-white"
                    style={{ 
                      width: 18, 
                      height: 18, 
                      backgroundImage: `url(${groundingIndicatorBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
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
            <div>FREQUENTLY USED</div>
          </>
        ),
      });
    } else {
      searchQuery &&
        parentOptionsList &&
        parentOptionsList.findIndex(
          (e) =>
            e.investigation_name?.toLowerCase()?.trim() ===
            searchQuery?.toLowerCase()?.trim()
        ) === -1 && tokenData?.hospital_business_id != env.zydus_business_id && !isZydusUserAccessableFromGB && !isApolloHosBusinessIdAccessableFromGB &&
        data.push({
          key: JSON.stringify({
            unique_id: uuidv4(),
            change: 1,
            investigation_name: searchQuery,
          }),
          value: searchQuery,
          label: (
            <>
              <div>
                {searchQuery}
                <i className="icon-Add mx-1 text-primary fs-6"></i>{' '}
                <span className="fw-medium text-decoration-underline text-primary">
                  {' '}
                  Add Custom
                </span>
              </div>
            </>
          ),
        });
    }
    setParentSearchOptions(data);
  }, [parentOptionsList, searchQuery]);

  useEffect(() => {
    if (searchQuery && searchQuery.trim().length > 0) {
      const timeOutId = setTimeout(() => {
        dispatch(
          searchInvestigation({ searchQuery: searchQuery, type: "parent" })
        );
      }, 500);
      return () => {
        clearTimeout(timeOutId);
      };
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
      const cleanedQuery = removeBeforeWhiteSpace(query);
      setSearchQuery(cleanedQuery);
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
        // Store investigation data in metadata for Z indicator check
        metadata: {
          ...investigation,
          selectedValue: investigation.investigation_name,
        },
      };
      const updatedInvestigations = [...labInvestigation, newInvestigation];
      onUpdate(updatedInvestigations);
      setSearchQuery('');
    },
    [labInvestigation, onUpdate]
  );


  const handleCellClick = (itemId, field, currentValue) => {
    setEditingCell({ itemId, field });
    setEditValue(currentValue || '');
    if (field === 'name') {
      const searchValue = currentValue || '';
      setSearchQuery(searchValue);
    }
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

  // Handle selecting an investigation from autocomplete within the name cell
  const handleNameSelect = useCallback((itemId, value, option, isTabletMode) => {
    try {
      let investigationData = null;
      let investigationName = value;
      
      // Parse the option data
      if (option?.key && typeof option.key === 'string') {
        try {
          investigationData = JSON.parse(option.key);
          // Check if it's a custom investigation (change === 1)
          if (investigationData.change === 1) {
            investigationName = investigationData.investigation_name || value;
          } else {
            investigationName = investigationData.investigation_name || value;
          }
        } catch (parseError) {
          console.error('Error parsing investigation data:', parseError);
          investigationName = value;
        }
      }
      
      // Update investigations with new name and metadata
      const updatedInvestigations = labInvestigation.map((item) => {
        if (item.id === itemId) {
          const updated = {
            ...item, // Preserve all existing properties
            name: investigationName,
          };
          
          // Add metadata if available
          if (investigationData) {
            updated.metadata = {
              ...investigationData,
              selectedValue: investigationName,
            };
          }
          
          // Recalculate lineItem
          updated.lineItem = updated.name + (updated.notes ? ` (${updated.notes})` : '');
          return updated;
        }
        return item;
      });
      
      // Update the parent state with the new name and metadata
      onUpdate(updatedInvestigations);
      
      if (isTabletMode) {
        // For tablet mode, update rowEditValues
        setRowEditValues(prev => ({
          ...prev,
          name: investigationName,
        }));
      } else {
        // For web mode: update editValue and clear editing state after autocomplete selection
        setEditValue(investigationName);
        // Clear editing state after a short delay to allow UI to update
        const currentItemId = itemId;
        setTimeout(() => {
          setEditingCell((current) => {
            // Only clear if we're still editing the same cell
            if (current?.itemId === currentItemId && current?.field === 'name') {
              setEditValue('');
              return null;
            }
            return current;
          });
        }, 100);
      }
      setSearchQuery('');
    } catch (e) {
      console.error('Error selecting investigation:', e);
      // Fallback: update with just the value
      const updatedInvestigations = labInvestigation.map((item) => {
        if (item.id === itemId) {
          const updated = {
            ...item,
            name: value,
          };
          updated.lineItem = updated.name + (updated.notes ? ` (${updated.notes})` : '');
          return updated;
        }
        return item;
      });
      onUpdate(updatedInvestigations);
      if (!isTabletMode) {
        setEditValue(value);
        // Clear editing state after a short delay for fallback case
        const currentItemId = itemId;
        setTimeout(() => {
          setEditingCell((current) => {
            if (current?.itemId === currentItemId && current?.field === 'name') {
              setEditValue('');
              return null;
            }
            return current;
          });
        }, 100);
      }
      setSearchQuery('');
    }
  }, [labInvestigation, onUpdate]);

  const handleInvestigationSelection = useCallback((itemId, value, option, isTabletMode) => {
    // Don't select header items or invalid options
    if (option?.key === -1 || option?.key === -2 || !option?.key) {
      return;
    }
    
    // Extract investigation name immediately
    let investigationName = value;
    try {
      if (option?.key && typeof option.key === 'string') {
        const parsed = JSON.parse(option.key);
        investigationName = parsed?.investigation_name || value;
      }
    } catch (e) {
      investigationName = value;
    }
    
    // Set the value in state immediately so AutoComplete reflects it
    if (isTabletMode) {
      setRowEditValues(prev => ({
        ...prev,
        name: investigationName,
      }));
    } else {
      setEditValue(investigationName);
    }
    
    // Then update the investigation data
    handleNameSelect(itemId, value, option, isTabletMode);
  }, [handleNameSelect]);

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
    const reorderedInvestigations = reorder(
      labInvestigation,
      result.source.index,
      result.destination.index
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
            {labInvestigation.map((item, index) => (
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
                    <AutoComplete
                      value={isTablet && editingRow === item.id ? rowEditValues.name : editValue}
                      onSearch={onSearchParent}
                      options={parentSearchOptions}
                      onSelect={(val, option) => handleInvestigationSelection(item.id, val, option, isTablet && editingRow === item.id)}
                      defaultActiveFirstOption
                      popupMatchSelectWidth={false}
                      getPopupContainer={(trigger) => trigger.parentNode}
                      open={
                        (!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'name') ||
                        (isTablet && editingRow === item.id)
                      }
                      autoFocus={true}
                      dropdownStyle={{ width: 420 }}
                    >
                      <Input
                        value={isTablet && editingRow === item.id ? rowEditValues.name : editValue}
                        onChange={(e) => isTablet && editingRow === item.id ? handleRowFieldChange('name', e.target.value) : setEditValue(e.target.value)}
                        onBlur={isTablet && editingRow === item.id ? undefined : handleCellSave}
                        onKeyDown={isTablet && editingRow === item.id ? (e) => handleRowFieldKeyDown(e, item.id) : handleCellKeyDown}
                        onFocus={() => {
                          // Sync searchQuery with editValue if needed (useEffect will handle the search)
                          if (!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'name') {
                            const currentValue = editValue || '';
                            if (currentValue.trim().length > 0 && currentValue !== searchQuery) {
                              setSearchQuery(currentValue);
                            }
                          }
                        }}
                        className={styles['edit-input']}
                        placeholder="Enter investigation name"
                        autoFocus
                      />
                    </AutoComplete>
                  ) : (
                    <span className={styles['medicine-text']}>
                      {item.name || '-'}
                      {((item?.metadata?.hm_type === 1 && item?.metadata?.um_id === 0) ||
                        (item?.hm_type === 1 && item?.um_id === 0)) && (
                        <span
                          className="align-items-center small fs-12-1 d-inline-flex justify-content-center rounded-circle text-white ms-2"
                          style={{ 
                            width: 18, 
                            height: 18, 
                            backgroundImage: `url(${groundingIndicatorBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          Z
                        </span>
                      )}
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
        
        {labInvestigation.length === 0 && (
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
            dropdownStyle={{ width: 420 }}
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
