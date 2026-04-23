import styles from "./TabVoiceRxButton.module.scss";
import voiceRxIcon from "../../assets/images/voice-rx.svg";
import genRxBgWebm from "../../assets/images/gen-rx-bg.webm";
import genRxBgMp4 from "../../assets/images/gen-rx-bg.mp4";
import LoopingVideo from "../common/LoopingVideo";

const TabVoiceRxButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.tabVoiceRxButton} ${className}`}
    >
      <LoopingVideo
        webm={genRxBgWebm}
        mp4={genRxBgMp4}
        className={styles.gradientBackground}
        ariaLabel="Voice Rx background"
      />
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
