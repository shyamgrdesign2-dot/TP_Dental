import React, { useState, useMemo } from "react";
import { Drawer, Tabs, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import SelectExistingModuleTab from "./SelectExistingModuleTab";
import CreateNewModuleTab from "./CreateNewModuleTab";
import ConfirmModuleModal from "./ConfirmModuleModal";
import "./AddCustomModuleDrawer.scss";

const { TabPane } = Tabs;

/**
 * AddCustomModuleDrawer Component
 *
 * Main drawer container for adding custom modules.
 * Contains tabs for "Select Existing Module" and "Create New Module".
 *
 * @param {Boolean} open - Controls drawer visibility
 * @param {Function} onClose - Callback to close the drawer
 */
const AddCustomModuleDrawer = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("select"); // "select" | "create"
  const [createModuleFormData, setCreateModuleFormData] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleAddToRx = (module) => {
    // TODO: Implement add to Rx functionality
    console.log("Add to Rx:", module);
  };

  const handleViewMore = (module) => {
    // TODO: Implement view more functionality
    console.log("View more:", module);
  };

  const handleCreateModule = () => {
    // Show confirmation modal
    if (createModuleFormData?.isValid) {
      setConfirmModalOpen(true);
    }
  };

  const handleConfirmModule = (moduleData) => {
    // TODO: Implement actual module creation API call
    console.log("Confirm create module:", moduleData);
    setConfirmModalOpen(false);
    // Close drawer after creation
    onClose();
    // Reset form data
    setCreateModuleFormData(null);
  };

  const handleFormChange = (formData) => {
    setCreateModuleFormData(formData);
  };

  const isCreateButtonEnabled = useMemo(() => {
    if (activeTab !== "create") return false;
    return createModuleFormData?.isValid || false;
  }, [activeTab, createModuleFormData]);

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width={800}
      className="add-custom-module-drawer"
    >
      <div className="add-custom-module-drawer__header">
        <div className="add-custom-module-drawer__header-left">
          <ArrowLeftOutlined
            className="add-custom-module-drawer__back-icon"
            onClick={onClose}
          />
          <h2 className="add-custom-module-drawer__title">Add Custom Module</h2>
        </div>
        {activeTab === "create" && (
          <Button
            type="primary"
            className="add-custom-module-drawer__create-button"
            disabled={!isCreateButtonEnabled}
            onClick={handleCreateModule}
          >
            Create Module
          </Button>
        )}
      </div>

      <div className="add-custom-module-drawer__tabs">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="add-custom-module-drawer__tabs-container"
        >
          <TabPane
            tab="Select Existing Module"
            key="select"
            className="add-custom-module-drawer__tab-pane"
          >
            <SelectExistingModuleTab
              onAddToRx={handleAddToRx}
              onViewMore={handleViewMore}
            />
          </TabPane>
          <TabPane
            tab="Create New Module"
            key="create"
            className="add-custom-module-drawer__tab-pane"
          >
            <CreateNewModuleTab
              onCreateModule={handleCreateModule}
              onFormChange={handleFormChange}
            />
          </TabPane>
        </Tabs>
      </div>

      {/* Confirm Module Modal */}
      <ConfirmModuleModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmModule}
        moduleData={createModuleFormData}
      />
    </Drawer>
  );
};

export default AddCustomModuleDrawer;
