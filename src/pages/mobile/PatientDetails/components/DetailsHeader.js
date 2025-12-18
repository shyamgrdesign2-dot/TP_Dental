import React from 'react';
import arrowLeft from '../../../../assets/mobile/arrow-left-white.svg';
import moreVertical from '../../../../assets/mobile/more-vertical.svg';
import './DetailsHeader.scss';

function DetailsHeader({ onBack, title, onEdit, profileSection }) {
  return (
    <div className="details-header">
      <div className="header-content">
        <button className="back-button" onClick={onBack} type="button">
          <img src={arrowLeft} alt="Back" />
        </button>
        {profileSection ? (
          <div className="header-profile-section">{profileSection}</div>
        ) : (
          <h1 className="header-title">{title || "Patient Details"}</h1>
        )}
        {onEdit && (
          <button className="edit-button" onClick={onEdit} type="button">
            <img src={moreVertical} alt="More options" />
          </button>
        )}
        {!onEdit && <div className="header-spacer" />}
      </div>
    </div>
  );
}

export default DetailsHeader;

