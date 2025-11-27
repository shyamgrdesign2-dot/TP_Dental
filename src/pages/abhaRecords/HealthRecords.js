import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Table, message, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ViewRecordsDrawer from "./ViewRecordsDrawer";
import "./HealthRecords.scss";

const HealthRecords = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hospitals, consentId } = location.state || {};
  const [messageApi, contextHolder] = message.useMessage();
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    if (!hospitals || !Array.isArray(hospitals)) {
      messageApi.error("Invalid data. Redirecting...");
      setTimeout(() => navigate("/patient_details"), 2000);
    }
  }, [hospitals, navigate, messageApi]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 50,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Facility Name",
      dataIndex: "hospitalName",
      key: "hospitalName",
      render: (value) => value || "-",
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "right",
      render: (_, record) => {
        const recordCount = record?.records?.length || 0;
        const buttonText = recordCount > 1 ? "View Records" : "View Record";
        
        return (
          <Button
            type="default"
            className="health-records__view-btn"
            onClick={() => handleViewRecord(record)}
          >
            {buttonText}
          </Button>
        );
      },
    },
  ];

  const handleViewRecord = (record) => {
    if (!record?.records || record.records.length === 0) {
      messageApi.warning("No records available for this facility");
      return;
    }
    setSelectedRecord(record);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedRecord(null);
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Filter hospitals based on search term
  const filteredHospitals = hospitals?.filter((hospital) =>
    hospital?.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (!hospitals || !Array.isArray(hospitals)) {
    return (
      <div className="appointment-wrap PatientDetailswrap m-0">
        <div className="health-records__loading">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="appointment-wrap PatientDetailswrap m-0 health-records">
        {/* Yellow Hero Section */}
        <div className="health-records__hero">
          <div className="health-records__hero-content">
            <Button
              type="text"
              className="health-records__back-btn"
              onClick={handleBack}
              icon={<i className="icon-right" />}
            >
            </Button>
            <h1 className="health-records__title">Health Records</h1>
          </div>
        </div>

        {/* Main Card */}
        <Card className="health-records__card" bodyStyle={{ padding: 0 }}>
          <div className="health-records__card-body">
            {/* Search Box */}
            <div className="health-records__search-wrapper">
              <Input
                className="health-records__search-input"
                placeholder="Search by Patient Reference"
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
            </div>
            
            <div className="health-records__table-wrapper">
              <Table
                dataSource={filteredHospitals}
                columns={columns}
                pagination={false}
                rowKey={(record, index) =>
                  record?.hospitalName || `hospital-${index}`
                }
                className="health-records__table"
                size="middle"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* View Records Drawer */}
      <ViewRecordsDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        record={selectedRecord}
        consentId={consentId}
      />
    </>
  );
};

export default HealthRecords;

