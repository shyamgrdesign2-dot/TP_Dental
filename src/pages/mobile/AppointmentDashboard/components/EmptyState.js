import React from 'react';
import noData from '../../../../assets/images/nodata-found.svg';
import './EmptyState.scss';

function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <img src={noData} alt="No data" className="empty-icon" />
      <div className="empty-message">{message}</div>
    </div>
  );
}

export default EmptyState;

