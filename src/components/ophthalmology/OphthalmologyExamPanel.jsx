import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AutoComplete, Collapse, Dropdown, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./OphthalmologyExamPanel.module.scss";
import {
  OPHTHALMOLOGY_OPTIONS,
  OPHTHALMOLOGY_SECTIONS,
} from "../../utils/ophthalmologyExamConstants";
import visualAcuityIcon from "../../assets/images/visual-acuity-test.svg";
import autoRefractionIcon from "../../assets/images/auto-refraction-test.svg";
import lensometerIcon from "../../assets/images/lensometer-values.svg";
import glassPrescriptionIcon from "../../assets/images/glass-prescription.svg";
import iopIcon from "../../assets/images/intra-ocular-pressure.svg";
import slitLampIcon from "../../assets/images/slit-lamp-examination.svg";
import fundusIcon from "../../assets/images/fundus-examination.svg";
import autoFillBlueIcon from "../../assets/images/autoFillBlue.svg";
import opthalIcon from "../../assets/images/opthalIcon.svg";
import arrowDownIcon from "../../assets/images/arrow-box-down.svg";
import autofillArrowIcon from "../../assets/images/down-arrow-blue.svg";
import {
  resetVisualAcuity,
  updateVisualAcuityField,
  setTableValue,
  setTableValues as setOpthalTableValues,
  resetTable,
  setExtraField,
  resetExtraField,
} from "../../redux/ophthalmologyExamSlice";

const SECTION_ICONS = {
  visualAcuity: visualAcuityIcon,
  autoRefraction: autoRefractionIcon,
  lensometerValues: lensometerIcon,
  glassPrescription: glassPrescriptionIcon,
  iop: iopIcon,
  slitLamp: slitLampIcon,
  fundus: fundusIcon,
};

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

const InlineField = ({ field, value, onChange }) => {
  const options = field.optionsKey
    ? resolveOptionsKey(field.optionsKey)
    : field.options || [];

  if (field.variant === "inlineRow") {
    return (
      <div className={styles.inlineRowField}>
        <div className={styles.inlineRowLabel}>
          {field.shortLabel || field.label}
        </div>
        <div className={styles.inlineRowInput}>
          <DropdownInput
            value={value}
            placeholder={field.placeholder}
            options={options}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.inlineField}>
      <div className={styles.inlineLabel}>{field.label}</div>
      <DropdownInput
        value={value}
        placeholder={field.placeholder}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

const OphthalmologyTable = ({
  table,
  values: externalValues,
  onChange,
  resetKey,
}) => {
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

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues, resetKey]);

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
  autofillMenu,
  extraFieldValues,
  onExtraFieldChange,
}) => {
  const iconSrc = SECTION_ICONS[section.id];

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerLeft}>
          <div
            className={styles.headerIcon}
            style={{ width: section.iconSize, height: section.iconSize }}
          >
            {iconSrc ? (
              <img
                src={iconSrc}
                alt={`${section.title} icon`}
                className={styles.headerIconImage}
              />
            ) : (
              <div className={styles.iconPlaceholder} />
            )}
          </div>
          <div className={styles.headerTitle}>{section.title}</div>
        </div>
        <div className={styles.headerActions}>
          {section.chips?.map((chip) => (
            chip === "Autofill" ? (
              <Dropdown
                key={chip}
                menu={autofillMenu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <button type="button" className={styles.headerChipButton}>
                  <img
                    src={autoFillBlueIcon}
                    alt=""
                    className={styles.chipIconImage}
                  />
                  <span>{chip}</span>
                  <img
                    src={autofillArrowIcon}
                    alt=""
                    className={styles.chipArrowIcon}
                  />
                </button>
              </Dropdown>
            ) : (
              <div key={chip} className={styles.headerChip}>
                <span className={styles.chipIcon} />
                {chip}
              </div>
            )
          ))}
          {section.actions?.map((action) => (
            <button
              key={action}
              type="button"
              className={styles.headerAction}
              onClick={() => onAction?.(section, action)}
            >
              {action === "Load from Prev" ? (
                <>
                  <i className="icon-reload"></i>
                  <span>Load from Prev</span>
                </>
              ) : action === "Clear" ? (
                <>
                  <i className="icon-eraser1"></i>
                  <span>Clear</span>
                </>
              ) : action === "Templates" ? (
                <>
                  <i className="icon-template"></i>
                  <span>Templates</span>
                </>
              ) : action === "Save" ? (
                <>
                  <i className="icon-save"></i>
                  <span>Save</span>
                </>
              ) : (
                <>
                  <span className={styles.actionIcon} />
                  {action}
                </>
              )}
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
            <InlineField
              key={field.label}
              field={field}
              value={extraFieldValues?.[field.key] || ""}
              onChange={(nextValue) =>
                onExtraFieldChange?.(field.key, nextValue)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

const OphthalmologyExamPanel = ({
  patientData,
  showHeader = false,
  headerTitle = "Opthal",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { visualAcuity, tables, extraFields } = useSelector(
    (state) => state.ophthalmologyExam
  );
  const [tableResets, setTableResets] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);
  const glassPrescriptionTableId = "glassPrescriptionTable";
  const sourceTableIds = useMemo(
    () => ({
      undilated: "autoRefractionUndilated",
      dilated: "autoRefractionDilated",
      lensometer: "lensometerTable",
    }),
    []
  );

  const buildEmptyTableValues = useCallback((table) => {
    const nextValues = {};
    table.rows.forEach((row) => {
      table.columns.forEach((column) => {
        if (column.type === "label") {
          return;
        }
        nextValues[`${row.key}-${column.key}`] = "";
      });
    });
    return nextValues;
  }, []);

  const initialTableValues = useMemo(() => {
    const values = {};
    OPHTHALMOLOGY_SECTIONS.forEach((section) => {
      section.tables.forEach((table) => {
        if (table.id === "visualAcuityTable") {
          return;
        }
        values[table.id] = buildEmptyTableValues(table);
      });
    });
    return values;
  }, [buildEmptyTableValues]);

  const [tableValues, setLocalTableValues] = useState(initialTableValues);

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

    if (action === "Clear") {
      if (section.tables?.length) {
        setLocalTableValues((prev) => {
          const next = { ...prev };
          section.tables.forEach((table) => {
            if (initialTableValues[table.id]) {
              next[table.id] = { ...initialTableValues[table.id] };
            }
          });
          return next;
        });
        section.tables.forEach((table) => {
          dispatch(resetTable({ tableId: table.id }));
        });
      }
      if (section.extraFields?.length) {
        section.extraFields.forEach((field) => {
          if (field.key) {
            dispatch(resetExtraField({ key: field.key }));
          }
        });
      }
      setTableResets((prev) => ({
        ...prev,
        [section.id]: (prev[section.id] || 0) + 1,
      }));
    }
  };

  const getTableProps = (section, table) => {
    const baseProps = {
      resetKey: tableResets[section.id] || 0,
    };
    if (section.id !== "visualAcuity" || table.id !== "visualAcuityTable") {
      if (tableValues[table.id]) {
        return {
          ...baseProps,
          values: tableValues[table.id],
          onChange: (rowKey, columnKey, nextValue) => {
            setLocalTableValues((prev) => ({
              ...prev,
              [table.id]: {
                ...prev[table.id],
                [`${rowKey}-${columnKey}`]: nextValue,
              },
            }));
            dispatch(
              setTableValue({
                tableId: table.id,
                cellKey: `${rowKey}-${columnKey}`,
                value: nextValue,
              })
            );
          },
        };
      }
      return baseProps;
    }
    return {
      ...baseProps,
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

  const handleAutofill = (sourceTableId) => {
    const sourceValues = tableValues[sourceTableId];
    if (!sourceValues || !tableValues[glassPrescriptionTableId]) {
      return;
    }
    const allowedKeys = new Set([
      "sphere",
      "cylinder",
      "axis",
      "add",
      "distance",
      "near",
    ]);
    const nextGlassValues = { ...tableValues[glassPrescriptionTableId] };
    Object.entries(sourceValues).forEach(([cellKey, value]) => {
      const columnKey = cellKey.split("-")[1];
      if (allowedKeys.has(columnKey)) {
        nextGlassValues[cellKey] = value || "";
      }
    });
    setLocalTableValues((prev) => ({
      ...prev,
      [glassPrescriptionTableId]: nextGlassValues,
    }));
    dispatch(
      setOpthalTableValues({
        tableId: glassPrescriptionTableId,
        values: nextGlassValues,
      })
    );
  };

  const autofillMenu = {
    items: [
      {
        key: sourceTableIds.undilated,
        label: "Auto Refraction Test - Undilated",
      },
      {
        key: sourceTableIds.dilated,
        label: "Auto Refraction Test - Dilated",
      },
      {
        key: sourceTableIds.lensometer,
        label: "Lensometer Values",
      },
    ],
    onClick: ({ key }) => handleAutofill(key),
  };

  const sectionsContent = (
    <div className={styles.panel}>
      {OPHTHALMOLOGY_SECTIONS.map((section) => (
        <OphthalmologySectionCard
          key={section.id}
          section={section}
          onAction={handleAction}
          getTableProps={getTableProps}
          autofillMenu={autofillMenu}
          extraFieldValues={extraFields}
          onExtraFieldChange={(fieldKey, nextValue) =>
            dispatch(setExtraField({ key: fieldKey, value: nextValue }))
          }
        />
      ))}
    </div>
  );

  if (!showHeader) {
    return sectionsContent;
  }

  return (
    <Collapse
      className={styles.panelCollapse}
      activeKey={isExpanded ? ["opthal"] : []}
      expandIcon={() => null}
      showArrow={false}
      items={[
        {
          key: "opthal",
          label: (
            <div className={styles.panelHeader}>
              <div className={styles.panelHeaderLeft}>
                <img
                  src={opthalIcon}
                  alt=""
                  className={styles.panelHeaderIcon}
                />
                <div className={styles.panelHeaderTitle}>{headerTitle}</div>
              </div>
              <button
                type="button"
                className={styles.panelHeaderAction}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsExpanded((prev) => !prev);
                }}
              >
                <img
                  src={arrowDownIcon}
                  alt=""
                  className={`${styles.panelHeaderArrow} ${
                    isExpanded ? styles.panelHeaderArrowOpen : ""
                  }`}
                />
              </button>
            </div>
          ),
          children: sectionsContent,
        },
      ]}
    />
  );
};

export default OphthalmologyExamPanel;
