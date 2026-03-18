import React, { useEffect, useState } from "react";
import {
  Font,
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  isNumeric,
  chunkArray,
  capitalize,
  getIndianLanguageFont,
  getFrequencyTitle,
  getTimeingTitle,
  getDurationTitle,
  getRxTitle,
  formatHeightWeight,
} from "../utils";
import {
  EXTRA_OPTIONS,
  NEO_NATOLOGISTS_DP_ID,
  NORMAL,
  PAEDIATRICS_DP_ID,
  WHATSAPP,
  WEIGHT_HEIGHT_TITLE,
  INVESTIGATION_TITLE,
} from "../constants";
import moment from "moment";
import ObsHistoryInlineView from "../../components/print_settings/obsHistory/inline";
import ObsHistoryListView from "../../components/print_settings/obsHistory/list";
import ObsHistoryTableView from "../../components/print_settings/obsHistory/table";
import GynecHistoryInlineView from "../../components/print_settings/gynec-history/inline";
import GynecHistoryListView from "../../components/print_settings/gynec-history/list";
import GynecHistoryTableView from "../../components/print_settings/gynec-history/table";
import OphthalmologyInlineView from "../../components/print_settings/ophthalmology/inline";
import OphthalmologyListView from "../../components/print_settings/ophthalmology/list";
import OphthalmologyTableView from "../../components/print_settings/ophthalmology/table";
import ThenConnector from "../../components/print_settings/ThenConnector";

const PX_TO_PT = 0.75;

// Roboto
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/Roboto-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/Roboto-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/Roboto-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});
// Arial
Font.register({
  family: "Arial",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/Arimo-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/Arimo-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/Arimo-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});
// Times Roman
Font.register({
  family: "Times-Roman",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/EBGaramond-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/EBGaramond-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/EBGaramond-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});
// Verdana
Font.register({
  family: "Verdana",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/Jost-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/Jost-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/Jost-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});
// Calibri
Font.register({
  family: "Calibri",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/OpenSans-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/OpenSans-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/OpenSans-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});
// Tahoma
Font.register({
  family: "Tahoma",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/Vazirmatn-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/Vazirmatn-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/Vazirmatn-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});

Font.register({
  family: "AnekDevanagari",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/AnekDevanagari-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/AnekDevanagari-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/AnekDevanagari-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});

// Bengali
Font.register({
  family: "AnekBangla",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/AnekBangla-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/AnekBangla-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/AnekBangla-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});

// Tamil
Font.register({
  family: "NotoSansTamil",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/NotoSansTamil-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/NotoSansTamil-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/NotoSansTamil-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});

// Telugu
Font.register({
  family: "NotoSansTelugu",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/NotoSansTelugu-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/NotoSansTelugu-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/NotoSansTelugu-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});

// Kannada
Font.register({
  family: "NotoSansKannada",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/NotoSansKannada-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/NotoSansKannada-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/NotoSansKannada-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});

// Malayalam
Font.register({
  family: "NotoSansMalayalam",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/NotoSansMalayalam-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/NotoSansMalayalam-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/NotoSansMalayalam-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});

// Gujarati
Font.register({
  family: "BalooBhai2",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/BalooBhai2-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/BalooBhai2-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/BalooBhai2-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});

// Punjabi/Gurmukhi
Font.register({
  family: "NotoSansGurmukhi",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/NotoSansGurmukhi-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/NotoSansGurmukhi-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/NotoSansGurmukhi-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});

// Oriya/Odia
Font.register({
  family: "NotoSansOriya",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/NotoSansOriya-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/NotoSansOriya-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/NotoSansOriya-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});

// Urdu
Font.register({
  family: "NotoNastaliqUrdu",
  fonts: [
    {
      src: require("../../assets/fonts/print-fonts/NotoNastaliqUrdu-Regular.ttf"),
      fontWeight: 400,
    }, // Regular
    {
      src: require("../../assets/fonts/print-fonts/NotoNastaliqUrdu-Medium.ttf"),
      fontWeight: 500,
    }, // Medium
    {
      src: require("../../assets/fonts/print-fonts/NotoNastaliqUrdu-Bold.ttf"),
      fontWeight: 700,
    }, // Bold
  ],
});

const widthOfA4PageInPts = 595;
export const getMedicineFreqDosageFormat = (freqDosage, is_dosage_decimal) => {
    if (!!is_dosage_decimal) {
        return freqDosage;
    }
    var value = ''
    if (freqDosage == '0.5') {
        value = `1/2`
    } else if (freqDosage == '0.25') {
        value = `1/4`
    } else if (freqDosage == '0.75') {
        value = `3/4`
    } else {
        value = freqDosage
    }
    return value
}
const AI_FLOW_MEDICINE_UNIT_MAP = { 2: "Tablet", 3: "mg", 4: "ml", 5: "gm", 6: "Capsule", 7: "Sachet", 8: "Injection", 9: "Drop", 14: "Drops" };

function getAiFlowMedicationDisplayList(medicine) {
  if (!Array.isArray(medicine) || medicine.length === 0) return [];
  return medicine.map((item, index) => {
    const tmm_unit = item.tmm_unit ?? item.unit_id ?? 2;
    const unitTitle = AI_FLOW_MEDICINE_UNIT_MAP[tmm_unit] || "Unit";
    const medicineUnit =
      Array.isArray(item.medicineUnit) && item.medicineUnit.length > 0
        ? item.medicineUnit
        : [{ tmu_id: tmm_unit, tmu_title: unitTitle }];
    return {
      ...item,
      index,
      tmm_id: item.tmm_id ?? item.unique_id ?? `ai-${index}`,
      tmm_medicine_name:
        item.tmm_medicine_name || item.name || item.medicine_name || item.lineItem || "",
      tmm_generic:
        item.tmm_generic ??
        item.corrected_name ??
        item.metadata?.tmm_generic ??
        item.generic ??
        "",
      tmm_unit,
      medicineUnit,
      tmm_dosage: item.tmm_dosage ?? item.dosage ?? "",
      tcm_tmm_freq_morning: item.tcm_tmm_freq_morning ?? item.freqMorning,
      tcm_tmm_freq_afternoon: item.tcm_tmm_freq_afternoon ?? item.freqAfternoon,
      tcm_tmm_freq_evening: item.tcm_tmm_freq_evening ?? item.freqEvening,
      tcm_tmm_freq_night: item.tcm_tmm_freq_night ?? item.freqNight,
      tmf_block: item.tmf_block ?? 0,
      tmm_freq_type: item.tmm_freq_type ?? item.freq_type,
      tmm_time: item.tmm_time ?? item.time_id ?? 1,
      tmm_days: item.tmm_days ?? item.days,
      tmm_duration_type: item.tmm_duration_type ?? item.duration_type ?? "day(s)",
      display_qty: item.display_qty ?? item.quantity ?? item.qty ?? "",
      tmm_remarks: item.tmm_remarks ?? item.notes ?? item.note ?? "",
    };
  });
}
const styles = StyleSheet.create({
  mainTitle: {
    fontSize: PX_TO_PT * 18,
    color: "#A461D8",
    fontFamily: "Roboto",
    fontWeight: 700,
  },
  subTitle: {
    fontSize: PX_TO_PT * 14,
    color: "#454551",
    fontFamily: "Roboto",
    fontWeight: 500,
    lineHeight: 1.4,
  },
  displayPatient: {
    color: "#171725",
    fontFamily: "Roboto",
  },
  mainCasemanager: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  extraText: {
    fontSize: PX_TO_PT * 12,
    color: "#171725",
    fontFamily: "Roboto",
  },
  directionCasemanager: {
    flexDirection: "row",
    alignItems: "center",
  },
  table: {
    marginTop: PX_TO_PT * 4,
  },
  dentalSection: {
    marginTop: PX_TO_PT * 12,
  },
  dentalTable: {
    marginTop: PX_TO_PT * 6,
    borderTop: "1px solid #171725",
    borderRadius: PX_TO_PT * 4,
    overflow: "hidden",
  },
  dentalRow: {
    flexDirection: "row",
    borderBottom: "1px solid #171725",
    borderLeft: "1px solid #171725",
  },
  dentalHeaderRow: {
    flexDirection: "row",
    borderBottom: "1px solid #171725",
    borderLeft: "1px solid #171725",
    borderTop: "1px solid #171725",
  },
  dentalCellLabel: {
    width: "35%",
    padding: 6,
    borderRight: "1px solid #171725",
  },
  dentalCellValue: {
    flex: 1,
    padding: 6,
    borderRight: "1px solid #171725",
  },
  dentalHeaderCell: {
    flex: 1,
    padding: 6,
    borderRight: "1px solid #171725",
  },
  dentalQuadrantGrid: {
    marginTop: PX_TO_PT * 6,
    border: "1px solid #171725",
    borderRadius: PX_TO_PT * 4,
    overflow: "hidden",
  },
  dentalQuadrantRow: {
    flexDirection: "row",
  },
  dentalQuadrantCell: {
    flex: 1,
    borderRight: "1px solid #171725",
    borderBottom: "1px solid #171725",
    padding: 6,
  },
  dentalQuadrantTitle: {
    marginBottom: 4,
  },
  dentalListItem: {
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #171725",
    borderLeft: "1px solid #171725",
    minHeight: PX_TO_PT * 10,
  },
  cell: {
    flex: 1,
    padding: 6,
    borderRight: "1px solid #171725",
    height: "100%",
  },
  dynamicModuleCell: {
    padding: 6,
    borderRight: "1px solid #171725",
    height: "100%",
  },
  headerRow: {
    flexDirection: "row",
    borderBottom: "1px solid #171725",
    borderLeft: "1px solid #171725",
    borderTop: "1px solid #171725",
  },
  headerRowFixed: {
    flexDirection: "row",
    borderBottom: "1px solid #171725",
    borderLeft: "1px solid #171725",
  },
  headerCell: {
    flex: 1,
    padding: 6,
    borderRight: "1px solid #171725",
    fontWeight: 700,
  },
  tableHeaderCell: {
    padding: 6,
    borderRight: "1px solid #171725",
    fontWeight: 700,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #171725",
    borderLeft: "1px solid #171725",
    borderRight: "1px solid #171725",
    minHeight: PX_TO_PT * 25,
    alignItems: "stretch",
  },
  tableCell: {
    padding: PX_TO_PT * 2,
    borderRight: "1px solid #171725",
    justifyContent: "center",
  },
  cellText: {
    color: "#171725",
    fontFamily: "Roboto",
    fontSize: PX_TO_PT * 10,
    lineHeight: 1.2,
    fontWeight: 700,
  },
  lineHeight2: {
    lineHeight: 2,
  },
  minHeight50: {
    minHeight: 50,
  },
  minHeight38: {
    minHeight: 38,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    fontWeight: 400,
    bottom: 10,
    right: 10,
    textAlign: "center",
    color: "#454551",
  },
});

const module_id =
  process.env?.NODE_ENV !== "prod"
    ? "6874956bc1abf17f6932cb32"
    : "68624471353771e0a587fed6";
const um_id = process.env?.NODE_ENV !== "prod" ? "493" : "12028";

const ViewPDF = ({ mode = NORMAL, ...props }) => {
  const {
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
    smartRxData,
    growthChartDetails,
    gynecHistoryData,
    obsHistoryData,
    labParamsData,
    ophthalModuleData,
    patientBills,
    advanceReceipts,
    patientWalletBalance,
    zydusLabData,
    customModules,
    abhaDetails,
  } = props;
  const isPediatricAccessable =
    caseManagerData?.doctor_data?.dp_id == PAEDIATRICS_DP_ID ||
    caseManagerData?.doctor_data?.dp_id == NEO_NATOLOGISTS_DP_ID;
  const isTeleconsultType2 = Number(caseManagerData?.pam_status_type_appointment) === 2;

  if (isPediatricAccessable) {
    printSettings?.header_footer?.patient_info?.forEach((item) => {
      if (item.id === 5) {
        item.title = WEIGHT_HEIGHT_TITLE;
      }
    });
  }

  const { growthChartData, growthChartImageData } = growthChartDetails || {};
  const patientBirthWeight = caseManagerData?.patient_birth_weight ?? null;
  let growthChartImageChunks = [];
  if (growthChartImageData) {
    const growthChartOption = printSettings?.prescription?.case_option?.find(
      (o) => o?.id === 12,
    )?.growth_chart_option;
    const graphs = Object.keys(growthChartImageData)?.filter((g) =>
      growthChartOption?.includes(g),
    );
    growthChartImageChunks = chunkArray(graphs, 2);
  }
  const showMode =
    printSettings?.header_footer?.show_header_footer_page || "all";
  const transformGivenVaccineData = (data) => {
    const groupedData = {};
    const template = data?.template ?? [];
    template.forEach((item) => {
      const { tvc_name, tvac_name, ...rest } = item;

      if (!groupedData[tvc_name]) {
        groupedData[tvc_name] = { ...rest, tvac_name, tvc_name };
      } else {
        groupedData[tvc_name].tvac_name += `, ${tvac_name}`;
      }
    });

    const groupValues = Object.values(groupedData);

    return {
      template: groupValues,
    };
  };

  const transformGivenVaccines = transformGivenVaccineData(givenVaccines);
  const hasOphthalValue = (value) => {
    if (value === 0 || value === "0") return true;
    if (value === null || value === undefined) return false;
    return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
  };
  const hasOphthalArrayData = (items, keys) =>
    Array.isArray(items) &&
    items.some((item) => keys.some((key) => hasOphthalValue(item?.[key])));
  const hasOphthalModuleData = !!(
    ophthalModuleData &&
    (hasOphthalArrayData(ophthalModuleData.visualAcuity, [
      "ucDistance",
      "ucNear",
      "pinhole",
      "cDistance",
      "cNear",
    ]) ||
      hasOphthalArrayData(ophthalModuleData.autoRefraction, [
        "sphere",
        "cylinder",
        "axis",
        "add",
        "distance",
        "near",
      ]) ||
      hasOphthalArrayData(ophthalModuleData.lensometerValues, [
        "sphere",
        "cylinder",
        "axis",
        "add",
        "distance",
        "near",
      ]) ||
      hasOphthalArrayData(ophthalModuleData.glassPrescription, [
        "sphere",
        "cylinder",
        "axis",
        "add",
        "distance",
        "near",
      ]) ||
      hasOphthalArrayData(ophthalModuleData.intraOcularPressure, [
        "nct",
        "gat",
        "cc",
        "cct",
        "ciop",
      ]) ||
      hasOphthalArrayData(ophthalModuleData.slitLampExamination, [
        "OD",
        "OS",
        "remarks",
      ]) ||
      hasOphthalArrayData(ophthalModuleData.fundusExamination, [
        "OD",
        "OS",
        "remarks",
      ]) ||
      hasOphthalValue(ophthalModuleData.pd))
  );
  // Filter care plans to show only those for current TCM
  const activeCarePlans = Array.isArray(carePlanAssignments)
    ? carePlanAssignments.filter((cp) => {
        const cpId = cp?.tcm_id !== undefined ? parseInt(cp?.tcm_id) : NaN;
        const curId =
          caseManagerData?.tcm_id !== undefined
            ? parseInt(caseManagerData?.tcm_id)
            : NaN;
        return !isNaN(cpId) && !isNaN(curId) && cpId === curId;
      })
    : [];

  const removeRemarks = (data) => {
    return data?.map((item) => ({
      ...item,
      inputs: item?.inputs?.filter((input) => input?.testName !== "Remarks"),
    }));
  };

  const onCalFollowUp = (start_date, end_date) => {
    const dateB = moment(start_date);
    const dateC = moment(end_date);

    const days = dateB.diff(dateC, "days");
    const weeks = dateB.diff(dateC, "weeks");
    const months = dateB.diff(dateC, "months");

    if (weeks >= 48 && weeks % 48 === 0) {
      const yearsValue = Math.floor(weeks / 48);
      return `${yearsValue} ${yearsValue <= 1 ? "Year" : "Years"}`;
    } else if (weeks === 5) {
      return "1 Month";
    } else if (weeks === 7 || weeks === 9) {
      return "2 Months";
    } else if (weeks === 11 || weeks === 13) {
      return "3 Months";
    } else if (weeks === 17) {
      return "4 Months";
    } else if (weeks === 19 || weeks === 21) {
      return "5 Months";
    } else if (weeks === 23 || weeks === 25) {
      return "6 Months";
    } else if (weeks === 27 || weeks === 29) {
      return "7 Months";
    } else if (weeks % 4 === 0 && weeks >= 4 && weeks < 48) {
      const monthsValue = Math.floor(weeks / 4);
      return `${monthsValue} ${monthsValue <= 1 ? "Month" : "Months"}`;
    } else if (weeks > 0) {
      return `${weeks} ${weeks <= 1 ? "Week" : "Weeks"}`;
    } else {
      return `${days} ${days <= 1 ? "Day" : "Days"}`;
    }
  };

  const groupByReportNameForAll = (data) => {
    return data?.map((item) => {
      const groupedInputs = item?.inputs?.reduce((acc, input) => {
        if (!acc[input?.reportName]) {
          acc[input?.reportName] = [];
        }
        acc[input?.reportName].push(input);
        return acc;
      }, {});

      return {
        date: item?.date,
        groupedInputs,
      };
    });
  };

  const syncLabResultsData = (labResults) => {
    const allReportNames = new Set();
    const allTestNamesByReport = {};

    labResults?.forEach((result) => {
      Object.keys(result?.groupedInputs || {}).forEach((reportName) => {
        allReportNames.add(reportName);
        if (!allTestNamesByReport[reportName]) {
          allTestNamesByReport[reportName] = new Set();
        }
        result?.groupedInputs?.[reportName]?.forEach((test) => {
          allTestNamesByReport[reportName].add(test?.testName);
        });
      });
    });

    const allReportNamesArray = Array.from(allReportNames);
    const allTestNamesByReportArray = {};
    Object.keys(allTestNamesByReport).forEach((reportName) => {
      allTestNamesByReportArray[reportName] = Array.from(
        allTestNamesByReport[reportName],
      );
    });

    return labResults?.map((result) => {
      const transformedGroupedInputs = {};

      allReportNamesArray.forEach((reportName) => {
        if (!result?.groupedInputs?.[reportName]) {
          transformedGroupedInputs[reportName] = allTestNamesByReportArray[
            reportName
          ]?.map((testName) => ({
            reportName,
            testName,
            value: "-",
            arrowDirection: "",
            units: "",
          }));
        } else {
          const existingTests = result?.groupedInputs?.[reportName];

          const updatedTests = allTestNamesByReportArray[reportName]?.map(
            (testName) => {
              const existingTest = existingTests?.find(
                (test) => test?.testName === testName,
              );
              return (
                existingTest || {
                  reportName,
                  testName,
                  value: "-",
                  arrowDirection: "",
                  units: "",
                }
              );
            },
          );

          transformedGroupedInputs[reportName] = updatedTests;
        }
      });

      return {
        ...result,
        groupedInputs: transformedGroupedInputs,
      };
    });
  };

  const labParamsPatchData = labParamsData
    ? groupByReportNameForAll(labParamsData)
    : null;
  const labParamsPatchTableData = labParamsPatchData
    ? syncLabResultsData(labParamsPatchData)
    : null;
  // Zydus lab data processing moved to inline component for better performance

  const genderAge = (patient_data, profile) => {
    var value = ``;
    if (profile?.dp_id === 9) {
      if (patient_data?.ageYears != 0) {
        value += `${patient_data?.ageYears}y`;
      }
      if (patient_data?.ageMonths != 0) {
        value += ` ${patient_data?.ageMonths}m`;
      }
      if (patient_data?.ageDays != 0) {
        value += ` ${patient_data?.ageDays}d`;
      }
    } else {
      if (patient_data?.ageYears != 0) {
        value += `${patient_data?.ageYears}y`;
      } else if (patient_data?.ageMonths != 0) {
        value += ` ${patient_data?.ageMonths}m`;
      } else if (patient_data?.ageDays != 0) {
        value += ` ${patient_data?.ageDays}d`;
      }
    }
    return value;
  };

  const patientDataShow = (id) => {
    var value = "";
    if (id == 1) {
      value = `${caseManagerData?.patient_data?.patient_salutation ? `${caseManagerData?.patient_data?.patient_salutation} ${caseManagerData?.patient_data?.patient_name}, ${caseManagerData?.patient_data?.patient_id}` : `${caseManagerData?.patient_data?.patient_name}, ${caseManagerData?.patient_data?.patient_id}`}`;
    } else if (id == 2) {
      value = `${caseManagerData?.patient_data?.patient_consultaion_date ? moment(caseManagerData?.patient_data?.patient_consultaion_date).format("DD/MM/YYYY HH:mm") : "-"}`;
    } else if (id == 3) {
      value = `${genderAge(caseManagerData?.patient_data, caseManagerData?.doctor_data)}, ${caseManagerData?.patient_data?.patient_gender}`;
    } else if (id == 4) {
      value = `${caseManagerData?.patient_data?.patient_contact_no ? caseManagerData?.patient_data?.patient_contact_no : "-"}`;
    } else if (id == 5) {
      const htWt = caseManagerData?.patient_data?.patient_ht_wt;
      value =
        htWt && isPediatricAccessable ? formatHeightWeight(htWt) : htWt || "-";
    } else if (id == 6) {
      value = `${caseManagerData?.patient_data?.patient_blood_group ? caseManagerData?.patient_data?.patient_blood_group : "-"}`;
    } else if (id == 7) {
      value = `${caseManagerData?.patient_data?.patient_address ? caseManagerData?.patient_data?.patient_address : "-"}`;
    } else if (id == 8) {
      value = `${caseManagerData?.patient_data?.patient_consultation_type ? caseManagerData?.patient_data?.patient_consultation_type : "-"}`;
    } else if (id == 9) {
      value = `${caseManagerData?.patient_data?.patient_edd_date ? caseManagerData?.patient_data?.patient_edd_date : "-"}`;
    } else if (id == 10) {
      value = `${caseManagerData?.patient_data?.patient_email ? caseManagerData?.patient_data?.patient_email : "-"}`;
    } else if (id == 11) {
      value = `${caseManagerData?.patient_data?.patient_reference_id ? caseManagerData?.patient_data?.patient_reference_id : "-"}`;
    } else if (id == 12) {
      value = `${caseManagerData?.patient_data?.patient_salutation ? `${caseManagerData?.patient_data?.patient_salutation} ${caseManagerData?.patient_data?.patient_name}` : `${caseManagerData?.patient_data?.patient_name}`}`;
    } else if (id == 13) {
      value = `${caseManagerData?.patient_data?.patient_id ? caseManagerData?.patient_data?.patient_id : "-"}`;
    } else if (id == 14) {
      value = `${caseManagerData?.patient_data?.patient_dob ? caseManagerData?.patient_data?.patient_dob : "-"}`;
    } else if (id == 15) {
      value = `${abhaDetails?.abha_address ? abhaDetails?.abha_address : "-"}`;
    } else if (id == 16) {
      value = `${abhaDetails?.abha_number ? abhaDetails?.abha_number : "-"}`;
    }
    return value;
  };

  const medicineHeaderLang = (title) => {
    var value = getRxTitle(lg, title);
    return value;
  };

  const durationLang = (title) => {
    var value = getDurationTitle(lg, title);
    return value;
  };

  const timeingLang = () => {
    var value = getTimeingTitle(lg);
    return value;
  };

  const frequencyLang = () => {
    var value = getFrequencyTitle(lg);
    return value;
  };

  const getFont = () => {
    // Map language to a registered font family; fall back to the page setting or Roboto
    const fallback = printSettings?.page_format?.font_family || "Roboto";
    if (lg == 3 || lg == 4) {
      return "AnekDevanagari"; // Hindi/Marathi/etc.
    }
    if (lg == 2) {
      return "BalooBhai2"; // Gujarati
    }
    if (lg == 5) {
      return "NotoSansTelugu";
    }
    if (lg == 6) {
      return "NotoSansKannada";
    }
    if (lg == 10) {
      return "NotoSansTamil";
    }
    if (lg == 11 || lg == 12) {
      return "AnekBangla";
    }
    if (lg == 13) {
      return "NotoSansOriya"; // Odia
    }
    // Languages without a dedicated registered font (Punjabi/Malayalam/Urdu) use fallback
    return fallback;
  };


  const medical_history_title = (id) => {
    var value = "";
    if (id == 2) {
      value = `Condition : `;
    } else if (id == 3) {
      value = `History : `;
    } else if (id == 4) {
      value = `Allergies to : `;
    } else if (id == 1) {
      value = `Habit : `;
    } else if (id == 5) {
      value = `Surgery : `;
    }
    return value;
  };

  const medicine_freq_dosage_format = (freq, is_dosage_decimal) => {
    var value = getMedicineFreqDosageFormat(freq, is_dosage_decimal);
    return value;
  };

  let medicalHistoryIndex = 1;

  const {
    isRxDigitizeBool = false,
    isVoiceRxDigitizeBool = false,
    isAmbientVoiceRxDigitizeBool = false,
    uploaded_files = [],
    history = [],
    editedData = null,
  } = smartRxData || {};
  const isSnapRx = uploaded_files?.[0]?.filename?.includes("snap_rx");
  const isSmartSyncPrescription = isRxDigitizeBool
    ? !!(uploaded_files && uploaded_files.length && uploaded_files[0]?.fileUrl)
    : isVoiceRxDigitizeBool
      ? !!(history && history.length)
      : !!(
          uploaded_files &&
          uploaded_files.length &&
          uploaded_files[0]?.fileUrl
        );
  const shouldWrapSmartSyncPrescription =
    isSmartSyncPrescription && !isRxDigitizeBool && !isVoiceRxDigitizeBool;
  const digitizedData = isVoiceRxDigitizeBool
    ? smartRxData?.voiceRxDigitizeEditedData
    : isAmbientVoiceRxDigitizeBool
      ? smartRxData?.ambientVoiceRxDigitizeEditedData
      : smartRxData?.rxDigitizeEditedData;
  const baseFontFamily = printSettings?.page_format?.font_family || "Roboto";
  const baseFontSize = PX_TO_PT * (printSettings?.page_format?.font_size || 10);
  const dentalPdfData =
    digitizedData?.dentalData ??
    (digitizedData?.complaints || digitizedData?.diagnosis || digitizedData?.treatmentPlans
      ? digitizedData
      : null) ??
    {};
  const dentalComplaints = dentalPdfData?.complaints || {};
  const dentalDiagnosis = dentalPdfData?.diagnosis || {};
  const dentalTreatmentItems = dentalPdfData?.treatmentPlans?.items || [];
  const dentalWorkDone = dentalPdfData?.workDone || { items: [], notes: "" };
  const dentalMedicationOption =
    printSettings?.prescription?.case_option?.find((o) => o?.id === 4) || {};
  const dentalMedicationItems = getAiFlowMedicationDisplayList(dentalPdfData?.medications);
  const dentalWorkDoneItems = Array.isArray(dentalWorkDone?.items) ? dentalWorkDone.items : [];
  const dentalTeeth = Array.isArray(dentalDiagnosis?.teeth) ? dentalDiagnosis.teeth : [];
  const buildWorkDoneText = (item) => {
    const workDone = item?.workDone ?? "";
    const nextAppointment = item?.nextAppointment ?? "";
    const workDoneText = String(workDone ?? "");
    const nextText = String(nextAppointment ?? "").trim();
    if (!nextText) return workDoneText;
    const normalized = workDoneText.toLowerCase();
    if (normalized.includes("next appointment")) return workDoneText;
    const suffix = `Next Appointment: ${nextText}`;
    if (!workDoneText.trim()) return suffix;
    return `${workDoneText}\n${suffix}`;
  };
  const dentalTeethBySection = dentalTeeth.reduce(
    (acc, tooth) => {
      const section = tooth?.toothSection;
      if (section && acc[section]) acc[section].push(tooth);
      return acc;
    },
    {
      UPPER_LEFT: [],
      UPPER_RIGHT: [],
      LOWER_LEFT: [],
      LOWER_RIGHT: [],
    },
  );
  const diagnosisFieldOrder = [
    "stains",
    "calculus",
    "oralHygieneStatus",
    "periodontalseverity",
    "orthodonticFindings",
    "orthodonticInterventionRequired",
    "habitsPedo",
  ];
  const camelCaseToTitle = (str) => {
    if (str === "periodontalseverity" || str === "Periodontalseverity") {
      return "Periodontal Severity";
    }
    return String(str || "")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (first) => first.toUpperCase())
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim();
  };
  const formatDiagnosisValue = (val) => {
    if (Array.isArray(val)) {
      return val.filter((v) => v != null && String(v).trim() !== "").join(", ");
    }
    if (val && typeof val === "object") {
      return Object.entries(val)
        .filter(([, v]) => !!v)
        .map(([k]) => k)
        .join(", ");
    }
    if (val == null) return "";
    return String(val);
  };
  const dentalDiagnosisRows = diagnosisFieldOrder
    .filter((key) => key in dentalDiagnosis)
    .map((key) => ({
      key,
      label: camelCaseToTitle(key),
      value: formatDiagnosisValue(dentalDiagnosis?.[key]),
    }))
    .filter((row) => String(row.value || "").trim() !== "");
  const dentalToothDiagramNotes = (() => {
    const notes = dentalDiagnosis?.toothDiagramNotes;
    if (Array.isArray(notes)) {
      return notes
        .filter((note) => note != null && String(note).trim() !== "")
        .map((note) => String(note))
        .join("\n");
    }
    if (notes == null) return "";
    return String(notes);
  })();
  const hasToothDiagramNotes = String(dentalToothDiagramNotes || "").trim() !== "";
  const isNonEmptyDentalValue = (val) => {
    if (val === 0 || val === "0") return true;
    if (val === true) return true;
    if (Array.isArray(val)) {
      return val.some((item) => isNonEmptyDentalValue(item));
    }
    if (val && typeof val === "object") {
      return Object.values(val).some((item) => isNonEmptyDentalValue(item));
    }
    return val != null && String(val).trim() !== "";
  };
  const dentalComplaintRows = [
    { key: "chiefComplaint", label: "CHIEF COMPLAINT" },
    { key: "symptom", label: "HTN/DM/ASTHMA/CARDIAC STATUS/BLOOD DISORDER" },
    { key: "otherDiseases", label: "OTHER DISEASES" },
    { key: "medications", label: "MEDICATION" },
    { key: "drugAllergy", label: "H/O DRUG ALLERGY" },
    { key: "pregnancy", label: "PREGNANCY" },
    { key: "habits", label: "HABITS (Tobacco/Smoking/Grinding Teeth)" },
    { key: "dentalHistory", label: "DENTAL HISTORY" },
    { key: "pain", label: "HEAD/JAW/NECK PAIN" },
    { key: "notes", label: "NOTES" },
  ];
  const dentalComplaintRowsFiltered = dentalComplaintRows.filter((row) => {
    const value = dentalComplaints?.[row.key];
    return isNonEmptyDentalValue(value);
  });
  const dentalMedicationRowsFiltered = Array.isArray(dentalMedicationItems)
    ? dentalMedicationItems.filter((item) =>
        [
          item?.tmm_medicine_name,
          item?.name,
          item?.groundedMedicineName,
          item?.tmm_dosage,
          item?.frequency,
          item?.schedule,
          item?.tmm_remarks,
          item?.display_qty,
        ].some((val) => isNonEmptyDentalValue(val)),
      )
    : [];
  const hasTeethData = Object.values(dentalTeethBySection || {}).some(
    (arr) => Array.isArray(arr) && arr.length > 0,
  );
  const dentalTreatmentRowsFiltered = Array.isArray(dentalTreatmentItems)
    ? dentalTreatmentItems.filter((item) =>
        [item?.srno, item?.treatment, item?.toothNum, item?.rate, item?.count, item?.estimate].some(
          (val) => isNonEmptyDentalValue(val),
        ),
      )
    : [];
  const dentalWorkDoneRowsFiltered = Array.isArray(dentalWorkDoneItems)
    ? dentalWorkDoneItems.filter((item) =>
        [
          item?.date,
          buildWorkDoneText(item),
          item?.ptr,
          item?.ttReview,
          item?.payment,
          item?.balance,
          item?.remarks,
        ].some((val) => isNonEmptyDentalValue(val)),
      )
    : [];
  const hasWorkDoneNotes = isNonEmptyDentalValue(dentalWorkDone?.notes);
  const hasDentalSectionData =
    dentalComplaintRowsFiltered.length > 0 ||
    dentalMedicationRowsFiltered.length > 0 ||
    hasTeethData ||
    dentalDiagnosisRows.length > 0 ||
    dentalTreatmentRowsFiltered.length > 0 ||
    hasToothDiagramNotes ||
    dentalWorkDoneRowsFiltered.length > 0 ||
    hasWorkDoneNotes;
  const shouldHideMedicationModuleBecauseDentalMedicationShown =
    isSmartSyncPrescription &&
    isRxDigitizeBool &&
    dentalMedicationRowsFiltered.length > 0;
  const dentalQuadrantSections = [
    { key: "UPPER_LEFT", label: "UPPER_LEFT" },
    { key: "UPPER_RIGHT", label: "UPPER_RIGHT" },
    { key: "LOWER_LEFT", label: "LOWER_LEFT" },
    { key: "LOWER_RIGHT", label: "LOWER_RIGHT" },
  ];
  const digitizeVersionRaw =
    (isVoiceRxDigitizeBool ||
      isAmbientVoiceRxDigitizeBool ||
      isSnapRx ||
      isSmartSyncPrescription) &&
    smartRxData?.version !== undefined
      ? `${smartRxData.version}`.trim().toLowerCase()
      : null;
  const isVoiceOrAmbientV2 = digitizeVersionRaw === "v2";
  const innerMedication = (index) => {
    const mainArray = [];
    for (var i = index; i < caseManagerData?.medicine?.length; i++) {
      if (
        caseManagerData?.medicine?.[i]?.tmm_id ==
        caseManagerData?.medicine?.[index]?.tmm_id
      ) {
        mainArray.push(caseManagerData?.medicine?.[i]);
      } else {
        break;
      }
    }
    return mainArray;
  };
  const medicationData = caseManagerData?.medicine
    ?.map((e, index) => ({ ...e, index: index }))
    ?.reduce(
      (acc, curr) =>
        acc?.at?.(-1)?.tmm_id == curr?.tmm_id ? acc : [...acc, curr],
      [],
    );

  const getFrequencyLanguageTitles = (languageId) => {
    const languageMap = {
      1: "english",
      2: "gujarati",
      3: "hindi",
      4: "marathi",
      6: "kannada",
      10: "tamil",
      11: "assamese",
      12: "bengali",
      13: "odia",
    };

    const frequencyTitles = {
      english: {
        morning: "Morning",
        afternoon: "Afternoon",
        evening: "Evening",
        night: "Night",
      },
      gujarati: {
        morning: "સવારે",
        afternoon: "બપોર",
        evening: "સાંજે",
        night: "રાત્રે",
      },
      hindi: {
        morning: "सुबह",
        afternoon: "दोपहर",
        evening: "शाम",
        night: "रात",
      },
      marathi: {
        morning: "सकाळी",
        afternoon: "दुपारी",
        evening: "संध्याकाळ",
        night: "रात्री",
      },
      kannada: {
        morning: "ಬೆಳಗ್ಗೆ",
        afternoon: "ಮಧ್ಯಾಹ್ನ",
        evening: "ಸಂಜೆ",
        night: "ರಾತ್ರಿ",
      },
      tamil: {
        morning: "காலை பொழுதில்",
        afternoon: "மதியம்",
        evening: "மாலையில்",
        night: "இரவு",
      },
      assamese: {
        morning: "সকাল",
        afternoon: "বিকাল",
        evening: "সন্ধ্যা",
        night: "ৰাতি",
      },
      bengali: {
        morning: "সকাল",
        afternoon: "দুপুর",
        evening: "সন্ধ্যা",
        night: "রাত",
      },
      odia: {
        morning: "ସକାଳ",
        afternoon: "ବେଳୁଆ",
        evening: "ସନ୍ଧ୍ୟା",
        night: "ରାତି",
      },
    };

    const language = languageMap[languageId] || "english";
    return frequencyTitles[language];
  };

  const formatFrequency = (
    morning,
    afternoon,
    evening,
    night,
    is_dosage_decimal,
  ) => {
    const {
      morning: morningLabel,
      afternoon: afternoonLabel,
      evening: eveningLabel,
      night: nightLabel,
    } = getFrequencyLanguageTitles(lg);

    const frequencyParts = [
      morning > 0
        ? `${morningLabel}(${medicine_freq_dosage_format(morning, is_dosage_decimal)})`
        : "",
      afternoon > 0
        ? `${afternoonLabel}(${medicine_freq_dosage_format(afternoon, is_dosage_decimal)})`
        : "",
      evening > 0
        ? `${eveningLabel}(${medicine_freq_dosage_format(evening, is_dosage_decimal)})`
        : "",
      night > 0
        ? `${nightLabel}(${medicine_freq_dosage_format(night, is_dosage_decimal)})`
        : "",
    ].filter(Boolean);
    const frequencyInWords = frequencyParts.join(" - ");
    return frequencyInWords;
  };

  const formatUnitPerDose = (tmm_dosage, is_dosage_decimal) => {
    const unitPerDoseFormat = medicine_freq_dosage_format(
      tmm_dosage,
      is_dosage_decimal,
    );
    return unitPerDoseFormat;
  };

  const getCustomModuleName = (id) => {
    const customModule = customModules?.modules?.find(
      (module) => module?.module_id === id,
    );
    return customModule?.name
      ? customModule?.printConfig?.nameOverride !== undefined
        ? customModule?.printConfig?.nameOverride
        : customModule?.name
      : caseManagerData?.moduleContents?.find(
          (module) => module?.module_id === id,
        )?.module_name;
  };

  const getMarginByFormat = (
    letterheadFormat,
    headerFooter,
    position,
    defaultValue,
  ) => {
    const marginType =
      letterheadFormat === 0
        ? "custom_letterhead_margin"
        : letterheadFormat === 1
          ? "uploaded_letterhead_margin"
          : letterheadFormat === 2
            ? "margin"
            : null;

    return marginType && headerFooter?.[marginType]?.[position] >= 0
      ? (headerFooter?.[marginType]?.[position] || defaultValue) * 25
      : PX_TO_PT * 30;
  };

  const userBottomMargin = getMarginByFormat(
    printSettings?.letterhead_format,
    printSettings?.header_footer,
    "bottom",
    1,
  );
  const userTopMargin = getMarginByFormat(
    printSettings?.letterhead_format,
    printSettings?.header_footer,
    "top",
    1,
  );
  const standardMargin = 0.5 * 25; // 0.5 inches in points
  const extraTopSpace = Math.max(0, userTopMargin - standardMargin);
  const isOwnLetterheadFirstPageOnly =
    printSettings?.letterhead_format === 2 && showMode === "first";

  const calculatePadding = () => {
    const { letterhead_format, header_footer, whatsapp_letterhead_format } =
      printSettings || {};
    const footer = header_footer?.footer;

    if (mode !== NORMAL) {
      return {
        paddingTop: PX_TO_PT * 30,
        paddingBottom:
          whatsapp_letterhead_format === 1
            ? fileFooter?.imageShow
              ? fileFooter?.renderedFooterImageHeight + PX_TO_PT * 30
              : getMarginByFormat(
                  letterhead_format,
                  header_footer,
                  "bottom",
                  0.5,
                ) + 5
            : getMarginByFormat(
                letterhead_format,
                header_footer,
                "bottom",
                0.5,
              ) + 5,
        paddingLeft: PX_TO_PT * 30,
        paddingRight: PX_TO_PT * 30,
      };
    }

    const paddingTop = [0, 1, 2].includes(letterhead_format)
      ? isOwnLetterheadFirstPageOnly
        ? 0.5 * 25
        : getMarginByFormat(letterhead_format, header_footer, "top", 0.5)
      : PX_TO_PT * 30;

    const paddingLeft = [0, 1, 2].includes(letterhead_format)
      ? getMarginByFormat(letterhead_format, header_footer, "left", 0.5)
      : PX_TO_PT * 30;

    const paddingRight = [0, 1, 2].includes(letterhead_format)
      ? getMarginByFormat(letterhead_format, header_footer, "right", 0.5)
      : PX_TO_PT * 30;

    const paddingBottom =
      letterhead_format === 2
        ? isOwnLetterheadFirstPageOnly
          ? userBottomMargin
          : getMarginByFormat(letterhead_format, header_footer, "bottom", 0.5) +
            5
        : letterhead_format === 1
          ? fileFooter?.imageShow
            ? (fileFooter?.footerHeight / fileFooter?.footerWidth) *
                (widthOfA4PageInPts - (paddingLeft + paddingRight)) +
              paddingTop
            : getMarginByFormat(
                letterhead_format,
                header_footer,
                "bottom",
                0.5,
              ) + 5
          : getMarginByFormat(letterhead_format, header_footer, "bottom", 0.5) +
            5;

    return {
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    };
  };

  const paddingStyles = calculatePadding();

  if (
    caseManagerData?.moduleContents?.length &&
    printSettings?.prescription?.case_option
  ) {
    const existingModuleIds = new Set(
      printSettings?.prescription?.case_option?.map((option) => option?.id),
    );

    caseManagerData?.moduleContents
      ?.filter((module) => !existingModuleIds.has(module?.module_id))
      ?.forEach((module) => {
        printSettings?.prescription?.case_option?.push({
          id: module?.module_id,
          format: "inline",
          showDefault: true,
          enable: "Y",
          custom_status: "Y",
        });
      });
  }

  const PageNumberFooter = () => (
    <Text
      fixed
      style={styles.pageNumber}
      render={({ pageNumber, totalPages }) =>
        `Page ${pageNumber}/${totalPages}`
      }
    />
  );

  // Uploaded files for snapRx
  if (
    uploaded_files?.length > 0 &&
    !isRxDigitizeBool &&
    !isVoiceRxDigitizeBool &&
    isSnapRx
  ) {
    return (
      <Document>
        {uploaded_files.length > 0
          ? uploaded_files?.map((item, i) => (
              <Page
                size="A4"
                style={[
                  {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  },
                ]}
                wrap={false}
              >
                <View style={{ flex: 1 }}>
                  <View key={i}>
                    <View style={{ width: "100%" }}>
                      <Image
                        style={{
                          width: "100%",
                          objectFit: "contain",
                          aspectRatio: 1,
                        }}
                        source={{ uri: item.fileUrl }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
              </Page>
            ))
          : null}
      </Document>
    );
  }

  const hasAnyData = (caseManagerData, rx) => {
    return (
      // Check custom module options (1-16, 18, 91)
      hasAnyModuleOptions(
        printSettings,
        caseManagerData,
        smartRxData,
        patientBills,
        advanceReceipts,
        gynecHistoryData,
        obsHistoryData,
        labParamsPatchData,
        zydusLabData,
        transformGivenVaccines,
        dueVaccines,
        growthChartData,
        activeCarePlans,
      ) ||
      zydusLabData?.data?.length > 0 ||
      // Check digitized data
      hasAnySmartRxData(smartRxData) ||
      // Check smart sync data
      (isSmartSyncPrescription &&
        (isRxDigitizeBool ||
          isVoiceRxDigitizeBool ||
          isAmbientVoiceRxDigitizeBool ||
          (caseManagerData.isCustomSSRX === "0" && uploaded_files?.length > 0)))

      // // Check case manager data
      // hasAnyCaseManagerData(caseManagerData) ||
    );
  };

  // Utility function to check if any data exists in rxDigitizeEditedData or voiceRxDigitizeEditedData
  const hasAnySmartRxData = (smartRxData) => {
    if (!smartRxData) return false;

    const rxData = smartRxData?.rxDigitizeEditedData;
    const voiceRxData =
      smartRxData?.voiceRxDigitizeEditedData ||
      smartRxData?.ambientVoiceRxDigitizeEditedData;

    if (rxData) {
      const rxChecks = [
        rxData.followUp,
        rxData.symptoms?.some((item) => item?.name || item?.lineItem),
        (rxData.examination || rxData.examinations)?.some(
          (item) => item?.name || item?.lineItem,
        ),
        rxData.diagnosis?.some((item) => item?.name || item?.lineItem),
        (rxData.tests || rxData.labInvestigation)?.some(
          (item) => item?.refinedName || item?.name,
        ),
        rxData.advice?.length > 0,
        rxData.vaccinations?.some((item) => item?.name),
      ];

      if (rxChecks.some((check) => check)) return true;
    }

    if (voiceRxData) {
      const df = voiceRxData.dynamicFields;
      const hasNonEmptyDynField = (item) =>
        item?.fields?.some(
          (f) =>
            typeof f === "object" &&
            Object.entries(f).some(
              ([k, v]) =>
                k !== "order" &&
                k !== "orader" &&
                v != null &&
                String(v).trim() !== "",
            ),
        );
      const hasDynamicFields =
        df &&
        (Array.isArray(df)
          ? df.some(hasNonEmptyDynField)
          : Object.entries(df).some(([key, values]) => values?.length > 0));
      const voiceRxChecks = [
        voiceRxData.followUp,
        hasDynamicFields,
        voiceRxData.symptoms?.length > 0,
        (voiceRxData.examinations || voiceRxData.examination)?.some(
          (item) => item?.name || item?.lineItem,
        ),
        voiceRxData.diagnosis?.some((item) => item?.name || item?.lineItem),
        voiceRxData.medications?.length > 0,
        (voiceRxData.labInvestigation || voiceRxData.tests)?.length > 0,
        voiceRxData.advice?.length > 0,
        voiceRxData.vaccinations?.length > 0,
        voiceRxData.others?.length > 0,
      ];

      if (voiceRxChecks.some((check) => check)) return true;
    }

    return false;
  };

  // Utility function to check if any custom module options are enabled and have data
  const hasAnyModuleOptions = (
    printSettings,
    caseManagerData,
    smartRxData,
    patientBills,
    advanceReceipts,
    gynecHistoryData,
    obsHistoryData,
    labParamsPatchData,
    zydusLabData,
    transformGivenVaccines,
    dueVaccines,
    growthChartData,
    activeCarePlans,
  ) => {
    if (!printSettings?.prescription?.case_option) return false;

    return printSettings?.prescription?.case_option?.some((option) => {
      // Early return for disabled options
      if (option?.enable !== "Y" || option?.custom_status !== "Y") {
        return false;
      }

      // Check if custom module data exists
      let customModule = caseManagerData?.moduleContents?.find(
        (e) => e?.module_id === option?.id,
      );
      if (customModule) {
        customModule = {
          ...customModule,
          module_name: getCustomModuleName(option?.id),
        };
      }

      if (
        (option?.showDefault || option?.is_custom_module === true) &&
        customModule?.content?.length > 0
      ) {
        return true;
      }

      // Check if data exists for each module
      switch (option?.id) {
        case 1: // Symptoms
          return caseManagerData?.symptoms?.length > 0;
        case 2: // Examination
          return caseManagerData?.examination?.length > 0;
        case 3: // Diagnosis
          return caseManagerData?.diagnosis?.length > 0;
        case 4: // Medicine
          return caseManagerData?.medicine?.length > 0;
        case 5: // Advice
          return caseManagerData?.advice?.length > 0;
        case 6: // Investigation
          return (
            caseManagerData?.investigation?.length > 0 &&
            caseManagerData?.investigation?.some(
              (item) => item?.investigation_name,
            )
          );
        case 7: // Vitals
          return caseManagerData?.vitals?.length > 0 || patientBirthWeight;
        case 8: // Medical History (with medical_history_op check)
          return caseManagerData?.medical_history?.length > 0;
        case 9: // Follow Up Date
          return caseManagerData?.follow_up_date;
        case 10: // Vaccines
          return (
            transformGivenVaccines?.template?.length > 0 ||
            dueVaccines?.detail?.length > 0
          );
        // case 11: // smartSync
        //     return caseManagerData?.visit_advice;
        case 12: // Growth Chart
          return growthChartData?.length > 0;
        case 13: // Gynec History
          return gynecHistoryData && Object.keys(gynecHistoryData).length > 2;
        case 14: // Obs History
          return obsHistoryData && Object.keys(obsHistoryData).length > 2;
        case 15: // Lab Parameters
          return labParamsPatchData && labParamsPatchData?.length > 0;
        case 16: // Surgeries
          return caseManagerData?.surgeries?.length > 0;
        case 17: // Patient Bills (already handled in hasAnyData)
          return patientBills?.length > 0 || advanceReceipts?.length > 0;
        case 19: // Care Plans
          return Array.isArray(activeCarePlans) && activeCarePlans.length > 0;
        case 91: // Vaccines
          return caseManagerData?.visit_advice;
        case 20: // Ophthal Module
          return hasOphthalModuleData;
        default:
          return false;
      }
    });
  };

  return (
    <Document>
      {uploaded_files.length > 0 &&
        caseManagerData.isCustomSSRX === "1" &&
        !isRxDigitizeBool &&
        uploaded_files?.map((item, i) => (
          <Page
            size="A4"
            style={[
              {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              },
            ]}
            wrap={false}
          >
            <View style={{ flex: 1 }}>
              <View key={i}>
                <View style={{ width: "100%" }}>
                  <Image
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      aspectRatio: 1,
                    }}
                    source={{ uri: item.fileUrl }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          </Page>
        ))}
      {hasAnyData(caseManagerData, rx) && (
        <Page
          size="A4"
          style={[
            paddingStyles,
            {
              display: "flex",
              flexDirection: "column",
              // justifyContent: 'space-between',
            },
          ]}
          wrap={
            caseManagerData.isCustomSSRX === "1"
              ? true
              : shouldWrapSmartSyncPrescription
                ? false
                : true
          }
        >
          {/* Letterhead spacer for Own Letterhead first-page-only mode */}
          {printSettings?.letterhead_format === 2 &&
            showMode === "first" &&
            extraTopSpace && (
              <View
                style={{
                  marginTop: extraTopSpace,
                  height: 0,
                }}
              />
            )}

          {/* <View style={{ flex: 1 }}> */}

          <View
            style={{
              marginBottom:
                PX_TO_PT *
                (mode == NORMAL
                  ? printSettings?.letterhead_format != 2
                    ? 15
                    : 0
                  : 15),
            }}
            fixed={
              printSettings?.header_footer?.show_header_footer_page !== "first"
            }
          >
            {mode == NORMAL ? (
              printSettings?.letterhead_format === 0 ? (
                <View>
                  {printSettings?.header_footer?.header?.doctor_info?.enable ===
                    "Y" &&
                  printSettings?.header_footer?.header?.clinic_info?.enable ===
                    "Y" ? (
                    <View style={styles.directionCasemanager}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.mainTitle}>
                          {printSettings?.header_footer?.header?.doctor_info
                            ?.place === "L"
                            ? printSettings?.header_footer?.header?.doctor_info
                                ?.header
                            : printSettings?.header_footer?.header?.clinic_info
                                ?.header}
                        </Text>
                        <Text
                          style={[styles.subTitle, { marginTop: PX_TO_PT * 4 }]}
                        >
                          {printSettings?.header_footer?.header?.doctor_info
                            ?.place === "L"
                            ? printSettings?.header_footer?.header?.doctor_info
                                ?.subheader
                            : printSettings?.header_footer?.header?.clinic_info
                                ?.subheader}
                        </Text>
                      </View>
                      {printSettings?.logo_enable === "Y" && (
                        <View
                          style={{
                            width: 82,
                            height: 82,
                            overflow: "hidden",
                            marginHorizontal: 16,
                          }}
                        >
                          {fileLogo && fileLogo?.imageShow && (
                            <Image
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                              src={fileLogo?.showFile}
                            />
                          )}
                        </View>
                      )}
                      <View style={{ flex: 1, textAlign: "right" }}>
                        <Text style={styles.mainTitle}>
                          {printSettings?.header_footer?.header?.doctor_info
                            ?.place === "R"
                            ? printSettings?.header_footer?.header?.doctor_info
                                ?.header
                            : printSettings?.header_footer?.header?.clinic_info
                                ?.header}
                        </Text>
                        <Text
                          style={[styles.subTitle, { marginTop: PX_TO_PT * 4 }]}
                        >
                          {printSettings?.header_footer?.header?.doctor_info
                            ?.place === "R"
                            ? printSettings?.header_footer?.header?.doctor_info
                                ?.subheader
                            : printSettings?.header_footer?.header?.clinic_info
                                ?.subheader}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {printSettings?.logo_enable === "Y" && (
                        <View
                          style={{
                            width: 82,
                            height: 82,
                            overflow: "hidden",
                            marginLeft: 8,
                          }}
                        >
                          {fileLogo && fileLogo?.imageShow && (
                            <Image
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                              src={fileLogo?.showFile}
                            />
                          )}
                        </View>
                      )}
                      {printSettings?.header_footer?.header?.doctor_info
                        ?.enable === "Y" ? (
                        <View
                          style={{
                            flex: 1,
                            textAlign:
                              printSettings?.header_footer?.header?.doctor_info
                                ?.place === "L"
                                ? "left"
                                : "right",
                            weight: "189px",
                          }}
                        >
                          <Text style={styles.mainTitle}>
                            {printSettings?.header_footer?.header?.doctor_info
                              ?.enable === "Y"
                              ? printSettings?.header_footer?.header
                                  ?.doctor_info?.header
                              : printSettings?.header_footer?.header
                                  ?.clinic_info?.header}
                          </Text>
                          <Text
                            style={[
                              styles.subTitle,
                              { marginTop: PX_TO_PT * 4 },
                            ]}
                          >
                            {printSettings?.header_footer?.header?.doctor_info
                              ?.enable === "Y"
                              ? printSettings?.header_footer?.header
                                  ?.doctor_info?.subheader
                              : printSettings?.header_footer?.header
                                  ?.clinic_info?.subheader}
                          </Text>
                        </View>
                      ) : (
                        printSettings?.header_footer?.header?.clinic_info
                          ?.enable === "Y" && (
                          <View
                            style={{
                              flex: 1,
                              textAlign:
                                printSettings?.header_footer?.header
                                  ?.clinic_info?.place === "L"
                                  ? "left"
                                  : "right",
                              weight: "130px",
                            }}
                          >
                            <Text style={styles.mainTitle}>
                              {printSettings?.header_footer?.header?.doctor_info
                                ?.enable === "Y"
                                ? printSettings?.header_footer?.header
                                    ?.doctor_info?.header
                                : printSettings?.header_footer?.header
                                    ?.clinic_info?.header}
                            </Text>
                            <Text
                              style={[
                                styles.subTitle,
                                { marginTop: PX_TO_PT * 4 },
                              ]}
                            >
                              {printSettings?.header_footer?.header?.doctor_info
                                ?.enable === "Y"
                                ? printSettings?.header_footer?.header
                                    ?.doctor_info?.subheader
                                : printSettings?.header_footer?.header
                                    ?.clinic_info?.subheader}
                            </Text>
                          </View>
                        )
                      )}
                    </View>
                  )}
                </View>
              ) : (
                printSettings?.letterhead_format === 1 &&
                fileHeader &&
                fileHeader?.imageShow && (
                  <Image
                    style={{ width: "100%", objectFit: "contain" }}
                    src={fileHeader?.showFile}
                  />
                )
              )
            ) : (
              mode == WHATSAPP &&
              (printSettings?.whatsapp_letterhead_format === 0 ? (
                <View>
                  {printSettings?.header_footer?.header?.doctor_info?.enable ===
                    "Y" &&
                  printSettings?.header_footer?.header?.clinic_info?.enable ===
                    "Y" ? (
                    <View style={styles.directionCasemanager}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.mainTitle}>
                          {printSettings?.header_footer?.header?.doctor_info
                            ?.place === "L"
                            ? printSettings?.header_footer?.header?.doctor_info
                                ?.header
                            : printSettings?.header_footer?.header?.clinic_info
                                ?.header}
                        </Text>
                        <Text
                          style={[styles.subTitle, { marginTop: PX_TO_PT * 4 }]}
                        >
                          {printSettings?.header_footer?.header?.doctor_info
                            ?.place === "L"
                            ? printSettings?.header_footer?.header?.doctor_info
                                ?.subheader
                            : printSettings?.header_footer?.header?.clinic_info
                                ?.subheader}
                        </Text>
                      </View>
                      {printSettings?.logo_enable === "Y" && (
                        <View
                          style={{
                            width: 82,
                            height: 82,
                            overflow: "hidden",
                            marginHorizontal: 16,
                          }}
                        >
                          {fileLogo && fileLogo?.imageShow && (
                            <Image
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                              src={fileLogo?.showFile}
                            />
                          )}
                        </View>
                      )}
                      <View style={{ flex: 1, textAlign: "right" }}>
                        <Text style={styles.mainTitle}>
                          {printSettings?.header_footer?.header?.doctor_info
                            ?.place === "R"
                            ? printSettings?.header_footer?.header?.doctor_info
                                ?.header
                            : printSettings?.header_footer?.header?.clinic_info
                                ?.header}
                        </Text>
                        <Text
                          style={[styles.subTitle, { marginTop: PX_TO_PT * 4 }]}
                        >
                          {printSettings?.header_footer?.header?.doctor_info
                            ?.place === "R"
                            ? printSettings?.header_footer?.header?.doctor_info
                                ?.subheader
                            : printSettings?.header_footer?.header?.clinic_info
                                ?.subheader}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {printSettings?.logo_enable === "Y" && (
                        <View
                          style={{ width: 82, height: 82, overflow: "hidden" }}
                        >
                          {fileLogo && fileLogo?.imageShow && (
                            <Image
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                              src={fileLogo?.showFile}
                            />
                          )}
                        </View>
                      )}
                      {printSettings?.header_footer?.header?.doctor_info
                        ?.enable === "Y" ? (
                        <View
                          style={{
                            flex: 1,
                            marginLeft:
                              printSettings?.header_footer?.header?.doctor_info
                                ?.place === "L"
                                ? 8
                                : 0,
                            textAlign:
                              printSettings?.header_footer?.header?.doctor_info
                                ?.place === "L"
                                ? "left"
                                : "right",
                            weight: "189px",
                          }}
                        >
                          <Text style={styles.mainTitle}>
                            {printSettings?.header_footer?.header?.doctor_info
                              ?.enable === "Y"
                              ? printSettings?.header_footer?.header
                                  ?.doctor_info?.header
                              : printSettings?.header_footer?.header
                                  ?.clinic_info?.header}
                          </Text>
                          <Text
                            style={[
                              styles.subTitle,
                              { marginTop: PX_TO_PT * 4 },
                            ]}
                          >
                            {printSettings?.header_footer?.header?.doctor_info
                              ?.enable === "Y"
                              ? printSettings?.header_footer?.header
                                  ?.doctor_info?.subheader
                              : printSettings?.header_footer?.header
                                  ?.clinic_info?.subheader}
                          </Text>
                        </View>
                      ) : (
                        printSettings?.header_footer?.header?.clinic_info
                          ?.enable === "Y" && (
                          <View
                            style={{
                              flex: 1,
                              marginLeft:
                                printSettings?.header_footer?.header
                                  ?.clinic_info?.place === "L"
                                  ? 8
                                  : 0,
                              textAlign:
                                printSettings?.header_footer?.header
                                  ?.clinic_info?.place === "L"
                                  ? "left"
                                  : "right",
                              weight: "130px",
                            }}
                          >
                            <Text style={styles.mainTitle}>
                              {printSettings?.header_footer?.header?.doctor_info
                                ?.enable === "Y"
                                ? printSettings?.header_footer?.header
                                    ?.doctor_info?.header
                                : printSettings?.header_footer?.header
                                    ?.clinic_info?.header}
                            </Text>
                            <Text
                              style={[
                                styles.subTitle,
                                { marginTop: PX_TO_PT * 4 },
                              ]}
                            >
                              {printSettings?.header_footer?.header?.doctor_info
                                ?.enable === "Y"
                                ? printSettings?.header_footer?.header
                                    ?.doctor_info?.subheader
                                : printSettings?.header_footer?.header
                                    ?.clinic_info?.subheader}
                            </Text>
                          </View>
                        )
                      )}
                    </View>
                  )}
                </View>
              ) : (
                printSettings?.whatsapp_letterhead_format === 1 &&
                fileHeader &&
                fileHeader?.imageShow && (
                  <Image
                    style={{ width: "100%", objectFit: "contain" }}
                    src={fileHeader?.showFile}
                  />
                )
              ))
            )}
          </View>

          {/* <View style={{ flex: 1 }}> */}
          {/* Watermark */}
          {printSettings?.water_mark_enable === "Y" &&
            fileWatermark &&
            fileWatermark?.imageShow && (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  zIndex: -1,
                  opacity: 0.1,
                  position: "absolute",
                  top: "50%",
                  left: "45%",
                }}
                src={fileWatermark?.showFile}
                fixed
              />
            )}
          {/* Patient Info */}
          <View
            style={{
              backgroundColor: "#171725",
              height: PX_TO_PT * 2,
              width: "100%",
            }}
            fixed={printSettings?.header_footer?.show_patient_info === "all"}
          />

          {printSettings?.header_footer?.show_patient_info === "all" ? (
            <>
              <View
                style={{ flexDirection: "row", marginVertical: PX_TO_PT * 15 }}
                fixed
              >
                <View style={{ flex: 0.7 }}>
                  {printSettings?.header_footer?.patient_info
                    ?.filter((e) => e?.enable === "Y")
                    ?.map((item, i) => {
                      return (
                        i % 2 === 0 && (
                          <View
                            key={i}
                            style={{
                              flexDirection: "row",
                              flexWrap: "wrap",
                              paddingVertical: PX_TO_PT * 3,
                            }}
                          >
                            <Text
                              style={[
                                styles.displayPatient,
                                {
                                  fontWeight: 500,
                                  fontSize:
                                    (printSettings?.page_format
                                      ?.patient_info_font_size ||
                                      printSettings?.page_format?.font_size ||
                                      12) * PX_TO_PT,
                                },
                              ]}
                            >{`${item?.title}: `}</Text>
                            <Text
                              style={[
                                styles.displayPatient,
                                {
                                  fontWeight: 400,
                                  fontSize:
                                    (printSettings?.page_format
                                      ?.patient_info_font_size ||
                                      printSettings?.page_format?.font_size ||
                                      12) * PX_TO_PT,
                                },
                              ]}
                            >
                              {patientDataShow(item?.id)}
                            </Text>
                          </View>
                        )
                      );
                    })}
                </View>
                <View style={{ flex: 0.4 }}>
                  {printSettings?.header_footer?.patient_info
                    ?.filter((e) => e?.enable === "Y")
                    ?.map((item, i) => {
                      return (
                        i % 2 === 1 && (
                          <View
                            key={i}
                            style={{
                              flexDirection: "row",
                              flexWrap: "wrap",
                              paddingVertical: PX_TO_PT * 3,
                            }}
                          >
                            <Text
                              style={[
                                styles.displayPatient,
                                {
                                  fontWeight: 500,
                                  fontSize:
                                    (printSettings?.page_format
                                      ?.patient_info_font_size ||
                                      printSettings?.page_format?.font_size ||
                                      12) * PX_TO_PT,
                                },
                              ]}
                            >{`${item?.title}: `}</Text>
                            <Text
                              style={[
                                styles.displayPatient,
                                {
                                  fontWeight: 400,
                                  fontSize:
                                    (printSettings?.page_format
                                      ?.patient_info_font_size ||
                                      printSettings?.page_format?.font_size ||
                                      12) * PX_TO_PT,
                                },
                              ]}
                            >
                              {patientDataShow(item?.id)}
                            </Text>
                          </View>
                        )
                      );
                    })}
                </View>
              </View>
              <View
                style={{
                  marginBottom: PX_TO_PT * 15,
                  backgroundColor: "#171725",
                  height: PX_TO_PT * 1,
                  width: "100%",
                }}
                fixed
              />
            </>
          ) : (
            <>
              <View
                style={{ flexDirection: "row", marginVertical: PX_TO_PT * 15 }}
              >
                <View style={{ flex: 0.7 }}>
                  {printSettings?.header_footer?.patient_info
                    ?.filter((e) => e?.enable === "Y")
                    ?.map((item, i) => {
                      return (
                        i % 2 === 0 && (
                          <View
                            key={i}
                            style={{
                              flexDirection: "row",
                              flexWrap: "wrap",
                              paddingVertical: PX_TO_PT * 3,
                            }}
                          >
                            <Text
                              style={[
                                styles.displayPatient,
                                {
                                  fontWeight: 500,
                                  fontSize:
                                    (printSettings?.page_format
                                      ?.patient_info_font_size ||
                                      printSettings?.page_format?.font_size ||
                                      12) * PX_TO_PT,
                                },
                              ]}
                            >{`${item?.title}: `}</Text>
                            <Text
                              style={[
                                styles.displayPatient,
                                {
                                  fontWeight: 400,
                                  fontSize:
                                    (printSettings?.page_format
                                      ?.patient_info_font_size ||
                                      printSettings?.page_format?.font_size ||
                                      12) * PX_TO_PT,
                                },
                              ]}
                            >
                              {patientDataShow(item?.id)}
                            </Text>
                          </View>
                        )
                      );
                    })}
                </View>
                <View style={{ flex: 0.4 }}>
                  {printSettings?.header_footer?.patient_info
                    ?.filter((e) => e?.enable === "Y")
                    ?.map((item, i) => {
                      return (
                        i % 2 === 1 && (
                          <View
                            key={i}
                            style={{
                              flexDirection: "row",
                              flexWrap: "wrap",
                              paddingVertical: PX_TO_PT * 3,
                            }}
                          >
                            <Text
                              style={[
                                styles.displayPatient,
                                {
                                  fontWeight: 500,
                                  fontSize:
                                    (printSettings?.page_format
                                      ?.patient_info_font_size ||
                                      printSettings?.page_format?.font_size ||
                                      12) * PX_TO_PT,
                                },
                              ]}
                            >{`${item?.title}: `}</Text>
                            <Text
                              style={[
                                styles.displayPatient,
                                {
                                  fontWeight: 400,
                                  fontSize:
                                    (printSettings?.page_format
                                      ?.patient_info_font_size ||
                                      printSettings?.page_format?.font_size ||
                                      12) * PX_TO_PT,
                                },
                              ]}
                            >
                              {patientDataShow(item?.id)}
                            </Text>
                          </View>
                        )
                      );
                    })}
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "#171725",
                  height: PX_TO_PT * 1,
                  width: "100%",
                }}
              />
            </>
          )}

          {/* <View style={{
                        marginTop: (printSettings?.header_footer?.show_patient_info === 'first' ||
                            !printSettings?.header_footer?.show_patient_info) ? PX_TO_PT * 15 : 0
                    }}> */}
          {(() => {
            let hasRenderedPageBreak = false;
            const hasModuleData = (option, caseManagerData) => {
              switch (option.id) {
                case 1:
                  return caseManagerData.symptoms?.length > 0;
                case 2:
                  return caseManagerData.examination?.length > 0;
                case 3:
                  return caseManagerData.diagnosis?.length > 0;
                case 4:
                  return caseManagerData.medicine?.length > 0;
                case 5:
                  return caseManagerData.advice?.length > 0;
                case 6:
                  return caseManagerData.investigation?.length > 0;
                case 7:
                  return (
                    caseManagerData.vitals?.length > 0 ||
                    caseManagerData?.patient_birth_weight
                  );
                case 8:
                  return caseManagerData.medical_history?.length > 0;
                case 9:
                  return caseManagerData.follow_up_date;
                case 91:
                  return caseManagerData.visit_advice;
                case 10:
                  return (
                    transformGivenVaccines?.template?.length > 0 ||
                    dueVaccines?.detail?.length > 0
                  );
                case 11:
                  return caseManagerData?.smart_prescription_filename?.length;
                case 12:
                  return (
                    growthChartDetails?.growthChartImageData &&
                    Object.keys(growthChartDetails?.growthChartImageData)
                      ?.length > 0 &&
                    growthChartDetails?.todayGrowthChartData?.length > 0
                  );
                case 13:
                  return caseManagerData.gynecHistoryData;
                case 14:
                  return obsHistoryData?.length > 0;
                case 15:
                  return labParamsData?.length > 0;
                case 16:
                  return caseManagerData?.zydusSelectedLabParams?.length > 0;
                case 17:
                  return patientBills?.length > 0;
                case 18:
                  return advanceReceipts?.length > 0;
                case 20:
                  return hasOphthalModuleData;
                default:
                  if (option.is_custom_module) {
                    const customModule = caseManagerData?.moduleContents?.find(
                      (e) => e.module_id === option?.id,
                    );
                    if (!customModule?.content?.length) {
                      return false;
                    }

                    // Find module definition to check version
                    const moduleDefinition = Array.isArray(customModules)
                      ? customModules.find(
                          (m) => m.module_id === customModule.module_id,
                        )
                      : null;
                    const isV2 =
                      moduleDefinition?.version === "v2" &&
                      moduleDefinition?.namedFields;

                    if (isV2) {
                      // V2: Check if any named field has content
                      const namedFields = moduleDefinition.namedFields;
                      return customModule.content.some((item) =>
                        namedFields.some(
                          (field) => item[field.fieldName]?.trim?.().length > 0,
                        ),
                      );
                    } else {
                      // V1: Check for title or notes
                      return customModule.content.some(
                        (item) => item?.title || item?.notes,
                      );
                    }
                  }
                  return false;
              }
            };
            const shouldRenderPageBreak = (pageBreakIndex) => {
              for (let i = pageBreakIndex - 1; i >= 0; i--) {
                const prevOption = printSettings?.prescription?.case_option[i];
                if (prevOption?.type === "page_break") {
                  break;
                }
                if (
                  prevOption?.type !== "page_break" &&
                  prevOption?.enable === "Y"
                ) {
                  const hasData = hasModuleData(prevOption, caseManagerData);
                  if (hasData) {
                    return true;
                  }
                }
              }
              return false;
            };

            // Normalize customModules to always be an array
            let normalizedCustomModules = [];
            if (Array.isArray(customModules)) {
              normalizedCustomModules = customModules;
            } else if (customModules && typeof customModules === "object") {
              // Handle case where customModules might be an object with a 'modules' property
              if (Array.isArray(customModules.modules)) {
                normalizedCustomModules = customModules.modules;
              } else if (Array.isArray(customModules.data)) {
                normalizedCustomModules = customModules.data;
              } else {
                // Try to convert object values to array
                normalizedCustomModules = Object.values(customModules).filter(
                  (item) => item && typeof item === "object" && item.module_id,
                );
              }
            }

            // Track rendered modules to prevent duplicates
            const renderedModuleIds = new Set();

            return printSettings?.prescription?.case_option?.map(
              (option, index) => {
                // Try to find custom module by module_id matching option.id
                let customModule = caseManagerData?.moduleContents?.find(
                  (e) => e?.module_id === option?.id,
                );

                // If not found, try to find by module_name matching option.title
                if (
                  !customModule &&
                  option?.is_custom_module &&
                  option?.title
                ) {
                  customModule = caseManagerData?.moduleContents?.find(
                    (e) =>
                      e?.module_name === option?.title ||
                      e?.name === option?.title,
                  );
                }

                if (customModule) {
                  customModule = {
                    ...customModule,
                    module_name:
                      getCustomModuleName(option?.id) ||
                      customModule.module_name ||
                      customModule.name,
                  };
                }

                // Check if this module has already been rendered (prevent duplicates)
                if (
                  option?.is_custom_module === true &&
                  customModule?.module_id
                ) {
                  if (renderedModuleIds.has(customModule.module_id)) {
                    // This module has already been rendered, skip it
                    return null;
                  }
                  // Mark this module as rendered
                  renderedModuleIds.add(customModule.module_id);
                }

                if (option?.type === "page_break") {
                  const isLastPageBreak =
                    index ===
                    printSettings?.prescription?.case_option?.length - 1;
                  if (isLastPageBreak) {
                    return null;
                  }
                  if (hasRenderedPageBreak) {
                    return null;
                  }
                  if (!shouldRenderPageBreak(index)) {
                    return null;
                  }
                  hasRenderedPageBreak = true;
                  return (
                    <View
                      key={option.id}
                      break={true}
                      style={{
                        marginTop: PX_TO_PT * 20,
                        pageBreakBefore: "always",
                      }}
                    ></View>
                  );
                }
                if (option?.type !== "page_break" && option?.enable === "Y") {
                  hasRenderedPageBreak = false;
                }

                // Determine module version and namedFields (computed once for both validation and rendering)
                let moduleIsV2 = false;
                let moduleNamedFields = [];

                if (
                  option?.is_custom_module === true &&
                  customModule?.content &&
                  Array.isArray(customModule.content) &&
                  customModule.content.length > 0
                ) {
                  // Find module definition to check version
                  const moduleDefinition = normalizedCustomModules.find(
                    (m) => m.module_id === customModule.module_id,
                  );

                  // Determine if V2: check module definition first, then fallback to content structure
                  if (
                    moduleDefinition?.version === "v2" &&
                    moduleDefinition?.namedFields
                  ) {
                    // V2 from definition
                    moduleIsV2 = true;
                    moduleNamedFields = moduleDefinition.namedFields;
                  } else if (customModule.module_version === "v2") {
                    // V2 from module_version in content
                    moduleIsV2 = true;
                    // Try to infer namedFields from content structure
                    if (customModule.content.length > 0) {
                      const firstItem = customModule.content[0];
                      moduleNamedFields = Object.keys(firstItem)
                        .filter((key) => key !== "id") // Exclude internal id field
                        .map((key, index) => ({
                          fieldName: key,
                          fieldLabel: key
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase()), // Convert field_1 to Field 1
                          fieldType: "string",
                          order: index,
                        }));
                    }
                  } else if (moduleDefinition?.namedFields) {
                    // Has namedFields but version not explicitly v2
                    moduleIsV2 = true;
                    moduleNamedFields = moduleDefinition.namedFields;
                  } else {
                    // Check content structure: V2 has dynamic fields (not just title/notes)
                    const firstItem = customModule.content[0];
                    if (firstItem && typeof firstItem === "object") {
                      const hasTitleOrNotes =
                        "title" in firstItem || "notes" in firstItem;
                      const hasOtherFields = Object.keys(firstItem).some(
                        (key) =>
                          key !== "id" &&
                          key !== "title" &&
                          key !== "notes" &&
                          key !== "change",
                      );
                      // If it has fields other than title/notes, likely V2
                      if (
                        !hasTitleOrNotes ||
                        (hasOtherFields && Object.keys(firstItem).length > 2)
                      ) {
                        moduleIsV2 = true;
                        moduleNamedFields = Object.keys(firstItem)
                          .filter(
                            (key) =>
                              key !== "id" &&
                              key !== "title" &&
                              key !== "notes" &&
                              key !== "change",
                          )
                          .map((key, index) => ({
                            fieldName: key,
                            fieldLabel: key
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase()),
                            fieldType: "string",
                            order: index,
                          }));
                      }
                    }
                  }
                }

                // Check if this is a custom module and if it has data
                const hasCustomModuleData = (() => {
                  if (option?.is_custom_module !== true) {
                    return false;
                  }

                  if (
                    !customModule?.content ||
                    !Array.isArray(customModule.content) ||
                    customModule.content.length === 0
                  ) {
                    // console.log(`[ViewPDF] hasCustomModuleData: No content for module ${option?.id}`);
                    return false;
                  }

                  // console.log(`[ViewPDF] hasCustomModuleData - Module ID: ${customModule.module_id}, Is V2: ${moduleIsV2}, Named Fields: ${moduleNamedFields.length}`);

                  if (moduleIsV2) {
                    // V2: Check if any named field has content
                    const hasData = customModule.content.some((item) => {
                      const itemHasData = moduleNamedFields.some((field) => {
                        const value = item[field.fieldName];
                        const hasValue =
                          value && typeof value === "string"
                            ? value.trim().length > 0
                            : value != null && value !== "";
                        return hasValue;
                      });
                      return itemHasData;
                    });
                    // console.log(`[ViewPDF] hasCustomModuleData V2 - Has Data: ${hasData}, Content Items: ${customModule.content.length}, Named Fields: ${moduleNamedFields.length}`);
                    return hasData;
                  } else {
                    // V1: Check for title or notes
                    const hasData = customModule.content.some(
                      (item) => item?.title || item?.notes,
                    );
                    // console.log(`[ViewPDF] hasCustomModuleData V1 - Has Data: ${hasData}`);
                    return hasData;
                  }
                })();

                // Store module version info for rendering
                if (customModule) {
                  customModule._isV2 = moduleIsV2;
                  customModule._namedFields = moduleNamedFields;
                }

                // Skip rendering if it's a custom module with no data
                if (option?.is_custom_module === true && !hasCustomModuleData) {
                  // console.log(`[ViewPDF] Skipping custom module ${option?.id} - no data`);
                  return null;
                }

                return (
                  <View
                    key={option.id}
                    style={{
                      marginTop:
                        index === 0
                          ? printSettings?.header_footer?.show_patient_info ===
                              "first" ||
                            !printSettings?.header_footer?.show_patient_info
                            ? PX_TO_PT * 15
                            : 0
                          : 0,
                    }}
                    break={
                      option?.id == module_id &&
                      caseManagerData?.doctor_data?.um_id == um_id
                        ? true
                        : false
                    }
                  >
                    {option?.id === 1 &&
                    option?.enable === "Y" &&
                    option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          caseManagerData?.symptoms?.length > 0 &&
                          (option?.format === "inline" ? (
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  lineHeight: 2,
                                  marginTop: 4,
                                }}
                              >
                                Symptoms:&nbsp;
                              </Text>
                              {caseManagerData?.symptoms?.map((item, i) => {
                                return (
                                  <Text key={i}>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily: getIndianLanguageFont(
                                          item?.symptom_name,
                                          printSettings?.page_format
                                            ?.font_family,
                                        ),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item?.symptom_name}&nbsp;
                                    </Text>
                                    {item?.since ||
                                    item?.severity ||
                                    item?.note ? (
                                      <View>
                                        {/* For since and severity (English content) */}
                                        {(item?.since || item?.severity) && (
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            }}
                                          >
                                            {`(${[
                                              item?.since
                                                ? `since: ${item?.since}`
                                                : null,
                                              item?.severity
                                                ? `severity: ${item?.severity}`
                                                : null,
                                            ]
                                              .filter(Boolean)
                                              .join(
                                                ", ",
                                              )}${(item?.since || item?.severity) && item?.note ? ", " : ""}${!item?.note ? ")" : ""}`}
                                          </Text>
                                        )}

                                        {/* For note (potentially in Indian language) */}
                                        {item?.note && (
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily: getIndianLanguageFont(
                                                item?.note,
                                                printSettings?.page_format
                                                  ?.font_family,
                                              ),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            }}
                                          >
                                            {`${!(item?.since || item?.severity) ? "(" : ""}${item?.note})`}
                                          </Text>
                                        )}
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          }}
                                        >
                                          {caseManagerData?.symptoms?.length -
                                            1 !=
                                          i
                                            ? ","
                                            : ""}
                                          &nbsp;
                                        </Text>
                                      </View>
                                    ) : (
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {caseManagerData?.symptoms?.length -
                                          1 !=
                                        i
                                          ? ","
                                          : ""}
                                        &nbsp;
                                      </Text>
                                    )}
                                  </Text>
                                );
                              })}
                            </Text>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Symptoms:&nbsp;
                              </Text>
                              {caseManagerData?.symptoms?.map((item, i) => {
                                return (
                                  <Text
                                    key={i}
                                    style={{
                                      marginTop: PX_TO_PT * (i == 0 ? 4 : 2),
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      &nbsp;{i + 1}.&nbsp;
                                    </Text>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily: getIndianLanguageFont(
                                          item?.symptom_name,
                                          printSettings?.page_format
                                            ?.font_family,
                                        ),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item?.symptom_name}&nbsp;
                                    </Text>
                                    {(item?.since ||
                                      item?.severity ||
                                      item?.note) && (
                                      <View>
                                        {/* For since and severity (English content) */}
                                        {(item?.since || item?.severity) && (
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            }}
                                          >
                                            {`(${[
                                              item?.since
                                                ? `since: ${item?.since}`
                                                : null,
                                              item?.severity
                                                ? `severity: ${item?.severity}`
                                                : null,
                                            ]
                                              .filter(Boolean)
                                              .join(
                                                ", ",
                                              )}${(item?.since || item?.severity) && item?.note ? ", " : ""}${!item?.note ? ")\n" : ""}`}
                                          </Text>
                                        )}

                                        {/* For note (potentially in Indian language) */}
                                        {item?.note && (
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily: getIndianLanguageFont(
                                                item?.note,
                                              ),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            }}
                                          >
                                            {`${!(item?.since || item?.severity) ? "(" : ""}${item?.note})\n`}
                                          </Text>
                                        )}
                                      </View>
                                    )}
                                  </Text>
                                );
                              })}
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  marginBottom: PX_TO_PT * 6,
                                }}
                              >
                                Symptoms:&nbsp;
                              </Text>
                              <View style={styles.table}>
                                <View style={styles.headerRow} fixed>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    NAME
                                  </Text>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        flex: 0.2,
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    SINCE
                                  </Text>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        flex: 0.2,
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    SEVERITY
                                  </Text>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        flex: 0.5,
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    NOTE
                                  </Text>
                                </View>
                                {caseManagerData?.symptoms?.map((item, i) => (
                                  <View style={styles.row} key={i} wrap={false}>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.symptom_name,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        },
                                      ]}
                                    >
                                      {item?.symptom_name}&nbsp;
                                    </Text>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          flex: 0.2,
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        },
                                      ]}
                                    >
                                      {item?.since ? item?.since : "-"}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          flex: 0.2,
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        },
                                      ]}
                                    >
                                      {item?.severity ? item?.severity : "-"}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          flex: 0.5,
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.note,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        },
                                      ]}
                                    >
                                      {item?.note ? item?.note : "-"}&nbsp;
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            </View>
                          ))}
                      </>
                    ) : option?.id === 2 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          caseManagerData?.examination?.length > 0 &&
                          (option?.format === "inline" ? (
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Examinations:&nbsp;
                              </Text>
                              {caseManagerData?.examination?.map((item, i) => {
                                return (
                                  <Text key={i}>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily: getIndianLanguageFont(
                                          item?.examination_name,
                                          printSettings?.page_format
                                            ?.font_family,
                                        ),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item?.examination_name}&nbsp;
                                    </Text>
                                    {item?.note ? (
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.note,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {`(${Object.values(Object.fromEntries(Object.entries((({ note }) => ({ note }))(caseManagerData?.examination?.[i])).filter(([_, v]) => v))).join(", ")})`}
                                        {caseManagerData?.examination?.length -
                                          1 !=
                                        i
                                          ? ","
                                          : ""}
                                        &nbsp;
                                      </Text>
                                    ) : (
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {caseManagerData?.examination?.length -
                                          1 !=
                                        i
                                          ? ","
                                          : ""}
                                        &nbsp;
                                      </Text>
                                    )}
                                  </Text>
                                );
                              })}
                            </Text>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Examinations:&nbsp;
                              </Text>
                              {caseManagerData?.examination?.map((item, i) => {
                                return (
                                  <Text
                                    key={i}
                                    style={{
                                      marginTop: PX_TO_PT * (i == 0 ? 4 : 2),
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      &nbsp;{i + 1}.&nbsp;
                                    </Text>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily: getIndianLanguageFont(
                                          item?.examination_name,
                                          printSettings?.page_format
                                            ?.font_family,
                                        ),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item?.examination_name}&nbsp;
                                    </Text>
                                    {(item?.since ||
                                      item?.severity ||
                                      item?.note) && (
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.note,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >{`(${Object.values(Object.fromEntries(Object.entries((({ note }) => ({ note }))(caseManagerData?.examination?.[i])).filter(([_, v]) => v))).join(", ")})\n`}</Text>
                                    )}
                                  </Text>
                                );
                              })}
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  marginBottom: PX_TO_PT * 6,
                                }}
                              >
                                Examinations:&nbsp;
                              </Text>
                              <View style={styles.table}>
                                <View style={styles.headerRow} fixed>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    NAME
                                  </Text>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    NOTE
                                  </Text>
                                </View>
                                {caseManagerData?.examination?.map(
                                  (item, i) => (
                                    <View
                                      style={styles.row}
                                      key={i}
                                      wrap={false}
                                    >
                                      <Text
                                        style={[
                                          styles.cell,
                                          {
                                            color: "#171725",
                                            fontFamily: getIndianLanguageFont(
                                              item?.examination_name,
                                              printSettings?.page_format
                                                ?.font_family,
                                            ),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          },
                                        ]}
                                      >
                                        {item?.examination_name}&nbsp;
                                      </Text>
                                      <Text
                                        style={[
                                          styles.cell,
                                          {
                                            color: "#171725",
                                            fontFamily: getIndianLanguageFont(
                                              item?.note,
                                              printSettings?.page_format
                                                ?.font_family,
                                            ),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          },
                                        ]}
                                      >
                                        {item?.note ? item?.note : "-"}&nbsp;
                                      </Text>
                                    </View>
                                  ),
                                )}
                              </View>
                            </View>
                          ))}
                      </>
                    ) : option?.id === 3 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          caseManagerData?.diagnosis?.length > 0 &&
                          (option?.format === "inline" ? (
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Diagnosis:&nbsp;
                              </Text>
                              {caseManagerData?.diagnosis?.map((item, i) => {
                                return (
                                  <Text key={i}>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily: getIndianLanguageFont(
                                          item?.tds_name,
                                          printSettings?.page_format
                                            ?.font_family,
                                        ),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {`${item?.tds_name}${item?.icd_code && option?.show_icd_code !== false ? ` (${item?.icd_code})` : ""}`}
                                      &nbsp;
                                    </Text>
                                    {item?.since ||
                                    item?.status ||
                                    item?.note ? (
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.note,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {`(${Object.values(Object.fromEntries(Object.entries((({ since, status, note }) => ({ since, status, note }))(caseManagerData?.diagnosis?.[i])).filter(([_, v]) => v))).join(", ")})`}
                                        {caseManagerData?.diagnosis?.length -
                                          1 !=
                                        i
                                          ? ","
                                          : ""}
                                        &nbsp;
                                      </Text>
                                    ) : (
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {caseManagerData?.diagnosis?.length -
                                          1 !=
                                        i
                                          ? ","
                                          : ""}
                                        &nbsp;
                                      </Text>
                                    )}
                                  </Text>
                                );
                              })}
                            </Text>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Diagnosis:&nbsp;
                              </Text>
                              {caseManagerData?.diagnosis?.map((item, i) => {
                                return (
                                  <Text
                                    key={i}
                                    style={{
                                      marginTop: PX_TO_PT * 5,
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      &nbsp;{i + 1}.&nbsp;
                                    </Text>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily: getIndianLanguageFont(
                                          item?.tds_name,
                                          printSettings?.page_format
                                            ?.font_family,
                                        ),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {`${item?.tds_name}${item?.icd_code && option?.show_icd_code !== false ? ` (${item?.icd_code})` : ""}`}
                                      &nbsp;
                                    </Text>
                                    {(item?.since ||
                                      item?.severity ||
                                      item?.note) && (
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.note,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >{`(${Object.values(Object.fromEntries(Object.entries((({ since, status, note }) => ({ since, status, note }))(caseManagerData?.diagnosis?.[i])).filter(([_, v]) => v))).join(", ")})\n`}</Text>
                                    )}
                                  </Text>
                                );
                              })}
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  marginBottom: PX_TO_PT * 6,
                                }}
                              >
                                Diagnosis:&nbsp;
                              </Text>
                              <View style={styles.table}>
                                <View style={styles.headerRow} fixed>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    NAME
                                  </Text>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        flex: 0.2,
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    SINCE
                                  </Text>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        flex: 0.2,
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    STATUS
                                  </Text>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        flex: 0.5,
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    NOTE
                                  </Text>
                                </View>
                                {caseManagerData?.diagnosis?.map((item, i) => (
                                  <View style={styles.row} key={i} wrap={false}>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.tds_name,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        },
                                      ]}
                                    >
                                      {`${item?.tds_name}${item?.icd_code && option?.show_icd_code !== false ? ` (${item?.icd_code})` : ""}`}
                                      &nbsp;
                                    </Text>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          flex: 0.2,
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        },
                                      ]}
                                    >
                                      {item?.since ? item?.since : "-"}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          flex: 0.2,
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        },
                                      ]}
                                    >
                                      {item?.status ? item?.status : "-"}
                                    </Text>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          flex: 0.5,
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.note,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        },
                                      ]}
                                    >
                                      {item?.note ? item?.note : "-"}&nbsp;
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            </View>
                          ))}
                      </>
                    ) : option?.id === 4 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" &&
                      !shouldHideMedicationModuleBecauseDentalMedicationShown ? (
                      <>
                        {caseManagerData?.medicine?.length > 0 &&
                          (option?.format === "inline" ? (
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 15,
                                marginBottom: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Medication (Rx):&nbsp;
                              </Text>
                              {medicationData?.map((pItem, i) => {
                                return (
                                  <Text key={i}>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {pItem?.tmm_medicine_name}&nbsp;
                                    </Text>
                                    {innerMedication(pItem?.index)?.map(
                                      (item, ii) => {
                                        return (
                                          <Text key={ii}>
                                            {ii !== 0 && (
                                              <Text
                                                style={{
                                                  color: "#171725",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                }}
                                              >
                                                &nbsp;{"then"}&nbsp;
                                              </Text>
                                            )}
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily: getFont(),
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {`(${Object.values(
                                                Object.fromEntries(
                                                  Object.entries(
                                                    (({
                                                      tmm_generic,
                                                      tmf_block,
                                                      tmm_dosage,
                                                      medicineUnit,
                                                      tmm_unit,
                                                      tcm_tmm_freq_morning,
                                                      tcm_tmm_freq_afternoon,
                                                      tcm_tmm_freq_evening,
                                                      tcm_tmm_freq_night,
                                                      tmm_freq_type,
                                                      tmm_time,
                                                      tmm_days,
                                                      tmm_duration_type,
                                                      display_qty,
                                                      tmm_remarks,
                                                      default_tmm_unit,
                                                    }) => ({
                                                      modiGeneric:
                                                        option?.medicine_with_generic &&
                                                        ii === 0
                                                          ? tmm_generic
                                                          : "",

                                                      modiUnitPerDose:
                                                        option?.medicine_option?.includes(
                                                          "dose",
                                                        )
                                                          ? tmm_dosage &&
                                                            tmm_unit
                                                            ? `${formatUnitPerDose(tmm_dosage, option?.is_dosage_decimal)} ${medicineUnit && medicineUnit?.find((x) => x?.tmu_id == tmm_unit) !== undefined ? medicineUnit?.find((x) => x?.tmu_id == tmm_unit)?.tmu_title : ""}`
                                                            : `${medicineUnit && medicineUnit?.find((x) => x?.tmu_id == default_tmm_unit) !== undefined ? medicineUnit?.find((x) => x?.tmu_id == default_tmm_unit)?.tmu_title : ""}`
                                                          : "",

                                                      modiFrequency:
                                                        option?.medicine_option?.includes(
                                                          "frequency",
                                                        )
                                                          ? tmf_block === 0 ||
                                                            tmf_block === ""
                                                            ? `${tcm_tmm_freq_morning || tcm_tmm_freq_afternoon || tcm_tmm_freq_evening || tcm_tmm_freq_night ? (option?.numeric_frequency ? `${tcm_tmm_freq_morning ? medicine_freq_dosage_format(tcm_tmm_freq_morning, option?.is_dosage_decimal) : 0} - ${tcm_tmm_freq_afternoon ? medicine_freq_dosage_format(tcm_tmm_freq_afternoon, option?.is_dosage_decimal) : 0}${tcm_tmm_freq_evening ? " - " + medicine_freq_dosage_format(tcm_tmm_freq_evening, option?.is_dosage_decimal) : ""} - ${tcm_tmm_freq_night ? medicine_freq_dosage_format(tcm_tmm_freq_night, option?.is_dosage_decimal) : 0}` : formatFrequency(tcm_tmm_freq_morning, tcm_tmm_freq_afternoon, tcm_tmm_freq_evening, tcm_tmm_freq_night, option?.is_dosage_decimal)) : ``}`
                                                            : `(${frequencyList?.find((x) => x?.tmf_id === tmm_freq_type) !== undefined ? frequencyList?.find((x) => x?.tmf_id === tmm_freq_type)?.[frequencyLang()] : ""})`
                                                          : "",

                                                      modiTiming:
                                                        timingList?.find(
                                                          (x) =>
                                                            x?.tmt_id ===
                                                            tmm_time,
                                                        ) !== undefined &&
                                                        timingList?.find(
                                                          (x) =>
                                                            x?.tmt_id ===
                                                            tmm_time,
                                                        )?.tmt_title !== "None"
                                                          ? timingList?.find(
                                                              (x) =>
                                                                x?.tmt_id ===
                                                                tmm_time,
                                                            )?.[timeingLang()]
                                                          : "",

                                                      modiDuration:
                                                        option?.medicine_option?.includes(
                                                          "duration",
                                                        )
                                                          ? EXTRA_OPTIONS.some(
                                                              (x) =>
                                                                x?.value ==
                                                                tmm_duration_type,
                                                            )
                                                            ? durationLang(
                                                                capitalize(
                                                                  tmm_duration_type,
                                                                  true,
                                                                ),
                                                              )
                                                            : isNumeric(
                                                                  tmm_days,
                                                                )
                                                              ? `${tmm_days} ${durationLang(tmm_duration_type)}`
                                                              : "-"
                                                          : "",

                                                      // modiDisplayQty: display_qty ? display_qty.toFixed(2).replace(/\.00$/, '') : '',
                                                      modiDisplayQty:
                                                        option?.medicine_option?.includes(
                                                          "quantity",
                                                        )
                                                          ? display_qty
                                                            ? `${display_qty} qty`
                                                            : ""
                                                          : "",

                                                      modiRemarks:
                                                        option?.medicine_option?.includes(
                                                          "note",
                                                        )
                                                          ? tmm_remarks
                                                          : "",
                                                    }))(item),
                                                  ).filter(([_, v]) => v),
                                                ),
                                              ).join(", ")})`}
                                              {innerMedication(pItem?.index)
                                                ?.length -
                                                1 ===
                                                ii &&
                                              medicationData?.length - 1 != i
                                                ? ","
                                                : ""}
                                              &nbsp;
                                            </Text>
                                          </Text>
                                        );
                                      },
                                    )}
                                  </Text>
                                );
                              })}
                            </Text>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Medication (Rx):&nbsp;
                              </Text>
                              {medicationData?.map((pItem, i) => {
                                return (
                                  <Text
                                    key={i}
                                    style={{
                                      marginTop: PX_TO_PT * 5,
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      &nbsp;{i + 1}.&nbsp;
                                    </Text>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {pItem?.tmm_medicine_name}&nbsp;
                                    </Text>
                                    {innerMedication(pItem?.index)?.map(
                                      (item, ii) => {
                                        return (
                                          <Text key={ii}>
                                            {ii !== 0 && (
                                              <Text
                                                style={{
                                                  color: "#171725",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                }}
                                              >
                                                &nbsp;{"then"}&nbsp;
                                              </Text>
                                            )}
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily: getFont(),
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {`(${Object.values(
                                                Object.fromEntries(
                                                  Object.entries(
                                                    (({
                                                      tmm_generic,
                                                      tmf_block,
                                                      tmm_dosage,
                                                      medicineUnit,
                                                      tmm_unit,
                                                      tcm_tmm_freq_morning,
                                                      tcm_tmm_freq_afternoon,
                                                      tcm_tmm_freq_evening,
                                                      tcm_tmm_freq_night,
                                                      tmm_freq_type,
                                                      tmm_time,
                                                      tmm_days,
                                                      tmm_duration_type,
                                                      display_qty,
                                                      tmm_remarks,
                                                      default_tmm_unit,
                                                    }) => ({
                                                      modiGeneric:
                                                        option?.medicine_with_generic &&
                                                        ii === 0
                                                          ? tmm_generic
                                                          : "",

                                                      modiUnitPerDose:
                                                        option?.medicine_option?.includes(
                                                          "dose",
                                                        )
                                                          ? tmm_dosage &&
                                                            tmm_unit
                                                            ? `${formatUnitPerDose(tmm_dosage, option?.is_dosage_decimal)} ${medicineUnit && medicineUnit?.find((x) => x?.tmu_id == tmm_unit) !== undefined ? medicineUnit?.find((x) => x?.tmu_id == tmm_unit)?.tmu_title : ""}`
                                                            : `${medicineUnit && medicineUnit?.find((x) => x?.tmu_id == default_tmm_unit) !== undefined ? medicineUnit?.find((x) => x?.tmu_id == default_tmm_unit)?.tmu_title : ""}`
                                                          : "",

                                                      modiFrequency:
                                                        option?.medicine_option?.includes(
                                                          "frequency",
                                                        )
                                                          ? tmf_block === 0 ||
                                                            tmf_block === ""
                                                            ? `${tcm_tmm_freq_morning || tcm_tmm_freq_afternoon || tcm_tmm_freq_evening || tcm_tmm_freq_night ? (option?.numeric_frequency ? `${tcm_tmm_freq_morning ? medicine_freq_dosage_format(tcm_tmm_freq_morning, option?.is_dosage_decimal) : 0} - ${tcm_tmm_freq_afternoon ? medicine_freq_dosage_format(tcm_tmm_freq_afternoon, option?.is_dosage_decimal) : 0}${tcm_tmm_freq_evening ? " - " + medicine_freq_dosage_format(tcm_tmm_freq_evening, option?.is_dosage_decimal) : ""} - ${tcm_tmm_freq_night ? medicine_freq_dosage_format(tcm_tmm_freq_night, option?.is_dosage_decimal) : 0}` : formatFrequency(tcm_tmm_freq_morning, tcm_tmm_freq_afternoon, tcm_tmm_freq_evening, tcm_tmm_freq_night, option?.is_dosage_decimal)) : ``}`
                                                            : `(${frequencyList?.find((x) => x?.tmf_id === tmm_freq_type) !== undefined ? frequencyList?.find((x) => x?.tmf_id === tmm_freq_type)?.[frequencyLang()] : ""})`
                                                          : "",

                                                      modiTiming:
                                                        timingList?.find(
                                                          (x) =>
                                                            x?.tmt_id ===
                                                            tmm_time,
                                                        ) !== undefined &&
                                                        timingList?.find(
                                                          (x) =>
                                                            x?.tmt_id ===
                                                            tmm_time,
                                                        )?.tmt_title !== "None"
                                                          ? timingList?.find(
                                                              (x) =>
                                                                x?.tmt_id ===
                                                                tmm_time,
                                                            )?.[timeingLang()]
                                                          : "",

                                                      modiDuration:
                                                        option?.medicine_option?.includes(
                                                          "duration",
                                                        )
                                                          ? EXTRA_OPTIONS.some(
                                                              (x) =>
                                                                x?.value ==
                                                                tmm_duration_type,
                                                            )
                                                            ? durationLang(
                                                                capitalize(
                                                                  tmm_duration_type,
                                                                  true,
                                                                ),
                                                              )
                                                            : isNumeric(
                                                                  tmm_days,
                                                                )
                                                              ? `${tmm_days} ${durationLang(tmm_duration_type)}`
                                                              : "-"
                                                          : "",
                                                      // modiDisplayQty: display_qty ? display_qty.toFixed(2).replace(/\.00$/, '') : '',
                                                      modiDisplayQty:
                                                        option?.medicine_option?.includes(
                                                          "quantity",
                                                        )
                                                          ? display_qty
                                                            ? `${display_qty} qty`
                                                            : ""
                                                          : "",

                                                      modiRemarks:
                                                        option?.medicine_option?.includes(
                                                          "note",
                                                        )
                                                          ? tmm_remarks
                                                          : "",
                                                    }))(item),
                                                  ).filter(([_, v]) => v),
                                                ),
                                              ).join(
                                                ", ",
                                              )})${ii === innerMedication(pItem?.index)?.length - 1 ? "\n" : ""}`}
                                            </Text>
                                          </Text>
                                        );
                                      },
                                    )}
                                  </Text>
                                );
                              })}
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  marginBottom: PX_TO_PT * 6,
                                }}
                              >
                                Medication (Rx):&nbsp;
                              </Text>
                              <View style={styles.table}>
                                <View style={styles.headerRow} fixed>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        flex: 0.18,
                                        fontFamily: getFont(),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    {medicineHeaderLang("S.NO")}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily: getFont(),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    {medicineHeaderLang("MEDICINE")}
                                  </Text>
                                  <View
                                    style={{
                                      flex:
                                        option?.medicine_option?.length === 0
                                          ? 0.25
                                          : option?.medicine_option?.length ===
                                              1
                                            ? 0.8
                                            : option?.medicine_option
                                                  ?.length === 2
                                              ? 1.2
                                              : option?.medicine_option
                                                    ?.length === 3
                                                ? 1.4
                                                : 2.4,
                                    }}
                                  >
                                    <View
                                      style={{
                                        flexGrow: 1,
                                        flexDirection: "row",
                                      }}
                                    >
                                      {option?.medicine_option?.includes(
                                        "dose",
                                      ) && (
                                        <Text
                                          style={[
                                            styles.headerCell,
                                            {
                                              flex: 0.45,
                                              fontFamily: getFont(),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                              color: "#000",
                                            },
                                          ]}
                                        >
                                          {medicineHeaderLang("DOSE")}
                                        </Text>
                                      )}
                                      {option?.medicine_option?.includes(
                                        "frequency",
                                      ) && (
                                        <Text
                                          style={[
                                            styles.headerCell,
                                            {
                                              flex: 0.6,
                                              fontFamily: getFont(),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                              color: "#000",
                                            },
                                          ]}
                                        >
                                          {medicineHeaderLang("FREQUENCY")}
                                        </Text>
                                      )}
                                      {option?.medicine_option?.includes(
                                        "duration",
                                      ) && (
                                        <Text
                                          style={[
                                            styles.headerCell,
                                            {
                                              flex: 0.53,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                              color: "#000",
                                              fontFamily: getFont(),
                                            },
                                          ]}
                                        >
                                          {medicineHeaderLang("DURATION")}
                                        </Text>
                                      )}
                                      {option?.medicine_option?.includes(
                                        "quantity",
                                      ) && (
                                        <Text
                                          style={[
                                            styles.headerCell,
                                            {
                                              flex: 0.18,
                                              fontFamily: getFont(),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                              color: "#000",
                                            },
                                          ]}
                                        >
                                          {medicineHeaderLang("QTY")}
                                        </Text>
                                      )}
                                      {option?.medicine_option?.includes(
                                        "note",
                                      ) && (
                                        <Text
                                          style={[
                                            styles.headerCell,
                                            {
                                              flex: 0.7,
                                              fontFamily: getFont(),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                              color: "#000",
                                            },
                                          ]}
                                        >
                                          {medicineHeaderLang("NOTES")}
                                        </Text>
                                      )}
                                    </View>
                                  </View>
                                </View>
                                {medicationData?.map((pItem, i) => (
                                  <View style={styles.row} key={i} wrap={false}>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          flex: 0.18,
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        },
                                      ]}
                                    >
                                      {i + 1}
                                    </Text>
                                    <View style={styles.cell}>
                                      <Text
                                        style={[
                                          {
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          },
                                        ]}
                                      >
                                        {pItem?.tmm_medicine_name}
                                      </Text>
                                      {option?.medicine_with_generic && (
                                        <Text
                                          style={[
                                            {
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size -
                                                2,
                                              fontWeight: 400,
                                            },
                                          ]}
                                        >
                                          {pItem?.tmm_generic}
                                        </Text>
                                      )}
                                    </View>
                                    <View
                                      style={{
                                        flex:
                                          option?.medicine_option?.length === 0
                                            ? 0.25
                                            : option?.medicine_option
                                                  ?.length === 1
                                              ? 0.8
                                              : option?.medicine_option
                                                    ?.length === 2
                                                ? 1.2
                                                : option?.medicine_option
                                                      ?.length === 3
                                                  ? 1.4
                                                  : 2.4,
                                      }}
                                    >
                                      {innerMedication(pItem?.index)?.map(
                                        (item, ii) => {
                                          const isTapered =
                                            innerMedication(pItem.index)
                                              ?.length > 1;
                                          const isLastItem =
                                            ii ===
                                            innerMedication(pItem.index)
                                              ?.length -
                                              1;
                                          return (
                                            <View
                                              style={{
                                                flexGrow: 1,
                                                flexDirection: "row",
                                                borderBottom:
                                                  ii !=
                                                  innerMedication(pItem?.index)
                                                    ?.length -
                                                    1
                                                    ? "1px solid #171725"
                                                    : "0px",
                                              }}
                                              key={ii}
                                            >
                                              {option?.medicine_option?.length && isTapered && !isLastItem && (
                                                <ThenConnector printSettings={printSettings} />
                                              )}
                                              {option?.medicine_option?.includes(
                                                "dose",
                                              ) && (
                                                  <Text
                                                    style={[
                                                      styles.cell,
                                                      {
                                                        flex: 0.45,
                                                        color: "#171725",
                                                        fontFamily:
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_family,
                                                        fontSize:
                                                          PX_TO_PT *
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_size,
                                                        fontWeight: 500,
                                                      },
                                                    ]}
                                                  >{`${item?.tmm_dosage && item?.tmm_unit ? `${formatUnitPerDose(item?.tmm_dosage, option?.is_dosage_decimal)} ${item?.medicineUnit && item?.medicineUnit?.find((x) => x?.tmu_id == item?.tmm_unit) !== undefined ? item?.medicineUnit?.find((x) => x?.tmu_id == item?.tmm_unit)?.tmu_title : ""}` : `${item?.medicineUnit && item?.medicineUnit?.find((x) => x?.tmu_id == item?.default_tmm_unit) !== undefined ? item?.medicineUnit?.find((x) => x?.tmu_id == item?.default_tmm_unit)?.tmu_title : ""}`}`}</Text>
                                              )}
                                              {option?.medicine_option?.includes(
                                                "frequency",
                                              ) && (
                                                <Text
                                                  style={[
                                                    styles.cell,
                                                    {
                                                      flex: 0.6,
                                                      color: "#171725",
                                                      fontFamily: getFont(),
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 400,
                                                    },
                                                  ]}
                                                >
                                                  {item?.tmf_block === 0 ||
                                                  item?.tmf_block === ""
                                                    ? `${item?.tcm_tmm_freq_morning || item?.tcm_tmm_freq_afternoon || item?.tcm_tmm_freq_evening || item?.tcm_tmm_freq_night ? (option?.numeric_frequency ? `${item?.tcm_tmm_freq_morning ? medicine_freq_dosage_format(item?.tcm_tmm_freq_morning, option?.is_dosage_decimal) : 0} - ${item?.tcm_tmm_freq_afternoon ? medicine_freq_dosage_format(item?.tcm_tmm_freq_afternoon, option?.is_dosage_decimal) : 0}${item?.tcm_tmm_freq_evening ? " - " + medicine_freq_dosage_format(item?.tcm_tmm_freq_evening, option?.is_dosage_decimal) : ""} - ${item?.tcm_tmm_freq_night ? medicine_freq_dosage_format(item?.tcm_tmm_freq_night, option?.is_dosage_decimal) : 0}` : formatFrequency(item?.tcm_tmm_freq_morning, item?.tcm_tmm_freq_afternoon, item?.tcm_tmm_freq_evening, item?.tcm_tmm_freq_night, option?.is_dosage_decimal)) : `-`}`
                                                    : `(${frequencyList?.find((x) => x?.tmf_id === item?.tmm_freq_type) !== undefined ? frequencyList?.find((x) => x?.tmf_id === item?.tmm_freq_type)?.[frequencyLang()] : ""})`}
                                                  {"\n"}
                                                  {timingList?.find(
                                                    (x) =>
                                                      x?.tmt_id ===
                                                      item?.tmm_time,
                                                  ) !== undefined &&
                                                  timingList?.find(
                                                    (x) =>
                                                      x?.tmt_id ===
                                                      item?.tmm_time,
                                                  )?.tmt_title !== "None"
                                                    ? timingList?.find(
                                                        (x) =>
                                                          x?.tmt_id ===
                                                          item?.tmm_time,
                                                      )?.[timeingLang()]
                                                    : ""}
                                                </Text>
                                              )}
                                              {option?.medicine_option?.includes(
                                                "duration",
                                              ) && (
                                                <Text
                                                  style={[
                                                    styles.cell,
                                                    {
                                                      flex: 0.53,
                                                      color: "#171725",
                                                      fontFamily: getFont(),
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 400,
                                                    },
                                                  ]}
                                                >
                                                  {EXTRA_OPTIONS.some(
                                                    (x) =>
                                                      x?.value ==
                                                      item?.tmm_duration_type,
                                                  )
                                                    ? durationLang(
                                                        capitalize(
                                                          item?.tmm_duration_type,
                                                          true,
                                                        ),
                                                      )
                                                    : isNumeric(item?.tmm_days)
                                                      ? `${item?.tmm_days} ${durationLang(item?.tmm_duration_type)}`
                                                      : "-"}
                                                </Text>
                                              )}
                                              {option?.medicine_option?.includes(
                                                "quantity",
                                              ) && (
                                                <Text
                                                  style={[
                                                    styles.cell,
                                                    {
                                                      flex: 0.18,
                                                      color: "#171725",
                                                      fontFamily:
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_family,
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 400,
                                                    },
                                                  ]}
                                                >
                                                  {item?.display_qty
                                                    ? item?.display_qty
                                                    : "-"}
                                                </Text>
                                              )}
                                              {option?.medicine_option?.includes(
                                                "note",
                                              ) && (
                                                <Text
                                                  style={[
                                                    styles.cell,
                                                    {
                                                      flex: 0.7,
                                                      color: "#171725",
                                                      fontFamily:
                                                        getIndianLanguageFont(
                                                          item?.tmm_remarks,
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_family,
                                                        ),
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 400,
                                                    },
                                                  ]}
                                                >
                                                  {item?.tmm_remarks
                                                    ? item?.tmm_remarks
                                                    : "-"}
                                                  &nbsp;
                                                </Text>
                                              )}
                                            </View>
                                          );
                                        },
                                      )}
                                    </View>
                                  </View>
                                ))}
                              </View>
                            </View>
                          ))}
                      </>
                    ) : option?.id === 5 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          caseManagerData?.advice?.length > 0 &&
                          (option?.format === "inline" ? (
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Advices:&nbsp;
                              </Text>
                              {caseManagerData?.advice?.map((item, i) => {
                                return (
                                  <Text key={i}>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily: getIndianLanguageFont(
                                          item?.advice_name,
                                          printSettings?.page_format
                                            ?.font_family,
                                        ),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 400,
                                      }}
                                    >
                                      {item?.advice_name}
                                    </Text>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 400,
                                      }}
                                    >
                                      {caseManagerData?.advice?.length - 1 != i
                                        ? ","
                                        : ""}
                                      &nbsp;
                                    </Text>
                                  </Text>
                                );
                              })}
                            </Text>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Advices:&nbsp;
                              </Text>
                              {caseManagerData?.advice?.map((item, i) => {
                                return (
                                  <Text
                                    key={i}
                                    style={{
                                      marginTop: PX_TO_PT * (i == 0 ? 4 : 2),
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      &nbsp;{i + 1}.&nbsp;
                                    </Text>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily: getIndianLanguageFont(
                                          item?.advice_name,
                                          printSettings?.page_format
                                            ?.font_family,
                                        ),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 400,
                                      }}
                                    >
                                      {item?.advice_name}
                                    </Text>
                                  </Text>
                                );
                              })}
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  marginBottom: PX_TO_PT * 6,
                                }}
                              >
                                Advices:&nbsp;
                              </Text>
                              <View style={styles.table}>
                                <View style={styles.headerRow} fixed>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    NAME
                                  </Text>
                                </View>
                                {caseManagerData?.advice?.map((item, i) => (
                                  <View style={styles.row} key={i} wrap={false}>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.advice_name,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        },
                                      ]}
                                    >
                                      {item?.advice_name}&nbsp;
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            </View>
                          ))}
                      </>
                    ) : option?.id === 6 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          caseManagerData?.investigation?.length > 0 &&
                          caseManagerData?.investigation?.some(
                            (item) => item?.investigation_name,
                          ) &&
                          (option?.format === "inline" ? (
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                {INVESTIGATION_TITLE}:&nbsp;
                              </Text>
                              {caseManagerData?.investigation?.map(
                                (item, i) => {
                                  return (
                                    <Text key={i}>
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.investigation_name,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        }}
                                      >
                                        {item?.investigation_name}&nbsp;
                                      </Text>
                                      {item?.note ? (
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily: getIndianLanguageFont(
                                              item?.note,
                                              printSettings?.page_format
                                                ?.font_family,
                                            ),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          }}
                                        >
                                          {`(${Object.values(Object.fromEntries(Object.entries((({ note }) => ({ note }))(caseManagerData?.investigation?.[i])).filter(([_, v]) => v))).join(", ")})`}
                                          {caseManagerData?.investigation
                                            ?.length -
                                            1 !=
                                          i
                                            ? ","
                                            : ""}
                                          &nbsp;
                                        </Text>
                                      ) : (
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          }}
                                        >
                                          {caseManagerData?.investigation
                                            ?.length -
                                            1 !=
                                          i
                                            ? ","
                                            : ""}
                                          &nbsp;
                                        </Text>
                                      )}
                                    </Text>
                                  );
                                },
                              )}
                            </Text>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                {INVESTIGATION_TITLE}:&nbsp;
                              </Text>
                              {caseManagerData?.investigation?.map(
                                (item, i) => {
                                  return (
                                    <Text
                                      key={i}
                                      style={{
                                        marginTop: PX_TO_PT * (i == 0 ? 4 : 2),
                                        lineHeight: 1.4,
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        }}
                                      >
                                        &nbsp;{i + 1}.&nbsp;
                                      </Text>
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.investigation_name,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        }}
                                      >
                                        {item?.investigation_name}&nbsp;
                                      </Text>
                                      {(item?.since ||
                                        item?.severity ||
                                        item?.note) && (
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily: getIndianLanguageFont(
                                              item?.note,
                                              printSettings?.page_format
                                                ?.font_family,
                                            ),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          }}
                                        >{`(${Object.values(Object.fromEntries(Object.entries((({ note }) => ({ note }))(caseManagerData?.investigation?.[i])).filter(([_, v]) => v))).join(", ")})\n`}</Text>
                                      )}
                                    </Text>
                                  );
                                },
                              )}
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  marginBottom: PX_TO_PT * 6,
                                }}
                              >
                                {INVESTIGATION_TITLE}:&nbsp;
                              </Text>
                              <View style={styles.table}>
                                <View style={styles.headerRow} fixed>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    NAME
                                  </Text>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    NOTE
                                  </Text>
                                </View>
                                {caseManagerData?.investigation?.map(
                                  (item, i) => (
                                    <View
                                      style={styles.row}
                                      key={i}
                                      wrap={false}
                                    >
                                      <Text
                                        style={[
                                          styles.cell,
                                          {
                                            color: "#171725",
                                            fontFamily: getIndianLanguageFont(
                                              item?.investigation_name,
                                              printSettings?.page_format
                                                ?.font_family,
                                            ),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          },
                                        ]}
                                      >
                                        {item?.investigation_name}&nbsp;
                                      </Text>
                                      <Text
                                        style={[
                                          styles.cell,
                                          {
                                            color: "#171725",
                                            fontFamily: getIndianLanguageFont(
                                              item?.note,
                                              printSettings?.page_format
                                                ?.font_family,
                                            ),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          },
                                        ]}
                                      >
                                        {item?.note ? item?.note : "-"}&nbsp;
                                      </Text>
                                    </View>
                                  ),
                                )}
                              </View>
                            </View>
                          ))}
                      </>
                    ) : option?.id === 7 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          (caseManagerData?.vitals?.length > 0 ||
                            patientBirthWeight) &&
                          (option?.format === "inline" ? (
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Vitals & Body Composition:&nbsp;
                              </Text>

                              {!rx && patientBirthWeight && (
                                <>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Patient's birth weight:&nbsp;
                                  </Text>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 400,
                                    }}
                                  >
                                    ({patientBirthWeight}kg)
                                  </Text>
                                  {caseManagerData?.vitals?.length > 0 && (
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 400,
                                      }}
                                    >
                                      ,&nbsp;
                                    </Text>
                                  )}
                                </>
                              )}

                              {caseManagerData.vitals.length > 0 &&
                                caseManagerData.vitals.map((item, i) => {
                                  const vitalsArray = [
                                    [
                                      "temp",
                                      item.temp ? `Temp: ${item.temp}F` : "",
                                    ],
                                    [
                                      "pres",
                                      item.pres
                                        ? `Pulse: ${item.pres}/min`
                                        : "",
                                    ],
                                    [
                                      "resp_rate",
                                      item.resp_rate
                                        ? `Resp. Rate: ${item.resp_rate}/min`
                                        : "",
                                    ],
                                    [
                                      "blood_press",
                                      item.blood_press
                                        ? item.blood_press.endsWith("/")
                                          ? `BP: ${item.blood_press.substring(0, item.blood_press.length - 1)}mmHg`
                                          : `BP: ${item.blood_press}mmHg`
                                        : "",
                                    ],
                                    [
                                      "spo2",
                                      item.spo2 ? `SPO2: ${item.spo2}%` : "",
                                    ],
                                    [
                                      "general_rbs",
                                      item.general_rbs
                                        ? `General RBS: ${item.general_rbs}mg/dl`
                                        : "",
                                    ],
                                    [
                                      "fib4",
                                      item.fib4 ? `FIB4: ${item.fib4}` : "",
                                    ],
                                    [
                                      "waist_circumference",
                                      item.waist_circumference
                                        ? `Waist Circumference: ${item.waist_circumference}cms`
                                        : "",
                                    ],
                                    [
                                      "ofc",
                                      item.ofc ? `OFC: ${item.ofc}cms` : "",
                                    ],
                                    [
                                      "height",
                                      item.height
                                        ? `Height: ${item.height}cms`
                                        : "",
                                    ],
                                    [
                                      "weight",
                                      item.weight
                                        ? `Weight: ${item.weight}kgs`
                                        : "",
                                    ],
                                    [
                                      "bmi",
                                      item.bmi &&
                                      (option?.vitals_option === undefined ||
                                        option?.vitals_option?.includes("bmi"))
                                        ? `BMI: ${parseFloat(item.bmi).toFixed(2)}kg/m²`
                                        : "",
                                    ],
                                    [
                                      "bmr",
                                      item.bmr &&
                                      (option?.vitals_option === undefined ||
                                        option?.vitals_option?.includes("bmr"))
                                        ? `BMR: ${parseFloat(item.bmr).toFixed(2)}kcals`
                                        : "",
                                    ],
                                    [
                                      "bsa",
                                      item.bsa &&
                                      (option?.vitals_option === undefined ||
                                        option?.vitals_option?.includes("bsa"))
                                        ? `BSA: ${parseFloat(item.bsa).toFixed(2)}m²`
                                        : "",
                                    ],
                                  ];
                                  const priorityOrder = [
                                    "weight",
                                    "height",
                                    "ofc",
                                  ];
                                  const orderedVitals = isPediatricAccessable
                                    ? [
                                        ...priorityOrder
                                          .map((key) =>
                                            vitalsArray.find(
                                              ([k]) => k === key,
                                            ),
                                          )
                                          .filter(Boolean),
                                        ...vitalsArray.filter(
                                          ([key]) =>
                                            !priorityOrder.includes(key),
                                        ),
                                      ]
                                    : vitalsArray;
                                  const vitalsText = orderedVitals
                                    .map(([, value]) => value)
                                    .filter(Boolean)
                                    .join(", ");
                                  return (
                                    <Text key={i}>
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        }}
                                      >
                                        {moment(item.date).format("DD/MM/YYYY")}
                                        &nbsp;
                                      </Text>
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {`- ${vitalsText}`}
                                        {caseManagerData.vitals.length - 1 != i
                                          ? ","
                                          : ""}
                                        &nbsp;
                                      </Text>
                                    </Text>
                                  );
                                })}
                            </Text>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Vitals & Body Composition:&nbsp;
                                {!rx && patientBirthWeight && (
                                  <>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      Patient's birth weight:&nbsp;
                                    </Text>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 400,
                                      }}
                                    >
                                      ({patientBirthWeight}kg)
                                    </Text>
                                  </>
                                )}
                              </Text>

                              {caseManagerData.vitals.length > 0 &&
                                caseManagerData.vitals.map((item, i) => {
                                  const vitalsEntries = Object.entries(
                                    (({
                                      temp,
                                      pres,
                                      resp_rate,
                                      blood_press,
                                      spo2,
                                      height,
                                      weight,
                                      fib4,
                                      waist_circumference,
                                      bmi,
                                      bmr,
                                      bsa,
                                      ofc,
                                      general_rbs,
                                    }) => ({
                                      temp: temp ? `Temp: ${temp}F` : "",
                                      pres: pres ? `Pulse: ${pres}/min` : "",
                                      resp_rate: resp_rate
                                        ? `Resp. Rate: ${resp_rate}/min`
                                        : "",
                                      blood_press: blood_press
                                        ? blood_press.endsWith("/")
                                          ? `BP: ${blood_press?.substring(0, blood_press.length - 1)}mmHg`
                                          : `BP: ${blood_press}mmHg`
                                        : "",
                                      spo2: spo2 ? `SPO2: ${spo2}%` : "",
                                      general_rbs: general_rbs
                                        ? `General RBS: ${general_rbs}mg/dl`
                                        : "",
                                      fib4: fib4 ? `FIB4: ${fib4}` : "",
                                      waist_circumference: waist_circumference
                                        ? `Waist Circumference : ${waist_circumference}cms`
                                        : "",
                                      ofc: ofc ? `OFC: ${ofc}cms` : "",
                                      height: height
                                        ? `Height: ${height}cms`
                                        : "",
                                      weight: weight
                                        ? `Weight: ${weight}kgs`
                                        : "",
                                      bmi:
                                        bmi &&
                                        (option?.vitals_option === undefined ||
                                          option?.vitals_option?.includes(
                                            "bmi",
                                          ))
                                          ? `BMI: ${parseFloat(bmi).toFixed(2)}kg/m²`
                                          : "",
                                      bmr:
                                        bmr &&
                                        (option?.vitals_option === undefined ||
                                          option?.vitals_option?.includes(
                                            "bmr",
                                          ))
                                          ? `BMR: ${parseFloat(bmr).toFixed(2)}kcals`
                                          : "",
                                      bsa:
                                        bsa &&
                                        (option?.vitals_option === undefined ||
                                          option?.vitals_option?.includes(
                                            "bsa",
                                          ))
                                          ? `BSA: ${parseFloat(bsa).toFixed(2)}m²`
                                          : "",
                                    }))(item),
                                  ).filter(([_, value]) => value);

                                  const priorityKeys = [
                                    "weight",
                                    "height",
                                    "ofc",
                                  ];
                                  const orderedEntries = isPediatricAccessable
                                    ? [
                                        ...priorityKeys
                                          .map((key) =>
                                            vitalsEntries.find(
                                              ([k]) => k === key,
                                            ),
                                          )
                                          .filter(Boolean),
                                        ...vitalsEntries.filter(
                                          ([key]) =>
                                            !priorityKeys.includes(key),
                                        ),
                                      ]
                                    : vitalsEntries;

                                  const vitalsText = orderedEntries
                                    .map(([, value]) => value)
                                    .join(", ");

                                  return (
                                    <Text
                                      key={i}
                                      style={{
                                        marginTop: PX_TO_PT * (i == 0 ? 4 : 2),
                                        lineHeight: 1.4,
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        }}
                                      >
                                        &nbsp;{i + 1}.&nbsp;
                                      </Text>
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        }}
                                      >
                                        {moment(item.date).format("DD/MM/YYYY")}
                                        &nbsp;
                                      </Text>
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {`- ${vitalsText}\n`}
                                      </Text>
                                    </Text>
                                  );
                                })}
                            </View>
                          ) : (
                            (() => {
                              // Check if there's any data to show
                              const hasVitalsData =
                                caseManagerData?.vitals?.length > 0 &&
                                initialRows?.some((item) => {
                                  const requiredNames = [
                                    "BMI (kg/m²)",
                                    "BMR (kcals)",
                                    "BSA (m²)",
                                  ];
                                  if (requiredNames.includes(item?.name)) {
                                    const nameToVitalsKey = {
                                      "BMI (kg/m²)": "bmi",
                                      "BMR (kcals)": "bmr",
                                      "BSA (m²)": "bsa",
                                    };
                                    const vitalsKey =
                                      nameToVitalsKey[item?.name];
                                    if (
                                      option?.vitals_option !== undefined &&
                                      (!vitalsKey ||
                                        !option?.vitals_option?.includes(
                                          vitalsKey,
                                        ))
                                    ) {
                                      return false;
                                    }
                                  }
                                  return (
                                    item?.["0"] != "-" ||
                                    (item?.hasOwnProperty("1") &&
                                      item?.["1"] != "-") ||
                                    (item?.hasOwnProperty("2") &&
                                      item?.["2"] != "-")
                                  );
                                });
                              const hasAnyData =
                                hasVitalsData || (!rx && patientBirthWeight);

                              if (!hasAnyData) {
                                return null;
                              }

                              return (
                                <View style={{ marginTop: PX_TO_PT * 15 }}>
                                  <Text
                                    fixed
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 700,
                                      marginBottom: PX_TO_PT * 6,
                                    }}
                                  >
                                    Vitals & Body Composition:&nbsp;
                                    {!rx && patientBirthWeight && (
                                      <>
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          Patient's birth weight:&nbsp;
                                        </Text>
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          }}
                                        >
                                          ({patientBirthWeight}kg)
                                        </Text>
                                      </>
                                    )}
                                  </Text>

                                  {caseManagerData?.vitals?.length > 0 && (
                                    <View style={styles.table}>
                                      <View style={styles.headerRow} fixed>
                                        {columns?.map((item, i) => {
                                          return (
                                            <Text
                                              style={[
                                                styles.headerCell,
                                                {
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                  color: "#000",
                                                },
                                              ]}
                                            >
                                              {item?.title}
                                            </Text>
                                          );
                                        })}
                                      </View>
                                      {initialRows?.map((item, i) => {
                                        const requiredNames = [
                                          "BMI (kg/m²)",
                                          "BMR (kcals)",
                                          "BSA (m²)",
                                        ];

                                        if (
                                          requiredNames.includes(item?.name)
                                        ) {
                                          const nameToVitalsKey = {
                                            "BMI (kg/m²)": "bmi",
                                            "BMR (kcals)": "bmr",
                                            "BSA (m²)": "bsa",
                                          };
                                          const vitalsKey =
                                            nameToVitalsKey[item?.name];
                                          if (
                                            option?.vitals_option !==
                                              undefined &&
                                            (!vitalsKey ||
                                              !option?.vitals_option?.includes(
                                                vitalsKey,
                                              ))
                                          ) {
                                            return null;
                                          }
                                        }
                                        const hasData =
                                          (item?.["0"] != null &&
                                            item?.["0"] != "-" &&
                                            item?.["0"] != "") ||
                                          (item?.hasOwnProperty("1") &&
                                            item?.["1"] != null &&
                                            item?.["1"] != "-" &&
                                            item?.["1"] != "") ||
                                          (item?.hasOwnProperty("2") &&
                                            item?.["2"] != null &&
                                            item?.["2"] != "-" &&
                                            item?.["2"] != "");
                                        if (!hasData) {
                                          return null;
                                        }
                                        return (
                                          <View
                                            style={styles.row}
                                            key={i}
                                            wrap={false}
                                          >
                                            <Text
                                              style={[
                                                styles.cell,
                                                {
                                                  color: "#171725",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                },
                                              ]}
                                            >
                                              {item?.name}
                                            </Text>
                                            {item?.["0"] != null &&
                                              item?.["0"] != "-" &&
                                              item?.["0"] != "" && (
                                                <Text
                                                  style={[
                                                    styles.cell,
                                                    {
                                                      color: "#171725",
                                                      fontFamily:
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_family,
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 400,
                                                    },
                                                  ]}
                                                >
                                                  {item?.["0"]}
                                                </Text>
                                              )}
                                            {item?.hasOwnProperty("1") &&
                                              item?.["1"] != null &&
                                              item?.["1"] != "-" &&
                                              item?.["1"] != "" && (
                                                <Text
                                                  style={[
                                                    styles.cell,
                                                    {
                                                      color: "#171725",
                                                      fontFamily:
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_family,
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 400,
                                                    },
                                                  ]}
                                                >
                                                  {item?.["1"]}
                                                </Text>
                                              )}
                                            {item?.hasOwnProperty("2") &&
                                              item?.["2"] != null &&
                                              item?.["2"] != "-" &&
                                              item?.["2"] != "" && (
                                                <Text
                                                  style={[
                                                    styles.cell,
                                                    {
                                                      color: "#171725",
                                                      fontFamily:
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_family,
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 400,
                                                    },
                                                  ]}
                                                >
                                                  {item?.["2"]}
                                                </Text>
                                              )}
                                          </View>
                                        );
                                      })}
                                    </View>
                                  )}
                                </View>
                              );
                            })()
                          ))}
                      </>
                    ) : option?.id === 8 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" &&
                      option?.medical_history_option?.length > 0 ? (
                      <>
                        {!rx &&
                          caseManagerData?.medical_history?.length > 0 &&
                          (option?.format === "inline" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Medical History:
                              </Text>
                              {(() => {
                                const grouped = {};
                                if (
                                  caseManagerData?.medical_history &&
                                  Array.isArray(
                                    caseManagerData?.medical_history,
                                  )
                                ) {
                                  caseManagerData?.medical_history?.forEach(
                                    (item) => {
                                      if (
                                        item &&
                                        option?.medical_history_option?.includes(
                                          item?.tmmhs_id,
                                        )
                                      ) {
                                        if (!grouped[item?.title]) {
                                          grouped[item?.title] = [];
                                        }
                                        if (
                                          item?.tags?.length > 0 &&
                                          !item?.no_know_history
                                        ) {
                                          item?.tags?.forEach((tag) => {
                                            if (tag && tag?.enable === "Y") {
                                              let conditionName =
                                                tag?.title || "";
                                              let details = "";
                                              let hasDetails = false;
                                              if (
                                                tag.since &&
                                                item.tmmhs_id !== 5
                                              ) {
                                                details += ` (Since: ${tag?.since}`;
                                                hasDetails = true;
                                              }
                                              if (
                                                tag.date &&
                                                item.tmmhs_id === 5 &&
                                                typeof tag.date === "string" &&
                                                tag.date.trim()
                                              ) {
                                                details += ` (${tag.date}`;
                                                hasDetails = true;
                                              }
                                              if (
                                                item.tmmhs_id !== 3 &&
                                                item.tmmhs_id !== 5 &&
                                                tag.status
                                              ) {
                                                details += hasDetails
                                                  ? ` | Status: ${tag?.status}`
                                                  : ` (Status: ${tag?.status}`;
                                                hasDetails = true;
                                              }
                                              if (
                                                item.tmmhs_id !== 3 &&
                                                item.tmmhs_id !== 5 &&
                                                tag.medication
                                              ) {
                                                details += hasDetails
                                                  ? ` | Medication: ${tag?.medication}`
                                                  : ` (Medication: ${tag?.medication}`;
                                                hasDetails = true;
                                              }
                                              if (
                                                item?.tmmhs_id === 3 &&
                                                tag?.relationship
                                              ) {
                                                details += hasDetails
                                                  ? ` | Relative: ${tag?.relationship}`
                                                  : ` (Relative: ${tag?.relationship}`;
                                                hasDetails = true;
                                              }
                                              if (
                                                tag.note &&
                                                item.tmmhs_id !== 5
                                              ) {
                                                details += hasDetails
                                                  ? ` | ${tag?.note}`
                                                  : ` (${tag?.note}`;
                                                hasDetails = true;
                                              }
                                              if (
                                                tag.note &&
                                                item.tmmhs_id === 5
                                              ) {
                                                details += hasDetails
                                                  ? ` | Remarks: ${tag.note}`
                                                  : ` (Remarks: ${tag.note}`;
                                                hasDetails = true;
                                              }
                                              if (hasDetails) {
                                                details += `)`;
                                              }
                                              grouped[item?.title]?.push({
                                                conditionName,
                                                details,
                                                hasDetails,
                                              });
                                            }
                                          });
                                        } else if (item?.no_know_history) {
                                          grouped[item?.title]?.push({
                                            conditionName: "No known history",
                                            details: "",
                                            hasDetails: false,
                                          });
                                        }
                                      }
                                    },
                                  );
                                }
                                return Object.keys(grouped).map((category) =>
                                  grouped[category]?.length > 0 ? (
                                    <Text
                                      key={category}
                                      style={{
                                        marginTop: PX_TO_PT * 8,
                                        lineHeight: 1.4,
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        }}
                                      >
                                        {category}:
                                      </Text>
                                      {grouped[category]?.map((item, index) => (
                                        <Text
                                          key={index}
                                          style={{
                                            color: "#454551",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          }}
                                        >
                                          {index > 0 ? ", " : " "}
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {item?.conditionName}
                                          </Text>
                                          {item?.details}
                                        </Text>
                                      ))}
                                    </Text>
                                  ) : null,
                                );
                              })()}
                              {caseManagerData?.medical_history?.[0]
                                ?.medical_history_remarks && (
                                <Text
                                  style={{
                                    color: "#454551",
                                    fontFamily:
                                      printSettings?.page_format?.font_family,
                                    fontSize:
                                      PX_TO_PT *
                                      printSettings?.page_format?.font_size,
                                    fontWeight: 500,
                                    marginTop: PX_TO_PT * 8,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                      lineHeight: 2,
                                    }}
                                  >
                                    {"\n"}Additional History:{" "}
                                  </Text>
                                  <Text
                                    style={{
                                      color: "#454551",
                                      fontFamily: getIndianLanguageFont(
                                        caseManagerData?.medical_history?.[0]
                                          ?.medical_history_remarks,
                                        printSettings?.page_format?.font_family,
                                      ),
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 400,
                                    }}
                                  >
                                    (
                                    {
                                      caseManagerData?.medical_history?.[0]
                                        ?.medical_history_remarks
                                    }
                                    )
                                  </Text>
                                </Text>
                              )}
                            </View>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Medical History:&nbsp;
                              </Text>
                              {caseManagerData?.medical_history?.map(
                                (item, i) => {
                                  let abcd = 97;
                                  return (
                                    option?.medical_history_option?.includes(
                                      item?.tmmhs_id,
                                    ) &&
                                    item?.tags?.length > 0 && (
                                      <Text
                                        key={i}
                                        style={{
                                          marginTop: PX_TO_PT * 6,
                                          lineHeight: 1.4,
                                          marginTop: 5,
                                        }}
                                      >
                                        {!item?.no_know_history ? (
                                          item?.tags?.length > 0 && (
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              <Text
                                                style={{
                                                  color: "#171725",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                  lineHeight: 1.4,
                                                }}
                                              >
                                                &nbsp;{medicalHistoryIndex++}.{" "}
                                                {item?.title}&nbsp;:
                                              </Text>
                                              {item?.tags?.map((item1, i1) => {
                                                return (
                                                  <>
                                                    {item1?.enable == "Y" ? (
                                                      <>
                                                        <Text
                                                          key={i1}
                                                          style={{
                                                            color: "#171725",
                                                            fontFamily:
                                                              printSettings
                                                                ?.page_format
                                                                ?.font_family,
                                                            fontSize:
                                                              PX_TO_PT *
                                                              printSettings
                                                                ?.page_format
                                                                ?.font_size,
                                                            fontWeight: 500,
                                                          }}
                                                        >
                                                          &nbsp;{"\n"}
                                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                          {String.fromCharCode(
                                                            abcd++,
                                                          )}
                                                          .&nbsp;{item1?.title}
                                                          &nbsp;
                                                        </Text>
                                                        {((item1.since &&
                                                          item.tmmhs_id !==
                                                            5) ||
                                                          (item1.date &&
                                                            item.tmmhs_id ===
                                                              5) ||
                                                          item1.status ||
                                                          item1.medication ||
                                                          item1.relationship ||
                                                          item1.note) && (
                                                          <Text
                                                            key={i1}
                                                            style={{
                                                              lineHeight: 1.4,
                                                              color: "#171725",
                                                              fontFamily:
                                                                printSettings
                                                                  ?.page_format
                                                                  ?.font_family,
                                                              fontSize:
                                                                PX_TO_PT *
                                                                printSettings
                                                                  ?.page_format
                                                                  ?.font_size,
                                                              fontWeight: 400,
                                                            }}
                                                          >
                                                            {`(${Object.values(
                                                              Object.fromEntries(
                                                                Object.entries(
                                                                  (({
                                                                    since,
                                                                    date,
                                                                    status,
                                                                    medication,
                                                                    relationship,
                                                                    note,
                                                                  }) => ({
                                                                    since:
                                                                      item.tmmhs_id ===
                                                                        5 &&
                                                                      date
                                                                        ? `${date}`
                                                                        : since
                                                                          ? `Since : ${since}`
                                                                          : null,
                                                                    status:
                                                                      status &&
                                                                      item.tmmhs_id !==
                                                                        5 &&
                                                                      `Status : ${status}`,
                                                                    medication:
                                                                      medication &&
                                                                      item.tmmhs_id !==
                                                                        5 &&
                                                                      `Medication : ${medication}`,
                                                                    relationship:
                                                                      relationship &&
                                                                      `Relative : ${relationship}`,
                                                                    note:
                                                                      note &&
                                                                      (item.tmmhs_id ===
                                                                      5
                                                                        ? `Remarks : ${note}`
                                                                        : `${note}`),
                                                                  }))(item1),
                                                                ).filter(
                                                                  ([_, v]) => v,
                                                                ),
                                                              ),
                                                            ).join(" | ")})`}
                                                          </Text>
                                                        )}
                                                      </>
                                                    ) : (
                                                      <Text
                                                        key={i1}
                                                        style={{
                                                          color: "#171725",
                                                          fontFamily:
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_family,
                                                          fontSize:
                                                            PX_TO_PT *
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_size,
                                                          fontWeight: 500,
                                                        }}
                                                      >
                                                        &nbsp;{"\n"}
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        {String.fromCharCode(
                                                          abcd++,
                                                        )}
                                                        .&nbsp;
                                                        {`No ${item1?.title}`}
                                                        &nbsp;
                                                      </Text>
                                                    )}
                                                  </>
                                                );
                                              })}
                                              {"\n"}
                                            </Text>
                                          )
                                        ) : (
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            &nbsp;{medicalHistoryIndex++}.{" "}
                                            {item?.title}&nbsp;:
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              &nbsp;{"\n"}
                                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                              {String.fromCharCode(abcd++)}
                                              .&nbsp;No known history&nbsp;
                                            </Text>
                                          </Text>
                                        )}
                                      </Text>
                                    )
                                  );
                                },
                              )}
                              {caseManagerData?.medical_history?.[0]
                                ?.medical_history_remarks && (
                                <>
                                  <Text
                                    style={{
                                      color: "#454551",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        lineHeight: 2,
                                      }}
                                    >
                                      {"\n"}&nbsp;{medicalHistoryIndex++}.{" "}
                                      {`Additional History`}&nbsp;:
                                    </Text>
                                    {"\n"}
                                  </Text>
                                  <Text
                                    style={{
                                      color: "#454551",
                                      fontFamily: getIndianLanguageFont(
                                        caseManagerData?.medical_history?.[0]
                                          ?.medical_history_remarks,
                                        printSettings?.page_format?.font_family,
                                      ),
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                      marginLeft: PX_TO_PT * 15,
                                      marginTop: PX_TO_PT * 2,
                                    }}
                                  >
                                    {
                                      caseManagerData?.medical_history?.[0]
                                        ?.medical_history_remarks
                                    }
                                  </Text>
                                </>
                              )}
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Medical History:&nbsp;
                              </Text>
                              {caseManagerData?.medical_history?.map(
                                (item, i) => {
                                  return (
                                    option?.medical_history_option?.includes(
                                      item?.tmmhs_id,
                                    ) &&
                                    (item?.no_know_history ||
                                      item?.tags?.length > 0) && (
                                      <>
                                        <Text
                                          style={{
                                            color: "#000",
                                            marginTop:
                                              i === 0
                                                ? PX_TO_PT * 4
                                                : PX_TO_PT * 12,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            padding: 6,
                                            borderTop: "1px solid #171725",
                                            borderLeft: "1px solid #171725",
                                            borderRight: "1px solid #171725",
                                            backgroundColor: "#E2E2EA",
                                            lineHeight: 2,
                                          }}
                                        >{`${item?.title} : `}</Text>
                                        {!item?.no_know_history ? (
                                          <View
                                            key={i}
                                            style={[
                                              styles.table,
                                              { marginTop: 0 },
                                            ]}
                                          >
                                            <View
                                              style={styles.headerRow}
                                              fixed
                                            >
                                              <Text
                                                style={[
                                                  styles.headerCell,
                                                  {
                                                    fontFamily:
                                                      printSettings?.page_format
                                                        ?.font_family,
                                                    fontSize:
                                                      PX_TO_PT *
                                                      printSettings?.page_format
                                                        ?.font_size,
                                                    fontWeight: 500,
                                                    color: "#000",
                                                    lineHeight: 2,
                                                  },
                                                ]}
                                              >
                                                NAME
                                              </Text>
                                              {item?.tmmhs_id != 3 &&
                                                item?.tmmhs_id != 5 && (
                                                  <>
                                                    <Text
                                                      style={[
                                                        styles.headerCell,
                                                        {
                                                          flex: 0.2,
                                                          fontFamily:
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_family,
                                                          fontSize:
                                                            PX_TO_PT *
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_size,
                                                          fontWeight: 500,
                                                          color: "#000",
                                                          lineHeight: 2,
                                                        },
                                                      ]}
                                                    >
                                                      SINCE
                                                    </Text>
                                                    <Text
                                                      style={[
                                                        styles.headerCell,
                                                        {
                                                          flex: 0.2,
                                                          fontFamily:
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_family,
                                                          fontSize:
                                                            PX_TO_PT *
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_size,
                                                          fontWeight: 500,
                                                          color: "#000",
                                                          lineHeight: 2,
                                                        },
                                                      ]}
                                                    >
                                                      STATUS
                                                    </Text>
                                                    {item?.tmmhs_id == 2 && (
                                                      <Text
                                                        style={[
                                                          styles.headerCell,
                                                          {
                                                            flex: 0.25,
                                                            fontFamily:
                                                              printSettings
                                                                ?.page_format
                                                                ?.font_family,
                                                            fontSize:
                                                              PX_TO_PT *
                                                              printSettings
                                                                ?.page_format
                                                                ?.font_size,
                                                            fontWeight: 500,
                                                            color: "#000",
                                                            lineHeight: 2,
                                                          },
                                                        ]}
                                                      >
                                                        MEDICATION
                                                      </Text>
                                                    )}
                                                  </>
                                                )}
                                              {item?.tmmhs_id === 5 && (
                                                <Text
                                                  style={[
                                                    styles.headerCell,
                                                    {
                                                      flex: 0.2,
                                                      fontFamily:
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_family,
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 500,
                                                      color: "#000",
                                                      lineHeight: 2,
                                                    },
                                                  ]}
                                                >
                                                  DATE
                                                </Text>
                                              )}
                                              {item?.tmmhs_id === 3 && (
                                                <Text
                                                  style={[
                                                    styles.headerCell,
                                                    {
                                                      flex: 0.4,
                                                      fontFamily:
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_family,
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 500,
                                                      color: "#000",
                                                      lineHeight: 2,
                                                    },
                                                  ]}
                                                >
                                                  RELATIVE
                                                </Text>
                                              )}
                                              <Text
                                                style={[
                                                  styles.headerCell,
                                                  {
                                                    flex: 0.5,
                                                    fontFamily:
                                                      printSettings?.page_format
                                                        ?.font_family,
                                                    fontSize:
                                                      PX_TO_PT *
                                                      printSettings?.page_format
                                                        ?.font_size,
                                                    fontWeight: 500,
                                                    color: "#000",
                                                    lineHeight: 2,
                                                  },
                                                ]}
                                              >
                                                {item?.tmmhs_id === 5
                                                  ? "REMARKS"
                                                  : "NOTE"}
                                              </Text>
                                            </View>
                                            {item?.tags
                                              ?.filter((x) => x?.enable == "Y")
                                              ?.map((item1, i1) => {
                                                return (
                                                  <View
                                                    style={styles.row}
                                                    key={i1}
                                                    wrap={false}
                                                  >
                                                    <Text
                                                      style={[
                                                        styles.cell,
                                                        {
                                                          color: "#171725",
                                                          fontFamily:
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_family,
                                                          fontSize:
                                                            PX_TO_PT *
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_size,
                                                          fontWeight: 500,
                                                          lineHeight: 2,
                                                        },
                                                      ]}
                                                    >
                                                      {item1?.title}
                                                    </Text>
                                                    {item?.tmmhs_id != 3 &&
                                                      item?.tmmhs_id != 5 && (
                                                        <>
                                                          <Text
                                                            style={[
                                                              styles.cell,
                                                              {
                                                                flex: 0.2,
                                                                color:
                                                                  "#171725",
                                                                fontFamily:
                                                                  printSettings
                                                                    ?.page_format
                                                                    ?.font_family,
                                                                fontSize:
                                                                  PX_TO_PT *
                                                                  printSettings
                                                                    ?.page_format
                                                                    ?.font_size,
                                                                fontWeight: 400,
                                                                lineHeight: 2,
                                                              },
                                                            ]}
                                                          >
                                                            {item1?.since
                                                              ? item1?.since
                                                              : "-"}
                                                          </Text>
                                                          <Text
                                                            style={[
                                                              styles.cell,
                                                              {
                                                                flex: 0.2,
                                                                color:
                                                                  "#171725",
                                                                fontFamily:
                                                                  printSettings
                                                                    ?.page_format
                                                                    ?.font_family,
                                                                fontSize:
                                                                  PX_TO_PT *
                                                                  printSettings
                                                                    ?.page_format
                                                                    ?.font_size,
                                                                fontWeight: 400,
                                                                lineHeight: 2,
                                                              },
                                                            ]}
                                                          >
                                                            {item1?.status
                                                              ? item1?.status
                                                              : "-"}
                                                          </Text>
                                                          {item?.tmmhs_id ==
                                                            2 && (
                                                            <Text
                                                              style={[
                                                                styles.cell,
                                                                {
                                                                  flex: 0.25,
                                                                  color:
                                                                    "#171725",
                                                                  fontFamily:
                                                                    printSettings
                                                                      ?.page_format
                                                                      ?.font_family,
                                                                  fontSize:
                                                                    PX_TO_PT *
                                                                    printSettings
                                                                      ?.page_format
                                                                      ?.font_size,
                                                                  fontWeight: 400,
                                                                  lineHeight: 2,
                                                                },
                                                              ]}
                                                            >
                                                              {item1?.medication
                                                                ? item1?.medication
                                                                : "-"}
                                                            </Text>
                                                          )}
                                                        </>
                                                      )}
                                                    {item?.tmmhs_id === 5 && (
                                                      <Text
                                                        style={[
                                                          styles.cell,
                                                          {
                                                            flex: 0.2,
                                                            color: "#171725",
                                                            fontFamily:
                                                              printSettings
                                                                ?.page_format
                                                                ?.font_family,
                                                            fontSize:
                                                              PX_TO_PT *
                                                              printSettings
                                                                ?.page_format
                                                                ?.font_size,
                                                            fontWeight: 400,
                                                            lineHeight: 2,
                                                          },
                                                        ]}
                                                      >
                                                        {item1.date || "-"}
                                                      </Text>
                                                    )}
                                                    {item?.tmmhs_id === 3 && (
                                                      <Text
                                                        style={[
                                                          styles.cell,
                                                          {
                                                            flex: 0.4,
                                                            color: "#171725",
                                                            fontFamily:
                                                              printSettings
                                                                ?.page_format
                                                                ?.font_family,
                                                            fontSize:
                                                              PX_TO_PT *
                                                              printSettings
                                                                ?.page_format
                                                                ?.font_size,
                                                            fontWeight: 400,
                                                            lineHeight: 2,
                                                          },
                                                        ]}
                                                      >
                                                        {item1?.relationship
                                                          ? item1?.relationship
                                                          : "-"}
                                                      </Text>
                                                    )}
                                                    <Text
                                                      style={[
                                                        styles.cell,
                                                        {
                                                          flex: 0.5,
                                                          color: "#171725",
                                                          fontFamily:
                                                            getIndianLanguageFont(
                                                              item1?.note,
                                                              printSettings
                                                                ?.page_format
                                                                ?.font_family,
                                                            ),
                                                          fontSize:
                                                            PX_TO_PT *
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_size,
                                                          fontWeight: 400,
                                                          lineHeight: 2,
                                                        },
                                                      ]}
                                                    >
                                                      {item1?.note
                                                        ? item1?.note
                                                        : "-"}
                                                      &nbsp;
                                                    </Text>
                                                  </View>
                                                );
                                              })}
                                            {item?.tags
                                              ?.filter((x) => x?.enable == "N")
                                              ?.map((item1, i1) => {
                                                return (
                                                  <View
                                                    style={styles.row}
                                                    key={i1}
                                                  >
                                                    <Text
                                                      style={[
                                                        styles.cell,
                                                        {
                                                          color: "#171725",
                                                          fontFamily:
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_family,
                                                          fontSize:
                                                            PX_TO_PT *
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_size,
                                                          fontWeight: 500,
                                                          lineHeight: 2,
                                                        },
                                                      ]}
                                                    >{`No ${item1?.title}`}</Text>
                                                  </View>
                                                );
                                              })}
                                          </View>
                                        ) : (
                                          <Text
                                            style={{
                                              color: "#000",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                              padding: 6,
                                              border: 1,
                                              borderStyle: "solid",
                                              borderColor: "#171725",
                                              lineHeight: 2,
                                            }}
                                          >{`No known history`}</Text>
                                        )}
                                      </>
                                    )
                                  );
                                },
                              )}
                              {caseManagerData?.medical_history?.[0]
                                ?.medical_history_remarks && (
                                <View style={styles.table}>
                                  <View style={styles.headerRow} fixed>
                                    <Text
                                      style={[
                                        styles.headerCell,
                                        {
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                          color: "#000",
                                          backgroundColor: "#E2E2EA",
                                          lineHeight: 2,
                                        },
                                      ]}
                                    >
                                      Additional History :
                                    </Text>
                                  </View>

                                  <View style={styles.row} wrap={false}>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            caseManagerData
                                              ?.medical_history?.[0]
                                              ?.medical_history_remarks,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                          lineHeight: 2,
                                        },
                                      ]}
                                    >
                                      {
                                        caseManagerData?.medical_history?.[0]
                                          ?.medical_history_remarks
                                      }
                                      &nbsp;
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </View>
                          ))}
                      </>
                    ) : option?.id === 9 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          caseManagerData?.follow_up_date &&
                          (option?.format === "inline" ? (
                            <Text style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  lineHeight: 2,
                                }}
                              >
                                Follow-up:&nbsp;
                              </Text>
                              <Text
                                style={{
                                  color: "#171725",
                                  fontFamily: getIndianLanguageFont(
                                    caseManagerData?.follow_up_date,
                                    printSettings?.page_format?.font_family,
                                  ),
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 400,
                                }}
                              >
                                {option?.followup_dateformat
                                  ? moment(
                                      caseManagerData?.follow_up_date,
                                    ).format("DD/MM/YYYY")
                                  : onCalFollowUp(
                                      moment(
                                        caseManagerData?.follow_up_date,
                                      ).format("YYYY-MM-DD"),
                                      moment(
                                        caseManagerData?.patient_data
                                          ?.patient_consultaion_date,
                                      ).format("YYYY-MM-DD"),
                                    )}
                              </Text>
                            </Text>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  lineHeight: 2,
                                }}
                              >
                                Follow-up:&nbsp;
                              </Text>
                              <Text
                                style={{
                                  color: "#171725",
                                  fontFamily: getIndianLanguageFont(
                                    caseManagerData?.follow_up_date,
                                    printSettings?.page_format?.font_family,
                                  ),
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 400,
                                  marginTop: PX_TO_PT * 4,
                                }}
                              >
                                {option?.followup_dateformat
                                  ? moment(
                                      caseManagerData?.follow_up_date,
                                    ).format("DD/MM/YYYY")
                                  : onCalFollowUp(
                                      moment(
                                        caseManagerData?.follow_up_date,
                                      ).format("YYYY-MM-DD"),
                                      moment(
                                        caseManagerData?.patient_data
                                          ?.patient_consultaion_date,
                                      ).format("YYYY-MM-DD"),
                                    )}
                              </Text>
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  lineHeight: 2,
                                }}
                              >
                                Follow-up:&nbsp;
                              </Text>
                              <View style={styles.table}>
                                <Text
                                  style={{
                                    border: "1px solid #171725",
                                    padding: 6,
                                    color: "#171725",
                                    fontFamily: getIndianLanguageFont(
                                      caseManagerData?.follow_up_date,
                                      printSettings?.page_format?.font_family,
                                    ),
                                    fontSize:
                                      PX_TO_PT *
                                      printSettings?.page_format?.font_size,
                                    fontWeight: 400,
                                  }}
                                >
                                  {option?.followup_dateformat
                                    ? moment(
                                        caseManagerData?.follow_up_date,
                                      ).format("DD/MM/YYYY")
                                    : onCalFollowUp(
                                        moment(
                                          caseManagerData?.follow_up_date,
                                        ).format("YYYY-MM-DD"),
                                        moment(
                                          caseManagerData?.patient_data
                                            ?.patient_consultaion_date,
                                        ).format("YYYY-MM-DD"),
                                      )}
                                </Text>
                              </View>
                            </View>
                          ))}
                      </>
                    ) : option?.id === 91 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          caseManagerData?.visit_advice &&
                          (option?.format === "inline" ? (
                            <Text style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Notes:&nbsp;
                              </Text>
                              <Text
                                style={{
                                  color: "#171725",
                                  fontFamily: getIndianLanguageFont(
                                    caseManagerData?.visit_advice,
                                    printSettings?.page_format?.font_family,
                                  ),
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 400,
                                }}
                              >
                                {caseManagerData?.visit_advice}
                              </Text>
                            </Text>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Notes:&nbsp;
                              </Text>
                              <Text
                                style={{
                                  color: "#171725",
                                  fontFamily: getIndianLanguageFont(
                                    caseManagerData?.visit_advice,
                                    printSettings?.page_format?.font_family,
                                  ),
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 400,
                                  marginTop: PX_TO_PT * 4,
                                }}
                              >
                                {caseManagerData?.visit_advice}
                              </Text>
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Notes:&nbsp;
                              </Text>
                              <View style={styles.table}>
                                <Text
                                  style={{
                                    border: "1px solid #171725",
                                    padding: 6,
                                    color: "#171725",
                                    fontFamily: getIndianLanguageFont(
                                      caseManagerData?.visit_advice,
                                      printSettings?.page_format?.font_family,
                                    ),
                                    fontSize:
                                      PX_TO_PT *
                                      printSettings?.page_format?.font_size,
                                    fontWeight: 400,
                                  }}
                                >
                                  {caseManagerData?.visit_advice}
                                </Text>
                              </View>
                            </View>
                          ))}
                      </>
                    ) : option?.id === 10 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          (transformGivenVaccines?.template?.length > 0 ||
                            dueVaccines?.detail?.length > 0) &&
                          (option?.format === "inline" ? (
                            <>
                              {transformGivenVaccines?.template?.length > 0 && (
                                <Text
                                  style={{
                                    marginTop: PX_TO_PT * 15,
                                    lineHeight: 1.4,
                                  }}
                                >
                                  <Text
                                    fixed
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 700,
                                    }}
                                  >
                                    Given Vaccines :&nbsp;{"\n"}
                                  </Text>
                                  {transformGivenVaccines?.template?.map(
                                    (item, i) => {
                                      return (
                                        <Text
                                          key={i}
                                          style={{
                                            marginTop: PX_TO_PT * 6,
                                            lineHeight: 1.4,
                                          }}
                                        >
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {item?.tvac_name}&nbsp;
                                          </Text>
                                          <Text
                                            style={{
                                              color: "#454551",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {`(Given Date : `}
                                            <Text
                                              style={{
                                                color: "#454551",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {item?.tvp_given_date
                                                ? moment(
                                                    item?.tvp_given_date,
                                                  ).format("DD MMM YYYY")
                                                : "-"}
                                            </Text>
                                          </Text>
                                          {item?.tvc_name && (
                                            <Text
                                              style={{
                                                color: "#454551",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              {` | Brand : `}
                                              <Text
                                                style={{
                                                  color: "#454551",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 400,
                                                }}
                                              >
                                                {item?.tvc_name}
                                              </Text>
                                            </Text>
                                          )}
                                          {item?.tvpv_site && (
                                            <Text
                                              style={{
                                                color: "#454551",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              {` | Site : `}
                                              <Text
                                                style={{
                                                  color: "#454551",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 400,
                                                }}
                                              >
                                                {item?.tvpv_site}
                                              </Text>
                                            </Text>
                                          )}
                                          {item?.tvp_remarks && (
                                            <Text
                                              style={{
                                                color: "#454551",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              {` | Note : `}
                                              <Text
                                                style={{
                                                  color: "#454551",
                                                  fontFamily:
                                                    getIndianLanguageFont(
                                                      item?.tvp_remarks,
                                                      printSettings?.page_format
                                                        ?.font_family,
                                                    ),
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 400,
                                                }}
                                              >
                                                {item?.tvp_remarks}
                                              </Text>
                                            </Text>
                                          )}
                                          <Text
                                            key={i}
                                            style={{
                                              color: "#454551",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {")"}
                                            {i !==
                                            transformGivenVaccines?.template
                                              ?.length -
                                              1
                                              ? ", "
                                              : ""}
                                          </Text>
                                        </Text>
                                      );
                                    },
                                  )}
                                </Text>
                              )}
                              {dueVaccines?.detail?.length > 0 && (
                                <Text
                                  style={{
                                    marginTop: PX_TO_PT * 15,
                                    lineHeight: 1.4,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 700,
                                    }}
                                  >
                                    Due Vaccines :&nbsp;{"\n"}
                                  </Text>
                                  {dueVaccines?.detail?.map((item, i) => {
                                    return (
                                      <Text
                                        key={i}
                                        style={{
                                          marginTop: PX_TO_PT * 6,
                                          lineHeight: 1.4,
                                        }}
                                      >
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {item?.tvac_name}&nbsp;
                                        </Text>
                                        <Text
                                          style={{
                                            color: "#454551",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {`(Updated Due Date : `}
                                          <Text
                                            style={{
                                              color: "#454551",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            }}
                                          >
                                            {item?.tvd_due_date
                                              ? moment(
                                                  item?.tvd_due_date,
                                                ).format("DD MMM YYYY")
                                              : "-"}
                                          </Text>
                                        </Text>
                                        {item?.tvd_remarks && (
                                          <Text
                                            style={{
                                              color: "#454551",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {` | Note : `}
                                            <Text
                                              style={{
                                                color: "#454551",
                                                fontFamily:
                                                  getIndianLanguageFont(
                                                    item?.tvd_remarks,
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  ),
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {item?.tvd_remarks}
                                            </Text>
                                          </Text>
                                        )}
                                        <Text
                                          style={{
                                            color: "#454551",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {")"}
                                          {i !== dueVaccines?.detail?.length - 1
                                            ? ", "
                                            : ""}
                                        </Text>
                                      </Text>
                                    );
                                  })}
                                </Text>
                              )}
                            </>
                          ) : option?.format === "listview" ? (
                            <>
                              {transformGivenVaccines?.template?.length && (
                                <View style={{ marginTop: PX_TO_PT * 15 }}>
                                  <Text
                                    fixed
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 700,
                                    }}
                                  >
                                    Given Vaccines :&nbsp;{"\n"}
                                  </Text>
                                  {transformGivenVaccines?.template?.map(
                                    (item, i) => {
                                      return (
                                        <Text
                                          key={i}
                                          style={{
                                            marginTop:
                                              PX_TO_PT * (i == 0 ? 4 : 2),
                                            lineHeight: 1.4,
                                          }}
                                        >
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            &nbsp;{i + 1}.&nbsp;
                                          </Text>
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {item?.tvac_name}&nbsp;
                                          </Text>
                                          <Text
                                            style={{
                                              color: "#454551",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {`(Given Date : `}
                                            <Text
                                              style={{
                                                color: "#454551",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {item?.tvp_given_date
                                                ? moment(
                                                    item?.tvp_given_date,
                                                  ).format("DD MMM YYYY")
                                                : "-"}
                                            </Text>
                                          </Text>
                                          {item?.tvc_name && (
                                            <Text
                                              style={{
                                                color: "#454551",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              {` | Brand : `}
                                              <Text
                                                style={{
                                                  color: "#454551",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 400,
                                                }}
                                              >
                                                {item?.tvc_name}
                                              </Text>
                                            </Text>
                                          )}
                                          {item?.tvpv_site && (
                                            <Text
                                              style={{
                                                color: "#454551",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              {` | Site : `}
                                              <Text
                                                style={{
                                                  color: "#454551",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 400,
                                                }}
                                              >
                                                {item?.tvpv_site}
                                              </Text>
                                            </Text>
                                          )}
                                          {item?.tvp_remarks && (
                                            <Text
                                              style={{
                                                color: "#454551",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              {` | Note : `}
                                              <Text
                                                style={{
                                                  color: "#454551",
                                                  fontFamily:
                                                    getIndianLanguageFont(
                                                      item?.tvp_remarks,
                                                      printSettings?.page_format
                                                        ?.font_family,
                                                    ),
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 400,
                                                }}
                                              >
                                                {item?.tvp_remarks}
                                              </Text>
                                            </Text>
                                          )}
                                          <Text
                                            style={{
                                              color: "#454551",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {")\n"}
                                          </Text>
                                        </Text>
                                      );
                                    },
                                  )}
                                </View>
                              )}
                              {dueVaccines?.detail?.length && (
                                <View style={{ marginTop: PX_TO_PT * 15 }}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 700,
                                    }}
                                  >
                                    Due Vaccines :&nbsp;{"\n"}
                                  </Text>
                                  {dueVaccines?.detail?.map((item, i) => {
                                    return (
                                      <Text
                                        key={i}
                                        style={{
                                          marginTop:
                                            PX_TO_PT * (i == 0 ? 4 : 2),
                                          lineHeight: 1.4,
                                        }}
                                      >
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          &nbsp;{i + 1}.&nbsp;
                                        </Text>
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {item?.tvac_name}&nbsp;
                                        </Text>
                                        <Text
                                          style={{
                                            color: "#454551",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {`(Updated Due Date : `}
                                          <Text
                                            style={{
                                              color: "#454551",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            }}
                                          >
                                            {item?.tvd_due_date
                                              ? moment(
                                                  item?.tvd_due_date,
                                                ).format("DD MMM YYYY")
                                              : "-"}
                                          </Text>
                                        </Text>
                                        {item?.tvp_remarks && (
                                          <Text
                                            style={{
                                              color: "#454551",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {` | Note : `}
                                            <Text
                                              style={{
                                                color: "#454551",
                                                fontFamily:
                                                  getIndianLanguageFont(
                                                    item?.tvd_remarks,
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  ),
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {item?.tvd_remarks}
                                            </Text>
                                          </Text>
                                        )}
                                        <Text
                                          style={{
                                            color: "#454551",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {")\n"}
                                        </Text>
                                      </Text>
                                    );
                                  })}
                                </View>
                              )}
                            </>
                          ) : (
                            <>
                              {transformGivenVaccines?.template?.length && (
                                <View style={{ marginTop: PX_TO_PT * 15 }}>
                                  <Text
                                    fixed
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 700,
                                      marginBottom: PX_TO_PT * 6,
                                    }}
                                  >
                                    Given Vaccines :&nbsp;{"\n"}
                                  </Text>
                                  <View style={styles.table}>
                                    <View style={styles.headerRow} fixed>
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.6,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        NAME
                                      </Text>
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.6,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        GIVEN DATE
                                      </Text>
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.6,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        BRAND
                                      </Text>
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.6,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        SITE
                                      </Text>
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.8,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        NOTE
                                      </Text>
                                    </View>
                                    {transformGivenVaccines?.template?.map(
                                      (item, i) => (
                                        <View
                                          style={styles.row}
                                          key={i}
                                          wrap={false}
                                        >
                                          <Text
                                            style={[
                                              styles.cell,
                                              {
                                                flex: 0.6,
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              },
                                            ]}
                                          >
                                            {item?.tvac_name || "-"}
                                          </Text>
                                          <Text
                                            style={[
                                              styles.cell,
                                              {
                                                flex: 0.6,
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              },
                                            ]}
                                          >
                                            {item?.tvp_given_date
                                              ? moment(
                                                  item?.tvp_given_date,
                                                ).format("DD MMM YYYY")
                                              : "-"}
                                          </Text>
                                          <Text
                                            style={[
                                              styles.cell,
                                              {
                                                flex: 0.6,
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              },
                                            ]}
                                          >
                                            {item?.tvc_name || "-"}
                                          </Text>
                                          <Text
                                            style={[
                                              styles.cell,
                                              {
                                                flex: 0.6,
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              },
                                            ]}
                                          >
                                            {item?.tvpv_site || "-"}
                                          </Text>
                                          <Text
                                            style={[
                                              styles.cell,
                                              {
                                                flex: 0.8,
                                                color: "#171725",
                                                fontFamily:
                                                  getIndianLanguageFont(
                                                    item?.tvp_remarks,
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  ),
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              },
                                            ]}
                                          >
                                            {item?.tvp_remarks || "-"}&nbsp;
                                          </Text>
                                        </View>
                                      ),
                                    )}
                                  </View>
                                </View>
                              )}
                              {dueVaccines?.detail?.length && (
                                <View style={{ marginTop: PX_TO_PT * 15 }}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 700,
                                      marginBottom: PX_TO_PT * 6,
                                    }}
                                  >
                                    Due Vaccines :&nbsp;{"\n"}
                                  </Text>
                                  <View style={styles.table}>
                                    <View style={styles.headerRow} fixed>
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.6,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        NAME
                                      </Text>
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.6,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        UPDATED DUE DATE
                                      </Text>
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.8,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        NOTE
                                      </Text>
                                    </View>
                                    {dueVaccines?.detail?.map((item, i) => (
                                      <View
                                        style={styles.row}
                                        key={i}
                                        wrap={false}
                                      >
                                        <Text
                                          style={[
                                            styles.cell,
                                            {
                                              flex: 0.6,
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            },
                                          ]}
                                        >
                                          {item?.tvac_name || "-"}
                                        </Text>
                                        <Text
                                          style={[
                                            styles.cell,
                                            {
                                              flex: 0.6,
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            },
                                          ]}
                                        >
                                          {item?.tvd_due_date
                                            ? moment(item?.tvd_due_date).format(
                                                "DD MMM YYYY",
                                              )
                                            : "-"}
                                        </Text>
                                        <Text
                                          style={[
                                            styles.cell,
                                            {
                                              flex: 0.8,
                                              color: "#171725",
                                              fontFamily: getIndianLanguageFont(
                                                item?.tvd_remarks,
                                                printSettings?.page_format
                                                  ?.font_family,
                                              ),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            },
                                          ]}
                                        >
                                          {item?.tvd_remarks || "-"}&nbsp;
                                        </Text>
                                      </View>
                                    ))}
                                  </View>
                                </View>
                              )}
                            </>
                          ))}
                      </>
                    ) : option?.id === 19 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          activeCarePlans.length > 0 &&
                          (option?.format === "inline" ? (
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Care Plan:&nbsp;
                              </Text>
                              {activeCarePlans.map((item, i) => (
                                <Text key={i}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    {item?.plan_name}&nbsp;
                                  </Text>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 400,
                                    }}
                                  >{`(${moment(item?.created_date).format("DD MMM YYYY")})`}</Text>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 400,
                                    }}
                                  >
                                    {activeCarePlans.length - 1 !== i
                                      ? ","
                                      : ""}
                                    &nbsp;
                                  </Text>
                                </Text>
                              ))}
                            </Text>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Care Plan:&nbsp;
                              </Text>
                              {activeCarePlans.map((item, i) => (
                                <Text
                                  key={i}
                                  style={{
                                    marginTop: PX_TO_PT * (i === 0 ? 4 : 2),
                                    lineHeight: 1.4,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    &nbsp;{i + 1}.&nbsp;
                                  </Text>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    {item?.plan_name}&nbsp;
                                  </Text>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 400,
                                    }}
                                  >{`(${moment(item?.created_date).format("DD MMM YYYY")})`}</Text>
                                </Text>
                              ))}
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  marginBottom: PX_TO_PT * 6,
                                }}
                              >
                                Care Plan:&nbsp;
                              </Text>
                              <View style={styles.table}>
                                <View style={styles.headerRow} fixed>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    PLAN NAME
                                  </Text>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    ASSIGNED DATE
                                  </Text>
                                </View>
                                {activeCarePlans.map((item, i) => (
                                  <View style={styles.row} key={i} wrap={false}>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        },
                                      ]}
                                    >
                                      {item?.plan_name}&nbsp;
                                    </Text>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        },
                                      ]}
                                    >
                                      {moment(item?.created_date).format(
                                        "DD MMM YYYY",
                                      )}
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            </View>
                          ))}
                      </>
                    ) : option?.id === 20 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {ophthalModuleData &&
                          Object.keys(ophthalModuleData).length > 0 &&
                          (option?.format === "inline" ? (
                            <OphthalmologyInlineView
                              PX_TO_PT={PX_TO_PT}
                              styles={styles}
                              printSettings={printSettings}
                              ophthalModuleData={ophthalModuleData}
                              options={
                                option?.ophthalmology_option ||
                                option?.subSections
                              }
                            />
                          ) : option?.format === "listview" ? (
                            <OphthalmologyListView
                              PX_TO_PT={PX_TO_PT}
                              styles={styles}
                              printSettings={printSettings}
                              ophthalModuleData={ophthalModuleData}
                              options={
                                option?.ophthalmology_option ||
                                option?.subSections
                              }
                            />
                          ) : (
                            <>
                              {(
                                option?.ophthalmology_option ||
                                option?.subSections ||
                                []
                              ).map((section) => {
                                if (
                                  typeof section === "object" &&
                                  section?.visible === false
                                ) {
                                  return null;
                                }
                                const sectionOptions = [section];
                                const sectionView = section?.view ?? 3;
                                const sectionKey =
                                  typeof section === "object"
                                    ? section.id
                                    : section;
                                if (sectionView === 1) {
                                  return (
                                    <OphthalmologyInlineView
                                      key={sectionKey}
                                      PX_TO_PT={PX_TO_PT}
                                      styles={styles}
                                      printSettings={printSettings}
                                      ophthalModuleData={ophthalModuleData}
                                      options={sectionOptions}
                                    />
                                  );
                                }
                                if (sectionView === 2) {
                                  return (
                                    <OphthalmologyListView
                                      key={sectionKey}
                                      PX_TO_PT={PX_TO_PT}
                                      styles={styles}
                                      printSettings={printSettings}
                                      ophthalModuleData={ophthalModuleData}
                                      options={sectionOptions}
                                    />
                                  );
                                }
                                return (
                                  <OphthalmologyTableView
                                    key={sectionKey}
                                    PX_TO_PT={PX_TO_PT}
                                    styles={styles}
                                    printSettings={printSettings}
                                    ophthalModuleData={ophthalModuleData}
                                    options={sectionOptions}
                                  />
                                );
                              })}
                            </>
                          ))}
                      </>
                    ) : option?.id === 11 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {isSmartSyncPrescription && isRxDigitizeBool ? (
                          <>
                            {hasDentalSectionData && (
                            <View style={styles.dentalSection}>
                              {dentalComplaintRowsFiltered.length > 0 && (
                                <View style={styles.dentalTable}>
                                  {dentalComplaintRowsFiltered.map((row) => (
                                    <View key={row.key} style={styles.dentalRow}>
                                      <View style={styles.dentalCellLabel}>
                                        <Text
                                          style={{
                                            fontFamily: baseFontFamily,
                                            fontSize: baseFontSize,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {row.label}
                                        </Text>
                                      </View>
                                      <View style={styles.dentalCellValue}>
                                        <Text
                                          style={{
                                            fontFamily: baseFontFamily,
                                            fontSize: baseFontSize,
                                            fontWeight: 400,
                                          }}
                                        >
                                          {dentalComplaints?.[row.key] || ""}
                                        </Text>
                                      </View>
                                    </View>
                                  ))}
                                </View>
                              )}
                              {dentalMedicationRowsFiltered.length > 0 && (
                                <View style={{ marginTop: PX_TO_PT * 6 }}>
                                  <Text
                                    fixed
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 700,
                                      marginBottom: PX_TO_PT * 6,
                                    }}
                                  >
                                    Medication (Rx):&nbsp;
                                  </Text>
                                  <View style={styles.table}>
                                    <View style={styles.headerRow} fixed>
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.18,
                                            fontFamily: getFont(),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        {medicineHeaderLang("S.NO")}
                                      </Text>
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            fontFamily: getFont(),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        {medicineHeaderLang("MEDICINE")}
                                      </Text>
                                      <View
                                        style={{
                                          flex:
                                            dentalMedicationOption?.medicine_option
                                              ?.length === 0
                                              ? 0.25
                                              : dentalMedicationOption?.medicine_option
                                                    ?.length === 1
                                                ? 0.8
                                                : dentalMedicationOption?.medicine_option
                                                      ?.length === 2
                                                  ? 1.2
                                                  : dentalMedicationOption
                                                        ?.medicine_option
                                                        ?.length === 3
                                                    ? 1.4
                                                    : 2.4,
                                        }}
                                      >
                                        <View
                                          style={{
                                            flexGrow: 1,
                                            flexDirection: "row",
                                          }}
                                        >
                                          {dentalMedicationOption?.medicine_option?.includes(
                                            "dose",
                                          ) && (
                                            <Text
                                              style={[
                                                styles.headerCell,
                                                {
                                                  flex: 0.45,
                                                  fontFamily: getFont(),
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                  color: "#000",
                                                },
                                              ]}
                                            >
                                              {medicineHeaderLang("DOSE")}
                                            </Text>
                                          )}
                                          {dentalMedicationOption?.medicine_option?.includes(
                                            "frequency",
                                          ) && (
                                            <Text
                                              style={[
                                                styles.headerCell,
                                                {
                                                  flex: 0.6,
                                                  fontFamily: getFont(),
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                  color: "#000",
                                                },
                                              ]}
                                            >
                                              {medicineHeaderLang("FREQUENCY")}
                                            </Text>
                                          )}
                                          {dentalMedicationOption?.medicine_option?.includes(
                                            "duration",
                                          ) && (
                                            <Text
                                              style={[
                                                styles.headerCell,
                                                {
                                                  flex: 0.53,
                                                  fontFamily: getFont(),
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                  color: "#000",
                                                },
                                              ]}
                                            >
                                              {medicineHeaderLang("DURATION")}
                                            </Text>
                                          )}
                                          {dentalMedicationOption?.medicine_option?.includes(
                                            "quantity",
                                          ) && (
                                            <Text
                                              style={[
                                                styles.headerCell,
                                                {
                                                  flex: 0.18,
                                                  fontFamily: getFont(),
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                  color: "#000",
                                                },
                                              ]}
                                            >
                                              {medicineHeaderLang("QTY")}
                                            </Text>
                                          )}
                                          {dentalMedicationOption?.medicine_option?.includes(
                                            "note",
                                          ) && (
                                            <Text
                                              style={[
                                                styles.headerCell,
                                                {
                                                  flex: 0.7,
                                                  fontFamily: getFont(),
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                  color: "#000",
                                                },
                                              ]}
                                            >
                                              {medicineHeaderLang("NOTES")}
                                            </Text>
                                          )}
                                        </View>
                                      </View>
                                    </View>
                                    {dentalMedicationRowsFiltered.map(
                                      (item, i) => (
                                        <View
                                          style={styles.row}
                                          key={item.tmm_id || item.unique_id || i}
                                          wrap={false}
                                        >
                                          <Text
                                            style={[
                                              styles.cell,
                                              {
                                                flex: 0.18,
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              },
                                            ]}
                                          >
                                            {i + 1}
                                          </Text>
                                          <View style={styles.cell}>
                                            <Text
                                              style={[
                                                {
                                                  color: "#171725",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                },
                                              ]}
                                            >
                                              {item.tmm_medicine_name ||
                                                item.name ||
                                                ""}
                                            </Text>
                                            {dentalMedicationOption?.medicine_with_generic &&
                                            (item.tmm_generic ||
                                              item.corrected_name) ? (
                                              <Text
                                                style={[
                                                  {
                                                    color: "#171725",
                                                    fontFamily:
                                                      printSettings?.page_format
                                                        ?.font_family,
                                                    fontSize:
                                                      PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size -
                                                      2,
                                                    fontWeight: 400,
                                                  },
                                                ]}
                                              >
                                                {item.tmm_generic ||
                                                  item.corrected_name ||
                                                  item.metadata
                                                    ?.tmm_generic ||
                                                  ""}
                                              </Text>
                                            ) : null}
                                          </View>
                                          <View
                                            style={{
                                              flex:
                                                dentalMedicationOption
                                                  ?.medicine_option?.length ===
                                                0
                                                  ? 0.25
                                                  : dentalMedicationOption
                                                        ?.medicine_option
                                                        ?.length === 1
                                                    ? 0.8
                                                    : dentalMedicationOption
                                                          ?.medicine_option
                                                          ?.length === 2
                                                      ? 1.2
                                                      : dentalMedicationOption
                                                            ?.medicine_option
                                                            ?.length === 3
                                                        ? 1.4
                                                        : 2.4,
                                              flexDirection: "row",
                                            }}
                                          >
                                            {dentalMedicationOption?.medicine_option?.includes(
                                              "dose",
                                            ) && (
                                              <Text
                                                style={[
                                                  styles.cell,
                                                  {
                                                    flex: 0.45,
                                                    color: "#171725",
                                                    fontFamily:
                                                      printSettings?.page_format
                                                        ?.font_family,
                                                    fontSize:
                                                      PX_TO_PT *
                                                      printSettings
                                                        ?.page_format
                                                        ?.font_size,
                                                    fontWeight: 500,
                                                  },
                                                ]}
                                              >
                                                {item.tmm_dosage &&
                                                item.tmm_unit
                                                  ? `${formatUnitPerDose(item.tmm_dosage, dentalMedicationOption?.is_dosage_decimal)} ${item.medicineUnit?.find((x) => x.tmu_id == item.tmm_unit)?.tmu_title || ""}`
                                                  : item.medicineUnit?.find(
                                                        (x) =>
                                                          x.tmu_id ==
                                                          item.default_tmm_unit,
                                                      )?.tmu_title || "-"}
                                              </Text>
                                            )}
                                            {dentalMedicationOption?.medicine_option?.includes(
                                              "frequency",
                                            ) && (
                                              <Text
                                                style={[
                                                  styles.cell,
                                                  {
                                                    flex: 0.6,
                                                    color: "#171725",
                                                    fontFamily: getFont(),
                                                    fontSize:
                                                      PX_TO_PT *
                                                      printSettings
                                                        ?.page_format
                                                        ?.font_size,
                                                    fontWeight: 400,
                                                  },
                                                ]}
                                              >
                                                {item.tmf_block === 0 ||
                                                item.tmf_block === ""
                                                  ? item.tcm_tmm_freq_morning ||
                                                    item.tcm_tmm_freq_afternoon ||
                                                    item.tcm_tmm_freq_evening ||
                                                    item.tcm_tmm_freq_night
                                                    ? dentalMedicationOption?.numeric_frequency
                                                      ? `${item.tcm_tmm_freq_morning ? medicine_freq_dosage_format(item.tcm_tmm_freq_morning, dentalMedicationOption?.is_dosage_decimal) : 0} - ${item.tcm_tmm_freq_afternoon ? medicine_freq_dosage_format(item.tcm_tmm_freq_afternoon, dentalMedicationOption?.is_dosage_decimal) : 0}${item.tcm_tmm_freq_evening ? " - " + medicine_freq_dosage_format(item.tcm_tmm_freq_evening, dentalMedicationOption?.is_dosage_decimal) : ""} - ${item.tcm_tmm_freq_night ? medicine_freq_dosage_format(item.tcm_tmm_freq_night, dentalMedicationOption?.is_dosage_decimal) : 0}`
                                                      : formatFrequency(
                                                          item.tcm_tmm_freq_morning,
                                                          item.tcm_tmm_freq_afternoon,
                                                          item.tcm_tmm_freq_evening,
                                                          item.tcm_tmm_freq_night,
                                                          dentalMedicationOption?.is_dosage_decimal,
                                                        )
                                                    : "-"
                                                  : `(${frequencyList?.find((x) => x.tmf_id === item.tmm_freq_type)?.[frequencyLang()] || ""})`}
                                                {"\n"}
                                                {timingList?.find(
                                                  (x) =>
                                                    x.tmt_id === item.tmm_time,
                                                ) !== undefined &&
                                                timingList?.find(
                                                  (x) =>
                                                    x.tmt_id === item.tmm_time,
                                                )?.tmt_title !== "None"
                                                  ? timingList?.find(
                                                      (x) =>
                                                        x.tmt_id ===
                                                        item.tmm_time,
                                                    )?.[timeingLang()]
                                                  : ""}
                                              </Text>
                                            )}
                                            {dentalMedicationOption?.medicine_option?.includes(
                                              "duration",
                                            ) && (
                                              <Text
                                                style={[
                                                  styles.cell,
                                                  {
                                                    flex: 0.53,
                                                    color: "#171725",
                                                    fontFamily: getFont(),
                                                    fontSize:
                                                      PX_TO_PT *
                                                      printSettings
                                                        ?.page_format
                                                        ?.font_size,
                                                    fontWeight: 400,
                                                  },
                                                ]}
                                              >
                                                {EXTRA_OPTIONS.some(
                                                  (x) =>
                                                    x.value ==
                                                    item.tmm_duration_type,
                                                )
                                                  ? durationLang(
                                                      capitalize(
                                                        item.tmm_duration_type,
                                                        true,
                                                      ),
                                                    )
                                                  : isNumeric(item.tmm_days)
                                                    ? `${item.tmm_days} ${durationLang(item.tmm_duration_type)}`
                                                    : "-"}
                                              </Text>
                                            )}
                                            {dentalMedicationOption?.medicine_option?.includes(
                                              "quantity",
                                            ) && (
                                              <Text
                                                style={[
                                                  styles.cell,
                                                  {
                                                    flex: 0.18,
                                                    color: "#171725",
                                                    fontFamily:
                                                      printSettings?.page_format
                                                        ?.font_family,
                                                    fontSize:
                                                      PX_TO_PT *
                                                      printSettings
                                                        ?.page_format
                                                        ?.font_size,
                                                    fontWeight: 400,
                                                  },
                                                ]}
                                              >
                                                {item.display_qty
                                                  ? item.display_qty
                                                  : "-"}
                                              </Text>
                                            )}
                                            {dentalMedicationOption?.medicine_option?.includes(
                                              "note",
                                            ) && (
                                              <Text
                                                style={[
                                                  styles.cell,
                                                  {
                                                    flex: 0.7,
                                                    color: "#171725",
                                                    fontFamily:
                                                      getIndianLanguageFont(
                                                        item.tmm_remarks,
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_family,
                                                      ),
                                                    fontSize:
                                                      PX_TO_PT *
                                                      printSettings
                                                        ?.page_format
                                                        ?.font_size,
                                                    fontWeight: 400,
                                                  },
                                                ]}
                                              >
                                                {item.tmm_remarks
                                                  ? item.tmm_remarks
                                                  : "-"}
                                              </Text>
                                            )}
                                          </View>
                                        </View>
                                      ),
                                    )}
                                  </View>
                                </View>
                              )}

                              {hasTeethData && (
                                <View style={styles.dentalQuadrantGrid}>
                                  {[0, 1].map((rowIndex) => (
                                    <View key={`dq-row-${rowIndex}`} style={styles.dentalQuadrantRow} wrap={false}>
                                      {dentalQuadrantSections.slice(rowIndex * 2, rowIndex * 2 + 2).map((section, idx) => {
                                        const isLastCol = idx === 1;
                                        const isLastRow = rowIndex === 1;
                                        return (
                                          <View
                                            key={section.key}
                                            style={{
                                              ...styles.dentalQuadrantCell,
                                              borderRight: isLastCol ? "0px solid #171725" : styles.dentalQuadrantCell.borderRight,
                                              borderBottom: isLastRow ? "0px solid #171725" : styles.dentalQuadrantCell.borderBottom,
                                            }}
                                          >
                                            <Text
                                              style={{
                                                ...styles.dentalQuadrantTitle,
                                                fontFamily: baseFontFamily,
                                                fontSize: baseFontSize,
                                                fontWeight: 600,
                                              }}
                                            >
                                              {section.label}
                                            </Text>
                                            {(dentalTeethBySection?.[section.key] || []).map((tooth, i) => (
                                              <Text
                                                key={`${section.key}-${i}`}
                                                style={{
                                                  ...styles.dentalListItem,
                                                  fontFamily: baseFontFamily,
                                                  fontSize: baseFontSize,
                                                }}
                                              >
                                                {`Tooth ${tooth?.toothNum ?? ""}: ${tooth?.diagnose ?? ""}`}
                                              </Text>
                                            ))}
                                          </View>
                                        );
                                      })}
                                    </View>
                                  ))}
                                </View>
                              )}

                              {dentalDiagnosisRows.length > 0 && (
                                <View style={styles.dentalTable}>
                                  <View style={styles.dentalHeaderRow}>
                                    <View style={styles.dentalHeaderCell}>
                                      <Text
                                        style={{
                                          fontFamily: baseFontFamily,
                                          fontSize: baseFontSize,
                                          fontWeight: 600,
                                        }}
                                      >
                                        Diagnosis Field
                                      </Text>
                                    </View>
                                    <View style={styles.dentalHeaderCell}>
                                      <Text
                                        style={{
                                          fontFamily: baseFontFamily,
                                          fontSize: baseFontSize,
                                          fontWeight: 600,
                                        }}
                                      >
                                        Selected Values
                                      </Text>
                                    </View>
                                  </View>
                                  {dentalDiagnosisRows.map((row) => (
                                    <View key={`dx-${row.key}`} style={styles.dentalRow}>
                                      <View style={styles.dentalCellLabel}>
                                        <Text
                                          style={{
                                            fontFamily: baseFontFamily,
                                            fontSize: baseFontSize,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {row.label}
                                        </Text>
                                      </View>
                                      <View style={styles.dentalCellValue}>
                                        <Text
                                          style={{
                                            fontFamily: baseFontFamily,
                                            fontSize: baseFontSize,
                                            fontWeight: 400,
                                          }}
                                        >
                                          {row.value}
                                        </Text>
                                      </View>
                                    </View>
                                  ))}
                                </View>
                              )}

                              {hasToothDiagramNotes && (
                                <View style={styles.dentalTable}>
                                  <View style={styles.dentalRow}>
                                    <View style={styles.dentalCellLabel}>
                                      <Text
                                        style={{
                                          fontFamily: baseFontFamily,
                                          fontSize: baseFontSize,
                                          fontWeight: 500,
                                        }}
                                      >
                                        TOOTH DIAGRAM NOTES
                                      </Text>
                                    </View>
                                    <View style={styles.dentalCellValue}>
                                      <Text
                                        style={{
                                          fontFamily: baseFontFamily,
                                          fontSize: baseFontSize,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {dentalToothDiagramNotes}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              )}

                              {dentalTreatmentRowsFiltered.length > 0 && (
                                <>
                                  <Text
                                    style={{
                                      marginTop: PX_TO_PT * 6,
                                      fontFamily: baseFontFamily,
                                      fontSize: baseFontSize,
                                      fontWeight: 600,
                                    }}
                                  >
                                    TREATMENT PLAN(S)
                                  </Text>
                                  <View style={styles.dentalTable}>
                                    <View style={styles.dentalHeaderRow}>
                                      {["S NO", "TREATMENT", "TOOTH NUMBER", "RATE", "COUNT", "ESTIMATE"].map((label) => (
                                        <View key={label} style={styles.dentalHeaderCell}>
                                          <Text
                                            style={{
                                              fontFamily: baseFontFamily,
                                              fontSize: baseFontSize,
                                              fontWeight: 600,
                                            }}
                                          >
                                            {label}
                                          </Text>
                                        </View>
                                      ))}
                                    </View>
                                    {dentalTreatmentRowsFiltered.map((item, i) => (
                                      <View key={`tp-${i}`} style={styles.dentalRow}>
                                        {[item?.srno, item?.treatment, item?.toothNum, item?.rate, item?.count, item?.estimate].map((val, idx) => (
                                          <View key={`${i}-${idx}`} style={styles.dentalCellValue}>
                                            <Text
                                              style={{
                                                fontFamily: baseFontFamily,
                                                fontSize: baseFontSize,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {val ?? ""}
                                            </Text>
                                          </View>
                                        ))}
                                      </View>
                                    ))}
                                  </View>
                                </>
                              )}

                              {(dentalWorkDoneRowsFiltered.length > 0 || hasWorkDoneNotes) && (
                                <>
                                  <Text
                                    style={{
                                      marginTop: PX_TO_PT * 6,
                                      fontFamily: baseFontFamily,
                                      fontSize: baseFontSize,
                                      fontWeight: 600,
                                    }}
                                  >
                                    WORK DONE
                                  </Text>
                                  {dentalWorkDoneRowsFiltered.length > 0 && (
                                    <View style={styles.dentalTable}>
                                      <View style={styles.dentalHeaderRow}>
                                        {[
                                          "DATE",
                                          "WORK DONE",
                                          "PTR",
                                          "TT REVIEW",
                                          "PAYMENT",
                                          "BALANCE",
                                          "REMARKS",
                                        ].map((label, idx) => (
                                          <View
                                            key={label}
                                            style={{
                                              ...styles.dentalHeaderCell,
                                              flex: idx === 1 ? 4 : 1,
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontFamily: baseFontFamily,
                                                fontSize: baseFontSize,
                                                fontWeight: 600,
                                              }}
                                            >
                                              {label}
                                            </Text>
                                          </View>
                                        ))}
                                      </View>
                                        {dentalWorkDoneRowsFiltered.map((item, i) => (
                                          <View key={`wd-${i}`} style={styles.dentalRow}>
                                            {[
                                              item?.date,
                                              buildWorkDoneText(item),
                                              item?.ptr,
                                              item?.ttReview,
                                              item?.payment,
                                              item?.balance,
                                              item?.remarks,
                                            ].map((val, idx) => (
                                              <View
                                                key={`${i}-${idx}`}
                                                style={{
                                                  ...styles.dentalCellValue,
                                                  flex: idx === 1 ? 4 : 1,
                                                }}
                                              >
                                              <Text
                                                style={{
                                                  fontFamily: baseFontFamily,
                                                  fontSize: baseFontSize,
                                                  fontWeight: 400,
                                                }}
                                              >
                                                {val ?? ""}
                                              </Text>
                                            </View>
                                          ))}
                                        </View>
                                      ))}
                                    </View>
                                  )}
                                  {hasWorkDoneNotes && (
                                    <View style={styles.dentalTable}>
                                      <View style={styles.dentalRow}>
                                        <View style={styles.dentalCellLabel}>
                                          <Text
                                            style={{
                                              fontFamily: baseFontFamily,
                                              fontSize: baseFontSize,
                                              fontWeight: 500,
                                            }}
                                          >
                                            WORK DONE NOTES
                                          </Text>
                                        </View>
                                        <View style={styles.dentalCellValue}>
                                          <Text
                                            style={{
                                              fontFamily: baseFontFamily,
                                              fontSize: baseFontSize,
                                              fontWeight: 400,
                                            }}
                                          >
                                            {dentalWorkDone?.notes ?? ""}
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  )}
                                </>
                              )}
                            </View>
                            )}
                            {digitizedData?.symptoms?.some(
                              (item) => item?.name || item?.lineItem,
                            ) && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Symptoms:
                                  </Text>
                                  {digitizedData?.symptoms?.map((item, i) => {
                                    return (
                                      <View key={i}>
                                        {(("name" in item &&
                                          item?.name != "") ||
                                          ("lineItem" in item &&
                                            item?.lineItem != "")) && (
                                          <>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              &nbsp;{"\n"}
                                              &nbsp;&nbsp;&nbsp;&nbsp;
                                              {"\u2022"}&nbsp;
                                            </Text>

                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {item?.name && item?.lineItem
                                                ? item.lineItem.includes(
                                                    item.name,
                                                  )
                                                  ? item.lineItem
                                                  : `${item.name} (${item.lineItem})`
                                                : item?.lineItem || item?.name}
                                            </Text>
                                          </>
                                        )}
                                      </View>
                                    );
                                  })}
                                </Text>
                              </View>
                            )}

                            {(
                              digitizedData?.examination ||
                              digitizedData?.examinations
                            )?.some((item) => item?.name || item?.lineItem) && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Examinations:
                                  </Text>
                                  {(
                                    digitizedData?.examination ||
                                    digitizedData?.examinations
                                  )?.map((item, i) => {
                                    const hasLineItem =
                                      item?.lineItem != null &&
                                      item?.lineItem !== "";
                                    const hasName =
                                      item?.name != null && item?.name !== "";
                                    const hasExamination =
                                      hasLineItem || hasName;
                                    let examinationText = null;
                                    if (hasName && hasLineItem) {
                                      examinationText = item.lineItem.includes(
                                        item.name,
                                      )
                                        ? item.lineItem
                                        : `${item.name} (${item.lineItem})`;
                                    } else if (hasName) {
                                      examinationText =
                                        item?.notes != null &&
                                        item?.notes !== ""
                                          ? `${item.name} (${item.notes})`
                                          : item.name;
                                    } else if (hasLineItem) {
                                      examinationText = item.lineItem;
                                    }
                                    return (
                                      <View key={i}>
                                        {hasExamination && examinationText && (
                                          <>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              &nbsp;{"\n"}
                                              &nbsp;&nbsp;&nbsp;&nbsp;
                                              {"\u2022"}&nbsp;
                                            </Text>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {examinationText}
                                            </Text>
                                          </>
                                        )}
                                      </View>
                                    );
                                  })}
                                </Text>
                              </View>
                            )}

                            {digitizedData?.diagnosis?.some(
                              (item) => item?.name || item?.lineItem,
                            ) && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Diagnosis:
                                  </Text>
                                  {digitizedData?.diagnosis?.map((item, i) => {
                                    const hasLineItem =
                                      item?.lineItem != null &&
                                      item?.lineItem !== "";
                                    const hasName =
                                      item?.name != null && item?.name !== "";
                                    const hasDiagnosis = hasLineItem || hasName;
                                    const diagnosisExtra = [
                                      item?.since,
                                      item?.status,
                                      item?.notes,
                                    ]
                                      .filter((v) => v != null && v !== "")
                                      .join(", ");
                                    let diagnosisText = null;
                                    if (hasName && hasLineItem) {
                                      diagnosisText = item.lineItem.includes(
                                        item.name,
                                      )
                                        ? item.lineItem
                                        : `${item.name} (${item.lineItem})`;
                                    } else if (hasName) {
                                      diagnosisText = diagnosisExtra
                                        ? `${item.name} (${diagnosisExtra})`
                                        : item.name;
                                    } else if (hasLineItem) {
                                      diagnosisText = item.lineItem;
                                    }
                                    return (
                                      <View key={i}>
                                        {hasDiagnosis && diagnosisText && (
                                          <>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              &nbsp;{"\n"}
                                              &nbsp;&nbsp;&nbsp;&nbsp;
                                              {"\u2022"}&nbsp;
                                            </Text>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {diagnosisText}
                                            </Text>
                                          </>
                                        )}
                                      </View>
                                    );
                                  })}
                                </Text>
                              </View>
                            )}

                            {digitizedData?.medications?.some(
                              (item) => item?.refinedName || item?.name,
                            ) && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Medication:
                                  </Text>
                                </Text>
                                {isVoiceOrAmbientV2 ? (
                                  <View
                                    style={[styles.table, { marginTop: 0 }]}
                                  >
                                    {/* Table Header */}
                                    <View
                                      style={[
                                        styles.tableRow,
                                        { borderTop: "1px solid #171725" },
                                      ]}
                                      fixed
                                    >
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "5%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          S.NO
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "26%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          MEDICINE NAME
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "13%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          UNIT PER DOSE
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "13%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          FREQUENCY
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "11%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          DURATION
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "10%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          QTY
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "22%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                            borderRight: "none",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          NOTE
                                        </Text>
                                      </View>
                                    </View>

                                    {/* Table Rows */}
                                    {digitizedData?.medications?.map(
                                      (item, i) => {
                                        const unitPerDose = (
                                          item?.unitPerDose ||
                                          item?.dosage ||
                                          item?.unit_per_dose ||
                                          ""
                                        )
                                          .toString()
                                          .trim();
                                        const when = (
                                          item?.when ||
                                          item?.schedule ||
                                          item?.timing ||
                                          ""
                                        )
                                          .toString()
                                          .trim();
                                        const note = (
                                          item?.note ||
                                          item?.notes ||
                                          ""
                                        )
                                          .toString()
                                          .trim();
                                        const rawQuantity =
                                          item?.quantity ??
                                          item?.qty ??
                                          item?.quantityValue ??
                                          item?.quantity_value ??
                                          item?.quantityText ??
                                          item?.quantity_text ??
                                          item?.dispense_quantity ??
                                          item?.dispenseQuantity ??
                                          item?.quantityDispensed ??
                                          item?.quantity_dispensed ??
                                          null;
                                        const quantity =
                                          rawQuantity === null ||
                                          rawQuantity === undefined
                                            ? ""
                                            : `${rawQuantity}`.trim();

                                        return (
                                          <View
                                            key={i}
                                            style={[
                                              styles.tableRow,
                                              {
                                                flexDirection: "row",
                                                minHeight: PX_TO_PT * 30,
                                              },
                                            ]}
                                          >
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "5%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  { fontWeight: 500 },
                                                ]}
                                                wrap={true}
                                              >
                                                {i + 1}
                                              </Text>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "26%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  {
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                  },
                                                ]}
                                                wrap={true}
                                              >
                                                {item?.name ||
                                                  item?.refinedName ||
                                                  "N/A"}
                                              </Text>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "13%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  {
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                  },
                                                ]}
                                                wrap={true}
                                              >
                                                {unitPerDose || "-"}
                                              </Text>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "13%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  {
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                  },
                                                ]}
                                                wrap={true}
                                              >
                                                {(item?.frequency || "")
                                                  .toString()
                                                  .trim() || "-"}
                                                {when ? `\n${when}` : ""}
                                              </Text>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "11%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  {
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                  },
                                                ]}
                                                wrap={true}
                                              >
                                                {(item?.duration || "")
                                                  .toString()
                                                  .trim() || "-"}
                                              </Text>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "10%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  {
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                  },
                                                ]}
                                                wrap={true}
                                              >
                                                {Number(quantity)
                                                  ? quantity
                                                  : "-"}
                                              </Text>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "22%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                  borderRight: "none",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  {
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                  },
                                                ]}
                                                wrap={true}
                                              >
                                                {note || "-"}
                                              </Text>
                                            </View>
                                          </View>
                                        );
                                      },
                                    )}
                                  </View>
                                ) : (
                                  <Text>
                                    {digitizedData?.medications?.map(
                                      (item, i) => {
                                        const medName =
                                          item?.refinedName || item?.name;
                                        return (
                                          <Text key={i}>
                                            {medName != null &&
                                              medName != "" && (
                                                <>
                                                  <Text
                                                    style={{
                                                      color: "#171725",
                                                      fontFamily:
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_family,
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 500,
                                                    }}
                                                  >
                                                    {i === 0 ? "" : "\n"}
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    {"\u2022"}&nbsp;
                                                  </Text>

                                                  {medName != null &&
                                                    medName != "" && (
                                                      <Text
                                                        style={{
                                                          color: "#171725",
                                                          fontFamily:
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_family,
                                                          fontSize:
                                                            PX_TO_PT *
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_size,
                                                          fontWeight: 400,
                                                        }}
                                                      >
                                                        {medName}
                                                      </Text>
                                                    )}

                                                  {"lineItem" in item &&
                                                    item?.lineItem != "" && (
                                                      <Text
                                                        style={{
                                                          color: "#171725",
                                                          fontFamily:
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_family,
                                                          fontSize:
                                                            PX_TO_PT *
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_size,
                                                          fontWeight: 400,
                                                        }}
                                                      >
                                                        &nbsp;({item?.lineItem})
                                                      </Text>
                                                    )}
                                                </>
                                              )}
                                          </Text>
                                        );
                                      },
                                    )}
                                  </Text>
                                )}
                              </View>
                            )}

                            {(
                              digitizedData?.tests ||
                              digitizedData?.labInvestigation
                            )?.some(
                              (item) => item?.refinedName || item?.name,
                            ) && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Lab Investigation:
                                  </Text>
                                </Text>
                                {isVoiceOrAmbientV2 ? (
                                  <View
                                    style={[styles.table, { marginTop: 0 }]}
                                  >
                                    {/* Table Header */}
                                    <View
                                      style={[
                                        styles.tableRow,
                                        { borderTop: "1px solid #171725" },
                                      ]}
                                      fixed
                                    >
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "50%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          NAME
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "50%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                            borderRight: "none",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          NOTE
                                        </Text>
                                      </View>
                                    </View>

                                    {/* Table Rows */}
                                    {(
                                      digitizedData?.tests ||
                                      digitizedData?.labInvestigation
                                    )?.map((item, i) => {
                                      const name =
                                        (item?.name || item?.refinedName || "")
                                          .toString()
                                          .trim() || "-";
                                      const noteValue = (
                                        item?.note ||
                                        item?.notes ||
                                        item?.instruction ||
                                        ""
                                      )
                                        .toString()
                                        .trim();
                                      const displayNote = noteValue || "-";

                                      return (
                                        <View
                                          key={i}
                                          style={[
                                            styles.tableRow,
                                            {
                                              height: PX_TO_PT * 30,
                                              flexDirection: "row",
                                            },
                                          ]}
                                        >
                                          <View
                                            style={[
                                              styles.tableCell,
                                              {
                                                width: "50%",
                                                padding: PX_TO_PT * 3,
                                                justifyContent: "center",
                                              },
                                            ]}
                                          >
                                            <Text
                                              style={[
                                                styles.cellText,
                                                {
                                                  fontWeight: 500,
                                                  lineHeight: 1.2,
                                                },
                                              ]}
                                              wrap={true}
                                            >
                                              {name}
                                            </Text>
                                          </View>
                                          <View
                                            style={[
                                              styles.tableCell,
                                              {
                                                width: "50%",
                                                padding: PX_TO_PT * 3,
                                                justifyContent: "center",
                                                borderRight: "none",
                                              },
                                            ]}
                                          >
                                            <Text
                                              style={[
                                                styles.cellText,
                                                {
                                                  fontWeight: 500,
                                                  lineHeight: 1.2,
                                                },
                                              ]}
                                              wrap={true}
                                            >
                                              {displayNote}
                                            </Text>
                                          </View>
                                        </View>
                                      );
                                    })}
                                  </View>
                                ) : (
                                  <Text>
                                    {(
                                      digitizedData?.tests ||
                                      digitizedData?.labInvestigation
                                    )?.map((item, i) => {
                                      const testName =
                                        item?.refinedName || item?.name;
                                      return (
                                        <View key={i}>
                                          {testName != null &&
                                            testName != "" && (
                                              <>
                                                <Text
                                                  style={{
                                                    color: "#171725",
                                                    fontFamily:
                                                      printSettings?.page_format
                                                        ?.font_family,
                                                    fontSize:
                                                      PX_TO_PT *
                                                      printSettings?.page_format
                                                        ?.font_size,
                                                    fontWeight: 500,
                                                  }}
                                                >
                                                  {i === 0 ? "" : "\n"}
                                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                                  {"\u2022"}&nbsp;
                                                </Text>

                                                {testName != null &&
                                                  testName != "" && (
                                                    <Text
                                                      style={{
                                                        color: "#171725",
                                                        fontFamily:
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_family,
                                                        fontSize:
                                                          PX_TO_PT *
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_size,
                                                        fontWeight: 400,
                                                      }}
                                                    >
                                                      {testName}
                                                    </Text>
                                                  )}

                                                {"lineItem" in item &&
                                                  item?.lineItem != "" && (
                                                    <Text
                                                      style={{
                                                        color: "#171725",
                                                        fontFamily:
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_family,
                                                        fontSize:
                                                          PX_TO_PT *
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_size,
                                                        fontWeight: 400,
                                                      }}
                                                    >
                                                      &nbsp;({item?.lineItem})
                                                    </Text>
                                                  )}
                                              </>
                                            )}
                                        </View>
                                      );
                                    })}
                                  </Text>
                                )}
                              </View>
                            )}

                            {digitizedData?.advice?.length > 0 && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Advice:
                                  </Text>
                                  {digitizedData?.advice?.map((item, i) => {
                                    const adviceText =
                                      item?.advice_name ?? item;
                                    return (
                                      <View key={i}>
                                        {adviceText != null &&
                                          adviceText !== "" && (
                                            <>
                                              <Text
                                                style={{
                                                  color: "#171725",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                }}
                                              >
                                                &nbsp;{"\n"}
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                {"\u2022"}&nbsp;
                                              </Text>

                                              <Text
                                                style={{
                                                  color: "#171725",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 400,
                                                }}
                                              >
                                                {adviceText}
                                              </Text>
                                            </>
                                          )}
                                      </View>
                                    );
                                  })}
                                </Text>
                              </View>
                            )}

                            {digitizedData?.vaccinations?.some(
                              (item) => item?.name,
                            ) && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Vaccinations:
                                  </Text>
                                  {digitizedData?.vaccinations?.map(
                                    (item, i) => {
                                      return (
                                        <View key={i}>
                                          {"name" in item &&
                                            item?.name != "" && (
                                              <>
                                                <Text
                                                  style={{
                                                    color: "#171725",
                                                    fontFamily:
                                                      printSettings?.page_format
                                                        ?.font_family,
                                                    fontSize:
                                                      PX_TO_PT *
                                                      printSettings?.page_format
                                                        ?.font_size,
                                                    fontWeight: 500,
                                                  }}
                                                >
                                                  &nbsp;{"\n"}
                                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                                  {"\u2022"}&nbsp;
                                                </Text>

                                                {"name" in item &&
                                                  item?.name != "" && (
                                                    <Text
                                                      style={{
                                                        color: "#171725",
                                                        fontFamily:
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_family,
                                                        fontSize:
                                                          PX_TO_PT *
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_size,
                                                        fontWeight: 400,
                                                      }}
                                                    >
                                                      {item?.name}
                                                    </Text>
                                                  )}

                                                {"lineItem" in item &&
                                                  item?.lineItem != "" && (
                                                    <Text
                                                      style={{
                                                        color: "#171725",
                                                        fontFamily:
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_family,
                                                        fontSize:
                                                          PX_TO_PT *
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_size,
                                                        fontWeight: 400,
                                                      }}
                                                    >
                                                      &nbsp;({item?.lineItem})
                                                    </Text>
                                                  )}
                                              </>
                                            )}
                                        </View>
                                      );
                                    },
                                  )}
                                </Text>
                              </View>
                            )}

                            {(() => {
                              const df = digitizedData?.dynamicFields;
                              const isArray = Array.isArray(df);
                              const hasNonEmptyField = (item) =>
                                item?.fields?.some(
                                  (f) =>
                                    typeof f === "object" &&
                                    Object.entries(f).some(
                                      ([k, v]) =>
                                        k !== "order" &&
                                        k !== "orader" &&
                                        v != null &&
                                        String(v).trim() !== "",
                                    ),
                                );
                              const toShow = isArray
                                ? (df || []).filter(hasNonEmptyField)
                                : null;
                              const hasData = isArray
                                ? toShow?.length > 0
                                : df &&
                                  Object.entries(df).some(
                                    ([k, v]) => v?.length > 0,
                                  );
                              return (
                                hasData && (
                                  <View style={{ marginTop: PX_TO_PT * 15 }}>
                                    <Text
                                      style={{ lineHeight: 1.4 }}
                                      wrap={false}
                                    >
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        }}
                                      >
                                        Custom Modules:
                                      </Text>
                                      {isArray
                                        ? (toShow || []).map((item, i) => {
                                            const modName =
                                              item?.title || item?.name;
                                            const fieldsWithData = (
                                              item?.fields || []
                                            ).filter(
                                              (f) =>
                                                typeof f === "object" &&
                                                Object.entries(f).some(
                                                  ([k, v]) =>
                                                    k !== "order" &&
                                                    k !== "orader" &&
                                                    v != null &&
                                                    String(v).trim() !== "",
                                                ),
                                            );
                                            if (fieldsWithData.length === 0)
                                              return null;
                                            const sortedFields = [
                                              ...fieldsWithData,
                                            ].sort(
                                              (a, b) =>
                                                (a?.order ?? a?.orader ?? 0) -
                                                (b?.order ?? b?.orader ?? 0),
                                            );
                                            return (
                                              <View key={i}>
                                                {
                                                  <>
                                                    <Text
                                                      style={{
                                                        color: "#171725",
                                                        fontFamily:
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_family,
                                                        fontSize:
                                                          PX_TO_PT *
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_size,
                                                        fontWeight: 500,
                                                      }}
                                                    >
                                                      &nbsp;{"\n"}
                                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                                      {"\u2022"}&nbsp;
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "#171725",
                                                        fontFamily:
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_family,
                                                        fontSize:
                                                          PX_TO_PT *
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_size,
                                                        fontWeight: 400,
                                                      }}
                                                    >
                                                      {modName || "Custom"}
                                                      {"notes" in item &&
                                                      item?.notes != ""
                                                        ? ` (${item?.notes})`
                                                        : ""}
                                                    </Text>
                                                    {sortedFields.map(
                                                      (f, fi) => {
                                                        const values =
                                                          Object.entries(f)
                                                            .filter(
                                                              ([k, v]) =>
                                                                k !== "order" &&
                                                                k !==
                                                                  "orader" &&
                                                                v != null &&
                                                                String(
                                                                  v,
                                                                ).trim() !== "",
                                                            )
                                                            .map(([k, v]) => v);
                                                        const order =
                                                          f?.order ??
                                                          f?.orader ??
                                                          fi;
                                                        const num = order + 1;
                                                        return values.length ? (
                                                          <Text
                                                            key={fi}
                                                            style={{
                                                              color: "#171725",
                                                              fontFamily:
                                                                printSettings
                                                                  ?.page_format
                                                                  ?.font_family,
                                                              fontSize:
                                                                PX_TO_PT *
                                                                printSettings
                                                                  ?.page_format
                                                                  ?.font_size,
                                                              fontWeight: 400,
                                                            }}
                                                          >
                                                            &nbsp;{"\n"}
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            {num})&nbsp;
                                                            {values.join(", ")}
                                                          </Text>
                                                        ) : null;
                                                      },
                                                    )}
                                                  </>
                                                }
                                              </View>
                                            );
                                          })
                                        : Object.entries(df || {}).map(
                                            ([key, values], index) =>
                                              values?.length > 0 ? (
                                                <View key={index}>
                                                  <Text
                                                    style={{
                                                      color: "#171725",
                                                      fontFamily:
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_family,
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 500,
                                                    }}
                                                  >
                                                    &nbsp;{"\n"}
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    {"\u2022"}&nbsp;
                                                    {key
                                                      .replace(
                                                        /([A-Z])/g,
                                                        " $1",
                                                      )
                                                      .replace(/^./, (str) =>
                                                        str.toUpperCase(),
                                                      )}
                                                  </Text>
                                                  {values?.map((item, i) => (
                                                    <Text
                                                      key={i}
                                                      style={{
                                                        color: "#171725",
                                                        fontFamily:
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_family,
                                                        fontSize:
                                                          PX_TO_PT *
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_size,
                                                        fontWeight: 400,
                                                      }}
                                                    >
                                                      &nbsp;{"\n"}
                                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                      {typeof item === "object"
                                                        ? item?.lineItem
                                                        : item}
                                                    </Text>
                                                  ))}
                                                </View>
                                              ) : null,
                                          )}
                                    </Text>
                                  </View>
                                )
                              );
                            })()}

                            {digitizedData?.others?.length > 0 && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Others:
                                  </Text>
                                  {digitizedData?.others?.map((item, i) => {
                                    return (
                                      <View key={i}>
                                        {item && item != "" && (
                                          <>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              &nbsp;{"\n"}
                                              &nbsp;&nbsp;&nbsp;&nbsp;
                                              {"\u2022"}&nbsp;
                                            </Text>

                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {item}
                                            </Text>
                                          </>
                                        )}
                                      </View>
                                    );
                                  })}
                                </Text>
                              </View>
                            )}

                            {!!digitizedData?.followUp && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Follow Up:
                                  </Text>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 400,
                                    }}
                                  >
                                    &nbsp;{digitizedData?.followUp}
                                  </Text>
                                </Text>
                              </View>
                            )}
                          </>
                        ) : (isSmartSyncPrescription &&
                            isVoiceRxDigitizeBool) ||
                          isAmbientVoiceRxDigitizeBool ? (
                          <>
                            {digitizedData?.symptoms?.some(
                              (item) => item?.name || item?.lineItem,
                            ) && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Symptoms:
                                  </Text>
                                  {digitizedData?.symptoms?.map((item, i) => {
                                    return (
                                      <View key={i}>
                                        {(("name" in item &&
                                          item?.name != "") ||
                                          ("lineItem" in item &&
                                            item?.lineItem != "")) && (
                                          <>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              &nbsp;{"\n"}
                                              &nbsp;&nbsp;&nbsp;&nbsp;
                                              {"\u2022"}&nbsp;
                                            </Text>

                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {item?.name && item?.lineItem
                                                ? item.lineItem.includes(
                                                    item.name,
                                                  )
                                                  ? item.lineItem
                                                  : `${item.name} (${item.lineItem})`
                                                : item?.lineItem || item?.name}
                                            </Text>
                                          </>
                                        )}
                                      </View>
                                    );
                                  })}
                                </Text>
                              </View>
                            )}

                            {(
                              digitizedData?.examinations ||
                              digitizedData?.examination
                            )?.some((item) => item?.name || item?.lineItem) && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Examinations:
                                  </Text>
                                  {(
                                    digitizedData?.examinations ||
                                    digitizedData?.examination
                                  )?.map((item, i) => {
                                    const hasLineItem =
                                      item?.lineItem != null &&
                                      item?.lineItem !== "";
                                    const hasName =
                                      item?.name != null && item?.name !== "";
                                    const hasExamination =
                                      hasLineItem || hasName;
                                    let examinationText = null;
                                    if (hasName && hasLineItem) {
                                      examinationText = item.lineItem.includes(
                                        item.name,
                                      )
                                        ? item.lineItem
                                        : `${item.name} (${item.lineItem})`;
                                    } else if (hasName) {
                                      examinationText =
                                        item?.notes != null &&
                                        item?.notes !== ""
                                          ? `${item.name} (${item.notes})`
                                          : item.name;
                                    } else if (hasLineItem) {
                                      examinationText = item.lineItem;
                                    }
                                    return (
                                      <View key={i}>
                                        {hasExamination && examinationText && (
                                          <>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              &nbsp;{"\n"}
                                              &nbsp;&nbsp;&nbsp;&nbsp;
                                              {"\u2022"}&nbsp;
                                            </Text>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {examinationText}
                                            </Text>
                                          </>
                                        )}
                                      </View>
                                    );
                                  })}
                                </Text>
                              </View>
                            )}

                            {digitizedData?.diagnosis?.some(
                              (item) => item?.name || item?.lineItem,
                            ) && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Diagnosis:
                                  </Text>
                                  {digitizedData?.diagnosis?.map((item, i) => {
                                    const hasLineItem =
                                      item?.lineItem != null &&
                                      item?.lineItem !== "";
                                    const hasName =
                                      item?.name != null && item?.name !== "";
                                    const hasDiagnosis = hasLineItem || hasName;
                                    const diagnosisExtra = [
                                      item?.since,
                                      item?.status,
                                      item?.notes,
                                    ]
                                      .filter((v) => v != null && v !== "")
                                      .join(", ");
                                    let diagnosisText = null;
                                    if (hasName && hasLineItem) {
                                      diagnosisText = item.lineItem.includes(
                                        item.name,
                                      )
                                        ? item.lineItem
                                        : `${item.name} (${item.lineItem})`;
                                    } else if (hasName) {
                                      diagnosisText = diagnosisExtra
                                        ? `${item.name} (${diagnosisExtra})`
                                        : item.name;
                                    } else if (hasLineItem) {
                                      diagnosisText = item.lineItem;
                                    }
                                    return (
                                      <View key={i}>
                                        {hasDiagnosis && diagnosisText && (
                                          <>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              &nbsp;{"\n"}
                                              &nbsp;&nbsp;&nbsp;&nbsp;
                                              {"\u2022"}&nbsp;
                                            </Text>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              {diagnosisText}
                                            </Text>
                                          </>
                                        )}
                                      </View>
                                    );
                                  })}
                                </Text>
                              </View>
                            )}

                            {digitizedData?.medications?.length > 0 && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text
                                  style={{
                                    color: "#171725",
                                    fontFamily:
                                      printSettings?.page_format?.font_family,
                                    fontSize:
                                      PX_TO_PT *
                                      printSettings?.page_format?.font_size,
                                    fontWeight: 500,
                                  }}
                                >
                                  Medications (Rx):
                                </Text>

                                {isVoiceOrAmbientV2 ? (
                                  <View
                                    style={[styles.table, { marginTop: 0 }]}
                                  >
                                    {/* Table Header */}
                                    <View
                                      style={[
                                        styles.tableRow,
                                        { borderTop: "1px solid #171725" },
                                      ]}
                                      fixed
                                    >
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "5%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          S.NO
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "26%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          MEDICINE NAME
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "13%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          UNIT PER DOSE
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "13%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          FREQUENCY
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "11%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          DURATION
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "10%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          QTY
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "22%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                            borderRight: "none",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          NOTE
                                        </Text>
                                      </View>
                                    </View>

                                    {/* Table Rows */}
                                    {digitizedData?.medications?.map(
                                      (item, i) => {
                                        const unitPerDose = (
                                          item?.unitPerDose ||
                                          item?.dosage ||
                                          item?.unit_per_dose ||
                                          ""
                                        )
                                          .toString()
                                          .trim();
                                        const when = (
                                          item?.when ||
                                          item?.schedule ||
                                          item?.timing ||
                                          ""
                                        )
                                          .toString()
                                          .trim();
                                        const note = (
                                          item?.note ||
                                          item?.notes ||
                                          ""
                                        )
                                          .toString()
                                          .trim();
                                        const rawQuantity =
                                          item?.quantity ??
                                          item?.qty ??
                                          item?.quantityValue ??
                                          item?.quantity_value ??
                                          item?.quantityText ??
                                          item?.quantity_text ??
                                          item?.dispense_quantity ??
                                          item?.dispenseQuantity ??
                                          item?.quantityDispensed ??
                                          item?.quantity_dispensed ??
                                          null;
                                        const quantity =
                                          rawQuantity === null ||
                                          rawQuantity === undefined
                                            ? ""
                                            : `${rawQuantity}`.trim();
                                        // For ambient voice rx: prioritize fuzzyCorrectedName, then groundingMedicineName, then name
                                        const medicationName =
                                          isAmbientVoiceRxDigitizeBool
                                            ? item?.metadata
                                                ?.fuzzyCorrectedName &&
                                              item?.metadata?.fuzzyCorrectedName.trim() !==
                                                ""
                                              ? item?.metadata
                                                  ?.fuzzyCorrectedName
                                              : item?.groundingMedicineName &&
                                                  item?.groundingMedicineName.trim() !==
                                                    ""
                                                ? item?.groundingMedicineName
                                                : item?.name
                                            : item?.name;
                                        // Get generic name from metadata if available
                                        const genericName =
                                          item?.metadata?.tmm_generic || "";

                                        return (
                                          <View
                                            key={i}
                                            style={[
                                              styles.tableRow,
                                              {
                                                flexDirection: "row",
                                                minHeight: PX_TO_PT * 30,
                                              },
                                            ]}
                                          >
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "5%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  { fontWeight: 500 },
                                                ]}
                                                wrap={true}
                                              >
                                                {i + 1}
                                              </Text>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "26%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <View>
                                                <Text
                                                  style={[
                                                    styles.cellText,
                                                    {
                                                      fontWeight: 500,
                                                      lineHeight: 1.2,
                                                    },
                                                  ]}
                                                  wrap={true}
                                                >
                                                  {medicationName || "N/A"}
                                                </Text>
                                                {genericName &&
                                                  genericName.trim() !== "" && (
                                                    <Text
                                                      style={[
                                                        styles.cellText,
                                                        {
                                                          fontWeight: 400,
                                                          fontSize:
                                                            PX_TO_PT *
                                                              printSettings
                                                                ?.page_format
                                                                ?.font_size -
                                                            2,
                                                          lineHeight: 1.2,
                                                        },
                                                      ]}
                                                      wrap={true}
                                                    >
                                                      {genericName}
                                                    </Text>
                                                  )}
                                              </View>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "13%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  {
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                  },
                                                ]}
                                                wrap={true}
                                              >
                                                {unitPerDose || "-"}
                                              </Text>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "13%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  {
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                  },
                                                ]}
                                                wrap={true}
                                              >
                                                {(item?.frequency || "")
                                                  .toString()
                                                  .trim() || "-"}
                                                {when ? `\n${when}` : ""}
                                              </Text>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "11%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  {
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                  },
                                                ]}
                                                wrap={true}
                                              >
                                                {(item?.duration || "")
                                                  .toString()
                                                  .trim() || "-"}
                                              </Text>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "10%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  {
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                  },
                                                ]}
                                                wrap={true}
                                              >
                                                {Number(quantity)
                                                  ? quantity
                                                  : "-"}
                                              </Text>
                                            </View>
                                            <View
                                              style={[
                                                styles.tableCell,
                                                {
                                                  width: "22%",
                                                  padding: PX_TO_PT * 3,
                                                  justifyContent: "center",
                                                  borderRight: "none",
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[
                                                  styles.cellText,
                                                  {
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                  },
                                                ]}
                                                wrap={true}
                                              >
                                                {note || "-"}
                                              </Text>
                                            </View>
                                          </View>
                                        );
                                      },
                                    )}
                                  </View>
                                ) : (
                                  <Text
                                    style={{ lineHeight: 1.4 }}
                                    wrap={false}
                                  >
                                    {digitizedData?.medications?.map(
                                      (item, i) => {
                                        // For ambient voice rx: prioritize fuzzyCorrectedName, then groundingMedicineName, then use lineItem
                                        let displayText = item?.lineItem || "";
                                        if (
                                          isAmbientVoiceRxDigitizeBool &&
                                          item?.lineItem
                                        ) {
                                          const medicationName =
                                            item?.metadata
                                              ?.fuzzyCorrectedName &&
                                            item?.metadata?.fuzzyCorrectedName.trim() !==
                                              ""
                                              ? item?.metadata
                                                  ?.fuzzyCorrectedName
                                              : item?.groundingMedicineName &&
                                                  item?.groundingMedicineName.trim() !==
                                                    ""
                                                ? item?.groundingMedicineName
                                                : item?.name || "";
                                          // Replace the first part of lineItem (medicine name) with the correct name
                                          if (
                                            medicationName &&
                                            item?.lineItem
                                          ) {
                                            const lineItemParts =
                                              item?.lineItem.split(",");
                                            if (lineItemParts.length > 0) {
                                              lineItemParts[0] = medicationName;
                                              displayText =
                                                lineItemParts.join(",");
                                            }
                                          }
                                        }
                                        return (
                                          <View key={i}>
                                            {"lineItem" in item &&
                                              item?.lineItem != "" && (
                                                <>
                                                  <Text
                                                    style={{
                                                      color: "#171725",
                                                      fontFamily:
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_family,
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 500,
                                                    }}
                                                  >
                                                    &nbsp;{i === 0 ? "" : "\n"}
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    {"\u2022"}&nbsp;
                                                  </Text>

                                                  <Text
                                                    style={{
                                                      color: "#171725",
                                                      fontFamily:
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_family,
                                                      fontSize:
                                                        PX_TO_PT *
                                                        printSettings
                                                          ?.page_format
                                                          ?.font_size,
                                                      fontWeight: 400,
                                                    }}
                                                  >
                                                    {displayText}
                                                  </Text>
                                                </>
                                              )}
                                          </View>
                                        );
                                      },
                                    )}
                                  </Text>
                                )}
                              </View>
                            )}

                            {((isVoiceRxDigitizeBool &&
                              (
                                digitizedData?.labInvestigation ||
                                digitizedData?.tests
                              )?.length > 0) ||
                              (isAmbientVoiceRxDigitizeBool &&
                                (
                                  digitizedData?.labInvestigation ||
                                  digitizedData?.tests
                                )?.length > 0)) && (
                              <View
                                style={{ marginTop: PX_TO_PT * 15 }}
                                wrap={false}
                              >
                                <Text
                                  style={{
                                    color: "#171725",
                                    fontFamily:
                                      printSettings?.page_format?.font_family,
                                    fontSize:
                                      PX_TO_PT *
                                      printSettings?.page_format?.font_size,
                                    fontWeight: 500,
                                  }}
                                >
                                  {INVESTIGATION_TITLE}:
                                </Text>

                                {isVoiceOrAmbientV2 ? (
                                  <View
                                    style={[styles.table, { marginTop: 0 }]}
                                  >
                                    {/* Table Header */}
                                    <View
                                      style={[
                                        styles.tableRow,
                                        { borderTop: "1px solid #171725" },
                                      ]}
                                    >
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "50%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          NAME
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.tableCell,
                                          {
                                            width: "50%",
                                            padding: PX_TO_PT * 3,
                                            justifyContent: "center",
                                            borderRight: "none",
                                          },
                                        ]}
                                      >
                                        <Text style={[styles.cellText]}>
                                          NOTE
                                        </Text>
                                      </View>
                                    </View>

                                    {/* Table Rows */}
                                    {(
                                      digitizedData?.labInvestigation ||
                                      digitizedData?.tests
                                    )?.map((item, i) => {
                                      const name =
                                        (item?.name || item?.refinedName || "")
                                          .toString()
                                          .trim() || "-";
                                      const noteValue = (
                                        item?.note ||
                                        item?.notes ||
                                        item?.instruction ||
                                        ""
                                      )
                                        .toString()
                                        .trim();
                                      const displayNote = noteValue || "-";

                                      return (
                                        <View
                                          key={i}
                                          style={[
                                            styles.tableRow,
                                            {
                                              height: PX_TO_PT * 30,
                                              flexDirection: "row",
                                            },
                                          ]}
                                        >
                                          <View
                                            style={[
                                              styles.tableCell,
                                              {
                                                width: "50%",
                                                padding: PX_TO_PT * 3,
                                                justifyContent: "center",
                                              },
                                            ]}
                                          >
                                            <Text
                                              style={[
                                                styles.cellText,
                                                {
                                                  fontWeight: 500,
                                                  lineHeight: 1.2,
                                                },
                                              ]}
                                              wrap={true}
                                            >
                                              {name}
                                            </Text>
                                          </View>
                                          <View
                                            style={[
                                              styles.tableCell,
                                              {
                                                width: "50%",
                                                padding: PX_TO_PT * 3,
                                                justifyContent: "center",
                                                borderRight: "none",
                                              },
                                            ]}
                                          >
                                            <Text
                                              style={[
                                                styles.cellText,
                                                {
                                                  fontWeight: 500,
                                                  lineHeight: 1.2,
                                                },
                                              ]}
                                              wrap={true}
                                            >
                                              {displayNote}
                                            </Text>
                                          </View>
                                        </View>
                                      );
                                    })}
                                  </View>
                                ) : (
                                  <View>
                                    {(
                                      digitizedData?.labInvestigation ||
                                      digitizedData?.tests
                                    )?.map((item, i) => {
                                      const name =
                                        (item?.name || "").trim() ||
                                        "Lab Investigation";
                                      const details = (
                                        item?.note ||
                                        item?.notes ||
                                        item?.lineItem ||
                                        ""
                                      )
                                        .toString()
                                        .trim();

                                      return (
                                        <Text
                                          key={i}
                                          style={{ lineHeight: 1.4 }}
                                        >
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            }}
                                          >
                                            {"\u2022"}&nbsp;{name}
                                          </Text>
                                          {details ? (
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              &nbsp;( {details} )
                                            </Text>
                                          ) : null}
                                        </Text>
                                      );
                                    })}
                                  </View>
                                )}
                              </View>
                            )}

                            {((isVoiceRxDigitizeBool &&
                              digitizedData?.advice?.length > 0) ||
                              (isAmbientVoiceRxDigitizeBool &&
                                digitizedData?.advice?.length > 0)) && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Advice:
                                  </Text>
                                  {digitizedData?.advice?.map((item, i) => {
                                    const adviceText =
                                      item?.advice_name ?? item;
                                    return (
                                      <View key={i}>
                                        {adviceText != null &&
                                          adviceText !== "" && (
                                            <>
                                              <Text
                                                style={{
                                                  color: "#171725",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                }}
                                              >
                                                &nbsp;{"\n"}
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                {"\u2022"}&nbsp;
                                              </Text>
                                              <Text
                                                style={{
                                                  color: "#171725",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 400,
                                                }}
                                              >
                                                {adviceText}
                                              </Text>
                                            </>
                                          )}
                                      </View>
                                    );
                                  })}
                                </Text>
                              </View>
                            )}

                            {digitizedData?.vaccinations?.length > 0 && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Vaccinations:
                                  </Text>
                                  {digitizedData?.vaccinations?.map(
                                    (item, i) => {
                                      const vaccineName = item?.name || "";

                                      // Check if individual fields exist (excluding notes that match the name)
                                      const hasIndividualFields =
                                        (item?.brand &&
                                          item?.brand !== "" &&
                                          item?.brand !== vaccineName) ||
                                        (item?.schedule &&
                                          item?.schedule !== "") ||
                                        (item?.notes &&
                                          item?.notes !== "" &&
                                          item?.notes !== vaccineName);

                                      // Build details array, excluding any values that match the vaccine name
                                      let details = null;
                                      if (hasIndividualFields) {
                                        const detailsArray = [
                                          item?.brand &&
                                          item?.brand !== "" &&
                                          item?.brand !== vaccineName
                                            ? item?.brand
                                            : null,
                                          item?.schedule &&
                                          item?.schedule !== ""
                                            ? item?.schedule
                                            : null,
                                          item?.notes &&
                                          item?.notes !== "" &&
                                          item?.notes !== vaccineName
                                            ? item?.notes
                                            : null,
                                        ].filter(Boolean);
                                        details =
                                          detailsArray.length > 0
                                            ? detailsArray.join(", ")
                                            : null;
                                      } else if (
                                        item?.lineItem &&
                                        item?.lineItem !== ""
                                      ) {
                                        // If lineItem exists and doesn't exactly match the name, use it
                                        // But if lineItem starts with the name, extract only the additional part
                                        const lineItem = item.lineItem.trim();
                                        if (lineItem !== vaccineName) {
                                          // Escape special regex characters in vaccine name
                                          const escapedName =
                                            vaccineName.replace(
                                              /[.*+?^${}()|[\]\\]/g,
                                              "\\$&",
                                            );
                                          // Check if lineItem starts with vaccine name followed by comma or space
                                          const namePattern = new RegExp(
                                            `^${escapedName}\\s*[,]?\\s*`,
                                            "i",
                                          );
                                          if (namePattern.test(lineItem)) {
                                            // Extract the part after the vaccine name
                                            const remainingPart = lineItem
                                              .replace(namePattern, "")
                                              .trim();
                                            details = remainingPart || null;
                                          } else {
                                            // Use lineItem as is if it doesn't start with the name
                                            details = lineItem;
                                          }
                                        }
                                      }

                                      return (
                                        <View key={i}>
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {"\n"}
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            {"\u2022"}&nbsp;
                                            {vaccineName || "N/A"}
                                          </Text>
                                          {details ? (
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              &nbsp;( {details} )
                                            </Text>
                                          ) : null}
                                        </View>
                                      );
                                    },
                                  )}
                                </Text>
                              </View>
                            )}

                            {digitizedData?.followUp && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Follow Up:
                                  </Text>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 400,
                                    }}
                                  >
                                    &nbsp;{digitizedData?.followUp}
                                  </Text>
                                </Text>
                              </View>
                            )}

                            {digitizedData?.others?.length > 0 && (
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text style={{ lineHeight: 1.4 }} wrap={false}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Others:
                                  </Text>
                                  {digitizedData?.others?.map((item, i) => {
                                    return (
                                      <View key={i}>
                                        {item && item != "" && (
                                          <>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              &nbsp;{"\n"}
                                              &nbsp;&nbsp;&nbsp;&nbsp;
                                              {"\u2022"}&nbsp;{item}
                                            </Text>
                                          </>
                                        )}
                                      </View>
                                    );
                                  })}
                                </Text>
                              </View>
                            )}

                            {(() => {
                              const df = digitizedData?.dynamicFields;
                              if (!df) return null;
                              const isArray = Array.isArray(df);
                              if (isArray) {
                                const hasNonEmptyField = (item) =>
                                  item?.fields?.some(
                                    (f) =>
                                      typeof f === "object" &&
                                      Object.entries(f).some(
                                        ([k, v]) =>
                                          k !== "order" &&
                                          k !== "orader" &&
                                          v != null &&
                                          String(v).trim() !== "",
                                      ),
                                  );
                                const toShow = df.filter(hasNonEmptyField);
                                if (toShow.length === 0) return null;
                                return toShow.map((item, index) => {
                                  const modName = item?.title || item?.name;
                                  const fieldsWithData = (
                                    item?.fields || []
                                  ).filter(
                                    (f) =>
                                      typeof f === "object" &&
                                      Object.entries(f).some(
                                        ([k, v]) =>
                                          k !== "order" &&
                                          k !== "orader" &&
                                          v != null &&
                                          String(v).trim() !== "",
                                      ),
                                  );
                                  if (fieldsWithData.length === 0) return null;
                                  const sortedFields = [...fieldsWithData].sort(
                                    (a, b) =>
                                      (a?.order ?? a?.orader ?? 0) -
                                      (b?.order ?? b?.orader ?? 0),
                                  );
                                  return (
                                    <View
                                      key={index}
                                      style={{ marginTop: PX_TO_PT * 15 }}
                                    >
                                      <Text
                                        style={{ lineHeight: 1.4 }}
                                        wrap={false}
                                      >
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {(modName || "Custom")
                                            .replace(/([A-Z])/g, " $1")
                                            .replace(/^./, (str) =>
                                              str.toUpperCase(),
                                            )}
                                          :
                                        </Text>
                                        {sortedFields.map((f, i) => {
                                          const values = Object.entries(f)
                                            .filter(
                                              ([k, v]) =>
                                                k !== "order" &&
                                                k !== "orader" &&
                                                v != null &&
                                                String(v).trim() !== "",
                                            )
                                            .map(([k, v]) => v);
                                          const order =
                                            f?.order ?? f?.orader ?? i;
                                          const num = order + 1;
                                          return values.length ? (
                                            <Text
                                              key={i}
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              &nbsp;{"\n"}
                                              &nbsp;&nbsp;&nbsp;&nbsp;{num}
                                              )&nbsp;{values.join(", ")}
                                            </Text>
                                          ) : null;
                                        })}
                                      </Text>
                                    </View>
                                  );
                                });
                              }
                              return Object.entries(df).map(
                                ([key, values], index) =>
                                  values?.length > 0 ? (
                                    <View
                                      key={index}
                                      style={{ marginTop: PX_TO_PT * 15 }}
                                    >
                                      <Text
                                        style={{ lineHeight: 1.4 }}
                                        wrap={false}
                                      >
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {key
                                            .replace(/([A-Z])/g, " $1")
                                            .replace(/^./, (str) =>
                                              str.toUpperCase(),
                                            )}
                                          :
                                        </Text>
                                        {values?.map((item, i) => (
                                          <View key={i}>
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              &nbsp;{"\n"}
                                              &nbsp;&nbsp;&nbsp;&nbsp;{"\u2022"}
                                              &nbsp;
                                              {typeof item === "object"
                                                ? item?.lineItem
                                                : item}
                                            </Text>
                                          </View>
                                        ))}
                                      </Text>
                                    </View>
                                  ) : null,
                              );
                            })()}
                          </>
                        ) : (
                          isSmartSyncPrescription &&
                          caseManagerData.isCustomSSRX === "0" &&
                          uploaded_files?.map((item, i) => (
                            <View key={i}>
                              <View
                                style={{
                                  marginTop: PX_TO_PT * 15,
                                  width: "100%",
                                  height: 800,
                                }}
                              >
                                <Image
                                  style={{ width: "100%", height: "100%" }}
                                  source={{ uri: item.fileUrl }}
                                  resizeMode="contain"
                                />
                              </View>
                            </View>
                          ))
                        )}
                      </>
                    ) : option?.id === 12 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          growthChartData?.length > 0 &&
                          (option?.format === "table" ? (
                            <>
                              <View style={{ marginTop: PX_TO_PT * 15 }}>
                                <Text
                                  fixed
                                  style={{
                                    color: "#171725",
                                    fontFamily:
                                      printSettings?.page_format?.font_family,
                                    fontSize:
                                      PX_TO_PT *
                                      printSettings?.page_format?.font_size,
                                    fontWeight: 700,
                                    marginBottom: PX_TO_PT * 6,
                                  }}
                                >
                                  Growth Chart &nbsp;{"\n"}
                                </Text>
                                <View style={styles.table}>
                                  <View style={styles.headerRow} fixed>
                                    <Text
                                      style={[
                                        styles.headerCell,
                                        {
                                          flex: 0.6,
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                          color: "#000",
                                        },
                                      ]}
                                    >
                                      Parameters
                                    </Text>
                                    {option?.growth_chart_option?.includes(
                                      "height",
                                    ) && (
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.6,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        Height
                                      </Text>
                                    )}
                                    {option?.growth_chart_option?.includes(
                                      "weight",
                                    ) && (
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.6,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        Weight
                                      </Text>
                                    )}
                                    {option?.growth_chart_option?.includes(
                                      "fib4",
                                    ) && (
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.6,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        FIB4
                                      </Text>
                                    )}
                                    {option?.growth_chart_option?.includes(
                                      "waist_circumference",
                                    ) && (
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.6,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        Waist Circumference
                                      </Text>
                                    )}
                                    {option?.growth_chart_option?.includes(
                                      "bmi",
                                    ) && (
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.8,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        BMI
                                      </Text>
                                    )}
                                    {option?.growth_chart_option?.includes(
                                      "ofc",
                                    ) && (
                                      <Text
                                        style={[
                                          styles.headerCell,
                                          {
                                            flex: 0.8,
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                            color: "#000",
                                          },
                                        ]}
                                      >
                                        OFC
                                      </Text>
                                    )}
                                  </View>
                                  {growthChartData?.map((item, i) => (
                                    <View
                                      style={styles.row}
                                      key={i}
                                      wrap={false}
                                    >
                                      <Text
                                        style={[
                                          styles.cell,
                                          {
                                            flex: 0.6,
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          },
                                        ]}
                                      >
                                        {item?.tcbc_created_date
                                          ? moment(
                                              item?.tcbc_created_date,
                                            ).format("DD MMM YYYY")
                                          : ""}
                                      </Text>
                                      {option?.growth_chart_option?.includes(
                                        "height",
                                      ) && (
                                        <Text
                                          style={[
                                            styles.cell,
                                            {
                                              flex: 0.6,
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            },
                                          ]}
                                        >
                                          {item?.height
                                            ? `${item?.height} cms`
                                            : ""}
                                        </Text>
                                      )}
                                      {option?.growth_chart_option?.includes(
                                        "weight",
                                      ) && (
                                        <Text
                                          style={[
                                            styles.cell,
                                            {
                                              flex: 0.6,
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            },
                                          ]}
                                        >
                                          {item?.weight
                                            ? `${item?.weight} kgs`
                                            : ""}
                                        </Text>
                                      )}
                                      {option?.growth_chart_option?.includes(
                                        "fib4",
                                      ) && (
                                        <Text
                                          style={[
                                            styles.cell,
                                            {
                                              flex: 0.6,
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            },
                                          ]}
                                        >
                                          {item?.fib4 ? `${item?.fib4}` : ""}
                                        </Text>
                                      )}
                                      {option?.growth_chart_option?.includes(
                                        "waist_circumference",
                                      ) && (
                                        <Text
                                          style={[
                                            styles.cell,
                                            {
                                              flex: 0.6,
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            },
                                          ]}
                                        >
                                          {item?.waist_circumference
                                            ? `${item?.waist_circumference} cms`
                                            : ""}
                                        </Text>
                                      )}
                                      {option?.growth_chart_option?.includes(
                                        "bmi",
                                      ) && (
                                        <Text
                                          style={[
                                            styles.cell,
                                            {
                                              flex: 0.8,
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            },
                                          ]}
                                        >
                                          {item?.bmi
                                            ? `${item?.bmi} kg/m2`
                                            : ""}
                                        </Text>
                                      )}
                                      {option?.growth_chart_option?.includes(
                                        "ofc",
                                      ) && (
                                        <Text
                                          style={[
                                            styles.cell,
                                            {
                                              flex: 0.8,
                                              color: "#171725",
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                            },
                                          ]}
                                        >
                                          {item?.ofc ? `${item?.ofc} cms` : ""}
                                        </Text>
                                      )}
                                    </View>
                                  ))}
                                </View>
                              </View>
                            </>
                          ) : (
                            growthChartImageChunks?.length > 0 && (
                              <>
                                <Text
                                  fixed
                                  style={{
                                    color: "#171725",
                                    fontFamily:
                                      printSettings?.page_format?.font_family,
                                    fontSize:
                                      PX_TO_PT *
                                      printSettings?.page_format?.font_size,
                                    fontWeight: 700,
                                    marginTop: PX_TO_PT * 15,
                                  }}
                                >
                                  Growth Chart &nbsp;{"\n"}
                                </Text>
                                <View>
                                  {growthChartImageChunks?.map(
                                    (chunk, index) => (
                                      <View
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          marginTop: PX_TO_PT * 15,
                                        }}
                                        key={index}
                                      >
                                        {chunk
                                          ?.filter((c) =>
                                            option?.growth_chart_option?.includes(
                                              c,
                                            ),
                                          )
                                          ?.map((img) => (
                                            <Image
                                              key={img}
                                              style={{
                                                width: "48%",
                                                objectFit: "contain",
                                              }}
                                              src={growthChartImageData?.[img]}
                                            />
                                          ))}
                                      </View>
                                    ),
                                  )}
                                </View>
                              </>
                            )
                          ))}
                      </>
                    ) : option?.id === 13 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          gynecHistoryData &&
                          Object.keys(gynecHistoryData).length > 2 &&
                          (option?.format === "inline" ? (
                            <GynecHistoryInlineView
                              PX_TO_PT={PX_TO_PT}
                              styles={styles}
                              printSettings={printSettings}
                              gynecHistoryData={gynecHistoryData}
                            />
                          ) : option?.format === "listview" ? (
                            <GynecHistoryListView
                              PX_TO_PT={PX_TO_PT}
                              styles={styles}
                              printSettings={printSettings}
                              gynecHistoryData={gynecHistoryData}
                            />
                          ) : (
                            <GynecHistoryTableView
                              PX_TO_PT={PX_TO_PT}
                              styles={styles}
                              printSettings={printSettings}
                              gynecHistoryData={gynecHistoryData}
                            />
                          ))}
                      </>
                    ) : option?.id === 14 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          obsHistoryData &&
                          Object.keys(obsHistoryData).length > 2 &&
                          (option?.format === "inline" ? (
                            <ObsHistoryInlineView
                              PX_TO_PT={PX_TO_PT}
                              styles={styles}
                              printSettings={printSettings}
                              options={option?.obs_history_option}
                              obsHistoryData={obsHistoryData}
                              consultationDate={
                                caseManagerData?.patient_data
                                  ?.patient_consultaion_date
                              }
                            />
                          ) : option?.format === "listview" ? (
                            <ObsHistoryListView
                              PX_TO_PT={PX_TO_PT}
                              styles={styles}
                              printSettings={printSettings}
                              options={option?.obs_history_option}
                              obsHistoryData={obsHistoryData}
                              consultationDate={
                                caseManagerData?.patient_data
                                  ?.patient_consultaion_date
                              }
                            />
                          ) : (
                            <ObsHistoryTableView
                              PX_TO_PT={PX_TO_PT}
                              styles={styles}
                              printSettings={printSettings}
                              options={option?.obs_history_option}
                              obsHistoryData={obsHistoryData}
                              consultationDate={
                                caseManagerData?.patient_data
                                  ?.patient_consultaion_date
                              }
                            />
                          ))}
                      </>
                    ) : option?.id === 15 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          labParamsPatchData &&
                          labParamsPatchData?.length &&
                          (option?.format === "inline" ? (
                            <View
                              style={{
                                marginTop: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text>
                                <>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 700,
                                    }}
                                    fixed
                                  >
                                    Lab Results:&nbsp;
                                  </Text>

                                  {labParamsPatchData?.map((item, i) => (
                                    <React.Fragment key={i}>
                                      {i !== 0 && (
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          }}
                                        >
                                          ,&nbsp;
                                        </Text>
                                      )}
                                      <Text
                                        key={i}
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        }}
                                      >
                                        {moment(item?.date).format(
                                          "Do MMM YYYY",
                                        )}
                                        &nbsp;
                                      </Text>
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        -&nbsp;
                                      </Text>

                                      {Object.entries(item?.groupedInputs).map(
                                        ([reportName, tests], reportIndex) => (
                                          <Text key={reportIndex}>
                                            {reportIndex !== 0 && (
                                              <Text
                                                style={{
                                                  color: "#171725",
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 400,
                                                }}
                                              >
                                                ),&nbsp;
                                              </Text>
                                            )}

                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              }}
                                            >
                                              {reportName}&nbsp;(
                                            </Text>

                                            {tests?.map((input, inputIndex) => (
                                              <Text
                                                key={inputIndex}
                                                style={{
                                                  color: "#171725",
                                                  fontFamily:
                                                    getIndianLanguageFont(
                                                      input?.value,
                                                      printSettings?.page_format
                                                        ?.font_family,
                                                    ),
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 400,
                                                }}
                                              >
                                                {inputIndex !== 0 && (
                                                  <Text>, </Text>
                                                )}
                                                {input?.testName}:&nbsp;
                                                {input?.value}&nbsp;
                                                {input?.testName !== "Remarks"
                                                  ? (input?.units ?? "")
                                                  : ""}
                                              </Text>
                                            ))}
                                          </Text>
                                        ),
                                      )}
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        )
                                      </Text>
                                    </React.Fragment>
                                  ))}
                                </>
                              </Text>
                            </View>
                          ) : option?.format === "listview" ? (
                            <View
                              style={{
                                marginTop: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                                fixed
                              >
                                Lab Results:
                              </Text>

                              {labParamsPatchData?.map((item, dateIndex) => (
                                <View key={dateIndex}>
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 500,
                                      marginTop: PX_TO_PT * 8,
                                    }}
                                  >
                                    {moment(item?.date).format("Do MMM YYYY")}
                                  </Text>

                                  {Object.entries(item?.groupedInputs).map(
                                    ([reportName, tests], reportIndex) => (
                                      <View
                                        key={reportIndex}
                                        style={{ marginLeft: PX_TO_PT * 16 }}
                                      >
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {reportIndex + 1}. {reportName}
                                        </Text>

                                        {tests?.map((input, testIndex) => (
                                          <Text
                                            key={testIndex}
                                            style={{
                                              color: "#171725",
                                              fontFamily: getIndianLanguageFont(
                                                input?.value,
                                                printSettings?.page_format
                                                  ?.font_family,
                                              ),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 400,
                                              marginLeft: PX_TO_PT * 24,
                                            }}
                                          >
                                            {String.fromCharCode(
                                              97 + testIndex,
                                            )}
                                            . {input?.testName}: {input?.value}{" "}
                                            {input?.testName !== "Remarks"
                                              ? (input?.units ?? "")
                                              : ""}
                                          </Text>
                                        ))}
                                      </View>
                                    ),
                                  )}
                                </View>
                              ))}
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  marginBottom: PX_TO_PT * 6,
                                }}
                                fixed
                              >
                                Lab Results:&nbsp;
                              </Text>

                              <View style={{ marginTop: PX_TO_PT * 6 }}>
                                <View style={[styles.table, { marginTop: 0 }]}>
                                  <View style={[styles.headerRow]} fixed>
                                    <Text
                                      style={[
                                        styles.headerCell,
                                        {
                                          flex: 1,
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                          color: "#000",
                                        },
                                      ]}
                                    >
                                      {"NAME"}
                                    </Text>
                                    {labParamsPatchTableData &&
                                      labParamsPatchTableData?.map(
                                        (entry, i) => (
                                          <Text
                                            key={i}
                                            style={[
                                              styles.headerCell,
                                              {
                                                flex: 1,
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                                color: "#000",
                                              },
                                            ]}
                                          >
                                            {moment(entry?.date).format(
                                              "Do MMM YY",
                                            )}
                                          </Text>
                                        ),
                                      )}
                                  </View>

                                  {Object.keys(
                                    labParamsPatchTableData?.[0]
                                      ?.groupedInputs || {},
                                  ).map((reportName, j) => (
                                    <View
                                      key={j}
                                      style={{ marginTop: PX_TO_PT * 0 }}
                                    >
                                      <View style={[styles.row]} wrap={false}>
                                        <Text
                                          style={[
                                            styles.cell,
                                            {
                                              flex: 1,
                                              fontFamily:
                                                printSettings?.page_format
                                                  ?.font_family,
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                              color: "#000",
                                            },
                                          ]}
                                        >
                                          {reportName}
                                        </Text>
                                      </View>

                                      {labParamsPatchTableData?.[0]?.groupedInputs?.[
                                        reportName
                                      ]?.map((test, idx) => (
                                        <View
                                          key={idx}
                                          style={{ marginTop: PX_TO_PT * 0 }}
                                        >
                                          <View
                                            style={[styles.row]}
                                            wrap={false}
                                          >
                                            <Text
                                              style={[
                                                styles.cell,
                                                {
                                                  flex: 1,
                                                  fontFamily:
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  fontSize:
                                                    PX_TO_PT *
                                                    printSettings?.page_format
                                                      ?.font_size,
                                                  fontWeight: 500,
                                                  color: "#000",
                                                },
                                              ]}
                                            >
                                              {test?.testName}
                                            </Text>

                                            {labParamsPatchTableData?.map(
                                              (entry, k) => {
                                                const testResult =
                                                  entry?.groupedInputs?.[
                                                    reportName
                                                  ]?.find(
                                                    (input) =>
                                                      input?.testName ===
                                                      test?.testName,
                                                  );
                                                const unitsPart =
                                                  testResult?.testName !==
                                                  "Remarks"
                                                    ? (testResult?.units ?? "")
                                                    : "";
                                                return (
                                                  <Text
                                                    key={k}
                                                    style={[
                                                      styles.cell,
                                                      {
                                                        flex: 1,
                                                        fontFamily:
                                                          getIndianLanguageFont(
                                                            testResult?.value,
                                                            printSettings
                                                              ?.page_format
                                                              ?.font_family,
                                                          ),
                                                        fontSize:
                                                          PX_TO_PT *
                                                          printSettings
                                                            ?.page_format
                                                            ?.font_size,
                                                        fontWeight: 400,
                                                        color: "#000",
                                                      },
                                                    ]}
                                                  >
                                                    {testResult
                                                      ? testResult?.value +
                                                        (unitsPart
                                                          ? " " + unitsPart
                                                          : "")
                                                      : "-"}
                                                    &nbsp;
                                                  </Text>
                                                );
                                              },
                                            )}
                                          </View>
                                        </View>
                                      ))}
                                    </View>
                                  ))}
                                </View>
                              </View>
                            </View>
                          ))}
                      </>
                    ) : option?.id === 16 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" ? (
                      <>
                        {!rx &&
                          caseManagerData?.surgeries?.length > 0 &&
                          (option?.format === "inline" ? (
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Surgeries/Procedures:&nbsp;
                              </Text>
                              {caseManagerData?.surgeries?.map((item, i) => {
                                return (
                                  <Text key={i}>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily: getIndianLanguageFont(
                                          item?.name,
                                          printSettings?.page_format
                                            ?.font_family,
                                        ),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item?.name}&nbsp;
                                    </Text>
                                    {item?.notes ? (
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.notes,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {`(${Object.values(Object.fromEntries(Object.entries((({ notes }) => ({ notes }))(caseManagerData?.surgeries?.[i])).filter(([_, v]) => v))).join(", ")})`}
                                        {caseManagerData?.surgeries?.length -
                                          1 !=
                                        i
                                          ? ","
                                          : ""}
                                        &nbsp;
                                      </Text>
                                    ) : (
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {caseManagerData?.surgeries?.length -
                                          1 !=
                                        i
                                          ? ","
                                          : ""}
                                        &nbsp;
                                      </Text>
                                    )}
                                  </Text>
                                );
                              })}
                            </Text>
                          ) : option?.format === "listview" ? (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                Surgeries/Procedures:&nbsp;
                              </Text>
                              {caseManagerData?.surgeries?.map((item, i) => {
                                return (
                                  <Text
                                    key={i}
                                    style={{
                                      marginTop: PX_TO_PT * (i == 0 ? 4 : 2),
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      &nbsp;{i + 1}.&nbsp;
                                    </Text>
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily: getIndianLanguageFont(
                                          item?.name,
                                          printSettings?.page_format
                                            ?.font_family,
                                        ),
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item?.name}&nbsp;
                                    </Text>
                                    {item?.notes && (
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.notes,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >{`(${Object.values(Object.fromEntries(Object.entries((({ notes }) => ({ notes }))(caseManagerData?.surgeries?.[i])).filter(([_, v]) => v))).join(", ")})\n`}</Text>
                                    )}
                                  </Text>
                                );
                              })}
                            </View>
                          ) : (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily:
                                    printSettings?.page_format?.font_family,
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  marginBottom: PX_TO_PT * 6,
                                }}
                              >
                                Surgeries/Procedures:&nbsp;
                              </Text>
                              <View style={styles.table}>
                                <View style={styles.headerRow} fixed>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    NAME
                                  </Text>
                                  <Text
                                    style={[
                                      styles.headerCell,
                                      {
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 500,
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    NOTE
                                  </Text>
                                </View>
                                {caseManagerData?.surgeries?.map((item, i) => (
                                  <View style={styles.row} key={i} wrap={false}>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.name,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        },
                                      ]}
                                    >
                                      {item?.name}&nbsp;
                                    </Text>
                                    <Text
                                      style={[
                                        styles.cell,
                                        {
                                          color: "#171725",
                                          fontFamily: getIndianLanguageFont(
                                            item?.notes,
                                            printSettings?.page_format
                                              ?.font_family,
                                          ),
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        },
                                      ]}
                                    >
                                      {item?.notes ? item?.notes : "-"}&nbsp;
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            </View>
                          ))}
                      </>
                    ) : option?.is_custom_module === true &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" &&
                      customModule?.content?.length > 0 &&
                      !rx ? (
                      (() => {
                        // Check if this is V2 module directly from customModule
                        const isV2 = customModule?.module_version === "v2";

                        // Get field names directly from the first content item (if v2)
                        const getFieldKeys = (item) => {
                          if (!item || typeof item !== "object") return [];
                          // Exclude 'id' and any other non-field keys
                          return Object.keys(item).filter(
                            (key) => key !== "id",
                          );
                        };

                        // Get field keys from first content item (for v2)
                        const fieldKeys =
                          isV2 && customModule?.content?.length > 0
                            ? getFieldKeys(customModule.content[0])
                            : [];

                        // Helper to check if V2 content has any data
                        const hasV2Content = (item) => {
                          if (!isV2) return false;
                          return fieldKeys.some(
                            (fieldKey) => item[fieldKey]?.trim?.().length > 0,
                          );
                        };

                        // Helper to check if V1 content has any data
                        const hasV1Content = (item) => {
                          return item.title || item.notes;
                        };
                        // Render based on format
                        if (option?.format === "inline") {
                          const moduleName =
                            customModule?.name || customModule?.module_name;
                          return (
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 15,
                                lineHeight: 1.4,
                              }}
                            >
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily: getIndianLanguageFont(
                                    moduleName,
                                    printSettings?.page_format?.font_family,
                                  ),
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                {moduleName}:&nbsp;
                              </Text>
                              {customModule?.content?.map((item, i) => {
                                if (isV2) {
                                  // V2: Render all fields with their keys as labels in format: (<Field1>: <Value>, <Field2>: <Value>, ...)
                                  const fieldEntries = fieldKeys
                                    .map((fieldKey) => ({
                                      label: fieldKey, // Use field key as label (can be formatted later if needed)
                                      value: item[fieldKey],
                                    }))
                                    .filter(
                                      (entry) =>
                                        entry.value?.trim?.().length > 0,
                                    );

                                  if (fieldEntries.length === 0) return null;

                                  return (
                                    <Text key={i}>
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        (
                                      </Text>
                                      {fieldEntries.map((entry, idx) => (
                                        <Text key={idx}>
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily: getIndianLanguageFont(
                                                entry.label,
                                                printSettings?.page_format
                                                  ?.font_family,
                                              ),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 700,
                                            }}
                                          >
                                            {entry.label}:&nbsp;
                                          </Text>
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily: getIndianLanguageFont(
                                                entry.value,
                                                printSettings?.page_format
                                                  ?.font_family,
                                              ),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {entry.value}
                                          </Text>
                                          {idx < fieldEntries.length - 1 && (
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              ,{" "}
                                            </Text>
                                          )}
                                        </Text>
                                      ))}
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        )
                                      </Text>
                                      {i < customModule?.content.length - 1 && (
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily:
                                              printSettings?.page_format
                                                ?.font_family,
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          }}
                                        >
                                          {" "}
                                          |{" "}
                                        </Text>
                                      )}
                                    </Text>
                                  );
                                } else {
                                  // V1: Original rendering
                                  return (
                                    <Text key={i}>
                                      {item.title && (
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily: getIndianLanguageFont(
                                              item?.title,
                                              printSettings?.page_format
                                                ?.font_family,
                                            ),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {item.title}&nbsp;
                                        </Text>
                                      )}
                                      {item.notes && (
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily: getIndianLanguageFont(
                                              item?.notes,
                                              printSettings?.page_format
                                                ?.font_family,
                                            ),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          }}
                                        >
                                          {`${item?.title ? "(" : ""}`}
                                          {item.notes?.replace(/ /g, "\u00A0")}
                                          {`${item?.title ? ")" : ""}`}
                                        </Text>
                                      )}
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {customModule?.content.length - 1 != i
                                          ? ","
                                          : ""}
                                        &nbsp;
                                      </Text>
                                    </Text>
                                  );
                                }
                              })}
                            </Text>
                          );
                        } else if (option?.format === "listview") {
                          const moduleName =
                            customModule?.name || customModule?.module_name;
                          return (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily: getIndianLanguageFont(
                                    moduleName,
                                    printSettings?.page_format?.font_family,
                                  ),
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                }}
                              >
                                {moduleName}:&nbsp;
                              </Text>
                              {customModule?.content.map((item, i) => {
                                if (isV2) {
                                  // V2: Render all fields with their keys as labels in format: 1.<Field1>: <Value>, <Field2>: <Value>, ...
                                  const fieldEntries = fieldKeys
                                    .map((fieldKey) => ({
                                      label: fieldKey, // Use field key as label (can be formatted later if needed)
                                      value: item[fieldKey],
                                    }))
                                    .filter(
                                      (entry) =>
                                        entry.value?.trim?.().length > 0,
                                    );

                                  if (fieldEntries.length === 0) return null;

                                  return (
                                    <Text
                                      key={i}
                                      style={{
                                        marginTop: PX_TO_PT * (i == 0 ? 4 : 2),
                                        lineHeight: 1.4,
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        }}
                                      >
                                        &nbsp;&nbsp;&nbsp;{i + 1}.
                                      </Text>
                                      {fieldEntries.map((entry, idx) => (
                                        <Text key={idx}>
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily: getIndianLanguageFont(
                                                entry.label,
                                                printSettings?.page_format
                                                  ?.font_family,
                                              ),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 700,
                                            }}
                                          >
                                            {entry.label}:&nbsp;
                                          </Text>
                                          <Text
                                            style={{
                                              color: "#171725",
                                              fontFamily: getIndianLanguageFont(
                                                entry.value,
                                                printSettings?.page_format
                                                  ?.font_family,
                                              ),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {entry.value}
                                          </Text>
                                          {idx < fieldEntries.length - 1 && (
                                            <Text
                                              style={{
                                                color: "#171725",
                                                fontFamily:
                                                  printSettings?.page_format
                                                    ?.font_family,
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              }}
                                            >
                                              ,{" "}
                                            </Text>
                                          )}
                                        </Text>
                                      ))}
                                    </Text>
                                  );
                                } else {
                                  // V1: Original rendering
                                  return (
                                    <Text
                                      key={i}
                                      style={{
                                        marginTop: PX_TO_PT * (i == 0 ? 4 : 2),
                                        lineHeight: 1.4,
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 500,
                                        }}
                                      >
                                        &nbsp;{i + 1}.&nbsp;
                                      </Text>
                                      {item.title && (
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily: getIndianLanguageFont(
                                              item?.title,
                                              printSettings?.page_format
                                                ?.font_family,
                                            ),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {item.title}&nbsp;
                                        </Text>
                                      )}
                                      {item.notes && (
                                        <Text
                                          style={{
                                            color: "#171725",
                                            fontFamily: getIndianLanguageFont(
                                              item?.notes,
                                              printSettings?.page_format
                                                ?.font_family,
                                            ),
                                            fontSize:
                                              PX_TO_PT *
                                              printSettings?.page_format
                                                ?.font_size,
                                            fontWeight: 400,
                                          }}
                                        >
                                          {`${item?.title ? "(" : ""}`}
                                          {item.notes?.replace(/ /g, "\u00A0")}
                                          {`${item?.title ? ")" : ""}`}
                                        </Text>
                                      )}
                                    </Text>
                                  );
                                }
                              })}
                            </View>
                          );
                        } else {
                          // Table format
                          const moduleName =
                            customModule?.name || customModule?.module_name;
                          return (
                            <View style={{ marginTop: PX_TO_PT * 15 }}>
                              <Text
                                fixed
                                style={{
                                  color: "#171725",
                                  fontFamily: getIndianLanguageFont(
                                    moduleName,
                                    printSettings?.page_format?.font_family,
                                  ),
                                  fontSize:
                                    PX_TO_PT *
                                    printSettings?.page_format?.font_size,
                                  fontWeight: 700,
                                  marginBottom: PX_TO_PT * 6,
                                }}
                              >
                                {moduleName}:&nbsp;
                              </Text>
                              <View style={styles.table}>
                                <View style={styles.headerRowFixed} fixed />
                                {customModule.module_version === "v2" && (
                                  // V2: Render column headers with field keys
                                  <View
                                    style={[
                                      styles.row,
                                      { backgroundColor: "#f5f5f5" },
                                    ]}
                                    wrap={false}
                                  >
                                    {fieldKeys.map((fieldKey, idx) => {
                                      const flexPerColumn =
                                        1 / fieldKeys.length;
                                      return (
                                        <Text
                                          key={idx}
                                          style={[
                                            styles.dynamicModuleCell,
                                            {
                                              flex: flexPerColumn,
                                              color: "#171725",
                                              fontFamily: getIndianLanguageFont(
                                                fieldKey,
                                                printSettings?.page_format
                                                  ?.font_family,
                                              ),
                                              fontSize:
                                                PX_TO_PT *
                                                printSettings?.page_format
                                                  ?.font_size,
                                              fontWeight: 700,
                                              textTransform: "uppercase",
                                            },
                                          ]}
                                        >
                                          {fieldKey.toUpperCase()}&nbsp;
                                        </Text>
                                      );
                                    })}
                                  </View>
                                )}
                                {customModule?.content.map((item, i) => {
                                  if (customModule.module_version === "v2") {
                                    // V2: Render all fields in columns using fieldKeys from content
                                    const fieldValues = fieldKeys.map(
                                      (fieldKey) => item[fieldKey] || "-",
                                    );
                                    const flexPerColumn = 1 / fieldKeys.length;

                                    return (
                                      <View
                                        style={styles.row}
                                        key={i}
                                        wrap={false}
                                      >
                                        {fieldValues.map((value, idx) => (
                                          <Text
                                            key={idx}
                                            style={[
                                              styles.dynamicModuleCell,
                                              {
                                                flex: flexPerColumn,
                                                color: "#171725",
                                                fontFamily:
                                                  getIndianLanguageFont(
                                                    value,
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  ),
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              },
                                            ]}
                                          >
                                            {value}&nbsp;
                                          </Text>
                                        ))}
                                      </View>
                                    );
                                  } else {
                                    // V1: Original rendering
                                    return (
                                      <View
                                        style={styles.row}
                                        key={i}
                                        wrap={false}
                                      >
                                        {customModule?.content?.some(
                                          (item) => item.title,
                                        ) && (
                                          <Text
                                            style={[
                                              styles.dynamicModuleCell,
                                              {
                                                flex: 0.3,
                                                color: "#171725",
                                                fontFamily:
                                                  getIndianLanguageFont(
                                                    item?.title,
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  ),
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 500,
                                              },
                                            ]}
                                          >
                                            {item.title || "-"}&nbsp;
                                          </Text>
                                        )}
                                        {customModule?.content?.some(
                                          (item) => item.notes,
                                        ) && (
                                          <Text
                                            style={[
                                              styles.dynamicModuleCell,
                                              {
                                                flex: 0.7,
                                                color: "#171725",
                                                fontFamily:
                                                  getIndianLanguageFont(
                                                    item?.notes,
                                                    printSettings?.page_format
                                                      ?.font_family,
                                                  ),
                                                fontSize:
                                                  PX_TO_PT *
                                                  printSettings?.page_format
                                                    ?.font_size,
                                                fontWeight: 400,
                                              },
                                            ]}
                                          >
                                            {item.notes?.replace(
                                              / /g,
                                              "\u00A0",
                                            ) || "-"}
                                            &nbsp;
                                          </Text>
                                        )}
                                      </View>
                                    );
                                  }
                                })}
                              </View>
                            </View>
                          );
                        }
                      })()
                    ) : (
                      option?.id === 17 &&
                      option?.enable === "Y" &&
                      option?.custom_status === "Y" &&
                      (patientBills?.length > 0 ||
                        advanceReceipts?.length > 0) && (
                        <Text
                          style={{ marginTop: PX_TO_PT * 15, lineHeight: 1.4 }}
                        >
                          <Text
                            style={{
                              color: "#171725",
                              fontFamily:
                                printSettings?.page_format?.font_family,
                              fontSize:
                                PX_TO_PT *
                                printSettings?.page_format?.font_size,
                              fontWeight: 700,
                            }}
                          >
                            Payment:&nbsp;
                          </Text>
                          {patientBills?.map((patientBill, i) => {
                            const paymentModes =
                              patientBill?.paymentModes?.map(
                                (item) => item?.paymentMode,
                              ) || [];
                            const formattedPaymentModes =
                              paymentModes?.length > 1
                                ? paymentModes?.slice(0, -1).join(", ") +
                                  " & " +
                                  paymentModes[paymentModes?.length - 1]
                                : paymentModes?.join("");
                            if (patientBill?.paymentStatus !== "Refunded") {
                              return (
                                <Text
                                  key={i}
                                  style={{
                                    color: "#171725",
                                    fontFamily:
                                      printSettings?.page_format?.font_family,
                                    fontSize:
                                      PX_TO_PT *
                                      printSettings?.page_format?.font_size,
                                    fontWeight: 400,
                                  }}
                                >
                                  {"\n"}
                                  {`Received ₹${patientBill?.paidAmount} via ${formattedPaymentModes} for ( ${patientBill?.billItems
                                    ?.map(
                                      (item) =>
                                        `${item?.name}: ₹${item?.totalAmount}`,
                                    )
                                    .join(
                                      " | ",
                                    )}${patientBill?.dueAmount ? ` | Due Amount: ₹${patientBill?.dueAmount}` : ""} )`}
                                </Text>
                              );
                            }
                          })}
                          {advanceReceipts?.map((advanceReceipt, i) => {
                            const paymentModes =
                              advanceReceipt?.paymentModes?.map(
                                (item) => item?.paymentMode,
                              ) || [];
                            const formattedPaymentModes =
                              paymentModes?.length > 1
                                ? paymentModes?.slice(0, -1)?.join(", ") +
                                  " & " +
                                  paymentModes?.[paymentModes?.length - 1]
                                : paymentModes?.join("");
                            if (advanceReceipt?.transactionType !== "Refund") {
                              return (
                                <Text
                                  key={i}
                                  style={{
                                    color: "#171725",
                                    fontFamily:
                                      printSettings?.page_format?.font_family,
                                    fontSize:
                                      PX_TO_PT *
                                      (printSettings?.page_format?.font_size ||
                                        12),
                                    fontWeight: 400,
                                  }}
                                >
                                  {"\n"}
                                  {`Advance Deposit Received with thanks ₹${advanceReceipt?.totalAmount || 0} via ${formattedPaymentModes}`}
                                </Text>
                              );
                            }
                          })}
                          {patientWalletBalance > 0 && (
                            <Text
                              style={{
                                color: "#171725",
                                fontFamily:
                                  printSettings?.page_format?.font_family,
                                fontSize:
                                  PX_TO_PT *
                                  (printSettings?.page_format?.font_size || 12),
                                fontWeight: 400,
                              }}
                            >
                              {"\n"}
                              {`Available Advance Balance ₹${patientWalletBalance || 0}`}
                            </Text>
                          )}
                        </Text>
                      )
                    )}
                  </View>
                );
              },
            );
          })()}
          {/* </View> */}

          {/* Zydus Cross-Tab Table Structure */}
          {zydusLabData?.data?.length > 0 &&
            (() => {
              try {
                // Get all unique dates and sort them (newest first)
                const allDates = [
                  ...new Set(
                    zydusLabData?.data
                      ?.map((entry) => entry?.date)
                      ?.filter(Boolean),
                  ),
                ].sort(
                  (a, b) =>
                    new Date(b?.split("-")?.reverse()?.join("-")) -
                    new Date(a?.split("-")?.reverse()?.join("-")),
                );
                const dates = allDates?.slice(0, 5) || []; // Show max 5 dates

                if (dates.length === 0) return null;

                // Dynamic column sizing based on number of dates
                const dateColumnCount = dates.length;
                const investigationFlex = dateColumnCount >= 4 ? 0.8 : 1;
                const subParamsFlex = dateColumnCount >= 4 ? 0.8 : 1;
                const dateColumnFlex = dateColumnCount >= 4 ? 0.6 : 1;

                // Group services by service name
                const serviceGroups = [];
                const serviceMap = new Map();

                // Filter data once for better performance
                const filteredData =
                  zydusLabData?.data?.filter((dateEntry) =>
                    dates?.includes(dateEntry?.date),
                  ) || [];

                filteredData?.forEach((dateEntry) => {
                  dateEntry?.inputs?.forEach((test) => {
                    if (
                      test?.serviceName &&
                      !serviceMap.has(test?.serviceName)
                    ) {
                      serviceMap.set(test?.serviceName, {
                        serviceName: test?.serviceName,
                        rows: [],
                      });
                      serviceGroups.push(serviceMap.get(test?.serviceName));
                    }
                  });
                });

                // Process each service group to create table rows
                serviceGroups?.forEach((serviceGroup) => {
                  const serviceName = serviceGroup?.serviceName;

                  // Check for direct service results (without parameters)
                  let hasDirectResults = false;
                  const directResults = {};
                  let directReferenceRange = "";

                  filteredData?.forEach((dateEntry) => {
                    const test = dateEntry?.inputs?.find(
                      (t) => t?.serviceName === serviceName,
                    );
                    if (test?.resultvalue && test?.resultvalue !== "-") {
                      hasDirectResults = true;
                      directResults[dateEntry?.date] = test?.resultvalue;
                      if (
                        test?.referenceRange &&
                        test?.referenceRange !== "-"
                      ) {
                        directReferenceRange = test?.referenceRange;
                      }
                    }
                  });

                  // Collect all parameters for this service
                  const parameterMap = new Map();

                  filteredData?.forEach((dateEntry) => {
                    const test = dateEntry?.inputs?.find(
                      (t) => t?.serviceName === serviceName,
                    );
                    if (test?.labResultParameters?.length > 0) {
                      test?.labResultParameters?.forEach((param) => {
                        if (
                          param?.parameterName &&
                          !parameterMap.has(param?.parameterName)
                        ) {
                          parameterMap.set(param?.parameterName, {
                            name: param?.parameterName,
                            referenceRange: param?.referenceRange || "",
                            results: {},
                            type: "parameter",
                          });
                        }
                        if (param?.parameterName) {
                          parameterMap.get(param?.parameterName).results[
                            dateEntry?.date
                          ] = param?.resultValue || "";
                        }
                      });
                    }
                  });

                  const parameters = Array.from(parameterMap.values());

                  // Optimized content splitting for long text values
                  const splitLongContent = (param) => {
                    const getCharLimit = () => {
                      if (dateColumnCount >= 5) return 200;
                      if (dateColumnCount >= 3) return 300;
                      return 400;
                    };

                    const maxCharsPerRow = getCharLimit();
                    const resultEntries = Object.entries(param?.results || {});
                    const hasLongContent = resultEntries.some(
                      ([, value]) =>
                        value &&
                        typeof value === "string" &&
                        value?.length > maxCharsPerRow,
                    );

                    if (!hasLongContent) {
                      return [param];
                    }

                    // Smart text splitting at natural break points
                    const smartSplit = (text, maxLength) => {
                      if (!text || text?.length <= maxLength) return [text];

                      const chunks = [];
                      let remaining = text;

                      while (remaining?.length > maxLength) {
                        let splitPoint = maxLength;
                        const breakPoints = [
                          remaining?.lastIndexOf("\n\n", maxLength),
                          remaining?.lastIndexOf("\n", maxLength),
                          remaining?.lastIndexOf(". ", maxLength),
                          remaining?.lastIndexOf(", ", maxLength),
                          remaining?.lastIndexOf(" ", maxLength),
                        ];

                        for (const breakPoint of breakPoints) {
                          if (breakPoint > maxLength * 0.7) {
                            splitPoint =
                              breakPoint +
                              (breakPoint === breakPoints[2] ? 2 : 1);
                            break;
                          }
                        }

                        chunks.push(
                          remaining?.substring(0, splitPoint)?.trim(),
                        );
                        remaining = remaining?.substring(splitPoint)?.trim();
                      }

                      if (remaining?.length > 0) {
                        chunks.push(remaining);
                      }

                      return chunks;
                    };

                    // Create multiple rows for long content
                    const rows = [];
                    resultEntries?.forEach(([date, value]) => {
                      if (
                        value &&
                        typeof value === "string" &&
                        value?.length > maxCharsPerRow
                      ) {
                        const chunks = smartSplit(value, maxCharsPerRow);
                        chunks?.forEach((chunk, index) => {
                          if (!rows[index]) {
                            rows[index] = {
                              name:
                                index === 0
                                  ? param?.name
                                  : `${param?.name} (cont.)`,
                              referenceRange:
                                index === 0 ? param?.referenceRange : "",
                              results: {},
                              type: param?.type,
                            };
                          }
                          rows[index].results[date] = chunk;
                        });
                      } else {
                        if (!rows[0]) {
                          rows[0] = {
                            name: param?.name,
                            referenceRange: param?.referenceRange,
                            results: {},
                            type: param?.type,
                          };
                        }
                        rows[0].results[date] = value || "";
                      }
                    });

                    return rows.length > 0 ? rows : [param];
                  };

                  // Process parameters with splitting
                  const splitParameters = [];
                  parameters?.forEach((param) => {
                    const splitRows = splitLongContent(param);
                    splitParameters.push(...splitRows);
                  });

                  // Add rows to service group
                  if (splitParameters?.length > 0) {
                    serviceGroup?.rows?.push(...splitParameters);
                    serviceGroup.hasParameters = true;
                  } else if (hasDirectResults) {
                    const directServiceRow = {
                      name: serviceName,
                      referenceRange: directReferenceRange,
                      results: directResults,
                      type: "service",
                    };
                    const splitDirectRows = splitLongContent(directServiceRow);
                    serviceGroup?.rows?.push(...splitDirectRows);
                    serviceGroup.hasParameters = false;
                  }
                });

                return (
                  <View style={{ marginTop: PX_TO_PT * 15 }}>
                    <Text
                      style={{
                        color: "#000",
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT * printSettings?.page_format?.font_size,
                        fontWeight: 700,
                        marginBottom: PX_TO_PT * 6,
                      }}
                    >
                      Zydus Lab Results
                    </Text>

                    <View style={[styles.table, { break: "avoid" }]}>
                      {/* Table Header */}
                      <View
                        style={[
                          styles.headerRow,
                          {
                            borderTop: "1px solid #171725",
                            backgroundColor: "#cccccc",
                          },
                        ]}
                        fixed
                        wrap={false}
                      >
                        <View
                          style={[
                            styles.headerCell,
                            {
                              flex: investigationFlex,
                              minHeight: PX_TO_PT * 30,
                              justifyContent: "center",
                              borderRight: "1px solid #171725",
                              padding: PX_TO_PT * 6,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily:
                                printSettings?.page_format?.font_family,
                              fontSize:
                                PX_TO_PT *
                                printSettings?.page_format?.font_size,
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "center",
                              lineHeight: 1.3,
                            }}
                            wrap
                          >
                            {INVESTIGATION_TITLE}
                          </Text>
                        </View>

                        <View
                          style={[
                            styles.headerCell,
                            {
                              flex: subParamsFlex,
                              minHeight: PX_TO_PT * 30,
                              justifyContent: "center",
                              borderRight: "1px solid #171725",
                              padding: PX_TO_PT * 6,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily:
                                printSettings?.page_format?.font_family,
                              fontSize:
                                PX_TO_PT *
                                printSettings?.page_format?.font_size,
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "center",
                              lineHeight: 1.3,
                            }}
                            wrap
                          >
                            Sub Params
                          </Text>
                        </View>

                        {/* Date columns */}
                        {dates.map((date, index) => (
                          <View
                            key={index}
                            style={[
                              styles.headerCell,
                              {
                                flex: dateColumnFlex,
                                minHeight: PX_TO_PT * 30,
                                justifyContent: "center",
                                padding: PX_TO_PT * 6,
                              },
                            ]}
                          >
                            <Text
                              style={{
                                fontFamily:
                                  printSettings?.page_format?.font_family,
                                fontSize:
                                  PX_TO_PT *
                                  printSettings?.page_format?.font_size,
                                fontWeight: 600,
                                color: "#000",
                                textAlign: "center",
                                lineHeight: 1.3,
                              }}
                              wrap
                            >
                              {moment(date, "DD-MM-YYYY").format("DD MMM YY")}
                            </Text>
                          </View>
                        ))}
                      </View>

                      {/* Table Body */}
                      {serviceGroups?.map((serviceGroup, groupIndex) => {
                        const totalRows = serviceGroup?.rows?.length || 0;
                        const hasParameters = serviceGroup?.hasParameters;

                        // Handle empty service groups
                        if (totalRows === 0) {
                          return (
                            <View
                              key={groupIndex}
                              style={{ flexDirection: "row" }}
                              wrap={false}
                            >
                              <View
                                style={{
                                  flex: investigationFlex,
                                  minHeight: PX_TO_PT * 30,
                                  justifyContent: "flex-start",
                                  padding: PX_TO_PT * 6,
                                  borderTop: "0px solid transparent",
                                  borderBottom: "1px solid #171725",
                                  borderLeft: "1px solid #171725",
                                  borderRight: "1px solid #171725",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#171725",
                                    fontFamily:
                                      printSettings?.page_format?.font_family,
                                    fontSize:
                                      PX_TO_PT *
                                      printSettings?.page_format?.font_size,
                                    fontWeight: 400,
                                    textAlign: "left",
                                    lineHeight: 1.3,
                                  }}
                                  wrap
                                >
                                  {serviceGroup?.serviceName}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flex: subParamsFlex,
                                  minHeight: PX_TO_PT * 30,
                                  justifyContent: "flex-start",
                                  padding: PX_TO_PT * 6,
                                  borderTop: "0px solid transparent",
                                  borderBottom: "1px solid #171725",
                                  borderRight: "1px solid #171725",
                                  borderLeft: "0px solid transparent",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#171725",
                                    fontFamily:
                                      printSettings?.page_format?.font_family,
                                    fontSize:
                                      PX_TO_PT *
                                      printSettings?.page_format?.font_size,
                                    fontWeight: 400,
                                    textAlign: "left",
                                    lineHeight: 1.3,
                                  }}
                                  wrap
                                >
                                  -
                                </Text>
                              </View>

                              {dates.map((date, dateIndex) => (
                                <View
                                  key={dateIndex}
                                  style={{
                                    flex: dateColumnFlex,
                                    minHeight: PX_TO_PT * 30,
                                    justifyContent: "center",
                                    padding: PX_TO_PT * 6,
                                    borderTop: "0px solid transparent",
                                    borderBottom: "1px solid #171725",
                                    borderRight: "1px solid #171725",
                                    borderLeft: "0px solid transparent",
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#171725",
                                      fontFamily:
                                        printSettings?.page_format?.font_family,
                                      fontSize:
                                        PX_TO_PT *
                                        printSettings?.page_format?.font_size,
                                      fontWeight: 400,
                                      textAlign: "center",
                                      lineHeight: 1.3,
                                    }}
                                    wrap
                                  >
                                    -
                                  </Text>
                                </View>
                              ))}
                            </View>
                          );
                        }

                        // Render service rows with data
                        return (
                          <React.Fragment key={groupIndex}>
                            {serviceGroup?.rows?.map((row, rowIndex) => {
                              const isFirstRow = rowIndex === 0;
                              const isLastRow = rowIndex === totalRows - 1;

                              return (
                                <View
                                  key={rowIndex}
                                  style={{ flexDirection: "row" }}
                                  wrap={false}
                                >
                                  {/* Service Name Column */}
                                  <View
                                    style={{
                                      flex: investigationFlex,
                                      minHeight: PX_TO_PT * 30,
                                      justifyContent: "flex-start",
                                      padding: PX_TO_PT * 6,
                                      backgroundColor: "transparent",
                                      borderLeft: "1px solid #171725",
                                      borderTop: "0px solid transparent",
                                      borderBottom: isLastRow
                                        ? "1px solid #171725"
                                        : hasParameters && totalRows > 1
                                          ? "0px solid transparent"
                                          : "1px solid #171725",
                                      borderRight: "1px solid #171725",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 400,
                                        textAlign: "left",
                                        lineHeight: 1.3,
                                      }}
                                      wrap
                                    >
                                      {(hasParameters && isFirstRow) ||
                                      !hasParameters
                                        ? serviceGroup?.serviceName
                                        : ""}
                                    </Text>
                                  </View>

                                  {/* Sub Parameters Column */}
                                  <View
                                    style={{
                                      flex: subParamsFlex,
                                      minHeight: PX_TO_PT * 30,
                                      justifyContent: "flex-start",
                                      padding: PX_TO_PT * 6,
                                      backgroundColor: "transparent",
                                      borderTop: "0px solid transparent",
                                      borderBottom: "1px solid #171725",
                                      borderRight: "1px solid #171725",
                                      borderLeft: "0px solid transparent",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#171725",
                                        fontFamily:
                                          printSettings?.page_format
                                            ?.font_family,
                                        fontSize:
                                          PX_TO_PT *
                                          printSettings?.page_format?.font_size,
                                        fontWeight: 400,
                                        textAlign: "left",
                                        lineHeight: 1.3,
                                      }}
                                      wrap
                                    >
                                      {hasParameters ? row?.name : "-"}
                                      {hasParameters && row?.referenceRange
                                        ? ` (${row?.referenceRange})`
                                        : ""}
                                    </Text>
                                  </View>

                                  {/* Result Value Columns for each date */}
                                  {dates.map((date, dateIndex) => (
                                    <View
                                      key={dateIndex}
                                      style={{
                                        flex: dateColumnFlex,
                                        minHeight: PX_TO_PT * 30,
                                        justifyContent: "center",
                                        padding: PX_TO_PT * 6,
                                        backgroundColor: "white",
                                        borderTop: "0px solid transparent",
                                        borderBottom: "1px solid #171725",
                                        borderRight: "1px solid #171725",
                                        borderLeft: "0px solid transparent",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: "#171725",
                                          fontFamily:
                                            printSettings?.page_format
                                              ?.font_family,
                                          fontSize:
                                            PX_TO_PT *
                                            printSettings?.page_format
                                              ?.font_size,
                                          fontWeight: 400,
                                          textAlign: "center",
                                          lineHeight: 1.3,
                                        }}
                                        wrap
                                      >
                                        {row?.results?.[date] || "-"}
                                      </Text>
                                    </View>
                                  ))}
                                </View>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}
                    </View>
                  </View>
                );
              } catch (error) {
                console.error("Error rendering Zydus lab results:", error);
                return null;
              }
            })()}

          <View style={{ marginTop: PX_TO_PT * 29 }} wrap={false}>
            {printSettings?.signature_enable === "Y" &&
              fileSignature &&
              fileSignature?.imageShow && (
                <View
                  style={{
                    alignSelf:
                      printSettings?.header_footer?.other_settings
                        ?.signature_place === "R" && "flex-end",
                  }}
                >
                  {fileSignature?.showFile && (
                    <Image
                      style={{ width: 139, height: 60, objectFit: "contain" }}
                      src={fileSignature?.showFile}
                    />
                  )}
                </View>
              )}

            {printSettings?.qrcode_enable === "Y" &&
            printSettings?.signature_enable === "Y" ? (
              printSettings?.header_footer?.other_settings?.signature_place ===
              "R" ? (
                <View style={styles.directionCasemanager}>
                  <View style={[styles.directionCasemanager, { flex: 1 }]}>
                    {printSettings?.qrcode && (
                      <>
                        <Image
                          style={{
                            width: 61,
                            height: 61,
                            objectFit: "contain",
                          }}
                          src={printSettings?.qrcode}
                        />
                        <Text
                          style={{
                            fontSize: PX_TO_PT * 10,
                            color: "#000",
                            fontFamily: "Roboto",
                            fontWeight: 400,
                          }}
                        >
                          {`Scan QR code to book an appointment\nwith your doctor`}
                        </Text>
                      </>
                    )}
                  </View>
                  <View style={{ flex: 1, textAlign: "right" }}>
                    {printSettings?.header_footer?.other_settings
                      ?.name_of_doctor_enable === "Y" && (
                      <Text
                        style={[
                          styles.extraText,
                          { fontWeight: 700, color: "#000" },
                        ]}
                      >
                        {caseManagerData?.doctor_data?.doctor_name}
                      </Text>
                    )}
                    {printSettings?.header_footer?.other_settings
                      ?.registration_no_enable === "Y" && (
                      <Text
                        style={[
                          styles.extraText,
                          { fontWeight: 400, color: "#000" },
                        ]}
                      >
                        Medical Registration No.:{" "}
                        {caseManagerData?.doctor_data?.gmc_no}
                      </Text>
                    )}
                    {printSettings?.header_footer?.other_settings
                      ?.qualification_enable === "Y" && (
                      <Text
                        style={[
                          styles.extraText,
                          { fontWeight: 400, color: "#000" },
                        ]}
                      >
                        {printSettings?.header_footer?.other_settings
                          ?.qualification
                          ? printSettings?.header_footer?.other_settings
                              ?.qualification
                          : caseManagerData?.doctor_data?.um_qualifications}
                      </Text>
                    )}
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    {printSettings?.header_footer?.other_settings
                      ?.name_of_doctor_enable === "Y" && (
                      <Text
                        style={[
                          styles.extraText,
                          { fontWeight: 700, color: "#000" },
                        ]}
                      >
                        {caseManagerData?.doctor_data?.doctor_name}
                      </Text>
                    )}
                    {printSettings?.header_footer?.other_settings
                      ?.registration_no_enable === "Y" && (
                      <Text
                        style={[
                          styles.extraText,
                          { fontWeight: 400, color: "#000" },
                        ]}
                      >
                        Medical Registration No.:{" "}
                        {caseManagerData?.doctor_data?.gmc_no}
                      </Text>
                    )}
                    {printSettings?.header_footer?.other_settings
                      ?.qualification_enable === "Y" && (
                      <Text
                        style={[
                          styles.extraText,
                          { fontWeight: 400, color: "#000" },
                        ]}
                      >
                        {printSettings?.header_footer?.other_settings
                          ?.qualification
                          ? printSettings?.header_footer?.other_settings
                              ?.qualification
                          : caseManagerData?.doctor_data?.um_qualifications}
                      </Text>
                    )}
                  </View>
                  <View
                    style={[
                      styles.directionCasemanager,
                      { flex: 1, justifyContent: "flex-end" },
                    ]}
                  >
                    {printSettings?.qrcode && (
                      <>
                        <Image
                          style={{
                            width: 61,
                            height: 61,
                            objectFit: "contain",
                          }}
                          src={printSettings?.qrcode}
                        />
                        <Text
                          style={{
                            fontSize: PX_TO_PT * 10,
                            color: "#000",
                            fontFamily: "Roboto",
                            fontWeight: 400,
                          }}
                        >
                          {`Scan QR code to book an appointment\nwith your doctor`}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              )
            ) : (
              (printSettings?.qrcode_enable === "Y" ||
                printSettings?.signature_enable === "Y") && (
                <View style={{ flexDirection: "row" }}>
                  {printSettings?.qrcode_enable === "Y" && (
                    <View style={styles.directionCasemanager}>
                      {printSettings?.qrcode && (
                        <>
                          <Image
                            style={{
                              width: 61,
                              height: 61,
                              objectFit: "contain",
                            }}
                            src={printSettings?.qrcode}
                          />
                          <Text
                            style={{
                              fontSize: PX_TO_PT * 10,
                              color: "#000",
                              fontFamily: "Roboto",
                              fontWeight: 400,
                            }}
                          >
                            {`Scan QR code to book an appointment\nwith your doctor`}
                          </Text>
                        </>
                      )}
                    </View>
                  )}
                  {printSettings?.signature_enable === "Y" && (
                    <View
                      style={{
                        flex: 1,
                        textAlign:
                          printSettings?.header_footer?.other_settings
                            ?.signature_place === "R" && "right",
                      }}
                    >
                      {printSettings?.header_footer?.other_settings
                        ?.name_of_doctor_enable === "Y" && (
                        <Text
                          style={[
                            styles.extraText,
                            { fontWeight: 700, color: "#000" },
                          ]}
                        >
                          {caseManagerData?.doctor_data?.doctor_name}
                        </Text>
                      )}
                      {printSettings?.header_footer?.other_settings
                        ?.registration_no_enable === "Y" && (
                        <Text
                          style={[
                            styles.extraText,
                            { fontWeight: 400, color: "#000" },
                          ]}
                        >
                          Medical Registration No.:{" "}
                          {caseManagerData?.doctor_data?.gmc_no}
                        </Text>
                      )}
                      {printSettings?.header_footer?.other_settings
                        ?.qualification_enable === "Y" && (
                        <Text
                          style={[
                            styles.extraText,
                            { fontWeight: 400, color: "#000" },
                          ]}
                        >
                          {printSettings?.header_footer?.other_settings
                            ?.qualification
                            ? printSettings?.header_footer?.other_settings
                                ?.qualification
                            : caseManagerData?.doctor_data?.um_qualifications}
                        </Text>
                      )}
                      {isTeleconsultType2 && (
                        <Text
                          style={[
                            styles.extraText,
                            {
                              fontWeight: 400,
                              color: "#000",
                              marginBottom: PX_TO_PT * 20,
                            },
                          ]}
                        >
                          Note: This Prescription generated via teleconsultation.
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              )
            )}
          </View>

          {/* </View> */}
          {/* <View
                        fixed
                        render={({ pageNumber }) => {
                            const isFirstPage = pageNumber === 1;
                            const isOwnLetterheadFirstPageOnly = printSettings?.letterhead_format === 2 && showMode === 'first';
                            
                            if (isOwnLetterheadFirstPageOnly && isFirstPage) {
                                // On first page, add bottom spacer to match user's intended letterhead margins
                                const userBottomMargin = getMarginByFormat(printSettings?.letterhead_format, printSettings?.header_footer, "bottom", 0.5);
                                const standardMargin = 0.5 * 25; // 0.5 inches in points
                                const extraBottomSpace = Math.max(0, userBottomMargin - standardMargin);
                                
                                return (
                                    <View style={{
                                        marginBottom: extraBottomSpace,
                                        height: 0,
                                    }} />
                                );
                            }
                            return null;
                        }}
                    /> */}
          {
            <View
              style={{
                width: "100%",
                position: "absolute",
                bottom: getMarginByFormat(
                  printSettings?.letterhead_format,
                  printSettings?.header_footer,
                  "bottom",
                  0.5,
                ),
                left:
                  mode !== NORMAL
                    ? PX_TO_PT * 30
                    : getMarginByFormat(
                        printSettings?.letterhead_format,
                        printSettings?.header_footer,
                        "left",
                        0.5,
                      ),
                right:
                  mode !== NORMAL
                    ? PX_TO_PT * 30
                    : getMarginByFormat(
                        printSettings?.letterhead_format,
                        printSettings?.header_footer,
                        "right",
                        0.5,
                      ),
              }}
              fixed
              render={({ pageNumber }) => {
                if (
                  pageNumber === 1 ||
                  (pageNumber > 1 && showMode === "all")
                ) {
                  return (
                    <View>
                      {mode == NORMAL ? (
                        printSettings?.letterhead_format === 0 ? (
                          <View style={{ width: "100%" }}>
                            {printSettings?.header_footer?.footer?.title && (
                              <View
                                style={{
                                  backgroundColor: "#171725",
                                  height: PX_TO_PT * 2,
                                  width: "100%",
                                }}
                              />
                            )}
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 8,
                                color: "#171725",
                                fontFamily: "Roboto",
                                fontSize:
                                  PX_TO_PT *
                                  printSettings?.header_footer?.footer
                                    ?.font_size,
                                fontWeight: 400,
                                maxLines: 1,
                              }}
                            >
                              {printSettings?.header_footer?.footer?.title}
                            </Text>
                          </View>
                        ) : (
                          printSettings?.letterhead_format === 1 &&
                          fileFooter &&
                          fileFooter?.imageShow && (
                            <Image
                              style={{
                                width: "100%",
                                height: fileFooter?.renderedFooterImageHeight,
                                objectFit: "cover",
                              }}
                              src={fileFooter?.showFile}
                              width={"100px"}
                            />
                          )
                        )
                      ) : mode !== NORMAL ? (
                        printSettings?.whatsapp_letterhead_format === 0 ? (
                          <View>
                            {printSettings?.header_footer?.footer?.title && (
                              <View
                                style={{
                                  backgroundColor: "#171725",
                                  height: PX_TO_PT * 2,
                                  width: "100%",
                                }}
                              />
                            )}
                            <Text
                              style={{
                                marginTop: PX_TO_PT * 8,
                                color: "#171725",
                                fontFamily: "Roboto",
                                fontSize:
                                  PX_TO_PT *
                                  printSettings?.header_footer?.footer
                                    ?.font_size,
                                fontWeight: 400,
                                maxLines: 1,
                              }}
                            >
                              {printSettings?.header_footer?.footer?.title}
                            </Text>
                          </View>
                        ) : (
                          printSettings?.whatsapp_letterhead_format === 1 &&
                          fileFooter &&
                          fileFooter?.imageShow && (
                            <Image
                              style={{
                                width: "100%",
                                height: fileFooter?.renderedFooterImageHeight,
                                objectFit: "cover",
                              }}
                              src={fileFooter?.showFile}
                              height={fileFooter?.footerHeight}
                              width={"100px"}
                            />
                          )
                        )
                      ) : null}
                    </View>
                  );
                }
              }}
            ></View>
          }

          {printSettings?.page_format?.pagination && <PageNumberFooter />}
        </Page>
      )}
    </Document>
  );
};

export default React.memo(ViewPDF);