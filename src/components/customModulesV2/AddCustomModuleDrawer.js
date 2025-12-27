import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Drawer, Tabs, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import SelectExistingModuleTab from "./SelectExistingModuleTab";
import CreateNewModuleTab from "./CreateNewModuleTab";
import ConfirmModuleModal from "./ConfirmModuleModal";
import { addModule, getModules } from "../../redux/customModuleSlice";
import { customizedPad } from "../../redux/doctorsSlice";
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
  const dispatch = useDispatch();
  const { userId, customizedPadRightList, customizedPadLeftList } =
    useSelector((state) => state.doctors);
  const { loading, customModules } = useSelector(
    (state) => state.customModules
  );
  const [activeTab, setActiveTab] = useState("select"); // "select" | "create"
  const [createModuleFormData, setCreateModuleFormData] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Fetch modules when drawer opens
  useEffect(() => {
    if (open && userId) {
      dispatch(getModules(userId));
    }
  }, [open, userId, dispatch]);

  const handleAddToRx = useCallback(
    async (module) => {
      if (!module || !module.module_id) {
        message.error("Invalid module selected");
        return;
      }

      try {
        // Check if module already exists in the right pad
        const moduleExists = customizedPadRightList?.some(
          (item) => item.tmdpm_id === module.module_id
        );

        if (moduleExists) {
          message.warning("This module is already added to your prescription pad");
          return;
        }

        // Add module to customized pad right list
        const updatedRightPad = [
          ...(customizedPadRightList || []),
          {
            tmdpm_id: module.module_id,
            tmdpm_name: module.name,
            tmdpm_short_name: module.name,
            tmdpm_type: "R",
            tmdpm_status: 0,
            is_custom_module: true,
          },
        ];

        const sendData = {
          data: {
            default: false,
            reset: false,
            left: customizedPadLeftList || [],
            right: updatedRightPad,
          },
        };

        await dispatch(customizedPad(sendData)).unwrap();
        message.success(
          `"${module.name}" has been added to your prescription pad`
        );
        onClose();
      } catch (error) {
        console.error("Error adding module to Rx:", error);
        message.error(
          error?.message || "Failed to add module to prescription pad"
        );
      }
    },
    [
      dispatch,
      customizedPadRightList,
      customizedPadLeftList,
      onClose,
    ]
  );

  const handleViewMore = useCallback((module) => {
    // TODO: Implement view more functionality - could open a modal with module details
    console.log("View more:", module);
    message.info(`View more details for: ${module.name}`);
  }, []);

  const handleCreateModule = () => {
    // Show confirmation modal
    if (createModuleFormData?.isValid) {
      setConfirmModalOpen(true);
    }
  };

  const handleConfirmModule = useCallback(
    async (moduleData) => {
      if (!moduleData || !userId) {
        message.error("Missing required information");
        return;
      }

      try {
        // Transform form data to V2 module format
        const namedFields = moduleData.columnLabels.map((label, index) => ({
          fieldName: `field_${index + 1}`,
          fieldLabel: label.trim(),
          fieldType: "string",
          isRequired: true,
          order: index,
        }));

        // Generate a unique module_id
        const moduleId = `${moduleData.moduleName
          .toLowerCase()
          .replace(/\s+/g, "-")}-${Date.now()}`;

        const modulePayload = {
          module_id: moduleId,
          name: moduleData.moduleName.trim(),
          version: "v2",
          namedFields: namedFields,
        };

        const payload = {
          userId: userId,
          modules: [modulePayload],
        };

        await dispatch(addModule(payload)).unwrap();

        message.success(
          `Module "${moduleData.moduleName}" created successfully!`
        );

        // Refresh modules list
        await dispatch(getModules(userId)).unwrap();

        setConfirmModalOpen(false);
        // Close drawer after creation
        onClose();
        // Reset form data
        setCreateModuleFormData(null);
        // Reset to select tab
        setActiveTab("select");
      } catch (error) {
        console.error("Error creating module:", error);
        const errorMessage =
          error?.message ||
          error?.error ||
          "Failed to create module. Please try again.";
        message.error(errorMessage);
      }
    },
    [dispatch, userId, onClose]
  );

  const handleFormChange = useCallback((formData) => {
    setCreateModuleFormData(formData);
  }, []);

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
            disabled={!isCreateButtonEnabled || loading}
            loading={loading}
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
        loading={loading}
      />
    </Drawer>
  );
};

export default AddCustomModuleDrawer;
