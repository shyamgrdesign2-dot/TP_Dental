import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import { isMobile } from "react-device-detect";
import { jwtDecode } from "jwt-decode";
// import { errorMessage } from "../utils/utils";
import Card from "react-bootstrap/Card";
import api from "../api/services/axiosService";
import writtenRxIcon from "../assets/images/written-rx.svg";
import digitiseRxIcon from "../assets/images/digitise-rx.svg";
import cvtInfoIcon from "../assets/images/cvt-info.svg";
import { FETCH_SMART_RX, S_RX_DIGITIZATION } from "../utils/constants";
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { env } from "../EnvironmentConfig";
import { getInvestigationAndMedicine } from "../redux/caseManagerSlice";
import { placeIctOrder } from "../redux/appointmentsSlice";
import { getTokenData } from "../utils/utils";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { GB_ZYDUS_USER } from "../utils/constants";
import HeaderSmartRxDigitise from "../common/HeaderSmartRxDigitise";
import DigitisedPrescription from "../components/DigitisedPrescription";
import axios from "axios";
import { updateCredits } from "../redux/monetizationSlice";
import ApiMedication from "../api/services/ApiMedication";

function SmartRxDigitise() {
  const divRef = useRef(null);
  const splitRef = useRef(null);
  const isResizingRef = useRef(false);
  const [leftWidthPercent, setLeftWidthPercent] = useState(50);

  const { profile, siteId, storeCode } = useSelector((state) => state.doctors);
  const { loading } = useSelector((state) => state.caseManager);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const {
    patient_data,
    smartRxFilesData,
    tcm_id,
    print_url,
    digitisedData,
    pam_id,
    isCustomSSRX,
  } = state;

  const [printUrl, setPrintUrl] = useState(
    state !== undefined ? `${state.print_url}` : null
  );
  const [token, setToken] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [divWidth, setDivWidth] = useState(0);
  const [data, setData] = useState(null);
  const [isDigitiseRxSubmit, setIsDigitiseRxSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [smartRxFile, setSmartRxFile] = useState(smartRxFilesData);
  const isZydusUserAccessableFromGB = useFeatureIsOn(GB_ZYDUS_USER);
  // Grounding check (Zydus users)
  const tokenDataLocal = getTokenData();
  const isGroundingAccessable =
    tokenDataLocal?.hospital_business_id == env.zydus_business_id &&
    isZydusUserAccessableFromGB;

  const baseUrlRxDigitise = env.rx_digitization;

  // Ensure medications default edited flag is present
  const normalizeEditedFlag = useCallback((src) => {
    if (!src || typeof src !== "object") return src;
    const meds = Array.isArray(src.medications) ? src.medications : [];
    return {
      ...src,
      medications: meds.map((m) => ({ ...m, edited: m?.edited ?? false })),
    };
  }, []);

  useEffect(() => {
    setDivWidth(divRef.current?.offsetWidth);
  }, [divRef]);

  const onMouseMoveResizer = useCallback((e) => {
    if (!isResizingRef.current || !splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const pct = (relativeX / rect.width) * 100;
    const clamped = Math.min(75, Math.max(25, pct));
    setLeftWidthPercent(clamped);
  }, []);

  const stopResizing = useCallback(() => {
    if (!isResizingRef.current) return;
    isResizingRef.current = false;
    document.removeEventListener("mousemove", onMouseMoveResizer);
    document.removeEventListener("mouseup", stopResizing);
  }, [onMouseMoveResizer]);

  const startResizing = useCallback(() => {
    isResizingRef.current = true;
    document.addEventListener("mousemove", onMouseMoveResizer);
    document.addEventListener("mouseup", stopResizing);
  }, [onMouseMoveResizer, stopResizing]);

  useEffect(() => {
    if (smartRxFile?.length > 0 && token && state.type === "new") {
      uploadFiles();
    } else if (state.type === "edit" && digitisedData) {
      uploadFiles();
    }
  }, [token, smartRxFile, digitisedData]);

  useEffect(() => {
    const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
    setToken(token);
    if (token) {
      try {
        var decoded = jwtDecode(token);
        setTokenData(decoded.result);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSave = async () => {
    try {
      const cleanedToken = token.replace(/['"]+/g, "");

      const payload = {
        isDigitize: true,
        editedData: {
          ...data,
        },
      };

      // API call to save the data
      const response = await axios.patch(
        `${baseUrlRxDigitise}/api/v1/rxdigitize/rx/${tcm_id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanedToken}`,
          },
        }
      );

      // Handle navigation based on the API response
      if (response.status === 204) {
          if (isGroundingAccessable && patient_data?.departmentId) {
          let sendInvestigationAndMedicine = {
            patient_unique_id:
              patient_data !== undefined ? patient_data.patient_unique_id : 0,
            tcm_id: tcm_id,
          };
          const actionIM = await dispatch(
            getInvestigationAndMedicine(sendInvestigationAndMedicine)
          );
          if (actionIM.meta.requestStatus === "fulfilled") {
            const quantityActionMedicine = await ApiMedication.getQuantity({
              medicines: data?.medications,
            });
            let zydusSendData = {
              action: tcm_id == 0 ? "add" : "edit",
              tcmId: tcm_id,
              siteId: siteId,
              departmentId: patient_data?.departmentId,
              visitId: patient_data?.visitId,
              encounterId: patient_data?.encounterId,
              mrno: patient_data?.mrno,
              doctorCode: patient_data?.employeeId,
              storeCode: storeCode,
              duplicateCheck: 1,
              investigationList:
                actionIM?.payload?.investigation?.map(
                  (item) => item.investigation_name
                ) || [],
              medicineList:
                (data?.medications || []).map(({ name, notes }, index) => ({
                  name: name,
                  quantity:
                    quantityActionMedicine?.medicines?.[index]?.quantity,
                  instruction: notes,
                })) || [],
              pillupSwitch: 0,
            };
            await dispatch(placeIctOrder(zydusSendData));
          }
        }

        let sendData = {
          b2c_id: profile?.b2c,
          service_name: S_RX_DIGITIZATION,
        };
        dispatch(updateCredits(sendData));
        if (
          state?.page === "patient-summary" ||
          state?.page === "pending-digitization"
        ) {
          navigate(-1); // Go back to the previous page
        } else {
          navigate("/print-smart-rx", {
            replace: true,
            state: {
              patient_data,
              smartRxData: smartRxFilesData,
              tcm_id,
              pam_id: pam_id || patient_data?.pam_id,
              print_url,
              showProgressbar: false,
              page: "digitise",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const fetchImageAsFile = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const uploadFiles = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Convert images to File objects and append to FormData
      const files = await Promise.all(
        smartRxFile.map(async (file) => {
          const fileUrl = file.smart_prescription_file;
          const fileName = file.smart_prescription_filename;
          return await fetchImageAsFile(fileUrl, fileName);
        })
      );

      files.forEach((file) => {
        if (file) {
          formData.append("files", file);
        }
      });

      // Append other required fields
      formData.append("doctorId", tokenData.user_id);
      formData.append("patientId", patient_data.patient_unique_id);
      formData.append("appointmentId", pam_id || patient_data?.pam_id);
      formData.append("caseId", tcm_id);

      // Append ocrModelSelected only if isCustomSSRX is true
      if (isCustomSSRX) {
        formData.append("ocrModelSelected", "zyvelor");
      }

      const cleanedToken = token.replace(/['"]+/g, "");
      const response = await axios.post(
        `${baseUrlRxDigitise}/api/v1/rxdigitize/rx`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cleanedToken}`,
          },
        }
      );

      // Update the digitized data
      if (response?.data?.data) {
        setData(
          isGroundingAccessable
            ? normalizeEditedFlag(response.data.data.refinedData)
            : response.data.data.refinedData
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <>
      <HeaderSmartRxDigitise
        onSave={handleSave}
        patient_data={patient_data}
        tcm_id={tcm_id}
      />
      <div className="cvt-info">
        <img src={cvtInfoIcon} alt="cvt-info-icon" className="me-2" />
        <span className="cvt-info-text">
          <span className="title-common">Disclaimer:</span> Our AI model aims to
          be accurate, but sometimes it might make mistakes. Please double-check
          all details to ensure they are correct and complete.
        </span>
        <i className="icon-Cross ms-1 fs-18" style={{ color: "#FEF4E6" }}></i>
      </div>
      <div
        ref={splitRef}
        className={`${
          isMobile ? "p-0" : ""
        } w-100 bg-body wrapper2 prescription-wrapper`}
        style={{ position: "relative" }}
      >
        <Row gutter={{ xl: 40, lg: 0 }} justify="center" wrap={false}>
          <Col
            md={17}
            lg={17}
            xl={12}
            style={{
              flex: `0 0 ${leftWidthPercent}%`,
              maxWidth: `${leftWidthPercent}%`,
            }}
          >
            <div className="appointment-wrap PatientDetailswrap m-0">
              <Card className="">
                <>
                  <Card.Header className="bg-white py-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="title-digitise-card">
                        <img
                          src={writtenRxIcon}
                          alt="rx-icon1"
                          className="me-2"
                        />
                        {`Handwritten Rx`}
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body className="p-0 cardbody-data scrollable-body">
                    {loading ? (
                      <div className="d-flex flex-column justify-content-center">
                        <div className="align-items-center text-center">
                          <Spin />
                        </div>
                      </div>
                    ) : (
                      smartRxFile?.length > 0 &&
                      smartRxFile?.map(({ smart_prescription_file }) => (
                        <div style={{ padding: "5px" }}>
                          {smart_prescription_file && (
                            <img
                              src={smart_prescription_file}
                              alt="Smart Rx"
                              width="100%"
                            />
                          )}
                        </div>
                      ))
                    )}
                  </Card.Body>
                </>
              </Card>
            </div>
          </Col>
          <Col
            md={17}
            lg={17}
            xl={12}
            style={{
              flex: `0 0 ${100 - leftWidthPercent}%`,
              maxWidth: `${100 - leftWidthPercent}%`,
            }}
          >
            <div className="appointment-wrap PatientDetailswrap m-0">
              {isLoading ? (
                <DigitisedPrescription
                  data={data}
                  setData={setData}
                  loading={isLoading}
                  showAbsHeaderInsideLoader={true}
                />
              ) : (
                <Card className="">
                  <>
                    <Card.Header className="bg-white py-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="title-digitise-card">
                          <img
                            src={digitiseRxIcon}
                            alt="rx-icon2"
                            className="me-2"
                          />
                          {`Digitised Rx`}
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Body className="p-0 cardbody-data scrollable-body">
                      <div style={{ padding: "5px" }}>
                        <DigitisedPrescription
                          data={data}
                          setData={setData}
                          loading={isLoading}
                        />
                      </div>
                    </Card.Body>
                  </>
                </Card>
              )}
            </div>
          </Col>
        </Row>
        <div
          onMouseDown={startResizing}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${leftWidthPercent}%`,
            transform: "translateX(-8px)",
            width: 16,
            cursor: "col-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 56,
              borderRadius: 16,
              background: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
              border: "1px solid #E2E2EA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 4,
                height: 16,
                background:
                  "repeating-linear-gradient(to bottom, #C9CDD3, #C9CDD3 2px, transparent 2px, transparent 4px)",
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SmartRxDigitise;
