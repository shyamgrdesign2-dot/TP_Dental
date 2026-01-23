import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Drawer, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import OphthalmologyExamPanel from "./OphthalmologyExamPanel";
import styles from "./OphthalmologyExamDrawer.module.scss";
import { OPHTHALMOLOGY_SECTIONS } from "../../utils/ophthalmologyExamConstants";
import {
  createOpthalPrescription,
  getOpthalPrescriptionDetails,
  updateOpthalPrescription,
} from "../../pages/ophthalmology/service";
import {
  resetOpthalForm,
  setLastOpthalPrescriptionData,
  setOpthalPrescriptionId,
} from "../../redux/ophthalmologyExamSlice";
import moreIcon from "../../assets/images/more.svg";

const OphthalmologyExamDrawer = ({
  open,
  onClose,
  patientData,
  tcmId,
  title = "Opthal Details",
}) => {
  const dispatch = useDispatch();
  const { visualAcuity, tables, extraFields, opthalPrescriptionId } =
    useSelector((state) => state.ophthalmologyExam);
  const [isSaving, setIsSaving] = useState(false);
  const [loadPrevAllSignal, setLoadPrevAllSignal] = useState(0);
  const [clearAllSignal, setClearAllSignal] = useState(0);

  useEffect(() => {
    if (!tcmId) {
      return;
    }
    let isMounted = true;
    const fetchExisting = async () => {
      try {
        const response = await getOpthalPrescriptionDetails({ tcm_id: tcmId });
        const data = response?.data ?? response;
        const payload = Array.isArray(data) ? data[0] : data;
        if (!isMounted || !payload) {
          return;
        }
        dispatch(setLastOpthalPrescriptionData(payload));
        if (payload?._id) {
          dispatch(setOpthalPrescriptionId(payload._id));
        }
        setLoadPrevAllSignal((prev) => prev + 1);
      } catch (error) {
        console.error("Error fetching opthal prescription details:", error);
      }
    };
    fetchExisting();
    return () => {
      isMounted = false;
    };
  }, [dispatch, tcmId]);

  const tableById = useMemo(() => {
    return OPHTHALMOLOGY_SECTIONS.reduce((acc, section) => {
      section.tables.forEach((table) => {
        acc[table.id] = table;
      });
      return acc;
    }, {});
  }, []);

  const buildEyeRowsPayload = useCallback(
    (tableId, tableValues) => {
      const table = tableById[tableId];
      if (!table) return [];
      return table.rows.map((row) => {
        const rowData = { eye: row.label };
        table.columns.forEach((column) => {
          if (column.type === "label") return;
          const cellKey = `${row.key}-${column.key}`;
          rowData[column.key] = tableValues?.[cellKey] ?? "";
        });
        return rowData;
      });
    },
    [tableById]
  );

  const buildSectionRowsPayload = useCallback(
    (tableId, tableValues) => {
      const table = tableById[tableId];
      if (!table) return [];
      return table.rows.map((row) => {
        const rowData = { section: row.label };
        table.columns.forEach((column) => {
          if (column.type === "label") return;
          const cellKey = `${row.key}-${column.key}`;
          const value = tableValues?.[cellKey] ?? "";
          if (column.key === "od") {
            rowData.OD = value;
          } else if (column.key === "os") {
            rowData.OS = value;
          } else {
            rowData[column.key] = value;
          }
        });
        return rowData;
      });
    },
    [tableById]
  );

  const buildPayload = useCallback(() => {
    const visualAcuityPayload = [
      {
        eye: "OD",
        ...(visualAcuity?.od || {}),
      },
      {
        eye: "OS",
        ...(visualAcuity?.os || {}),
      },
    ];

    const undilated = buildEyeRowsPayload(
      "autoRefractionUndilated",
      tables?.autoRefractionUndilated
    ).map((row) => ({ ...row, type: "Undilated" }));

    const dilated = buildEyeRowsPayload(
      "autoRefractionDilated",
      tables?.autoRefractionDilated
    ).map((row) => ({ ...row, type: "Dilated" }));

    const lensometerValues = buildEyeRowsPayload(
      "lensometerTable",
      tables?.lensometerTable
    );

    const glassPrescription = buildEyeRowsPayload(
      "glassPrescriptionTable",
      tables?.glassPrescriptionTable
    );

    const intraOcularPressure = buildEyeRowsPayload("iopTable", tables?.iopTable).map(
      ({ cct, ...rest }) => ({
        ...rest,
        cc: cct ?? "",
      })
    );

    const slitLampExamination = buildSectionRowsPayload(
      "slitLampTable",
      tables?.slitLampTable
    );

    const fundusExamination = buildSectionRowsPayload(
      "fundusTable",
      tables?.fundusTable
    );

    return {
      tcm_id: tcmId,
      visualAcuity: visualAcuityPayload,
      autoRefraction: [...undilated, ...dilated],
      lensometerValues,
      glassPrescription,
      pd: extraFields?.pd || "",
      intraOcularPressure,
      slitLampExamination,
      fundusExamination,
    };
  }, [
    buildEyeRowsPayload,
    buildSectionRowsPayload,
    extraFields?.pd,
    tables,
    tcmId,
    visualAcuity,
  ]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = buildPayload();
      const response = opthalPrescriptionId
        ? await updateOpthalPrescription(opthalPrescriptionId, payload)
        : await createOpthalPrescription(payload);
      const resolvedId =
        response?._id || response?.data?._id || response?.result?._id || null;
      if (resolvedId && !opthalPrescriptionId) {
        dispatch(setOpthalPrescriptionId(resolvedId));
      }
    } catch (error) {
      console.error("Error saving opthal prescription:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearAll = () => {
    dispatch(resetOpthalForm());
    setClearAllSignal((prev) => prev + 1);
  };

  const menu = {
    items: [
      {
        key: "clearAll",
        label: "Clear All",
      },
    ],
    onClick: ({ key }) => {
      if (key === "clearAll") {
        handleClearAll();
      }
    },
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      closeIcon={false}
      placement="right"
      width="100%"
      className={styles.drawer}
      bodyStyle={{ padding: 0 }}
    >
      <div className={styles.drawerHeader}>
        <button type="button" className={styles.backButton} onClick={onClose}>
          <i className="icon-right text-main"></i>
        </button>
        <div className={styles.drawerTitle}>{title}</div>
        <div className={styles.drawerActions}>
          <button
            type="button"
            className={styles.prevButton}
            onClick={() => setLoadPrevAllSignal((prev) => prev + 1)}
          >
            <i className="icon-reload"></i>
            <span>Prev. Rx</span>
          </button>
          <Button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            loading={isSaving}
          >
            Save
          </Button>
          <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
            <button type="button" className={styles.moreButton}>
              <img src={moreIcon} alt="More" />
            </button>
          </Dropdown>
        </div>
      </div>
      <div className={styles.drawerBody}>
        <OphthalmologyExamPanel
          patientData={patientData}
          enableSectionCollapse
          loadPrevAllSignal={loadPrevAllSignal}
          clearAllSignal={clearAllSignal}
          fetchLastOnMount={false}
        />
      </div>
    </Drawer>
  );
};

export default OphthalmologyExamDrawer;
