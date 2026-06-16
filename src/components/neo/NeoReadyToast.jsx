import React from "react";
import {
  NeoMicIcon,
  NeoCloseIcon,
  NeoDocumentIcon,
} from "./icons";
import "./NeoConsultation.scss";

/**
 * Branded "Neo consultation ready" toast.
 * Pinned top-right, dismissible, with a primary CTA to navigate to the
 * Neo Consult page. Designed to match the Tatva Practice surface — soft
 * shadow, gradient top edge, lavender icon tile, green NEW pill.
 */
function NeoReadyToast({
  open,
  onOpen,
  onDismiss,
  title = "Neo consultation ready",
  description = "Your transcription is processed. Review clinical notes and copy to Rx.",
  showNew = true,
}) {
  if (!open) return null;
  return (
    <div className="neo-ready-toast" role="status" aria-live="polite">
      <div className="neo-ready-toast__gradient" aria-hidden="true" />
      <button
        type="button"
        className="neo-ready-toast__close"
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        <NeoCloseIcon size={14} />
      </button>

      <div className="neo-ready-toast__top">
        <div className="neo-ready-toast__icon" aria-hidden="true">
          <span className="neo-ready-toast__icon-ring" />
          <NeoMicIcon size={22} />
        </div>
        <div className="neo-ready-toast__copy">
          <div className="neo-ready-toast__title-row">
            <span className="neo-ready-toast__title">{title}</span>
            {showNew && <span className="neo-ready-toast__pill">NEW</span>}
          </div>
          <div className="neo-ready-toast__desc">{description}</div>
        </div>
      </div>

      <div className="neo-ready-toast__actions">
        <button
          type="button"
          className="neo-ready-toast__btn neo-ready-toast__btn--primary"
          onClick={onOpen}
        >
          <NeoDocumentIcon size={16} />
          <span>Open Neo Consult</span>
        </button>
        <button
          type="button"
          className="neo-ready-toast__btn neo-ready-toast__btn--ghost"
          onClick={onDismiss}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default NeoReadyToast;
