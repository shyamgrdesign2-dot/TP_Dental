import React, { useCallback, useEffect, useMemo, useState, useImperativeHandle, forwardRef } from "react";
import {
  Button,
  Card,
  Dropdown,
  Input,
  message,
  Select,
  Spin,
  Table,
} from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { getAbhaConsentList, viewDetailsConsent } from "../../api/services/ApiAbha";
import emptyIllustration from "../../assets/images/no-record-round.svg";
import AbhaLogo from "../../assets/images/abha.svg";
import RequestMedicalRecordsDrawer from "./RequestMedicalRecordsDrawer";

import "./AbhaRecords.scss";

const DATE_TIME_FORMAT = "DD MMM YYYY, hh:mm A";

const formatDateTime = (value) => {
  if (!value || value === "-" || value === "") {
    return "-";
  }
  try {
    return moment(value).local().format(DATE_TIME_FORMAT);
  } catch (error) {
    console.error("Error formatting date:", value, error);
    return "-";
  }
};

const getStatusTone = (status) => {
  if (!status) return "default";
  const normalized = status.toLowerCase();
  if (normalized.includes("grant")) return "success";
  if (normalized.includes("deny") || normalized.includes("revoke"))
    return "danger";
  if (normalized.includes("expire")) return "warning";
  return "info";
};

const defaultPayload = {
  search: "",
  page: 0,
};

const statusOptions = [
  { label: "All Status", value: "ALL" },
  { label: "Pending", value: "pending" },
  { label: "Granted", value: "granted" },
  { label: "Denied / Revoked", value: "denied" },
  { label: "Expired", value: "expired" },
];

const AbhaRecords = forwardRef(({ onConsentCountChange }, ref) => {
  const navigate = useNavigate();
  const [consents, setConsents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortConfig, setSortConfig] = useState({ field: null, order: null });
  const [messageApi, contextHolder] = message.useMessage();
  const [requestRecordsDrawerVisible, setRequestRecordsDrawerVisible] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewLoadingId, setViewLoadingId] = useState(null);

  const fetchConsents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAbhaConsentList(defaultPayload);
      setConsents(response?.consentData || []);
    } catch (err) {
      // On error, set empty array to show empty state
      setConsents([]);
      console.error("Error while fetching ABHA consent list: ", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConsents();
  }, [fetchConsents]);

  useEffect(() => {
    if (typeof onConsentCountChange === "function") {
      onConsentCountChange(consents?.length || 0);
    }
  }, [consents, onConsentCountChange]);

  const handleRequestRecords = () => {
    setRequestRecordsDrawerVisible(true);
  };

  const handleCloseRequestRecordsDrawer = () => {
    setRequestRecordsDrawerVisible(false);
  };

  const handleRequestSuccess = useCallback(
    (payload, responseData) => {
      setRequestRecordsDrawerVisible(false);

      if (payload) {
        setConsents((prev) => {
          const tempId = responseData?.consent_id_request || `temp-${Date.now()}`;
          const newEntry = {
            abha_searched_patient_name: responseData?.patient_name || "-",
            abha_id: responseData?.abha_id || payload?.abha_id,
            hi_types: payload?.patient_health_type || [],
            status: "Consent Requested",
            patient_health_from_date: payload?.health_date_from,
            patient_health_to_date: payload?.health_date_to,
            expired_date: payload?.consent_expiry,
            consent_id_request: tempId,
          };
          return [newEntry, ...prev];
        });
      }

      fetchConsents();
    },
    [fetchConsents]
  );

  const normalizedStatus = (status) => {
    if (!status) return "pending";
    const value = status.toLowerCase();
    if (value.includes("grant")) return "granted";
    if (value.includes("deny") || value.includes("revok")) return "denied";
    if (value.includes("expire")) return "expired";
    return "pending";
  };

  const handleViewConsent = async (record) => {
    const normalized = normalizedStatus(record?.status);
    
    // Only allow view if status is "granted"
    if (normalized !== "granted") {
      messageApi.warning("Only granted consents can be viewed");
      return;
    }

    setViewLoadingId(record?.consent_id_request);
    setViewLoading(true);

    try {
      const response = await viewDetailsConsent(record?.consent_id_request);
      
      if (response?.success && response?.hospitals) {
        // Navigate to health records page with data
        navigate("/abha-records/health-records", {
          state: {
            hospitals: response.hospitals,
            consentId: record?.consent_id_request,
          },
        });
      } else {
        messageApi.error("Failed to fetch consent details");
      }
    } catch (error) {
      console.error("Error viewing consent:", error);
      messageApi.error("Failed to fetch consent details. Please try again.");
    } finally {
      setViewLoading(false);
      setViewLoadingId(null);
    }
  };

  // Expose methods to parent component via ref
  useImperativeHandle(
    ref,
    () => ({
      fetchConsents,
      getLoading: () => loading,
      loading, // Expose current loading value
      handleRequestRecords,
      getConsentCount: () => consents?.length || 0,
    }),
    [fetchConsents, loading, handleRequestRecords, consents]
  );

  const handleRowMenuAction = (action, record) => {
    if (action === "resend") {
      messageApi.success(`Consent ${record?.abha_id || ""} re-requested`);
    }
    if (action === "remove") {
      messageApi.success(`Consent ${record?.abha_id || ""} removed`);
    }
  };

  const getDisplayStatus = (status) => {
    if (!status) return "-";
    const value = status.toLowerCase();
    if (value.includes("grant")) return "accepted";
    if (value.includes("deny")) return "denied";
    if (value.includes("revok")) return "revoked";
    if (value.includes("expire")) return "expired";
    return status; // Return original if no match
  };

  const handleSort = (field, order) => {
    setSortConfig((prev) => {
      if (prev.field === field && prev.order === order) {
        return { field: null, order: null };
      }
      return { field, order };
    });
  };

  const filteredConsents = useMemo(() => {
    let data = [...consents];
    if (searchTerm?.trim()) {
      const term = searchTerm.trim().toLowerCase();
      data = data.filter((item) =>
        (item?.abha_id || "").toLowerCase().includes(term)
      );
    }
    if (statusFilter !== "ALL") {
      data = data.filter(
        (item) => normalizedStatus(item?.status) === statusFilter
      );
    }
    if (sortConfig.field && sortConfig.order) {
      const getValue = (item) => {
        switch (sortConfig.field) {
          case "requested_on":
            return item?.patient_health_from_date;
          case "last_updated_on":
            return item?.patient_health_to_date;
          case "expires_on":
            return item?.expired_date;
          default:
            return null;
        }
      };
      data.sort((a, b) => {
        const valueA = getValue(a);
        const valueB = getValue(b);
        const dateA = valueA ? new Date(valueA).getTime() : 0;
        const dateB = valueB ? new Date(valueB).getTime() : 0;
        if (dateA === dateB) return 0;
        return sortConfig.order === "asc"
          ? dateA - dateB
          : dateB - dateA;
      });
    }
    return data;
  }, [consents, searchTerm, statusFilter, sortConfig]);

  const displayAbhaId =
    filteredConsents?.[0]?.abha_id || consents?.[0]?.abha_id || "-";

  const columns = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "row_number",
        key: "row_number",
        width: 10,
        render: (_, __, index) => index + 1,
      },
      {
        title: "Consent ID",
        dataIndex: "consent_id_request",
        key: "consent_id_request",
        width: 180,
        render: (value) => value || "-",
      },
      {
        title: (
          <div className="abha-records__column-header">
            <span>Requested On</span>
            <div className="abha-records__sort-actions">
              <button
                type="button"
                className={`sort-icon ${sortConfig.field === "requested_on" && sortConfig.order === "asc" ? "active" : ""}`}
                onClick={() => handleSort("requested_on", "asc")}
              >
                ▲
              </button>
              <button
                type="button"
                className={`sort-icon ${sortConfig.field === "requested_on" && sortConfig.order === "desc" ? "active" : ""}`}
                onClick={() => handleSort("requested_on", "desc")}
              >
                ▼
              </button>
            </div>
          </div>
        ),
        dataIndex: "patient_health_from_date",
        key: "requested_on",
        width: 10,
        render: (value) => (
          <div className="abha-records__date-cell">
            <div>{formatDateTime(value)?.split(",")[0]}</div>
            <small>{formatDateTime(value)?.split(",")[1]}</small>
          </div>
        ),
      },
      {
        title: (
          <div className="abha-records__column-header">
            <span>Last Updated On</span>
            <div className="abha-records__sort-actions">
              <button
                type="button"
                className={`sort-icon ${sortConfig.field === "last_updated_on" && sortConfig.order === "asc" ? "active" : ""}`}
                onClick={() => handleSort("last_updated_on", "asc")}
              >
                ▲
              </button>
              <button
                type="button"
                className={`sort-icon ${sortConfig.field === "last_updated_on" && sortConfig.order === "desc" ? "active" : ""}`}
                onClick={() => handleSort("last_updated_on", "desc")}
              >
                ▼
              </button>
            </div>
          </div>
        ),
        dataIndex: "patient_health_to_date",
        key: "last_updated_on",
        width: 10,
        render: (value) => (
          <div className="abha-records__date-cell">
            <div>{formatDateTime(value)?.split(",")[0]}</div>
            <small>{formatDateTime(value)?.split(",")[1]}</small>
          </div>
        ),
      },
      {
        title: "Shared For",
        dataIndex: "hi_types",
        key: "hi_types",
        width: 10,
        render: (value) => (
          <span className="abha-records__shared">
            {Array.isArray(value) && value.length ? value.join(", ") : "-"}
          </span>
        ),
      },
      {
        title: (
          <div className="abha-records__column-header">
            <span>Expires In</span>
            <div className="abha-records__sort-actions">
              <button
                type="button"
                className={`sort-icon ${sortConfig.field === "expires_on" && sortConfig.order === "asc" ? "active" : ""}`}
                onClick={() => handleSort("expires_on", "asc")}
              >
                ▲
              </button>
              <button
                type="button"
                className={`sort-icon ${sortConfig.field === "expires_on" && sortConfig.order === "desc" ? "active" : ""}`}
                onClick={() => handleSort("expires_on", "desc")}
              >
                ▼
              </button>
            </div>
          </div>
        ),
        dataIndex: "expired_date",
        key: "expires_on",
        width: 10,
        render: formatDateTime,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 10,
        render: (value) => (
          <span
            className={`abha-records__status abha-records__status--${normalizedStatus(
              value
            )}`}
          >
            {getDisplayStatus(value)}
          </span>
        ),
      },
      {
        title: "Action",
        key: "action",
        width: 10,
        render: (_, record) => {
          const normalized = normalizedStatus(record?.status);
          const items = [
            {
              key: "resend",
              label: "Resend Request",
            },
            {
              key: "remove",
              label: "Remove",
            },
          ];
          const menu = {
            items,
            onClick: ({ key }) => handleRowMenuAction(key, record),
          };
          return (
            <div className="abha-records__action-cell">
              <Button
                className="abha-records__view-btn"
                disabled={normalized !== "granted"}
                onClick={() => handleViewConsent(record)}
                loading={viewLoading && viewLoadingId === record?.consent_id_request}
              >
                View
              </Button>
              <Dropdown
                menu={menu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <button type="button" className="abha-records__more-btn">
                  <i className="icon-More" />
                </button>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [sortConfig]
  );

  const hasData = filteredConsents?.length > 0;

  return (
    <>
      {contextHolder}
      <div className="appointment-wrap PatientDetailswrap m-0 abha-records">
        <Card className="abha-records__card" bodyStyle={{ padding: 0 }}>
          <div className="abha-records__card-body">
            <div className="abha-records__header-row">
              <div className="abha-records__actions">
              </div>
            </div>

            <div className="abha-records__filters">
              <div className="abha-records__filters-main">
                <Input
                  placeholder="Search by Consent ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  allowClear
                  prefix={<i className="icon-search" />}
                  className="abha-records__search abha-records__search--narrow"
                />
                <Select
                  className="abha-records__status-filter"
                  options={statusOptions}
                  value={statusFilter}
                  onChange={setStatusFilter}
                />
              </div>
              <div className="abha-records__abha-pill">
                <img src={AbhaLogo} alt="ABHA logo" />
                <span>{displayAbhaId}</span>
              </div>
            </div>

            {loading ? (
              <div className="abha-records__empty-state">
                <Spin size="large" />
              </div>
            ) : hasData ? (
              <div className="abha-records__table-wrapper">
                <Table
                  dataSource={filteredConsents}
                  columns={columns}
                  pagination={false}
                  rowKey={(record, index) =>
                    record?.consent_id_request ||
                    record?.abha_id ||
                    `${record?.abha_searched_patient_name || "consent"}-${index}`
                  }
                  scroll={{ x: 1200 }}
                  className="abha-records__table"
                  size="middle"
                />
              </div>
            ) : (
              <div className="abha-records__empty-message">
                <div>
                  <img
                    src={emptyIllustration}
                    height={300}
                    width={400}
                    alt="No Records Found"
                  />
                </div>
                <div>
                  <div className="fontroboto text-main title-common" style={{ fontSize: "20px" }}>
                    No Records Found!
                  </div>
                  <div className="fontroboto text-main" style={{ fontSize: "14px", marginTop: "8px" }}>
                    The patient has not shared any ABHA consents yet.
                  </div>
                </div>
                <Button
                  className="btn btn-primary3 btn-text-white px-5 btn-41"
                  onClick={fetchConsents}
                >
                  <i className="icon-reload me-2" />
                  Refresh
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
      <RequestMedicalRecordsDrawer
        visible={requestRecordsDrawerVisible}
        onClose={handleCloseRequestRecordsDrawer}
        onSuccess={handleRequestSuccess}
      />
    </>
  );
});

AbhaRecords.displayName = 'AbhaRecords';

export default AbhaRecords;

