import React from 'react';
import {
  CaptureBedIcon,
  CaptureCakeIcon,
  CaptureChevronRightIcon,
  CaptureCircleDashedIcon,
  CaptureClockIcon,
  CaptureUserIcon,
} from './TpIcons';
import './CaptureCard.scss';

function CaptureCard({ capture, showReviewFooter = false, onClick }) {
  const showAccent = capture.review || showReviewFooter;

  return (
    <article
      className={`tp-capture-card ${onClick ? 'tp-capture-card--clickable' : ''}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <span className="tp-capture-card__border" aria-hidden />
      <span className="tp-capture-card__shine" aria-hidden />
      {showAccent && <span className="tp-capture-card__accent" aria-hidden />}

      <div className="tp-capture-card__body">
        <div className="tp-capture-card__meta">
          <span className={`tp-capture-card__type tp-capture-card__type--${capture.type.toLowerCase()}`}>
            {capture.type}
          </span>
          <span className="tp-capture-card__time">
            <CaptureClockIcon size={11} color="#94a3b8" />
            {capture.time} · {capture.duration}
          </span>
        </div>

        <div className="tp-capture-card__chips">
          <span className="tp-chip tp-chip--patient">
            <CaptureUserIcon size={12} color="#d97706" />
            {capture.patient}
          </span>
          {capture.bed && (
            <span className="tp-chip tp-chip--soft">
              <CaptureBedIcon size={11} color="#94a3b8" />
              {capture.bed}
            </span>
          )}
          {capture.age && (
            <span className="tp-chip tp-chip--soft">
              <CaptureCakeIcon size={11} color="#94a3b8" />
              {capture.age}
            </span>
          )}
          {capture.extraCount > 0 && (
            <span className="tp-chip tp-chip--more">+{capture.extraCount}</span>
          )}
        </div>

        <h3 className="tp-capture-card__title">{capture.title}</h3>
        <p className="tp-capture-card__snippet">{capture.snippet}</p>

        {showReviewFooter && capture.review && (
          <div className="tp-capture-card__footer">
            <span className="tp-capture-card__status">
              <CaptureCircleDashedIcon size={11} color="#d97706" />
              Needs review
            </span>
            <span className="tp-capture-card__chevron-wrap">
              <CaptureChevronRightIcon size={16} color="#94a3b8" />
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

export default CaptureCard;
