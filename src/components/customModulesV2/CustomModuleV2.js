import React, { useState, useEffect, useCallback, useContext, useMemo } from "react";
import { Input, Button, Dropdown, Menu, Tooltip, message, Popover, Tabs, Select } from "antd";
import {
  InfoCircleOutlined,
  MoreOutlined,
  DeleteOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import CashManagerContext from "../../context/CashManagerContext";
import ModuleIcon from "../../assets/images/custom-module.svg";
import editIcon from "../../assets/images/edit-icon-blue.svg";
import deleteIcon from "../../assets/images/delete-icon-blue.svg";
import { addModule } from "../../redux/customModuleSlice";
import { customizedPad } from "../../redux/doctorsSlice";
import { removeBeforeWhiteSpace, errorMessage } from "../../utils/utils";
import "./CustomModuleV2.scss";

/**
 * CustomModuleV2 Component
 *
 * Reusable component for displaying and editing V2 custom modules
 * with dynamic fields based on module configuration.
 *
 * @param {Object} module - The module configuration
 * @param {String} module.module_id - Unique module identifier
 * @param {String} module.name - Module name
 * @param {Array} module.namedFields - Array of field configurations
 */
const CustomModuleV2 = ({ module }) => {
  const dispatch = useDispatch();
  const { userId, customizedPadLeftList, customizedPadRightList } = useSelector((state) => state.doctors);
  const { customModules, loading } = useSelector((state) => state.customModules);
  const { customModuleContents, setCustomModuleContents, patient_data, tcmId } =
    useContext(CashManagerContext);

  const [moduleData, setModuleData] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [popOver2, setPopOver2] = useState(false);
  const [inputTemplateName, setInputTemplateName] = useState(null);
  const [tabChange, setTabChange] = useState(1); // 1 = Add Template, 2 = Update Template
  const [allTemplates, setAllTemplates] = useState([]);
  
  const TAB_ADD_TEMPLATE = 1;
  const TAB_UPDATE_TEMPLATE = 2;
  const ADD_EDIT_TEMPLATE_TABS = [
    { key: TAB_ADD_TEMPLATE, label: "New Template" },
    { key: TAB_UPDATE_TEMPLATE, label: "Update Template" },
  ];

  // Check if module is disabled (used or cloned by the user)
  const isModuleDisabled = (module.hasBeenUsed || module.hasBeenCloned || module.userId != userId);
  // Tooltip content for disabled items
  const disabledTooltipContent = (
    <div>
      <strong>Note:</strong> This module is used in an Rx and can't be <strong>edited/deleted</strong>. Create a new one if you need a different version
    </div>
  );
  const templates = module?.templates;

  // Initialize module data and templates from context
  useEffect(() => {
    const existingContent = customModuleContents.find(
      (content) => content.module_id === module.module_id
    );

    if (existingContent && existingContent.content?.length > 0) {
      setModuleData(existingContent.content);
    } else {
      // Initialize with one empty row
      const emptyRow = createEmptyRow();
      setModuleData([emptyRow]);
      updateCustomModuleContents([emptyRow]);
    }
    
    setAllTemplates(templates || []);
  }, [module, customModuleContents]);

  // Create an empty row based on module's named fields
  const createEmptyRow = () => {
    const row = { id: uuidv4() };
    module.namedFields?.forEach((field) => {
      row[field.fieldName] = "";
    });
    return row;
  };

  // Update the custom module contents in context
  const updateCustomModuleContents = useCallback(
    (updatedContent) => {
      setCustomModuleContents((prevContents) => {
        const moduleExists = prevContents.some(
          (content) => content.module_id === module.module_id
        );

        if (moduleExists) {
          return prevContents.map((content) =>
            content.module_id === module.module_id
              ? {
                  ...content,
                  module_name: module.name,
                  module_version: "v2",
                  content: updatedContent,
                }
              : content
          );
        } else {
          return [
            ...prevContents,
            {
              module_id: module.module_id,
              module_name: module.name,
              module_version: "v2",
              content: updatedContent,
            },
          ];
        }
      });
    },
    [module, setCustomModuleContents]
  );

  // Handle field value change
  const handleFieldChange = (rowId, fieldName, value) => {
    const updatedData = moduleData.map((row) =>
      row.id === rowId ? { ...row, [fieldName]: value } : row
    );
    setModuleData(updatedData);
    updateCustomModuleContents(updatedData);
    setHasChanges(true);
  };

  // Handle adding a new row
  const handleAddRow = () => {
    const newRow = createEmptyRow();
    const updatedData = [...moduleData, newRow];
    setModuleData(updatedData);
    updateCustomModuleContents(updatedData);
    setHasChanges(true);
  };

  // Handle deleting a row
  const handleDeleteRow = (rowId) => {
    if (moduleData.length === 1) {
      message.warning("At least one row is required");
      return;
    }

    const updatedData = moduleData.filter((row) => row.id !== rowId);
    setModuleData(updatedData);
    updateCustomModuleContents(updatedData);
    setHasChanges(false);
    message.success("Row deleted successfully");
  };

  // Handle save (just shows a message, data is already saved in context)
  const handleSave = () => {
    // Filter out empty rows
    const nonEmptyData = moduleData.filter((row) => {
      return module.namedFields?.some(
        (field) => row[field.fieldName]?.trim().length > 0
      );
    });

    if (nonEmptyData.length === 0) {
      message.warning("Please add at least one entry before saving");
      return;
    }

    // Data is already in context from handleFieldChange, just confirm
    setHasChanges(false);
    message.success("Module data saved successfully");
  };

  // Handle clear
  const handleClear = () => {
    const emptyRow = createEmptyRow();
    setModuleData([emptyRow]);
    updateCustomModuleContents([emptyRow]);
    setHasChanges(false);
    message.success("Module data cleared");
  };

  // Handle templates (placeholder)
  const handleTemplates = () => {
    message.info("Templates feature coming soon");
  };

  // Save template functions
  const showHideSaveTemplatePopOver = useCallback(() => {
    setInputTemplateName(null);
    setPopOver2(!popOver2);
  }, [popOver2]);

  const onTabChange = useCallback(
    (key) => {
      setInputTemplateName(null);
      setTabChange(key);
    },
    [tabChange]
  );

  const onChangeSaveTemplate = useCallback(
    (e) => {
      const updateQuery = removeBeforeWhiteSpace(e.target.value);
      setInputTemplateName(updateQuery);
    },
    [inputTemplateName]
  );

  const onAddTemplateClicked = async () => {
    // Filter out empty rows
    const nonEmptyData = moduleData.filter((row) => {
      return module.namedFields?.some(
        (field) => row[field.fieldName]?.trim().length > 0
      );
    });

    if (!nonEmptyData || nonEmptyData.length === 0) {
      errorMessage(
        `At least 1 ${module.name} should be added`
      );
    } else {
      const modules = customModules.map((cm) => {
        if (cm.module_id === module.module_id) {
          return {
            ...cm,
            templates: [
              {
                template_name: inputTemplateName,
                content: nonEmptyData,
              },
              ...(cm.templates || []),
            ],
          };
        }
        return cm;
      });
      const action = await dispatch(addModule({ userId, modules }));
      if (action.meta.requestStatus === "fulfilled") {
        setInputTemplateName(null);
        showHideSaveTemplatePopOver();
        message.success("Template saved successfully");
      }
    }
  };

  const onSearchTemplate = useCallback(() => {
    setInputTemplateName(null);
  }, [inputTemplateName]);

  const onSelectTemplate = useCallback(
    (data, e) => {
      setInputTemplateName(e.key);
    },
    [inputTemplateName]
  );

  const onUpdateTemplateClicked = async () => {
    // Filter out empty rows
    const nonEmptyData = moduleData.filter((row) => {
      return module.namedFields?.some(
        (field) => row[field.fieldName]?.trim().length > 0
      );
    });

    if (nonEmptyData.length === 0) {
      errorMessage(`At least 1 ${module?.name} added`);
    } else {
      let data = JSON.parse(inputTemplateName);
      const modules = customModules.map((cm) => {
        if (cm.module_id === module.module_id) {
          return {
            ...cm,
            templates: (cm.templates || []).map((t) => {
              if (t.template_id === data.template_id) {
                return {
                  ...t,
                  template_name: data.template_name,
                  content: nonEmptyData,
                };
              }
              return t;
            }),
          };
        }
        return cm;
      });
      const action = await dispatch(addModule({ userId, modules }));
      if (action.meta.requestStatus === "fulfilled") {
        setInputTemplateName(null);
        showHideSaveTemplatePopOver();
        message.success("Template updated successfully");
      }
    }
  };

  // Handle delete module
  const handleDeleteModule = async () => {
    try {
      // Filter out the current module from customModules
      const modules = customModules.filter((cm) => cm.module_id !== module.module_id);
      
      // Call addModule API with remaining modules (upsert)
      const action = await dispatch(addModule({ userId, modules }));
      
      if (action.meta.requestStatus === "fulfilled") {
        message.success(`Module "${module.name}" deleted successfully`);
        
        // Also remove from customModuleContents if present
        const updatedContents = customModuleContents.filter(
          (mc) => mc.module_id !== module.module_id
        );
        setCustomModuleContents(updatedContents);
      } else {
        message.error("Failed to delete module");
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      message.error("Failed to delete module. Please try again.");
    }
  };

  // Handle remove module from Rx pad
  const handleRemoveFromRxPad = async () => {
    try {
      // Filter out the current module from customizedPadRightList
      const updatedRightList = customizedPadRightList.filter(
        (item) => item.tmdpm_id !== module.module_id
      );
      
      // Prepare payload to update pad configuration
      const sendData = {
        data: {
          default: false,
          reset: false,
          left: customizedPadLeftList,  // Keep left side as-is
          right: updatedRightList,       // Remove module from right side
        }
      };
      
      // Call customizedPad API to update configuration
      const action = await dispatch(customizedPad(sendData));
      
      if (action.meta.requestStatus === "fulfilled") {
        message.success(`"${module.name}" removed from Rx pad successfully`);
        
        // Also remove from customModuleContents if present
        const updatedContents = customModuleContents.filter(
          (mc) => mc.module_id !== module.module_id
        );
        setCustomModuleContents(updatedContents);
      } else {
        message.error("Failed to remove module from Rx pad");
      }
    } catch (error) {
      console.error("Error removing module from Rx pad:", error);
      message.error("Failed to remove module from Rx pad. Please try again.");
    }
  };

  // More options menu
  const moreMenu = (
    <Menu>
      <Menu.Item
        key="remove"
        onClick={handleRemoveFromRxPad}
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "14px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#4a4a4a",
          padding: "8px 12px",
        }}
      >
        <img
          src={editIcon}
          width={16}
          height={16}
          alt="remove"
          style={{ margin: "0 8px 3px 0" }}
        />
          Remove From Rx Pad
      </Menu.Item>
      <Menu.Item
        key="edit"
        onClick={() => message.info("Edit module")}
        disabled={isModuleDisabled}
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "14px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: isModuleDisabled ? "#a2a2a8" : "#4a4a4a",
          padding: "8px 12px",
          cursor: isModuleDisabled ? "not-allowed" : "pointer",
          opacity: isModuleDisabled ? 0.6 : 1,
        }}
      >
        {isModuleDisabled ? (
          <Tooltip 
            title={disabledTooltipContent}
            placement="left"
            overlayStyle={{ maxWidth: 350 }}
            overlayClassName="module-disabled-tooltip"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src={editIcon}
                width={16}
                height={16}
                alt="edit"
                style={{ margin: "0 8px 3px 0" }}
              />
              Edit Module Name
            </span>
          </Tooltip>
        ) : (
          <>
            <img
              src={editIcon}
              width={16}
              height={16}
              alt="edit"
              style={{ margin: "0 8px 3px 0" }}
            />
            Edit Module Name
          </>
        )}
      </Menu.Item>
      <Menu.Item
        key="delete"
        onClick={isModuleDisabled ? undefined : handleDeleteModule}
        disabled={isModuleDisabled}
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "14px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: isModuleDisabled ? "#a2a2a8" : "#ff4d4f",
          padding: "8px 12px",
          cursor: isModuleDisabled ? "not-allowed" : "pointer",
          opacity: isModuleDisabled ? 0.6 : 1,
        }}
      >
        {isModuleDisabled ? (
          <Tooltip 
            title={disabledTooltipContent}
            placement="left"
            overlayStyle={{ maxWidth: 350 }}
            overlayClassName="module-disabled-tooltip"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src={deleteIcon}
                width={16}
                height={16}
                alt="delete"
                style={{ margin: "0 8px 3px 0" }}
              />
              Delete Module
            </span>
          </Tooltip>
        ) : (
          <>
            <img
              src={deleteIcon}
              width={16}
              height={16}
              alt="delete"
              style={{ margin: "0 8px 3px 0" }}
            />
            Delete Module
          </>
        )}
      </Menu.Item>
    </Menu>
  );

  // Save Content Component
  const SAVE_CONTENT = useCallback(() => {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center border-bottom templatepopover">
          <Tabs
            defaultActiveKey={TAB_ADD_TEMPLATE}
            items={ADD_EDIT_TEMPLATE_TABS}
            onChange={onTabChange}
            className="w-100"
          />
          <Button
            className="btn btn-delete-prescription"
            onClick={showHideSaveTemplatePopOver}
          >
            <i className="icon-Cross"></i>
          </Button>
        </div>
        {tabChange === TAB_ADD_TEMPLATE ? (
          <div className="pop-header d-flex">
            <Input
              allowClear
              value={inputTemplateName && inputTemplateName}
              className="popinput inputheight41"
              placeholder="Template Name"
              onChange={onChangeSaveTemplate}
            />
            <Button
              className="btn btn-primary3 btn-41 ms-3"
              loading={loading}
              disabled={inputTemplateName ? false : true}
              onClick={onAddTemplateClicked}
            >
              {" Save "}
            </Button>
          </div>
        ) : (
          <div className="pop-header d-flex">
            <Select
              showSearch
              value={
                inputTemplateName && JSON.parse(inputTemplateName).template_name
              }
              className="autocomplete-custom w-100 popinput inputheight41"
              placeholder="Select Template"
              onSearch={onSearchTemplate}
              onSelect={onSelectTemplate}
              optionLabelProp="label"
              options={(allTemplates || []).map((template) => {
                return {
                  key: JSON.stringify(template),
                  value: template.template_name,
                  label: (
                    <div key={template.template_id}>
                      {template.template_name}
                    </div>
                  ),
                };
              })}
              optionRender={(option) => (
                <div className="align-items-center d-flex text-truncate w-100">
                  <div className="round-box">
                    <i className="icon-template"></i>
                  </div>
                  <div className="text-truncate w-100">
                    <div className="title text-main2">{option.data.value}</div>
                    <div className="text-truncate">
                      {JSON.parse(option.data.key).content.map((item, ii) => {
                        const fieldValues = module.namedFields?.map(field => item[field.fieldName]).filter(Boolean).join(", ");
                        return (
                          <span key={ii}>{`${fieldValues}${
                            JSON.parse(option.data.key).content.length - 1 != ii
                              ? ", "
                              : ""
                          }`}</span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            />
            <Button
              className="btn btn-primary3 btn-41 ms-3"
              loading={loading}
              disabled={inputTemplateName ? false : true}
              onClick={onUpdateTemplateClicked}
            >
              {" Update "}
            </Button>
          </div>
        )}
      </>
    );
  }, [tabChange, popOver2, inputTemplateName, loading, allTemplates, moduleData]);

  // Determine the number of columns for grid layout
  const columnCount = module.namedFields?.length || 2;
  const columnClass =
    columnCount > 2 ? `custom-module-v2--${columnCount}-cols` : "";

  // Check if there's any data to save
  const hasDataToSave = useMemo(() => {
    return moduleData?.filter((row) => {
      return module.namedFields?.some(
        (field) => row[field.fieldName]?.trim().length > 0
      );
    }).length > 0;
  }, [moduleData, module.namedFields]);

  return (
    <div className="prescription-box-sm">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between p-14-pb0">
        <div className="d-flex align-items-center">
          <img className="me-2" src={ModuleIcon} alt={module?.name} />
          <div className="title-common">{module.name}</div>
        </div>

        <div className="d-flex align-items-center">
          <button
            className="btn d-flex align-items-center btn-text"
            onClick={handleTemplates}
          >
            <i className="icon-template me-2"></i> <span>Templates</span>
          </button>
          <Tooltip
            placement="bottom"
            title={
              hasDataToSave
                ? ""
                : `Please enter some ${module?.name} to save a template`
            }
          >
            <Popover
              open={popOver2}
              onOpenChange={() =>
                hasDataToSave &&
                showHideSaveTemplatePopOver()
              }
              content={SAVE_CONTENT}
              trigger="click"
              overlayClassName="pop-450 pp-0"
              placement="bottom"
            >
              <button className="btn d-flex align-items-center btn-text">
                {" "}
                <i className="icon-save me-2"></i> <span>Save</span>
              </button>
            </Popover>
          </Tooltip>
          <button
            onClick={handleClear}
            className="btn btn-text clear-text d-flex align-items-center"
          >
            <i className="icon-eraser1 me-2"></i> <span>Clear</span>
          </button>
          <Dropdown
            overlay={moreMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={
                <MoreOutlined
                  style={{
                    fontSize: "18px",
                    color: "#4a4a4a",
                    fontWeight: "bold",
                  }}
                />
              }
              className="more-options-btn"
            />
          </Dropdown>
        </div>
      </div>

      {/* Table */}
      <div className={`custom-module-v2__table ${columnClass}`}>
        {/* Table Header */}
        <div className="custom-module-v2__table-header mt-14 border-top border-bottom">
          {module.namedFields?.map((field, index) => (
            <div
              key={field.fieldName}
              className="custom-module-v2__table-header-cell border-end"
            >
              {field.fieldLabel.toUpperCase()}
            </div>
          ))}
          <div className="custom-module-v2__table-header-cell custom-module-v2__table-header-cell--action">
            {/* Action column header */}
          </div>
        </div>

        {/* Table Body */}
        <div className="custom-module-v2__table-body">
          {moduleData.map((row, rowIndex) => (
            <div key={row.id} className="custom-module-v2__table-row border-bottom">
              {module.namedFields?.map((field, fieldIndex) => (
                <div
                  key={field.fieldName}
                  className="custom-module-v2__table-cell border-end"
                >
                  <Input
                    placeholder={`Enter ${field.fieldLabel}`}
                    value={row[field.fieldName] || ""}
                    onChange={(e) =>
                      handleFieldChange(row.id, field.fieldName, e.target.value)
                    }
                    className="custom-module-v2__input"
                    bordered={false}
                  />
                </div>
              ))}
              <div className="custom-module-v2__table-cell custom-module-v2__table-cell--action text-center">
                <Button
                  className="btn py-0 btn-delete-prescription px-0"
                  onClick={() => handleDeleteRow(row.id)}
                >
                  <i className="icon-delete"></i>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Line Button */}
      <div className="p-14">
        <Button
          type="link"
          icon={<PlusOutlined />}
          className="add-custom-module-link"
          onClick={handleAddRow}
        >
          Add New Line
        </Button>
      </div>
    </div>
  );
};

export default CustomModuleV2;

