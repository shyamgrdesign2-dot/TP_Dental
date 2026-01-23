import React from "react";
import { Text, View } from "@react-pdf/renderer";

function OphthalmologyInlineView({
  PX_TO_PT,
  styles,
  printSettings,
  ophthalModuleData,
  options,
}) {
  const visualAcuity = ophthalModuleData?.visualAcuity || [];
  const autoRefraction = ophthalModuleData?.autoRefraction || [];
  const lensometerValues = ophthalModuleData?.lensometerValues || [];
  const glassPrescription = ophthalModuleData?.glassPrescription || [];
  const intraOcularPressure = ophthalModuleData?.intraOcularPressure || [];
  const slitLampExamination = ophthalModuleData?.slitLampExamination || [];
  const fundusExamination = ophthalModuleData?.fundusExamination || [];

  // Helper to check if a section should be visible
  const isSectionVisible = (sectionId) => {
    if (!options || !Array.isArray(options)) return true; // Default to visible if no options
    // Check if sectionId exists in options and is visible
    const sectionOption = options.find(opt => {
      if (typeof opt === 'string') return opt === sectionId;
      if (typeof opt === 'object') return opt.id === sectionId;
      return false;
    });
    
    // If not found in options, default to visible
    if (!sectionOption) return true;
    
    // If found as string, it's visible
    if (typeof sectionOption === 'string') return true;
    
    // If found as object, check visible property (default to true if not specified)
    return sectionOption.visible !== false;
  };

  // Helper to get subsection options for autoRefraction
  const getAutoRefractionSubOptions = () => {
    if (!options || !Array.isArray(options)) {
      return { undilated: true, dilated: true };
    }
    const autoRefractionOption = options.find(opt => {
      const id = typeof opt === 'object' ? opt.id : opt;
      return id === 'autoRefraction';
    });
    
    if (!autoRefractionOption || typeof autoRefractionOption !== 'object') {
      return { undilated: true, dilated: true };
    }
    
    const subSections = autoRefractionOption.subSections || [];
    return {
      undilated: subSections.some(sub => {
        const subId = typeof sub === 'object' ? sub.id : sub;
        return subId === 'undilated' && (typeof sub === 'string' || sub.visible !== false);
      }),
      dilated: subSections.some(sub => {
        const subId = typeof sub === 'object' ? sub.id : sub;
        return subId === 'dilated' && (typeof sub === 'string' || sub.visible !== false);
      }),
    };
  };

  const autoRefractionSubOptions = getAutoRefractionSubOptions();

  const getEyeData = (dataArray, eye) => {
    return dataArray.find((item) => item.eye === eye) || {};
  };

  const formatInlineValue = (label, odValue, osValue) => {
    return `${label}: OD: ${odValue || "--"}, OS: ${osValue || "--"}`;
  };

  const formatEyeDataInline = (odData, osData, fields) => {
    const odValues = fields
      .map((field) => {
        const value = odData[field.key];
        if (!value && value !== 0) return null;
        
        if (field.format === "distance") {
          return `${field.label}: 6/${value}`;
        } else if (field.format === "near") {
          return `${field.label}: N${value}`;
        } else if (field.format === "axis") {
          return `${field.label}: ${value}°`;
        } else if (field.format === "pressure") {
          return `${field.label}: ${value} mmhg`;
        } else if (field.format === "cct") {
          return `${field.label}: ${value}µm`;
        } else if (field.format === "ciop") {
          return `${field.label}: ${value} MmHg`;
        } else {
          return `${field.label}: ${value}`;
        }
      })
      .filter(Boolean);
    
    const osValues = fields
      .map((field) => {
        const value = osData[field.key];
        if (!value && value !== 0) return null;
        
        if (field.format === "distance") {
          return `${field.label}: 6/${value}`;
        } else if (field.format === "near") {
          return `${field.label}: N${value}`;
        } else if (field.format === "axis") {
          return `${field.label}: ${value}°`;
        } else if (field.format === "pressure") {
          return `${field.label}: ${value} mmhg`;
        } else if (field.format === "cct") {
          return `${field.label}: ${value}µm`;
        } else if (field.format === "ciop") {
          return `${field.label}: ${value} MmHg`;
        } else {
          return `${field.label}: ${value}`;
        }
      })
      .filter(Boolean);
    
    const odFormatted = odValues.length > 0 ? `OD (${odValues.join(", ")})` : "OD (--)";
    const osFormatted = osValues.length > 0 ? `OS (${osValues.join(", ")})` : "OS (--)";
    
    return `${odFormatted} | ${osFormatted}`;
  };

  return (
    <View style={{ marginTop: PX_TO_PT * 15 }}>
      {/* Visual Acuity Test */}
      {isSectionVisible("visualAcuity") && visualAcuity.length > 0 && (
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
                {formatEyeDataInline(odData, osData, [
                  { key: "ucDistance", label: "UC DISTANCE", format: "distance" },
                  { key: "ucNear", label: "UC NEAR", format: "near" },
                  { key: "pinhole", label: "PINHOLE", format: "distance" },
                  { key: "cDistance", label: "C DISTANCE", format: "distance" },
                  { key: "cNear", label: "C NEAR", format: "near" },
                ])}
              </Text>
            );
          })()}
        </View>
      )}

      {/* Subjective Refraction */}
      {isSectionVisible("autoRefraction") && autoRefraction.length > 0 && (
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
                {autoRefractionSubOptions.undilated && (undilatedOD || undilatedOS) && (
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
                    Undilated: {formatEyeDataInline(undilatedOD || {}, undilatedOS || {}, [
                      { key: "sphere", label: "SPHERE" },
                      { key: "cylinder", label: "CYLINDER" },
                      { key: "axis", label: "AXIS", format: "axis" },
                      { key: "add", label: "C ADD" },
                      { key: "distance", label: "DISTANCE", format: "distance" },
                      { key: "near", label: "NEAR", format: "near" },
                    ])}
                  </Text>
                )}

                {autoRefractionSubOptions.dilated && (dilatedOD || dilatedOS) && (
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
                    Dilated: {formatEyeDataInline(dilatedOD || {}, dilatedOS || {}, [
                      { key: "sphere", label: "SPHERE" },
                      { key: "cylinder", label: "CYLINDER" },
                      { key: "axis", label: "AXIS", format: "axis" },
                      { key: "add", label: "C ADD" },
                      { key: "distance", label: "DISTANCE", format: "distance" },
                      { key: "near", label: "NEAR", format: "near" },
                    ])}
                  </Text>
                )}
              </View>
            );
          })()}
        </View>
      )}

      {/* Lensometer Values */}
      {isSectionVisible("lensometerValues") && lensometerValues.length > 0 && (
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
                {formatEyeDataInline(odData, osData, [
                  { key: "sphere", label: "SPHERE" },
                  { key: "cylinder", label: "CYLINDER" },
                  { key: "axis", label: "AXIS", format: "axis" },
                  { key: "add", label: "C ADD" },
                  { key: "distance", label: "DISTANCE", format: "distance" },
                  { key: "near", label: "NEAR", format: "near" },
                ])}
              </Text>
            );
          })()}
        </View>
      )}

      {/* Glass Prescription */}
      {isSectionVisible("glassPrescription") && glassPrescription.length > 0 && (
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
            const eyeData = formatEyeDataInline(odData, osData, [
              { key: "sphere", label: "SPHERE" },
              { key: "cylinder", label: "CYLINDER" },
              { key: "axis", label: "AXIS", format: "axis" },
              { key: "add", label: "C ADD" },
              { key: "distance", label: "DISTANCE", format: "distance" },
              { key: "near", label: "NEAR", format: "near" },
            ]);
            return (
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
                {eyeData}{pd ? ` | PD (${pd})` : ""}
              </Text>
            );
          })()}
        </View>
      )}

      {/* Intra Ocular Pressure */}
      {isSectionVisible("intraOcularPressure") && intraOcularPressure.length > 0 && (
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
                {formatEyeDataInline(odData, osData, [
                  { key: "nct", label: "NCT", format: "pressure" },
                  { key: "gat", label: "GAT", format: "pressure" },
                  { key: "cc", label: "CCT", format: "cct" },
                  { key: "ciop", label: "CIOP", format: "ciop" },
                ])}
              </Text>
            );
          })()}
        </View>
      )}

      {/* Slit Lamp Examination */}
      {isSectionVisible("slitLampExamination") && slitLampExamination.length > 0 && (
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
            const values = [];
            if (odValue !== "--") values.push(`OD: ${odValue}`);
            if (osValue !== "--") values.push(`OS: ${osValue}`);
            if (item.remarks) values.push(`Remarks: ${item.remarks}`);
            const formattedValue = values.length > 0 ? `(${values.join(", ")})` : "--";
            return (
              <Text
                key={index}
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT *
                    (printSettings?.page_format?.font_size || 12),
                  color: "#000",
                  marginBottom: PX_TO_PT * 3,
                }}
              >
                {item.section}: {formattedValue}
              </Text>
            );
          })}
        </View>
      )}

      {/* Fundus Examination */}
      {isSectionVisible("fundusExamination") && fundusExamination.length > 0 && (
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
            const values = [];
            if (odValue !== "--") values.push(`OD: ${odValue}`);
            if (osValue !== "--") values.push(`OS: ${osValue}`);
            if (item.remarks) values.push(`Remarks: ${item.remarks}`);
            const formattedValue = values.length > 0 ? `(${values.join(", ")})` : "--";
            return (
              <Text
                key={index}
                style={{
                  fontFamily: printSettings?.page_format?.font_family,
                  fontSize:
                    PX_TO_PT *
                    (printSettings?.page_format?.font_size || 12),
                  color: "#000",
                  marginBottom: PX_TO_PT * 3,
                }}
              >
                {item.section}: {formattedValue}
              </Text>
            );
          })}
        </View>
      )}
    </View>
  );
}

export default OphthalmologyInlineView;
