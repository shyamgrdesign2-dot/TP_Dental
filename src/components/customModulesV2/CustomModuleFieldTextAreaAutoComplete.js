import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { AutoComplete, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { searchModule } from "../../redux/customModuleSlice";
import { removeBeforeWhiteSpace } from "../../utils/utils";

/**
 * CustomModuleFieldTextAreaAutoComplete Component
 *
 * Combines TextArea (multi-line) with AutoComplete functionality:
 * - Frequently used values from templates
 * - Search API integration (when query > 3 chars)
 * - Template filtering (when query <= 3 chars)
 * - Custom value creation support
 * - Multi-line text input support
 *
 * @param {String} fieldName - Field identifier (e.g., "DietType")
 * @param {String} fieldLabel - Display label (e.g., "Diet Type")
 * @param {String} value - Current field value
 * @param {Function} onChange - Callback when value changes
 * @param {String} moduleId - Module ID for API calls
 * @param {Array} templates - All templates for this module
 * @param {String} placeholder - Placeholder text
 * @param {Boolean} disabled - Disable the input
 * @param {String} className - Additional CSS classes
 * @param {Boolean} autoFocus - Auto focus on mount
 */
const CustomModuleFieldTextAreaAutoComplete = ({
  fieldName,
  fieldLabel,
  value,
  onChange,
  moduleId,
  templates = [],
  placeholder,
  disabled = false,
  className = "",
  autoFocus = false,
  fieldId, // Unique identifier for this field instance
  focusedFieldId, // Currently focused field ID from parent
  onFocusChange, // Callback to update focused field in parent
}) => {
  const dispatch = useDispatch();
  const { searchModuleResults, loading } = useSelector(
    (state) => state.customModules
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const textAreaRef = useRef(null);
  
  // Only show dropdown if this field is the focused one
  const isFocused = focusedFieldId === fieldId;

  // Extract frequently used values from templates for this specific field
  const frequentlyUsedValues = useMemo(() => {
    const values = new Set();
    templates.forEach((template) => {
      if (template.content && Array.isArray(template.content)) {
        template.content.forEach((item) => {
          const fieldValue = item[fieldName];
          if (fieldValue && fieldValue.trim()) {
            values.add(fieldValue.trim());
          }
        });
      }
    });
    return Array.from(values);
  }, [templates, fieldName]);

  // Filter templates locally when query <= 3 chars
  const filteredTemplateValues = useMemo(() => {
    if (!searchQuery || searchQuery.length > 3) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    const values = new Set();
    
    templates.forEach((template) => {
      if (template.content && Array.isArray(template.content)) {
        template.content.forEach((item) => {
          const fieldValue = item[fieldName];
          if (
            fieldValue &&
            fieldValue.trim() &&
            fieldValue.toLowerCase().includes(query)
          ) {
            values.add(fieldValue.trim());
          }
        });
      }
    });
    
    return Array.from(values);
  }, [templates, fieldName, searchQuery]);

  // Call search API when query > 3 chars - only if this field is focused
  useEffect(() => {
    if (isFocused && searchQuery && searchQuery.trim().length > 3) {
      const timeOutId = setTimeout(() => {
        dispatch(
          searchModule({
            moduleId,
            keyword: searchQuery.trim(),
            fieldName,
          })
        );
      }, 1000);
      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [searchQuery, moduleId, fieldName, dispatch, isFocused]);

  // Build options from API results or filtered templates
  useEffect(() => {
    const data = [];

    // If no search query, show frequently used
    if (!searchQuery || searchQuery.trim().length === 0) {
      if (frequentlyUsedValues.length > 0) {
        data.push({
          key: -1,
          label: <div className="fw-medium">FREQUENTLY USED</div>,
        });
        frequentlyUsedValues.forEach((val) => {
          data.push({
            key: JSON.stringify({ value: val }),
            value: val,
            label: <div>{val}</div>,
          });
        });
      }
    }
    // If query <= 3 chars, show filtered template values
    else if (searchQuery.trim().length <= 3) {
      filteredTemplateValues.forEach((val) => {
        data.push({
          key: JSON.stringify({ value: val }),
          value: val,
          label: <div>{val}</div>,
        });
      });

      // Add custom value option if not in filtered results
      const queryTrimmed = searchQuery.trim();
      if (
        queryTrimmed &&
        !filteredTemplateValues.some(
          (v) => v.toLowerCase() === queryTrimmed.toLowerCase()
        )
      ) {
        data.push({
          key: JSON.stringify({ value: queryTrimmed, isCustom: true }),
          value: queryTrimmed,
          label: (
            <div>
              {queryTrimmed}
              <i className="icon-Add mx-1 text-primary fs-6"></i>{" "}
              <span className="fw-medium text-decoration-underline text-primary">
                {" "}
                Add Custom
              </span>
            </div>
          ),
        });
      }
    }
    // If query > 3 chars, show API results
    else {
      if (searchModuleResults && Array.isArray(searchModuleResults)) {
        const apiValues = new Set();
        searchModuleResults.forEach((result) => {
          if (result.moduleContents && Array.isArray(result.moduleContents)) {
            result.moduleContents.forEach((moduleContent) => {
              if (
                moduleContent.content &&
                moduleContent.content[fieldName]
              ) {
                const fieldValue = moduleContent.content[fieldName];
                if (fieldValue && fieldValue.trim()) {
                  apiValues.add(fieldValue.trim());
                }
              }
            });
          }
        });

        Array.from(apiValues).forEach((val) => {
          data.push({
            key: JSON.stringify({ value: val }),
            value: val,
            label: <div>{val}</div>,
          });
        });

        // Add custom value option if not in API results
        const queryTrimmed = searchQuery.trim();
        if (
          queryTrimmed &&
          !Array.from(apiValues).some(
            (v) => v.toLowerCase() === queryTrimmed.toLowerCase()
          )
        ) {
          data.push({
            key: JSON.stringify({ value: queryTrimmed, isCustom: true }),
            value: queryTrimmed,
            label: (
              <div>
                {queryTrimmed}
                <i className="icon-Add mx-1 text-primary fs-6"></i>{" "}
                <span className="fw-medium text-decoration-underline text-primary">
                  {" "}
                  Add Custom
                </span>
              </div>
            ),
          });
        }
      }
    }

    setOptions(data);
    // Only show dropdown if this field is focused and has options
    if (isFocused) {
      if (data.length > 0 && searchQuery.trim().length > 0) {
        setDropdownVisible(true);
      } else if (searchQuery.trim().length === 0 && frequentlyUsedValues.length > 0) {
        setDropdownVisible(true);
      } else {
        setDropdownVisible(false);
      }
    } else {
      setDropdownVisible(false);
    }
  }, [
    searchQuery,
    frequentlyUsedValues,
    filteredTemplateValues,
    searchModuleResults,
    fieldName,
    isFocused,
  ]);

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      const trimmedVal = removeBeforeWhiteSpace(newValue || "");
      onChange(trimmedVal);
      // Update search query for filtering/API calls based on current line
      // Only make API calls if this field is focused (handled in useEffect)
      const lines = trimmedVal.split('\n');
      const currentLine = lines[lines.length - 1] || '';
      setSearchQuery(currentLine);
    },
    [onChange]
  );

  const onSelect = useCallback(
    (selectedValue, option) => {
      // When selecting from dropdown, replace the ENTIRE field value with the selected value
      // This ensures multi-line values are properly set and previous values are cleared
      const newValue = selectedValue || "";
      onChange(newValue);
      
      setSearchQuery("");
      setDropdownVisible(false);
      
      // Clear focus after selection
      if (onFocusChange && fieldId) {
        setTimeout(() => {
          onFocusChange(null);
        }, 100);
      }
      
      // Refocus the textarea after a short delay to allow selection
      if (textAreaRef.current) {
        setTimeout(() => {
          textAreaRef.current?.focus();
          // Set cursor to end of text after selection
          const textarea = textAreaRef.current?.resizableTextArea?.textArea;
          if (textarea) {
            const length = textarea.value.length;
            textarea.setSelectionRange(length, length);
          }
        }, 150);
      }
    },
    [onChange, fieldId, onFocusChange]
  );

  // Get the current line for searching
  const getCurrentLine = () => {
    const currentValue = value || "";
    const lines = currentValue.split('\n');
    return lines[lines.length - 1] || "";
  };

  return (
    <div className="custom-module-dropdown-container" style={{ position: 'relative', width: '100%' }}>
      <TextArea
        ref={textAreaRef}
        value={value || ""}
        onChange={handleChange}
        className={className}
        placeholder={placeholder || `Enter ${fieldLabel}`}
        disabled={disabled}
        autoFocus={autoFocus}
        autoSize={{ minRows: 1, maxRows: 10 }}
        bordered={false}
        onFocus={() => {
          // Notify parent that this field is now focused
          if (onFocusChange && fieldId) {
            onFocusChange(fieldId);
          }
          // Update search query based on current line when focused
          const currentLine = getCurrentLine();
          setSearchQuery(currentLine);
          // Dropdown visibility will be handled by the useEffect that watches isFocused
        }}
        onBlur={(e) => {
          // Delay hiding dropdown to allow selection from dropdown
          // Only clear focus if focus is not moving to dropdown
          setTimeout(() => {
            const activeElement = document.activeElement;
            const dropdownElement = e.target.closest('.custom-module-dropdown-container')?.querySelector('.custom-module-dropdown');
            if (!dropdownElement || !dropdownElement.contains(activeElement)) {
              if (onFocusChange && fieldId === focusedFieldId) {
                onFocusChange(null);
              }
              setDropdownVisible(false);
            }
          }, 200);
        }}
      />
      {isFocused && dropdownVisible && options.length > 0 && (
        <div
          className="custom-module-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            width: '100%',
            boxSizing: 'border-box',
          }}
          onMouseDown={(e) => {
            // Prevent blur when clicking dropdown
            e.preventDefault();
          }}
        >
          {options.map((option, idx) => {
            // Parse the option key to check if it's a custom value and get the actual value
            let optionValue = option.value;
            if (option.key && option.key !== "-1") {
              try {
                const parsed = JSON.parse(option.key);
                // For custom options or regular options, use parsed.value
                optionValue = parsed.value || option.value;
              } catch (e) {
                // If parsing fails, use option.value as is
                optionValue = option.value;
              }
            }
            
            return (
              <div
                key={option.key || idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (option.key !== "-1") {
                    // Pass the parsed value and the option to onSelect
                    onSelect(optionValue, option);
                  }
                }}
                className={option.key === "-1" ? "custom-module-dropdown-header" : "custom-module-dropdown-item"}
              >
                {option.label}
              </div>
            );
          })}
          {loading && (
            <div className="custom-module-dropdown-loading" style={{ padding: '8px 12px', textAlign: 'center' }}>
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomModuleFieldTextAreaAutoComplete;
