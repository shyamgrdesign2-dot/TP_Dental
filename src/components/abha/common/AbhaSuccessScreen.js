import SuccessWebm from "../../../assets/images/succcess-abha-animation.webm";
import SuccessMp4 from "../../../assets/images/succcess-abha-animation.mp4";
import LoopingVideo from "../../common/LoopingVideo";

const AbhaSuccessScreen = () => {
  return (
    <div className="abha_verified_container">
      <LoopingVideo
        webm={SuccessWebm}
        mp4={SuccessMp4}
        width={200}
        ariaLabel="Success"
      />
      <div className="verified_label">Verified successfully</div>
    </div>
  );
};

export default AbhaSuccessScreen;
