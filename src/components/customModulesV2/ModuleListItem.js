import React, { useState } from "react";
import { Button, Tooltip, message } from "antd";
import { PlusOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import "./ModuleListItem.scss";
import { useSelector, useDispatch } from "react-redux";
import { addModule } from "../../redux/customModuleSlice";
import editIcon from "../../assets/images/edit-icon-blue.svg";
import deleteIcon from "../../assets/images/delete-icon-blue.svg";

/**
 * ModuleListItem Component
 *
 * Individual module card component displaying module information
 * and action buttons.
 *
 * @param {Object} module - Module data object
 * @param {Function} onAddToRx - Callback when "Add to Rx" is clicked
 * @param {Function} onViewMore - Callback when "View more" is clicked
 * @param {Function} onDelete - Optional callback after successful deletion
 */
const ModuleListItem = ({ module, onAddToRx, onViewMore, onDelete }) => {
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { profile, userId } = useSelector((state) => state.doctors);
  const { customModules } = useSelector((state) => state.customModules);
  // Calculate column count based on module version
  const getColumnCount = () => {
    if (module.version === "v2" && module.namedFields) {
      return module.namedFields.length;
    }
    return 2; // V1 has title + notes
  };

  const columnCount = getColumnCount();

  // Get column labels for preview
  const getColumnLabels = () => {
    if (module.version === "v2" && module.namedFields) {
      return module.namedFields.map(
        (field) => field.fieldLabel || field.fieldName
      );
    }
    // V1 modules have title and notes
    return ["Title", "Notes"];
  };

  const columnLabels = getColumnLabels();

  // Get creator name (comes from API response)
  const creatorName = module.doctor_name || "Unknown Creator";

  // Check if module is disabled (used or cloned by the user)
  const isModuleDisabled = (module.hasBeenUsed || module.hasBeenCloned  || module.userId != userId);
  
  // Tooltip content for disabled items
  const disabledTooltipContent = (
    <div>
      <strong>Note:</strong> This module is used in an Rx and can't be <strong>edited/deleted</strong>. Create a new one if you need a different version
    </div>
  );

  // More options menu items
  const menuItems = [
    {
      key: "edit",
      label: isModuleDisabled ? (
        <Tooltip 
          title={disabledTooltipContent}
          placement="left"
          overlayStyle={{ maxWidth: 350 }}
          overlayClassName="module-disabled-tooltip"
        >
          <span>
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
        <span>
          <img
            src={editIcon}
            width={16}
            height={16}
            alt="edit"
            style={{ margin: "0 8px 3px 0" }}
          />
          Edit Module Name
        </span>
      ),
      disabled: isModuleDisabled,
    },
    // {
    //   key: "duplicate",
    //   label: (
    //     <span>
    //       <CopyOutlined style={{ marginRight: 8 }} />
    //       Duplicate
    //     </span>
    //   ),
    // },
    {
      key: "delete",
      label: isModuleDisabled ? (
        <Tooltip 
          title={disabledTooltipContent}
          placement="left"
          overlayStyle={{ maxWidth: 350 }}
          overlayClassName="module-disabled-tooltip"
        >
          <span>
            <img
              src={deleteIcon}
              width={16}
              height={16}
              alt="edit"
              style={{ margin: "0 8px 3px 0" }}
            />
            Delete Module
          </span>
        </Tooltip>
      ) : (
        <span>
          <img
            src={deleteIcon}
            width={16}
            height={16}
            alt="edit"
            style={{ margin: "0 8px 3px 0" }}
          />
          Delete Module
        </span>
      ),
      disabled: isModuleDisabled,
    },
  ];

  // Handle delete module
  const handleDeleteModule = async () => {
    try {
      // Filter out the current module from customModules
      const modules = customModules.filter((cm) => cm.module_id !== module.module_id);
      
      // Call addModule API with remaining modules (upsert)
      const action = await dispatch(addModule({ userId, modules }));
      
      if (action.meta.requestStatus === "fulfilled") {
        message.success(`Module "${module.name}" deleted successfully`);
        
        // Call onDelete callback to refresh the list if provided
        if (onDelete) {
          onDelete(module.module_id);
        }
      } else {
        message.error("Failed to delete module");
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      message.error("Failed to delete module. Please try again.");
    }
  };

  const handleMenuClick = ({ key }) => {
    setDropdownVisible(false);
    
    if (key === "delete" && !isModuleDisabled) {
      handleDeleteModule();
    } else if (key === "edit") {
      // Handle edit - will be implemented later
      console.log(`Edit module ${module.module_id}`);
    }
  };

  const handleAddToRx = () => {
    if (onAddToRx) {
      onAddToRx(module);
    }
  };

  const handleViewMore = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
    // Also call the callback if provided
    if (onViewMore && !isExpanded) {
      onViewMore(module);
    }
  };

  // Set CSS variable for grid columns
  const gridStyle = {
    "--column-count": columnCount,
  };

  return (
    <div className="module-list-item">
      <div className="module-list-item__content" style={gridStyle}>
        <div className="module-list-item__container">
          <div className="module-list-item__header">
            <h3 className="module-list-item__name">{module.name}</h3>
            <div className="module-list-item__details">
              <div className="module-list-item__tags">
                <span className="module-list-item__tag module-list-item__tag--creator">
                  <UserOutlined className="module-list-item__tag-icon" />
                  <span>{creatorName}</span>
                </span>
                <span className="module-list-item__tag module-list-item__tag--columns">
                  {String(columnCount).padStart(2, "0")} columns
                </span>
              </div>
              <a className="module-list-item__view-more" onClick={handleViewMore}>
                {isExpanded ? "View less" : "View more"}
              </a>
            </div>
          </div>
          <div className="module-list-item__actions">
            <Button
              type="default"
              icon={<PlusOutlined />}
              onClick={handleAddToRx}
              className="module-list-item__add-button"
            >
              Add to Rx
            </Button>
            <Dropdown
              menu={{
                items: menuItems,
                onClick: handleMenuClick,
              }}
              trigger={["click"]}
              open={dropdownVisible}
              onOpenChange={setDropdownVisible}
              placement="bottomRight"
              getPopupContainer={(trigger) => document.body}
            >
              <Button
                type="text"
                icon={<MoreOutlined />}
                className="module-list-item__more-button"
              />
            </Dropdown>
          </div>
        </div>

        {/* Expanded Preview Table */}
        {isExpanded && (
          <div className="module-list-item__preview">
            <div className="module-list-item__preview-table">
              {/* Column Headers */}
              <div className="module-list-item__preview-row module-list-item__preview-row--header">
                {columnLabels.map((label, index) => (
                  <div
                    key={index}
                    className="module-list-item__preview-cell module-list-item__preview-cell--header"
                  >
                    {label.toUpperCase()}
                  </div>
                ))}
              </div>

              {/* Input Placeholders Row */}
              <div className="module-list-item__preview-row">
                {columnLabels.map((label, index) => (
                  <div
                    key={index}
                    className="module-list-item__preview-cell module-list-item__preview-cell--input"
                  >
                    <span className="module-list-item__preview-placeholder">
                      Enter {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleListItem;
