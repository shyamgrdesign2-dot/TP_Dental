import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import { isMobile } from "react-device-detect";
import { jwtDecode } from "jwt-decode";
// import { errorMessage } from "../utils/utils";
import documentIcon from "../../assets/images/document-normal.svg";
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { getInvestigationAndMedicine } from "../../redux/caseManagerSlice";
import { placeIctOrder } from "../../redux/appointmentsSlice";
import { env } from "../../EnvironmentConfig";
import HeaderSmartRxDigitise from "../../common/HeaderSmartRxDigitise";
import DigitisedPrescription from "../../components/DigitisedPrescription";
import axios from "axios";
import { trackEvent } from "../../utils/utils";
import { EVENTS } from "../../utils/events";
import { getDecodedToken } from "../../utils/localStorage";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { GB_ZYDUS_USER } from "../../utils/constants";
import ApiMedication from "../../api/services/ApiMedication";

function SnapRxDigitise() {
  const divRef = useRef(null);
  // Minimal resizable split state
  const splitRef = useRef(null);
  const isResizingRef = useRef(false);
  const [leftWidthPercent, setLeftWidthPercent] = useState(30);

  const { loading } = useSelector((state) => state.caseManager);
  const { siteId, storeCode } = useSelector((state) => state.doctors);
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

  const isZydusUserAccessableFromGB = useFeatureIsOn(GB_ZYDUS_USER);
  const [token, setToken] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [divWidth, setDivWidth] = useState(0);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [smartRxFile, setSmartRxFile] = useState(smartRxFilesData);

  const baseUrlRxDigitise = env.digitization_api_url;

  // Keep only non-empty vitals (same as ConsultationDrawer) and optional API key mapping
  const vitalsOnlyNonEmpty = useCallback((v) => {
    if (!v || typeof v !== "object") return {};
    const actual = v._doc || v;
    const keyMap = { respiratoryRate: "respRate", randomBloodSugar: "sugar", headCircumference: "ofc", genralRBS: "general_rbs" };
    const result = {};
    Object.entries(actual).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "" && String(value).trim() !== "") {
        result[keyMap[key] || key] = value;
      }
    });
    return result;
  }, []);

  // Filter vitals to non-empty only before passing to Rx Pad (API already returns vitalsAndBodyComposition, examinations, labInvestigation)
  const canonicalFromApi = useCallback((src) => {
    if (!src || typeof src !== "object") return src;
    const out = { ...src };
    if (out.vitalsAndBodyComposition) {
      out.vitalsAndBodyComposition = vitalsOnlyNonEmpty(out.vitalsAndBodyComposition);
    }
    return out;
  }, [vitalsOnlyNonEmpty]);

  // Ensure medications default edited flag is present
  const normalizeEditedFlag = useCallback((src) => {
    if (!src || typeof src !== "object") return src;
    const meds = Array.isArray(src.medications) ? src.medications : [];
    return {
      ...src,
      medications: meds.map((m) => ({ ...m, edited: false })),
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
      digitizeRx();
    } else if (state.type === "edit" && digitisedData) {
      setData(normalizeEditedFlag(canonicalFromApi(digitisedData?.editedData)));
      setIsLoading(false);
    } else if (state.type === "review" && digitisedData) {
      setData(normalizeEditedFlag(canonicalFromApi(digitisedData?.refinedData)));
      setIsLoading(false);
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

      const sanitizedMedications =
        data?.medications?.map((item) => {
          const quantityValue = item?.quantity;
          let quantity = 0;

          if (typeof quantityValue === "number" && Number.isFinite(quantityValue)) {
            quantity = quantityValue;
          } else if (quantityValue !== undefined && quantityValue !== null) {
            const parsedQuantity = Number(quantityValue);
            quantity = Number.isFinite(parsedQuantity) ? parsedQuantity : 0;
          }

          return {
            ...item,
            quantity,
          };
        }) || [];

      const quantityActionMedicine = await ApiMedication.getQuantity({
        medicines: sanitizedMedications,
      });
      const updatedPrescriptionData = {
        ...data,
        medications:
          sanitizedMedications.map((item, index) => {
            const quantityValue =
              quantityActionMedicine?.medicines?.[index]?.quantity;
            let quantity = 0;

            if (typeof quantityValue === "number" && Number.isFinite(quantityValue)) {
              quantity = quantityValue;
            } else if (quantityValue !== undefined && quantityValue !== null) {
              const parsedQuantity = Number(quantityValue);
              quantity = Number.isFinite(parsedQuantity) ? parsedQuantity : 0;
            }

            return {
              ...item,
              quantity,
            };
          }),
      };
      const payload = {
        tcm_id: tcm_id,
        patient_unique_id: patient_data?.patient_unique_id,
        editedData: { ...updatedPrescriptionData },
      };

      // API call to save the data
      const response = await axios.post(
        `${baseUrlRxDigitise}/api/v1/digitization/snap-rx/verify-digitized-rx`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanedToken}`,
          },
        }
      );
      // Handle navigation based on the API response
      if (response.status === 200) {
        state.type === "edit" &&
          trackEvent(EVENTS.SNAP_RX.editedByDoctor, {
            consultation_id: state?.tcm_id,
            doctor_id: getDecodedToken()?.user_id,
          });
        const isGroundingAccessableForZydus =
          tokenData?.hospital_business_id == env.zydus_business_id &&
          isZydusUserAccessableFromGB;

        // Call placeIctOrder for Zydus users
        if (isGroundingAccessableForZydus && patient_data?.departmentId) {
          let sendInvestigationAndMedicine = {
            patient_unique_id:
              patient_data !== undefined ? patient_data.patient_unique_id : 0,
            tcm_id: tcm_id,
          };
          const actionIM = await dispatch(
            getInvestigationAndMedicine(sendInvestigationAndMedicine)
          );
          if (actionIM.meta.requestStatus === "fulfilled") {
            
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
              investigationList: data?.labInvestigation?.map((item) => item.name) || [],
              medicineList:
                data?.medications?.map(({ name, notes }, index) => ({
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

        // // Navigate based on isCustomSSRX flag
        // if (isCustomSSRX) {
        //   navigate("/smart-rx/preview", {
        //     replace: true,
        //     state: {
        //       patient_data,
        //       files: smartRxFilesData,
        //       tcm_id,
        //       pam_id: pam_id || patient_data?.pam_id,
        //       print_url,
        //       showProgressbar: false,
        //       page: "digitise",
        //     },
        //   });
        // } else {
        navigate("/snap-rx/preview", {
          replace: true,
          state: {
            patient_data,
            files: smartRxFilesData,
            tcm_id,
            pam_id: pam_id || patient_data?.pam_id,
            print_url,
            showProgressbar: false,
            page: "digitise",
          },
        });
        // }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const digitizeRx = async () => {
    try {
      setIsLoading(true);

      const cleanedToken = token.replace(/['"]+/g, "");
      const response = await axios.post(
        `${baseUrlRxDigitise}/api/v1/digitization/snap-rx/digitize-rx`,
        {
          tcm_id: tcm_id,
          patient_unique_id: patient_data?.patient_unique_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanedToken}`,
          },
        }
      );

      // Update the digitized data (normalize to canonical shape for Rx Pad)
      if (response?.data?.data) {
        setData(normalizeEditedFlag(canonicalFromApi(response.data.data.refinedData)));
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
        isDigitiseRxLoading={isLoading}
        patient_data={patient_data}
        isSnapRx={true}
      />
      <div
        ref={splitRef}
        className={`${
          isMobile ? "p-0" : ""
        } w-100 bg-body prescription-wrapper prescription-wrapper-digitise srx-drx-container`}
        style={{ position: "relative" }}
      >
        <Row gutter={0} justify="center" wrap={false}>
          <Col
            md={17}
            lg={17}
            xl={10}
            style={{
              flex: `0 0 ${leftWidthPercent}%`,
              maxWidth: `${leftWidthPercent}%`,
              padding: 0,
            }}
          >
            <div className="snap-smart-left-panel">
              <div className="snap-smart-left-content">
                {loading ? (
                  <div className="d-flex flex-column justify-content-center align-items-center h-100 min-h-200">
                    <Spin />
                  </div>
                ) : (
                  smartRxFile?.length > 0 &&
                  smartRxFile?.map(
                    ({ fileUrl, smart_prescription_file }) => (
                      <div key={fileUrl || smart_prescription_file}>
                        {(isCustomSSRX
                          ? smart_prescription_file
                          : fileUrl) && (
                          <img
                            src={
                              isCustomSSRX
                                ? smart_prescription_file
                                : fileUrl
                            }
                            alt="Smart Rx"
                            className="written-rx-image"
                            width="100%"
                          />
                        )}
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </Col>
          <Col
            md={17}
            lg={17}
            xl={10}
            style={{
              flex: `0 0 ${100 - leftWidthPercent}%`,
              maxWidth: `${100 - leftWidthPercent}%`,
              padding: 0,
            }}
          >
            <div className="snap-smart-right-panel drx-h-full drx-digitize-container">
              <div className="snap-smart-right-header">
                <div className="snap-smart-header-title">
                  <img src={documentIcon} alt="Rx Pad" className="me-2" />
                  Digitized RX
                </div>
              </div>
              <div className="snap-smart-right-body">
                <DigitisedPrescription
                  data={data}
                  setData={setData}
                  loading={isLoading}
                  showAbsHeaderInsideLoader={true}
                  showHeader={false}
                  showInstructionMessage={false}
                />
              </div>
            </div>
          </Col>
        </Row>
        {/* Draggable divider */}
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

export default SnapRxDigitise;
