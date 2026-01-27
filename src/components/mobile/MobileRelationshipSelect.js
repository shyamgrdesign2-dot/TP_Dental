import React from 'react';
import { Drawer, Checkbox } from 'antd';
import closeIcon from '../../assets/mobile/close 2.svg';
import './MobileRelationshipSelect.scss';

function MobileRelationshipSelect({ 
  visible, 
  onClose, 
  selectedRelationship,
  onSelect
}) {
  const relationships = [
    'Father',
    'Mother',
    'Wife',
    'Husband',
    'Uncle',
    'Aunty',
    'Siblings',
    'Relatives',
    'Son',
    'Daughter',
    'Grandfather',
    'Grandmother',
    'Brother',
    'Sister',
    'Cousin'
  ];

  const handleSelect = (relationship) => {
    onSelect?.(relationship);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      open={visible}
      height="60vh"
      className="mobile-relationship-select"
      closable={false}
      maskClosable={true}
    >
      <div className="mobile-relationship-content">
        <div className="mobile-relationship-header">
          <h3 className="mobile-relationship-title">Select Relationship</h3>
          <button
            className="mobile-relationship-close"
            onClick={onClose}
            type="button"
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <div className="relationship-list">
          {relationships.map(relationship => (
            <div
              key={relationship}
              className="relationship-item"
              onClick={() => handleSelect(relationship)}
            >
              <Checkbox
                checked={selectedRelationship === relationship}
                onChange={() => handleSelect(relationship)}
              >
                {relationship}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
}

export default MobileRelationshipSelect;
