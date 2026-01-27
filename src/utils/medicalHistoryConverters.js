/**
 * Converts Rx Pad / API medical history format to CashManagerContext format
 * for use in MedicalHistoryBox. Input: [{ type, name, lineItem, since?, status?, relation?, notes?, duration?, enable? }]
 * Output: [{ tmmhs_id, section_name, title, tags: [{ tmmhst_id, title, enable, note, since, status, relationship }] }]
 * @param {Array} apiMedicalHistory - Medical history from API/Rx pad
 * @param {Array} existingContextData - Existing context data to merge with
 * @returns {Array} Context-format array for setMedicalHistoryData
 */
export function convertMedicalHistoryToContextFormat(apiMedicalHistory, existingContextData) {
  if (!apiMedicalHistory || !Array.isArray(apiMedicalHistory) || apiMedicalHistory.length === 0) {
    return existingContextData || [];
  }

  const typeToIdMap = {
    'Lifestyle': 1,
    'Medical Condition': 2,
    'Family History': 3,
    'Allergies': 4,
    'Surgical History': 5,
    'lifestyle': 1,
    'medical_condition': 2,
    'family_history': 3,
    'allergies': 4,
    'surgical_history': 5
  };

  const groupedByType = {};
  const additionalNotesItems = [];
  
  apiMedicalHistory.forEach((item) => {
    const type = item.type || 'Lifestyle';
    const normalizedType = type.toLowerCase().replace(/\s+/g, '_');
    if (normalizedType === 'others' || type === 'others' || type === 'Additional Notes' || normalizedType === 'additional_notes') {
      let noteText = '';
      if (item.lineItem && item.lineItem.trim()) {
        noteText = item.lineItem.trim();
      } else if (item.notes && item.notes.trim()) {
        const namePart = item.name ? `${item.name}` : '';
        const notesPart = item.notes ? ` (Notes: ${item.notes})` : '';
        noteText = namePart + notesPart;
      } else if (item.name && item.name.trim()) {
        noteText = item.name.trim();
      }
      let trimmedNote = noteText.trim();
      trimmedNote = trimmedNote.replace(/^others[, ]+/i, '').trim();
      if (trimmedNote && trimmedNote.toLowerCase() !== 'others') {
        additionalNotesItems.push(trimmedNote);
      }
      return;
    }
    const mappedType = typeToIdMap[type] || typeToIdMap[normalizedType] || 1;
    const sectionName =
      type === 'Lifestyle'
        ? 'Lifestyle'
        : type === 'Medical Condition' || normalizedType === 'medical_condition'
          ? 'Medical Condition'
          : type === 'Family History' || normalizedType === 'family_history'
            ? 'Family History'
            : type === 'Allergies' || normalizedType === 'allergies'
              ? 'Allergies'
              : type === 'Surgical History' || normalizedType === 'surgical_history'
                ? 'Surgical History'
                : 'Lifestyle';

    if (!groupedByType[mappedType]) {
      groupedByType[mappedType] = {
        tmmhs_id: mappedType,
        section_name: sectionName,
        title: sectionName,
        tags: []
      };
    }
    let tagTitle = item.name || '';
    let tagEnable = item.enable; // Preserve exact enable value from Rx pad
    
    // Handle "No [condition]" pattern (takes priority)
    if (!item.enable || item.enable === undefined || item.enable === null) {
      const nameToCheck = item.name || item.lineItem || '';
      if (nameToCheck.trim().toLowerCase().startsWith('no ')) {
        tagTitle = nameToCheck.trim().substring(3);
        tagEnable = 'N';
      } else {
        // If enable is not present and not "No [condition]", use 'Y' as default
        // This handles legacy data or AI-generated data without explicit enable
        tagEnable = 'Y';
      }
    }

    const normalizedTitle = tagTitle.trim().toLowerCase();
    const existingTagIndex = groupedByType[mappedType].tags.findIndex((t) => t.title?.trim().toLowerCase() === normalizedTitle);

    if (existingTagIndex !== -1) {
      // Update existing tag - always preserve enable status from Rx pad if explicitly provided
      // This ensures 'N' status from Rx pad is correctly preserved during conversion
      const existingTag = groupedByType[mappedType].tags[existingTagIndex];
      if (tagEnable !== undefined && tagEnable !== null) {
        // Always update enable if Rx pad explicitly provides it (even if same value)
        // This ensures 'N' status from Rx pad overwrites any default values
        existingTag.enable = tagEnable;
      }
      if (item.notes && !existingTag.note) {
        existingTag.note = item.notes;
      }
      if (item.duration && !existingTag.since) {
        existingTag.since = item.duration;
      }
      if (item.status && !existingTag.status) {
        existingTag.status = item.status;
      }
      if (item.relation) {
        existingTag.relationship = item.relation;
      }
    } else {
      // Create new tag with proper enable status
      const tag = {
        tmmhst_id: Date.now() + Math.random(),
        title: tagTitle,
        enable: tagEnable,
        note: item.notes || '',
        since: item.duration || '',
        status: item.status || 'Active',
        relationship: item.relation || ''
      };
      
      // Surgical History (tmmhs_id 5) uses 'date' and 'dateType' instead of 'since'
      if (mappedType === 5 && item.date) {
        tag.date = item.date;
        tag.dateType = item.dateType || 'onlyYear';
        tag.since = ''; // Surgical history doesn't use 'since'
      }
      
      groupedByType[mappedType].tags.push(tag);
    }
  });

  const medicalHistoryDataArray = Object.values(groupedByType);
  
  const filteredAdditionalNotes = additionalNotesItems
    .map(item => {
      let cleaned = item.trim();
      cleaned = cleaned.replace(/^others[, ]+/i, '').trim();
      cleaned = cleaned.replace(/[, ]+others[, ]*/gi, ',').trim();
      cleaned = cleaned.replace(/^[, ]+|[, ]+$/g, '').trim();
      if (cleaned.toLowerCase() === 'others') {
        return null;
      }
      return cleaned;
    })
    .filter(item => item && item.length > 0);
  
  const medicalHistoryRemarks = filteredAdditionalNotes.length > 0 
    ? filteredAdditionalNotes.join('\n') 
    : null;

  if (medicalHistoryDataArray.length > 0 && medicalHistoryRemarks) {
    medicalHistoryDataArray[0].medical_history_remarks = medicalHistoryRemarks;
  }

  if (existingContextData && existingContextData.length > 0) {
    const merged = existingContextData.map((existingSection) => {
      const apiSection = groupedByType[existingSection.tmmhs_id];
      if (apiSection) {
        const existingTagsMap = new Map();
        (existingSection.tags || []).forEach((tag) => {
          const normalizedTitle = tag.title?.trim().toLowerCase();
          if (normalizedTitle) {
            existingTagsMap.set(normalizedTitle, tag);
          }
        });
        const updatedTags = [...(existingSection.tags || [])];
        apiSection.tags.forEach((newTag) => {
          const normalizedTitle = newTag.title?.trim().toLowerCase();
          const existingTag = existingTagsMap.get(normalizedTitle);

          if (existingTag) {
            const existingIndex = updatedTags.findIndex((t) => t.title?.trim().toLowerCase() === normalizedTitle);
            if (existingIndex !== -1) {
              // Preserve enable status from existing context (especially 'N') when Rx pad data was defaulted to 'Y'
              // This ensures 'N' status from caseManagerData is not lost when merging with Rx pad data from API
              // Strategy: If existing has 'N' and newTag has 'Y', preserve 'N' (because 'Y' was likely defaulted, not explicit)
              // Only update enable if newTag explicitly has 'N' or if existing doesn't have enable set
              if (existingTag.enable === 'N' && newTag.enable === 'Y') {
                // Existing has 'N', new has 'Y' - likely newTag was defaulted, preserve 'N'
                updatedTags[existingIndex].enable = existingTag.enable;
              } else if (newTag.enable === 'N') {
                // New tag explicitly has 'N' - always update to 'N'
                updatedTags[existingIndex].enable = newTag.enable;
              } else if (newTag.enable !== existingTag.enable) {
                // Update enable if different (and not the 'N'/'Y' case above)
                updatedTags[existingIndex].enable = newTag.enable;
              }
              if (newTag.note && !updatedTags[existingIndex].note) {
                updatedTags[existingIndex].note = newTag.note;
              }
              // Surgical History (tmmhs_id 5) uses 'date' instead of 'since'
              // Update date/dateType if Rx pad has explicit values (preserve existing if Rx pad doesn't have them)
              if (existingSection.tmmhs_id === 5) {
                if (newTag.date) {
                  updatedTags[existingIndex].date = newTag.date;
                }
                if (newTag.dateType) {
                  updatedTags[existingIndex].dateType = newTag.dateType;
                }
              } else {
                // For other sections, update 'since' if Rx pad has it
                if (newTag.since) {
                  updatedTags[existingIndex].since = newTag.since;
                }
              }
              // Update relationship if Rx pad has it (Family History)
              if (newTag.relationship) {
                updatedTags[existingIndex].relationship = newTag.relationship;
              }
              // Update status if Rx pad has it
              if (newTag.status) {
                updatedTags[existingIndex].status = newTag.status;
              }
            }
          } else {
            updatedTags.push(newTag);
          }
        });

        return {
          ...existingSection,
          tags: updatedTags
        };
      }
      return existingSection;
    });

    Object.values(groupedByType).forEach((apiSection) => {
      if (!merged.find((s) => s.tmmhs_id === apiSection.tmmhs_id)) {
        merged.push(apiSection);
      }
    });


    if (merged.length > 0) {
      if (medicalHistoryRemarks) {
        merged[0].medical_history_remarks = medicalHistoryRemarks;
      } else if (existingContextData[0]?.medical_history_remarks) {
        merged[0].medical_history_remarks = existingContextData[0].medical_history_remarks;
      }
    }

    return merged;
  }
  return medicalHistoryDataArray;
}

/**
 * Converts CashManagerContext format back to Rx Pad format
 * for display in MedicalHistoryRichTextEditor when prescriptionData.medicalHistory is empty
 * Input: [{ tmmhs_id, section_name, title, no_know_history?, tags: [{ title, enable, since, relationship, note }] }]
 * Output: [{ type, name, enable, duration, relation, notes, lineItem }]
 * @param {Array} contextMedicalHistory - Medical history from context
 * @returns {Array} Rx pad format array
 */
export function convertContextToRxPadFormat(contextMedicalHistory) {
  if (!contextMedicalHistory || !Array.isArray(contextMedicalHistory) || contextMedicalHistory.length === 0) {
    return [];
  }

  const idToTypeMap = {
    1: 'lifestyle',
    2: 'medical_condition',
    3: 'family_history',
    4: 'allergies',
    5: 'surgical_history'
  };

  const rxPadArray = [];
  let medicalHistoryRemarks = null;
  
  contextMedicalHistory.forEach((section, index) => {
    if (index === 0 && section.medical_history_remarks) {
      medicalHistoryRemarks = section.medical_history_remarks;
    }
    
    if (section.no_know_history || !section.tags || section.tags.length === 0) {
      return;
    }

    const type = idToTypeMap[section.tmmhs_id] || 'others';
    
    section.tags.forEach(tag => {
      if (tag.enable === 'N') {
        rxPadArray.push({
          type: type,
          name: tag.title || '',
          enable: 'N',
          lineItem: tag.title || ''
        });
      } else {
        const parts = [];
        if (tag.title) parts.push(tag.title);
        
        // Surgical History (tmmhs_id 5) uses 'date' instead of 'since'
        if (section.tmmhs_id === 5) {
          if (tag.date) parts.push(`Date of Surgery: ${tag.date}`);
        } else {
          if (tag.since) parts.push(`Since: ${tag.since}`);
        }
        
        if (tag.relationship) parts.push(`Relation: ${tag.relationship}`);
        if (tag.note) parts.push(`Notes: ${tag.note}`);
        
        const rxItem = {
          type: type,
          name: tag.title || '',
          enable: tag.enable || 'Y',
          duration: tag.since || '',
          relation: tag.relationship || '',
          notes: tag.note || '',
          lineItem: parts.length > 1 ? `${parts[0]} (${parts.slice(1).join(' | ')})` : (parts[0] || '')
        };
        
        // Add surgical-specific fields
        if (section.tmmhs_id === 5 && tag.date) {
          rxItem.date = tag.date;
          rxItem.dateType = tag.dateType || 'onlyYear';
        }
        
        rxPadArray.push(rxItem);
      }
    });
  });
  
  if (medicalHistoryRemarks) {
    const remarksParts = medicalHistoryRemarks
      .split('\n')
      .map(part => part.trim())
      .filter(part => part)
      .flatMap(part => part.includes(';') ? part.split(';').map(p => p.trim()).filter(p => p) : [part]);
    
    remarksParts.forEach(remark => {
      rxPadArray.push({
        type: 'others',
        name: remark,
        enable: 'Y',
        lineItem: remark,
        notes: remark
      });
    });
  }

  return rxPadArray;
}
