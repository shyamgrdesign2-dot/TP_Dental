import React from "react";
import { Tooltip } from "antd";
import { PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./AddCustomModuleV2.scss";

const MAX_MODULES = 15;

/**
 * AddCustomModuleV2 Component
 *
 * Displays a button to add custom modules with module count information.
 *
 * @param {Function} onOpenDrawer - Callback function to open the drawer when button is clicked
 */
const AddCustomModuleV2 = ({ onOpenDrawer }) => {
  const { customModules } = useSelector((state) => state.customModules);
  // Filter out cloned modules (modules with origin_id) - only count user-created modules
  const userCreatedModules = customModules?.filter((module) => !module.origin_id) || [];
  const moduleCount = userCreatedModules.length;
  const isDisabled = moduleCount >= MAX_MODULES;

  const handleClick = () => {
    if (onOpenDrawer) {
      onOpenDrawer();
    }
  };

  return (
    <div
      // className={`add-custom-module-v2 ${isDisabled ? "disabled" : ""}`}
      className={`add-custom-module-v2`}
      onClick={handleClick}
    >
      <div className="add-custom-module-v2__left">
        <PlusOutlined className="add-custom-module-v2__plus-icon" />
        <span className="add-custom-module-v2__text">Add Custom Module</span>
      </div>
      <div className="add-custom-module-v2__right">
        <span className="add-custom-module-v2__count">
          {moduleCount}/{MAX_MODULES} modules added
        </span>
        {/* <Tooltip
          title="You can create up to 10 custom modules. If you've reached the limit, delete an existing custom module to add a new one."
          placement="top"
          overlayClassName="add-custom-module-v2__tooltip"
        >
          <InfoCircleOutlined className="add-custom-module-v2__info-icon" />
        </Tooltip> */}
      </div>
    </div>
  );
};

export default AddCustomModuleV2;
