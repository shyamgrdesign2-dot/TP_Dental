import React, { useState, useMemo, useEffect } from "react";
import { Input, Radio, Tooltip, Alert } from "antd";
import {
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import ModuleListItem from "./ModuleListItem";
import "./CreateNewModuleTab.scss";

const MAX_MODULE_NAME_LENGTH = 30;
const MAX_COLUMN_LABEL_LENGTH = 15;

/**
 * CreateNewModuleTab Component
 *
 * Tab content for creating a new custom module.
 * Includes module name input, column configuration, and column labels.
 *
 * @param {Function} onCreateModule - Callback when module is created
 * @param {Function} onFormChange - Callback when form data changes (for button state)
 */
const CreateNewModuleTab = ({ onCreateModule, onFormChange }) => {
  const { customModules } = useSelector((state) => state.customModules);
  const [moduleName, setModuleName] = useState("");
  const [columnCount, setColumnCount] = useState(2);
  const [columnLabels, setColumnLabels] = useState(["", ""]);
  const [similarModules, setSimilarModules] = useState([]);
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});

  // Check for similar module names
  useEffect(() => {
    if (moduleName.trim().length >= 2) {
      const query = moduleName.toLowerCase().trim();
      const similar = (customModules || []).filter((module) =>
        module.name?.toLowerCase().includes(query)
      );
      setSimilarModules(similar);
    } else {
      setSimilarModules([]);
    }
  }, [moduleName, customModules]);

  // Update column labels when column count changes
  useEffect(() => {
    const newLabels = Array(columnCount)
      .fill("")
      .map((_, index) => columnLabels[index] || "");
    setColumnLabels(newLabels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnCount]);

  const handleModuleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_MODULE_NAME_LENGTH) {
      setModuleName(value);
      // Reset column config visibility when module name changes
      if (showColumnConfig) {
        setShowColumnConfig(false);
      }
    }
  };

  const handleColumnLabelChange = (index, value) => {
    if (value.length <= MAX_COLUMN_LABEL_LENGTH) {
      const newLabels = [...columnLabels];
      newLabels[index] = value;
      setColumnLabels(newLabels);
    }
  };

  const handleColumnCountChange = (e) => {
    setColumnCount(parseInt(e.target.value));
  };

  const isFormValid = useMemo(() => {
    return (
      moduleName.trim().length > 0 &&
      columnLabels.every((label) => label.trim().length > 0)
    );
  }, [moduleName, columnLabels]);

  // Notify parent of form state changes
  useEffect(() => {
    if (onFormChange) {
      onFormChange({
        isValid: isFormValid,
        moduleName,
        columnCount,
        columnLabels,
      });
    }
  }, [isFormValid, moduleName, columnCount, columnLabels, onFormChange]);

  const handleUseExistingModule = (module) => {
    // TODO: Implement use existing module functionality
    console.log("Use existing module:", module);
  };

  const handleAddAsNew = () => {
    // Show the column configuration section when user decides to add as new
    setShowColumnConfig(true);
  };

  const handleViewMore = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <div className="create-new-module-tab">
      <div className="create-new-module-tab__content">
        {/* Module Name Section */}
        <div className="create-new-module-tab__section">
          <div className="create-new-module-tab__label">
            <span>
              Module Name <span className="required">*</span>
            </span>
            <Tooltip title="Enter a unique name for your custom module">
              <InfoCircleOutlined className="create-new-module-tab__info-icon" />
            </Tooltip>
          </div>
          <div className="create-new-module-tab__input-wrapper">
            <Input
              placeholder="Eg., Cardiac Assessment or Diet Plan"
              value={moduleName}
              onChange={handleModuleNameChange}
              className="create-new-module-tab__input"
              maxLength={MAX_MODULE_NAME_LENGTH}
            />
            <span className="create-new-module-tab__char-count">
              {moduleName.length}/{MAX_MODULE_NAME_LENGTH}
            </span>
          </div>

          {/* Similar Modules Warning */}
          {similarModules.length > 0 && (
            <div className="create-new-module-tab__warning">
              <Alert
                message={
                  <div className="d-flex flex-column">
                    <span>Modules with a similar name already exists!</span>
                    <span>Consider using an existing module to avoid duplication.</span>
                  </div>
                }
                type="warning"
                icon={<ExclamationCircleOutlined />}
                showIcon
                className="create-new-module-tab__alert"
              />
              <div className="create-new-module-tab__similar-modules">
                {similarModules.map((module) => {
                  const isExpanded = expandedModules[module.module_id];
                  const moduleColumnCount =
                    module.version === "v2" && module.namedFields
                      ? module.namedFields.length
                      : 2;
                  const columnLabels =
                    module.version === "v2" && module.namedFields
                      ? module.namedFields.map((field) => field.fieldLabel)
                      : ["Title", "Notes"];

                  return (
                    <div
                      key={module.module_id}
                      className="create-new-module-tab__similar-item"
                    >
                      <div className="create-new-module-tab__similar-container">
                        <div className="create-new-module-tab__similar-header">
                          <h4 className="create-new-module-tab__similar-name">
                            {module.name}
                          </h4>
                          <div className="create-new-module-tab__similar-details">
                            <div className="create-new-module-tab__similar-tags">
                              <span className="create-new-module-tab__similar-tag">
                                <UserOutlined className="create-new-module-tab__similar-tag-icon" />
                                <span>Dr. {module.creator_name || "Unknown"}</span>
                              </span>
                              <span className="create-new-module-tab__similar-tag">
                                {String(moduleColumnCount).padStart(2, "0")}{" "}
                                columns
                              </span>
                            </div>
                            <a
                              className="create-new-module-tab__similar-view-more"
                              onClick={() => handleViewMore(module.module_id)}
                            >
                              {isExpanded ? "View less" : "View more"}
                            </a>
                          </div>
                        </div>
                        <button
                          className="create-new-module-tab__use-button"
                          onClick={() => handleUseExistingModule(module)}
                        >
                          Use this Module
                        </button>
                      </div>

                      {/* Expanded Preview Table */}
                      {isExpanded && (
                        <div className="create-new-module-tab__preview">
                          <div
                            className="create-new-module-tab__preview-table"
                            style={{
                              "--column-count": moduleColumnCount,
                            }}
                          >
                            {/* Column Headers */}
                            <div className="create-new-module-tab__preview-row create-new-module-tab__preview-row--header">
                              {columnLabels.map((label, index) => (
                                <div
                                  key={index}
                                  className="create-new-module-tab__preview-cell create-new-module-tab__preview-cell--header"
                                >
                                  {label.toUpperCase()}
                                </div>
                              ))}
                            </div>

                            {/* Input Placeholders Row */}
                            <div className="create-new-module-tab__preview-row">
                              {columnLabels.map((label, index) => (
                                <div
                                  key={index}
                                  className="create-new-module-tab__preview-cell create-new-module-tab__preview-cell--input"
                                >
                                  <span className="create-new-module-tab__preview-placeholder">
                                    Eg. Add {label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div 
                  className="create-new-module-tab__add-new"
                  onClick={handleAddAsNew}
                >
                  <span>
                    (or){" "}
                    <span className="create-new-module-tab__add-icon">+</span>{" "}
                    Add "{moduleName}" as new Custom module
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Configure Columns Section - Show when user clicks "Add as new" or no similar modules */}
        {(showColumnConfig || (moduleName.trim().length > 0 && similarModules.length === 0)) && (
        <div className="create-new-module-tab__section">
          <div className="create-new-module-tab__label">
            <span>
              Configure Columns <span className="required">*</span>
            </span>
            <Tooltip title="Select the number of columns for your module">
              <InfoCircleOutlined className="create-new-module-tab__info-icon" />
            </Tooltip>
          </div>
          <Radio.Group
            value={columnCount}
            onChange={handleColumnCountChange}
            className="create-new-module-tab__column-radio-group"
          >
            <Radio.Button value={1}>01 Column</Radio.Button>
            <Radio.Button value={2}>02 Columns</Radio.Button>
            <Radio.Button value={3}>03 Columns</Radio.Button>
            <Radio.Button value={4}>04 Columns</Radio.Button>
          </Radio.Group>

          {/* Set Column Labels */}
          <div className="create-new-module-tab__column-labels-section">
            <h4 className="create-new-module-tab__column-labels-title">
              Set Column Labels
            </h4>
            <div className="create-new-module-tab__column-labels-grid">
              {columnLabels.map((label, index) => (
                <div
                  key={index}
                  className="create-new-module-tab__column-label-item"
                >
                  <div className="create-new-module-tab__column-label-header">
                    <span>
                      Column {index + 1} <span className="required">*</span>
                    </span>
                  </div>
                  <Input
                    placeholder={`Eg., ${index === 0 ? "Diet" : "Notes"}`}
                    value={label}
                    onChange={(e) =>
                      handleColumnLabelChange(index, e.target.value)
                    }
                    className="create-new-module-tab__column-label-input"
                    maxLength={MAX_COLUMN_LABEL_LENGTH}
                    suffix={
                      <span className="create-new-module-tab__char-count-small">
                        {label.length}/{MAX_COLUMN_LABEL_LENGTH}
                      </span>
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Informational Box */}
        <div className="create-new-module-tab__info-box">
          <div className="create-new-module-tab__info-header">
            <ExclamationCircleOutlined className="create-new-module-tab__info-icon-large" />
            <h3 className="create-new-module-tab__info-title">
              Things to Know Before Creating a Custom Module
            </h3>
          </div>
          <ul className="create-new-module-tab__info-list">
            <li>
              You can <strong>edit/delete</strong> this module until it's used
              in a Rx.
            </li>
            <li>
              Once used, it becomes <strong>locked</strong> — You can't{" "}
              <strong>edit/delete</strong> column names or structure.
            </li>
            <li>
              To make changes later, you'll need to{" "}
              <strong>create a new module</strong>.
            </li>
            <li>
              This helps keep all past prescriptions accurate and unchanged.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateNewModuleTab;
