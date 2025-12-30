import React, { useState, useMemo, useEffect } from "react";
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import ModuleListItem from "./ModuleListItem";
import { getModules, searchModulesByHospital } from "../../redux/customModuleSlice";
import { getDecodedToken } from "../../utils/localStorage";
import "./SelectExistingModuleTab.scss";

/**
 * SelectExistingModuleTab Component
 *
 * Tab content for selecting existing custom modules.
 * Includes search functionality and module list.
 *
 * @param {Function} onAddToRx - Callback when "Add to Rx" is clicked
 * @param {Function} onViewMore - Callback when "View more" is clicked
 */
const SelectExistingModuleTab = ({ onAddToRx, onViewMore }) => {
  const dispatch = useDispatch();
  const { customModules: reduxModules, hospitalSearchResults, loading } = useSelector(
    (state) => state.customModules
  );
  console.log(reduxModules,"reduxModules")
  const { userId } = useSelector((state) => state.doctors);
  const [modules, setModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const decodedToken = getDecodedToken();
  const hospitalId = decodedToken?.result?.clinic_id;
  console.log(hospitalSearchResults,"hospitalSearchResults")

  // Fetch modules by hospital on mount
  useEffect(() => {
    if (hospitalId && userId) {
      // Fetch user's own modules (for upsert operations)
      dispatch(getModules(userId));
      // Fetch all hospital modules (for display)
      dispatch(searchModulesByHospital({
        hospitalId,
        moduleName: "",
        page: 1,
        limit: 100
      }));
    }
  }, [hospitalId, userId, dispatch]);

  // Update local modules when Redux state changes
  useEffect(() => {
    if (hospitalSearchResults?.modules && hospitalSearchResults.modules.length > 0) {
      setModules(hospitalSearchResults.modules);
    } else {
      setModules([]);
    }
  }, [hospitalSearchResults]);

  // Filter modules based on search query
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) {
      return modules || [];
    }

    const query = searchQuery.toLowerCase();
    return (modules || []).filter((module) => {
      // Search by module name
      const nameMatch = module.name?.toLowerCase().includes(query);

      // Search by creator (if available in API response)
      const creatorMatch = module.creator_name?.toLowerCase().includes(query);

      // Search by column labels (for V2 modules)
      const columnLabelsMatch = module.namedFields?.some((field) =>
        field.fieldLabel?.toLowerCase().includes(query)
      );

      return nameMatch || creatorMatch || columnLabelsMatch;
    });
  }, [modules, searchQuery]);

  return (
    <div className="select-existing-module-tab">
      <div className="select-existing-module-tab__search">
        <div className="select-existing-module-tab__search-wrapper">
          <Input
            placeholder="Search by Module Name/Creator/Column Labels"
            allowClear
            onPressEnter={(e) => setSearchQuery(e.target.value)}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<SearchOutlined />}
            className="select-existing-module-tab__search-input"
            value={searchQuery}
          />
        </div>
      </div>

      <div className="select-existing-module-tab__list">
        {loading ? (
          <div className="select-existing-module-tab__loading">
            <Spin size="large" />
          </div>
        ) : filteredModules.length === 0 ? (
          <div className="select-existing-module-tab__empty">
            {searchQuery
              ? "No modules found matching your search."
              : "No custom modules available."}
          </div>
        ) : (
          filteredModules.map((module) => (
            <ModuleListItem
              key={module.module_id}
              module={module}
              onAddToRx={onAddToRx}
              onViewMore={onViewMore}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SelectExistingModuleTab;
