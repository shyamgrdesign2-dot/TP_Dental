import React, { useRef, useState } from "react";
import AdharImg from "../../../assets/images/adhar.png";
import AbhaNavigationCard from "../common/AbhaNavigationCard";
import LinkMobileIcon from "../../../assets/images/link-mobile-icon.svg";
import GlobalIcon from "../../../assets/images/global-icon.svg";
import PersonalCardIcon from "../../../assets/images/personal-card-icon.svg";
import ErrorText from "../common/ErrorText";
import ApiAbha from "../../../api/services/ApiAbha";

const CreatePatientAbha = ({
  onLinkOptionSelect = () => {},
  onOtpSent = () => {},
  patientUniqueId,
}) => {
  const [segments, setSegments] = useState(["", "", ""]);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const inputRefs = [useRef(null), useRef(null), useRef(null)];
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index, value) => {
    setHasError(false);
    setErrorMessage("");
    // allow only numbers
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    const nextSegments = [...segments];
    nextSegments[index] = cleaned;
    setSegments(nextSegments);

    // auto move to next input when 4 digits entered
    if (cleaned.length === 4 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && segments[index].length === 0 && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSendOtp = async () => {
    const aadhaarNumber = segments.join("");
    if (aadhaarNumber.length !== 12 || !agreeTerms) {
      setHasError(true);
      setErrorMessage("Invalid Aadhaar Number!");
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setErrorMessage("");

    try {
      const response = await ApiAbha.sendOtpForAadhaar({
        patient_unique_id: patientUniqueId,
        aadhaarNumber,
      });

      if (response?.success) {
        onOtpSent({
          aadhaarNumber,
          txnId: response.data?.txnId,
          accessToken: response.data?.accessToken,
          patient_unique_id: patientUniqueId,
          otpMessage: response.message,
        });
      } else {
        setHasError(true);
        setErrorMessage(
          response?.data?.message || "Failed to send OTP. Please try again."
        );
      }
    } catch (error) {
      setHasError(true);
      const errorMsg =
        error?.response?.data?.message ||
        "Failed to send OTP. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = segments.join("").length === 12;

  return (
    <div className="create_abha_patient">
      <div className="abha_patient_header_container">
        <div className="abha_patient_header">Create Patient ABHA</div>
        <div className="abha_patient_subHeader">
          By Entering Patients Aadhaar Number Below
        </div>
      </div>
      <div>
        <div className="adharcard">
          <div className="adharcard_img_container">
            <img src={AdharImg} className="adharcard_img" alt="abhar_img" />
          </div>
          <div className="adharcard_input_section">
            <p className="adharcard_label">Enter Your Aadhaar Number</p>
            <div className="adharcard_inputs_row">
              <div className="adharcard_inputs">
                {segments.map((segment, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    className={`adharcard_input ${hasError ? "error" : ""}`}
                    value={segment}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={inputRefs[index]}
                    placeholder="X X X X"
                  />
                ))}
              </div>
              {hasError && <ErrorText errorText={errorMessage} />}
            </div>
            <button
              className="abha_next_button adharcard_next_btn"
              disabled={!isValid || !agreeTerms || isLoading}
              onClick={handleSendOtp}
            >
              {isLoading ? "Sending OTP..." : "Next"}
            </button>
          </div>
        </div>
      </div>
      <label className="abha_terms_checkbox">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
        />
        <span>
          I agree with the terms and conditions{" "}
          <button type="button">View</button>
        </span>
      </label>
      <div className="abha_link_divider">
        <span className="right_line_divider"></span>
        <div className="divider_text">Or Link Existing ABHA</div>
        <span className="left_line_divider"></span>
      </div>

      <div className="abha_naviagtion_cards">
        <AbhaNavigationCard
          label={"Link Using Mobile Number"}
          icon={LinkMobileIcon}
          onClick={() => onLinkOptionSelect("mobile")}
        />
        <AbhaNavigationCard
          label={"Link Using ABHA Address"}
          icon={GlobalIcon}
          onClick={() => onLinkOptionSelect("address")}
        />
        <AbhaNavigationCard
          label={"Link Using ABHA Number"}
          icon={PersonalCardIcon}
          onClick={() => onLinkOptionSelect("number")}
        />
      </div>
    </div>
  );
};

export default CreatePatientAbha;
