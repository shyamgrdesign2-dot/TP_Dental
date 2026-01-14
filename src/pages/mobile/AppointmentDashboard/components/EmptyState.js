import React from 'react';
import emptyIllustration from '../../../../assets/mobile/empty_illustration.svg';
import './EmptyState.scss';

function EmptyState({ message }) {
  return (
    <div className="empty-state-wrapper">
      <div className="empty-state">
        <img src={emptyIllustration} alt="No data" className="empty-icon" />
        <div className="empty-message">{message}</div>
      </div>
    </div>
  );
}

export default EmptyState;

