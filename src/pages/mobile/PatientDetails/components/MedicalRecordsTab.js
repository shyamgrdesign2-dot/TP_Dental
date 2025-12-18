import React from 'react';
import VisitMedicalRecords from '../../../medicalRecords/components/visitMedicalRecords/VisitMedicalRecords';
import './MedicalRecordsTab.scss';

function MedicalRecordsTab({
  filesData,
  setUploadDocDrawer,
  setFilesData,
  handleUploadDocPopup,
  setIsEditDocument,
  handleDrawerUploadDoc,
}) {
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
    </div>
  );
}

export default MedicalRecordsTab;
