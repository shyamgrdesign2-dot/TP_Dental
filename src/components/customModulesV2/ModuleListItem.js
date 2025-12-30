import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import "./ModuleListItem.scss";

/**
 * ModuleListItem Component
 *
 * Individual module card component displaying module information
 * and action buttons.
 *
 * @param {Object} module - Module data object
 * @param {Function} onAddToRx - Callback when "Add to Rx" is clicked
 * @param {Function} onViewMore - Callback when "View more" is clicked
 */
const ModuleListItem = ({ module, onAddToRx, onViewMore }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
  const creatorName = module.creator_name || "Unknown Creator";

  // More options menu items
  const menuItems = [
    {
      key: "edit",
      label: "Edit",
      disabled: !module.is_owner, // Disable if not owner
    },
    {
      key: "duplicate",
      label: "Duplicate",
    },
    {
      key: "delete",
      label: "Delete",
      danger: true,
      disabled: !module.is_owner, // Disable if not owner
    },
  ];

  const handleMenuClick = ({ key }) => {
    setDropdownVisible(false);
    // Handle menu actions (edit, duplicate, delete)
    console.log(`Menu action: ${key} for module ${module.module_id}`);
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
                  <span>Dr. {creatorName}</span>
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
