import React from 'react';
import CertificateDetails from '../../../../components/medical_certificate/CertificateDetails';
import './CertificateTab.scss';

function CertificateTab({ patient_data }) {
  return (
    <div className="certificate-tab">
      <CertificateDetails patient_data={patient_data} />
    </div>
  );
}

export default CertificateTab;
