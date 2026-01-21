import React, { useState } from "react";
import CallIcon from "../../../assets/images/call.svg";
import FingerScanIcon from "../../../assets/images/finger-scan.svg";
import ReloadIcon from "../../../assets/images/ic_Reload.svg";
import CheckIcon from "../../../assets/images/check-icon.svg";
import ErrorText from "../common/ErrorText";

const BiometricVerification = ({
  data = {},
  onGetBiometric = () => {},
  onBiometricCaptureSuccess = () => {},
  onGoBack = () => {},
}) => {
  const { aadhaarNumber = "", patient_unique_id = "", fingerprintData: capturedData = null, biometricCaptured = false, mobileNumber: initialMobileNumber = "" } = data;
  const [mobileNumber, setMobileNumber] = useState(initialMobileNumber);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBiometricCaptured, setIsBiometricCaptured] = useState(biometricCaptured);
  const [fingerprintData, setFingerprintData] = useState(capturedData);

  React.useEffect(() => {
    if (biometricCaptured && capturedData) {
      setIsBiometricCaptured(true);
      setFingerprintData(capturedData);
    }
  }, [biometricCaptured, capturedData]);

  const handleMobileChange = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(cleaned);
    setHasError(false);
    setErrorMessage("");
  };

  const handleGetBiometric = () => {
    if (mobileNumber.length !== 10) {
      setHasError(true);
      setErrorMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    onGetBiometric({
      aadhaarNumber,
      mobileNumber,
      patient_unique_id,
    });
  };

  // This will be called when popup closes with success
  React.useEffect(() => {
    // This effect will be triggered when fingerprintData is set by parent
  }, []);

  const handleTryAgain = () => {
    setIsBiometricCaptured(false);
    setFingerprintData(null);
    // Reset will allow user to capture again - don't trigger success callback to avoid toast
  };

  return (
    <div className="abha_verify_otp">
      <div>
        <p className="abha_verify_title">Verify with Biometric</p>
        <p className="abha_verify_subtitle">
          Get the biometric of the user to verify the Aadhar
        </p>
      </div>

      <div className="abha_step_row_number" style={{ marginTop: "24px" }}>
        <div className="abha_step_marker">
          <span className="abha_step_number active">1</span>
          <span className="abha_step_line"></span>
        </div>
        <div className="abha_step_body_number">
          <label className="abha_step_label">
            Enter mobile number you want to link with ABHA
          </label>
          <div className={`abha_mobile_input ${hasError ? "error" : ""}`}>
            <span className="abha_mobile_icon">
              <img src={CallIcon} alt="Call" />
            </span>
            <span className="abha_mobile_code">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              className="abha_mobile_field"
              value={mobileNumber}
              onChange={(event) => handleMobileChange(event.target.value)}
              placeholder="Enter mobile number"
            />
          </div>
          {hasError && <ErrorText errorText={errorMessage} />}
        </div>
      </div>

      <div className="abha_step_row_number" style={{ marginTop: "20px" }}>
        <div className="abha_step_marker">
          <span className="abha_step_number">2</span>
        </div>
        <div className="abha_step_body_number">
          {!isBiometricCaptured ? (
            <button
              className="abha_biometric_capture_button"
              onClick={handleGetBiometric}
              disabled={mobileNumber.length !== 10}
            >
              <img src={FingerScanIcon} alt="finger scan" className="abha_biometric_icon" />
              <span>Get Biometric</span>
            </button>
          ) : (
            <div className="abha_biometric_success_container">
              <button
                className="abha_biometric_captured_button"
                disabled
              >
                <img src={CheckIcon} alt="check" className="abha_biometric_check_icon" />
                <span>Biometric Captured Successfully</span>
              </button>
              <button
                className="abha_biometric_try_again_button"
                onClick={handleTryAgain}
              >
                <span>Try Again</span>
                <img src={ReloadIcon} alt="retry" className="abha_biometric_retry_icon" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="border_top_container">
        <span className="go_back_top_border"></span>
      </div>
      <button type="button" className="abha_go_back" onClick={onGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default BiometricVerification;
