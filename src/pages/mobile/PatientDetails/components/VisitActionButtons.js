import React from 'react';
import editIcon from '../../../../assets/mobile/edit-2.svg';
import downloadIcon from '../../../../assets/mobile/Arrow Download.svg';
import printIcon from '../../../../assets/mobile/Print.svg';
import repeatIcon from '../../../../assets/mobile/Repeat.svg';
import './VisitActionButtons.scss';

function VisitActionButtons({
  onEdit,
  onDownload,
  onPrint,
  onRepeatRx,
  showEdit = true,
  currentPage = 1,
  totalPages = 1,
}) {
  // Format page number with leading zeros (e.g., 01/12)
  const formatPageNumber = (page, total) => {
    const formattedPage = String(page).padStart(2, '0');
    const formattedTotal = String(total).padStart(2, '0');
    return `${formattedPage}/${formattedTotal}`;
  };

  // Ensure handlers are functions before calling
  const handleEditClick = (e) => {
    e.preventDefault();
    if (onEdit && typeof onEdit === 'function') {
      onEdit();
    }
  };

  const handleDownloadClick = (e) => {
    e.preventDefault();
    if (onDownload && typeof onDownload === 'function') {
      onDownload();
    }
  };

  const handlePrintClick = (e) => {
    e.preventDefault();
    if (onPrint && typeof onPrint === 'function') {
      onPrint();
    }
  };

  const handleRepeatRxClick = (e) => {
    e.preventDefault();
    if (onRepeatRx && typeof onRepeatRx === 'function') {
      onRepeatRx();
    }
  };

  return (
    <div className="visit-action-buttons">
      {/* Action Buttons Row */}
      <div className="action-buttons-row">
        {showEdit && (
          <button
            className="action-button icon-button"
            onClick={handleEditClick}
            type="button"
            aria-label="Edit"
          >
            <img src={editIcon} alt="Edit" />
          </button>
        )}
        
        <button
          className="action-button icon-button"
          onClick={handleDownloadClick}
          type="button"
          aria-label="Download"
        >
          <img src={downloadIcon} alt="Download" />
        </button>
        
        <button
          className="action-button icon-button"
          onClick={handlePrintClick}
          type="button"
          aria-label="Print"
        >
          <img src={printIcon} alt="Print" />
        </button>
        
        <button
          className="action-button repeat-button"
          onClick={handleRepeatRxClick}
          type="button"
          aria-label="Repeat Rx"
        >
          <img src={repeatIcon} alt="Repeat" className="repeat-icon" />
          <span className="repeat-text">Repeat Rx</span>
        </button>
      </div>
      
      {/* Page Number Display */}
      <div className="page-number-display">
        {formatPageNumber(currentPage, totalPages)}
      </div>
    </div>
  );
}

export default VisitActionButtons;

