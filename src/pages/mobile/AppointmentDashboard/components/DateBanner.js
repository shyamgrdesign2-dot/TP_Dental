import React from 'react';
import './DateBanner.scss';
import CalendarIcon from '../../../../assets/images/calendar-2.svg';
import CaretIcon from '../../../../assets/images/Caret.svg';

function DateBanner({ date, onClick, showDropdown = true }) {
  return (
    <div className="date-banner" onClick={onClick}>
      <div className="date-banner-content">
        <img 
          src={CalendarIcon}
          alt="calendar" 
          className="calendar-icon"
        />
        <span className="date-text">{date}</span>
        {showDropdown && (
          <img 
            src={CaretIcon}
            alt="dropdown" 
            className="dropdown-icon"
          />
        )}
      </div>
    </div>
  );
}

export default DateBanner;
