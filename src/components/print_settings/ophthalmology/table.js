import React from "react";
import { Text, View } from "@react-pdf/renderer";

function OphthalmologyTableView({
  PX_TO_PT,
  styles,
  printSettings,
  ophthalModuleData,
}) {
  const visualAcuity = ophthalModuleData?.visualAcuity || [];
  const autoRefraction = ophthalModuleData?.autoRefraction || [];
  const lensometerValues = ophthalModuleData?.lensometerValues || [];
  const glassPrescription = ophthalModuleData?.glassPrescription || [];
  const intraOcularPressure = ophthalModuleData?.intraOcularPressure || [];
  const slitLampExamination = ophthalModuleData?.slitLampExamination || [];
  const fundusExamination = ophthalModuleData?.fundusExamination || [];

  const getEyeData = (dataArray, eye) => {
    return dataArray.find((item) => item.eye === eye) || {};
  };

  const renderSection = (title, renderContent) => {
    return (
      <View style={{ marginTop: PX_TO_PT * 15, marginBottom: PX_TO_PT * 10 }}>
        <Text
          style={{
            color: "#171725",
            fontFamily: printSettings?.page_format?.font_family,
            fontSize: PX_TO_PT * (printSettings?.page_format?.font_size || 12),
            fontWeight: 700,
            marginBottom: PX_TO_PT * 8,
          }}
        >
          {title}
        </Text>
        {renderContent()}
      </View>
    );
  };

  const renderTableRow = (label, odValue, osValue) => {
    return (
      <View
        style={{
          flexDirection: "row",
          borderBottom: "1px solid #171725",
          borderLeft: "1px solid #171725",
          borderRight: "1px solid #171725",
        }}
      >
        <Text
          style={{
            width: "40%",
            padding: PX_TO_PT * 6,
            borderRight: "1px solid #171725",
            fontFamily: printSettings?.page_format?.font_family,
            fontSize: PX_TO_PT * (printSettings?.page_format?.font_size || 12),
            color: "#000",
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            width: "30%",
            padding: PX_TO_PT * 6,
            borderRight: "1px solid #171725",
            fontFamily: printSettings?.page_format?.font_family,
            fontSize: PX_TO_PT * (printSettings?.page_format?.font_size || 12),
            color: "#000",
            textAlign: "center",
          }}
        >
          {odValue || "--"}
        </Text>
        <Text
          style={{
            width: "30%",
            padding: PX_TO_PT * 6,
            fontFamily: printSettings?.page_format?.font_family,
            fontSize: PX_TO_PT * (printSettings?.page_format?.font_size || 12),
            color: "#000",
            textAlign: "center",
          }}
        >
          {osValue || "--"}
        </Text>
      </View>
    );
  };

  const renderTableHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#E2E2EA",
          borderTop: "1px solid #171725",
          borderLeft: "1px solid #171725",
          borderRight: "1px solid #171725",
        }}
      >
        <Text
          style={{
            width: "40%",
            padding: PX_TO_PT * 6,
            borderRight: "1px solid #171725",
            fontFamily: printSettings?.page_format?.font_family,
            fontSize: PX_TO_PT * (printSettings?.page_format?.font_size || 12),
            fontWeight: 500,
            color: "#000",
          }}
        >
          Test
        </Text>
        <Text
          style={{
            width: "30%",
            padding: PX_TO_PT * 6,
            borderRight: "1px solid #171725",
            fontFamily: printSettings?.page_format?.font_family,
            fontSize: PX_TO_PT * (printSettings?.page_format?.font_size || 12),
            fontWeight: 500,
            color: "#000",
            textAlign: "center",
          }}
        >
          OD
        </Text>
        <Text
          style={{
            width: "30%",
            padding: PX_TO_PT * 6,
            fontFamily: printSettings?.page_format?.font_family,
            fontSize: PX_TO_PT * (printSettings?.page_format?.font_size || 12),
            fontWeight: 500,
            color: "#000",
            textAlign: "center",
          }}
        >
          OS
        </Text>
      </View>
    );
  };

  return (
    <View style={{ marginTop: PX_TO_PT * 15 }}>
      {/* Visual Acuity Test */}
      {visualAcuity.length > 0 &&
        renderSection("Visual Acuity Test", () => {
          const odData = getEyeData(visualAcuity, "OD");
          const osData = getEyeData(visualAcuity, "OS");
          return (
            <View>
              {renderTableHeader()}
              {renderTableRow(
                "UC DISTANCE",
                odData.ucDistance ? `6/${odData.ucDistance}` : "--",
                osData.ucDistance ? `6/${osData.ucDistance}` : "--"
              )}
              {renderTableRow(
                "UC NEAR",
                odData.ucNear ? `N${odData.ucNear}` : "--",
                osData.ucNear ? `N${osData.ucNear}` : "--"
              )}
              {renderTableRow(
                "PINHOLE",
                odData.pinhole ? `6/${odData.pinhole}` : "--",
                osData.pinhole ? `6/${osData.pinhole}` : "--"
              )}
              {renderTableRow(
                "C DISTANCE",
                odData.cDistance ? `6/${odData.cDistance}` : "--",
                osData.cDistance ? `6/${osData.cDistance}` : "--"
              )}
              {renderTableRow(
                "C NEAR",
                odData.cNear ? `6/${odData.cNear}` : "--",
                osData.cNear ? `6/${osData.cNear}` : "--"
              )}
            </View>
          );
        })}

      {/* Subjective Refraction */}
      {autoRefraction.length > 0 &&
        renderSection("Subjective Refraction", () => {
          const undilatedOD = autoRefraction.find(
            (item) => item.eye === "OD" && item.type === "Undilated"
          );
          const undilatedOS = autoRefraction.find(
            (item) => item.eye === "OS" && item.type === "Undilated"
          );
          const dilatedOD = autoRefraction.find(
            (item) => item.eye === "OD" && item.type === "Dilated"
          );
          const dilatedOS = autoRefraction.find(
            (item) => item.eye === "OS" && item.type === "Dilated"
          );

          return (
            <View>
              {/* Undilated */}
              <Text
                style={{
                  marginTop: PX_TO_PT * 8,
                  marginBottom: PX_TO_PT * 5,
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                Undialted
              </Text>
              {renderTableHeader()}
              {renderTableRow(
                "SPHERE",
                undilatedOD?.sphere || "--",
                undilatedOS?.sphere || "--"
              )}
              {renderTableRow(
                "CYLINDER",
                undilatedOD?.cylinder || "--",
                undilatedOS?.cylinder || "--"
              )}
              {renderTableRow(
                "AXIS",
                undilatedOD?.axis ? `${undilatedOD.axis}°` : "--",
                undilatedOS?.axis ? `${undilatedOS.axis}°` : "--"
              )}
              {renderTableRow(
                "ADD",
                undilatedOD?.add || "--",
                undilatedOS?.add || "--"
              )}
              {renderTableRow(
                "DISTANCE",
                undilatedOD?.distance ? `6/${undilatedOD.distance}` : "--",
                undilatedOS?.distance ? `6/${undilatedOS.distance}` : "--"
              )}
              {renderTableRow(
                "NEAR",
                undilatedOD?.near ? `N${undilatedOD.near}` : "--",
                undilatedOS?.near ? `N${undilatedOS.near}` : "--"
              )}

              {/* Dilated */}
              {(dilatedOD || dilatedOS) && (
                <>
                  <Text
                    style={{
                      marginTop: PX_TO_PT * 8,
                      marginBottom: PX_TO_PT * 5,
                      fontFamily: printSettings?.page_format?.font_family,
                      fontSize:
                        PX_TO_PT *
                        (printSettings?.page_format?.font_size || 12),
                      fontWeight: 500,
                      color: "#000",
                    }}
                  >
                    Dialted
                  </Text>
                  {renderTableHeader()}
                  {renderTableRow(
                    "SPHERE",
                    dilatedOD?.sphere || "--",
                    dilatedOS?.sphere || "--"
                  )}
                  {renderTableRow(
                    "CYLINDER",
                    dilatedOD?.cylinder || "--",
                    dilatedOS?.cylinder || "--"
                  )}
                  {renderTableRow(
                    "AXIS",
                    dilatedOD?.axis ? `${dilatedOD.axis}°` : "--",
                    dilatedOS?.axis ? `${dilatedOS.axis}°` : "--"
                  )}
                  {renderTableRow(
                    "ADD",
                    dilatedOD?.add || "--",
                    dilatedOS?.add || "--"
                  )}
                  {renderTableRow(
                    "DISTANCE",
                    dilatedOD?.distance ? `6/${dilatedOD.distance}` : "--",
                    dilatedOS?.distance ? `6/${dilatedOS.distance}` : "--"
                  )}
                  {renderTableRow(
                    "NEAR",
                    dilatedOD?.near ? `N${dilatedOD.near}` : "--",
                    dilatedOS?.near ? `N${dilatedOS.near}` : "--"
                  )}
                </>
              )}
            </View>
          );
        })}

      {/* Lensometer Values */}
      {lensometerValues.length > 0 &&
        renderSection("Lensometer Values", () => {
          const odData = getEyeData(lensometerValues, "OD");
          const osData = getEyeData(lensometerValues, "OS");
          return (
            <View>
              {renderTableHeader()}
              {renderTableRow(
                "SPHERE",
                odData.sphere || "--",
                osData.sphere || "--"
              )}
              {renderTableRow(
                "CYLINDER",
                odData.cylinder || "--",
                osData.cylinder || "--"
              )}
              {renderTableRow(
                "AXIS",
                odData.axis ? `${odData.axis}°` : "--",
                osData.axis ? `${osData.axis}°` : "--"
              )}
              {renderTableRow("ADD", odData.add || "--", osData.add || "--")}
              {renderTableRow(
                "DISTANCE",
                odData.distance ? `6/${odData.distance}` : "--",
                osData.distance ? `6/${osData.distance}` : "--"
              )}
              {renderTableRow(
                "NEAR",
                odData.near ? `N${odData.near}` : "--",
                osData.near ? `N${osData.near}` : "--"
              )}
            </View>
          );
        })}

      {/* Glass Prescription */}
      {glassPrescription.length > 0 &&
        renderSection("Glass Prescription", () => {
          const odData = getEyeData(glassPrescription, "OD");
          const osData = getEyeData(glassPrescription, "OS");
          const pd = ophthalModuleData?.pd;
          return (
            <View>
              {renderTableHeader()}
              {renderTableRow(
                "SPHERE",
                odData.sphere || "--",
                osData.sphere || "--"
              )}
              {renderTableRow(
                "CYLINDER",
                odData.cylinder || "--",
                osData.cylinder || "--"
              )}
              {renderTableRow(
                "AXIS",
                odData.axis ? `${odData.axis}°` : "--",
                osData.axis ? `${osData.axis}°` : "--"
              )}
              {renderTableRow("ADD", odData.add || "--", osData.add || "--")}
              {renderTableRow(
                "DISTANCE",
                odData.distance ? `6/${odData.distance}` : "--",
                osData.distance ? `6/${osData.distance}` : "--"
              )}
              {renderTableRow(
                "NEAR",
                odData.near ? `N${odData.near}` : "--",
                osData.near ? `N${osData.near}` : "--"
              )}
              {pd && (
                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #171725",
                    borderLeft: "1px solid #171725",
                    borderRight: "1px solid #171725",
                    marginTop: PX_TO_PT * 5,
                  }}
                >
                  <Text
                    style={{
                      width: "40%",
                      padding: PX_TO_PT * 6,
                      borderRight: "1px solid #171725",
                      fontFamily: printSettings?.page_format?.font_family,
                      fontSize:
                        PX_TO_PT *
                        (printSettings?.page_format?.font_size || 12),
                      color: "#000",
                    }}
                  >
                    PD
                  </Text>
                  <Text
                    style={{
                      width: "60%",
                      padding: PX_TO_PT * 6,
                      fontFamily: printSettings?.page_format?.font_family,
                      fontSize:
                        PX_TO_PT *
                        (printSettings?.page_format?.font_size || 12),
                      color: "#000",
                    }}
                  >
                    {pd}
                  </Text>
                </View>
              )}
            </View>
          );
        })}

      {/* Intra Ocular Pressure */}
      {intraOcularPressure.length > 0 &&
        renderSection("Intra Ocular Pressure", () => {
          const odData = getEyeData(intraOcularPressure, "OD");
          const osData = getEyeData(intraOcularPressure, "OS");
          return (
            <View>
              {renderTableHeader()}
              {renderTableRow(
                "NCT",
                odData.nct ? `${odData.nct} mmhg` : "--",
                osData.nct ? `${osData.nct} mmhg` : "--"
              )}
              {renderTableRow(
                "GAT",
                odData.gat ? `${odData.gat} mmhg` : "--",
                osData.gat ? `${osData.gat} mmhg` : "--"
              )}
              {renderTableRow(
                "CCT",
                odData.cc ? `${odData.cc} µm` : "--",
                osData.cc ? `${osData.cc} µm` : "--"
              )}
              {renderTableRow(
                "CIOP",
                odData.ciop ? `${odData.ciop} mmHg` : "--",
                osData.ciop ? `${osData.ciop} mmHg` : "--"
              )}
            </View>
          );
        })}

      {/* Slit Lamp Examination */}
      {slitLampExamination.length > 0 &&
        renderSection("Slit Lamp Examination", () => {
          return (
            <View>
              {renderTableHeader()}
              {slitLampExamination.map((item, index) => {
                const odValue =
                  item.OD === "0" || item.OD === 0
                    ? "Normal"
                    : item.OD || "--";
                const osValue =
                  item.OS === "0" || item.OS === 0
                    ? "Normal"
                    : item.OS || "--";

                return (
                  <View key={index}>
                    {renderTableRow(
                      item.section,
                      odValue,
                      osValue
                    )}
                    {item.remarks && (
                      <View
                        style={{
                          flexDirection: "row",
                          borderBottom: "1px solid #171725",
                          borderLeft: "1px solid #171725",
                          borderRight: "1px solid #171725",
                        }}
                      >
                        <Text
                          style={{
                            width: "40%",
                            padding: PX_TO_PT * 6,
                            borderRight: "1px solid #171725",
                            fontFamily:
                              printSettings?.page_format?.font_family,
                            fontSize:
                              PX_TO_PT *
                              (printSettings?.page_format?.font_size || 12),
                            color: "#000",
                          }}
                        >
                          REMARKS
                        </Text>
                        <Text
                          style={{
                            width: "60%",
                            padding: PX_TO_PT * 6,
                            fontFamily:
                              printSettings?.page_format?.font_family,
                            fontSize:
                              PX_TO_PT *
                              (printSettings?.page_format?.font_size || 12),
                            color: "#000",
                          }}
                        >
                          {item.remarks}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}

      {/* Fundus Examination */}
      {fundusExamination.length > 0 &&
        renderSection("Fundus Examination", () => {
          return (
            <View>
              {renderTableHeader()}
              {fundusExamination.map((item, index) => {
                const odValue =
                  item.OD === "0" || item.OD === 0
                    ? "Normal"
                    : item.OD || "--";
                const osValue =
                  item.OS === "0" || item.OS === 0
                    ? "Normal"
                    : item.OS || "--";

                return (
                  <View key={index}>
                    {renderTableRow(
                      item.section,
                      odValue,
                      osValue
                    )}
                    {item.remarks && (
                      <View
                        style={{
                          flexDirection: "row",
                          borderBottom: "1px solid #171725",
                          borderLeft: "1px solid #171725",
                          borderRight: "1px solid #171725",
                        }}
                      >
                        <Text
                          style={{
                            width: "40%",
                            padding: PX_TO_PT * 6,
                            borderRight: "1px solid #171725",
                            fontFamily:
                              printSettings?.page_format?.font_family,
                            fontSize:
                              PX_TO_PT *
                              (printSettings?.page_format?.font_size || 12),
                            color: "#000",
                          }}
                        >
                          REMARKS
                        </Text>
                        <Text
                          style={{
                            width: "60%",
                            padding: PX_TO_PT * 6,
                            fontFamily:
                              printSettings?.page_format?.font_family,
                            fontSize:
                              PX_TO_PT *
                              (printSettings?.page_format?.font_size || 12),
                            color: "#000",
                          }}
                        >
                          {item.remarks}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
    </View>
  );
}

export default OphthalmologyTableView;
