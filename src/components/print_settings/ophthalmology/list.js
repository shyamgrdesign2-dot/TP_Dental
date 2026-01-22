import React from "react";
import { Text, View } from "@react-pdf/renderer";

function OphthalmologyListView({
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

  const renderListItem = (label, value) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginBottom: PX_TO_PT * 5,
          paddingBottom: PX_TO_PT * 5,
          borderBottom: "1px solid #E2E2EA",
        }}
      >
        <Text
          style={{
            width: "40%",
            fontFamily: printSettings?.page_format?.font_family,
            fontSize: PX_TO_PT * (printSettings?.page_format?.font_size || 12),
            color: "#000",
            fontWeight: 500,
          }}
        >
          {label}:
        </Text>
        <Text
          style={{
            width: "60%",
            fontFamily: printSettings?.page_format?.font_family,
            fontSize: PX_TO_PT * (printSettings?.page_format?.font_size || 12),
            color: "#000",
          }}
        >
          {value || "--"}
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
              <Text
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  marginBottom: PX_TO_PT * 8,
                  color: "#000",
                }}
              >
                OD (Right Eye):
              </Text>
              {renderListItem(
                "UC DISTANCE",
                odData.ucDistance ? `6/${odData.ucDistance}` : "--"
              )}
              {renderListItem(
                "UC NEAR",
                odData.ucNear ? `N${odData.ucNear}` : "--"
              )}
              {renderListItem(
                "PINHOLE",
                odData.pinhole ? `6/${odData.pinhole}` : "--"
              )}
              {renderListItem(
                "C DISTANCE",
                odData.cDistance ? `6/${odData.cDistance}` : "--"
              )}
              {renderListItem(
                "C NEAR",
                odData.cNear ? `6/${odData.cNear}` : "--"
              )}

              <Text
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  marginTop: PX_TO_PT * 15,
                  marginBottom: PX_TO_PT * 8,
                  color: "#000",
                }}
              >
                OS (Left Eye):
              </Text>
              {renderListItem(
                "UC DISTANCE",
                osData.ucDistance ? `6/${osData.ucDistance}` : "--"
              )}
              {renderListItem(
                "UC NEAR",
                osData.ucNear ? `N${osData.ucNear}` : "--"
              )}
              {renderListItem(
                "PINHOLE",
                osData.pinhole ? `6/${osData.pinhole}` : "--"
              )}
              {renderListItem(
                "C DISTANCE",
                osData.cDistance ? `6/${osData.cDistance}` : "--"
              )}
              {renderListItem(
                "C NEAR",
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
              <Text
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  marginBottom: PX_TO_PT * 8,
                  color: "#000",
                }}
              >
                Undialted
              </Text>
              <Text
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  marginBottom: PX_TO_PT * 8,
                  color: "#000",
                }}
              >
                OD (Right Eye):
              </Text>
              {renderListItem("SPHERE", undilatedOD?.sphere || "--")}
              {renderListItem("CYLINDER", undilatedOD?.cylinder || "--")}
              {renderListItem(
                "AXIS",
                undilatedOD?.axis ? `${undilatedOD.axis}°` : "--"
              )}
              {renderListItem("ADD", undilatedOD?.add || "--")}
              {renderListItem(
                "DISTANCE",
                undilatedOD?.distance ? `6/${undilatedOD.distance}` : "--"
              )}
              {renderListItem(
                "NEAR",
                undilatedOD?.near ? `N${undilatedOD.near}` : "--"
              )}

              <Text
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  marginTop: PX_TO_PT * 15,
                  marginBottom: PX_TO_PT * 8,
                  color: "#000",
                }}
              >
                OS (Left Eye):
              </Text>
              {renderListItem("SPHERE", undilatedOS?.sphere || "--")}
              {renderListItem("CYLINDER", undilatedOS?.cylinder || "--")}
              {renderListItem(
                "AXIS",
                undilatedOS?.axis ? `${undilatedOS.axis}°` : "--"
              )}
              {renderListItem("ADD", undilatedOS?.add || "--")}
              {renderListItem(
                "DISTANCE",
                undilatedOS?.distance ? `6/${undilatedOS.distance}` : "--"
              )}
              {renderListItem(
                "NEAR",
                undilatedOS?.near ? `N${undilatedOS.near}` : "--"
              )}

              {(dilatedOD || dilatedOS) && (
                <>
                  <Text
                    style={{
                      fontFamily: printSettings?.page_format?.font_family,
                      fontSize:
                        PX_TO_PT *
                        (printSettings?.page_format?.font_size || 12),
                      fontWeight: 500,
                      marginTop: PX_TO_PT * 15,
                      marginBottom: PX_TO_PT * 8,
                      color: "#000",
                    }}
                  >
                    Dialted
                  </Text>
                  <Text
                    style={{
                      fontFamily: printSettings?.page_format?.font_family,
                      fontSize:
                        PX_TO_PT *
                        (printSettings?.page_format?.font_size || 12),
                      fontWeight: 500,
                      marginBottom: PX_TO_PT * 8,
                      color: "#000",
                    }}
                  >
                    OD (Right Eye):
                  </Text>
                  {renderListItem("SPHERE", dilatedOD?.sphere || "--")}
                  {renderListItem("CYLINDER", dilatedOD?.cylinder || "--")}
                  {renderListItem(
                    "AXIS",
                    dilatedOD?.axis ? `${dilatedOD.axis}°` : "--"
                  )}
                  {renderListItem("ADD", dilatedOD?.add || "--")}
                  {renderListItem(
                    "DISTANCE",
                    dilatedOD?.distance ? `6/${dilatedOD.distance}` : "--"
                  )}
                  {renderListItem(
                    "NEAR",
                    dilatedOD?.near ? `N${dilatedOD.near}` : "--"
                  )}

                  <Text
                    style={{
                      fontFamily: printSettings?.page_format?.font_family,
                      fontSize:
                        PX_TO_PT *
                        (printSettings?.page_format?.font_size || 12),
                      fontWeight: 500,
                      marginTop: PX_TO_PT * 15,
                      marginBottom: PX_TO_PT * 8,
                      color: "#000",
                    }}
                  >
                    OS (Left Eye):
                  </Text>
                  {renderListItem("SPHERE", dilatedOS?.sphere || "--")}
                  {renderListItem("CYLINDER", dilatedOS?.cylinder || "--")}
                  {renderListItem(
                    "AXIS",
                    dilatedOS?.axis ? `${dilatedOS.axis}°` : "--"
                  )}
                  {renderListItem("ADD", dilatedOS?.add || "--")}
                  {renderListItem(
                    "DISTANCE",
                    dilatedOS?.distance ? `6/${dilatedOS.distance}` : "--"
                  )}
                  {renderListItem(
                    "NEAR",
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
              <Text
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  marginBottom: PX_TO_PT * 8,
                  color: "#000",
                }}
              >
                OD (Right Eye):
              </Text>
              {renderListItem("SPHERE", odData.sphere || "--")}
              {renderListItem("CYLINDER", odData.cylinder || "--")}
              {renderListItem(
                "AXIS",
                odData.axis ? `${odData.axis}°` : "--"
              )}
              {renderListItem("ADD", odData.add || "--")}
              {renderListItem(
                "DISTANCE",
                odData.distance ? `6/${odData.distance}` : "--"
              )}
              {renderListItem("NEAR", odData.near ? `N${odData.near}` : "--")}

              <Text
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  marginTop: PX_TO_PT * 15,
                  marginBottom: PX_TO_PT * 8,
                  color: "#000",
                }}
              >
                OS (Left Eye):
              </Text>
              {renderListItem("SPHERE", osData.sphere || "--")}
              {renderListItem("CYLINDER", osData.cylinder || "--")}
              {renderListItem("AXIS", osData.axis ? `${osData.axis}°` : "--")}
              {renderListItem("ADD", osData.add || "--")}
              {renderListItem(
                "DISTANCE",
                osData.distance ? `6/${osData.distance}` : "--"
              )}
              {renderListItem("NEAR", osData.near ? `N${osData.near}` : "--")}
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
              <Text
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  marginBottom: PX_TO_PT * 8,
                  color: "#000",
                }}
              >
                OD (Right Eye):
              </Text>
              {renderListItem("SPHERE", odData.sphere || "--")}
              {renderListItem("CYLINDER", odData.cylinder || "--")}
              {renderListItem("AXIS", odData.axis ? `${odData.axis}°` : "--")}
              {renderListItem("ADD", odData.add || "--")}
              {renderListItem(
                "DISTANCE",
                odData.distance ? `6/${odData.distance}` : "--"
              )}
              {renderListItem("NEAR", odData.near ? `N${odData.near}` : "--")}

              <Text
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  marginTop: PX_TO_PT * 15,
                  marginBottom: PX_TO_PT * 8,
                  color: "#000",
                }}
              >
                OS (Left Eye):
              </Text>
              {renderListItem("SPHERE", osData.sphere || "--")}
              {renderListItem("CYLINDER", osData.cylinder || "--")}
              {renderListItem("AXIS", osData.axis ? `${osData.axis}°` : "--")}
              {renderListItem("ADD", osData.add || "--")}
              {renderListItem(
                "DISTANCE",
                osData.distance ? `6/${osData.distance}` : "--"
              )}
              {renderListItem("NEAR", osData.near ? `N${osData.near}` : "--")}
              {pd && renderListItem("PD", pd)}
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
              <Text
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  marginBottom: PX_TO_PT * 8,
                  color: "#000",
                }}
              >
                OD (Right Eye):
              </Text>
              {renderListItem(
                "NCT",
                odData.nct ? `${odData.nct} mmhg` : "--"
              )}
              {renderListItem(
                "GAT",
                odData.gat ? `${odData.gat} mmhg` : "--"
              )}
              {renderListItem(
                "CCT",
                odData.cc ? `${odData.cc} µm` : "--"
              )}
              {renderListItem(
                "CIOP",
                odData.ciop ? `${odData.ciop} mmHg` : "--"
              )}

              <Text
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                  fontWeight: 500,
                  marginTop: PX_TO_PT * 15,
                  marginBottom: PX_TO_PT * 8,
                  color: "#000",
                }}
              >
                OS (Left Eye):
              </Text>
              {renderListItem(
                "NCT",
                osData.nct ? `${osData.nct} mmhg` : "--"
              )}
              {renderListItem(
                "GAT",
                osData.gat ? `${osData.gat} mmhg` : "--"
              )}
              {renderListItem(
                "CCT",
                osData.cc ? `${osData.cc} µm` : "--"
              )}
              {renderListItem(
                "CIOP",
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
              {slitLampExamination.map((item, index) => {
                const odValue =
                  item.OD === "0" || item.OD === 0 ? "Normal" : item.OD || "--";
                const osValue =
                  item.OS === "0" || item.OS === 0 ? "Normal" : item.OS || "--";

                return (
                  <View key={index}>
                    <Text
                      style={{
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT *
                          (printSettings?.page_format?.font_size || 12),
                        fontWeight: 500,
                        marginTop: PX_TO_PT * 10,
                        marginBottom: PX_TO_PT * 8,
                        color: "#000",
                      }}
                    >
                      {item.section}:
                    </Text>
                    {renderListItem("OD", odValue)}
                    {renderListItem("OS", osValue)}
                    {item.remarks &&
                      renderListItem("REMARKS", item.remarks)}
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
              {fundusExamination.map((item, index) => {
                const odValue =
                  item.OD === "0" || item.OD === 0 ? "Normal" : item.OD || "--";
                const osValue =
                  item.OS === "0" || item.OS === 0 ? "Normal" : item.OS || "--";

                return (
                  <View key={index}>
                    <Text
                      style={{
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT *
                          (printSettings?.page_format?.font_size || 12),
                        fontWeight: 500,
                        marginTop: PX_TO_PT * 10,
                        marginBottom: PX_TO_PT * 8,
                        color: "#000",
                      }}
                    >
                      {item.section}:
                    </Text>
                    {renderListItem("OD", odValue)}
                    {renderListItem("OS", osValue)}
                    {item.remarks &&
                      renderListItem("REMARKS", item.remarks)}
                  </View>
                );
              })}
            </View>
          );
        })}
    </View>
  );
}

export default OphthalmologyListView;
