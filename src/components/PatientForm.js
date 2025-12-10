import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useContext,
} from "react";
import { isMobile } from "react-device-detect";
import { Col, Row } from "react-bootstrap";
import { Form, Tabs, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFeatureIsOn } from "@growthbook/growthbook-react";

import { ADD, EDIT, GB_ISCRIBE, GB_SNAP_RX, S_VOICE_RX, PAID } from "../utils/constants";
import { errorMessage, getClinic, getClinicName, isVoiceRxFree, shouldMonetizationDisabled } from "../utils/utils";

import TabHeader from "../components/tab_design/TabHeader";
import PersonalDetails from "../components/PersonalDetails";
import SecondaryDetails from "../components/SecondaryDetails";
import AddressDetails from "../components/AddressDetails";
import UploadProfile from "../components/UploadProfile";
import { viewPatient, addPatient, editPatient } from "../redux/appointmentsSlice";
import { clearAbhaDetails } from "../redux/abhaSlice";
import CommonModal from "../common/CommonModal";
import saveIcon from '../assets/images/save.svg';
import smartPad from '../assets/images/smartPad.svg';
import { updateDob } from "../pages/vaccination/service";
import { getDecodedToken } from "../utils/localStorage";
import ApiAbha from "../api/services/ApiAbha";
import GreenTick from "../assets/images/green_tick.svg";

const { TabPane } = Tabs;

function PatientForm({ mode = ADD, patient_data }) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { loading } = useSelector(
        (state) => state.records
    );
    const { profile, userId } = useSelector((state) => state.doctors);
    const { abhaDetails } = useSelector((state) => state.abha || { abhaDetails: {} });
    const {
        linkedAddress: abhaLinkedAddress = "",
        insertId: abhaInsertId = "",
    } = abhaDetails || {};

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [patientData, setPatientData] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successAbhaAddress, setSuccessAbhaAddress] = useState("");
    const isSmartSyncAccessableFromGB = useFeatureIsOn(
        GB_ISCRIBE
    );
    const isSnapRxAccessable = useFeatureIsOn(GB_SNAP_RX);
    const isFreeVoiceRxUser = isVoiceRxFree();
    const tp_monetization_enable = !shouldMonetizationDisabled();

    // Check if user came from all patients page
    const isFromAllPatients = location.state?.from === "/all_patients";
    const isFromAddAppointment = location.state?.from === "/add-appointment";
    const isFromStandalone = location.state?.from === "abha-standalone";
    const standaloneConfig = location.state || {};
    const embedded = standaloneConfig.embedded === true;
    const origin = standaloneConfig.origin;
    const callbackUrl = standaloneConfig.callbackUrl;

    useEffect(() => {
        const getEditData = async () => {
            var sendData = {
                patient_unique_id: patient_data.patient_unique_id
            };
            await dispatch(viewPatient(sendData));
        }
        mode === EDIT && getEditData()
    }, []);

    useEffect(() => {
        return () => {
            dispatch(clearAbhaDetails());
        };
    }, [dispatch]);

    // PostMessage helper for standalone mode
    const postMessageToParent = useCallback((type, data) => {
        if (embedded && window.parent !== window && isFromStandalone) {
            const message = { type, ...data, source: "abha-standalone" };
            if (origin) {
                window.parent.postMessage(message, origin);
            } else {
                window.parent.postMessage(message, "*");
            }
        }
    }, [embedded, origin, isFromStandalone]);

    const showHideModal = useCallback(() => {
        setIsModalOpen(!isModalOpen);
    }, [isModalOpen]);


    const onFinish = () => {
        const decodedToken = getDecodedToken();
        const hospital_bid = decodedToken?.result?.hospital_business_id;
        form.validateFields().then(async (values) => {
            const finalValues = {
                ...values,
                pm_reference_id: values.pm_reference_id ? values.pm_reference_id : '',
                pm_salutation: values.pm_salutation !== undefined ? values.pm_salutation : '',
                pm_pincode: values.pm_pincode !== undefined ? values.pm_pincode : '',
                pm_dob: values['pm_dob'] ? values['pm_dob'].format('YYYY-MM-DD') : values['dob'],
                pm_city: values.pm_city !== undefined ? values.pm_city : '',
                pm_state: values.pm_state !== undefined ? values.pm_state : '',
                pm_address: values.pm_address !== undefined ? values.pm_address : '',
                pm_blood_group: values.pm_blood_group !== undefined && values.pm_blood_group !== null ? values.pm_blood_group : '',
                pm_married_status: values.pm_married_status !== undefined && values.pm_married_status !== null ? values.pm_married_status : '',
                pm_occupation: values.pm_occupation !== undefined && values.pm_occupation !== null ? values.pm_occupation : '',
                pm_email: values.pm_email !== undefined && values.pm_email !== null ? values.pm_email : '',
                pm_aadhar_card_number: values.pm_aadhar_card_number !== undefined && values.pm_aadhar_card_number !== null ? values.pm_aadhar_card_number : '',
            };
            
            // Remove null values to avoid sending them to backend
            Object.keys(finalValues).forEach(key => {
                if (finalValues[key] === null) {
                    delete finalValues[key];
                }
            });
            
            delete finalValues['pm_dob_show'];

            if (mode === EDIT) {
                finalValues['patient_unique_id'] = patient_data.patient_unique_id
            }

            const action = mode === EDIT ? await dispatch(editPatient(finalValues)) : await dispatch(addPatient(finalValues));
            if (action.meta.requestStatus === "fulfilled") {
                const clinic_name = getClinicName(profile?.hospital_data);
                window.Moengage.track_event("TP_Patient_added", {
                    clinic_name,
                    "patient_number": patient_data?.pm_contact_no,
                    "patient_id": patient_data?.patient_unique_id
                });
                if (abhaLinkedAddress && abhaInsertId && abhaInsertId !== "" && action.payload && action.payload?.patient_unique_id) {
                    await ApiAbha.linkPatientUniqueidWithAbha({
                        patient_unique_id: action.payload.patient_unique_id,
                        abhaInsertId: abhaInsertId,
                    });
                    
                    // If from standalone mode, show success and send postMessage
                    if (isFromStandalone) {
                        setSuccessAbhaAddress(abhaLinkedAddress);
                        setShowSuccessMessage(true);
                        
                        // Send success message to parent
                        postMessageToParent("ABHA_SUCCESS", {
                            linkedAddress: abhaLinkedAddress,
                            insertId: abhaInsertId,
                            patientUniqueId: action.payload.patient_unique_id,
                            patientName: action.payload.pm_fullname,
                            message: `ABHA ID: ${abhaLinkedAddress} created successfully`,
                        });
                        
                        // Close iframe after delay
                        setTimeout(() => {
                            if (callbackUrl) {
                                const params = new URLSearchParams({
                                    status: "success",
                                    abhaAddress: abhaLinkedAddress,
                                    patientUniqueId: action.payload.patient_unique_id,
                                });
                                window.location.href = `${decodeURIComponent(callbackUrl)}?${params.toString()}`;
                            } else if (embedded) {
                                // Just close iframe
                                postMessageToParent("ABHA_CLOSE", { completed: true });
                            }
                        }, 3000);
                        
                        // Don't navigate to prescription, just show success
                        dispatch(clearAbhaDetails());
                        return; // Exit early, don't navigate
                    }
                }
                if (
                    mode === EDIT &&
                    patient_data.pm_dob !== finalValues.pm_dob
                ) {
                    const payload = {
                        patient_uid: patient_data?.patient_unique_id,
                        patient_pid: patient_data?.pm_pid,
                        hospital_bid:
                            patient_data?.hm_business_id ||
                            patient_data?.hospital_business_id || hospital_bid,
                        hospital_id:
                            patient_data?.hm_id || profile?.hospital_data?.[0]?.hm_id,
                        updated_dob: finalValues.pm_dob,
                    };
                    await updateDob(payload);
                }

                // Handle navigation based on source page
                if (isFromAllPatients) {
                    navigate("/all_patients", {
                        replace: true,
                        state: {
                            showMessage: true,
                            messageType: mode === EDIT ? 'updated' : 'added'
                        }
                    });
                } else if (isFromAddAppointment) {
                    navigate("/add-appointment", {
                        replace: true,
                        state: {
                            ...location.state,
                            patient_data: { ...action.payload },
                        }
                    });
                } else {
                    // Show modal if any of SmartRx, SnapRx, or VoiceRx is enabled (and not mobile)
                    const hasRxOptions = isSmartSyncAccessableFromGB || isSnapRxAccessable || isFreeVoiceRxUser || tp_monetization_enable;
                    if (isMobile || !hasRxOptions) {
                        mode === EDIT ?
                            navigate("/patient_details", {
                                replace: true,
                                state: {
                                    patient_data: { ...patient_data, ...action.payload }
                                }
                            }) :
                            navigate("/prescription", {
                                replace: true,
                                state: { patient_data: action.payload }
                            });
                    } else {
                        if (mode !== EDIT) {
                            setIsModalOpen(true);
                            setPatientData(action.payload);
                        }
                        if (mode === EDIT) {
                            navigate("/patient_details", {
                                replace: true,
                                state: {
                                    patient_data: { ...patient_data, ...action.payload }
                                }
                            });
                        }
                    }
                }
                dispatch(clearAbhaDetails());
            } else {
                errorMessage(action.error);
            }
        }).catch(info => {
            console.log('info', info)
        });
    };

    return (
        <>
            {isMobile && (
                <TabHeader
                    flag={2}
                    mode={mode}
                    title={mode === EDIT ? "Edit Patient Details" : "Add New Patient"}
                    loading={loading}
                    onClick={onFinish} />
            )}
            <Form
                form={form}
                layout="vertical"
                className="form_addnewpatient patient-form"
                style={isFromStandalone ? { paddingTop: "40px" } : {}}>
                <div className={isMobile ? "" : "border rounded-4 appointment-wrap"}>
                    <div className={isMobile ? "p-30 pt-0" : "p-30 overflow-y-auto"} style={{ height: 'calc(100vh - 242px)' }}>
                        <Row className="justify-content-between">
                            <Col sm={8}>
                                {isMobile ? (
                                    <div className="tabs-patient">
                                        <Tabs defaultActiveKey="1">
                                            <TabPane tab="Personal Details" key="1">
                                                <PersonalDetails form={form} mode={mode} patient_data={patient_data} />
                                            </TabPane>
                                            <TabPane tab="Secondary Details" key="2">
                                                <SecondaryDetails form={form} mode={mode} patient_data={patient_data} />
                                            </TabPane>
                                            <TabPane tab="Address Details" key="3">
                                                <AddressDetails form={form} />
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                ) : (
                                    <>
                                        <PersonalDetails form={form} mode={mode} patient_data={patient_data} />
                                        <hr className="mb-3 mt-3" />
                                        <SecondaryDetails form={form} mode={mode} patient_data={patient_data} />
                                        <hr className="mb-3 mt-3" />
                                        <AddressDetails form={form} />
                                    </>
                                )}
                            </Col>
                            <Col sm={3} className="mt-5">
                                <UploadProfile form={form} mode={mode} />
                            </Col>
                        </Row>
                    </div>
                    {!isMobile && (
                        <>
                            <hr className="my-0" />
                            <div className="text-end p-20">
                                <button type="button" className="btn btn-text text-decoration-underline me-3" onClick={() => mode === EDIT ? navigate(-1) : isFromAddAppointment ? navigate("/add-appointment", {
                                    replace: true,
                                    state: {
                                        ...location.state
                                    }
                                }) : navigate(-2)}>
                                    Cancel
                                </button>
                                <Button
                                    className='btn btn-primary3 me-30 btn-41 px-4'
                                    onClick={onFinish}
                                    loading={loading}>
                                    {mode === EDIT
                                        ? 'Save'
                                        : (isFromAllPatients || isFromAddAppointment)
                                            ? 'Add Patient'
                                            : 'Add Patient to Consult'
                                    }
                                </Button>
                            </div>
                            <CommonModal
                                isModalOpen={isModalOpen}
                                onCancel={showHideModal}
                                modalWidth={!(isSmartSyncAccessableFromGB && isSnapRxAccessable ) ? 500 : 400}
                                title={"Patient Added"}
                                modalBody={
                                    <>
                                        <div className="rounded-10px p-2 patient-details" style={{ borderRadius: "10px", background: "rgba(25, 187, 122, 0.10)" }}>
                                            <div className="d-flex align-items-center">
                                                <img className='me-3' src={saveIcon} alt="Warning" />
                                                <span>
                                                    Patient has been successfully added.
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="me-4 mb-2 text-decoration-underline btn p-0 text-main">
                                                Choose Action
                                            </div>

                                            <div className="d-flex flex-column align-items-center justify-content-center g-4">
                                                {!isMobile ? (
                                                    <SmartDropdownButtons
                                                        profile={profile}
                                                        patient_data={patientData}
                                                        navigate={navigate}
                                                        userId={userId}
                                                    />
                                                ) : (
                                                    <Button
                                                        className="btn btn-primary3 btn-text-white px-5 m-2 btn-41"
                                                        onClick={() => {
                                                            window.Moengage.track_event("start_new_visit_click", {
                                                            doctor_id: profile?.doctor_unique_id,
                                                            patient_id:
                                                                patientData !== undefined
                                                                ? patientData.patient_unique_id
                                                                : 0,
                                                            });
                                                            navigate("/prescription", {
                                                            state: {
                                                                patient_data: patientData,
                                                                send_path: "patient_details",
                                                            },
                                                            });
                                                        }}
                                                    >
                                                        {"Start New Consult"}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                }
                            />
                        </>
                    )}
                </div>
            </Form>
            {showSuccessMessage && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                }}>
                    <div style={{
                        backgroundColor: "white",
                        padding: "32px",
                        borderRadius: "8px",
                        textAlign: "center",
                        maxWidth: "400px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}>
                        <img src={GreenTick} alt="Success" style={{ width: "80px", height: "80px", marginBottom: "16px" }} />
                        <h2 style={{ marginBottom: "16px", color: "#454551", fontFamily: "Poppins, sans-serif" }}>Success!</h2>
                        <p style={{ color: "#454551", fontSize: "16px", fontFamily: "Poppins, sans-serif" }}>
                            ABHA ID: <strong style={{ color: "#4b4ad5" }}>{successAbhaAddress}</strong> created successfully
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

function SmartDropdownButtons({ patient_data, navigate, profile, userId }) {
  
    const isSmartSyncAccessableFromGB = useFeatureIsOn(GB_ISCRIBE);
    const isSnapRxAccessableFromGB = useFeatureIsOn(GB_SNAP_RX);
    const isFreeVoiceRxUser = isVoiceRxFree();
    const tp_monetization_enable = !shouldMonetizationDisabled();
    const { planDetails } = useSelector((state) => state.subscription);
    const { service_mappings } = planDetails || {};
    const VOICE_RX_planDetails = service_mappings?.find(
      (e) => e.service_name === S_VOICE_RX
    );
    const isVoiceRxPaid = VOICE_RX_planDetails?.plan_tier === PAID;
    
    const [open, setOpen] = React.useState(false);
    const arrowRef = React.useRef(null);
    const containerRef = React.useRef(null);

    const handleConsult = () => {
        navigate("/prescription", { state: { patient_data: patient_data } });
    }
    const handleSmartRx = () => {
        navigate("/smart-prescription", { state: { patient_data: patient_data } })
    }
    const handleSnapRx = () => {
        navigate("/snap-rx", { state: { patient_data: patient_data } })
    }
    const handleVoiceRx = () => {
        const clinic = getClinic(profile?.hospital_data);
        window.Moengage.track_event("TP_AV_Entry", {
          patient_id: patient_data?.patient_unique_id || "",
          patient_name: patient_data?.pm_fullname || "",
          patient_mobile_number: patient_data?.pm_contact_no || "",
          doctor_id: profile?.doctor_unique_id,
          user_id: userId,
          doctor_name: profile?.um_name,
          doctor_specialty: profile?.dp_name,
          doctor_mobile_number: profile?.um_contact,
          hm_id: clinic?.hm_id,
          clinic_name: clinic?.hm_name,
          source: "Add New Patient",
        });
        navigate("/voice-rx-consult", {
            state: { 
                patient_data: patient_data,
            },
        });
    }
  
    React.useEffect(() => {
      function handleClickOutside(event) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target)
        ) {
          setOpen(false);
        }
      }
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open]);
  
    // Determine which button to show based on priority: SmartRx > SnapRx > VoiceRx > Consult
    if (isSmartSyncAccessableFromGB) {
      return (
        <div
          ref={containerRef}
          style={{ display: "flex", flexDirection: "column", width : "100%" }}
        >
          <div>
              <Button
                  className="btn btn-primary3 btn-text-white mb-2 btn-41 d-flex justify-content-between align-items-center"
                  style={{width:"100%"}}
                  onClick={() => {
                      handleSmartRx();
                  }}
              >
                  <div className="">
                      <img className ="me-2" src={smartPad} alt="SmartRx" />
                      <span>
                          Start Smart Rx
                      </span>
                  </div>
                  <div
                      ref={arrowRef}
                      style={{
                          position: "absolute",
                          right: 24,
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                      }}
                      onClick={(e) => {
                          e.stopPropagation();
                          setOpen((o) => !o);
                      }}
                  >
                      <i
                          class="icon-right"
                          style={{
                          display: "block",
                          transform: open ? "rotate(270deg)" : "rotate(180deg)",
                          color: "white",
                          }}
                      ></i>
                  </div>
              </Button>
          </div>
          {open && 
            <div className="smart-rx-buttons-grp">
              {isSnapRxAccessableFromGB &&
                <div>
                  <button
                    className={`smart-rx-buttons bottom-border ${isSnapRxAccessableFromGB && isSmartSyncAccessableFromGB ?  "bottom-br" : "border-radius-all"}`}
                    onClick={() => {
                      setOpen(false);
                      handleSnapRx();
                    }}
                  >
                    <span style={{ padding: "0 3.4rem" }}>Start New SnapRx</span>
                  </button>
                </div>
              }
              {(isFreeVoiceRxUser || tp_monetization_enable) && isVoiceRxPaid && (
                <div>
                    <button
                      className={`smart-rx-buttons ${(isSnapRxAccessableFromGB && isSmartSyncAccessableFromGB) ? "bottom-border" : ""}`}
                      onClick={() => {
                        setOpen(false);
                        handleVoiceRx();
                      }}
                    >
                      <span style={{ padding: "0 3.4rem" }}>Start Voice Rx</span>
                    </button>
                </div>
              )}
              <div>
                  <button
                    className={`smart-rx-buttons ${((isSnapRxAccessableFromGB && isSmartSyncAccessableFromGB) || ((isFreeVoiceRxUser || tp_monetization_enable) && isVoiceRxPaid)) ? "bottom-br" : ((isFreeVoiceRxUser || tp_monetization_enable) && !isVoiceRxPaid) ? "top-br" : "border-radius-all"}`}
                    onClick={() => {
                      setOpen(false);
                      handleConsult();
                    }}
                  >
                    <span style={{ padding: "0 3.4rem" }}>Start New Consult</span>
                  </button>
              </div>
              {(isFreeVoiceRxUser || tp_monetization_enable) && !isVoiceRxPaid && (
                <div>
                    <button
                      className="smart-rx-buttons bottom-br"
                      onClick={() => {
                        setOpen(false);
                        handleVoiceRx();
                      }}
                    >
                      <span style={{ padding: "0 3.4rem" }}>Start Voice Rx</span>
                    </button>
                </div>
              )}
            </div>
          }
        </div>
      );
    } else if (isSnapRxAccessableFromGB) {
      return (
        <div
          ref={containerRef}
          style={{ display: "flex", flexDirection: "column", width : "100%" }}
        >
          <div>
              <Button
                  className="btn btn-primary3 btn-text-white mb-2 btn-41 d-flex justify-content-between align-items-center"
                  style={{width:"100%"}}
                  onClick={() => {
                      handleSnapRx();
                  }}
              >
                  <div className="">
                      <img className ="me-2" src={smartPad} alt="SnapRx" />
                      <span>
                          Start Snap Rx
                      </span>
                  </div>
                  <div
                      ref={arrowRef}
                      style={{
                          position: "absolute",
                          right: 24,
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                      }}
                      onClick={(e) => {
                          e.stopPropagation();
                          setOpen((o) => !o);
                      }}
                  >
                      <i
                          class="icon-right"
                          style={{
                          display: "block",
                          transform: open ? "rotate(270deg)" : "rotate(180deg)",
                          color: "white",
                          }}
                      ></i>
                  </div>
              </Button>
          </div>
          {open && 
            <div className="smart-rx-buttons-grp">
              {(isFreeVoiceRxUser || tp_monetization_enable) && isVoiceRxPaid && (
                <div>
                    <button
                      className="smart-rx-buttons bottom-border"
                      onClick={() => {
                        setOpen(false);
                        handleVoiceRx();
                      }}
                    >
                      <span style={{ padding: "0 3.4rem" }}>Start Voice Rx</span>
                    </button>
                </div>
              )}
              <div>
                  <button
                    className={`smart-rx-buttons ${((isFreeVoiceRxUser || tp_monetization_enable) && isVoiceRxPaid) ? "bottom-br" : ((isFreeVoiceRxUser || tp_monetization_enable) && !isVoiceRxPaid) ? "top-br" : "top-br"}`}
                    onClick={() => {
                      setOpen(false);
                      handleConsult();
                    }}
                  >
                    <span style={{ padding: "0 3.4rem" }}>Start New Consult</span>
                  </button>
              </div>
              {(isFreeVoiceRxUser || tp_monetization_enable) && !isVoiceRxPaid && (
                <div>
                    <button
                      className="smart-rx-buttons bottom-br"
                      onClick={() => {
                        setOpen(false);
                        handleVoiceRx();
                      }}
                    >
                      <span style={{ padding: "0 3.4rem" }}>Start Voice Rx</span>
                    </button>
                </div>
              )}
            </div>
          }
        </div>
      );
    } else if (isFreeVoiceRxUser || tp_monetization_enable) {
      return (
        <div
          ref={containerRef}
          style={{ display: "flex", flexDirection: "column", width : "100%" }}
        >
          <div>
              <Button
                  className="btn btn-primary3 btn-text-white mb-2 btn-41 d-flex justify-content-between align-items-center"
                  style={{width:"100%"}}
                  onClick={() => {
                      isVoiceRxPaid ? handleVoiceRx() : handleConsult();
                  }}
              >
                  <div className="">
                      <span>
                          {isVoiceRxPaid ? "Start Voice Rx" : "Start New Consult"}
                      </span>
                  </div>
                  <div
                      ref={arrowRef}
                      style={{
                          position: "absolute",
                          right: 24,
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                      }}
                      onClick={(e) => {
                          e.stopPropagation();
                          setOpen((o) => !o);
                      }}
                  >
                      <i
                          class="icon-right"
                          style={{
                          display: "block",
                          transform: open ? "rotate(270deg)" : "rotate(180deg)",
                          color: "white",
                          }}
                      ></i>
                  </div>
              </Button>
          </div>
          {open && 
            <div className="smart-rx-buttons-grp">
              {isVoiceRxPaid ? (
                <div>
                    <button
                      className="smart-rx-buttons bottom-br"
                      onClick={() => {
                        setOpen(false);
                        handleConsult();
                      }}
                    >
                      <span style={{ padding: "0 3.4rem" }}>Start New Consult</span>
                    </button>
                </div>
              ) : (
                <div>
                    <button
                      className="smart-rx-buttons bottom-br"
                      onClick={() => {
                        setOpen(false);
                        handleVoiceRx();
                      }}
                    >
                      <span style={{ padding: "0 3.4rem" }}>Start Voice Rx</span>
                    </button>
                </div>
              )}
            </div>
          }
        </div>
      );
    } else {
      // Fallback to Consult button
      return (
        <Button
          className="btn btn-primary3 btn-text-white mb-2 btn-41 w-100"
          onClick={handleConsult}
        >
          Start New Consult
        </Button>
      );
    }
}
  
  export default React.memo(PatientForm);
