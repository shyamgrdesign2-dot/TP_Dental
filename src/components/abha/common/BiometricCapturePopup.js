import React, { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import Lottie from "lottie-react";
import AadharIcon from "../../../assets/images/aadhaar-icon.svg";
import BiometricAnimation from "../../../assets/images/Biometric.json";
import { discoverDevice, captureFingerprint } from "./rdClient";

const PARENT_SDK_PING_TIMEOUT_MS = 2000;

const BiometricCapturePopup = ({
  open = false,
  onClose = () => {},
  onCaptureSuccess = () => {},
  onCaptureError = () => {},
  embedded = false,
  parentOrigin = null,
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [status, setStatus] = useState("");
  const [captureStatus, setCaptureStatus] = useState("ready"); // "ready" | "captured" | "error"
  const deviceInfoRef = useRef(null); // Store discovered device info
  const jqueryLoadedRef = useRef(false);
  const abortControllerRef = useRef(null);
  const parentSdkUsedRef = useRef(false);
  const messageListenerRef = useRef(null);
  const pingTimeoutRef = useRef(null);

  const isInIframe = typeof window !== "undefined" && window.parent !== window;
  const shouldTryParentSdk = open && embedded && isInIframe;

  useEffect(() => {
    if (!window.$ && !jqueryLoadedRef.current) {
      const jqueryScript = document.createElement("script");
      jqueryScript.src = "https://code.jquery.com/jquery-1.12.4.min.js";
      jqueryScript.integrity = "sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=";
      jqueryScript.crossOrigin = "anonymous";
      jqueryScript.onload = () => {
        window.$.support.cors = true;
        jqueryLoadedRef.current = true;
      };
      jqueryScript.onerror = () => {
        console.warn("jQuery failed to load. Mantra RD Service may not work properly.");
      };
      document.head.appendChild(jqueryScript);
      jqueryLoadedRef.current = true;
    } else if (window.$) {
      window.$.support.cors = true;
      jqueryLoadedRef.current = true;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (pingTimeoutRef.current) {
        clearTimeout(pingTimeoutRef.current);
        pingTimeoutRef.current = null;
      }
      if (messageListenerRef.current && window.removeEventListener) {
        window.removeEventListener("message", messageListenerRef.current);
        messageListenerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (open) {
      setCaptureStatus("ready");
      setStatus("");
      setIsCapturing(false);
      deviceInfoRef.current = null;
      parentSdkUsedRef.current = false;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      if (shouldTryParentSdk) {
        if (pingTimeoutRef.current) {
          clearTimeout(pingTimeoutRef.current);
          pingTimeoutRef.current = null;
        }
        if (messageListenerRef.current) {
          window.removeEventListener("message", messageListenerRef.current);
          messageListenerRef.current = null;
        }
        setStatus("Checking for parent biometric support...");
        const targetOrigin = parentOrigin || "*";

        const handleParentMessage = (event) => {
          if (event.source !== window.parent) return;
          const data = event.data;
          if (!data || typeof data.type !== "string") return;

          if (data.type === "ABHA_SDK_PONG") {
            if (pingTimeoutRef.current) {
              clearTimeout(pingTimeoutRef.current);
              pingTimeoutRef.current = null;
            }
            window.removeEventListener("message", handleParentMessage);
            if (messageListenerRef.current === handleParentMessage) messageListenerRef.current = null;
            parentSdkUsedRef.current = true;
            setStatus("Requesting capture from parent page...");
            setIsCapturing(true);
            window.parent.postMessage({ type: "ABHA_REQUEST_BIOMETRIC" }, targetOrigin);
            const captureListener = (e) => {
              if (e.source !== window.parent) return;
              const d = e.data;
              if (!d || typeof d.type !== "string") return;
              if (d.type === "ABHA_BIOMETRIC_CAPTURED") {
                window.removeEventListener("message", captureListener);
                messageListenerRef.current = null;
                setCaptureStatus("captured");
                setStatus("Captured Successfully");
                setIsCapturing(false);
                setTimeout(() => {
                  onCaptureSuccess(d.data);
                  onClose();
                }, 2000);
              } else if (d.type === "ABHA_BIOMETRIC_ERROR") {
                window.removeEventListener("message", captureListener);
                messageListenerRef.current = null;
                setCaptureStatus("error");
                const errMsg = d.error?.message || "Capture failed";
                setStatus(errMsg);
                setIsCapturing(false);
                onCaptureError(errMsg);
                setTimeout(() => onClose(), 3000);
              }
            };
            messageListenerRef.current = captureListener;
            window.addEventListener("message", captureListener);
            return;
          }
        };

        window.addEventListener("message", handleParentMessage);
        messageListenerRef.current = handleParentMessage;
        window.parent.postMessage({ type: "ABHA_SDK_PING" }, targetOrigin);

        pingTimeoutRef.current = setTimeout(() => {
          pingTimeoutRef.current = null;
          if (parentSdkUsedRef.current) return;
          window.removeEventListener("message", handleParentMessage);
          if (messageListenerRef.current === handleParentMessage) messageListenerRef.current = null;
          setStatus("Using in-page capture...");
          startInIframeCapture();
        }, PARENT_SDK_PING_TIMEOUT_MS);
        return;
      }

      startInIframeCapture();
    } else {
      if (pingTimeoutRef.current) {
        clearTimeout(pingTimeoutRef.current);
        pingTimeoutRef.current = null;
      }
      if (messageListenerRef.current) {
        window.removeEventListener("message", messageListenerRef.current);
        messageListenerRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      deviceInfoRef.current = null;
    }
  }, [open, shouldTryParentSdk]);

  function startInIframeCapture() {
    const startDiscovery = () => {
      if (window.$) {
        window.$.support.cors = true;
        jqueryLoadedRef.current = true;
        handleDiscoverAndCapture();
      } else if (jqueryLoadedRef.current) {
        setTimeout(() => {
          if (window.$) handleDiscoverAndCapture();
        }, 500);
      } else {
        const checkJQuery = setInterval(() => {
          if (window.$) {
            window.$.support.cors = true;
            jqueryLoadedRef.current = true;
            clearInterval(checkJQuery);
            handleDiscoverAndCapture();
          }
        }, 100);
      }
    };
    startDiscovery();
  }

  const handleDiscoverAndCapture = async () => {
    try {
      setStatus("Discovering device...");
      const deviceInfo = await discoverDevice((statusMsg) => {
        if (!statusMsg.includes("port:")) {
          setStatus(statusMsg);
        }
      });
      deviceInfoRef.current = deviceInfo;
      setTimeout(() => {
        handleCapture();
      }, 500);
    } catch (error) {
      setCaptureStatus("error");
      const errorMsg = error.message || "Error connecting: Please check device connectivity";
      setStatus(errorMsg);
      setIsCapturing(false);
      onCaptureError(errorMsg);
      
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  const handleCapture = async () => {
    if (!deviceInfoRef.current) {
      setStatus("Device not discovered. Please try again.");
      onCaptureError("Device not discovered");
      return;
    }

    setIsCapturing(true);
    setStatus("Capturing fingerprint... Please place your thumb on the scanner.");

    try {
      const fingerprintData = await captureFingerprint(
        deviceInfoRef.current.url,
        deviceInfoRef.current.capturePath,
        deviceInfoRef.current.deviceType,
        (statusMsg) => {
          setStatus(statusMsg);
        }
      );

      setCaptureStatus("captured");
      setStatus("Captured Successfully");
      setIsCapturing(false);

      setTimeout(() => {
        onCaptureSuccess(fingerprintData);
        onClose();
      }, 2000);
    } catch (error) {
      setCaptureStatus("error");
      const errorMsg = error.message || "Capture failed";
      setStatus(errorMsg);
      setIsCapturing(false);
      
      onCaptureError(errorMsg);

      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      centered
      width={445}
      className="biometric_capture_modal"
      zIndex={1200}
      maskClosable={false}
      closeIcon={
        <span className="biometric_modal_close_icon">×</span>
      }
    >
      <div className="biometric_capture_content">
        <div className="biometric_capture_header">
          <div className="biometric_capture_header_row">
            <img src={AadharIcon} alt="Aadhar" className="biometric_capture_header_icon" />
            <h3 className="biometric_capture_title">Aadhaar Biometric</h3>
          </div>
          <div className="biometric_capture_header_divider"></div>
        </div>

        <div className="biometric_capture_animation_area">
          <div className="biometric_animation_container">
            <Lottie 
              animationData={BiometricAnimation} 
              loop={true}
              autoplay={true}
              className="biometric_animation_lottie"
            />
          </div>
        </div>

        <div className={`biometric_capture_status_banner ${captureStatus === "captured" ? "success" : "ready"}`}>
          {captureStatus === "captured" ? "Captured Successfully" : "Biometric ready to capture"}
        </div>

        {status && (
          <div className="biometric_capture_status_text">
            {status}
          </div>
        )}

        <div className="biometric_capture_note">
          <div className="biometric_note_title"><strong>Note:</strong></div>
          <ul className="biometric_note_list">
            <li>Place the <strong>patient's thumb</strong> in the Biometric scanner.</li>
            <li>Biometric details will be <strong>captured automatically.</strong></li>
            <li><strong>Do not close</strong> the popup while it's capturing.</li>
            <li>This Popup <strong>will close automatically</strong> once the capture is complete.</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default BiometricCapturePopup;
