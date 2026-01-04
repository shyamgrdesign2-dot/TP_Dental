import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Drawer, Tabs, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import SelectExistingModuleTab from "./SelectExistingModuleTab";
import CreateNewModuleTab from "./CreateNewModuleTab";
import ConfirmModuleModal from "./ConfirmModuleModal";
import { addModule, getModules, searchModulesByHospital } from "../../redux/customModuleSlice";
import { customizedPad } from "../../redux/doctorsSlice";
import { getDecodedToken } from "../../utils/localStorage";
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
  const { loading, customModules, hospitalSearchResults } = useSelector(
    (state) => state.customModules
  );
  const [activeTab, setActiveTab] = useState("select"); // "select" | "create"
  const [createModuleFormData, setCreateModuleFormData] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const decodedToken = getDecodedToken();
  const hospitalId = decodedToken?.result?.clinic_id;

  // Fetch modules when drawer opens
  useEffect(() => {
    if (open && userId) {
      // Fetch user's own modules (needed for upsert operation)
      dispatch(getModules(userId));
    }
    if (open && hospitalId) {
      // Fetch all hospital modules for display
      dispatch(searchModulesByHospital({
        hospitalId,
        moduleName: "",
        page: 1,
        limit: 100
      }));
    }
  }, [open, userId, hospitalId, dispatch]);

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
    // console.log("View more:", module);
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
        // Helper function to convert label to camelCase fieldName
        const toCamelCase = (str) => {
          return str
            .trim()
            // Replace spaces and special characters with a marker
            .replace(/[^a-zA-Z0-9]+(.)?/g, (match, chr) => {
              return chr ? chr.toUpperCase() : '';
            })
            // Make first character lowercase
            .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
        };

        // Transform form data to V2 module format
        const namedFields = moduleData.columnLabels.map((label, index) => ({
          fieldName: toCamelCase(label),
          fieldLabel: label.trim(),
          fieldType: "string",
          isRequired: false,
          order: index,
        }));

        // Create new module payload (without module_id - DB will generate it)
        const newModulePayload = {
          name: moduleData.moduleName.trim(),
          version: "v2",
          namedFields: namedFields,
        };

        // Get all existing user modules and add the new one
        // This is an UPSERT API - must send all existing modules + new module
        const allModules = [
          ...(customModules || []), // All existing user modules
          newModulePayload, // New module
        ];

        const payload = {
          userId: userId,
          modules: allModules,
        };

        await dispatch(addModule(payload)).unwrap();

        // Refresh user's modules to get the newly created module with its ID
        const updatedModulesResponse = await dispatch(getModules(userId)).unwrap();

        // Find the newly created module by comparing old and new module lists
        // The newly added module will exist in the updated list but not in the old list
        const oldModuleIds = new Set(
          (customModules || []).map((module) => module.module_id)
        );
        
        const newlyCreatedModule = updatedModulesResponse?.modules?.find(
          (module) => !oldModuleIds.has(module.module_id)
        );

        if (newlyCreatedModule && newlyCreatedModule.module_id) {
          // Check if module already exists in the right pad
          const moduleExists = customizedPadRightList?.some(
            (item) => item.tmdpm_id === newlyCreatedModule.module_id
          );

          if (!moduleExists) {
            // Add module to customized pad right list
            const updatedRightPad = [
              ...(customizedPadRightList || []),
              {
                tmdpm_id: newlyCreatedModule.module_id,
                tmdpm_name: newlyCreatedModule.name,
                tmdpm_short_name: newlyCreatedModule.name,
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
              `Module "${moduleData.moduleName}" created and added to your prescription pad!`
            );
          } else {
            message.success(
              `Module "${moduleData.moduleName}" created successfully!`
            );
          }
        } else {
          message.success(
            `Module "${moduleData.moduleName}" created successfully!`
          );
        }

        // Refresh modules list by hospital
        await dispatch(searchModulesByHospital({
          hospitalId,
          moduleName: "",
          page: 1,
          limit: 100
        })).unwrap();

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
    [dispatch, userId, onClose, customModules, hospitalId, customizedPadRightList, customizedPadLeftList]
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
