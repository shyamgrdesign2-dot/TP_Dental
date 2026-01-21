import React, { useMemo, useState } from "react";
import { AutoComplete, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./OphthalmologyExamPanel.module.scss";
import {
  OPHTHALMOLOGY_OPTIONS,
  OPHTHALMOLOGY_SECTIONS,
} from "../../utils/ophthalmologyExamConstants";
import {
  resetVisualAcuity,
  updateVisualAcuityField,
} from "../../redux/ophthalmologyExamSlice";

const resolveOptionsKey = (optionsKey) => {
  if (!optionsKey) {
    return undefined;
  }
  return optionsKey.split(".").reduce((acc, part) => {
    if (!acc) {
      return undefined;
    }
    return acc[part];
  }, OPHTHALMOLOGY_OPTIONS);
};

const DropdownInput = ({
  value,
  placeholder,
  options,
  onChange,
  onAdvance,
  inputRef,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!options || options.length === 0) {
      return [];
    }
    return options.map((option) => ({ value: option }));
  }, [options]);

  return (
    <AutoComplete
      className={styles.autoComplete}
      value={value}
      options={filteredOptions}
      open={isOpen}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setTimeout(() => setIsOpen(false), 120)}
      onChange={onChange}
      onSelect={(nextValue) => {
        onChange(nextValue);
        setIsOpen(false);
        if (onAdvance) {
          onAdvance();
        }
      }}
      filterOption={(inputValue, option) =>
        option?.value?.toLowerCase().includes(inputValue.toLowerCase())
      }
      getPopupContainer={() => document.body}
      dropdownMatchSelectWidth
      dropdownClassName={styles.dropdown}
    >
      <Input
        ref={inputRef}
        className={styles.input}
        bordered={false}
        placeholder={placeholder}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setIsOpen(false);
            if (onAdvance) {
              onAdvance();
            }
          }
        }}
      />
    </AutoComplete>
  );
};

const InlineField = ({ field }) => {
  const [value, setValue] = useState("");
  const options = field.optionsKey
    ? resolveOptionsKey(field.optionsKey)
    : field.options || [];

  return (
    <div className={styles.inlineField}>
      <div className={styles.inlineLabel}>{field.label}</div>
      <DropdownInput
        value={value}
        placeholder={field.placeholder}
        options={options}
        onChange={setValue}
      />
    </div>
  );
};

const OphthalmologyTable = ({ table, values: externalValues, onChange }) => {
  const { columns, rows } = table;
  const inputColumnKeys = useMemo(
    () => columns.filter((column) => column.type !== "label").map((c) => c.key),
    [columns]
  );
  const cellRefs = useMemo(() => {
    const refs = {};
    rows.forEach((row) => {
      inputColumnKeys.forEach((columnKey) => {
        refs[`${row.key}-${columnKey}`] = React.createRef();
      });
    });
    return refs;
  }, [rows, inputColumnKeys]);

  const initialValues = useMemo(() => {
    const nextValues = {};
    rows.forEach((row) => {
      columns.forEach((column) => {
        if (column.type === "label") {
          return;
        }
        nextValues[`${row.key}-${column.key}`] = "";
      });
    });
    return nextValues;
  }, [columns, rows]);

  const [values, setValues] = useState(initialValues);

  const handleChange = (rowKey, columnKey, nextValue) => {
    if (onChange) {
      onChange(rowKey, columnKey, nextValue);
      return;
    }
    setValues((prev) => ({
      ...prev,
      [`${rowKey}-${columnKey}`]: nextValue,
    }));
  };

  const handleAdvance = (rowKey, columnKey) => {
    const currentIndex = inputColumnKeys.indexOf(columnKey);
    if (currentIndex === -1 || currentIndex === inputColumnKeys.length - 1) {
      return;
    }
    const nextKey = inputColumnKeys[currentIndex + 1];
    const nextRef = cellRefs[`${rowKey}-${nextKey}`];
    if (nextRef?.current) {
      nextRef.current.focus();
    }
  };

  const getOptions = (row, column) => {
    if (column.optionsFromRow && row.optionsKey) {
      return resolveOptionsKey(row.optionsKey) || [];
    }
    if (column.optionsKey) {
      return resolveOptionsKey(column.optionsKey) || [];
    }
    if (column.options) {
      return column.options;
    }
    return [];
  };

  return (
    <div className={styles.tableWrapper}>
      {table.title && <div className={styles.tableTitle}>{table.title}</div>}
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              {columns.map((column) => {
                if (column.type === "label") {
                  return (
                    <td key={column.key} className={styles.rowLabel}>
                      {row.label}
                    </td>
                  );
                }
                const cellKey = `${row.key}-${column.key}`;
                const cellValue = externalValues
                  ? externalValues[cellKey] ?? ""
                  : values[cellKey];
                return (
                  <td key={column.key}>
                    <DropdownInput
                      value={cellValue}
                      placeholder={column.placeholder}
                      options={getOptions(row, column)}
                      onChange={(nextValue) =>
                        handleChange(row.key, column.key, nextValue)
                      }
                      onAdvance={() => handleAdvance(row.key, column.key)}
                      inputRef={cellRefs[cellKey]}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const OphthalmologySectionCard = ({
  section,
  onAction,
  getTableProps,
}) => {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerLeft}>
          <div
            className={styles.headerIcon}
            style={{ width: section.iconSize, height: section.iconSize }}
          >
            <div className={styles.iconPlaceholder} />
          </div>
          <div className={styles.headerTitle}>{section.title}</div>
        </div>
        <div className={styles.headerActions}>
          {section.chips?.map((chip) => (
            <div key={chip} className={styles.headerChip}>
              <span className={styles.chipIcon} />
              {chip}
            </div>
          ))}
          {section.actions?.map((action) => (
            <button
              key={action}
              type="button"
              className={styles.headerAction}
              onClick={() => onAction?.(section, action)}
            >
              <span className={styles.actionIcon} />
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* {section.topFields && (
        <div className={styles.topFields}>
          {section.topFields.map((field) => (
            <InlineField key={field.label} field={field} />
          ))}
        </div>
      )} */}

      <div className={styles.tablesStack}>
        {section.tables.map((table) => (
          <OphthalmologyTable
            key={table.id}
            table={table}
            {...(getTableProps ? getTableProps(section, table) : {})}
          />
        ))}
      </div>

      {section.extraFields && (
        <div className={styles.extraFields}>
          {section.extraFields.map((field) => (
            <InlineField key={field.label} field={field} />
          ))}
        </div>
      )}
    </div>
  );
};

const OphthalmologyExamPanel = ({ patientData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { visualAcuity } = useSelector((state) => state.ophthalmologyExam);

  const visualAcuityValues = useMemo(() => {
    const map = {};
    const rows = [
      { key: "od", data: visualAcuity?.od || {} },
      { key: "os", data: visualAcuity?.os || {} },
    ];
    rows.forEach((row) => {
      Object.entries(row.data).forEach(([columnKey, value]) => {
        map[`${row.key}-${columnKey}`] = value ?? "";
      });
    });
    return map;
  }, [visualAcuity]);

  const handleAction = (section, action) => {
    if (section.id === "visualAcuity" && action === "SnapRx") {
      navigate("/ophthal-snap-rx", {
        state: {
          ...location.state,
          patient_data: patientData || location.state?.patient_data,
          returnPath: location.pathname,
          snapRxSchemaKey: "VISUAL_ACUITY_TEST",
        },
      });
      return;
    }

    if (section.id === "visualAcuity" && action === "Clear") {
      dispatch(resetVisualAcuity());
    }
  };

  const getTableProps = (section, table) => {
    if (section.id !== "visualAcuity" || table.id !== "visualAcuityTable") {
      return {};
    }
    return {
      values: visualAcuityValues,
      onChange: (rowKey, columnKey, nextValue) => {
        dispatch(
          updateVisualAcuityField({
            eye: rowKey,
            field: columnKey,
            value: nextValue,
          })
        );
      },
    };
  };

  return (
    <div className={styles.panel}>
      {OPHTHALMOLOGY_SECTIONS.map((section) => (
        <OphthalmologySectionCard
          key={section.id}
          section={section}
          onAction={handleAction}
          getTableProps={getTableProps}
        />
      ))}
    </div>
  );
};

export default OphthalmologyExamPanel;
