import React, { useState, useEffect } from "react";
import { Drawer, Button, Spin, message } from "antd";
import arrowBoxIcon from "../../assets/images/arrow-box-right 2.svg";
import { viewConsentRecord } from "../../api/services/ApiAbha";
import "./ViewRecordsDrawer.scss";

// SVG Icons for cards (stylized pill and flower)
const PrescriptionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2L9.5 4.5L12 5L9.5 5.5L8 8L6.5 5.5L4 5L6.5 4.5L8 2Z" fill="#A461D8"/>
    <path d="M4 10L6 12L8 10M8 10L10 12L12 10M8 10V14" stroke="#A461D8" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ConditionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" fill="#A461D8" fillOpacity="0.2"/>
    <path d="M8 4L8.8 6.8L11.6 7.6L8.8 8.4L8 11.2L7.2 8.4L4.4 7.6L7.2 6.8L8 4Z" fill="#A461D8"/>
  </svg>
);

const ViewRecordsDrawer = ({ visible, onClose, record, consentId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordDetails, setRecordDetails] = useState(null);
  const [loadingRecord, setLoadingRecord] = useState(false);

  const records = record?.records || [];
  const totalRecords = records.length;
  const currentRecord = records[currentIndex] || null;
  const currentRecordId = currentRecord?.recordId || currentRecord?.request_id;

  useEffect(() => {
    if (visible && records.length > 0) {
      setCurrentIndex(0);
      setRecordDetails(null);
    }
  }, [visible, record, records.length]);

  useEffect(() => {
    if (!visible) {
      setRecordDetails(null);
      setLoadingRecord(false);
      return;
    }

    if (!consentId || !currentRecordId) {
      setRecordDetails(null);
      return;
    }

    let shouldUpdate = true;

    const fetchRecord = async () => {
      setLoadingRecord(true);
      try {
        const response = await viewConsentRecord(consentId, currentRecordId);
        if (!shouldUpdate) return;
        if (response?.success && response?.consentRecord) {
          setRecordDetails(response.consentRecord);
        } else {
          setRecordDetails(null);
          message.error(
            response?.message || "Unable to fetch consent record details"
          );
        }
      } catch (error) {
        if (shouldUpdate) {
          console.error("Failed to fetch consent record:", error);
          setRecordDetails(null);
          message.error("Failed to fetch consent record. Please try again.");
        }
      } finally {
        if (shouldUpdate) {
          setLoadingRecord(false);
        }
      }
    };

    fetchRecord();

    return () => {
      shouldUpdate = false;
    };
  }, [visible, consentId, currentRecordId]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalRecords - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleClose = () => {
    setCurrentIndex(0);
    setRecordDetails(null);
    onClose();
  };

  const formatRecordNumber = (num) => {
    return String(num).padStart(2, "0");
  };

  return (
    <Drawer
      closeIcon={false}
      placement="right"
      open={visible}
      onClose={handleClose}
      width={700}
      className="view-records-drawer"
      styles={{
        body: {
          padding: 0,
          backgroundColor: "#fff",
          height: "983px",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <div className="view-records-drawer-content">
        {/* Header */}
        <div className="view-records-drawer__header">
          <div className="view-records-drawer__header-left">
            <Button
              type="text"
              className="view-records-drawer__back-btn"
              onClick={handleClose}
            >
              <i className="icon-Cross fs-3"></i>
            </Button>
            <div className="view-records-drawer__title">Records</div>
          </div>
        </div>

        {/* Navigation */}
        {totalRecords > 0 && (
          <div className="view-records-drawer__navigation">
            <Button
              type="text"
              className="view-records-drawer__nav-btn"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <img src={arrowBoxIcon} alt="Next" className="view-records-drawer__nav-icon view-records-drawer__nav-icon--right" />
            </Button>
            <span className="view-records-drawer__counter">
              {formatRecordNumber(currentIndex + 1)}/{formatRecordNumber(totalRecords)}
            </span>
            <Button
              type="text"
              className="view-records-drawer__nav-btn"
              onClick={handleNext}
              disabled={currentIndex === totalRecords - 1}
            >
              <img src={arrowBoxIcon} alt="Previous" className="view-records-drawer__nav-icon view-records-drawer__nav-icon--left" />
            </Button>
          </div>
        )}

        {/* Content */}
        <div className="view-records-drawer__body">
          {loadingRecord ? (
            <div className="view-records-drawer__loading">
              <Spin />
            </div>
          ) : currentRecord && recordDetails ? (
            <div className="view-records-drawer__content">
              {/* Record ID Display */}
              <div className="view-records-drawer__info-section">
                <div className="view-records-drawer__info-row">
                  <div className="view-records-drawer__info-column">
                    <div className="view-records-drawer__info-label">Record ID:</div>
                    <div className="view-records-drawer__info-value">
                      {currentRecordId || "-"}
                    </div>
                  </div>
                </div>
                <div className="view-records-drawer__info-row">
                  <div className="view-records-drawer__info-column">
                    <div className="view-records-drawer__info-label">Facility Name:</div>
                    <div className="view-records-drawer__info-value">
                      {record?.hospitalName || "-"}
                    </div>
                  </div>
                </div>
              </div>

              {recordDetails?.patient_info && (
                <div className="view-records-drawer__card">
                  <div className="view-records-drawer__card-header">
                    <span className="view-records-drawer__card-title">Patient Information</span>
                  </div>
                  <div className="view-records-drawer__info-row view-records-drawer__info-row--grid">
                    {[
                      ["Patient ID", recordDetails.patient_info.id],
                      ["Name", recordDetails.patient_info.name],
                      ["Gender", recordDetails.patient_info.gender],
                      ["Birth Date", recordDetails.patient_info.birthDate],
                      ["Phone", recordDetails.patient_info.phone],
                      ["Address", recordDetails.patient_info.address],
                    ].map(([label, value]) => (
                      <div className="view-records-drawer__info-column" key={label}>
                        <div className="view-records-drawer__info-label">{label}</div>
                        <div className="view-records-drawer__info-value">{value || "-"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {renderArraySection("Symptoms", recordDetails?.symptoms)}
              {renderArraySection("Medicines", recordDetails?.medicines)}
              {renderArraySection("Investigations", recordDetails?.investigations)}
              {renderArraySection("Diagnosis", recordDetails?.diagnosis)}
              {renderArraySection("Procedures", recordDetails?.procedures)}
              {renderArraySection("Documents", recordDetails?.documents)}
              {renderArraySection("Other Examinations", recordDetails?.other_examinations)}
              {renderArraySection("Vital Signs", recordDetails?.examination?.vital_signs)}
              {renderArraySection(
                "Clinical Findings",
                recordDetails?.examination?.clinical_findings
              )}
            </div>
          ) : (
            <div className="view-records-drawer__empty">
              No record data available
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

const renderArraySection = (title, data) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div className="view-records-drawer__card">
      <div className="view-records-drawer__card-header">
        <span className="view-records-drawer__card-title">{title}</span>
      </div>
      <div className="view-records-drawer__card-content">
        <ul className="view-records-drawer__list">
          {data.map((item, index) => (
            <li key={`${title}-${index}`}>
              {typeof item === "object" && item !== null
                ? Object.entries(item).map(([key, value]) => (
                    <div key={key} className="view-records-drawer__list-row">
                      <strong>{formatLabel(key)}:</strong>&nbsp;
                      <span>{formatValue(value)}</span>
                    </div>
                  ))
                : formatValue(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const formatLabel = (value = "") =>
  value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());

const formatValue = (value) => {
  if (Array.isArray(value)) {
    if (!value.length) return "-";
    return value
      .map((entry) =>
        typeof entry === "object" && entry !== null
          ? Object.values(entry).filter(Boolean).join(", ")
          : entry
      )
      .join("; ");
  }

  if (typeof value === "object" && value !== null) {
    return Object.entries(value)
      .map(([key, nestedValue]) => `${formatLabel(key)}: ${formatValue(nestedValue)}`)
      .join(", ");
  }

  return value || "-";
};

export default ViewRecordsDrawer;

