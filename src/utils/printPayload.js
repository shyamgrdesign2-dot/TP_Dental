import React from "react";
import { pdf } from "@react-pdf/renderer";
import ViewPDF from "../components/print_settings/ViewPDF";

const resolveSelectedLang = (payload, selectedLang) => {
  if (selectedLang !== undefined && selectedLang !== null) {
    return selectedLang;
  }

  const defaultLang = payload?.printSettings?.default_language;
  if (!defaultLang || defaultLang === "English") {
    return 1;
  }

  return defaultLang;
};

const normalizeArrayValue = (value, fallbackKey) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (value && Array.isArray(value[fallbackKey])) {
    return value[fallbackKey];
  }
  return [];
};

export const renderPrintPayloadToBlob = async (
  payload,
  { selectedLang, isGynaecHistoryAccessable } = {}
) => {
  if (!payload) {
    return null;
  }

  const {
    mode,
    rx,
    lg,
    caseManagerData,
    columns,
    initialRows,
    frequencyList,
    timingList,
    printSettings,
    fileHeader,
    fileFooter,
    fileLogo,
    fileWatermark,
    fileSignature,
    givenVaccines,
    dueVaccines,
    carePlanAssignments,
    smartDigitizeRxData,
    growthChartDetails,
    gynecHistoryData,
    obsHistoryData,
    labParamsData,
    customModules,
    patientBills,
    advanceReceipts,
    patientWalletBalance,
    labReportData,
    ophthalModuleData,
  } = payload;

  const combinedCaseManagerData = {
    ...caseManagerData,
    gynecHistoryData,
    labParamsData,
    labReportData,
    ophthalModuleData,
  };

  const todayVaccines = {
    given: normalizeArrayValue(givenVaccines, "template"),
    due: normalizeArrayValue(dueVaccines, "detail"),
  };

  const resolvedLang = resolveSelectedLang(payload, selectedLang);

  const normalizedCustomModules = Array.isArray(customModules)
    ? customModules
    : Array.isArray(customModules?.modules)
      ? customModules.modules
      : [];

  return pdf(
    <ViewPDF
      mode={mode}
      rx={rx}
      lg={lg}
      caseManagerData={combinedCaseManagerData}
      columns={columns}
      initialRows={initialRows}
      frequencyList={frequencyList}
      timingList={timingList}
      printSettings={printSettings}
      fileHeader={fileHeader}
      fileFooter={fileFooter}
      fileLogo={fileLogo}
      fileWatermark={fileWatermark}
      fileSignature={fileSignature}
      todayVaccines={todayVaccines}
      carePlanAssignments={carePlanAssignments}
      smartRxData={smartDigitizeRxData}
      growthChartDetails={growthChartDetails}
      isGynaecHistoryAccessable={isGynaecHistoryAccessable}
      obsHistoryData={obsHistoryData}
      customModules={normalizedCustomModules}
      patientBills={patientBills}
      advanceReceipts={advanceReceipts}
      patientWalletBalance={patientWalletBalance}
      selectedLang={resolvedLang}
      ophthalModuleData={ophthalModuleData}
    />
  ).toBlob();
};
