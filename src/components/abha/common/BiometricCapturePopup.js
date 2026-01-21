import React, { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import Lottie from "lottie-react";
import AadharIcon from "../../../assets/images/aadhaar-icon.svg";
import BiometricAnimation from "../../../assets/images/Biometric.json";

const BiometricCapturePopup = ({
  open = false,
  onClose = () => {},
  onCaptureSuccess = () => {},
  onCaptureError = () => {},
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [status, setStatus] = useState("");
  const [captureStatus, setCaptureStatus] = useState("ready"); // "ready" | "captured" | "error"
  const finalUrlRef = useRef("");
  const MethodCaptureRef = useRef("");
  const deviceTypeRef = useRef("F"); // Default to 'F' for fingerprint devices
  const jqueryLoadedRef = useRef(false);
  const cryptoJSLoadedRef = useRef(false);
  const clientTimeoutRef = useRef(null);

  // Load jQuery and CryptoJS if not available
  useEffect(() => {
    // Load jQuery
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

    // Load CryptoJS
    if (!window.CryptoJS && !cryptoJSLoadedRef.current) {
      const cryptoScript = document.createElement("script");
      // Use jsDelivr CDN which is more reliable
      cryptoScript.src = "https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.js";
      cryptoScript.crossOrigin = "anonymous";
      cryptoScript.onload = () => {
        cryptoJSLoadedRef.current = true;
        console.log("CryptoJS loaded successfully");
      };
      cryptoScript.onerror = () => {
        console.warn("CryptoJS failed to load from jsDelivr, trying alternative CDN...");
        // Try alternative CDN
        const altScript = document.createElement("script");
        altScript.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
        altScript.crossOrigin = "anonymous";
        altScript.onload = () => {
          cryptoJSLoadedRef.current = true;
          console.log("CryptoJS loaded successfully from alternative CDN");
        };
        altScript.onerror = () => {
          console.error("CryptoJS failed to load from all CDNs. WADH generation will not work.");
        };
        document.head.appendChild(altScript);
      };
      document.head.appendChild(cryptoScript);
      cryptoJSLoadedRef.current = true; // Set flag to prevent multiple loads
    } else if (window.CryptoJS) {
      cryptoJSLoadedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (open) {
      setCaptureStatus("ready");
      setStatus("");
      setIsCapturing(false);
      // Clear any existing timeout when modal opens
      if (clientTimeoutRef.current) {
        clearTimeout(clientTimeoutRef.current);
        clientTimeoutRef.current = null;
      }
      if (jqueryLoadedRef.current) {
        // Wait a bit for jQuery to be ready
        setTimeout(() => {
          discoverDevice();
        }, 500);
      } else {
        // Wait for jQuery to load
        const checkJQuery = setInterval(() => {
          if (window.$) {
            window.$.support.cors = true;
            jqueryLoadedRef.current = true;
            clearInterval(checkJQuery);
            discoverDevice();
          }
        }, 100);
        
        return () => clearInterval(checkJQuery);
      }
    } else {
      // Clear timeout when modal closes
      if (clientTimeoutRef.current) {
        clearTimeout(clientTimeoutRef.current);
        clientTimeoutRef.current = null;
      }
    }
  }, [open]);

  /**
   * Generate WADH using Mantra formula for ABHA compliance
   * Formula: wadh = Base64(SHA256('2.5' + ra + rc + lr + de + pfr))
   * Where: ra = deviceType ('F' for fingerprint), rc = 'Y', lr = 'Y', de = 'N', pfr = 'N'
   */
  const generateWadh = (deviceType) => {
    if (!window.CryptoJS) {
      console.error("CryptoJS not available. Cannot generate WADH.");
      return "";
    }

    const ra = deviceType || 'F'; // Device type: 'F' for fingerprint devices
    const rc = 'Y';
    const lr = 'Y'; // CRITICAL: Must be 'Y' for ABHA compliance
    const de = 'N';
    const pfr = 'N';

    const text = '2.5' + ra + rc + lr + de + pfr;
    
    // Generate WADH using exact format: Base64(SHA256(text))
    const wadh = window.CryptoJS.enc.Base64.stringify(window.CryptoJS.SHA256(text));
    
    console.log("=== WADH Generation ===");
    console.log("Device Type (ra):", ra);
    console.log("Input text:", text);
    console.log("Generated WADH:", wadh);
    console.log("WADH Length:", wadh.length);
    console.log("======================");
    
    if (!wadh || wadh === "") {
      console.error("ERROR: WADH generation returned empty string!");
    }
    
    return wadh;
  };

  const discoverDevice = () => {
    var primaryUrl = "http://127.0.0.1:";
    
    // Check if portal is HTTPS
    try {
      var protocol = window.location.href;
      if (protocol.indexOf("https") >= 0) {
        primaryUrl = "https://127.0.0.1:";
      }
    } catch (e) {}

    var successFlag = 0;
    
    // Scan ports 11100 to 11120
    for (var i = 11100; i <= 11120; i++) {
      setStatus("Discovering RD service on port: " + i);
      
      // Use jQuery if available, otherwise use fetch
      if (window.$) {
        window.$.ajax({
          type: "RDSERVICE",
          async: false,
          crossDomain: true,
          url: primaryUrl + i.toString(),
          contentType: "text/xml; charset=utf-8",
          processData: false,
          cache: false,
          success: function (data) {
            var $doc = window.$.parseXML(data);
            var serviceInfo = window.$($doc).find('RDService').attr('info');
            
            if (serviceInfo && serviceInfo.indexOf('Mantra') >= 0) {
              finalUrlRef.current = primaryUrl + i.toString();
              
              // Detect device type from service info
              const deviceInfo = serviceInfo.toUpperCase();
              if (deviceInfo.indexOf('MFS100') >= 0 || 
                  deviceInfo.indexOf('MFS110') >= 0 || 
                  deviceInfo.indexOf('EPI1000') >= 0 || 
                  deviceInfo.indexOf('IRITECH') >= 0 || 
                  deviceInfo.indexOf('MIS100V2') >= 0) {
                deviceTypeRef.current = 'F';
              } else {
                deviceTypeRef.current = 'F'; // Default to 'F' for Mantra devices
              }
              
              window.$($doc).find('Interface').each(function() {
                var path = window.$(this).attr('path');
                if (path === "/rd/capture") {
                  MethodCaptureRef.current = path;
                }
              });
              
              successFlag = 1;
              setStatus("Device discovered successfully");
              return;
            }
          },
          error: function () {
            // Continue to next port
          }
        });
      } else {
        // Fallback: try fetch (may not work due to CORS)
        fetch(primaryUrl + i.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'text/xml; charset=utf-8',
          },
        })
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, "text/xml");
          const serviceInfo = xmlDoc.querySelector('RDService')?.getAttribute('info');
          
          if (serviceInfo && serviceInfo.indexOf('Mantra') >= 0) {
            finalUrlRef.current = primaryUrl + i.toString();
            
            // Detect device type from service info
            const deviceInfo = serviceInfo.toUpperCase();
            if (deviceInfo.indexOf('MFS100') >= 0 || 
                deviceInfo.indexOf('MFS110') >= 0 || 
                deviceInfo.indexOf('EPI1000') >= 0 || 
                deviceInfo.indexOf('IRITECH') >= 0 || 
                deviceInfo.indexOf('MIS100V2') >= 0) {
              deviceTypeRef.current = 'F';
            } else {
              deviceTypeRef.current = 'F'; // Default to 'F' for Mantra devices
            }
            
            const interfaces = xmlDoc.querySelectorAll('Interface');
            interfaces.forEach(iface => {
              const path = iface.getAttribute('path');
              if (path === "/rd/capture") {
                MethodCaptureRef.current = path;
              }
            });
            successFlag = 1;
            setStatus("Device discovered successfully");
          }
        })
        .catch(() => {
          // Continue to next port
        });
      }
      
      if (successFlag === 1) {
        break;
      }
    }
    
    if (successFlag === 0) {
      setStatus("Device discovery failed. Please ensure RD Service is running.");
      onCaptureError("Device discovery failed. Please ensure Mantra RD Service is running.");
      return;
    }

    // Start capture after discovery
    setTimeout(() => {
      captureFingerprint();
    }, 500);
  };

  const captureFingerprint = () => {
    if (!finalUrlRef.current || !MethodCaptureRef.current) {
      setStatus("Device not discovered. Please try again.");
      onCaptureError("Device not discovered");
      return;
    }

    setIsCapturing(true);
    setStatus("Capturing fingerprint... Please place your thumb on the scanner.");
    
    // Client-side timeout safety (35 seconds = device timeout 30s + 5s buffer)
    clientTimeoutRef.current = setTimeout(() => {
      setStatus("Capture timeout - Please try again");
      setIsCapturing(false);
      onCaptureError("Capture timeout");
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 35000);

    // Ensure CryptoJS is loaded before generating WADH
    if (!window.CryptoJS) {
      // Wait for CryptoJS to load (check every 100ms, timeout after 10 seconds)
      let checkCount = 0;
      const maxChecks = 100; // 10 seconds max wait
      
      const checkCryptoJS = setInterval(() => {
        checkCount++;
        if (window.CryptoJS) {
          clearInterval(checkCryptoJS);
          console.log("CryptoJS detected, proceeding with capture");
          proceedWithCapture();
        } else if (checkCount >= maxChecks) {
          clearInterval(checkCryptoJS);
          console.error("CryptoJS library not loaded after 10 seconds. Cannot generate WADH.");
          setStatus("CryptoJS library not loaded. Cannot generate WADH.");
          setIsCapturing(false);
          onCaptureError("CryptoJS library not available");
          return;
        }
      }, 100);
      
      return;
    }

    proceedWithCapture();

    function proceedWithCapture() {
      var fCount = "1";
      var fType = "2"; // FMR+FIR (Required for ABHA compliance)
      var timeout = "30000"; // 30 seconds
      var pidVer = "2.0";
      var env = "P"; // Production

      // Generate WADH using device type (MUST happen before capture)
      const wadh = generateWadh(deviceTypeRef.current);
      
      // Validate WADH was generated
      if (!wadh || wadh === "") {
        console.error("ERROR: WADH is empty! Cannot proceed with capture.");
        setStatus("WADH generation failed. Cannot capture fingerprint.");
        setIsCapturing(false);
        onCaptureError("WADH generation failed");
        return;
      }
    
      // Build XML request with WADH attribute (MUST be included, format matches user's example)
      var xmlRequest = '<?xml version="1.0"?>' +
        '<PidOptions ver="1.0">' +
        '<Opts ' +
        'env="' + env + '" ' +
        'fCount="' + fCount + '" ' +
        'fType="' + fType + '" ' +
        'format="0" ' +
        'iCount="0" ' +
        'pCount="0" ' +
        'pidVer="' + pidVer + '" ' +
        'posh="UNKNOWN" ' +
        'timeout="' + timeout + '" ' +
        'wadh="' + wadh + '" ' +
        '/>' +
        '<CustOpts>' +
        '<Param name="mantrakey" value="" />' +
        '</CustOpts>' +
        '</PidOptions>';
      
      console.log("=== Capture Request XML ===");
      console.log("Device Type:", deviceTypeRef.current);
      console.log("WADH:", wadh);
      console.log("WADH Length:", wadh.length);
      console.log("fType:", fType, "(FMR+FIR)");
      console.log("XML Request:", xmlRequest);
      console.log("==========================");

      if (window.$) {
        window.$.ajax({
          type: "CAPTURE",
          async: false,
          crossDomain: true,
          url: finalUrlRef.current + MethodCaptureRef.current,
          data: xmlRequest,
          contentType: "text/xml; charset=utf-8",
          processData: false,
          success: function (data) {
            if (clientTimeoutRef.current) {
              clearTimeout(clientTimeoutRef.current);
              clientTimeoutRef.current = null;
            }
            handleCaptureSuccess(data);
          },
          error: function (jqXHR, ajaxOptions, thrownError) {
            if (clientTimeoutRef.current) {
              clearTimeout(clientTimeoutRef.current);
              clientTimeoutRef.current = null;
            }
            handleCaptureError(jqXHR, thrownError);
          }
        });
      } else {
        // Fallback: try fetch (may not work due to CORS and custom method)
        fetch(finalUrlRef.current + MethodCaptureRef.current, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/xml; charset=utf-8',
          },
          body: xmlRequest,
        })
        .then(response => response.text())
        .then(data => {
          if (clientTimeoutRef.current) {
            clearTimeout(clientTimeoutRef.current);
            clientTimeoutRef.current = null;
          }
          handleCaptureSuccess(data);
        })
        .catch(error => {
          if (clientTimeoutRef.current) {
            clearTimeout(clientTimeoutRef.current);
            clientTimeoutRef.current = null;
          }
          handleCaptureError(null, error.message);
        });
      }
    }
  };

  const handleCaptureSuccess = (xmlResponse) => {
    try {
      var $doc;
      if (window.$) {
        $doc = window.$.parseXML(xmlResponse);
          var errCode = window.$($doc).find('Resp').attr('errCode');
          var errInfo = window.$($doc).find('Resp').attr('errInfo');
        
        if (errCode === "0") {
          var fingerprintData = extractFingerprintData($doc, xmlResponse);
          
          // Log fingerprint data to console
          console.log("=== Fingerprint Capture Success ===");
          console.log("Fingerprint ID (PID):", fingerprintData.pid);
          console.log("PID Data Length:", fingerprintData.pid?.length || 0);
          console.log("WADH:", fingerprintData.wadh || "N/A");
          console.log("Format:", fingerprintData.format);
          console.log("Timestamp:", fingerprintData.timestamp);
          console.log("Full XML Response:", xmlResponse);
          console.log("Full XML Base64:", fingerprintData.fullXmlBase64);
          console.log("===================================");
          
          setCaptureStatus("captured");
          setStatus("Captured Successfully");
          setIsCapturing(false);
          
          // Close popup after 2 seconds and call success callback
          setTimeout(() => {
            onCaptureSuccess(fingerprintData);
            onClose();
          }, 2000);
        } else {
          setCaptureStatus("error");
          setStatus("Capture failed: " + errInfo);
          setIsCapturing(false);
          onCaptureError(errInfo);
          
          // Check if error is timeout related and close popup
          const errorInfoLower = (errInfo || "").toLowerCase();
          if (errorInfoLower.includes("timeout") || errorInfoLower.includes("timed out")) {
            setTimeout(() => {
              onClose();
            }, 1500);
          }
        }
      } else {
        // Parse XML without jQuery
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
        const resp = xmlDoc.querySelector('Resp');
        const errCode = resp?.getAttribute('errCode');
        const errInfo = resp?.getAttribute('errInfo');
        
        if (errCode === "0") {
          const fingerprintData = extractFingerprintDataXML(xmlDoc, xmlResponse);
          
          // Log fingerprint data to console
          console.log("=== Fingerprint Capture Success ===");
          console.log("Fingerprint ID (PID):", fingerprintData.pid);
          console.log("PID Data Length:", fingerprintData.pid?.length || 0);
          console.log("WADH:", fingerprintData.wadh || "N/A");
          console.log("Format:", fingerprintData.format);
          console.log("Timestamp:", fingerprintData.timestamp);
          console.log("Full XML Response:", xmlResponse);
          console.log("Full XML Base64:", fingerprintData.fullXmlBase64);
          console.log("===================================");
          
          setCaptureStatus("captured");
          setStatus("Captured Successfully");
          setIsCapturing(false);
          
          // Close popup after 2 seconds and call success callback
          setTimeout(() => {
            onCaptureSuccess(fingerprintData);
            onClose();
          }, 2000);
        } else {
          setStatus("Capture failed: " + errInfo);
          setIsCapturing(false);
          onCaptureError(errInfo);
          
          // Check if error is timeout related and close popup
          const errorInfoLower = (errInfo || "").toLowerCase();
          if (errorInfoLower.includes("timeout") || errorInfoLower.includes("timed out")) {
            setTimeout(() => {
              onClose();
            }, 1500);
          }
        }
      }
    } catch (e) {
      console.error("Error parsing fingerprint response:", e);
      setStatus("Error parsing response: " + e.message);
      setIsCapturing(false);
      onCaptureError("Error parsing response");
    }
  };

  const extractFingerprintData = ($doc, xmlResponse) => {
    // Extract PID from <Data type="X"> tag (base64 encoded)
    var pidData = window.$($doc).find('Data[type="X"]').text() || window.$($doc).find('Data').text() || '';
    var wadh = window.$($doc).find('Data').attr('wadh') || '';
    var format = window.$($doc).find('Data').attr('type') || 'X';
    
    // Also try to extract from <Pid> tag if available
    if (!pidData) {
      pidData = window.$($doc).find('Pid').text() || '';
    }
    
    // Base64 encode the full XML response for API
    const fullXmlBase64 = btoa(unescape(encodeURIComponent(xmlResponse)));
    
    return {
      pid: pidData,
      fullXmlResponse: xmlResponse, // Store full XML
      fullXmlBase64: fullXmlBase64, // Base64 encoded full XML for API
      wadh: wadh,
      format: format,
      timestamp: new Date().toISOString()
    };
  };

  const extractFingerprintDataXML = (xmlDoc, xmlResponse) => {
    // Extract PID from <Data type="X"> tag (base64 encoded)
    const dataElement = xmlDoc.querySelector('Data[type="X"]') || xmlDoc.querySelector('Data');
    const pidData = dataElement?.textContent || '';
    const wadh = dataElement?.getAttribute('wadh') || '';
    const format = dataElement?.getAttribute('type') || 'X';
    
    // Also try to extract from <Pid> tag if available
    let finalPidData = pidData;
    if (!finalPidData) {
      const pidElement = xmlDoc.querySelector('Pid');
      finalPidData = pidElement?.textContent || '';
    }
    
    // Base64 encode the full XML response for API
    const fullXmlBase64 = btoa(unescape(encodeURIComponent(xmlResponse)));
    
    return {
      pid: finalPidData,
      fullXmlResponse: xmlResponse, // Store full XML
      fullXmlBase64: fullXmlBase64, // Base64 encoded full XML for API
      wadh: wadh,
      format: format,
      timestamp: new Date().toISOString()
    };
  };

  const handleCaptureError = (jqXHR, thrownError) => {
    var errorMsg = "Capture failed";
    if (jqXHR) {
      if (jqXHR.status === 0) {
        errorMsg = 'Service Unavailable - Please ensure RD Service is running';
      } else if (jqXHR.status == 404) {
        errorMsg = 'RD Service endpoint not found';
      } else if (jqXHR.status == 500) {
        errorMsg = 'Internal Server Error - RD Service error';
      } else {
        errorMsg = 'Error: ' + (thrownError || 'Unknown error');
      }
    } else {
      errorMsg = thrownError || 'Unknown error';
    }
    
    setStatus(errorMsg);
    setIsCapturing(false);
    onCaptureError(errorMsg);
    
    // Check if error is timeout related and close popup
    const errorMsgLower = errorMsg.toLowerCase();
    if (errorMsgLower.includes("timeout") || errorMsgLower.includes("timed out")) {
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      centered
      width={635}
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
