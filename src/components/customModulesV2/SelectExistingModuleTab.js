import React, { useState, useMemo, useEffect } from "react";
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import ModuleListItem from "./ModuleListItem";
import { getModules } from "../../redux/customModuleSlice";
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
  const { customModules: reduxModules, loading } = useSelector(
    (state) => state.customModules
  );
  const { userId } = useSelector((state) => state.doctors);
  const [modules, setModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch modules on mount
  useEffect(() => {
    if (userId) {
      dispatch(getModules(userId));
    }
  }, [userId, dispatch]);

  // Update local modules when Redux state changes
  useEffect(() => {
    if (reduxModules && reduxModules.length > 0) {
      setModules(reduxModules);
    } else {
      setModules([]);
    }
  }, [reduxModules]);

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
