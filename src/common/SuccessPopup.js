import { Modal } from "antd";
import React from "react";
import successWebm from "../assets/images/success-animation.webm";
import successMp4 from "../assets/images/success-animation.mp4";
import LoopingVideo from "../components/common/LoopingVideo";

const SuccessPopup = ({ show, setShow, message }) => {
  return (
    <Modal
      open={show}
      width={300}
      footer={null}
      closeIcon={null}
      onCancel={() => setShow(false)}
    >
      <div className="d-flex flex-column align-items-center py-3">
        <LoopingVideo
          webm={successWebm}
          mp4={successMp4}
          width={100}
          ariaLabel="Success"
        />
        {message ?? ""}
      </div>
    </Modal>
  );
};

export default React.memo(SuccessPopup);
