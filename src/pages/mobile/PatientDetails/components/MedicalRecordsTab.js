import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import VisitMedicalRecords from '../../../medicalRecords/components/visitMedicalRecords/VisitMedicalRecords';
import { isAndroid, isBrowser } from 'react-device-detect';
import { generateUniqueFileName, getCorrectedFileName } from '../../../medicalRecords/utils/helper';
import addMedRecordIcon from '../../../../assets/mobile/add_medRecord.svg';
import './MedicalRecordsTab.scss';

function MedicalRecordsTab({
  filesData,
  setUploadDocDrawer,
  setFilesData,
  handleUploadDocPopup,
  setIsEditDocument,
  handleDrawerUploadDoc,
}) {
  const { allUploadedDocs } = useSelector((state) => state.uploadDoc);
  const fileInputRef = useRef(null);

  const handleFABClick = () => {
    if (isAndroid && !isBrowser) {
      handleUploadDocPopup();
    } else if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      if (filesArray.length > 0) {
        const updatedFiles = [];
        filesArray.forEach((file) => {
          const cleanFileName = getCorrectedFileName(file?.name || '');
          const isCapturedFromCamera =
            (file.type === 'image/jpeg' ||
              file.type === 'image/png' ||
              file.type === 'image/jpg') &&
            (cleanFileName === 'image.jpg' ||
              cleanFileName === 'image.png' ||
              cleanFileName === 'image.jpeg');

          let newFile = file;

          if (isCapturedFromCamera) {
            const uniqueFileName = generateUniqueFileName(file);
            newFile = new File([file], uniqueFileName, { type: file.type });
          } else {
            newFile = new File([file], cleanFileName, { type: file.type });
          }

          updatedFiles.push(newFile);
        });
        setFilesData(updatedFiles);
        handleDrawerUploadDoc();
      }
    }
    event.target.value = null;
  };

  return (
    <div className="medical-records-tab">
      <VisitMedicalRecords
        filesData={filesData}
        setUploadDocDrawer={setUploadDocDrawer}
        setFilesData={setFilesData}
        handleUploadDocPopup={handleUploadDocPopup}
        setIsEditDocument={setIsEditDocument}
        handleDrawerUploadDoc={handleDrawerUploadDoc}
      />
      {allUploadedDocs?.length > 0 && (
        <>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png, image/jpeg, image/jpg, image/gif, application/pdf, video/mp4, video/quicktime, video/x-msvideo"
            style={{ display: 'none' }}
            disabled={filesData.length >= 5}
          />
          <button
            className="medical-records-fab"
            onClick={handleFABClick}
            type="button"
            aria-label="Upload Medical Record"
          >
            <img src={addMedRecordIcon} alt="Upload" />
          </button>
        </>
      )}
    </div>
  );
}

export default MedicalRecordsTab;
