import api from "./axiosService";
import config from "../../config";

const baseUrl = { customBaseUrl: config.abha_api_url };

const ApiAbha = {};

ApiAbha.sendOtpForAadhaar = function (data) {
  return api.post(
    `/api/v1/abdm/m1/enrollmentByAadhaar/request-otp`,
    data,
    baseUrl
  );
};

ApiAbha.verifyOtpForAadhaar = function (data) {
  return api.post(
    `/api/v1/abdm/m1/enrollmentByAadhaar/verify-otp`,
    data,
    baseUrl
  );
};

ApiAbha.getSuggestionAbhaAddressList = function (data) {
  return api.post(
    `/api/v1/abdm/m1/enrollmentByAadhaar/suggestion-abhaAddressList`,
    data,
    baseUrl
  );
};

ApiAbha.checkAbhaAddressAvailability = function (data) {
  return api.post(
    `/api/v1/abdm/m1/enrollmentByAadhaar/isAbhaIdExists`,
    data,
    baseUrl
  );
};

ApiAbha.setAbhaAddress = function (data) {
  return api.post(
    `/api/v1/abdm/m1/enrollmentByAadhaar/set-abhaAddress`,
    data,
    baseUrl
  );
};

ApiAbha.sendOtpForAbhaAddress = function (data) {
  return api.post(
    `/api/v1/abdm/m1/enrollmentByAadhaar/abhaAddress-request-otp`,
    data,
    baseUrl
  );
};

ApiAbha.verifyOtpForAbhaAddress = function (data) {
  return api.post(
    `/api/v1/abdm/m1/enrollmentByAadhaar/abhaAddress-verify-otp`,
    data,
    baseUrl
  );
};

ApiAbha.verifyMobileUpdateOtp = function (data) {
  return api.post(
    `/api/v1/abdm/m1/enrollmentByAadhaar/mobileUpdate/verify-otp`,
    data,
    baseUrl
  );
};

ApiAbha.sendOtpForMobileLink = function (data) {
  return api.post(
    `/api/v1/abdm/m1/abhaVerification/mobile-request-otp`,
    data,
    baseUrl
  );
};

ApiAbha.verifyOtpForMobileLink = function (data) {
  return api.post(
    `/api/v1/abdm/m1/abhaVerification/mobile-verify-otp`,
    data,
    baseUrl
  );
};

ApiAbha.verifyAbhaAddressUser = function (data) {
  return api.post(
    `/api/v1/abdm/m1/abhaVerification/abhaAddress-user-verify`,
    data,
    baseUrl
  );
};

ApiAbha.sendOtpForAbhaAddressLink = function (data) {
  return api.post(
    `/api/v1/abdm/m1/abhaVerification/abhaAddress-request-otp`,
    data,
    baseUrl
  );
};

ApiAbha.verifyOtpForAbhaAddressLink = function (data) {
  return api.post(
    `/api/v1/abdm/m1/abhaVerification/abhaAddress-verify-otp`,
    data,
    baseUrl
  );
};

ApiAbha.sendOtpForAbhaNumberLink = function (data) {
  return api.post(
    `/api/v1/abdm/m1/abhaVerification/abhaNumber-request-otp`,
    data,
    baseUrl
  );
};

ApiAbha.verifyOtpForAbhaNumberLink = function (data) {
  return api.post(
    `/api/v1/abdm/m1/abhaVerification/abhaNumber-verify-otp`,
    data,
    baseUrl
  );
};

export default ApiAbha;