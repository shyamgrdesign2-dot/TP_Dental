import React from 'react';
import { FaMinus, FaPlus, FaExpand, FaUndo } from 'react-icons/fa';
import './ZoomControls.scss';

const ZoomControls = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onReset,
  onFit
}) => {
  return (
    <div className="tab-rx-zoom-controls">
      <button 
        onClick={onZoomOut}
        className="zoom-button"
        aria-label="Zoom Out"
      >
        <FaMinus size={18} />
      </button>

      <button 
        onClick={onReset}
        className="zoom-level"
        title="Reset to 100%"
      >
        {Math.round(zoomLevel * 100)}%
      </button>

      <button 
        onClick={onZoomIn}
        className="zoom-button"
        aria-label="Zoom In"
      >
        <FaPlus size={18} />
      </button>

      <div className="divider" />

      <button 
        onClick={onFit}
        className="fit-button"
        title="Fit to Screen"
      >
        <FaExpand size={18} />
      </button>
    </div>
  );
};

export default ZoomControls;
