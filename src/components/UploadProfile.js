import React, { useState, useEffect, useRef } from "react";
import defaultprofile from "../assets/images/default-profile.svg";
import { Form } from "antd";
import { useSelector } from "react-redux";
import { ADD, EDIT } from "../utils/constants";
import UploadProfileModal from "./UploadProfileModal";

function UploadProfile({ form, mode = ADD, isMobile = false }) {
  const { patients_details } = useSelector((state) => state.records);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [file, setFile] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (patients_details && mode === EDIT) {
      setFile(patients_details.pm_image_path)
    }
  }, [patients_details, mode]);

  function handleChange(e) {
    if (e.target.files?.length > 0) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setFile(fileUrl);
      form.setFieldsValue({
        pm_image: e.target.files[0],
      });
    }
  }

  const handleUploadClick = () => {
    setIsModalVisible(true);
  };

  const handleCameraSelect = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.setAttribute('capture', 'environment');
      cameraInputRef.current.click();
    }
  };

  const handleGallerySelect = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.removeAttribute('capture');
      galleryInputRef.current.click();
    }
  };

  const handleFilesSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className={`text-center ${isMobile ? 'mobile-profile-container' : ''}`}>
        <div className={isMobile ? 'mobile-profile-wrapper' : ''}>
          <img
            className="profilepic"
            src={file ? file : defaultprofile}
            alt="Profile Photo"
          />
          {isMobile && (
            <>
              <div className="mobile-profile-upload-overlay" onClick={handleUploadClick}>
                <i className="icon-camera"></i>
              </div>
              <Form.Item name="pm_image" style={{ display: 'none' }} />
            </>
          )}
        </div>
      </div>
      {!isMobile && (
        <div className="text-center mt-4">
          <div className="btn btn-input btn-41 d-flex align-items-center justify-content-center mx-auto" style={{width: 200}} onClick={handleUploadClick}>
            <Form.Item name="pm_image" />
            <i className="icon-camera me-3" /> <span>{`${file ? 'Update' : 'Upload'} Profile`}</span>
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <input 
        ref={cameraInputRef}
        type="file" 
        accept="image/*" 
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <input 
        ref={galleryInputRef}
        type="file" 
        accept="image/*" 
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      {/* Upload Profile Modal */}
      <UploadProfileModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectCamera={handleCameraSelect}
        onSelectGallery={handleGallerySelect}
        onSelectFiles={handleFilesSelect}
      />
    </>
  );
}

export default React.memo(UploadProfile);
