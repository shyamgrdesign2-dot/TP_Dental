import React from 'react';
import Cardiology from '../../../../components/Cardiology';
import VisitActionButtons from './VisitActionButtons';
import './VisitSummaryTab.scss';

function VisitSummaryTab({
  patient_data,
  viewCaseManagerData,
  loading,
  tcmData,
  nextPress,
  prevPress,
  isVaccinationAccessable,
  isGrowthChartAccessable,
  userId,
  onEditRx,
  onDownloadRx,
  onPrintRx,
  onRepeatRx,
}) {
  return (
    <div className="visit-summary-tab">
      {/* Visit Details - Shown first on mobile */}
      <div className="summary-visit-details">
        <Cardiology
          patient_data={patient_data}
          tcmData={tcmData}
          loading={loading}
          viewCaseManagerData={viewCaseManagerData}
          nextPress={nextPress}
          prevPress={prevPress}
        />
      </div>


      {/* Fixed Bottom Action Buttons - Edit, Download, Print, Repeat Rx with Page Number */}
      {viewCaseManagerData && (
        <VisitActionButtons
          onEdit={onEditRx}
          onDownload={onDownloadRx}
          onPrint={onPrintRx}
          onRepeatRx={onRepeatRx}
          showEdit={viewCaseManagerData?.doctor_data?.editCase}
          currentPage={tcmData?.page || 1}
          totalPages={viewCaseManagerData?.total_consultation || 1}
        />
      )}
    </div>
  );
}

export default VisitSummaryTab;
