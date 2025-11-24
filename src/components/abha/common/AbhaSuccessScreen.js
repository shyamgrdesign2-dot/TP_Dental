import SuccessGif from "../../../assets/images/succcess-abha-animation.gif";

const AbhaSuccessScreen = () => {
  return (
    <div className="abha_verified_container">
      <img src={SuccessGif} alt="SUCCESS GIF" width={200} />
      <div className="verified_label">Verified successfully</div>
    </div>
  );
};

export default AbhaSuccessScreen;
