import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "antd";
import smartPad from "../assets/images/smartPad.svg";

/**
 * PrimaryActionButton Component
 * 
 * A reusable component that renders a primary action button with dropdown for additional options.
 * Handles the priority-based rendering: SmartRx > VoiceRx > SnapRx > Consult
 * 
 * @param {Object} props
 * @param {boolean} props.isSmartRxAccessible - Whether SmartRx is accessible
 * @param {boolean} props.isSnapRxAccessible - Whether SnapRx is accessible
 * @param {boolean} props.isVoiceRxAccessible - Whether VoiceRx is accessible (isFreeVoiceRxUser || tp_monetization_enable)
 * @param {boolean} props.isVoiceRxPaid - Whether VoiceRx is paid (affects button text)
 * @param {Function} props.onSmartRxClick - Handler for SmartRx click
 * @param {Function} props.onSnapRxClick - Handler for SnapRx click
 * @param {Function} props.onVoiceRxClick - Handler for VoiceRx click
 * @param {Function} props.onConsultClick - Handler for Consult click
 * @param {Object} props.patient - Patient/record data to pass to handlers
 * @param {Function} props.setAutoCompleteFlag - Optional: Function to set auto complete flag (for WalkInConsultation)
 * @param {string} props.buttonStyle - Button style variant: 'walkin' (default) or 'cardiology'
 * @param {Function} props.onClose - Optional: Function to call when closing (for Cardiology modal)
 */
const PrimaryActionButton = ({
  isSmartRxAccessible = false,
  isSnapRxAccessible = false,
  isVoiceRxAccessible = false,
  isVoiceRxPaid = false,
  onSmartRxClick,
  onSnapRxClick,
  onVoiceRxClick,
  onConsultClick,
  patient,
  setAutoCompleteFlag,
  buttonStyle = "walkin", // 'walkin' or 'cardiology'
  onClose,
}) => {
  // Check if mobile (screen width < 768)
  const [isMobileScreen, setIsMobileScreen] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Determine available options based on priority: SmartRx > VoiceRx > SnapRx > Consult
  const allAvailableOptions = [];
  
  if (isSmartRxAccessible) {
    allAvailableOptions.push({ type: "smartrx", label: "SmartRx", handler: onSmartRxClick });
  }
  if (isVoiceRxAccessible) {
    allAvailableOptions.push({ type: "voicerx", label: "Voice Rx", handler: onVoiceRxClick });
  }
  if (isSnapRxAccessible) {
    allAvailableOptions.push({ type: "snaprx", label: "SnapRx", handler: onSnapRxClick });
  }
  // Consult is always available as fallback
  allAvailableOptions.push({ type: "consult", label: "Consult", handler: onConsultClick });

  // Primary button is the first available option (highest priority)
  const primaryOption = allAvailableOptions[0];
  // Dropdown options are the remaining ones in priority order
  const dropdownOptions = allAvailableOptions.slice(1);

  // Generate dropdown menu items - matching original getMenuItems logic
  const getMenuItems = () => {
    if (dropdownOptions.length === 0) return [];

    const items = [];
    const snapRxOption = dropdownOptions.find(opt => opt.type === "snaprx");
    const voiceRxOption = dropdownOptions.find(opt => opt.type === "voicerx");
    const consultOption = dropdownOptions.find(opt => opt.type === "consult");

    // If primary is SmartRx and SnapRx is available, add SnapRx first
    if (primaryOption.type === "smartrx" && snapRxOption) {
      items.push({
        label: (
          <span
            style={{
              display: "inline-block",
              cursor: "pointer",
            }}
            onClick={() => {
              if (setAutoCompleteFlag) setAutoCompleteFlag(false);
              if (onClose) onClose();
              if (snapRxOption.handler && patient) snapRxOption.handler(patient);
            }}
          >
            SnapRx
          </span>
        ),
        key: "snaprx",
      });
    }

    // Handle VoiceRx and Consult based on isVoiceRxPaid and what's available
    if (isVoiceRxAccessible && primaryOption.type !== "voicerx") {
      // VoiceRx is accessible and not primary
      if (voiceRxOption && consultOption) {
        // Both VoiceRx and Consult in dropdown
        if (isVoiceRxPaid) {
          // VoiceRx first, then Consult
          items.push({
            label: (
              <span
                style={{
                  display: "inline-block",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (setAutoCompleteFlag) setAutoCompleteFlag(false);
                  if (onClose) onClose();
                  if (voiceRxOption.handler && patient) voiceRxOption.handler(patient);
                }}
              >
                Voice Rx
              </span>
            ),
            key: "voicerx",
          });
          items.push({
            label: (
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (setAutoCompleteFlag) setAutoCompleteFlag(false);
                  if (onClose) onClose();
                  if (consultOption.handler && patient) consultOption.handler(patient);
                }}
              >
                Consult
              </span>
            ),
            key: "consult",
          });
        } else {
          // Consult first, then VoiceRx
          items.push({
            label: (
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (setAutoCompleteFlag) setAutoCompleteFlag(false);
                  if (onClose) onClose();
                  if (consultOption.handler && patient) consultOption.handler(patient);
                }}
              >
                Consult
              </span>
            ),
            key: "consult",
          });
          items.push({
            label: (
              <span
                style={{
                  display: "inline-block",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (setAutoCompleteFlag) setAutoCompleteFlag(false);
                  if (onClose) onClose();
                  if (voiceRxOption.handler && patient) voiceRxOption.handler(patient);
                }}
              >
                Voice Rx
              </span>
            ),
            key: "voicerx",
          });
        }
      } else if (voiceRxOption && !consultOption) {
        // Only VoiceRx in dropdown (Consult is primary)
        items.push({
          label: (
            <span
              style={{
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={() => {
                if (setAutoCompleteFlag) setAutoCompleteFlag(false);
                if (onClose) onClose();
                if (voiceRxOption.handler && patient) voiceRxOption.handler(patient);
              }}
            >
              Voice Rx
            </span>
          ),
          key: "voicerx",
        });
      } else if (consultOption && !voiceRxOption) {
        // Only Consult in dropdown (VoiceRx is primary or not accessible)
        items.push({
          label: (
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                if (setAutoCompleteFlag) setAutoCompleteFlag(false);
                if (onClose) onClose();
                if (consultOption.handler && patient) consultOption.handler(patient);
              }}
            >
              Consult
            </span>
          ),
          key: "consult",
        });
      }
    } else {
      // VoiceRx is not accessible or is primary - add remaining options
      // Add SnapRx if not already added and it's in dropdown
      if (snapRxOption && primaryOption.type !== "smartrx") {
        items.push({
          label: (
            <span
              style={{
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={() => {
                if (setAutoCompleteFlag) setAutoCompleteFlag(false);
                if (onClose) onClose();
                if (snapRxOption.handler && patient) snapRxOption.handler(patient);
              }}
            >
              SnapRx
            </span>
          ),
          key: "snaprx",
        });
      }
      
      // Add Consult if it's in dropdown
      if (consultOption) {
        items.push({
          label: (
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                if (setAutoCompleteFlag) setAutoCompleteFlag(false);
                if (onClose) onClose();
                if (consultOption.handler && patient) consultOption.handler(patient);
              }}
            >
              Consult
            </span>
          ),
          key: "consult",
        });
      }
    }

    return items;
  };

  // Handle primary button click
  const handlePrimaryClick = () => {
    if (setAutoCompleteFlag) {
      setAutoCompleteFlag(false);
    }
    if (onClose) {
      onClose();
    }
    if (primaryOption.handler && patient) {
      primaryOption.handler(patient);
    }
  };

  // Get primary button text
  const getPrimaryButtonText = () => {
    if (primaryOption.type === "smartrx" || primaryOption.type === "snaprx") {
      return primaryOption.label;
    }
    if (primaryOption.type === "voicerx") {
      return isVoiceRxPaid ? "Voice Rx" : "Consult";
    }
    return "Start Consult";
  };

  // If mobile screen, show simple button without dropdown
  if (isMobileScreen) {
    if (primaryOption.type === "smartrx" || primaryOption.type === "snaprx") {
      return (
        <div style={{ paddingLeft: "6px" }} onClick={handlePrimaryClick}>
          <img src={smartPad} alt="vitals" />
          <button className="btn btn-smartRx-text">{primaryOption.label}</button>
        </div>
      );
    } else {
      return (
        <Button
          type="text"
          className="btn btn-primary3 align-items-center d-flex"
          icon={<i className="icon-Consult"></i>}
          onClick={handlePrimaryClick}
        >
          {getPrimaryButtonText()}
        </Button>
      );
    }
  }

  // Desktop view: Show primary button + dropdown
  // If only one option, show just the button
  if (dropdownOptions.length === 0) {
    if (primaryOption.type === "smartrx" || primaryOption.type === "snaprx") {
      return (
        <div style={{ paddingLeft: "6px" }} onClick={handlePrimaryClick}>
          <img src={smartPad} alt="vitals" />
          <button className="btn btn-smartRx-text">{primaryOption.label}</button>
        </div>
      );
    } else {
      return (
        <Button
          type="text"
          className="btn btn-primary3 align-items-center d-flex"
          icon={<i className="icon-Consult"></i>}
          onClick={handlePrimaryClick}
        >
          {getPrimaryButtonText()}
        </Button>
      );
    }
  }

  // Multiple options: Show primary button + dropdown
  if (buttonStyle === "cardiology") {
    // Cardiology style: Render only dropdown options (primary is handled by parent)
    if (dropdownOptions.length === 0) return null;
    
    return (
      <div>
        {dropdownOptions.map((option, index) => {
          const handleClick = () => {
            if (onClose) {
              onClose();
            }
            if (option.handler && patient) {
              option.handler(patient);
            }
          };

          const isFirst = index === 0;
          const isLast = index === dropdownOptions.length - 1;
          let className = "smart-rx-buttons";
          
          // Determine className based on position and options
          if (isFirst) {
            // First dropdown option
            if (option.type === "snaprx" && primaryOption.type === "smartrx") {
              className += " top-br bottom-border";
            } else if (dropdownOptions.length > 1) {
              className += " bottom-border";
            }
          } else if (!isLast) {
            className += " bottom-border";
          }
          // Last option doesn't need bottom-border (it's the last)

          const getButtonText = () => {
            if (option.type === "smartrx") return "Start New SmartRx";
            if (option.type === "snaprx") return "Start New SnapRx";
            if (option.type === "voicerx") return "Start Voice Rx";
            return "Start New Consult";
          };

          return (
            <div key={option.type}>
              <button className={className} onClick={handleClick}>
                <span style={{ padding: "0 3.4rem" }}>{getButtonText()}</span>
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  // WalkIn style: Primary button + dropdown arrow
  return (
    <div className="d-flex btn btn-smart-rx-walkin">
      {primaryOption.type === "smartrx" || primaryOption.type === "snaprx" ? (
        <div style={{ paddingLeft: "6px" }} onClick={handlePrimaryClick}>
          <img src={smartPad} alt="vitals" />
          <button className="btn btn-smartRx-text">{primaryOption.label}</button>
        </div>
      ) : (
        <Button
          type="text"
          className="btn btn-primary3 align-items-center d-flex"
          icon={<i className="icon-Consult"></i>}
          onClick={handlePrimaryClick}
        >
          {getPrimaryButtonText()}
        </Button>
      )}

      <div className="consult-btns-group">
        <Dropdown
          menu={{
            items: getMenuItems(),
            style: { width: "8rem", marginTop: "-1rem", marginRight: "-0.3rem" },
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <a
            onClick={(e) => {
              e.preventDefault();
            }}
            style={{ padding: "5px" }}
          >
            <i
              className="icon-right"
              style={{
                display: "block",
                transform: `rotate(270deg)`,
                color: "white",
              }}
            />
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default PrimaryActionButton;
