import styles from "./TabVoiceRxButton.module.scss";
import voiceRxIcon from "../../assets/images/voice-rx.svg";

const TabVoiceRxButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.tabVoiceRxButton} ${className}`}
    >
      <div className={styles.gradientBackground}></div>
      <img
        src={voiceRxIcon}
        alt="Voice Rx"
        loading="lazy"
        className={styles.voiceRxButtonIcon}
      />
    </button>
  );
};

export default TabVoiceRxButton;
