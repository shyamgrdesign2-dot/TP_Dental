import React from 'react';
import BillingDashboard from '../../../opdBilling/components/billingDashboard/BillingDashboard';
import './BillingTab.scss';

function BillingTab({ patientData, fromPath }) {
  return (
    <div className="billing-tab">
      <BillingDashboard patientData={patientData} fromPath={fromPath} />
    </div>
  );
}

export default BillingTab;
