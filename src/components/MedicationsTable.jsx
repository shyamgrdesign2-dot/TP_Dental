import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AutoComplete, Input, Button, Select } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useFeatureIsOn } from '@growthbook/growthbook-react';
import { useLocation } from 'react-router-dom';
import styles from './ConsultationDrawer.module.css';
import medicationsIcon from '../assets/images/Medication.svg';
import groundingIndicatorBg from '../assets/images/grounding-indicator.svg';
import {
  searchMedication,
  getFrequentlySearchedMedication
} from "../redux/medicationSlice";
import { capitalize, removeBeforeWhiteSpace, getTokenData, onlyNumberFormat, hasNumber, frequencyFormat, frequencyCombination } from '../utils/utils';
import CommonModal from '../common/CommonModal';
import CashManagerContext from '../context/CashManagerContext';
import { env } from '../EnvironmentConfig';
import { GB_ZYDUS_USER, GB_APOLLO_DISABLE_FEATURE, EXTRA_OPTIONS } from '../utils/constants';
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
  const { profile, siteId, storeCode, frequencyList, timingList } = useSelector((state) => state.doctors);
  const isApolloHosBusinessIdAccessableFromGB = useFeatureIsOn(GB_APOLLO_DISABLE_FEATURE);
  const isZydusUserAccessableFromGB = useFeatureIsOn(GB_ZYDUS_USER);
  const tokenData = getTokenData();
  const isGroundingAccessable = tokenData?.hospital_business_id === env.zydus_business_id && isZydusUserAccessableFromGB;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [parentSearchOptions, setParentSearchOptions] = useState([]);
  const [editingCell, setEditingCell] = useState(null); // { itemId: '...', field: 'name' }
  const [editValue, setEditValue] = useState('');
  const [originalEditValue, setOriginalEditValue] = useState(''); // Track original value to detect if user edited
  const isFuzzySearchInProgress = useRef(false); // Track when fuzzy search is in progress
  const hasFuzzyResults = useRef(false); // Track if we have fuzzy results to avoid checking state in useEffect
  const [editingRow, setEditingRow] = useState(null);
  const [rowEditValues, setRowEditValues] = useState({});
  const [isTablet, setIsTablet] = useState(false);
  const [showAddMedicinePopup, setShowAddMedicinePopup] = useState(false);
  const [showNonZydusWarning, setShowNonZydusWarning] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);
  const [dontShowZydusWarning, setDontShowZydusWarning] = useState(() => {
    return localStorage.getItem('dontShowZydusWarning') === 'true';
  });
  
  // Frequency, When, Duration dropdown states
  const [frequencyOptions, setFrequencyOptions] = useState([]);
  const [sinceOptions, setSinceOptions] = useState(EXTRA_OPTIONS);
  const [frequencyQuery, setFrequencyQuery] = useState('');
  
  const SINCE_OPTIONS = [
    { value: "Day(s)", label: "Days" },
    { value: "Week(s)", label: "Weeks" },
    { value: "Month(s)", label: "Months" },
    { value: "Year(s)", label: "Years" },
  ];
  
  const filteredTitles = frequencyList ? frequencyList.filter((item) => item.tmf_block !== 0) : [];
  
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
    // Skip if fuzzy search is in progress or we're showing fuzzy results
    if (isFuzzySearchInProgress.current) {
      return; // Don't override fuzzy results while fuzzy search is in progress
    }
    if (hasFuzzyResults.current && originalEditValue && searchQuery.trim() === originalEditValue.trim()) {
      return; // Don't override fuzzy results
    }

    const data = [];
    
    // Show regular search results from parentOptionsList
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
                {medication?.tmm_hm_type == 1 && medication?.um_id === 0 && (
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

    if (searchQuery.length === 0 || searchQuery === '') {
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
  }, [parentOptionsList, searchQuery, originalEditValue]);

  useEffect(() => {
    if (editValue === '') {
      setSearchQuery('');
      setParentSearchOptions([]);
    }
  }, [editValue, editingCell]);

  useEffect(() => {
    // Skip if fuzzy search is in progress - don't interfere with fuzzy search results
    if (isFuzzySearchInProgress.current) {
      return;
    }

    // If searchQuery is empty, call getFrequentlySearchedMedication
    if (!searchQuery || searchQuery.trim().length === 0) {
      hasFuzzyResults.current = false; // Clear fuzzy results flag
      dispatch(getFrequentlySearchedMedication());
      return;
    }

    // If searchQuery matches originalEditValue, user clicked but didn't edit
    // Fuzzy search already called in handleCellClick, don't call searchMedication
    if (originalEditValue && searchQuery.trim() === originalEditValue.trim()) {
      // User clicked on complete medicine name but didn't edit - fuzzy search already called
      // Also check if we have fuzzy results - if so, don't call any other APIs
      if (hasFuzzyResults.current) {
        return;
      }
    }

    // User is editing (typing/changing) - call searchMedication
    hasFuzzyResults.current = false; // Clear fuzzy results flag when user edits
    const timeOutId = setTimeout(() => {
      dispatch(
        searchMedication({ searchQuery: searchQuery, type: "parent" })
      );
    }, 500);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [searchQuery, originalEditValue, dispatch]);

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
          quantity: 0,
          notes: '',
          lineItem: medicineName,
          edited: false,
        };
        const updatedMedications = [...medications, newMedication];
        onUpdate(updatedMedications);
        setSearchQuery('');
        setParentSearchOptions([]);
      } catch (error) {
        const newMedication = {
          id: Date.now().toString(),
          name: value,
          dosage: '',
          frequency: '',
          schedule: '',
          duration: '',
          quantity: 0,
          notes: '',
          lineItem: value,
          edited: false,
        };
        const updatedMedications = [...medications, newMedication];
        onUpdate(updatedMedications);
        setSearchQuery('');
        setParentSearchOptions([]);
      }
    },
    [medications, onUpdate]
  );

  const handleCellClick = async (itemId, field, currentValue) => {
    setEditingCell({ itemId, field });
    const value = currentValue || '';
    setEditValue(value);
    setOriginalEditValue(value); // Store original value to track if user edits
    
    if (field === 'name') {
      // Allow fuzzy search only when grounding is accessible
      if (!isGroundingAccessable) {
        isFuzzySearchInProgress.current = false;
        hasFuzzyResults.current = false;
        if (value && value.trim().length > 0) {
          setSearchQuery(value);
        } else {
          setSearchQuery('');
          setOriginalEditValue('');
        }
        return;
      }

      if (value && value.trim().length > 0) {
        isFuzzySearchInProgress.current = true; // Mark fuzzy search as in progress
        hasFuzzyResults.current = false; // Reset fuzzy results flag
        setSearchQuery(value);
        try {
          const result = await ApiMedication.getFuzzySearch(value, 10);
          const fuzzyData = result || [];
          let formattedFuzzyData = [];
          
          if (Array.isArray(fuzzyData) && fuzzyData.length > 0) {
            formattedFuzzyData = fuzzyData.map((medication) => {
              if (medication && (medication.tmm_medicine_name || medication.medicine_name)) {
                const medicineName = medication.tmm_medicine_name || medication.medicine_name;
                const genericName = medication.tmm_generic || medication.generic_name || '';
                return {
                  key: JSON.stringify({ ...medication, unique_id: uuidv4() }),
                  value: medicineName,
                  label: (
                    <div>
                      <span className="fw-medium">{medicineName}</span>,{' '}
                      <span>{genericName}</span>{' '}
                      {medication?.tmm_hm_type == 1 && medication?.um_id === 0 && (
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
                };
              }
              return null;
            }).filter(Boolean);
            
            if (formattedFuzzyData.length > 0) {
              hasFuzzyResults.current = true; // Mark that we have fuzzy results BEFORE setting options
              setParentSearchOptions(formattedFuzzyData);
            } else {
              hasFuzzyResults.current = false;
            }
          } else if (fuzzyData && !Array.isArray(fuzzyData)) {
            // Single result
            const medication = fuzzyData;
            if (medication && (medication.tmm_medicine_name || medication.medicine_name)) {
              const medicineName = medication.tmm_medicine_name || medication.medicine_name;
              const genericName = medication.tmm_generic || medication.generic_name || '';
              formattedFuzzyData = [{
                key: JSON.stringify({ ...medication, unique_id: uuidv4() }),
                value: medicineName,
                label: (
                  <div>
                    <span className="fw-medium">{medicineName}</span>,{' '}
                    <span>{genericName}</span>{' '}
                    {medication?.tmm_hm_type == 1 && medication?.um_id === 0 && (
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
              }];
              hasFuzzyResults.current = true; // Mark that we have fuzzy results BEFORE setting options
              setParentSearchOptions(formattedFuzzyData);
              
            } else {
              hasFuzzyResults.current = false;
            }
          } else {
            hasFuzzyResults.current = false;
          }
        } catch (error) {
          console.error('Error in fuzzy search:', error);
          hasFuzzyResults.current = false;
          // Fallback to frequently searched medications
        } finally {
          isFuzzySearchInProgress.current = false; // Mark fuzzy search as complete
        }
      } else {
        // Empty name field - load frequently searched medications
        isFuzzySearchInProgress.current = false;
        hasFuzzyResults.current = false;
        setSearchQuery('');
        setOriginalEditValue('');
      }
      return;
    }
  };

  const handleCellSave = () => {
    if (!editingCell) return;
    
    const { itemId, field } = editingCell;
    const updatedMedications = medications.map(item => {
      if (item.id === itemId) {
        const updatedValue = editValue;
        const prevQuantity = item.quantity ?? "";

        const updated = {
          ...item,
          [field]: updatedValue,
        };

        if (field === "quantity") {
          const isQuantityChanged =
            String(updatedValue ?? "").trim() !== String(prevQuantity ?? "").trim();
          updated.edited = isQuantityChanged;
        } else {
          updated.edited = false;
        }

        updated.lineItem = `${updated.name} (${[updated.dosage, updated.quantity, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
        return updated;
      }
      return item;
    });
    
    onUpdate(updatedMedications);
    setEditingCell(null);
    setEditValue('');
    setOriginalEditValue('');
    isFuzzySearchInProgress.current = false; // Clear fuzzy search flag
    hasFuzzyResults.current = false; // Clear fuzzy results flag
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
          updated.lineItem = `${updated.name} (${[updated.dosage, updated.quantity, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
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
        // For web mode: update editValue and clear editing state after autocomplete selection
        setEditValue(medicineName);
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
      setParentSearchOptions([]);
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
          updated.lineItem = `${updated.name} (${[updated.dosage, updated.quantity, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
          return updated;
        }
        return item;
      });
      onUpdate(updatedMedications);
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
      setParentSearchOptions([]);
    }
  }, [medications, onUpdate]);

  const handleMedicineSelection = useCallback((itemId, value, option, isTabletMode) => {
    try {
      const medicineData = option?.key ? JSON.parse(option.key) : null;
      if (medicineData && medicineData.tmm_id === 0) {
        setShowAddMedicinePopup(true);
        return;
      }
      const isZydusMedicine = ((medicineData?.metadata?.tmm_hm_type == 1 && medicineData?.metadata?.um_id === 0) || (medicineData?.tmm_hm_type == 1 && medicineData?.um_id === 0));
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
      quantity: item.quantity || 0,
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
        const prevQuantity = item.quantity ?? "";
        const newQuantity = rowEditValues.quantity ?? item.quantity;

        const isQuantityChanged =
          String(newQuantity ?? "").trim() !== String(prevQuantity ?? "").trim();
        updated.edited = isQuantityChanged;

        updated.lineItem = `${updated.name} (${[updated.dosage, updated.quantity, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
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
      [field]: value,
      edited: true,
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
    setOriginalEditValue('');
    isFuzzySearchInProgress.current = false; // Clear fuzzy search flag
    hasFuzzyResults.current = false; // Clear fuzzy results flag
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

  // Frequency handlers
  const onBlurFrequencyChild = useCallback(
    async (itemId) => {
      const item = medications.find(med => med.id === itemId);
      if (!item) return;

      const currentFrequency = item.frequency || frequencyQuery;
      if (!currentFrequency) return;

      // Check if it's a numeric format (like "1-0-1")
      const isNumericFormat = /^\d+(-\d+)*$/.test(currentFrequency);
      
      if (isNumericFormat) {
        // Keep the numeric format as is
        const updatedMedications = medications.map(med => {
          if (med.id === itemId) {
            const updated = { ...med, frequency: currentFrequency };
            updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
            return updated;
          }
          return med;
        });
        onUpdate(updatedMedications);
      } else if (filteredTitles && filteredTitles.findIndex((x) => x.tmf_title == currentFrequency) == -1) {
        // If it's not in the filtered titles, clear it
        const updatedMedications = medications.map(med => {
          if (med.id === itemId) {
            const updated = { ...med, frequency: "" };
            updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
            return updated;
          }
          return med;
        });
        onUpdate(updatedMedications);
      }
    },
    [medications, frequencyQuery, filteredTitles, onUpdate]
  );

  const onSearchFrequencyChild = useCallback(
    async (query, itemId) => {
      setFrequencyQuery(query);
      if (query) {
        const data = [];
        const updateQuery = frequencyFormat(query);

        if (updateQuery) {
          const combinationList = await frequencyCombination(query);
          combinationList.map((option) => {
            return data.push({
              value: JSON.stringify({ tmf_id: 0, tmf_title: option, tmf_block: 0, tmf_block_val: "", unique_id: uuidv4() }),
              label: <>{option}</>,
            });
          });
        }

        if (filteredTitles && filteredTitles.length > 0) {
          filteredTitles.map((option) => {
            return data.push({
              value: JSON.stringify({ ...option, unique_id: uuidv4() }),
              label: <>{option.tmf_title}</>,
            });
          });
        }

        setFrequencyOptions(data);
      }
    },
    [filteredTitles]
  );

  const onSelectFrequencyChild = useCallback(
    (data, itemId) => {
      if (data) {
        const objParse = JSON.parse(data);
        setFrequencyQuery(objParse.tmf_title);
        const updatedMedications = medications.map(item => {
          if (item.id === itemId) {
            const updated = { ...item, frequency: objParse.tmf_title };
            updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
            return updated;
          }
          return item;
        });
        onUpdate(updatedMedications);
      } else {
        setFrequencyQuery("");
        const updatedMedications = medications.map(item => {
          if (item.id === itemId) {
            const updated = { ...item, frequency: "" };
            updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
            return updated;
          }
          return item;
        });
        onUpdate(updatedMedications);
      }
    },
    [medications, onUpdate]
  );

  // When (Timing) handlers
  const onSelectTimingChild = useCallback(
    (data, itemId) => {
      if (data) {
        const objParse = JSON.parse(data);
        const updatedMedications = medications.map(item => {
          if (item.id === itemId) {
            const updated = { ...item, schedule: objParse.tmt_title };
            updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
            return updated;
          }
          return item;
        });
        onUpdate(updatedMedications);
      } else {
        const updatedMedications = medications.map(item => {
          if (item.id === itemId) {
            const updated = { ...item, schedule: "" };
            updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
            return updated;
          }
          return item;
        });
        onUpdate(updatedMedications);
      }
    },
    [medications, onUpdate]
  );

  // Duration handlers
  const onSearchSinceChild = useCallback(
    (query, itemId) => {
      const updateQuery = onlyNumberFormat(query);
      
      // Update the medication's duration value
      const updatedMedications = medications.map(item => {
        if (item.id === itemId) {
          const updated = { ...item, duration: updateQuery };
          updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
          return updated;
        }
        return item;
      });
      onUpdate(updatedMedications);
      
      // Update options based on query
      if (updateQuery) {
        const options = SINCE_OPTIONS.map((option) => {
          return {
            key: JSON.stringify({ ...option, tmm_days: parseInt(updateQuery), unique_id: uuidv4() }),
            value: `${updateQuery} ${option.value}`,
            label: <>{`${updateQuery} ${option.label}`}</>,
          };
        });
        setSinceOptions(options);
      } else {
        setSinceOptions(EXTRA_OPTIONS);
      }
    },
    [medications, onUpdate]
  );

  const onSelectSinceChild = useCallback(
    (data, e, itemId) => {
      setSinceOptions(EXTRA_OPTIONS);
      const objParse = JSON.parse(e.key);
      const updatedMedications = medications.map(item => {
        if (item.id === itemId) {
          const updated = { ...item, duration: data };
          updated.lineItem = `${updated.name} (${[updated.dosage, updated.frequency, updated.schedule, updated.duration, updated.notes].filter(Boolean).join(', ')})`;
          return updated;
        }
        return item;
      });
      onUpdate(updatedMedications);
    },
    [medications, onUpdate]
  );

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
              <th className={styles['quantity-column']}>QTY</th>
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
                      getPopupContainer={() => document.body}
                      dropdownStyle={{ width: 420 }}
                      style={{ width: '100%' }}
                      open={
                        (!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'name') ||
                        (isTablet && editingRow === item.id)
                      }
                      autoFocus={true}
                    >
                      <Input
                        value={isTablet && editingRow === item.id ? rowEditValues.name : editValue}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          if (isTablet && editingRow === item.id) {
                            handleRowFieldChange('name', newValue);
                          } else {
                            setEditValue(newValue);
                            // Sync searchQuery when user types (for name field)
                            if (editingCell?.itemId === item.id && editingCell?.field === 'name') {
                              // If user is editing (value changed from original), clear fuzzy search flags
                              if (newValue.trim() !== originalEditValue.trim()) {
                                isFuzzySearchInProgress.current = false;
                                hasFuzzyResults.current = false;
                              }
                              setSearchQuery(newValue);
                            }
                          }
                        }}
                        onBlur={isTablet && editingRow === item.id ? undefined : handleCellSave}
                        onKeyDown={isTablet && editingRow === item.id ? (e) => handleRowFieldKeyDown(e, item.id) : handleCellKeyDown}
                        onFocus={() => {
                          // Sync searchQuery with editValue if needed (useEffect will handle the search)
                          if (!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'name') {
                            const currentValue = editValue || '';
                            if (currentValue.trim().length > 0 && currentValue !== searchQuery) {
                              setSearchQuery(currentValue);
                            } else if (!currentValue || currentValue.trim().length === 0) {
                              setSearchQuery('');
                            }
                          }
                        }}
                        className={styles['edit-input']}
                        placeholder="Enter medicine name"
                        autoFocus
                      />
                    </AutoComplete>
                ) : (
                    <div className={styles['medicine-content']}>
                      <div className={styles['medicine-name']}>
                        {capitalize(item.name || '-', true)}
                        {((item?.metadata?.tmm_hm_type == 1 && item?.metadata?.um_id === 0)) && (
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
                      </div>                                                       
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
                  style={{ cursor: 'default' }}
                >
                  {(!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'frequency') || (isTablet && editingRow === item.id) ? (
                    <Select
                      showSearch
                      className="autocomplete-custom w-100 h-100 inputborder"
                      placeholder="e.g 1-0-1"
                      defaultValue={isTablet && editingRow === item.id ? (rowEditValues.frequency != "" ? rowEditValues.frequency : null) : (item.frequency != "" ? item.frequency : null)}
                      value={isTablet && editingRow === item.id ? (rowEditValues.frequency != "" ? rowEditValues.frequency : null) : (item.frequency != "" ? item.frequency : null)}
                      onSearch={(query) => {
                        if (isTablet && editingRow === item.id) {
                          handleRowFieldChange('frequency', query);
                        } else {
                          onSearchFrequencyChild(query, item.id);
                        }
                      }}
                      onFocus={() => {
                        if (!isTablet) {
                          onSearchFrequencyChild(item.frequency || '', item.id);
                        }
                      }}
                      onBlur={() => {
                        if (!isTablet) {
                          onBlurFrequencyChild(item.id);
                        }
                      }}
                      onSelect={(data) => {
                        if (isTablet && editingRow === item.id) {
                          try {
                            const objParse = JSON.parse(data);
                            handleRowFieldChange('frequency', objParse.tmf_title);
                          } catch (e) {
                            handleRowFieldChange('frequency', data);
                          }
                        } else {
                          onSelectFrequencyChild(data, item.id);
                        }
                      }}
                      options={frequencyOptions}
                      onClear={() => {
                        if (isTablet && editingRow === item.id) {
                          handleRowFieldChange('frequency', '');
                        } else {
                          onSelectFrequencyChild("", item.id);
                        }
                      }}
                      allowClear
                    />
                  ) : (
                    <span 
                      className={styles['frequency-text']}
                      onClick={!isTablet ? () => handleCellClick(item.id, 'frequency', item.frequency) : undefined}
                      style={{ cursor: !isTablet ? 'pointer' : 'default' }}
                    >
                      {item.frequency || '-'}
                    </span>
                  )}
                </td>
                <td 
                  className={styles['when-cell']}
                  style={{ cursor: 'default' }}
                >
                  {(!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'schedule') || (isTablet && editingRow === item.id) ? (
                    <Select
                      className="autocomplete-custom w-100 h-100 inputborder"
                      placeholder="e.g Before Food"
                      defaultValue={isTablet && editingRow === item.id ? (rowEditValues.schedule != "" && rowEditValues.schedule !== "None" ? rowEditValues.schedule : null) : (item.schedule != "" && item.schedule !== "None" ? item.schedule : null)}
                      value={isTablet && editingRow === item.id ? (rowEditValues.schedule != "" && rowEditValues.schedule !== "None" ? rowEditValues.schedule : null) : (item.schedule != "" && item.schedule !== "None" ? item.schedule : null)}
                      onSelect={(data) => {
                        if (isTablet && editingRow === item.id) {
                          const objParse = JSON.parse(data);
                          handleRowFieldChange('schedule', objParse.tmt_title);
                        } else {
                          onSelectTimingChild(data, item.id);
                        }
                      }}
                      options={timingList ? timingList.map((e) => {
                        return {
                          value: JSON.stringify({ ...e, unique_id: uuidv4() }),
                          label: e.tmt_title,
                        };
                      }) : []}
                      onClear={() => {
                        if (isTablet && editingRow === item.id) {
                          handleRowFieldChange('schedule', '');
                        } else {
                          onSelectTimingChild("", item.id);
                        }
                      }}
                      allowClear
                    />
                  ) : (
                    <span 
                      className={styles['when-text']}
                      onClick={!isTablet ? () => handleCellClick(item.id, 'schedule', item.schedule) : undefined}
                      style={{ cursor: !isTablet ? 'pointer' : 'default' }}
                    >
                      {item.schedule || '-'}
                    </span>
                  )}
                </td>
                <td 
                  className={styles['duration-cell']}
                  style={{ cursor: 'default' }}
                >
                  {(!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'duration') || (isTablet && editingRow === item.id) ? (
                    <AutoComplete
                      defaultValue={isTablet && editingRow === item.id ? rowEditValues.duration : item.duration}
                      value={isTablet && editingRow === item.id ? (rowEditValues.duration ? (hasNumber(rowEditValues.duration) ? rowEditValues.duration : capitalize(rowEditValues.duration, true)) : "") : (item.duration ? (hasNumber(item.duration) ? item.duration : capitalize(item.duration, true)) : "")}
                      placeholder="e.g 1 Day"
                      bordered={false}
                      defaultOpen={false}
                      onSearch={(query) => {
                        if (isTablet && editingRow === item.id) {
                          handleRowFieldChange('duration', query);
                        } else {
                          onSearchSinceChild(query, item.id);
                        }
                      }}
                      options={sinceOptions}
                      className="autocomplete-custom h-100 w-100 inputborder truncate-autocomplete"
                      popupClassName="option-truncate"
                      defaultActiveFirstOption={true}
                      onSelect={(data, e) => {
                        if (isTablet && editingRow === item.id) {
                          handleRowFieldChange('duration', data);
                        } else {
                          onSelectSinceChild(data, e, item.id);
                        }
                      }}
                      onClear={() => {
                        if (isTablet && editingRow === item.id) {
                          handleRowFieldChange('duration', '');
                        } else {
                          onSearchSinceChild("", item.id);
                        }
                      }}
                      allowClear
                    />
                  ) : (
                    <span 
                      className={styles['duration-text']}
                      onClick={!isTablet ? () => handleCellClick(item.id, 'duration', item.duration) : undefined}
                      style={{ cursor: !isTablet ? 'pointer' : 'default' }}
                    >
                      {item.duration || '-'}
                    </span>
                  )}
                </td>
                <td 
                  className={styles['quantity-cell']}
                  onClick={!isTablet ? () => handleCellClick(item.id, 'quantity', item.quantity) : undefined}
                  style={{ cursor: !isTablet ? 'pointer' : 'default' }}
                >
                  {(!isTablet && editingCell?.itemId === item.id && editingCell?.field === 'quantity') || (isTablet && editingRow === item.id) ? (
                    <input
                      type="text"
                      value={isTablet && editingRow === item.id ? rowEditValues.quantity : editValue}
                      onChange={(e) => isTablet && editingRow === item.id ? handleRowFieldChange('quantity', e.target.value) : setEditValue(e.target.value)}
                      onBlur={isTablet && editingRow === item.id ? undefined : handleCellSave}
                      onKeyDown={isTablet && editingRow === item.id ? (e) => handleRowFieldKeyDown(e, item.id) : handleCellKeyDown}
                      className={styles['edit-input']}
                      placeholder="e.g., 10"
                      autoFocus={!isTablet}
                    />
                  ) : (
                    <span className={styles['quantity-text']}>
                      {item.quantity || '-'}
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
            dropdownStyle={{ width: 420 }}
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
