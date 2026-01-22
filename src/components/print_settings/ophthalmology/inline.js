import React from "react";
import { Text, View } from "@react-pdf/renderer";

function OphthalmologyInlineView({
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

  const formatInlineValue = (label, odValue, osValue) => {
    return `${label}: OD: ${odValue || "--"}, OS: ${osValue || "--"}`;
  };

  return (
    <View style={{ marginTop: PX_TO_PT * 15 }}>
      {/* Visual Acuity Test */}
      {visualAcuity.length > 0 && (
        <View style={{ marginBottom: PX_TO_PT * 10 }}>
          <Text
            style={{
              color: "#171725",
              fontFamily: printSettings?.page_format?.font_family,
              fontSize:
                PX_TO_PT * (printSettings?.page_format?.font_size || 12),
              fontWeight: 700,
              marginBottom: PX_TO_PT * 8,
            }}
          >
            Visual Acuity Test:
          </Text>
          {(() => {
            const odData = getEyeData(visualAcuity, "OD");
            const osData = getEyeData(visualAcuity, "OS");
            return (
              <View>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "UC DISTANCE",
                    odData.ucDistance ? `6/${odData.ucDistance}` : "--",
                    osData.ucDistance ? `6/${osData.ucDistance}` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "UC NEAR",
                    odData.ucNear ? `N${odData.ucNear}` : "--",
                    osData.ucNear ? `N${osData.ucNear}` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "PINHOLE",
                    odData.pinhole ? `6/${odData.pinhole}` : "--",
                    osData.pinhole ? `6/${osData.pinhole}` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "C DISTANCE",
                    odData.cDistance ? `6/${odData.cDistance}` : "--",
                    osData.cDistance ? `6/${osData.cDistance}` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "C NEAR",
                    odData.cNear ? `6/${odData.cNear}` : "--",
                    osData.cNear ? `6/${osData.cNear}` : "--"
                  )}
                </Text>
              </View>
            );
          })()}
        </View>
      )}

      {/* Subjective Refraction */}
      {autoRefraction.length > 0 && (
        <View style={{ marginBottom: PX_TO_PT * 10 }}>
          <Text
            style={{
              color: "#171725",
              fontFamily: printSettings?.page_format?.font_family,
              fontSize:
                PX_TO_PT * (printSettings?.page_format?.font_size || 12),
              fontWeight: 700,
              marginBottom: PX_TO_PT * 8,
            }}
          >
            Subjective Refraction:
          </Text>
          {(() => {
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
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    fontWeight: 500,
                    marginBottom: PX_TO_PT * 5,
                    color: "#000",
                  }}
                >
                  Undialted:
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "SPHERE",
                    undilatedOD?.sphere || "--",
                    undilatedOS?.sphere || "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "CYLINDER",
                    undilatedOD?.cylinder || "--",
                    undilatedOS?.cylinder || "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "AXIS",
                    undilatedOD?.axis ? `${undilatedOD.axis}°` : "--",
                    undilatedOS?.axis ? `${undilatedOS.axis}°` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "ADD",
                    undilatedOD?.add || "--",
                    undilatedOS?.add || "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "DISTANCE",
                    undilatedOD?.distance ? `6/${undilatedOD.distance}` : "--",
                    undilatedOS?.distance
                      ? `6/${undilatedOS.distance}`
                      : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "NEAR",
                    undilatedOD?.near ? `N${undilatedOD.near}` : "--",
                    undilatedOS?.near ? `N${undilatedOS.near}` : "--"
                  )}
                </Text>

                {(dilatedOD || dilatedOS) && (
                  <>
                    <Text
                      style={{
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT *
                          (printSettings?.page_format?.font_size || 12),
                        fontWeight: 500,
                        marginTop: PX_TO_PT * 10,
                        marginBottom: PX_TO_PT * 5,
                        color: "#000",
                      }}
                    >
                      Dialted:
                    </Text>
                    <Text
                      style={{
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT *
                          (printSettings?.page_format?.font_size || 12),
                        color: "#000",
                        marginBottom: PX_TO_PT * 3,
                      }}
                    >
                      {formatInlineValue(
                        "SPHERE",
                        dilatedOD?.sphere || "--",
                        dilatedOS?.sphere || "--"
                      )}
                    </Text>
                    <Text
                      style={{
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT *
                          (printSettings?.page_format?.font_size || 12),
                        color: "#000",
                        marginBottom: PX_TO_PT * 3,
                      }}
                    >
                      {formatInlineValue(
                        "CYLINDER",
                        dilatedOD?.cylinder || "--",
                        dilatedOS?.cylinder || "--"
                      )}
                    </Text>
                    <Text
                      style={{
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT *
                          (printSettings?.page_format?.font_size || 12),
                        color: "#000",
                        marginBottom: PX_TO_PT * 3,
                      }}
                    >
                      {formatInlineValue(
                        "AXIS",
                        dilatedOD?.axis ? `${dilatedOD.axis}°` : "--",
                        dilatedOS?.axis ? `${dilatedOS.axis}°` : "--"
                      )}
                    </Text>
                    <Text
                      style={{
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT *
                          (printSettings?.page_format?.font_size || 12),
                        color: "#000",
                        marginBottom: PX_TO_PT * 3,
                      }}
                    >
                      {formatInlineValue(
                        "ADD",
                        dilatedOD?.add || "--",
                        dilatedOS?.add || "--"
                      )}
                    </Text>
                    <Text
                      style={{
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT *
                          (printSettings?.page_format?.font_size || 12),
                        color: "#000",
                        marginBottom: PX_TO_PT * 3,
                      }}
                    >
                      {formatInlineValue(
                        "DISTANCE",
                        dilatedOD?.distance
                          ? `6/${dilatedOD.distance}`
                          : "--",
                        dilatedOS?.distance
                          ? `6/${dilatedOS.distance}`
                          : "--"
                      )}
                    </Text>
                    <Text
                      style={{
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT *
                          (printSettings?.page_format?.font_size || 12),
                        color: "#000",
                        marginBottom: PX_TO_PT * 3,
                      }}
                    >
                      {formatInlineValue(
                        "NEAR",
                        dilatedOD?.near ? `N${dilatedOD.near}` : "--",
                        dilatedOS?.near ? `N${dilatedOS.near}` : "--"
                      )}
                    </Text>
                  </>
                )}
              </View>
            );
          })()}
        </View>
      )}

      {/* Lensometer Values */}
      {lensometerValues.length > 0 && (
        <View style={{ marginBottom: PX_TO_PT * 10 }}>
          <Text
            style={{
              color: "#171725",
              fontFamily: printSettings?.page_format?.font_family,
              fontSize:
                PX_TO_PT * (printSettings?.page_format?.font_size || 12),
              fontWeight: 700,
              marginBottom: PX_TO_PT * 8,
            }}
          >
            Lensometer Values:
          </Text>
          {(() => {
            const odData = getEyeData(lensometerValues, "OD");
            const osData = getEyeData(lensometerValues, "OS");
            return (
              <View>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "SPHERE",
                    odData.sphere || "--",
                    osData.sphere || "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "CYLINDER",
                    odData.cylinder || "--",
                    osData.cylinder || "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "AXIS",
                    odData.axis ? `${odData.axis}°` : "--",
                    osData.axis ? `${osData.axis}°` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "ADD",
                    odData.add || "--",
                    osData.add || "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "DISTANCE",
                    odData.distance ? `6/${odData.distance}` : "--",
                    osData.distance ? `6/${osData.distance}` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "NEAR",
                    odData.near ? `N${odData.near}` : "--",
                    osData.near ? `N${osData.near}` : "--"
                  )}
                </Text>
              </View>
            );
          })()}
        </View>
      )}

      {/* Glass Prescription */}
      {glassPrescription.length > 0 && (
        <View style={{ marginBottom: PX_TO_PT * 10 }}>
          <Text
            style={{
              color: "#171725",
              fontFamily: printSettings?.page_format?.font_family,
              fontSize:
                PX_TO_PT * (printSettings?.page_format?.font_size || 12),
              fontWeight: 700,
              marginBottom: PX_TO_PT * 8,
            }}
          >
            Glass Prescription:
          </Text>
          {(() => {
            const odData = getEyeData(glassPrescription, "OD");
            const osData = getEyeData(glassPrescription, "OS");
            const pd = ophthalModuleData?.pd;
            return (
              <View>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "SPHERE",
                    odData.sphere || "--",
                    osData.sphere || "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "CYLINDER",
                    odData.cylinder || "--",
                    osData.cylinder || "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "AXIS",
                    odData.axis ? `${odData.axis}°` : "--",
                    osData.axis ? `${osData.axis}°` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "ADD",
                    odData.add || "--",
                    osData.add || "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "DISTANCE",
                    odData.distance ? `6/${odData.distance}` : "--",
                    osData.distance ? `6/${osData.distance}` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "NEAR",
                    odData.near ? `N${odData.near}` : "--",
                    osData.near ? `N${osData.near}` : "--"
                  )}
                </Text>
                {pd && (
                  <Text
                    style={{
                      fontFamily: printSettings?.page_format?.font_family,
                      fontSize:
                        PX_TO_PT *
                        (printSettings?.page_format?.font_size || 12),
                      color: "#000",
                      marginBottom: PX_TO_PT * 3,
                    }}
                  >
                    PD: {pd}
                  </Text>
                )}
              </View>
            );
          })()}
        </View>
      )}

      {/* Intra Ocular Pressure */}
      {intraOcularPressure.length > 0 && (
        <View style={{ marginBottom: PX_TO_PT * 10 }}>
          <Text
            style={{
              color: "#171725",
              fontFamily: printSettings?.page_format?.font_family,
              fontSize:
                PX_TO_PT * (printSettings?.page_format?.font_size || 12),
              fontWeight: 700,
              marginBottom: PX_TO_PT * 8,
            }}
          >
            Intra Ocular Pressure:
          </Text>
          {(() => {
            const odData = getEyeData(intraOcularPressure, "OD");
            const osData = getEyeData(intraOcularPressure, "OS");
            return (
              <View>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "NCT",
                    odData.nct ? `${odData.nct} mmhg` : "--",
                    osData.nct ? `${osData.nct} mmhg` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "GAT",
                    odData.gat ? `${odData.gat} mmhg` : "--",
                    osData.gat ? `${osData.gat} mmhg` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "CCT",
                    odData.cc ? `${odData.cc} µm` : "--",
                    osData.cc ? `${osData.cc} µm` : "--"
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: printSettings?.page_format?.font_family,
                    fontSize:
                      PX_TO_PT *
                      (printSettings?.page_format?.font_size || 12),
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {formatInlineValue(
                    "CIOP",
                    odData.ciop ? `${odData.ciop} mmHg` : "--",
                    osData.ciop ? `${osData.ciop} mmHg` : "--"
                  )}
                </Text>
              </View>
            );
          })()}
        </View>
      )}

      {/* Slit Lamp Examination */}
      {slitLampExamination.length > 0 && (
        <View style={{ marginBottom: PX_TO_PT * 10 }}>
          <Text
            style={{
              color: "#171725",
              fontFamily: printSettings?.page_format?.font_family,
              fontSize:
                PX_TO_PT * (printSettings?.page_format?.font_size || 12),
              fontWeight: 700,
              marginBottom: PX_TO_PT * 8,
            }}
          >
            Slit Lamp Examination:
          </Text>
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
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {item.section}: OD: {odValue}, OS: {osValue}
                  {item.remarks && `, REMARKS: ${item.remarks}`}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      {/* Fundus Examination */}
      {fundusExamination.length > 0 && (
        <View style={{ marginBottom: PX_TO_PT * 10 }}>
          <Text
            style={{
              color: "#171725",
              fontFamily: printSettings?.page_format?.font_family,
              fontSize:
                PX_TO_PT * (printSettings?.page_format?.font_size || 12),
              fontWeight: 700,
              marginBottom: PX_TO_PT * 8,
            }}
          >
            Fundus Examination:
          </Text>
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
                    color: "#000",
                    marginBottom: PX_TO_PT * 3,
                  }}
                >
                  {item.section}: OD: {odValue}, OS: {osValue}
                  {item.remarks && `, REMARKS: ${item.remarks}`}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

export default OphthalmologyInlineView;
