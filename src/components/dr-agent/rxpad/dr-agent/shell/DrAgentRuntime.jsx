import React from "react";
import { DrAgentPanel } from "../DrAgentPanel";
import { useRxPadSync } from "../RxPadSyncContext";
import { DrAgentFab } from "./DrAgentFab";
import styles from "./DrAgentRuntime.module.scss";

export function DrAgentRuntime({
  isOpen,
  onOpen,
  onClose,
  overlayClassName,
  patientId,
  doctorId
}) {
  const {
    collapsedVoiceSession,
    requestVoicePauseToggle,
    requestVoiceSubmit
  } = useRxPadSync();

  const collapsedVoiceActive = !isOpen && !!collapsedVoiceSession.active;
  const showIdleFab = !isOpen && !collapsedVoiceSession.active;
  const handleActiveVoiceSubmit = () => {
    onOpen?.();
    requestVoiceSubmit();
  };

  return (
    <>
      {collapsedVoiceActive && (
        <div
          className={styles.activeBackdrop}
          data-dr-agent="true"
          aria-hidden="true"
        />
      )}

      <div
        className={[
          overlayClassName,
          !isOpen ? styles.hiddenPanel : ""
        ].filter(Boolean).join(" ")}
        data-dr-agent="true"
      >
        <DrAgentPanel
          isPanelVisible={isOpen}
          voiceRxMode
          patientId={patientId}
          doctorId={doctorId}
          onClose={onClose}
          onOpen={onOpen}
        />
      </div>

      {showIdleFab && (
        <DrAgentFab onClick={onOpen} />
      )}

      {collapsedVoiceActive && (
        <DrAgentFab
          activeVoiceSession
          activeVoicePaused={!!collapsedVoiceSession.paused}
          activeVoiceStatusLabel={collapsedVoiceSession.statusLabel}
          activeVoiceElapsedLabel={collapsedVoiceSession.elapsedLabel}
          activeVoiceAudioLevel={collapsedVoiceSession.audioLevel}
          onPauseToggle={requestVoicePauseToggle}
          onActiveSubmit={handleActiveVoiceSubmit}
          onClick={onOpen}
        />
      )}
    </>
  );
}
