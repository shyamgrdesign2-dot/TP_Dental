import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CreatePatientAbha from "../../components/abha/screens/CreatePatientAbha";
import AbhaVerifyOtp from "../../components/abha/screens/AbhaVerifyOtp";
import MobileVerifyOtp from "../../components/abha/screens/MobileVerifyOtp";
import CreateNewAbhaAddress from "../../components/abha/screens/CreateNewAbhaAddress";
import AbhaAddress from "../../components/abha/screens/AbhaAddress";
import LinkPatientAbha from "../../components/abha/screens/LinkPatientAbha";
import AbhaSuccessScreen from "../../components/abha/common/AbhaSuccessScreen";
import OtpVerificationCode from "../../components/abha/common/OtpVerificationCode";
import AbhaDrawerHeader from "../../components/abha/common/AbhaDrawerHeader";
import AbhaHeadingSVG from "../../assets/images/abha-svg.svg";
import SuccessGif from "../../assets/images/succcess-abha-animation.gif";
import useAbhaScreens, { ABHA_SCREENS } from "../../components/abha/hooks/useAbhaScreens";
import ApiAbha from "../../api/services/ApiAbha";
import { useLocalStorage } from "../../utils/localStorage";
import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { setAbhaDetails } from "../../redux/abhaSlice";
import "../../components/abha/AbhaDrawer.scss";
import "./AbhaStandalone.scss";

// Message types for postMessage communication
const MESSAGE_TYPES = {
  ABHA_SUCCESS: "ABHA_SUCCESS",
  ABHA_CLOSE: "ABHA_CLOSE",
  ABHA_ERROR: "ABHA_ERROR",
  ABHA_LOADED: "ABHA_LOADED",
};

// Flow types
const FLOW_TYPES = {
  NEW_PATIENT: "new_patient",
  LINK_EXISTING: "link_existing",
};

const AbhaStandalone = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [getToken, setToken] = useLocalStorage(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
  const dispatch = useDispatch();

  // URL Parameters
  const authToken = searchParams.get("authToken");
  const patientUniqueId = searchParams.get("patientUniqueId");
  const flow = searchParams.get("flow") || FLOW_TYPES.LINK_EXISTING; // new_patient | link_existing
  const mode = searchParams.get("mode") || "create"; // create | link_mobile | link_address | link_number
  const embedded = searchParams.get("embedded") === "true";
  const callbackUrl = searchParams.get("callbackUrl");
  const origin = searchParams.get("origin");

  // State management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isNextLoading, setIsNextLoading] = useState(false);

  // Screen navigation hook
  const {
    currentScreen,
    screenData,
    goToCreate,
    goToVerifyOtp,
    goToLink,
    goToCreateAddress,
    goToAbhaAddress,
    goToOtpVerificationCode,
    goToMobileVerifyOtp,
    resetScreens,
  } = useAbhaScreens();

  // Refs for child component callbacks
  const verifyOtpFunctionRef = useRef(null);
  const abhaAddressActionRef = useRef(null);
  const createAddressActionRef = useRef(null);
  const otpVerificationCodeFunctionRef = useRef(null);
  const mobileVerifyOtpFunctionRef = useRef(null);
  const [linkAbhaData, setLinkAbhaData] = useState(null);
  const abhaVerifyStateRef = useRef({
    mobile_no: "",
    otpDigits: Array(6).fill(""),
  });

  // PostMessage helper for iframe communication
  const postMessageToParent = useCallback(
    (type, data) => {
      if (embedded && window.parent !== window) {
        const message = { type, ...data, source: "abha-standalone", flow };

        if (origin) {
          window.parent.postMessage(message, origin);
        } else {
          // Fallback to wildcard (less secure, use with caution)
          window.parent.postMessage(message, "*");
        }
      }
    },
    [embedded, origin, flow]
  );

  // Validate and set auth token
  useEffect(() => {
    if (authToken) {
      setToken(authToken);
      setIsAuthenticated(true);
    } else {
      const existingToken = getToken();
      if (existingToken) {
        setIsAuthenticated(true);
      } else {
        setError("Authentication required. Missing authToken parameter.");
        postMessageToParent(MESSAGE_TYPES.ABHA_ERROR, {
          error: "MISSING_AUTH_TOKEN",
          message: "Authentication token is required",
        });
      }
    }
  }, [authToken, setToken, getToken, postMessageToParent]);

  // Validate patient ID based on flow
  useEffect(() => {
    if (isAuthenticated) {
      if (flow === FLOW_TYPES.LINK_EXISTING && !patientUniqueId) {
        setError("Patient ID is required for linking ABHA to existing patient.");
        postMessageToParent(MESSAGE_TYPES.ABHA_ERROR, {
          error: "MISSING_PATIENT_ID",
          message: "Patient unique ID is required for link_existing flow",
        });
      }
      // For new_patient flow, patientUniqueId can be null/undefined
    }
  }, [patientUniqueId, isAuthenticated, flow, postMessageToParent]);

  // Set initial screen based on mode
  useEffect(() => {
    if (isAuthenticated && (flow === FLOW_TYPES.NEW_PATIENT || patientUniqueId)) {
      switch (mode) {
        case "link_mobile":
          goToLink("mobile");
          break;
        case "link_address":
          goToLink("address");
          break;
        case "link_number":
          goToLink("number");
          break;
        case "create":
        default:
          goToCreate();
          break;
      }
      // Notify parent that ABHA module is loaded
      postMessageToParent(MESSAGE_TYPES.ABHA_LOADED, { mode, flow });
    }
  }, [isAuthenticated, patientUniqueId, mode, flow, goToLink, goToCreate, postMessageToParent]);

  const resetAbhaVerifyState = () => {
    abhaVerifyStateRef.current = {
      mobile_no: "",
      otpDigits: Array(6).fill(""),
    };
  };

  const handleAbhaVerifyStateChange = (state = {}) => {
    const { mobile_no = "", otpDigits = [] } = state;
    abhaVerifyStateRef.current = {
      mobile_no,
      otpDigits:
        Array.isArray(otpDigits) && otpDigits.length === 6
          ? [...otpDigits]
          : Array(6).fill(""),
    };
  };

  const handleLinkNavigation = (method = "mobile") => {
    goToLink(method);
  };

  const handleShowCreate = () => {
    goToCreate();
  };

  const handleOtpSent = (data) => {
    resetAbhaVerifyState();
    goToVerifyOtp(data);
  };

  const handleMobileLinkOtpSent = (data) => {
    // Navigate to mobile verify OTP screen for mobile/address/number linking
    const isAddressLinking = data.linkMethod === "address";
    const isNumberLinking = data.linkMethod === "number";
    goToMobileVerifyOtp({
      ...data,
      isMobileLinking: data.linkMethod === "mobile",
      isAbhaAddressLinking: isAddressLinking,
      isAbhaNumberLinking: isNumberLinking,
    });
  };

  const handleAbhaCreatedSuccess = (abhaDetails = {}) => {
    // Dispatch to Redux if details available
    if (abhaDetails?.linkedAddress && abhaDetails?.insertId) {
      dispatch(
        setAbhaDetails({
          ...abhaDetails,
        })
      );
    }

    // For new_patient flow, navigate to add_patient page
    if (flow === FLOW_TYPES.NEW_PATIENT) {
      // Navigate to add patient page with ABHA details
      navigate("/add_patient/receptionist=true", {
        state: {
          from: "abha-standalone",
          abhaDetails: {
            linkedAddress: abhaDetails.linkedAddress || abhaDetails.abhaAddress,
            insertId: abhaDetails.insertId || abhaDetails.abhaInsertId,
            fullName: abhaDetails.fullName,
            dateOfBirth: abhaDetails.dateOfBirth,
            gender: abhaDetails.gender,
            mobile: abhaDetails.mobile,
          },
          embedded,
          origin,
          callbackUrl,
        },
      });
      return; // Don't close, let PatientForm handle it
    }

    // For link_existing flow, show success and close
    if (flow === FLOW_TYPES.LINK_EXISTING) {
      const abhaAddress = abhaDetails.linkedAddress || abhaDetails.abhaAddress;
      
      // Send success message to parent
      postMessageToParent(MESSAGE_TYPES.ABHA_SUCCESS, {
        linkedAddress: abhaAddress,
        insertId: abhaDetails.insertId || abhaDetails.abhaInsertId,
        flow,
        message: `ABHA ID: ${abhaAddress} linked successfully`,
      });

      // Show success screen briefly before closing
      // Show success screen first with ABHA address for custom message
      goToAbhaAddress({ 
        ...abhaDetails, 
        showSuccessScreen: true,
        linkedAddress: abhaAddress 
      });
      
      setTimeout(() => {
        if (callbackUrl) {
          const params = new URLSearchParams({
            status: "success",
            abhaAddress,
          });
          window.location.href = `${decodeURIComponent(callbackUrl)}?${params.toString()}`;
        } else {
          handleClose();
        }
      }, 3000);
    }
  };

  const handleVerifySuccess = (data) => {
    // Check mobileChanged flag
    if (data?.mobileChanged === true) {
      // Show mobile verification OTP screen
      goToMobileVerifyOtp(data);
    } else {
      // Show success screen first, then navigate after 3 seconds
      goToAbhaAddress({ ...data, showSuccessScreen: true });

      setTimeout(() => {
        // Check isNew flag
        if (data?.isNew === true) {
          // Show create new ABHA address component
          goToCreateAddress(data);
        } else {
          // Show ABHA address component
          goToAbhaAddress(data);
        }
      }, 3000);
    }
  };

  const handleMobileVerifySuccess = (responseData) => {
    // After successful mobile verification, show success screen first
    const updatedData = { ...screenData, ...responseData };

    // Show success screen first
    goToAbhaAddress({ ...updatedData, showSuccessScreen: true });

    setTimeout(() => {
      // Check isNew flag
      if (updatedData?.isNew === true) {
        // Show create new ABHA address component
        goToCreateAddress(updatedData);
      } else {
        // Show ABHA address component
        goToAbhaAddress(updatedData);
      }
    }, 5000);
  };

  const handleVerifyOtpCallback = (verifyFunction, isFormValid, isVerifying) => {
    verifyOtpFunctionRef.current = verifyFunction;
    setIsNextDisabled(!isFormValid || isVerifying);
    setIsNextLoading(isVerifying);
  };

  const handleAbhaAddressCallback = (linkFunction, isValid, isLoading, linkData) => {
    abhaAddressActionRef.current = linkFunction;
    setLinkAbhaData(linkData);
    setIsNextDisabled(!isValid || isLoading);
    setIsNextLoading(isLoading);
  };

  const handleOtpVerificationCodeCallback = (verifyFunction, isFormValid, isVerifying) => {
    otpVerificationCodeFunctionRef.current = verifyFunction;
    setIsNextDisabled(!isFormValid || isVerifying);
    setIsNextLoading(isVerifying);
  };

  const handleMobileVerifyOtpCallback = (verifyFunction, isFormValid, isVerifying) => {
    mobileVerifyOtpFunctionRef.current = verifyFunction;
    setIsNextDisabled(!isFormValid || isVerifying);
    setIsNextLoading(isVerifying);
  };

  const handleCreateAddressCallback = (createFunction, isValid) => {
    createAddressActionRef.current = createFunction;
    setIsNextDisabled(!isValid);
    setIsNextLoading(false);
  };

  const handleNextClick = async () => {
    if (
      currentScreen === ABHA_SCREENS.VERIFY_OTP &&
      verifyOtpFunctionRef.current
    ) {
      await verifyOtpFunctionRef.current();
    } else if (
      currentScreen === ABHA_SCREENS.MOBILE_VERIFY_OTP &&
      mobileVerifyOtpFunctionRef.current
    ) {
      const result = await mobileVerifyOtpFunctionRef.current();
      if (result) {
        // Check if this is for mobile linking, address linking, number linking, or mobile update
        const isMobileLinking = screenData?.isMobileLinking === true;
        const isAbhaAddressLinking = screenData?.isAbhaAddressLinking === true;
        const isAbhaNumberLinking = screenData?.isAbhaNumberLinking === true;

        if (isAbhaAddressLinking) {
          // For address linking, show success screen then close
          goToAbhaAddress({ ...screenData, showSuccessScreen: true });

          setTimeout(() => {
            if (result.abhaAddress && result.abhaInsertId) {
              handleAbhaCreatedSuccess({
                linkedAddress: result.abhaAddress,
                insertId: result.abhaInsertId,
                ...result,
              });
            } else {
              handleAbhaCreatedSuccess();
            }
          }, 3000);
        } else if (isMobileLinking || isAbhaNumberLinking) {
          // Show success screen for 3 seconds, then show AbhaAddress
          goToAbhaAddress({ ...result, showSuccessScreen: true });

          setTimeout(() => {
            goToAbhaAddress({
              ...result,
              isMobileLinking: isMobileLinking || isAbhaNumberLinking,
            });
          }, 3000);
        } else {
          handleMobileVerifySuccess(result);
        }
      }
    } else if (
      currentScreen === ABHA_SCREENS.ABHA_ADDRESS &&
      abhaAddressActionRef.current
    ) {
      const result = await abhaAddressActionRef.current();
      if (result?.success) {
        // Check if this is mobile linking, address linking, or ABHA creation flow
        const isMobileLinking = screenData?.isMobileLinking === true;
        const isAbhaAddressLinking = screenData?.isAbhaAddressLinking === true;

        if (isMobileLinking || isAbhaAddressLinking) {
          // For mobile/address linking, directly link and show success
          if (result.abhaAddress && result.abhaInsertId) {
            handleAbhaCreatedSuccess({
              linkedAddress: result.abhaAddress,
              insertId: result.abhaInsertId,
              ...result,
            });
          } else {
            handleAbhaCreatedSuccess();
          }
        } else if (linkAbhaData) {
          // For ABHA creation flow, navigate to OTP verification code screen
          goToOtpVerificationCode({
            ...linkAbhaData,
            txnId: result.txnId,
            otpMessage: result.otpMessage,
          });
        }
      }
    } else if (
      currentScreen === ABHA_SCREENS.CREATE_ADDRESS &&
      createAddressActionRef.current
    ) {
      await createAddressActionRef.current();
    } else if (
      currentScreen === ABHA_SCREENS.OTP_VERIFICATION_CODE &&
      otpVerificationCodeFunctionRef.current
    ) {
      const success = await otpVerificationCodeFunctionRef.current();
      if (success) {
        if (success?.abhaAddress && success?.abhaInsertId) {
          handleAbhaCreatedSuccess({
            linkedAddress: success.abhaAddress,
            insertId: success.abhaInsertId,
            ...success,
          });
        } else {
          handleAbhaCreatedSuccess();
        }
      }
    }
  };

  const getNextButtonConfig = () => {
    // Hide next button on success screen
    if (screenData?.showSuccessScreen) {
      return { show: false, title: "" };
    }

    switch (currentScreen) {
      case ABHA_SCREENS.VERIFY_OTP:
        return { show: true, title: "Next" };
      case ABHA_SCREENS.MOBILE_VERIFY_OTP:
        return { show: true, title: isNextLoading ? "Verifying..." : "Verify" };
      case ABHA_SCREENS.ABHA_ADDRESS:
        return { show: true, title: "Link ABHA" };
      case ABHA_SCREENS.OTP_VERIFICATION_CODE:
        return { show: true, title: "Link ABHA" };
      case ABHA_SCREENS.CREATE_ADDRESS:
        return { show: true, title: "Create" };
      default:
        return { show: false, title: "" };
    }
  };

  const nextButtonConfig = getNextButtonConfig();

  const handleResendOtp = async () => {
    if (screenData?.aadhaarNumber && screenData?.patient_unique_id) {
      try {
        // Resend OTP with same payload structure
        const response = await ApiAbha.sendOtpForAadhaar({
          patient_unique_id: screenData.patient_unique_id,
          aadhaarNumber: screenData.aadhaarNumber,
        });
        if (response?.success) {
          goToVerifyOtp({
            ...screenData,
            txnId: response.data?.txnId,
            accessToken: response.data?.accessToken,
            otpMessage: response.message,
          });
        }
      } catch (error) {
        console.error("Resend OTP failed:", error);
      }
    }
  };

  // Handle close/cancel
  const handleClose = useCallback(() => {
    postMessageToParent(MESSAGE_TYPES.ABHA_CLOSE, { cancelled: true });

    if (callbackUrl) {
      window.location.href = `${decodeURIComponent(callbackUrl)}?status=cancelled`;
    } else if (embedded) {
      // In iframe, just notify parent - don't navigate
      // Parent can handle closing the iframe
    }
  }, [callbackUrl, embedded, postMessageToParent]);

  useEffect(() => {
    return () => {
      resetAbhaVerifyState();
    };
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case ABHA_SCREENS.CREATE:
        return (
          <CreatePatientAbha
            onLinkOptionSelect={handleLinkNavigation}
            onOtpSent={handleOtpSent}
            patientUniqueId={patientUniqueId || null}
          />
        );
      case ABHA_SCREENS.VERIFY_OTP: {
        const mergedOtpData = {
          ...screenData,
          mobile_no:
            abhaVerifyStateRef.current.mobile_no ?? screenData?.mobile_no ?? "",
          otpDigits:
            abhaVerifyStateRef.current.otpDigits ??
            screenData?.otpDigits ??
            Array(6).fill(""),
        };
        return (
          <AbhaVerifyOtp
            otpData={mergedOtpData}
            onVerifySuccess={handleVerifySuccess}
            onGoBack={goToCreate}
            onResendOtp={handleResendOtp}
            onVerifyOtp={handleVerifyOtpCallback}
            onStateChange={handleAbhaVerifyStateChange}
          />
        );
      }
      case ABHA_SCREENS.MOBILE_VERIFY_OTP:
        // Check if this is for mobile linking, address linking, number linking, or mobile update during ABHA creation
        const isMobileLinking = screenData?.isMobileLinking === true;
        const isAbhaAddressLinking = screenData?.isAbhaAddressLinking === true;
        const isAbhaNumberLinking = screenData?.isAbhaNumberLinking === true;
        const linkMethod = screenData?.linkMethod || "mobile";
        return (
          <MobileVerifyOtp
            data={screenData}
            onVerifyOtp={handleMobileVerifyOtpCallback}
            onGoBack={() =>
              isMobileLinking || isAbhaAddressLinking || isAbhaNumberLinking
                ? goToLink(linkMethod)
                : goToVerifyOtp(screenData)
            }
            isMobileLinking={isMobileLinking}
            isAbhaAddressLinking={isAbhaAddressLinking}
            isAbhaNumberLinking={isAbhaNumberLinking}
          />
        );
      case ABHA_SCREENS.LINK:
        return (
          <LinkPatientAbha
            selectedMethod={screenData?.linkMethod || "mobile"}
            onMethodChange={handleLinkNavigation}
            onCreateNew={handleShowCreate}
            onOtpSent={handleMobileLinkOtpSent}
            patientUniqueId={patientUniqueId || null}
          />
        );
      case ABHA_SCREENS.SUCCESS:
        return <AbhaSuccessScreen data={screenData} onClose={handleClose} />;
      case ABHA_SCREENS.CREATE_ADDRESS:
        return (
          <CreateNewAbhaAddress
            data={screenData}
            onCreateAddress={handleCreateAddressCallback}
            onSuccess={handleAbhaCreatedSuccess}
            onGoBack={() => goToAbhaAddress(screenData)}
          />
        );
      case ABHA_SCREENS.ABHA_ADDRESS:
        // Check if we should show success screen first
        if (screenData?.showSuccessScreen) {
          // For link_existing flow, show custom success message with ABHA ID
          if (flow === FLOW_TYPES.LINK_EXISTING && screenData?.linkedAddress) {
            return (
              <div className="abha_verified_container">
                <img src={SuccessGif} alt="SUCCESS GIF" width={200} />
                <div className="verified_label">ABHA ID: {screenData.linkedAddress} linked successfully</div>
              </div>
            );
          }
          return <AbhaSuccessScreen />;
        }
        return (
          <AbhaAddress
            data={screenData}
            onLinkAbha={handleAbhaAddressCallback}
            onCreateNew={() => goToCreateAddress(screenData)}
            isMobileLinking={screenData?.isMobileLinking}
            isAbhaAddressLinking={screenData?.isAbhaAddressLinking}
          />
        );
      case ABHA_SCREENS.OTP_VERIFICATION_CODE:
        return (
          <OtpVerificationCode
            data={screenData}
            onVerifyOtp={handleOtpVerificationCodeCallback}
            onGoBack={() => goToAbhaAddress(screenData)}
          />
        );
      default:
        return (
          <CreatePatientAbha
            onLinkOptionSelect={handleLinkNavigation}
            onOtpSent={handleOtpSent}
            patientUniqueId={patientUniqueId || null}
          />
        );
    }
  };

  if (error) {
    return (
      <div className="abha-standalone-error">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (flow === FLOW_TYPES.LINK_EXISTING && !patientUniqueId)) {
    return (
      <div className="abha-standalone-loading">
        <div className="loading-spinner" />
        <p>Initializing...</p>
      </div>
    );
  }

  return (
    <div className={`abha-standalone ${embedded ? "embedded" : ""}`}>
      <div className="abha-standalone-container">
        <div className="abha-standalone-header">
          <AbhaDrawerHeader
            headerText={"Create/ Link ABHA"}
            headerIcon={
              <img
                style={{ marginLeft: "4px" }}
                src={AbhaHeadingSVG}
                alt="ABHA heading"
              />
            }
            isNextButton={nextButtonConfig.show}
            onNext={handleNextClick}
            nextBtnTitle={nextButtonConfig.title}
            isNextDisable={isNextDisabled}
            isLoading={isNextLoading}
            onClose={handleClose}
            showCloseButton={true}
          />
        </div>
        <div className="abha-standalone-content">{renderScreen()}</div>
      </div>
    </div>
  );
};

export default AbhaStandalone;

