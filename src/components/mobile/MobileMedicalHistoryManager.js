import React, { useState, useContext, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listSectionwithTag } from '../../redux/medicalhistorySlice';
import CashManagerContext from '../../context/CashManagerContext';
import { getClinicName } from '../../utils/utils';
import MobileMedicalHistorySectionsList from './MobileMedicalHistorySectionsList';
import MobileMedicalHistoryItemEdit from './MobileMedicalHistoryItemEdit';
import MobileFamilyHistoryItemEdit from './MobileFamilyHistoryItemEdit';
import MobileRelationshipSelect from './MobileRelationshipSelect';
import MobileSurgicalHistoryItemEdit from './MobileSurgicalHistoryItemEdit';
import MobileAdditionalHistoryEdit from './MobileAdditionalHistoryEdit';
import MobileNoConditionScreen from './MobileNoConditionScreen';
import MobileEditQuickList from './MobileEditQuickList';

function MobileMedicalHistoryManager({ 
  visible, 
  onClose, 
  onSave,
  patient_data
}) {
  const dispatch = useDispatch();
  const { defaultList } = useSelector((state) => state.medicalhistory);
  const { profile } = useSelector((state) => state.doctors);
  const { medicalHistoryData, setMedicalHistoryData } = useContext(CashManagerContext) || {};
  
  const [currentSheet, setCurrentSheet] = useState('list');
  const [editingSection, setEditingSection] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editingSectionType, setEditingSectionType] = useState(null);
  const [selectedRelationship, setSelectedRelationship] = useState('');

  useEffect(() => {
    dispatch(listSectionwithTag());
  }, [dispatch]);

  const mergedMedicalHistoryData = useMemo(() => {
    if (!defaultList || defaultList.length === 0) {
      return medicalHistoryData || [];
    }

    try {
      const data1 = defaultList ? JSON.parse(JSON.stringify(defaultList)) : [];
      const data2 = medicalHistoryData ? JSON.parse(JSON.stringify(medicalHistoryData)) : [];
      
      if (data2.length === 0) {
        return data1;
      }

      const mergedArray = data1.map(e => {
        const matchingSection = data2.find(x => x?.tmmhs_id === e?.tmmhs_id);
        if (!matchingSection) {
          return e;
        }
        
        const existingTagsById = new Map();
        const existingTagsByTitle = new Map();
        (e?.tags || []).forEach(tag => {
          if (tag?.tmmhst_id) {
            existingTagsById.set(tag.tmmhst_id, tag);
          }
          const normalizedTitle = tag?.title?.trim().toLowerCase();
          if (normalizedTitle) {
            existingTagsByTitle.set(normalizedTitle, tag);
          }
        });
        
        const mergedTags = [...(e?.tags || [])];
        (matchingSection?.tags || []).forEach(newTag => {
          const existingById = newTag?.tmmhst_id && existingTagsById.get(newTag.tmmhst_id);
          if (existingById) {
            const index = mergedTags.findIndex(t => t?.tmmhst_id === newTag.tmmhst_id);
            if (index !== -1) {
              mergedTags[index] = { ...mergedTags[index], ...newTag };
            }
          } else {
            const normalizedTitle = newTag?.title?.trim().toLowerCase();
            const existingByTitle = normalizedTitle && existingTagsByTitle.get(normalizedTitle);
            if (!existingByTitle) {
              mergedTags.push(newTag);
            } else {
              const index = mergedTags.findIndex(
                t => t?.title?.trim().toLowerCase() === normalizedTitle
              );
              if (index !== -1) {
                mergedTags[index] = { ...mergedTags[index], ...newTag };
              }
            }
          }
        });
        
        const filteredTags = mergedTags.filter(tag => {
          if (tag.delete === true) {
            return false;
          }
          const userTag = (matchingSection?.tags || []).find(userTag =>
            (userTag?.tmmhst_id && tag?.tmmhst_id && userTag.tmmhst_id === tag.tmmhst_id) ||
            (userTag?.title?.trim().toLowerCase() === tag?.title?.trim().toLowerCase())
          );
          if (userTag && userTag.delete === true) {
            return false;
          }
          return true;
        });
        
        return {
          ...e,
          ...matchingSection,
          tags: filteredTags
        };
      });

      return mergedArray;
    } catch (error) {
      return medicalHistoryData || [];
    }
  }, [defaultList, medicalHistoryData]);

  const handleSave = useCallback(() => {
    if (!medicalHistoryData || !setMedicalHistoryData) return;

    const clinic_name = getClinicName(profile?.hospital_data);
    if (window.Moengage) {
      window.Moengage.track_event("TP_Medical_history_updated", {
        clinic_name,
        patient_number: patient_data?.pm_contact_no,
        patient_id: patient_data?.patient_unique_id
      });
    }

    const remarks = medicalHistoryData?.[0]?.medical_history_remarks;
    const medicalHistory = medicalHistoryData?.map((e, i) => {
      return {
        title: e?.title,
        tmmhs_id: e?.tmmhs_id,
        no_know_history: e?.no_know_history !== undefined ? e?.no_know_history : false,
        tags: !e?.no_know_history ? e?.tags?.filter(x => x.enable == 'Y' || x.enable == 'N') : [],
        ...remarks && i === 0 && {medical_history_remarks: remarks?.trim()}
      }
    });

    if (!remarks && medicalHistory.filter(e => !e?.no_know_history && e?.tags?.length === 0).length === medicalHistory.length) {
      setMedicalHistoryData([]);
      if (onSave) {
        onSave([]);
      }
      onClose?.();
    } else {
      setMedicalHistoryData(JSON.parse(JSON.stringify(medicalHistory)));
      if (onSave) {
        const rxPadFormat = convertContextToRxPadFormatForSave(medicalHistory);
        onSave(rxPadFormat);
      }
    }
  }, [medicalHistoryData, setMedicalHistoryData, onSave, onClose, profile, patient_data]);

  const handleClose = useCallback(() => {
    if (!medicalHistoryData || !setMedicalHistoryData) {
      setCurrentSheet('list');
      setEditingSection(null);
      setEditingItem(null);
      setEditingSectionType(null);
      setSelectedRelationship('');
      onClose?.();
      return;
    }

    const remarks = medicalHistoryData?.[0]?.medical_history_remarks;
    const medicalHistory = medicalHistoryData?.map((e, i) => {
      return {
        title: e?.title,
        tmmhs_id: e?.tmmhs_id,
        no_know_history: e?.no_know_history !== undefined ? e?.no_know_history : false,
        tags: !e?.no_know_history ? e?.tags?.filter(x => x.enable == 'Y' || x.enable == 'N') : [],
        ...remarks && i === 0 && {medical_history_remarks: remarks?.trim()}
      }
    });

    if (!remarks && medicalHistory.filter(e => !e?.no_know_history && e?.tags?.length === 0).length === medicalHistory.length) {
      setMedicalHistoryData([]);
      if (onSave) {
        onSave([]);
      }
    } else {
      setMedicalHistoryData(JSON.parse(JSON.stringify(medicalHistory)));
      if (onSave) {
        const rxPadFormat = convertContextToRxPadFormatForSave(medicalHistory);
        onSave(rxPadFormat);
      }
    }
    
    setCurrentSheet('list');
    setEditingSection(null);
    setEditingItem(null);
    setEditingSectionType(null);
    setSelectedRelationship('');
    onClose?.();
  }, [onClose, medicalHistoryData, setMedicalHistoryData, onSave]);

  const handleNoKnownHistoryChange = useCallback((tmmhs_id, checked) => {
    if (!setMedicalHistoryData || !medicalHistoryData) return;

    const updated = medicalHistoryData.map(section => {
      if (section.tmmhs_id === tmmhs_id) {
        return {
          ...section,
          no_know_history: checked,
          tags: checked ? [] : section.tags // Clear tags if no known history
        };
      }
      return section;
    });

    setMedicalHistoryData(updated);
  }, [medicalHistoryData, setMedicalHistoryData]);

  const handleChipClick = useCallback((section, tag) => {
    setEditingSection(section);
    setEditingSectionType(section.tmmhs_id);
    setEditingItem(tag);
    
    if (tag.enable === 'N') {
      setCurrentSheet('noCondition');
    } else {
      setCurrentSheet('editItem');
    }
  }, []);

  const handleSetActive = useCallback((tag) => {
    const updatedTag = {
      ...tag,
      enable: 'Y'
    };
    setEditingItem(updatedTag);
    setCurrentSheet('editItem');
  }, []);
  const handleEditQuickList = useCallback((section) => {
    setEditingSection(section);
    setEditingSectionType(section.tmmhs_id);
    setCurrentSheet('editQuickList');
  }, []);

  const handleQuickListSave = useCallback((updatedSection) => {
    if (!medicalHistoryData || !setMedicalHistoryData) return;

    const updatedData = medicalHistoryData.map(section => {
      if (section.tmmhs_id === updatedSection.tmmhs_id) {
        return updatedSection;
      }
      return section;
    });

    setMedicalHistoryData(updatedData);
    
    setCurrentSheet('list');
  }, [medicalHistoryData, setMedicalHistoryData]);
  const handleChipRemove = useCallback((section, tag) => {
    if (!setMedicalHistoryData || !medicalHistoryData) return;

    const updated = medicalHistoryData.map(sec => {
      if (sec.tmmhs_id === section.tmmhs_id) {
        return {
          ...sec,
          tags: sec.tags.filter(t => t.tmmhst_id !== tag.tmmhst_id)
        };
      }
      return sec;
    });

    setMedicalHistoryData(updated);
    
    if (onSave) {
      const rxPadFormat = convertContextToRxPadFormatForSave(updated);
      onSave(rxPadFormat);
    }
  }, [medicalHistoryData, setMedicalHistoryData, onSave]);

  const handleItemSave = useCallback((updatedItem) => {
    if (!setMedicalHistoryData || !medicalHistoryData || !editingSection) return;

    const updated = medicalHistoryData.map(section => {
      if (section.tmmhs_id === editingSection.tmmhs_id) {
        const existingTagIndex = section.tags.findIndex(
          t => t.tmmhst_id === updatedItem.tmmhst_id
        );

        let newTags;
        if (existingTagIndex !== -1) {
          newTags = [...section.tags];
          newTags[existingTagIndex] = updatedItem;
        } else {
          newTags = [...(section.tags || []), updatedItem];
        }

        return {
          ...section,
          tags: newTags,
          no_know_history: false // Uncheck no known history when adding items
        };
      }
      return section;
    });

    setMedicalHistoryData(updated);
    
    if (onSave) {
      const rxPadFormat = convertContextToRxPadFormatForSave(updated);
      onSave(rxPadFormat);
    }

    setCurrentSheet('list');
    setEditingItem(null);
  }, [medicalHistoryData, setMedicalHistoryData, editingSection, onSave]);

  const handleOpenRelationshipPicker = useCallback((currentRelationship) => {
    setSelectedRelationship(currentRelationship || '');
    setCurrentSheet('relationship');
  }, []);

  const handleRelationshipSelect = useCallback((relationship) => {
    setSelectedRelationship(relationship);
    
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        relationship: relationship
      });
    }
    
    setCurrentSheet('editItem');
  }, [editingItem]);

  const convertContextToRxPadFormatForSave = (contextData) => {
    const idToTypeMap = {
      1: 'Lifestyle',
      2: 'Medical Condition',
      3: 'Family History',
      4: 'Allergies',
      5: 'Surgical History'
    };

    const rxPadArray = [];
    
    contextData.forEach(section => {
      if (section.no_know_history || !section.tags || section.tags.length === 0) {
        return;
      }

      const sectionType = idToTypeMap[section.tmmhs_id] || 'Lifestyle';
      
      const validTags = section.tags.filter(tag => 
        !tag.delete && (tag.enable === 'Y' || tag.enable === 'N')
      );
      
      validTags.forEach(tag => {
        if ((tag.enable === 'Y' || tag.enable === 'N') && tag.title && tag.title.trim() !== '') {
          if (tag.enable === 'N') {
            rxPadArray.push({
              type: sectionType,
              name: tag.title || '',
              enable: 'N',
              lineItem: tag.title || ''
            });
          } else {
            const historyItem = {
              type: sectionType,
              name: tag.title.trim(),
              duration: tag.since || '',
              relation: tag.relationship || '',
              notes: tag.note || '',
              status: tag.status || 'Active',
              enable: tag.enable
            };

            if (section.tmmhs_id === 5 && tag.date) {
              historyItem.date = tag.date;
              historyItem.dateType = tag.dateType || 'onlyYear';
            }

            const lineParts = [tag.title.trim()];
            if (section.tmmhs_id === 5 && tag.date) {
              lineParts.push(`Date of Surgery: ${tag.date}`);
            } else if (tag.since) {
              lineParts.push(tag.since);
            }
            if (tag.relationship) lineParts.push(`Relation: ${tag.relationship}`);
            if (tag.note) lineParts.push(tag.note);
            historyItem.lineItem = lineParts.join(', ');

            rxPadArray.push(historyItem);
          }
        }
      });
    });

    return rxPadArray;
  };

  const handleAdditionalHistorySave = useCallback((remarksText) => {
    if (!setMedicalHistoryData || !medicalHistoryData) return;

    const updated = medicalHistoryData.map((section, index) => {
      if (index === 0) {
        return {
          ...section,
          medical_history_remarks: remarksText
        };
      }
      return section;
    });

    setMedicalHistoryData(updated);
    
    if (onSave) {
      const rxPadFormat = convertContextToRxPadFormatForSave(updated);
      onSave(rxPadFormat);
    }

    setCurrentSheet('list');
  }, [medicalHistoryData, setMedicalHistoryData, onSave]);

  const renderEditSheet = () => {
    if (currentSheet !== 'editItem') return null;

    if (editingSectionType === 6) {
      const firstSection = medicalHistoryData?.[0];
      return (
        <MobileAdditionalHistoryEdit
          visible={true}
          onClose={() => setCurrentSheet('list')}
          remarks={firstSection?.medical_history_remarks || ''}
          onSave={handleAdditionalHistorySave}
        />
      );
    }

    if (!editingItem) return null;

    if (editingSectionType === 3) {
      return (
        <MobileFamilyHistoryItemEdit
          visible={true}
          onClose={() => setCurrentSheet('list')}
          item={{ ...editingItem, relationship: selectedRelationship || editingItem.relationship }}
          onSave={handleItemSave}
          onOpenRelationshipPicker={handleOpenRelationshipPicker}
        />
      );
    }

    if (editingSectionType === 5) {
      return (
        <MobileSurgicalHistoryItemEdit
          visible={true}
          onClose={() => setCurrentSheet('list')}
          item={editingItem}
          onSave={handleItemSave}
        />
      );
    }

    return (
      <MobileMedicalHistoryItemEdit
        visible={true}
        onClose={() => setCurrentSheet('list')}
        item={editingItem}
        sectionType={editingSectionType}
        onSave={handleItemSave}
      />
    );
  };

  return (
    <>
      <MobileMedicalHistorySectionsList
        visible={visible && currentSheet === 'list'}
        onClose={handleClose}
        medicalHistoryData={mergedMedicalHistoryData}
        onNoKnownHistoryChange={handleNoKnownHistoryChange}
        onChipClick={handleChipClick}
        onChipRemove={handleChipRemove}
        onEditQuickList={handleEditQuickList}
        onSave={handleSave}
      />

      <MobileNoConditionScreen
        visible={currentSheet === 'noCondition'}
        onClose={handleClose}
        item={editingItem}
        onSetActive={handleSetActive}
        onBack={() => setCurrentSheet('list')}
      />

      {renderEditSheet()}

      <MobileRelationshipSelect
        visible={currentSheet === 'relationship'}
        onClose={() => setCurrentSheet('editItem')}
        selectedRelationship={selectedRelationship}
        onSelect={handleRelationshipSelect}
      />

      <MobileEditQuickList
        visible={currentSheet === 'editQuickList'}
        onClose={() => setCurrentSheet('list')}
        section={editingSection}
        onSave={handleQuickListSave}
      />
    </>
  );
}

export default MobileMedicalHistoryManager;
