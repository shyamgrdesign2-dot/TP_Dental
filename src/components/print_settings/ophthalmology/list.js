import React from "react";
import { Text, View } from "@react-pdf/renderer";

function OphthalmologyListView({
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

  const renderEyeDataInline = (eyeLabel, data, fields) => {
    const values = fields
      .map((field) => {
        const value = data[field.key];
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
    
    const formattedValue = values.length > 0 ? `(${values.join(", ")})` : "--";
    
    return (
      <View style={{ marginBottom: PX_TO_PT * 8 }}>
        <Text
          style={{
            fontFamily: printSettings?.page_format?.font_family,
            fontSize: PX_TO_PT * (printSettings?.page_format?.font_size || 12),
            color: "#000",
          }}
        >
          <Text style={{ fontWeight: 500 }}>{eyeLabel}: </Text>
          {formattedValue}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ marginTop: PX_TO_PT * 15 }}>
      {/* Visual Acuity Test */}
      {isSectionVisible("visualAcuity") && visualAcuity.length > 0 &&
        renderSection("Visual Acuity Test", () => {
          const odData = getEyeData(visualAcuity, "OD");
          const osData = getEyeData(visualAcuity, "OS");
          return (
            <View>
              {renderEyeDataInline("OD (Right Eye)", odData, [
                { key: "ucDistance", label: "UC DISTANCE", format: "distance" },
                { key: "ucNear", label: "UC NEAR", format: "near" },
                { key: "pinhole", label: "PINHOLE", format: "distance" },
                { key: "cDistance", label: "C DISTANCE", format: "distance" },
                { key: "cNear", label: "C NEAR", format: "near" },
              ])}
              {renderEyeDataInline("OS (Left Eye)", osData, [
                { key: "ucDistance", label: "UC DISTANCE", format: "distance" },
                { key: "ucNear", label: "UC NEAR", format: "near" },
                { key: "pinhole", label: "PINHOLE", format: "distance" },
                { key: "cDistance", label: "C DISTANCE", format: "distance" },
                { key: "cNear", label: "C NEAR", format: "near" },
              ])}
            </View>
          );
        })}

      {/* Subjective Refraction */}
      {isSectionVisible("autoRefraction") && autoRefraction.length > 0 &&
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
              {autoRefractionSubOptions.undilated && (undilatedOD || undilatedOS) && (
                <>
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
                    Undilated:
                  </Text>
                  {renderEyeDataInline("OD", undilatedOD, [
                    { key: "sphere", label: "SPHERE" },
                    { key: "cylinder", label: "CYLINDER" },
                    { key: "axis", label: "AXIS", format: "axis" },
                    { key: "add", label: "C ADD" },
                    { key: "distance", label: "DISTANCE", format: "distance" },
                    { key: "near", label: "NEAR", format: "near" },
                  ])}
                  {renderEyeDataInline("OS", undilatedOS, [
                    { key: "sphere", label: "SPHERE" },
                    { key: "cylinder", label: "CYLINDER" },
                    { key: "axis", label: "AXIS", format: "axis" },
                    { key: "add", label: "C ADD" },
                    { key: "distance", label: "DISTANCE", format: "distance" },
                    { key: "near", label: "NEAR", format: "near" },
                  ])}
                </>
              )}

              {autoRefractionSubOptions.dilated && (dilatedOD || dilatedOS) && (
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
                    Dilated:
                  </Text>
                  {renderEyeDataInline("OD", dilatedOD, [
                    { key: "sphere", label: "SPHERE" },
                    { key: "cylinder", label: "CYLINDER" },
                    { key: "axis", label: "AXIS", format: "axis" },
                    { key: "add", label: "C ADD" },
                    { key: "distance", label: "DISTANCE", format: "distance" },
                    { key: "near", label: "NEAR", format: "near" },
                  ])}
                  {renderEyeDataInline("OS", dilatedOS, [
                    { key: "sphere", label: "SPHERE" },
                    { key: "cylinder", label: "CYLINDER" },
                    { key: "axis", label: "AXIS", format: "axis" },
                    { key: "add", label: "C ADD" },
                    { key: "distance", label: "DISTANCE", format: "distance" },
                    { key: "near", label: "NEAR", format: "near" },
                  ])}
                </>
              )}
            </View>
          );
        })}

      {/* Lensometer Values */}
      {isSectionVisible("lensometerValues") && lensometerValues.length > 0 &&
        renderSection("Lensometer Values", () => {
          const odData = getEyeData(lensometerValues, "OD");
          const osData = getEyeData(lensometerValues, "OS");
          return (
            <View>
              {renderEyeDataInline("OD (Right Eye)", odData, [
                { key: "sphere", label: "SPHERE" },
                { key: "cylinder", label: "CYLINDER" },
                { key: "axis", label: "AXIS", format: "axis" },
                { key: "add", label: "C ADD" },
                { key: "distance", label: "DISTANCE", format: "distance" },
                { key: "near", label: "NEAR", format: "near" },
              ])}
              {renderEyeDataInline("OS (Left Eye)", osData, [
                { key: "sphere", label: "SPHERE" },
                { key: "cylinder", label: "CYLINDER" },
                { key: "axis", label: "AXIS", format: "axis" },
                { key: "add", label: "C ADD" },
                { key: "distance", label: "DISTANCE", format: "distance" },
                { key: "near", label: "NEAR", format: "near" },
              ])}
            </View>
          );
        })}

      {/* Glass Prescription */}
      {isSectionVisible("glassPrescription") && glassPrescription.length > 0 &&
        renderSection("Glass Prescription", () => {
          const odData = getEyeData(glassPrescription, "OD");
          const osData = getEyeData(glassPrescription, "OS");
          const pd = ophthalModuleData?.pd;
          return (
            <View>
              {renderEyeDataInline("OD (Right Eye)", odData, [
                { key: "sphere", label: "SPHERE" },
                { key: "cylinder", label: "CYLINDER" },
                { key: "axis", label: "AXIS", format: "axis" },
                { key: "add", label: "C ADD" },
                { key: "distance", label: "DISTANCE", format: "distance" },
                { key: "near", label: "NEAR", format: "near" },
              ])}
              {renderEyeDataInline("OS (Left Eye)", osData, [
                { key: "sphere", label: "SPHERE" },
                { key: "cylinder", label: "CYLINDER" },
                { key: "axis", label: "AXIS", format: "axis" },
                { key: "add", label: "C ADD" },
                { key: "distance", label: "DISTANCE", format: "distance" },
                { key: "near", label: "NEAR", format: "near" },
              ])}
              {pd && (
                <View style={{ marginTop: PX_TO_PT * 8 }}>
                  <Text
                    style={{
                      fontFamily: printSettings?.page_format?.font_family,
                      fontSize: PX_TO_PT * (printSettings?.page_format?.font_size || 12),
                      color: "#000",
                    }}
                  >
                    <Text style={{ fontWeight: 500 }}>PD: </Text>
                    ({pd})
                  </Text>
                </View>
              )}
            </View>
          );
        })}

      {/* Intra Ocular Pressure */}
      {isSectionVisible("intraOcularPressure") && intraOcularPressure.length > 0 &&
        renderSection("Intra Ocular Pressure", () => {
          const odData = getEyeData(intraOcularPressure, "OD");
          const osData = getEyeData(intraOcularPressure, "OS");
          return (
            <View>
              {renderEyeDataInline("OD (Right Eye)", odData, [
                { key: "nct", label: "NCT", format: "pressure" },
                { key: "gat", label: "GAT", format: "pressure" },
                { key: "cc", label: "CCT", format: "cct" },
                { key: "ciop", label: "CIOP", format: "ciop" },
              ])}
              {renderEyeDataInline("OS (Left Eye)", osData, [
                { key: "nct", label: "NCT", format: "pressure" },
                { key: "gat", label: "GAT", format: "pressure" },
                { key: "cc", label: "CCT", format: "cct" },
                { key: "ciop", label: "CIOP", format: "ciop" },
              ])}
            </View>
          );
        })}

      {/* Slit Lamp Examination */}
      {isSectionVisible("slitLampExamination") && slitLampExamination.length > 0 &&
        renderSection("Slit Lamp Examination", () => {
          return (
            <View>
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
                  <View key={index} style={{ marginBottom: PX_TO_PT * 8 }}>
                    <Text
                      style={{
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT *
                          (printSettings?.page_format?.font_size || 12),
                        color: "#000",
                      }}
                    >
                      <Text style={{ fontWeight: 500 }}>{item.section}: </Text>
                      {formattedValue}
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        })}

      {/* Fundus Examination */}
      {isSectionVisible("fundusExamination") && fundusExamination.length > 0 &&
        renderSection("Fundus Examination", () => {
          return (
            <View>
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
                  <View key={index} style={{ marginBottom: PX_TO_PT * 8 }}>
                    <Text
                      style={{
                        fontFamily: printSettings?.page_format?.font_family,
                        fontSize:
                          PX_TO_PT *
                          (printSettings?.page_format?.font_size || 12),
                        color: "#000",
                      }}
                    >
                      <Text style={{ fontWeight: 500 }}>{item.section}: </Text>
                      {formattedValue}
                    </Text>
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
